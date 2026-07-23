---
registry_id: MSC-GUIDE-039
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: What Is BRC-20 on Bitcoin?
handle: brc-20-bitcoin
category: Building on Bitcoin
subcategory: Digital Assets
depth: Deep
format: Technical Analysis
primary_path: Build on Bitcoin
secondary_paths:
  - Understand the Network
author_display: Mempool Surf Club Editorial
reviewed_date: null
copy_locked_date: null
---

# What Is BRC-20 on Bitcoin?

## 1. Introductory deck

BRC-20 is an experimental inscription and indexer convention for deriving fungible balances from deploy, mint, and transfer operations recorded in Bitcoin transactions. Learn how JSON operations, ordering, two-step transfers, confirmations, reorganizations, parser compatibility, UTXO handling, and custody work without treating BRC-20 as a native Bitcoin token standard.

## 2. Full article

BRC-20 began as an experiment in using Ordinal inscriptions and off-chain indexing rules to represent fungible units on Bitcoin. A participant inscribes JSON text describing a deploy, mint, or transfer operation. A BRC-20 indexer reads eligible inscriptions in Bitcoin's confirmed transaction order and calculates balances according to its supported rule set.

Bitcoin nodes do not run that calculation. They validate the Bitcoin transactions and blocks that contain or move the inscriptions. They do not reserve BRC-20 tickers, enforce maximum supplies, reject an excessive mint, or maintain BRC-20 address balances.

That boundary makes BRC-20 a metaprotocol convention rather than a native token ledger inside Bitcoin consensus. Its state exists in compatible indexers and applications that agree on inscription parsing, ordering, validity, and transfer rules.

### Historical origin and experimental status

The original BRC-20 document was published by the pseudonymous author Domo in 2023 as a “fun experimental standard design.” Its stated idea was to test whether ordinal theory could facilitate fungibility on Bitcoin through three JSON operations: deploy, mint, and transfer.

The original document remains important historical material because it defines the initial experiment and examples. It is not evidence that every later indexer, extension, marketplace, or wallet uses identical rules. The document itself points readers toward later documentation for future updates.

Since the experiment began, implementations have added clarifications, indexing infrastructure, and optional extensions. Those developments should be named and versioned rather than silently folded into the original core model.

This guide explains the original deploy, mint, and transfer workflow and the shared indexer boundary. It does not treat every later BRC-20 extension as universally supported.

### JSON inscriptions carry operations

A core BRC-20 operation is represented as JSON text inside an inscription. The original examples use a protocol field `p` set to `brc-20`, an operation field `op`, a ticker field `tick`, and operation-specific parameters.

A deploy operation commonly includes:

- `p`: the metaprotocol identifier
- `op`: `deploy`
- `tick`: the ticker
- `max`: maximum indexed supply
- `lim`: an optional per-mint limit
- `dec`: optional decimal precision

A mint operation uses `op: mint` and an `amt` amount. A transfer operation uses `op: transfer` and an `amt` amount.

These strings are data. Bitcoin Script does not execute them. Bitcoin Core does not parse the JSON or know whether a required key is missing. A BRC-20 indexer discovers the inscription, decodes its content, applies character, number, and field rules, and then decides whether the operation affects application state.

An inscription can be structurally discoverable by Ord software while its BRC-20 JSON is malformed, outside a supported media type, numerically invalid, duplicated, or invalid under the indexer's protocol rules.

### Deploy initializes an indexed definition

A deploy operation attempts to initialize a BRC-20 definition for a ticker. Under the original model, the first valid deployment of a case-insensitive four-character ticker wins. The deployment records parameters such as maximum supply, mint limit, and decimal precision.

“First” depends on the indexer's ordered view of confirmed Bitcoin history. The indexer needs to process blocks, transactions, and inscriptions deterministically. If two deployments compete, their order in the accepted chain determines which one is recognized under that rule set.

A deploy does not itself credit fungible units to the deployer in the original model. It defines the parameters later mint operations reference.

Ticker recognition is an indexer convention. Bitcoin allows many transactions to contain identical strings. A ticker does not prove authorship, trademark rights, authenticity, redemption rights, scarcity outside the index, or value. Applications should identify the indexed deployment and rule set, not rely on a displayed ticker alone.

Later extensions may support ticker lengths, encodings, self-mint behavior, programmable modules, or activation boundaries that differ from the original experiment. Those features require explicit compatibility checks.

### Mint operations credit initial holders

A mint inscription attempts to create an amount under an existing deployment. The indexer checks the ticker, amount, mint limit, maximum supply, decimal rules, inscription order, and any implementation-specific activation or validity conditions.

Under the original rules, a valid mint credits the first owner of the mint-function inscription. That creates an operational risk when an inscription service constructs the transaction to itself and forwards the inscription later. The service's intermediate address may become the indexed recipient rather than the customer.

The original experiment also describes partial credit for the mint that would cross the remaining maximum supply: only the remaining valid amount is applied. Exact arithmetic, decimal parsing, integer limits, and later clarifications must be checked against the selected maintained indexer.

Bitcoin confirmation proves that the inscription transaction was included in a valid block. It does not prove that the mint met the BRC-20 deployment's limits or that every indexer credited it.

### Transfer is a two-step process

The original BRC-20 transfer workflow separates preparation from delivery.

First, the holder creates a transfer inscription specifying the ticker and amount. When that inscription confirms and is valid, the indexer moves the amount from the holder's available balance into a transferable state associated with the inscription.

Second, the holder spends the UTXO containing that transfer inscription to the recipient. Under the original convention, the first qualifying transfer of the inscription causes the indexer to deduct the transferable amount from the sender and credit the receiver.

This is not a smart-contract call. The Bitcoin transaction spends a UTXO according to Bitcoin script. The indexer follows the inscription's movement under Ord rules and applies the BRC-20 transfer convention.

A displayed “overall balance” can therefore differ from “available balance.” Active transfer inscriptions reserve amounts that cannot be used to create another valid transfer inscription. The original document defines available balance as overall balance minus valid active transfer inscriptions.

The transfer inscription can also be mishandled. Sending it to an intermediary, spending it as a fee under the relevant ordinal interpretation, or moving it through an unsupported wallet can invalidate the intended outcome or return the reserved amount according to supported rules. Exact behavior must be verified against the indexer in use.

### Ordering determines state

BRC-20 state is a history-dependent calculation. Indexers must determine an order for inscriptions and transfer events, then apply operations sequentially.

The original document says that events in the same block are prioritized by their order in that block. Implementations must also define inscription ordering within transactions, the ownership script associated with an inscription, and the transfer event that qualifies as the first move.

This makes ordering part of application validity. A mint can be valid when evaluated before another mint and invalid when evaluated after it because the maximum supply has been reached. A transfer inscription can be valid when the sender has available balance and invalid after an earlier event reduces that balance.

Bitcoin consensus orders transactions in blocks but does not calculate the BRC-20 consequences of that order. Indexers do.

An interface that shows unconfirmed BRC-20 activity is presenting a provisional state. Mempool order is not a consensus sequence, conflicting transactions may exist, and miners choose the confirmed order.

### Confirmations and reorganizations

A BRC-20 indexer normally derives canonical state from the accepted Bitcoin chain. When a transaction confirms, its block position supplies the order used for application processing.

A Bitcoin reorganization disconnects one or more blocks and replaces them with another valid branch. The indexer must reverse every affected deployment, mint, transfer-inscription event, transfer settlement, and balance change, then apply the replacement blocks.

This can change which ticker deployment was first, whether a mint fit under a cap, which owner received an inscription, and whether a transfer completed. An inscription identifier can remain tied to a transaction, while its confirmation position and surrounding application state change.

Maintained Open Protocol Indexer implementations describe reorganization protection and calculate per-block and cumulative event hashes to compare indexed state. That is useful implementation evidence, not a guarantee that every service runs the same code, version, database, or chain tip.

Applications should disclose confirmation requirements and avoid presenting unconfirmed or recently confirmed balances as irreversible.

### Duplicate, invalid, and conflicting operations

Bitcoin permits duplicate-looking JSON, repeated tickers, misspelled fields, extra fields, malformed numbers, and operations that exceed application limits. The blockchain records the transaction if it is otherwise valid. A BRC-20 indexer decides whether the content is recognized and whether it changes state.

A later deployment of an already recognized ticker is generally invalid under the original first-deployment model. A mint can be invalid because the ticker does not exist, the amount exceeds the per-mint limit, the supply is exhausted, or the JSON fails parser rules. A transfer inscription can be invalid because the sender lacks available balance.

Conflicts can also result from two transactions spending the same UTXO. Only the spend included in the accepted chain survives at the Bitcoin layer. The indexer's application events must follow that result.

An invalid BRC-20 operation does not make the Bitcoin transaction invalid. It may still pay fees, move bitcoin, and transfer an inscription. Users cannot assume that an unsuccessful BRC-20 operation will be rejected before broadcast or refunded.

### Indexer compatibility and divergence

BRC-20 does not have one consensus module executed by all Bitcoin nodes. Compatibility depends on indexers reproducing the same metaprotocol rules.

Implementations can diverge on JSON parsing, character encoding, number normalization, ticker handling, inscription eligibility, block activation, transfer ownership, fee-spent inscriptions, cursed or vindicated inscription behavior, extension activation, and reorganization recovery.

A maintained indexer can also expand beyond original BRC-20. For example, the Open Protocol Indexer repository documents modules and later programmable behavior in addition to core event indexing. A service may support those extensions while another supports only the historical core.

Event hashes can help operators compare databases, but matching hashes require compatible event definitions and the same chain. A disagreement must be investigated rather than resolved by assuming the larger marketplace or wallet is authoritative.

For high-integrity use, a service should publish the indexer repository, commit or version, activation settings, chain tip, rebuild procedure, and supported extensions. Users should verify that sender, recipient, wallet, explorer, and custodian use compatible rules.

### Bitcoin validity versus BRC-20 validity

A Bitcoin node validates that a transaction spends real UTXOs with valid authorization and obeys consensus rules. It does not check whether the inscription body is valid JSON or whether a BRC-20 sender has enough indexed balance.

An Ord indexer identifies inscription envelopes and follows their assignment. A BRC-20 indexer then filters relevant inscription content and applies deploy, mint, and transfer rules.

These are three different layers:

1. Bitcoin consensus establishes valid transaction history and UTXO spending.
2. Ord-compatible interpretation identifies and tracks inscriptions.
3. BRC-20 interpretation derives fungible operations and balances.

A transaction can pass layer one, be recognized at layer two, and fail at layer three. A “valid inscription” therefore does not prove a valid BRC-20 operation under every indexer.

Bitcoin Core mempool and relay policy adds another implementation layer before confirmation. A transaction may be consensus-valid but not accepted by a particular node's policy. That policy result does not determine BRC-20 balance validity.

### UTXO and wallet handling

BRC-20 uses inscriptions that are assigned to sats and held in Bitcoin UTXOs under Ord conventions. The user must control the correct UTXO and construct the correct spend for a transfer.

An ordinary Bitcoin wallet may not display BRC-20 balances, reserved transfer inscriptions, or inscription locations. It can select the containing UTXO as an input, merge it with other funds, create change, or assign the inscription to an unintended output.

A BRC-20-aware wallet must coordinate Bitcoin inputs and outputs, Ord sat assignment, inscription movement, BRC-20 available balance, and fee payment. A hardware signer may show only BTC amounts and addresses without decoding the JSON or indexed operation.

Users should verify the finalized transaction after fee adjustment. Changing input order, output order, output values, or fees can alter inscription assignment even when the JSON content is unchanged.

Receiving to a valid Bitcoin address does not guarantee that the wallet can display or safely send the BRC-20 balance later.

### Fees, block space, and data availability

Deploy, mint, and transfer inscriptions use Bitcoin block space and pay transaction fees in bitcoin. The inscription transaction's weight, the number of inputs and outputs, fee rate, and any later transfer transaction affect cost and confirmation.

BRC-20's two-step transfer can require an inscription transaction and a later spend. That is different from Runes, where a runestone transaction can allocate UTXO-associated units directly through edicts.

A high fee does not make an operation valid. A low fee can delay confirmation until a mint window or ordering opportunity changes. Transaction replacement can alter the candidate that confirms.

Confirmed inscription data can be part of Bitcoin's chain history, but access is not universal. Pruned nodes may delete old block files after validation. Ordinary wallets do not index all inscription bodies. Explorers may filter content, change parsers, or become unavailable. A BRC-20 indexer also needs the relevant inscription and transfer history to reconstruct balances.

Data inclusion is therefore distinct from continuous hosting, indexing, discoverability, and rendering.

### Custody boundaries

A self-custodial holder controls the Bitcoin keys needed to spend the UTXO carrying the relevant inscription or transfer state. That does not remove the need for compatible indexer software.

A custodial platform may show an internal BRC-20 balance without assigning a dedicated user-controlled UTXO. The user depends on the provider's database, withdrawal rules, indexer, chain tip, wallet construction, and availability.

Neither an explorer label nor a marketplace account proves legal ownership or segregated custody. A ticker, inscription, or balance also does not create rights to off-chain goods, issuer reserves, intellectual property, or redemption unless a separate enforceable arrangement establishes them.

Before accepting a transfer, parties should agree on the indexer rules, identifiers, destination, confirmations, and custody model.

### Differences from Runes

Runes uses compact runestones in `OP_RETURN` outputs, Rune IDs, edicts, mint terms, and UTXO-associated balances interpreted by `ord`. BRC-20's historical core uses JSON inscriptions and a separate transfer-inscription workflow.

The two protocols have different activation, naming, issuance, parsing, invalid-operation, and transfer rules. A wallet supporting inscriptions does not automatically support either fungible protocol correctly. A wallet supporting Runes does not automatically calculate BRC-20 balances.

Neither protocol is enforced by Bitcoin Core. Both depend on application software reading validated Bitcoin history. Their balances should not be merged merely because a name or ticker looks similar.

### Differences from smart contracts

A programmable smart-contract system normally defines state-transition code that a network of validating nodes or contract-specific validators executes. Core BRC-20 does not deploy executable contract code to Bitcoin.

Its JSON declares one of a small set of operations. Indexer software contains the logic that interprets those declarations and calculates balances. Bitcoin Script authorizes UTXO spends but does not execute the BRC-20 supply and balance rules.

Later programmable extensions should be described by their own implementation and activation rules. They do not retroactively make original BRC-20 a Bitcoin consensus smart-contract platform.

### The working model

BRC-20 is an indexed event history. A valid deploy defines a ticker and parameters. Valid mints credit initial holders according to order and remaining supply. A valid transfer inscription reserves available balance, and its first qualifying transfer credits a recipient. Indexers reverse and replay those events during reorganizations.

Bitcoin validates the carrier transactions and UTXO spends. Ord-compatible software identifies and tracks inscriptions. BRC-20 software determines whether the JSON operations affect balances.

That layered model explains the protocol's main risks. A confirmed inscription can contain invalid BRC-20 JSON. Two indexers can disagree while accepting the same Bitcoin blocks. An unsupported wallet can move a transfer inscription incorrectly. A custodian can display a balance without giving the user UTXO control.

BRC-20 should therefore be described as an experimental inscription and indexer convention, not a native Bitcoin token standard or a global token ledger enforced by Bitcoin nodes.

## 3. Key Terms

- **BRC-20:** An experimental inscription and indexer convention for deriving fungible application balances.
- **Metaprotocol:** Application rules interpreted from data in another protocol's validated history.
- **Deploy:** A JSON inscription operation that initializes a ticker and its parameters under supported indexer rules.
- **Mint:** A JSON inscription operation that attempts to credit new indexed units under an existing deployment.
- **Transfer inscription:** An inscription that reserves an amount for a later qualifying transfer.
- **Available balance:** Overall indexed balance minus amounts reserved in active valid transfer inscriptions.
- **Ticker:** An application label used to identify a deployment under BRC-20 rules.
- **Indexer:** Software that orders inscriptions and calculates deploy, mint, transfer, and balance state.
- **Ord interpretation:** The application rules used to identify inscriptions and follow their movement through Bitcoin transactions.
- **Reorganization:** A Bitcoin chain change requiring indexed BRC-20 events to be reversed and replayed.
- **UTXO:** A spendable Bitcoin output that can carry the sat to which an inscription is assigned.
- **Bitcoin consensus validity:** Acceptance of the underlying Bitcoin transaction and block, separate from BRC-20 operation validity.
- **Custody:** Control arrangement for the Bitcoin keys and provider systems involved in holding or moving the relevant UTXO.

## 4. Sources

1. **BRC-20 Experiment** | Domo
   - URL: https://domo-2.gitbook.io/brc-20-experiment
   - Supports: Historical origin, experimental status, deploy, mint, transfer, available-balance, first-deployment, ordering, decimal, limit, fee-spend, and two-step transfer rules in the original design.
2. **BRC-20 Experiment: Examples** | Domo
   - URL: https://domo-2.gitbook.io/brc-20-experiment/examples
   - Supports: Original JSON examples and required fields for deploy, mint, and transfer operations.
3. **Open Protocol Indexer** | Best in Slot contributors
   - URL: https://github.com/bestinslot-xyz/OPI
   - Supports: A maintained BRC-20 indexer implementation, historical event storage, reorganization protection, block and cumulative state hashes, activation details, and later extension boundaries.
4. **BRC-20 Swap Indexer** | UniSat Wallet contributors
   - URL: https://github.com/brc20-devs/brc20-swap-indexer
   - Supports: A separate maintained implementation derived from OPI, modular indexing, reorganization protection, and the need to verify implementation and extension compatibility.
5. **Ord Repository** | Ord project contributors
   - URL: https://github.com/ordinals/ord
   - Supports: Maintained inscription discovery, assignment, transfer, and indexing behavior on which BRC-20 implementations depend.
6. **Ordinal Theory Handbook: Inscriptions** | Ord project contributors
   - URL: https://docs.ordinals.com/inscriptions.html
   - Supports: Inscription envelope fields, identifiers, assignment, numbering, and the distinction between inscription validity and metaprotocol interpretation.
7. **Ordinal Theory Handbook: Collecting** | Ord project contributors
   - URL: https://docs.ordinals.com/guides/collecting.html
   - Supports: UTXO, sat-control, unsupported-wallet, and accidental fee-spending risks.
8. **Bitcoin Improvement Proposal 141: Segregated Witness** | Eric Lombrozo, Johnson Lau, and Pieter Wuille
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki
   - Supports: Bitcoin witness and transaction-weight rules relevant to inscription data and fees.
9. **Bitcoin Improvement Proposal 341: Taproot** | Pieter Wuille, Jonas Nick, and Anthony Towns
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki
   - Supports: Taproot script-path consensus context for inscription carrier transactions.
10. **Bitcoin Improvement Proposal 342: Validation of Taproot Scripts** | Pieter Wuille, Jonas Nick, and Anthony Towns
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0342.mediawiki
    - Supports: Tapscript validation rules and the boundary between valid Bitcoin script execution and unexecuted inscription-envelope data.
11. **Bitcoin Core v31.0 Source Tree** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/tree/v31.0/src
    - Supports: One current Bitcoin implementation's transaction, block, UTXO, mempool, relay, wallet, and pruning behavior; this is not a BRC-20 specification.
12. **Bitcoin Core v31.0 Release Notes** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/master/doc/release-notes/release-notes-31.0.md
    - Supports: The current implementation version used to date Bitcoin Core behavior discussed in the guide.

## 5. SEO title

What Is BRC-20 on Bitcoin? | Mempool Surf Club

## 6. Meta description

Learn how BRC-20 deploy, mint, and transfer inscriptions create indexer-derived balances outside Bitcoin consensus.

## 7. Page excerpt

Understand BRC-20 as an experimental JSON inscription convention, including ordering, two-step transfers, indexer divergence, reorganizations, fees, and custody.

## 8. Estimated reading time

16 to 19 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-038 | How the Runes Protocol Works
- Next: MSC-GUIDE-040 | What Is a Bitcoin Inscription?
- Prerequisite: MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
- Prerequisite: MSC-GUIDE-014 | How Bitcoin Confirmations Work
- Compare: MSC-GUIDE-038 | How the Runes Protocol Works
- Branch: MSC-GUIDE-044 | How Bitcoin Indexers Work
- Return: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] Registry metadata matches the approved registry.
- [x] Bitcoin consensus validity, Ord inscription interpretation, and BRC-20 balance interpretation are separated.
- [x] Original protocol rules are separated from maintained indexer implementation behavior and later extensions.
- [x] Historical 2023 experimental material is not presented as proof of universal current behavior.
- [x] Deploy, mint, transfer-inscription, and transfer-settlement operations are distinguished.
- [x] BRC-20 is distinguished from Runes, smart contracts, and a native Bitcoin token ledger.
- [x] No price, investment, market, popularity, adoption, liquidity, or value claims are included.
- [x] No permanence, ownership, scarcity, redeemability, compatibility, custody, or availability guarantee is made.
- [x] No experimental feature or indexer extension is presented as universally deployed.
- [x] Sources are mapped only to the claims they support.
- [x] Planned internal links remain inactive and do not imply publication.

## 11. Human verification

- Reviewer:
- Review date:
- Notes: Pending. Verify the original deploy, mint, available-balance, partial-final-mint, ticker, decimal, fee-spend, and two-step transfer rules against Domo's immutable experiment; compare current behavior across the cited maintained indexers, including reorganization recovery and extensions; and identify any parser, activation, or transfer-validity divergence that requires narrower wording.

## 12. Illustration brief

### Illustration 1

- Concept title: Three-Layer BRC-20 Interpretation Stack
- Educational purpose: Separate Bitcoin validation, Ord inscription tracking, and BRC-20 balance calculation.
- Recommended placement: After the section Bitcoin validity versus BRC-20 validity.
- Visual description: Vintage marine stratigraphy chart with a Bitcoin transaction layer, an Ord envelope and sat-tracking layer, and a BRC-20 event ledger layer above it.
- Required labels: Bitcoin consensus, Transaction, Ord inscription, Sat assignment, BRC-20 parser, Indexed balance, Not Bitcoin chainstate
- Caption: A Bitcoin transaction can be valid, its inscription discoverable, and its BRC-20 operation still invalid.
- Alt text: Three-layer technical chart separating Bitcoin transaction validation, Ord inscription interpretation, and BRC-20 indexed balances.
- Image orientation: Landscape
- Mobile crop notes: Stack the three validation layers vertically with one transaction passing upward.
- Status: PLANNED

### Illustration 2

- Concept title: Deploy, Mint, Transfer Logbook
- Educational purpose: Explain the ordered event sequence and the difference between overall, available, and transferable balances.
- Recommended placement: After the section Transfer is a two-step process.
- Visual description: Nautical logbook timeline showing a deploy record, two mint records, a transfer inscription that reserves balance, and the later UTXO spend that credits the recipient.
- Required labels: Deploy, Mint, Overall balance, Available balance, Transfer inscription, Transferable balance, First transfer, Recipient
- Caption: BRC-20 transfers reserve balance in one inscription event and settle it when the transfer inscription first moves.
- Alt text: Ordered ledger diagram showing BRC-20 deployment, minting, transfer reservation, and recipient credit across two transactions.
- Image orientation: Landscape
- Mobile crop notes: Use a vertical event log with balance states displayed beside each step.
- Status: PLANNED

### Illustration 3

- Concept title: Indexer Divergence Compass
- Educational purpose: Show why the same Bitcoin history can produce different application results when parser versions or extension rules differ.
- Recommended placement: After the section Indexer compatibility and divergence.
- Visual description: Cartographic compass rose centered on one Bitcoin chain, with four indexer routes labeled parser, activation, inscription eligibility, and extension support, ending in matching or divergent state hashes.
- Required labels: Same Bitcoin chain, Indexer A, Indexer B, Parser rules, Activation height, Reorg handling, Extension support, State hash
- Caption: BRC-20 compatibility depends on indexers applying the same rules to the same accepted chain.
- Alt text: Compass-style systems diagram showing two BRC-20 indexers deriving matching or divergent state from the same Bitcoin blocks.
- Image orientation: Landscape
- Mobile crop notes: Place the chain at top, two indexers in the middle, and comparison results at bottom.
- Status: PLANNED
