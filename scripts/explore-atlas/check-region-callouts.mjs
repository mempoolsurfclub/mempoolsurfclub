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
const reviewed = {
  ordinals: { side: 'right', x: '0.82', y: '0.45' },
  wallets: { side: 'left', x: '0.09', y: '0.35' },
  marketplaces: { side: 'right', x: '0.82', y: '0.47' },
  exchanges: { side: 'right', x: '0.82', y: '0.47' },
  network: { side: 'left', x: '0.09', y: '0.37' },
};
const automatic = {
  mining: { side: 'right', bias: '0.04' },
  runes: { side: 'right', bias: '-0.03' },
  payments: { side: 'left', bias: '-0.02' },
};

slugs.forEach((slug) => {
  if (!loader.includes(`data-atlas-route-${slug}="{{ section.settings.${slug}_link }}"`)) {
    fail(`missing route registry field for ${slug}`);
  }
});

Object.entries(reviewed).forEach(([slug, config]) => {
  const expected = `${slug}: { reviewedSide: '${config.side}', reviewedX: ${config.x}, reviewedY: ${config.y} }`;
  if (!js.includes(expected)) fail(`missing screenshot-reviewed X/Y anchor for ${slug}`);
});

Object.entries(automatic).forEach(([slug, config]) => {
  const expected = `${slug}: { fallbackSide: '${config.side}', yBias: ${config.bias} }`;
  if (!js.includes(expected)) fail(`unexpected change to approved automatic placement for ${slug}`);
});

if (!js.includes("new Set(['preview', 'locked'])")) fail('callouts must support both preview and locked zoom states');
if (!js.includes('if (layout.reviewedSide) return layout.reviewedSide;')) fail('reviewed title sides must override automatic drift');
if (!js.includes('if (Number.isFinite(layout.reviewedY)) return layout.reviewedY;')) fail('reviewed title lanes must override automatic vertical drift');
if (!js.includes('if (Number.isFinite(layout.reviewedX)) return layout.reviewedX;')) fail('reviewed title X anchors must override generic edge placement');
if (!js.includes('resolveTextRatio')) fail('explicit reviewed horizontal anchor resolver is missing');
if (!js.includes('findHorizontalRegionEdge')) fail('horizontal title-to-region leader alignment is missing');
if (!js.includes('if (!intersections.length) return null;')) fail('leader lanes must intersect the selected region horizontally');
if (!js.includes('segmentIntersectsBox')) fail('leader collision detection is missing');
if (!js.includes('collectTextObstacles')) fail('text obstacle collection is missing');
if (!js.includes('if (textCollisions || lineCollisions || tooShort) return;')) fail('obstructed callout lanes must be rejected rather than scored');
if (!js.includes('const minLeaderRatio = reviewed ? 0.035 : 0.07;')) fail('reviewed anchors must permit a restrained shorter leader');
if (!js.includes('renderTimer = window.setTimeout(renderIfCurrent, reduceMotion ? 0 : 90);')) fail('preview callout must render during the zoom animation');
if (!js.includes('settleTimer = window.setTimeout(renderIfCurrent, 455);')) fail('callout must settle against the final focused viewBox');
if (!js.includes("callout.dataset.atlasCalloutPlacement = reviewed ? 'reviewed' : 'automatic';")) fail('reviewed/automatic placement state is not exposed');
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
  console.log('5 screenshot-reviewed X/Y anchors; 3 preserved automatic placements; preview + locked callouts; zero-crossing horizontal leaders; Wallets route enabled only.');
}
