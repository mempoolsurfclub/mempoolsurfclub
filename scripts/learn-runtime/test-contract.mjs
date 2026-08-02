import assert from 'node:assert/strict';
import fs from 'node:fs';
import { inspectMarkdown } from './lib/markdown.mjs';
import {
  assertRuntimeCandidate,
  safeTextReason,
  validateContentBlock,
  validateRuntimeCandidate,
  validateRuntimeObject,
  validateSourceReference,
  strictHttpsReason,
  repositoryPathReason,
} from './lib/runtime-validation.mjs';

const SHA = 'a'.repeat(64);
const clone = (value) => structuredClone(value);
const issue = (markdown, type, role = 'topic-guide') => inspectMarkdown(markdown, role).unsupported_constructs.find((entry) => entry.type === type);
const blocks = (markdown, role = 'topic-guide') => inspectMarkdown(markdown, role).constructs;

function assertBlocked(markdown, type, message, role = 'topic-guide') {
  const found = issue(markdown, type, role);
  assert.ok(found?.blocking, `${message}: expected blocking ${type}, got ${JSON.stringify(inspectMarkdown(markdown, role).unsupported_constructs)}`);
}

function assertNotBlocked(markdown, type, message = '') {
  assert.equal(issue(markdown, type), undefined, `${message}: unexpected ${type}`);
}

function assertSchemaFailure(runtime, pathFragment, keywordOrMessage) {
  const result = validateRuntimeCandidate(runtime);
  assert.equal(result.valid, false);
  assert.ok(result.schema_errors.length > 0, 'expected schema-layer failure');
  assert.equal(result.runtime_errors.length, 0, 'runtime layer must not run after schema failure');
  assert.ok(result.schema_errors.some((error) => error.path.includes(pathFragment)
    && (error.keyword.includes(keywordOrMessage) || error.message.includes(keywordOrMessage))),
  `missing schema error at ${pathFragment} containing ${keywordOrMessage}: ${JSON.stringify(result.schema_errors)}`);
}

function assertRuntimeFailure(runtime, pathFragment, category, messageFragment) {
  const result = validateRuntimeCandidate(runtime);
  assert.equal(result.valid, false);
  assert.equal(result.schema_errors.length, 0, `fixture must be schema-valid: ${JSON.stringify(result.schema_errors)}`);
  assert.ok(result.runtime_errors.some((error) => error.path.includes(pathFragment)
    && error.category === category && error.message.includes(messageFragment)),
  `missing runtime error ${category} at ${pathFragment}: ${JSON.stringify(result.runtime_errors)}`);
}

function assertDirectRuntimeFailure(runtime, pathFragment, messageFragment) {
  const errors = validateRuntimeObject(runtime);
  assert.ok(errors.some((error) => error.includes(pathFragment) && error.includes(messageFragment)),
    `missing post-schema traversal error at ${pathFragment}: ${JSON.stringify(errors)}`);
}

const paragraph = (id = 'paragraph-1', heading = null, text = 'Safe plain technical text with <pubkey>.') => ({
  id, type: 'paragraph', heading, text, format: 'plain-text', escape_before_render: true, source_sha256: SHA,
});
const destination = (registryId = 'MSC-GUIDE-001') => ({
  registry_id: registryId,
  title: 'Safe destination title',
  planning_handle: 'safe-destination',
  label: 'Read next',
  description: 'Safe destination description.',
  depth: 'Foundational',
  format: 'Guide',
  reading_time: '5 minutes',
  status_note: 'Preview only',
  action_label: 'Continue',
  active: false,
  url: null,
});
const relationship = () => ({
  relation_type: 'next', registry_id: 'MSC-GUIDE-001', title: 'Next guide', planning_handle: 'what-is-bitcoin',
  active: false, url: null, order: 1, placement: 'After this destination', required: false,
});
const illustration = () => ({
  id: 'illustration-1', title: 'Network diagram', educational_purpose: 'Explain the system.',
  recommended_placement: 'After orientation.', visual_description: 'A calm technical diagram.',
  required_labels: ['Node', 'Peer'], caption: 'Nodes relay data.', alt_text: 'Diagram of connected nodes.',
  orientation: 'Landscape', mobile_crop_notes: 'Keep the center visible.', status: 'PLANNED', asset: null, render: false,
});

function baseRuntime(pageRole, registryId) {
  return {
    schema_version: '2.0.0',
    generator_version: '1.0.0',
    identity: { registry_id: registryId, page_role: pageRole, status: 'COPY_LOCKED', h1: 'Safe H1 with <txid>', planning_handle: 'safe-runtime' },
    source: {
      package: { file: 'docs/learn/content/guides/MSC-GUIDE-001-what-is-bitcoin.md', sha256: SHA },
      registry: { file: 'docs/learn/MSC_Learn_Master_Registry.json', sha256: SHA, record_sha256: SHA },
      manifest: { file: 'docs/learn/content/content-manifest.json', sha256: SHA, record_sha256: SHA },
    },
    content: { introductory_deck: 'Safe introductory deck.', orientation: [paragraph()] },
    key_terms: [{ term: 'Node', definition: 'A participant that validates data.' }],
    sources: [{ title: 'Primary source', author_or_publisher: 'Publisher', reference_type: 'url', reference: 'https://example.com/source', supports: 'Supports this fixture.' }],
    seo: { title: 'Safe SEO title', meta_description: 'Safe meta description.', excerpt: 'Safe excerpt.', reading_time: '5 minutes' },
    relationships: [relationship()],
    review: {
      reviewed_date: '2026-08-02', copy_locked_date: '2026-08-02',
      human_verification: { reviewer: 'Independent reviewer', review_date: '2026-08-02', notes: ['Checked against primary sources.'] },
      accuracy_checklist: [{ checked: true, statement: 'Technical claims checked.' }],
    },
    illustrations: [illustration()],
    publication: { state: 'PREVIEW_ONLY', public_url: null, shopify_page_id: null, template_suffix: null, links_active: false, publication_source: null },
    role_data: {},
  };
}

function fixture(role) {
  const ids = {
    'topic-guide': 'MSC-GUIDE-001', 'category-hub': 'MSC-HUB-BASICS', 'learning-path': 'MSC-PATH-START',
    'featured-route': 'MSC-ROUTE-001', 'glossary-index': 'MSC-GLOSSARY-001',
  };
  const runtime = baseRuntime(role, ids[role]);
  if (role === 'topic-guide') runtime.role_data = {
    article_sections: [paragraph('section-1', 'Guide section heading', 'Guide article text.')],
    category: { registry_id: 'MSC-HUB-BASICS', title: 'Bitcoin Basics', subcategory: 'Foundations' },
    depth: 'Foundational', format: 'Guide',
  };
  if (role === 'category-hub') runtime.role_data = {
    article_sections: [paragraph('hub-orientation', 'Hub orientation', 'Hub orientation copy.')],
    subcategories: [{ id: 'foundations', title: 'Foundations', guide_cards: [destination()] }],
    canonical_destination_ids: ['MSC-GUIDE-001'],
  };
  if (role === 'learning-path') runtime.role_data = {
    orientation: [paragraph('path-orientation', 'Path orientation', 'Path orientation copy.')],
    stages: [{ stage_number: 1, title: 'Start here', summary_text: 'Stage summary.', steps: [{ ...destination(), step_number: 1, understand_before_continuing: 'Understand the basic model.' }] }],
    branches: [{ ...destination('MSC-PATH-NETWORK'), planning_handle: 'understand-the-network', label: 'Optional branch', after_step_number: 1 }],
  };
  if (role === 'featured-route') runtime.role_data = {
    orientation: [paragraph('route-orientation', 'Route orientation', 'Route orientation copy.')],
    lifecycle_steps: [{ step_number: 1, heading: 'Create transaction', explanatory_text: 'The wallet constructs a transaction.', route_state: 'Constructed', active: false, url: null }],
    companions: [destination()],
  };
  if (role === 'glossary-index') runtime.role_data = {
    orientation: [paragraph('glossary-orientation', 'Glossary orientation', 'Glossary orientation copy.')],
    populated_letter_sequence: ['a'], populated_letter_counts: { a: 1 },
    letter_groups: [{ letter: 'a', term_count: 1, terms: [{
      preferred_term: 'Address', definition: 'A user-facing encoding.', canonical_destination_registry_id: 'MSC-GUIDE-001',
      canonical_planning_handle: 'what-is-bitcoin', ownership: { page_role: 'Topic guide', primary_category: 'Bitcoin Basics', subcategory: 'Foundations' }, active: false, url: null,
    }] }], total_terms: 1,
  };
  return runtime;
}

// Table candidate and false-positive regressions.
for (const prose of [
  'Alpha compares A | B in prose.\nBeta compares C | D in prose.\n',
  'The expression A | B describes alternatives.\nAnother paragraph discusses C | D separately.\n',
  'Bitcoin Script notation may use A | B as alternatives.\n',
]) {
  assert.equal(blocks(prose).semantic_tables.length, 0);
  assertNotBlocked(prose, 'unsupported-table', 'ordinary prose pipe lines must remain prose');
}
assert.equal(blocks('### Table\n\nA | B\n--- | ---\na | b\n').semantic_tables.length, 1);
assert.equal(blocks('### Table\n\n| A | B |\n| :--- | ---: |\n| a | b |\n').semantic_tables.length, 1);
assert.equal(blocks('### Table\n\nA | B\n:--- | ---:\na | b\n').semantic_tables[0].columns[0].alignment, 'left');
assert.equal(blocks('### Table\n\nA | B\n--- | ---\n`x | y` | z\na\\|b | c\n').semantic_tables.length, 1);
assert.equal(blocks('### One\n\nA | B\n--- | ---\na | b\n\n### Two\n\nC | D\n--- | ---\nc | d\n').semantic_tables.length, 2);
assert.equal(blocks('Prose before.\n\n### Table\n\nA | B\n--- | ---\na | b\n\nProse after.\n').semantic_tables.length, 1);
assertBlocked('### Table\n\n| A | B\n--- | ---\na | b |\n', 'unsupported-table', 'mixed outer-pipe syntax must block');
assertBlocked('### Table\n\n| A |\n| --- |\n| a |\n', 'unsupported-table', 'one-column table must block');
assertBlocked('### Table\n\n| A | B |\n| -- | --- |\n| a | b |\n', 'unsupported-table', 'invalid delimiter must block');
assertBlocked('### Table\n\n| A | B |\n| a | b |\n', 'unsupported-table', 'explicit outer-pipe table without delimiter must block');
assertBlocked('### Table\n\nA | B\n--- | --- | ---\na | b\n', 'unsupported-table', 'delimiter width mismatch must block');
assertBlocked('### Table\n\nA | B\n--- | ---\n', 'unsupported-table', 'missing body must block');
assertBlocked('### Table\n\nA | B\n--- | ---\na\n', 'unsupported-table', 'missing body cells must block');
assertBlocked('### Table\n\nA | B\n--- | ---\na | b | c\n', 'unsupported-table', 'extra body cells must block');
assertBlocked('### Table\n\nA | B\n--- | ---\n`a | b | c\n', 'unsupported-table', 'unbalanced inline-code pipe must block');
assertBlocked('### Table\n\nA | B\n--- | ---\na | <script>\n', 'unsupported-table', 'HTML in cells must block');
assertBlocked('### Table\n\nA | B\n--- | ---\na | [x](https://example.com)\n', 'unsupported-table', 'links in cells must block');
assertBlocked('### Table\n\nA | B\n--- | ---\na | ![x](image.png)\n', 'unsupported-table', 'images in cells must block');
assertNotBlocked('```sh\nA | B\n--- | ---\na | b\n```\n', 'unsupported-table', 'fenced pipes must remain code');
assertNotBlocked('## 4. Sources\n\n1. **Source**\n   - Reference: path\\|segment\n', 'unsupported-table', 'escaped source references must not become tables');

const guide060 = fs.readFileSync('docs/learn/content/guides/MSC-GUIDE-060-bitcoin-merkle-trees.md', 'utf8');
const guide060Inspection = inspectMarkdown(guide060, 'topic-guide');
assert.equal(guide060Inspection.constructs.semantic_tables.length, 1);
assert.equal(guide060Inspection.constructs.semantic_tables[0].label, 'Taproot trees are not block transaction trees');
assert.equal(issue(guide060, 'unsupported-table'), undefined);

// Placeholder-aware HTML handling.
for (const placeholder of ['<pubkey>', '<signature>', '<txid>', '<block_hash>']) {
  assert.equal(safeTextReason(`Bitcoin data uses ${placeholder}.`), null);
  assertNotBlocked(`Bitcoin data uses ${placeholder}.`, 'raw-html');
}
for (const html of ['<svg>', '<SVG>', '<math>', '<marquee>', '<script>', '<style>', '<form>', '<button>', '<input>', '<iframe>', '<a>', '<x-widget>', '<div onclick="run()">', '</div>', '</pubkey>', '<pubkey/>', '<pubkey onclick="run()">', '<!-- comment -->', '<!DOCTYPE html>']) {
  assert.ok(safeTextReason(html)?.includes('HTML') || safeTextReason(html)?.includes('event'));
  assertBlocked(html, 'raw-html', `actual HTML must block: ${html}`);
}
assertNotBlocked('The comparison value < 5 remains ordinary text.', 'raw-html');
assertNotBlocked('The comparison height > width remains ordinary text.', 'raw-html');
assert.equal(safeTextReason('Use <pubkey>, <signature>, <txid>, and <block_hash> together.'), null);
assert.equal(blocks('### Placeholder table\n\nA | B\n--- | ---\n<pubkey> | <signature>\n').semantic_tables.length, 1);

// Structured Sources records and URL parsing.
const validSource = '## 4. Sources\n\n1. **Primary source** | Publisher\n   - URL: [x](https://example.com/source)\n   - Supports: Exact support.\n';
assert.equal(issue(validSource, 'source-markdown-link')?.count, 1);
assertNotBlocked(validSource, 'active-markdown-link');
const plainSource = '## 4. Sources\n\n1. **Primary source** | Publisher\n   - Direct URL: https://example.com/source\n';
assertNotBlocked(plainSource, 'active-plain-url');
assertNotBlocked(plainSource, 'invalid-source-reference');
assertBlocked('## 4. Sources\n\n### Notes\n- URL: [x](https://example.com)\n', 'active-markdown-link', 'H3 must not open a source record');
for (const malformed of [
  '## 4. Sources\n\n1. **Source**\n   - URL: [x](https://)\n',
  '## 4. Sources\n\n1. **Source**\n   - URL: [x](https://bad host/example)\n',
  '## 4. Sources\n\n1. **Source**\n   - URL: [x](http://example.com)\n',
  '## 4. Sources\n\n1. **Source**\n   - URL: [x](javascript:alert)\n',
  '## 4. Sources\n\n1. **Source**\n   - URL: [x](/relative)\n',
]) assertBlocked(malformed, 'invalid-source-reference', 'invalid source reference must block');
assertBlocked('## 4. Sources\n\n1. **Source**\n   - Supports: [x](https://example.com)\n', 'active-markdown-link', 'links in Supports must remain active/blocking');
assertBlocked('[x [y]](https://example.com)', 'malformed-markdown-link', 'nested malformed link must block');
assertBlocked('[x](https://example.com', 'malformed-markdown-link', 'unbalanced link must block');

assertBlocked('## 4. Sources\n\n### Notes\n\n- URL: https://example.com\n', 'unqualified-source-reference', 'H3 plain URL must be unqualified');
assertBlocked('## 4. Sources\n\n### Notes\n\n- URL: [x](https://example.com)\n', 'unqualified-source-reference', 'H3 Markdown link must be unqualified');
for (const boundaryFixture of [
  '## 4. Sources\n\n1. **Primary source**\n   - URL: https://one.example\n\n### Notes\n   - URL: https://after.example\n',
  '## 4. Sources\n\n1. **Primary source**\n   - URL: https://one.example\n\n### Notes\n   - URL: [x](https://after.example)\n',
  '## 4. Sources\n\n1. **One**\n   - URL: https://one.example\n\n- URL: https://between.example\n\n2. **Two**\n   - URL: https://two.example\n',
  '## 4. Sources\n\n1. **One**\n   - URL: https://one.example\n\n- URL: [x](https://between.example)\n\n2. **Two**\n   - URL: https://two.example\n',
  '## 4. Sources\n\n1. **One**\n   - URL: https://one.example\n\n- URL: https://after.example\n',
  '## 4. Sources\n\n1. **One**\n   - URL: https://one.example\n\n- URL: [x](https://after.example)\n',
]) assertBlocked(boundaryFixture, 'unqualified-source-reference', 'record termination must expose unqualified references');
{
  const multiple = inspectMarkdown('## 4. Sources\n\n1. **One**\n   - URL: https://one.example\n\n2. **Two**\n   - URL: [two](https://two.example)\n', 'topic-guide');
  assert.equal(multiple.source_references.structured.length, 2);
  assert.deepEqual(multiple.source_references.structured.map((item) => item.record_number), [1, 2]);
  assert.equal(multiple.source_references.unqualified.length, 0);
}
for (const invalidHost of ['https://bad_host/path', 'https://-bad.example', 'https://bad-.example', 'https://bad..example', 'https://localhost/path']) {
  assertBlocked('## 4. Sources\n\n1. **Source**\n   - URL: ' + invalidHost + '\n', 'invalid-source-reference', 'invalid hostname must block: ' + invalidHost);
}

// Fenced-code safety and exact preservation.
const fenced = blocks('```sh\n  echo one\n\n  echo two\n```\n').inert_fenced_code_blocks[0];
assert.equal(fenced.language, 'sh');
assert.equal(fenced.code, '  echo one\n\n  echo two\n');
assert.equal(fenced.executable, false);
assert.equal(fenced.controls_enabled, false);
assert.equal(fenced.escape_before_render, true);
assertBlocked('```sh\nunclosed\n', 'unsupported-fenced-code', 'unclosed fence must block');

// Five complete positive runtime fixtures must pass both layers.
const roles = ['topic-guide', 'category-hub', 'learning-path', 'featured-route', 'glossary-index'];
const fixtures = Object.fromEntries(roles.map((role) => [role, fixture(role)]));
for (const role of roles) {
  const result = validateRuntimeCandidate(fixtures[role]);
  assert.equal(result.valid, true, `${role}: ${JSON.stringify(result)}`);
  assert.deepEqual(result.schema_errors, []);
  assert.deepEqual(result.runtime_errors, []);
  assert.equal(assertRuntimeCandidate(fixtures[role]), fixtures[role]);
}


// Approved placeholders remain accepted in complete runtime fields and table cells.
{
  const r = clone(fixtures['topic-guide']);
  r.identity.h1 = 'Uses <pubkey> and <signature>.';
  r.role_data.article_sections[0] = {
    id: 'table-placeholders', type: 'semantic-table', label: 'Placeholder table', label_source: 'nearest-source-heading',
    columns: [{ id: 'column-1', header: '<pubkey>', alignment: null }, { id: 'column-2', header: '<signature>', alignment: null }],
    rows: [{ cells: ['<txid>', '<block_hash>'] }], source_sha256: SHA,
  };
  const result = validateRuntimeCandidate(r);
  assert.equal(result.valid, true, JSON.stringify(result));
  assert.deepEqual(result.schema_errors, []);
  assert.deepEqual(result.runtime_errors, []);
}

// Exact inert code remains exempt only through the explicit inert-code contract.
for (const code of ['<script>alert(1)</script>\n', '[link](javascript:example)\n']) {
  const r = clone(fixtures['topic-guide']);
  r.role_data.article_sections[0] = {
    id: 'code-safe', type: 'inert-code', language: 'text', code,
    executable: false, controls_enabled: false, escape_before_render: true, source_sha256: SHA,
  };
  const result = validateRuntimeCandidate(r);
  assert.equal(result.valid, true, 'inert code must pass: ' + JSON.stringify(result));
  assert.deepEqual(result.schema_errors, []);
  assert.deepEqual(result.runtime_errors, []);
}
{
  const r = clone(fixtures['topic-guide']);
  r.role_data.article_sections[0].text = '<script>alert(1)</script>';
  assertSchemaFailure(r, '/role_data/article_sections/0/text', 'pattern');
  assertDirectRuntimeFailure(r, 'runtime.role_data.article_sections[0].text', 'raw HTML');
}
{
  const r = clone(fixtures['topic-guide']);
  r.role_data.article_sections[0].text = '[link](javascript:example)';
  assertSchemaFailure(r, '/role_data/article_sections/0/text', 'pattern');
  assertDirectRuntimeFailure(r, 'runtime.role_data.article_sections[0].text', 'Markdown link');
}

// Every required less-obvious user-facing role location is safe in schema and runtime traversal.
const unsafeCases = [
  ['topic-guide', 'role_data.article_sections[0].heading', (r) => { r.role_data.article_sections[0].heading = '<script>'; }],
  ['category-hub', 'role_data.subcategories[0].title', (r) => { r.role_data.subcategories[0].title = '<script>'; }],
  ['category-hub', 'role_data.subcategories[0].guide_cards[0].description', (r) => { r.role_data.subcategories[0].guide_cards[0].description = '<script>'; }],
  ['learning-path', 'role_data.stages[0].title', (r) => { r.role_data.stages[0].title = '<script>'; }],
  ['learning-path', 'role_data.stages[0].steps[0].description', (r) => { r.role_data.stages[0].steps[0].description = '<script>'; }],
  ['learning-path', 'role_data.branches[0].label', (r) => { r.role_data.branches[0].label = '<script>'; }],
  ['featured-route', 'role_data.lifecycle_steps[0].heading', (r) => { r.role_data.lifecycle_steps[0].heading = '<script>'; }],
  ['featured-route', 'role_data.lifecycle_steps[0].explanatory_text', (r) => { r.role_data.lifecycle_steps[0].explanatory_text = '<script>'; }],
  ['featured-route', 'role_data.companions[0].description', (r) => { r.role_data.companions[0].description = '<script>'; }],
  ['glossary-index', 'role_data.letter_groups[0].terms[0].preferred_term', (r) => { r.role_data.letter_groups[0].terms[0].preferred_term = '<script>'; }],
  ['glossary-index', 'role_data.letter_groups[0].terms[0].definition', (r) => { r.role_data.letter_groups[0].terms[0].definition = '<script>'; }],
  ['glossary-index', 'role_data.letter_groups[0].terms[0].ownership.primary_category', (r) => { r.role_data.letter_groups[0].terms[0].ownership.primary_category = '<script>'; }],
  ['topic-guide', 'illustrations[0].caption', (r) => { r.illustrations[0].caption = '<script>'; }],
  ['topic-guide', 'illustrations[0].alt_text', (r) => { r.illustrations[0].alt_text = '<script>'; }],
  ['topic-guide', 'review.human_verification.notes[0]', (r) => { r.review.human_verification.notes[0] = '<script>'; }],
  ['topic-guide', 'review.human_verification.reviewer', (r) => { r.review.human_verification.reviewer = '<script>'; }],
  ['topic-guide', 'review.accuracy_checklist[0].statement', (r) => { r.review.accuracy_checklist[0].statement = '<script>'; }],
  ['topic-guide', 'identity.h1', (r) => { r.identity.h1 = '<script>'; }],
  ['topic-guide', 'role_data.category.title', (r) => { r.role_data.category.title = '<script>'; }],
];
for (const [role, path, mutate] of unsafeCases) {
  const runtime = clone(fixtures[role]); mutate(runtime);
  assertSchemaFailure(runtime, `/${path.replaceAll('.', '/').replace(/\[(\d+)\]/g, '/$1')}`, 'pattern');
  assertDirectRuntimeFailure(runtime, `runtime.${path}`, 'raw HTML');
}


{
  const r = clone(fixtures['topic-guide']); r.identity.h1 = '<svg>';
  assertSchemaFailure(r, '/identity/h1', 'pattern');
  assertDirectRuntimeFailure(r, 'runtime.identity.h1', 'raw HTML');
}
{
  const r = clone(fixtures['topic-guide']); r.sources[0].reference_type = 'citation'; r.sources[0].reference = '<svg>';
  assertSchemaFailure(r, '/sources/0/reference', 'pattern');
  assertDirectRuntimeFailure(r, 'runtime.sources[0].reference', 'raw HTML');
}

// Structural schema negatives with exact paths/categories.
{
  const r = clone(fixtures['topic-guide']); delete r.role_data.article_sections[0].type;
  assertSchemaFailure(r, '/role_data/article_sections/0', 'required');
}
{
  const r = clone(fixtures['category-hub']); r.role_data.subcategories[0].unknown = true;
  assertSchemaFailure(r, '/role_data/subcategories/0', 'additionalProperties');
}
{
  const r = clone(fixtures['learning-path']); r.role_data.stages[0].steps[0].step_number = '1';
  assertSchemaFailure(r, '/role_data/stages/0/steps/0/step_number', 'type');
}
{
  const r = clone(fixtures['topic-guide']); r.relationships[0].required = 'yes';
  assertSchemaFailure(r, '/relationships/0/required', 'type');
}
{
  const r = clone(fixtures['topic-guide']); r.relationships[0].planning_handle = 'Bad Handle';
  assertSchemaFailure(r, '/relationships/0/planning_handle', 'pattern');
}
{
  const r = clone(fixtures['category-hub']); r.role_data.subcategories[0].guide_cards[0].href = '/unsafe';
  assertSchemaFailure(r, '/role_data/subcategories/0/guide_cards/0', 'additionalProperties');
}
{
  const r = clone(fixtures['topic-guide']); r.role_data.category.title = '<button>Unsafe</button>';
  assertSchemaFailure(r, '/role_data/category/title', 'pattern');
}

// Cross-item invariant must fail only after full schema success.
{
  const r = clone(fixtures['topic-guide']);
  r.role_data.article_sections[0] = {
    id: 'table-1', type: 'semantic-table', label: 'Accessible table', label_source: 'nearest-source-heading',
    columns: [{ id: 'column-1', header: 'A', alignment: null }, { id: 'column-2', header: 'B', alignment: null }],
    rows: [{ cells: ['a', 'b', 'c'] }], source_sha256: SHA,
  };
  assertRuntimeFailure(r, 'runtime.role_data.article_sections[0].rows[0].cells', 'semantic-table', 'exactly 2 cells');
}
for (const [field, value] of [['executable', true], ['controls_enabled', true], ['escape_before_render', false]]) {
  const r = clone(fixtures['topic-guide']);
  r.role_data.article_sections[0] = { id: 'code-1', type: 'inert-code', language: 'sh', code: 'echo safe\n', executable: false, controls_enabled: false, escape_before_render: true, source_sha256: SHA };
  r.role_data.article_sections[0][field] = value;
  assertSchemaFailure(r, `/role_data/article_sections/0/${field}`, 'const');
}

// URL structure and hostname semantics.
for (const validUrl of [
  'https://example.com/path',
  'https://sub.example.com/path',
  'https://xn--bcher-kva.example/path',
  'https://192.0.2.1/path',
  'https://[2001:db8::1]/path',
]) assert.equal(strictHttpsReason(validUrl), null, validUrl);
for (const invalidUrl of [
  'https://bad_host/path',
  'https://-bad.example',
  'https://bad-.example',
  'https://bad..example',
  'https://localhost/path',
  'https://999.1.1.1/path',
  'https://[2001:db8:::1]/path',
  'https://user:pass@example.com',
  'https://',
  'http://example.com',
  '//example.com',
  '/relative',
  'javascript:example',
  'https://bad host/example',
]) assert.ok(strictHttpsReason(invalidUrl), invalidUrl);

for (const badUrl of ['https://bad_host/path', 'https://-bad.example', 'https://bad-.example', 'https://bad..example', 'https://localhost/path', 'https://999.1.1.1/path']) {
  const r = clone(fixtures['topic-guide']); r.sources[0].reference = badUrl;
  assertRuntimeFailure(r, 'runtime.sources[0].reference', 'source-reference', '');
}
for (const structurallyBadUrl of ['https://', 'https://bad host/example', 'http://example.com', '//example.com', '/relative', 'https://user:pass@example.com']) {
  const r = clone(fixtures['topic-guide']); r.sources[0].reference = structurallyBadUrl;
  assertSchemaFailure(r, '/sources/0/reference', 'pattern');
}

// Type-aware source reference policy.
for (const [type, reference] of [
  ['url', 'https://example.com/source'],
  ['repository-path', 'docs/learn/content/example.md'],
  ['citation', 'Bitcoin Core documentation using <txid>.'],
  ['other', 'Archived technical reference.'],
]) {
  const r = clone(fixtures['topic-guide']); r.sources[0].reference_type = type; r.sources[0].reference = reference;
  const result = validateRuntimeCandidate(r);
  assert.equal(result.valid, true, type + ': ' + JSON.stringify(result));
  assert.deepEqual(validateSourceReference(r.sources[0], 'runtime.sources[0]'), []);
}
for (const pathValue of ['/absolute/path', '../escape.md', 'docs/../escape.md', 'https://example.com/path', 'docs\\escape.md']) {
  assert.ok(repositoryPathReason(pathValue));
  const r = clone(fixtures['topic-guide']); r.sources[0].reference_type = 'repository-path'; r.sources[0].reference = pathValue;
  assertSchemaFailure(r, '/sources/0/reference', 'pattern');
}
for (const [type, reference] of [
  ['citation', '[active](https://example.com)'],
  ['citation', '![image](image.png)'],
  ['other', '<svg>'],
  ['other', 'javascript:example'],
]) {
  const r = clone(fixtures['topic-guide']); r.sources[0].reference_type = type; r.sources[0].reference = reference;
  assertSchemaFailure(r, '/sources/0/reference', 'pattern');
  assertDirectRuntimeFailure(r, 'runtime.sources[0].reference', type === 'other' && reference === '<svg>' ? 'raw HTML' : reference.startsWith('!') ? 'Markdown image' : reference.startsWith('[') ? 'Markdown link' : 'unsafe URI');
}

// Corpus-level parser regression: all counts are derived from the corrected production parser.
const manifest = JSON.parse(fs.readFileSync('docs/learn/content/content-manifest.json', 'utf8'));
assert.equal(manifest.entries.length, 92);
const structuredReferenceCounts = { 'plain-url': 0, 'markdown-link': 0, 'repository-path': 0 };
const unqualifiedReferenceCounts = { 'plain-url': 0, 'markdown-link': 0 };
const affectedPackageIds = new Set();
for (const entry of manifest.entries) {
  const markdown = fs.readFileSync(entry.content_file, 'utf8');
  const result = inspectMarkdown(markdown, entry.page_role);
  for (const reference of result.source_references.structured) {
    structuredReferenceCounts[reference.representation] += 1;
    assert.ok(reference.record_order > 0);
    assert.ok(reference.field_name);
    assert.ok(reference.source_line > 0);
  }
  for (const reference of result.source_references.unqualified) {
    unqualifiedReferenceCounts[reference.representation] += 1;
    affectedPackageIds.add(entry.registry_id);
    assert.ok(reference.source_line > 0);
  }
}
const sourceReferenceCount = Object.values(structuredReferenceCounts).reduce((sum, count) => sum + count, 0);
const unqualifiedSourceLinks = Object.values(unqualifiedReferenceCounts).reduce((sum, count) => sum + count, 0);
assert.ok(structuredReferenceCounts['plain-url'] > 0, JSON.stringify(structuredReferenceCounts));
assert.ok(structuredReferenceCounts['markdown-link'] > 0, JSON.stringify(structuredReferenceCounts));
assert.equal(Number.isInteger(structuredReferenceCounts['repository-path']), true);
assert.equal(inspectMarkdown('## 4. Sources\n\n1. **Repository source**\n   - Reference: docs/learn/content/example.md\n', 'topic-guide').source_references.structured[0]?.representation, 'repository-path');
assert.ok(unqualifiedSourceLinks > 0, JSON.stringify(unqualifiedReferenceCounts));
for (let number = 1; number <= 20; number += 1) {
  assert.ok(affectedPackageIds.has('MSC-GUIDE-' + String(number).padStart(3, '0')), 'expected blocked guide ' + number);
}

// Direct content-block assertions retain precise invariant coverage.
const validTable = {
  id: 'table-1', type: 'semantic-table', label: 'Label', label_source: 'nearest-source-heading',
  columns: [{ id: 'column-1', header: 'A', alignment: null }, { id: 'column-2', header: 'B', alignment: null }],
  rows: [{ cells: ['a', 'b'] }], source_sha256: SHA,
};
assert.deepEqual(validateContentBlock(validTable), []);
assert.ok(validateContentBlock({ ...validTable, rows: [{ cells: ['a'] }] }).some((error) => error.includes('exactly 2 cells')));
assert.equal(safeTextReason('Bitcoin pushes <signature>.'), null);

process.stdout.write(`MSC Learn runtime contract tests passed: five roles, 92 packages, ${sourceReferenceCount} structured references, ${unqualifiedSourceLinks} unqualified references, ${affectedPackageIds.size} affected packages.\n`);
