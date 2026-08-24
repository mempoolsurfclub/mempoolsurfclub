const SATFLOW_API_ROOT = 'https://api.satflow.com/v1';
const REQUEST_TIMEOUT_MS = 20_000;
const MAX_RETRIES = 4;
const PAGE_SIZE = 100;
const MAX_PAGES = 100;
const MAX_SALES_PER_PROTOCOL = 25;

const SATFLOW_API_KEY = String(process.env.SATFLOW_API_KEY || '').trim();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clean(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function firstValue(values) {
  for (const value of values) {
    if (value !== undefined && value !== null && clean(value)) return value;
  }
  return null;
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

function positiveInteger(value) {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : null;
}

async function requestJson(url, attempt = 0) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
        'x-api-key': SATFLOW_API_KEY,
        'user-agent': 'Mempool-Surf-Club-tools-activity/1.0'
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
      return requestJson(url, attempt + 1);
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
  return payload?.data?.pagination || payload?.pagination || {};
}

function firstRune(value) {
  return Array.isArray(value) ? value[0] : value;
}

function runeFrom(row) {
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

function saleName(row) {
  const rune = runeFrom(row);
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
    row?.bid?.collectionSlug,
    row?.bid?.collection_slug,
    row?.token?.collection_name,
    row?.token?.collection_slug,
    row?.name,
    row?.slug
  ]));
}

function saleType(row, name) {
  if (runeFrom(row)) return 'RUNE';

  const probe = [
    row?.protocol,
    row?.assetType,
    row?.tokenStandard,
    row?.collection?.protocol,
    row?.collection?.type,
    row?.token?.protocol,
    row?.sale?.protocol,
    row?.ask?.protocol,
    row?.bid?.type
  ].map(clean).join(' ').toLowerCase();

  if (probe.includes('rune')) return 'RUNE';
  if (probe.includes('ordinal') || probe.includes('inscription')) return 'ORDINAL';
  if (name.includes('•')) return 'RUNE';

  if (
    row?.collection ||
    row?.collectionData ||
    row?.collectionSlug ||
    row?.collection_slug ||
    row?.bid?.collectionSlug ||
    row?.bid?.collection_slug ||
    row?.bid?.inscriptionId ||
    row?.bid?.inscription_id ||
    row?.token?.collection_name ||
    row?.token?.collection_slug
  ) return 'ORDINAL';

  return null;
}

function salePriceSats(row) {
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

function completedAt(row) {
  return firstValue([
    row?.fillCompletedAt,
    row?.fill_completed_at,
    row?.sale?.fillCompletedAt,
    row?.sale?.fill_completed_at,
    row?.completedAt,
    row?.completed_at
  ]);
}

function normalizeSale(row) {
  const name = saleName(row);
  const type = saleType(row, name);
  const priceSats = salePriceSats(row);
  const completedAtValue = completedAt(row);
  const completedAtMs = completedAtValue ? Date.parse(completedAtValue) : NaN;
  if (!name || !type || !priceSats || !Number.isFinite(completedAtMs)) return null;

  const id = clean(firstValue([
    row?.id,
    row?._id,
    row?.sale?.id,
    row?.sale?._id
  ]));

  return {
    id: id || null,
    name,
    type,
    priceSats: Math.round(priceSats),
    priceBtc: Math.round(priceSats) / 100_000_000,
    completedAt: new Date(completedAtMs).toISOString(),
    source: 'Satflow'
  };
}

function recentByProtocol(sales, protocol) {
  const seen = new Set();
  return sales
    .filter((sale) => sale.type === protocol)
    .sort((a, b) => Date.parse(b.completedAt) - Date.parse(a.completedAt))
    .filter((sale) => {
      const key = sale.id || `${sale.type}:${sale.name}:${sale.priceSats}:${sale.completedAt}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, MAX_SALES_PER_PROTOCOL);
}

async function fetchRecentSales() {
  const rows = [];

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

    const payload = await requestJson(`${SATFLOW_API_ROOT}/activity/sales?${params.toString()}`);
    const items = itemsFrom(payload);
    rows.push(...items);

    const totalPages = positiveInteger(paginationFrom(payload)?.totalPages);
    if ((totalPages && page >= totalPages) || items.length < PAGE_SIZE || items.length === 0) break;
  }

  const sales = rows.map(normalizeSale).filter(Boolean);
  if (!sales.length) {
    throw new Error(`Satflow returned ${rows.length} sales but none could be normalized for Tools activity`);
  }
  return sales;
}

function snapshot(generatedAt, protocol, sales, mode = 'live') {
  return {
    schemaVersion: 1,
    api: 'MSC API',
    version: 'v1',
    generatedAt,
    window: '24h',
    mode,
    protocol,
    provider: 'Satflow',
    kind: 'completed-sales',
    methodology: 'Recent completed-sale events from Satflow activity data, including external marketplace data. Individual sale values are preserved as reported and are not represented as Satflow leaderboard 1D volume.',
    sales
  };
}

export async function buildToolsActivitySnapshots() {
  const generatedAt = new Date().toISOString();

  if (!SATFLOW_API_KEY) {
    return {
      ordinals: snapshot(generatedAt, 'ORDINAL', [], 'preview'),
      runes: snapshot(generatedAt, 'RUNE', [], 'preview')
    };
  }

  const sales = await fetchRecentSales();
  return {
    ordinals: snapshot(generatedAt, 'ORDINAL', recentByProtocol(sales, 'ORDINAL')),
    runes: snapshot(generatedAt, 'RUNE', recentByProtocol(sales, 'RUNE'))
  };
}
