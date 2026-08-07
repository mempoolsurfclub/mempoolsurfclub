import { writeFile } from 'node:fs/promises';

const API_ROOT = 'https://api.coingecko.com/api/v3';
const outputPath = process.argv[2] || 'data/homepage-market.json';
const REQUEST_TIMEOUT_MS = 20_000;
const MAX_RETRIES = 5;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clean(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function positive(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : null;
}

async function requestJson(path, attempt = 0) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(`${API_ROOT}${path}`, {
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
        : Math.min(4000 * (2 ** attempt), 60_000);
      await sleep(delay);
      return requestJson(path, attempt + 1);
    }

    if (!response.ok) throw new Error(`CoinGecko HTTP ${response.status}`);
    return response.json();
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchBrc20() {
  const params = new URLSearchParams({
    vs_currency: 'btc',
    category: 'brc-20',
    order: 'volume_desc',
    per_page: '50',
    page: '1',
    sparkline: 'false',
    precision: 'full'
  });
  const rows = await requestJson(`/coins/markets?${params.toString()}`);
  if (!Array.isArray(rows)) throw new Error('CoinGecko BRC-20 response is not an array');

  const assets = [];
  const seen = new Set();
  for (const row of rows) {
    const name = clean(row?.symbol || row?.name).toUpperCase();
    const volumeBtc = positive(row?.total_volume);
    if (!name || !volumeBtc || seen.has(name)) continue;
    seen.add(name);
    assets.push({ name, type: 'BRC-20', volumeBtc, source: 'CoinGecko' });
  }

  if (assets.length < 5) throw new Error(`CoinGecko returned only ${assets.length} BRC-20 assets with 24h volume`);
  return assets;
}

const ranked = (await fetchBrc20())
  .sort((a, b) => b.volumeBtc - a.volumeBtc || a.name.localeCompare(b.name))
  .slice(0, 5)
  .map((asset, index) => ({ rank: index + 1, ...asset }));

const payload = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  window: '24h',
  unit: 'BTC',
  methodology: 'BRC-20 assets in the CoinGecko BRC-20 category, ranked by CoinGecko 24h total trading volume with BTC as the target currency.',
  providers: {
    brc20: 'CoinGecko Keyless Public API /coins/markets category=brc-20'
  },
  assets: ranked
};

await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
console.log(`Wrote ${ranked.length} ranked assets to ${outputPath}`);
console.log(ranked.map((row) => `${row.rank}. ${row.name} (${row.type}) ${row.volumeBtc.toFixed(8)} BTC`).join('\n'));
