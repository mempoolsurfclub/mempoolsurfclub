---
registry_id: MSC-GUIDE-027
status: COPY_LOCKED
page_role: topic-guide
h1: How the Bitcoin Blockchain Works
handle: bitcoin-blockchain
category: The Bitcoin Network
subcategory: Network
depth: Shallow
format: Explainer
primary_path: Understand the Network
secondary_paths:
  - Start With Bitcoin
author_display: Mempool Surf Club Editorial
reviewed_date: 2026-07-18
copy_locked_date: 2026-07-18
---

# How the Bitcoin Blockchain Works

## 1. Introductory deck

The Bitcoin blockchain is the ordered history of valid Bitcoin blocks selected by accumulated proof of work. Blocks link backward through previous-block hashes, while nodes independently validate each candidate chain. The selected history can change during a reorganization, so confirmation depth matters and first inclusion is not absolute finality.

## 2. Full article

The Bitcoin blockchain is often described as a permanent ledger.

That description is useful only when its limits are understood. Bitcoin does not rely on one central ledger keeper, one database server, or one miner announcing the official history. Nodes receive blocks from peers, validate them independently, track competing valid branches, and select the valid chain with the greatest accumulated proof of work under their rules.

The result is a shared history that converges through validation, proof of work, and network propagation.

### The blockchain is an ordered block history

Each Bitcoin block header contains the hash of a previous block.

That reference links a new block to a specific parent. The parent links to its parent, continuing backward to the genesis block.

A block's own hash commits to its header, including the previous-block reference and the Merkle root for its transaction identifiers. Changing an earlier block changes its hash. The later block that referenced the old hash would no longer point to the altered version.

An attacker attempting to replace earlier history must therefore construct a competing valid branch from the changed point and supply enough proof of work for nodes to select it over the current valid chain.

The linkage makes history tamper-evident. Proof of work and independent validation determine which linked history is selected.

### Every node maintains its own view

There is no database process that pushes one authoritative blockchain state to every participant.

Each full node maintains local data such as:

- A block index describing known headers and block relationships.
- Chainwork values for known blocks.
- One or more chainstate views.
- A selected active chain.
- Raw block and undo data according to storage configuration.
- Peer and validation state.
- Optional indexes for additional queries.

Nodes can learn about blocks at different times. One node may know a competing branch that another has not seen. Their selected tips can briefly differ.

Convergence happens as valid blocks propagate and one valid branch accumulates more proof of work. A node does not need identical storage or mempool contents to enforce compatible consensus rules.

### Validation comes before activation

A block's proof of work is not enough by itself.

A node checks the header and block under the applicable consensus rules. It verifies transaction validity, UTXO spends, scripts, block limits, coinbase rules, commitments, and chain context.

A node only activates a candidate chain after validating the required blocks. Among valid candidate chains, accumulated proof of work guides chain selection under that node's rules.

This prevents miners from buying permission to create invalid outputs, bypass signatures, exceed allowed issuance, or redefine block validity. More proof of work can win a competition between valid histories. It cannot make an invalid history valid to a node that enforces the rules.

### Accumulated work is not simply block count

A common shortcut says Bitcoin follows the longest chain.

The more precise rule is based on accumulated proof of work, often called chainwork.

Bitcoin Core derives the work associated with a block from its encoded proof-of-work target. A block at a harder target represents more expected hashing work than a block at an easier target. Chainwork is the sum of the work values along a branch.

Two branches with the same number of blocks can therefore have different accumulated work.

On mainnet, difficulty normally remains constant within an adjustment period, so block count and chainwork often move together over short comparisons. The protocol still compares work, not height alone.

"Most-work valid chain" is a better description than "longest chain."

### New blocks extend a chosen parent

A miner or pool selects a previous block to extend and builds a candidate on top of it.

Most miners usually work near the tip they believe nodes will accept because extending an older or weaker branch reduces the chance that their block will remain in the selected history.

Network delay can still produce competing valid blocks. Two miners can extend the same parent almost simultaneously. Some nodes see one block first; others see the other.

At that moment, both branches can be valid and have equal accumulated work. A node can temporarily remain on the first valid tip it received while tracking the competitor.

The next valid block found on one branch normally breaks the tie by adding more work. Nodes that had selected the other branch can then reorganize.

### A reorganization changes the selected chain

A chain reorganization occurs when a node changes its active tip to a competing valid branch with more accumulated proof of work.

The node disconnects blocks from its old active branch back to the shared ancestor, then connects blocks from the stronger branch in order.

That process updates chainstate. Outputs created only in disconnected blocks can disappear from the active-chain UTXO set. Spends confirmed only in those blocks can become unconfirmed. Transactions from disconnected blocks may return to the node's mempool if they remain valid and satisfy current constraints.

Transactions in the newly connected branch become confirmed. Conflicting transactions from the old branch may no longer be valid.

A reorganization is not a rollback commanded by a central administrator. It is a local node changing its selected valid history as new work and block data arrive.

### Confirmations measure selected-chain depth

A transaction has one confirmation when it appears in a block on the node's selected chain.

If one later block extends that chain, the transaction has two confirmations. Each additional block increases its depth below the selected tip.

Confirmations matter because replacing the transaction's block requires replacing that block and catching up with the work added after it. Deeper history generally requires more competing work to displace under ordinary assumptions.

Confirmation count is still not a universal finality guarantee.

Risk depends on:

- The value and reversibility of the transaction.
- The attacker's available hash power and duration.
- Whether the recipient controls its own node.
- Network connectivity and eclipse risk.
- The possibility of an accidental or deliberate reorganization.
- The transaction's conflict history.
- Operational and legal context outside Bitcoin.

A merchant selling a low-value digital item may accept a different threshold from an exchange settling a large withdrawal.

### First inclusion is not immutability

A block explorer may label a transaction confirmed as soon as it enters a block.

That means the explorer's node currently sees the transaction on its selected chain. It does not mean the transaction can never leave that history.

Short reorganizations are a normal possibility in a distributed proof-of-work network. Deep reorganizations are much less common and generally more costly, but Bitcoin does not place an absolute finality flag on an ordinary transaction after a fixed number of blocks.

"Immutable" should be treated as a practical description of deeply buried, valid history under stated assumptions, not as an instant consensus state.

The precise language is that later proof of work makes replacement increasingly difficult.

### Reorganizations do not rewrite transaction objects

A reorganization changes which blocks are selected.

It does not edit a confirmed transaction in place. A transaction from a disconnected block remains the same data structure. Its status changes because the block containing it is no longer on the active chain.

The transaction may:

- Appear in the new branch as well.
- Return to a mempool.
- Conflict with a transaction confirmed in the new branch.
- Become invalid under the new active-chain state.
- Be rebroadcast and confirmed later.
- Remain absent.

Wallets and services must respond to active-chain status rather than treating one observed block inclusion as permanent.

### The active chain is not every valid block

A node can retain valid blocks that are not on its active chain.

These blocks can belong to stale branches, historical competitors, or branch tips the node is tracking. Their transactions are not considered confirmed merely because the blocks themselves were valid.

The word blockchain sometimes blurs this distinction. A node's block database can contain more blocks than the one selected chain. The active blockchain refers to the branch currently selected by accumulated work among valid candidates.

A block explorer may display stale blocks separately. Their presence demonstrates that validity and selection are separate questions.

### Block height identifies position, not identity

Block height counts the position of a block relative to genesis.

Genesis has height 0. Its child has height 1, and so on.

Height is not a unique block identifier. Competing branches can contain different valid blocks at the same height. The block hash identifies the specific block.

This matters when software or users say "block 900,000," for example. A height points to the active-chain block in a particular node's current view unless a block hash or branch is specified.

During a reorganization, the block associated with a height can change.

### Timestamps do not select the chain

Blocks contain timestamps, but nodes do not choose the chain with the newest-looking time.

Timestamps are constrained by consensus and are used in areas such as difficulty adjustment and time-based transaction rules. They remain miner-supplied values within permitted bounds.

Chain selection uses accumulated proof of work among valid candidates. A branch cannot win by placing a larger timestamp in its header.

Likewise, wall-clock age does not make an invalid branch acceptable.

### Chainstate is derived from selected history

A full node does not need to replay every historical transaction for every new block.

During synchronization, it validates blocks and builds chainstate, including the current set of unspent transaction outputs. New transactions and blocks can then be checked against that current state.

When a block connects, spent outputs are removed and new outputs are added. Undo data helps a node disconnect retained blocks during a reorganization.

Chainstate is derived from validated history. It is not a substitute consensus authority.

A pruned node can discard eligible old raw block files after validation while retaining chainstate and continuing to enforce the same consensus rules. This is why a blockchain should not be defined as "a complete copy of every block stored by every node."

### The blockchain does not contain every Bitcoin-related event

Bitcoin's selected chain records valid on-chain transactions and block data.

It does not directly record:

- Every transaction that was created but never confirmed.
- Every transaction that entered a mempool.
- Every attempted block header hash.
- Wallet labels or private keys.
- Exchange account balances.
- Lightning channel updates that remain off-chain.
- Real-world identities unless users or external systems connect them.
- Every stale block known to every node.

Applications can derive indexes and interpretations from blockchain data, but those views are not automatically consensus state.

### Proof of work orders valid history

Proof of work gives nodes an objective way to compare valid branches without a central coordinator.

It does not tell nodes which rules to enforce. Node software and operator choices determine the rules used for validation.

This division is essential:

- Consensus rules determine which blocks are valid.
- Proof of work helps order valid competing histories.
- Network relay spreads candidate blocks.
- Chainstate tracks the effects of the selected history.
- Confirmations measure depth within that selected history.

Collapsing these roles produces slogans such as "miners control the blockchain" or "nodes vote on transactions." Neither is precise.

### The selected history is durable because replacement is costly and detectable

Bitcoin's blockchain is durable through several reinforcing properties.

Hash links expose changes to earlier blocks. Proof of work makes rebuilding a competing branch costly. Independent nodes reject rule-breaking blocks. Wide peer connectivity helps valid blocks propagate. Confirmation depth increases the work an attacker must overcome.

None of these properties requires trusting one institution to maintain the ledger.

The result is not magical permanence. It is a continuously validated, work-ordered history whose replacement becomes increasingly difficult as valid blocks accumulate above it.

That is the useful meaning of the Bitcoin blockchain.

## 3. Key Terms

- **Blockchain:** The ordered history of valid Bitcoin blocks selected by accumulated proof of work.
- **Block:** A valid batch of Bitcoin transactions linked to prior chain history through proof of work.
- **Node:** Bitcoin software that communicates with peers and may validate, relay, store, or serve network data.
- **Reorganization:** A change in the selected chain tip when a competing valid chain accumulates more proof of work.
- **Confirmation:** The inclusion of a transaction in a block, followed by additional blocks that increase settlement depth.
- **Proof of work:** The computational process miners use to produce block hashes below the network target.
- **Validation:** The process of checking transactions and blocks against applicable rules.

## 4. Sources

1. **Bitcoin white paper**  
   Author or publisher: Satoshi Nakamoto  
   URL: https://bitcoin.org/bitcoin.pdf  
   Supports: Hash-linked blocks, proof-of-work ordering, transaction history, competing-chain probability, and the role of later work in making replacement more difficult.

2. **Bitcoin Core chain data structures**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/chain.h  
   Supports: Block index relationships, block height, active-chain representation, chainwork storage, ancestor access, and branch navigation.

3. **Bitcoin Core chainwork implementation**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/chain.cpp  
   Supports: Per-block proof calculation, accumulated-work comparisons, and work-equivalent time calculations.

4. **Bitcoin Core validation implementation**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/validation.cpp  
   Supports: Block validation, candidate-chain tracking, ActivateBestChain behavior, block connection and disconnection, chainstate updates, and mempool reconciliation after reorganizations.

5. **Bitcoin Core block data structures**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/primitives/block.h  
   Supports: Previous-block hash linkage, Merkle-root commitment, block header fields, and block hashing.

6. **Bitcoin Core getchaintips RPC**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://bitcoincore.org/en/doc/31.0.0/rpc/blockchain/getchaintips/  
   Supports: Reporting known chain tips, branch lengths, fork points, active status, and competing valid or invalid branches known to one node.

7. **Bitcoin Core getblockchaininfo RPC**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://bitcoincore.org/en/doc/31.0.0/rpc/blockchain/getblockchaininfo/  
   Supports: The local active-chain height, best block hash, chainwork, verification progress, and pruning state.

8. **Bitcoin Core file-system documentation**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/doc/files.md  
   Supports: The distinction among raw block files, undo files, block index, chainstate, optional indexes, and other node data.

9. **Bitcoin Developer Guide: Block Chain**  
   Author or publisher: Bitcoin.org contributors  
   URL: https://developer.bitcoin.org/devguide/block_chain.html  
   Supports: Hash-linked block history, chain forks, stale blocks, block height, confirmations, and proof-of-work chain selection.

## 5. SEO title

How the Bitcoin Blockchain Works: Validation, Work, and Reorgs

## 6. Meta description

Learn how Bitcoin nodes validate hash-linked blocks, compare accumulated proof of work, handle reorganizations, and measure transaction confirmations.

## 7. Page excerpt

The Bitcoin blockchain is the valid block history selected by accumulated proof of work. Learn how nodes track branches, reorganize, and turn block depth into confirmations.

## 8. Estimated reading time

10 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Parent hub: MSC-HUB-NETWORK | The Bitcoin Network
- Primary path: MSC-PATH-NETWORK | Understand the Network
- Secondary path: MSC-PATH-START | Start With Bitcoin
- Prerequisite: MSC-GUIDE-026 | How Bitcoin Blocks Work
- Previous guide: MSC-GUIDE-026 | How Bitcoin Blocks Work
- Next guide: MSC-GUIDE-028 | What Is Bitcoin Hashrate?
- Branch guide: MSC-GUIDE-030 | How Bitcoin Reaches Consensus
- Recommended continuation: MSC-GUIDE-021 | What Is a Bitcoin Full Node?

## 10. Accuracy review checklist

- [x] Registry metadata matches the approved registry.
- [x] The blockchain is defined as selected valid history, not every stored block or every node's complete data directory.
- [x] Nodes are described as maintaining local views that can temporarily differ.
- [x] A node activates only validated candidate chains.
- [x] Chain selection uses accumulated proof of work rather than block count or timestamps alone.
- [x] Proof of work is not described as permission to violate consensus.
- [x] Reorganization connection and disconnection effects are explained.
- [x] Transactions are not described as immediately immutable at first confirmation.
- [x] Block height is not described as a unique block identifier.
- [x] Chainstate is distinguished from raw block history.
- [x] The blockchain is not said to record every mempool, wallet, Lightning, or real-world event.
- [x] Exact approved glossary definitions are used.
- [x] Planned internal links contain no live URLs.
- [x] No em dash or en dash character appears.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-18
- Notes:
  - Verified Bitcoin Core v31.0 chain-index, chainwork, active-chain, chainstate, block-connection, block-disconnection, and ActivateBestChain descriptions.
  - Verified accumulated proof of work rather than raw block count or timestamp determines selection among valid candidate chains.
  - Verified proof of work is not described as overriding consensus validity.
  - Verified reorganization effects on UTXO state, confirmations, conflicts, and mempool reconsideration remain qualified by validity and local constraints.
  - Verified confirmation depth is not presented as an absolute or universal finality guarantee.
  - Verified archival block storage and blockchain validation remain separate concepts.
  - Confirmed exact approved glossary-definition synchronization.
  - Confirmed source entries contain precise Supports notes. Moving Bitcoin Core source and RPC paths remain flagged for publication-time accessibility review.
  - Confirmed planned internal links remain inactive until real destination pages and URLs exist.

## 12. Illustration brief

### Illustration 1

- Concept title: Valid Branches and Accumulated Work
- Educational purpose: Replace the vague longest-chain slogan with a valid-chainwork model.
- Recommended placement: After the section titled Accumulated work is not simply block count.
- Visual description: Old navigation chart showing two valid branches from one shared block. One branch has more blocks but lighter work markers. The other has fewer or equal blocks with a larger accumulated-work gauge and is selected. An invalid branch ends at a rejection buoy regardless of its work.
- Required labels: Shared ancestor, Valid branch A, Valid branch B, Accumulated work, Selected chain, Invalid branch rejected
- Caption: Nodes compare accumulated proof of work only among branches that satisfy the consensus rules they enforce.
- Alt text: Technical branch diagram showing valid Bitcoin chains compared by accumulated work while an invalid high-work branch is rejected.
- Image orientation: Landscape
- Mobile crop notes: Place the shared ancestor in the center with two valid branches above and the rejected invalid branch below.
- Status: PLANNED

### Illustration 2

- Concept title: What Happens During a Reorganization
- Educational purpose: Show block disconnection, shared ancestor, and new-branch connection.
- Recommended placement: After the section titled A reorganization changes the selected chain.
- Visual description: Infrastructure-manual sequence. The old active tip backs down two blocks to a shared ancestor. A three-block competing branch is then connected. UTXO state, confirmations, and mempool status panels update beside the chain.
- Required labels: Old active tip, Disconnect, Shared ancestor, Competing valid branch, Connect, New active tip, UTXO update, Confirmation update, Mempool reconsideration
- Caption: A node reorganizes by disconnecting its old branch to the fork point and connecting the valid branch with more accumulated work.
- Alt text: Bitcoin chain reorganization diagram showing two old blocks disconnected to a shared ancestor and three competing blocks connected as the new active chain.
- Image orientation: Landscape
- Mobile crop notes: Use a vertical fork with the old branch on the left and new branch on the right, keeping the shared ancestor centered.
- Status: PLANNED

### Illustration 3

- Concept title: Blockchain Data Versus Derived Node State
- Educational purpose: Separate selected block history, chainstate, block index, and optional indexes.
- Recommended placement: After the section titled Chainstate is derived from selected history.
- Visual description: Oceanographic processing station. Selected valid blocks flow into validation. Outputs feed separate cabinets labeled Chainstate, Block index, Raw block files, Undo data, and Optional indexes. A pruned-storage gate removes eligible old raw files without removing chainstate.
- Required labels: Selected valid blocks, Validation, Chainstate, UTXO set, Block index, Raw block files, Undo data, Optional indexes, Pruning
- Caption: Nodes derive current chainstate from validated history while storing block and index data according to configuration.
- Alt text: Technical diagram showing validated Bitcoin blocks producing chainstate, block-index, raw-file, undo, and optional-index data with pruning applied only to eligible historical files.
- Image orientation: Landscape
- Mobile crop notes: Stack validation above five storage drawers and keep the pruning gate beside the raw-file drawer.
- Status: PLANNED
