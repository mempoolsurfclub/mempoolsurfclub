import { canonicalRecordSha256 } from './hashing.mjs';
import { assertRepositoryRelativePath } from './files.mjs';
import { normalizePageRole } from './registry.mjs';

const APPROVED_DIRECTORIES = [
  'docs/learn/content/guides/',
  'docs/learn/content/hubs/',
  'docs/learn/content/paths/',
  'docs/learn/content/routes/',
];

export function normalizeManifestEntry(entry) {
  const contentFile = assertRepositoryRelativePath(entry?.content_file || '', 'manifest content_file');
  return {
    registry_id: String(entry?.registry_id || '').trim(),
    title: String(entry?.title || '').trim(),
    planning_handle: String(entry?.handle || '').trim(),
    page_role: normalizePageRole(entry?.page_role),
    content_file: contentFile,
    status: String(entry?.status || '').trim(),
    record_sha256: canonicalRecordSha256(entry),
    raw: entry,
  };
}

export function indexManifest(manifest) {
  if (!Array.isArray(manifest?.entries)) throw new Error('Content manifest must contain an entries array');
  const entries = manifest.entries.map(normalizeManifestEntry);
  const byId = new Map();
  const byPath = new Map();
  const duplicateIds = [];
  const duplicatePaths = [];
  for (const entry of entries) {
    if (!entry.registry_id) throw new Error('Manifest entry is missing registry_id');
    if (byId.has(entry.registry_id)) duplicateIds.push(entry.registry_id);
    else byId.set(entry.registry_id, entry);
    if (byPath.has(entry.content_file)) duplicatePaths.push(entry.content_file);
    else byPath.set(entry.content_file, entry);
  }
  return {
    entries,
    byId,
    byPath,
    duplicate_ids: [...new Set(duplicateIds)].sort(),
    duplicate_paths: [...new Set(duplicatePaths)].sort(),
  };
}

export function isApprovedPackagePath(contentFile) {
  return APPROVED_DIRECTORIES.some((directory) => contentFile.startsWith(directory)) && contentFile.endsWith('.md');
}

export const approvedPackageDirectories = [...APPROVED_DIRECTORIES];
