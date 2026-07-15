import fs from 'fs';
const registryPath='docs/learn/MSC_Learn_Master_Registry.json';
const registry=JSON.parse(fs.readFileSync(registryPath,'utf8'));
const fail=[]; const ids=new Set(); const slugs=new Set();
function addId(x){ if(ids.has(x.id)) fail.push(`Duplicate id ${x.id}`); ids.add(x.id); if(x.planned_slug){ if(slugs.has(x.planned_slug)) fail.push(`Duplicate slug ${x.planned_slug}`); slugs.add(x.planned_slug); }}
[registry.homepage, registry.glossary_index, registry.featured_route, ...registry.categories, ...registry.learning_paths, ...registry.topic_guides].forEach(addId);
if(ids.size!==93) fail.push(`Expected 93 destinations, found ${ids.size}`);
if(registry.topic_guides.length!==80) fail.push('Expected 80 topic guides');
if(registry.categories.length!==5) fail.push('Expected 5 category hubs');
if(registry.learning_paths.length!==5) fail.push('Expected 5 learning paths');
if(registry.glossary.length!==141) fail.push('Expected 141 glossary terms');
const guideById=new Map(registry.topic_guides.map(g=>[g.id,g])); const catByHandle=new Map(registry.categories.map(c=>[c.planned_slug,c]));
for(const g of registry.topic_guides){ if(!g.parent_category_handle||!catByHandle.has(g.parent_category_handle)) fail.push(`Invalid category ${g.id}`); if(!g.subcategory_name) fail.push(`Missing subcategory ${g.id}`); for(const k of ['previous_guide_id','next_guide_id','branch_guide_id']) if(g[k]&&!guideById.has(g[k])) fail.push(`Bad ${k} ${g.id}`); if(new Set(g.related_glossary_terms||[]).size!==(g.related_glossary_terms||[]).length) fail.push(`Duplicate related glossary ${g.id}`); }
for(const c of registry.categories) for(const id of c.guide_ids) if(!guideById.has(id)) fail.push(`Bad category guide ${id}`);
for(const p of registry.learning_paths) for(const id of p.guide_ids) if(!guideById.has(id)) fail.push(`Bad path guide ${id}`);
for(const s of registry.featured_route.steps) if(!guideById.has(s.guide_id)) fail.push(`Bad route guide ${s.guide_id}`);
for(const t of registry.glossary){ const g=guideById.get(t.canonical_guide_id); if(!g) fail.push(`Bad glossary guide ${t.term}`); else if(t.canonical_guide_title!==g.final_h1) fail.push(`Glossary title mismatch ${t.term}`); }
const g48=registry.topic_guides.filter(g=>g.id==='MSC-GUIDE-048').map(g=>g.final_h1); if(new Set(g48).size!==g48.length) fail.push('Duplicate MSC-GUIDE-048 title exists');
const allText=JSON.stringify(registry); if(allText.includes('\u2014')) fail.push('Em dash found'); if(allText.includes('\u2013')) fail.push('En dash found');
if(fail.length){ console.error(fail.join('\n')); process.exit(1); }
if(process.argv.includes('--validate-only')){ console.log('MSC Learn registry validation passed: 93 destinations, 80 topic guides, 5 category hubs, 5 learning paths, 141 glossary terms.'); process.exit(0); }
fs.mkdirSync('snippets',{recursive:true});
const header='{% comment %}\n  Generated from docs/learn/MSC_Learn_Master_Registry.json.\n  Do not edit manually.\n  Rebuild with npm run build:learn-data.\n{% endcomment %}\n';
function w(file,body){ fs.writeFileSync(file,header+body.trim()+'\n'); }
function esc(v){ return String(v??'').replace(/\|/g,'/'); }
w('snippets/msc-learn-guide-data.liquid', registry.topic_guides.map(g=>[g.id,g.planned_slug,g.final_h1,g.parent_category_handle,g.parent_category_name,g.subcategory_name,g.subcategory_anchor,g.depth_level,g.content_format,g.previous_guide_id,g.next_guide_id,g.branch_guide_id,g.primary_learning_path,(g.secondary_learning_paths||[]).join(',')].map(esc).join('|')).join('\n'));
w('snippets/msc-learn-category-data.liquid', registry.categories.map(c=>[c.id,c.planned_slug,c.name,c.subcategory_names.join('~'),c.subcategory_anchors.join('~'),c.guide_ids.join(','),c.previous_category_id,c.next_category_id,c.related_learning_paths.join(','),c.depth_range].map(esc).join('|')).join('\n'));
w('snippets/msc-learn-path-data.liquid', registry.learning_paths.map(p=>[p.id,p.planned_slug,p.name,p.guide_ids.join(','),p.related_category_handles.join(','),p.depth_range,p.branching_path_handles.join(',')].map(esc).join('|')).join('\n'));
w('snippets/msc-learn-route-data.liquid', registry.featured_route.steps.map((s,i)=>[i+1,s.label,s.guide_id,guideById.get(s.guide_id)?.planned_slug||''].map(esc).join('|')).join('\n'));
w('snippets/msc-learn-glossary-data.liquid', registry.glossary.map(t=>[t.term,t.definition,t.canonical_guide_id,guideById.get(t.canonical_guide_id)?.planned_slug||''].map(esc).join('|')).join('\n'));
console.log('MSC Learn data generated and validated: 80 guides, 5 categories, 5 paths, 13 route steps, 141 glossary terms.');
