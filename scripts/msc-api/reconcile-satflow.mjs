const API_ROOT = 'https://api.satflow.com/v1';
const API_KEY = String(process.env.SATFLOW_API_KEY || '').trim();
const TIMEOUT_MS = 20_000;

if (!API_KEY) {
  console.error('SATFLOW_API_KEY is unavailable to this workflow.');
  process.exit(2);
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
        'user-agent': 'Mempool-Surf-Club-satflow-reconciliation/1.1'
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

function firstRune(row) {
  const candidate = row?.runes ?? row?.sale?.runes ?? row?.sale?.runesData?.runes ?? row?.ask?.runes ?? row?.ask?.runesData?.runes ?? row?.rune ?? row?.token?.rune ?? row?.collection?.rune;
  return Array.isArray(candidate) ? candidate[0] : candidate;
}

function safeRow(row) {
  const rune = firstRune(row);
  const collection = row?.collection || row?.collectionData || row?.sale?.collection || row?.ask?.collection;
  return compactObject({
    id: row?.id ?? row?._id,
    fillCompletedAt: row?.fillCompletedAt ?? row?.fill_completed_at ?? row?.sale?.fillCompletedAt ?? row?.sale?.fill_completed_at,
    type: row?.protocol ?? row?.type ?? row?.assetType ?? row?.tokenStandard ?? row?.bid?.type,
    price: row?.price,
    unitPrice: row?.unitPrice ?? row?.unit_price,
    runesAmountAsNumber: row?.runesAmountAsNumber ?? row?.runes_amount_as_number,
    askPrice: row?.ask?.price,
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

function commonSalesParams() {
  return {
    timeRange: '24h',
    active: 'false',
    page: '1',
    pageSize: '100',
    sortBy: 'fillCompletedAt',
    sortDirection: 'desc'
  };
}

async function inspectSales(label, extra = {}) {
  const params = new URLSearchParams({ ...commonSalesParams(), ...extra });
  const result = await request(`/activity/sales?${params}`);
  const items = itemsFrom(result.payload);
  print(`SALES ${label}`, {
    status: result.status,
    total: result.payload?.data?.total ?? result.payload?.total ?? null,
    meta: result.payload?.data?._meta ?? result.payload?._meta ?? null,
    itemCount: items.length,
    firstThreeRows: items.slice(0, 3).map(safeRow)
  });
  return { result, items };
}

async function inspectCollectionStats(identifier) {
  const result = await request(`/collection-stats?collectionId=${encodeURIComponent(identifier)}`);
  const data = result.payload?.data;
  print(`COLLECTION STATS ${identifier}`, {
    status: result.status,
    floor: data?.floor,
    listedCount: data?.listedCount,
    volume1d: data?.volume1d,
    volume7d: data?.volume7d,
    volume30d: data?.volume30d,
    metadata: data?.metadata ? {
      id: data.metadata.id,
      name: data.metadata.name,
      internalId: data.metadata._id
    } : null
  });
}

await inspectSales('external omitted');
await inspectSales('external=true', { external: 'true' });
await inspectSales('external=false', { external: 'false' });

for (const identifier of ['omb', 'nodemonkes', 'bitcoin-puppets', 'cents', 'tap-DMT-NAT']) {
  await inspectCollectionStats(identifier);
}

for (const [label, filter] of [
  ['collectionId=omb', { collectionId: 'omb' }],
  ['collection=omb', { collection: 'omb' }],
  ['collectionSlug=omb', { collectionSlug: 'omb' }],
  ['collectionId=bitcoin-puppets', { collectionId: 'bitcoin-puppets' }],
  ['collectionId=nodemonkes', { collectionId: 'nodemonkes' }],
  ['runeId=845764:84', { runeId: '845764:84' }],
  ['rune=845764:84', { rune: '845764:84' }],
  ['runes=845764:84', { runes: '845764:84' }],
  ['runeName=BILLION DOLLAR CAT', { runeName: 'BILLION•DOLLAR•CAT' }],
  ['runeId=840000:3', { runeId: '840000:3' }]
]) {
  await inspectSales(label, filter);
}
