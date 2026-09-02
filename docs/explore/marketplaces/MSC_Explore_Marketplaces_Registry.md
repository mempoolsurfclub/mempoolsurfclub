# MSC Explore — MARKETPLACES Research Registry

**State:** COMMAND CENTER REVIEW ONLY  
**Verified:** 2026-08-15  
**Canonical records:** 18  
**Reference schema:** approved Ordinals 24-field contract at `1f4368bdebc572de5aaed6df221460516295c54a`

## Marketplaces-specific topic architecture

### Trading Venues
Canonical end-user venues where Bitcoin-native or Bitcoin-relevant assets are listed, auctioned, bid on, or purchased.

- **Ordinals-focused marketplaces** — 3 records
- **Multi-asset Bitcoin marketplaces** — 4 records
- **Art & launchpad marketplaces** — 2 records
- **Rare-sat marketplaces** — 1 record
- **Curated Bitcoin auctions** — 1 record
- **Multi-protocol Bitcoin collectibles** — 1 record
- **Multi-chain Bitcoin marketplace integrations** — 2 records
- **Cross-chain / vaulted Ordinals markets** — 1 record

### Protocols & Liquidity Infrastructure
Trading protocols and marketplace infrastructure whose mechanics materially shape Bitcoin asset liquidity without fitting a conventional listing venue.

- **Bitcoin token AMMs** — 2 records
- **Marketplace APIs & white-label infrastructure** — 1 record

## Canonical inventory

| ID | Canonical entity | Topic / subtopic | Status | Confidence |
|---|---|---|---|---|
| MSC-EXP-MKT-001 | ORD.NET | Trading Venues / Ordinals-focused marketplaces | ACTIVE | HIGH |
| MSC-EXP-MKT-002 | Satflow | Trading Venues / Multi-asset Bitcoin marketplaces | ACTIVE | HIGH |
| MSC-EXP-MKT-003 | UniSat Marketplace | Trading Venues / Multi-asset Bitcoin marketplaces | ACTIVE | HIGH |
| MSC-EXP-MKT-004 | Ordinals Wallet | Trading Venues / Multi-asset Bitcoin marketplaces | ACTIVE | HIGH |
| MSC-EXP-MKT-005 | Gamma | Trading Venues / Art & launchpad marketplaces | ACTIVE | HIGH |
| MSC-EXP-MKT-006 | OKX Web3 Marketplace — Bitcoin assets | Trading Venues / Multi-asset Bitcoin marketplaces | ACTIVE | HIGH |
| MSC-EXP-MKT-007 | Magisat | Trading Venues / Rare-sat marketplaces | ACTIVE | HIGH |
| MSC-EXP-MKT-008 | Ordzaar | Trading Venues / Art & launchpad marketplaces | ACTIVE | MEDIUM |
| MSC-EXP-MKT-009 | Scarce City | Trading Venues / Curated Bitcoin auctions | ACTIVE | HIGH |
| MSC-EXP-MKT-010 | Horizon Market | Trading Venues / Multi-protocol Bitcoin collectibles | ACTIVE | HIGH |
| MSC-EXP-MKT-011 | Magic Eden Bitcoin Marketplace | Trading Venues / Multi-chain Bitcoin marketplace integrations | HISTORICAL | HIGH |
| MSC-EXP-MKT-012 | Binance Bitcoin marketplace support | Trading Venues / Multi-chain Bitcoin marketplace integrations | HISTORICAL | MEDIUM |
| MSC-EXP-MKT-013 | Ordinals Market | Trading Venues / Cross-chain / vaulted Ordinals markets | HISTORICAL | MEDIUM |
| MSC-EXP-MKT-014 | Ordswap | Trading Venues / Ordinals-focused marketplaces | INACTIVE | MEDIUM |
| MSC-EXP-MKT-015 | OpenOrdex | Trading Venues / Ordinals-focused marketplaces | HISTORICAL | MEDIUM |
| MSC-EXP-MKT-016 | DotSwap | Protocols & Liquidity Infrastructure / Bitcoin token AMMs | ACTIVE | HIGH |
| MSC-EXP-MKT-017 | Runes DEX | Protocols & Liquidity Infrastructure / Bitcoin token AMMs | ACTIVE | MEDIUM |
| MSC-EXP-MKT-018 | Trio Marketplace / OrdinalsBot | Protocols & Liquidity Infrastructure / Marketplace APIs & white-label infrastructure | ACTIVE | HIGH |

## Required seeds

- **ord.net → INCLUDED as `ORD.NET` (`MSC-EXP-MKT-001`).** Exact domain/entity was verified; it is not `ord.io`. Current terms identify The Wizards of Ord LLC as operator. Current API documentation establishes wallet-authenticated listing, purchase and offer PSBT flows.
- **satflow.com → INCLUDED as `Satflow` (`MSC-EXP-MKT-002`).** Current product/API material establishes active Ordinals + Runes trading, bids, sweeps, mempool-aware features and wallet-signed PSBT intents.

## Research conclusions that materially affect public copy

- **Magic Eden Bitcoin Marketplace is HISTORICAL, not ACTIVE.** Magic Eden's 2026 support documentation says its Bitcoin marketplace support ended in March 2026. Do not use old collection/listing pages as current-operation evidence.
- **Binance Bitcoin marketplace support is HISTORICAL.** Binance Academy, updated June 18, 2026, says users can browse previously purchased inscriptions but can no longer place new buy/sell orders.
- **ORD.NET custody wording needs precision.** Its terms say the platform does not take custody or hold private keys, while its live listing API uses a scripted listing escrow output, service-built PSBTs and a pre-signed recovery transaction.
- **DotSwap has mixed custody models.** Its own architecture distinguishes custodial DotSwap CPMM pools from self-custodial Nexus CLMM pools.
- **Runes DEX should not receive an unqualified “fully non-custodial” label.** Its documentation says fee coins are physically located on and controlled by a pool wallet.
- **Ordinals Market has unresolved historical mechanics.** Contemporary sources support both Emblem Vault/Ethereum trading and reported PSBT adoption. Preserve the ambiguity.
- **OpenOrdex is HISTORICAL.** The open-source repository remains reachable, but current operation was not verified; repository reachability alone is not lifecycle evidence.
- **Ordswap is INACTIVE.** Its 2023 domain compromise and cessation make the old domain unsuitable for public linking.
- **Trio and OrdinalsBot are consolidated.** Trio is the live consumer marketplace; OrdinalsBot exposes the underlying marketplace/API infrastructure. One profile prevents company/product duplication.

## Company / product / cross-category decisions

- Magic Eden: one MARKETPLACES record for the Bitcoin implementation; Ordinals and Runes are not split into separate profiles. Status is HISTORICAL for the Bitcoin implementation, not for Magic Eden as a company.
- UniSat: one Marketplace product record with explicit WALLETS relationship; do not create separate profiles for each supported protocol or for UniHexa without Command Center approval.
- Ordinals Wallet: one combined wallet/marketplace entity record here because the marketplace is a substantial canonical product; Master Explore must coordinate canonical-home/dedup behavior with WALLETS.
- OKX: record is scoped to the Web3 Wallet Bitcoin marketplace, not the centralized exchange order book; link to EXCHANGES and WALLETS rather than conflating custody models.
- Binance: one historical corporate/product record consolidates the 2023 Binance NFT Bitcoin phase and later Web3 Wallet Inscriptions Marketplace while explicitly preserving their different mechanics.
- Gamma: one profile for its Bitcoin art marketplace/creator platform; no separate launchpad versus secondary-market profile.
- Trio / OrdinalsBot: one combined profile covers the live Trio consumer marketplace and directly underlying OrdinalsBot marketplace/API infrastructure; do not create separate company and marketplace profiles without a master-registry canonical-home decision.

## Deliberate exclusions / relation-only decisions

- **ord.io / ORD — EXCLUDE**: Ord.io is canonically an Ordinals explorer/indexer rather than a marketplace. Its associated Zap trading product and Ord.io shut down on June 1, 2026; a marketplace record would mis-home the explorer and duplicate a discontinued adjacent product.
- **Deezy — EXCLUDE**: Current first-party positioning is a Bitcoin treasury/rare-sat hunting and data/API business rather than a multi-sided marketplace. Selling its own sourced sats does not establish a canonical marketplace venue.
- **Generative.xyz — EXCLUDE**: First-party docs verify an early Bitcoin on-chain art and launch platform launched February 10, 2023, but the reviewed current material does not establish a durable secondary-marketplace role or verifiable 2026 trading operation.
- **Tensor — EXCLUDE**: Official product documentation is Solana-focused; no materially significant Bitcoin marketplace implementation was verified.
- **Xverse — EXCLUDE_AS_STANDALONE_MARKETPLACE**: Xverse is canonically a wallet/aggregation surface. Its Rune swap flow routes quotes to providers such as UniSat, OKX and DotSwap; those venues are represented directly and Xverse is modeled relationally under WALLETS.
- **RareSatsMarket.com — EXCLUDE**: The site states that it is powered by Magisat API. Magisat is the underlying canonical rare-sat marketplace/infrastructure entity, so a second profile would be derivative duplication.
- **Emblem Vault — EXCLUDE_AS_STANDALONE_MARKETPLACE**: Emblem Vault is cross-chain vault/wrapping infrastructure rather than the canonical end-user Ordinals venue in this registry. Its material marketplace role is preserved in the Ordinals Market record and related-entity notes.
- **Ord.Exchange — EXCLUDE**: Marketplace aggregation/routing does not add a distinct canonical trading venue where underlying marketplace entities are already represented.
- **Best in Slot — EXCLUDE**: Canonically an indexer/data/analytics layer rather than a marketplace. Listing/market data should not create a duplicate MARKETPLACES profile.
- **Luminex — EXCLUDE**: Primarily a mint/launch/issuance tool in the reviewed scope; insufficient evidence for a distinct secondary-marketplace canonical profile.
- **Oyl — EXCLUDE**: Primarily wallet/trading aggregation infrastructure rather than a standalone marketplace venue in the reviewed scope.
- **UniHexa — RELATION_ONLY**: UniSat describes UniHexa as a newer/beta trading engine. It remains under the UniSat canonical entity until Command Center determines it is a materially distinct product deserving a separate profile.
- **RunesFi — EXCLUDE**: Testnet/incomplete evidence did not meet the canon threshold for current operational significance.
- **Saturn BTC / SatsX / low-volume clones — EXCLUDE**: Insufficient first-party architecture, durable significance, or distinct historical role; including them would turn the registry into directory padding.
- **OrdinalHub — EXCLUDE**: Reviewed current/historical material supports an inscription tool, ecosystem map, research and discovery role; a distinct durable marketplace/trading venue was not verified.

## Records that should not receive unqualified public copy yet

- **ORD.NET** — Do not reduce its custody model to a single adjective. Terms disclaim custody/private-key access, while current listing APIs use a scripted listing escrow output, service-built PSBTs and pre-signed recovery.
- **Ordzaar** — First-party sources confirm marketplace/launchpad operation and no private-key storage, but low-level transaction/custody architecture was not sufficiently documented.
- **Binance Bitcoin marketplace support** — One record spans two Binance product phases with materially different custody/user-flow assumptions.
- **Ordinals Market** — Contemporary sources establish both Emblem Vault/Ethereum trading and reported PSBT adoption; exact transition/parallel-path chronology remains unresolved.
- **Ordswap** — Historical domain compromise creates link-safety concerns; do not publish the old domain as an official call-to-action.
- **OpenOrdex** — Repository reachability is not evidence of current operation; classify as HISTORICAL.
- **Runes DEX** — Marketing language around decentralization/self-custody must be qualified by documented pool-wallet control and fee-wallet mechanics.

## Count summary

### Lifecycle
- ACTIVE: 13
- HISTORICAL: 4
- INACTIVE: 1

### Source confidence
- HIGH: 12
- MEDIUM: 6

### Topic
- Trading Venues: 15
- Protocols & Liquidity Infrastructure: 3

## Publication lock

This registry is research-only. Do not merge, publish Marketplace pages, add production routes, modify Atlas/Shopify/Learn/Home/Tools, or connect these records to live Explore without Command Center approval.
