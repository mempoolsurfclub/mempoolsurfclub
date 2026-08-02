const SHA256 = /^[a-f0-9]{64}$/;
const REGISTRY_ID = /^MSC-(?:GUIDE-[0-9]{3}|HUB-[A-Z]+|PATH-[A-Z]+|ROUTE-[0-9]{3}|GLOSSARY-[0-9]{3})$/;
const COLUMN_ID = /^column-[1-9][0-9]*$/;
const LANGUAGE = /^[A-Za-z0-9][A-Za-z0-9_+.-]*$/;
const ACTIVE_MARKDOWN_LINK = /(?<!!)\[[^\]]+\]\([^\n)]+\)/;
const MARKDOWN_IMAGE = /!\[[^\]]*\]\([^\n)]+\)/;
const HTML_TOKEN = /<!--[\s\S]*?-->|<![A-Za-z][^>]*>|<\/?[A-Za-z][A-Za-z0-9:-]*(?:\s[^<>]*?)?\s*\/?>/;
const EVENT_HANDLER = /\bon[a-z]+\s*=/i;
const UNSAFE_SCHEME = /\b(?:javascript|data|vbscript)\s*:/i;

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

export function safeTextReason(value) {
  if (typeof value !== 'string') return 'must be a string';
  if (HTML_TOKEN.test(value)) return 'contains raw HTML';
  if (ACTIVE_MARKDOWN_LINK.test(value)) return 'contains an active Markdown link';
  if (MARKDOWN_IMAGE.test(value)) return 'contains a Markdown image';
  if (EVENT_HANDLER.test(value)) return 'contains event-handler text';
  if (UNSAFE_SCHEME.test(value)) return 'contains an unsafe URI scheme';
  return null;
}

function validateSafeText(value, path, errors, { allowEmpty = true } = {}) {
  const reason = safeTextReason(value);
  if (reason) errors.push(`${path} ${reason}`);
  if (!allowEmpty && value === '') errors.push(`${path} must not be empty`);
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
    block.columns.forEach((column, index) => {
      const columnPath = `${path}.columns[${index}]`;
      const keys = new Set(['id', 'header', 'alignment']);
      if (!exactKeys(column, keys, columnPath, errors)) return;
      requiredKeys(column, [...keys], columnPath, errors);
      if (!COLUMN_ID.test(column.id || '')) errors.push(`${columnPath}.id is invalid`);
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
  for (const key of ['title', 'planning_handle', 'label', 'description', 'depth', 'format', 'reading_time', 'status_note', 'action_label', 'placement', 'requirement', 'planned_status', 'understand_before_continuing']) {
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

function walk(value, path, errors, seen = new Set()) {
  if (value === null || typeof value !== 'object') return;
  if (seen.has(value)) return;
  seen.add(value);
  if (Array.isArray(value)) {
    value.forEach((entry, index) => walk(entry, `${path}[${index}]`, errors, seen));
    return;
  }

  if (Object.prototype.hasOwnProperty.call(value, 'type')) {
    const contentTypes = new Set([...RICH_TEXT_TYPES, 'semantic-table', 'inert-code']);
    if (contentTypes.has(value.type) || path.includes('orientation') || path.includes('article_sections')) {
      errors.push(...validateContentBlock(value, path));
      return;
    }
  }
  if (Object.prototype.hasOwnProperty.call(value, 'registry_id')
      && Object.prototype.hasOwnProperty.call(value, 'active')
      && Object.prototype.hasOwnProperty.call(value, 'url')) {
    errors.push(...validateInactiveDestination(value, path));
    return;
  }
  if (Object.prototype.hasOwnProperty.call(value, 'ownership')) {
    errors.push(...validateGlossaryOwnership(value.ownership, `${path}.ownership`));
  }
  for (const [key, child] of Object.entries(value)) walk(child, pathJoin(path, key), errors, seen);
}

export function validateRuntimeObject(runtime) {
  const errors = [];
  if (!isObject(runtime)) return ['runtime must be an object'];
  if (Array.isArray(runtime.relationships)) {
    runtime.relationships.forEach((relationship, index) => errors.push(...validateRelationship(relationship, `runtime.relationships[${index}]`)));
  }
  walk(runtime.content, 'runtime.content', errors);
  walk(runtime.role_data, 'runtime.role_data', errors);
  return [...new Set(errors)];
}

export function assertValidRuntimeObject(runtime) {
  const errors = validateRuntimeObject(runtime);
  if (errors.length) throw new Error(`Runtime object validation failed:\n${errors.join('\n')}`);
  return runtime;
}
