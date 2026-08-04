import fs from 'fs';
import path from 'path';

export const ROOT = process.cwd();

export function assertRepositoryRelativePath(input, label = 'path') {
  if (typeof input !== 'string' || !input.trim()) throw new Error(`${label} must be a non-empty string`);
  const value = input.replace(/\\/g, '/');
  if (path.posix.isAbsolute(value) || /^[A-Za-z]:\//.test(value)) throw new Error(`${label} must be repository-relative: ${input}`);
  const normalized = path.posix.normalize(value);
  if (normalized === '..' || normalized.startsWith('../') || normalized.includes('/../')) throw new Error(`${label} escapes the repository: ${input}`);
  if (normalized.startsWith('./')) return normalized.slice(2);
  return normalized;
}

export function resolveRepositoryPath(relativePath) {
  const safe = assertRepositoryRelativePath(relativePath);
  const absolute = path.resolve(ROOT, safe);
  const rootWithSep = `${path.resolve(ROOT)}${path.sep}`;
  if (absolute !== path.resolve(ROOT) && !absolute.startsWith(rootWithSep)) throw new Error(`Path escapes repository: ${relativePath}`);
  return absolute;
}

export function normalizeText(value) {
  return String(value ?? '').replace(/\r\n?/g, '\n');
}

export function readUtf8(relativePath, { normalizeLineEndings = false } = {}) {
  const text = fs.readFileSync(resolveRepositoryPath(relativePath), 'utf8');
  return normalizeLineEndings ? normalizeText(text) : text;
}

export function fileExists(relativePath) {
  try {
    return fs.statSync(resolveRepositoryPath(relativePath)).isFile();
  } catch {
    return false;
  }
}

export function ensureParentDirectory(relativePath) {
  fs.mkdirSync(path.dirname(resolveRepositoryPath(relativePath)), { recursive: true });
}

export function writeUtf8(relativePath, content) {
  ensureParentDirectory(relativePath);
  const destination = resolveRepositoryPath(relativePath);
  const temporary = `${destination}.tmp-${process.pid}`;
  fs.writeFileSync(temporary, content, 'utf8');
  fs.renameSync(temporary, destination);
}
