---
registry_id: MSC-GUIDE-058
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: How Digital Signatures Work in Bitcoin
handle: bitcoin-digital-signatures
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

# How Digital Signatures Work in Bitcoin

## 1. Introductory deck

Bitcoin signatures prove that a transaction satisfies a key-based authorization condition; they do not encrypt the transaction or prove a person’s real-world identity. Bitcoin currently uses ECDSA and BIP 340 Schnorr signatures over secp256k1, with different encodings and signature-hash rules across legacy, SegWit version 0, Taproot key-path, and tapscript contexts.

## 2. Full article

A Bitcoin private key is a secret scalar in the secp256k1 group. A public key is a curve point derived from it. A wallet or signing device uses the private key to create a signature over a precisely constructed message, while nodes use the public key and the applicable validation rules to verify it.

That verification is evidence of authorization under a script condition. It is not proof of a legal identity, citizenship, account ownership, or continuing control at every later date. A key could be shared, delegated, lost, compromised, or destroyed after a signature was made.

This guide was researched on July 25, 2026 against BIPs 66, 143, 174, 340, 341, 342, and 322 and Bitcoin Core 31.1 at tag `v31.1`, commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`. Wallet and signing-device behavior remains product- and version-specific.

### Signing is not encryption

Encryption hides information from parties that lack a decryption key. Bitcoin transaction signatures do a different job: they authorize spending conditions while the transaction data remains available for validation and relay. A signature does not conceal amounts, scripts, inputs, or outputs.

### ECDSA and Schnorr on secp256k1

Bitcoin’s historical transaction signatures use ECDSA over secp256k1. SegWit version 0 retained ECDSA while changing the message construction. Taproot introduced BIP 340 Schnorr signatures for key-path spending and for 32-byte public keys in tapscript.

The two schemes share curve parameters but differ in public-key representation, signature encoding, nonce procedure, verification equation, and protocol uses. Schnorr’s linear structure is valuable for separate multiparty protocols, but that does not make it universally superior for every application or automatically aggregate signers.

### What a transaction input signs

A Bitcoin input does not normally sign a human-readable sentence such as “send 0.1 BTC to Alice.” It signs a digest of serialized transaction context assembled according to the input’s script version and signature-hash mode.

The committed fields can include versions, previous outputs, input sequences, spent-output amounts and scripts, outputs, locktime, annex data, and script-path information. Which fields are included—and how they are serialized—depends on legacy, BIP 143, BIP 341, or BIP 342 rules.

A signature hash is also not a transaction ID. A txid identifies the non-witness serialization of a transaction. A signature digest is a purpose-built message for authorizing a particular input under particular rules.

### Signature-hash flags

The base output modes are:

- `SIGHASH_ALL`: commits to all outputs;
- `SIGHASH_NONE`: commits to no outputs;
- `SIGHASH_SINGLE`: commits to the output with the same index as the signing input, subject to context-specific rules;
- `SIGHASH_DEFAULT`: Taproot’s default mode, which behaves like `SIGHASH_ALL` for the standard case but has its own encoded value.

`SIGHASH_ANYONECANPAY` can be combined with the non-default base modes. It narrows the input-side commitment to the current input rather than all inputs. These flags change what later transaction modifications invalidate a signature. They do not make those modifications automatically safe or intended.

### Legacy signature hashing

Legacy signature hashing creates a modified transaction serialization for the signing input. The relevant previous output’s script is inserted as `scriptCode`; other input scripts are blanked, and the selected sighash mode controls which inputs, sequences, and outputs are committed.

The legacy digest does not directly commit to the amount of the spent output. A signer therefore needs trusted information about that amount from outside the legacy digest if it is expected to display or verify fees accurately. Legacy `SIGHASH_SINGLE` also preserves a historical out-of-range behavior that implementations must handle exactly rather than “correcting” locally.

### BIP 143 for SegWit version 0

BIP 143 defines a different digest for SegWit version 0. It uses reusable hashes such as `hashPrevouts`, `hashSequence`, and `hashOutputs`, and it commits to the current input’s previous-output amount. This improved signing-device visibility and avoided the legacy quadratic hashing pattern for many-input transactions.

The amount commitment is context-specific. It does not mean every Bitcoin signature format always commits to amounts in the same way.

### Taproot and tapscript signature hashing

BIP 341 defines `TapSighash` for Taproot. Depending on the sighash flags, the message can commit to transaction version and locktime, previous outputs, spent-output amounts and `scriptPubKey` values, sequences, outputs, the current input, and an optional annex. `SIGHASH_DEFAULT` is valid only in this Taproot context.

BIP 342 extends the message for tapscript spends with the tapleaf hash, key version, and the opcode position of the last executed `OP_CODESEPARATOR`. A key-path signature and a tapscript signature may both use BIP 340 arithmetic while authorizing different messages.

### Legacy ECDSA encoding and strict DER

ECDSA mathematically produces two scalars, `r` and `s`. In legacy and SegWit version 0 scripts, Bitcoin serializes them as a DER sequence and appends a sighash byte for script evaluation.

BIP 66 made strict DER encoding a consensus rule. Length fields, integer markers, sign bits, and unnecessary leading bytes must follow the specified form. Encoding rules are separate from whether the ECDSA equation itself verifies.

### Low-S normalization and malleability

For a valid ECDSA signature `(r, s)`, a related signature using `n - s` can also verify. Low-S normalization chooses the lower representative to reduce this signature-level malleability.

As of Bitcoin Core 31.1, `SCRIPT_VERIFY_LOW_S` is included in standard relay and mining policy flags but not in the set of mandatory script verification flags used to describe legacy consensus rules. SegWit version 0’s witness rules and standardness context must be evaluated precisely. Taproot Schnorr signatures use a fixed 64-byte encoding and do not have the same ECDSA high-S transformation, but transaction malleability can still arise through other permitted transaction changes or application behavior.

### NULLFAIL and contextual failure behavior

`NULLFAIL` requires signatures that fail certain legacy or SegWit signature checks to be empty rather than arbitrary nonempty invalid values. In Bitcoin Core 31.1, `SCRIPT_VERIFY_NULLFAIL` is part of standard policy flags but not the mandatory legacy consensus flag set.

Tapscript has different consensus behavior. Under BIP 342, a nonempty signature that is checked and fails causes script failure. Empty signatures have defined behavior that supports constructions using `OP_CHECKSIGADD`. These rules should not be collapsed into one universal “invalid signatures must be empty” statement.

### Nonces and key compromise

Both ECDSA and Schnorr signing require a per-signature secret nonce. If the same nonce is reused for different messages with the same key, or if nonces are biased or predictable, the private key can become recoverable.

Deterministic nonce generation reduces reliance on a fresh random number for every signature, but it does not remove risk from faulty implementations, side channels, cross-protocol key reuse, malicious firmware, or multiparty nonce-state failures. ECDSA implementations commonly use RFC 6979-style deterministic generation; BIP 340 defines its own tagged-hash derivation with optional auxiliary randomness.

### Nodes verify; wallets construct

A fully validating node checks signatures while evaluating each input’s script under the active consensus rules. The node does not need the private key and usually does not know the signer’s identity or intent.

Wallets and signing devices perform a different task. They select coins, construct or parse transactions, obtain previous-output data, choose sighash modes, derive keys, display intent, and create signatures. A mathematically valid signature can still authorize an unwanted transaction if the signer was shown incomplete or misleading information.

### Offline signing and PSBT

Offline signing separates transaction construction from key use. BIP 174 PSBT provides a structured container for unsigned transaction data, previous-output information, scripts, derivation paths, partial signatures, and finalization data.

PSBT coordinates roles; it does not guarantee that supplied data is truthful, that a signer understands every script, that fees are correct, or that a hardware display is complete. Signers must validate the fields they rely on and refuse unsupported or ambiguous conditions.

### Hardware-wallet boundaries

A hardware wallet can reduce exposure of private keys to a general-purpose computer, but it does not eliminate all signing risk. Security still depends on firmware, supply chain, transaction parsing, display integrity, supported scripts, amount and fee verification, backups, passphrases, recovery procedures, and user attention.

Support should be stated at an exact device and firmware version. “Supports Taproot” can mean address generation, receiving, key-path signing, script-path signing, PSBT fields, or only a subset.

### Transaction signatures and message signing

Wallet message signing is not the same operation as transaction authorization. Historical “Bitcoin Signed Message” conventions, BIP 322 generic message signing, application-specific proofs, and transaction signatures use different message formats and verification rules.

A valid message signature may prove control of a key or spending condition for the defined challenge at that moment. It does not move coins, become a transaction signature, or establish a universal identity claim. Verifiers must identify the convention, network, address or script type, domain separation, and replay assumptions.

## 3. Key Terms

- **Digital signature:** Cryptographic authorization proof over a defined message.
- **ECDSA:** Historical Bitcoin transaction signature scheme over secp256k1.
- **Schnorr signature:** BIP 340 signature scheme used by Taproot.
- **Signature hash:** Transaction-context digest signed for one input.
- **Sighash flag:** Mode controlling which transaction fields a signature commits to.
- **Strict DER:** Consensus encoding rules for legacy ECDSA signatures under BIP 66.
- **Low-S:** Normalized ECDSA `s` value used to reduce signature malleability.
- **NULLFAIL:** Rule requiring empty signatures in specified failed-check contexts.
- **PSBT:** BIP 174 format for coordinating transaction construction and signing.
- **Hardware signer:** Dedicated device that constructs signatures while attempting to isolate private keys.
- **Message signing:** Separate convention for proving control over a defined non-transaction message.

## 4. Sources

1. **BIP 66 — Strict DER Signatures** | Pieter Wuille
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki
   - Supports: Consensus DER encoding requirements.
2. **BIP 143 — Transaction Signature Verification for Version 0 Witness Program** | Johnson Lau, Pieter Wuille
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0143.mediawiki
   - Supports: SegWit version 0 digest fields, amount commitment, and reusable hashes.
3. **BIP 340 — Schnorr Signatures for secp256k1** | Pieter Wuille, Jonas Nick, Tim Ruffing
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki
   - Supports: Schnorr scheme, encoding, nonce derivation, and verification.
4. **BIP 341 — Taproot** | Pieter Wuille, Jonas Nick, Anthony Towns
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki
   - Supports: Taproot signature hashing, sighash modes, amounts, scripts, annex, and key-path rules.
5. **BIP 342 — Validation of Taproot Scripts** | Pieter Wuille, Jonas Nick, Anthony Towns
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0342.mediawiki
   - Supports: Tapscript message extensions and failed-signature behavior.
6. **BIP 174 — Partially Signed Bitcoin Transaction Format** | Andrew Chow
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0174.mediawiki
   - Supports: PSBT roles, fields, and coordination boundary.
7. **BIP 322 — Generic Signed Message Format** | Karl-Johan Alm
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0322.mediawiki
   - Supports: Distinction between message signing and transaction authorization.
8. **Bitcoin Core 31.1 Tag Commit** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/commit/9be056a8a72b624dae9623b2f7bded92c2a21c91
   - Supports: Exact implementation version reviewed July 25, 2026.
9. **Bitcoin Core 31.1 Script Interpreter Interface** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/interpreter.h
   - Supports: Sighash constants, script verification flags, and signature versions.
10. **Bitcoin Core 31.1 Script Interpreter** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/interpreter.cpp
    - Supports: Legacy, witness, Taproot, and tapscript digest and verification behavior.
11. **Bitcoin Core 31.1 Policy Flags** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/policy/policy.h
    - Supports: Standard-policy inclusion of LOW_S and NULLFAIL.
12. **Bitcoin Core 31.1 Transaction Signing Code** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/sign.cpp
    - Supports: Exact ECDSA and Schnorr signing paths, sighash selection, amount requirements, and Taproot signing-data boundaries.
13. **RFC 6979 — Deterministic Usage of DSA and ECDSA** | Thomas Pornin
    - URL: https://www.rfc-editor.org/rfc/rfc6979
    - Supports: Deterministic ECDSA nonce-generation construction.

## 5. SEO title

How Digital Signatures Work in Bitcoin | Mempool Surf Club

## 6. Meta description

Learn what Bitcoin signatures authorize, how ECDSA and Schnorr differ, and how sighash rules change across legacy, SegWit, Taproot, and tapscript.

## 7. Page excerpt

Bitcoin signatures authorize specific transaction context—not identities or encrypted messages. See how formats, sighash flags, wallets, PSBT, and node verification fit together.

## 8. Estimated reading time

14 to 17 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-057 | How Schnorr Signatures Work in Bitcoin
- Next: MSC-GUIDE-059 | How Hash Functions Work in Bitcoin
- Prerequisite: MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work
- Prerequisite: MSC-GUIDE-009 | How Bitcoin Transactions Work
- Branch: MSC-GUIDE-055 | How Taproot Changed Bitcoin
- Branch: MSC-GUIDE-056 | How SegWit Changed Bitcoin
- Return: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] Private keys, public keys, addresses, authorization, and identity are separated.
- [x] Signing is not described as encryption.
- [x] ECDSA, BIP 340 Schnorr, DER, low-S, NULLFAIL, and contextual rules remain distinct.
- [x] All named sighash modes and ANYONECANPAY are explained.
- [x] Legacy, BIP 143, BIP 341, and BIP 342 messages remain distinct, including amount commitments.
- [x] Nonce, malleability, PSBT, offline signing, hardware, and message-signing boundaries are qualified.
- [x] Node verification is separated from wallet and device construction.
- [x] Current implementation claims are pinned to Bitcoin Core 31.1 and dated July 25, 2026.
- [x] Planned internal links remain inactive.

## 11. Human verification

- Reviewer: Pending — Bitcoin cryptography and implementation specialist
- Review date: Pending
- Notes: Human Verification remains pending. The specialist pass must reconfirm legacy sighash edge cases, BIP 143 and TapSighash fields, strict DER consensus behavior, low-S and NULLFAIL policy-versus-consensus wording, tapscript failures, nonce claims, PSBT boundaries, Bitcoin Core 31.1 call paths, and hardware/message-signing distinctions.

## 12. Illustration brief

### Illustration 1

- Concept title: Four Signature Message Channels
- Educational purpose: Compare legacy, SegWit version 0, Taproot key path, and tapscript commitments.
- Recommended placement: After Taproot and tapscript signature hashing.
- Visual description: Vintage signal panel with four parallel channels feeding digest gauges; highlighted fields differ by context.
- Required labels: Legacy, BIP 143, BIP 341, BIP 342, Inputs, Outputs, Amount, scriptCode, Annex, Tapleaf
- Caption: Bitcoin signature messages depend on the spending context.
- Alt text: Comparison of fields committed by legacy, SegWit version 0, Taproot, and tapscript signatures.
- Image orientation: Landscape
- Mobile crop notes: Stack four channels vertically with aligned fields.
- Status: PLANNED

### Illustration 2

- Concept title: Authorization, Not Identity
- Educational purpose: Separate key authorization from encryption and personal identity.
- Recommended placement: After Signing is not encryption.
- Visual description: Technical passport-control plate where a public-key gauge verifies a signed transaction packet while identity and encryption routes remain visibly separate.
- Required labels: Private key, Signature, Public key, Authorized message, Not encryption, Not personal identity
- Caption: A Bitcoin signature proves authorization under a key condition, not who a person is.
- Alt text: Diagram separating transaction authorization, encryption, and real-world identity.
- Image orientation: Landscape
- Mobile crop notes: Preserve the three-column separation.
- Status: PLANNED

### Illustration 3

- Concept title: The Offline Signing Dock
- Educational purpose: Show PSBT movement between a host and signer without implying automatic safety.
- Recommended placement: After Offline signing and PSBT.
- Visual description: Nautical loading dock where an unsigned PSBT travels to an isolated signer, returns with signatures, and passes inspection stations for amounts, outputs, scripts, fee, and sighash mode.
- Required labels: Host, PSBT, Offline signer, Previous outputs, Amounts, Scripts, Fee, Sighash, Finalizer
- Caption: PSBT transports signing data; each signer must still verify what it authorizes.
- Alt text: Offline PSBT workflow with separate construction, signing, verification, and finalization stages.
- Image orientation: Landscape
- Mobile crop notes: Use a left-to-right three-stage flow.
- Status: PLANNED
