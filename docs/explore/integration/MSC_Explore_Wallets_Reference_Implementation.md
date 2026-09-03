# MSC Explore — Wallets Category Reference Implementation

Status: Stage 2 implementation complete for Command Center review.

## Scope

This stage implements the WALLETS category page as the reference pattern for later Explore category pages. It does not alter the approved Atlas or Field Journal UI, create Shopify Page objects, publish profile pages, or deploy production routes.

## Runtime source

The page reads the generated `assets/msc-explore-runtime.json` contract introduced in Stage 1. It does not duplicate or rewrite canonical Wallets research records.

Wallets reference totals:

- 40 canonical records
- 36 ACTIVE
- 1 HISTORICAL
- 2 INACTIVE
- 1 UNCERTAIN
- 5 topic groups
- Xverse mapped by exact Registry ID `MSC-EXP-WAL-014` and labeled `MSC Favorite`

## Implemented reference behavior

- MSC Atlas visual continuity using the existing Mempool UI palette and technical-chart language
- return navigation to the existing Explore Atlas
- category summary and lifecycle metrics
- complete 40-record directory loaded from the Stage 1 runtime
- search across names, descriptions, taxonomy, entity type, and tags
- topic filtering across the five approved Wallets topics
- lifecycle filtering
- result-count live region
- explicit lifecycle and evidence-confidence labels
- Xverse editorial badge with no time-sensitive reason copy
- responsive one/two/three-column layouts
- keyboard focus styling and reduced-motion handling
- planned canonical profile handles are present in markup but intentionally non-navigable until profile pages are published

## Publication boundary

This is an implementation reference, not public-copy approval. The Stage 1 runtime still marks all records `public_ready: false`.

The planned `/pages/explore-wallets` route still requires a Shopify Page object assigned to the `page.explore-category` template before it can exist as a clean public route.

Profile destinations remain intentionally disabled until the later profile-page stage creates and validates those routes.

## Validation

`node scripts/explore-category/check-wallets-reference.mjs` validates:

- Stage 1 runtime remains 257 canonical records
- Wallets remains exactly 40 records
- Wallets lifecycle totals remain exact
- all five Wallets topic totals remain exact
- Xverse resolves to `MSC-EXP-WAL-014`
- Xverse retains the configured `MSC Favorite` label
- route contract remains `explore-wallets` + `page.explore-category`
- the reference section remains scoped only to WALLETS during Stage 2
- planned profile routes remain non-navigable
- reduced-motion handling remains present

## Not authorized by this stage

- changes to the existing Atlas or Field Journal UI
- enabling another Explore category
- Shopify Page-object creation
- profile-page publication
- Atlas charted-destination selection or geometry
- Explore-first global search wiring
- production deployment
- merge without explicit approval
