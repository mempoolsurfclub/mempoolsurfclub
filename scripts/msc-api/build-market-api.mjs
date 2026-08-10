import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { buildMarketSnapshots } from './market-data.mjs';

const outputRoot = process.argv[2] || 'data/api';
const marketDir = join(outputRoot, 'v1', 'market');

function diagnosticCode(error) {
  const message = String(error?.message || error || '');
  if (/HTTP 401|HTTP 403/.test(message)) return 'SATFLOW_AUTH_FAILED';
  if (/HTTP 400|HTTP 404|HTTP 422/.test(message)) return 'SATFLOW_REQUEST_REJECTED';
  if (/none could be normalized/i.test(message)) return 'SATFLOW_NORMALIZATION_FAILED';
  if (/expected at least 5/i.test(message)) return 'SATFLOW_INSUFFICIENT_MARKET_DATA';
  if (/HTTP 429/.test(message)) return 'SATFLOW_RATE_LIMITED';
  return 'SATFLOW_REQUEST_FAILED';
}

function safePreview(error) {
  const generatedAt = new Date().toISOString();
  const diagnostic = diagnosticCode(error);
  const common = {
    schemaVersion: 1,
    api: 'MSC API',
    version: 'v1',
    generatedAt,
    window: '24h',
    unit: 'BTC',
    mode: 'preview',
    assets: []
  };

  return {
    manifest: {
      schemaVersion: 1,
      api: 'MSC API',
      version: 'v1',
      generatedAt,
      mode: 'preview',
      diagnostic,
      endpoints: [
        '/v1/market/homepage.json',
        '/v1/market/ordinals.json',
        '/v1/market/runes.json'
      ],
      providers: {
        ordinals: { name: 'Satflow', status: 'error' },
        runes: { name: 'Satflow', status: 'error' }
      }
    },
    homepage: {
      ...common,
      methodology: 'Market data is withheld until the Satflow response passes MSC validation.',
      sourceLine: 'MSC API · MARKET DATA TEMPORARILY UNAVAILABLE'
    },
    ordinals: { ...common, protocol: 'ORDINAL', provider: 'Satflow' },
    runes: { ...common, protocol: 'RUNE', provider: 'Satflow' }
  };
}

let snapshots;
try {
  snapshots = await buildMarketSnapshots();
} catch (error) {
  snapshots = safePreview(error);
  console.error(`MSC API provider diagnostic: ${snapshots.manifest.diagnostic}`);
}

await mkdir(marketDir, { recursive: true });
await Promise.all([
  writeFile(join(outputRoot, 'v1', 'manifest.json'), `${JSON.stringify(snapshots.manifest, null, 2)}\n`, 'utf8'),
  writeFile(join(marketDir, 'homepage.json'), `${JSON.stringify(snapshots.homepage, null, 2)}\n`, 'utf8'),
  writeFile(join(marketDir, 'ordinals.json'), `${JSON.stringify(snapshots.ordinals, null, 2)}\n`, 'utf8'),
  writeFile(join(marketDir, 'runes.json'), `${JSON.stringify(snapshots.runes, null, 2)}\n`, 'utf8')
]);

console.log(`Wrote MSC API ${snapshots.manifest.mode.toUpperCase()} market snapshots to ${outputRoot}`);
