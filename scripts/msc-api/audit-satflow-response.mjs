const API_ROOT = 'https://api.satflow.com/v1';
const API_KEY = String(process.env.SATFLOW_API_KEY || '').trim();
const PAGE_SIZE = 100;
const MAX_PAGES = 100;

if (!API_KEY) {
  console.error('SATFLOW_AUDIT: missing SATFLOW_API_KEY');
  process.exit(1);
}

function clean(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function positive(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : null;
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

function itemsFrom(payload) {
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

function paginationFrom(payload) {
  return payload?.data?.pagination || payload?.pagination || {};
}

function firstRune(value) {
  return Array.isArray(value) ? value[0] : value;
}

function currentRune(row) {
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

function currentName(row) {
  const rune = currentRune(row);
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

function currentType(row, name) {
  if (currentRune(row)) return 'RUNE';
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

function currentPrice(row) {
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

function objectShape(value, depth = 0) {
  if (depth >= 4) return Array.isArray(value) ? '[array]' : typeof value;
  if (Array.isArray(value)) {
    return value.length ? [objectShape(value[0], depth + 1)] : [];
  }
  if (!value || typeof value !== 'object') return typeof value;
  const result = {};
  for (const key of Object.keys(value).sort()) {
    if (/address|publickey|signature|psbt/i.test(key)) continue;
    result[key] = objectShape(value[key], depth + 1);
  }
  return result;
}

function collectKeyPaths(value, prefix, counts, depth = 0) {
  if (!value || typeof value !== 'object' || depth > 5) return;
  if (Array.isArray(value)) {
    if (value[0]) collectKeyPaths(value[0], `${prefix}[]`, counts, depth + 1);
    return;
  }
  for (const [key, child] of Object.entries(value)) {
    if (/address|publickey|signature|psbt/i.test(key)) continue;
    const path = prefix ? `${prefix}.${key}` : key;
    counts.set(path, (counts.get(path) || 0) + 1);
    collectKeyPaths(child, path, counts, depth + 1);
  }
}

function marketplaceLabel(row) {
  return clean(firstValue([
    row?.marketplace,
    row?.marketplaceName,
    row?.marketplace_name,
    row?.source,
    row?.sourceName,
    row?.source_name,
    row?.externalMarketplace,
    row?.external_marketplace,
    row?.sale?.marketplace,
    row?.sale?.source,
    row?.ask?.marketplace,
    row?.ask?.source
  ])) || '(unknown)';
}

const rows = [];
let firstPayload = null;
let pagesFetched = 0;

for (let page = 1; page <= MAX_PAGES; page += 1) {
  const params = new URLSearchParams({
    external: 'true',
    timeRange: '24h',
    active: 'false',
    page: String(page),
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
  if (!response.ok) {
    console.error(`SATFLOW_AUDIT: request failed HTTP ${response.status}`);
    process.exit(1);
  }

  const payload = await response.json();
  if (!firstPayload) firstPayload = payload;
  const pageRows = itemsFrom(payload);
  rows.push(...pageRows);
  pagesFetched += 1;

  const pagination = paginationFrom(payload);
  const totalPages = Number(pagination?.totalPages || 0);
  if ((Number.isFinite(totalPages) && totalPages > 0 && page >= totalPages) || pageRows.length < PAGE_SIZE || pageRows.length === 0) break;
}

const accepted = [];
const rejectionCounts = new Map();
const rejectedExamples = [];
const marketplaceCounts = new Map();
const pathCounts = new Map();

for (const row of rows) {
  const name = currentName(row);
  const type = currentType(row, name);
  const price = currentPrice(row);
  const missing = [];
  if (!name) missing.push('name');
  if (!type) missing.push('type');
  if (!price) missing.push('price');

  const market = marketplaceLabel(row);
  marketplaceCounts.set(market, (marketplaceCounts.get(market) || 0) + 1);
  collectKeyPaths(row, '', pathCounts);

  if (!missing.length) {
    accepted.push({ name, type, priceSats: price, marketplace: market });
  } else {
    const reason = missing.join('+');
    rejectionCounts.set(reason, (rejectionCounts.get(reason) || 0) + 1);
    if (rejectedExamples.length < 8) {
      rejectedExamples.push({ reason, shape: objectShape(row) });
    }
  }
}

const relevantPaths = [...pathCounts.entries()]
  .filter(([path]) => /(name|slug|title|rune|ordinal|inscription|collection|protocol|type|price|amount|value|market|source|fill)/i.test(path))
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .slice(0, 120);

console.log('SATFLOW_AUDIT_SUMMARY', JSON.stringify({
  pagesFetched,
  rowsReturned: rows.length,
  rowsAcceptedByCurrentParser: accepted.length,
  rowsRejectedByCurrentParser: rows.length - accepted.length,
  rejectionCounts: Object.fromEntries([...rejectionCounts.entries()].sort((a, b) => b[1] - a[1])),
  marketplaceCounts: Object.fromEntries([...marketplaceCounts.entries()].sort((a, b) => b[1] - a[1])),
  firstPayloadShape: objectShape(firstPayload),
  acceptedSample: accepted.slice(0, 10),
  rejectedExamples,
  relevantKeyPaths: Object.fromEntries(relevantPaths)
}, null, 2));
