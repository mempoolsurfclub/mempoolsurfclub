function parseQuoted(text) {
  if (text.startsWith('"') && text.endsWith('"')) {
    try { return JSON.parse(text); } catch (error) { throw new Error(`Invalid quoted frontmatter scalar: ${text} (${error.message})`); }
  }
  if (text.startsWith("'") && text.endsWith("'")) return text.slice(1, -1).replace(/''/g, "'");
  return null;
}

function splitInlineArray(body) {
  const values = [];
  let current = '';
  let quote = null;
  for (let index = 0; index < body.length; index += 1) {
    const char = body[index];
    if ((char === '"' || char === "'") && body[index - 1] !== '\\') {
      if (quote === char) quote = null;
      else if (!quote) quote = char;
      current += char;
    } else if (char === ',' && !quote) {
      values.push(current.trim());
      current = '';
    } else current += char;
  }
  if (current.trim()) values.push(current.trim());
  return values;
}

export function parseScalar(raw) {
  const text = String(raw ?? '').trim();
  if (!text) return '';
  const quoted = parseQuoted(text);
  if (quoted !== null) return quoted;
  if (text === '[]') return [];
  if (text.startsWith('[') && text.endsWith(']')) {
    return splitInlineArray(text.slice(1, -1)).filter(Boolean).map((item) => {
      const parsed = parseQuoted(item);
      return parsed === null ? item : parsed;
    });
  }
  if (/^(true|false)$/i.test(text)) return text.toLowerCase() === 'true';
  if (/^null$/i.test(text)) return null;
  return text;
}

export function parseFrontmatter(source, { requiredFields = [] } = {}) {
  if (typeof source !== 'string') throw new Error('Frontmatter source must be a string');
  if (!source.startsWith('---\n')) throw new Error('Missing opening frontmatter delimiter');
  const closingIndex = source.indexOf('\n---\n', 4);
  if (closingIndex === -1) throw new Error('Missing closing frontmatter delimiter');

  const lines = source.slice(4, closingIndex).split('\n');
  const data = {};
  let activeList = null;

  lines.forEach((line, zeroIndex) => {
    const lineNumber = zeroIndex + 2;
    if (!line.trim()) {
      activeList = null;
      return;
    }
    const listMatch = line.match(/^\s{2,}-\s+(.*)$/);
    if (listMatch) {
      if (!activeList) throw new Error(`Frontmatter list item has no parent field on line ${lineNumber}`);
      const value = parseScalar(listMatch[1]);
      if (Array.isArray(value)) throw new Error(`Nested inline arrays are unsupported on line ${lineNumber}`);
      data[activeList].push(value);
      return;
    }
    if (/^\s/.test(line)) throw new Error(`Unsupported frontmatter indentation on line ${lineNumber}: ${line}`);
    const fieldMatch = line.match(/^([A-Za-z0-9_]+):(?:\s*(.*))?$/);
    if (!fieldMatch) throw new Error(`Malformed frontmatter line ${lineNumber}: ${line}`);
    const [, key, raw = ''] = fieldMatch;
    if (Object.prototype.hasOwnProperty.call(data, key)) throw new Error(`Duplicate frontmatter field ${key} on line ${lineNumber}`);
    if (!raw.trim()) {
      data[key] = [];
      activeList = key;
    } else {
      data[key] = parseScalar(raw);
      activeList = null;
    }
  });

  for (const field of requiredFields) {
    if (!Object.prototype.hasOwnProperty.call(data, field) || data[field] === '' || data[field] === null) {
      throw new Error(`Missing required frontmatter field: ${field}`);
    }
  }

  return {
    data,
    body: source.slice(closingIndex + 5),
    raw: source.slice(4, closingIndex),
  };
}
