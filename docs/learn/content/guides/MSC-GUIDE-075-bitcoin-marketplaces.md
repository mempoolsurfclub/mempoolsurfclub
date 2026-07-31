---
registry_id: MSC-GUIDE-075
status: COPY_LOCKED
page_role: topic-guide
h1: How Bitcoin Marketplaces Work
handle: bitcoin-marketplaces
category: Bitcoin Ecosystem
subcategory: Markets
depth: Surface
format: Ecosystem Overview
primary_path: Explore the Ecosystem
secondary_paths:
  - Build on Bitcoin
author_display: Mempool Surf Club Editorial
reviewed_date: 2026-07-31
copy_locked_date: 2026-07-31
---

# How Bitcoin Marketplaces Work

## 1. Introductory deck

A Bitcoin marketplace connects buyers and sellers around offers, listings, payment conditions, and delivery. The marketplace may coordinate discovery, messaging, price formulas, escrow, reputation, dispute resolution, or custody, but those functions are separate and should be evaluated individually.

Bitcoin can settle one leg of a marketplace trade. It does not verify a listing, prove that an off-chain payment or product was delivered, reverse a mistaken transfer, or decide a dispute. Understanding the complete trade path reveals which promises come from Bitcoin and which depend on software, counterparties, operators, and law.

## 2. Full article

A Bitcoin marketplace is a system that helps buyers and sellers find one another, agree on terms, and complete a trade. The marketplace may host listings, publish offers, provide search and messaging, calculate prices, coordinate payment steps, hold or help secure bitcoin, collect fees, manage reputation, or resolve disputes. Those roles are separate, and the word “marketplace” does not reveal which ones a platform performs.

A useful marketplace map is:

`listing or offer → discovery → agreement → payment conditions → settlement → delivery or transfer → completion or dispute`

Bitcoin can be used at the settlement stage, but it does not supply the listing, verify the seller’s claims, confirm that goods were delivered, reverse a mistaken payment, or decide who is right in a dispute. Those functions come from the marketplace design, the counterparties, external payment systems, and applicable law.

### Marketplace, exchange, and merchant are different roles

A marketplace connects counterparties around particular offers or listings. An exchange generally organizes continuous trading in standardized assets through an order book, request-for-quote system, broker, dealer, or similar market structure. A merchant sells its own goods or services. A payment processor helps a merchant request, detect, and account for payments.

One business can combine these roles, but they should not be treated as interchangeable. A platform may call itself peer-to-peer while controlling accounts, custody, pricing, dispute outcomes, or access to counterparties. Another may publish software that lets participants communicate and settle without the operator holding the traded bitcoin. The meaningful questions are what the platform operates, what it can observe, and which actions it can authorize.

### What the marketplace displays and indexes

Some marketplaces sell ordinary goods or services. Others display digital collectibles, inscription-related items, runes, or other protocol-defined records. In those systems, the marketplace may rely on an indexer to interpret blockchain data, associate content or balances with outputs, and construct the catalog shown to users.

An indexer’s result is an application view, not an extra Bitcoin consensus rule. Bitcoin nodes validate transactions and scripts according to Bitcoin’s rules; they do not automatically agree with every external numbering scheme, metadata convention, collection label, rarity claim, or marketplace rendering. The `ord` project, for example, describes itself as an index, block explorer, and wallet and relies on Bitcoin Core data to build its own index of satoshi locations and inscriptions.

A marketplace listing can therefore combine on-chain facts with indexer output and seller-supplied claims. Buyers should distinguish the transaction output being transferred from the marketplace’s title, image, collection membership, provenance statement, or valuation. A successful Bitcoin transfer does not prove that every descriptive field or external convention is accurate.

### How offers and listings become trades

A seller may publish a fixed price, a price linked to an external index, a percentage premium or discount, a quantity range, accepted payment methods, geographic limits, delivery terms, and a response window. A buyer searches or filters those offers and either accepts one or negotiates new terms.

The displayed price can depend on information outside Bitcoin. A marketplace may use one exchange rate, combine several sources, or let users choose their own formula. Bitcoin’s consensus rules do not determine the national-currency price of an order, whether a premium is fair, or whether a listing accurately describes the thing being sold.

When an offer is accepted, the marketplace may create a trade record or contract containing the parties, amount, payment method, deadlines, payout address, fees, and dispute rules. That record is platform data. Only a later Bitcoin transaction, if one occurs, is recorded by the Bitcoin network.

### Payment and settlement are not the same event

A marketplace trade can include several different transfers. In a peer-to-peer bitcoin purchase, one participant may send dollars, euros, or another payment through a bank or payment service while the other releases bitcoin. In a goods marketplace, a buyer may send bitcoin while the seller separately ships or delivers an item.

These legs do not become atomic merely because one leg uses Bitcoin. A bank transfer can be delayed, reversed, charged back, sent from the wrong account, or described incorrectly. A physical item can arrive late, damaged, or not at all. A digital item can be copied, withheld, or disputed. A confirmed Bitcoin transaction proves that specified outputs were included in the blockchain history accepted by a validating node; it does not prove that an off-chain obligation was performed.

Bitcoin payment processing also involves operational choices. A marketplace or seller may generate a unique address or invoice, set an expiration time, convert a fiat price into satoshis, detect a transaction, decide how many confirmations to require, and issue a separate refund transaction if necessary. A broadcast transaction is not the same as a confirmed payment, and a confirmation policy is a risk decision rather than a universal rule.

### Custodial balances, multisignature escrow, and Lightning holds

Some marketplaces take custody by receiving funds into addresses or accounts they control and later crediting internal balances. In that model, users depend on the operator’s records, withdrawal policy, key management, solvency, and continued availability.

Other marketplaces use transaction structures that divide authority. As of July 31, 2026, Hodl Hodl describes an on-chain two-of-three multisignature escrow in which the buyer, seller, and platform each have a key and two signatures are required to release bitcoin. The platform says its key is used in disputes. This design limits unilateral control by one key holder, but users still depend on the implementation, key-generation process, contract data, dispute policy, and ability to construct and broadcast a valid release transaction.

Bisq’s current documentation distinguishes Bisq 2 and its Bisq Easy protocol from the classic Bisq 1 trading protocol. In the classic protocol, both traders lock bitcoin and security deposits in a two-of-two multisignature arrangement. On the normal path they cooperate on the payout. If they cannot agree, mediation can suggest an outcome, and a time-locked fallback and arbitration process provide a separate recovery path. Bisq Easy uses reputation and different trade rules. The exact consequences therefore depend on the active protocol, not on the Bisq name or multisignature as a generic label.

RoboSats documents Lightning hold invoices for fidelity bonds and trade escrow. A hold invoice can lock funds without immediately settling them. The coordinator later settles or cancels according to the trade state, and disputed escrow can be released according to the dispute outcome. This is not the same custody and failure model as an on-chain multisignature address. Lightning routing, invoice expiry, wallet compatibility, coordinator operation, and pending HTLC behavior remain relevant.

“Escrow” therefore describes a purpose, not one technical mechanism. Evaluation requires the exact script, signature threshold, time locks, Lightning invoice behavior, key holders, refund path, and dispute authority.

### Reputation, identity, and marketplace rules

Marketplaces often use account history, completed-trade counts, ratings, limits, deposits, identity checks, or private invitations to reduce abuse. These signals can change incentives, but none proves that a counterparty will perform a future trade.

Reputation can be incomplete, purchased, manipulated, transferred, or built through many small trades before a larger fraud attempt. Identity verification can connect an account to submitted information, but it does not guarantee honesty, solvency, delivery, or account security. A pseudonymous marketplace may reduce collection of legal identity while still observing IP addresses, payment details, trade amounts, messages, timing, wallet information, and dispute evidence.

Rules also determine what the marketplace will and will not do. A platform may ban particular payment methods, require matching account names, limit trade sizes, set evidence deadlines, or exclude certain goods and jurisdictions. Users need the current rules for the exact trade, not a general assumption based on the platform’s label.

### Disputes, evidence, and irreversible payments

A dispute process is an application-layer procedure. It may rely on chat records, payment receipts, account names, shipment tracking, screenshots, signed messages, transaction identifiers, deadlines, or testimony from the parties. A mediator may only recommend a payout, while an arbitrator or platform key holder may have greater authority.

Evidence has limits. A bank receipt may show that a payment was initiated but not finally received. Tracking can show delivery to an address without proving the item matched the listing. A screenshot can be altered. A Bitcoin transaction can establish an on-chain payment but cannot establish the condition or authenticity of an off-chain product.

Bitcoin payments generally do not include a card-style chargeback process. A marketplace may create its own refund, escrow, bond, insurance, or dispute system, but those are separate promises and mechanisms. The Federal Trade Commission warns that cryptocurrency payments can be difficult to recover and advises marketplace users to understand seller, refund, payment, and platform-protection rules before transacting.

### Fees, privacy, and continuity

Marketplace costs can include listing fees, trade fees, spreads, escrow fees, dispute fees, Bitcoin network fees, Lightning routing fees, payment-service fees, currency-conversion costs, and withdrawal fees. A low headline percentage does not describe the total cost or who bears each component.

Privacy depends on the whole trade path. Public blockchain data can reveal transaction relationships. The marketplace may learn offers, counterparties, messages, amounts, addresses, timing, device information, or identity data. The fiat or delivery leg may reveal legal names, bank accounts, phone numbers, home addresses, or location. Using Tor, pseudonyms, multisignature, or Lightning can reduce particular disclosures without creating complete anonymity.

Continuity also extends beyond custody. A trade may depend on the marketplace website, coordinator, offer database, encrypted contract data, notification service, dispute staff, software release, or external payment provider. Before trading, participants should know what information and signatures allow completion or recovery if the platform disappears during each stage.

### Legal and tax boundaries

Legal treatment depends on what the operator and participants actually do, where they operate, what is traded, and whether they accept and transmit value for others. FinCEN’s United States guidance applies a facts-and-circumstances analysis to convertible-virtual-currency business models, and its enforcement history shows that an individual peer-to-peer exchanger can have money-transmitter obligations. That does not mean every marketplace user, software developer, or listing service is automatically a money transmitter.

In the European Union, MiCA establishes duties for defined crypto-asset service providers, including operators of trading platforms and providers of custody or exchange services within scope. A marketplace for ordinary goods that merely accepts bitcoin is not automatically the same thing as a MiCA trading platform for crypto-assets.

Tax obligations are also separate from payment technology. The United States Internal Revenue Service treats digital assets as property for federal tax purposes and states that receiving or disposing of digital assets in exchange for goods or services can be reportable. Other jurisdictions use different rules. This guide is general education, not legal or tax advice.

A practical marketplace evaluation asks:

1. **Role:** Is the platform a listing service, broker, exchange, custodian, escrow coordinator, merchant, or several at once?
2. **Authority:** Who can move bitcoin at every stage, and under what signatures or conditions?
3. **Counterpayment:** How is the fiat, product, service, or other asset delivered and verified?
4. **Disputes:** Who decides, what evidence counts, and what technical power enforces the result?
5. **Fees:** Which platform, network, payment, conversion, and dispute costs apply?
6. **Privacy:** What information reaches the platform, counterparty, payment provider, and public blockchain?
7. **Continuity:** Can the trade be completed or refunded if the platform or a counterparty disappears?
8. **Legal scope:** Which entities, terms, jurisdictions, and reporting duties apply?

The goal is not to identify a universally best marketplace. It is to map the transaction clearly enough to understand which promises are enforced by Bitcoin, which depend on software and counterparties, and where trust or recovery remains.

## 3. Key Terms

* **Bitcoin marketplace:** A system that helps buyers and sellers discover offers, agree on terms, and coordinate settlement or delivery.
* **Listing:** A published description of an item, service, asset, price, quantity, or trade condition.
* **Offer:** Terms under which a participant is willing to buy or sell.
* **Counterparty:** The person or organization on the other side of a trade.
* **Settlement:** Completion of the transfer used to satisfy a payment or asset obligation.
* **Escrow:** A mechanism intended to restrict or condition release of funds while a trade is completed or disputed.
* **Custodial marketplace:** A marketplace that controls funds or signing authority on behalf of users.
* **Multisignature:** A spending arrangement requiring a defined threshold of signatures from a larger set of keys.
* **Security deposit:** Funds committed to discourage rule violations or compensate for defined failures.
* **Hold invoice:** A Lightning invoice whose payment can remain pending until it is settled or canceled.
* **Fidelity bond:** Funds placed at risk to create an economic cost for abandoning or abusing a trade.
* **Mediator:** A party that assists with a dispute and may recommend an outcome without necessarily controlling the funds.
* **Arbitrator:** A party authorized by the applicable process to determine or enforce a dispute outcome.
* **Reputation:** Recorded information about prior participation, ratings, endorsements, limits, or completed trades.
* **Confirmation:** Evidence that a Bitcoin transaction was included in a block accepted by a validating node, with additional blocks built after it.
* **Chargeback:** A reversal process available in some payment systems but not built into Bitcoin transactions.
* **Trade contract:** Marketplace data recording counterparties, amounts, deadlines, payment methods, fees, and dispute rules.
* **Peer-to-peer:** A description of direct participant interaction that does not by itself establish custody, privacy, decentralization, or legal status.
* **Marketplace fee:** A charge for listing, matching, coordination, escrow, settlement, dispute handling, or another platform service.
* **Counterpayment:** The fiat payment, product, service, or other asset exchanged for the Bitcoin leg of a trade.

## 4. Sources

1. **Payment Processing** | Bitcoin developer documentation

   * URL: [https://developer.bitcoin.org/devguide/payment_processing.html](https://developer.bitcoin.org/devguide/payment_processing.html)
   * Published or updated: Not displayed
   * Accessed: July 31, 2026
   * Supports: Pricing, payment requests, address assignment, transaction detection, confirmation policies, and refund handling in Bitcoin payment workflows.
   * Limitation: The page includes legacy and deprecated payment-protocol material; this guide uses it only for general payment-processing concepts.

2. **Transactions** | Bitcoin developer documentation

   * URL: [https://developer.bitcoin.org/devguide/transactions.html](https://developer.bitcoin.org/devguide/transactions.html)
   * Published or updated: Not displayed
   * Accessed: July 31, 2026
   * Supports: Bitcoin transaction inputs, outputs, confirmations, and the limits of what an on-chain transaction establishes.
   * Limitation: It does not verify off-chain delivery, marketplace listings, fiat payments, or dispute evidence.

3. **ord** | ordinals/ord GitHub repository

   * URL: [https://github.com/ordinals/ord](https://github.com/ordinals/ord)
   * Published or updated: Current repository accessed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: The `ord` project’s role as an index, block explorer, and wallet and its dependence on Bitcoin Core data to build an application-level index.
   * Limitation: Project documentation for experimental software; ordinal numbering, inscription views, collection labels, and marketplace rendering are not additional Bitcoin consensus rules.

4. **Bisq 2** | Bisq Wiki

   * URL: [https://bisq.wiki/Bisq_2](https://bisq.wiki/Bisq_2)
   * Published or updated: Current page accessed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: The distinction between Bisq 2 and earlier Bisq trading architecture and the existence of multiple current protocols.
   * Limitation: Community-maintained project documentation; it does not independently establish implementation security or legal status.

5. **Bisq Easy** | Bisq Wiki

   * URL: [https://bisq.wiki/Bisq_Easy](https://bisq.wiki/Bisq_Easy)
   * Published or updated: Current page accessed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: Bisq Easy’s reputation-based trading model and differences from the classic multisignature protocol.
   * Limitation: Applies to Bisq Easy and should not be generalized to every Bisq protocol.

6. **Security Deposit** | Bisq Wiki

   * URL: [https://bisq.wiki/Security_deposit](https://bisq.wiki/Security_deposit)
   * Published or updated: Current page accessed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: Security deposits and their incentive role in the classic Bisq trading protocol.
   * Limitation: Protocol-specific documentation; deposit design does not guarantee honest counterparties or successful recovery.

7. **Dispute Resolution in Bisq 1** | Bisq Wiki

   * URL: [https://bisq.wiki/Dispute_Resolution_in_Bisq_1](https://bisq.wiki/Dispute_Resolution_in_Bisq_1)
   * Published or updated: Current page accessed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: Mediation, time-locked fallback, and dispute pathways in the classic Bisq 1 protocol.
   * Limitation: Applies to Bisq 1 and not automatically to Bisq Easy or future protocols.

8. **Trading Rules** | Bisq Wiki

   * URL: [https://bisq.wiki/Trading_rules](https://bisq.wiki/Trading_rules)
   * Published or updated: Current page accessed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: The role of payment-method, identity, timing, communication, and evidence rules in marketplace trades.
   * Limitation: Rules can change and must be renewed for the exact protocol and trade at publication time.

9. **Trade Escrow** | RoboSats documentation

   * URL: [https://robosats.org/docs/escrow/](https://robosats.org/docs/escrow/)
   * Published or updated: Current page accessed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: RoboSats’ Lightning hold-invoice trade escrow, settlement, and cancellation flow.
   * Limitation: Provider documentation; this review did not execute a live trade or independently test coordinator behavior.

10. **Disputes** | RoboSats documentation

   * URL: [https://robosats.org/docs/disputes/](https://robosats.org/docs/disputes/)
   * Published or updated: Current page accessed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: The coordinator’s dispute process, evidence review, and escrow outcome in RoboSats.
   * Limitation: Describes intended platform procedure, not guaranteed availability, fairness, or recoverability in every case.

11. **Fidelity Bonds** | RoboSats documentation

   * URL: [https://robosats.org/docs/bonds/](https://robosats.org/docs/bonds/)
   * Published or updated: Current page accessed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: Hold-invoice fidelity bonds and the economic cost imposed for abandoning or violating a trade.
   * Limitation: A bond changes incentives but does not prove identity, delivery, solvency, or honest future behavior.

12. **Hodl Hodl Help** | Hodl Hodl

   * URL: [https://hodlhodl.com/help](https://hodlhodl.com/help)
   * Published or updated: Current page accessed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: Current marketplace help materials, trade flow, and the existence of different settlement options.
   * Limitation: Provider documentation can change; mechanisms must be checked for the exact product and trade.

13. **Escrow Explained** | Hodl Hodl

   * URL: [https://hodlhodl.com/blog/en/escrow-explained](https://hodlhodl.com/blog/en/escrow-explained)
   * Published or updated: January 14, 2026
   * Accessed: July 31, 2026
   * Supports: The documented on-chain two-of-three multisignature escrow and platform dispute key.
   * Limitation: Applies to the described on-chain escrow and not automatically to every current Hodl Hodl settlement flow.

14. **Buying From an Online Marketplace** | U.S. Federal Trade Commission

   * URL: [https://consumer.ftc.gov/articles/buying-online-marketplace](https://consumer.ftc.gov/articles/buying-online-marketplace)
   * Published or updated: Current page accessed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: Consumer evaluation of sellers, payment methods, refund terms, platform protections, and marketplace scams.
   * Limitation: General U.S. consumer guidance; it is not Bitcoin protocol documentation or legal advice for every jurisdiction.

15. **Selling Stuff Online? Here’s How to Avoid a Scam** | U.S. Federal Trade Commission

   * URL: [https://consumer.ftc.gov/consumer-alerts/2022/07/selling-stuff-online-heres-how-avoid-scam](https://consumer.ftc.gov/consumer-alerts/2022/07/selling-stuff-online-heres-how-avoid-scam)
   * Published or updated: July 2022
   * Accessed: July 31, 2026
   * Supports: Risks involving fake payments, overpayment schemes, irreversible payment requests, and off-platform communication.
   * Limitation: General fraud guidance and not an assessment of any named Bitcoin marketplace.

16. **Application of FinCEN’s Regulations to Certain Business Models Involving Convertible Virtual Currencies** | Financial Crimes Enforcement Network

   * URL: [https://www.fincen.gov/resources/statutes-regulations/guidance/application-fincens-regulations-certain-business-models](https://www.fincen.gov/resources/statutes-regulations/guidance/application-fincens-regulations-certain-business-models)
   * Published or updated: May 9, 2019
   * Accessed: July 31, 2026
   * Supports: The United States facts-and-circumstances analysis for convertible-virtual-currency business models.
   * Limitation: U.S. federal guidance; applicability depends on the actual activities, entities, and facts.

17. **FinCEN Penalizes Peer-to-Peer Virtual Currency Exchanger** | Financial Crimes Enforcement Network

   * URL: [https://www.fincen.gov/news/news-releases/fincen-penalizes-peer-peer-virtual-currency-exchanger-violations-anti-money](https://www.fincen.gov/news/news-releases/fincen-penalizes-peer-peer-virtual-currency-exchanger-violations-anti-money)
   * Published or updated: April 18, 2019
   * Accessed: July 31, 2026
   * Supports: An enforcement example showing that an individual peer-to-peer exchanger can have money-services-business obligations.
   * Limitation: One enforcement matter does not establish that every marketplace participant or software developer has the same status.

18. **Regulation (EU) 2023/1114 on Markets in Crypto-assets** | Official Journal of the European Union

   * URL: [https://eur-lex.europa.eu/eli/reg/2023/1114/oj](https://eur-lex.europa.eu/eli/reg/2023/1114/oj)
   * Published or updated: June 9, 2023; consolidated status should be renewed at publication
   * Accessed: July 31, 2026
   * Supports: Defined crypto-asset service activities, including trading-platform, exchange, and custody services within MiCA’s scope.
   * Limitation: EU law; classification depends on the activity and entity, and ordinary-goods marketplaces are not automatically crypto-asset trading platforms.

19. **Digital Assets** | U.S. Internal Revenue Service

   * URL: [https://www.irs.gov/filing/digital-assets](https://www.irs.gov/filing/digital-assets)
   * Published or updated: Current page accessed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: U.S. federal tax treatment of digital assets as property and reporting considerations for transactions.
   * Limitation: U.S. federal tax information only; this guide does not provide tax advice.

20. **Frequently Asked Questions on Digital Asset Transactions** | U.S. Internal Revenue Service

   * URL: [https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-digital-asset-transactions](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-digital-asset-transactions)
   * Published or updated: Current page accessed July 31, 2026
   * Accessed: July 31, 2026
   * Supports: Tax consequences when digital assets are received or disposed of in exchange for goods or services.
   * Limitation: U.S. federal guidance that may be revised and does not cover every factual or jurisdictional situation.

## 5. SEO title

How Bitcoin Marketplaces Work | Mempool Surf Club

## 6. Meta description

Learn how Bitcoin marketplaces coordinate listings, indexing, payments, escrow, reputation, disputes, custody, privacy, and settlement.

## 7. Excerpt

Bitcoin can settle one leg of a marketplace trade, but listings, indexers, counterparties, delivery, escrow, reputation, and disputes depend on separate systems. This guide maps those boundaries.

## 8. Reading time

Approximately 10 minutes for the Full Article.

## 9. Planned internal links

Do not activate planned links until each destination exists as a real published page.

* Previous guide: `MSC-GUIDE-074 | How Bitcoin Wallet Providers Operate`
* Next guide: `MSC-GUIDE-076 | What Bitcoin Service Providers Do`
* Return destination: `MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem`
* Primary learning path: `MSC-PATH-ECOSYSTEM | Explore the Ecosystem`
* Secondary learning path: `MSC-PATH-BUILD | Build on Bitcoin`
* Prerequisite: `MSC-GUIDE-001 | What Is Bitcoin?`
* Recommended branch guide: `MSC-GUIDE-037 | What Are Bitcoin Ordinals?`
* Related guide: `MSC-GUIDE-007 | How to Send and Receive Bitcoin`
* Related guide: `MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work`
* Related guide: `MSC-GUIDE-012 | How Bitcoin Privacy Works`
* Related guide: `MSC-GUIDE-013 | What Are UTXOs in Bitcoin?`
* Related guide: `MSC-GUIDE-014 | How Bitcoin Confirmations Work`
* Related guide: `MSC-GUIDE-016 | Bitcoin Best Practices for Safe Everyday Use`
* Related guide: `MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?`
* Related guide: `MSC-GUIDE-033 | How the Lightning Network Works`
* Related guide: `MSC-GUIDE-044 | How Bitcoin Indexers Work`
* Related guide: `MSC-GUIDE-072 | What Bitcoin Infrastructure Companies Do`
* Related glossary terms: `Marketplace`; `Counterparty`; `Escrow`; `Settlement`; `Indexer`; `Reputation`; `Dispute`
* Future Tools connection: A marketplace trade-path evaluator, activated only after a real destination exists.

## 10. Accuracy review checklist

* [x] Registry metadata and YAML match the canonical record.
* [x] Approved H1 and handle remain unchanged.
* [x] Article stays within Guide 075 and Surface depth.
* [x] Content format remains `Ecosystem Overview`.
* [x] Marketplace, exchange, merchant, broker, custodian, escrow coordinator, and payment processor remain distinct.
* [x] Listings, offers, platform trade records, indexer output, and Bitcoin transactions remain distinct.
* [x] Bitcoin settlement is not presented as proof of off-chain payment, delivery, authenticity, collection membership, or contractual performance.
* [x] Bitcoin consensus is not presented as enforcing every external numbering scheme, metadata convention, or marketplace rendering.
* [x] Broadcast, confirmation, settlement, delivery, and completion remain separate events.
* [x] Price formulas and premiums are not described as Bitcoin consensus outputs.
* [x] Custodial balances, on-chain multisignature escrow, and Lightning hold invoices remain technically distinct.
* [x] No use of the word escrow is accepted as proof of a particular custody or recovery model.
* [x] Signature thresholds, key holders, time locks, coordinator authority, and refund paths are identified where material.
* [x] Bisq 2, Bisq Easy, and the classic Bisq 1 protocol are not treated as identical.
* [x] Provider-specific marketplace claims include dates, attribution, and limitations.
* [x] Reputation and identity checks are not presented as guarantees of honest future performance.
* [x] Dispute processes are described as application-layer procedures with evidentiary limits.
* [x] Bitcoin is not described as providing a card-style chargeback process.
* [x] Fees include platform, network, payment, conversion, and dispute components where applicable.
* [x] Privacy analysis includes platform, counterparty, payment-provider, delivery, network, indexer, and blockchain disclosures.
* [x] Peer-to-peer language is not equated with noncustodial, private, decentralized, or unregulated operation.
* [x] Continuity and recovery are addressed for platform, coordinator, contract data, indexer, payment provider, and counterparty failure.
* [x] Legal statements identify jurisdiction and remain activity- and facts-dependent.
* [x] Tax statements remain jurisdiction-specific and educational.
* [x] No marketplace or collectible is ranked, recommended, endorsed, or assigned an investment value.
* [x] No active internal link, public URL, publication state, or Tools destination is invented.
* [x] Exactly three illustration briefs are complete and remain `PLANNED`.
* [x] Human Verification is complete.
* [x] Full Article word count and reading-time estimate meet the registry range.
* [x] Every mutable provider, protocol, consumer-protection, legal, and tax claim was renewed during Accuracy Review.
* [x] Accuracy Review is approved.
* [x] Copy Lock is approved.
* [ ] Publication-time source renewal is complete.

## 11. Human verification

* Reviewer: Mempool Surf Club Accuracy Review
* Review date: July 31, 2026
* Primary evidence reviewed: Current `main`; the complete canonical Guide 075 master-registry and content-manifest records; the current Learn guide structure and the copy-locked Guides 073 and 074 precedent; Bitcoin developer documentation; the current `ord` repository and Ordinal Theory documentation; current Bisq 2, Bisq Easy, Bisq 1 security-deposit, trading-rule, and dispute documentation; current RoboSats escrow, bond, and dispute documentation; current Hodl Hodl help and on-chain escrow documentation; Federal Trade Commission marketplace and fraud guidance; FinCEN’s 2019 business-model guidance and peer-to-peer exchanger enforcement; Regulation (EU) 2023/1114; and current Internal Revenue Service digital-asset guidance.
* Verification method: Reopened each material source directly on July 31, 2026; matched claims to the exact marketplace role, protocol version, indexer boundary, custody or escrow mechanism, payment leg, dispute authority, jurisdiction, and evidentiary scope; distinguished Bitcoin protocol facts from indexer output, provider descriptions, application rules, consumer guidance, law, and tax treatment; and preserved limitations where independent testing was not performed.
* Verification limits: This review did not execute live trades, reproduce marketplace or indexer software, test Lightning hold-invoice failure cases, validate provider key generation, arbitrate a dispute, inspect private operator systems, authenticate collectible descriptions, or provide legal or tax advice. Mutable provider, protocol, fee, dispute, legal, and tax claims must be renewed at publication.

## 12. Illustration briefs

### Illustration 1 — Marketplace trade-path systems map

* Placement: After the opening marketplace map in the Full Article.
* Visual description: A vintage nautical-chart systems diagram showing a listing or offer moving through discovery, agreement, payment conditions, Bitcoin settlement, delivery or counterpayment, and completion or dispute. The Bitcoin leg is a distinct current running through the center while off-chain obligations sit on separate charted routes.
* Required labels: Listing or offer; discovery; agreement; price source; payment conditions; Bitcoin transaction; confirmation policy; fiat payment or delivery; completion; dispute.
* Caption: A marketplace coordinates several separate events; a Bitcoin payment settles one leg but does not verify the rest of the trade.
* Alt text: Systems diagram separating marketplace listing, agreement, Bitcoin settlement, off-chain payment or delivery, completion, and dispute stages.
* Image orientation: Landscape
* Mobile crop notes: Preserve the full left-to-right sequence and keep the Bitcoin and off-chain routes visually distinct; stack the stages vertically on mobile.
* Status: PLANNED

### Illustration 2 — Custody and escrow mechanism comparison

* Placement: In “Custodial balances, multisignature escrow, and Lightning holds.”
* Visual description: A vintage technical plate comparing three mechanisms: operator-controlled custodial balance, on-chain multisignature escrow with labeled key holders and threshold, and Lightning hold invoice with pending, settle, and cancel states. Use consistent borders and muted cartographic colors.
* Required labels: Custodial account; operator keys; internal balance; 2-of-3 multisignature; buyer key; seller key; platform dispute key; Lightning hold invoice; pending HTLC; settle; cancel; refund path.
* Caption: “Escrow” can describe different mechanisms with different authority, recovery, and failure boundaries.
* Alt text: Technical comparison of operator custody, on-chain multisignature escrow, and Lightning hold-invoice escrow.
* Image orientation: Landscape
* Mobile crop notes: Keep all three mechanisms complete; use three stacked panels on mobile rather than cropping a panel.
* Status: PLANNED

### Illustration 3 — Dispute authority and evidence chart

* Placement: In “Disputes, evidence, and irreversible payments.”
* Visual description: A vintage field-guide decision chart tracing a failed trade from evidence collection through mediation, arbitration or coordinator decision, cooperative payout, technical enforcement, refund, or unresolved loss. Show evidence types as imperfect signals rather than proof.
* Required labels: Trade dispute; messages; payment receipt; shipment tracking; transaction ID; signed message; mediation; arbitration; platform key; cooperative payout; time-locked fallback; refund; unresolved.
* Caption: Dispute outcomes depend on evidence, platform rules, and the technical authority available to enforce a payout or refund.
* Alt text: Decision chart showing marketplace dispute evidence, mediator and arbitrator roles, payout paths, refunds, and unresolved outcomes.
* Image orientation: Landscape
* Mobile crop notes: Preserve the evidence inputs and every outcome branch; convert to a vertical decision tree on mobile.
* Status: PLANNED

### Shared visual requirements

* Vintage technical illustration with nautical-chart and field-guide influence
* Muted, cohesive Mempool Surf Club palette
* Consistent approved border system
* Calm educational tone without promotional product branding
* Legible labels at desktop and mobile sizes
* No invented product logos, rankings, scores, or endorsement cues
