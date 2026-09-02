import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = process.cwd();
const EXPLORE_ROOT = path.join(ROOT, 'docs', 'explore');
const MASTER_PATH = path.join(EXPLORE_ROOT, 'master', 'MSC_Explore_Master_Registry.json');
const FAVORITES_PATH = path.join(ROOT, 'config', 'explore', 'msc-editorial.json');
const DESTINATIONS_PATH = path.join(ROOT, 'config', 'explore', 'charted-destinations.json');
const ROUTES_PATH = path.join(ROOT, 'config', 'explore', 'routes.json');
const RUNTIME_PATH = path.join(ROOT, 'assets', 'msc-explore-runtime.json');
const ROUTE_MANIFEST_PATH = path.join(EXPLORE_ROOT, 'integration', 'MSC_Explore_Route_Manifest.json');
const VALIDATION_PATH = path.join(EXPLORE_ROOT, 'integration', 'MSC_Explore_Validation_Report.json');
const checkOnly = process.argv.includes('--check');

const CATEGORIES = ['ORDINALS','RUNES','WALLETS','MARKETPLACES','MINING','PAYMENTS','EXCHANGES','NETWORK'];
const STATUS_VALUES = new Set(['ACTIVE','HISTORICAL','INACTIVE','UNCERTAIN']);
const CONFIDENCE_VALUES = new Set(['HIGH','MEDIUM','LOW']);
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const failures = [];
const warnings = [];

const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const stable = (value) => `${JSON.stringify(value, null, 2)}\n`;
const asArray = (value) => Array.isArray(value) ? value : (value == null || value === '' ? [] : [value]);
const cleanText = (value) => typeof value === 'string' ? value.trim() : value;
const caseKey = (value) => String(value || '').trim().toLocaleLowerCase('en-US');
const unique = (values) => [...new Set(values)];
const findField = (record, suffix) => Object.entries(record).find(([key]) => key.toLowerCase().endsWith(suffix))?.[1] ?? '';
const sourceList = (value) => asArray(value).map((source) => ({
  label: cleanText(source?.label || ''),
  url: cleanText(source?.url || ''),
  source_type: cleanText(source?.source_type || '')
})).filter((source) => source.url);

const master = readJson(MASTER_PATH);
const favoritesConfig = readJson(FAVORITES_PATH);
const destinationsConfig = readJson(DESTINATIONS_PATH);
const routesConfig = readJson(ROUTES_PATH);
const sourceRows = master.approved_sources || [];
const sourceColumns = master.approved_sources_columns || [];
const sourceIndex = Object.fromEntries(sourceColumns.map((name, index) => [name, index]));
const approvedSources = new Map(sourceRows.map((row) => [row[sourceIndex.category], {
  category: row[sourceIndex.category],
  branch: row[sourceIndex.branch],
  approved_head: row[sourceIndex.approved_head],
  imported_path: row[sourceIndex.imported_path],
  imported_tree_sha: row[sourceIndex.imported_tree_sha],
  record_count: row[sourceIndex.record_count]
}]));
for (const category of CATEGORIES) if (!approvedSources.has(category)) failures.push(`Master approved source missing category ${category}`);

const gitTreeSha = (repoPath) => {
  try { return execFileSync('git', ['rev-parse', `HEAD:${repoPath}`], { encoding: 'utf8' }).trim(); }
  catch { return null; }
};

const records = [];
for (const category of CATEGORIES) {
  const recordsDir = path.join(EXPLORE_ROOT, category.toLowerCase(), 'records');
  if (!fs.existsSync(recordsDir)) { failures.push(`Missing record directory ${path.relative(ROOT, recordsDir)}`); continue; }
  const categoryItems = fs.readdirSync(recordsDir).filter((name) => name.endsWith('.json')).sort().flatMap((name) => {
    const doc = readJson(path.join(recordsDir, name));
    if (!Array.isArray(doc.records)) { failures.push(`Shard ${name} has no records array`); return []; }
    return doc.records;
  });
  records.push(...categoryItems);
  const source = approvedSources.get(category);
  if (source && categoryItems.length !== source.record_count) failures.push(`${category} expected ${source.record_count} records from master, found ${categoryItems.length}`);
  if (source) {
    const actualTree = gitTreeSha(`docs/explore/${category.toLowerCase()}`);
    if (!actualTree) warnings.push(`${category} tree SHA could not be read outside a committed Git checkout`);
    else if (actualTree !== source.imported_tree_sha) failures.push(`${category} snapshot tree changed: expected ${source.imported_tree_sha}, found ${actualTree}`);
  }
}
if (records.length !== master?.counts?.total_records) failures.push(`Master total_records=${master?.counts?.total_records}; imported shards contain ${records.length}`);

const byId = new Map();
const byName = new Map();
const bySlug = new Map();
for (const record of records) {
  const id = cleanText(record['Registry ID']);
  const name = cleanText(record['Canonical name']);
  const slug = cleanText(record['Recommended slug']);
  const category = cleanText(record['Primary Explore category']);
  const status = cleanText(record.Status);
  const confidence = cleanText(record['Source confidence']);
  if (!id) failures.push(`Record missing Registry ID: ${name || '<unnamed>'}`);
  if (id && byId.has(id)) failures.push(`Duplicate Registry ID ${id}`);
  if (id) byId.set(id, record);
  if (!name) failures.push(`Record ${id || '<unknown>'} missing Canonical name`);
  const nameKey = caseKey(name);
  if (nameKey && byName.has(nameKey)) failures.push(`Duplicate canonical name ${name}`);
  if (nameKey) byName.set(nameKey, record);
  if (!slug || !slugPattern.test(slug)) failures.push(`Record ${id} has invalid Recommended slug ${JSON.stringify(slug)}`);
  if (slug && bySlug.has(slug)) failures.push(`Duplicate Recommended slug ${slug}`);
  if (slug) bySlug.set(slug, record);
  if (!CATEGORIES.includes(category)) failures.push(`Record ${id} has invalid category ${category}`);
  if (!STATUS_VALUES.has(status)) failures.push(`Record ${id} has invalid status ${status}`);
  if (!CONFIDENCE_VALUES.has(confidence)) failures.push(`Record ${id} has invalid source confidence ${confidence}`);
}

const counts = {
  by_category: Object.fromEntries(CATEGORIES.map((category) => [category, 0])),
  by_status: Object.fromEntries([...STATUS_VALUES].map((status) => [status, 0])),
  by_source_confidence: Object.fromEntries([...CONFIDENCE_VALUES].map((confidence) => [confidence, 0]))
};
for (const record of records) {
  if (counts.by_category[record['Primary Explore category']] !== undefined) counts.by_category[record['Primary Explore category']] += 1;
  if (counts.by_status[record.Status] !== undefined) counts.by_status[record.Status] += 1;
  if (counts.by_source_confidence[record['Source confidence']] !== undefined) counts.by_source_confidence[record['Source confidence']] += 1;
}
for (const [label, actual] of Object.entries(counts)) {
  const expected = master?.counts?.[label] || {};
  if (stable(actual) !== stable(expected)) failures.push(`Aggregate ${label} does not match master registry`);
}

const relationshipStats = { source_labels: 0, resolved: 0, unresolved: 0 };
const unresolvedRelationships = [];
const resolveRelationship = (label, sourceId) => {
  relationshipStats.source_labels += 1;
  const candidate = byName.get(caseKey(label));
  if (candidate) { relationshipStats.resolved += 1; return candidate['Registry ID']; }
  relationshipStats.unresolved += 1;
  unresolvedRelationships.push({ source_registry_id: sourceId, label });
  return null;
};

const editorialById = new Map();
for (const entry of favoritesConfig.favorites || []) {
  const target = byId.get(entry.registry_id);
  if (!target) { failures.push(`Editorial favorite target does not resolve: ${entry.registry_id}`); continue; }
  if (entry.expected_name && target['Canonical name'] !== entry.expected_name) { failures.push(`Editorial favorite ${entry.registry_id} expected ${entry.expected_name}, found ${target['Canonical name']}`); continue; }
  if (editorialById.has(entry.registry_id)) failures.push(`Duplicate editorial favorite mapping ${entry.registry_id}`);
  editorialById.set(entry.registry_id, { featured: true, label: entry.label || favoritesConfig.default_label || 'MSC Favorite', reason_type: entry.reason_type || 'editorial_preference' });
}

const destinationIds = [];
for (const category of CATEGORIES) {
  const entries = destinationsConfig.regions?.[category] || [];
  if (!Array.isArray(entries)) { failures.push(`Charted destination region ${category} must be an array`); continue; }
  for (const entry of entries) {
    destinationIds.push(entry.registry_id);
    const target = byId.get(entry.registry_id);
    if (!target) failures.push(`Charted destination does not resolve: ${entry.registry_id}`);
    else if (target['Primary Explore category'] !== category) failures.push(`Charted destination ${entry.registry_id} belongs to ${target['Primary Explore category']}, not ${category}`);
  }
}
if (new Set(destinationIds).size !== destinationIds.length) failures.push('Charted destination config contains duplicate Registry IDs');

const categoryHandles = routesConfig.category_handles || {};
const reservedHandles = new Set(routesConfig.reserved_handles || []);
const routeHandles = new Map();
const addRoute = (handle, kind, id) => {
  if (!handle || !slugPattern.test(handle)) failures.push(`Invalid ${kind} route handle ${handle}`);
  if (reservedHandles.has(handle)) failures.push(`Planned ${kind} route collides with reserved handle ${handle}`);
  if (routeHandles.has(handle)) failures.push(`Duplicate planned route handle ${handle} (${routeHandles.get(handle)} and ${id})`);
  routeHandles.set(handle, id);
};
for (const category of CATEGORIES) addRoute(categoryHandles[category], 'category', category);

const runtimeRecords = records.map((record) => {
  const id = record['Registry ID'];
  const relatedLabels = unique(asArray(record['Related projects / entities']).map(cleanText).filter(Boolean));
  const resolvedIds = unique(relatedLabels.map((label) => resolveRelationship(label, id)).filter(Boolean));
  const unresolvedLabels = relatedLabels.filter((label) => !byName.has(caseKey(label)));
  const sourceSlug = record['Recommended slug'];
  const handle = `${routesConfig.profile_prefix || 'explore-'}${sourceSlug}`;
  addRoute(handle, 'profile', id);
  return {
    registry_id: id,
    canonical_name: record['Canonical name'],
    canonical_category: record['Primary Explore category'],
    topic: cleanText(findField(record, ' topic')),
    subtopic: cleanText(findField(record, ' subtopic')),
    entity_type: cleanText(record['Entity / project type']),
    lifecycle_status: record.Status,
    source_confidence: record['Source confidence'],
    recommended_slug: sourceSlug,
    route_handle: handle,
    route: `/pages/${handle}`,
    concise_description: cleanText(record['Concise description']),
    supporting_tags: unique(asArray(record['Supporting tags']).map(cleanText).filter(Boolean)),
    official_website: cleanText(record['Official website']),
    official_sources: sourceList(record['Official sources']),
    last_verified_date: cleanText(record['Last verified date']),
    related_registry_ids: resolvedIds,
    unresolved_related_entity_labels: unresolvedLabels,
    related_explore_categories: unique(asArray(record['Related Explore categories']).map(cleanText).filter((category) => CATEGORIES.includes(category))),
    publication: { public_ready: false, gate: 'COPY_REVIEW_AND_CURRENT_REVERIFICATION_REQUIRED' },
    msc_editorial: editorialById.get(id) || null
  };
}).sort((a, b) => a.registry_id.localeCompare(b.registry_id));

for (const item of runtimeRecords) for (const targetId of item.related_registry_ids) if (!byId.has(targetId)) failures.push(`Runtime relationship target does not resolve: ${item.registry_id} -> ${targetId}`);
const strike = byId.get('MSC-EXP-PAY-003');
if (!strike || strike['Canonical name'] !== 'Strike' || strike['Primary Explore category'] !== 'PAYMENTS') failures.push('Locked Strike canonical home regression: MSC-EXP-PAY-003 must resolve to PAYMENTS / Strike');
if (byId.has('MSC-EXP-EXC-003')) failures.push('Locked Strike duplicate-profile regression: MSC-EXP-EXC-003 must remain unused');
for (const override of master?.reconciliation?.canonical_home_overrides || []) {
  const sourceRecord = byId.get(override.source_record);
  if (!sourceRecord) failures.push(`Master canonical-home override source does not resolve: ${override.source_record}`);
  else if (sourceRecord['Primary Explore category'] !== override.canonical_home) failures.push(`Canonical-home override mismatch for ${override.entity}`);
}

const routeManifest = {
  generated_from: { master_registry: 'docs/explore/master/MSC_Explore_Master_Registry.json', reconciled_branch: master.integration_state?.branch || 'explore/master-registry-reconciliation', reconciled_head: '0660722076f654dd0cf88b074285c3a47900bb95', source_model: master.source_model?.type || 'federated' },
  shopify_constraint: { clean_page_routes_require_page_objects: true, page_objects_created_by_stage_1: false, deployment_rule: 'Do not claim a route exists until its Shopify Page object is created and assigned the planned template.' },
  category_routes: CATEGORIES.map((category) => ({ category, handle: categoryHandles[category], route: `/pages/${categoryHandles[category]}`, planned_template_suffix: routesConfig.category_template_suffix || 'explore-category', shopify_page_object_required: true })),
  profile_routes: runtimeRecords.map((record) => ({ registry_id: record.registry_id, canonical_name: record.canonical_name, canonical_category: record.canonical_category, handle: record.route_handle, route: record.route, planned_template_suffix: routesConfig.profile_template_suffix || 'explore-profile', shopify_page_object_required: true, public_ready: record.publication.public_ready }))
};

const runtime = {
  schema_version: 1,
  source_model: 'federated-generated-runtime',
  generated_from: { master_registry: 'docs/explore/master/MSC_Explore_Master_Registry.json', reconciled_head: '0660722076f654dd0cf88b074285c3a47900bb95', category_sources: Object.fromEntries(CATEGORIES.map((category) => [category, approvedSources.get(category)])) },
  publication_rule: 'Registry inclusion is not public-copy approval. Stage 1 emits no public_ready profiles.',
  counts: { total_records: runtimeRecords.length, ...counts },
  editorial: { default_label: favoritesConfig.default_label || 'MSC Favorite', favorite_registry_ids: [...editorialById.keys()].sort() },
  charted_destinations: Object.fromEntries(CATEGORIES.map((category) => [category, (destinationsConfig.regions?.[category] || []).map((entry) => entry.registry_id)])),
  categories: CATEGORIES.map((category) => ({ category, route_handle: categoryHandles[category], route: `/pages/${categoryHandles[category]}`, record_count: counts.by_category[category] })),
  records: runtimeRecords
};

const report = {
  status: failures.length ? 'FAIL' : 'PASS',
  generated_at: 'DETERMINISTIC_NO_TIMESTAMP',
  source: { main_base_expected_for_stage_1: '2d4f6f5858ca9eb8c3229c8b03e69e4695bce252', reconciled_registry_head: '0660722076f654dd0cf88b074285c3a47900bb95', approved_category_sources: Object.fromEntries(CATEGORIES.map((category) => [category, approvedSources.get(category)])) },
  checks: {
    canonical_record_count: runtimeRecords.length,
    expected_canonical_record_count: master?.counts?.total_records,
    unique_registry_ids: byId.size === runtimeRecords.length,
    unique_canonical_names: byName.size === runtimeRecords.length,
    unique_recommended_slugs: bySlug.size === runtimeRecords.length,
    route_handle_count: routeHandles.size,
    route_collisions: failures.filter((item) => item.includes('route')).length,
    lifecycle_counts: counts.by_status,
    source_confidence_counts: counts.by_source_confidence,
    category_counts: counts.by_category,
    relationship_source_labels: relationshipStats.source_labels,
    relationship_targets_resolved: relationshipStats.resolved,
    relationship_labels_preserved_unresolved: relationshipStats.unresolved,
    favorite_targets_expected: (favoritesConfig.favorites || []).length,
    favorite_targets_resolved: editorialById.size,
    charted_destination_targets: destinationIds.length,
    charted_destination_targets_resolved: destinationIds.filter((id) => byId.has(id)).length,
    strike_canonical_home_locked: Boolean(strike && strike['Canonical name'] === 'Strike' && strike['Primary Explore category'] === 'PAYMENTS' && !byId.has('MSC-EXP-EXC-003')),
    all_profiles_public_ready: false,
    category_snapshot_tree_validation: 'enforced in committed Git checkout via approved imported_tree_sha values'
  },
  unresolved_relationships: unresolvedRelationships.sort((a, b) => a.source_registry_id.localeCompare(b.source_registry_id) || a.label.localeCompare(b.label)),
  publication_gates: { master: master.publication_gates, stage_1_rule: 'All generated profiles remain public_ready=false. Current-claim re-verification and public copy approval are deferred to later stages.' },
  warnings,
  failures
};

const outputs = [[RUNTIME_PATH, stable(runtime)],[ROUTE_MANIFEST_PATH, stable(routeManifest)],[VALIDATION_PATH, stable(report)]];
if (checkOnly) {
  for (const [file, expected] of outputs) {
    if (!fs.existsSync(file)) failures.push(`Generated artifact missing: ${path.relative(ROOT, file)}`);
    else if (fs.readFileSync(file, 'utf8') !== expected) failures.push(`Generated artifact is stale: ${path.relative(ROOT, file)}`);
  }
} else {
  for (const [file, content] of outputs) { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, content); }
}
if (failures.length) {
  console.error(`MSC Explore runtime validation failed (${failures.length}):`);
  for (const item of failures) console.error(`- ${item}`);
  process.exit(1);
}
console.log(`MSC Explore runtime validation passed: ${runtimeRecords.length} canonical records, ${bySlug.size} unique slugs, ${editorialById.size} editorial favorites, ${relationshipStats.resolved} resolved relationship labels, ${relationshipStats.unresolved} unresolved labels preserved.`);
