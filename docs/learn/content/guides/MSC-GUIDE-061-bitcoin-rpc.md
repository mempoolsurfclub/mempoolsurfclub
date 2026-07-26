---
registry_id: MSC-GUIDE-061
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: How Bitcoin RPC Works
handle: bitcoin-rpc
category: Bitcoin Development
subcategory: Infrastructure
depth: Deep
format: Technical Explainer
primary_path: Build on Bitcoin
secondary_paths:
  - Understand the Network
author_display: Mempool Surf Club Editorial
reviewed_date: null
copy_locked_date: null
---

# How Bitcoin RPC Works

## 1. Introductory deck

Bitcoin RPC is an application interface exposed by a node implementation. In Bitcoin Core, authenticated clients send HTTP requests containing JSON-RPC method calls and receive structured results or errors. RPC is not the Bitcoin peer-to-peer protocol, and a successful reply does not by itself prove that the node is synchronized, using the intended chain, or returning information suitable for a production decision.

## 2. Full article

Remote procedure call, or RPC, is a practical way for one program to ask another running program to perform a named operation. The caller supplies a method name and parameters. The server executes implementation-specific code and returns a result or a structured error.

Bitcoin Core provides an RPC server so local tools and applications can query or control a Bitcoin Core node. The interface is part of Bitcoin Core, not a consensus rule and not a universal interface required of every Bitcoin implementation. Other node software can expose different methods, arguments, defaults, authentication systems, or response shapes.

This guide was researched on July 26, 2026 against Bitcoin Core 31.1 at tag `v31.1`, commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`. RPC behavior is implicitly versioned by Bitcoin Core’s major release, so integrations should pin and test the release they actually operate.

### The client, server, and node boundary

A typical Bitcoin Core RPC exchange has three roles:

1. `bitcoind` or a server-enabled Bitcoin Core process runs node and optional wallet components.
2. An RPC client creates an authenticated HTTP request.
3. The RPC server parses the request, dispatches the named method, and serializes the result.

`bitcoin-cli` is one client supplied with Bitcoin Core. It is not the node and does not validate blocks by itself. It reads options and credentials, sends a request to a running server, prints the reply, and exits. Bitcoin Core 31.1 also installs a top-level `bitcoin` command whose `bitcoin rpc` mode can be used for RPC calls. A custom application can instead use an HTTP library and JSON parser.

The separation matters operationally. A working `bitcoin-cli` executable does not mean a node is running. A running process does not mean RPC is reachable. A reachable RPC port does not mean the caller is authorized. Authorization does not mean the connection is encrypted. A valid reply does not mean the node is ready for every application decision.

### RPC is not Bitcoin’s P2P protocol

Bitcoin nodes communicate with peers through the Bitcoin peer-to-peer protocol. That protocol carries messages such as version negotiation, inventories, transactions, blocks, addresses, and compact-block data. Peer connections participate in relay and synchronization.

RPC serves a different boundary. It lets a trusted application ask one node implementation for information or request local actions. An RPC method such as `getblockchaininfo` is not a P2P message. A wallet RPC such as `sendtoaddress` does not travel across the Bitcoin network as an RPC; the node may create a transaction locally and then relay the resulting transaction through P2P behavior.

Applications should not infer that an RPC name, argument, or response field is a protocol rule. Consensus determines which blocks and transactions a validating node accepts. Bitcoin Core’s RPC layer exposes selected views and operations around that implementation.

### HTTP carries JSON-RPC requests

Bitcoin Core’s JSON-RPC server accepts HTTP `POST` requests. The request body is JSON. A basic request contains:

- a JSON-RPC version marker when using version 2.0;
- an application-chosen `id` for matching a response;
- a method name;
- a parameter array or object.

The response contains the matching `id` and either a result or an error according to the request’s JSON-RPC mode. Transport, message format, and method semantics are separate layers: HTTP moves the bytes, JSON encodes values, JSON-RPC defines request and response structure, and the Bitcoin Core method defines the operation.

Bitcoin Core 31.1 recognizes JSON-RPC 2.0 when the request includes `"jsonrpc": "2.0"`. Requests without that marker follow Bitcoin Core’s legacy 1.1 behavior. The modes differ in response fields, notification support, and how HTTP status codes are used for RPC errors. New clients should intentionally select a mode rather than assume every server treats unmarked JSON identically.

### Positional and named parameters

Bitcoin Core accepts parameters by position and by name. Positional arrays are compact, but they can become fragile when a method has many optional arguments. Named parameters are often clearer because the request identifies the purpose of each value.

Bitcoin Core 31.1 also accepts an `args` named parameter containing initial positional values, combined with other named values. This can help during transitions, but applications should still validate their exact request against the built-in help for the deployed release.

Parameter names, accepted types, defaults, and ordering are implementation interfaces. They can change between major releases. A value omitted today may receive a default that is not appropriate for every application, and a default is not an immutable Bitcoin rule.

### Results and structured errors

A successful RPC result can be a string, number, boolean, array, object, or null. Applications should parse the expected type and required fields rather than scrape human-formatted output.

Errors contain a numeric code and message. An error can mean the method does not exist, parameters are invalid, the wallet is unavailable, a requested object is absent, the node is still warming up, or a state-dependent operation cannot complete. Error messages are useful for operators, but stable application logic should avoid depending only on exact prose that may change.

Network failures, HTTP failures, JSON parsing failures, RPC errors, and semantically unsuitable results are different classes. Retrying all of them the same way can duplicate side effects or hide a configuration mistake.

### Command discovery and built-in help

The `help` RPC lists commands or describes one command. `bitcoin-cli help` and `bitcoin-cli help <command>` provide the same implementation-generated documentation through the client. This is a better authority for the running release than an old tutorial.

Help output identifies arguments and result fields for commands compiled into and registered by that process. Wallet commands may be absent when wallet support was not built. Optional features and release changes can alter the available command set.

The `getrpcinfo` RPC reports active commands and their duration, which can help diagnose long-running calls. It is an operational view, not a guarantee that an active command will finish or that other node subsystems are healthy.

### Node RPCs and wallet RPCs

Node-wide RPCs query or control chain, mempool, peer, mining, index, and process state. Wallet RPCs operate on a loaded wallet and can expose balances, descriptors, labels, transactions, or signing and spending actions.

Bitcoin Core has a root endpoint `/` and wallet-specific endpoints under `/wallet/<walletname>/`. The root endpoint always serves non-wallet calls. It can serve wallet calls when exactly one wallet is loaded. When two or more wallets are loaded, a wallet endpoint must be selected for wallet requests. `bitcoin-cli -rpcwallet=<name>` selects that endpoint.

A wallet endpoint can also service non-wallet requests, but that does not turn node state into wallet state. Applications should maintain an explicit wallet identity and should not assume that “the wallet” means the same database after restarts, deployment changes, or operator actions.

Wallet loading and rescanning are stateful. A wallet RPC may fail while a wallet is unloaded, while a rescan changes what the wallet has discovered, or when a requested operation conflicts with wallet state. Node RPC availability does not imply wallet readiness.

### Authentication is not encryption

Bitcoin Core requires RPC authentication. The preferred local mechanism is cookie authentication. When no plaintext `rpcpassword` is configured, Bitcoin Core generates random credentials at startup, stores them in a `.cookie` file with restricted permissions, and removes the file at shutdown. Local clients that can read the cookie can authenticate for that process lifetime.

For applications needing static credentials, Bitcoin Core provides the `share/rpcauth` tooling to generate an `rpcauth` entry. The configuration stores a salted HMAC verifier rather than the plaintext password. The client still needs the corresponding secret. Bitcoin Core also supports manually configured `rpcuser` and `rpcpassword`, but the project warns that plaintext configuration is less secure.

Authentication answers “which credential is presented?” It does not encrypt the HTTP connection. Bitcoin Core’s native RPC interface does not provide transport encryption. Credentials and data can be observed by an attacker on an untrusted network path.

### Authorization and least privilege

A valid credential normally grants broad access. Some RPC methods can read private wallet information, change node behavior, load or unload wallets, sign transactions, or spend funds. Bitcoin Core supports `rpcwhitelist` and `rpcwhitelistdefault` settings that can restrict methods by authenticated user.

Method whitelists can reduce exposure, but they are not a complete sandbox. A read-looking method can reveal sensitive data, combinations of methods can have wider effects, and future releases can change the command set. Separate processes, wallet isolation, operating-system permissions, and network segmentation remain important.

Credentials should not be embedded in source code, logs, browser scripts, public container images, or client-visible applications. Rotate static credentials through a controlled process and restrict cookie-file access to the service account that needs it.

### Binding, reachability, and access control

By default, Bitcoin Core’s RPC interface is intended for local access. `rpcbind` controls listening addresses, while `rpcallowip` identifies allowed remote source ranges. These options affect network reachability; they do not add encryption and should not be treated as a public-Internet security design.

Bitcoin Core’s own documentation says not to expose RPC to the public Internet. Remote use should be confined to a secured private network or protected tunnel, with firewall rules, host controls, and application-level authorization. Container port publishing deserves special attention because an apparently local service can be bound to all host interfaces by default.

A firewall rule and an RPC allowlist solve different problems. The firewall limits which network paths can reach the service. RPC authentication identifies a credential. A method whitelist limits allowed commands for that user. Robust deployments use multiple boundaries rather than relying on one.

### RPC, REST, and ZMQ are different interfaces

Bitcoin Core’s REST interface is an optional, unauthenticated read interface enabled with `-rest`. It shares the HTTP server port but uses `/rest/...` resources and different request semantics. It is not a synonym for JSON-RPC and carries its own privacy and resource-exhaustion risks.

ZeroMQ, when compiled and configured, publishes selected block and transaction notifications. It is a one-way notification facility rather than a query interface. Subscribers can miss messages and must reconcile state with the node. ZMQ does not authenticate subscribers and should remain on trusted network boundaries.

P2P communicates with Bitcoin peers. RPC lets trusted applications request operations. REST exposes selected resources. ZMQ emits notifications. Choosing one interface does not inherit the guarantees of another.

### Batch requests and concurrency

Bitcoin Core 31.1 accepts a top-level JSON array as a batch request. Each element is parsed and executed, and non-notification responses are collected into an array. In the current HTTP RPC implementation, the batch elements are processed in a loop; callers should not assume that a batch creates parallel execution or an atomic transaction.

A partial batch can contain both successes and errors. Side effects from earlier calls are not rolled back because a later call fails. Batch requests should therefore group independent reads more readily than dependent state changes.

RPC capacity is finite. Bitcoin Core has configurable RPC worker threads, HTTP connection limits, file-descriptor limits, and method-specific locking or resource costs. Sending hundreds of simultaneous connections can exhaust file descriptors. A client should use connection pooling, bounded concurrency, rate limits, and backpressure.

### Long-running calls, timeouts, and retries

Some calls can take substantial time because they scan blocks, wait on locks, inspect large structures, import descriptors, rescan wallets, or perform disk-heavy work. Client timeouts do not necessarily cancel server-side execution. An application that times out and blindly repeats a non-idempotent call can create duplicate work or effects.

Use separate deadlines for connecting, receiving a response, and completing an application workflow. Record request identity and outcome where possible. Retry only after classifying whether the method is idempotent, whether the first call may still be running, and whether the node state changed.

`getrpcinfo` can reveal active commands, but production systems also need bounded queues and alerts around latency, worker saturation, failed authentication, and repeated timeouts.

### Startup, shutdown, and readiness

Bitcoin Core can start its RPC server before all initialization is complete. During RPC warmup, methods may return a warmup error. Later, the process can be reachable while initial block download is still active, indexes are catching up, wallets are rescanning, peers are absent, or the node has selected a chain other than the application expects.

During shutdown, the `stop` RPC requests graceful termination and returns before every subsystem has necessarily finished writing state. New calls can fail as services stop. Supervisors should distinguish “shutdown requested,” “RPC no longer reachable,” and “process exited cleanly.”

Readiness must be defined by the application. Useful checks may include the chain name, block and header heights, `initialblockdownload`, verification progress, best-block hash, peer state, index synchronization, loaded-wallet identity, and rescan status. No single field is a universal readiness proof.

### A returned transaction is not a chain conclusion

An RPC can return a transaction from a wallet, mempool, block, or transaction index. Those sources mean different things. Seeing a transaction does not prove it is confirmed. A block association does not prove that block is in the current active chain unless the response and chain context establish that. A confirmation count can change during a reorganization.

The application should define which node is trusted, which chain it should use, how synchronized it must be, and what confirmation or conflict rules apply. A compromised host can return convincing but false RPC data even when authentication succeeds.

### Safe development and production boundaries

Regtest is the preferred environment for deterministic local experiments. It creates a private chain under developer control, permits on-demand block generation, and avoids real funds. Signet can be useful when an application needs a shared public test environment with externally produced blocks. Testnet and testnet4 are public networks with less predictable state and should not be confused with regtest.

Production integrations should pin a Bitcoin Core release, verify release artifacts, isolate credentials, select wallet endpoints explicitly, limit methods and network paths, validate chain readiness, handle reorganizations, bound retries, and test upgrades before deployment.

RPC makes a node programmable. It does not remove the need to understand the node, its chain state, or the trust boundary around the host that answers.

## 3. Key Terms

- **RPC:** Application interface for requesting named operations from a running process.
- **Bitcoin Core:** One implementation of Bitcoin’s node, wallet, and related interfaces.
- **`bitcoin-cli`:** Command-line RPC client supplied with Bitcoin Core; not the node itself.
- **JSON-RPC:** Request and response structure encoded in JSON.
- **HTTP:** Transport used by Bitcoin Core’s JSON-RPC and REST servers.
- **P2P protocol:** Peer-to-peer wire protocol used among Bitcoin nodes for synchronization and relay.
- **REST:** Optional unauthenticated resource interface distinct from JSON-RPC.
- **ZMQ:** Optional publish/subscribe notification interface for selected node events.
- **Cookie authentication:** Per-process credentials stored in a restricted `.cookie` file.
- **`rpcauth`:** Salted password-verifier configuration for static RPC users.
- **Authentication:** Checking a presented credential; not the same as transport encryption.
- **Authorization:** Limiting what an authenticated identity may do.
- **Wallet endpoint:** `/wallet/<walletname>/` route selecting a loaded wallet context.
- **RPC warmup:** Startup period when the server is running but normal method execution is not ready.
- **Idempotent operation:** Operation designed so repeating the same request does not create an additional effect.
- **Initial block download:** Node state while catching up and validating historical chain data.
- **Active chain:** Best valid chain selected by the node under its current view and rules.

## 4. Sources

1. **Bitcoin Core 31.1 Tag Commit** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/commit/9be056a8a72b624dae9623b2f7bded92c2a21c91
   - Supports: Exact Bitcoin Core implementation version reviewed on July 26, 2026.
2. **Bitcoin Core 31.1 JSON-RPC Interface** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/JSON-RPC-interface.md
   - Supports: Endpoints, positional and named parameters, major-version compatibility, JSON-RPC 1.1 and 2.0 behavior, security guidance, authentication, and consistency limitations.
3. **Bitcoin Core 31.1 HTTP RPC Server** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/httprpc.cpp
   - Supports: HTTP POST handling, Basic authentication, cookie and `rpcauth` verification, method whitelists, batch execution, notifications, and response construction.
4. **Bitcoin Core 31.1 RPC Server** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/rpc/server.cpp
   - Supports: RPC warmup state, command registration, built-in help, graceful stop, active-command reporting, and server execution boundaries.
5. **Bitcoin Core 31.1 RPC Protocol** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/rpc/protocol.h
   - Supports: JSON-RPC versions, error codes, request parsing, and reply structures.
6. **Bitcoin Core 31.1 Command-Line RPC Client** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/bitcoin-cli.cpp
   - Supports: `bitcoin-cli` client behavior, request construction, wallet selection, authentication lookup, and client-side output handling.
7. **Bitcoin Core 31.1 REST Interface** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/REST-interface.md
   - Supports: REST enablement, ports, unauthenticated resource behavior, index dependencies, consistency boundary, and browser and connection risks.
8. **Bitcoin Core 31.1 ZeroMQ Documentation** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/zmq.md
   - Supports: Read-only notifications, topics, lost-message detection, reorganization handling, lack of authentication, and separation from RPC.
9. **Bitcoin Core 31.1 Configuration File Documentation** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/bitcoin-conf.md
   - Supports: Configuration precedence, network-specific sections, data-directory paths, and restart requirements.
10. **Bitcoin Core 31.1 File-System Documentation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md
    - Supports: Cookie location, wallet directories, logs, chain-specific data directories, installed client and server binaries, and wallet-backup boundary.
11. **Bitcoin Core 31.1 RPC Authentication Tool** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/share/rpcauth
    - Supports: Generation and use of salted `rpcauth` credentials.
12. **Bitcoin Core 31.1 RPC Functional Tests** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/test/functional
    - Supports: Release-pinned evidence for RPC methods, wallet selection, HTTP behavior, authentication, startup states, and error handling.
13. **Bitcoin Core 31.1 Functional Test Documentation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/test/functional/README.md
    - Supports: RPC and P2P test-interface separation and current functional-test structure.
14. **JSON-RPC 2.0 Specification** | JSON-RPC Working Group
    - URL: https://www.jsonrpc.org/specification
    - Supports: Version marker, request and response objects, named and positional parameters, notifications, batches, and error-object structure.
15. **Bitcoin Core 31.1 Release Notes** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/release-notes.md
    - Supports: Current release identity, upgrade boundary, supported-platform statement, and release-specific changes.
16. **Bitcoin Core 31.1 README** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/README.md
    - Supports: Bitcoin Core as a validating implementation, stable release tags, and test and review boundaries.
17. **Bitcoin Core 31.1 Memory Guidance** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/reduce-memory.md
    - Supports: Configurable RPC thread count and the relationship among resource limits, performance, and application behavior.

## 5. SEO title

How Bitcoin RPC Works: Interfaces, Security, and Readiness

## 6. Meta description

Learn how Bitcoin Core RPC clients, HTTP, JSON-RPC, wallet endpoints, authentication, security boundaries, readiness checks, batches, and errors work.

## 7. Page excerpt

Understand Bitcoin Core’s RPC client-server boundary, wallet routing, credentials, versioning, operational limits, and why a valid reply is not proof of node readiness.

## 8. Estimated reading time

18 to 21 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-060 | How Merkle Trees Work in Bitcoin
- Next: MSC-GUIDE-062 | How to Set Up a Bitcoin Development Environment
- Prerequisite: MSC-GUIDE-049 | What Is Bitcoin Core?
- Prerequisite: MSC-GUIDE-052 | How Bitcoin Core Releases Work
- Related: MSC-GUIDE-041 | Bitcoin Developer Tools: A Practical Overview
- Related: MSC-GUIDE-043 | Bitcoin APIs Explained
- Related: MSC-GUIDE-044 | How Bitcoin Indexers Work
- Related: MSC-GUIDE-021 | What Is a Bitcoin Full Node?
- Related: MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?
- Branch: MSC-GUIDE-062 | How to Set Up a Bitcoin Development Environment
- Branch: MSC-GUIDE-063 | How Bitcoin Software Is Tested
- Branch: MSC-GUIDE-064 | How to Run Reliable Bitcoin Infrastructure
- Return: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] RPC is described as a Bitcoin Core application interface rather than the Bitcoin P2P protocol or a consensus rule.
- [x] `bitcoin-cli`, the RPC server, node behavior, wallet behavior, REST, ZMQ, and P2P remain distinct.
- [x] HTTP transport, JSON encoding, JSON-RPC structure, method semantics, authentication, authorization, encryption, and reachability remain distinct.
- [x] JSON-RPC 1.1 and 2.0, positional and named parameters, results, errors, notifications, and batches are pinned to Bitcoin Core 31.1.
- [x] Node-wide and wallet RPCs, root and wallet endpoints, multi-wallet selection, loading, and rescanning boundaries are explained.
- [x] Cookie authentication, `rpcauth`, plaintext credential risks, method whitelists, binding, firewalling, and network isolation are qualified without promising security.
- [x] Startup warmup, shutdown, initial block download, indexing, rescanning, timeouts, retries, concurrency, and long-running calls are treated as operational states.
- [x] A successful response is not treated as proof of synchronization, intended chain, active-chain confirmation, host integrity, or application suitability.
- [x] Regtest, signet, testnet, testnet4, and mainnet are not conflated.
- [x] Protocol rules, Bitcoin Core implementation behavior, configurable defaults, and release-specific interfaces remain distinct.
- [x] Current release claims are dated July 26, 2026 and pinned to Bitcoin Core `v31.1` commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`.
- [x] Planned internal links remain inactive, no publication is implied, and no uptime, security, or correctness guarantee is made.

## 11. Human verification

- Reviewer: Pending infrastructure specialist review
- Review date: Pending
- Primary evidence reviewed: Pending
- Material corrections made: Pending
- Remaining sensitivities: Pending
- Renewal requirement: Pending

## 12. Illustration brief

### Illustration 1

- Concept title: The RPC Boundary Chart
- Educational purpose: Separate an application’s RPC request path from Bitcoin Core’s P2P synchronization and relay path.
- Recommended placement: After RPC is not Bitcoin’s P2P protocol.
- Visual description: Vintage nautical systems plate with an application and `bitcoin-cli` on the harbor side, an authenticated HTTP and JSON-RPC checkpoint at the node boundary, and separate P2P routes extending from the node to peer vessels.
- Required labels: Application, `bitcoin-cli`, HTTP POST, JSON-RPC, Authentication, Bitcoin Core RPC server, Node state, Wallet state, Bitcoin P2P, Peers
- Caption: RPC connects trusted applications to one node implementation; P2P connects the node to Bitcoin peers.
- Alt text: Systems diagram separating application RPC traffic from Bitcoin peer-to-peer messages handled by a Bitcoin Core node.
- Image orientation: Landscape
- Mobile crop notes: Preserve the central node boundary and one RPC route plus one P2P route.
- Status: PLANNED

### Illustration 2

- Concept title: Authentication Is Not Encryption
- Educational purpose: Explain the layered controls required around an RPC endpoint.
- Recommended placement: After Binding, reachability, and access control.
- Visual description: Cross-section of a fortified harbor entrance with four labeled gates: firewall and bind address, encrypted private route or tunnel, RPC credential, and per-user method allowance. An exposed public-ocean route is marked unsafe.
- Required labels: Network reachability, Firewall, Private network or tunnel, Transport encryption, Cookie or `rpcauth`, Method whitelist, RPC server, Public Internet exposure
- Caption: Credentials authorize a caller, but Bitcoin Core’s native RPC transport does not encrypt an untrusted network path.
- Alt text: Layered security diagram showing firewalling, private transport, RPC authentication, and method authorization as separate controls.
- Image orientation: Landscape
- Mobile crop notes: Stack the four controls vertically and keep the unsafe public route visible.
- Status: PLANNED

### Illustration 3

- Concept title: From Response to Readiness
- Educational purpose: Show why an HTTP 200 or valid JSON result is only one step in an application health decision.
- Recommended placement: After A returned transaction is not a chain conclusion.
- Visual description: Cartographic decision route beginning with process reachable and moving through authenticated, RPC ready, intended chain, synchronized headers and blocks, indexes ready, wallet selected, transaction state, and application confirmation policy.
- Required labels: Process reachable, Authenticated, RPC warmup complete, Intended chain, Initial block download, Header tip, Block tip, Index synced, Wallet loaded, Active chain, Confirmations, Application policy
- Caption: A usable RPC response still requires chain, index, wallet, and application-context checks.
- Alt text: Decision map showing the checks between a reachable Bitcoin RPC process and an application-ready chain conclusion.
- Image orientation: Portrait
- Mobile crop notes: Preserve the route as one vertical sequence with short labels.
- Status: PLANNED
