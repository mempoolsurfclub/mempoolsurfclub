import { repositoryPathReason, strictHttpsReason } from './runtime-validation.mjs';

const ROLE_PATTERNS = {
  'topic-guide': [
    { name: 'article-subsections', pattern: /^###\s+.+$/gm },
  ],
  'category-hub': [
    { name: 'subcategory-records', pattern: /^###\s+Subcategory:\s+.+$/gm },
    { name: 'guide-card-records', pattern: /^####\s+MSC-GUIDE-\d{3}\s+\|\s+.+$/gm },
  ],
  'learning-path': [
    { name: 'stage-records', pattern: /^###\s+Stage\s+\d+:\s+.+$/gm },
    { name: 'path-step-records', pattern: /^###\s+Step\s+\d+:\s+MSC-[A-Z]+-[A-Z0-9-]+\s+\|\s+.+$/gm },
  ],
  'featured-route': [
    { name: 'lifecycle-step-records', pattern: /^###\s+\d+\.\s+.+$/gm },
    { name: 'companion-guide-records', pattern: /^###\s+MSC-GUIDE-\d{3}\s+\|\s+.+$/gm },
  ],
  'glossary-index': [
    { name: 'letter-groups', pattern: /^###\s+[A-Z]$/gm },
    { name: 'glossary-term-records', pattern: /^####\s+.+$/gm },
  ],
};

const ROLE_REQUIRED_CONSTRUCTS = {
  'topic-guide': ['article-subsections'],
  'category-hub': ['subcategory-records', 'guide-card-records'],
  'learning-path': ['stage-records', 'path-step-records'],
  'featured-route': ['lifecycle-step-records', 'companion-guide-records'],
  'glossary-index': ['letter-groups', 'glossary-term-records'],
};

const COMMON_REQUIRED_TITLES = [
  /introductory deck/i,
  /key terms/i,
  /sources/i,
  /seo title/i,
  /meta description/i,
  /(?:page )?excerpt/i,
  /(?:estimated |total )?reading time/i,
  /planned internal links/i,
  /accuracy (?:review )?checklist/i,
  /human verification/i,
  /illustration brief/i,
];

const STRUCTURED_LIST_SECTION = /sources|human verification|accuracy (?:review )?checklist|illustration brief|planned internal links/i;
const STRUCTURED_FIELD_SECTION = /sources|human verification|illustration brief|card or step copy|destination structure or sequence/i;
const VALID_FENCE_LANGUAGE = /^[A-Za-z0-9][A-Za-z0-9_+.-]*$/;
const MARKDOWN_LINK_PATTERN = /(?<!!)\[([^\[\]\n]+)\]\(([^()\n]+)\)/g;
const MARKDOWN_IMAGE_PATTERN = /!\[[^\]\n]*\]\([^()\n]+\)/g;
const HTML_CANDIDATE_PATTERN = /<!--[\s\S]*?-->|<![^>]*>|<\s*\/?\s*[A-Za-z][A-Za-z0-9:_-]*(?:\s[^<>]*?)?\s*\/?>/g;
const APPROVED_TECHNICAL_PLACEHOLDERS = new Set(['<pubkey>', '<signature>', '<txid>', '<block_hash>']);
const SOURCE_FIELD_PATTERN = /^\s*(?:[-*]\s+)?(Direct URL|URL|Reference):\s*(.+?)\s*$/i;
const NUMBERED_SOURCE_OPENER = /^\d+\.\s+\*\*[^*\n]+\*\*(?:\s+\|.*)?\s*$/;
const PLAIN_URL_PATTERN = /\bhttps?:\/\/[^\s<>()]+/gi;

function collectMatches(text, pattern) {
  return [...text.matchAll(pattern)].map((match) => match[0]);
}

function collectMatchObjects(text, pattern) {
  return [...text.matchAll(pattern)].map((match) => ({ text: match[0], index: match.index, match }));
}

function numberedSections(markdown) {
  const matches = [...markdown.matchAll(/^##\s+(\d+)\.\s+(.+)$/gm)];
  return matches.map((match, index) => ({
    number: Number(match[1]),
    title: match[2].trim(),
    start: match.index,
    body_start: match.index + match[0].length,
    end: matches[index + 1]?.index ?? markdown.length,
  }));
}

function sectionAt(sections, index) {
  return sections.find((section) => index >= section.start && index < section.end) || null;
}

function repeatedNumbers(sections) {
  const seen = new Set();
  const duplicates = [];
  for (const section of sections) {
    if (seen.has(section.number)) duplicates.push(section.number);
    seen.add(section.number);
  }
  return [...new Set(duplicates)].sort((a, b) => a - b);
}

function headingDepths(markdown) {
  const counts = {};
  for (const match of markdown.matchAll(/^(#{1,6})\s+.+$/gm)) {
    const depth = match[1].length;
    counts[depth] = (counts[depth] || 0) + 1;
  }
  return counts;
}

function lineRecords(markdown) {
  const records = [];
  let offset = 0;
  for (const [lineIndex, line] of markdown.split('\n').entries()) {
    records.push({ line, index: offset, end: offset + line.length, line_number: lineIndex + 1 });
    offset += line.length + 1;
  }
  return records;
}

function maskLine(line) {
  return ' '.repeat(line.length);
}

function fenceMarker(line) {
  const match = line.match(/^ {0,3}(`{3,}|~{3,})([^\n]*)$/);
  if (!match) return null;
  return { character: match[1][0], length: match[1].length, suffix: match[2] };
}

function isClosingFence(marker, opener) {
  return marker
    && marker.character === opener.character
    && marker.length >= opener.length
    && marker.suffix.trim() === '';
}

function isolateFencedCode(markdown) {
  const lines = markdown.split('\n');
  const masked = [...lines];
  const blocks = [];
  const unsupported = [];
  let sourceOrder = 0;

  for (let index = 0; index < lines.length; index += 1) {
    const opener = fenceMarker(lines[index]);
    if (!opener) continue;

    const openingLine = index + 1;
    const infoString = opener.suffix.trim();
    const language = infoString || null;
    const infoValid = language === null
      || (VALID_FENCE_LANGUAGE.test(language) && !(opener.character === '`' && language.includes('`')));
    let closingIndex = -1;
    let ambiguousNestedLine = null;

    for (let cursor = index + 1; cursor < lines.length; cursor += 1) {
      const marker = fenceMarker(lines[cursor]);
      if (isClosingFence(marker, opener)) {
        closingIndex = cursor;
        break;
      }
      if (marker && ambiguousNestedLine === null) ambiguousNestedLine = cursor + 1;
    }

    const maskEnd = closingIndex >= 0 ? closingIndex : lines.length - 1;
    for (let cursor = index; cursor <= maskEnd; cursor += 1) masked[cursor] = maskLine(lines[cursor]);

    if (closingIndex < 0) {
      unsupported.push({ line: openingLine, reason: 'unclosed-fence', example: lines[index].trim() });
      break;
    }

    if (!infoValid || ambiguousNestedLine !== null) {
      unsupported.push({
        line: openingLine,
        reason: !infoValid ? 'invalid-language-label' : 'nested-ambiguous-fence',
        nested_line: ambiguousNestedLine,
        example: lines[index].trim(),
      });
      index = closingIndex;
      continue;
    }

    const codeLines = lines.slice(index + 1, closingIndex);
    sourceOrder += 1;
    blocks.push({
      type: 'inert-code',
      language,
      code: codeLines.length ? `${codeLines.join('\n')}\n` : '',
      executable: false,
      controls_enabled: false,
      escape_before_render: true,
      source_order: sourceOrder,
      source_line: openingLine,
      closing_line: closingIndex + 1,
    });
    index = closingIndex;
  }

  return { markdown: masked.join('\n'), blocks, unsupported };
}

function isEscaped(text, index) {
  let backslashes = 0;
  for (let cursor = index - 1; cursor >= 0 && text[cursor] === '\\'; cursor -= 1) backslashes += 1;
  return backslashes % 2 === 1;
}

function edgePipeState(line) {
  const trimmed = line.trim();
  return {
    leading: trimmed.startsWith('|'),
    trailing: trimmed.endsWith('|') && !isEscaped(trimmed, trimmed.length - 1),
  };
}

function parsePipeRow(line) {
  let text = line.trim();
  const edge = edgePipeState(line);
  if (!text.includes('|')) return null;
  if (edge.leading) text = text.slice(1);
  if (edge.trailing) text = text.slice(0, -1);

  const cells = [];
  let cell = '';
  let separators = 0;
  let codeFenceLength = 0;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (character === '\\' && text[index + 1] === '|') {
      cell += '|';
      index += 1;
      continue;
    }
    if (character === '`' && !isEscaped(text, index)) {
      let run = 1;
      while (text[index + run] === '`') run += 1;
      if (!codeFenceLength) codeFenceLength = run;
      else if (run === codeFenceLength) codeFenceLength = 0;
      cell += '`'.repeat(run);
      index += run - 1;
      continue;
    }
    if (character === '|' && !isEscaped(text, index) && !codeFenceLength) {
      cells.push(cell.trim());
      cell = '';
      separators += 1;
      continue;
    }
    cell += character;
  }
  cells.push(cell.trim());

  if (!separators && !(edge.leading && edge.trailing)) return null;
  return {
    cells,
    separators,
    leading_outer_pipe: edge.leading,
    trailing_outer_pipe: edge.trailing,
    outer_pipe_syntax: edge.leading || edge.trailing,
    balanced_inline_code: codeFenceLength === 0,
  };
}

function delimiterAlignment(cell) {
  if (!/^:?-{3,}:?$/.test(cell)) return undefined;
  const left = cell.startsWith(':');
  const right = cell.endsWith(':');
  if (left && right) return 'center';
  if (right) return 'right';
  if (left) return 'left';
  return null;
}

function delimiterLike(row) {
  return Boolean(row?.cells.length && row.cells.every((cell) => /^:?-+:?$/.test(cell)));
}

function delimiterIntent(row) {
  return Boolean(row?.cells.length && row.cells.every((cell) => /^:?-*:?$/.test(cell)) && row.cells.some((cell) => cell.includes('-')));
}

function isActualHtmlToken(token) {
  return !APPROVED_TECHNICAL_PLACEHOLDERS.has(token);
}

function actualHtmlTokens(text) {
  const hits = [];
  for (const match of text.matchAll(HTML_CANDIDATE_PATTERN)) {
    if (isActualHtmlToken(match[0])) hits.push({ token: match[0], index: match.index });
  }
  HTML_CANDIDATE_PATTERN.lastIndex = 0;
  return hits;
}

function forbiddenTableCell(cell) {
  if (actualHtmlTokens(cell).length) return 'raw-html';
  if (MARKDOWN_IMAGE_PATTERN.test(cell)) {
    MARKDOWN_IMAGE_PATTERN.lastIndex = 0;
    return 'markdown-image';
  }
  MARKDOWN_IMAGE_PATTERN.lastIndex = 0;
  if (MARKDOWN_LINK_PATTERN.test(cell)) {
    MARKDOWN_LINK_PATTERN.lastIndex = 0;
    return 'active-destination-link';
  }
  MARKDOWN_LINK_PATTERN.lastIndex = 0;
  if (cell.endsWith('\\')) return 'multiline-cell';
  return null;
}

function nearestApprovedHeading(lines, beforeIndex) {
  for (let index = beforeIndex - 1; index >= 0; index -= 1) {
    const match = lines[index].match(/^(#{1,4})\s+(.+)$/);
    if (match) return { depth: match[1].length, text: match[2].trim(), line: index + 1 };
  }
  return null;
}

function tableRowEligible(line, parsed) {
  if (!parsed) return false;
  if (parsed.outer_pipe_syntax) return true;
  const trimmed = line.trim();
  if (/^(?:[-*+]\s+|\d+\.\s+|#{1,6}\s+)/.test(trimmed)) return false;
  return true;
}

function candidateRunEnd(lines, startIndex) {
  const first = parsePipeRow(lines[startIndex]);
  if (!tableRowEligible(lines[startIndex], first)) return startIndex;
  let cursor = startIndex + 1;
  while (cursor < lines.length && lines[cursor].trim()) {
    const parsed = parsePipeRow(lines[cursor]);
    if (!tableRowEligible(lines[cursor], parsed)) break;
    cursor += 1;
  }
  return cursor - 1;
}

function isTableCandidate(lines, index) {
  const first = parsePipeRow(lines[index]);
  if (!tableRowEligible(lines[index], first)) return false;
  const second = index + 1 < lines.length ? parsePipeRow(lines[index + 1]) : null;
  const secondEligible = tableRowEligible(lines[index + 1] || '', second);
  if (first.outer_pipe_syntax) return true;
  return Boolean(secondEligible && delimiterIntent(second));
}

function sameOuterPipeStyle(left, right) {
  return left?.leading_outer_pipe === right?.leading_outer_pipe
    && left?.trailing_outer_pipe === right?.trailing_outer_pipe;
}

function isolateSemanticTables(markdown) {
  const lines = markdown.split('\n');
  const masked = [...lines];
  const tables = [];
  const unsupported = [];
  let sourceOrder = 0;

  for (let index = 0; index < lines.length; index += 1) {
    if (!isTableCandidate(lines, index)) continue;

    const runEnd = candidateRunEnd(lines, index);
    const header = parsePipeRow(lines[index]);
    const delimiter = index + 1 <= runEnd ? parsePipeRow(lines[index + 1]) : null;
    const hasDelimiter = delimiterLike(delimiter);
    const bodyStart = hasDelimiter || delimiterIntent(delimiter) ? index + 2 : index + 1;
    const bodyIndexes = [];
    for (let cursor = bodyStart; cursor <= runEnd; cursor += 1) bodyIndexes.push(cursor);

    const reasons = [];
    if (!header?.balanced_inline_code) reasons.push('structurally-ambiguous-cell');
    if (!header || header.cells.length < 2) reasons.push('fewer-than-two-columns');
    if (header?.cells.some((cell) => !cell)) reasons.push('empty-header-cell');
    if (!hasDelimiter) reasons.push('missing-or-malformed-delimiter-row');

    const alignments = hasDelimiter ? delimiter.cells.map(delimiterAlignment) : [];
    if (delimiter && header && !sameOuterPipeStyle(header, delimiter)) reasons.push('mixed-outer-pipe-style');
    if (hasDelimiter && delimiter.cells.length !== header.cells.length) reasons.push('delimiter-column-count-mismatch');
    if (hasDelimiter && alignments.some((alignment) => alignment === undefined)) reasons.push('invalid-delimiter-cell');
    if ((hasDelimiter || delimiterIntent(delimiter)) && !bodyIndexes.length) reasons.push('missing-body-row');

    const bodyRows = bodyIndexes.map((lineIndex) => parsePipeRow(lines[lineIndex]));
    if (bodyRows.some((row) => !row?.balanced_inline_code)) reasons.push('structurally-ambiguous-cell');
    if (header && bodyRows.some((row) => row && !sameOuterPipeStyle(header, row))) reasons.push('mixed-outer-pipe-style');
    if (header && bodyRows.some((row) => row.cells.length !== header.cells.length)) reasons.push('body-column-count-mismatch');
    if (bodyRows.some((row) => row.cells.some((cell) => !cell))) reasons.push('empty-body-cell');

    const allTextCells = [
      ...(header?.cells || []),
      ...bodyRows.flatMap((row) => row?.cells || []),
    ];
    for (const cell of allTextCells) {
      const reason = forbiddenTableCell(cell);
      if (reason) reasons.push(reason);
    }

    if (runEnd + 1 < lines.length && /^\s+\S/.test(lines[runEnd + 1]) && lines[runEnd + 1].trim()) {
      reasons.push('ambiguous-multiline-row');
    }

    const heading = nearestApprovedHeading(lines, index);
    if (!heading?.text) reasons.push('missing-accessible-source-heading');

    for (let cursor = index; cursor <= runEnd; cursor += 1) masked[cursor] = maskLine(lines[cursor]);

    if (reasons.length) {
      unsupported.push({
        line: index + 1,
        header: lines[index].trim(),
        reasons: [...new Set(reasons)],
      });
      index = runEnd;
      continue;
    }

    sourceOrder += 1;
    tables.push({
      type: 'semantic-table',
      label: heading.text,
      label_source: 'nearest-source-heading',
      source_heading: { depth: heading.depth, text: heading.text, line: heading.line },
      columns: header.cells.map((headerText, columnIndex) => ({
        id: `column-${columnIndex + 1}`,
        header: headerText,
        alignment: alignments[columnIndex],
      })),
      rows: bodyRows.map((row) => ({ cells: row.cells })),
      source_order: sourceOrder,
      source_line: index + 1,
    });
    index = runEnd;
  }

  return { markdown: masked.join('\n'), tables, unsupported };
}

function detectUnsupportedNestedLists(markdown, sections) {
  const records = lineRecords(markdown);
  const hits = [];
  let previousNonBlank = null;
  for (const record of records) {
    if (!record.line.trim()) {
      previousNonBlank = null;
      continue;
    }
    const current = record.line.match(/^(\s*)(?:[-*+] |\d+\. )/);
    if (current && current[1].length >= 2) {
      const section = sectionAt(sections, record.index);
      if (!section || !STRUCTURED_LIST_SECTION.test(section.title)) {
        const previous = previousNonBlank?.line.match(/^(\s*)(?:[-*+] |\d+\. )/);
        if (previous && current[1].length > previous[1].length) hits.push(record.line);
      }
    }
    previousNonBlank = record;
  }
  return hits;
}

function maskInlineCode(markdown) {
  return markdown.split('\n').map((line) => {
    const chars = [...line];
    let index = 0;
    while (index < line.length) {
      if (line[index] !== '`' || isEscaped(line, index)) { index += 1; continue; }
      let run = 1;
      while (line[index + run] === '`') run += 1;
      const marker = '`'.repeat(run);
      const close = line.indexOf(marker, index + run);
      if (close < 0) { index += run; continue; }
      for (let cursor = index; cursor < close + run; cursor += 1) chars[cursor] = ' ';
      index = close + run;
    }
    return chars.join('');
  }).join('\n');
}

function detectRawHtml(markdown) {
  const hits = [];
  const lines = markdown.split('\n');
  for (const match of actualHtmlTokens(markdown)) {
    const lineNumber = markdown.slice(0, match.index).split('\n').length;
    hits.push({
      line: lineNumber,
      token: match.token,
      text: lines[lineNumber - 1]?.trim() || match.token,
    });
  }
  return hits;
}

function malformedFieldRecords(markdown, sections) {
  const fieldLabel = /^(Registry ID|Approved H1|Review date|Reviewer|Status|URL|Concept title|Educational purpose|Recommended placement|Visual description|Required labels|Caption|Alt text|Image orientation|Mobile crop notes)\b/i;
  return lineRecords(markdown).filter((record) => {
    const item = record.line.match(/^\s*-\s+(.+)$/)?.[1];
    if (!item || item.includes(':') || /^\[[ xX]\]/.test(item)) return false;
    const section = sectionAt(sections, record.index);
    if (!section || !STRUCTURED_FIELD_SECTION.test(section.title)) return false;
    return fieldLabel.test(item);
  }).map((record) => record.line);
}

function normalizedHttpsReference(value) {
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

function languageCounts(blocks) {
  const counts = {};
  for (const block of blocks) {
    const language = block.language || 'unlabeled';
    counts[language] = (counts[language] || 0) + 1;
  }
  return counts;
}

export function inspectMarkdown(markdown, pageRole) {
  const fenced = isolateFencedCode(markdown);
  const tableIsolation = isolateSemanticTables(fenced.markdown);
  const scanMarkdown = tableIsolation.markdown;
  const sections = numberedSections(scanMarkdown);
  const sectionTitles = sections.map((section) => section.title);
  const indentedListLines = scanMarkdown.split('\n').filter((line) => /^\s{2,}(?:[-*+] |\d+\. )/.test(line));
  const constructs = {
    paragraphs: /(^|\n\n)[^#\n\-*`][^\n]*/.test(scanMarkdown),
    numbered_destination_sections: sections.length,
    ordered_lists: collectMatches(scanMarkdown, /^\d+\.\s+.+$/gm).length,
    unordered_lists: collectMatches(scanMarkdown, /^\s*-\s+.+$/gm).length,
    indented_structured_list_lines: indentedListLines.length,
    heading_depths: headingDepths(scanMarkdown),
    inline_code: collectMatches(scanMarkdown, /`[^`\n]+`/g).length,
    strong_text: collectMatches(scanMarkdown, /\*\*[^*\n]+\*\*/g).length,
    structured_key_terms: collectMatches(scanMarkdown, /^\s*-\s+\*\*.+?:\*\*\s+.+$/gm).length,
    structured_sources: collectMatches(scanMarkdown, /^\d+\.\s+\*\*.+?\*\*\s*(?:\|.*)?$/gm).length,
    human_verification_sections: sectionTitles.filter((title) => /human verification/i.test(title)).length,
    accuracy_checklist_items: collectMatches(scanMarkdown, /^\s*-\s+\[[ xX]\]\s+.+$/gm).length,
    illustration_briefs: collectMatches(scanMarkdown, /^###\s+Illustration\s+\d+(?:\s+\(optional\))?\s*$/gm).length,
    semantic_tables: tableIsolation.tables,
    inert_fenced_code_blocks: fenced.blocks,
    role_specific: {},
  };
  for (const entry of ROLE_PATTERNS[pageRole] || []) constructs.role_specific[entry.name] = collectMatches(scanMarkdown, entry.pattern).length;

  const securityScanMarkdown = maskInlineCode(scanMarkdown);
  const rawHtml = detectRawHtml(securityScanMarkdown);
  const markdownImages = collectMatches(securityScanMarkdown, MARKDOWN_IMAGE_PATTERN);
  MARKDOWN_IMAGE_PATTERN.lastIndex = 0;
  const markdownLinks = detectMarkdownLinks(securityScanMarkdown, sections);
  const nestedLists = detectUnsupportedNestedLists(scanMarkdown, sections);
  const eventHandlers = collectMatches(securityScanMarkdown, /\bon[a-z]+\s*=/gi);
  const unexpectedHeadings = Object.entries(constructs.heading_depths)
    .filter(([depth]) => Number(depth) > 4)
    .map(([depth, count]) => ({ depth: Number(depth), count }));
  const malformedFields = malformedFieldRecords(scanMarkdown, sections);

  const unsupported = [];
  const push = (type, occurrences, blocking = true) => {
    if (occurrences?.length) unsupported.push({ type, count: occurrences.length, blocking, examples: occurrences.slice(0, 3) });
  };
  push('raw-html', rawHtml);
  push('active-markdown-link', markdownLinks.active);
  push('active-plain-url', markdownLinks.active_plain);
  push('malformed-markdown-link', markdownLinks.malformed);
  push('invalid-source-reference', markdownLinks.invalid_source_references);
  push('source-markdown-link', markdownLinks.source, false);
  push('source-plain-url', markdownLinks.source_plain, false);
  push('source-repository-path', markdownLinks.source_repository_paths, false);
  push('unqualified-source-reference', markdownLinks.unqualified_references);
  push('markdown-image', markdownImages);
  push('unsupported-table', tableIsolation.unsupported);
  push('unsupported-nested-list', nestedLists);
  push('unsupported-fenced-code', fenced.unsupported);
  push('inline-event-handler-text', eventHandlers);
  if (unexpectedHeadings.length) unsupported.push({
    type: 'unexpected-heading-depth',
    count: unexpectedHeadings.reduce((sum, item) => sum + item.count, 0),
    blocking: true,
    examples: unexpectedHeadings,
  });
  push('malformed-field-record', malformedFields);

  const duplicateSectionNumbers = repeatedNumbers(sections);
  if (duplicateSectionNumbers.length) unsupported.push({
    type: 'duplicate-numbered-section',
    count: duplicateSectionNumbers.length,
    blocking: true,
    examples: duplicateSectionNumbers,
  });

  const missingRequiredSections = COMMON_REQUIRED_TITLES
    .filter((pattern) => !sectionTitles.some((title) => pattern.test(title)))
    .map((pattern) => pattern.source);
  for (const name of ROLE_REQUIRED_CONSTRUCTS[pageRole] || []) {
    if (!constructs.role_specific[name]) missingRequiredSections.push(`role-construct:${name}`);
  }

  const observations = [];
  if (indentedListLines.length) observations.push(`Contains ${indentedListLines.length} indented structured list line(s) inside approved field, source, review, relationship, or illustration records.`);
  if (markdownLinks.structured_references.length) {
    const byRepresentation = markdownLinks.structured_references.reduce((counts, reference) => {
      counts[reference.representation] = (counts[reference.representation] || 0) + 1;
      return counts;
    }, {});
    observations.push(`Contains ${markdownLinks.structured_references.length} validated structured source reference(s) (${Object.entries(byRepresentation).map(([type, count]) => `${type}: ${count}`).join(', ')}); the future adapter must preserve them as inert reference data and escape them rather than render active links.`);
  }
  if (tableIsolation.tables.length) observations.push(`Contains ${tableIsolation.tables.length} supported semantic Markdown table(s); the role adapter must preserve ordered headers and rows and use the recorded source heading as the non-empty accessible label.`);
  if (fenced.blocks.length) {
    const counts = languageCounts(fenced.blocks);
    const labels = Object.entries(counts).map(([language, count]) => `${language}: ${count}`).join(', ');
    observations.push(`Contains ${fenced.blocks.length} supported inert fenced code block(s) (${labels}); the role adapter must preserve exact code text, escape it before rendering, and keep execution and controls disabled.`);
  }
  if ((ROLE_PATTERNS[pageRole] || []).some((entry) => constructs.role_specific[entry.name] > 0)) observations.push('Contains role-specific records requiring the documented page-role adapter.');

  return {
    numbered_sections: sections.map(({ number, title }) => ({ number, title })),
    constructs,
    unsupported_constructs: unsupported,
    missing_required_sections: missingRequiredSections,
    non_blocking_observations: observations,
    source_references: {
      structured: markdownLinks.structured_references,
      unqualified: markdownLinks.unqualified_references,
    },
  };
}
