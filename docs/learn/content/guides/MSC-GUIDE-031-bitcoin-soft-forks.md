---
registry_id: MSC-GUIDE-031
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: How Bitcoin Soft Forks Work
handle: bitcoin-soft-forks
category: The Bitcoin Network
subcategory: Consensus
depth: Deep
format: Explainer
primary_path: Understand the Network
secondary_paths:
  - Build on Bitcoin
author_display: Mempool Surf Club Editorial
reviewed_date: null
copy_locked_date: null
---

# How Bitcoin Soft Forks Work

## 1. Introductory deck

A Bitcoin soft fork changes consensus by making the valid-block rules more restrictive. Upgraded nodes reject some blocks that older nodes would have accepted, while blocks valid under the new rules can remain acceptable to older nodes. That compatibility property helps deployment, but it does not remove activation risk, operational incompatibility, or the need for miners, nodes, wallets, services, and users to coordinate carefully.

## 2. Full article

Bitcoin consensus rules can change, but changing them safely is difficult.

A soft fork is one method. It introduces stricter validity conditions while preserving a subset relationship with the older rules.

That definition is more precise than saying a soft fork is simply a backward-compatible upgrade.

### A soft fork narrows the valid set

Imagine the old rules accept a large set of possible blocks.

A soft fork adds a restriction. Upgraded nodes now accept only a subset of that old set.

Every block valid under the new rules should also remain acceptable under the old rules. Some blocks acceptable to old nodes are no longer acceptable to upgraded nodes.

This subset relationship is the defining property.

It allows non-upgraded nodes to continue following a chain produced under the stricter rules because those blocks still fit inside the older validity set.

The reverse is not guaranteed. An old miner can produce a block that satisfies the old rules but violates the new restriction. Upgraded nodes reject that block after activation.

### Restrictions can appear at several validation layers

A soft fork is not limited to adding one script opcode.

The stricter condition can affect:

- Which transaction or block structures are valid.
- How existing fields are interpreted.
- Which signatures satisfy a spending condition.
- How locktime or sequence constraints are evaluated.
- Which commitments must appear in a block.
- How much block resource usage is permitted.
- Which block versions or deployment states are acceptable.

The compatibility test remains the same in each case. A block satisfying the activated rule must still fit inside the old node's accepted set.

That test applies to complete blocks, not only to one transaction feature. A proposal can introduce a new transaction form while also changing block commitments, accounting rules, signature hashing, and activation checks. Reviewers must examine how those pieces interact.

Policy changes are different. A node can tighten its mempool or relay policy without changing which confirmed blocks it accepts. That local restriction may resemble a soft fork because it narrows what the node relays, but it is not a consensus change unless the block-validation rules also change.

Keeping the layers separate prevents a common mistake: treating every stricter default as an activated network rule. A relay filter can be changed locally. A soft fork changes the validity boundary that upgraded nodes apply to blocks.

### Soft forks do not make old nodes enforce new meaning

An old node can accept a new-rule block without understanding every rule the upgraded nodes checked.

This is often achieved by assigning new restrictive meaning to a pattern that old software already treats permissively.

For example, an older node may treat a future witness program as having minimal or no spending conditions. Upgraded nodes can assign real validation rules to that version. A spend satisfying the new rules remains acceptable to the old node because the old node does not apply the added restriction.

That is compatibility through non-enforcement.

The old node follows the chain but cannot independently verify the new condition. Its security model for those new transaction forms is weaker than that of an upgraded node.

### Soft fork compatibility is not universal compatibility

A soft fork can preserve block acceptance for old nodes and still create operational problems.

Non-upgraded software may:

- Fail to understand new addresses or output types.
- Display incomplete transaction information.
- Estimate fees or weight incorrectly.
- Treat new scripts as anyone-can-spend.
- Fail to create or sign new transaction forms.
- Misreport activation state.
- Produce blocks that violate the new rules.
- Rely on policy assumptions that changed with deployment.
- Require wallet, hardware, library, or service updates.

A soft fork is backward compatible in a specific consensus-validity sense. It is not a promise that every old application continues working safely or with full understanding.

### A proposal is not an activated rule

A soft-fork idea can pass through several stages:

1. Problem definition and design discussion.
2. Specification in one or more Bitcoin Improvement Proposals.
3. Reference or production implementation.
4. Code review and testing.
5. Software release.
6. Operator adoption.
7. Activation coordination.
8. Enforcement after activation.
9. Monitoring and later maintenance.

These stages are related but distinct.

A BIP documents a proposal. It does not command nodes to adopt it.

A merged implementation makes code available in a repository. It does not remotely update running systems.

A release lets operators install software. It does not guarantee that activation conditions will be reached.

Activation is the transition at which upgraded nodes begin enforcing the new consensus rule for relevant blocks.

### Activation must coordinate enforcement

If upgraded nodes begin enforcing a rule before enough block producers are prepared, non-upgraded miners may create blocks that the upgraded network rejects.

That can cause stale blocks, lost mining revenue, delayed confirmations, and competing branches.

If different upgraded node groups use conflicting activation conditions, they can disagree about validity at the boundary.

Deployment mechanisms therefore try to coordinate three things:

- Readiness information.
- A clear lock-in or decision point.
- A predictable enforcement point.

No mechanism eliminates social judgment. Parameters such as signaling thresholds, timeouts, activation heights, and mandatory enforcement rules express choices about risk and coordination.

### P2SH used a scheduled transition

Pay to Script Hash, specified in BIP 16, was deployed before versionbits. The new evaluation rules were implemented in Bitcoin Core 0.6.0 and took effect on April 1, 2012. Miners used coinbase signaling to show readiness before the scheduled enforcement time.

P2SH demonstrates that a soft fork does not require the later BIP 9 state machine. It also separated the consensus rule from the BIP 13 address format and wallet support needed to use P2SH safely.

### CSV deployed as a coordinated BIP 9 package

The relative locktime upgrade combined BIP 68, BIP 112, and BIP 113. BIP 68 gave transaction sequence fields consensus-enforced relative locktime meaning. BIP 112 introduced `CHECKSEQUENCEVERIFY`. BIP 113 changed locktime evaluation to use median time past.

The package deployed together through BIP 9. Current Bitcoin Core mainnet parameters preserve the result at CSV activation height 419,328.

CSV shows that one soft-fork deployment can coordinate several interdependent consensus rules under one activation state.

### Early deployments used block-version thresholds

Several early Bitcoin soft forks used block-version signaling and threshold logic.

BIP 34 introduced a rule requiring the block height in the coinbase transaction and used version 2 blocks. BIP 66 tightened signature encoding rules with version 3 blocks. BIP 65 introduced `CHECKLOCKTIMEVERIFY` with version 4 blocks.

The historical mechanism counted recent block versions. As support crossed defined thresholds, new rules became enforced and older-version blocks were eventually rejected.

Bitcoin Core later simplified the deployed activation checks for BIPs 34, 65, and 66 into fixed mainnet heights. Current code treats them as buried deployments because their activation is far in the past.

Buried deployment logic is historical enforcement, not a template for deciding every future upgrade.

### BIP 9 introduced versionbits state transitions

BIP 9 created a framework for deploying multiple soft forks through separate bits in the block version field.

A deployment moves through defined states based on median time, signaling counts, and retarget-period boundaries:

- `DEFINED`: The deployment parameters exist but signaling has not started.
- `STARTED`: Blocks can signal readiness during counting periods.
- `LOCKED_IN`: The threshold was reached and activation is scheduled after a delay.
- `ACTIVE`: Upgraded nodes enforce the new rules.
- `FAILED`: The timeout was reached without lock-in.

The block-version bit communicates miner readiness under the mechanism. It does not change transaction validity before the encoded activation state requires enforcement.

BIP 9 also does not measure every user, node, wallet, exchange, or economic actor. Miner signaling is one coordination input, not a universal governance vote.

### Signaling and enforcement are different

A miner can signal readiness and still run incorrect enforcement software.

A miner can also enforce the new rules without setting the expected signaling bit if its software or configuration behaves that way.

Nodes should not treat signaling alone as proof that a block satisfies the new rules. After activation, upgraded nodes validate the actual block contents.

This distinction matters because signaling is metadata. Enforcement is behavior.

The safest deployment analysis asks:

- Which software versions implement the rules?
- What exactly does the signal mean?
- How is the threshold calculated?
- When does lock-in occur?
- When does enforcement begin?
- What happens at timeout?
- Can miners build invalid blocks after activation?
- How do nodes expose deployment state?
- Which operational systems must upgrade?

### SegWit used a coordinated soft-fork suite

Segregated Witness changed several consensus-critical areas.

BIP 141 defined the witness structure, witness programs, block weight, and witness commitment. BIP 143 defined a new signature-hash method for version 0 witness programs. BIP 147 addressed a malleability-related rule.

The deployment used BIP 9 versionbits parameters for the `segwit` deployment.

SegWit illustrates why a soft fork can be technically broad. It affected transaction serialization, identifiers, signature verification, block accounting, relay, wallets, addresses, hardware signing, and mining templates.

Older nodes could remain on the chain, but they did not fully validate witness spending conditions or account for witness data in the same way as upgraded nodes.

Calling SegWit "backward compatible" is true only with those limits stated.

### Taproot used versionbits with modified parameters

Taproot deployed the BIP 340, BIP 341, and BIP 342 rule set.

BIP 341 specified a versionbits deployment with a 2,016-block signaling period, a 90 percent threshold, a limited signaling window, and a minimum activation height of 709,632 for mainnet.

The deployment activated at that height.

Taproot assigned new meaning to SegWit version 1 outputs. Older nodes could continue following valid Taproot blocks, but they treated those outputs under their older permissive understanding and did not enforce Schnorr, key-path, script-path, or Tapscript rules.

Upgraded nodes performed the additional checks.

This is the soft-fork subset relationship in practice: new-rule validity fits inside what the older nodes already allowed, while upgraded nodes enforce more.

### Other activation designs change the tradeoffs

BIP 8 describes a versionbits framework with height-based parameters and an optional lock-in-on-timeout behavior.

Height-based activation, flag-day activation, miner thresholds, mandatory lock-in, and combinations of these ideas shift risk between delayed activation, premature activation, coordination failure, and chain splitting.

A mechanism that guarantees eventual activation can reduce miner veto concerns but increase the consequences of poor ecosystem preparation.

A mechanism that allows timeout without activation can reduce forced-enforcement risk but may leave a widely supported proposal inactive.

There is no activation formula that turns a disputed social decision into a purely mechanical fact. The formula becomes authoritative only for nodes that run software containing it.

### Soft forks can fail safely only within assumptions

The phrase "soft forks fail safely" can be misleading.

If activation does not occur, software may remain compatible under the old rules. But operational costs can still include development work, release complexity, user confusion, and fragmented expectations.

If activation occurs with insufficient miner enforcement, upgraded nodes can reject blocks that consume real work.

If a bug exists in the new rules, upgraded nodes may accept or reject unintended data.

If different implementations interpret the specification differently, a consensus split can occur.

If users send funds to new output types while relying on old validation infrastructure, they may misunderstand their security boundary.

Soft forks reduce one class of compatibility problem. They do not remove the need for conservative engineering.

### A hard fork changes the compatibility direction

A hard fork expands or otherwise changes the valid set so that blocks accepted under the new rules may be rejected by old nodes.

Old nodes cannot necessarily follow the new chain without upgrading.

The distinction is about validity-set relationships, not about whether a change is politically contentious, technically large, or considered beneficial.

A small rule relaxation can be a hard fork. A broad set of new restrictions can be a soft fork.

Some proposals combine behaviors or depend on activation context, so classification should follow the exact validation change rather than a label.

### Full nodes determine whether enforcement applies locally

An operator's node enforces the rules contained in that software and activated under its configured network parameters.

The node does not enforce a soft fork because a website says it activated. It evaluates the deployment state or historical activation height encoded by its implementation and validates blocks accordingly.

A non-upgraded node cannot be made to perform new checks through peer messages.

An upgraded node cannot force an old node to understand a new script system.

Each operator's software choice sets the local enforcement boundary. Network compatibility depends on enough participants choosing software that produces and recognizes the same valid history.

### Miners need full validation around activation

Mining only the header target is not enough.

A miner building on a candidate chain should validate the parent, construct templates that obey the active rules, and reject invalid blocks from other miners.

After a soft fork activates, an unprepared miner can extend a block that old software accepts but upgraded software rejects. Other prepared miners may build on the upgraded-valid branch instead, causing the noncompliant work to become stale.

Pool operators also need to distinguish miner signaling, template construction, block validation, and hash-provider behavior. A pool participant's machines usually hash work assigned by the pool. The pool's template and validation systems can therefore be a key enforcement point without implying ownership of all connected hardware.

### Safe deployment requires more than one threshold

A serious soft-fork readiness review considers:

- Specification maturity.
- Independent code review.
- Test coverage and test vectors.
- Cross-implementation agreement.
- Miner and pool readiness.
- Wallet and hardware support.
- Exchange and custody operations.
- Monitoring and incident response.
- Activation-state visibility.
- Reorganization and chain-split planning.
- User communication.
- Time for upgrades and rollback decisions.

No single percentage proves that every dependency is ready.

The goal is not ceremonial unanimity. It is enough technical and operational coordination that the stricter rules can activate without uncontrolled disagreement about valid history.

### The durable soft-fork model

A Bitcoin soft fork can be summarized in six steps:

1. Define a rule that narrows the old valid-block set.
2. Specify and implement the exact validation behavior.
3. Review, test, release, and adopt supporting software.
4. Use an activation mechanism to coordinate when enforcement begins.
5. Have upgraded nodes enforce the stricter rules on real blocks.
6. Continue monitoring compatibility, mining behavior, wallets, and services after activation.

Older nodes may remain on the chain because new-valid blocks fit inside the old valid set.

They do not gain the new security checks automatically.

That is the central tradeoff: soft forks can preserve chain compatibility for non-upgraded nodes while shifting full verification of new behavior to upgraded nodes.

## 3. Key Terms

- **Soft fork:** A consensus change that makes previously valid behavior invalid under new rules.
- **Consensus:** The shared validation rules independently enforced by Bitcoin nodes.
- **BIP:** A Bitcoin Improvement Proposal that documents a proposed standard, process, or protocol change.
- **Validation:** The process of checking transactions and blocks against applicable rules.
- **Protocol:** A defined set of rules and message formats that allows independent participants or software systems to interact consistently.
- **Node:** Bitcoin software that communicates with peers and may validate, relay, store, or serve network data.
- **Proof of work:** The computational process miners use to produce block hashes below the network target.

## 4. Sources

1. **BIP 9: Version bits with timeout and delay**  
   Author or publisher: Pieter Wuille, Peter Todd, Gregory Maxwell, and Rusty Russell  
   URL: https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki  
   Supports: Versionbits deployment states, signaling periods, thresholds, lock-in, activation delay, and timeout behavior.

2. **BIP 8: Version bits with lock-in by height**  
   Author or publisher: Shaolin Fry and Luke Dashjr  
   URL: https://github.com/bitcoin/bips/blob/master/bip-0008.mediawiki  
   Supports: Height-based versionbits parameters, lock-in-on-timeout behavior, and alternative soft-fork activation tradeoffs.

3. **BIP 16: Pay to Script Hash**  
   Author or publisher: Gavin Andresen  
   URL: https://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki  
   Supports: P2SH validation rules, miner readiness signaling, and the scheduled April 1, 2012 enforcement transition.

4. **BIP 68: Relative lock-time using consensus-enforced sequence numbers**  
   Author or publisher: Mark Friedenbach, BtcDrak, Nicolas Dorier, and kinoshitajona  
   URL: https://github.com/bitcoin/bips/blob/master/bip-0068.mediawiki  
   Supports: Consensus-enforced relative locktime semantics for transaction sequence fields and coordinated deployment with BIPs 112 and 113.

5. **BIP 112: CHECKSEQUENCEVERIFY**  
   Author or publisher: BtcDrak, Mark Friedenbach, and Eric Lombrozo  
   URL: https://github.com/bitcoin/bips/blob/master/bip-0112.mediawiki  
   Supports: CHECKSEQUENCEVERIFY semantics and simultaneous deployment with BIPs 68 and 113.

6. **BIP 113: Median time-past as endpoint for lock-time calculations**  
   Author or publisher: Thomas Kerin and Mark Friedenbach  
   URL: https://github.com/bitcoin/bips/blob/master/bip-0113.mediawiki  
   Supports: Median-time-past locktime evaluation and simultaneous deployment with BIPs 68 and 112.

7. **BIP 34: Block v2, height in coinbase**  
   Author or publisher: Gavin Andresen  
   URL: https://github.com/bitcoin/bips/blob/master/bip-0034.mediawiki  
   Supports: Coinbase-height enforcement, block-version signaling, threshold-based activation, and rejection of older-version blocks.

8. **BIP 65: OP_CHECKLOCKTIMEVERIFY**  
   Author or publisher: Peter Todd  
   URL: https://github.com/bitcoin/bips/blob/master/bip-0065.mediawiki  
   Supports: A deployed script-rule soft fork and its historical version-based activation method.

9. **BIP 66: Strict DER signatures**  
   Author or publisher: Pieter Wuille  
   URL: https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki  
   Supports: Stricter signature encoding as a soft fork and its version-based deployment.

10. **BIP 141: Segregated Witness**  
    Author or publisher: Eric Lombrozo, Johnson Lau, and Pieter Wuille  
    URL: https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki  
    Supports: Witness programs, witness commitments, block weight, backward-compatibility limits, and BIP 9 deployment parameters.

11. **BIP 143: Transaction signature verification for version 0 witness program**  
    Author or publisher: Johnson Lau and Pieter Wuille  
    URL: https://github.com/bitcoin/bips/blob/master/bip-0143.mediawiki  
    Supports: The SegWit version 0 signature-hash rules deployed with the witness consensus changes.

12. **BIP 147: Dealing with dummy stack element malleability**  
    Author or publisher: Johnson Lau  
    URL: https://github.com/bitcoin/bips/blob/master/bip-0147.mediawiki  
    Supports: The NULLDUMMY consensus rule deployed with SegWit.

13. **BIP 341: Taproot**  
    Author or publisher: Pieter Wuille, Jonas Nick, and Anthony Towns  
    URL: https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki  
    Supports: Taproot consensus rules, modified versionbits deployment, 90 percent threshold, minimum activation height, activation at block 709,632, and old-node validation limits.

14. **BIP 342: Tapscript**  
    Author or publisher: Pieter Wuille, Jonas Nick, and Anthony Towns  
    URL: https://github.com/bitcoin/bips/blob/master/bip-0342.mediawiki  
    Supports: Tapscript validation rules deployed with Taproot.

15. **Bitcoin Core script verification interface**  
    Author or publisher: Bitcoin Core contributors  
    URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/script/interpreter.h  
    Supports: Script-verification flags and the explicit subset relationship intended for soft-fork restrictions.

16. **Bitcoin Core mainnet consensus parameters**  
    Author or publisher: Bitcoin Core contributors  
    URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/kernel/chainparams.cpp  
    Supports: Buried mainnet activation heights for BIP 34, BIP 65, BIP 66, CSV, and SegWit, plus deployment parameters used by current code.

17. **Bitcoin Core implemented BIPs documentation**  
    Author or publisher: Bitcoin Core contributors  
    URL: https://github.com/bitcoin/bitcoin/blob/v31.0/doc/bips.md  
    Supports: Bitcoin Core implementation history for BIP 9, BIP 16, BIP 34, BIP 65, BIP 66, SegWit, Taproot, and buried deployments.

18. **Bitcoin Core versionbits implementation**  
    Author or publisher: Bitcoin Core contributors  
    URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/versionbits.cpp  
    Supports: Current threshold-state calculations and deployment-state transitions.

## 5. SEO title

How Bitcoin Soft Forks Work: Rules and Activation

## 6. Meta description

Learn how Bitcoin soft forks restrict valid blocks, preserve limited old-node compatibility, use activation mechanisms, and introduce real coordination risks.

## 7. Page excerpt

Bitcoin soft forks add stricter consensus rules while keeping new-valid blocks acceptable to older nodes. See how signaling, lock-in, activation, and enforcement differ.

## 8. Estimated reading time

16 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Parent hub: MSC-HUB-NETWORK | The Bitcoin Network
- Primary path: MSC-PATH-NETWORK | Understand the Network
- Secondary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite: MSC-GUIDE-030 | How Bitcoin Reaches Consensus
- Previous guide: MSC-GUIDE-030 | How Bitcoin Reaches Consensus
- Next guide: MSC-GUIDE-032 | How Bitcoin Network Upgrades Happen
- Branch guide: MSC-GUIDE-032 | How Bitcoin Network Upgrades Happen
- Recommended continuation: MSC-GUIDE-032 | How Bitcoin Network Upgrades Happen
- Related guide: MSC-GUIDE-021 | What Is a Bitcoin Full Node?
- Related guide: MSC-GUIDE-024 | Bitcoin Node Software Explained
- Related guide: MSC-GUIDE-029 | How Bitcoin Proof of Work Secures the Network
- Related guide: MSC-GUIDE-053 | How Bitcoin Improvement Proposals Work
- Glossary: MSC-GLOSSARY-001 | Bitcoin Glossary

## 10. Accuracy review checklist

- [x] Registry metadata and navigation relationships match the approved registry.
- [x] A soft fork is defined through a validity-set subset relationship.
- [x] Old-node block acceptance is not described as enforcement of the new rules.
- [x] Backward compatibility is limited to consensus validity and does not promise full wallet or service compatibility.
- [x] Proposal, specification, implementation, release, signaling, lock-in, activation, and enforcement remain distinct.
- [x] Miner signaling is not described as a universal governance vote.
- [x] BIP 9 states and period-boundary behavior are described without treating signaling as block validity.
- [x] BIP 34, BIP 65, BIP 66, SegWit, and Taproot examples are tied to primary specifications and current Bitcoin Core records.
- [x] Taproot's mainnet threshold and minimum activation height are stated precisely.
- [x] Soft forks are not described as automatically safe or operationally compatible.
- [x] Hard-fork comparison follows validity-set direction rather than political labels.
- [x] No current proposal is described as activated merely because a BIP exists.
- [x] No investment advice or software-upgrade command appears.
- [x] Exact approved glossary definitions are used.
- [x] Planned internal links contain no live URLs.
- [x] No em dash or en dash character appears.

## 11. Human verification

- Reviewer:
- Review date:
- Notes:
  - Recheck BIP 9, BIP 8, historical version-threshold, SegWit, and Taproot deployment descriptions immediately before copy lock.
  - Confirm current Bitcoin Core v31.0 buried deployment heights and versionbits implementation paths.
  - Recheck old-node compatibility wording so acceptance, understanding, and enforcement remain distinct.
  - Confirm all activation examples separate signaling, lock-in, activation, and actual block validation.
  - Confirm exact glossary-definition synchronization.
  - Recheck every source URL and BIP status immediately before publication.
  - Keep planned internal links inactive until real destination pages and confirmed URLs exist.

## 12. Illustration brief

### Illustration 1

- Concept title: The Soft-Fork Validity Subset
- Educational purpose: Show the old valid-block set and the smaller new valid-block set.
- Recommended placement: After the section titled A soft fork narrows the valid set.
- Visual description: Vintage navigation chart with one large outlined field labeled Old rules accept and a smaller field entirely inside it labeled New rules accept. Blocks inside the smaller field are accepted by both. Blocks in the outer-only region are rejected by upgraded nodes.
- Required labels: Old valid set, New valid subset, Accepted by old and upgraded nodes, Accepted only by old nodes, Rejected by upgraded nodes
- Caption: A soft fork restricts validity so every new-valid block remains inside the set older nodes already accepted.
- Alt text: Set diagram showing the smaller new Bitcoin valid-block set inside the larger old valid-block set.
- Image orientation: Landscape
- Mobile crop notes: Center the nested sets and keep all acceptance labels inside the crop.
- Status: PLANNED

### Illustration 2

- Concept title: From Proposal to Enforcement
- Educational purpose: Separate the stages of a consensus upgrade.
- Recommended placement: After the section titled A proposal is not an activated rule.
- Visual description: Old field-guide route with stations for discussion, BIP, implementation, review and testing, release, adoption, signaling, lock-in, activation, and enforcement. Use distinct symbols for documentation, software, deployment state, and node validation.
- Required labels: Discussion, BIP, Implementation, Review, Testing, Release, Adoption, Signaling, Lock-in, Activation, Enforcement
- Caption: A soft-fork proposal becomes an enforced rule only after specification, implementation, adoption, activation, and node validation.
- Alt text: Process diagram showing a Bitcoin soft fork moving from discussion and BIP specification through code, testing, release, signaling, activation, and enforcement.
- Image orientation: Landscape
- Mobile crop notes: Use a vertical route with one station per row and keep signaling separate from enforcement.
- Status: PLANNED

### Illustration 3

- Concept title: Old Nodes Follow Without Full Verification
- Educational purpose: Show how upgraded and old nodes evaluate the same new-rule transaction differently.
- Recommended placement: After the section titled Soft forks do not make old nodes enforce new meaning.
- Visual description: Dual-node inspection plate. An upgraded node opens a new witness-program compartment and checks the added spending rules. An old node sees the same compartment as permissive and accepts the containing block without performing the new checks.
- Required labels: New transaction form, Upgraded node, New validation rules, Old node, Permissive old interpretation, Same accepted block, Different verification depth
- Caption: Older nodes may accept soft-fork blocks while upgraded nodes perform additional consensus checks the old software does not understand.
- Alt text: Comparison diagram showing an upgraded Bitcoin node enforcing new witness rules while an old node accepts the same block without performing those checks.
- Image orientation: Landscape
- Mobile crop notes: Stack upgraded-node verification above old-node acceptance and keep the shared block centered.
- Status: PLANNED