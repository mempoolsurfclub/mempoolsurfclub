const API_ROOT = 'https://api.satflow.com/v1';
const API_KEY = String(process.env.SATFLOW_API_KEY || '').trim();
const TIMEOUT_MS = 20_000;

if (!API_KEY) {
  console.error('SATFLOW_API_KEY is unavailable to this workflow.');
  process.exit(2);
}

function clean(value) {
  return typeof value === 'string' ? value.trim() : value;
}

function compactObject(object) {
  if (!object || typeof object !== 'object' || Array.isArray(object)) return object;
  return Object.fromEntries(Object.entries(object).filter(([, value]) => (
    value !== undefined && value !== null && value !== ''
  )));
}

async function request(path) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(`${API_ROOT}${path}`, {
      headers: {
        accept: 'application/json',
        'x-api-key': API_KEY,
        'user-agent': 'Mempool-Surf-Club-satflow-reconciliation/1.0'
      },
      signal: controller.signal
    });
    const text = await response.text();
    let payload = null;
    try { payload = text ? JSON.parse(text) : null; } catch {}
    return { status: response.status, ok: response.ok, payload };
  } finally {
    clearTimeout(timeout);
  }
}

function itemsFrom(payload) {
  return [
    payload?.data?.items,
    payload?.data?.sales,
    payload?.data?.results,
    payload?.items,
    payload?.sales,
    payload?.results
  ].find(Array.isArray) || [];
}

function paginationFrom(payload) {
  return payload?.data?.pagination || payload?.pagination || null;
}

function firstRune(row) {
  const candidate = row?.runes ?? row?.sale?.runes ?? row?.sale?.runesData?.runes ?? row?.ask?.runes ?? row?.ask?.runesData?.runes ?? row?.rune ?? row?.token?.rune ?? row?.collection?.rune;
  return Array.isArray(candidate) ? candidate[0] : candidate;
}

function safeRow(row) {
  const rune = firstRune(row);
  const collection = row?.collection || row?.collectionData || row?.sale?.collection || row?.ask?.collection;
  return compactObject({
    topLevelKeys: Object.keys(row || {}).sort(),
    fillCompletedAt: row?.fillCompletedAt ?? row?.fill_completed_at ?? row?.sale?.fillCompletedAt ?? row?.sale?.fill_completed_at,
    external: row?.external ?? row?.isExternal ?? row?.is_external,
    marketplace: row?.marketplace ?? row?.market ?? row?.source ?? row?.sale?.marketplace,
    type: row?.protocol ?? row?.type ?? row?.assetType ?? row?.tokenStandard ?? row?.bid?.type,
    price: row?.price,
    salePrice: row?.salePrice ?? row?.sale_price,
    totalPrice: row?.totalPrice ?? row?.total_price,
    priceSats: row?.priceSats ?? row?.price_sats,
    salePriceNested: row?.sale?.price,
    saleTotalPriceNested: row?.sale?.totalPrice ?? row?.sale?.total_price,
    fillPrice: row?.fill?.price,
    fillTotalPrice: row?.fill?.totalPrice,
    askPrice: row?.ask?.price,
    amountSats: row?.amountSats ?? row?.amount_sats,
    valueSats: row?.valueSats ?? row?.value_sats,
    collection: collection ? compactObject({
      id: collection?._id ?? collection?.id ?? collection?.collectionId ?? collection?.collection_id,
      name: collection?.name ?? collection?.title,
      slug: collection?.slug
    }) : null,
    collectionSlug: row?.collectionSlug ?? row?.collection_slug ?? row?.bid?.collectionSlug ?? row?.bid?.collection_slug,
    rune: rune ? compactObject({
      id: rune?._id ?? rune?.id ?? rune?.runeId ?? rune?.rune_id,
      name: rune?.name,
      spacedName: rune?.spacedName ?? rune?.spaced_name,
      amount: rune?.amount,
      divisibility: rune?.divisibility
    }) : null
  });
}

function print(label, value) {
  console.log(`\n=== ${label} ===`);
  console.log(JSON.stringify(value, null, 2));
}

async function inspectSalesVariant(label, externalValue) {
  const params = new URLSearchParams({
    timeRange: '24h',
    active: 'false',
    page: '1',
    pageSize: '100',
    sortBy: 'fillCompletedAt',
    sortDirection: 'desc'
  });
  if (externalValue !== null) params.set('external', externalValue);

  const result = await request(`/activity/sales?${params}`);
  const items = itemsFrom(result.payload);
  print(`SALES ${label}`, {
    status: result.status,
    topLevelKeys: Object.keys(result.payload || {}).sort(),
    dataKeys: Object.keys(result.payload?.data || {}).sort(),
    itemCount: items.length,
    pagination: paginationFrom(result.payload),
    firstThreeRows: items.slice(0, 3).map(safeRow)
  });
  return { result, items };
}

async function inspectCollectionStats(identifier) {
  const result = await request(`/collection-stats?collectionId=${encodeURIComponent(identifier)}`);
  const payload = result.payload;
  print(`COLLECTION STATS ${identifier}`, {
    status: result.status,
    topLevelKeys: Object.keys(payload || {}).sort(),
    dataKeys: Object.keys(payload?.data || {}).sort(),
    payload: result.ok ? payload : null
  });
}

const variants = [];
variants.push(await inspectSalesVariant('external omitted', null));
variants.push(await inspectSalesVariant('external=true', 'true'));
variants.push(await inspectSalesVariant('external=false', 'false'));

const identifiers = new Set(['omb', 'nodemonkes', 'bitcoin-puppets']);
for (const { items } of variants) {
  for (const row of items) {
    const summary = safeRow(row);
    const collection = summary.collection;
    if (collection?.id) identifiers.add(String(collection.id));
    if (collection?.slug) identifiers.add(String(collection.slug));
    if (summary.collectionSlug) identifiers.add(String(summary.collectionSlug));
    if (identifiers.size >= 8) break;
  }
  if (identifiers.size >= 8) break;
}

for (const identifier of [...identifiers].slice(0, 8)) {
  await inspectCollectionStats(identifier);
}

for (const endpoint of [
  '/rune-stats?rune=PUPS%E2%80%A2WORLD%E2%80%A2PEACE',
  '/rune-stats?rune=DOG%E2%80%A2GO%E2%80%A2TO%E2%80%A2THE%E2%80%A2MOON',
  '/runes/stats?rune=PUPS%E2%80%A2WORLD%E2%80%A2PEACE',
  '/runes/stats?rune=DOG%E2%80%A2GO%E2%80%A2TO%E2%80%A2THE%E2%80%A2MOON'
]) {
  const result = await request(endpoint);
  print(`RUNE STATS PROBE ${endpoint}`, {
    status: result.status,
    topLevelKeys: Object.keys(result.payload || {}).sort(),
    dataKeys: Object.keys(result.payload?.data || {}).sort(),
    payload: result.ok ? result.payload : null
  });
}
