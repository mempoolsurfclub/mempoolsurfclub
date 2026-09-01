import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';

const read = (file) => fs.readFileSync(file, 'utf8');
const section = read('sections/msc-learn-guide.liquid');
const hub = read('templates/page.learn-bitcoin-basics.json');

const result = spawnSync(process.execPath, ['scripts/generate-msc-learn-guide-rollout.mjs'], { encoding: 'utf8' });
if (result.status !== 0) throw new Error(`${result.stdout || ''}${result.stderr || ''}`);

const activeIds = Array.from({ length: 8 }, (_, index) => `MSC-GUIDE-${String(index + 1).padStart(3, '0')}`);
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
};
for (const [file, id] of Object.entries(expectedTemplates)) {
  const template = JSON.parse(read(file));
  assert.equal(template.sections?.main?.type, 'msc-learn-guide', `${file} must use the locked shared guide section`);
  assert.equal(template.sections?.main?.settings?.registry_id, id, `${file} registry binding mismatch`);
}

const expectedViews = ['msc-learn-guide', ...Array.from({ length: 7 }, (_, index) => `msc-learn-guide-${String(index + 2).padStart(3, '0')}`)];
for (const view of expectedViews) {
  assert.ok(hub.includes(`view=${view}`), `Bitcoin Basics hub is missing the ${view} preview route`);
}
for (const id of activeIds) {
  assert.ok(hub.includes(id), `Bitcoin Basics hub is missing the ${id} live-card binding`);
}

for (let current = 1; current < 8; current += 1) {
  const currentId = `MSC-GUIDE-${String(current).padStart(3, '0')}`;
  const nextNumber = String(current + 1).padStart(3, '0');
  const currentBlockPattern = current === 8
    ? new RegExp(`{%- when '${currentId}' -%}([\\s\\S]*?){%- else -%}`)
    : new RegExp(`{%- when '${currentId}' -%}([\\s\\S]*?){%- when 'MSC-GUIDE-${nextNumber}' -%}`);
  const block = section.match(currentBlockPattern)?.[1] || '';
  assert.ok(block.includes(`next_registry_id: 'MSC-GUIDE-${nextNumber}'`), `${currentId} must preview Guide ${nextNumber}`);
  assert.ok(block.includes('next_active: true'), `${currentId} → Guide ${nextNumber} must be active`);
  assert.ok(block.includes(`next_url: '/pages/learn-bitcoin-basics?view=msc-learn-guide-${nextNumber}'`), `${currentId} is missing its active next-guide preview URL`);
}

const guide008Block = section.match(/{%- when 'MSC-GUIDE-008' -%}([\s\S]*?){%- else -%}/)?.[1] || '';
assert.ok(guide008Block.includes("next_registry_id: 'MSC-GUIDE-009'"), 'Guide 008 must preview Guide 009 next');
assert.ok(guide008Block.includes('next_active: false'), 'Guide 008 → Guide 009 must remain inactive in this rollout');
assert.ok(!guide008Block.includes('next_url:'), 'Guide 008 must not invent a Guide 009 preview URL');

for (const id of ['MSC-GUIDE-005', 'MSC-GUIDE-006', 'MSC-GUIDE-007', 'MSC-GUIDE-008']) {
  const runtime = JSON.parse(read(`docs/learn/runtime/${id}.json`));
  assert.equal(runtime.status, 'COPY_LOCKED', `${id} must remain COPY_LOCKED`);
  assert.equal(runtime.category?.label, 'Bitcoin Basics', `${id} category drifted`);
  assert.equal(runtime.category?.subcategory, 'Using Bitcoin', `${id} must remain in the Using Bitcoin subcategory`);
  assert.equal(runtime.publication?.state, 'PREVIEW_ONLY', `${id} must remain preview-only`);
}

const sharedCss = read('assets/msc-learn-guide-template.css');
assert.ok(sharedCss.includes('width: min(100rem, calc(100% - 2rem));'), 'Locked 100rem guide reading width drifted');
assert.ok(sharedCss.includes('font-size: 1.6rem;'), 'Locked Next Guide eyebrow size drifted');
assert.ok(sharedCss.includes('margin-top: .4rem;'), 'Locked Next Guide spacing drifted');
assert.ok(sharedCss.includes('.msc-learn-guide-transition.is-active:hover'), 'Locked border-only active transition interaction drifted');

console.log('MSC Learn Guide 002–008 rollout validation passed: COPY_LOCKED runtimes are synchronized, the Guide 001 visual contract is preserved, hub cards 001–008 are active, transitions are wired through Guide 008, and Guide 009 remains inactive.');
