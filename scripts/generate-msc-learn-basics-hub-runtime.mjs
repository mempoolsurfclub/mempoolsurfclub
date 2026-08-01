import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const SOURCE = 'docs/learn/content/hubs/MSC-HUB-BASICS-learn-bitcoin-basics.md';
const REGISTRY = 'docs/learn/MSC_Learn_Master_Registry.json';
const MANIFEST = 'docs/learn/content/content-manifest.json';
const JSON_OUT = 'docs/learn/runtime/MSC-HUB-BASICS.json';
const LIQUID_OUT = 'snippets/msc-learn-basics-hub-runtime.liquid';
const SECTION = 'sections/msc-learn-category.liquid';
const TEMPLATE = 'templates/page.msc-learn-category.json';
const ID = 'MSC-HUB-BASICS';
const SUBS = ['Foundations', 'Using Bitcoin', 'Security', 'Essentials'];
const GUIDE_IDS = Array.from({ length: 16 }, (_, i) => `MSC-GUIDE-${String(i + 1).padStart(3, '0')}`);
const CHECK = process.argv.includes('--check');
const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');
const norm = (value) => String(value ?? '').replace(/\r\n/g, '\n').trim();
const esc = (value) => String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const key = (value) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');

function frontmatter(source) {
  if (!source.startsWith('---\n')) throw new Error('Hub source is missing frontmatter');
  const end = source.indexOf('\n---\n', 4);
  if (end < 0) throw new Error('Hub source is missing closing frontmatter');
  const data = {};
  for (const line of source.slice(4, end).split('\n')) {
    const match = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!match) { if (line.trim()) throw new Error(`Unsupported frontmatter line: ${line}`); continue; }
    let value = match[2].trim();
    if (value.startsWith('"') && value.endsWith('"')) value = JSON.parse(value);
    data[match[1]] = value;
  }
  return { data, body: source.slice(end + 5) };
}

function numbered(body) {
  const matches = [...body.matchAll(/^##\s+(\d+)\.\s+(.+)$/gm)];
  const out = new Map();
  matches.forEach((match, i) => out.set(Number(match[1]), norm(body.slice(match.index + match[0].length, matches[i + 1]?.index ?? body.length))));
  return out;
}

function inline(value) {
  return esc(value).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

function blocks(markdown) {
  const output = [];
  let paragraph = [];
  let list = null;
  const flushP = () => { if (paragraph.length) { output.push(`<p>${inline(paragraph.join(' '))}</p>`); paragraph = []; } };
  const flushL = () => { if (list) { output.push(`<${list.type}>${list.items.map((item) => `<li>${inline(item)}</li>`).join('')}</${list.type}>`); list = null; } };
  for (const line of norm(markdown).split('\n')) {
    const ordered = line.match(/^\d+\.\s+(.+)$/);
    const unordered = line.match(/^-\s+(.+)$/);
    if (!line.trim()) { flushP(); flushL(); continue; }
    if (ordered || unordered) {
      flushP();
      const type = ordered ? 'ol' : 'ul';
      if (list?.type !== type) flushL();
      list ||= { type, items: [] };
      list.items.push((ordered || unordered)[1]);
      continue;
    }
    flushL();
    paragraph.push(line.trim());
  }
  flushP(); flushL();
  return output.join('\n');
}

function article(markdown) {
  const matches = [...markdown.matchAll(/^###\s+(.+)$/gm)];
  if (!matches.length) return [{ heading: null, body_markdown: norm(markdown), body_html: blocks(markdown) }];
  const out = [];
  const intro = norm(markdown.slice(0, matches[0].index));
  if (intro) out.push({ heading: null, body_markdown: intro, body_html: blocks(intro) });
  matches.forEach((match, i) => {
    const body = norm(markdown.slice(match.index + match[0].length, matches[i + 1]?.index ?? markdown.length));
    out.push({ heading: match[1].trim(), body_markdown: body, body_html: blocks(body) });
  });
  return out;
}

function fields(markdown) {
  const out = {};
  for (const line of norm(markdown).split('\n')) {
    const match = line.match(/^-\s+([^:]+):\s*(.*)$/);
    if (match) out[key(match[1])] = match[2].trim();
  }
  return out;
}

function subcategories(markdown) {
  const subs = [...markdown.matchAll(/^###\s+Subcategory:\s+(.+)$/gm)];
  return subs.map((sub, i) => {
    const body = markdown.slice(sub.index + sub[0].length, subs[i + 1]?.index ?? markdown.length);
    const matches = [...body.matchAll(/^####\s+(MSC-GUIDE-\d{3})\s+\|\s+(.+)$/gm)];
    const cards = matches.map((match, j) => {
      const data = fields(body.slice(match.index + match[0].length, matches[j + 1]?.index ?? body.length));
      return {
        registry_id: data.registry_id || match[1],
        h1: data.approved_h1 || match[2].trim(),
        description: data.card_description,
        depth: data.depth,
        format: data.format,
        reading_time: data.estimated_reading_time,
        action_label: data.planned_action_label,
        status_note: data.status_note,
        active: false,
        url: null,
      };
    });
    return { name: sub[1].trim(), guide_ids: cards.map((card) => card.registry_id), cards };
  });
}

function terms(markdown) {
  return norm(markdown).split('\n').filter(Boolean).map((line) => {
    const match = line.match(/^-\s+\*\*(.+?):\*\*\s+(.+)$/);
    if (!match) throw new Error(`Invalid key term: ${line}`);
    return { term: match[1], definition: match[2] };
  });
}

function sources(markdown) {
  const matches = [...markdown.matchAll(/^\d+\.\s+\*\*(.+?)\*\*$/gm)];
  return matches.map((match, i) => {
    const data = {};
    const body = norm(markdown.slice(match.index + match[0].length, matches[i + 1]?.index ?? markdown.length));
    for (const line of body.split('\n')) {
      const field = line.match(/^\s*([^:]+):\s*(.*)$/);
      if (field) data[key(field[1])] = field[2].trim();
    }
    return { title: match[1].trim(), ...data };
  });
}

function headingRecords(markdown, pattern) {
  const matches = [...markdown.matchAll(pattern)];
  return matches.map((match, i) => ({ title: match[1].trim(), ...fields(markdown.slice(match.index + match[0].length, matches[i + 1]?.index ?? markdown.length)) }));
}

function checklist(markdown) {
  return norm(markdown).split('\n').filter(Boolean).map((line) => {
    const match = line.match(/^-\s+\[([ xX])\]\s+(.+)$/);
    if (!match) throw new Error(`Invalid checklist item: ${line}`);
    return { checked: match[1].toLowerCase() === 'x', statement: match[2] };
  });
}

function human(markdown) {
  const notes = norm(markdown.split(/^- Notes:\s*$/m)[1] || '').split('\n').map((line) => line.match(/^\s*-\s+(.+)$/)?.[1]).filter(Boolean);
  return {
    reviewer: markdown.match(/^- Reviewer:\s*(.+)$/m)?.[1]?.trim() || null,
    review_date: markdown.match(/^- Review date:\s*(.+)$/m)?.[1]?.trim() || null,
    notes,
  };
}

const records = (registry) => Array.isArray(registry.records) ? registry.records : [];
const value = (object, names, fallback = '') => names.find((name) => object?.[name] !== undefined) ? object[names.find((name) => object?.[name] !== undefined)] : fallback;
const recordId = (record) => value(record, ['Registry ID', 'registry_id', 'id']);
const recordTitle = (record) => value(record, ['Final recommended H1', 'Final H1', 'Title', 'name']);
const refId = (input) => String(input || '').split('|')[0].trim();
const inactive = (id, byId) => id ? { registry_id: id, title: recordTitle(byId.get(id)), active: false, url: null } : null;

function refs(markdown) {
  return norm(markdown).split('\n').filter((line) => /^-\s+MSC-/.test(line)).map((line) => {
    const [registry_id, title] = line.replace(/^-\s+/, '').split('|').map((part) => part.trim());
    return { registry_id, title, active: false, url: null };
  });
}

function buildData() {
  const sourceText = read(SOURCE).replace(/\r\n/g, '\n');
  const registryText = read(REGISTRY);
  const manifestText = read(MANIFEST);
  const registry = JSON.parse(registryText);
  const manifest = JSON.parse(manifestText);
  const byId = new Map(records(registry).map((record) => [recordId(record), record]));
  const current = byId.get(ID);
  if (!current) throw new Error(`${ID} is missing from the master registry`);
  const manifestEntries = (manifest.entries || []).filter((entry) => entry.registry_id === ID);
  if (manifestEntries.length !== 1) throw new Error(`Expected one ${ID} manifest record`);
  const manifestEntry = manifestEntries[0];
  if (manifestEntry.content_file !== SOURCE || manifestEntry.status !== 'COPY_LOCKED') throw new Error('Manifest path or status mismatch');
  const parsed = frontmatter(sourceText);
  const sections = numbered(parsed.body);
  if (parsed.data.registry_id !== ID) throw new Error('Source registry ID mismatch');
  const groups = subcategories(sections.get(4));
  const registryGroups = value(current, ['Subcategory sections'], []);
  const guideIds = groups.flatMap((group) => group.guide_ids);
  const previousId = refId(value(current, ['Previous category', 'Previous guide']));
  const nextId = refId(value(current, ['Next category', 'Next guide']));
  const parentId = refId(value(current, ['Parent destination']));
  return {
    schema_version: 1,
    source: {
      file: SOURCE,
      sha256: crypto.createHash('sha256').update(sourceText).digest('hex'),
      registry_file: REGISTRY,
      registry_sha256: crypto.createHash('sha256').update(registryText).digest('hex'),
      manifest_file: MANIFEST,
      manifest_sha256: crypto.createHash('sha256').update(manifestText).digest('hex'),
      manifest_record: { registry_id: manifestEntry.registry_id, content_file: manifestEntry.content_file, status: manifestEntry.status },
    },
    registry_id: parsed.data.registry_id,
    status: parsed.data.status,
    page_role: parsed.data.page_role,
    h1: parsed.data.h1,
    introductory_deck: sections.get(1),
    article_sections: article(sections.get(2)),
    subcategories: groups,
    canonical_guide_ids: guideIds,
    key_terms: terms(sections.get(5)),
    sources: sources(sections.get(6)),
    seo_title: sections.get(7),
    meta_description: sections.get(8),
    excerpt: sections.get(9),
    reading_time: sections.get(10),
    relationships: {
      parent: inactive(parentId, byId),
      previous: previousId.startsWith('MSC-') ? inactive(previousId, byId) : null,
      next: inactive(nextId, byId),
      primary_path: inactive('MSC-PATH-START', byId),
      secondary_paths: ['MSC-PATH-SAFE', 'MSC-PATH-NETWORK'].map((id) => inactive(id, byId)),
      planned_internal_links: refs(sections.get(11)),
    },
    review: {
      reviewed_date: parsed.data.reviewed_date,
      copy_locked_date: parsed.data.copy_locked_date,
      human_verification: human(sections.get(13)),
      accuracy_checklist: checklist(sections.get(12)),
    },
    illustration_briefs: headingRecords(sections.get(14), /^###\s+(Illustration\s+\d+)$/gm),
    publication: { state: 'PREVIEW_ONLY', public_url: null, links_active: false, shopify_page_id: null },
    synchronization: {
      expected_subcategories: SUBS,
      expected_guide_ids: GUIDE_IDS,
      registry_subcategories: registryGroups.map((group) => group.display),
      registry_guide_ids: registryGroups.flatMap((group) => group.guide_ids || []),
    },
  };
}

function buildLiquid(data) {
  const body = data.article_sections.map((section) => `<section class="msc-learn-article__section">${section.heading ? `<h2>${esc(section.heading)}</h2>` : ''}\n${section.body_html}\n</section>`).join('\n');
  const groups = data.subcategories.map((group) => {
    const cards = group.cards.map((card) => `<article class="msc-learn-guide-card" data-msc-guide-id="${esc(card.registry_id)}" aria-disabled="true"><p class="msc-section-kicker">${esc(card.registry_id)}</p><h3>${esc(card.h1)}</h3><p>${esc(card.description)}</p><ul class="msc-learn-page-meta"><li>${esc(card.depth)}</li><li>${esc(card.format)}</li><li>${esc(card.reading_time)}</li></ul><p class="msc-learn-preview-note">${esc(card.action_label)} remains inactive until publication and URL confirmation.</p></article>`).join('\n');
    return `<section class="msc-learn-subcategory" data-msc-subcategory="${esc(group.name)}"><h2>${esc(group.name)}</h2><div class="msc-learn-card-grid">${cards}</div></section>`;
  }).join('\n');
  const termList = data.key_terms.map((item) => `<div class="msc-learn-term"><dt>${esc(item.term)}</dt><dd>${esc(item.definition)}</dd></div>`).join('\n');
  const sourceList = data.sources.map((item) => {
    const details = Object.entries(item).filter(([name]) => name !== 'title').map(([name, text]) => `<li><strong>${esc(name.replace(/_/g, ' '))}:</strong> ${name === 'repository_path' ? `<code>${esc(text.replace(/^`|`$/g, ''))}</code>` : esc(text)}</li>`).join('');
    return `<article class="msc-learn-source"><h3>${esc(item.title)}</h3><ul>${details}</ul></article>`;
  }).join('\n');
  const nav = [
    ['Previous category', data.relationships.previous?.title || 'Start of category sequence'],
    ['Parent', data.relationships.parent?.title || 'Learn'],
    ['Next category', data.relationships.next?.title || 'End of category sequence'],
    ['Primary path', data.relationships.primary_path?.title || 'Start With Bitcoin'],
  ].map(([label, title]) => `<span class="msc-learn-prev-next__item" aria-disabled="true"><span>${esc(label)}</span><strong>${esc(title)}</strong><small>Link inactive</small></span>`).join('');
  return `{% comment %}\n  Generated from ${SOURCE}.\n  Registry binding: ${data.registry_id}.\n  Preview only. Do not edit manually.\n  Rebuild with npm run build:learn-hub-pilot.\n{% endcomment %}\n<section class="msc-shell msc-learn-page" data-msc-registry-id="${data.registry_id}" data-msc-preview-only="true">\n  <div class="msc-container msc-learn-page__container">\n    <nav class="msc-learn-breadcrumbs" aria-label="Learn breadcrumbs"><ol><li><span>Learn</span></li><li aria-current="page"><span>${esc(data.h1)}</span></li></ol></nav>\n    <header class="msc-learn-page__header"><p class="msc-section-kicker">Category Hub</p><h1>${esc(data.h1)}</h1><p class="msc-learn-page__deck">${esc(data.introductory_deck)}</p><ul class="msc-learn-page-meta"><li>${data.subcategories.length} subcategories</li><li>${data.canonical_guide_ids.length} guides</li><li>${esc(data.reading_time)}</li><li>Reviewed ${esc(data.review.reviewed_date)}</li></ul><p class="msc-learn-preview-note">Preview only. Guide cards and navigation remain inactive because published destinations and confirmed URLs do not exist.</p></header>\n    <article class="msc-learn-article rte" data-msc-content-source="structured-runtime">${body}</article>\n    <section class="msc-learn-subcategories" aria-label="Bitcoin Basics guide preview">${groups}</section>\n    <section class="msc-learn-key-terms"><h2>Key Terms</h2><dl>${termList}</dl></section>\n    <section class="msc-learn-sources"><h2>Sources</h2>${sourceList}</section>\n    <nav class="msc-learn-prev-next" aria-label="Category navigation preview">${nav}</nav>\n  </div>\n</section>\n`;
}

function validate(data, jsonText, liquid) {
  const required = ['source', 'registry_id', 'h1', 'introductory_deck', 'article_sections', 'subcategories', 'canonical_guide_ids', 'key_terms', 'sources', 'seo_title', 'meta_description', 'excerpt', 'reading_time', 'relationships', 'review', 'illustration_briefs'];
  for (const field of required) if (data[field] === undefined || data[field] === null || data[field] === '') throw new Error(`Missing ${field}`);
  if (data.registry_id !== ID) throw new Error('Runtime registry ID mismatch');
  if (JSON.stringify(data.subcategories.map((group) => group.name)) !== JSON.stringify(SUBS)) throw new Error('Subcategory order mismatch');
  if (JSON.stringify(data.canonical_guide_ids) !== JSON.stringify(GUIDE_IDS)) throw new Error('Guide order mismatch');
  if (JSON.stringify(data.synchronization.registry_subcategories) !== JSON.stringify(SUBS)) throw new Error('Registry subcategory mismatch');
  if (JSON.stringify(data.synchronization.registry_guide_ids) !== JSON.stringify(GUIDE_IDS)) throw new Error('Registry guide mismatch');
  if (data.subcategories.some((group) => group.cards.length !== 4)) throw new Error('Each subcategory must contain four cards');
  if (data.subcategories.flatMap((group) => group.cards).some((card) => card.active || card.url !== null)) throw new Error('Guide cards must remain inactive');
  const rels = [data.relationships.parent, data.relationships.previous, data.relationships.next, data.relationships.primary_path, ...data.relationships.secondary_paths, ...data.relationships.planned_internal_links].filter(Boolean);
  if (rels.some((rel) => rel.active || rel.url !== null)) throw new Error('Relationships must remain inactive');
  if (data.publication.state !== 'PREVIEW_ONLY' || data.publication.public_url !== null || data.publication.links_active || data.publication.shopify_page_id !== null) throw new Error('Publication must remain preview-only');
  if (data.illustration_briefs.length !== 3 || data.illustration_briefs.some((brief) => brief.status !== 'PLANNED')) throw new Error('Illustration briefs are incomplete');
  if (!data.review.accuracy_checklist.every((item) => item.checked)) throw new Error('Accuracy checklist is incomplete');
  if (/<a\b|\bhref\s*=|page\.content|page\.handle/i.test(liquid)) throw new Error('Liquid activates a link or uses page content/handle');
  if (/id=["'][^"']*(foundations|using-bitcoin|security|essentials)/i.test(liquid)) throw new Error('Planning anchors must not render');
  if (/illustration|placeholder/i.test(liquid)) throw new Error('Illustration or placeholder output must not render');
  const section = read(SECTION);
  if (/page\.content|page\.handle|<a\b|\bhref\s*=/.test(section)) throw new Error('Category section contains disallowed rendering');
  if (!section.includes('section.settings.registry_id') || !section.includes(`when '${ID}'`)) throw new Error('Category section is not registry-bound');
  const template = JSON.parse(read(TEMPLATE));
  if (template.sections?.main?.settings?.registry_id !== ID) throw new Error('Category template registry binding mismatch');
  const next = buildData();
  if (jsonText !== `${JSON.stringify(next, null, 2)}\n` || liquid !== buildLiquid(next)) throw new Error('Generation is not deterministic');
}

const data = buildData();
const jsonText = `${JSON.stringify(data, null, 2)}\n`;
const liquid = buildLiquid(data);
if (CHECK) {
  if (!fs.existsSync(JSON_OUT) || read(JSON_OUT) !== jsonText) throw new Error(`${JSON_OUT} is not synchronized`);
  if (!fs.existsSync(LIQUID_OUT) || read(LIQUID_OUT) !== liquid) throw new Error(`${LIQUID_OUT} is not synchronized`);
  validate(data, jsonText, liquid);
  console.log('MSC Bitcoin Basics hub runtime pilot validation passed.');
} else {
  fs.mkdirSync(path.dirname(JSON_OUT), { recursive: true });
  fs.writeFileSync(JSON_OUT, jsonText);
  fs.writeFileSync(LIQUID_OUT, liquid);
  console.log(`Generated ${JSON_OUT} and ${LIQUID_OUT}.`);
}
