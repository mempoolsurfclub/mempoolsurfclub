---
registry_id: MSC-GUIDE-024
status: COPY_LOCKED
page_role: topic-guide
h1: Bitcoin Node Software Explained
handle: bitcoin-node-software
category: The Bitcoin Network
subcategory: Nodes
depth: Deep
format: Comparison
primary_path: Understand the Network
secondary_paths:
  - Build on Bitcoin
author_display: Mempool Surf Club Editorial
reviewed_date: 2026-07-18
copy_locked_date: 2026-07-18
---

# Bitcoin Node Software Explained

## 1. Introductory deck

Bitcoin node software connects to peers and may validate, relay, store, or serve network data according to its configuration. Different implementations can enforce compatible consensus rules while making different choices about transaction policy, features, interfaces, release processes, and defaults. Choosing software therefore requires more than comparing names or popularity.

## 2. Full article

A Bitcoin node is defined by behavior, not by a logo.

Node software receives peer-to-peer messages, validates blocks and transactions, maintains chainstate, selects valid proof-of-work history, and exposes local functions according to its configuration. The software may also include a wallet, graphical interface, RPC server, indexes, privacy-network support, mining interfaces, or application hooks.

More than one implementation can participate in Bitcoin, but compatibility is not automatic. Software that disagrees on a consensus rule can accept a different chain. Software that agrees on consensus can still differ in transaction relay, mempool policy, defaults, user interface, packaging, and optional features.

A responsible comparison starts by separating those layers.

### Consensus behavior is the first boundary

Consensus rules determine whether a block and its transactions are valid.

A node implementation must correctly enforce the rules required by the network it intends to join. These include proof-of-work requirements, transaction validity, script rules, issuance limits, block limits, locktime behavior, and activated protocol changes.

If two implementations disagree on consensus behavior at a relevant block, they can select incompatible histories. That is why consensus code receives unusually careful review and testing.

Software diversity can reduce dependence on one codebase, but it can also create independent opportunities for consensus bugs. Neither uniformity nor diversity is automatically safe. The relevant questions are how implementations are maintained, tested, reviewed, and kept compatible.

An implementation's claim to be a Bitcoin node should be evaluated through documented behavior and source code, not branding alone.

### Policy is not consensus

Node software also applies local policy to unconfirmed transactions.

Policy can determine:

- Which transactions enter a node's mempool.
- Which transactions the node relays.
- Which transactions are treated as standard by default.
- How replacement is evaluated.
- How package relationships and resource limits are handled.
- Which transactions a default mining template may select.
- What fees or resource thresholds influence local behavior.

A transaction rejected from one node's mempool can still be valid by consensus. If a miner includes it in a valid block, a compatible node must accept the block even if its local policy would not have relayed that transaction.

This distinction is central to node-software comparisons. A stricter or looser default relay policy does not necessarily mean the implementation follows different consensus rules.

Policy differences can still matter. They affect propagation, user experience, miner visibility, application testing, and which transactions are easy to broadcast. Operators should understand those effects without describing policy preferences as changes to Bitcoin validity.

### Bitcoin Core

Bitcoin Core is the most widely used open-source Bitcoin node and wallet software implementation.

It connects to the peer-to-peer network, downloads and fully validates blocks and transactions, maintains chainstate, and provides a command-line daemon, RPC interface, and optional wallet and graphical interface.

Bitcoin Core is developed through a public repository. Changes are proposed, reviewed, tested, and merged through an open process. Stable release tags are created from release branches, while the master development branch is not guaranteed to be stable.

Its broad use creates practical advantages:

- Extensive operational experience.
- Wide compatibility with wallets and infrastructure.
- Large test coverage and review attention.
- Established documentation and release processes.
- Familiar RPCs and configuration conventions.
- Broad packaging and platform support.

Broad use is not proof that every default fits every operator. Bitcoin Core includes many configuration choices, optional indexes, wallet functions, peer-network settings, and policy defaults. Operators still need to review the release and configuration they use.

### Bitcoin Knots

Bitcoin Knots is a maintained Bitcoin node software implementation with policy and feature differences from Bitcoin Core.

Its codebase is derived from Bitcoin Core and remains closely related, but it is maintained and released as a separate project. It can connect to Bitcoin peers and fully validate blocks and transactions.

Knots may include additional configuration options, backported changes, different defaults, or policy choices that are not identical to the corresponding Bitcoin Core release.

That relationship requires precise wording. Bitcoin Knots is not an unrelated clean-room implementation, and it should not be described as merely a theme or interface for Bitcoin Core. It is a separate maintained software distribution built from a closely related codebase.

An operator comparing the two should read the current Knots release notes and documentation rather than relying on a timeless list of differences. Features, defaults, backports, and release relationships can change.

### Related codebases do not eliminate comparison work

Because Bitcoin Core and Bitcoin Knots share substantial history and code, many operational concepts are familiar across both projects. That can support compatibility with existing infrastructure.

Shared ancestry also means they may share some defects, assumptions, file formats, or architectural limits. A difference in one policy area does not imply independent implementation of every consensus component.

The meaningful comparison is release-specific:

- Which upstream changes are included?
- Which additional patches are included?
- Which defaults differ?
- Which policy controls are exposed?
- How are releases signed and distributed?
- Which operating systems and build configurations are supported?
- What migration or data-directory guidance is published?
- Which RPC or wallet behaviors differ?
- How quickly are security and bug fixes integrated?

Do not infer these answers from the project name.

### Other implementations and specialized software

Bitcoin has had other node implementations, protocol libraries, indexers, wallet servers, and research projects.

Some may fully validate mainnet blocks. Others implement only selected protocol functions. A library that parses transactions is not necessarily a complete node. An Electrum server normally depends on a validating backend. An explorer may index data supplied by another node. A mining proxy may speak mining protocols without validating the complete chain.

Software should be classified by what it actually does:

- Does it validate all required consensus rules?
- Does it maintain chainstate?
- Does it participate in Bitcoin's peer-to-peer network?
- Does it select valid chain history by accumulated work?
- Does it relay transactions or blocks?
- Does it serve historical data?
- Does it expose wallet or application interfaces?
- Is it intended for production mainnet use?

A comparison that places every Bitcoin-related program in one node-software list obscures these differences.

### Source availability is necessary but not sufficient

Open source allows operators and reviewers to inspect the code, build it, compare changes, and test behavior.

That does not mean every operator personally audits every line. Trust is distributed across maintainers, reviewers, testers, reproducible-build participants, package maintainers, and users who report failures.

Useful project signals include:

- Public source and issue tracking.
- Documented contribution and review processes.
- Automated and manual testing.
- Clear release tags and notes.
- Signed release materials.
- Security-reporting procedures.
- Reproducible or independently checked builds.
- Active maintenance and transparent unresolved issues.
- Clear licensing.
- Documentation for upgrades and incompatibilities.

Popularity can bring more review and operational exposure, but popularity alone is not a substitute for these properties.

### Release binaries and source code are different artifacts

A source repository shows what can be built. A downloaded binary is a particular build produced through a release process.

An operator should know:

- Who built the binary.
- Which source tag it corresponds to.
- Which build options were used.
- How checksums and signatures are published.
- Whether the build can be reproduced or independently compared.
- How updates are delivered.
- Whether a package distributor applies extra patches.

Official project binaries, operating-system packages, containers, and appliance images can all have different trust paths.

A signed package confirms an attestation from the signer. It does not prove that the software is bug-free or that every included patch is appropriate. Binary verification and source review answer different questions.

### Defaults are part of the user experience

Two implementations can offer similar capabilities but guide operators toward different behavior through defaults.

Defaults may affect:

- Mempool size and transaction policy.
- Replacement behavior.
- Listening and peer connectivity.
- Pruning and block storage.
- Wallet availability.
- Network privacy settings.
- Index creation.
- RPC exposure.
- Logging.
- Resource allocation.
- Mining-template construction.

A default is not a consensus rule. It is still consequential because many operators never change it.

When comparing software, document the installed release's defaults instead of repeating a historical blog post. Also distinguish defaults from available options. An implementation may support a behavior without enabling it automatically.

### Configuration names are not universal contracts

Related implementations may recognize many of the same configuration options and RPCs, but compatibility should not be assumed.

An option can be renamed, removed, given a different default, or interpreted differently. An RPC can return additional fields or change behavior across releases. Wallet formats and migration paths can evolve.

Copying a configuration file from one implementation or version into another without review can create startup failures or unintended behavior.

Use each project's built-in help, release notes, and official documentation. Treat configuration as versioned operational code.

For automated infrastructure, test the exact combination of node release, RPC client, wallet, indexer, and dependent service before production deployment.

### Data directories require special caution

Node data directories contain databases and files whose formats and migration behavior can change.

Closely related implementations may be able to use similar data, but an operator should not switch the same live data directory back and forth unless both projects explicitly support that path for the releases involved.

Risks include:

- Database migrations that older software cannot reverse.
- Index formats that differ.
- Wallet migrations.
- Settings or configuration changes.
- New files unknown to another version.
- Unclean shutdown recovery.
- Pruning-state assumptions.
- Chainstate or block-index incompatibilities.

A safe evaluation often uses a separate data directory, separate host, or tested backup rather than pointing new software at the only production copy.

Blockchain data can be redownloaded. Wallet and application metadata may be harder or impossible to reconstruct. Backups should reflect that difference.

### Wallet functionality is optional and separate

Node software may include a wallet, but node validation and wallet custody are separate responsibilities.

Bitcoin Core and Bitcoin Knots can include wallet functionality depending on build and configuration. An operator can also disable the wallet and connect external software.

When comparing wallet features, examine descriptors, backup formats, signing capabilities, hardware-wallet workflows, coin control, fee management, privacy behavior, and migration support separately from chain validation.

A node implementation can be an excellent validator without being the preferred wallet for a particular user. A wallet can use a node without sharing the same process or interface.

Do not let the presence of a graphical wallet decide a consensus-software comparison by itself.

### RPC and application compatibility

Many Bitcoin applications depend on RPC calls, ZeroMQ notifications, REST endpoints, block files, indexes, or wallet interfaces.

Compatibility should be tested at the specific method and release level.

Questions include:

- Are required RPC methods present?
- Do argument names and defaults match?
- Are result fields stable for the application?
- Does the setup require `txindex`, block filters, or another index?
- Does pruning remove data the application expects?
- Are notifications available and ordered as expected?
- Does the application require wallet RPCs?
- How are authentication and remote access secured?
- Are startup and shutdown sequences handled correctly?

A statement that software is Core compatible can hide important limits. Document the exact interfaces the dependent application uses.

### Network privacy and transport features

Node implementations may support clearnet, Tor, I2P, encrypted peer transport, proxy settings, inbound services, address controls, and connection-management options.

Feature presence is not the same as a private configuration.

A node can leak information through connection patterns, DNS, remote RPC, wallet queries, logs, host telemetry, or surrounding applications. A privacy network does not secure an exposed administration interface.

Compare privacy behavior at the system level:

- Which networks are enabled?
- How are peers discovered?
- Are DNS lookups proxied?
- Does the node listen publicly?
- Are onion or I2P services created?
- Which addresses are advertised?
- What applications connect to the node?
- Where are logs and metrics sent?

Documentation should describe capabilities and assumptions rather than promise anonymity.

### Performance comparisons need controlled conditions

Synchronization speed, memory use, disk use, startup time, and peer behavior can differ between releases and configurations.

A fair comparison controls:

- Hardware.
- Operating system.
- Storage medium.
- Network connection.
- Database cache.
- Pruning.
- Indexes.
- Wallets.
- Peer set.
- Software version.
- Build options.
- Chainstate starting point.

One user's benchmark on one appliance does not establish universal performance.

Performance also has multiple dimensions. A configuration that completes initial synchronization faster may use more memory. A smaller mempool may use fewer resources but behave differently for applications. An index can improve queries while increasing disk and synchronization work.

Describe the measured setup and avoid ranking implementations from uncontrolled anecdotes.

### Maintenance and update strategy

Node software participates in a security-sensitive network and should have a clear maintenance path.

Review:

- Current stable releases.
- Supported upgrade paths.
- Security announcements.
- Release-signing practices.
- End-of-life expectations.
- Backport policies.
- Open critical issues.
- Test coverage.
- Maintainer and reviewer activity.
- Downstream package lag.

An operator also needs an update policy. Automatic unattended replacement may be inappropriate for critical infrastructure. Indefinite delay on unsupported software can also create risk.

A practical process stages upgrades, reads release notes, verifies artifacts, tests dependent applications, shuts down cleanly, and confirms healthy operation afterward.

### Software choice does not replace operator judgment

No implementation can make every operational decision automatically.

The operator still chooses:

- Which release to install.
- Which binaries or packages to trust.
- Which consensus and policy behavior to accept.
- Which features to enable.
- Which peers and networks to use.
- Whether to prune.
- Which indexes to build.
- How to secure RPC.
- How wallets connect.
- How updates and recovery work.

A popular implementation with careless administration can be less reliable than a carefully maintained alternative. A feature-rich implementation can create unnecessary complexity when the operator needs only basic validation.

The best choice is the maintained software whose documented behavior, release process, interfaces, and operational tradeoffs match the real use case.

### A neutral comparison framework

Use the same questions for every candidate:

1. **Validation:** Does it fully validate the current Bitcoin consensus rules?
2. **Maintenance:** Is it actively maintained with a visible security and release process?
3. **Release trust:** Can binaries be verified against documented signed release materials?
4. **Policy:** Which relay and mempool defaults differ, and why do those differences matter?
5. **Features:** Which wallet, index, network, and application interfaces are required?
6. **Compatibility:** Will dependent tools work with the exact release and configuration?
7. **Storage:** Are archival, pruning, and index needs supported?
8. **Privacy:** What peer, proxy, logging, and remote-access assumptions exist?
9. **Operations:** Can the system be monitored, updated, backed up, and recovered?
10. **Migration:** Is there a documented path from the current software and data?

This framework avoids factional labels. It keeps attention on verifiable behavior.

Bitcoin node software should be chosen the same way other security-critical infrastructure is chosen: through source, documentation, release evidence, controlled testing, and an honest match between capabilities and requirements.

## 3. Key Terms

- **Node software:** Software that connects to Bitcoin peers and may validate, relay, store, or serve network data according to its configuration.
- **Node:** Bitcoin software that communicates with peers and may validate, relay, store, or serve network data.
- **Bitcoin Core:** The most widely used open-source Bitcoin node and wallet software implementation.
- **Bitcoin Knots:** A maintained Bitcoin node software implementation with policy and feature differences from Bitcoin Core.
- **Policy:** Local software rules that influence transaction relay, mempool acceptance, or default behavior without changing consensus validity.
- **Standardness:** Node policy rules used for transaction relay and mining defaults that are separate from consensus validity.
- **Consensus:** The shared validation rules independently enforced by Bitcoin nodes.
- **Validation:** The process of checking transactions and blocks against applicable rules.
- **Software release:** A versioned distribution of software accompanied by code changes, review, testing, documentation, and release information.
- **Open-Source:** A development model in which source code is available under a license that permits inspection, use, modification, and redistribution.

## 4. Sources

1. **Bitcoin Core README**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/README.md  
   Supports: Bitcoin Core's full-validation role, optional wallet and GUI, MIT license, public development process, testing, and stable release tags.

2. **Bitcoin Core contribution guidelines**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/CONTRIBUTING.md  
   Supports: The project's public contribution, review, testing, and code-change process.

3. **Bitcoin Core developer notes**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/doc/developer-notes.md  
   Supports: Development practices, testing expectations, code review, subsystem boundaries, and security-sensitive maintenance context.

4. **Bitcoin Core startup-option implementation**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/init.cpp  
   Supports: Consensus-adjacent configuration, policy, pruning, indexes, wallet, networking, RPC, and resource settings plus compatibility warnings.

5. **Bitcoin Core policy sources**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/tree/v31.0/src/policy  
   Supports: Separation of transaction standardness and relay policy from block consensus validation.

6. **Bitcoin Core JSON-RPC interface documentation**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/doc/JSON-RPC-interface.md  
   Supports: RPC behavior, security boundaries, authentication, and application-integration considerations.

7. **Bitcoin Core files documentation**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/doc/files.md  
   Supports: Data-directory components, indexes, chainstate, wallet files, settings, logs, and migration-sensitive local data.

8. **Bitcoin Core 31.0 release notes**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/doc/release-notes/release-notes-31.0.md  
   Supports: Release-specific changes, compatibility considerations, resource changes, updated defaults, and the need for version-aware operational review.

9. **Bitcoin Knots repository README**  
   Author or publisher: Bitcoin Knots contributors  
   URL: https://github.com/bitcoinknots/bitcoin  
   Supports: Bitcoin Knots connecting to the Bitcoin network, fully validating blocks and transactions, optional wallet and GUI, and separate project identity.

10. **Bitcoin Knots official website**  
    Author or publisher: Bitcoin Knots project  
    URL: https://bitcoinknots.org/  
    Supports: Official Bitcoin Knots releases, project documentation, and the project's current distribution channel.

11. **Bitcoin Knots release history**  
    Author or publisher: Bitcoin Knots contributors  
    URL: https://github.com/bitcoinknots/bitcoin/releases  
    Supports: Release-specific versioning, published changes, downloadable artifacts, and the need to compare current releases rather than a timeless feature list.

12. **Bitcoin Developer Guide: P2P Network**  
    Author or publisher: Bitcoin.org contributors  
    URL: https://developer.bitcoin.org/devguide/p2p_network.html  
    Supports: Peer-to-peer node behavior, block and transaction relay, service signaling, and network-message context.

13. **Bitcoin Developer Guide: Block Chain**  
    Author or publisher: Bitcoin.org contributors  
    URL: https://developer.bitcoin.org/devguide/block_chain.html  
    Supports: Full validation, chainstate, proof-of-work chain selection, and consensus behavior that compatible implementations must enforce.

14. **MIT License**  
    Author or publisher: Open Source Initiative  
    URL: https://opensource.org/license/MIT  
    Supports: The licensing terms referenced by Bitcoin Core and Bitcoin Knots for inspection, modification, and redistribution.

## 5. SEO title

Bitcoin Node Software Explained: Core, Knots, and Tradeoffs

## 6. Meta description

Compare Bitcoin node software through consensus behavior, policy, releases, interfaces, storage, privacy, and operations, including Bitcoin Core and Bitcoin Knots.

## 7. Page excerpt

Bitcoin node implementations can share consensus compatibility while differing in policy, defaults, features, releases, interfaces, and operational tradeoffs.

## 8. Estimated reading time

18 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- MSC-GUIDE-021 | What Is a Bitcoin Full Node?
- MSC-GUIDE-022 | What Is a Pruned Bitcoin Node?
- MSC-GUIDE-023 | How to Run a Bitcoin Node
- MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?
- MSC-GUIDE-030 | How Bitcoin Reaches Consensus
- MSC-GUIDE-041 | Bitcoin Developer Tools: A Practical Overview
- MSC-GUIDE-049 | What Is Bitcoin Core?
- MSC-GUIDE-050 | What Is Bitcoin Knots?
- MSC-GUIDE-051 | How to Read the Bitcoin Source Code
- MSC-GUIDE-052 | How Bitcoin Core Releases Work
- MSC-GUIDE-061 | How Bitcoin RPC Works
- MSC-GUIDE-063 | How Bitcoin Software Is Tested
- MSC-GUIDE-064 | How to Run Reliable Bitcoin Infrastructure
- MSC-GLOSSARY-001 | Bitcoin Glossary
- MSC-HUB-NETWORK | The Bitcoin Network
- MSC-PATH-NETWORK | Understand the Network
- MSC-PATH-BUILD | Build on Bitcoin

## 10. Accuracy review checklist

- [x] Registry metadata and navigation relationships match the approved registry.
- [x] Consensus behavior, local policy, defaults, interfaces, and storage are separated.
- [x] Policy differences are not described as automatic consensus differences.
- [x] Bitcoin Core is described with the approved glossary wording.
- [x] Bitcoin Knots is described as a separate maintained project with a closely related codebase.
- [x] No timeless feature list is presented for a changing software release.
- [x] Software diversity benefits and consensus-divergence risks are both acknowledged.
- [x] Libraries, indexers, wallet servers, and mining tools are not automatically labeled full nodes.
- [x] Source availability and binary verification are distinguished.
- [x] Defaults are not presented as consensus rules.
- [x] Cross-version configuration, RPC, and data-directory compatibility are not assumed.
- [x] Wallet functionality is separated from node validation.
- [x] Performance comparisons require controlled conditions.
- [x] No implementation is endorsed, ranked, or framed factionally.
- [x] Exact approved glossary definitions are used.
- [x] Planned internal links contain no live URLs.
- [x] No em dash or en dash character appears.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-18
- Notes:
  - Verified Bitcoin Core v31.0 project, release, policy, RPC, storage, testing, and development-process claims against official source and documentation.
  - Verified current Bitcoin Knots project identity, full-validation description, release channel, and related-codebase wording against official project materials.
  - Verified no current policy, feature, version, or release difference is generalized beyond the cited project documentation.
  - Verified consensus rules, standardness, mempool policy, relay defaults, wallet features, and application interfaces remain distinct.
  - Verified source review, release signatures, package provenance, and reproducible-build considerations are not treated as interchangeable guarantees.
  - Verified data-directory switching and migration language remains cautionary rather than claiming universal incompatibility.
  - Verified performance comparisons require controlled hardware, settings, software, and chainstate conditions.
  - Confirmed exact approved glossary-definition synchronization.
  - Confirmed source entries contain precise Supports notes. Bitcoin Knots release details remain flagged for publication-time recheck because they change with active releases.
  - Confirmed planned internal links remain inactive until real destination pages and URLs exist.

## 12. Illustration brief

### Illustration 1

- Concept title: Consensus and Policy Layers
- Educational purpose: Show how two node implementations can agree on block validity while applying different local transaction policies.
- Recommended placement: After the section titled Policy is not consensus.
- Visual description: Oceanographic cross-section with a shared deep foundation labeled Consensus validation. Above it, two separate surface stations labeled Implementation A policy and Implementation B policy filter different unconfirmed transactions. Both accept the same valid block at the foundation layer.
- Required labels: Shared consensus rules, Valid block, Local policy A, Local policy B, Mempool, Relay, Consensus valid
- Caption: Compatible node software can enforce the same block rules while using different local mempool and relay policies.
- Alt text: Layered diagram showing two Bitcoin node implementations sharing consensus validation while applying different local transaction policies above it.
- Image orientation: Landscape
- Mobile crop notes: Keep the shared consensus foundation across the full width and stack the two policy stations above it.
- Status: PLANNED

### Illustration 2

- Concept title: Node Software Comparison Matrix
- Educational purpose: Give readers a neutral framework for evaluating implementations without ranking them.
- Recommended placement: After the section titled A neutral comparison framework.
- Visual description: Old infrastructure-manual matrix with columns for Candidate software and rows for Validation, Maintenance, Release trust, Policy, Features, Compatibility, Storage, Privacy, Operations, and Migration. Use check fields rather than scores or winner badges.
- Required labels: Validation, Maintenance, Release trust, Policy, Features, Compatibility, Storage, Privacy, Operations, Migration
- Caption: Compare node software through documented behavior and operating requirements rather than factional labels.
- Alt text: Neutral evaluation matrix for Bitcoin node software covering validation, maintenance, releases, policy, features, compatibility, storage, privacy, operations, and migration.
- Image orientation: Landscape
- Mobile crop notes: Convert the matrix into ten stacked question cards for narrow screens.
- Status: PLANNED

### Illustration 3

- Concept title: Source to Running Binary
- Educational purpose: Separate source code, release process, packages, and the binary an operator actually runs.
- Recommended placement: After the section titled Release binaries and source code are different artifacts.
- Visual description: Technical supply-chain map. Public source and a tagged release feed a build and signing station. Paths branch to official binary, operating-system package, container, and appliance image. Each ends at a verification checkpoint before the running node.
- Required labels: Public source, Release tag, Build process, Signed checksums, Official binary, Distribution package, Container, Appliance image, Verification, Running node
- Caption: The software repository, release process, package source, and installed binary are separate parts of the node's trust path.
- Alt text: Software supply-chain diagram showing Bitcoin node source code moving through release, build, packaging, signature, and verification stages before becoming a running node.
- Image orientation: Landscape
- Mobile crop notes: Use one vertical source-to-node path with package types shown as short side branches.
- Status: PLANNED
