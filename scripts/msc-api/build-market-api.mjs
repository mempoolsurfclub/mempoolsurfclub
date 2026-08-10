import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { buildMarketSnapshots } from './market-data.mjs';

const outputRoot = process.argv[2] || 'data/api';
const marketDir = join(outputRoot, 'v1', 'market');
const snapshots = await buildMarketSnapshots();

await mkdir(marketDir, { recursive: true });
await Promise.all([
  writeFile(join(outputRoot, 'v1', 'manifest.json'), `${JSON.stringify(snapshots.manifest, null, 2)}\n`, 'utf8'),
  writeFile(join(marketDir, 'homepage.json'), `${JSON.stringify(snapshots.homepage, null, 2)}\n`, 'utf8'),
  writeFile(join(marketDir, 'ordinals.json'), `${JSON.stringify(snapshots.ordinals, null, 2)}\n`, 'utf8'),
  writeFile(join(marketDir, 'runes.json'), `${JSON.stringify(snapshots.runes, null, 2)}\n`, 'utf8')
]);

console.log(`Wrote MSC API ${snapshots.manifest.mode.toUpperCase()} market snapshots to ${outputRoot}`);
