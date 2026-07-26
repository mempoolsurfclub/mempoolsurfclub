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

Bitcoin uses the BIP 340 Schnorr signature scheme for Taproot key-path spending and for signature checks inside tapscript. The scheme uses the secp256k1 elliptic curve, 32-byte x-only public keys, 64-byte signatures, tagged hashing, and carefully specified nonce derivation. Its algebra supports useful multiparty protocols, but BIP 340 does not automatically aggregate signers, create threshold policies, or remove nonce and implementation risk.

## 2. Full article

A digital signature lets a verifier check that someone with the required secret signing key authorized a particular message. In Bitcoin, that message is usually a transaction-context digest defined by the relevant signature-hash rules. A signature is not encryption, does not reveal the private key, and does not prove the signer’s legal or personal identity.

BIP 340 specifies the Schnorr signature scheme used by Taproot. It is a byte-level specification for signatures over the secp256k1 elliptic curve. The same curve was already used for Bitcoin’s ECDSA signatures, but BIP 340 defines different public-key encoding, signature encoding, nonce derivation, challenge hashing, and verification rules.

This guide was researched on July 25, 2026 against the deployed BIP 340 specification, BIPs 341, 342, and 327, and Bitcoin Core 31.1 at tag `v31.1`, commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`. Current wallet, signing-device, and multiparty support remains product- and version-specific.

### The secp256k1 setting

The secp256k1 curve defines a finite set of curve points and a distinguished base point called `G`. A Bitcoin private key for this scheme is a scalar—an integer in the valid range from 1 through `n - 1`, where `n` is the order of `G`. The corresponding public point is:

`P = d · G`

Here, `d` is the private scalar and multiplication means repeated elliptic-curve group addition. Computing `P` from `d` is efficient. Recovering `d` from a properly generated `P` is believed to be computationally infeasible under the elliptic-curve discrete logarithm assumption.

That statement is an assumption used by the construction, not a proof that every wallet or device is secure. Weak key generation, leaked secrets, side channels, malicious firmware, incorrect validation, or unsafe backups can fail without breaking the underlying mathematics.

### X-only public keys

A full secp256k1 point has both an x-coordinate and a y-coordinate. For almost every valid x-coordinate, there are two possible curve points whose y-coordinates are negatives of each other. BIP 340 resolves this ambiguity by selecting the point with an even y-coordinate.

The public-key encoding is therefore only the 32-byte big-endian x-coordinate of the even-y point. This is called an x-only public key. A verifier must not treat every 32-byte string as a valid key: it must lift the x-coordinate to the curve and fail if no valid point exists.

Because the encoding omits the y-coordinate, the two secret scalars `d` and `n - d` correspond to the same x-only public key. During signing, BIP 340 normalizes the secret scalar so that the associated public point has even y. This is an encoding convention, not a loss of the private-key security assumption.

### The 64-byte signature

A BIP 340 signature is exactly 64 bytes:

- the first 32 bytes encode `r`, the x-coordinate of a nonce point `R` with even y;
- the second 32 bytes encode `s`, a scalar.

The signature does not contain a public key or a transaction sighash byte. In Taproot transaction witnesses, BIP 341 and BIP 342 may add a separate optional sighash byte, producing a 65-byte witness element. A 64-byte Taproot signature implies `SIGHASH_DEFAULT`; a 65-byte signature must append a defined nonzero sighash value. The core BIP 340 signature remains the first 64 bytes.

### Nonce point, challenge, and signing equation

For one signing operation, the signer derives a fresh secret nonce scalar `k` and computes the public nonce point:

`R = k · G`

After normalizing `R` to have even y, the signer computes a challenge scalar:

`e = H_tag(r || pk || m) mod n`

Here, `r` is the 32-byte x-coordinate of `R`, `pk` is the 32-byte x-only public key, `m` is the message, and `H_tag` is the BIP 340 tagged hash named `BIP0340/challenge`.

The signer then computes:

`s = k + e · d mod n`

The resulting signature is `r || s`. The public key is included in the challenge hash. This key prefixing protects the scheme against related-key problems that matter for additively tweaked keys and multiparty constructions, including the unhardened additive-derivation context described by BIP 32.

The equation is useful because a verifier can rearrange it without knowing `d` or `k`:

`s · G = R + e · P`

The left side can be computed from public `s`. The right side can be reconstructed from the public key, challenge, and nonce point. Equality shows that the signature is consistent with the message and public key under the scheme’s assumptions.

### Verification is more than checking one equation

BIP 340 verification follows exact validation steps. The verifier:

1. lifts the 32-byte public-key x-coordinate to the unique even-y point `P`, failing if that is impossible;
2. interprets `r` and `s`, failing if `r` is outside the field or `s` is outside the scalar range;
3. recomputes `e` with the tagged challenge hash;
4. computes `R = s · G - e · P`;
5. fails if `R` is the point at infinity, has odd y, or has an x-coordinate different from `r`.

These checks make the encoding and verification result fully specified. Public-key validation is not optional decoration: accepting an invalid point representation or inconsistent parity rule could produce divergent or unsafe behavior.

### Tagged hashing and domain separation

BIP 340 uses tagged SHA-256 for separate purposes, including auxiliary-data processing, nonce derivation, and challenge calculation. A tagged hash begins with:

`SHA256(tag) || SHA256(tag)`

followed by the message being hashed. Different tag names create different initial hash contexts. This is domain separation: data intended for one cryptographic role is less likely to be reinterpreted as data for another role.

Tagged hashing does not make collisions mathematically impossible. It separates contexts under the assumed properties of SHA-256 and the surrounding construction. Applications that sign non-transaction messages still need their own explicit message-domain design.

### Deterministic nonce derivation and auxiliary randomness

Nonce handling is one of the most important implementation boundaries in any Schnorr signer. BIP 340’s default signing procedure derives the nonce from the normalized secret scalar, public key, message, algorithm tag, and a 32-byte auxiliary value.

The auxiliary value is first processed with the `BIP0340/aux` tagged hash and XORed with the normalized secret. The result, the public key, and the message enter the `BIP0340/nonce` tagged hash. This makes the core nonce derivation deterministic for fixed inputs while allowing fresh auxiliary randomness to add defense in depth.

BIP 340 recommends fresh randomness when available. An all-zero auxiliary value still follows the specified deterministic procedure, but it provides less protection against some fault and side-channel conditions. Bitcoin Core’s vendored `libsecp256k1` API accepts optional 32-byte auxiliary randomness and documents that it is supplemental rather than a substitute for correct nonce derivation.

A signer must not confuse single-signer BIP 340 nonce derivation with multiparty nonce protocols. MuSig2, for example, has separate nonce-generation and state-handling requirements and warns against deterministic nonce derivation from session parameters.

### Alternative nonce functions

BIP 340 permits alternative signing algorithms to produce valid signatures, but that does not make arbitrary nonce functions safe. The specification requires the intermediate nonce material to be fresh, uniformly distributed, and not even partially predictable to an attacker. For deterministic alternatives, the same inputs must not be reused in another signing context; avoiding reuse of the same private key across different signing schemes is the most reliable boundary.

The vendored `libsecp256k1` custom signing API exposes a hardened nonce callback that receives the message, secret key, x-only public key, algorithm identifier, and caller data. Replacing the default callback transfers responsibility for domain separation, unpredictability, cross-protocol safety, and state handling to the caller. Copying an ECDSA nonce procedure such as RFC 6979 under the same key can create nonce reuse across schemes rather than inheriting BIP 340’s guarantees.

### Why nonce reuse is catastrophic

If the same secret nonce is reused to sign two different challenges with the same key, an observer can solve the two signing equations for the private scalar. Similar failures can result from biased, partially predictable, cross-protocol, or fault-manipulated nonces.

Deterministic derivation reduces dependence on a signing-time random-number generator, but it does not eliminate nonce risk. Reusing a key across incompatible signing schemes, accepting attacker-controlled precomputed values, reusing multiparty secret nonces, or implementing the tagged hashes incorrectly can still expose the key.

Implementations should also consider self-verifying a newly produced signature before releasing it. BIP 340 recommends this as protection against computation faults. The `libsecp256k1` signing API documents that its signing functions do not automatically perform that final BIP 340 self-verification, so callers that require it must do so explicitly.

### Batch verification

BIP 340 defines a way to verify multiple signatures with one combined equation and pseudorandom coefficients. When every individual signature is valid, the batch equation succeeds. If at least one is invalid, the probability of an invalid batch passing must be negligible when the coefficients are generated correctly.

Batch verification is a performance technique. It does not create a different class of consensus-valid signature, weaken the requirement that every signature satisfy the BIP 340 rules, or let a transaction become valid merely because it was grouped with other signatures. An implementation can validate signatures individually and obtain the same validity result.

Bitcoin Core 31.1 uses the vendored `libsecp256k1` single-signature verification interface for Taproot checks. BIP 340 specifies batch verification, but deployers must separately verify whether a particular library, node, wallet, or service actually uses it.

### Taproot usage

BIP 341 uses BIP 340 signatures for Taproot key-path spending. The signature is verified against the tweaked Taproot output key and a `TapSighash` message that commits to transaction context according to the selected sighash mode.

BIP 342 uses BIP 340 inside tapscript for 32-byte public keys. Its signature message extends the BIP 341 message with the tapleaf hash, key version, and the opcode position of the last executed `OP_CODESEPARATOR`. Tapscript also defines how empty and nonempty signatures behave and adds `OP_CHECKSIGADD` for script-level threshold constructions.

Taproot usage therefore combines three layers:

- BIP 340 defines the Schnorr signature scheme;
- BIP 341 defines the Taproot output and key-path message;
- BIP 342 defines tapscript signature behavior and message extensions.

Calling all of these “Schnorr” can hide important differences in what is actually signed.

### Linearity, aggregation, and threshold signing

The Schnorr equation is linear in ways that support higher-level constructions. Multiple participants can, with a correctly designed protocol, combine public keys and partial signing contributions so that the final result verifies as one ordinary BIP 340 signature.

That does not happen automatically. BIP 340 does not define signer discovery, key aggregation coefficients, nonce exchange, partial-signature verification, participant authentication, recovery, blame, secure storage, or threshold policy.

BIP 327 MuSig2 is a separate, interactive `n`-of-`n` multisignature protocol compatible with BIP 340 signatures. It aggregates keys and coordinates two signing rounds. It is not a general `t`-of-`n` threshold scheme. Threshold schemes such as FROST-style constructions require separate specifications, distributed key generation or setup, nonce rules, implementations, and review.

Bitcoin Core support for a BIP 340 signature check is not the same as automatic wallet support for MuSig2 or threshold signing. Bitcoin Core 31.1 vendors a `libsecp256k1` MuSig module and documentation, but user-facing wallet, descriptor, RPC, hardware-device, and interoperability support must be verified separately against exact versions and workflows.

### Hardware and software boundaries

A hardware signer can keep private key material off a general-purpose computer, but it still relies on firmware, display correctness, transaction parsing, nonce generation, host communication, backup design, and user verification.

A host can provide a valid-looking message that authorizes an unintended transaction if the signer does not independently understand and display the relevant amounts, outputs, scripts, fee, and sighash mode. BIP 340 verifies a message chosen by the surrounding protocol; it does not decide whether that message matches the user’s intent.

The same distinction applies to software libraries. Constant-time arithmetic, secure memory handling, validated public keys, correct tagged hashes, test-vector coverage, fault resistance, and safe APIs are implementation responsibilities. Passing mathematical test vectors is necessary evidence, not proof that an entire product is secure.

### Test vectors

BIP 340 publishes valid and invalid test vectors, a reference implementation, and a vector generator. The reference code is intentionally simple and is not production code.

Bitcoin Core’s vendored `libsecp256k1` tests exercise the BIP 340 vectors, nonce-function inputs, tagged-hash midstates, x-only key parsing, signing, verification, and invalid arguments. These tests help implementations converge on the specified byte-level behavior. They cannot prove the absence of bugs outside the tested cases.

### Quantum-computing boundary

BIP 340 relies on the practical hardness of the elliptic-curve discrete logarithm problem. A sufficiently capable fault-tolerant quantum computer running an appropriate algorithm would change that assumption. Bitcoin’s deployed BIP 340 rules are not post-quantum signature rules.

That is a protocol-planning caveat, not evidence of an immediate practical break or a timeline. Current claims should distinguish theoretical algorithmic implications, demonstrated hardware capability, exposed public keys, wallet migration options, and any future consensus proposal. No post-quantum replacement is deployed merely because it is discussed.

### A practical evaluation checklist

When evaluating a Schnorr claim, ask:

- Is the claim about the BIP 340 mathematics, Taproot consensus, Bitcoin Core implementation, or a wallet feature?
- Is the public key a validated 32-byte x-only key with the correct parity convention?
- Which exact message and sighash rules are being used?
- How are nonces derived, protected, and prevented from reuse?
- Is aggregation provided by a separate protocol such as MuSig2?
- Is the construction single-signer, `n`-of-`n`, or threshold?
- Does the signing device independently verify what the user is authorizing?
- Which test vectors, library version, and interoperability tests support the claim?

Schnorr signatures are a deployed part of Bitcoin’s Taproot validation system. The safety of a real signing workflow still depends on every layer around the equation.

## 3. Key Terms

- **BIP 340:** The deployed Schnorr signature specification used by Taproot.
- **secp256k1:** The elliptic curve and group parameters used by Bitcoin’s ECDSA and BIP 340 signatures.
- **Private scalar:** Secret integer used to produce a public curve point and signatures.
- **Public point:** Curve point derived by multiplying the base point by a private scalar.
- **X-only public key:** A 32-byte x-coordinate interpreted as the unique secp256k1 point with even y.
- **Even-Y normalization:** Convention that selects the even-y representative for public and nonce points.
- **Nonce:** Per-signature secret scalar used to create the public nonce point.
- **Nonce point:** Public curve point `R = k · G` associated with the nonce.
- **Challenge:** Tagged-hash-derived scalar binding the nonce point, public key, and message.
- **Tagged hash:** SHA-256 construction prefixed by two copies of `SHA256(tag)` for domain separation.
- **Batch verification:** Combined verification technique for multiple signatures with negligible false-accept probability when correctly implemented.
- **MuSig2:** Separate interactive `n`-of-`n` multisignature protocol standardized in BIP 327.
- **Threshold signature:** Protocol allowing a qualifying subset of participants to create one signature under separate setup and security rules.
- **Taproot key path:** Spending path authorized by a BIP 340 signature for the Taproot output key.
- **Tapscript:** BIP 342 script environment using BIP 340 signature checks for 32-byte public keys.

## 4. Sources

1. **BIP 340 — Schnorr Signatures for secp256k1** | Pieter Wuille, Jonas Nick, Tim Ruffing
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki
   - Supports: secp256k1 setting, x-only keys, even-y normalization, 32-byte key and 64-byte signature encodings, signing and verification equations, tagged hashes, default and alternative nonce derivation, auxiliary randomness, batch verification, applications, and test vectors.
2. **BIP 340 Test Vectors** | BIP 340 authors
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0340/test-vectors.csv
   - Supports: Valid and invalid byte-level signing and verification cases.
3. **BIP 340 Reference Implementation** | BIP 340 authors
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0340/reference.py
   - Supports: Readable reference algorithms and the explicit non-production boundary.
4. **BIP 341 — Taproot: SegWit Version 1 Spending Rules** | Pieter Wuille, Jonas Nick, Anthony Towns
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki
   - Supports: Taproot key-path use, TapSighash messages, tweaked output keys, 64- and 65-byte witness signature rules, and aggregation boundaries.
5. **BIP 342 — Validation of Taproot Scripts** | Pieter Wuille, Jonas Nick, Anthony Towns
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0342.mediawiki
   - Supports: Tapscript BIP 340 checks, OP_CHECKSIGADD, empty-signature behavior, and tapscript signature-message extensions.
6. **BIP 327 — MuSig2 for BIP 340-Compatible Multisignatures** | Jonas Nick, Tim Ruffing, Elliott Jin
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0327.mediawiki
   - Supports: Separate key aggregation, two-round signing, `n`-of-`n` boundary, nonce-state requirements, and BIP 340 compatibility.
7. **BIP 32 — Hierarchical Deterministic Wallets** | Pieter Wuille
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki
   - Supports: Unhardened additive public-key derivation context relevant to BIP 340 key prefixing.
8. **SEC 2, Version 2.0** | Standards for Efficient Cryptography Group
   - URL: https://www.secg.org/sec2-v2.pdf
   - Supports: secp256k1 domain parameters.
9. **Bitcoin Core 31.1 Tag Commit** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/commit/9be056a8a72b624dae9623b2f7bded92c2a21c91
   - Supports: Exact source and test version reviewed July 25, 2026.
10. **Bitcoin Core 31.1 Script Interpreter Interface** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/interpreter.h
    - Supports: Taproot and tapscript signature versions, SIGHASH_DEFAULT, and tagged-hash contexts.
11. **Bitcoin Core 31.1 Script Interpreter** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/interpreter.cpp
    - Supports: 64- and 65-byte Schnorr witness handling, TapSighash construction, x-only key checks, and libsecp256k1 verification calls.
12. **Bitcoin Core 31.1 X-Only Public-Key Interface** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/pubkey.h
    - Supports: Bitcoin Core x-only public-key parsing, serialization, tweaking, and Schnorr verification interfaces.
13. **Vendored libsecp256k1 Schnorr Signature API at Bitcoin Core 31.1** | libsecp256k1 contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/secp256k1/include/secp256k1_schnorrsig.h
    - Supports: BIP 340 API, default and custom nonce functions, auxiliary randomness, signing, self-verification boundary, and verification.
14. **Vendored libsecp256k1 Schnorr Implementation at Bitcoin Core 31.1** | libsecp256k1 contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/secp256k1/src/modules/schnorrsig/main_impl.h
    - Supports: Exact signing, challenge, nonce, and verification implementation.
15. **Vendored libsecp256k1 Schnorr Unit Tests at Bitcoin Core 31.1** | libsecp256k1 contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/secp256k1/src/modules/schnorrsig/tests_impl.h
    - Supports: BIP 340 vectors, tagged-hash midstates, nonce-input sensitivity, x-only key parsing, signing, verification, and invalid-input tests.
16. **Vendored libsecp256k1 Schnorr Exhaustive Tests at Bitcoin Core 31.1** | libsecp256k1 contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/secp256k1/src/modules/schnorrsig/tests_exhaustive_impl.h
    - Supports: Exhaustive-group test evidence for Schnorr operations in the library’s test configuration.
17. **Vendored libsecp256k1 MuSig Documentation at Bitcoin Core 31.1** | libsecp256k1 contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/secp256k1/doc/musig.md
    - Supports: Implementation-specific MuSig2 workflow, nonce, session, and API boundaries.
18. **Bitcoin Core 31.1 Taproot Functional Test** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/test/functional/feature_taproot.py
    - Supports: End-to-end Taproot key-path, script-path, sighash, and signature validation cases.
19. **Bitcoin Core 31.1 Script Unit Tests** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/test/script_tests.cpp
    - Supports: Tagged consensus and policy signature validation cases.
20. **NIST Post-Quantum Cryptography Project** | National Institute of Standards and Technology
    - URL: https://csrc.nist.gov/projects/post-quantum-cryptography
    - Supports: Narrow distinction between deployed classical public-key cryptography and separately standardized post-quantum systems.

## 5. SEO title

How Schnorr Signatures Work in Bitcoin | Mempool Surf Club

## 6. Meta description

Learn how BIP 340 Schnorr signatures use x-only keys, nonces, tagged hashes, verification equations, Taproot, and separate aggregation protocols.

## 7. Page excerpt

See how Bitcoin’s BIP 340 Schnorr signatures are constructed and verified—and why nonce safety, MuSig2, hardware support, and batch verification remain separate boundaries.

## 8. Estimated reading time

15 to 18 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-056 | How SegWit Changed Bitcoin
- Next: MSC-GUIDE-058 | How Digital Signatures Work in Bitcoin
- Prerequisite: MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work
- Prerequisite: MSC-GUIDE-055 | How Taproot Changed Bitcoin
- Branch: MSC-GUIDE-046 | How Discreet Log Contracts Work
- Branch: MSC-GUIDE-058 | How Digital Signatures Work in Bitcoin
- Branch: MSC-GUIDE-059 | How Hash Functions Work in Bitcoin
- Return: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] secp256k1 private scalars, public points, x-only encoding, even-y normalization, and public-key validation are separated.
- [x] The 32-byte public-key and 64-byte BIP 340 signature formats are distinguished from Taproot’s optional sighash byte.
- [x] The nonce point, challenge, signing equation, verification equation, tagged hashes, and domain separation are explained.
- [x] Default and alternative nonce functions, auxiliary randomness, nonce reuse, weak nonces, fault resistance, and cross-protocol risk are qualified.
- [x] Batch verification is described as an optional performance technique that does not change consensus validity.
- [x] Taproot key-path and tapscript usage are assigned to BIPs 341 and 342 rather than BIP 340 alone.
- [x] Linearity is not presented as automatic signer aggregation.
- [x] BIP 340, MuSig2, `n`-of-`n` multisignature, and threshold signing remain distinct.
- [x] Bitcoin Core and libsecp256k1 implementation evidence is pinned to 31.1 and dated July 25, 2026.
- [x] Hardware-signer, wallet, interoperability, and quantum-computing claims remain bounded and non-absolute.
- [x] Planned internal links remain inactive and do not imply publication.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-26
- Primary evidence reviewed: BIP 340 Default Signing, Alternative Signing, Verification, Batch Verification, applications, test vectors, and reference code; BIPs 32, 327, 341, and 342; Bitcoin Core `v31.1` commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`; `src/script/interpreter.cpp`, `src/script/interpreter.h`, `src/pubkey.cpp`, and `src/pubkey.h`; vendored `libsecp256k1` `include/secp256k1_schnorrsig.h`, `src/modules/schnorrsig/main_impl.h`, `tests_impl.h`, `tests_exhaustive_impl.h`, and `doc/musig.md`; `test/functional/feature_taproot.py`; and `src/test/script_tests.cpp`.
- Material corrections made: Added the BIP 340 alternative-nonce-function and cross-scheme key-reuse boundary; tied key-prefixing context to BIP 32 additive derivation; confirmed 32-byte x-only key lifting, even-Y normalization, 64-byte core signatures and Taproot’s optional byte, exact signing and verification equations, and tagged domains; confirmed that the vendored signing API does not self-verify produced signatures; kept batch verification separate from Bitcoin Core’s individual verification path; and preserved the separation among BIP 340, MuSig2 `n`-of-`n`, and general threshold protocols.
- Remaining sensitivities: Security still depends on the elliptic-curve discrete-log and hash assumptions, correct nonce and fault handling, safe custom nonce callbacks, exact Bitcoin Core and `libsecp256k1` versions, and product-specific wallet, firmware, PSBT, display, MuSig2, and threshold support.
- Renewal requirement: Future Bitcoin Core or `libsecp256k1` releases, BIP revisions, wallet or signing-device changes, new multiparty specifications, or material cryptanalytic results require renewed verification. Human Verification does not authorize copy-lock.

## 12. Illustration brief

### Illustration 1

- Concept title: The X-Only Key Projection
- Educational purpose: Show how a secp256k1 curve point becomes a 32-byte BIP 340 public key.
- Recommended placement: After X-only public keys.
- Visual description: Vintage surveying plate with two mirrored curve points sharing one x-coordinate; the even-y point is selected and projected onto a 32-byte horizontal coordinate strip.
- Required labels: secp256k1 curve, P, -P, Shared x-coordinate, Even y, X-only public key, 32 bytes
- Caption: BIP 340 encodes the x-coordinate and consistently selects the corresponding even-y point.
- Alt text: Technical diagram showing two secp256k1 points with the same x-coordinate and the even-y point selected for an x-only key.
- Image orientation: Landscape
- Mobile crop notes: Keep the mirrored points above one centered 32-byte strip.
- Status: PLANNED

### Illustration 2

- Concept title: Schnorr Signing Current
- Educational purpose: Explain the nonce, challenge, signing equation, and verification equation as one connected system.
- Recommended placement: After Verification is more than checking one equation.
- Visual description: Nautical current diagram where private scalar and nonce flow into public points, a tagged-hash buoy produces the challenge, and two channels meet at the equality `sG = R + eP`.
- Required labels: Private scalar d, Public point P, Nonce k, Nonce point R, Message m, Tagged challenge e, Signature s, Verification equality
- Caption: A verifier checks the public equation without learning the private scalar or nonce.
- Alt text: Flow diagram of BIP 340 signing inputs producing a signature and the corresponding public verification equation.
- Image orientation: Landscape
- Mobile crop notes: Use a vertical signing flow ending in one large equality.
- Status: PLANNED

### Illustration 3

- Concept title: The Aggregation Boundary Chart
- Educational purpose: Separate BIP 340 single signatures from MuSig2 and threshold protocols.
- Recommended placement: After Linearity, aggregation, and threshold signing.
- Visual description: Nautical chart with BIP 340 as the shared harbor, a marked MuSig2 `n`-of-`n` route, a separate threshold route, and warning shoals for nonce reuse, coordination, hardware support, and recovery.
- Required labels: BIP 340, Single signer, MuSig2, n-of-n, Threshold protocol, Nonce exchange, Partial signatures, Recovery, Device support
- Caption: Schnorr algebra enables higher-level protocols, but each protocol adds its own coordination and safety requirements.
- Alt text: Boundary map separating single-signer BIP 340, MuSig2 multisignatures, and threshold signature systems.
- Image orientation: Landscape
- Mobile crop notes: Keep three routes distinct and place warning shoals between them.
- Status: PLANNED
