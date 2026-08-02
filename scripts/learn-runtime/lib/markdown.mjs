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

const ROLE_REQUIRED_TITLES = {
  'topic-guide': [/full article/i],
  'category-hub': [/full destination copy/i, /(?:guide cards|hub structure|subcategory)/i],
  'learning-path': [/full destination copy/i, /(?:path structure|stage structure|approved path structure)/i, /(?:step records|path steps|step-by-step)/i],
  'featured-route': [/full destination copy|transaction lifecycle|route orientation/i, /(?:lifecycle|route steps)/i, /companion/i],
  'glossary-index': [/full destination copy|glossary orientation/i, /populated letter/i, /(?:glossary entries|preferred terms|letter groups)/i],
};

function collectMatches(text, pattern) {
  return [...text.matchAll(pattern)].map((match) => match[0]);
}

function numberedSections(markdown) {
  return [...markdown.matchAll(/^##\s+(\d+)\.\s+(.+)$/gm)].map((match) => ({
    number: Number(match[1]),
    title: match[2].trim(),
  }));
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

function detectNestedLists(markdown) {
  return markdown.split('\n').filter((line) => /^\s{2,}(?:[-*+] |\d+\. )/.test(line));
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

function malformedFieldRecords(markdown) {
  return markdown.split('\n').filter((line) => /^\s*-\s+[^:]+$/.test(line) && /(?:Registry ID|Approved H1|Review date|Reviewer|Status|URL|Concept title|Educational purpose|Recommended placement|Visual description|Required labels|Caption|Alt text|Image orientation|Mobile crop notes)/i.test(line));
}

export function inspectMarkdown(markdown, pageRole) {
  const sections = numberedSections(markdown);
  const sectionTitles = sections.map((section) => section.title);
  const constructs = {
    paragraphs: /(^|\n\n)[^#\n\-*`][^\n]*/.test(markdown),
    numbered_destination_sections: sections.length,
    ordered_lists: collectMatches(markdown, /^\d+\.\s+.+$/gm).length,
    unordered_lists: collectMatches(markdown, /^\s*-\s+.+$/gm).length,
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
  const markdownLinks = collectMatches(markdown, /(?<!!)\[[^\]]+\]\([^\n)]+\)/g);
  const tables = detectTables(markdown);
  const nestedLists = detectNestedLists(markdown);
  const fencedScripts = detectFencedScripts(markdown);
  const eventHandlers = collectMatches(markdown, /\bon[a-z]+\s*=/gi);
  const unexpectedHeadings = Object.entries(constructs.heading_depths).filter(([depth]) => Number(depth) > 4).map(([depth, count]) => ({ depth: Number(depth), count }));
  const malformedFields = malformedFieldRecords(markdown);

  const unsupported = [];
  const push = (type, occurrences, blocking = true) => {
    if (occurrences?.length) unsupported.push({ type, count: occurrences.length, blocking, examples: occurrences.slice(0, 3) });
  };
  push('raw-html', rawHtml);
  push('active-markdown-link', markdownLinks);
  push('markdown-image', markdownImages);
  push('unsupported-table', tables);
  push('unsupported-nested-list', nestedLists);
  push('fenced-script-content', fencedScripts);
  push('inline-event-handler-text', eventHandlers);
  if (unexpectedHeadings.length) unsupported.push({ type: 'unexpected-heading-depth', count: unexpectedHeadings.reduce((sum, item) => sum + item.count, 0), blocking: true, examples: unexpectedHeadings });
  push('malformed-field-record', malformedFields);

  const duplicateSectionNumbers = repeatedNumbers(sections);
  if (duplicateSectionNumbers.length) unsupported.push({ type: 'duplicate-numbered-section', count: duplicateSectionNumbers.length, blocking: true, examples: duplicateSectionNumbers });

  const requiredPatterns = [...COMMON_REQUIRED_TITLES, ...(ROLE_REQUIRED_TITLES[pageRole] || [])];
  const missingRequiredSections = requiredPatterns.filter((pattern) => !sectionTitles.some((title) => pattern.test(title))).map((pattern) => pattern.source);

  const observations = [];
  const fencedBlocks = collectMatches(markdown, /^```[^\n]*$/gm).length;
  if (fencedBlocks && !fencedScripts.length) observations.push(`Contains ${fencedBlocks} non-script fenced-code delimiter(s); adapter must preserve escaped text.`);
  if ((ROLE_PATTERNS[pageRole] || []).some((entry) => constructs.role_specific[entry.name] > 0)) observations.push('Contains role-specific records requiring the documented page-role adapter.');

  return {
    numbered_sections: sections,
    constructs,
    unsupported_constructs: unsupported,
    missing_required_sections: missingRequiredSections,
    non_blocking_observations: observations,
  };
}
