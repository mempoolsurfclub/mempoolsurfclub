# MSC Learn registry workflow

The MSC Learn source of truth is the approved full registry at `docs/learn/MSC_Learn_Master_Registry.json`. Runtime theme data is generated from that file and must not be edited by hand.

## Approved schema

The approved registry uses a top level `records` array plus supporting navigation and rule objects. The generator identifies each record by `Registry ID`, `Page role`, and `Recommended slug`. Approved page roles include Learn home, category hub, learning path, topic guide, featured route, and glossary index.

The `navigation` object preserves ordered architecture that must not be inferred from category blocks. It includes category order, canonical topic order, learning path sequences, featured route steps, and return rules.

The registry also includes registry wide rules, approved category slugs, approved subcategory slugs, approved learning path slugs, and count metadata used by validation.

## Generated data workflow

Run:

```sh
npm run build:learn-data
```

The command reads the approved JSON and writes minimal Liquid snippets used by the Shopify theme. Generated snippets state that they are generated, name the approved JSON source, warn against manual edits, and include the rebuild command.

Generated data is limited to runtime fields needed by the theme, such as registry IDs, planned handles, display labels, depths, formats, canonical navigation, path sequences, route labels, glossary definitions, and canonical destination handles. Internal planning fields such as reader search intent, research notes, production notes, provisional copy, and registry planning status are not public runtime output.

## Validation workflow

Run:

```sh
npm run validate:learn-registry
```

Validation checks approved counts, exact approved IDs, uniqueness, planned status, the Learn home H1, registry wide rules, category sections, canonical topic order, previous and next relationships, branch relationships, exact learning path sequences, path depth ranges, category relationships, glossary destinations, generated data counts, and forbidden dash characters.

The saved report at `docs/learn/MSC_Learn_Registry_Validation.txt` is the approved materialized validation report. Runtime validation must not replace it with a short message.

## Public Shopify page resolution

All theme templates resolve public links through Shopify page objects. A destination becomes a link only when the corresponding `pages[planned_handle]` object exists. If Shopify does not resolve the page, the destination is omitted or rendered as plain text according to the template context. Empty anchors are not rendered.

The Learn homepage card pattern keeps this priority:

1. Manually configured URL.
2. Real Shopify page resolved through `pages[planned_handle]`.
3. No link.

## Category hubs

Category hubs use approved category records. Each hub keeps its approved depth, four subcategory anchors, canonical guide sequence, previous category, next category, visibility rules, and related learning paths. Public introductions come from `page.content`; planning copy from the registry is not automatically public.

Guide cards are grouped under resolved subcategory sections. Missing guides are not shown as placeholders, disabled cards, or coming soon cards. Published counts are based only on resolved Shopify pages.

## Cross category learning paths

Learning paths use the exact sequences in `navigation.learning_path_sequences`. These routes are cross category and can contain mixed destination types, including topic guides and the featured route. A learning path is not owned by a single category. Approved category relationships and depth ranges are preserved.

## Featured route

The featured route displays the approved visual step labels from `navigation.featured_route_steps`. The template does not invent article content or guide mappings. The article body remains `page.content`.

## Glossary

The glossary uses the approved initial glossary term map. Terms are grouped alphabetically and canonical destinations are validated against all registry records, not only topic guides. A canonical destination is linked only when Shopify resolves the destination page. Otherwise the term and concise definition remain plain text.

## Optional metafields

Templates may show optional author, reading time, reviewed date, related guides, related editorial references, card descriptions, and action labels when metafields are present. Blank metafields must not create empty labels or broken links.

## Pilot publishing workflow

Publishing a pilot guide requires a real Shopify page with the planned handle and the matching page template. Creating runtime architecture does not write articles, create placeholder articles, create Shopify pages, or publish Learn destinations.

No planning copy is automatically public. Only approved page content and resolved Shopify pages create public links.
