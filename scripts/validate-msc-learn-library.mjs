import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';

const ROOT = process.cwd();
const REGISTRY_PATH = 'docs/learn/MSC_Learn_Master_Registry.json';
const MANIFEST_PATH = 'docs/learn/content/content-manifest.json';
const GLOSSARY_PACKAGE_PATH = 'docs/learn/content/routes/MSC-GLOSSARY-001-bitcoin-glossary.md';
const GENERATED_GLOSSARY_PATH = 'snippets/msc-learn-glossary-data.liquid';
const GENERATED_FILES = [
  'snippets/msc-learn-guide-data.liquid',
  'snippets/msc-learn-category-data.liquid',
  'snippets/msc-learn-path-data.liquid',
  'snippets/msc-learn-route-data.liquid',
  GENERATED_GLOSSARY_PATH,
];
const PACKAGE_DIRECTORIES = [
  'docs/learn/content/guides',
  'docs/learn/content/hubs',
  'docs/learn/content/paths',
  'docs/learn/content/routes',
];
const FIELD = '[[MSC_FIELD]]';
const EXPECTED_MANIFEST_COUNT = 92;
const EXPECTED_GLOSSARY_COUNT = 141;
const failures = [];

function fail(message) {
  failures.push(message);
}

function readUtf8(file) {
  return fs.readFileSync(path.join(ROOT, file), 'utf8');
}

function readJson(file) {
  try {
    return JSON.parse(readUtf8(file));
  } catch (error) {
    fail(`${file} is not valid JSON: ${error.message}`);
    return null;
  }
}

function valueOf(object, names, fallback = '') {
  for (const name of names) {
    if (object && object[name] !== undefined && object[name] !== null) return object[name];
  }
  return fallback;
}

function asArray(value) {
  if (Array.isArray(value)) return value;
  return value === undefined || value === null || value === '' ? [] : [value];
}

function registryRecords(registry) {
  if (!registry) return [];
  if (Array.isArray(registry.records)) return registry.records;
  return [
    registry.homepage,
    registry.glossary_index,
    registry.featured_route,
    ...(registry.categories || []),
    ...(registry.learning_paths || []),
    ...(registry.topic_guides || []),
  ].filter(Boolean);
}

function recordId(record) {
  return valueOf(record, ['Registry ID', 'registry_id', 'id']);
}

function recordRole(record) {
  return valueOf(record, ['Page role', 'page_role', 'type']);
}

function recordHandle(record) {
  return valueOf(record, ['Recommended slug', 'recommended_slug', 'planned_slug']);
}

function recordTitle(record) {
  return valueOf(record, ['Final recommended H1', 'Final H1', 'Recommended title', 'Title', 'name', 'final_h1']);
}

function isLearnHome(record) {
  const role = String(recordRole(record));
  return role.includes('learn-home') || role === 'learn_home';
}

function assertUnique(items, label, normalize = (value) => value) {
  const seen = new Map();
  for (const item of items) {
    const raw = String(item ?? '');
    const key = normalize(raw);
    if (!raw) {
      fail(`${label} contains a blank value`);
      continue;
    }
    if (seen.has(key)) fail(`Duplicate ${label}: ${raw}`);
    else seen.set(key, raw);
  }
}

function parseYamlScalar(raw) {
  const value = raw.trim();
  if (value.startsWith('"') && value.endsWith('"')) {
    try {
      return JSON.parse(value);
    } catch {
      return value.slice(1, -1);
    }
  }
  if (value.startsWith("'") && value.endsWith("'")) return value.slice(1, -1).replace(/''/g, "'");
  return value;
}

function parseFrontmatter(source, file) {
  if (!source.startsWith('---\n')) {
    fail(`${file} is missing opening frontmatter delimiter`);
    return {};
  }
  const end = source.indexOf('\n---\n', 4);
  if (end === -1) {
    fail(`${file} is missing closing frontmatter delimiter`);
    return {};
  }
  const result = {};
  let currentListKey = null;
  for (const line of source.slice(4, end).split('\n')) {
    const listMatch = line.match(/^\s+-\s+(.*)$/);
    if (listMatch && currentListKey) {
      result[currentListKey].push(parseYamlScalar(listMatch[1]));
      continue;
    }
    const fieldMatch = line.match(/^([A-Za-z0-9_]+):(?:\s*(.*))?$/);
    if (!fieldMatch) {
      if (line.trim()) fail(`${file} contains unsupported frontmatter syntax: ${line}`);
      currentListKey = null;
      continue;
    }
    const [, key, rawValue = ''] = fieldMatch;
    if (!rawValue.trim()) {
      result[key] = [];
      currentListKey = key;
    } else {
      result[key] = parseYamlScalar(rawValue);
      currentListKey = null;
    }
  }
  return result;
}

function listMarkdownFiles(directory) {
  const absolute = path.join(ROOT, directory);
  if (!fs.existsSync(absolute)) {
    fail(`Missing package directory ${directory}`);
    return [];
  }
  return fs.readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
    const relative = path.posix.join(directory, entry.name);
    if (entry.isDirectory()) return listMarkdownFiles(relative);
    return entry.isFile() && entry.name.endsWith('.md') ? [relative] : [];
  });
}

function parseGlossaryPackage(source) {
  const lines = source.split(/\r?\n/);
  const start = lines.findIndex((line) => line.trim() === '## 4. Glossary term index');
  if (start === -1) {
    fail(`${GLOSSARY_PACKAGE_PATH} is missing the glossary term index`);
    return [];
  }
  let end = lines.findIndex((line, index) => index > start && /^## 5\./.test(line));
  if (end === -1) end = lines.length;
  const entries = [];
  for (let index = start + 1; index < end; index += 1) {
    const heading = lines[index].match(/^####\s+(.+?)\s*$/);
    if (!heading) continue;
    let definitionIndex = index + 1;
    while (definitionIndex < end && !lines[definitionIndex].trim()) definitionIndex += 1;
    const line = lines[definitionIndex] || '';
    const match = line.match(/^(.*?) Canonical: `([^`]+)`; handle: `([^`]+)`; URL inactive until confirmed\.$/);
    if (!match) {
      fail(`Glossary entry ${heading[1]} does not use the accepted definition mapping format`);
      continue;
    }
    entries.push({ term: heading[1], definition: match[1], canonicalId: match[2], handle: match[3] });
  }
  return entries;
}

function parseGeneratedGlossary(source) {
  return source
    .split(/\r?\n/)
    .filter((line) => line.includes(FIELD))
    .map((line) => {
      const [term = '', definition = '', canonicalId = '', handle = ''] = line.split(FIELD);
      return { term, definition, canonicalId, handle };
    });
}

function mapByTerm(entries, label) {
  const map = new Map();
  for (const entry of entries) {
    const key = entry.term.toLocaleLowerCase('en-US');
    if (map.has(key)) fail(`Duplicate ${label} term: ${entry.term}`);
    else map.set(key, entry);
  }
  return map;
}

function validateRelationshipIds(registry, validIds) {
  const relationshipKey = /(id|ids|destination|guide|category|path|route|previous|next|branch|canonical|parent|sequence|order|steps|relationship)/i;
  const idPattern = /\bMSC-(?:LRN-HOME|HUB-[A-Z]+|PATH-[A-Z]+|ROUTE-\d{3}|GLOSSARY-\d{3}|GUIDE-\d{3})\b/g;
  const visit = (value, key, location) => {
    if (typeof value === 'string') {
      if (!relationshipKey.test(String(key))) return;
      for (const id of value.match(idPattern) || []) {
        if (!validIds.has(id)) fail(`Relationship ID does not resolve at ${location}: ${id}`);
      }
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((item, index) => visit(item, key, `${location}[${index}]`));
      return;
    }
    if (value && typeof value === 'object') {
      for (const [childKey, childValue] of Object.entries(value)) {
        visit(childValue, childKey, `${location}.${childKey}`);
      }
    }
  };
  visit(registry, 'registry', 'registry');
}

function validateDeterministicGeneration() {
  const snapshots = new Map();
  for (const file of GENERATED_FILES) {
    if (!fs.existsSync(path.join(ROOT, file))) {
      fail(`Missing generated Learn data file ${file}`);
      return;
    }
    snapshots.set(file, readUtf8(file));
  }

  let result;
  try {
    result = spawnSync(process.execPath, ['scripts/generate-msc-learn-data.mjs'], {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    if (result.error) {
      fail(`Learn-data generation could not run: ${result.error.message}`);
      return;
    }
    if (result.status !== 0) {
      fail(`Learn-data generation failed during determinism check: ${(result.stderr || result.stdout || '').trim()}`);
      return;
    }
    const changed = GENERATED_FILES.filter((file) => readUtf8(file) !== snapshots.get(file));
    if (changed.length) fail(`Learn-data generation is not deterministic for committed outputs: ${changed.join(', ')}`);
  } finally {
    for (const [file, content] of snapshots) fs.writeFileSync(path.join(ROOT, file), content);
  }
}

const registry = readJson(REGISTRY_PATH);
const manifest = readJson(MANIFEST_PATH);

if (registry && manifest) {
  const records = registryRecords(registry);
  const registryIds = records.map(recordId);
  const registryHandles = records.map(recordHandle);
  assertUnique(registryIds, 'registry ID');
  assertUnique(registryHandles, 'registry handle', (value) => value.toLocaleLowerCase('en-US'));

  const byId = new Map(records.map((record) => [recordId(record), record]));
  const validIds = new Set(registryIds);
  const publishableIds = new Set(records.filter((record) => !isLearnHome(record)).map(recordId));
  validateRelationshipIds(registry, validIds);

  const entries = Array.isArray(manifest.entries) ? manifest.entries : [];
  if (!Array.isArray(manifest.entries)) fail(`${MANIFEST_PATH} entries must be an array`);
  if (entries.length !== EXPECTED_MANIFEST_COUNT) fail(`Expected ${EXPECTED_MANIFEST_COUNT} manifest entries, found ${entries.length}`);
  if (manifest.counts?.total !== EXPECTED_MANIFEST_COUNT) fail(`Manifest counts.total must be ${EXPECTED_MANIFEST_COUNT}`);

  const expectedRoleCounts = {
    'topic-guide': 80,
    'category-hub': 5,
    'learning-path': 5,
    'featured-route': 1,
    'glossary-index': 1,
  };
  for (const [role, expected] of Object.entries(expectedRoleCounts)) {
    const actual = entries.filter((entry) => entry.page_role === role).length;
    if (actual !== expected) fail(`Expected ${expected} manifest ${role} entries, found ${actual}`);
  }

  assertUnique(entries.map((entry) => entry.registry_id), 'manifest registry ID');
  assertUnique(entries.map((entry) => entry.handle), 'manifest handle', (value) => value.toLocaleLowerCase('en-US'));
  assertUnique(entries.map((entry) => entry.content_file), 'manifest package path');

  const manifestIds = new Set(entries.map((entry) => entry.registry_id));
  for (const id of publishableIds) if (!manifestIds.has(id)) fail(`Registry destination missing from manifest: ${id}`);
  for (const id of manifestIds) if (!publishableIds.has(id)) fail(`Manifest entry is not a publishable registry destination: ${id}`);

  const diskPackages = PACKAGE_DIRECTORIES.flatMap(listMarkdownFiles).sort();
  const manifestPackages = entries.map((entry) => entry.content_file).sort();
  if (diskPackages.length !== EXPECTED_MANIFEST_COUNT) fail(`Expected ${EXPECTED_MANIFEST_COUNT} Markdown packages on disk, found ${diskPackages.length}`);
  for (const file of diskPackages) if (!manifestPackages.includes(file)) fail(`Unmanifested Learn package exists: ${file}`);
  for (const file of manifestPackages) if (!diskPackages.includes(file)) fail(`Manifest package does not exist: ${file}`);

  for (const entry of entries) {
    const file = entry.content_file;
    const absolute = path.join(ROOT, file);
    if (!fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) {
      fail(`Manifest package does not exist: ${file}`);
      continue;
    }
    const source = readUtf8(file);
    const frontmatter = parseFrontmatter(source, file);
    const expectedFrontmatter = {
      registry_id: entry.registry_id,
      status: entry.status,
      page_role: entry.page_role,
      h1: entry.title,
      handle: entry.handle,
      category: entry.category,
      subcategory: entry.subcategory,
    };
    for (const [key, expected] of Object.entries(expectedFrontmatter)) {
      if (String(frontmatter[key] ?? '') !== String(expected ?? '')) {
        fail(`${file} frontmatter ${key} does not match manifest: expected ${JSON.stringify(expected)}, found ${JSON.stringify(frontmatter[key] ?? '')}`);
      }
    }
    if (entry.status !== 'COPY_LOCKED') fail(`Manifest entry ${entry.registry_id} is not COPY_LOCKED`);
    if (frontmatter.status !== 'COPY_LOCKED') fail(`${file} frontmatter status is not COPY_LOCKED`);

    const registryRecord = byId.get(entry.registry_id);
    if (!registryRecord) {
      fail(`Manifest registry ID does not resolve: ${entry.registry_id}`);
      continue;
    }
    const registryIdentity = {
      registry_id: recordId(registryRecord),
      page_role: recordRole(registryRecord),
      h1: recordTitle(registryRecord),
      handle: recordHandle(registryRecord),
    };
    for (const [key, expected] of Object.entries(registryIdentity)) {
      if (String(frontmatter[key] ?? '') !== String(expected ?? '')) {
        fail(`${file} frontmatter ${key} does not match registry: expected ${JSON.stringify(expected)}, found ${JSON.stringify(frontmatter[key] ?? '')}`);
      }
    }
    const bodyH1 = source.slice(source.indexOf('\n---\n') + 5).match(/^#\s+(.+)$/m)?.[1] || '';
    if (bodyH1 !== frontmatter.h1) fail(`${file} body H1 does not match frontmatter h1`);
  }

  const glossaryRecord = records.find((record) => {
    const role = String(recordRole(record));
    return role.includes('glossary-index') || role === 'glossary_index';
  });
  const registryGlossary = asArray(valueOf(glossaryRecord, ['Initial glossary term map'], registry.glossary || [])).map((term) => ({
    term: String(valueOf(term, ['term'])),
    definition: String(valueOf(term, ['concise definition', 'definition'])),
    canonicalId: String(valueOf(term, ['canonical guide', 'canonical_guide_id', 'Canonical guide', 'canonical destination', 'canonical_destination_id'])).split('|')[0].trim(),
  }));
  const packageGlossary = parseGlossaryPackage(readUtf8(GLOSSARY_PACKAGE_PATH));
  const generatedGlossary = parseGeneratedGlossary(readUtf8(GENERATED_GLOSSARY_PATH));

  for (const [label, glossary] of [
    ['registry glossary', registryGlossary],
    ['accepted glossary package', packageGlossary],
    ['generated glossary data', generatedGlossary],
  ]) {
    if (glossary.length !== EXPECTED_GLOSSARY_COUNT) fail(`Expected ${EXPECTED_GLOSSARY_COUNT} ${label} terms, found ${glossary.length}`);
    assertUnique(glossary.map((entry) => entry.term), `${label} term`, (value) => value.toLocaleLowerCase('en-US'));
  }

  const registryGlossaryByTerm = mapByTerm(registryGlossary, 'registry glossary');
  const packageGlossaryByTerm = mapByTerm(packageGlossary, 'accepted glossary package');
  const generatedGlossaryByTerm = mapByTerm(generatedGlossary, 'generated glossary data');
  for (const [key, packageEntry] of packageGlossaryByTerm) {
    const registryEntry = registryGlossaryByTerm.get(key);
    const generatedEntry = generatedGlossaryByTerm.get(key);
    if (!registryEntry) fail(`Accepted glossary term is missing from registry: ${packageEntry.term}`);
    if (!generatedEntry) fail(`Accepted glossary term is missing from generated data: ${packageEntry.term}`);
    if (registryEntry && registryEntry.definition !== packageEntry.definition) fail(`Registry glossary definition does not match accepted package for ${packageEntry.term}`);
    if (generatedEntry && generatedEntry.definition !== packageEntry.definition) fail(`Generated glossary definition does not match accepted package for ${packageEntry.term}`);
    if (generatedEntry && generatedEntry.canonicalId !== packageEntry.canonicalId) fail(`Generated glossary canonical ID does not match accepted package for ${packageEntry.term}`);
    if (generatedEntry && generatedEntry.handle !== packageEntry.handle) fail(`Generated glossary handle does not match accepted package for ${packageEntry.term}`);
    if (!validIds.has(packageEntry.canonicalId)) fail(`Glossary canonical ID does not resolve for ${packageEntry.term}: ${packageEntry.canonicalId}`);
  }

  if (!failures.length) validateDeterministicGeneration();
}

if (failures.length) {
  console.error(failures.map((message) => `- ${message}`).join('\n'));
  process.exit(1);
}

console.log('MSC Learn library validation passed: 92 manifest packages, 92 COPY_LOCKED packages, 141 unique glossary terms, resolved relationships, synchronized glossary data, and deterministic generation.');
