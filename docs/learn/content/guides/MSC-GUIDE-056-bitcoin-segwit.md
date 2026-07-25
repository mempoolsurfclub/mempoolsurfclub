---
registry_id: MSC-GUIDE-056
status: COPY_LOCKED
page_role: topic-guide
h1: How SegWit Changed Bitcoin
handle: bitcoin-segwit
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

# How SegWit Changed Bitcoin

## 1. Introductory deck

Segregated Witness changed how Bitcoin commits to and accounts for transaction witness data. It introduced witness programs, separate transaction identifiers, a witness commitment, block weight, and a new signature digest for version 0 witness spends. SegWit improved important forms of transaction malleability and enabled later systems, but it did not make every transaction non-malleable or simply replace the block-size limit.

## 2. Full article

Segregated Witness, or SegWit, is a deployed set of Bitcoin consensus, transaction-serialization, script, and peer-protocol changes. Its central design separates witness data—signatures and related spending evidence—from the transaction serialization used to calculate the traditional transaction identifier.

The witness is still consensus-critical. Upgraded nodes receive it, commit it into the block, and validate it. “Segregated” describes how the data is serialized and committed, not that signatures became optional or moved outside transaction validation.

BIP 141 specifies the consensus-layer witness structure, witness programs, block commitment, weight, and script behavior. BIP 143 defines the signature digest for witness version 0. BIP 144 defines peer-to-peer witness serialization and relay. Address and application support are covered by separate BIPs such as BIP 173 and BIP 350.

This guide was reviewed July 25, 2026 against the deployed BIPs and Bitcoin Core 31.1, tag `v31.1`, commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`, including tagged transaction, validation, chain-parameter, unit, functional, and P2P-test evidence. Historical deployment is settled, but wallet, service, address, fee, and interface behavior remains software-specific.

### What counts as witness data

For each transaction input, the witness field is a stack of byte arrays serialized separately from the legacy input fields. It can include signatures, public keys, script arguments, and a witness script depending on the witness program. Inputs that do not use witness validation carry an empty witness field in witness serialization.

The transaction’s effects still come from its inputs and outputs: which prior outputs are consumed and which new outputs are created. Witness data proves that the spend is authorized under the relevant rules.

Moving witness data outside the legacy serialization changes transaction identification and accounting. It does not move validation off chain.

### Witness programs and versions

A witness program is either a native `scriptPubKey` or, for the BIP 141 nested form, a P2SH redeem script consisting exactly of a version push from 0 through 16 followed by a direct push of 2 through 40 program bytes.

For witness version 0, two lengths are defined:

- A 20-byte program is pay-to-witness-public-key-hash, or P2WPKH.
- A 32-byte program is pay-to-witness-script-hash, or P2WSH.

Other version 0 lengths fail. Versions 1 through 16 were reserved for later soft-fork definitions. Taproot later assigned native witness version 1 with a 32-byte program; P2SH-wrapped version 1 is not Taproot.

An output that merely resembles a witness program but does not meet the exact opcode and direct-push structure is interpreted under the applicable legacy rules instead. Exact bytes matter.

### Native and nested SegWit

A native SegWit output places the witness program directly in the `scriptPubKey`. Its spending `scriptSig` must be exactly empty.

Nested SegWit uses BIP 16 pay-to-script-hash. The output is P2SH; the spending `scriptSig` must be exactly one push of a redeem script that is itself a witness program. The actual signature or script arguments remain in the witness.

Nested P2SH-P2WPKH and P2SH-P2WSH were compatibility tools for systems that understood P2SH addresses but not native SegWit addresses. They add overhead compared with native forms and require both P2SH and witness validation.

Address support is separate from consensus. BIP 173 defined Bech32 addresses for native version 0 witness programs. BIP 350 later required Bech32m for version 1 through 16; it did not replace Bech32 for version 0.

### P2WPKH validation

A P2WPKH witness contains exactly two items: a signature and a public key. The HASH160 of the public key must match the 20-byte witness program. Signature verification then executes an implied P2PKH-style script under witness-v0 rules and the BIP 143 signature digest, ending with exactly one true stack item.

Compressed public keys are required by standard policy for witness-v0 public-key types. Wallets must also supply the correct previous-output amount and script context when signing.

P2WPKH changes where the signature and public key are carried. It does not remove key-management or signature-security requirements.

### P2WSH validation

A P2WSH witness ends with the serialized witness script. Its SHA256 hash must equal the 32-byte witness program. Earlier witness elements form the initial execution stack.

BIP 141 permits a witness script of up to 10,000 bytes. Each initial stack element remains limited to 520 bytes by witness-v0 consensus, and successful execution must leave exactly one item that evaluates true.

P2WSH reveals the full witness script when spent. Unlike Taproot script-path spending, it does not hide unused branches inside a committed Merkle tree.

### Transaction serialization, `txid`, and `wtxid`

Traditional serialization is `[version][inputs][outputs][locktime]`. Witness serialization inserts a one-byte zero marker, a one-byte nonzero flag—currently `0x01`—and the per-input witness fields: `[version][marker][flag][inputs][outputs][witness][locktime]`.

The `txid` remains the double-SHA256 of traditional serialization without marker, flag, or witness data. The `wtxid` is the double-SHA256 of witness serialization. When every input has an empty witness, the transaction can use traditional serialization and its `wtxid` equals its `txid`.

Changing witness data can change the `wtxid` without changing the `txid`. SegWit therefore prevents third-party changes confined to protected witness data from changing the identifier used by dependent transaction outpoints. It does not make the witness immutable or erase every other source of transaction malleability.

Applications must choose the right identifier. Output references use the `txid` plus output index. Witness-aware peer and mempool systems can use `wtxid` to distinguish transactions whose base serialization is the same but witness differs.

### The witness commitment

The block header’s ordinary transaction Merkle root commits to the block’s traditional transaction identifiers. BIP 141 adds a witness Merkle tree whose leaves are transaction `wtxid` values, except that the coinbase transaction’s `wtxid` is defined as 32 zero bytes for this tree.

The coinbase input witness must contain exactly one 32-byte reserved value when a witness commitment is present. The commitment is `double-SHA256(witness_root || reserved_value)` and appears in a coinbase output script beginning `OP_RETURN 0x24 aa21a9ed`, followed by the 32-byte commitment. Bytes after that commitment have no consensus meaning.

If more than one coinbase output matches the commitment pattern, the matching output with the highest index is authoritative. The commitment is optional only when the block contains no witness data; a block that carries witness data without the required valid commitment fails upgraded validation.

This nested commitment lets older nodes continue seeing a valid legacy transaction tree while upgraded nodes enforce the witness tree, reserved-value size, commitment match, and all witness-script and signature rules.

### Block weight and virtual size

SegWit replaced one-dimensional transaction and block byte accounting with weight.

BIP 141 defines block weight as:

`base size × 3 + total size`

Because total size already includes the base bytes, this is equivalent to `base size × 4 + witness size`. A valid block has weight no greater than 4,000,000.

Transaction weight uses the same formula. Virtual size is transaction weight divided by four and rounded up to the next whole virtual byte. Fee rates are commonly expressed in satoshis per virtual byte.

Witness bytes contribute one weight unit each while base bytes effectively contribute four, but witness data is not free. A transaction’s weight depends on its exact inputs, outputs, scripts, signatures, and witness serialization.

Saying SegWit “increased the block size” is incomplete. Upgraded nodes enforce one four-million-unit weight limit, not independent base and witness caps. The maximum serialized byte count therefore depends on block composition rather than one replacement byte limit.

### BIP 143 signature hashing

Legacy signature hashing can repeat work as transaction size and signature count grow and does not commit to the spent output amount. BIP 143 defines a separate digest algorithm for witness version 0.

Depending on the sighash mode, it can reuse precomputed double-SHA256 hashes of all prevouts, input sequences, and outputs. It also commits to the amount of the spent output and uses a context-specific `scriptCode`.

Amount commitment helps an offline or hardware signer calculate the fee when it receives correct previous-output data. It does not authenticate false host-supplied data by itself; the signer still needs a trusted way to obtain or verify the amount and script information.

BIP 143 preserves the named legacy sighash modes while changing message construction and some `OP_CODESEPARATOR` handling. Taproot later introduced another signature-message design under BIP 341.

### Transaction malleability improvements

Before SegWit, a third party could alter some signature encodings or script data without invalidating the spend, changing the transaction identifier. A dependent unconfirmed transaction referring to the original identifier could then become invalid.

For transactions whose relevant inputs use SegWit protections, witness-only mutations no longer alter the `txid`. This made stable unconfirmed outpoint references practical for protocols such as payment channels. A mutation can still alter `wtxid`, and BIP 147 separately requires the historical `OP_CHECKMULTISIG` dummy element to be empty.

SegWit did not eliminate every kind of malleability. A signer can intentionally create alternative valid transactions under some sighash choices. Transactions containing legacy inputs can retain legacy exposure. Transaction replacement, fee bumping, different input or output selection, and protocol-level state changes are not the same as third-party signature malleability.

A precise claim is that SegWit removed important nonintentional and third-party `txid` malleability for protected SegWit constructions, not that every Bitcoin transaction became immutable.

### Script versioning and future upgrades

Witness programs created a versioned output namespace. Version 0 defined P2WPKH and P2WSH. Versions 1 through 16 were left without further consensus interpretation so later soft forks could assign stricter validation rules.

Taproot used native version 1 with a 32-byte program. Older SegWit-aware nodes treat otherwise unknown native witness versions as successful under forward-compatible consensus behavior, while upgraded nodes can enforce new restrictions.

Relay policy can discourage unknown witness versions before a deployment. Consensus forward compatibility and mempool acceptance are separate. P2SH-wrapped higher-version programs are also not equivalent to the native forms later specifications may define.

Versioning does not guarantee every future proposal will activate or be safe. Each new version still needs a specification, implementation, review, deployment mechanism, and adoption.

### How older and upgraded nodes see SegWit

SegWit was designed as a soft fork. Older nodes validate the block’s legacy view without applying witness-program or witness-commitment rules. To them, witness programs fit pre-existing script behavior and the commitment is an unrecognized coinbase output.

Upgraded nodes obtain witness-aware serialization and apply the additional witness-program, script, signature, weight, and commitment rules. A block that violates SegWit is rejected by upgraded nodes even if an older node would accept its legacy view.

This asymmetry is how stricter rules can remain compatible with older validity rules. It also means an older node does not independently validate SegWit authorization. Running old software after activation can therefore provide a weaker view of current consensus.

### Deployment and activation boundaries

BIP 141 specified a BIP 9 version-bits deployment. The historical path included miner signaling, BIP 91 coordination, lock-in, and mainnet activation at block height 481,824 on August 24, 2017.

Those events should not be collapsed into “miners approved SegWit.” Miners signaled and produced blocks, node software enforced rules, operators chose software, and activation conditions determined when upgraded rules applied.

Bitcoin Core 31.1 records `SegwitHeight = 481824` in its mainnet chain parameters. Its release-specific `doc/bips.md` records SegWit as implemented in 0.13.0, defined for mainnet in 0.13.1, and buried behind direct height-based activation checks since 0.19.0. Current validation does not wait for fresh signaling.

A software release containing SegWit code was not the same event as mainnet activation. Native address generation, wallet spending, exchange support, and application use continued on separate timelines.

### Wallet and service consequences

Wallets implementing SegWit need output detection, address encoding, amount-aware signing, witness serialization, fee estimation by weight, coin selection, PSBT or proprietary signing support, and compatible backup and recovery logic.

A sender can pay a SegWit output without being able to spend from that output type. A service can accept native SegWit deposits but still consolidate through another form. Hardware devices can support P2WPKH before P2WSH or Taproot.

Fee estimation should use weight or virtual size rather than raw byte size. Explorers and APIs should label `txid` and `wtxid` clearly. Systems comparing transactions must understand that witness differences can change `wtxid` without changing `txid`.

Compatibility claims should name native or nested forms, receive or spend capability, script type, address format, and exact software version.

### SegWit, Lightning, and Taproot

SegWit’s `txid` malleability improvement made dependable chains of unconfirmed transactions more practical and was an important foundation for Lightning Network deployments. SegWit did not create or guarantee Lightning. Lightning also depends on timelocks, update and penalty or replacement constructions, peer protocols, liquidity, watch behavior, fee management, and implementations.

Taproot reused the witness-version framework by assigning native version 1 rules and Bech32m addresses. Taproot is a later consensus upgrade, not merely a wallet feature automatically supplied by SegWit.

SegWit provided architectural hooks and accounting changes that later systems could use. Whether a later protocol is secure, mature, interoperable, or adopted must be evaluated on its own evidence.

### A SegWit boundary map

When evaluating a claim, classify it:

- **Consensus:** witness programs, commitment, weight, and validation.
- **Serialization:** marker, flag, and per-input witness encoding.
- **Identification:** `txid` versus `wtxid`.
- **Signature rules:** BIP 143 for witness v0.
- **Policy:** standard witness forms and unknown-version relay treatment.
- **Wallet:** address, signing, fee, coin-selection, and recovery support.
- **Peer protocol:** witness-aware transaction and block relay.
- **Activation:** historical deployment and current buried enforcement state.
- **Application adoption:** actual use by wallets, services, and protocols.

SegWit changed all of these layers, but not in the same document or at the same moment.

## 3. Key Terms

- **Segregated Witness:** Deployed consensus and serialization changes separating witness data from legacy transaction serialization.
- **Witness:** Per-input stack data containing signatures and other spending evidence.
- **Witness program:** Version push and direct program push committed in an output or nested P2SH redeem script.
- **P2WPKH:** Version 0 witness program committing to a public-key hash.
- **P2WSH:** Version 0 witness program committing to a witness-script hash.
- **Nested SegWit:** Version 0 witness program carried inside a P2SH redeem script.
- **Native SegWit:** Witness program placed directly in the output.
- **`txid`:** Double-SHA256 identifier calculated from traditional serialization without witness data.
- **`wtxid`:** Double-SHA256 identifier calculated from witness serialization.
- **Witness commitment:** Coinbase commitment to the block’s witness Merkle root and reserved value.
- **Block weight:** SegWit resource measure combining base and total serialization.
- **Virtual size:** Transaction weight divided by four and rounded up.
- **BIP 143:** Signature digest rules for witness version 0.
- **Malleability:** Ability to alter a transaction representation while preserving some intended effect.
- **Bech32:** Address encoding used for native witness version 0.
- **Soft fork:** A consensus change that tightens validity rules relative to older nodes.

## 4. Sources

1. **BIP 141 — Segregated Witness (Consensus Layer)** | Eric Lombrozo, Johnson Lau, Pieter Wuille
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki
   - Supports: Witness structure, programs, native and nested triggers, P2WPKH, P2WSH, txid/wtxid, coinbase commitment, weight, vsize, compatibility, and deployment.
2. **BIP 143 — Transaction Signature Verification for Version 0 Witness Program** | Johnson Lau, Pieter Wuille
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0143.mediawiki
   - Supports: Witness-v0 signature digest, precomputed hashes, spent-output amount commitment, scriptCode, OP_CODESEPARATOR, and sighash semantics.
3. **BIP 144 — Segregated Witness Peer Services** | Eric Lombrozo
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0144.mediawiki
   - Supports: Marker, flag, per-input witness serialization, inventory, and peer-relay behavior.
4. **BIP 173 — Base32 Address Format for Native v0-16 Witness Outputs** | Pieter Wuille, Greg Maxwell
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki
   - Supports: Bech32 native SegWit address format and witness-version encoding.
5. **BIP 350 — Bech32m Format for Version 1+ Witness Addresses** | Pieter Wuille
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0350.mediawiki
   - Supports: Bech32 for version 0 and Bech32m for version 1+ compatibility boundary.
6. **BIP 16 — Pay to Script Hash** | Gavin Andresen
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki
   - Supports: P2SH layer used by nested SegWit.
7. **Bitcoin Core 31.1 BIP Support Document** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/bips.md
   - Supports: Release-specific SegWit implementation, mainnet definition, buried enforcement, wtxid relay, address, and Taproot evidence.
8. **Bitcoin Core 31.1 Transaction Primitives** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/primitives/transaction.h
   - Supports: Transaction witness representation, marker and flag serialization, traditional hash, witness hash, and no-witness equality boundaries.
9. **Bitcoin Core 31.1 Block Primitives** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/primitives/block.h
   - Supports: Block and transaction structures used by commitment validation.
10. **Bitcoin Core 31.1 Interpreter Interface** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/interpreter.h
    - Supports: Witness-v0 signature version, BIP 143 precomputed data, and script flags.
11. **Bitcoin Core 31.1 Script Interpreter** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/interpreter.cpp
    - Supports: Native and nested witness-program validation, P2WPKH, P2WSH, unknown versions, and BIP 143 signature hashing.
12. **Bitcoin Core 31.1 Consensus Definitions** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/consensus/consensus.h
    - Supports: Maximum block weight, witness scale factor, and consensus resource constants.
13. **Bitcoin Core 31.1 Validation Logic** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/validation.cpp
    - Supports: Coinbase reserved-value size, witness Merkle root, commitment verification, unexpected-witness failure, block weight, and current block-validation paths.
14. **Bitcoin Core 31.1 Mainnet Chain Parameters** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/kernel/chainparams.cpp
    - Supports: Mainnet SegWit activation height 481,824 and current buried height-based enforcement configuration.
15. **Bitcoin Core 31.1 SegWit Functional Test** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/test/functional/feature_segwit.py
    - Supports: End-to-end witness activation-era, transaction, block, commitment, weight, and validation cases.
16. **Bitcoin Core 31.1 SegWit P2P Test** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/test/functional/p2p_segwit.py
    - Supports: Witness-aware transaction and block relay behavior and malformed witness cases.
17. **Bitcoin Core 31.1 Transaction Tests** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/test/transaction_tests.cpp
    - Supports: Transaction serialization, hashes, and witness-related unit behavior.
18. **Bitcoin Core 31.1 Tag Commit** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/commit/9be056a8a72b624dae9623b2f7bded92c2a21c91
    - Supports: Exact source and test version reviewed.
19. **BIP 341 — Taproot: SegWit Version 1 Spending Rules** | Pieter Wuille, Jonas Nick, Anthony Towns
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki
    - Supports: Later native use of the witness-version framework for Taproot and the non-P2SH boundary.
20. **BIP 91 — Reduced Threshold SegWit MASF** | James Hilliard
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0091.mediawiki
    - Supports: One part of the historical 2017 SegWit activation context.
21. **Bitcoin Core 0.16.0 Release Notes** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v0.16.0/doc/release-notes.md
    - Supports: Historical native SegWit wallet and address support boundaries after consensus activation.

## 5. SEO title

How SegWit Changed Bitcoin | Mempool Surf Club

## 6. Meta description

Learn how SegWit introduced witness programs, txid and wtxid, block weight, BIP 143 signing, malleability fixes, and future script versions.

## 7. Page excerpt

Understand how SegWit changed Bitcoin transaction serialization, identifiers, block accounting, signatures, compatibility, and later protocol design.

## 8. Estimated reading time

18 to 21 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-055 | How Taproot Changed Bitcoin
- Next: MSC-GUIDE-057 | How Schnorr Signatures Work in Bitcoin
- Prerequisite: MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- Prerequisite: MSC-GUIDE-024 | Bitcoin Node Software Explained
- Prerequisite: MSC-GUIDE-054 | How Bitcoin Script Works
- Branch: MSC-GUIDE-026 | How Bitcoin Blocks Work
- Branch: MSC-GUIDE-033 | How the Lightning Network Works
- Branch: MSC-GUIDE-055 | How Taproot Changed Bitcoin
- Return: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] SegWit is described as deployed consensus, serialization, script, peer-protocol, and accounting changes.
- [x] Exact witness-program structure, witness versions, native and nested forms, P2WPKH, and P2WSH are covered.
- [x] Marker, flag, `txid`, `wtxid`, coinbase zero `wtxid`, witness root, reserved value, commitment selection, block weight, virtual size, and BIP 143 are explained.
- [x] The article does not reduce SegWit to moving signatures outside validation or to a simple block-size increase.
- [x] Malleability improvements are qualified by identifier, input type, construction, remaining signer behavior, legacy exposure, and `wtxid` changes.
- [x] Older-node and upgraded-node validation views are separated.
- [x] BIP 9, BIP 91, release support, activation at height 481,824, buried enforcement, wallet support, and application adoption are not conflated.
- [x] Lightning and Taproot relationships are presented as enabling foundations rather than guarantees.
- [x] Current implementation claims are pinned to Bitcoin Core 31.1 and dated July 25, 2026.
- [x] Planned internal links remain inactive and do not imply publication.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-25
- Evidence reviewed: Deployed BIPs 16, 141, 143, 144, 147, 173, 350, and 341; historical BIP 91; Bitcoin Core `v31.1` at commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`; tagged transaction, block, interpreter, consensus, validation, mainnet chain-parameter, transaction-unit, `feature_segwit.py`, and `p2p_segwit.py` evidence; release-specific `doc/bips.md`; and Bitcoin Core 0.16.0 wallet release notes.
- Material corrections: Added exact marker and flag serialization; corrected no-witness `txid`/`wtxid` equality and witness-only mutation boundaries; reproduced coinbase zero `wtxid`, reserved-value size, commitment hash, output-prefix, highest-index selection, and unexpected-witness failure; tightened native and nested witness triggers; restored exact weight and vsize definitions; narrowed BIP 143 signer assurances and malleability claims; separated unknown witness versions from Taproot; and dated activation at mainnet height 481,824 with Bitcoin Core’s current buried enforcement evidence.
- Remaining uncertainty: Wallet, exchange, hardware-signer, fee-estimation, address, PSBT, API, and service support remain implementation- and version-specific. Historical activation coordination can be described through several overlapping events, but those events no longer control current SegWit enforcement.

## 12. Illustration brief

### Illustration 1

- Concept title: Transaction and Witness Layers
- Educational purpose: Show that witness data is separated from legacy serialization but remains validated and committed.
- Recommended placement: After What counts as witness data.
- Visual description: Vintage cutaway diagram of a transaction hull with base inputs and outputs in the main frame and witness stacks in a lower compartment connected to upgraded validation.
- Required labels: Base serialization, Inputs, Outputs, Witness, Signature, Validation
- Caption: SegWit separates witness serialization without removing witness data from consensus validation.
- Alt text: Cutaway transaction diagram separating base transaction data from witness data while showing both are validated.
- Image orientation: Landscape
- Mobile crop notes: Use two horizontal layers with direct connecting arrows.
- Status: PLANNED

### Illustration 2

- Concept title: txid, wtxid, and Block Commitments
- Educational purpose: Explain the two identifiers and the coinbase witness commitment.
- Recommended placement: After The witness commitment.
- Visual description: Nautical ledger with one transaction feeding a legacy txid tree and a witness-inclusive wtxid tree, with the witness root anchored through the coinbase commitment into the block.
- Required labels: txid, wtxid, Transaction Merkle root, Witness Merkle root, Coinbase reserved value, Witness commitment
- Caption: The block commits to legacy transaction identifiers and separately to witness-inclusive identifiers.
- Alt text: Diagram showing txid and wtxid trees connected through the coinbase witness commitment.
- Image orientation: Landscape
- Mobile crop notes: Stack the two trees and place the coinbase commitment at the bottom.
- Status: PLANNED

### Illustration 3

- Concept title: Block Weight Balance
- Educational purpose: Show how base and witness bytes contribute differently to weight and virtual size.
- Recommended placement: After Block weight and virtual size.
- Visual description: Vintage maritime cargo scale with base bytes loaded at four weight units per byte and witness bytes at one, totaling toward a 4,000,000-unit limit.
- Required labels: Base bytes, Witness bytes, Weight, 4,000,000 limit, Virtual size, Fee rate
- Caption: Witness data receives discounted accounting, but every byte still contributes to transaction and block weight.
- Alt text: Cargo scale comparing base-byte and witness-byte contributions to Bitcoin block weight.
- Image orientation: Landscape
- Mobile crop notes: Keep the two cargo groups and total gauge visible in one frame.
- Status: PLANNED
