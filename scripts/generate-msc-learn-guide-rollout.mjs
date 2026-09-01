import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const BASE_GENERATOR = 'scripts/generate-msc-learn-guide-001-runtime.mjs';
const TMP_DIR = '.msc-guide-rollout-tmp';
const WRITE = process.argv.includes('--write');

const GUIDES = [
  {
    id: 'MSC-GUIDE-002',
    source: 'docs/learn/content/guides/MSC-GUIDE-002-why-bitcoin.md',
    json: 'docs/learn/runtime/MSC-GUIDE-002.json',
    snippet: 'snippets/msc-learn-guide-002-runtime.liquid',
    dom: 'MscGuide002',
  },
  {
    id: 'MSC-GUIDE-003',
    source: 'docs/learn/content/guides/MSC-GUIDE-003-bitcoin-history.md',
    json: 'docs/learn/runtime/MSC-GUIDE-003.json',
    snippet: 'snippets/msc-learn-guide-003-runtime.liquid',
    dom: 'MscGuide003',
  },
  {
    id: 'MSC-GUIDE-004',
    source: 'docs/learn/content/guides/MSC-GUIDE-004-satoshi-nakamoto.md',
    json: 'docs/learn/runtime/MSC-GUIDE-004.json',
    snippet: 'snippets/msc-learn-guide-004-runtime.liquid',
    dom: 'MscGuide004',
  },
  {
    id: 'MSC-GUIDE-005',
    source: 'docs/learn/content/guides/MSC-GUIDE-005-what-is-a-bitcoin-wallet.md',
    json: 'docs/learn/runtime/MSC-GUIDE-005.json',
    snippet: 'snippets/msc-learn-guide-005-runtime.liquid',
    dom: 'MscGuide005',
  },
  {
    id: 'MSC-GUIDE-006',
    source: 'docs/learn/content/guides/MSC-GUIDE-006-bitcoin-self-custody.md',
    json: 'docs/learn/runtime/MSC-GUIDE-006.json',
    snippet: 'snippets/msc-learn-guide-006-runtime.liquid',
    dom: 'MscGuide006',
  },
  {
    id: 'MSC-GUIDE-007',
    source: 'docs/learn/content/guides/MSC-GUIDE-007-send-and-receive-bitcoin.md',
    json: 'docs/learn/runtime/MSC-GUIDE-007.json',
    snippet: 'snippets/msc-learn-guide-007-runtime.liquid',
    dom: 'MscGuide007',
  },
  {
    id: 'MSC-GUIDE-008',
    source: 'docs/learn/content/guides/MSC-GUIDE-008-bitcoin-transactions-and-fees.md',
    json: 'docs/learn/runtime/MSC-GUIDE-008.json',
    snippet: 'snippets/msc-learn-guide-008-runtime.liquid',
    dom: 'MscGuide008',
  },
  {
    id: 'MSC-GUIDE-009',
    source: 'docs/learn/content/guides/MSC-GUIDE-009-bitcoin-seed-phrase.md',
    json: 'docs/learn/runtime/MSC-GUIDE-009.json',
    snippet: 'snippets/msc-learn-guide-009-runtime.liquid',
    dom: 'MscGuide009',
  },
  {
    id: 'MSC-GUIDE-010',
    source: 'docs/learn/content/guides/MSC-GUIDE-010-bitcoin-public-private-keys.md',
    json: 'docs/learn/runtime/MSC-GUIDE-010.json',
    snippet: 'snippets/msc-learn-guide-010-runtime.liquid',
    dom: 'MscGuide010',
  },
  {
    id: 'MSC-GUIDE-011',
    source: 'docs/learn/content/guides/MSC-GUIDE-011-bitcoin-security.md',
    json: 'docs/learn/runtime/MSC-GUIDE-011.json',
    snippet: 'snippets/msc-learn-guide-011-runtime.liquid',
    dom: 'MscGuide011',
  },
  {
    id: 'MSC-GUIDE-012',
    source: 'docs/learn/content/guides/MSC-GUIDE-012-bitcoin-privacy.md',
    json: 'docs/learn/runtime/MSC-GUIDE-012.json',
    snippet: 'snippets/msc-learn-guide-012-runtime.liquid',
    dom: 'MscGuide012',
  },
  {
    id: 'MSC-GUIDE-013',
    source: 'docs/learn/content/guides/MSC-GUIDE-013-bitcoin-utxos.md',
    json: 'docs/learn/runtime/MSC-GUIDE-013.json',
    snippet: 'snippets/msc-learn-guide-013-runtime.liquid',
    dom: 'MscGuide013',
  },
  {
    id: 'MSC-GUIDE-014',
    source: 'docs/learn/content/guides/MSC-GUIDE-014-bitcoin-confirmations.md',
    json: 'docs/learn/runtime/MSC-GUIDE-014.json',
    snippet: 'snippets/msc-learn-guide-014-runtime.liquid',
    dom: 'MscGuide014',
  },
  {
    id: 'MSC-GUIDE-015',
    source: 'docs/learn/content/guides/MSC-GUIDE-015-bitcoin-halving.md',
    json: 'docs/learn/runtime/MSC-GUIDE-015.json',
    snippet: 'snippets/msc-learn-guide-015-runtime.liquid',
    dom: 'MscGuide015',
  },
  {
    id: 'MSC-GUIDE-016',
    source: 'docs/learn/content/guides/MSC-GUIDE-016-bitcoin-best-practices.md',
    json: 'docs/learn/runtime/MSC-GUIDE-016.json',
    snippet: 'snippets/msc-learn-guide-016-runtime.liquid',
    dom: 'MscGuide016',
  },
];

const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');

function replaceOnce(source, needle, replacement, label) {
  const first = source.indexOf(needle);
  assert.notEqual(first, -1, `Base guide generator drifted: missing ${label}`);
  assert.equal(source.indexOf(needle, first + needle.length), -1, `Base guide generator drifted: duplicate ${label}`);
  return source.replace(needle, replacement);
}

function transformedGenerator(config, tempJson, tempSnippet) {
  let source = read(BASE_GENERATOR);
  source = replaceOnce(
    source,
    "const SOURCE_PATH = 'docs/learn/content/guides/MSC-GUIDE-001-what-is-bitcoin.md';",
    `const SOURCE_PATH = '${config.source}';`,
    'SOURCE_PATH',
  );
  source = replaceOnce(
    source,
    "const JSON_PATH = 'docs/learn/runtime/MSC-GUIDE-001.json';",
    `const JSON_PATH = '${tempJson}';`,
    'JSON_PATH',
  );
  source = replaceOnce(
    source,
    "const SNIPPET_PATH = 'snippets/msc-learn-guide-001-runtime.liquid';",
    `const SNIPPET_PATH = '${tempSnippet}';`,
    'SNIPPET_PATH',
  );
  source = replaceOnce(
    source,
    "const EXPECTED_ID = 'MSC-GUIDE-001';",
    `const EXPECTED_ID = '${config.id}';`,
    'EXPECTED_ID',
  );
  source = source
    .replaceAll('MscGuide001Terms', `${config.dom}Terms`)
    .replaceAll('MscGuide001Sources', `${config.dom}Sources`)
    .replaceAll('Rebuild with npm run build:learn-guide-pilot.', 'Rebuild with node scripts/generate-msc-learn-guide-rollout.mjs --write.');
  return source;
}

function materialize(config) {
  const tempJson = `${TMP_DIR}/${config.id}.json`;
  const tempSnippet = `${TMP_DIR}/${config.id}.liquid`;
  const tempScript = `${TMP_DIR}/generator-${config.id}.mjs`;
  fs.writeFileSync(path.join(ROOT, tempScript), transformedGenerator(config, tempJson, tempSnippet));

  const result = spawnSync(process.execPath, [tempScript], { cwd: ROOT, encoding: 'utf8' });
  if (result.status !== 0) {
    throw new Error(`Failed to materialize ${config.id}:\n${result.stdout || ''}${result.stderr || ''}`);
  }

  const generatedJson = read(tempJson);
  const generatedSnippet = read(tempSnippet);
  const runtime = JSON.parse(generatedJson);
  assert.equal(runtime.registry_id, config.id, `${config.id} runtime registry binding mismatch`);
  assert.equal(runtime.status, 'COPY_LOCKED', `${config.id} runtime must come from COPY_LOCKED source`);
  assert.equal(runtime.publication?.state, 'PREVIEW_ONLY', `${config.id} must remain preview-only`);
  assert.equal(runtime.publication?.links_active, false, `${config.id} structured runtime links must remain inactive`);
  assert.ok(runtime.article_sections?.length, `${config.id} article sections are missing`);
  assert.ok(runtime.key_terms?.length, `${config.id} key terms are missing`);
  assert.ok(runtime.sources?.length, `${config.id} sources are missing`);
  assert.ok(generatedSnippet.includes(`data-msc-registry-id=\"${config.id}\"`), `${config.id} snippet binding is missing`);
  assert.ok(!/<a\b|\bhref\s*=|page\.content/i.test(generatedSnippet), `${config.id} generated content must not activate source or article links`);

  if (WRITE) {
    fs.mkdirSync(path.dirname(path.join(ROOT, config.json)), { recursive: true });
    fs.writeFileSync(path.join(ROOT, config.json), generatedJson);
    fs.writeFileSync(path.join(ROOT, config.snippet), generatedSnippet);
  } else {
    assert.ok(fs.existsSync(path.join(ROOT, config.json)), `${config.json} is missing; run with --write`);
    assert.ok(fs.existsSync(path.join(ROOT, config.snippet)), `${config.snippet} is missing; run with --write`);
    assert.equal(read(config.json), generatedJson, `${config.json} is stale`);
    assert.equal(read(config.snippet), generatedSnippet, `${config.snippet} is stale`);
  }
}

try {
  fs.rmSync(path.join(ROOT, TMP_DIR), { recursive: true, force: true });
  fs.mkdirSync(path.join(ROOT, TMP_DIR), { recursive: true });
  for (const guide of GUIDES) materialize(guide);
  console.log(`MSC Learn Guide 002–016 rollout runtime ${WRITE ? 'materialized' : 'validation passed'} using the locked Guide 001 parser.`);
} finally {
  fs.rmSync(path.join(ROOT, TMP_DIR), { recursive: true, force: true });
}
