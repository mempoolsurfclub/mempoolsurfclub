const API_ROOT = 'https://api.satflow.com/v1';
const API_KEY = String(process.env.SATFLOW_API_KEY || '').trim();
const PAGE_SIZE = 100;

if (!API_KEY) process.exit(1);

function clean(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function itemsFrom(payload) {
  return payload?.data?.sales || payload?.data?.items || payload?.sales || payload?.items || [];
}

function firstRune(value) {
  return Array.isArray(value) ? value[0] : value;
}

function normalize(row) {
  const rune = firstRune(row?.runes ?? row?.ask?.runesData?.runes ?? row?.ask?.runes ?? row?.rune);
  const priceSats = Number(row?.price);
  if (!Number.isFinite(priceSats) || priceSats <= 0) return null;

  if (rune) {
    const name = clean(rune?.spacedName ?? rune?.spaced_name ?? rune?.name ?? rune?.ticker);
    return name ? { name, type: 'RUNE', priceSats } : null;
  }

  const collectionSlug = clean(row?.bid?.collectionSlug ?? row?.bid?.collection_slug);
  const inscriptionId = clean(row?.bid?.inscriptionId ?? row?.bid?.inscription_id);
  if (collectionSlug && inscriptionId) {
    return { name: collectionSlug, type: 'ORDINAL', priceSats };
  }

  return null;
}

const params = new URLSearchParams({
  external: 'true',
  timeRange: '24h',
  active: 'false',
  page: '1',
  pageSize: String(PAGE_SIZE),
  sortBy: 'fillCompletedAt',
  sortDirection: 'desc'
});

const response = await fetch(`${API_ROOT}/activity/sales?${params}`, {
  headers: {
    accept: 'application/json',
    'x-api-key': API_KEY,
    'user-agent': 'Mempool-Surf-Club-satflow-audit/1.0'
  }
});
if (!response.ok) process.exit(1);

const rows = itemsFrom(await response.json());
const assets = new Map();
let normalizedCount = 0;

for (const row of rows) {
  const sale = normalize(row);
  if (!sale) continue;
  normalizedCount += 1;
  const key = `${sale.type}:${sale.name.toLowerCase()}`;
  const current = assets.get(key) || { name: sale.name, type: sale.type, volumeSats: 0, salesCount: 0 };
  current.volumeSats += sale.priceSats;
  current.salesCount += 1;
  assets.set(key, current);
}

const ranking = [...assets.values()]
  .map((asset) => ({
    ...asset,
    volumeBtc: asset.volumeSats / 100_000_000
  }))
  .sort((a, b) => b.volumeSats - a.volumeSats || a.name.localeCompare(b.name))
  .slice(0, 10)
  .map((asset, index) => ({
    rank: index + 1,
    name: asset.name,
    type: asset.type,
    volumeBtc: asset.volumeBtc,
    salesCount: asset.salesCount
  }));

console.log('SATFLOW_CORRECTED_RANKING', JSON.stringify({
  rowsReturned: rows.length,
  rowsNormalizedWithBidCollectionSupport: normalizedCount,
  distinctAssets: assets.size,
  ranking
}, null, 2));
