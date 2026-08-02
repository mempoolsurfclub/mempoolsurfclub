import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const SOURCE = 'docs/learn/content/routes/MSC-GLOSSARY-001-bitcoin-glossary.md';
const REGISTRY = 'docs/learn/MSC_Learn_Master_Registry.json';
const MANIFEST = 'docs/learn/content/content-manifest.json';
const PLANNING_DATA = 'snippets/msc-learn-glossary-data.liquid';
const JSON_OUT = 'docs/learn/runtime/MSC-GLOSSARY-001.json';
const LIQUID_OUT = 'snippets/msc-learn-glossary-runtime.liquid';
const SECTION = 'sections/msc-learn-glossary.liquid';
const TEMPLATE = 'templates/page.msc-learn-glossary.json';
const EXPECTED_ID = 'MSC-GLOSSARY-001';
const ROOT_ID = 'MSC-LRN-HOME';
const ROUTE_ID = 'MSC-ROUTE-001';
const CATEGORY_IDS = ['MSC-HUB-BASICS', 'MSC-HUB-NETWORK', 'MSC-HUB-BUILDING', 'MSC-HUB-DEVELOPMENT', 'MSC-HUB-ECOSYSTEM'];
const PATH_IDS = ['MSC-PATH-START', 'MSC-PATH-SAFE', 'MSC-PATH-NETWORK', 'MSC-PATH-BUILD', 'MSC-PATH-ECOSYSTEM'];
const EXPECTED_COUNTS = { a: 6, b: 23, c: 12, d: 8, e: 4, f: 3, g: 1, h: 6, i: 7, l: 2, m: 10, n: 3, o: 8, p: 11, r: 6, s: 16, t: 7, u: 1, v: 3, w: 4 };
const EXPECTED_LETTERS = Object.keys(EXPECTED_COUNTS);
const CHECK = process.argv.includes('--check');

const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');
const normalize = (value) => String(value ?? '').replace(/\r\n/g, '\n').trim();
const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');
const escapeHtml = (value) => String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const keyOf = (value) => String(value).toLowerCase();

function parseScalar(value) {
  const text = value.trim();
  if (text.startsWith('"') && text.endsWith('"')) {
    try { return JSON.parse(text); } catch { return text.slice(1, -1); }
  }
  if (text.startsWith("'") && text.endsWith("'")) return text.slice(1, -1).replace(/''/g, "'");
  return text;
}

function parseFrontmatter(source) {
  if (!source.startsWith('---\n')) throw new Error('Glossary source is missing frontmatter');
  const end = source.indexOf('\n---\n', 4);
  if (end === -1) throw new Error('Glossary source is missing the closing frontmatter delimiter');
  const data = {};
  for (const line of source.slice(4, end).split('\n')) {
    const field = line.match(/^([A-Za-z0-9_]+):(?:\s*(.*))?$/);
    if (!field) {
      if (line.trim()) throw new Error(`Unsupported frontmatter line: ${line}`);
      continue;
    }
    data[field[1]] = parseScalar(field[2] || '');
  }
  return { data, body: source.slice(end + 5) };
}

function parseNumberedSections(body) {
  const matches = [...body.matchAll(/^##\s+(\d+)\.\s+(.+)$/gm)];
  const sections = new Map();
  matches.forEach((match, index) => {
    const start = match.index + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index : body.length;
    sections.set(Number(match[1]), { title: match[2].trim(), body: normalize(body.slice(start, end)) });
  });
  return sections;
}

function inlineMarkdown(value) {
  return escapeHtml(value).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

function markdownBlocks(markdown) {
  const output = [];
  let paragraph = [];
  let list = null;
  const flushParagraph = () => {
    if (paragraph.length) output.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`);
    paragraph = [];
  };
  const flushList = () => {
    if (list) output.push(`<${list.type}>${list.items.map((item) => `<li>${inlineMarkdown(item)}</li>`).join('')}</${list.type}>`);
    list = null;
  };
  for (const line of normalize(markdown).split('\n')) {
    const ordered = line.match(/^\d+\.\s+(.+)$/);
    const unordered = line.match(/^-\s+(.+)$/);
    if (!line.trim()) {
      flushParagraph();
      flushList();
    } else if (ordered || unordered) {
      flushParagraph();
      const type = ordered ? 'ol' : 'ul';
      if (!list || list.type !== type) flushList();
      if (!list) list = { type, items: [] };
      list.items.push((ordered || unordered)[1]);
    } else {
      flushList();
      paragraph.push(line.trim());
    }
  }
  flushParagraph();
  flushList();
  return output.join('\n');
}

function parseDeclaredCounts(markdown) {
  const counts = {};
  for (const line of normalize(markdown).split('\n')) {
    const match = line.match(/^-\s+`([a-z])`:\s+(\d+)$/);
    if (match) counts[match[1]] = Number(match[2]);
  }
  return counts;
}

function valueOf(object, names, fallback = '') {
  for (const name of names) if (object?.[name] !== undefined && object?.[name] !== null) return object[name];
  return fallback;
}
const recordId = (record) => valueOf(record, ['Registry ID', 'registry_id', 'id']);
const recordTitle = (record) => valueOf(record, ['Final recommended H1', 'Final H1', 'Display label', 'Title', 'name']);
const recordHandle = (record) => valueOf(record, ['Recommended slug', 'handle']);

function inactive(id, byId) {
  const record = byId.get(id);
  if (!record) throw new Error(`Relationship destination ${id} is missing from the registry`);
  return { registry_id: id, title: recordTitle(record), planning_handle: recordHandle(record) || null, active: false, url: null };
}

function parseGlossaryGroups(markdown, byId) {
  const letterMatches = [...markdown.matchAll(/^###\s+([A-Z])$/gm)];
  if (!letterMatches.length) throw new Error('Glossary term groups are missing');
  return letterMatches.map((letterMatch, groupIndex) => {
    const letter = letterMatch[1].toLowerCase();
    const groupStart = letterMatch.index + letterMatch[0].length;
    const groupEnd = groupIndex + 1 < letterMatches.length ? letterMatches[groupIndex + 1].index : markdown.length;
    const groupBody = markdown.slice(groupStart, groupEnd);
    const termMatches = [...groupBody.matchAll(/^####\s+(.+)$/gm)];
    const terms = termMatches.map((termMatch, termIndex) => {
      const start = termMatch.index + termMatch[0].length;
      const end = termIndex + 1 < termMatches.length ? termMatches[termIndex + 1].index : groupBody.length;
      const body = normalize(groupBody.slice(start, end)).replace(/\s+/g, ' ');
      const detail = body.match(/^(.+?)\s+Canonical:\s+`(MSC-[A-Z0-9-]+)`;\s+handle:\s+`([^`]+)`;\s+URL inactive until confirmed\.$/);
      if (!detail) throw new Error(`Invalid glossary entry for ${termMatch[1].trim()}`);
      const preferredTerm = termMatch[1].trim();
      const destinationId = detail[2];
      const destination = byId.get(destinationId);
      if (!destination) throw new Error(`Canonical destination ${destinationId} for ${preferredTerm} is missing from the registry`);
      const planningHandle = detail[3];
      if (recordHandle(destination) !== planningHandle) throw new Error(`Canonical handle mismatch for ${preferredTerm}: ${planningHandle}`);
      return {
        preferred_term: preferredTerm,
        definition: detail[1],
        canonical_destination_registry_id: destinationId,
        canonical_destination_title: recordTitle(destination),
        canonical_planning_handle: planningHandle,
        ownership: {
          page_role: valueOf(destination, ['Page role']),
          primary_category: valueOf(destination, ['Primary Learn category', 'Parent category']),
          subcategory: valueOf(destination, ['Learn subcategory']),
        },
        active: false,
        url: null,
      };
    });
    return { letter, term_count: terms.length, terms };
  });
}

function parsePlanningRows(markdown) {
  return normalize(markdown).split('\n').filter((line) => line.includes('[[MSC_FIELD]]')).map((line) => {
    const parts = line.split('[[MSC_FIELD]]');
    if (parts.length !== 4) throw new Error(`Invalid generated glossary planning row: ${line}`);
    return { preferred_term: parts[0], definition: parts[1], canonical_destination_registry_id: parts[2], canonical_planning_handle: parts[3] };
  });
}

function parseKeyTerms(markdown) {
  return normalize(markdown).split('\n').filter(Boolean).map((line) => {
    const match = line.match(/^-\s+\*\*(.+?):\*\*\s+(.+)$/);
    if (!match) throw new Error(`Invalid glossary Key Term: ${line}`);
    return { term: match[1], definition: match[2] };
  });
}

function fieldKey(value) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

function parseSources(markdown) {
  const matches = [...markdown.matchAll(/^\d+\.\s+\*\*(.+?)\*\*$/gm)];
  return matches.map((match, index) => {
    const start = match.index + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index : markdown.length;
    const fields = {};
    for (const line of normalize(markdown.slice(start, end)).split('\n')) {
      const field = line.match(/^\s+([^:]+):\s*(.*)$/);
      if (field) fields[fieldKey(field[1])] = field[2].trim();
    }
    return { title: match[1].trim(), ...fields };
  });
}

function parseChecklist(markdown) {
  return normalize(markdown).split('\n').filter(Boolean).map((line) => {
    const match = line.match(/^-\s+\[([ xX])\]\s+(.+)$/);
    if (!match) throw new Error(`Invalid accuracy checklist item: ${line}`);
    return { checked: match[1].toLowerCase() === 'x', statement: match[2] };
  });
}

function parseHuman(markdown) {
  const notesPart = markdown.split(/^- Notes:\s*$/m)[1] || '';
  return {
    reviewer: markdown.match(/^- Reviewer:\s*(.+)$/m)?.[1]?.trim() || null,
    review_date: markdown.match(/^- Review date:\s*(.+)$/m)?.[1]?.trim() || null,
    notes: normalize(notesPart).split('\n').map((line) => line.match(/^\s*-\s+(.+)$/)?.[1]).filter(Boolean),
  };
}

function parseIllustrations(markdown) {
  const matches = [...markdown.matchAll(/^###\s+(Illustration\s+\d+)$/gm)];
  return matches.map((match, index) => {
    const start = match.index + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index : markdown.length;
    const fields = {};
    for (const line of normalize(markdown.slice(start, end)).split('\n')) {
      const field = line.match(/^-\s+([^:]+):\s*(.*)$/);
      if (field) fields[fieldKey(field[1])] = field[2].trim();
    }
    return { heading: match[1], ...fields };
  });
}

function buildData() {
  const sourceText = read(SOURCE).replace(/\r\n/g, '\n');
  const registryText = read(REGISTRY);
  const manifestText = read(MANIFEST);
  const planningText = read(PLANNING_DATA);
  const registry = JSON.parse(registryText);
  const manifest = JSON.parse(manifestText);
  const records = Array.isArray(registry.records) ? registry.records : [];
  const byId = new Map(records.map((record) => [recordId(record), record]));
  const { data: frontmatter, body } = parseFrontmatter(sourceText);
  const sections = parseNumberedSections(body);

  if (frontmatter.registry_id !== EXPECTED_ID || frontmatter.status !== 'COPY_LOCKED' || frontmatter.page_role !== 'glossary-index') throw new Error('Glossary source identity or status mismatch');
  if (body.match(/^#\s+(.+)$/m)?.[1]?.trim() !== frontmatter.h1) throw new Error('Frontmatter and Markdown H1 disagree');
  if (sections.size !== 14) throw new Error(`Expected 14 numbered glossary sections, found ${sections.size}`);

  const manifestMatches = (manifest.entries || []).filter((entry) => entry.registry_id === EXPECTED_ID);
  if (manifestMatches.length !== 1) throw new Error(`Expected one manifest record for ${EXPECTED_ID}, found ${manifestMatches.length}`);
  const manifestRecord = manifestMatches[0];
  if (manifestRecord.content_file !== SOURCE || manifestRecord.status !== 'COPY_LOCKED' || manifestRecord.page_role !== 'glossary-index') throw new Error('Manifest record does not resolve to the accepted glossary package');

  const currentRecord = byId.get(EXPECTED_ID);
  if (!currentRecord || recordTitle(currentRecord) !== frontmatter.h1 || valueOf(currentRecord, ['Page role']) !== 'page-role:glossary-index') throw new Error('Master registry glossary record mismatch');

  const declaredCounts = parseDeclaredCounts(sections.get(3).body);
  if (JSON.stringify(declaredCounts) !== JSON.stringify(EXPECTED_COUNTS)) throw new Error('Declared populated-letter counts do not match the approved structure');

  const letter_groups = parseGlossaryGroups(sections.get(4).body, byId);
  const terms = letter_groups.flatMap((group) => group.terms);
  const actualCounts = Object.fromEntries(letter_groups.map((group) => [group.letter, group.terms.length]));
  if (JSON.stringify(letter_groups.map((group) => group.letter)) !== JSON.stringify(EXPECTED_LETTERS)) throw new Error('Populated-letter sequence mismatch');
  if (JSON.stringify(actualCounts) !== JSON.stringify(EXPECTED_COUNTS)) throw new Error('Actual glossary letter counts do not match the approved counts');
  if (letter_groups.some((group) => group.terms.length === 0)) throw new Error('Empty letter groups are not permitted');
  if (terms.length !== 141) throw new Error(`Expected 141 preferred terms, found ${terms.length}`);
  const keys = terms.map((term) => keyOf(term.preferred_term));
  if (new Set(keys).size !== keys.length) throw new Error('Duplicate preferred glossary terms found');
  const sorted = [...terms].sort((a, b) => keyOf(a.preferred_term) < keyOf(b.preferred_term) ? -1 : keyOf(a.preferred_term) > keyOf(b.preferred_term) ? 1 : 0);
  if (JSON.stringify(terms.map((term) => term.preferred_term)) !== JSON.stringify(sorted.map((term) => term.preferred_term))) throw new Error('Glossary terms are not in exact case-insensitive alphabetical order');

  const planningRows = parsePlanningRows(planningText);
  if (planningRows.length !== 141) throw new Error(`Expected 141 generated glossary planning rows, found ${planningRows.length}`);
  for (let index = 0; index < terms.length; index += 1) {
    const accepted = terms[index];
    const planned = planningRows[index];
    for (const field of ['preferred_term', 'definition', 'canonical_destination_registry_id', 'canonical_planning_handle']) {
      if (accepted[field] !== planned[field]) throw new Error(`Accepted glossary and generated planning data disagree at term ${index + 1}: ${field}`);
    }
  }

  const guideIds = records.map(recordId).filter((id) => /^MSC-GUIDE-\d+$/.test(id)).sort((a, b) => Number(a.split('-').pop()) - Number(b.split('-').pop()));
  if (guideIds.length !== 80) throw new Error(`Expected 80 guide registry records, found ${guideIds.length}`);
  const plannedIds = [...guideIds, ...CATEGORY_IDS, ROUTE_ID, ROOT_ID, ...PATH_IDS];
  const planned = plannedIds.map((id) => inactive(id, byId));

  return {
    schema_version: 1,
    source: {
      file: SOURCE,
      sha256: sha256(sourceText),
      registry_file: REGISTRY,
      registry_sha256: sha256(registryText),
      manifest_file: MANIFEST,
      manifest_sha256: sha256(manifestText),
      planning_data_file: PLANNING_DATA,
      planning_data_sha256: sha256(planningText),
      manifest_record: { registry_id: manifestRecord.registry_id, content_file: manifestRecord.content_file, page_role: manifestRecord.page_role, status: manifestRecord.status },
      registry_record: {
        registry_id: recordId(currentRecord),
        h1: recordTitle(currentRecord),
        page_role: valueOf(currentRecord, ['Page role']),
        status: valueOf(currentRecord, ['Status']),
        parent_destination: valueOf(currentRecord, ['Parent destination']),
        primary_learning_path: valueOf(currentRecord, ['Primary learning path']),
        secondary_learning_paths: valueOf(currentRecord, ['Secondary learning paths'], []),
      },
    },
    registry_id: frontmatter.registry_id,
    status: frontmatter.status,
    page_role: frontmatter.page_role,
    h1: frontmatter.h1,
    introductory_deck: sections.get(1).body,
    orientation: { markdown: sections.get(2).body, html: markdownBlocks(sections.get(2).body) },
    populated_letter_sequence: EXPECTED_LETTERS,
    populated_letter_counts: EXPECTED_COUNTS,
    letter_groups,
    total_terms: terms.length,
    key_terms: parseKeyTerms(sections.get(5).body),
    sources: parseSources(sections.get(6).body),
    seo_title: sections.get(7).body,
    meta_description: sections.get(8).body,
    excerpt: sections.get(9).body,
    reading_time: sections.get(10).body,
    relationships: {
      parent: inactive(ROOT_ID, byId),
      return_destination: inactive(ROOT_ID, byId),
      previous: inactive(ROUTE_ID, byId),
      next: inactive(ROOT_ID, byId),
      recommended_branch: inactive('MSC-GUIDE-001', byId),
      categories: CATEGORY_IDS.map((id) => inactive(id, byId)),
      learning_paths: PATH_IDS.map((id) => inactive(id, byId)),
      featured_route: inactive(ROUTE_ID, byId),
      planned,
    },
    review: {
      reviewed_date: frontmatter.reviewed_date,
      copy_locked_date: frontmatter.copy_locked_date,
      human_verification: parseHuman(sections.get(13).body),
      accuracy_checklist: parseChecklist(sections.get(12).body),
    },
    illustration_briefs: parseIllustrations(sections.get(14).body),
    publication: { state: 'PREVIEW_ONLY', public_url: null, shopify_page_id: null, links_active: false },
    synchronization: {
      accepted_terms: terms.map((term) => ({ preferred_term: term.preferred_term, definition: term.definition, canonical_destination_registry_id: term.canonical_destination_registry_id, canonical_planning_handle: term.canonical_planning_handle })),
      planning_rows: planningRows,
    },
  };
}

function buildSnippet(data) {
  const letterIndex = data.letter_groups.map((group) => `<span class="msc-learn-glossary-letter" data-msc-letter="${group.letter}" aria-disabled="true">${group.letter.toUpperCase()} <small>${group.term_count}</small></span>`).join('');
  const groups = data.letter_groups.map((group) => {
    const terms = group.terms.map((term) => `<article class="msc-learn-glossary-term msc-glass-card" data-msc-term="${escapeHtml(term.preferred_term)}" aria-disabled="true"><h3>${escapeHtml(term.preferred_term)}</h3><p>${escapeHtml(term.definition)}</p><dl><div><dt>Canonical destination</dt><dd><code>${escapeHtml(term.canonical_destination_registry_id)}</code> ${escapeHtml(term.canonical_destination_title)}</dd></div><div><dt>Planning handle</dt><dd><code>${escapeHtml(term.canonical_planning_handle)}</code></dd></div><div><dt>Ownership</dt><dd>${escapeHtml(term.ownership.page_role)} · ${escapeHtml(term.ownership.primary_category)}${term.ownership.subcategory ? ` · ${escapeHtml(term.ownership.subcategory)}` : ''}</dd></div></dl><p class="msc-learn-preview-note">Destination inactive until publication and URL confirmation.</p></article>`).join('\n');
    return `<section class="msc-learn-glossary-group" data-msc-letter-group="${group.letter}"><h2>${group.letter.toUpperCase()}</h2><div class="msc-learn-card-grid">${terms}</div></section>`;
  }).join('\n');
  const keyTerms = data.key_terms.map((item) => `<div class="msc-learn-term"><dt>${escapeHtml(item.term)}</dt><dd>${escapeHtml(item.definition)}</dd></div>`).join('\n');
  const sources = data.sources.map((source) => {
    const details = Object.entries(source).filter(([key]) => key !== 'title').map(([key, value]) => `<li><strong>${escapeHtml(key.replace(/_/g, ' '))}:</strong> ${(key === 'url' || key.startsWith('repository_path')) ? `<code>${escapeHtml(value)}</code>` : escapeHtml(value)}</li>`).join('');
    return `<article class="msc-learn-source"><h3>${escapeHtml(source.title)}</h3><ul>${details}</ul></article>`;
  }).join('\n');
  const navItems = [
    ['Parent', data.relationships.parent],
    ['Return', data.relationships.return_destination],
    ['Previous', data.relationships.previous],
    ['Next', data.relationships.next],
    ['Recommended start', data.relationships.recommended_branch],
    ...data.relationships.categories.map((item) => ['Category', item]),
    ...data.relationships.learning_paths.map((item) => ['Learning path', item]),
    ['Featured route', data.relationships.featured_route],
  ].map(([label, item]) => `<span class="msc-learn-prev-next__item" aria-disabled="true"><span>${escapeHtml(label)}</span><strong>${escapeHtml(item.title)}</strong><small><code>${escapeHtml(item.registry_id)}</code> · inactive</small></span>`).join('');

  return `{% comment %}\n  Generated from ${SOURCE}.\n  Registry binding: ${data.registry_id}.\n  Preview only. Do not edit manually.\n  Rebuild with npm run build:learn-glossary-pilot.\n{% endcomment %}\n<section class="msc-shell msc-learn-page" data-msc-registry-id="${data.registry_id}" data-msc-preview-only="true">\n  <div class="msc-container msc-learn-page__container">\n    <nav class="msc-learn-breadcrumbs" aria-label="Learn breadcrumbs"><ol><li><span>Learn</span></li><li aria-current="page"><span>${escapeHtml(data.h1)}</span></li></ol></nav>\n    <header class="msc-learn-page__header"><p class="msc-section-kicker">Glossary</p><h1>${escapeHtml(data.h1)}</h1><p class="msc-learn-page__deck">${escapeHtml(data.introductory_deck)}</p><ul class="msc-learn-page-meta"><li>${data.letter_groups.length} populated letters</li><li>${data.total_terms} preferred terms</li><li>${escapeHtml(data.reading_time)}</li><li>Reviewed ${escapeHtml(data.review.reviewed_date)}</li></ul><p class="msc-learn-preview-note">Preview only. Letter navigation, search, filtering, term destinations, and return actions remain inactive.</p></header>\n    <article class="msc-learn-article rte" data-msc-content-source="structured-runtime"><section class="msc-learn-article__section">${data.orientation.html}</section></article>\n    <div class="msc-learn-glossary-letters" aria-label="Populated glossary letters preview">${letterIndex}</div>\n    <div class="msc-learn-glossary-groups">${groups}</div>\n    <section class="msc-learn-key-terms"><h2>Key Terms</h2><dl>${keyTerms}</dl></section>\n    <section class="msc-learn-sources"><h2>Sources</h2>${sources}</section>\n    <nav class="msc-learn-prev-next" aria-label="Glossary relationship preview">${navItems}</nav>\n  </div>\n</section>\n`;
}

function assertInactive(value, location = 'runtime') {
  if (Array.isArray(value)) return value.forEach((item, index) => assertInactive(item, `${location}[${index}]`));
  if (!value || typeof value !== 'object') return;
  if (Object.prototype.hasOwnProperty.call(value, 'active') && value.active !== false) throw new Error(`${location}.active must be false`);
  if (Object.prototype.hasOwnProperty.call(value, 'url') && value.url !== null) throw new Error(`${location}.url must be null`);
  for (const [key, child] of Object.entries(value)) assertInactive(child, `${location}.${key}`);
}

function validate(data, jsonText, snippet) {
  const required = ['source', 'registry_id', 'status', 'page_role', 'h1', 'introductory_deck', 'orientation', 'populated_letter_sequence', 'populated_letter_counts', 'letter_groups', 'total_terms', 'key_terms', 'sources', 'seo_title', 'meta_description', 'excerpt', 'reading_time', 'relationships', 'review', 'illustration_briefs', 'publication'];
  for (const field of required) if (data[field] === undefined || data[field] === null || data[field] === '') throw new Error(`Missing required runtime field ${field}`);
  if (data.registry_id !== EXPECTED_ID || data.status !== 'COPY_LOCKED' || data.page_role !== 'glossary-index') throw new Error('Glossary identity or status mismatch');
  if (data.total_terms !== 141 || data.letter_groups.length !== 20) throw new Error('Glossary term or populated-letter count mismatch');
  if (JSON.stringify(data.populated_letter_sequence) !== JSON.stringify(EXPECTED_LETTERS) || JSON.stringify(data.populated_letter_counts) !== JSON.stringify(EXPECTED_COUNTS)) throw new Error('Glossary populated-letter synchronization mismatch');
  if (data.letter_groups.some((group) => !group.terms.length || group.term_count !== EXPECTED_COUNTS[group.letter])) throw new Error('Empty or incorrectly counted glossary group');
  if (data.key_terms.length !== 8) throw new Error(`Expected 8 glossary Key Terms, found ${data.key_terms.length}`);
  if (data.sources.length !== 10) throw new Error(`Expected 10 glossary Sources, found ${data.sources.length}`);
  if (data.illustration_briefs.length !== 3) throw new Error('Expected exactly three illustration briefs');
  if (!data.review.human_verification.reviewer || !data.review.human_verification.review_date || !data.review.human_verification.notes.length) throw new Error('Human Verification record is incomplete');
  if (data.publication.state !== 'PREVIEW_ONLY' || data.publication.public_url !== null || data.publication.shopify_page_id !== null || data.publication.links_active !== false) throw new Error('Publication state must remain preview-only');
  assertInactive(data.letter_groups, 'letter_groups');
  assertInactive(data.relationships, 'relationships');

  const section = read(SECTION);
  const templateText = read(TEMPLATE);
  const template = JSON.parse(templateText);
  if (!section.includes('section.settings.registry_id') || !section.includes("when 'MSC-GLOSSARY-001'")) throw new Error('Glossary section is not registry-bound');
  if (/page\.handle|page\.content/.test(section)) throw new Error('Glossary section may not use page.handle or page.content');
  if (template?.sections?.main?.settings?.registry_id !== EXPECTED_ID) throw new Error('Glossary template registry binding mismatch');
  if (/<a\b|\bhref\s*=|page\.content|page\.handle/i.test(snippet)) throw new Error('Generated glossary output activates a link or uses Shopify page content/handle');
  if (/<(?:button|input|select|form)\b|role=["']search["']|onclick\s*=|<img\b|<picture\b|<figure\b|illustration[- ]placeholder/i.test(snippet)) throw new Error('Generated glossary output includes an active control or illustration output');
  if (!snippet.includes('141 preferred terms') || !snippet.includes('20 populated letters')) throw new Error('Generated glossary counts are missing');
  for (const letter of EXPECTED_LETTERS) if (!snippet.includes(`data-msc-letter-group="${letter}"`)) throw new Error(`Generated glossary is missing letter group ${letter}`);

  if (CHECK) {
    if (!fs.existsSync(path.join(ROOT, JSON_OUT)) || !fs.existsSync(path.join(ROOT, LIQUID_OUT))) throw new Error('Generated glossary runtime outputs are missing');
    if (read(JSON_OUT) !== jsonText) throw new Error(`${JSON_OUT} is not synchronized with its sources`);
    if (read(LIQUID_OUT) !== snippet) throw new Error(`${LIQUID_OUT} is not synchronized with its sources`);
  }
}

const data = buildData();
const jsonText = `${JSON.stringify(data, null, 2)}\n`;
const snippet = buildSnippet(data);
validate(data, jsonText, snippet);

if (CHECK) {
  console.log(`Validated ${EXPECTED_ID}: ${data.letter_groups.length} populated letters, ${data.total_terms} preferred terms, preview-only runtime.`);
} else {
  fs.mkdirSync(path.dirname(path.join(ROOT, JSON_OUT)), { recursive: true });
  fs.writeFileSync(path.join(ROOT, JSON_OUT), jsonText);
  fs.writeFileSync(path.join(ROOT, LIQUID_OUT), snippet);
  console.log(`Generated ${JSON_OUT} and ${LIQUID_OUT}.`);
}
