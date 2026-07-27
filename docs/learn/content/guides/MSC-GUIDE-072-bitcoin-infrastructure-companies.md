---
registry_id: MSC-GUIDE-072
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: What Bitcoin Infrastructure Companies Do
handle: bitcoin-infrastructure-companies
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

# What Bitcoin Infrastructure Companies Do

## 1. Introductory deck

Bitcoin infrastructure companies provide technical systems that other products and organizations rely on: nodes, APIs, indexers, Lightning operations, mining systems, signing hardware, developer tools, security services, and enterprise integrations. Infrastructure should be defined by function, not reputation. A hosted node, explorer, API, wallet backend, or indexer can make Bitcoin easier to use while introducing privacy, availability, policy, and vendor dependencies. None becomes an independent consensus authority merely because many customers rely on it.

## 2. Full article

Infrastructure is the set of systems that help another system operate. In Bitcoin, that can include physical equipment, open-source software, hosted services, data pipelines, APIs, security processes, and operational support.

The word is often used too broadly. A company may call itself “Bitcoin infrastructure” because it operates near the ecosystem, serves institutional customers, or has a visible brand. The more useful approach is functional: what service does the company provide, which component depends on it, what authority does it have, and what happens when it fails?

This guide focuses on company roles behind products and operations. It does not replace the planned guides on exchanges, wallet providers, marketplaces, or general service providers. Those businesses may depend on infrastructure, but their customer-facing market roles require separate treatment.

This guide was researched on July 27, 2026. Products, repositories, APIs, hosting models, supported networks, pricing, service regions, custody controls, and operational claims can change. Current company documentation establishes what the provider describes, not independent proof of reliability or neutrality. All current examples must be renewed immediately before publication.

### Define infrastructure by the dependency it creates

A system is infrastructure when another product or operator depends on it for a technical or operational function.

Examples include:

- a full node used to validate and broadcast transactions;
- a hosted node controlled through a provider dashboard;
- an indexer that turns blockchain data into a searchable database;
- an explorer or API that exposes that indexed view;
- a Lightning node, channel-management system, or liquidity service;
- a mining control system or site-management platform;
- a hardware signing system;
- a software library or development kit;
- a monitoring, backup, or incident-response service;
- an enterprise connector linking Bitcoin systems to accounting, payments, compliance, or internal controls; and
- a data service that supplies fee estimates, prices, transaction status, or network metrics.

The dependency can be optional, replaceable, or deeply embedded. A wallet may query one public explorer but allow the user to switch. Another product may be built around a proprietary API with no export path. Both use infrastructure, but their failure and switching risks differ.

Not every Bitcoin-adjacent company is core infrastructure. A media company, conference organizer, investment firm, or apparel business may contribute to the ecosystem without providing a technical dependency. A financial service may use Bitcoin infrastructure without itself being infrastructure.

### Node hosting and management

A Bitcoin full node downloads and validates blocks and transactions under the software and configuration its operator chooses. Running a node requires storage, bandwidth, updates, monitoring, backups for relevant configuration or wallet data, and operational knowledge.

Infrastructure companies may provide:

- cloud instances with Bitcoin software;
- managed node provisioning;
- shared node access;
- dedicated nodes;
- remote procedure call access;
- network connectivity;
- monitoring and alerts;
- snapshots or accelerated initial setup;
- software updates; and
- support.

These services reduce operational work. They also change the control boundary.

With a self-operated node, the user selects the hardware, software, network, data access, and update process. With a hosted node, the provider may control the machine, account, network path, or software lifecycle. The customer may have administrative credentials without controlling the underlying infrastructure.

Voltage’s current documentation, accessed July 27, 2026, describes managed Bitcoin Core and Lightning products, including shared Bitcoin Core nodes for certain Lightning configurations, developer access, backups, and provider-managed operations. That documentation establishes the service model described by Voltage. It does not prove that the service is appropriate for every threat model or that it cannot fail.

Questions for hosted nodes include:

1. Is the node shared or dedicated?
2. Who chooses the software version and configuration?
3. Can the provider observe queries, addresses, transactions, or peer connections?
4. Can the customer export data and run elsewhere?
5. Which credentials are available?
6. What is backed up?
7. What availability or recovery commitment exists?
8. What happens during account suspension, provider failure, or a disputed payment?

A hosted node can independently validate data under its software. The customer’s reliance on the provider means the customer may not independently control that validation environment.

### APIs expose a selected interface

An application programming interface lets software request data or actions through a defined interface. Bitcoin APIs can expose blocks, transactions, UTXOs, fee estimates, address histories, mempool data, node commands, payment status, or signing workflows.

An API is not the Bitcoin network. It is a view or control surface built on one or more underlying systems.

Bitcoin Core’s RPC command set and behavior are version-specific. The current exported Bitcoin Core 31.0.0 RPC documentation describes that release; it should not be treated as proof that a provider runs the same version, enables every component, exposes every command, or preserves the same configuration and security boundary.

The provider decides:

- which data fields exist;
- how data is indexed;
- which limits and authentication apply;
- how errors are represented;
- how long information is retained;
- which software and policies run underneath;
- which jurisdictions or customers are served; and
- when versions are changed or retired.

A public API can accelerate development. It can also leak metadata, become unavailable, censor requests, return stale information, impose rate limits, or create a single point of policy dependence.

Self-hostable APIs can reduce some dependence. They still require operators to run the underlying node, indexer, database, and software updates.

### Indexers and explorers create derived views

Bitcoin Core validates blocks and transactions, but it does not provide every query pattern that applications need. Indexers parse blockchain or mempool data into databases optimized for addresses, scripts, transaction relationships, fees, or other views. Explorers present those views to people or applications.

Blockstream’s Esplora repository documents a browser-based explorer interface built against the esplora-electrs HTTP API, while its API document specifies the HTTP endpoints exposed by a compatible backend. The mempool project publishes open-source explorer, mempool, and API software that can be self-hosted. These repositories establish available code, interfaces, and project instructions at the access date.

An indexer’s database is derived. It can be incomplete, stale, misconfigured, or based on a particular node and policy. Different indexers can disagree because of timing, software, address interpretation, mempool policy, or data model.

An explorer therefore is not an independent consensus authority. It reports what its backend sees and computes. A user who treats one explorer as the network can confuse service failure with Bitcoin failure or confuse local mempool policy with a universal rule.

Infrastructure evaluation should identify:

- the node source;
- indexer software and version;
- confirmation and reorganization handling;
- mempool policy;
- address and script support;
- database rebuild procedures;
- API limits;
- privacy logging;
- and whether independent operation is practical.

### Wallet backends support products without becoming wallets

A wallet application may rely on infrastructure for chain synchronization, transaction broadcasting, fee estimation, exchange rates, notifications, labels, or multisignature coordination. The backend can be operated by the wallet company, a third party, or the user.

This guide treats the backend function, not the customer-facing wallet-provider relationship reserved for MSC-GUIDE-074.

The backend architecture affects privacy and availability. A server that receives addresses or extended public keys may learn a user’s transaction history. A compact-filter or client-side model can change the information disclosed, but it still depends on peers, servers, or data distribution.

A backend can also shape transaction construction through fee estimates, coin-selection suggestions, change handling, or broadcasting. These are implementation and product choices. The resulting transaction must still satisfy Bitcoin consensus rules, and each node may apply its own relay and mempool policy.

The important distinction is between controlling keys and supplying information. A backend may not hold keys but can still observe activity, delay service, return misleading fee data, or block a workflow. “Non-custodial” does not mean “no infrastructure dependency.”

### Lightning infrastructure

Lightning infrastructure can include node implementations, hosted nodes, channel operations, routing, liquidity, watchtowers, payment APIs, SDKs, monitoring, and backup systems.

The lnd repository documents a current open-source Lightning implementation, APIs, database behavior, operational guidance, and security-reporting process. Lightspark publishes documentation for managed Lightning infrastructure and software development kits. Voltage publishes documentation for managed nodes and related services.

These sources show different layers:

- **implementation software** that can be run by an operator;
- **libraries or SDKs** embedded into another product;
- **hosted nodes** operated through a company platform;
- **managed liquidity and payment services** supplied under commercial terms; and
- **enterprise APIs** that abstract node and channel operations.

The layers should not be collapsed. Open-source lnd code is not identical to any one company’s hosted deployment. A provider’s API may add proprietary routing, liquidity, risk, compliance, or accounting systems around an implementation.

Lightning dependencies can include channel counterparties, inbound and outbound liquidity, routing nodes, watchtowers, backups, implementation compatibility, chain access, fee policy, and provider availability. A payment API can simplify all of this for an application while shifting control and visibility to the provider.

A Lightning service does not control Bitcoin consensus. It operates a separate payment-channel system whose contracts ultimately depend on Bitcoin transactions under defined conditions.

### Mining infrastructure companies

Mining infrastructure can include site design, power systems, cooling, containers, firmware, fleet management, pools, repair, monitoring, ASIC supply, and mining communication software.

MSC-GUIDE-071 covers mining-company operations. Here the focus is the supporting dependency.

A fleet-management platform can monitor thousands of machines and change power or pool settings. A firmware provider can affect efficiency and stability. A pool infrastructure provider can distribute work and calculate payouts. A cooling vendor can determine whether equipment operates reliably at a site.

These providers can become concentrated control points even when they do not own the miners. Remote access, update signing, administrative credentials, and fallback procedures matter. A compromised management system could redirect hashrate or disrupt operations.

Stratum V2 specifications and public implementation repositories document work on mining communication and job negotiation. Their existence does not prove uniform deployment. Mining companies and pools may use older protocols, proprietary systems, or partial integrations, and the current application repository must be evaluated according to its stated maturity.

### Hardware and signing systems

Hardware infrastructure includes signing devices, secure components, hardware security modules, backup media, transaction-verification displays, and interfaces connecting software to devices.

A signing system should be evaluated across:

- key generation;
- entropy;
- secure storage;
- authorization;
- transaction display;
- firmware;
- update verification;
- host communication;
- backup and recovery;
- manufacturing;
- supply chain;
- tamper response; and
- device retirement.

Bitcoin Core’s Hardware Wallet Interface repository provides a current open-source interface for interacting with supported hardware wallets. It illustrates a software bridge between node or wallet software and hardware devices. The interface does not certify every connected device or eliminate supply-chain and firmware risk.

Infrastructure companies may sell hardware, operate enterprise signing systems, provide policy engines, or manage devices. The customer must know which party can sign, change policy, push updates, recover keys, or observe transactions.

Custody and wallet-provider business models are treated separately in Guides 073–076. The infrastructure question is which components make secure signing possible and which vendor dependencies remain.

### Developer tooling and libraries

Developers rely on libraries, software development kits, command-line tools, test frameworks, simulators, package repositories, continuous integration, and documentation.

These tools can reduce repeated work and improve interoperability. They can also propagate vulnerabilities or assumptions across many products.

A library should be evaluated by:

- license;
- maintainers and review process;
- release cadence;
- supported versions;
- dependency tree;
- security policy;
- test coverage;
- API stability;
- documentation;
- reproducible builds where applicable; and
- migration path.

Company support can fund maintenance and integrations. Company control can also create continuity risk if the commercial strategy changes. A public repository does not guarantee permanent maintenance.

An SDK can hide complexity, which is useful. It can also hide custody, network calls, telemetry, or proprietary dependencies. Developers should trace the SDK to its services and permissions.

### Data services and analytics

Data companies can provide transaction data, mempool observations, fee estimates, mining statistics, Lightning measurements, risk signals, price feeds, or address classifications.

Some data comes directly from a node. Other data is derived from multiple nodes, proprietary clustering, customer records, exchanges, public sources, or statistical models.

A data claim should identify:

- source systems;
- collection time;
- geographic or network coverage;
- transformation method;
- uncertainty;
- update frequency;
- correction policy;
- and whether labels are observed, reported, or inferred.

A proprietary address label is not a consensus fact. A network-hashrate chart is an estimate. A fee estimate is a prediction based on current data and policy. An address balance shown by an explorer can omit context about control or ownership.

Data services can be operationally important without becoming authoritative about the underlying network.

### Security and operational services

Infrastructure companies may provide monitoring, logging, intrusion detection, backups, key ceremonies, audits, penetration tests, incident response, recovery, compliance tooling, or managed operations.

These services are only as useful as their scope and integration. A monitoring platform may observe uptime but not detect incorrect transaction construction. A backup can exist but fail restoration. An audit can cover one version and environment. A security provider can itself become a privileged dependency.

Operational maturity includes:

- documented ownership of each system;
- least-privilege access;
- separation of production and development;
- change control;
- credential rotation;
- tested backup restoration;
- incident classification;
- communication procedures;
- third-party risk management; and
- a plan for provider exit.

Infrastructure reliability is not a single uptime percentage. A service may be reachable while returning stale or incomplete data. A Lightning node may be online while lacking useful liquidity. A node API may respond while the underlying node is behind the chain tip.

### Enterprise integration

Companies integrating Bitcoin into accounting, treasury, payments, mining, or security systems may need connectors to enterprise identity, approval, audit, reporting, and risk processes.

Infrastructure providers may translate between Bitcoin systems and:

- enterprise resource planning;
- accounting ledgers;
- payment orchestration;
- treasury approvals;
- hardware security modules;
- identity and access management;
- compliance systems;
- data warehouses; and
- customer-support tools.

The integration can improve control and reporting. It can also create a new source of error. An internal ledger may not match onchain balances. An approval system can delay urgent security action. A data pipeline can duplicate or omit transactions. A vendor can interpret confirmations or fees differently from another system.

Enterprise controls are company policies. They do not change Bitcoin’s protocol rules.

### Open-source software and hosted service are separate products

A company can publish software and sell hosting around it. The source code may allow independent deployment, while the hosted version adds management, databases, monitoring, support, or proprietary components.

Evaluation should separate:

1. What code is public?
2. Which license applies?
3. Can the released code reproduce the service?
4. Which configurations and patches are used in production?
5. Where is customer data stored?
6. Which operational controls are proprietary?
7. Can users export and migrate?
8. What happens when the company stops maintaining the project?

Self-hosting is not costless. It transfers responsibility for hardware, updates, monitoring, security, backups, and staffing to the operator. Hosted infrastructure is not automatically centralized control of Bitcoin. It centralizes a customer’s dependency on that provider.

### Infrastructure influence is real but bounded

Infrastructure companies can influence which tools are easy to use, which defaults spread, which data is visible, which integrations exist, and which failures affect many customers. A widely used API outage can disrupt wallets and businesses. A concentrated custody or cloud dependency can create correlated risk. A popular library can shape developer behavior.

That practical influence should be measured. It should not be converted into protocol authority.

An API cannot make an invalid block valid. An indexer cannot redefine ownership under consensus. An explorer cannot settle a transaction. A hosted node cannot force independently operated nodes to adopt its rules. A wallet backend cannot alter a block already rejected by validating nodes.

Companies can still affect users through access, policy, pricing, privacy, software defaults, and service availability. Those are important powers. Clear analysis names the power that exists rather than assigning a power that does not.

### How to evaluate an infrastructure company

Ask:

1. What exact function does the company provide?
2. Which products, operators, or workflows depend on it?
3. Is the product open-source software, a hosted service, proprietary infrastructure, or a combination?
4. Which node, indexer, database, implementation, hardware, or cloud system is underneath?
5. Who controls keys, credentials, configuration, updates, and data?
6. Which metadata can the provider observe?
7. What happens during an outage, reorganization, stale data event, or account suspension?
8. Can the customer self-host, export, migrate, or substitute another provider?
9. Which APIs or formats are standard and which are proprietary?
10. What is the backup and restoration boundary?
11. Which security claims are independently tested, and what scope was tested?
12. Which product features are deployed, limited, experimental, or proposed?
13. Does the company’s documentation describe current behavior, or only a roadmap?
14. Is a service output being confused with Bitcoin consensus?

Bitcoin infrastructure makes other systems possible. Its value often comes from reducing complexity. The same abstraction can hide dependencies. Trustworthy evaluation makes those dependencies visible.

## 3. Key Terms

- **Infrastructure:** Technical or operational system on which another product, service, or operator depends.
- **Hosted node:** Bitcoin or Lightning node operated on provider-controlled infrastructure for a customer.
- **Dedicated node:** Node instance assigned to one customer, though the underlying hardware or administration may still be provider-controlled.
- **Shared node:** Node service used by multiple customers or products.
- **API:** Defined interface through which software requests data or actions.
- **Indexer:** System that derives a query-optimized database from blockchain, mempool, or related data.
- **Explorer:** Human- or machine-facing interface presenting data from nodes, indexers, and other sources.
- **Wallet backend:** Infrastructure supplying synchronization, broadcasting, fee, notification, or coordination functions to a wallet product.
- **SDK:** Software development kit that packages interfaces and tools for integrating a system.
- **Vendor lock-in:** Dependence that makes migration costly because of proprietary APIs, data, operations, contracts, or technical design.
- **Operational dependency:** Reliance on a provider’s availability, security, policy, data, or support.
- **Consensus authority:** Power to determine Bitcoin’s valid rules; infrastructure usage does not grant unilateral consensus authority.

## 4. Sources

1. **Bitcoin Core Integration and Staging Tree** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin
   - Accessed: July 27, 2026
   - Supports: Full-node implementation, public development and release process, validation software, and the distinction between infrastructure services and independent consensus enforcement.
2. **Bitcoin Core 31.0.0 RPC Documentation** | Bitcoin Core contributors
   - URL: https://bitcoincore.org/en/doc/31.0.0/
   - Version: Bitcoin Core 31.0.0
   - Accessed: July 27, 2026
   - Supports: Versioned RPC commands and categories exported from Bitcoin Core 31.0.0. It does not establish which version, components, commands, permissions, or configuration a hosted provider exposes.
3. **Esplora Repository** | Blockstream and Esplora contributors
   - URL: https://github.com/Blockstream/esplora
   - Accessed: July 27, 2026
   - Supports: Current open-source blockchain explorer and frontend scope, self-hosting instructions, backend dependency, and licensing.
4. **Esplora HTTP API Documentation** | Blockstream and Esplora contributors
   - URL: https://github.com/Blockstream/esplora/blob/master/API.md
   - Accessed: July 27, 2026
   - Supports: Current derived-data API endpoints for blocks, transactions, addresses, UTXOs, mempool, and fees.
5. **mempool Repository** | mempool contributors
   - URL: https://github.com/mempool/mempool
   - Accessed: July 27, 2026
   - Supports: Current open-source explorer, mempool visualizer, API, self-hosting architecture, backend, database, and node dependencies.
6. **Lightning Network Daemon Repository** | Lightning Labs and lnd contributors
   - URL: https://github.com/lightningnetwork/lnd
   - Accessed: July 27, 2026
   - Supports: Current Lightning node implementation, APIs, operational documentation, database and backup considerations, tagged releases, beta warning, and security policy.
7. **Lightspark Documentation** | Lightspark
   - URL: https://docs.lightspark.com/
   - Accessed: July 27, 2026
   - Supports: Company-documented managed Lightning infrastructure, APIs, SDKs, payment functions, and enterprise integration scope; does not independently establish performance.
8. **Lightspark SDK Getting Started** | Lightspark
   - URL: https://docs.lightspark.com/lightspark-sdk/getting-started
   - Accessed: July 27, 2026
   - Supports: Current company-documented API authentication, SDK integration, and hosted-service dependency boundaries.
9. **Voltage Bitcoin Core FAQ** | Voltage
   - URL: https://docs.voltage.cloud/bitcoin-core-faq
   - Accessed: July 27, 2026
   - Supports: Company-documented Bitcoin Core hosting model, shared-node behavior for described configurations, supported implementation, and data boundaries.
10. **Voltage Bitcoin Core Developer Guide** | Voltage
    - URL: https://docs.voltage.cloud/bitcoin-core-developer-guide
    - Accessed: July 27, 2026
    - Supports: Company-documented RPC, ZMQ, authentication, and developer-access boundaries for managed Bitcoin Core infrastructure.
11. **Voltage Node Security and Backups** | Voltage
    - URL: https://docs.voltage.cloud/node-security-and-backups
    - Accessed: July 27, 2026
    - Supports: Company-documented responsibilities for managed node credentials, backups, recovery, and security; establishes provider claims rather than independent assurance or a tested restoration result.
12. **Hardware Wallet Interface Repository** | Bitcoin Core HWI contributors
    - URL: https://github.com/bitcoin-core/HWI
    - Accessed: July 27, 2026
    - Supports: Current open-source software interface between Bitcoin wallet software and supported hardware signing devices; does not certify the security of those devices.
13. **Stratum V2 Specifications** | Stratum Mining contributors
    - URL: https://github.com/stratum-mining/sv2-spec
    - Accessed: July 27, 2026
    - Supports: Current public specifications for mining infrastructure communication, role separation, channels, and job negotiation; does not establish universal deployment.
14. **LDK rust-lightning Repository** | Lightning Dev Kit contributors
    - URL: https://github.com/lightningdevkit/rust-lightning
    - Accessed: July 27, 2026
    - Supports: Modular open-source Lightning library code, component boundaries, licensing, repository tags and versioned package context, and the distinction between embedded software and hosted operations.

## 5. SEO title

What Bitcoin Infrastructure Companies Do

## 6. Meta description

Learn how Bitcoin infrastructure companies provide nodes, APIs, indexers, Lightning systems, mining tools, signing hardware, data, security, and integrations.

## 7. Page excerpt

Bitcoin infrastructure companies reduce technical complexity through nodes, APIs, data, Lightning, mining, signing, and operational systems while creating visible dependencies.

## 8. Estimated reading time

19 to 23 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-071 | How Bitcoin Mining Companies Operate
- Next: MSC-GUIDE-073 | How Bitcoin Exchanges Work
- Related: MSC-GUIDE-021 | What Is a Bitcoin Full Node?
- Related: MSC-GUIDE-023 | How to Run a Bitcoin Node
- Related: MSC-GUIDE-024 | Bitcoin Node Software Explained
- Related: MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?
- Related: MSC-GUIDE-033 | How the Lightning Network Works
- Related: MSC-GUIDE-041 | Bitcoin Developer Tools: A Practical Overview
- Related: MSC-GUIDE-049 | What Is Bitcoin Core?
- Related: MSC-GUIDE-063 | How Bitcoin Software Is Tested
- Related: MSC-GUIDE-064 | How to Run Reliable Bitcoin Infrastructure
- Related: MSC-GUIDE-065 | Who Builds on Bitcoin?
- Batch: MSC-GUIDE-069 | How Public Companies Participate in Bitcoin
- Batch: MSC-GUIDE-070 | How Bitcoin Startups Build and Compete
- Batch: MSC-GUIDE-071 | How Bitcoin Mining Companies Operate
- Upcoming: MSC-GUIDE-073 | How Bitcoin Exchanges Work
- Upcoming: MSC-GUIDE-074 | How Bitcoin Wallet Providers Operate
- Upcoming: MSC-GUIDE-075 | How Bitcoin Marketplaces Work
- Upcoming: MSC-GUIDE-076 | What Bitcoin Service Providers Do
- Return: MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem
- Primary path: MSC-PATH-ECOSYSTEM | Explore the Ecosystem
- Secondary path: MSC-PATH-BUILD | Build on Bitcoin

## 10. Accuracy review checklist

- [x] Current infrastructure products, repositories, APIs, hosting models, and technical claims are dated July 27, 2026 or tied to a dated primary record.
- [x] Infrastructure is defined by function and dependency rather than company reputation or public visibility.
- [x] Open-source software, hosted services, proprietary systems, and company-operated infrastructure remain distinct.
- [x] Node hosting, APIs, indexers, explorers, wallet backends, Lightning, mining, signing, data, security, and enterprise integration functions are separated.
- [x] Custodial and self-custodial control remain distinct even when a service is described as infrastructure.
- [x] Hosted infrastructure dependencies include privacy, availability, policy, billing, jurisdiction, recovery, and vendor exit.
- [x] APIs, indexers, explorers, wallet backends, and hosted nodes are not presented as independent consensus authorities.
- [x] Company documentation is identified as provider disclosure rather than independent proof of reliability or security.
- [x] Deployed, limited, experimental, proposed, and roadmap features are not treated as interchangeable.
- [x] Security claims are bounded by version, scope, environment, test, and operational responsibility.
- [x] Commercial incentives, concentration, switching costs, and conflicts are addressed.
- [x] The guide does not take over the planned scope of Guides 073–076 on exchanges, wallet providers, marketplaces, and service providers.
- [x] Named companies and projects are examples, not endorsements or rankings.
- [x] Planned internal links remain inactive.
- [x] Human Verification is complete for the specialist pass.
- [x] Publication-time renewal is required for products, repositories, versions, APIs, custody, pricing, regions, security claims, and operational terms.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: July 27, 2026
- Primary evidence reviewed: Bitcoin Core’s repository, Bitcoin Core 31.0 release materials, and versioned 31.0.0 RPC documentation; Esplora and its HTTP API documentation; the mempool open-source repository; lnd, including its current tagged release and beta warning; Lightspark documentation and SDK materials; Voltage Bitcoin Core, developer-access, node-security, and backup documentation; Bitcoin Core HWI; Stratum V2 specifications and current repository maturity; and LDK/rust-lightning.
- Verification approach: Distinguished open-source implementation code, versioned documentation, hosted products, proprietary operational systems, and provider-operated services. Checked node, RPC, ZMQ, API, indexer, explorer, wallet-backend, Lightning, mining, signing, backup, credential, and recovery roles by technical function and control boundary. Provider documentation was treated as the provider’s stated behavior rather than independent assurance; shared and dedicated service labels were not treated as customer ownership or administration; and local node policy, mempool observations, derived data, and company access controls were kept separate from Bitcoin consensus.
- Material corrections made: Replaced the unversioned third-party Bitcoin RPC reference with the current Bitcoin Core 31.0.0 exported RPC documentation and added an explicit deployed-version boundary; corrected the Esplora article and source description to distinguish its browser interface from the esplora-electrs HTTP backend it uses; narrowed rust-lightning version claims to repository tags and versioned package context; bounded Stratum V2 implementation maturity; and completed the Human Verification record.
- Remaining sensitivities: Production software versions, patches, configurations, credentials, logging, telemetry, data retention, service regions, pricing, service levels, backup scope, restoration testing, key and seed control, metadata visibility, account suspension, proprietary components, and export paths may differ from public documentation or change without preserving earlier behavior. Repository availability does not establish hosted-service performance; audits and security statements remain version-, environment-, scope-, and date-specific; and provider concentration can create correlated privacy, availability, policy, jurisdiction, and migration risk.
- Renewal requirement: Immediately before publication, recheck Bitcoin Core’s latest supported release and matching RPC documentation; Esplora, mempool, lnd, HWI, Stratum V2, and LDK repositories, tags, licenses, security policies, and maturity labels; Lightspark and Voltage product documentation, supported versions, regions, pricing, authentication, shared or dedicated node behavior, credentials, backups, recovery, and export procedures; current API and ZMQ behavior; any deployed, beta, experimental, limited, proposed, or roadmap labels; and every security, privacy, reliability, or migration claim against the exact current product and environment.
- Authorization boundary: Completed Human Verification does not authorize Editorial Manager acceptance, copy-lock, ready-for-review transition, merge, publication, deployment, illustration generation, activation of planned links, or Phase 20.

## 12. Illustration brief

### Illustration 1

- Concept title: The Bitcoin Infrastructure Nautical Grid
- Educational purpose: Define infrastructure by the functions other systems depend on.
- Recommended placement: After Define infrastructure by the dependency it creates.
- Visual description: Vintage nautical network map with functional stations for Full Nodes, Hosted Nodes, APIs, Indexers, Explorers, Lightning, Mining Systems, Signing Hardware, Developer Tools, Data, Security, and Enterprise Integration. Lines connect these stations to downstream wallets, merchants, miners, and businesses, while Bitcoin consensus remains a separate open sea validated by independent nodes.
- Required labels: Full node, Hosted node, API, Indexer, Explorer, Lightning, Mining systems, Signing hardware, Developer tools, Data, Security, Enterprise integration, Wallets, Merchants, Miners, Businesses, Bitcoin consensus
- Caption: Infrastructure is defined by the technical function and dependency it creates, not by a company’s reputation.
- Alt text: Nautical network map connecting Bitcoin infrastructure functions to dependent products and operators while keeping consensus separate.
- Image orientation: Landscape
- Mobile crop notes: Arrange infrastructure in a central vertical spine with downstream users on the sides and consensus below.
- Status: PLANNED

### Illustration 2

- Concept title: Hosted Node Control Boundary
- Educational purpose: Show the operational convenience and control tradeoffs of hosted Bitcoin infrastructure.
- Recommended placement: After Node hosting and management.
- Visual description: Split harbor control room. The customer side shows application, credentials, RPC requests, and monitoring. The provider side shows server, node software, network, storage, updates, backups, and account policy. A boundary ledger marks which party controls each function and which metadata crosses the line.
- Required labels: Customer application, Credentials, RPC, Provider server, Bitcoin Core, Network, Storage, Updates, Backups, Monitoring, Metadata, Account policy, Export, Recovery, Shared or dedicated
- Caption: Hosted nodes can reduce operational work while placing hardware, software, metadata, and availability inside a provider-controlled boundary.
- Alt text: Split control-room diagram showing customer and provider responsibilities in a hosted Bitcoin node service.
- Image orientation: Landscape
- Mobile crop notes: Stack customer above provider and preserve the responsibility ledger between them.
- Status: PLANNED

### Illustration 3

- Concept title: Derived Data Lighthouse
- Educational purpose: Explain why APIs, indexers, and explorers are useful views rather than independent consensus authorities.
- Recommended placement: After Indexers and explorers create derived views.
- Visual description: A lighthouse receives signals from a Bitcoin node, builds an indexed chart room, and projects an explorer or API beam toward applications. Warning markers identify stale data, configuration, mempool policy, timing, and provider outage. The underlying validated chain remains below the lighthouse rather than being created by it.
- Required labels: Bitcoin node, Validated blocks, Local mempool, Indexer, Database, API, Explorer, Application, Stale data, Configuration, Policy, Timing, Outage, Derived view, Not consensus authority
- Caption: Explorers and APIs organize a node’s data; they do not create the underlying consensus record.
- Alt text: Lighthouse diagram showing node data flowing through an indexer and database into an API and explorer, with warnings for derived-data failures.
- Image orientation: Portrait
- Mobile crop notes: Use a vertical flow from node to indexer to API beam and keep the warning markers along one side.
- Status: PLANNED
