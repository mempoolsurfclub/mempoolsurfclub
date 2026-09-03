import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const fail = (message) => {
  console.error(`Explore Atlas region-card validation failed: ${message}`);
  process.exitCode = 1;
};

const js = read('assets/msc-explore-atlas-region-card.js');
const css = read('assets/msc-explore-atlas-region-card.css');
const loader = read('sections/msc-explore-atlas-region-card.liquid');
const template = read('templates/page.explore.json');

const slugs = ['ordinals', 'runes', 'wallets', 'marketplaces', 'mining', 'payments', 'exchanges', 'network'];

slugs.forEach((slug) => {
  if (!js.includes(`${slug}:`)) fail(`missing card copy for ${slug}`);
  if (!loader.includes(`data-atlas-region-card-route-${slug}="{{ section.settings.${slug}_link }}"`)) {
    fail(`missing route setting for ${slug}`);
  }
});

if (!js.includes("mode !== 'locked'")) fail('card must appear only after a region is selected/locked');
if (!js.includes("attributeFilter: ['data-atlas-active', 'data-atlas-mode']")) fail('card must react to the existing Atlas state contract');
if (!js.includes("viewport.appendChild(card)")) fail('card must be mounted inside the fixed map viewport layer');
if (!js.includes("card.className = 'msc-atlas-region-card'")) fail('card must use a fixed HTML card rather than SVG geography');
if (!js.includes('card.href = route')) fail('published region pages must make the entire card navigable');
if (!js.includes("card.classList.toggle('is-disabled', !route)")) fail('unpublished region routes must not become dead links');
if (js.includes('polyline') || js.includes('leader') || js.includes('getBBox')) fail('region card must not use leader-line or SVG positioning logic');

if (!css.includes('left: 1.4rem;')) fail('desktop card must be fixed to the lower-left viewport corner');
if (!css.includes('bottom: 1.4rem;')) fail('desktop card must be fixed to the lower-left viewport corner');
if (!css.includes('background: rgba(16, 40, 45, .94);')) fail('card must preserve the MSC widget background treatment');
if (!css.includes('border: 1px solid rgba(212, 190, 153, .48);')) fail('card must preserve the MSC widget border treatment');

if (!loader.includes("{{ 'msc-explore-atlas-region-card.css' | asset_url | stylesheet_tag }}")) fail('region-card stylesheet is not loaded');
if (!loader.includes("{{ 'msc-explore-atlas-region-card.js' | asset_url }}")) fail('region-card script is not loaded');

const parsed = JSON.parse(template.replace(/^\/\*[\s\S]*?\*\//, '').trim());
const cardSection = parsed.sections?.msc_atlas_region_card;
if (cardSection?.type !== 'msc-explore-atlas-region-card') fail('Explore template does not mount the region-card loader');

const order = parsed.order || [];
const atlasIndex = order.indexOf('msc_explore_atlas');
const cardIndex = order.indexOf('msc_atlas_region_card');
if (atlasIndex < 0 || cardIndex !== atlasIndex + 1) fail('region-card loader must mount immediately after the Atlas shell');

const settings = cardSection?.settings || {};
if (settings.wallets_link !== '/pages/explore-wallets') fail('Wallets must route to the created /pages/explore-wallets Page object');
slugs.filter((slug) => slug !== 'wallets').forEach((slug) => {
  if (settings[`${slug}_link`]) fail(`${slug} must stay unlinked until its Shopify Page object exists`);
});

if (!process.exitCode) {
  console.log('Explore Atlas region-card validation passed.');
  console.log('Fixed lower-left HTML card; locked-state only; 8 category copies; Wallets route enabled only; no SVG positioning or leader-line logic.');
}
