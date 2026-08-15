# MSC Explore — Ordinals registry workflow

This directory contains the research-only Ordinals category registry for MSC Explore.

## Source of truth

- `MSC_Explore_Ordinals_Registry.json` is the canonical machine-readable registry.
- `MSC_Explore_Ordinals_Registry.md` is the synchronized human-readable companion.
- `MSC_Explore_Ordinals_Validation.txt` is the materialized validation/review report.

This mirrors the source-of-truth discipline used by `docs/learn/` without coupling the Ordinals research registry to Learn runtime generation.

## Scope lock

The package is research and registry data only. It must not:

- modify the live Explore page;
- publish Shopify pages or articles;
- edit Atlas;
- change production templates or snippets;
- create runtime routing automatically;
- imply that a recommended slug is a live URL.

Command Center review is required before any record is promoted into the future Master Explore Registry.

## Entity model

Use one canonical profile per entity. Child collections/releases and cross-category assets are represented through relationships unless the Master Explore architecture explicitly requires a separate canonical record.

Examples:

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

Prefer first-party project sites/docs/GitHub/social sources. Use on-chain explorers, indexers, and reputable marketplaces for corroboration and state checks. Use independent coverage for historical context. Marketplace listings are not sufficient by themselves for a fully verified public profile.

Technical copy must distinguish Bitcoin consensus rules from Ordinals conventions, indexer-derived state, metaprotocol rules, and project claims.
