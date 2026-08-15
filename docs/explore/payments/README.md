# MSC Explore — Payments registry workflow

This directory contains the research-only PAYMENTS category registry for MSC Explore.

## Source of truth

The canonical machine-readable source is split into one manifest and seven record shards:

- `MSC_Explore_Payments_Registry.json` — registry manifest, Payments-specific architecture, schema contract, rules, counts, review queue, omission decisions, consolidation decisions, and shard index.
- `records/MSC_Explore_Payments_Records_001_004.json`
- `records/MSC_Explore_Payments_Records_005_008.json`
- `records/MSC_Explore_Payments_Records_009_012.json`
- `records/MSC_Explore_Payments_Records_013_016.json`
- `records/MSC_Explore_Payments_Records_017_020.json`
- `records/MSC_Explore_Payments_Records_021_024.json`
- `records/MSC_Explore_Payments_Records_025_027.json`
- `MSC_Explore_Payments_Registry.md` — human-readable architecture, inventory, boundary decisions, custody/settlement distinctions, omissions, and Command Center review companion.
- `MSC_Explore_Payments_Validation.txt` — materialized validation/final-QA report.

The manifest and all listed record shards together are the canonical PAYMENTS research registry.

## Scope lock

This package is research and registry data only. It does not publish Payments pages, modify Shopify, edit Atlas, create Explore routes, modify Learn/Home/Tools, or connect records to runtime/public interfaces.

Command Center review is required before promotion into a future Master Explore Registry.

## Approved schema

PAYMENTS reuses the approved Ordinals reference contract from:

- branch `explore/ordinals-registry-research`
- QA HEAD `1f4368bdebc572de5aaed6df221460516295c54a`

Every canonical record has the same 24 fields, with only the category-specific topic/subtopic labels adapted to PAYMENTS.

Controlled values:

- `Status`: `ACTIVE`, `HISTORICAL`, `INACTIVE`, `UNCERTAIN`
- `Source confidence`: `HIGH`, `MEDIUM`, `LOW`
- `source_type`: `official`, `official-github`, `primary`, `on-chain`, `independent`, `indexer`, `marketplace`, `market-data`

Manifest counts always expose the complete controlled status and confidence vocabularies, including zero values.

## PAYMENTS boundary

A canonical PAYMENTS entity must materially explain moving value in commerce, merchant acceptance, settlement, remittance, or payment connectivity.

The following rules prevent category duplication:

- A wallet that can send or receive Lightning payments remains a WALLETS entity when wallet/key/account management is its primary identity.
- Lightning node implementations and core Lightning protocol concepts remain NETWORK.
- Exchanges do not become PAYMENTS entities merely because they offer withdrawals, cards, merchant features, or Lightning support.
- Commerce destinations are included only when their payment/spend role is category-defining rather than because they happen to accept bitcoin.
- Child products, POS modes, APIs and protocol revisions are consolidated when one canonical entity/profile explains them.

## Custody and settlement language

PAYMENTS must not use `non-custodial` as a marketing synonym.

Record copy distinguishes:

- merchant-controlled self-hosted processing;
- processor/account custody;
- direct merchant BTC settlement;
- optional fiat conversion;
- hosted software that never touches funds;
- deployment-dependent custody;
- Lightning liquidity/service-provider dependencies;
- mint/federation custody for alternative payment systems.

A payment can use Lightning without being self-custodial, and a hosted merchant UX can still settle to a merchant-controlled wallet.

## Standards and Lightning accuracy

- Lightning is not an independent blockchain.
- BOLT implementation support is separate from BOLT specification status.
- LNURL is an application-layer LUD suite, not a core BOLT.
- Lightning Address is a human-readable naming/discovery convention, not a wallet or custody model.
- Payjoin BIP 78 deployment is distinct from draft BIP 77 / Payjoin v2 work.
- BIP completion does not imply universal wallet support.
- Cashu ecash tokens are mint-issued bearer claims backed by custodial bitcoin at a mint; they are not on-chain bitcoin.

## Research policy

Prefer, in order:

1. Official product/company/project website and docs.
2. Official GitHub, developer, support, legal, release-note, or operator-controlled sources.
3. Primary Bitcoin/BIP/BOLT/protocol evidence.
4. Reputable independent corroboration.
5. Directories, market data, merchant lists and app stores as support only.

Fees, supported jurisdictions, payment limits, settlement currencies, transaction volumes and user/merchant counts are time-sensitive and must be dated or omitted from public-facing claims.
