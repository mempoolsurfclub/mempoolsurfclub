---
registry_id: MSC-HUB-NETWORK
status: EDITORIAL_REVIEW
page_role: category-hub
h1: The Bitcoin Network
handle: learn-bitcoin-network
category: The Bitcoin Network
subcategory: All four approved subcategories
production_batch: "Phase 1.03: hub skeleton; finalize after Phase 9"
author_display: Mempool Surf Club Editorial
reviewed_date: null
copy_locked_date: null
---

# The Bitcoin Network

## 1. Introductory deck

Learn how Bitcoin transactions, nodes, miners, blocks, proof of work, and consensus operate as connected systems without becoming one server, one company, or one authority. Follow the complete category, enter a focused subcategory, or use a curated Network learning path.

## 2. Full destination copy

Bitcoin becomes easier to understand when its moving parts are separated before they are connected.

A wallet creates and signs transaction data. Nodes receive that data from peers and decide whether it can enter their own local mempools under current rules and policy. Mining systems choose valid transactions they know about, construct candidate blocks, and search for proof of work. Nodes then inspect the complete block for themselves. Among valid competing branches, accumulated proof of work helps nodes select chain history. Consensus is the shared validation rule set that makes compatible results possible across independently operated software.

None of those roles is Bitcoin by itself.

Bitcoin is not one server that stores the official ledger. It is not one company, exchange, mining pool, node, wallet provider, code repository, or group of developers. The network exists through many systems that exchange public data, apply software rules, and make independent operating choices. Their responsibilities overlap in practice, but they should not be collapsed into one authority.

This category begins after Bitcoin Basics. The Basics guides explain bitcoin as an asset, wallets, custody, keys, transactions, UTXOs, confirmations, and safe everyday practices. The Bitcoin Network category moves deeper into the infrastructure that receives transaction data, assembles blocks, produces proof of work, validates history, and coordinates changes to the rules.

The category follows four connected layers.

### Mining

Mining is the proof-of-work process that orders valid transactions into blocks and competes to extend the Bitcoin chain. This layer begins with candidate-block construction rather than with the hashing machine. A mining system needs validated chain context, transaction information, a coinbase transaction, commitments, an 80-byte header, and a target. ASIC hardware performs the repeated header hashing, while pools may coordinate jobs and payouts across many independent devices.

Mining does not give a participant permission to bypass signatures, spend nonexistent outputs, exceed block limits, or claim more bitcoin than the consensus rules permit. A low enough header hash allows a block to be submitted. It does not prove that the complete block is valid.

The Mining sequence separates the full workflow into four questions: how blocks are assembled and hashed, how pools coordinate work, what an ASIC machine actually does, and how mainnet periodically recalculates the required target.

### Nodes

A node is Bitcoin software that communicates with peers and may validate, relay, store, or serve network data. A full node independently verifies blocks and transactions against consensus rules. That independent check is the defining feature. It is separate from archival storage, mining, wallet key management, and accepting inbound peers.

The Nodes sequence begins with the validation role, then examines pruning as a storage choice. It continues into practical operation and finishes with a release-aware comparison of node software. Together, the guides show why a pruned node can still fully validate, why a node needs an operating purpose, and why implementation choice requires attention to both consensus compatibility and local policy.

Running a node gives an operator a direct validation boundary. It does not create one-node-one-vote governance, guarantee privacy, or force another participant to use the same software.

### Network

The Network layer follows transaction and block data as it moves among peers and local systems.

There is no global synchronized mempool. Each node builds its own temporary set of valid unconfirmed transactions from what it receives and the policy it applies. A transaction can be accepted by one node, rejected by another under local policy, or never reach a particular peer. Relay does not guarantee that every node or miner receives a transaction.

Mining systems construct candidate blocks from the valid transactions available to them. Blocks commit to transaction data, link to prior history, and carry proof of work in their headers. Nodes validate received blocks independently. Valid blocks can still compete temporarily, and a node can reorganize when another valid branch accumulates more work.

The blockchain is therefore not every block stored by every node. It is the ordered history of valid Bitcoin blocks selected by accumulated proof of work. Hashrate helps describe the pace of mining computation, but network hashrate is estimated from observed chainwork and time rather than read from one global meter.

### Consensus

Consensus is the shared validation rules independently enforced by Bitcoin nodes. It answers whether transaction and block data are valid under the rules a node runs. Proof of work answers a different question: how valid competing histories are ordered.

Bitcoin reaches practical agreement because compatible nodes evaluate shared public data, reject invalid blocks, and select valid chain history by accumulated work. They do not need identical mempools, peers, wallets, indexes, storage modes, or local policy settings.

Consensus also changes carefully. Soft forks make the accepted set more restrictive for upgraded nodes. Deployment can involve public proposals, BIPs, implementations, testing, releases, adoption, signaling, activation conditions, and enforcement. These stages are related but not interchangeable. A BIP does not activate itself. A repository merge does not update running nodes. Miner signaling is not a universal protocol vote. Companies and developers cannot change every participant's rules by announcement.

The Consensus sequence builds from proof-of-work security into technical consensus, then explains soft-fork compatibility and the history of network upgrades.

### One system, several boundaries

The category is designed to help readers keep several boundaries visible at once:

- A wallet constructs and signs a transaction, but signing does not broadcast or confirm it.
- A node may accept a transaction into its local mempool, but mempool acceptance is not confirmation.
- Peers relay data, but repeated relay does not create validity.
- A miner may select a transaction, but selection is not guaranteed.
- A candidate block may satisfy proof of work, but nodes still validate the complete block.
- Proof of work orders valid branches, but it cannot make an invalid branch acceptable.
- A first confirmation records inclusion in a selected-chain block, but it is not absolute finality.
- A node enforces rules locally, but one node does not command all other participants.

Readers do not need to memorize every implementation detail on the first pass. The goal is to build a reliable systems map. Once the roles are separated, their interactions become easier to follow.

The hub also prepares readers to notice where a statement belongs. Fee estimates belong to local observation and policy. Block validity belongs to consensus checks. Hashrate belongs to a measured or inferred rate. Upgrade support belongs to specific software, operators, and deployment conditions. Naming the layer prevents one dashboard, company statement, or software default from being mistaken for the entire Bitcoin network.

### How to use this hub

There are three planned ways to move through the category.

First, follow the complete category in canonical order. This route begins with mining, moves through node operation and network data, and ends with consensus and upgrades. It is the most complete orientation to the category.

Second, enter the subcategory that matches the current question. Readers investigating mining hardware can begin with Mining. Readers deciding whether to operate a node can begin with Nodes. Readers following a transaction or block can begin with Network. Readers studying rule enforcement and upgrades can begin with Consensus.

Third, use MSC-PATH-NETWORK | Understand the Network for a curated systems-level sequence. That path begins with UTXOs and transaction mechanics before entering mempools, blocks, nodes, mining, proof of work, consensus, and upgrades. Its order supports learning, while each guide keeps its permanent canonical relationships.

All cards and branches in this editorial package are planned relationships only. They must remain inactive until the destination has been published and its URL has been confirmed.

## 3. Destination structure or sequence

### Orientation

The hub introduces the category after Bitcoin Basics and keeps mining, nodes, network behavior, and consensus distinct before showing how they interact.

### How to use this hub

- Follow the complete 16-guide category in canonical order.
- Enter one of the four subcategories based on the current question.
- Follow MSC-PATH-NETWORK | Understand the Network for a curated systems-level route.

### Canonical category sequence

1. MSC-GUIDE-017 | How Bitcoin Mining Works
2. MSC-GUIDE-018 | How Bitcoin Mining Pools Work
3. MSC-GUIDE-019 | What Is an ASIC Miner?
4. MSC-GUIDE-020 | How Bitcoin's Difficulty Adjustment Works
5. MSC-GUIDE-021 | What Is a Bitcoin Full Node?
6. MSC-GUIDE-022 | What Is a Pruned Bitcoin Node?
7. MSC-GUIDE-023 | How to Run a Bitcoin Node
8. MSC-GUIDE-024 | Bitcoin Node Software Explained
9. MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?
10. MSC-GUIDE-026 | How Bitcoin Blocks Work
11. MSC-GUIDE-027 | How the Bitcoin Blockchain Works
12. MSC-GUIDE-028 | What Is Bitcoin Hashrate?
13. MSC-GUIDE-029 | How Bitcoin Proof of Work Secures the Network
14. MSC-GUIDE-030 | How Bitcoin Reaches Consensus
15. MSC-GUIDE-031 | How Bitcoin Soft Forks Work
16. MSC-GUIDE-032 | How Bitcoin Network Upgrades Happen

The sequence above is editorial planning. No card action should be activated until its destination exists as a published page with a confirmed URL.

## 4. Card or step copy

### Subcategory: Mining

- Planned anchor intent: `#mining`
- Anchor status: Editorial intent only. Do not activate until implementation confirms the published destination structure.

#### MSC-GUIDE-017 | How Bitcoin Mining Works

- Registry ID: MSC-GUIDE-017
- Approved H1: How Bitcoin Mining Works
- Card description: See how candidate blocks are assembled, how header hashing searches for proof of work, and why nodes still validate every found block.
- Depth: Shallow
- Format: Explainer
- Estimated reading time: 11 to 13 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-018 | How Bitcoin Mining Pools Work

- Registry ID: MSC-GUIDE-018
- Approved H1: How Bitcoin Mining Pools Work
- Card description: Understand mining jobs, easier share targets, payout methods, template control, and why pool accounting never becomes Bitcoin consensus.
- Depth: Shallow
- Format: Explainer
- Estimated reading time: 11 to 13 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-019 | What Is an ASIC Miner?

- Registry ID: MSC-GUIDE-019
- Approved H1: What Is an ASIC Miner?
- Card description: Learn how specialized hashing chips fit inside complete mining machines with controllers, power, networking, cooling, firmware, and monitoring.
- Depth: Shallow
- Format: Explainer
- Estimated reading time: 10 to 12 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-020 | How Bitcoin's Difficulty Adjustment Works

- Registry ID: MSC-GUIDE-020
- Approved H1: How Bitcoin's Difficulty Adjustment Works
- Card description: Follow the mainnet retarget rule through 2,016-block boundaries, timestamp measurement, clamps, compact targets, and node enforcement.
- Depth: Deep
- Format: Technical Analysis
- Estimated reading time: 14 to 17 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Subcategory: Nodes

- Planned anchor intent: `#nodes`
- Anchor status: Editorial intent only. Do not activate until implementation confirms the published destination structure.

#### MSC-GUIDE-021 | What Is a Bitcoin Full Node?

- Registry ID: MSC-GUIDE-021
- Approved H1: What Is a Bitcoin Full Node?
- Card description: See how a full node checks blocks and transactions independently, maintains chainstate, and separates validation from mining, wallets, relay, and storage.
- Depth: Shallow
- Format: Explainer
- Estimated reading time: 11 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-022 | What Is a Pruned Bitcoin Node?

- Registry ID: MSC-GUIDE-022
- Approved H1: What Is a Pruned Bitcoin Node?
- Card description: Compare pruned and archival operation while keeping the central fact clear: pruning deletes eligible old block files only after full validation.
- Depth: Shallow
- Format: Comparison
- Estimated reading time: 12 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-023 | How to Run a Bitcoin Node

- Registry ID: MSC-GUIDE-023
- Approved H1: How to Run a Bitcoin Node
- Card description: Plan a node around its purpose, software source, storage, peer access, wallet boundary, synchronization, updates, monitoring, and recovery.
- Depth: Shallow
- Format: Walkthrough
- Estimated reading time: 15 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-024 | Bitcoin Node Software Explained

- Registry ID: MSC-GUIDE-024
- Approved H1: Bitcoin Node Software Explained
- Card description: Evaluate node software through consensus compatibility, policy, releases, defaults, interfaces, storage, privacy, migration, and operations rather than branding.
- Depth: Deep
- Format: Comparison
- Estimated reading time: 19 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Subcategory: Network

- Planned anchor intent: `#network`
- Anchor status: Editorial intent only. Do not activate until implementation confirms the published destination structure.

#### MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?

- Registry ID: MSC-GUIDE-025
- Approved H1: What Happens Inside the Bitcoin Mempool?
- Card description: Explore how each node builds its own temporary set of valid unconfirmed transactions through local admission, relay, replacement, eviction, and reorganization handling.
- Depth: Shallow
- Format: Explainer
- Estimated reading time: 10 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-026 | How Bitcoin Blocks Work

- Registry ID: MSC-GUIDE-026
- Approved H1: How Bitcoin Blocks Work
- Card description: Break a block into its header, coinbase transaction, transaction list, Merkle and witness commitments, proof of work, limits, and full node checks.
- Depth: Shallow
- Format: Explainer
- Estimated reading time: 11 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-027 | How the Bitcoin Blockchain Works

- Registry ID: MSC-GUIDE-027
- Approved H1: How the Bitcoin Blockchain Works
- Card description: Learn how hash-linked valid blocks become selected history through accumulated work, local node validation, chainstate updates, confirmations, and reorganizations.
- Depth: Shallow
- Format: Explainer
- Estimated reading time: 10 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-028 | What Is Bitcoin Hashrate?

- Registry ID: MSC-GUIDE-028
- Approved H1: What Is Bitcoin Hashrate?
- Card description: Understand device, pool, and network hashrate measurements, why network hashrate is estimated from chainwork and time, and what the figure cannot prove.
- Depth: Shallow
- Format: Explainer
- Estimated reading time: 11 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Subcategory: Consensus

- Planned anchor intent: `#consensus`
- Anchor status: Editorial intent only. Do not activate until implementation confirms the published destination structure.

#### MSC-GUIDE-029 | How Bitcoin Proof of Work Secures the Network

- Registry ID: MSC-GUIDE-029
- Approved H1: How Bitcoin Proof of Work Secures the Network
- Card description: Connect targets, costly block production, cheap verification, accumulated chainwork, confirmation depth, and the limits of majority hash power.
- Depth: Shallow
- Format: Explainer
- Estimated reading time: 11 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-030 | How Bitcoin Reaches Consensus

- Registry ID: MSC-GUIDE-030
- Approved H1: How Bitcoin Reaches Consensus
- Card description: See how compatible validation rules, independent nodes, proof-of-work ordering, policy boundaries, software choice, and human coordination fit together.
- Depth: Deep
- Format: Technical Analysis
- Estimated reading time: 15 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-031 | How Bitcoin Soft Forks Work

- Registry ID: MSC-GUIDE-031
- Approved H1: How Bitcoin Soft Forks Work
- Card description: Learn the narrower-validity-set model, old-node compatibility limits, activation stages, signaling, lock-in, enforcement, and historical deployment methods.
- Depth: Deep
- Format: Explainer
- Estimated reading time: 16 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-032 | How Bitcoin Network Upgrades Happen

- Registry ID: MSC-GUIDE-032
- Approved H1: How Bitcoin Network Upgrades Happen
- Card description: Trace upgrades from discussion and BIPs through implementation, release, adoption, activation, incident response, and independent node enforcement.
- Depth: Deep
- Format: History
- Estimated reading time: 15 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

## 5. Key Terms

- **Bitcoin network:** The peer-to-peer system of nodes, miners, transactions, and consensus rules that operates Bitcoin.
- **Mining:** The proof-of-work process that orders valid transactions into blocks and competes to extend the Bitcoin chain.
- **Node:** Bitcoin software that communicates with peers and may validate, relay, store, or serve network data.
- **Mempool:** A node's local collection of valid unconfirmed transactions eligible for relay or block inclusion.
- **Block:** A valid batch of Bitcoin transactions linked to prior chain history through proof of work.
- **Blockchain:** The ordered history of valid Bitcoin blocks selected by accumulated proof of work.
- **Proof of work:** The computational process miners use to produce block hashes below the network target.
- **Consensus:** The shared validation rules independently enforced by Bitcoin nodes.
- **Validation:** The process of checking transactions and blocks against applicable rules.
- **Network upgrade:** A coordinated change to Bitcoin software or rules that may affect policy, interoperability, features, or consensus behavior.

## 6. Sources

1. **MSC Learn Master Registry**
   Author or publisher: Mempool Surf Club Editorial
   Repository path: `docs/learn/MSC_Learn_Master_Registry.json`
   Supports: The Network category identity, four-subcategory order, 16-guide canonical sequence, destination relationships, depth, format, and production timing.

2. **Learn content manifest**
   Author or publisher: Mempool Surf Club Editorial
   Repository path: `docs/learn/content/content-manifest.json`
   Supports: Permanent destination paths, registry identifiers, editorial statuses, and the separation between planning content and generated runtime data.

3. **Copy-locked Mining guides MSC-GUIDE-017 through MSC-GUIDE-020**
   Author or publisher: Mempool Surf Club Editorial
   Repository path: `docs/learn/content/guides/`
   Supports: Candidate-block construction, pool coordination, ASIC system boundaries, difficulty adjustment, card descriptions, depth, format, and reading-time metadata.

4. **Copy-locked Nodes guides MSC-GUIDE-021 through MSC-GUIDE-024**
   Author or publisher: Mempool Surf Club Editorial
   Repository path: `docs/learn/content/guides/`
   Supports: Full validation, pruning, node operation, software comparison, card descriptions, depth, format, and reading-time metadata.

5. **Copy-locked Network guides MSC-GUIDE-025 through MSC-GUIDE-028**
   Author or publisher: Mempool Surf Club Editorial
   Repository path: `docs/learn/content/guides/`
   Supports: Local mempools, block structure, selected blockchain history, hashrate estimation, card descriptions, depth, format, and reading-time metadata.

6. **Copy-locked Consensus guides MSC-GUIDE-029 through MSC-GUIDE-032**
   Author or publisher: Mempool Surf Club Editorial
   Repository path: `docs/learn/content/guides/`
   Supports: Proof-of-work security, consensus, soft forks, upgrades, card descriptions, depth, format, and reading-time metadata.

## 7. SEO title

How the Bitcoin Network Works: Miners, Nodes, Blocks, and Consensus

## 8. Meta description

Learn how Bitcoin's network works through miners, nodes, mempools, blocks, proof of work, chain selection, consensus, and upgrades.

## 9. Page excerpt

Explore the Bitcoin Network through 16 guides covering mining, nodes, transaction relay, blocks, blockchain history, proof of work, consensus, soft forks, and upgrades.

## 10. Estimated reading time

18 minutes for hub orientation and card review

## 11. Planned internal links

Do not activate planned links until the destination exists as a real published page with a confirmed URL.

- MSC-PATH-NETWORK | Understand the Network
- MSC-PATH-BUILD | Build on Bitcoin
- MSC-ROUTE-001 | How a Bitcoin Transaction Moves
- MSC-HUB-BASICS | Bitcoin Basics
- MSC-HUB-BUILDING | Building on Bitcoin
- MSC-GLOSSARY-001 | Bitcoin Glossary

## 12. Accuracy review checklist

- [x] Registry metadata matches the approved master registry and content manifest.
- [x] The category contains exactly Mining, Nodes, Network, and Consensus in approved order.
- [x] The hub contains exactly 16 guide cards in canonical order.
- [x] Every card uses the approved registry ID, H1, depth, format, and guide reading time.
- [x] Card descriptions are specific to the corresponding copy-locked guide.
- [x] Mining, pool coordination, ASIC hashing, node validation, and consensus remain distinct.
- [x] Mempools are described as node-local rather than one universal queue.
- [x] Proof of work is not described as making invalid blocks acceptable.
- [x] Nodes are not described as protocol voters or universal authorities.
- [x] Upgrade stages remain separate from BIP publication, code merge, release, and signaling.
- [x] Learning-path order is not presented as ownership of canonical guide navigation.
- [x] Planned card actions and branches contain no live URLs.
- [x] Exact approved glossary definitions are used.
- [x] Human Verification remains pending.
- [x] Exactly three complete illustration briefs are included.
- [x] No em dash or en dash character appears.

## 13. Human verification

- Reviewer:
- Review date:
- Notes:
  - Recheck all 16 card metadata fields against the current copy-locked guide files before copy lock.
  - Confirm all destination IDs, subcategory anchors, and planned branch relationships remain synchronized with the current registry.
  - Recheck exact glossary-definition synchronization.
  - Keep every card and planned internal link inactive until publication and URL confirmation.

## 14. Illustration brief

### Illustration 1

- Concept title: Four Layers of the Bitcoin Network
- Educational purpose: Show the category structure without turning the four layers into one authority.
- Recommended placement: After the section titled The category follows four connected layers.
- Visual description: Vintage oceanographic systems map with four connected stations labeled Mining, Nodes, Network, and Consensus. Transactions and blocks move between stations through clearly labeled routes. No station sits at the top or center as a command authority.
- Required labels: Mining, Nodes, Network, Consensus, Transactions, Blocks, Proof of work, Validation
- Caption: Bitcoin operates through connected mining, node, network, and consensus functions that remain independently understandable.
- Alt text: Editorial systems map showing mining, nodes, network relay, and consensus as four connected Bitcoin layers without a central authority.
- Image orientation: Landscape
- Mobile crop notes: Stack the four stations vertically and keep the transaction and block routes visible between adjacent layers.
- Status: PLANNED

### Illustration 2

- Concept title: Who Proposes and Who Checks
- Educational purpose: Separate candidate-block production from complete block validation.
- Recommended placement: After the section titled One system, several boundaries.
- Visual description: Old technical harbor chart. A mining vessel assembles and hashes a candidate block, then sends a found block toward several independent node checkpoints. Each checkpoint has accept and reject routes.
- Required labels: Candidate block, Miner, Proof of work, Found block, Full node, Validation, Accept, Reject
- Caption: Mining proposes a proof-of-work block, while each validating node checks the complete block under its own enforced rules.
- Alt text: Technical diagram showing a Bitcoin mining system proposing a found block to several independent validating nodes with accept and reject outcomes.
- Image orientation: Landscape
- Mobile crop notes: Keep the mining vessel on top and place the validating node checkpoints in one row below it.
- Status: PLANNED

### Illustration 3

- Concept title: From Basics to Network Depth
- Educational purpose: Help readers choose between canonical order, subcategory entry, and the curated Network path.
- Recommended placement: After the section titled How to use this hub.
- Visual description: Weathered navigation chart beginning at Bitcoin Basics and splitting into three routes: complete category, four subcategory ports, and Understand the Network. The routes reconnect at a systems-level understanding marker.
- Required labels: Bitcoin Basics, Complete category, Mining, Nodes, Network, Consensus, Understand the Network, Systems view
- Caption: Readers can follow the full category, enter one focused subcategory, or use the curated Network path.
- Alt text: Navigation chart showing three planned learning routes from Bitcoin Basics into the full Bitcoin Network category, its four subcategories, or the Understand the Network path.
- Image orientation: Landscape
- Mobile crop notes: Use three short vertical lanes beginning below one Bitcoin Basics marker and ending above one systems-view marker.
- Status: PLANNED
