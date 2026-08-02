import assert from 'node:assert/strict';
import fs from 'node:fs';
import { inspectMarkdown } from './lib/markdown.mjs';
import {
  validateContentBlock,
  validateInactiveDestination,
  validateRelationship,
  validateGlossaryOwnership,
  validateRuntimeObject,
} from './lib/runtime-validation.mjs';

const SHA = '0'.repeat(64);

function issues(markdown, type) {
  return inspectMarkdown(markdown, 'topic-guide').unsupported_constructs.filter((issue) => issue.type === type);
}

function blocks(markdown) {
  return inspectMarkdown(markdown, 'topic-guide').constructs;
}

function assertBlocked(markdown, type, message) {
  assert.ok(issues(markdown, type).some((issue) => issue.blocking), message || `Expected ${type} blocker`);
}

function assertNotBlocked(markdown, type, message) {
  assert.equal(issues(markdown, type).filter((issue) => issue.blocking).length, 0, message || `Unexpected ${type} blocker`);
}

// Semantic-table acceptance and preservation.
const validTable = `### Taproot trees are not block transaction trees

| Property | Block transaction tree | Taproot script tree |
|:---|:---:|---:|
| Leaves | txids | Tagged leaf hashes |
| Pipe | escaped \\| value | \`inline | pipe\` |
`;
const validTableResult = inspectMarkdown(validTable, 'topic-guide');
assert.equal(validTableResult.constructs.semantic_tables.length, 1);
assert.equal(validTableResult.constructs.semantic_tables[0].label, 'Taproot trees are not block transaction trees');
assert.deepEqual(validTableResult.constructs.semantic_tables[0].columns.map((column) => column.alignment), ['left', 'center', 'right']);
assert.equal(validTableResult.constructs.semantic_tables[0].rows[1].cells[1], 'escaped | value');
assert.equal(validTableResult.constructs.semantic_tables[0].rows[1].cells[2], '`inline | pipe`');

// Malformed table candidates must never disappear.
assertBlocked(`### Table\n\n| Header |\n| --- |\n| Value |\n`, 'unsupported-table', 'one-column table must block');
assertBlocked(`### Table\n\n| A | B |\n| a | b |\n`, 'unsupported-table', 'missing delimiter with outer pipes must block');
assertBlocked(`### Table\n\nA | B\na | b\n`, 'unsupported-table', 'missing delimiter without outer pipes must block');
assertBlocked(`### Table\n\n| A | B |\n| -- | --- |\n| a | b |\n`, 'unsupported-table', 'invalid delimiter must block');
assertBlocked(`### Table\n\n| A | B |\n| --- | --- |\n| a | b | c |\n`, 'unsupported-table', 'extra body cell must block');
assertBlocked(`### Table\n\n| A | B |\n| --- | --- |\n| a |\n`, 'unsupported-table', 'missing body cell must block');
assertBlocked(`### Table\n\n| A | B |\n| --- | --- |\n`, 'unsupported-table', 'missing body row must block');
assertBlocked(`### Table\n\n| A | B |\n| --- | --- |\n| a | b \\\n  continued |\n`, 'unsupported-table', 'ambiguous multiline row must block');
assertBlocked(`### Table\n\n| A | B |\n| --- | --- |\n| a | <button>Run</button> |\n`, 'unsupported-table', 'raw HTML cell must block');
assertBlocked(`### Table\n\n| A | B |\n| --- | --- |\n| a | [go](https://example.com) |\n`, 'unsupported-table', 'active link cell must block');
assertBlocked(`### Table\n\n| A | B |\n| --- | --- |\n| a | ![x](image.png) |\n`, 'unsupported-table', 'image cell must block');
assertNotBlocked('Ordinary prose has one incidental | character and remains prose.\n', 'unsupported-table', 'isolated prose pipe must not become a table');

// Fenced-code contract.
let fenced = blocks('```sh\necho hello\n```\n').inert_fenced_code_blocks;
assert.equal(fenced.length, 1);
assert.equal(fenced[0].language, 'sh');
assert.equal(fenced[0].code, 'echo hello\n');
assert.equal(fenced[0].executable, false);
assert.equal(fenced[0].controls_enabled, false);
assert.equal(fenced[0].escape_before_render, true);

fenced = blocks('~~~~sh\n  echo one\n\n  echo two\n~~~~~\n').inert_fenced_code_blocks;
assert.equal(fenced.length, 1);
assert.equal(fenced[0].code, '  echo one\n\n  echo two\n');
assert.equal(blocks('```\nplain\n```\n').inert_fenced_code_blocks[0].language, null);
assert.equal(blocks('```sh\necho long\n````\n').inert_fenced_code_blocks.length, 1);
assertBlocked('```sh\ntext\n', 'unsupported-fenced-code', 'explicit unclosed fence must block');
assertBlocked('```sh\ntext\n~~\n', 'unsupported-fenced-code', 'mismatched closer must leave an unclosed fence');
assertBlocked('````sh\ntext\n```\n', 'unsupported-fenced-code', 'shorter closer must leave an unclosed fence');
assertBlocked('```bad label\ntext\n```\n', 'unsupported-fenced-code', 'invalid language label must block');
assertBlocked('```sh\n~~~\n```\n', 'unsupported-fenced-code', 'ambiguous nested fence must block');

const unsafeInsideFence = `\`\`\`sh
<script>alert(1)</script>
[go](javascript:alert(1))
![x](image.png)
onclick=run
# heading
- list
| A | B |
| --- | --- |
| a | b |
\`\`\`
`;
assert.equal(blocks(unsafeInsideFence).inert_fenced_code_blocks.length, 1);
for (const type of ['raw-html', 'active-markdown-link', 'markdown-image', 'inline-event-handler-text', 'unsupported-table']) assertNotBlocked(unsafeInsideFence, type);
const unsafeOutsideFence = `${unsafeInsideFence}\nPrefix <script>alert(1)</script>\n[go](javascript:alert(1))\n![x](image.png)\nonclick=run\n`;
for (const type of ['raw-html', 'active-markdown-link', 'markdown-image', 'inline-event-handler-text']) assertBlocked(unsafeOutsideFence, type);
assertBlocked(`${unsafeInsideFence}\n##### unexpected\n`, 'unexpected-heading-depth');
assertBlocked(`${unsafeInsideFence}\n- parent\n  - nested\n`, 'unsupported-nested-list');
assertBlocked(`${unsafeInsideFence}\n### Table\n\nA | B\na | b\n`, 'unsupported-table');

// HTML detection anywhere, while comparison prose remains valid.
for (const html of [
  'Prefix <script>alert(1)</script>',
  'Prefix <a href="/">link</a>',
  'Prefix <form></form>',
  'Prefix <button>Run</button>',
  'Prefix <input type="text">',
  'Prefix <div onclick="run()">x</div>',
  'Prefix <!-- comment -->',
  'Prefix <!-- multi\nline comment --> suffix',
]) assertBlocked(html, 'raw-html');
assertNotBlocked('The comparison value < 5 is ordinary text.', 'raw-html');

// Structured Sources links are non-blocking only in an approved URL field.
const acceptedSource = `## 4. Sources

1. **Primary source** | Publisher
   - URL: [https://example.com/source](https://example.com/source)
   - Supports: Example support.
`;
assert.equal(issues(acceptedSource, 'source-markdown-link')[0]?.count, 1);
assertNotBlocked(acceptedSource, 'active-markdown-link');
assertBlocked(`## 4. Sources\n\nThis prose has [a link](https://example.com).\n`, 'active-markdown-link');
assertBlocked(`## 4. Sources\n\n1. **Bad source**\n   - URL: See [source](https://example.com)\n`, 'active-markdown-link');
assertBlocked(`## 4. Sources\n\n1. **Bad source**\n   - URL: [run](javascript:alert(1))\n`, 'active-markdown-link');
assertBlocked(`## 4. Sources\n\n1. **Bad source**\n   - URL: [data](data:text/html,hello)\n`, 'active-markdown-link');
assertBlocked(`## 4. Sources\n\n1. **Bad source**\n   - URL: [vb](vbscript:msgbox(1))\n`, 'active-markdown-link');
assertBlocked(`[outside](https://example.com)\n\n${acceptedSource}`, 'active-markdown-link');

// Closed schema assertions.
const schema = JSON.parse(fs.readFileSync('docs/learn/runtime/schema/msc-learn-runtime-v2.schema.json', 'utf8'));
assert.equal(schema.$schema, 'https://json-schema.org/draft/2020-12/schema');
assert.equal(schema.properties.schema_version.const, '2.0.0');
assert.equal(schema.$defs.inactiveDestination.additionalProperties, false);
assert.equal(schema.$defs.relationship.additionalProperties, false);
assert.equal(schema.$defs.relationship.properties.metadata, undefined);
assert.equal(schema.$defs.glossaryIndexRoleData.properties.letter_groups.items.properties.terms.items.properties.ownership.additionalProperties, false);
assert.equal(schema.$defs.richTextContentBlock.additionalProperties, false);
assert.equal(schema.$defs.richTextContentBlock.properties.html, undefined);
assert.equal(schema.$defs.richTextContentBlock.properties.text.$ref, '#/$defs/safeText');
assert.equal(schema.$defs.richTextContentBlock.properties.escape_before_render.const, true);
assert.match(schema.$defs.semanticTableRow.properties.cells.$comment, /runtime-validation\.mjs/);

// Runtime-object validator acceptance and rejection.
const validSemanticTable = {
  id: 'table-1', type: 'semantic-table', label: 'Accessible label', label_source: 'nearest-source-heading',
  columns: [
    { id: 'column-1', header: 'First', alignment: null },
    { id: 'column-2', header: 'Second', alignment: 'right' },
  ],
  rows: [{ cells: ['a', 'b'] }], source_sha256: SHA,
};
assert.deepEqual(validateContentBlock(validSemanticTable), []);
assert.ok(validateContentBlock({ ...validSemanticTable, rows: [{ cells: ['a', 'b', 'c'] }] }).length);
assert.ok(validateContentBlock({ ...validSemanticTable, rows: [{ cells: ['a'] }] }).length);
assert.ok(validateContentBlock({ ...validSemanticTable, columns: [] }).length);
assert.ok(validateContentBlock({ ...validSemanticTable, rows: [] }).length);
assert.ok(validateContentBlock({ ...validSemanticTable, columns: [{ id: 'column-2', header: 'A', alignment: null }, { id: 'column-2', header: 'B', alignment: null }] }).length);
assert.ok(validateContentBlock({ ...validSemanticTable, label: '' }).length);
assert.ok(validateContentBlock({ ...validSemanticTable, rows: [{ cells: ['a', '<script>x</script>'] }] }).length);
assert.ok(validateContentBlock({ ...validSemanticTable, type: 'unknown-block' }).length);

const validCode = {
  id: 'code-1', type: 'inert-code', language: 'sh', code: 'echo safe\n', executable: false,
  controls_enabled: false, escape_before_render: true, source_sha256: SHA,
};
assert.deepEqual(validateContentBlock(validCode), []);
assert.ok(validateContentBlock({ ...validCode, executable: true }).length);
assert.ok(validateContentBlock({ ...validCode, controls_enabled: true }).length);
assert.ok(validateContentBlock({ ...validCode, escape_before_render: false }).length);

const validText = {
  id: 'paragraph-1', type: 'paragraph', heading: null, text: 'Safe plain text.', format: 'plain-text',
  escape_before_render: true, source_sha256: SHA,
};
assert.deepEqual(validateContentBlock(validText), []);
assert.ok(validateContentBlock({ ...validText, text: '<script>alert(1)</script>' }).length);
assert.ok(validateContentBlock({ ...validText, onclick: 'run' }).length);

const validDestination = { registry_id: 'MSC-GUIDE-001', title: 'What Is Bitcoin?', active: false, url: null };
assert.deepEqual(validateInactiveDestination(validDestination), []);
assert.ok(validateInactiveDestination({ ...validDestination, href: '/unsafe' }).length);
assert.ok(validateInactiveDestination({ ...validDestination, onclick: 'run' }).length);

const validRelationship = {
  relation_type: 'next', registry_id: 'MSC-GUIDE-001', title: 'Next', planning_handle: 'what-is-bitcoin',
  active: false, url: null, order: 1,
};
assert.deepEqual(validateRelationship(validRelationship), []);
assert.ok(validateRelationship({ ...validRelationship, metadata: { arbitrary: true } }).length);
assert.ok(validateRelationship({ ...validRelationship, publication: { state: 'PUBLISHED' } }).length);

const validOwnership = { page_role: 'page-role:topic-guide', primary_category: 'Bitcoin Basics', subcategory: 'Using Bitcoin' };
assert.deepEqual(validateGlossaryOwnership(validOwnership), []);
assert.ok(validateGlossaryOwnership({ ...validOwnership, arbitrary: true }).length);

const minimalRuntime = {
  relationships: [validRelationship],
  content: { orientation: [validText] },
  role_data: { article_sections: [validSemanticTable, validCode], destination: validDestination },
};
assert.deepEqual(validateRuntimeObject(minimalRuntime), []);
assert.ok(validateRuntimeObject({ ...minimalRuntime, role_data: { article_sections: [{ ...validCode, executable: true }] } }).length);

process.stdout.write('MSC Learn runtime contract tests passed.\n');
