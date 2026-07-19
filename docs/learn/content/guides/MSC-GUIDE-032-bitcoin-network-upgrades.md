---
registry_id: MSC-GUIDE-032
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: How Bitcoin Network Upgrades Happen
handle: bitcoin-network-upgrades
category: The Bitcoin Network
subcategory: Consensus
depth: Deep
format: History
primary_path: Understand the Network
secondary_paths:
  - Build on Bitcoin
author_display: Mempool Surf Club Editorial
reviewed_date: null
copy_locked_date: null
---

# How Bitcoin Network Upgrades Happen

## 1. Introductory deck

Bitcoin network upgrades emerge through public proposals, technical review, implementation, testing, software releases, operator decisions, and sometimes an explicit activation mechanism. No developer, miner, company, or node can update the entire network by decree. The history of P2SH, BIP 34, locktime changes, SegWit, and Taproot shows that upgrading Bitcoin is a layered coordination process in which software availability, adoption, signaling, and enforcement remain separate.

## 2. Full article

Bitcoin changes over time, but it does not have one central administrator that schedules protocol releases for everyone.

An upgrade begins as an idea and becomes relevant only if people specify it, implement it, review it, adopt supporting software, and use compatible rules.

That process can be slow because Bitcoin protects valuable history and must continue operating while participants make independent decisions.

### Network upgrade is a broad category

A Bitcoin network upgrade can affect several layers:

- Consensus rules for valid blocks and transactions.
- Node policy for mempool acceptance and relay.
- Peer-to-peer messages and transport behavior.
- Mining interfaces and block-template construction.
- Wallet formats, addresses, signing, and backups.
- RPCs, indexes, descriptors, and operator tools.
- Performance, storage, privacy, and security behavior.

Not every upgrade changes consensus.

A node can gain a new RPC, faster block validation, or a different relay policy without changing which blocks it accepts. Those changes may require coordination among applications or peers, but they do not automatically create a new validity rule.

Consensus upgrades receive special scrutiny because incompatible enforcement can split participants over which blocks are valid.

### A BIP records a proposal rather than approving it

Bitcoin Improvement Proposals provide a structured way to document ideas.

The BIP process defines publication requirements, document types, status handling, and editorial procedures. A BIP can describe a consensus change, peer protocol, application standard, informational design, or process.

Publication in the BIPs repository does not mean the proposal is endorsed, safe, implemented, or scheduled for activation.

A BIP number is also not authority over running nodes. The document can improve review by giving participants a stable specification and history, but adoption remains a separate question.

Useful upgrade analysis asks:

- What problem is being addressed?
- Which layer changes?
- Is the proposal complete enough to implement independently?
- What compatibility assumptions does it make?
- What tests or vectors define expected behavior?
- Which software implements it?
- What activation or deployment conditions apply?
- Which users and services need operational changes?

### Discussion usually comes before formal specification

Ideas are often discussed in public technical forums before a formal BIP is ready.

Early discussion can reveal that a proposal duplicates earlier work, creates an unexpected consensus risk, lacks a deployment plan, or needs to be divided into several specifications.

The design may change repeatedly.

This stage matters because implementation details can expose consequences that prose alone misses. A signature change may affect hardware wallets. A new output type may require address support. A block rule may require mining-template changes. A peer feature may need capability negotiation.

There is no required moment when discussion becomes agreement. A proposal can remain debated, be revised, be replaced, or become inactive without changing Bitcoin.

### Implementation makes behavior testable

A written specification becomes more concrete when software implements it.

Implementation can reveal ambiguous byte encodings, integer boundaries, interactions with existing rules, denial-of-service risks, upgrade paths, and differences between policy and consensus.

For consensus changes, reviewers need deterministic behavior. Two correct implementations must agree on the validity of every possible relevant block and transaction.

Reference code can help explain the proposal, but one implementation does not substitute for a specification or review. Code can contain bugs, and prose can fail to capture code behavior.

Testing may include:

- Unit and functional tests.
- Cross-implementation test vectors.
- Fuzzing and adversarial cases.
- Test networks or signet experiments.
- Mining and wallet integration tests.
- Activation-state tests.
- Reorganization tests near the boundary.
- Performance and resource measurements.

### A software release is not network activation

When an implementation is merged into a project, only that repository has changed.

When a project publishes a release, operators can choose to install it. Existing nodes do not update themselves because new code exists.

A release may contain support for a future rule while leaving that rule inactive. It may also contain wallet, policy, networking, and performance changes unrelated to activation.

This creates three separate dates:

1. The date code became available.
2. The period in which operators adopted it.
3. The block height or deployment state at which a consensus rule began enforcement.

Conflating those dates makes upgrade history inaccurate.

### P2SH showed early coordination by time and signaling

Pay to Script Hash, specified in BIP 16, changed how certain scripts were evaluated.

Bitcoin Core implemented the rules in version 0.6.0, and the rules took effect on April 1, 2012.

The deployment used miner signaling and a scheduled transition rather than today's versionbits framework.

P2SH also required wallet and address support described separately in BIP 13. That distinction illustrates a recurring pattern: the consensus rule, user-facing encoding, mining readiness, and software release were connected but not identical.

The episode helped establish that upgrade history must track both technical specification and operational deployment.

### BIP 34 introduced height in the coinbase transaction

BIP 34 required the block height to appear at the beginning of the coinbase input for applicable blocks.

Its deployment used block-version thresholds. Version 2 blocks began enforcing the new rule, and version 1 blocks were later disallowed.

Bitcoin Core's current mainnet parameters use height 227,931 as the buried activation point for BIP 34.

A buried deployment is a historical rule represented by a fixed height because the original signaling period is long past. Modern nodes still enforce the result even though they no longer need to recalculate the old readiness threshold during ordinary mainnet validation.

### BIP 66 and BIP 65 tightened script behavior

BIP 66 required strict DER encoding for signatures used by Bitcoin script. Its mainnet activation is represented in current Bitcoin Core parameters at height 363,725.

BIP 65 introduced `CHECKLOCKTIMEVERIFY` by assigning restrictive meaning to an existing no-operation opcode. Its mainnet activation height is 388,381.

Both used the earlier block-version threshold mechanism.

These upgrades show two reasons consensus rules evolve. BIP 66 reduced ambiguity in signature encoding, while BIP 65 added a new enforceable spending condition.

They also show why miners must do more than signal. A miner can claim readiness yet still produce an invalid block if its validation or template system does not enforce the activated rule correctly.

### Versionbits allowed parallel deployments

BIP 9 introduced versionbits so several soft-fork deployments could use separate bits within the block version field.

Each deployment can move through states such as defined, started, locked in, active, or failed according to its parameters and signaling results.

Versionbits separates readiness signaling from actual enforcement. A signal can contribute to lock-in, but upgraded nodes enforce the new rule only when the deployment reaches its active state.

The mechanism improved flexibility, but it did not turn miners into protocol legislators. Signaling measured a defined form of block-producer readiness. It did not count users, nodes, wallets, businesses, or developers.

### Relative locktime deployed as a coordinated package

The relative-locktime upgrade combined BIP 68, BIP 112, and BIP 113.

BIP 68 assigned consensus meaning to transaction sequence fields for relative locktime. BIP 112 introduced `CHECKSEQUENCEVERIFY`. BIP 113 changed locktime evaluation to use median time past.

The package deployed through BIP 9 and is represented in current mainnet parameters by the CSV activation height of 419,328.

This history shows why one named upgrade may contain several interdependent BIPs. A complete account must identify which documents specify transaction semantics, script behavior, time calculation, activation, and implementation.

### SegWit combined consensus, networking, wallet, and activation coordination

Segregated Witness was not one isolated code switch.

BIP 141 defined the consensus-layer witness structure, witness commitment, block weight, and witness programs. BIP 143 defined signature hashing for version 0 witness programs. BIP 144 covered peer services. BIP 145 updated mining interfaces. BIP 147 added another consensus restriction.

Bitcoin Core implemented major SegWit support in the 0.13 series. The original BIP 9 deployment used bit 1 and required 1,916 signaling blocks in a 2,016-block period, a 95 percent threshold.

During 2017, several overlapping coordination efforts attempted to move that deployment toward lock-in. The New York Agreement was an industry commitment to support SegWit through an 80 percent bit 4 signal and later attempt a 2 MB base-block-size hard fork. The agreement was not itself a Bitcoin consensus mechanism and could not update running nodes.

BIP 148 proposed that participating nodes reject blocks that did not signal the existing SegWit bit during a defined period beginning August 1, 2017, unless SegWit had already locked in. BIP 91 defined a separate bit 4 deployment with a threshold of 269 blocks in a 336-block window. Once active, BIP 91 enforcing nodes rejected blocks that did not signal the existing SegWit bit 1 deployment, creating a path for the original BIP 9 threshold to be reached.

SegWit ultimately locked in under its original BIP 9 deployment and activated at mainnet height 481,824. The outcome cannot be reduced to a vote by miners, companies, developers, or users. BIP 9 supplied the activation state enforced by compatible node software, while BIP 91, BIP 148, the New York Agreement, miner behavior, operator choices, and service preparation shaped the coordination environment around it.

### Taproot used a bounded signaling window and activation floor

Taproot combined BIP 340 Schnorr signatures, BIP 341 Taproot rules, and BIP 342 Tapscript.

The rules were implemented in Bitcoin Core before activation and deployed with a modified versionbits process.

For mainnet, BIP 341 specified a 2,016-block signaling period, a threshold of 1,815 blocks, a limited signaling window, and a minimum activation height of 709,632. The deployment activated at that height.

The minimum activation height created time between lock-in and enforcement for software and operational preparation.

Taproot's history again separates specification, code availability, release support, signaling, lock-in, and activation. Calling all of those events "the Taproot upgrade date" hides the process.

### Miners signal and produce blocks, but do not act alone

Miners have an important role because they construct blocks and can signal through block headers when a deployment defines that mechanism.

Their readiness matters. After activation, miners using incorrect rules can lose work by producing blocks that upgraded nodes reject.

But miners do not install software on user nodes, define what wallets accept, or make invalid blocks valid to nodes enforcing different rules.

A signaling threshold is meaningful because node software assigns meaning to it. The threshold cannot update nodes that do not contain that deployment logic.

Mining support is therefore a coordination and production input, not unilateral approval of the protocol.

### Node operators choose local enforcement software

A node operator decides which implementation and version to run.

That software determines the consensus checks the node performs, subject to network parameters and activation state.

One node cannot force every other node to upgrade. It can accept, reject, and relay data according to its own rules. When many independently operated nodes enforce compatible rules, they can converge on the same valid proof-of-work history.

This local choice gives node operation practical importance, but it should not be romanticized as one-node-one-vote governance. Nodes are not registered identities, and a person can run many of them. Economic relevance, connectivity, mining behavior, and service dependencies are not measured by a simple node count.

### Developers propose and maintain software rather than command adoption

Developers research designs, write specifications, review code, produce tests, maintain implementations, and publish releases.

Those activities can strongly influence what options are available and how well risks are understood.

They do not create a universal update channel.

A maintainer can merge code into one repository, but operators may decline the release, use another implementation, modify the code, or remain on an older version.

This distinction does not make development power irrelevant. Review access, expertise, release practices, funding, and communication can shape the upgrade process. It means that software influence and network enforcement are not the same authority.

### Wallets, exchanges, and services face their own readiness work

Even when old nodes can remain consensus compatible, applications may need updates.

An upgrade can require:

- New address encodings.
- New transaction or signature formats.
- Hardware-wallet firmware.
- Descriptor and backup changes.
- Fee and weight accounting.
- Block-explorer decoding.
- Exchange deposit and withdrawal support.
- Custody policy changes.
- Mining-template and payout updates.
- Monitoring for activation and reorganization events.

Service readiness does not decide consensus validity, but failures can harm users.

This is why deployment planning includes more than node and miner percentages.

### Emergency fixes reveal consensus risk

Not every urgent release is a planned network upgrade.

In August 2010, block 74,638 included a transaction that exploited an output-value overflow bug and created amounts far beyond Bitcoin's intended monetary rules. Version 0.3.10 added stricter transaction-value checks, and miners and node operators coordinated around a patched chain that excluded the bad block. The event was an emergency correction to unintended validation behavior, not a normal BIP deployment.

In March 2013, Bitcoin 0.8 accepted a block that some pre-0.8 nodes rejected because older Berkeley DB configurations could exhaust their available locks while processing a large but otherwise valid block. The incompatible behavior produced two chains with substantial proof of work. Major pools temporarily downgraded so mining concentrated on the chain older nodes could process, and Bitcoin 0.8.1 added temporary compatibility limits.

The 2013 split showed that implementation and resource behavior can become de facto consensus boundaries even when no protocol designer intended them to be rules. It also showed that proof of work cannot automatically resolve a split when participants disagree about validity and both branches retain meaningful mining support.

Emergency response can involve patches, release coordination, miner communication, service pauses, and temporary operating guidance. Those actions should be described by the actual bug and compatibility decision rather than presented as a normal proposal or activation ceremony.

### Compatibility is tested at boundaries

Upgrade risk concentrates at boundaries:

- Before and after activation.
- Between upgraded and non-upgraded nodes.
- Between miners that enforce different rules.
- Between wallet software and new output types.
- Between peer versions.
- Between implementations interpreting the same specification.
- During reorganizations crossing an activation height.
- When a deployment times out or fails to lock in.

Good engineering defines expected behavior on both sides of each boundary.

A deployment that works only on the happy path is not ready for a live monetary network.

### There is no single approval ceremony

Bitcoin upgrades do not pass through one final institution.

A proposal may gain broad technical review but little operator adoption. Software may be widely installed while a feature remains unused. Miners may signal readiness while wallets are still preparing. Businesses may announce support without running enforcing nodes. Users may disagree about acceptable activation methods.

The result emerges from actions:

- Authors specify.
- Reviewers test and criticize.
- Maintainers decide what enters particular releases.
- Operators select software.
- Miners validate, signal, and produce blocks.
- Wallets and services support new behavior.
- Users decide which systems and rules they rely on.

No list is a formal legislature. The categories also overlap because one person or organization may fill several roles.

### The historical pattern is conservative layering

Across P2SH, BIP 34, BIP 66, BIP 65, relative locktime, SegWit, and Taproot, a recurring sequence appears:

1. Identify a problem or capability.
2. Discuss tradeoffs publicly.
3. Write precise specifications.
4. Implement and test the behavior.
5. Publish supporting software.
6. Give operators and services time to prepare.
7. Coordinate activation when consensus changes.
8. Enforce the rule through upgraded nodes.
9. Monitor blocks, applications, and compatibility.
10. Preserve the result as historical consensus logic.

The details changed across eras. Early deployments used time or block-version thresholds. Later deployments used versionbits and explicit activation parameters. Old deployments became fixed-height checks.

The durable principle is independent adoption with precise compatibility.

Bitcoin can upgrade because people can coordinate around better rules and software. It remains resistant to unilateral change because every participant decides what to run and every validating node checks the resulting blocks for itself.

## 3. Key Terms

- **Network upgrade:** A coordinated change to Bitcoin software or rules that may affect policy, interoperability, features, or consensus behavior.
- **Consensus:** The shared validation rules independently enforced by Bitcoin nodes.
- **BIP:** A Bitcoin Improvement Proposal that documents a proposed standard, process, or protocol change.
- **Bitcoin Core:** The most widely used open-source Bitcoin node and wallet software implementation.
- **Soft fork:** A consensus change that makes previously valid behavior invalid under new rules.
- **Hard fork:** A consensus rule change that can make previously invalid blocks valid and requires broad compatibility planning.
- **Protocol:** A defined set of rules and message formats that allows independent participants or software systems to interact consistently.
- **Validation:** The process of checking transactions and blocks against applicable rules.

## 4. Sources

1. **BIP 3: Updated BIP Process**  
   Author or publisher: Bitcoin Improvement Proposal contributors  
   URL: https://github.com/bitcoin/bips/blob/master/bip-0003.md  
   Supports: The current BIP publication process, document handling, editorial roles, and the distinction between publishing a proposal and adopting it.

2. **Bitcoin BIPs repository README**  
   Author or publisher: Bitcoin Improvement Proposal contributors  
   URL: https://github.com/bitcoin/bips/blob/master/README.mediawiki  
   Supports: The BIPs repository as a publication medium and archive, the lack of automatic endorsement or adoption, and the role of users in acceptance.

3. **Bitcoin Core implemented BIPs documentation**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/doc/bips.md  
   Supports: Implementation and deployment history for P2SH, BIP 34, BIP 65, BIP 66, versionbits, CSV, SegWit, and Taproot.

4. **BIP 16: Pay to Script Hash**  
   Author or publisher: Gavin Andresen  
   URL: https://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki  
   Supports: P2SH consensus behavior, early miner signaling, and the scheduled 2012 transition.

5. **BIP 34: Block v2, Height in Coinbase**  
   Author or publisher: Gavin Andresen  
   URL: https://github.com/bitcoin/bips/blob/master/bip-0034.mediawiki  
   Supports: Coinbase-height rules, block-version deployment, and early threshold-based activation.

6. **BIP 66: Strict DER Signatures**  
   Author or publisher: Pieter Wuille  
   URL: https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki  
   Supports: Strict signature-encoding consensus rules and the version 3 deployment mechanism.

7. **BIP 65: OP_CHECKLOCKTIMEVERIFY**  
   Author or publisher: Peter Todd  
   URL: https://github.com/bitcoin/bips/blob/master/bip-0065.mediawiki  
   Supports: Absolute locktime script enforcement and the version 4 deployment mechanism.

8. **BIP 9: Version Bits with Timeout and Delay**  
   Author or publisher: Pieter Wuille, Peter Todd, Gregory Maxwell, and Rusty Russell  
   URL: https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki  
   Supports: Parallel soft-fork deployment, signaling periods, thresholds, timeouts, and defined state transitions.

9. **BIP 68, BIP 112, and BIP 113 relative-locktime suite**  
   Author or publisher: Bitcoin Improvement Proposal contributors  
   URL: https://github.com/bitcoin/bips/blob/master/bip-0068.mediawiki  
   Supports: Consensus-enforced relative locktime and its coordinated deployment with CHECKSEQUENCEVERIFY and median-time-past locktime rules.

10. **BIP 141: Segregated Witness**  
    Author or publisher: Eric Lombrozo, Johnson Lau, and Pieter Wuille  
    URL: https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki  
    Supports: Witness structure, block commitments, block weight, witness programs, backward-compatibility boundaries, and SegWit consensus deployment.

11. **BIP 148: Mandatory Activation of SegWit Deployment**  
    Author or publisher: Shaolin Fry  
    URL: https://github.com/bitcoin/bips/blob/master/bip-0148.mediawiki  
    Supports: The user-activated soft-fork proposal that formed part of SegWit's deployment history and coordination debate.

12. **BIP 91: Reduced threshold SegWit MASF**  
    Author or publisher: James Hilliard  
    URL: https://github.com/bitcoin/bips/blob/master/bip-0091.mediawiki  
    Supports: The bit 4 deployment, 269-of-336 threshold, mandatory bit 1 signaling after activation, and its relationship to the existing SegWit BIP 9 deployment.

13. **Bitcoin Scaling Agreement at Consensus 2017**  
    Author or publisher: Digital Currency Group  
    URL: https://dcgco.medium.com/bitcoin-scaling-agreement-at-consensus-2017-133521fe9a77  
    Supports: The original New York Agreement commitment to 80 percent bit 4 SegWit signaling and a later 2 MB hard-fork proposal.

14. **BIP 340: Schnorr Signatures for secp256k1**  
    Author or publisher: Pieter Wuille, Jonas Nick, and Tim Ruffing  
    URL: https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki  
    Supports: The Schnorr signature specification deployed as part of Taproot.

15. **BIP 341: Taproot**  
    Author or publisher: Pieter Wuille, Jonas Nick, and Anthony Towns  
    URL: https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki  
    Supports: Taproot consensus rules, mainnet signaling parameters, 90 percent threshold, minimum activation height, and activation at block 709,632.

16. **BIP 342: Validation of Taproot Scripts**  
    Author or publisher: Pieter Wuille, Jonas Nick, and Anthony Towns  
    URL: https://github.com/bitcoin/bips/blob/master/bip-0342.mediawiki  
    Supports: Tapscript validation rules and its concurrent deployment with Taproot.

17. **Version 0.3.10 overflow patch announcement**  
    Author or publisher: Satoshi Nakamoto  
    URL: https://bitcointalk.org/index.php?topic=827.0  
    Supports: The emergency release of version 0.3.10 to patch the block 74,638 output-value overflow bug.

18. **BIP 50: March 2013 Chain Fork Post-Mortem**  
    Author or publisher: Gavin Andresen  
    URL: https://github.com/bitcoin/bips/blob/master/bip-0050.mediawiki  
    Supports: The March 2013 split, Berkeley DB lock exhaustion, incompatible validation behavior, pool downgrades, and the operational response.

19. **Bitcoin-Qt version 0.8.1 release notes**  
    Author or publisher: Bitcoin Core contributors  
    URL: https://bitcoin.org/en/release/v0.8.1  
    Supports: The 0.8.1 compatibility rules and checkpoint added after the March 2013 chain fork.

20. **Bitcoin Core mainnet consensus parameters**  
    Author or publisher: Bitcoin Core contributors  
    URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/kernel/chainparams.cpp  
    Supports: Buried mainnet activation heights for BIP 34, BIP 65, BIP 66, CSV, and SegWit.

21. **Bitcoin Core validation implementation**  
    Author or publisher: Bitcoin Core contributors  
    URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/validation.cpp  
    Supports: Independent block validation, activation of valid candidate chains, and enforcement of consensus rules by local nodes.

## 5. SEO title

How Bitcoin Network Upgrades Happen: From BIPs to Activation

## 6. Meta description

Learn how Bitcoin upgrades move from public proposals and code review to releases, adoption, signaling, activation, and independent node enforcement.

## 7. Page excerpt

Bitcoin upgrades are not approved by one group. See how BIPs, implementations, miners, node operators, wallets, services, and activation mechanisms have shaped changes from P2SH to Taproot.

## 8. Estimated reading time

15 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Parent hub: MSC-HUB-NETWORK | The Bitcoin Network
- Primary path: MSC-PATH-NETWORK | Understand the Network
- Secondary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite: MSC-GUIDE-031 | How Bitcoin Soft Forks Work
- Prerequisite: MSC-GUIDE-053 | How Bitcoin Improvement Proposals Work
- Previous guide: MSC-GUIDE-031 | How Bitcoin Soft Forks Work
- Next guide: MSC-GUIDE-033 | How the Lightning Network Works
- Branch guide: MSC-GUIDE-053 | How Bitcoin Improvement Proposals Work
- Recommended continuation: MSC-GUIDE-015 | What Is the Bitcoin Halving?
- Related guide: MSC-GUIDE-021 | What Is a Bitcoin Full Node?
- Related guide: MSC-GUIDE-029 | How Bitcoin Proof of Work Secures the Network
- Related guide: MSC-GUIDE-030 | How Bitcoin Reaches Consensus
- Glossary: MSC-GLOSSARY-001 | Bitcoin Glossary

## 10. Accuracy review checklist

- [x] Registry metadata and navigation relationships match the approved registry.
- [x] Network upgrades are separated into consensus, policy, peer, mining, wallet, and interface layers.
- [x] BIP publication is not described as endorsement, implementation, adoption, or activation.
- [x] Code merge, software release, operator adoption, lock-in, and activation remain distinct.
- [x] Miners are not described as unilaterally approving consensus changes.
- [x] Developers and maintainers are not described as remotely updating the network.
- [x] Node operators are not reduced to one-node-one-vote governance.
- [x] P2SH, BIP 34, BIP 66, BIP 65, CSV, SegWit, and Taproot histories use primary sources.
- [x] Current Bitcoin Core buried activation heights are identified as implementation parameters.
- [x] Taproot's threshold, period, minimum activation height, and activation height are qualified precisely.
- [x] Wallet and service readiness is separated from consensus validity.
- [x] Planned upgrades and emergency software fixes are distinguished.
- [x] Exact approved glossary definitions are used.
- [x] Planned internal links contain no live URLs.
- [x] No em dash or en dash character appears.

## 11. Human verification

- Reviewer:
- Review date:
- Notes:
  - Recheck the current BIP process and BIPs repository language immediately before accuracy review.
  - Verify P2SH, BIP 34, BIP 66, BIP 65, CSV, SegWit, and Taproot implementation and activation history against primary records.
  - Confirm mainnet buried activation heights against the current Bitcoin Core release used for review.
  - Recheck the distinction between BIP publication, implementation, release, adoption, signaling, lock-in, activation, and enforcement.
  - Confirm that no constituency is portrayed as a formal Bitcoin legislature or unilateral upgrade authority.
  - Confirm exact glossary-definition synchronization.
  - Recheck every source URL immediately before publication.
  - Keep planned internal links inactive until real destination pages and confirmed URLs exist.

## 12. Illustration brief

### Illustration 1

- Concept title: From Proposal to Enforced Upgrade
- Educational purpose: Separate the stages that turn an idea into locally enforced Bitcoin behavior.
- Recommended placement: After the section titled A software release is not network activation.
- Visual description: Old nautical engineering flow with stations for public discussion, BIP specification, implementation, review and tests, software release, operator adoption, activation mechanism, and node enforcement. Use separate tracks for miners, wallets, and services joining before activation.
- Required labels: Discussion, BIP, Implementation, Review, Tests, Release, Adoption, Signaling, Activation, Node enforcement
- Caption: A Bitcoin upgrade moves through specification, software, adoption, and enforcement rather than one approval event.
- Alt text: Historical process diagram showing a Bitcoin proposal moving through a BIP, implementation, testing, release, operator adoption, activation, and independent node enforcement.
- Image orientation: Landscape
- Mobile crop notes: Stack the main stages vertically and place miner, wallet, and service readiness as short side branches.
- Status: PLANNED

### Illustration 2

- Concept title: Bitcoin Upgrade Timeline
- Educational purpose: Show how deployment methods changed from early scheduled and version-threshold transitions to versionbits and bounded activation.
- Recommended placement: After the section titled Taproot used a bounded signaling window and activation floor.
- Visual description: Weathered ocean-chart timeline marking P2SH in 2012, BIP 34 at height 227,931, BIP 66 at 363,725, BIP 65 at 388,381, CSV at 419,328, SegWit at 481,824, and Taproot at 709,632. Use distinct symbols for scheduled time, buried height, versionbits, and modified versionbits.
- Required labels: P2SH, BIP 34, BIP 66, BIP 65, CSV, SegWit, Taproot, Scheduled transition, Version threshold, Versionbits, Activation height
- Caption: Bitcoin's upgrade history moved through several deployment mechanisms while preserving independent node enforcement.
- Alt text: Historical Bitcoin upgrade timeline from P2SH through Taproot with activation heights and deployment-mechanism labels.
- Image orientation: Landscape
- Mobile crop notes: Use a vertical timeline with large height labels and keep each deployment symbol beside its upgrade name.
- Status: PLANNED

### Illustration 3

- Concept title: Who Does What During an Upgrade
- Educational purpose: Prevent miners, developers, nodes, wallets, and services from being collapsed into one governance body.
- Recommended placement: After the section titled There is no single approval ceremony.
- Visual description: Vintage network coordination chart with five independent vessels. Developers carry specifications and code. Node operators carry validation rules. Miners carry templates, signals, and proof of work. Wallets and services carry user-facing support. Users choose software and services. Lines show coordination without a central command ship.
- Required labels: Developers, Node operators, Miners, Wallets, Services, Users, Specification, Software choice, Validation, Signaling, Block production, Operational support
- Caption: Bitcoin upgrades depend on overlapping roles, but no single role can update every participant by decree.
- Alt text: Editorial coordination diagram showing developers, node operators, miners, wallets, services, and users performing distinct roles during a Bitcoin upgrade without a central authority.
- Image orientation: Landscape
- Mobile crop notes: Arrange the five role vessels in a circle around the upgrade process and keep the center free of any authority symbol.
- Status: PLANNED