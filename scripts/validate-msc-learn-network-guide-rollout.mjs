import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';

const read = (file) => fs.readFileSync(file, 'utf8');
const section = read('sections/msc-learn-guide.liquid');
const bindings = read('snippets/msc-learn-guide-network-bindings.liquid');
const hub = read('templates/page.learn-bitcoin-network.json');

const result = spawnSync(process.execPath, ['scripts/generate-msc-learn-guide-category-runtime.mjs', '--start=17', '--end=32'], { encoding: 'utf8' });
if (result.status !== 0) throw new Error(`${result.stdout || ''}${result.stderr || ''}`);

assert.ok(section.includes("{% render 'msc-learn-guide-network-bindings', pilot_registry_id: pilot_registry_id %}"), 'Shared guide section must delegate Guides 017–032 to the Network bindings');
assert.ok(bindings.includes("{% render 'msc-learn-guide-building-bindings', pilot_registry_id: pilot_registry_id %}"), 'Network bindings must delegate later guide IDs to Building on Bitcoin');

const activeIds = Array.from({ length: 16 }, (_, index) => `MSC-GUIDE-${String(index + 17).padStart(3, '0')}`);
for (const id of activeIds) {
  assert.ok(bindings.includes(`when '${id}'`), `${id} must be registered in the Network guide bindings`);
  assert.ok(hub.includes(id), `The Bitcoin Network hub is missing the ${id} live-card binding`);
}

for (let number = 17; number <= 32; number += 1) {
  const id = `MSC-GUIDE-${String(number).padStart(3, '0')}`;
  const file = `templates/page.msc-learn-guide-${String(number).padStart(3, '0')}.json`;
  const template = JSON.parse(read(file));
  assert.equal(template.sections?.main?.type, 'msc-learn-guide', `${file} must use the locked shared guide section`);
  assert.equal(template.sections?.main?.settings?.registry_id, id, `${file} registry binding mismatch`);
  assert.ok(hub.includes(`view=msc-learn-guide-${String(number).padStart(3, '0')}`), `The Bitcoin Network hub is missing the Guide ${number} preview route`);
}

const guide016Block = section.match(/{%- when 'MSC-GUIDE-016' -%}([\s\S]*?){%- else -%}/)?.[1] || '';
assert.ok(guide016Block.includes("next_registry_id: 'MSC-GUIDE-017'"), 'Guide 016 must continue to Guide 017');
assert.ok(guide016Block.includes('next_active: true'), 'Guide 016 → Guide 017 must be active once the Network category exists');
assert.ok(guide016Block.includes("next_url: '/pages/learn-bitcoin-network?view=msc-learn-guide-017'"), 'Guide 016 is missing the active Guide 017 Network preview URL');
assert.ok(guide016Block.includes('completed_count: 16'), 'Guide 016 must continue to show Bitcoin Basics complete');
assert.ok(guide016Block.includes('remaining_count: 0'), 'Guide 016 must continue to show zero Bitcoin Basics guides remaining');

for (let current = 17; current < 32; current += 1) {
  const currentId = `MSC-GUIDE-${String(current).padStart(3, '0')}`;
  const nextNumber = String(current + 1).padStart(3, '0');
  const currentBlockPattern = new RegExp(`{%- when '${currentId}' -%}([\\s\\S]*?){%- when 'MSC-GUIDE-${nextNumber}' -%}`);
  const block = bindings.match(currentBlockPattern)?.[1] || '';
  assert.ok(block.includes(`next_registry_id: 'MSC-GUIDE-${nextNumber}'`), `${currentId} must preview Guide ${nextNumber}`);
  assert.ok(block.includes('next_active: true'), `${currentId} → Guide ${nextNumber} must be active`);
  assert.ok(block.includes(`next_url: '/pages/learn-bitcoin-network?view=msc-learn-guide-${nextNumber}'`), `${currentId} is missing its active Network preview URL`);
}

const guide032Block = bindings.match(/{%- when 'MSC-GUIDE-032' -%}([\s\S]*?){%- else -%}/)?.[1] || '';
assert.ok(guide032Block.includes("next_registry_id: 'MSC-GUIDE-033'"), 'Guide 032 must preview Guide 033 next');
assert.ok(guide032Block.includes("next_title: 'How the Lightning Network Works'"), 'Guide 032 must preview the approved Guide 033 title');
assert.ok(guide032Block.includes('next_active: true'), 'Guide 032 → Guide 033 must be active once Building on Bitcoin exists');
assert.ok(guide032Block.includes("next_url: '/pages/learn-building-on-bitcoin?view=msc-learn-guide-033'"), 'Guide 032 is missing its active Guide 033 Building preview URL');
assert.ok(guide032Block.includes('completed_count: 16'), 'Guide 032 must show The Bitcoin Network complete');
assert.ok(guide032Block.includes('remaining_count: 0'), 'Guide 032 must show zero Network guides remaining');

const groups = [
  { start: 17, end: 20, subcategory: 'Mining' },
  { start: 21, end: 24, subcategory: 'Nodes' },
  { start: 25, end: 28, subcategory: 'Network' },
  { start: 29, end: 32, subcategory: 'Consensus' },
];
for (const group of groups) {
  for (let number = group.start; number <= group.end; number += 1) {
    const id = `MSC-GUIDE-${String(number).padStart(3, '0')}`;
    const runtime = JSON.parse(read(`docs/learn/runtime/${id}.json`));
    assert.equal(runtime.status, 'COPY_LOCKED', `${id} must remain COPY_LOCKED`);
    assert.equal(runtime.category?.label, 'The Bitcoin Network', `${id} category drifted`);
    assert.equal(runtime.category?.subcategory, group.subcategory, `${id} subcategory drifted`);
    assert.equal(runtime.publication?.state, 'PREVIEW_ONLY', `${id} must remain preview-only`);
  }
}

assert.ok(hub.includes('data-msc-registry-id=\\"MSC-HUB-NETWORK\\"'), 'Network hub activation must be scoped to MSC-HUB-NETWORK');
assert.ok(hub.includes('is-live-guide:hover'), 'Network hub must preserve the locked border-only card hover treatment');
assert.ok(!hub.includes('MSC-GUIDE-033'), 'Guide 033 must not be activated from the Network hub');

const sharedCss = read('assets/msc-learn-guide-template.css');
assert.ok(sharedCss.includes('width: min(100rem, calc(100% - 2rem));'), 'Locked 100rem guide reading width drifted');
assert.ok(sharedCss.includes('font-size: 1.6rem;'), 'Locked Next Guide eyebrow size drifted');
assert.ok(sharedCss.includes('margin-top: .4rem;'), 'Locked Next Guide spacing drifted');
assert.ok(sharedCss.includes('.msc-learn-guide-transition.is-active:hover'), 'Locked border-only active transition interaction drifted');

console.log('MSC Learn Network Guide 017–032 rollout validation passed: COPY_LOCKED runtimes are synchronized, the Guide 001 visual contract is preserved, all 16 Network hub cards are active, Guide 016 continues into Guide 017, transitions are wired through Guide 032, and Guide 032 continues into Building on Bitcoin Guide 033.');
