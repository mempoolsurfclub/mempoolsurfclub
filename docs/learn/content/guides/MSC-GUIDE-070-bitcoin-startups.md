---
registry_id: MSC-GUIDE-070
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: How Bitcoin Startups Build and Compete
handle: bitcoin-startups
category: Bitcoin Ecosystem
subcategory: Companies
depth: Shallow
format: Ecosystem Overview
primary_path: Explore the Ecosystem
secondary_paths:
  - Build on Bitcoin
author_display: Mempool Surf Club Editorial
reviewed_date: null
copy_locked_date: null
---

# How Bitcoin Startups Build and Compete

## 1. Introductory deck

Bitcoin startups turn technical capabilities into products, services, and operating businesses. They compete through product design, security, distribution, liquidity, cost, reliability, regulation, integrations, and trust. Funding or attention can extend a startup’s runway, but neither proves that its product works, protects users, or will survive. The useful questions are what the company builds, which Bitcoin layer it depends on, who controls assets and infrastructure, how it earns revenue, and what fails when a vendor, investor, or service disappears.

## 2. Full article

A Bitcoin startup is a young company whose product, revenue, or operating model materially depends on Bitcoin or a Bitcoin-related system. That definition should be applied narrowly. A company that occasionally accepts bitcoin is not necessarily a Bitcoin startup. A company may be Bitcoin-dependent even when users never see an onchain transaction, such as an infrastructure provider whose software, APIs, custody controls, or Lightning operations support another business.

Startups can build wallets, payment systems, Lightning services, mining software, hardware, node tools, data platforms, security products, accounting systems, developer tools, enterprise integrations, or educational services. Some operate custody. Some provide software that users run themselves. Some publish open-source components and sell hosted operations around them. Others are proprietary from end to end.

The category does not establish quality. A startup can have prominent investors, accelerator participation, high user growth, or extensive media coverage and still have weak controls, unclear economics, concentrated dependencies, or an unfinished product. It can also build durable infrastructure without attracting broad public attention.

This guide was researched on July 27, 2026. Company status, funding, products, licenses, repositories, terms, pricing, custody models, and security claims can change quickly. Current examples are used only to explain structures and must be renewed immediately before publication.

### Start with the product layer

The first question is where the startup operates.

A base-layer software company may build node tooling, transaction systems, signing software, or operational services around Bitcoin. A Lightning company may operate nodes, routing, liquidity, wallets, or payment APIs. A mining startup may sell firmware, management software, cooling, repair, energy coordination, or site services. A financial startup may provide custody, brokerage, credit, accounting, or risk tools. A hardware startup may design signing devices, miners, secure components, or point-of-sale equipment.

These layers have different failure modes. A hosted API can fail because the service is unavailable even while Bitcoin continues operating. A Lightning payment can fail because of route, liquidity, channel, or implementation conditions even though an onchain transaction remains possible. A hardware product can depend on manufacturing, firmware, companion software, and recovery procedures. A custody product can create a direct claim on the startup rather than giving the customer control of keys.

The startup’s product documentation should identify which system is responsible for each function. “Built on Bitcoin” does not mean every component inherits Bitcoin’s availability, privacy, finality, or security.

### Measure Bitcoin dependency

Bitcoin dependency describes how much of the business stops working if Bitcoin activity, fees, price, software, regulation, or user demand changes.

A startup can be dependent on:

- bitcoin transaction volume;
- Lightning payment volume or channel liquidity;
- bitcoin’s market price;
- block-space demand;
- mining economics;
- a particular node implementation;
- a custodian or exchange;
- a hosted node, API, indexer, or data vendor;
- one hardware manufacturer;
- one jurisdiction or banking partner;
- a proprietary protocol or open-source project;
- a small group of enterprise customers; or
- investor financing rather than customer revenue.

Dependency is not automatically a weakness. Every company relies on something. The important work is to make the dependency visible and evaluate whether the company can survive interruption, substitution, or changed economics.

A startup that claims to be “Bitcoin native” may still depend heavily on ordinary cloud hosting, app stores, banks, identity vendors, sanctions screening, card networks, telecommunications, and third-party custody. Conversely, a startup may offer a self-hosted product while operating proprietary update, analytics, or support systems. The label should not replace a component map.

### Business models must connect a user problem to revenue

A startup needs more than a technically interesting feature. It must identify a customer, a problem, a delivery method, and an economic exchange.

Common revenue models include:

- transaction or payment fees;
- custody or assets-under-administration fees;
- subscriptions;
- usage-based API pricing;
- enterprise software contracts;
- hardware margins;
- mining-pool or management fees;
- spreads or execution fees;
- financing income;
- implementation and support services;
- licensing; and
- open-source software paired with managed hosting.

Revenue quality depends on what the number represents. Gross payment volume is not revenue. Revenue is not gross profit. Gross profit is not free cash flow. A startup may subsidize fees to acquire users, pay routing or liquidity costs, absorb fraud losses, or rely on promotional pricing. A growing top-line metric can therefore coexist with deteriorating unit economics.

The business model should also identify who bears expensive failures. If a payment is reversed outside Bitcoin, a custodian loses keys, a Lightning channel is force-closed, a device is recalled, or a regulated partner terminates service, which party pays?

### Custody changes the company’s responsibilities

Custody is one of the most important startup boundaries.

In a self-custodial product, the user controls the keys or authorization required to move bitcoin. The company may provide software, updates, coordination, or optional services, but it should not be able to move funds unilaterally under the intended model.

In a custodial product, the company or its provider controls the keys or internal ledger. The user may have a contractual claim rather than direct control of an onchain output. The company must manage key security, withdrawals, accounting, compliance, liquidity, access controls, incident response, and legal obligations.

Some products use collaborative or multiparty controls. A company may hold one key, operate a recovery service, enforce policy, or provide a cosigner. Those models cannot be classified by marketing language alone. Readers should ask what happens if the company refuses, disappears, is compromised, or is legally compelled to act.

FinCEN’s May 2019 guidance discusses how U.S. Bank Secrecy Act obligations may apply to certain convertible virtual currency business models. It is a jurisdiction-specific regulatory record, not a universal classification for every startup. A company’s legal analysis, licenses, or registration should be checked for the current product, location, and date.

### Funding buys time and creates incentives

Startups can be funded by founders, customers, grants, angel investors, venture funds, strategic investors, debt, token or security offerings where lawful, or a combination of sources.

Early-stage equity and simple agreements for future equity can provide capital before a priced financing round. Y Combinator publishes multiple current post-money SAFE forms and related documents for U.S. companies, along with forms for certain other jurisdictions. The forms use different contractual terms, including valuation-cap, discount, and most-favored-nation structures. They illustrate common early-stage financing arrangements but are not identical, do not guarantee a future financing round, and do not establish product success or a fair outcome for every party.

U.S. private offerings may rely on exemptions from public registration. The SEC’s current exempt-offering resources and Form D materials explain regulatory pathways and filing records. A Form D notice establishes that an issuer reported an exempt offering. It does not show that the company is profitable, technically sound, fully funded, or endorsed by the SEC.

Funding affects:

- how long the company can operate before reaching sustainability;
- which milestones investors expect;
- founder and employee ownership;
- pressure for growth, acquisition, or another financing;
- governance and information rights;
- willingness to serve unprofitable users or markets;
- tolerance for open-source work without direct revenue; and
- the consequences of a difficult capital market.

Venture capital can support security work, hiring, audits, liquidity, and distribution. It can also encourage fast expansion, platform dependence, market concentration, or a product scope designed for investor returns. The effect must be evaluated from contracts, governance, and operating decisions rather than assumed.

### Open-source and proprietary boundaries

“Open source” should describe a specific repository, license, component, and version.

A startup may publish a client library while keeping the server proprietary. It may open-source a node implementation but operate a closed liquidity platform. It may use open-source Bitcoin software inside a hosted service whose deployment, data, keys, and policies are controlled by the company. It may publish code but retain trademarks, hardware designs, cloud tooling, or signing infrastructure.

Current public repositories for projects such as lnd and LDK show how implementation code, issues, version tags or packages, contribution processes, and licenses can be examined directly. A repository can establish what code is available and how a project accepts contributions. It does not prove that a company’s hosted deployment uses an unmodified build, has reliable operations, or preserves user privacy.

Open source can reduce switching costs by allowing inspection, independent builds, and forks. It does not remove all dependencies. Users may still rely on hosted APIs, channel liquidity, device manufacturing, update servers, or a company-controlled database.

Proprietary software can be commercially sustainable and operationally mature. Its limits are different: customers may have less ability to inspect behavior, migrate data, reproduce builds, or continue service after the vendor exits. The tradeoff should be stated without treating either licensing model as a complete security verdict.

### Distribution determines who can reach the product

A technically capable product can fail because users cannot discover, understand, obtain, integrate, or support it.

Distribution channels can include app stores, hardware distributors, payment processors, exchanges, developer ecosystems, enterprise sales, open-source communities, social media, conferences, banking partners, and integrations with other products. Each channel can become a gatekeeper.

An app-store policy change can block an update. A hardware distributor can create inventory risk. An enterprise sales cycle can consume months of runway. A platform integration can produce rapid growth but leave the startup dependent on another company’s terms. An open-source project can attract developers while the commercial product struggles to convert usage into revenue.

Distribution claims should be tied to active users, paying customers, retained usage, transaction success, supported regions, or another defined measure. Downloads, registrations, wallet creations, and social followers are not interchangeable.

### Startups compete on systems, not only features

Features are visible, but durable competition often depends on less visible systems:

- security engineering and incident response;
- uptime and operational controls;
- liquidity and capital efficiency;
- hardware supply and repair;
- integrations and developer experience;
- regulatory permissions and banking access;
- customer support;
- data portability;
- privacy;
- pricing and unit economics;
- reputation earned through reliable behavior; and
- the cost and difficulty of switching.

A startup can create network effects when the product becomes more useful as participants, liquidity, integrations, or data increase. But “network effect” is often used loosely. A larger customer base does not automatically prevent switching. Interoperable standards may let users move between providers, while proprietary data, identity, liquidity, or hardware can create lock-in.

The right question is what becomes more valuable or harder to replace as usage grows. If the answer is only brand awareness or investor spending, the claimed network effect may be weak.

### Hosted infrastructure trades control for operational convenience

Current documentation from managed Bitcoin and Lightning infrastructure providers illustrates a recurring tradeoff. A service can provision nodes, expose APIs, manage backups, monitor operations, or provide software development kits. This can reduce setup time and staffing requirements.

It also introduces a provider into the availability, privacy, security, billing, and policy path. The provider may see metadata, restrict regions, change pricing, deprecate an API, enforce usage limits, or experience an outage. A customer may be able to export keys or data, or may be tightly coupled to proprietary infrastructure.

The evaluation should ask:

1. Which keys does the provider control?
2. Is the node dedicated or shared?
3. Which data can the provider observe?
4. Can the customer run the software elsewhere?
5. What is backed up, by whom, and how is recovery tested?
6. Are APIs standard or proprietary?
7. Which service-level commitments exist?
8. What happens if billing, compliance, or support is interrupted?

Convenience is a real product benefit. It should be priced together with dependency.

### Security maturity is an operating practice

A startup may advertise encryption, multisignature, cold storage, secure hardware, audits, or bug bounties. These claims need boundaries.

Security maturity includes:

- a documented threat model;
- separation of duties;
- key lifecycle and recovery controls;
- reproducible or controlled builds;
- dependency management;
- test coverage;
- release procedures;
- access logging;
- incident response;
- vulnerability reporting;
- business continuity;
- backups and restoration tests;
- vendor review; and
- transparent communication after failures.

An audit is a dated examination of a defined scope. It does not guarantee future security. A bug bounty does not prove all bugs will be found. Cold storage does not explain authorization, backups, insiders, or withdrawal operations. “Non-custodial” does not explain whether a company can block, delay, or observe activity through another control.

Early-stage companies may have strong engineering and incomplete operations. Mature appearance may also hide weak controls. Evidence should come from technical documentation, independent audit scope where available, repository history, incident records, and actual product behavior.

### Regulation is product- and jurisdiction-specific

A Bitcoin startup may encounter money-transmission, payments, securities, commodities, banking, lending, consumer-protection, privacy, sanctions, tax, cybersecurity, or data-residency rules. The applicable framework depends on what the company does, where it operates, who its customers are, and which assets or claims it handles.

Registration is not the same as approval. A license may cover one entity, product, or jurisdiction. A legal opinion is not a court ruling. Terms can exclude certain customers even when the company markets globally.

Regulatory exposure can create a competitive advantage for firms able to maintain licenses, reporting, and compliance. It can also create concentration by raising entry costs. A startup that avoids custody may reduce some obligations while still facing others.

Legal claims must be dated and tied to the responsible entity and jurisdiction. This guide does not provide legal advice.

### Why Bitcoin startups fail

Startups can fail for ordinary business reasons and Bitcoin-specific reasons.

Common failure paths include:

- no durable customer problem;
- insufficient revenue or negative unit economics;
- inability to raise another round;
- loss of a banking, custody, cloud, hardware, or liquidity partner;
- security incidents;
- regulatory restrictions;
- founder or governance conflict;
- unreliable operations;
- a product that depends on high transaction volume or favorable bitcoin prices;
- inability to differentiate from open-source alternatives;
- poor user experience or recovery design;
- excessive customer-acquisition cost;
- concentration in one customer or jurisdiction;
- inventory or hardware delays; and
- a protocol assumption that does not mature or gain adoption.

Failure does not prove that the underlying Bitcoin capability was useless. It may show that a particular company, timing, capital structure, product, or distribution method was not durable. The software may continue under another maintainer, be acquired, be forked, or disappear.

Customers and developers should therefore plan for vendor exit before it happens. Export formats, open standards, backups, migration procedures, key control, and contract termination terms are part of product quality.

### How to evaluate a Bitcoin startup

Ask:

1. What exact problem does the product solve?
2. Which Bitcoin or Lightning functions are required?
3. Is the product custodial, self-custodial, collaborative, or mixed?
4. What is open source, and what remains company-controlled?
5. How does the company earn revenue?
6. Which costs grow with usage?
7. Who funds the company, and what outcomes do those investors seek?
8. Which vendors, platforms, banks, custodians, pools, clouds, or manufacturers are critical?
9. Can users export keys, data, liquidity, or configurations?
10. What evidence supports security and reliability claims?
11. Which legal entity and jurisdiction provide the service?
12. Which metrics show retained, paying usage rather than attention?
13. What happens if the company fails?

A startup should be evaluated as a system of product, capital, operations, dependencies, and incentives. Bitcoin can provide a durable base protocol. It does not make every company built around it durable.

## 3. Key Terms

- **Bitcoin startup:** Early-stage company whose product, revenue, or operations materially depend on Bitcoin or a Bitcoin-related system.
- **Product layer:** Technical layer where a product operates, such as base-layer software, Lightning, mining, custody, hardware, or data.
- **Bitcoin dependency:** Business reliance on Bitcoin activity, price, software, block space, mining, liquidity, or related demand.
- **Runway:** Estimated time a company can operate before it needs additional cash or reaches sustainability.
- **SAFE:** Contract for a potential future equity interest under specified financing or liquidity conditions.
- **Unit economics:** Revenue and direct costs associated with a customer, transaction, device, or other unit of activity.
- **Custodial product:** Product in which a company or provider controls keys or an internal ledger for users.
- **Self-custodial product:** Product designed so the user controls the authorization needed to move bitcoin.
- **Vendor dependence:** Reliance on another provider for a critical function.
- **Switching cost:** Time, money, operational effort, lost data, liquidity, or risk involved in changing providers.
- **Network effect:** Increase in a product’s usefulness or defensibility as participation, liquidity, integrations, or data grow.
- **Security maturity:** Demonstrated operational practice across design, testing, access, recovery, incident response, and maintenance.

## 4. Sources

1. **SAFE Financing Documents** | Y Combinator
   - URL: https://www.ycombinator.com/documents
   - Accessed: July 27, 2026
   - Supports: Multiple current post-money SAFE forms and related documents, including differing valuation-cap, discount, most-favored-nation, side-letter, and jurisdiction-specific contractual structures; does not establish that every SAFE is identical.
2. **Exempt Offerings** | U.S. Securities and Exchange Commission
   - URL: https://www.sec.gov/resources-small-businesses/exempt-offerings
   - Updated: January 26, 2026
   - Supports: Current U.S. overview of common exemptions from securities registration for startup and private-company capital raising.
3. **Frequently Asked Questions and Answers on Form D** | U.S. Securities and Exchange Commission
   - URL: https://www.sec.gov/about/divisions-offices/division-corporation-finance/frequently-asked-questions-answers-form-d
   - Updated: July 9, 2026
   - Supports: Current Form D purpose, filing mechanics, and boundaries; a notice filing is not proof that an offering closed, company quality, or SEC endorsement.
4. **Form D Data Sets** | U.S. Securities and Exchange Commission
   - URL: https://www.sec.gov/data-research/sec-markets-data/form-d-data-sets
   - Accessed: July 27, 2026
   - Supports: Availability and scope of structured Form D filing data for reported exempt offerings.
5. **Application of FinCEN’s Regulations to Certain Business Models Involving Convertible Virtual Currencies** | Financial Crimes Enforcement Network
   - URL: https://www.fincen.gov/resources/statutes-regulations/guidance/application-fincens-regulations-certain-business-models
   - Published: May 9, 2019
   - Supports: U.S. Bank Secrecy Act analysis for defined convertible-virtual-currency business models and the need to classify actual activities rather than labels.
6. **Lightning Network Daemon Repository** | Lightning Labs and lnd contributors
   - URL: https://github.com/lightningnetwork/lnd
   - Accessed: July 27, 2026
   - Supports: Current public Lightning implementation code, license, tagged releases, APIs, contribution process, operational warnings, and security-reporting boundary.
7. **LDK rust-lightning Repository** | Lightning Dev Kit contributors
   - URL: https://github.com/lightningdevkit/rust-lightning
   - Accessed: July 27, 2026
   - Supports: Current modular Lightning library code, licensing, documentation, repository tags and versioned package context, and the distinction between reusable software and a hosted commercial service.
8. **Lightning Dev Kit Repositories** | Lightning Dev Kit
   - URL: https://github.com/orgs/lightningdevkit/repositories
   - Accessed: July 27, 2026
   - Supports: Public component boundaries across libraries, sample applications, bindings, and tooling.
9. **Lightspark Documentation** | Lightspark
   - URL: https://docs.lightspark.com/
   - Accessed: July 27, 2026
   - Supports: Company-documented scope of managed Lightning infrastructure, APIs, SDKs, node and payment functions; establishes product claims, not independent proof of performance.
10. **Lightspark SDK Getting Started** | Lightspark
    - URL: https://docs.lightspark.com/lightspark-sdk/getting-started
    - Accessed: July 27, 2026
    - Supports: Current company-documented authentication, SDK integration, API usage, and developer dependency boundaries.
11. **Getting Started with Voltage** | Voltage
    - URL: https://docs.voltage.cloud/getting-started-with-voltage
    - Accessed: July 27, 2026
    - Supports: Company-documented managed Bitcoin and Lightning provisioning workflow and hosted-service scope.
12. **Voltage FAQ** | Voltage
    - URL: https://docs.voltage.cloud/voltage-faq
    - Accessed: July 27, 2026
    - Supports: Company-documented product, billing, node, data, and operational boundaries; establishes the provider’s current representations rather than independent reliability.
13. **Bitcoin Core Integration and Staging Tree** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin
    - Accessed: July 27, 2026
    - Supports: Open-source implementation and review context used to distinguish a startup’s product from Bitcoin consensus and from upstream software.
14. **Bitcoin Design Guide: Open Design** | Bitcoin Design Community
    - URL: https://bitcoin.design/guide/getting-started/open-design/
    - Accessed: July 27, 2026
    - Supports: Open design and contribution practices relevant to usability, accessibility, collaboration, and the limits of treating code alone as a complete product.

## 5. SEO title

How Bitcoin Startups Build, Fund, and Compete

## 6. Meta description

Learn how Bitcoin startups choose products, funding, custody, revenue, open-source boundaries, vendors, security, distribution, and competitive strategies.

## 7. Page excerpt

Bitcoin startups compete through products, capital, security, distribution, operations, and dependencies—not through funding announcements or attention alone.

## 8. Estimated reading time

18 to 22 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-069 | How Public Companies Participate in Bitcoin
- Next: MSC-GUIDE-071 | How Bitcoin Mining Companies Operate
- Related: MSC-GUIDE-005 | What Is a Bitcoin Wallet?
- Related: MSC-GUIDE-006 | What Is Bitcoin Self-Custody?
- Related: MSC-GUIDE-011 | How to Keep Bitcoin Secure
- Related: MSC-GUIDE-033 | How the Lightning Network Works
- Related: MSC-GUIDE-041 | Bitcoin Developer Tools: A Practical Overview
- Related: MSC-GUIDE-063 | How Bitcoin Software Is Tested
- Related: MSC-GUIDE-064 | How to Run Reliable Bitcoin Infrastructure
- Related: MSC-GUIDE-065 | Who Builds on Bitcoin?
- Related: MSC-GUIDE-066 | What Bitcoin Developers Do
- Batch: MSC-GUIDE-069 | How Public Companies Participate in Bitcoin
- Batch: MSC-GUIDE-071 | How Bitcoin Mining Companies Operate
- Batch: MSC-GUIDE-072 | What Bitcoin Infrastructure Companies Do
- Upcoming: MSC-GUIDE-073 | How Bitcoin Exchanges Work
- Return: MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem
- Primary path: MSC-PATH-ECOSYSTEM | Explore the Ecosystem
- Secondary path: MSC-PATH-BUILD | Build on Bitcoin

## 10. Accuracy review checklist

- [x] Current startup, repository, financing, product, and regulatory examples are dated July 27, 2026 or tied to a dated primary record.
- [x] Private startup financing remains distinct from public-company disclosure and public-market ownership.
- [x] Funding, accelerator participation, user growth, and media attention are not presented as proof of product quality or durability.
- [x] Business model, product layer, Bitcoin dependency, custody, revenue, funding, and vendor dependence are evaluated separately.
- [x] Custodial, self-custodial, collaborative, and hosted models remain distinct.
- [x] Open-source components remain distinct from hosted services, proprietary systems, and company-operated infrastructure.
- [x] Company policy and implementation behavior are not presented as Bitcoin consensus.
- [x] Security claims are limited by scope, date, operational practice, and evidence.
- [x] Distribution, switching costs, network effects, and interoperability are not treated as synonyms.
- [x] Regulation is tied to product activity, legal entity, jurisdiction, and date.
- [x] Commercial incentives, investor incentives, concentration, and conflicts are addressed.
- [x] Named companies and projects are examples, not endorsements, rankings, or directories.
- [x] Planned internal links remain inactive.
- [x] Human Verification is complete for the specialist pass.
- [x] Publication-time renewal is required for company status, funding, products, terms, licenses, repositories, security claims, and jurisdictional statements.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: July 27, 2026
- Primary evidence reviewed: Y Combinator’s current SAFE documents; SEC exempt-offering guidance, Form D FAQ updated July 9, 2026, and Form D data materials; FinCEN’s May 9, 2019 convertible-virtual-currency business-model guidance; current lnd and LDK/rust-lightning repositories; Lightspark documentation and SDK materials; Voltage product and FAQ documentation; Bitcoin Core; and Bitcoin Design’s open-design guidance.
- Verification approach: Checked financing documents as contracts rather than a single universal SAFE form; treated Form D as a notice filing rather than approval or proof of closing; separated funding from revenue and operating durability; inspected repository, license, tag or package, contribution, and security boundaries without inferring hosted deployment behavior; and classified custody through actual key, authorization, recovery, observation, and service-control roles. Provider documentation was recorded as the provider’s representation, not independent assurance of security, uptime, adoption, or financial health.
- Material corrections made: Clarified that Y Combinator publishes multiple SAFE forms with differing terms and jurisdictional scope; narrowed Form D language to exclude proof that an offering closed; replaced an unsupported generic “releases” claim for rust-lightning with repository tags and versioned package context; and completed the Human Verification record.
- Remaining sensitivities: Private-company financing, revenue, runway, unit economics, customer concentration, and solvency may not be publicly verifiable. Product terms, licenses, custody controls, key-export paths, account policies, provider dependencies, supported regions, pricing, security practices, incident history, repository maintenance, and service availability can change. Documentation, funding, repository activity, or media visibility does not establish adoption, security, product quality, or durability.
- Renewal requirement: Immediately before publication, recheck company existence and legal entities; active products, pricing, terms, supported regions, custody and recovery models; current SAFE forms and SEC/FinCEN materials; Form D status and any associated offering claims; lnd and LDK versions, licenses, security policies, and maintenance state; Lightspark and Voltage documentation; vendor, banking, cloud, liquidity, and hardware dependencies; data and key export paths; and any current security or regulatory claims.
- Authorization boundary: Completed Human Verification does not authorize Editorial Manager acceptance, copy-lock, ready-for-review transition, merge, publication, deployment, illustration generation, activation of planned links, or Phase 20.

## 12. Illustration brief

### Illustration 1

- Concept title: The Startup Dependency Vessel
- Educational purpose: Show that a Bitcoin startup is a system of product, capital, vendors, regulation, and operations rather than a single feature.
- Recommended placement: After Measure Bitcoin dependency.
- Visual description: Vintage cutaway of a working vessel. The hull contains Product, Revenue, Security, Operations, and Support. Supply lines from shore feed Funding, Cloud, Banking, Custody, Hardware, Liquidity, App Stores, and Regulation. The vessel navigates a Bitcoin and Lightning chart but is not fused with the network itself.
- Required labels: Product, Revenue, Security, Operations, Support, Funding, Cloud, Banking, Custody, Hardware, Liquidity, Distribution, Regulation, Bitcoin, Lightning, Dependency
- Caption: A startup can depend on Bitcoin while also depending on many companies and institutions outside the protocol.
- Alt text: Cutaway nautical vessel showing a Bitcoin startup’s internal systems and external dependencies on funding, cloud, banking, custody, hardware, liquidity, distribution, and regulation.
- Image orientation: Landscape
- Mobile crop notes: Keep the vessel centered and arrange external dependencies as a compact ring around it.
- Status: PLANNED

### Illustration 2

- Concept title: Custody Control Compass
- Educational purpose: Distinguish self-custodial, custodial, collaborative, and hosted startup products by control rather than marketing labels.
- Recommended placement: After Custody changes the company’s responsibilities.
- Visual description: Four-quadrant compass rose. Each quadrant maps who can authorize movement, block access, observe activity, recover funds, and continue operation if the company disappears. A key legend separates user key, company key, provider key, and internal ledger.
- Required labels: Self-custodial, Custodial, Collaborative, Hosted, User key, Company key, Provider key, Internal ledger, Authorization, Recovery, Observation, Company failure
- Caption: The custody model is defined by keys, authorization, and failure behavior—not by a product slogan.
- Alt text: Compass diagram comparing key control, authorization, recovery, and company-failure behavior across four Bitcoin startup custody models.
- Image orientation: Square
- Mobile crop notes: Preserve the four quadrants and place the key legend below them.
- Status: PLANNED

### Illustration 3

- Concept title: Runway, Revenue, and Exit Chart
- Educational purpose: Explain how financing, customer revenue, costs, and vendor exit shape startup durability.
- Recommended placement: After Why Bitcoin startups fail.
- Visual description: Vintage navigation ledger showing a startup’s cash reservoir feeding monthly operations. Separate streams enter from founders, investors, grants, and customers. Outflows lead to engineering, security, compliance, liquidity, hardware, support, and vendors. Three routes show sustainability, another financing, and shutdown or migration, with exportable keys and data marked as lifeboats.
- Required labels: Founder capital, Investor capital, Grants, Customer revenue, Runway, Engineering, Security, Compliance, Liquidity, Hardware, Support, Vendors, Sustainability, New financing, Shutdown, Migration, Export keys, Export data
- Caption: Funding extends runway, but durable operations require revenue, controlled costs, and a credible exit path for users.
- Alt text: Nautical financial chart showing startup capital inflows, operating outflows, runway, and routes toward sustainability, new financing, or shutdown with user migration.
- Image orientation: Landscape
- Mobile crop notes: Use a vertical cash-flow path and preserve all three outcome routes.
- Status: PLANNED
