import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';

const read = (file) => fs.readFileSync(file, 'utf8');
const section = read('sections/msc-learn-guide.liquid');
const hub = read('templates/page.learn-bitcoin-basics.json');

const result = spawnSync(process.execPath, ['scripts/generate-msc-learn-guide-rollout.mjs'], { encoding: 'utf8' });
if (result.status !== 0) throw new Error(`${result.stdout || ''}${result.stderr || ''}`);

const activeIds = Array.from({ length: 12 }, (_, index) => `MSC-GUIDE-${String(index + 1).padStart(3, '0')}`);
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
};
for (const [file, id] of Object.entries(expectedTemplates)) {
  const template = JSON.parse(read(file));
  assert.equal(template.sections?.main?.type, 'msc-learn-guide', `${file} must use the locked shared guide section`);
  assert.equal(template.sections?.main?.settings?.registry_id, id, `${file} registry binding mismatch`);
}

const expectedViews = ['msc-learn-guide', ...Array.from({ length: 11 }, (_, index) => `msc-learn-guide-${String(index + 2).padStart(3, '0')}`)];
for (const view of expectedViews) {
  assert.ok(hub.includes(`view=${view}`), `Bitcoin Basics hub is missing the ${view} preview route`);
}
for (const id of activeIds) {
  assert.ok(hub.includes(id), `Bitcoin Basics hub is missing the ${id} live-card binding`);
}

for (let current = 1; current < 12; current += 1) {
  const currentId = `MSC-GUIDE-${String(current).padStart(3, '0')}`;
  const nextNumber = String(current + 1).padStart(3, '0');
  const currentBlockPattern = new RegExp(`{%- when '${currentId}' -%}([\\s\\S]*?){%- when 'MSC-GUIDE-${nextNumber}' -%}`);
  const block = section.match(currentBlockPattern)?.[1] || '';
  assert.ok(block.includes(`next_registry_id: 'MSC-GUIDE-${nextNumber}'`), `${currentId} must preview Guide ${nextNumber}`);
  assert.ok(block.includes('next_active: true'), `${currentId} → Guide ${nextNumber} must be active`);
  assert.ok(block.includes(`next_url: '/pages/learn-bitcoin-basics?view=msc-learn-guide-${nextNumber}'`), `${currentId} is missing its active next-guide preview URL`);
}

const guide012Block = section.match(/{%- when 'MSC-GUIDE-012' -%}([\s\S]*?){%- else -%}/)?.[1] || '';
assert.ok(guide012Block.includes("next_registry_id: 'MSC-GUIDE-013'"), 'Guide 012 must preview Guide 013 next');
assert.ok(guide012Block.includes('next_active: false'), 'Guide 012 → Guide 013 must remain inactive in this rollout');
assert.ok(!guide012Block.includes('next_url:'), 'Guide 012 must not invent a Guide 013 preview URL');

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

const sharedCss = read('assets/msc-learn-guide-template.css');
assert.ok(sharedCss.includes('width: min(100rem, calc(100% - 2rem));'), 'Locked 100rem guide reading width drifted');
assert.ok(sharedCss.includes('font-size: 1.6rem;'), 'Locked Next Guide eyebrow size drifted');
assert.ok(sharedCss.includes('margin-top: .4rem;'), 'Locked Next Guide spacing drifted');
assert.ok(sharedCss.includes('.msc-learn-guide-transition.is-active:hover'), 'Locked border-only active transition interaction drifted');

console.log('MSC Learn Guide 002–012 rollout validation passed: COPY_LOCKED runtimes are synchronized, the Guide 001 visual contract is preserved, hub cards 001–012 are active, transitions are wired through Guide 012, and Guide 013 remains inactive.');
