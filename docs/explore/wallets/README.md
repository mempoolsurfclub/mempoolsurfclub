# MSC Explore — Wallets Research Package

**Status:** COMMAND CENTER REVIEW  
**Last verified:** 2026-08-15  
**Primary Explore category:** WALLETS

This directory contains the research-grade canonical registry for the Mempool Surf Club Explore → WALLETS category. It is a research package only. Nothing in this directory publishes Wallets content or changes the live Explore interface.

## Files

- `MSC_Explore_Wallets_Registry.json` — canonical manifest, taxonomy, schema contract, counts, omission decisions and shard index.
- `MSC_Explore_Wallets_Registry.md` — human-readable registry companion.
- `MSC_Explore_Wallets_Validation.txt` — saved validation and QA report.
- `records/MSC_Explore_Wallets_Records_*.json` — canonical 24-field entity records, sharded four records per file.

## Approved schema reference

Wallets uses the approved Ordinals research schema from:

- branch: `explore/ordinals-registry-research`
- approved QA HEAD: `1f4368bdebc572de5aaed6df221460516295c54a`

The Wallets package reuses the approved 24-field entity contract, lifecycle model, HIGH/MEDIUM/LOW source-confidence model, controlled source provenance, uncertainty handling, one-entity-one-profile discipline, and manifest + shards + companion + validation pattern.

Wallets does **not** copy the Ordinals topic taxonomy.

## Canonical Wallets architecture

1. Software Wallets
2. Bitcoin Asset Wallets
3. Lightning & Payment Wallets
4. Multisig & Collaborative Custody
5. Hardware & Signing Devices

Each entity has one primary Wallets topic/subtopic. Secondary capabilities such as Lightning, multisig, privacy, Ordinals, Runes, Liquid or hardware integration are expressed through characteristics, tags and relationships.

## Lifecycle

Allowed values only:

- `ACTIVE`
- `HISTORICAL`
- `INACTIVE`
- `UNCERTAIN`

A downloadable app, old repository, marketplace listing or surviving website does not by itself prove `ACTIVE`.

## Source confidence

Allowed values only:

- `HIGH`
- `MEDIUM`
- `LOW`

Source confidence is independent from lifecycle.

## Controlled source provenance

Allowed `source_type` values only:

- `official`
- `official-github`
- `primary`
- `on-chain`
- `independent`
- `indexer`
- `marketplace`
- `market-data`

## Custody language

Custody is described by who can authorize spending in the relevant configuration.

- A minority recovery/co-signing key does not automatically make a service custodial.
- Hybrid wallets are described by mode and region where necessary.
- A hardware wallet/signing device protects or uses private keys and signs transactions; bitcoin itself remains on the Bitcoin ledger.
- Open source and Secure Element usage are characteristics, not security ratings.

## Canonical count

40 records.

- ACTIVE: 36
- HISTORICAL: 1
- INACTIVE: 2
- UNCERTAIN: 1

Source confidence:

- HIGH: 38
- MEDIUM: 2
- LOW: 0

## Required seed

Xverse is included and researched as a broad Bitcoin wallet entity, not merely an Ordinals wallet.

## Scope guardrail

Do not use this package to:

- merge or deploy anything;
- create Wallet category pages or public profiles;
- alter Shopify, Atlas, Learn, Home, Tools, Ordinals or Runes;
- create production routes; or
- connect the registry to the live Explore interface.

Command Center approval is required before downstream publication work.
