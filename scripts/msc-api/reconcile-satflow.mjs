const API_ROOT = 'https://api.satflow.com/v1';
const API_KEY = String(process.env.SATFLOW_API_KEY || '').trim();
const TIMEOUT_MS = 20_000;
const PAGE_SIZE = 100;

if (!API_KEY) {
  console.error('SATFLOW_API_KEY is unavailable to this workflow.');
  process.exit(2);
}

async function request(path) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(`${API_ROOT}${path}`, {
      headers: {
        accept: 'application/json',
        'x-api-key': API_KEY,
        'user-agent': 'Mempool-Surf-Club-satflow-reconciliation/1.2'
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

function salesFrom(payload) {
  return payload?.data?.sales || payload?.data?.items || payload?.data?.results || [];
}

function salePrice(row) {
  const value = Number(row?.price);
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function firstRune(row) {
  const candidate = row?.runes ?? row?.sale?.runes ?? row?.sale?.runesData?.runes ?? row?.ask?.runes ?? row?.rune;
  return Array.isArray(candidate) ? candidate[0] : candidate;
}

async function fetchAllSales(collectionSlug, external) {
  const rows = [];
  let page = 1;
  let expectedTotal = null;

  while (page <= 20) {
    const params = new URLSearchParams({
      collectionSlug,
      external: external ? 'true' : 'false',
      timeRange: '24h',
      active: 'false',
      page: String(page),
      pageSize: String(PAGE_SIZE),
      sortBy: 'fillCompletedAt',
      sortDirection: 'desc'
    });
    const result = await request(`/activity/sales?${params}`);
    if (!result.ok) return { status: result.status, total: null, rows: [], priceSum: null };

    const pageRows = salesFrom(result.payload);
    const total = Number(result.payload?.data?.total);
    if (Number.isFinite(total)) expectedTotal = total;
    rows.push(...pageRows);

    if (pageRows.length === 0 || pageRows.length < PAGE_SIZE || (expectedTotal !== null && rows.length >= expectedTotal)) break;
    page += 1;
  }

  return {
    status: 200,
    total: expectedTotal,
    rows,
    priceSum: rows.reduce((sum, row) => sum + salePrice(row), 0)
  };
}

async function collectionStats(collectionSlug) {
  const result = await request(`/collection-stats?collectionId=${encodeURIComponent(collectionSlug)}`);
  const data = result.payload?.data;
  return {
    status: result.status,
    volume1d: Number.isFinite(Number(data?.volume1d)) ? Number(data.volume1d) : null,
    name: data?.metadata?.name || null,
    id: data?.metadata?.id || null
  };
}

function runeSummary(rows) {
  const names = new Set();
  const ids = new Set();
  rows.forEach((row) => {
    const rune = firstRune(row);
    if (rune?.name) names.add(rune.name);
    if (rune?.id) ids.add(rune.id);
  });
  return { names: [...names], ids: [...ids] };
}

async function inspect(slug) {
  const [stats, internal, withExternal] = await Promise.all([
    collectionStats(slug),
    fetchAllSales(slug, false),
    fetchAllSales(slug, true)
  ]);

  console.log(`\n=== ${slug} ===`);
  console.log(JSON.stringify({
    stats,
    internal: {
      total: internal.total,
      returned: internal.rows.length,
      priceSum: internal.priceSum,
      runes: runeSummary(internal.rows)
    },
    withExternal: {
      total: withExternal.total,
      returned: withExternal.rows.length,
      priceSum: withExternal.priceSum,
      runes: runeSummary(withExternal.rows)
    },
    comparisons: {
      internalMatchesVolume1d: stats.volume1d !== null && internal.priceSum === stats.volume1d,
      withExternalMatchesVolume1d: stats.volume1d !== null && withExternal.priceSum === stats.volume1d
    }
  }, null, 2));
}

for (const slug of [
  'omb',
  'bitcoin-puppets',
  'nodemonkes',
  'tap-DMT-NAT',
  'BILLION•DOLLAR•CAT',
  'PUPS•WORLD•PEACE',
  'DOG•GO•TO•THE•MOON'
]) {
  await inspect(slug);
}
