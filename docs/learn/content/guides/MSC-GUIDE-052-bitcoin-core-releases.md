---
registry_id: MSC-GUIDE-052
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: How Bitcoin Core Releases Work
handle: bitcoin-core-releases
category: Bitcoin Development
subcategory: Bitcoin Core
depth: Deep
format: Release Process Explainer
primary_path: Build on Bitcoin
secondary_paths:
  - Understand the Network
author_display: Mempool Surf Club Editorial
reviewed_date: null
copy_locked_date: null
---

# How Bitcoin Core Releases Work

## 1. Introductory deck

A Bitcoin Core release is the result of branch management, review, testing, release candidates, tagged source, reproducible-build work, checksums, and multiple attestations. Each artifact supplies limited evidence. A software release does not by itself activate consensus rules, prove source correctness, or require every user to upgrade.

## 2. Full article

Bitcoin Core releases turn a changing source repository into identifiable source and binary artifacts. The process reduces ambiguity: users can name a version, reviewers can inspect a fixed tree, builders can reproduce outputs, and maintainers can issue targeted updates for supported release lines.

It does not eliminate trust or risk. A signed Git tag attests that a particular key signed a tag object pointing to a source commit. A checksum commits to file bytes through a digest. A signature over a checksum file attests that a key signed that checksum statement. Reproducible builds can show that multiple builders obtained matching output from specified source and build inputs. None of those alone proves the source is correct, the build environment is harmless, a signer is trustworthy, or a user’s machine is secure.

This guide was reviewed July 24, 2026 against the live lifecycle and download documentation, the `v31.1` release process, and Bitcoin Core 31.1 commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`.

### Development on the integration branch

Bitcoin Core development takes place through proposed patches, review, testing, and merges on the main integration branch. The README warns that this branch is not guaranteed to be completely stable.

A merged change is therefore not automatically a release. It may be revised before branch-off, excluded from a backport, disabled by configuration, or remain dormant pending a separate activation condition.

Release work creates a fixed boundary around selected commits. Reviewers should compare the release branch and tag rather than treating the current default branch as the software users downloaded.

### Proposed schedules and freezes

Major-release planning is commonly tracked in a public issue with target dates for branch-off and release candidates. Schedules can include a feature freeze, translation milestones, or other coordination points.

These are proposed project-management dates. They can move as bugs, review capacity, translations, build issues, or test results change. A schedule issue is not a protocol commitment.

Feature freeze limits the kinds of new changes accepted while stabilization is underway. Translation freeze gives translators a stable text set. Neither means testing stops; release-candidate work is specifically for finding and correcting release blockers.

### Release branches

Before a major release, the project creates a release branch. The integration branch can continue toward future development while the release branch receives selected stabilization, documentation, translation, and fix commits.

A maintenance release is normally made from the relevant supported release line. Backports should be narrower than importing the entire current development branch. The older the supported line, the higher the threshold for accepting changes because every backport introduces review and regression risk.

The lifecycle page reviewed July 24, 2026 says the latest three major versions are maintained. It lists 31.x, 30.x, and 29.x in the maintenance window and 28.x as end of life after the 31.0 release.

### Release candidates

A release candidate, marked `rc1`, `rc2`, and so on, is a build proposed for wider testing before final release. A later candidate can include fixes discovered while testing an earlier candidate.

Release candidates should not be described as final merely because binaries exist. Their purpose is to test the near-final source, packaging, migration, wallet behavior, platform support, interfaces, and operational edge cases.

Testing includes automated suites, continuous integration, manual quality assurance, platform-specific checks, upgrade scenarios, and review of release notes. The amount and type of evidence varies by change.

### Tagging and release notes

The release process uses tooling to perform consistency checks and create a signed Git tag for a release candidate or final release. The tag fixes the source tree at a named version.

A signed tag provides evidence that the holder of a particular key signed that Git object. A verifier still needs an independently obtained expectation for the key and must inspect what the tag points to. The signature does not prove that every line was reviewed or that the source has no vulnerability.

Release notes describe user-visible changes, compatibility, upgrade steps, known issues, and credits. They are an important map, not a substitute for source and tests. A missing note can hide a meaningful change; an imprecise note can overstate compatibility. Critical operators may need to inspect the diff and linked pull requests.

### Major and maintenance releases

Bitcoin Core uses major versions such as 31.0 and maintenance versions such as 31.1. The lifecycle page says the project aims for a major release about every six to seven months and provides maintenance releases for bug and security fixes.

The word “major” is a project version category, not a claim that consensus changed. A major release can contain no consensus activation. The lifecycle document also explains that consensus-rule proposals are handled differently from ordinary semantic versioning and may be shipped in maintenance releases to produce smaller reviewable changesets.

Installing software that contains code for a consensus proposal does not necessarily activate it. Activation can depend on deployment parameters, network signaling, heights, times, or other separately specified conditions. A release note and deployment state must both be checked.

### Supported branches and end of life

The maintenance window tells users which release lines generally receive fixes. End of life means a branch does not generally receive security fixes; it does not make the software stop running at a particular block.

Operators should compare their exact version with advisories and supported branches. “I run version 30” is incomplete because a later 30.x maintenance release may contain fixes absent from 30.0.

Upgrade urgency is risk-specific. A remotely exploitable validation defect differs from a wallet migration issue or an interface bug that affects only a disabled option. The advisory, release notes, configuration, and operating environment should determine the response.

### Guix and reproducible builds

Bitcoin Core’s release process uses Guix-based tooling for reproducible builds. Builders check out the tagged source, use specified inputs, build outputs, and publish signed attestations of the checksums they obtained.

A reproducible build means independent builders using the specified process can produce byte-identical outputs for the covered artifact. Matching output reduces the risk that a distributor quietly substituted different code after source review.

It does not prove the source is secure or correct. Multiple builders can reproducibly build the same bug. They can also share a compromised dependency definition or overlooked toolchain weakness. Reproducibility supplies provenance evidence, not a formal proof of safety.

### Checksums and multiple signatures

The official download page provides a `SHA256SUMS` file and a `SHA256SUMS.asc` collection of signatures.

A locally calculated checksum matching `SHA256SUMS` shows that the downloaded bytes match a listed digest. It does not identify who created the digest.

A valid signature on the checksum file shows that a particular key attested to those digests. Trust then depends on whether the verifier expected and trusts that key. Multiple independent signatures let a user compare attestations instead of relying on one key.

The release process describes combining attestations after multiple builders obtain matching results. This distributes evidence, but users still need to verify fingerprints through channels they consider independent.

### Code signing is different

Windows and macOS platforms can use operating-system code signatures. Bitcoin Core’s release process handles detached platform signatures and combines them with reproducibly built unsigned artifacts.

Platform code signing can help an operating system identify the publisher key and detect changes to a signed package. It is not the same as a Git tag signature, a PGP signature over checksums, or a Guix build attestation.

A code-signed binary can still contain a bug. A valid signature can be created by a compromised key. A platform trust store can make a decision the user has not independently reviewed. Each signature should be described by what object was signed and which trust path is used.

### Official distribution locations

The Bitcoin Core download page and versioned directory on `bitcoincore.org` are the project’s stated binary distribution locations. GitHub is used for source, tags, issues, and release metadata, but project release pages direct binary users to the official deterministic, signed downloads.

A file attached to a GitHub release is not automatically preferred or verified. Users should follow the current official verification instructions, not download a similarly named binary from an issue, fork, search result, or third-party mirror.

A torrent can distribute the same bytes, but the transport source does not replace checksum and signature verification.

### Security fixes and disclosure timing

Security vulnerabilities can require coordinated fixes and delayed disclosure. The security policy defines private reporting paths, while public advisories identify affected versions, severity context, and fixed releases after disclosure.

Delay can reduce the time attackers have to exploit a flaw before users can upgrade. It also means public issue history is not always complete at release time.

A release containing a security fix may initially use limited language. Later disclosure can provide more detail. Researchers should date the evidence and avoid concluding that absence of a public issue means no security work occurred.

### Upgrade and downgrade considerations

Release notes provide version-specific upgrade instructions and compatibility warnings. A typical upgrade requires shutting the old process down cleanly before starting the new binary.

Databases, chainstate formats, indexes, and wallets may be migrated. A successful upgrade does not guarantee that an immediate downgrade is safe. Older software may not understand newer data, and a rollback can require reindexing, restoring a backup, or recreating an index.

Wallet migration deserves additional caution because key and descriptor data may be changed. Operators should read the release notes for both directions, back up using documented procedures, and test operational runbooks before a high-value deployment.

Pruning and optional indexes can affect recovery time. Rebuilding from retained local data may not be possible if the needed block files were pruned.

### A release is not consensus activation

A software release and a Bitcoin consensus activation are different events.

A release publishes code. Activation determines when a rule is enforced on a network. A release may contain no consensus changes. It may contain inactive code for a proposal. Multiple maintained branches may receive the same consensus-related patch. Alternative implementations may deploy compatible rules through different code.

Node operators are not automatically updated by the project. They choose whether and when to install. Miners and businesses make their own decisions. A maintainer cannot create network consensus by tagging a release.

For every claim that a release “changes Bitcoin,” identify the exact rule, deployment method, activation state, implementation versions, and observed network behavior.

### A release-evidence ladder

Evaluate artifacts from narrowest to broadest:

1. **Release schedule:** intended timing; not final code.
2. **Release branch:** stabilization target; can still change.
3. **Release candidate:** testable near-final artifact; not final.
4. **Signed tag:** key attestation to a source reference.
5. **Release notes:** human-readable change map.
6. **Reproducible-build attestations:** evidence of matching outputs from specified source and inputs.
7. **Checksums:** identity of downloaded bytes.
8. **Checksum signatures:** signer attestations to those identities.
9. **Platform code signatures:** operating-system publisher and integrity evidence.
10. **Independent testing and review:** behavioral evidence for selected risks.
11. **Deployment observation:** evidence of what users and the network actually run.

No single rung proves the whole system safe. Together they make the release more inspectable.

## 3. Key Terms

- **Integration branch:** The main branch where reviewed development changes are combined.
- **Feature freeze:** A stabilization period limiting new feature changes.
- **Release branch:** A branch maintained for one software release line.
- **Release candidate:** A near-final build published for testing.
- **Stable tag:** A fixed Git reference identifying final release source.
- **Maintenance release:** A release carrying selected fixes for a supported major line.
- **End of life:** A release line no longer generally maintained.
- **Reproducible build:** A process intended to produce byte-identical outputs from specified source and inputs.
- **Build attestation:** A signed statement about output checksums produced by a builder.
- **Checksum:** A digest used to identify file bytes.
- **Code signature:** A platform or cryptographic signature over a software object.
- **Consensus activation:** The point at which a network begins enforcing a new consensus rule.

## 4. Sources

1. **Bitcoin Core Release Process at v31.1** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/release-process.md
   - Supports: Branch preparation, release candidates, signed tags, release notes, Guix builds, attestations, detached code signatures, and final publication.
2. **Bitcoin Core Software Life Cycle** | Bitcoin Core project
   - URL: https://bitcoincore.org/en/lifecycle/
   - Supports: Major and maintenance versioning, six-to-seven-month aim, latest-three-major maintenance window, EOL table, protocol-version distinctions, and consensus release treatment.
3. **Bitcoin Core Download and Verification Page** | Bitcoin Core project
   - URL: https://bitcoincore.org/en/download/
   - Supports: Current version, official downloads, checksums, multiple signatures, key trust, and reproducible-build explanation.
4. **Bitcoin Core 31.1 Release Directory** | Bitcoin Core project
   - URL: https://bitcoincore.org/bin/bitcoin-core-31.1/
   - Supports: Versioned release artifacts, `SHA256SUMS`, `SHA256SUMS.asc`, binaries, and release-candidate directory.
5. **Bitcoin Core v31.1 Tag Commit** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/commit/9be056a8a72b624dae9623b2f7bded92c2a21c91
   - Supports: Exact final 31.1 source commit reviewed.
6. **Bitcoin Core v31.1 Release Notes** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/release-notes.md
   - Supports: Version-specific changes, compatibility, upgrade guidance, and release identity.
7. **Bitcoin Core v31.1 README** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/README.md
   - Supports: Development-branch instability warning, stable tags, tests, and release-source boundaries.
8. **Contributing to Bitcoin Core at v31.1** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/CONTRIBUTING.md
   - Supports: Pull-request review, test expectations, merge workflow, and signed deterministic merge history.
9. **Bitcoin Core Security Policy** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/SECURITY.md
   - Supports: Supported versions and private vulnerability reporting.
10. **Bitcoin Core Security Advisories** | Bitcoin Core project
    - URL: https://bitcoincore.org/en/security-advisories/
    - Supports: Public disclosure and affected-version evidence.
11. **Bitcoin Core Guix Build Documentation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/contrib/guix/README.md
    - Supports: Reproducible build and attestation workflow.
12. **Bitcoin Core Guix Signatures Repository** | Bitcoin Core builders
    - URL: https://github.com/bitcoin-core/guix.sigs
    - Supports: Independently published build-output attestations.
13. **Bitcoin Core Detached Signatures Repository** | Bitcoin Core release contributors
    - URL: https://github.com/bitcoin-core/bitcoin-detached-sigs
    - Supports: Detached platform code-signing material.
14. **Bitcoin Core Maintainer Tools** | Bitcoin Core maintainers
    - URL: https://github.com/bitcoin-core/bitcoin-maintainer-tools
    - Supports: Release tagging and consistency tooling referenced by the release process.
15. **Bitcoin Core 31.0 Release Schedule Issue** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/issues/33607
    - Supports: A concrete example of proposed translation milestones, feature freeze, branch-off, release-candidate, and final timing.
16. **Bitcoin Core Releases Index** | Bitcoin Core project
    - URL: https://bitcoincore.org/en/releases/
    - Supports: Major and maintenance release history.
17. **Bitcoin Core 31.0 Release Notes** | Bitcoin Core project
    - URL: https://bitcoincore.org/en/releases/31.0/
    - Supports: Upgrade and data-migration cautions for a major release.
18. **Bitcoin Core 31.1 Release Announcement** | Bitcoin Core project
    - URL: https://bitcoincore.org/en/2026/07/08/release-31.1/
    - Supports: Dated final release announcement.
19. **Bitcoin Core JSON-RPC Interface** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/JSON-RPC-interface.md
    - Supports: Example of software interface behavior versioned separately from consensus.
20. **Bitcoin Core BIP Status Documentation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/bips.md
    - Supports: Release-specific documentation of implemented and deployed BIP behavior.

## 5. SEO title

How Bitcoin Core Releases Work | Mempool Surf Club

## 6. Meta description

Learn how Bitcoin Core moves from development to release candidates, tags, reproducible builds, checksums, signatures, and maintenance updates.

## 7. Page excerpt

Follow the Bitcoin Core release process and learn what tags, builds, checksums, signatures, and lifecycle status can—and cannot—prove.

## 8. Estimated reading time

17 to 20 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-051 | How to Read the Bitcoin Source Code
- Next: MSC-GUIDE-053 | How Bitcoin Improvement Proposals Work
- Prerequisite: MSC-GUIDE-049 | What Is Bitcoin Core?
- Prerequisite: MSC-GUIDE-051 | How to Read the Bitcoin Source Code
- Branch: MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work
- Branch: MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?
- Branch: MSC-GUIDE-048 | Emerging Protocols on Bitcoin: How to Evaluate Them
- Return: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] Development, proposed schedules, freezes, release branches, candidates, testing, tags, notes, major releases, and maintenance releases are covered.
- [x] The current maintenance window and cadence aim are dated to the live lifecycle page reviewed July 24, 2026.
- [x] Guix reproducibility, checksums, multiple signatures, platform code signing, and official distribution are described as separate evidence.
- [x] No single maintainer, tag, signer, checksum, or GitHub artifact is presented as independently establishing a trusted release.
- [x] Reproducible output is not presented as proof of source correctness or security.
- [x] Upgrade, downgrade, database, wallet, index, and pruning considerations are version-specific.
- [x] A software release is separated from consensus activation and network adoption.
- [x] Users are not told they must upgrade automatically; risk depends on exact advisories and deployment.
- [x] Planned internal links remain inactive and do not imply publication.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-24
- Notes: Verified the live download, releases, lifecycle, and security pages; the `v31.1` tag and final commit; the tagged release process, release notes, Guix documentation, security policy, checksums, signature collection, and official versioned binary directory. Reviewed Bitcoin Core issue #33607 as the 31.0 release-schedule example and confirmed that its freeze, branch-off, release-candidate, and final dates are proposed coordination targets. Confirmed that each artifact’s evidence and limitations are stated separately and that release publication is not equated with consensus activation.

## 12. Illustration brief

### Illustration 1

- Concept title: Bitcoin Core Release Voyage
- Educational purpose: Show the path from integration branch to final release without implying a single actor controls it.
- Recommended placement: After Release candidates.
- Visual description: Vintage nautical voyage chart from integration waters through feature freeze, branch-off, rc1, testing, later candidates, tag, and final harbor.
- Required labels: Integration branch, Feature freeze, Release branch, rc1, Testing, rc2, Final tag, Release
- Caption: A final release follows iterative stabilization and testing rather than one unilateral publication step.
- Alt text: Nautical timeline of the Bitcoin Core release process from development to final tag.
- Image orientation: Landscape
- Mobile crop notes: Use a single left-to-right route with eight compact stops.
- Status: PLANNED

### Illustration 2

- Concept title: Release Evidence Signal Flags
- Educational purpose: Distinguish source tags, checksums, builder attestations, and platform signatures.
- Recommended placement: After Code signing is different.
- Visual description: Maritime signal station with separate flags for signed tag, reproducible build, checksum, PGP attestation, and platform code signature, each pointing to the object it verifies.
- Required labels: Source tag, Build output, SHA256SUMS, Builder signature, Platform signature, Trusted key
- Caption: Release artifacts sign or identify different objects and therefore provide different evidence.
- Alt text: Signal flags showing what each Bitcoin Core release signature or checksum applies to.
- Image orientation: Landscape
- Mobile crop notes: Stack each artifact above its verified object.
- Status: PLANNED

### Illustration 3

- Concept title: Release Versus Activation Chart
- Educational purpose: Separate software publication from network consensus deployment.
- Recommended placement: After A release is not consensus activation.
- Visual description: Two parallel nautical timelines: one for code review, tag, binaries, and installation; another for proposal, deployment parameters, activation state, and observed enforcement.
- Required labels: Software release, Tag, Binary, User install, Consensus proposal, Deployment, Activation, Network enforcement
- Caption: Publishing or installing software does not by itself activate a Bitcoin consensus rule.
- Alt text: Parallel timelines separating a Bitcoin Core release from consensus activation.
- Image orientation: Landscape
- Mobile crop notes: Place the two timelines vertically with aligned dates.
- Status: PLANNED
