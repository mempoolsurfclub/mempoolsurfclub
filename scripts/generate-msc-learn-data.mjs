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

const pathByTitle = new Map(paths.map((r) => [title(r), r]));
const pathHandles = new Set(paths.map(handle));
const categoryHandles = new Set(cats.map(handle));
const categorySectionForGuide = (g) => {
  const category = categoryRecordForGuide(g);
  const guideId = recordId(g);
  const sections = valueOf(category, ['Subcategory sections'], []);
  if (!Array.isArray(sections)) return null;
  return sections.find((section) => asArray(section.guide_ids).map(refId).includes(guideId)) || null;
};
const subcatAnchorForGuide = (g) => String(categorySectionForGuide(g)?.anchor || '').replace(/^#/, '');
const pathHandleFromLabel = (label) => handle(pathByTitle.get(String(label || '').trim()));
const pathHandlesFromLabels = (labels) => asArray(labels).map(pathHandleFromLabel).filter(Boolean);
const branchIdForGuide = (g) => {
  const raw = valueOf(g, ['Recommended branch guide', 'Branch guide ID', 'branch_guide_id']);
  const id = refId(raw);
  return byId.has(id) ? id : '';
};
const branchHandleForGuide = (g) => handle(byId.get(branchIdForGuide(g))) || '';
const categoryHandleFromRef = (v) => handle(byId.get(refId(v))) || '';
const categoryHandlesFromRefs = (refs) => asArray(refs).map(categoryHandleFromRef).filter(Boolean);
const branchPathHandles = (p) => asArray(valueOf(p, ['Branching paths', 'Branching opportunities', 'branching_path_handles'], [])).flatMap((item) => {
  const text = String(item || '');
  return paths.filter((candidate) => text.includes(title(candidate))).map(handle);
});

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
const subcatForGuide = (g) => categorySectionForGuide(g)?.display || valueOf(g, ['Learn subcategory', 'Canonical subcategory', 'Subcategory', 'subcategory_name']);
const depth = (r) => valueOf(r, ['Depth level', 'Approved depth range', 'depth_level', 'depth_range']);
const format = (r) => valueOf(r, ['Format', 'Content format', 'content_format']);

const canonIndex = new Map(canonicalTopicOrder.map((id, idx) => [id, idx]));
for (const g of guides) {
  const guideId = recordId(g);
  const section = categorySectionForGuide(g);
  if (!categoryHandleForGuide(g)) fail.push(`Topic guide missing canonical category ${guideId}`);
  if (!subcatForGuide(g)) fail.push(`Topic guide missing canonical subcategory ${guideId}`);
  if (!section) fail.push(`Topic guide subcategory section does not resolve ${guideId}`);
  if (section && subcatForGuide(g) !== section.display) fail.push(`Topic guide subcategory label mismatch ${guideId}`);
  if (section && subcatAnchorForGuide(g) !== String(section.anchor || '').replace(/^#/, '')) fail.push(`Topic guide subcategory anchor mismatch ${guideId}`);
  if (String(subcatForGuide(g)).includes('on planned hub slug')) fail.push(`Topic guide subcategory contains planning text ${guideId}`);
  const primaryPath = pathHandleFromLabel(valueOf(g, ['Primary learning path']));
  if (valueOf(g, ['Primary learning path']) && !primaryPath) fail.push(`Primary learning path does not resolve ${guideId}`);
  for (const secondary of asArray(valueOf(g, ['Secondary learning paths'], []))) if (!pathHandleFromLabel(secondary)) fail.push(`Secondary learning path does not resolve ${guideId}: ${secondary}`);
  const branchId = branchIdForGuide(g);
  if (branchId && !byId.has(branchId)) fail.push(`Branch guide ID does not resolve ${guideId}: ${branchId}`);
}
for (const c of cats) {
  const sections = valueOf(c, ['Subcategory sections'], null);
  const idsInCat = Array.isArray(sections)
    ? sections.flatMap((section) => asArray(section.guide_ids).map(refId))
    : sections ? Object.values(sections).flatMap(asArray).map(refId) : asArray(valueOf(c, ['guide_ids', 'Canonical guide sequence'], [])).map(refId);
  for (const id of idsInCat) if (!guideById.has(id)) fail.push(`Category guide ID does not resolve ${id}`);
  for (const ref of [valueOf(c, ['Previous category', 'previous_category_id']), valueOf(c, ['Next category', 'next_category_id'])]) {
    const normalized = categoryHandleFromRef(ref);
    if (refId(ref).startsWith('MSC-') && !normalized) fail.push(`Category navigation reference does not resolve ${recordId(c)}: ${ref}`);
  }
}
for (const p of paths) {
  const id = recordId(p);
  const sequence = asArray(learningPathSequences[title(p)] || learningPathSequences[id] || learningPathSequences[handle(p)] || valueOf(p, ['Recommended sequence', 'guide_ids'], [])).map(refId);
  for (const destId of sequence) if (!byId.has(destId)) fail.push(`Learning path destination does not resolve ${id}: ${destId}`);
  if (!depth(p)) fail.push(`Learning path depth range missing ${id}`);
  const categoryRelationshipHandles = categoryHandlesFromRefs(valueOf(p, ['Category relationships', 'category_relationships', 'related_category_handles'], []));
  if (!categoryRelationshipHandles.length) fail.push(`Learning path category relationships missing ${id}`);
  for (const categoryHandle of categoryRelationshipHandles) if (!categoryHandles.has(categoryHandle)) fail.push(`Learning path category relationship does not resolve ${id}: ${categoryHandle}`);
  for (const pathHandle of branchPathHandles(p)) if (!pathHandles.has(pathHandle)) fail.push(`Learning path branch does not resolve ${id}: ${pathHandle}`);
}
for (const t of glossary) {
  const destId = refId(valueOf(t, ['canonical guide', 'canonical_guide_id', 'Canonical guide', 'canonical destination', 'canonical_destination_id']));
  if (destId && !byId.has(destId)) fail.push(`Glossary canonical destination does not resolve ${valueOf(t, ['term'])}`);
}
const text = JSON.stringify(registry);
if (text.includes('\u2014')) fail.push('Em dash found');
if (text.includes('\u2013')) fail.push('En dash found');
if (fail.length) { console.error(fail.join('\n')); process.exit(1); }
if (validateOnly) { console.log('MSC Learn approved registry validation passed: 93 records, 80 topic guides, 5 category hubs, 5 learning paths, 13 route steps, 141 glossary terms.'); process.exit(0); }

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
  return [id, handle(g), title(g), categoryHandleForGuide(g), categoryLabelForGuide(g), subcatForGuide(g), subcatAnchorForGuide(g), depth(g), format(g), prev, next, branchIdForGuide(g), branchHandleForGuide(g), pathHandleFromLabel(valueOf(g, ['Primary learning path'])), pathHandlesFromLabels(valueOf(g, ['Secondary learning paths'], []))];
}));
writeRows('snippets/msc-learn-category-data.liquid', cats.map((c) => {
  const sections = valueOf(c, ['Subcategory sections'], null);
  const subNames = Array.isArray(sections) ? sections.map((section) => section.display) : sections ? Object.keys(sections) : asArray(valueOf(c, ['subcategory_names'], []));
  const anchors = Array.isArray(sections) ? sections.map((section) => String(section.anchor || slugify(section.display)).replace(/^#/, '')) : subNames.map(slugify);
  const idsInCat = Array.isArray(sections) ? sections.map((section) => asArray(section.guide_ids).map(refId).join(',')).join(LIST) : sections ? Object.values(sections).map((v) => asArray(v).map(refId).join(',')).join(LIST) : asArray(valueOf(c, ['guide_ids', 'Canonical guide sequence'], [])).map(refId).join(',');
  const canonicalSequence = asArray(valueOf(c, ['Canonical guide sequence'], [])).map(refId);
  return [recordId(c), handle(c), title(c), subNames, anchors, idsInCat, categoryHandleFromRef(valueOf(c, ['Previous category', 'previous_category_id'])), categoryHandleFromRef(valueOf(c, ['Next category', 'next_category_id'])), pathHandlesFromLabels([valueOf(c, ['Primary learning path']), ...asArray(valueOf(c, ['Secondary learning paths'], []))]), depth(c), canonicalSequence];
}));
writeRows('snippets/msc-learn-path-data.liquid', paths.map((p) => [recordId(p), handle(p), title(p), asArray(learningPathSequences[title(p)] || learningPathSequences[recordId(p)] || learningPathSequences[handle(p)] || valueOf(p, ['Recommended sequence', 'guide_ids'], [])).map(refId), categoryHandlesFromRefs(valueOf(p, ['Category relationships', 'category_relationships', 'related_category_handles'], [])), depth(p), branchPathHandles(p)]));
writeRows('snippets/msc-learn-route-data.liquid', featuredRouteSteps.map((s, i) => { const destId = refId(valueOf(s, ['destination_id', 'guide_id'], '')); return [i + 1, valueOf(s, ['label'], s), destId, handle(byId.get(destId))]; }));
writeRows('snippets/msc-learn-glossary-data.liquid', glossary.map((t) => { const destId = refId(valueOf(t, ['canonical guide', 'canonical_guide_id', 'Canonical guide', 'canonical destination', 'canonical_destination_id'])); return [valueOf(t, ['term']), valueOf(t, ['concise definition', 'definition']), destId, handle(byId.get(destId))]; }));
const generatedRows = (file) => fs.readFileSync(file, 'utf8').split('\n').filter((line) => line.includes(FIELD)).map((line) => line.split(FIELD));
for (const [file, expected] of Object.entries({
  'snippets/msc-learn-guide-data.liquid': 80,
  'snippets/msc-learn-category-data.liquid': 5,
  'snippets/msc-learn-path-data.liquid': 5,
  'snippets/msc-learn-route-data.liquid': 13,
  'snippets/msc-learn-glossary-data.liquid': 141,
})) {
  const rowCount = generatedRows(file).length;
  if (rowCount !== expected) throw new Error(`Generated row count mismatch for ${file}: expected ${expected}, got ${rowCount}`);
}
for (const row of generatedRows('snippets/msc-learn-guide-data.liquid')) {
  if (row[5].includes('on planned hub slug')) throw new Error(`Generated guide subcategory contains planning text ${row[0]}`);
  if (row[11] && !byId.has(row[11])) throw new Error(`Generated branch ID does not resolve ${row[0]}: ${row[11]}`);
  if (!row[11] && row[12]) throw new Error(`Generated blank branch ID has nonblank handle ${row[0]}: ${row[12]}`);
  if (row[11] && row[12] !== handle(byId.get(row[11]))) throw new Error(`Generated branch handle mismatch ${row[0]}: ${row[12]}`);
  if (row[13] && !pathHandles.has(row[13])) throw new Error(`Generated primary path handle does not resolve ${row[0]}: ${row[13]}`);
  for (const pathHandle of asArray(row[14] ? row[14].split(LIST) : [])) if (pathHandle && !pathHandles.has(pathHandle)) throw new Error(`Generated secondary path handle does not resolve ${row[0]}: ${pathHandle}`);
}
for (const [guideId, expectedHandle] of [['MSC-GUIDE-007', 'how-a-bitcoin-transaction-moves'], ['MSC-GUIDE-013', 'how-a-bitcoin-transaction-moves']]) {
  const row = generatedRows('snippets/msc-learn-guide-data.liquid').find((candidate) => candidate[0] === guideId);
  if (!row || row[11] !== 'MSC-ROUTE-001' || row[12] !== expectedHandle) throw new Error(`${guideId} branch route handle mismatch`);
}
for (const row of generatedRows('snippets/msc-learn-category-data.liquid')) {
  if (row[6] && !categoryHandles.has(row[6])) throw new Error(`Generated previous category handle does not resolve ${row[0]}: ${row[6]}`);
  if (row[7] && !categoryHandles.has(row[7])) throw new Error(`Generated next category handle does not resolve ${row[0]}: ${row[7]}`);
}
for (const row of generatedRows('snippets/msc-learn-path-data.liquid')) {
  for (const categoryHandle of asArray(row[4] ? row[4].split(LIST) : [])) if (categoryHandle && !categoryHandles.has(categoryHandle)) throw new Error(`Generated path category handle does not resolve ${row[0]}: ${categoryHandle}`);
}
console.log('MSC Learn data generated and validated: 80 guides, 5 categories, 5 paths, 13 route steps, 141 glossary terms.');
