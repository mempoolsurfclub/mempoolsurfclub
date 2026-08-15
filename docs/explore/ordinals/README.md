# MSC Explore — Ordinals registry workflow

This directory contains the research-only Ordinals category registry for MSC Explore.

## Source of truth

The machine-readable canonical source is intentionally split into one manifest and twelve record shards:

- `MSC_Explore_Ordinals_Registry.json` — registry manifest, architecture, schema contract, rules, counts, review queue, omission decisions, and shard index.
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
- `records/MSC_Explore_Ordinals_Records_045_047.json`
- `MSC_Explore_Ordinals_Registry.md` — human-readable architecture, inventory, QA decisions, and review companion.
- `MSC_Explore_Ordinals_Validation.txt` — materialized validation/review report.

The manifest and all listed record shards together are the canonical registry. This preserves the JSON-first, human companion, and saved-validation discipline used by `docs/learn/` while keeping the research package isolated from Learn and Explore runtime generation.

## Scope lock

The package is research and registry data only. It must not modify the live Explore page, publish Shopify content, edit Atlas, change production templates/snippets, create runtime routing automatically, or imply that a recommended slug is live.

Command Center review is required before any record is promoted into a future Master Explore Registry.

## Record schema contract

Every canonical record uses the same required field set documented in `MSC_Explore_Ordinals_Registry.json`. The contract is intended to be reusable by the remaining Explore category registries without requiring Ordinals-specific field redesign.

Key controlled values:

- Lifecycle `Status`: `ACTIVE`, `HISTORICAL`, `INACTIVE`, `UNCERTAIN`.
- `Source confidence`: `HIGH`, `MEDIUM`, `LOW`.
- `source_type`: `official`, `official-github`, `primary`, `on-chain`, `independent`, `indexer`, `marketplace`, `market-data`.
- `Primary Explore category` is `ORDINALS` for this registry; related category values use the eight approved Explore category names.

Fields such as entity type, descriptions, creator attribution, relationships, tags, verification basis, and research notes remain content-specific while using the same field names and data shapes.

## Entity model

Use one canonical profile per entity. Child releases, token descendants, creator relationships, and cross-category assets are relationships unless the Master Explore architecture explicitly requires separate records.

- Fomojis Genesis/OG and Fomojis 2.0 share the canonical `Fomojis` profile.
- Bitcoin Weirdos and FTW remain one canonical `Bitcoin Weirdos` profile with FTW represented relationally.
- OCM Genesis and OCM Dimensions are related releases under `OnChainMonkey (OCM)`.
- OrdRain and Nakamoto Archives remain child releases under `The Wizards of Ord`.
- DOG•GO•TO•THE•MOON is linked from Runestone but belongs canonically in `RUNES`.
- RSIC•GENESIS•RUNE is linked from RSIC but belongs canonically in `RUNES`.
- BASED•ANGELS•RUNE is linked from Based Angels but belongs canonically in `RUNES` if the Master Explore Registry includes that Rune as an entity.
- ORDI remains a relationship under BRC-20 unless Master Explore introduces token-level profiles.
- BRC-20 2.0 remains protocol evolution inside BRC-20.
- Cursed Inscriptions remains a supporting technical concept under Ordinal Theory.

## Status vocabulary

Lifecycle status is separate from uncertainty in creator attribution, supply, or collection scope.

- `ACTIVE` — current project, protocol, operator, or community operation was verified as of the record's verification date.
- `HISTORICAL` — the relevant project phase is finite, completed, or legacy and meaningful current project/community operation was not verified.
- `INACTIVE` — operation ceased, was abandoned, or the creator/operator explicitly stepped away without a verified active successor operation.
- `UNCERTAIN` — the lifecycle/activity status itself cannot be determined from reliable evidence.

A completed mint can still be `ACTIVE` when project/community operation continues. A collection still trading can remain `HISTORICAL` or `INACTIVE`. Website availability, marketplace listings, and indexer presence are not lifecycle evidence by themselves.

## Source confidence

Source confidence is also separate from lifecycle status.

- `HIGH` — first-party or primary evidence supports identity and core claims, including lifecycle where applicable.
- `MEDIUM` — credible evidence exists, but one or more core fields rely on archival, independent, indexer, or incomplete/stale first-party evidence.
- `LOW` — core attribution, scope, or lifecycle evidence remains materially indirect.

Unresolved facts belong in `Verification basis` and `Research notes / uncertainties`; they must not be hidden by overconfident copy.

## Research standard

Use this hierarchy:

1. Official project website/docs.
2. Official GitHub, X, blog, or other creator/operator-controlled source.
3. Primary on-chain or protocol documentation.
4. Reputable independent corroboration.
5. Marketplaces, indexers, and market-data providers as supporting evidence only.

Marketplace or indexer presence alone is not sufficient to establish a fully verified profile or `ACTIVE` lifecycle status.

Technical copy must distinguish Bitcoin consensus rules from Ordinals conventions, indexer-derived state, metaprotocol rules, and project claims.
