import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');

const SECTION_PATH = 'sections/msc-learn-guide.liquid';
const TEMPLATE_PATH = 'templates/page.msc-learn-guide.json';
const STYLE_PATH = 'assets/msc-learn-guide-template.css';
const TRANSITION_PATH = 'snippets/msc-learn-guide-transition.liquid';
const LOCK_PATH = 'docs/learn/MSC_Learn_Guide_Template_Lock.md';

const section = read(SECTION_PATH);
const template = JSON.parse(read(TEMPLATE_PATH));
const style = read(STYLE_PATH);
const transition = read(TRANSITION_PATH);
const lock = read(LOCK_PATH);

assert.equal(template.sections?.main?.type, 'msc-learn-guide', 'Shared Learn guide template must use the msc-learn-guide section');
assert.equal(template.sections?.main?.settings?.registry_id, 'MSC-GUIDE-001', 'Guide 001 must remain the preview binding while the shared template is locked');

assert.ok(section.includes("'msc-learn-hub-progress.css'"), 'Guide section must load the shared progress stylesheet');
assert.ok(section.includes("'msc-learn-guide-template.css'"), 'Guide section must load the locked shared guide stylesheet');
assert.ok(!section.includes("'msc-learn-guide.css'"), 'Guide section must not load the retired Guide-001-only stylesheet');
assert.ok(!/<style\b/i.test(section), 'Guide section must not contain per-guide inline style overrides');
assert.ok(section.includes("render 'msc-learn-guide-transition'"), 'Guide section must render the shared Next Guide component');
assert.ok(section.includes("when 'MSC-GUIDE-001'"), 'Guide 001 runtime must remain the current materialized pilot');
assert.ok(section.includes('section.settings.registry_id'), 'Guide runtime must remain explicitly registry-bound');
assert.ok(section.includes("querySelectorAll('.msc-learn-page[data-msc-registry-id^=\"MSC-GUIDE-\"]')"), 'Transition mounting must target the shared guide family');
assert.ok(section.includes('keyTerms.before(template.content.cloneNode(true))'), 'Next Guide transition must mount immediately before Key Terms');

assert.ok(style.includes('.msc-learn-page[data-msc-registry-id^="MSC-GUIDE-"]'), 'Shared guide CSS must target the full MSC-GUIDE family');
assert.ok(!style.includes('MSC-GUIDE-001'), 'Shared guide CSS must not contain Guide-001-only selectors');
assert.ok(style.includes('width: min(100rem, calc(100% - 2rem));'), 'Locked tablet/desktop article width must remain 100rem');
assert.ok(style.includes('font-size: 1.6rem;'), 'Locked Next Guide eyebrow size must remain 1.6rem');
assert.ok(style.includes('margin-top: .4rem;'), 'Locked Next Guide title spacing must remain .4rem');
assert.ok(style.includes('max-width: 48rem;'), 'Locked Next Guide teaser width must remain constrained');
assert.ok(style.includes('grid-template-columns: minmax(0, 1.12fr) minmax(28rem, .88fr);'), 'Locked desktop transition proportions must remain intact');
assert.ok(style.includes('.msc-learn-guide-transition.is-active:hover'), 'Active Next Guide interaction must be border-only at the shared card level');

assert.ok(transition.includes('Next guide · {{ next_number | escape }}'), 'Shared transition must render the next guide number');
assert.ok(transition.includes('{{ next_title | escape }}'), 'Shared transition must render the next guide title');
assert.ok(transition.includes('{{ next_description | escape }}'), 'Shared transition must render the next guide teaser');
assert.ok(transition.includes('{{ category_label | escape }} progress'), 'Shared transition must render category progress');
assert.ok(transition.includes('msc-learn-guide-transition__link'), 'Shared transition must support a whole-card active link state');
assert.ok(!transition.includes('MSC-GUIDE-001'), 'Shared transition component must not hard-code Guide 001');
assert.ok(!transition.includes('Why Does Bitcoin Matter?'), 'Shared transition component must not hard-code Guide 002 content');

assert.match(lock, /^# MSC Learn Guide Template Lock/m, 'Template lock document is missing its canonical heading');
assert.match(lock, /Status:\s*LOCKED/, 'Template lock document must explicitly remain LOCKED');
assert.match(lock, /MSC-GUIDE-001/, 'Template lock document must identify Guide 001 as the visual reference');
assert.match(lock, /100rem/, 'Template lock document must preserve the approved reading-width decision');
assert.match(lock, /immediately above Key Terms/i, 'Template lock document must preserve Next Guide placement');

console.log('MSC Learn shared guide template validation passed: Guide 001 visual contract is centralized, shared, registry-bound, drift-checked, and ready for controlled guide rollout.');
