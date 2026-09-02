# MSC Explore — Exchanges Research Registry

**Status:** COMMAND CENTER REVIEW  
**Last verified:** 2026-08-15  
**Primary Explore category:** EXCHANGES  
**Canonical records:** 35

> The JSON manifest plus its nine `records/` shards are the canonical machine-readable source. This Markdown file is the human-readable registry companion. Nothing here publishes or changes the live Explore implementation.

## Final topic architecture

### Bitcoin-Focused Brokers & On-Ramps

Bitcoin-first brokerage, dealer and regional on-ramp businesses where buying or selling BTC is a core product, including direct-to-wallet and custodial models.

- Bitcoin-only custodial brokerage
- Bitcoin-focused brokerage interface with third-party custody
- Bitcoin-focused custodial payments-and-trading app
- Bitcoin-only direct-to-wallet broker/dealer
- Bitcoin-focused regional exchange

### Centralized Spot & Multi-Market Exchanges

Custodial order-book and multi-market exchanges with durable Bitcoin liquidity, fiat-market, regulatory or historical significance beyond merely listing BTC.

- Global custodial order-book exchange
- Global custodial multi-market exchange
- Regional regulated order-book exchange

### Peer-to-Peer & Non-Custodial Exchange Systems

Peer-to-peer Bitcoin exchange systems whose coordination, escrow and settlement design materially differs from conventional custodial exchange accounts.

- On-chain multisig P2P
- Lightning hold-invoice P2P
- Social-graph P2P coordination

### Institutional & Derivatives Venues

Institutional spot/OTC and derivatives venues that materially changed Bitcoin price discovery, professional execution or hedging.

- Crypto derivatives venue
- Regulated institutional spot/OTC venue
- Regulated traditional Bitcoin derivatives

### Historical Exchange Infrastructure

Defunct venues and early on-ramp infrastructure whose operation materially explains the evolution of Bitcoin custody, P2P access, fiat markets and institutional execution.

- Failed/shuttered centralized exchange
- Closed custodial P2P marketplace
- Early fiat on-ramp
- Historical institutional OTC desk

## Complete inventory

### Bitcoin-Focused Brokers & On-Ramps

- **River** — `ACTIVE` — `river` — Bitcoin-only custodial brokerage — U.S. Bitcoin-focused brokerage combining BTC execution, custodial balances, withdrawals, and Bitcoin wallet functionality.
- **Swan Bitcoin** — `ACTIVE` — `swan-bitcoin` — Bitcoin-focused brokerage interface with third-party custody — Bitcoin-focused purchase and savings platform whose current terms position Swan as a technology interface to third-party trading and custody providers.
- **Bull Bitcoin** — `ACTIVE` — `bull-bitcoin` — Bitcoin-only direct-to-wallet broker/dealer — Bitcoin-only brokerage and payment service built around direct settlement to or from user-controlled Bitcoin wallets rather than exchange-account custody.
- **Bitcoin Well** — `ACTIVE` — `bitcoin-well` — Bitcoin-focused regional exchange — Canadian-founded Bitcoin company offering online buy/sell flows that deliver BTC to user-controlled wallets, plus ATM and OTC infrastructure.
- **Relai** — `ACTIVE` — `relai` — Bitcoin-only direct-to-wallet broker/dealer — European Bitcoin-only app that brokers BTC purchases and sends bitcoin to user-controlled wallet infrastructure rather than operating a conventional custodial order book.
- **Pocket Bitcoin** — `ACTIVE` — `pocket-bitcoin` — Bitcoin-only direct-to-wallet broker/dealer — Swiss Bitcoin-only broker designed to convert bank transfers into bitcoin delivered directly to a user's wallet.
- **CoinCorner** — `ACTIVE` — `coincorner` — Bitcoin-focused regional exchange — Isle of Man-founded Bitcoin company offering BTC buy/sell, custodial storage, transfers and Lightning-enabled services.

### Centralized Spot & Multi-Market Exchanges

- **Coinbase** — `ACTIVE` — `coinbase` — Global custodial order-book exchange — Major U.S.-founded custodial platform combining retail brokerage, advanced spot trading, custody and institutional execution for bitcoin and other assets.
- **Kraken** — `ACTIVE` — `kraken` — Global custodial order-book exchange — Long-running centralized exchange offering custodial bitcoin spot trading, fiat rails, withdrawals, APIs and institutional services across multiple legal entities.
- **Binance** — `ACTIVE` — `binance` — Global custodial multi-market exchange — Large global custodial exchange launched in 2017 with deep BTC spot and derivatives markets, fiat/crypto rails and broad trading infrastructure.
- **OKX** — `ACTIVE` — `okx` — Global custodial multi-market exchange — Global centralized exchange offering custodial BTC spot/derivatives trading, withdrawals, APIs and institutional services.
- **Bybit** — `ACTIVE` — `bybit` — Global custodial multi-market exchange — Centralized exchange founded in 2018 with material bitcoin spot and derivatives markets, custody, APIs and institutional trading.
- **Bitstamp** — `ACTIVE` — `bitstamp` — Regional regulated order-book exchange — One of the longest-running centralized Bitcoin exchanges, founded in 2011 and acquired by Robinhood in 2025.
- **Bitfinex** — `ACTIVE` — `bitfinex` — Global custodial order-book exchange — Long-running centralized exchange launched in 2012 with BTC spot/derivatives markets, custody, APIs and Bitcoin Lightning support.
- **Gemini** — `ACTIVE` — `gemini` — Regional regulated order-book exchange — U.S.-founded custodial exchange and trust-company platform offering BTC spot trading, custody and institutional services.
- **BTCC** — `ACTIVE` — `btcc` — Global custodial multi-market exchange — Exchange using the BTCC/BTC China lineage, originating in 2011 and currently operating spot and futures products.
- **Bitso** — `ACTIVE` — `bitso` — Regional regulated order-book exchange — Latin American custodial exchange founded in Mexico in 2014 with durable BTC/fiat market significance and regional payment infrastructure.
- **Mercado Bitcoin** — `ACTIVE` — `mercado-bitcoin` — Regional regulated order-book exchange — Brazilian exchange founded in 2013, among the earliest durable BTC/BRL on-ramps in Latin America.
- **bitFlyer** — `ACTIVE` — `bitflyer` — Regional regulated order-book exchange — Japanese Bitcoin exchange founded in 2014 with long-running JPY/BTC infrastructure and regulated exchange operations.

### Peer-to-Peer & Non-Custodial Exchange Systems

- **Bisq** — `ACTIVE` — `bisq` — On-chain multisig P2P — Open-source P2P Bitcoin exchange network using local software, Tor and Bitcoin security deposits/multisig rather than a centralized custodial order book.
- **RoboSats** — `ACTIVE` — `robosats` — Lightning hold-invoice P2P — Privacy-focused P2P exchange system that uses Tor, Lightning hold invoices, fidelity bonds and coordinators to exchange bitcoin for fiat.
- **Hodl Hodl** — `ACTIVE` — `hodl-hodl` — On-chain multisig P2P — P2P Bitcoin trading platform using 2-of-3 on-chain multisig escrow so the platform does not unilaterally control trade bitcoin.
- **Peach Bitcoin** — `ACTIVE` — `peach-bitcoin` — On-chain multisig P2P — Mobile P2P Bitcoin marketplace using multisig escrow and a platform dispute role rather than a centralized custodial exchange wallet.
- **Vexl** — `ACTIVE` — `vexl` — Social-graph P2P coordination — Bitcoin P2P discovery and private messaging app built around friends and friends-of-friends rather than platform escrow.

### Institutional & Derivatives Venues

- **BitMEX** — `ACTIVE` — `bitmex` — Crypto derivatives venue — Bitcoin-centered derivatives exchange launched in 2014 that remains operating on the verification date but has announced a September 23, 2026 closure.
- **CME Bitcoin Futures** — `ACTIVE` — `cme-bitcoin-futures` — Regulated traditional Bitcoin derivatives — CME Group's regulated cash-settled Bitcoin futures complex, a major bridge between Bitcoin price exposure and traditional derivatives markets.

### Historical Exchange Infrastructure

- **itBit (Paxos)** — `INACTIVE` — `itbit-paxos` — Historical institutional OTC desk — Retired New York trust-chartered Bitcoin exchange lineage operated by Paxos, historically important to regulated institutional spot and OTC trading.
- **Mt. Gox** — `INACTIVE` — `mt-gox` — Failed/shuttered centralized exchange — Defunct early Bitcoin exchange that once dominated BTC trading and whose 2014 collapse became a defining custody and market-structure event.
- **BTC-e** — `INACTIVE` — `btc-e` — Failed/shuttered centralized exchange — Defunct Bitcoin exchange that operated from 2011 until U.S.-coordinated law-enforcement action shut it down in 2017.
- **LocalBitcoins** — `INACTIVE` — `localbitcoins` — Closed custodial P2P marketplace — Closed P2P Bitcoin marketplace that matched buyers and sellers worldwide while providing platform-controlled wallet/escrow services.
- **Paxful** — `INACTIVE` — `paxful` — Closed custodial P2P marketplace — P2P Bitcoin marketplace that operated platform wallets and trade escrow before its final wind-down and withdrawal-only state.
- **QuadrigaCX** — `INACTIVE` — `quadrigacx` — Failed/shuttered centralized exchange — Defunct Canadian custodial exchange that collapsed in 2019 and became a major case study in weak internal controls and exchange custody.
- **BitInstant** — `INACTIVE` — `bitinstant` — Early fiat on-ramp — Early U.S. Bitcoin brokerage/on-ramp that helped users convert cash and other payment methods into bitcoin or exchange balances before shutting in 2013.
- **CampBX** — `INACTIVE` — `campbx` — Early fiat on-ramp — Early U.S. BTC/USD exchange launched in 2011 under BulBul Investments, important to the first wave of domestic fiat order books.
- **Genesis Global Trading** — `INACTIVE` — `genesis-global-trading` — Historical institutional OTC desk — Former institutional digital-asset trading and OTC business in the Genesis group, distinct from the separate Genesis Global Capital lending company.

## Status summary

- **ACTIVE:** 26
- **HISTORICAL:** 0
- **INACTIVE:** 9
- **UNCERTAIN:** 0

## Source-confidence summary

- **HIGH:** 33
- **MEDIUM:** 2
- **LOW:** 0

## Core classification decisions

- `Historical Exchange Infrastructure` is a topic, not a lifecycle label. An exchange whose operation actually ceased is `INACTIVE` under the approved Explore lifecycle semantics.
- Bitcoin-focused direct-to-wallet services are labeled brokers/dealers/on-ramps rather than order-book exchanges.
- Centralized exchange custody is explicitly distinguished from separate self-custody wallet products.
- P2P systems are differentiated by actual escrow mechanics: Bisq on-chain multisig/security deposits; RoboSats Lightning hold invoices/coordinator; Hodl Hodl 2-of-3 multisig; Peach seller/Peach multisig; Vexl no platform escrow.
- CME Bitcoin Futures is cash-settled derivatives infrastructure and is not represented as a spot-BTC custodian.
- BitMEX is `ACTIVE` only as of the verification date because its announced closure is in the future.

## Cross-category canonical-home decisions

| Entity | Canonical home | Relationships / decision |
| --- | --- | --- |
| Strike | PAYMENTS | `RELATIONSHIP_ONLY` in EXCHANGES. The approved PAYMENTS registry owns the single canonical Strike profile; retain EXCHANGES, WALLETS and NETWORK roles as relationships. |
| Bull Bitcoin | EXCHANGES | PAYMENTS and WALLETS relationships; direct-to-wallet exchange/payment functions stay in one entity profile. |
| Swan Bitcoin | EXCHANGES | WALLETS relationship for custody/self-custody products. |
| River | EXCHANGES | WALLETS/PAYMENTS/NETWORK features remain relationships. |
| CoinCorner | EXCHANGES | PAYMENTS/WALLETS/NETWORK relationships; Coinfloor lineage consolidated. |
| Cash App Bitcoin | PAYMENTS/WALLETS | Exchange functionality researched but excluded as a duplicate canonical EXCHANGES profile. |
| Coinbase Wallet | WALLETS | Separate self-custody product; do not use it to describe Coinbase.com custody. |
| OKX Wallet | WALLETS | Separate self-custody product; do not use it to describe OKX exchange custody. |

## Company / product consolidation

- Coinbase, Coinbase Advanced, GDAX and Coinbase Pro lineage → one `Coinbase` profile.
- Kraken and Kraken Pro → one `Kraken` profile.
- Coinfloor → acquisition/history relationship under `CoinCorner`.
- Bisq v1 and Bisq 2 → one `Bisq` entity for initial canon; architecture versions remain relationships.
- Gemini Earn → not a duplicate exchange profile; lending-program history stays separate from Gemini exchange custody.
- Genesis Global Capital → not the exchange record; `Genesis Global Trading` is the historical institutional execution entity.

## Important custody distinctions

- **Swan:** current terms say Swan is the technology interface; ordinary trading/custody is performed through authorized third-party custodians.
- **River / Coinbase / Kraken / Binance / OKX / Bybit / Bitstamp / Bitfinex / Gemini / Bitso / Mercado Bitcoin / bitFlyer:** platform balances are custodial until withdrawal; do not describe the exchange account itself as self-custody.
- **Strike (relationship-only):** EXCHANGES research verified custodial BTC buy/sell plus on-chain and Lightning movement, but the approved PAYMENTS registry owns the single canonical profile; retain those findings only as relationship context here.
- **Bull Bitcoin / Bitcoin Well / Relai / Pocket:** direct-to-wallet models reduce or avoid an ongoing exchange-custody balance, but execution/payment counterparties still exist.
- **Bisq:** on-chain multisig/security-deposit and dispute system; fiat still settles between peers.
- **RoboSats:** Lightning hold-invoice escrow; coordinator can settle/cancel and has a real trust/dispute role.
- **Hodl Hodl:** 2-of-3 multisig with seller, buyer and Hodl Hodl key roles.
- **Peach:** current design uses seller/Peach multisig and a platform dispute/timeout role; not the same key model as Hodl Hodl.
- **Vexl:** no platform escrow; it is discovery/chat coordination, so settlement/counterparty risk stays with users.

## Regulatory / legal cautions

- Never write an exchange is simply 'regulated' without naming the entity, jurisdiction and type of authorization/registration.
- Binance's 2023 U.S. corporate resolution and CZ's separate guilty plea are dated legal facts; they do not define every Binance legal entity today.
- Bitstamp's MiCA authorization applies through a specified European entity; Robinhood ownership dates from the June 2025 acquisition close.
- Gemini's New York trust-charter history is distinct from the later Gemini Earn lending-program dispute.
- Peach and Bull Bitcoin require a fresh EU/EEA/MiCA check before public copy because 2026 legal positioning changed during the research window.
- QuadrigaCX fraud conclusions in this registry are attributed to Ontario Securities Commission Staff's investigative report, not described as a court judgment.

## Records not ready for unqualified public copy

| Entity | Caution |
| --- | --- |
| BitMEX | ACTIVE only as of 2026-08-15. First-party closure is scheduled for 2026-09-23 04:00 UTC; lifecycle must be rechecked after closure or earlier operational change. |
| Peach Bitcoin | 2026 EU/EEA legal/availability posture is time-sensitive. Public copy must use a current dated source and avoid broad 'available across Europe' language. |
| Bull Bitcoin | European/MiCA entity status changed during 2026; current regulator/entity details must be rechecked immediately before publication. |
| BTCC | Current operation and 2011 brand origin are clear, but exact corporate/ownership continuity from BTC China to the current BTCC entity is not sufficiently clean for unqualified corporate-history copy. |
| CampBX | Early launch/operation are sourced; exact closure date remains unresolved. Do not publish a precise closure date without stronger archival evidence. |
| Pocket Bitcoin | Current product/custody model is verified, but individual founder attribution was not sufficiently re-verified from current first-party material. |

## Deliberate exclusions / consolidation

| Candidate | Decision | Reason |
| --- | --- | --- |
| Crypto.com | EXCLUDE_FOR_NOW | Large multiasset platform, but no sufficiently distinct Bitcoin-specific historical, technical or market-structure role beyond scale; including it would move the canon toward a generic exchange directory. |
| Gate.io | EXCLUDE_FOR_NOW | Durable multiasset exchange, but Bitcoin-specific significance is not distinct enough from the centralized-exchange coverage already included. |
| MEXC | EXCLUDE_FOR_NOW | Current BTC markets alone do not justify a canonical Bitcoin-exchange profile; no unique Bitcoin-specific infrastructure role was established. |
| NDAX | EXCLUDE_FOR_NOW | Credible Canadian exchange, but its distinct Bitcoin significance is weaker than the covered Canadian Bitcoin-focused/on-ramp and global order-book profiles. |
| Cash App Bitcoin | RELATIONSHIP_ONLY | Bitcoin buy/sell is material, but Cash App's canonical identity is a payments/wallet product. Keep its exchange functionality relational to PAYMENTS/WALLETS unless Command Center changes canonical-home policy. |
| Strike | RELATIONSHIP_ONLY | Canonical home is PAYMENTS (`MSC-EXP-PAY-003`). The approved PAYMENTS registry owns the single Strike profile; EXCHANGES retains only exchange/brokerage, custodial and Lightning relationship context. |
| Fold | EXCLUDE_FOR_NOW | Rewards/payments identity is primary; exchange/brokerage functionality is not sufficiently material for EXCHANGES canonical home. |
| Haveno | EXCLUDE_FOR_NOW | Monero-first exchange system; BTC pairing does not make Bitcoin the primary ecosystem role. |
| AgoraDesk / LocalMonero | EXCLUDE_FOR_NOW | Monero-first lineage and largely redundant for Bitcoin P2P history once LocalBitcoins, Bisq, Hodl Hodl, RoboSats, Peach and Vexl are covered. |
| VirWoX | EXCLUDE_FOR_NOW | Historically enabled indirect BTC acquisition through virtual-world currency, but its unique contribution is less central than stronger early fiat-on-ramp profiles. |
| FTX | EXCLUDE_FOR_NOW | Historically important crypto failure, but Bitcoin was not distinctive enough to justify adding a generic multiasset scandal/failure profile to a Bitcoin-centered canon. |
| Bittrex | EXCLUDE_FOR_NOW | Important multiasset exchange history, but no unique Bitcoin-specific role sufficient to outweigh directory-padding risk. |
| Coinfloor | RELATIONSHIP_ONLY | Acquired by CoinCorner in 2021; represented as CoinCorner lineage rather than a duplicate canonical profile. |
| Coinbase Advanced / GDAX / Coinbase Pro | CONSOLIDATE | Trading-interface and product lineage under the canonical Coinbase entity. |
| Kraken Pro | CONSOLIDATE | Trading interface under the canonical Kraken entity. |
| Binance.US | EXCLUDE_SEPARATE_PROFILE | Separate U.S. affiliate/legal structure should not be conflated with Binance.com, but does not need a second initial-canon profile; keep the distinction in Binance notes. |
| Genesis Global Capital | OUT_OF_SCOPE | Lending business, not the exchange/OTC entity. The canonical historical exchange record is Genesis Global Trading. |

## Final research judgment

The 35-record inventory covers Bitcoin-first brokers, durable global/regional centralized exchanges, meaningfully different P2P architectures, institutional/derivatives infrastructure, and historically important failures/on-ramps. It intentionally omits large multiasset venues whose inclusion case is only scale or a BTC listing.

Approval recommendation: **APPROVE AS EXCHANGES REFERENCE REGISTRY**, with the review-queue cautions preserved and BitMEX lifecycle rechecked after its announced September 2026 closure.
