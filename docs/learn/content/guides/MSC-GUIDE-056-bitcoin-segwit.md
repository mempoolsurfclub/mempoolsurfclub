---
registry_id: MSC-GUIDE-056
status: EDITORIAL_REVIEW
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
reviewed_date: null
copy_locked_date: null
---

# How SegWit Changed Bitcoin

## 1. Introductory deck

Segregated Witness changed how Bitcoin commits to and accounts for transaction witness data. It introduced witness programs, separate transaction identifiers, a witness commitment, block weight, and a new signature digest for version 0 witness spends. SegWit improved important forms of transaction malleability and enabled later systems, but it did not make every transaction non-malleable or simply replace the block-size limit.

## 2. Full article

Segregated Witness, or SegWit, is a deployed set of Bitcoin consensus, transaction-serialization, script, and peer-protocol changes. Its central design separates witness data—signatures and related spending evidence—from the transaction serialization used to calculate the traditional transaction identifier.

The witness is still consensus-critical. Upgraded nodes receive it, commit it into the block, and validate it. “Segregated” describes how the data is serialized and committed, not that signatures became optional.

BIP 141 specifies the consensus-layer witness structure, witness programs, block commitment, weight, and script behavior. BIP 143 defines the signature digest for witness version 0. BIP 144 defines peer-to-peer transaction serialization and relay. Address and application support are covered by separate BIPs such as BIP 173.

This guide was reviewed July 25, 2026 against the deployed BIPs and Bitcoin Core 31.1, tag `v31.1`, commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`. Historical deployment is settled, but wallet, service, address, fee, and interface behavior remains software-specific.

### What counts as witness data

For a SegWit transaction input, witness data is a stack of byte arrays serialized outside the legacy input fields. It can include signatures, public keys, script arguments, and a witness script depending on the witness program.

The transaction’s effects still come from its inputs and outputs: which prior outputs are consumed and which new outputs are created. Witness data proves that the spend is authorized under the relevant rules.

Moving witness data outside the legacy serialization changes transaction identification and accounting. It does not move validation off chain.

### Witness programs and versions

A native witness program is a `scriptPubKey` containing a small version number from 0 through 16 and a program of 2 through 40 bytes. The version and program length select the validation rules.

For witness version 0, two lengths are defined:

- A 20-byte program is pay-to-witness-public-key-hash, or P2WPKH.
- A 32-byte program is pay-to-witness-script-hash, or P2WSH.

Other version 0 lengths fail. Higher versions were reserved for future rules. Taproot later used witness version 1 with a 32-byte program, demonstrating the upgrade path.

An output that merely resembles a witness program but does not meet the exact structure can be interpreted under different legacy rules. Exact byte structure matters.

### Native and nested SegWit

A native SegWit output places the witness program directly in the `scriptPubKey`. Its spending `scriptSig` is empty.

Nested SegWit uses BIP 16 pay-to-script-hash. The output is P2SH; the spending `scriptSig` pushes a redeem script that is itself a witness program. The actual signature or script arguments remain in the witness.

Nested P2SH-P2WPKH and P2SH-P2WSH were compatibility tools for systems that understood P2SH addresses but not native SegWit addresses. They add overhead compared with native forms and require both P2SH and witness validation.

Address support is separate from consensus. BIP 173 defined Bech32 addresses for native version 0 witness programs. BIP 350 later changed the checksum rule for version 1 and higher to Bech32m; it did not replace Bech32 for version 0.

### P2WPKH validation

A P2WPKH witness contains exactly two items: a signature and a public key. The HASH160 of the public key must match the 20-byte witness program. Signature verification then uses a script template equivalent in purpose to P2PKH but under witness rules and the BIP 143 signature digest.

Compressed public keys are required for standard witness v0 public-key types. A wallet must construct the correct previous-output amount and script information for signing.

P2WPKH changes where the signature and public key are carried. It does not remove key-management or signature security requirements.

### P2WSH validation

A P2WSH witness ends with the witness script. Its SHA256 hash must equal the 32-byte witness program. Earlier witness elements form the initial execution stack.

The witness script can express signatures, hashes, timelocks, and branches within the version 0 Script rules. BIP 141 allows a witness script up to 10,000 bytes, while individual stack elements supplied to it remain subject to applicable limits.

P2WSH reveals the full witness script when spent. Unlike Taproot script-path spending, it does not hide unused branches inside a committed Merkle tree.

### `txid` and `wtxid`

SegWit defines two transaction identifiers.

The traditional `txid` is the double-SHA256 of the legacy serialization without witness data. For a transaction with witness, the `txid` identifies its non-witness structure.

The `wtxid` is the double-SHA256 of the serialization including marker, flag, and witness data. A transaction with no witness has the same `txid` and `wtxid`.

Removing signatures from the `txid` prevents a third party from changing witness signatures and thereby changing the identifier used by dependent transactions. The witness itself is still identified through the `wtxid` and block witness commitment.

Applications must choose the right identifier. Mempool and peer protocols can use wtxid-based behavior, while output references continue to use the transaction identifier and output index.

### The witness commitment

The block header’s ordinary transaction Merkle root commits to coinbase and non-witness transaction identifiers. To commit the witness data without changing the legacy block-header structure, BIP 141 defines a separate witness Merkle root.

The coinbase transaction’s witness contains a reserved 32-byte value. A designated coinbase output contains an `OP_RETURN` commitment derived from the witness root and that reserved value. Upgraded nodes verify this commitment.

The coinbase transaction’s wtxid is treated as all zeroes when building the witness root. The structure lets older nodes continue seeing a valid legacy transaction tree while upgraded nodes enforce the additional witness commitment.

A miner cannot freely omit or alter witness data for SegWit spends: upgraded validation checks the commitment and the signatures.

### Block weight and virtual size

SegWit replaced one-dimensional transaction and block byte accounting with weight.

BIP 141 defines block weight as:

`base size × 3 + total size`

Because total size already includes the base bytes, this is equivalent to `base size × 4 + witness size`. A valid block has weight no greater than 4,000,000.

Transaction virtual size, or vsize, is weight divided by four and rounded up to the next whole virtual byte. Fee rates are commonly expressed in satoshis per virtual byte.

Witness bytes contribute less weight than base bytes, but they are not free. A transaction’s cost depends on its exact inputs, outputs, scripts, signatures, and witness data.

Saying SegWit “increased the block size” is incomplete. Old rules still constrain the base block structure, while upgraded nodes enforce a four-million-unit weight limit that permits additional witness data under discounted accounting. The maximum serialized byte count depends on block composition rather than one replacement byte limit.

### BIP 143 signature hashing

Legacy signature hashing can require repeated work as transaction size grows and does not commit to the spent output amount. BIP 143 defines a new digest algorithm for witness version 0.

The digest can precompute hashes of prevouts, sequences, and outputs, reducing repeated hashing for transactions with many signature checks. It also commits to the amount of the spent output.

Amount commitment is important for offline or hardware signers because the fee equals input values minus output values. The signer still needs correct previous-output information; committing to a false amount does not make false data true.

BIP 143 preserves sighash modes while changing the message construction. Taproot later introduced another signature-message design under BIP 341.

### Transaction malleability improvements

Before SegWit, a third party could alter some signature encodings or script data without invalidating the spend, changing the transaction identifier. A dependent unconfirmed transaction referring to the original identifier could then become invalid.

For SegWit inputs, signatures are excluded from the `txid`, removing the principal third-party signature malleability that affected transaction chains. This made stable unconfirmed transaction identifiers practical for protocols such as payment channels when all relevant inputs use the protected form.

SegWit did not eliminate every kind of malleability. A signer can intentionally create alternative valid transactions under some sighash choices. Transactions containing legacy inputs can retain legacy malleability exposure. Transaction replacement, fee bumping, different input or output selection, and protocol-level state changes are not the same as third-party signature malleability.

A precise claim is that SegWit fixes important nonintentional and third-party malleability for SegWit spends, subject to the transaction construction.

### Script versioning and future upgrades

Witness programs created a versioned output namespace. Older upgraded rules define version 0. Versions 1 through 16 were reserved so later soft forks could assign new validation behavior.

Taproot used version 1. The versioning mechanism allowed older SegWit-aware nodes to treat unknown versions according to forward-compatible rules while newer nodes enforce the added restrictions.

Relay policy can discourage unknown witness versions before a deployment. Consensus forward compatibility and mempool acceptance are separate.

Versioning does not guarantee every future proposal will activate or be safe. Each new version still needs a specification, implementation, review, deployment mechanism, and adoption.

### How older and upgraded nodes see SegWit

SegWit was designed as a soft fork. Older nodes parse blocks and transactions without understanding witness serialization as upgraded nodes do. To them, exact witness programs appear spendable under the old script rules, and the witness commitment is carried in a coinbase output they do not interpret.

Upgraded nodes apply the additional witness-program and commitment rules. A block that violates SegWit is rejected by upgraded nodes even if an older node would accept its legacy view.

This asymmetry is how stricter rules can remain compatible with older validation rules. It also means an older node does not independently validate SegWit authorization. Running old software after an activation can therefore provide a weaker view of current consensus.

### Deployment and activation boundaries

BIP 141 specified a BIP 9 version-bits deployment. The historical path included miner signaling, lock-in, activation in 2017, and additional coordination described by BIP 91.

Those historical mechanisms should not be collapsed into “miners approved SegWit.” Miners signaled and produced blocks, node software enforced rules, operators chose software, and activation conditions determined when upgraded rules applied.

Today, SegWit is deployed Bitcoin consensus behavior. The historical deployment code and dates remain relevant for understanding activation, but current validation no longer waits for fresh signaling.

A software release that contained SegWit code was not the same event as mainnet activation. Wallet adoption and use continued after activation on separate timelines.

### Wallet and service consequences

Wallets implementing SegWit need output detection, address encoding, amount-aware signing, witness serialization, fee estimation by weight, coin selection, PSBT or proprietary signing support, and compatible backup and recovery logic.

A sender can pay a SegWit output without being able to spend from that output type. A service can accept native SegWit deposits but still consolidate through another form. Hardware devices can support P2WPKH before P2WSH or Taproot.

Fee estimation should use weight or virtual size rather than raw byte size. Explorers and APIs should label `txid` and `wtxid` clearly. Systems comparing transactions must understand that witness differences can change `wtxid` without changing `txid`.

Compatibility claims should name native or nested forms, receive or spend capability, script type, address format, and exact software version.

### SegWit, Lightning, and Taproot

SegWit’s malleability fix made dependable chains of unconfirmed transactions more practical and was an important foundation for Lightning Network deployments. SegWit did not create Lightning by itself. Lightning also depends on timelocks, revocation or update constructions, peer protocols, liquidity, watch behavior, fee management, and implementations.

Taproot reused the witness-version framework by assigning version 1 rules and Bech32m addresses. Taproot is a later consensus upgrade, not merely a wallet feature automatically supplied by SegWit.

SegWit provided architectural hooks and accounting changes that later systems could use. Whether a later protocol is secure or adopted must be evaluated on its own evidence.

### A SegWit boundary map

When evaluating a claim, classify it:

- **Consensus:** witness programs, commitment, weight, and validation.
- **Serialization:** marker, flag, and witness encoding.
- **Identification:** `txid` versus `wtxid`.
- **Signature rules:** BIP 143 for witness v0.
- **Policy:** standard witness forms and unknown-version relay treatment.
- **Wallet:** address, signing, fee, coin-selection, and recovery support.
- **Peer protocol:** witness-aware transaction and block relay.
- **Activation:** historical deployment and enforcement state.
- **Application adoption:** actual use by wallets, services, and protocols.

SegWit changed all of these layers, but not in the same document or at the same moment.

## 3. Key Terms

- **Segregated Witness:** Deployed consensus and serialization changes separating witness data from legacy transaction serialization.
- **Witness:** Per-input stack data containing signatures and other spending evidence.
- **Witness program:** Version byte and program committed in an output script.
- **P2WPKH:** Version 0 witness program committing to a public-key hash.
- **P2WSH:** Version 0 witness program committing to a witness-script hash.
- **Nested SegWit:** Witness program carried inside a P2SH redeem script.
- **Native SegWit:** Witness program placed directly in the output.
- **`txid`:** Transaction identifier calculated without witness data.
- **`wtxid`:** Witness transaction identifier calculated with witness data.
- **Witness commitment:** Coinbase commitment to the block’s witness Merkle root and reserved value.
- **Block weight:** SegWit resource measure combining base and witness serialization.
- **Virtual size:** Transaction weight divided by four and rounded up.
- **BIP 143:** Signature digest rules for witness version 0.
- **Malleability:** Ability to alter a transaction representation while preserving some intended effect.
- **Bech32:** Address encoding used for native witness version 0.
- **Soft fork:** A consensus change that tightens validity rules relative to older nodes.

## 4. Sources

1. **BIP 141 — Segregated Witness (Consensus Layer)** | Eric Lombrozo, Johnson Lau, Pieter Wuille
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki
   - Supports: Witness structure, programs, P2WPKH, P2WSH, txid/wtxid, commitment, weight, vsize, compatibility, and deployment.
2. **BIP 143 — Transaction Signature Verification for Version 0 Witness Program** | Johnson Lau, Pieter Wuille
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0143.mediawiki
   - Supports: Witness v0 signature digest, precomputed hashes, spent-output amount commitment, and sighash semantics.
3. **BIP 144 — Segregated Witness Peer Services** | Eric Lombrozo
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0144.mediawiki
   - Supports: Marker, flag, witness serialization, inventory, and peer-relay behavior.
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
   - Supports: Release-specific SegWit, wtxid-relay, address, Taproot, and implementation evidence.
8. **Bitcoin Core 31.1 Transaction Primitives** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/primitives/transaction.h
   - Supports: Transaction witness representation, serialization, hash, and witness-hash boundaries.
9. **Bitcoin Core 31.1 Block Primitives** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/primitives/block.h
   - Supports: Block and transaction structures used by commitment validation.
10. **Bitcoin Core 31.1 Interpreter Interface** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/interpreter.h
    - Supports: Witness v0 signature version, BIP 143 precomputed data, and script flags.
11. **Bitcoin Core 31.1 Script Interpreter** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/interpreter.cpp
    - Supports: Witness-program validation and BIP 143 signature hashing.
12. **Bitcoin Core 31.1 Consensus Definitions** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/consensus/consensus.h
    - Supports: Maximum block weight, witness scale factor, and consensus resource constants.
13. **Bitcoin Core 31.1 Validation Logic** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/validation.cpp
    - Supports: Witness commitment, block weight, deployment-era and current block validation paths.
14. **Bitcoin Core 31.1 SegWit Functional Test** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/test/functional/feature_segwit.py
    - Supports: End-to-end witness activation-era, transaction, block, commitment, and validation cases.
15. **Bitcoin Core 31.1 SegWit P2P Test** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/test/functional/p2p_segwit.py
    - Supports: Witness-aware transaction and block relay behavior and malformed witness cases.
16. **Bitcoin Core 31.1 Transaction Tests** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/test/transaction_tests.cpp
    - Supports: Transaction serialization, hashes, and witness-related unit behavior.
17. **Bitcoin Core 31.1 Tag Commit** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/commit/9be056a8a72b624dae9623b2f7bded92c2a21c91
    - Supports: Exact source and test version reviewed.
18. **BIP 341 — Taproot: SegWit Version 1 Spending Rules** | Pieter Wuille, Jonas Nick, Anthony Towns
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki
    - Supports: Later use of the witness-version framework for Taproot.
19. **BIP 91 — Reduced Threshold SegWit MASF** | James Hilliard
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0091.mediawiki
    - Supports: One part of the historical 2017 SegWit activation context.
20. **Bitcoin Core 0.16.0 Release Notes** | Bitcoin Core contributors
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
- Prerequisite: MSC-GUIDE-024 | How Bitcoin Nodes Communicate
- Prerequisite: MSC-GUIDE-054 | How Bitcoin Script Works
- Branch: MSC-GUIDE-026 | How Bitcoin Transaction Replacement Works
- Branch: MSC-GUIDE-031 | How the Lightning Network Works
- Branch: MSC-GUIDE-055 | How Taproot Changed Bitcoin
- Return: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] SegWit is described as deployed consensus, serialization, script, and peer-protocol changes.
- [x] Witness programs, witness versions, native and nested forms, P2WPKH, and P2WSH are covered.
- [x] `txid`, `wtxid`, witness commitment, block weight, virtual size, and BIP 143 are explained.
- [x] The article does not reduce SegWit to a simple block-size increase.
- [x] Malleability improvements are qualified by input type, construction, and remaining signer or legacy behavior.
- [x] Older-node and upgraded-node validation views are separated.
- [x] Soft-fork deployment, software release, activation, wallet support, and application adoption are not conflated.
- [x] Lightning and Taproot relationships are presented as enabling foundations rather than guarantees.
- [x] Current implementation claims are pinned to Bitcoin Core 31.1 and dated July 25, 2026.
- [x] Planned internal links remain inactive and do not imply publication.

## 11. Human verification

- Reviewer: Pending — Bitcoin protocol and implementation specialist
- Review date: Pending
- Notes: Human Verification remains pending. The specialist pass must reproduce txid/wtxid, witness commitment, weight, vsize, BIP 143, nested witness, and older-node compatibility behavior against exact tests; verify the historical activation wording; and review all malleability, fee, Lightning, and Taproot boundaries.

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
