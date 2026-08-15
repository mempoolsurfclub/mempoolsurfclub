# MSC Explore — Ordinals registry workflow

This directory contains the research-only Ordinals category registry for MSC Explore.

## Source of truth

The machine-readable canonical source is intentionally split into one manifest and eleven record shards:

- `MSC_Explore_Ordinals_Registry.json` — registry manifest, architecture, rules, counts, review queue, and shard index.
- `records/MSC_Explore_Ordinals_Records_001_004.json`
- `records/MSC_Explore_Ordinals_Records_005_008.json`
- `records/MSC_Explore_Ordinals_Records_009_012.json`
- `records/MSC_Explore_Ordinals_Records_013_016.json`
- `records/MSC_Explore_Ordinals_Records_017_020.json`
- `records/MSC_Explore_Ordinals_Records_021_024.json`
- `records/MSC_Explore_Ordinals_Records_025_028.json`
- `records/MSC_Explore_Ordinals_Records_029_032.json`
- `records/MSC_Explore_Ordinals_Records_033_036.json`
- `records/MSC_Explore_Ordinals_Records_037_040.json`
- `records/MSC_Explore_Ordinals_Records_041_044.json`
- `MSC_Explore_Ordinals_Registry.md` — human-readable architecture and complete inventory companion.
- `MSC_Explore_Ordinals_Validation.txt` — materialized validation/review report.

The manifest and all listed record shards together are the canonical registry. This preserves the JSON-first, human companion, and saved-validation discipline used by `docs/learn/` while keeping the research package isolated from Learn runtime generation.

## Scope lock

The package is research and registry data only. It must not modify the live Explore page, publish Shopify content, edit Atlas, change production templates/snippets, create runtime routing automatically, or imply that a recommended slug is live.

Command Center review is required before any record is promoted into a future Master Explore Registry.

## Entity model

Use one canonical profile per entity. Child releases and cross-category assets are relationships unless the Master Explore architecture explicitly requires separate records.

- Fomojis Genesis/OG and Fomojis 2.0 share the canonical `Fomojis` profile.
- OCM Genesis and OCM Dimensions are related releases under `OnChainMonkey (OCM)`.
- DOG•GO•TO•THE•MOON is linked from Runestone but belongs canonically in `RUNES`.
- RSIC•GENESIS•RUNE is linked from RSIC but belongs canonically in `RUNES`.

## Status vocabulary

- `ACTIVE` — current project, protocol, or community operation was verified.
- `HISTORICAL` — finite/completed work or an entity whose importance is chiefly historical.
- `INACTIVE` — project operation has ceased or the creator/operator has explicitly stepped away.
- `UNCERTAIN` — current operation, identity, scope, or attribution could not be verified strongly enough.

Secondary-market trading alone is not sufficient to classify a project as active.

## Research standard

Prefer first-party project sites/docs/GitHub/social sources, then on-chain explorers/indexers/reputable marketplaces, then reliable independent coverage. Marketplace listings alone are not sufficient for a fully verified public profile.

Technical copy must distinguish Bitcoin consensus rules from Ordinals conventions, indexer-derived state, metaprotocol rules, and project claims.
