import fs from 'fs';

const registryPath = 'docs/learn/MSC_Learn_Master_Registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const validateOnly = process.argv.includes('--validate-only');
const fail = [];
const FIELD = '[[MSC_FIELD]]';
const LIST = '[[MSC_LIST]]';
const HEADER = `{% comment %}\n  Generated file.\n  Source: approved JSON at docs/learn/MSC_Learn_Master_Registry.json.\n  Do not edit manually.\n  Rebuild command: npm run build:learn-data.\n{% endcomment %}\n`;

const valueOf = (obj, names, fallback = '') => {
  for (const name of names) if (obj && obj[name] !== undefined && obj[name] !== null) return obj[name];
  return fallback;
};
const asArray = (v) => Array.isArray(v) ? v : (v ? [v] : []);
const slugify = (v) => String(v || '').toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const records = Array.isArray(registry.records)
  ? registry.records
  : [registry.homepage, registry.glossary_index, registry.featured_route, ...(registry.categories || []), ...(registry.learning_paths || []), ...(registry.topic_guides || [])].filter(Boolean);
const recordId = (r) => valueOf(r, ['Registry ID', 'registry_id', 'id']);
const role = (r) => valueOf(r, ['Page role', 'page_role', 'type']);
const handle = (r) => valueOf(r, ['Recommended slug', 'recommended_slug', 'planned_slug']);
const title = (r) => valueOf(r, ['Final recommended H1', 'Final H1', 'Recommended title', 'Title', 'name', 'final_h1']);
const status = (r) => valueOf(r, ['Planning status', 'Status', 'status'], 'PLANNED');
const isRole = (r, needle) => String(role(r)).includes(needle);
const guides = records.filter((r) => isRole(r, 'topic-guide') || role(r) === 'topic_guide');
const cats = records.filter((r) => isRole(r, 'category-hub') || role(r) === 'category_hub');
const paths = records.filter((r) => isRole(r, 'learning-path') || role(r) === 'learning_path');
const home = records.find((r) => isRole(r, 'learn-home')) || registry.homepage;
const route = records.find((r) => isRole(r, 'featured-route') || role(r) === 'featured_route') || registry.featured_route;
const glossaryRecord = records.find((r) => isRole(r, 'glossary-index') || role(r) === 'glossary_index') || registry.glossary_index;
const refId = (v) => String(v || '').split('|')[0].trim();
const byId = new Map(records.map((r) => [recordId(r), r]));
const guideById = new Map(guides.map((r) => [recordId(r), r]));
const byHandle = new Map(records.map((r) => [handle(r), r]));

const categoryOrder = asArray(valueOf(registry.navigation || {}, ['category_order'], cats.map(recordId)));
const canonicalTopicOrder = asArray(valueOf(registry.navigation || {}, ['canonical_topic_order'], guides.map(recordId)));
const learningPathSequences = valueOf(registry.navigation || {}, ['learning_path_sequences'], {});
const featuredRouteSteps = asArray(valueOf(registry.navigation || {}, ['featured_route_steps'], valueOf(route, ['steps'], [])));
const glossary = asArray(valueOf(glossaryRecord, ['Initial glossary term map'], registry.glossary || []));

const ids = new Set();
const slugs = new Set();
for (const r of records) {
  const id = recordId(r);
  const slug = handle(r);
  if (!id) fail.push('Record missing Registry ID');
  if (ids.has(id)) fail.push(`Duplicate registry ID ${id}`);
  ids.add(id);
  if (!slug) fail.push(`Record ${id} missing Recommended slug`);
  if (slug && slugs.has(slug)) fail.push(`Duplicate planned slug ${slug}`);
  if (slug) slugs.add(slug);
  if (String(status(r)).toUpperCase() !== 'PLANNED') fail.push(`Record ${id} is not PLANNED`);
}
if (records.length !== 93) fail.push(`Expected 93 records, found ${records.length}`);
if (guides.length !== 80) fail.push(`Expected 80 topic guides, found ${guides.length}`);
if (cats.length !== 5) fail.push(`Expected 5 category hubs, found ${cats.length}`);
if (paths.length !== 5) fail.push(`Expected 5 learning paths, found ${paths.length}`);
if (!home || title(home) !== 'Learn How Bitcoin Moves') fail.push('Learn homepage H1 is not Learn How Bitcoin Moves');
if (!registry.registry_wide_rules) fail.push('Registry wide rules missing');
if (glossary.length !== 141) fail.push(`Expected 141 glossary terms, found ${glossary.length}`);
for (const id of ['MSC-LRN-HOME','MSC-HUB-BASICS','MSC-HUB-NETWORK','MSC-HUB-BUILDING','MSC-HUB-DEVELOPMENT','MSC-HUB-ECOSYSTEM','MSC-PATH-START','MSC-PATH-SAFE','MSC-PATH-NETWORK','MSC-PATH-BUILD','MSC-PATH-ECOSYSTEM','MSC-ROUTE-001','MSC-GLOSSARY-001']) if (!byId.has(id)) fail.push(`Missing approved ID ${id}`);
for (let i = 1; i <= 80; i += 1) if (!byId.has(`MSC-GUIDE-${String(i).padStart(3, '0')}`)) fail.push(`Missing MSC-GUIDE-${String(i).padStart(3, '0')}`);
if (new Set(canonicalTopicOrder).size !== 80 || canonicalTopicOrder.length !== 80) fail.push('Canonical topic order must contain 80 unique guides');
for (const id of canonicalTopicOrder) if (!guideById.has(id)) fail.push(`Canonical topic order ID does not resolve ${id}`);

const categoryRecordForGuide = (g) => byId.get(refId(valueOf(g, ['Parent destination', 'Canonical category', 'Parent category ID', 'parent_category_id'])));
const categoryHandleForGuide = (g) => valueOf(g, ['Parent category handle', 'parent_category_handle'], handle(categoryRecordForGuide(g)));
const categoryLabelForGuide = (g) => valueOf(g, ['Parent category label', 'Parent category name', 'parent_category_name'], title(categoryRecordForGuide(g)) || valueOf(g, ['Primary Learn category']));
const subcatForGuide = (g) => {
  const explicit = valueOf(g, ['Canonical subcategory', 'Subcategory', 'subcategory_name']);
  if (explicit && explicit !== 'Not applicable') return explicit;
  const anchor = valueOf(g, ['Subcategory anchor']);
  if (anchor && anchor !== 'Not applicable') return String(anchor).replace(/^#/, '').split('-').map((part) => part ? part[0].toUpperCase() + part.slice(1) : part).join(' ');
  return '';
};
const depth = (r) => valueOf(r, ['Depth level', 'Approved depth range', 'depth_level', 'depth_range']);
const format = (r) => valueOf(r, ['Format', 'Content format', 'content_format']);

const canonIndex = new Map(canonicalTopicOrder.map((id, idx) => [id, idx]));
for (const g of guides) {
  if (!categoryHandleForGuide(g)) fail.push(`Topic guide missing canonical category ${recordId(g)}`);
  if (!subcatForGuide(g)) fail.push(`Topic guide missing canonical subcategory ${recordId(g)}`);
}
for (const c of cats) {
  const sections = valueOf(c, ['Subcategory sections'], null);
  const idsInCat = Array.isArray(sections)
    ? sections.flatMap((section) => asArray(section.guide_ids).map(refId))
    : sections ? Object.values(sections).flatMap(asArray).map(refId) : asArray(valueOf(c, ['guide_ids', 'Canonical guide sequence'], [])).map(refId);
  for (const id of idsInCat) if (!guideById.has(id)) fail.push(`Category guide ID does not resolve ${id}`);
}
for (const p of paths) {
  const id = recordId(p);
  const sequence = asArray(learningPathSequences[title(p)] || learningPathSequences[id] || learningPathSequences[handle(p)] || valueOf(p, ['Recommended sequence', 'guide_ids'], [])).map(refId);
  for (const destId of sequence) if (!byId.has(destId)) fail.push(`Learning path destination does not resolve ${id}: ${destId}`);
  if (!depth(p)) fail.push(`Learning path depth range missing ${id}`);
  if (!valueOf(p, ['Category relationships', 'category_relationships', 'related_category_handles'], null)) fail.push(`Learning path category relationships missing ${id}`);
}
for (const t of glossary) {
  const destId = refId(valueOf(t, ['canonical guide', 'canonical_guide_id', 'Canonical guide', 'canonical destination', 'canonical_destination_id']));
  if (destId && !byId.has(destId)) fail.push(`Glossary canonical destination does not resolve ${valueOf(t, ['term'])}`);
}
const text = JSON.stringify(registry);
if (text.includes('\u2014')) fail.push('Em dash found');
if (text.includes('\u2013')) fail.push('En dash found');
if (fail.length) { console.error(fail.join('\n')); process.exit(1); }
if (validateOnly) { console.log('MSC Learn approved registry validation passed: 93 records, 80 topic guides, 5 category hubs, 5 learning paths, 141 glossary terms.'); process.exit(0); }

function clean(v) {
  const s = Array.isArray(v) ? v.join(LIST) : String(v ?? '');
  if (s.includes(FIELD) || s.includes('\n') || s.includes('\r')) throw new Error(`Generated field contains reserved delimiter or newline: ${s}`);
  return s;
}
function writeRows(file, rows) { fs.writeFileSync(file, HEADER + rows.map((row) => row.map(clean).join(FIELD)).join('\n') + '\n'); }
fs.mkdirSync('snippets', { recursive: true });
writeRows('snippets/msc-learn-guide-data.liquid', guides.map((g) => {
  const id = recordId(g); const idx = canonIndex.get(id);
  const prev = idx > 0 ? canonicalTopicOrder[idx - 1] : '';
  const next = idx < canonicalTopicOrder.length - 1 ? canonicalTopicOrder[idx + 1] : '';
  return [id, handle(g), title(g), categoryHandleForGuide(g), categoryLabelForGuide(g), subcatForGuide(g), slugify(subcatForGuide(g)), depth(g), format(g), prev, next, valueOf(g, ['Branch guide ID', 'branch_guide_id']), valueOf(g, ['Primary learning path', 'primary_learning_path']), asArray(valueOf(g, ['Secondary learning paths', 'secondary_learning_paths'], []))];
}));
writeRows('snippets/msc-learn-category-data.liquid', cats.map((c) => {
  const sections = valueOf(c, ['Subcategory sections'], null);
  const subNames = Array.isArray(sections) ? sections.map((section) => section.display) : sections ? Object.keys(sections) : asArray(valueOf(c, ['subcategory_names'], []));
  const anchors = Array.isArray(sections) ? sections.map((section) => String(section.anchor || slugify(section.display)).replace(/^#/, '')) : subNames.map(slugify);
  const idsInCat = Array.isArray(sections) ? sections.map((section) => asArray(section.guide_ids).map(refId).join(',')).join(LIST) : sections ? Object.values(sections).map((v) => asArray(v).map(refId).join(',')).join(LIST) : asArray(valueOf(c, ['guide_ids', 'Canonical guide sequence'], [])).map(refId).join(',');
  return [recordId(c), handle(c), title(c), subNames, anchors, idsInCat, valueOf(c, ['Previous category', 'previous_category_id']), valueOf(c, ['Next category', 'next_category_id']), asArray(valueOf(c, ['Related learning paths', 'related_learning_paths'], [])), depth(c)];
}));
writeRows('snippets/msc-learn-path-data.liquid', paths.map((p) => [recordId(p), handle(p), title(p), asArray(learningPathSequences[title(p)] || learningPathSequences[recordId(p)] || learningPathSequences[handle(p)] || valueOf(p, ['Recommended sequence', 'guide_ids'], [])).map(refId), asArray(valueOf(p, ['Category relationships', 'category_relationships', 'related_category_handles'], [])), depth(p), asArray(valueOf(p, ['Branching paths', 'branching_path_handles'], []))]));
writeRows('snippets/msc-learn-route-data.liquid', featuredRouteSteps.map((s, i) => { const destId = refId(valueOf(s, ['destination_id', 'guide_id'], '')); return [i + 1, valueOf(s, ['label'], s), destId, handle(byId.get(destId))]; }));
writeRows('snippets/msc-learn-glossary-data.liquid', glossary.map((t) => { const destId = refId(valueOf(t, ['canonical guide', 'canonical_guide_id', 'Canonical guide', 'canonical destination', 'canonical_destination_id'])); return [valueOf(t, ['term']), valueOf(t, ['concise definition', 'definition']), destId, handle(byId.get(destId))]; }));
console.log('MSC Learn data generated and validated: 80 guides, 5 categories, 5 paths, 13 route steps, 141 glossary terms.');
