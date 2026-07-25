---
registry_id: MSC-GUIDE-050
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: What Is Bitcoin Knots?
handle: bitcoin-knots
category: Bitcoin Development
subcategory: Bitcoin Core
depth: Deep
format: Comparative Technical Explainer
primary_path: Build on Bitcoin
secondary_paths:
  - Understand the Network
author_display: Mempool Surf Club Editorial
reviewed_date: null
copy_locked_date: null
---

# What Is Bitcoin Knots?

## 1. Introductory deck

Bitcoin Knots is an open-source Bitcoin node and wallet implementation derived from Bitcoin Core. It shares substantial upstream code while publishing separate releases and carrying additional, retained, or differently configured features. Comparisons must name exact versions and configurations because policy, interface, wallet, and even consensus-related behavior can change between releases.

## 2. Full article

Bitcoin Knots is a Bitcoin software project with node, wallet, command-line, and graphical functionality. Its repository is derived from Bitcoin Core, and its own README says development generally happens in Bitcoin Core and is merged into Knots for releases. Knots also accepts changes that may not be included upstream and publishes separate tags, binaries, release notes, checksums, and project documentation.

That lineage does not make the two products interchangeable. Shared ancestry can reduce duplicated implementation work, but each release is its own artifact. A claim about compatibility, defaults, migration, or policy needs an exact Bitcoin Knots version, an exact Bitcoin Core version, the relevant configuration, and evidence from source or tests.

This guide was reviewed on July 24, 2026 against Bitcoin Knots `v29.3.knots20260508`, commit `f41f01e1e6de7025d52a865bef97f2a67277f0f3`, and Bitcoin Core `v31.1`, commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`. These releases are from different major lines, so the comparison is useful for boundaries, not a one-to-one feature scorecard.

### Lineage and shared development

The Knots repository is a fork of `bitcoin/bitcoin`. Much of its validation, networking, wallet, graphical, build, and testing code originates in Bitcoin Core. Knots release notes identify upstream Bitcoin pull requests alongside Knots-specific changes, making the provenance of individual changes inspectable.

“Fork” here describes source-code lineage. It does not automatically mean a separate coin, network, or consensus history. Whether two running nodes remain on the same chain depends on the validation rules they enforce, the blocks they receive, and any relevant activation or configuration state.

Knots can backport upstream work, retain behavior changed elsewhere, or add features maintained outside Bitcoin Core’s main tree. The result is not simply “Bitcoin Core with more options.” Some changes affect user interfaces, some affect policy, some affect resource management, and some can touch consensus-related code. Each must be classified separately.

### Separate releases and maintenance

Bitcoin Knots has its own version scheme and release process. The reviewed release is `29.3.knots20260508`, published through the official Knots site with release-specific checksums, signatures, source, binaries, and detailed contrast documentation.

A Knots version number cannot be compared numerically with a Bitcoin Core version as if both projects shared one synchronized release train. The `29.3` portion reflects an upstream lineage, while the Knots date suffix identifies a project release. Bitcoin Core 31.1 contains later upstream development than a Knots 29.3-based release, while Knots may carry separate changes absent from Core.

The correct question is therefore not “Which has the higher version?” It is “Which exact source trees, release notes, configurations, and tested behaviors are being compared?”

### Node, wallet, and graphical interfaces

Like Bitcoin Core, Knots can connect to peers, download and validate blocks and transactions, maintain chainstate and a mempool, expose RPCs, and optionally build wallet and graphical components.

Shared names do not guarantee identical interfaces. An RPC can be added, removed, or extended. A graphical setting can expose a Knots-specific policy. A command-line option can use the same name with a different default. Wallet migration behavior can differ by release.

Applications should feature-detect or pin supported versions rather than assuming that every Bitcoin Core RPC, field, startup option, or wallet behavior is identical in Knots. Human-readable product descriptions are weaker evidence than tagged help output, source, release notes, and cross-implementation tests.

### Consensus compatibility and policy differences

Consensus compatibility means two nodes enforce compatible block-validity rules for the chain state being evaluated. Policy compatibility means they make similar local decisions about unconfirmed transactions. These are different.

Many Knots differences concern mempool admission, relay, mining selection, data-carrier handling, fee treatment, or configurable filters. Such differences can change which unconfirmed transactions a node sees or forwards without making confirmed blocks invalid.

However, it is unsafe to state that all Knots releases always enforce exactly the same consensus rules as all Bitcoin Core releases. The reviewed Knots release notes include an RDTS/BIP 110 feature and require an explicit `consensusrules=rdts` confirmation for that build. The same site also lists a closely dated variant without that support. Whatever view a reader takes of the proposal, this is direct evidence that version and configuration must be included in a compatibility claim.

The neutral method is to ask:

1. Which exact release and commit is running?
2. Which consensus-related configuration is active?
3. Which chain and activation state are being evaluated?
4. Which blocks or test vectors demonstrate agreement?
5. Are observed differences consensus rejection, mempool policy, wallet construction, or interface presentation?

A policy disagreement may fragment transaction relay while nodes still accept the same blocks. A consensus-rule disagreement can create a chain split. The labels “Core” and “Knots” do not answer which case applies.

### Release-specific policy and configuration differences

The official contrast document for `29.3.knots20260508` lists differences from the referenced Bitcoin Core base across configuration, policy, wallet, RPC, graphical, networking, build, and other components. The release notes also describe a RAM-aware `dbcache` default, sub-dust effective-fee policy, data-carrier policy changes, wallet and GUI additions, and networking changes.

Those facts belong to that release. They should not be rewritten as permanent product identities such as “Knots blocks X” or “Core always allows Y.” Defaults can change. Options can be removed. Upstream can later adopt similar functionality. Knots can rebase or backport changes.

Policy also has multiple stages. Mempool admission, relay to peers, and block-template selection can use related settings but are not necessarily identical. A configuration guide should state which stage an option affects and whether miners or downstream applications use separate logic.

### Additional and retained features

Knots may include features proposed for Bitcoin Core, maintained elsewhere, or retained after upstream changes. Examples in a particular release can include extra RPCs, graphical controls, policy settings, wallet tools, or build options.

“Additional” does not mean “safer,” “more correct,” or “better.” It means the tagged release exposes behavior not present in the comparison release. Every feature adds a review surface, maintenance burden, compatibility question, and possible operator benefit.

Likewise, absence is not proof of a deficiency. Bitcoin Core may decline or defer a feature because of scope, maintenance, interface stability, review capacity, architecture, or a different risk tradeoff. Technical comparison should state behavior and evidence rather than infer motive.

### Data directories, wallets, and migration

Both projects descend from the same codebase and may support upgrades from older Bitcoin Core or Knots versions. The reviewed Knots release notes state that direct upgrades from very old versions are possible but may require data-directory migration, and that old wallet versions are generally supported.

That does not establish a universal safe downgrade or bidirectional switch between arbitrary releases. Databases can be migrated, indexes can change, wallet formats can change, and newer software can write state older software cannot interpret. A release note’s upgrade statement does not automatically authorize a rollback.

Before changing implementations, an operator should read both products’ release notes, back up wallet material using documented procedures, stop the old process cleanly, identify index and pruning requirements, and test the exact transition on copied data or regtest. Real funds should not be used for exploratory migration testing.

This guide does not claim that Core 31.1 and Knots 29.3.knots20260508 can safely share one live data directory or be alternated without migration. That requires direct documentation and testing for the exact pair.

### Release verification and security updates

Knots publishes binaries and source through its official site, with `SHA256SUMS` and `SHA256SUMS.asc` for the reviewed release. A checksum can show that a downloaded file matches the listed digest. A signature can show that a key attested to the checksum file. Neither fact, by itself, proves that the software is free of defects or that the signer should be trusted.

Users need an independently obtained expectation for signer keys and an understanding of the project’s build and release process. A GitHub tag, a site download, a platform code signature, and reproducible-build evidence each answer different questions.

Security maintenance is also project-specific. A vulnerability fixed upstream may need to be incorporated into Knots, and a Knots-specific feature may need its own fix. Operators should follow the project’s official release and announcement channels and identify affected exact versions rather than relying on general Bitcoin news.

### Maintenance and change entry

The Knots README says development generally occurs upstream and is merged into Knots for releases. It also provides a path for Knots-specific pull requests and expects accepted external branches to be maintained.

The official site identifies Luke Dashjr as the lead maintainer. That describes a project role, not control over Bitcoin or over independently operated nodes. Maintainers choose what enters their repository and releases; users choose what to run; network effects depend on deployed behavior.

A comparison should inspect both upstream review and Knots-specific review. A change copied from Bitcoin Core may carry upstream discussion and tests. A Knots-only change may have a separate review history. Shared code does not transfer all review evidence automatically when surrounding code, configuration, or release context differs.

### How to compare versions responsibly

Use a claim-evidence table.

For each claimed difference, record:

- the exact Knots tag and commit;
- the exact Bitcoin Core tag and commit;
- the source file, help output, test, or release-note entry;
- whether the difference is consensus, policy, wallet, interface, default, build, or documentation;
- the configuration needed to observe it;
- whether cross-version migration or interoperability was actually tested;
- the review date.

For this guide, Core 31.1 and Knots 29.3.knots20260508 were not treated as equivalent-base competitors. The comparison establishes how to read lineage and boundaries. A product-selection decision would need an operator’s requirements plus a more closely matched version pair.

### Limits of product-comparison claims

Node software should not be ranked by slogans such as “pure,” “correct,” “safe,” “unsafe,” or “the real Bitcoin.” Those terms hide the rule, feature, threat model, or operating requirement being discussed.

Popularity and node-share estimates do not prove correctness. Social-media sentiment does not prove a policy is harmful or beneficial. A maintainer’s opinion does not replace source and tests. An issue count does not measure security. A larger feature list does not establish reliability.

A useful comparison is narrow and reproducible: exact versions, exact behavior, exact evidence, and remaining uncertainty.

## 3. Key Terms

- **Bitcoin Knots:** A Bitcoin node and wallet implementation derived from Bitcoin Core with separate releases and additional or retained changes.
- **Fork:** A source repository derived from another repository; not necessarily a separate block chain.
- **Upstream:** The source project from which changes are incorporated.
- **Backport:** Applying a change from a newer or different branch to an older release line.
- **Consensus compatibility:** Agreement on block validity for the relevant chain state and configuration.
- **Policy difference:** A difference in local mempool, relay, or mining-selection behavior.
- **Version pair:** The exact releases compared across two implementations.
- **Configuration-sensitive behavior:** Behavior that changes when an option or runtime setting changes.
- **Migration:** Conversion or reuse of data across software versions or implementations.
- **Release artifact:** A tagged source tree, binary, checksum, signature, or release note tied to a version.
- **Contrast document:** Release-specific project documentation listing behavior that differs from a comparison base.

## 4. Sources

1. **Bitcoin Knots v29.3.knots20260508 README** | Bitcoin Knots contributors
   - URL: https://github.com/bitcoinknots/bitcoin/blob/v29.3.knots20260508/README.md
   - Supports: Project lineage, shared upstream development, optional wallet and GUI, Knots-specific contribution path, tests, and MIT licensing.
2. **Bitcoin Knots v29.3.knots20260508 Tag Commit** | Bitcoin Knots contributors
   - URL: https://github.com/bitcoinknots/bitcoin/commit/f41f01e1e6de7025d52a865bef97f2a67277f0f3
   - Supports: Exact Knots source commit reviewed.
3. **Bitcoin Knots Official Website** | Bitcoin Knots project
   - URL: https://bitcoinknots.org/
   - Supports: Current release listing, official distribution, project description, and maintainer information reviewed July 24, 2026.
4. **Bitcoin Knots 29.3.knots20260508 Release Directory** | Bitcoin Knots project
   - URL: https://bitcoinknots.org/files/29.x/29.3.knots20260508/
   - Supports: Release binaries, source archive, checksums, signatures, and dated contrast document.
5. **Bitcoin Knots 29.3.knots20260508 Release Notes** | Bitcoin Knots contributors
   - URL: https://github.com/bitcoinknots/bitcoin/blob/v29.3.knots20260508/doc/release-notes.md
   - Supports: Exact release changes, upgrade wording, policy and configuration changes, RDTS configuration, upstream and Knots-specific change provenance, and known bugs.
6. **Detailed Contrast with Bitcoin Core for 29.3.knots20260508** | Bitcoin Knots project
   - URL: https://bitcoinknots.org/files/29.x/29.3.knots20260508/bitcoin-29.3.knots20260508.desc.html
   - Supports: Release-bounded comparison of configuration, policy, wallet, RPC, GUI, networking, build, and retained features.
7. **Bitcoin Knots Source Tree at v29.3.knots20260508** | Bitcoin Knots contributors
   - URL: https://github.com/bitcoinknots/bitcoin/tree/v29.3.knots20260508
   - Supports: Shared repository structure and Knots-specific source at the reviewed tag.
8. **Bitcoin Knots Issues** | Bitcoin Knots contributors
   - URL: https://github.com/bitcoinknots/bitcoin/issues
   - Supports: Project-specific bug and change discussion; issue presence is not treated as a security metric.
9. **Bitcoin Core v31.1 README** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/README.md
   - Supports: Upstream development, optional wallet and GUI, stable-tag boundaries, and test process.
10. **Bitcoin Core v31.1 Tag Commit** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/commit/9be056a8a72b624dae9623b2f7bded92c2a21c91
    - Supports: Exact Core source commit used as the dated comparison reference.
11. **Bitcoin Core Contributing Guide at v31.1** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/CONTRIBUTING.md
    - Supports: Upstream pull-request, review, test, and maintainer process.
12. **Bitcoin Core Software Life Cycle** | Bitcoin Core project
    - URL: https://bitcoincore.org/en/lifecycle/
    - Supports: Bitcoin Core release versioning and why software versions must not be confused with protocol versions.
13. **BIP 110** | Luke Dashjr
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0110.md
    - Supports: The proposal referenced by the reviewed Knots release; inclusion in a release is not treated as proof of network activation or agreement.
14. **MIT License in Bitcoin Knots** | Bitcoin Knots contributors
    - URL: https://github.com/bitcoinknots/bitcoin/blob/v29.3.knots20260508/COPYING
    - Supports: Licensing terms and warranty boundary.

## 5. SEO title

What Is Bitcoin Knots? Core Lineage and Differences | Mempool Surf Club

## 6. Meta description

Learn how Bitcoin Knots relates to Bitcoin Core, where versions and policies differ, and how to evaluate consensus and migration claims.

## 7. Page excerpt

Bitcoin Knots shares substantial Bitcoin Core code but has separate releases, features, defaults, and version-specific compatibility boundaries.

## 8. Estimated reading time

14 to 17 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-049 | What Is Bitcoin Core?
- Next: MSC-GUIDE-051 | How to Read the Bitcoin Source Code
- Prerequisite: MSC-GUIDE-021 | What Is a Bitcoin Full Node?
- Prerequisite: MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?
- Branch: MSC-GUIDE-031 | How Bitcoin Soft Forks Work
- Branch: MSC-GUIDE-048 | Emerging Protocols on Bitcoin: How to Evaluate Them
- Return: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] Bitcoin Knots is described neutrally as a derivative implementation with shared upstream code and separate releases.
- [x] The guide names Bitcoin Knots `v29.3.knots20260508` and Bitcoin Core `v31.1` instead of generalizing a timeless comparison.
- [x] Source lineage is distinguished from chain or consensus behavior.
- [x] Consensus compatibility is separated from mempool, relay, mining, wallet, interface, default, and configuration differences.
- [x] The reviewed Knots release’s RDTS configuration is reported as release evidence without adopting its promotional or political claims.
- [x] Data-directory, wallet, upgrade, downgrade, and migration statements remain limited to direct release evidence.
- [x] No unsupported node-share, popularity, safety, purity, or political claims are used.
- [x] Release verification explains what checksums and signatures do and do not prove.
- [x] Planned internal links remain inactive and do not imply publication.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-24
- Notes: Verified the official Knots site, release directory, `v29.3.knots20260508` tag and commit, tagged README, release notes, release-specific contrast document, checksums and signatures, and the corresponding Bitcoin Core `v31.1` reference. Confirmed that comparisons are version-bounded and that policy differences are not mislabeled as consensus differences. The RDTS material is presented only as configuration-sensitive behavior documented by the reviewed release.

## 12. Illustration brief

### Illustration 1

- Concept title: Shared Code, Separate Release Routes
- Educational purpose: Show common lineage without implying identical products.
- Recommended placement: After Lineage and shared development.
- Visual description: Vintage nautical chart where one upstream shipping lane branches into Bitcoin Core and Bitcoin Knots release harbors, with shared cargo and separate manifests.
- Required labels: Shared upstream code, Bitcoin Core release, Bitcoin Knots release, Backports, Knots-specific changes, Separate tags
- Caption: Shared source lineage does not make two tagged releases identical.
- Alt text: Nautical branching chart showing shared upstream code flowing into separate Core and Knots releases.
- Image orientation: Landscape
- Mobile crop notes: Keep one upstream trunk and two clearly labeled destinations.
- Status: PLANNED

### Illustration 2

- Concept title: Compatibility Classification Board
- Educational purpose: Separate consensus, policy, wallet, interface, and default differences.
- Recommended placement: After Consensus compatibility and policy differences.
- Visual description: Harbor inspection board sorting observed differences into five labeled bins, with a warning flag on configuration-sensitive consensus behavior.
- Required labels: Consensus, Mempool policy, Relay, Wallet, Interface, Defaults, Version, Configuration
- Caption: A product difference matters only after identifying its layer, version, and configuration.
- Alt text: Classification board sorting software differences by consensus, policy, wallet, interface, and defaults.
- Image orientation: Landscape
- Mobile crop notes: Use stacked bins with version and configuration at the top.
- Status: PLANNED

### Illustration 3

- Concept title: Exact Version Comparison Log
- Educational purpose: Give readers a repeatable evidence checklist.
- Recommended placement: After How to compare versions responsibly.
- Visual description: Vintage ship log comparing two named releases with columns for tag, commit, rule layer, option, test, and uncertainty.
- Required labels: Knots tag, Core tag, Commit, Layer, Configuration, Evidence, Tested pair, Uncertainty
- Caption: Reliable comparisons name the exact artifacts and the evidence used to observe each difference.
- Alt text: Technical log comparing exact Bitcoin Core and Bitcoin Knots release evidence.
- Image orientation: Landscape
- Mobile crop notes: Convert the comparison columns into two stacked release cards.
- Status: PLANNED
