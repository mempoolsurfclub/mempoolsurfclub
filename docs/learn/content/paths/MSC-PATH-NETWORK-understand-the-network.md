---
registry_id: MSC-PATH-NETWORK
status: COPY_LOCKED
page_role: learning-path
h1: Understand the Network
handle: understand-the-network
category: Not applicable. This is a cross-category learning route.
subcategory: Multiple canonical subcategories. The path does not own topic pages.
production_batch: "Phase 1.09: path skeleton; Finalize after Phase 9, then add cryptography branches after Phase 16."
author_display: Mempool Surf Club Editorial
reviewed_date: 2026-07-19
copy_locked_date: 2026-07-19
---

# Understand the Network

## 1. Introductory deck

Follow one systems-level route from UTXOs and transactions through local mempools, blocks, nodes, mining, proof of work, consensus, soft forks, and upgrades. The path sequences permanent destinations for learning without replacing their canonical navigation.

## 2. Full destination copy

Bitcoin network activity can look like one continuous event from a wallet screen. A user enters a destination and amount, approves a transaction, sees a pending label, and later sees confirmations. Underneath that interface, several independent systems have performed different jobs.

This path is designed to reveal those jobs in a useful order.

It begins with UTXOs because Bitcoin does not move protocol-level account balances. Transactions consume specific existing outputs and create new outputs. That model explains input selection, change, fees, conflicts, and the state that validating nodes maintain.

The path then follows transaction construction and fee mechanics into a complete featured walkthrough. MSC-ROUTE-001 | How a Bitcoin Transaction Moves acts as the first synthesis point. It connects wallet construction, signatures, local checks, peer relay, node-local mempools, mining templates, candidate blocks, proof of work, validation, chain selection, confirmations, and UTXO-set updates.

After the walkthrough, the path slows down and studies the middle of that lifecycle in detail.

### Stage 1: Transaction foundations

The first stage establishes the data model. UTXOs are discrete spendable outputs. A transaction references existing outputs as inputs and creates new recipient and change outputs. The fee is value not reassigned to outputs, and practical fee competition depends on transaction weight, fee rate, dependencies, and current demand rather than the amount transferred.

The featured route appears here because readers now have enough vocabulary to follow one transaction through the complete system. It remains a standalone destination, not a replacement for the canonical guides that support it.

### Stage 2: From relay to blocks

A signed transaction may be submitted to one or more nodes. Each receiving node evaluates it independently. If it passes the relevant checks and local policy, that node may store it in its own mempool and may relay it to peers. Another node may reach a different policy result or may never receive the transaction.

There is no single global mempool and no central broadcast server. Broadcast does not guarantee universal relay, miner selection, confirmation, or finality.

Mining systems construct candidate blocks from valid transactions they know and choose to include. Blocks contain an 80-byte header, a transaction list beginning with a coinbase transaction, and commitments that nodes can verify. Proof of work qualifies the header for submission, while complete block validity still depends on transaction, UTXO, script, amount, commitment, and resource checks.

Confirmations then connect block inclusion to selected chain history. The first confirmation begins when the transaction appears in a valid block on a node's active chain. Later valid blocks add depth. A reorganization can change that state, so confirmations increase practical settlement assurance without creating absolute finality.

### Stage 3: Independent validation

The third stage moves from data flow to the systems that decide what data is acceptable.

A full node independently verifies blocks and transactions against consensus rules. It maintains chainstate, including the current UTXO set, and follows valid chain history selected by accumulated work. It does not need to be a miner, wallet, or archival server.

Pruning shows why validation and storage must be separated. A pruned full node checks historical blocks before deleting eligible old block files. It can enforce the same consensus rules as an archival node while offering fewer historical queries and rescans from local disk.

Running a node introduces practical choices about purpose, software, verified releases, hardware, storage, peers, RPC access, wallets, updates, monitoring, and recovery. The software comparison then adds implementation boundaries. Compatible implementations can agree on consensus while differing in policy, features, defaults, interfaces, and releases. Release-specific consensus settings require a separate review from ordinary mempool policy.

### Stage 4: Mining and proof of work

The path introduces proof-of-work security before the detailed mining workflow so readers know the role the work serves. Proof of work makes block production costly, keeps verification practical, and gives nodes a measurable way to compare valid competing histories. It does not validate signatures or permit an invalid block.

Mining then reveals the operational stack. A block assembler chooses a valid transaction set and creates a candidate. Pools may distribute jobs and track easier proof-of-work shares. ASIC machines perform high-rate header hashing. Hashrate measures or estimates attempts per second, while network hashrate is inferred from chainwork and observed block time. Difficulty is the target relationship that determines how hard a valid block hash is to find.

The difficulty adjustment closes the stage by showing how mainnet recalculates the target at 2,016-block boundaries. It reacts to prior block timing under a defined formula. It does not poll miners, promise exact ten-minute blocks, or guarantee miner profitability.

### Stage 5: Consensus and upgrades

The final stage explains why independent nodes can reach compatible results.

Consensus is the shared validation rule set. Nodes can have different peers, mempools, indexes, storage modes, wallets, and local policy while still agreeing on whether blocks are valid. Proof of work orders valid candidate histories. It does not replace consensus validation.

Soft forks introduce stricter validity conditions for upgraded nodes while preserving a subset relationship with older rules. Older nodes may accept blocks without understanding or enforcing the new restriction. That compatibility is limited and does not guarantee that old wallets, services, hardware, or mining systems remain operationally ready.

The upgrade history then separates proposal, BIP publication, implementation, review, testing, release, adoption, signaling, lock-in, activation, and enforcement. Developers, miners, companies, wallets, services, and node operators all influence coordination in different ways, but no single constituency updates every participant by decree.

### What completing the path should provide

A reader finishing this Phase 9 sequence should be able to trace an ordinary transaction through its major states and explain which system performs each check. The reader should also be able to distinguish local policy from consensus, mining from validation, chainwork from block count, and confirmation depth from absolute finality.

The path is educational sequencing. It does not own the guides or replace their permanent previous and next relationships. Every step remains a separate canonical destination. Planned actions must stay inactive until those destinations are published and their URLs are confirmed.

Readers missing the basic wallet, transaction, and confirmation model can branch to MSC-PATH-START | Start With Bitcoin. Readers focused on custody, recovery, and operational risk can branch to MSC-PATH-SAFE | Use Bitcoin Safely. After node software, consensus, or upgrades, readers preparing to work with higher-layer protocols and developer systems can branch to MSC-PATH-BUILD | Build on Bitcoin. After Phase 16, cryptography guides may become optional branches for readers who want to study signatures, hash functions, and Merkle trees in greater depth. They are not current required steps in this Phase 9 path.

## 3. Destination structure or sequence

### Stage 1: Transaction foundations

Steps 1 through 3 establish UTXOs, transactions, fees, and the featured transaction route.

### Stage 2: From relay to blocks

Steps 4 through 7 examine local mempools, block construction, confirmations, and selected blockchain history.

### Stage 3: Independent validation

Steps 8 through 11 cover full nodes, pruning, node operation, and node software.

### Stage 4: Mining and proof of work

Steps 12 through 17 connect proof-of-work security with mining, pools, ASIC hardware, hashrate, and difficulty adjustment.

### Stage 5: Consensus and upgrades

Steps 18 through 20 explain compatible validation, soft forks, and Bitcoin's upgrade process.

Path order is educational sequencing. It does not replace the canonical previous and next navigation recorded inside each permanent guide.

## 4. Card or step copy

### Step 1: MSC-GUIDE-013 | What Are UTXOs in Bitcoin?

- Step number: 1
- Registry ID: MSC-GUIDE-013
- Approved H1: What Are UTXOs in Bitcoin?
- Why this step appears here: The path begins with the spendable-output model because every later transaction, mempool, block, and chainstate explanation depends on it.
- Understand before continuing: A wallet spends complete existing outputs and normally creates new recipient and change outputs.
- Depth: Shallow
- Estimated reading time: 10 to 12 minutes
- Planned status: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Step 2: MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work

- Step number: 2
- Registry ID: MSC-GUIDE-008
- Approved H1: How Bitcoin Transactions and Fees Work
- Why this step appears here: This step turns the UTXO model into a transaction structure and introduces fee calculation, weight, fee rate, dependencies, and replacement.
- Understand before continuing: Transaction value, transaction fee, fee rate, and confirmation timing are separate concepts.
- Depth: Shallow
- Estimated reading time: 11 to 13 minutes
- Planned status: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Step 3: MSC-ROUTE-001 | How a Bitcoin Transaction Moves

- Step number: 3
- Registry ID: MSC-ROUTE-001
- Approved H1: How a Bitcoin Transaction Moves
- Why this step appears here: The featured route synthesizes the complete lifecycle before the path studies each infrastructure layer separately.
- Understand before continuing: Signing, local checks, relay, mempool acceptance, mining, validation, chain selection, and confirmations are distinct stages.
- Depth: Progressive synthesis
- Estimated reading time: 16 to 18 minutes
- Planned status: EDITORIAL_REVIEW editorial package, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Step 4: MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?

- Step number: 4
- Registry ID: MSC-GUIDE-025
- Approved H1: What Happens Inside the Bitcoin Mempool?
- Why this step appears here: This step focuses on node-local unconfirmed state immediately after the lifecycle overview.
- Understand before continuing: There is no global synchronized mempool, and policy acceptance is not consensus confirmation.
- Depth: Shallow
- Estimated reading time: 10 minutes
- Planned status: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Step 5: MSC-GUIDE-026 | How Bitcoin Blocks Work

- Step number: 5
- Registry ID: MSC-GUIDE-026
- Approved H1: How Bitcoin Blocks Work
- Why this step appears here: Blocks connect transaction selection to proof of work and validation.
- Understand before continuing: A candidate block, a proof-of-work result, a valid block, and a selected-chain block are different states.
- Depth: Shallow
- Estimated reading time: 11 minutes
- Planned status: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Step 6: MSC-GUIDE-014 | How Bitcoin Confirmations Work

- Step number: 6
- Registry ID: MSC-GUIDE-014
- Approved H1: How Bitcoin Confirmations Work
- Why this step appears here: Confirmation depth becomes meaningful after readers understand block inclusion.
- Understand before continuing: The first confirmation comes from active-chain block inclusion, while additional depth increases practical assurance without absolute finality.
- Depth: Surface
- Estimated reading time: 9 to 11 minutes
- Planned status: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Step 7: MSC-GUIDE-027 | How the Bitcoin Blockchain Works

- Step number: 7
- Registry ID: MSC-GUIDE-027
- Approved H1: How the Bitcoin Blockchain Works
- Why this step appears here: This step expands one block into hash-linked selected history and introduces reorganizations and chainstate effects.
- Understand before continuing: Nodes compare accumulated work only among valid candidate branches.
- Depth: Shallow
- Estimated reading time: 10 minutes
- Planned status: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Step 8: MSC-GUIDE-021 | What Is a Bitcoin Full Node?

- Step number: 8
- Registry ID: MSC-GUIDE-021
- Approved H1: What Is a Bitcoin Full Node?
- Why this step appears here: Readers now meet the software that independently performs the validation described in earlier stages.
- Understand before continuing: A full node is defined by independent validation, not by mining, wallet use, or archival storage alone.
- Depth: Shallow
- Estimated reading time: 11 minutes
- Planned status: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Step 9: MSC-GUIDE-022 | What Is a Pruned Bitcoin Node?

- Step number: 9
- Registry ID: MSC-GUIDE-022
- Approved H1: What Is a Pruned Bitcoin Node?
- Why this step appears here: Pruning immediately tests whether the reader can separate validation from historical file retention.
- Understand before continuing: A pruned node validates before deleting eligible old block data and may have reduced historical service capabilities.
- Depth: Shallow
- Estimated reading time: 12 minutes
- Planned status: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Step 10: MSC-GUIDE-023 | How to Run a Bitcoin Node

- Step number: 10
- Registry ID: MSC-GUIDE-023
- Approved H1: How to Run a Bitcoin Node
- Why this step appears here: The path moves from node concepts into purpose-driven operation and maintenance.
- Understand before continuing: Node setup depends on purpose, software source, storage, peer access, wallet boundaries, updates, monitoring, and recovery.
- Depth: Shallow
- Estimated reading time: 15 minutes
- Planned status: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Step 11: MSC-GUIDE-024 | Bitcoin Node Software Explained

- Step number: 11
- Registry ID: MSC-GUIDE-024
- Approved H1: Bitcoin Node Software Explained
- Why this step appears here: This comparison prepares readers to distinguish consensus compatibility from policy, features, defaults, and releases.
- Understand before continuing: Implementation names do not replace release-specific review of consensus behavior, policy, interfaces, and migration.
- Depth: Deep
- Estimated reading time: 19 minutes
- Planned status: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Step 12: MSC-GUIDE-029 | How Bitcoin Proof of Work Secures the Network

- Step number: 12
- Registry ID: MSC-GUIDE-029
- Approved H1: How Bitcoin Proof of Work Secures the Network
- Why this step appears here: Proof-of-work security appears before mining details so the reader understands the purpose and limits of costly block production.
- Understand before continuing: Proof of work orders valid history and raises replacement cost, but cannot make an invalid block valid.
- Depth: Shallow
- Estimated reading time: 11 minutes
- Planned status: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Step 13: MSC-GUIDE-017 | How Bitcoin Mining Works

- Step number: 13
- Registry ID: MSC-GUIDE-017
- Approved H1: How Bitcoin Mining Works
- Why this step appears here: This step opens the operational mining stack from candidate construction through found-block submission.
- Understand before continuing: Block assembly, header hashing, block submission, and independent node validation are different functions.
- Depth: Shallow
- Estimated reading time: 11 to 13 minutes
- Planned status: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Step 14: MSC-GUIDE-018 | How Bitcoin Mining Pools Work

- Step number: 14
- Registry ID: MSC-GUIDE-018
- Approved H1: How Bitcoin Mining Pools Work
- Why this step appears here: Pools explain how many operators coordinate work and payouts without becoming one machine or consensus authority.
- Understand before continuing: Pool shares measure contributed work under easier targets and are not Bitcoin transactions or partial blocks.
- Depth: Shallow
- Estimated reading time: 11 to 13 minutes
- Planned status: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Step 15: MSC-GUIDE-019 | What Is an ASIC Miner?

- Step number: 15
- Registry ID: MSC-GUIDE-019
- Approved H1: What Is an ASIC Miner?
- Why this step appears here: The path then moves into the specialized hardware performing the repeated hash attempts.
- Understand before continuing: An ASIC chip is one component in a larger machine and does not replace a full node or complete mining system.
- Depth: Shallow
- Estimated reading time: 10 to 12 minutes
- Planned status: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Step 16: MSC-GUIDE-028 | What Is Bitcoin Hashrate?

- Step number: 16
- Registry ID: MSC-GUIDE-028
- Approved H1: What Is Bitcoin Hashrate?
- Why this step appears here: Hashrate provides the rate measurement needed to discuss machines, pools, network estimates, and security.
- Understand before continuing: Device, pool, and network hashrate figures use different evidence, and total network hashrate is estimated rather than directly counted.
- Depth: Shallow
- Estimated reading time: 11 minutes
- Planned status: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Step 17: MSC-GUIDE-020 | How Bitcoin's Difficulty Adjustment Works

- Step number: 17
- Registry ID: MSC-GUIDE-020
- Approved H1: How Bitcoin's Difficulty Adjustment Works
- Why this step appears here: The mining stage closes with the consensus rule that periodically changes the target as aggregate hashing conditions change.
- Understand before continuing: Mainnet retargets at 2,016-block boundaries using defined timestamp, clamp, integer, and compact-target behavior.
- Depth: Deep
- Estimated reading time: 14 to 17 minutes
- Planned status: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Step 18: MSC-GUIDE-030 | How Bitcoin Reaches Consensus

- Step number: 18
- Registry ID: MSC-GUIDE-030
- Approved H1: How Bitcoin Reaches Consensus
- Why this step appears here: This step combines validation, chain selection, policy, software choice, and human coordination into one precise model.
- Understand before continuing: Consensus validity is separate from mempool policy, peer counts, miner signaling, and software branding.
- Depth: Deep
- Estimated reading time: 15 minutes
- Planned status: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Step 19: MSC-GUIDE-031 | How Bitcoin Soft Forks Work

- Step number: 19
- Registry ID: MSC-GUIDE-031
- Approved H1: How Bitcoin Soft Forks Work
- Why this step appears here: Soft forks show how stricter consensus rules can activate while preserving limited old-node block acceptance.
- Understand before continuing: Old-node acceptance does not mean old-node understanding or enforcement of the new restrictions.
- Depth: Deep
- Estimated reading time: 16 minutes
- Planned status: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Step 20: MSC-GUIDE-032 | How Bitcoin Network Upgrades Happen

- Step number: 20
- Registry ID: MSC-GUIDE-032
- Approved H1: How Bitcoin Network Upgrades Happen
- Why this step appears here: The final step places consensus changes inside the full proposal, implementation, adoption, activation, and enforcement history.
- Understand before continuing: No BIP, merge, release, miner signal, company agreement, or constituency independently changes every participant's rules.
- Depth: Deep
- Estimated reading time: 15 minutes
- Planned status: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

## 5. Key Terms

- **Transaction:** A data structure that spends existing UTXOs and creates new outputs.
- **UTXO:** An unspent transaction output that can be used as an input in a later transaction.
- **Mempool:** A node's local collection of valid unconfirmed transactions eligible for relay or block inclusion.
- **Block:** A valid batch of Bitcoin transactions linked to prior chain history through proof of work.
- **Blockchain:** The ordered history of valid Bitcoin blocks selected by accumulated proof of work.
- **Full node:** Software that independently verifies Bitcoin blocks and transactions against consensus rules.
- **Mining:** The proof-of-work process that orders valid transactions into blocks and competes to extend the Bitcoin chain.
- **Proof of work:** The computational process miners use to produce block hashes below the network target.
- **Consensus:** The shared validation rules independently enforced by Bitcoin nodes.
- **Validation:** The process of checking transactions and blocks against applicable rules.
- **Soft fork:** A consensus change that makes previously valid behavior invalid under new rules.
- **Network upgrade:** A coordinated change to Bitcoin software or rules that may affect policy, interoperability, features, or consensus behavior.

## 6. Sources

1. **MSC Learn Master Registry**
   Author or publisher: Mempool Surf Club Editorial
   Repository path: `docs/learn/MSC_Learn_Master_Registry.json`
   Supports: The approved Phase 9 path sequence, stage relationships, future Phase 16 branch timing, and canonical destination metadata.

2. **Copy-locked Bitcoin Basics guides MSC-GUIDE-008, MSC-GUIDE-013, and MSC-GUIDE-014**
   Author or publisher: Mempool Surf Club Editorial
   Repository path: `docs/learn/content/guides/`
   Supports: Transaction structure, fees, UTXOs, confirmations, step outcomes, depth, and reading-time metadata.

3. **Copy-locked Network guides MSC-GUIDE-025 through MSC-GUIDE-028**
   Author or publisher: Mempool Surf Club Editorial
   Repository path: `docs/learn/content/guides/`
   Supports: Local mempools, block structure, selected blockchain history, hashrate estimation, step outcomes, and reading-time metadata.

4. **Copy-locked Nodes guides MSC-GUIDE-021 through MSC-GUIDE-024**
   Author or publisher: Mempool Surf Club Editorial
   Repository path: `docs/learn/content/guides/`
   Supports: Full validation, pruning, node operation, software comparison, step outcomes, and reading-time metadata.

5. **Copy-locked Mining guides MSC-GUIDE-017 through MSC-GUIDE-020**
   Author or publisher: Mempool Surf Club Editorial
   Repository path: `docs/learn/content/guides/`
   Supports: Mining, pools, ASIC hardware, difficulty adjustment, step outcomes, and reading-time metadata.

6. **Copy-locked Consensus guides MSC-GUIDE-029 through MSC-GUIDE-032**
   Author or publisher: Mempool Surf Club Editorial
   Repository path: `docs/learn/content/guides/`
   Supports: Proof-of-work security, technical consensus, soft forks, upgrades, step outcomes, and reading-time metadata.

7. **MSC-ROUTE-001 editorial package**
   Author or publisher: Mempool Surf Club Editorial
   Repository path: `docs/learn/content/routes/MSC-ROUTE-001-how-a-bitcoin-transaction-moves.md`
   Supports: The path's transaction-lifecycle synthesis step and its companion-guide relationships.

## 7. SEO title

Understand the Bitcoin Network: A Guided Learning Path

## 8. Meta description

Follow a guided Bitcoin network path through transactions, mempools, blocks, nodes, mining, proof of work, consensus, and upgrades.

## 9. Page excerpt

Understand how Bitcoin data moves and becomes selected history through a 20-step path covering UTXOs, transactions, nodes, mining, proof of work, consensus, and upgrades.

## 10. Estimated reading time

22 minutes for path orientation and step review, excluding linked destinations

## 11. Planned internal links

Do not activate planned links until the destination exists as a real published page with a confirmed URL.

- MSC-PATH-START | Start With Bitcoin
- MSC-PATH-SAFE | Use Bitcoin Safely
- MSC-PATH-BUILD | Build on Bitcoin
- MSC-ROUTE-001 | How a Bitcoin Transaction Moves
- MSC-HUB-NETWORK | The Bitcoin Network
- MSC-GLOSSARY-001 | Bitcoin Glossary
- Future Phase 16 branch: MSC-GUIDE-057 | How Schnorr Signatures Work in Bitcoin
- Future Phase 16 branch: MSC-GUIDE-058 | How Digital Signatures Work in Bitcoin
- Future Phase 16 branch: MSC-GUIDE-059 | How Hash Functions Work in Bitcoin
- Future Phase 16 branch: MSC-GUIDE-060 | How Merkle Trees Work in Bitcoin

## 12. Accuracy review checklist

- [x] Registry metadata matches the approved master registry.
- [x] The Phase 9 path contains exactly 20 steps in the canonical sequence.
- [x] The path is organized into the five approved stages.
- [x] Every guide step uses its approved ID, H1, depth, and reading time.
- [x] The featured route appears as step 3 and remains a separate canonical destination.
- [x] UTXOs and transaction mechanics precede mempool, block, and chain explanations.
- [x] Local mempools are not described as one global synchronized mempool.
- [x] Broadcast, relay, mempool acceptance, mining, validation, and confirmation remain distinct.
- [x] Proof of work orders valid candidates but does not replace validation.
- [x] Chain selection uses accumulated work among valid branches.
- [x] Confirmation depth is not described as absolute finality.
- [x] Path sequence is not presented as replacement canonical navigation.
- [x] Guides MSC-GUIDE-057 through MSC-GUIDE-060 are future branches only.
- [x] Planned actions and internal links contain no live URLs.
- [x] Exact approved glossary definitions are used.
- [x] Human Verification remains pending.
- [x] Exactly three complete illustration briefs are included.
- [x] No em dash or en dash character appears.

## 13. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-19
- Notes:
  - Verified the exact 20-step Phase 9 sequence, five-stage structure, step metadata, learning outcomes, and MSC-ROUTE-001 as Step 3.
  - Confirmed Guides MSC-GUIDE-057 through MSC-GUIDE-060 remain future optional branches and that the duplicate Phase 16 wording is removed.
  - Confirmed policy, consensus, relay, local mempools, mining, validation, chainwork, and confirmations remain distinct; planned links remain inactive; and exactly three illustrations remain `PLANNED`.

## 14. Illustration brief

### Illustration 1

- Concept title: Five Stages of Network Understanding
- Educational purpose: Show the educational progression from transaction foundations to upgrades.
- Recommended placement: After the section titled What completing the path should provide.
- Visual description: Old nautical route chart with five ports labeled Transaction foundations, Relay to blocks, Independent validation, Mining and proof of work, and Consensus and upgrades. Each port contains a small system symbol rather than a completion badge.
- Required labels: Transaction foundations, Relay to blocks, Independent validation, Mining and proof of work, Consensus and upgrades
- Caption: The path moves from transaction data into the systems that relay, mine, validate, order, and upgrade Bitcoin.
- Alt text: Learning route diagram showing five stages from Bitcoin transaction foundations through relay, nodes, mining, consensus, and upgrades.
- Image orientation: Landscape
- Mobile crop notes: Stack the five ports vertically and use one short label per port.
- Status: PLANNED

### Illustration 2

- Concept title: One Transaction, Separate Systems
- Educational purpose: Reinforce that one wallet event crosses multiple technical boundaries.
- Recommended placement: After the Stage 2 section titled From relay to blocks.
- Visual description: Field-guide flow from wallet to peer relay, three local node mempools, a mining template, candidate block, proof-of-work search, node validation, and selected chain. Each boundary has its own labeled checkpoint.
- Required labels: Wallet, Sign, Submit, Peer relay, Local mempool, Mining template, Candidate block, Proof of work, Node validation, Selected chain
- Caption: A transaction can cross many systems, and success at one stage does not guarantee success at the next.
- Alt text: Technical flow showing a Bitcoin transaction moving from wallet signing through peer relay, local mempools, mining, validation, and selected-chain inclusion.
- Image orientation: Landscape
- Mobile crop notes: Use a single vertical flow and keep the local mempool stage visibly plural.
- Status: PLANNED

### Illustration 3

- Concept title: Canonical Navigation and Learning Path
- Educational purpose: Explain that learning order does not change permanent guide ownership or navigation.
- Recommended placement: After the section titled Destination structure or sequence.
- Visual description: Two parallel navigation tracks. One track is labeled Canonical guide relationships and follows permanent guide-to-guide links. The other is labeled Understand the Network and rearranges the same destination cards into five learning stages.
- Required labels: Canonical guide relationships, Learning path order, Permanent destination, Shared guide, No duplicate ownership
- Caption: The learning path sequences permanent destinations without replacing their canonical navigation.
- Alt text: Comparison diagram showing permanent guide navigation alongside a curated Bitcoin learning path using the same canonical destinations.
- Image orientation: Landscape
- Mobile crop notes: Stack the two tracks with matching destination markers aligned vertically.
- Status: PLANNED
