import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const readJson = (file) => JSON.parse(read(file));
const fail = (message) => {
  console.error(`Explore Wallets reference validation failed: ${message}`);
  process.exitCode = 1;
};

const runtime = readJson('assets/msc-explore-runtime.json');
const walletRecords = runtime.records.filter((record) => record.canonical_category === 'WALLETS');
const walletCategory = runtime.categories.find((category) => category.category === 'WALLETS');
const editorial = readJson('config/explore/msc-editorial.json');
const routes = readJson('config/explore/routes.json');
const section = read('sections/msc-explore-category.liquid');
const client = read('assets/msc-explore-category.js');
const css = read('assets/msc-explore-category.css');
const rawTemplate = read('templates/page.explore-category.json').replace(/^\/\*[\s\S]*?\*\/\s*/, '');
const template = JSON.parse(rawTemplate);

if (runtime.counts?.total_records !== 257) fail(`expected 257 total runtime records, found ${runtime.counts?.total_records}`);
if (walletCategory?.record_count !== 40) fail(`expected Wallets category count 40, found ${walletCategory?.record_count}`);
if (walletRecords.length !== 40) fail(`expected 40 Wallets records, found ${walletRecords.length}`);

const expectedStatus = { ACTIVE: 36, HISTORICAL: 1, INACTIVE: 2, UNCERTAIN: 1 };
const actualStatus = Object.fromEntries(Object.keys(expectedStatus).map((status) => [
  status,
  walletRecords.filter((record) => record.lifecycle_status === status).length
]));
for (const [status, expected] of Object.entries(expectedStatus)) {
  if (actualStatus[status] !== expected) fail(`expected ${expected} ${status} Wallets records, found ${actualStatus[status]}`);
}

const expectedTopics = {
  'Software Wallets': 13,
  'Bitcoin Asset Wallets': 5,
  'Lightning & Payment Wallets': 9,
  'Multisig & Collaborative Custody': 4,
  'Hardware & Signing Devices': 9
};
for (const [topic, expected] of Object.entries(expectedTopics)) {
  const actual = walletRecords.filter((record) => record.topic === topic).length;
  if (actual !== expected) fail(`expected ${expected} records for topic "${topic}", found ${actual}`);
}

const xverse = walletRecords.find((record) => record.registry_id === 'MSC-EXP-WAL-014');
if (!xverse || xverse.canonical_name !== 'Xverse') fail('Xverse must resolve to MSC-EXP-WAL-014');
if (xverse?.msc_editorial?.label !== 'MSC Favorite') fail('Xverse runtime record must carry the MSC Favorite label');

const editorialFavorite = editorial.favorites?.find((item) => item.registry_id === 'MSC-EXP-WAL-014');
if (!editorialFavorite || editorialFavorite.expected_name !== 'Xverse') fail('editorial config must map Xverse by exact Registry ID');

if (routes.category_template_suffix !== 'explore-category') fail('route config category template suffix must remain explore-category');
if (routes.category_handles?.WALLETS !== 'explore-wallets') fail('Wallets route handle must remain explore-wallets');

if (template.sections?.msc_explore_category?.type !== 'msc-explore-category') fail('page.explore-category.json must render the MSC Explore category section');
if (!section.includes('data-category="WALLETS"')) fail('reference section must remain explicitly scoped to WALLETS in Stage 2');
if (!section.includes("'msc-explore-runtime.json' | asset_url")) fail('section must load the generated Explore runtime asset');
if (!client.includes("category !== 'WALLETS'")) fail('client must block categories outside the Stage 2 Wallets scope');
if (!client.includes('data-planned-profile-route')) fail('client must expose planned canonical profile-route markup');
if (!client.includes('event.preventDefault()')) fail('planned profile routes must remain non-navigable until profile publication');
if (!css.includes('@media (prefers-reduced-motion: reduce)')) fail('category CSS must include reduced-motion handling');

if (!process.exitCode) {
  console.log('Explore Wallets reference validation passed.');
  console.log(JSON.stringify({
    runtime_total: runtime.counts.total_records,
    wallets_total: walletRecords.length,
    statuses: actualStatus,
    topics: expectedTopics,
    xverse_favorite: xverse.registry_id,
    route_handle: routes.category_handles.WALLETS,
    template_suffix: routes.category_template_suffix
  }, null, 2));
}
