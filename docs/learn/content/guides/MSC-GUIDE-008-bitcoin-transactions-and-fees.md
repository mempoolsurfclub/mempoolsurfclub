---
registry_id: MSC-GUIDE-008
status: COPY_LOCKED
page_role: topic-guide
h1: How Bitcoin Transactions and Fees Work
handle: bitcoin-transactions-and-fees
category: Bitcoin Basics
subcategory: Using Bitcoin
depth: Shallow
format: Explainer
primary_path: Understand the Network
secondary_paths:
  - Start With Bitcoin
  - Use Bitcoin Safely
author_display: Mempool Surf Club Editorial
reviewed_date: 2026-07-17
copy_locked_date: 2026-07-17
---

# How Bitcoin Transactions and Fees Work

## 1. Introductory deck

A Bitcoin transaction spends existing outputs and creates new ones. Its on-chain fee is the difference between total input value and total output value, while its fee rate expresses how much it pays for the block space its data uses.

## 2. Full article

A Bitcoin transaction is not an instruction to subtract an amount from one account and add it to another.

It is a data structure that references existing unspent transaction outputs, satisfies their spending conditions, and creates new outputs. A wallet hides much of that structure behind a balance and send screen, but the underlying model explains change, fees, transaction size, mempool behavior, and confirmation.

This guide goes one level deeper than the sending walkthrough while staying below a protocol-level analysis.

### Transactions spend outputs

Every spend begins with one or more previously created outputs.

An unspent transaction output, or UTXO, contains value and a locking condition. It remains available until a later transaction uses it as an input and provides the data required to satisfy that condition.

An input identifies the previous transaction and output position being spent. The transaction also provides the unlocking data associated with that input, such as script data, signatures, or witness information, required for validation.

The input does not contain a mutable account balance. It consumes a specific output. That output cannot be partly spent and left in place. It is spent whole, and the new transaction creates replacement outputs.

This is why wallet coin selection matters. A wallet with a total balance of one million satoshis may hold that value in one UTXO, ten UTXOs, or hundreds of small UTXOs. Those arrangements can produce transactions with different sizes, fees, privacy characteristics, and spending flexibility.

### Outputs define new spending conditions

Each output assigns value to a new locking condition.

A common payment creates an output for the recipient. The condition is expressed in Bitcoin Script or a witness program and can later be satisfied by the appropriate key or keys.

A transaction can create several outputs. It may pay multiple recipients, return change to the sender, create an output for a service, or establish a more complex spending arrangement.

An address is a wallet-friendly destination representation used to construct a locking script. The address is not stored in every transaction as a universal account identifier, and it does not contain a balance. Wallets interpret scripts and related data to present addresses and ownership information to users.

### Change completes the transaction equation

Suppose a wallet selects a UTXO worth 150,000 satoshis to pay a recipient 100,000 satoshis.

The wallet cannot mark 100,000 satoshis as spent while leaving 50,000 satoshis inside the original UTXO. It must consume the full input and create new outputs.

A simplified transaction might create:

- A recipient output of 100,000 satoshis.
- A change output of 48,500 satoshis.
- A fee of 1,500 satoshis.

The fee is not an explicit output paid to a miner. It is the difference between total input value and total output value. A miner who includes the transaction can claim the available fees through the block's coinbase transaction under the applicable rules.

Wallets usually send change to a newly derived wallet-controlled destination. Poor change handling can affect privacy or recovery, which is one reason wallet metadata and script configuration matter.

### Amount and fee are separate concepts

The payment amount tells how much value is assigned to the recipient output. The fee tells how much input value is not assigned to ordinary outputs and is therefore available to the block producer.

The fee is not normally calculated as a percentage of the payment amount.

A transaction sending a large amount can be compact if it spends one input and creates two simple outputs. A transaction sending a small amount can be larger if it combines many inputs or uses more complex spending conditions.

Services may charge withdrawal, processing, exchange, or account fees in addition to the Bitcoin network fee. Those service charges are separate business decisions. A displayed service fee should not automatically be treated as the on-chain transaction fee.

### Weight and virtual size measure block-space use

Bitcoin limits block capacity using block weight.

Segregated Witness assigns different weight to base transaction data and witness data. A transaction's virtual size, commonly measured in virtual bytes or vbytes, converts weight into a more convenient unit for fee-rate discussion.

One virtual byte represents four weight units, with rounding applied when virtual size is calculated. A wallet commonly expresses a fee rate in satoshis per virtual byte, written sat/vB.

A transaction with a virtual size of 200 vbytes and a fee rate of 5 sat/vB would pay a 1,000-satoshi fee. This arithmetic is an example, not a fee recommendation.

Fee rate allows miners and wallets to compare transactions by the compensation offered for limited block space rather than by the value being transferred.

### What makes a transaction larger

The number and type of inputs and outputs affect transaction weight.

Each input must identify a previous output and provide the data needed to satisfy its spending condition. Each output contains value and a new locking condition. More inputs and outputs generally add more data.

Script type also matters. Legacy, SegWit, Taproot, single-key, and multisignature spends can have different data requirements. Witness data receives a different weight treatment from base data, but it still consumes block capacity.

A wallet combining many small UTXOs may create a larger transaction than a wallet spending one larger UTXO. A batch payment with several recipient outputs may use more total space but less space per payment than several separate transactions.

The wallet's displayed balance does not reveal these details by itself. Coin selection and transaction preview can provide more context.

### A fee estimate is a forecast

A wallet estimates fees by observing recent blocks, mempool conditions, historical confirmation behavior, node data, or external services.

The estimate attempts to answer a practical question: what fee rate may be competitive for a desired confirmation horizon?

It cannot guarantee the result.

New transactions can arrive after the estimate. Miners can use different selection policies. Blocks arrive at irregular intervals. A large block-space event can change competition quickly. The wallet's data source may see a different mempool from the miners who find the next blocks.

Fee estimation is therefore a forecast under uncertainty. A wallet may offer several targets, but labels such as fast, normal, or slow remain estimates rather than reservations.

Fixed fee-rate advice becomes stale because demand, policy, software, and transaction composition change.

### There is no single mempool

A mempool is a node's local collection of valid unconfirmed transactions eligible for relay or block inclusion.

Each node receives transactions at different times. Nodes can run different software versions, memory limits, minimum fee settings, relay configurations, and policy rules. They can also restart, evict transactions, or connect to different peers.

As a result, two nodes may hold different sets of unconfirmed transactions. A wallet or block explorer can report that a transaction is in its view of the mempool without proving that every miner or node has it.

During heavy demand, nodes may raise their effective minimum for retaining transactions as lower-fee entries are evicted. A transaction can remain valid under consensus while disappearing from some mempools.

The phrase "the mempool" is useful shorthand, but it should not imply one global waiting room.

### Consensus and policy answer different questions

Consensus rules determine whether nodes can accept a transaction inside a valid block.

Policy rules affect how a node handles an unconfirmed transaction before it is mined. Policy can govern standardness, relay, replacement, package acceptance, resource limits, and mempool behavior.

A nonstandard transaction may still be valid under consensus and potentially mineable, while many ordinary nodes decline to relay it. An invalid transaction cannot become valid merely because a miner prefers it or a service broadcasts it.

Bitcoin Core defaults influence a large part of the network, but node operators can configure software differently, and other implementations may use other policies. Current policy details should be verified against the software version and deployment being discussed.

Separating consensus from policy prevents two common mistakes: assuming every relayed transaction must be valid in every future context, and assuming every valid transaction will be relayed by every node.

### Miners choose candidate transactions

Miners assemble candidate blocks from transactions available to them.

Fee rate is important, but transaction selection is not a simple global auction with one visible queue. Miners may consider ancestor and descendant relationships, package economics, local policy, operational agreements, block construction software, and other constraints.

A low-fee parent may become attractive when paired with a high-fee child. A high-fee transaction may be temporarily unusable if it depends on missing data or conflicts with another transaction. A miner may receive a transaction directly even when some public nodes do not relay it.

A fee estimate tries to anticipate this environment. It does not command miners or purchase a fixed place in the next block.

### Transaction IDs need context

A transaction identifier, or txid, is derived from serialized transaction data.

Wallets and explorers use transaction IDs to identify and discuss transactions. They are useful references, but they are not human-readable payment receipts that explain intent, ownership, or final settlement by themselves.

For some non-SegWit spends, a third party can modify signature-related transaction serialization without invalidating the spend, changing the txid before confirmation. This property is known as transaction malleability.

For SegWit spends, witness data is excluded from the traditional txid calculation, which addresses the major form of third-party malleability affecting those spends. A separate witness transaction identifier, or wtxid, commits to the witness data. Other context still matters. A transaction can be replaced before confirmation, and a wallet may display a different identifier for a replacement.

For a Shallow-level mental model, treat the txid as an identifier for a particular serialized transaction form, not as proof that the payment is confirmed or final.

### Replace-by-fee changes an unconfirmed transaction

Replace-by-fee, or RBF, is a fee-management approach in which a new transaction conflicts with an unconfirmed transaction by spending one or more of the same inputs and offers a more attractive fee outcome under applicable policy.

A common wallet use is to recreate a payment with a higher fee while preserving the intended recipient amount. The replacement may also change other details, so users should review it as a new transaction.

Replacement depends on transaction construction, wallet support, node policy, miner behavior, fee rules, and the state of related transactions. BIP 125 documented an opt-in signaling model. Bitcoin Core 29.0 removed the previous full-RBF configuration option and made full replace-by-fee its standard policy, so BIP 125 signaling no longer determines replaceability for nodes using current Bitcoin Core defaults. Other node software, operator configurations, wallets, and miners may still behave differently.

RBF cannot replace a confirmed transaction. It also cannot guarantee that one particular version will be mined.

### Child-pays-for-parent changes package economics

Child-pays-for-parent, or CPFP, uses a new child transaction that spends an output from an unconfirmed parent.

If the child pays a sufficiently high fee, miners may evaluate the parent and child together and find the package attractive enough to include. The child does not alter the parent's fee. It changes the combined economics of mining both transactions.

CPFP requires an available output that the party can spend. The wallet must construct the child correctly. Nodes and miners must accept and evaluate the relevant package under their current policy.

This makes CPFP useful in some situations, including when the recipient controls an output from the parent. It is not a universal rescue. Package limits, conflicting transactions, pinning, wallet support, and relay paths can prevent the desired result.

### Pinning and policy limits matter

A transaction or package can sometimes be structured so that another party has difficulty fee-bumping or replacing it efficiently. This broad class of problems is called transaction pinning.

Pinning depends on the spending arrangement, replacement rules, package limits, and policy. It is particularly important for protocols where several parties share unconfirmed transaction relationships.

Ordinary wallet users do not need to master every pinning design, but the concept explains why RBF and CPFP should not be described as guaranteed fixes. The transaction graph and policy environment can constrain what a wallet can do.

Bitcoin Core policy continues to evolve around package relay, replacement, and cluster-based mempool management. Human review should verify current behavior before this guide is copy locked or substantially updated.

### Confirmation and finality are risk-based

A transaction receives its first confirmation when it is included in a valid block accepted by nodes.

A later block adds another confirmation and increases settlement depth. Replacing the confirmed history would require a competing valid chain with more accumulated proof of work.

One confirmation is not absolute finality. Recent blocks can be reorganized, especially near the chain tip. The practical risk generally decreases as more blocks build on top, but the appropriate response depends on the amount, transaction structure, counterparty, and consequence of reversal.

A low-value retail payment and a high-value irreversible delivery may use different acceptance standards. No universal confirmation count makes every payment equally safe.

Wallet labels such as completed or confirmed should be read as summaries of observed chain state, not as a guarantee that all risk has reached zero.

### A complete example

Consider a wallet with three UTXOs: 70,000, 50,000, and 20,000 satoshis. The user wants to pay 90,000 satoshis.

The wallet could select the 70,000 and 50,000 satoshi outputs as inputs. Their total input value is 120,000 satoshis.

It creates a 90,000-satoshi recipient output and a change output. After estimating the transaction's virtual size and choosing a fee rate, suppose the wallet assigns 28,800 satoshis to change and leaves 1,200 satoshis as the fee.

The transaction equation is:

120,000 satoshis in = 90,000 to the recipient + 28,800 in change + 1,200 in fees.

The wallet signs the inputs and broadcasts the transaction. Nodes independently check the signatures, referenced outputs, value rules, and other validity conditions. Nodes may then apply local policy before accepting the transaction into their mempools and relaying it.

Miners may evaluate its fee rate and transaction relationships. If a miner includes it in a valid block, the transaction receives one confirmation.

If it remains unconfirmed, the wallet may offer RBF or CPFP depending on the transaction and software. Neither option guarantees immediate inclusion.

The example shows why payment amount, fee, fee rate, UTXO selection, and confirmation are related but separate concepts.

### Where to continue

This guide provides the working structure behind everyday wallet activity.

What Happens Inside the Bitcoin Mempool? goes deeper into node-local transaction storage, eviction, relay policy, conflicts, and fee competition.

How a Bitcoin Transaction Moves will connect wallet construction, UTXO selection, signing, relay, mempools, mining, block inclusion, confirmation, and settlement depth in one route.

The next canonical guide, What Is a Bitcoin Seed Phrase?, shifts from transaction mechanics back to wallet recovery and security.

## 3. Key Terms

**Transaction:** A data structure that spends existing UTXOs and creates new outputs.

**Input:** A transaction field that spends a previous UTXO and supplies unlocking data.

**Output:** A transaction field that assigns value to a new locking condition.

**Change output:** A transaction output that returns unspent input value to a wallet-controlled destination.

**UTXO:** An unspent transaction output that can be used as an input in a later transaction.

**Fee rate:** The amount paid per unit of transaction weight or virtual size to compete for block space.

**Mempool:** A node's local collection of valid unconfirmed transactions eligible for relay or block inclusion.

**Policy:** Local software rules that influence transaction relay, mempool acceptance, or default behavior without changing consensus validity.

**Standardness:** Node policy rules used for transaction relay and mining defaults that are separate from consensus validity.

**Confirmation:** The inclusion of a transaction in a block, followed by additional blocks that increase settlement depth.

## 4. Sources

### Bitcoin: A Peer-to-Peer Electronic Cash System

- Author or publisher: Satoshi Nakamoto
- Direct URL: https://bitcoin.org/bitcoin.pdf
- Supports: The input-and-output transaction model, transaction fees as input value not assigned to outputs, public transaction ordering, and proof-of-work confirmation context.

### Bitcoin Developer Guide: Transactions

- Author or publisher: Bitcoin Project developer documentation
- Direct URL: https://developer.bitcoin.org/devguide/transactions.html
- Supports: UTXOs, inputs, outputs, change, signatures, transaction identifiers, transaction fees, and wallet construction behavior.

### Bitcoin Developer Guide: P2P Network

- Author or publisher: Bitcoin Project developer documentation
- Direct URL: https://developer.bitcoin.org/devguide/p2p_network.html
- Supports: Transaction relay, node validation, mempool admission, inventory announcements, and block propagation.

### BIP 141: Segregated Witness

- Author or publisher: Eric Lombrozo, Johnson Lau, and Pieter Wuille
- Direct URL: https://bips.dev/141/
- Supports: Transaction weight, virtual size, witness data, txid and wtxid distinctions, and SegWit's transaction-malleability changes.

### BIP 125: Opt-in Full Replace-by-Fee Signaling

- Author or publisher: David Harding and Peter Todd
- Direct URL: https://bips.dev/125/
- Supports: The historical opt-in RBF signaling and replacement-policy model. Current Bitcoin Core behavior is supported separately.

### Bitcoin Core 29.0 Release Notes

- Author or publisher: Bitcoin Core developers
- Direct URL: https://bitcoincore.org/en/releases/29.0/
- Supports: The Bitcoin Core change making full replace-by-fee standard behavior and removing the prior configuration option.

### Bitcoin Core 31.0 Release Notes

- Author or publisher: Bitcoin Core developers
- Direct URL: https://bitcoincore.org/en/releases/31.0/
- Supports: Current Bitcoin Core cluster mempool, replacement, package, and mempool-policy changes relevant to fee management.

### Fee estimation

- Author or publisher: Bitcoin Optech
- Direct URL: https://bitcoinops.org/en/topics/fee-estimation/
- Supports: Fee estimation as a probabilistic process based on block-space demand, historical behavior, and miner selection rather than a timing guarantee.

### Replace-by-fee

- Author or publisher: Bitcoin Optech
- Direct URL: https://bitcoinops.org/en/topics/replace-by-fee/
- Supports: RBF design, current implementation context, wallet behavior, and replacement-policy tradeoffs.

### Child pays for parent

- Author or publisher: Bitcoin Optech
- Direct URL: https://bitcoinops.org/en/topics/cpfp/
- Supports: CPFP package economics, use of spendable child outputs, and the conditions required for miners to evaluate a parent and child together.

### Transaction pinning

- Author or publisher: Bitcoin Optech
- Direct URL: https://bitcoinops.org/en/topics/transaction-pinning/
- Supports: Transaction structures and policy interactions that can interfere with fee bumping, replacement, or package confirmation.

### Package relay

- Author or publisher: Bitcoin Optech
- Direct URL: https://bitcoinops.org/en/topics/package-relay/
- Supports: Relay and validation of related transaction packages and the evolving policy context for unconfirmed parent-child transaction graphs.

## 5. SEO title

How Bitcoin Transactions and Fees Work: Inputs, Outputs, and Mempools

## 6. Meta description

Learn how Bitcoin transactions spend UTXOs, create recipient and change outputs, calculate fees by transaction size, enter node mempools, and receive confirmations.

## 7. Page excerpt

Bitcoin transactions spend existing outputs and create new ones. This guide explains inputs, change, transaction weight, sat/vB fee rates, node-local mempools, miner selection, RBF, CPFP, and confirmation risk.

## 8. Estimated reading time

11 to 13 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- MSC-GUIDE-007 | How to Send and Receive Bitcoin
- MSC-GUIDE-009 | What Is a Bitcoin Seed Phrase?
- MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
- MSC-GUIDE-014 | How Bitcoin Confirmations Work
- MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?
- MSC-GUIDE-026 | How Bitcoin Blocks Work
- MSC-GUIDE-027 | How the Bitcoin Blockchain Works
- MSC-GUIDE-056 | How SegWit Changed Bitcoin
- MSC-ROUTE-001 | How a Bitcoin Transaction Moves
- MSC-GLOSSARY-001 | Bitcoin Glossary
- MSC-HUB-BASICS | Bitcoin Basics

## 10. Accuracy review checklist

- [x] Registry metadata matches the approved registry.
- [x] Inputs reference previous UTXOs and outputs create new spending conditions.
- [x] UTXOs are described as spent whole with new outputs created.
- [x] Recipient amount, change, total fee, and fee rate remain distinct.
- [x] Fees are related to transaction weight or virtual size rather than payment value.
- [x] sat/vB is explained without a fixed fee recommendation.
- [x] Transaction weight differences across inputs, outputs, and script types are acknowledged.
- [x] Fee estimation is presented as a forecast rather than a timing guarantee.
- [x] Node-local mempools are distinguished from one universal global mempool.
- [x] Consensus validity is separated from relay, standardness, mempool, and miner policy.
- [x] RBF and CPFP are explained as conditional fee-management mechanisms.
- [x] Transaction pinning and policy evolution are acknowledged.
- [x] Confirmation and finality are described as risk-based.
- [x] Planned internal links contain no live URLs.
- [x] No em dash or en dash character appears.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-17
- Notes:
  - Editorial accuracy review completed.
  - Recheck source URL accessibility immediately before publication.
  - Recheck current Bitcoin Core mempool, replacement, package-policy, CPFP, pinning, txid, wtxid, and transaction-weight behavior before publication.
  - Keep planned internal links inactive until real destination pages and confirmed URLs exist.

## 12. Illustration brief

### Illustration 1

- Concept title: Inputs Become Recipient, Change, and Fee
- Educational purpose: Show that UTXOs are spent whole and replaced by new outputs.
- Recommended placement: After the section titled Change completes the transaction equation.
- Visual description: A technical navigation plate with two input channels flowing into one transaction frame, then splitting into recipient output, change output, and fee difference. The fee should appear as arithmetic difference rather than a standard output box.
- Required labels: Input UTXOs, Transaction, Recipient output, Change output, Fee
- Caption: A Bitcoin transaction consumes complete input UTXOs, creates new outputs, and leaves the difference as the fee.
- Alt text: Diagram showing Bitcoin input UTXOs entering a transaction and becoming a recipient output, a change output, and a fee difference.
- Image orientation: Landscape
- Mobile crop notes: Stack inputs above the transaction and outputs below while preserving the fee equation.
- Status: PLANNED

### Illustration 2

- Concept title: Payment Amount Is Not Transaction Size
- Educational purpose: Correct the idea that a larger payment automatically requires a larger network fee.
- Recommended placement: After the section titled Weight and virtual size measure block-space use.
- Visual description: Two side-by-side survey vessels. One carries a high-value payment in a compact one-input transaction. The other carries a low-value payment with many inputs and more data. A block-space ruler measures virtual bytes beneath both.
- Required labels: Payment amount, Inputs, Outputs, Virtual size, Fee rate
- Caption: On-chain fees reflect transaction weight and fee rate, not simply the value being transferred.
- Alt text: Comparison showing a high-value compact Bitcoin transaction and a lower-value transaction with many inputs using more virtual bytes.
- Image orientation: Landscape
- Mobile crop notes: Stack the two examples and keep the virtual-size ruler visible under each.
- Status: PLANNED

### Illustration 3

- Concept title: Local Mempools and Fee-Management Paths
- Educational purpose: Show that nodes can hold different unconfirmed transaction sets and that RBF and CPFP follow different transaction paths.
- Recommended placement: After the section titled There is no single mempool.
- Visual description: An oceanographic chart with three node-local pools containing overlapping but nonidentical transaction markers. One route shows a replacement transaction conflicting with the original. Another shows a child attached to a parent. A miner selects from the transactions it can evaluate.
- Required labels: Node A mempool, Node B mempool, Miner view, RBF replacement, CPFP child, Candidate block
- Caption: Mempools are local, and fee-management transactions depend on relay policy, transaction structure, and miner selection.
- Alt text: Chart showing different node mempools, an RBF replacement path, a CPFP parent-child path, and a miner constructing a candidate block.
- Image orientation: Landscape
- Mobile crop notes: Keep two node pools and both fee-management paths visible; the third node pool may move below in a narrow crop.
- Status: PLANNED
