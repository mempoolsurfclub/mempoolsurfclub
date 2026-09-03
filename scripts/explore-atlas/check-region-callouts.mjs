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
  if (!new RegExp(`\\b${slug}: \\{ fallbackSide: '(?:left|right)', yBias: -?0\\.\\d+ \\}`).test(js)) {
    fail(`missing reviewed alignment fallback for ${slug}`);
  }
  if (!loader.includes(`data-atlas-route-${slug}="{{ section.settings.${slug}_link }}"`)) {
    fail(`missing route registry field for ${slug}`);
  }
});

if (!js.includes("new Set(['preview', 'locked'])")) fail('callouts must support both preview and locked zoom states');
if (!js.includes('resolveSide')) fail('focused-view side resolution is missing');
if (!js.includes('geometry.center.x > viewCenterX')) fail('region side must be determined from focused composition');
if (!js.includes('findHorizontalRegionEdge')) fail('horizontal title-to-region leader alignment is missing');
if (!js.includes('if (!intersections.length) return null;')) fail('leader lanes must intersect the selected region horizontally');
if (!js.includes('segmentIntersectsBox')) fail('leader collision detection is missing');
if (!js.includes('collectTextObstacles')) fail('text obstacle collection is missing');
if (!js.includes('if (textCollisions || lineCollisions || tooShort) return;')) fail('obstructed callout lanes must be rejected rather than scored');
if (!js.includes('preferredRatio = clamp(regionRatio + layout.yBias')) fail('title lane must align from the region focused center');
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
  console.log('8 reviewed alignment fallbacks; preview + locked callouts; zero-crossing horizontal leaders; Wallets route enabled only.');
}
