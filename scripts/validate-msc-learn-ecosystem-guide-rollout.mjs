import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const read = (file) => fs.readFileSync(file, 'utf8');
const sourceDir = 'docs/learn/content/guides';
const developmentBindings = read('snippets/msc-learn-guide-development-bindings.liquid');
const bindings = read('snippets/msc-learn-guide-ecosystem-bindings.liquid');
const hub = read('templates/page.learn-bitcoin-ecosystem.json');
const lock = read('docs/learn/MSC_Learn_Guide_Template_Lock.md');
const generator = read('scripts/generate-msc-learn-guide-category-runtime.mjs');
const pad = (value) => String(value).padStart(3, '0');
const pagePath = '/pages/learn-bitcoin-ecosystem';

const result = spawnSync(process.execPath, ['scripts/generate-msc-learn-guide-category-runtime.mjs', '--start=65', '--end=80'], { encoding: 'utf8' });
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
const sources = Array.from({ length: 16 }, (_, index) => sourceFor(index + 65));

assert.ok(developmentBindings.includes("{% render 'msc-learn-guide-ecosystem-bindings', pilot_registry_id: pilot_registry_id %}"), 'Development bindings must delegate Guides 065–080 to the Ecosystem bindings');

const groups = [
  { start: 65, end: 68, subcategory: 'People' },
  { start: 69, end: 72, subcategory: 'Companies' },
  { start: 73, end: 76, subcategory: 'Markets' },
  { start: 77, end: 80, subcategory: 'Community' },
];

for (const group of groups) {
  for (let number = group.start; number <= group.end; number += 1) {
    const source = sources[number - 65];
    assert.equal(source.status, 'COPY_LOCKED', `${source.id} source must remain COPY_LOCKED`);
    assert.equal(source.category, 'Bitcoin Ecosystem', `${source.id} source category drifted`);
    assert.equal(source.subcategory, group.subcategory, `${source.id} source subcategory drifted`);
    assert.ok(bindings.includes(`when '${source.id}'`), `${source.id} must be registered in the Ecosystem guide bindings`);
    assert.ok(hub.includes(source.id), `Bitcoin Ecosystem hub is missing the ${source.id} live-card binding`);

    const templateFile = `templates/page.msc-learn-guide-${source.number}.json`;
    const template = JSON.parse(read(templateFile));
    assert.equal(template.sections?.main?.type, 'msc-learn-guide', `${templateFile} must use the locked shared guide section`);
    assert.equal(template.sections?.main?.settings?.registry_id, source.id, `${templateFile} registry binding mismatch`);
    assert.ok(hub.includes(`view=msc-learn-guide-${source.number}`), `Bitcoin Ecosystem hub is missing the Guide ${source.number} preview route`);

    const runtime = JSON.parse(read(`docs/learn/runtime/${source.id}.json`));
    assert.equal(runtime.status, 'COPY_LOCKED', `${source.id} runtime must remain COPY_LOCKED`);
    assert.equal(runtime.category?.label, 'Bitcoin Ecosystem', `${source.id} runtime category drifted`);
    assert.equal(runtime.category?.subcategory, group.subcategory, `${source.id} runtime subcategory drifted`);
    assert.equal(runtime.publication?.state, 'PREVIEW_ONLY', `${source.id} must remain preview-only`);
    assert.equal(runtime.publication?.links_active, false, `${source.id} structured content links must remain inactive`);
    assert.equal(runtime.illustration_briefs?.length, 3, `${source.id} runtime illustration brief count drifted`);
  }
}

const guide064Block = developmentBindings.match(/{%- when 'MSC-GUIDE-064' -%}([\s\S]*?){%- else -%}/)?.[1] || '';
assert.ok(guide064Block.includes("next_registry_id: 'MSC-GUIDE-065'"), 'Guide 064 must continue to Guide 065');
assert.ok(guide064Block.includes(`next_title: ${liquid(sources[0].h1)}`), 'Guide 064 must use the COPY_LOCKED Guide 065 title');
assert.ok(guide064Block.includes(`next_description: ${liquid(sources[0].teaser)}`), 'Guide 064 teaser must be the first sentence of Guide 065 locked introductory deck');
assert.ok(guide064Block.includes('next_active: true'), 'Guide 064 → Guide 065 must be active');
assert.ok(guide064Block.includes("next_url: '/pages/learn-bitcoin-ecosystem?view=msc-learn-guide-065'"), 'Guide 064 is missing its active Ecosystem preview URL');
assert.ok(guide064Block.includes('completed_count: 16'), 'Guide 064 must keep Bitcoin Development complete');
assert.ok(guide064Block.includes('remaining_count: 0'), 'Guide 064 must keep zero Development guides remaining');

for (let index = 0; index < 15; index += 1) {
  const current = sources[index];
  const next = sources[index + 1];
  const pattern = new RegExp(`{%- when '${current.id}' -%}([\\s\\S]*?){%- when '${next.id}' -%}`);
  const block = bindings.match(pattern)?.[1] || '';
  assert.ok(block.includes(`next_registry_id: '${next.id}'`), `${current.id} must preview ${next.id}`);
  assert.ok(block.includes(`next_title: ${liquid(next.h1)}`), `${current.id} next title must come from the COPY_LOCKED ${next.id} source`);
  assert.ok(block.includes(`next_description: ${liquid(next.teaser)}`), `${current.id} teaser must be the first sentence of ${next.id}'s locked introductory deck`);
  assert.ok(block.includes('next_active: true'), `${current.id} → ${next.id} must be active`);
  assert.ok(block.includes(`next_url: '${pagePath}?view=msc-learn-guide-${next.number}'`), `${current.id} is missing its active Ecosystem preview URL`);
  assert.ok(block.includes(`completed_count: ${index + 1}`), `${current.id} Ecosystem progress position drifted`);
  assert.ok(block.includes(`remaining_count: ${15 - index}`), `${current.id} remaining Ecosystem count drifted`);
}

const guide080Block = bindings.match(/{%- when 'MSC-GUIDE-080' -%}([\s\S]*?){%- else -%}/)?.[1] || '';
assert.ok(guide080Block.includes("{% render 'msc-learn-guide-080-runtime' %}"), 'Guide 080 must render its COPY_LOCKED runtime');
assert.ok(guide080Block.includes('data-msc-guide-next-template="MSC-GUIDE-080"'), 'Guide 080 must keep an empty shared transition mount so the legacy completion sentinel remains hidden');
assert.ok(guide080Block.includes('Terminal guide:'), 'Guide 080 terminal behavior must remain explicit in the binding');
for (const forbidden of ['msc-learn-guide-transition', 'next_registry_id:', 'next_title:', 'next_description:', 'next_active:', 'next_url:']) {
  assert.ok(!guide080Block.includes(forbidden), `Guide 080 must not fabricate terminal navigation data: ${forbidden}`);
}
const guide080Runtime = JSON.parse(read('docs/learn/runtime/MSC-GUIDE-080.json'));
assert.equal(guide080Runtime.relationships?.next, null, 'Guide 080 structured runtime must remain the terminal canonical guide');

assert.ok(hub.includes('data-msc-registry-id=\\"MSC-HUB-ECOSYSTEM\\"'), 'Ecosystem hub activation must be scoped to MSC-HUB-ECOSYSTEM');
assert.ok(hub.includes('is-live-guide:hover'), 'Ecosystem hub must preserve the locked border-only card hover treatment');
assert.ok(!hub.includes('MSC-GUIDE-081'), 'Ecosystem hub must not invent Guide 081');

const sharedCss = read('assets/msc-learn-guide-template.css');
assert.ok(sharedCss.includes('width: min(100rem, calc(100% - 2rem));'), 'Locked 100rem guide reading width drifted');
assert.ok(sharedCss.includes('font-size: 1.6rem;'), 'Locked Next Guide eyebrow size drifted');
assert.ok(sharedCss.includes('margin-top: .4rem;'), 'Locked Next Guide spacing drifted');
assert.ok(sharedCss.includes('.msc-learn-guide-transition.is-active:hover'), 'Locked border-only active transition interaction drifted');

assert.ok(generator.includes('^[-*]\\s+\\*\\*'), 'Category materializer must retain approved dash/asterisk Key Terms compatibility');
assert.ok(generator.includes('sectionByTitle'), 'Category materializer must retain title-based section resolution for approved package variants');
assert.ok(generator.includes('/^(?:Page )?excerpt$/i'), 'Category materializer must retain Page excerpt compatibility');
assert.ok(generator.includes('/^Illustration briefs?$/i'), 'Category materializer must retain singular/plural illustration-brief compatibility');

assert.ok(lock.includes('Guides 001–080 remain preview-bound runtimes'), 'Template lock publication boundary must include all 80 guides');
assert.ok(lock.includes('Guide 080 is the terminal guide.'), 'Template lock must record the Guide 080 terminal decision');
assert.ok(lock.includes('Guide 064 now continues into Guide 065 on `Bitcoin Ecosystem`.'), 'Template lock must record the Development-to-Ecosystem handoff');
assert.equal((lock.match(/- Guide 080: `\?view=msc-learn-guide-080`/g) || []).length, 1, 'Template lock must list the Guide 080 preview route exactly once');

console.log('MSC Learn Ecosystem Guide 065–080 rollout validation passed: COPY_LOCKED runtimes are synchronized across People, Companies, Markets, and Community; all 16 Ecosystem hub cards are active; Guide 064 continues into Guide 065; transitions are wired through Guide 080; and Guide 080 terminates without a fabricated next-guide destination.');
