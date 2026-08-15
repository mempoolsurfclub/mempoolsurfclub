# MSC Explore — Master Registry

Status: **COMMAND CENTER RECONCILED**

This directory is the federated master layer for all eight approved MSC Explore research registries:

- ORDINALS
- RUNES
- WALLETS
- MARKETPLACES
- MINING
- PAYMENTS
- EXCHANGES
- NETWORK

## Source of truth

The master registry does **not** duplicate the 24-field record payloads into a second flattened record store. The canonical research payloads remain in the imported category manifests and record shards under `docs/explore/<category>/`.

The master layer owns:

- approved category source provenance and SHAs;
- aggregate record counts;
- cross-category canonical-home decisions;
- duplicate/collision reconciliation;
- same-brand product/system distinctions;
- publication/reverification gates;
- integration state.

This avoids creating two competing machine-readable copies of the same research.

## Integration branch

`explore/master-registry-reconciliation`

Base `main` SHA:

`98e3e722bff75922cae7f22f2925c411b8a5d620`

The eight category directories were imported as exact Git tree snapshots from their approved research heads. Their contents were not rewritten during assembly.

## Approved category heads

| Category | Approved head | Records |
| --- | --- | ---: |
| ORDINALS | `1f4368bdebc572de5aaed6df221460516295c54a` | 47 |
| RUNES | `a9161640d19346fef8e44056604774ec294c81d0` | 18 |
| WALLETS | `c3ab81de2c309503855a00eb2380873ec5bcd401` | 40 |
| MARKETPLACES | `30704f96d21f6ff6dd2c34ba7fe27212f8bd0c50` | 18 |
| MINING | `9805a04fd5c9333f40433ff868f4e6a06301bd4a` | 37 |
| PAYMENTS | `792b3009ee9b31f3d41664a237623556b3db1c15` | 27 |
| EXCHANGES | `de1db5785795eaffe8a7649387d4ec8af83068b3` | 35 |
| NETWORK | `53c65965cf9305cf1343dcdd51f903f3a9ede5e2` | 35 |

## Aggregate canon

- Total canonical records: **257**
- ACTIVE: **201**
- HISTORICAL: **35**
- INACTIVE: **14**
- UNCERTAIN: **7**
- HIGH confidence: **209**
- MEDIUM confidence: **46**
- LOW confidence: **2**

## Canonical identity rule

One canonical profile represents one materially distinct entity, protocol, product, or system.

Cross-category relevance is a relationship, not permission to create duplicate profiles. Same-brand products may remain separate when their function, lifecycle, custody/trust model, protocol role, or user-facing system is materially different.

The master layer preserves the category Registry IDs rather than creating a second master-ID namespace.

## Key reconciliation decision

`Strike` is canonical in **PAYMENTS** as `MSC-EXP-PAY-003`.

The former EXCHANGES slot `MSC-EXP-EXC-003` remains intentionally unused. Exchange-specific research is retained only as relationship context.

## Distinct same-brand systems

Examples intentionally retained as separate profiles include:

- Bitcoin Core / Bitcoin Core wallet
- Bull Bitcoin / Bull Bitcoin Wallet
- UniSat Wallet / UniSat Marketplace
- Magic Eden Wallet / Magic Eden Bitcoin Marketplace
- Coinbase / Coinbase Commerce
- Binance / Binance Bitcoin marketplace support
- OKX / OKX Web3 Marketplace — Bitcoin assets
- CoinCorner / Bolt Card
- Blockstream App / Esplora / Blockstream Explorer
- Electrum / ElectrumX

These are not treated as duplicate profiles because each pair represents materially different systems.

## Publication gate

Master inclusion is **not** approval to publish current claims unchanged.

Always consult the category validation/review queue before drafting public copy. Fees, availability, regulation, deployment, custody, software support, network statistics, mining shares, and marketplace settlement mechanics must be reverified when time-sensitive.

Two near-term date triggers are already locked:

- Voltage — recheck after the scheduled `2026-08-31` self-serve infrastructure deprovisioning.
- BitMEX — recheck lifecycle after the announced `2026-09-23 04:00 UTC` exchange closure.

## Not authorized yet

Do not merge this branch, publish Explore pages, add routes, connect Atlas, modify Shopify, or alter production state without a separate explicit instruction.
