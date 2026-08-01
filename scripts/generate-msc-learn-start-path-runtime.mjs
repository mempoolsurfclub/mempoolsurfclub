import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const SOURCE = 'docs/learn/content/paths/MSC-PATH-START-start-with-bitcoin.md';
const REGISTRY = 'docs/learn/MSC_Learn_Master_Registry.json';
const MANIFEST = 'docs/learn/content/content-manifest.json';
const JSON_OUT = 'docs/learn/runtime/MSC-PATH-START.json';
const LIQUID_OUT = 'snippets/msc-learn-start-path-runtime.liquid';
const SECTION = 'sections/msc-learn-path.liquid';
const TEMPLATE = 'templates/page.msc-learn-path.json';
const EXPECTED_ID = 'MSC-PATH-START';
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
  if (!source.startsWith('---\n')) throw new Error('Path source is missing frontmatter');
  const end = source.indexOf('\n---\n', 4);
  if (end === -1) throw new Error('Path source is missing closing frontmatter delimiter');
  const data = {};
  let listKey = null;
  for (const line of source.slice(4, end).split('\n')) {
    const list = line.match(/^\s+-\s+(.*)$/);
    if (list && listKey) {
      data[listKey].push(parseScalar(list[1]));
      continue;
    }
    const field = line.match(/^([A-Za-z0-9_]+):(?:\s*(.*))?$/);
    if (!field) {
      if (line.trim()) throw new Error(`Unsupported frontmatter line: ${line}`);
      listKey = null;
      continue;
    }
    const [, key, raw = ''] = field;
    if (!raw.trim()) {
      data[key] = [];
      listKey = key;
    } else {
      data[key] = parseScalar(raw);
      listKey = null;
    }
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

function parseStageSections(markdown) {
  const matches = [...markdown.matchAll(/^###\s+Stage\s+(\d+):\s+(.+)$/gm)];
  const intro = matches.length ? normalize(markdown.slice(0, matches[0].index)) : normalize(markdown);
  const stages = matches.map((match, index) => {
    const start = match.index + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index : markdown.length;
    const body = normalize(markdown.slice(start, end));
    return {
      stage_number: Number(match[1]),
      title: match[2].trim(),
      body_markdown: body,
      body_html: markdownBlocks(body),
    };
  });
  return {
    intro_markdown: intro,
    intro_html: markdownBlocks(intro),
    stages,
  };
}

function parseStageStructure(markdown) {
  const parsed = parseStageSections(markdown);
  return parsed.stages.map((stage) => {
    const range = stage.body_markdown.match(/Steps?\s+(\d+)(?:\s+through\s+(\d+))?/i);
    if (!range) throw new Error(`Cannot resolve step range for Stage ${stage.stage_number}`);
    const first = Number(range[1]);
    const last = Number(range[2] || range[1]);
    return {
      stage_number: stage.stage_number,
      title: stage.title,
      summary_markdown: stage.body_markdown,
      summary_html: stage.body_html,
      step_numbers: Array.from({ length: last - first + 1 }, (_, index) => first + index),
    };
  });
}

function headingRecords(markdown, headingPattern = /^###\s+(.+)$/gm) {
  const matches = [...markdown.matchAll(headingPattern)];
  return matches.map((match, index) => {
    const start = match.index + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index : markdown.length;
    const fields = {};
    for (const line of normalize(markdown.slice(start, end)).split('\n')) {
      const field = line.match(/^-\s+([^:]+):\s*(.*)$/);
      if (!field) continue;
      const key = field[1].trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
      fields[key] = field[2].trim();
    }
    return { heading: match[1].trim(), ...fields };
  });
}

function parseSteps(markdown) {
  const matches = [...markdown.matchAll(/^###\s+Step\s+(\d+):\s+(MSC-[A-Z]+-\d+)\s+\|\s+(.+)$/gm)];
  return matches.map((match, index) => {
    const start = match.index + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index : markdown.length;
    const fields = {};
    for (const line of normalize(markdown.slice(start, end)).split('\n')) {
      const field = line.match(/^-\s+([^:]+):\s*(.*)$/);
      if (!field) continue;
      const key = field[1].trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
      fields[key] = field[2].trim();
    }
    const step_number = Number(fields.step_number || match[1]);
    const registry_id = fields.registry_id || match[2];
    const title = fields.approved_h1 || match[3].trim();
    if (step_number !== Number(match[1]) || registry_id !== match[2] || title !== match[3].trim()) {
      throw new Error(`Step heading and metadata disagree for Step ${match[1]}`);
    }
    return {
      step_number,
      registry_id,
      title,
      description: fields.why_this_step_appears_here,
      understand_before_continuing: fields.understand_before_continuing,
      depth: fields.depth,
      reading_time: fields.estimated_reading_time,
      planned_status: fields.planned_status,
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
      if (!field) continue;
      const key = field[1].trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
      fields[key] = field[2].trim();
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

const valueOf = (object, names, fallback = '') => {
  for (const name of names) if (object?.[name] !== undefined && object?.[name] !== null) return object[name];
  return fallback;
};
const recordId = (record) => valueOf(record, ['Registry ID', 'registry_id', 'id']);
const recordTitle = (record) => valueOf(record, ['Final recommended H1', 'Final H1', 'Display label', 'Title', 'name']);
const refId = (input) => String(input || '').split('|')[0].trim();
const inactive = (id, byId) => id ? { registry_id: id, title: recordTitle(byId.get(id)), active: false, url: null } : null;

function branchStepNumber(text, steps) {
  const lower = text.toLowerCase();
  if (lower.includes('wallet introduction')) return steps.find((step) => step.title.includes('Bitcoin Wallet'))?.step_number || null;
  if (lower.includes('transactions and fees')) return steps.find((step) => step.title.includes('Transactions and Fees'))?.step_number || null;
  if (lower.includes('bitcoin history')) return steps.find((step) => step.title.includes('History of Bitcoin'))?.step_number || null;
  return null;
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
  if (frontmatter.page_role !== 'learning-path') throw new Error(`${EXPECTED_ID} is not a learning-path package`);

  const manifestMatches = (manifest.entries || []).filter((entry) => entry.registry_id === EXPECTED_ID);
  if (manifestMatches.length !== 1) throw new Error(`Expected one manifest record for ${EXPECTED_ID}, found ${manifestMatches.length}`);
  const manifestRecord = manifestMatches[0];
  if (manifestRecord.content_file !== SOURCE || manifestRecord.status !== 'COPY_LOCKED') throw new Error('Manifest record does not resolve to the approved path package');

  const currentRecord = byId.get(EXPECTED_ID);
  if (!currentRecord) throw new Error(`${EXPECTED_ID} is missing from the master registry`);
  if (recordTitle(currentRecord) !== frontmatter.h1) throw new Error('Registry and package H1 disagree');

  const orientation = parseStageSections(sections.get(2).body);
  const structure = parseStageStructure(sections.get(3).body);
  const steps = parseSteps(sections.get(4).body);
  const registrySequence = valueOf(currentRecord, ['Recommended sequence'], []).map(refId);
  const sourceSequence = steps.map((step) => step.registry_id);
  if (JSON.stringify(registrySequence) !== JSON.stringify(sourceSequence)) throw new Error('Registry and package step sequence disagree');

  for (const step of steps) {
    if (!byId.has(step.registry_id)) throw new Error(`Step destination ${step.registry_id} is missing from the registry`);
    if (recordTitle(byId.get(step.registry_id)) !== step.title) throw new Error(`Step title mismatch for ${step.registry_id}`);
  }

  const stages = structure.map((stage) => {
    const articleStage = orientation.stages.find((item) => item.stage_number === stage.stage_number);
    if (!articleStage || articleStage.title !== stage.title) throw new Error(`Stage ${stage.stage_number} copy and structure disagree`);
    return {
      ...stage,
      orientation_markdown: articleStage.body_markdown,
      orientation_html: articleStage.body_html,
      steps: stage.step_numbers.map((number) => {
        const step = steps.find((item) => item.step_number === number);
        if (!step) throw new Error(`Stage ${stage.stage_number} references missing Step ${number}`);
        return step;
      }),
    };
  });

  const branching = valueOf(currentRecord, ['Branching opportunities'], []);
  const optionalBranches = branching.map((text) => {
    const target = records.find((record) => recordId(record)?.startsWith('MSC-PATH-') && text.startsWith(recordTitle(record)));
    if (!target) throw new Error(`Branch target cannot be resolved: ${text}`);
    return {
      registry_id: recordId(target),
      title: recordTitle(target),
      requirement: 'OPTIONAL',
      placement: text,
      after_step_number: branchStepNumber(text, steps),
      active: false,
      url: null,
    };
  });

  const plannedLinks = parseRefs(sections.get(11).body);
  for (const link of plannedLinks) if (!byId.has(link.registry_id)) throw new Error(`Planned destination ${link.registry_id} is missing from the registry`);

  const hubIds = valueOf(currentRecord, ['Category relationships'], []).map(refId);
  const finalId = refId(valueOf(currentRecord, ['Final guide']));
  const previousId = refId(valueOf(currentRecord, ['Previous guide']));
  const nextId = refId(valueOf(currentRecord, ['Next guide']));
  for (const destinationId of [...hubIds, finalId, previousId, nextId]) {
    if (!destinationId || !byId.has(destinationId)) throw new Error(`Relationship destination ${destinationId || '(empty)'} is missing from the registry`);
  }
  const hubs = hubIds.map((id) => inactive(id, byId));

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
        status: manifestRecord.status,
      },
    },
    registry_id: frontmatter.registry_id,
    status: frontmatter.status,
    page_role: frontmatter.page_role,
    h1: frontmatter.h1,
    introductory_deck: sections.get(1).body,
    orientation: {
      intro_markdown: orientation.intro_markdown,
      intro_html: orientation.intro_html,
      stages: orientation.stages,
    },
    stages,
    steps,
    key_terms: parseKeyTerms(sections.get(5).body),
    sources: parseSources(sections.get(6).body),
    seo_title: sections.get(7).body,
    meta_description: sections.get(8).body,
    excerpt: sections.get(9).body,
    total_reading_time: sections.get(10).body,
    branches: {
      required: [],
      optional: optionalBranches,
    },
    relationships: {
      previous: inactive(previousId, byId),
      next: inactive(nextId, byId),
      category: {
        label: valueOf(currentRecord, ['Primary Learn category']),
        active: false,
        url: null,
      },
      hubs,
      route: inactive(finalId, byId),
      related_paths: optionalBranches.map(({ registry_id, title, active, url }) => ({ registry_id, title, active, url })),
      planned_internal_links: plannedLinks,
    },
    review: {
      reviewed_date: frontmatter.reviewed_date,
      copy_locked_date: frontmatter.copy_locked_date,
      human_verification: parseHuman(sections.get(13).body),
      accuracy_checklist: parseChecklist(sections.get(12).body),
    },
    illustration_briefs: headingRecords(sections.get(14).body),
    publication: {
      state: 'PREVIEW_ONLY',
      public_url: null,
      shopify_page_id: null,
      links_active: false,
    },
    synchronization: {
      expected_stage_numbers: [1, 2, 3, 4],
      expected_step_ids: registrySequence,
      source_stage_numbers: stages.map((stage) => stage.stage_number),
      source_step_ids: sourceSequence,
      stage_step_numbers: stages.map((stage) => stage.step_numbers),
    },
  };
}

function buildSnippet(data) {
  const orientation = [
    data.orientation.intro_html ? `<section class="msc-learn-article__section">${data.orientation.intro_html}</section>` : '',
    ...data.orientation.stages.map((stage) => `<section class="msc-learn-article__section"><h2>Stage ${stage.stage_number}: ${escapeHtml(stage.title)}</h2>${stage.body_html}</section>`),
  ].filter(Boolean).join('\n');

  const stages = data.stages.map((stage) => {
    const steps = stage.steps.map((step) => `<li><article class="msc-learn-guide-card msc-glass-card" data-msc-step-number="${step.step_number}" data-msc-destination-id="${step.registry_id}" aria-disabled="true"><p class="msc-section-kicker">Step ${step.step_number} · ${step.registry_id}</p><h3>${escapeHtml(step.title)}</h3><p>${escapeHtml(step.description)}</p><p><strong>Understand before continuing:</strong> ${escapeHtml(step.understand_before_continuing)}</p><ul class="msc-learn-page-meta"><li>${escapeHtml(step.depth)}</li><li>${escapeHtml(step.reading_time)}</li></ul><p class="msc-learn-preview-note">Destination remains inactive until publication and URL confirmation.</p></article></li>`).join('\n');
    return `<section class="msc-learn-path-stage" data-msc-stage-number="${stage.stage_number}"><header><p class="msc-section-kicker">Stage ${stage.stage_number}</p><h2>${escapeHtml(stage.title)}</h2>${stage.summary_html}</header><ol class="msc-learn-route-list">${steps}</ol></section>`;
  }).join('\n');

  const branches = data.branches.optional.map((branch) => `<article class="msc-learn-guide-card msc-glass-card" data-msc-branch-id="${branch.registry_id}" aria-disabled="true"><p class="msc-section-kicker">Optional branch</p><h3>${escapeHtml(branch.title)}</h3><p>${escapeHtml(branch.placement)}</p><p class="msc-learn-preview-note">Branch remains inactive.</p></article>`).join('\n');
  const terms = data.key_terms.map((item) => `<div class="msc-learn-term"><dt>${escapeHtml(item.term)}</dt><dd>${escapeHtml(item.definition)}</dd></div>`).join('\n');
  const sources = data.sources.map((source) => {
    const metadata = Object.entries(source).filter(([key]) => key !== 'title').map(([key, value]) => `<li><strong>${escapeHtml(key.replace(/_/g, ' '))}:</strong> ${escapeHtml(value)}</li>`).join('');
    return `<article class="msc-learn-source"><h3>${escapeHtml(source.title)}</h3>${metadata ? `<ul>${metadata}</ul>` : ''}</article>`;
  }).join('\n');
  const relationshipItems = [
    ['Previous', data.relationships.previous],
    ...data.relationships.hubs.map((hub) => ['Category hub', hub]),
    ['Featured route', data.relationships.route],
    ...data.relationships.related_paths.map((pathItem) => ['Related path', pathItem]),
    ['Next', data.relationships.next],
  ].filter(([, item]) => item).map(([label, item]) => `<span class="msc-learn-prev-next__item" aria-disabled="true"><span>${escapeHtml(label)}</span><strong>${escapeHtml(item.title)}</strong><small>Link inactive</small></span>`).join('');

  return `{% comment %}\n  Generated from ${SOURCE}.\n  Registry binding: ${data.registry_id}.\n  Preview only. Do not edit manually.\n  Rebuild with npm run build:learn-path-pilot.\n{% endcomment %}\n<section class="msc-shell msc-learn-page" data-msc-registry-id="${data.registry_id}" data-msc-preview-only="true">\n  <div class="msc-container msc-learn-page__container">\n    <nav class="msc-learn-breadcrumbs" aria-label="Learn breadcrumbs"><ol><li><span>Learn</span></li><li aria-current="page"><span>${escapeHtml(data.h1)}</span></li></ol></nav>\n    <header class="msc-learn-page__header"><p class="msc-section-kicker">Learning Path</p><h1>${escapeHtml(data.h1)}</h1><p class="msc-learn-page__deck">${escapeHtml(data.introductory_deck)}</p><ul class="msc-learn-page-meta"><li>${data.stages.length} stages</li><li>${data.steps.length} steps</li><li>${escapeHtml(data.total_reading_time)}</li><li>Reviewed ${escapeHtml(data.review.reviewed_date)}</li></ul><p class="msc-learn-preview-note">Preview only. Destinations and relationships remain inactive because published pages and confirmed URLs do not exist.</p></header>\n    <article class="msc-learn-article rte" data-msc-content-source="structured-runtime">${orientation}</article>\n    <div class="msc-learn-path-stages">${stages}</div>\n    ${branches ? `<section class="msc-learn-subcategory"><h2>Optional Branches</h2><div class="msc-learn-card-grid">${branches}</div></section>` : ''}\n    <section class="msc-learn-key-terms"><h2>Key Terms</h2><dl>${terms}</dl></section>\n    <section class="msc-learn-sources"><h2>Sources</h2>${sources}</section>\n    <nav class="msc-learn-prev-next" aria-label="Learning path navigation preview">${relationshipItems}</nav>\n  </div>\n</section>\n`;
}

function assertInactive(value, location = 'runtime') {
  if (Array.isArray(value)) return value.forEach((item, index) => assertInactive(item, `${location}[${index}]`));
  if (!value || typeof value !== 'object') return;
  if (Object.prototype.hasOwnProperty.call(value, 'active') && value.active !== false) throw new Error(`${location}.active must be false`);
  if (Object.prototype.hasOwnProperty.call(value, 'url') && value.url !== null) throw new Error(`${location}.url must be null`);
  for (const [key, child] of Object.entries(value)) assertInactive(child, `${location}.${key}`);
}

function validate(data, jsonText, snippet) {
  const required = ['source', 'registry_id', 'status', 'page_role', 'h1', 'introductory_deck', 'orientation', 'stages', 'steps', 'seo_title', 'meta_description', 'excerpt', 'total_reading_time', 'branches', 'relationships', 'review', 'illustration_briefs', 'publication'];
  for (const field of required) if (data[field] === undefined || data[field] === null || data[field] === '') throw new Error(`Missing required runtime field ${field}`);
  if (data.registry_id !== EXPECTED_ID || data.status !== 'COPY_LOCKED' || data.page_role !== 'learning-path') throw new Error('Path identity or status mismatch');
  if (JSON.stringify(data.synchronization.source_stage_numbers) !== JSON.stringify([1, 2, 3, 4])) throw new Error('Stage order mismatch');
  if (data.steps.length !== 13 || data.stages.reduce((count, stage) => count + stage.steps.length, 0) !== 13) throw new Error('Expected exactly 13 path steps');
  if (JSON.stringify(data.synchronization.expected_step_ids) !== JSON.stringify(data.synchronization.source_step_ids)) throw new Error('Step order mismatch');
  if (data.branches.required.length !== 0 || data.branches.optional.length !== 3) throw new Error('Required and optional branch structure is incomplete');
  if (!data.review.human_verification.reviewer || !data.review.human_verification.review_date || !data.review.human_verification.notes.length) throw new Error('Human Verification record is incomplete');
  if (data.illustration_briefs.length !== 3) throw new Error('Expected exactly three illustration briefs');
  if (data.publication.state !== 'PREVIEW_ONLY' || data.publication.public_url !== null || data.publication.shopify_page_id !== null || data.publication.links_active !== false) throw new Error('Publication state must remain preview-only');
  assertInactive(data.steps, 'steps');
  assertInactive(data.branches, 'branches');
  assertInactive(data.relationships, 'relationships');
  if (/<a\b|\bhref\s*=|page\.content|page\.handle/i.test(snippet)) throw new Error('Generated path output activates a link or uses Shopify page content/handle');
  if (/<(?:img|picture|figure)\b|data-msc-illustration|msc-learn-illustration|illustration-placeholder/i.test(snippet)) throw new Error('Illustration placeholder output must not render');

  const section = read(SECTION);
  if (/page\.content|page\.handle/.test(section)) throw new Error('Path section uses page.content or page.handle');
  if (/<a\b|\bhref\s*=/.test(section)) throw new Error('Path section activates a link');
  if (!section.includes('section.settings.registry_id') || !section.includes(`when '${EXPECTED_ID}'`)) throw new Error('Path section is not bound through registry_id');
  const template = JSON.parse(read(TEMPLATE));
  if (template.sections?.main?.settings?.registry_id !== EXPECTED_ID) throw new Error('Path template is not explicitly bound to MSC-PATH-START');

  const secondData = buildData();
  const secondJson = `${JSON.stringify(secondData, null, 2)}\n`;
  const secondSnippet = buildSnippet(secondData);
  if (jsonText !== secondJson || snippet !== secondSnippet) throw new Error('Learning-path runtime generation is not deterministic');
}

const data = buildData();
const jsonText = `${JSON.stringify(data, null, 2)}\n`;
const snippet = buildSnippet(data);

if (CHECK) {
  if (!fs.existsSync(JSON_OUT) || read(JSON_OUT) !== jsonText) throw new Error(`${JSON_OUT} does not match the approved Markdown source`);
  if (!fs.existsSync(LIQUID_OUT) || read(LIQUID_OUT) !== snippet) throw new Error(`${LIQUID_OUT} does not match the structured runtime data`);
  validate(data, jsonText, snippet);
  console.log('MSC Start With Bitcoin path runtime pilot validation passed: unique manifest resolution, source and registry synchronization, exact four-stage and 13-step order, destination resolution, deterministic output, registry-bound rendering, no page.content or page.handle, no active links, no confirmed URLs, no Shopify page ID, no illustration placeholders, and preview-only publication.');
} else {
  fs.mkdirSync(path.dirname(JSON_OUT), { recursive: true });
  fs.writeFileSync(JSON_OUT, jsonText);
  fs.writeFileSync(LIQUID_OUT, snippet);
  console.log(`Generated ${JSON_OUT} and ${LIQUID_OUT}.`);
}
