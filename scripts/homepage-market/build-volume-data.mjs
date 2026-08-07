import { writeFile } from 'node:fs/promises';

const SATFLOW_API_ROOT = 'https://api.satflow.com/v1';
const UNISAT_API_ROOT = 'https://open-api.unisat.io';
const outputPath = process.argv[2] || 'data/homepage-market.json';
const REQUEST_TIMEOUT_MS = 20_000;
const MAX_RETRIES = 4;
const SATFLOW_PAGE_SIZE = 100;
const SATFLOW_MAX_PAGES = 40;
const UNISAT_PAGE_SIZE = 100;
const UNISAT_MAX_PAGES = 30;

const SATFLOW_API_KEY = String(process.env.SATFLOW_API_KEY || '').trim();
const UNISAT_API_KEY = String(process.env.UNISAT_API_KEY || '').trim();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clean(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function positive(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : null;
}

function positiveInteger(value) {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : null;
}

function firstPositive(values) {
  for (const value of values) {
    const number = positive(value);
    if (number) return number;
  }
  return null;
}

async function requestJson(url, options = {}, attempt = 0) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      method: options.method || 'GET',
      headers: {
        accept: 'application/json',
        'user-agent': 'Mempool-Surf-Club-homepage-market/2.0',
        ...(options.body ? { 'content-type': 'application/json' } : {}),
        ...(options.headers || {})
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      signal: controller.signal
    });

    if (response.status === 429 || response.status >= 500) {
      if (attempt >= MAX_RETRIES) throw new Error(`HTTP ${response.status} from ${new URL(url).hostname}`);
      const retryAfter = Number.parseInt(response.headers.get('retry-after') || '', 10);
      const delay = Number.isFinite(retryAfter) && retryAfter > 0
        ? retryAfter * 1000
        : Math.min(2500 * (2 ** attempt), 30_000);
      await sleep(delay);
      return requestJson(url, options, attempt + 1);
    }

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new Error(`HTTP ${response.status} from ${new URL(url).hostname}${body ? `: ${body.slice(0, 180)}` : ''}`);
    }

    return response.json();
  } finally {
    clearTimeout(timeout);
  }
}

function satflowItems(payload) {
  const candidates = [
    payload?.data?.items,
    payload?.data?.groups,
    payload?.data?.results,
    payload?.items,
    payload?.groups,
    payload?.results
  ];
  return candidates.find(Array.isArray) || [];
}

function satflowPagination(payload) {
  return payload?.data?.pagination || payload?.pagination || {};
}

function satflowName(row) {
  const rune = row?.rune || row?.collection?.rune || row?.token?.rune;
  const collection = row?.collection || row?.collectionData;
  return clean(
    rune?.spacedName ||
    rune?.name ||
    row?.runeName ||
    row?.rune_name ||
    collection?.name ||
    collection?.title ||
    row?.collectionName ||
    row?.collection_name ||
    row?.name ||
    collection?.slug ||
    row?.collectionSlug ||
    row?.collection_slug ||
    row?.slug
  );
}

function satflowType(row, name) {
  const probe = [
    row?.protocol,
    row?.type,
    row?.assetType,
    row?.tokenStandard,
    row?.collection?.protocol,
    row?.collection?.type,
    row?.token?.protocol
  ].map(clean).join(' ').toLowerCase();

  if (probe.includes('rune')) return 'RUNE';
  if (probe.includes('ordinal') || probe.includes('inscription')) return 'ORDINAL';

  if (
    row?.rune || row?.runeName || row?.rune_name || row?.runeId || row?.rune_id ||
    row?.collection?.rune || row?.collection?.runeId || row?.collection?.rune_id ||
    row?.token?.rune || row?.token?.runeName || row?.token?.rune_name
  ) return 'RUNE';

  if (name.includes('•')) return 'RUNE';
  if (row?.collection || row?.collectionSlug || row?.collection_slug) return 'ORDINAL';
  return null;
}

function satflowVolumeBtc(row) {
  const btc = firstPositive([
    row?.volumeBtc,
    row?.volumeBTC,
    row?.btcVolume,
    row?.totalVolumeBtc,
    row?.totalVolumeBTC,
    row?.stats?.volumeBtc,
    row?.stats?.volumeBTC,
    row?.stats?.btcVolume,
    row?.volume?.btc,
    row?.total?.btc
  ]);
  if (btc) return btc;

  const sats = firstPositive([
    row?.volumeSats,
    row?.volume_sats,
    row?.totalVolumeSats,
    row?.total_volume_sats,
    row?.stats?.volumeSats,
    row?.stats?.volume_sats,
    row?.stats?.satsVolume,
    row?.volume?.sats,
    row?.total?.sats
  ]);
  return sats ? sats / 100_000_000 : null;
}

function normalizeSatflowGroup(row) {
  const name = satflowName(row);
  const type = satflowType(row, name);
  const volumeBtc = satflowVolumeBtc(row);
  if (!name || !type || !volumeBtc) return null;
  return { name, type, volumeBtc, source: 'Satflow' };
}

async function fetchSatflow24h() {
  const assets = [];

  for (let page = 1; page <= SATFLOW_MAX_PAGES; page += 1) {
    const params = new URLSearchParams({
      group: 'collection',
      external: 'true',
      timeRange: '24h',
      page: String(page),
      pageSize: String(SATFLOW_PAGE_SIZE),
      sortBy: 'createdAt',
      sortDirection: 'desc'
    });

    const payload = await requestJson(`${SATFLOW_API_ROOT}/activity/sales?${params.toString()}`, {
      headers: { 'x-api-key': SATFLOW_API_KEY }
    });
    const items = satflowItems(payload);
    assets.push(...items.map(normalizeSatflowGroup).filter(Boolean));

    const pagination = satflowPagination(payload);
    const totalPages = positiveInteger(pagination?.totalPages);
    if ((totalPages && page >= totalPages) || items.length < SATFLOW_PAGE_SIZE || items.length === 0) break;
  }

  if (assets.length === 0) {
    throw new Error('Satflow returned no parseable individual Ordinals/Runes 24h collection groups');
  }
  return assets;
}

function unisatList(payload) {
  const list = payload?.data?.list;
  return Array.isArray(list) ? list : [];
}

function normalizeUnisat(row) {
  const name = clean(row?.tick || row?.ticker || row?.symbol).toUpperCase();
  const volumeBtc = positive(row?.btcVolume ?? row?.volumeBtc ?? row?.volumeBTC);
  if (!name || !volumeBtc) return null;
  return { name, type: 'BRC-20', volumeBtc, source: 'UniSat' };
}

async function fetchUnisat24h() {
  const assets = [];

  for (let page = 0; page < UNISAT_MAX_PAGES; page += 1) {
    const start = page * UNISAT_PAGE_SIZE;
    const payload = await requestJson(`${UNISAT_API_ROOT}/v3/market/brc20/auction/brc20_types`, {
      method: 'POST',
      headers: { authorization: `Bearer ${UNISAT_API_KEY}` },
      body: { timeType: 'day1', start, limit: UNISAT_PAGE_SIZE }
    });

    if (payload?.code !== undefined && Number(payload.code) !== 0) {
      throw new Error(`UniSat API code ${payload.code}: ${clean(payload?.msg) || 'unknown error'}`);
    }

    const list = unisatList(payload);
    assets.push(...list.map(normalizeUnisat).filter(Boolean));

    const total = positiveInteger(payload?.data?.total);
    if ((total && start + list.length >= total) || list.length < UNISAT_PAGE_SIZE || list.length === 0) break;
  }

  if (assets.length === 0) throw new Error('UniSat returned no BRC-20 tickers with day1 btcVolume');
  return assets;
}

function dedupe(rows) {
  const map = new Map();
  for (const row of rows) {
    const key = `${row.type}:${row.name.toLowerCase()}`;
    const existing = map.get(key);
    if (!existing || row.volumeBtc > existing.volumeBtc) map.set(key, row);
  }
  return [...map.values()];
}

function rank(rows) {
  return dedupe(rows)
    .sort((a, b) => b.volumeBtc - a.volumeBtc || a.name.localeCompare(b.name))
    .slice(0, 5)
    .map((asset, index) => ({ rank: index + 1, ...asset }));
}

function previewPayload() {
  return {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    window: '24h',
    unit: 'BTC',
    mode: 'preview',
    methodology: 'Preview layout only. Live mode will combine individual Ordinals collection and Rune 24h volume from Satflow with individual BRC-20 day1 btcVolume from UniSat, then rank all assets together by BTC volume.',
    sourceLine: 'PREVIEW · SATFLOW + UNISAT API CONNECTION PENDING',
    providers: {
      ordinals: 'Satflow /v1/activity/sales, group=collection, external=true, timeRange=24h',
      runes: 'Satflow /v1/activity/sales, group=collection, external=true, timeRange=24h',
      brc20: 'UniSat /v3/market/brc20/auction/brc20_types, timeType=day1'
    },
    assets: [
      { rank: 1, name: 'COLLECTION NAME', type: 'ORDINAL', volumeBtc: null, source: 'Satflow' },
      { rank: 2, name: 'RUNE NAME', type: 'RUNE', volumeBtc: null, source: 'Satflow' },
      { rank: 3, name: 'BRC-20 TICKER', type: 'BRC-20', volumeBtc: null, source: 'UniSat' },
      { rank: 4, name: 'COLLECTION NAME', type: 'ORDINAL', volumeBtc: null, source: 'Satflow' },
      { rank: 5, name: 'RUNE NAME', type: 'RUNE', volumeBtc: null, source: 'Satflow' }
    ]
  };
}

async function livePayload() {
  const [satflow, unisat] = await Promise.all([fetchSatflow24h(), fetchUnisat24h()]);
  const assets = rank([...satflow, ...unisat]);
  if (assets.length !== 5) throw new Error(`Only ${assets.length} valid ranked assets were produced`);

  return {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    window: '24h',
    unit: 'BTC',
    mode: 'live',
    methodology: 'Individual Ordinals collections and Runes from Satflow indexed 24h sales including external marketplace data; individual BRC-20 tickers from UniSat day1 btcVolume. Combined and ranked by BTC volume.',
    sourceLine: 'Ordinals + Runes: Satflow · BRC-20: UniSat',
    providers: {
      ordinals: 'Satflow /v1/activity/sales, group=collection, external=true, timeRange=24h',
      runes: 'Satflow /v1/activity/sales, group=collection, external=true, timeRange=24h',
      brc20: 'UniSat /v3/market/brc20/auction/brc20_types, timeType=day1'
    },
    assets
  };
}

const hasSatflow = Boolean(SATFLOW_API_KEY);
const hasUnisat = Boolean(UNISAT_API_KEY);
const mode = hasSatflow && hasUnisat ? 'live' : 'preview';

if (hasSatflow !== hasUnisat) {
  console.warn('Only one provider key is configured; publishing preview mode until both keys are available.');
}

const payload = mode === 'live' ? await livePayload() : previewPayload();
await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');

console.log(`Wrote homepage market snapshot in ${payload.mode.toUpperCase()} mode to ${outputPath}`);
if (payload.mode === 'live') {
  console.log(payload.assets.map((row) => `${row.rank}. ${row.name} (${row.type}) ${row.volumeBtc.toFixed(8)} BTC`).join('\n'));
} else {
  console.log('Preview mode contains no fabricated market-volume values.');
}
