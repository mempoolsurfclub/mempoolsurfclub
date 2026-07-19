---
registry_id: MSC-GUIDE-025
status: COPY_LOCKED
page_role: topic-guide
h1: What Happens Inside the Bitcoin Mempool?
handle: bitcoin-mempool
category: The Bitcoin Network
subcategory: Network
depth: Shallow
format: Explainer
primary_path: Understand the Network
secondary_paths:
  - Start With Bitcoin
  - Build on Bitcoin
author_display: Mempool Surf Club Editorial
reviewed_date: 2026-07-18
copy_locked_date: 2026-07-18
---

# What Happens Inside the Bitcoin Mempool?

## 1. Introductory deck

A Bitcoin mempool is a node's local collection of valid unconfirmed transactions that are eligible for relay or block inclusion under that node's current policy. There is no single universal mempool. Different nodes can accept, reject, retain, replace, and evict different transactions while still enforcing compatible consensus rules.

## 2. Full article

A Bitcoin transaction does not enter one global waiting room after it is signed.

It is usually sent to one or more Bitcoin nodes. Each receiving node evaluates the transaction for itself. A transaction that passes the node's required checks may enter that node's mempool and may be announced to peers. Another node can reach a different mempool decision because its chain tip, existing transactions, resource limits, configuration, or policy differs.

That local process is what people mean when they talk about the Bitcoin mempool.

### The mempool belongs to a node

A mempool exists inside a particular node process. It is not part of the blockchain, and it is not a consensus object shared identically by every participant.

Two compatible full nodes can have different mempools because:

- They learned about transactions in a different order.
- One node has a conflicting transaction already.
- Their local minimum fee conditions differ.
- Their memory limits or expiry settings differ.
- One node restarted and restored a different saved set.
- Their policy settings or software releases differ.
- Their selected chain tips recently changed.
- A transaction reached one peer group but not another.

The phrase "the mempool" is useful shorthand for the broader market of unconfirmed transactions, but it should not be read as one authoritative list.

A block does not have to match any node's prior mempool. A node validates the block itself when it arrives.

### Consensus validity and mempool acceptance are different tests

Before accepting an unconfirmed transaction, a node must determine that it can be evaluated against the applicable chain and unconfirmed ancestors. The transaction must not violate consensus rules that would make it invalid in the next block being considered.

Mempool admission also applies local policy. Policy helps a node manage relay, resource use, denial-of-service exposure, replacement, and transaction patterns that the software is willing to handle before confirmation.

A transaction can therefore be:

- Invalid by consensus and unacceptable everywhere enforcing those rules.
- Valid by consensus but rejected from a particular mempool under local policy.
- Accepted by one node and rejected by another.
- Absent simply because the node has not received it.
- Removed later even though it remains valid by consensus.

If a miner includes a consensus-valid transaction in a valid block, a node cannot reject that block merely because the transaction would not have entered its own mempool.

This boundary prevents local relay preferences from silently becoming new consensus rules.

### A transaction may depend on unconfirmed parents

A mempool can contain transaction chains.

A child transaction may spend an output created by an unconfirmed parent already in the same mempool. The child cannot be confirmed before the parent output exists in the active chain, so a valid block must place the parent before the child.

Nodes track these relationships to evaluate fees, limits, replacement, eviction, and mining order. Modern Bitcoin Core groups connected mempool transactions into clusters for several resource and ordering calculations.

This means a transaction's practical treatment may depend on more than its individual fee rate. A low-fee parent and high-fee child can be evaluated together for mining because including the child requires including the parent.

Package behavior is implementation-sensitive. A wallet or service should not assume every node accepts the same multi-transaction submission or applies identical package rules.

### Fees compete for limited block space

A transaction fee is the difference between the value of its inputs and outputs. Fee rate expresses that fee relative to transaction weight or virtual size.

Miners generally have an incentive to select transaction packages that increase fee revenue while staying within block limits and satisfying dependencies. That creates competition for scarce block space.

A node's mempool can help estimate that competition, but no displayed fee tier guarantees a confirmation time. Conditions can change when:

- New transactions arrive.
- A block is found.
- Miners use different templates or policies.
- A high-fee child changes a package's attractiveness.
- Transactions are replaced.
- A reorganization changes what is confirmed.
- A node's local view differs from the estimator's view.

A fee estimate is a statistical and policy-dependent tool, not a reservation in a future block.

### Low-fee transactions can remain, disappear, or return

Mempool membership is temporary.

A transaction normally leaves a node's mempool when it is confirmed in a connected block. It can also be removed because it conflicts with a confirmed transaction, is replaced under the node's policy, expires under local settings, violates a resource limit after conditions change, or is evicted when the mempool exceeds its configured size.

When a mempool is full, Bitcoin Core can raise a rolling minimum fee rate and remove lower-scoring transaction packages to reclaim memory. That minimum can later fall. A transaction removed by one node is not erased from Bitcoin. Another node may still retain it, a wallet may rebroadcast it, or a miner may receive it through another path.

A disconnected block during a chain reorganization can also return transactions to the unconfirmed state. Bitcoin Core attempts to reconcile its mempool with the newly selected chain. Transactions may be re-added when they remain valid and satisfy the applicable constraints, while conflicts or now-invalid transactions are removed.

### Replacement is a local policy decision

An unconfirmed transaction can conflict with another unconfirmed transaction by spending the same input.

Some node policies permit a higher-fee replacement when defined conditions are met. Replacement rules address more than the absolute fee. Implementations can consider fee rate, total fee, conflicts, transaction relationships, and resource limits.

BIP 125 documented an opt-in replace-by-fee policy used historically by Bitcoin Core and other software. Current behavior must be checked against the exact node release and configuration because replacement policy has continued to evolve.

Replacement does not edit a transaction already on the network. It introduces a separate transaction that conflicts with the earlier one. Nodes independently decide which transaction, if either, they retain and relay.

Neither transaction is confirmed until one appears in a valid block on the selected chain.

### Missing-input transactions are not ordinary mempool entries

A node may receive a transaction whose referenced inputs are unknown.

That transaction cannot be validated as an ordinary mempool transaction because the node cannot locate and evaluate all spent outputs. Bitcoin Core can keep some missing-input transactions in a separate orphanage while it requests or waits for their parents.

The orphanage is resource-limited and is not the same as the mempool. An "orphan transaction" in this networking sense should also not be confused with a stale block or a transaction removed by a reorganization.

Once the required parents become available, the node can reconsider the transaction. Acceptance is still not guaranteed.

### Relay spreads transactions without creating certainty

After accepting a transaction, a node may announce it to selected peers under its relay rules. Peers can request the transaction and evaluate it independently.

Relay is not a broadcast to every node at once. Propagation depends on peer connections, announcement timing, privacy protections, policy compatibility, network conditions, and whether peers already know the transaction.

A wallet that submits a transaction to one node has evidence that the node received the submission. It does not automatically know that:

- Every miner received it.
- Every node accepted it.
- It will remain in any mempool.
- It cannot be replaced.
- It will confirm in the next block.
- It will confirm at all.

Monitoring several public explorers can provide additional observations, but explorers also show particular infrastructure and policy views. They do not create a canonical mempool.

### Miners build candidates from available information

A mining system constructs a candidate block from transactions it knows about and is willing to include.

Its source may include a local mempool, transactions received privately, pool infrastructure, or another template provider. The candidate must respect dependencies, weight limits, consensus rules, and the miner's chosen transaction-selection policy.

The miner then adds a coinbase transaction and builds the block header commitments used for proof of work.

A transaction's presence in a public node's mempool does not force miners to include it. Its absence from that mempool does not prevent a miner from including it if the transaction is valid and the miner has obtained it.

After proof of work is found, nodes validate the resulting block independently. The block, not prior mempool membership, determines confirmation.

### New blocks reshape the local mempool

When a node accepts a new block onto its selected chain, it removes the block's transactions from its mempool. It also removes mempool transactions that conflict with confirmed spends and updates relationships among the remaining entries.

A block can free memory, lower competition, and change fee estimation. It can also confirm a low-fee parent that makes a previously dependent child stand alone.

A chain reorganization reverses part of that process. Transactions from disconnected blocks may become unconfirmed again, and transactions from newly connected blocks become confirmed. The node must rebuild a mempool view consistent with the new active chain.

This is one reason a mempool should not be described as a static queue.

### Mempool order is not first come, first served

Bitcoin does not require miners to confirm transactions in arrival order.

Nodes record useful metadata such as entry time, fees, size, and transaction relationships, but a miner can choose a different order. Fee incentives, package dependencies, private transactions, local prioritization, and template construction all affect selection.

A transaction can wait longer than a later transaction. A child can raise the combined appeal of a parent package. A miner can include a valid transaction that most public nodes never relayed.

"Position in the mempool" is therefore usually a model produced by a particular service, not a consensus-defined line number.

### Mempool data is useful when its boundaries are clear

Mempool observations can help users and operators:

- Inspect whether a node accepted a transaction.
- Study unconfirmed transaction relationships.
- Estimate fee pressure.
- Debug replacement or conflict behavior.
- Build candidate block templates.
- Monitor local memory use and policy thresholds.
- Test wallet and application behavior.
- Observe how a chain reorganization changes unconfirmed state.

The data should always be labeled with the node, software release, configuration, chain tip, and observation time when precision matters.

A mempool snapshot can be accurate for one node and still differ from the rest of the network.

### The mempool is a policy layer around unconfirmed activity

The blockchain records confirmed transactions in selected valid blocks. The mempool is the node's changing working set before confirmation.

That working set helps nodes relay transactions, helps miners assemble candidates, and helps wallets estimate current conditions. It does not grant a transaction confirmation, establish one universal fee market view, or override block validation.

The clean mental model is simple:

- Transactions are created and submitted.
- Nodes evaluate them independently.
- Accepted transactions may enter local mempools and relay.
- Miners construct candidates from the transactions they know.
- Nodes confirm only what appears in a valid block on the selected chain.

The mempool matters because it is where unconfirmed transaction policy, propagation, dependencies, and fee competition meet. It remains local, temporary, and separate from consensus history.

## 3. Key Terms

- **Mempool:** A node's local collection of valid unconfirmed transactions eligible for relay or block inclusion.
- **Transaction:** A data structure that spends existing UTXOs and creates new outputs.
- **Fee rate:** The amount paid per unit of transaction weight or virtual size to compete for block space.
- **Node:** Bitcoin software that communicates with peers and may validate, relay, store, or serve network data.
- **Policy:** Local software rules that influence transaction relay, mempool acceptance, or default behavior without changing consensus validity.
- **Transaction relay:** The peer-to-peer propagation of transactions between nodes under local policy rules.
- **UTXO:** An unspent transaction output that can be used as an input in a later transaction.

## 4. Sources

1. **Bitcoin Core transaction mempool interface**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/txmempool.h  
   Supports: The mempool as a store of transactions valid relative to the current best chain, admission exclusions, transaction relationships, replacement, expiry, eviction, reorganization handling, and RPC inspection.

2. **Bitcoin Core transaction validation implementation**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/validation.cpp  
   Supports: Mempool acceptance, consensus and policy checks, conflict handling, chain-tip updates, block connection, and mempool reconciliation after reorganizations.

3. **Bitcoin Core peer-processing implementation**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/net_processing.cpp  
   Supports: Transaction announcements, peer requests, relay behavior, missing-input transaction handling, and peer-to-peer propagation boundaries.

4. **Bitcoin Core mempool replacement policy**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/doc/policy/mempool-replacements.md  
   Supports: Current replacement concepts, conflict evaluation, fee requirements, and the release-sensitive nature of mempool replacement policy.

5. **Bitcoin Core package policy interface**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/policy/packages.h  
   Supports: Package terminology, transaction relationships, package validation limits, and implementation-specific multi-transaction evaluation.

6. **Bitcoin Core block-assembly implementation**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/node/miner.cpp  
   Supports: Candidate-block construction, transaction dependency ordering, fee-aware package selection, block limits, and the distinction between a mempool and a completed block.

7. **Bitcoin Core getmempoolinfo RPC**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://bitcoincore.org/en/doc/31.0.0/rpc/blockchain/getmempoolinfo/  
   Supports: Local mempool size, memory usage, maximum size, minimum fee conditions, and implementation-reported mempool state.

8. **Bitcoin Core getrawmempool RPC**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://bitcoincore.org/en/doc/31.0.0/rpc/blockchain/getrawmempool/  
   Supports: Local mempool transaction data, verbose entry information, dependencies, and the fact that RPC output represents one node.

9. **BIP 125: Opt-in Full Replace-by-Fee Signaling**  
   Author or publisher: David A. Harding and Peter Todd  
   URL: https://github.com/bitcoin/bips/blob/master/bip-0125.mediawiki  
   Supports: The historical opt-in replacement model, signaling, and terminology. Current node behavior remains release-specific.

10. **Bitcoin Developer Guide: Transactions**  
    Author or publisher: Bitcoin.org contributors  
    URL: https://developer.bitcoin.org/devguide/transactions.html  
    Supports: Transaction inputs, outputs, fees, dependencies, and the distinction between unconfirmed transactions and transactions included in blocks.

## 5. SEO title

Bitcoin Mempool Explained: What Happens Before Confirmation

## 6. Meta description

Learn how local Bitcoin mempools accept, relay, replace, evict, and organize unconfirmed transactions before miners include them in valid blocks.

## 7. Page excerpt

Every Bitcoin node maintains its own view of valid unconfirmed transactions. Learn how mempool policy, fees, replacement, relay, and mining fit together before confirmation.

## 8. Estimated reading time

10 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Parent hub: MSC-HUB-NETWORK | The Bitcoin Network
- Primary path: MSC-PATH-NETWORK | Understand the Network
- Secondary path: MSC-PATH-START | Start With Bitcoin
- Secondary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite: MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- Prerequisite: MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
- Previous guide: MSC-GUIDE-024 | Bitcoin Node Software Explained
- Next guide: MSC-GUIDE-026 | How Bitcoin Blocks Work
- Branch guide: MSC-ROUTE-001 | How a Bitcoin Transaction Moves
- Featured route: MSC-ROUTE-001 | How a Bitcoin Transaction Moves

## 10. Accuracy review checklist

- [x] Registry metadata matches the approved registry.
- [x] The mempool is described as local to each node rather than one global consensus object.
- [x] Consensus validity and local policy are separated.
- [x] Mempool acceptance is not described as confirmation or a confirmation guarantee.
- [x] Fee estimates are not presented as reservations or exact timing promises.
- [x] Parent-child relationships and package behavior remain implementation-sensitive.
- [x] Replacement is described as a conflicting transaction under local policy, not an edit to the original transaction.
- [x] Missing-input transaction storage is separated from the ordinary mempool.
- [x] Reorganization behavior is qualified by validity and applicable constraints.
- [x] Miners are not required to use one public node's mempool.
- [x] Exact approved glossary definitions are used.
- [x] Planned internal links contain no live URLs.
- [x] No em dash or en dash character appears.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-18
- Notes:
  - Verified Bitcoin Core v31.0 mempool storage, transaction relationships, replacement, eviction, expiry, block-removal, and reorganization descriptions.
  - Verified transaction relay and missing-input transaction handling remain separate from consensus confirmation.
  - Verified local policy is not presented as a network-wide validity rule.
  - Verified mining-template construction can use local or private transaction sources and is not bound to a public mempool snapshot.
  - Verified fee estimates, mempool ordering, and propagation claims retain explicit local and statistical boundaries.
  - Confirmed exact approved glossary-definition synchronization.
  - Confirmed source entries contain precise Supports notes. Moving Bitcoin Core master-branch and RPC paths remain flagged for publication-time accessibility review.
  - Confirmed planned internal links remain inactive until real destination pages and URLs exist.

## 12. Illustration brief

### Illustration 1

- Concept title: One Network, Different Mempools
- Educational purpose: Show why compatible nodes can hold different unconfirmed transaction sets.
- Recommended placement: After the section titled The mempool belongs to a node.
- Visual description: Old ocean-current chart with three Bitcoin node stations connected by peer routes. Overlapping transaction cards appear in all three local pools, while conflicting, low-fee, and not-yet-seen cards appear in only one or two.
- Required labels: Node A mempool, Node B mempool, Node C mempool, Shared transaction, Local policy, Different arrival order, Conflict
- Caption: Each node builds its own mempool from the transactions it receives and the policy it applies.
- Alt text: Technical network diagram showing three Bitcoin nodes with overlapping but non-identical local mempools caused by policy, conflicts, and transaction arrival order.
- Image orientation: Landscape
- Mobile crop notes: Stack the three node stations vertically and keep one shared transaction plus one differing transaction visible in each pool.
- Status: PLANNED

### Illustration 2

- Concept title: Transaction Admission Station
- Educational purpose: Separate consensus checks, local policy, and relay.
- Recommended placement: After the section titled Consensus validity and mempool acceptance are different tests.
- Visual description: Field-guide flow showing a submitted transaction entering consensus-context checks, then a local-policy gate, then the node mempool, and finally optional peer relay. Rejected paths are labeled Invalid, Missing inputs, or Policy rejected.
- Required labels: Submitted transaction, Applicable validation checks, Local policy, Mempool, Peer relay, Invalid, Missing inputs, Policy rejected
- Caption: A node evaluates an unconfirmed transaction before storing or relaying it, and another node may reach a different policy result.
- Alt text: Editorial flow diagram showing a Bitcoin transaction passing validation-context and local-policy checks before entering a node's mempool and being relayed.
- Image orientation: Landscape
- Mobile crop notes: Use a single vertical flow with the three rejection branches placed beside their corresponding checks.
- Status: PLANNED

### Illustration 3

- Concept title: How Transactions Leave a Mempool
- Educational purpose: Explain that confirmation is only one of several removal paths.
- Recommended placement: After the section titled Low-fee transactions can remain, disappear, or return.
- Visual description: Infrastructure-manual map centered on a local mempool. Exit routes lead to Confirmed in block, Replaced, Conflicted, Expired, and Evicted. A reorganization loop returns an eligible transaction from a disconnected block to reconsideration.
- Required labels: Local mempool, Confirmed, Replaced, Conflicted, Expired, Evicted, Reorganization, Reconsider
- Caption: Transactions can leave a node's mempool for several reasons, and a reorganization can make some confirmed transactions unconfirmed again.
- Alt text: Diagram showing Bitcoin mempool transactions exiting through confirmation, replacement, conflict, expiry, or eviction, with a reorganization path returning some transactions for reconsideration.
- Image orientation: Square
- Mobile crop notes: Keep the mempool at center with five short exit labels and one curved reorganization arrow.
- Status: PLANNED
