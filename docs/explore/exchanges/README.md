# MSC Explore — Exchanges registry workflow

This directory contains the research-only EXCHANGES category registry for MSC Explore.

## Source of truth

The canonical machine-readable source is one manifest plus nine record shards:

- `MSC_Explore_Exchanges_Registry.json` — registry manifest, topic architecture, schema contract, rules, normalized counts, review queue, omission decisions, and shard index.
- `records/MSC_Explore_Exchanges_Records_001_004.json`
- `records/MSC_Explore_Exchanges_Records_005_008.json`
- `records/MSC_Explore_Exchanges_Records_009_012.json`
- `records/MSC_Explore_Exchanges_Records_013_016.json`
- `records/MSC_Explore_Exchanges_Records_017_020.json`
- `records/MSC_Explore_Exchanges_Records_021_024.json`
- `records/MSC_Explore_Exchanges_Records_025_028.json`
- `records/MSC_Explore_Exchanges_Records_029_032.json`
- `records/MSC_Explore_Exchanges_Records_033_036.json`
- `MSC_Explore_Exchanges_Registry.md` — human-readable architecture, complete inventory, canonical-home decisions, exclusions and publication cautions.
- `MSC_Explore_Exchanges_Validation.txt` — materialized structural/content QA report.

The manifest and all listed shards together are canonical. Command Center approval is required before any record is promoted into a future Master Explore Registry.

## Scope lock

Research and registry data only. This package must not modify the live Explore page, Shopify, Atlas, Learn, Home, Tools, routes, public profiles or production code. It does not merge itself.

## Record schema contract

Every canonical record uses the approved 24-field Explore contract, with only category labels adapted to `Exchanges topic` and `Exchanges subtopic`.

Controlled values:

- Lifecycle `Status`: `ACTIVE`, `HISTORICAL`, `INACTIVE`, `UNCERTAIN`.
- `Source confidence`: `HIGH`, `MEDIUM`, `LOW`.
- `source_type`: `official`, `official-github`, `primary`, `on-chain`, `independent`, `indexer`, `marketplace`, `market-data`.
- Primary category: `EXCHANGES`.

Lifecycle is separate from legal/regulatory uncertainty. Source confidence is separate from lifecycle.

## Exchange-model discipline

The registry distinguishes:

- custodial order-book exchanges;
- brokers/dealers;
- custodial Bitcoin/payment apps with execution;
- direct-to-wallet/self-custody brokers;
- P2P coordinators using on-chain multisig;
- P2P coordinators using Lightning hold invoices;
- P2P discovery systems with no platform escrow;
- institutional spot/OTC venues;
- crypto derivatives venues;
- cash-settled traditional futures venues.

`Non-custodial` is never used as shorthand for “no counterparty risk.” P2P records describe the actual escrow/coordinator/key model.

## Time-sensitive claims

Fees, spreads, limits, supported jurisdictions, licensing, proof-of-reserves snapshots, Lightning availability and market data can change quickly. They are not treated as timeless inclusion facts.

BitMEX is a special lifecycle case: it is `ACTIVE` on the 2026-08-15 verification date, but the exchange has announced closure for 2026-09-23 04:00 UTC. Reverify before any public use.

## One entity / one profile

Coinbase Advanced/GDAX lineage is consolidated under Coinbase; Kraken Pro under Kraken; Coinfloor is relationship/history under CoinCorner. Exchange-operated wallets or payment products remain features/relationships unless another Explore category approves them as separate canonical entities.

## Historical profiles

Closed exchanges are generally `INACTIVE` under the approved lifecycle model because their exchange operations actually ceased. Their placement in the `Historical Exchange Infrastructure` topic describes why they belong in the canon; it does not override lifecycle semantics.

## Research standard

Prefer, in order:

1. official exchange/company product, legal, support, API and status material;
2. primary regulator/licensing/filing/court sources;
3. primary Bitcoin/protocol documentation for technical claims;
4. reputable independent reporting/research;
5. market-data/ranking sources only as supporting evidence.

No security scores, generic rankings or exchange-directory padding are part of this registry.
