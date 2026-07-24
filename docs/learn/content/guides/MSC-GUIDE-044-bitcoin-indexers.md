---
registry_id: MSC-GUIDE-044
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: How Bitcoin Indexers Work
handle: bitcoin-indexers
category: Building on Bitcoin
subcategory: Development
depth: Deep
format: Technical Analysis
primary_path: Build on Bitcoin
secondary_paths:
  - Understand the Network
author_display: Mempool Surf Club Editorial
reviewed_date: null
copy_locked_date: null
---

# How Bitcoin Indexers Work

## 1. Introductory deck

A Bitcoin indexer reads ordered blockchain or mempool data and builds a database optimized for questions the validating node does not answer directly. This guide explains native Bitcoin Core data, optional indexes, external address and script indexes, application-protocol state, reorganizations, pruning, consistency, and the point where useful derived data stops being Bitcoin consensus.

## 2. Full article

Bitcoin’s blockchain is an ordered history of blocks and transactions. A validating node uses that history to maintain the active chain and the current set of spendable outputs. Applications often need different questions answered quickly:

- Which transactions touched this script?
- Which transaction spent this output?
- What is the history of this address?
- Which blocks may contain wallet-relevant scripts?
- Which inscriptions, token operations, or application events were interpreted from a transaction?
- How far behind the current chain tip is a service?
- What changed during a reorganization?

An indexer preprocesses Bitcoin data into keys, tables, filters, or event records that make those queries efficient. The index can be accurate and reproducible while remaining outside Bitcoin consensus.

### Validation and indexing are different jobs

Validation asks whether blocks and transactions satisfy Bitcoin’s rules and belong to the node’s accepted chain.

Indexing asks how to organize validated or observed data for later retrieval.

A validating node can operate without an address-history index. An indexer can build address history while relying on another process for validation. The indexer’s database does not become consensus state merely because it was built from a valid chain.

This separation produces several trust questions:

- Which node or chain source supplies blocks?
- Does the indexer verify raw data or trust the source?
- Which chain tip is indexed?
- How are disconnected blocks rolled back?
- Which fields are direct Bitcoin data and which are derived?
- How can the index be rebuilt or checked?
- What happens if database state and node state diverge?

An indexer should document those boundaries explicitly.

### Bitcoin Core chainstate

Bitcoin Core’s chainstate is required validation data. It represents the current UTXO set for a chainstate: outputs that exist, have not been spent, and can be checked when validating new transactions and blocks.

The UTXO set is not a complete transaction-history database. Once an output is spent, it is no longer part of the current UTXO set. Chainstate therefore cannot answer arbitrary questions about every historical transaction or every script that appeared.

Bitcoin Core may maintain more than one chainstate during assumeUTXO-related operation, but that is still validation architecture, not a universal application index.

### Bitcoin Core’s block index

Bitcoin Core’s block index stores metadata about known block headers and block files, including chain relationships, heights, work, status, and disk positions needed to manage validation and chain selection.

The block index is not the same as the raw block files. It is also not an address index or explorer database. It helps Bitcoin Core locate and reason about blocks; it does not map every address to all transactions.

A node can know that a block existed and was validated while no longer retaining its full block data after pruning.

### The UTXO set

The UTXO set maps spendable outpoints to output information needed for validation. It supports questions such as whether an input refers to an existing unspent output and what script and amount that output contains.

It does not directly contain:

- Complete transaction history
- Spent output history
- Address balances across all historical activity
- Application token balances
- Ordinal identities
- Explorer labels
- Mempool state

An address balance can be derived from a set of UTXOs associated with scripts, but Bitcoin consensus does not define addresses as accounts with native balances. The mapping from address encoding to scripts and then to indexed outputs is application logic.

### Optional Bitcoin Core indexes in version 31.1

Bitcoin Core 31.1 exposes several optional indexes in addition to required validation data.

**Full transaction index (`txindex`)** maps transaction IDs to locations in stored blocks so `getrawtransaction` can retrieve arbitrary confirmed transactions without the caller supplying a block hash. It does not map addresses to transaction history.

**Transaction output spender index (`txospenderindex`)** supports lookup of transactions spending specified previous outputs through the relevant RPC. It is an outpoint-to-spender index, not a universal address index.

**Compact block-filter index (`blockfilterindex`)** stores BIP 158 compact filters by block. It can support BIP 157 filter serving and wallet-style scanning. A filter can indicate a possible match and requires the client to inspect matching block data.

**Coin statistics index (`coinstatsindex`)** supports efficient historical UTXO-set statistics for `gettxoutsetinfo` at indexed block points. It is not a list of all coins or addresses.

These indexes are implementation features. Other Bitcoin implementations may expose different indexes or interfaces. Enabling them consumes disk, processing time, and synchronization work.

### `txindex` is not an address index

A transaction index answers “where is the transaction with this transaction ID?” It does not answer “which transactions involved this address?”

Address history requires indexing scripts or address representations across outputs and, often, the previous outputs spent by inputs. That is a different key structure and a larger application database.

The same distinction applies to an archival node. Retaining all blocks provides the source data needed to build many indexes, but it does not automatically create an explorer, Electrum server, wallet history, token index, or address API.

### Pruning and historical block access

Pruning allows Bitcoin Core to delete old block files after validation while retaining enough chainstate and recent block data to continue operating. As of Bitcoin Core 31.1, pruning is incompatible with `txindex`.

Compact block-filter indexing has supported pruning in current Bitcoin Core for several releases, subject to the index being synchronized and the node retaining the data needed during operation. Coin statistics and other index behavior must be checked against the exact release and configuration.

External indexers may require historical blocks during initial synchronization, rebuilds, or rollback recovery. Some can operate after building their own complete database and then use a pruned node for incremental updates. Others require an unpruned node or separate block archive.

“Runs with pruning” is therefore an implementation-specific claim. It may mean initial indexing still required full history, that only recent rebuilds are possible, or that the indexer keeps its own copy of derived data.

### External address and script indexes

External indexers commonly scan every block and build keys based on locking scripts, script hashes, addresses, outpoints, transaction IDs, block heights, and spending relationships.

Indexing by script is more fundamental than indexing by address. An address is an encoding for certain script templates. Not every script has one standard address representation, and the same application may support several address types.

To build complete script history, an indexer usually records both outputs that create matching scripts and inputs that spend previous outputs. Processing an input may require access to the previous output’s script and amount.

Database design affects query speed, storage, reorganization handling, and migration complexity. A compact index may make one query fast and another expensive. There is no universal schema.

### Electrum server models

Electrum servers expose script-hash histories, balances, UTXOs, transactions, headers, fee estimates, and subscriptions. They depend on an index that maps script hashes to relevant transactions.

Different server implementations use different storage engines and indexing strategies. `electrs` is a Rust implementation commonly used for personal Electrum service and as a basis for Esplora-style backends. Fulcrum is an independently maintained C++ implementation designed for high-performance Electrum protocol service.

Protocol compatibility does not mean database equivalence. Two servers can implement the same method while differing in mempool ordering, performance limits, protocol versions, pruning requirements, caching, and reorganization behavior.

The Electrum protocol itself is an application protocol. Its script-hash status and history rules are not Bitcoin consensus rules.

### Esplora and electrs-style stacks

Esplora is an explorer interface and HTTP API typically backed by an indexed service. The commonly referenced stack separates the explorer frontend from an electrs-derived backend that provides transaction, script, address, block, mempool, and fee endpoints.

The HTTP response may combine raw transaction data with index-derived status, spending relationships, and address history. The service’s node validates Bitcoin; the indexer organizes data; the API serializes a view; the frontend presents it.

A hosted Esplora endpoint adds another boundary: the user depends on the operator’s node, index, cache, rate limits, logging, and uptime.

The Esplora repository and deployment stack have had periods where release tagging did not map cleanly to one versioned backend artifact. Production operators should pin exact container, commit, or package versions rather than rely on a moving “latest” label.

### Wallet-specific compact-filter scanning

Compact block filters let a wallet test whether a block may contain scripts it cares about without asking a server for each address or script hash.

The wallet downloads and verifies a filter-header chain, matches local scripts against filters, and retrieves candidate blocks. False positives are expected; the wallet scans the block to determine whether a real match exists.

This is a wallet synchronization database rather than a universal address index. It usually tracks only the wallet’s own scripts and transactions. It can improve privacy relative to direct hosted address queries, but it still depends on correct header, filter, and block handling and on sources not withholding data undetected.

### Application-specific indexers

Applications can derive state that Bitcoin does not natively represent.

An Ord indexer assigns ordinal numbers and tracks interpreted sat locations. A Runes indexer interprets runestones and derives balances, etching state, and transfers. A BRC-20 indexer parses selected inscription content and applies an application rule set to deploy, mint, and transfer operations.

Bitcoin validates the underlying transactions and blocks. It does not validate those application balances or identities as native consensus state.

Application indexes must define:

- Which transactions or witness fields count as events
- Parsing and validity rules
- Event ordering
- Block and transaction ordering
- Version activation points
- Duplicate or malformed operation handling
- Reorganization rollback
- Historical bug compatibility
- Database migrations

Two indexers can accept the same Bitcoin chain and disagree because they apply different application rules, versions, or historical interpretations.

### Event extraction and schema design

Indexing begins with deterministic event extraction. For each connected block, the indexer identifies relevant transactions, inputs, outputs, scripts, witness data, and protocol messages.

It then maps events into database keys. Common keys include:

- Block hash or height
- Transaction ID and position
- Outpoint
- Script or script hash
- Address representation
- Application identifier
- Owner or balance key
- Event sequence

Ordering must be explicit. Bitcoin orders blocks in a chain and transactions within each block. Inputs and outputs also have order. Some application protocols assign meaning to that order.

Database records should retain enough source references to explain how a derived value was produced. A balance without event history is difficult to audit or rebuild.

### Chain tips, checkpoints, and incremental updates

An indexer needs a recorded chain tip: usually block hash and height, not height alone. On startup, it compares that tip with the node’s active chain.

A checkpoint can record a known processed block and database state. It speeds restart and consistency checks, but it does not replace validation. A stale or incorrect checkpoint can anchor the index to the wrong history.

Incremental updates process new blocks after the stored tip. The indexer should commit block-derived changes atomically or use a journal so a crash does not leave half-applied state.

Tip lag is an important operational metric. An API can be healthy while its index is several blocks behind.

### Undo data and reorganization rollback

A reorganization disconnects one or more blocks and connects a replacement branch. An indexer must reverse every state change caused by disconnected blocks.

One model stores **undo data** for each block: prior values or inverse operations needed to restore the earlier state. Another model replays from a checkpoint before the fork. Some databases use versioned records or append-only event logs.

Rollback must cover more than balances. It may need to reverse:

- Created and spent outputs
- Address histories
- Transaction confirmation metadata
- Application events
- Token balances
- Inscription locations
- Cached summaries
- API notification state

After rollback, the replacement blocks are processed in order. Failure to reverse one table can produce internally inconsistent results even when the chain tip appears correct.

### Replay and rebuilds

A replay reprocesses events from retained raw data or a checkpoint. A full rebuild discards the index and scans the source history again.

Rebuild capability is a security and maintenance feature. It allows recovery from corruption, schema changes, or discovered logic bugs. It also exposes dependencies: an indexer cannot rebuild old history from a pruned node if the needed blocks are unavailable elsewhere.

Rebuilds should be versioned and tested. Application protocols sometimes preserve historical behavior that newer code would otherwise interpret differently. A “clean rebuild” can disagree with an older database if consensus-like application rules were not stable.

### Mempool indexing

An indexer may add unconfirmed transactions to provisional tables. Mempool indexing is harder than confirmed block indexing because there is no universal ordered mempool.

Nodes differ by policy, arrival order, package acceptance, replacement, eviction, expiration, and connectivity. A transaction can be present on one node and absent on another.

Mempool records should be labeled provisional and tied to a source node. They must be removed or updated when transactions confirm, conflict, are replaced, or disappear. Absence from the source mempool does not prove invalidity.

Application protocols can produce especially fragile unconfirmed state. Two valid unconfirmed operations may conflict or confirm in a different order. A displayed pending balance should not be presented as confirmed application state.

### Storage and performance costs

Indexes trade storage and write work for query speed. Costs depend on chain history, schema duplication, compression, cache size, database engine, supported queries, and whether previous outputs are denormalized.

Initial synchronization can be CPU-, disk-, and I/O-intensive. Indexers may read all blocks, resolve inputs, build multiple column families, compact databases, and calculate summaries.

Incremental updates are smaller but still need atomicity and rollback. Caches improve read performance while creating freshness and invalidation responsibilities.

Operators should measure actual disk growth, synchronization time, memory, compaction, and backup behavior for the exact version and configuration. Published performance claims are not universal guarantees.

### Consistency models and partial failures

A node and indexer are separate systems. The node may advance while the indexer is stopped. The indexer may write one table and fail before another. An API process may cache old results after the database catches up.

Possible consistency models include:

- Strong per-block atomic updates
- Eventual consistency across tables or services
- Read snapshots tied to a chain tip
- Append-only events with asynchronously built summaries

The API should expose enough chain context to interpret results. A response may include indexed height, tip hash, or freshness timestamp.

Partial failures should not be hidden as empty results. “No history” is different from “index unavailable,” “not synchronized,” or “pruned source data missing.”

### Version migrations and state checks

Schema changes may require migrations or rebuilds. Migrations should record database version, software version, and completion status. Operators need rollback or restore procedures if an upgrade fails.

Consistency checks can include:

- Stored tip exists on the node’s active chain
- Indexed block count and hashes match checkpoints
- UTXO-derived totals reconcile where intended
- Event counts match source transaction references
- State hashes or Merkleized summaries match between replicas
- No table is ahead of the committed tip
- Undo data exists for the supported rollback window

A state hash can detect divergence between index replicas that use the same rules. It does not prove the rules themselves are correct or part of Bitcoin consensus.

### Indexer divergence

Two indexers may diverge because of:

- Different Bitcoin chain tips
- Missed or misordered blocks
- Reorganization rollback bugs
- Mempool differences
- Schema or migration bugs
- Application-rule version differences
- Historical compatibility choices
- Corrupt source or database data
- Parser differences

Monitoring should compare tip hash, indexed height, software version, database version, and selected deterministic query results.

Divergence should be investigated at the earliest differing block or event. Comparing only final balances can hide the cause.

### APIs built on indexes

Explorer and wallet APIs turn index records into responses. They may add pagination, caching, labels, fee estimates, confirmation counts, and application summaries.

The API layer should distinguish:

- Raw transaction or block data
- Node-validated chain membership
- Index-derived history
- Mempool observations
- Cached values
- Application-derived state

An index-backed API can be useful without being authoritative for consensus. Critical clients can verify referenced blocks, transactions, scripts, and outpoints against a validating node.

### Privacy and hosted indexers

Address and script queries reveal what the client is interested in. Repeated queries can link addresses, transactions, timing, accounts, and IP addresses. Extended public key queries can reveal a broad wallet scope.

A hosted indexer also sees authentication identifiers and request patterns and may retain logs. TLS protects transport in transit but does not prevent the provider from observing the request.

Self-hosting reduces third-party query disclosure and provider dependence. It adds hardware, storage, patching, monitoring, backup, and availability responsibilities. Neither model guarantees privacy or uptime.

### Verifying indexed results

Verification depends on the claim.

A transaction’s bytes can be fetched and decoded. A block header can be checked for hash and proof of work. A Merkle proof can show a transaction commitment under that header. A validating node can confirm active-chain membership and consensus validity. Scripts and outpoints can be inspected directly.

An address history requires checking each mapped script and transaction. An application balance requires replaying the application’s rules. A mempool status requires identifying the observing node and time.

The more derived the claim, the more application logic must be reproduced to verify it.

### The working model

Bitcoin Core’s required chainstate and block index support validation. Optional Bitcoin Core indexes add specific lookup capabilities. External indexers build address, script, explorer, wallet, or application views. API layers serve those views. None of those databases replaces Bitcoin consensus.

A validating node can accept a chain while two indexers disagree about address summaries, mempool state, ordinal locations, Rune balances, BRC-20 balances, or explorer labels. The disagreement may come from versions, ordering, rollback, parsing, or schema state rather than from Bitcoin validity.

A reliable indexer records its source chain tip, applies blocks atomically, stores or reconstructs undo state, labels mempool data as provisional, exposes freshness, supports rebuilds, and makes derived rules auditable.

The index is a map of Bitcoin data. It is not Bitcoin itself.

## 3. Key Terms

- **Indexer:** Software that transforms ordered Bitcoin data into a database optimized for selected queries.
- **Chainstate:** Bitcoin Core validation data representing a current UTXO set for a chainstate.
- **Block index:** Bitcoin Core metadata for known blocks, chain relationships, status, work, and storage locations.
- **UTXO set:** The set of currently unspent transaction outputs under the accepted chain.
- **Transaction index:** An index mapping transaction IDs to stored transaction locations.
- **Address index:** An external mapping from addresses or scripts to transaction history; it is not created by `txindex`.
- **Compact block filter:** A probabilistic block summary defined by BIP 158 for matching scripts.
- **Coin statistics index:** A Bitcoin Core optional index supporting historical UTXO-set statistics.
- **Chain tip:** The block currently recorded as the end of a node or indexer’s active chain.
- **Checkpoint:** A stored processed point used for restart, replay, or consistency checks.
- **Undo data:** Information needed to reverse index changes from a disconnected block.
- **Reorganization:** A switch to a different accepted chain requiring rollback and replay.
- **Mempool:** A node’s local set of unconfirmed transactions accepted under current policy.
- **Derived state:** Data calculated by an indexer or application rather than enforced directly by Bitcoin consensus.
- **Replay:** Reprocessing source events to reconstruct index state.

## 4. Sources

1. **Bitcoin Core Downloads** | Bitcoin Core project
   - URL: https://bitcoincore.org/en/download/
   - Supports: Bitcoin Core 31.1 as the current release used for dated implementation references on July 23, 2026.
2. **Bitcoin Core v31.1 Source Tree** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/src
   - Supports: Dated implementation evidence for validation, chainstate, block storage, pruning, indexes, mempool, and RPC behavior.
3. **Bitcoin Core v31.1 Initialization Source** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/init.cpp
   - Supports: Current index configuration options for `txindex`, `txospenderindex`, `blockfilterindex`, and `coinstatsindex`, plus the pruning and `txindex` incompatibility.
4. **Bitcoin Core Chainstate Documentation** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/design/assumeutxo.md
   - Supports: Bitcoin Core chainstate architecture and the distinction between validation state and application indexes.
5. **Bitcoin Core Block Index Source** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/chain.h
   - Supports: Dated block-index metadata, chain relationships, height, work, status, and storage-location fields.
6. **Bitcoin Core Transaction Index Source** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/src/index
   - Supports: Current optional transaction, transaction-output spender, compact-filter, and coin-statistics index implementations.
7. **Bitcoin Core Blockchain RPC Source** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/rpc/blockchain.cpp
   - Supports: UTXO-set, chain-tip, block, index-info, and coin-statistics RPC behavior.
8. **Bitcoin Core Raw Transaction RPC Source** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/rpc/rawtransaction.cpp
   - Supports: Transaction lookup and spender-query behavior associated with optional indexes.
9. **Bitcoin Core Pruning Documentation** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/release-notes/release-notes-22.0.md
   - Supports: Historical implementation evidence that compact block-filter indexes can be maintained with pruning; current configuration is separately supported by v31.1 source.
10. **BIP 157: Client Side Block Filtering** | Olaoluwa Osuntokun, Alex Akselrod, and Jim Posen
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0157.mediawiki
    - Supports: Peer serving and retrieval of compact block filters and filter headers.
11. **BIP 158: Compact Block Filters** | Olaoluwa Osuntokun and Alex Akselrod
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0158.mediawiki
    - Supports: Compact-filter construction, matching, and false-positive behavior.
12. **Electrum Protocol Documentation** | Electrum protocol contributors
    - URL: https://electrum-protocol.readthedocs.io/en/latest/
    - Supports: Script-hash histories, balances, UTXOs, subscriptions, mempool ordering, and protocol semantics served by external indexes.
13. **electrs Repository** | Roman Zeyde and contributors
    - URL: https://github.com/romanz/electrs
    - Supports: A maintained Rust Electrum server architecture and its Bitcoin-backed script-history indexing model.
14. **electrs Releases** | electrs contributors
    - URL: https://github.com/romanz/electrs/releases
    - Supports: Release and maintenance history used to date deployment claims; release tagging should be checked against current commits and package use.
15. **Esplora Repository** | Blockstream contributors
    - URL: https://github.com/Blockstream/esplora
    - Supports: Explorer frontend behavior, deployment architecture, and dependence on an indexed backend.
16. **Esplora API Documentation** | Blockstream contributors
    - URL: https://github.com/Blockstream/esplora/blob/master/API.md
    - Supports: Indexed transaction, address, script, block, UTXO, fee, and mempool endpoints.
17. **Blockstream electrs Repository** | Blockstream contributors
    - URL: https://github.com/Blockstream/electrs
    - Supports: The electrs-derived HTTP and Electrum backend commonly used with Esplora deployments.
18. **Fulcrum Repository** | Calin Culianu and contributors
    - URL: https://github.com/cculianu/Fulcrum
    - Supports: An independently maintained C++ Electrum server and a distinct high-performance index architecture.
19. **Fulcrum Releases** | Fulcrum contributors
    - URL: https://github.com/cculianu/Fulcrum/releases
    - Supports: Current maintenance and release evidence, including the 2.1.x release line observed in 2026.
20. **Ordinal Theory Handbook** | Ord project contributors
    - URL: https://docs.ordinals.com/
    - Supports: Ordinal numbering, inscription, and application-index concepts derived from Bitcoin transaction history.
21. **Ord Repository** | Ord project contributors
    - URL: https://github.com/ordinals/ord
    - Supports: A maintained application-protocol indexer, database, explorer, and reindex behavior.
22. **Runes Specification** | Ord project contributors
    - URL: https://docs.ordinals.com/runes/specification.html
    - Supports: Runestone event interpretation and Rune application state derived outside Bitcoin consensus.
23. **BRC-20 Index Specification Repository** | Best in Slot contributors
    - URL: https://github.com/bestinslot-xyz/brc20-index
    - Supports: One maintained implementation’s explicit BRC-20 parsing and indexing rules; it is implementation evidence, not universal Bitcoin behavior.
24. **Bitcoin Core Functional Index Tests** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/test/functional
    - Supports: Current implementation tests for optional indexes, pruning interactions, reorganization handling, RPC queries, and index synchronization.
25. **Bitcoin Core ZMQ Documentation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/zmq.md
    - Supports: Block connection and disconnection notifications, mempool sequence events, message loss, and subscriber reconciliation.
26. **BIP 94: Testnet 4** | Fabian Jahr
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0094.mediawiki
    - Supports: Current testnet4 chain identity and test-network context relevant to index separation by network.

## 5. SEO title

How Bitcoin Indexers Work | Mempool Surf Club

## 6. Meta description

Learn how Bitcoin indexers build address, script, transaction, wallet, explorer, and application state—and why their databases are not consensus.

## 7. Page excerpt

A technical guide to Bitcoin indexing, covering chainstate, optional Bitcoin Core indexes, address and script databases, Electrum and Esplora stacks, pruning, mempool state, reorganizations, rebuilds, privacy, and verification.

## 8. Estimated reading time

21 to 25 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-043 | Bitcoin APIs Explained
- Prerequisite: MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
- Prerequisite: MSC-GUIDE-019 | What Is a Bitcoin Node?
- Prerequisite: MSC-GUIDE-022 | How the Bitcoin Mempool Works
- Prerequisite: MSC-GUIDE-023 | How Bitcoin Transactions Are Broadcast
- Branch: MSC-GUIDE-037 | What Are Bitcoin Ordinals?
- Branch: MSC-GUIDE-038 | How the Runes Protocol Works
- Branch: MSC-GUIDE-039 | What Is BRC-20 on Bitcoin?
- Branch: MSC-GUIDE-042 | How Bitcoin Wallet Integrations Work
- Return: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] Registry metadata matches the approved registry.
- [x] Bitcoin consensus validation is separated from Bitcoin Core implementation and index behavior.
- [x] Consensus is separated from node policy and mempool acceptance.
- [x] Node validation is separated from indexer, API, explorer, wallet, and application responses.
- [x] Confirmed-chain records are separated from local and provisional mempool records.
- [x] Required validation data is separated from optional Bitcoin Core indexes and external indexes.
- [x] `txindex` is not described as an address index.
- [x] An archival node is not described as automatically providing explorer, wallet, address, or application indexes.
- [x] Current Bitcoin Core 31.1 indexes and pruning constraints are dated.
- [x] External Electrum, Esplora, electrs, Fulcrum, wallet, and application-index architectures are distinguished.
- [x] Reorganization rollback, undo data, replay, rebuild, and partial-failure behavior are explicit.
- [x] Mempool divergence and provisional application state are explicit.
- [x] Self-hosted and hosted indexer trust, privacy, availability, storage, and maintenance boundaries are explicit.
- [x] No private-key or seed exposure guidance is included.
- [x] No indexer, provider, implementation, or application rule set is presented as universally authoritative.
- [x] No fee, confirmation, uptime, privacy, recovery, security, or compatibility guarantee is made.
- [x] Sources are mapped only to claims they support.
- [x] No price, investment, market, or promotional claims are included.
- [x] Planned internal links remain inactive and do not imply publication.

## 11. Human verification

- Reviewer:
- Review date:
- Notes: Pending verification of Bitcoin Core 31.1 required and optional index behavior, pruning and historical-data constraints, electrs, Esplora, and Fulcrum maintenance status, external index schemas, reorganization rollback and replay behavior, mempool divergence, consistency checks, and all application-derived state boundaries.

## 12. Illustration brief

### Illustration 1

- Concept title: Block-to-Index Database Pipeline
- Educational purpose: Show how validated blocks become script, transaction, address, wallet, and application indexes without turning those databases into consensus.
- Recommended placement: After the section Validation and indexing are different jobs.
- Visual description: Vintage technical pipeline beginning with a validating node and ordered blocks, then splitting through event extraction into several labeled database channels and an API layer.
- Required labels: Validating node, Ordered blocks, Event extraction, Transaction index, Script index, Wallet index, Application index, API, Derived state
- Caption: Validation establishes the accepted Bitcoin history; indexers reorganize that history for selected queries.
- Alt text: Layered pipeline showing validated Bitcoin blocks feeding transaction, script, wallet, and application indexes before an API layer.
- Image orientation: Landscape
- Mobile crop notes: Stack node, block stream, extraction, index databases, and API vertically.
- Status: PLANNED

### Illustration 2

- Concept title: Reorganization Rollback and Replay Chart
- Educational purpose: Explain how an indexer disconnects old blocks, restores prior state, and applies a replacement branch.
- Recommended placement: After the section Undo data and reorganization rollback.
- Visual description: Nautical fork chart with an old chain route, a marked common ancestor, rollback arrows using undo records, and a replacement route processed forward through replay.
- Required labels: Stored tip, Disconnected block, Common ancestor, Undo data, Rollback, Replacement block, Replay, New indexed tip
- Caption: An indexer must reverse every derived change from disconnected blocks before applying the replacement branch.
- Alt text: Technical chain-fork diagram showing index rollback to a common ancestor and replay along a replacement Bitcoin branch.
- Image orientation: Landscape
- Mobile crop notes: Use a vertical fork with rollback on the left and replay on the right.
- Status: PLANNED

### Illustration 3

- Concept title: Native, Optional, and External Index Layers
- Educational purpose: Distinguish Bitcoin Core validation data, optional Bitcoin Core indexes, and external address or application indexes.
- Recommended placement: After the section Optional Bitcoin Core indexes in version 31.1.
- Visual description: Three-tier cartographic cutaway with chainstate and block index at the foundation, optional transaction, spender, filter, and coin-statistics indexes in the middle, and external address, explorer, wallet, Ord, Runes, and BRC-20 indexes above.
- Required labels: Required validation data, Chainstate, Block index, txindex, txospenderindex, blockfilterindex, coinstatsindex, Address index, Explorer database, Application index, Not consensus
- Caption: Bitcoin Core’s internal and optional indexes have defined purposes; external indexes add broader queries and application state.
- Alt text: Three-layer technical diagram separating required Bitcoin Core data, optional Core indexes, and external address and application indexes.
- Image orientation: Landscape
- Mobile crop notes: Present the three layers as stacked cards with a persistent “not consensus” marker on the external layer.
- Status: PLANNED
