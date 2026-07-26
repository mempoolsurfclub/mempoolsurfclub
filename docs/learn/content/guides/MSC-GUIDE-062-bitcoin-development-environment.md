---
registry_id: MSC-GUIDE-062
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: How to Set Up a Bitcoin Development Environment
handle: bitcoin-development-environment
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

# How to Set Up a Bitcoin Development Environment

## 1. Introductory deck

A Bitcoin development environment should separate source code, build output, test data, credentials, and real funds. The right setup depends on whether the goal is to call a released node, study implementation code, build Bitcoin Core, write tests, or operate an application. Current Bitcoin Core uses CMake, and safe local experiments normally belong on regtest with dedicated wallets and data directories rather than mainnet.

## 2. Full article

A development environment is not one universal installation recipe. It is a controlled collection of source versions, binaries, compilers, dependencies, configuration, test networks, data directories, credentials, and documentation that lets a developer reproduce an experiment without endangering production systems.

Start by defining the work. An application developer calling RPC needs a different environment from a Bitcoin Core contributor changing validation code. A protocol researcher may need custom test vectors and multiple node versions. An operator testing an upgrade may need production-like storage and monitoring without production keys.

This guide was researched on July 26, 2026 against Bitcoin Core 31.1 at tag `v31.1`, commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`. Bitcoin Core’s current build system, dependency requirements, commands, and directory layout are implementation- and release-specific.

### Define the objective before choosing tools

Write down the intended outcome in one sentence. Examples include:

- learn how RPC responses change during a reorganization;
- build and run an unmodified Bitcoin Core release;
- modify one source component and add a regression test;
- test an application against multiple Bitcoin Core major versions;
- benchmark an index or wallet workflow;
- reproduce a reported bug on an exact commit.

The objective determines whether a released binary is enough, whether a source build is necessary, which network is appropriate, and how much isolation is required. Installing every optional dependency before defining the task usually adds complexity without adding evidence.

### Released binaries and source builds serve different purposes

A released binary is appropriate when the application needs a known Bitcoin Core interface but does not need to modify Bitcoin Core. Official release archives are accompanied by checksums and signatures. Verify the downloaded file against the official `SHA256SUMS`, then verify signatures from maintainers whose keys you have independently authenticated.

A source checkout is appropriate when reading code, changing behavior, adding tests, building uncommon options, using sanitizers, or reproducing a commit. Cloning the official `bitcoin/bitcoin` repository gives access to branches, tags, history, tests, build files, and documentation. The `master` branch is development work and is not promised to be as stable as a release tag.

Do not treat a directory named `bitcoin-31.1` as proof of what it contains. Record the repository URL, selected tag or branch, exact commit hash, and whether the worktree has local changes. For a team experiment, the commit hash is the durable identity; a moving branch name is not.

### Verify tags, commits, and release artifacts

A careful release workflow checks more than one layer:

1. Obtain the source or binary from an official location.
2. Record the exact version and commit.
3. Verify the release archive’s SHA-256 checksum against the published checksum list.
4. Verify signatures on the checksum list with trusted maintainer keys.
5. When using Git, inspect and verify the release tag according to the project’s current release documentation.
6. Preserve the verification output with the environment record.

A valid signature proves that the holder of a particular key signed data. It does not prove that the key was correctly identified, that the signer reviewed every line, or that the software is defect-free. Key authentication and release diversity remain part of the trust model.

### Bitcoin Core 31.1 uses CMake

Bitcoin Core’s current build documentation uses CMake. A typical out-of-source build on a Unix-like platform begins with:

```sh
cmake -B build
cmake --build build
ctest --test-dir build
```

The first command configures a build directory. The second compiles the configured targets. The third runs the CTest-registered tests, including unit tests when they were enabled and their dependencies were available.

These commands are a structural example, not a cross-platform promise. Package names, compiler versions, generators, SDKs, paths, and optional features differ among Linux distributions, macOS, Windows, BSD systems, and cross-compilation targets. Use the build document for the exact platform and release.

### Compiler and dependency expectations

Bitcoin Core is primarily C++ software with Python-based functional tests and a growing set of auxiliary tools. Bitcoin Core 31.1’s dependency documentation defines supported compiler, language, Python, library, and platform requirements. The repository’s `depends` system can build and cache pinned dependencies and supports cross-compilation.

Build dependencies are tools and libraries needed to compile or test software. Runtime dependencies are what the built program needs when it executes. They are not necessarily the same. For example, a compiler and CMake are build requirements, while the resulting headless node may not need development headers at runtime.

Optional features change dependencies. Wallet support requires SQLite in current Bitcoin Core. GUI, ZeroMQ, IPC, QR encoding, tracing, fuzzing, and test targets add their own requirements. Disable an optional component only when the experiment does not need it, and record the option because it changes what the binary can do.

### Native dependencies and the `depends` system

A native build can use libraries supplied by the operating system. This is convenient for local development and often integrates well with package updates and debuggers. The exact package versions can vary between machines.

The repository’s `depends` directory builds a controlled dependency set and can target another operating system or architecture. In Bitcoin Core 31.1, CMake does not automatically consume the `depends` output. The generated toolchain file must be supplied during configuration, for example through `--toolchain depends/<host>/toolchain.cmake`.

The `depends` system improves control over inputs, but it does not make every build bit-for-bit reproducible by itself. Reproducible binaries require controlled source, dependencies, toolchain, environment, timestamps, packaging, and comparison procedures.

### Keep source, build, data, and test state separate

Use separate directories for separate roles:

- **source directory:** Git checkout and source files;
- **build directory:** generated files, object files, binaries, and test runners;
- **node data directory:** chain data, settings, logs, indexes, wallets, and cookie credentials;
- **functional-test directories:** temporary node data created by the test framework;
- **application state:** the application’s own database, caches, and secrets.

An out-of-source CMake build keeps generated content out of the checkout. A dedicated `-datadir` keeps experiments away from a default mainnet directory. Functional tests create temporary regtest nodes and should not be pointed at a real node’s data.

Never run two node processes against the same data directory. Do not copy a live wallet database as though it were ordinary test data. Use supported backup and restore procedures for wallet material.

### Choose the right Bitcoin network

Bitcoin Core supports multiple chain environments with separate data directories and network identities.

**Regtest** creates a private local chain. Blocks are produced only when the developer requests them. Difficulty and network state are designed for rapid deterministic testing. Regtest has no public peers and no shared economic history.

**Signet** is a public test network where blocks must satisfy a configured signing challenge in addition to proof-of-work rules. The default signet is useful when multiple developers or services need a shared public chain with more controlled block production.

**Testnet3 and testnet4** are public testing networks. They have public peers, public history, and unpredictable activity. Test coins have no intended monetary value, but network state can still be unstable or inconvenient for deterministic tests. Bitcoin Core 31.1 keeps testnet3 and testnet4 distinct.

**Mainnet** carries real economic activity and real funds. It should not be the default environment for experimentation. Reading mainnet data can be appropriate, but code that creates transactions, imports keys, changes policy settings, or exposes interfaces should be proven elsewhere first.

### A minimal regtest workflow

A practical local workflow uses one dedicated data directory and explicit chain selection. After starting a regtest node, create or load a development wallet, request a new address, and generate blocks to that address with the current `generatetoaddress` RPC. Coinbase outputs require maturity before they can be spent, so a developer commonly generates enough blocks to mature test funds.

The exact client syntax depends on whether the environment uses `bitcoin-cli`, `bitcoin rpc`, a custom client, or the functional-test framework. Confirm the deployed release’s built-in help for `createwallet`, `getnewaddress`, and `generatetoaddress` rather than copying an old command line.

Regtest lets a developer control block timing, create competing branches with multiple nodes, invalidate or reconsider blocks, and test confirmation handling. Deterministic block production does not make application behavior automatically deterministic: clocks, threads, random values, database ordering, and external dependencies may still vary.

### RPC and wallet setup for development

Use development-only credentials and wallets. Cookie authentication is convenient when the application and node share a trusted host account boundary. Static `rpcauth` credentials can suit separate local services. Do not reuse production RPC secrets.

Select a wallet explicitly in multi-wallet tests. Name wallets for their role, such as `sender`, `receiver`, or `watchonly`, and record whether private keys are enabled. A development wallet should never contain a real seed phrase, imported production descriptor, hardware-wallet backup, or mainnet signing key.

RPC reachability should remain local or inside an isolated test network. Authentication does not encrypt Bitcoin Core’s native RPC transport. Containers and virtual machines can help create a private topology, but port publishing can expose an endpoint unexpectedly.

### Logging and debugging

Bitcoin Core writes `debug.log` in the active chain-specific data directory unless configured otherwise. Logging categories can be enabled for targeted investigation. `-printtoconsole` is useful for temporary interactive work, while a retained log file is often better for comparing runs.

Record the command line and effective configuration with the test result. Be careful when sharing logs: RPC parameters, wallet labels, addresses, file paths, peer addresses, and application data can reveal sensitive information. Redact deliberately rather than assuming a “test” log is harmless.

Native debuggers such as GDB and LLDB can run or attach to test binaries and node processes. Debug builds, symbols, tracing, and sanitizers may change timing and resource use, so a bug observed only under one instrumented setup should be reproduced thoughtfully.

### Run the current tests

Bitcoin Core 31.1 organizes major test layers in different locations:

- unit tests in `src/test/` and wallet unit tests in `src/wallet/test/`;
- functional and integration tests in `test/functional/`;
- fuzz harnesses in `src/test/fuzz/` with runner tooling under `test/fuzz/`;
- lint checks in `test/lint/`;
- test data and vectors in relevant `src/test/data/` and test-framework locations;
- CI definitions and scripts under `.github/workflows/` and `ci/`.

Run unit tests with `ctest --test-dir build` or the `test_bitcoin` executable for focused cases. Run functional tests through `build/test/functional/test_runner.py`. Use `--extended` only when the additional time and dependencies are appropriate.

A successful build proves that the selected toolchain produced binaries. Passing tests adds evidence for the cases executed. Neither establishes that the software is correct in every environment.

### Optional analysis tools

Bitcoin Core provides or documents additional tools for deeper work:

- AddressSanitizer and UndefinedBehaviorSanitizer for classes of runtime defects;
- ThreadSanitizer for data races where supported;
- MemorySanitizer with a fully instrumented toolchain;
- libFuzzer targets and seed corpora;
- Valgrind for selected memory and execution analysis;
- clang-tidy and compiler warnings for static checks;
- repository lint and formatting checks;
- benchmarks for performance measurements;
- GDB, LLDB, `perf`, and tracepoints for diagnosis.

Each tool has blind spots and can introduce overhead. A sanitizer-clean run is evidence about one build and execution path, not a security certificate.

### IDEs, editors, containers, and virtual machines

Bitcoin Core development does not require one editor or IDE. Use tools that preserve repository formatting, expose compile errors, and make the exact build commands visible. Generated compile-command databases can improve editor integration without making the editor the build authority.

Containers can pin packages, simplify CI parity, and isolate ports and filesystems. Virtual machines can provide a stronger operating-system boundary and support multi-platform tests. Neither automatically creates a secure environment. Mounted host directories, privileged modes, shared kernels, copied secrets, broad networking, stale images, and vulnerable dependencies can defeat the intended isolation.

Treat the environment definition as code: keep container files or setup scripts reviewable, pin inputs where practical, and document which boundaries remain outside the container.

### Reproducibility and team handoffs

A useful environment record includes:

- objective and expected result;
- source repository, tag, commit, and local patch state;
- operating system and architecture;
- compiler, CMake, Python, and important dependency versions;
- CMake options and toolchain file;
- binary checksum;
- network and data-directory path;
- wallet type and whether keys are enabled;
- exact commands and test selections;
- known nondeterministic inputs;
- cleanup and reset procedure.

Pinning versions helps two developers reproduce instructions. It does not mean they produced reproducible binaries. To make a binary-reproducibility claim, compare independently produced artifacts under the project’s release-build process.

### Reset test state safely

Regtest state is disposable only when it contains no valuable keys or unique evidence. Stop the node cleanly before removing its dedicated data directory. Confirm the path and active chain before deletion. A careless recursive delete aimed at a test directory can destroy a default mainnet data directory or wallet.

Automated tests should create uniquely named temporary directories and clean only those they own. Preserve failing state when it is needed for diagnosis, then remove it through a reviewed cleanup command. Never “reset” by deleting a production wallet or by copying wallet files between live nodes.

A good Bitcoin development environment makes the experiment explicit, reversible, and isolated. It does not make the software or the operator infallible.

## 3. Key Terms

- **Source checkout:** Local Git working tree containing repository source and history references.
- **Release tag:** Named Git reference identifying an official stable release point.
- **Commit hash:** Immutable identifier for one Git commit.
- **Release artifact:** Distributed binary or source archive accompanied by checksums and signatures.
- **CMake:** Build-system generator used by Bitcoin Core 31.1.
- **Out-of-source build:** Build whose generated files live outside the source directory.
- **Build dependency:** Tool or library needed to compile or test software.
- **Runtime dependency:** Component required when the built software executes.
- **`depends`:** Bitcoin Core system for building and caching controlled dependencies and cross-compilation inputs.
- **Data directory:** Node directory containing chain data, indexes, settings, logs, credentials, and optional wallets.
- **Regtest:** Private local chain mode with developer-controlled block generation.
- **Signet:** Public test network with a block-signing challenge.
- **Testnet3 and testnet4:** Distinct public Bitcoin testing networks.
- **Sanitizer:** Compiler-assisted runtime instrumentation for selected defect classes.
- **Fuzzing:** Automated generation or mutation of inputs to explore program behavior.
- **Reproducible instructions:** Steps another person can follow under stated assumptions.
- **Reproducible binary:** Artifact independently rebuilt to identical bytes under a controlled process.

## 4. Sources

1. **Bitcoin Core 31.1 Tag Commit** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/commit/9be056a8a72b624dae9623b2f7bded92c2a21c91
   - Supports: Exact implementation version reviewed on July 26, 2026.
2. **Bitcoin Core Download Verification Guide** | Bitcoin Core project
   - URL: https://bitcoincore.org/en/download/
   - Supports: Current release identity, checksums, signature verification, and release-artifact trust boundaries.
3. **Bitcoin Core 31.1 README** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/README.md
   - Supports: Stable tags, development-branch caution, official repository, test commands, and code-review role.
4. **Bitcoin Core 31.1 Unix Build Notes** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/build-unix.md
   - Supports: Current CMake commands, out-of-source build, platform dependency examples, optional components, and test invocation.
5. **Bitcoin Core 31.1 Build Documentation Index** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/doc#building
   - Supports: Platform-specific build-document boundary for Unix, macOS, Windows, and BSD systems.
6. **Bitcoin Core 31.1 Dependencies** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/dependencies.md
   - Supports: Supported compilers, language versions, Python, libraries, optional features, and platform expectations.
7. **Bitcoin Core 31.1 Depends Build** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/depends/README.md
   - Supports: Controlled dependency builds, CMake toolchain selection, options, architectures, and cross-compilation.
8. **Bitcoin Core 31.1 Configuration File Documentation** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/bitcoin-conf.md
   - Supports: Chain-specific sections, configuration precedence, restart behavior, and custom data-directory paths.
9. **Bitcoin Core 31.1 File-System Documentation** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md
   - Supports: Source-independent data layout, chain-specific directories, wallet files, logs, credentials, and backup boundaries.
10. **Bitcoin Core 31.1 JSON-RPC Interface** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/JSON-RPC-interface.md
    - Supports: Development credential options, wallet endpoints, transport-security boundary, and version-sensitive RPC interface.
11. **Bitcoin Core 31.1 Mining RPC Source** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/rpc/mining.cpp
    - Supports: Current `generatetoaddress` registration, parameters, and regtest block-generation behavior.
12. **Bitcoin Core 31.1 Unit Test Documentation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/test/README.md
    - Supports: Unit-test locations, `ctest`, `test_bitcoin`, focused execution, temporary data directories, logs, and debuggers.
13. **Bitcoin Core 31.1 Test Documentation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/test/README.md
    - Supports: Functional, fuzz, and lint directories, current runner commands, caches, logs, tracing, and cleanup.
14. **Bitcoin Core 31.1 Functional Test Documentation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/test/functional/README.md
    - Supports: Regtest framework, RPC and P2P test interfaces, naming, cached chains, and test development workflow.
15. **Bitcoin Core 31.1 Fuzzing Guide** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/fuzzing.md
    - Supports: CMake fuzz presets, fuzz binary, target directory, seed corpora, sanitizers, and crash reproduction.
16. **Bitcoin Core 31.1 Developer Notes** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/developer-notes.md
    - Supports: Current coding tools, clang-tidy, compile-command configuration, debugger and review-oriented development practices.
17. **Bitcoin Core 31.1 Lint Documentation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/test/lint/README.md
    - Supports: Current CI-parity lint runner, individual checks, Rust test runner, and lint dependencies.
18. **Bitcoin Core 31.1 Release Notes** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/release-notes.md
    - Supports: Release compatibility, upgrade procedure, and release-specific implementation status.
19. **Bitcoin Core 31.1 Chain Parameters** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/kernel/chainparams.cpp
    - Supports: Distinct mainnet, testnet3, testnet4, signet, and regtest implementation parameters.
20. **Bitcoin Core 31.1 Functional Test Framework** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/test/functional/test_framework
    - Supports: Current local node orchestration, regtest data handling, wallet and P2P helpers, and reproducible functional experiments.

## 5. SEO title

Set Up a Bitcoin Development Environment Safely

## 6. Meta description

Learn how to choose Bitcoin Core binaries or source, verify releases, build with CMake, isolate data, use regtest, run tests, and document environments.

## 7. Page excerpt

Build a version-pinned Bitcoin development environment with separate source, build, test, wallet, and node state—and keep experiments away from real funds.

## 8. Estimated reading time

19 to 22 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-061 | How Bitcoin RPC Works
- Next: MSC-GUIDE-063 | How Bitcoin Software Is Tested
- Prerequisite: MSC-GUIDE-049 | What Is Bitcoin Core?
- Prerequisite: MSC-GUIDE-051 | How to Read the Bitcoin Source Code
- Prerequisite: MSC-GUIDE-052 | How Bitcoin Core Releases Work
- Related: MSC-GUIDE-041 | Bitcoin Developer Tools: A Practical Overview
- Related: MSC-GUIDE-043 | Bitcoin APIs Explained
- Related: MSC-GUIDE-021 | What Is a Bitcoin Full Node?
- Related: MSC-GUIDE-023 | How to Run a Bitcoin Node
- Branch: MSC-GUIDE-061 | How Bitcoin RPC Works
- Branch: MSC-GUIDE-063 | How Bitcoin Software Is Tested
- Branch: MSC-GUIDE-064 | How to Run Reliable Bitcoin Infrastructure
- Return: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] The environment objective is defined before tools, platforms, dependencies, or network choices.
- [x] Released binaries, source checkouts, branches, tags, commits, checksums, and signatures remain distinct.
- [x] Bitcoin Core 31.1’s CMake build system and current build and test commands are used without claiming one platform recipe works everywhere.
- [x] Build dependencies, runtime dependencies, native packages, `depends`, source directories, build directories, data directories, and test directories remain distinct.
- [x] Regtest, signet, testnet3, testnet4, and mainnet are explained as different environments.
- [x] Development wallets, credentials, and data are separated from production wallets, secrets, and real funds.
- [x] Current regtest funding and block-generation workflow is described conceptually and points to release help rather than relying on obsolete commands.
- [x] Unit, functional, fuzz, lint, sanitizer, static-analysis, debugging, logging, and benchmark roles are introduced without treating them as proof of correctness.
- [x] Containers and virtual machines are described as isolation tools rather than automatic security guarantees.
- [x] A successful build, passing tests, reproducible instructions, and reproducible binaries remain distinct.
- [x] Current release claims are dated July 26, 2026 and pinned to Bitcoin Core `v31.1` commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`.
- [x] Planned internal links remain inactive, no publication is implied, and no security or correctness guarantee is made.

## 11. Human verification

- Reviewer: Pending infrastructure specialist review
- Review date: Pending
- Primary evidence reviewed: Pending
- Material corrections made: Pending
- Remaining sensitivities: Pending
- Renewal requirement: Pending

## 12. Illustration brief

### Illustration 1

- Concept title: The Five-Dock Development Harbor
- Educational purpose: Teach the separation among source, build output, node data, functional-test state, and application state.
- Recommended placement: After Keep source, build, data, and test state separate.
- Visual description: Vintage harbor plan with five labeled docks connected by narrow, controlled routes. The source dock feeds the build dock; binaries launch a node using a dedicated data dock; tests use temporary regtest docks; the application has its own database and credentials.
- Required labels: Source checkout, Build directory, Binaries, Node data directory, Wallets, Test temporary directory, Application state, Do not share live data
- Caption: Separate directories prevent generated files, test chains, application state, and real wallet data from being confused.
- Alt text: Harbor-style systems diagram separating Bitcoin source, build output, node data, test data, and application state.
- Image orientation: Landscape
- Mobile crop notes: Preserve all five docks in a vertical stepped route.
- Status: PLANNED

### Illustration 2

- Concept title: Bitcoin Test-Network Navigation Chart
- Educational purpose: Compare regtest, signet, testnet3, testnet4, and mainnet by control, public reachability, predictability, and real-fund risk.
- Recommended placement: After Choose the right Bitcoin network.
- Visual description: Nautical chart with five distinct waters. Regtest is a private enclosed basin with a developer-operated block lever; signet is a shared marked channel; testnets are public rough-water routes; mainnet is a commercial shipping lane marked real value.
- Required labels: Regtest, Private chain, On-demand blocks, Signet, Shared public test chain, Testnet3, Testnet4, Public peers, Mainnet, Real funds
- Caption: Regtest is controlled local state; public test networks are shared and unpredictable; mainnet carries real economic consequences.
- Alt text: Comparison chart of Bitcoin regtest, signet, testnet3, testnet4, and mainnet development environments.
- Image orientation: Landscape
- Mobile crop notes: Use five stacked bands with one control and risk label per network.
- Status: PLANNED

### Illustration 3

- Concept title: From Release Source to Reproduced Experiment
- Educational purpose: Show the chain of evidence required for a version-pinned team environment.
- Recommended placement: After Reproducibility and team handoffs.
- Visual description: Cartographic route from official repository and signed release artifacts through tag, commit, checksum, compiler, dependency set, CMake options, binary hash, test data, command log, and reproduced result. A side path distinguishes identical instructions from identical binaries.
- Required labels: Official source, Release signature, Tag, Commit, Toolchain, Dependencies, CMake options, Binary checksum, Regtest state, Commands, Result, Reproducible instructions, Reproducible binary
- Caption: Reproduction depends on recorded inputs; following the same instructions is not automatically a bit-for-bit binary reproduction.
- Alt text: Evidence chain showing how an official Bitcoin Core source version becomes a documented and reproducible development experiment.
- Image orientation: Portrait
- Mobile crop notes: Keep the evidence chain vertical and the two reproducibility outcomes at the bottom.
- Status: PLANNED
