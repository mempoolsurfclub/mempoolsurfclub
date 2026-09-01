import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';

const read = (file) => fs.readFileSync(file, 'utf8');
const section = read('sections/msc-learn-guide.liquid');
const hub = read('templates/page.learn-bitcoin-basics.json');

const result = spawnSync(process.execPath, ['scripts/generate-msc-learn-guide-rollout.mjs'], { encoding: 'utf8' });
if (result.status !== 0) throw new Error(`${result.stdout || ''}${result.stderr || ''}`);

for (const id of ['MSC-GUIDE-001', 'MSC-GUIDE-002', 'MSC-GUIDE-003', 'MSC-GUIDE-004']) {
  assert.ok(section.includes(`when '${id}'`), `${id} must be registered in the shared guide section`);
}

const expectedTemplates = {
  'templates/page.msc-learn-guide.json': 'MSC-GUIDE-001',
  'templates/page.msc-learn-guide-002.json': 'MSC-GUIDE-002',
  'templates/page.msc-learn-guide-003.json': 'MSC-GUIDE-003',
  'templates/page.msc-learn-guide-004.json': 'MSC-GUIDE-004',
};
for (const [file, id] of Object.entries(expectedTemplates)) {
  const template = JSON.parse(read(file));
  assert.equal(template.sections?.main?.type, 'msc-learn-guide', `${file} must use the locked shared guide section`);
  assert.equal(template.sections?.main?.settings?.registry_id, id, `${file} registry binding mismatch`);
}

for (const view of ['msc-learn-guide', 'msc-learn-guide-002', 'msc-learn-guide-003', 'msc-learn-guide-004']) {
  assert.ok(hub.includes(`view=${view}`), `Bitcoin Basics hub is missing the ${view} preview route`);
}
for (const id of ['MSC-GUIDE-001', 'MSC-GUIDE-002', 'MSC-GUIDE-003', 'MSC-GUIDE-004']) {
  assert.ok(hub.includes(id), `Bitcoin Basics hub is missing the ${id} live-card binding`);
}

assert.ok(section.includes("next_url: '/pages/learn-bitcoin-basics?view=msc-learn-guide-002'"), 'Guide 001 must link to Guide 002');
assert.ok(section.includes("next_url: '/pages/learn-bitcoin-basics?view=msc-learn-guide-003'"), 'Guide 002 must link to Guide 003');
assert.ok(section.includes("next_url: '/pages/learn-bitcoin-basics?view=msc-learn-guide-004'"), 'Guide 003 must link to Guide 004');

const guide004Block = section.match(/{%- when 'MSC-GUIDE-004' -%}([\s\S]*?){%- else -%}/)?.[1] || '';
assert.ok(guide004Block.includes("next_registry_id: 'MSC-GUIDE-005'"), 'Guide 004 must preview Guide 005 next');
assert.ok(guide004Block.includes('next_active: false'), 'Guide 004 → Guide 005 must remain inactive in this rollout');
assert.ok(!guide004Block.includes('next_url:'), 'Guide 004 must not invent a Guide 005 preview URL');

const sharedCss = read('assets/msc-learn-guide-template.css');
assert.ok(sharedCss.includes('width: min(100rem, calc(100% - 2rem));'), 'Locked 100rem guide reading width drifted');
assert.ok(sharedCss.includes('font-size: 1.6rem;'), 'Locked Next Guide eyebrow size drifted');
assert.ok(sharedCss.includes('margin-top: .4rem;'), 'Locked Next Guide spacing drifted');
assert.ok(sharedCss.includes('.msc-learn-guide-transition.is-active:hover'), 'Locked border-only active transition interaction drifted');

console.log('MSC Learn Guide 002–004 rollout validation passed: COPY_LOCKED runtimes are synchronized, shared-template bindings are intact, hub cards are active, 001→004 transitions are wired, and Guide 005 remains inactive.');
