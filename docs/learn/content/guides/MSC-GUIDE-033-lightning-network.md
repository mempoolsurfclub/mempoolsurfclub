---
registry_id: MSC-GUIDE-033
status: COPY_LOCKED
page_role: topic-guide
h1: How the Lightning Network Works
handle: lightning-network
category: Building on Bitcoin
subcategory: Layer 2
depth: Shallow
format: Explainer
primary_path: Build on Bitcoin
secondary_paths:
  - Understand the Network
author_display: Mempool Surf Club Editorial
reviewed_date: 2026-07-22
copy_locked_date: 2026-07-22
---

# How the Lightning Network Works

## 1. Introductory deck

Lightning moves bitcoin through bilateral payment channels anchored to enforceable Bitcoin transactions. Learn how channel states, routed HTLC payments, onion routing, liquidity, fees, custody arrangements, privacy limits, and on-chain settlement fit together without treating fast payments, privacy, or self-custody as guarantees.

## 2. Full article

Lightning is a protocol for moving bitcoin through a network of bilateral payment channels. It does not create a separate coin or a separate proof-of-work blockchain. Instead, it uses Bitcoin transactions to lock funds into channel structures, then lets channel participants update how those funds could be settled without publishing every update to the Bitcoin blockchain.

### Why Lightning exists

Bitcoin block space is limited and globally replicated. Every confirmed on-chain transaction must be validated by nodes and included in a block. That design supports independent verification, but it also means that frequent small payments compete for the same block space as other transactions.

Lightning changes the payment workflow. Two parties can create one on-chain funding transaction, exchange many off-chain state updates, and later close the channel with another on-chain transaction. When payments cross several channels, the participants can transfer value without each pair needing a direct channel.

This can reduce routine on-chain use and shorten the time between payment initiation and an off-chain result. It does not eliminate Bitcoin fees, confirmation risk, channel management, or the possibility that a payment fails.

### A channel is anchored to Bitcoin

A Lightning channel begins with a Bitcoin funding output. In the common design, that output can be spent only under the channel's agreed transaction and signature rules. The funding transaction must reach the confirmation state required by the participants or their software before the channel is treated as usable.

The amount locked into the funding output limits the channel's total capacity. Capacity is not the same as either participant's spendable balance. If Alice and Bob open a channel with 1,000,000 satoshis, the local and remote balances describe how that capacity is currently allocated from one participant's viewpoint.

A channel balance is not a global account balance stored by the Lightning Network. It is a local interpretation of the latest enforceable channel state held by the two channel peers.

### Commitment states update the allocation

Each participant holds a commitment transaction representing a current settlement state. As the channel balance changes, the peers exchange messages and signatures that make a newer state enforceable and make an older state unsafe to publish.

In the traditional penalty-based channel design described by the BOLT specifications, old commitment states can be punished if broadcast. Revocation secrets allow the honest peer to claim funds from a revoked state during a defined contest window. This is why channel software must preserve current state and respond to chain events.

The exact transaction format can vary with negotiated features and implementation support. Proposed channel types, including designs that change how old states are invalidated, should not be treated as universally deployed.

### Cooperative and unilateral closes

A cooperative close happens when both peers agree on a final allocation and sign a closing transaction. It can usually avoid the delay and extra script paths associated with a disputed close.

A unilateral close happens when one peer publishes an enforceable commitment transaction without the other's cooperation. This may be necessary when a peer is offline, unresponsive, or disputed. The resulting outputs can have time delays and additional on-chain transactions. The user must account for Bitcoin fees and confirmation uncertainty.

A unilateral close is not a protocol failure. It is part of the enforcement model. Off-chain updates remain credible because either participant can ultimately use Bitcoin transactions and script conditions to settle.

### Routed payments connect channels

A payer does not need a direct channel with the recipient. A payment can travel through a sequence of channels. The sender or sender's software selects one or more candidate paths using known public channel information, private channel hints, local observations, and prior failures.

Suppose Alice has a channel with Bob, Bob has a channel with Carol, and Carol has a channel with Dana. Alice can attempt to pay Dana through Bob and Carol. The intermediaries forward conditional transfers rather than trusting Alice or Dana.

Public gossip can describe channels, advertised capacities, fee policies, and time-lock parameters. It cannot reveal exact usable liquidity in each direction. A public channel may have enough total capacity but insufficient outbound balance for the attempted direction.

### Onion routing limits what intermediaries learn

Lightning uses onion routing so each forwarding node learns the instructions needed for its own hop rather than the complete route. The sender constructs an encrypted packet whose layers are removed one at a time.

An intermediary can generally identify the peer from which it received a forwarding request and the peer to which it should forward. It does not automatically learn the full route. However, privacy is not absolute. Timing, amounts, network topology, repeated attempts, route position, wallet behavior, and observation by coordinated parties can reveal information.

A custodial provider may also know more about a payment because it controls the user's account and payment execution.

### HTLCs make forwarding atomic

Hashed Time Locked Contracts, or HTLCs, coordinate conditional payments across channels. The recipient releases a preimage whose hash matches the payment hash. Each forwarding node receives that preimage from its outgoing peer, uses it to fulfill the corresponding incoming HTLC from its upstream peer, and relays the fulfillment upstream.

If a route fails before fulfillment, nodes can return failure messages and remove the HTLCs through off-chain state updates. If an HTLC remains unresolved, staggered time locks provide timeout paths and enough margin for intermediaries to act on-chain when necessary.

The intended result is atomic payment behavior across the route: the payment settles through the path, or the linked conditional transfers are removed or timed out. Failure handling is not always immediate, and on-chain resolution can take longer when a channel closes.

Newer payment constructions may change some details, but an educational model should not assume they are universally supported.

### Invoices and payment requests

A Lightning invoice is a payment request that can include a destination, payment hash, amount, expiry, description information, feature bits, and routing hints. BOLT 11 defines the widely used invoice format. BOLT 12 defines a separate negotiation flow using offers, invoice requests, and invoices. Wallet and implementation support must be checked rather than assumed.

An invoice is not proof that the recipient is trustworthy. It is structured payment data. Wallet software must validate the invoice, supported features, expiry, amount, and network before attempting payment.

Some payments use spontaneous or keysend-style behavior supported by particular implementations. That is not a substitute for describing the standard invoice workflow.

### Routing fees

Forwarding nodes can advertise a base fee and a proportional fee. They may also set minimum and maximum HTLC values and a required time-lock delta. The sender estimates the total route cost from these policies.

Lightning fees are not universally zero. A payment may also create indirect costs from channel opening, closing, rebalancing, swaps, service charges, or failed attempts. Fee policy can change, and an advertised fee does not guarantee that the route has liquidity.

### Inbound and outbound liquidity

Outbound liquidity is the amount a node can send from its side of channels, subject to reserves, pending HTLCs, fees, and implementation rules. Inbound liquidity is the amount that remote channel balances can deliver toward the node.

Receiving bitcoin over Lightning often requires inbound liquidity. Opening a channel by funding it entirely from the user's wallet usually creates outbound liquidity first. Inbound liquidity can arise when the user spends through the channel, receives a channel opened by another party, uses a swap or liquidity service, or participates in another rebalancing arrangement.

Capacity does not reveal direction. A channel advertised as 2,000,000 satoshis may have almost all usable balance on one side.

### Pathfinding is uncertain

The sender constructs routes from incomplete information. Public gossip does not publish balances. Private channels may be disclosed only through invoice hints or other route information. Pending payments can temporarily reduce available liquidity.

A payment may fail because a channel lacks directional liquidity, a peer is offline, a fee changed, a time-lock condition is unacceptable, a channel update is stale, the recipient invoice expired, or an implementation rejected a feature.

Wallets may retry with another route, split a payment into parts, or ask for updated information. Fast payment interfaces do not guarantee successful payment. A successful payment also does not prove that every attempted route was private.

### On-chain enforcement connects Lightning to Bitcoin consensus

Lightning nodes enforce channel agreements by holding valid Bitcoin transactions, signatures, secrets, and timing information. If cooperation stops, a participant can publish a transaction and rely on Bitcoin nodes to validate it under Bitcoin consensus rules.

Bitcoin consensus does not validate the full history of ordinary Lightning state updates. It validates the funding, closing, and enforcement transactions that reach the blockchain. The Lightning protocol defines how peers create and update those possible Bitcoin spends.

This boundary matters. Lightning implementations can change routing, gossip, invoices, channel management, and user interfaces without changing Bitcoin consensus. A proposed Lightning feature that needs a new Bitcoin opcode or transaction behavior would require a separate Bitcoin upgrade process.

### Custody and service arrangements differ

A custodial Lightning wallet records a provider-managed account. The provider controls the relevant keys or channels and decides how payments are executed. The user depends on the provider's solvency, availability, policy, and withdrawal process.

A self-custodial Lightning arrangement gives the user control of the signing authority needed to enforce or recover channel funds without a provider's permission. Operations can still vary. The wallet may run a node on the device, connect to a user-controlled remote node, or use third parties for liquidity, swaps, routing data, encrypted backups, or infrastructure that does not take control of the user's signing authority. Provider-controlled accounts and hosted balances belong in the custodial category because the provider can control payment execution or withdrawal.

A Lightning node maintains channels and protocol state. A Lightning service provider may supply liquidity, routing, channel opening, node hosting, swaps, or payment processing. These roles should not be collapsed into one label.

A wallet interface alone does not prove self-custody. Users must examine who controls keys, who can close channels, where backups live, and which service can block or observe activity.

### Monitoring and watchtowers

Penalty-based channels require attention to the Bitcoin chain because an old commitment transaction could be published. A node can monitor directly or delegate limited detection and response data to a watchtower.

A watchtower is designed to help broadcast a remedy transaction when it detects a revoked state. The design can limit what the tower learns before a breach, but privacy and availability depend on the specific protocol and implementation.

Watchtowers do not remove the need for backups or guarantee recovery from every failure. Channel state loss, incompatible backups, fee conditions, data corruption, and unavailable services can still create risk.

### Practical privacy limits

Lightning avoids placing every payment on the public Bitcoin ledger, but off-chain does not mean invisible. Route participants see local information. Recipients learn payment details. Senders choose routes and may learn failure locations. Service providers can collect network and account metadata.

Channel openings and closes are on-chain and can sometimes be identified or correlated. Probing can estimate channel liquidity. Reused invoices, repeated amounts, IP exposure, and centralized service use can weaken privacy.

Privacy depends on implementation behavior, network position, wallet configuration, routing choices, and adversary capabilities. It should be treated as a set of tradeoffs rather than an automatic guarantee.

### The working model

Lightning is a network of bilateral Bitcoin channels. Channel peers update enforceable settlement states. Senders route conditional payments through channels using onion-encrypted instructions. HTLCs and timeouts coordinate atomic behavior. Liquidity direction and path uncertainty determine whether an attempted route works.

The system can make frequent payments without publishing every state update. It remains connected to Bitcoin through funding, closing, and enforcement transactions. That connection supplies the settlement boundary, while Lightning's own peer protocols govern the off-chain work.

## 3. Key Terms

- **Bitcoin:** An open monetary network and asset governed by independently verified consensus rules.
- **Layer 2:** A system built above Bitcoin that changes transaction flow or settlement while relying on Bitcoin in a defined way.
- **Lightning Network:** A payment-channel network that routes off-chain Bitcoin payments and settles channels on-chain.
- **Payment channel:** An off-chain relationship that lets parties update balances before final settlement on Bitcoin.
- **Channel capacity:** The bitcoin amount committed to a channel, distinct from the directional balance currently available to either side.
- **Commitment transaction:** A Bitcoin transaction representing an enforceable channel settlement state.
- **HTLC:** A conditional transfer using a payment hash and timeout to coordinate atomic forwarding.
- **Onion routing:** Layered encryption that gives each forwarding node only the instructions needed for its hop.
- **Inbound liquidity:** Channel balance available for receiving toward a node.
- **Outbound liquidity:** Channel balance available for sending away from a node.
- **Watchtower:** A service that can monitor for revoked channel states and publish a remedy transaction under a supported channel design.

## 4. Sources

1. **BOLT #0: Introduction and Index** | Lightning specification contributors
   - URL: https://github.com/lightning/bolts/blob/master/00-introduction.md
   - Supports: Implementation-neutral definition of Lightning channels, forwarding, network topology, and invoices.
2. **BOLT #2: Peer Protocol for Channel Management** | Lightning specification contributors
   - URL: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md
   - Supports: Channel establishment, commitment updates, HTLC forwarding, fee and timeout handling, and cooperative closing.
3. **BOLT #3: Bitcoin Transaction and Script Formats** | Lightning specification contributors
   - URL: https://github.com/lightning/bolts/blob/master/03-transactions.md
   - Supports: Funding outputs, commitment transactions, revocation, HTLC outputs, and unilateral close enforcement.
4. **BOLT #4: Onion Routing Protocol** | Lightning specification contributors
   - URL: https://github.com/lightning/bolts/blob/master/04-onion-routing.md
   - Supports: Sender-constructed onion packets, per-hop payloads, and failure messages.
5. **BOLT #5: Recommendations for On-chain Transaction Handling** | Lightning specification contributors
   - URL: https://github.com/lightning/bolts/blob/master/05-onchain.md
   - Supports: On-chain monitoring, close handling, and transaction response behavior.
6. **BOLT #7: P2P Node and Channel Discovery** | Lightning specification contributors
   - URL: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md
   - Supports: Public channel announcements, fee policies, topology discovery, and limits of gossip data.
7. **BOLT #11: Invoice Protocol for Lightning Payments** | Lightning specification contributors
   - URL: https://github.com/lightning/bolts/blob/master/11-payment-encoding.md
   - Supports: Invoice fields, expiry, payment hashes, routing hints, and feature signaling.
8. **BOLT #12: Negotiation Protocol for Lightning Payments** | Lightning specification contributors
   - URL: https://github.com/lightning/bolts/blob/master/12-offer-encoding.md
   - Supports: The offer, invoice-request, and invoice negotiation flow without implying universal implementation or wallet support.
9. **The Bitcoin Lightning Network: Scalable Off-Chain Instant Payments** | Joseph Poon and Thaddeus Dryja
   - URL: https://lightning.network/lightning-network-paper.pdf
   - Supports: Original payment-channel network design, hashed timelock contracts, routing, and Bitcoin enforcement.
10. **Lightning Network Daemon Repository** | Lightning Labs
    - URL: https://github.com/lightningnetwork/lnd
    - Supports: A current major implementation and evidence that wallet, node, watchtower, routing, and channel features are implementation-specific.
11. **Core Lightning Repository** | Blockstream and Core Lightning contributors
    - URL: https://github.com/ElementsProject/lightning
    - Supports: A separate interoperable implementation and implementation-specific operational behavior.
12. **LDK Documentation** | Spiral
    - URL: https://lightningdevkit.org/
    - Supports: Modular Lightning integration, custody boundaries, channel management, routing, and wallet responsibility.
13. **Bitcoin Core v31.0 Source Tree** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/tree/v31.0/src
    - Supports: One current Bitcoin Core implementation's validation of Bitcoin transactions and scripts that Lightning funding, closing, and enforcement transactions must satisfy. This is implementation evidence, not a definition of the Bitcoin protocol.

## 5. SEO title

How the Lightning Network Works | Mempool Surf Club

## 6. Meta description

Learn how Lightning payment channels, HTLC routing, liquidity, fees, custody, privacy limits, and Bitcoin settlement work together.

## 7. Page excerpt

Build a working model of Lightning as a network of bilateral Bitcoin payment channels, from funding and commitment states to routed payments and on-chain enforcement.

## 8. Estimated reading time

14 to 17 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-032 | How Bitcoin Network Upgrades Happen
- Next: MSC-GUIDE-034 | What Is Ark on Bitcoin?
- Prerequisite: MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- Prerequisite: MSC-GUIDE-014 | How Bitcoin Confirmations Work
- Branch: MSC-GUIDE-042 | How Bitcoin Wallet Integrations Work
- Return: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] Registry metadata matches the approved registry.
- [x] Claims are sourced to primary or authoritative references.
- [x] Protocol design is separated from implementation behavior and proposed features.
- [x] No investment advice or universal wallet advice is included.
- [x] Internal links point only to real pages when activated.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-22
- Notes: Verified BOLT-aligned channel, HTLC, routing, liquidity, custody, privacy, and Bitcoin settlement boundaries against current primary and official sources. BOLT 11 and BOLT 12 remain distinct, implementation behavior is separated from protocol rules, and proposed features are not presented as universally deployed.

## 12. Illustration brief

### Illustration 1

- Concept title: Channel State Navigation Chart
- Educational purpose: Show how one funding output supports many off-chain balance updates and two closing paths.
- Recommended placement: After the section A channel is anchored to Bitcoin.
- Visual description: Vintage nautical ledger with one Bitcoin funding anchor, a sequence of signed state cards, and cooperative or unilateral channels returning to the chain.
- Required labels: Funding output, Channel capacity, Local balance, Remote balance, Commitment state, Cooperative close, Unilateral close
- Caption: A Lightning channel updates enforceable settlement states while only funding and closing transactions need to reach Bitcoin.
- Alt text: Technical chart showing a Bitcoin funding output, multiple Lightning commitment states, and cooperative or unilateral closing paths.
- Image orientation: Landscape
- Mobile crop notes: Stack the funding anchor, state cards, and two close routes vertically.
- Status: PLANNED

### Illustration 2

- Concept title: Onion Routed Payment Across Channels
- Educational purpose: Explain sender-selected paths, per-hop instructions, HTLC conditions, and decreasing timeouts.
- Recommended placement: After the section HTLCs make forwarding atomic.
- Visual description: Cartographic sea route through four channel ports. Each hop opens one onion layer and forwards a conditional payment with a shorter clock.
- Required labels: Sender, Forwarder 1, Forwarder 2, Recipient, Payment hash, Preimage, Timeout, Routing fee
- Caption: The sender builds a route and each forwarding node receives only its own conditional instructions.
- Alt text: Nautical route diagram of a Lightning payment moving through multiple channels with onion layers, HTLCs, fees, and decreasing timeouts.
- Image orientation: Landscape
- Mobile crop notes: Use one left-to-right route that can stack into four vertical ports.
- Status: PLANNED

### Illustration 3

- Concept title: Liquidity Is Directional
- Educational purpose: Separate channel capacity from inbound and outbound liquidity and show why routes can fail.
- Recommended placement: After the section Inbound and outbound liquidity.
- Visual description: Two connected reservoirs inside a channel hull, with directional gauges and several candidate routes marked available, uncertain, or failed.
- Required labels: Capacity, Outbound liquidity, Inbound liquidity, Reserve, Pending HTLC, Route attempt, Failure
- Caption: Public capacity does not reveal the exact directional liquidity available for a payment.
- Alt text: Technical liquidity diagram showing a Lightning channel's total capacity divided into inbound and outbound balances with uncertain route attempts.
- Image orientation: Landscape
- Mobile crop notes: Center the channel reservoir and place route outcomes below it.
- Status: PLANNED
