import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const fail = (message) => {
  console.error(`Explore Atlas callout validation failed: ${message}`);
  process.exitCode = 1;
};

const js = read('assets/msc-explore-atlas-callouts.js');
const css = read('assets/msc-explore-atlas-callouts.css');
const loader = read('sections/msc-explore-atlas-region-callouts.liquid');
const template = read('templates/page.explore.json');

const slugs = ['ordinals', 'runes', 'wallets', 'marketplaces', 'mining', 'payments', 'exchanges', 'network'];

slugs.forEach((slug) => {
  if (!new RegExp(`\\b${slug}: \\{ side: '(?:left|right)', y: 0\\.\\d+ \\}`).test(js)) {
    fail(`missing explicit placement for ${slug}`);
  }
  if (!loader.includes(`data-atlas-route-${slug}="{{ section.settings.${slug}_link }}"`)) {
    fail(`missing route registry field for ${slug}`);
  }
});

if (!js.includes('segmentIntersectsBox')) fail('leader collision detection is missing');
if (!js.includes('collectTextObstacles')) fail('text obstacle collection is missing');
if (!js.includes("mode !== 'locked'")) fail('callouts must remain locked-state only');
if (!css.includes('calc(36px * var(--atlas-counter-scale, 1))')) fail('region title must preserve the 3x 36px hierarchy');
if (!loader.includes("{{ 'msc-explore-atlas-callouts.css' | asset_url | stylesheet_tag }}")) fail('callout stylesheet is not loaded');
if (!loader.includes("{{ 'msc-explore-atlas-callouts.js' | asset_url }}")) fail('callout script is not loaded');

const parsed = JSON.parse(template.replace(/^\/\*[\s\S]*?\*\//, '').trim());
const calloutSection = parsed.sections?.msc_atlas_region_callouts;
if (calloutSection?.type !== 'msc-explore-atlas-region-callouts') {
  fail('Explore template does not mount the Atlas callout loader');
}

const settings = calloutSection?.settings || {};
if (settings.wallets_link !== '/pages/explore-wallets') {
  fail('Wallets must route to the created /pages/explore-wallets Page object');
}
slugs.filter((slug) => slug !== 'wallets').forEach((slug) => {
  if (settings[`${slug}_link`]) {
    fail(`${slug} must stay unlinked until its Shopify Page object is created`);
  }
});

const order = parsed.order || [];
const atlasIndex = order.indexOf('msc_explore_atlas');
const calloutIndex = order.indexOf('msc_atlas_region_callouts');
if (atlasIndex < 0 || calloutIndex !== atlasIndex + 1) {
  fail('Atlas callout loader must mount immediately after the Atlas shell');
}

if (!process.exitCode) {
  console.log('Explore Atlas callout validation passed.');
  console.log('8 explicit region placements; locked-state collision-aware leaders; Wallets route enabled only.');
}
