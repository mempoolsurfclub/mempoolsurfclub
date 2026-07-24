---
registry_id: MSC-GUIDE-043
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: Bitcoin APIs Explained
handle: bitcoin-apis
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

# Bitcoin APIs Explained

## 1. Introductory deck

“Bitcoin API” can describe a node administration interface, a wallet RPC, a notification stream, a peer protocol, an indexed block-explorer service, or a hosted infrastructure product. This guide explains those boundaries, the data each interface can and cannot prove, and the operational rules applications need for authentication, units, retries, reorganizations, privacy, and version changes.

## 2. Full article

An application communicates with a node, wallet, indexer, Lightning implementation, or provider through an interface. The response reflects that system’s chain tip, configuration, indexes, policy, cache, software version, and local observations.

That distinction matters because different interfaces can return values that look similar while carrying different evidence. A block hash from a validating node, an address balance from an indexer, a fee estimate from a hosted service, and a transaction status from an application database are not interchangeable claims.

An API design begins by naming the producer of every response.

### What “Bitcoin API” can mean

The term can refer to several interface families:

- Bitcoin Core JSON-RPC for node and wallet operations
- Bitcoin Core REST for limited read access
- Bitcoin Core ZMQ notifications
- The Bitcoin peer-to-peer protocol
- Electrum-protocol servers
- Esplora-style HTTP APIs
- Hosted block-explorer or infrastructure APIs
- Lightning node APIs
- An application-facing API built in front of any of the above

Each family has different authentication, data, state, and failure properties. An application should not expose a raw node-administration interface simply because it is convenient. It should translate node and wallet capabilities into a narrower API with explicit authorization and business rules.

### Bitcoin Core JSON-RPC

Bitcoin Core JSON-RPC is a request-response interface served by `bitcoind` and, when enabled, `bitcoin-qt`. As of Bitcoin Core 31.1, the root endpoint handles node RPCs and can handle wallet RPCs when exactly one wallet is loaded. Wallet-specific endpoints use `/wallet/<walletname>/`.

Node RPCs include chain, mempool, peer, network, mining, raw-transaction, and administrative methods. Wallet RPCs operate on loaded wallet state, including addresses, balances, PSBTs, signing, transaction creation, locks, and fee bumping.

The distinction is important. A node RPC such as a block query reflects the node’s chain and optional indexes. A wallet RPC reflects a particular wallet database and its synchronization state. A wallet balance is not a universal property of the chain; it is the wallet’s interpretation of transactions relevant to its scripts.

Bitcoin Core’s RPC interface is implicitly versioned by the major release. Fields, defaults, deprecations, and method behavior can change. Clients should pin versions, test response schemas, and read release notes rather than assume indefinite compatibility.

### Cookie authentication and `rpcauth`

Bitcoin Core can authenticate local RPC clients with a temporary cookie file. The cookie contains generated credentials and is replaced when the node restarts. File permissions and local process boundaries are therefore part of the security model.

The `rpcauth` configuration option supports salted password authentication without storing the plaintext password in the configuration file. It still requires secure transport and careful secret handling on the client side.

Authentication answers “who presented valid credentials.” It does not provide fine-grained authorization for every RPC method. A credential able to reach unrestricted RPC may have broad control over node, wallet, or administrative operations.

### Network exposure and transport security

Bitcoin Core documentation explicitly warns against exposing RPC directly to the public internet. RPC authentication does not encrypt traffic, and the interface is not designed as a hardened public application endpoint.

Remote administration should be limited to secure private networks or protected tunnels, with firewalling and least-privilege credentials. A public web or mobile application should call an application service that performs authorization, validation, rate limiting, and response normalization. That service can then communicate with Bitcoin Core over a restricted internal boundary.

### Bitcoin Core REST

Bitcoin Core provides an optional REST interface for selected read operations. It can return blocks, headers, transactions, chain information, UTXO information, and related data in defined encodings.

REST is narrower than RPC and does not replace wallet or administrative methods. It also does not add an address-history index. The availability of a REST endpoint does not mean its response is safe to expose without an application security layer.

Applications should identify whether a REST response comes directly from the validating node, whether it requires an optional index, and how it behaves during pruning or reorganization.

### ZMQ notifications

Bitcoin Core ZMQ is a one-way publish-subscribe notification interface. Topics can announce raw or hashed blocks and transactions, sequence changes, mempool additions and removals, and block connections or disconnections.

ZMQ is useful when an application needs low-latency notification without polling every method. It is not a durable event log. Notifications can be lost during transport, a subscriber can disconnect, and the application can start after earlier events occurred.

Subscribers should track sequence information where available, detect gaps, and reconcile against RPC or another authoritative state query. The subscriber must retrieve the active chain from its last known point rather than assume every notification extends the previous tip.

Bitcoin Core’s ZMQ publication interface does not authenticate subscribers. It should be exposed only within a trusted network boundary.

### The Bitcoin peer-to-peer protocol

The P2P protocol carries version negotiation, peer addresses, inventory announcements, transactions, headers, blocks, compact blocks, filters, and other messages between nodes.

It is not an ordinary REST API. Peers are untrusted network participants. Receiving a transaction or block does not make it valid. A P2P client must decide what it validates, how it selects a chain, how it handles malformed messages, and how it limits resource consumption.

A full node uses the P2P protocol as one input to its validation process. An application that implements only a small subset may receive useful data but should not describe that as equivalent to full validation.

Current Bitcoin Core also supports BIP 324 version 2 transport, but transport encryption and peer authentication properties must not be confused with application authorization or consensus validation.

### Electrum protocol servers

The Electrum protocol uses JSON-RPC over stream transports such as TCP, TLS, or WebSockets. Clients negotiate a protocol version and can request headers, transactions, script-hash histories, balances, UTXOs, fee estimates, and subscriptions.

Script-hash methods require an index that maps scripts to transaction history. Bitcoin Core does not provide that universal index by default. The Electrum server therefore becomes a derived-data system attached to a node or chain database.

Protocol version 1.6 tightened version negotiation and mempool ordering behavior. Clients and servers may support different version ranges, so negotiation and compatibility should be tested rather than assumed.

Headers and Merkle proofs can support evidence that a transaction was included under a block header. They do not independently validate every Bitcoin consensus rule unless the client performs the additional validation required for that claim.

### Esplora-style HTTP APIs

Esplora-style APIs expose HTTP resources for blocks, transactions, addresses, scripts, UTXOs, fee estimates, and mempool information. The API is usually backed by an indexer such as an electrs-derived backend rather than by Bitcoin Core alone.

Fields may combine raw Bitcoin data with indexed, cached, or computed values. Address history and spending relationships require indexes. Fee estimates are estimates. Mempool entries reflect the backend’s local node and policy.

An Esplora endpoint can be self-hosted or hosted by another organization. The protocol shape does not determine the trust model. Applications should record network, chain tip, backend version, cache behavior, and provider failure expectations.

### Hosted explorer and infrastructure APIs

Hosted providers may add account authentication, quotas, webhooks, historical analytics, transaction broadcast, address monitoring, fiat conversions, or proprietary risk fields.

Those features can be useful, but they are not part of Bitcoin consensus. A provider’s “confirmed,” “safe,” “final,” “risk,” or “balance” field must be mapped to documented inputs and logic.

Hosted services introduce:

- Availability and rate-limit dependencies
- Provider authentication and account risk
- Privacy leakage from addresses, xpubs, transactions, and IPs
- Version and deprecation risk
- Policy and chain-tip differences
- Logging and data-retention dependencies
- Cached or delayed responses
- Proprietary derived fields

No commercial provider should be treated as a universal default. Selection should follow the application’s validation, privacy, uptime, and regulatory requirements.

### Lightning node APIs are separate

Lightning implementations expose separate RPC, REST, gRPC, socket, or plugin interfaces for channels, invoices, payments, routing, peers, and implementation-specific wallet state. Their schemas and security assumptions differ from Bitcoin Core. On-chain funding and closing still interact with Bitcoin, but Lightning APIs require independent version and security review.

### Local validation and remote data access

A local validating node can establish which blocks and transactions satisfy Bitcoin rules for its accepted chain. A remote API can provide convenient indexed data. Many applications use both.

For example, a remote service might return address history while a local node verifies referenced transactions and blocks. That cross-check reduces some provider trust but does not automatically verify every derived field. The application must define what is checked, when, and against which chain tip.

A local or remote source can be stale, misconfigured, or on the wrong network. Chain-tip hash, work, sync status, and network identifier all matter.

### Raw data and derived fields

API fields can be grouped by how they are produced.

**Raw or directly encoded data** includes serialized blocks, headers, transactions, scripts, witnesses, and outpoints.

**Node state** includes active-chain membership, current tip, local mempool contents, peer state, and UTXO-set queries.

**Indexed fields** include address history, script history, transaction lookup outside available block context, spending relationships, and explorer search.

**Estimated fields** include fee estimates and projected confirmation targets.

**Cached fields** may represent an earlier response or asynchronously updated database.

**Application-derived fields** include invoice status, account balance, risk score, token balance, inscription state, and business labels.

The API should identify those categories rather than present every field with equal authority.

### Blocks, headers, transactions, and UTXOs

A block response should include enough identity to determine network, block hash, height, and active-chain relationship. Height alone is insufficient because a reorganization can replace the block at that height.

A transaction response should distinguish raw transaction data from confirmation metadata. Confirmation count depends on current tip. The transaction’s block hash should be preserved so the application can detect replacement of its containing block.

A UTXO response depends on the queried state. Bitcoin Core’s UTXO set reflects currently unspent outputs on its active chain. An indexer may also report mempool spends or historical outputs. Applications should not collapse confirmed UTXO state, mempool availability, and wallet reservations.

Address history is not native consensus state. It is derived by mapping address encodings or scripts to transactions.

### Current chain tip and confirmations

APIs should expose chain-tip hash as well as height. Clients can then detect a same-height tip change and walk back to a common ancestor.

Confirmations are usually derived as current tip height minus transaction block height plus one, provided the block remains active. A cached confirmation number can become stale. A transaction can move from confirmed to unconfirmed after a reorganization.

For critical workflows, store the confirming block hash and compare it to the current active chain. Do not store only an integer confirmation count.

### Mempool replacement and eviction

Mempool data is local. Transactions can enter, leave, be replaced, expire, be evicted for resource limits, conflict, or confirm.

APIs may report replacement relationships or removal reasons, but those are implementation and observation dependent. One provider may see a replacement that another never received. A transaction absent from a mempool is not necessarily invalid or impossible to confirm.

Webhook and subscription consumers should reconcile missed events. An “unconfirmed balance” should identify the backend that observed it.

### Transaction broadcast responses

A broadcast endpoint may reject a transaction before submission, accept it into one node’s mempool, forward it to peers, or merely enqueue it for processing.

A successful acknowledgment is not confirmation. It may not even prove broad relay. Applications should separately monitor local mempool acceptance, provider observations, conflicts, and block inclusion.

Retries should be idempotent at the application level. Re-sending the same raw transaction is usually harmless, but re-running “create and send” may construct a different transaction or duplicate a withdrawal.

### Raw transactions and PSBTs

Raw transactions can contain sensitive spending information before broadcast. PSBTs can contain UTXO data, key origins, scripts, derivation paths, proprietary fields, and partial signatures.

API logging should redact or restrict these payloads. Authorization should distinguish transaction construction, signing, finalization, and broadcast. A client allowed to query blocks should not automatically be allowed to sign or spend.

PSBT version and field compatibility must be explicit. APIs should not silently drop unknown fields or convert versions without reporting what changed.

### Authentication, authorization, and rate limits

API keys, cookies, mutual TLS, OAuth-style tokens, service identities, and network controls can authenticate clients. Authorization should then limit methods, wallets, amounts, destinations, and administrative operations.

Rate limits protect availability but also affect correctness. A client that stops pagination early or fails after a partial page can build incomplete state. Quotas, burst behavior, and retry windows should be documented.

Administrative node methods should remain behind a separate boundary from public read methods. Wallet spending methods deserve stronger controls than wallet observation methods.

### Pagination, cursors, timeouts, and retries

Historical endpoints need stable pagination. Offset pagination can change underneath a client when new records appear or reorganizations reorder data. Cursors should identify ordering and chain context where possible.

Timeouts should distinguish connection failure, server processing time, and unknown completion state. A request that times out may still have been processed.

Retries should use exponential backoff and idempotency semantics appropriate to the operation. Query retries differ from transaction-creation or withdrawal retries. Duplicate webhook delivery should be expected.

Applications should preserve enough identifiers to reconcile after uncertainty instead of assuming a timeout means “nothing happened.”

### Errors, versioning, and deprecation

An API should separate transport errors, authentication errors, invalid parameters, policy rejection, consensus invalidity, missing index data, stale backend state, and internal failure.

Bitcoin Core RPC errors are implementation-specific. Hosted providers often normalize or replace them. Applications should log structured error categories without exposing secrets.

Versioning should cover fields, units, enum values, default behavior, and deprecation windows. Adding a field is not always harmless if clients reject unknown data. Removing a field can be dangerous if the application silently substitutes a default.

A provider’s default API version and a repository’s default branch are not reliable substitutes for explicit version pinning.

### Amounts, fee rates, and size units

Bitcoin amounts should be transported as integer satoshis where possible. Floating-point numbers can introduce rounding errors.

Fee-rate units must be labeled. Satoshis per virtual byte, satoshis per kilobyte, and bitcoin per kilobyte are not interchangeable.

Transaction size can refer to raw bytes, virtual bytes, or weight units. SegWit weight is defined in weight units; virtual size is derived from weight. An API field named `size` should not be assumed to mean `vsize`.

Network identifiers should be explicit. Address parsing must confirm that the address or script belongs to the intended network and encoding.

### Privacy leakage and hosted logs

Queries can reveal addresses, script hashes, xpubs, transaction IDs, IP addresses, timing, account relationships, and wallet activity.

Batching queries may reduce or increase linkage depending on the provider. Using Tor changes network metadata but does not prevent a logged xpub from linking the wallet. Self-hosting keeps more requests local but creates its own operational logs.

Privacy policies and retention claims are service-level statements, not Bitcoin protocol guarantees. Applications should minimize queries and avoid sending broader identifiers than required.

### Caching and stale data

Caching block and transaction data can improve performance, but mutable metadata needs careful invalidation.

Raw confirmed transaction bytes are stable for a given txid, while active-chain membership, confirmation count, fee estimates, mempool status, and address balances can change. A reorganization can invalidate block-height associations. Index lag can make recently confirmed data appear unconfirmed.

Cache keys should include network and, where relevant, chain-tip or block-hash context. Applications should expose data freshness when it affects decisions.

### Cross-checking and proofs

Critical data can be cross-checked across a validating node, multiple providers, or raw chain data. Provider agreement is useful operational evidence but is not itself consensus validation.

A Merkle proof can show that a transaction ID is included in a block whose header commits to the Merkle root. It does not prove that the block is valid, belongs to the best chain, or that the transaction satisfies every consensus rule unless the client validates the necessary headers, proof of work, chain selection, and transaction context.

Headers can support chain-work verification, but they do not contain the full transactions needed for complete validation.

Cross-checks should therefore state exactly what they establish.

### Provider disagreement and observability

Applications should monitor:

- Chain-tip height and hash by source
- Sync lag
- Mempool disagreement
- Broadcast rejection categories
- Index freshness
- Webhook gaps
- Cache age
- Error and rate-limit trends
- Version and deprecation notices

Disagreement can result from propagation, policy, reorganization timing, pruning, index lag, or software differences. Preserve source-specific observations and reconcile them.

### An API evaluation framework

For each endpoint, ask:

1. What system produced the response?
2. Does that system validate Bitcoin, index validated data, cache another service, or apply application logic?
3. Which network, active-chain tip, and software version does it use?
4. Is the value confirmed, mempool-derived, estimated, cached, indexed, or application-derived?
5. Which fields require optional or external indexes?
6. What authentication and authorization protect the operation?
7. What happens during timeout, retry, duplicate delivery, replacement, eviction, or reorganization?
8. Which units and integer formats are used?
9. What privacy information does the request reveal?
10. What evidence can be independently checked?

A well-designed application-facing API should answer those questions in its schema and operational documentation.

### The working model

Bitcoin APIs are interfaces to systems around Bitcoin, not a single protocol authority.

Bitcoin Core RPC exposes one implementation’s node and wallet behavior. REST provides limited reads. ZMQ provides lossy notifications. P2P carries untrusted network messages. Electrum and Esplora services depend on indexes. Hosted providers add service and privacy dependencies. Lightning APIs belong to separate implementations. Application APIs add business state.

The safest design keeps node administration private, exposes narrow application methods, uses integer and explicit units, records source and chain-tip context, handles retries and reorganizations, and distinguishes raw, validated, indexed, cached, estimated, mempool, and application-derived data.

An API response can be useful without being independent proof of Bitcoin validity. Precision about that boundary is the foundation of reliable integration.

## 3. Key Terms

- **RPC:** A request-response mechanism for calling methods on another process.
- **REST:** An HTTP resource interface used by Bitcoin Core for limited reads and by many external services for broader indexed data.
- **ZMQ:** A publish-subscribe notification interface used by Bitcoin Core for block, transaction, and sequence events.
- **P2P:** Bitcoin’s peer-to-peer wire protocol between network participants.
- **Cookie authentication:** Temporary file-based RPC credentials generated by Bitcoin Core.
- **Indexer:** Software that creates searchable or application-specific state from Bitcoin data.
- **Chain tip:** The block a node currently treats as the end of its active chain.
- **Mempool:** A node’s local set of unconfirmed transactions accepted under current policy.
- **Idempotency:** The property that a repeated request does not create unintended duplicate effects.
- **Cursor:** A pagination token representing a position in an ordered result set.
- **Virtual byte:** A transaction-size unit derived from SegWit weight.
- **Weight unit:** The unit used by Bitcoin’s SegWit block-weight accounting.
- **Merkle proof:** A proof that a transaction ID is committed by a block’s Merkle root.
- **Derived state:** Data calculated by an indexer, wallet, provider, or application rather than directly enforced as Bitcoin consensus state.

## 4. Sources

1. **Bitcoin Core Downloads** | Bitcoin Core project
   - URL: https://bitcoincore.org/en/download/
   - Supports: Bitcoin Core 31.1 as the current release used for dated implementation references on July 23, 2026.
2. **Bitcoin Core JSON-RPC Interface** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/JSON-RPC-interface.md
   - Supports: RPC endpoints, JSON-RPC versions, major-version interface changes, cookie authentication, remote-access guidance, and public-internet warnings.
3. **Bitcoin Core v31.1 RPC Reference** | Bitcoin Core contributors
   - URL: https://bitcoincore.org/en/doc/31.0.0/rpc/
   - Supports: Current RPC method families and response semantics, supplemented by v31.1 source for patch-release behavior.
4. **Bitcoin Core REST Interface** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/REST-interface.md
   - Supports: Current optional REST endpoints, encodings, and read-oriented scope.
5. **Bitcoin Core ZMQ Documentation** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/zmq.md
   - Supports: ZMQ topics, sequence notifications, loss handling, block disconnections, mempool events, and lack of subscriber authentication.
6. **Bitcoin Core P2P Protocol Source** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/src
   - Supports: Dated implementation evidence for P2P messages, peer handling, validation, transport, and resource controls.
7. **BIP 324: Version 2 P2P Encrypted Transport** | Dhruv Mehta, Tim Ruffing, Jonas Schnelli, and Pieter Wuille
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0324.mediawiki
   - Supports: The v2 P2P transport protocol and its scoped transport properties.
8. **Bitcoin Core RPC Authentication Documentation** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/share/rpcauth/rpcauth.py
   - Supports: Generation and structure of salted `rpcauth` configuration entries.
9. **Electrum Protocol Basics** | Electrum protocol contributors
   - URL: https://electrum-protocol.readthedocs.io/en/latest/protocol-basics.html
   - Supports: JSON-RPC stream transport, version negotiation, script-hash status, subscriptions, header handling, and Merkle-proof context.
10. **Electrum Protocol Changes** | Electrum protocol contributors
    - URL: https://electrum-protocol.readthedocs.io/en/latest/protocol-changes.html
    - Supports: Version 1.6 negotiation and canonical mempool-order changes and later protocol-version documentation.
11. **Electrum Release Notes** | Electrum contributors
    - URL: https://github.com/spesmilo/electrum/blob/master/RELEASE-NOTES
    - Supports: Electrum 4.7.2 as the latest documented release reviewed in July 2026 and current client protocol support notes.
12. **Esplora API Documentation** | Blockstream contributors
    - URL: https://github.com/Blockstream/esplora/blob/master/API.md
    - Supports: HTTP endpoints for blocks, transactions, addresses, scripts, UTXOs, fees, and mempool data.
13. **Esplora Repository** | Blockstream contributors
    - URL: https://github.com/Blockstream/esplora
    - Supports: Esplora’s explorer presentation layer and dependence on an indexed backend.
14. **electrs Repository** | Roman Zeyde and contributors
    - URL: https://github.com/romanz/electrs
    - Supports: An Electrum server implementation that builds script-history indexes over Bitcoin data.
15. **Fulcrum Repository** | Calin Culianu and contributors
    - URL: https://github.com/cculianu/Fulcrum
    - Supports: An independently maintained Electrum server implementation and current release and development evidence.
16. **BIP 141: Segregated Witness** | Eric Lombrozo, Johnson Lau, and Pieter Wuille
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki
    - Supports: Transaction weight and virtual-size foundations used when interpreting API size and fee-rate units.
17. **BIP 174: Partially Signed Bitcoin Transaction Format** | Andrew Chow
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0174.mediawiki
    - Supports: PSBT version 0 structure and metadata categories.
18. **BIP 370: PSBT Version 2** | Andrew Chow
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0370.mediawiki
    - Supports: PSBT version 2 and compatibility boundaries.
19. **BIP 157: Client Side Block Filtering** | Olaoluwa Osuntokun, Alex Akselrod, and Jim Posen
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0157.mediawiki
    - Supports: Compact-filter peer methods and client synchronization evidence.
20. **BIP 158: Compact Block Filters** | Olaoluwa Osuntokun and Alex Akselrod
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0158.mediawiki
    - Supports: Compact filter construction and matching semantics.
21. **Bitcoin Core v31.1 Mempool Source** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/src/policy
    - Supports: Dated implementation evidence for mempool, standardness, fees, dust, and relay policy.
22. **Bitcoin Core v31.1 Raw Transaction RPC Source** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/rpc/rawtransaction.cpp
    - Supports: Dated transaction decode, PSBT, broadcast, and policy-error behavior in Bitcoin Core RPC.
23. **Bitcoin Core v31.1 Blockchain RPC Source** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/rpc/blockchain.cpp
    - Supports: Dated chain-tip, block, UTXO, confirmation, and optional-index response behavior.
24. **Bitcoin Core Functional Interface Tests** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/test/functional
    - Supports: Current implementation tests for RPC, REST, ZMQ, P2P, authentication, mempool, reorganization, and broadcast behavior.

## 5. SEO title

Bitcoin APIs Explained: RPC, REST, ZMQ and More | Mempool Surf Club

## 6. Meta description

Understand Bitcoin Core RPC, REST, ZMQ, P2P, Electrum, Esplora, hosted APIs, units, authentication, broadcast, caching, privacy, and reorganizations.

## 7. Page excerpt

A systems guide to Bitcoin interfaces and API trust boundaries, covering node RPC, REST, ZMQ, P2P, indexed services, hosted providers, data states, retries, units, privacy, and chain reorganizations.

## 8. Estimated reading time

19 to 23 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-042 | How Bitcoin Wallet Integrations Work
- Next: MSC-GUIDE-044 | How Bitcoin Indexers Work
- Prerequisite: MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- Prerequisite: MSC-GUIDE-019 | What Is a Bitcoin Node?
- Prerequisite: MSC-GUIDE-022 | How the Bitcoin Mempool Works
- Prerequisite: MSC-GUIDE-023 | How Bitcoin Transactions Are Broadcast
- Branch: MSC-GUIDE-029 | What Is the Lightning Network?
- Return: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] Registry metadata matches the approved registry.
- [x] Bitcoin consensus is separated from Bitcoin Core, wallet, service, and application behavior.
- [x] Consensus validity is separated from mempool, relay, wallet, and provider policy.
- [x] Node validation is separated from API response, cache, index, estimate, and application state.
- [x] Confirmed-chain state is separated from local mempool observations.
- [x] Validation is separated from indexing, script history, explorer data, and derived fields.
- [x] Self-hosted and hosted API trust, privacy, availability, and logging boundaries are explicit.
- [x] Version-sensitive Bitcoin Core, Electrum, Esplora, and interface claims are dated or scoped.
- [x] RPC authentication is separated from fine-grained application authorization.
- [x] Bitcoin Core RPC is not recommended for direct public-internet exposure.
- [x] Broadcast acknowledgment is not presented as mempool propagation, mining, or confirmation.
- [x] Merkle proofs and headers are scoped to what they can establish.
- [x] Integer amounts, fee-rate units, bytes, virtual bytes, and weight units are distinguished.
- [x] Pagination, retries, idempotency, duplicate delivery, timeout uncertainty, and stale caches are explicit.
- [x] No private-key or seed exposure guidance is included.
- [x] No provider, API, node, wallet, indexer, or implementation is presented as universally authoritative.
- [x] No fee, confirmation, uptime, privacy, recovery, security, or compatibility guarantee is made.
- [x] Sources are mapped only to claims they support.
- [x] No price, investment, market, or promotional claims are included.
- [x] Planned internal links remain inactive and do not imply publication.

## 11. Human verification

- Reviewer:
- Review date:
- Notes: Pending verification of current Bitcoin Core interface behavior and authentication, Electrum and Esplora protocol versions, API versioning and deprecation claims, amount and fee units, broadcast semantics, mempool replacement and eviction behavior, reorganization handling, cache rules, and hosted-provider trust and privacy boundaries.

## 12. Illustration brief

### Illustration 1

- Concept title: Bitcoin Interface Signal Map
- Educational purpose: Distinguish RPC, REST, ZMQ, P2P, Electrum, Esplora, and hosted API interfaces by direction, purpose, and trust boundary.
- Recommended placement: After the section What “Bitcoin API” can mean.
- Visual description: Vintage communications chart centered on a validating node, with separate signal routes for request-response, read-only HTTP, notifications, peer messages, indexed queries, and hosted services.
- Required labels: JSON-RPC, REST, ZMQ, P2P, Electrum, Esplora, Hosted API, Validating node, Indexer, Application
- Caption: Interfaces that expose similar data can differ in validation, indexing, authentication, and failure behavior.
- Alt text: Technical network map showing distinct routes between an application, a Bitcoin node, indexers, peers, and hosted APIs.
- Image orientation: Landscape
- Mobile crop notes: Place the application at top, interfaces in the center, and node, indexer, and peers at the bottom.
- Status: PLANNED

### Illustration 2

- Concept title: Request-to-Chain Trust Path
- Educational purpose: Show how one application request passes through authentication, business logic, an API adapter, a node or indexer, and chain-tip verification.
- Recommended placement: After the section Local validation and remote data access.
- Visual description: Layered cartographic route with checkpoints for identity, authorization, source system, index or cache, validating node, active-chain hash, and application response.
- Required labels: Client, Authentication, Authorization, Application API, Cache, Indexer, Validating node, Chain tip, Response evidence
- Caption: Reliable API responses preserve which system produced the value and which chain context supports it.
- Alt text: Layered trust-path diagram tracing an application request through authorization, cache or index, a validating node, and chain-tip context.
- Image orientation: Landscape
- Mobile crop notes: Use a single vertical path with side badges for cache, index, and hosted-service dependencies.
- Status: PLANNED

### Illustration 3

- Concept title: Four Data-State Tides
- Educational purpose: Separate confirmed, mempool, cached, and application-derived states that APIs may present.
- Recommended placement: After the section Raw data and derived fields.
- Visual description: Nautical tide chart divided into four bands, each with source, mutability, and reorganization behavior, connected to one transaction identifier.
- Required labels: Confirmed chain, Local mempool, Cached response, Derived state, Block hash, Source, Freshness, Reorganization
- Caption: The same transaction can have different statuses across chain, mempool, cache, and application layers.
- Alt text: Four-band technical chart comparing confirmed, mempool, cached, and application-derived transaction states.
- Image orientation: Landscape
- Mobile crop notes: Stack the four data states vertically with a shared transaction marker.
- Status: PLANNED
