import { canonicalRecordSha256 } from './hashing.mjs';

const ALIASES = {
  registry_id: ['Registry ID', 'registry_id', 'id'],
  h1: ['Final recommended H1', 'Final H1', 'Recommended title', 'Display label', 'Title', 'name', 'final_h1'],
  page_role: ['Page role', 'page_role'],
  planning_handle: ['Recommended slug', 'handle', 'Planning handle', 'planning_handle'],
  status: ['Status', 'status'],
};

function nonEmpty(value) {
  return value !== undefined && value !== null && value !== '';
}

function normalizeComparable(value) {
  return typeof value === 'string' ? value.trim() : JSON.stringify(value);
}

function resolveAliases(record, field, aliases) {
  const populated = aliases.filter((alias) => nonEmpty(record?.[alias])).map((alias) => ({ alias, value: record[alias] }));
  const distinct = [...new Set(populated.map((item) => normalizeComparable(item.value)))];
  if (distinct.length > 1) {
    throw new Error(`Conflicting registry aliases for ${field}: ${populated.map((item) => `${item.alias}=${normalizeComparable(item.value)}`).join(', ')}`);
  }
  return populated[0]?.value ?? null;
}

export function normalizePageRole(value) {
  const text = String(value || '').trim();
  const mapping = {
    'page-role:topic-guide': 'topic-guide',
    'page-role:category-hub': 'category-hub',
    'page-role:learning-path': 'learning-path',
    'page-role:featured-route': 'featured-route',
    'page-role:glossary-index': 'glossary-index',
    'page-role:learn-home': 'learn-home',
  };
  return mapping[text] || text;
}

export function registryRecords(registry) {
  if (Array.isArray(registry?.records)) return registry.records;
  return [
    registry?.homepage,
    registry?.glossary_index,
    registry?.featured_route,
    ...(registry?.categories || []),
    ...(registry?.learning_paths || []),
    ...(registry?.topic_guides || []),
  ].filter(Boolean);
}

export function normalizeRegistryRecord(record) {
  const normalized = {};
  for (const [field, aliases] of Object.entries(ALIASES)) normalized[field] = resolveAliases(record, field, aliases);
  normalized.page_role = normalizePageRole(normalized.page_role);
  normalized.registry_id = String(normalized.registry_id || '').trim();
  normalized.h1 = String(normalized.h1 || '').trim();
  normalized.planning_handle = String(normalized.planning_handle || '').trim();
  normalized.status = String(normalized.status || '').trim();
  normalized.record_sha256 = canonicalRecordSha256(record);
  normalized.raw = record;
  return normalized;
}

export function indexRegistry(registry) {
  const normalized = registryRecords(registry).map(normalizeRegistryRecord);
  const byId = new Map();
  const duplicates = [];
  for (const record of normalized) {
    if (!record.registry_id) throw new Error('Registry record is missing Registry ID');
    if (byId.has(record.registry_id)) duplicates.push(record.registry_id);
    else byId.set(record.registry_id, record);
  }
  return { records: normalized, byId, duplicate_ids: [...new Set(duplicates)].sort() };
}
