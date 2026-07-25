---
registry_id: MSC-GUIDE-048
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: Emerging Protocols on Bitcoin: How to Evaluate Them
handle: emerging-bitcoin-protocols
category: Building on Bitcoin
subcategory: Innovation
depth: Deep
format: Technical Analysis
primary_path: Build on Bitcoin
secondary_paths:
  - Understand the Network
author_display: Mempool Surf Club Editorial
reviewed_date: null
copy_locked_date: null
---

# Emerging Protocols on Bitcoin: How to Evaluate Them

## 1. Introductory deck

Emerging Bitcoin systems can be consensus proposals, software behavior, application protocols, indexed state, bridges, or experiments. Use a repeatable framework to identify enforcement, custody, data availability, exits, cryptographic and economic assumptions, implementation maturity, governance, interoperability, and evidence quality.

## 2. Full article

An emerging Bitcoin protocol should be evaluated by asking what it changes, who enforces it, what evidence exists, and what happens when its assumptions fail. The name of a project, the presence of transactions on Bitcoin, or the publication of a BIP does not answer those questions.

“Built on Bitcoin” can describe many different systems: a consensus proposal, a node-policy change, an application protocol using ordinary transactions, an indexer-derived ledger, a bridge, a sidechain, a wallet convention, an experimental proof system, or software that merely anchors data to Bitcoin. These systems inherit different properties from Bitcoin.

A useful evaluation therefore begins by separating layers before comparing features.

### Start with the exact artifact and date

Record what is being evaluated: a paper, BIP, specification commit, software release, pull request, testnet deployment, mainnet application, hosted service, or marketing page. Record the date, version, commit, and network.

This prevents “the protocol” from becoming a moving target. A paper can describe a design not yet implemented. A repository's default branch can differ from its latest release. A public demo can use signet parameters that do not exist on mainnet. A website can summarize capabilities more broadly than the code supports.

Primary evidence should be preferred. For consensus proposals, use the current BIP and implementation discussion. For software behavior, inspect release notes, source, tests, and configuration. For a deployed application, inspect its actual contracts, transactions, binaries, operator documentation, audits, and incident record.

Date every maturity or adoption statement. “Currently,” “supported,” and “live” become unreliable without a review date and a defined environment.

### Classify the layer

The first classification is what kind of rule or system is involved.

A Bitcoin consensus rule is enforced by validating nodes when they accept transactions and blocks. Changing it requires a network rule change, not merely an application release.

Bitcoin Core behavior can include consensus implementation, wallet behavior, mempool policy, relay defaults, mining interfaces, and RPCs. Not every Bitcoin Core default is a Bitcoin consensus rule. Other compatible implementations may make different policy or interface choices while enforcing the same active consensus rules.

A BIP is a proposal or standard document. BIP 3 states that BIPs do not define Bitcoin or represent community consensus. Its workflow distinguishes Draft, Complete, Deployed, and Closed. A Complete consensus proposal can remain undeployed indefinitely.

An application protocol uses active Bitcoin rules without changing them. DLCs are one example: Bitcoin validates funding and closing transactions, while DLC software interprets oracle announcements, adaptor signatures, contract messages, and payout mappings.

An application-derived system reconstructs state from Bitcoin data according to additional rules. Ordinals, Runes, and BRC-20 indexers are examples of the broader category. Bitcoin consensus validates the underlying transactions but does not maintain those application balances or identifiers.

A bridge or sidechain adds another system and a custody or verification boundary. The bridge's Bitcoin transactions may be valid even if the external state machine, operator accounting, or wrapped asset fails.

An experimental project can have papers, code, and public transactions while remaining unsuitable for production. Classification should describe what exists, not what the roadmap intends.

### Identify the enforcement point

For every important rule, ask who rejects a violation.

If every fully validating Bitcoin node rejects it, it is an active consensus rule. If ordinary nodes accept the transaction but one application ignores it, the rule is application-derived. If a federation refuses a withdrawal, it is federation policy. If a wallet refuses to construct a transaction, it is wallet behavior. If a hosted API filters results, it is service behavior.

This exercise often exposes ambiguous claims. “Bitcoin verifies the proof” may mean a Tapscript spend checks a verifier script. It does not necessarily mean Bitcoin nodes understand the external program, bridge ledger, or destination chain.

Create an enforcement table listing each claim, the enforcing component, the data it reads, the failure response, and whether another implementation can disagree while remaining Bitcoin-consensus compatible.

Then test disagreement. What happens when two indexers compute different balances, two wallets use different policy, or a bridge operator and challenger follow different external-chain tips? The protocol needs a resolution rule beyond saying that data is “on Bitcoin.”

### Separate active features from proposals

Consensus proposals deserve especially careful language. A BIP number, reference implementation, test vectors, or Complete status is evidence of specification maturity. It is not activation.

BIP 347 illustrates the distinction. As of July 24, 2026, it is a Complete soft-fork proposal for OP_CAT in Tapscript. Current mainnet Tapscript still treats the target byte as OP_SUCCESS126, and current legacy or SegWit v0 execution keeps OP_CAT disabled. A guide should not describe OP_CAT as an available mainnet opcode unless deployment evidence changes.

The same method applies to covenant proposals, new signature hashes, peer-to-peer features, or policy changes. State the proposal identifier, exact status, implementation branch, activation design if one exists, and observed network state.

Avoid predicting inevitability. Bitcoin has no central approval body that turns a BIP into consensus. Deployment requires implementation and coordinated adoption appropriate to the proposal.

### Map custody and control

For any system involving bitcoin, identify which keys or scripts control the actual UTXOs.

In self-custody, the user may hold keys satisfying the output's spending conditions. In a federation, threshold signers may control a shared output. In a bridge, operators may advance liquidity while another transaction system governs reimbursement. In a hosted account, the user may hold only a contractual claim against a custodian.

Terms such as “trustless,” “non-custodial,” and “trust-minimized” should be replaced or supplemented with a concrete key and failure map. List who can move funds, freeze exits, delay transactions, upgrade rules, censor requests, or recover from lost keys.

Also identify setup assumptions. Some systems depend on pre-signed transactions, key deletion, a ceremony, a common reference string, hardware security modules, or an honest threshold at initialization. A design can reduce ongoing trust while retaining significant setup trust.

Control can change over time. Emergency keys, upgrade keys, rotating federations, and recovery paths must be included, not treated as operational footnotes.

### Define the state and data source

Ask what state the protocol maintains and where that state comes from.

Bitcoin-native state includes the accepted block chain and UTXO set under active consensus. An application may derive additional balances, names, inscriptions, contract records, proof commitments, or bridge liabilities. A side system may maintain accounts or smart-contract storage not visible to Bitcoin nodes.

Document the canonical data source and ordering rules. Does the protocol follow Bitcoin block order, transaction order, output order, an external sequencer, oracle timestamps, or a hosted database? How are reorganizations rolled back? How are unconfirmed replacements handled?

If state depends on an indexer, specify the parser version, database schema, rollback logic, and rebuild process. If state depends on an oracle, define the event encoding, signing key, nonce handling, measurement method, and correction policy.

“On-chain” is too broad to answer these questions. Data can be included in a Bitcoin transaction while its meaning remains entirely application-defined.

### Evaluate data availability

A participant must be able to obtain the data needed to verify state, challenge a claim, or exit.

A proof may demonstrate that some hidden witness exists without supplying the transaction history a user needs. A bridge may publish commitments to Bitcoin while keeping batch data elsewhere. An indexer may require old block data that a pruned node no longer serves. A rollup-like system may depend on a sequencer or data-availability network.

List the minimum data required for each safety action. Identify who publishes it, where it is retained, how long it remains accessible, and whether users can reconstruct it independently.

Then test withholding. If an operator stops publishing data, can users exit with locally retained information? Can a challenger prove fraud? Can a new node synchronize? Does the protocol become safe but unavailable, or can funds be lost?

Availability claims should distinguish Bitcoin block inclusion, archival retention, indexer access, hosted APIs, and user backups.

### Examine the exit and failure paths

The normal path is rarely the security-critical path. Trace failure scenarios.

What happens if counterparties disappear? If an oracle never attests? If a bridge operator refuses a withdrawal? If a challenger is offline? If a sequencer withholds a batch? If an external chain reorganizes? If a transaction misses its timelock window? If fees rise sharply?

A credible design supplies unilateral or threshold exit procedures with concrete transactions, data, deadlines, and fee assumptions. It also states where no unilateral exit exists.

Time-sensitive paths should be evaluated under realistic confirmation uncertainty. Consensus-valid transactions can still face relay-policy rejection, pinning, low fee rates, miner policy, or congestion. Pre-signed transactions may have limited fee-bumping options.

Recovery procedures need tests. A diagram showing a refund or emergency path is weaker evidence than an implementation test that constructs, signs, broadcasts, and confirms it under the current network rules.

### List cryptographic and economic assumptions

Bitcoin's proof of work and signature rules do not replace every assumption in a higher-layer protocol.

A project may rely on collision resistance, discrete-log hardness, a proof system's soundness, a trusted setup, adaptor-signature security, threshold-signature protocols, secure enclaves, or assumptions about an external virtual machine. Name each assumption and its implementation.

Economic security adds another layer. An optimistic system may assume a challenger will monitor and can profitably respond. A bridge may require operator collateral or liquidity. A channel system may require watchtower availability. Penalties must exceed plausible gains after fees and capital costs.

Model who pays to remain honest and who profits from failure. Include fee spikes, locked capital, challenge rewards, liquidity shortages, and griefing attacks that impose costs without directly stealing funds.

“Cryptographically verified” and “economically secured” are not complete descriptions unless the verified statement and incentive model are explicit.

### Inspect code, tests, and release discipline

A repository is evidence of implementation effort, not security.

Check whether the code corresponds to the current paper or specification. Look for tagged releases, reproducible builds, dependency pinning, test vectors, integration tests, fuzzing, static analysis, continuous integration, and documented upgrade procedures.

Search for explicit warnings. The official BitVM implementation repository, for example, warns not to use it in production as of the review date. That warning outweighs promotional interpretations of a public demo.

Audits should be scoped precisely. Record the commit, components, assumptions, findings, remediation status, and whether the deployed binary matches the audited code. An audit of a cryptographic library is not an audit of bridge economics or operational key management.

Also review issue trackers, pull requests, and incident reports. Mature software can still be risky, but visible handling of failures is more informative than an unqualified “battle-tested” label.

### Test interoperability and version boundaries

Protocols with multiple implementations need shared test vectors and cross-implementation testing.

Two projects can use the same name while disagreeing on serialization, rounding, transaction ordering, fee handling, oracle formats, proof inputs, or reorganization behavior. A “compatible” claim should name the versions tested and the cases passed.

Version negotiation matters for long-lived contracts. A DLC oracle may announce an event far in advance. A bridge deposit may remain open across software upgrades. An indexer may need to reproduce historical rules after a parser change.

Ask whether upgrades are backward-compatible, opt-in, centrally imposed, or coordinated by a federation. Determine what happens to existing funds and contracts when one participant upgrades first.

Application-derived systems should preserve historical interpretation rules or document migrations. Silent reinterpretation of old transactions can change displayed balances even though Bitcoin history is unchanged.

### Examine governance and upgrade authority

Every evolving system has a change process, even when it avoids the word governance.

For Bitcoin consensus, no single maintainer or repository controls activation. For an application, maintainers may release new code, but users, operators, indexers, or signers decide what to run. A hosted service can change behavior unilaterally for its customers.

Identify who can change contracts, keys, fee parameters, oracle sets, sequencers, challenge periods, parsers, or supported assets. Check whether changes require user migration or apply automatically.

Emergency authority deserves special attention. An emergency pause can reduce losses during an incident but creates censorship and custody power. An upgrade key can fix bugs but can also change rules or redirect funds.

Governance claims should be based on actual control paths and deployment procedures, not token voting pages, organizational labels, or informal community language.

### Verify adoption and performance claims

Adoption is not one number. A project can count addresses, transactions, deposits, wallets, nodes, or API requests, each with different meaning.

Prefer reproducible on-chain or published operational data with a date and method. Separate testnet from mainnet, unique users from addresses, gross deposits from current liabilities, and peak throughput from sustained finalized throughput.

Performance claims need workload definitions. Transactions per second can exclude data publication, settlement, bridge exits, proof generation, or Bitcoin confirmation time. Low fees may be subsidized or depend on centralized batching.

Do not infer safety from total value, transaction count, investors, partners, or longevity. Those can show use, not correctness. Conversely, low adoption does not disprove a design; it limits the operational evidence available.

When evidence cannot be independently reproduced, label the claim as project-reported.

### Use a claim-evidence matrix

A practical review can be organized into a matrix with five columns:

1. the exact claim;
2. the layer or component;
3. the primary evidence;
4. the review date and version; and
5. the remaining uncertainty.

For “OP_CAT is available,” the active-rule evidence contradicts the claim: BIP 347 is Complete but not Deployed. For “BitVM runs arbitrary programs on Bitcoin,” the more precise evidence says computation occurs off-chain and Bitcoin handles defined dispute verification; the implementation remains a developer preview. For “DLCs are Bitcoin smart contracts,” the matrix should explain that Bitcoin validates ordinary transactions while DLC software and oracles supply the contract semantics.

This format prevents a source from being stretched beyond what it supports. A paper can support the intended security model. A repository can support implementation status. A block explorer can support that transactions occurred. None alone proves the complete production claim.

Uncertainty is an output, not a failure. A good review identifies which questions remain open and what evidence would resolve them.

### A repeatable evaluation sequence

Begin with classification: name the artifact, network, version, layer, and enforcement point.

Continue with control: map keys, custody, setup, upgrades, and emergency authority.

Then map state and information: identify the canonical history, parser, oracle, sequencer, data-availability path, and reorganization behavior.

Trace every exit: cooperative, unilateral, timeout, refund, challenge, recovery, and failure. Include fees and confirmation timing.

Review security evidence: cryptographic assumptions, economic incentives, code quality, tests, audits, incidents, and cross-implementation results.

Finally rewrite the project's main claims in precise language. Replace “secured by Bitcoin” with the exact rules Bitcoin enforces. Replace “decentralized” with the operator and key distribution. Replace “live” with the network, release, and date. Replace “trustless bridge” with its custody, challenger, setup, and data assumptions.

This process does not decide whether innovation is good or bad. It makes the system legible enough for readers to understand what is currently true, what is proposed, and what remains uncertain.

## 3. Key Terms

- **Consensus rule:** A rule validating Bitcoin nodes enforce when accepting transactions and blocks.
- **Implementation behavior:** The behavior of specific software, which may include consensus enforcement, wallet logic, relay policy, APIs, and defaults.
- **Application protocol:** Rules implemented above Bitcoin consensus using valid Bitcoin transactions and additional messages or state.
- **Application-derived state:** State reconstructed from Bitcoin data according to rules not maintained by Bitcoin consensus.
- **Soft-fork proposal:** A proposed consensus restriction that would require activation before upgraded rules are enforced on mainnet.
- **Enforcement point:** The component that detects a rule violation and determines the consequence.
- **Custody map:** A record of the keys, scripts, signers, and emergency authorities that can control funds.
- **Data availability:** Access to the information required to verify state, challenge claims, synchronize, or exit.
- **Unilateral exit:** A recovery or settlement path a user can exercise without ongoing counterparty cooperation.
- **Trusted setup:** An initialization process whose integrity is required for the later security claim.
- **Economic security:** A design relying on collateral, rewards, penalties, liquidity, or monitoring incentives.
- **Interoperability:** The ability of independently developed implementations to agree on messages, transactions, state, and outcomes.
- **Claim-evidence matrix:** A table linking each claim to its layer, primary source, date, version, and uncertainty.
- **Project-reported metric:** A measurement supplied by the project that has not been independently reproduced.

## 4. Sources

1. **BIP 3: Updated BIP Process** | Murch
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0003.md
   - Supports: The purpose and limits of BIPs, author ownership, Complete and Deployed statuses, evidence expectations, and lack of a central Bitcoin adoption authority.
2. **BIP 347: OP_CAT in Tapscript** | Ethan Heilman and Armin Sabouri
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0347.mediawiki
   - Supports: A current example of a Complete consensus soft-fork proposal that must remain separate from active mainnet rules.
3. **BIP 341: Taproot** | Pieter Wuille, Jonas Nick, and Anthony Towns
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki
   - Supports: Active Taproot consensus rules and script-path commitments used by many emerging protocols.
4. **BIP 342: Validation of Taproot Scripts** | Pieter Wuille, Jonas Nick, and Anthony Towns
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0342.mediawiki
   - Supports: Active Tapscript rules, OP_SUCCESSx upgrade behavior, and resource limits.
5. **Bitcoin Core v31.1 Script Interpreter** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/interpreter.cpp
   - Supports: A dated implementation source used to distinguish active script behavior from proposed opcodes.
6. **Bitcoin Core v31.1 Policy Source** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/src/policy
   - Supports: A dated example of implementation relay and standardness policy separate from consensus.
7. **Bitcoin Core v31.1 Release Notes** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/master/doc/release-notes/release-notes-31.1.md
   - Supports: The current implementation release used to date Bitcoin Core behavior in this batch.
8. **BitVM: Compute Anything on Bitcoin** | Robin Linus
   - URL: https://bitvm.org/bitvm.pdf
   - Supports: An example of a paper specifying off-chain computation and Bitcoin dispute verification without consensus changes.
9. **BitVM2: Bridging Bitcoin to Second Layers** | Robin Linus and coauthors
   - URL: https://bitvm.org/bitvm_bridge.pdf
   - Supports: An example of an evolving bridge and optimistic verification design with operators, challengers, proofs, setup, and liveness assumptions.
10. **BitVM Repository** | BitVM contributors
   - URL: https://github.com/BitVM/BitVM
   - Supports: An example of implementation evidence and an explicit production warning reviewed on 2026-07-24.
11. **BitVM Developer Preview** | BitVM contributors
   - URL: https://bitvm.org/demo/
   - Supports: An example of public test transactions and developer-preview evidence that should not be equated with production deployment.
12. **DLC Specifications README** | DLC specification contributors
   - URL: https://github.com/discreetlogcontracts/dlcspecs/blob/master/README.md
   - Supports: An example of an application-protocol specification that remains self-described as work in progress while implementations exist.
13. **DLC Specifications Introduction** | DLC specification contributors
   - URL: https://github.com/discreetlogcontracts/dlcspecs/blob/master/Introduction.md
   - Supports: An example of separating Bitcoin transaction enforcement from oracle, adaptor-signature, refund, and collusion assumptions.
14. **DLC Peer Protocol** | DLC specification contributors
   - URL: https://github.com/discreetlogcontracts/dlcspecs/blob/master/Protocol.md
   - Supports: An example of versioned application messages, transaction construction, validation requirements, fees, and locktimes.
15. **BIP 141: Segregated Witness** | Eric Lombrozo, Johnson Lau, and Pieter Wuille
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki
   - Supports: Transaction identifiers, witness data, weight, and versioning background for evaluating application transaction designs.
16. **Bitcoin Developer Guide: P2P Network** | Bitcoin Core project documentation contributors
   - URL: https://developer.bitcoin.org/devguide/p2p_network.html
   - Supports: Background for separating peer behavior and network relay from application protocols.
17. **Bitcoin Developer Guide: Block Chain** | Bitcoin Core project documentation contributors
   - URL: https://developer.bitcoin.org/devguide/block_chain.html
   - Supports: Accepted-chain, confirmation, and reorganization background for evaluating derived state.
18. **Ordinal Theory Handbook** | Ord project contributors
   - URL: https://docs.ordinals.com/
   - Supports: An example of application-derived identifiers, indexing, wallet handling, and interpretation above Bitcoin consensus.
19. **Runes Specification** | Ord project contributors
   - URL: https://docs.ordinals.com/runes.html
   - Supports: An example of application-derived fungible state interpreted from Bitcoin transactions.
20. **BRC-20 Experiment Documentation** | domo-2k
   - URL: https://domo-2.gitbook.io/brc-20-experiment/
   - Supports: An example of an experimental indexed protocol whose balance rules are not Bitcoin consensus.
21. **NIST Secure Software Development Framework** | National Institute of Standards and Technology
   - URL: https://csrc.nist.gov/pubs/sp/800/218/final
   - Supports: Primary software-security guidance supporting review of releases, dependencies, testing, provenance, and vulnerability handling.

## 5. SEO title

How to Evaluate Emerging Bitcoin Protocols | Mempool Surf Club

## 6. Meta description

Learn how to assess Bitcoin protocols by layer, enforcement, custody, data availability, exits, maturity, and evidence.

## 7. Page excerpt

Evaluate emerging Bitcoin protocols without confusing proposals, implementation behavior, application state, bridges, or experiments with consensus.

## 8. Estimated reading time

20 to 23 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-047 | What Is OP_CAT?
- Next: MSC-GUIDE-049 | What Is Bitcoin Core?
- Prerequisite: MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- Prerequisite: MSC-GUIDE-014 | How Bitcoin Confirmations Work
- Prerequisite: MSC-GUIDE-044 | How Bitcoin Indexers Work
- Branch: MSC-GUIDE-045 | What Is BitVM?
- Branch: MSC-GUIDE-046 | How Discreet Log Contracts Work
- Branch: MSC-GUIDE-047 | What Is OP_CAT?
- Return: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] Registry metadata matches the approved manifest entry.
- [x] Consensus rules, Bitcoin Core implementation behavior, BIPs, deployed application protocols, experimental projects, bridges, and application-derived state remain distinct.
- [x] The framework identifies enforcement points, custody, setup, state, data availability, exits, cryptographic assumptions, economics, code maturity, interoperability, governance, and evidence.
- [x] BIP 347, BitVM, and DLC examples use dated primary evidence and do not imply mainnet consensus deployment.
- [x] Bitcoin transaction inclusion is not treated as proof that every application rule is Bitcoin-enforced.
- [x] Trustless, secured by Bitcoin, decentralized, live, audited, and adoption claims are replaced with testable questions.
- [x] Mempool policy, relay, miner selection, confirmation, and consensus are not collapsed.
- [x] Audits, repositories, demonstrations, transaction counts, and total value are not treated as complete security evidence.
- [x] The framework permits uncertainty and competing designs without promotional or dismissive language.
- [x] Planned internal links remain inactive and do not imply publication.

## 11. Human verification

- Reviewer: Pending
- Review date: Pending
- Notes: Pending human verification should apply the framework to at least two additional current projects, reproduce every dated example against live primary sources, confirm Bitcoin Core 31.1 remains the intended implementation reference, have a protocol reviewer inspect the enforcement and custody taxonomy, and verify that the adoption, governance, audit, and metric guidance does not imply endorsement of any named project.

## 12. Illustration brief

### Illustration 1

- Concept title: Bitcoin Innovation Layer Chart
- Educational purpose: Separate consensus, implementation, application protocol, derived state, and external systems.
- Recommended placement: After the section Classify the layer.
- Visual description: Vintage ocean-depth chart with Bitcoin consensus at the seabed, node implementation and policy above it, application protocols and indexers at the surface, and bridges reaching an external island.
- Required labels: Bitcoin consensus, Node implementation, Wallet and policy, Application protocol, Derived state, Bridge, External system
- Caption: Systems can use Bitcoin while inheriting different enforcement and trust properties.
- Alt text: Layered ocean chart separating Bitcoin consensus, implementations, applications, derived state, bridges, and external systems.
- Image orientation: Landscape
- Mobile crop notes: Stack the layers vertically with concise labels.
- Status: PLANNED

### Illustration 2

- Concept title: Failure-Path Navigation Map
- Educational purpose: Center evaluation on exits, challenge windows, refunds, and unavailable operators.
- Recommended placement: After the section Examine the exit and failure paths.
- Visual description: Nautical emergency route map branching from normal operation into operator offline, oracle failure, data withholding, fee spike, reorganization, challenge, refund, and recovery routes.
- Required labels: Normal path, Operator offline, Oracle failure, Data withheld, Fee spike, Reorganization, Challenge, Refund, Unilateral exit
- Caption: A protocol's security is revealed by the transactions, data, deadlines, and authority available when the normal path fails.
- Alt text: Emergency navigation map showing protocol failure scenarios and challenge, refund, and exit routes.
- Image orientation: Landscape
- Mobile crop notes: Use one normal-path trunk with short failure branches.
- Status: PLANNED

### Illustration 3

- Concept title: Claim-Evidence Sextant
- Educational purpose: Give readers a repeatable method for matching claims to primary evidence and uncertainty.
- Recommended placement: After the section Use a claim-evidence matrix.
- Visual description: Vintage navigation desk with a five-column chart and sextant aligning claim, layer, evidence, date and version, and uncertainty.
- Required labels: Claim, Layer, Primary evidence, Date and version, Remaining uncertainty, Verified, Project-reported
- Caption: Precise evaluation connects each claim to the layer that enforces it and the dated evidence that supports it.
- Alt text: Technical review chart showing a claim aligned with layer, evidence, date, version, and remaining uncertainty.
- Image orientation: Landscape
- Mobile crop notes: Convert the five columns into stacked labeled cards.
- Status: PLANNED
