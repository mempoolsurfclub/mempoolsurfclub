# MSC Explore — Network registry workflow

This directory contains the research-only NETWORK category registry for MSC Explore.

## Source of truth

The machine-readable canonical source is intentionally split into one manifest and nine record shards:

- `MSC_Explore_Network_Registry.json` — registry manifest, NETWORK topic architecture, 24-field schema contract, rules, normalized counts, review queue, omission/consolidation decisions, cross-category decisions, and shard index.
- `records/MSC_Explore_Network_Records_001_004.json`
- `records/MSC_Explore_Network_Records_005_008.json`
- `records/MSC_Explore_Network_Records_009_012.json`
- `records/MSC_Explore_Network_Records_013_016.json`
- `records/MSC_Explore_Network_Records_017_020.json`
- `records/MSC_Explore_Network_Records_021_024.json`
- `records/MSC_Explore_Network_Records_025_028.json`
- `records/MSC_Explore_Network_Records_029_032.json`
- `records/MSC_Explore_Network_Records_033_035.json`
- `MSC_Explore_Network_Registry.md` — human-readable architecture, canonical inventory, technical boundary decisions, omissions, and Command Center review companion.
- `MSC_Explore_Network_Validation.txt` — materialized structural/research validation report.

The manifest and all listed record shards together are the canonical registry. This package follows the approved Ordinals reference schema at `explore/ordinals-registry-research` QA HEAD `1f4368bdebc572de5aaed6df221460516295c54a`.

## Scope lock

This package is research and registry data only. It must not modify the live Explore page, Shopify, Atlas, Learn, Home, Tools, production templates/snippets, public routes, or any other category registry. It must not connect Network records to the public Explore interface.

Command Center review is required before any Network record is promoted into a future Master Explore Registry.

## Record schema contract

Every canonical record uses the approved 24-field contract, with only the two category-specific taxonomy labels adapted to:

- `Network topic`
- `Network subtopic`

Controlled values:

- Lifecycle `Status`: `ACTIVE`, `HISTORICAL`, `INACTIVE`, `UNCERTAIN`.
- `Source confidence`: `HIGH`, `MEDIUM`, `LOW`.
- `source_type`: `official`, `official-github`, `primary`, `on-chain`, `independent`, `indexer`, `marketplace`, `market-data`.
- `Primary Explore category` is always `NETWORK`.
- Related category values use the eight approved Explore category names.

Manifest counts use only:

- `counts.total_records`
- `counts.by_status`
- `counts.by_topic`
- `counts.by_source_confidence`

All controlled status and source-confidence values are present even when zero.

## NETWORK entity model

NETWORK explains the software and infrastructure that make Bitcoin and Lightning operable, observable, and extensible without becoming a generic software directory.

One canonical entity receives one profile. Examples:

- Bitcoin Core is the node/reference-implementation profile; its wallet remains a WALLETS relationship.
- Bitcoin Knots is node software; its wallet capability is not a separate profile.
- Lightning Network & BOLT Specifications is the protocol/network profile; LND, Core Lightning, Eclair, and LDK are distinct implementations/libraries.
- Esplora + Blockstream Explorer + blockstream.info are consolidated.
- Amboss Space/Magma/analytics are consolidated under Amboss.
- LDK Node/Server remain child products under LDK.
- Umbrel and StartOS are platform profiles, not one profile per packaged app.
- Approved MINING protocols remain canonical in MINING and are relation-only here.

## Technical boundary rules

NETWORK copy must preserve these distinctions:

1. **Bitcoin protocol vs implementations.** Bitcoin Core is a dominant/reference implementation; it is not “Bitcoin.”
2. **Consensus vs policy.** Consensus validation, standardness, mempool policy, relay policy, mining policy, wallet behavior, and indexer interpretation are different layers.
3. **Nodes do not vote in a simple governance sense.** Full validating nodes independently verify received blocks/transactions against their software's rules.
4. **Lightning is not a blockchain.** Lightning channel state is maintained by participants and only selected transactions commit to Bitcoin.
5. **Protocol vs implementation.** A BOLT or BIP does not establish universal implementation support or deployment.
6. **Explorer/indexer output is not consensus state.** Labels, fee estimates, mempool projections, node geolocation, transaction classifications, and rankings can be inferred or application-specific.
7. **Network measurements are incomplete.** Reachable-node crawls do not equal all Bitcoin nodes; public Lightning graph data excludes private channels and does not equal total liquidity/economic activity.
8. **Node platforms package upstream software.** Umbrel, StartOS, RaspiBlitz, myNode, RTL, and LNDg do not define Bitcoin consensus merely by operating node software.

## Research standard

Prefer:

1. Official project/software/service websites and documentation.
2. Official GitHub repositories, releases, developer/support docs, and maintainer communications.
3. Primary Bitcoin/BIP/Lightning specification material.
4. Primary implementation evidence.
5. Reputable independent technical research/reporting.
6. Explorers, trackers, dashboards, directories, and market-data sources as corroboration only.

ACTIVE software must have current first-party evidence. A stale repository, reachable website, or old release alone is insufficient.

Time-sensitive statistics are intentionally omitted from timeless profile copy unless they are needed to explain a measurement method. Any future public node counts, Lightning capacity/channel counts, software shares, mempool sizes, fee estimates, or topology metrics must be freshly dated and sourced.
