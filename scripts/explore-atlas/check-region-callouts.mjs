import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const fail = (message) => {
  console.error(`Explore Atlas callout validation failed: ${message}`);
  process.exitCode = 1;
};

const js = read('assets/msc-explore-atlas-callouts-v2.js');
const css = read('assets/msc-explore-atlas-callouts.css');
const loader = read('sections/msc-explore-atlas-region-callouts.liquid');
const template = read('templates/page.explore.json');

const slugs = ['ordinals', 'runes', 'wallets', 'marketplaces', 'mining', 'payments', 'exchanges', 'network'];
const reviewed = {
  ordinals: { side: 'right', x: '0.80', y: '0.44' },
  wallets: { side: 'left', x: '0.18', y: '0.46' },
  marketplaces: { side: 'right', x: '0.94', y: '0.46' },
  exchanges: { side: 'right', x: '0.94', y: '0.54' },
  network: { side: 'left', x: '0.08', y: '0.52' },
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
  const expected = `${slug}: { reviewed: true, side: '${config.side}', x: ${config.x}, y: ${config.y} }`;
  if (!js.includes(expected)) fail(`missing viewport-safe reviewed placement for ${slug}`);
  const x = Number(config.x);
  if (x < 0.04 || x > 0.96) fail(`${slug} reviewed X anchor is outside the safe visible viewport`);
});

Object.entries(automatic).forEach(([slug, config]) => {
  const expected = `${slug}: { fallbackSide: '${config.side}', yBias: ${config.bias} }`;
  if (!js.includes(expected)) fail(`unexpected change to automatic placement for ${slug}`);
});

if (!js.includes("new Set(['preview', 'locked'])")) fail('callouts must support preview and locked zoom states');
if (!js.includes('clampTitleIntoViewport')) fail('title viewport clamping is missing');
if (!js.includes("callout.dataset.atlasLeader = leaderPath ? 'visible' : 'suppressed';")) fail('leader state must be independent from title visibility');
if (!js.includes("callout.classList.add('is-visible');")) fail('active title visibility is missing');
if (!js.includes("leader.style.display = 'none';")) fail('leader must be suppressible without hiding the title');
if (!js.includes('routeLeader')) fail('independent leader routing is missing');
if (!js.includes('laneOffsets = [0, -0.035, 0.035')) fail('leader must search nearby clean lanes without moving the title');
if (!js.includes('segmentIntersectsBox')) fail('leader collision detection is missing');
if (!js.includes('collectTextObstacles')) fail('visible map-text obstacle collection is missing');
if (!js.includes('findHorizontalRegionEdge')) fail('leader-to-region intersection is missing');
if (!js.includes('renderTimer = window.setTimeout(renderIfCurrent, reduceMotion ? 0 : 80);')) fail('preview title must render during zoom');
if (!js.includes('settleTimer = window.setTimeout(renderIfCurrent, 460);')) fail('title must settle against final focused viewBox');
if (!css.includes('calc(36px * var(--atlas-counter-scale, 1))')) fail('region title must preserve the 3x 36px hierarchy');
if (!loader.includes("{{ 'msc-explore-atlas-callouts.css' | asset_url | stylesheet_tag }}")) fail('callout stylesheet is not loaded');
if (!loader.includes("{{ 'msc-explore-atlas-callouts-v2.js' | asset_url }}")) fail('viewport-safe callout renderer is not loaded');
if (loader.includes("{{ 'msc-explore-atlas-callouts.js' | asset_url }}")) fail('legacy callout renderer must not remain active');

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
  if (settings[`${slug}_link`]) fail(`${slug} must stay unlinked until its Shopify Page object is created`);
});

const order = parsed.order || [];
const atlasIndex = order.indexOf('msc_explore_atlas');
const calloutIndex = order.indexOf('msc_atlas_region_callouts');
if (atlasIndex < 0 || calloutIndex !== atlasIndex + 1) {
  fail('Atlas callout loader must mount immediately after the Atlas shell');
}

if (!process.exitCode) {
  console.log('Explore Atlas callout validation passed.');
  console.log('5 viewport-safe reviewed titles; titles never rejected by leader routing; clean-lane leader fallback; 3 preserved automatic placements; preview + locked; Wallets route enabled only.');
}
