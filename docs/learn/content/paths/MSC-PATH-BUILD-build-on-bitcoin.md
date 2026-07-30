---
registry_id: MSC-PATH-BUILD
status: EDITORIAL_REVIEW
page_role: learning-path
h1: Build on Bitcoin
handle: build-on-bitcoin
category: Not applicable. This is a cross-category learning route.
subcategory: Multiple canonical subcategories. The path does not own topic pages.
production_batch: "Phase 1.10: path skeleton; Finalize after Phase 17."
author_display: Mempool Surf Club Editorial
reviewed_date: null
copy_locked_date: null
---

# Build on Bitcoin

## 1. Introductory deck

Follow a systems-oriented route from Bitcoin implementations and development environments through interfaces, source review, testing, protocol rules, higher-layer designs, indexed asset protocols, experimental proposals, implementation comparison, and reliable infrastructure. Each step remains a separate canonical destination, and every planned action stays inactive until publication and URL confirmation.

## 2. Full destination copy

Building on Bitcoin is not one activity and it does not produce one universal developer stack. A node implementation, RPC client, wallet, indexer, Lightning node, sidechain bridge, client-side contract system, inscription parser, and proposed opcode can all interact with Bitcoin while relying on different rules, data, operators, and failure assumptions. This path is designed to make those boundaries visible before the reader evaluates tools or architectures.

The route begins with Bitcoin Core rather than an application framework because the first question is not which library is convenient. The first question is which system validates Bitcoin blocks and transactions, maintains chainstate, applies local policy, communicates with peers, and exposes application interfaces. Bitcoin Core is an influential implementation of those responsibilities, but it is not Bitcoin itself. Starting there gives the reader a reference point for separating consensus rules from implementation code, local policy, wallet behavior, defaults, interfaces, releases, and project governance.

### Stage 1: Establish the implementation and workspace boundary

After the Bitcoin Core foundation, the route maps the broader tool landscape and then builds an isolated development environment. These steps come before production-oriented application work because source trees, binaries, test data, credentials, networks, wallets, and real funds should not be mixed casually. A controlled workspace makes later observations reproducible and helps the reader name the exact release, commit, configuration, network, and data directory behind a result.

Environment, RPC, APIs, wallet integrations, and indexes are separate layers because they answer different questions. The environment defines where software and state run. RPC is a versioned request and response interface exposed by a particular implementation. API is a wider category that can include node, wallet, notification, explorer, Lightning, or hosted-service interfaces. A wallet integration coordinates discovery, key control, transaction construction, signing, broadcast, monitoring, and recovery. An indexer derives query-oriented or application-specific state from ordered data. A successful API response can be useful without providing independent validation, and a hosted service can reduce operating work while adding availability, privacy, configuration, and trust dependencies.

### Stage 2: Learn how evidence is produced

The path next turns from using software to reading and evaluating it. Source reading comes before protocol experimentation because repository code is not self-explanatory. A directory name, constant, comment, default branch, or merged pull request does not by itself establish released or deployed behavior. Readers learn to pin a stable artifact, follow a narrow data flow, inspect surrounding conditions, compare tests, and reproduce observations on an appropriate test network.

Testing and releases follow for the same reason. Unit tests, functional tests, test vectors, fuzzing, continuous integration, benchmarks, static analysis, sanitizers, and review provide different forms of evidence. None proves the absence of defects. Release branches, candidates, tags, notes, checksums, signatures, and reproducible-build attestations also answer different questions. Released behavior must be separated from unreleased code, and release must be separated from adoption, activation, and safe operation.

### Stage 3: Build the protocol prerequisite model

Bitcoin Improvement Proposals, Script, SegWit, Taproot, and Schnorr signatures form the next prerequisite layer. A BIP is a versioned technical or process document. Its document status is not the same as implementation support, release, deployment, activation, or adoption. Script defines constrained spending validation under context-specific rules. It is not a general application runtime.

SegWit, Taproot, and Schnorr are ordered so the reader can see how later rules depend on earlier structure without treating them as one upgrade. SegWit introduced witness serialization, witness programs, block weight, witness commitments, and version 0 signing changes. Taproot uses the witness-version framework for version 1 outputs and adds key-path and script-path spending rules. BIP 340 Schnorr signatures are used in Taproot contexts, but they did not replace every signature rule in Bitcoin. This sequence gives the reader the transaction, witness, script, and signature vocabulary needed to evaluate higher-layer claims.

### Stage 4: Compare higher-layer security models

Lightning, sidechains, Ark, and RGB appear together as related study areas, not as one architecture. Lightning uses bilateral channels, off-chain state updates, routing, liquidity, and Bitcoin-enforced closure paths. A sidechain is a separate blockchain with its own validation and block-production system plus a peg or bridge relationship to Bitcoin. Ark-style systems coordinate virtual outputs and shared transaction structures with operator, liquidity, expiry, data, and exit assumptions. RGB uses client-side validation and Bitcoin commitments while keeping complete contract history outside ordinary Bitcoin node validation.

The reader should compare what Bitcoin validates, which parties must remain available, who controls keys or liquidity, what data must be retained, how exits work, and what can be independently reconstructed. Technical capability is not the same as maturity or adoption, and a system's relationship to Bitcoin does not transfer Bitcoin's security properties to every component.

### Stage 5: Separate asset and indexing protocols

Ordinals, inscriptions, Runes, and BRC-20 are intentionally separate steps. Ordinals describes an application numbering and tracking convention for satoshis. Inscriptions are content envelopes discovered through Ord-compatible parsing. Runes derives fungible asset state from runestones, transaction ordering, and indexer rules. BRC-20 derives balances from inscription operations and compatible parser behavior. They can share transaction data or software ecosystems without becoming one protocol.

This stage keeps native bitcoin, Bitcoin consensus data, application-defined identities, content, and indexed balances distinct. It also prepares the reader to ask how reorganizations, parser versions, historical rules, wallet coin control, burns, transfers, and rebuilds affect the state an application displays. Protocol mechanics remain separate from token promotion, price narratives, or investment claims.

### Stage 6: Evaluate proposals and experimental systems

Discreet Log Contracts, BitVM, OP_CAT, and emerging protocols require careful maturity and boundary analysis. DLCs combine preconstructed transactions, adaptor signatures, and oracle attestations without making the oracle a custodian. BitVM explores optimistic verification of off-chain computation through commitments and dispute transactions. OP_CAT is a proposed Script operation whose document and code status must be separated from mainnet deployment or activation. The final evaluation guide turns those examples into a repeatable method.

For each system, the reader should identify the artifact being discussed, the version and network, the enforcement point, custody, data availability, challenge or exit paths, implementation evidence, interoperability, governance, and remaining uncertainty. A paper is not a production deployment. A test transaction is not a safety guarantee. An audit has a defined scope. A BIP status does not automatically describe network behavior.

### Stage 7: Return to implementations and operations

The route ends with Bitcoin Knots and reliable infrastructure. Bitcoin Knots appears near the end so the reader can compare implementations using the distinctions already developed: consensus, policy, defaults, interfaces, release lineage, configuration, and observed behavior. The purpose is not to rank implementations. It is to show why shared ancestry does not remove the need for exact version and configuration analysis.

Reliable infrastructure is the final step because every earlier layer eventually depends on operation. A running process may still be on the wrong chain, behind the required validation point, rebuilding an index, rescanning a wallet, low on storage, exposing unsafe credentials, or unable to recover application state. Readiness, monitoring, backups, reorganization handling, pruning, failover, and recovery must be defined for the workload. Self-operated infrastructure can reduce some hosted-service dependencies without eliminating privacy, custody, security, or availability risk.

After completing the route, a reader should be able to classify a claim by layer, identify which software or protocol artifact supports it, distinguish consensus from policy and application convention, separate interface output from independent validation, compare higher-layer trust and data assumptions, evaluate maturity evidence, and describe what reliable operation requires. Completing the route does not certify someone as a Bitcoin developer and does not endorse any implementation, service, token, protocol, or proposal.

This path provides educational sequencing only. Every step remains a separate canonical destination with its own permanent content and navigation. The path does not duplicate, replace, republish, or redefine those guides. All step actions, hub relationships, branch points, routes, anchors, and destination URLs remain inactive until the relevant pages are published and their URLs are confirmed.

## 3. Destination structure or sequence

### Stage 1: Establish the implementation and workspace boundary

Steps 1 through 7 begin with Bitcoin Core, map development tools, isolate the environment, and separate RPC, APIs, wallet integrations, and indexes.

### Stage 2: Learn how evidence is produced

Steps 8 through 10 cover source reading, layered testing evidence, and the release process.

### Stage 3: Build the protocol prerequisite model

Steps 11 through 15 establish BIP, Script, SegWit, Taproot, and Schnorr context.

### Stage 4: Compare higher-layer security models

Steps 16 through 19 compare Lightning, sidechains, Ark, and RGB without treating them as one architecture.

### Stage 5: Separate asset and indexing protocols

Steps 20 through 23 distinguish Ordinals, inscriptions, Runes, and BRC-20.

### Stage 6: Evaluate proposals and experimental systems

Steps 24 through 27 examine DLCs, BitVM, OP_CAT, and a general emerging-protocol evaluation method.

### Stage 7: Return to implementations and operations

Steps 28 and 29 compare Bitcoin Knots with the implementation model, then close with reliable infrastructure.

Path order is educational sequencing. It does not replace the canonical navigation of any source guide.

## 4. Card or step copy

### Step 1: MSC-GUIDE-049 | What Is Bitcoin Core?

- Step number: 1
- Registry ID: MSC-GUIDE-049
- Approved H1: What Is Bitcoin Core?
- Why this step appears here: Begin with a concrete node and wallet implementation so later interface and protocol claims can be classified by layer.
- What the reader should understand before continuing: Bitcoin Core implements important Bitcoin behavior, but consensus, policy, wallet logic, interfaces, defaults, releases, and governance are not interchangeable.
- Final source-guide depth: Deep
- Final source-guide format: Technical Explainer
- Final estimated reading time: 16 to 19 minutes
- Workflow status note: COPY_LOCKED editorial content, not yet a confirmed published destination.
- URL status: None. Keep inactive until publication and URL confirmation.

### Step 2: MSC-GUIDE-041 | Bitcoin Developer Tools: A Practical Overview

- Step number: 2
- Registry ID: MSC-GUIDE-041
- Approved H1: Bitcoin Developer Tools: A Practical Overview
- Why this step appears here: Map the full tool landscape before choosing libraries, services, signers, test networks, or data systems.
- What the reader should understand before continuing: A development stack contains separate validation, retrieval, construction, signing, testing, and application layers with different trust boundaries.
- Final source-guide depth: Deep
- Final source-guide format: Technical Analysis
- Final estimated reading time: 19 to 23 minutes
- Workflow status note: COPY_LOCKED editorial content, not yet a confirmed published destination.
- URL status: None. Keep inactive until publication and URL confirmation.

### Step 3: MSC-GUIDE-062 | How to Set Up a Bitcoin Development Environment

- Step number: 3
- Registry ID: MSC-GUIDE-062
- Approved H1: How to Set Up a Bitcoin Development Environment
- Why this step appears here: Create an isolated and version-pinned workspace before exercising interfaces or experimental code.
- What the reader should understand before continuing: Source, binaries, build output, test data, credentials, production state, networks, and real funds should remain deliberately separated.
- Final source-guide depth: Deep
- Final source-guide format: Technical Explainer
- Final estimated reading time: 21 to 24 minutes
- Workflow status note: COPY_LOCKED editorial content, not yet a confirmed published destination.
- URL status: None. Keep inactive until publication and URL confirmation.

### Step 4: MSC-GUIDE-061 | How Bitcoin RPC Works

- Step number: 4
- Registry ID: MSC-GUIDE-061
- Approved H1: How Bitcoin RPC Works
- Why this step appears here: Introduce the direct request and response boundary between an application client and a running node implementation.
- What the reader should understand before continuing: RPC is versioned implementation behavior, not the Bitcoin peer-to-peer protocol or proof that returned state is ready for use.
- Final source-guide depth: Deep
- Final source-guide format: Technical Explainer
- Final estimated reading time: 20 to 23 minutes
- Workflow status note: COPY_LOCKED editorial content, not yet a confirmed published destination.
- URL status: None. Keep inactive until publication and URL confirmation.

### Step 5: MSC-GUIDE-043 | Bitcoin APIs Explained

- Step number: 5
- Registry ID: MSC-GUIDE-043
- Approved H1: Bitcoin APIs Explained
- Why this step appears here: Widen the interface model beyond one RPC server and compare node, wallet, notification, explorer, Lightning, and hosted APIs.
- What the reader should understand before continuing: An API response inherits the software, data source, authentication, privacy, version, caching, and availability limits of the producing system.
- Final source-guide depth: Deep
- Final source-guide format: Technical Analysis
- Final estimated reading time: 19 to 23 minutes
- Workflow status note: COPY_LOCKED editorial content, not yet a confirmed published destination.
- URL status: None. Keep inactive until publication and URL confirmation.

### Step 6: MSC-GUIDE-042 | How Bitcoin Wallet Integrations Work

- Step number: 6
- Registry ID: MSC-GUIDE-042
- Approved H1: How Bitcoin Wallet Integrations Work
- Why this step appears here: Connect interfaces to key control, script discovery, UTXO state, transaction construction, signing, monitoring, and recovery.
- What the reader should understand before continuing: Wallet integration is a coordinated system, and detection, signing, broadcast, and confirmation are separate states and authorities.
- Final source-guide depth: Deep
- Final source-guide format: Technical Analysis
- Final estimated reading time: 21 to 25 minutes
- Workflow status note: COPY_LOCKED editorial content, not yet a confirmed published destination.
- URL status: None. Keep inactive until publication and URL confirmation.

### Step 7: MSC-GUIDE-044 | How Bitcoin Indexers Work

- Step number: 7
- Registry ID: MSC-GUIDE-044
- Approved H1: How Bitcoin Indexers Work
- Why this step appears here: Add query-oriented and application-defined state only after node, API, and wallet roles are distinct.
- What the reader should understand before continuing: Useful indexed state can be accurate while remaining outside Bitcoin consensus and requiring explicit rollback, rebuild, pruning, and privacy handling.
- Final source-guide depth: Deep
- Final source-guide format: Technical Analysis
- Final estimated reading time: 21 to 25 minutes
- Workflow status note: COPY_LOCKED editorial content, not yet a confirmed published destination.
- URL status: None. Keep inactive until publication and URL confirmation.

### Step 8: MSC-GUIDE-051 | How to Read the Bitcoin Source Code

- Step number: 8
- Registry ID: MSC-GUIDE-051
- Approved H1: How to Read the Bitcoin Source Code
- Why this step appears here: Shift from consuming software to tracing evidence through pinned source, context, tests, and reproducible experiments.
- What the reader should understand before continuing: One file, constant, comment, directory, or moving branch cannot establish the whole protocol or released behavior.
- Final source-guide depth: Deep
- Final source-guide format: Source Code Walkthrough
- Final estimated reading time: 18 to 21 minutes
- Workflow status note: COPY_LOCKED editorial content, not yet a confirmed published destination.
- URL status: None. Keep inactive until publication and URL confirmation.

### Step 9: MSC-GUIDE-063 | How Bitcoin Software Is Tested

- Step number: 9
- Registry ID: MSC-GUIDE-063
- Approved H1: How Bitcoin Software Is Tested
- Why this step appears here: Evaluate the different evidence produced by unit, functional, integration, vector, fuzz, CI, benchmark, analysis, and review workflows.
- What the reader should understand before continuing: Passing tests supports defined cases and assumptions but does not prove that software or an operating environment is defect-free.
- Final source-guide depth: Deep
- Final source-guide format: Technical Explainer
- Final estimated reading time: 22 to 25 minutes
- Workflow status note: COPY_LOCKED editorial content, not yet a confirmed published destination.
- URL status: None. Keep inactive until publication and URL confirmation.

### Step 10: MSC-GUIDE-052 | How Bitcoin Core Releases Work

- Step number: 10
- Registry ID: MSC-GUIDE-052
- Approved H1: How Bitcoin Core Releases Work
- Why this step appears here: Place source and testing inside the release evidence chain before discussing proposal or deployment status.
- What the reader should understand before continuing: Merged code, release branches, candidates, tags, binaries, checksums, signatures, reproducibility, adoption, and activation are distinct facts.
- Final source-guide depth: Deep
- Final source-guide format: Release Process Explainer
- Final estimated reading time: 17 to 20 minutes
- Workflow status note: COPY_LOCKED editorial content, not yet a confirmed published destination.
- URL status: None. Keep inactive until publication and URL confirmation.

### Step 11: MSC-GUIDE-053 | How Bitcoin Improvement Proposals Work

- Step number: 11
- Registry ID: MSC-GUIDE-053
- Approved H1: How Bitcoin Improvement Proposals Work
- Why this step appears here: Introduce versioned specification and process documents before evaluating protocol changes.
- What the reader should understand before continuing: BIP publication and document status do not by themselves prove implementation, release, deployment, activation, adoption, or approval.
- Final source-guide depth: Deep
- Final source-guide format: Process Explainer
- Final estimated reading time: 16 to 19 minutes
- Workflow status note: COPY_LOCKED editorial content, not yet a confirmed published destination.
- URL status: None. Keep inactive until publication and URL confirmation.

### Step 12: MSC-GUIDE-054 | How Bitcoin Script Works

- Step number: 12
- Registry ID: MSC-GUIDE-054
- Approved H1: How Bitcoin Script Works
- Why this step appears here: Establish the constrained spending-condition language used by later SegWit, Taproot, and proposal discussions.
- What the reader should understand before continuing: Script behavior depends on the output type, execution context, active rules, transaction data, and implementation evidence.
- Final source-guide depth: Deep
- Final source-guide format: Technical Explainer
- Final estimated reading time: 18 to 21 minutes
- Workflow status note: COPY_LOCKED editorial content, not yet a confirmed published destination.
- URL status: None. Keep inactive until publication and URL confirmation.

### Step 13: MSC-GUIDE-056 | How SegWit Changed Bitcoin

- Step number: 13
- Registry ID: MSC-GUIDE-056
- Approved H1: How SegWit Changed Bitcoin
- Why this step appears here: Study the witness-version foundation and version 0 rules before Taproot.
- What the reader should understand before continuing: Witness serialization, transaction identifiers, commitments, block weight, and signing rules are related changes with specific limits.
- Final source-guide depth: Deep
- Final source-guide format: Protocol Explainer
- Final estimated reading time: 18 to 21 minutes
- Workflow status note: COPY_LOCKED editorial content, not yet a confirmed published destination.
- URL status: None. Keep inactive until publication and URL confirmation.

### Step 14: MSC-GUIDE-055 | How Taproot Changed Bitcoin

- Step number: 14
- Registry ID: MSC-GUIDE-055
- Approved H1: How Taproot Changed Bitcoin
- Why this step appears here: Build on SegWit with version 1 outputs, key-path spending, committed script paths, and tapscript.
- What the reader should understand before continuing: Taproot combines separate BIP components and spending paths; it did not replace every earlier output or script context.
- Final source-guide depth: Deep
- Final source-guide format: Protocol Explainer
- Final estimated reading time: 17 to 20 minutes
- Workflow status note: COPY_LOCKED editorial content, not yet a confirmed published destination.
- URL status: None. Keep inactive until publication and URL confirmation.

### Step 15: MSC-GUIDE-057 | How Schnorr Signatures Work in Bitcoin

- Step number: 15
- Registry ID: MSC-GUIDE-057
- Approved H1: How Schnorr Signatures Work in Bitcoin
- Why this step appears here: Add the signature scheme used in Taproot contexts after the reader understands those contexts.
- What the reader should understand before continuing: BIP 340 defines a specific signature scheme and does not automatically provide aggregation, threshold control, identity, or implementation safety.
- Final source-guide depth: Deep
- Final source-guide format: Technical Explainer
- Final estimated reading time: 15 to 18 minutes
- Workflow status note: COPY_LOCKED editorial content, not yet a confirmed published destination.
- URL status: None. Keep inactive until publication and URL confirmation.

### Step 16: MSC-GUIDE-033 | How the Lightning Network Works

- Step number: 16
- Registry ID: MSC-GUIDE-033
- Approved H1: How the Lightning Network Works
- Why this step appears here: Begin higher-layer study with payment channels, routed payments, liquidity, monitoring, and Bitcoin-enforced closure.
- What the reader should understand before continuing: Lightning uses additional protocol and operational assumptions, and fast payment, privacy, or self-custody are not automatic guarantees.
- Final source-guide depth: Shallow
- Final source-guide format: Explainer
- Final estimated reading time: 14 to 17 minutes
- Workflow status note: COPY_LOCKED editorial content, not yet a confirmed published destination.
- URL status: None. Keep inactive until publication and URL confirmation.

### Step 17: MSC-GUIDE-036 | Bitcoin Sidechains Explained

- Step number: 17
- Registry ID: MSC-GUIDE-036
- Approved H1: Bitcoin Sidechains Explained
- Why this step appears here: Contrast channel systems with separate blockchains and peg or bridge mechanisms.
- What the reader should understand before continuing: Sidechain validation and peg security are separate, and Bitcoin nodes do not automatically validate a sidechain or authorize every withdrawal.
- Final source-guide depth: Deep
- Final source-guide format: Comparison
- Final estimated reading time: 15 minutes
- Workflow status note: COPY_LOCKED editorial content, not yet a confirmed published destination.
- URL status: None. Keep inactive until publication and URL confirmation.

### Step 18: MSC-GUIDE-034 | What Is Ark on Bitcoin?

- Step number: 18
- Registry ID: MSC-GUIDE-034
- Approved H1: What Is Ark on Bitcoin?
- Why this step appears here: Examine an operator-coordinated virtual-output model after channel and sidechain boundaries are visible.
- What the reader should understand before continuing: Ark-style designs require explicit analysis of operators, rounds, liquidity, expiry, backups, data retention, and unilateral exit paths.
- Final source-guide depth: Deep
- Final source-guide format: Technical Analysis
- Final estimated reading time: 20 to 24 minutes
- Workflow status note: COPY_LOCKED editorial content, not yet a confirmed published destination.
- URL status: None. Keep inactive until publication and URL confirmation.

### Step 19: MSC-GUIDE-035 | How RGB Works on Bitcoin

- Step number: 19
- Registry ID: MSC-GUIDE-035
- Approved H1: How RGB Works on Bitcoin
- Why this step appears here: Introduce client-side validation as a distinct model for contract state and transfer evidence.
- What the reader should understand before continuing: Bitcoin can confirm commitments without validating complete RGB contract histories, consignments, schemas, wallets, or service behavior.
- Final source-guide depth: Deep
- Final source-guide format: Technical Analysis
- Final estimated reading time: 16 minutes
- Workflow status note: COPY_LOCKED editorial content, not yet a confirmed published destination.
- URL status: None. Keep inactive until publication and URL confirmation.

### Step 20: MSC-GUIDE-037 | What Are Bitcoin Ordinals?

- Step number: 20
- Registry ID: MSC-GUIDE-037
- Approved H1: What Are Bitcoin Ordinals?
- Why this step appears here: Start the asset and indexing stage with the application convention that numbers and tracks satoshis.
- What the reader should understand before continuing: Ordinal identities, rarity labels, and transfer state are produced by compatible indexing rules rather than native Bitcoin consensus fields.
- Final source-guide depth: Deep
- Final source-guide format: Technical Analysis
- Final estimated reading time: 16 to 19 minutes
- Workflow status note: COPY_LOCKED editorial content, not yet a confirmed published destination.
- URL status: None. Keep inactive until publication and URL confirmation.

### Step 21: MSC-GUIDE-040 | What Is a Bitcoin Inscription?

- Step number: 21
- Registry ID: MSC-GUIDE-040
- Approved H1: What Is a Bitcoin Inscription?
- Why this step appears here: Separate content envelopes and provenance rules from the broader ordinal numbering convention.
- What the reader should understand before continuing: An inscription is discovered through application parsing of transaction witness data and is not automatically a native token or permanently available object.
- Final source-guide depth: Deep
- Final source-guide format: Technical Analysis
- Final estimated reading time: 15 to 18 minutes
- Workflow status note: COPY_LOCKED editorial content, not yet a confirmed published destination.
- URL status: None. Keep inactive until publication and URL confirmation.

### Step 22: MSC-GUIDE-038 | How the Runes Protocol Works

- Step number: 22
- Registry ID: MSC-GUIDE-038
- Approved H1: How the Runes Protocol Works
- Why this step appears here: Move from content to a distinct fungible-asset protocol with runestones, edicts, mint terms, balances, and burns.
- What the reader should understand before continuing: Rune state is reconstructed by protocol-aware software and must remain separate from native bitcoin amounts and Bitcoin consensus state.
- Final source-guide depth: Deep
- Final source-guide format: Technical Analysis
- Final estimated reading time: 17 to 20 minutes
- Workflow status note: COPY_LOCKED editorial content, not yet a confirmed published destination.
- URL status: None. Keep inactive until publication and URL confirmation.

### Step 23: MSC-GUIDE-039 | What Is BRC-20 on Bitcoin?

- Step number: 23
- Registry ID: MSC-GUIDE-039
- Approved H1: What Is BRC-20 on Bitcoin?
- Why this step appears here: Close the asset stage with an experimental inscription and parser convention whose historical rules can diverge.
- What the reader should understand before continuing: BRC-20 balances depend on operation ordering, compatible parsing, transfer procedures, confirmations, reorganizations, and implementation choices.
- Final source-guide depth: Deep
- Final source-guide format: Technical Analysis
- Final estimated reading time: 16 to 19 minutes
- Workflow status note: COPY_LOCKED editorial content, not yet a confirmed published destination.
- URL status: None. Keep inactive until publication and URL confirmation.

### Step 24: MSC-GUIDE-046 | How Discreet Log Contracts Work

- Step number: 24
- Registry ID: MSC-GUIDE-046
- Approved H1: How Discreet Log Contracts Work
- Why this step appears here: Begin the proposal and experimental stage with a contract design that combines Bitcoin transactions and oracle attestations.
- What the reader should understand before continuing: An oracle can attest to an outcome without holding funds, while event encoding, adaptor signatures, CETs, refunds, fees, and interoperability remain separate concerns.
- Final source-guide depth: Deep
- Final source-guide format: Technical Analysis
- Final estimated reading time: 17 to 20 minutes
- Workflow status note: COPY_LOCKED editorial content, not yet a confirmed published destination.
- URL status: None. Keep inactive until publication and URL confirmation.

### Step 25: MSC-GUIDE-045 | What Is BitVM?

- Step number: 25
- Registry ID: MSC-GUIDE-045
- Approved H1: What Is BitVM?
- Why this step appears here: Examine optimistic dispute verification and off-chain computation after transaction and contract evidence boundaries are established.
- What the reader should understand before continuing: BitVM claims require analysis of provers, challengers, transaction graphs, proof systems, data availability, bridges, and current implementation maturity.
- Final source-guide depth: Deep
- Final source-guide format: Technical Analysis
- Final estimated reading time: 16 to 19 minutes
- Workflow status note: COPY_LOCKED editorial content, not yet a confirmed published destination.
- URL status: None. Keep inactive until publication and URL confirmation.

### Step 26: MSC-GUIDE-047 | What Is OP_CAT?

- Step number: 26
- Registry ID: MSC-GUIDE-047
- Approved H1: What Is OP_CAT?
- Why this step appears here: Study a proposed opcode while keeping its simple rule separate from applications and deployment claims built around it.
- What the reader should understand before continuing: A BIP document, proposed semantics, experimental code, mainnet behavior, soft-fork activation, and cited use cases are different evidence categories.
- Final source-guide depth: Deep
- Final source-guide format: Technical Analysis
- Final estimated reading time: 16 to 19 minutes
- Workflow status note: COPY_LOCKED editorial content, not yet a confirmed published destination.
- URL status: None. Keep inactive until publication and URL confirmation.

### Step 27: MSC-GUIDE-048 | Emerging Protocols on Bitcoin: How to Evaluate Them

- Step number: 27
- Registry ID: MSC-GUIDE-048
- Approved H1: Emerging Protocols on Bitcoin: How to Evaluate Them
- Why this step appears here: Turn the preceding examples into a reusable framework for evaluating new systems.
- What the reader should understand before continuing: Artifact type, enforcement, custody, state, data, exits, cryptography, economics, maturity, interoperability, governance, and evidence quality must all be named.
- Final source-guide depth: Deep
- Final source-guide format: Technical Analysis
- Final estimated reading time: 20 to 23 minutes
- Workflow status note: COPY_LOCKED editorial content, not yet a confirmed published destination.
- URL status: None. Keep inactive until publication and URL confirmation.

### Step 28: MSC-GUIDE-050 | What Is Bitcoin Knots?

- Step number: 28
- Registry ID: MSC-GUIDE-050
- Approved H1: What Is Bitcoin Knots?
- Why this step appears here: Return to implementation comparison after the reader can distinguish consensus, policy, releases, interfaces, and proposals.
- What the reader should understand before continuing: Shared code lineage does not make two releases identical, so comparisons must pin versions, commits, configurations, and observed behavior.
- Final source-guide depth: Deep
- Final source-guide format: Comparative Technical Explainer
- Final estimated reading time: 14 to 17 minutes
- Workflow status note: COPY_LOCKED editorial content, not yet a confirmed published destination.
- URL status: None. Keep inactive until publication and URL confirmation.

### Step 29: MSC-GUIDE-064 | How to Run Reliable Bitcoin Infrastructure

- Step number: 29
- Registry ID: MSC-GUIDE-064
- Approved H1: How to Run Reliable Bitcoin Infrastructure
- Why this step appears here: Finish with the operating discipline needed to make every previous layer usable for a defined workload.
- What the reader should understand before continuing: Readiness requires verified chain identity, validation, synchronization, indexes, wallets, monitoring, storage, backups, recovery, reorganization handling, and explicit service boundaries.
- Final source-guide depth: Deep
- Final source-guide format: Technical Explainer
- Final estimated reading time: 29 to 33 minutes
- Workflow status note: COPY_LOCKED editorial content, not yet a confirmed published destination.
- URL status: None. Keep inactive until publication and URL confirmation.

## 5. Key Terms

1. **Implementation:** Software that realizes some set of Bitcoin node, wallet, network, policy, interface, protocol, or operating behavior.
2. **Consensus rule:** A rule used to determine whether Bitcoin blocks or transactions are valid in an active chain context.
3. **Policy:** A local choice for mempool acceptance, relay, mining selection, wallet behavior, or operation that is not necessarily consensus.
4. **RPC:** A versioned request and response interface used by a client to query or control a running software implementation.
5. **API:** An interface to a node, wallet, indexer, Lightning implementation, provider, or application whose responses inherit the producing system's limits.
6. **Indexer:** Software that derives searchable or application-specific state from ordered Bitcoin or mempool data.
7. **Independent validation:** Checking Bitcoin blocks and transactions with rules and software selected by the operator rather than accepting another service's conclusion alone.
8. **Bitcoin Script:** Bitcoin's constrained and context-dependent validation language for output spending conditions.
9. **Witness version:** A versioned output-program context used to define specific spending rules, including SegWit version 0 and Taproot version 1.
10. **Client-side validation:** A model in which recipients validate application state from locally held history and commitments rather than asking all Bitcoin nodes to maintain that state.
11. **Sidechain:** A separate blockchain connected to Bitcoin through a peg, bridge, or other transfer mechanism.
12. **Covenant:** A spending condition that constrains how bitcoin may be spent in a later transaction, with exact capability depending on the available Script rules.
13. **Deployment:** Evidence that a proposal or feature is in active use under criteria appropriate to its document or system layer.
14. **Activation:** The point or process by which specified consensus rules begin to be enforced under defined network conditions.
15. **Reproducibility:** The ability to repeat a build, test, or observation from defined source, inputs, configuration, and environment and compare the result.
16. **Release artifact:** A fixed source archive, tag, binary, note, checksum, signature, or attestation published for a named release.
17. **Hosted service:** Infrastructure operated by another party under its own software, configuration, authentication, privacy, retention, and availability controls.
18. **Data availability:** Access to the information required to verify state, synchronize, challenge a claim, recover, or exit.
19. **Unilateral exit:** A settlement or recovery path a participant can exercise without ongoing counterparty cooperation.
20. **Maturity evidence:** Dated evidence about specification, code, tests, interoperability, audit scope, release state, deployment, incidents, and operations.

Final Key Terms count: 20

## 6. Sources

1. **Master registry and content manifest**
   - Repository records: `docs/learn/MSC_Learn_Master_Registry.json` and `docs/learn/content/content-manifest.json`
   - Supports: Canonical path identity, sequence, relationships, content ownership, file locations, production timing, and workflow status.
   - Boundary: Editorial planning records do not prove publication, active URLs, technical correctness, deployment, or adoption.

2. **Building on Bitcoin hub**
   - Repository record: `docs/learn/content/hubs/MSC-HUB-BUILDING-learn-building-on-bitcoin.md`
   - Supports: Cross-layer boundaries, final card metadata for MSC-GUIDE-033 through MSC-GUIDE-048, and the distinction between application behavior and Bitcoin consensus.

3. **Bitcoin Development hub**
   - Repository record: `docs/learn/content/hubs/MSC-HUB-DEVELOPMENT-learn-bitcoin-development.md`
   - Supports: Implementation, protocol, cryptography, interface, testing, release, and infrastructure boundaries plus final card metadata for MSC-GUIDE-049 through MSC-GUIDE-064.

4. **Twenty-nine copy-locked source guides**
   - Repository records: The exact twenty-nine guide files listed in Section 4 under `docs/learn/content/guides/`.
   - Supports: Approved H1s, depth, format, estimated reading time, technical boundaries, guide-level source records, and final editorial explanations.

5. **Official implementation and release sources**
   - Source families: Official Bitcoin Core and Bitcoin Knots repositories, tagged source trees, release notes, lifecycle records, checksums, signatures, and build attestations.
   - Supports: Version-specific implementation, release, interface, policy, source, and operational claims when pinned and dated.

6. **Official BIP and protocol repositories**
   - Source families: The official Bitcoin BIPs repository and official project or specification repositories cited by the source guides for Lightning, Ark, RGB, Ord, Runes, DLCs, BitVM, and related systems.
   - Supports: Document text, version history, status fields, protocol definitions, test vectors, and project warnings within their stated scope.

7. **Release-pinned technical documentation and test evidence**
   - Source families: Documentation, source files, test suites, vectors, functional tests, fuzz targets, CI records, reproducible-build evidence, and operational references pinned to exact releases or commits where required.
   - Supports: Narrow implementation and testing observations without converting test success into a universal correctness or safety claim.

Final source-family count: 7

## 7. SEO title

Build on Bitcoin: Software, Protocols, and Infrastructure

## 8. Meta description

Follow a 29-step Bitcoin learning path through implementations, APIs, wallets, Script, higher layers, emerging protocols, and reliable infrastructure.

## 9. Page excerpt

Build a systems-level understanding of Bitcoin software, interfaces, protocol rules, higher-layer architectures, indexed assets, experimental proposals, and infrastructure operations.

## 10. Estimated reading time

24 minutes for path orientation and step review, excluding the twenty-nine source guides

## 11. Planned internal links

Do not activate any planned relationship until the destination exists as a published page with a confirmed URL.

- Parent: MSC-LRN-HOME | Learn
- Related category hub: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Related category hub: MSC-HUB-BUILDING | Building on Bitcoin
- Branch opportunity: MSC-PATH-NETWORK | Understand the Network
- Branch opportunity: MSC-PATH-SAFE | Use Bitcoin Safely
- Branch opportunity: MSC-PATH-ECOSYSTEM | Explore the Ecosystem
- Glossary relationship: MSC-GLOSSARY-001 | Bitcoin Glossary
- Step relationships: The twenty-nine canonical source guides listed in Section 4

All step links, hub links, learning-path branches, anchors, routes, website pages, public URLs, and action labels remain inactive. No destination URL is assigned.

## 12. Accuracy review checklist

- [x] Frontmatter matches the authorized MSC-PATH-BUILD fields exactly.
- [x] The visible H1 is Build on Bitcoin.
- [x] The package contains exactly fourteen numbered H2 sections in the required order.
- [x] Section 2 stays within the requested orientation-copy range.
- [x] The path contains exactly twenty-nine step cards.
- [x] Every approved Registry ID appears exactly once and in the authorized order.
- [x] Every card uses the final copy-locked source-guide H1, depth, format, and estimated reading time.
- [x] Every workflow note states that the source is COPY_LOCKED editorial content and not a confirmed published destination.
- [x] Every URL status remains inactive pending publication and URL confirmation.
- [x] Bitcoin consensus is separated from software implementations, policy, wallets, APIs, indexes, and hosted services.
- [x] Released behavior is separated from unreleased code.
- [x] BIP document status is separated from implementation, deployment, activation, and adoption.
- [x] API responses are separated from independent validation.
- [x] Higher-layer systems retain distinct custody, liveness, data, validation, and exit assumptions.
- [x] Ordinals, inscriptions, Runes, and BRC-20 remain distinct systems.
- [x] Experimental proposals are not presented as deployed systems or endorsements.
- [x] Technical capability is separated from maturity and adoption.
- [x] No Markdown step links or active destination URLs appear.
- [x] Exactly three complete illustration briefs are included and remain PLANNED.
- [x] Human Verification and independent editorial review remain pending.
- [x] No em dash or en dash character appears.

## 13. Human verification

- Reviewer: Pending
- Review date: Pending
- Human Verification: incomplete
- Independent editorial review: required before copy-lock
- Notes: No approval, acceptance, copy-lock, publication, or implementation decision is claimed in this draft.

## 14. Illustration brief

### Illustration 1

- Purpose: Show the complete learning route as a sequence of distinct technical layers rather than a single promotional stack.
- Composition: A vintage nautical chart with seven connected zones: implementation and workspace, interfaces and application state, source and release evidence, protocol prerequisites, higher-layer systems, indexed asset protocols, and proposals plus operations.
- Required systems or labels: Bitcoin Core, Development environment, RPC and APIs, Wallet integration, Indexers, Source and tests, BIPs and Script, SegWit, Taproot, Schnorr, Higher layers, Indexed protocols, Experimental proposals, Bitcoin Knots, Reliable infrastructure.
- Visual hierarchy: Use one calm primary route with seven labeled zones, small numbered markers for all twenty-nine steps, and no completion badge or product ranking.
- Accuracy constraints: Keep Bitcoin consensus visually separate from implementation, application, service, and protocol layers. Do not imply that every system inherits Bitcoin security or that the route activates any destination.
- Accessibility considerations: Use high-contrast labels, readable type at mobile size, redundant numbering and text rather than color alone, and concise alt text describing the seven-zone progression.
- Status: PLANNED

### Illustration 2

- Purpose: Explain why a development environment, RPC, API, wallet integration, and indexer are separate systems with separate evidence and trust boundaries.
- Composition: A vintage shipboard systems diagram showing an application console connected to a wallet subsystem, a local node RPC, an optional hosted API, and an index database, with the Bitcoin peer network and validated chainstate shown as separate reference layers.
- Required systems or labels: Application, Wallet integration, Key control, RPC client, Node implementation, Validated chainstate, Hosted API, Indexer, Derived state, Bitcoin peer network, Authentication, Reorganization handling.
- Visual hierarchy: Place the validating node and chainstate at the center, application components around it, and hosted dependencies outside a clearly marked operating boundary.
- Accuracy constraints: Do not show an API response as consensus proof. Do not place private keys inside the hosted service by default. Show indexed state as derived and reorganization-aware.
- Accessibility considerations: Use clear directional arrows with text labels, distinguish required from optional components with line style as well as color, and provide alt text that names each boundary.
- Status: PLANNED

### Illustration 3

- Purpose: Compare the distinct security and state models encountered after the protocol prerequisites.
- Composition: A muted cartographic comparison plate with four bays: Lightning and payment channels, sidechains and bridges, Ark and RGB state models, and Ordinals, inscriptions, Runes, and BRC-20 indexing. A separate offshore research inset contains DLCs, BitVM, OP_CAT, and emerging protocols.
- Required systems or labels: Bitcoin settlement, Channel state, Sidechain consensus, Peg or bridge, Ark operator, Client-side validation, Ord index, Runes index, BRC-20 parser, Oracle, Challenger, Proposed opcode, Data availability, Exit path.
- Visual hierarchy: Keep Bitcoin settlement as the common coastline, place each higher-layer model in its own bay, and use the research inset to show that proposals require separate maturity evidence.
- Accuracy constraints: Do not merge the four asset protocols, do not show sidechain state as Bitcoin consensus, do not imply guaranteed exits or maturity, and keep protocol mechanics separate from token or investment imagery.
- Accessibility considerations: Use a consistent border matching approved Mempool Surf Club references, large bay titles, pattern and label redundancy, restrained detail density, and a text summary suitable for screen readers.
- Status: PLANNED
