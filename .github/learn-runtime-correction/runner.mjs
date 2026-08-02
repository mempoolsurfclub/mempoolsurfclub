import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const STARTING_HEAD = '7f8c45d678c0ea56966abf59f570b8efde11e55c';
const RUNNER_PATH = '.github/learn-runtime-correction/runner.mjs';
const ORIGINAL_WORKFLOW = `name: Learn validation

on:
  pull_request:
    paths:
      - 'docs/learn/**'
      - 'scripts/**'
      - 'templates/**'
      - 'sections/**'
      - 'snippets/**'
      - 'package.json'
      - 'package-lock.json'
      - '.github/workflows/learn-validation.yml'
  push:
    branches:
      - main
    paths:
      - 'docs/learn/**'
      - 'scripts/**'
      - 'templates/**'
      - 'sections/**'
      - 'snippets/**'
      - 'package.json'
      - 'package-lock.json'
      - '.github/workflows/learn-validation.yml'

permissions:
  contents: read

concurrency:
  group: learn-validation-\${{ github.workflow }}-\${{ github.ref }}
  cancel-in-progress: true

jobs:
  learn-validation:
    name: Learn editorial library
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - name: Check out repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: npm

      - name: Install dependencies
        run: npm ci --ignore-scripts --no-audit --no-fund

      - name: Validate approved Learn registry
        run: npm run validate:learn-registry

      - name: Validate Learn manifest and packages
        run: npm run validate:learn-library

      - name: Test Learn runtime contract
        run: npm run test:learn-runtime-contract

      - name: Audit all 92 Learn runtime packages
        run: npm run audit:learn-runtime

      - name: Validate Guide 001 runtime pilot
        run: npm run validate:learn-guide-pilot

      - name: Validate Bitcoin Basics hub runtime pilot
        run: npm run validate:learn-hub-pilot

      - name: Validate Start With Bitcoin path runtime pilot
        run: npm run validate:learn-path-pilot

      - name: Validate featured transaction route runtime pilot
        run: npm run validate:learn-route-pilot

      - name: Validate Bitcoin Glossary runtime pilot
        run: npm run validate:learn-glossary-pilot

      - name: Verify deterministic Learn runtime audit
        run: |
          npm run materialize:learn-runtime-audit
          git diff --exit-code -- docs/learn/runtime/reports/package-compatibility.json
          npm run audit:learn-runtime

      - name: Verify deterministic Learn-data generation
        run: |
          npm run build:learn-data
          git diff --exit-code -- \\
            snippets/msc-learn-guide-data.liquid \\
            snippets/msc-learn-category-data.liquid \\
            snippets/msc-learn-path-data.liquid \\
            snippets/msc-learn-route-data.liquid \\
            snippets/msc-learn-glossary-data.liquid

      - name: Parse theme JSON templates
        run: npm run test:json

      - name: Check patch whitespace
        run: git diff --check
`;

function read(path) {
  return fs.readFileSync(path, 'utf8');
}

function write(path, content) {
  fs.writeFileSync(path, content.endsWith('\n') ? content : `${content}\n`);
}

function replaceOnce(text, search, replacement, label) {
  const matches = typeof search === 'string'
    ? text.split(search).length - 1
    : [...text.matchAll(new RegExp(search.source, search.flags.includes('g') ? search.flags : `${search.flags}g`))].length;
  assert.equal(matches, 1, `${label}: expected exactly one match, found ${matches}`);
  return text.replace(search, replacement);
}

function blockingIssue(inspection, type) {
  return inspection.unsupported_constructs.find((entry) => entry.type === type && entry.blocking);
}

function topicGuideRuntime() {
  const sha = 'a'.repeat(64);
  const paragraph = {
    id: 'paragraph-1',
    type: 'paragraph',
    heading: null,
    text: 'Safe text.',
    format: 'plain-text',
    escape_before_render: true,
    source_sha256: sha,
  };
  return {
    schema_version: '2.0.0',
    generator_version: '1.0.0',
    identity: {
      registry_id: 'MSC-GUIDE-001',
      page_role: 'topic-guide',
      status: 'COPY_LOCKED',
      h1: 'Safe H1',
      planning_handle: 'safe-runtime',
    },
    source: {
      package: {
        file: 'docs/learn/content/guides/MSC-GUIDE-001-what-is-bitcoin.md',
        sha256: sha,
      },
      registry: {
        file: 'docs/learn/MSC_Learn_Master_Registry.json',
        sha256: sha,
        record_sha256: sha,
      },
      manifest: {
        file: 'docs/learn/content/content-manifest.json',
        sha256: sha,
        record_sha256: sha,
      },
    },
    content: {
      introductory_deck: 'Safe introductory deck.',
      orientation: [paragraph],
    },
    key_terms: [{ term: 'Node', definition: 'A validating participant.' }],
    sources: [{
      title: 'Primary source',
      author_or_publisher: 'Publisher',
      reference_type: 'url',
      reference: 'https://example.com/source',
      supports: 'Supports the fixture.',
    }],
    seo: {
      title: 'Safe SEO title',
      meta_description: 'Safe meta description.',
      excerpt: 'Safe excerpt.',
      reading_time: '5 minutes',
    },
    relationships: [{
      relation_type: 'next',
      registry_id: 'MSC-GUIDE-002',
      title: 'Next guide',
      planning_handle: 'next-guide',
      active: false,
      url: null,
      order: 1,
      placement: 'After this guide',
      required: false,
    }],
    review: {
      reviewed_date: '2026-08-02',
      copy_locked_date: '2026-08-02',
      human_verification: {
        reviewer: 'Reviewer',
        review_date: '2026-08-02',
        notes: ['Verified.'],
      },
      accuracy_checklist: [{ checked: true, statement: 'Claims checked.' }],
    },
    illustrations: [{
      id: 'illustration-1',
      title: 'Diagram',
      educational_purpose: 'Explain.',
      recommended_placement: 'After orientation.',
      visual_description: 'A technical diagram.',
      required_labels: ['Node'],
      caption: 'A caption.',
      alt_text: 'A diagram.',
      orientation: 'Landscape',
      mobile_crop_notes: 'Keep center visible.',
      status: 'PLANNED',
      asset: null,
      render: false,
    }],
    publication: {
      state: 'PREVIEW_ONLY',
      public_url: null,
      shopify_page_id: null,
      template_suffix: null,
      links_active: false,
      publication_source: null,
    },
    role_data: {
      article_sections: [{ ...paragraph, id: 'section-1', heading: 'Section' }],
      category: {
        registry_id: 'MSC-HUB-BASICS',
        title: 'Bitcoin Basics',
        subcategory: 'Foundations',
      },
      depth: 'Foundational',
      format: 'Guide',
    },
  };
}

async function reproduce() {
  const markdownModule = await import('../../scripts/learn-runtime/lib/markdown.mjs');
  const runtimeModule = await import('../../scripts/learn-runtime/lib/runtime-validation.mjs');
  const { inspectMarkdown } = markdownModule;
  const {
    safeTextReason,
    validateContentBlock,
    validateRuntimeCandidate,
  } = runtimeModule;

  const record = {};

  record.real_markup_accepted = {};
  for (const token of ['<svg>', '<math>', '<marquee>']) {
    const acceptedBySafeText = safeTextReason(token) === null;
    const acceptedByMarkdown = !blockingIssue(inspectMarkdown(token, 'topic-guide'), 'raw-html');
    assert.equal(acceptedBySafeText, true, `${token} should reproduce safe-text acceptance`);
    assert.equal(acceptedByMarkdown, true, `${token} should reproduce Markdown acceptance`);
    record.real_markup_accepted[token] = { safe_text: acceptedBySafeText, markdown: acceptedByMarkdown };
  }
  {
    const runtime = topicGuideRuntime();
    runtime.identity.h1 = '<svg>';
    const result = validateRuntimeCandidate(runtime);
    assert.equal(result.valid, true, 'H1 <svg> should reproduce full acceptance');
    record.complete_runtime_h1_svg = result;
  }

  const sourceCases = {
    h3_plain: '## 4. Sources\n\n### Notes\n\n- URL: https://example.com\n',
    intervening_h3_markdown: '## 4. Sources\n\n1. **Primary source**\n   - URL: https://one.example\n\n### Notes\n   - URL: [x](https://after.example)\n',
    unindented_between_plain: '## 4. Sources\n\n1. **One**\n   - URL: https://one.example\n\n- URL: https://between.example\n\n2. **Two**\n   - URL: https://two.example\n',
    unindented_between_markdown: '## 4. Sources\n\n1. **One**\n   - URL: https://one.example\n\n- URL: [x](https://between.example)\n\n2. **Two**\n   - URL: https://two.example\n',
    after_final_plain: '## 4. Sources\n\n1. **One**\n   - URL: https://one.example\n\n- URL: https://after.example\n',
    after_final_markdown: '## 4. Sources\n\n1. **One**\n   - URL: https://one.example\n\n- URL: [x](https://after.example)\n',
  };
  record.source_boundary_overreach = {};
  for (const [name, markdown] of Object.entries(sourceCases)) {
    const inspection = inspectMarkdown(markdown, 'topic-guide');
    const hasBlockingReference = inspection.unsupported_constructs.some((entry) => entry.blocking
      && ['active-markdown-link', 'active-plain-url', 'invalid-source-reference'].includes(entry.type));
    assert.equal(hasBlockingReference, false, `${name} should reproduce missing blocker`);
    record.source_boundary_overreach[name] = inspection.unsupported_constructs;
  }

  {
    const markdown = '## 4. Sources\n\n1. **Source**\n   - URL: https://bad_host/path\n';
    const inspection = inspectMarkdown(markdown, 'topic-guide');
    assert.equal(blockingIssue(inspection, 'invalid-source-reference'), undefined);
    assert.equal(blockingIssue(inspection, 'active-plain-url'), undefined);
    const runtime = topicGuideRuntime();
    runtime.sources[0].reference = 'https://bad_host/path';
    const result = validateRuntimeCandidate(runtime);
    assert.equal(result.valid, true, 'bad_host should reproduce combined acceptance');
    record.dns_invalid_hostname = {
      markdown: inspection.unsupported_constructs,
      runtime: result,
    };
  }

  {
    const inert = {
      id: 'code-1',
      type: 'inert-code',
      language: 'html',
      code: '<script>alert(1)</script>\n',
      executable: false,
      controls_enabled: false,
      escape_before_render: true,
      source_sha256: 'a'.repeat(64),
    };
    assert.deepEqual(validateContentBlock(inert), []);
    const runtime = topicGuideRuntime();
    runtime.role_data.article_sections[0] = inert;
    const result = validateRuntimeCandidate(runtime);
    assert.equal(result.valid, false);
    assert.ok(result.runtime_errors.some((error) => error.path.includes('.code') && error.message.includes('raw HTML')));
    record.inert_code_traversal = {
      direct_content_block_errors: validateContentBlock(inert),
      combined: result,
    };
  }

  {
    const runtime = topicGuideRuntime();
    runtime.sources[0] = {
      ...runtime.sources[0],
      reference_type: 'citation',
      reference: '<svg>',
    };
    const result = validateRuntimeCandidate(runtime);
    assert.equal(result.valid, true, 'citation <svg> should reproduce acceptance');
    record.unsafe_typed_reference = result;
  }

  process.stdout.write(`${JSON.stringify(record, null, 2)}\n`);
}

function patchMarkdown() {
  const path = 'scripts/learn-runtime/lib/markdown.mjs';
  let text = read(path);

  text = replaceOnce(
    text,
    'const ROLE_PATTERNS = {',
    "import { repositoryPathReason, strictHttpsReason } from './runtime-validation.mjs';\n\nconst ROLE_PATTERNS = {",
    'markdown import shared validators',
  );
  text = replaceOnce(
    text,
    /^const KNOWN_HTML_ELEMENTS = .*$/m,
    "const APPROVED_TECHNICAL_PLACEHOLDERS = new Set(['<pubkey>', '<signature>', '<txid>', '<block_hash>']);",
    'markdown placeholder allowlist',
  );
  text = replaceOnce(
    text,
    /^const SOURCE_FIELD_PATTERN = .*$/m,
    'const SOURCE_FIELD_PATTERN = /^\\s*(?:[-*]\\s+)?(Direct URL|URL|Reference):\\s*(.+?)\\s*$/i;',
    'markdown source field capture',
  );
  text = replaceOnce(
    text,
    /function isActualHtmlToken\(token\) \{[\s\S]*?\n\}\n\nfunction actualHtmlTokens/,
    `function isActualHtmlToken(token) {
  return !APPROVED_TECHNICAL_PLACEHOLDERS.has(token);
}

function actualHtmlTokens`,
    'markdown exact placeholder policy',
  );

  const sourceModel = String.raw`function normalizedHttpsReference(value) {
  return new URL(value).href;
}

function parseCompleteSourceReference(value, fieldName) {
  const markdown = value.match(/^\[([^\[\]\n]+)\]\(([^()\n]+)\)$/);
  if (markdown) {
    const destination = markdown[2].trim();
    if (!strictHttpsReason(destination)) {
      return {
        representation: 'markdown-link',
        normalized_reference: normalizedHttpsReference(destination),
      };
    }
    return null;
  }
  if (!strictHttpsReason(value)) {
    return {
      representation: 'plain-url',
      normalized_reference: normalizedHttpsReference(value),
    };
  }
  if (/^Reference$/i.test(fieldName) && !repositoryPathReason(value)) {
    return {
      representation: 'repository-path',
      normalized_reference: value,
    };
  }
  return null;
}

function sourceRecordBoundary(line, openerIndent) {
  if (!line.trim()) return false;
  if (NUMBERED_SOURCE_OPENER.test(line)) return true;
  if (/^ {0,3}#{1,6}\s+/.test(line)) return true;
  if (/^ {0,3}(?:(?:\*\s*){3,}|(?:-\s*){3,}|(?:_\s*){3,})$/.test(line)) return true;
  const indent = line.match(/^\s*/)[0].length;
  return indent <= openerIndent;
}

function sourceLineForIndex(markdown, index) {
  return markdown.slice(0, index).split('\n').length;
}

function structuredSourceRecords(markdown, sections) {
  const records = [];
  const references = [];
  const invalid = [];
  const lines = lineRecords(markdown);
  let sourceOrder = 0;

  for (const section of sections.filter((item) => /sources/i.test(item.title))) {
    const sectionLines = lines.filter((line) => line.index > section.body_start && line.index < section.end);
    for (let startIndex = 0; startIndex < sectionLines.length; startIndex += 1) {
      const opener = sectionLines[startIndex];
      if (!NUMBERED_SOURCE_OPENER.test(opener.line)) continue;
      const openerIndent = opener.line.match(/^\s*/)[0].length;
      const openerMatch = opener.line.match(/^(\d+)\./);
      const recordOrder = records.length + 1;
      let endIndex = startIndex;

      for (let cursor = startIndex + 1; cursor < sectionLines.length; cursor += 1) {
        const candidate = sectionLines[cursor];
        if (sourceRecordBoundary(candidate.line, openerIndent)) break;
        if (candidate.line.trim()) endIndex = cursor;
      }

      const approvedRanges = [];
      for (const line of sectionLines.slice(startIndex + 1, endIndex + 1)) {
        const field = line.line.match(SOURCE_FIELD_PATTERN);
        if (!field) continue;
        const fieldName = field[1];
        const rawValue = field[2];
        const value = rawValue.trim();
        const valueStart = line.index + line.line.indexOf(rawValue) + rawValue.indexOf(value);
        const parsed = parseCompleteSourceReference(value, fieldName);
        if (parsed) {
          sourceOrder += 1;
          const reference = {
            record_number: openerMatch ? Number(openerMatch[1]) : null,
            record_order: recordOrder,
            field_name: fieldName,
            representation: parsed.representation,
            normalized_reference: parsed.normalized_reference,
            source_line: line.line_number,
            source_order: sourceOrder,
          };
          references.push(reference);
          approvedRanges.push({
            start: valueStart,
            end: valueStart + value.length,
            line: line.line_number,
            value,
            parsed,
            reference,
          });
          continue;
        }

        const looksReferenceLike = /\]\s*\(|^[A-Za-z][A-Za-z0-9+.-]*:|^\/\/|^\/|\\|(?:^|\/)\.\.(?:\/|$)/.test(value);
        if (!/^Reference$/i.test(fieldName) || looksReferenceLike) {
          invalid.push({
            line: line.line_number,
            field_name: fieldName,
            value,
            reason: 'invalid-or-noncomplete-source-reference',
          });
        }
      }

      records.push({
        record_number: openerMatch ? Number(openerMatch[1]) : null,
        record_order: recordOrder,
        start: opener.index,
        end: sectionLines[endIndex].end,
        approved_ranges: approvedRanges,
      });
      startIndex = endIndex;
    }
  }

  return { records, references, invalid };
}

function rangeContains(range, start, end, text) {
  return range.parsed && start === range.start && end === range.end && range.value === text;
}

function detectMalformedMarkdownLinks(markdown, validMatches) {
  const chars = [...markdown];
  for (const match of validMatches) {
    for (let cursor = match.index; cursor < match.index + match.text.length; cursor += 1) chars[cursor] = ' ';
  }
  const residual = chars.join('');
  const hits = [];
  for (const record of lineRecords(residual)) {
    if (/\]\s*\(/.test(record.line) || /\[[^\n]*\]\s*\([^\n]*$/.test(record.line)) {
      hits.push({ line: record.line_number, text: markdown.split('\n')[record.line_number - 1].trim() });
    }
  }
  return hits;
}

function detectMarkdownLinks(markdown, sections) {
  const sourceData = structuredSourceRecords(markdown, sections);
  const source = [];
  const sourcePlain = [];
  const sourceRepositoryPaths = [];
  const active = [];
  const activePlain = [];
  const unqualified = [];
  const matches = collectMatchObjects(markdown, MARKDOWN_LINK_PATTERN);
  let unqualifiedOrder = 0;

  for (const match of matches) {
    const start = match.index;
    const end = start + match.text.length;
    const range = sourceData.records
      .flatMap((record) => record.approved_ranges)
      .find((candidate) => rangeContains(candidate, start, end, match.text));
    if (range?.parsed?.representation === 'markdown-link') {
      source.push(match.text);
    } else {
      active.push(match.text);
      unqualifiedOrder += 1;
      unqualified.push({
        representation: 'markdown-link',
        normalized_reference: match.match[2].trim(),
        source_line: sourceLineForIndex(markdown, start),
        source_order: unqualifiedOrder,
      });
    }
  }
  MARKDOWN_LINK_PATTERN.lastIndex = 0;

  for (const match of collectMatchObjects(markdown, PLAIN_URL_PATTERN)) {
    const insideMarkdown = matches.some((link) => match.index >= link.index
      && match.index + match.text.length <= link.index + link.text.length);
    if (insideMarkdown) continue;
    const start = match.index;
    const end = start + match.text.length;
    const range = sourceData.records
      .flatMap((record) => record.approved_ranges)
      .find((candidate) => rangeContains(candidate, start, end, match.text));
    if (range?.parsed?.representation === 'plain-url') {
      sourcePlain.push(match.text);
    } else {
      activePlain.push(match.text);
      unqualifiedOrder += 1;
      unqualified.push({
        representation: 'plain-url',
        normalized_reference: match.text,
        source_line: sourceLineForIndex(markdown, start),
        source_order: unqualifiedOrder,
      });
    }
  }
  PLAIN_URL_PATTERN.lastIndex = 0;

  for (const reference of sourceData.references) {
    if (reference.representation === 'repository-path') sourceRepositoryPaths.push(reference.normalized_reference);
  }

  return {
    source,
    source_plain: sourcePlain,
    source_repository_paths: sourceRepositoryPaths,
    active,
    active_plain: activePlain,
    malformed: detectMalformedMarkdownLinks(markdown, matches),
    invalid_source_references: sourceData.invalid,
    structured_records: sourceData.records.length,
    structured_references: sourceData.references,
    unqualified_references: unqualified,
  };
}

function languageCounts`;

  text = replaceOnce(
    text,
    /function parseStrictHttpsUrl\(value\) \{[\s\S]*?\nfunction languageCounts/,
    sourceModel,
    'markdown unified source model',
  );

  text = replaceOnce(
    text,
    "  push('source-markdown-link', markdownLinks.source, false);\n",
    "  push('source-markdown-link', markdownLinks.source, false);\n"
      + "  push('source-plain-url', markdownLinks.source_plain, false);\n"
      + "  push('source-repository-path', markdownLinks.source_repository_paths, false);\n"
      + "  push('unqualified-source-reference', markdownLinks.unqualified_references);\n",
    'markdown source issue categories',
  );

  text = replaceOnce(
    text,
    "  if (markdownLinks.source.length) observations.push(`Contains ${markdownLinks.source.length} validated HTTPS Markdown source-reference link(s); the future adapter must preserve them as reference data and escape them rather than render active links.`);\n",
    "  if (markdownLinks.structured_references.length) {\n"
      + "    const byRepresentation = markdownLinks.structured_references.reduce((counts, reference) => {\n"
      + "      counts[reference.representation] = (counts[reference.representation] || 0) + 1;\n"
      + "      return counts;\n"
      + "    }, {});\n"
      + "    observations.push(`Contains ${markdownLinks.structured_references.length} validated structured source reference(s) (${Object.entries(byRepresentation).map(([type, count]) => `${type}: ${count}`).join(', ')}); the future adapter must preserve them as inert reference data and escape them rather than render active links.`);\n"
      + "  }\n",
    'markdown source observation',
  );

  text = replaceOnce(
    text,
    "    non_blocking_observations: observations,\n",
    "    non_blocking_observations: observations,\n"
      + "    source_references: {\n"
      + "      structured: markdownLinks.structured_references,\n"
      + "      unqualified: markdownLinks.unqualified_references,\n"
      + "    },\n",
    'markdown source model output',
  );

  write(path, text);
}

function patchRuntimeValidation() {
  const path = 'scripts/learn-runtime/lib/runtime-validation.mjs';
  let text = read(path);

  text = replaceOnce(
    text,
    "import fs from 'node:fs';\n",
    "import fs from 'node:fs';\nimport { isIP } from 'node:net';\n",
    'runtime node:net import',
  );
  text = replaceOnce(
    text,
    /^const KNOWN_HTML_ELEMENTS = .*$/m,
    "const APPROVED_TECHNICAL_PLACEHOLDERS = new Set(['<pubkey>', '<signature>', '<txid>', '<block_hash>']);",
    'runtime placeholder allowlist',
  );
  text = replaceOnce(
    text,
    "  'reference_type', 'reference', 'file', 'sha256', 'record_sha256', 'source_sha256',\n",
    "  'reference_type', 'file', 'sha256', 'record_sha256', 'source_sha256',\n",
    'runtime reference traversal exemption removal',
  );
  text = replaceOnce(
    text,
    /function isActualHtmlToken\(token\) \{[\s\S]*?\n\}\n\nfunction containsActualHtml/,
    `function isActualHtmlToken(token) {
  return !APPROVED_TECHNICAL_PLACEHOLDERS.has(token);
}

function containsActualHtml`,
    'runtime exact placeholder policy',
  );

  const strictValidators = String.raw`function rawAuthorityHost(value) {
  const authority = value.slice('https://'.length).split(/[/?#]/, 1)[0];
  if (!authority || authority.includes('@')) return null;
  if (authority.startsWith('[')) {
    const closing = authority.indexOf(']');
    return closing > 0 ? authority.slice(1, closing) : null;
  }
  return authority.replace(/:\d+$/, '');
}

function hostnameReason(value, parsed) {
  const normalized = parsed.hostname.startsWith('[') && parsed.hostname.endsWith(']')
    ? parsed.hostname.slice(1, -1)
    : parsed.hostname;
  const rawHost = rawAuthorityHost(value);
  if (!rawHost) return 'must contain a valid hostname';

  if (/^[0-9.]+$/.test(rawHost)) {
    if (isIP(rawHost) !== 4) return 'contains an invalid IPv4 address';
    return null;
  }
  if (rawHost.includes(':')) {
    if (isIP(rawHost) !== 6) return 'contains an invalid IPv6 address';
    return null;
  }
  if (isIP(normalized)) return null;

  const hostname = normalized.toLowerCase();
  if (hostname === 'localhost') return 'must not use localhost';
  if (hostname.length > 253) return 'hostname exceeds the DNS length limit';
  const labels = hostname.split('.');
  if (labels.some((label) => label.length === 0)) return 'hostname contains an empty DNS label';
  for (const label of labels) {
    if (label.length > 63) return 'hostname contains a DNS label longer than 63 characters';
    if (!/^[a-z0-9-]+$/.test(label)) return 'hostname contains invalid DNS characters';
    if (label.startsWith('-') || label.endsWith('-')) return 'hostname contains a leading or trailing hyphen';
  }
  return null;
}

export function strictHttpsReason(value) {
  if (typeof value !== 'string' || !value || /\s/.test(value)) {
    return 'must be a complete HTTPS URL without whitespace';
  }
  if (/\[[^\]]+\]\(|!\[/.test(value)) return 'must not contain Markdown syntax';
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    return 'must be a parseable absolute HTTPS URL';
  }
  if (parsed.protocol !== 'https:') return 'must use the https: protocol';
  if (parsed.username || parsed.password) return 'must not contain credentials';
  if (!parsed.hostname) return 'must contain a hostname';
  return hostnameReason(value, parsed);
}

export function repositoryPathReason(value) {
  if (typeof value !== 'string' || !value) return 'must be a non-empty repository-relative path';
  if (value.startsWith('/')) return 'must not begin with a slash';
  if (value.includes('\\')) return 'must not contain backslashes';
  if (/^[A-Za-z][A-Za-z0-9+.-]*:/.test(value)) return 'must not contain a URL scheme';
  if (ACTIVE_MARKDOWN_LINK.test(value) || MARKDOWN_IMAGE.test(value) || /\]\s*\(/.test(value)) {
    return 'must not contain Markdown syntax';
  }
  if (!/^[A-Za-z0-9._/-]+$/.test(value)) return 'contains unsupported repository-path characters';
  const segments = value.split('/');
  if (segments.some((segment) => !segment || segment === '.' || segment === '..')) {
    return 'must not contain empty, dot, or parent traversal segments';
  }
  return null;
}

export function validateSourceReference(source, path = 'source_reference') {
  const errors = [];
  if (!isObject(source)) return [\`\${path} must be an object\`];
  const type = source.reference_type;
  const reference = source.reference;
  let reason = null;
  if (type === 'url') reason = strictHttpsReason(reference);
  else if (type === 'repository-path') reason = repositoryPathReason(reference);
  else if (type === 'citation' || type === 'other') reason = safeTextReason(reference);
  else errors.push(\`\${path}.reference_type is invalid\`);
  if (reason) errors.push(\`\${path}.reference \${reason}\`);
  return errors;
}

export function validateSemanticTableBlock`;

  text = replaceOnce(
    text,
    /function strictHttpsReason\(value\) \{[\s\S]*?\nexport function validateSemanticTableBlock/,
    strictValidators,
    'runtime typed reference validators',
  );

  const traversal = String.raw`function shouldValidateString(path, key, parent) {
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
    value.forEach((entry, index) => walkAll(entry, \`\${path}[\${index}]\`, errors, seen));
    return;
  }

  const inertCode = value.type === 'inert-code';
  const sourceReference = Object.prototype.hasOwnProperty.call(value, 'reference_type')
    && Object.prototype.hasOwnProperty.call(value, 'reference');

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
    errors.push(...validateGlossaryOwnership(value.ownership, \`\${path}.ownership\`));
  }

  for (const [key, child] of Object.entries(value)) {
    const childPath = pathJoin(path, key);
    if (inertCode && key === 'code') continue;
    if (sourceReference && key === 'reference') continue;
    if (typeof child === 'string') {
      if (shouldValidateString(childPath, key, value)) validateSafeText(child, childPath, errors);
      continue;
    }
    walkAll(child, childPath, errors, seen);
  }
}

export function validateRuntimeObject`;

  text = replaceOnce(
    text,
    /function shouldValidateString\(path, key, parent\) \{[\s\S]*?\nexport function validateRuntimeObject/,
    traversal,
    'runtime traversal correction',
  );

  text = replaceOnce(
    text,
    `  if (Array.isArray(runtime.sources)) {
    runtime.sources.forEach((source, index) => {
      if (source?.reference_type === 'url') {
        const reason = strictHttpsReason(source.reference);
        if (reason) errors.push(\`runtime.sources[\${index}].reference \${reason}\`);
      }
    });
  }
`,
    `  if (Array.isArray(runtime.sources)) {
    runtime.sources.forEach((source, index) => {
      errors.push(...validateSourceReference(source, \`runtime.sources[\${index}]\`));
    });
  }
`,
    'runtime all typed source references',
  );

  text = replaceOnce(
    text,
    "    else if (/reference must/.test(message)) category = 'source-reference';\n",
    "    else if (/reference|repository-relative path|hostname|IPv[46]|DNS|credentials|localhost/.test(message)) category = 'source-reference';\n",
    'runtime source error category',
  );

  write(path, text);
}

function patchSchema() {
  const path = 'docs/learn/runtime/schema/msc-learn-runtime-v2.schema.json';
  const schema = JSON.parse(read(path));

  schema.$defs.safeText = {
    type: 'string',
    pattern: String.raw`^(?![\s\S]*(?:<!--[\s\S]*?-->|<![^>]*>|<(?!pubkey>|signature>|txid>|block_hash>)\s*\/?\s*[A-Za-z][A-Za-z0-9:_-]*(?:\s[^<>]*?)?\s*\/?>|\[[^\[\]\n]+\]\([^()\n]+\)|!\[[^\]\n]*\]\([^()\n]+\)|\]\s*\(|\bon[a-z]+\s*=|\b(?:javascript|data|vbscript)\s*:))[\s\S]*$`,
    $comment: 'Plain text only. The exact case-sensitive escaped technical placeholders <pubkey>, <signature>, <txid>, and <block_hash> are allowed. Every other tag-shaped token, comments, declarations, Markdown links or images, malformed link syntax, inline event handlers, and unsafe URI schemes are forbidden. Every renderer must escape this value.',
  };

  const sourceReference = schema.$defs.sourceReference;
  sourceReference.properties.reference = {
    type: 'string',
    minLength: 1,
  };
  sourceReference.allOf = [
    {
      if: {
        type: 'object',
        properties: { reference_type: { const: 'url' } },
        required: ['reference_type'],
      },
      then: {
        type: 'object',
        properties: {
          reference: {
            type: 'string',
            minLength: 1,
            pattern: String.raw`^(?!.*\[[^\]]+\]\()(?!https:\/\/[^/?#\s]*@)https:\/\/[^\s]+$`,
          },
        },
      },
    },
    {
      if: {
        type: 'object',
        properties: { reference_type: { const: 'repository-path' } },
        required: ['reference_type'],
      },
      then: {
        type: 'object',
        properties: {
          reference: {
            type: 'string',
            minLength: 1,
            pattern: String.raw`^(?!/)(?!.*(?:^|/)\.\.(?:/|$))(?!.*\\)(?![A-Za-z][A-Za-z0-9+.-]*:)(?!.*\[[^\]]+\]\()(?!.*!\[)[A-Za-z0-9._/-]+$`,
          },
        },
      },
    },
    {
      if: {
        type: 'object',
        properties: { reference_type: { const: 'citation' } },
        required: ['reference_type'],
      },
      then: {
        type: 'object',
        properties: {
          reference: {
            allOf: [
              { $ref: '#/$defs/safeText' },
              { type: 'string', minLength: 1 },
            ],
          },
        },
      },
    },
    {
      if: {
        type: 'object',
        properties: { reference_type: { const: 'other' } },
        required: ['reference_type'],
      },
      then: {
        type: 'object',
        properties: {
          reference: {
            allOf: [
              { $ref: '#/$defs/safeText' },
              { type: 'string', minLength: 1 },
            ],
          },
        },
      },
    },
  ];

  write(path, JSON.stringify(schema, null, 2));
}

function patchAudit() {
  const path = 'scripts/learn-runtime/audit.mjs';
  let text = read(path);

  text = replaceOnce(
    text,
    "  validateRuntimeCandidate,\n",
    "  validateRuntimeCandidate,\n  validateSourceReference,\n  strictHttpsReason,\n  repositoryPathReason,\n",
    'audit typed validator imports',
  );

  text = replaceOnce(
    text,
    "  if (composed.valid || !composed.schema_errors.length || composed.runtime_errors.length) errors.push('Mandatory two-layer acceptance path does not reject schema-invalid candidates before runtime invariants');\n  return errors;\n",
    "  if (composed.valid || !composed.schema_errors.length || composed.runtime_errors.length) errors.push('Mandatory two-layer acceptance path does not reject schema-invalid candidates before runtime invariants');\n"
      + "  if (!strictHttpsReason('https://bad_host/path')) errors.push('Strict HTTPS validator accepts a DNS-invalid hostname');\n"
      + "  if (strictHttpsReason('https://example.com/path')) errors.push('Strict HTTPS validator rejects a valid DNS hostname');\n"
      + "  if (repositoryPathReason('docs/learn/content/example.md')) errors.push('Repository-path validator rejects a valid repository path');\n"
      + "  if (!repositoryPathReason('../escape.md')) errors.push('Repository-path validator accepts parent traversal');\n"
      + "  if (validateSourceReference({ reference_type: 'citation', reference: '<svg>' }).length === 0) errors.push('Typed citation validation accepts real markup');\n"
      + "  if (validateContentBlock({ ...validCode, code: '<script>alert(1)</script>\\n' }).length) errors.push('Explicit inert-code validation rejects exact markup-looking code data');\n"
      + "  return errors;\n",
    'audit runtime validator contract checks',
  );

  text = replaceOnce(
    text,
    "  for (const name of ['topicGuideRoleData', 'categoryHubRoleData', 'learningPathRoleData', 'featuredRouteRoleData', 'glossaryIndexRoleData']) {\n    if (!schema?.$defs?.[name]) errors.push(`Schema is missing role extension: ${name}`);\n  }\n  return errors;\n",
    "  for (const name of ['topicGuideRoleData', 'categoryHubRoleData', 'learningPathRoleData', 'featuredRouteRoleData', 'glossaryIndexRoleData']) {\n"
      + "    if (!schema?.$defs?.[name]) errors.push(`Schema is missing role extension: ${name}`);\n"
      + "  }\n"
      + "  const safeTextComment = String(schema?.$defs?.safeText?.$comment || '');\n"
      + "  for (const placeholder of ['<pubkey>', '<signature>', '<txid>', '<block_hash>']) {\n"
      + "    if (!safeTextComment.includes(placeholder)) errors.push(`Schema safeText does not identify approved placeholder: ${placeholder}`);\n"
      + "  }\n"
      + "  const sourceReference = schema?.$defs?.sourceReference;\n"
      + "  if (!Array.isArray(sourceReference?.allOf) || sourceReference.allOf.length !== 4) errors.push('Schema sourceReference must define four type-aware reference branches');\n"
      + "  return errors;\n",
    'audit schema contract checks',
  );

  text = replaceOnce(
    text,
    "    non_blocking_observations: observations,\n",
    "    non_blocking_observations: observations,\n"
      + "    source_references_detected: { structured: [], unqualified: [] },\n",
    'audit empty source records',
  );

  text = replaceOnce(
    text,
    "    non_blocking_observations: [...new Set(observations)],\n",
    "    non_blocking_observations: [...new Set(observations)],\n"
      + "    source_references_detected: {\n"
      + "      structured: markdown.source_references.structured.map((reference) => ({\n"
      + "        registry_id: entry.registry_id,\n"
      + "        package_path: entry.content_file,\n"
      + "        ...reference,\n"
      + "      })),\n"
      + "      unqualified: markdown.source_references.unqualified.map((reference) => ({\n"
      + "        registry_id: entry.registry_id,\n"
      + "        package_path: entry.content_file,\n"
      + "        ...reference,\n"
      + "      })),\n"
      + "    },\n",
    'audit package source records',
  );

  text = replaceOnce(
    text,
    /  const structuredSourceReferences = packages\.reduce\([\s\S]*?\n  const supportedSemanticTables =/,
    `  const structuredReferences = packages.flatMap((item) => item.source_references_detected.structured);
  const unqualifiedReferences = packages.flatMap((item) => item.source_references_detected.unqualified);
  const structuredReferenceCounts = {
    plain_https: structuredReferences.filter((item) => item.representation === 'plain-url').length,
    markdown_https: structuredReferences.filter((item) => item.representation === 'markdown-link').length,
    repository_path: structuredReferences.filter((item) => item.representation === 'repository-path').length,
    total: structuredReferences.length,
  };
  const unqualifiedReferenceCounts = {
    plain_url: unqualifiedReferences.filter((item) => item.representation === 'plain-url').length,
    markdown_link: unqualifiedReferences.filter((item) => item.representation === 'markdown-link').length,
    total: unqualifiedReferences.length,
  };
  const affectedPackageIds = packages
    .filter((item) => item.source_references_detected.unqualified.length)
    .map((item) => item.registry_id)
    .sort((a, b) => a.localeCompare(b));
  const supportedSemanticTables =`,
    'audit derived reference counts',
  );

  text = replaceOnce(text, "    report_version: '1.2.0',", "    report_version: '1.3.0',", 'audit report version');
  text = replaceOnce(
    text,
    "      structured_source_reference_observations: structuredSourceReferences,\n",
    "      structured_plain_https_references: structuredReferenceCounts.plain_https,\n"
      + "      structured_markdown_https_references: structuredReferenceCounts.markdown_https,\n"
      + "      structured_repository_path_references: structuredReferenceCounts.repository_path,\n"
      + "      total_structured_references: structuredReferenceCounts.total,\n"
      + "      unqualified_plain_url_references: unqualifiedReferenceCounts.plain_url,\n"
      + "      unqualified_markdown_links: unqualifiedReferenceCounts.markdown_link,\n"
      + "      total_unqualified_source_references: unqualifiedReferenceCounts.total,\n"
      + "      affected_package_ids: affectedPackageIds,\n",
    'audit report reference summary',
  );

  write(path, text);
}

function patchTests() {
  const path = 'scripts/learn-runtime/test-contract.mjs';
  let text = read(path);

  text = replaceOnce(
    text,
    "  validateRuntimeObject,\n",
    "  validateRuntimeObject,\n  validateSourceReference,\n  strictHttpsReason,\n  repositoryPathReason,\n",
    'test typed validator imports',
  );

  text = replaceOnce(
    text,
    "for (const html of ['<script>', '<a>', '<form>', '<button>', '<input>', '<x-widget>', '<div onclick=\"run()\">', '</div>', '<!-- comment -->', '<!DOCTYPE html>']) {",
    "for (const html of ['<svg>', '<SVG>', '<math>', '<marquee>', '<script>', '<style>', '<form>', '<button>', '<input>', '<iframe>', '<a>', '<x-widget>', '<div onclick=\"run()\">', '</div>', '</pubkey>', '<pubkey/>', '<pubkey onclick=\"run()\">', '<!-- comment -->', '<!DOCTYPE html>']) {",
    'test markup negatives',
  );

  text = replaceOnce(
    text,
    "assertNotBlocked('The comparison value < 5 remains ordinary text.', 'raw-html');\n",
    "assertNotBlocked('The comparison value < 5 remains ordinary text.', 'raw-html');\n"
      + "assertNotBlocked('The comparison height > width remains ordinary text.', 'raw-html');\n"
      + "assert.equal(safeTextReason('Use <pubkey>, <signature>, <txid>, and <block_hash> together.'), null);\n"
      + "assert.equal(blocks('### Placeholder table\\n\\nA | B\\n--- | ---\\n<pubkey> | <signature>\\n').semantic_tables.length, 1);\n",
    'test placeholder positives',
  );

  const boundaryTests = `
assertBlocked('## 4. Sources\n\n### Notes\n\n- URL: https://example.com\n', 'unqualified-source-reference', 'H3 plain URL must be unqualified');
assertBlocked('## 4. Sources\n\n### Notes\n\n- URL: [x](https://example.com)\n', 'unqualified-source-reference', 'H3 Markdown link must be unqualified');
for (const boundaryFixture of [
  '## 4. Sources\n\n1. **Primary source**\n   - URL: https://one.example\n\n### Notes\n   - URL: https://after.example\n',
  '## 4. Sources\n\n1. **Primary source**\n   - URL: https://one.example\n\n### Notes\n   - URL: [x](https://after.example)\n',
  '## 4. Sources\n\n1. **One**\n   - URL: https://one.example\n\n- URL: https://between.example\n\n2. **Two**\n   - URL: https://two.example\n',
  '## 4. Sources\n\n1. **One**\n   - URL: https://one.example\n\n- URL: [x](https://between.example)\n\n2. **Two**\n   - URL: https://two.example\n',
  '## 4. Sources\n\n1. **One**\n   - URL: https://one.example\n\n- URL: https://after.example\n',
  '## 4. Sources\n\n1. **One**\n   - URL: https://one.example\n\n- URL: [x](https://after.example)\n',
]) assertBlocked(boundaryFixture, 'unqualified-source-reference', 'record termination must expose unqualified references');
{
  const multiple = inspectMarkdown('## 4. Sources\n\n1. **One**\n   - URL: https://one.example\n\n2. **Two**\n   - URL: [two](https://two.example)\n', 'topic-guide');
  assert.equal(multiple.source_references.structured.length, 2);
  assert.deepEqual(multiple.source_references.structured.map((item) => item.record_number), [1, 2]);
  assert.equal(multiple.source_references.unqualified.length, 0);
}
for (const invalidHost of ['https://bad_host/path', 'https://-bad.example', 'https://bad-.example', 'https://bad..example', 'https://localhost/path']) {
  assertBlocked(\`## 4. Sources\n\n1. **Source**\n   - URL: \${invalidHost}\n\`, 'invalid-source-reference', \`invalid hostname must block: \${invalidHost}\`);
}
`;
  text = replaceOnce(
    text,
    "assertBlocked('[x](https://example.com', 'malformed-markdown-link', 'unbalanced link must block');\n",
    "assertBlocked('[x](https://example.com', 'malformed-markdown-link', 'unbalanced link must block');\n" + boundaryTests,
    'test source boundaries',
  );

  const runtimePositiveTests = `
// Approved placeholders remain accepted in complete runtime fields and table cells.
{
  const r = clone(fixtures['topic-guide']);
  r.identity.h1 = 'Uses <pubkey> and <signature>.';
  r.role_data.article_sections[0] = {
    id: 'table-placeholders', type: 'semantic-table', label: 'Placeholder table', label_source: 'nearest-source-heading',
    columns: [{ id: 'column-1', header: '<pubkey>', alignment: null }, { id: 'column-2', header: '<signature>', alignment: null }],
    rows: [{ cells: ['<txid>', '<block_hash>'] }], source_sha256: SHA,
  };
  const result = validateRuntimeCandidate(r);
  assert.equal(result.valid, true, JSON.stringify(result));
  assert.deepEqual(result.schema_errors, []);
  assert.deepEqual(result.runtime_errors, []);
}

// Exact inert code remains exempt only through the explicit inert-code contract.
for (const code of ['<script>alert(1)</script>\n', '[link](javascript:example)\n']) {
  const r = clone(fixtures['topic-guide']);
  r.role_data.article_sections[0] = {
    id: 'code-safe', type: 'inert-code', language: 'text', code,
    executable: false, controls_enabled: false, escape_before_render: true, source_sha256: SHA,
  };
  const result = validateRuntimeCandidate(r);
  assert.equal(result.valid, true, \`inert code must pass: \${JSON.stringify(result)}\`);
  assert.deepEqual(result.schema_errors, []);
  assert.deepEqual(result.runtime_errors, []);
}
{
  const r = clone(fixtures['topic-guide']);
  r.role_data.article_sections[0].text = '<script>alert(1)</script>';
  assertSchemaFailure(r, '/role_data/article_sections/0/text', 'pattern');
  assertDirectRuntimeFailure(r, 'runtime.role_data.article_sections[0].text', 'raw HTML');
}
{
  const r = clone(fixtures['topic-guide']);
  r.role_data.article_sections[0].text = '[link](javascript:example)';
  assertSchemaFailure(r, '/role_data/article_sections/0/text', 'pattern');
  assertDirectRuntimeFailure(r, 'runtime.role_data.article_sections[0].text', 'Markdown link');
}
`;
  text = replaceOnce(
    text,
    "// Every required less-obvious user-facing role location is safe in schema and runtime traversal.\n",
    runtimePositiveTests + "\n// Every required less-obvious user-facing role location is safe in schema and runtime traversal.\n",
    'test inert and placeholder runtime positives',
  );

  const extraUnsafe = `
{
  const r = clone(fixtures['topic-guide']); r.identity.h1 = '<svg>';
  assertSchemaFailure(r, '/identity/h1', 'pattern');
  assertDirectRuntimeFailure(r, 'runtime.identity.h1', 'raw HTML');
}
{
  const r = clone(fixtures['topic-guide']); r.sources[0].reference_type = 'citation'; r.sources[0].reference = '<svg>';
  assertSchemaFailure(r, '/sources/0/reference', 'pattern');
  assertDirectRuntimeFailure(r, 'runtime.sources[0].reference', 'raw HTML');
}
`;
  text = replaceOnce(
    text,
    "// Structural schema negatives with exact paths/categories.\n",
    extraUnsafe + "\n// Structural schema negatives with exact paths/categories.\n",
    'test svg full candidates',
  );

  const typedTests = `// URL structure and hostname semantics.
for (const validUrl of [
  'https://example.com/path',
  'https://sub.example.com/path',
  'https://xn--bcher-kva.example/path',
  'https://192.0.2.1/path',
  'https://[2001:db8::1]/path',
]) assert.equal(strictHttpsReason(validUrl), null, validUrl);
for (const invalidUrl of [
  'https://bad_host/path',
  'https://-bad.example',
  'https://bad-.example',
  'https://bad..example',
  'https://localhost/path',
  'https://999.1.1.1/path',
  'https://[2001:db8:::1]/path',
  'https://user:pass@example.com',
  'https://',
  'http://example.com',
  '//example.com',
  '/relative',
  'javascript:example',
  'https://bad host/example',
]) assert.ok(strictHttpsReason(invalidUrl), invalidUrl);

for (const badUrl of ['https://bad_host/path', 'https://-bad.example', 'https://bad-.example', 'https://bad..example', 'https://localhost/path', 'https://999.1.1.1/path']) {
  const r = clone(fixtures['topic-guide']); r.sources[0].reference = badUrl;
  assertRuntimeFailure(r, 'runtime.sources[0].reference', 'source-reference', '');
}
for (const structurallyBadUrl of ['https://', 'https://bad host/example', 'http://example.com', '//example.com', '/relative', 'https://user:pass@example.com']) {
  const r = clone(fixtures['topic-guide']); r.sources[0].reference = structurallyBadUrl;
  assertSchemaFailure(r, '/sources/0/reference', 'pattern');
}

// Type-aware source reference policy.
for (const [type, reference] of [
  ['url', 'https://example.com/source'],
  ['repository-path', 'docs/learn/content/example.md'],
  ['citation', 'Bitcoin Core documentation using <txid>.'],
  ['other', 'Archived technical reference.'],
]) {
  const r = clone(fixtures['topic-guide']); r.sources[0].reference_type = type; r.sources[0].reference = reference;
  const result = validateRuntimeCandidate(r);
  assert.equal(result.valid, true, \`\${type}: \${JSON.stringify(result)}\`);
  assert.deepEqual(validateSourceReference(r.sources[0], 'runtime.sources[0]'), []);
}
for (const pathValue of ['/absolute/path', '../escape.md', 'docs/../escape.md', 'https://example.com/path', 'docs\\escape.md']) {
  assert.ok(repositoryPathReason(pathValue));
  const r = clone(fixtures['topic-guide']); r.sources[0].reference_type = 'repository-path'; r.sources[0].reference = pathValue;
  assertSchemaFailure(r, '/sources/0/reference', 'pattern');
}
for (const [type, reference] of [
  ['citation', '[active](https://example.com)'],
  ['citation', '![image](image.png)'],
  ['other', '<svg>'],
  ['other', 'javascript:example'],
]) {
  const r = clone(fixtures['topic-guide']); r.sources[0].reference_type = type; r.sources[0].reference = reference;
  assertSchemaFailure(r, '/sources/0/reference', 'pattern');
  assertDirectRuntimeFailure(r, 'runtime.sources[0].reference', type === 'other' && reference === '<svg>' ? 'raw HTML' : reference.startsWith('!') ? 'Markdown image' : reference.startsWith('[') ? 'Markdown link' : 'unsafe URI');
}
`;

  text = replaceOnce(
    text,
    /\/\/ URL parser is a post-schema invariant for inert reference data\.[\s\S]*?\n\n\/\/ Corpus-level parser regression:/,
    typedTests + "\n// Corpus-level parser regression:",
    'test typed source and URL policy',
  );

  const corpusBlock = String.raw`// Corpus-level parser regression: all counts are derived from the corrected production parser.
const manifest = JSON.parse(fs.readFileSync('docs/learn/content/content-manifest.json', 'utf8'));
assert.equal(manifest.entries.length, 92);
const structuredReferenceCounts = { 'plain-url': 0, 'markdown-link': 0, 'repository-path': 0 };
const unqualifiedReferenceCounts = { 'plain-url': 0, 'markdown-link': 0 };
const affectedPackageIds = new Set();
for (const entry of manifest.entries) {
  const markdown = fs.readFileSync(entry.content_file, 'utf8');
  const result = inspectMarkdown(markdown, entry.page_role);
  for (const reference of result.source_references.structured) {
    structuredReferenceCounts[reference.representation] += 1;
    assert.ok(reference.record_order > 0);
    assert.ok(reference.field_name);
    assert.ok(reference.source_line > 0);
  }
  for (const reference of result.source_references.unqualified) {
    unqualifiedReferenceCounts[reference.representation] += 1;
    affectedPackageIds.add(entry.registry_id);
    assert.ok(reference.source_line > 0);
  }
}
const sourceReferenceCount = Object.values(structuredReferenceCounts).reduce((sum, count) => sum + count, 0);
const unqualifiedSourceLinks = Object.values(unqualifiedReferenceCounts).reduce((sum, count) => sum + count, 0);
assert.ok(structuredReferenceCounts['plain-url'] > 0, JSON.stringify(structuredReferenceCounts));
assert.ok(structuredReferenceCounts['markdown-link'] > 0, JSON.stringify(structuredReferenceCounts));
assert.ok(structuredReferenceCounts['repository-path'] > 0, JSON.stringify(structuredReferenceCounts));
assert.ok(unqualifiedSourceLinks > 0, JSON.stringify(unqualifiedReferenceCounts));
for (let number = 1; number <= 20; number += 1) {
  assert.ok(affectedPackageIds.has(\`MSC-GUIDE-\${String(number).padStart(3, '0')}\`), \`expected blocked guide \${number}\`);
}

// Direct content-block assertions retain precise invariant coverage.`;

  text = replaceOnce(
    text,
    /\/\/ Corpus-level parser regression: derive, do not hardcode parser output\.[\s\S]*?\n\/\/ Direct content-block assertions retain precise invariant coverage\./,
    corpusBlock,
    'test derived corpus accounting',
  );

  text = replaceOnce(
    text,
    "process.stdout.write(`MSC Learn runtime contract tests passed: five roles, 92 packages, ${sourceReferenceCount} structured source references.\\n`);",
    "process.stdout.write(`MSC Learn runtime contract tests passed: five roles, 92 packages, ${sourceReferenceCount} structured references, ${unqualifiedSourceLinks} unqualified references, ${affectedPackageIds.size} affected packages.\\n`);",
    'test final output',
  );

  write(path, text);
}

function apply() {
  patchRuntimeValidation();
  patchMarkdown();
  patchSchema();
  patchAudit();
  patchTests();

  write('.github/workflows/learn-validation.yml', ORIGINAL_WORKFLOW);
  fs.rmSync(fileURLToPath(import.meta.url));
  const directory = '.github/learn-runtime-correction';
  if (fs.existsSync(directory) && fs.readdirSync(directory).length === 0) fs.rmdirSync(directory);
  process.stdout.write('Applied authorized six-file correction and restored the permanent workflow.\n');
}

const mode = process.argv[2];
if (mode === 'reproduce') await reproduce();
else if (mode === 'apply') apply();
else throw new Error(`Unknown mode: ${mode}`);
