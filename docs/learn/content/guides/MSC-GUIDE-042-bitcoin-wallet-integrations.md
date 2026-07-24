---
registry_id: MSC-GUIDE-042
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: How Bitcoin Wallet Integrations Work
handle: bitcoin-wallet-integrations
category: Building on Bitcoin
subcategory: Development
depth: Deep
format: Technical Analysis
primary_path: Build on Bitcoin
secondary_paths:
  - Use Bitcoin Safely
  - Understand the Network
author_display: Mempool Surf Club Editorial
reviewed_date: null
copy_locked_date: null
---

# How Bitcoin Wallet Integrations Work

## 1. Introductory deck

A Bitcoin wallet integration is a coordinated system for discovering relevant chain activity, managing scripts and UTXOs, constructing transactions, enforcing approvals, signing, broadcasting, monitoring confirmations, and recovering state. This guide explains those responsibilities across custodial, self-custodial, watch-only, hardware-signing, and hosted architectures without treating address generation, transaction detection, or broadcast as proof of settlement.

## 2. Full article

Adding “Bitcoin payments” to an application is not one function call. A wallet integration must connect several responsibilities that may live in different processes, devices, or organizations:

- Define who controls spending keys.
- Derive scripts and addresses.
- Discover transactions relevant to those scripts.
- Track confirmed and unconfirmed UTXOs.
- Construct recipients, change, fees, sequences, and locktimes.
- Obtain approvals and signatures.
- Finalize and broadcast transactions.
- Reconcile mempool, confirmation, replacement, conflict, and reorganization state.
- Preserve enough information to recover the wallet and the application’s records.

The important question is not whether an application “has a wallet.” It is where each responsibility sits and what evidence the application accepts.

### Custodial, self-custodial, watch-only, and signing-service models

In a **custodial architecture**, an operator controls the keys or spending policy on behalf of users. User balances may exist partly or entirely in an internal ledger. A withdrawal request becomes an application instruction to the custodian, not direct proof that a specific UTXO belongs to the user. Custody requires strong authorization, accounting, withdrawal review, segregation, and incident-response controls.

In a **self-custodial architecture**, the user or user-controlled device holds the spending authority. The application may help derive addresses, build transactions, or find chain data, but it cannot spend without the user’s keys or signer. Self-custody reduces operator control over funds while increasing the importance of backup, compatibility, user verification, and device security.

A **watch-only architecture** contains scripts, descriptors, or extended public keys but no private signing material. It can derive addresses, identify relevant transactions, and construct unsigned transactions. Watch-only systems are useful for accounting, monitoring, and separation of duties, but they can still expose sensitive wallet activity.

A **signing-service architecture** keeps keys in a separate service, hardware security module, hardware wallet, or offline system. An online coordinator prepares a transaction or PSBT, while the signer applies policy and authorizes signatures. This separation can reduce key exposure, but only if authentication, approval logic, transaction verification, are designed correctly.

These models can be combined. A company may use a watch-only online wallet, a policy service, and multiple hardware signers. A mobile wallet may hold keys locally while using a hosted indexer. A custodial service may use external signing devices internally. ### Embedded libraries versus external wallet services

An embedded wallet library runs wallet logic inside the application or a closely related process. It may manage descriptors, derivation, transaction graphs, persistence, coin selection, and PSBT construction. This can reduce network dependencies and allow application-specific control. It also places wallet-state migrations, dependency security, concurrency, and possibly secrets inside the application boundary.

An external wallet service exposes wallet operations over an authenticated interface. Bitcoin Core wallet RPC is one example of an external process boundary. A custom signing or custody service is another. External services can isolate permissions and reduce the number of components that handle keys, but they introduce network, availability, authorization, versioning, and operational dependencies.

The relevant questions are which process holds keys, which process can change destinations or fees, how requests are authenticated, how duplicate operations are handled, and what state must be restored after failure.

### Synchronization models

A wallet must identify chain activity relevant to its scripts. Common synchronization models include full-node-backed, Electrum-backed, Esplora-backed, and compact-filter-backed designs.

A **full-node-backed wallet** can use Bitcoin Core wallet functionality or custom logic connected to a validating node. The node validates blocks and transactions, but custom wallet software still needs a method for finding relevant scripts. Bitcoin Core’s wallet maintains its own wallet state; a bare full node does not automatically answer arbitrary address-history queries.

An **Electrum-backed wallet** queries or subscribes to script hashes through an Electrum-protocol server. The server maintains an external index. The wallet can obtain histories, balances, and transaction data efficiently, but it depends on the server’s chain tip, index correctness, protocol version, privacy practices, and availability. A client that validates headers and Merkle proofs gains evidence of transaction inclusion, but it does not independently validate every block and transaction rule as a full node does.

An **Esplora-backed wallet** calls HTTP endpoints backed by an indexer. It may retrieve addresses, scripts, transactions, UTXOs, blocks, fee estimates, and mempool information. The same trust questions apply: what validates the chain, which fields are indexed or cached, how reorganizations are represented, and what requests are logged?

A **compact-filter-backed wallet** obtains block headers and BIP 157/158 compact filters, matches wallet scripts locally, then downloads candidate blocks. This can reduce direct disclosure of individual addresses or script hashes. It still requires correct filter-header handling, false-positive handling, block retrieval, chain selection, and local scanning. A malicious source can omit or delay data unless the client cross-checks appropriately.

### Key-generation boundaries

Private keys and seed material should be generated inside the component intended to hold signing authority. A browser frontend, application log, analytics event, crash report, public fixture, or ordinary environment dump should not become an accidental key-management system.

Seed material is not the same as every key, descriptor, or wallet record. Hierarchical deterministic wallets derive many keys from a root according to defined paths. BIP 32 extended keys combine a key with chain code and derivation metadata. Wallets may also depend on script types, derivation paths, key origins, checksums, multisignature ordering, Miniscript policies, and application labels.

A seed can reproduce keys under the same derivation scheme. It may not reproduce all information needed to identify which scripts to scan, how a multisignature policy was assembled, which descriptors were imported, which accounts were used, or which application records were reserved.

Key-generation boundaries should therefore be documented alongside descriptor and recovery data, not only as “we have the seed.”

### Extended public keys and privacy

An extended public key, or xpub in common terminology, can derive a branch of public keys without exposing the corresponding private keys. This is useful for watch-only wallets and address generation.

It is also privacy-sensitive. Anyone who obtains an extended public key and knows the derivation scheme may derive many wallet addresses and observe related transactions. Sharing an xpub with a hosted service can reveal a broad view of wallet activity rather than one payment request.

Applications should minimize where extended public keys are stored, restrict access, separate account scopes where appropriate, and avoid placing them in analytics, support tickets, or client logs. An xpub is not a spending secret, but it is not harmless public metadata.

### Descriptor wallets and script types

Output descriptors describe the scripts a wallet watches or controls. They can include key origins, derivation paths, branches, and script wrappers. Descriptor wallets make the wallet’s script policy more explicit than an undocumented assumption about one address type.

Common script types include legacy P2PKH, wrapped SegWit, native SegWit, and Taproot output forms. Each has different address encodings, fee characteristics, signing data, and compatibility. Multisignature and Miniscript policies add further structure.

An integration must enforce network and address compatibility. A syntactically valid address for mainnet must not be accepted as a testnet destination. Some libraries represent addresses as unchecked until the network is confirmed. Applications should not silently reinterpret one network as another.

Script compatibility also extends to signers. A wallet library may construct a Taproot or Miniscript spend that a selected hardware wallet or external signer does not support. Compatibility should be tested against exact software and firmware versions.

### Address derivation, change, and discovery

Wallets typically derive receiving and change scripts from separate branches. A receive address can be shown before funds arrive. That does not mean payment has been detected.

Payment detection requires scanning the relevant chain and mempool data. Confirmation requires inclusion in a block on the wallet’s accepted chain. More confirmations reduce ordinary reorganization risk but do not create absolute irreversibility.

Wallets that generate addresses ahead of observed use may apply a **gap limit** or other discovery rule. If an application derives far beyond the expected range without preserving the last-used state, recovery software may stop scanning before it reaches used addresses. Descriptor range data and last-revealed indexes may therefore matter.

Change addresses require the same care as recipient addresses. The wallet must identify which output is change, derive it from the intended descriptor, preserve it during signing, and later track it. A signer should not assume an unlabeled second output is legitimate change.

Address reuse can connect payments and reduce privacy. Hosted synchronization can further link queries by address, script hash, xpub, account, and IP address.

### Watch-only wallets and external signing

A watch-only wallet can track scripts and build unsigned transactions while keys remain elsewhere. This architecture can separate online observation from signing, but the unsigned transaction remains security-sensitive.

An online coordinator can lie about the recipient, amount, fee, inputs, change, or application context. A signer that only checks signature validity may authorize a transaction the user did not intend. Hardware wallets and offline signers should verify as much transaction and policy information as they can, and users should review displayed details.

Air-gapped workflows can reduce network exposure, but parsing, firmware, transfer-media, and display risks remain.

### PSBT version and signer compatibility

PSBT allows a coordinator to collect transaction and signing information without exposing private keys. Version 0 is defined by BIP 174. Version 2 is defined by BIP 370. Taproot and MuSig2 use additional fields defined by later BIPs.

A wallet integration must know which PSBT versions and fields each signer preserves and understands. Some software can sign version 0 but not version 2. Some can convert formats but may not preserve proprietary or unknown fields. Some hardware devices support a script type only under specific key-origin or descriptor conditions.

The integration should test:

- PSBT version acceptance
- Unknown-field preservation
- Taproot and multisignature fields
- Input UTXO requirements
- Key-origin information
- Change detection
- Finalization behavior
- Multiple signer ordering
- Partial failure and retry

A PSBT that receives signatures is not automatically safe. Signatures prove authorization by keys under Bitcoin’s signature rules. They do not prove that the application selected the correct recipient, amount, fee, or change output.

### Transaction construction

Transaction construction begins with a set of intended payments and available UTXOs. The wallet chooses inputs, creates recipient outputs, usually creates change, sets version and locktime, assigns input sequences, and calculates fees.

**Coin selection** balances fee cost, privacy, UTXO consolidation, confirmation status, script types, and application policy. Different algorithms can produce different valid transactions.

**UTXO locking or reservation** prevents two concurrent requests from spending the same input. A reservation is application state, not Bitcoin consensus. It can expire incorrectly, be lost after a crash, or conflict with another wallet instance. The application must reconcile reservations against actual mempool and chain state.

**Recipient outputs** must match the user’s intended address and amount. Address parsing should be network-aware and checksum-validated.

**Change** should return excess value to a wallet-controlled script. The wallet and signer need enough descriptor information to recognize it.

**Fees** depend on transaction weight and fee rate. Applications must use explicit units such as satoshis per virtual byte. Floating-point bitcoin amounts and ambiguous “bytes” can produce serious errors.

**Dust** is primarily a policy concept in this context. Bitcoin Core’s current dust threshold calculations affect standard transaction relay and wallet construction. Dust policy can change by implementation and version; it is not a universal fixed consensus minimum for all outputs.

A transaction may satisfy consensus rules yet fail a node’s current mempool policy. Construction tests should therefore include the exact node and network policy expected in production.

### Signing, finalization, and broadcast

Signing applies one or more signatures according to the scripts and sighash rules of the selected inputs. Finalization assembles the witness and script data required for network serialization.

A valid signature proves that the relevant key authorized the signed transaction data under the selected sighash. It does not prove the transaction matches human intent. Signers should verify recipients, amounts, fees, change, and policy before signing.

Broadcast sends the finalized transaction to a node or service. A successful RPC or API response may mean only that the service received or accepted the request. It does not guarantee that every node accepts the transaction, that peers relay it, that miners include it, or that it confirms.

Applications should distinguish:

- Constructed
- Partially signed
- Fully signed
- Finalized
- Submitted
- Accepted by a particular mempool
- Observed by other nodes
- Confirmed in a block
- Reorganized or conflicted

Collapsing those states into “paid” creates operational and accounting errors.

### Mempool acceptance and local policy

A node’s mempool contains transactions it currently accepts under local policy. Policy covers standardness, fees, package limits, replacement, resource limits, and other implementation behavior.

Two nodes can have different mempools. A transaction may be accepted by the broadcasting node and absent elsewhere. It can be evicted, replaced, expire, conflict with another transaction, or be mined after disappearing from one observed mempool.

Applications should record which node or service produced a mempool status and when. They should not treat a hosted “seen” flag as consensus state.

### Confirmations and reorganizations

A transaction is confirmed when it is included in a block on the wallet’s current accepted chain. Confirmation count is derived from the transaction’s block height and the current chain tip.

A reorganization can disconnect the block. The transaction may return to a mempool, confirm in a different block, be replaced by a conflict, or disappear. Application balances, invoices, reservations, and fulfillment records must be able to move backward as well as forward.

Confirmation is therefore not absolute irreversibility. Applications should define risk-sensitive confirmation policies without presenting them as guarantees. High-value or externally irreversible actions may require more evidence and operational review than low-risk actions.

### Replacement and fee bumping

Replace-by-fee, commonly called RBF, allows some unconfirmed transactions to be replaced under node policy. BIP 125 documents the original opt-in replacement policy, but current Bitcoin Core replacement behavior must be checked against the current implementation and release because policy has evolved.

Child-pays-for-parent, or CPFP, spends an output from an unconfirmed parent with a fee that raises the effective package incentive. Whether a package is accepted or mined depends on current policy, package relationships, and miner behavior.

Wallet integrations should treat RBF and CPFP as policy-sensitive mechanisms. They should test replacement eligibility, fee calculations, recipient preservation, change handling, conflicts, and UI status. A fee bump does not guarantee confirmation.

### Abandonment, rebroadcast, and conflicts

A wallet may mark an unconfirmed transaction as abandoned locally, but local abandonment does not erase the transaction from peers or prevent later confirmation if it remains valid and available elsewhere.

Rebroadcast behavior is implementation-specific and can leak timing or wallet information. Applications should avoid blind multi-provider rebroadcast loops.

Conflict handling should identify transactions that spend the same inputs. The application must decide which state is provisional, which invoices remain open, and how to reconcile a confirmed conflict. Internal records should preserve history rather than overwrite the first transaction without explanation.

### Balance categories

A single “balance” number can hide important distinctions.

**Confirmed funds** are UTXOs in blocks on the current accepted chain.

**Unconfirmed funds** are associated with transactions not yet confirmed and may depend on local mempool observations.

**Immature funds** include coinbase outputs that cannot yet be spent under consensus maturity rules.

**Available funds** are funds the wallet currently considers selectable after applying confirmations, policy, locks, and application rules.

**Reserved funds** are UTXOs the application has assigned to an in-progress operation. Reservation is local state and must be reconciled after failures.

Wallet libraries and services may define balance categories differently. Applications should map exact source fields into their own explicit model rather than assume names are universal.

### Backup and recovery

A wallet backup should be tested, not merely created. Recovery needs vary by architecture.

A seed may restore deterministic keys but not necessarily:

- Descriptor checksums and ranges
- Script or Miniscript policy
- Multisignature cosigner keys and ordering
- Key origins and derivation paths
- Imported watch-only scripts
- Labels and transaction metadata
- UTXO reservations
- Approval records
- Invoice mappings
- Hardware device configuration
- External signer policy
- Application database state

Descriptor wallets can make script recovery more explicit, but descriptors must themselves be backed up and protected according to whether they contain private or public key material.

Multisignature recovery requires enough cosigner and policy information to reconstruct the same spending scripts. A set of seeds without the correct policy and derivation can be insufficient.

Recovery testing should occur on an isolated environment using exact documented software versions. The test should verify address derivation, history discovery, balance reconstruction, transaction creation, signer compatibility, and reorganization handling.

### Authentication, authorization, and approval controls

Wallet operations should not be exposed as unrestricted node or wallet administration.

Authentication establishes which user or service is making a request. Authorization determines which wallets, amounts, destinations, and operations that identity may use. Approval controls can require multiple people, delayed review, destination allowlists, transaction limits, or independent signer confirmation.

Rate limiting reduces abuse and accidental request storms. Idempotency prevents a retried withdrawal request from creating multiple transactions. Audit logs should record decisions and identifiers without exposing private keys, seed phrases, authentication secrets, or unnecessary PSBT data.

Secret redaction must cover application logs, RPC traces, exception reports, analytics, support exports, and monitoring systems. Sensitive wallet metadata can remain dangerous even when private keys are absent.

### Privacy boundaries

Wallet integration leaks can occur through address reuse, xpub exposure, hosted address queries, script-hash subscriptions, IP addresses, transaction broadcasts, timing patterns, and centralized logs.

Local nodes and compact filters can reduce some hosted-query leakage, but peer and broadcast behavior can still reveal information.

Privacy claims should be scoped to a defined attacker, architecture, and configuration. “Self-hosted” and “non-custodial” do not automatically mean private.

### Testing and monitoring

Regtest should cover address derivation, payments, change, coin selection, PSBT exchange, signer rejection, replacement, CPFP, abandonment, conflict, and recovery.

Reorganization tests should confirm that:

- Confirmations can decrease.
- Payments can return to unconfirmed state.
- Reserved or spent UTXOs are recalculated.
- Application fulfillment does not silently remain final.
- Indexers and wallet databases roll back correctly.
- Conflicting transactions are surfaced.

Production monitoring should compare the wallet’s chain tip with its validating node or backend, track sync lag, record failed broadcasts, detect signer incompatibility, and alert on unexplained balance or UTXO changes.

Monitoring is evidence about components, not consensus itself. An application database can be internally consistent and still follow the wrong chain tip or stale index.

### The working model

A Bitcoin wallet integration is a state machine across multiple trust boundaries.

Keys or signers authorize spends. Descriptors and derivation define scripts. Chain backends provide validated or indexed data. Wallet logic discovers transactions and maintains UTXOs. Transaction builders choose inputs, outputs, change, and fees. Signers verify and authorize. Nodes apply mempool policy and broadcast. Blocks create confirmation state. Reorganizations can reverse that state. Application databases map all of it to users, invoices, approvals, and accounting.

Address generation is not payment detection. Detection is not confirmation. Confirmation is not absolute irreversibility. A signature is not proof of transaction intent. A seed is not always a complete recovery package. A hosted backend is not self-validation.

A reliable integration keeps each statement precise, preserves the information needed to recover, and tests how state moves backward when assumptions fail.

## 3. Key Terms

- **Custodial wallet:** A wallet architecture in which an operator controls spending authority for users.
- **Self-custodial wallet:** A wallet architecture in which the user or user-controlled signer retains spending authority.
- **Watch-only wallet:** A wallet that tracks scripts and transactions without holding the private keys required to spend.
- **Extended public key:** A BIP 32 public key plus chain code that can derive a branch of public keys.
- **Descriptor:** A structured description of wallet scripts, keys, origins, and derivation.
- **Gap limit:** A wallet discovery rule limiting how far beyond known activity unused derived scripts are scanned.
- **UTXO:** An unspent transaction output available to be spent under its locking conditions.
- **Coin selection:** The wallet process for choosing UTXOs to fund a transaction.
- **PSBT:** A container used to coordinate transaction information and partial signatures.
- **Mempool:** A node’s local set of unconfirmed transactions accepted under current policy.
- **RBF:** Replacement of an unconfirmed transaction under applicable node policy.
- **CPFP:** Spending an unconfirmed output with a child transaction whose fee may improve package confirmation incentives.
- **Reorganization:** A switch to a different accepted chain that can disconnect previously confirmed transactions.
- **Idempotency:** A property that allows a request to be retried without creating unintended duplicate effects.
- **Reserved funds:** UTXOs held aside by application logic for an in-progress operation; reservation is not consensus state.

## 4. Sources

1. **Bitcoin Core Downloads** | Bitcoin Core project
   - URL: https://bitcoincore.org/en/download/
   - Supports: Bitcoin Core 31.1 as the current release used for dated implementation references on July 23, 2026.
2. **Bitcoin Core v31.1 Wallet Documentation** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/doc
   - Supports: Current Bitcoin Core wallet, RPC, descriptor, PSBT, fee-bumping, and operational documentation.
3. **Bitcoin Core v31.1 Wallet RPC Reference** | Bitcoin Core contributors
   - URL: https://bitcoincore.org/en/doc/31.0.0/rpc/wallet/
   - Supports: Wallet RPC categories for balances, transaction construction, signing, PSBT, locking, abandonment, and fee bumping; exact 31.1 behavior is additionally dated to source and release notes.
4. **Bitcoin Core JSON-RPC Interface** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/JSON-RPC-interface.md
   - Supports: Wallet-specific endpoints, RPC versioning, authentication context, and network-exposure boundaries.
5. **BIP 32: Hierarchical Deterministic Wallets** | Pieter Wuille
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki
   - Supports: Extended key structure, child derivation, and public derivation boundaries.
6. **BIP 44: Multi-Account Hierarchy** | Marek Palatinus and Pavol Rusnak
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
   - Supports: One common account and change derivation convention and its address-gap discovery model.
7. **BIP 49: P2WPKH Nested in P2SH** | Daniel Weigl
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0049.mediawiki
   - Supports: A common derivation convention for wrapped SegWit single-key wallets.
8. **BIP 84: Native SegWit Derivation Scheme** | Pavol Rusnak
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0084.mediawiki
   - Supports: A common derivation convention for native SegWit single-key wallets.
9. **BIP 86: Key-Derivation for Single-Key Taproot** | Ava Chow
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0086.mediawiki
   - Supports: A common derivation convention for single-key Taproot outputs.
10. **Output Script Descriptors BIPs 380–386** | Bitcoin BIPs contributors
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0380.mediawiki
    - Supports: Descriptor syntax, checksums, key expressions, derivation, and common script expressions.
11. **BIP 174: Partially Signed Bitcoin Transaction Format** | Andrew Chow
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0174.mediawiki
    - Supports: PSBT version 0 fields and partial-signing coordination.
12. **BIP 370: PSBT Version 2** | Andrew Chow
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0370.mediawiki
    - Supports: PSBT version 2 and its format differences.
13. **BIP 371: Taproot Fields for PSBT** | Andrew Chow, Sanket Kanjalkar, and Nadav Ivgi
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0371.mediawiki
    - Supports: PSBT fields used for Taproot inputs and outputs.
14. **BIP 125: Opt-in Full Replace-by-Fee Signaling** | David Harding and Peter Todd
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0125.mediawiki
    - Supports: The original opt-in RBF signaling and replacement-policy model; current Bitcoin Core policy is separately supported by current source.
15. **Bitcoin Core v31.1 Mempool Policy Source** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/src/policy
    - Supports: Dated implementation evidence for standardness, dust, fees, and mempool policy.
16. **Bitcoin Core v31.1 Wallet Source** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/src/wallet
    - Supports: Dated implementation evidence for descriptors, balances, transaction creation, coin selection, locks, signing, rebroadcast, conflicts, abandonment, and fee bumping.
17. **BIP 157: Client Side Block Filtering** | Olaoluwa Osuntokun, Alex Akselrod, and Jim Posen
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0157.mediawiki
    - Supports: Peer retrieval and client synchronization using compact block filters.
18. **BIP 158: Compact Block Filters** | Olaoluwa Osuntokun and Alex Akselrod
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0158.mediawiki
    - Supports: Compact filter construction and local script matching.
19. **Electrum Protocol Documentation** | Electrum protocol contributors
    - URL: https://electrum-protocol.readthedocs.io/en/latest/
    - Supports: Script-hash subscriptions, history, transaction retrieval, protocol negotiation, and Merkle-proof behavior.
20. **Esplora API Documentation** | Blockstream contributors
    - URL: https://github.com/Blockstream/esplora/blob/master/API.md
    - Supports: Esplora-style transaction, address, script, UTXO, block, fee, and mempool endpoints.
21. **Bitcoin Dev Kit Wallet Releases** | Bitcoin Dev Kit contributors
    - URL: https://github.com/bitcoindevkit/bdk/releases
    - Supports: BDK’s component-specific release history and migration away from the deprecated legacy `bdk` 0.x crate.
22. **bdk_wallet 3.1.0 Documentation** | Bitcoin Dev Kit contributors
    - URL: https://docs.rs/bdk_wallet/3.1.0/bdk_wallet/
    - Supports: `bdk_wallet` 3.1.0 as the current documented release reviewed on July 23, 2026 and its descriptor wallets, address derivation, transaction construction, coin selection, signing, persistence, and wallet-state interfaces.
23. **Bitcoin Core Hardware Wallet Interface Releases** | HWI contributors
    - URL: https://github.com/bitcoin-core/HWI/releases
    - Supports: Current HWI release history and device, testnet4, PSBT, and MuSig2 support notes.
24. **Bitcoin Core Functional Wallet Tests** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/test/functional
    - Supports: Current implementation tests for wallet transactions, PSBTs, replacement, fee bumping, conflicts, rescan, backup-related behavior, and reorganizations.
25. **Bitcoin Core ZMQ Documentation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/zmq.md
    - Supports: Notification loss, sequence tracking, mempool events, and reorganization reconciliation requirements.

## 5. SEO title

How Bitcoin Wallet Integrations Work | Mempool Surf Club

## 6. Meta description

Learn how Bitcoin wallet integrations handle keys, descriptors, synchronization, UTXOs, PSBTs, signing, broadcast, confirmations, recovery, and privacy.

## 7. Page excerpt

A technical guide to wallet integration architecture, from custody and chain synchronization to transaction construction, external signing, fee bumping, recovery, authorization, and reorganization handling.

## 8. Estimated reading time

21 to 25 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-041 | Bitcoin Developer Tools: A Practical Overview
- Next: MSC-GUIDE-043 | Bitcoin APIs Explained
- Prerequisite: MSC-GUIDE-005 | What Is a Bitcoin Wallet?
- Prerequisite: MSC-GUIDE-007 | How to Send and Receive Bitcoin
- Prerequisite: MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- Prerequisite: MSC-GUIDE-009 | What Is a Bitcoin Seed Phrase?
- Prerequisite: MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
- Prerequisite: MSC-GUIDE-014 | How Bitcoin Confirmations Work
- Prerequisite: MSC-GUIDE-019 | What Is a Bitcoin Node?
- Branch: MSC-GUIDE-044 | How Bitcoin Indexers Work
- Return: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-SAFE | Use Bitcoin Safely
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] Registry metadata matches the approved registry.
- [x] Bitcoin consensus is separated from wallet, library, signer, node, and application behavior.
- [x] Consensus-valid transactions are distinguished from transactions accepted under current node policy.
- [x] Node validation is separated from API, Electrum, Esplora, compact-filter, and wallet-database responses.
- [x] Confirmed-chain state is separated from local mempool observations and application reservations.
- [x] Validation is separated from wallet synchronization and index-derived state.
- [x] Self-hosted and hosted synchronization trust and privacy boundaries are explicit.
- [x] Version-sensitive Bitcoin Core, BDK, HWI, descriptor, PSBT, RBF, and policy claims are dated or scoped.
- [x] Key-generation, watch-only, hardware, air-gapped, and external-signing boundaries are explicit.
- [x] No instructions for extracting, transmitting, or logging private keys or seed phrases are included.
- [x] Address generation, payment detection, confirmation, and irreversibility are not collapsed.
- [x] A valid signature is not presented as proof of recipient, amount, fee, change, or user intent.
- [x] Seed backup is distinguished from complete descriptor, multisignature, policy, and application recovery.
- [x] RBF and CPFP are presented as implementation and policy-sensitive mechanisms.
- [x] Reorganization, conflict, abandonment, rebroadcast, and rollback states are explicit.
- [x] No provider, library, wallet, signer, or implementation is presented as universally authoritative.
- [x] No fee, confirmation, uptime, privacy, recovery, security, or compatibility guarantee is made.
- [x] Sources are mapped only to claims they support.
- [x] No price, investment, market, or promotional claims are included.
- [x] Planned internal links remain inactive and do not imply publication.

## 11. Human verification

- Reviewer:
- Review date:
- Notes: Pending verification of signing architecture, descriptor and derivation behavior, PSBT version and signer compatibility, current fee-bumping and dust policy, backup and recovery requirements, reorganization and conflict handling, authentication controls, and hosted synchronization privacy boundaries.

## 12. Illustration brief

### Illustration 1

- Concept title: Wallet Transaction Lifecycle Chart
- Educational purpose: Show the state transitions from address derivation and detection through construction, signing, broadcast, mempool observation, confirmation, and possible reorganization.
- Recommended placement: After the section Signing, finalization, and broadcast.
- Visual description: Vintage nautical route chart with a transaction vessel moving through labeled stations and a branching rollback current from confirmed state back to unconfirmed or conflicted state.
- Required labels: Address derived, Transaction detected, Constructed, PSBT, Signed, Broadcast, Mempool, Confirmed, Reorganization, Conflict
- Caption: Wallet state advances through several local and network observations, and some states can move backward.
- Alt text: Technical lifecycle diagram showing a Bitcoin transaction moving from address derivation to confirmation with reorganization and conflict paths.
- Image orientation: Landscape
- Mobile crop notes: Use a vertical state flow with rollback arrows along the right edge.
- Status: PLANNED

### Illustration 2

- Concept title: Signing-Boundary Architecture
- Educational purpose: Separate online watch-only coordination from external hardware, air-gapped, or service-based signing authority.
- Recommended placement: After the section Watch-only wallets and external signing.
- Visual description: Muted network map with an online wallet station creating a PSBT, an approval checkpoint, three possible signer islands, and a return route carrying signatures without private keys leaving the signer boundary.
- Required labels: Watch-only wallet, PSBT coordinator, Approval policy, Hardware signer, Air-gapped signer, Signing service, Private keys remain here, Finalization
- Caption: A signing boundary limits key exposure only when transaction verification, authorization, and recovery are also enforced.
- Alt text: Systems map showing a watch-only coordinator exchanging PSBT data with separate hardware, air-gapped, and service signers.
- Image orientation: Landscape
- Mobile crop notes: Stack coordinator, approval, signer, and finalization as four vertical zones.
- Status: PLANNED

### Illustration 3

- Concept title: UTXO, Recipient, Change, and Fee Flow
- Educational purpose: Explain how coin selection and transaction construction transform selected UTXOs into recipient outputs, change, and fees.
- Recommended placement: After the section Transaction construction.
- Visual description: Nautical engineering diagram with selected input reservoirs feeding a construction gate that divides value into recipient docks, a wallet-controlled change dock, and a fee channel.
- Required labels: Selected UTXOs, Coin selection, Recipient output, Change output, Fee, Dust policy, Reserved UTXO, Signer verification
- Caption: A valid transaction can still be wrong if inputs, recipients, change, or fees do not match the intended payment.
- Alt text: Technical flow diagram showing selected Bitcoin UTXOs divided into recipient outputs, change, and transaction fees.
- Image orientation: Landscape
- Mobile crop notes: Arrange inputs at top, construction in the center, and recipient, change, and fee outputs below.
- Status: PLANNED
