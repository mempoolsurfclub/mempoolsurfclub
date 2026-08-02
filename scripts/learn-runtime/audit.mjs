import {
  fileExists,
  normalizeText,
  readUtf8,
  writeUtf8,
} from './lib/files.mjs';
import {
  canonicalJson,
  sha256,
} from './lib/hashing.mjs';
import { parseFrontmatter } from './lib/frontmatter.mjs';
import { inspectMarkdown } from './lib/markdown.mjs';
import { indexRegistry } from './lib/registry.mjs';
import {
  approvedPackageDirectories,
  indexManifest,
  isApprovedPackagePath,
} from './lib/manifest.mjs';

const REGISTRY_PATH = 'docs/learn/MSC_Learn_Master_Registry.json';
const MANIFEST_PATH = 'docs/learn/content/content-manifest.json';
const SCHEMA_PATH = 'docs/learn/runtime/schema/msc-learn-runtime-v2.schema.json';
const REPORT_PATH = 'docs/learn/runtime/reports/package-compatibility.json';
const EXPECTED_SCHEMA_VERSION = '2.0.0';
const EXPECTED_TOTAL = 92;
const EXPECTED_COUNTS = {
  'topic-guide': 80,
  'category-hub': 5,
  'learning-path': 5,
  'featured-route': 1,
  'glossary-index': 1,
};
const ROOT_IDS = new Set(['MSC-LRN-HOME']);
const CHECK = process.argv.includes('--check');
const WRITE = process.argv.includes('--write');
const PRINT_BASE64 = process.argv.includes('--print-base64');

if (CHECK && WRITE) throw new Error('Use either --check or --write, not both');
if (!CHECK && !WRITE) throw new Error('Specify --check or --write');

function bodyH1(body) {
  return body.match(/^#\s+(.+)$/m)?.[1]?.trim() || null;
}

function roleCounts(entries) {
  const counts = Object.fromEntries(Object.keys(EXPECTED_COUNTS).map((role) => [role, 0]));
  for (const entry of entries) counts[entry.page_role] = (counts[entry.page_role] || 0) + 1;
  return counts;
}

function compareField(label, values, blocking) {
  const populated = Object.entries(values).filter(([, value]) => value !== undefined && value !== null && value !== '');
  const distinct = [...new Set(populated.map(([, value]) => String(value).trim()))];
  if (populated.length !== Object.keys(values).length) blocking.push(`${label} is absent from ${Object.keys(values).filter((key) => !populated.some(([present]) => present === key)).join(', ')}`);
  if (distinct.length > 1) blocking.push(`${label} disagreement: ${populated.map(([key, value]) => `${key}=${value}`).join(', ')}`);
  return {
    agrees: populated.length === Object.keys(values).length && distinct.length === 1,
    values,
  };
}

function validateSchemaDefinition(schema) {
  const errors = [];
  if (schema?.properties?.schema_version?.const !== EXPECTED_SCHEMA_VERSION) errors.push('Schema version must be const 2.0.0');
  const required = ['schema_version', 'generator_version', 'identity', 'source', 'content', 'key_terms', 'sources', 'seo', 'relationships', 'review', 'illustrations', 'publication', 'role_data'];
  for (const field of required) if (!schema?.required?.includes(field)) errors.push(`Schema is missing required envelope field: ${field}`);
  const roles = schema?.$defs?.identity?.properties?.page_role?.enum || [];
  for (const role of Object.keys(EXPECTED_COUNTS)) if (!roles.includes(role)) errors.push(`Schema does not discriminate role: ${role}`);
  const publication = schema?.$defs?.publication?.properties || {};
  if (publication?.state?.const !== 'PREVIEW_ONLY') errors.push('Schema publication state must be PREVIEW_ONLY');
  if (publication?.public_url?.type !== 'null') errors.push('Schema public_url must be null');
  if (publication?.shopify_page_id?.type !== 'null') errors.push('Schema shopify_page_id must be null');
  if (publication?.links_active?.const !== false) errors.push('Schema links_active must be false');
  const relationship = schema?.$defs?.relationship?.properties || {};
  if (relationship?.active?.const !== false || relationship?.url?.type !== 'null') errors.push('Schema relationships must remain inactive with null URLs');
  for (const name of ['topicGuideRoleData', 'categoryHubRoleData', 'learningPathRoleData', 'featuredRouteRoleData', 'glossaryIndexRoleData']) {
    if (!schema?.$defs?.[name]) errors.push(`Schema is missing role extension: ${name}`);
  }
  return errors;
}

function emptyBlockedRecord(identity, blocking, observations) {
  return {
    ...identity,
    package_status: null,
    h1_agreement: { agrees: false, values: {} },
    role_agreement: { agrees: false, values: {} },
    status_agreement: { agrees: false, values: {} },
    planning_handle_agreement: { agrees: false, values: {} },
    required_numbered_sections_found: [],
    markdown_constructs_detected: {},
    unsupported_constructs_detected: [],
    compatibility: 'BLOCKED',
    blocking_incompatibilities: blocking,
    non_blocking_observations: observations,
  };
}

function auditPackage(entry, registryRecord) {
  const blocking = [];
  const observations = [];
  const identity = {
    registry_id: entry.registry_id,
    page_role: entry.page_role,
    package_path: entry.content_file,
    package_sha256: null,
    registry_record_sha256: registryRecord?.record_sha256 || null,
    manifest_record_sha256: entry.record_sha256,
  };

  if (!isApprovedPackagePath(entry.content_file)) blocking.push(`Package path is outside approved directories: ${entry.content_file}`);
  if (ROOT_IDS.has(entry.registry_id)) blocking.push('Learn root must not be included in the non-root runtime audit');
  if (!registryRecord) blocking.push(`Registry record not found: ${entry.registry_id}`);
  if (!fileExists(entry.content_file)) {
    blocking.push(`Permanent package is missing: ${entry.content_file}`);
    return emptyBlockedRecord(identity, blocking, observations);
  }

  const source = normalizeText(readUtf8(entry.content_file));
  identity.package_sha256 = sha256(source);
  let parsed;
  try {
    parsed = parseFrontmatter(source, { requiredFields: ['registry_id', 'status', 'page_role', 'h1', 'handle'] });
  } catch (error) {
    blocking.push(`Frontmatter error: ${error.message}`);
    return emptyBlockedRecord(identity, blocking, observations);
  }

  const packageH1 = String(parsed.data.h1 || '').trim();
  const markdownH1 = bodyH1(parsed.body);
  const packageRole = String(parsed.data.page_role || '').trim();
  const packageStatus = String(parsed.data.status || '').trim();
  const packageHandle = String(parsed.data.handle || '').trim();

  const h1Agreement = compareField('H1', {
    package_frontmatter: packageH1,
    package_markdown: markdownH1,
    manifest: entry.title,
    registry: registryRecord?.h1,
  }, blocking);
  const roleAgreement = compareField('Page role', {
    package: packageRole,
    manifest: entry.page_role,
    registry: registryRecord?.page_role,
  }, blocking);
  const statusAgreement = compareField('COPY_LOCKED status', {
    package: packageStatus,
    manifest: entry.status,
  }, blocking);
  if (packageStatus !== 'COPY_LOCKED' || entry.status !== 'COPY_LOCKED') blocking.push('Package and manifest must both be COPY_LOCKED');
  const handleAgreement = compareField('Planning handle', {
    package: packageHandle,
    manifest: entry.planning_handle,
    registry: registryRecord?.planning_handle,
  }, blocking);

  const markdown = inspectMarkdown(parsed.body, entry.page_role);
  if (markdown.missing_required_sections.length) blocking.push(`Missing required numbered section pattern(s): ${markdown.missing_required_sections.join(', ')}`);
  for (const issue of markdown.unsupported_constructs.filter((item) => item.blocking)) blocking.push(`Unsupported Markdown construct ${issue.type} (${issue.count})`);
  observations.push(...markdown.non_blocking_observations);
  if (registryRecord?.status && registryRecord.status !== 'COPY_LOCKED') observations.push(`Registry workflow status remains ${registryRecord.status}; package and manifest editorial status are COPY_LOCKED.`);

  let compatibility = 'BLOCKED';
  if (!blocking.length) {
    const requiresRoleAdapter = entry.page_role !== 'topic-guide' || observations.some((item) => item.includes('role-specific'));
    compatibility = requiresRoleAdapter ? 'COMPATIBLE_WITH_ROLE_ADAPTER' : 'COMPATIBLE';
  }

  return {
    ...identity,
    package_status: packageStatus,
    h1_agreement: h1Agreement,
    role_agreement: roleAgreement,
    status_agreement: statusAgreement,
    planning_handle_agreement: handleAgreement,
    required_numbered_sections_found: markdown.numbered_sections,
    markdown_constructs_detected: markdown.constructs,
    unsupported_constructs_detected: markdown.unsupported_constructs,
    compatibility,
    blocking_incompatibilities: blocking,
    non_blocking_observations: [...new Set(observations)],
  };
}

function main() {
  const schemaText = normalizeText(readUtf8(SCHEMA_PATH));
  const schema = JSON.parse(schemaText);
  const schemaErrors = validateSchemaDefinition(schema);

  const registryText = normalizeText(readUtf8(REGISTRY_PATH));
  const manifestText = normalizeText(readUtf8(MANIFEST_PATH));
  const registry = JSON.parse(registryText);
  const manifest = JSON.parse(manifestText);
  const registryIndex = indexRegistry(registry);
  const manifestIndex = indexManifest(manifest);

  const globalBlocking = [...schemaErrors];
  if (manifestIndex.entries.length !== EXPECTED_TOTAL) globalBlocking.push(`Expected ${EXPECTED_TOTAL} manifest entries, found ${manifestIndex.entries.length}`);
  if (manifestIndex.duplicate_ids.length) globalBlocking.push(`Duplicate manifest IDs: ${manifestIndex.duplicate_ids.join(', ')}`);
  if (manifestIndex.duplicate_paths.length) globalBlocking.push(`Duplicate manifest package paths: ${manifestIndex.duplicate_paths.join(', ')}`);
  if (registryIndex.duplicate_ids.length) globalBlocking.push(`Duplicate registry IDs: ${registryIndex.duplicate_ids.join(', ')}`);
  const countsByRole = roleCounts(manifestIndex.entries);
  for (const [role, expected] of Object.entries(EXPECTED_COUNTS)) {
    if (countsByRole[role] !== expected) globalBlocking.push(`Expected ${expected} ${role} entries, found ${countsByRole[role] || 0}`);
  }
  const unknownRoles = Object.keys(countsByRole).filter((role) => !Object.prototype.hasOwnProperty.call(EXPECTED_COUNTS, role) && countsByRole[role]);
  if (unknownRoles.length) globalBlocking.push(`Unexpected manifest roles: ${unknownRoles.join(', ')}`);
  const rootEntries = manifestIndex.entries.filter((entry) => ROOT_IDS.has(entry.registry_id) || entry.page_role === 'learn-home');
  if (rootEntries.length) globalBlocking.push(`Root destination included in manifest audit: ${rootEntries.map((entry) => entry.registry_id).join(', ')}`);
  const unlockedEntries = manifestIndex.entries.filter((entry) => entry.status !== 'COPY_LOCKED');
  if (unlockedEntries.length) globalBlocking.push(`Manifest entries not COPY_LOCKED: ${unlockedEntries.map((entry) => entry.registry_id).join(', ')}`);

  const packages = manifestIndex.entries.map((entry) => auditPackage(entry, registryIndex.byId.get(entry.registry_id)));
  const compatibilityCounts = {
    COMPATIBLE: packages.filter((item) => item.compatibility === 'COMPATIBLE').length,
    COMPATIBLE_WITH_ROLE_ADAPTER: packages.filter((item) => item.compatibility === 'COMPATIBLE_WITH_ROLE_ADAPTER').length,
    BLOCKED: packages.filter((item) => item.compatibility === 'BLOCKED').length,
  };
  const unsupportedOccurrences = packages.reduce(
    (sum, item) => sum + item.unsupported_constructs_detected.reduce((inner, issue) => inner + issue.count, 0),
    0,
  );
  const missingPackages = packages.filter((item) => item.blocking_incompatibilities.some((message) => message.startsWith('Permanent package is missing'))).length;

  const report = {
    report_version: '1.0.0',
    target_runtime_schema_version: EXPECTED_SCHEMA_VERSION,
    source: {
      schema: { file: SCHEMA_PATH, sha256: sha256(schemaText) },
      registry: { file: REGISTRY_PATH, sha256: sha256(registryText) },
      manifest: { file: MANIFEST_PATH, sha256: sha256(manifestText) },
      approved_package_directories: approvedPackageDirectories,
    },
    summary: {
      total_audited: packages.length,
      counts_by_role: Object.fromEntries(Object.keys(EXPECTED_COUNTS).map((role) => [role, countsByRole[role] || 0])),
      fully_compatible: compatibilityCounts.COMPATIBLE,
      compatible_with_documented_adapter_handling: compatibilityCounts.COMPATIBLE_WITH_ROLE_ADAPTER,
      blocking_incompatibilities: compatibilityCounts.BLOCKED,
      missing_packages: missingPackages,
      duplicate_manifest_ids: manifestIndex.duplicate_ids.length,
      duplicate_registry_ids: registryIndex.duplicate_ids.length,
      duplicate_package_paths: manifestIndex.duplicate_paths.length,
      unsupported_markdown_occurrences: unsupportedOccurrences,
      root_records_audited: rootEntries.length,
    },
    global_blocking_incompatibilities: globalBlocking,
    compatibility_categories: compatibilityCounts,
    packages,
  };

  const reportText = canonicalJson(report);
  if (WRITE) writeUtf8(REPORT_PATH, reportText);
  if (CHECK) {
    if (!fileExists(REPORT_PATH)) throw new Error(`Committed compatibility report is missing: ${REPORT_PATH}`);
    const committed = normalizeText(readUtf8(REPORT_PATH));
    if (committed !== reportText) throw new Error('Compatibility report is stale. Run: node scripts/learn-runtime/audit.mjs --write');
  }
  if (PRINT_BASE64) process.stdout.write(`AUDIT_REPORT_BASE64=${Buffer.from(reportText, 'utf8').toString('base64')}\n`);

  process.stdout.write(`Audited ${packages.length} packages: ${compatibilityCounts.COMPATIBLE} compatible, ${compatibilityCounts.COMPATIBLE_WITH_ROLE_ADAPTER} compatible with role adapter, ${compatibilityCounts.BLOCKED} blocked.\n`);
  if (globalBlocking.length || compatibilityCounts.BLOCKED) {
    const packageBlockers = packages.filter((item) => item.compatibility === 'BLOCKED').flatMap((item) => item.blocking_incompatibilities.map((message) => `${item.registry_id}: ${message}`));
    throw new Error([...globalBlocking, ...packageBlockers].join('\n'));
  }
}

try {
  main();
} catch (error) {
  console.error(error.stack || error.message);
  process.exitCode = 1;
}
