---
registry_id: MSC-GUIDE-065
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: Who Builds on Bitcoin?
handle: bitcoin-builders
category: Bitcoin Ecosystem
subcategory: People
depth: Surface
format: Ecosystem Overview
primary_path: Explore the Ecosystem
secondary_paths:
  - Build on Bitcoin
author_display: Mempool Surf Club Editorial
reviewed_date: null
copy_locked_date: null
---

# Who Builds on Bitcoin?

## 1. Introductory deck

Bitcoin is built and used by overlapping groups: protocol researchers, software contributors, reviewers, wallet and hardware teams, miners, Lightning developers, infrastructure operators, educators, designers, artists, journalists, policy specialists, and communities. They do not belong to one organization, follow one roadmap, or receive authority from one title. Understanding the ecosystem means separating contribution, funding, employment, visibility, product influence, and protocol control.

## 2. Full article

Bitcoin is open-source software, a peer-to-peer network, a monetary system, and a growing collection of tools and institutions. The people who build around it do not work inside one organization. They do not receive assignments from a central product manager, and there is no official membership list that decides who counts as a builder.

The phrase “building on Bitcoin” therefore covers several different kinds of work. A protocol researcher may study consensus or networking behavior. A node contributor may propose and review changes to an implementation. A wallet team may design transaction construction, key management, and recovery flows. A mining company may operate hardware and energy infrastructure. An educator may translate a technical concept into another language. An artist may shape how people interpret the system. These activities can overlap, but they are not interchangeable.

This guide was researched on July 26, 2026. Current projects, funding programs, company relationships, and organizational examples must be renewed before publication because they can change even when the underlying role distinctions remain useful.

### Bitcoin has no central builder organization

Bitcoin does not have a central hiring authority, official roadmap, or governing board that assigns ecosystem work. People participate through separate repositories, businesses, nonprofits, universities, standards discussions, informal communities, and independent projects. Some work is coordinated tightly within a team. Other work is public, asynchronous, and spread across many organizations.

That structure creates resilience and friction at the same time. Independent teams can pursue different approaches, duplicate work, or compete on product design. They can also disagree about priorities, security assumptions, policy, user experience, or acceptable tradeoffs. Coordination usually depends on public discussion, code review, testing, interoperability work, market demand, and voluntary adoption rather than a single command chain.

A contributor can influence one project without representing Bitcoin as a whole. A company can build a widely used service without receiving protocol authority. A nonprofit can fund valuable work without controlling network consensus. Visibility, money, or access may increase practical influence, but none creates a universal right to define Bitcoin for everyone else.

### Building Bitcoin and building with Bitcoin

A useful first distinction is between work on the base system and work that uses the base system.

**Building Bitcoin** can include research into consensus rules, peer-to-peer networking, cryptography, validation, mempool behavior, or software architecture. It can also include implementation work in Bitcoin Core or another node project, along with review, testing, release engineering, documentation, and security response.

**Building with Bitcoin** can include wallets, payment applications, exchanges, custody systems, accounting software, merchant tools, Lightning services, explorers, analytics, educational products, art, and media. These products rely on Bitcoin, but their internal rules and business policies are not automatically Bitcoin protocol rules.

The boundary is not absolute. A wallet developer may discover a protocol edge case. A mining software engineer may contribute to standards. A company employee may review open-source code independently. The important question is not the person’s title. It is which system they are changing, what authority that system grants, and who must adopt the result.

### Protocol research, specifications, and implementations

Protocol researchers examine how Bitcoin behaves and how proposed changes might affect security, privacy, incentives, interoperability, and deployment. Research can appear in papers, mailing-list posts, issue discussions, repositories, talks, or test implementations.

Bitcoin Improvement Proposals provide a publication and documentation process for mature ideas. A BIP author describes a proposal; the author does not command its adoption. The deployed BIP process explicitly separates publication from consensus and states that no formal decision body governs Bitcoin development or decides adoption.

Node implementations translate protocol rules and engineering choices into software. Bitcoin Core is one major implementation, but the ecosystem also contains other node software and specialized libraries. A patch to any repository is only a proposal to that project. Acceptance depends on its maintainers, reviewers, tests, project norms, and release process. Even after software is released, users choose whether to run it.

Code authorship is therefore different from code acceptance. Code acceptance is different from release. Release is different from deployment. Deployment is different from network-wide adoption.

### Review, testing, maintenance, and security

Much of the work that keeps Bitcoin software usable is less visible than writing a new feature.

Reviewers examine design assumptions, code paths, tests, performance, compatibility, and failure modes. Testers reproduce behavior across platforms and configurations. Fuzzing searches for unexpected inputs and states. Release engineers assemble, verify, and communicate releases. Maintainers triage issues, organize changes, and preserve repository quality. Documentation contributors explain interfaces and operational limits.

Security researchers may investigate vulnerabilities privately before public disclosure. Responsible disclosure requires careful coordination because premature publication can expose users before fixes are available. Incident response can include reproducing the issue, narrowing affected versions, preparing patches, coordinating releases, and documenting the boundary without overstating certainty.

Review and maintenance are development work. Their value is not measured by the number of new features shipped.

### Wallets, hardware, and user security

Wallet development combines cryptography, transaction construction, storage, backups, hardware integration, fee estimation, privacy, and user experience. A wallet can be self-custodial, custodial, or combine user and service controls. Those models create different responsibilities and failure modes.

Hardware-wallet work includes device electronics, secure elements or general-purpose chips, firmware, host software, signing protocols, reproducible builds, manufacturing, supply-chain controls, and recovery design. A product may use open-source components while retaining proprietary hardware or services. “Open source” should be applied to the specific component, not used as a blanket ownership claim.

Designers, researchers, accessibility specialists, and translators are also builders here. A technically correct signing flow can still fail users if warnings are unclear, screen readers cannot interpret it, translations change meaning, or recovery steps assume knowledge the user does not have.

### Mining infrastructure

Mining is supported by several layers of builders: semiconductor designers, ASIC manufacturers, firmware developers, pool software teams, protocol and standards contributors, facility engineers, energy specialists, operators, repair technicians, and monitoring providers.

These roles affect efficiency, transaction selection interfaces, geographic distribution, and operational concentration. They do not give a miner or manufacturer unilateral power to rewrite consensus rules. Mining influence is real but bounded. Miners construct candidate blocks and choose among transactions that satisfy the rules enforced by the software they run. Other nodes independently validate those blocks.

Mining pools add another distinction. A pool can coordinate work and payouts for many miners without owning every machine. Pool policy, block-template construction, and miner choice should not be collapsed into one actor.

### Lightning and payment systems

Lightning development includes protocol specifications, node implementations, routing, channel management, wallet integration, liquidity tools, watchtowers, service infrastructure, testing, and user-interface work.

The Lightning ecosystem demonstrates why “builder” is not one role. An implementation team can make local software choices. Standards participants can propose interoperability rules. Node operators can decide which software and policies to run. Wallet providers can choose defaults and custody models. Merchants can integrate one provider or several. None of those actors alone defines the entire network.

Other payment systems and protocols may use different trust, custody, settlement, and availability assumptions. Their relationship to Bitcoin must be described precisely rather than grouped under a vague claim that everything “inherits Bitcoin security.”

### Libraries, APIs, indexers, explorers, and tools

Libraries and software development kits package reusable functions for key handling, transaction construction, networking, Lightning, hardware communication, or data parsing. APIs expose selected operations from a node or service. Indexers derive searchable views from blockchain or mempool data. Explorers present those views to people.

These tools make development faster, but they introduce dependencies. A hosted API can become an availability, privacy, and policy intermediary. An indexer can disagree with another indexer because of configuration, software, or data-model choices. An explorer is an interface to a data source, not an independent consensus authority.

Developer tooling also includes debuggers, simulators, test frameworks, reproducible build systems, package maintenance, continuous integration, and local development environments. The people who maintain these layers may never appear in a consumer product, yet their decisions affect many downstream teams.

### Custody, exchanges, and market infrastructure

Custodians and exchanges build key-management systems, transaction workflows, internal ledgers, compliance systems, market interfaces, risk controls, and customer support. Their product policies can strongly shape user experience. They may decide which deposit types to accept, how many confirmations to require, which forks or assets to support, and when withdrawals are paused.

Those are company policies, not Bitcoin consensus rules. A platform balance may be an internal claim rather than an onchain output controlled by the customer. An exchange can influence market access and liquidity without controlling the protocol.

Public filings are useful primary evidence for understanding custody arrangements, vendor dependence, insurance limits, operational discretion, and conflicts. They should be read as company or issuer disclosures, not as proof that the disclosed controls eliminate risk.

### Privacy, civil liberties, policy, and law

Privacy and security builders develop coin-selection tools, network protections, collaborative transaction protocols, secure communication, custody practices, and threat models. Civil-liberties organizations may analyze surveillance, financial access, sanctions, speech, or due-process questions. Lawyers and policy specialists interpret laws, participate in rulemaking, litigate, advise organizations, or explain regulatory risk.

Legal and policy work can alter the environment in which products and users operate. It does not change Bitcoin consensus by itself. A regulation can affect companies in a jurisdiction while nodes elsewhere continue enforcing the same protocol rules. Conversely, protocol behavior does not remove legal obligations from a person or business.

Claims about law, regulation, enforcement, or a current official’s position require jurisdiction and date.

### Education, documentation, journalism, and media

Education can include technical documentation, courses, workshops, translations, tutorials, diagrams, community support, and curriculum design. Good education distinguishes protocol facts from implementation details, product choices, economic interpretation, and opinion.

Journalists and media producers investigate companies, public records, technical disputes, security events, and community narratives. Their work can improve accountability or amplify incomplete claims. Editorial reach is a form of influence, not technical authority.

Documentation and localization are often maintenance systems. They require version tracking, review, accessibility, and updates when software or terminology changes. A translation is not merely word replacement; it can change risk understanding if concepts do not map cleanly across languages.

### Design, art, and culture

Designers shape interfaces, research user behavior, create icons, establish visual language, and make complex operations more legible. The Bitcoin Design Guide is a current example of an open-source design project whose contribution process is public.

Artists, filmmakers, musicians, writers, photographers, and makers shape cultural meaning. Their work can create shared symbols, critique power, preserve history, or invite participation. Cultural production is part of the ecosystem, but artistic claims do not become technical facts through repetition.

A creator may sell work, accept patronage, use inscriptions, or receive grants. Those funding relationships matter when evaluating incentives, but they do not determine artistic merit or protocol authority.

### Funding without control

Open-source work can be funded through employment, contracts, grants, donations, sponsorships, fellowships, or personal resources. As of July 26, 2026, Brink and OpenSats publish current reports describing grants and funded work. Those disclosures help readers evaluate who funds what.

Funding can influence which work is feasible, who has time to participate, and which research receives attention. It can also create dependency, concentration, or conflict-of-interest risk. But funding a contributor does not automatically make the funder the author of the work, the maintainer of a repository, or the controller of network consensus.

The relevant questions include: Who selected the work? What reporting is required? Is the relationship public? Can the contributor disagree with the funder? Can other teams compete or fork? What happens if funding ends?

### Volunteers, employees, contractors, and communities

A builder may be:

- a volunteer contributing outside paid work;
- an employee assigned to a product or open-source project;
- an independent contractor;
- a grant-funded contributor;
- a university researcher;
- a nonprofit staff member;
- an anonymous or pseudonymous participant;
- a community organizer working through informal networks.

These categories can overlap and change. Employment does not prove authorship. Independent contribution does not prove neutrality. Pseudonymity does not prove expertise or misconduct. The work, evidence, permissions, disclosures, and review process matter more than a label.

### How to evaluate a builder claim

When someone is described as “building Bitcoin,” ask:

1. What project, product, research, or community work is involved?
2. Is the work on protocol rules, an implementation, an application, infrastructure, education, policy, or culture?
3. Is the person an author, reviewer, maintainer, employee, contractor, funder, operator, or spokesperson?
4. What public evidence supports the role?
5. Who can accept, reject, deploy, or stop the work?
6. What commercial or organizational interests are relevant?
7. Is the claim current, historical, or inferred?
8. Would the explanation remain accurate if the person changed jobs tomorrow?

That method keeps attention on systems and responsibilities. Bitcoin’s ecosystem is built by many overlapping participants, but participation is not membership in a centralized organization. The absence of a central builder hierarchy does not eliminate power, incentives, or conflict. It makes those relationships something readers must examine directly.

## 3. Key Terms

- **Builder:** Person or organization contributing to Bitcoin-related protocol, software, products, infrastructure, knowledge, policy, or culture.
- **Protocol contribution:** Research, specification, review, testing, or implementation work that concerns shared Bitcoin rules or interfaces.
- **Application development:** Work on products that use Bitcoin without necessarily changing Bitcoin’s consensus rules.
- **Code review:** Technical examination of a proposed change before or after integration.
- **Maintainer:** Project-specific role with repository or release responsibilities; not a protocol ruler.
- **Open-source funding:** Grants, employment, donations, or sponsorships supporting publicly licensed software or related work.
- **Responsible disclosure:** Private reporting and coordinated handling of a security vulnerability before broad publication.
- **Indexer:** System that derives a searchable data model from blockchain, mempool, or related data.
- **Custody:** Arrangement in which a person or service controls keys or authorization needed to move bitcoin.
- **Localization:** Adaptation of software or educational material for a language, region, and cultural context.
- **Infrastructure influence:** Practical influence created through ownership or operation of services, hardware, distribution, or dependencies.
- **Protocol authority:** Claimed power to determine Bitcoin consensus; no builder title or company role grants unilateral protocol authority.

## 4. Sources

1. **Bitcoin Core Integration and Staging Tree** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin
   - Accessed: July 26, 2026
   - Supports: Public repository, contribution workflow, testing emphasis, implementation scope, and distinction between proposing and integrating code.
2. **Contributing to Bitcoin Core** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/master/CONTRIBUTING.md
   - Accessed: July 26, 2026
   - Supports: Current project-specific contribution, review, testing, and pull-request process.
3. **Bitcoin Core Developer Notes** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/master/doc/developer-notes.md
   - Accessed: July 26, 2026
   - Supports: Current engineering, review, testing, fuzzing, logging, and maintenance practices.
4. **Bitcoin Core Security Policy** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/master/SECURITY.md
   - Accessed: July 26, 2026
   - Supports: Current private vulnerability-reporting boundary and supported-version reference.
5. **BIP 3: Updated BIP Process** | Murch; Bitcoin BIPs repository
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0003.md
   - Accessed: July 26, 2026
   - Supports: BIP publication, author and editor roles, lack of a formal Bitcoin decision body, and separation of a published proposal from consensus or adoption.
6. **Bitcoin Improvement Proposals Repository** | Bitcoin BIPs maintainers
   - URL: https://github.com/bitcoin/bips
   - Accessed: July 26, 2026
   - Supports: Current BIP archive, proposal workflow, statuses, and repository scope.
7. **Lightning Network Daemon Repository** | Lightning Labs and lnd contributors
   - URL: https://github.com/lightningnetwork/lnd
   - Accessed: July 26, 2026
   - Supports: Current Lightning implementation scope, contribution and review guidance, APIs, operational warnings, and responsible disclosure.
8. **LDK rust-lightning Repository** | Lightning Dev Kit contributors
   - URL: https://github.com/lightningdevkit/rust-lightning
   - Accessed: July 26, 2026
   - Supports: Current modular Lightning library work and public implementation repository.
9. **Bitcoin Design Guide** | Bitcoin Design Community
   - URL: https://bitcoin.design/guide/
   - Accessed: July 26, 2026
   - Supports: Open-source wallet and payment design work, public contribution, research, accessibility, and interface responsibilities.
10. **Open Design** | Bitcoin Design Community
    - URL: https://bitcoin.design/guide/getting-started/open-design/
    - Accessed: July 26, 2026
    - Supports: Open design contribution model, public collaboration, licensing, and design as ecosystem work.
11. **Brink’s 2025 Annual Report** | Brink
    - URL: https://brink.dev/blog/2026/05/26/2025-annual-report/
    - Published: May 26, 2026
    - Supports: Dated organizational and financial disclosure for Bitcoin development funding, meetings, education, and testing support.
12. **Brink’s 2025 Engineering Impact Report** | Brink
    - URL: https://brink.dev/blog/2026/03/26/engineering-impact-report-2025/
    - Published: March 26, 2026
    - Supports: Dated description of funded engineering, review, release, testing, library, and mentoring work; establishes a funding relationship, not protocol control.
13. **OpenSats Transparency** | Open Sats Initiative, Inc.
    - URL: https://opensats.org/transparency
    - Accessed: July 26, 2026
    - Supports: Current grant, financial, policy, meeting-minute, and conflict-of-interest disclosure framework.
14. **OpenSats 2025 Year in Review** | Open Sats Initiative, Inc.
    - URL: https://opensats.org/blog/2025-year-in-review
    - Published: 2026
    - Supports: Dated grant activity and grantee progress reporting across open-source Bitcoin-related work.
15. **Ordinal Theory Handbook: Inscriptions** | Ord project maintainers
    - URL: https://docs.ordinals.com/inscriptions.html
    - Accessed: July 26, 2026
    - Supports: Project-defined inscription mechanism and distinction between ordinary Bitcoin transactions and ordinal-theory tracking.
16. **Coinbase Global 2025 Form 10-K** | Coinbase Global, Inc.
    - URL: https://www.sec.gov/Archives/edgar/data/1679788/000167978826000015/coin-20251231.htm
    - Filed: 2026
    - Supports: Current company disclosures about exchange, custody, internal ledger, product, regulatory, and operational infrastructure; company policy is not protocol policy.
17. **iShares Bitcoin Trust 2025 Form 10-K** | iShares Delaware Trust Sponsor LLC
    - URL: https://www.sec.gov/Archives/edgar/data/1980994/000143774926006058/bit20251231_10k.htm
    - Filed: 2026
    - Supports: Current disclosures about custodian discretion, fork support, insurance limits, vendor dependence, and custody arrangements.

## 5. SEO title

Who Builds on Bitcoin? Roles Across the Ecosystem

## 6. Meta description

Learn who builds Bitcoin protocol software, wallets, mining and payment systems, tools, education, design, culture, and policy—and where each role’s authority ends.

## 7. Page excerpt

Explore the overlapping technical, commercial, educational, cultural, and civic roles that build around Bitcoin without forming a central organization.

## 8. Estimated reading time

21 to 25 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-064 | How to Run Reliable Bitcoin Infrastructure
- Next: MSC-GUIDE-066 | What Bitcoin Developers Do
- Related: MSC-GUIDE-005 | What Is a Bitcoin Wallet?
- Related: MSC-GUIDE-011 | How to Keep Bitcoin Secure
- Related: MSC-GUIDE-012 | How Bitcoin Privacy Works
- Related: MSC-GUIDE-017 | How Bitcoin Mining Works
- Related: MSC-GUIDE-030 | How Bitcoin Reaches Consensus
- Related: MSC-GUIDE-033 | How the Lightning Network Works
- Related: MSC-GUIDE-041 | Bitcoin Developer Tools: A Practical Overview
- Related: MSC-GUIDE-049 | What Is Bitcoin Core?
- Related: MSC-GUIDE-063 | How Bitcoin Software Is Tested
- Batch: MSC-GUIDE-066 | What Bitcoin Developers Do
- Batch: MSC-GUIDE-067 | Bitcoin Artists and the Culture They Shape
- Batch: MSC-GUIDE-068 | How Bitcoin Industry Leaders Shape the Ecosystem
- Upcoming: MSC-GUIDE-069 | How Public Companies Participate in Bitcoin
- Upcoming: MSC-GUIDE-080 | How Bitcoin Open-Source Projects Work
- Return: MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem
- Primary path: MSC-PATH-ECOSYSTEM | Explore the Ecosystem
- Secondary path: MSC-PATH-BUILD | Build on Bitcoin

## 10. Accuracy review checklist

- [x] Current projects, funding programs, and company examples are dated July 26, 2026 or tied to a dated primary record.
- [x] Historical and current participation are separated.
- [x] Protocol authority is not assigned to an individual, maintainer, miner, company, nonprofit, university, or funder.
- [x] Funding, employment, authorship, review, maintenance, deployment, adoption, and control remain distinct.
- [x] Building Bitcoin is distinguished from building a product that uses Bitcoin.
- [x] Code authorship, code acceptance, release, deployment, and network adoption remain distinct.
- [x] Company policy, custody policy, mining policy, and service defaults are not presented as Bitcoin protocol rules.
- [x] Cultural interpretation and artistic production remain distinct from technical fact and consensus.
- [x] Commercial incentives, funding dependence, vendor dependence, and conflicts are disclosed where relevant.
- [x] Reputation-sensitive claims rely on public repositories, official disclosures, or filings rather than popularity.
- [x] Named projects and organizations are examples, not endorsements or rankings.
- [x] No follower count, wealth, job title, or public visibility is used as evidence of technical authority.
- [x] Planned internal links remain inactive and publication is not implied.
- [x] Renewal requirements are documented for current roles, funding, projects, filings, and organizational relationships.

## 11. Human verification

- Reviewer: Pending ecosystem specialist review
- Review date: Pending
- Primary evidence reviewed: Pending
- Material corrections made: Pending
- Remaining sensitivities: Pending
- Renewal requirement: Pending

## 12. Illustration brief

### Illustration 1

- Concept title: The Bitcoin Shipyard
- Educational purpose: Map the many kinds of work described as building on Bitcoin without implying a central employer.
- Recommended placement: After Bitcoin has no central builder organization.
- Visual description: Vintage shipyard chart with separate docks for protocol research, node software, wallets, mining, Lightning, developer tools, custody, education, design, art, policy, and community work. Independent vessels move between docks, while the center remains an open waterway labeled Bitcoin network rather than a headquarters.
- Required labels: Protocol research, Node implementations, Review, Testing, Wallets, Hardware, Mining, Lightning, Libraries, APIs, Indexers, Custody, Education, Design, Art, Policy, Community, Bitcoin network, No central hiring authority
- Caption: Bitcoin’s ecosystem is built through overlapping projects and institutions, not one centrally managed organization.
- Alt text: Nautical shipyard map showing independent Bitcoin builder roles around an open network with no central headquarters.
- Image orientation: Landscape
- Mobile crop notes: Stack the docks in three bands and preserve the open central waterway and no-central-authority label.
- Status: PLANNED

### Illustration 2

- Concept title: Contribution-to-Adoption Navigation Chart
- Educational purpose: Distinguish a proposed change from acceptance, release, deployment, and network adoption.
- Recommended placement: After Protocol research, specifications, and implementations.
- Visual description: Nautical route with gated buoys labeled idea, research, patch, tests, review, repository acceptance, release, operator deployment, and ecosystem adoption. Side channels show rejection, revision, competing implementation, and no adoption.
- Required labels: Idea, Research, Patch, Tests, Review, Accepted by project, Release, Deployment, Adoption, Revision, Rejection, Competing implementation
- Caption: Authorship begins a process; it does not guarantee acceptance or adoption.
- Alt text: Navigation chart showing the separate stages from a Bitcoin proposal to possible adoption, including revision and rejection routes.
- Image orientation: Landscape
- Mobile crop notes: Preserve the main route vertically and keep revision and rejection as visible side channels.
- Status: PLANNED

### Illustration 3

- Concept title: Funding and Authority Boundary Ledger
- Educational purpose: Show how grants, employment, contracts, and donations can enable work without transferring protocol control.
- Recommended placement: After Funding without control.
- Visual description: Vintage harbor ledger with four funding streams entering a workshop: employment, grants, contracts, and donations. Outputs leave as research, review, code, testing, documentation, and design. A heavy boundary line separates funding influence from repository decisions, software deployment, and consensus enforcement.
- Required labels: Employment, Grant, Contract, Donation, Time, Research, Review, Code, Testing, Documentation, Design, Repository decision, Deployment choice, Consensus enforcement, Funding is not control
- Caption: Funding changes capacity and incentives, but it does not automatically grant authorship, maintenance authority, adoption, or consensus control.
- Alt text: Ledger-style diagram separating open-source funding inputs from project decisions, deployment choices, and Bitcoin consensus.
- Image orientation: Landscape
- Mobile crop notes: Place funding inputs above outputs and retain the authority boundary as the central visual element.
- Status: PLANNED
