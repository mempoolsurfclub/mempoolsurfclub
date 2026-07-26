---
registry_id: MSC-GUIDE-060
status: EDITORIAL_REVIEW
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
reviewed_date: null
copy_locked_date: null
---

# How Merkle Trees Work in Bitcoin

## 1. Introductory deck

Bitcoin uses several tree and proof constructions that serve different purposes. A block header commits to ordered transaction IDs through a double-SHA-256 Merkle tree; SegWit adds a separate witness tree and commitment; BIP 37 defines partial Merkle proofs; and Taproot uses tagged TapLeaf and TapBranch hashes for hidden scripts. None of these proofs alone establishes transaction validity, irreversible finality, or the current UTXO set.

## 2. Full article

A Merkle tree combines many leaf values into one root commitment. Someone who knows the root can verify a leaf’s inclusion using a branch of sibling hashes rather than receiving every leaf. The usefulness comes from the structure around the hash: leaf definition, ordering, parent construction, duplicate handling, and the meaning assigned to the root.

Bitcoin does not use one universal tree format. This guide was researched on July 25, 2026 against BIPs 37, 141, and 341 and Bitcoin Core 31.1 at tag `v31.1`, commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`.

### The transaction Merkle root

Every Bitcoin block header contains a 32-byte Merkle-root field. That root commits to the block’s ordered list of transactions through their transaction identifiers, or txids.

The block header does not contain the full transactions. Nodes receive or reconstruct the block body, calculate the tree, and verify that its root matches the header. A mismatch means the body is not the transaction set committed by that header.

### Transaction leaves and pairwise hashing

The leaf values are the internal 32-byte txid hashes of transactions in block order. At each level, adjacent values are concatenated and double SHA-256 hashed:

`parent = SHA256(SHA256(left || right))`

Parents are paired again until one root remains. Order matters: swapping leaves or children changes the resulting root.

Displayed txids are normally shown with reversed byte order relative to the internal byte sequence used in serialization and hashing. Implementations and diagrams must state which representation they use.

### Odd-node duplication

If a tree level contains an odd number of nodes, Bitcoin duplicates the final node and hashes it with itself. For five leaves, the fifth leaf is paired with another copy of itself at the first level. The same rule applies at any later odd level.

This duplication rule is specific to the block transaction and witness tree construction. It should not be assumed for Taproot script trees.

### A compact example

Suppose a block contains txids `A`, `B`, `C`, `D`, and `E`. The first parent level is:

- `H(A || B)`
- `H(C || D)`
- `H(E || E)`

where `H` means double SHA-256. If the next level is odd, its final parent is duplicated again. The root commits to both the txids and their order.

### Merkle proofs

A Merkle inclusion proof contains the target leaf’s position and one sibling hash for each tree level. The verifier repeatedly combines the current value with the sibling on the correct left or right side until it computes a candidate root.

If that candidate equals the block header’s root, the proof shows that the leaf is included in the committed ordered tree—assuming the header and proof data are interpreted under the same construction.

A proof does not by itself show that the transaction’s scripts are valid, its inputs exist and are unspent, its values balance, or the block satisfies every consensus rule. Those claims require block and transaction validation.

### Efficient proof size

A balanced binary tree with `N` leaves has a branch length that grows approximately with `log2(N)`. This makes inclusion proofs compact compared with sending all transactions.

Compactness is not the same as trustlessness. A client still needs a trustworthy way to obtain and evaluate the block header chain, the proof, and the relevant consensus context.

### Inclusion, confirmation, and finality

An inclusion proof tied to a block header shows commitment to one block. A **confirmation** means that block is in the chain a node currently considers best under proof-of-work and consensus rules. Additional confirmations mean more work has accumulated on top.

Bitcoin does not have an absolute cryptographic finality point in which reorganization becomes mathematically impossible. Reorganization risk generally decreases as more work accumulates, but an inclusion proof alone does not measure chain work, validate the chain, or guarantee economic finality.

### Historical mutation issue

Bitcoin’s odd-node duplication creates an ambiguity when a tree ends with two identical hashes. A list ending in `X` can produce the same Merkle root as a list ending in `X, X` at the affected level. Historically, this interacted with duplicate-transaction handling and block-processing caches in the issue commonly associated with CVE-2012-2459.

The hash function was not broken. The problem arose from the tree construction allowing different leaf lists to map to the same root through duplicate handling, plus surrounding implementation behavior.

### Bitcoin Core mutated-tree detection

Bitcoin Core’s `ComputeMerkleRoot` checks for equal adjacent hashes before applying the odd-node duplication step. If an equal pair is found in the original level data, the function can report the tree as mutated.

The implementation deliberately checks before appending the duplicated odd node so normal odd-node handling is not itself flagged. Mutation detection is one validation defense; other consensus rules, including transaction uniqueness and block validity checks, remain separate.

### Duplicate transactions and validity

A duplicated txid in a block can conflict with rules independently of the Merkle root. A full node validates the transaction list, coinbase placement, inputs, values, scripts, weight, and other block requirements.

The correct conclusion is not that “Merkle roots are unsafe.” It is that tree encodings can have structural edge cases, and secure validation must combine commitment checks with all applicable consensus rules.

### The witness Merkle tree

SegWit introduced a second tree based on witness transaction identifiers, or wtxids. For non-coinbase transactions, leaves commit to witness serialization. The coinbase transaction’s witness leaf is defined as 32 zero bytes rather than its actual wtxid.

The witness tree uses the same pairwise double-SHA-256 and odd-node duplication method as the transaction tree. Its root is not placed directly in the block header.

### The witness commitment

BIP 141 commits to the witness root through an output in the coinbase transaction. The commitment is:

`DoubleSHA256(witness_root || witness_reserved_value)`

The witness reserved value is a 32-byte item in the coinbase input’s witness. The commitment output uses a specified marker beginning with `aa21a9ed` after an `OP_RETURN` push.

This creates a chain of commitments: the block header commits to the coinbase txid through the ordinary transaction tree, and the coinbase transaction commits to the witness root through the commitment output.

### Why there are two roots

The transaction Merkle root preserves the historical header format and commits to txids, which exclude witness data. The witness commitment separately binds witness data for SegWit-aware validation.

A transaction’s txid and wtxid can therefore differ. The existence of the witness root does not replace the transaction root or make them interchangeable.

### Partial Merkle trees and BIP 37

BIP 37 introduced `merkleblock` messages containing a block header, transaction count, selected hashes, and match bits. A client can reconstruct a partial Merkle tree and verify that matched txids are included under the header’s transaction root.

The server chooses which matching transactions and branches to send based on a Bloom filter supplied by the client. The proof can demonstrate inclusion of returned matches, but it cannot prove that a dishonest peer returned every relevant match. BIP 37 clients also rely on header-chain and proof-of-work assumptions rather than fully validating every transaction and script.

### Bloom-filter privacy limits

Bloom filters intentionally allow false positives to obscure the client’s exact interests, but repeated queries, filter updates, network metadata, and correlation can still reveal wallet activity. False positives trade bandwidth for some ambiguity; they do not provide strong anonymity.

Bitcoin Core disabled serving BIP 37 Bloom-filter requests by default in earlier releases unless explicitly enabled. Current service behavior is implementation- and configuration-specific and should be checked at an exact version.

### SPV versus full validation

The Bitcoin paper’s simplified payment verification model uses block headers and Merkle branches without running a full network node. This can provide useful evidence under assumptions about the most-work chain and honest mining behavior.

It does not provide the same guarantees as independently validating blocks, scripts, amounts, and spent-output state. A full node can reject a high-work chain containing invalid transactions; a header-and-proof client may not have the data needed to detect the same failure.

### Taproot script trees

Taproot can commit to one or more scripts through a tree whose rules differ from the block transaction tree. Each leaf uses a tagged `TapLeaf` hash over the leaf version and compact-size-prefixed script.

Each internal branch uses the tagged `TapBranch` hash over the two child hashes in lexicographic byte order:

`TapBranch(min(a, b) || max(a, b))`

There is no left/right positional meaning in the same sense as the ordered transaction tree, and there is no odd-node duplication rule. The optional script-tree root is combined with an internal public key through the tagged `TapTweak` construction to form the Taproot output key.

### Control blocks and revealed branches

A Taproot script-path spend reveals the executed script, its leaf version through the control block, the internal key, parity information, and the sibling hashes needed to reconstruct the script-tree root. The verifier recomputes the TapLeaf and TapBranch path, derives the tweaked output key, and checks that it matches the committed witness program.

Only the executed leaf and its path need to be revealed. Other leaves can remain hidden. This is a script-commitment proof, not proof that a transaction appears in a block.

### Merkleized scripts versus transaction inclusion

A Taproot branch proves that a revealed script was committed under an output key. A block Merkle branch proves that a txid was committed under a block header. A witness branch contributes to the coinbase witness commitment. A BIP 37 partial tree encodes selected transaction matches.

They use different leaves, hashes, ordering rules, roots, and verification goals. Treating all of them as interchangeable “Merkle proofs” hides the protocol rule that gives each proof meaning.

### What the block root does not commit to

The block transaction Merkle root does not commit to the current UTXO set. It commits to the block’s ordered txids. The UTXO set is derived by validating the chain and applying transactions according to consensus rules.

Bitcoin Core may maintain databases, caches, or assumeutxo-related commitments for implementation purposes, but those do not change what the consensus block-header Merkle-root field means.

## 3. Key Terms

- **Merkle tree:** Hash tree combining many leaves into one root commitment.
- **Merkle root:** Final hash committing to the tree under defined construction rules.
- **Merkle proof:** Leaf position plus sibling hashes used to reconstruct a root.
- **txid leaf:** Internal transaction identifier used in the block transaction tree.
- **Odd-node duplication:** Rule that duplicates the final node at an odd level.
- **Mutation:** Structural ambiguity where distinct leaf lists can produce the same root under duplicate handling.
- **wtxid:** Identifier committing to a transaction’s witness serialization.
- **Witness commitment:** Coinbase commitment to the witness root and reserved value.
- **Partial Merkle tree:** BIP 37 encoding of selected matches and necessary branches.
- **TapLeaf:** Tagged hash committing to a Taproot leaf version and script.
- **TapBranch:** Tagged hash combining lexicographically ordered Taproot child hashes.
- **Control block:** Taproot script-path data revealing the internal key and Merkle branch.
- **UTXO set:** Current set of unspent transaction outputs derived through full validation.

## 4. Sources

1. **Bitcoin Whitepaper — Section 8** | Satoshi Nakamoto
   - URL: https://bitcoin.org/bitcoin.pdf
   - Supports: Historical SPV header-and-Merkle-branch model.
2. **BIP 37 — Connection Bloom Filtering** | Mike Hearn, Matt Corallo
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0037.mediawiki
   - Supports: Partial Merkle trees, match bits, proof construction, and omission boundary.
3. **BIP 141 — Segregated Witness** | Eric Lombrozo, Johnson Lau, Pieter Wuille
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki
   - Supports: Witness tree, zero coinbase wtxid leaf, reserved value, and coinbase commitment.
4. **BIP 341 — Taproot** | Pieter Wuille, Jonas Nick, Anthony Towns
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki
   - Supports: TapLeaf, lexicographic TapBranch, TapTweak, control blocks, and script-path verification.
5. **Bitcoin Core 31.1 Tag Commit** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/commit/9be056a8a72b624dae9623b2f7bded92c2a21c91
   - Supports: Exact implementation version reviewed July 25, 2026.
6. **Bitcoin Core 31.1 Merkle Construction** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/consensus/merkle.cpp
   - Supports: txid and wtxid leaves, pairwise double SHA-256, odd duplication, and mutation detection.
7. **Bitcoin Core 31.1 Merkle Interface** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/consensus/merkle.h
   - Supports: Root, witness root, and mutation-reporting interfaces.
8. **Bitcoin Core 31.1 Block Validation** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/validation.cpp
   - Supports: Block Merkle-root and witness-commitment validation context.
9. **Bitcoin Core 31.1 Merkle Unit Tests** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/test/merkle_tests.cpp
   - Supports: Merkle roots, branches, odd levels, and mutation cases.
10. **Bitcoin Core 31.1 Partial Merkle Tree Code** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/merkleblock.cpp
    - Supports: BIP 37 partial-tree extraction and validation.
11. **Bitcoin Core 31.1 SegWit Functional Test** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/test/functional/p2p_segwit.py
    - Supports: Witness commitment and SegWit block-validation cases.
12. **CVE-2012-2459 Record** | NIST National Vulnerability Database
    - URL: https://nvd.nist.gov/vuln/detail/CVE-2012-2459
    - Supports: Historical duplicate-transaction and Merkle-root mutation context.
13. **Bitcoin Core 31.1 Taproot Functional Test** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/test/functional/feature_taproot.py
    - Supports: Taproot script-tree and control-block validation cases.

## 5. SEO title

How Merkle Trees Work in Bitcoin | Mempool Surf Club

## 6. Meta description

Learn how Bitcoin transaction, witness, partial, and Taproot trees differ—and what their roots and inclusion proofs do and do not establish.

## 7. Page excerpt

Bitcoin uses several distinct tree constructions. See how block roots, witness commitments, BIP 37 proofs, and Taproot script branches serve different validation goals.

## 8. Estimated reading time

16 to 19 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-059 | How Hash Functions Work in Bitcoin
- Next: MSC-GUIDE-061 | How Bitcoin RPC Works
- Prerequisite: MSC-GUIDE-009 | How Bitcoin Transactions Work
- Prerequisite: MSC-GUIDE-011 | How Bitcoin Blocks Work
- Branch: MSC-GUIDE-055 | How Taproot Changed Bitcoin
- Branch: MSC-GUIDE-056 | How SegWit Changed Bitcoin
- Return: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] Transaction leaves, pairwise double SHA-256, order, odd duplication, proofs, and header commitment are explained.
- [x] Inclusion, validity, confirmation, reorganization risk, and economic finality remain distinct.
- [x] Historical mutation, CVE-2012-2459 context, and Bitcoin Core detection are qualified.
- [x] Transaction and witness trees remain distinct, including the zero coinbase wtxid and reserved value.
- [x] BIP 37 partial trees, omission limits, privacy weaknesses, and SPV boundaries are stated.
- [x] TapLeaf, lexicographic TapBranch, TapTweak, control blocks, and block-tree differences are explicit.
- [x] The block transaction root is not described as a UTXO-set commitment.
- [x] Byte-order presentation and current implementation claims are bounded and dated.
- [x] Planned internal links remain inactive.

## 11. Human verification

- Reviewer: Pending — Bitcoin cryptography and implementation specialist
- Review date: Pending
- Notes: Human Verification remains pending. The specialist pass must reconfirm Core’s leaf byte order, odd duplication and mutation detection, CVE context, witness commitment validation, BIP 37 proof and privacy wording, TapLeaf and TapBranch serialization, control-block reconstruction, UTXO-set distinction, and all inclusion-versus-validity claims.

## 12. Illustration brief

### Illustration 1

- Concept title: The Block Transaction Tree Plate
- Educational purpose: Show txid leaves, double-SHA-256 parents, odd duplication, a proof branch, and the header root.
- Recommended placement: After A compact example.
- Visual description: Vintage engineering plate with five ordered transaction leaves; the fifth is duplicated, one proof path is highlighted, and the root feeds a block-header field.
- Required labels: Ordered txids, Double SHA-256, Odd-node duplicate, Sibling hash, Merkle branch, Merkle root, Block header
- Caption: Bitcoin’s block tree commits to ordered txids and duplicates the final node at odd levels.
- Alt text: Bitcoin transaction Merkle tree with five leaves, odd duplication, an inclusion branch, and header root.
- Image orientation: Landscape
- Mobile crop notes: Preserve one highlighted branch from leaf to header.
- Status: PLANNED

### Illustration 2

- Concept title: The Witness Commitment Chain
- Educational purpose: Explain how witness data reaches a commitment inside the coinbase transaction.
- Recommended placement: After The witness commitment.
- Visual description: Nautical chain diagram from wtxid leaves to witness root, reserved value, coinbase commitment output, coinbase txid, transaction root, and block header.
- Required labels: wtxids, Zero coinbase leaf, Witness root, Reserved value, aa21a9ed, Coinbase txid, Transaction root, Block header
- Caption: SegWit binds witness data through the coinbase transaction rather than a new header field.
- Alt text: Witness commitment chain from wtxid tree through the coinbase transaction to the block header.
- Image orientation: Landscape
- Mobile crop notes: Use a vertical chain with the coinbase commitment centered.
- Status: PLANNED

### Illustration 3

- Concept title: Four Trees, Four Proofs
- Educational purpose: Separate block, witness, BIP 37 partial, and Taproot script constructions.
- Recommended placement: After Merkleized scripts versus transaction inclusion.
- Visual description: Cartographic comparison with four islands, each showing its own leaves, hash rule, root location, and proof goal; connecting waters are labeled “not interchangeable.”
- Required labels: Transaction tree, Witness tree, Partial Merkle tree, Taproot script tree, txid, wtxid, Match bits, TapLeaf, TapBranch, Inclusion, Script commitment
- Caption: Bitcoin’s tree constructions use different leaves and verification goals.
- Alt text: Comparison of transaction, witness, BIP 37 partial, and Taproot script trees.
- Image orientation: Landscape
- Mobile crop notes: Stack the four islands as labeled panels.
- Status: PLANNED
