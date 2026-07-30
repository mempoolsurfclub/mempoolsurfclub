---
registry_id: MSC-GUIDE-073
status: COPY_LOCKED
page_role: topic-guide
h1: How Bitcoin Exchanges Work
handle: bitcoin-exchanges
category: Bitcoin Ecosystem
subcategory: Markets
depth: Surface
format: Guide
primary_path: Explore the Ecosystem
secondary_paths:
  - Use Bitcoin Safely
author_display: Mempool Surf Club Editorial
reviewed_date: 2026-07-30
copy_locked_date: 2026-07-30
---

# How Bitcoin Exchanges Work

## 1. Introductory deck

A Bitcoin exchange connects several systems that do different jobs. It may detect on-chain deposits, maintain customer balances in an internal database, match buyers with sellers, safeguard private keys, review withdrawals, and construct Bitcoin transactions. These processes can appear as one account or app, but they operate across different technical, business, and legal boundaries.

Understanding those boundaries explains why a deposit may be visible but unavailable, why a trade usually does not create a Bitcoin transaction, why withdrawals can be delayed, and why an exchange balance is not the same as controlling private keys.

## 2. Full article

A centralized Bitcoin exchange connects several systems. It may provide customer accounts, maintain an internal ledger, operate a trading venue, safeguard private keys, screen transactions, and construct Bitcoin withdrawals. These systems can appear as one app, but they do not share one source of authority.

Bitcoin consensus determines whether blocks and the transactions inside them satisfy the rules enforced by validating nodes. Local node policy affects which unconfirmed transactions are accepted or relayed. The exchange separately decides when to recognize a deposit, credit an account, accept an order, record a trade, approve a withdrawal, or restrict a service. Law and contracts may impose additional duties. Bitcoin does not validate the exchange's customer ledger, matching rules, withdrawal approvals, or solvency.

A useful lifecycle is:

`deposit -> detection -> confirmation policy -> internal credit -> order execution -> internal ledger change -> withdrawal request -> review or queue -> transaction construction -> signing -> broadcast -> on-chain settlement`

### From a deposit address to an account credit

To receive bitcoin, an exchange typically displays a deposit address associated with a customer account. That association is maintained by the exchange. It does not prove that the exchange creates a permanently separate wallet or UTXO for that customer.

Address practices vary. Coinbase Exchange, for example, states that it generates changing deposit addresses for most assets while keeping earlier addresses associated with the account. This is a provider-specific implementation, not a Bitcoin rule or an industry standard.

After a transaction is broadcast, the exchange's Bitcoin infrastructure can detect it and monitor whether it enters a block. Bitcoin transactions spend earlier outputs and create new outputs. An output that remains unspent is a UTXO. Each block added after the block containing a transaction increases its confirmation count.

Confirmations are observable network events. The number an exchange requires before making a deposit available is a business and risk decision. As of July 30, 2026, Coinbase Exchange states that it requires two Bitcoin confirmations, while Gemini states that a Bitcoin deposit becomes available for trading after three. These examples show that no single confirmation threshold is a Bitcoin rule or a universal exchange practice.

An exchange can apply security, compliance, or operational checks after detecting an on-chain transaction. A deposit may be visible on the network while remaining pending, credited only for trading, or unavailable for withdrawal under the exchange's status model.

### What an exchange balance represents

When a deposit is credited, the balance shown to the customer is normally an entry in the exchange's internal ledger. It records the customer's entitlement under the exchange's terms and applicable law. The exact legal character can vary by entity, product, and jurisdiction.

The balance is not necessarily a separately identifiable UTXO. An exchange may use separate addresses, omnibus wallets, or a combination. Within its supervisory scope, the New York Department of Financial Services recognizes separate customer arrangements and qualifying omnibus arrangements supported by customer-level records. That guidance does not describe every exchange or jurisdiction.

Internal balances can change without a Bitcoin transaction. A trade, fee, hold, internal transfer, correction, or administrative action can update the exchange's database while its aggregate on-chain holdings remain unchanged. Bitcoin validates spends of UTXOs. It does not verify whether an exchange's database accurately records every customer entitlement.

### How orders and matching work

A trading pair identifies the asset being traded and the asset used to quote its price, such as BTC/USD. On an order-book venue, buyers submit bids and sellers submit asks. A matching engine applies the venue's rules to compatible orders and records executions, often called fills.

Not every exchange or product uses the same market design. Some use central order books, while others use auctions, dealer quotes, request-for-quote systems, brokerage routing, or another arrangement. Even among order-book venues, priority and order types can differ.

Coinbase Exchange documents one example: a continuous order book that executes orders using price-time priority. This explains that provider's stated matching method. It does not establish how every venue operates or prove execution quality.

A market order prioritizes immediate execution over price control. A limit order sets a maximum purchase price or minimum sale price. A large market order can consume several levels, so its average price may differ from the first displayed price.

### Liquidity, spread, depth, slippage, and price discovery

Liquidity describes how readily an asset can be bought or sold without a large price effect. Market makers and other participants may post bids and asks, adding executable interest to a venue.

The spread is the difference between the best available bid and ask. Depth is the quantity available at one or more price levels. A narrow spread can coexist with limited depth, so a small order may execute near the displayed price while a larger order moves through several levels.

Slippage is the difference between an expected price and the average price actually received. It can increase when an order is large relative to available depth, when prices move quickly, or when an order favors immediate execution.

Price discovery is the process through which bids, asks, trades, and changing supply and demand produce observable prices. There is no single exchange price that every participant must use. Prices can differ across venues because their customers, currencies, liquidity, access, fees, and operating conditions differ.

### Why most centralized-exchange trades are off-chain

A centralized exchange usually does not create a Bitcoin transaction for every trade. Instead, the matching and settlement systems update internal records. Coinbase Exchange, as one documented example, records fills and exposes whether the associated funds have been exchanged and settled.

This allows rapid execution without waiting for block inclusion. A trade shown in an account is not proof of an on-chain transfer or control of a particular UTXO.

Some transfers between accounts under the same operator can also remain internal. Coinbase documents a specific institutional counterparty-transfer feature as off-chain and independent of blockchain confirmations. That example should not be generalized to every transfer or provider.

An external withdrawal is different. It asks the exchange to move bitcoin beyond its internal accounting boundary to a Bitcoin address. If approved, that process requires the exchange or its custodian to authorize and broadcast an on-chain transaction.

### Custody and hot, warm, and cold wallet categories

A custodial exchange controls the private keys or signing process for bitcoin held through the service. Customers use account credentials and exchange procedures rather than independently authorizing each spend with their own keys.

Exchanges often describe custody tiers as hot, warm, or cold. Hot commonly refers to systems kept readily available for operations. Cold commonly refers to systems intended to keep signing material offline or strongly isolated. Warm is a non-standard label for an intermediate operational tier. These are not Bitcoin protocol terms, and providers can use the same label for materially different designs.

The label alone does not establish security. Relevant controls include key generation, backups, authorization thresholds, separation of duties, transaction review, withdrawal limits, incident detection, and recovery testing. Cold storage can reduce online exposure, but it does not eliminate insider risk, process failure, inaccurate accounting, legal claims, or insolvency.

### From a withdrawal request to on-chain settlement

A withdrawal begins as an instruction inside the exchange. The platform checks the internal balance and may apply authentication, address allowlists, amount limits, fraud screening, sanctions or anti-money-laundering controls, cooling-off periods, and manual review. Depending on the circumstances and terms, a request may be approved, queued, delayed, rejected, or restricted.

Approved withdrawals may be batched. One transaction can pay multiple customers, reducing the exchange's on-chain footprint and potentially its total network fee. Coinbase Exchange states that batching can make its final network fee differ from estimates charged across customers. This is a provider-specific process, not a universal formula.

The wallet system then selects UTXOs, creates outputs, chooses a fee rate, obtains the required signatures, and broadcasts the transaction. Broadcast does not guarantee relay, mining, or confirmation. Nodes apply their local relay and mempool policies to an unconfirmed transaction, miners choose transactions for candidate blocks, and validating nodes reject blocks that violate the consensus rules they enforce.

Once the transaction is included in a valid block, it has one confirmation. Later blocks increase its confirmation count. The exchange can report its own withdrawal status, but the on-chain transaction can also be observed independently.

### Fees and operational incentives

Exchange charges can include trading fees, spreads or markups, deposit or withdrawal fees, custody or account fees, and network-related charges. The labels and formulas vary by product, volume, payment rail, asset, and jurisdiction.

Maker-taker pricing is one common design. Orders that add displayed liquidity can be charged differently from orders that immediately remove it. Coinbase Exchange currently documents this model, with tiers based on recent trading volume. Its current percentages are mutable and do not establish an industry standard.

A withdrawal charge also may not equal the network fee paid for one customer. Batching, internal fee estimates, minimums, and provider policy can change the relationship. Readers should distinguish trading cost, execution price, spread, withdrawal charge, and the Bitcoin transaction fee.

### Custody, counterparty, operational, and solvency risk

Keeping bitcoin on an exchange creates dependencies outside Bitcoin consensus. The customer relies on the operator to safeguard keys, maintain records, keep systems available, and honor withdrawals. Operational risks include software defects, cyberattacks, compromised credentials, insider abuse, vendor failures, and reconciliation errors.

Counterparty risk is the possibility that the exchange or another obligated party cannot or will not meet its obligations. Solvency asks whether the business can meet its complete obligations, not merely whether it controls some visible bitcoin.

Proof-of-reserves methods can answer narrower questions. Depending on the method, they may offer evidence that an operator controlled specified assets at a point in time or included a customer balance in a committed liabilities set. They do not automatically establish complete liabilities, unencumbered ownership, internal controls, legal segregation, ongoing solvency, or future withdrawal availability. A proof-of-reserves report is not automatically a financial-statement audit.

### Account restrictions and jurisdictional variation

An exchange account is conditional access to a service. Providers may restrict deposits, trading, funding, or withdrawals under their terms and security or compliance procedures. Kraken's support documentation, updated July 8, 2026, provides one current example of account and withdrawal restrictions for security, fraud, identity, payment-reversal, compliance, and legal reasons.

The governing entity and rules can also vary by location. Kraken currently publishes separate terms for global, Canadian, European Economic Area, and Brazilian customers. That provider example illustrates why the brand name alone does not identify the applicable contract or legal protections.

Legal frameworks differ across jurisdictions and by activity. In the United States, FinCEN's 2013 guidance, read with its 2019 consolidated guidance and later authority, applies an activity- and facts-based analysis under which certain businesses that accept and transmit or buy and sell convertible virtual currency can be money transmitters under federal Bank Secrecy Act rules. New York imposes separate requirements on entities within its supervisory scope. In the European Union, MiCA establishes obligations within its scope for authorized crypto-asset custodians and trading-platform operators, including client records, custody arrangements, operating rules, and settlement procedures.

Regulation can impose duties, oversight, disclosures, and remedies. It does not prove that an exchange is secure, solvent, liquid, or suitable for a particular customer. Legal applicability depends on the responsible entity, product, customer location, and facts. This guide provides general education, not legal advice.

### An exchange balance is not private-key control

A centralized exchange can make trading and transfers convenient by connecting customer accounts, internal ledgers, market systems, custody, compliance, and Bitcoin transactions. That convenience depends on systems and organizations outside Bitcoin consensus.

The clearest boundary is control. An exchange balance is recorded and administered by the exchange under its terms. In self-custody, the user controls the private keys needed to authorize bitcoin spending. Neither arrangement removes every risk, but they create different responsibilities, dependencies, and failure modes.

Understanding which events are on-chain, which remain internal, and who controls the keys makes exchange design easier to evaluate.

## 3. Key Terms

* **Bitcoin exchange:** A business and software system that may provide accounts, custody, trading, transfers, and related services.
* **Internal ledger:** The exchange's database records of balances, holds, trades, fees, transfers, and other account activity.
* **Deposit address:** A Bitcoin address associated by an exchange with an account or deposit workflow.
* **Confirmation:** A transaction's inclusion in a block, with each later block increasing its confirmation count.
* **UTXO:** An unspent transaction output that can be referenced and spent by a later valid transaction.
* **Trading pair:** The two assets whose relative price is quoted in a market, such as BTC/USD.
* **Order book:** An organized set of unexecuted bids and asks on a venue.
* **Matching engine:** Software that applies venue rules to compatible orders and records executions.
* **Market maker:** A participant that regularly posts bids and asks and can add executable liquidity.
* **Spread:** The difference between the best available bid and ask.
* **Depth:** The quantity available at one or more price levels.
* **Slippage:** The difference between an expected price and the average execution price received.
* **Price discovery:** The process through which orders and trades produce observable market prices.
* **Custody:** Control or management of the keys and processes needed to authorize transfers.
* **Hot wallet:** An operational wallet or signing system kept readily available to connected systems.
* **Warm wallet:** A non-standard label commonly used for an operational tier between hot and cold arrangements.
* **Cold storage:** A custody arrangement intended to keep critical signing material offline or strongly isolated.
* **Transaction batching:** Constructing one transaction with outputs for multiple recipients.
* **Counterparty risk:** The risk that an obligated party cannot or will not meet its obligations.
* **Proof of reserves:** Defined evidence about specified assets and, in some methods, committed customer liabilities, subject to the method's scope and limits.
* **Self-custody:** An arrangement in which the user controls the private keys needed to authorize bitcoin spending.

## 4. Sources

1. **Transactions** | Bitcoin developer documentation

   * URL: [https://developer.bitcoin.org/devguide/transactions.html](https://developer.bitcoin.org/devguide/transactions.html)
   * Updated: Not displayed
   * Accessed: July 30, 2026
   * Supports: Bitcoin transactions spend earlier outputs and create outputs that remain UTXOs until spent.
   * Limitation: Educational documentation describing Bitcoin and Bitcoin Core concepts; it does not establish exchange accounting, custody, or crediting policy.

2. **Block Chain** | Bitcoin developer documentation

   * URL: [https://developer.bitcoin.org/devguide/block_chain.html](https://developer.bitcoin.org/devguide/block_chain.html)
   * Updated: Not displayed
   * Accessed: July 30, 2026
   * Supports: Independent node validation, block chaining, transaction inclusion in blocks, and consensus-rule framing.
   * Limitation: It does not determine an exchange's confirmation threshold, account status, or withdrawal policy.

3. **Futures Glossary** | U.S. Commodity Futures Trading Commission

   * URL: [https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/CFTCGlossary/index.htm](https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/CFTCGlossary/index.htm)
   * Updated: Not displayed
   * Accessed: July 30, 2026
   * Supports: General definitions for order books, matching algorithms, market and limit orders, liquidity, market makers, market microstructure, and price discovery.
   * Limitation: The glossary is general market-structure material; it does not classify every Bitcoin venue or prove a provider's implementation.

4. **Customer Clearing Documentation, Timing of Acceptance for Clearing, and Clearing Member Risk Management** | U.S. Commodity Futures Trading Commission

   * URL: [https://www.cftc.gov/LawRegulation/FederalRegister/FinalRules/2012-7477.html](https://www.cftc.gov/LawRegulation/FederalRegister/FinalRules/2012-7477.html)
   * Published: April 9, 2012
   * Accessed: July 30, 2026
   * Supports: A central limit order book can consolidate and match orders, expose prices and depth, and support price discovery.
   * Limitation: The rule concerns regulated derivatives markets and does not establish that every Bitcoin exchange uses a central limit order book or price-time priority.

5. **Generating new deposit addresses** | Coinbase Help

   * URL: [https://help.coinbase.com/en/exchange/crypto-transfers/generating-new-deposit-addresses](https://help.coinbase.com/en/exchange/crypto-transfers/generating-new-deposit-addresses)
   * Updated: Not displayed
   * Accessed: July 30, 2026
   * Supports: Coinbase Exchange's stated practice of generating changing deposit addresses for most assets while retaining earlier address associations.
   * Limitation: Provider documentation establishes Coinbase's stated product behavior only; it does not prove customer-specific wallets, UTXOs, segregation, or universal exchange practice.

6. **Deposit "Pending" - Unconfirmed Transaction** | Coinbase Help

   * URL: [https://help.coinbase.com/en/exchange/crypto-transfers/deposit-pending-unconfirmed-transaction](https://help.coinbase.com/en/exchange/crypto-transfers/deposit-pending-unconfirmed-transaction)
   * Updated: Not displayed
   * Accessed: July 30, 2026
   * Supports: Coinbase Exchange's current statement that Bitcoin deposits require two network confirmations in this product context.
   * Limitation: The threshold is mutable provider policy, not a Bitcoin rule, absolute-finality guarantee, or industry standard; the provider's status wording does not eliminate reorganization risk.

7. **How long until my crypto deposit reaches my account?** | Gemini Support

   * URL: [https://support.gemini.com/hc/en-gb/articles/205424836-How-long-until-my-crypto-deposit-reaches-my-account](https://support.gemini.com/hc/en-gb/articles/205424836-How-long-until-my-crypto-deposit-reaches-my-account)
   * Updated: Not displayed
   * Accessed: July 30, 2026
   * Supports: Gemini's current statement that Bitcoin deposits become available for trading after three confirmations.
   * Limitation: The threshold is mutable provider policy and does not establish withdrawal availability, safety, or a universal practice.

8. **Cryptocurrency deposit statuses** | Kraken Support

   * URL: [https://support.kraken.com/articles/360000674066-cryptocurrency-deposit-statuses](https://support.kraken.com/articles/360000674066-cryptocurrency-deposit-statuses)
   * Updated: May 5, 2026
   * Accessed: July 30, 2026
   * Supports: Kraken's stated distinction among pending, credited, successful, and on-hold deposit states, including a credited state that permits trading but not withdrawal.
   * Limitation: These are Kraken user-interface states and do not establish how every asset, account, product, or exchange behaves.

9. **Cryptocurrency deposit processing times** | Kraken Support

   * URL: [https://support.kraken.com/articles/203325283-cryptocurrency-deposit-processing-times](https://support.kraken.com/articles/203325283-cryptocurrency-deposit-processing-times)
   * Updated: May 11, 2026
   * Accessed: July 30, 2026
   * Supports: Kraken's current provider-specific Bitcoin confirmation requirement and the need to date confirmation-policy claims.
   * Limitation: The article does not rely on Kraken's numeric threshold; the page is retained to document source renewal and does not establish a Bitcoin rule.

10. **Exchange Matching Engine** | Coinbase Developer Documentation

    * URL: [https://docs.cdp.coinbase.com/exchange/concepts/matching-engine](https://docs.cdp.coinbase.com/exchange/concepts/matching-engine)
    * Updated: Not displayed
    * Accessed: July 30, 2026
    * Supports: Coinbase Exchange's stated continuous order book and price-time-priority matching behavior.
    * Limitation: It is provider documentation, not independent proof of execution quality, liquidity, fairness, or another venue's design.

11. **Get all fills** | Coinbase Developer Documentation

    * URL: [https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/orders/get-all-fills](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/orders/get-all-fills)
    * Updated: Not displayed
    * Accessed: July 30, 2026
    * Supports: Coinbase Exchange fill records, including a trade identifier, price, size, fee, timestamp, side, and a `settled` field indicating whether funds have been exchanged and settled.
    * Limitation: It does not disclose Coinbase's complete internal architecture, the exact ledger entries used for settlement, or a universal exchange-ledger model.

12. **How to Transfer Funds Between Accounts Using Counterparty Transfers** | Coinbase Help

    * URL: [https://help.coinbase.com/en/exchange/crypto-transfers/counterparty-transfers](https://help.coinbase.com/en/exchange/crypto-transfers/counterparty-transfers)
    * Updated: Not displayed
    * Accessed: July 30, 2026
    * Supports: Coinbase's stated institutional counterparty-transfer feature as off-chain and independent of blockchain confirmations.
    * Limitation: The statement applies to that named feature and does not establish that every internal or Coinbase transfer is off-chain.

13. **Are there withdrawal minimums and fees?** | Coinbase Help

    * URL: [https://help.coinbase.com/en/exchange/crypto-transfers/are-there-withdrawal-minimums-and-fees](https://help.coinbase.com/en/exchange/crypto-transfers/are-there-withdrawal-minimums-and-fees)
    * Updated: Not displayed
    * Accessed: July 30, 2026
    * Supports: Coinbase Exchange's stated use of transaction batching and the possible difference between estimated customer charges and the final network fee it pays.
    * Limitation: It does not establish a universal batching method, fee formula, timing, or customer outcome.

14. **Exchange fees** | Coinbase Help

    * URL: [https://help.coinbase.com/en/exchange/trading-and-funding/exchange-fees](https://help.coinbase.com/en/exchange/trading-and-funding/exchange-fees)
    * Updated: Not displayed
    * Accessed: July 30, 2026
    * Supports: Coinbase Exchange's current maker-taker model and volume-based tiering.
    * Limitation: Fee percentages and tiers are mutable and do not establish total execution cost, liquidity, solvency, or an industry standard.

15. **Updated Guidance on Custodial Structures for Customer Protection in the Event of Insolvency** | New York State Department of Financial Services

    * URL: [https://www.dfs.ny.gov/industry-guidance/industry-letters/il20250930-updated-guidance-custodial-structures](https://www.dfs.ny.gov/industry-guidance/industry-letters/il20250930-updated-guidance-custodial-structures)
    * Published: September 30, 2025
    * Accessed: July 30, 2026
    * Supports: Within its scope, supervised custodians may use separate or qualifying omnibus on-chain structures supported by customer-level records and must maintain required segregation and accounting.
    * Limitation: The guidance applies within NYDFS supervision and does not describe every exchange, jurisdiction, legal relationship, or solvency condition.

16. **Crypto Asset Custody Basics for Retail Investors - Investor Bulletin** | SEC Office of Investor Education and Assistance

    * URL: [https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/crypto-asset-custody-basics-retail-investors-investor-bulletin-0](https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/crypto-asset-custody-basics-retail-investors-investor-bulletin-0)
    * Published: December 12, 2025
    * Accessed: July 30, 2026
    * Supports: The distinction between self-custody and third-party custody, common hot and cold storage labels, and custody-related operational and insolvency questions.
    * Limitation: This is SEC staff investor education, not a Commission rule, provider assessment, or guarantee that any custody model is safe.

17. **Why is my account restricted?** | Kraken Support

    * URL: [https://support.kraken.com/articles/why-is-my-account-restricted](https://support.kraken.com/articles/why-is-my-account-restricted)
    * Updated: July 8, 2026
    * Accessed: July 30, 2026
    * Supports: Kraken's stated reasons and processes for restricting account services, funding, or withdrawals.
    * Limitation: It is provider policy, not a universal exchange practice or a complete statement of applicable law or individual outcomes.

18. **Terms of Service** | Kraken

    * URL: [https://www.kraken.com/legal](https://www.kraken.com/legal)
    * Updated: Not displayed
    * Accessed: July 30, 2026
    * Supports: Kraken's current use of separate global, Canadian, European Economic Area, and Brazilian terms.
    * Limitation: The index does not determine which entity, terms, protections, or laws apply without the customer's location, product, and facts.

19. **Application of FinCEN's Regulations to Persons Administering, Exchanging, or Using Virtual Currencies** | Financial Crimes Enforcement Network

    * URL: [https://www.fincen.gov/resources/statutes-regulations/guidance/application-fincens-regulations-persons-administering](https://www.fincen.gov/resources/statutes-regulations/guidance/application-fincens-regulations-persons-administering)
    * Published: March 18, 2013
    * Accessed: July 30, 2026
    * Supports: FinCEN's activity-based analysis under which certain administrators and exchangers of convertible virtual currency are money transmitters.
    * Limitation: The guidance is U.S.-specific, does not resolve every business model, and must be read with later law and guidance.

20. **Regulation (EU) 2023/1114 on Markets in Crypto-assets** | European Parliament and Council of the European Union; EUR-Lex

    * URL: [https://eur-lex.europa.eu/eli/reg/2023/1114/2024-01-09/eng](https://eur-lex.europa.eu/eli/reg/2023/1114/2024-01-09/eng)
    * Published: May 31, 2023; consolidated text dated January 9, 2024
    * Accessed: July 30, 2026
    * Supports: Within its scope, MiCA obligations for crypto-asset custody and trading-platform operations, including client records, segregation, operating rules, and settlement procedures.
    * Limitation: It is European Union law, not global law, and does not prove provider authorization, compliance, security, liquidity, or solvency.

21. **Provisions: Privacy-preserving Proofs of Solvency for Bitcoin Exchanges** | Gaby G. Dagher, Benedikt Bunz, Joseph Bonneau, Jeremy Clark, and Dan Boneh

    * URL: [https://eprint.iacr.org/2015/1008](https://eprint.iacr.org/2015/1008)
    * Published: 2015; revised October 26, 2015
    * Accessed: July 30, 2026
    * Supports: A cryptographic method can provide defined evidence relating committed customer liabilities to exchange-controlled reserves while preserving specified privacy properties.
    * Limitation: The paper does not prove that a provider implemented the method correctly or establish complete liabilities, controls, legal ownership, ongoing solvency, or future withdrawals.

22. **Investor Advisory: Exercise Caution With Third-Party Verification/Proof of Reserve Reports** | Public Company Accounting Oversight Board Office of the Investor Advocate

    * URL: [https://pcaobus.org/news-events/news-releases/news-release-detail/investor-advisory-exercise-caution-with-third-party-verification-proof-of-reserve-reports](https://pcaobus.org/news-events/news-releases/news-release-detail/investor-advisory-exercise-caution-with-third-party-verification-proof-of-reserve-reports)
    * Published: March 8, 2023
    * Accessed: July 30, 2026
    * Supports: Proof-of-reserves reports are not financial-statement audits and may omit liabilities, borrowing, rights and obligations, internal controls, governance, and changes after the measurement date.
    * Limitation: The advisory does not evaluate every cryptographic method or determine a specific exchange's complete financial condition.

23. **Payment Processing** | Bitcoin developer documentation

    * URL: [https://developer.bitcoin.org/devguide/payment_processing.html](https://developer.bitcoin.org/devguide/payment_processing.html)
    * Updated: Not displayed
    * Accessed: July 30, 2026
    * Supports: Broadcast does not ensure block inclusion; a transaction gains one confirmation for the block that includes it and one more as each subsequent block is added.
    * Limitation: Educational documentation describing Bitcoin and Bitcoin Core concepts; it does not set an exchange's acceptance threshold or guarantee irreversible settlement.

24. **Application of FinCEN's Regulations to Certain Business Models Involving Convertible Virtual Currencies** | Financial Crimes Enforcement Network

    * URL: [https://www.fincen.gov/resources/statutes-regulations/guidance/application-fincens-regulations-certain-business-models](https://www.fincen.gov/resources/statutes-regulations/guidance/application-fincens-regulations-certain-business-models)
    * Issued: May 9, 2019
    * Accessed: July 30, 2026
    * Supports: FinCEN's consolidated explanation of how its existing Bank Secrecy Act regulations and earlier guidance apply to specified convertible-virtual-currency business models.
    * Limitation: This is U.S. agency guidance, not a universal classification, license determination, or statement of other federal or state law; application remains activity- and facts-specific.

25. **Account Structure** | Coinbase Developer Documentation

    * URL: [https://docs.cdp.coinbase.com/exchange/concepts/structure](https://docs.cdp.coinbase.com/exchange/concepts/structure)
    * Updated: Not displayed
    * Accessed: July 30, 2026
    * Supports: Coinbase Exchange's stated use of profile-specific, asset-specific accounts and account ledgers that record transfers, trades, fees, holds, and related financial events.
    * Limitation: Provider documentation establishes Coinbase's stated account model only and does not independently prove ledger accuracy, asset segregation, control effectiveness, or solvency.

26. **Download Bitcoin Core** | Bitcoin Core project

    * URL: [https://bitcoincore.org/en/download/](https://bitcoincore.org/en/download/)
    * Updated: Not displayed
    * Accessed: July 30, 2026
    * Supports: The official project download page identified Bitcoin Core 31.1 as the latest release at review time.
    * Limitation: The guide contains no version-specific Bitcoin Core behavior claim; the release check does not establish exchange behavior, network-wide adoption, or a Bitcoin consensus rule.

## 5. SEO title

How Bitcoin Exchanges Work: Trading, Custody, and Settlement

## 6. Meta description

Learn how Bitcoin exchanges connect deposits, internal ledgers, order books, custody, withdrawals, and on-chain settlement, and where their risks begin.

## 7. Page excerpt

Bitcoin exchanges combine customer accounts, internal ledgers, trading systems, custody operations, and Bitcoin transactions. Learn what happens between a deposit, a trade, and an external withdrawal, and why an exchange balance is not private-key control.

## 8. Estimated reading time

9 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

* Previous: MSC-GUIDE-072 | What Bitcoin Infrastructure Companies Do
* Next: MSC-GUIDE-074 | How Bitcoin Wallet Providers Operate
* Prerequisite: MSC-GUIDE-005 | What Is a Bitcoin Wallet?
* Prerequisite and branch: MSC-GUIDE-006 | What Is Bitcoin Self-Custody?
* Related: MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
* Related: MSC-GUIDE-011 | How to Keep Bitcoin Secure
* Related: MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
* Related: MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?
* Return: MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem
* Primary path: MSC-PATH-ECOSYSTEM | Explore the Ecosystem
* Secondary path: MSC-PATH-SAFE | Use Bitcoin Safely

## 10. Accuracy review checklist

* [x] Registry metadata, H1, handle, category, subcategory, depth, format, and learning paths match the approved registry.
* [x] The package remains within Guide 073 and the assigned general-reader intent.
* [x] Bitcoin consensus, local node policy, on-chain settlement, exchange implementation, internal accounting, business policy, and legal obligations remain distinct.
* [x] Deposit-address assignment, detection, confirmation policy, internal credit, trading, internal transfers, custody, withdrawal review, batching, signing, broadcast, and confirmation are treated as separate processes.
* [x] No confirmation threshold is presented as a Bitcoin rule or universal exchange standard.
* [x] Internal balances are not presented as customer-specific UTXOs or private-key control.
* [x] Centralized-exchange trades and internal transfers are not presented as individual Bitcoin transactions.
* [x] Named providers illustrate attributed product behavior and are not recommendations, rankings, or independent proof of security, liquidity, reserves, solvency, or compliance.
* [x] Hot, warm, cold, reserve, settlement, liquidity, and custody terminology is not presented as universally standardized.
* [x] Proof of reserves is not equated with an audit, complete liabilities, ongoing solvency, or future withdrawal availability.
* [x] Regulation is not equated with safety, liquidity, solvency, or suitability.
* [x] Jurisdiction, responsible entity, account restrictions, counterparty risk, custody risk, operational risk, and solvency are addressed.
* [x] Source notes use direct URLs, consistent naming, access dates, exact support, and evidentiary limitations.
* [x] Planned internal links remain inactive plain text and contain no assigned URLs.
* [x] Exactly three illustration briefs remain PLANNED.
* [x] Human Verification is complete.
* [x] Accuracy Review is approved.
* [ ] Copy Lock is approved.
* [ ] Publication-time source renewal is complete.

## 11. Human verification

* Reviewer: Mempool Surf Club Accuracy Review
* Review date: July 30, 2026
* Primary evidence reviewed: Current `main`, the approved master-registry record, the unique content-manifest record, the current guide template and editorial workflow, and copy-locked Guides 069–072; Bitcoin developer documentation for transactions, UTXOs, independent validation, policy, broadcast, block inclusion, and confirmation counting; the official Bitcoin Core download page, which identified 31.1 as the latest release at review time; CFTC and Investor.gov market-structure material; current Coinbase Exchange, Gemini, and Kraken documentation; NYDFS custody guidance; SEC staff custody education; FinCEN's 2013 and 2019 guidance; Regulation (EU) 2023/1114; the Provisions paper; and the PCAOB Office of the Investor Advocate advisory.
* Verification method: Reopened each material source directly on July 30, 2026; matched each claim to the exact product, entity, jurisdiction, document type, and evidentiary scope; separated Bitcoin consensus from local node policy, provider implementation, internal accounting, provider contracts, supervisory guidance, agency guidance, staff education, research claims, and binding law; and removed or narrowed detail that the source did not establish.
* Evidence classification: Bitcoin developer and Bitcoin Core materials were used for protocol and implementation context only. CFTC and Investor.gov materials were used for general market structure. Coinbase, Gemini, and Kraken pages were treated only as provider-stated behavior or terms. The NYDFS industry letter was treated as supervisory guidance for covered New York custodians. The SEC bulletin was treated as staff investor education with no legal force. FinCEN documents were treated as U.S. agency guidance under the Bank Secrecy Act. MiCA was treated as binding European Union law within its scope. Provisions was treated as a research paper describing a defined cryptographic method. The PCAOB material was treated as an Office of the Investor Advocate staff advisory, not a Board rule.
* Mutable claims renewed: Coinbase Exchange changing deposit-address behavior and two-confirmation Bitcoin policy; Gemini's three-confirmation Bitcoin trading-availability policy; Kraken's four-confirmation processing page and its distinct Pending, Credited, Successful, and On hold states; Coinbase Exchange price-time-priority matching, fill fields and settlement-status field, institutional Counterparty Transfers, withdrawal batching, and maker-taker fees; Kraken's July 8, 2026 restriction page and regional terms; the September 30, 2025 NYDFS guidance; the December 12, 2025 SEC staff custody bulletin; the current FinCEN guidance pages; the current EUR-Lex MiCA text; the Provisions record and paper; the PCAOB advisory; and Bitcoin Core 31.1 as the current official release at review time.
* Conflicts found and resolution: The package's Coinbase fill sentence inferred that settlement credits counterparties, but the current fills documentation only establishes fill records and whether funds have been exchanged and settled; the sentence and source note were narrowed. The earlier reported Kraken three-versus-four confirmation conflict was not reproduced: the current processing page states four confirmations, while the status page separately establishes credited-versus-successful states; no Kraken numeric threshold is used in the article. Coinbase and Kraken support pages use strong irreversibility language; the guide does not adopt that language as an absolute Bitcoin-consensus guarantee. FinCEN's 2013 guidance was supplemented with its 2019 consolidated guidance so the U.S. summary is not presented as resting on the 2013 document alone.
* Remaining sensitivities: Deposit thresholds, status labels, matching rules, fee schedules, restrictions, terms, custody labels, provider entities, service regions, proof-of-reserves procedures, software releases, and legal obligations can change. Provider documentation does not independently establish security, liquidity, asset ownership, ledger accuracy, reserves, solvency, legal compliance, or future withdrawal availability. Legal applicability remains entity-, product-, jurisdiction-, and facts-specific.
* Unresolved source conflicts: None material after correction.
* Publication-time renewal requirements: Recheck Bitcoin Core's official latest release; Coinbase Exchange and Gemini Bitcoin deposit requirements; Kraken processing and status pages; Coinbase matching, fills, Counterparty Transfers, batching, account structure, and fees; Kraken restrictions and regional terms; whether NYDFS or SEC staff materials have been superseded; current FinCEN guidance; the current consolidated MiCA text and application dates; the Provisions record; and the PCAOB advisory. Renew every mutable provider or legal claim immediately before publication.
* Authorization boundary: Human Verification and Accuracy Review are complete for this response-only package. This record does not authorize or perform a registry or manifest status change, repository file creation, branch, commit, pull request, Copy Lock, URL assignment, link activation, illustration generation, implementation, publication, or deployment.

## 12. Illustration brief

### Illustration 1

* Concept title: Exchange Systems Harbor
* Educational purpose: Show that an exchange is a connected collection of account, accounting, trading, custody, compliance, and Bitcoin-network systems rather than one ledger.
* Recommended placement: After the opening lifecycle in the Full article.
* Visual description: A vintage technical harbor diagram. A central exchange boundary contains separate structures for Customer Accounts, Internal Ledger, Order Book and Matching Engine, Risk Controls, Custody Operations, and Legal or Regulatory Boundary. Beyond the harbor wall, Bitcoin nodes and miners represent the external network. Internal data routes remain visually distinct from on-chain transaction routes.
* Required labels: Customer Account, Internal Ledger, Order Book, Matching Engine, Risk Controls, Custody, Business Policy, Legal or Regulatory Boundary, Bitcoin Network, On-Chain Transaction
* Caption: A centralized exchange connects multiple internal systems to Bitcoin, but Bitcoin consensus does not operate or verify the exchange's customer ledger.
* Alt text: Technical harbor illustration showing customer accounts, an internal ledger, a matching engine, custody, and risk controls inside an exchange boundary connected separately to the Bitcoin network.
* Image orientation: Landscape
* Mobile crop notes: Keep the exchange boundary, Internal Ledger, Custody, and Bitcoin Network visible in the center crop. Secondary labels may stack vertically.
* Status: PLANNED

### Illustration 2

* Concept title: Deposit, Trade, and Withdrawal Boundaries
* Educational purpose: Trace the exchange lifecycle while distinguishing Bitcoin-network events from internal database events and business-policy decisions.
* Recommended placement: After Why most centralized-exchange trades are off-chain.
* Visual description: A left-to-right nautical route chart divided into Bitcoin Network, Exchange Systems, and Customer Account zones. A deposit enters from the network, passes through detection and confirmation policy, and becomes an internal credit. An order execution changes internal balances without crossing the network boundary. A withdrawal passes through review, queue, transaction construction, signing, broadcast, and block inclusion.
* Required labels: Deposit, Detection, Confirmations, Exchange Policy, Internal Credit, Order Execution, Internal Ledger Change, Withdrawal Request, Review or Queue, Transaction Construction, Signing, Broadcast, Block Inclusion, On-Chain Settlement, Off-Chain
* Caption: Deposits and withdrawals cross the Bitcoin-network boundary. Most centralized-exchange trades remain internal ledger events.
* Alt text: Three-layer flow diagram tracing a Bitcoin deposit into an exchange account, an off-chain trade inside the exchange, and a withdrawal back to on-chain settlement.
* Image orientation: Wide landscape
* Mobile crop notes: Convert the route into a vertical sequence on small screens and preserve the three system zones through repeated labels and border styling.
* Status: PLANNED

### Illustration 3

* Concept title: What Proof of Reserves Can and Cannot Show
* Educational purpose: Prevent readers from treating a reserve demonstration as a complete audit or guarantee of solvency and withdrawal availability.
* Recommended placement: After the proof-of-reserves paragraph in Custody, counterparty, operational, and solvency risk.
* Visual description: A balanced vintage inspection chart with two separated panels. The first shows evidence a defined method may support: control of specified assets, inclusion in a liabilities commitment, and a point-in-time comparison. The second shows matters outside that evidence unless separately established: complete liabilities, borrowed or encumbered assets, legal ownership, internal controls, governance, ongoing solvency, and future withdrawals. Avoid scales or seals implying the exchange passed a complete assessment.
* Required labels: Defined Assets, Defined Liabilities Evidence, Point in Time, Complete Liabilities Not Automatically Shown, Encumbrances Not Automatically Shown, Controls Not Automatically Shown, Solvency Not Automatically Shown, Future Withdrawal Availability Not Guaranteed
* Caption: Proof-of-reserves methods can answer defined questions, but their conclusions do not automatically extend to liabilities, controls, solvency, or future access.
* Alt text: Two-panel technical chart contrasting evidence a proof-of-reserves method may provide with liabilities, controls, solvency, and future withdrawal availability it does not automatically establish.
* Image orientation: Landscape
* Mobile crop notes: Stack the Can Show and Cannot Automatically Show panels vertically without removing limitation labels.
* Status: PLANNED
