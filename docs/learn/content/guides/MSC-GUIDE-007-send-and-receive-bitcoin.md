---
registry_id: MSC-GUIDE-007
status: COPY_LOCKED
page_role: topic-guide
h1: How to Send and Receive Bitcoin
handle: send-and-receive-bitcoin
category: Bitcoin Basics
subcategory: Using Bitcoin
depth: Surface
format: Walkthrough
primary_path: Start With Bitcoin
secondary_paths:
  - Use Bitcoin Safely
author_display: Mempool Surf Club Editorial
reviewed_date: 2026-07-17
copy_locked_date: 2026-07-17
---

# How to Send and Receive Bitcoin

## 1. Introductory deck

Sending and receiving bitcoin involves more than copying an address and pressing a button. A wallet creates or reads payment information, constructs a transaction, signs it when authorized, broadcasts it to peers, and then tracks whether miners include it in a valid block.

## 2. Full article

A Bitcoin payment can feel simple at the interface. One person presents receiving information. Another enters an amount and approves the payment.

Behind that exchange, a wallet must choose the intended network and payment method, construct a valid transaction, authorize it with the required keys, and send it into a peer-to-peer network where confirmation is not guaranteed on a fixed schedule.

This walkthrough stays at the user level while keeping those distinctions clear.

### First identify the payment path

Bitcoin supports more than one way to make a payment.

An on-chain transaction creates outputs recorded in Bitcoin blocks. A Lightning payment uses a separate payment-channel network and settles according to different rules and assumptions. Both may be displayed as QR codes or payment requests, but they are not interchangeable.

Bitcoin testing environments use coins with no intended monetary value and network-specific parameters or encodings. A mainnet wallet should not treat testnet, signet, or regtest payment information as a mainnet destination merely because the string or QR code appears structurally valid.

Before sending or receiving, confirm the intended Bitcoin network and payment method. A wallet may detect some mismatches, but the interface cannot safely assume every string or QR code represents the path the user intended.

This guide focuses on on-chain Bitcoin transactions.

### Receiving begins with wallet-generated information

To receive an on-chain payment, the recipient asks a wallet to generate or select receiving information.

That information commonly appears as a Bitcoin address, a QR code, or a payment request containing an address and optional details such as an amount. An address is a destination representation used by wallets to construct a Bitcoin locking script. It does not contain bitcoin and is not the wallet itself.

A wallet may generate many addresses from related key material. Using a new address for each payment can reduce some forms of transaction linkage. Reusing an address can make it easier for outside observers to connect payments and activity.

The recipient should confirm that the wallet is showing an address for the intended network and an address type supported by the sender. Modern wallets commonly support several address formats, but compatibility is not universal across older services and software.

### QR codes reduce typing, not verification

A QR code is an encoding method. It can reduce typing errors, but it does not establish that the destination is correct.

Malware, a compromised website, a substituted image, a misleading invoice, or an incorrect wallet screen can display the wrong payment information in a perfectly readable QR code. A copied address can also be replaced in the clipboard.

The sender should compare the destination shown by the sending wallet with information obtained through an appropriate trusted channel. The amount, network, and payment method also deserve review.

For higher-risk payments, people may use additional verification steps suited to their circumstances. No single checking method is universally sufficient, and a test transaction is not universally required.

### The recipient does not need to remain online

For an on-chain payment, the recipient does not need to be online when the sender constructs or broadcasts the transaction.

The sender's transaction creates an output using the receiving information. That output becomes part of the public transaction data if the transaction is confirmed in a block.

The recipient's wallet can detect the output later by connecting to a node or service and scanning relevant transaction and block information. A watch-only wallet can perform this detection without holding the private keys needed to spend.

Being offline does not prevent receipt, but the recipient needs reliable wallet information and a later way to learn about the transaction. The sender also needs valid receiving information before creating the payment.

### Review before authorizing a send

A sending wallet typically asks for a destination and an amount. It may also display fee information, the selected network, and other transaction details.

Before authorizing, review:

1. The destination.
2. The amount and unit.
3. The intended Bitcoin network.
4. Whether the payment is on-chain or uses another system.
5. The fee information and any stated confirmation target.
6. Whether the wallet is creating additional outputs, including change.
7. Any warning about compatibility, insufficient funds, dust, or unconfirmed inputs.

The exact interface differs by wallet. The principle is the same: authorization should follow review, not replace it.

A wallet cannot know the human intent behind every destination. It can validate an address encoding or script type and still send to the wrong person if the user approves incorrect information.

### The wallet selects inputs

Bitcoin transactions spend existing UTXOs.

When a wallet prepares a send, it selects one or more available outputs as inputs. Each input references a previously created output and supplies the data needed to satisfy its spending condition.

UTXOs are spent whole. If the selected inputs contain more value than the recipient amount and fee, the wallet commonly creates a change output returning the remainder to a wallet-controlled destination.

For example, a wallet might select an output worth 100,000 satoshis to pay 60,000 satoshis. It could create a recipient output, a change output, and leave the difference as the transaction fee. The exact values depend on the chosen fee rate and transaction structure.

The wallet's balance display can make this process look like subtracting from one account. Underneath, the wallet is selecting and replacing discrete outputs.

### A signature authorizes the spend

After constructing the transaction, the wallet or signing device produces the signatures required by the selected inputs.

A digital signature provides cryptographic proof that valid private key material authorized the transaction or message. The signature does not reveal the private key.

Different spending conditions can require different authorization. A single-key wallet may need one signer. A multisignature wallet may require a threshold of several keys. A hardware signing device may receive transaction information from a coordinator and return a signature after the user approves the displayed details.

Signing is the authorization step. It is not the same as broadcasting or confirming.

A signed transaction can remain on a device, move through a Partially Signed Bitcoin Transaction workflow, or be passed to another system for broadcast.

### Broadcasting sends the transaction to peers

Broadcasting means offering the transaction to one or more Bitcoin nodes.

A receiving node checks the transaction against consensus rules and its own local policy. If the transaction is valid and acceptable under that node's policy, the node may store it in its local mempool and relay it to peers.

There is no single universal mempool. Each node maintains its own collection of unconfirmed transactions and can use different settings, software, timing, and policy. A transaction may be present in many mempools, absent from others, or removed later.

Broadcast success means at least one system accepted or forwarded the transaction. It does not mean the transaction is confirmed.

### Nodes validate and relay under local rules

A node can reject a transaction because it is invalid under consensus rules, conflicts with another spend, fails local policy, has an insufficient fee rate for that node's current settings, depends on unavailable parents, or exceeds resource limits.

Consensus rules determine whether a transaction can be valid in a block. Policy rules influence whether a node accepts and relays an unconfirmed transaction before mining. The two should not be treated as identical.

A transaction declined by one node may still reach other peers or miners through another route. A transaction that violates consensus rules cannot become valid through wider broadcast.

Wallet labels such as pending or failed may simplify a more specific network state.

### Miners decide what enters candidate blocks

Miners construct candidate blocks from valid transactions available to them.

They generally consider fees, transaction relationships, block limits, operational policy, and other factors. A wallet's fee estimate is an attempt to compete for block space. It is not a reservation or a promise.

When a miner includes the transaction in a block and nodes accept that block, the transaction receives its first confirmation. Each valid block added afterward increases settlement depth.

Confirmation time can vary. A transaction may confirm quickly, wait through several blocks, remain unconfirmed for a long period, be replaced by a conflicting transaction under applicable policy, or disappear from some mempools.

The sender and recipient should treat confirmation as a network event, not as a button state controlled by the wallet company.

### Fee information is an estimate

On-chain fees are related to the transaction's weight or virtual size and the chosen fee rate, not directly to the amount of bitcoin being sent.

A small payment can require a larger fee than a large payment if its transaction uses more block space or competes during a period of higher demand. A wallet estimates an appropriate fee rate based on data and assumptions about current or expected block-space competition.

The estimate cannot guarantee confirmation timing. Blocks arrive irregularly, demand changes, and node mempools differ.

Guide 008 explains transaction structure, virtual bytes, fee rates, policy, replacement, and confirmation risk in more detail.

### Fee bumping may be possible

Some wallets can increase the effective fee of an unconfirmed payment.

Replace-by-fee can create a replacement transaction that spends one or more of the same inputs while paying a higher fee, subject to wallet support and the policies used by nodes and miners.

Child-pays-for-parent can create a new transaction that spends an output from the unconfirmed parent with a fee high enough to make the package more attractive. This requires a suitable spendable output, compatible wallet behavior, and acceptance by relevant nodes and miners.

Neither method is a guaranteed rescue. The original transaction structure, wallet capabilities, node policy, miner behavior, transaction relationships, and current fee market all matter. A wallet may offer one method, both methods, or neither.

### A test transaction is a tradeoff

A small test transaction can reduce some risks in some situations. It can confirm that a receiving setup detects an on-chain payment and that the sender has copied the intended destination format.

It does not prove that every later transaction will be correct. A second payment still needs review. The test also creates another public transaction, another fee, and another piece of activity that may be connected through transaction analysis.

A test may be reasonable for an unfamiliar or high-consequence workflow. It may be unnecessary for a routine payment where the destination and process are already well verified.

The decision should reflect the situation rather than a universal rule.

### The recipient verifies the result

A recipient may see a transaction as soon as the wallet learns about it. That is usually an unconfirmed payment.

The recipient should distinguish detection from confirmation. For low-risk situations, an unconfirmed payment may be informative. For higher-value or irreversible delivery, additional confirmation depth may be appropriate.

The right level depends on the value, transaction characteristics, counterparty, reorganization risk, and what happens after acceptance. One confirmation is not an absolute finality guarantee, and no universal confirmation count fits every situation.

A wallet should present confirmation state clearly, but the user or business still defines its acceptance policy.

### Privacy does not happen automatically

On-chain Bitcoin transactions are public. Addresses do not automatically include legal names, but transaction relationships can reveal patterns.

Address reuse can connect payments to the same destination. Input selection can connect UTXOs. Change detection, exchange records, merchant information, public posts, and network observations can create further links.

Generating a new receiving address helps avoid one obvious reuse pattern. It does not make the transaction anonymous.

Wallet choice, node connection, transaction construction, payment communication, and later spending behavior all affect privacy. A complete privacy treatment belongs in How Bitcoin Privacy Works.

### A compact on-chain walkthrough

For a basic on-chain payment, the sequence is:

1. The recipient selects receiving information from a wallet.
2. Both parties confirm the intended Bitcoin network and payment method.
3. The sender enters or scans the destination.
4. The sender reviews the destination, amount, fee information, and network.
5. The wallet selects UTXOs and creates recipient and possible change outputs.
6. The required signer or signers authorize the spend.
7. The transaction is broadcast to one or more nodes.
8. Nodes validate it and may relay it under local policy.
9. The transaction may enter individual node mempools.
10. A miner may include it in a candidate block.
11. Nodes validate the block.
12. The transaction receives a confirmation when accepted in a valid block.
13. Later blocks add settlement depth.

Every stage has limits. A valid address can still be the wrong destination. A signed transaction can remain unbroadcast. A broadcast transaction can remain unconfirmed. A confirmed transaction can face small recent-chain reorganization risk.

Understanding the stages makes the wallet interface less mysterious and helps users respond more calmly when a payment does not move exactly as expected.

### Where to continue

This walkthrough explains the practical path without opening every technical layer.

How Bitcoin Transactions and Fees Work goes deeper into inputs, outputs, change, transaction weight, fee rate, node-local mempools, miner selection, replacement, and confirmation risk.

The featured route, How a Bitcoin Transaction Moves, will later connect transaction creation with UTXO selection, mempool behavior, mining, blocks, and settlement depth across the wider Learn library.

## 3. Key Terms

**Address:** A destination representation used by wallets to construct a Bitcoin locking script.

**Payment:** A transfer of value from a payer to a recipient using an agreed settlement method.

**Transaction:** A data structure that spends existing UTXOs and creates new outputs.

**Wallet:** Software or hardware that manages keys, constructs transactions, and helps users interact with Bitcoin.

**Mempool:** A node's local collection of valid unconfirmed transactions eligible for relay or block inclusion.

**Confirmation:** The inclusion of a transaction in a block, followed by additional blocks that increase settlement depth.

## 4. Sources

### Bitcoin Developer Guide: Payment Processing

- Author or publisher: Bitcoin Project developer documentation
- Direct URL: https://developer.bitcoin.org/devguide/payment_processing.html
- Supports: Wallet-neutral payment workflows, receiving information, transaction detection, confirmation monitoring, and payment-processing considerations.

### Bitcoin Developer Guide: Transactions

- Author or publisher: Bitcoin Project developer documentation
- Direct URL: https://developer.bitcoin.org/devguide/transactions.html
- Supports: Inputs, outputs, UTXOs, change, signatures, transaction construction, and wallet balance behavior.

### Bitcoin Developer Guide: P2P Network

- Author or publisher: Bitcoin Project developer documentation
- Direct URL: https://developer.bitcoin.org/devguide/p2p_network.html
- Supports: Transaction broadcast, peer relay, node validation, mempool behavior, and block propagation.

### Bitcoin Core Network Parameters

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/kernel/chainparams.cpp
- Supports: The separate mainnet, testnet, signet, and regtest network parameters and their network-specific address and encoding configuration.

### BIP 21: URI Scheme

- Author or publisher: Nils Schneider and Matt Corallo
- Direct URL: https://bips.dev/21/
- Supports: Bitcoin payment-request URIs containing addresses, optional amounts, labels, messages, and extensible parameters.

### BIP 173: Base32 Address Format for Native v0-16 Witness Outputs

- Author or publisher: Pieter Wuille and Greg Maxwell
- Direct URL: https://bips.dev/173/
- Supports: Bech32 encoding for native witness version 0 addresses and network-readable human-readable prefixes.

### BIP 350: Bech32m Format for v1+ Witness Addresses

- Author or publisher: Pieter Wuille
- Direct URL: https://bips.dev/350/
- Supports: Bech32m encoding for witness version 1 and later addresses and the compatibility distinction between address formats.

### BIP 125: Opt-in Full Replace-by-Fee Signaling

- Author or publisher: David Harding and Peter Todd
- Direct URL: https://bips.dev/125/
- Supports: The historical opt-in replace-by-fee signaling design and replacement-policy considerations. Current node behavior must be verified separately.

### Replace-by-fee

- Author or publisher: Bitcoin Optech
- Direct URL: https://bitcoinops.org/en/topics/replace-by-fee/
- Supports: Current technical context for replacing unconfirmed transactions, wallet and node policy differences, and the limits of fee-bumping assumptions.

### Child pays for parent

- Author or publisher: Bitcoin Optech
- Direct URL: https://bitcoinops.org/en/topics/cpfp/
- Supports: CPFP as a method for increasing the combined fee incentive of an unconfirmed parent and child transaction package.

### Bitcoin Core 31.0 Release Notes

- Author or publisher: Bitcoin Core developers
- Direct URL: https://bitcoincore.org/en/releases/31.0/
- Supports: Current Bitcoin Core mempool and replacement-policy changes that affect how wallet developers should reason about fee management and relay behavior.

## 5. SEO title

How to Send and Receive Bitcoin: A Wallet-Neutral Walkthrough

## 6. Meta description

Learn how to receive and send on-chain bitcoin, review payment information, authorize a transaction, broadcast it, and understand confirmation and fee limits.

## 7. Page excerpt

An on-chain Bitcoin payment moves from receiving information and wallet review through input selection, signing, broadcast, node relay, mempools, mining, and confirmation.

## 8. Estimated reading time

10 to 11 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- MSC-GUIDE-006 | What Is Bitcoin Self-Custody?
- MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- MSC-GUIDE-009 | What Is a Bitcoin Seed Phrase?
- MSC-GUIDE-012 | How Bitcoin Privacy Works
- MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
- MSC-GUIDE-014 | How Bitcoin Confirmations Work
- MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?
- MSC-ROUTE-001 | How a Bitcoin Transaction Moves
- MSC-GLOSSARY-001 | Bitcoin Glossary
- MSC-HUB-BASICS | Bitcoin Basics

## 10. Accuracy review checklist

- [x] Registry metadata matches the approved registry.
- [x] The walkthrough remains wallet-neutral and avoids brand-specific buttons.
- [x] On-chain and Lightning payment paths are distinguished.
- [x] Addresses and QR codes are not described as holding bitcoin or proving destination correctness.
- [x] The recipient is not required to remain online for an on-chain transaction to be created.
- [x] Input selection, change, signing, broadcast, relay, mining, and confirmation remain separate stages.
- [x] Node-local mempools and policy differences are acknowledged.
- [x] Broadcasting is not presented as confirmation.
- [x] Fee estimates and confirmation timing are not guaranteed.
- [x] RBF and CPFP are described as conditional mechanisms rather than guaranteed rescues.
- [x] Test transactions are presented as a situational tradeoff.
- [x] No fixed fee recommendation or product endorsement appears.
- [x] Planned internal links contain no live URLs.
- [x] No em dash or en dash character appears.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-17
- Notes:
  - Editorial accuracy review completed.
  - Recheck source URL accessibility immediately before publication.
  - Recheck current Bitcoin Core replacement, mempool, testing-environment, and payment-path behavior before publication.
  - Keep planned internal links inactive until real destination pages and confirmed URLs exist.

## 12. Illustration brief

### Illustration 1

- Concept title: Receiving Information Creates an Output Destination
- Educational purpose: Show that an address or QR code helps construct an output and does not hold bitcoin.
- Recommended placement: After the section titled Receiving begins with wallet-generated information.
- Visual description: A navigation-chart sequence from recipient wallet to address and QR representation to a sender-created transaction output. The final output appears on a network transaction chart rather than inside the QR code.
- Required labels: Recipient wallet, Address, QR code, Locking script, Transaction output
- Caption: Receiving information helps the sender construct an output. The address or QR code does not contain bitcoin.
- Alt text: Editorial diagram showing a recipient wallet generating an address and QR code that a sender uses to create a Bitcoin transaction output.
- Image orientation: Landscape
- Mobile crop notes: Stack the sequence vertically and keep the transaction output as the final visible stage.
- Status: PLANNED

### Illustration 2

- Concept title: From Wallet to Confirmation
- Educational purpose: Separate transaction authorization, broadcast, node relay, mempool admission, mining, and confirmation.
- Recommended placement: After the section titled A compact on-chain walkthrough.
- Visual description: An ocean-current route passing through six marked stations: wallet, nodes, node-local mempools, miner, block, and confirmation. Use several small mempool basins rather than one global pool.
- Required labels: Wallet, Nodes, Mempools, Miner, Block, Confirmation
- Caption: A signed transaction moves through independently operated systems before it may receive confirmation in a valid block.
- Alt text: Navigation-route diagram showing a Bitcoin transaction moving from a wallet through nodes and separate mempools to a miner, block, and confirmation.
- Image orientation: Landscape
- Mobile crop notes: Allow the route to turn into a vertical current while keeping all six stages in order.
- Status: PLANNED

### Illustration 3

- Concept title: Verification Points Before and After Broadcast
- Educational purpose: Teach readers where human review and network validation occur.
- Recommended placement: After the section titled Review before authorizing a send.
- Visual description: A field-guide checklist split into two zones. Before authorization includes network, payment method, destination, amount, and fee information. After broadcast includes relay status, mempool observation, block inclusion, and confirmation depth. Avoid checkmarks that imply guarantees.
- Required labels: Network, Payment method, Destination, Amount, Fee information, Relay, Block inclusion, Confirmation depth
- Caption: User verification happens before authorization, while network events determine relay and confirmation afterward.
- Alt text: Two-zone checklist separating payment details reviewed before signing from network events observed after broadcasting.
- Image orientation: Square
- Mobile crop notes: Stack the before and after zones with a clear authorization boundary between them.
- Status: PLANNED
