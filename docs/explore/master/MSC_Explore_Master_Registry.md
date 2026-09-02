# MSC Explore — Master Registry

**Status:** COMMAND CENTER RECONCILED  
**Verified:** 2026-08-15  
**Integration branch:** `explore/master-registry-reconciliation`

The Master Explore Registry is a **federated registry** over the eight approved category registries. The category manifests and shards remain the canonical 24-field research payloads. This master layer reconciles identity, canonical homes, aggregate counts, same-brand system boundaries, and source provenance without creating a second copy of every record.

## Approved source registries

| Category | Approved research head | Records |
| --- | --- | ---: |
| ORDINALS | `1f4368bdebc572de5aaed6df221460516295c54a` | 47 |
| RUNES | `a9161640d19346fef8e44056604774ec294c81d0` | 18 |
| WALLETS | `c3ab81de2c309503855a00eb2380873ec5bcd401` | 40 |
| MARKETPLACES | `30704f96d21f6ff6dd2c34ba7fe27212f8bd0c50` | 18 |
| MINING | `9805a04fd5c9333f40433ff868f4e6a06301bd4a` | 37 |
| PAYMENTS | `792b3009ee9b31f3d41664a237623556b3db1c15` | 27 |
| EXCHANGES | `de1db5785795eaffe8a7649387d4ec8af83068b3` | 35 |
| NETWORK | `53c65965cf9305cf1343dcdd51f903f3a9ede5e2` | 35 |

All eight directories were imported as exact Git tree snapshots from those approved heads. No category record content was rewritten during assembly.

## Aggregate counts

### By category

- ORDINALS — 47
- RUNES — 18
- WALLETS — 40
- MARKETPLACES — 18
- MINING — 37
- PAYMENTS — 27
- EXCHANGES — 35
- NETWORK — 35

**Total: 257 canonical records**

### By lifecycle

- ACTIVE — 201
- HISTORICAL — 35
- INACTIVE — 14
- UNCERTAIN — 7

### By source confidence

- HIGH — 209
- MEDIUM — 46
- LOW — 2

## Global identity model

The master rule is:

> One canonical profile per materially distinct entity, protocol, product, or system.

A brand name is not by itself the identity unit. Two products from the same company may remain separate only when they are materially different systems in function, lifecycle, trust/custody model, protocol role, or user-facing behavior.

Cross-category relevance is represented with relationships rather than duplicate canonical records.

Category Registry IDs remain authoritative. The master registry does not introduce a second ID namespace or renumber approved research records.

## Cross-category reconciliation

### Strike — resolved canonical-home collision

Strike is canonical in PAYMENTS as `MSC-EXP-PAY-003`.

The EXCHANGES canonical copy was removed during category review. `MSC-EXP-EXC-003` remains intentionally unused, and exchange-specific findings are retained only as relationship context.

After that normalization, the eight approved inventories contain **zero exact canonical-name duplicates**.

### Same-brand systems intentionally kept separate

| System A | System B | Why both remain canonical |
| --- | --- | --- |
| Bitcoin Core | Bitcoin Core wallet | NETWORK node/reference implementation vs WALLETS optional wallet subsystem |
| Bull Bitcoin | Bull Bitcoin Wallet | EXCHANGES broker/dealer vs WALLETS self-custody wallet |
| UniSat Wallet | UniSat Marketplace | WALLETS wallet vs MARKETPLACES venue |
| Magic Eden Wallet | Magic Eden Bitcoin Marketplace | WALLETS wallet vs MARKETPLACES venue |
| Coinbase | Coinbase Commerce | EXCHANGES platform vs PAYMENTS retired merchant product |
| Binance | Binance Bitcoin marketplace support | EXCHANGES venue vs MARKETPLACES historical marketplace product |
| OKX | OKX Web3 Marketplace — Bitcoin assets | EXCHANGES venue vs MARKETPLACES Web3 marketplace product |
| CoinCorner | Bolt Card | EXCHANGES platform vs PAYMENTS NFC Lightning payment system |
| Blockstream App | Esplora / Blockstream Explorer | WALLETS wallet vs NETWORK explorer/indexing infrastructure |
| Electrum | ElectrumX | WALLETS client wallet vs NETWORK server/backend |

These pairs must remain linked so later page generation does not accidentally turn them into duplicate company profiles.

## Category-boundary decisions preserved

- Ordinals-linked Runes assets are related across ORDINALS and RUNES instead of duplicated.
- Mining/template protocols already approved in MINING remain relationship-only from NETWORK.
- Lightning protocol and implementations belong in NETWORK; payment processors, merchant systems, and payment-specific application standards remain PAYMENTS.
- Wallet products remain WALLETS even when they expose payment, marketplace, Lightning, or node integrations.
- Exchange-operated marketplaces or wallet products are separate profiles only when they satisfy the materially-distinct-system rule.

## Publication and freshness gate

A record being present in the master canon does not mean every stored current-state claim can be published without a new check.

At public-copy time, reverify category review-queue items and any volatile claims involving:

- lifecycle and operator status;
- fees, spreads, limits, withdrawals, settlement, or geography;
- licensing, authorization, jurisdiction, or regulation;
- software/protocol version support and deployment maturity;
- Lightning feature support or network statistics;
- mining hashrate/block-share estimates and commercial terms;
- marketplace custody, PSBT, escrow, or pool-wallet mechanics.

Near-term hard recheck dates already known:

- **Voltage:** after `2026-08-31` self-serve infrastructure deprovisioning.
- **BitMEX:** after the announced `2026-09-23 04:00 UTC` exchange closure.

## Integration state

The integration branch is based on:

`98e3e722bff75922cae7f22f2925c411b8a5d620`

Research category branches were **not merged**. Their approved directory trees were assembled into one fresh branch instead. No production files were changed.

## Next stage after this registry

The research and identity layer is now assembled. The next stage is **implementation planning**, not more broad category research: decide how the 257 canonical systems map to category hubs, entity pages, cross-links, Atlas region data, and publication/reverification workflow.

No implementation should be published or merged until separately authorized.
