# MSC Explore — NETWORK Research Registry

**Status:** COMMAND CENTER REVIEW  
**Verified:** 2026-08-15  
**Reference schema:** Ordinals QA HEAD `1f4368bdebc572de5aaed6df221460516295c54a`

## Scope

NETWORK explains selected software and infrastructure that make Bitcoin and Lightning operable, observable, and extensible. It is not a generic node, BIP, library, explorer, or developer-tools directory. The manifest plus nine record shards are the canonical machine-readable source. This package does not publish pages, modify Atlas/Shopify/runtime code, or authorize a merge.

## Topic architecture

1. **Bitcoin Node Implementations** — Full-node implementations; Lightweight validating clients; Historical full-node implementations.
2. **Lightning Network & Implementations** — Protocol & specifications; Lightning node implementations; Lightning libraries & SDKs; Hosted node infrastructure.
3. **Explorers & Network Observability** — Mempool & block explorers; Node network measurement; Self-hosted RPC explorers; Lightning network observability; Ecosystem metrics dashboards.
4. **Indexing & Backend Infrastructure** — Electrum servers & indexers; Compact-filter light clients.
5. **Node Management & Self-Hosted Infrastructure** — Personal node/server platforms; Lightning node-management interfaces.
6. **Protocol Libraries & Developer Infrastructure** — Bitcoin protocol libraries; Cryptographic libraries.
7. **Relay & Transport Infrastructure** — P2P transport protocols; Low-latency block relay; Historical low-latency relay.

## Canonical inventory

| ID | Entity | Topic | Subtopic | Status | Confidence |
|---|---|---|---|---|---|
| MSC-EXP-NET-001 | Bitcoin Core | Bitcoin Node Implementations | Full-node implementations | ACTIVE | HIGH |
| MSC-EXP-NET-002 | Bitcoin Knots | Bitcoin Node Implementations | Full-node implementations | ACTIVE | HIGH |
| MSC-EXP-NET-003 | btcd | Bitcoin Node Implementations | Full-node implementations | ACTIVE | HIGH |
| MSC-EXP-NET-004 | Floresta | Bitcoin Node Implementations | Lightweight validating clients | ACTIVE | HIGH |
| MSC-EXP-NET-005 | bcoin | Bitcoin Node Implementations | Historical full-node implementations | HISTORICAL | MEDIUM |
| MSC-EXP-NET-006 | Lightning Network & BOLT Specifications | Lightning Network & Implementations | Protocol & specifications | ACTIVE | HIGH |
| MSC-EXP-NET-007 | LND | Lightning Network & Implementations | Lightning node implementations | ACTIVE | HIGH |
| MSC-EXP-NET-008 | Core Lightning | Lightning Network & Implementations | Lightning node implementations | ACTIVE | HIGH |
| MSC-EXP-NET-009 | Eclair | Lightning Network & Implementations | Lightning node implementations | ACTIVE | HIGH |
| MSC-EXP-NET-010 | Lightning Dev Kit (LDK) | Lightning Network & Implementations | Lightning libraries & SDKs | ACTIVE | HIGH |
| MSC-EXP-NET-011 | Greenlight | Lightning Network & Implementations | Hosted node infrastructure | ACTIVE | HIGH |
| MSC-EXP-NET-012 | mempool.space | Explorers & Network Observability | Mempool & block explorers | ACTIVE | HIGH |
| MSC-EXP-NET-013 | Esplora / Blockstream Explorer | Explorers & Network Observability | Mempool & block explorers | ACTIVE | HIGH |
| MSC-EXP-NET-014 | Bitnodes | Explorers & Network Observability | Node network measurement | ACTIVE | HIGH |
| MSC-EXP-NET-015 | BTC RPC Explorer | Explorers & Network Observability | Self-hosted RPC explorers | ACTIVE | HIGH |
| MSC-EXP-NET-016 | Amboss | Explorers & Network Observability | Lightning network observability | ACTIVE | HIGH |
| MSC-EXP-NET-017 | 1ML | Explorers & Network Observability | Lightning network observability | ACTIVE | MEDIUM |
| MSC-EXP-NET-018 | Clark Moody Bitcoin Dashboard | Explorers & Network Observability | Ecosystem metrics dashboards | ACTIVE | MEDIUM |
| MSC-EXP-NET-019 | electrs | Indexing & Backend Infrastructure | Electrum servers & indexers | ACTIVE | HIGH |
| MSC-EXP-NET-020 | ElectrumX | Indexing & Backend Infrastructure | Electrum servers & indexers | ACTIVE | HIGH |
| MSC-EXP-NET-021 | Fulcrum | Indexing & Backend Infrastructure | Electrum servers & indexers | ACTIVE | HIGH |
| MSC-EXP-NET-022 | Neutrino | Indexing & Backend Infrastructure | Compact-filter light clients | ACTIVE | HIGH |
| MSC-EXP-NET-023 | Umbrel | Node Management & Self-Hosted Infrastructure | Personal node/server platforms | ACTIVE | HIGH |
| MSC-EXP-NET-024 | Start9 / StartOS | Node Management & Self-Hosted Infrastructure | Personal node/server platforms | ACTIVE | HIGH |
| MSC-EXP-NET-025 | RaspiBlitz | Node Management & Self-Hosted Infrastructure | Personal node/server platforms | ACTIVE | HIGH |
| MSC-EXP-NET-026 | myNode | Node Management & Self-Hosted Infrastructure | Personal node/server platforms | ACTIVE | HIGH |
| MSC-EXP-NET-027 | Ride The Lightning (RTL) | Node Management & Self-Hosted Infrastructure | Lightning node-management interfaces | ACTIVE | HIGH |
| MSC-EXP-NET-028 | LNDg | Node Management & Self-Hosted Infrastructure | Lightning node-management interfaces | ACTIVE | HIGH |
| MSC-EXP-NET-029 | rust-bitcoin | Protocol Libraries & Developer Infrastructure | Bitcoin protocol libraries | ACTIVE | HIGH |
| MSC-EXP-NET-030 | libsecp256k1 | Protocol Libraries & Developer Infrastructure | Cryptographic libraries | ACTIVE | HIGH |
| MSC-EXP-NET-031 | Libbitcoin | Protocol Libraries & Developer Infrastructure | Bitcoin protocol libraries | ACTIVE | HIGH |
| MSC-EXP-NET-032 | bitcoinj | Protocol Libraries & Developer Infrastructure | Bitcoin protocol libraries | ACTIVE | HIGH |
| MSC-EXP-NET-033 | BIP 324 v2 P2P Transport | Relay & Transport Infrastructure | P2P transport protocols | ACTIVE | HIGH |
| MSC-EXP-NET-034 | FIBRE | Relay & Transport Infrastructure | Low-latency block relay | ACTIVE | HIGH |
| MSC-EXP-NET-035 | Bitcoin Relay Network | Relay & Transport Infrastructure | Historical low-latency relay | HISTORICAL | HIGH |

**Counts:** 35 total. ACTIVE 33; HISTORICAL 2; INACTIVE 0; UNCERTAIN 0. HIGH 32; MEDIUM 3; LOW 0.

## Technical decisions Command Center should preserve

### Bitcoin protocol, implementations, consensus and policy

Bitcoin Core is a dominant/reference implementation, not “Bitcoin” itself. Its record separates validation/consensus behavior from standardness, mempool policy, relay policy, wallet behavior, RPC, and mining interfaces. Bitcoin Core wallet remains WALLETS. Bitcoin Knots is a Core-derived node implementation whose policy/default differences do not by themselves imply a different Bitcoin consensus protocol.

Full validating nodes independently verify received data against the rules implemented by their software. Avoid simple “nodes vote,” “miners decide the rules,” or similar governance metaphors.

### Lightning protocol vs implementations

`Lightning Network & BOLT Specifications` is the protocol/network profile. LND, Core Lightning, Eclair and LDK are distinct implementation/library profiles. Greenlight remains separate because hosted Core Lightning operation has materially different operational/trust boundaries. Lightning is a payment-channel network anchored to Bitcoin; it is not a blockchain. Wallets and payment processors remain WALLETS/PAYMENTS.

Rapidly changing Lightning features must be reverified by implementation/version before publication. A BOLT, merged feature, optional implementation support, default behavior and broad deployment are different maturity states.

### Explorer, indexer and metric boundaries

Explorer labels, address views, fee estimates, mempool projections, node geolocation, rankings and transaction classifications are application/indexer interpretations, not Bitcoin consensus state. Bitnodes measures reachable/discoverable peers under its crawler methodology rather than the exact total number of Bitcoin nodes. Public Lightning graph/channel/capacity data excludes private channels and is not total Lightning liquidity or economic activity.

### Node platforms and management layers

Umbrel, Start9/StartOS, RaspiBlitz and myNode package upstream node software; they do not define Bitcoin consensus. RTL and LNDg are included because they are active node-management systems deliberately excluded from WALLETS, not because payment controls make them wallets.

### Protocol maturity / relay

BIP324 is included as a deployed transport specification, but deployed specification status does not mean universal peer adoption. Its encryption is opportunistic and does not itself authenticate peer identity. FIBRE is specialized low-latency relay infrastructure, not a replacement for Bitcoin P2P. Bitcoin Relay Network is retained as its finite HISTORICAL predecessor.

## Cross-category ownership

- Bitcoin Core node/reference implementation → NETWORK; Bitcoin Core wallet → WALLETS.
- Bitcoin Knots → NETWORK; its wallet capability is not a second profile.
- Lightning Network/BOLTs and core implementations → NETWORK; Lightning wallets/processors → WALLETS/PAYMENTS.
- BTCPay Server → PAYMENTS.
- ZEUS, Phoenix, Blixt → WALLETS.
- Stratum V1, Stratum V2, getblocktemplate, BetterHash, DATUM, P2Pool, Braidpool → MINING.
- ord / asset indexers → ORDINALS/RUNES.
- BDK and Breez SDK remain relationship-only rather than duplicate NETWORK canon.

## Consolidation decisions

- Esplora + Blockstream Explorer + blockstream.info → one `Esplora / Blockstream Explorer` profile.
- Amboss Space + Magma + analytics/liquidity surfaces → one Amboss profile.
- LDK Node/Server/bindings → one LDK profile.
- Umbrel → one platform profile; Start9/StartOS → one platform profile.
- Libbitcoin toolkit/server lineage → one Libbitcoin profile.
- Floresta + Utreexo relationship → one Floresta profile plus relation.
- Greenlight stays separate from Core Lightning because hosted operation is materially distinct.
- FIBRE and Bitcoin Relay Network remain separate because their technology/lifecycle is distinct.

## Important researched exclusions

- **Bitcoin ABC** — excluded: fork-chain software, not current Bitcoin node canon.
- **Bitcoin Unlimited** — excluded for now: historical relevance does not outweigh fork-chain scope ambiguity.
- **rust-miniscript** — relation-only under rust-bitcoin; avoid dependency-directory padding.
- **Bitcoin Optech** — excluded: education/development coordination, not network software.
- **Bitcoin Inquisition** — excluded for now: specialized testing infrastructure is narrower than initial canon.
- **BIP152 / BIP157-158 / AssumeUTXO** — consolidated under implementations/backends rather than one profile per BIP/feature.
- **Erlay/BIP330 / Utreexo** — relation-only; proposal/implementation/deployment maturity must remain explicit.
- **Tor / I2P** — external-network relationships, not Bitcoin-specific canonical entities.
- **Lightning Terminal / ThunderHub** — excluded for now; RTL/LNDg provide sufficient node-management archetypes.
- **Citadel / RoninDojo / Nodl** — excluded for now; weaker current/unique evidence than selected node platforms.
- **Blockchain.com Explorer / Blockchair** — excluded for now to avoid hosted-explorer directory padding.

## Records requiring qualified public copy

- **bcoin** — HISTORICAL/MEDIUM; do not infer active maintenance from a reachable site or unarchived repo.
- **1ML** — ACTIVE/MEDIUM; public operation is visible, but operator/development provenance is sparse.
- **Clark Moody Bitcoin Dashboard** — ACTIVE/MEDIUM; individual metrics have heterogeneous upstream methodologies.
- **Floresta** — active client, but Utreexo-related BIPs/deployment remain work in progress.
- **Bitnodes / Amboss / 1ML** — all numerical network statistics must be freshly dated and methodology-qualified.
- **Bitcoin Core / Bitcoin Knots** — current policy/release specifics are time-sensitive.
- **Lightning implementations** — feature support changes by version/configuration.
- **BIP324 / FIBRE** — adoption/operator/current-deployment claims must remain dated and bounded.

## Approval recommendation

Recommend **Command Center approval of the NETWORK research registry**. It is structurally complete, follows the approved 24-field schema, has explicit lifecycle/evidence handling, preserves cross-category ownership, and avoids generic directory padding. Approval should be research-registry approval only; do not merge, publish, route, or connect records to the live Explore interface yet.
