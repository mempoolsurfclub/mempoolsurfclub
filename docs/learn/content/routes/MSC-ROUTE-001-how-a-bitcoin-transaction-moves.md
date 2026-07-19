---
registry_id: MSC-ROUTE-001
status: COPY_LOCKED
page_role: featured-route
h1: How a Bitcoin Transaction Moves
handle: how-a-bitcoin-transaction-moves
category: The Bitcoin Network
subcategory: Network
production_batch: "Phase 1.12: route architecture; write after Phase 9 and finalize before network path launch"
author_display: Mempool Surf Club Editorial
reviewed_date: 2026-07-19
copy_locked_date: 2026-07-19
---

# How a Bitcoin Transaction Moves

## 1. Introductory deck

Follow one ordinary Bitcoin transaction from wallet input selection and signing through local checks, peer relay, node-local mempools, miner selection, proof of work, independent block validation, confirmation depth, and UTXO-set updates.

## 2. Full destination copy

An ordinary Bitcoin transaction passes through several systems before a wallet can describe it as confirmed. The process begins with spendable outputs and signing keys, continues through local node policy and peer relay, may reach a mining template, and becomes part of selected history only after a valid block is produced and independently accepted.

The lifecycle below follows one transaction without assuming that every wallet, node, miner, or service uses identical software or policy.

### 1. A wallet selects spendable outputs

Bitcoin does not store one protocol-level account balance for each user. Value exists in transaction outputs with defined spending conditions. An unspent transaction output, or UTXO, can be referenced as an input in a later transaction.

A wallet first identifies outputs it can spend. Coin selection may consider value, confirmation state, input count, labels, privacy, transaction weight, fee rate, change, and policy constraints. The wallet can choose one output or combine several outputs as inputs.

Each selected input consumes the referenced output as a complete unit. If the total input value exceeds the intended payment plus fee, the transaction normally creates a change output controlled by the wallet. The recipient output and change output are both new on-chain output records. The ordinary fee is the difference between total input value and total output value.

An address is not an account containing bitcoin. It is a destination representation that helps wallet software construct a locking script. The output is the on-chain record that assigns value to that spending condition.

At this stage, the wallet has a proposed transaction structure. No signature has been added, no peer has received it, and no miner has selected it.

### 2. The wallet creates signatures

The wallet or connected signing device prepares authorization for the selected inputs. Private keys remain under the signer's control and should not be revealed to peers, miners, nodes, or recipients.

A digital signature proves that valid private key material authorized the defined transaction data under the applicable spending condition. The exact signed data depends on the script and signature-hash rules. The signature is attached as unlocking data that nodes can check with public information.

Nodes do not need the private key. They evaluate the public key, signature, transaction data, and script rules. A valid signature does not prove the recipient is trustworthy, the invoice is correct, or the signer understood the interface. It proves a narrower cryptographic authorization.

Signing also does not broadcast the transaction. A fully signed transaction can remain on an offline device, be transferred to another coordinator, or never be submitted. It has zero confirmations until it appears in a valid block on a node's selected chain.

### 3. The transaction receives local checks

Before submission, wallet software or a connected node may perform local checks. These can detect malformed data, missing signatures, amounts outside permitted ranges, unavailable inputs, fee problems, and transaction structures the software will not create or relay.

Two boundaries matter here.

Consensus rules determine whether transaction data can be valid in a block under the applicable chain state. Local policy determines whether a particular node will accept and relay the transaction before confirmation. Policy can address fee conditions, standard forms, resource use, replacement, package relationships, and denial-of-service limits.

A policy rejection does not necessarily mean the transaction could never be valid inside a block. A compatible node must evaluate a received block under consensus rules even when the block contains a transaction its own mempool policy would not have admitted.

The reverse is also important. A higher fee does not repair an invalid signature, a nonexistent input, an already spent output, or a broken amount rule. Fee competition influences relay and miner selection within the set of transactions that can be valid. It does not purchase an exception to consensus.

Local preflight checks improve feedback, but they do not create network acceptance or confirmation.

### 4. Peers relay the transaction

The wallet submits the transaction to a node or service. A receiving Bitcoin node evaluates it and may announce it to selected peers under local relay policy. Peers can request the transaction and perform their own checks.

There is no central Bitcoin broadcast server. Propagation happens across peer connections. Nodes can receive the transaction at different times, in different orders, or not at all. Privacy protections, peer topology, network delay, policy differences, conflicts, resource limits, and restarts can all change what a node sees.

Broadcast therefore means an attempt to introduce the transaction to one or more network paths. It does not guarantee that every node receives it, every node accepts it, every miner learns about it, or any miner includes it.

A transaction identifier shows which transaction data is being discussed. It is not a receipt promising relay or settlement.

### 5. Nodes may place it in local mempools

A node that accepts the unconfirmed transaction can place it in its own mempool. The mempool is that node's local collection of valid unconfirmed transactions eligible for relay or block inclusion under current policy.

Different nodes can maintain different mempools. One node may already hold a conflicting transaction. Another may apply a higher rolling minimum fee, use different replacement rules, lack an unconfirmed parent, reach a memory limit, or simply never receive the transaction.

Mempool entries can have parent and child relationships. They can be replaced by conflicting transactions under policy, evicted for resource management, expire under local settings, or be removed when a block confirms a conflict. A reorganization can also return eligible transactions from disconnected blocks to an unconfirmed state.

An unconfirmed transaction is not yet part of the selected blockchain. Mempool acceptance is not a consensus certificate and is not the first confirmation. It is one node's current decision about temporary unconfirmed data.

### 6. A miner or pool may select it

A mining system builds a candidate block from transactions it knows about and chooses to include. The source can be a local mempool, direct submission, private relay, pool infrastructure, or another template provider.

Selection can consider fees, fee rates, transaction dependencies, block weight, operator policy, direct agreements, and template strategy. A transaction with a high fee is not guaranteed inclusion. A transaction can also be mined without having appeared in every public node's mempool.

Under many pool arrangements, a pool or template provider constructs candidate work while connected mining machines perform assigned header hashing. Pool participants submit hashes meeting an easier share target so the pool can estimate contributed work. Most shares are internal accounting messages, not Bitcoin blocks.

Template control affects which valid transactions are attempted. It does not make invalid data acceptable to full nodes.

### 7. The transaction enters a candidate block

If selected, the transaction becomes part of a candidate block assembled by a miner or pool system.

The first transaction in the candidate is the coinbase transaction. It can claim no more than the permitted block subsidy plus the transaction fees available from the ordinary transactions in the block. The candidate also includes the selected transaction list, an ordered Merkle commitment, any required witness commitment, block limits, and an 80-byte header.

The header contains version, previous block hash, Merkle root, timestamp, encoded target, and nonce. The previous-block field chooses the parent. The Merkle root commits to the ordered transaction identifiers. Changes to transactions, order, or coinbase data alter commitments and therefore alter the header being hashed.

A candidate block is still a proposal. The transaction has not received a confirmation merely because it appears in a template.

### 8. Miners perform proof of work

Mining hardware repeatedly hashes candidate block headers with double SHA-256. Each result is compared with the target required for the candidate's chain position.

A valid proof-of-work hash is numerically less than or equal to that target. Miners change nonce values and other permitted header-related data to create new candidates. Failed hashes do not accumulate partial on-chain progress. Each attempted header either satisfies the target or it does not.

Finding a qualifying result can require enormous work. Verifying that result is comparatively cheap.

Proof of work qualifies the header for submission. It does not check every transaction, signature, UTXO, coinbase amount, block commitment, or resource limit. A block can have a header hash below the target and still be invalid.

### 9. Nodes independently validate the block

The mining system broadcasts the corresponding full block. Each validating node performs its own checks before changing local state.

The node verifies the header proof of work and the target required at that height. It checks the parent relationship, version and activation rules, and time constraints. It recomputes transaction and witness commitments.

For the transactions, the node checks syntax, amounts, locktime and sequence rules, signatures and scripts, input availability, and spending conditions. It prevents prohibited double spends by evaluating inputs against applicable chainstate and earlier transactions in the block. It checks block weight and other consensus resource limits. It verifies the coinbase structure and confirms that the claimed value does not exceed subsidy plus fees.

If any required rule fails, the node rejects the block. The work spent producing it does not make the block acceptable.

If the block passes, it becomes a valid candidate for chain activation. Validation and chain selection are still separate decisions.

### 10. Valid candidate chains are compared by accumulated work

A node can know more than one valid branch. Two miners may produce valid blocks extending the same parent before either block has propagated widely.

Among valid candidate chains, Bitcoin Core tracks accumulated proof of work as chainwork. The node attempts to activate the valid chain with the greatest accumulated work under its rules. This is more precise than saying it selects the branch with the greatest raw block count.

Proof of work cannot make an invalid chain valid. Chainwork comparison happens only after the relevant data passes validation.

When a competing valid branch overtakes the active branch, the node can reorganize. It disconnects blocks back to the shared ancestor, reverses their chainstate effects, connects blocks from the stronger valid branch, and reconciles unconfirmed transactions.

A transaction in a disconnected block can lose confirmations, return to a mempool if still valid and acceptable, appear in the new branch, conflict with a new selected-chain spend, or remain absent.

### 11. The transaction receives confirmations

The transaction receives its first confirmation when it appears in a valid block on the node's selected chain. If another valid block extends that chain, the transaction has two confirmations from that node's current view. Each later block adds depth.

Additional depth means more proof of work has accumulated above the transaction's block. Replacing that history generally requires a competing valid branch to replace the transaction's block and overtake the continuing selected chain.

Confirmations are probabilistic settlement depth, not absolute finality. Bitcoin has no ordinary depth field that makes reorganization mathematically impossible. Deeper reorganizations are generally more difficult and less practical under normal assumptions, but the relevant risk depends on value, delivery, reversibility, counterparty behavior, hash power, connectivity, and operational context.

Wallets, merchants, exchanges, and services choose their own confirmation requirements. Those policies do not change the protocol's validity rules.

### 12. The transaction updates the UTXO set

When the block connects to selected chainstate, the transaction's inputs become spent in that state. The transaction's new outputs become available under their spending conditions, subject to later chain changes.

The recipient wallet can identify an output it controls and include that output in its displayed balance. The sender wallet can identify the change output it controls. Those balances are calculated views over separate outputs. They are not account balances stored in one central Bitcoin database.

A later transaction can reference one of the new outputs as an input, continuing the lifecycle. A reorganization can reverse active-chain state if the containing block is disconnected, which is why wallet displays and services must follow current selected history.

The complete movement is therefore not one transfer between two account rows. It is a sequence of transaction construction, authorization, local evaluation, peer propagation, optional mempool storage, miner selection, candidate-block construction, proof of work, independent validation, valid-chain selection, confirmation depth, and UTXO-state transition.

## 3. Destination structure or sequence

1. Wallet identifies spendable UTXOs and creates recipient and change outputs.
2. Signing software authorizes the defined transaction data without exposing private keys.
3. Wallet or node software performs local preflight checks.
4. One or more nodes may relay the transaction across peer connections.
5. Individual nodes may accept it into their own local mempools.
6. A miner or pool may select it for a candidate template.
7. The candidate block commits to the transaction through block structures.
8. Miners search for a header hash satisfying the required target.
9. Nodes independently validate the complete block.
10. Valid candidate branches are compared by accumulated work.
11. Selected-chain inclusion creates confirmation depth.
12. Block connection spends inputs and creates new UTXOs.

The sequence describes one ordinary on-chain lifecycle. Individual software, policy, relay paths, and reorganization outcomes can differ.

## 4. Card or step copy

### MSC-GUIDE-005 | What Is a Bitcoin Wallet?

- Companion role: Explains the software and hardware role that manages keys, constructs transactions, and presents balances.
- Editorial status: COPY_LOCKED source package
- Planned action: Continue to companion guide
- URL: None. Keep inactive until publication and URL confirmation.

### MSC-GUIDE-007 | How to Send and Receive Bitcoin

- Companion role: Provides the practical wallet workflow around destinations, review, signing, broadcast, and confirmation.
- Editorial status: COPY_LOCKED source package
- Planned action: Continue to companion guide
- URL: None. Keep inactive until publication and URL confirmation.

### MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work

- Companion role: Supplies the detailed transaction structure, fee, weight, fee-rate, and replacement foundations.
- Editorial status: COPY_LOCKED source package
- Planned action: Continue to companion guide
- URL: None. Keep inactive until publication and URL confirmation.

### MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work

- Companion role: Explains key derivation, signatures, public verification, and the limits of cryptographic authorization.
- Editorial status: COPY_LOCKED source package
- Planned action: Continue to companion guide
- URL: None. Keep inactive until publication and URL confirmation.

### MSC-GUIDE-013 | What Are UTXOs in Bitcoin?

- Companion role: Defines inputs, outputs, change, wallet balance views, coin selection, and UTXO-set state.
- Editorial status: COPY_LOCKED source package
- Planned action: Continue to companion guide
- URL: None. Keep inactive until publication and URL confirmation.

### MSC-GUIDE-014 | How Bitcoin Confirmations Work

- Companion role: Explains first confirmation, depth, competing valid branches, reorganizations, and contextual settlement policy.
- Editorial status: COPY_LOCKED source package
- Planned action: Continue to companion guide
- URL: None. Keep inactive until publication and URL confirmation.

### MSC-GUIDE-017 | How Bitcoin Mining Works

- Companion role: Details candidate-block assembly, coinbase construction, header hashing, submission, and node validation.
- Editorial status: COPY_LOCKED source package
- Planned action: Continue to companion guide
- URL: None. Keep inactive until publication and URL confirmation.

### MSC-GUIDE-018 | How Bitcoin Mining Pools Work

- Companion role: Separates template construction, pool jobs, share targets, hashing devices, block submission, and payout accounting.
- Editorial status: COPY_LOCKED source package
- Planned action: Continue to companion guide
- URL: None. Keep inactive until publication and URL confirmation.

### MSC-GUIDE-021 | What Is a Bitcoin Full Node?

- Companion role: Explains independent validation, chainstate, active-chain selection, policy, relay, and storage boundaries.
- Editorial status: COPY_LOCKED source package
- Planned action: Continue to companion guide
- URL: None. Keep inactive until publication and URL confirmation.

### MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?

- Companion role: Explains node-local admission, policy, relay, conflicts, replacement, eviction, and reorganization handling.
- Editorial status: COPY_LOCKED source package
- Planned action: Continue to companion guide
- URL: None. Keep inactive until publication and URL confirmation.

### MSC-GUIDE-026 | How Bitcoin Blocks Work

- Companion role: Details headers, transactions, coinbase rules, Merkle and witness commitments, block limits, and validation.
- Editorial status: COPY_LOCKED source package
- Planned action: Continue to companion guide
- URL: None. Keep inactive until publication and URL confirmation.

### MSC-GUIDE-027 | How the Bitcoin Blockchain Works

- Companion role: Expands selected history, chainwork, reorganizations, confirmation depth, and state updates.
- Editorial status: COPY_LOCKED source package
- Planned action: Continue to companion guide
- URL: None. Keep inactive until publication and URL confirmation.

### MSC-GUIDE-029 | How Bitcoin Proof of Work Secures the Network

- Companion role: Explains targets, costly production, cheap verification, accumulated work, and majority-hashpower limits.
- Editorial status: COPY_LOCKED source package
- Planned action: Continue to companion guide
- URL: None. Keep inactive until publication and URL confirmation.

### MSC-GUIDE-030 | How Bitcoin Reaches Consensus

- Companion role: Connects compatible validation rules, local policy, proof-of-work ordering, software choice, and coordination.
- Editorial status: COPY_LOCKED source package
- Planned action: Continue to companion guide
- URL: None. Keep inactive until publication and URL confirmation.

## 5. Key Terms

- **Wallet:** Software or hardware that manages keys, constructs transactions, and helps users interact with Bitcoin.
- **Transaction:** A data structure that spends existing UTXOs and creates new outputs.
- **UTXO:** An unspent transaction output that can be used as an input in a later transaction.
- **Input:** A transaction field that spends a previous UTXO and supplies unlocking data.
- **Output:** A transaction field that assigns value to a new locking condition.
- **Change output:** A transaction output that returns unspent input value to a wallet-controlled destination.
- **Digital signature:** Cryptographic proof that a valid private key authorized a transaction or message.
- **Transaction relay:** The peer-to-peer propagation of transactions between nodes under local policy rules.
- **Mempool:** A node's local collection of valid unconfirmed transactions eligible for relay or block inclusion.
- **Block:** A valid batch of Bitcoin transactions linked to prior chain history through proof of work.
- **Proof of work:** The computational process miners use to produce block hashes below the network target.
- **Validation:** The process of checking transactions and blocks against applicable rules.
- **Confirmation:** The inclusion of a transaction in a block, followed by additional blocks that increase settlement depth.
- **Reorganization:** A change in the selected chain tip when a competing valid chain accumulates more proof of work.

## 6. Sources

1. **Bitcoin: A Peer-to-Peer Electronic Cash System**
   Author or publisher: Satoshi Nakamoto
   URL: https://bitcoin.org/bitcoin.pdf
   Supports: Transaction chaining, digital signatures, peer-to-peer propagation, proof-of-work blocks, accumulated-work ordering, incentives, and probabilistic confirmation depth.

2. **Bitcoin Core wallet coin-selection and transaction-creation implementation**
   Author or publisher: Bitcoin Core contributors
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/wallet/spend.cpp
   Supports: Wallet input selection, recipient outputs, change creation, fee calculation, transaction construction, and wallet-specific selection constraints.

3. **Bitcoin Core signing implementation**
   Author or publisher: Bitcoin Core contributors
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/script/sign.cpp
   Supports: Producing and combining transaction signatures and the separation between transaction construction, signing, and later validation.

4. **Bitcoin Core script interpreter interface**
   Author or publisher: Bitcoin Core contributors
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/script/interpreter.h
   Supports: Signature verification, script execution, signature-hash behavior, and consensus and policy verification flags.

5. **Bitcoin Core transaction validation and chainstate implementation**
   Author or publisher: Bitcoin Core contributors
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/validation.cpp
   Supports: Transaction and block validation, mempool admission, input availability, block connection and disconnection, candidate-chain activation, reorganizations, and UTXO-state changes.

6. **Bitcoin Core peer-processing implementation**
   Author or publisher: Bitcoin Core contributors
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/net_processing.cpp
   Supports: Transaction announcements, peer requests, transaction and block relay, missing-input handling, and the limits of peer-to-peer propagation.

7. **Bitcoin Core transaction mempool implementation**
   Author or publisher: Bitcoin Core contributors
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/txmempool.cpp
   Supports: Node-local mempool storage, transaction relationships, conflicts, removal, replacement effects, and updates during chain changes.

8. **Bitcoin Core block-assembly implementation**
   Author or publisher: Bitcoin Core contributors
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/node/miner.cpp
   Supports: Candidate-block construction, transaction selection, dependency ordering, coinbase creation, subsidy-plus-fee calculation, block limits, and header preparation.

9. **Bitcoin Core block data structures**
   Author or publisher: Bitcoin Core contributors
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/primitives/block.h
   Supports: The six serialized block-header fields, the 80-byte header structure, transaction vectors, and the distinction between a header and a full block.

10. **Bitcoin Core proof-of-work implementation**
    Author or publisher: Bitcoin Core contributors
    URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/pow.cpp
    Supports: Required-target calculation, compact target decoding, proof-of-work checking, and the separation between target compliance and full block validity.

11. **Bitcoin Core chainwork implementation**
    Author or publisher: Bitcoin Core contributors
    URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/chain.cpp
    Supports: Per-block proof calculation, accumulated chainwork, and comparison of valid chain history.

12. **Bitcoin Core coins view interface**
    Author or publisher: Bitcoin Core contributors
    URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/coins.h
    Supports: The UTXO coins view, spent and unspent output records, cache layers, and the state used to validate transaction inputs.

13. **BIP 141: Segregated Witness**
    Author or publisher: Eric Lombrozo, Johnson Lau, and Pieter Wuille
    URL: https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki
    Supports: Witness programs, witness transaction identifiers, block weight, transaction and witness commitments, and consensus validation boundaries.

14. **Bitcoin Developer Guide: Transactions**
    Author or publisher: Bitcoin.org contributors
    URL: https://developer.bitcoin.org/devguide/transactions.html
    Supports: Inputs, outputs, addresses, change, transaction fees, signatures, transaction identifiers, and the UTXO transaction model.

15. **Bitcoin Developer Guide: P2P Network**
    Author or publisher: Bitcoin.org contributors
    URL: https://developer.bitcoin.org/devguide/p2p_network.html
    Supports: Peer discovery, transaction and block announcements, message exchange, relay, and node-local network views.

16. **Bitcoin Developer Guide: Block Chain**
    Author or publisher: Bitcoin.org contributors
    URL: https://developer.bitcoin.org/devguide/block_chain.html
    Supports: Block headers, Merkle commitments, proof of work, UTXO validation, confirmations, competing branches, and reorganizations.

## 7. SEO title

How a Bitcoin Transaction Moves: Wallet to Confirmation

## 8. Meta description

Trace a Bitcoin transaction through signing, peer relay, local mempools, mining, proof of work, block validation, confirmations, and UTXO updates.

## 9. Page excerpt

See how one Bitcoin transaction moves from wallet-selected outputs and signatures through relay, local mempools, mining, independent validation, confirmation depth, and updated UTXO state.

## 10. Estimated reading time

16 to 18 minutes

## 11. Planned internal links

Do not activate planned links until the destination exists as a real published page with a confirmed URL.

- MSC-GUIDE-005 | What Is a Bitcoin Wallet?
- MSC-GUIDE-007 | How to Send and Receive Bitcoin
- MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work
- MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
- MSC-GUIDE-014 | How Bitcoin Confirmations Work
- MSC-GUIDE-017 | How Bitcoin Mining Works
- MSC-GUIDE-018 | How Bitcoin Mining Pools Work
- MSC-GUIDE-021 | What Is a Bitcoin Full Node?
- MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?
- MSC-GUIDE-026 | How Bitcoin Blocks Work
- MSC-GUIDE-027 | How the Bitcoin Blockchain Works
- MSC-GUIDE-029 | How Bitcoin Proof of Work Secures the Network
- MSC-GUIDE-030 | How Bitcoin Reaches Consensus
- MSC-PATH-START | Start With Bitcoin
- MSC-PATH-NETWORK | Understand the Network
- MSC-HUB-NETWORK | The Bitcoin Network
- MSC-GLOSSARY-001 | Bitcoin Glossary

## 12. Accuracy review checklist

- [x] Registry metadata matches the approved master registry.
- [x] The walkthrough contains exactly 12 lifecycle sections in the approved order.
- [x] Wallet balances are treated as calculated views over controlled outputs rather than protocol accounts.
- [x] Addresses are distinguished from on-chain outputs.
- [x] Signing is separated from broadcast and confirmation.
- [x] Consensus validity is separated from local mempool policy.
- [x] A higher fee is not described as repairing an invalid signature or nonexistent input.
- [x] Peer relay is not described as a universal or guaranteed broadcast.
- [x] Mempools are described as node-local and temporary.
- [x] Miner selection is not guaranteed and is not restricted to one public mempool.
- [x] Candidate blocks, valid blocks, and selected-chain blocks remain distinct.
- [x] Pool template construction and connected hashing devices remain distinct.
- [x] Failed proof-of-work hashes are not described as partial progress.
- [x] Proof of work is not described as complete block validation.
- [x] Nodes independently validate proof of work, transactions, UTXOs, scripts, coinbase limits, commitments, and block limits.
- [x] Chainwork is compared only among valid candidate chains.
- [x] Confirmations are probabilistic rather than absolute finality.
- [x] UTXO-set updates are connected to selected chainstate and reorganization behavior.
- [x] Companion-guide references do not duplicate their full articles.
- [x] External URLs appear only in Sources.
- [x] Planned Internal Links contain no URLs.
- [x] Exact approved glossary definitions are used.
- [x] Human Verification remains pending.
- [x] Exactly three complete illustration briefs are included.
- [x] No em dash or en dash character appears.

## 13. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-19
- Notes:
  - Verified the complete 12-stage transaction lifecycle against the listed Bitcoin Core v31.0 sources, BIP 141, the Bitcoin white paper, and developer documentation.
  - Confirmed consensus validity remains separate from local policy; broadcast does not guarantee relay or confirmation; proof of work does not replace block validation; and chainwork comparison applies only among valid candidates.
  - Confirmed the maturity wording correction, probabilistic confirmation language, all 16 source entries, companion relationships, inactive links, synchronized glossary definitions, and exactly three illustrations remaining `PLANNED`.

## 14. Illustration brief

### Illustration 1

- Concept title: The Twelve-Stage Transaction Voyage
- Educational purpose: Show the complete lifecycle without suggesting that one central system performs every step.
- Recommended placement: After the section titled The complete movement is therefore not one transfer between two account rows.
- Visual description: Old nautical voyage chart with twelve numbered checkpoints from UTXO selection through UTXO-set update. Different vessel and station symbols distinguish wallet, peers, nodes, miners, blocks, and chainstate.
- Required labels: Select UTXOs, Sign, Local checks, Relay, Local mempools, Miner selection, Candidate block, Proof of work, Node validation, Chainwork, Confirmations, UTXO update
- Caption: A Bitcoin transaction crosses wallet, peer, node, mining, validation, and chainstate boundaries before becoming confirmed selected history.
- Alt text: Twelve-stage Bitcoin transaction lifecycle diagram from wallet UTXO selection and signing through relay, mining, validation, confirmation, and UTXO-set update.
- Image orientation: Landscape
- Mobile crop notes: Convert the voyage into a vertical numbered route with one short label per checkpoint.
- Status: PLANNED

### Illustration 2

- Concept title: Local Mempools Across Peer Routes
- Educational purpose: Prevent the route from implying one global transaction waiting room.
- Recommended placement: After the section titled Nodes may place it in local mempools.
- Visual description: Ocean-current network map with four node stations. One transaction appears in three local mempools, a conflict appears in one, and another node has not received either. Arrows show selective relay between peers.
- Required labels: Node A mempool, Node B mempool, Node C mempool, Node D, Relay, Accepted, Policy rejected, Not received, Conflict
- Caption: Nodes can receive and retain different unconfirmed transactions while still enforcing compatible block consensus rules.
- Alt text: Peer network diagram showing four Bitcoin nodes with different local mempool contents due to relay, policy, conflicts, and missing data.
- Image orientation: Landscape
- Mobile crop notes: Stack four node stations vertically and show one shared transaction plus one differing status beside each.
- Status: PLANNED

### Illustration 3

- Concept title: Proof of Work Before Full Validation
- Educational purpose: Separate a qualifying header from acceptance of the complete block.
- Recommended placement: After the section titled Nodes independently validate the block.
- Visual description: Technical checkpoint plate. A block header crosses a target gate labeled Proof of work valid, then the full block enters a larger inspection station for transactions, signatures, UTXOs, coinbase value, commitments, and resource limits. Invalid routes leave the second station.
- Required labels: Header hash, Target, Qualifying proof of work, Full block, Transactions, Signatures, UTXOs, Coinbase limit, Commitments, Block limits, Accept, Reject
- Caption: A qualifying header allows block submission, but nodes accept the block only after every required consensus check passes.
- Alt text: Bitcoin validation diagram showing a block header passing proof-of-work target checking before the full block undergoes transaction, signature, UTXO, coinbase, commitment, and resource validation.
- Image orientation: Landscape
- Mobile crop notes: Place the target gate above the full-block inspection and keep the accept and reject routes visible at the bottom.
- Status: PLANNED
