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
  for (const line of markdown.split('\n')) {
    records.push({ line, index: offset });
    offset += line.length + 1;
  }
  return records;
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

function detectTables(markdown) {
  const lines = markdown.split('\n');
  const hits = [];
  for (let index = 1; index < lines.length; index += 1) {
    if (/^\s*\|?.+\|.+\|?\s*$/.test(lines[index - 1]) && /^\s*\|?\s*:?-{3,}/.test(lines[index])) hits.push(lines[index - 1].trim());
  }
  return hits;
}

function detectFencedScripts(markdown) {
  const hits = [];
  for (const match of markdown.matchAll(/^```\s*([^\n]*)\n[\s\S]*?^```\s*$/gm)) {
    const language = match[1].trim().toLowerCase();
    if (['js', 'javascript', 'ts', 'typescript', 'html', 'liquid', 'bash', 'sh', 'shell', 'zsh', 'powershell'].includes(language)) hits.push(language || 'unlabeled');
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

export function inspectMarkdown(markdown, pageRole) {
  const sections = numberedSections(markdown);
  const sectionTitles = sections.map((section) => section.title);
  const indentedListLines = markdown.split('\n').filter((line) => /^\s{2,}(?:[-*+] |\d+\. )/.test(line));
  const constructs = {
    paragraphs: /(^|\n\n)[^#\n\-*`][^\n]*/.test(markdown),
    numbered_destination_sections: sections.length,
    ordered_lists: collectMatches(markdown, /^\d+\.\s+.+$/gm).length,
    unordered_lists: collectMatches(markdown, /^\s*-\s+.+$/gm).length,
    indented_structured_list_lines: indentedListLines.length,
    heading_depths: headingDepths(markdown),
    inline_code: collectMatches(markdown, /`[^`\n]+`/g).length,
    strong_text: collectMatches(markdown, /\*\*[^*\n]+\*\*/g).length,
    structured_key_terms: collectMatches(markdown, /^\s*-\s+\*\*.+?:\*\*\s+.+$/gm).length,
    structured_sources: collectMatches(markdown, /^\d+\.\s+\*\*.+?\*\*\s*$/gm).length,
    human_verification_sections: sectionTitles.filter((title) => /human verification/i.test(title)).length,
    accuracy_checklist_items: collectMatches(markdown, /^\s*-\s+\[[ xX]\]\s+.+$/gm).length,
    illustration_briefs: collectMatches(markdown, /^###\s+Illustration\s+\d+(?:\s+\(optional\))?\s*$/gm).length,
    role_specific: {},
  };
  for (const entry of ROLE_PATTERNS[pageRole] || []) constructs.role_specific[entry.name] = collectMatches(markdown, entry.pattern).length;

  const rawHtml = detectRawHtml(markdown);
  const markdownImages = collectMatches(markdown, /!\[[^\]]*\]\([^\n)]+\)/g);
  const markdownLinks = detectMarkdownLinks(markdown, sections);
  const tables = detectTables(markdown);
  const nestedLists = detectUnsupportedNestedLists(markdown, sections);
  const fencedScripts = detectFencedScripts(markdown);
  const eventHandlers = collectMatches(markdown, /\bon[a-z]+\s*=/gi);
  const unexpectedHeadings = Object.entries(constructs.heading_depths).filter(([depth]) => Number(depth) > 4).map(([depth, count]) => ({ depth: Number(depth), count }));
  const malformedFields = malformedFieldRecords(markdown, sections);

  const unsupported = [];
  const push = (type, occurrences, blocking = true) => {
    if (occurrences?.length) unsupported.push({ type, count: occurrences.length, blocking, examples: occurrences.slice(0, 3) });
  };
  push('raw-html', rawHtml);
  push('active-markdown-link', markdownLinks.active);
  push('source-markdown-link', markdownLinks.source, false);
  push('markdown-image', markdownImages);
  push('unsupported-table', tables);
  push('unsupported-nested-list', nestedLists);
  push('fenced-script-content', fencedScripts);
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
  const fencedBlocks = collectMatches(markdown, /^```[^\n]*$/gm).length;
  if (fencedBlocks && !fencedScripts.length) observations.push(`Contains ${fencedBlocks} non-script fenced-code delimiter(s); the shared Markdown layer must preserve escaped code text.`);
  if ((ROLE_PATTERNS[pageRole] || []).some((entry) => constructs.role_specific[entry.name] > 0)) observations.push('Contains role-specific records requiring the documented page-role adapter.');

  return {
    numbered_sections: sections.map(({ number, title }) => ({ number, title })),
    constructs,
    unsupported_constructs: unsupported,
    missing_required_sections: missingRequiredSections,
    non_blocking_observations: observations,
  };
}
