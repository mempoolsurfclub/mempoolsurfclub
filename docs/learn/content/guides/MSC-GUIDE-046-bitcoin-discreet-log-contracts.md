---
registry_id: MSC-GUIDE-046
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: How Discreet Log Contracts Work
handle: bitcoin-discreet-log-contracts
category: Building on Bitcoin
subcategory: Innovation
depth: Deep
format: Technical Analysis
primary_path: Build on Bitcoin
secondary_paths:
  - Understand the Network
author_display: Mempool Surf Club Editorial
reviewed_date: null
copy_locked_date: null
---

# How Discreet Log Contracts Work

## 1. Introductory deck

Discreet Log Contracts use preconstructed Bitcoin transactions and oracle signatures to settle event-dependent payouts without making the oracle a custodian. Learn how announcements, event descriptors, funding transactions, CETs, adaptor signatures, refunds, multi-oracle designs, privacy, fees, and implementation maturity fit together.

## 2. Full article

A Discreet Log Contract, or DLC, is an application protocol for constructing Bitcoin transactions whose payout depends on an event attested to by an oracle. Two contracting parties agree on the possible outcomes and payout rules, lock collateral in a jointly controlled Bitcoin output, and exchange signatures for possible closing transactions before funding the contract.

Bitcoin does not have a DLC consensus object. Nodes validate the funding transaction, the eventual closing transaction, its signatures, locktime, scripts, amounts, and UTXO spend. DLC software supplies the contract messages, oracle format, payout mapping, adaptor signatures, transaction construction, storage, and recovery logic.

### The oracle reports; it does not normally hold the funds

A DLC oracle publishes signed information about an event. Examples could include an election result, weather observation, asset-price fixing, or another objectively encoded outcome. The oracle is not normally a co-signer of the DLC funding output and does not need to learn which parties used its announcement.

Before the event, the oracle publishes an announcement. The current specification describes an announcement containing the oracle public key, event identifier, expected attestation time, event descriptor, and one or more public nonces. The announcement is signed so clients can verify that it came from the stated oracle.

After the event, the oracle publishes an attestation: a signature over the encoded outcome using the previously announced nonce material. Contract participants use that signature data to complete the closing signature associated with the attested outcome.

This design can keep the oracle unaware of specific contracts, but “discreet” is not a guarantee of complete privacy. Network observation, counterparties, wallet behavior, reused addresses, distinctive transaction structures, or an oracle service's access logs can still reveal information.

### Event descriptors define the outcome language

The parties must agree on exactly what the oracle can attest to. An event descriptor defines the outcome encoding.

An enumerated event lists a finite set of strings, such as `sunny`, `cloudy`, or `rainy`. A numeric event can use digit decomposition, in which an oracle signs digits in a specified base with a unit, precision, sign rule, and number of digits.

Encoding is part of the contract. Differences in capitalization, normalization, precision, time source, rounding, overflow behavior, or event identifiers can make an attestation unusable for a contract even when humans believe the oracle reported the expected fact.

The oracle announcement should therefore be treated as a cryptographic interface, not a natural-language promise. Wallets need to verify the exact serialized event, public key, nonces, and descriptor before accepting collateral terms.

### Negotiation produces one shared transaction view

The current peer-protocol specification uses an offer, accept, and sign exchange. The offerer proposes contract information, oracle information, collateral, inputs, payout and change scripts, fee rate, and locktimes. The accepter validates those terms, contributes its own inputs and collateral, and returns adaptor signatures for the possible Contract Execution Transactions, or CETs, plus a signature for the refund transaction.

The offerer then sends its signatures. Only after both parties possess the signatures needed for safe closure should the funding transaction be broadcast.

This ordering protects against locking funds before a usable exit exists. A wallet that broadcasts too early can create a jointly controlled UTXO without having every required CET or refund signature. DLC implementations must persist negotiation state and verify the complete transaction set before funding.

The contract identifier and transaction ordering rules also matter. Both parties must construct byte-identical funding and closing transactions for signatures to verify. Input order, output order, serial identifiers, amounts, scripts, and locktimes cannot be treated as display-only metadata.

### The funding transaction locks collateral

Under the current version-zero transaction specification, the funding transaction combines participant inputs and creates a two-of-two P2WSH funding output. Each party may also receive change. SegWit inputs are required by that specification to avoid transaction-ID malleability that could invalidate precomputed closing transactions.

Once confirmed, the funding output can be spent cooperatively by signatures from both funding keys. The parties have already prepared signatures for outcome-specific CETs and a time-locked refund.

Bitcoin consensus sees a standard Bitcoin output and later spend. It does not see the event descriptor or payout curve unless an application reconstructs them from the parties' stored contract data.

Collateral remains exposed to ordinary Bitcoin risks: lost keys, corrupted contract records, inadequate backups, fee miscalculation, confirmation delays, reorganizations, and implementation bugs. “Non-custodial” does not mean that recovery is automatic.

### CETs encode possible payouts

A Contract Execution Transaction spends the funding output and pays the parties according to one possible outcome. For a simple enumerated event, the parties can construct one CET per outcome. Numeric contracts can require many possible payout points, so the specification includes compression and interpolation techniques to reduce the transaction and signature set.

Before the oracle attests, neither party should possess a complete ordinary signature that allows unilateral broadcast of an outcome CET. Instead, each party exchanges adaptor signatures. An adaptor signature is a cryptographic object that can be completed with a secret related to the oracle's eventual signature.

The oracle's public announcement lets the parties compute the adaptor points needed during setup. The later attestation reveals the value that completes the adaptor signature for the corresponding CET. The party with the completed signatures can broadcast that transaction.

The oracle does not choose a payout transaction after seeing the contract. Its signed outcome unlocks the pre-negotiated outcome path. If the parties disagreed about the payout curve during setup, the oracle's later signature does not repair the contract.

### The attestation is an input to signature completion

It is tempting to say the oracle “executes” the contract. More precisely, the oracle publishes signed outcome data. DLC software verifies the announcement and attestation, identifies the applicable CET, and uses the attestation secret to complete an adaptor signature.

Bitcoin nodes verify the resulting ordinary signatures and transaction. They do not verify that the oracle was an appropriate source, followed a correct measurement method, or reported reality honestly.

This boundary explains the principal oracle risk. A cryptographically valid attestation can still be factually wrong. An oracle can also fail to publish, publish late, use inconsistent event parameters, or compromise its signing key.

Under the construction described by the DLC introduction, signing conflicting outcomes with the same committed nonce can expose the oracle's private key. That creates accountability and severe consequences, but it does not reverse an already confirmed incorrect payout.

### The refund path handles non-attestation

The parties also sign a refund transaction during setup. It returns their respective collateral after a later locktime. The refund is intended for a situation in which the oracle does not provide a usable attestation.

The refund locktime must leave enough time for the event and expected oracle publication. If it is too early, a participant may attempt a refund before a delayed but legitimate outcome path is used. If it is too late, funds remain locked longer during oracle failure.

Fee planning is equally important. A fully signed refund that cannot confirm economically or before another valid spend is not a complete operational recovery plan. Implementations need current fee-management and rebroadcast procedures rather than assuming the fee rate chosen at setup will remain adequate.

A refund protects against non-attestation. It does not protect against an oracle signing the wrong outcome or colluding with one participant. The current DLC introduction explicitly notes that its described version does not prevent participant-oracle collusion.

### Multiple oracles change the assumption, not eliminate it

A DLC can combine multiple oracles and require a threshold of attestations. This can reduce dependence on any single source, but it introduces coordination and agreement questions.

The contract must specify whether oracles use corresponding outcome sets, how numeric differences are tolerated, what threshold is required, and how conflicting or missing attestations map to CETs. More oracles can mean more announcements, nonces, adaptor signatures, storage, and closing possibilities.

A federation is only as useful as its independence and measurement design. Several public keys controlled by one operator do not provide the same failure resistance as genuinely independent sources. Correlated data feeds, shared infrastructure, legal pressure, or common software bugs can defeat a nominal threshold.

The current specification repository documents multi-oracle work but also preserves roadmap material and in-progress areas. Support must be checked against the exact implementation pair, not inferred from a general feature list.

### Cooperative close can avoid revealing the contract path

If both parties agree, they can cooperatively spend the funding output with a mutually signed transaction rather than using an oracle-conditioned CET. This can reduce on-chain fingerprinting and permit a mutually accepted settlement.

A cooperative close depends on continued cooperation. It cannot be the only exit. The pre-signed CETs and refund transaction are what allow unilateral closure under the agreed conditions.

On-chain privacy is also relative. The current v0 funding output is designed to resemble other two-of-two P2WSH constructions, but spending patterns, timing, output amounts, and later analysis may distinguish it. Taproot DLC designs could change the fingerprint, yet the DLC specification lists Taproot support as future work rather than a universal current property.

### Fees, dust, and payout curves are contract behavior

DLC transaction sets must account for funding fees, closing fees, and outputs that fall below the implementation's dust threshold. The current transaction specification describes fee allocation and omits a participant output from a CET when its payout would be below the stated threshold.

That can create a sharp difference between an economic curve and actual transaction outputs. Rounding, interpolation, dust handling, and fee assumptions should be shown to users before signing.

Numeric contracts can create large computational and storage requirements. Compression techniques reduce the number of CETs or signatures, but they also add algorithms that independently developed implementations must match exactly.

The funding transaction itself can remain unconfirmed, be replaced under applicable conditions, or be affected by a reorganization. A contract should define when it becomes active and how many confirmations are required before participants rely on it.

### DLCs are an application protocol with uneven maturity

DLC papers, specifications, libraries, wallets, and applications have existed for years. That is evidence of implementation work, not evidence that every component is standardized or widely interoperable.

As of July 24, 2026, the official `dlcspecs` repository still labels the specification work in progress. Its README and roadmap describe future work including transfers, option-style DLCs, Taproot DLCs, and Lightning DLCs. Some older roadmap sections also record features as done or in progress at the time they were written, so maturity must be confirmed against current code, tests, releases, and interoperability results.

An application can deploy a DLC implementation without changing Bitcoin consensus. Two implementations can also both claim DLC support while differing in message versions, oracle formats, numeric compression, fee handling, storage, or supported closing paths.

A careful evaluation records the exact specification commit, implementation release, oracle software, network, contract type, and test vectors. It verifies backup and recovery, simulates oracle failure, confirms refunds and CETs, and does not put significant funds at risk merely because the protocol design is non-custodial.

DLCs demonstrate how existing Bitcoin transactions and cryptography can coordinate event-dependent payouts. Their security remains the combined result of Bitcoin validation, correct transaction preparation, sound adaptor-signature code, usable oracle attestations, safe key management, and robust operations.

## 3. Key Terms

- **Discreet Log Contract:** An application protocol for Bitcoin payouts that depend on an oracle-attested event.
- **Oracle:** An entity that announces an event and later signs its encoded outcome.
- **Oracle announcement:** A signed commitment describing the event, oracle key, public nonces, timing, and outcome format.
- **Oracle attestation:** The oracle's signed statement of the event outcome.
- **Event descriptor:** The machine-readable definition of the outcomes an oracle can attest to.
- **Enumerated outcome:** An outcome selected from a finite list of strings.
- **Numeric outcome:** A number represented under agreed base, precision, unit, sign, and digit rules.
- **Funding transaction:** The Bitcoin transaction locking both parties' collateral in the contract output.
- **Contract Execution Transaction (CET):** A preconstructed transaction whose outputs represent one contract outcome.
- **Adaptor signature:** A signature-like object that can be completed when a related secret becomes known.
- **Refund transaction:** A pre-signed, time-locked transaction returning collateral if no usable outcome path executes.
- **Cooperative close:** A mutually signed spend that closes the funding output without using a CET or refund.
- **Multi-oracle DLC:** A contract whose execution depends on a defined threshold or combination of oracle attestations.
- **Application protocol:** Rules implemented by DLC software above Bitcoin consensus.

## 4. Sources

1. **Discreet Log Contracts** | Thaddeus Dryja
   - URL: https://adiabat.github.io/dlc.pdf
   - Supports: The original DLC proposal, oracle-signature construction, adaptor-signature concept, privacy motivation, and event-dependent payout model.
2. **DLC Specifications README** | DLC specification contributors
   - URL: https://github.com/discreetlogcontracts/dlcspecs/blob/master/README.md
   - Supports: The repository's work-in-progress status, implementation links, roadmap, and future-work categories reviewed on 2026-07-24.
3. **DLC Specifications Introduction** | DLC specification contributors
   - URL: https://github.com/discreetlogcontracts/dlcspecs/blob/master/Introduction.md
   - Supports: Oracle announcements and signatures, adaptor signatures, CETs, funding and refund concepts, unilateral close, non-attestation protection, collusion limitation, and terminology.
4. **DLC Peer Protocol** | DLC specification contributors
   - URL: https://github.com/discreetlogcontracts/dlcspecs/blob/master/Protocol.md
   - Supports: Offer, accept, and sign negotiation; contract identifiers; collateral; fee rates; locktimes; adaptor signatures; validation requirements; and funding broadcast order.
5. **DLC Transactions** | DLC specification contributors
   - URL: https://github.com/discreetlogcontracts/dlcspecs/blob/master/Transactions.md
   - Supports: Funding output, CET, refund, transaction ordering, SegWit-input requirement, fee allocation, dust treatment, and transaction weights in the current v0 specification.
6. **DLC Oracle Specifications** | DLC specification contributors
   - URL: https://github.com/discreetlogcontracts/dlcspecs/blob/master/Oracle.md
   - Supports: Event descriptors, enumerated and digit-decomposed numeric outcomes, oracle announcements, attestations, nonces, serialization, and BIP 340 signing.
7. **DLC Messaging Specification** | DLC specification contributors
   - URL: https://github.com/discreetlogcontracts/dlcspecs/blob/master/Messaging.md
   - Supports: Current TLV messages and serialization for contract, oracle, and negotiation data.
8. **DLC v0 Milestone** | DLC specification contributors
   - URL: https://github.com/discreetlogcontracts/dlcspecs/blob/master/v0Milestone.md
   - Supports: Historical roadmap status for enumerated, numeric, multi-oracle, test-vector, oracle-interface, Taproot, Lightning, and other work; this roadmap must be dated rather than treated as a current release list.
9. **BIP 340: Schnorr Signatures for secp256k1** | Pieter Wuille, Jonas Nick, and Tim Ruffing
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki
   - Supports: The Schnorr signing algorithm referenced by the oracle specification.
10. **BIP 141: Segregated Witness** | Eric Lombrozo, Johnson Lau, and Pieter Wuille
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki
   - Supports: SegWit transaction identifiers, witness commitments, and the malleability context for precomputed transactions.
11. **BIP 65: OP_CHECKLOCKTIMEVERIFY** | Peter Todd
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0065.mediawiki
   - Supports: Absolute locktime enforcement used in refund and contract timeout reasoning.
12. **BIP 67: Deterministic Pay-to-script-hash multi-signature addresses** | Pieter Wuille
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0067.mediawiki
   - Supports: Lexicographic public-key ordering referenced by the current DLC funding-output specification.
13. **Bitcoin Core v31.1 Script Interpreter** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/interpreter.cpp
   - Supports: Current Bitcoin signature, multisignature, and locktime script validation behavior separate from DLC application rules.
14. **Bitcoin Core v31.1 Transaction Policy** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/src/policy
   - Supports: Current standardness, dust, and relay-policy implementation that can affect DLC transactions separately from consensus.
15. **rust-dlc Repository** | rust-dlc contributors
   - URL: https://github.com/p2pderivatives/rust-dlc
   - Supports: One current Rust implementation family; implementation support, releases, and interoperability must be checked independently of the specification.
16. **Bitcoin-S DLC Documentation** | Bitcoin-S contributors
   - URL: https://bitcoin-s.org/docs/wallet/dlc
   - Supports: One implementation's DLC wallet behavior and user-facing workflow; it is not the universal DLC specification.

## 5. SEO title

How Discreet Log Contracts Work | Mempool Surf Club

## 6. Meta description

Learn how Bitcoin DLCs use oracle announcements, adaptor signatures, funding transactions, CETs, and time-locked refunds.

## 7. Page excerpt

Understand DLC negotiation, oracle attestations, event descriptors, payout transactions, refunds, privacy, and trust boundaries.

## 8. Estimated reading time

17 to 20 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-045 | What Is BitVM?
- Next: MSC-GUIDE-047 | What Is OP_CAT?
- Prerequisite: MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- Prerequisite: MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work
- Prerequisite: MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
- Prerequisite: MSC-GUIDE-014 | How Bitcoin Confirmations Work
- Branch: MSC-GUIDE-048 | Emerging Protocols on Bitcoin: How to Evaluate Them
- Branch: MSC-GUIDE-055 | How Taproot Changed Bitcoin
- Return: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] Registry metadata matches the approved manifest entry.
- [x] DLC application rules are separated from Bitcoin consensus and Bitcoin Core policy.
- [x] The oracle is described as an outcome attester rather than a fund custodian or Bitcoin consensus authority.
- [x] Announcements, event descriptors, attestations, funding transactions, CETs, adaptor signatures, refunds, and cooperative closes remain distinct.
- [x] Oracle correctness, availability, equivocation, collusion, and multi-oracle assumptions are stated without guarantees.
- [x] The current v0 transaction structure is not generalized into a universal Taproot or Lightning DLC claim.
- [x] Fee, dust, locktime, confirmation, storage, and backup risks are included.
- [x] The `dlcspecs` work-in-progress label is dated 2026-07-24 and historical roadmap statuses are not treated as current releases.
- [x] No adoption, liquidity, privacy, security, compatibility, or production claim exceeds the cited evidence.
- [x] Planned internal links remain inactive and do not imply publication.

## 11. Human verification

- Reviewer: Pending
- Review date: Pending
- Notes: Pending human verification should review the exact `dlcspecs` master commit, confirm whether a newer versioned specification or interoperability report supersedes the repository's work-in-progress wording, test the described funding, CET, and refund flow against at least one current implementation, verify oracle nonce and attestation language with a cryptography reviewer, and confirm current Taproot, Lightning, numeric, and multi-oracle support before copy-lock.

## 12. Illustration brief

### Illustration 1

- Concept title: DLC Transaction Lighthouse
- Educational purpose: Show the funding transaction, outcome CETs, and refund as prearranged Bitcoin paths.
- Recommended placement: After the section CETs encode possible payouts.
- Visual description: Vintage lighthouse lens splitting one funding beam into several labeled CET beams and one delayed refund beam.
- Required labels: Funding transaction, 2-of-2 output, CET A, CET B, Numeric CETs, Oracle attestation, Refund locktime
- Caption: Participants prepare outcome transactions and a delayed refund before they lock collateral.
- Alt text: Technical diagram showing one DLC funding output branching into oracle-enabled contract execution transactions and a time-locked refund.
- Image orientation: Landscape
- Mobile crop notes: Place funding at top, outcome paths in the middle, and refund at bottom.
- Status: PLANNED

### Illustration 2

- Concept title: Oracle Announcement and Attestation Signals
- Educational purpose: Explain how public nonce commitments precede a later signed outcome.
- Recommended placement: After the section The attestation is an input to signature completion.
- Visual description: Nautical signal station publishing an event chart and public nonce before a storm, then transmitting a signed outcome afterward to two ships holding adaptor signatures.
- Required labels: Oracle key, Event descriptor, Public nonce, Announcement, Outcome, Attestation, Adaptor signature, Completed CET signature
- Caption: The oracle announces its event interface first and later publishes the signed outcome used to complete the applicable CET signature.
- Alt text: Nautical signal diagram showing an oracle announcement before an event and an attestation completing an adaptor signature after the event.
- Image orientation: Landscape
- Mobile crop notes: Use a two-stage before-and-after vertical layout.
- Status: PLANNED

### Illustration 3

- Concept title: DLC Trust Boundary Map
- Educational purpose: Separate Bitcoin validation, counterparty behavior, oracle correctness, and application operations.
- Recommended placement: After the section DLCs are an application protocol with uneven maturity.
- Visual description: Layered nautical map with Bitcoin consensus seabed, DLC transaction machinery, oracle signal tower, two counterparties, wallet storage, fees, and recovery routes.
- Required labels: Bitcoin consensus, DLC software, Counterparty, Oracle correctness, Oracle availability, Contract backup, Fee policy, Refund path
- Caption: A DLC combines Bitcoin-enforced spending with application, oracle, storage, and operational assumptions.
- Alt text: Layered systems map separating Bitcoin consensus from DLC software, oracle, counterparties, backup, fees, and recovery.
- Image orientation: Landscape
- Mobile crop notes: Stack consensus, application, participants, and oracle as four bands.
- Status: PLANNED
