---
registry_id: MSC-GUIDE-059
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: How Hash Functions Work in Bitcoin
handle: bitcoin-hash-functions
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

# How Hash Functions Work in Bitcoin

## 1. Introductory deck

Bitcoin uses several hash constructions for different jobs: SHA-256, double SHA-256, HASH160, Taproot tagged hashes, script commitments, proof of work, transaction and block identifiers, and address checksums. These operations share the idea of mapping data to fixed-size outputs, but they do not provide identical properties or interchangeable meanings. Hashing is not encryption, miners do not reverse hashes, and a checksum does not prove ownership.

## 2. Full article

A cryptographic hash function takes an input of arbitrary practical length and produces a fixed-size output called a hash or digest. The same input produces the same output. A small input change should unpredictably alter the digest.

Bitcoin relies on hash functions throughout transaction identification, block construction, proof of work, scripts, witness programs, Taproot, and address encodings. The word “hash” is therefore too broad by itself. Accurate explanations name the function, the serialization, the number of applications, the output length, and the purpose.

This guide was researched on July 25, 2026 against the deployed Bitcoin BIPs and Bitcoin Core 31.1 at tag `v31.1`, commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`. Cryptographic confidence is not an absolute guarantee and should be revisited if standards, attacks, implementations, or consensus proposals change.

### Core security properties

Several properties are commonly discussed separately.

**Preimage resistance** means that, given a target digest, finding any input that hashes to it should require infeasible work.

**Second-preimage resistance** means that, given one particular input, finding a different input with the same digest should require infeasible work.

**Collision resistance** means that finding any two different inputs with the same digest should require infeasible work.

These are related but not identical goals. An attack that finds arbitrary collisions does not automatically provide a preimage for a chosen target. A protocol may depend more heavily on one property than another.

Hash outputs are not guaranteed unique. A function with a finite output space and effectively unlimited possible inputs must have collisions. Security language is probabilistic and computational: collisions should be infeasible to find within the relevant threat model, not impossible by mathematics.

### Fixed-size output and the birthday bound

SHA-256 produces 256 bits, or 32 bytes. An idealized 256-bit hash has approximately `2^256` possible outputs. Finding a preimage for a chosen output is expected to require work on the order of `2^256`, while finding any collision can exploit the birthday effect and is expected around `2^128` trials.

The birthday bound does not mean that ordinary users face a one-in-`2^128` chance each time they hash data. It describes the scale at which a deliberate search for any pairwise collision becomes plausible in an idealized model. Real risk analysis also depends on the exact construction, attacker control, target selection, and consequences of a collision.

For 160-bit HASH160 outputs, the corresponding generic collision scale is approximately `2^80`, while generic preimage work is approximately `2^160`. These figures are security-model approximations, not promises about implementations or future cryptanalysis.

### SHA-256

SHA-256 is a member of the SHA-2 family standardized by NIST. It processes data in blocks and returns a 32-byte digest.

Bitcoin Core 31.1 has a dedicated SHA-256 implementation and uses SHA-256 both directly and inside larger constructions. Examples include:

- the first stage of double SHA-256;
- the first stage of HASH160;
- P2WSH witness-script commitments;
- BIP 340, BIP 341, and BIP 342 tagged hashes;
- Taproot signature-message component hashes;
- the witness commitment after a second SHA-256 stage;
- proof-of-work block-header hashing as part of double SHA-256.

“Bitcoin uses SHA-256” is true but incomplete. The surrounding serialization and construction determine what the digest means.

### Double SHA-256

Double SHA-256 means:

`SHA256(SHA256(data))`

Bitcoin Core’s `CHash256`, `Hash`, and `HashWriter::GetHash()` implement this 256-bit construction.

Bitcoin uses double SHA-256 for several historically important objects, including:

- transaction identifiers from the non-witness transaction serialization;
- witness transaction identifiers when witness data is present;
- block-header identifiers and proof-of-work hashes;
- parent nodes in the block transaction Merkle tree;
- the SegWit witness commitment;
- Base58Check’s checksum source before truncation;
- legacy, BIP 143, and some other signature-message digests.

Using SHA-256 twice should not be summarized as “twice as secure.” It does not double the output length or turn 256-bit collision resistance into 512-bit collision resistance. In some constructions it avoids Merkle–Damgård length-extension behavior on the inner digest, but each protocol must be analyzed in context.

BIP 341 intentionally uses single-SHA-256 component hashes and a tagged final hash for Taproot signature messages. Its rationale notes that length extension is not a concern for this public, length-committed message construction. This demonstrates why counting hash invocations is not a reliable security ranking.

### HASH160

Bitcoin’s HASH160 construction is:

`RIPEMD160(SHA256(data))`

The result is 20 bytes. Bitcoin Core implements this as `CHash160`.

HASH160 appears in several legacy and SegWit version 0 constructions:

- pay-to-public-key-hash scripts commit to the HASH160 of a public key;
- pay-to-script-hash scripts commit to the HASH160 of a redeem script;
- P2WPKH witness programs commit to the HASH160 of a compressed public key.

RIPEMD-160 is therefore not used alone in these constructions. It compresses a SHA-256 digest to 160 bits.

A 20-byte key hash is not a public key. Spending a P2PKH or P2WPKH output reveals a public key whose HASH160 must match the commitment, then verifies a signature under that public key. The hash commitment and the signature check perform different jobs.

P2WSH does not use HASH160. It commits directly to `SHA256(witnessScript)`, producing a 32-byte witness program. Treating P2SH and P2WSH as the same “script hash” hides an important output-length and construction difference.

### Tagged hashes

A BIP 340-style tagged hash is:

`SHA256(SHA256(tag) || SHA256(tag) || message)`

The repeated tag hash fills one SHA-256 block and creates a context-specific initial state. Bitcoin Core’s `TaggedHash` helper and preinitialized Taproot hashers implement this pattern.

BIP 340 uses distinct tags for auxiliary data, nonce derivation, and the signature challenge. BIP 341 and BIP 342 use tags including `TapTweak`, `TapLeaf`, `TapBranch`, and `TapSighash`.

Tagged hashing provides domain separation. A digest intended as a TapLeaf commitment should not be casually interchangeable with a signature challenge or nonce input. Domain separation reduces cross-context ambiguity under the assumed hash properties; it does not make collisions impossible.

### Transaction identifiers

A transaction identifier, or `txid`, is the double SHA-256 of the transaction’s legacy serialization without witness data. Bitcoin Core computes it with `TX_NO_WITNESS`.

A witness transaction identifier, or `wtxid`, is the double SHA-256 of the witness-inclusive serialization when witness data exists. For a transaction without witness data, Bitcoin Core defines the `wtxid` to equal the `txid`.

The byte sequence fed to the hash is serialized in protocol order. Human-facing software commonly displays the internal 32-byte value with reversed byte order, so a hex string seen in a block explorer may appear reversed relative to bytes in a serialized outpoint.

This display convention does not change the hash function. It is an endianness and presentation issue. Documentation should identify whether it is showing wire bytes, an internal integer representation, or the conventional displayed identifier.

A transaction signature hash is not a `txid`. Signature messages select and transform transaction fields under sighash rules. Two 32-byte digests can serve entirely different protocol roles.

### Block identifiers and proof of work

A Bitcoin block header contains:

- version;
- previous-block hash;
- transaction Merkle root;
- time;
- encoded target in `nBits`;
- nonce.

The serialized 80-byte header is double-SHA-256 hashed. The resulting 256-bit value is interpreted as a number for proof-of-work comparison. A header is valid under the proof-of-work rule when its value is less than or equal to the target derived from `nBits`, subject to the other block and chain rules.

The commonly displayed block hash is the same digest presented in conventional reversed-byte hex notation. The proof-of-work comparison operates on the defined numeric interpretation, not on the visual number of leading zero characters alone.

### Mining is repeated hashing, not decryption

Miners assemble candidate block headers and vary fields such as the nonce, extra nonce in the coinbase transaction, time within allowed rules, and transaction selection. Each change can alter the Merkle root or header. Mining hardware repeatedly computes double SHA-256 and checks whether the output meets the current target.

There is no encrypted message to decrypt and no secret plaintext to recover. Miners are not reversing SHA-256. They are sampling candidate headers until one produces a sufficiently low output.

Because hash outputs are modeled as unpredictable, each validly constructed attempt behaves like another trial. Finding a block does not reveal how to shortcut the next search.

### Targets and difficulty

The target is a 256-bit threshold. A lower target makes qualifying hashes rarer. The compact `nBits` field encodes the target in the block header.

“Difficulty” is a human-facing ratio comparing a reference target to the current target. Bitcoin consensus validates the target and the block hash under exact chain rules; software and websites may present difficulty using different numeric precision or formatting.

The network periodically adjusts the target according to consensus rules. Hash rate is an estimate inferred from observed block production and target, not a field recorded directly in each block.

These distinctions matter because a block hash, target, difficulty, and estimated hash rate are different quantities even though all are discussed in mining explanations.

### Merkle-tree hashing

The transaction Merkle tree uses transaction identifiers as leaves. At each level, adjacent 32-byte values are concatenated in the algorithm’s internal byte order and double-SHA-256 hashed to create a parent.

When a level has an odd number of nodes, Bitcoin duplicates the final node before hashing the pair. This historical rule contributes to a known mutation ambiguity and is not a general recommendation for new Merkle designs.

The witness Merkle tree similarly uses `wtxid` values, with a zero leaf for the coinbase transaction. Taproot script trees use different tagged leaf and branch hashes. “The Merkle hash” is therefore not one universal construction in Bitcoin.

### Script hash commitments

Different output types commit to scripts or keys differently:

- **P2PKH:** HASH160 of a public key.
- **P2SH:** HASH160 of a redeem script.
- **P2WPKH:** HASH160 of a compressed public key.
- **P2WSH:** SHA-256 of a witness script.
- **P2TR:** 32-byte x-only output key, which may be tweaked by a tagged hash committing to a Taproot script-tree root.

A hash commitment does not itself prove that a party knows a preimage or controls a key. Script execution requires the spender to reveal or satisfy the data expected by the output program.

### Taproot commitments

Taproot combines an internal x-only public key with an optional script-tree root through the tagged `TapTweak` hash. The tweak modifies the output key. A key-path signature is checked under the tweaked output key.

A script-path spend reveals a tapscript leaf, leaf version, control block, and the necessary branch hashes. The verifier recomputes:

- the tagged `TapLeaf` hash from the leaf version and serialized script;
- each tagged `TapBranch` parent after lexicographically ordering the two child hashes;
- the tweak and output key;
- the parity and internal-key relationship carried by the control block.

Taproot’s branch ordering and tagged leaf encoding differ from the block transaction Merkle tree. They should not be described as the same hash tree with different data.

### Hashlocks

A hashlock is a script condition that requires a spender to reveal a preimage whose hash matches a committed digest. Bitcoin Script includes operations such as `OP_SHA256`, `OP_HASH160`, and related hash opcodes.

A typical construction commits to `H(x)` and later reveals `x`. This supports conditional protocols such as atomic-swap and payment-channel designs when combined with signatures and time locks.

A hashlock proves only that the spending witness supplied a preimage satisfying the script. It does not prove who originally chose the secret, keep the secret private after publication, or make the broader protocol safe.

### Commit-and-reveal patterns

Hash commitments can separate a commitment phase from a later reveal phase. The committing party publishes a digest; later it reveals the data so others can recompute the hash.

A secure commitment design may require:

- domain separation;
- unambiguous serialization;
- sufficient secret entropy;
- a salt or nonce;
- binding to context, participants, and version;
- a clear reveal and timeout process.

Hashing a predictable answer without a salt can allow brute-force guessing. Hashing concatenated fields without lengths or a canonical encoding can create ambiguity even when the hash function itself behaves correctly.

### Base58Check

Legacy Bitcoin addresses and several key encodings use Base58Check. The encoded payload includes a version or type prefix and data. The checksum is the first four bytes of double SHA-256 applied to that payload.

This 32-bit checksum helps detect many transcription errors. It is not a cryptographic proof of ownership, authorization, or authenticity. An attacker can construct a different payload with its own valid checksum, and a maliciously substituted valid address will pass checksum verification.

A sender must still verify the intended recipient and network. “The checksum is valid” means only that the string is internally consistent under the encoding.

### Bech32 and Bech32m

BIP 173 defines Bech32 for version 0 witness addresses. Its six-character checksum uses a BCH-code-derived polymod calculation over the human-readable part and data symbols. It is not SHA-256.

BIP 350 defines Bech32m by changing the final checksum constant. Version 0 witness programs continue to use Bech32. Witness versions 1 through 16, including Taproot’s version 1, use Bech32m.

A decoder must check both the checksum and the expected encoding for the witness version. Accepting a valid Bech32 string where Bech32m is required, or vice versa, is an error.

Bech32 and Bech32m checksums are designed to detect common character errors. They do not prove that the witness program belongs to a specific person, that it is spendable, or that the recipient generated it.

### Length extension

SHA-256 follows a Merkle–Damgård construction. If a protocol uses a raw digest as though it authenticated `secret || message`, length-extension behavior can matter: knowledge of the digest and message length may allow computing a digest for a padded extension without learning the secret.

This does not mean every direct use of SHA-256 in Bitcoin is vulnerable. Many Bitcoin constructions hash public serialized data, use fixed lengths, double hash, use HMAC-like designs, or apply tagged hashes with committed structure.

The correct lesson is to analyze the full construction. “Single SHA-256 is unsafe” and “double SHA-256 fixes everything” are both misleading.

### Collision language and protocol consequences

A discovered collision in one context does not automatically spend coins. Consequences depend on what the attacker can choose and what the digest commits to.

For example:

- A collision in an address checksum is not a private-key break.
- A collision in a script commitment would still need to satisfy the exact output and script context.
- A transaction-identifier collision could affect indexing and commitments differently from a preimage attack on an existing transaction.
- A break in signature-hash collision resistance must be analyzed with the signature scheme and attacker control of messages.

This is why source notes should identify whether a claim depends on preimage, second-preimage, collision, or pseudorandom-output behavior.

### Quantum-computing boundaries

Grover’s algorithm gives a theoretical quadratic speedup for generic preimage search. In an idealized model, that changes a 256-bit preimage search scale toward roughly `2^128` quantum operations, while collision search and real implementations require more nuanced analysis.

That does not imply a practical current attack on Bitcoin’s hash functions. Fault-tolerant quantum resources, circuit depth, error correction, parallelism, and target-specific constraints matter. Hash functions are also affected differently from secp256k1 signatures, for which Shor’s algorithm targets the discrete-log assumption.

Bitcoin’s deployed rules do not automatically upgrade if technology changes. Any response would require evidence, software, wallet behavior, and potentially consensus coordination. Timelines should not be invented.

### Current confidence and version-sensitive claims

As of the evidence reviewed July 25, 2026, Bitcoin Core 31.1 continues to implement SHA-256, double SHA-256, HASH160, tagged hashes, the established identifier constructions, proof-of-work checks, address decoders, and script hash operations described here.

That is an implementation and deployment statement, not an eternal cryptographic guarantee. New cryptanalysis, standards changes, consensus proposals, or implementation defects could alter an assessment. Claims about “security bits,” quantum implications, or address safety should state their assumptions and date.

### A hash-construction checklist

When reading or writing a Bitcoin hash claim, ask:

- What exact bytes are serialized?
- Which hash function or checksum algorithm is used?
- Is it applied once, twice, or as part of HASH160 or a tagged construction?
- What is the output length?
- Is the goal identification, commitment, proof of work, error detection, or signature-message construction?
- Does the claim depend on preimage, second-preimage, or collision resistance?
- Is the value shown in internal byte order or conventional displayed order?
- Does a checksum merely detect errors, or is a script/signature check also required?
- Is the statement about consensus, Bitcoin Core 31.1, a wallet, or an application?

Bitcoin’s hash functions are best understood as a set of precise components, not one universal “hashing layer.”

## 3. Key Terms

- **Hash function:** Deterministic function mapping arbitrary practical input to a fixed-size digest.
- **Preimage resistance:** Difficulty of finding an input for a chosen digest.
- **Second-preimage resistance:** Difficulty of finding a different input matching a given input’s digest.
- **Collision resistance:** Difficulty of finding any two distinct inputs with the same digest.
- **SHA-256:** NIST-standardized 256-bit hash function used directly and in Bitcoin constructions.
- **Double SHA-256:** `SHA256(SHA256(data))`.
- **HASH160:** `RIPEMD160(SHA256(data))`, producing 20 bytes.
- **Tagged hash:** SHA-256 construction initialized with two copies of `SHA256(tag)`.
- **Domain separation:** Design that keeps hashes for different purposes from being interpreted interchangeably.
- **txid:** Double-SHA-256 identifier of non-witness transaction serialization.
- **wtxid:** Double-SHA-256 identifier of witness-inclusive transaction serialization when witness is present.
- **Target:** Numeric threshold a block-header hash must meet.
- **Difficulty:** Ratio expressing target hardness relative to a reference target.
- **Hashlock:** Script condition requiring revelation of a valid preimage.
- **Base58Check:** Base58 encoding with a four-byte truncated double-SHA-256 checksum.
- **Bech32:** Checksummed base32 encoding used for version 0 witness addresses.
- **Bech32m:** Modified Bech32 checksum used for witness versions 1 through 16.
- **Birthday bound:** Approximate square-root scale for generic collision search.
- **Length extension:** Property of some iterative hash constructions relevant to certain unsafe authentication designs.

## 4. Sources

1. **FIPS PUB 180-4 — Secure Hash Standard** | National Institute of Standards and Technology
   - URL: https://csrc.nist.gov/pubs/fips/180-4/upd1/final
   - Supports: SHA-256 definition, block processing, and 256-bit output.
2. **The RIPEMD-160 Cryptographic Hash Function** | Hans Dobbertin, Antoon Bosselaers, Bart Preneel
   - URL: https://homes.esat.kuleuven.be/~bosselae/ripemd160.html
   - Supports: RIPEMD-160 design and 160-bit output.
3. **Bitcoin Core 31.1 Tag Commit** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/commit/9be056a8a72b624dae9623b2f7bded92c2a21c91
   - Supports: Exact source and test version reviewed July 25, 2026.
4. **Bitcoin Core 31.1 Hash Primitives** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/hash.h
   - Supports: CHash256, CHash160, Hash, Hash160, single-SHA-256, double-SHA-256, and TaggedHash helpers.
5. **Bitcoin Core 31.1 SHA-256 Implementation** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/crypto/sha256.cpp
   - Supports: Release-specific SHA-256 implementation and optimized compression paths.
6. **Bitcoin Core 31.1 RIPEMD-160 Implementation** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/crypto/ripemd160.cpp
   - Supports: Release-specific RIPEMD-160 implementation used by HASH160.
7. **Bitcoin Core 31.1 Transaction Primitives** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/primitives/transaction.cpp
   - Supports: txid and wtxid serialization and double-SHA-256 construction.
8. **Bitcoin Core 31.1 Block Primitives** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/primitives/block.h
   - Supports: Block-header fields and transaction Merkle-root commitment.
9. **Bitcoin Core 31.1 Block Hash Implementation** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/primitives/block.cpp
   - Supports: Block-header identifier hashing.
10. **Bitcoin Core 31.1 Proof-of-Work Validation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/pow.cpp
    - Supports: Compact target decoding, proof-of-work comparison, and retarget implementation.
11. **Bitcoin Core 31.1 Consensus Merkle Implementation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/consensus/merkle.cpp
    - Supports: txid and wtxid leaves, double-SHA-256 parent hashing, odd-node duplication, and mutation handling.
12. **BIP 16 — Pay to Script Hash** | Gavin Andresen
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki
    - Supports: P2SH HASH160 redeem-script commitments.
13. **BIP 141 — Segregated Witness** | Eric Lombrozo, Johnson Lau, Pieter Wuille
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki
    - Supports: wtxid, witness commitment, P2WPKH HASH160, and P2WSH SHA-256 commitments.
14. **BIP 143 — Version 0 Witness Signature Hashing** | Johnson Lau, Pieter Wuille
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0143.mediawiki
    - Supports: Double-SHA-256 signature messages and component hashes for SegWit version 0.
15. **BIP 340 — Schnorr Signatures for secp256k1** | Pieter Wuille, Jonas Nick, Tim Ruffing
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki
    - Supports: Tagged-hash construction, nonce and challenge tags, and domain-separation rationale.
16. **BIP 341 — Taproot: SegWit Version 1 Spending Rules** | Pieter Wuille, Jonas Nick, Anthony Towns
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki
    - Supports: TapTweak, TapLeaf, TapBranch, TapSighash, single-SHA-256 component hashes, and Taproot commitments.
17. **BIP 342 — Validation of Taproot Scripts** | Pieter Wuille, Jonas Nick, Anthony Towns
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0342.mediawiki
    - Supports: Tapleaf-bound signature-message extensions and tapscript hash usage.
18. **BIP 173 — Base32 Address Format** | Pieter Wuille, Greg Maxwell
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki
    - Supports: Bech32 polymod checksum, error-detection goals, and version 0 witness address encoding.
19. **BIP 350 — Bech32m Format** | Pieter Wuille
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0350.mediawiki
    - Supports: Bech32m checksum constant and use for witness versions 1 through 16.
20. **Bitcoin Core 31.1 Base58 Encoding** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/base58.cpp
    - Supports: Base58Check payload and four-byte double-SHA-256 checksum implementation.
21. **Bitcoin Core 31.1 Bech32 and Bech32m Encoding** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/bech32.cpp
    - Supports: Release-specific checksum, decoding, and encoding behavior.
22. **Bitcoin Core 31.1 Script Interpreter** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/interpreter.cpp
    - Supports: Hash opcodes and legacy, BIP 143, and Taproot signature-hash constructions.
23. **Bitcoin Core 31.1 Hash Tests** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/test/hash_tests.cpp
    - Supports: SHA-256, double-SHA-256, HASH160, serialization, and helper test cases.
24. **Bitcoin Core 31.1 BIP 341 Wallet Test Vectors** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/test/data/bip341_wallet_vectors.json
    - Supports: Exact TapLeaf, TapBranch, TapTweak, and output-key construction vectors for tagged-hash commitments.
25. **NIST Post-Quantum Cryptography Project** | National Institute of Standards and Technology
    - URL: https://csrc.nist.gov/projects/post-quantum-cryptography
    - Supports: Current standards context for separately designed post-quantum cryptography.

## 5. SEO title

How Hash Functions Work in Bitcoin | Mempool Surf Club

## 6. Meta description

Learn how Bitcoin uses SHA-256, double SHA-256, HASH160, tagged hashes, proof of work, identifiers, script commitments, and address checksums.

## 7. Page excerpt

Bitcoin does not use one interchangeable hash. Compare SHA-256, double SHA-256, HASH160, tagged hashes, mining targets, script commitments, and checksums.

## 8. Estimated reading time

18 to 21 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-058 | How Digital Signatures Work in Bitcoin
- Next: MSC-GUIDE-060 | How Merkle Trees Work in Bitcoin
- Prerequisite: MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work
- Prerequisite: MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
- Prerequisite: MSC-GUIDE-017 | How Bitcoin Mining Works
- Branch: MSC-GUIDE-054 | How Bitcoin Script Works
- Branch: MSC-GUIDE-055 | How Taproot Changed Bitcoin
- Branch: MSC-GUIDE-056 | How SegWit Changed Bitcoin
- Return: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] Determinism, fixed-size output, preimage, second-preimage, and collision resistance are separately defined.
- [x] Hash outputs are not described as mathematically unique.
- [x] SHA-256, double SHA-256, HASH160, RIPEMD-160, tagged hashes, and checksum algorithms remain distinct.
- [x] Transaction identifiers, witness identifiers, signature hashes, and displayed byte order are not confused.
- [x] Mining is explained as repeated target testing rather than decryption or hash reversal.
- [x] Block hashes, targets, difficulty, and estimated hash rate remain distinct.
- [x] P2PKH, P2SH, P2WPKH, P2WSH, and Taproot commitments use the correct constructions.
- [x] Base58Check, Bech32, and Bech32m checksums are not presented as ownership or authenticity proofs.
- [x] Birthday-bound, length-extension, collision-consequence, and quantum language is qualified.
- [x] Current implementation claims are pinned to Bitcoin Core 31.1 and dated July 25, 2026.
- [x] Bitcoin Core is described as an implementation rather than Bitcoin itself.
- [x] Planned internal links remain inactive and do not imply publication.

## 11. Human verification

- Reviewer: Pending — Bitcoin cryptography and implementation specialist
- Review date: Pending
- Notes: Human Verification remains pending. The specialist pass must reproduce Bitcoin Core 31.1 SHA-256, double-SHA-256, and HASH160 call paths; confirm txid, wtxid, block-header, Merkle, witness-commitment, script-hash, and Taproot tagged-hash constructions; recheck Base58Check, Bech32, and Bech32m boundaries; validate mining target and byte-order wording; and review birthday-bound, length-extension, collision, current-confidence, and quantum-computing claims.

## 12. Illustration brief

### Illustration 1

- Concept title: Bitcoin Hash Function Signal Board
- Educational purpose: Separate SHA-256, double SHA-256, HASH160, and tagged hashing by construction and use.
- Recommended placement: After Tagged hashes.
- Visual description: Vintage maritime signal board with four distinct processing lanes: one SHA-256 drum, two chained SHA-256 drums, SHA-256 feeding a RIPEMD-160 drum, and a tagged-hash lane prefixed by two identical tag flags.
- Required labels: SHA-256, Double SHA-256, HASH160, RIPEMD-160, Tagged hash, 32 bytes, 20 bytes, Domain tag
- Caption: Bitcoin combines hash functions differently depending on the protocol job.
- Alt text: Technical comparison of SHA-256, double SHA-256, HASH160, and BIP 340-style tagged hashing.
- Image orientation: Landscape
- Mobile crop notes: Stack four clearly labeled lanes with output sizes on the right.
- Status: PLANNED

### Illustration 2

- Concept title: Proof-of-Work Target Sounding
- Educational purpose: Show mining as repeated block-header hashing against a numeric target.
- Recommended placement: After Targets and difficulty.
- Visual description: Nautical depth-sounding station where changing header fields generate a stream of 256-bit readings; only readings below a marked target depth qualify, while “decrypt” and “reverse SHA-256” routes are crossed out.
- Required labels: Block header, Nonce, Merkle root, Double SHA-256, 256-bit output, Target, Valid, Try again, Not decryption
- Caption: Mining tests candidate headers until a hash value falls at or below the target.
- Alt text: Diagram of repeated Bitcoin block-header hashes being compared with a proof-of-work target.
- Image orientation: Landscape
- Mobile crop notes: Use a vertical sequence of candidate hashes crossing one bold target line.
- Status: PLANNED

### Illustration 3

- Concept title: Address Checksum and Ownership Boundary
- Educational purpose: Distinguish error detection from script and signature authorization.
- Recommended placement: After Bech32 and Bech32m.
- Visual description: Vintage harbor inspection gate with three lanes—Base58Check, Bech32, Bech32m—each validating a label’s internal checksum before a separate locked gate performs script and signature checks.
- Required labels: Base58Check, Bech32 v0, Bech32m v1+, Checksum valid, Network, Witness version, Script condition, Signature, Ownership not proven
- Caption: A valid checksum catches many encoding errors; spending authority is established by the output script and required witness.
- Alt text: Boundary diagram showing address checksum validation followed by separate Bitcoin script and signature authorization.
- Image orientation: Landscape
- Mobile crop notes: Preserve the two-stage flow: checksum gate first, authorization gate second.
- Status: PLANNED
