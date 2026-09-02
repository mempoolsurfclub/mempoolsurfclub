# MSC Explore — Mining Research Registry

**Status:** COMMAND CENTER REVIEW  
**Last verified:** 2026-08-15  
**Primary Explore category:** MINING  
**Canonical records:** 37

> The JSON manifest plus its nine `records/` shards are the canonical machine-readable source. This Markdown file is the human-readable review companion. Nothing here publishes or changes the live Explore implementation.

## Final topic architecture

### Pools & Coordinators
Shared pools, solo coordinators, proprietary pools, alternative reward systems, and historically important pool operators.

- Large shared pools
- Alternative & miner-choice pools
- Solo mining coordinators
- Proprietary operator pools
- Historical shared pools

### Protocols & Template Coordination
Mining protocols and node/template interfaces coordinating jobs, shares, transport, transaction selection, template construction, or decentralized reward accounting.

- Pool transport & share protocols
- Block-template interfaces
- Miner template negotiation
- Decentralized pool protocols

### ASIC Hardware & Manufacturers
Manufacturer/family and integrated hardware-platform profiles without one profile per miner SKU.

- ASIC manufacturers & product families
- Integrated mining hardware platforms

### Firmware & Mining Software
Firmware and historically significant software controlling ASIC behavior, tuning, monitoring, pool connections, or work submission.

- ASIC firmware
- Mining software infrastructure

### Home & Open-Source Mining
Durable home-mining and open-source ecosystems that materially improve education, self-hosted mining access, or miner sovereignty.

- Open-source home mining
- Home miner & node systems

### Industrial & Energy Infrastructure
Selected industrial and energy systems with distinctive technical operating models rather than public-company scale alone.

- Grid-interactive industrial mining
- Distributed renewable / mini-grid mining
- Off-grid natural-gas mining infrastructure

## Complete canonical inventory

### Pools & Coordinators
- **Foundry USA Pool** — ACTIVE / HIGH — Large shared pools
- **AntPool** — ACTIVE / HIGH — Large shared pools
- **ViaBTC Pool** — ACTIVE / HIGH — Large shared pools
- **F2Pool** — ACTIVE / HIGH — Large shared pools
- **Braiins Pool** — ACTIVE / HIGH — Large shared pools; includes historical Slush Pool lineage
- **Luxor Mining Pool** — ACTIVE / HIGH — Large shared pools
- **OCEAN** — ACTIVE / HIGH — Alternative & miner-choice pools
- **DMND / Demand Pool** — ACTIVE / HIGH — Alternative & miner-choice pools
- **Parasite Pool** — ACTIVE / MEDIUM — Alternative & miner-choice pools
- **Public Pool** — ACTIVE / HIGH — Alternative & miner-choice pools
- **solo.ckpool** — ACTIVE / HIGH — Solo mining coordinators
- **MARA Pool** — ACTIVE / HIGH — Proprietary operator pools
- **GridPool** — ACTIVE / HIGH — Alternative & miner-choice pools; public beta
- **GHash.IO** — HISTORICAL / HIGH — Historical shared pools
- **BTC Guild** — HISTORICAL / HIGH — Historical shared pools
- **Eligius** — HISTORICAL / MEDIUM — Historical shared pools

### Protocols & Template Coordination
- **Stratum V1** — ACTIVE / HIGH — Pool transport & share protocols
- **Stratum V2** — ACTIVE / HIGH — Pool transport & share protocols
- **getblocktemplate (BIP 22/23)** — ACTIVE / HIGH — Block-template interfaces
- **BetterHash** — HISTORICAL / HIGH — Miner template negotiation
- **DATUM** — ACTIVE / HIGH — Miner template negotiation
- **P2Pool (Bitcoin)** — HISTORICAL / MEDIUM — Decentralized pool protocols
- **Braidpool** — ACTIVE / HIGH — Decentralized pool protocols; active development, not broad production deployment

### ASIC Hardware & Manufacturers
- **BITMAIN / Antminer** — ACTIVE / HIGH
- **MicroBT / WhatsMiner** — ACTIVE / HIGH
- **Canaan / Avalon** — ACTIVE / HIGH
- **Auradine / Teraflux** — ACTIVE / HIGH
- **Proto Mining** — ACTIVE / HIGH
- **Bitdeer / SEALMINER** — ACTIVE / HIGH

### Firmware & Mining Software
- **Braiins OS** — ACTIVE / HIGH
- **LuxOS** — ACTIVE / HIGH
- **CGMiner** — HISTORICAL / HIGH

### Home & Open-Source Mining
- **Bitaxe** — ACTIVE / HIGH
- **FutureBit Apollo** — ACTIVE / HIGH

### Industrial & Energy Infrastructure
- **Riot Platforms** — ACTIVE / HIGH
- **Gridless** — ACTIVE / HIGH
- **Upstream Data** — ACTIVE / HIGH

## Counts

- **Total:** 37
- **ACTIVE:** 31
- **HISTORICAL:** 6
- **INACTIVE:** 0
- **UNCERTAIN:** 0
- **HIGH confidence:** 34
- **MEDIUM confidence:** 3
- **LOW confidence:** 0

Topic totals:
- Pools & Coordinators: 16
- Protocols & Template Coordination: 7
- ASIC Hardware & Manufacturers: 6
- Firmware & Mining Software: 3
- Home & Open-Source Mining: 2
- Industrial & Energy Infrastructure: 3

## Parasite Pool disposition

Parasite Pool is included as `MSC-EXP-MIN-009`, `ACTIVE / MEDIUM`.

First-party evidence verifies an active pool, a live template with a 1 BTC coinbase output to the block-finding miner, a second output carrying the remainder to a Lightning payout deposit, and an open-source modified ckpool stack. Independent reporting supports ZK Shark / Ordinal Maxi Biz founder attribution and launch context. Because operator attribution and exact shared-remainder accounting are less explicit first-party claims, they remain qualified rather than promoted to HIGH confidence. Zero-fee language must be dated if ever published.

## Technical distinctions Command Center should preserve

- A **hasher** contributes proof-of-work; a **pool coordinator** supplies jobs and/or handles share/payout accounting. Pool block share does not mean the pool owns all pointed hashrate.
- Bitcoin **consensus rules** determine block validity. Miner/pool transaction selection, mempool policy, template construction, payout rules, and Stratum behavior are separate policy/application layers.
- **PPS / PPS+ / FPPS** transfer more short-run block variance to the pool operator; **PPLNS / score / TIDES / SLICE** allocate rewards using work-history/accounting rules; **solo** leaves block-discovery variance with the miner. None changes consensus.
- **Stratum V1** is still a widely used pool coordination protocol. Its common design lets the pool build jobs/templates.
- **Stratum V2** is modular. Encrypted/authenticated transport does not automatically mean miner transaction selection; Job Declaration/Template Distribution must actually be deployed.
- **getblocktemplate** is a node-to-mining template API/RPC, not a consensus rule.
- **DATUM** moves template construction to a miner-controlled node/gateway while preserving pool share coordination; OCEAN's TIDES payout accounting is separate.
- ASIC **manufacturer**, **chip**, **machine**, **control board**, **cooling system**, and **firmware** are distinct layers.
- Energy claims must separate controllable load/curtailment mechanisms from claimed grid or environmental outcomes.

## Consolidation decisions

- Slush Pool is historical lineage under Braiins Pool.
- BITMAIN/Antminer, MicroBT/WhatsMiner, Canaan/Avalon, Auradine/Teraflux, Proto, and Bitdeer/SEALMINER are family/platform profiles; individual miner SKUs are not separate entities.
- AntPool is separate from BITMAIN because the pool is a distinct service and BITMAIN states it was spun off in 2021.
- Braiins Pool vs Braiins OS and Luxor Mining Pool vs LuxOS remain separate because pool services and firmware are materially different products.
- OCEAN and DATUM remain separate because pool operation/payout policy and template/share protocol infrastructure are distinct.
- MARA Pool is canonical; MARA Holdings stays relational rather than becoming a second public-company profile.
- Job Declaration stays inside Stratum V2 rather than becoming a duplicate standalone protocol record.
- Bitaxe absorbs closely integrated OSMU/AxeOS/board-generation relationships; FutureBit Apollo remains one integrated product ecosystem.

## Deliberate exclusions

Excluded to avoid pool/company/software directory padding: SpiderPool, Binance Pool, BTC.com Pool, VNish, BFGMiner, NerdMiner, CleanSpark, Core Scientific, IREN, TeraWulf, Hut 8, and ckpool software as a standalone profile. Crusoe's historical Digital Flare Mitigation Bitcoin-mining business is also excluded from the active canon because Crusoe divested the Bitcoin business to NYDIG in 2025; current off-grid natural-gas mining infrastructure is represented by Upstream Data.

## Records requiring qualified public copy

- **Parasite Pool:** founder/operator attribution and exact shared-remainder accounting remain qualified.
- **GridPool:** current public beta/mainnet soft launch must not be described as mature broad deployment.
- **Braidpool:** active development is not production adoption.
- **Stratum V2:** advanced components are not universal.
- **P2Pool (Bitcoin):** preserve distinction from modern Monero P2Pool.
- **Riot Platforms:** explain documented market/curtailment mechanisms without universal grid-benefit claims.
- **Gridless:** qualify community/economic/renewable outcome claims.
- **Upstream Data:** do not assume all gas would otherwise be flared/vented or publish vendor emissions claims without site-specific corroboration.

## Publication state

**COMMAND CENTER REVIEW ONLY.** No merge, public Mining pages, Shopify/Atlas changes, production routes, Learn/Home/Tools changes, or live Explore integration are authorized by this registry.
