import fs from 'fs';
for (const file of fs.readdirSync('templates')) {
  if (!file.endsWith('.json')) continue;
  const source = fs.readFileSync(`templates/${file}`, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').trim();
  JSON.parse(source);
}
console.log('JSON templates parsed');
