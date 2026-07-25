---
registry_id: MSC-GUIDE-053
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: How Bitcoin Improvement Proposals Work
handle: bitcoin-improvement-proposals
category: Bitcoin Development
subcategory: Protocols
depth: Deep
format: Process Explainer
primary_path: Build on Bitcoin
secondary_paths:
  - Understand the Network
author_display: Mempool Surf Club Editorial
reviewed_date: null
copy_locked_date: null
---

# How Bitcoin Improvement Proposals Work

## 1. Introductory deck

A Bitcoin Improvement Proposal is a published technical or process document, not a vote, command, product roadmap, or certificate of approval. The BIP repository gives mature proposals stable numbers, versioned text, and a public change history. Whether a proposal is implemented, released, activated, or adopted must be established with separate evidence.

## 2. Full article

Bitcoin Improvement Proposals, usually called BIPs, give the Bitcoin community a shared format for describing technical specifications, operational guidance, and development processes. They help people discuss the same document, compare implementations, preserve design rationale, and refer to a proposal by a stable number.

A BIP does not define Bitcoin by itself. It does not bind node operators, miners, wallet developers, exchanges, application builders, or users. Publication in the `bitcoin/bips` repository means the document met the repository’s topic, maturity, formatting, and editorial requirements. It does not mean the proposal won a vote, received protocol approval, entered Bitcoin Core, shipped in a release, activated on the network, or achieved broad adoption.

This guide was reviewed July 25, 2026 against the live `bitcoin/bips` repository, BIP 3 version 1.4.0 and its December 9, 2025 changelog entry, and Bitcoin Core 31.1 implementation documentation at commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`. Repository rules and individual BIP headers can change, so readers should verify the live document and its history.

### The current process document

The live BIP repository identifies BIP 3, “Updated BIP Process,” as the deployed process document. BIP 3 replaced BIP 2 and reduced the current workflow to four statuses: Draft, Complete, Deployed, and Closed. It also uses three types: Specification, Informational, and Process.

Older BIPs and articles may use the historical term “Standards Track” or statuses defined by BIP 1 or BIP 2. Those records remain useful history, but they should not be copied into a description of the current process without noting the change. When a header and an old essay disagree, check the live BIP, its changelog, and the process version in force.

BIP 3 is itself a Process BIP and may continue to receive amendments through the process it describes. That makes a review date important: “the BIP process” is not a timeless sentence detached from repository history.

### What belongs in a BIP

A potential BIP should concern Bitcoin broadly enough to benefit from a common specification or durable public record. Examples include consensus proposals, peer-to-peer protocol behavior, application or wallet interoperability, APIs, implementation guidance, and development processes.

A minor change limited to one project normally belongs in that project’s issue tracker or pull request. A BIP is most useful when multiple independent projects, reviewers, or users need a shared document.

The process begins before a pull request. Authors are expected to research prior work, test whether the idea has broader interest, and present it for public technical discussion. Complicated systems may be split into several BIPs so that each document has a focused responsibility.

### Authors, deputies, editors, and reviewers

Authors own the initial recommendation. They write the document, gather feedback, address objections, clarify tradeoffs, and may promote implementation or adoption. BIP 3 also allows authors to name deputies who can help maintain and advance the proposal.

Reviewers test the proposal’s clarity, internal consistency, technical soundness, interoperability, security assumptions, and compatibility. Review can reveal serious flaws, but review volume is not a formal approval count.

BIP Editors perform administrative and editorial work. They check scope, format, maturity, and readiness for publication; assign numbers; maintain the index; and merge qualifying documents. BIP 3 explicitly limits that role: editors do not decide whether a proposal is likely to be adopted. Number assignment and repository merge are publication actions, not protocol governance.

No editor, maintainer, company, software project, mining pool, or mailing-list participant has unilateral authority to make the Bitcoin ecosystem adopt a BIP.

### Numbering and repository publication

Before number assignment, a draft generally uses a working title and `BIP: ?`. Only BIP Editors assign numbers. Under BIP 3, a proposal should have materially progressed beyond early ideation before it receives one. Evidence can include substantial public discussion, independent projects exploring adoption, or extended technical work responding to feedback.

A number is an identifier, not a ranking. Low and high numbers do not measure importance, quality, support, or deployment. Gaps and historical documents are normal.

Once merged, the repository provides a canonical publication location and change history. Authors can continue proposing updates through pull requests. After a proposal reaches Complete, noteworthy changes should be tracked through a version header and changelog. A document can therefore be “BIP 341” while still having a revision history that readers must inspect.

### The three current BIP types

A **Specification BIP** defines implementable technical rules. Independent software can be evaluated for compliance with the specification. A Specification BIP should be precise enough to support interoperable implementations and, before reaching Complete, must include or reference a working reference implementation and comprehensive test vectors.

An **Informational BIP** documents a design issue, guideline, or other information. It can be influential without defining interoperable behavior. Complete is often the final successful status for an Informational BIP because there may be nothing to “deploy” as software.

A **Process BIP** describes or changes a process surrounding Bitcoin development. It is not a consensus rule. Its effect depends on the relevant community adopting the process. BIP 3 describes rough-consensus conditions for moving Process BIPs to Deployed and allows deployed process documents to evolve through later amendments.

Historical “Standards Track” language generally maps to the older process vocabulary. Under the live BIP 3 process, Specification is the current type name.

### The four current statuses

**Draft** means the proposal has been published but planned work remains. Draft does not mean implemented, safe, rejected, or close to activation.

**Complete** means the authors consider the proposal clear, comprehensive, and ready for adoption, implementation, or deployment. For Specification BIPs, the process requires a working reference implementation and comprehensive test vectors. Complete is an author and document-maturity claim, not proof of ecosystem support.

**Deployed** should be used only after a Complete BIP is settled and evidence shows active use. BIP 3 gives examples of convincing evidence: an established project deploying support in mainnet software releases, a soft-fork proposal meeting its network activation criteria, or demonstrated rough consensus. The applicable evidence depends on the proposal, and Deployed still does not mean every wallet, node, service, or user supports the feature.

**Closed** marks a document that is primarily historical or no longer actively advanced or used. Closed BIPs remain in the archive. A closed proposal can still explain past decisions or influence later work.

Status should be read together with the type, layer, version, changelog, and dated implementation evidence.

### Layers are not approval levels

BIP headers may classify a proposal by layer using BIP 123 vocabulary: Consensus (soft fork), Consensus (hard fork), Peer Services, API/RPC, or Applications. The layer identifies the affected system boundary.

A consensus-layer BIP can propose new block or transaction validity rules, but the document alone does not activate them. A Peer Services BIP can standardize network messages without changing block validity. An Applications BIP can define wallet, address, signing, or interchange behavior that software may adopt independently. API/RPC proposals concern interfaces rather than network consensus.

A proposal can also combine several documents. Taproot, for example, separates the Schnorr signature scheme, version 1 output rules, and tapscript behavior across BIPs 340, 341, and 342. The package still required implementation, release, deployment, activation, and application support beyond repository publication.

### A BIP is one rung in an evidence chain

When someone says “BIP X is supported,” ask which event they mean:

1. **Idea discussed:** a concept exists in public discussion.
2. **BIP drafted:** structured text exists.
3. **Number assigned and document merged:** the repository published it.
4. **Status changed:** a transition was recorded under the BIP workflow, with type- and status-specific evidence requirements.
5. **Implementation written:** code exists somewhere.
6. **Code merged:** a project accepted code into a branch.
7. **Software released:** users can obtain a version containing the code.
8. **Feature enabled:** the software or operator configuration enables behavior.
9. **Consensus deployed or activated:** network validity rules changed under the specified mechanism.
10. **Adoption observed:** wallets, services, miners, nodes, or users actually use it.

These events can occur years apart, in a different order, or not at all. A merged implementation may remain unreleased. A released implementation may keep code disabled. A deployed consensus rule can have uneven wallet support. A widely used application standard can be adopted without changing consensus.

### Bitcoin Core’s role and limits

Bitcoin Core publishes a release-specific `doc/bips.md` file listing BIPs its software implements and the version or pull request associated with support. That file is useful implementation evidence, but it applies to Bitcoin Core—not every implementation—and must be read at an exact tag or commit.

A Bitcoin Core pull request does not amend a BIP automatically. A BIP merge does not merge code into Bitcoin Core. A Bitcoin Core release does not force upgrades. Alternative implementations can implement the same active consensus rules through different code, and applications can adopt wallet or protocol BIPs on independent schedules.

Miners choose block-building systems and transaction-selection policy. Node operators choose validation software and configuration. Wallets choose address, signing, fee, and user-interface support. Services choose integration timelines. Users decide what software and transaction types they accept. These roles interact, but none is a central approval body.

### How to evaluate a BIP today

Start with the live BIP header. Record the type, status, layer, assigned date, version, dependencies, replacements, and discussion links. Then read the specification, rationale, compatibility section, security analysis, test vectors, and changelog.

Next, look outside the BIP repository:

- Find independent implementations and identify exact versions.
- Distinguish code in a development branch from released code.
- Check whether support is default, optional, experimental, or disabled.
- For consensus proposals, verify the deployment mechanism and actual activation state.
- For peer protocols, verify negotiation and interoperability evidence.
- For wallet or application standards, verify sender and receiver compatibility.
- Read tests, audits, issue history, and unresolved review objections.
- Date every maturity or adoption claim.

The most reliable conclusion is often narrow: “BIP 341 is marked Deployed; Bitcoin Core documents validation support and mainnet activation; a particular wallet’s support must be checked separately.” That is more accurate than saying “Bitcoin approved Taproot.”

## 3. Key Terms

- **BIP:** A Bitcoin Improvement Proposal published in a shared technical-document repository.
- **BIP Editor:** A contributor performing administrative and editorial duties for the BIP repository.
- **Author:** A person responsible for writing and advancing a BIP.
- **Deputy:** A stand-in owner authorized by BIP authors to help maintain or advance the document.
- **Specification BIP:** An implementable technical specification under the current BIP 3 process.
- **Informational BIP:** A document providing guidance, analysis, or other information.
- **Process BIP:** A document defining or changing a development process.
- **Draft:** A published proposal with planned work remaining.
- **Complete:** A proposal its authors consider finished and ready for adoption or implementation.
- **Deployed:** A proposal with evidence of settled active use, activation, or applicable rough consensus.
- **Closed:** A proposal retained mainly for historical reference.
- **Layer:** The system boundary a BIP affects, using classifications such as Consensus (soft fork), Consensus (hard fork), Peer Services, API/RPC, or Applications.
- **Reference implementation:** Code demonstrating one implementation of a specification.
- **Test vector:** A defined input and expected output used to test conformance.
- **Activation:** The point at which new consensus rules begin being enforced under a deployment mechanism.
- **Adoption:** Actual use by implementations, operators, services, or users.

## 4. Sources

1. **Bitcoin Improvement Proposals Repository** | Bitcoin BIP contributors
   - URL: https://github.com/bitcoin/bips
   - Supports: Live BIP index, current types and statuses, repository publication, editors, and proposal inventory reviewed July 25, 2026.
2. **BIP 3 — Updated BIP Process, version 1.4.0** | Murch
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0003.md
   - Supports: Current process, BIP purpose, ownership, editors, numbering, types, statuses, changelog through version 1.4.0, adoption, and replacement of BIP 2.
3. **BIP 123 — BIP Classification** | Eric Lombrozo
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0123.mediawiki
   - Supports: Consensus (soft fork), Consensus (hard fork), Peer Services, API/RPC, and Applications layer classifications.
4. **BIP 1 — BIP Purpose and Guidelines** | Amir Taaki
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0001.mediawiki
   - Supports: Historical process vocabulary and the original Standards Track framework.
5. **BIP 2 — BIP Process, Revised** | Luke Dashjr
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0002.mediawiki
   - Supports: Superseded historical process and status vocabulary.
6. **Bitcoin Core 31.1 BIP Support Document** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/bips.md
   - Supports: Release-specific examples of implemented and activated BIP behavior.
7. **Bitcoin Core 31.1 Tag Commit** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/commit/9be056a8a72b624dae9623b2f7bded92c2a21c91
   - Supports: Exact source version used for current implementation examples.
8. **BIP 340 — Schnorr Signatures for secp256k1** | Pieter Wuille, Jonas Nick, Tim Ruffing
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki
   - Supports: Example of a deployed Specification BIP defining cryptographic behavior.
9. **BIP 341 — Taproot: SegWit Version 1 Spending Rules** | Pieter Wuille, Jonas Nick, Anthony Towns
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki
   - Supports: Example of a deployed consensus-layer Specification BIP.
10. **BIP 342 — Validation of Taproot Scripts** | Pieter Wuille, Jonas Nick, Anthony Towns
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0342.mediawiki
    - Supports: Example of a companion specification with separate script semantics.
11. **BIP 141 — Segregated Witness (Consensus Layer)** | Eric Lombrozo, Johnson Lau, Pieter Wuille
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki
    - Supports: Historical example separating specification, deployment, and activation evidence.
12. **BIP 324 — Version 2 P2P Encrypted Transport Protocol** | Dhruv Mehta, Tim Ruffing, Jonas Schnelli, Pieter Wuille
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0324.mediawiki
    - Supports: Peer Services specification example and implementation-versus-default boundaries.
13. **BIP 39 — Mnemonic Code for Generating Deterministic Keys** | Marek Palatinus, Pavol Rusnak, Aaron Voisine, Sean Bowe
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki
    - Supports: Application-layer standard example whose use does not change Bitcoin consensus.
14. **BIP 350 — Bech32m Format for Version 1+ Witness Addresses** | Pieter Wuille
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0350.mediawiki
    - Supports: Application interoperability and versioned address-format example.
15. **Bitcoin Development Mailing List** | Bitcoin development community
    - URL: https://groups.google.com/g/bitcoindev
    - Supports: Current discussion venue referenced by BIP 3 for ideation and process consensus.
16. **Bitcoin Development Mailing List Archive** | Bitcoin development community
    - URL: https://gnusha.org/pi/bitcoindev/
    - Supports: Historical and current proposal-discussion evidence referenced by BIP 3.

## 5. SEO title

How Bitcoin Improvement Proposals Work | Mempool Surf Club

## 6. Meta description

Learn how Bitcoin Improvement Proposals are written, numbered, reviewed, classified, published, implemented, activated, and adopted.

## 7. Page excerpt

Understand what a BIP does, what its status means, and why publication, implementation, release, activation, and adoption are separate events.

## 8. Estimated reading time

16 to 19 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-052 | How Bitcoin Core Releases Work
- Next: MSC-GUIDE-054 | How Bitcoin Script Works
- Prerequisite: MSC-GUIDE-049 | What Is Bitcoin Core?
- Prerequisite: MSC-GUIDE-051 | How to Read the Bitcoin Source Code
- Branch: MSC-GUIDE-047 | What Is OP_CAT?
- Branch: MSC-GUIDE-048 | Emerging Protocols on Bitcoin: How to Evaluate Them
- Branch: MSC-GUIDE-055 | How Taproot Changed Bitcoin
- Branch: MSC-GUIDE-056 | How SegWit Changed Bitcoin
- Return: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] BIP 3 is identified as the live deployed process document at version 1.4.0 and BIP 2 as replaced.
- [x] Current Specification, Informational, and Process types are separated from historical Standards Track terminology.
- [x] Draft, Complete, Deployed, and Closed statuses are explained without treating status as universal approval.
- [x] Authorship, deputies, editors, reviewers, numbering, publication, and repository history are covered.
- [x] Repository acceptance is separated from code implementation, merge, release, activation, and adoption.
- [x] Exact BIP 123 layer vocabulary is used without treating layers as approval levels.
- [x] Bitcoin Core, alternative implementations, miners, node operators, wallets, services, and users are not assigned unilateral authority.
- [x] Examples are dated to evidence reviewed July 25, 2026 and do not imply endorsement.
- [x] Planned internal links remain inactive and do not imply publication.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-25
- Evidence reviewed: Live `bitcoin/bips` repository; BIP 3 version 1.4.0, repository blob `1261500b92fa918e9a948d5884fdb186437768d5`, including its changelog through December 9, 2025; BIPs 1, 2, 123, 141, 324, 340, 341, 342, and 350; Bitcoin Core `v31.1` at commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`; and that release’s `doc/bips.md`.
- Material corrections: Restored BIP 3’s exact working-reference-implementation and comprehensive-test-vector requirement for Complete Specification BIPs; tightened Deployed evidence wording; replaced generic Consensus layer wording with the exact soft-fork and hard-fork classifications; and removed the implication that only authors or maintainers record every status transition.
- Remaining uncertainty: BIP 3 is a deployed Process BIP that may continue to change. Editor membership, repository conventions, individual BIP headers, status evidence, and implementation or adoption evidence remain date- and version-sensitive.

## 12. Illustration brief

### Illustration 1

- Concept title: The BIP Publication Channel
- Educational purpose: Show how an idea becomes a numbered public document without implying protocol approval.
- Recommended placement: After Numbering and repository publication.
- Visual description: Vintage nautical chart moving from open discussion to draft, editor review, number assignment, and archive harbor, with a separate route continuing toward implementation and adoption.
- Required labels: Idea, Public discussion, Draft, Editor review, BIP number, Repository, Implementation route
- Caption: Repository publication creates a stable technical reference; it does not complete implementation or adoption.
- Alt text: Nautical process chart showing a Bitcoin proposal becoming a numbered BIP before separate implementation work.
- Image orientation: Landscape
- Mobile crop notes: Keep the publication route on top and the separate adoption route below.
- Status: PLANNED

### Illustration 2

- Concept title: BIP Type and Layer Compass
- Educational purpose: Separate document type from the Bitcoin system layer affected.
- Recommended placement: After Layers are not approval levels.
- Visual description: Technical compass rose with three type rings—Specification, Informational, Process—and five layer bearings—Consensus (soft fork), Consensus (hard fork), Peer Services, API/RPC, Applications.
- Required labels: Specification, Informational, Process, Consensus (soft fork), Consensus (hard fork), Peer Services, API/RPC, Applications
- Caption: A BIP’s type describes the document; its layer describes the system boundary.
- Alt text: Compass diagram separating BIP document types from Bitcoin protocol and application layers.
- Image orientation: Square
- Mobile crop notes: Use concentric rings with large, legible labels.
- Status: PLANNED

### Illustration 3

- Concept title: Proposal Evidence Ladder
- Educational purpose: Distinguish document publication from implementation, release, activation, and adoption.
- Recommended placement: After A BIP is one rung in an evidence chain.
- Visual description: Nautical signal tower with ascending platforms for discussion, BIP merge, code, release, activation, and observed use; each platform has a separate evidence flag.
- Required labels: Discussion, BIP merged, Code implemented, Software released, Activated, Adoption observed
- Caption: Each stage requires its own evidence; one stage does not prove the next.
- Alt text: Evidence ladder separating a BIP document from code, release, consensus activation, and real-world adoption.
- Image orientation: Portrait
- Mobile crop notes: Keep one centered vertical sequence with six platforms.
- Status: PLANNED
