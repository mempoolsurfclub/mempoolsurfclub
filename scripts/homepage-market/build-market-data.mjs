import fs from 'node:fs/promises';
import path from 'node:path';

const API_ROOT = 'https://api.bestinslot.xyz/v3';
const API_KEY = String(process.env.BESTINSLOT_API_KEY || '').trim();
const OUTPUT_PATH = process.argv[2] || 'data/homepage-market.json';
const PAGE_SIZE = 300;
const COLLECTION_COUNT = 100;
const CONCURRENCY = 4;
const MAX_RETRIES = 4;
const REQUEST_TIMEOUT_MS = 20000;
const SATS_PER_BTC = 100000000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function asNonNegativeSafeInteger(value, label) {
  const number = Number(value);
  if (!Number.isSafeInteger(number) || number < 0) {
    throw new Error(`invalid ${label}: ${value}`);
  }
  return number;
}

function asNonNegativeFinite(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) {
    throw new Error(`invalid ${label}: ${value}`);
  }
  return number;
}

async function requestJson(relativePath, attempt = 0) {
  if (!API_KEY) throw new Error('BESTINSLOT_API_KEY is required');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_ROOT}${relativePath}`, {
      headers: {
        accept: 'application/json',
        'x-api-key': API_KEY
      },
      signal: controller.signal
    });

    if (response.status === 429 || response.status >= 500) {
      if (attempt >= MAX_RETRIES) throw new Error(`provider http ${response.status}`);
      const retryAfter = Number.parseInt(response.headers.get('retry-after') || '', 10);
      const delay = Number.isFinite(retryAfter) && retryAfter > 0
        ? retryAfter * 1000
        : Math.min(1500 * (2 ** attempt), 12000);
      await sleep(delay);
      return requestJson(relativePath, attempt + 1);
    }

    if (!response.ok) throw new Error(`provider http ${response.status}`);
    const type = response.headers.get('content-type') || '';
    if (!type.includes('json')) throw new Error('provider returned non-json response');
    return response.json();
  } finally {
    clearTimeout(timeout);
  }
}

async function mapConcurrent(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;

  async function run() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(items[index], index);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => run()));
  return results;
}

function unwrapData(payload, label) {
  if (!payload || !Object.prototype.hasOwnProperty.call(payload, 'data')) {
    throw new Error(`${label} response missing data`);
  }
  return payload.data;
}

async function fetchAllPages(endpoint, sortBy) {
  const first = await requestJson(`${endpoint}?sort_by=${encodeURIComponent(sortBy)}&order=asc&offset=0&count=${PAGE_SIZE}`);
  const firstData = unwrapData(first, endpoint);
  if (!Array.isArray(firstData)) throw new Error(`${endpoint} data is not an array`);
  if (firstData.length < PAGE_SIZE) return { rows: firstData, blockHeight: Number(first.block_height) || null };

  const rows = [...firstData];
  let offset = PAGE_SIZE;

  while (true) {
    const batchOffsets = Array.from({ length: CONCURRENCY }, (_, index) => offset + index * PAGE_SIZE);
    const pages = await mapConcurrent(batchOffsets, CONCURRENCY, async (pageOffset) => {
      const payload = await requestJson(`${endpoint}?sort_by=${encodeURIComponent(sortBy)}&order=asc&offset=${pageOffset}&count=${PAGE_SIZE}`);
      const data = unwrapData(payload, endpoint);
      if (!Array.isArray(data)) throw new Error(`${endpoint} page is not an array`);
      return { data, blockHeight: Number(payload.block_height) || null };
    });

    let reachedEnd = false;
    for (const page of pages) {
      rows.push(...page.data);
      if (page.data.length < PAGE_SIZE) {
        reachedEnd = true;
        break;
      }
    }

    if (reachedEnd) break;
    offset += PAGE_SIZE * CONCURRENCY;

    if (offset > 2000000) throw new Error(`${endpoint} pagination safety limit exceeded`);
  }

  return { rows, blockHeight: Number(first.block_height) || null };
}

function normalizeBrc20(row) {
  const ticker = String(row && (row.original_ticker || row.ticker) || '').trim();
  if (!ticker) return null;
  const saleInfo = row && row.total_sale_info;
  if (!saleInfo) return null;
  const volumeSats = asNonNegativeSafeInteger(saleInfo.vol_1d, `BRC-20 ${ticker} vol_1d`);
  return {
    id: `brc20:${String(row.ticker || ticker).toLowerCase()}`,
    type: 'brc-20',
    name: ticker,
    volumeSats
  };
}

function normalizeRune(row) {
  const id = String(row && row.rune_id || '').trim();
  const name = String(row && (row.spaced_rune_name || row.rune_name) || '').trim();
  if (!id || !name) return null;
  const saleInfo = row && row.total_sale_info;
  if (!saleInfo) return null;
  const volumeSats = asNonNegativeSafeInteger(saleInfo.vol_1d, `Rune ${name} vol_1d`);
  return {
    id: `rune:${id}`,
    type: 'rune',
    name,
    volumeSats,
    providerLookup: String(row.rune_name || '').trim()
  };
}

function normalizeCollection(row) {
  const slug = String(row && row.slug || '').trim();
  const name = String(row && row.name || '').trim();
  if (!slug || !name) return null;
  const volumeBtc = asNonNegativeFinite(row.vol_24h_in_btc, `Ordinal ${name} vol_24h_in_btc`);
  const volumeSats = Math.round(volumeBtc * SATS_PER_BTC);
  if (!Number.isSafeInteger(volumeSats)) throw new Error(`Ordinal ${name} volume exceeds safe integer range`);
  return {
    id: `ordinal:${slug}`,
    type: 'ordinal',
    name,
    volumeSats
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

async function validateTopProtocolVolumes(brc20, runes) {
  const checks = [];

  for (const asset of sortAssets(brc20).slice(0, 5)) {
    checks.push(async () => {
      const ticker = asset.id.slice('brc20:'.length);
      const payload = await requestJson(`/brc20/sales_info?ticker=${encodeURIComponent(ticker)}`);
      const data = unwrapData(payload, 'BRC-20 sales_info');
      if (String(data.marketplace || '').toLowerCase() !== 'all') throw new Error(`BRC-20 ${asset.name} sales_info is not marketplace=all`);
      const verified = asNonNegativeSafeInteger(data.vol_1d, `BRC-20 ${asset.name} verified vol_1d`);
      if (verified !== asset.volumeSats) throw new Error(`BRC-20 ${asset.name} volume mismatch`);
    });
  }

  for (const asset of sortAssets(runes).slice(0, 5)) {
    checks.push(async () => {
      if (!asset.providerLookup) throw new Error(`Rune ${asset.name} missing provider lookup name`);
      const payload = await requestJson(`/runes/sales_info?rune_name=${encodeURIComponent(asset.providerLookup)}`);
      const data = unwrapData(payload, 'Runes sales_info');
      if (String(data.marketplace || '').toLowerCase() !== 'all') throw new Error(`Rune ${asset.name} sales_info is not marketplace=all`);
      const verified = asNonNegativeSafeInteger(data.vol_1d, `Rune ${asset.name} verified vol_1d`);
      if (verified !== asset.volumeSats) throw new Error(`Rune ${asset.name} volume mismatch`);
    });
  }

  await mapConcurrent(checks, CONCURRENCY, (check) => check());
}

async function build() {
  const [brcPageSet, runePageSet, collectionPayload] = await Promise.all([
    fetchAllPages('/brc20/tickers', 'deploy_ts'),
    fetchAllPages('/runes/tickers', 'rune_number'),
    requestJson(`/collection/collections?sort_by=vol_24h_in_btc&order=desc&offset=0&count=${COLLECTION_COUNT}`)
  ]);

  const collectionRows = unwrapData(collectionPayload, 'collections');
  if (!Array.isArray(collectionRows)) throw new Error('collections data is not an array');

  const brc20 = dedupeAssets(brcPageSet.rows.map(normalizeBrc20).filter(Boolean));
  const runes = dedupeAssets(runePageSet.rows.map(normalizeRune).filter(Boolean));
  const ordinals = dedupeAssets(collectionRows.map(normalizeCollection).filter(Boolean));

  if (brc20.length < 1000) throw new Error(`unexpected BRC-20 coverage: ${brc20.length}`);
  if (runes.length < 1000) throw new Error(`unexpected Runes coverage: ${runes.length}`);
  if (ordinals.length < 20) throw new Error(`unexpected Ordinals coverage: ${ordinals.length}`);

  await validateTopProtocolVolumes(brc20, runes);

  const ranked = sortAssets(dedupeAssets([...brc20, ...runes, ...ordinals]));
  if (ranked.length < 5) throw new Error('insufficient ranked assets');

  const assets = ranked.slice(0, 25).map(({ providerLookup, ...asset }, index) => ({
    rank: index + 1,
    ...asset,
    volumeBtc: asset.volumeSats / SATS_PER_BTC
  }));

  const payload = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    window: '24h',
    methodology: 'Aggregated indexed marketplace sales across Ordinals collections, Runes, and BRC-20; values normalized to satoshis and ranked by 24-hour BTC volume.',
    provider: 'bestinslot',
    coverage: {
      brc20: brc20.length,
      runes: runes.length,
      ordinalsCandidates: ordinals.length
    },
    providerBlockHeight: Math.max(
      Number(brcPageSet.blockHeight) || 0,
      Number(runePageSet.blockHeight) || 0,
      Number(collectionPayload.block_height) || 0
    ) || null,
    assets
  };

  const directory = path.dirname(OUTPUT_PATH);
  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(OUTPUT_PATH, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${assets.length} ranked assets to ${OUTPUT_PATH}`);
  console.log(`Coverage: ${brc20.length} BRC-20, ${runes.length} Runes, ${ordinals.length} Ordinals candidates`);
}

await build();
