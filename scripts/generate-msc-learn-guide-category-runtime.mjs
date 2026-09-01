import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const BASE_GENERATOR = 'scripts/generate-msc-learn-guide-001-runtime.mjs';
const SOURCE_DIR = 'docs/learn/content/guides';
const TMP_DIR = '.msc-guide-category-rollout-tmp';
const WRITE = process.argv.includes('--write');

const readNumberArg = (name) => {
  const prefix = `--${name}=`;
  const value = process.argv.find((arg) => arg.startsWith(prefix))?.slice(prefix.length);
  assert.ok(value, `Missing ${prefix}<number>`);
  const parsed = Number(value);
  assert.ok(Number.isInteger(parsed), `${name} must be an integer`);
  return parsed;
};

const START = readNumberArg('start');
const END = readNumberArg('end');
assert.ok(START >= 2 && START <= 80, 'start must be between Guide 002 and Guide 080');
assert.ok(END >= START && END <= 80, 'end must be greater than or equal to start and no greater than Guide 080');

const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');
const pad = (value) => String(value).padStart(3, '0');

function replaceOnce(source, needle, replacement, label) {
  const first = source.indexOf(needle);
  assert.notEqual(first, -1, `Base guide generator drifted: missing ${label}`);
  assert.equal(source.indexOf(needle, first + needle.length), -1, `Base guide generator drifted: duplicate ${label}`);
  return source.replace(needle, replacement);
}

function sourcePathFor(number) {
  const id = `MSC-GUIDE-${pad(number)}`;
  const matches = fs.readdirSync(path.join(ROOT, SOURCE_DIR)).filter((file) => file.startsWith(`${id}-`) && file.endsWith('.md'));
  assert.equal(matches.length, 1, `${id} must resolve to exactly one COPY_LOCKED source package`);
  return `${SOURCE_DIR}/${matches[0]}`;
}

function configFor(number) {
  const numberText = pad(number);
  const id = `MSC-GUIDE-${numberText}`;
  return {
    id,
    source: sourcePathFor(number),
    json: `docs/learn/runtime/${id}.json`,
    snippet: `snippets/msc-learn-guide-${numberText}-runtime.liquid`,
    dom: `MscGuide${numberText}`,
  };
}

const strictKeyTermParser = String.raw`function parseKeyTerms(markdown) {
  return normalize(markdown).split(/\n\n+/).map((block) => {
    const match = block.match(/^\*\*(.+?):\*\*\s+([\s\S]+)$/);
    if (!match) throw new Error(\`Invalid key term block: \${block}\`);
    return { term: match[1], definition: normalize(match[2]) };
  });
}`;

const flexibleKeyTermParser = String.raw`function parseKeyTerms(markdown) {
  const normalized = normalize(markdown);
  if (/^-\s+\*\*/.test(normalized)) {
    return normalized.split(/\n(?=-\s+\*\*)/).map((block) => {
      const clean = normalize(block);
      const match = clean.match(/^-\s+\*\*(.+?):\*\*\s+([\s\S]+)$/);
      if (!match) throw new Error('Invalid key term bullet: ' + clean);
      return { term: match[1], definition: normalize(match[2]) };
    });
  }
  return normalized.split(/\n\n+/).map((block) => {
    const match = block.match(/^\*\*(.+?):\*\*\s+([\s\S]+)$/);
    if (!match) throw new Error('Invalid key term block: ' + block);
    return { term: match[1], definition: normalize(match[2]) };
  });
}`;

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
  source = replaceOnce(source, strictKeyTermParser, flexibleKeyTermParser, 'parseKeyTerms');
  source = source
    .replaceAll('MscGuide001Terms', `${config.dom}Terms`)
    .replaceAll('MscGuide001Sources', `${config.dom}Sources`)
    .replaceAll('Rebuild with npm run build:learn-guide-pilot.', `Rebuild with node scripts/generate-msc-learn-guide-category-runtime.mjs --start=${START} --end=${END} --write.`);
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
    assert.ok(fs.existsSync(path.join(ROOT, config.json)), `${config.json} is missing; run the category materializer with --write`);
    assert.ok(fs.existsSync(path.join(ROOT, config.snippet)), `${config.snippet} is missing; run the category materializer with --write`);
    assert.equal(read(config.json), generatedJson, `${config.json} is stale`);
    assert.equal(read(config.snippet), generatedSnippet, `${config.snippet} is stale`);
  }
}

try {
  fs.rmSync(path.join(ROOT, TMP_DIR), { recursive: true, force: true });
  fs.mkdirSync(path.join(ROOT, TMP_DIR), { recursive: true });
  for (let number = START; number <= END; number += 1) materialize(configFor(number));
  console.log(`MSC Learn Guide ${pad(START)}–${pad(END)} category runtime ${WRITE ? 'materialized' : 'validation passed'} using the locked Guide 001 parser.`);
} finally {
  fs.rmSync(path.join(ROOT, TMP_DIR), { recursive: true, force: true });
}
