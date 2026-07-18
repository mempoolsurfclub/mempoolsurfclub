---
registry_id: MSC-GUIDE-018
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: How Bitcoin Mining Pools Work
handle: bitcoin-mining-pools
category: The Bitcoin Network
subcategory: Mining
depth: Shallow
format: Explainer
primary_path: Understand the Network
secondary_paths:
  - Explore the Ecosystem
author_display: Mempool Surf Club Editorial
reviewed_date: null
copy_locked_date: null
---

# How Bitcoin Mining Pools Work

## 1. Introductory deck

A Bitcoin mining pool coordinates work from many independent mining devices or operators and distributes payouts under an internal accounting method. Pool shares estimate contributed work, but they are not Bitcoin transactions, confirmations, or partially valid network blocks.

## 2. Full article

Bitcoin block discovery is probabilistic. A miner can perform valid work for a long time without finding a network block, then find one unexpectedly.

For a small solo miner, that variance can make revenue extremely irregular. A mining pool changes the payout pattern by coordinating work from many participants and measuring their contributions with easier proof-of-work targets.

The pool does not fuse every machine into one physical computer. It operates a coordination and accounting system around many separate devices, farms, or operators.

### Pools reduce payout variance through coordination

A solo miner receives network block revenue only when its own mining system finds and successfully submits a valid block.

A pool gathers work from many participants. When the pool's coordinated work finds a valid block, the pool receives the block's coinbase outputs according to the template and later distributes internal payouts under its service rules.

Because the participants submit measurable work more frequently than the pool finds network blocks, the pool can estimate each participant's contribution over time. The payout method then determines how block-discovery variance, transaction fees, fees charged by the pool, and counterparty exposure are distributed.

Pooling does not remove randomness from block discovery. It changes how the financial results of that randomness are shared.

### A pool distributes mining jobs

A mining job contains enough information for downstream devices to search a defined area of candidate block-header space.

Under a common architecture, a pool or associated template provider constructs a candidate block or template. The pool creates job data derived from that template and assigns distinct search space through extranonce values, channel information, version rolling, time ranges, nonce space, or related methods.

Mining devices repeatedly hash their assigned candidates. They return results that meet the pool's submission threshold.

The devices remain physically and operationally separate. The pool coordinates what they work on and how their results are counted.

Other architectures divide these functions differently. A miner may create a template locally, use a proxy, declare a custom job through a compatible protocol, or submit work through an arrangement not described by one traditional pool pattern.

### Pool targets are easier than the network target

The Bitcoin network target defines the proof-of-work threshold a block header must satisfy to be valid.

A pool normally assigns an easier share target. That means a submitted hash can meet the pool threshold even though it does not meet the much harder Bitcoin network target.

The easier threshold produces frequent evidence that a device is performing work. The pool can use accepted shares to estimate contribution without waiting for each participant to find a full network block.

A share is an internal accounting signal. It is not:

- A Bitcoin transaction.
- A transaction confirmation.
- A partially valid block.
- A fractional ownership entry written to the blockchain.
- A consensus vote.

Most shares are never broadcast to the Bitcoin peer-to-peer network. They are messages between mining participants and the pool system.

### A share can also be a block solution

Every submitted share represents a hash result that met the pool threshold.

Occasionally, the same result also satisfies the harder Bitcoin network target. In that case, the corresponding candidate block can be submitted as a possible network block.

The pool or another authorized participant reconstructs the full block and broadcasts it to Bitcoin peers. Nodes then validate the block independently.

Meeting the pool target alone is not enough. Only a result satisfying the applicable Bitcoin target can provide proof of work for a network block.

Even then, the block must satisfy every other consensus rule. A pool share that exposes an invalid block template does not become valid because the hash is low enough.

### Shares estimate work statistically

Pools use accepted shares to estimate contributed hashrate over time.

If the share threshold corresponds to an expected amount of hashing work, the number and timing of shares provide a statistical estimate of a participant's rate. The estimate is noisy over short windows because share arrival is probabilistic.

A device can submit more or fewer shares than its long-run expectation during a short reporting period. Pool dashboards may smooth the estimate across different windows, and their labels or calculations may differ.

Reported hashrate should therefore be interpreted as an estimate based on observed share work, not a direct count of every attempted hash.

A local device reading, a pool-side share estimate, and a network-wide hashrate estimate measure related but different things.

### Rejected and stale shares need context

A pool may reject a submitted share for several reasons.

The hash may not satisfy the assigned target. The share may contain malformed or inconsistent job data. It may duplicate an earlier submission. A new chain tip or template may have made the old job stale. Network latency can delay submission. The pool may apply protocol, authorization, timing, or service rules.

The word stale usually refers to work tied to a job that is no longer current enough for the pool's accounting or block attempt. Exact treatment varies.

A rejected share does not necessarily mean the hashing device is broken. It also does not prove the pool behaved correctly. Diagnosis depends on the job, protocol, timing, logs, and operator rules.

Pool documentation should define how rejected, duplicate, invalid, and stale work affects accounting.

### Template construction and hashing are different functions

A candidate block template includes transaction data, a coinbase arrangement, the previous-block reference, the required target, and other information needed to construct a block.

Hashing devices do not necessarily choose that transaction set. Under many common pool arrangements, the pool or its template provider chooses transactions and constructs the work distributed to miners.

That pattern is not universal. Protocols can separate template provision, job declaration, job distribution, share submission, and block publication.

The important distinction is functional:

1. A node or template provider supplies validated chain and transaction information.
2. A block assembler chooses a valid candidate transaction set.
3. A pool or proxy divides search space and distributes jobs.
4. Devices perform hashes.
5. The pool accounts for submitted shares.
6. A valid network solution is assembled and broadcast.
7. Nodes validate the found block.

One company can operate several functions, but the functions should not be treated as identical.

### BIP 22 provides full block templates

BIP 22 defines the `getblocktemplate` RPC model for smart miners and proxies.

Instead of returning only a header, the server can provide the block structure and transaction information needed to construct a candidate. The client may support defined mutations or customization while remaining responsible for creating a valid block.

Bitcoin Core's current `getblocktemplate` implementation exposes template data, target and compact-target information, transaction dependencies, coinbase information, block limits, and proposal-validation behavior.

BIP 22 does not require every pool to use one exact architecture. It defines an interface that can support solo mining, proxies, pools, and other block-template consumers.

### BIP 23 adds pooled-mining extensions

BIP 23 defines optional extensions to BIP 22 for pooled mining.

Those extensions address matters such as long polling, share targets, work identifiers, coinbase mutation, abbreviated submissions, and other ways a pool server and mining client can coordinate.

A pool can implement different support levels or use another protocol. The existence of BIP 23 does not prove that every current pool uses all of its extensions.

The durable lesson is that pooled mining requires more than a block template. It needs a way to divide work, recognize participants, receive submissions, and account for results.

### Stratum implementations distribute work differently

The name Stratum is used for mining protocols that distribute jobs and receive share submissions.

Traditional Stratum V1 deployments are common, but implementation details have varied across pools and software. Claims about a particular message, extension, security property, or job format should be tied to the implementation or documentation being discussed.

Stratum V2 defines a newer set of specifications with separate concepts for the Mining Protocol, Template Distribution Protocol, and Job Declaration Protocol.

The Mining Protocol can be used alone in an arrangement where an upstream pool distributes work. Optional components can support template distribution and miner-declared custom jobs.

It is inaccurate to say that every Stratum V2 deployment lets each individual device choose transactions. Transaction selection requires the relevant optional roles and protocol support, along with an architecture that actually enables custom templates.

### Template control affects transaction selection

A party controlling the candidate template can influence which valid transactions it attempts to include.

It may choose fee-paying transactions from its mempool, include direct submissions, omit some transactions, apply policy filters, or construct an unusual but valid transaction set.

This influence does not make the template controller a consensus authority. Nodes validating the resulting block still enforce transaction validity, coinbase limits, proof of work, and all other consensus rules.

A pool cannot turn an invalid transaction into a valid one by assigning it to many devices. It cannot choose an easier network target and force nodes to accept the block.

Pool policy affects attempted block contents. Bitcoin consensus determines what nodes accept.

### Network revenue enters through the coinbase transaction

When a pool-coordinated block is accepted, the block's coinbase transaction pays the destinations encoded by the block template.

The permitted amount includes the block subsidy plus available transaction fees. The pool's internal accounting does not change that network rule.

Coinbase outputs have a 100-block maturity requirement before they can be spent in a later block. A reorganization can also affect whether the block remains in the active chain.

Internal pool payouts do not have to wait for each exact coinbase output to mature. Some payout methods may pay participants on another schedule and place maturity or block-luck risk on the pool operator. Other methods may wait for confirmed pool revenue or distribute only after a defined window.

These are service and accounting choices, not changes to the consensus maturity rule.

### Payout methods distribute variance differently

Mining pools use several families of payout methods.

Pay per share, or PPS, generally pays for accepted share work without making the participant wait for the pool to find a block. This can shift more short-term block-luck and maturity risk to the operator.

Full pay per share, often called FPPS, generally extends a PPS-style calculation to include an estimate or allocation for transaction fees. The exact fee calculation and timing are operator-specific.

Pay per last N shares, or PPLNS, generally distributes realized pool revenue across a defined window of recent shares. Participants retain more exposure to when the pool actually finds blocks.

Score-based methods weight shares using an operator-defined scoring system intended to manage timing or pool-hopping incentives.

These descriptions are general. Formulas, fee treatment, windows, reserves, thresholds, and terminology differ by operator. A reader should use the pool's current documentation for the actual contract.

### Pool terms create counterparty exposure

A pool can owe participants payouts even though Bitcoin nodes do not know those internal balances exist.

Participants depend on the pool to:

- Record accepted shares accurately.
- Apply the published payout method.
- Handle transaction-fee revenue as stated.
- Maintain reserves or liquidity where required.
- Secure payout systems.
- Apply fees and thresholds correctly.
- Remain available.
- Communicate rule changes.
- Pay on the stated schedule.

A pool can fail operationally, withhold payouts, reject work, change terms, or experience a security incident without causing a Bitcoin consensus failure.

This is why a share balance is a service claim. It is not a UTXO controlled directly by the participant unless and until a payout transaction creates one under the participant's spending conditions.

### Block luck changes short-term results

A pool with a known estimated share of network hashrate has an expected block-discovery rate over time. Actual discovery remains random.

A pool can find more blocks than expected during one period and fewer during another. This difference is often called pool luck.

Under methods tied closely to realized block revenue, participants feel more of that variation. Under PPS-style methods, the operator may absorb more of it and require sufficient fees, reserves, or risk management.

No payout method removes economic tradeoffs. It reallocates variance, timing, and counterparty risk among the operator and participants.

Past luck does not guarantee that the next period will reverse or continue.

### Pool concentration is not one measurement

A pool's share of recently observed blocks is often used as an estimate of coordinated hashrate.

That estimate does not prove the pool owns all participating hardware. Hashers may be independent companies, hosting customers, farms, or individuals that can redirect work.

At the same time, hardware independence does not erase coordination influence. A pool may control templates, job distribution, block submission, or participant payouts.

Concentration should therefore be separated into dimensions:

- Hardware ownership.
- Hashrate coordination.
- Template control.
- Job-distribution infrastructure.
- Block-publication paths.
- Payout dependency.
- Geographic and energy infrastructure.

One block-label chart cannot answer all of those questions.

### Switching pools can be possible but costly

Hashers can often redirect devices or proxies to another pool.

The practical friction can include configuration changes, network latency, payout thresholds, unpaid balances, contracts, firmware compatibility, monitoring systems, jurisdiction, and operational procedures.

A nominal ability to switch does not mean switching is instantaneous or costless. It does create an important boundary: coordinated hashrate may be more mobile than ownership of physical machines.

Protocol designs that support independent template construction can change another boundary, but only where deployed and operated correctly.

### Pools coordinate work, not consensus

A mining pool is a service and protocol arrangement.

It can choose which valid transactions to attempt, distribute jobs, measure shares, submit blocks, and administer payouts. It cannot make an invalid block valid to independent nodes.

Pool shares do not alter the blockchain. Pool dashboards do not set network difficulty. Pool payout rules do not change coinbase maturity. Pool policies do not become Bitcoin consensus simply because many miners use the service.

The next guide moves down one layer to the specialized hardware performing most Bitcoin proof-of-work hashing: the ASIC miner.

## 3. Key Terms

**Mining pool:** A coordination system that combines miners' work and distributes rewards under a payout method.

**Mining:** The proof-of-work process that orders valid transactions into blocks and competes to extend the Bitcoin chain.

**Miner:** An operator that constructs candidate blocks and performs proof of work.

**Hashrate:** An estimate of the total proof-of-work computation being applied to Bitcoin mining.

**Proof of work:** The computational process miners use to produce block hashes below the network target.

**Block:** A valid batch of Bitcoin transactions linked to prior chain history through proof of work.

**Block subsidy:** New bitcoin created under the issuance schedule and paid through a block's coinbase transaction.

**Transaction fee:** The input value not reassigned to transaction outputs and available to the block's miner.

**Node:** Bitcoin software that communicates with peers and may validate, relay, store, or serve network data.

**Validation:** The process of checking transactions and blocks against applicable rules.

## 4. Sources

### BIP 22: getblocktemplate Fundamentals

- Author or publisher: Luke Dashjr
- Direct URL: https://bips.dev/22/
- Supports: Full block-template delivery, template fields, transaction dependencies, compact target data, client customization, proposal mode, and block submission fundamentals.

### BIP 23: getblocktemplate Pooled Mining

- Author or publisher: Luke Dashjr
- Direct URL: https://bips.dev/23/
- Supports: Optional pooled-mining extensions for long polling, share targets, coinbase mutation, work identifiers, and abbreviated submissions.

### Bitcoin Core Mining RPC

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/rpc/mining.cpp
- Supports: Current Bitcoin Core `getblocktemplate`, template proposal, block submission, target, transaction, and network-hashrate RPC behavior.

### Bitcoin Core Block Assembler

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/node/miner.cpp
- Supports: Current Bitcoin Core transaction selection, dependency handling, block limits, coinbase construction, subsidy-plus-fee accounting, and candidate-header preparation.

### Stratum V2 Protocol Overview

- Author or publisher: Stratum V2 specification contributors
- Direct URL: https://stratumprotocol.org/specification/03-protocol-overview/
- Supports: Separation of the Mining, Job Declaration, and Template Distribution protocols and the optional roles used in different Stratum V2 architectures.

### Stratum V2 Mining Protocol

- Author or publisher: Stratum V2 specification contributors
- Direct URL: https://stratumprotocol.org/specification/05-mining-protocol/
- Supports: Mining-job distribution, standard and extended jobs, unique search-space assignment, share submission, and optional custom-job use.

### Stratum V2 Job Declaration Protocol

- Author or publisher: Stratum V2 specification contributors
- Direct URL: https://stratumprotocol.org/specification/06-job-declaration-protocol/
- Supports: Optional miner-side custom-template declaration, pool acknowledgment, job tokens, and the roles required for miner-selected transaction templates.

### Stratum V2 Template Distribution Protocol

- Author or publisher: Stratum V2 specification contributors
- Direct URL: https://stratumprotocol.org/specification/07-template-distribution-protocol/
- Supports: Template-provider communication, template identifiers, previous-block data, target information, and transaction-data exchange.

### Analysis of Bitcoin Pooled Mining Reward Systems

- Author or publisher: Meni Rosenfeld
- Direct URL: https://arxiv.org/abs/1112.4980
- Supports: Solo-mining variance, pooled-mining accounting, PPS, score-based, PPLNS, and the tradeoffs among reward-sharing systems.

### Bitcoin Core Consensus Constants

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/consensus/consensus.h
- Supports: The 100-block coinbase maturity rule that applies independently of a pool's internal payout schedule.

### Bitcoin: A Peer-to-Peer Electronic Cash System

- Author or publisher: Satoshi Nakamoto
- Direct URL: https://bitcoin.org/bitcoin.pdf
- Supports: Probabilistic proof-of-work discovery, network incentives, block subsidy and transaction-fee revenue, and independent verification context.

## 5. SEO title

How Bitcoin Mining Pools Work: Shares, Jobs, and Payouts

## 6. Meta description

Learn how Bitcoin mining pools distribute jobs, measure easier proof-of-work shares, submit possible blocks, and allocate payout variance without changing consensus rules.

## 7. Page excerpt

Bitcoin mining pools coordinate independent hashing devices and distribute payouts using internal share accounting. This guide explains pool targets, jobs, templates, payout methods, block luck, and template control.

## 8. Estimated reading time

11 to 13 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- MSC-GUIDE-017 | How Bitcoin Mining Works
- MSC-GUIDE-019 | What Is an ASIC Miner?
- MSC-GUIDE-028 | What Is Bitcoin Hashrate?
- MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- MSC-GUIDE-014 | How Bitcoin Confirmations Work
- MSC-GUIDE-015 | What Is the Bitcoin Halving?
- MSC-GUIDE-020 | How Bitcoin's Difficulty Adjustment Works
- MSC-GUIDE-026 | How Bitcoin Blocks Work
- MSC-GUIDE-029 | How Bitcoin Proof of Work Secures the Network
- MSC-GUIDE-071 | How Bitcoin Mining Companies Operate
- MSC-GLOSSARY-001 | Bitcoin Glossary
- MSC-HUB-NETWORK | The Bitcoin Network
- MSC-PATH-NETWORK | Understand the Network
- MSC-PATH-ECOSYSTEM | Explore the Ecosystem

## 10. Accuracy review checklist

- [x] Registry metadata and navigation relationships match the approved registry.
- [x] Pools are described as coordination and accounting systems rather than one physical computer.
- [x] Pool shares are not described as Bitcoin transactions, confirmations, votes, or partial blocks.
- [x] Pool targets are distinguished from the Bitcoin network target.
- [x] Share-based hashrate is described as a statistical estimate.
- [x] Template construction, job distribution, hashing, block submission, and payout accounting remain distinct.
- [x] BIP 22 and BIP 23 claims are limited to their documented interfaces and optional extensions.
- [x] Stratum V1 behavior is not generalized beyond implementation-sensitive claims.
- [x] Stratum V2 custom-template capabilities are not attributed to every deployment.
- [x] Coinbase maturity remains a network consensus rule independent of internal pool payout timing.
- [x] PPS, FPPS, PPLNS, and score-based methods are described generally without universal formulas.
- [x] Pool concentration is separated from hardware ownership.
- [x] Template control is separated from consensus validity.
- [x] No current pool ranking, market-share snapshot, or pool recommendation appears.
- [x] No profitability promise or price prediction appears.
- [x] Exact approved glossary definitions are used.
- [x] Planned internal links contain no live URLs.
- [x] No em dash or en dash character appears.

## 11. Human verification

- Reviewer:
- Review date:
- Notes:
  - Confirm current BIP 22 and BIP 23 wording, support levels, and optional-extension language.
  - Recheck current Stratum V2 Mining, Template Distribution, and Job Declaration specification behavior.
  - Verify every Stratum V1 claim against the exact implementation or authoritative documentation retained for publication.
  - Confirm pool-share, accepted-share, rejected-share, stale-share, and network-target terminology.
  - Recheck payout-method definitions and preserve operator-specific scope for every formula or service term.
  - Confirm template-control wording does not imply pool authority over consensus.
  - Confirm exact glossary-definition synchronization.
  - Recheck every source URL, especially moving Bitcoin Core and Stratum specification paths, immediately before publication.
  - Keep planned internal links inactive until real destination pages and confirmed URLs exist.

## 12. Illustration brief

### Illustration 1

- Concept title: Share Target and Network Target
- Educational purpose: Show why frequent pool shares measure contributed work without becoming partial Bitcoin blocks.
- Recommended placement: After the section titled A share can also be a block solution.
- Visual description: Oceanographic depth chart with a broad upper threshold labeled Pool share target and a much deeper line labeled Bitcoin network target. Many hash markers cross the pool line, while one rare marker reaches the network line. Keep both thresholds numeric-free.
- Required labels: Hash attempts, Pool share target, Accepted share, Bitcoin network target, Possible block solution
- Caption: A pool uses an easier target to measure work, while only a hash meeting the network target can provide proof of work for a Bitcoin block.
- Alt text: Depth-chart diagram showing many hashes meeting an easier pool target and one rare hash also meeting the harder Bitcoin network target.
- Image orientation: Landscape
- Mobile crop notes: Stack the two target lines vertically and keep the one network-level solution centered.
- Status: PLANNED

### Illustration 2

- Concept title: Pool Coordination Flow
- Educational purpose: Separate template creation, job distribution, device hashing, share accounting, and possible block submission.
- Recommended placement: After the section titled Template construction and hashing are different functions.
- Visual description: Infrastructure-manual flow with five stations: template provider, pool coordinator, mining proxy or devices, share accounting, and node network. Shares return to accounting. A network-target result follows a separate route to block broadcast and validation.
- Required labels: Block template, Mining job, Search space, Share submission, Pool accounting, Network solution, Block broadcast, Node validation
- Caption: Pools coordinate templates, jobs, and shares, while a network-level result still becomes a block only after independent node validation.
- Alt text: Technical flow diagram from a block template through pool job distribution and device hashing to share accounting, with a separate network-solution path to node validation.
- Image orientation: Landscape
- Mobile crop notes: Use a vertical flow and distinguish the routine share loop from the rare block-submission branch.
- Status: PLANNED

### Illustration 3

- Concept title: Payout Risk Moves Between Participants
- Educational purpose: Compare payout-method tradeoffs without ranking methods or presenting operator-specific formulas as universal.
- Recommended placement: After the section titled Block luck changes short-term results.
- Visual description: Calm field-guide balance chart with four unlabeled-to-ranked method cards: PPS, FPPS, PPLNS, and Score-based. Each card uses qualitative markers for timing, block-luck exposure, fee treatment dependency, operator reserve dependency, and accounting complexity.
- Required labels: PPS, FPPS, PPLNS, Score-based, Payout timing, Block-luck exposure, Operator dependency, Fee treatment, Method varies by pool
- Caption: Payout methods redistribute timing, variance, and counterparty risk, and their exact formulas depend on the pool operator.
- Alt text: Editorial comparison of PPS, FPPS, PPLNS, and score-based pool payouts across timing, luck exposure, operator dependency, fee treatment, and complexity.
- Image orientation: Square
- Mobile crop notes: Stack the four method cards and repeat the operator-specific warning at the bottom.
- Status: PLANNED
