---
registry_id: MSC-GUIDE-080
status: COPY_LOCKED
page_role: topic-guide
h1: How Bitcoin Open-Source Projects Work
handle: bitcoin-open-source-projects
category: Bitcoin Ecosystem
subcategory: Community
depth: Shallow
format: Ecosystem Overview
primary_path: Explore the Ecosystem
secondary_paths:
  - Build on Bitcoin
author_display: Mempool Surf Club Editorial
reviewed_date: 2026-07-31
copy_locked_date: 2026-07-31
---

# How Bitcoin Open-Source Projects Work

## 1. Introductory deck

Bitcoin open-source projects include node software, wallets, Lightning implementations, libraries, hardware interfaces, developer tools, documentation, and infrastructure. Their source may be public, but each project has its own license, permissions, review process, release practices, funding, and maintenance risks.

Open source makes inspection, contribution, modification, and competition possible under the project’s license. It does not guarantee secure code, decentralized governance, active maintenance, reproducible binaries, compatibility, or adoption.

## 2. Full article

An open-source Bitcoin project is a software or documentation project whose license grants defined rights to inspect, use, modify, and redistribute its source. A public repository is often where that work happens, but repository visibility alone is not the definition. The license determines the legal permissions.

The Open Source Initiative’s definition requires more than readable code. Among other conditions, an open-source license must allow redistribution, provide source in a form suitable for modification, and permit derived works. Projects can choose different qualifying licenses, and those licenses can create different obligations for users and downstream distributors.

Bitcoin projects also differ in purpose. Bitcoin Core is a node implementation. LND is a Lightning implementation. Bitcoin Dev Kit provides wallet-development libraries. BTCPay Server is a payment application. A small library, a specification repository, and a full application can all be open source while having very different users, risks, and governance.

This guide was reviewed on July 31, 2026. Repository roles, maintainers, release branches, supported versions, funding relationships, dependencies, and security procedures can change and must be renewed before publication.

### A repository organizes work, not authority over Bitcoin

A repository stores source history, branches, issues, pull requests, releases, documentation, and project settings. Anyone may be able to read or fork a public repository, while only selected accounts have permission to merge, push, manage releases, change access, or administer security settings.

GitHub’s standard organization roles illustrate the difference. Read, triage, write, maintain, and admin permissions grant progressively broader capabilities within a repository. These are platform permissions, not ranks in Bitcoin consensus.

Repository access therefore needs precise language:

- **Public access** lets people inspect and usually copy the repository under its license.
- **Contribution access** may mean opening an issue, submitting a patch, reviewing, testing, or documenting.
- **Write or merge access** lets designated people integrate work into that project.
- **Administrative access** can change repository settings and permissions.
- **Protocol authority** is not created by any of those permissions.

A Bitcoin Core maintainer can help integrate an accepted patch into Bitcoin Core. That does not force node operators to install a release, make other implementations accept the change, or alter the rules already enforced by the network.

### Licenses define what others may do

A project’s license answers questions that the repository interface cannot. It may permit commercial use, modification, redistribution, and sublicensing, while requiring preservation of notices or imposing other conditions.

Bitcoin Core uses the MIT License. Other Bitcoin projects may use MIT, Apache, BSD, GPL, dual licensing, or a combination across components. “Source available” is not automatically the same as open source if the license withholds rights required by the Open Source Definition.

Before adopting a project, users and builders should identify:

- the license for each relevant component;
- whether bundled dependencies use compatible licenses;
- whether trademarks or data have separate terms;
- whether generated code or firmware blobs are included;
- what obligations apply when redistributing modified binaries.

A familiar license does not prove that the code is secure or well maintained. It establishes permissions and conditions.

### Contributors, reviewers, maintainers, and release engineers do different work

Open-source projects often use overlapping roles.

A **contributor** may submit code, tests, documentation, design, issue reports, or review. A **reviewer** examines a proposed change and its evidence. A **maintainer** may triage issues, guide scope, integrate accepted work, coordinate releases, or manage a subsystem. A **release engineer** prepares, signs, packages, and publishes a version. A project may also have security contacts, specification editors, translators, moderators, and infrastructure operators.

The same person can hold several roles, but the roles remain project-specific. A contributor count does not show how many people perform deep review. A list of repository members does not reveal who understands a critical subsystem. A maintainer title does not mean one person can safely change every component.

Healthy projects make expectations visible through contribution guides, developer notes, review norms, release procedures, security policies, and public history. Bitcoin Core’s repository explicitly describes testing and review as a development bottleneck and directs contributors to its contribution and developer documentation. LND’s repository encourages new contributors to begin with code review. Those practices are examples, not universal rules.

### Changes move through a project-specific process

A typical contribution begins with an issue, design discussion, or pull request. The author explains the problem, proposes a change, adds tests, and responds to review. Reviewers may test the branch, inspect edge cases, challenge assumptions, request smaller scope, or reject the approach.

Integration is a judgment inside that project. Maintainers decide whether the proposed change is sufficiently understood, useful, compatible, tested, and maintainable for that codebase. They may wait for specialist review or leave a patch unmerged indefinitely.

This process is not a vote where the largest number of comments wins. Nor is a merge proof of correctness. Review quality depends on relevant expertise, time, adversarial thinking, testing, and the clarity of the change.

For software that affects funds or consensus behavior, cautious projects may prefer small changes, long review, fuzzing, release candidates, compatibility testing, or delayed disclosure of vulnerabilities. Other projects may move faster because their consequences and user expectations differ.

### A release is a packaged project decision, not automatic adoption

Projects publish releases to identify versions that users can install or depend on. A release may contain new features, bug fixes, security corrections, dependency changes, documentation, and migration instructions.

Versioning conventions vary. Some projects use Semantic Versioning, where changes to a declared public API influence major, minor, and patch numbers. Others use calendar versions, project-specific numbering, rolling branches, or separate versions for multiple packages.

Bitcoin Core uses release branches and tags for official stable versions, while its development branch is not guaranteed to be stable. Its release process includes freezes, release candidates, builds, signatures, notes, and staged publication. That is one project’s process, not a governance template for every Bitcoin repository.

Publishing a release does not establish adoption. Operators may stay on older versions, wait for downstream packaging, test a release candidate, choose a competing implementation, or stop using the project. Adoption must be measured among the relevant users and versions.

### Public source is different from a reproducible build

Reading source code does not prove that a downloaded binary was built from that source.

A build is reproducible when independent parties using the specified source, environment, and instructions can create bit-for-bit identical designated artifacts. Reproducibility provides a path for comparing binaries with source. It does not prove that the source is correct, that the build environment is trustworthy at every layer, or that users actually performed the verification.

Bitcoin Core uses a Guix-based release process and a separate repository of build attestations. That provides evidence around release artifacts, but the relevant signatures, source revision, build instructions, and signer set still need to be checked for the specific release.

Projects without reproducible builds may still publish source, hashes, and signatures. Those controls answer different questions and should not be collapsed into one “verified” label.

### Funding supports work but does not equal technical control

Open-source work can be volunteer, employer-funded, grant-funded, sponsored, contracted, or supported through donations. Funding affects who has time to review, maintain, document, test, and respond to incidents.

OpenSats and Brink are examples of nonprofit funders supporting Bitcoin open-source contributors. Their published processes show that funding decisions belong to those organizations. The resulting code still enters project-specific review and release processes.

A funder can influence capacity and priorities by choosing what to support. That is not the same as holding repository permissions, merging a patch, producing a release, or changing Bitcoin consensus. Conversely, the absence of formal control does not make funding irrelevant. Concentrated funding, undisclosed conflicts, short grant horizons, or dependence on one employer can create operational and incentive risks.

Useful disclosure asks who funded the work, for what period and scope, whether milestones are required, and whether the recipient retains technical independence.

### Forks make alternatives possible, not easy

An open-source license can permit someone to copy a codebase and create a fork. A fork may be a temporary development branch, a maintained alternative, a compatibility layer, or an incompatible project with a new direction.

Legal and technical permission to fork does not create a sustainable project. A practical fork needs maintainers, reviewers, security response, release engineering, infrastructure, documentation, funding, users, and a plan for upstream changes. It may also inherit old defects and dependencies.

A competing implementation can improve resilience by providing different engineering choices and independent review. It can also introduce compatibility risk if behavior diverges unexpectedly. The effect depends on what the fork changes and who runs it.

Forkability limits some forms of lock-in, but it does not guarantee that a community can maintain a complex security-critical codebase after a split.

### Dependencies expand both capability and risk

Bitcoin projects rely on compilers, operating systems, cryptographic libraries, package registries, build tools, GitHub Actions, and other upstream packages. A small dependency can be used by many downstream wallets or services.

Supply-chain risk includes:

- malicious or compromised upstream releases;
- vulnerable transitive dependencies;
- abandoned packages;
- dependency name confusion;
- unsafe build or CI workflows;
- compromised maintainer credentials;
- incompatible license or API changes;
- binaries that do not correspond to reviewed source.

Dependency graphs, pinned versions, lockfiles, review of dependency changes, signatures, reproducible builds, minimal privilege, and timely updates can reduce risk. None removes the need to understand what is being trusted. GitHub’s dependency-review documentation, for example, describes tools that surface added, removed, updated, licensed, aged, and known-vulnerable dependencies in pull requests; the tool does not prove that every dependency is safe.

### Security reporting often begins privately

A public issue is usually the wrong first channel for a vulnerability that could expose funds or enable exploitation. Projects should publish a current security policy with supported versions and a private reporting method.

Bitcoin Core publishes a security email and encryption keys. LND also directs researchers to a private security address. GitHub repository advisories can support private discussion, remediation, and later public disclosure.

A complete process includes acknowledgement, reproduction, severity assessment, affected-version analysis, patch development, testing, release coordination, and accurate disclosure. Timing and detail may be restricted while users remain exposed.

A security policy does not guarantee fast response, and the absence of a published advisory does not prove the absence of vulnerabilities. Users should examine the project’s actual history and current contacts.

### Maintenance is observable but not reducible to one metric

A project is not healthy merely because its repository is public or its last commit is recent.

Maintenance signals include:

- supported versions and release cadence;
- response to security reports and serious bugs;
- meaningful review across critical areas;
- updated tests, dependencies, and documentation;
- clear ownership of releases and infrastructure;
- migration guidance for deprecated components;
- ability to onboard reviewers and replace departing maintainers;
- communication when support changes.

Raw contributor counts, stars, forks, commit frequency, and open-issue totals can be misleading. Automated commits can inflate activity. A stable library may need few changes. A busy repository may accumulate review debt. A project can publish releases while lacking people who understand a critical subsystem.

The Bitcoin Dev Kit project provides a useful distinction between abandonment and managed transition: its release history marks the older `bdk` library as deprecated, names its replacement, and provides migration guidance while limiting future bug-fix support. Deprecation communicates a plan. Abandonment often leaves users to infer that support has ended.

### Users and operators make the final project choice

Open-source project governance determines what enters a repository and release. It does not determine what every user must run.

A wallet team chooses libraries and versions. A node operator chooses an implementation and release. A business chooses deployment timing. A downstream project may patch, vendor, or replace a dependency. These choices are constrained by compatibility, expertise, security, regulation, hardware, and switching costs, but they remain distinct from maintainer judgment.

Evaluation should therefore ask separate questions:

1. **License:** What rights and obligations apply?
2. **Project control:** Who can merge, release, administer, and respond to security reports?
3. **Evidence:** How are changes reviewed, tested, built, signed, and documented?
4. **Maintenance:** Which versions are supported, and what happens when maintainers leave?
5. **Dependencies:** What upstream software and services are trusted?
6. **Adoption:** Who actually runs or depends on the release?
7. **Exit:** Can users migrate, fork, or choose an alternative in practice?

Open source creates the possibility of inspection, competition, and independent operation. Those possibilities become meaningful only when people have the skill, time, process, and incentives to use them.

## 3. Key takeaways

* Open source is defined by license permissions, not merely by a public repository.
* Repository access, merge permission, maintainer judgment, and Bitcoin consensus are separate.
* Projects use different contribution, review, release, funding, and governance models.
* A published release does not prove safety, compatibility, maintenance, or user adoption.
* Reproducible builds connect specified source to designated artifacts; they do not certify the source.
* Funding can influence capacity and priorities without creating automatic technical control.
* Forking is legally and technically possible under the license, but practical maintenance is costly.
* Dependencies and build systems create supply-chain risks beyond a project’s own source.
* Security reporting needs a current private channel and supported-version policy.
* Maintenance should be judged through multiple dated signals, not stars or contributor counts alone.

## 4. FAQ

### Does public source code make a Bitcoin project decentralized?

No. Public source can enable inspection and forking. Governance, repository permissions, infrastructure, funding, deployment, and user concentration may still be centralized in different ways.

### Can a maintainer change Bitcoin?

A maintainer can integrate changes into a particular project. Users and operators still decide whether to install that project’s release, and Bitcoin consensus changes require compatible enforcement across relevant participants.

### Is a fork automatically independent?

No. A fork may still depend on the original project’s code, maintainers, infrastructure, libraries, or release work. Sustainable independence requires people and resources.

### Are many contributors proof of strong review?

No. Contribution counts do not show review depth, subsystem expertise, or whether critical code has multiple active reviewers.

### Does a reproducible build prove software is safe?

No. It can show that designated artifacts match specified source and build inputs. The source itself may still contain defects, unsafe behavior, or malicious logic.

### How can I tell whether a project is abandoned?

Look for dated support statements, security contacts, recent meaningful review, releases, dependency updates, issue response, and maintainer communication. No single activity metric is conclusive.

## 5. Key Terms

* **Open-source license:** License granting rights to inspect, use, modify, and redistribute software under stated conditions.
* **Repository:** Version-controlled workspace containing source history and project collaboration records.
* **Contributor:** Person who supplies code, tests, documentation, design, reports, or review.
* **Reviewer:** Person who evaluates a proposed change and its evidence.
* **Maintainer:** Project-specific person responsible for coordination, integration, releases, or a subsystem.
* **Commit authority:** Technical permission to write or merge in a repository.
* **Release:** Identified project version packaged or tagged for users.
* **Versioning:** Scheme used to communicate relationships among releases.
* **Reproducible build:** Process allowing independent builders to produce bit-for-bit identical specified artifacts from defined inputs.
* **Fork:** Copy of a codebase developed separately from its source repository.
* **Dependency:** External component, tool, package, or service a project relies on.
* **Supply-chain risk:** Risk introduced through dependencies, build systems, distribution, credentials, or upstream infrastructure.
* **Security policy:** Published instructions describing supported versions and vulnerability-reporting procedures.
* **Deprecation:** Announced reduction or end of support, usually with replacement or migration guidance.
* **Abandonment:** Effective end of maintenance without a reliable continuing support process.

## 6. Sources

1. **The Open Source Definition** | Open Source Initiative
   * URL: [https://opensource.org/osd](https://opensource.org/osd)
   * Published or updated: Last modified February 16, 2024
   * Accessed: July 31, 2026
   * Supports: Open source requires defined redistribution, source-code, and derived-work rights rather than mere source visibility.
   * Limitation: Defines qualifying licensing conditions; it does not evaluate project security, governance, maintenance, or adoption.

2. **Bitcoin Core integration and staging tree** | Bitcoin Core contributors
   * URL: [https://github.com/bitcoin/bitcoin](https://github.com/bitcoin/bitcoin)
   * Published or updated: Current repository reviewed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: MIT license, project scope, development versus stable-release branches, testing, review, and public contribution structure.
   * Limitation: Repository documentation describes Bitcoin Core, not all Bitcoin projects or current user adoption.

3. **Contributing to Bitcoin Core** | Bitcoin Core contributors
   * URL: [https://github.com/bitcoin/bitcoin/blob/master/CONTRIBUTING.md](https://github.com/bitcoin/bitcoin/blob/master/CONTRIBUTING.md)
   * Published or updated: Current repository file reviewed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: Bitcoin Core pull-request, review, testing, communication, and contribution expectations.
   * Limitation: Project-specific guidance; it does not grant protocol authority or describe every maintainer permission.

4. **Bitcoin Core developer notes** | Bitcoin Core contributors
   * URL: [https://github.com/bitcoin/bitcoin/blob/master/doc/developer-notes.md](https://github.com/bitcoin/bitcoin/blob/master/doc/developer-notes.md)
   * Published or updated: Current repository file reviewed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: Engineering and review practices, dependency subtrees, testing considerations, and release-note requirements.
   * Limitation: Internal development guidance does not prove that every change is defect-free or reviewed equally.

5. **Bitcoin Core security policy** | Bitcoin Core contributors
   * URL: [https://github.com/bitcoin/bitcoin/blob/master/SECURITY.md](https://github.com/bitcoin/bitcoin/blob/master/SECURITY.md)
   * Published or updated: Current repository file reviewed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: Current supported-version reference, private reporting address, and encryption-key information.
   * Limitation: A reporting policy does not establish response time, vulnerability absence, or safety of unsupported versions.

6. **Bitcoin Core release process** | Bitcoin Core contributors
   * URL: [https://github.com/bitcoin/bitcoin/blob/master/doc/release-process.md](https://github.com/bitcoin/bitcoin/blob/master/doc/release-process.md)
   * Published or updated: Current repository file reviewed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: Bitcoin Core’s current project-specific branching, release-candidate, build, signing, and publication workflow.
   * Limitation: Operational instructions can change and do not define governance for other projects.

7. **Bitcoin Core release attestations** | Bitcoin Core contributors
   * URL: [https://github.com/bitcoin-core/guix.sigs](https://github.com/bitcoin-core/guix.sigs)
   * Published or updated: Current repository reviewed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: Separate repository of Guix build attestations used in the Bitcoin Core release process.
   * Limitation: Attestations must be checked for the specific release and signer; their existence does not certify source correctness.

8. **Definitions: reproducible builds** | Reproducible Builds project
   * URL: [https://reproducible-builds.org/docs/definition/](https://reproducible-builds.org/docs/definition/)
   * Published or updated: Current definition reviewed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: Bit-for-bit reproducibility from specified source, build environment, instructions, and designated artifacts.
   * Limitation: Reproducibility does not establish that source, dependencies, or behavior are secure.

9. **Repository roles for an organization** | GitHub Docs
   * URL: [https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization)
   * Published or updated: Current documentation reviewed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: Distinct read, triage, write, maintain, and admin permission levels within GitHub repositories.
   * Limitation: Platform permissions do not reveal informal influence, project expertise, or Bitcoin consensus behavior.

10. **Semantic Versioning 2.0.0** | Semantic Versioning
    * URL: [https://semver.org/](https://semver.org/)
    * Published or updated: Version 2.0.0
    * Accessed: July 31, 2026
    * Supports: One formal versioning scheme for communicating changes to a declared public API.
    * Limitation: Not every Bitcoin project uses Semantic Versioning, and version numbers do not prove compatibility or quality.

11. **LND repository** | Lightning Labs and LND contributors
    * URL: [https://github.com/lightningnetwork/lnd](https://github.com/lightningnetwork/lnd)
    * Published or updated: Current repository reviewed July 31, 2026
    * Accessed: July 31, 2026
    * Supports: A distinct Bitcoin-related project with its own license, contribution guidance, review-first onboarding, release history, and private security reporting.
    * Limitation: LND practices do not represent every Lightning or Bitcoin project and may change.

12. **Bitcoin Dev Kit releases** | Bitcoin Dev Kit contributors
    * URL: [https://github.com/bitcoindevkit/bdk/releases](https://github.com/bitcoindevkit/bdk/releases)
    * Published or updated: Current releases page reviewed July 31, 2026
    * Accessed: July 31, 2026
    * Supports: Project-specific package releases and explicit deprecation and migration guidance for the older `bdk` library.
    * Limitation: A releases page does not independently establish downstream migration, security, or long-term staffing.

13. **Dependency review** | GitHub Docs
    * URL: [https://docs.github.com/en/code-security/concepts/supply-chain-security/dependency-review](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependency-review)
    * Published or updated: Current documentation reviewed July 31, 2026
    * Accessed: July 31, 2026
    * Supports: Review of dependency additions, removals, updates, licenses, age, and known vulnerability information.
    * Limitation: Tooling detects documented conditions and cannot prove a dependency has no unknown defects or malicious behavior.

14. **Repository security advisories** | GitHub Docs
    * URL: [https://docs.github.com/en/code-security/concepts/vulnerability-reporting-and-management/repository-security-advisories](https://docs.github.com/en/code-security/concepts/vulnerability-reporting-and-management/repository-security-advisories)
    * Published or updated: Current documentation reviewed July 31, 2026
    * Accessed: July 31, 2026
    * Supports: Private vulnerability discussion, remediation, temporary private collaboration, and later public advisory publication.
    * Limitation: Availability of the feature does not prove a project enabled it or responds effectively.

15. **OpenSats General Fund** | OpenSats
    * URL: [https://opensats.org/funds/general](https://opensats.org/funds/general)
    * Published or updated: Current page reviewed July 31, 2026
    * Accessed: July 31, 2026
    * Supports: One nonprofit grant model for Bitcoin developers and open-source dependencies, including board selection and public categories of funded work.
    * Limitation: Describes OpenSats’ funding process, not technical control over recipient repositories or every recipient’s independence.

16. **OpenSats transparency records** | OpenSats
    * URL: [https://opensats.org/transparency](https://opensats.org/transparency)
    * Published or updated: Current page reviewed July 31, 2026
    * Accessed: July 31, 2026
    * Supports: Availability of financial statements, grant lists, policies, meeting minutes, and long-term-support records.
    * Limitation: Published transparency materials do not by themselves evaluate the technical quality of funded work.

17. **Developer grants** | Brink
    * URL: [https://brink.dev/donate](https://brink.dev/donate)
    * Published or updated: Current page reviewed July 31, 2026
    * Accessed: July 31, 2026
    * Supports: Brink’s stated nonprofit grant support for Bitcoin Core building, security, testing, review, mentorship, and educational work.
    * Limitation: Funding descriptions do not establish repository permissions, merge outcomes, or Bitcoin consensus control.

18. **Guide 066: What Bitcoin Developers Do** | Mempool Surf Club
    * Reference: docs/learn/content/guides/MSC-GUIDE-066-bitcoin-developers.md
    * Published or updated: Copy-locked July 26, 2026
    * Accessed: July 31, 2026
    * Supports: Approved MSC terminology for developer, contributor, reviewer, maintainer, committer, funding, release, and consensus boundaries.
    * Limitation: Internal editorial reference; material external claims were independently renewed from direct sources for this guide.

## 7. SEO title

How Bitcoin Open-Source Projects Work

## 8. Meta description

Learn how Bitcoin open-source projects use repositories, licenses, maintainers, review, releases, funding, forks, security reporting, and maintenance.

## 9. Excerpt

Bitcoin open-source projects make code inspectable and forkable, but each has its own governance, permissions, releases, funding, dependencies, and maintenance risks.

## 10. Reading time

Approximately 12 minutes for the Full Article.

## 11. Planned internal links

Do not activate planned links until each destination exists as a real published page.

* Previous guide: `MSC-GUIDE-079 | Major Milestones in Bitcoin History`
* Next guide: None. This is the final canonical topic guide.
* Return destination: `MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem`
* Primary learning path: `MSC-PATH-ECOSYSTEM | Explore the Ecosystem`
* Secondary learning path: `MSC-PATH-BUILD | Build on Bitcoin`
* Recommended learning path continuation: Complete Explore the Ecosystem and return to the Learn homepage.
* Prerequisite: `MSC-GUIDE-065 | Who Builds on Bitcoin?`
* Prerequisite and recommended branch guide: `MSC-GUIDE-066 | What Bitcoin Developers Do`
* Related guide: `MSC-GUIDE-024 | Bitcoin Node Software Explained`
* Related guide: `MSC-GUIDE-041 | Bitcoin Developer Tools: A Practical Overview`
* Related guide: `MSC-GUIDE-049 | What Is Bitcoin Core?`
* Related guide: `MSC-GUIDE-050 | What Is Bitcoin Knots?`
* Related guide: `MSC-GUIDE-052 | How Bitcoin Core Releases Work`
* Related guide: `MSC-GUIDE-053 | How Bitcoin Improvement Proposals Work`
* Related guide: `MSC-GUIDE-063 | How Bitcoin Software Is Tested`
* Related glossary terms: `Open-source project`; `Open-source license`; `Maintainer`; `Repository`; `Fork`; `Reproducible build`; `Dependency`; `Deprecation`

## 12. Accuracy review checklist

* [x] Registry metadata and YAML match the canonical Guide 080 record.
* [x] Approved H1 and handle remain unchanged.
* [x] Article stays within Guide 080 and Shallow depth.
* [x] Content format remains `Ecosystem Overview`.
* [x] Open source is defined by license rights rather than repository visibility alone.
* [x] Public source is separated from reproducible builds and binary verification.
* [x] Repository access is separated from write, merge, maintain, admin, and protocol authority.
* [x] Maintainer judgment and project governance are separated from Bitcoin consensus.
* [x] Contributor counts are not treated as proof of meaningful review.
* [x] Funding is separated from repository permissions and technical control.
* [x] Forkability is separated from practical maintainability and adoption.
* [x] Published releases are separated from user and operator adoption.
* [x] Governance differences among Bitcoin Core, LND, BDK, and other projects are preserved.
* [x] Dependencies, build systems, credentials, and distribution are included as supply-chain risks.
* [x] Security reporting includes private disclosure, supported versions, remediation, and publication boundaries.
* [x] Maintenance activity is evaluated through multiple dated signals.
* [x] Deprecation is separated from unannounced abandonment.
* [x] Open-source visibility is not presented as a guarantee of security, decentralization, correctness, maintenance, incentives, review, compatibility, or adoption.
* [x] No active internal link, public URL, publication state, or Tools destination is invented.
* [x] Exactly three illustration briefs are complete and remain `PLANNED`.
* [x] Human Verification is complete.
* [x] Full Article word count and reading-time estimate meet the registry range.
* [x] Mutable repository, funding, release, role, security, and maintenance claims were renewed during Accuracy Review.
* [x] Editorial Review is approved.
* [x] Accuracy Review is approved.
* [x] Copy Lock is approved.
* [ ] Publication-time source renewal is complete.

## 13. Human verification

* Reviewer: Mempool Surf Club Accuracy Review
* Review date: July 31, 2026
* Primary evidence reviewed: Current `main`; the complete canonical Guide 080 master-registry and content-manifest records; Guide 066 and the established copy-locked guide structure; the Open Source Definition; current Bitcoin Core repository, contribution guide, developer notes, security policy, release process, release records, and Guix attestation repository; the Reproducible Builds definition; current GitHub repository-role, dependency-review, and repository-advisory documentation; Semantic Versioning 2.0.0; current LND repository guidance; current Bitcoin Dev Kit release and deprecation records; and current OpenSats and Brink funding documentation.
* Verification method: Reopened every material source directly on July 31, 2026; mapped each claim to the relevant project, platform, license, release, security, funding, or maintenance boundary; compared multiple active Bitcoin projects rather than generalizing one governance model; and removed claims that required private permission data, unmeasured adoption, or unsupported security guarantees.
* Verification limits: This review did not audit source code, binaries, maintainer credentials, private security reports, grant agreements, employment contracts, repository access lists, dependency trees, or downstream deployments. It does not certify any project as secure, decentralized, maintained, compatible, or suitable for a specific use. Mutable roles, releases, supported versions, funding relationships, dependencies, and security procedures must be renewed at publication.

## 14. Illustration briefs

### Illustration 1 — The open-source project control map

* Placement: After “A repository organizes work, not authority over Bitcoin.”
* Visual description: A vintage nautical systems chart with a public repository at the center and separate rings for readers, contributors, reviewers, maintainers, release engineers, administrators, users, and node operators. Permission arrows stop at the project boundary; Bitcoin consensus appears as a separate offshore network.
* Required labels: Public read; fork; issue; pull request; review; merge; release; admin; user choice; node enforcement; repository authority; no protocol authority.
* Caption: Repository permissions control a project’s workflow, not what every Bitcoin participant must run.
* Alt text: Systems chart separating repository readers, contributors, reviewers, maintainers, release engineers, administrators, users, and Bitcoin node enforcement.
* Image orientation: Landscape
* Mobile crop notes: Preserve the project boundary and separate node-enforcement panel; stack role rings vertically on mobile.
* Status: PLANNED

### Illustration 2 — Source-to-release verification chain

* Placement: After “Public source is different from a reproducible build.”
* Visual description: A vintage shipyard inspection diagram tracing licensed source, reviewed commit, pinned dependencies, specified build environment, independent builders, matching hashes, signatures, published release, and user installation. Warning markers identify questions reproducibility does not answer.
* Required labels: License; source revision; review; dependencies; build instructions; independent builders; bit-for-bit artifacts; hashes; signatures; release; adoption; source safety not proven.
* Caption: Reproducible builds can connect source to artifacts without certifying that the source itself is safe.
* Alt text: Verification chain from licensed source and dependencies through independent reproducible builds, hashes, signatures, release, and user adoption.
* Image orientation: Landscape
* Mobile crop notes: Keep the left-to-right evidence chain intact; move limitation warnings below each stage.
* Status: PLANNED

### Illustration 3 — Project sustainability and exit routes

* Placement: After “Maintenance is observable but not reducible to one metric.”
* Visual description: A vintage harbor-maintenance chart showing a project supported by maintainers, reviewers, funding, dependencies, security response, releases, documentation, and users. Exit channels lead to migration, replacement, maintained fork, or unsupported abandonment.
* Required labels: Maintainers; reviewers; funding; dependencies; security response; supported versions; releases; documentation; users; deprecation; migration; maintained fork; abandonment.
* Caption: A public repository remains useful only when people sustain its review, security, releases, dependencies, and migration paths.
* Alt text: Harbor chart showing open-source project maintenance inputs and exit paths through migration, replacement, fork, deprecation, or abandonment.
* Image orientation: Landscape
* Mobile crop notes: Preserve all maintenance inputs and four exit paths; use a vertical harbor layout on mobile.
* Status: PLANNED

### Shared visual requirements

* Vintage technical illustration with nautical-chart and field-guide influence
* Muted, cohesive Mempool Surf Club palette
* Consistent approved border system
* Calm educational tone without promotional branding
* Legible labels at desktop and mobile sizes
* No invented logos, rankings, security seals, contributor counts, or endorsement badges
