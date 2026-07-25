---
registry_id: MSC-GUIDE-049
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: What Is Bitcoin Core?
handle: bitcoin-core
category: Bitcoin Development
subcategory: Bitcoin Core
depth: Deep
format: Technical Explainer
primary_path: Build on Bitcoin
secondary_paths:
  - Understand the Network
author_display: Mempool Surf Club Editorial
reviewed_date: null
copy_locked_date: null
---

# What Is Bitcoin Core?

## 1. Introductory deck

Bitcoin Core is an open-source software project that implements a Bitcoin node and optional wallet interfaces. It validates blocks and transactions, maintains chainstate, communicates with peers, applies local relay policy, and exposes tools for operators and developers. It is influential software, but it is not Bitcoin itself and its maintainers do not control the network.

## 2. Full article

Bitcoin Core is one implementation of Bitcoin. The project publishes source code and release binaries for software that can connect to the Bitcoin peer-to-peer network, validate the block chain, relay transactions and blocks, maintain a mempool, serve application interfaces, and optionally manage wallets.

That description contains several boundaries that matter. Bitcoin is a network and a set of rules enforced by independently operated software. Bitcoin Core is a project whose software implements those rules and many additional behaviors. A Bitcoin Core default can be a local policy choice rather than a consensus rule. A wallet feature can affect transaction construction without changing what blocks are valid. An RPC can change between software releases without changing the peer-to-peer protocol. A maintainer can merge code into a repository, but cannot compel node operators, miners, businesses, or other implementations to run it.

This guide was reviewed on July 24, 2026 against Bitcoin Core 31.1, tag `v31.1`, commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`. Current behavior should always be checked against the exact release a node runs.

### A project, an implementation, and a running node

“Bitcoin Core” can refer to the open-source project, its source repository, a tagged software release, or a running instance. Those are related but not identical.

The project coordinates proposed code changes, review, testing, release engineering, documentation, and security maintenance. The repository contains both released code and unreleased development work. A stable tag identifies a particular release tree. A running node applies the code, configuration, databases, indexes, wallet state, and local operating environment selected by its operator.

The distinction prevents a common mistake: treating a repository statement as a network rule. Bitcoin consensus emerges from compatible validation across independently chosen software. Bitcoin Core is widely referenced because it is a mature implementation and because its code and tests document deployed behavior, but neither its repository nor its maintainers are a central protocol authority.

### The main programs

A standard build can provide several programs.

`bitcoind` is the headless daemon. It connects to peers, validates and relays data, maintains node state, and can expose server interfaces.

`bitcoin-qt` provides a graphical interface around node and optional wallet functionality. The graphical application does not define a separate consensus system; it is another interface to components in the software.

`bitcoin-cli` is a command-line client for the JSON-RPC server. It sends requests to a running node. The client is not itself the validating node.

Bitcoin Core can also build utilities such as `bitcoin-wallet`, `bitcoin-tx`, and `bitcoin-util`. Their presence and exact commands are release-specific.

Wallet functionality is optional. A node can validate the chain without loading or even building the wallet component. Conversely, a wallet uses node and chain information but adds key management, descriptors, coin selection, transaction creation, fee decisions, address handling, and wallet-database behavior that are not Bitcoin consensus rules.

### Block and transaction validation

A fully validating node checks blocks and transactions against the active consensus rules it implements. These checks include transaction structure, scripts, signatures, output values, coin availability, block structure, proof of work, and contextual rules that depend on chain history.

Validation is not a single function or file. In Bitcoin Core 31.1 it crosses primitives, script execution, consensus helpers, chain parameters, validation logic, caches, and tests. Historical compatibility also matters: code must continue interpreting old blocks consistently while applying rules that became active later.

A transaction can be consensus-valid yet absent from a node’s mempool. A node can refuse to relay a transaction because of policy while still accepting a later block that contains it. That separation is essential when reading logs, comparing implementations, or interpreting a configuration option.

### Chainstate and the UTXO set

Bitcoin Core tracks the chain it currently considers to have the most accumulated proof of work among valid candidates. It also maintains chainstate: the information needed to validate the next block, especially the set of unspent transaction outputs, or UTXOs.

The UTXO set is not a list of account balances. It records spendable outputs and the data needed to decide whether a new transaction may spend them. Bitcoin Core stores block data, undo data, chain indexes, and chainstate databases with different purposes and retention requirements.

Validation and indexing should not be collapsed. The node needs chainstate to validate. Optional indexes exist to answer additional queries efficiently. Enabling an index can increase storage and synchronization work; disabling it does not make basic consensus validation incomplete.

### Peer-to-peer networking

Bitcoin Core discovers and connects to peers, exchanges network messages, downloads headers and blocks, announces inventory, relays transactions, and manages peer behavior. Network code must handle untrusted input, resource limits, synchronization, timeouts, and misbehavior without assuming every peer runs Bitcoin Core.

The software release version is not the peer-to-peer protocol version. Peers negotiate message capabilities through separate protocol mechanisms. A new Bitcoin Core release can change networking behavior without changing consensus, and different implementations can communicate if they support compatible protocol behavior.

### The mempool and relay policy

The mempool is a node’s local collection of unconfirmed transactions that currently satisfy its admission rules. It is not a global Bitcoin object. Two honest nodes can have different mempools because they received different transactions, use different configurations, restarted at different times, or apply different policy.

Bitcoin Core policy includes standardness rules, fee and resource limits, replacement behavior, package handling, and other admission or relay decisions. These rules help manage denial-of-service exposure and resource use. Miners may use related but not identical policies when constructing blocks.

Consensus asks whether a block is valid. Mempool policy asks whether a node will hold or relay an unconfirmed transaction. Mining policy asks what a block producer chooses to include. Confusing them can make a local rejection look like a protocol prohibition.

### Mining and block-template interfaces

Bitcoin Core does not need to mine in order to validate. It does, however, expose interfaces that mining systems can use, including RPCs for constructing and submitting block candidates. `getblocktemplate` supplies data and constraints for external mining software; `submitblock` submits a completed candidate for validation.

These interfaces do not give Bitcoin Core maintainers control over miners. A miner chooses its node software, transaction-selection logic, templates, and operational architecture. The node still validates submitted blocks according to its active rules.

### RPC, REST, and ZMQ

Bitcoin Core provides several application-facing interfaces.

JSON-RPC is the primary command and automation interface. RPC methods can inspect node state, manage wallets when enabled, control networking, query the mempool, submit data, and administer indexes. The RPC interface is software-versioned behavior, not a stable consensus specification.

The optional REST interface exposes selected read-oriented endpoints and is enabled by configuration. Some queries require optional indexes.

ZeroMQ notifications can publish selected events, such as block or transaction notifications, to subscribers. Notifications are not a durable database or a consensus feed; applications must handle missed messages, reordering boundaries, restarts, and reorganization logic according to the interface documentation.

Interfaces should be protected as operational services. Authentication, network binding, firewalling, transport security, and permission design are deployment responsibilities, not guarantees supplied merely by running a node.

### Optional indexes and pruning

Indexes trade storage and build time for query capability. Examples include the transaction index and compact block filter index. An application should document which indexes it requires instead of assuming every node provides historical lookup.

Pruning allows a node to discard old block files after validation while retaining the chainstate needed to validate new blocks. A pruned node still validates the chain; pruning changes local data retention and can limit rescans, historical serving, and index combinations. It does not convert the node into simplified payment verification.

Exact storage needs and pruning constraints vary by release, configuration, and chain growth. Current operator documentation should be used rather than a fixed number copied into long-lived guidance.

### Testing and regtest

Bitcoin Core includes unit tests, functional tests, fuzz targets, benchmarks, and continuous-integration configurations. Tests are evidence about specified cases, not proof that the implementation has no defects.

Regtest creates a private testing chain whose blocks can be generated on demand. It is useful for learning RPCs, exercising wallet flows, testing reorganizations, and reproducing application behavior without real funds. Signet and public test networks serve different purposes and should not be treated as interchangeable with regtest.

Developers should pin the release or commit they are testing. A test that passes on the development branch may depend on behavior not present in the latest stable release.

### Source, contributions, and project governance

The `bitcoin/bitcoin` repository uses an open contributor workflow. Proposed changes arrive as pull requests and are reviewed, tested, revised, or rejected. Repository maintainers perform practical duties such as merging changes, managing releases, and moderating the repository.

Merge access is not authority over Bitcoin. Maintainers cannot update independently operated nodes, force miners to include transactions, activate a consensus rule by declaration, or prevent compatible alternative software from participating. Operators decide what to run, and network consequences depend on actual deployment and compatibility.

Consensus-related changes require especially careful analysis beyond ordinary software review. A merged pull request can remain unreleased. Released code can contain dormant logic. A proposal can be present without activation. Network adoption is a separate fact that must be measured and dated.

### Releases, maintenance, and security updates

Bitcoin Core develops on its main integration branch and creates release branches and stable tags. Major releases introduce a broader set of changes. Maintenance releases generally backport selected bug and security fixes for supported release lines.

As reviewed July 24, 2026, the project’s lifecycle page says the latest three major versions are maintained and lists 31.x, 30.x, and 29.x in that window. The page aims for major releases about every six to seven months, but schedules are proposals rather than consensus rules or guarantees.

Security advisories and fixes should be evaluated by affected versions, disclosure date, patch release, and operator exposure. “Latest” is not enough: an operator may need to compare its exact version, platform, configuration, wallet use, and enabled interfaces.

### Licensing and alternative implementations

Bitcoin Core is released under the MIT license. The license permits use, modification, and redistribution subject to its terms, and it comes without a warranty of correctness or fitness.

Bitcoin Core is not the only possible implementation. Alternative software can participate when it enforces compatible active consensus rules and communicates compatibly with peers. Implementations may differ in architecture, policy, wallet behavior, interfaces, defaults, release process, and feature set.

Diversity can reduce dependence on one codebase, but consensus-critical divergence can also create serious risk. Compatibility therefore has to be tested against exact versions, configurations, and network conditions rather than assumed from a product name.

### A practical boundary map

When evaluating a Bitcoin Core claim, classify it first:

- **Consensus rule:** determines whether blocks and transactions are valid.
- **Consensus implementation:** Bitcoin Core code that enforces those rules.
- **Policy:** local mempool, relay, or mining-selection behavior.
- **Wallet behavior:** key, coin-selection, fee, and transaction-construction logic.
- **Interface behavior:** RPC, REST, ZMQ, command-line, or graphical behavior.
- **Default or configuration:** an operator-adjustable choice in a specific release.
- **Project governance:** how repository and release work is coordinated.
- **Network adoption:** what independently operated systems actually run.

That map is more reliable than saying “Bitcoin Core does it” without identifying which layer is involved.

## 3. Key Terms

- **Bitcoin Core:** An open-source Bitcoin node implementation and software project.
- **Full validation:** Independently checking blocks and transactions against active consensus rules.
- **Consensus implementation:** Code that enforces the implementation’s interpretation of Bitcoin consensus.
- **Chainstate:** Local state used to validate the active chain, including the UTXO set.
- **UTXO set:** The currently unspent transaction outputs available under the accepted chainstate.
- **Mempool:** A node-local set of unconfirmed transactions accepted under local policy.
- **Relay policy:** Rules a node uses when accepting and forwarding unconfirmed transactions.
- **Mining policy:** Rules and preferences used to construct a candidate block.
- **RPC:** A request-response interface for controlling or querying software.
- **Index:** Additional stored data built to support particular queries.
- **Pruning:** Discarding old block files after validation while retaining validation state.
- **Regtest:** A private Bitcoin testing network with locally generated blocks.
- **Release branch:** A branch maintained for a particular software release line.
- **Stable tag:** A Git reference identifying an official release source tree.

## 4. Sources

1. **Bitcoin Core v31.1 README** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/README.md
   - Supports: Full validation, optional wallet and GUI, MIT licensing, stable tags, development-branch boundaries, and testing.
2. **Bitcoin Core v31.1 Tag Commit** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/commit/9be056a8a72b624dae9623b2f7bded92c2a21c91
   - Supports: Exact source commit reviewed for Bitcoin Core 31.1.
3. **Bitcoin Core Download Page** | Bitcoin Core project
   - URL: https://bitcoincore.org/en/download/
   - Supports: Current release, official binaries, checksum verification, multiple signatures, and pruning overview reviewed July 24, 2026.
4. **Bitcoin Core Software Life Cycle** | Bitcoin Core project
   - URL: https://bitcoincore.org/en/lifecycle/
   - Supports: Versioning, maintenance releases, supported branches, schedule aims, and separation from protocol versions.
5. **Contributing to Bitcoin Core at v31.1** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/CONTRIBUTING.md
   - Supports: Contributor workflow, peer review, maintainers’ practical responsibilities, testing, and component boundaries.
6. **Bitcoin Core v31.1 Source Tree** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/src
   - Supports: Current node, wallet, policy, script, RPC, index, networking, test, and interface organization.
7. **Bitcoin Core v31.1 Validation Source** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/validation.cpp
   - Supports: Chainstate and block and transaction validation implementation.
8. **Bitcoin Core v31.1 Script Interpreter** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/interpreter.cpp
   - Supports: Script execution as one part of consensus validation.
9. **Bitcoin Core v31.1 Network Processing** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/net_processing.cpp
   - Supports: Peer message processing, synchronization, relay, and network behavior.
10. **Bitcoin Core v31.1 Policy Directory** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/src/policy
    - Supports: Separation of standardness and relay policy from consensus.
11. **Bitcoin Core v31.1 Mining RPC Source** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/rpc/mining.cpp
    - Supports: Block-template and block-submission interfaces.
12. **Bitcoin Core JSON-RPC Interface** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/JSON-RPC-interface.md
    - Supports: RPC consistency and interface-version boundaries.
13. **Bitcoin Core REST Interface** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/REST-interface.md
    - Supports: Optional REST behavior and index-dependent queries.
14. **Bitcoin Core ZMQ Documentation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/zmq.md
    - Supports: Notification interfaces and subscriber responsibilities.
15. **Bitcoin Core v31.1 Index Source** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/src/index
    - Supports: Optional index architecture distinct from validation.
16. **Bitcoin Core Reduce Memory Documentation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/reduce-memory.md
    - Supports: Pruning and resource-configuration boundaries.
17. **Bitcoin Core Testing README** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/test/README.md
    - Supports: Unit-test organization and execution.
18. **Bitcoin Core Functional Tests** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/test/functional
    - Supports: Integration and regtest-based functional testing.
19. **Bitcoin Core Security Policy** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/SECURITY.md
    - Supports: Supported-version and vulnerability-reporting boundaries.
20. **Bitcoin Core Release Process** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/release-process.md
    - Supports: Release branches, tagging, Guix builds, signatures, and release artifacts.

## 5. SEO title

What Is Bitcoin Core? Node Software Explained | Mempool Surf Club

## 6. Meta description

Learn what Bitcoin Core does, from validation and chainstate to mempool policy, wallets, interfaces, releases, and project governance.

## 7. Page excerpt

Bitcoin Core is a Bitcoin implementation, not Bitcoin itself. See how its validation, networking, policy, wallet, and release layers fit together.

## 8. Estimated reading time

16 to 19 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-048 | Emerging Protocols on Bitcoin: How to Evaluate Them
- Next: MSC-GUIDE-050 | What Is Bitcoin Knots?
- Prerequisite: MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
- Prerequisite: MSC-GUIDE-021 | What Is a Bitcoin Full Node?
- Prerequisite: MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?
- Branch: MSC-GUIDE-031 | How Bitcoin Soft Forks Work
- Branch: MSC-GUIDE-041 | Bitcoin Developer Tools: A Practical Overview
- Branch: MSC-GUIDE-044 | How Bitcoin Indexers Work
- Return: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] Bitcoin Core is described as a project and implementation, not Bitcoin itself.
- [x] Consensus, consensus implementation, policy, wallet, interfaces, defaults, governance, and adoption remain distinct.
- [x] `bitcoind`, `bitcoin-qt`, `bitcoin-cli`, optional wallet functionality, and release-specific utilities are correctly bounded.
- [x] Validation, chainstate, UTXOs, networking, mempool, mining interfaces, RPC, REST, ZMQ, indexes, pruning, and testing are covered.
- [x] Maintainers are not described as controlling Bitcoin or independently activating consensus changes.
- [x] Alternative compatible implementations are acknowledged without assuming automatic compatibility.
- [x] Current claims are pinned to Bitcoin Core 31.1, tag `v31.1`, commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`, reviewed July 24, 2026.
- [x] Planned internal links remain inactive and do not imply publication.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-24
- Notes: Verified the official download and lifecycle pages, the `v31.1` tag and release commit, the tagged source tree, README, contribution process, validation, networking, policy, mining, interface, index, test, security, and release-process documentation. Confirmed that the article separates consensus enforcement from mempool and relay policy, wallet behavior, RPC behavior, defaults, repository governance, and network adoption.

## 12. Illustration brief

### Illustration 1

- Concept title: Bitcoin Core Systems Chart
- Educational purpose: Show the internal layers of a node without presenting the software as the Bitcoin network itself.
- Recommended placement: After The main programs.
- Visual description: Vintage marine-engine cutaway with interfaces at the controls, networking at the radio, validation and chainstate in the engine room, and the external Bitcoin network shown as surrounding ocean traffic.
- Required labels: bitcoin-qt, bitcoin-cli, bitcoind, Wallet, RPC, P2P network, Validation, Chainstate, UTXO set, Mempool
- Caption: Bitcoin Core combines several components, while the wider Bitcoin network remains independently operated.
- Alt text: Cutaway systems diagram of Bitcoin Core components connected to an external peer-to-peer network.
- Image orientation: Landscape
- Mobile crop notes: Stack interfaces, node services, and validation state in three vertical bands.
- Status: PLANNED

### Illustration 2

- Concept title: Consensus and Policy Tide Gauge
- Educational purpose: Distinguish block validity from local mempool and relay decisions.
- Recommended placement: After The mempool and relay policy.
- Visual description: Nautical tide gauge with a fixed lower consensus boundary and adjustable upper policy markers for mempool, relay, mining selection, and configuration.
- Required labels: Consensus validity, Mempool admission, Relay, Mining selection, Local configuration
- Caption: A transaction can be valid under consensus while a node declines to hold or relay it under local policy.
- Alt text: Tide gauge separating consensus validity from adjustable mempool, relay, and mining policies.
- Image orientation: Landscape
- Mobile crop notes: Preserve the fixed consensus line and three policy markers.
- Status: PLANNED

### Illustration 3

- Concept title: Node Data Retention Map
- Educational purpose: Explain chainstate, optional indexes, and pruning as separate storage choices.
- Recommended placement: After Optional indexes and pruning.
- Visual description: Vintage harbor warehouse map with a live chainstate desk, UTXO ledger, optional index cabinets, and an archive where old block crates may be pruned after inspection.
- Required labels: Chainstate, UTXO set, Block files, Undo data, Optional indexes, Pruning
- Caption: Validation state, historical block retention, and optional query indexes serve different purposes.
- Alt text: Storage map distinguishing chainstate, UTXOs, block files, indexes, and pruning.
- Image orientation: Landscape
- Mobile crop notes: Use one central chainstate desk with storage branches.
- Status: PLANNED
