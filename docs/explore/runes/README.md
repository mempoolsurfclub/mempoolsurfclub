# MSC Explore — Runes registry workflow

This directory contains the research-only Runes category registry for MSC Explore.

## Source of truth

The machine-readable canonical source is intentionally split into one manifest and three record shards:

- `MSC_Explore_Runes_Registry.json` — registry manifest, Runes-specific architecture, schema contract, rules, counts, review queue, omission/consolidation decisions, and shard index.
- `records/MSC_Explore_Runes_Records_001_006.json`
- `records/MSC_Explore_Runes_Records_007_012.json`
- `records/MSC_Explore_Runes_Records_013_018.json`
- `MSC_Explore_Runes_Registry.md` — human-readable architecture, complete inventory, technical framing, QA decisions, and review companion.
- `MSC_Explore_Runes_Validation.txt` — materialized validation/review report.

The manifest and all listed record shards together are the canonical registry. Command Center review is required before any record is promoted into a future Master Explore Registry.

## Scope lock

The package is research and registry data only. It must not modify the live Explore page, publish Shopify content, edit Atlas, change production templates/snippets, create runtime routing automatically, or imply that a recommended slug is live.

No Ordinals registry file is modified by this package.

## Record schema contract

Every canonical record uses the same 24-field research contract approved by Command Center for Ordinals, with only the category-specific `Runes topic`, `Runes subtopic`, and “Why it matters in the Runes ecosystem” labels adapted for this category.

Key controlled values:

- Lifecycle `Status`: `ACTIVE`, `HISTORICAL`, `INACTIVE`, `UNCERTAIN`.
- `Source confidence`: `HIGH`, `MEDIUM`, `LOW`.
- `source_type`: `official`, `official-github`, `primary`, `on-chain`, `independent`, `indexer`, `marketplace`, `market-data`.
- `Primary Explore category` is `RUNES`; related category values use the eight approved Explore category names.

Lifecycle, source confidence, source provenance, and research uncertainty remain separate.

## Runes technical model

Runes is an application-layer protocol implemented normatively by `ord`.

- The Runes protocol activates at Bitcoin block 840,000.
- Rune protocol messages (“runestones”) are carried in transaction outputs beginning with `OP_RETURN OP_13`.
- Rune IDs use the `BLOCK:TX` form.
- Etchings define immutable Rune properties such as name, divisibility, symbol, premine, and optional mint terms.
- Edicts allocate Rune amounts to transaction outputs; pointers can choose the default output for unallocated Runes.
- Malformed runestones are cenotaphs with protocol-defined burn/unmintable behavior.
- Spacer bullets affect display/readability but not Rune-name uniqueness.
- Runes-aware software derives balances and state from Bitcoin transactions using the `ord` rules. Bitcoin consensus validates the transactions/scripts but Bitcoin Core does not maintain Rune balances.

Do not blur these protocol/reference-implementation rules with wallet behavior, marketplace behavior, project claims, or Bitcoin consensus.

## Entity model

The initial canon intentionally does not behave like a token screener. Inclusion is based on durable protocol/historical significance, launch provenance, distribution model, cultural relevance, sustained operation, technical distinction, or strong cross-category relationships.

One canonical entity receives one canonical profile:

- Runestone remains in `ORDINALS`; DOG•GO•TO•THE•MOON is the canonical Rune profile.
- RSIC Metaprotocol remains in `ORDINALS`; RSIC•GENESIS•RUNE is the canonical Rune profile.
- Based Angels remains in `ORDINALS`; BASED•ANGELS•RUNE is the canonical Rune profile.
- PUPS’ BRC-20 predecessor is lineage under PUPS•WORLD•PEACE, not a second RUNES profile.
- WZRD/BRC-20 is lineage under MAGIC•INTERNET•MONEY, not a second RUNES profile.
- Wrapped or bridged representations are relationships rather than duplicate canonical Runes.
- STAKED•LIQUIDIUM is a child/receipt asset under LIQUIDIUM•TOKEN for initial-canon purposes.

## Lifecycle vocabulary

- `ACTIVE` — current project, protocol, operator, or community operation was verified as of the record’s verification date.
- `HISTORICAL` — the relevant project/launch phase is finite, completed, or legacy and meaningful current operation was not verified.
- `INACTIVE` — operation ceased, was abandoned, or the operator explicitly stepped away without a verified active successor.
- `UNCERTAIN` — lifecycle/activity itself cannot be determined from reliable evidence.

A completed mint can still be `ACTIVE` when project/community operation continues. A Rune that still trades can remain `HISTORICAL`, `INACTIVE`, or `UNCERTAIN`. Website availability, market listings, and indexer presence are not lifecycle evidence by themselves.

## Research standard

Use this hierarchy:

1. Official project website/docs.
2. Official GitHub, X, blog, or other creator/operator-controlled source.
3. Primary protocol/on-chain evidence.
4. Reputable independent corroboration.
5. Marketplaces, indexers, and market-data providers as supporting evidence only.

Market price, market cap, volume, holder counts, and rankings are not timeless registry facts and are not used as the primary inclusion reason.
