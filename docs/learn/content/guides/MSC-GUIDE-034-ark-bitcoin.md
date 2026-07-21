---
registry_id: MSC-GUIDE-034
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: What Is Ark on Bitcoin?
handle: ark-bitcoin
category: Building on Bitcoin
subcategory: Layer 2
depth: Deep
format: Technical Analysis
primary_path: Build on Bitcoin
secondary_paths:
  - Understand the Network
author_display: Mempool Surf Club Editorial
reviewed_date: null
copy_locked_date: null
---

# What Is Ark on Bitcoin?

## 1. Introductory deck

Ark is an evolving family of off-chain Bitcoin designs that represents user claims as virtual transaction outputs, coordinates them through shared batch outputs, and preserves defined paths back to ordinary Bitcoin UTXOs. Current Arkade software implements one version of this model, with important operator, expiry, liquidity, backup, and exit assumptions that must remain visible.

## 2. Full article

Ark is an evolving family of off-chain Bitcoin protocols built around virtual transaction outputs, shared on-chain commitments, and coordinated settlement. The general idea is to let users receive and transfer bitcoin-denominated claims without publishing every change as a separate Bitcoin transaction, while retaining defined transaction paths that can bring those claims on-chain.

That working definition is broader than any one product. Ark is the protocol concept. Arkade is a currently maintained implementation project and execution environment. The Arkade Operator coordinates that environment. `arkd` is the maintained server implementation. The Arkade TypeScript SDK and Arkade Wallet are client products that interact with compatible operators. Older Ark proposals and earlier implementations used related but not identical transaction constructions and terminology.

Ark is not a separate coin, a separate proof-of-work blockchain, a sidechain, or a Lightning channel network. Bitcoin nodes validate Ark transactions only when those transactions are actually broadcast to Bitcoin. The Bitcoin network does not validate Ark's complete off-chain history or certify every operator preconfirmation.

### The problem Ark is designed to address

Bitcoin block space is limited, and every confirmed transaction is replicated and checked by validating nodes. That provides a strong common settlement layer, but it makes frequent individual on-chain updates expensive in block space.

Lightning reduces routine on-chain use through bilateral payment channels and routed HTLC payments. That model introduces channel setup, directional liquidity, route discovery, and channel-state monitoring.

Ark explores a different structure. An operator can group many user claims under a shared Bitcoin output, represent those claims as VTXOs, and coordinate later off-chain transfers or periodic settlements. A receiver does not need a pre-existing bilateral channel with the sender. The tradeoff is a different set of dependencies involving an operator, batch timing, preconfirmation trust, liquidity, data availability, and expiry.

### A VTXO mirrors a UTXO without being the same thing

A Bitcoin UTXO is an output of a confirmed or otherwise available Bitcoin transaction that can be spent as an input under its locking conditions.

A VTXO, or virtual transaction output, is an output represented by presigned Bitcoin transaction data inside an Ark construction. It mirrors the value and spending-condition model of a UTXO, but it is normally kept off-chain. A VTXO may be preconfirmed by an operator and usable inside an Arkade environment before the commitment transaction anchoring its batch has confirmed.

That distinction matters. A preconfirmed VTXO is not automatically equivalent to a confirmed on-chain UTXO. Its enforceability depends on the transaction chain behind it, the operator or signer behavior associated with its preconfirmation, the availability of complete exit data, and whether the relevant batch output is confirmed and unexpired.

A VTXO is not a global account balance. It is a specific transaction output with an owner, value, spending conditions, history, and expiry context.

### Commitment transactions create batch outputs

In the current Arkade design, a commitment transaction is an on-chain Bitcoin transaction that creates one batch output and one connector output, with the connector output committed to a tree of connector leaves used for atomic coordination.

The batch output consolidates many user claims into one Bitcoin output. A presigned virtual transaction tree can unroll that shared output into branches whose leaves are user VTXOs. Users participating in the batch verify the proposed structure and contribute signatures required by the construction.

The commitment transaction does not publish each prior off-chain transfer as a separate Bitcoin transaction. Its confirmation anchors the new batch structure. It gives the VTXOs included in that structure a stronger on-chain basis, but it does not cause Bitcoin nodes to replay or validate every earlier Arkade interaction.

A confirmed commitment transaction should therefore be described as settlement of the batch state it commits to, not as individual Bitcoin confirmation of every previous off-chain event.

### Batch coordination uses intents, signatures, and forfeits

A current Arkade batch swap begins when users register intents describing the VTXOs they will provide and the outputs they expect in return. The operator selects participants, constructs the commitment transaction, batch output, connector structure, and virtual transaction tree, then coordinates signing.

Users must verify the transaction data before signing. For VTXOs being replaced, users create forfeit transactions tied to connector outputs. This design makes surrender of an old claim conditional on confirmation of the commitment transaction that creates the replacement claim.

The operator broadcasts the completed commitment transaction. If it confirms, the new batch becomes anchored on Bitcoin. If a user is not selected, does not confirm participation, or does not complete the required signing steps, that user's intended replacement is not settled in that batch. The user must try a later batch or use another valid path, and an expiring VTXO still must be renewed or exited before its deadline.

This coordinated process is sometimes described historically as a round. Current Arkade documentation more often uses batch, batch swap, commitment transaction, and intent terminology. Older terms such as Ark service provider, ASP, round, Ark transaction, and out-of-round payment should be tied to the proposal or implementation that uses them rather than assumed to describe every current Ark system.

### Boarding moves on-chain funds into the system

Boarding is the native process for moving an ordinary Bitcoin UTXO into an Ark system.

In the maintained Arkade workflow, the user first creates a boarding output with spending conditions that protect both the intended batch participation and a delayed fallback path. The operator later includes that boarding input in a commitment transaction that creates the user's VTXO.

This native route can require multiple on-chain transactions and confirmation waits. A service may also offer swaps or credits that produce a faster interface, but those are additional products with their own liquidity and trust assumptions.

Boarding does not make the original on-chain bitcoin disappear. It moves value into a transaction structure whose ordinary use is off-chain and whose final enforcement remains based on Bitcoin transactions.

### Off-chain transfers create new VTXOs

Inside Arkade, users can spend VTXOs through presigned Bitcoin transactions that are normally not broadcast. A transfer consumes one or more VTXOs and creates new VTXOs under new spending conditions.

Current Arkade documentation distinguishes preconfirmed activity in its virtual mempool from VTXOs anchored through a confirmed commitment transaction. A preconfirmation allows the recipient to continue using the resulting VTXO inside the system, but it carries operator or signer integrity assumptions until the state is settled into a confirmed batch.

This is different from the earliest Ark descriptions of out-of-round, or arkoor, transfers. Earlier constructions often emphasized a sender and server non-collusion assumption for transfers between rounds. Current Arkade uses a broader preconfirmation and virtual-mempool model with a separated signer architecture. The security claims of one model should not be copied onto the other without version-specific evidence.

### Cooperative spending is the normal path

A VTXO normally includes a cooperative path requiring the user and the Arkade signing system to authorize the spend. This path supports off-chain transfers, batch swaps, collaborative exits, and other normal operations.

The operator coordinates transaction flow and may enforce amount limits, fees, timing rules, and service policy. The signer may be a separate component with its own key protection and attestation design. These separations can reduce some operator powers, but they remain implementation-specific security mechanisms rather than Bitcoin consensus guarantees.

If the operator or required signer service is unavailable, cooperative activity can stop even when users still possess unilateral exit data. That is operator liveness risk without necessarily being operator custody.

### Collaborative exits return value efficiently

A collaborative exit converts VTXOs into ordinary Bitcoin outputs with operator participation.

The user specifies an on-chain destination, and the operator includes the exit in a commitment transaction or related settlement batch. Multiple users can be handled together, reducing repeated overhead compared with separate unilateral exits.

A collaborative exit depends on operator availability, liquidity, service policy, and successful Bitcoin confirmation. It can be cheaper or simpler than a unilateral exit, but it can also be delayed, refused, or unavailable.

The output becomes an ordinary Bitcoin UTXO only when the relevant transaction is valid and reaches the confirmation depth the user requires.

### Unilateral exits are enforceable but operationally demanding

A unilateral exit allows a VTXO holder to publish the presigned transaction path from the confirmed batch output toward an individually spendable on-chain output without operator cooperation.

The user may need to broadcast several transactions in sequence. Relative timelocks can require confirmation and waiting between steps. Each transaction needs fees, and the wallet may need separate on-chain funds to fee-bump or sponsor the exit. Bitcoin relay policy, package limits, congestion, and reorganizations can affect execution.

A cryptographically available exit is therefore not necessarily easy, instant, cheap, or guaranteed to confirm on a preferred schedule. A small VTXO can become uneconomical to exit when fees are high or the transaction chain is deep.

The operator cannot alter a user's already valid presigned exit transaction at will. However, the user must actually possess the correct transaction chain, signatures, metadata, and keys before trouble begins.

### Batch expiry creates user liveness requirements

Batch outputs expire under defined timelocks. Before expiry, VTXO holders must renew through a batch swap or begin an enforceable exit if they want to preserve unilateral control. An ordinary off-chain transfer does not by itself guarantee a fresh expiry window; the resulting VTXO's settlement and expiry context must still be checked.

In the current Arkade terminology, renewal is performed through a batch swap. The old VTXOs are exchanged for fresh VTXOs in a new batch, resetting the expiry window and, when confirmed, refreshing their Bitcoin settlement anchor.

Wallet automation can monitor expiry and submit renewals. Intent delegation can let a third party submit a presigned renewal request without receiving unrestricted control over the funds. These tools reduce manual burden, but they do not erase the timing assumption. Software, connectivity, operator service, and the delegated workflow must still function before the deadline.

Older Ark material may call the same broad maintenance process refresh, rollover, or round participation. Those terms are useful historical context, but the current maintained Arkade design uses renewal and batch swap as the primary terms.

### Expiry changes the user's rights

After batch expiry, the operator gains a valid sweep path for the remaining value in the batch output. A user who allowed a VTXO to expire without renewing or exiting loses the prior unilateral claim against that batch.

Current Arkade wallet and SDK documentation describes a cooperative recovery mechanism for VTXOs that have expired and been swept. The operator can include recoverable value in a later batch and return a new VTXO to the wallet.

That recovery is an implementation-supported service path, not the same as an enforceable unilateral right after expiry. It depends on operator policy, records, software behavior, liquidity, and continued service. The operator's ability to sweep an expired batch is also not equivalent to theft of an unexpired VTXO whose valid exit conditions remain enforceable.

This is one of Ark's most important operational boundaries: expiry creates a real user-liveness obligation.

### Operator liquidity and capital matter

The operator builds commitment transactions and commonly provides liquidity while old batch outputs remain locked until expiry or settlement.

That capital can be tied up across overlapping batches. Batch size, frequency, expiry length, user demand, collaborative exits, and recovery obligations all affect the operator's liquidity needs.

Insufficient liquidity can delay settlement, reduce accepted amounts, increase fees, or make ordinary cooperative service unavailable. The user may still have an exit path, but operational dependence can become visible precisely when service conditions deteriorate.

Operator dependence is not automatically operator custody. It means ordinary usability, settlement coordination, and capital-efficient operation rely on infrastructure the user does not fully control.

### Data availability and backups affect enforceable recovery

A seed phrase may recover keys, but keys alone may not reconstruct every VTXO transaction chain.

A wallet needs enough information to identify current VTXOs, verify their origin, know their expiry, obtain the presigned transactions needed for an exit, and track whether they were replaced, settled, swept, or recovered. The exact backup format is implementation-specific.

The current Arkade indexer can provide commitment, VTXO-tree, virtual-transaction, connector, and sweep information. Depending only on one operator's indexer creates an availability risk. A robust wallet should preserve necessary local data and verify remote responses.

Data loss can turn a cryptographic right into an unusable one. Backup and recovery claims should therefore identify whether they restore keys only, complete exit data, transaction history, or merely operator-assisted account information.

### Fees and block-space use have normal and worst cases

Ark can compress many users into one commitment transaction and one shared batch output. Cooperative operation can reduce average on-chain overhead per user.

That efficiency does not eliminate Bitcoin fees. Boarding, commitment transactions, collaborative exits, unilateral unrolling, sweeps, and recovery all consume block space. The operator may also charge coordination, liquidity, or service fees.

Worst-case costs differ from ordinary costs. A mass exit can require many users to publish several transactions while competing for the same block space. Longer VTXO chains and deeper tree positions can increase exit cost.

Claims about low fees or constant-sized batch commitments must not be mistaken for a guarantee that every user exit has constant, negligible, or predictable cost.

### Security depends on several distinct assumptions

Bitcoin consensus protects only the on-chain transactions that nodes validate. Ark adds off-chain transaction data, operator coordination, signer behavior, liveness windows, and data storage.

For a settled, unexpired VTXO, the user relies on correct presigned transactions, enforceable scripts, sufficient data, timely action, and Bitcoin block space. For a preconfirmed VTXO, the user also relies on the operator or signer not authorizing conflicting ownership chains before settlement.

Current Arkade documentation describes a separated signer, trusted execution environments, remote attestation, encrypted communication, and detection of conflicting signatures. These features aim to constrain or expose double-signing and transaction-level censorship. They introduce hardware, software, deployment, and attestation assumptions and should not be presented as universal properties of every Ark protocol or operator.

No design eliminates availability risk, signer compromise, software bugs, malicious policy, or mass-exit pressure.

### Ark and Lightning use different state models

Lightning uses bilateral channels. Each channel has a fixed capacity divided into local and remote balances. Routed payments move value through multiple channels using directional liquidity, onion routing, and conditional HTLC behavior.

Ark uses shared batch outputs and VTXOs coordinated by an operator. Transfers do not require a routed path through bilateral channels. Liquidity is concentrated differently: the operator needs capital for batches and settlement, while users need timely renewal and complete exit data.

Lightning users monitor revocable channel state and may use watchtowers for breach response. Ark users monitor VTXO expiry and may delegate renewal intents. These are not interchangeable monitoring problems.

Both systems rely on enforceable Bitcoin transactions. Neither is a separate coin or proof-of-work chain. Their coordination, liquidity, privacy, failure, and exit models remain distinct.

### Privacy and censorship claims need implementation evidence

Ark can reduce the number of user actions visible as separate Bitcoin transactions in cooperative operation. Shared outputs and off-chain transfers can obscure some relationships from public chain observers.

The operator, signer, indexer, wallet provider, network observers, or swap service may still learn transaction metadata. A unilateral exit reveals the relevant transaction path. Recovery and account-like services can create additional linkability.

Likewise, an operator may be unable to steal an unexpired enforceable output but still refuse batch participation, withhold cooperative exits, impose limits, or stop serving data. A separated encrypted signer may reduce transaction-level censorship in one deployment without removing all service-level censorship.

Privacy and censorship resistance are properties of a complete implementation and threat model, not automatic consequences of using Ark.

### Current maturity remains experimental

As of July 19, 2026, the maintained Arkade server implementation is `arkd`. Its repository labels the software alpha, experimental, under active development, and unsuitable for production use. The latest listed release is v0.9.6, published May 26, 2026.

The maintained TypeScript client is the Arkade SDK, and Arkade Wallet is a separate progressive web application built with the protocol and SDK. Documentation covers mainnet configuration, batch settlement, VTXO recovery, unilateral exits, and delegated renewal, but documented availability does not prove uniform deployment, completed audit coverage, or mature operational reliability.

Independent formal research published in May 2026 analyzes an Ark protocol model and reports disclosed implementation attacks that were addressed. That is meaningful evidence, but it does not make every later implementation, optional feature, signer deployment, wallet, or operator equivalent to the analyzed model.

Open questions include mass-exit fee behavior, backup portability, recovery guarantees, operator and signer decentralization, cross-operator transfers, client interoperability, liquidity under stress, mobile liveness, policy compatibility, and long-term security review.

The appropriate maturity label for this guide is alpha and experimental, not universally production-ready.

## 3. Key Terms

- **Ark:** An off-chain Bitcoin protocol that organizes shared UTXO structures and operator-coordinated transactions.
- **VTXO:** A virtual transaction output used in Ark-style off-chain constructions.
- **Batch output:** A single Bitcoin output that consolidates multiple user claims through a presigned virtual transaction tree.
- **Commitment transaction:** An on-chain Bitcoin transaction that creates and anchors a batch output and related settlement data.
- **Ark operator:** The service role that coordinates off-chain activity, constructs batches, supplies liquidity, and broadcasts commitment transactions.
- **Boarding:** The process of moving an ordinary Bitcoin UTXO into an Ark transaction structure and receiving a VTXO.
- **Collaborative exit:** An operator-assisted conversion of one or more VTXOs into ordinary on-chain Bitcoin outputs.
- **Unilateral exit:** A user-initiated broadcast path that converts a VTXO into an on-chain output without operator cooperation.
- **Batch expiry:** The timeout after which the operator can use the batch output's sweep path.
- **Renewal:** A batch swap that replaces existing VTXOs with fresh VTXOs and a new expiry window.
- **Operator liveness:** The availability required from the operator for cooperative transfers, batches, renewals, and exits.
- **User liveness:** The requirement that a user or delegated service act before expiry to retain enforceable unilateral rights.
- **Liquidity:** Bitcoin capital available to support batches, settlement, exits, and service obligations.
- **Presigned transaction:** A validly signed Bitcoin transaction prepared before broadcast so it can enforce a later protocol outcome.
- **UTXO:** An unspent transaction output that can be used as an input in a later transaction.
- **Consensus:** The shared validation rules independently enforced by Bitcoin nodes.

## 4. Sources

1. **Technical Primer** | Arkade OS contributors
   - URL: https://docs.arkadeos.com/primer
   - Supports: Current Arkade architecture, VTXOs, virtual execution, batch settlement, expiry, renewal, operator coordination, and the project's current implementation terminology.
2. **What Are VTXOs?** | Arkade OS contributors
   - URL: https://docs.arkadeos.com/learn/faq/what-are-vtxos
   - Supports: VTXOs as outputs of presigned Bitcoin transactions, preconfirmed, settled, and expired states, and collaborative and unilateral spending paths.
3. **Batch Outputs** | Arkade OS contributors
   - URL: https://docs.arkadeos.com/learn/pillars/batch-outputs
   - Supports: Batch-output scripts, virtual transaction trees, selective unrolling, operator sweep paths, MuSig2 coordination, and user-specific VTXO leaves.
4. **Onchain Settlement** | Arkade OS contributors
   - URL: https://docs.arkadeos.com/arkd/transactions/onchain-settlement
   - Supports: Current intent registration, commitment construction, connector outputs, tree signing, forfeit transactions, batch swaps, renewal, and broadcast workflow.
5. **Settlement and Finality** | Arkade OS contributors
   - URL: https://docs.arkadeos.com/learn/core-concepts/settlement-and-finality
   - Supports: The distinction between preconfirmation and Bitcoin settlement, batch swaps, renewal, exit-cost management, and commitment-transaction finality.
6. **VTXO Lifecycle and Liveness** | Arkade OS contributors
   - URL: https://docs.arkadeos.com/learn/core-concepts/vtxo-lifecycle-and-liveness#batch-expiry
   - Supports: Batch expiry, operator sweep authority, user and operator liveness, renewal timing, delegation, and loss of unilateral rights after expiry.
7. **VTXO Management** | Arkade OS contributors
   - URL: https://docs.arkadeos.com/wallets/advanced/vtxo-management
   - Supports: Implemented SDK renewal, expiry monitoring, recoverable balance, cooperative recovery of swept VTXOs, and current settlement configuration.
8. **Exiting Arkade** | Arkade OS contributors
   - URL: https://docs.arkadeos.com/arkd/transactions/exiting-arkade
   - Supports: Collaborative exits, force redemption, operator parameters, unilateral unrolling, exit delays, and the distinction between Arkade VTXOs and ordinary Bitcoin UTXOs.
9. **Security and Trust Model** | Arkade OS contributors
   - URL: https://docs.arkadeos.com/learn/core-concepts/security-and-trust-model
   - Supports: Presigned exit paths, mass-exit costs, signer separation, trusted execution environments, attestation, compromise risks, and implementation-specific security claims.
10. **Boarding Arkade** | Arkade OS contributors
    - URL: https://docs.arkadeos.com/arkd/transactions/boarding-arkade
    - Supports: Current boarding-address script paths, on-chain funding, intent registration, MuSig2 participation, forfeit-transaction submission, and conversion of boarding inputs into VTXOs through a commitment transaction.
11. **arkd Repository and Release History** | Arkade OS contributors
    - URL: https://github.com/arkade-os/arkd
    - Supports: The maintained Arkade server implementation, operator responsibilities, mainnet support, latest listed v0.9.6 release dated May 26, 2026, and the explicit alpha and experimental maturity warning.
12. **Arkade TypeScript SDK Repository** | Arkade OS contributors
    - URL: https://github.com/arkade-os/ts-sdk
    - Supports: The maintained client SDK, wallet and settlement interfaces, package structure, release process, VTXO handling, and delegated or automated client workflows.
13. **Arkade Wallet Repository** | Arkade OS contributors
    - URL: https://github.com/arkade-os/wallet
    - Supports: The separate Arkade Wallet product, operator configuration, client behavior, wallet integration, and the boundary between protocol, SDK, and end-user application.
14. **Original Ark Proposal** | Burak
    - URL: https://lists.linuxfoundation.org/pipermail/bitcoin-dev/2023-May/021694.html
    - Supports: Historical Ark motivation, early ASP, round, VTXO, and out-of-round terminology, used only to distinguish the original proposal from the current maintained Arkade design.
15. **Ark: Offchain Transaction Batching in Bitcoin** | Pim Keer, Ioannis Alexopoulos, Matteo Maffei, Marco Argentieri, Andrew Camilleri, and Zeta Avarikioti
    - URL: https://arxiv.org/abs/2605.20952
    - Supports: Independent May 2026 formal protocol analysis, operator model, VTXO security, disclosed implementation attacks, fixes, batch footprint, and cooperative and unilateral exit cost findings.
16. **BIP 68: Relative Lock-Time Using Consensus-Enforced Sequence Numbers** | Mark Friedenbach, BtcDrak, Nicolas Dorier, and kinoshitajona
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0068.mediawiki
    - Supports: Relative locktime semantics used to explain delayed Bitcoin spending paths and why unilateral exits can require confirmed waiting periods.
17. **BIP 112: CHECKSEQUENCEVERIFY** | BtcDrak, Mark Friedenbach, and Eric Lombrozo
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0112.mediawiki
    - Supports: Script-enforced relative-delay behavior relevant to Arkade exit, boarding, and sweep paths.

## 5. SEO title

What Is Ark on Bitcoin? VTXOs, Batches, and Exits

## 6. Meta description

Learn how Ark and Arkade use VTXOs, batch outputs, commitment transactions, renewal, operator liquidity, and unilateral Bitcoin exits.

## 7. Page excerpt

Ark coordinates VTXOs through shared Bitcoin batch outputs, but its off-chain efficiency depends on operator service, liquidity, complete exit data, and action before expiry.

## 8. Estimated reading time

20 to 24 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-033 | How the Lightning Network Works
- Next: MSC-GUIDE-035 | How RGB Works on Bitcoin
- Prerequisite: MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
- Prerequisite: MSC-GUIDE-033 | How the Lightning Network Works
- Branch: MSC-GUIDE-033 | How the Lightning Network Works
- Return: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

All planned links remain inactive until each destination has a confirmed published URL.

## 10. Accuracy review checklist

- [x] Registry metadata matches MSC-GUIDE-034 and the approved Layer 2 taxonomy.
- [x] Ark, Arkade, Arkade Operator, `arkd`, the SDK, the wallet, and older proposals remain distinct.
- [x] VTXOs, batch outputs, commitment transactions, batch swaps, renewal, exits, expiry, sweep, and recovery are separated.
- [x] Preconfirmation is not described as Bitcoin confirmation or universal finality.
- [x] Operator dependence is not equated automatically with operator custody.
- [x] Unilateral exit is not described as instant, free, simple, or guaranteed to confirm on schedule.
- [x] Recovery after expiry is identified as implementation-supported and cooperative rather than an unconditional unilateral right.
- [x] Current alpha maturity is dated and tied to the maintained `arkd` implementation.
- [x] Lightning and Ark are compared without treating their state or liquidity models as interchangeable.
- [x] External URLs appear only in Sources, and planned internal links remain inactive.
- [x] No investment advice, price claims, wallet recommendation, or guarantee is included.

## 11. Human verification

- Reviewer:
- Review date:
- Notes: Pending review should verify current Arkade protocol terminology, `arkd` v0.9.6 alpha maturity, preconfirmation and settlement boundaries, expiry and recovery behavior, operator and signer assumptions, and the separation between current implementation features and older Ark proposals.

## 12. Illustration brief

### Illustration 1

- Concept title: VTXO Tree Beneath a Batch Anchor
- Educational purpose: Show how one confirmed commitment transaction and batch output can support several user VTXOs through presigned virtual transactions.
- Recommended placement: After the section Commitment transactions create batch outputs.
- Visual description: Vintage harbor engineering chart with one Bitcoin commitment vessel anchoring a batch-output platform. A branching submerged transaction tree divides into four labeled VTXO berths without depicting the operator as owner of every berth.
- Required labels: Commitment transaction, Batch output, Virtual transaction tree, Presigned transactions, VTXO A, VTXO B, VTXO C, VTXO D, Sweep path, Unroll path
- Caption: A batch output anchors a presigned transaction tree whose leaves represent individual VTXOs.
- Alt text: Technical nautical diagram showing a Bitcoin commitment transaction, shared batch output, branching virtual transaction tree, and four user VTXOs.
- Image orientation: Landscape
- Mobile crop notes: Keep the commitment anchor centered above two tree levels and stack the four VTXO leaves in two rows.
- Status: PLANNED

### Illustration 2

- Concept title: Cooperative Route and Unilateral Exit Route
- Educational purpose: Separate normal operator-assisted transfers and exits from the slower Bitcoin enforcement path available without operator cooperation.
- Recommended placement: After the section Unilateral exits are enforceable but operationally demanding.
- Visual description: Split cartographic route from one VTXO harbor. The upper route passes through an operator coordination station to a new VTXO or collaborative Bitcoin output. The lower route descends through several presigned transactions, confirmation gates, and a timelock before reaching a user-controlled UTXO.
- Required labels: VTXO, Cooperative path, Arkade Operator, New VTXO, Collaborative exit, Unilateral path, Broadcast, Confirmation, Exit delay, Bitcoin UTXO, Miner fees
- Caption: The cooperative path is simpler when service is available, while the unilateral path preserves enforcement through a longer on-chain process.
- Alt text: Split technical map comparing an operator-assisted Ark transfer or exit with a multi-step unilateral Bitcoin exit.
- Image orientation: Landscape
- Mobile crop notes: Stack the cooperative route above the unilateral route and keep each route readable as a separate horizontal band.
- Status: PLANNED

### Illustration 3

- Concept title: Expiry, Renewal, Sweep, and Recovery Timeline
- Educational purpose: Explain the user-liveness deadline and distinguish renewal before expiry from operator sweep and cooperative recovery afterward.
- Recommended placement: After the section Expiry changes the user's rights.
- Visual description: Vintage tide and lighthouse timeline. Before the marked expiry tide, a VTXO can enter a batch-swap renewal channel or begin an exit. After the deadline, an operator sweep route opens. A separate dashed recovery route returns value through a later batch but is clearly marked cooperative and implementation-supported.
- Required labels: Active VTXO, Renewal window, Delegated intent, Batch swap, Unilateral exit start, Batch expiry, Operator sweep path, Expired VTXO, Cooperative recovery, New VTXO, Unilateral right lost after expiry
- Caption: Renewal or exit preserves enforceable rights before expiry; recovery after an operator sweep is a separate cooperative workflow.
- Alt text: Nautical lifecycle timeline showing VTXO renewal and exit before expiry, operator sweep after expiry, and a separate cooperative recovery path.
- Image orientation: Landscape
- Mobile crop notes: Use a vertical timeline with the expiry marker centered and recovery shown as a clearly separate branch below it.
- Status: PLANNED
