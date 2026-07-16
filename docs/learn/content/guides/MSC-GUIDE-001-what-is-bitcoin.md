---
registry_id: MSC-GUIDE-001
status: COPY_LOCKED
page_role: topic-guide
h1: What Is Bitcoin?
handle: what-is-bitcoin
category: Bitcoin Basics
subcategory: Foundations
depth: Surface
format: Explainer
primary_path: Start With Bitcoin
secondary_paths:
  - Explore the Ecosystem
author_display: Mempool Surf Club Editorial
reviewed_date: 2026-07-14
copy_locked_date: 2026-07-14
---

# What Is Bitcoin?

## 1. Introductory deck

Bitcoin is a peer-to-peer network and a digitally scarce asset. It allows people to verify and transfer value without relying on a central issuer, while placing more responsibility on users to understand keys, custody, transactions, and risk.

## 2. Full article

Bitcoin entered public view as a proposal for electronic cash that could move directly between people without requiring a financial institution to approve every payment. It has since grown into a public network, an open-source software ecosystem, and a scarce digital asset.

The clearest way to understand Bitcoin is not through price charts or slogans. Begin with the system itself.

### Bitcoin in One Clear Definition

Bitcoin is a peer-to-peer network that lets participants verify and transfer a digitally scarce asset, called bitcoin, without relying on a central issuer or transaction processor.

That definition contains two connected ideas. Bitcoin, with a capital B, refers to the network, protocol, and broader system. Lowercase bitcoin refers to units of the asset. BTC is the common ticker symbol.

No company prints new bitcoin, maintains a master account database, or has unilateral authority to rewrite the rules. Instead, independently operated computers exchange transaction and block data, verify that data against shared rules, and reject anything that fails those rules.

This does not mean every part of Bitcoin is equally decentralized. Mining, custody, software development, and services can each have points of concentration. The base network, however, does not depend on one company whose permission is required for every valid transaction.

### Bitcoin the Network and bitcoin the Asset

The Bitcoin network is the communication and verification system. Nodes relay and validate information, miners compete to produce blocks, and users create transactions.

The asset, bitcoin, is what the network accounts for. One bitcoin equals 100 million satoshis.

Bitcoin does not use a traditional account ledger where the network stores a single balance beside each person's name. Its public record contains transactions. Those transactions create outputs, and an output that has not yet been spent is called an unspent transaction output, or UTXO.

A wallet calculates what it can spend by identifying UTXOs controlled by the user's keys. The displayed balance is a convenient summary created by wallet software, not an account balance written directly into the blockchain.

### Why Bitcoin Was Created

Online payments generally depend on trusted intermediaries that keep records, approve transactions, reverse payments, and settle disputes.

Satoshi Nakamoto introduced Bitcoin in 2008 as a peer-to-peer electronic cash system intended to reduce that dependency. The central technical problem was double-spending. Digital information can be copied easily, so a digital money system needs a reliable way to prevent the same value from being spent more than once.

A centralized system solves this with one official ledger operator. Bitcoin proposed public transactions, blocks ordered through proof of work, and independent verification by network participants.

Bitcoin did not remove trust from every part of life. It made the monetary and transaction rules independently verifiable through software.

### How Bitcoin Works at a High Level

A Bitcoin payment usually moves through several stages:

1. A wallet constructs a transaction.
2. The transaction identifies existing UTXOs to spend.
3. It creates new outputs, usually including one for the recipient and sometimes one returning change to the sender.
4. The wallet signs the transaction with the required private keys.
5. The signed transaction is broadcast to peers.
6. Nodes check whether it follows the applicable rules and relay it if accepted.
7. Miners choose from available valid transactions while building candidate blocks.
8. A miner finds valid proof of work and broadcasts the block.
9. Nodes independently validate the block.
10. If accepted, the block becomes part of the node's valid chain, and the transaction receives a confirmation.

This simplified sequence captures the main flow. Different participants perform different jobs, and each node reaches its own conclusion by applying the rules it runs.

### What Nodes Do

A Bitcoin node is software that communicates with peers and checks Bitcoin data. A full node validates blocks and transactions according to the rules implemented by the software its operator chooses to run.

Nodes check matters such as whether transaction inputs refer to available UTXOs, whether required signatures are valid, whether a block satisfies proof-of-work requirements, and whether new bitcoin has been created within the permitted issuance rules.

This is why miners do not simply control Bitcoin. A miner can propose a block, but a validating node does not have to accept it. If the block breaks the rules, the node rejects it, even if the miner spent real energy producing it.

Consensus is not a ballot sent to a central counter. It emerges as participants independently apply compatible rules and converge on a valid chain with the most accumulated proof of work.

### What Miners Do

Miners assemble candidate blocks from valid transactions and compete to produce proof of work. They repeatedly hash block-header data while changing available values, searching for a result below the network's current target.

The result is difficult to produce but easy for nodes to verify. Proof of work connects block production to real-world cost, makes confirmed history expensive to rewrite, and lets the network compare competing valid chains by accumulated work.

The hash attempts do not solve an outside scientific problem, but the work is part of Bitcoin's security and ordering mechanism.

Miners also receive compensation through transaction fees and the block subsidy permitted by the protocol. Their transaction choices can affect which valid transactions confirm first, but miners cannot make an invalid transaction valid or force validating nodes to accept an invalid block.

### How Ownership and Wallets Work

A Bitcoin wallet does not hold coins as files. It manages keys and the tools needed to identify spendable UTXOs, construct transactions, and create signatures.

A private key is secret data used to authorize a spend under the relevant locking conditions. The corresponding public information can help create receiving instructions and verify signatures. A Bitcoin address is a user-facing encoding that helps a sender construct an output with particular spending conditions. An address is not the wallet itself.

Many modern wallets derive multiple keys from one underlying backup. Some present that backup as a sequence of words, often called a seed phrase or recovery phrase. A recovery phrase is not simply another name for one private key. Depending on the wallet's standard and setup, it may allow the wallet to recreate many related keys and addresses.

Control of the necessary keys usually provides the ability to authorize spending. Losing or exposing them can mean losing access or control. Self-custody shifts more responsibility to the user.

### Why bitcoin Is Scarce

Bitcoin's issuance rules are part of the consensus rules that validating nodes independently enforce. New bitcoin enters circulation through the block subsidy, which began at 50 BTC per block and is reduced by half every 210,000 blocks. Under the current rules, total issuance remains below the commonly cited limit of 21 million BTC. Scarcity here describes an issuance constraint, not a promise about market price, future demand, or purchasing power.

No central issuer can create an extra batch because demand rises or a budget changes. Participants can inspect the software, verify the issuance rules, and reject blocks that create bitcoin outside the rules they enforce.

### What Bitcoin Changes

Bitcoin gives users a way to transfer value through an open network without requiring one central payment company to maintain the authoritative record.

Its monetary rules are unusually visible. Anyone can inspect the software, run a node, and check whether blocks follow the rules.

Bitcoin can support payments, saving, automated settlement, and other uses. The network provides a base system rather than one approved reason for using it.

Bitcoin also changes the relationship between ownership and responsibility. A person who controls the necessary keys may be able to transact without asking a bank or payment company for permission. That control can be useful, but it also means mistakes may not have a customer service department capable of reversing them.

### What Bitcoin Does Not Guarantee

Bitcoin does not guarantee profit. It does not make every payment instant or free. A transaction may remain unconfirmed if its fee is too low, if it conflicts with another transaction, or if it fails relay or policy requirements.

Bitcoin transactions are public, but they are not automatically tied to legal names. This makes the system pseudonymous, not fully anonymous. Addresses and transaction patterns can sometimes be connected to people through blockchain analysis, reused addresses, exchange records, merchant information, or other outside data.

Transactions become harder to replace as more proof of work is added after them, but irreversible is not absolute. Unconfirmed transactions carry different risks, and recent blocks can occasionally be reorganized.

Bitcoin also does not protect users from every mistake. Sending to the wrong destination, mishandling backups, trusting malicious software, revealing private information, or leaving funds with an unreliable custodian can still cause loss.

Decentralization reduces certain single points of control. It does not remove operational risk, regulation, volatility, or the need for careful security.

### A Simple Example of Using Bitcoin

Suppose Maya wants to send bitcoin to Jordan.

Jordan's wallet provides receiving information, commonly shown as an address or QR code. Maya enters the destination and amount. Her wallet selects one or more UTXOs she can spend, creates an output for Jordan, may create a change output for Maya, and assigns the remaining difference as a transaction fee.

Maya reviews the details and approves the payment. Her wallet signs the transaction with the necessary private key material and broadcasts it.

Nodes receiving the transaction check it. They do not need to know Maya's or Jordan's legal identity. They need to determine whether the transaction follows the rules, including whether the referenced outputs are available and the authorization is valid.

If accepted, the transaction may enter nodes' mempools, which are local collections of valid unconfirmed transactions. A miner may select it for a candidate block. When a valid block containing the transaction is found and accepted by nodes, Jordan's payment receives its first confirmation. Later blocks add more settlement depth.

No individual step guarantees immediate inclusion. The fee, network conditions, transaction structure, node policies, and miner selection can all affect the path.

### Where to Continue Learning

The useful next question is not simply whether Bitcoin is interesting. It is why this combination of open participation, verifiable rules, digital scarcity, and user-controlled keys matters.

The next guide, Why Does Bitcoin Matter?, examines that question directly.

Readers can then continue into wallets, self-custody, transactions, mining, nodes, security, privacy, or Bitcoin's history. The deeper structure becomes clearer once each role is examined on its own.

## 3. Key Terms

**Bitcoin:** An open monetary network and asset governed by independently verified consensus rules.

**Bitcoin network:** The peer-to-peer system of nodes, miners, transactions, and consensus rules that operates Bitcoin.

**Blockchain:** The ordered history of valid Bitcoin blocks selected by accumulated proof of work.

**Node:** Bitcoin software that communicates with peers and may validate, relay, store, or serve network data.

**Miner:** An operator that constructs candidate blocks and performs proof of work.

**Proof of work:** The computational process miners use to produce block hashes below the network target.

**Transaction:** A data structure that spends existing UTXOs and creates new outputs.

**Wallet:** Software or hardware that manages keys, constructs transactions, and helps users interact with Bitcoin.

**Private key:** Secret cryptographic material used to authorize spending.

**UTXO:** An unspent transaction output that can be used as an input in a later transaction.

**Confirmation:** The inclusion of a transaction in a block, followed by additional blocks that increase settlement depth.

**Block:** A valid batch of Bitcoin transactions linked to prior chain history through proof of work.

## 4. Sources

### Bitcoin: A Peer-to-Peer Electronic Cash System

- Author or publisher: Satoshi Nakamoto
- Direct URL: https://bitcoin.org/bitcoin.pdf
- Supports: Bitcoin's peer-to-peer design, double-spending model, digital signatures, proof of work, transaction ordering, initial issuance and incentive model, and original privacy model.

### Bitcoin P2P e-cash paper

- Author or publisher: Satoshi Nakamoto
- Publisher: The Cryptography Mailing List archive
- Direct URL: https://www.metzdowd.com/pipermail/cryptography/2008-October/014810.html
- Supports: The October 2008 public introduction of Bitcoin as a peer-to-peer electronic cash system without a trusted mint.

### Bitcoin Core README

- Publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/README.md
- Supports: Bitcoin Core's role in connecting to the peer-to-peer network and fully validating blocks and transactions.

### Bitcoin Developer Guide: Block Chain

- Publisher: Bitcoin Project developer documentation
- Direct URL: https://developer.bitcoin.org/devguide/block_chain.html
- Supports: The public transaction record, independent full-node validation, consensus rules, UTXOs, blocks, proof of work, confirmations, and transaction fees.

### Bitcoin Developer Guide: Transactions

- Publisher: Bitcoin Project developer documentation
- Direct URL: https://developer.bitcoin.org/devguide/transactions.html
- Supports: Transaction inputs and outputs, UTXOs, wallet balance calculation, transaction construction, change outputs, and transaction authorization.

### Bitcoin Developer Guide: P2P Network

- Publisher: Bitcoin Project developer documentation
- Direct URL: https://developer.bitcoin.org/devguide/p2p_network.html
- Supports: Peer communication and the role of full nodes in verifying and relaying blocks and transactions.

### Bitcoin Core Consensus Amount Definitions

- Publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/consensus/amount.h
- Supports: One BTC equals 100 million satoshis and Bitcoin Core's consensus-critical monetary range check. The file explicitly states that `MAX_MONEY` is not the total money supply.

### Bitcoin Core Mainnet Consensus Parameters

- Publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/kernel/chainparams.cpp
- Supports: The 210,000-block subsidy-halving interval used on Bitcoin mainnet.

### Bitcoin Core Block Subsidy Function

- Publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/validation.cpp
- Supports: The initial 50 BTC block subsidy and the halving calculation applied at each configured subsidy interval.

### BIP 32: Hierarchical Deterministic Wallets

- Author or publisher: Pieter Wuille
- Direct URL: https://bips.dev/32/
- Supports: The derivation of multiple related wallet keys from underlying seed material.

### BIP 39: Mnemonic Code for Generating Deterministic Keys

- Authors: Marek Palatinus, Pavol Rusnak, Aaron Voisine, and Sean Bowe
- Direct URL: https://bips.dev/39/
- Supports: Mnemonic word sequences, seed generation, and their use with deterministic wallet systems.

## 5. SEO title

What Is Bitcoin? A Clear Guide to How Bitcoin Works

## 6. Meta description

Learn what Bitcoin is and how nodes, miners, wallets, proof of work, UTXOs, and digital scarcity work without a central issuer.

## 7. Page excerpt

Bitcoin is both a peer-to-peer network and a digitally scarce asset. This introductory guide explains how nodes, miners, wallets, transactions, proof of work, and Bitcoin's issuance rules fit together.

## 8. Estimated reading time

8 to 9 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- MSC-GUIDE-002 | Why Does Bitcoin Matter?
- MSC-GUIDE-003 | A History of Bitcoin
- MSC-GUIDE-005 | What Is a Bitcoin Wallet?
- MSC-GUIDE-006 | What Is Bitcoin Self-Custody?
- MSC-GUIDE-007 | How to Send and Receive Bitcoin
- MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- MSC-GUIDE-017 | How Bitcoin Mining Works
- MSC-GUIDE-021 | What Is a Bitcoin Full Node?
- MSC-GUIDE-029 | How Bitcoin Proof of Work Secures the Network
- MSC-GLOSSARY-001 | Bitcoin Glossary
- MSC-HUB-BASICS | Bitcoin Basics

## 10. Accuracy review checklist

- [x] Registry metadata matches the approved registry.
- [x] Bitcoin the network and bitcoin the asset are distinguished.
- [x] Bitcoin is not described as being controlled by a company, miner, developer, or single group.
- [x] Nodes are described as independent validators rather than passive copies of one central ledger.
- [x] Miners are described as block producers whose proposals remain subject to node validation.
- [x] Proof of work is explained as a security and ordering mechanism.
- [x] Wallets are not described as containers holding coin files.
- [x] Addresses, private keys, wallets, and recovery phrases are kept distinct.
- [x] Ownership is explained through keys and spendable UTXOs.
- [x] The blockchain is not described as an account-balance database.
- [x] The issuance schedule is described as consensus-enforced.
- [x] Total issuance is described as remaining below the commonly cited limit of 21 million BTC under current rules.
- [x] Bitcoin Core amount.h is not used as proof of the total issuance schedule.
- [x] Scarcity is separated from claims about future price, demand, or purchasing power.
- [x] Bitcoin privacy is described as pseudonymous rather than anonymous.
- [x] Transaction speed, fees, finality, and confirmation are not presented as unconditional guarantees.
- [x] No investment promise, price forecast, or universal financial recommendation appears.
- [x] Exact MSC glossary definitions are used.
- [x] Planned internal links contain no invented URLs.
- [x] No em dash or en dash character appears.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-14
- Notes:
  - Editorial accuracy review completed.
  - Recheck source URL accessibility immediately before publication.
  - Keep planned internal links inactive until real destination pages and confirmed URLs exist.

## 12. Illustration brief

### Illustration 1

- Concept title: Bitcoin the Network and bitcoin the Asset
- Educational purpose: Help readers separate Bitcoin as a distributed system from bitcoin as the asset transferred and accounted for by that system.
- Recommended placement: After the section titled Bitcoin the Network and bitcoin the Asset.
- Visual description: A restrained ocean-chart field showing a distributed mesh of nodes with no central hub. A single marked signal moves through the mesh to represent bitcoin as the asset. Use simple editorial linework with Ink and Deep as the primary colors, Sea for network structure, and small Sand markers on Paper.
- Required labels: Bitcoin network, Nodes, bitcoin asset, No central issuer
- Caption: Bitcoin is the network and protocol. bitcoin is the asset the network verifies and transfers.
- Alt text: Editorial line illustration of a distributed Bitcoin node network with a marked bitcoin unit moving through it and no central hub.
- Image orientation: Landscape
- Mobile crop notes: Keep the moving asset marker and at least five connected nodes inside the center 80 percent of the composition.
- Status: PLANNED

### Illustration 2

- Concept title: How a Bitcoin Transaction Moves
- Educational purpose: Clarify the high-level sequence from wallet construction through node validation, mempool relay, mining, block inclusion, and confirmation.
- Recommended placement: After the section titled How Bitcoin Works at a High Level.
- Visual description: A navigation-route diagram with one clear current moving through six stages. Avoid a corporate flowchart. Use layered depth lines and simple symbols for the wallet, nodes, mempool, miner, block, and confirmation.
- Required labels: Wallet, Nodes, Mempool, Miner, Block, Confirmation
- Caption: A Bitcoin transaction moves through independently operated participants before receiving confirmation in a valid block.
- Alt text: Navigation-chart style diagram showing a Bitcoin transaction moving from a wallet to nodes, a mempool, a miner, a block, and confirmation.
- Image orientation: Landscape
- Mobile crop notes: Allow the route to stack vertically while preserving the six stages in order.
- Status: PLANNED

### Illustration 3

- Concept title: Keys Control Spending, Wallets Manage the Process
- Educational purpose: Correct the misconception that a wallet stores coin files and show that keys authorize spending from transaction outputs.
- Recommended placement: After the section titled How Ownership and Wallets Work.
- Visual description: A minimal technical plate showing a wallet tool managing a key, a group of spendable outputs, and a signed transaction. The wallet should appear as an interface and organizer, not as a container holding coins. Use Ink linework, Sea structural accents, and Sand highlights.
- Required labels: Wallet, Private key, Spendable output, Signed transaction
- Caption: A wallet manages keys and transactions. The keys authorize spending from available Bitcoin outputs.
- Alt text: Editorial diagram showing wallet software managing a private key, spendable transaction outputs, and a signed Bitcoin transaction.
- Image orientation: Square
- Mobile crop notes: Keep the wallet, key, and spendable output relationship centered with all four labels readable.
- Status: PLANNED
