---
registry_id: MSC-GUIDE-026
status: COPY_LOCKED
page_role: topic-guide
h1: How Bitcoin Blocks Work
handle: bitcoin-blocks
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

# How Bitcoin Blocks Work

## 1. Introductory deck

A Bitcoin block is a valid batch of transactions linked to prior chain history through proof of work. Miners construct candidate blocks, but nodes decide whether a received block satisfies the consensus rules. A block combines an 80-byte header, a transaction list beginning with a coinbase transaction, and commitments that let nodes verify its contents.

## 2. Full article

Bitcoin processes transactions through blocks, but a block is more than a container filled by a miner.

It is a structured proposal with proof of work, a link to prior history, a commitment to its transactions, and a set of transactions that must satisfy Bitcoin's rules together. A miner can construct and hash a candidate. The candidate becomes part of a node's selected chain only after the node validates it and chain selection places it on the active history.

Understanding that sequence prevents several common mistakes. Miners do not vote transactions valid. A block hash does not excuse invalid contents. A transaction does not become confirmed merely because it appeared in a template.

### Candidate blocks, mined blocks, and accepted blocks are different stages

A mining system begins with a candidate block.

The candidate usually contains:

- A header linked to a chosen previous block.
- A coinbase transaction created for the candidate.
- A selected set of additional transactions.
- A Merkle root committing to the transaction identifiers.
- Any required witness commitment.
- A target encoded in the header's `nBits` field.
- A timestamp and version.
- A nonce plus other changeable data used while searching.

The miner repeatedly hashes block headers or related header variants while changing fields that alter the header commitment. Most results do not satisfy the target.

When a hash is at or below the required target, the miner can submit the resulting block to the network. That does not guarantee acceptance. Each receiving node checks proof of work, header context, transaction validity, block limits, coinbase rules, commitments, and other consensus conditions.

A block is valid only if the complete object passes those checks. A valid block may still compete with another valid branch before one chain becomes selected.

### The block header is 80 bytes

The serialized Bitcoin block header contains six fields:

- Version, 4 bytes.
- Previous block hash, 32 bytes.
- Merkle root, 32 bytes.
- Timestamp, 4 bytes.
- Encoded target, commonly called `nBits`, 4 bytes.
- Nonce, 4 bytes.

Together they form an 80-byte header.

The block hash is the double-SHA-256 hash of this serialized header, interpreted under Bitcoin's proof-of-work rules. The hash must satisfy the target represented by `nBits`.

Only the header is repeatedly hashed in the basic proof-of-work loop. The transaction list affects that loop through the Merkle root and, for witness data, through the witness commitment included in the coinbase transaction.

Changing a transaction, its order, the coinbase data, or a witness commitment changes a commitment and ultimately changes the header being hashed.

### The previous-block field links history

The previous block hash points to the block the candidate seeks to extend.

That link creates a chain of headers. Altering an earlier block changes its hash, which breaks the next block's previous-hash reference and every later link built from it.

The link alone does not select the active chain. Nodes can know about multiple valid branches. They compare accumulated proof of work among valid candidates and activate the chain their rules select.

A miner cannot point to an invalid parent and make it acceptable through additional hashing. The branch must remain valid under the node's consensus rules.

### The Merkle root commits to transaction identifiers

Bitcoin arranges the block's transaction identifiers into a Merkle tree and places the resulting Merkle root in the header.

The root is a compact commitment to the ordered transaction list. A node can recompute it from the block and reject the block if it does not match the header.

The root does not store every transaction inside the header. The full transactions still travel with the block or are reconstructed through a relay protocol. The root lets a verifier detect a mismatch between the header commitment and the supplied transaction set.

Transaction order matters. Reordering transactions changes the Merkle tree and therefore the root.

A Merkle branch can later prove that a transaction identifier is included in a particular block without listing every other transaction identifier. That proof addresses inclusion in the committed set. It does not by itself prove that the block is valid, selected, or deeply confirmed.

### SegWit adds a witness commitment

The ordinary Merkle root commits to transaction identifiers that exclude segregated witness data.

BIP 141 therefore defines a separate witness commitment. The commitment is placed in an output of the coinbase transaction and commits to a witness Merkle root together with a reserved value from the coinbase witness.

Nodes enforcing SegWit rules verify this commitment when the block contains witness data under the applicable conditions.

This is why saying "the header Merkle root commits to every byte in the block" is inaccurate. The transaction-id Merkle root and the coinbase witness commitment cover different parts of the transaction data.

### The coinbase transaction comes first

The first transaction in a Bitcoin block is the coinbase transaction.

It does not spend an earlier UTXO through ordinary inputs. Instead, its special input identifies it as coinbase and includes required or miner-chosen data. Under BIP 34, the block height is encoded at the beginning of the coinbase input's script data for applicable blocks.

The coinbase transaction can create outputs paying the block subsidy and collected transaction fees. The total output value may not exceed the amount allowed under the consensus rules for that block.

A miner may divide the permitted value among several outputs or use a template with particular destinations. The consensus rule concerns the allowed total and transaction validity, not one mandatory payout address.

Coinbase outputs are subject to a maturity rule. They can be spent only in a block whose height is at least 100 greater than the height of the block that created them.

### Transaction fees are not separate block objects

Every non-coinbase transaction consumes input value and creates output value. When input value exceeds output value, the difference is the transaction fee.

The block's total fees are the sum of those differences for its included transactions. The coinbase transaction may claim up to the current block subsidy plus those fees.

There is no separate fee transaction added after the block. Fees are implicit in the included transactions and become claimable through the coinbase transaction.

A block can include transactions with different fee rates. Consensus does not require a miner to sort transactions from highest fee rate to lowest. Mining policy and dependencies determine practical selection.

### Dependencies constrain transaction order

A transaction can spend an output created by an earlier transaction in the same block.

The parent must appear before the child so the output exists when the node validates the child. The coinbase transaction must be first, but other transaction ordering is largely shaped by these dependencies and the miner's chosen template policy.

A miner cannot include two transactions that spend the same output. It also cannot include a child before the in-block parent it depends on.

A candidate builder commonly selects related transactions as packages because a high-fee child may justify including a lower-fee parent. The final block still contains individually serialized transactions in a valid order.

### Block weight limits the transaction set

SegWit introduced block weight as the main consensus accounting measure for block size.

Bitcoin's maximum block weight is 4,000,000 weight units. Witness bytes receive a lower weight than non-witness bytes under the defined formula.

The limit does not mean every valid block is four megabytes on disk or on the wire. Actual serialized size depends on the mix of witness and non-witness data. A block containing no discounted witness data reaches the weight limit at a much smaller serialized size than a witness-heavy block.

Candidate builders also reserve space and weight for the coinbase transaction, commitments, and safety margins. A template may remain below the theoretical maximum.

Weight is a consensus limit. Local mining policy may use additional limits, but nodes must accept a block that satisfies consensus even when its transaction mix would not match their own template policy.

### Timestamps are constrained but not a precise clock

The block header contains a miner-selected timestamp measured in seconds.

Consensus applies contextual time rules. A block's timestamp must be greater than the median time of a defined set of previous blocks. Bitcoin Core also does not accept a header while its timestamp is more than two hours ahead of the node's current clock.

A block timestamp is not a trusted record of the exact moment the block was found. Miners have limited freedom within the valid range, and network arrival times differ.

Bitcoin's target spacing is ten minutes, but individual block intervals vary widely. The timestamp field does not turn that target into an exact schedule.

### Proof of work covers the header commitment

Proof of work demonstrates that a valid header hash was found below the target.

Because the header includes the previous block hash and Merkle root, the proof is tied to a particular parent and committed transaction set. If the miner changes a transaction or coinbase field, the Merkle root or witness commitment path changes and the header work must be searched again.

Proof of work does not validate signatures, UTXO availability, block weight, coinbase value, or script execution. Nodes perform those checks separately.

An invalid block can have a hash below the target. Nodes enforcing the rules still reject it.

### Nodes validate blocks independently

When a node receives a block, it checks multiple layers.

Header checks include:

- Proof of work satisfies the encoded target.
- The target is permitted for that height and network.
- The previous block is known or requested.
- Version and activation rules are satisfied.
- Time constraints are satisfied.

Block and transaction checks include:

- The transaction Merkle root matches.
- The coinbase transaction is present and first.
- No extra coinbase transaction appears.
- Transaction syntax and amounts are valid.
- Inputs exist and are unspent in the applicable state.
- Spending conditions and signatures are satisfied.
- Locktime and sequence rules are satisfied.
- Block weight and other consensus limits are respected.
- The coinbase claim does not exceed subsidy plus fees.
- Required witness commitments are valid.

The exact software path is more detailed, but the principle is stable: a miner proposes; a node verifies.

### Relay can avoid sending every transaction again

A newly found block can be large enough that efficient propagation matters.

BIP 152 compact block relay lets peers announce a block using its header, short transaction identifiers, and a small set of prefetched transactions. A receiving node can reconstruct much of the block from transactions it already knows, then request what is missing.

Compact relay does not change block validity. It is a transport optimization. The reconstructed block must still pass the same checks as a fully transmitted block.

If reconstruction fails or transactions are missing, peers can request additional data or fall back to other relay behavior.

### A valid block can still become stale

Two miners can find valid blocks that extend the same parent before either block has reached the entire network.

Different nodes may temporarily select different tips. As one branch gains more accumulated proof of work, nodes that learn about the stronger valid branch can reorganize to it.

A valid block that is not part of the ultimately selected chain is often called stale. Its coinbase outputs do not mature on the selected chain, and its transactions may return to unconfirmed status unless they also appear in the selected branch.

This does not mean the stale block was invalid. It means another valid branch became the selected history.

### A block confirms transactions only on the selected chain

A transaction has one confirmation when it appears in a block on the node's selected chain. Each later block added to that chain increases its confirmation depth.

A reorganization can reduce or remove those confirmations. Bitcoin does not mark a transaction instantly immutable at first inclusion.

As depth grows, replacing that history generally requires more competing proof of work and becomes less practical under ordinary assumptions. The appropriate confirmation threshold remains contextual rather than universal.

### A block is a validated link, not merely a batch

A concise block model has four parts:

1. A miner constructs a candidate linked to a parent.
2. The transaction set is committed through the Merkle root and, when required, a witness commitment.
3. Proof of work is searched over the header commitment.
4. Nodes independently validate the complete block and select among valid chains by accumulated work.

Blocks organize transaction settlement into verifiable steps. Their security does not come from trusting the miner, the pool, or a block explorer. It comes from commitments, proof of work, and independent validation under shared rules.

## 3. Key Terms

- **Block:** A valid batch of Bitcoin transactions linked to prior chain history through proof of work.
- **Transaction:** A data structure that spends existing UTXOs and creates new outputs.
- **Mining:** The proof-of-work process that orders valid transactions into blocks and competes to extend the Bitcoin chain.
- **Merkle root:** A compact commitment to the transaction set inside a Bitcoin block.
- **Proof of work:** The computational process miners use to produce block hashes below the network target.
- **Confirmation:** The inclusion of a transaction in a block, followed by additional blocks that increase settlement depth.
- **Reorganization:** A change in the selected chain tip when a competing valid chain accumulates more proof of work.

## 4. Sources

1. **Bitcoin Core block data structures**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/primitives/block.h  
   Supports: The serialized block header fields, block transaction vector, header hashing object, and structural distinction between a header and a full block.

2. **Bitcoin Core consensus constants**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/consensus/consensus.h  
   Supports: Maximum block weight, block-weight accounting constants, coinbase maturity, and consensus resource limits.

3. **Bitcoin Core block-validation implementation**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/validation.cpp  
   Supports: Header and block validation, transaction checks, UTXO updates, coinbase reward limits, witness commitments, chain connection, and rejection of invalid blocks.

4. **Bitcoin Core block-assembly implementation**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/node/miner.cpp  
   Supports: Candidate-block construction, coinbase creation, transaction package selection, dependency ordering, weight accounting, and template finalization.

5. **Bitcoin Core proof-of-work implementation**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/pow.cpp  
   Supports: Target decoding, proof-of-work checks, permitted target calculation, and the separation between hash-target compliance and full block validity.

6. **BIP 34: Block v2, Height in Coinbase**  
   Author or publisher: Gavin Andresen  
   URL: https://github.com/bitcoin/bips/blob/master/bip-0034.mediawiki  
   Supports: Encoding the block height at the beginning of the coinbase transaction's input script data.

7. **BIP 141: Segregated Witness**  
   Author or publisher: Eric Lombrozo, Johnson Lau, and Pieter Wuille  
   URL: https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki  
   Supports: Block weight, witness discounting, transaction identifiers, witness transaction identifiers, and the coinbase witness commitment.

8. **BIP 152: Compact Block Relay**  
   Author or publisher: Matt Corallo  
   URL: https://github.com/bitcoin/bips/blob/master/bip-0152.mediawiki  
   Supports: Compact-block announcements, short transaction identifiers, reconstruction from known transactions, and requests for missing transaction data.

9. **Bitcoin white paper**  
   Author or publisher: Satoshi Nakamoto  
   URL: https://bitcoin.org/bitcoin.pdf  
   Supports: Hash-linked blocks, proof-of-work chain ordering, transaction inclusion through Merkle trees, and the probabilistic treatment of later chain replacement.

10. **Bitcoin Developer Guide: Block Chain**  
    Author or publisher: Bitcoin.org contributors  
    URL: https://developer.bitcoin.org/devguide/block_chain.html  
    Supports: Block headers, transaction Merkle trees, coinbase transactions, chain linkage, target thresholds, and block validation context.

## 5. SEO title

How Bitcoin Blocks Work: Headers, Transactions, and Validation

## 6. Meta description

Learn how Bitcoin blocks combine transactions, coinbase rewards, Merkle commitments, proof of work, weight limits, and independent node validation.

## 7. Page excerpt

Bitcoin blocks link transaction batches to prior history through proof of work. See how headers, Merkle roots, coinbase transactions, weight, and node validation fit together.

## 8. Estimated reading time

11 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Parent hub: MSC-HUB-NETWORK | The Bitcoin Network
- Primary path: MSC-PATH-NETWORK | Understand the Network
- Secondary path: MSC-PATH-START | Start With Bitcoin
- Prerequisite: MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?
- Previous guide: MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?
- Next guide: MSC-GUIDE-027 | How the Bitcoin Blockchain Works
- Branch guide: MSC-GUIDE-060 | How Merkle Trees Work in Bitcoin
- Recommended continuation: MSC-GUIDE-014 | How Bitcoin Confirmations Work
- Featured route: MSC-ROUTE-001 | How a Bitcoin Transaction Moves

## 10. Accuracy review checklist

- [x] Registry metadata matches the approved registry.
- [x] Candidate blocks, proof-of-work results, valid blocks, and selected-chain blocks are separated.
- [x] The serialized block header is correctly described as 80 bytes with six fields.
- [x] Proof of work is not described as transaction or script validation.
- [x] Merkle-root and witness-commitment coverage are distinguished.
- [x] The coinbase transaction is first and its allowed value is subsidy plus fees.
- [x] Coinbase maturity uses the 100-block height rule.
- [x] Block weight is described without promising one fixed serialized byte size.
- [x] Transaction dependencies and miner ordering policy are separated from consensus fee ordering.
- [x] Block timestamps are not treated as exact trusted clocks.
- [x] Compact block relay is described as a transport optimization.
- [x] First confirmation is not described as immediate immutability.
- [x] Exact approved glossary definitions are used.
- [x] Planned internal links contain no live URLs.
- [x] No em dash or en dash character appears.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-18
- Notes:
  - Verified Bitcoin Core v31.0 block-header serialization, block structure, block weight, coinbase maturity, block assembly, proof-of-work, and full-validation behavior.
  - Verified the transaction-id Merkle root remains distinct from the SegWit witness commitment.
  - Verified coinbase height, subsidy-plus-fee limits, and the 100-block coinbase-maturity height rule.
  - Verified candidate blocks, mined blocks, valid blocks, stale blocks, and selected-chain blocks remain distinct.
  - Verified timestamps and ten-minute target spacing are not presented as exact scheduling guarantees.
  - Verified compact block relay is not described as a change to consensus validity.
  - Confirmed exact approved glossary-definition synchronization.
  - Confirmed source entries contain precise Supports notes. Moving Bitcoin Core source and RPC paths remain flagged for publication-time accessibility review.
  - Confirmed planned internal links remain inactive until real destination pages and URLs exist.

## 12. Illustration brief

### Illustration 1

- Concept title: Anatomy of a Bitcoin Block
- Educational purpose: Show the block header, coinbase transaction, transaction list, and commitments as distinct components.
- Recommended placement: After the section titled The block header is 80 bytes.
- Visual description: Old naval engineering cutaway of a block packet. The top strip is the 80-byte header with six labeled fields. Below it, the coinbase transaction appears first, followed by ordinary transactions. Lines connect the transaction set to the Merkle root and witness data to the coinbase witness commitment.
- Required labels: Version, Previous block hash, Merkle root, Timestamp, nBits, Nonce, Coinbase transaction, Transactions, Witness commitment
- Caption: A Bitcoin block combines an 80-byte header with a transaction list whose commitments are checked by validating nodes.
- Alt text: Technical cutaway of a Bitcoin block showing the six header fields, coinbase transaction, ordinary transactions, Merkle root, and witness commitment.
- Image orientation: Landscape
- Mobile crop notes: Stack the header above the transaction list and keep all six header labels inside the center crop.
- Status: PLANNED

### Illustration 2

- Concept title: From Candidate to Accepted Block
- Educational purpose: Separate mining from node validation and chain selection.
- Recommended placement: After the section titled Candidate blocks, mined blocks, and accepted blocks are different stages.
- Visual description: Field-guide process with four stations: Build candidate, Search proof of work, Validate complete block, Compare valid chainwork. Invalid routes leave the validation station, while a valid route reaches the selected-chain track.
- Required labels: Candidate block, Header hashing, Target met, Node validation, Invalid block rejected, Valid candidate chain, Accumulated work, Selected chain
- Caption: Finding proof of work allows a block to be submitted, but nodes still validate the complete block before chain selection.
- Alt text: Process diagram showing a candidate Bitcoin block moving through proof-of-work hashing, full node validation, and accumulated-work chain selection.
- Image orientation: Landscape
- Mobile crop notes: Use one vertical path with the invalid rejection branch placed beside the node-validation stage.
- Status: PLANNED

### Illustration 3

- Concept title: Two Commitments Inside a SegWit Block
- Educational purpose: Distinguish the header Merkle root from the coinbase witness commitment.
- Recommended placement: After the section titled SegWit adds a witness commitment.
- Visual description: Oceanographic dual-channel diagram. One channel gathers transaction identifiers into the header Merkle root. The second gathers witness transaction identifiers into a witness Merkle root that feeds a commitment output in the coinbase transaction.
- Required labels: Transaction IDs, Header Merkle root, Witness transaction IDs, Witness Merkle root, Reserved value, Coinbase commitment
- Caption: SegWit blocks use the header Merkle root for transaction identifiers and a coinbase output for the witness commitment.
- Alt text: Dual commitment diagram showing transaction IDs forming the block-header Merkle root and witness transaction IDs forming a coinbase witness commitment.
- Image orientation: Landscape
- Mobile crop notes: Stack the transaction and witness channels vertically and keep their two destination commitments aligned on the right.
- Status: PLANNED
