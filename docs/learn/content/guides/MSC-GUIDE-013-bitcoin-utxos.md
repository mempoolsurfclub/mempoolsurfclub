---
registry_id: MSC-GUIDE-013
status: COPY_LOCKED
page_role: topic-guide
h1: What Are UTXOs in Bitcoin?
handle: bitcoin-utxos
category: Bitcoin Basics
subcategory: Essentials
depth: Shallow
format: Explainer
primary_path: Understand the Network
secondary_paths:
  - Start With Bitcoin
author_display: Mempool Surf Club Editorial
reviewed_date: 2026-07-17
copy_locked_date: 2026-07-17
---

# What Are UTXOs in Bitcoin?

## 1. Introductory deck

Bitcoin does not maintain account balances at the protocol level. It tracks unspent transaction outputs, or UTXOs, that can be referenced and spent by later transactions. Wallet balances are calculated views over those outputs, not entries in a central account database.

## 2. Full article

A Bitcoin wallet may display a single balance, but the network does not store that balance as one number attached to an account.

Bitcoin uses an output-based accounting model. Transactions spend specific outputs created by earlier transactions and create new outputs for later use. The set of outputs that remain available to spend is commonly called the UTXO set.

Understanding this model makes transaction inputs, change, fees, wallet balances, coin selection, privacy, and node validation much easier to follow.

### UTXO means unspent transaction output

A transaction output assigns a value to a locking condition. That condition defines what must be provided in a later transaction to spend the output.

When the transaction that created the output is part of the active chain and the output has not been spent, the output is an unspent transaction output, or UTXO. It is part of the chain state that nodes use when checking new transactions and blocks.

A UTXO is not a physical coin stored inside an address. It is an output record with a value and a locking condition. An address is a destination representation that a wallet can use to construct a locking script. The address, script, output, key, and wallet are related, but they are not the same object.

A UTXO also does not contain a legal owner's name. Bitcoin validation checks whether the spending conditions are satisfied, not whether the spender matches an identity record.

### Outputs are created by transactions

Every ordinary Bitcoin transaction creates one or more outputs.

An output includes an amount and a script that locks that value under defined conditions. A common output may require a valid signature from a key associated with a destination. Other scripts can require multiple signatures, timelocks, hashes, or Taproot spending conditions.

An output can remain unspent for a short time or many years. Its status changes only when a valid transaction spending that exact output becomes part of the selected chain state.

This is why a UTXO is better understood as a spendable transaction result than as a balance entry.

### Inputs reference specific earlier outputs

A transaction input does not say, "subtract this amount from an account." It identifies a specific output from a previous transaction.

The reference uses the previous transaction identifier and the output index within that transaction. Together, those values point to one earlier output.

The spending transaction also provides the unlocking data required by that output's script. Depending on the spending condition, that data may include script elements, signatures, public keys, or witness information.

Nodes use the reference to find the previous output in the UTXO set, examine its value and locking condition, and verify that the new transaction satisfies the applicable rules.

### An output is spent as a complete unit

A transaction does not partially consume one UTXO and leave the unused portion inside the original output.

When an input spends an output, that output is consumed as a complete unit. If its value is larger than the intended payment and fee, the transaction normally creates a new change output.

Suppose a wallet selects an output worth 100,000 satoshis to make a payment of 60,000 satoshis. The original 100,000-satoshi output is fully spent. The new transaction might create a 60,000-satoshi recipient output and a change output returning the remaining value, less the transaction fee, to a wallet-controlled destination.

The change is a newly created transaction output. It is not an untouched remainder still sitting inside the original output.

### Transactions can combine and split value

A transaction can have multiple inputs and multiple outputs.

A wallet may need several UTXOs to fund one payment. It can reference each selected output as an input, combine their values, and create a new set of outputs.

The outputs can include one or more recipients, change destinations, or other script conditions. The new output values do not need to match the old output values individually. What matters for an ordinary valid transaction is that the total output value does not exceed the available input value, subject to the applicable rules.

This structure lets Bitcoin value be combined, divided, and reassigned without maintaining account balances.

### Fees are the difference between inputs and outputs

For an ordinary non-coinbase transaction, the transaction fee equals total input value minus total output value.

The fee is generally not stored in a separate transaction field. A node determines the input values by looking up the referenced UTXOs, adds the output values in the new transaction, and calculates the difference.

If the inputs total 150,000 satoshis and the outputs total 148,500 satoshis, the fee is 1,500 satoshis.

Fees depend primarily on transaction weight and the fee rate needed to compete for block space. The amount of bitcoin transferred does not determine the fee by itself. Spending several inputs can make a transaction heavier than spending one input, even when both transactions send the same amount.

The dedicated transaction and fee guide covers fee estimation, replacement, CPFP, and package behavior in more detail.

### Nodes maintain the UTXO set

A validating node maintains a view of outputs that are currently available to spend under its active chain.

When a node validates a transaction, it checks that each referenced output exists, is unspent in the relevant state, and can be spent under its locking condition. It also checks values, scripts, maturity rules, and other consensus requirements.

When a block becomes part of the active chain, outputs spent by its transactions are removed from the spendable UTXO state. Newly created outputs are added, except for outputs that are created and spent within the same block before the final state is recorded.

If a chain reorganization changes the active chain, the node updates its view by undoing the affected chain state and applying the competing chain. A UTXO's status is therefore connected to the node's current active-chain view.

### The UTXO set supports independent validation

A node does not need a central institution to report account balances.

It can verify the blockchain history, build the current UTXO set, and independently check whether a new transaction attempts to spend available outputs under valid conditions.

The full blockchain provides history. The UTXO set provides a compact working view of the outputs relevant to future spending validation.

This does not mean the UTXO set is the only data a node stores or that every implementation organizes it identically. It means the output-based state can be derived and checked from Bitcoin's validated chain history.

### Wallet balances are calculated views

A wallet balance is produced by wallet software.

The wallet identifies outputs associated with keys, scripts, descriptors, or watch-only information it manages. It then classifies and totals those outputs according to its own interface and policy.

Wallets may distinguish confirmed, unconfirmed, immature, locked, frozen, watch-only, or otherwise unavailable outputs. One wallet may include certain unconfirmed change in a displayed total while another separates it. A watch-only wallet may display outputs it can monitor but cannot sign for.

These differences do not create different protocol balances. They are different wallet views over transaction outputs and wallet state.

### Coin selection is wallet behavior

When building a transaction, wallet software chooses which UTXOs to spend. This process is called coin selection.

Coin selection is not a Bitcoin consensus rule. Different wallets can make different choices while constructing equally valid transactions.

A wallet may consider transaction weight, change creation, privacy, labels, confirmation status, output age, user-selected coin control, and other local goals. A user may also select UTXOs manually when the wallet provides coin-control features.

The chosen inputs affect the resulting fee, change, privacy profile, and future wallet structure.

### Input selection affects fees

Each additional input adds data and increases transaction weight.

A wallet containing many small UTXOs may need to combine several of them to make a larger payment. That transaction may require a higher absolute fee than one funded by a single suitable output at the same fee rate.

Receiving many small payments can therefore increase the weight of future transactions. The outputs remain valid and spendable if their conditions are met, but spending them may become uneconomical under some fee conditions.

There is no simple Bitcoin-wide consensus amount below which every output is invalid. Economic usefulness depends on script type, fee conditions, wallet behavior, and policy.

### Dust is usually a policy concept

The term dust is often used for an output whose value is small relative to the cost of spending it.

Bitcoin Core's dust rules are standardness and relay policy, not a universal rule that makes every smaller output invalid under consensus. Policy thresholds can depend on the output script and an assumed relay fee.

A node can refuse to relay or accept a transaction under its local policy even when the transaction would not violate consensus if included in a valid block. Wallets may also avoid creating outputs they consider uneconomical.

This distinction matters. There is no single fixed "minimum UTXO size" that functions as a simple Bitcoin-wide consensus amount for every script and circumstance.

### Input selection affects privacy

Combining UTXOs in one transaction can create a visible relationship among their histories.

Observers often apply the common-input-ownership heuristic, while recognizing that collaborative transactions can produce exceptions. Change detection and later spending can create additional links.

Coin control can help keep unrelated outputs separate, but it also adds operational complexity. Labels can improve context for the user while becoming sensitive metadata if exposed.

Consolidating several UTXOs may reduce future input count and future transaction weight. It can also link those outputs publicly in one transaction. The right choice depends on fee conditions, privacy goals, and the user's ability to understand the resulting wallet state.

The privacy guide covers these tradeoffs in greater depth.

### Unconfirmed outputs require context

A transaction can create outputs before it is confirmed. A wallet may allow those unconfirmed outputs to fund a descendant transaction.

Whether that descendant is accepted or relayed depends on the transaction relationships, wallet construction, node policy, fees, replacement behavior, and miner policy. Different nodes can hold different mempool contents.

An unconfirmed output is not yet part of the active-chain UTXO set. It may exist in a node's mempool view as part of an accepted chain of unconfirmed transactions.

If its parent transaction is replaced, removed, or never confirmed, the descendant's status can change with it.

### Coinbase outputs have a maturity rule

The first transaction in a block is the coinbase transaction. It can create the permitted block subsidy and collect transaction fees.

Bitcoin Core defines coinbase maturity as 100 blocks. A coinbase output can be spent only in a block whose height is at least 100 greater than the height of the block that created it. A reorganization can change active-chain depth, so wallet maturity status can change with the selected chain view.

The maturity rule protects the system from spending newly created block rewards before the block has sufficient depth. It is a consensus rule, not a wallet preference.

Wallets may label these outputs as immature until they become spendable.

### UTXOs are state, not identity

A UTXO tells a validating node what value is available and which locking condition controls its next spend.

It does not say who legally owns the value, why it was received, which wallet interface displays it, or whether the relevant person can still access the required keys.

Bitcoin's output model separates protocol validation from a central identity and account database. Wallets and services build user-facing records around that model, but the underlying transaction state remains based on outputs and spending conditions.

The next guide explains what happens after a transaction spends those outputs and begins accumulating confirmations.

## 3. Key Terms

**UTXO:** An unspent transaction output that can be used as an input in a later transaction.

**Transaction:** A data structure that spends existing UTXOs and creates new outputs.

**Input:** A transaction field that spends a previous UTXO and supplies unlocking data.

**Output:** A transaction field that assigns value to a new locking condition.

**Change output:** A transaction output that returns unspent input value to a wallet-controlled destination.

**Coin control:** Wallet functionality that lets a user choose which UTXOs fund a transaction.

**Wallet:** Software or hardware that manages keys, constructs transactions, and helps users interact with Bitcoin.

**Node:** Bitcoin software that communicates with peers and may validate, relay, store, or serve network data.

**Mempool:** A node's local collection of valid unconfirmed transactions eligible for relay or block inclusion.

**Validation:** The process of checking transactions and blocks against applicable rules.

## 4. Sources

### Bitcoin: A Peer-to-Peer Electronic Cash System

- Author or publisher: Satoshi Nakamoto
- Direct URL: https://bitcoin.org/bitcoin.pdf
- Supports: Bitcoin's transaction-chain model, transaction inputs and outputs, double-spend prevention, and validation without a central account database.

### Bitcoin Developer Guide: Transactions

- Author or publisher: Bitcoin Project developer documentation
- Direct URL: https://developer.bitcoin.org/devguide/transactions.html
- Supports: UTXOs, inputs, outputs, change, transaction fees, coinbase transactions, and wallet transaction construction.

### Bitcoin Developer Reference: Transactions

- Author or publisher: Bitcoin Project developer documentation
- Direct URL: https://developer.bitcoin.org/reference/transactions.html
- Supports: Transaction serialization, outpoints, input references, output values, scripts, witness data, and coinbase transaction structure.

### Bitcoin Core Coins View Interface

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/coins.h
- Supports: Bitcoin Core's representation and access patterns for unspent transaction outputs used during validation.

### Bitcoin Core Coins View Implementation

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/coins.cpp
- Supports: Bitcoin Core's UTXO cache and database behavior, including adding, spending, and flushing coin records.

### Bitcoin Core Consensus Constants

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/consensus/consensus.h
- Supports: The consensus coinbase maturity constant used when validating spends of coinbase outputs.

### Bitcoin Core Validation

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/validation.cpp
- Supports: Transaction and block validation against the coins view, input-value checks, coinbase maturity enforcement, active-chain state updates, and reorganization handling.

### Bitcoin Core Transaction Policy

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/policy/policy.cpp
- Supports: Dust-threshold calculations and the separation of relay or standardness policy from consensus validity.

### Bitcoin Optech: Coin Selection

- Author or publisher: Bitcoin Optech
- Direct URL: https://bitcoinops.org/en/topics/coin-selection/
- Supports: Wallet coin selection, input count, change, fees, privacy considerations, consolidation, and policy-sensitive wallet behavior.

### Bitcoin Developer Guide: Block Chain

- Author or publisher: Bitcoin Project developer documentation
- Direct URL: https://developer.bitcoin.org/devguide/block_chain.html
- Supports: Chain state, transaction inclusion, block validation, and the relationship between validated history and spendable outputs.

## 5. SEO title

What Are UTXOs in Bitcoin? Outputs, Inputs, and Change

## 6. Meta description

Learn how Bitcoin tracks unspent transaction outputs, how inputs consume whole outputs, how change is created, and how wallets calculate balances and select UTXOs.

## 7. Page excerpt

Bitcoin uses unspent transaction outputs instead of protocol-level account balances. This guide explains inputs, outputs, change, fees, wallet balances, coin selection, the UTXO set, and policy limits.

## 8. Estimated reading time

10 to 12 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- MSC-GUIDE-012 | How Bitcoin Privacy Works
- MSC-GUIDE-014 | How Bitcoin Confirmations Work
- MSC-ROUTE-001 | How a Bitcoin Transaction Moves
- MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- MSC-GUIDE-005 | What Is a Bitcoin Wallet?
- MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?
- MSC-GLOSSARY-001 | Bitcoin Glossary
- MSC-HUB-BASICS | Bitcoin Basics
- MSC-PATH-NETWORK | Understand the Network
- MSC-PATH-START | Start With Bitcoin

## 10. Accuracy review checklist

- [x] Registry metadata matches the approved registry.
- [x] UTXOs are described as spendable output records, not physical coins stored inside addresses.
- [x] Inputs reference specific previous outputs by transaction identifier and output index.
- [x] An input spends its referenced output as a complete unit.
- [x] Change is described as a newly created output.
- [x] Ordinary fees are described as total input value minus total output value.
- [x] Fee cost is linked to transaction weight and fee rate rather than the amount transferred.
- [x] Wallet balances and coin selection are separated from consensus state.
- [x] Dust is described as policy-sensitive rather than one universal consensus minimum.
- [x] Unconfirmed output spending is described as dependent on transaction relationships and policy.
- [x] Coinbase maturity is identified as a consensus rule.
- [x] Exact approved glossary definitions are used.
- [x] Planned internal links contain no live URLs.
- [x] No em dash or en dash character appears.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-17
- Notes:
  - Editorial accuracy review completed.
  - Recheck source URL accessibility immediately before publication.
  - Confirm Bitcoin Core UTXO, validation, coinbase-maturity, dust, relay-policy, and wallet-policy terminology remains current before publication.
  - Keep planned internal links inactive until real destination pages and confirmed URLs exist.

## 12. Illustration brief

### Illustration 1

- Concept title: The UTXO Lifecycle
- Educational purpose: Show how an output moves from creation to available chain state, then becomes an input that creates new outputs.
- Recommended placement: After the section titled An output is spent as a complete unit.
- Visual description: Old technical field-guide flow on Paper. An earlier transaction creates Output 0. The output enters an active UTXO set, is referenced by a later input, and is replaced by two newly created outputs. Use simple boxes and directional lines, not coin icons.
- Required labels: Earlier transaction, Output 0, Available UTXO, Later input, Recipient output, Change output
- Caption: A UTXO is created by one transaction, spent as a complete input, and replaced by newly created outputs.
- Alt text: Field-guide diagram showing a transaction output entering the UTXO set, being spent by a later input, and creating recipient and change outputs.
- Image orientation: Landscape
- Mobile crop notes: Stack the lifecycle vertically and keep the UTXO-set stage centered.
- Status: PLANNED

### Illustration 2

- Concept title: A Wallet Balance Is a View
- Educational purpose: Explain that a displayed wallet balance aggregates separate outputs rather than reading one protocol-level account number.
- Recommended placement: After the section titled Wallet balances are calculated views.
- Visual description: Oceanographic survey chart with five separate output markers of different values feeding a wallet display. Add small status flags for confirmed, unconfirmed, watch-only, and locked without showing commercial interface elements.
- Required labels: Separate outputs, Confirmed, Unconfirmed, Watch-only, Locked, Wallet-displayed balance
- Caption: Wallet software identifies and classifies separate outputs, then presents a calculated balance.
- Alt text: Editorial diagram showing several separate Bitcoin outputs aggregated into a wallet-displayed balance with different status classifications.
- Image orientation: Square
- Mobile crop notes: Keep output markers in two rows above one centered wallet-balance panel.
- Status: PLANNED

### Illustration 3

- Concept title: Inputs, Payment, Change, and Fee
- Educational purpose: Show that whole inputs are consumed, new recipient and change outputs are created, and the fee is the value difference.
- Recommended placement: After the section titled Fees are the difference between inputs and outputs.
- Visual description: Infrastructure-manual balance diagram. Two complete input boxes enter a transaction frame. Two output boxes leave for recipient and change. A narrow labeled gap shows total input value minus total output value as the fee.
- Required labels: Input A, Input B, Total input value, Recipient output, Change output, Transaction fee
- Caption: Ordinary transaction fees are the difference between the value of consumed inputs and newly created outputs.
- Alt text: Technical balance diagram showing two complete inputs funding a recipient output, a change output, and a fee represented by the input-output difference.
- Image orientation: Landscape
- Mobile crop notes: Use a top-to-bottom balance flow with the fee gap directly beneath the output total.
- Status: PLANNED
