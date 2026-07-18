---
registry_id: MSC-GUIDE-017
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: How Bitcoin Mining Works
handle: how-bitcoin-mining-works
category: The Bitcoin Network
subcategory: Mining
depth: Shallow
format: Explainer
primary_path: Understand the Network
secondary_paths:
  - Explore the Ecosystem
  - Build on Bitcoin
author_display: Mempool Surf Club Editorial
reviewed_date: null
copy_locked_date: null
---

# How Bitcoin Mining Works

## 1. Introductory deck

Bitcoin mining constructs candidate blocks and searches for proof of work that satisfies the network target. Mining helps order valid transactions and extend the chain, while independently operated nodes decide whether a found block and every transaction inside it follow the consensus rules.

## 2. Full article

Bitcoin mining is often reduced to a picture of machines racing to solve a puzzle. That image captures the competition, but it hides the actual workflow.

Mining brings together several distinct jobs. Software gathers transaction information, constructs a candidate block, creates a coinbase transaction, and prepares a block header. Hashing hardware repeatedly evaluates versions of that header. When a result satisfies the target, the block is broadcast. Nodes then validate the block independently.

The miner proposes the next block. The network does not accept that proposal merely because energy was spent producing it.

### Mining begins with a candidate block

A candidate block is a proposed batch of transactions linked to the current chain tip.

A block assembler may begin with transactions available in a node's local mempool. That mempool is not a universal network queue. Different nodes receive transactions at different times, apply different policy settings, and may store different sets of unconfirmed transactions.

A mining operator can also receive valid transactions through direct submission, private relay, or another permitted source. A transaction absent from one public node's mempool can still be included in a valid block if it satisfies the consensus rules and all required dependencies are available.

Block construction therefore starts from the operator's available information, not from one official list maintained by the protocol.

### Transaction selection follows several constraints

A block assembler chooses transactions subject to more than one consideration.

Every included transaction must be valid in the candidate block's context. Inputs must refer to spendable outputs, required scripts and signatures must verify, locktime and sequence conditions must be satisfied, and dependencies must appear in a usable order. The completed block must also respect weight, signature-operation, and other consensus limits.

Fees matter because the miner can claim transaction fees from included transactions. Selection can also reflect ancestor and descendant relationships, operator policy, direct agreements, block-template software, transaction ordering preferences, or a decision to leave some block space unused.

Bitcoin Core's block assembler normally works from its local mempool and evaluates groups of related transactions under configured limits and fee settings. Other mining systems can construct templates differently. Bitcoin does not require every miner to use one implementation or identical transaction-selection policy.

### The coinbase transaction comes first

The first transaction in a valid block is the coinbase transaction.

Its input does not spend a previous UTXO. Instead, the coinbase transaction can create outputs whose total value is no greater than the permitted block subsidy plus the transaction fees available from the other transactions in the block.

The subsidy and fees are separate components. The subsidy creates new bitcoin under the issuance schedule. Fees are existing input value not reassigned to ordinary transaction outputs.

A miner may claim less than the maximum allowed amount, but claiming more makes the block invalid to nodes enforcing the rule. Proof of work cannot repair an excessive coinbase claim.

Coinbase outputs also have a consensus maturity requirement. They cannot be spent until a transaction using them appears in a block whose height is at least 100 greater than the height of the block that created them. A reorganization can change active-chain depth and therefore change whether a wallet currently treats a coinbase output as mature.

### The transaction set produces a Merkle root

The candidate block's transactions are organized into a Merkle tree. The Merkle root is a compact commitment to the transaction set inside the block.

If any transaction changes, the Merkle root changes. The coinbase transaction is part of that set, so changing coinbase data also produces a different Merkle root.

This property is useful for mining. The 32-bit nonce field in the block header provides a limited search space. High-speed hardware can exhaust that space quickly. Mining software can change data in the coinbase transaction, including an extranonce area used by many mining systems, rebuild the Merkle root, and create a fresh range of candidate headers.

Changing the selected transactions can do the same. The candidate block remains subject to all block-validity rules after each change.

### The block header has six serialized fields

Bitcoin proof of work is performed over the serialized 80-byte block header.

The header contains six fields:

1. A version field.
2. The hash of the previous block header.
3. The Merkle root committing to the transaction set.
4. A timestamp field.
5. The proof-of-work target encoded in compact `nBits` form.
6. A nonce.

The previous-block hash links the candidate to prior chain history. The Merkle root commits to the block's transactions. The timestamp must satisfy applicable constraints. The compact target tells nodes which proof-of-work threshold applies. Version bits can communicate defined software or deployment information. The nonce is one value miners can vary during the search.

The header does not contain full transaction data, but its Merkle root binds the proof-of-work search to that candidate transaction set.

### Mining hashes the header twice with SHA-256

Bitcoin proof of work applies SHA-256 twice to the serialized block header.

Mining hardware repeatedly evaluates candidate headers and compares the resulting 256-bit hash with the applicable network target. A valid result is numerically less than or equal to that target.

The hash does not decrypt transactions, approve ownership, or solve an equation with a reusable shortcut. For mining purposes, small changes to the header produce results that behave unpredictably. A miner cannot look at one failed result and learn which nearby nonce is closer to success.

Failed attempts do not accumulate partial progress toward a future valid hash. Each candidate either satisfies the target or it does not.

The work is easy for a node to verify after the fact. A node hashes the header and checks the result against the target. Producing a valid result may require an enormous number of attempts, but verifying that one result is straightforward.

### Miners search more than the nonce field

The nonce is the most visible changing field, but it is not the only available source of search space.

Mining systems may vary:

- The nonce.
- Extranonce data in the coinbase transaction.
- Permitted timestamp values.
- Version-related fields where allowed.
- The transaction set or ordering.
- Other coinbase data that remains valid.

Changing coinbase data changes the coinbase transaction identifier and Merkle root. That creates a different header even when the previous-block hash and other fields remain the same.

Pools and mining proxies often divide this larger search space among many devices so they are less likely to duplicate work. Solo miners can use similar techniques through their own software stack.

The exact work-distribution design belongs to the mining system. Bitcoin consensus cares about the resulting block and header, not the internal method used to assign candidate hashes.

### Block discovery is probabilistic

A valid hash can appear on the first attempt or after a long run of failures.

If a miner controls a given share of the total hashing work being applied to the network, its expected share of discovered blocks over a sufficiently long period is related to that hashrate share. Short periods can vary widely.

A miner with one percent of estimated network hashrate is not promised exactly one percent of blocks in each day, week, or difficulty period. Random variation can produce streaks and dry periods.

No individual miner receives a scheduled block time. Bitcoin targets an average block interval across the network over time. Actual block arrivals remain irregular.

This variance is one reason mining pools exist. Pools coordinate work and use internal accounting to distribute payouts more frequently than most small solo miners would discover blocks on their own. Pooling changes payout variance and dependencies. It does not change Bitcoin's block-validity rules.

### Hashrate is estimated, not read from a global meter

Hashrate describes the rate of proof-of-work hash attempts.

An individual device can report its own measured or configured rate. Network hashrate is different. Bitcoin does not contain one global meter that counts every attempt performed by every miner.

Software estimates network hashrate from observed blocks, their proof-of-work requirements, and elapsed time. The estimate depends on the observation window and the irregular timing of block discovery. Short windows can be noisy. Longer windows smooth more variation but respond more slowly to change.

The estimate also does not reveal exactly how many machines, owners, facilities, or geographic locations produced the work. Different hardware can contribute different rates, and operational arrangements can separate equipment ownership from pool or template coordination.

### A found block is a proposal

When a miner finds a header hash satisfying the target, the mining system assembles and broadcasts the corresponding full block.

Peers do not accept it automatically. A validating node checks matters such as:

- The proof-of-work target and header hash.
- The required target for that height.
- The link to known prior chain state.
- The Merkle root and transaction commitments.
- Block weight and structure.
- Every included transaction.
- Input availability and spending conditions.
- The coinbase amount and maturity-related rules.
- Applicable consensus deployments and script rules.

If any required rule fails, the node rejects the block. More proof of work cannot make an invalid block valid to that node.

A node only activates a candidate chain after validating the required blocks. Among valid candidate chains, accumulated proof of work guides chain selection under that node's rules. Mining contributes to chain ordering, but it does not give miners unilateral authority to redefine validity.

### Mining is not transaction approval

Mining affects when valid transactions may be included and how chain history is extended.

It does not establish a person's legal ownership. It does not make an invalid signature valid. It does not permit miners to create arbitrary bitcoin. It does not encrypt transaction contents.

A miner can omit a valid transaction from one candidate block. Another miner may include it later. A miner can receive a transaction through a route other nodes did not see. That flexibility exists inside the boundary of block validity.

Mining is therefore best understood as competitive block production under rules that nodes independently enforce.

### Hardware, software, pools, and nodes have separate roles

A mining operation can contain several components.

A full node validates chain and transaction data and can provide a candidate template. Block-assembly software chooses valid transactions and creates the coinbase and header fields. A pool coordinator may distribute jobs and account for contributed work. ASIC hardware performs high-rate header hashing.

One machine or software package can combine several roles, but the roles remain conceptually distinct.

An ASIC miner does not replace a full node merely because it produces hashes. A pool is not the Bitcoin consensus system merely because it coordinates substantial work. A node is not a hashing device merely because it can prepare a block template.

Separating the roles makes concentration and failure questions more precise. Hardware ownership, pool coordination, transaction-template control, node validation, and payout dependence are different dimensions.

### Mining uses energy and produces heat

Hashing hardware consumes electrical energy. Almost all of the electrical power used by the equipment ultimately becomes heat that must be handled by the operating site.

The source of electricity, machine efficiency, cooling design, climate, utilization, curtailment, transmission conditions, and supporting infrastructure vary. Those differences affect cost and environmental outcomes.

It is inaccurate to claim that all Bitcoin mining uses one energy source or creates one universal environmental result. It is equally inaccurate to discuss hashrate as if it required no physical resources.

A responsible analysis states what is being measured, identifies system boundaries, and separates energy use from claims about emissions or benefits that require additional evidence.

### Difficulty adjustment and halving are separate

If aggregate hashing conditions change, block intervals may become shorter or longer before the next difficulty boundary.

Bitcoin's difficulty adjustment later changes the proof-of-work target under its own consensus rules. The adjustment does not continuously poll miners or guarantee exact ten-minute blocks.

The halving is different. It changes the permitted block subsidy at 210,000-block intervals. It does not directly change the proof-of-work target.

Mining economics can respond to both mechanisms, along with fees, energy costs, hardware efficiency, and market conditions. Bitcoin does not guarantee a particular miner's profitability or response.

### Solo and pooled mining use the same validity rules

A solo miner coordinates its own template construction, hashing, and block submission. A pooled miner contributes work through a coordination and payout system.

The payout experience can be very different. Solo discovery is highly variable for a small miner. A pool can distribute revenue according to submitted shares and its chosen payout rules.

The network-facing block must satisfy the same consensus rules either way. Nodes do not validate a block differently because it came from a pool, a company, or a solo operator.

The next guide explains how mining pools assign work, measure shares, submit blocks, and distribute payout risk without becoming Bitcoin consensus authorities.

## 3. Key Terms

**Mining:** The proof-of-work process that orders valid transactions into blocks and competes to extend the Bitcoin chain.

**Miner:** An operator that constructs candidate blocks and performs proof of work.

**Proof of work:** The computational process miners use to produce block hashes below the network target.

**Block:** A valid batch of Bitcoin transactions linked to prior chain history through proof of work.

**Block subsidy:** New bitcoin created under the issuance schedule and paid through a block's coinbase transaction.

**Transaction fee:** The input value not reassigned to transaction outputs and available to the block's miner.

**Hashrate:** An estimate of the total proof-of-work computation being applied to Bitcoin mining.

**Node:** Bitcoin software that communicates with peers and may validate, relay, store, or serve network data.

**Validation:** The process of checking transactions and blocks against applicable rules.

**Mempool:** A node's local collection of valid unconfirmed transactions eligible for relay or block inclusion.

**Energy use:** The amount and source of energy consumed by Bitcoin mining and its supporting operations.

**Difficulty adjustment:** Bitcoin's periodic recalculation of mining difficulty based on prior block timing.

## 4. Sources

### Bitcoin: A Peer-to-Peer Electronic Cash System

- Author or publisher: Satoshi Nakamoto
- Direct URL: https://bitcoin.org/bitcoin.pdf
- Supports: Bitcoin's proof-of-work chain, incentive model, transaction ordering, probabilistic block discovery, and broad difficulty-adjustment purpose.

### Bitcoin Developer Guide: Mining

- Author or publisher: Bitcoin Project developer documentation
- Direct URL: https://developer.bitcoin.org/devguide/mining.html
- Supports: Candidate-block construction, coinbase creation, Merkle-root updates, block-header hashing, extranonce use, and block submission.

### Bitcoin Developer Guide: Block Chain

- Author or publisher: Bitcoin Project developer documentation
- Direct URL: https://developer.bitcoin.org/devguide/block_chain.html
- Supports: Block structure, proof of work, Merkle commitments, node validation, chain selection, block subsidies, fees, and coinbase maturity context.

### Bitcoin Core Block Assembler

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/node/miner.cpp
- Supports: Current Bitcoin Core candidate-block assembly, mempool transaction selection, coinbase construction, subsidy-plus-fee calculation, header preparation, and pre-submission validity testing.

### Bitcoin Core Mining Interface

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/node/miner.h
- Supports: Current interfaces and structures separating block creation, coinbase data, block templates, and mining options.

### Bitcoin Core Mining RPC

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/rpc/mining.cpp
- Supports: Current getblocktemplate, submitblock, generate, and network-hashrate estimation behavior exposed by Bitcoin Core mining RPCs.

### Bitcoin Core Block Header

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/primitives/block.h
- Supports: The serialized block-header fields: version, previous-block hash, Merkle root, time, compact target, and nonce.

### Bitcoin Core Proof of Work

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/pow.cpp
- Supports: Target derivation from compact `nBits`, proof-of-work comparison, difficulty-boundary behavior, and network-specific proof-of-work rules.

### Bitcoin Core Block Validation

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/validation.cpp
- Supports: Independent block and transaction validation, coinbase value checks, chain-state connection, and rejection of invalid blocks.

### Bitcoin Core Consensus Constants

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/consensus/consensus.h
- Supports: The 100-block coinbase maturity constant and core block-weight and consensus limits.

### FIPS 180-4: Secure Hash Standard

- Author or publisher: National Institute of Standards and Technology
- Direct URL: https://doi.org/10.6028/NIST.FIPS.180-4
- Supports: The SHA-256 algorithm and fixed-length digest behavior used in Bitcoin's double-SHA-256 block-header hashing.

## 5. SEO title

How Bitcoin Mining Works: Blocks, Hashing, and Validation

## 6. Meta description

Learn how Bitcoin miners build candidate blocks, hash 80-byte headers, search for proof of work, submit found blocks, and remain subject to independent node validation.

## 7. Page excerpt

Bitcoin mining combines candidate-block construction with a probabilistic proof-of-work search. This guide separates transaction selection, coinbase rewards, block headers, ASIC hashing, pool coordination, and node validation.

## 8. Estimated reading time

11 to 13 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- MSC-GUIDE-016 | Bitcoin Best Practices for Safe Everyday Use
- MSC-GUIDE-018 | How Bitcoin Mining Pools Work
- MSC-GUIDE-020 | How Bitcoin's Difficulty Adjustment Works
- MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
- MSC-GUIDE-014 | How Bitcoin Confirmations Work
- MSC-GUIDE-015 | What Is the Bitcoin Halving?
- MSC-GUIDE-019 | What Is an ASIC Miner?
- MSC-GUIDE-021 | What Is a Bitcoin Full Node?
- MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?
- MSC-GUIDE-026 | How Bitcoin Blocks Work
- MSC-GUIDE-028 | What Is Bitcoin Hashrate?
- MSC-GUIDE-029 | How Bitcoin Proof of Work Secures the Network
- MSC-GLOSSARY-001 | Bitcoin Glossary
- MSC-HUB-NETWORK | The Bitcoin Network
- MSC-PATH-NETWORK | Understand the Network
- MSC-PATH-ECOSYSTEM | Explore the Ecosystem
- MSC-PATH-BUILD | Build on Bitcoin

## 10. Accuracy review checklist

- [x] Registry metadata and navigation relationships match the approved registry.
- [x] Mining is not described as solving or encrypting transactions.
- [x] Mempools are described as node-local rather than one universal queue.
- [x] Candidate-block construction, hashing, pool coordination, and validation remain distinct.
- [x] The coinbase amount is limited to the permitted subsidy plus available transaction fees.
- [x] Subsidy and transaction fees remain separate.
- [x] Coinbase maturity is stated as the 100-block consensus requirement.
- [x] The six serialized block-header fields and 80-byte size are described accurately.
- [x] Proof of work uses double SHA-256 and a hash less than or equal to the target.
- [x] Failed hashes are not described as partial progress.
- [x] Nodes independently validate found blocks and reject invalid ones regardless of work.
- [x] Hashrate is described as an estimate rather than a globally measured counter.
- [x] Energy claims preserve differences in source, efficiency, cooling, and operating conditions.
- [x] ASIC hardware is not described as a full node.
- [x] Difficulty adjustment is separated from subsidy halving.
- [x] No profitability promise, product recommendation, price prediction, or universal environmental claim appears.
- [x] Exact approved glossary definitions are used.
- [x] Planned internal links contain no live URLs.
- [x] No em dash or en dash character appears.

## 11. Human verification

- Reviewer:
- Review date:
- Notes:
  - Recheck current Bitcoin Core block-assembly paths in `src/node/miner.cpp`, `src/node/miner.h`, and `src/rpc/mining.cpp`.
  - Confirm current block-header and proof-of-work terminology, including 80-byte serialization and double SHA-256.
  - Confirm coinbase maturity, subsidy-plus-fee, and coinbase-value wording against current consensus and validation code.
  - Recheck energy-use and network-hashrate claims, including system boundaries and estimation language.
  - Confirm exact glossary-definition synchronization.
  - Recheck every source URL, especially moving Bitcoin Core master-branch paths, immediately before publication.
  - Keep planned internal links inactive until real destination pages and confirmed URLs exist.

## 12. Illustration brief

### Illustration 1

- Concept title: From Transaction Flow to Validated Block
- Educational purpose: Show the complete mining path without collapsing mempool acceptance, template construction, hashing, and node validation into one step.
- Recommended placement: After the section titled A found block is a proposal.
- Visual description: Old technical field-guide flow on Paper. Several node-local mempool boxes feed a candidate-block assembler. The candidate block passes to a proof-of-work search field and then to a peer network of validating nodes. Include a rejection branch for an invalid block.
- Required labels: Node-local mempool, Candidate block, Coinbase transaction, Proof-of-work search, Found block, Independent node validation, Accept or reject
- Caption: Mining proposes a block through proof of work, while nodes independently decide whether the block and its transactions are valid.
- Alt text: Editorial flow diagram showing local mempools feeding candidate-block construction, a proof-of-work search, block broadcast, and independent node validation.
- Image orientation: Landscape
- Mobile crop notes: Stack the four major stages vertically and keep the accept-or-reject node decision inside the center crop.
- Status: PLANNED

### Illustration 2

- Concept title: The 80-Byte Search Header
- Educational purpose: Identify the six block-header fields and show how coinbase or transaction changes create new Merkle roots and search space.
- Recommended placement: After the section titled Miners search more than the nonce field.
- Visual description: Infrastructure-manual plate with six labeled header compartments. A side path starts at extranonce data inside the coinbase transaction, passes through the Merkle tree, and updates the Merkle-root compartment. Small loop arrows appear around nonce, time, and permitted version fields.
- Required labels: Version, Previous block hash, Merkle root, Time, nBits, Nonce, Coinbase extranonce, New search space
- Caption: Mining systems vary header fields and transaction commitments to create new candidate hashes while preserving block validity.
- Alt text: Technical diagram of the six Bitcoin block-header fields with a coinbase-extranonce path changing the Merkle root and opening new header-search space.
- Image orientation: Landscape
- Mobile crop notes: Keep the six fields in two rows of three and place the coinbase-to-Merkle path directly below them.
- Status: PLANNED

### Illustration 3

- Concept title: Mining Roles Are Separate
- Educational purpose: Distinguish node validation, block assembly, pool coordination, and ASIC hashing.
- Recommended placement: After the section titled Hardware, software, pools, and nodes have separate roles.
- Visual description: Calm navigation-chart role map with four separate stations connected by labeled data flows. The node supplies validated chain and transaction data. The assembler supplies a template. The pool coordinator distributes jobs and records shares. ASIC devices return hashes or shares. A found block returns to nodes for validation.
- Required labels: Full node, Block assembler, Pool coordinator, ASIC hashing device, Template, Mining job, Share, Found block, Validation
- Caption: A mining system can combine roles operationally, but template construction, job coordination, hashing, and consensus validation remain different functions.
- Alt text: Role map separating a full node, block assembler, pool coordinator, and ASIC hashing devices with arrows for templates, jobs, shares, found blocks, and validation.
- Image orientation: Square
- Mobile crop notes: Use a four-quadrant arrangement with the validating node and found-block return path kept central.
- Status: PLANNED
