const SATFLOW_API_ROOT = 'https://api.satflow.com/v1';
const REQUEST_TIMEOUT_MS = 20_000;
const MAX_RETRIES = 4;
const SATFLOW_PAGE_SIZE = 100;
const SATFLOW_MAX_PAGES = 100;

const SATFLOW_API_KEY = String(process.env.SATFLOW_API_KEY || '').trim();

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

function firstValue(values) {
  for (const value of values) {
    if (value !== undefined && value !== null && clean(value)) return value;
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
        'user-agent': 'Mempool-Surf-Club-market-api/1.1',
        ...(options.headers || {})
      },
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
    payload?.data?.sales,
    payload?.data?.results,
    payload?.items,
    payload?.sales,
    payload?.results
  ];
  return candidates.find(Array.isArray) || [];
}

function satflowPagination(payload) {
  return payload?.data?.pagination || payload?.pagination || {};
}

function firstRune(value) {
  return Array.isArray(value) ? value[0] : value;
}

function satflowRune(row) {
  return firstRune(
    row?.runes ??
    row?.sale?.runes ??
    row?.sale?.runesData?.runes ??
    row?.ask?.runes ??
    row?.ask?.runesData?.runes ??
    row?.rune ??
    row?.token?.rune ??
    row?.collection?.rune
  );
}

function satflowName(row) {
  const rune = satflowRune(row);
  const collection = row?.collection || row?.collectionData || row?.sale?.collection || row?.ask?.collection;
  return clean(firstValue([
    rune?.spacedName,
    rune?.spaced_name,
    rune?.name,
    rune?.ticker,
    row?.runeName,
    row?.rune_name,
    collection?.name,
    collection?.title,
    collection?.slug,
    row?.collectionName,
    row?.collection_name,
    row?.collectionSlug,
    row?.collection_slug,
    row?.token?.collection_name,
    row?.token?.collection_slug,
    row?.name,
    row?.slug
  ]));
}

function satflowType(row, name) {
  if (satflowRune(row)) return 'RUNE';

  const probe = [
    row?.protocol,
    row?.type,
    row?.assetType,
    row?.tokenStandard,
    row?.collection?.protocol,
    row?.collection?.type,
    row?.token?.protocol,
    row?.sale?.protocol,
    row?.ask?.protocol
  ].map(clean).join(' ').toLowerCase();

  if (probe.includes('rune')) return 'RUNE';
  if (probe.includes('ordinal') || probe.includes('inscription')) return 'ORDINAL';
  if (name.includes('•')) return 'RUNE';

  if (
    row?.collection ||
    row?.collectionData ||
    row?.collectionSlug ||
    row?.collection_slug ||
    row?.token?.collection_name ||
    row?.token?.collection_slug
  ) return 'ORDINAL';

  return null;
}

function satflowSalePriceSats(row) {
  return firstPositive([
    row?.price,
    row?.salePrice,
    row?.sale_price,
    row?.totalPrice,
    row?.total_price,
    row?.priceSats,
    row?.price_sats,
    row?.sale?.price,
    row?.sale?.totalPrice,
    row?.sale?.total_price,
    row?.fill?.price,
    row?.fill?.totalPrice,
    row?.ask?.price,
    row?.amountSats,
    row?.amount_sats,
    row?.valueSats,
    row?.value_sats
  ]);
}

function normalizeSatflowSale(row) {
  const name = satflowName(row);
  const type = satflowType(row, name);
  const priceSats = satflowSalePriceSats(row);
  if (!name || !type || !priceSats) return null;
  return { name, type, priceSats };
}

function aggregateSales(rows) {
  const assets = new Map();
  for (const row of rows) {
    const sale = normalizeSatflowSale(row);
    if (!sale) continue;
    const key = `${sale.type}:${sale.name.toLowerCase()}`;
    const existing = assets.get(key) || {
      name: sale.name,
      type: sale.type,
      volumeSats: 0,
      salesCount: 0,
      source: 'Satflow'
    };
    existing.volumeSats += sale.priceSats;
    existing.salesCount += 1;
    assets.set(key, existing);
  }

  return [...assets.values()].map((asset) => ({
    name: asset.name,
    type: asset.type,
    volumeBtc: asset.volumeSats / 100_000_000,
    salesCount: asset.salesCount,
    source: asset.source
  }));
}

async function fetchSatflow24h() {
  const sales = [];

  for (let page = 1; page <= SATFLOW_MAX_PAGES; page += 1) {
    const params = new URLSearchParams({
      external: 'true',
      timeRange: '24h',
      active: 'false',
      page: String(page),
      pageSize: String(SATFLOW_PAGE_SIZE),
      sortBy: 'fillCompletedAt',
      sortDirection: 'desc'
    });

    const payload = await requestJson(`${SATFLOW_API_ROOT}/activity/sales?${params.toString()}`, {
      headers: { 'x-api-key': SATFLOW_API_KEY }
    });
    const items = satflowItems(payload);
    sales.push(...items);

    const pagination = satflowPagination(payload);
    const totalPages = positiveInteger(pagination?.totalPages);
    if ((totalPages && page >= totalPages) || items.length < SATFLOW_PAGE_SIZE || items.length === 0) break;
  }

  const assets = aggregateSales(sales);
  if (assets.length === 0) {
    throw new Error(`Satflow returned ${sales.length} sales but none could be normalized into Ordinals/Runes 24h volume`);
  }
  return assets;
}

function rank(rows, limit) {
  return [...rows]
    .filter((asset) => Number.isFinite(asset.volumeBtc) && asset.volumeBtc > 0)
    .sort((a, b) => b.volumeBtc - a.volumeBtc || a.name.localeCompare(b.name))
    .slice(0, limit)
    .map((asset, index) => ({ rank: index + 1, ...asset }));
}

function endpointSnapshot({ generatedAt, protocol, assets, mode = 'live' }) {
  return {
    schemaVersion: 1,
    api: 'MSC API',
    version: 'v1',
    generatedAt,
    window: '24h',
    unit: 'BTC',
    mode,
    protocol,
    provider: 'Satflow',
    methodology: 'MSC aggregates Satflow sales records from the trailing 24 hours, including external marketplace data, and sums completed sale prices by Bitcoin asset.',
    assets
  };
}

function previewSnapshot(generatedAt, protocol) {
  return endpointSnapshot({ generatedAt, protocol, assets: [], mode: 'preview' });
}

function homepageSnapshot(generatedAt, assets, mode) {
  return {
    schemaVersion: 1,
    api: 'MSC API',
    version: 'v1',
    generatedAt,
    window: '24h',
    unit: 'BTC',
    mode,
    methodology: mode === 'live'
      ? 'MSC aggregates Satflow trailing-24-hour Ordinals and Runes sales, including external marketplace data, then ranks up to five assets by completed-sale BTC volume.'
      : 'No public ranking is emitted until Satflow is configured and the live data contract validates.',
    sourceLine: mode === 'live' ? 'MSC API · Satflow · Ordinals + Runes' : 'MSC API · MARKET DATA UNAVAILABLE',
    assets
  };
}

export async function buildMarketSnapshots() {
  const generatedAt = new Date().toISOString();

  if (!SATFLOW_API_KEY) {
    return {
      manifest: {
        schemaVersion: 1,
        api: 'MSC API',
        version: 'v1',
        generatedAt,
        mode: 'preview',
        endpoints: [
          '/v1/market/homepage.json',
          '/v1/market/ordinals.json',
          '/v1/market/runes.json'
        ],
        providers: {
          ordinals: { name: 'Satflow', status: 'unconfigured' },
          runes: { name: 'Satflow', status: 'unconfigured' }
        }
      },
      homepage: homepageSnapshot(generatedAt, [], 'preview'),
      ordinals: previewSnapshot(generatedAt, 'ORDINAL'),
      runes: previewSnapshot(generatedAt, 'RUNE')
    };
  }

  const satflow = await fetchSatflow24h();
  const ordinalsAssets = rank(satflow.filter((asset) => asset.type === 'ORDINAL'), 25);
  const runesAssets = rank(satflow.filter((asset) => asset.type === 'RUNE'), 25);
  const homepageAssets = rank(satflow, 5);

  if (homepageAssets.length === 0) {
    throw new Error('MSC API homepage endpoint produced no Satflow assets');
  }

  return {
    manifest: {
      schemaVersion: 1,
      api: 'MSC API',
      version: 'v1',
      generatedAt,
      mode: 'live',
      endpoints: [
        '/v1/market/homepage.json',
        '/v1/market/ordinals.json',
        '/v1/market/runes.json'
      ],
      providers: {
        ordinals: { name: 'Satflow', status: 'live' },
        runes: { name: 'Satflow', status: 'live' }
      }
    },
    homepage: homepageSnapshot(generatedAt, homepageAssets, 'live'),
    ordinals: endpointSnapshot({ generatedAt, protocol: 'ORDINAL', assets: ordinalsAssets }),
    runes: endpointSnapshot({ generatedAt, protocol: 'RUNE', assets: runesAssets })
  };
}
