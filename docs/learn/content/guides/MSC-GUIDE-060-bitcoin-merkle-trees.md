---
registry_id: MSC-GUIDE-060
status: COPY_LOCKED
page_role: topic-guide
h1: How Merkle Trees Work in Bitcoin
handle: bitcoin-merkle-trees
category: Bitcoin Development
subcategory: Cryptography
depth: Deep
format: Technical Explainer
primary_path: Build on Bitcoin
secondary_paths:
  - Understand the Network
author_display: Mempool Surf Club Editorial
reviewed_date: 2026-07-26
copy_locked_date: 2026-07-26
---

# How Merkle Trees Work in Bitcoin

## 1. Introductory deck

Bitcoin uses several tree-shaped commitment systems with different rules. A block header commits to a transaction Merkle root built from txids; SegWit adds a witness Merkle root committed through the coinbase transaction; BIP 37 defines partial Merkle proofs; and Taproot commits to optional scripts with tagged leaf and branch hashes. A proof can establish inclusion in a committed tree, but it does not by itself prove transaction validity, an unspent output, confirmation finality, or the current UTXO set.

## 2. Full article

A Merkle tree compresses commitments to many items into one root hash. Leaves represent items. Pairs of child hashes are combined into parent hashes until one root remains. A proof can then show that one leaf contributes to that root without transmitting every other leaf.

Bitcoin uses this pattern in more than one place, but the constructions are not interchangeable. The transaction Merkle tree, witness Merkle tree, BIP 37 partial Merkle tree, and Taproot script tree use different leaves, commitments, and validation rules.

This guide was researched on July 25, 2026 against BIPs 37, 141, 341, and 342 and Bitcoin Core 31.1 at tag `v31.1`, commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`. Historical mutation behavior is described from Bitcoin Core’s current consensus Merkle implementation and its tests.

### The transaction Merkle root

Every Bitcoin block header includes a 32-byte `hashMerkleRoot` field. That value commits to the ordered list of transaction identifiers in the block.

Bitcoin Core constructs the root by:

1. computing or taking each transaction’s `txid`;
2. preserving block order, beginning with the coinbase transaction;
3. pairing adjacent 32-byte hashes;
4. concatenating each pair in the algorithm’s internal byte order;
5. applying double SHA-256 to create the parent;
6. repeating until one hash remains.

The leaf is the `txid` itself. The transaction is not hashed a third time as a special “leaf hash.” Its identifier is already the double SHA-256 of the non-witness serialization.

The resulting Merkle root is placed in the block header. Because the block identifier and proof of work hash the serialized header, proof of work indirectly commits to that transaction root.

### Order matters

The tree commits to an ordered transaction list. Swapping two leaves generally changes parent hashes and the root.

A proof must therefore include not only sibling hashes but enough position information to determine whether each sibling belongs on the left or right. Hashing `left || right` is different from hashing `right || left`.

Human-facing transaction and block identifiers are usually displayed with reversed byte order relative to their serialized internal bytes. Merkle documentation must be explicit about whether a diagram shows conventional display hex or bytes fed into the hashing routine.

### Odd-node duplication

When a level has an odd number of nodes, Bitcoin duplicates the final node and hashes the pair:

`parent = double_sha256(last || last)`

This is a historical Bitcoin rule. It is not a universal property of Merkle trees and should not be copied into a new design without understanding its consequences.

The duplication repeats at any odd level, not only at the transaction-leaf level. Bitcoin Core’s `ComputeMerkleRoot` appends the final hash when the level size is odd and then performs pairwise double-SHA-256.

### A small example

Suppose a block has transaction leaves `A`, `B`, and `C`, where each letter represents a 32-byte txid in internal byte order.

The first level is:

- `P1 = H(A || B)`
- `P2 = H(C || C)`

The root is:

- `Root = H(P1 || P2)`

where `H` means double SHA-256.

A proof for `B` needs:

- `A`, because `B` is the right child paired with `A`;
- `P2`, because the `A/B` parent is the left child at the root level;
- the position information indicating these left/right relationships.

The verifier computes `P1`, then the root, and compares it with the header’s Merkle root.

### What an inclusion proof establishes

If a verifier already trusts or has validated a block header, a correct Merkle branch can establish that a given txid is included in the transaction list committed by that header, assuming the hash construction’s relevant security properties.

That statement has boundaries.

A Merkle proof does not by itself prove:

- the transaction is valid under Bitcoin consensus;
- the block is valid under all consensus rules;
- the block belongs to the best valid chain;
- the transaction’s inputs were unspent;
- the transaction has a particular number of confirmations;
- the transaction cannot be reorganized out;
- the recipient controls an output;
- the transaction remains economically final.

A fully validating node checks the transaction, scripts, amounts, lock rules, block structure, proof of work, chain history, and UTXO transitions. A Merkle branch is only one commitment proof inside that larger process.

### Proof size

For a balanced binary tree with `N` leaves, an inclusion branch needs roughly one sibling hash per tree level, so proof size grows logarithmically with `N`.

For example, doubling the number of transactions generally adds only one additional 32-byte sibling to a simple branch. This is the efficiency benefit: a verifier can connect one transaction to a root without receiving the full block.

The actual message also needs position data, the transaction or txid being proved, and the block header or another trusted root. BIP 37 partial Merkle trees may include more hashes than a single branch because they can prove multiple matched transactions together.

### Inclusion, confirmation, and finality

A transaction is **included** when it appears in a block’s committed transaction list.

It has one **confirmation** when that valid block is part of the best chain as evaluated by a node. Each valid descendant block increases the confirmation count.

“Finality” in Bitcoin is economic and probabilistic rather than a Merkle-tree property. A chain reorganization can remove a previously included transaction from the best chain. The practical cost and likelihood of a reorganization generally change with accumulated proof of work and circumstances, but no Merkle branch turns a confirmation into an irreversible guarantee.

A proof anchored to an orphaned or invalid block header can remain mathematically correct for that header while no longer demonstrating inclusion in the node’s active chain.

### The historical mutation issue

Bitcoin’s odd-node duplication creates an ambiguity when duplicate transaction identifiers appear in specific positions. Bitcoin Core’s source documents the historical issue associated with CVE-2012-2459.

Consider a level ending in two identical real child hashes. That pair can produce the same parent as a shorter level where the final child is duplicated by the odd-node rule. Under certain transaction-list patterns, distinct lists can therefore produce the same root without requiring a break of double SHA-256.

The practical historical danger involved invalid-block caching. A node could receive a mutated version with the same header hash and Merkle root, mark that block invalid, and then incorrectly reject the unmutated version.

This is a structural ambiguity in the tree algorithm, not a discovered SHA-256 collision.

### Bitcoin Core mutation detection

Bitcoin Core 31.1 detects mutation while reducing each level. Before duplicating a final odd node, it checks whether any actual adjacent pair at that level contains identical hashes. If so, it marks the tree as mutated.

Block validation checks the computed root and the mutation flag. A mutated transaction tree is rejected.

The detection rule distinguishes:

- an identical pair that actually appeared in the list before odd duplication;
- the normal artificial duplicate added solely because a level had odd length.

Bitcoin Core’s source notes that, assuming no double-SHA-256 collisions, this detects the known transaction-list changes that preserve the root through the duplicate-node ambiguity.

The warning remains relevant to implementers. Reimplementing only the root calculation without mutation detection can reproduce the commitment but omit a consensus-critical validation boundary.

### Duplicate transactions and other validity rules

Mutation detection is not the only protection around duplicate data. Bitcoin consensus and transaction rules impose other constraints, and a block containing duplicate transactions or duplicate-spend behavior can fail for reasons independent of the Merkle tree.

The Merkle root function should not be expected to enforce all transaction validity. It consumes identifiers and produces a commitment plus mutation information. Block validation applies the rest.

This separation illustrates a recurring rule: a cryptographic commitment does not validate the semantics of what was committed.

### The witness Merkle tree

SegWit introduced a separate commitment to witness data. The ordinary transaction Merkle root still uses `txid` leaves, which exclude witness data. A witness tree uses `wtxid` leaves, which commit to witness-inclusive transaction serialization when witness data exists.

Bitcoin Core’s `BlockWitnessMerkleRoot` uses:

- a 32-byte zero value for the coinbase transaction’s witness leaf;
- each non-coinbase transaction’s `wtxid` for the remaining leaves;
- the same pairwise double-SHA-256 and odd-duplication tree algorithm.

The coinbase’s actual `wtxid` is not used as its leaf. BIP 141 explicitly defines the coinbase witness transaction identifier as all zeroes for this tree.

### The witness commitment

The witness Merkle root is not placed directly in the block header. Instead, it is combined with a 32-byte witness reserved value from the coinbase input’s witness:

`commitment = double_sha256(witness_root || witness_reserved_value)`

The commitment is placed in a coinbase output script beginning with:

`OP_RETURN 0x24 aa21a9ed`

followed by the 32-byte commitment. If multiple outputs match the pattern, the highest-index matching output is used. A witness commitment is required when the block contains any transaction with nonempty witness data. If every transaction has empty witness data, the commitment output is optional; when a matching commitment is present, the commitment and coinbase witness rules still apply. When a witness commitment is required, the coinbase input’s witness must contain exactly one 32-byte reserved value.

Because the coinbase transaction’s `txid` is a leaf of the ordinary transaction Merkle tree, the block header commits to the coinbase transaction, which contains the witness commitment. This links witness data to the header without placing another root directly in the header.

The reserved value provides an extension point in the commitment construction. In currently deployed BIP 141 validation, it is included exactly as specified; it should not be described as arbitrary unused padding.

### Why there are two roots

The transaction Merkle root preserves the pre-SegWit block-header structure and commits to transaction identifiers that exclude witness data. The witness commitment separately binds the witness-inclusive identifiers.

This separation supports SegWit’s compatibility design. It also means:

- a transaction’s `txid` and `wtxid` may differ;
- the transaction Merkle root and witness Merkle root are different;
- witness-only changes affect the `wtxid` and witness commitment, not the legacy `txid`;
- a transaction inclusion proof using the header Merkle root proves inclusion of the `txid`, not a standalone proof of its witness bytes.

A verifier that needs the witness must validate the witness commitment and relevant transaction data, not rely only on a txid Merkle branch.

### Partial Merkle trees under BIP 37

BIP 37 introduced Bloom-filtered block serving and the `merkleblock` message for simplified payment verification clients. A `merkleblock` includes:

- a block header;
- the total transaction count;
- a depth-first list of selected hashes;
- packed flag bits describing which branches are expanded.

The partial tree lets the receiver reconstruct the full transaction Merkle root while extracting txids that matched the peer’s Bloom filter. Branches unrelated to matches can be represented by a single interior hash.

BIP 37 parsing rejects a partial tree when two explicitly provided child hashes are identical in a position that would reproduce the mutation ambiguity. Bitcoin Core’s partial-tree implementation also checks structural limits and whether all supplied hashes and bits were consumed appropriately.

### BIP 37 privacy limitations

BIP 37’s Bloom filters can have false positives, which were intended to trade bandwidth for some uncertainty. However, a serving peer observes the filter, matched transactions, filter updates, connection metadata, and repeated queries. Accurate filters can reveal wallet-related keys, scripts, and transactions; broader filters consume more bandwidth without guaranteeing privacy.

BIP 37 also permits lying by omission. A peer can omit a relevant transaction even if it cannot fabricate a valid inclusion proof for a transaction absent from the block.

An SPV client that checks header proof of work and Merkle inclusion still does not reproduce full validation. It relies on assumptions about chain selection, peers, and the validity of blocks and transactions it does not independently verify.

Bitcoin Core’s current support and default service policy for BIP 37 are implementation- and configuration-specific. The deployed BIP remains useful for understanding partial Merkle trees, but current wallet protocols should not be assumed to use it.

### The Bitcoin paper’s SPV model

The Bitcoin paper describes a simplified verification model that keeps block headers, follows the chain with the most proof of work, and obtains a Merkle branch linking a transaction to a block.

The model provides evidence that a transaction was accepted into a proof-of-work chain under the client’s assumptions. It does not give the same guarantees as validating every block and transaction. An attacker who can isolate the client, withhold information, or present an invalid high-work chain can exploit what the client does not check.

Modern lightweight-client designs may use other filters and peer strategies, but a Merkle proof alone never fills the full-validation gap.

### Taproot script trees

Taproot can commit to optional scripts in a tree often called a tap tree. The construction differs from the block transaction tree.

A Taproot leaf commits to:

- a leaf version;
- the compact-size length of the script;
- the script bytes.

The tapleaf hash is:

`TapLeaf = tagged_hash("TapLeaf", leaf_version || compact_size(script_length) || script)`

A branch parent is:

`TapBranch = tagged_hash("TapBranch", min(a, b) || max(a, b))`

where the two 32-byte child hashes are ordered lexicographically before concatenation. Because of this sorting, left-versus-right position is not carried in the same way as a transaction Merkle branch.

The final script-tree root is included in the Taproot tweak applied to an internal x-only public key. The output key therefore commits to both the internal key and the optional script tree.

### Control blocks and revealed branches

A Taproot script-path spend reveals:

- the tapscript;
- the control block;
- the witness data needed by the script.

The control block contains:

- a leaf version combined with the output-key parity bit;
- the 32-byte internal x-only public key;
- zero or more 32-byte sibling hashes forming the Merkle path.

The verifier recomputes the tapleaf hash, combines it with each branch sibling using lexicographic ordering and the `TapBranch` tag, computes the Taproot tweak, and confirms that the resulting output key matches the witness program and parity.

Only the executed leaf and its branch need to be revealed. Unused leaves can remain hidden, subject to what can be inferred from the revealed path, tree shape, wallet behavior, and other transaction information.

### Taproot trees are not block transaction trees

The differences are structural:

| Property | Block transaction tree | Taproot script tree |
|---|---|---|
| Leaves | txids | Tagged leaf-version-and-script hashes |
| Parent hash | Double SHA-256 | Tagged single SHA-256 |
| Child order | Positional left then right | Lexicographically sorted |
| Odd rule | Duplicate final node | Tree is constructed from chosen binary branches; no block-style odd duplication rule |
| Root commitment | Direct field in block header | Included in tweak of an x-only output key |
| Proof purpose | Transaction inclusion in a block | Reveal one committed script path |
| Mutation handling | Bitcoin-specific duplicate-pair detection | Different construction; block mutation rule does not apply |

Calling both “Merkle trees” is useful at a high level, but implementations must use the exact construction for the exact context.

### Merkleized scripts versus transaction inclusion

A Taproot control block proves that a revealed script leaf was committed by the output key, assuming the tweak and hash construction. It does not prove that a transaction containing that output was confirmed.

Conversely, a block Merkle branch can prove that a transaction identifier was included under a block root. It does not reveal or prove an unused Taproot script path.

A complete script-path spend validation may involve both layers:

- the transaction must be valid and included in a block;
- the input witness must reveal a valid Taproot path and satisfy the tapscript;
- the block and chain must satisfy consensus and proof-of-work rules.

### The transaction root does not commit to the UTXO set

The block header’s transaction Merkle root commits to the ordered transactions in that block. It does not directly commit to:

- the UTXO set before the block;
- the UTXO set after the block;
- account balances;
- address balances;
- wallet ownership labels;
- spent-status proofs for arbitrary outputs.

A fully validating node derives its UTXO state by processing valid blocks in order and applying spends and creations. Bitcoin Core maintains implementation-specific databases and caches for this state, but the current UTXO set is not the leaf set of the block transaction Merkle tree.

Proposals and research have considered UTXO commitments and accumulators, but they should not be described as deployed merely because Bitcoin already uses Merkle trees elsewhere.

### Confirmation proofs require chain context

To claim that a transaction has a certain number of confirmations, a verifier needs more than one Merkle branch. It needs:

- the block header containing the committed root;
- evidence that the header is part of a valid chain;
- descendant headers or validated blocks;
- the node’s chain-selection result;
- awareness of reorganizations and competing branches.

Header proof of work is necessary but not sufficient for full validation. Invalid blocks can have valid proof of work. A fully validating node also checks version and target rules, timestamps, Merkle mutation, witness commitment, transaction validity, scripts, subsidy and fees, and all applicable consensus rules.

### Endianness and proof serialization

A Merkle proof implementation frequently fails not because of SHA-256 but because of byte-order assumptions.

Common distinctions include:

- displayed txid hex versus internal 32-byte hash order;
- little-endian integer serialization inside transactions and headers;
- direct byte concatenation of 32-byte hash objects;
- reversal for human display;
- left/right branch order for block trees;
- lexicographic byte comparison for Taproot branches.

Test vectors should be reproduced byte for byte. A diagram that reverses hashes for readability should say so.

### Test and fuzz evidence

Bitcoin Core’s Merkle unit tests cover roots, branches, odd leaf counts, duplicate-child mutation cases, and path reconstruction. Partial Merkle-tree tests cover serialization, extraction, malformed structures, and duplicate-branch rejection. Fuzz targets exercise Merkle-block parsing and branch behavior with generated inputs.

Witness-commitment functional tests cover coinbase reserved values, matching output selection, malformed commitments, and witness data. Taproot functional and wallet vectors cover tapleaf, branch, tweak, control-block, and script-path validation.

Tests provide reproducible evidence that an implementation follows specified cases. They do not prove the entire implementation or construction is free from defects.

### A Merkle-proof checklist

When evaluating a “Merkle proof,” ask:

- Which tree is this: transaction, witness, partial transaction, or Taproot script?
- What exactly are the leaves?
- Which hash construction is used for leaves and parents?
- Are child hashes positional or sorted?
- Is there an odd-node duplication rule?
- What root is trusted, and how is it committed?
- Does the proof establish inclusion only, or is separate script and transaction validation performed?
- Is the header in the active valid chain?
- How many confirmations are established, and under which node’s chain view?
- Does the claim incorrectly infer UTXO state, ownership, or irreversibility?
- Which implementation version and tests reproduce the proof?

Merkle trees make compact commitments possible. They do not collapse Bitcoin’s validation system into one root hash.

## 3. Key Terms

- **Merkle tree:** Tree of hash commitments reducing many leaves to one root.
- **Merkle root:** Top hash committing to the tree’s leaves under a defined construction.
- **Leaf:** Base item or base hash included in the tree.
- **Merkle branch:** Sibling hashes and position information used to connect one leaf to a root.
- **Inclusion proof:** Proof that a leaf contributes to a committed root under the tree rules.
- **Transaction Merkle root:** Block-header field committing to the ordered txids in a block.
- **Odd-node duplication:** Bitcoin transaction-tree rule that duplicates the final node at an odd level.
- **Mutation:** Bitcoin-specific ambiguity where certain duplicate transaction-list patterns can produce the same root.
- **Witness Merkle root:** Root built from zero for the coinbase leaf and non-coinbase wtxids.
- **Witness reserved value:** 32-byte coinbase witness value combined with the witness root.
- **Witness commitment:** Double-SHA-256 commitment to witness root and reserved value in a coinbase output.
- **Partial Merkle tree:** Compact BIP 37 representation proving one or more matched txids.
- **SPV:** Simplified verification model using headers and inclusion proofs without full transaction validation.
- **Tapleaf:** Tagged hash committing to a Taproot leaf version and script.
- **TapBranch:** Tagged hash of two lexicographically ordered Taproot child hashes.
- **Control block:** Taproot script-path data carrying internal key, parity, leaf version, and branch hashes.
- **UTXO set:** Current set of unspent transaction outputs derived by full validation; not the block transaction tree’s leaves.
- **Confirmation:** Inclusion in a block on the active chain plus descendant chain context.
- **Economic finality:** Practical confidence against reversal; not a property established by a Merkle branch alone.

## 4. Sources

1. **Bitcoin: A Peer-to-Peer Electronic Cash System** | Satoshi Nakamoto
   - URL: https://bitcoin.org/bitcoin.pdf
   - Supports: Block transaction trees, simplified payment verification, headers, inclusion branches, and proof-of-work chain context.
2. **BIP 37 — Connection Bloom Filtering** | Mike Hearn, Matt Corallo
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0037.mediawiki
   - Supports: Partial Merkle-tree format, matched transaction extraction, Bloom-filter privacy tradeoffs, omission boundary, and SPV use.
3. **BIP 141 — Segregated Witness** | Eric Lombrozo, Johnson Lau, Pieter Wuille
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki
   - Supports: wtxid leaves, zero coinbase leaf, witness root, reserved value, coinbase commitment format, requirement boundary, and highest-index matching-output rule.
4. **BIP 341 — Taproot: SegWit Version 1 Spending Rules** | Pieter Wuille, Jonas Nick, Anthony Towns
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki
   - Supports: TapLeaf, TapBranch, lexicographic branch ordering, TapTweak, control-block proof, and output-key commitment.
5. **BIP 342 — Validation of Taproot Scripts** | Pieter Wuille, Jonas Nick, Anthony Towns
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0342.mediawiki
   - Supports: Tapscript leaf-version and script-path execution boundaries.
6. **CVE-2012-2459** | National Vulnerability Database
   - URL: https://nvd.nist.gov/vuln/detail/CVE-2012-2459
   - Supports: Historical duplicate-transaction Merkle-tree denial-of-service vulnerability record.
7. **Bitcoin Core 31.1 Tag Commit** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/commit/9be056a8a72b624dae9623b2f7bded92c2a21c91
   - Supports: Exact implementation version reviewed July 25, 2026.
8. **Bitcoin Core 31.1 Consensus Merkle Implementation** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/consensus/merkle.cpp
   - Supports: txid leaves, pairwise double-SHA-256, odd duplication, mutation detection, witness leaves, and path construction.
9. **Bitcoin Core 31.1 Consensus Merkle Interface** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/consensus/merkle.h
   - Supports: Root, mutation, witness-root, and transaction-path interfaces.
10. **Bitcoin Core 31.1 Block Primitives** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/primitives/block.h
    - Supports: Block-header Merkle-root field and block data structure.
11. **Bitcoin Core 31.1 Transaction Primitives** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/primitives/transaction.cpp
    - Supports: txid and wtxid construction used as leaves.
12. **Bitcoin Core 31.1 Block Validation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/validation.cpp
    - Supports: Merkle-root validation, mutation rejection, witness-commitment requirement and validation, and chain-context boundaries.
13. **Bitcoin Core 31.1 Partial Merkle Tree Interface** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/merkleblock.h
    - Supports: Partial-tree structure, serialized fields, matched bits, and extraction interface.
14. **Bitcoin Core 31.1 Partial Merkle Tree Implementation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/merkleblock.cpp
    - Supports: Depth-first construction, extraction, duplicate-child rejection, and malformed-tree checks.
15. **Bitcoin Core 31.1 Merkle Unit Tests** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/test/merkle_tests.cpp
    - Supports: Roots, paths, odd nodes, duplicate mutation cases, and branch reconstruction.
16. **Bitcoin Core 31.1 Merkle Block Tests** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/test/merkleblock_tests.cpp
    - Supports: Partial Merkle construction, extraction, serialization, and malformed cases.
17. **Bitcoin Core 31.1 Merkle Block Fuzz Target** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/test/fuzz/merkleblock.cpp
    - Supports: Generated-input parsing and structural test evidence.
18. **Bitcoin Core 31.1 SegWit Functional Test** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/test/functional/p2p_segwit.py
    - Supports: Coinbase reserved value, witness root, commitment requirement and output selection, malformed cases, and validation behavior.
19. **Bitcoin Core 31.1 Taproot Functional Test** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/test/functional/feature_taproot.py
    - Supports: Script trees, control blocks, branch paths, leaf versions, parity, and script-path validation.
20. **Bitcoin Core 31.1 BIP 341 Wallet Vectors** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/test/data/bip341_wallet_vectors.json
    - Supports: Tapleaf, branch, tweak, output-key, and control-block construction vectors.
21. **Bitcoin Core 31.1 Script Interpreter** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/interpreter.cpp
    - Supports: TapLeaf and TapBranch tagged-hash construction and control-block verification.
22. **Bitcoin Core 31.1 Hash Primitives** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/hash.h
    - Supports: Double-SHA-256 and tagged-hash helper constructions used by the trees.
23. **Bitcoin Core 31.1 Chainstate Documentation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/design/assumeutxo.md
    - Supports: Separation between block commitments, chainstate, and UTXO-set handling in Bitcoin Core.
24. **BIP 158 — Compact Block Filters for Light Clients** | Olaoluwa Osuntokun, Alex Akselrod
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0158.mediawiki
    - Supports: A separate modern compact-filter construction and the boundary from BIP 37 partial Merkle proofs.

## 5. SEO title

How Merkle Trees Work in Bitcoin | Mempool Surf Club

## 6. Meta description

Learn how Bitcoin transaction, witness, partial, and Taproot trees work—and what inclusion proofs do not prove about validity, UTXOs, confirmations, or finality.

## 7. Page excerpt

Trace Bitcoin’s transaction Merkle root, SegWit witness commitment, BIP 37 partial proofs, and Taproot script trees without confusing inclusion with validity.

## 8. Estimated reading time

20 to 23 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-059 | How Hash Functions Work in Bitcoin
- Next: MSC-GUIDE-061 | How Bitcoin RPC Works
- Prerequisite: MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
- Prerequisite: MSC-GUIDE-014 | How Bitcoin Confirmations Work
- Prerequisite: MSC-GUIDE-017 | How Bitcoin Mining Works
- Prerequisite: MSC-GUIDE-055 | How Taproot Changed Bitcoin
- Prerequisite: MSC-GUIDE-056 | How SegWit Changed Bitcoin
- Branch: MSC-GUIDE-021 | What Is a Bitcoin Full Node?
- Branch: MSC-GUIDE-059 | How Hash Functions Work in Bitcoin
- Return: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] Transaction leaves, pairwise double-SHA-256, order, odd-node duplication, and header commitment are explained.
- [x] Inclusion, transaction validity, block validity, confirmation, active-chain membership, economic finality, ownership, and UTXO state remain distinct.
- [x] CVE-2012-2459 is described as a structural duplicate-node ambiguity rather than a SHA-256 collision.
- [x] Bitcoin Core’s mutation detection distinguishes actual duplicate siblings from artificial odd-node duplication.
- [x] Witness tree leaves, zero coinbase wtxid, reserved value, commitment hash, requirement boundary, and coinbase output format are correct.
- [x] BIP 37 partial-tree format, omission boundary, privacy limitations, and SPV validation gap are qualified.
- [x] TapLeaf, TapBranch, lexicographic ordering, TapTweak, control blocks, and script-tree privacy boundaries remain distinct from block trees.
- [x] The block transaction root is not described as a UTXO-set commitment.
- [x] Endianness, proof serialization, and test-vector boundaries are identified.
- [x] Bitcoin Core implementation and test claims are pinned to 31.1 and dated July 25, 2026.
- [x] No Merkle proof is described as an irreversible or complete validation proof.
- [x] Planned internal links remain inactive and do not imply publication.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-26
- Primary evidence reviewed: The Bitcoin white paper; BIPs 37, 141, 158, 341, and 342; CVE-2012-2459; Bitcoin Core `v31.1` commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`; `src/consensus/merkle.cpp`, `src/consensus/merkle.h`, `src/primitives/block.h`, `src/primitives/transaction.cpp`, `src/validation.cpp`, `src/merkleblock.h`, `src/merkleblock.cpp`, `src/script/interpreter.cpp`, `src/hash.h`, and `doc/design/assumeutxo.md`; `src/test/merkle_tests.cpp`, `src/test/merkleblock_tests.cpp`, `src/test/fuzz/merkleblock.cpp`, `test/functional/p2p_segwit.py`, `test/functional/feature_taproot.py`, and `src/test/data/bip341_wallet_vectors.json`.
- Material corrections made: Confirmed ordered txid leaves, pairwise double-SHA-256, internal byte order, odd-node duplication, proof positions, logarithmic branch growth, and header commitment; reproduced CVE-2012-2459 mutation detection and its tests; added the exact witness-commitment requirement boundary for blocks with and without witness data while preserving the reserved value and highest-index output rule; confirmed BIP 37 traversal, flag, omission, and privacy limits; and retained the separation among transaction inclusion, validity, active-chain confirmation, economic finality, UTXO state, and Taproot script commitments.
- Remaining sensitivities: Inclusion claims depend on a trusted or independently validated root and the assumed hash properties; active-chain and confirmation conclusions depend on the verifier’s chain view; BIP 37 service behavior remains implementation- and configuration-specific; Taproot wallet tree construction and control-block production are product-specific; and future commitment or accumulator proposals are not deployed merely because related research exists.
- Renewal requirement: Future BIP changes, Bitcoin Core releases, consensus-validation changes, light-client protocol changes, Taproot implementation changes, or material hash-analysis results require renewed verification. Human Verification does not authorize copy-lock.

## 12. Illustration brief

### Illustration 1

- Concept title: The Block Transaction Tree Plate
- Educational purpose: Show txid leaves, pairwise double-SHA-256, odd-node duplication, branch proof, and header root.
- Recommended placement: After A small example.
- Visual description: Vintage engineering plate with five ordered transaction leaves; the fifth is duplicated at the first level, one transaction’s proof path is highlighted, and the root feeds into a labeled block-header field.
- Required labels: Ordered txids, Double SHA-256, Odd-node duplicate, Sibling hash, Merkle branch, Merkle root, Block header
- Caption: Bitcoin’s block tree commits to ordered txids and duplicates the final node at odd levels.
- Alt text: Technical diagram of a Bitcoin transaction Merkle tree with five txid leaves, odd-node duplication, an inclusion branch, and the block-header root.
- Image orientation: Landscape
- Mobile crop notes: Preserve one highlighted branch from leaf to header root.
- Status: PLANNED

### Illustration 2

- Concept title: SegWit’s Nested Witness Commitment
- Educational purpose: Explain how the witness tree reaches the block header through the coinbase transaction.
- Recommended placement: After Why there are two roots.
- Visual description: Layered nautical cutaway: non-coinbase wtxids plus a zero coinbase leaf form the witness root; the root combines with the reserved value; the commitment enters a coinbase OP_RETURN output; the coinbase txid then enters the ordinary transaction tree and block header.
- Required labels: Coinbase leaf = zero, wtxids, Witness Merkle root, Witness reserved value, Double SHA-256, Coinbase commitment output, Coinbase txid, Transaction Merkle root, Block header
- Caption: SegWit binds witness data to the header through a commitment carried inside the coinbase transaction.
- Alt text: Layered diagram showing the witness Merkle root and reserved value committed in the coinbase, then included through the transaction Merkle root.
- Image orientation: Landscape
- Mobile crop notes: Use a vertical nested-commitment flow with the block header at the top.
- Status: PLANNED

### Illustration 3

- Concept title: Four Trees, Four Proofs
- Educational purpose: Prevent confusion among block transaction, witness, BIP 37 partial, and Taproot script trees.
- Recommended placement: After Taproot trees are not block transaction trees.
- Visual description: Four-panel vintage cartographic comparison: ordered txid tree, zero-coinbase wtxid tree, pruned BIP 37 partial tree with flags, and lexicographically sorted tagged Taproot script tree with a control block.
- Required labels: Transaction tree, Witness tree, Partial Merkle tree, Taproot script tree, txid, wtxid, Flags, TapLeaf, TapBranch, Control block, Inclusion, Script reveal
- Caption: Bitcoin’s tree constructions share a compression idea but differ in leaves, hashing, ordering, commitment location, and proof meaning.
- Alt text: Comparison of Bitcoin transaction, witness, partial, and Taproot script tree constructions.
- Image orientation: Landscape
- Mobile crop notes: Arrange as a two-by-two grid with one identifying rule under each panel.
- Status: PLANNED
