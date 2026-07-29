---
registry_id: MSC-HUB-BUILDING
status: EDITORIAL_REVIEW
page_role: category-hub
h1: Building on Bitcoin
handle: learn-building-on-bitcoin
category: Building on Bitcoin
subcategory: All four approved subcategories
production_batch: "Phase 1.04: hub skeleton; finalize after Phase 13"
author_display: Mempool Surf Club Editorial
reviewed_date: null
copy_locked_date: null
---

# Building on Bitcoin

## 1. Introductory deck

Building on Bitcoin covers systems that use Bitcoin transactions, scripts, settlement, data, or software without becoming interchangeable with Bitcoin itself. This hub organizes sixteen guides across Layer 2, Digital Assets, Development, and Innovation so readers can identify what Bitcoin validates, what additional components do, and which trust, custody, data, and maturity assumptions remain outside Bitcoin consensus.

## 2. Full destination copy

### A category of architectural relationships

"Built on Bitcoin" is a useful starting phrase, but it is not a complete technical description. A Lightning channel, an Ark implementation, an RGB contract, a sidechain, an inscription index, a wallet library, a hosted API, and a proposed opcode can all have a relationship to Bitcoin. They do not share one architecture, one custody model, one data model, or one security boundary.

The first task is to identify the relationship. Some systems lock bitcoin in outputs whose spending conditions support an off-chain protocol. Some publish commitments or content in ordinary Bitcoin transactions while separate software interprets additional meaning. Some provide tools for constructing, signing, retrieving, or indexing Bitcoin data. Others are research designs or consensus proposals that may not be deployed at all.

This category therefore does not use proximity to Bitcoin as a substitute for analysis. Bitcoin consensus establishes whether Bitcoin blocks and transactions satisfy active rules. It does not automatically validate every balance, contract state, bridge ledger, oracle report, service response, or project claim built around those transactions.

### Four subcategories, four questions

Layer 2 asks how systems move activity away from ordinary on-chain transaction flow while still using Bitcoin for defined settlement or enforcement. The guides cover Lightning, Ark, RGB, and sidechains, but the shared label does not make their properties identical. Payment channels, operator-coordinated virtual outputs, client-side validation, and separate chains involve different forms of liquidity, liveness, custody, data retention, and exit behavior.

Digital Assets asks how additional identities, content, and fungible state are interpreted from Bitcoin transaction data. Ordinals, Runes, BRC-20, and inscriptions all use valid Bitcoin transactions, yet their application rules are not native bitcoin balances or Bitcoin consensus objects. Indexers, parsers, version rules, event ordering, and wallet behavior determine much of the state readers see.

Development asks how software connects to Bitcoin. Nodes, wallet integrations, APIs, and indexers serve different roles. A library can serialize a transaction without validating the chain. A hosted API can return useful data while introducing privacy and availability dependencies. An indexer can build accurate address or application views while remaining outside consensus. Clear system design keeps validation, retrieval, construction, signing, application logic, and service operation separate.

Innovation asks how to evaluate evolving techniques and proposals. BitVM, Discreet Log Contracts, OP_CAT, and emerging protocols range from application designs to research systems and proposed consensus changes. Papers, specifications, code, test environments, audits, and production deployments are different forms of evidence. Their dates, versions, networks, and remaining uncertainties must be stated.

### Evaluate what settles and who can act

A system may say it settles on Bitcoin, but readers should ask what settlement means in that design. Which Bitcoin UTXO is created or spent? Which party can authorize the spend? Does the user hold a unilateral exit path, or must an operator, federation, counterparty, or committee cooperate? Is a represented asset native bitcoin, a claim on bitcoin, or an application-defined token?

Custody should be mapped through keys and scripts rather than labels. "Non-custodial" can describe one part of a system while an operator still controls timing, liquidity, data, or service availability. "Trust-minimized" is comparative, not absolute. A sidechain federation, bridge functionary set, Ark operator, Lightning counterparty, external signer, or hosted wallet service should be named with the powers it holds and the failures it can cause.

Settlement also has time and policy dimensions. A transaction can be constructed, signed, submitted, accepted by one node's mempool, relayed, confirmed, or later disconnected by a reorganization. Those are separate states. Time-sensitive protocols must also account for fees, replacement behavior, relay policy, confirmation uncertainty, and participant liveness.

### Verify state, data, and availability

Many systems maintain state that ordinary Bitcoin nodes do not. An Ord indexer assigns ordinal identities. A Runes indexer derives protocol balances. A BRC-20 implementation applies its own parsing and historical rules. RGB participants validate client-side contract histories. A wallet database tracks scripts and UTXOs relevant to one wallet. An API may combine node data, cached values, estimates, labels, and application records.

For each state claim, identify the source data, ordering rules, software version, and rollback process. Ask whether two compatible Bitcoin applications can disagree while accepting the same Bitcoin chain. If they can, the disputed field is not Bitcoin consensus state.

Data availability is equally important. A proof or commitment may be present on Bitcoin while the information needed to verify, challenge, reconstruct, or exit is stored elsewhere. Client-side systems may require recipients to retain consignments. Bridges and optimistic protocols may require challengers to obtain external data before deadlines. Indexers may require historical blocks to rebuild. Hosted APIs may become unavailable or return stale results. A credible design explains who supplies required data, how long it is retained, and what users can recover independently.

### Separate protocols, implementations, and services

A specification describes rules or message formats. An implementation turns some version of those rules into software. A service operates software under its own configuration, authentication, availability, and logging policies. Market adoption describes use. None of these categories proves the others.

The distinction matters throughout this hub. Lightning is a protocol family implemented by several projects with different interfaces and feature support. Ark research and Arkade software should be named by artifact and version. RGB protocol components and wallet integrations can mature at different rates. DLC specifications can remain work in progress while libraries and applications exist. An OP_CAT BIP can be Complete under the BIP process without being Deployed on mainnet.

Hosted services add another boundary. A provider may run a node, wallet, indexer, explorer, bridge, or routing service and expose an API. That can reduce operational work, but it also introduces provider authentication, rate limits, privacy leakage, maintenance choices, and failure behavior. Wallet integration does not by itself establish custody, and API access does not establish independent validation.

### Use dated maturity evidence

Maturity is not a permanent label. A project can move from paper to prototype, release candidate, public test, audit, tagged release, and production operation, but those stages do not always occur in a single order. A default branch can contain unreleased behavior. A public transaction can demonstrate execution without establishing production safety. An audit can cover selected code without covering economics, operations, bridge accounting, key ceremonies, data availability, or later commits.

This package was checked against current primary sources on July 28, 2026 where maturity or deployment language could change. Future publication still requires renewal. Readers should prefer exact versions, commits, networks, warnings, and release notes over undated claims such as "live," "secure," "decentralized," or "battle-tested."

Technical possibility should remain separate from production maturity. Adoption should remain separate from correctness. Novelty should remain separate from value, safety, decentralization, or permanence. Inclusion in this category is an editorial decision to explain a system, not an endorsement.

### A practical evaluation sequence

Start by naming the artifact: protocol, BIP, paper, software release, hosted service, bridge instance, or test deployment. Then identify the enforcement point for each important rule. State what Bitcoin nodes validate and what a wallet, indexer, operator, oracle, federation, sequencer, or external system decides.

Next map custody, liquidity, and exits. Record which keys control bitcoin, who provides liquidity, which parties must remain online, and which unilateral or threshold recovery paths exist. Include deadlines, fees, and the data needed to use those paths.

Then map verification and state. Identify the validating node, parser, indexer, oracle, external chain, proof system, and database. Separate confirmed on-chain facts from mempool observations, client-side state, cached responses, and application balances.

Finally examine maturity and operations. Check releases, tests, interoperability, audits, incidents, upgrade authority, version pinning, and recovery procedures. State uncertainty where evidence is incomplete. The goal is not to declare every experiment safe or unsafe. It is to make the system legible.

### Connections to other Learn destinations

The Bitcoin Network category explains the base system: mining, nodes, mempools, blocks, proof of work, consensus, soft forks, and upgrades. This hub assumes those foundations and focuses on the additional systems that use them. It does not repeat the network category's complete explanation of how Bitcoin validates and orders transactions.

The Bitcoin Development category goes deeper into Bitcoin Core, protocol specifications, Script, Taproot, SegWit, cryptography, RPC, testing, and infrastructure. This hub introduces development tools and integration boundaries in the context of systems built around Bitcoin, but it does not replace the deeper implementation and protocol work planned for that category.

The canonical category order follows the sixteen guides listed here: Layer 2, Digital Assets, Development, then Innovation. The planned `MSC-PATH-BUILD | Build on Bitcoin` route is a curated cross-category sequence and may choose a different order based on prerequisites or learning goals. The path does not replace, own, or redefine canonical category navigation.

All cards, anchor intents, and related relationships in this editorial package remain inactive. A registry handle or planned content path is not proof that a public page or URL exists. Publication, implementation, and link activation require separate verified work.

## 3. Destination structure or sequence

Readers will have three planned ways to use this hub:

1. Follow all sixteen guides in canonical category order, beginning with Layer 2 and continuing through Digital Assets, Development, and Innovation.
2. Enter Layer 2, Digital Assets, Development, or Innovation according to the current question, while keeping each subcategory's distinct architecture and trust boundaries visible.
3. Follow `MSC-PATH-BUILD | Build on Bitcoin` as a curated cross-category route that may reorder material around prerequisites and learning goals.

The learning path does not replace, own, or redefine canonical category navigation. All routes and anchor intents remain editorial planning until publication and URL confirmation.

## 4. Card or step copy

### Subcategory: Layer 2

- Planned anchor intent: `#layer-2`
- Anchor status: Editorial intent only. Do not activate until implementation confirms the real published destination structure.

#### MSC-GUIDE-033 | How the Lightning Network Works

- Registry ID: MSC-GUIDE-033
- Approved H1: How the Lightning Network Works
- Card description: Follow Lightning from channel funding and commitment states through HTLC routing, revocation, liquidity, fees, watch requirements, implementation differences, and Bitcoin-enforced channel closure.
- Depth: Shallow
- Format: Explainer
- Estimated reading time: 14 to 17 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-034 | What Is Ark on Bitcoin?

- Registry ID: MSC-GUIDE-034
- Approved H1: What Is Ark on Bitcoin?
- Card description: Examine Ark and current Arkade architecture through VTXOs, operator-coordinated rounds, liquidity, expiry, unilateral exits, data retention, preconfirmation, and the project's alpha maturity.
- Depth: Deep
- Format: Technical Analysis
- Estimated reading time: 20 to 24 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-035 | How RGB Works on Bitcoin

- Registry ID: MSC-GUIDE-035
- Approved H1: How RGB Works on Bitcoin
- Card description: Learn how RGB uses single-use seals, Bitcoin commitments, consignments, client-side validation, contract schemas, wallet integration, and versioned software without making RGB state part of Bitcoin consensus.
- Depth: Deep
- Format: Technical Analysis
- Estimated reading time: 16 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-036 | Bitcoin Sidechains Explained

- Registry ID: MSC-GUIDE-036
- Approved H1: Bitcoin Sidechains Explained
- Card description: Compare separate-chain security, two-way peg designs, federation and functionary control, merged-mining relationships, bridge exits, and proposal status across major sidechain models.
- Depth: Deep
- Format: Comparison
- Estimated reading time: 15 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Subcategory: Digital Assets

- Planned anchor intent: `#digital-assets`
- Anchor status: Editorial intent only. Do not activate until implementation confirms the real published destination structure.

#### MSC-GUIDE-037 | What Are Bitcoin Ordinals?

- Registry ID: MSC-GUIDE-037
- Approved H1: What Are Bitcoin Ordinals?
- Card description: Separate Bitcoin's transaction and satoshi data from ordinal numbering, rarity conventions, indexer state, wallet handling, transfers, reorganization behavior, and current ord implementation rules.
- Depth: Deep
- Format: Technical Analysis
- Estimated reading time: 16 to 19 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-038 | How the Runes Protocol Works

- Registry ID: MSC-GUIDE-038
- Approved H1: How the Runes Protocol Works
- Card description: Trace Runes through runestones, etching, minting, edicts, cenotaph handling, balances, burns, ordering, and indexer interpretation while keeping native bitcoin and application-defined assets distinct.
- Depth: Deep
- Format: Technical Analysis
- Estimated reading time: 17 to 20 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-039 | What Is BRC-20 on Bitcoin?

- Registry ID: MSC-GUIDE-039
- Approved H1: What Is BRC-20 on Bitcoin?
- Card description: Understand BRC-20 as an experimental inscription and indexer convention, including deploy, mint, transfer, balance reconstruction, historical rule differences, and implementation divergence.
- Depth: Deep
- Format: Technical Analysis
- Estimated reading time: 16 to 19 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-040 | What Is a Bitcoin Inscription?

- Registry ID: MSC-GUIDE-040
- Approved H1: What Is a Bitcoin Inscription?
- Card description: Follow inscription data through Taproot witness envelopes, commit and reveal transactions, content parsing, fees, pruning, indexers, wallet controls, provenance, and limits on permanence.
- Depth: Deep
- Format: Technical Analysis
- Estimated reading time: 15 to 18 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Subcategory: Development

- Planned anchor intent: `#development`
- Anchor status: Editorial intent only. Do not activate until implementation confirms the real published destination structure.

#### MSC-GUIDE-041 | Bitcoin Developer Tools: A Practical Overview

- Registry ID: MSC-GUIDE-041
- Approved H1: Bitcoin Developer Tools: A Practical Overview
- Card description: Map a Bitcoin development stack across validating nodes, interfaces, test networks, libraries, descriptors, PSBTs, hardware signers, wallets, indexers, testing, and dependency review.
- Depth: Deep
- Format: Technical Analysis
- Estimated reading time: 19 to 23 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-042 | How Bitcoin Wallet Integrations Work

- Registry ID: MSC-GUIDE-042
- Approved H1: How Bitcoin Wallet Integrations Work
- Card description: Design wallet integrations across custody, descriptors, synchronization, UTXO tracking, transaction construction, external signing, broadcast, confirmation, rollback, recovery, authorization, and privacy.
- Depth: Deep
- Format: Technical Analysis
- Estimated reading time: 21 to 25 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-043 | Bitcoin APIs Explained

- Registry ID: MSC-GUIDE-043
- Approved H1: Bitcoin APIs Explained
- Card description: Compare Bitcoin Core RPC, REST, ZMQ, P2P, Electrum, Esplora, Lightning, and hosted interfaces through authentication, units, source evidence, retries, caching, privacy, and reorganization handling.
- Depth: Deep
- Format: Technical Analysis
- Estimated reading time: 19 to 23 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-044 | How Bitcoin Indexers Work

- Registry ID: MSC-GUIDE-044
- Approved H1: How Bitcoin Indexers Work
- Card description: Separate chainstate and optional Bitcoin Core indexes from external address, script, wallet, explorer, and application indexes, then examine rollbacks, rebuilds, pruning, consistency, and privacy.
- Depth: Deep
- Format: Technical Analysis
- Estimated reading time: 21 to 25 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Subcategory: Innovation

- Planned anchor intent: `#innovation`
- Anchor status: Editorial intent only. Do not activate until implementation confirms the real published destination structure.

#### MSC-GUIDE-045 | What Is BitVM?

- Registry ID: MSC-GUIDE-045
- Approved H1: What Is BitVM?
- Card description: Examine BitVM as experimental off-chain computation and Bitcoin dispute verification, including provers, challengers, transaction graphs, bridges, proof systems, data availability, audits, and developer-preview maturity.
- Depth: Deep
- Format: Technical Analysis
- Estimated reading time: 16 to 19 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-046 | How Discreet Log Contracts Work

- Registry ID: MSC-GUIDE-046
- Approved H1: How Discreet Log Contracts Work
- Card description: Follow DLC negotiation through oracle announcements, event descriptors, funding, adaptor signatures, CETs, refunds, multi-oracle assumptions, fee planning, privacy, interoperability, and current implementation limits.
- Depth: Deep
- Format: Technical Analysis
- Estimated reading time: 17 to 20 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-047 | What Is OP_CAT?

- Registry ID: MSC-GUIDE-047
- Approved H1: What Is OP_CAT?
- Card description: Learn the proposed byte-concatenation rule, current legacy and Tapscript behavior, OP_SUCCESS126, BIP 347 status, soft-fork activation boundaries, cited applications, and resource limits.
- Depth: Deep
- Format: Technical Analysis
- Estimated reading time: 16 to 19 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-048 | Emerging Protocols on Bitcoin: How to Evaluate Them

- Registry ID: MSC-GUIDE-048
- Approved H1: Emerging Protocols on Bitcoin: How to Evaluate Them
- Card description: Apply a repeatable framework for classifying artifacts, enforcement, custody, state, data availability, exits, cryptography, economics, code maturity, interoperability, governance, and evidence quality.
- Depth: Deep
- Format: Technical Analysis
- Estimated reading time: 20 to 23 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

## 5. Key Terms

- **Bitcoin consensus:** The active rules validating nodes enforce when accepting Bitcoin transactions and blocks.
- **Policy:** Local implementation rules for mempool acceptance, relay, mining selection, wallet behavior, or operation that are not necessarily consensus rules.
- **Layer 2:** A broad category label for systems that move some activity away from ordinary Bitcoin on-chain flow while retaining a defined relationship to Bitcoin; it does not imply one trust model.
- **Payment channel:** A funded Bitcoin transaction relationship whose participants update off-chain spending states and later settle through a valid channel close.
- **VTXO:** A virtual transaction output tracked by an Ark-style protocol and linked to prearranged Bitcoin transaction paths.
- **Client-side validation:** A model in which recipients validate application state using locally held history and commitments rather than relying on every Bitcoin node to maintain that state.
- **Sidechain:** A separate blockchain connected to Bitcoin through a peg, bridge, or other transfer mechanism.
- **Federation:** A defined group of functionaries or signers that performs threshold-controlled system actions.
- **Bridge:** A system coordinating bitcoin locked on Bitcoin with an asset representation or state transition elsewhere.
- **Inscription:** Application-defined content associated with a Bitcoin transaction witness through Ord parsing conventions.
- **Ordinal theory:** An application numbering and tracking convention for satoshis implemented by Ord-compatible software.
- **Runestone:** An `OP_RETURN` message interpreted by Runes software as protocol instructions.
- **BRC-20:** An experimental inscription and indexer convention for deploy, mint, and transfer operations.
- **Indexer:** Software that derives searchable or application-specific state from ordered Bitcoin data.
- **Derived state:** Data calculated by a wallet, indexer, service, or application rather than enforced directly by Bitcoin consensus.
- **Wallet integration:** A system connecting key control, script discovery, UTXO state, transaction construction, signing, broadcast, monitoring, and recovery.
- **API:** An interface to a node, wallet, indexer, Lightning implementation, provider, or application; its response inherits the producing system's limits.
- **PSBT:** A container for coordinating Bitcoin transaction metadata and partial signatures.
- **Oracle:** A source that signs an encoded external outcome for an application protocol such as a DLC.
- **Data availability:** Access to the information required to verify state, challenge a claim, synchronize, or exit.
- **Unilateral exit:** A settlement or recovery path a participant can exercise without ongoing counterparty cooperation.
- **Optimistic protocol:** A design that normally accepts a claim unless it is successfully challenged within defined rules and time limits.
- **Soft-fork proposal:** A proposed consensus restriction that requires activation before upgraded rules are enforced on mainnet.
- **Application protocol:** Rules implemented above Bitcoin consensus using valid Bitcoin transactions and additional messages, software, or state.

Final Key Terms count: 24

## 6. Sources

1. **MSC Learn Master Registry**
   Author or publisher: Mempool Surf Club Editorial
   Repository path: `docs/learn/MSC_Learn_Master_Registry.json`
   Supports: The Building on Bitcoin category identity, purpose, four-subcategory order, anchor intents, canonical sixteen-guide sequence, destination relationships, depth, format, and production timing.

2. **Learn content manifest**
   Author or publisher: Mempool Surf Club Editorial
   Repository path: `docs/learn/content/content-manifest.json`
   Supports: Permanent content paths, registry identifiers, and editorial statuses. The manifest is editorial planning data and is not runtime or publication evidence.

3. **Copy-locked Layer 2 Guides MSC-GUIDE-033 through MSC-GUIDE-036**
   Author or publisher: Mempool Surf Club Editorial
   Repository path: `docs/learn/content/guides/`
   Supports: Lightning, Ark, RGB, and sidechain definitions; settlement, custody, liveness, liquidity, data, exit, implementation, and maturity boundaries; synchronized card metadata and Key Terms. Current maturity language was renewed against official Bitcoin Core, Arkade, RGB, and implementation sources on July 28, 2026.

4. **Copy-locked Digital Assets Guides MSC-GUIDE-037 through MSC-GUIDE-040**
   Author or publisher: Mempool Surf Club Editorial
   Repository path: `docs/learn/content/guides/`
   Supports: Ordinals, Runes, BRC-20, and inscription parsing; native bitcoin versus application asset distinctions; indexer, ordering, wallet, reorganization, and permanence boundaries; synchronized card metadata and Key Terms. Current ord release status was renewed against the official repository on July 28, 2026.

5. **Copy-locked Development Guides MSC-GUIDE-041 through MSC-GUIDE-044**
   Author or publisher: Mempool Surf Club Editorial
   Repository path: `docs/learn/content/guides/`
   Supports: Developer tools, wallet integrations, APIs, and indexers; consensus versus policy; validation, retrieval, construction, signing, hosted-service, privacy, cache, rollback, and derived-state boundaries; synchronized card metadata and Key Terms. Bitcoin Core 31.1 status was renewed against the official project download and release sources on July 28, 2026.

6. **Copy-locked Innovation Guides MSC-GUIDE-045 through MSC-GUIDE-048**
   Author or publisher: Mempool Surf Club Editorial
   Repository path: `docs/learn/content/guides/`
   Supports: BitVM, DLC, OP_CAT, and emerging-protocol evaluation; paper, specification, implementation, service, test, audit, deployment, and proposal boundaries; synchronized card metadata and Key Terms. Current BitVM warnings, DLC work-in-progress status, and BIP 347 Complete rather than Deployed status were renewed against official primary sources on July 28, 2026.

## 7. SEO title

Building on Bitcoin: Layers, Assets, Tools, and Protocols

## 8. Meta description

Explore 16 guides to Bitcoin layers, digital assets, developer tools, and emerging protocols with clear settlement, custody, verification, and maturity boundaries.

## 9. Page excerpt

Evaluate systems built on or around Bitcoin through 16 guides covering Layer 2 designs, digital assets, development tools, and emerging protocols without confusing application behavior with Bitcoin consensus.

## 10. Estimated reading time

20 minutes for hub orientation and card review

## 11. Planned internal links

Do not activate planned relationships until each destination exists as a real published page with a confirmed URL.

- MSC-PATH-BUILD | Build on Bitcoin
- MSC-PATH-NETWORK | Understand the Network
- MSC-PATH-ECOSYSTEM | Explore the Ecosystem
- MSC-HUB-NETWORK | The Bitcoin Network
- MSC-HUB-DEVELOPMENT | Bitcoin Development
- MSC-GLOSSARY-001 | Bitcoin Glossary

No destination URL is assigned in this editorial package.

## 12. Accuracy review checklist

- [x] Registry and manifest metadata match the authorized source records.
- [x] Layer 2, Digital Assets, Development, and Innovation appear in the approved order.
- [x] The hub contains exactly sixteen guide cards in canonical MSC-GUIDE-033 through MSC-GUIDE-048 order.
- [x] Every card uses source-guide Registry ID, H1, depth, format, subcategory, position, and reading time.
- [x] Every card description is specific to its copy-locked source guide.
- [x] Protocols are separated from implementations.
- [x] Protocols and implementations are separated from hosted services.
- [x] Bitcoin consensus is separated from Bitcoin Core and other implementation policy.
- [x] On-chain settlement is separated from off-chain and client-side state.
- [x] Custody and key control are mapped separately from general architecture labels.
- [x] Bridge, federation, operator, functionary, oracle, and indexer assumptions remain explicit.
- [x] Native bitcoin is separated from tokens, inscriptions, issued assets, and indexing conventions.
- [x] Deployed systems are separated from proposals, research, prototypes, test environments, and incomplete work.
- [x] Maturity and implementation claims were dated and renewed against current primary sources on July 28, 2026.
- [x] No inclusion, adoption, novelty, value, decentralization, or security claim is treated as endorsement.
- [x] Canonical category order remains distinct from the curated Build on Bitcoin path order.
- [x] Planned cards, anchors, relationships, and URLs remain inactive.
- [x] Key Terms remain synchronized with the sixteen copy-locked guides.
- [x] Exactly three complete illustration briefs are included.
- [ ] Human Verification remains pending.
- [ ] Independent editorial review must verify the sixteen cards and current maturity claims before copy-lock.
- [x] No em dash or en dash character appears.

## 13. Human verification

- Reviewer: Pending
- Review date: Pending
- Notes:
  - Human Verification has not yet been completed.
  - The independent editorial review must verify all sixteen cards, source-guide alignment, current maturity claims, technical boundaries, inactive links, and illustration-brief completeness before copy-lock.

## 14. Illustration brief

### Illustration 1

- Concept title: Four Relationships to Bitcoin
- Educational purpose: Show why Layer 2, Digital Assets, Development, and Innovation describe different architectural relationships rather than one inherited security layer.
- Recommended placement: After the section titled Four subcategories, four questions.
- Visual description: Vintage nautical systems chart divided into four connected waters. Layer 2 shows channels, virtual outputs, client-side state, and a sidechain route. Digital Assets shows Bitcoin transaction markers feeding an application index. Development shows a node, wallet, API, and indexer workstation. Innovation shows papers, test buoys, and a proposed rule marker. Bitcoin's validated chain runs along the chart base without placing every system inside it.
- Required labels: Bitcoin consensus, Layer 2, Digital Assets, Development, Innovation, Off-chain state, Client-side state, Indexer, Separate chain, Proposal
- Caption: Systems can use Bitcoin for different functions without sharing one custody, settlement, verification, or maturity model.
- Alt text: Vintage nautical systems chart showing four distinct relationships to Bitcoin across Layer 2, digital assets, development tools, and innovation.
- Image orientation: Landscape
- Mobile crop notes: Stack the four regions in approved order above one persistent Bitcoin consensus baseline.
- Status: PLANNED

### Illustration 2

- Concept title: Trust and Verification Boundary Soundings
- Educational purpose: Help readers identify what Bitcoin validates and which assumptions remain with operators, bridges, oracles, indexers, services, and users.
- Recommended placement: After the section titled A practical evaluation sequence.
- Visual description: Muted ocean-depth cross section with Bitcoin consensus on the seabed. Above it are separate marked zones for UTXO control, off-chain protocol state, indexer-derived state, oracle data, bridge or federation control, hosted services, and external systems. Sounding lines connect each claim to its enforcing component.
- Required labels: Bitcoin validation, UTXO control, Operator, Federation, Bridge, Oracle, Indexer, Hosted service, Data availability, Unilateral exit
- Caption: A credible system map names the component that enforces each rule and the data or cooperation required when the normal path fails.
- Alt text: Layered technical ocean chart separating Bitcoin validation from operator, federation, bridge, oracle, indexer, service, and data-availability assumptions.
- Image orientation: Landscape
- Mobile crop notes: Use vertical bands with Bitcoin validation at the bottom and keep every assumption attached to one enforcing component.
- Status: PLANNED

### Illustration 3

- Concept title: Three Routes Through Building on Bitcoin
- Educational purpose: Explain the difference among canonical sixteen-guide order, focused subcategory entry, and the curated Build on Bitcoin learning path.
- Recommended placement: After the section titled Destination structure or sequence.
- Visual description: Weathered cartographic chart with one departure marker and three planned routes. The canonical route visits sixteen numbered guide markers across four ports. The focused route enters one selected port. The Build on Bitcoin route crosses category boundaries through curated waypoints. A legend states that planned anchors, cards, and destination relationships remain inactive until publication and URL confirmation.
- Required labels: Canonical order, Sixteen guides, Layer 2, Digital Assets, Development, Innovation, Focused entry, Build on Bitcoin, Planned routes only
- Caption: Readers can follow the complete category, enter one subcategory, or use a curated cross-category path without changing canonical ownership.
- Alt text: Nautical navigation chart showing canonical sixteen-guide order, four focused subcategory entries, and the curated Build on Bitcoin path.
- Image orientation: Landscape
- Mobile crop notes: Preserve three clearly labeled vertical routes and show the four subcategory ports as a compact ordered list.
- Status: PLANNED
