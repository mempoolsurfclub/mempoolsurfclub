---
registry_id: MSC-GUIDE-014
status: COPY_LOCKED
page_role: topic-guide
h1: How Bitcoin Confirmations Work
handle: bitcoin-confirmations
category: Bitcoin Basics
subcategory: Essentials
depth: Surface
format: Explainer
primary_path: Understand the Network
secondary_paths:
  - Start With Bitcoin
  - Use Bitcoin Safely
author_display: Mempool Surf Club Editorial
reviewed_date: 2026-07-17
copy_locked_date: 2026-07-17
---

# How Bitcoin Confirmations Work

## 1. Introductory deck

A Bitcoin confirmation begins when a valid transaction is included in a block on a node's active chain. Additional blocks increase its confirmation depth and usually reduce practical reorganization risk, but they do not create absolute finality or settle every commercial question.

## 2. Full article

A Bitcoin transaction can be valid before it is confirmed. It can also be relayed widely, appear in wallet software, and sit in many mempools without having any confirmations.

Confirmation begins with block inclusion. The distinction matters because an unconfirmed transaction and a confirmed transaction occupy different places in Bitcoin's shared history.

### Unconfirmed does not mean partially confirmed

An unconfirmed transaction has not yet been included in a block in the node's active best valid chain.

A node may have accepted the transaction into its mempool after checking it against consensus requirements and local policy. The node may relay it to peers. Wallets may show it as pending. Miners may consider it for a candidate block.

None of those states is a confirmation.

Mempools are local. Different nodes can receive transactions in different orders, apply different policies, have different capacity limits, or miss a transaction entirely. One node may store a transaction that another node rejects or has not yet seen.

Mempool acceptance therefore describes a node's current unconfirmed transaction set. It does not place the transaction in the blockchain.

### The first confirmation comes from block inclusion

A transaction receives its first confirmation when it is included in a valid block that the node accepts into its active chain.

Common confirmation counting includes the transaction's own block as confirmation one. If another block is built on top of that chain, the transaction has two confirmations from that node's current view. Each additional block increases the depth by one.

This count is about chain position, not elapsed clock time. A wallet generally compares the transaction's block height with the height of its current active chain tip.

A transaction identifier alone does not guarantee that the transaction will ever be confirmed. It identifies transaction data, but miners may not include it, it may be replaced before confirmation, or another transaction may spend a conflicting input.

### Nodes decide which blocks are valid

Miners assemble candidate blocks and perform proof of work. When a miner finds a block, nodes do not simply trust the miner's claim.

Each validating node checks the block and its transactions against the consensus rules it enforces. These checks include proof of work, transaction validity, spending rules, block limits, and the relationship to prior chain state.

A block that violates those rules is invalid to that node. Additional blocks built on an invalid block do not make it valid.

This is why confirmations are meaningful only within a valid chain. Miners propose history. Nodes independently verify whether the proposed blocks satisfy the rules.

### Chain selection uses cumulative proof of work

Bitcoin is sometimes described as following the longest chain. That wording can be misleading if longest is interpreted as the greatest number of blocks.

Nodes select among valid candidate chains using accumulated chain work, which represents cumulative proof of work. A chain with fewer blocks can have more cumulative work if its blocks represent more required work.

The active chain is the valid chain that the node currently selects under this rule. Confirmation depth is measured from the transaction's block within that active chain.

The rule does not mean miners can make an invalid chain authoritative by adding work to it. Validity is checked first. Chain selection compares valid alternatives.

The selected chain can change as new valid blocks arrive. A node may know about several valid branches while maintaining one active chain for its current UTXO state and wallet view.

Chain work is calculated from the proof-of-work targets represented by the blocks. It is not a vote count, a count of miners, or a simple comparison of timestamps. A branch becomes the active candidate because its validated history represents more accumulated work under the node's rules.

This also explains why a chain with an extra low-work block is not automatically preferred over a shorter chain whose blocks represent greater cumulative work. In normal mainnet operation, block count and work often move together, but the consensus-sensitive comparison is work.

### Competing blocks can exist

Two miners can find valid blocks near the same time, each extending the same parent block.

Some nodes may receive one block first while other nodes receive the competing block first. For a short period, the network can have different active tips at the same height.

Miners then build on the valid tip they know and choose. When one branch accumulates more proof of work, nodes that had selected the other branch can switch.

The block that is no longer in the active chain is often called stale. It may have been valid, but it did not remain part of the selected chain history.

### A reorganization can change confirmation state

A chain reorganization occurs when a node switches from its current active chain to another valid chain with more cumulative proof of work.

During the switch, one or more blocks can be disconnected from active chain state and blocks from the competing branch can be connected. Transactions in disconnected blocks lose the confirmations they received from those blocks.

A removed transaction can have several outcomes:

- It may return to the node's mempool if it remains valid and meets current policy.
- It may already appear in a block on the newly selected chain.
- It may be confirmed later in a different block.
- It may conflict with a transaction in the new active chain and no longer be valid for inclusion.

Wallet software updates its display from the chain view and transaction information available to it. Different nodes or wallets may briefly show different states while blocks and reorganizations propagate.

### More depth usually adds settlement assurance

Each additional confirmation means more proof of work has accumulated on top of the block containing the transaction.

Reversing that transaction through a competing chain would generally require replacing its block and the work accumulated after it, while also competing with continuing honest chain growth. Under Bitcoin's operating assumptions, deeper transactions are ordinarily harder to reorganize than shallow ones.

This is increasing settlement assurance, not absolute finality.

Bitcoin does not contain a depth at which a transaction becomes mathematically impossible to reorganize. Additional confirmations reduce practical risk under assumptions about hashrate, network behavior, validation, and incentives.

They also do not repair an invalid transaction. If a block is invalid under a node's rules, the node rejects it regardless of claimed depth.

### There is no universal confirmation count

The appropriate confirmation requirement depends on the situation.

Relevant factors can include:

- The value and reversibility of what is being delivered.
- The value of the transaction.
- The relationship and history between the parties.
- Replacement or conflict risk before confirmation.
- The cost of responding to a reorganization.
- The counterparty's risk tolerance.
- Whether delivery can wait or be reversed.
- The surrounding legal or commercial arrangement.

A low-value, repeat interaction may be handled differently from delivery of a high-value irreversible good. A custodian may use a different policy from a local merchant. These are acceptance decisions, not consensus rules.

No fixed number is suitable for every payment. Treating any familiar fixed count as universally safe or final replaces risk analysis with a slogan.

A receiver can also separate technical confirmation policy from business policy. For example, the receiver may wait for additional depth before releasing something that cannot be recovered, while allowing a reversible service to proceed sooner.

The protocol does not know which goods are being delivered or whether a refund is possible. Confirmation policy belongs to the application and the parties using it.

### Zero-confirmation acceptance is a risk decision

A zero-confirmation payment is an unconfirmed transaction accepted before block inclusion.

The receiver may observe a transaction in a wallet or mempool and decide to proceed. That decision depends on the transaction, wallet behavior, network observations, replacement policy, conflict detection, value at risk, and the ability to reverse delivery.

Replace-by-fee and conflicting transactions are especially relevant before confirmation. A transaction may be valid and widely relayed while another valid transaction spends one or more of the same inputs.

The Bitcoin protocol does not label an unconfirmed payment commercially safe. A recipient decides whether the surrounding risk is acceptable.

### Mempool status can change

An unconfirmed transaction can leave a node's mempool without confirming.

It may be replaced, conflict with a newly confirmed transaction, be removed for local resource management, fail a changed policy condition, or depend on an ancestor that is removed. Another node may still retain it.

Likewise, a transaction absent from one mempool may remain valid and later appear in a block. Miners are not required to build blocks from one universal mempool.

Wallet interfaces often simplify these states into labels such as pending, dropped, replaced, conflicted, or unconfirmed. Those labels reflect the wallet's information and software behavior, not additional consensus states.

### Confirmation depth is not clock time

Bitcoin targets an average block interval of roughly ten minutes over time. Blocks do not arrive on a fixed schedule.

Several blocks can arrive close together. A longer gap can occur without indicating that a particular transaction is invalid. The difficulty adjustment targets the long-run production rate rather than scheduling each block.

Block timestamps do not directly determine a transaction's confirmation count. The count comes from the transaction's block and the blocks above it in the active chain.

A wallet might estimate time from confirmations, but confirmation depth and elapsed minutes are different measurements.

### Wallets report their current view

A wallet can calculate confirmations only from the chain data it trusts.

A wallet connected to its own fully validated node can use that node's active chain. A lightweight wallet may depend on server or peer information. A custodial service may present an internal status based on its own systems.

Temporary disagreement can occur during block propagation or a reorganization. A wallet that is behind the current tip can also display a lower confirmation count than a synchronized node.

The displayed number should be understood as the wallet's current view of depth, not a separate network certificate.

### Confirmations answer a limited question

Confirmation depth provides evidence that a valid transaction has been included in the selected chain and buried under additional proof of work.

It does not prove the legal identity of a payer, the condition of goods, the accuracy of an invoice, the legitimacy of a service, the absence of fraud, or the resolution of a contractual dispute.

Those questions belong to other systems.

Bitcoin confirmations provide increasing technical settlement assurance within Bitcoin's chain. The next guide explains a different block-height process: the scheduled reduction in Bitcoin's block subsidy.

## 3. Key Terms

**Confirmation:** The inclusion of a transaction in a block, followed by additional blocks that increase settlement depth.

**Block:** A valid batch of Bitcoin transactions linked to prior chain history through proof of work.

**Blockchain:** The ordered history of valid Bitcoin blocks selected by accumulated proof of work.

**Transaction:** A data structure that spends existing UTXOs and creates new outputs.

**Mempool:** A node's local collection of valid unconfirmed transactions eligible for relay or block inclusion.

**Node:** Bitcoin software that communicates with peers and may validate, relay, store, or serve network data.

**Miner:** An operator that constructs candidate blocks and performs proof of work.

**Proof of work:** The computational process miners use to produce block hashes below the network target.

**Reorganization:** A change in the selected chain tip when a competing valid chain accumulates more proof of work.

**Consensus:** The shared validation rules independently enforced by Bitcoin nodes.

**Validation:** The process of checking transactions and blocks against applicable rules.

**Transaction relay:** The peer-to-peer propagation of transactions between nodes under local policy rules.

## 4. Sources

### Bitcoin: A Peer-to-Peer Electronic Cash System

- Author or publisher: Satoshi Nakamoto
- Direct URL: https://bitcoin.org/bitcoin.pdf
- Supports: Proof-of-work chain selection, cumulative work, transaction ordering, the probability framing for replacing deeper history, and the long-run block-production target.

### Bitcoin Developer Guide: Block Chain

- Author or publisher: Bitcoin Project developer documentation
- Direct URL: https://developer.bitcoin.org/devguide/block_chain.html
- Supports: Independent block validation, competing chain tips, active-chain selection, confirmations, stale blocks, and chain reorganizations.

### Bitcoin Developer Guide: Transactions

- Author or publisher: Bitcoin Project developer documentation
- Direct URL: https://developer.bitcoin.org/devguide/transactions.html
- Supports: Transaction inputs, outputs, conflicts, transaction identifiers, and the distinction between transaction validity and block confirmation.

### Bitcoin Developer Guide: P2P Network

- Author or publisher: Bitcoin Project developer documentation
- Direct URL: https://developer.bitcoin.org/devguide/p2p_network.html
- Supports: Peer-to-peer transaction and block propagation, node-local network views, and the separation between relay and chain inclusion.

### Bitcoin Core Chain Data Structures

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/chain.h
- Supports: Block indexes, block height, chain work, active-chain ancestry, and the data used to compare valid chain candidates.

### Bitcoin Core Validation

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/validation.cpp
- Supports: Block and transaction validation, active-chain connection and disconnection, chain-tip activation, transaction conflict handling, and reorganization processing.

### Bitcoin Core Mempool Implementation

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/txmempool.cpp
- Supports: Node-local mempool storage, transaction removal, conflicts, and mempool updates during chain changes.

### BIP 125: Opt-in Full Replace-by-Fee Signaling

- Author or publisher: David A. Harding and Peter Todd
- Direct URL: https://bips.dev/125/
- Supports: The documented opt-in replacement model and why replacement and conflicting transactions matter before confirmation.

## 5. SEO title

How Bitcoin Confirmations Work: Depth, Reorgs, and Risk

## 6. Meta description

Learn when a Bitcoin transaction becomes confirmed, how confirmation depth grows, why cumulative proof of work matters, and how reorganizations affect settlement risk.

## 7. Page excerpt

A Bitcoin confirmation begins with inclusion in a block on a node's active chain. This guide explains confirmation depth, competing blocks, reorganizations, and why no universal count guarantees finality.

## 8. Estimated reading time

9 to 11 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
- MSC-GUIDE-015 | What Is the Bitcoin Halving?
- MSC-GUIDE-026 | How Bitcoin Blocks Work
- MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?
- MSC-GUIDE-029 | How Bitcoin Proof of Work Secures the Network
- MSC-GUIDE-030 | How Bitcoin Reaches Consensus
- MSC-GLOSSARY-001 | Bitcoin Glossary
- MSC-HUB-BASICS | Bitcoin Basics
- MSC-PATH-NETWORK | Understand the Network
- MSC-PATH-START | Start With Bitcoin
- MSC-PATH-SAFE | Use Bitcoin Safely

## 10. Accuracy review checklist

- [x] Registry metadata matches the approved registry.
- [x] Mempool acceptance is not described as confirmation.
- [x] Different nodes may have different mempool and chain views.
- [x] Confirmation one begins with inclusion in an active-chain block.
- [x] Nodes validate blocks independently rather than delegating validity to miners.
- [x] Chain selection is described using cumulative proof of work, not block count alone.
- [x] A valid block may become stale without becoming retroactively invalid.
- [x] Reorganization outcomes for removed transactions preserve uncertainty.
- [x] Additional confirmations increase practical assurance without creating absolute finality.
- [x] No universal confirmation count is prescribed.
- [x] Confirmation depth is separated from elapsed clock time.
- [x] Exact approved glossary definitions are used.
- [x] Planned internal links contain no live URLs.
- [x] No em dash or en dash character appears.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-17
- Notes:
  - Editorial accuracy review completed.
  - Recheck source URL accessibility immediately before publication.
  - Recheck current Bitcoin Core chain-selection, confirmation, reorganization, mempool, and replacement-policy behavior before publication.
  - Keep planned internal links inactive until real destination pages and confirmed URLs exist.

## 12. Illustration brief

### Illustration 1

- Concept title: From Mempool to Confirmation Depth
- Educational purpose: Separate unconfirmed transaction relay from block inclusion and additional confirmation depth.
- Recommended placement: After the section titled The first confirmation comes from block inclusion.
- Visual description: Old technical field-guide flow on Paper. A transaction moves through several node-local mempool boxes, then enters a block labeled confirmation one. Two additional blocks extend the chain and increase depth. Keep mempool boxes visually separate from the blockchain.
- Required labels: Unconfirmed transaction, Node-local mempool, Block inclusion, Confirmation 1, Additional depth
- Caption: Relay and mempool acceptance are unconfirmed states. Confirmation begins when the transaction enters an active-chain block.
- Alt text: Technical flow showing an unconfirmed transaction in node-local mempools, followed by inclusion in a block and two additional confirmation levels.
- Image orientation: Landscape
- Mobile crop notes: Stack the mempool stage above the three-block chain and keep the first-confirmation boundary prominent.
- Status: PLANNED

### Illustration 2

- Concept title: Competing Tips and Reorganization
- Educational purpose: Show how two valid branches can exist briefly and why a node switches to the valid branch with more cumulative proof of work.
- Recommended placement: After the section titled A reorganization can change confirmation state.
- Visual description: Navigation-chart fork beginning from one shared block. Two valid branches extend to different tips. Work markers accumulate beside each branch, and the node's active-chain marker moves to the branch with greater cumulative work. Show one transaction returning to an unconfirmed holding area.
- Required labels: Shared history, Valid branch A, Valid branch B, Cumulative work, Active chain, Reorganization
- Caption: A node can switch between valid branches when another chain accumulates more proof of work.
- Alt text: Forked Bitcoin chain diagram showing two valid branches, cumulative-work markers, an active-chain switch, and a transaction removed by a reorganization.
- Image orientation: Landscape
- Mobile crop notes: Use a vertical fork with short branches and place the active-chain switch marker in the center.
- Status: PLANNED

### Illustration 3

- Concept title: Depth Increases Assurance, Not Absolute Finality
- Educational purpose: Explain that additional confirmations generally reduce practical reorganization risk without declaring any fixed depth irreversible.
- Recommended placement: After the section titled There is no universal confirmation count.
- Visual description: Calm oceanographic depth chart with a transaction block near the surface and additional blocks descending through increasing depth bands. A risk curve narrows gradually but never reaches a label of zero or final. Include circumstance markers for value, delivery, and reversibility.
- Required labels: Confirmation depth, Practical assurance, Reorganization risk, Transaction value, Delivery risk, No universal count
- Caption: Confirmation needs depend on circumstances, while additional depth generally increases practical settlement assurance.
- Alt text: Oceanographic-style confirmation-depth chart showing practical assurance increasing and reorganization risk narrowing without an absolute finality point.
- Image orientation: Square
- Mobile crop notes: Keep the descending block column centered and place circumstance markers along the right edge.
- Status: PLANNED
