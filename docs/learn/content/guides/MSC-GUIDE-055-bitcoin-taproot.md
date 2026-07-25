---
registry_id: MSC-GUIDE-055
status: COPY_LOCKED
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
reviewed_date: 2026-07-25
copy_locked_date: 2026-07-25
---

# How Taproot Changed Bitcoin

## 1. Introductory deck

Taproot added a SegWit version 1 output type with two spending paths: a Schnorr-signature key path and a script path that reveals only the selected committed script branch. BIPs 340, 341, and 342 define separate parts of the system. Taproot improves flexibility, selective disclosure, and some transaction efficiency, but its benefits depend on the construction and software support used.

## 2. Full article

Taproot is a deployed Bitcoin consensus upgrade built on Segregated Witness. It did not create a separate chain or replace Bitcoin Script. It introduced pay-to-Taproot outputs, Schnorr signature validation, a new script version called tapscript, and commitment structures that let one output represent a cooperative key path plus one or more hidden script alternatives.

Three BIPs divide the work. BIP 340 specifies Schnorr signatures for secp256k1. BIP 341 defines SegWit version 1 Taproot outputs, output-key commitments, key-path spending, script-path spending, and the Taproot signature message. BIP 342 defines the first tapscript leaf version and its opcode and resource rules.

This guide was reviewed July 25, 2026 against the live deployed BIPs and Bitcoin Core 31.1, tag `v31.1`, commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`, including tagged validation, policy, unit, functional, and wallet-vector evidence. Consensus deployment is established; wallet, exchange, service, threshold-signing, and application support remain implementation-specific and must be checked separately.

### BIP 340: the signature scheme

BIP 340 defines 64-byte Schnorr signatures using x-only public keys on secp256k1. The specification includes tagged hashing, deterministic nonce derivation with auxiliary randomness, verification rules, and test vectors.

Schnorr signatures have algebraic properties useful for key aggregation and threshold protocols, but BIP 340 by itself does not define a multisignature coordination protocol. MuSig2, FROST, hardware-wallet workflows, nonce management, and distributed key generation require separate specifications and implementations.

Taproot key-path and tapscript signature checks use BIP 340 signatures under BIP 341 and BIP 342 message rules. Saying “Taproot uses Schnorr” is accurate; saying “Schnorr automatically makes every multisig one signature” is not.

### BIP 341: pay-to-Taproot outputs

A pay-to-Taproot, or P2TR, output is a native SegWit version 1 output with a 32-byte witness program. The program represents an x-only output key. P2SH-wrapped version 1 programs and version 1 programs of other lengths are not P2TR under BIP 341.

Let the internal x-only key represent point `P`. An optional script tree produces Merkle root `m`; when there is no script tree, the commitment uses an empty byte string instead. The tagged hash `TapTweak(bytes(P) || m)` produces scalar `t`, and the output point is `Q = P + tG`. The construction fails if the tweak is outside the secp256k1 scalar range or the resulting point is invalid. The output commits to `x(Q)`.

This binds the output to the internal key and the exact script-tree root. A verifier learns neither the tree nor whether one exists when the output is created. A later script-path spend reveals only one leaf and the authentication path needed to reconstruct the root.

The internal key is a construction input, not automatically the key a wallet shows to a user. Some protocols use an internal key with known signing control; others use a NUMS-style point designed so no practical key-path spend exists. Those choices have different setup and backup assumptions.

### Key-path spending

A key-path spend supplies a Schnorr signature valid for the tweaked output key. No script, control block, or Merkle path is revealed.

This path is useful for a simple single-key output and for cooperative multiparty constructions that can produce one valid signature for an aggregate or threshold key. On chain, those cases can have the same key-path structure.

That similarity can improve privacy, but it is not anonymity. Amounts, timing, input ownership heuristics, address reuse, wallet fingerprints, change behavior, and off-chain information can still reveal relationships. A key-path spend reveals the output type and key-path witness form, even though it does not reveal whether one signer or a coordinated group produced the signature.

Key-path spending is not available merely because multiple parties possess separate keys. They need a correct coordination protocol, nonce handling, signing implementation, backup plan, and compatible wallet or device support.

### Script trees and leaves

Each script leaf commits to a leaf version and exact script bytes. BIP 341 defines the tapleaf hash as `TapLeaf(leaf_version || compact_size(script_size) || script)`.

Child hashes are combined with the `TapBranch` tagged hash after sorting each pair lexicographically. That ordering means a control block does not need separate left-or-right direction bits. Repeating this operation produces the root committed by the TapTweak.

The tree does not need to be balanced. Frequently expected paths can be placed at shallower depth to reduce the Merkle proof revealed when spent. That optimization can also create identifiable shapes, so efficiency and privacy can point in different directions.

Different tree constructions can commit to the same set of spending conditions while producing different roots, output keys, and disclosure sizes. Wallets and protocols must agree on the exact tree, leaf versions, script bytes, internal key, and branch construction before funds are received.

### Script-path spending

A script-path spend reveals:

- stack arguments needed by the chosen script;
- the selected script leaf;
- a control block containing the internal key, leaf version and parity information, and the Merkle path.

The validator computes the tapleaf hash, combines it with each 32-byte branch node in lexicographic order, computes the TapTweak, reconstructs the output point, and checks both its x-coordinate and parity against the output and control block. It then applies the rules associated with the revealed leaf version.

Only the selected leaf and its authentication path are revealed. Other leaves remain hidden unless disclosed elsewhere. The path depth, script content, control block, witness shape, and surrounding transaction can still reveal information about the wallet or protocol.

A script-path spend is normally larger than a key-path spend because it publishes the script and proof. Whether it is cheaper than an equivalent P2WSH construction depends on script size, tree depth, witness data, signature structure, and fee conditions.

### Control blocks and revealed paths

The control block is commitment-proof data, not an authorization signature. Its length must be `33 + 32m` bytes, where `m` is the number of Merkle nodes and ranges from 0 through 128.

The low bit of its first byte records the output point’s y-coordinate parity; masking that bit yields the leaf version. The next 32 bytes encode the x-only internal key. Each remaining 32-byte element is one node in the authentication path.

A malformed size, invalid internal key, out-of-range tweak, incorrect output-key x-coordinate or parity, or mismatched branch path makes the spend fail. A valid control block proves only that the revealed leaf was committed by the output. It does not prove the script is safe, hidden leaves are harmless, or an unexpected party cannot use the internal key.

### BIP 342: tapscript

BIP 342 defines the initial script semantics for Taproot leaves using leaf version `0xc0`. Tapscript retains much of Bitcoin Script while changing signature operations and upgrade behavior.

It adds `OP_CHECKSIGADD`, which supports threshold-style scripts by accumulating successful checks. It makes `OP_CHECKMULTISIG` and `OP_CHECKMULTISIGVERIFY` fail when executed, while those bytes remain ignored in unexecuted branches. It consensus-enforces MINIMALIF.

Tapscript removes the older 10,000-byte script and 201-non-push-opcode limits. If no `OP_SUCCESSx` is present, the 520-byte stack-element limit and 1,000 combined stack-and-altstack item limit remain, including the initial stack. Script size is bounded indirectly by transaction and block weight.

Its signature budget equals 50 plus the serialized byte size of the input’s full witness, including the compact-size prefix. Each executed signature opcode with a non-empty signature consumes 50 units; if the budget drops below zero, validation fails.

### Upgrade paths are separate

Tapscript defines designated `OP_SUCCESSx` byte values. The script is scanned for them before ordinary parsing, initial-stack checks, pushed-element limits, and execution. Encountering one makes the current script succeed at consensus, even if later bytes would not parse. Standard policy discourages spending an undefined `OP_SUCCESSx` path.

A future tapleaf version is a different mechanism. After the control block and output commitment are verified, a currently unknown leaf version succeeds without executing its script; Bitcoin Core policy can discourage that upgrade path. Unknown tapscript public-key types form another boundary. These mechanisms are not interchangeable, and none means arbitrary future behavior is already deployed.

### Taproot signature hashes

BIP 341 defines a new signature message. Depending on the sighash mode, it commits to the transaction version and locktime; input outpoints, amounts, spent `scriptPubKey` values, and sequences; outputs; the current input; and annex presence and content.

Committing to spent amounts and scripts helps offline signers understand what they are authorizing when complete previous-output data is supplied. It does not make an untrusted signing device safe by itself.

Taproot introduces `SIGHASH_DEFAULT`. A 64-byte signature omits the sighash byte and implies this mode, whose output-selection behavior matches `SIGHASH_ALL`. A 65-byte Taproot signature must append a nonzero defined sighash byte; explicitly appending `0x00` is invalid.

For tapscript signatures, BIP 342 extends the BIP 341 message with the tapleaf hash, key version `0x00`, and the opcode position of the last executed `OP_CODESEPARATOR`, or `0xffffffff` if none executed. The tapleaf hash commits to the entire script; the separator position is an additional execution-path commitment.

### The annex boundary

If a Taproot witness has at least two elements and the last element begins with byte `0x50`, BIP 341 recognizes that element as the annex and removes it before key-path or script-path interpretation.

The annex, or its absence, is committed by the signature message and contributes to transaction weight, but current Taproot consensus rules do not otherwise assign it application meaning. As of Bitcoin Core 31.1, annex-bearing Taproot spends are nonstandard under default policy.

The annex is an upgrade boundary, not a general metadata recommendation. Applications should not assume arbitrary annex data will be relayed, understood, or useful without a separate deployed specification and implementation evidence.

### What Taproot improved

Taproot can reduce on-chain disclosure by hiding unused script branches and allowing cooperative outcomes to use a key path. It provides a uniform P2TR output form for key and script commitments. It replaces ECDSA with BIP 340 Schnorr signatures in Taproot validation. It introduces cleaner signature hashing, tapscript, and explicit upgrade mechanisms.

For some multisignature or contract constructions, a separate key-aggregation or threshold-signing protocol can reduce the number of public keys and signatures visible on chain. For script policies with many alternatives, revealing one Merkle path can be smaller than revealing a full script containing every branch.

These are construction-dependent benefits. A large or deep script path can be expensive. A simple P2WPKH spend may be comparable or smaller in some dimensions. A service can use P2TR while retaining centralized custody. Taproot does not guarantee better privacy, lower fees, stronger backups, or safer wallet design.

### What Taproot did not solve

Taproot did not remove blockchain transparency. It did not hide amounts, prevent address reuse, stop input clustering, or conceal every script spend. It did not add a general covenant mechanism, arbitrary computation, automatic privacy, or unlimited scaling.

It did not standardize every threshold-signing system. BIP 327 MuSig2 is separate. Other threshold protocols have separate assumptions, review histories, and implementation maturity.

It did not make all existing wallets compatible. Receiving requires correct Bech32m address support and output construction. Spending requires key management, signing, tree storage, PSBT or proprietary coordination, fee estimation, hardware support, and recovery design.

It also did not make experimental protocols built on Taproot part of Bitcoin consensus. A protocol can use Taproot outputs while adding separate servers, federations, bridges, or off-chain trust assumptions.

### Activation and continuing support

BIPs 340, 341, and 342 were deployed together through the version-bits process specified by BIP 341. Bitcoin Core’s release-specific `doc/bips.md` records validation implementation in 0.21.0, mainnet activation support in 0.21.1, and the rules as always active beginning with version 24.0.

Activation means upgraded validation rules apply on the network. It does not measure the percentage of outputs using P2TR or the quality of wallet, exchange, signer, or service support.

Bitcoin Core 31.1 validates Taproot and includes P2TR descriptors and PSBT support. Its `doc/bips.md` records MuSig2 key aggregation through `musig()` descriptors in version 30.0 and signing support in version 31.0. Those are Bitcoin Core implementation milestones, not proof that other wallets or hardware devices interoperate.

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
- **P2TR:** Pay-to-Taproot output using a native version 1, 32-byte witness program.
- **Internal key:** X-only public key used before applying the Taproot tweak.
- **Output key:** Tweaked key committed in the P2TR output.
- **TapTweak:** Tagged hash used to bind the internal key to an optional script-tree root.
- **Key-path spend:** Spend authorized by a Schnorr signature for the output key.
- **Script-path spend:** Spend revealing a committed script leaf and its proof.
- **Tapleaf:** Tagged hash commitment to a leaf version and exact script bytes.
- **TapBranch:** Tagged hash combining two lexicographically ordered Taproot tree nodes.
- **Control block:** Proof data connecting a revealed tapleaf to the output key.
- **Tapscript:** Script semantics defined by BIP 342 for leaf version `0xc0`.
- **OP_CHECKSIGADD:** Tapscript opcode supporting additive signature checks.
- **Annex:** Optional Taproot witness element reserved for future meaning.
- **Bech32m:** Address checksum format used for native witness version 1+ addresses.

## 4. Sources

1. **BIP 340 — Schnorr Signatures for secp256k1** | Pieter Wuille, Jonas Nick, Tim Ruffing
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki
   - Supports: X-only public keys, 64-byte signatures, tagged hashes, nonce derivation, verification, and test vectors.
2. **BIP 341 — Taproot: SegWit Version 1 Spending Rules** | Pieter Wuille, Jonas Nick, Anthony Towns
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki
   - Supports: P2TR recognition, internal and output keys, TapTweak, tapleaf and TapBranch hashing, control blocks, parity, key path, script path, sighash, annex, privacy limits, and deployment.
3. **BIP 342 — Validation of Taproot Scripts** | Pieter Wuille, Jonas Nick, Anthony Towns
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0342.mediawiki
   - Supports: Tapscript, OP_CHECKSIGADD, executed-only multisig failures, MINIMALIF, OP_SUCCESSx ordering, signature-message extension, contextual limits, signature budget, and future leaf behavior.
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
   - Supports: Release-specific validation, activation, descriptor, PSBT, and MuSig2 implementation evidence.
8. **Bitcoin Core 31.1 Interpreter Interface** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/interpreter.h
   - Supports: Taproot and tapscript signature versions, precomputed data, tapleaf, branch, control-block, and annex execution data.
9. **Bitcoin Core 31.1 Script Interpreter** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/interpreter.cpp
   - Supports: Key-path and script-path validation, tapleaf and branch hashing, control-block parity, signature messages, annex handling, tapscript execution, and future-version behavior.
10. **Bitcoin Core 31.1 Transaction Policy** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/policy/policy.cpp
    - Supports: Default-policy rejection of annexes and Taproot witness standardness boundaries.
11. **Bitcoin Core 31.1 Script Definitions** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/script.h
    - Supports: Annex tag, tapscript signature-budget constants, stack and element limits, OP_CHECKSIGADD, and opcode definitions.
12. **Bitcoin Core 31.1 Taproot Functional Test** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/test/functional/feature_taproot.py
    - Supports: End-to-end key-path, script-path, control-block, sighash, annex, future-version, and policy test cases.
13. **Bitcoin Core 31.1 Script Unit Tests and BIP 341 Vectors** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/test/script_tests.cpp
    - Supports: Taproot wallet vectors and Taproot and tapscript validation edge cases.
14. **Bitcoin Core 31.1 Output Descriptor Documentation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/descriptors.md
    - Supports: `tr()` descriptors, script trees, tapscript multisig expressions, and MuSig2 descriptor support.
15. **Bitcoin Core 31.1 PSBT Documentation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/psbt.md
    - Supports: Implementation-specific signing workflow and PSBT boundaries.
16. **Bitcoin Core 0.21.1 Release Notes** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v0.21.1/doc/release-notes.md
    - Supports: Historical mainnet Taproot activation support in that release line.
17. **Bitcoin Core 31.1 Tag Commit** | Bitcoin Core contributors
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
- [x] Native P2TR recognition, x-only keys, TapTweak construction, output parity, key path, script path, tapleaf hashing, TapBranch ordering, and control-block limits are covered.
- [x] Tapscript, MINIMALIF, OP_CHECKSIGADD, OP_SUCCESSx ordering, future leaf versions, signature-message extensions, and signature-budget boundaries are separated.
- [x] Privacy and efficiency benefits are qualified by construction, wallet behavior, disclosure path, transaction context, and software support.
- [x] Schnorr signatures are not presented as a complete threshold-signing protocol.
- [x] Taproot is described as deployed Bitcoin consensus behavior, not a separate network or application.
- [x] Activation is separated from wallet, exchange, service, hardware, PSBT, descriptor, MuSig2, and application support.
- [x] Experimental protocols using Taproot are not presented as inherited Bitcoin consensus, endorsement, or security.
- [x] Current implementation claims are pinned to Bitcoin Core 31.1 and dated July 25, 2026.
- [x] Planned internal links remain inactive and do not imply publication.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-25
- Evidence reviewed: Deployed BIPs 340, 341, 342, 350, 327, and 371; Bitcoin Core `v31.1` at commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`; tagged interpreter, policy, script-definition, descriptor, PSBT, script-unit, BIP 341 wallet-vector, and `feature_taproot.py` evidence; release-specific `doc/bips.md`; and Bitcoin Core 0.21.1 activation-support release notes.
- Material corrections: Added exact TapTweak, tapleaf, TapBranch, control-block size, output-key parity, and internal-key reconstruction rules; separated unknown tapleaf versions from OP_SUCCESSx and unknown key types; corrected tapscript resource and signature-budget rules; added script-path sighash extensions and 64-versus-65-byte sighash handling; recorded annex consensus commitment and Bitcoin Core 31.1 policy; narrowed privacy, fee, covenant, threshold-signing, and application-security claims; and dated exact activation and MuSig2 implementation milestones.
- Remaining uncertainty: Wallet, hardware-signer, exchange, PSBT, MuSig2, threshold-signing, annex, and application support remain implementation- and version-specific. Future leaf versions, OP_SUCCESSx meanings, public-key types, and annex semantics remain undefined until separately specified and deployed.

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
