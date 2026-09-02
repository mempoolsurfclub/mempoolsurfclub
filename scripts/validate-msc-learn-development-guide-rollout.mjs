import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const read = (file) => fs.readFileSync(file, 'utf8');
const sourceDir = 'docs/learn/content/guides';
const buildingBindings = read('snippets/msc-learn-guide-building-bindings.liquid');
const bindings = read('snippets/msc-learn-guide-development-bindings.liquid');
const hub = read('templates/page.learn-bitcoin-development.json');
const pad = (value) => String(value).padStart(3, '0');
const pagePath = '/pages/learn-bitcoin-development';

const result = spawnSync(process.execPath, ['scripts/generate-msc-learn-guide-category-runtime.mjs', '--start=49', '--end=64'], { encoding: 'utf8' });
if (result.status !== 0) throw new Error(`${result.stdout || ''}${result.stderr || ''}`);

function sourceFor(number) {
  const id = `MSC-GUIDE-${pad(number)}`;
  const matches = fs.readdirSync(sourceDir).filter((file) => file.startsWith(`${id}-`) && file.endsWith('.md'));
  assert.equal(matches.length, 1, `${id} must resolve to exactly one COPY_LOCKED source package`);
  const source = read(path.join(sourceDir, matches[0]));
  const status = source.match(/^status:\s*(.+)$/m)?.[1]?.trim();
  const h1 = source.match(/^h1:\s*(.+)$/m)?.[1]?.trim();
  const category = source.match(/^category:\s*(.+)$/m)?.[1]?.trim();
  const subcategory = source.match(/^subcategory:\s*(.+)$/m)?.[1]?.trim();
  const deck = source.match(/## 1\. Introductory deck\s*\n\n([\s\S]*?)\n\n## 2\./)?.[1]?.trim().replace(/\s*\n\s*/g, ' ');
  const teaser = deck?.match(/^(.+?[.!?])(?:\s|$)/)?.[1] || deck;
  assert.ok(status && h1 && category && subcategory && deck && teaser, `${id} source metadata/deck is incomplete`);
  return { id, number: pad(number), status, h1, category, subcategory, teaser };
}

const liquid = (value) => value.includes("'") ? JSON.stringify(value) : `'${value}'`;
const sources = Array.from({ length: 17 }, (_, index) => sourceFor(index + 49));
assert.equal(sources[16].id, 'MSC-GUIDE-065', 'Development handoff must resolve Guide 065');
assert.equal(sources[16].category, 'Bitcoin Ecosystem', 'Guide 065 must remain in Bitcoin Ecosystem');

assert.ok(buildingBindings.includes("{% render 'msc-learn-guide-development-bindings', pilot_registry_id: pilot_registry_id %}"), 'Building bindings must delegate Guides 049–064 to the Development bindings');

const groups = [
  { start: 49, end: 52, subcategory: 'Bitcoin Core' },
  { start: 53, end: 56, subcategory: 'Protocols' },
  { start: 57, end: 60, subcategory: 'Cryptography' },
  { start: 61, end: 64, subcategory: 'Infrastructure' },
];
for (const group of groups) {
  for (let number = group.start; number <= group.end; number += 1) {
    const source = sources[number - 49];
    assert.equal(source.status, 'COPY_LOCKED', `${source.id} source must remain COPY_LOCKED`);
    assert.equal(source.category, 'Bitcoin Development', `${source.id} source category drifted`);
    assert.equal(source.subcategory, group.subcategory, `${source.id} source subcategory drifted`);
    assert.ok(bindings.includes(`when '${source.id}'`), `${source.id} must be registered in the Development guide bindings`);
    assert.ok(hub.includes(source.id), `Bitcoin Development hub is missing the ${source.id} live-card binding`);

    const file = `templates/page.msc-learn-guide-${source.number}.json`;
    const template = JSON.parse(read(file));
    assert.equal(template.sections?.main?.type, 'msc-learn-guide', `${file} must use the locked shared guide section`);
    assert.equal(template.sections?.main?.settings?.registry_id, source.id, `${file} registry binding mismatch`);
    assert.ok(hub.includes(`view=msc-learn-guide-${source.number}`), `Bitcoin Development hub is missing the Guide ${source.number} preview route`);

    const runtime = JSON.parse(read(`docs/learn/runtime/${source.id}.json`));
    assert.equal(runtime.status, 'COPY_LOCKED', `${source.id} runtime must remain COPY_LOCKED`);
    assert.equal(runtime.category?.label, source.category, `${source.id} runtime category drifted`);
    assert.equal(runtime.category?.subcategory, source.subcategory, `${source.id} runtime subcategory drifted`);
    assert.equal(runtime.publication?.state, 'PREVIEW_ONLY', `${source.id} must remain preview-only`);
  }
}

const guide048Block = buildingBindings.match(/{%- when 'MSC-GUIDE-048' -%}([\s\S]*?){%- else -%}/)?.[1] || '';
assert.ok(guide048Block.includes("next_registry_id: 'MSC-GUIDE-049'"), 'Guide 048 must continue to Guide 049');
assert.ok(guide048Block.includes('next_active: true'), 'Guide 048 → Guide 049 must be active once Bitcoin Development exists');
assert.ok(guide048Block.includes("next_url: '/pages/learn-bitcoin-development?view=msc-learn-guide-049'"), 'Guide 048 is missing the active Guide 049 Development preview URL');
assert.ok(guide048Block.includes('completed_count: 16'), 'Guide 048 must continue to show Building on Bitcoin complete');
assert.ok(guide048Block.includes('remaining_count: 0'), 'Guide 048 must continue to show zero Building guides remaining');

for (let index = 0; index < 15; index += 1) {
  const current = sources[index];
  const next = sources[index + 1];
  const pattern = new RegExp(`{%- when '${current.id}' -%}([\\s\\S]*?){%- when '${next.id}' -%}`);
  const block = bindings.match(pattern)?.[1] || '';
  assert.ok(block.includes(`next_registry_id: '${next.id}'`), `${current.id} must preview ${next.id}`);
  assert.ok(block.includes(`next_title: ${liquid(next.h1)}`), `${current.id} next title must come from the COPY_LOCKED ${next.id} source`);
  assert.ok(block.includes(`next_description: ${liquid(next.teaser)}`), `${current.id} teaser must be the first sentence of ${next.id}'s locked introductory deck`);
  assert.ok(block.includes('next_active: true'), `${current.id} → ${next.id} must be active`);
  assert.ok(block.includes(`next_url: '${pagePath}?view=msc-learn-guide-${next.number}'`), `${current.id} is missing its active Development preview URL`);
  assert.ok(block.includes(`completed_count: ${index + 1}`), `${current.id} category progress position drifted`);
  assert.ok(block.includes(`remaining_count: ${15 - index}`), `${current.id} remaining category count drifted`);
}

const guide064 = sources[15];
const guide065 = sources[16];
const guide064Block = bindings.match(/{%- when 'MSC-GUIDE-064' -%}([\s\S]*?){%- else -%}/)?.[1] || '';
assert.ok(guide064Block.includes("next_registry_id: 'MSC-GUIDE-065'"), 'Guide 064 must continue to Guide 065 next');
assert.ok(guide064Block.includes(`next_title: ${liquid(guide065.h1)}`), 'Guide 064 must preview the approved Guide 065 title');
assert.ok(guide064Block.includes(`next_description: ${liquid(guide065.teaser)}`), 'Guide 064 teaser must come from Guide 065 locked introductory deck');
assert.ok(guide064Block.includes('next_active: true'), 'Guide 064 → Guide 065 must be active once Bitcoin Ecosystem exists');
assert.ok(guide064Block.includes("next_url: '/pages/learn-bitcoin-ecosystem?view=msc-learn-guide-065'"), 'Guide 064 is missing the active Guide 065 Ecosystem preview URL');
assert.ok(guide064Block.includes('completed_count: 16'), 'Guide 064 must show Bitcoin Development complete');
assert.ok(guide064Block.includes('remaining_count: 0'), 'Guide 064 must show zero Development guides remaining');
assert.ok(bindings.includes("{% render 'msc-learn-guide-ecosystem-bindings', pilot_registry_id: pilot_registry_id %}"), 'Development bindings must delegate Guides 065–080 to the Ecosystem bindings');

assert.ok(hub.includes('data-msc-registry-id=\\"MSC-HUB-DEVELOPMENT\\"'), 'Development hub activation must be scoped to MSC-HUB-DEVELOPMENT');
assert.ok(hub.includes('is-live-guide:hover'), 'Development hub must preserve the locked border-only card hover treatment');
assert.ok(!hub.includes('MSC-GUIDE-065'), 'Guide 065 must not be activated from the Development hub');

const sharedCss = read('assets/msc-learn-guide-template.css');
assert.ok(sharedCss.includes('width: min(100rem, calc(100% - 2rem));'), 'Locked 100rem guide reading width drifted');
assert.ok(sharedCss.includes('font-size: 1.6rem;'), 'Locked Next Guide eyebrow size drifted');
assert.ok(sharedCss.includes('margin-top: .4rem;'), 'Locked Next Guide spacing drifted');
assert.ok(sharedCss.includes('.msc-learn-guide-transition.is-active:hover'), 'Locked border-only active transition interaction drifted');

const lock = read('docs/learn/MSC_Learn_Guide_Template_Lock.md');
assert.ok(lock.includes('Guides 001–080 remain preview-bound runtimes'), 'Template lock publication boundary must include all 80 guides');

console.log('MSC Learn Development Guide 049–064 rollout validation passed: COPY_LOCKED runtimes are synchronized, all four Development subcategories preserve the locked guide system, all 16 Development hub cards are active, Guide 048 continues into Guide 049, transitions are wired through Guide 064, and Guide 064 continues into active Bitcoin Ecosystem Guide 065.');
