import fs from 'node:fs';
import Ajv2020 from 'ajv/dist/2020.js';

const SHA256 = /^[a-f0-9]{64}$/;
const REGISTRY_ID = /^MSC-(?:GUIDE-[0-9]{3}|HUB-[A-Z]+|PATH-[A-Z]+|ROUTE-[0-9]{3}|GLOSSARY-[0-9]{3})$/;
const COLUMN_ID = /^column-[1-9][0-9]*$/;
const LANGUAGE = /^[A-Za-z0-9][A-Za-z0-9_+.-]*$/;
const ACTIVE_MARKDOWN_LINK = /(?<!!)\[[^\[\]\n]+\]\([^()\n]+\)/;
const MARKDOWN_IMAGE = /!\[[^\]\n]*\]\([^()\n]+\)/;
const EVENT_HANDLER = /\bon[a-z]+\s*=/i;
const UNSAFE_SCHEME = /\b(?:javascript|data|vbscript)\s*:/i;
const HTML_CANDIDATE = /<!--[\s\S]*?-->|<![^>]*>|<\s*\/?\s*[A-Za-z][A-Za-z0-9:_-]*(?:\s[^<>]*?)?\s*\/?>/g;
const KNOWN_HTML_ELEMENTS = new Set(`a abbr address area article aside audio b base bdi bdo blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd label legend li link main map mark menu meta meter nav noscript object ol optgroup option output p picture pre progress q rp rt ruby s samp script search section select slot small source span strong style sub summary sup table tbody td template textarea tfoot th thead time title tr track u ul var video wbr`.split(' '));

const RICH_TEXT_TYPES = new Set(['section', 'paragraph', 'ordered-list', 'unordered-list', 'definition-list', 'callout']);
const RELATION_TYPES = new Set(['parent', 'previous', 'next', 'return', 'category', 'primary-path', 'secondary-path', 'related-path', 'recommended', 'planned', 'companion', 'step', 'branch']);
const INACTIVE_DESTINATION_KEYS = new Set([
  'registry_id', 'title', 'planning_handle', 'label', 'description', 'depth', 'format',
  'reading_time', 'status_note', 'action_label', 'step_number', 'after_step_number',
  'placement', 'requirement', 'planned_status', 'understand_before_continuing',
  'active', 'url',
]);
const RELATIONSHIP_KEYS = new Set([
  'relation_type', 'registry_id', 'title', 'planning_handle', 'active', 'url', 'order',
  'placement', 'required',
]);
const GLOSSARY_OWNERSHIP_KEYS = new Set(['page_role', 'primary_category', 'subcategory']);
const MACHINE_STRING_KEYS = new Set([
  'schema_version', 'generator_version', 'registry_id', 'status', 'planning_handle',
  'canonical_destination_registry_id', 'canonical_planning_handle', 'relation_type',
  'reference_type', 'reference', 'file', 'sha256', 'record_sha256', 'source_sha256',
  'type', 'id', 'language', 'state', 'publication_source', 'template_suffix',
  'reviewed_date', 'copy_locked_date', 'review_date',
]);

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function pathJoin(path, key) {
  return path ? `${path}.${key}` : key;
}

function exactKeys(value, allowed, path, errors) {
  if (!isObject(value)) {
    errors.push(`${path} must be an object`);
    return false;
  }
  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) errors.push(`${path} contains unsupported property: ${key}`);
  }
  return true;
}

function requiredKeys(value, required, path, errors) {
  for (const key of required) {
    if (!Object.prototype.hasOwnProperty.call(value, key)) errors.push(`${path} is missing required property: ${key}`);
  }
}

function isActualHtmlToken(token) {
  if (/^<!--/.test(token) || /^<!/.test(token)) return true;
  const match = token.match(/^<\s*(\/?)\s*([A-Za-z][A-Za-z0-9:_-]*)([\s\S]*?)>$/);
  if (!match) return false;
  const [, closing, rawName, rawSuffix] = match;
  const name = rawName.toLowerCase();
  if (closing || KNOWN_HTML_ELEMENTS.has(name) || name.includes('-')) return true;
  return Boolean(rawSuffix.trim());
}

function containsActualHtml(value) {
  for (const match of value.matchAll(HTML_CANDIDATE)) {
    if (isActualHtmlToken(match[0])) {
      HTML_CANDIDATE.lastIndex = 0;
      return true;
    }
  }
  HTML_CANDIDATE.lastIndex = 0;
  return false;
}

export function safeTextReason(value) {
  if (typeof value !== 'string') return 'must be a string';
  if (containsActualHtml(value)) return 'contains raw HTML';
  if (ACTIVE_MARKDOWN_LINK.test(value)) return 'contains an active Markdown link';
  if (MARKDOWN_IMAGE.test(value)) return 'contains a Markdown image';
  if (EVENT_HANDLER.test(value)) return 'contains event-handler text';
  if (UNSAFE_SCHEME.test(value)) return 'contains an unsafe URI scheme';
  if (/\]\s*\(/.test(value)) return 'contains a malformed Markdown link';
  return null;
}

function validateSafeText(value, path, errors, { allowEmpty = true } = {}) {
  const reason = safeTextReason(value);
  if (reason) errors.push(`${path} ${reason}`);
  if (!allowEmpty && value === '') errors.push(`${path} must not be empty`);
}

function strictHttpsReason(value) {
  if (typeof value !== 'string' || /\s/.test(value)) return 'must be a complete HTTPS URL without whitespace';
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== 'https:') return 'must use the https: protocol';
    if (!parsed.hostname) return 'must contain a hostname';
    if (parsed.username || parsed.password) return 'must not contain credentials';
    return null;
  } catch {
    return 'must be a parseable absolute HTTPS URL';
  }
}

export function validateSemanticTableBlock(block, path = 'content_block') {
  const errors = [];
  const allowed = new Set(['id', 'type', 'label', 'label_source', 'columns', 'rows', 'source_sha256']);
  if (!exactKeys(block, allowed, path, errors)) return errors;
  requiredKeys(block, [...allowed], path, errors);
  if (block.type !== 'semantic-table') errors.push(`${path}.type must be semantic-table`);
  if (typeof block.id !== 'string' || !block.id) errors.push(`${path}.id must be non-empty`);
  validateSafeText(block.label, `${path}.label`, errors, { allowEmpty: false });
  if (!['explicit-caption', 'nearest-source-heading'].includes(block.label_source)) errors.push(`${path}.label_source is invalid`);
  if (!SHA256.test(block.source_sha256 || '')) errors.push(`${path}.source_sha256 is invalid`);

  if (!Array.isArray(block.columns) || block.columns.length < 2) {
    errors.push(`${path}.columns must contain at least two columns`);
  } else {
    const columnIds = new Set();
    block.columns.forEach((column, index) => {
      const columnPath = `${path}.columns[${index}]`;
      const keys = new Set(['id', 'header', 'alignment']);
      if (!exactKeys(column, keys, columnPath, errors)) return;
      requiredKeys(column, [...keys], columnPath, errors);
      if (!COLUMN_ID.test(column.id || '')) errors.push(`${columnPath}.id is invalid`);
      if (columnIds.has(column.id)) errors.push(`${columnPath}.id must be unique`);
      columnIds.add(column.id);
      if (column.id !== `column-${index + 1}`) errors.push(`${columnPath}.id must preserve sequential column order`);
      validateSafeText(column.header, `${columnPath}.header`, errors, { allowEmpty: false });
      if (![null, 'left', 'center', 'right'].includes(column.alignment)) errors.push(`${columnPath}.alignment is invalid`);
    });
  }

  if (!Array.isArray(block.rows) || block.rows.length < 1) {
    errors.push(`${path}.rows must contain at least one row`);
  } else {
    block.rows.forEach((row, rowIndex) => {
      const rowPath = `${path}.rows[${rowIndex}]`;
      const keys = new Set(['cells']);
      if (!exactKeys(row, keys, rowPath, errors)) return;
      requiredKeys(row, ['cells'], rowPath, errors);
      if (!Array.isArray(row.cells)) {
        errors.push(`${rowPath}.cells must be an array`);
        return;
      }
      if (Array.isArray(block.columns) && row.cells.length !== block.columns.length) {
        errors.push(`${rowPath}.cells must contain exactly ${block.columns.length} cells`);
      }
      row.cells.forEach((cell, cellIndex) => validateSafeText(cell, `${rowPath}.cells[${cellIndex}]`, errors, { allowEmpty: false }));
    });
  }
  return errors;
}

export function validateInertCodeBlock(block, path = 'content_block') {
  const errors = [];
  const allowed = new Set(['id', 'type', 'language', 'code', 'executable', 'controls_enabled', 'escape_before_render', 'source_sha256']);
  if (!exactKeys(block, allowed, path, errors)) return errors;
  requiredKeys(block, [...allowed], path, errors);
  if (block.type !== 'inert-code') errors.push(`${path}.type must be inert-code`);
  if (typeof block.id !== 'string' || !block.id) errors.push(`${path}.id must be non-empty`);
  if (block.language !== null && (typeof block.language !== 'string' || !LANGUAGE.test(block.language))) errors.push(`${path}.language is invalid`);
  if (typeof block.code !== 'string') errors.push(`${path}.code must be a string`);
  if (block.executable !== false) errors.push(`${path}.executable must be false`);
  if (block.controls_enabled !== false) errors.push(`${path}.controls_enabled must be false`);
  if (block.escape_before_render !== true) errors.push(`${path}.escape_before_render must be true`);
  if (!SHA256.test(block.source_sha256 || '')) errors.push(`${path}.source_sha256 is invalid`);
  return errors;
}

export function validateRichTextContentBlock(block, path = 'content_block') {
  const errors = [];
  const allowed = new Set(['id', 'type', 'heading', 'text', 'format', 'escape_before_render', 'source_sha256']);
  if (!exactKeys(block, allowed, path, errors)) return errors;
  requiredKeys(block, [...allowed], path, errors);
  if (!RICH_TEXT_TYPES.has(block.type)) errors.push(`${path}.type is an unknown rich-text block type`);
  if (typeof block.id !== 'string' || !block.id) errors.push(`${path}.id must be non-empty`);
  if (block.heading !== null) validateSafeText(block.heading, `${path}.heading`, errors);
  validateSafeText(block.text, `${path}.text`, errors);
  if (block.format !== 'plain-text') errors.push(`${path}.format must be plain-text`);
  if (block.escape_before_render !== true) errors.push(`${path}.escape_before_render must be true`);
  if (!SHA256.test(block.source_sha256 || '')) errors.push(`${path}.source_sha256 is invalid`);
  return errors;
}

export function validateContentBlock(block, path = 'content_block') {
  if (!isObject(block)) return [`${path} must be an object`];
  if (block.type === 'semantic-table') return validateSemanticTableBlock(block, path);
  if (block.type === 'inert-code') return validateInertCodeBlock(block, path);
  if (RICH_TEXT_TYPES.has(block.type)) return validateRichTextContentBlock(block, path);
  return [`${path}.type is unknown: ${String(block.type)}`];
}

export function validateInactiveDestination(destination, path = 'inactive_destination') {
  const errors = [];
  if (!exactKeys(destination, INACTIVE_DESTINATION_KEYS, path, errors)) return errors;
  requiredKeys(destination, ['registry_id', 'active', 'url'], path, errors);
  if (!REGISTRY_ID.test(destination.registry_id || '')) errors.push(`${path}.registry_id is invalid`);
  if (destination.active !== false) errors.push(`${path}.active must be false`);
  if (destination.url !== null) errors.push(`${path}.url must be null`);
  for (const key of ['title', 'label', 'description', 'depth', 'format', 'reading_time', 'status_note', 'action_label', 'placement', 'requirement', 'planned_status', 'understand_before_continuing']) {
    if (destination[key] !== undefined && destination[key] !== null) validateSafeText(destination[key], pathJoin(path, key), errors);
  }
  return errors;
}

export function validateRelationship(relationship, path = 'relationship') {
  const errors = [];
  if (!exactKeys(relationship, RELATIONSHIP_KEYS, path, errors)) return errors;
  requiredKeys(relationship, ['relation_type', 'registry_id', 'title', 'planning_handle', 'active', 'url', 'order'], path, errors);
  if (!RELATION_TYPES.has(relationship.relation_type)) errors.push(`${path}.relation_type is invalid`);
  if (!REGISTRY_ID.test(relationship.registry_id || '')) errors.push(`${path}.registry_id is invalid`);
  validateSafeText(relationship.title, `${path}.title`, errors, { allowEmpty: false });
  if (relationship.active !== false) errors.push(`${path}.active must be false`);
  if (relationship.url !== null) errors.push(`${path}.url must be null`);
  if (!Number.isInteger(relationship.order) || relationship.order < 0) errors.push(`${path}.order must be a non-negative integer`);
  if (relationship.placement !== undefined && relationship.placement !== null) validateSafeText(relationship.placement, `${path}.placement`, errors);
  return errors;
}

export function validateGlossaryOwnership(ownership, path = 'ownership') {
  const errors = [];
  if (!exactKeys(ownership, GLOSSARY_OWNERSHIP_KEYS, path, errors)) return errors;
  requiredKeys(ownership, ['page_role', 'primary_category', 'subcategory'], path, errors);
  for (const key of GLOSSARY_OWNERSHIP_KEYS) validateSafeText(ownership[key], pathJoin(path, key), errors, { allowEmpty: false });
  return errors;
}

function shouldValidateString(path, key, parent) {
  if (key === 'code') return false;
  if (MACHINE_STRING_KEYS.has(key)) return false;
  if (path === 'runtime.identity.page_role') return false;
  if (key === 'format' && parent?.type && RICH_TEXT_TYPES.has(parent.type)) return false;
  return true;
}

function walkAll(value, path, errors, seen = new Set()) {
  if (typeof value === 'string') {
    validateSafeText(value, path, errors);
    return;
  }
  if (value === null || typeof value !== 'object' || seen.has(value)) return;
  seen.add(value);
  if (Array.isArray(value)) {
    value.forEach((entry, index) => walkAll(entry, `${path}[${index}]`, errors, seen));
    return;
  }

  if (Object.prototype.hasOwnProperty.call(value, 'type')) {
    if ([...RICH_TEXT_TYPES, 'semantic-table', 'inert-code'].includes(value.type)) {
      errors.push(...validateContentBlock(value, path));
    }
  }
  if (Object.prototype.hasOwnProperty.call(value, 'registry_id')
      && Object.prototype.hasOwnProperty.call(value, 'active')
      && Object.prototype.hasOwnProperty.call(value, 'url')
      && !Object.prototype.hasOwnProperty.call(value, 'relation_type')) {
    errors.push(...validateInactiveDestination(value, path));
  }
  if (Object.prototype.hasOwnProperty.call(value, 'ownership')) {
    errors.push(...validateGlossaryOwnership(value.ownership, `${path}.ownership`));
  }

  for (const [key, child] of Object.entries(value)) {
    const childPath = pathJoin(path, key);
    if (typeof child === 'string' && shouldValidateString(childPath, key, value)) {
      validateSafeText(child, childPath, errors);
    } else {
      walkAll(child, childPath, errors, seen);
    }
  }
}

export function validateRuntimeObject(runtime) {
  const errors = [];
  if (!isObject(runtime)) return ['runtime must be an object'];
  if (Array.isArray(runtime.relationships)) {
    runtime.relationships.forEach((relationship, index) => errors.push(...validateRelationship(relationship, `runtime.relationships[${index}]`)));
  }
  if (Array.isArray(runtime.sources)) {
    runtime.sources.forEach((source, index) => {
      if (source?.reference_type === 'url') {
        const reason = strictHttpsReason(source.reference);
        if (reason) errors.push(`runtime.sources[${index}].reference ${reason}`);
      }
    });
  }
  walkAll(runtime, 'runtime', errors);
  return [...new Set(errors)].sort((a, b) => a.localeCompare(b));
}

export function assertValidRuntimeObject(runtime) {
  const errors = validateRuntimeObject(runtime);
  if (errors.length) throw new Error(`Runtime object validation failed:\n${errors.join('\n')}`);
  return runtime;
}

const schema = JSON.parse(fs.readFileSync(new URL('../../../docs/learn/runtime/schema/msc-learn-runtime-v2.schema.json', import.meta.url), 'utf8'));
const ajv = new Ajv2020({ strict: true, allErrors: true, allowUnionTypes: true });
ajv.addFormat('date', {
  type: 'string',
  validate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
  },
});
const validateSchema = ajv.compile(schema);

function normalizedSchemaErrors(errors = []) {
  return errors.map((error) => ({
    path: error.instancePath || '/',
    keyword: error.keyword,
    message: error.message || 'schema validation failed',
    schema_path: error.schemaPath,
  })).sort((a, b) => `${a.path}|${a.keyword}|${a.message}`.localeCompare(`${b.path}|${b.keyword}|${b.message}`));
}

function normalizedRuntimeErrors(errors) {
  return errors.map((message) => {
    const path = message.match(/^(runtime(?:\.[^ ]+|\[[^ ]+\])*)/)?.[1] || 'runtime';
    let category = 'runtime-invariant';
    if (/raw HTML|Markdown link|Markdown image|event-handler|unsafe URI|malformed Markdown/.test(message)) category = 'unsafe-text';
    else if (/cells must contain exactly|column|rows must|columns must/.test(message)) category = 'semantic-table';
    else if (/executable|controls_enabled|escape_before_render|language/.test(message)) category = 'inert-code';
    else if (/reference must/.test(message)) category = 'source-reference';
    return { path, category, message };
  }).sort((a, b) => `${a.path}|${a.category}|${a.message}`.localeCompare(`${b.path}|${b.category}|${b.message}`));
}

/**
 * Permanent runtime acceptance sequence:
 * parse source -> construct candidate -> Draft 2020-12 schema validation ->
 * shared post-schema invariants -> reject on any error -> serialize only after acceptance.
 */
export function validateRuntimeCandidate(runtime) {
  const schemaValid = validateSchema(runtime);
  const schemaErrors = normalizedSchemaErrors(validateSchema.errors || []);
  const runtimeErrors = schemaValid ? normalizedRuntimeErrors(validateRuntimeObject(runtime)) : [];
  return {
    valid: schemaErrors.length === 0 && runtimeErrors.length === 0,
    schema_errors: schemaErrors,
    runtime_errors: runtimeErrors,
  };
}

export function assertRuntimeCandidate(runtime) {
  const result = validateRuntimeCandidate(runtime);
  if (!result.valid) {
    const lines = [
      ...result.schema_errors.map((error) => `schema ${error.path} ${error.keyword}: ${error.message}`),
      ...result.runtime_errors.map((error) => `runtime ${error.path} ${error.category}: ${error.message}`),
    ];
    throw new Error(`Runtime candidate validation failed:\n${lines.join('\n')}`);
  }
  return runtime;
}
