---
registry_id: MSC-GUIDE-076
status: ACCURACY_REVIEW
page_role: topic-guide
h1: What Bitcoin Service Providers Do
handle: bitcoin-service-providers
category: Bitcoin Ecosystem
subcategory: Markets
depth: Surface
format: Ecosystem Overview
primary_path: Explore the Ecosystem
secondary_paths:
  - Start With Bitcoin
author_display: Mempool Surf Club Editorial
reviewed_date: 2026-07-31
copy_locked_date: TBD
---

# What Bitcoin Service Providers Do

## 1. Introductory deck

Bitcoin service providers supply software, payment processing, infrastructure, custody, conversion, data, liquidity, compliance, support, or other operational functions. The category is broad, and the label alone does not reveal who controls funds, which systems are outsourced, or what information the provider can observe.

A useful evaluation begins with the service boundary: what function is being supplied, which authority and credentials the provider receives, what the customer can verify independently, and how operations continue if the service becomes unavailable.

## 2. Full article

A Bitcoin service provider supplies software, infrastructure, payment processing, custody, conversion, liquidity, data, compliance, support, or another operational function around Bitcoin. The label is broad. It does not reveal whether the provider controls funds, validates Bitcoin independently, operates a Lightning node, transmits money, stores personal data, or merely sells software.

A useful service map is:

`user or business → application → service provider → Bitcoin or Lightning → banking, commerce, or reporting systems`

A provider may occupy one box or several. The important questions are what job it performs, what authority it receives, what information it observes, which systems it depends on, and what happens if the service stops.

### Service provider is a functional description

Bitcoin’s consensus rules define valid blocks and transactions. They do not create a registry of approved service providers or guarantee a company’s uptime, solvency, security, pricing, support, or legal compliance.

“Service provider” is therefore a functional description rather than one technical or legal category. An exchange organizes trades or conversion. A wallet provider supplies wallet-related software or services. A marketplace connects counterparties around offers or listings. A broader service provider might process merchant payments, host nodes, provide APIs, manage Lightning liquidity, produce accounting records, monitor compliance, secure keys, or help deploy infrastructure.

One company can perform several of these roles. Evaluation must follow the actual activity rather than the company’s name or marketing category.

### The main service categories

Payment services help a business or application request, detect, reconcile, convert, refund, or pay out Bitcoin and Lightning payments. A payment gateway may create invoices, calculate a temporary exchange rate, monitor payment status, send webhooks, and connect the result to an order or accounting system.

Infrastructure services operate technical components such as Bitcoin nodes, Lightning nodes, indexers, databases, APIs, monitoring systems, backups, and network connectivity. They reduce deployment and maintenance work but create dependencies on the provider’s platform, access controls, incident response, and continuity.

Financial services may hold funds, convert between bitcoin and national currencies, execute withdrawals, manage settlement accounts, or provide liquidity. These activities can introduce custody, counterparty, banking, licensing, and solvency risks that do not exist in a software-only product.

Operational services include security reviews, accounting, tax reporting, compliance tooling, customer support, managed deployments, and incident response. These services may never touch private keys while still receiving sensitive business, transaction, identity, or infrastructure data.

### Software-only, managed infrastructure, and hosted processing

The same user-facing function can be delivered through different operating models.

In a software-only or self-hosted model, the user runs the software and controls the connected wallets, nodes, databases, credentials, and backups. This can reduce provider authority and data exposure, but it transfers maintenance, monitoring, patching, recovery, and configuration responsibilities to the operator.

BTCPay Server documents a self-hosted payment gateway built from several components, including BTCPay Server, NBXplorer, Bitcoin Core, and PostgreSQL, with optional Lightning implementations. Its documentation also recognizes third-party hosting. The same software can therefore be operated directly or delivered as a managed service, with different infrastructure and continuity assumptions.

In a managed-infrastructure model, a provider runs some of the technical stack while the customer retains defined credentials or signing authority. As of July 31, 2026, Voltage documents hosted LND nodes with access through the full LND API, macaroons, and TLS credentials. Its recovery documentation also explains that external recovery requires the relevant seed and a compatible LND deployment. Hosted access can provide substantial node control without eliminating provider availability, backup, authentication, and recovery dependencies.

In a hosted-processing model, the provider exposes an account or API that combines several functions. OpenNode’s current developer portal includes charges, account balances, withdrawals, exchanges, rates, refunds, and bank-withdrawal settings. Strike’s current API documentation describes receiving and sending through Bitcoin or Lightning, currency conversion, account settlement, and eligible bank payouts. Lightspark documents APIs and SDKs that manage Lightning operational complexity and payment routing. These are provider descriptions of current services, not independent proof of availability, security, cost, legal status, or suitability.

### Authority and custody must be mapped directly

A provider can influence a payment without controlling the funds. It may generate an invoice, observe a transaction, estimate a fee, operate an indexer, route a Lightning payment, or notify a merchant while the user keeps the relevant private keys.

Custody begins when the provider controls the signing authority or account mechanism required to move the applicable funds. A provider may also control only one part of a threshold arrangement, hold funds temporarily, or control a national-currency balance while the customer controls a separate Bitcoin wallet.

API access can itself carry authority. A credential may be read-only, create invoices, initiate payments, withdraw funds, manage a node, or change account settings. “Noncustodial” does not mean that every API token, server, webhook, database, or administrator account is low risk. Permissions, key storage, withdrawal rules, approval workflows, and recovery paths must be inspected separately.

### Payment processing is more than receiving a transaction

A Bitcoin payment workflow can include:

`price → invoice or address → payment detection → confirmation policy → order update → reconciliation → refund or payout`

The Bitcoin transaction is one event in that sequence. A provider may calculate a fiat-to-bitcoin quote, reserve that rate temporarily, identify underpayments or overpayments, wait for a selected confirmation threshold, convert proceeds, and send a webhook to another system.

The Bitcoin developer documentation distinguishes address creation, transaction detection, confirmations, and refunds. Provider APIs add application states such as unpaid, pending, paid, completed, failed, expired, or reversed. Those labels are provider records. They should be mapped to the underlying on-chain transaction, Lightning payment, account movement, or bank payout rather than treated as Bitcoin consensus states.

Lightning also adds liquidity, routing, invoice expiry, and node-availability considerations. A provider may improve payment reliability by managing channels or routing, but it cannot guarantee that every route, wallet, peer, or downstream system will remain available.

### Data, validation, and privacy

A service can return accurate-looking balances or payment statuses without giving the customer independent validation. A hosted node or indexer may supply blockchain-derived data, while a customer-operated full node validates blocks and transactions according to the rules it enforces.

The provider may observe IP addresses, account identities, invoices, addresses, transaction amounts, timing, counterparties, payment metadata, API calls, device details, bank information, customer records, and support communications. A provider that cannot spend bitcoin may still learn commercially or personally sensitive information.

Data retention, sharing, deletion, export, and breach-notification terms therefore matter. Privacy claims should identify which data is reduced, what still leaves the customer’s control, and whether third-party subprocessors receive it.

### Reliability, security, and continuity

Managed services can provide monitoring, redundancy, expertise, and support that an individual operator may not maintain alone. They also concentrate dependencies. A failure can affect API access, invoice creation, payment detection, liquidity, withdrawals, conversion, customer support, or historical records.

A useful continuity review asks what can be exported: wallet backups, seeds, descriptors, channel backups, invoices, transaction records, accounting data, customer records, API configuration, and audit logs. It should also identify how credentials are rotated, how incidents are communicated, and whether another provider or self-hosted system can replace the service.

Security evidence must be read by scope. Architecture documents describe intended design. Source code enables inspection. Penetration tests, audits, certifications, and control reports cover defined systems and periods. Status pages show reported availability. None alone proves that funds, data, integrations, employees, or subprocessors cannot fail.

NIST’s Cybersecurity Framework 2.0 explicitly includes supplier and service-provider risk. The U.S. Federal Trade Commission advises businesses to put security requirements in vendor contracts, limit access, verify compliance, and require incident handling rather than relying on promises alone.

### Pricing and provider incentives

Service costs can include subscriptions, usage charges, payment percentages, spreads, conversion fees, withdrawal fees, network fees, routing fees, liquidity costs, support plans, storage, and professional services. A “zero processing fee” claim may still leave network, infrastructure, maintenance, support, or conversion costs.

The provider’s incentives depend on what it sells. A software project may seek hosting revenue or donations. A processor may earn payment or conversion fees. An infrastructure provider may charge for compute, storage, liquidity, or support. A custodian may benefit from assets held on the platform. These incentives do not automatically make a service harmful, but they affect product design, default settings, lock-in, and which risks the provider absorbs or transfers to the customer.

### Legal and tax boundaries

Legal obligations depend on the activity, entity, customer, jurisdiction, and flow of value. In the United States, FinCEN applies a facts-and-circumstances analysis. Its guidance distinguishes activities such as software provision from accepting and transmitting value for others; labels do not control the result.

In the European Union, MiCA defines and regulates specified crypto-asset services, including custody, exchange, transfer, advice, and trading-platform activities within scope. A web host, software developer, merchant tool, payment intermediary, and custodian are not automatically the same legal category.

Tax treatment also remains separate from the service architecture. The U.S. Internal Revenue Service treats digital assets as property for federal tax purposes and identifies payments for goods or services as potentially reportable transactions. A provider’s receipt, dashboard, or export can assist recordkeeping without determining the final tax treatment. This guide is general education, not legal or tax advice.

A practical service-provider evaluation asks:

1. **Function:** What exact service is being supplied?
2. **Authority:** Which keys, funds, accounts, credentials, and settings can the provider control?
3. **Validation:** Which data comes from the provider, and what can the customer verify independently?
4. **Dependencies:** Which nodes, banks, APIs, subprocessors, liquidity sources, and software components are required?
5. **Privacy:** What business, customer, payment, identity, and network data is collected or shared?
6. **Recovery:** What can be exported, restored, or migrated if the service becomes unavailable?
7. **Security:** What controls and evidence apply to the exact system and time period?
8. **Cost:** Which subscription, usage, spread, network, routing, withdrawal, and support costs apply?
9. **Legal scope:** Which entity, terms, jurisdiction, and regulated activities govern the relationship?

The goal is not to identify a universally best provider. It is to define the service boundary clearly enough to understand what is being outsourced, what authority remains, and how the system behaves when a component fails.

## 3. Key Terms

* **Bitcoin service provider:** A company, project, or professional that supplies software, infrastructure, payment, custody, data, liquidity, compliance, support, or another operational function related to Bitcoin.
* **Payment gateway:** Software or a service that creates payment requests, detects payments, updates order state, and connects payment events to a merchant or application.
* **Payment processor:** A provider that performs one or more payment functions such as invoicing, conversion, settlement, reconciliation, refunds, or payouts.
* **Managed infrastructure:** Nodes, databases, APIs, monitoring, networking, or related systems operated by a provider for a customer.
* **Hosted service:** Software or infrastructure run in a provider-controlled environment and accessed through an account, interface, or API.
* **Self-hosted:** Software operated by the user or organization on infrastructure it controls or administers.
* **Custody:** Control or administration of the signing authority or account mechanism required to move another party’s funds.
* **API:** A defined software interface through which one system requests data or actions from another.
* **API credential:** A secret or signed authorization used to authenticate software and grant defined permissions.
* **Webhook:** An automated message sent from one system to another when a defined event occurs.
* **Indexer:** A system that organizes blockchain-derived information for efficient lookup by wallets, payment systems, explorers, and applications.
* **Liquidity:** Funds and channel capacity available to complete conversions, withdrawals, or routed payments.
* **Settlement:** Completion of the transfer used to satisfy a payment or financial obligation.
* **Reconciliation:** Matching payment, order, invoice, account, fee, and payout records so that systems agree.
* **Subprocessor:** A third party used by a provider to process data or perform part of the service.
* **Service-level agreement:** Contractual terms describing defined availability, support, response, or performance commitments.
* **Vendor lock-in:** Difficulty or cost involved in moving data, credentials, infrastructure, or operations away from a provider.
* **Recovery path:** The information, authority, backups, procedures, and replacement systems required to restore or migrate a service.
* **Security evidence:** Documentation or assessment with a defined scope, such as architecture records, audits, tests, certifications, control reports, or incident history.
* **Operational dependency:** A system, provider, credential, employee, bank, network, or process that must remain available for the service to function.

## 4. Sources

1. **Payment Processing** | Bitcoin developer documentation

   * URL: [https://developer.bitcoin.org/devguide/payment_processing.html](https://developer.bitcoin.org/devguide/payment_processing.html)
   * Published or updated: Not displayed
   * Accessed: July 31, 2026
   * Supports: The separation of price calculation, payment requests, address assignment, transaction detection, confirmation policy, refunds, and merchant order handling.
   * Limitation: The page contains some legacy payment-protocol material; this guide uses it only for general Bitcoin payment-processing concepts.

2. **Transactions** | Bitcoin developer documentation

   * URL: [https://developer.bitcoin.org/devguide/transactions.html](https://developer.bitcoin.org/devguide/transactions.html)
   * Published or updated: Not displayed
   * Accessed: July 31, 2026
   * Supports: Bitcoin transaction inputs, outputs, signatures, confirmation, and the limits of what a Bitcoin transaction establishes.
   * Limitation: It does not describe provider account states, bank payouts, contractual performance, or every current wallet and node implementation.

3. **BTCPay Server Documentation** | BTCPay Server

   * URL: [https://docs.btcpayserver.org/Guide/](https://docs.btcpayserver.org/Guide/)
   * Published or updated: Current documentation accessed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: BTCPay Server’s documented self-hosted, noncustodial payment-gateway model, invoice workflow, wallet control, refunds, and Lightning support.
   * Limitation: Project documentation; this review did not independently audit every release, deployment, plugin, or host.

4. **Architecture** | BTCPay Server

   * URL: [https://docs.btcpayserver.org/Development/](https://docs.btcpayserver.org/Development/)
   * Published or updated: Current documentation accessed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: The documented BTCPay Server architecture using BTCPay Server, NBXplorer, Bitcoin Core, PostgreSQL, and optional Lightning implementations.
   * Limitation: Describes intended architecture and deployment components, not the security or availability of every installation.

5. **Choosing a Deployment Method** | BTCPay Server

   * URL: [https://docs.btcpayserver.org/Deployment/](https://docs.btcpayserver.org/Deployment/)
   * Published or updated: Current documentation accessed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: The distinction between self-hosted and third-party-hosted BTCPay deployments and the transfer of maintenance responsibilities between operating models.
   * Limitation: The project’s description of its own deployment options; third-party hosting terms and practices must be reviewed separately.

6. **OpenNode Docs Portal** | OpenNode

   * URL: [https://developers.opennode.com/](https://developers.opennode.com/)
   * Published or updated: Current portal accessed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: The current API surface for charges, balances, withdrawals, exchanges, rates, refunds, static addresses, and bank-withdrawal settings.
   * Limitation: Provider documentation and endpoint inventory; this review did not test production availability, custody controls, pricing, or every regional restriction.

7. **Getting Started Overview** | OpenNode

   * URL: [https://developers.opennode.com/docs/getting-started](https://developers.opennode.com/docs/getting-started)
   * Published or updated: Current documentation accessed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: OpenNode’s documented REST API, Lightning and on-chain operations, events, authentication, and development environment.
   * Limitation: Provider documentation; exact supported functions and account requirements can change.

8. **Introduction** | Strike API documentation

   * URL: [https://docs.strike.me/](https://docs.strike.me/)
   * Published or updated: Current documentation accessed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: Strike’s documented API functions involving Bitcoin, Lightning, cash balances, conversion, receiving, sending, directing, and eligible bank payouts.
   * Limitation: Provider claims about current services and performance; regional, account, eligibility, compliance, and product restrictions apply.

9. **Receiving Payments** | Strike API documentation

   * URL: [https://docs.strike.me/walkthrough/receiving-payments/](https://docs.strike.me/walkthrough/receiving-payments/)
   * Published or updated: Current documentation accessed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: Invoice and receive-request states, quote expiration, Lightning and on-chain receiving, settlement-currency choices, and webhook-driven order updates.
   * Limitation: Provider-specific workflow; invoice and account states are not Bitcoin consensus states.

10. **Sending Payments** | Strike API documentation

   * URL: [https://docs.strike.me/walkthrough/sending-payments/](https://docs.strike.me/walkthrough/sending-payments/)
   * Published or updated: Current documentation accessed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: The use of payment quotes, source currencies, Bitcoin addresses, Lightning invoices, and API-controlled payment initiation.
   * Limitation: Applies to supported Strike accounts and current API behavior; this review did not execute a payment.

11. **Voltage API** | Voltage documentation

   * URL: [https://docs.voltage.cloud/voltage-api](https://docs.voltage.cloud/voltage-api)
   * Published or updated: Current documentation accessed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: Programmatic creation, configuration, starting, stopping, and administration of hosted Lightning nodes.
   * Limitation: Provider documentation; it does not independently establish availability, security, custody, or recovery quality.

12. **LND Node API** | Voltage documentation

   * URL: [https://docs.voltage.cloud/lnd-node-api](https://docs.voltage.cloud/lnd-node-api)
   * Published or updated: Current documentation accessed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: Voltage’s documented exposure of the full LND API through gRPC and REST and the use of macaroons and TLS credentials.
   * Limitation: API access and credentials do not eliminate infrastructure, authentication, backup, liquidity, or provider-continuity dependencies.

13. **Node Security and Backups** | Voltage documentation

   * URL: [https://docs.voltage.cloud/node-security-and-backups](https://docs.voltage.cloud/node-security-and-backups)
   * Published or updated: Current documentation accessed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: The documented importance of seeds, backups, credentials, and compatible LND recovery outside the hosted environment.
   * Limitation: Provider documentation; this review did not perform a full external recovery or test every channel state.

14. **Getting Started** | Lightspark documentation

   * URL: [https://docs.lightspark.com/lightspark-sdk/getting-started](https://docs.lightspark.com/lightspark-sdk/getting-started)
   * Published or updated: Current documentation accessed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: Lightspark’s documented API and SDK model for managing Lightning operational complexity and payment routing.
   * Limitation: Provider description; product architecture, custody, pricing, supported regions, and operational behavior require exact current review.

15. **The NIST Cybersecurity Framework 2.0** | National Institute of Standards and Technology

   * URL: [https://www.nist.gov/publications/nist-cybersecurity-framework-csf-20](https://www.nist.gov/publications/nist-cybersecurity-framework-csf-20)
   * Published or updated: February 26, 2024
   * Accessed: July 31, 2026
   * Supports: A general framework for governing, identifying, protecting against, detecting, responding to, and recovering from cybersecurity risk.
   * Limitation: Voluntary, high-level guidance; it does not certify a provider or prescribe a complete Bitcoin-specific control set.

16. **Cybersecurity Framework Frequently Asked Questions** | National Institute of Standards and Technology

   * URL: [https://www.nist.gov/cyberframework/faqs](https://www.nist.gov/cyberframework/faqs)
   * Published or updated: Current page accessed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: Applying CSF outcomes to externally operated assets and using the framework to evaluate suppliers and service providers.
   * Limitation: General risk-management guidance and not a provider audit or endorsement.

17. **Cybersecurity for Small Business — Vendor Security** | U.S. Federal Trade Commission

   * URL: [https://www.ftc.gov/business-guidance/small-businesses/cybersecurity](https://www.ftc.gov/business-guidance/small-businesses/cybersecurity)
   * Published or updated: Current page accessed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: Contractual security requirements, access limitation, vendor-compliance verification, encryption, incident response, and breach handling.
   * Limitation: General U.S. business guidance and not Bitcoin-specific legal advice.

18. **Application of FinCEN’s Regulations to Certain Business Models Involving Convertible Virtual Currencies** | Financial Crimes Enforcement Network

   * URL: [https://www.fincen.gov/resources/statutes-regulations/guidance/application-fincens-regulations-certain-business-models](https://www.fincen.gov/resources/statutes-regulations/guidance/application-fincens-regulations-certain-business-models)
   * Published or updated: May 9, 2019
   * Accessed: July 31, 2026
   * Supports: The United States facts-and-circumstances analysis for activities involving convertible virtual currency and money transmission.
   * Limitation: U.S. federal guidance; classification depends on actual facts, and other federal and state requirements may apply.

19. **Application of FinCEN’s Regulations to Virtual Currency Software Development and Certain Investment Activity** | Financial Crimes Enforcement Network

   * URL: [https://www.fincen.gov/resources/statutes-regulations/administrative-rulings/application-fincens-regulations-virtual](https://www.fincen.gov/resources/statutes-regulations/administrative-rulings/application-fincens-regulations-virtual)
   * Published or updated: January 30, 2014
   * Accessed: July 31, 2026
   * Supports: The distinction between software provision and activities that accept, transmit, or exchange value for others under the stated facts.
   * Limitation: A fact-specific administrative ruling; it is not a universal exemption for software companies or service providers.

20. **Regulation (EU) 2023/1114 on Markets in Crypto-assets** | Official Journal of the European Union

   * URL: [https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023R1114](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023R1114)
   * Published or updated: June 9, 2023; current consolidated status reviewed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: Defined crypto-asset services and operating requirements for providers within MiCA’s scope, including custody, exchange, transfer, advice, and trading-platform activities.
   * Limitation: EU law; classification and obligations depend on the entity, activity, authorization, transition rules, and current consolidated text.

21. **Digital Assets** | U.S. Internal Revenue Service

   * URL: [https://www.irs.gov/filing/digital-assets](https://www.irs.gov/filing/digital-assets)
   * Published or updated: Current page accessed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: U.S. federal treatment of digital assets as property and reporting considerations for receiving or disposing of digital assets in transactions.
   * Limitation: U.S. federal tax information only; it does not determine the treatment of every business, transaction, state, or jurisdiction.

## 5. SEO title

What Bitcoin Service Providers Do | Mempool Surf Club

## 6. Meta description

Learn how Bitcoin service providers handle payments, infrastructure, custody, APIs, data, support, security, fees, compliance, and continuity.

## 7. Excerpt

Bitcoin service providers can simplify payments, infrastructure, data, custody, conversion, and support. This guide maps what is outsourced, what authority remains, and how to evaluate failure and recovery.

## 8. Reading time

Approximately 9 minutes for the Full Article.

## 9. Planned internal links

Do not activate planned links until each destination exists as a real published page.

* Previous guide: `MSC-GUIDE-075 | How Bitcoin Marketplaces Work`
* Next guide: `MSC-GUIDE-077 | Why Bitcoin Conferences Matter`
* Return destination: `MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem`
* Primary learning path: `MSC-PATH-ECOSYSTEM | Explore the Ecosystem`
* Secondary learning path: `MSC-PATH-START | Start With Bitcoin`
* Prerequisite: `MSC-GUIDE-001 | What Is Bitcoin?`
* Recommended branch guide: `MSC-GUIDE-073 | How Bitcoin Exchanges Work`
* Related guide: `MSC-GUIDE-007 | How to Send and Receive Bitcoin`
* Related guide: `MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work`
* Related guide: `MSC-GUIDE-012 | How Bitcoin Privacy Works`
* Related guide: `MSC-GUIDE-021 | What Is a Bitcoin Full Node?`
* Related guide: `MSC-GUIDE-033 | How the Lightning Network Works`
* Related guide: `MSC-GUIDE-042 | How Bitcoin Wallet Integrations Work`
* Related guide: `MSC-GUIDE-043 | Bitcoin APIs Explained`
* Related guide: `MSC-GUIDE-044 | How Bitcoin Indexers Work`
* Related guide: `MSC-GUIDE-064 | How to Run Reliable Bitcoin Infrastructure`
* Related guide: `MSC-GUIDE-072 | What Bitcoin Infrastructure Companies Do`
* Related guide: `MSC-GUIDE-074 | How Bitcoin Wallet Providers Operate`
* Related glossary terms: `Service provider`; `Payment`; `API`; `Custody`; `Liquidity`; `Settlement`; `Operational dependency`
* Future Tools connection: A service-provider boundary evaluator, activated only after a real destination exists.

## 10. Accuracy review checklist

* [x] Registry metadata and YAML match the canonical Guide 076 record.
* [x] Approved H1 and handle remain unchanged.
* [x] Article stays within Guide 076 and Surface depth.
* [x] Content format remains `Ecosystem Overview`.
* [x] The guide is organized by service function rather than as a vendor directory.
* [x] Service provider is not presented as a Bitcoin consensus or universal legal category.
* [x] Exchanges, wallet providers, marketplaces, merchants, processors, custodians, and infrastructure providers remain distinct.
* [x] Software-only, self-hosted, managed-infrastructure, hosted-processing, and financial-intermediary models remain distinct.
* [x] Provider influence over payments is not equated automatically with custody.
* [x] Custody is tied to actual signing or account authority.
* [x] API credentials are treated according to permissions and not assumed harmless.
* [x] Bitcoin transaction states remain separate from provider invoice, account, webhook, conversion, and payout states.
* [x] On-chain, Lightning, internal-account, and bank movements remain distinct.
* [x] Full-node validation remains distinct from hosted node, indexer, and API data.
* [x] Lightning liquidity, routing, invoice expiry, and node availability are stated as operational considerations.
* [x] Provider-specific examples are dated, attributed, and limited.
* [x] BTCPay self-hosted software and third-party hosting are not treated as the same operating model.
* [x] Hosted LND access is not presented as eliminating backup, authentication, liquidity, or provider dependencies.
* [x] OpenNode, Strike, Voltage, and Lightspark references are descriptive rather than endorsements.
* [x] Privacy analysis includes account, API, payment, banking, customer, network, support, and subprocessor data.
* [x] Security evidence is described by scope and is not treated as proof of zero risk.
* [x] Continuity includes export, backups, credential rotation, incident communication, replacement, and migration.
* [x] Fees include subscription, usage, spread, conversion, withdrawal, network, routing, liquidity, storage, and support components where applicable.
* [x] Provider incentives are explained without implying that any revenue model is automatically harmful.
* [x] Legal statements identify jurisdiction and remain activity- and facts-dependent.
* [x] Tax statements remain jurisdiction-specific and educational.
* [x] No provider is ranked, recommended, endorsed, or assigned a security score.
* [x] No active internal link, public URL, publication state, or Tools destination is invented.
* [x] Exactly three illustration briefs are complete and remain `PLANNED`.
* [x] Human Verification is complete.
* [x] Full Article word count and reading-time estimate meet the registry range.
* [x] Every mutable provider, protocol, legal, security-guidance, and tax claim was renewed during Accuracy Review.
* [x] Accuracy Review is approved.
* [ ] Copy Lock is approved.
* [ ] Publication-time source renewal is complete.

## 11. Human verification

* Reviewer: Mempool Surf Club Accuracy Review
* Review date: July 31, 2026
* Primary evidence reviewed: Current `main`; the complete canonical Guide 076 master-registry and content-manifest records; the current Learn guide structure and copy-locked Guides 073 through 075; Bitcoin developer payment-processing and transaction documentation; current BTCPay Server architecture and deployment documentation; current OpenNode, Strike, Voltage, and Lightspark developer documentation; NIST Cybersecurity Framework 2.0 and service-provider guidance; U.S. Federal Trade Commission vendor-security guidance; FinCEN’s 2019 convertible-virtual-currency business-model guidance and software-development ruling; Regulation (EU) 2023/1114; and current U.S. Internal Revenue Service digital-asset guidance.
* Verification method: Reopened each material source directly on July 31, 2026; matched claims to the exact provider function, operating model, custody boundary, credential authority, payment state, validation source, privacy exposure, recovery path, jurisdiction, and evidentiary scope; distinguished Bitcoin protocol rules from provider software, account records, application states, contractual promises, security frameworks, and legal classifications; and preserved limitations where independent testing was not performed.
* Verification limits: This review did not create provider accounts, execute live payments or payouts, test production APIs, reproduce software builds, audit source code, inspect private infrastructure, validate provider reserves, recover a hosted Lightning node, verify every subprocessor, negotiate a service contract, or provide legal or tax advice. Mutable provider, product, fee, regional, legal, security, and tax claims must be renewed at publication.

## 12. Illustration briefs

### Illustration 1 — Bitcoin service-provider systems map

* Placement: After the opening service map in the Full Article.
* Visual description: A vintage nautical-chart systems diagram showing a user or business application connected to separate provider functions for payments, infrastructure, data, custody, conversion, compliance, and support. The Bitcoin and Lightning networks appear as distinct underlying systems, with banking, commerce, and reporting systems on a separate shore.
* Required labels: User or business; application; payment service; hosted node; API or indexer; custody or account; conversion; compliance; support; Bitcoin network; Lightning Network; bank; commerce system; reporting system.
* Caption: A service provider can operate one part of the stack or combine several roles, each with different authority and dependencies.
* Alt text: Systems map separating Bitcoin service-provider functions, Bitcoin and Lightning networks, and external banking, commerce, and reporting systems.
* Image orientation: Landscape
* Mobile crop notes: Preserve every provider-function box and both network layers; stack the service categories vertically on mobile.
* Status: PLANNED

### Illustration 2 — Operating-model and authority spectrum

* Placement: In “Software-only, managed infrastructure, and hosted processing.”
* Visual description: A vintage technical comparison plate with three columns: self-hosted software, managed infrastructure, and hosted processing or financial service. Each column shows who operates the server, who holds credentials, who controls signing or accounts, what data the provider observes, and who owns backups and recovery.
* Required labels: Self-hosted; managed infrastructure; hosted processing; server operator; wallet keys; API credential; node credential; account balance; data visibility; backups; migration path; provider dependency.
* Caption: Similar payment features can carry very different custody, data, maintenance, and recovery boundaries.
* Alt text: Comparison of self-hosted software, managed infrastructure, and hosted processing across authority, data, maintenance, and recovery.
* Image orientation: Landscape
* Mobile crop notes: Keep each operating model complete; use three stacked panels on mobile rather than cropping columns.
* Status: PLANNED

### Illustration 3 — Provider failure and recovery route

* Placement: In “Reliability, security, and continuity.”
* Visual description: A vintage field-guide decision chart tracing service failure through diagnosis, credential control, data export, wallet or node recovery, temporary manual operation, provider migration, and unresolved dependencies. Show separate branches for API outage, custody or withdrawal interruption, hosted-node failure, and lost records.
* Required labels: Service failure; API outage; payment detection; hosted node; custody or withdrawal; credentials; backups; data export; replacement provider; self-hosted fallback; incident notice; migration; unresolved dependency.
* Caption: Recovery depends on what authority, credentials, backups, and records remain available outside the provider.
* Alt text: Decision chart showing recovery paths for Bitcoin service-provider outages, hosted-node failures, withdrawal interruptions, and lost records.
* Image orientation: Landscape
* Mobile crop notes: Preserve the four failure branches and all recovery outcomes; convert to a vertical decision tree on mobile.
* Status: PLANNED

### Shared visual requirements

* Vintage technical illustration with nautical-chart and field-guide influence
* Muted, cohesive Mempool Surf Club palette
* Consistent approved border system
* Calm educational tone without promotional product branding
* Legible labels at desktop and mobile sizes
* No invented logos, rankings, scores, badges, or endorsement cues
