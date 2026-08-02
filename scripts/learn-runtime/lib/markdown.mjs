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

function collectMatches(text, pattern) {
  return [...text.matchAll(pattern)].map((match) => match[0]);
}

function collectMatchObjects(text, pattern) {
  return [...text.matchAll(pattern)].map((match) => ({ text: match[0], index: match.index }));
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
    records.push({ line, index: offset, line_number: lineIndex + 1 });
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
  return {
    character: match[1][0],
    length: match[1].length,
    suffix: match[2],
  };
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
      unsupported.push({
        line: openingLine,
        reason: 'unclosed-fence',
        example: lines[index].trim(),
      });
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

  return {
    markdown: masked.join('\n'),
    blocks,
    unsupported,
  };
}

function isEscaped(text, index) {
  let backslashes = 0;
  for (let cursor = index - 1; cursor >= 0 && text[cursor] === '\\'; cursor -= 1) backslashes += 1;
  return backslashes % 2 === 1;
}

function splitPipeRow(line) {
  let text = line.trim();
  if (!text.includes('|')) return null;
  if (text.startsWith('|')) text = text.slice(1);
  if (text.endsWith('|') && !isEscaped(text, text.length - 1)) text = text.slice(0, -1);

  const cells = [];
  let cell = '';
  let separators = 0;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (character === '\\' && text[index + 1] === '|') {
      cell += '|';
      index += 1;
      continue;
    }
    if (character === '|' && !isEscaped(text, index)) {
      cells.push(cell.trim());
      cell = '';
      separators += 1;
      continue;
    }
    cell += character;
  }
  cells.push(cell.trim());
  return separators ? cells : null;
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

function looksLikeDelimiterRow(line) {
  const cells = splitPipeRow(line);
  return Boolean(cells?.length && cells.every((cell) => /^:?-+:?$/.test(cell)));
}

function forbiddenTableCell(cell) {
  if (/<\/?[A-Za-z][^>]*>/.test(cell)) return 'raw-html';
  if (/!\[[^\]]*\]\([^\n)]+\)/.test(cell)) return 'markdown-image';
  if (/(?<!!)\[[^\]]+\]\([^\n)]+\)/.test(cell)) return 'active-destination-link';
  if (cell.endsWith('\\')) return 'multiline-cell';
  const backticks = (cell.match(/`/g) || []).length;
  if (backticks % 2 !== 0) return 'structurally-ambiguous-cell';
  return null;
}

function nearestApprovedHeading(lines, beforeIndex) {
  for (let index = beforeIndex - 1; index >= 0; index -= 1) {
    const match = lines[index].match(/^(#{1,4})\s+(.+)$/);
    if (match) return { depth: match[1].length, text: match[2].trim(), line: index + 1 };
  }
  return null;
}

function isolateSemanticTables(markdown) {
  const lines = markdown.split('\n');
  const masked = [...lines];
  const tables = [];
  const unsupported = [];
  const consumed = new Set();
  let sourceOrder = 0;

  for (let delimiterIndex = 1; delimiterIndex < lines.length; delimiterIndex += 1) {
    if (consumed.has(delimiterIndex) || !looksLikeDelimiterRow(lines[delimiterIndex])) continue;
    const headerIndex = delimiterIndex - 1;
    const headerCells = splitPipeRow(lines[headerIndex]);
    const delimiterCells = splitPipeRow(lines[delimiterIndex]);
    if (!headerCells || !delimiterCells) continue;

    const bodyLines = [];
    let cursor = delimiterIndex + 1;
    while (cursor < lines.length && lines[cursor].trim() && splitPipeRow(lines[cursor])) {
      bodyLines.push(cursor);
      cursor += 1;
    }

    const tableLines = [headerIndex, delimiterIndex, ...bodyLines];
    for (const lineIndex of tableLines) {
      consumed.add(lineIndex);
      masked[lineIndex] = maskLine(lines[lineIndex]);
    }

    const reasons = [];
    if (headerCells.length < 2) reasons.push('fewer-than-two-columns');
    if (headerCells.some((cell) => !cell)) reasons.push('empty-header-cell');
    if (delimiterCells.length !== headerCells.length) reasons.push('delimiter-column-count-mismatch');
    const alignments = delimiterCells.map(delimiterAlignment);
    if (alignments.some((alignment) => alignment === undefined)) reasons.push('invalid-delimiter-cell');
    if (!bodyLines.length) reasons.push('missing-body-row');

    const bodyRows = bodyLines.map((lineIndex) => splitPipeRow(lines[lineIndex]));
    if (bodyRows.some((cells) => cells.length !== headerCells.length)) reasons.push('body-column-count-mismatch');
    const allTextCells = [...headerCells, ...bodyRows.flat()];
    for (const cell of allTextCells) {
      const reason = forbiddenTableCell(cell);
      if (reason) reasons.push(reason);
    }

    const heading = nearestApprovedHeading(lines, headerIndex);
    if (!heading?.text) reasons.push('missing-accessible-source-heading');

    if (reasons.length) {
      unsupported.push({
        line: headerIndex + 1,
        header: lines[headerIndex].trim(),
        reasons: [...new Set(reasons)],
      });
      delimiterIndex = Math.max(delimiterIndex, cursor - 1);
      continue;
    }

    sourceOrder += 1;
    tables.push({
      type: 'semantic-table',
      label: heading.text,
      label_source: 'nearest-source-heading',
      source_heading: {
        depth: heading.depth,
        text: heading.text,
        line: heading.line,
      },
      columns: headerCells.map((header, index) => ({
        id: `column-${index + 1}`,
        header,
        alignment: alignments[index],
      })),
      rows: bodyRows.map((cells) => ({ cells })),
      source_order: sourceOrder,
      source_line: headerIndex + 1,
    });
    delimiterIndex = Math.max(delimiterIndex, cursor - 1);
  }

  for (let index = 0; index < lines.length - 1; index += 1) {
    if (consumed.has(index) || consumed.has(index + 1)) continue;
    const first = splitPipeRow(lines[index]);
    const second = splitPipeRow(lines[index + 1]);
    if (!first || !second || first.length < 2 || second.length < 2) continue;
    if (!(lines[index].trim().startsWith('|') || lines[index].trim().endsWith('|'))) continue;
    unsupported.push({
      line: index + 1,
      header: lines[index].trim(),
      reasons: ['missing-or-malformed-delimiter-row'],
    });
    consumed.add(index);
    consumed.add(index + 1);
    masked[index] = maskLine(lines[index]);
    masked[index + 1] = maskLine(lines[index + 1]);
    index += 1;
  }

  return {
    markdown: masked.join('\n'),
    tables,
    unsupported,
  };
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

function detectRawHtml(markdown) {
  return markdown.split('\n').filter((line) => {
    const trimmed = line.trim();
    if (!trimmed.startsWith('<')) return false;
    return /^<\/?[A-Za-z][^>]*>/.test(trimmed);
  });
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

function detectMarkdownLinks(markdown, sections) {
  const source = [];
  const active = [];
  for (const match of collectMatchObjects(markdown, /(?<!!)\[[^\]]+\]\([^\n)]+\)/g)) {
    const section = sectionAt(sections, match.index);
    if (section && /sources/i.test(section.title)) source.push(match.text);
    else active.push(match.text);
  }
  return { source, active };
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
    structured_sources: collectMatches(scanMarkdown, /^\d+\.\s+\*\*.+?\*\*\s*$/gm).length,
    human_verification_sections: sectionTitles.filter((title) => /human verification/i.test(title)).length,
    accuracy_checklist_items: collectMatches(scanMarkdown, /^\s*-\s+\[[ xX]\]\s+.+$/gm).length,
    illustration_briefs: collectMatches(scanMarkdown, /^###\s+Illustration\s+\d+(?:\s+\(optional\))?\s*$/gm).length,
    semantic_tables: tableIsolation.tables,
    inert_fenced_code_blocks: fenced.blocks,
    role_specific: {},
  };
  for (const entry of ROLE_PATTERNS[pageRole] || []) constructs.role_specific[entry.name] = collectMatches(scanMarkdown, entry.pattern).length;

  const rawHtml = detectRawHtml(scanMarkdown);
  const markdownImages = collectMatches(scanMarkdown, /!\[[^\]]*\]\([^\n)]+\)/g);
  const markdownLinks = detectMarkdownLinks(scanMarkdown, sections);
  const nestedLists = detectUnsupportedNestedLists(scanMarkdown, sections);
  const eventHandlers = collectMatches(scanMarkdown, /\bon[a-z]+\s*=/gi);
  const unexpectedHeadings = Object.entries(constructs.heading_depths).filter(([depth]) => Number(depth) > 4).map(([depth, count]) => ({ depth: Number(depth), count }));
  const malformedFields = malformedFieldRecords(scanMarkdown, sections);

  const unsupported = [];
  const push = (type, occurrences, blocking = true) => {
    if (occurrences?.length) unsupported.push({ type, count: occurrences.length, blocking, examples: occurrences.slice(0, 3) });
  };
  push('raw-html', rawHtml);
  push('active-markdown-link', markdownLinks.active);
  push('source-markdown-link', markdownLinks.source, false);
  push('markdown-image', markdownImages);
  push('unsupported-table', tableIsolation.unsupported);
  push('unsupported-nested-list', nestedLists);
  push('unsupported-fenced-code', fenced.unsupported);
  push('inline-event-handler-text', eventHandlers);
  if (unexpectedHeadings.length) unsupported.push({ type: 'unexpected-heading-depth', count: unexpectedHeadings.reduce((sum, item) => sum + item.count, 0), blocking: true, examples: unexpectedHeadings });
  push('malformed-field-record', malformedFields);

  const duplicateSectionNumbers = repeatedNumbers(sections);
  if (duplicateSectionNumbers.length) unsupported.push({ type: 'duplicate-numbered-section', count: duplicateSectionNumbers.length, blocking: true, examples: duplicateSectionNumbers });

  const missingRequiredSections = COMMON_REQUIRED_TITLES.filter((pattern) => !sectionTitles.some((title) => pattern.test(title))).map((pattern) => pattern.source);
  for (const name of ROLE_REQUIRED_CONSTRUCTS[pageRole] || []) {
    if (!constructs.role_specific[name]) missingRequiredSections.push(`role-construct:${name}`);
  }

  const observations = [];
  if (indentedListLines.length) observations.push(`Contains ${indentedListLines.length} indented structured list line(s) inside approved field, source, review, relationship, or illustration records.`);
  if (markdownLinks.source.length) observations.push(`Contains ${markdownLinks.source.length} Markdown source-reference link(s); the future adapter must extract and escape these as reference text rather than render active links.`);
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
  };
}
