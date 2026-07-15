# MSC Learn registry workflow

The Learn registry is the planning source for the structured MSC educational library. Learn is separate from Explore. Explore remains the editorial publishing system described in `docs/msc-content-taxonomy.md`.

## Source files

- `MSC_Learn_Master_Registry.json` is the canonical machine readable source of truth.
- `MSC_Learn_Master_Registry.md` is the synchronized human readable companion.
- `MSC_Learn_Registry_Validation.txt` records the approved structural validation.

Planned slugs do not prove that a Shopify page exists. Registry planning status is not public website status. Only real Shopify pages resolved through Liquid may appear as public links.

## Architecture rules

One topic has one canonical guide page. Category hubs organize subjects. Learning paths curate existing guides across categories and do not own duplicate guide pages. The theme uses registry relationships for navigation, but Shopify Page title, content, SEO fields, and optional metafields remain the public content source.

## Generated files

Run:

```sh
npm run build:learn-data
```

The command reads `docs/learn/MSC_Learn_Master_Registry.json`, validates it, and writes these generated snippets:

- `snippets/msc-learn-guide-data.liquid`
- `snippets/msc-learn-category-data.liquid`
- `snippets/msc-learn-path-data.liquid`
- `snippets/msc-learn-route-data.liquid`
- `snippets/msc-learn-glossary-data.liquid`

Do not edit generated snippets manually. Rebuild them from the registry.

## Validation

Run:

```sh
npm run validate:learn-registry
```

Validation checks destination counts, glossary counts, unique IDs, unique planned slugs, category relationships, sequence relationships, route relationships, glossary canonical guide references, duplicate glossary terms inside guide records, and forbidden dash characters.

## Adding future Learn pages

1. Add or update the approved registry record in the canonical JSON.
2. Confirm the guide has one canonical category and one canonical subcategory.
3. Rebuild generated data with `npm run build:learn-data`.
4. Validate with `npm run validate:learn-registry`.
5. Create the real Shopify Page manually in Shopify only after approved copy exists.
6. Assign the correct reusable template in Shopify.
7. Return the confirmed Shopify handle or URL to the registry if it differs from the planned handle.
8. Rebuild generated data again.

## Optional Shopify Page metafields

The architecture works without metafields. These optional definitions can be created manually in Shopify:

- `custom.msc_author_name`, single line text.
- `custom.msc_reading_time`, single line text.
- `custom.msc_last_reviewed`, date.
- `custom.msc_card_description`, multi line text.
- `custom.msc_card_action_label`, single line text.
- `custom.msc_related_guides`, list of page references.
- `custom.msc_related_editorials`, list of article references.

Undefined metafields render nothing. Blank metafields do not create empty labels.
