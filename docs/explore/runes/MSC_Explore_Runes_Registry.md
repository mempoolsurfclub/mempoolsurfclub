# MSC Explore — Runes Research Registry

**Status:** COMMAND CENTER REVIEW  
**Last verified:** 2026-08-15  
**Primary Explore category:** RUNES  
**Canonical records:** 18

> The JSON manifest plus its three `records/` shards are the canonical machine-readable source. This Markdown file is the human-readable registry companion. Nothing here publishes or changes the live Explore implementation.

## Technical framing

Runes is an application-layer fungible-token protocol whose normative rules are implemented by `ord`. The protocol activates at Bitcoin block 840,000 and interprets runestones carried in transaction outputs beginning with `OP_RETURN OP_13`. Rune IDs use `BLOCK:TX`; etchings establish immutable properties; mints create supply only while their terms are open; edicts allocate Rune amounts to outputs; and malformed runestones can become cenotaphs with burn/unmintable effects. Bitcoin consensus validates the underlying transactions and scripts, but Bitcoin Core does **not** maintain Rune balances. Runes-aware software derives that state according to the `ord` rules.

This differs from BRC-20’s inscription/JSON convention and indexer interpretation. Both are application-layer systems rather than Bitcoin-consensus balance ledgers; Runes uses runestones and UTXO/output allocation semantics instead of BRC-20 deploy/mint/transfer JSON inscriptions.

## Final topic architecture

### Protocol & Genesis

The Runes protocol itself and protocol-defined genesis state that is foundational to understanding all Rune assets.

- Core protocol
- Protocol-defined genesis rune

### Halving-Block Provenance

Historically significant Runes etched in or immediately anchored to the block-840,000 activation cohort, included only when provenance or project identity adds durable historical value.

- Early public etchings
- Project-backed launch runes

### Ordinals-Linked Distribution

Rune assets whose launch or allocation was materially coordinated through Ordinals collections, airdrops, or pre-Runes distribution experiments.

- Holder airdrops
- Pre-Runes reward transitions

### Cross-Standard Migration

Canonical Rune assets that represent a meaningful migration from earlier Bitcoin fungible-token conventions such as BRC-20.

- BRC-20 to Runes migrations

### Community & Cultural Runes

Culturally durable community and meme Runes whose significance is supported by launch history, sustained identity, or distinctive provenance rather than short-term market ranking.

- Launch-era meme culture
- Later community meme projects

### Utility & Governance Runes

Rune assets with a verified role in an operating Bitcoin application, governance system, or product ecosystem beyond token trading alone.

- Application governance / utility

## Complete canonical inventory

### Protocol & Genesis

- **Runes Protocol** — `ACTIVE` / `HIGH` — `runes-protocol` — Core protocol — Casey Rodarmor’s fungible-token protocol for etching, minting, and transferring Rune balances through Bitcoin transactions interpreted by Runes-aware software.
- **UNCOMMON•GOODS** — `ACTIVE` / `HIGH` — `uncommon-goods` — Protocol-defined genesis rune — The protocol-defined genesis Rune, hard-coded as Rune #0 with artificial ID `1:0` and an open mint spanning the Runes activation era.

### Halving-Block Provenance

- **Z•Z•Z•Z•Z•FEHU•Z•Z•Z•Z•Z** — `HISTORICAL` / `MEDIUM` — `zzzzz-fehu-zzzzz` — Early public etchings — Rune #1, etched in the Runes activation block and widely treated as the first ordinary public Rune after the protocol-defined genesis asset.
- **DECENTRALIZED** — `HISTORICAL` / `MEDIUM` — `decentralized-rune` — Project-backed launch runes — Rune #2, a block-840,000 project-backed asset associated with CyberKongz and a holder-distribution launch.
- **THE•RUNIX•TOKEN** — `UNCERTAIN` / `MEDIUM` — `the-runix-token` — Project-backed launch runes — Rune #4, an activation-block asset historically associated with the RUNIX/RuneChain-BVM ecosystem.
- **SATOSHI•NAKAMOTO** — `UNCERTAIN` / `MEDIUM` — `satoshi-nakamoto-rune` — Early public etchings — Rune #6, an activation-block public Rune using the SATOSHI•NAKAMOTO name and a completed open-mint structure.
- **LOBO•THE•WOLF•PUP** — `ACTIVE` / `HIGH` — `lobo-the-wolf-pup` — Project-backed launch runes — Rune #9, a block-840,000 community asset from the Buoyant Capital-linked LOBO ecosystem, distributed largely through a free holder airdrop.

### Ordinals-Linked Distribution

- **DOG•GO•TO•THE•MOON** — `ACTIVE` / `HIGH` — `dog-go-to-the-moon` — Holder airdrops — The canonical Rune distributed through the Runestone community, etched as Rune #3 in the Runes activation block and launched without a sale.
- **RSIC•GENESIS•RUNE** — `HISTORICAL` / `MEDIUM` — `rsic-genesis-rune` — Pre-Runes reward transitions — Rune #8, created as the Rune reward/distribution outcome of the pre-Runes RSIC Metaprotocol experiment.
- **BASED•ANGELS•RUNE** — `ACTIVE` / `HIGH` — `based-angels-rune` — Holder airdrops — The official Rune distributed to Based Angels holders, connecting the active 5,555-piece Ordinals project to a distinct Runes asset.

### Cross-Standard Migration

- **PUPS•WORLD•PEACE** — `ACTIVE` / `HIGH` — `pups-world-peace` — BRC-20 to Runes migrations — The current PUPS community Rune, evolved from an earlier BRC-20 token and culturally tied to the O.P.I.U.M./Bitcoin Puppets ecosystem.
- **MAGIC•INTERNET•MONEY** — `ACTIVE` / `HIGH` — `magic-internet-money-rune` — BRC-20 to Runes migrations — The official Bitcoin Wizard community Rune, carrying the 2013 Magic Internet Money meme lineage through a BRC-20 phase into Runes.

### Community & Cultural Runes

- **WANKO•MANKO•RUNES** — `HISTORICAL` / `MEDIUM` — `wanko-manko-runes` — Launch-era meme culture — A launch-era fair-mint meme Rune built around a satirical Casey Rodarmor story and etched ten blocks after Runes activation.
- **BILLION•DOLLAR•CAT** — `ACTIVE` / `HIGH` — `billion-dollar-cat` — Later community meme projects — A fair-minted cat-themed Rune project with a current community site and companion tools, launched in May 2024 with no premine.
- **WISHY•WASHY•MACHINE** — `ACTIVE` / `MEDIUM` — `wishy-washy-machine` — Later community meme projects — A later-era community Rune with active 2026 social/brand activity and Rune ID `865286:2249`.
- **GIZMO•IMAGINARY•KITTEN** — `UNCERTAIN` / `MEDIUM` — `gizmo-imaginary-kitten` — Later community meme projects — A zero-premine October 2024 community Rune with a completed one-billion-unit mint and an originally documented viral/public-license framing.
- **SAIKO•HAMSTER** — `UNCERTAIN` / `MEDIUM` — `saiko-hamster` — Later community meme projects — A 2024 hamster-themed community Rune with identifier `846400:165` and a reported 21-million-unit supply.

### Utility & Governance Runes

- **LIQUIDIUM•TOKEN** — `ACTIVE` / `HIGH` — `liquidium-token` — Application governance / utility — Liquidium’s official Rune for governance and utility around its Bitcoin-native lending application and related protocol ecosystem.

## Status summary

- **ACTIVE:** 10
- **HISTORICAL:** 4
- **INACTIVE:** 0
- **UNCERTAIN:** 4

## Topic summary

- **Protocol & Genesis:** 2
- **Halving-Block Provenance:** 5
- **Ordinals-Linked Distribution:** 3
- **Cross-Standard Migration:** 2
- **Community & Cultural Runes:** 5
- **Utility & Governance Runes:** 1

## Source-confidence summary

- **HIGH:** 9
- **MEDIUM:** 9
- **LOW:** 0

## Required seed disposition

- **UNCOMMON•GOODS** — INCLUDED — MSC-EXP-RUNE-002 — Protocol & Genesis / Protocol-defined genesis rune
- **SATOSHI•NAKAMOTO** — INCLUDED — MSC-EXP-RUNE-006 — Halving-Block Provenance / Early public etchings
- **DOG•GO•TO•THE•MOON** — INCLUDED — MSC-EXP-RUNE-008 — Ordinals-Linked Distribution / Holder airdrops
- **MAGIC•INTERNET•MONEY** — INCLUDED — MSC-EXP-RUNE-012 — Cross-Standard Migration / BRC-20 to Runes migrations
- **PUPS•WORLD•PEACE** — INCLUDED — MSC-EXP-RUNE-011 — Cross-Standard Migration / BRC-20 to Runes migrations
- **BILLION•DOLLAR•CAT** — INCLUDED — MSC-EXP-RUNE-014 — Community & Cultural Runes / Later community meme projects
- **WISHY•WASHY•MACHINE** — INCLUDED — MSC-EXP-RUNE-015 — Community & Cultural Runes / Later community meme projects
- **GIZMO•IMAGINARY•KITTEN** — INCLUDED — MSC-EXP-RUNE-016 — Community & Cultural Runes / Later community meme projects
- **SAIKO•HAMSTER** — INCLUDED — MSC-EXP-RUNE-017 — Community & Cultural Runes / Later community meme projects

All nine required user seeds are represented as canonical RUNES records. None required exclusion or relationship-only treatment.

## Important additions beyond the seed list

- **Runes Protocol** — Runes is the technical substrate for every canonical Rune asset in this registry and establishes the terminology and state-transition rules that wallets, indexers, marketplaces, and applications implement.
- **Z•Z•Z•Z•Z•FEHU•Z•Z•Z•Z•Z** — It is the earliest ordinary Rune ID after the special genesis entry and documents the competitive block-840,000 launch cohort.
- **DECENTRALIZED** — It is one of the first project-backed Runes in the activation block and shows how established NFT/Ordinals-adjacent communities used Runes for distribution at launch.
- **THE•RUNIX•TOKEN** — Its early activation-block provenance and infrastructure-linked history distinguish it from anonymous early-number assets that have only market presence.
- **LOBO•THE•WOLF•PUP** — LOBO connects activation-block provenance with a documented pre-Runes community campaign and broad holder-distribution model.
- **RSIC•GENESIS•RUNE** — It is a major pre-Runes-to-Runes transition case and demonstrates how Ordinals assets were used to coordinate future Rune allocation before the protocol activated.
- **BASED•ANGELS•RUNE** — It is a clean cross-category example in which an established Ordinals collection has a materially distinct Rune that merits its own RUNES profile while the PFP collection remains in ORDINALS.
- **WANKO•MANKO•RUNES** — It captures the immediate meme/community experimentation that followed the technical Runes launch and has direct cultural proximity to the protocol creator’s writing.
- **LIQUIDIUM•TOKEN** — It is a strong example of a Rune used by an active Bitcoin application rather than primarily as a meme or collectible-community asset.

## Required cross-category relationship decisions

- **DOG•GO•TO•THE•MOON ↔ Runestone (ORDINALS)** — DOG is canonical in RUNES; Runestone remains the historical Ordinals distribution artifact and is linked rather than duplicated.
- **RSIC•GENESIS•RUNE ↔ RSIC Metaprotocol (ORDINALS)** — The Rune is canonical in RUNES; the pre-Runes distribution/metaprotocol phase remains in ORDINALS.
- **BASED•ANGELS•RUNE ↔ Based Angels (ORDINALS)** — The Rune is canonical in RUNES; the Based Angels collection remains in ORDINALS.

## Deliberate omission / relationship-only decisions

| Candidate | Decision | Reason |
| --- | --- | --- |
| Runestone | RELATIONSHIP_ONLY | Canonical home is ORDINALS. It is the historical distribution artifact linked to DOG•GO•TO•THE•MOON and must not be duplicated in RUNES. |
| RSIC Metaprotocol | RELATIONSHIP_ONLY | Canonical home is ORDINALS. RSIC•GENESIS•RUNE receives the RUNES profile; the pre-Runes metaprotocol/distribution phase stays relational. |
| Based Angels | RELATIONSHIP_ONLY | Canonical home is ORDINALS. BASED•ANGELS•RUNE is the separate Rune entity. |
| DOG•DOG•DOG•DOG•DOG | EXCLUDE_FOR_NOW | Early Rune number and market/indexer persistence alone do not establish enough distinct historical, technical, cultural, or project significance for the initial MSC canon. |
| MEME•ECONOMICS | EXCLUDE_FOR_NOW | Activation-block provenance is clear, but this pass did not verify a sufficiently distinctive project identity, stewardship history, or ecosystem role beyond early-number/on-chain and market presence. |
| EPIC•EPIC•EPIC•EPIC | EXCLUDE_FOR_NOW | Indexer/market presence was not enough to establish a differentiated, well-sourced historical or ecosystem case for canonical inclusion. |
| STAKED•LIQUIDIUM | RELATIONSHIP_ONLY | Official Liquidium child/receipt Rune associated with LIQ staking. It is represented under the canonical LIQUIDIUM•TOKEN profile to avoid child-token expansion. |

## Consolidation decisions

- PUPS BRC-20 history and PUPS•WORLD•PEACE are represented by one current canonical Rune profile; the BRC-20 predecessor remains a relationship/history field.
- WZRD/BRC-20 and MAGIC•INTERNET•MONEY are consolidated as lineage under the canonical Rune profile; the predecessor is not a separate RUNES profile.
- Wrapped or bridged representations of Rune assets on other networks are relationships, not separate canonical Rune entities.
- STAKED•LIQUIDIUM is modeled as a child/receipt asset under LIQUIDIUM•TOKEN rather than a separate initial-canon profile.

## Records requiring qualified public copy

- **THE•RUNIX•TOKEN (HIGH)** — Activation-block identity is verified, but current stewardship of the canonical Bitcoin Rune is not. Do not use wrapped/bridged RUNIX activity to imply ACTIVE lifecycle.
- **SATOSHI•NAKAMOTO (HIGH)** — Core Rune state is verified but creator/operator attribution and current project stewardship remain unresolved. Keep UNCERTAIN / MEDIUM.
- **GIZMO•IMAGINARY•KITTEN (HIGH)** — Launch mechanics are verifiable, but the former official domain is lapsed and current project operation is unresolved. Keep UNCERTAIN / MEDIUM.
- **SAIKO•HAMSTER (HIGH)** — Rune identity is corroborated, but the project site is unavailable and current first-party operation is unresolved. Keep UNCERTAIN / MEDIUM.
- **BILLION•DOLLAR•CAT (MEDIUM)** — ACTIVE lifecycle and launch history are strong, but RuneMine and Ordiscan disagree on Rune-number/current state display. Use Rune ID 845764:84 unless the discrepancy is reconciled.
- **WISHY•WASHY•MACHINE (MEDIUM)** — Current social/brand activity supports ACTIVE, but direct first-party capture is incomplete and team attribution is partial. Keep MEDIUM confidence.

Additional publication caution: WANKO•MANKO•RUNES has a legitimate launch-era cultural relationship to a satirical Casey Rodarmor story, but the source story contains explicit adult material. MSC can document the provenance without reproducing or summarizing explicit content unless editorially necessary.

## Technical issues Command Center should preserve

- Do not describe Runes as Bitcoin consensus-native balances. Bitcoin Core does not maintain Rune balances; Runes-aware software applies `ord` rules to Bitcoin transactions.
- `ord` is the normative Runes specification; prose documentation is a guide and can be corrected to match implementation behavior.
- Rune IDs (`BLOCK:TX`) are more stable identifiers than marketplace tickers or disputed display metadata.
- Spacers are display metadata; name uniqueness ignores spacer placement.
- Mint terms, premine, divisibility, symbol, edicts, pointers, and cenotaph behavior are protocol-level concepts. Wallet UI and marketplace execution are implementation behavior.
- Market price, market cap, volume, holder count, and rankings are time-sensitive and intentionally excluded from timeless profile facts.
- Indexer disagreements must remain visible. BILLION•DOLLAR•CAT is the clearest current example; public copy should prefer Rune ID `845764:84` until Rune-number/current-state discrepancies are reconciled.
- Cross-standard migrations do not make BRC-20 and Runes consensus-equivalent. They are separate application-layer conventions with project-defined migration processes.

## Validation disposition

The saved validation report checks the exact 24-field contract, uniqueness, controlled values, ISO dates, taxonomy membership, seed coverage, required cross-category links, no improper Ordinals duplication, protocol/consensus framing, explicit uncertainty handling, and count reconciliation. The registry is research-only and remains subject to Command Center approval before any public implementation.
