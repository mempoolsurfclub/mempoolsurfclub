import { writeFile } from 'node:fs/promises';
import process from 'node:process';

const SATFLOW_URL = 'https://api.satflow.com/v1/activity/sales';
const UNISAT_URL = 'https://open-api.unisat.io/v3/market/brc20/auction/brc20_types';
const SATS_PER_BTC = 100_000_000;
const PAGE_SIZE = 100;
const MAX_PAGES = 100;
const UNISAT_PAGE_SIZE = 100;
const UNISAT_MAX_PAGES = 50;

const satflowKey = process.env.SATFLOW_API_KEY?.trim();
const unisatKey = process.env.UNISAT_API_KEY?.trim();
const outputPath = process.argv[2] || 'data/homepage-market.json';

if (!satflowKey) throw new Error('SATFLOW_API_KEY is required');
if (!unisatKey) throw new Error('UNISAT_API_KEY is required');

function first(value) {
  return Array.isArray(value) ? value[0] : value;
}

function text(...values) {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return null;
}

function positiveNumber(...values) {
  for (const value of values) {
    const number = Number(value);
    if (Number.isFinite(number) && number > 0) return number;
  }
  return null;
}

function satflowItems(payload) {
  const data = payload?.data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.sales)) return data.sales;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data)) return data;
  return [];
}

function satflowTotalPages(payload) {
  const value = Number(
    payload?.data?.pagination?.totalPages ??
    payload?.data?.totalPages ??
    payload?.pagination?.totalPages
  );
  return Number.isFinite(value) && value > 0 ? value : null;
}

function normalizeSatflowSale(item) {
  const runeData = first(
    item?.runes ??
    item?.rune ??
    item?.ask?.runesData?.runes ??
    item?.ask?.runes ??
    item?.runesData?.runes ??
    item?.token?.runes
  );

  const collection = item?.collection ?? item?.token?.collection ?? item?.ask?.collection;
  const looksLikeRune = Boolean(
    runeData ||
    collection?.rune_divisibility != null ||
    collection?.runeDivisibility != null ||
    item?.token?.rune_amount != null ||
    item?.token?.runeAmount != null
  );

  const priceSats = positiveNumber(
    item?.ask?.price,
    item?.sale?.price,
    item?.listing?.price,
    item?.totalPrice,
    item?.salePrice,
    item?.price
  );
  if (!priceSats) return null;

  if (looksLikeRune) {
    const name = text(
      runeData?.spaced_rune,
      runeData?.spacedRune,
      runeData?.name,
      runeData?.rune,
      runeData?.ticker,
      collection?.name,
      collection?.displayName,
      collection?.slug,
      item?.collectionName,
      item?.collectionSlug
    );
    const slug = text(
      collection?.slug,
      item?.collectionSlug,
      runeData?.spaced_rune,
      runeData?.spacedRune,
      runeData?.name,
      runeData?.rune,
      runeData?.ticker,
      name
    );
    if (!name || !slug) return null;
    return { key: `rune:${slug.toLowerCase()}`, name, type: 'RUNE', volumeSats: priceSats };
  }

  const name = text(
    collection?.name,
    collection?.displayName,
    item?.collectionName,
    item?.token?.collection_name,
    item?.token?.collectionName
  );
  const slug = text(
    collection?.slug,
    item?.collectionSlug,
    item?.token?.collection_slug,
    item?.token?.collectionSlug,
    name
  );

  if (!name || !slug) return null;
  return { key: `ordinal:${slug.toLowerCase()}`, name, type: 'ORDINAL', volumeSats: priceSats };
}

async function requestJson(url, options = {}, label) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new Error(`${label} HTTP ${response.status}${body ? `: ${body.slice(0, 240)}` : ''}`);
    }
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchSatflowVolumes() {
  const totals = new Map();
  let page = 1;
  let observedSales = 0;

  while (page <= MAX_PAGES) {
    const url = new URL(SATFLOW_URL);
    url.searchParams.set('external', 'true');
    url.searchParams.set('timeRange', '24h');
    url.searchParams.set('page', String(page));
    url.searchParams.set('pageSize', String(PAGE_SIZE));
    url.searchParams.set('sortBy', 'createdAt');
    url.searchParams.set('sortDirection', 'desc');

    const payload = await requestJson(url, {
      headers: {
        accept: 'application/json',
        'x-api-key': satflowKey
      }
    }, 'Satflow');

    const items = satflowItems(payload);
    observedSales += items.length;

    for (const item of items) {
      const sale = normalizeSatflowSale(item);
      if (!sale) continue;
      const current = totals.get(sale.key) || { name: sale.name, type: sale.type, volumeSats: 0 };
      current.volumeSats += sale.volumeSats;
      totals.set(sale.key, current);
    }

    const totalPages = satflowTotalPages(payload);
    if (items.length === 0 || items.length < PAGE_SIZE || (totalPages && page >= totalPages)) break;
    page += 1;
  }

  if (page > MAX_PAGES) throw new Error('Satflow pagination exceeded safety limit');

  return {
    observedSales,
    assets: [...totals.values()]
      .filter((asset) => asset.volumeSats > 0)
      .map((asset) => ({
        name: asset.name,
        type: asset.type,
        volumeBtc: asset.volumeSats / SATS_PER_BTC,
        source: 'Satflow'
      }))
  };
}

async function fetchUnisatVolumes() {
  const assets = new Map();
  let start = 0;

  for (let page = 0; page < UNISAT_MAX_PAGES; page += 1) {
    const payload = await requestJson(UNISAT_URL, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${unisatKey}`
      },
      body: JSON.stringify({ timeType: 'day1', start, limit: UNISAT_PAGE_SIZE })
    }, 'UniSat');

    const list = Array.isArray(payload?.data?.list) ? payload.data.list : [];
    for (const item of list) {
      const name = text(item?.tick);
      const volumeBtc = positiveNumber(item?.btcVolume);
      if (!name || !volumeBtc) continue;
      assets.set(name.toLowerCase(), { name, type: 'BRC-20', volumeBtc, source: 'UniSat' });
    }

    if (list.length < UNISAT_PAGE_SIZE) break;
    start += UNISAT_PAGE_SIZE;
  }

  return [...assets.values()];
}

const [satflow, brc20] = await Promise.all([fetchSatflowVolumes(), fetchUnisatVolumes()]);
const ranked = [...satflow.assets, ...brc20]
  .filter((asset) => Number.isFinite(asset.volumeBtc) && asset.volumeBtc > 0)
  .sort((a, b) => b.volumeBtc - a.volumeBtc)
  .slice(0, 5)
  .map((asset, index) => ({ rank: index + 1, ...asset }));

if (ranked.length < 5) {
  throw new Error(`Only ${ranked.length} valid ranked assets were produced; refusing to publish incomplete data`);
}

const payload = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  window: '24h',
  methodology: 'Individual Ordinals collections and Runes from Satflow indexed 24h sales; individual BRC-20 tickers from UniSat day1 btcVolume. Combined and ranked by BTC volume.',
  providers: {
    satflow: { externalMarketplaceData: true, observedSales: satflow.observedSales },
    unisat: { timeType: 'day1' }
  },
  assets: ranked
};

await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
console.log(`Wrote ${ranked.length} ranked assets to ${outputPath}`);
