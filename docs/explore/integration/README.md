# MSC Explore Integration Foundation

Stage 1 establishes a deterministic production data contract without wiring the approved Atlas UI or publishing category/profile pages.

## Source model

- Canonical research remains federated under `docs/explore/<category>/`.
- `docs/explore/master/` owns cross-category identity, aggregate counts, reconciliation, provenance, and publication gates.
- The generated runtime is derivative production data, not a second research source.
- Category snapshot trees are validated against the approved tree SHAs recorded in the master registry.

## Generated outputs

`node scripts/explore-runtime/build.mjs` materializes:

- `assets/msc-explore-runtime.json`
- `docs/explore/integration/MSC_Explore_Route_Manifest.json`
- `docs/explore/integration/MSC_Explore_Validation_Report.json`

`node scripts/explore-runtime/build.mjs --check` regenerates in memory and fails when committed outputs are missing or stale.

## Publication gate

Stage 1 sets every canonical profile to `public_ready: false`. Registry inclusion is not public-copy approval. Time-sensitive claims and records in research review queues must be reverified before later publication stages.

## Relationships

Exact canonical-name relationships resolve to Registry IDs. Source relationship labels that do not correspond to a canonical record are preserved explicitly as unresolved labels rather than discarded or guessed.

## Editorial layer

`config/explore/msc-editorial.json` is separate from research facts. It references exact Registry IDs and fails validation when a target or expected canonical name does not resolve.

## Atlas destinations

`config/explore/charted-destinations.json` defines the Registry-ID-only contract. Stage 1 intentionally leaves region destination arrays empty; curated destination selection and geometry testing belong to the later Atlas-wiring stage.

## Routes / Shopify objects

`config/explore/routes.json` defines deterministic planned handles. The generated route manifest records that clean `/pages/...` routes require Shopify Page objects. Stage 1 does not create or claim those Page objects exist.
