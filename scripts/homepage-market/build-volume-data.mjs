import { readFile, writeFile } from 'node:fs/promises';

const API_ROOT = 'https://api.coingecko.com/api/v3';
const SATFLOW_INPUT = process.argv[3] || '/tmp/satflow-24h.json';
const outputPath = process.argv[2] || 'data/homepage-market.json';
const PAGE_SIZE = 250;
const MAX_PAGES = 10;
const REQUEST_TIMEOUT_MS = 20_000;
const REQUEST_SPACING_MS = 3000;
const MAX_RETRIES = 5;

let lastRequestAt = 0;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clean(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function positive(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : null;
}

async function requestJson(path, attempt = 0) {
  const elapsed = Date.now() - lastRequestAt;
  if (elapsed < REQUEST_SPACING_MS) await sleep(REQUEST_SPACING_MS - elapsed);
  lastRequestAt = Date.now();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(`${API_ROOT}${path}`, {
      headers: {
        accept: 'application/json',
        'user-agent': 'Mempool-Surf-Club-homepage-market/1.0'
      },
      signal: controller.signal
    });

    if (response.status === 429 || response.status >= 500) {
      if (attempt >= MAX_RETRIES) throw new Error(`CoinGecko HTTP ${response.status}`);
      const retryAfter = Number.parseInt(response.headers.get('retry-after') || '', 10);
      const delay = Number.isFinite(retryAfter) && retryAfter > 0
        ? retryAfter * 1000
        : Math.min(4000 * (2 ** attempt), 60_000);
      await sleep(delay);
      return requestJson(path, attempt + 1);
    }

    if (!response.ok) throw new Error(`CoinGecko HTTP ${response.status}`);
    return response.json();
  } finally {
    clearTimeout(timeout);
  }
}

async function readSatflowAssets() {
  const payload = JSON.parse(await readFile(SATFLOW_INPUT, 'utf8'));
  if (payload?.window !== '24h') throw new Error('Satflow snapshot is not a 24h snapshot');

  const generatedAt = Date.parse(payload?.generatedAt || '');
  if (!Number.isFinite(generatedAt) || Date.now() - generatedAt > 30 * 60 * 1000) {
    throw new Error('Satflow snapshot is missing or stale');
  }

  const rows = [...(payload.ordinals || []), ...(payload.runes || [])];
  const assets = rows.map((row) => ({
    name: clean(row?.name),
    type: row?.type === 'RUNE' ? 'RUNE' : 'ORDINAL',
    volumeBtc: positive(row?.volumeBtc),
    source: 'Satflow'
  })).filter((row) => row.name && row.volumeBtc);

  if (assets.length < 2) throw new Error('Satflow returned insufficient individual 1D assets');
  return assets;
}

async function fetchBrc20() {
  const categories = await requestJson('/coins/categories/list');
  if (!Array.isArray(categories) || !categories.some((row) => row?.category_id === 'brc-20')) {
    throw new Error('CoinGecko BRC-20 category is unavailable');
  }

  const assets = [];
  const seen = new Set();
  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const params = new URLSearchParams({
      vs_currency: 'btc',
      category: 'brc-20',
      order: 'volume_desc',
      per_page: String(PAGE_SIZE),
      page: String(page),
      sparkline: 'false',
      precision: 'full'
    });
    const rows = await requestJson(`/coins/markets?${params.toString()}`);
    if (!Array.isArray(rows)) throw new Error('CoinGecko BRC-20 response is not an array');
    if (rows.length === 0) break;

    for (const row of rows) {
      const id = clean(row?.id);
      const name = clean(row?.symbol || row?.name).toUpperCase();
      const volumeBtc = positive(row?.total_volume);
      if (!id || !name || !volumeBtc || seen.has(id)) continue;
      seen.add(id);
      assets.push({ name, type: 'BRC-20', volumeBtc, source: 'CoinGecko' });
    }

    if (rows.length < PAGE_SIZE) break;
  }

  if (assets.length === 0) throw new Error('CoinGecko returned no BRC-20 assets with 24h volume');
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

const [satflow, brc20] = await Promise.all([readSatflowAssets(), fetchBrc20()]);
const ranked = dedupe([...satflow, ...brc20])
  .sort((a, b) => b.volumeBtc - a.volumeBtc || a.name.localeCompare(b.name))
  .slice(0, 5)
  .map((asset, index) => ({ rank: index + 1, ...asset }));

if (ranked.length < 5) throw new Error(`Only ${ranked.length} valid ranked assets were produced`);

const payload = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  window: '24h',
  unit: 'BTC',
  methodology: 'Individual Ordinals collections and Runes from Satflow public 1D leaderboards; individual BRC-20 assets from CoinGecko 24h market volume. Combined and ranked by BTC volume.',
  providers: {
    satflow: 'public 1D leaderboards',
    brc20: 'CoinGecko BRC-20 category'
  },
  assets: ranked
};

await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
console.log(`Wrote ${ranked.length} ranked assets to ${outputPath}`);
console.log(ranked.map((row) => `${row.rank}. ${row.name} (${row.type}) ${row.volumeBtc.toFixed(8)} BTC`).join('\n'));
