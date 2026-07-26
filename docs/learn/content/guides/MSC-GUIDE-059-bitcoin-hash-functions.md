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

Bitcoin uses several hash constructions for different jobs: SHA-256, double SHA-256, HASH160, Taproot tagged hashes, address checksums, script commitments, hashlocks, transaction identifiers, Merkle trees, and proof of work. These operations are not interchangeable. A hash is not encryption, a checksum is not proof of ownership, and miners do not decrypt or reverse SHA-256.

## 2. Full article

A cryptographic hash function maps an input of arbitrary practical length to a fixed-size output. The same input produces the same output, while even a small input change is expected to produce an unpredictable-looking result. Bitcoin relies on hash functions as components inside larger constructions; the security meaning depends on what is hashed, how it is serialized, and how the result is used.

This guide was researched on July 25, 2026 against the deployed Bitcoin BIPs and Bitcoin Core 31.1 at tag `v31.1`, commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`. Cryptographic confidence is an assessed property of specific constructions and assumptions, not an absolute guarantee.

### Four separate security properties

**Preimage resistance** means that, given a hash output, finding an input that produces it should be computationally infeasible.

**Second-preimage resistance** means that, given one particular input, finding a different input with the same hash should be infeasible.

**Collision resistance** means that finding any two different inputs with the same output should be infeasible.

**Determinism** means the same byte input always yields the same output.

These properties are related but not identical. A construction can rely more heavily on one property than another. Saying “the hash is secure” without naming the construction and property is incomplete.

### Fixed-size output and the birthday bound

SHA-256 always returns 256 bits, or 32 bytes. Because the output space is finite, collisions must exist mathematically. Cryptographic collision resistance means finding one should require infeasible work, not that collisions are impossible.

For an ideal `n`-bit hash, generic collision searches become relevant around `2^(n/2)` trials because of the birthday bound, while generic preimage searches are closer to `2^n`. This distinction is why “256-bit output” does not mean every property has a 256-bit generic work factor.

### SHA-256

Bitcoin uses the SHA-256 compression-based hash function standardized by NIST. A single SHA-256 operation appears in several constructions, including witness-script commitments for P2WSH and as a component of HASH160 and tagged hashing.

SHA-256 is not encryption. It has no decryption key and does not preserve enough information to reconstruct arbitrary input. A successful preimage attack would find some matching input; it would not “decrypt” a hash in the ordinary sense.

### Double SHA-256

Double SHA-256 is:

`SHA256(SHA256(data))`

Bitcoin Core’s `CHash256` implements this construction. It is used for transaction identifiers, block-header identifiers and proof-of-work hashing, and transaction Merkle-tree nodes.

Double hashing should not be described as making SHA-256 simply “twice as secure.” It is a distinct construction inherited across Bitcoin’s design. One historical motivation is to avoid exposing the output of an ordinary Merkle–Damgård hash directly to length-extension behavior in some uses. The security of each protocol role still depends on serialization, domain boundaries, and the required property.

### HASH160

HASH160 is:

`RIPEMD160(SHA256(data))`

Bitcoin Core’s `CHash160` performs SHA-256 first and RIPEMD-160 second, producing a 20-byte output. HASH160 has been used in public-key-hash and script-hash constructions, including P2PKH, P2SH, and P2WPKH witness programs.

HASH160 is not a synonym for SHA-256 and does not produce a 32-byte result. RIPEMD-160’s role is specifically the outer 160-bit compression in this combined construction.

### Tagged hashes and domain separation

BIP 340 defines tagged hashing as:

`SHA256(SHA256(tag) || SHA256(tag) || message)`

BIPs 340 and 341 use different tag names for roles such as Schnorr auxiliary data, nonce derivation, challenges, TapLeaf, TapBranch, TapTweak, and TapSighash. The repeated tag hash establishes a distinct initial context.

Domain separation reduces the risk that bytes intended for one cryptographic role are interpreted as valid input for another. It does not make collision or preimage attacks mathematically impossible. The tag name, serialization, and surrounding verification rules remain part of the construction.

### Transaction identifiers

A legacy transaction ID, or txid, is the double SHA-256 hash of the transaction’s non-witness serialization. Bitcoin Core’s transaction code computes a witness hash separately when witness data exists. The **wtxid** commits to witness serialization; the **txid** does not.

Displayed identifiers conventionally reverse the internal byte sequence for human-readable hexadecimal presentation. This is a display convention, not a different hash function. Software must be explicit about serialized byte order, internal integer treatment, and displayed notation.

### Block identifiers and proof of work

A block identifier is the double SHA-256 hash of the serialized block header. Proof of work evaluates the same header hash as a 256-bit value against a target. A valid header hash must be numerically less than or equal to the target under the consensus interpretation.

The block header includes version, previous-block hash, transaction Merkle root, time, encoded target, and nonce. Miners vary header fields and often coinbase-related data that changes the Merkle root, searching for a header whose hash meets the target.

### Mining is not decrypting or reversing

Miners are not solving an encrypted message, reversing SHA-256, or discovering a hidden plaintext. They repeatedly construct candidate headers, hash them, compare the result with the target, and change inputs when the result is too high.

For an idealized hash, each distinct candidate behaves like another trial. A successful result proves that sufficient probabilistic work was performed under the target. It does not reveal a shortcut for reversing other hashes.

### Targets and difficulty

The target is the threshold a block-header hash must meet. A lower target makes acceptable results rarer. Difficulty is a relative measure derived from the target; it is not a separate cryptographic puzzle embedded in the block.

Network rules periodically adjust the target according to Bitcoin’s defined difficulty-adjustment algorithm. Mining hardware, pool protocols, and block-template construction are implementation and operational layers around the same header-hash rule.

### Merkle-tree hashing

Bitcoin’s block transaction Merkle tree uses txids as leaves and double SHA-256 for pairwise parent hashing. If a level has an odd number of nodes, the final node is duplicated for that level. The final root enters the block header.

The witness Merkle tree uses wtxids, gives the coinbase a zero wtxid leaf, and feeds a separate witness commitment. Taproot script trees use tagged `TapLeaf` and `TapBranch` hashes instead. These are different tree constructions and should not be described as one generic “Bitcoin Merkle hash.”

### Script commitments

P2SH commits to a redeem script using HASH160. P2WSH commits to a witness script using a single SHA-256 digest. P2WPKH uses a 20-byte witness program associated with a public-key hash. Taproot commits to an internal key and optional script-tree root through tagged hashing and elliptic-curve key tweaking.

A script hash is a commitment to bytes interpreted under specified spending rules. It is not proof that the script is safe, satisfiable, understood by the wallet, or controlled by a particular person.

### Hashlocks

A hashlock requires a spender to reveal a preimage whose hash matches a committed value. Script opcodes such as `OP_SHA256` and `OP_HASH160` can be combined with equality checks.

Security depends on the preimage having enough entropy and remaining secret until use. A low-entropy password or predictable value can be guessed offline even if the hash function itself remains unbroken. Revealing the preimage may also expose it to other protocols that reuse the same commitment.

### Commit-and-reveal patterns

Hash commitments can bind a party to data before revealing it. The commitment usually hashes a structured encoding that includes the value and unpredictable randomness. Later, the party reveals both so others can recompute the hash.

A sound design must specify encoding, randomness, domain separation, reveal timing, and what happens if the party never reveals. Hashing alone does not guarantee fairness, availability, uniqueness, or truthful interpretation.

### Base58Check checksum

Base58Check appends the first four bytes of double SHA-256 over the version byte and payload. The checksum catches many transcription errors and helps identify incompatible payload encodings.

Four checksum bytes are not an ownership proof, digital signature, or strong authentication mechanism. An attacker who chooses an entire payload can recompute the checksum.

### Bech32 and Bech32m

BIP 173 Bech32 and BIP 350 Bech32m use a polymod error-detection code over human-readable and data parts. Witness version 0 addresses use Bech32, while witness versions 1 and later use Bech32m.

The polymod checksum is designed for address error detection, not cryptographic ownership. It is not SHA-256 and should not be presented as a signature or message-authentication code. Valid checksum syntax only shows that the encoded string is internally consistent under the format.

### Length-extension boundaries

SHA-256 is based on the Merkle–Damgård construction, so a raw digest used naively as `SHA256(secret || message)` can support length-extension attacks. Bitcoin’s established uses do not all expose that pattern. Double SHA-256, HASH160’s outer RIPEMD-160, fixed structured messages, and BIP 340-style tagged contexts have different boundaries.

The correct lesson is not “SHA-256 is vulnerable” or “double SHA-256 solves everything.” Protocol designers must analyze the exact construction and avoid inventing authentication schemes from an unkeyed hash.

### Quantum-computing boundary

A sufficiently capable quantum computer could give a generic square-root speedup for brute-force hash search through Grover-style algorithms. That is different from the stronger effect often discussed for elliptic-curve discrete logarithms. Output lengths, parallelism, fault-tolerant resource costs, and the exact security property matter.

This is not evidence of an immediate practical break or a date prediction. Current statements should distinguish theoretical algorithms from demonstrated hardware and from any deployed Bitcoin protocol change.

## 3. Key Terms

- **Hash function:** Deterministic function mapping arbitrary-length input to fixed-size output.
- **Preimage resistance:** Difficulty of finding an input for a given hash output.
- **Second-preimage resistance:** Difficulty of finding a second input matching a specified input’s hash.
- **Collision resistance:** Difficulty of finding any two distinct inputs with the same output.
- **SHA-256:** NIST-standardized 256-bit hash function used in several Bitcoin constructions.
- **Double SHA-256:** SHA-256 applied twice.
- **HASH160:** RIPEMD-160 applied to a SHA-256 digest.
- **Tagged hash:** SHA-256 context prefixed by two copies of a tag hash.
- **txid:** Double-SHA-256 identifier of a transaction’s non-witness serialization.
- **wtxid:** Identifier committing to witness serialization.
- **Target:** Threshold a proof-of-work header hash must meet.
- **Hashlock:** Spending condition requiring revelation of a matching preimage.
- **Checksum:** Error-detection value; not proof of ownership by itself.
- **Birthday bound:** Generic collision-search scale around the square root of the output space.

## 4. Sources

1. **FIPS PUB 180-4 — Secure Hash Standard** | NIST
   - URL: https://csrc.nist.gov/pubs/fips/180-4/upd1/final
   - Supports: SHA-256 definition and output size.
2. **RIPEMD-160 Specification** | Hans Dobbertin, Antoon Bosselaers, Bart Preneel
   - URL: https://homes.esat.kuleuven.be/~bosselae/ripemd160.html
   - Supports: RIPEMD-160 construction used within HASH160.
3. **BIP 13 — Address Format for P2SH** | Gavin Andresen
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0013.mediawiki
   - Supports: Script-hash address and Base58Check use.
4. **BIP 16 — Pay to Script Hash** | Gavin Andresen
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki
   - Supports: P2SH redeem-script HASH160 commitment.
5. **BIP 141 — Segregated Witness** | Eric Lombrozo, Johnson Lau, Pieter Wuille
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki
   - Supports: P2WPKH, P2WSH, wtxids, and witness commitment construction.
6. **BIP 173 — Bech32** | Pieter Wuille, Greg Maxwell
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki
   - Supports: Bech32 encoding and polymod checksum boundaries.
7. **BIP 350 — Bech32m** | Pieter Wuille
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0350.mediawiki
   - Supports: Bech32m constant and witness-version mapping.
8. **BIP 340 — Schnorr Signatures for secp256k1** | Pieter Wuille, Jonas Nick, Tim Ruffing
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki
   - Supports: Tagged-hash construction and domain separation.
9. **BIP 341 — Taproot** | Pieter Wuille, Jonas Nick, Anthony Towns
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki
   - Supports: TapLeaf, TapBranch, TapTweak, and TapSighash tagged hashes.
10. **Bitcoin Core 31.1 Tag Commit** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/commit/9be056a8a72b624dae9623b2f7bded92c2a21c91
    - Supports: Exact implementation version reviewed July 25, 2026.
11. **Bitcoin Core 31.1 Hash Primitives** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/hash.h
    - Supports: `CHash256`, `CHash160`, and tagged-hash helpers.
12. **Bitcoin Core 31.1 Transaction Primitives** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/primitives/transaction.cpp
    - Supports: txid and witness-hash construction.
13. **Bitcoin Core 31.1 Block Primitives** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/primitives/block.h
    - Supports: Block-header serialization and identifier hashing.
14. **Bitcoin Core 31.1 Merkle Construction** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/consensus/merkle.cpp
    - Supports: Transaction and witness-tree double-SHA-256 construction.
15. **Bitcoin Developer Reference — Base58Check Encoding** | Bitcoin documentation contributors
    - URL: https://developer.bitcoin.org/reference/transactions.html
    - Supports: Base58Check payload and four-byte checksum construction.

## 5. SEO title

How Hash Functions Work in Bitcoin | Mempool Surf Club

## 6. Meta description

Learn how Bitcoin uses SHA-256, double SHA-256, HASH160, tagged hashes, identifiers, proof of work, script commitments, and address checksums.

## 7. Page excerpt

Bitcoin does not use one interchangeable “hash.” See how identifiers, mining, scripts, Taproot commitments, hashlocks, and checksums use distinct constructions.

## 8. Estimated reading time

15 to 18 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-058 | How Digital Signatures Work in Bitcoin
- Next: MSC-GUIDE-060 | How Merkle Trees Work in Bitcoin
- Prerequisite: MSC-GUIDE-009 | How Bitcoin Transactions Work
- Prerequisite: MSC-GUIDE-017 | How Bitcoin Mining Works
- Branch: MSC-GUIDE-055 | How Taproot Changed Bitcoin
- Branch: MSC-GUIDE-057 | How Schnorr Signatures Work in Bitcoin
- Return: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] Determinism, preimage, second-preimage, and collision resistance remain distinct.
- [x] SHA-256, double SHA-256, HASH160, RIPEMD-160, and tagged hashes remain distinct.
- [x] txid, wtxid, block hash, proof of work, Merkle hashing, and script commitments are assigned correctly.
- [x] Mining is not described as decrypting, reversing, or solving a hash.
- [x] Collision language and the birthday bound avoid guarantees of uniqueness.
- [x] Base58Check, Bech32, and Bech32m are checksums rather than ownership proofs.
- [x] Hashlocks, commitments, length extension, domain separation, and quantum caveats are bounded.
- [x] Current implementation claims are pinned to Bitcoin Core 31.1 and dated July 25, 2026.
- [x] Planned internal links remain inactive.

## 11. Human verification

- Reviewer: Pending — Bitcoin cryptography and implementation specialist
- Review date: Pending
- Notes: Human Verification remains pending. The specialist pass must reconfirm exact Core hashing call paths, txid and wtxid serialization, proof-of-work numeric interpretation, script-hash constructions, Base58Check and Bech32 boundaries, tagged-hash contexts, length-extension wording, collision work factors, and the narrow quantum caveat.

## 12. Illustration brief

### Illustration 1

- Concept title: Bitcoin Hash Function Signal Board
- Educational purpose: Separate SHA-256, double SHA-256, HASH160, and tagged hashing.
- Recommended placement: After Tagged hashes and domain separation.
- Visual description: Vintage maritime signal board with four processing lanes: one SHA-256 drum, two chained SHA-256 drums, SHA-256 feeding RIPEMD-160, and a tagged lane prefixed by two tag flags.
- Required labels: SHA-256, Double SHA-256, HASH160, RIPEMD-160, Tagged hash, 32 bytes, 20 bytes, Domain tag
- Caption: Bitcoin combines hash functions differently depending on the protocol job.
- Alt text: Comparison of SHA-256, double SHA-256, HASH160, and tagged hashing.
- Image orientation: Landscape
- Mobile crop notes: Stack four lanes with output sizes on the right.
- Status: PLANNED

### Illustration 2

- Concept title: Proof-of-Work Target Sounding
- Educational purpose: Explain repeated header hashing and target comparison without a decryption metaphor.
- Recommended placement: After Mining is not decrypting or reversing.
- Visual description: Nautical depth-sounding instrument sends candidate block headers through a hash gauge; most readings sit above the target line and one falls below it.
- Required labels: Candidate header, Double SHA-256, Hash value, Target, Valid, Try another header
- Caption: Miners repeatedly hash candidate headers until a numeric result meets the target.
- Alt text: Candidate block headers are hashed and compared with a proof-of-work target.
- Image orientation: Landscape
- Mobile crop notes: Keep the target line and valid result centered.
- Status: PLANNED

### Illustration 3

- Concept title: Checksum Harbor Limits
- Educational purpose: Separate address error detection from cryptographic ownership.
- Recommended placement: After Bech32 and Bech32m.
- Visual description: Harbor entry chart with Base58Check, Bech32, and Bech32m buoys detecting damaged labels, while a separate signature checkpoint controls ownership claims.
- Required labels: Base58Check, Bech32, Bech32m, Error detection, Valid encoding, Signature, Ownership
- Caption: A valid address checksum detects many errors; it does not prove who controls the destination.
- Alt text: Address checksum systems shown separately from a cryptographic ownership check.
- Image orientation: Landscape
- Mobile crop notes: Preserve the separation between checksum buoys and signature checkpoint.
- Status: PLANNED
