import fs from 'node:fs/promises';
import path from 'node:path';

const API_ROOT = 'https://api.coingecko.com/api/v3';
const OUTPUT_PATH = process.argv[2] || 'data/homepage-market.json';
const SATS_PER_BTC = 100000000;
const PAGE_SIZE = 250;
const ORDINAL_CANDIDATE_COUNT = 12;
const MAX_CATEGORY_PAGES = 20;
const MAX_NFT_LIST_PAGES = 20;
const REQUEST_TIMEOUT_MS = 20000;
const REQUEST_SPACING_MS = 2600;
const MAX_RETRIES = 5;

let lastRequestAt = 0;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function asFiniteNonNegative(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) {
    throw new Error(`invalid ${label}: ${value}`);
  }
  return number;
}

function btcToSats(value, label) {
  const btc = asFiniteNonNegative(value, label);
  const sats = Math.round(btc * SATS_PER_BTC);
  if (!Number.isSafeInteger(sats) || sats < 0) {
    throw new Error(`invalid ${label} after satoshi conversion: ${value}`);
  }
  return sats;
}

async function respectPublicRateLimit() {
  const elapsed = Date.now() - lastRequestAt;
  if (elapsed < REQUEST_SPACING_MS) await sleep(REQUEST_SPACING_MS - elapsed);
  lastRequestAt = Date.now();
}

async function requestJson(relativePath, attempt = 0) {
  await respectPublicRateLimit();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_ROOT}${relativePath}`, {
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
        : Math.min(4000 * (2 ** attempt), 60000);
      await sleep(delay);
      return requestJson(relativePath, attempt + 1);
    }

    if (!response.ok) throw new Error(`CoinGecko HTTP ${response.status}`);
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('json')) throw new Error('CoinGecko returned a non-JSON response');
    return response.json();
  } finally {
    clearTimeout(timeout);
  }
}

async function verifyCategoryIds() {
  const categories = await requestJson('/coins/categories/list');
  if (!Array.isArray(categories)) throw new Error('CoinGecko categories list is not an array');
  const ids = new Set(categories.map((item) => String(item && item.category_id || '')));
  for (const required of ['brc-20', 'runes']) {
    if (!ids.has(required)) throw new Error(`CoinGecko category not found: ${required}`);
  }
}

function normalizeCoinMarket(row, type) {
  if (!row || typeof row !== 'object') return null;
  const id = String(row.id || '').trim();
  const name = String(row.name || row.symbol || '').trim();
  if (!id || !name) return null;

  const volumeBtc = asFiniteNonNegative(row.total_volume, `${type} ${name} total_volume`);
  if (volumeBtc <= 0) return null;

  return {
    id: `${type}:${id}`,
    type,
    name,
    volumeSats: btcToSats(volumeBtc, `${type} ${name} total_volume`)
  };
}

async function fetchCoinCategory(category, type) {
  const assets = [];
  const seen = new Set();

  for (let page = 1; page <= MAX_CATEGORY_PAGES; page += 1) {
    const params = new URLSearchParams({
      vs_currency: 'btc',
      category,
      order: 'volume_desc',
      per_page: String(PAGE_SIZE),
      page: String(page),
      sparkline: 'false',
      precision: 'full'
    });
    const rows = await requestJson(`/coins/markets?${params.toString()}`);
    if (!Array.isArray(rows)) throw new Error(`${category} market response is not an array`);
    if (rows.length === 0) break;

    for (const row of rows) {
      const asset = normalizeCoinMarket(row, type);
      if (!asset || seen.has(asset.id)) continue;
      seen.add(asset.id);
      assets.push(asset);
    }
  }

  if (assets.length === 0) throw new Error(`CoinGecko returned no ${category} assets with 24-hour volume`);
  return assets;
}

async function fetchTopOrdinalIds() {
  const candidates = [];
  const seen = new Set();

  for (let page = 1; page <= MAX_NFT_LIST_PAGES; page += 1) {
    const params = new URLSearchParams({
      order: 'h24_volume_usd_desc',
      per_page: String(PAGE_SIZE),
      page: String(page)
    });
    const rows = await requestJson(`/nfts/list?${params.toString()}`);
    if (!Array.isArray(rows)) throw new Error('CoinGecko NFT list response is not an array');
    if (rows.length === 0) break;

    for (const row of rows) {
      if (String(row && row.asset_platform_id || '').toLowerCase() !== 'ordinals') continue;
      const id = String(row.id || '').trim();
      if (!id || seen.has(id)) continue;
      seen.add(id);
      candidates.push(id);
      if (candidates.length >= ORDINAL_CANDIDATE_COUNT) return candidates;
    }
  }

  if (candidates.length < 5) {
    throw new Error(`insufficient CoinGecko Ordinals candidates: ${candidates.length}`);
  }
  return candidates;
}

async function fetchOrdinal(id) {
  const row = await requestJson(`/nfts/${encodeURIComponent(id)}`);
  if (!row || typeof row !== 'object') throw new Error(`invalid Ordinals response for ${id}`);
  if (String(row.asset_platform_id || '').toLowerCase() !== 'ordinals') {
    throw new Error(`unexpected NFT platform for ${id}: ${row.asset_platform_id}`);
  }
  if (String(row.native_currency_symbol || '').toUpperCase() !== 'BTC') {
    throw new Error(`unexpected Ordinals native currency for ${id}: ${row.native_currency_symbol}`);
  }

  const name = String(row.name || row.symbol || id).trim();
  const volumeBtc = asFiniteNonNegative(
    row.volume_24h && row.volume_24h.native_currency,
    `Ordinal ${name} volume_24h.native_currency`
  );
  if (volumeBtc <= 0) return null;

  return {
    id: `ordinal:${id}`,
    type: 'ordinal',
    name,
    volumeSats: btcToSats(volumeBtc, `Ordinal ${name} volume_24h.native_currency`)
  };
}

function dedupeAssets(assets) {
  const byId = new Map();
  for (const asset of assets) {
    if (!asset) continue;
    const existing = byId.get(asset.id);
    if (!existing || asset.volumeSats > existing.volumeSats) byId.set(asset.id, asset);
  }
  return [...byId.values()];
}

function sortAssets(assets) {
  return [...assets].sort((a, b) => b.volumeSats - a.volumeSats || a.name.localeCompare(b.name));
}

async function build() {
  await verifyCategoryIds();

  const brc20 = await fetchCoinCategory('brc-20', 'brc-20');
  const runes = await fetchCoinCategory('runes', 'rune');
  const ordinalIds = await fetchTopOrdinalIds();

  const ordinals = [];
  for (const id of ordinalIds) {
    const asset = await fetchOrdinal(id);
    if (asset) ordinals.push(asset);
  }

  if (ordinals.length < 5) throw new Error(`insufficient Ordinals with non-zero 24-hour volume: ${ordinals.length}`);

  const ranked = sortAssets(dedupeAssets([...brc20, ...runes, ...ordinals]));
  if (ranked.length < 5) throw new Error('insufficient ranked Bitcoin assets');

  const assets = ranked.slice(0, 25).map((asset, index) => ({
    rank: index + 1,
    ...asset,
    volumeBtc: asset.volumeSats / SATS_PER_BTC
  }));

  const payload = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    window: '24h',
    unit: 'BTC',
    methodology: '24-hour trading volume across CoinGecko-tracked markets for BRC-20 and Runes plus CoinGecko-aggregated Bitcoin Ordinals marketplace volume; values normalized to BTC and ranked together.',
    provider: 'coingecko',
    attribution: 'Data provided by CoinGecko',
    attributionUrl: 'https://www.coingecko.com/en/api',
    coverage: {
      brc20Tracked: brc20.length,
      runesTracked: runes.length,
      ordinalsTopCandidatesChecked: ordinalIds.length,
      ordinalsWithVolume: ordinals.length
    },
    assets
  };

  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');

  console.log(`Wrote ${assets.length} ranked assets to ${OUTPUT_PATH}`);
  console.log(`Coverage: ${brc20.length} BRC-20, ${runes.length} Runes, ${ordinals.length} top Ordinals candidates with non-zero volume`);
}

await build();
