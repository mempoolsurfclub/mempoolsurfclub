---
registry_id: MSC-GUIDE-063
status: COPY_LOCKED
page_role: topic-guide
h1: How Bitcoin Software Is Tested
handle: bitcoin-software-testing
category: Bitcoin Development
subcategory: Infrastructure
depth: Deep
format: Technical Explainer
primary_path: Build on Bitcoin
secondary_paths:
  - Understand the Network
author_display: Mempool Surf Club Editorial
reviewed_date: 2026-07-26
copy_locked_date: 2026-07-26
---

# How Bitcoin Software Is Tested

## 1. Introductory deck

Bitcoin software is tested through overlapping forms of evidence: unit tests, process-level functional tests, regtest scenarios, test vectors, fuzzing, static analysis, sanitizers, linting, benchmarks, continuous integration, manual review, and reproduced failures. Each layer finds different problems. Passing tests can increase confidence in the cases examined, but it does not prove that consensus, wallet, network, or infrastructure code is free from defects.

## 2. Full article

Bitcoin software handles adversarial network input, long-lived databases, cryptographic data, concurrent processes, wallet secrets, and consensus-sensitive state transitions. A defect can cause a local crash, privacy loss, wallet loss, chain disagreement, denial of service, or an application-level accounting error. No single test technique covers all of those risks.

Testing therefore works as layered evidence. A small deterministic unit test can isolate one calculation. A functional test can start real node processes and reproduce a reorganization. Fuzzing can generate malformed inputs that a human did not anticipate. Static analysis can flag suspicious code without running it. Review can question an assumption that every automated test shares.

This guide was researched and technically reviewed on July 26, 2026 against Bitcoin Core 31.1 at tag `v31.1`, commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`. Commands, test directories, CI jobs, presets, and tools are pinned to that implementation release.

### Testing creates evidence, not proof

A test establishes a limited statement: under a particular build, environment, input, and starting state, an observed result matched an expectation. The expectation may be incomplete. The test may not run on every platform. The test code can contain the same misunderstanding as the production code.

Formal proof is a different discipline. Some algorithms and protocol properties can be reasoned about mathematically, but the complete behavior of a large node implementation also depends on compilers, libraries, operating systems, filesystems, networking, hardware, configuration, and operator procedures.

A mature test strategy asks which failures each layer can detect, which assumptions each test encodes, and which risks remain outside it.

### Unit tests isolate components

Unit tests exercise relatively small units such as parsers, data structures, arithmetic boundaries, serialization helpers, script operations, fee calculations, wallet logic, or validation utilities. They are usually fast and deterministic enough to run frequently.

In Bitcoin Core 31.1, primary unit-test sources are under `src/test/`, with wallet-specific unit tests under `src/wallet/test/` and GUI tests under `src/qt/test/`. The `test_bitcoin` executable runs the main unit suites. CTest can run registered tests with:

```sh
ctest --test-dir build --output-on-failure
```

Focused suites can be listed and run directly through the build-tree executable:

```sh
build/bin/test_bitcoin --list_content
build/bin/test_bitcoin --run_test=getarg_tests
```

The exact build path changes if a different build directory was selected. A unit test often replaces or constructs surrounding state. That isolation is useful, but it can hide interactions that appear only when full processes, databases, sockets, or multiple nodes are involved.

### Functional and integration tests run real processes

Bitcoin Core’s Python functional tests live in `test/functional/`. Their generated runnable copies are under the build tree. They launch one or more Bitcoin Core processes, communicate over RPC or the P2P test interface, manipulate regtest chains, and inspect externally visible behavior.

The normal regression suite can be run through:

```sh
build/test/functional/test_runner.py
```

An individual test can be run directly or passed to the runner, for example:

```sh
build/test/functional/feature_rbf.py
build/test/functional/test_runner.py feature_rbf.py
```

`--extended` adds tests that are not in the normal suite. The runner executes up to four tests in parallel by default unless `--jobs` changes that setting. The framework manages temporary data directories, ports, logs, process startup, cached regtest chains, and cleanup.

Functional tests are integration evidence because they combine binaries, process boundaries, RPC, P2P messages, chainstate, mempool, wallet, indexes, and storage. They are slower and more exposed to timing, resource contention, optional dependencies, or platform variation than unit tests.

### Regtest is controlled chain state, not testnet

Most Bitcoin Core functional tests use regtest. Regtest is a private chain where the test controls block creation and peer topology. It supports fast scenarios such as mining blocks on demand, creating competing branches, triggering reorganizations, confirming and disconnecting transactions, testing wallet conflicts, and sending malformed P2P messages.

Regtest is not a public test network. Testnet3, testnet4, and signet have external peers and histories that a test does not control. They can be useful for interoperability or deployment observation, but they are poor substitutes for a deterministic regression test.

Even regtest does not make every test deterministic automatically. Wall-clock sleeps, scheduler order, resource contention, randomized ports, external processes, or assumptions about filesystem behavior can still create variation.

### Test vectors fix exact behavior

A test vector is a set of explicit inputs and expected outputs. Bitcoin development uses vectors for encodings, scripts, signatures, hashes, descriptors, transactions, and protocol edge cases. Vectors make byte-level behavior reviewable across implementations.

Consensus-related vectors are valuable only when their provenance and meaning are understood. A vector may demonstrate that one input must be accepted or rejected under a specific rule. It does not automatically cover neighboring values, all execution contexts, or policy behavior.

Test data in Bitcoin Core appears in relevant source and data directories, including `src/test/data/`. A test should identify whether its expected result comes from a consensus rule, an implementation decision, a relay policy, or a wallet convention.

### Consensus tests and policy tests answer different questions

Consensus rules determine whether a block is valid. Policy rules determine what a node will normally accept into its mempool or relay before confirmation. A transaction can be consensus-valid but nonstandard under a node’s current policy.

A consensus-boundary test may connect a block containing an unusual transaction and verify that validation agrees with the rule. A policy test may submit the same transaction to a mempool and expect rejection. Mixing those expectations can produce a test that teaches the wrong system model.

Bitcoin Core tests should label whether they exercise block validation, script consensus flags, mempool policy, mining selection, wallet behavior, or an RPC view. Passing one layer does not imply passing the others.

### Regression tests preserve a known failure

A regression test starts with a specific defect or unsafe behavior. The test should reproduce the relevant boundary on the affected version, fail before the correction, and pass after the correction. This creates durable evidence that the known case remains fixed.

Reproducing the original failure is important. A patch that merely makes a new test pass may not address the reported root cause. The test can also be too narrow: a crash input may be fixed while related malformed inputs still trigger another path.

For security-sensitive defects, public regression coverage may be delayed until disclosure and upgrade considerations are handled. Bitcoin Core’s security policy directs vulnerability reports to the private security contact rather than the public issue tracker. The absence of a public test does not establish that no private reproduction occurred.

### Fuzzing explores generated inputs

Fuzzing repeatedly feeds generated or mutated inputs into a harness and watches for crashes, sanitizer findings, invariant violations, or unexpected behavior. Bitcoin Core 31.1’s fuzz harnesses live under `src/test/fuzz/`.

The current libFuzzer quickstart uses CMake presets and a separate build directory:

```sh
cmake --preset=libfuzzer
cmake --build build_fuzz
FUZZ=process_message build_fuzz/bin/fuzz
```

A runner for all configured fuzz targets is available at `build_fuzz/test/fuzz/test_runner.py`. The project’s shared seed corpora are maintained in the `bitcoin-core/qa-assets` repository. Seed inputs help the fuzzer reach meaningful structures, while mutations explore nearby and combined cases. New coverage-increasing inputs can be saved and reviewed for inclusion in future corpora.

Fuzzing is not exhaustive. The input space is too large, some states are hard to reach, and a harness may omit important surrounding behavior. Millions of executions without failure provide evidence, not proof that every malformed input is safe. A crash also has to be reproduced against the same source, build configuration, sanitizer set, and input before its cause is understood.

### Properties and invariants strengthen tests

An example-based test checks selected cases. A property-oriented test checks a relationship across many cases, such as serialize-then-deserialize preserving a value or a state transition preserving an accounting invariant.

Bitcoin Core uses assertions, fuzz invariants, round-trip checks, model comparisons, and state consistency checks where appropriate. The strength depends on the property. An incorrect invariant can reject valid behavior or overlook the defect being sought.

Consensus-sensitive boundaries deserve special attention around integer ranges, lock times, sequence values, script limits, subsidy transitions, duplicate data, serialization lengths, and chainstate transitions. Boundary values and one-step-beyond values often reveal assumptions hidden by ordinary examples.

### Static analysis, warnings, sanitizers, lint, and formatting

Static analysis examines source or compiled structure without needing a particular runtime input. Compiler warnings can expose type conversions, unreachable code, missing cases, and suspicious constructs. Bitcoin Core documents clang-tidy workflows and repository-specific checks.

Sanitizers instrument a build to detect selected runtime defects. AddressSanitizer can detect many memory errors; UndefinedBehaviorSanitizer targets certain undefined operations; ThreadSanitizer looks for data races; MemorySanitizer tracks uninitialized reads under a fully instrumented environment. Each tool changes execution and has blind spots. MemorySanitizer in particular requires instrumented dependencies and is not equivalent to adding one compiler flag to an ordinary build.

Bitcoin Core’s lint checks live under `test/lint/`. In 31.1, the project documents `./ci/lint.py` as the local entry point intended to match CI lint execution. Individual checks and their dependencies are described in the lint documentation. Lints cover source, documentation, shell, Python, tree consistency, generated data, and formatting-related rules. A formatting check can make review easier, but formatting is not correctness.

### Network, timing, concurrency, storage, and shutdown

Many defects appear only when events interleave: a peer disconnects during message processing; a wallet rescans while blocks arrive; a lock order produces a rare race; an index is behind the chain tip; disk writes fail; or a process stops between durable writes.

Tests can inject disconnects, mock time, run competing threads, restart nodes, replace selected test files, and exercise graceful and abrupt shutdown paths. Some corruption tests deliberately modify data in isolated temporary directories. These techniques must never be aimed at a live production data directory.

A deterministic test controls time and events explicitly. A flaky test sometimes passes and sometimes fails without an intentional input change. Flakiness is not harmless: it trains reviewers to ignore failures and can hide a real race. The remedy is to remove timing assumptions, capture diagnostics, or isolate the platform-specific cause—not to retry indefinitely until green.

### Wallet and RPC testing

Wallet tests cover descriptor import, address derivation, coin selection, transaction creation, encryption, backups, rescans, conflicts, migration, loading, and multi-wallet behavior. Wallet code manages secrets and user expectations that are separate from node validation.

RPC tests validate method discovery, parameters, errors, result fields, wallet routing, authentication, JSON-RPC versions, batches, and state-dependent behavior. A valid JSON result can still be semantically unsuitable if the node is on the wrong chain or is not synchronized. Application tests should validate readiness and chain context, not only response syntax.

### P2P, mempool, and chain tests

P2P tests construct and send protocol messages to exercise handshake, inventory, transaction, block, compact-block, address, and disconnect behavior. Malformed serialization and resource limits matter because peers are untrusted.

Mempool tests examine policy, replacement, package relationships, ancestor and descendant limits, fee handling, expiry, eviction, and reorganization behavior. Mempool acceptance is not consensus validity.

Chain tests cover block connection and disconnection, reorganizations, competing work, headers, pruning, indexes, assumeutxo background validation, and UTXO transitions. Header synchronization is not full block validation, and a test must identify which chainstate or state transition it observes.

### Benchmarks measure performance, not correctness

Bitcoin Core’s `bench_bitcoin` framework measures selected operations. Bitcoin Core 31.1 can configure benchmark targets with `-DBUILD_BENCH=ON` and run the resulting `build/bin/bench_bitcoin` executable, adjusting the build-directory path when needed.

Results depend on hardware, compiler, build type, background load, caches, and input set. A faster benchmark does not prove equivalent behavior. A slower benchmark is not necessarily a correctness defect. Fixed benchmark inputs are also poorly suited to exploring denial-of-service input space compared with fuzzing.

### Continuous integration combines configurations

Continuous integration, or CI, builds and tests commits in automated environments. Bitcoin Core’s CI scripts are under `ci/`, and workflow configuration is under `.github/workflows/`. Jobs use varied compilers, options, sanitizers, operating systems, and architectures because one configuration cannot represent every deployment.

A green CI result means the configured jobs that actually ran completed successfully for that commit. It does not mean every test ran, every platform was covered, external dependencies are safe, the code was reviewed, or production operations are ready. A skipped, cancelled, absent, or misconfigured job is not a passing job.

CI can also be wrong: caches can be stale, jobs can be conditionally skipped, infrastructure can fail, or a test can accidentally stop running. Reviewers should inspect which workflow, job matrix, commit, and test commands executed and what they covered.

### Manual review and independent testing

Code review examines design, assumptions, failure modes, maintainability, and whether tests correspond to the intended rule. Independent testing by someone other than the author can uncover environment and interpretation gaps.

Review is especially important for consensus changes, wallet migrations, cryptography, networking, and storage. A reviewer can ask questions that automated tests cannot formulate: Is policy being mistaken for consensus? Does the recovery path preserve old data? Does the test assert the behavior or merely avoid crashing?

Review is also fallible. Multiple reviewers can share the same assumption, and review depth varies. Clear test plans, exact reproduction steps, and small focused changes improve the evidence available.

### Coverage is a map, not a safety score

Coverage tools report which lines, branches, functions, or RPCs were exercised. Bitcoin Core’s functional runner can collect RPC coverage, and the project documents source-based fuzz coverage separately. Coverage can reveal untested areas, but a high percentage does not show that assertions were meaningful, boundary values were covered, concurrency was explored, or security properties were satisfied.

One test can execute a line without checking its result. One unexecuted error path can be critical. Coverage should guide questions, not become a claim that software is a certain percentage safe.

### Security-sensitive reporting and disclosure

When a test reveals a security-sensitive defect, public issue trackers may not be the appropriate first channel. Bitcoin Core’s `SECURITY.md` identifies the private reporting address and encryption-key fingerprints. Public advisories later communicate affected versions and fixes when disclosure is appropriate.

A fix should include reproduction and regression evidence when disclosure constraints allow. Public documentation should distinguish the original vulnerability, affected versions, mitigation, fixed releases, and remaining operational requirements.

Testing Bitcoin software is the disciplined accumulation of different evidence. Confidence grows when independent layers agree and their limitations remain visible.

## 3. Key Terms

- **Unit test:** Focused test of a small component or function under controlled dependencies.
- **Functional test:** Process-level test of externally visible behavior using real binaries.
- **Integration test:** Test of interactions among multiple components or processes.
- **Regtest:** Private Bitcoin chain mode controlled by the test.
- **Test vector:** Fixed input and expected output for exact behavior.
- **Regression test:** Test preserving a previously failing case.
- **Fuzzing:** Automated exploration using generated or mutated inputs.
- **Seed corpus:** Starting collection of inputs used by a fuzzer.
- **Invariant:** Property expected to remain true across operations or inputs.
- **Static analysis:** Source or binary analysis without executing a specific runtime path.
- **Sanitizer:** Runtime instrumentation detecting selected defect classes.
- **Lint:** Automated repository, style, documentation, or consistency check.
- **Benchmark:** Measurement of performance under stated inputs and environment.
- **Continuous integration:** Automated builds and tests run for commits or pull requests.
- **Flaky test:** Test whose result changes without an intentional change in input or code.
- **Consensus test:** Test of block-validity rules.
- **Policy test:** Test of node-local acceptance or relay behavior outside consensus.
- **Coverage:** Measurement of code or interface elements exercised, not a safety proof.

## 4. Sources

1. **Bitcoin Core 31.1 Tag Commit** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/commit/9be056a8a72b624dae9623b2f7bded92c2a21c91
   - Supports: Exact Bitcoin Core 31.1 final-release implementation reviewed on July 26, 2026.
2. **Bitcoin Core 31.1 README** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/README.md
   - Supports: Unit and functional test entry points, stable-release boundary, cross-platform CI statement, independent QA, and code-review role.
3. **Bitcoin Core 31.1 Unit Test Documentation** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/test/README.md
   - Supports: Unit-test source locations, CTest, `build/bin/test_bitcoin`, focused suites, logs, temporary data, and debugger use.
4. **Bitcoin Core 31.1 Test Documentation** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/test/README.md
   - Supports: Functional, fuzz, and lint test layers; exact runner forms; parallelism; cached regtest state; logs; RPC tracing; cleanup; and resource-contention cautions.
5. **Bitcoin Core 31.1 Functional Test Documentation** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/test/functional/README.md
   - Supports: RPC and P2P testing, regtest framework, naming, coverage, cached chains, synchronization, and process-level test structure.
6. **Bitcoin Core 31.1 Functional Test Runner** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/test/functional/test_runner.py
   - Supports: Functional-test selection, parallel execution, extended tests, result handling, coverage collection, and exit behavior.
7. **Bitcoin Core 31.1 Functional Test Framework** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/test/functional/test_framework
   - Supports: Node process control, regtest chains, RPC, P2P messages, block and transaction construction, synchronization helpers, temporary data, and logging.
8. **Bitcoin Core 31.1 Fuzzing Guide** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/fuzzing.md
   - Supports: LibFuzzer presets, exact build and run commands, all-target runner, target locations, corpora, sanitizer combinations, coverage inputs, and crash reproduction.
9. **Bitcoin Core 31.1 Fuzz Targets** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/src/test/fuzz
   - Supports: Release-pinned harness locations for serialization, P2P, script, transaction, wallet, and other input boundaries.
10. **Bitcoin Core QA Assets** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin-core/qa-assets
    - Supports: Shared fuzz seed corpora and corpus-review workflow; corpus presence does not prove exhaustive input coverage.
11. **Bitcoin Core 31.1 Lint Documentation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/test/lint/README.md
    - Supports: Current `ci/lint.py` entry point, individual lint checks, dependencies, and repository consistency tools.
12. **Bitcoin Core 31.1 Developer Notes** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/developer-notes.md
    - Supports: clang-tidy, formatting, assertions, source conventions, static analysis, compile commands, and fuzz-coverage workflow.
13. **Bitcoin Core 31.1 CI Documentation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/ci/README.md
    - Supports: CI scripts, varied configurations, dependencies, architecture emulation, sanitizer environments, caches, and local-run limitations.
14. **Bitcoin Core 31.1 CI Workflow** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/.github/workflows/ci.yml
    - Supports: Release-pinned workflow triggers, jobs, runner selection, and orchestration of CI configurations.
15. **Bitcoin Core 31.1 Benchmarking Guide** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/benchmarking.md
    - Supports: `BUILD_BENCH`, `bench_bitcoin` build and run forms, performance-regression purpose, environmental sensitivity, and distinction from correctness testing.
16. **Bitcoin Core 31.1 Benchmarks** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/src/bench
    - Supports: Current benchmark source locations and implementation-specific measured operations.
17. **Bitcoin Core 31.1 Test Data** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/src/test/data
    - Supports: Release-pinned JSON and binary vectors used by unit and functional test code.
18. **Bitcoin Core 31.1 P2P Processing** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/net_processing.cpp
    - Supports: Implementation boundary exercised by P2P tests and fuzz targets for untrusted peer messages.
19. **Bitcoin Core 31.1 Validation Source** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/validation.cpp
    - Supports: Block, chainstate, UTXO, reorganization, mempool interaction, and consensus-validation boundaries requiring layered tests.
20. **Bitcoin Core 31.1 Index and Pruning Functional Test** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/test/functional/feature_index_prune.py
    - Supports: Release-pinned functional evidence for pruning, block-filter and coin-statistics index synchronization, restart, reindex, and reorganization behavior.
21. **Bitcoin Core Security Policy** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/SECURITY.md
    - Supports: Private vulnerability-reporting address, supported-version reference, and encryption-key fingerprints.
22. **Bitcoin Core Security Advisories** | Bitcoin Core project
    - URL: https://bitcoincore.org/en/security-advisories/
    - Supports: Public advisory context, affected-release communication, and disclosure boundaries.
23. **Bitcoin Core 31.1 Release Notes** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/release-notes.md
    - Supports: Release identity and release-specific fixes across validation, P2P, wallet, tests, fuzzing, build, and CI.
24. **Bitcoin Core 31.1 Build Documentation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/build-unix.md
    - Supports: CMake and CTest command forms, build-directory assumptions, optional dependencies, and release-pinned build boundary.

## 5. SEO title

How Bitcoin Software Is Tested: Layers and Limits

## 6. Meta description

Explore Bitcoin Core unit, functional, regtest, fuzz, sanitizer, lint, benchmark, CI, and review practices—and why passing tests is not proof of correctness.

## 7. Page excerpt

See how Bitcoin software testing combines isolated units, real node processes, adversarial inputs, cross-platform builds, review, and regression evidence.

## 8. Estimated reading time

22 to 25 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-062 | How to Set Up a Bitcoin Development Environment
- Next: MSC-GUIDE-064 | How to Run Reliable Bitcoin Infrastructure
- Prerequisite: MSC-GUIDE-049 | What Is Bitcoin Core?
- Prerequisite: MSC-GUIDE-051 | How to Read the Bitcoin Source Code
- Prerequisite: MSC-GUIDE-052 | How Bitcoin Core Releases Work
- Related: MSC-GUIDE-030 | How Bitcoin Reaches Consensus
- Related: MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?
- Related: MSC-GUIDE-041 | Bitcoin Developer Tools: A Practical Overview
- Related: MSC-GUIDE-043 | Bitcoin APIs Explained
- Branch: MSC-GUIDE-061 | How Bitcoin RPC Works
- Branch: MSC-GUIDE-062 | How to Set Up a Bitcoin Development Environment
- Branch: MSC-GUIDE-064 | How to Run Reliable Bitcoin Infrastructure
- Return: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] Testing is described as layered evidence rather than proof that Bitcoin software is defect-free.
- [x] Unit, functional, integration, regtest, test-vector, regression, fuzz, property, static-analysis, sanitizer, lint, benchmark, CI, coverage, and manual-review roles remain distinct.
- [x] Current Bitcoin Core 31.1 source locations, build-tree paths, and command forms are identified for unit tests, functional tests, fuzz targets, linting, benchmarking, and CI.
- [x] Source test directories are distinguished from generated build-tree runners.
- [x] Regtest is not confused with testnet3, testnet4, signet, or mainnet, and deterministic intent is not confused with automatic determinism.
- [x] Consensus rules, policy rules, wallet behavior, RPC behavior, P2P behavior, and implementation choices remain distinct.
- [x] Network, timing, concurrency, database, index, shutdown, reorganization, serialization, malformed-input, resource-contention, and cross-platform testing are covered.
- [x] Fuzz harnesses, seed corpora, all-target runner, sanitizer requirements, crash reproduction, coverage, and non-exhaustiveness are qualified.
- [x] Static analysis, compiler warnings, sanitizers, lint, formatting, benchmarks, and coverage are not presented as proof of correctness.
- [x] Green CI is limited to configured jobs that actually ran; skipped, absent, cancelled, or misconfigured checks are not described as passing.
- [x] Test code, expected results, CI configuration, static tools, and review are acknowledged as fallible.
- [x] Security-sensitive findings are routed according to the release-pinned security policy rather than automatically to a public issue tracker.
- [x] Current release claims are dated July 26, 2026 and pinned to Bitcoin Core `v31.1` commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`.
- [x] Planned internal links remain inactive, no publication is implied, and no correctness, security, or production-readiness guarantee is made.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-26
- Bitcoin Core release reviewed: `31.1`; tag `v31.1`; commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`
- Primary evidence reviewed: Release-pinned unit, functional, fuzz, lint, benchmark, developer, CI, build, security, validation, P2P, test-data, and index-pruning files; the functional runner and framework; the QA-assets corpus repository; release notes; and official security advisories.
- Material corrections made: Made source-tree and build-tree paths explicit; added exact unit, focused-unit, functional, individual-functional, extended, fuzz, all-target fuzz-runner, lint, and benchmark command boundaries; documented default functional-test parallelism and cached regtest state; tightened fuzz corpus and MemorySanitizer limitations; clarified deterministic intent, CI skipped or absent jobs, source-based versus RPC coverage, security reporting, and safe corruption-testing boundaries; and added release-pinned index-pruning test evidence.
- Remaining sensitivities: Test selection, presets, build targets, optional dependencies, sanitizer support, CI matrices, lint requirements, flaky behavior, coverage tooling, and security-disclosure timing remain release- and environment-sensitive. Test success does not authorize deployment or establish absence of defects.
- Renewal requirement: Re-review CMake definitions, unit and functional test documentation, fuzz presets and corpora, lint and benchmark docs, CI workflow and scripts, security policy, and release notes before changing the reviewed release or publishing command guidance.
- Copy-lock authorization: Human Verification is complete for specialist review only and does not authorize Editorial Manager acceptance or copy-lock.

## 12. Illustration brief

### Illustration 1

- Concept title: The Layered Test Dry Dock
- Educational purpose: Show how different testing layers examine different parts of Bitcoin software.
- Recommended placement: After Testing creates evidence, not proof.
- Visual description: Vintage shipyard cutaway with a small component bench for unit tests, an assembled node dry dock for functional tests, a regtest water basin for chain scenarios, a storm tunnel for fuzzing, inspection lamps for sanitizers, and a review platform above all layers.
- Required labels: Unit tests, Functional tests, Regtest, Test vectors, Fuzzing, Sanitizers, Static analysis, CI, Manual review, Remaining unknowns
- Caption: Confidence comes from overlapping test layers; no single inspection sees the entire system.
- Alt text: Shipyard-style diagram comparing unit, functional, regtest, fuzz, sanitizer, CI, and manual review layers.
- Image orientation: Landscape
- Mobile crop notes: Use stacked layers and keep the remaining-unknowns boundary visible at the right edge.
- Status: PLANNED

### Illustration 2

- Concept title: Consensus Channel and Policy Channel
- Educational purpose: Prevent confusion between block-validity tests and mempool or relay-policy tests.
- Recommended placement: After Consensus tests and policy tests answer different questions.
- Visual description: Two parallel nautical channels carrying the same transaction. One passes through a mempool policy gate before relay; the other appears inside a candidate block and passes through consensus validation. Outcomes can differ without contradiction.
- Required labels: Transaction, Mempool policy, Standardness, Relay, Candidate block, Consensus validation, Consensus-valid but nonstandard, Node implementation
- Caption: Policy controls ordinary unconfirmed acceptance and relay; consensus controls block validity.
- Alt text: Parallel channels showing a transaction evaluated by mempool policy separately from consensus block validation.
- Image orientation: Landscape
- Mobile crop notes: Stack policy above consensus and preserve the divergent outcome label.
- Status: PLANNED

### Illustration 3

- Concept title: Green Check Does Not Mean Open Ocean Ready
- Educational purpose: Explain the boundary between a passing CI result and production readiness.
- Recommended placement: After Continuous integration combines configurations.
- Visual description: A test vessel passes several marked checkpoints—build, unit, functional, fuzz corpus, sanitizer, lint, and platform jobs—then reaches an outer harbor containing untested hardware, configuration, load, dependencies, operations, and adversarial conditions.
- Required labels: Build, Unit tests, Functional tests, Fuzz corpus, Sanitizer, Lint, CI platforms, Code review, Production configuration, Load, Dependencies, Operations, Unknown inputs
- Caption: A green CI run records successful configured checks; it does not certify every production environment or future input.
- Alt text: Nautical readiness diagram showing CI checkpoints followed by additional production risks outside the test harbor.
- Image orientation: Landscape
- Mobile crop notes: Keep the checkpoint sequence and the outer-harbor unknowns in a single horizontal-to-vertical transition.
- Status: PLANNED
