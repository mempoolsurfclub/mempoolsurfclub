---
registry_id: MSC-GUIDE-055
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: How Taproot Changed Bitcoin
handle: bitcoin-taproot
category: Bitcoin Development
subcategory: Protocols
depth: Deep
format: Protocol Explainer
primary_path: Build on Bitcoin
secondary_paths:
  - Understand the Network
author_display: Mempool Surf Club Editorial
reviewed_date: null
copy_locked_date: null
---

# How Taproot Changed Bitcoin

## 1. Introductory deck

Taproot added a SegWit version 1 output type with two spending paths: a Schnorr-signature key path and a script path that reveals only the selected committed script branch. BIPs 340, 341, and 342 define separate parts of the system. Taproot improves flexibility, selective disclosure, and some transaction efficiency, but its benefits depend on the construction and software support used.

## 2. Full article

Taproot is a deployed Bitcoin consensus upgrade built on Segregated Witness. It did not create a separate chain or replace Bitcoin Script. It introduced pay-to-Taproot outputs, Schnorr signature validation, a new script version called tapscript, and commitment structures that let one output represent a cooperative key path plus one or more hidden script alternatives.

Three BIPs divide the work. BIP 340 specifies Schnorr signatures for secp256k1. BIP 341 defines SegWit version 1 Taproot outputs, output-key commitments, key-path spending, script-path spending, and the Taproot signature message. BIP 342 defines the first tapscript leaf version and its opcode and resource rules.

This guide was reviewed July 25, 2026 against the live deployed BIPs and Bitcoin Core 31.1, tag `v31.1`, commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`. Consensus deployment is established; wallet, exchange, service, threshold-signing, and application support remain implementation-specific and must be checked separately.

### BIP 340: the signature scheme

BIP 340 defines 64-byte Schnorr signatures using x-only public keys on secp256k1. The specification includes tagged hashing, deterministic nonce derivation with auxiliary randomness, verification rules, and test vectors.

Schnorr signatures have algebraic properties useful for key aggregation and threshold protocols, but BIP 340 by itself does not define a multisignature coordination protocol. MuSig2, FROST, hardware-wallet workflows, nonce management, and distributed key generation require separate specifications and implementations.

Taproot key-path and tapscript signature checks use BIP 340 signatures under BIP 341 and BIP 342 message rules. Saying “Taproot uses Schnorr” is accurate; saying “Schnorr automatically makes every multisig one signature” is not.

### BIP 341: pay-to-Taproot outputs

A pay-to-Taproot, or P2TR, output is a native SegWit version 1 output with a 32-byte witness program. The program represents an x-only output key.

Conceptually, a creator starts with an internal public key and, optionally, a Merkle root committing to one or more script leaves. A tagged hash of the internal key and Merkle root produces a tweak. The tweaked point becomes the output key committed in the `scriptPubKey`.

The commitment binds the output to both the internal key and the selected script tree. A verifier does not learn the tree when the output is created. The tree is revealed only as needed during a script-path spend.

The internal key is a construction input, not automatically the key a wallet shows to a user. Some protocols use an internal key with known signing control; others use an internal key designed so no practical key-path spend exists. Those choices have different security assumptions.

### Key-path spending

A key-path spend supplies a Schnorr signature valid for the tweaked output key. No script or Merkle path is revealed.

This path is useful for a simple single-key output and for cooperative multiparty constructions that can produce one valid signature for an aggregate or threshold key. On chain, those cases can have the same key-path structure.

That similarity can improve privacy, but it is not anonymity. Amounts, timing, input ownership heuristics, address reuse, wallet fingerprints, change behavior, and off-chain information can still reveal relationships. A key-path spend also reveals that the output was spent through the key path, not whether the signer was one person or a coordinated group.

Key-path spending is not available merely because multiple parties possess separate keys. They need a correct coordination protocol, nonce handling, signing implementation, backup plan, and compatible wallet or device support.

### Script trees and leaves

A Taproot script tree commits to one or more scripts. Each script is placed in a leaf with a leaf version. Leaf hashes are combined through TapBranch hashes until they form a Merkle root.

The tree does not need to be balanced. Frequently expected paths can be placed at shallower depth to reduce the Merkle proof revealed when spent. That optimization can also create identifiable shapes, so efficiency and privacy can point in different directions.

Different tree constructions can commit to the same set of spending conditions while producing different output keys and disclosure sizes. Wallets and protocols must agree on the exact tree, leaf versions, script bytes, internal key, and key ordering before funds are received.

### Script-path spending

A script-path spend reveals:

- stack arguments needed by the chosen script;
- the tapscript leaf;
- a control block containing the internal key, leaf version information, output-key parity, and the Merkle path.

The validator hashes the revealed leaf, combines it with the control-block path, reconstructs the Taproot commitment, and checks that it produces the output key. It then executes the tapscript under BIP 342.

Only the selected leaf and its authentication path are revealed. Other leaves remain hidden unless disclosed elsewhere. The depth of the path, script content, and control block can still reveal information about the wallet or protocol.

A script-path spend is normally larger than a key-path spend because it publishes the script and proof. Whether it is cheaper than an equivalent P2WSH construction depends on script size, tree depth, witness data, and signature structure.

### Control blocks and revealed paths

The control block is not an authorization signature. It is commitment proof data.

Its first byte encodes the leaf version with the output-key parity bit. The next 32 bytes encode the internal key. Remaining 32-byte elements are the Merkle branch from the revealed leaf to the root.

A malformed control block, invalid internal key, impossible tweak, incorrect parity, or mismatched Merkle path makes the spend fail. Exact size limits and parsing rules are consensus-critical.

A control block proves that the revealed script was committed by the output. It does not prove the script is safe, that hidden leaves are harmless, or that the internal key is unusable by an unexpected party.

### BIP 342: tapscript

BIP 342 defines the initial script semantics for Taproot leaves using leaf version `0xc0`. Tapscript retains much of Bitcoin Script while changing signature operations and upgrade behavior.

It adds `OP_CHECKSIGADD`, which supports threshold-style scripts by accumulating successful checks. It disables `OP_CHECKMULTISIG` and `OP_CHECKMULTISIGVERIFY` in tapscript. It applies a witness-size-derived validation-weight budget to executed non-empty signature checks rather than the legacy per-script opcode limit.

Tapscript also defines `OP_SUCCESSx` values. Encountering one under the specified parsing rules makes validation succeed, creating room for future soft forks to assign stricter meaning. Standard relay policy can discourage use of unknown upgrade paths before they are defined.

Unknown public-key types and future tapleaf versions have their own upgrade boundaries. “Tapscript supports future upgrades” does not mean arbitrary new behavior is already deployed.

### Taproot signature hashes

BIP 341 defines a new signature message. It can commit to the transaction version, locktime, prevouts, spent output amounts, spent `scriptPubKey` values, sequences, outputs, the current input, annex presence, and script-path data depending on sighash mode.

Committing to spent amounts and scripts helps offline signers understand what they are authorizing when complete previous-output data is supplied. It does not make an untrusted signing device safe by itself.

Taproot introduces `SIGHASH_DEFAULT`, represented by omitting the sighash byte from a 64-byte key-path or tapscript signature. It is equivalent to `SIGHASH_ALL` for the defined semantics. Other legacy-named modes remain available with Taproot-specific message construction.

Sighash choices affect what can change after signing. Wallets should not expose unusual combinations without clear protocol reasons and testing.

### The annex boundary

BIP 341 reserves an optional annex. If the witness has at least two elements and the last begins with byte `0x50`, that element is treated as the annex and removed before key-path or script-path interpretation.

The annex is committed by the signature message when present, but the initial Taproot rules do not otherwise assign it application meaning. It contributes to transaction weight.

Its existence is an upgrade boundary, not a general metadata recommendation. Applications should not assume arbitrary annex data will be relayed, understood, or useful without a separate deployed specification and implementation evidence.

### What Taproot improved

Taproot can reduce on-chain disclosure by hiding unused script branches and allowing cooperative outcomes to use a key path. It provides a uniform P2TR output form for key and script commitments. It replaces ECDSA with BIP 340 Schnorr signatures in Taproot validation. It introduces cleaner signature hashing, tapscript, and explicit upgrade mechanisms.

For some multisignature or contract constructions, key aggregation or threshold signing can reduce the number of public keys and signatures visible on chain. For script policies with many alternatives, revealing one Merkle path can be smaller than revealing a full script containing every branch.

These are construction-dependent benefits. A large or deep script path can be expensive. A simple P2WPKH spend may be comparable or smaller in some dimensions. A service can use P2TR while retaining centralized custody. Taproot does not guarantee better privacy, lower fees, stronger backups, or safer wallet design.

### What Taproot did not solve

Taproot did not remove blockchain transparency. It did not hide amounts, prevent address reuse, stop input clustering, or conceal every script spend. It did not create covenants, arbitrary computation, automatic privacy, or unlimited scaling.

It did not standardize every threshold-signing system. BIP 327 MuSig2 is separate. Other threshold protocols have separate assumptions, review histories, and implementation maturity.

It did not make all existing wallets compatible. Receiving requires correct Bech32m address support and output construction. Spending requires key management, signing, tree storage, PSBT or proprietary coordination, fee estimation, hardware support, and recovery design.

It also did not make experimental protocols built on Taproot part of Bitcoin consensus. A protocol can use Taproot outputs while adding separate servers, federations, bridges, or off-chain trust assumptions.

### Activation and continuing support

BIPs 341 and 342 were deployed together through a version-bits process described in BIP 341. Bitcoin Core documents validation implementation in version 0.21.0, mainnet activation support in 0.21.1, and the rules as always active in later releases.

Activation means upgraded validation rules apply on the network. It does not measure the percentage of outputs using P2TR or the quality of wallet support.

Current support claims should name the implementation and version. Bitcoin Core 31.1 validates Taproot, supports P2TR descriptors, and documents later PSBT and MuSig2 additions. An exchange, mobile wallet, hardware signer, explorer, or custody service can support only a subset.

### Evaluating a Taproot claim

Ask which layer is being discussed:

- **Consensus:** Are BIP 340/341/342 validation rules active?
- **Output construction:** Can the wallet create the intended internal key and tree?
- **Address encoding:** Does it use Bech32m correctly for witness version 1?
- **Signing:** Does it support the required key-path, script-path, sighash, or threshold protocol?
- **Coordination:** Can all devices exchange the required scripts, control blocks, nonces, and PSBT fields?
- **Recovery:** Can the wallet reconstruct hidden branches and backups?
- **Policy and relay:** Will the transaction be accepted and propagated under current policy?
- **Application adoption:** Do counterparties actually recognize and use the output type?

Taproot is deployed consensus behavior. Everything built with it still needs separate evidence.

## 3. Key Terms

- **Taproot:** Deployed SegWit version 1 spending rules combining a key path with optional committed script paths.
- **BIP 340:** Schnorr signature specification used by Taproot.
- **BIP 341:** P2TR output, commitment, spending, and signature-message specification.
- **BIP 342:** Tapscript validation specification.
- **P2TR:** Pay-to-Taproot output using a version 1, 32-byte witness program.
- **Internal key:** X-only public key used before applying the Taproot tweak.
- **Output key:** Tweaked key committed in the P2TR output.
- **TapTweak:** Tagged hash used to bind the internal key to an optional script-tree root.
- **Key-path spend:** Spend authorized by a Schnorr signature for the output key.
- **Script-path spend:** Spend revealing a committed tapscript and its proof.
- **Tapleaf:** A versioned script leaf in a Taproot tree.
- **TapBranch:** Hash combining two Taproot tree nodes.
- **Control block:** Proof data connecting a revealed tapleaf to the output key.
- **Tapscript:** Script semantics defined by BIP 342.
- **OP_CHECKSIGADD:** Tapscript opcode supporting additive signature checks.
- **Annex:** Optional Taproot witness element reserved for future meaning.
- **Bech32m:** Address checksum format used for native witness version 1+ addresses.

## 4. Sources

1. **BIP 340 — Schnorr Signatures for secp256k1** | Pieter Wuille, Jonas Nick, Tim Ruffing
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki
   - Supports: X-only public keys, 64-byte signatures, tagged hashes, nonce derivation, verification, and test vectors.
2. **BIP 341 — Taproot: SegWit Version 1 Spending Rules** | Pieter Wuille, Jonas Nick, Anthony Towns
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki
   - Supports: P2TR, internal and output keys, tweaking, key path, script path, trees, control blocks, sighash, annex, privacy limits, and deployment.
3. **BIP 342 — Validation of Taproot Scripts** | Pieter Wuille, Jonas Nick, Anthony Towns
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0342.mediawiki
   - Supports: Tapscript, OP_CHECKSIGADD, disabled multisig opcodes, OP_SUCCESSx, signature budget, and leaf-version behavior.
4. **BIP 350 — Bech32m Format for Version 1+ Witness Addresses** | Pieter Wuille
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0350.mediawiki
   - Supports: Address encoding for P2TR and other witness version 1+ programs.
5. **BIP 327 — MuSig2 for BIP 340-Compatible Multisignatures** | Jonas Nick, Tim Ruffing, Elliott Jin
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0327.mediawiki
   - Supports: Separate key-aggregation and signing protocol boundaries.
6. **BIP 371 — Taproot Fields for PSBT** | Ava Chow
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0371.mediawiki
   - Supports: PSBT fields needed to coordinate Taproot key and script-path signing.
7. **Bitcoin Core 31.1 BIP Support Document** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/bips.md
   - Supports: Implementation, activation, descriptor, PSBT, and MuSig2 version evidence.
8. **Bitcoin Core 31.1 Interpreter Interface** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/interpreter.h
   - Supports: Taproot and tapscript signature versions, precomputed data, tapleaf, branch, control-block, and annex execution data.
9. **Bitcoin Core 31.1 Script Interpreter** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/interpreter.cpp
   - Supports: Key-path and script-path validation, signature messages, control-block checks, tapscript execution, and failure conditions.
10. **Bitcoin Core 31.1 Script Definitions** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/script.h
    - Supports: Annex tag, tapscript signature weight, OP_CHECKSIGADD, and opcode definitions.
11. **Bitcoin Core 31.1 Taproot Functional Test** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/test/functional/feature_taproot.py
    - Supports: End-to-end key-path, script-path, control-block, sighash, annex, and policy test cases.
12. **Bitcoin Core 31.1 Script Unit Tests** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/test/script_tests.cpp
    - Supports: Taproot and tapscript validation edge cases.
13. **Bitcoin Core 31.1 Output Descriptor Documentation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/descriptors.md
    - Supports: `tr()` descriptors, script trees, tapscript multisig expressions, and MuSig2 descriptor support.
14. **Bitcoin Core 31.1 PSBT Documentation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/psbt.md
    - Supports: Implementation-specific signing workflow and PSBT boundaries.
15. **Bitcoin Core 0.21.1 Release Notes** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v0.21.1/doc/release-notes.md
    - Supports: Historical mainnet Taproot activation support in the release line.
16. **Bitcoin Core 31.1 Tag Commit** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/commit/9be056a8a72b624dae9623b2f7bded92c2a21c91
    - Supports: Exact current source and test version reviewed.

## 5. SEO title

How Taproot Changed Bitcoin | Mempool Surf Club

## 6. Meta description

Learn how Taproot uses Schnorr signatures, key-path and script-path spending, script trees, control blocks, tapscript, and Bech32m.

## 7. Page excerpt

See how BIPs 340, 341, and 342 changed Bitcoin spending conditions—and where Taproot’s privacy, efficiency, and support limits remain.

## 8. Estimated reading time

17 to 20 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-054 | How Bitcoin Script Works
- Next: MSC-GUIDE-056 | How SegWit Changed Bitcoin
- Prerequisite: MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work
- Prerequisite: MSC-GUIDE-053 | How Bitcoin Improvement Proposals Work
- Prerequisite: MSC-GUIDE-054 | How Bitcoin Script Works
- Branch: MSC-GUIDE-046 | How Discreet Log Contracts Work
- Branch: MSC-GUIDE-047 | What Is OP_CAT?
- Branch: MSC-GUIDE-057 | How Schnorr Signatures Work in Bitcoin
- Return: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] BIP 340, BIP 341, and BIP 342 are assigned separate roles.
- [x] P2TR, internal keys, output-key tweaking, key path, script path, tapleaves, branches, and control blocks are covered.
- [x] Tapscript, OP_CHECKSIGADD, OP_SUCCESSx, sighash, and annex boundaries are described.
- [x] Privacy and efficiency benefits are qualified by construction, wallet behavior, and disclosure path.
- [x] Schnorr signatures are not presented as a complete threshold-signing protocol.
- [x] Taproot is described as deployed Bitcoin consensus behavior, not a separate network or application.
- [x] Activation is separated from wallet, exchange, service, hardware, PSBT, and application support.
- [x] Experimental protocols using Taproot are not presented as inherited Bitcoin consensus or security.
- [x] Current implementation claims are pinned to Bitcoin Core 31.1 and dated July 25, 2026.
- [x] Planned internal links remain inactive and do not imply publication.

## 11. Human verification

- Reviewer: Pending — Bitcoin protocol and implementation specialist
- Review date: Pending
- Notes: Human Verification remains pending. The specialist pass must reproduce BIP 341 tweak, control-block, sighash, annex, and parity rules; verify BIP 342 OP_SUCCESSx and signature-budget language; and review all privacy, fee, threshold-signing, activation, and support boundaries against exact current implementations.

## 12. Illustration brief

### Illustration 1

- Concept title: The Taproot Output Key Chart
- Educational purpose: Show how an internal key and optional script-tree root commit into one output key.
- Recommended placement: After BIP 341: pay-to-Taproot outputs.
- Visual description: Vintage drafting plate with an internal key line and Taproot tree root entering a tagged-hash compass, producing a tweak and final P2TR output key.
- Required labels: Internal key, Script-tree root, TapTweak, Tweak point, Output key, P2TR
- Caption: A Taproot output key commits to an internal key and, when present, a script-tree root.
- Alt text: Technical diagram of a Taproot internal key and script root being tweaked into a P2TR output key.
- Image orientation: Landscape
- Mobile crop notes: Use a single left-to-right construction with large labels.
- Status: PLANNED

### Illustration 2

- Concept title: Key Path and Script Path
- Educational purpose: Compare the two ways a Taproot output can be spent.
- Recommended placement: After Script-path spending.
- Visual description: Nautical fork with a short cooperative key-path channel showing one Schnorr signature and a longer script-path channel revealing stack items, tapscript, control block, and one Merkle branch.
- Required labels: Key path, Schnorr signature, Script path, Tapscript, Control block, Merkle path, Hidden leaves
- Caption: Key-path spends reveal a signature; script-path spends reveal one committed condition and its proof.
- Alt text: Forked diagram comparing Taproot key-path and script-path spending disclosures.
- Image orientation: Landscape
- Mobile crop notes: Stack the paths vertically and align their final validation point.
- Status: PLANNED

### Illustration 3

- Concept title: Taproot Benefit Boundary Map
- Educational purpose: Show which benefits are conditional rather than guaranteed.
- Recommended placement: After What Taproot did not solve.
- Visual description: Cartographic legend with conditional zones for selective disclosure, cooperative efficiency, threshold protocols, wallet support, fee outcomes, and chain-analysis exposure.
- Required labels: Selective disclosure, Cooperative spend, Script depth, Threshold protocol, Wallet support, Chain analysis
- Caption: Taproot expands design choices, but privacy, cost, and compatibility depend on how those choices are used.
- Alt text: Boundary map showing conditional Taproot privacy, efficiency, and support benefits.
- Image orientation: Landscape
- Mobile crop notes: Use six labeled islands around a central P2TR marker.
- Status: PLANNED
