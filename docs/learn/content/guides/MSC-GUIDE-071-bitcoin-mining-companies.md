---
registry_id: MSC-GUIDE-071
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: How Bitcoin Mining Companies Operate
handle: bitcoin-mining-companies
category: Bitcoin Ecosystem
subcategory: Companies
depth: Shallow
format: Ecosystem Overview
primary_path: Explore the Ecosystem
secondary_paths:
  - Understand the Network
author_display: Mempool Surf Club Editorial
reviewed_date: null
copy_locked_date: null
---

# How Bitcoin Mining Companies Operate

## 1. Introductory deck

Bitcoin mining companies combine computing hardware, power contracts, sites, cooling, networking, software, labor, financing, and pool relationships into an industrial operation. Their economics depend on realized hashrate, network difficulty, transaction fees, bitcoin price, energy cost, equipment performance, and capital structure. A mining company is not the same as a mining pool or an ASIC manufacturer, and even a large share of network hashrate does not give one company unilateral authority over Bitcoin consensus.

## 2. Full article

A Bitcoin mining company operates or supports specialized computers that repeatedly hash block-header candidates. When a miner or its pool finds a valid block, the block can earn the subsidy and transaction fees if other nodes accept it under the consensus rules they enforce.

The protocol description is compact. The company operating around it is not. Industrial mining requires sites, power, transformers, switchgear, containers or buildings, cooling, network connectivity, ASIC miners, firmware, monitoring, repair, security, accounting, treasury management, and capital. A company may own all of these components, lease some, host machines for others, or contract with several counterparties.

This guide was researched on July 27, 2026. Company production, hashrate, capacity, power prices, pool relationships, equipment, financing, holdings, grid programs, and environmental claims change frequently. Current examples are company disclosures unless otherwise stated and must be renewed immediately before publication.

### A mining company is not a mining pool

A mining company generally owns, leases, hosts, manages, or operates physical mining equipment and facilities. A mining pool coordinates proof-of-work submissions from many miners, constructs or distributes mining jobs, measures shares, and allocates rewards under a payout method.

The same organization can participate in both roles, but the functions remain distinct. A company may point its machines to a third-party pool. A pool may coordinate machines owned by many unrelated operators. The pool’s reported share of found blocks is not necessarily the hashrate owned by the pool operator.

This distinction affects control. Pool software or operators may influence block-template construction, transaction selection, job distribution, and payout policy. Individual miners control whether to connect, subject to contracts and technical capability. Newer protocols and implementations can redistribute parts of template construction. None of these arrangements lets a miner or pool create blocks that violate the rules enforced by validating nodes and expect those blocks to be accepted.

Mining companies are also not necessarily ASIC manufacturers. A miner may buy hardware from one or more manufacturers, while an ASIC manufacturer may sell machines without operating a material self-mining fleet. Equipment supply, warranties, firmware, repair parts, and purchase deposits can still create concentrated dependencies.

### Self-mining

In self-mining, the company deploys machines for its own account and receives the economic result of the mining activity, subject to pool fees and other contracts.

The company’s gross mining revenue depends on the bitcoin it earns and the accounting value assigned when earned. The number of bitcoin produced depends on the company’s realized contribution to network hashrate, network difficulty, transaction fees, block subsidies, uptime, and pool payout structure. The value in dollars or another reporting currency also depends on bitcoin’s market price.

Self-mining costs can include:

- electricity;
- site rent or ownership costs;
- operations and maintenance;
- network and software;
- pool fees;
- labor and security;
- insurance;
- repairs and spare parts;
- equipment depreciation;
- taxes and regulatory costs; and
- corporate overhead.

A company may highlight a narrow “cost to mine” metric that excludes depreciation, corporate expenses, stock compensation, interest, or site-development costs. The metric can still be useful if the definition is clear. It should not be treated as the company’s complete economic cost.

### Hosting

In a hosting arrangement, a company provides power, space, cooling, network access, maintenance, or management for mining equipment owned by a customer. The host may charge a fixed fee, pass through electricity costs, share revenue, or combine structures.

Hosting changes the risk allocation. The customer may bear bitcoin-price and machine-performance risk while the host bears facility and service obligations. Contracts may address uptime, curtailment, repair, deposits, power-price changes, insurance, termination, and what happens if either party defaults.

A company can both self-mine and host. Segment reporting and contract disclosures help separate the revenue and costs. A machine physically located at a company site is not necessarily owned by the company. Likewise, a company-owned machine may be located at a third-party site.

Riot’s historical filings describe both self-mining and hosting activities, including changes to its hosting business. MARA’s 2025 Form 10-K describes owned and hosted sites and third-party arrangements. These are company disclosures about particular periods, not a universal industry template.

### Power procurement is an operating foundation

Electricity is usually the largest direct input. Mining companies obtain it through utility tariffs, retail contracts, power-purchase agreements, behind-the-meter generation, joint ventures, site ownership, or other structures.

The quoted energy price may not include transmission, demand charges, congestion, taxes, capacity payments, curtailment effects, or infrastructure costs. A low headline rate at one facility should not be generalized across a fleet.

Power contracts can be:

- fixed-price or variable;
- long-term or short-term;
- firm or interruptible;
- indexed to a wholesale market;
- linked to a generation asset;
- subject to demand-response programs; or
- limited by interconnection and local grid conditions.

Mining is unusually flexible compared with some industrial loads because machines can be reduced or switched off. That flexibility can support grid programs or reduce exposure during high prices. It can also reduce production. Curtailment payments or power credits should be reported separately from bitcoin production so readers can see whether revenue came from mining or from changing electricity consumption.

### Site development is more than buying miners

A site may require land rights, permits, interconnection studies, substations, transformers, transmission upgrades, switchgear, buildings or containers, cooling, fiber, fire protection, security, and trained staff.

Capacity passes through stages:

1. **Contracted or planned capacity** may exist in an agreement or development plan.
2. **Nameplate capacity** describes a designed maximum under specified conditions.
3. **Developed capacity** may mean infrastructure is built to a company-defined stage.
4. **Energized capacity** means power is available to equipment.
5. **Deployed capacity** means machines are installed.
6. **Operational capacity** means machines are actually running, subject to downtime and curtailment.

Companies do not use these terms identically. The filing or production report must define the measure. Announcing a future site or megawatt target does not prove the capacity is financed, built, interconnected, energized, or productive.

Development can be delayed by equipment, weather, permitting, utility work, transmission, financing, or contractor performance. Capital can remain tied up before any bitcoin is produced.

### Hardware acquisition and fleet economics

ASIC miners convert electricity into hashes. Their economic value depends on hashrate, energy efficiency, reliability, price, delivery timing, useful life, firmware, and the conditions at the site.

Mining companies may purchase machines with cash, debt, equity, bitcoin, deposits, purchase commitments, or vendor financing. Large orders can require substantial prepayments months before delivery. The buyer may face supplier concentration, shipping delays, tariffs, defects, warranty disputes, or technology obsolescence.

A fleet is rarely uniform. Different models have different power requirements and efficiency. Some machines may be installed but offline. Others may be held in inventory, under repair, or pledged. A count of “owned miners” is not the same as miners operating.

Depreciation allocates equipment cost over an estimated useful life. The estimate affects reported expense but does not determine physical performance. A machine can remain usable after its accounting life or become uneconomic earlier because difficulty, power prices, failure rates, or newer hardware changed.

CleanSpark’s 2025 Form 10-K, for example, distinguishes miners in service from owned units and reports company-defined operational hashrate. MARA and Riot also disclose fleets, commitments, depreciation, and equipment risks. The measures should be compared only after definitions and dates are aligned.

### Firmware, fleet management, and maintenance

Firmware controls how an ASIC operates. Fleet software monitors hashrate, temperature, fans, power, errors, pools, and availability. Operators may tune machines for efficiency, output, or site conditions.

Changing firmware can affect warranties, security, stability, and performance. Remote-management systems can become high-value targets because they can alter configurations or redirect hashrate. Access controls, signed updates, network segmentation, logging, and incident response matter.

Maintenance includes cleaning, fan and power-supply replacement, board repair, cable and network work, cooling-system service, and inventory management. Failure rates can rise with heat, dust, humidity, voltage conditions, or aggressive tuning.

A company’s installed fleet can therefore produce less than its nameplate capability. Realized performance reflects both machine efficiency and operational discipline.

### Pool relationships and revenue allocation

Bitcoin’s developer documentation explains solo and pooled mining. In a pool, miners submit lower-difficulty shares as evidence of contributed work. The pool uses a payout method to distribute value, while a valid network block must still satisfy Bitcoin’s target and consensus rules.

Pool arrangements differ in:

- who builds the block template;
- which transactions are included;
- how shares are measured;
- whether payouts are pay-per-share, full-pay-per-share, proportional, or another model;
- pool fees;
- payout timing and minimums;
- reserve and counterparty risk;
- orphan or stale-block treatment; and
- whether miners can select or construct templates.

Stratum V2 specifications, protocol libraries, and application repositories document ongoing work on mining communication, including job negotiation. As of July 27, 2026, the `sv2-apps` repository describes its application-level crates as alpha. Public specification or implementation availability does not prove that a mining company or pool has deployed every component or feature.

A company should disclose material pool concentration and settlement exposure. Mining through a pool can reduce payout variance, but it adds operational and counterparty dependence.

### Hashrate metrics are not interchangeable

Hashrate is a rate of hashing attempts, commonly expressed in hashes per second and large multiples such as terahashes or exahashes per second. Company reports use several related measures.

- **Nameplate hashrate** is a designed or rated capability under assumptions.
- **Installed hashrate** usually refers to machines placed at sites.
- **Deployed hashrate** may refer to installed and available equipment under a company definition.
- **Operational hashrate** usually refers to active capacity at a date.
- **Average operating hashrate** averages performance over a period.
- **Realized hashrate** can be inferred from accepted pool shares or production and may capture downtime and variance.
- **Network hashrate** is an estimate derived from block production and difficulty, not a direct meter of every machine.

Riot’s 2025 Form 10-K explicitly defines “deployed hash rate” and “average operating hash rate” differently. That is why a headline number cannot be compared safely without the definition, date, and averaging period.

A company’s share of estimated network hashrate can affect expected production and concentration analysis. It does not create unilateral consensus authority. Miners propose blocks. Independently operated nodes decide whether those blocks satisfy the rules they enforce.

### Revenue, costs, and operating leverage

Mining revenue can be volatile because several variables move at once.

The block subsidy changes at protocol-defined intervals. Transaction fees vary with block-space demand. Network difficulty adjusts based on block timing. Bitcoin price changes the reporting-currency value of rewards. Power, maintenance, pool fees, and uptime affect cost and output.

A simplified operating view is:

**bitcoin earned × market value at recognition**
minus
**power + pool + site operating costs**
before
**depreciation + corporate overhead + financing + taxes**

The simplification is not an accounting formula. It shows why a company can report improving production while cash generation weakens, or lower production while benefiting from power credits or higher bitcoin prices.

Operating leverage can be strong. Once a site and fleet are built, changes in bitcoin price, difficulty, fees, or power cost can move margins quickly. High fixed costs and debt can amplify stress.

Readers should compare revenue with cash from operations, capital expenditures, equipment commitments, debt maturities, share issuance, and depreciation. Earnings affected by fair-value changes in held bitcoin should be separated from mining operations.

### Curtailment and grid programs

Curtailment means reducing load. A mining company may curtail voluntarily because power prices are high, under a utility agreement, in response to grid conditions, or through a demand-response program.

Benefits can include avoided energy expense, power credits, demand-response payments, or improved grid flexibility. Costs include reduced hashing and lower expected bitcoin production. The net result depends on contract terms, market prices, timing, and machine restart performance.

Riot’s filings describe participation in power markets and curtailment-related credits under its arrangements in Texas. Those company disclosures establish the reported program and accounting treatment for the period. They do not prove a universal grid benefit, nor do they establish how every local grid would respond.

Claims such as “mining stabilizes the grid” or “mining wastes energy” are too broad without a defined site, market, counterfactual, time period, and methodology.

### Treasury and financing decisions

A mining company decides whether to sell mined bitcoin, retain it, pledge it, borrow against it, or use it to acquire equipment and services. These choices can matter as much as site efficiency.

Selling bitcoin can fund power, payroll, taxes, debt, and expansion. Retaining bitcoin increases price exposure and may support financing, but it does not create operating cash. Pledging bitcoin or equipment can introduce collateral risk.

Mining companies frequently use common-stock issuance because the business is capital intensive. They may also use equipment finance, leases, convertible notes, secured loans, joint ventures, or purchase credits. Share issuance can fund growth while diluting existing holders.

A company can report growing hashrate and bitcoin reserves while depending on continued capital-market access. The financial statements should be read with the fleet and production reports.

### Jurisdictional and environmental exposure

Mining is tied to physical locations. Local law, power-market design, land use, noise, water, taxes, labor, transmission, climate, and political decisions can affect operations.

Energy-source claims require careful boundaries. A facility may contract with a renewable generator while drawing from a mixed grid. A company may report a percentage based on contracts, certificates, modeled generation, or direct supply. “Carbon neutral,” “zero-carbon,” “renewable,” and “low-carbon” are not interchangeable.

An emissions claim should state:

- which sites and time period are covered;
- whether the boundary is operational electricity, full lifecycle, or another scope;
- whether the result uses location-based or market-based accounting;
- which generation data, certificates, offsets, or assumptions are used;
- whether embodied hardware and construction are included; and
- who prepared or assured the calculation.

Company sustainability reports are self-reported unless independently assured within a stated scope. Even an assurance report has materiality and methodology limits.

### Production updates are disclosures, not independent measurement

Many mining companies publish monthly production reports. These can provide timely figures for bitcoin produced, bitcoin sold, holdings, deployed hashrate, fleet size, power, and curtailment.

The reports are useful, but they are usually prepared by the company and may contain non-GAAP or company-defined metrics. A press release does not receive the same audit work as annual financial statements. Estimates may later be revised.

A careful summary should say “the company reported” and preserve the date and definition. It should not convert self-reported production into independently verified fact.

### How to evaluate a mining company

Ask:

1. Does the company self-mine, host, operate a pool, manufacture equipment, or combine roles?
2. Which sites and legal entities are included?
3. Which power capacity is planned, contracted, developed, energized, and operational?
4. Which hashrate measure is reported, at what date, and over what period?
5. How many machines are owned, installed, active, offline, hosted, or pledged?
6. Which manufacturers, firmware, pools, utilities, and sites create concentration?
7. What does the company’s cost metric include and exclude?
8. How much capital is required for expansion and replacement?
9. How are equipment life and depreciation estimated?
10. How are curtailment credits and mining revenue separated?
11. Does the company sell, hold, or pledge mined bitcoin?
12. Which figures are audited, filed, self-reported, estimated, or forward-looking?
13. What methodology supports energy and emissions claims?
14. Which authority can change company policy, and which independent actors enforce Bitcoin rules?

Mining companies are industrial operators within Bitcoin’s incentive system. Their importance is real but bounded. They compete through power, sites, hardware, operations, capital, and execution. They do not own the protocol.

## 3. Key Terms

- **Self-mining:** Operating mining equipment for the company’s own economic account.
- **Hosting:** Providing site, power, cooling, network, maintenance, or management services for another party’s miners.
- **Mining pool:** Coordinator that distributes work, measures contributed shares, and allocates payouts among miners.
- **ASIC manufacturer:** Company that designs or produces application-specific mining hardware; distinct from a mining operator.
- **Nameplate capacity:** Designed maximum capability under stated assumptions.
- **Energized capacity:** Infrastructure or equipment with electrical power available.
- **Operational hashrate:** Company-defined measure of hashing capability operating at a date or during a period.
- **Realized hashrate:** Effective work reflected in accepted shares or production, subject to measurement and variance.
- **Network hashrate:** Estimate of total hashing rate derived from network difficulty and observed block timing.
- **Curtailment:** Reduction of electrical load under operational, market, utility, or grid conditions.
- **Fleet efficiency:** Hashing output relative to power consumption, usually measured for defined equipment and conditions.
- **Depreciation:** Accounting allocation of equipment or infrastructure cost over an estimated useful life.

## 4. Sources

1. **Bitcoin Developer Guide: Mining** | Bitcoin.org developer documentation contributors
   - URL: https://developer.bitcoin.org/devguide/mining.html
   - Accessed: July 27, 2026
   - Supports: Technical description of solo and pooled mining, block templates, share work, reward allocation, and the distinction between pool coordination and valid network blocks.
2. **Riot Platforms, Inc. 2025 Form 10-K** | Riot Platforms, Inc.; U.S. Securities and Exchange Commission
   - URL: https://www.sec.gov/Archives/edgar/data/1167419/000110465926022322/riot-20251231x10k.htm
   - Filed: March 2, 2026
   - Accessed: July 27, 2026
   - Supports: Company-defined deployed and average operating hashrate, self-mining, power strategy, site development, curtailment, equipment, costs, depreciation, financing, and risk disclosures.
3. **Riot Platforms, Inc. First-Quarter 2026 Form 10-Q** | Riot Platforms, Inc.; U.S. Securities and Exchange Commission
   - URL: https://www.sec.gov/Archives/edgar/data/1167419/000110465926053120/riot-20260331x10q.htm
   - Filed: April 30, 2026
   - Accessed: July 27, 2026
   - Supports: Interim company disclosures about mining revenue, power credits, fleet operations, bitcoin, costs, assets, and financing for the quarter ended March 31, 2026.
4. **MARA Holdings, Inc. 2025 Form 10-K** | MARA Holdings, Inc.; U.S. Securities and Exchange Commission
   - URL: https://www.sec.gov/Archives/edgar/data/1507605/000150760526000007/mara-20251231.htm
   - Filed: March 2, 2026
   - Accessed: July 27, 2026
   - Supports: Company disclosures about owned and hosted sites, self-mining, mining pools, energy, equipment, depreciation, bitcoin production, holdings, financing, and operational risks.
5. **MARA First-Quarter 2026 Shareholder Letter, Exhibit 99.1 to Form 8-K** | MARA Holdings, Inc.; U.S. Securities and Exchange Commission
   - URL: https://www.sec.gov/Archives/edgar/data/1507605/000150760526000014/q126shareholderletter.htm
   - Furnished: May 11, 2026
   - Accessed: July 27, 2026
   - Supports: Dated company-reported production, energized hashrate, site and energy developments, financial results, and management-defined metrics. The letter was furnished under Item 2.02 rather than deemed filed and establishes company reporting, not independent verification.
6. **CleanSpark, Inc. 2025 Form 10-K** | CleanSpark, Inc.; U.S. Securities and Exchange Commission
   - URL: https://www.sec.gov/Archives/edgar/data/827876/000119312525297510/clsk-20250930.htm
   - Filed: November 25, 2025
   - Accessed: July 27, 2026
   - Supports: Company disclosures about self-mining, miners in service versus owned, operational hashrate, energy, sites, pool activity, equipment, depreciation, financing, and risks.
7. **Stratum V2 Specifications** | Stratum Mining contributors
   - URL: https://github.com/stratum-mining/sv2-spec
   - Accessed: July 27, 2026
   - Supports: Current public specifications for mining communication, roles, channels, work negotiation, and job negotiation; does not establish universal deployment.
8. **Stratum V2 Applications and Reference Implementation** | Stratum Mining contributors
   - URL: https://github.com/stratum-mining/sv2-apps
   - Accessed: July 27, 2026
   - Supports: Current public application-level pool and miner components, releases, integration tests, and the repository’s stated alpha project status. It does not establish production deployment by any particular company or pool.
9. **Bitcoin Core Integration and Staging Tree** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin
   - Accessed: July 27, 2026
   - Supports: Independent block validation by node software and the boundary between miner block construction and consensus-rule enforcement.
10. **Strategy Inc. 2025 Form 10-K** | Strategy Inc.; U.S. Securities and Exchange Commission
    - URL: https://www.sec.gov/Archives/edgar/data/1050446/000105044626000020/mstr-20251231.htm
    - Filed: February 19, 2026
    - Accessed: July 27, 2026
    - Supports: Comparative treasury, custody, fair-value, financing, and risk disclosures used to separate holding bitcoin from industrial mining operations.
11. **Accounting Standards Update 2023-08: Crypto Assets** | Financial Accounting Standards Board
    - URL: https://fasb.org/Page/Document?pdf=ASU%202023-08.pdf&title=ACCOUNTING%20STANDARDS%20UPDATE%202023-08%E2%80%94Intangibles%E2%80%94Goodwill%20and%20Other%E2%80%94Crypto%20Assets%20%28Subtopic%20350-60%29
    - Published: December 2023
    - Supports: U.S. GAAP fair-value measurement and disclosure framework relevant to bitcoin held after mining, distinct from mining revenue and operating cash.
12. **SEC Filings and Forms** | U.S. Securities and Exchange Commission
    - URL: https://www.sec.gov/edgar/search-and-access
    - Accessed: July 27, 2026
    - Supports: Primary filing access for annual, quarterly, current, and exhibit records used to distinguish audited, interim, filed, furnished, and promotional company information.

## 5. SEO title

How Bitcoin Mining Companies Operate

## 6. Meta description

Learn how Bitcoin mining companies manage self-mining, hosting, power, sites, ASIC fleets, pools, hashrate, costs, curtailment, financing, and risk.

## 7. Page excerpt

Bitcoin mining companies coordinate industrial power, sites, hardware, software, pools, labor, and capital while remaining separate from pools, manufacturers, and Bitcoin consensus.

## 8. Estimated reading time

20 to 24 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-070 | How Bitcoin Startups Build and Compete
- Next: MSC-GUIDE-072 | What Bitcoin Infrastructure Companies Do
- Related: MSC-GUIDE-017 | How Bitcoin Mining Works
- Related: MSC-GUIDE-018 | How Bitcoin Mining Pools Work
- Related: MSC-GUIDE-019 | What Is an ASIC Miner?
- Related: MSC-GUIDE-020 | How Bitcoin's Difficulty Adjustment Works
- Related: MSC-GUIDE-026 | How Bitcoin Blocks Work
- Related: MSC-GUIDE-028 | What Is Bitcoin Hashrate?
- Related: MSC-GUIDE-029 | How Bitcoin Proof of Work Secures the Network
- Related: MSC-GUIDE-030 | How Bitcoin Reaches Consensus
- Related: MSC-GUIDE-065 | Who Builds on Bitcoin?
- Batch: MSC-GUIDE-069 | How Public Companies Participate in Bitcoin
- Batch: MSC-GUIDE-070 | How Bitcoin Startups Build and Compete
- Batch: MSC-GUIDE-072 | What Bitcoin Infrastructure Companies Do
- Upcoming: MSC-GUIDE-073 | How Bitcoin Exchanges Work
- Return: MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem
- Primary path: MSC-PATH-ECOSYSTEM | Explore the Ecosystem
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] Current company production, hashrate, capacity, power, equipment, pool, treasury, and financing claims are dated July 27, 2026 or tied to a dated primary record.
- [x] Filed facts, self-reported production, company-defined metrics, estimates, and forward-looking targets remain distinct.
- [x] Mining companies remain distinct from mining pools and ASIC manufacturers.
- [x] Self-mining remains distinct from hosting and customer-owned equipment.
- [x] Nameplate, planned, developed, energized, deployed, operational, average operating, realized, and network measures are not treated as interchangeable.
- [x] A company’s share of hashrate is not presented as unilateral consensus authority.
- [x] Power rates are bounded by contract terms, location, fees, dates, and market conditions.
- [x] Revenue, power credits, operating cost, depreciation, capital expenditure, financing, and bitcoin fair-value effects remain distinct.
- [x] Energy-source and emissions claims require defined sites, periods, accounting boundaries, and methodology.
- [x] Pool policy and block-template behavior remain distinct from node validation and Bitcoin consensus.
- [x] Commercial incentives, supplier concentration, pool dependence, site concentration, and financing risks are addressed.
- [x] Named companies are examples, not endorsements, rankings, or investment recommendations.
- [x] Planned internal links remain inactive.
- [x] Human Verification is complete for the specialist pass.
- [x] Publication-time renewal is required for all operational, financial, environmental, regulatory, and company-role claims.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: July 27, 2026
- Primary evidence reviewed: Riot Platforms, Inc. 2025 Form 10-K filed March 2, 2026 and first-quarter 2026 Form 10-Q filed April 30, 2026; MARA Holdings, Inc. 2025 Form 10-K filed March 2, 2026 and first-quarter 2026 shareholder letter furnished as Exhibit 99.1 to a May 11, 2026 Form 8-K; CleanSpark, Inc. 2025 Form 10-K filed November 25, 2025; Stratum V2 specifications, protocol-library repository, and current `sv2-apps` application repository; Bitcoin Core; FASB ASU 2023-08; SEC filing-access materials; and the cited mining technical documentation.
- Verification approach: Matched company legal names, CIKs, accessions, filing or furnished status, reporting periods, site and fleet boundaries, and each company-defined metric to its primary record. Separated self-mining, hosting, pools, manufacturers, customer-owned equipment, and site ownership; preserved planned, energized, deployed, operational, average operating, realized, and estimated network hashrate distinctions; and treated company reports, power credits, environmental claims, and shareholder letters as company-reported evidence rather than independent measurement. Mining template policy was checked separately from validating-node consensus enforcement.
- Material corrections made: Replaced the incorrectly characterized Stratum V2 “reference implementation” source, which now identifies itself as the low-level protocol-library repository, with the current `sv2-apps` application repository; stated the repository’s alpha status and limited deployment inference; identified MARA’s shareholder letter as Exhibit 99.1 furnished under Item 2.02 rather than deemed filed; added exact filing dates; and completed the Human Verification record.
- Remaining sensitivities: Production, holdings, fleet counts, site status, power prices, pool relationships, equipment ownership, and hashrate are time-sensitive and often company-defined. Interim figures and shareholder letters may be unaudited; network hashrate is estimated; “cost to mine” metrics can omit material expenses; curtailment and grid benefits depend on contract, site, market, and counterfactual; and energy-source or emissions claims depend on boundaries, certificates, models, offsets, and assurance scope. Contracts, litigation, financing, tariffs, permits, environmental rules, and operating conditions can change.
- Renewal requirement: Immediately before publication, recheck the newest annual, quarterly, current, and production reports; exact metric definitions and dates; site ownership and hosting status; planned, energized, deployed, operational, average operating, realized, and network hashrate figures; fleet ownership and operating counts; pools and payout terms; power contracts, credits, and curtailment programs; bitcoin production, sales, holdings, collateral, debt, equity issuance, capital expenditures, depreciation, and cash flow; Stratum V2 repository status and deployment evidence; and every environmental, grid, regulatory, and jurisdictional claim.
- Authorization boundary: Completed Human Verification does not authorize Editorial Manager acceptance, copy-lock, ready-for-review transition, merge, publication, deployment, illustration generation, activation of planned links, or Phase 20.

## 12. Illustration brief

### Illustration 1

- Concept title: The Industrial Mining Works
- Educational purpose: Map the physical and organizational systems required to operate a mining company.
- Recommended placement: After Self-mining.
- Visual description: Vintage industrial harbor cutaway connecting Power Source, Substation, Switchgear, Mining Hall, Cooling, Network, ASIC Fleet, Firmware Control Room, Repair Shop, Pool Connection, Treasury, and Finance Office. A separate offshore buoy labeled Validating nodes accepts or rejects the resulting block independently.
- Required labels: Power, Substation, Switchgear, Site, Cooling, Network, ASIC fleet, Firmware, Monitoring, Repair, Mining pool, Bitcoin rewards, Treasury, Financing, Validating nodes
- Caption: Industrial mining combines physical infrastructure, software, operations, and capital; finding a block still does not bypass independent validation.
- Alt text: Technical nautical-industrial diagram of a Bitcoin mining facility from power and ASICs through pool connection and independently validating nodes.
- Image orientation: Landscape
- Mobile crop notes: Use a left-to-right flow with validating nodes retained as a separate final stage.
- Status: PLANNED

### Illustration 2

- Concept title: Capacity and Hashrate Soundings Chart
- Educational purpose: Distinguish planned, nameplate, energized, deployed, operating, and realized capacity and hashrate.
- Recommended placement: After Hashrate metrics are not interchangeable.
- Visual description: Vintage depth-sounding chart with six horizontal bands. Planned capacity sits above the waterline, followed by designed nameplate, built infrastructure, energized equipment, operating fleet, and realized work below. Loss markers show delays, offline machines, curtailment, failures, and pool variance.
- Required labels: Planned, Nameplate, Developed, Energized, Deployed, Operational, Average operating, Realized, Offline, Curtailment, Failure, Pool variance, Network hashrate
- Caption: Each capacity and hashrate measure answers a different question; headline figures are comparable only when definitions and dates match.
- Alt text: Layered sounding chart showing how planned mining capacity narrows through energized and operating equipment to realized hashrate.
- Image orientation: Portrait
- Mobile crop notes: Preserve the vertical sequence and show loss markers on the right margin.
- Status: PLANNED

### Illustration 3

- Concept title: Mining Economics Tide Table
- Educational purpose: Show how revenue, operating costs, capital costs, and market variables interact.
- Recommended placement: After Revenue, costs, and operating leverage.
- Visual description: Vintage tide table with incoming variables—block subsidy, transaction fees, bitcoin price, network difficulty, and uptime—feeding bitcoin production. Outgoing channels show power, pool fees, labor, repairs, depreciation, capital expenditure, interest, and taxes. A separate inlet marks curtailment credits so it is not confused with mining output.
- Required labels: Block subsidy, Transaction fees, Bitcoin price, Difficulty, Uptime, Bitcoin produced, Power, Pool fees, Labor, Repairs, Depreciation, Capital expenditure, Interest, Taxes, Curtailment credits, Cash flow
- Caption: Mining economics reflect several moving variables, and a narrow production-cost metric does not capture the full company.
- Alt text: Tide-table diagram connecting Bitcoin mining revenue variables to operating costs, capital costs, curtailment credits, and cash flow.
- Image orientation: Landscape
- Mobile crop notes: Stack inputs above production and costs below, with curtailment credits visually separate.
- Status: PLANNED
