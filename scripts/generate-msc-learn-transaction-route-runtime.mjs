import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const SOURCE = 'docs/learn/content/routes/MSC-ROUTE-001-how-a-bitcoin-transaction-moves.md';
const REGISTRY = 'docs/learn/MSC_Learn_Master_Registry.json';
const MANIFEST = 'docs/learn/content/content-manifest.json';
const JSON_OUT = 'docs/learn/runtime/MSC-ROUTE-001.json';
const LIQUID_OUT = 'snippets/msc-learn-transaction-route-runtime.liquid';
const SECTION = 'sections/msc-learn-route.liquid';
const TEMPLATE = 'templates/page.msc-learn-route.json';
const EXPECTED_ID = 'MSC-ROUTE-001';
const EXPECTED_HEADINGS = [
  'A wallet selects spendable outputs',
  'The wallet creates signatures',
  'The transaction receives local checks',
  'Peers relay the transaction',
  'Nodes may place it in local mempools',
  'A miner or pool may select it',
  'The transaction enters a candidate block',
  'Miners perform proof of work',
  'Nodes independently validate the block',
  'Valid candidate chains are compared by accumulated work',
  'The transaction receives confirmations',
  'The transaction updates the UTXO set',
];
const CHECK = process.argv.includes('--check');

const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');
const normalize = (value) => String(value ?? '').replace(/\r\n/g, '\n').trim();
const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');
const escapeHtml = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

function parseScalar(value) {
  const text = value.trim();
  if (text.startsWith('"') && text.endsWith('"')) {
    try { return JSON.parse(text); } catch { return text.slice(1, -1); }
  }
  if (text.startsWith("'") && text.endsWith("'")) return text.slice(1, -1).replace(/''/g, "'");
  return text;
}

function parseFrontmatter(source) {
  if (!source.startsWith('---\n')) throw new Error('Route source is missing frontmatter');
  const end = source.indexOf('\n---\n', 4);
  if (end === -1) throw new Error('Route source is missing closing frontmatter delimiter');
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
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

function markdownBlocks(markdown) {
  const lines = normalize(markdown).split('\n');
  const output = [];
  let paragraph = [];
  let list = null;
  const flushParagraph = () => {
    if (paragraph.length) {
      output.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`);
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list) {
      output.push(`<${list.type}>${list.items.map((item) => `<li>${inlineMarkdown(item)}</li>`).join('')}</${list.type}>`);
      list = null;
    }
  };
  for (const line of lines) {
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

function parseLifecycle(markdown) {
  const matches = [...markdown.matchAll(/^###\s+(\d+)\.\s+(.+)$/gm)];
  if (!matches.length) throw new Error('Route lifecycle sections are missing');
  const intro = normalize(markdown.slice(0, matches[0].index));
  const steps = matches.map((match, index) => {
    const start = match.index + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index : markdown.length;
    const explanatory = normalize(markdown.slice(start, end));
    return {
      step_number: Number(match[1]),
      heading: match[2].trim(),
      explanatory_markdown: explanatory,
      explanatory_html: markdownBlocks(explanatory),
      active: false,
      url: null,
    };
  });
  return {
    intro_markdown: intro,
    intro_html: markdownBlocks(intro),
    steps,
  };
}

function parseRouteStates(markdown) {
  return normalize(markdown).split('\n').map((line) => line.match(/^\d+\.\s+(.+)$/)?.[1]).filter(Boolean);
}

function fieldKey(value) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

function parseCompanions(markdown) {
  const matches = [...markdown.matchAll(/^###\s+(MSC-GUIDE-\d+)\s+\|\s+(.+)$/gm)];
  return matches.map((match, index) => {
    const start = match.index + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index : markdown.length;
    const fields = {};
    for (const line of normalize(markdown.slice(start, end)).split('\n')) {
      const field = line.match(/^-\s+([^:]+):\s*(.*)$/);
      if (field) fields[fieldKey(field[1])] = field[2].trim();
    }
    return {
      registry_id: match[1],
      title: match[2].trim(),
      companion_role: fields.companion_role,
      editorial_status: fields.editorial_status,
      planned_action: fields.planned_action,
      planning_url_note: fields.url,
      active: false,
      url: null,
    };
  });
}

function parseKeyTerms(markdown) {
  return normalize(markdown).split('\n').filter(Boolean).map((line) => {
    const match = line.match(/^-\s+\*\*(.+?):\*\*\s+(.+)$/);
    if (!match) throw new Error(`Invalid key term: ${line}`);
    return { term: match[1], definition: match[2] };
  });
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

function parseRefs(markdown) {
  return normalize(markdown).split('\n').filter((line) => /^-\s+MSC-/.test(line)).map((line) => {
    const [registry_id, title] = line.replace(/^-\s+/, '').split('|').map((part) => part.trim());
    return { registry_id, title, active: false, url: null };
  });
}

function parseChecklist(markdown) {
  return normalize(markdown).split('\n').filter(Boolean).map((line) => {
    const match = line.match(/^-\s+\[([ xX])\]\s+(.+)$/);
    if (!match) throw new Error(`Invalid checklist item: ${line}`);
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

const valueOf = (object, names, fallback = '') => {
  for (const name of names) if (object?.[name] !== undefined && object?.[name] !== null) return object[name];
  return fallback;
};
const recordId = (record) => valueOf(record, ['Registry ID', 'registry_id', 'id']);
const recordTitle = (record) => valueOf(record, ['Final recommended H1', 'Final H1', 'Display label', 'Title', 'name']);
const refId = (input) => String(input || '').split('|')[0].trim();

function inactiveFromRef(input, byId) {
  const id = refId(input);
  if (!id || !byId.has(id)) throw new Error(`Relationship destination ${id || '(empty)'} is missing from the registry`);
  return { registry_id: id, title: recordTitle(byId.get(id)), active: false, url: null };
}

function inactiveFromTitle(title, records) {
  const target = records.find((record) => recordTitle(record) === title);
  if (!target) throw new Error(`Relationship title cannot be resolved: ${title}`);
  return { registry_id: recordId(target), title: recordTitle(target), active: false, url: null };
}

function buildData() {
  const sourceText = read(SOURCE).replace(/\r\n/g, '\n');
  const registryText = read(REGISTRY);
  const manifestText = read(MANIFEST);
  const registry = JSON.parse(registryText);
  const manifest = JSON.parse(manifestText);
  const records = Array.isArray(registry.records) ? registry.records : [];
  const byId = new Map(records.map((record) => [recordId(record), record]));
  const { data: frontmatter, body } = parseFrontmatter(sourceText);
  const sections = parseNumberedSections(body);

  if (frontmatter.registry_id !== EXPECTED_ID) throw new Error(`Expected ${EXPECTED_ID}, found ${frontmatter.registry_id}`);
  if (frontmatter.status !== 'COPY_LOCKED') throw new Error(`${EXPECTED_ID} source is not COPY_LOCKED`);
  if (frontmatter.page_role !== 'featured-route') throw new Error(`${EXPECTED_ID} is not a featured-route package`);
  const markdownH1 = body.match(/^#\s+(.+)$/m)?.[1]?.trim();
  if (markdownH1 !== frontmatter.h1) throw new Error('Frontmatter and Markdown H1 disagree');

  const manifestMatches = (manifest.entries || []).filter((entry) => entry.registry_id === EXPECTED_ID);
  if (manifestMatches.length !== 1) throw new Error(`Expected one manifest record for ${EXPECTED_ID}, found ${manifestMatches.length}`);
  const manifestRecord = manifestMatches[0];
  if (manifestRecord.content_file !== SOURCE || manifestRecord.status !== 'COPY_LOCKED' || manifestRecord.page_role !== 'featured-route') {
    throw new Error('Manifest record does not resolve to the approved route package');
  }

  const currentRecord = byId.get(EXPECTED_ID);
  if (!currentRecord) throw new Error(`${EXPECTED_ID} is missing from the master registry`);
  if (recordTitle(currentRecord) !== frontmatter.h1) throw new Error('Registry and package H1 disagree');
  if (valueOf(currentRecord, ['Page role']) !== 'page-role:featured-route') throw new Error('Registry page role mismatch');

  const lifecycle = parseLifecycle(sections.get(2).body);
  const routeStates = parseRouteStates(sections.get(3).body);
  if (lifecycle.steps.length !== EXPECTED_HEADINGS.length || routeStates.length !== EXPECTED_HEADINGS.length) {
    throw new Error('Expected exactly 12 lifecycle steps and route states');
  }
  lifecycle.steps.forEach((step, index) => {
    if (step.step_number !== index + 1 || step.heading !== EXPECTED_HEADINGS[index]) {
      throw new Error(`Lifecycle step ${index + 1} does not match the approved order`);
    }
    step.route_state = routeStates[index];
  });

  const companions = parseCompanions(sections.get(4).body);
  for (const companion of companions) {
    const target = byId.get(companion.registry_id);
    if (!target) throw new Error(`Companion ${companion.registry_id} is missing from the registry`);
    if (recordTitle(target) !== companion.title) throw new Error(`Companion title mismatch for ${companion.registry_id}`);
  }

  const plannedRelationships = parseRefs(sections.get(11).body);
  for (const relationship of plannedRelationships) {
    const target = byId.get(relationship.registry_id);
    if (!target) throw new Error(`Planned destination ${relationship.registry_id} is missing from the registry`);
    if (recordTitle(target) !== relationship.title) throw new Error(`Planned destination title mismatch for ${relationship.registry_id}`);
  }

  const primaryPath = inactiveFromTitle(valueOf(currentRecord, ['Primary learning path']), records);
  const secondaryPaths = valueOf(currentRecord, ['Secondary learning paths'], []).map((title) => inactiveFromTitle(title, records));

  return {
    schema_version: 1,
    source: {
      file: SOURCE,
      sha256: sha256(sourceText),
      registry_file: REGISTRY,
      registry_sha256: sha256(registryText),
      manifest_file: MANIFEST,
      manifest_sha256: sha256(manifestText),
      manifest_record: {
        registry_id: manifestRecord.registry_id,
        content_file: manifestRecord.content_file,
        page_role: manifestRecord.page_role,
        status: manifestRecord.status,
      },
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
    orientation: {
      intro_markdown: lifecycle.intro_markdown,
      intro_html: lifecycle.intro_html,
      lifecycle_scope_markdown: sections.get(3).body,
      lifecycle_scope_html: markdownBlocks(sections.get(3).body),
    },
    steps: lifecycle.steps,
    companion_guides: companions,
    key_terms: parseKeyTerms(sections.get(5).body),
    sources: parseSources(sections.get(6).body),
    seo_title: sections.get(7).body,
    meta_description: sections.get(8).body,
    excerpt: sections.get(9).body,
    reading_time: sections.get(10).body,
    relationships: {
      parent_category: inactiveFromRef(valueOf(currentRecord, ['Parent destination']), byId),
      learning_paths: [primaryPath, ...secondaryPaths],
      previous: inactiveFromRef(valueOf(currentRecord, ['Previous guide']), byId),
      next: inactiveFromRef(valueOf(currentRecord, ['Next guide']), byId),
      recommended_branch: inactiveFromRef(valueOf(currentRecord, ['Recommended branch guide']), byId),
      return_destination: inactiveFromRef(valueOf(currentRecord, ['Return destination']), byId),
      planned: plannedRelationships,
    },
    review: {
      reviewed_date: frontmatter.reviewed_date,
      copy_locked_date: frontmatter.copy_locked_date,
      human_verification: parseHuman(sections.get(13).body),
      accuracy_checklist: parseChecklist(sections.get(12).body),
    },
    illustration_briefs: parseIllustrations(sections.get(14).body),
    publication: {
      state: 'PREVIEW_ONLY',
      public_url: null,
      shopify_page_id: null,
      links_active: false,
    },
    synchronization: {
      expected_step_headings: EXPECTED_HEADINGS,
      source_step_headings: lifecycle.steps.map((step) => step.heading),
      source_route_states: routeStates,
      companion_ids: companions.map((item) => item.registry_id),
      planned_relationship_ids: plannedRelationships.map((item) => item.registry_id),
    },
  };
}

function buildSnippet(data) {
  const steps = data.steps.map((step) => `<li><article class="msc-learn-route-step msc-glass-card" data-msc-route-step="${step.step_number}" aria-disabled="true"><p class="msc-section-kicker">Step ${step.step_number}</p><h2>${escapeHtml(step.heading)}</h2><div class="msc-learn-route-step__copy">${step.explanatory_html}</div><p class="msc-learn-preview-note"><strong>Route state:</strong> ${escapeHtml(step.route_state)}</p></article></li>`).join('\n');
  const companions = data.companion_guides.map((guide) => `<article class="msc-learn-guide-card msc-glass-card" data-msc-destination-id="${guide.registry_id}" aria-disabled="true"><p class="msc-section-kicker">${guide.registry_id}</p><h3>${escapeHtml(guide.title)}</h3><p>${escapeHtml(guide.companion_role)}</p><p class="msc-learn-preview-note">Companion destination remains inactive until publication and URL confirmation.</p></article>`).join('\n');
  const terms = data.key_terms.map((item) => `<div class="msc-learn-term"><dt>${escapeHtml(item.term)}</dt><dd>${escapeHtml(item.definition)}</dd></div>`).join('\n');
  const sources = data.sources.map((source) => {
    const details = Object.entries(source).filter(([key]) => key !== 'title').map(([key, value]) => `<li><strong>${escapeHtml(key.replace(/_/g, ' '))}:</strong> ${key === 'url' ? `<code>${escapeHtml(value)}</code>` : escapeHtml(value)}</li>`).join('');
    return `<article class="msc-learn-source"><h3>${escapeHtml(source.title)}</h3><ul>${details}</ul></article>`;
  }).join('\n');
  const relationshipItems = [
    ['Parent category', data.relationships.parent_category],
    ...data.relationships.learning_paths.map((item) => ['Learning path', item]),
    ['Previous', data.relationships.previous],
    ['Next', data.relationships.next],
    ['Recommended branch', data.relationships.recommended_branch],
    ['Return', data.relationships.return_destination],
  ].map(([label, item]) => `<span class="msc-learn-prev-next__item" aria-disabled="true"><span>${escapeHtml(label)}</span><strong>${escapeHtml(item.title)}</strong><small>Link inactive</small></span>`).join('');

  return `{% comment %}\n  Generated from ${SOURCE}.\n  Registry binding: ${data.registry_id}.\n  Preview only. Do not edit manually.\n  Rebuild with npm run build:learn-route-pilot.\n{% endcomment %}\n<section class="msc-shell msc-learn-page" data-msc-registry-id="${data.registry_id}" data-msc-preview-only="true">\n  <div class="msc-container msc-learn-page__container">\n    <nav class="msc-learn-breadcrumbs" aria-label="Learn breadcrumbs"><ol><li><span>Learn</span></li><li><span>The Bitcoin Network</span></li><li aria-current="page"><span>${escapeHtml(data.h1)}</span></li></ol></nav>\n    <header class="msc-learn-page__header"><p class="msc-section-kicker">Featured Route</p><h1>${escapeHtml(data.h1)}</h1><p class="msc-learn-page__deck">${escapeHtml(data.introductory_deck)}</p><ul class="msc-learn-page-meta"><li>${data.steps.length} lifecycle steps</li><li>${data.companion_guides.length} companion guides</li><li>${escapeHtml(data.reading_time)}</li><li>Reviewed ${escapeHtml(data.review.reviewed_date)}</li></ul><p class="msc-learn-preview-note">Preview only. Companion destinations and navigation remain inactive because published pages and confirmed URLs do not exist.</p></header>\n    <article class="msc-learn-article rte" data-msc-content-source="structured-runtime"><section class="msc-learn-article__section">${data.orientation.intro_html}</section></article>\n    <ol class="msc-learn-route-list" aria-label="Bitcoin transaction lifecycle">${steps}</ol>\n    <section class="msc-learn-subcategory"><h2>Companion Guides</h2><div class="msc-learn-card-grid">${companions}</div></section>\n    <section class="msc-learn-key-terms"><h2>Key Terms</h2><dl>${terms}</dl></section>\n    <section class="msc-learn-sources"><h2>Sources</h2>${sources}</section>\n    <nav class="msc-learn-prev-next" aria-label="Featured route navigation preview">${relationshipItems}</nav>\n  </div>\n</section>\n`;
}

function assertInactive(value, location = 'runtime') {
  if (Array.isArray(value)) return value.forEach((item, index) => assertInactive(item, `${location}[${index}]`));
  if (!value || typeof value !== 'object') return;
  if (Object.prototype.hasOwnProperty.call(value, 'active') && value.active !== false) throw new Error(`${location}.active must be false`);
  if (Object.prototype.hasOwnProperty.call(value, 'url') && value.url !== null) throw new Error(`${location}.url must be null`);
  for (const [key, child] of Object.entries(value)) assertInactive(child, `${location}.${key}`);
}

function validate(data, jsonText, snippet) {
  const required = ['source', 'registry_id', 'status', 'page_role', 'h1', 'introductory_deck', 'orientation', 'steps', 'companion_guides', 'key_terms', 'sources', 'seo_title', 'meta_description', 'excerpt', 'reading_time', 'relationships', 'review', 'illustration_briefs', 'publication'];
  for (const field of required) if (data[field] === undefined || data[field] === null || data[field] === '') throw new Error(`Missing required runtime field ${field}`);
  if (data.registry_id !== EXPECTED_ID || data.status !== 'COPY_LOCKED' || data.page_role !== 'featured-route') throw new Error('Route identity or status mismatch');
  if (data.steps.length !== 12 || JSON.stringify(data.steps.map((step) => step.heading)) !== JSON.stringify(EXPECTED_HEADINGS)) throw new Error('Exact 12-step heading order mismatch');
  if (data.steps.some((step, index) => step.step_number !== index + 1 || !step.explanatory_markdown || !step.route_state)) throw new Error('Lifecycle step fields are incomplete');
  if (data.companion_guides.length !== 14) throw new Error('Expected exactly 14 companion guides');
  if (data.key_terms.length !== 14) throw new Error('Expected exactly 14 key terms');
  if (data.sources.length !== 16) throw new Error('Expected exactly 16 sources');
  if (!data.review.human_verification.reviewer || !data.review.human_verification.review_date || !data.review.human_verification.notes.length) throw new Error('Human Verification record is incomplete');
  if (data.illustration_briefs.length !== 3) throw new Error('Expected exactly three illustration briefs');
  if (data.publication.state !== 'PREVIEW_ONLY' || data.publication.public_url !== null || data.publication.shopify_page_id !== null || data.publication.links_active !== false) throw new Error('Publication state must remain preview-only');
  assertInactive(data.steps, 'steps');
  assertInactive(data.companion_guides, 'companion_guides');
  assertInactive(data.relationships, 'relationships');
  if (/<a\b|\bhref\s*=|page\.content|page\.handle/i.test(snippet)) throw new Error('Generated route output activates a link or uses Shopify page content/handle');
  if (/<(?:img|picture|figure)\b|data-msc-illustration|msc-learn-illustration|illustration-placeholder/i.test(snippet)) throw new Error('Illustration output must not render');

  const section = read(SECTION);
  if (/page\.content|page\.handle/.test(section)) throw new Error('Route section uses page.content or page.handle');
  if (/<a\b|\bhref\s*=/.test(section)) throw new Error('Route section activates a link');
  if (!section.includes('section.settings.registry_id') || !section.includes(`when '${EXPECTED_ID}'`)) throw new Error('Route section is not bound through registry_id');
  const template = JSON.parse(read(TEMPLATE));
  if (template.sections?.main?.settings?.registry_id !== EXPECTED_ID) throw new Error('Route template is not explicitly bound to MSC-ROUTE-001');

  const secondData = buildData();
  const secondJson = `${JSON.stringify(secondData, null, 2)}\n`;
  const secondSnippet = buildSnippet(secondData);
  if (jsonText !== secondJson || snippet !== secondSnippet) throw new Error('Featured-route runtime generation is not deterministic');
}

const data = buildData();
const jsonText = `${JSON.stringify(data, null, 2)}\n`;
const snippet = buildSnippet(data);

if (CHECK) {
  if (!fs.existsSync(JSON_OUT) || read(JSON_OUT) !== jsonText) throw new Error(`${JSON_OUT} does not match the approved Markdown source`);
  if (!fs.existsSync(LIQUID_OUT) || read(LIQUID_OUT) !== snippet) throw new Error(`${LIQUID_OUT} does not match the structured runtime data`);
  validate(data, jsonText, snippet);
  console.log('MSC featured transaction route runtime pilot validation passed: unique manifest resolution, source and registry synchronization, exact 12-step order and headings, companion destination resolution, deterministic output, registry-bound rendering, no page.content or page.handle, no active links, no confirmed destination URLs, no Shopify page ID, no illustration output, and preview-only publication.');
} else {
  fs.mkdirSync(path.dirname(JSON_OUT), { recursive: true });
  fs.writeFileSync(JSON_OUT, jsonText);
  fs.writeFileSync(LIQUID_OUT, snippet);
  console.log(`Generated ${JSON_OUT} and ${LIQUID_OUT}.`);
}
