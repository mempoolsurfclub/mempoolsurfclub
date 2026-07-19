---
registry_id: MSC-GUIDE-029
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: How Bitcoin Proof of Work Secures the Network
handle: bitcoin-proof-of-work
category: The Bitcoin Network
subcategory: Consensus
depth: Shallow
format: Explainer
primary_path: Understand the Network
secondary_paths:
  - Start With Bitcoin
author_display: Mempool Surf Club Editorial
reviewed_date: null
copy_locked_date: null
---

# How Bitcoin Proof of Work Secures the Network

## 1. Introductory deck

Bitcoin proof of work turns block production into a costly, verifiable competition. Miners search for block-header hashes below a network target, while full nodes independently verify the result and every rule inside the block. Proof of work helps order valid history and makes replacement expensive, but it does not let miners override signatures, create invalid bitcoin, or change the rules enforced by nodes.

## 2. Full article

Bitcoin proof of work is often described as the system that secures the network. That statement is directionally useful, but it needs boundaries.

Proof of work does not decide whether a transaction has a valid signature. It does not decide whether a coin exists. It does not give a miner permission to ignore block limits or create more subsidy than the rules allow.

Its central job is different. Proof of work gives Bitcoin a measurable way to compare valid competing histories and makes producing that history costly.

### Miners search for a qualifying block-header hash

A miner begins with a candidate block linked to a chosen parent block.

The candidate includes transactions, a coinbase transaction, commitments to the transaction set, and an 80-byte block header. The header contains the version, previous block hash, Merkle root, timestamp, encoded target, and nonce.

Mining systems repeatedly hash serialized header variants with double SHA-256. A result is valid proof of work only when the interpreted hash is less than or equal to the target required for that block.

Most hashes fail. A failed hash is not partial progress that can be saved toward the next attempt. It is simply one result that did not satisfy the target.

Miners create more search space by changing the nonce, timestamp within allowed bounds, permitted version bits, coinbase data, transaction selection, or transaction order. Changes that affect the coinbase or transaction set alter the Merkle root and therefore create a different header.

### The target determines how difficult success is

The proof-of-work target is a threshold.

A lower target permits fewer possible hash results, so finding a qualifying result is harder. A higher target permits more results, so it is easier.

Bitcoin commonly expresses this relationship through difficulty, which compares the current target with a reference target. Difficulty is a convenient display measure. Nodes ultimately validate the encoded target and the resulting header hash under the applicable consensus rules.

On mainnet, the required target is recalculated at 2,016-block boundaries under the ordinary difficulty-adjustment rule. Miners do not report how many machines they have, and nodes do not ask a hashrate dashboard what target to accept.

Each node calculates the required target from validated chain data and network parameters.

### Proof of work is easy to verify after it is found

Finding a qualifying header can require an enormous number of attempts. Verifying the result is much cheaper.

A node can serialize the header, calculate its hash, decode the target, and compare the two. It also checks that the target is the one permitted for that chain position.

This asymmetry is essential. Production is intentionally expensive and probabilistic. Verification is deterministic and practical for ordinary full nodes.

The node still has much more work to do. It checks the block structure, transaction commitments, scripts, signatures, available inputs, amounts, block limits, coinbase rules, lock conditions, and other consensus requirements.

A valid proof-of-work hash proves that the header met the target. It does not prove that the complete block is valid.

### Work orders valid competing histories

Bitcoin peers can temporarily learn about more than one valid branch.

Two miners may find blocks extending the same parent at nearly the same time. Network delay can cause different nodes to see those blocks in a different order.

Nodes do not permanently select the first block they heard about. Among valid candidate chains, they compare accumulated proof of work, represented in Bitcoin Core as chainwork.

Each valid block contributes work based on its target. A chain with more blocks does not automatically have more chainwork if the blocks represent different targets. Header timestamps also do not directly determine which branch wins.

The selected chain is the valid candidate chain with the greatest accumulated work under the node's chain-selection rules.

When a competing valid branch overtakes the currently selected branch, the node can reorganize. It disconnects blocks from the old branch, connects blocks from the stronger valid branch, updates chainstate, and reconciles affected transactions.

### Work cannot make an invalid block valid

Suppose a miner produces a header hash far below the target but includes a transaction that spends a nonexistent output.

A full node enforcing the applicable rules rejects the block.

The same is true if the miner claims too much coinbase value, violates block weight, breaks a required script rule, uses the wrong target, or fails another consensus check.

This separation limits what hash power can do. Mining determines competition within the valid rule set. Validation determines whether a block belongs in that valid set at all.

An attacker with substantial hash power may be able to reorder recent valid transactions, delay confirmations, censor selected transactions, or attempt a double spend by building a competing valid branch. Hash power does not reveal private keys or create valid signatures for someone else's funds.

### Proof of work makes history expensive to replace

Each accepted block links to the hash of its parent.

Changing an earlier block changes its header hash. That breaks the next block's previous-hash reference and every later link built above it.

An attacker trying to replace that history must construct an alternative valid branch and perform enough new proof of work for the branch to overtake the selected chain.

The deeper the targeted transaction sits beneath later blocks, the more accumulated work the attacker generally must overcome.

This is why confirmations are probabilistic settlement depth rather than an instant switch to absolute finality. One confirmation means inclusion in the selected chain. Additional blocks increase the work represented above that transaction.

The appropriate waiting depth depends on the value, threat model, available alternatives, and tolerance for reorganization risk.

### Majority hash power is serious but not unlimited

The phrase "51 percent attack" refers to a simplified case in which an attacker can sustain more proof-of-work production than the rest of the competing network.

Such an attacker can have a strong probability of making its valid branch accumulate work faster. That can support transaction censorship, reordering, and attempts to reverse the attacker's own recent payments.

The exact outcome depends on the attacker's share, duration, private lead, network propagation, target transaction depth, defensive behavior, and whether other miners redirect capacity.

Majority hash power does not automatically grant control of:

- Other people's private keys.
- The consensus rules enforced by full nodes.
- Wallet software and user devices.
- Every miner or pool.
- The monetary rules inside software that nodes choose to run.
- Off-chain contracts or external institutions.

A miner that changes the rules creates blocks that unmodified nodes may reject. Proof of work is not a bypass around validation.

### Security depends on cost, capability, and coordination

Hashrate is one part of a proof-of-work threat model.

An attacker may need specialized hardware, electrical power, facilities, cooling, firmware, network access, operational staff, and a way to hide or coordinate the effort. The attacker must also consider opportunity cost because hardware used on a competing branch is not simultaneously earning ordinary rewards on the selected chain.

The cost is not one fixed dollar figure.

Hardware can be owned, rented, redirected, stolen, subsidized, or already deployed. Energy prices and curtailment arrangements differ. Pool-level coordination can differ from hardware ownership. An attack sustained for hours has different requirements from one sustained for months.

A responsible security claim identifies the capability being considered instead of saying that a single hashrate number measures all security.

### Energy expenditure is an input, not the rule itself

Proof of work requires physical computation, and physical computation requires energy.

That connection makes large-scale block production costly. It also creates real resource use that should be measured with clear boundaries.

Bitcoin consensus does not check a power bill or require a specific amount of electricity per block. Nodes verify hashes and targets. Energy use arises from miners competing to find those hashes with real machines.

The same hashrate can be produced with different hardware efficiency and supporting infrastructure. Electrical demand, energy source, emissions, cost, grid effects, heat reuse, and curtailment are separate measurements.

"Bitcoin is secured by energy" is therefore incomplete. Security comes from a system in which proof-of-work production has real cost, valid work is cheaply verifiable, nodes enforce rules independently, and competing histories are compared by accumulated work.

### Miners are paid for valid selected-chain blocks

Proof-of-work incentives connect security with block rewards.

A miner that finds a valid block may claim up to the permitted subsidy plus transaction fees through the coinbase transaction. Those outputs are subject to the 100-block coinbase maturity rule.

A found block can still become stale if another valid branch becomes selected. The stale block's coinbase output does not mature on the selected chain.

An invalid block is worse. Nodes reject it regardless of the miner's cost.

This gives miners an economic reason to build on a valid chain, include valid transactions, follow activation rules they expect the network to enforce, and propagate blocks quickly.

The incentive is not perfect control. It is a recurring reward for producing work that other nodes can verify and accept.

### Difficulty adjustment keeps the competition usable

Hashrate changes over time as machines enter, leave, throttle, fail, or move between uses.

Without a difficulty adjustment, a large increase in aggregate hash power would cause blocks to arrive faster on average. A large decrease would cause them to arrive more slowly.

Bitcoin mainnet periodically recalculates the target from prior block timing. The objective is to keep long-run block production near the ten-minute target spacing despite changes in aggregate hashing conditions.

The adjustment does not eliminate random block intervals. It does not guarantee exactly ten minutes between blocks. It changes the expected difficulty of future proof-of-work searches.

Proof of work and difficulty adjustment therefore operate together:

1. The target sets the qualification threshold.
2. Miners search for a header hash that satisfies it.
3. Nodes verify the proof and complete block.
4. Valid blocks add work to candidate chain history.
5. Nodes select the valid chain with the greatest accumulated work.
6. Periodic retargeting responds to prior block timing.

### Proof of work solves an ordering problem

Bitcoin does not have a central operator that assigns one official transaction order.

Proof of work supplies a public, independently verifiable ordering signal. Anyone can attempt to extend the chain. Anyone running a full node can verify whether the resulting block follows the rules and how much work the candidate chain represents.

This mechanism does not remove every risk. It creates a specific security model.

Blocks remain probabilistic. Recent history can reorganize. Mining can concentrate. Censorship attempts are possible. Hardware and energy systems have operational dependencies. Software rules can become socially disputed.

The durable insight is narrower and stronger than a slogan: proof of work makes block production costly, verification cheap, and replacement of valid accumulated history progressively more difficult.

## 3. Key Terms

- **Proof of work:** The computational process miners use to produce block hashes below the network target.
- **Mining:** The proof-of-work process that orders valid transactions into blocks and competes to extend the Bitcoin chain.
- **Threat model:** A defined view of the assets, adversaries, capabilities, failure modes, and assumptions relevant to a security decision.
- **Difficulty:** The proof-of-work threshold that determines how hard it is to produce a valid block hash.
- **Hashrate:** An estimate of the total proof-of-work computation being applied to Bitcoin mining.
- **Validation:** The process of checking transactions and blocks against applicable rules.
- **Blockchain:** The ordered history of valid Bitcoin blocks selected by accumulated proof of work.

## 4. Sources

1. **Bitcoin white paper**  
   Author or publisher: Satoshi Nakamoto  
   URL: https://bitcoin.org/bitcoin.pdf  
   Supports: Hash-based proof of work, chain ordering, network operation, confirmation depth, and the probability of a competing chain catching up.

2. **Bitcoin Core proof-of-work implementation**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/pow.cpp  
   Supports: Required-target calculation, compact target decoding, proof-of-work limit handling, difficulty adjustment, and header hash validation.

3. **Bitcoin Core proof-of-work interface**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/pow.h  
   Supports: The proof-of-work calculation and checking interfaces used by Bitcoin Core.

4. **Bitcoin Core chainwork implementation**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/chain.cpp  
   Supports: Per-block proof calculation, accumulated chainwork, and comparison of work represented by chain history.

5. **Bitcoin Core chain index definitions**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/chain.h  
   Supports: Stored chainwork, block height, parent relationships, active-chain access, and candidate branch navigation.

6. **Bitcoin Core validation implementation**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/validation.cpp  
   Supports: Header and block validation, proof-of-work checks, candidate-chain activation, block connection and disconnection, and rejection of invalid blocks.

7. **Bitcoin Core block-header data structure**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/primitives/block.h  
   Supports: The six serialized header fields, 80-byte header structure, and block-header hashing object.

8. **Bitcoin Core mainnet consensus parameters**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/kernel/chainparams.cpp  
   Supports: Mainnet target spacing, target timespan, proof-of-work limit, deployment heights, and network-specific consensus parameters.

9. **Bitcoin Core block-assembly implementation**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/node/miner.cpp  
   Supports: Candidate-block construction, coinbase creation, transaction selection, header preparation, and template validity checks.

10. **Bitcoin Developer Guide: Block Chain**  
    Author or publisher: Bitcoin.org contributors  
    URL: https://developer.bitcoin.org/devguide/block_chain.html  
    Supports: Block headers, targets, proof of work, chain selection, Merkle commitments, and confirmation context.

## 5. SEO title

How Bitcoin Proof of Work Secures the Network

## 6. Meta description

Learn how Bitcoin proof of work makes block production costly, keeps verification practical, orders valid chain history, and limits what hash power can control.

## 7. Page excerpt

Bitcoin proof of work creates a costly, verifiable competition for extending valid chain history. See how targets, chainwork, confirmations, incentives, and node validation fit together.

## 8. Estimated reading time

11 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Parent hub: MSC-HUB-NETWORK | The Bitcoin Network
- Primary path: MSC-PATH-NETWORK | Understand the Network
- Secondary path: MSC-PATH-START | Start With Bitcoin
- Prerequisite: MSC-GUIDE-001 | What Is Bitcoin?
- Previous guide: MSC-GUIDE-028 | What Is Bitcoin Hashrate?
- Next guide: MSC-GUIDE-030 | How Bitcoin Reaches Consensus
- Branch guide: MSC-GUIDE-017 | How Bitcoin Mining Works
- Recommended continuation: MSC-GUIDE-017 | How Bitcoin Mining Works
- Related guide: MSC-GUIDE-020 | How Bitcoin's Difficulty Adjustment Works
- Related guide: MSC-GUIDE-021 | What Is a Bitcoin Full Node?
- Related guide: MSC-GUIDE-027 | How the Bitcoin Blockchain Works
- Related guide: MSC-GUIDE-028 | What Is Bitcoin Hashrate?
- Glossary: MSC-GLOSSARY-001 | Bitcoin Glossary

## 10. Accuracy review checklist

- [x] Registry metadata and navigation relationships match the approved registry.
- [x] Proof of work is separated from complete block and transaction validation.
- [x] The hash comparison uses less than or equal to the required target.
- [x] Failed hashes are not described as partial progress.
- [x] Target, difficulty, hashrate, per-block proof, and accumulated chainwork remain distinct.
- [x] Nodes reject invalid blocks regardless of the work spent producing them.
- [x] Majority hash power is not described as control of private keys or node-enforced rules.
- [x] Confirmations are described as probabilistic settlement depth rather than instant finality.
- [x] Energy, electrical demand, energy source, emissions, and security are not collapsed into one measure.
- [x] Mining pools, hardware ownership, and coordinated hash power remain distinct.
- [x] Difficulty adjustment is separated from proof-of-work verification and subsidy halving.
- [x] No investment advice, price prediction, profitability promise, or universal environmental claim appears.
- [x] Exact approved glossary definitions are used.
- [x] Planned internal links contain no live URLs.
- [x] No em dash or en dash character appears.

## 11. Human verification

- Reviewer:
- Review date:
- Notes:
  - Recheck Bitcoin Core v31.0 proof-of-work, target, chainwork, and validation paths immediately before copy lock.
  - Confirm the exact mainnet target-spacing and retarget references remain current.
  - Recheck attack-capability language so transaction ordering, censorship, reorganization, and invalid-block limits remain distinct.
  - Recheck energy and security claims for clear system boundaries and no universal environmental conclusion.
  - Confirm exact glossary-definition synchronization.
  - Recheck every source URL immediately before publication.
  - Keep planned internal links inactive until real destination pages and confirmed URLs exist.

## 12. Illustration brief

### Illustration 1

- Concept title: Costly Search, Cheap Verification
- Educational purpose: Show the asymmetry between many mining attempts and one direct node verification.
- Recommended placement: After the section titled Proof of work is easy to verify after it is found.
- Visual description: Old oceanographic instrument plate. A wide field of header-hash attempts flows through a narrow target gate. One qualifying header reaches a compact validation station where a node recomputes the hash and checks the target.
- Required labels: Header variants, Double SHA-256, Failed hashes, Network target, Qualifying hash, Node verification
- Caption: Miners may perform many hash attempts, while a node can verify a found proof of work directly.
- Alt text: Technical diagram showing many Bitcoin block-header hash attempts passing through a target threshold and one qualifying result being verified by a full node.
- Image orientation: Landscape
- Mobile crop notes: Keep the hash field, target gate, and verification station in one centered left-to-right sequence.
- Status: PLANNED

### Illustration 2

- Concept title: Proof of Work Cannot Override Validation
- Educational purpose: Separate proof-of-work qualification from complete block validity.
- Recommended placement: After the section titled Work cannot make an invalid block valid.
- Visual description: Maritime checkpoint diagram. A block with a valid proof-of-work seal enters a second inspection station with gauges for transactions, signatures, inputs, coinbase value, block limits, and commitments. One route accepts a valid block and another rejects an invalid block.
- Required labels: Valid header work, Transaction rules, Signatures, UTXOs, Coinbase limit, Block limits, Accept, Reject
- Caption: A qualifying header hash permits block submission, but nodes still reject any block that violates consensus rules.
- Alt text: Validation flow showing a Bitcoin block with valid proof of work undergoing transaction, signature, UTXO, coinbase, and block-limit checks before acceptance or rejection.
- Image orientation: Landscape
- Mobile crop notes: Stack proof of work above the complete-block inspection and keep the accept-and-reject split visible.
- Status: PLANNED

### Illustration 3

- Concept title: Replacing Accumulated History
- Educational purpose: Show why deeper selected-chain history requires more competing work to replace.
- Recommended placement: After the section titled Proof of work makes history expensive to replace.
- Visual description: Nautical chain chart with a selected branch and a competing branch leaving the same earlier block. Work markers accumulate above each block. The competing branch must overtake the selected branch's chainwork before nodes reorganize.
- Required labels: Common ancestor, Selected chain, Competing valid chain, Accumulated work, Confirmation depth, Reorganization threshold
- Caption: Replacing confirmed history requires a competing valid branch to accumulate more proof of work than the selected chain.
- Alt text: Branch diagram showing selected and competing Bitcoin chains accumulating proof of work from a common ancestor until the competing branch overtakes.
- Image orientation: Landscape
- Mobile crop notes: Use two short parallel branches and keep the common ancestor plus accumulated-work comparison inside the center crop.
- Status: PLANNED
