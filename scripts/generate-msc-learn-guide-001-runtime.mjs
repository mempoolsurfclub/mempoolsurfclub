import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const SOURCE_PATH = 'docs/learn/content/guides/MSC-GUIDE-001-what-is-bitcoin.md';
const REGISTRY_PATH = 'docs/learn/MSC_Learn_Master_Registry.json';
const JSON_PATH = 'docs/learn/runtime/MSC-GUIDE-001.json';
const SNIPPET_PATH = 'snippets/msc-learn-guide-001-runtime.liquid';
const SECTION_PATH = 'sections/msc-learn-guide.liquid';
const TEMPLATE_PATH = 'templates/page.msc-learn-guide.json';
const EXPECTED_ID = 'MSC-GUIDE-001';
const CHECK = process.argv.includes('--check');

const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');
const normalize = (value) => String(value ?? '').replace(/\r\n/g, '\n').trim();
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
  if (!source.startsWith('---\n')) throw new Error('Guide source is missing frontmatter');
  const end = source.indexOf('\n---\n', 4);
  if (end === -1) throw new Error('Guide source is missing closing frontmatter delimiter');
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
    sections.set(Number(match[1]), {
      title: match[2].trim(),
      body: normalize(body.slice(start, end)),
    });
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

function parseArticle(markdown) {
  const matches = [...markdown.matchAll(/^###\s+(.+)$/gm)];
  const sections = [];
  if (!matches.length) return [{ heading: null, body_markdown: normalize(markdown), body_html: markdownBlocks(markdown) }];
  const intro = normalize(markdown.slice(0, matches[0].index));
  if (intro) sections.push({ heading: null, body_markdown: intro, body_html: markdownBlocks(intro) });
  matches.forEach((match, index) => {
    const start = match.index + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index : markdown.length;
    const body = normalize(markdown.slice(start, end));
    sections.push({ heading: match[1].trim(), body_markdown: body, body_html: markdownBlocks(body) });
  });
  return sections;
}

function parseKeyTerms(markdown) {
  return normalize(markdown).split(/\n\n+/).map((block) => {
    const match = block.match(/^\*\*(.+?):\*\*\s+([\s\S]+)$/);
    if (!match) throw new Error(`Invalid key term block: ${block}`);
    return { term: match[1], definition: normalize(match[2]) };
  });
}

function parseHeadingRecords(markdown) {
  const matches = [...markdown.matchAll(/^###\s+(.+)$/gm)];
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
    return { title: match[1].trim(), ...fields };
  });
}

function registryRecords(registry) {
  if (Array.isArray(registry.records)) return registry.records;
  return [registry.homepage, registry.glossary_index, registry.featured_route,
    ...(registry.categories || []), ...(registry.learning_paths || []), ...(registry.topic_guides || [])].filter(Boolean);
}
const valueOf = (object, names, fallback = '') => {
  for (const name of names) if (object?.[name] !== undefined && object?.[name] !== null) return object[name];
  return fallback;
};
const recordId = (record) => valueOf(record, ['Registry ID', 'registry_id', 'id']);
const recordTitle = (record) => valueOf(record, ['Final recommended H1', 'Final H1', 'Recommended title', 'Title', 'name', 'final_h1']);
const refId = (value) => String(value || '').split('|')[0].trim();

function buildData() {
  const source = read(SOURCE_PATH).replace(/\r\n/g, '\n');
  const registry = JSON.parse(read(REGISTRY_PATH));
  const records = registryRecords(registry);
  const byId = new Map(records.map((record) => [recordId(record), record]));
  const { data: frontmatter, body } = parseFrontmatter(source);
  const sections = parseNumberedSections(body);
  if (frontmatter.registry_id !== EXPECTED_ID) throw new Error(`Expected ${EXPECTED_ID}, found ${frontmatter.registry_id}`);
  const order = valueOf(registry.navigation || {}, ['canonical_topic_order'], []);
  const index = order.indexOf(EXPECTED_ID);
  if (index === -1) throw new Error(`${EXPECTED_ID} is missing from canonical_topic_order`);
  const previousId = index > 0 ? refId(order[index - 1]) : null;
  const nextId = index + 1 < order.length ? refId(order[index + 1]) : null;
  const currentRecord = byId.get(EXPECTED_ID);
  const parentId = refId(valueOf(currentRecord, ['Parent destination', 'Canonical category', 'Parent category ID', 'parent_category_id']));
  const plannedLinks = sections.get(9).body.split('\n').filter((line) => /^-\s+MSC-/.test(line)).map((line) => {
    const [registry_id, title] = line.replace(/^-\s+/, '').split('|').map((value) => value.trim());
    return { registry_id, title, active: false, url: null };
  });
  const human = sections.get(11).body;
  const humanReviewDate = human.match(/^- Review date:\s*(.+)$/m)?.[1]?.trim() || null;
  return {
    schema_version: 1,
    source_file: SOURCE_PATH,
    source_sha256: crypto.createHash('sha256').update(source).digest('hex'),
    registry_id: frontmatter.registry_id,
    status: frontmatter.status,
    h1: frontmatter.h1,
    introductory_deck: sections.get(1).body,
    article_sections: parseArticle(sections.get(2).body),
    key_terms: parseKeyTerms(sections.get(3).body),
    sources: parseHeadingRecords(sections.get(4).body),
    seo_title: sections.get(5).body,
    meta_description: sections.get(6).body,
    excerpt: sections.get(7).body,
    reading_time: sections.get(8).body,
    category: {
      registry_id: parentId || null,
      label: frontmatter.category,
      subcategory: frontmatter.subcategory,
      depth: frontmatter.depth,
      format: frontmatter.format,
    },
    relationships: {
      previous: previousId ? { registry_id: previousId, title: recordTitle(byId.get(previousId)), active: false, url: null } : null,
      next: nextId ? { registry_id: nextId, title: recordTitle(byId.get(nextId)), active: false, url: null } : null,
      planned_internal_links: plannedLinks,
    },
    review_dates: {
      reviewed: frontmatter.reviewed_date,
      copy_locked: frontmatter.copy_locked_date,
      human_verification: humanReviewDate,
    },
    illustration_briefs: parseHeadingRecords(sections.get(12).body),
    publication: {
      state: 'PREVIEW_ONLY',
      public_url: null,
      links_active: false,
      shopify_page_id: null,
    },
  };
}

function buildSnippet(data) {
  const article = data.article_sections.map((section) => [
    section.heading ? `<section class="msc-learn-article__section"><h2>${escapeHtml(section.heading)}</h2>` : '<section class="msc-learn-article__section">',
    section.body_html,
    '</section>',
  ].join('\n')).join('\n');
  const terms = data.key_terms.map((item) => `<div class="msc-learn-term"><dt>${escapeHtml(item.term)}</dt><dd>${escapeHtml(item.definition)}</dd></div>`).join('\n');
  const sources = data.sources.map((source) => {
    const metadata = Object.entries(source).filter(([key]) => !['title', 'direct_url'].includes(key)).map(([key, value]) => `<li><strong>${escapeHtml(key.replace(/_/g, ' '))}:</strong> ${escapeHtml(value)}</li>`).join('');
    const url = source.direct_url ? `<p><strong>Direct URL:</strong> <code>${escapeHtml(source.direct_url)}</code></p>` : '';
    return `<article class="msc-learn-source"><h3>${escapeHtml(source.title)}</h3>${metadata ? `<ul>${metadata}</ul>` : ''}${url}</article>`;
  }).join('\n');
  const previous = data.relationships.previous
    ? `<span class="msc-learn-prev-next__item" aria-disabled="true"><span>Previous</span><strong>${escapeHtml(data.relationships.previous.title)}</strong><small>Link inactive</small></span>`
    : `<span class="msc-learn-prev-next__item" aria-disabled="true"><span>Previous</span><strong>Start of guide sequence</strong><small>No previous guide</small></span>`;
  const next = data.relationships.next
    ? `<span class="msc-learn-prev-next__item" aria-disabled="true"><span>Next</span><strong>${escapeHtml(data.relationships.next.title)}</strong><small>Link inactive</small></span>`
    : '';
  return `{% comment %}\n  Generated from ${SOURCE_PATH}.\n  Registry binding: ${data.registry_id}.\n  Preview only. Do not edit manually.\n  Rebuild with npm run build:learn-guide-pilot.\n{% endcomment %}\n<section class="msc-shell msc-learn-page" data-msc-registry-id="${data.registry_id}" data-msc-preview-only="true">\n  <div class="msc-container msc-learn-page__container">\n    <nav class="msc-learn-breadcrumbs" aria-label="Learn breadcrumbs"><ol><li><span>Learn</span></li><li><span>${escapeHtml(data.category.label)}</span></li><li aria-current="page"><span>${escapeHtml(data.h1)}</span></li></ol></nav>\n    <header class="msc-learn-page__header">\n      <p class="msc-section-kicker">${escapeHtml(data.category.label)}</p>\n      <h1>${escapeHtml(data.h1)}</h1>\n      <p class="msc-learn-page__deck">${escapeHtml(data.introductory_deck)}</p>\n      <ul class="msc-learn-page-meta"><li>${escapeHtml(data.category.subcategory)}</li><li>${escapeHtml(data.category.depth)}</li><li>${escapeHtml(data.category.format)}</li><li>${escapeHtml(data.reading_time)}</li><li>Reviewed ${escapeHtml(data.review_dates.reviewed)}</li></ul>\n      <p class="msc-learn-preview-note">Preview only. Publication records and confirmed URLs do not exist; all navigation remains inactive.</p>\n    </header>\n    <article class="msc-learn-article rte" data-msc-content-source="structured-runtime">\n${article}\n    </article>\n    <section class="msc-learn-key-terms" aria-labelledby="MscGuide001Terms"><h2 id="MscGuide001Terms">Key Terms</h2><dl>${terms}</dl></section>\n    <section class="msc-learn-sources" aria-labelledby="MscGuide001Sources"><h2 id="MscGuide001Sources">Sources</h2>${sources}</section>\n    <nav class="msc-learn-prev-next" aria-label="Guide navigation preview">${previous}<span class="msc-learn-prev-next__item" aria-disabled="true"><span>Category</span><strong>${escapeHtml(data.category.label)}</strong><small>Link inactive</small></span>${next}</nav>\n  </div>\n</section>\n`;
}

function validate(data, jsonText, snippet) {
  const required = ['registry_id', 'h1', 'introductory_deck', 'article_sections', 'key_terms', 'sources', 'seo_title', 'meta_description', 'excerpt', 'reading_time', 'category', 'relationships', 'review_dates', 'illustration_briefs'];
  for (const field of required) if (data[field] === undefined || data[field] === null || data[field] === '') throw new Error(`Missing required runtime field ${field}`);
  if (data.registry_id !== EXPECTED_ID) throw new Error('Runtime data registry ID mismatch');
  if (!data.article_sections.length || !data.key_terms.length || !data.sources.length || data.illustration_briefs.length !== 3) throw new Error('Structured arrays are incomplete');
  if (data.publication.public_url !== null || data.publication.links_active !== false) throw new Error('Public link state must remain inactive');
  if (/<a\b|\bhref\s*=|page\.content/i.test(snippet)) throw new Error('Generated runtime snippet activates a link or uses page.content');
  const section = read(SECTION_PATH);
  if (/page\.content/.test(section)) throw new Error('Guide section still uses page.content');
  if (/<a\b|\bhref\s*=/.test(section)) throw new Error('Guide section activates a public link');
  if (!section.includes('section.settings.registry_id') || !section.includes(`when '${EXPECTED_ID}'`)) throw new Error('Guide section is not bound through registry_id');
  const template = JSON.parse(read(TEMPLATE_PATH));
  if (template.sections?.main?.settings?.registry_id !== EXPECTED_ID) throw new Error('Guide template is not explicitly bound to MSC-GUIDE-001');
  if (/illustration|placeholder/i.test(snippet)) throw new Error('Illustration placeholder content must not render');
  const secondData = buildData();
  const secondJson = `${JSON.stringify(secondData, null, 2)}\n`;
  const secondSnippet = buildSnippet(secondData);
  if (jsonText !== secondJson || snippet !== secondSnippet) throw new Error('Guide runtime generation is not deterministic');
}

const data = buildData();
const jsonText = `${JSON.stringify(data, null, 2)}\n`;
const snippet = buildSnippet(data);

if (CHECK) {
  if (!fs.existsSync(JSON_PATH) || read(JSON_PATH) !== jsonText) throw new Error(`${JSON_PATH} does not match the approved Markdown source`);
  if (!fs.existsSync(SNIPPET_PATH) || read(SNIPPET_PATH) !== snippet) throw new Error(`${SNIPPET_PATH} does not match the structured runtime data`);
  validate(data, jsonText, snippet);
  console.log('MSC Guide 001 runtime pilot validation passed: source synchronized, required fields present, deterministic output, registry-bound rendering, no page.content, no active links, and no illustration placeholders.');
} else {
  fs.mkdirSync(path.dirname(JSON_PATH), { recursive: true });
  fs.writeFileSync(JSON_PATH, jsonText);
  fs.writeFileSync(SNIPPET_PATH, snippet);
  console.log(`Generated ${JSON_PATH} and ${SNIPPET_PATH}.`);
}
