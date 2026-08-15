# MSC Explore — Marketplaces registry workflow

This directory contains the research-only **MARKETPLACES** category registry for MSC Explore.

## Source of truth

The machine-readable canonical source is intentionally split into one manifest and five record shards:

- `MSC_Explore_Marketplaces_Registry.json` — registry manifest, Marketplaces-specific taxonomy, schema contract, controls, counts, inventory index, consolidation decisions, omission decisions, and review queue.
- `records/MSC_Explore_Marketplaces_Records_001_004.json`
- `records/MSC_Explore_Marketplaces_Records_005_008.json`
- `records/MSC_Explore_Marketplaces_Records_009_012.json`
- `records/MSC_Explore_Marketplaces_Records_013_016.json`
- `records/MSC_Explore_Marketplaces_Records_017_018.json`
- `MSC_Explore_Marketplaces_Registry.md` — human-readable architecture, inventory, research decisions, technical distinctions, exclusions, and Command Center review companion.
- `MSC_Explore_Marketplaces_Validation.txt` — materialized validation and final QA report.

The manifest plus every listed shard is the canonical registry.

## Reference schema

This package reuses the **approved Ordinals 24-field research contract** from:

- branch: `explore/ordinals-registry-research`
- approved QA HEAD: `1f4368bdebc572de5aaed6df221460516295c54a`

It reuses lifecycle, source-confidence, source-provenance, one-entity/one-profile, uncertainty, and validation rules. It does **not** reuse the Ordinals topic taxonomy.

## Scope lock

This is research and registry data only. It does not modify the live Explore page, Atlas, Shopify, Learn, Home, Tools, routing, or production code. Recommended slugs are research recommendations, not live routes.

Command Center approval is required before promotion into a future Master Explore Registry or public Marketplace profiles.

## Record schema contract

Every canonical record contains the same 24 fields listed in `MSC_Explore_Marketplaces_Registry.json`.

Controlled values:

- Lifecycle: `ACTIVE`, `HISTORICAL`, `INACTIVE`, `UNCERTAIN`
- Source confidence: `HIGH`, `MEDIUM`, `LOW`
- Source type: `official`, `official-github`, `primary`, `on-chain`, `independent`, `indexer`, `marketplace`, `market-data`
- Primary Explore category: `MARKETPLACES`

## Marketplace-specific research rules

- A reachable website, stale listing, or indexed collection does not establish `ACTIVE`.
- PSBT usage does not by itself prove a venue is non-custodial.
- “Does not store private keys” does not fully specify custody or transaction-control architecture.
- Distinguish wallet signing, marketplace transaction construction, script/escrow outputs, pool-wallet control, off-chain order state, indexing, and Bitcoin settlement.
- Ordinals, rare-sat, BRC-20, Runes, collection, and marketplace ownership labels may depend on application/indexer conventions rather than Bitcoin consensus.
- Company/product overlaps are consolidated unless a product is materially distinct and Command Center approves separate canonical treatment.
- Market-share, daily/weekly volume, floor prices, temporary fee promotions, and active-user counts are not timeless registry facts.

## Canonical-home warnings

- UniSat, Ordinals Wallet and OKX have important WALLETS relationships.
- OKX and Binance also have EXCHANGES relationships, but their Web3 marketplace mechanics must not be conflated with centralized exchange custody.
- Xverse remains a wallet/aggregation relationship, not a standalone Marketplaces record.
- `ord.io` is an explorer/indexer, not a substitute for the required `ord.net` seed.
- Trio and OrdinalsBot marketplace infrastructure are consolidated into one profile to avoid company/product duplication.
