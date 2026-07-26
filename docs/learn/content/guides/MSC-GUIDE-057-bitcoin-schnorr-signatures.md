---
registry_id: MSC-GUIDE-057
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: How Schnorr Signatures Work in Bitcoin
handle: bitcoin-schnorr-signatures
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

# How Schnorr Signatures Work in Bitcoin

## 1. Introductory deck

Bitcoin uses the BIP 340 Schnorr signature scheme for Taproot key-path spending and for signature checks inside tapscript. It combines secp256k1 curve arithmetic, 32-byte x-only public keys, 64-byte signatures, tagged hashes, and carefully defined nonce handling. Its linear structure can support separate multiparty protocols, but BIP 340 does not automatically aggregate signers, create threshold policies, or remove implementation risk.

## 2. Full article

A digital signature lets a verifier test whether a message was authorized with a secret signing key. In Bitcoin, the message is normally a transaction-context digest defined by the relevant signature-hash rules. Signing is not encryption, a valid signature does not reveal the private key, and it does not establish a person’s legal identity.

BIP 340 specifies the Schnorr scheme deployed with Taproot. This guide was researched on July 25, 2026 against BIPs 340, 341, 342, and 327 and Bitcoin Core 31.1 at tag `v31.1`, commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`. Wallet, hardware-signer, and multiparty support remains product- and version-specific.

### The secp256k1 setting

BIP 340 uses the secp256k1 elliptic-curve group. A private key is a secret scalar `d` in the valid range, and the corresponding public point is:

`P = d · G`

`G` is the group’s base point. Computing `P` from `d` is efficient; recovering `d` from a properly generated public point is assumed to be computationally infeasible under the elliptic-curve discrete-logarithm assumption. That assumption does not protect against weak key generation, leaked secrets, side channels, malicious firmware, unsafe backups, or incorrect software.

### X-only public keys and even-Y normalization

A full curve point has x- and y-coordinates. For nearly every valid x-coordinate, two curve points exist with opposite y-coordinates. BIP 340 chooses the point whose y-coordinate is even and encodes only its 32-byte big-endian x-coordinate. This is an **x-only public key**.

A verifier must validate the encoding. It lifts the x-coordinate to the unique even-y curve point and fails if no such point exists. During signing, the secret scalar is normalized so its public point has even y. The same parity convention is also applied to the public nonce point.

### The 64-byte signature

A BIP 340 signature is exactly 64 bytes:

- 32 bytes for `r`, the x-coordinate of an even-y nonce point `R`;
- 32 bytes for `s`, a scalar.

The BIP 340 signature itself does not contain a public key or a sighash flag. In a Taproot transaction witness, BIP 341 or BIP 342 may append a separate sighash byte. A 64-byte witness signature uses `SIGHASH_DEFAULT`; a 65-byte form includes a defined nonzero sighash value.

### Nonce, challenge, and signing equation

For each signature, the signer derives a fresh secret nonce scalar `k` and computes:

`R = k · G`

After normalizing `R` to even y, the signer computes the challenge:

`e = H_tag(r || pk || m) mod n`

Here `pk` is the x-only public key, `m` is the message, and `H_tag` is the tagged hash `BIP0340/challenge`. The signer then calculates:

`s = k + e · d mod n`

The signature is `r || s`. Including the public key in the challenge is important for security in settings involving tweaked or aggregated keys.

### Verification equation and validation rules

The public equation is:

`s · G = R + e · P`

A verifier does more than compare two abstract expressions. BIP 340 requires it to validate and lift the public key, reject out-of-range `r` or `s`, recompute the challenge, reconstruct `R = s · G - e · P`, and reject if `R` is infinity, has odd y, or has an x-coordinate different from `r`. Public-key and encoding validation are part of the specified result, not optional hardening.

### Tagged hashing

A BIP 340 tagged hash prefixes the hashed message with two copies of `SHA256(tag)`:

`SHA256(tag) || SHA256(tag) || message`

The scheme uses separate tags for auxiliary data, nonce derivation, and the signing challenge. This provides domain separation so values intended for one role are not silently reused as values for another. It does not make collisions mathematically impossible or replace careful message-domain design in applications.

### Deterministic nonce derivation and auxiliary randomness

BIP 340 derives the signing nonce from the normalized secret, public key, message, algorithm tag, and a 32-byte auxiliary value. The auxiliary value is processed with the `BIP0340/aux` tag and mixed into the derivation. For fixed inputs, the procedure is deterministic; fresh auxiliary randomness adds defense in depth against some fault and side-channel conditions.

Bitcoin Core 31.1’s vendored `libsecp256k1` interface accepts optional auxiliary randomness. An all-zero value follows the specified deterministic path but provides less additional protection. Multiparty protocols have separate nonce rules: MuSig2 nonces must not be treated as ordinary single-signer BIP 340 nonces.

### Nonce reuse and weak nonces

Reusing the same secret nonce with the same key for two different challenges allows an observer to solve the signing equations for the private scalar. Biased, predictable, cross-protocol, fault-manipulated, or improperly stored nonces can create similar exposure.

Deterministic derivation reduces dependence on a signing-time random-number generator, but it does not eliminate nonce risk. Implementations must follow the exact algorithm, protect secrets, prevent multiparty nonce reuse, and handle faults safely. BIP 340 recommends self-verifying a newly produced signature before releasing it. The low-level `libsecp256k1` signing API documents that callers requiring this check must perform it explicitly.

### Batch verification

BIP 340 specifies a combined verification equation for batches of signatures using pseudorandom coefficients. Correctly implemented batch verification can reduce work, while an invalid batch has only a negligible false-accept probability under the construction’s assumptions.

Batch verification is an implementation optimization. It does not change consensus validity, create a new kind of valid signature, or allow one invalid signature to become valid because it was grouped with others. Bitcoin Core 31.1’s Taproot validation path uses the vendored single-signature verification interface; support for batch verification must be established separately for each implementation.

### Taproot key path and tapscript

BIP 341 uses BIP 340 signatures for Taproot key-path spending. Verification uses the tweaked Taproot output key and a `TapSighash` message defined by BIP 341.

BIP 342 uses BIP 340 checks for 32-byte public keys inside tapscript. Its message extends the BIP 341 digest with script-path context such as the tapleaf hash, key version, and the last executed `OP_CODESEPARATOR` position. Tapscript also defines empty-signature behavior and `OP_CHECKSIGADD`.

These are separate layers: BIP 340 defines the signature scheme, BIP 341 defines Taproot output and key-path rules, and BIP 342 defines tapscript behavior.

### Linearity, MuSig2, and threshold boundaries

The Schnorr equation is linear in ways that support higher-level protocols. With a correctly designed coordination protocol, several participants can combine public keys and partial contributions so the final result verifies as one ordinary BIP 340 signature.

BIP 340 does not provide that coordination by itself. BIP 327 MuSig2 separately defines an interactive `n`-of-`n` multisignature protocol with key aggregation, nonce exchange, signing rounds, and partial-signature checks. MuSig2 is not a general `t`-of-`n` threshold scheme. Threshold protocols require separate specifications, setup or distributed key generation, nonce rules, implementations, and review.

Bitcoin Core’s ability to validate a BIP 340 signature does not mean its wallet automatically converts multisignature policies into one signature. Bitcoin Core 31.1 vendors a `libsecp256k1` MuSig module, but wallet, descriptor, RPC, hardware-device, and interoperability support must be verified separately.

### Hardware and implementation boundaries

A hardware signer may keep private key material off a general-purpose computer, but it still depends on firmware, display correctness, transaction parsing, nonce generation, host communication, backups, and user verification. BIP 340 verifies the message supplied by the surrounding protocol; it does not decide whether that message matches the user’s intent.

Safe implementations also depend on constant-time arithmetic, validated keys, correct tagged hashes, test-vector coverage, fault resistance, secure state, and clear APIs. Passing mathematical vectors is necessary evidence, not proof that an entire product is secure.

### Test evidence and quantum caveat

BIP 340 publishes valid and invalid test vectors and a readable reference implementation that is explicitly not production code. Bitcoin Core’s vendored `libsecp256k1` tests exercise those vectors, nonce inputs, tagged-hash midstates, x-only key parsing, signing, verification, and invalid arguments.

BIP 340 relies on a classical elliptic-curve hardness assumption. A sufficiently capable fault-tolerant quantum computer could change that assumption, but this is a protocol-planning caveat—not evidence of an immediate practical break or a reliable timeline. Bitcoin’s deployed BIP 340 rules are not post-quantum signatures, and no replacement is deployed merely because future alternatives are discussed.

## 3. Key Terms

- **BIP 340:** Deployed Schnorr signature specification used by Taproot.
- **secp256k1:** Elliptic curve and group parameters used by Bitcoin’s ECDSA and BIP 340 signatures.
- **Private scalar:** Secret integer used to derive a public point and produce signatures.
- **X-only public key:** A 32-byte x-coordinate interpreted as the unique secp256k1 point with even y.
- **Nonce:** Per-signature secret scalar used to create a public nonce point.
- **Challenge:** Tagged-hash-derived scalar binding the nonce point, key, and message.
- **Tagged hash:** SHA-256 construction prefixed with two copies of `SHA256(tag)` for domain separation.
- **Batch verification:** Optional combined verification technique for multiple signatures.
- **MuSig2:** Separate interactive `n`-of-`n` multisignature protocol standardized in BIP 327.
- **Threshold signature:** Separate protocol allowing a qualifying subset of participants to create one signature.
- **Tapscript:** BIP 342 script environment using BIP 340 checks for 32-byte public keys.

## 4. Sources

1. **BIP 340 — Schnorr Signatures for secp256k1** | Pieter Wuille, Jonas Nick, Tim Ruffing
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki
   - Supports: Curve setting, x-only keys, parity rules, encodings, equations, tagged hashes, nonce derivation, batch verification, and vectors.
2. **BIP 340 Test Vectors and Reference Implementation** | BIP 340 authors
   - URL: https://github.com/bitcoin/bips/tree/master/bip-0340
   - Supports: Valid and invalid byte-level cases and the non-production reference boundary.
3. **BIP 341 — Taproot** | Pieter Wuille, Jonas Nick, Anthony Towns
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki
   - Supports: Key-path use, TapSighash, output-key tweaking, and witness signature length rules.
4. **BIP 342 — Validation of Taproot Scripts** | Pieter Wuille, Jonas Nick, Anthony Towns
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0342.mediawiki
   - Supports: Tapscript checks, `OP_CHECKSIGADD`, and script-path message extensions.
5. **BIP 327 — MuSig2** | Jonas Nick, Tim Ruffing, Elliott Jin
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0327.mediawiki
   - Supports: Separate key aggregation, signing rounds, nonce state, and `n`-of-`n` boundary.
6. **Bitcoin Core 31.1 Tag Commit** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/commit/9be056a8a72b624dae9623b2f7bded92c2a21c91
   - Supports: Exact implementation and test version reviewed July 25, 2026.
7. **Bitcoin Core 31.1 Script Interpreter** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/interpreter.cpp
   - Supports: TapSighash construction, Schnorr witness handling, x-only key checks, and verification call paths.
8. **Vendored libsecp256k1 Schnorr API and Tests** | libsecp256k1 contributors
   - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/src/secp256k1/src/modules/schnorrsig
   - Supports: Signing and verification implementation, nonce interface, vectors, and invalid-input tests.
9. **Bitcoin Core 31.1 Taproot Functional Test** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/test/functional/feature_taproot.py
   - Supports: End-to-end Taproot signature and sighash cases.
10. **NIST Post-Quantum Cryptography Project** | National Institute of Standards and Technology
    - URL: https://csrc.nist.gov/projects/post-quantum-cryptography
    - Supports: Narrow distinction between deployed classical cryptography and separately standardized post-quantum systems.

## 5. SEO title

How Schnorr Signatures Work in Bitcoin | Mempool Surf Club

## 6. Meta description

Learn how BIP 340 Schnorr signatures use x-only keys, nonces, tagged hashes, verification equations, Taproot, and separate aggregation protocols.

## 7. Page excerpt

See how Bitcoin’s BIP 340 Schnorr signatures are constructed and verified—and why nonce safety, MuSig2, hardware support, and batch verification remain separate boundaries.

## 8. Estimated reading time

12 to 15 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-056 | How SegWit Changed Bitcoin
- Next: MSC-GUIDE-058 | How Digital Signatures Work in Bitcoin
- Prerequisite: MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work
- Prerequisite: MSC-GUIDE-055 | How Taproot Changed Bitcoin
- Branch: MSC-GUIDE-046 | How Discreet Log Contracts Work
- Branch: MSC-GUIDE-059 | How Hash Functions Work in Bitcoin
- Return: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] secp256k1 scalars, points, x-only encoding, parity, and key validation are separated.
- [x] The 32-byte key and 64-byte BIP 340 signature are distinguished from Taproot’s optional sighash byte.
- [x] Nonce, challenge, signing equation, verification equation, and tagged hashes are explained.
- [x] Deterministic derivation, auxiliary randomness, nonce reuse, weak nonces, and fault risk are qualified.
- [x] Batch verification is an optional optimization that does not change consensus validity.
- [x] BIPs 340, 341, 342, MuSig2, and threshold signing remain distinct.
- [x] Hardware, implementation, test-vector, and quantum claims remain bounded and dated.
- [x] Planned internal links remain inactive.

## 11. Human verification

- Reviewer: Pending — Bitcoin cryptography and implementation specialist
- Review date: Pending
- Notes: Human Verification remains pending. The specialist pass must reconfirm the BIP 340 equations and parity rules, key lifting and range failures, nonce guidance, libsecp256k1 self-verification boundary, Bitcoin Core 31.1 Taproot call paths, batch-verification wording, MuSig2 boundaries, hardware-signer claims, and the narrow quantum caveat.

## 12. Illustration brief

### Illustration 1

- Concept title: The X-Only Key Projection
- Educational purpose: Show how a curve point becomes a 32-byte BIP 340 public key.
- Recommended placement: After X-only public keys and even-Y normalization.
- Visual description: Vintage surveying plate with two mirrored curve points sharing one x-coordinate; the even-y point is selected and projected onto a 32-byte strip.
- Required labels: secp256k1, P, -P, Shared x, Even y, X-only key, 32 bytes
- Caption: BIP 340 encodes the x-coordinate and consistently selects the even-y point.
- Alt text: Two secp256k1 points share an x-coordinate, with the even-y point selected for an x-only key.
- Image orientation: Landscape
- Mobile crop notes: Keep both points above one centered coordinate strip.
- Status: PLANNED

### Illustration 2

- Concept title: Schnorr Signing Current
- Educational purpose: Connect the nonce, challenge, signing equation, and verification equation.
- Recommended placement: After Verification equation and validation rules.
- Visual description: Nautical current diagram where private scalar and nonce flow into public points, a tagged-hash buoy produces the challenge, and two channels meet at `sG = R + eP`.
- Required labels: d, P, k, R, m, e, s, Verification equality
- Caption: A verifier checks the public equation without learning the private scalar or nonce.
- Alt text: Flow diagram of BIP 340 signing inputs and the public verification equation.
- Image orientation: Landscape
- Mobile crop notes: Use a vertical flow ending in one large equality.
- Status: PLANNED

### Illustration 3

- Concept title: The Aggregation Boundary Chart
- Educational purpose: Separate BIP 340 single signatures, MuSig2, and threshold protocols.
- Recommended placement: After Linearity, MuSig2, and threshold boundaries.
- Visual description: Nautical chart with BIP 340 as a harbor, a marked MuSig2 `n`-of-`n` route, a separate threshold route, and warning shoals for nonce reuse, coordination, device support, and recovery.
- Required labels: BIP 340, Single signer, MuSig2, n-of-n, Threshold, Nonce exchange, Recovery, Device support
- Caption: Schnorr algebra enables higher-level protocols, but each adds its own coordination and safety rules.
- Alt text: Boundary map separating BIP 340, MuSig2, and threshold signature systems.
- Image orientation: Landscape
- Mobile crop notes: Keep all three routes visually distinct.
- Status: PLANNED
