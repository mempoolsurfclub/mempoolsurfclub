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

This guide was researched and technically reviewed on July 26, 2026 against Bitcoin Core 31.1 at tag `v31.1`, commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`. RPC behavior is implicitly versioned by Bitcoin Core’s major release, so integrations should pin and test the release they actually operate.

### The client, server, and node boundary

A typical Bitcoin Core RPC exchange has three roles:

1. `bitcoind` or a server-enabled Bitcoin Core process runs node and optional wallet components.
2. An RPC client creates an authenticated HTTP request.
3. The RPC server parses the request, dispatches the named method, and serializes the result.

`bitcoin-cli` is one client supplied with Bitcoin Core. It is not the node and does not validate blocks by itself. It reads options and credentials, sends a request to a running server, prints the reply, and exits. Bitcoin Core 31.1 also installs a top-level `bitcoin` command whose `bitcoin rpc` mode is a newer alternative to `bitcoin-cli -named` for RPC calls. A custom application can instead use an HTTP library and JSON parser.

The separation matters operationally. A working `bitcoin-cli` executable does not mean a node is running. A running process does not mean RPC is reachable. A reachable RPC port does not mean the caller is authorized. Authorization does not mean the connection is encrypted. A valid reply does not mean the node is ready for every application decision.

### RPC is not Bitcoin’s P2P protocol

Bitcoin nodes communicate with peers through the Bitcoin peer-to-peer protocol. That protocol carries messages such as version negotiation, inventories, transactions, blocks, addresses, and compact-block data. Peer connections participate in relay and synchronization.

RPC serves a different boundary. It lets a trusted application ask one node implementation for information or request local actions. An RPC method such as `getblockchaininfo` is not a P2P message. A wallet RPC such as `sendtoaddress` does not travel across the Bitcoin network as an RPC; the node may create a transaction locally and then relay the resulting transaction through P2P behavior.

Applications should not infer that an RPC name, argument, or response field is a protocol rule. Consensus determines which blocks and transactions a validating node accepts. Bitcoin Core’s RPC layer exposes selected views and operations around that implementation.

### HTTP carries JSON-RPC requests

Bitcoin Core’s JSON-RPC server accepts HTTP `POST` requests. The request body is JSON. A basic request contains:

- a JSON-RPC version marker when using version 2.0;
- an application-chosen `id` when a response is expected;
- a method name;
- a parameter array or object.

The response contains the matching `id` when the request has one and either a result or an error according to the request’s JSON-RPC mode. Transport, message format, and method semantics are separate layers: HTTP moves the bytes, JSON encodes values, JSON-RPC defines request and response structure, and the Bitcoin Core method defines the operation.

Bitcoin Core 31.1 recognizes JSON-RPC 2.0 when the request includes `"jsonrpc": "2.0"`. It also accepts the historical `"jsonrpc": "1.0"` spelling as legacy behavior. Requests without a recognized 2.0 marker use Bitcoin Core’s legacy 1.1 mode. In legacy responses, both `result` and `error` are present and one is null. In 2.0 responses, only the applicable field is present and the response includes `"jsonrpc": "2.0"`.

The modes also differ in HTTP behavior. A singleton legacy RPC error is translated to an HTTP error status, while a well-formed JSON-RPC 2.0 call normally returns HTTP 200 even when the response body contains an RPC error. Actual HTTP-layer failures, such as an unknown endpoint or malformed HTTP request, remain transport errors.

Only JSON-RPC 2.0 supports notifications in Bitcoin Core 31.1. A 2.0 request without an `id` is executed but receives HTTP 204 with no response body. Omitting `id` from a legacy request does not turn it into a notification.

### Positional and named parameters

Bitcoin Core accepts parameters by position and by name. Positional arrays are compact, but they can become fragile when a method has many optional arguments. Named parameters are often clearer because the request identifies the purpose of each value.

Bitcoin Core 31.1 also accepts an `args` named parameter containing initial positional values, combined with other named values. This can help during transitions, but applications should still validate their exact request against the built-in help for the deployed release.

Parameter names, accepted types, defaults, and ordering are implementation interfaces. They can change between major releases. A value omitted today may receive a default that is not appropriate for every application, and a default is not an immutable Bitcoin rule.

### Results and structured errors

A successful RPC result can be a string, number, boolean, array, object, or null. Applications should parse the expected type and required fields rather than scrape human-formatted output.

Errors contain a numeric code and message. An error can mean the method does not exist, parameters are invalid, the wallet is unavailable, a requested object is absent, the node is still warming up, or a state-dependent operation cannot complete. Error messages are useful for operators, but stable application logic should avoid depending only on exact prose that may change.

Network failures, HTTP failures, JSON parsing failures, RPC errors, and semantically unsuitable results are different classes. Retrying all of them the same way can duplicate side effects or hide a configuration mistake.

### Command discovery and built-in help

The `help` RPC lists commands or describes one command. `bitcoin-cli help` and `bitcoin-cli help <command>` provide implementation-generated documentation through the client. This is a better authority for the running release than an old tutorial.

Help output identifies arguments and result fields for commands compiled into and registered by that process. Wallet commands may be absent when wallet support was not built. Optional features and release changes can alter the available command set.

The `getrpcinfo` RPC reports active commands and their duration, which can help diagnose long-running calls. It is an operational view, not a guarantee that an active command will finish or that other node subsystems are healthy.

### Node RPCs and wallet RPCs

Node-wide RPCs query or control chain, mempool, peer, mining, index, and process state. Wallet RPCs operate on a loaded wallet and can expose balances, descriptors, labels, transactions, or signing and spending actions.

Bitcoin Core has a root endpoint `/` and wallet-specific endpoints under `/wallet/<walletname>/`. The root endpoint always serves non-wallet calls. With zero loaded wallets, a wallet call through the root fails. With exactly one loaded wallet, the root can select it. With two or more loaded wallets, a wallet endpoint must be selected. `bitcoin-cli -rpcwallet=<name>` selects that endpoint.

Wallet names in the endpoint are URL-decoded before lookup, so clients must encode names correctly rather than concatenate arbitrary path text. A requested wallet must exist and be loaded. A wallet endpoint can also service non-wallet requests, but that does not turn node state into wallet state.

Applications should maintain an explicit wallet identity and should not assume that “the wallet” means the same database after restarts, deployment changes, `loadwallet`, `unloadwallet`, or startup configuration changes. Wallet loading and rescanning are stateful. A wallet RPC can fail because a wallet is unloaded, unavailable, disabled at build time, or in a state that conflicts with the requested operation. A rescan can also mean that the wallet’s discovered history is incomplete until progress finishes. Node RPC availability does not imply wallet readiness.

### Authentication is not encryption

Bitcoin Core requires RPC authentication. The preferred local mechanism is cookie authentication. When no plaintext `rpcpassword` is configured and cookie generation is enabled, Bitcoin Core generates random credentials at startup and stores them in the configured cookie file, `.cookie` by default in the configuration directory. The generated file is deleted at shutdown by the process that created it. Local clients that can read the cookie can authenticate for that process lifetime.

Cookie protection ultimately depends on operating-system account and filesystem boundaries. Bitcoin Core creates the file under a restrictive process umask by default, but `-rpccookieperms` can deliberately broaden access. `-rpccookiefile` changes the path, and cookie generation can be disabled. Applications should not assume every deployment uses the default location or owner-only access.

For applications needing static credentials, Bitcoin Core provides the `share/rpcauth` tooling to generate an `rpcauth` entry. The configuration stores a salted HMAC verifier rather than the plaintext password. The client still needs the corresponding secret. Bitcoin Core also supports manually configured `rpcuser` and `rpcpassword`, but the project warns that plaintext configuration is less secure.

Authentication answers “which credential is presented?” It does not encrypt the HTTP connection. Bitcoin Core 31.1 does not provide native RPC transport encryption. Credentials and data can be observed by an attacker on an untrusted network path.

### Authorization and least privilege

A valid credential normally grants broad access. Some RPC methods can read private wallet information, change node behavior, load or unload wallets, sign transactions, or spend funds. Bitcoin Core supports `rpcwhitelist` and `rpcwhitelistdefault` settings that can restrict methods by authenticated user.

In 31.1, `rpcwhitelistdefault` defaults to true when at least one `rpcwhitelist` entry exists and false otherwise. A whitelisted user is limited to the listed methods. A user without an entry is denied all methods when `rpcwhitelistdefault` is true. Repeating `rpcwhitelist` for the same user intersects the method sets rather than adding them together. Operators should test the effective list instead of assuming repeated entries accumulate privileges.

Method whitelists can reduce exposure, but they are not a complete sandbox. A read-looking method can reveal sensitive data, combinations of methods can have wider effects, and future releases can change the command set. Separate processes, wallet isolation, operating-system permissions, and network segmentation remain important.

Credentials should not be embedded in source code, logs, browser scripts, public container images, or client-visible applications. Rotate static credentials through a controlled process and restrict cookie-file access to the service account that needs it.

### Binding, reachability, and access control

By default, Bitcoin Core’s HTTP server allows loopback clients and binds RPC to IPv4 and IPv6 loopback addresses. In 31.1, remote binding requires both `rpcbind` and `rpcallowip`. If either side of that pair is missing, Bitcoin Core ignores the incomplete remote configuration, binds to loopback, and logs a warning. `rpcbind` selects listening addresses; `rpcallowip` adds allowed source subnets. Neither setting adds encryption.

Bitcoin Core’s own documentation says not to expose RPC to the public Internet. Remote use should be confined to a secured private network or protected tunnel, with firewall rules, host controls, and application-level authorization. Container port publishing deserves special attention because a default host-port publication can expose an otherwise loopback-oriented service on external interfaces.

A firewall rule and the HTTP source allowlist solve different problems. A firewall limits network paths before the request reaches Bitcoin Core. `rpcallowip` filters source addresses at Bitcoin Core’s shared HTTP listener. RPC authentication identifies a credential. A method whitelist limits allowed commands for that user. None of those controls alone makes public RPC exposure safe.

### RPC, REST, and ZMQ are different interfaces

Bitcoin Core’s REST interface is optional and enabled with `-rest`. It shares the same HTTP listener, port, bind addresses, source-address allowlist, worker pool, and request-resource limits as JSON-RPC, but REST requests do not use RPC Basic authentication. REST exposes selected read resources under `/rest/...`; it is not a synonym for JSON-RPC and carries privacy and resource-exhaustion risks. Enabling RPC authentication does not make REST authenticated.

ZeroMQ notifications are compiled only when the build is configured with `-DWITH_ZMQ=ON`, and individual publishers must then be enabled with their `-zmqpub...` options. ZMQ is a one-way notification facility rather than a query interface. It does not authenticate or authorize subscribers. Messages can be lost, and ordinary block topics report tip changes rather than a complete durable event log. Subscribers should track sequence information where available and reconcile against RPC or another authoritative node view.

P2P communicates with Bitcoin peers. RPC lets trusted applications request operations. REST exposes selected resources. ZMQ emits notifications. Choosing one interface does not inherit the guarantees of another.

### Batch requests and concurrency

Bitcoin Core 31.1 accepts a top-level JSON array as a batch request. The HTTP implementation parses and executes batch elements sequentially in a loop. It collects responses for non-notification elements, so callers should not assume parallel execution, isolation, or atomicity.

A partial batch can contain both successes and errors. Side effects from earlier calls are not rolled back because a later call fails. A non-empty batch containing only valid 2.0 notifications executes those elements and returns HTTP 204. For backward compatibility, an empty batch returns an empty JSON array rather than following the JSON-RPC 2.0 specification’s invalid-request treatment.

RPC capacity is finite. Bitcoin Core has configurable HTTP worker threads through `rpcthreads`, a bounded work queue through `rpcworkqueue`, server timeouts, file-descriptor limits, and method-specific locking or resource costs. When the queue is full, the server rejects work with HTTP 503. Opening hundreds of simultaneous connections can exhaust file descriptors. A client should use connection reuse, bounded concurrency, rate limits, and backpressure.

### Long-running calls, timeouts, and retries

Some calls can take substantial time because they scan blocks, wait on locks, inspect large structures, import descriptors, rescan wallets, load or dump UTXO snapshots, or perform disk-heavy work. Client timeouts do not necessarily cancel server-side execution. An application that times out and blindly repeats a non-idempotent call can create duplicate work or effects.

Use separate deadlines for connecting, receiving a response, and completing an application workflow. Record request identity and outcome where possible. Retry only after classifying whether the method is idempotent, whether the first call may still be running, and whether the node state changed.

`getrpcinfo` can reveal active commands, but production systems also need bounded queues and alerts around latency, worker saturation, authentication failures, work-queue rejection, and repeated timeouts.

### Startup, shutdown, and readiness

Bitcoin Core can start its RPC server before all initialization is complete. During RPC warmup, methods can return a warmup error. Later, the process can be reachable while initial block download is active, indexes are catching up, wallets are rescanning, peers are absent, or the node has selected a chain other than the application expects.

During shutdown, the `stop` RPC requests graceful termination and returns before every subsystem has necessarily finished writing state. The HTTP server rejects new work as shutdown progresses, waits for workers and active requests, and then exits. Supervisors should distinguish “shutdown requested,” “new requests rejected,” “RPC no longer reachable,” and “process exited cleanly.”

Readiness must be defined by the application. Useful checks may include the chain name, block and header heights, `initialblockdownload`, verification progress, best-block hash, peer state, index synchronization, loaded-wallet identity, and rescan status. The consistency guarantees documented for RPC do not make any one field a universal readiness proof.

### A returned transaction is not a chain conclusion

An RPC can return a transaction from a wallet, mempool, block, or transaction index. Those sources mean different things. Seeing a transaction does not prove it is confirmed. A block association does not prove that block is in the current active chain unless the response and chain context establish that. A confirmation count can change during a reorganization.

The application should define which node is trusted, which chain it should use, how synchronized it must be, and what confirmation or conflict rules apply. A compromised host can return convincing but false RPC data even when authentication succeeds.

### Safe development and production boundaries

Regtest is the preferred environment for deterministic local experiments. It creates a private chain under developer control, permits on-demand block generation, and avoids real funds. Signet can be useful when an application needs a shared public test environment with externally produced blocks. Testnet3 and testnet4 are public networks with less predictable state and should not be confused with regtest.

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
- **Cookie authentication:** Per-process credentials stored in a configured cookie file.
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
   - Supports: Exact Bitcoin Core 31.1 final-release implementation reviewed on July 26, 2026.
2. **Bitcoin Core 31.1 JSON-RPC Interface** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/JSON-RPC-interface.md
   - Supports: Root and wallet endpoints, parameter passing, implicit major-version interface versioning, JSON-RPC 1.1 and 2.0 differences, notifications, security guidance, consistency guarantees, and file-descriptor limitation.
3. **Bitcoin Core 31.1 HTTP RPC Server** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/httprpc.cpp
   - Supports: POST-only RPC handling, Basic authentication, `rpcauth`, whitelist defaults and intersection, singleton and batch response handling, sequential batch execution, notifications, HTTP status behavior, and endpoint registration.
4. **Bitcoin Core 31.1 RPC Request and Cookie Implementation** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/rpc/request.cpp
   - Supports: JSON-RPC version parsing, response field construction, 2.0 notification identity, `jsonrpc: 1.0` compatibility, parameter validation, cookie path, generation, permissions, reading, and deletion lifecycle.
5. **Bitcoin Core 31.1 RPC Request Type** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/rpc/request.h
   - Supports: Exact 2.0 notification condition and request state used by the server.
6. **Bitcoin Core 31.1 HTTP Server** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/httpserver.cpp
   - Supports: Loopback defaults, `rpcbind` and `rpcallowip` pairing, source-address filtering, worker threads, bounded work queue, HTTP 503 overload and shutdown responses, server timeout, and shutdown sequencing.
7. **Bitcoin Core 31.1 RPC Server** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/rpc/server.cpp
   - Supports: RPC warmup, command registration and execution, built-in help, active-command reporting, and stop and interruption boundaries.
8. **Bitcoin Core 31.1 Wallet RPC Utility** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/wallet/rpc/util.cpp
   - Supports: Wallet-name URL decoding, explicit wallet lookup, zero-, one-, and multiple-wallet root-endpoint selection, and wallet-not-found and wallet-not-specified errors.
9. **Bitcoin Core 31.1 Command-Line RPC Client** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/bitcoin-cli.cpp
   - Supports: `bitcoin-cli` client behavior, request construction, wallet selection, authentication lookup, timeouts, and output handling.
10. **Bitcoin Core 31.1 Top-Level Bitcoin Command Documentation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/man/bitcoin.1
    - Supports: Installed `bitcoin` command and `rpc` subcommand boundary for the reviewed release.
11. **Bitcoin Core 31.1 REST Interface** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/REST-interface.md
    - Supports: REST enablement, shared HTTP port, unauthenticated resources, index dependencies, consistency boundary, file-descriptor risk, and browser privacy risk.
12. **Bitcoin Core 31.1 ZeroMQ Documentation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/zmq.md
    - Supports: Build-time enablement, runtime publisher options, read-only notification topics, no subscriber authentication, lost-message detection, assumeutxo notification boundary, reorganization handling, and reconciliation requirements.
13. **Bitcoin Core 31.1 Configuration File Documentation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/bitcoin-conf.md
    - Supports: Configuration precedence, network-specific sections, data and configuration paths, and restart requirements.
14. **Bitcoin Core 31.1 File-System Documentation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md
    - Supports: Configuration and data paths, wallet directories, logs, chain-specific data directories, installed binaries, and wallet-backup boundaries.
15. **Bitcoin Core 31.1 RPC Authentication Tool** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/share/rpcauth
    - Supports: Generation and use of salted `rpcauth` credentials.
16. **Bitcoin Core 31.1 RPC Functional Tests** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/test/functional
    - Supports: Release-pinned test coverage for RPC methods, wallet selection, HTTP behavior, authentication, startup states, batches, notifications, and error handling.
17. **Bitcoin Core 31.1 Functional Test Documentation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/test/functional/README.md
    - Supports: RPC and P2P test-interface separation and current functional-test structure.
18. **JSON-RPC 2.0 Specification** | JSON-RPC Working Group
    - URL: https://www.jsonrpc.org/specification
    - Supports: Standard request and response objects, named and positional parameters, notifications, batches, and error-object structure; Bitcoin Core’s documented compatibility exceptions remain implementation-specific.
19. **Bitcoin Core 31.1 Release Notes** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/release-notes.md
    - Supports: Release identity, upgrade boundary, supported-platform statement, and release-specific changes.
20. **Bitcoin Core 31.1 README** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/README.md
    - Supports: Bitcoin Core as a validating implementation, stable release tags, and testing and review boundaries.
21. **Bitcoin Core 31.1 Memory Guidance** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/reduce-memory.md
    - Supports: Configurable RPC thread count and resource tradeoffs; exact HTTP work-queue and binding behavior is established by the release-pinned HTTP server source.

## 5. SEO title

How Bitcoin RPC Works: Interfaces, Security, and Readiness

## 6. Meta description

Learn how Bitcoin Core RPC clients, HTTP, JSON-RPC, wallet endpoints, authentication, security boundaries, readiness checks, batches, and errors work.

## 7. Page excerpt

Understand Bitcoin Core’s RPC client-server boundary, wallet routing, credentials, versioning, operational limits, and why a valid reply is not proof of node readiness.

## 8. Estimated reading time

20 to 23 minutes

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
- [x] `bitcoin-cli`, `bitcoin rpc`, the RPC server, node behavior, wallet behavior, REST, ZMQ, and P2P remain distinct.
- [x] HTTP transport, JSON encoding, JSON-RPC structure, method semantics, authentication, authorization, encryption, and reachability remain distinct.
- [x] JSON-RPC 1.1 and 2.0 request markers, response fields, IDs, notifications, HTTP status behavior, positional and named parameters, `args`, errors, and batch compatibility are pinned to Bitcoin Core 31.1.
- [x] Batch elements are described as sequential, non-atomic, and capable of partial success; the all-notification and empty-batch behavior is qualified.
- [x] Node-wide and wallet RPCs, URL-decoded wallet endpoints, zero-, one-, and multiple-wallet root behavior, loading, unloading, disabled-wallet builds, and rescanning boundaries are explained.
- [x] Cookie authentication, `rpcauth`, plaintext credential risks, whitelist defaults, repeated-entry intersection, binding, firewalling, and network isolation are qualified without promising security.
- [x] `rpcbind` and `rpcallowip` pairing, loopback defaults, shared REST listener boundaries, native lack of RPC encryption, and public-exposure warnings are exact for 31.1.
- [x] RPC worker threads, bounded work queue, server and client timeout distinctions, file-descriptor risk, startup warmup, shutdown, indexing, rescanning, retries, and long-running calls are treated as operational states.
- [x] REST authentication boundaries and ZMQ compilation, authentication, loss, ordering, and reconciliation boundaries are explicit.
- [x] A successful response is not treated as proof of synchronization, intended chain, active-chain confirmation, host integrity, or application suitability.
- [x] Regtest, signet, testnet3, testnet4, and mainnet are not conflated.
- [x] Protocol rules, Bitcoin Core implementation behavior, configurable defaults, and release-specific interfaces remain distinct.
- [x] Current release claims are dated July 26, 2026 and pinned to Bitcoin Core `v31.1` commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`.
- [x] Planned internal links remain inactive, no publication is implied, and no uptime, security, or correctness guarantee is made.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-26
- Bitcoin Core release reviewed: `31.1`; tag `v31.1`; commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`
- Primary evidence reviewed: Bitcoin Core’s release commit and official download record; `doc/JSON-RPC-interface.md`; `src/httprpc.cpp`; `src/httpserver.cpp`; `src/rpc/request.cpp`; `src/rpc/request.h`; `src/rpc/server.cpp`; `src/wallet/rpc/util.cpp`; `src/bitcoin-cli.cpp`; the `bitcoin` manual; REST and ZMQ documentation; authentication tooling; release-pinned functional-test structure; and the JSON-RPC 2.0 specification.
- Material corrections made: Corrected JSON-RPC version, ID, notification, HTTP-status, empty-batch, and sequential-batch behavior; added exact zero-, one-, and multiple-wallet routing and wallet-name decoding; documented cookie-path and permission configurability; made `rpcwhitelistdefault` and repeated-whitelist intersection exact; corrected loopback binding and the required `rpcbind` plus `rpcallowip` pair; removed the unsupported implication of a fixed HTTP connection limit; added the bounded work queue and HTTP 503 behavior; clarified REST’s lack of RPC authentication and ZMQ’s build, authentication, loss, and reconciliation boundaries.
- Remaining sensitivities: Method schemas, defaults, deprecated RPCs, wallet lifecycle behavior, optional build features, REST resources, ZMQ topics, and operational limits remain release- and configuration-sensitive. Application readiness, retry safety, and wallet identity must be tested against the deployed binary and workload.
- Renewal requirement: Re-review the official release record, release notes, built-in help, JSON-RPC documentation, HTTP and wallet-routing source, and relevant tests before changing the reviewed Bitcoin Core version or publishing configuration guidance.
- Copy-lock authorization: Human Verification is complete for specialist review only and does not authorize Editorial Manager acceptance or copy-lock.

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
