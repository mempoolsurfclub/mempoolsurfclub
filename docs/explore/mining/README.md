# MSC Explore — Mining registry workflow

This directory contains the research-only Mining category registry for MSC Explore.

## Source of truth

The machine-readable canonical source is split into one manifest and nine record shards:

- `MSC_Explore_Mining_Registry.json` — registry manifest, Mining-specific architecture, schema contract, rules, normalized counts, review queue, omission/consolidation decisions, and shard index.
- `records/MSC_Explore_Mining_Records_001_004.json`
- `records/MSC_Explore_Mining_Records_005_008.json`
- `records/MSC_Explore_Mining_Records_009_012.json`
- `records/MSC_Explore_Mining_Records_013_016.json`
- `records/MSC_Explore_Mining_Records_017_020.json`
- `records/MSC_Explore_Mining_Records_021_024.json`
- `records/MSC_Explore_Mining_Records_025_028.json`
- `records/MSC_Explore_Mining_Records_029_032.json`
- `records/MSC_Explore_Mining_Records_033_037.json`
- `MSC_Explore_Mining_Registry.md` — human-readable architecture, inventory, technical distinctions, and review companion.
- `MSC_Explore_Mining_Validation.txt` — materialized validation/review report.

The manifest and all listed record shards together are the canonical registry.

## Scope lock

The package is research and registry data only. It must not modify the live Explore page, publish Shopify content, edit Atlas, change production templates/snippets, create runtime routing automatically, or imply that a recommended slug is live.

Command Center review is required before any record is promoted into a future Master Explore Registry.

## Record schema contract

Every canonical Mining record uses the same 24-field contract approved by the Ordinals reference registry, with only the category-specific `Mining topic` and `Mining subtopic` labels changed.

Controlled values:

- Lifecycle `Status`: `ACTIVE`, `HISTORICAL`, `INACTIVE`, `UNCERTAIN`.
- `Source confidence`: `HIGH`, `MEDIUM`, `LOW`.
- `source_type`: `official`, `official-github`, `primary`, `on-chain`, `independent`, `indexer`, `marketplace`, `market-data`.
- `Primary Explore category`: `MINING`.

## Mining entity model

Use one canonical profile per meaningful entity/system. Do not turn the registry into a list of every public miner, pool, ASIC model, firmware fork, or mining gadget.

The registry specifically distinguishes:

- hashers from pool coordinators;
- pool policy from Bitcoin consensus;
- share accounting from block discovery;
- payout accounting from transaction selection;
- Stratum transport from miner template choice;
- ASIC manufacturers from pools and firmware;
- hardware families from individual miner SKUs;
- deployed protocols from proposals/public betas;
- energy operating mechanisms from promotional ESG conclusions.

## Research standard

Prefer evidence in this order:

1. Official pool/project/company/manufacturer website and documentation.
2. Official GitHub, support docs, release notes, filings, or operator-controlled communication.
3. Primary Bitcoin protocol/BIP documentation.
4. Primary block/template/protocol evidence.
5. Reputable independent reporting/research.
6. Explorers, trackers, hashrate dashboards, and market-data sources as supporting evidence only.

Current hashrate, block share, fees, payout thresholds, ASIC performance, fleet size, and power capacity are time-sensitive and must not be published as timeless facts.
