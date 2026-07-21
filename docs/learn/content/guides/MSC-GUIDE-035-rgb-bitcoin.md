---
registry_id: MSC-GUIDE-035
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: How RGB Works on Bitcoin
handle: rgb-bitcoin
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

# How RGB Works on Bitcoin

## 1. Introductory deck

RGB is a client-side-validated smart-contract system that uses single-use seals and commitments in Bitcoin transactions without asking Bitcoin nodes to validate complete RGB contract histories. Understanding it requires separating Bitcoin confirmation from contract validation, and protocol rules from the wallets, libraries, data services, and transfer packages that make those rules usable.

## 2. Full article

RGB is a client-side-validated smart-contract system for representing and transferring digital rights with commitments anchored in Bitcoin transactions. Contract participants exchange the data needed to validate state changes, while Bitcoin supplies ordered transaction history and proof that UTXO-based seals were closed.

RGB is not a separate coin or proof-of-work blockchain. It also does not place a conventional global token ledger inside Bitcoin. Bitcoin nodes validate Bitcoin transactions, blocks, scripts, and UTXO spends. They do not execute RGB contract logic, calculate RGB balances, or store every RGB transfer.

That boundary defines both RGB's design and its operational burden.

### What RGB is designed to do

A globally replicated contract system asks many participants to download or validate state they may never use. RGB takes a different approach. A holder or recipient validates the contract history needed for the rights being received, rather than expecting every Bitcoin node to validate every contract.

This design can support fungible state, unique or non-fungible state, and more general programmable rights. The contract data can remain outside the public Bitcoin ledger while compact commitments are published through Bitcoin transactions.

The benefit is selective disclosure and reduced global data replication. The tradeoff is that transfer data must reach the recipient, remain compatible with the recipient's software, and be backed up well enough for later validation and spending.

### Client-side validation is not Bitcoin consensus validation

Bitcoin consensus validation asks whether a Bitcoin transaction or block follows Bitcoin's shared rules. A full node checks signatures, scripts, input availability, amounts, block limits, proof of work, and other consensus conditions.

Client-side validation asks a different question. Given an RGB contract and a proposed transfer, does the supplied contract history prove that the transferred state was created and moved according to the RGB rules being applied?

The recipient's RGB software performs that work. It checks the contract origin, relevant operations, state rules, seals, commitments, and Bitcoin witness history. Bitcoin nodes do not return an answer such as "this RGB transfer is valid."

A confirmed Bitcoin commitment therefore proves that particular commitment data was anchored in an ordered Bitcoin transaction. It does not prove by itself that the external contract data is complete, non-conflicting, or valid under the relevant RGB contract rules.

### Single-use seals connect rights to one-time events

A single-use seal is a commitment primitive designed to be closed once.

In Bitcoin-based RGB, a seal definition can identify a Bitcoin transaction output. That output is an ordinary UTXO from Bitcoin's perspective. RGB software gives its future spend an additional client-side meaning.

When a valid Bitcoin transaction spends the associated output, the seal is closed. Bitcoin consensus prevents the same UTXO from being spent twice in the selected chain. RGB validation uses that unique spend event as evidence that prior owned state was consumed.

The seal does not place the RGB state inside the UTXO. It binds the ability to move particular client-side state to a Bitcoin output that can be spent only once.

A concealed or blinded seal can let a recipient provide a destination without revealing the full outpoint or ownership details to parties that do not need them. The exact concealment method and invoice encoding depend on the RGB version and software in use.

### State transitions close old seals and define new ones

An RGB state transition consumes existing owned state and creates replacement state.

A transfer can assign state to new seal definitions controlled by recipients and, when necessary, return change-like state to the sender. The transition includes the contract operation data needed to describe those changes.

The Bitcoin transaction that spends the old seal definitions is the witness transaction. It closes the old seals and carries or participates in the commitment to the RGB operation. The resulting contract state is validated off-chain by the parties that receive the needed data.

Assignments are client-side records connecting state to seal definitions. They are not token balances written into Bitcoin outputs. Bitcoin sees UTXOs, scripts, and commitments. RGB software interprets the contract operation and assignment under the relevant protocol rules.

### Commitments and anchors link state to Bitcoin

RGB uses deterministic Bitcoin commitments so a transaction can commit to client-side data without requiring Bitcoin consensus to interpret that data.

An anchor is the proof structure connecting an RGB operation to the commitment contained in a Bitcoin witness transaction. Depending on the protocol version and transaction construction, the commitment can use a supported method such as a Taproot-based commitment or an `OP_RETURN` fallback arrangement.

A valid anchor shows that the committed message was included under the commitment scheme and associated with the witness transaction. The recipient still has to validate the message itself.

This distinction resembles a sealed envelope attached to an ordered public event. Bitcoin can prove that the envelope commitment was present and that the relevant UTXO was spent. It does not read the enclosed RGB contract history or decide whether the contract claims are true.

### Contract genesis and identifiers establish the starting point

Every RGB contract begins with a genesis operation.

Genesis establishes the initial contract parameters, rules, state, and issued rights. The contract identifier is derived from the contract's defining data. It gives software a precise reference that is stronger than a display name, ticker, image, or issuer description.

A recipient should validate the contract identifier and genesis data required by the supported protocol version. Two assets can use the same name or ticker while representing different contracts. A familiar label is not a substitute for a verified identifier.

Issuance also does not prove value, legitimacy, redeemability, legal status, or issuer solvency. Those claims exist outside protocol validity.

### RGB v0.12 replaced the older schema model

RGB terminology changed materially between versions 0.11 and 0.12.

In the v0.11 architecture, a schema defined contract validation rules, interfaces described application-facing semantics, and implementations connected a schema to an interface. Many existing documentation pages and wallet libraries still use those terms.

The final v0.12 consensus architecture removed schemata from the current contract model. A codex now supplies the consensus rule package used to verify contract operations, together with its required libraries and execution environment. Wallet-facing software uses a contract API rather than the former standard-library interface and implementation combination.

Interfaces still appear in the Contractum developer environment, where they can be compiled into application-facing contract APIs. They should not be described as unchanged v0.12 standard-library objects.

This is not a vocabulary-only update. Contracts and software built for incompatible consensus generations cannot be assumed interoperable. A wallet must know which protocol, codex, API, encoding, and application library it supports.

### Contract state is local and operation-based

Contract state is the result of valid operations known to the validating client.

The current v0.12 implementation exposes contract state through memory cells and application APIs. Its application layer uses names including `GlobalApi` and `OwnedApi` for globally readable and ownership-bound views. These names replaced earlier immutable and destructible API labels in the v0.12 release-candidate line.

Owned state is tied to single-use seals and is consumed when those seals close. Global state can represent contract information that is not assigned to one owner's seal in the same way. The precise state cell types and available operations are defined by the current codex and contract API.

Older explanations often divide state into fungible, structured, and attachment categories. Version 0.12 unified the consensus representation, so those older structural categories should not be copied directly into a current data-model explanation.

### RGB-20 and RGB-21 are application standards

RGB-20 identifies a fungible-asset application standard. RGB-21 identifies a non-fungible or unique-asset application standard.

They describe application behavior above Bitcoin consensus. Bitcoin nodes do not know that a commitment represents an RGB-20 amount or an RGB-21 item.

The v0.12 release-candidate 2 announcement reported updated RGB-20 and RGB-21 standards alongside the new contract API and codex architecture. That does not make older v0.11 schema and interface artifacts automatically compatible with v0.12 contracts.

Support remains software-specific. A wallet that displays one RGB-20 generation may not understand another version, an RGB-21 contract, or a custom contract API. "Supports RGB" is incomplete without exact version and standard details.

### Invoices describe requested contract state

An RGB invoice is a structured request for state under a specific contract and application environment.

It can identify a contract, requested state, amount or other assignment information, beneficiary seal, network, and related payment parameters. Version 0.12 expanded invoice capabilities for fungible and non-fungible state and more complex payment scripts.

An RGB invoice is not automatically a Lightning invoice. The formats, validation rules, routing behavior, and settlement workflows differ unless a specific integration defines how they interact.

Blinded or concealed seals can reduce what a sender learns about the recipient's Bitcoin outpoint. They do not conceal every other part of the interaction. Transport metadata, counterparties, timing, wallet telemetry, and later chain activity can still reveal information.

### A consignment carries transfer evidence

A consignment is the RGB contract and transfer data delivered to a recipient for client-side validation. It is not a Bitcoin transaction.

The sender must provide enough information for the recipient to connect the received state to a valid contract origin and verify the relevant transition history. That can include contract identification, operations, seal definitions, witnesses, anchors, and supporting libraries or API information required by the version.

The recipient should not need every unrelated branch of a large contract history. Client-side validation can disclose the history required for the received state while omitting unrelated ownership branches. The exact pruning and disclosure behavior must match the implementation being used.

Version 0.12 changed consignments from file-like packages loaded as a whole into streams that can be validated as they arrive. The current validation code reads operations and seals from a consignment stream, verifies contract rules, and checks seal-closing witnesses.

A relay or proxy can deliver the package, but delivery does not make it valid. The recipient's client still performs validation.

### Recipient validation has several layers

A recipient validating an RGB transfer needs to determine that:

- The contract identifier and genesis are the intended ones.
- The operation sequence follows the current codex and contract rules.
- The transferred state exists and was assigned through valid seal definitions.
- Earlier owned state was not reused within the validated history.
- Relevant seals were closed by the correct Bitcoin witness transactions.
- Anchors prove inclusion of the required commitments.
- The Bitcoin transactions are in the expected network and chain history.
- The received application API and data encodings are supported.
- The consignment contains enough data to establish the received rights.

A chain resolver, Electrum server, Esplora service, or local Bitcoin node can supply Bitcoin transaction and confirmation information. That service does not replace RGB contract validation. It answers chain questions used by the client-side validator.

A confirmed anchor can coexist with missing transfer data. Confirmation cannot deliver a consignment to a wallet that never received it.

### Data availability and backups are part of ownership

RGB ownership depends on more than private keys.

A seed phrase may restore Bitcoin keys, but it may not restore the RGB contract history, consignments, seal metadata, contract APIs, media, or transfer records needed to prove and spend client-side state.

Wallet software therefore has responsibilities for import, export, persistence, backup, and recovery. The v0.12 RC2 runtime and command-line release added contract import and export, contract backups, and removal of unused contracts. Those capabilities still need correct integration and user-facing recovery testing.

Losing required data can make valid rights difficult or impossible to demonstrate to a later recipient. A third-party proxy or indexer may retain copies, but relying on it creates availability and privacy dependencies. A backup claim should state whether it preserves keys only, complete consignments, contract state, attachments, or all data needed for future validation.

Secure transport matters too. Private transfer packages must reach the intended recipient without substitution, corruption, or accidental disclosure.

### Confirmations and reorganizations affect anchors

RGB relies on Bitcoin's selected chain for the witness transactions that close seals and publish commitments.

Before confirmation, a transaction can be replaced, conflict, or disappear from a node's mempool. After confirmation, a reorganization can remove the transaction from the active chain or change its depth and ordering context.

RGB v0.12 introduced a revised model intended to handle reorganization risks more explicitly. Wallets still need current chain data and clear policies for when a transfer is considered sufficiently settled.

One confirmation is not absolute finality. A recipient should distinguish successful client-side validation from the separate question of how much Bitcoin confirmation depth is required for the witness transaction.

### Privacy comes from selective disclosure, not invisibility

RGB can keep detailed contract state away from the public Bitcoin ledger. Observers may see a Bitcoin transaction and commitment without learning the full contract operation.

Recipients can also receive only the history needed for their state rather than a global database.

Those properties do not create automatic privacy. A sender and recipient know transaction details. A relay can observe delivery metadata. A hosted wallet, resolver, indexer, or issuer can correlate requests. Bitcoin transaction structure can reveal relationships. Contract identifiers, repeated invoices, media retrieval, and backup services can create additional links.

Privacy depends on the complete wallet, transport, chain-access, and counterparty model.

### Wallet and SDK versions are not one release line

As of July 19, 2026, RGB has several simultaneously relevant version families.

The `rgb-core` consensus crate is version 0.12.0. Its maintainers describe consensus functionality as frozen except for bug fixes.

The current default branches of the RGB wallet runtime and RGB standard library identify themselves as 0.12.0-rc.3. The latest published GitHub release for the runtime and command-line tool remains v0.12.0-rc.2, released June 3, 2025.

The separate `rgb-lib` wallet SDK identifies itself as 0.3.0-beta.6 and currently pins its RGB application dependencies, including `rgb-invoicing`, `rgb-psbt-utils`, `rgb-schemas`, and `rgb-ops`, to the 0.11.1-rc.10 line. It belongs to a different compatibility line from the v0.12 default branches.

Official documentation also contains pages written around v0.11 schemas and interfaces alongside newer v0.12 material. Readers and implementers must verify a page's architecture rather than assuming that an unversioned documentation page describes the final v0.12 model.

The consensus layer being final does not make every wallet, standard library, SDK, or application final.

### Lightning compatibility is implementation-specific

RGB is designed to support client-side state associated with Lightning channels, and current repositories describe commitments to RGB state in channel transactions.

That design claim is not universal Lightning deployment.

The maintained RGB Lightning Node identifies itself as version 0.1.0 and depends on the beta rgb-lib line. Its documentation labels the software early alpha and limits ordinary testing to regtest and testnet environments.

It should therefore be described as an experimental integration, not proof that arbitrary RGB contracts can move across the public Lightning Network through ordinary wallets and nodes. Compatibility depends on modified channel software, shared RGB versions, liquidity, transfer-data delivery, backup, and close handling.

### Operational risks and open questions

RGB separates Bitcoin settlement evidence from client-side contract validation. That produces several independent failure surfaces.

A Bitcoin transaction can confirm while a consignment is missing. A consignment can be complete while the witness transaction remains unconfirmed. Contract data can be valid while a wallet lacks the correct API. A wallet can control the Bitcoin key while losing the RGB history. Two products can both advertise RGB support while implementing incompatible version families.

Open technical and operational questions include cross-wallet interoperability, migration between version families, long-term availability of contract data, hardware-wallet verification, secure relay design, reorganization handling, attachment storage, issuer metadata, audit coverage, and usable backup restoration.

The durable mental model is narrow: Bitcoin orders and validates the UTXO spends and commitments that reach its chain. RGB clients validate the contract history and state they receive. Neither layer can silently perform the other's job.

## 3. Key Terms

- **RGB:** A client-side-validated smart-contract system that anchors commitments and single-use-seal closings in Bitcoin transactions.
- **Client-side validation:** Validation performed by the parties receiving and holding relevant contract data rather than by every Bitcoin node.
- **Single-use seal:** A commitment primitive designed to be closed once.
- **Seal definition:** Data identifying the one-time event, commonly a Bitcoin UTXO spend, that can close a seal.
- **Seal closing:** The event that consumes a single-use seal, commonly the spending of its associated Bitcoin output.
- **Commitment:** Cryptographic evidence binding a defined message to published data without requiring the message itself to be public.
- **Anchor:** Proof data connecting an RGB operation commitment to a Bitcoin witness transaction.
- **Contract genesis:** The first operation defining a contract, its initial rules, state, and issued rights.
- **Contract state:** The validated result of contract operations known to a particular RGB client.
- **State transition:** A contract operation that consumes existing state and creates replacement state under the contract rules.
- **Assignment:** Client-side state associated with a seal definition.
- **Codex:** The v0.12 consensus rule package and executable logic used to validate contract operations.
- **Schema:** A pre-v0.12 RGB structure that defined contract rules and data; it is not the current v0.12 consensus model.
- **Interface:** An application semantic definition retained in the Contractum development layer and compiled into current contract APIs.
- **Contract API:** The v0.12 application-facing description of how wallet software interacts with a contract.
- **Consignment:** Contract and transfer data delivered to a recipient for client-side validation.
- **Invoice:** A structured request for particular RGB contract state and a beneficiary seal.
- **Data availability:** The ability to obtain the contract and transfer data required for validation, recovery, and later spending.
- **RGB-20:** An RGB application standard for fungible state.
- **RGB-21:** An RGB application standard for non-fungible or unique state.
- **UTXO:** An unspent transaction output that can be used as an input in a later transaction.

## 4. Sources

1. **RGB v0.12 Consensus Release** | LNP/BP Standards Association
   - URL: https://rgb.tech/blog/release-v0-12-consensus/
   - Supports: Final RGB v0.12 consensus release date, consensus freeze, v0.12 state and architecture changes, consignment streaming, reorganization model, and separation from later application releases.
2. **RGB v0.12 Release Candidate 2** | LNP/BP Standards Association
   - URL: https://rgb.tech/blog/release-v0-12-rc-2/
   - Supports: RC2 architecture, codex and contract API changes, GlobalApi and OwnedApi terminology, contract import and export, backups, invoices, and updated RGB-20 and RGB-21 standards.
3. **RGB Runtime and Command-Line Releases** | RGB-WG contributors
   - URL: https://github.com/RGB-WG/rgb/releases
   - Supports: Published v0.12.0-rc.2 release date, runtime and command-line maturity, contract import, export, backup, and consignment handling.
4. **RGB Runtime and Command-Line Workspace Manifest** | RGB-WG contributors
   - Repository path: RGB-WG/rgb/Cargo.toml
   - URL: https://github.com/RGB-WG/rgb/blob/master/Cargo.toml
   - Supports: Current default-branch runtime version 0.12.0-rc.3, resolver features, and dependencies on the v0.12 standard-library line.
5. **RGB Core Library Manifest** | RGB-WG contributors
   - Repository path: RGB-WG/rgb-core/Cargo.toml
   - URL: https://github.com/RGB-WG/rgb-core/blob/master/Cargo.toml
   - Supports: Final rgb-core version 0.12.0 and its role as the consensus-layer library.
6. **RGB Core Library README** | RGB-WG contributors
   - Repository path: RGB-WG/rgb-core/README.md
   - URL: https://github.com/RGB-WG/rgb-core/blob/master/README.md
   - Supports: Consensus-critical validation role, client-side-validation and Bitcoin commitment dependencies, and frozen bugfix-only maintenance description.
7. **RGB Contract Verification Implementation** | RGB-WG contributors
   - Repository path: RGB-WG/rgb-core/src/verify.rs
   - URL: https://github.com/RGB-WG/rgb-core/blob/master/src/verify.rs
   - Supports: Consignment-stream processing, operation seals, codex verification, contract memory, seal definitions, and witness validation.
8. **RGB Standard Library Workspace Manifest** | RGB-WG contributors
   - Repository path: RGB-WG/rgb-std/Cargo.toml
   - URL: https://github.com/RGB-WG/rgb-std/blob/master/Cargo.toml
   - Supports: Current default-branch rgb-std version 0.12.0-rc.3, final rgb-core dependency, invoice package, and application-library maturity.
9. **LNP/BP Standards Repository** | LNP/BP Standards Association
   - URL: https://github.com/LNP-BP/LNPBPs
   - Supports: Versioned specifications for deterministic Bitcoin commitments, single-use seals, client-side validation, TXO-based seals, and multi-protocol commitments.
10. **Client-side Validation** | RGB protocol contributors
    - URL: https://docs.rgb.info/distributed-computing-concepts/client-side-validation
    - Supports: Selective validation, recipient-held contract history, data minimization, and the distinction from global consensus validation.
11. **Single-use Seals and Proof of Publication** | RGB protocol contributors
    - URL: https://docs.rgb.info/distributed-computing-concepts/single-use-seals
    - Supports: Seal definitions, closing events, Bitcoin UTXO binding, and proof-of-publication concepts.
12. **Commitment Schemes within Bitcoin and RGB** | RGB protocol contributors
    - URL: https://docs.rgb.info/commitment-layer/commitment-schemes
    - Supports: Deterministic commitment methods, witness transactions, Taproot and OP_RETURN commitment paths, and commitment boundaries.
13. **RGB Anchors** | RGB protocol contributors
    - URL: https://docs.rgb.info/commitment-layer/anchors
    - Supports: Anchor structure, transaction association, and proofs connecting contract operations to Bitcoin commitments.
14. **RGB Transfer and Consignment Documentation** | RGB protocol contributors
    - URL: https://docs.rgb.info/annexes/contract-transfers
    - Supports: Sender-to-recipient transfer data, consignments, beneficiary information, and client-side transfer validation workflow.
15. **RGB Invoice Documentation** | RGB protocol contributors
    - URL: https://docs.rgb.info/annexes/invoices
    - Supports: RGB invoice purpose, beneficiary seals, requested contract state, and distinction from ordinary Bitcoin transaction data.
16. **rgb-lib Wallet Library Manifest** | RGB-Tools contributors
    - Repository path: RGB-Tools/rgb-lib/Cargo.toml
    - URL: https://github.com/RGB-Tools/rgb-lib/blob/master/Cargo.toml
    - Supports: rgb-lib version 0.3.0-beta.7, wallet-library scope, supported chain backends, and dependencies on v0.11.1-rc.11 application libraries.
17. **RGB Lightning Node README** | RGB-Tools contributors
    - Repository path: RGB-Tools/rgb-lightning-node/README.md
    - URL: https://github.com/RGB-Tools/rgb-lightning-node/blob/master/README.md
    - Supports: Experimental RGB channel construction, test-network limitation, early-alpha warning, required proxy and indexer services, and non-universal Lightning compatibility.
18. **RGB Lightning Node Manifest** | RGB-Tools contributors
    - Repository path: RGB-Tools/rgb-lightning-node/Cargo.toml
    - URL: https://github.com/RGB-Tools/rgb-lightning-node/blob/master/Cargo.toml
    - Supports: Version 0.1.0 and dependency on the beta rgb-lib compatibility line.
19. **Bitcoin Core Validation Implementation, v31.0** | Bitcoin Core contributors
    - Repository path: bitcoin/bitcoin/src/validation.cpp at v31.0
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/validation.cpp
    - Supports: Bitcoin transaction and block validation, UTXO-state changes, active-chain selection, confirmations, and reorganizations that bound RGB witness claims.

## 5. SEO title

How RGB Works on Bitcoin | Client-Side Validation Explained

## 6. Meta description

Learn how RGB uses client-side validation, single-use seals, consignments, and Bitcoin commitments, with clear v0.12 version and maturity boundaries.

## 7. Page excerpt

RGB lets recipients validate contract state from private transfer data while Bitcoin confirms the UTXO spends and commitments anchoring that state. This guide explains seals, anchors, consignments, data availability, versions, and current integration limits.

## 8. Estimated reading time

16 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-034 | What Is Ark on Bitcoin?
- Next: MSC-GUIDE-036 | Bitcoin Sidechains Explained
- Prerequisite: MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
- Prerequisite: MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work
- Branch: MSC-GUIDE-042 | How Bitcoin Wallet Integrations Work
- Return: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network
- Related: MSC-GUIDE-033 | How the Lightning Network Works

## 10. Accuracy review checklist

- [x] Defines RGB as client-side validated and distinct from Bitcoin consensus validation.
- [x] Does not describe RGB as a separate coin, blockchain, global token ledger, or universally deployed Layer 2.
- [x] Separates seal closing, Bitcoin commitments, anchors, and contract-rule validation.
- [x] Explains sender consignment delivery and recipient validation requirements.
- [x] Makes data availability, backup, chain resolver, and wallet responsibilities explicit.
- [x] Distinguishes v0.11 schemas and interfaces from the v0.12 codex and contract API model.
- [x] Separates final rgb-core 0.12.0 from RC, beta, documentation, and application versions.
- [x] Limits RGB-20, RGB-21, privacy, recovery, compatibility, and Lightning claims to supported evidence.
- [x] Contains no external URL outside Sources and no active planned internal link.

## 11. Human verification

- Reviewer:
- Review date:
- Notes: Pending review should verify the final v0.12 consensus terminology, current RC3 branch manifests, rgb-lib v0.11 compatibility boundary, RGB-20 and RGB-21 release labeling, consignment and backup behavior, and early-alpha Lightning integration status.

## 12. Illustration brief

### Illustration 1

- Concept title: Two Validation Boundaries
- Educational purpose: Separate what Bitcoin nodes validate from what an RGB recipient validates locally.
- Recommended placement: After the section Client-side validation is not Bitcoin consensus validation.
- Visual description: Vintage split nautical chart. The lower public shipping lane shows Bitcoin nodes checking transactions, UTXOs, blocks, and one compact commitment. The upper private chart room shows a recipient checking contract genesis, codex rules, state transitions, seals, and a consignment. A narrow anchor line connects the two layers without merging them.
- Required labels: Bitcoin consensus, Bitcoin transaction, UTXO spend, Commitment, Recipient client, Contract genesis, Codex, State transition, Consignment, Client-side validation
- Caption: Bitcoin validates the witness transaction and commitment placement; the recipient validates the RGB contract evidence.
- Alt text: Split technical map showing Bitcoin nodes validating transactions below and an RGB recipient validating private contract data above.
- Image orientation: Landscape
- Mobile crop notes: Stack the public Bitcoin lane below the private RGB validation room and keep the anchor line centered.
- Status: PLANNED

### Illustration 2

- Concept title: Seal to Anchor Transfer Chain
- Educational purpose: Show how one owned state is consumed, reassigned, anchored, and checked by the recipient.
- Recommended placement: After the section Recipient validation has several layers.
- Visual description: Vintage technical navigation sequence beginning with a UTXO-defined seal and owned state. A state transition consumes that assignment, creates a concealed recipient seal, and commits into a Bitcoin witness transaction. The recipient follows the anchor proof back to the transition and contract rules before accepting.
- Required labels: Owned state, Seal definition, Seal closing, State transition, New assignment, Concealed seal, Witness transaction, Deterministic commitment, Anchor, Recipient validation
- Caption: Spending the Bitcoin output closes the old seal, while the recipient validates the separate contract transition and anchor proof.
- Alt text: Sequential systems diagram of an RGB state transition from a UTXO seal through a Bitcoin commitment to recipient validation.
- Image orientation: Landscape
- Mobile crop notes: Use a vertical sequence with the Bitcoin witness transaction in the center and recipient validation at the bottom.
- Status: PLANNED

### Illustration 3

- Concept title: Consignment and Data Responsibility Map
- Educational purpose: Explain that transfer data, chain data, validation, storage, and backups come from different components.
- Recommended placement: After the section Data availability and backups are part of ownership.
- Visual description: Nautical cargo manifest map. The sender packages a consignment and sends it through an optional relay. The recipient wallet validates it using contract rules plus chain data from a resolver or local node, then stores the accepted state and a separate backup. Broken paths show missing consignment, unavailable resolver, incompatible version, and incomplete backup.
- Required labels: Sender wallet, Consignment stream, Optional relay, Recipient wallet, Contract validation, Bitcoin resolver, Local storage, Backup export, Missing data, Version mismatch
- Caption: A Bitcoin commitment does not deliver the private contract data needed for validation, storage, and later spending.
- Alt text: Technical cargo map showing an RGB consignment moving from sender to recipient with separate chain-data, validation, storage, and backup paths.
- Image orientation: Landscape
- Mobile crop notes: Stack sender, relay, recipient validation, and backup as four stages with failure markers beside each stage.
- Status: PLANNED
