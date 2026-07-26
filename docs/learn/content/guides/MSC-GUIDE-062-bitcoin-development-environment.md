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

This guide was researched and technically reviewed on July 26, 2026 against Bitcoin Core 31.1 at tag `v31.1`, commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`. Bitcoin Core’s current build system, dependency requirements, commands, and directory layout are implementation- and release-specific.

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

A released binary is appropriate when the application needs a known Bitcoin Core interface but does not need to modify Bitcoin Core. Official release archives are accompanied by SHA-256 checksum files and signatures. Verify the downloaded archive against the published checksum, then verify the checksum signatures from maintainers whose signing keys you have independently authenticated.

A source checkout is appropriate when reading code, changing behavior, adding tests, building uncommon options, using sanitizers, or reproducing a commit. Cloning the official `bitcoin/bitcoin` repository gives access to branches, tags, history, tests, build files, and documentation. The `master` branch is development work and is not promised to be as stable as a release tag.

Do not treat a directory named `bitcoin-31.1` as proof of what it contains. Record the repository URL, selected tag or branch, exact commit hash, and whether the worktree has local changes. For a team experiment, the commit hash is the durable source identity; a moving branch name is not.

### Verify tags, commits, and release artifacts

A careful release workflow checks more than one layer:

1. Obtain the source or binary from an official location.
2. Record the exact release, tag, and commit.
3. Verify the archive’s SHA-256 checksum against the official checksum list.
4. Verify signatures on that checksum list with maintainer keys whose identities were established independently.
5. When using Git, inspect the selected tag and confirm the commit it resolves to.
6. Record local patches, build inputs, and the verification output with the environment.

A valid checksum proves that the file matches the referenced digest. A valid signature proves that a particular private key signed the checksum data. Neither result proves that the key was correctly attributed, that the signer reviewed every line, that the build is reproducible, or that the software is defect-free. Source identity, key distribution, build provenance, review, and release diversity remain distinct trust questions.

### Bitcoin Core 31.1 uses CMake

Bitcoin Core 31.1’s maintained build documentation uses CMake. A typical out-of-source build on a Unix-like platform begins with:

```sh
cmake -B build
cmake --build build
ctest --test-dir build
```

The first command configures a build directory. The second compiles the configured targets. The third runs tests registered with CTest, including unit tests when their dependencies were found and tests were not disabled.

These commands are a structural example, not a cross-platform promise. Package names, compiler versions, generators, SDKs, paths, optional features, and supported targets differ among Linux distributions, macOS, Windows, BSD systems, and cross-compilation environments. Use the release-pinned build document for the actual platform.

Do not retain older Autotools instructions such as `./autogen.sh` or `./configure` for a 31.1 environment. CMake options are passed during configuration, for example `-DENABLE_WALLET=OFF`, `-DBUILD_GUI=ON`, or `-DWITH_ZMQ=ON`, only when those choices match the experiment.

### Compiler and dependency expectations

Bitcoin Core is primarily C++ software with Python-based functional tests and auxiliary tools. For 31.1, the release-pinned dependency document requires at least Clang 17.0 or GCC 12.1, Boost 1.74.0, CMake 3.22, and libevent 2.1.8. Python 3.10 is the documented minimum for scripts and tests. Wallet builds use SQLite, with 3.7.17 listed as the minimum supported version.

Those are upstream minimums, not a promise that every operating-system package combination is supported or advisable. The platform build documents can impose additional requirements, and release binaries have their own runtime compatibility boundaries.

Build dependencies are tools and libraries needed to compile or test software. Runtime dependencies are what the built program needs when it executes. They are not necessarily the same. A compiler and CMake are build requirements, while a headless node does not need compiler development packages at runtime.

Optional features change dependencies and capability. Wallet support requires SQLite. GUI, ZeroMQ, IPC, QR encoding, tracing, fuzzing, and test targets add their own requirements. Disable an optional component only when the experiment does not need it, and record the option because it changes which binaries, RPCs, tests, and interfaces are available.

### Native dependencies and the `depends` system

A native build can use libraries supplied by the operating system. This is convenient for local development and often integrates well with package updates and debuggers. The exact versions can vary between machines.

The repository’s `depends` directory builds and caches a controlled dependency set and supports cross-compilation. On supported Unix-like hosts, the dependency build is started inside `depends` with `make` or the platform’s GNU make command. Options such as `NO_QT=1`, `NO_WALLET=1`, or `HOST=<triplet>` change the dependency set or target.

CMake does not automatically consume the `depends` output. The generated toolchain file must be supplied during configuration. A native Linux example is:

```sh
cmake -B build --toolchain depends/x86_64-pc-linux-gnu/toolchain.cmake
```

The exact host triplet must match the dependency build. The `depends` system improves control over inputs, but it does not make every build bit-for-bit reproducible by itself. Reproducible binaries require controlled source, dependencies, toolchain, environment, timestamps, packaging, and independent artifact comparison.

### Keep source, build, data, and test state separate

Use separate directories for separate roles:

- **source directory:** Git checkout and source files;
- **build directory:** generated files, object files, binaries, and test runners;
- **node data directory:** chain data, settings, logs, indexes, wallets, and cookie credentials;
- **functional-test directories:** temporary node data created by the test framework;
- **application state:** the application’s own database, caches, and secrets.

An out-of-source CMake build keeps generated content out of the checkout. A dedicated `-datadir` keeps experiments away from a default mainnet directory. Functional tests create temporary regtest nodes and must never be pointed at a real node’s data.

Bitcoin Core locks its data and blocks directories to prevent ordinary concurrent use, but that is not permission to design shared-datadir operation. Never run two node processes against the same data directory. Do not copy a live wallet database as though it were ordinary test data. Use supported backup and restore procedures for wallet material.

### Choose the right Bitcoin network

Bitcoin Core supports multiple chain environments with separate network identities and chain-specific data directories.

**Regtest** creates a private local chain. Blocks are produced only when the developer requests them. Difficulty and network state are designed for rapid controlled testing. Regtest has no public peers and no shared economic history.

**Signet** is a public test network where blocks must satisfy a configured signing challenge in addition to proof-of-work rules. The default signet is useful when multiple developers or services need a shared public chain with more controlled block production than public testnets.

**Testnet3 and testnet4** are distinct public testing networks in Bitcoin Core 31.1. They have public peers, public histories, and unpredictable activity. Test coins have no intended monetary value, but network state can still be unstable or inconvenient for deterministic tests. A configuration for one testnet must not be assumed to select the other.

**Mainnet** carries real economic activity and real funds. It should not be the default environment for experimentation. Reading mainnet data can be appropriate, but code that creates transactions, imports keys, changes policy settings, exposes interfaces, or mutates wallet state should be proven elsewhere first.

Always make the chain selection explicit in scripts and verify the `chain` field returned by the node. A valid RPC response from regtest or signet is still wrong for an application expecting mainnet.

### A minimal regtest workflow

A practical local workflow uses a dedicated data directory and explicit `-regtest` selection. After starting the node, create a development wallet, request an address, and generate blocks to it with the current `generatetoaddress` RPC. One example using `bitcoin-cli` is:

```sh
bitcoind -regtest -datadir=/path/to/dev-data -daemon
bitcoin-cli -regtest -datadir=/path/to/dev-data createwallet dev
ADDR=$(bitcoin-cli -regtest -datadir=/path/to/dev-data -rpcwallet=dev getnewaddress)
bitcoin-cli -regtest -datadir=/path/to/dev-data generatetoaddress 101 "$ADDR"
```

Bitcoin Core’s consensus constant requires 100 new blocks before a coinbase output can be spent. Generating 101 blocks from a new chain leaves the first subsidy output mature while the newest 100 remain immature. The number is not a wallet preference.

The exact client syntax can also use `bitcoin rpc` or a custom client, but command availability and argument names should be checked against the deployed release’s built-in help. Current wallets are descriptor wallets by default. No default wallet is automatically created, so scripts should create or load a named development wallet explicitly and select it in multi-wallet calls.

Regtest lets a developer control block timing, create competing branches with multiple nodes, invalidate or reconsider blocks, and test confirmation handling. Controlled block production does not make application behavior automatically deterministic: clocks, threads, random values, database ordering, and external dependencies may still vary.

### RPC and wallet setup for development

Use development-only credentials and wallets. Cookie authentication is convenient when the application and node share a trusted host account boundary. Static `rpcauth` credentials can suit separate local services. Do not reuse production RPC secrets.

Select a wallet explicitly in multi-wallet tests. Name wallets for their role, such as `sender`, `receiver`, or `watchonly`, and record whether private keys are enabled. A development wallet should never contain a real seed phrase, imported production descriptor, hardware-wallet backup, or mainnet signing key.

RPC reachability should remain local or inside an isolated test network. Authentication does not encrypt Bitcoin Core’s native RPC transport. Containers and virtual machines can help create a private topology, but port publishing, host networking, broad mounts, or copied secrets can expose an endpoint unexpectedly.

### Logging and debugging

Bitcoin Core writes `debug.log` in the active chain-specific data directory unless configured otherwise. Logging categories can be enabled for targeted investigation. `-printtoconsole` is useful for temporary interactive work, while a retained log file is often better for comparing runs.

Record the command line and effective configuration with the test result. Be careful when sharing logs: RPC parameters, wallet labels, addresses, file paths, peer addresses, and application data can reveal sensitive information. Redact deliberately rather than assuming a “test” log is harmless.

Native debuggers such as GDB and LLDB can run or attach to test binaries and node processes. Debug builds, symbols, tracing, and sanitizers can change timing and resource use, so a bug observed only under one instrumented setup should be reproduced thoughtfully.

### Run the current tests

Bitcoin Core 31.1 organizes major test layers in different locations:

- unit tests in `src/test/`, wallet unit tests in `src/wallet/test/`, and GUI tests in `src/qt/test/`;
- functional and integration tests in `test/functional/`;
- fuzz harnesses in `src/test/fuzz/` with runner tooling under `test/fuzz/`;
- lint checks in `test/lint/`;
- test vectors and data in relevant `src/test/data/` and framework locations;
- CI configuration and scripts under `.github/workflows/` and `ci/`.

Run CTest-registered tests with:

```sh
ctest --test-dir build --output-on-failure
```

Run the main unit binary directly for focused suites with `build/bin/test_bitcoin`. Run functional tests through `build/test/functional/test_runner.py`; `--extended` adds tests outside the normal suite and can require more time or optional dependencies.

A successful build proves that the selected toolchain produced binaries. Passing tests adds evidence for the cases actually executed. Neither establishes that the software is correct in every environment.

### Optional analysis tools

Bitcoin Core provides or documents additional tools for deeper work:

- AddressSanitizer and UndefinedBehaviorSanitizer for selected runtime defects;
- ThreadSanitizer for data races where supported;
- MemorySanitizer with a fully instrumented toolchain;
- libFuzzer targets and seed corpora;
- Valgrind for selected memory and execution analysis;
- clang-tidy and compiler warnings for static checks;
- repository lint and formatting checks;
- `bench_bitcoin` for performance measurements;
- GDB, LLDB, `perf`, and tracepoints for diagnosis.

Each tool has blind spots and can introduce overhead. A sanitizer-clean run is evidence about one build and execution path, not a security certificate. A benchmark measures a stated workload; it does not establish correctness.

### IDEs, editors, containers, and virtual machines

Bitcoin Core development does not require one editor or IDE. Use tools that preserve repository formatting, expose compile errors, and make the exact build commands visible. Generated compile-command databases can improve editor integration without making the editor the build authority.

Containers can pin package selections, simplify CI parity, and isolate ports and filesystems. Virtual machines can provide a separate operating-system boundary and support multi-platform tests. Neither automatically creates a secure or reproducible environment. Mounted host directories, privileged modes, shared kernels, copied secrets, broad networking, stale images, mutable tags, and vulnerable dependencies can defeat the intended boundary.

Treat the environment definition as code: keep container files or setup scripts reviewable, pin inputs where practical, and document which dependencies and trust boundaries remain outside the container.

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

Pinning versions helps two developers reproduce instructions. It does not mean they produced reproducible binaries. To make a binary-reproducibility claim, independently build and compare artifacts under a controlled release-build process.

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
- **Coinbase maturity:** Consensus delay of 100 new blocks before a coinbase output can be spent.
- **Sanitizer:** Compiler-assisted runtime instrumentation for selected defect classes.
- **Fuzzing:** Automated generation or mutation of inputs to explore program behavior.
- **Reproducible instructions:** Steps another person can follow under stated assumptions.
- **Reproducible binary:** Artifact independently rebuilt to identical bytes under a controlled process.

## 4. Sources

1. **Bitcoin Core 31.1 Tag Commit** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/commit/9be056a8a72b624dae9623b2f7bded92c2a21c91
   - Supports: Exact Bitcoin Core 31.1 final-release implementation reviewed on July 26, 2026.
2. **Bitcoin Core Download and Verification Records** | Bitcoin Core project
   - URL: https://bitcoincore.org/en/download/
   - Supports: Current official release, release archives, checksum files, signature records, and documented artifact-verification workflow.
3. **Bitcoin Core 31.1 README** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/README.md
   - Supports: Official repository, stable-tag and development-branch distinction, build and test entry points, and review boundary.
4. **Bitcoin Core 31.1 Unix Build Notes** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/build-unix.md
   - Supports: CMake configure, build, install, and test commands; out-of-source layout; platform package examples; optional components; and disable-wallet mode.
5. **Bitcoin Core 31.1 Build Documentation Index** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/doc#building
   - Supports: Platform-specific build-document boundary for Unix, macOS, Windows, and BSD systems.
6. **Bitcoin Core 31.1 Dependencies** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/dependencies.md
   - Supports: Minimum Clang, GCC, Boost, CMake, libevent, Python, SQLite, Qt, ZeroMQ, and other release-pinned dependency versions.
7. **Bitcoin Core 31.1 Depends Build** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/depends/README.md
   - Supports: Dependency build commands, options, host triplets, cross-compilation, and required CMake toolchain-file selection.
8. **Bitcoin Core 31.1 Configuration File Documentation** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/bitcoin-conf.md
   - Supports: Chain-specific sections, configuration precedence, restart behavior, and custom data-directory paths.
9. **Bitcoin Core 31.1 File-System Documentation** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md
   - Supports: Chain-specific directories, wallet files, logs, credentials, blocks-directory boundary, and backup cautions.
10. **Bitcoin Core 31.1 JSON-RPC Interface** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/JSON-RPC-interface.md
    - Supports: Development credential options, wallet endpoints, no automatic default wallet, transport-security boundary, and release-sensitive RPC interface.
11. **Bitcoin Core 31.1 Mining RPC Source** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/rpc/mining.cpp
    - Supports: Current mining RPC registration, `generatetoaddress`, chain-specific mining behavior, and help definitions.
12. **Bitcoin Core 31.1 Consensus Constants** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/consensus/consensus.h
    - Supports: Consensus `COINBASE_MATURITY` value of 100 new blocks.
13. **Bitcoin Core 31.1 Chain Parameters** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/kernel/chainparams.cpp
    - Supports: Distinct mainnet, testnet3, testnet4, signet, and regtest parameters and network identities.
14. **Bitcoin Core 31.1 Unit Test Documentation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/test/README.md
    - Supports: Unit-test locations, CTest, `build/bin/test_bitcoin`, focused execution, temporary data directories, logs, and debuggers.
15. **Bitcoin Core 31.1 Test Documentation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/test/README.md
    - Supports: Functional, fuzz, and lint directories, exact functional-runner commands, cached regtest state, logs, tracing, and cleanup.
16. **Bitcoin Core 31.1 Functional Test Documentation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/test/functional/README.md
    - Supports: Regtest framework, RPC and P2P test interfaces, naming, cached chains, node orchestration, and test development workflow.
17. **Bitcoin Core 31.1 Fuzzing Guide** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/fuzzing.md
    - Supports: CMake fuzz presets, fuzz binary, target selection, seed corpora, sanitizers, and crash reproduction.
18. **Bitcoin Core 31.1 Developer Notes** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/developer-notes.md
    - Supports: clang-tidy, compile-command configuration, debuggers, formatting, and review-oriented development practices.
19. **Bitcoin Core 31.1 Lint Documentation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/test/lint/README.md
    - Supports: CI-parity lint runner, individual checks, dependencies, and repository consistency tooling.
20. **Bitcoin Core 31.1 Release Notes** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/release-notes.md
    - Supports: Release identity, compatibility, upgrade procedure, fixes, and release-specific implementation status.
21. **Bitcoin Core 31.1 Functional Test Framework** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/test/functional/test_framework
    - Supports: Local node orchestration, regtest data handling, wallet and P2P helpers, temporary directories, and controlled functional experiments.
22. **Bitcoin Core 31.1 Wallet RPC Utility** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/wallet/rpc/util.cpp
    - Supports: Explicit wallet selection and the no-loaded-wallet and multiple-loaded-wallet error boundaries used by development scripts.

## 5. SEO title

Set Up a Bitcoin Development Environment Safely

## 6. Meta description

Learn how to choose Bitcoin Core binaries or source, verify releases, build with CMake, isolate data, use regtest, run tests, and document environments.

## 7. Page excerpt

Build a version-pinned Bitcoin development environment with separate source, build, test, wallet, and node state—and keep experiments away from real funds.

## 8. Estimated reading time

21 to 24 minutes

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
- [x] Released binaries, source checkouts, branches, tags, commits, checksums, signatures, key identity, and build provenance remain distinct.
- [x] Bitcoin Core 31.1’s CMake build system and current configure, build, CTest, install, and feature-option forms are used without claiming one platform recipe works everywhere.
- [x] Obsolete Autotools instructions are excluded from the 31.1 workflow.
- [x] Release-pinned minimum compiler, CMake, Boost, libevent, Python, SQLite, Qt, and ZeroMQ requirements are qualified as upstream minimums.
- [x] Native packages, `depends`, generated toolchain files, source directories, build directories, data directories, runtime dependencies, and test directories remain distinct.
- [x] Regtest, signet, testnet3, testnet4, and mainnet are explained as different environments and chain identity must be checked explicitly.
- [x] Current `createwallet`, `getnewaddress`, `generatetoaddress`, descriptor-wallet default, named-wallet selection, and 100-block coinbase maturity are represented accurately.
- [x] Development wallets, credentials, data directories, and private keys are separated from production wallets, secrets, and real funds.
- [x] Unit, functional, fuzz, lint, sanitizer, static-analysis, debugging, logging, and benchmark roles are introduced with current locations and commands.
- [x] Containers and virtual machines are described as isolation tools rather than automatic security or reproducibility guarantees.
- [x] A successful build, passing tests, reproducible instructions, and reproducible binaries remain distinct.
- [x] Current release claims are dated July 26, 2026 and pinned to Bitcoin Core `v31.1` commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`.
- [x] Planned internal links remain inactive, no publication is implied, and no security or correctness guarantee is made.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-26
- Bitcoin Core release reviewed: `31.1`; tag `v31.1`; commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`
- Primary evidence reviewed: Official Bitcoin Core release and download records; release commit and notes; release-pinned CMake build documents; `doc/dependencies.md`; `depends/README.md`; chain parameters; mining RPC source; consensus constants; JSON-RPC and filesystem documentation; unit, functional, fuzz, and lint documentation; developer notes; functional framework files; and wallet-routing implementation.
- Material corrections made: Added exact compiler, CMake, Boost, libevent, Python, SQLite, Qt, and ZeroMQ minimums; excluded obsolete Autotools instructions; corrected the `depends` build and required toolchain-file workflow; added an executable regtest example with explicit data and wallet selection; made descriptor-wallet creation and lack of an automatic default wallet explicit; established 100-block coinbase maturity and why 101 generated blocks are commonly used; tightened chain-selection, container, release-signature, test-command, and reproducibility boundaries.
- Remaining sensitivities: Platform support, package names, toolchain combinations, CMake options, optional components, release-signing procedures, test dependencies, wallet defaults, and network availability remain version- and host-specific. Commands must be checked against the selected release and platform before publication or team use.
- Renewal requirement: Re-review the official release page, release notes, dependency minimums, platform build documents, CMake options, `depends` workflow, chain parameters, wallet and mining RPC help, and test documentation before changing versions or presenting platform-specific instructions.
- Copy-lock authorization: Human Verification is complete for specialist review only and does not authorize Editorial Manager acceptance or copy-lock.

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
