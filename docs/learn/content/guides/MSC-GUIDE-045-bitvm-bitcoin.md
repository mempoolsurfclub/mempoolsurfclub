---
registry_id: MSC-GUIDE-045
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: What Is BitVM?
handle: bitvm-bitcoin
category: Building on Bitcoin
subcategory: Innovation
depth: Deep
format: Technical Analysis
primary_path: Build on Bitcoin
secondary_paths:
  - Understand the Network
author_display: Mempool Surf Club Editorial
reviewed_date: null
copy_locked_date: null
---

# What Is BitVM?

## 1. Introductory deck

BitVM is an experimental way to verify claims about off-chain computation through Bitcoin commitments and dispute transactions. Learn where Bitcoin consensus ends, how optimistic challenges and pre-signed transaction graphs work, why bridge and rollup claims require additional assumptions, and what the project's developer-preview status means as of July 24, 2026.

## 2. Full article

BitVM is a family of experimental techniques for making claims about off-chain computation and resolving disagreements with Bitcoin transactions. The central idea is not to make every Bitcoin node execute a general-purpose program. Instead, participants compute elsewhere, commit to relevant statements, and use Bitcoin's existing script and transaction rules when a disputed claim must be tested.

That description is narrower than many headlines. BitVM is not an opcode, a Bitcoin consensus upgrade, a native virtual machine added to every node, or a production bridge standard. It is a research and implementation design built from existing Bitcoin capabilities such as Taproot commitments, hashes, signatures, timelocks, and pre-signed transaction paths.

### Where Bitcoin consensus ends

Bitcoin consensus validates transactions, signatures, scripts, witness data, locktimes, UTXO spends, and blocks. A validating node does not reconstruct the external program that a BitVM application claims to have run. It checks only the Bitcoin transactions and scripts presented on-chain.

The original BitVM paper, published in December 2023, describes a two-party prover-and-verifier model. The prover claims that a computation produced a particular result. The verifier can challenge a false claim through a prearranged sequence of transactions. The paper explicitly says the design requires no change to Bitcoin's consensus rules and that complex computation occurs off-chain.

That distinction matters. Bitcoin can enforce the consequences encoded in valid spending paths. It does not automatically know that a bridge operator followed another chain, that a proof statement matches a particular application, or that off-chain data was available. Those facts depend on the BitVM protocol instance, its software, its participants, and its cryptographic assumptions.

### Computation is compiled into a dispute system

A BitVM construction translates a computation into commitments and verification steps that Bitcoin Script can support. The original design describes Boolean circuits, bit commitments, large Taproot trees, and a challenge-response game. Instead of placing the complete execution trace in every block, participants prepare transaction paths that can isolate a disputed step.

In the cooperative case, participants can settle without revealing the full dispute machinery. In an adversarial case, a challenger attempts to prove that the claimed computation is inconsistent with the committed program or trace. Timelocks and deposits create deadlines and economic consequences.

This is an optimistic model: a claim is accepted unless it is successfully challenged under the protocol's rules. “Optimistic” does not mean that the claim is probably true. It identifies a system in which the expensive verification path is normally invoked only during a dispute.

### The original model is not the whole project

“BitVM” can refer to the 2023 research paradigm, later protocol designs, software libraries, bridge work, or public demonstrations. These should not be treated as one stable specification.

The original paper focuses on a two-party prover and verifier and openly identifies substantial off-chain computation and communication as limitations. Later BitVM2 work proposes different roles and more efficient dispute structures, including an operator model, challengers, proof-verification scripts, and transaction graphs intended to support a bridge.

A reader should therefore ask which BitVM version and repository a claim describes. A statement supported by the original two-party paper may not describe BitVM2. A later paper may specify a construction that the current implementation has not completed. A public signet demonstration may test code without proving production safety.

### BitVM Bridge is an application, not a Bitcoin feature

The official BitVM implementation repository is presently centered on “BitVM Bridge,” a proposed trust-minimized bridge design. A bridge attempts to coordinate BTC locked on Bitcoin with a representation or state transition elsewhere. That introduces problems beyond verifying one computation: deposits, withdrawals, operator liquidity, transaction setup, challenge periods, reimbursement, chain reorganizations, and liveness all matter.

Bitcoin consensus can validate the bridge's Bitcoin transactions. It does not validate the destination system's full state merely because a project calls itself a Bitcoin layer or rollup. The bridge protocol must define what statement is proven, who can act, what data challengers need, how operators are reimbursed, and what happens when a party is offline.

“Trust-minimized” is a comparative claim about assumptions, not the absence of trust. A BitVM bridge can still rely on honest setup behavior, at least one responsive operator or challenger under specified conditions, correct software, valid cryptography, available data, adequate fees, and users waiting through the required process.

### Pre-signed transaction graphs create setup obligations

Current BitVM bridge designs rely heavily on prearranged Bitcoin transactions and spending paths. Participants may need to exchange signatures before funds are placed into a structure. The exact transaction graph determines which party can act, in what order, after which timeout, and with which evidence.

This creates a setup boundary. If required signatures are missing, malformed, retained by the wrong party, or generated under inconsistent parameters, later security arguments may not apply. Key deletion or non-retention assumptions can also matter: a participant who preserves a key that the protocol assumes was destroyed may gain an unauthorized path.

Operational procedures are therefore part of the security model. Reproducible transaction construction, transcript verification, signer coordination, backup policy, and testing are not secondary implementation details.

### Challenging requires data, time, and incentives

A fraud-proof system is useful only if an eligible challenger can detect a false claim, obtain the necessary inputs, construct the challenge, pay fees, and act before deadlines expire. A paper can prove that a challenge path exists while a deployed application still fails to supply the data or incentives needed to use it.

Challenge windows trade speed for reaction time. Short windows can make honest response difficult during congestion or outages. Long windows delay withdrawals and keep capital locked. Fee spikes can make a theoretically valid path expensive. Transaction pinning, replacement behavior, package policy, or miner selection can affect whether a response confirms in time even when it is consensus-valid.

The protocol must also explain who receives penalties or reimbursements and whether that reward covers monitoring and transaction costs. “Anyone can challenge” is incomplete unless access, data, capital, and payout conditions are specified.

### Rollup language needs careful boundaries

BitVM is often discussed alongside optimistic rollups and zero-knowledge rollups because it moves computation off-chain and uses proofs or disputes. The analogy can be useful, but it does not establish that a particular BitVM project has the same data-availability, sequencing, finality, exit, or verification properties as a rollup on another system.

A project may use Bitcoin for deposits and dispute resolution while publishing transaction data elsewhere. It may rely on a separate sequencer, federation, operator set, or bridge representation. Users should evaluate those components directly rather than inferring them from the word “rollup.”

The exact security claim should name the asset, state transition, proof system, challenge mechanism, and exit path. It should also state what happens if the external system stops producing blocks or withholds data.

### Proof systems add their own assumptions

BitVM2 bridge work describes verifying succinct proofs through Bitcoin scripts. A succinct proof can reduce the amount of on-chain work, but it introduces a proof system, circuits, parameters, implementation code, and possibly a setup process that must be assessed.

A valid cryptographic proof establishes only the statement encoded by the circuit. It does not guarantee that the circuit represents the intended protocol, that public inputs came from the expected source, or that surrounding bridge accounting is correct. Bugs in witness generation, circuit constraints, serialization, or verifier construction can invalidate the intended security argument.

Later BitVM research explores different proof and commitment techniques. Those designs should be dated and named rather than presented as settled components of one deployed system.

### Public demonstrations and a scoped audit are not production deployment

As of July 24, 2026, the official project presents a developer preview with public signet or project-network transactions. Its implementation repository still warns, “DO NOT USE IN PRODUCTION!” The preview and transactions are evidence of active development and test execution, not evidence that BitVM is a production Bitcoin consensus feature or a production-ready bridge.

Zellic published an August 2025 security assessment classified as a Rust review of BitVM. The official BitVM repository now retains that report at `audits/BitVM - Zellic Audit Report.pdf`. The repository's remediation history also identifies audit-related corrections in scoped implementation areas including field and curve arithmetic, Groth16-related verification code, hashes, computational hints, Winternitz signatures, and stack or altstack handling.

That evidence must be limited to the Rust code and components reviewed at the assessed revision. It does not establish that every later commit, the complete BitVM Bridge transaction graph, bridge accounting, operator and challenger incentives, setup or key-deletion procedures, data availability, fee and liveness behavior, external-chain integration, or production operations were assessed.

A demonstration can answer limited questions: whether software builds, whether a transaction graph can execute on a test environment, whether proof verification completes, or whether participants can follow a scripted flow. It does not by itself establish resistance to malicious peers, safe key ceremonies, economic robustness, mainnet fee behavior, or operational recovery.

The Zellic report is a meaningful security-review artifact, not a bridge-wide economic, operational, or production-readiness certificate. The developer-preview classification and repository production warning remain controlling maturity signals. Reproducible releases, adversarial integration testing, bridge-wide security analysis, and explicit production parameters would still be needed before making a production-readiness claim.

### How to evaluate a BitVM claim

First identify the artifact: a paper, repository branch, release, demonstration, bridge instance, or independent implementation. Record its date and commit or version.

Second identify the Bitcoin mechanism. Determine which Taproot leaves, signatures, hashes, timelocks, and transaction sequences Bitcoin actually validates.

Third list the external assumptions: prover or operator behavior, challenger availability, data publication, proof system, setup ceremony, destination-chain rules, fee budgets, and monitoring.

Fourth examine failure and exit paths. Ask what an honest user can do if operators disappear, a challenge is censored, the external chain reorganizes, data is withheld, or fees rise.

Finally separate a possibility result from deployed engineering. BitVM research shows that existing Bitcoin primitives can support unusually expressive verification games. Whether a specific application is safe depends on a much larger system that Bitcoin consensus does not supply automatically.

## 3. Key Terms

- **BitVM:** A research and implementation family for verifying claims about off-chain computation through Bitcoin-enforced commitments and dispute transactions.
- **Prover:** A party that asserts a computation or state transition produced a claimed result.
- **Verifier or challenger:** A party that checks a claim and can invoke a dispute path when protocol conditions are met.
- **Fraud proof:** Evidence used by an optimistic protocol to demonstrate that a claimed computation or transition is invalid.
- **Optimistic protocol:** A design that normally accepts a claim unless it is challenged successfully within defined rules and time limits.
- **Transaction graph:** A prepared set of Bitcoin transactions and spending relationships that encodes possible protocol paths.
- **Pre-signed transaction:** A transaction signed before the protocol reaches the state in which it may need to be broadcast.
- **Challenge window:** The period during which an eligible party must detect and respond to a disputed claim.
- **Taproot tree:** A commitment to alternative script leaves, only one of which normally needs to be revealed when spent.
- **Bridge:** A system coordinating locked BTC with an asset representation or state transition on another system.
- **Data availability:** The ability of participants to obtain the information required to verify state and exercise a challenge or exit.
- **Trust-minimized:** A comparative description indicating reduced trust assumptions, not a claim that no trust or operational assumptions remain.
- **Developer preview:** Software or a demonstration intended for testing and evaluation rather than production use.
- **Consensus rule:** A rule Bitcoin-validating nodes enforce when accepting transactions and blocks.

## 4. Sources

1. **BitVM: Compute Anything on Bitcoin** | Robin Linus
   - URL: https://bitvm.org/bitvm.pdf
   - Supports: The original December 2023 two-party model, off-chain computation, challenge-response design, Taproot commitments, stated limitations, and no-consensus-change claim.
2. **BitVM2: Bridging Bitcoin to Second Layers** | Robin Linus and coauthors
   - URL: https://bitvm.org/bitvm_bridge.pdf
   - Supports: The BitVM2 optimistic-computation model, operator and challenger roles, proof-verification approach, bridge construction, and stated trust and liveness goals.
3. **BitVM Project Website** | BitVM contributors
   - URL: https://bitvm.org/
   - Supports: The project's current description, research links, implementation links, and bridge focus.
4. **BitVM Developer Preview** | BitVM contributors
   - URL: https://bitvm.org/demo/
   - Supports: The public developer-preview status and signet or project-network demonstrations reviewed on 2026-07-24.
5. **BitVM Repository** | BitVM contributors
   - URL: https://github.com/BitVM/BitVM
   - Supports: The current implementation scope, BitVM2 bridge components, proof-verification code, transaction graph, audit-remediation history, development state, and production warning.
6. **BitVM Repository Releases** | BitVM contributors
   - URL: https://github.com/BitVM/BitVM/releases
   - Supports: Current release evidence and versioning; absence or presence of tagged production releases must be checked before future maturity claims.
7. **BIP 340: Schnorr Signatures for secp256k1** | Pieter Wuille, Jonas Nick, and Tim Ruffing
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki
   - Supports: The Schnorr signature scheme used by Taproot-era Bitcoin constructions.
8. **BIP 341: Taproot** | Pieter Wuille, Jonas Nick, and Anthony Towns
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki
   - Supports: Taproot key-path and script-path commitments used to encode alternative spending conditions.
9. **BIP 342: Validation of Taproot Scripts** | Pieter Wuille, Jonas Nick, and Anthony Towns
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0342.mediawiki
   - Supports: Tapscript validation, signature rules, OP_SUCCESSx behavior, and resource limits.
10. **BIP 65: OP_CHECKLOCKTIMEVERIFY** | Peter Todd
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0065.mediawiki
   - Supports: Absolute timelock behavior available to Bitcoin scripts.
11. **BIP 112: CHECKSEQUENCEVERIFY** | BtcDrak, Mark Friedenbach, and Eric Lombrozo
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0112.mediawiki
   - Supports: Relative timelock behavior available to transaction protocols.
12. **Bitcoin Core v31.1 Script Interpreter** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/interpreter.cpp
   - Supports: One current implementation's execution of Bitcoin Script and Tapscript; this is implementation code enforcing active rules, not a BitVM specification.
13. **Bitcoin Core v31.1 Policy Source** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/src/policy
   - Supports: Current transaction standardness and relay-policy implementation that can affect unconfirmed protocol transactions separately from consensus.
14. **Bitcoin Core v31.1 Mempool Validation Source** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/validation.cpp
   - Supports: Current mempool and transaction-validation implementation relevant to relay and confirmation planning.
15. **BitVM3: Efficient Bitcoin Bridges via Garbled Circuits** | BitVM3 authors
   - URL: https://eprint.iacr.org/2026/933
   - Supports: A later 2026 research design illustrating that BitVM architecture continues to evolve; it is not evidence of mainnet deployment.
16. **Bitcoin Developer Guide: Transactions** | Bitcoin Core project documentation contributors
   - URL: https://developer.bitcoin.org/devguide/transactions.html
   - Supports: UTXO spending, transaction structure, signatures, and locktime background used to explain the Bitcoin layer.
17. **BitVM Audit Directory** | BitVM contributors
   - URL: https://github.com/BitVM/BitVM/tree/main/audits
   - Supports: The official repository's retention of `BitVM - Zellic Audit Report.pdf` and the audit artifact's relationship to the current implementation repository.
18. **BitVM - Zellic Audit Report** | Zellic
   - URL: https://github.com/Zellic/publications/blob/master/BitVM%20-%20Zellic%20Audit%20Report.pdf
   - Supports: The August 2025 Rust security assessment of scoped BitVM implementation code; it does not establish bridge-wide economic, operational, or production readiness.

## 5. SEO title

What Is BitVM? Bitcoin Computation Explained | Mempool Surf Club

## 6. Meta description

Learn how BitVM uses off-chain computation, Taproot commitments, fraud proofs, pre-signed transactions, and Bitcoin dispute paths.

## 7. Page excerpt

Understand BitVM's prover, challenger, transaction-graph, bridge, proof-system, data-availability, and maturity boundaries.

## 8. Estimated reading time

16 to 19 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-044 | How Bitcoin Indexers Work
- Next: MSC-GUIDE-046 | How Discreet Log Contracts Work
- Prerequisite: MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- Prerequisite: MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
- Prerequisite: MSC-GUIDE-014 | How Bitcoin Confirmations Work
- Branch: MSC-GUIDE-047 | What Is OP_CAT?
- Branch: MSC-GUIDE-048 | Emerging Protocols on Bitcoin: How to Evaluate Them
- Branch: MSC-GUIDE-055 | How Taproot Changed Bitcoin
- Return: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] Registry metadata matches the approved manifest entry.
- [x] Bitcoin consensus validation is separated from BitVM papers, software, bridge logic, and external-system state.
- [x] The original two-party BitVM model is separated from later BitVM2 and BitVM3 designs.
- [x] Off-chain computation is not described as execution performed by every Bitcoin node.
- [x] BitVM Bridge is identified as an application design rather than a native Bitcoin bridge or consensus feature.
- [x] Optimistic verification, challengers, transaction graphs, timelocks, data availability, fees, and setup assumptions are stated without guarantees.
- [x] The official production warning and developer-preview maturity are dated 2026-07-24.
- [x] The August 2025 Zellic Rust assessment is acknowledged and limited to its scoped implementation review; it is not treated as bridge-wide or production-readiness evidence.
- [x] Planned internal links remain inactive and do not imply publication.
- [x] Sources are primary project, BIP, Bitcoin Core, or project-documentation sources mapped to the claims they support.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-24
- Notes: Verified the current BitVM repository at commit `7d1ca3660cac08aab62e76f3aa4daec0d7403ecc`, its developer-preview context, production warning, official `audits` directory, August 2025 Zellic Rust assessment, audit-remediation history, BitVM2 role boundaries, and absence of evidence in the reviewed primary sources for bridge-wide production readiness. The audit remains scoped to reviewed implementation code and does not cover the complete bridge's economics, operations, liveness, setup, or external-system assumptions.

## 12. Illustration brief

### Illustration 1

- Concept title: BitVM Dispute Channel
- Educational purpose: Separate off-chain computation from the Bitcoin transactions used only when a claim is disputed.
- Recommended placement: After the section Computation is compiled into a dispute system.
- Visual description: Vintage nautical control-room diagram with a large off-chain calculation engine above water and a narrow Bitcoin dispute channel below, connected by commitments and challenge transactions.
- Required labels: Off-chain computation, Claim, Commitment, Challenger, Fraud proof, Bitcoin transaction, Timelock, Settlement
- Caption: BitVM moves the large computation off-chain and uses Bitcoin spending paths to enforce a defined dispute process.
- Alt text: Systems diagram showing off-chain computation feeding a claim and commitment into a Bitcoin challenge-and-settlement transaction path.
- Image orientation: Landscape
- Mobile crop notes: Stack computation, commitment, challenge, and settlement vertically.
- Status: PLANNED

### Illustration 2

- Concept title: Bridge Assumption Chart
- Educational purpose: Show that a BitVM bridge includes more than Bitcoin validation.
- Recommended placement: After the section BitVM Bridge is an application, not a Bitcoin feature.
- Visual description: Nautical chart with Bitcoin harbor, a bridge vessel, an external-system harbor, operators, challengers, proof data, and timed exit routes.
- Required labels: Bitcoin UTXO, Bridge protocol, External system, Operator, Challenger, Data availability, Challenge window, User exit
- Caption: Bitcoin validates the bridge transactions, while the bridge must separately supply operators, data, proofs, incentives, and exits.
- Alt text: Nautical systems chart showing Bitcoin and an external system connected by a bridge with operator, challenger, data, and exit dependencies.
- Image orientation: Landscape
- Mobile crop notes: Keep the two harbors at top and bottom with the bridge assumptions in between.
- Status: PLANNED

### Illustration 3

- Concept title: Maturity Signal Buoys
- Educational purpose: Distinguish papers, code, demonstrations, audits, and production deployment.
- Recommended placement: After the section Public demonstrations are not production deployment.
- Visual description: A measured sea lane with buoys labeled paper, prototype, public test, audit, adversarial test, release, and production, with the current BitVM developer-preview marker before production.
- Required labels: Research paper, Prototype, Developer preview, Signet test, Audit, Reproducible release, Production
- Caption: A public demonstration is a maturity signal, but it is not the same as audited production deployment.
- Alt text: Nautical maturity lane showing research and testing stages leading toward production, with BitVM marked at developer preview.
- Image orientation: Landscape
- Mobile crop notes: Use a vertical sequence of maturity markers.
- Status: PLANNED
