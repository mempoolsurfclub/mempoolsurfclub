import { writeFile } from 'node:fs/promises';
import { buildMarketSnapshots } from '../msc-api/market-data.mjs';

const outputPath = process.argv[2] || 'data/homepage-market.json';
const { homepage } = await buildMarketSnapshots();
await writeFile(outputPath, `${JSON.stringify(homepage, null, 2)}\n`, 'utf8');
console.log(`Wrote homepage compatibility snapshot in ${homepage.mode.toUpperCase()} mode to ${outputPath}`);
