import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';

const read = (file) => fs.readFileSync(file, 'utf8');
const section = read('sections/msc-learn-guide.liquid');
const hub = read('templates/page.learn-bitcoin-basics.json');

const result = spawnSync(process.execPath, ['scripts/generate-msc-learn-guide-rollout.mjs'], { encoding: 'utf8' });
if (result.status !== 0) throw new Error(`${result.stdout || ''}${result.stderr || ''}`);

const activeIds = Array.from({ length: 16 }, (_, index) => `MSC-GUIDE-${String(index + 1).padStart(3, '0')}`);
for (const id of activeIds) {
  assert.ok(section.includes(`when '${id}'`), `${id} must be registered in the shared guide section`);
}

const expectedTemplates = {
  'templates/page.msc-learn-guide.json': 'MSC-GUIDE-001',
  'templates/page.msc-learn-guide-002.json': 'MSC-GUIDE-002',
  'templates/page.msc-learn-guide-003.json': 'MSC-GUIDE-003',
  'templates/page.msc-learn-guide-004.json': 'MSC-GUIDE-004',
  'templates/page.msc-learn-guide-005.json': 'MSC-GUIDE-005',
  'templates/page.msc-learn-guide-006.json': 'MSC-GUIDE-006',
  'templates/page.msc-learn-guide-007.json': 'MSC-GUIDE-007',
  'templates/page.msc-learn-guide-008.json': 'MSC-GUIDE-008',
  'templates/page.msc-learn-guide-009.json': 'MSC-GUIDE-009',
  'templates/page.msc-learn-guide-010.json': 'MSC-GUIDE-010',
  'templates/page.msc-learn-guide-011.json': 'MSC-GUIDE-011',
  'templates/page.msc-learn-guide-012.json': 'MSC-GUIDE-012',
  'templates/page.msc-learn-guide-013.json': 'MSC-GUIDE-013',
  'templates/page.msc-learn-guide-014.json': 'MSC-GUIDE-014',
  'templates/page.msc-learn-guide-015.json': 'MSC-GUIDE-015',
  'templates/page.msc-learn-guide-016.json': 'MSC-GUIDE-016',
};
for (const [file, id] of Object.entries(expectedTemplates)) {
  const template = JSON.parse(read(file));
  assert.equal(template.sections?.main?.type, 'msc-learn-guide', `${file} must use the locked shared guide section`);
  assert.equal(template.sections?.main?.settings?.registry_id, id, `${file} registry binding mismatch`);
}

const expectedViews = ['msc-learn-guide', ...Array.from({ length: 15 }, (_, index) => `msc-learn-guide-${String(index + 2).padStart(3, '0')}`)];
for (const view of expectedViews) {
  assert.ok(hub.includes(`view=${view}`), `Bitcoin Basics hub is missing the ${view} preview route`);
}
for (const id of activeIds) {
  assert.ok(hub.includes(id), `Bitcoin Basics hub is missing the ${id} live-card binding`);
}

for (let current = 1; current < 16; current += 1) {
  const currentId = `MSC-GUIDE-${String(current).padStart(3, '0')}`;
  const nextNumber = String(current + 1).padStart(3, '0');
  const currentBlockPattern = new RegExp(`{%- when '${currentId}' -%}([\\s\\S]*?){%- when 'MSC-GUIDE-${nextNumber}' -%}`);
  const block = section.match(currentBlockPattern)?.[1] || '';
  assert.ok(block.includes(`next_registry_id: 'MSC-GUIDE-${nextNumber}'`), `${currentId} must preview Guide ${nextNumber}`);
  assert.ok(block.includes('next_active: true'), `${currentId} → Guide ${nextNumber} must be active`);
  assert.ok(block.includes(`next_url: '/pages/learn-bitcoin-basics?view=msc-learn-guide-${nextNumber}'`), `${currentId} is missing its active next-guide preview URL`);
}

const guide016Block = section.match(/{%- when 'MSC-GUIDE-016' -%}([\s\S]*?){%- else -%}/)?.[1] || '';
assert.ok(guide016Block.includes("next_registry_id: 'MSC-GUIDE-017'"), 'Guide 016 must preview Guide 017 next');
assert.ok(guide016Block.includes("next_title: 'How Bitcoin Mining Works'"), 'Guide 016 must preview the approved Guide 017 title');
assert.ok(guide016Block.includes('next_active: false'), 'Guide 016 → Guide 017 must remain inactive until the next category rollout');
assert.ok(!guide016Block.includes('next_url:'), 'Guide 016 must not invent a Guide 017 preview URL');
assert.ok(guide016Block.includes('completed_count: 16'), 'Guide 016 must show Bitcoin Basics as complete');
assert.ok(guide016Block.includes('remaining_count: 0'), 'Guide 016 must show zero Bitcoin Basics guides remaining');

for (const id of ['MSC-GUIDE-005', 'MSC-GUIDE-006', 'MSC-GUIDE-007', 'MSC-GUIDE-008']) {
  const runtime = JSON.parse(read(`docs/learn/runtime/${id}.json`));
  assert.equal(runtime.status, 'COPY_LOCKED', `${id} must remain COPY_LOCKED`);
  assert.equal(runtime.category?.label, 'Bitcoin Basics', `${id} category drifted`);
  assert.equal(runtime.category?.subcategory, 'Using Bitcoin', `${id} must remain in the Using Bitcoin subcategory`);
  assert.equal(runtime.publication?.state, 'PREVIEW_ONLY', `${id} must remain preview-only`);
}

for (const id of ['MSC-GUIDE-009', 'MSC-GUIDE-010', 'MSC-GUIDE-011', 'MSC-GUIDE-012']) {
  const runtime = JSON.parse(read(`docs/learn/runtime/${id}.json`));
  assert.equal(runtime.status, 'COPY_LOCKED', `${id} must remain COPY_LOCKED`);
  assert.equal(runtime.category?.label, 'Bitcoin Basics', `${id} category drifted`);
  assert.equal(runtime.category?.subcategory, 'Security', `${id} must remain in the Security subcategory`);
  assert.equal(runtime.publication?.state, 'PREVIEW_ONLY', `${id} must remain preview-only`);
}

for (const id of ['MSC-GUIDE-013', 'MSC-GUIDE-014', 'MSC-GUIDE-015', 'MSC-GUIDE-016']) {
  const runtime = JSON.parse(read(`docs/learn/runtime/${id}.json`));
  assert.equal(runtime.status, 'COPY_LOCKED', `${id} must remain COPY_LOCKED`);
  assert.equal(runtime.category?.label, 'Bitcoin Basics', `${id} category drifted`);
  assert.equal(runtime.category?.subcategory, 'Essentials', `${id} must remain in the Essentials subcategory`);
  assert.equal(runtime.publication?.state, 'PREVIEW_ONLY', `${id} must remain preview-only`);
}

const sharedCss = read('assets/msc-learn-guide-template.css');
assert.ok(sharedCss.includes('width: min(100rem, calc(100% - 2rem));'), 'Locked 100rem guide reading width drifted');
assert.ok(sharedCss.includes('font-size: 1.6rem;'), 'Locked Next Guide eyebrow size drifted');
assert.ok(sharedCss.includes('margin-top: .4rem;'), 'Locked Next Guide spacing drifted');
assert.ok(sharedCss.includes('.msc-learn-guide-transition.is-active:hover'), 'Locked border-only active transition interaction drifted');

console.log('MSC Learn Guide 002–016 rollout validation passed: COPY_LOCKED runtimes are synchronized, the Guide 001 visual contract is preserved, all 16 Bitcoin Basics hub cards are active, transitions are wired through Guide 016, and Guide 017 remains inactive for the next category rollout.');
