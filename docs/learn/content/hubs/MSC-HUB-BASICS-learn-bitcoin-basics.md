---
registry_id: MSC-HUB-BASICS
status: EDITORIAL_REVIEW
page_role: category-hub
h1: Bitcoin Basics
handle: learn-bitcoin-basics
category: Bitcoin Basics
subcategory: All four approved subcategories
production_batch: "Phase 1.02: hub skeleton; finalize after Phase 5"
author_display: Mempool Surf Club Editorial
reviewed_date: null
copy_locked_date: null
---

# Bitcoin Basics

## 1. Introductory deck

Build a durable foundation for understanding, holding, and using bitcoin. This category connects the system's purpose, wallet and custody choices, transaction mechanics, security practices, privacy limits, UTXOs, confirmations, issuance, and safe everyday habits without assuming prior Bitcoin knowledge.

## 2. Full destination copy

Bitcoin Basics is the first category in Mempool Surf Club Learn, but it is not only a glossary of beginner terms. It establishes the conceptual and practical boundaries readers need before moving into the Bitcoin Network, Building on Bitcoin, Bitcoin Development, or the Bitcoin Ecosystem.

Those boundaries matter because familiar words are often used as though they describe the same thing. A wallet is not an address. A private key is not a seed phrase. A seed phrase is not always a complete recovery plan. A custodial account is not the same arrangement as direct key control. A transaction can be signed without being broadcast, broadcast without being confirmed, and confirmed without becoming absolutely final. Privacy can improve at one layer while information still leaks through another.

The purpose of this hub is to give readers the concepts and practical habits needed to understand, hold, and use bitcoin with confidence. Confidence here does not mean certainty, risk-free use, or financial gain. It means identifying which system layer is involved, which claims come from the protocol, which choices belong to software or services, and which responsibilities remain with the user.

### A systems map, not a list of definitions

Bitcoin combines a peer-to-peer network with a digitally scarce native asset, bitcoin. The network records transactions, applies consensus rules, and allows independently operated software to verify valid history. The asset is accounted for through transaction outputs rather than one central account database.

That high-level description becomes useful only when its parts remain distinct.

Wallet software manages keys, constructs transactions, and helps users interact with Bitcoin. It does not contain bitcoin as coin files. A wallet calculates a useful balance by identifying transaction outputs connected to the keys, scripts, or watch-only information it manages.

Custody asks who controls the keys or authorization needed to move bitcoin. In self-custody, the user or a user-defined arrangement directly controls that authorization. In a custodial account, a service controls the relevant keys and records a customer claim. Neither arrangement is automatically correct for every person. Each places trust, support, recovery, privacy, and failure risk in different locations.

Transactions spend existing unspent transaction outputs, or UTXOs, and create new outputs. A wallet may hide that structure behind a send screen, but the output model explains input selection, change, fees, balances, privacy links, and later spending.

Security and privacy overlap, but they are not the same goal. Security includes reducing unauthorized spending, permanent loss, operational failure, and recovery failure. Privacy concerns how transaction activity, ownership relationships, and identity can be observed or connected. A device, node, network route, wallet feature, or collaborative transaction may reduce a specific exposure without guaranteeing complete security or anonymity.

This category builds a map of those relationships one guide at a time.

### Foundations

Foundations begins with the broadest question: What is Bitcoin?

The first guide distinguishes Bitcoin the network from bitcoin the asset and introduces nodes, miners, wallets, transactions, proof of work, UTXOs, confirmations, and issuance. The second asks why this combination of open participation, verifiable rules, digital scarcity, and key-based ownership may matter while preserving the system's costs, limits, and tradeoffs.

The history sequence places Bitcoin inside decades of work on digital cash, cryptography, timestamping, and proof of work. It separates protocol milestones from market events, company failures, and cultural stories. The Satoshi guide narrows the historical record further. It explains the documented work of Bitcoin's pseudonymous creator without treating an unverified identity theory as fact or turning authorship into permanent control.

These guides create the starting point for everything that follows. Bitcoin has no central issuer, but services around it may still be centralized. Public rules can be inspected, but that does not make software flawless. Scarcity describes an issuance constraint, not a promise about demand, market price, or purchasing power. Open participation reduces certain permission boundaries, but it does not remove technology, legal, access, or operational constraints.

### Using Bitcoin

Using Bitcoin moves from the system into the tools and actions most readers encounter first.

A Bitcoin wallet manages keys and transaction workflows. It may generate receiving information, identify relevant UTXOs, calculate a balance, select inputs, create outputs, estimate fees, coordinate signatures, and track confirmation state. Those functions can live in one application or be divided among a coordinator, signer, node, server, backup, and several people.

Self-custody is one possible custody arrangement. It can reduce dependence on a custodian, while shifting backup, recovery, device, continuity, and transaction-verification responsibilities to the user or the arrangement they design. Custody should not be treated as a binary moral judgment. The useful question is where spending authority sits, which dependencies remain, and what happens if a device, service, location, or participant becomes unavailable.

The sending and receiving guide follows an on-chain payment from receiving information through review, input selection, signing, broadcast, node acceptance, miner selection, block inclusion, and later confirmation depth. Each stage answers a different question. A readable QR code does not prove that a destination is correct. A valid signature authorizes transaction data but does not broadcast it. A node may accept a transaction into its local mempool without creating a confirmation. A fee estimate forecasts competition for block space rather than reserving a place in the next block.

The transaction and fee guide then opens the data structure beneath the interface. It explains why UTXOs are spent as complete units, why change is a new output, why the on-chain fee is the difference between input and output value, and why fee rate relates to transaction weight rather than the amount being transferred.

### Security

Security begins with recovery material because many serious mistakes come from collapsing several controls into one concept.

A seed phrase is a human-readable backup representation used by many wallets to derive keys under a wallet standard. It is not an address, a device PIN, an application password, or one private key. Recovery can also depend on a passphrase, derivation paths, script types, descriptors, account information, multisignature policy, other signers, or wallet-specific records.

Private and public keys occupy another layer. A private key is secret cryptographic material used to authorize spending. A related public key can support signature verification without revealing the private key under Bitcoin's cryptographic assumptions. Addresses are destination representations used by wallets to construct locking scripts. Keys do not hold bitcoin, and an address is not a wallet.

The security guide turns those components into a maintainable system. It asks readers to consider theft, loss, software origin, devices, backups, transaction review, recovery, physical access, inheritance, and the people involved. More complexity is not automatically more security. A plan that cannot be understood, maintained, or recovered can become its own failure mode.

The privacy guide maps information across the public blockchain, wallet queries, network connections, services, merchants, devices, payment communication, and later spending. Bitcoin is pseudonymous, not automatically anonymous. Fresh addresses, personal nodes, Tor, coin control, CoinJoin, PayJoin, or Lightning may change specific information flows, but no single tool removes every possible link.

### Essentials

Essentials connects everyday use to four ideas that readers will meet throughout the rest of Learn.

UTXOs explain Bitcoin's output-based accounting model. A transaction spends specific earlier outputs and creates new ones. Wallet balances are calculated views over those outputs, not protocol-level account balances. Input selection affects transaction weight, fees, change, privacy, and future wallet structure.

Confirmations explain settlement depth. A transaction receives its first confirmation when it is included in a valid block on a node's active chain. Additional blocks increase depth and usually reduce practical reorganization risk. They do not create absolute finality, prove legal identity, settle a commercial dispute, or provide one universal safe count for every payment.

The halving guide explains Bitcoin's consensus-enforced issuance schedule. The block subsidy began at 50 BTC and is reduced by half every 210,000 blocks under current mainnet rules. The halving reduces the permitted subsidy for future blocks. It does not cut existing balances, guarantee miner behavior, or operate as a price mechanism.

The final guide brings the category together through safe everyday practices. It treats safety as an ongoing process: understand the custody model, obtain software through expected sources, know what each control protects, maintain recovery information, verify payment details, review fees and confirmations, manage privacy deliberately, and revisit the setup when people, devices, software, value, or circumstances change.

### How the four subcategories connect

The four subcategories are ordered, but they are not isolated.

Foundations explains what the system is and why its design choices matter. Using Bitcoin shows how wallets, custody, transactions, and fees turn those ideas into action. Security examines the keys, recovery information, devices, people, and information flows that make those actions dependable or risky. Essentials reveals the output, confirmation, issuance, and maintenance concepts that connect everyday use to the wider network.

Each guide adds one part of a larger systems map. A wallet guide becomes clearer after Bitcoin and UTXOs are distinguished. A custody decision becomes clearer after keys and recovery are separated. Confirmation policy becomes clearer after transaction broadcast and block inclusion are separated. Privacy becomes clearer after UTXO selection, change, services, and later spending are visible.

Readers do not need to memorize every detail on the first pass. The goal is to know where a question belongs and which boundaries should remain intact.

### How to use this hub

There are three planned ways to enter the category.

First, follow the complete sixteen-guide category in canonical order. This is the most complete route. It starts with the system and its history, moves into wallets and transactions, develops security and privacy boundaries, and finishes with UTXOs, confirmations, issuance, and maintainable everyday practice.

Second, enter one of the four subcategories based on the current need. Foundations supports readers asking what Bitcoin is or how it developed. Using Bitcoin supports wallet, custody, payment, and fee questions. Security supports recovery, keys, threat modeling, and privacy questions. Essentials supports readers who need a clearer model of outputs, confirmations, the halving, or practical maintenance.

Third, use MSC-PATH-START | Start With Bitcoin as the curated starting route. A learning path can select a teaching order across destinations, while the hub preserves the permanent canonical category order. MSC-PATH-SAFE | Use Bitcoin Safely and MSC-PATH-NETWORK | Understand the Network are planned related paths for readers with narrower goals.

The category prepares readers for MSC-HUB-NETWORK | The Bitcoin Network without duplicating it. Bitcoin Basics introduces transactions, UTXOs, confirmations, nodes, miners, and consensus only as needed for safe understanding and use. The Network category goes deeper into mining, node operation, mempools, blocks, proof of work, chain selection, consensus, and upgrades.

All anchors, cards, and related destinations are planned intent only. They must remain inactive until implementation confirms real published destinations and URLs.

## 3. Destination structure or sequence

### Orientation

The hub introduces Bitcoin Basics as the conceptual and practical foundation for the rest of MSC Learn. It keeps wallets, keys, custody, recovery, transactions, security, privacy, UTXOs, confirmations, and issuance distinct before showing how they connect.

### How to use this hub

1. Follow the complete sixteen-guide category in canonical order.
2. Enter Foundations, Using Bitcoin, Security, or Essentials based on the current need.
3. Use MSC-PATH-START | Start With Bitcoin as the curated starting route.

MSC-PATH-SAFE | Use Bitcoin Safely and MSC-PATH-NETWORK | Understand the Network are planned related routes. Learning-path order does not replace or own canonical category navigation.

### Canonical category sequence

#### Foundations

1. MSC-GUIDE-001 | What Is Bitcoin?
2. MSC-GUIDE-002 | Why Does Bitcoin Matter?
3. MSC-GUIDE-003 | A History of Bitcoin
4. MSC-GUIDE-004 | Who Was Satoshi Nakamoto?

#### Using Bitcoin

5. MSC-GUIDE-005 | What Is a Bitcoin Wallet?
6. MSC-GUIDE-006 | What Is Bitcoin Self-Custody?
7. MSC-GUIDE-007 | How to Send and Receive Bitcoin
8. MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work

#### Security

9. MSC-GUIDE-009 | What Is a Bitcoin Seed Phrase?
10. MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work
11. MSC-GUIDE-011 | How to Keep Bitcoin Secure
12. MSC-GUIDE-012 | How Bitcoin Privacy Works

#### Essentials

13. MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
14. MSC-GUIDE-014 | How Bitcoin Confirmations Work
15. MSC-GUIDE-015 | What Is the Bitcoin Halving?
16. MSC-GUIDE-016 | Bitcoin Best Practices for Safe Everyday Use

The sequence is editorial planning. No card action, anchor, or related destination should be activated until implementation confirms a real published destination and URL.

## 4. Card or step copy

### Subcategory: Foundations

- Planned anchor intent: `#foundations`
- Anchor status: Editorial intent only. Do not activate until implementation confirms the real published destination structure.

#### MSC-GUIDE-001 | What Is Bitcoin?

- Registry ID: MSC-GUIDE-001
- Approved H1: What Is Bitcoin?
- Card description: Build a clear first model of Bitcoin as a peer-to-peer network and digitally scarce asset, then connect nodes, miners, wallets, UTXOs, proof of work, confirmations, and issuance.
- Depth: Surface
- Format: Explainer
- Estimated reading time: 8 to 9 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-002 | Why Does Bitcoin Matter?

- Registry ID: MSC-GUIDE-002
- Approved H1: Why Does Bitcoin Matter?
- Card description: Examine open participation, independently verifiable rules, constrained issuance, key-based ownership, settlement, and censorship resistance alongside their practical limits and tradeoffs.
- Depth: Surface
- Format: Explainer
- Estimated reading time: 9 to 10 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-003 | A History of Bitcoin

- Registry ID: MSC-GUIDE-003
- Approved H1: A History of Bitcoin
- Card description: Trace Bitcoin from earlier digital-cash research and the 2008 white paper through launch, early transactions, specialized mining, open-source development, major upgrades, markets, and community growth.
- Depth: Surface
- Format: History
- Estimated reading time: 9 to 10 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-004 | Who Was Satoshi Nakamoto?

- Registry ID: MSC-GUIDE-004
- Approved H1: Who Was Satoshi Nakamoto?
- Card description: Separate the documented work of Bitcoin's pseudonymous creator from unsupported identity theories, and see why authorship never became permanent authority over the network.
- Depth: Surface
- Format: History
- Estimated reading time: 8 to 9 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Subcategory: Using Bitcoin

- Planned anchor intent: `#using-bitcoin`
- Anchor status: Editorial intent only. Do not activate until implementation confirms the real published destination structure.

#### MSC-GUIDE-005 | What Is a Bitcoin Wallet?

- Registry ID: MSC-GUIDE-005
- Approved H1: What Is a Bitcoin Wallet?
- Card description: Learn how wallets manage keys, watch outputs, calculate balances, construct transactions, coordinate signers, and support recovery without storing bitcoin as coin files.
- Depth: Surface
- Format: Explainer
- Estimated reading time: 9 to 10 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-006 | What Is Bitcoin Self-Custody?

- Registry ID: MSC-GUIDE-006
- Approved H1: What Is Bitcoin Self-Custody?
- Card description: Compare custodial claims with direct key control, then explore single-signature, multisignature, collaborative, device, backup, recovery, privacy, and continuity tradeoffs.
- Depth: Surface
- Format: Guide
- Estimated reading time: 10 to 11 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-007 | How to Send and Receive Bitcoin

- Registry ID: MSC-GUIDE-007
- Approved H1: How to Send and Receive Bitcoin
- Card description: Follow an on-chain payment from receiving information and human review through UTXO selection, signing, broadcast, node relay, miner selection, block inclusion, and confirmation.
- Depth: Surface
- Format: Walkthrough
- Estimated reading time: 10 to 11 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work

- Registry ID: MSC-GUIDE-008
- Approved H1: How Bitcoin Transactions and Fees Work
- Card description: Open the transaction structure beneath a wallet screen, including inputs, outputs, change, weight, sat/vB fee rates, node-local mempools, miner selection, replacement, CPFP, and settlement risk.
- Depth: Shallow
- Format: Explainer
- Estimated reading time: 11 to 13 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Subcategory: Security

- Planned anchor intent: `#security`
- Anchor status: Editorial intent only. Do not activate until implementation confirms the real published destination structure.

#### MSC-GUIDE-009 | What Is a Bitcoin Seed Phrase?

- Registry ID: MSC-GUIDE-009
- Approved H1: What Is a Bitcoin Seed Phrase?
- Card description: Understand mnemonic recovery, BIP 39, passphrases, HD key derivation, script discovery, multisignature records, backup tradeoffs, and why a phrase may not be the complete wallet plan.
- Depth: Surface
- Format: Explainer
- Estimated reading time: 9 to 11 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work

- Registry ID: MSC-GUIDE-010
- Approved H1: How Bitcoin Public and Private Keys Work
- Card description: See how private keys authorize spending, public keys verify signatures, addresses represent destinations, and HD wallets derive many keys while creating distinct security and privacy boundaries.
- Depth: Shallow
- Format: Explainer
- Estimated reading time: 10 to 12 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-011 | How to Keep Bitcoin Secure

- Registry ID: MSC-GUIDE-011
- Approved H1: How to Keep Bitcoin Secure
- Card description: Build a maintainable threat model across theft, loss, software origin, signers, devices, backups, transaction review, recovery, privacy, physical access, inheritance, and changing conditions.
- Depth: Surface
- Format: Guide
- Estimated reading time: 10 to 12 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-012 | How Bitcoin Privacy Works

- Registry ID: MSC-GUIDE-012
- Approved H1: How Bitcoin Privacy Works
- Card description: Map the information visible through the blockchain, wallet servers, peers, services, payment records, devices, and later spending while keeping every privacy technique within its actual limits.
- Depth: Shallow
- Format: Guide
- Estimated reading time: 11 to 13 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Subcategory: Essentials

- Planned anchor intent: `#essentials`
- Anchor status: Editorial intent only. Do not activate until implementation confirms the real published destination structure.

#### MSC-GUIDE-013 | What Are UTXOs in Bitcoin?

- Registry ID: MSC-GUIDE-013
- Approved H1: What Are UTXOs in Bitcoin?
- Card description: Replace the account-balance mental model with Bitcoin's output-based state, then connect inputs, outputs, change, fees, wallet balances, coin selection, dust policy, privacy, and node validation.
- Depth: Shallow
- Format: Explainer
- Estimated reading time: 10 to 12 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-014 | How Bitcoin Confirmations Work

- Registry ID: MSC-GUIDE-014
- Approved H1: How Bitcoin Confirmations Work
- Card description: Learn when confirmation begins, how cumulative proof of work and active-chain depth matter, what reorganizations can change, and why no universal count creates absolute finality.
- Depth: Surface
- Format: Explainer
- Estimated reading time: 9 to 11 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-015 | What Is the Bitcoin Halving?

- Registry ID: MSC-GUIDE-015
- Approved H1: What Is the Bitcoin Halving?
- Card description: Follow the consensus-enforced block subsidy schedule by height, separate subsidy from transaction fees, and keep issuance mechanics distinct from miner economics, difficulty, and price claims.
- Depth: Surface
- Format: Explainer
- Estimated reading time: 9 to 11 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

#### MSC-GUIDE-016 | Bitcoin Best Practices for Safe Everyday Use

- Registry ID: MSC-GUIDE-016
- Approved H1: Bitcoin Best Practices for Safe Everyday Use
- Card description: Turn the category into a maintainable routine for custody, software sourcing, recovery, payment review, fees, confirmations, UTXO handling, privacy, support boundaries, continuity, and ongoing review.
- Depth: Surface
- Format: Guide
- Estimated reading time: 11 to 13 minutes
- Planned action label: Read guide
- Status note: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

## 5. Key Terms

- **Bitcoin:** An open monetary network and asset governed by independently verified consensus rules.
- **Wallet:** Software or hardware that manages keys, constructs transactions, and helps users interact with Bitcoin.
- **Self-Custody:** Direct control of the keys needed to spend bitcoin.
- **Private key:** Secret cryptographic material used to authorize spending.
- **Seed phrase:** A human-readable backup representation used by many wallets to derive keys under a wallet standard.
- **Transaction:** A data structure that spends existing UTXOs and creates new outputs.
- **UTXO:** An unspent transaction output that can be used as an input in a later transaction.
- **Confirmation:** The inclusion of a transaction in a block, followed by additional blocks that increase settlement depth.
- **Halving:** The scheduled reduction in Bitcoin's block subsidy after each 210,000-block interval.
- **Block subsidy:** New bitcoin created under the issuance schedule and paid through a block's coinbase transaction.
- **Bitcoin privacy:** The degree to which transaction activity, ownership relationships, and user identity can remain difficult to observe or connect.

## 6. Sources

1. **MSC Learn Master Registry**
   Author or publisher: Mempool Surf Club Editorial
   Repository path: `docs/learn/MSC_Learn_Master_Registry.json`
   Supports: The Bitcoin Basics category identity, purpose, four-subcategory order, anchor intents, canonical sixteen-guide sequence, destination relationships, depth, format, and production timing.

2. **Learn content manifest**
   Author or publisher: Mempool Surf Club Editorial
   Repository path: `docs/learn/content/content-manifest.json`
   Supports: Permanent destination paths, registry identifiers, editorial statuses, and the separation between planning content and generated runtime data. It is not runtime or publication evidence.

3. **Copy-locked Foundations Guides MSC-GUIDE-001 through MSC-GUIDE-004**
   Author or publisher: Mempool Surf Club Editorial
   Repository path: `docs/learn/content/guides/`
   Supports: Bitcoin's core definition, purpose and tradeoffs, documented history, Satoshi boundaries, synchronized Key Terms, card descriptions, depth, format, and reading-time metadata.

4. **Copy-locked Using Bitcoin Guides MSC-GUIDE-005 through MSC-GUIDE-008**
   Author or publisher: Mempool Surf Club Editorial
   Repository path: `docs/learn/content/guides/`
   Supports: Wallet functions, custody models, sending and receiving, transaction structure, fees, synchronized Key Terms, card descriptions, depth, format, and reading-time metadata.

5. **Copy-locked Security Guides MSC-GUIDE-009 through MSC-GUIDE-012**
   Author or publisher: Mempool Surf Club Editorial
   Repository path: `docs/learn/content/guides/`
   Supports: Seed phrases, keys, security planning, privacy layers and limits, synchronized Key Terms, card descriptions, depth, format, and reading-time metadata.

6. **Copy-locked Essentials Guides MSC-GUIDE-013 through MSC-GUIDE-016**
   Author or publisher: Mempool Surf Club Editorial
   Repository path: `docs/learn/content/guides/`
   Supports: UTXOs, confirmations, halving and issuance boundaries, safe everyday practices, synchronized Key Terms, card descriptions, depth, format, and reading-time metadata.

## 7. SEO title

Bitcoin Basics: Learn Wallets, Transactions, Security, and More

## 8. Meta description

Learn Bitcoin basics through 16 calm, technically grounded guides covering foundations, wallets, custody, transactions, security, privacy, UTXOs, confirmations, and issuance.

## 9. Page excerpt

Build a durable Bitcoin foundation through 16 guides covering the system's purpose, wallets, custody, transactions, recovery, security, privacy, UTXOs, confirmations, the halving, and safe everyday use.

## 10. Estimated reading time

18 minutes for hub orientation and card review

## 11. Planned internal links

Do not activate planned links until each destination exists as a real published page with a confirmed URL.

- MSC-PATH-START | Start With Bitcoin
- MSC-PATH-SAFE | Use Bitcoin Safely
- MSC-PATH-NETWORK | Understand the Network
- MSC-HUB-NETWORK | The Bitcoin Network
- MSC-ROUTE-001 | How a Bitcoin Transaction Moves
- MSC-GLOSSARY-001 | Bitcoin Glossary

No destination URL is assigned in this editorial package.

## 12. Accuracy review checklist

- [x] Registry metadata matches the approved master registry and content manifest.
- [x] Foundations, Using Bitcoin, Security, and Essentials appear in approved order.
- [x] The hub contains exactly sixteen guide cards.
- [x] The cards follow the canonical MSC-GUIDE-001 through MSC-GUIDE-016 order.
- [x] Every card uses the approved Registry ID, H1, depth, format, and guide reading time.
- [x] Every card description is specific to its copy-locked guide.
- [x] Wallets are not described as containers that hold bitcoin files.
- [x] Wallet, address, private key, seed phrase, and custody remain distinct.
- [x] Custody is not presented as a binary moral judgment.
- [x] Signing, broadcast, mempool acceptance, block inclusion, and confirmation remain distinct.
- [x] Transaction fee, fee rate, UTXO selection, change, and wallet balance remain distinct.
- [x] Confirmation count is not presented as absolute finality or one universal acceptance rule.
- [x] Security is presented as a maintainable system rather than one product or checklist.
- [x] Privacy techniques are not presented as anonymity guarantees.
- [x] The halving is described as a consensus-enforced subsidy schedule rather than a price mechanism.
- [x] Current issuance remains below the commonly cited limit of 21 million BTC without using Bitcoin Core amount.h as proof of the schedule.
- [x] Canonical category order remains distinct from curated learning-path order.
- [x] Planned anchors, cards, and related destinations remain inactive and contain no URL.
- [x] Hub Key Terms use synchronized definitions compatible with the copy-locked guides.
- [x] Exactly three complete illustration briefs are included.
- [x] Human Verification remains pending.
- [x] No em dash or en dash character appears.

## 13. Human verification

- State: Pending
- Reviewer: Not assigned
- Review date: Not assigned
- Future reviewer must verify:
  - All sixteen card records against the copy-locked MSC-GUIDE-001 through MSC-GUIDE-016 files, including IDs, H1s, sequence, depth, format, reading times, and description accuracy.
  - The exact Foundations, Using Bitcoin, Security, and Essentials category order.
  - Key Term synchronization with the approved guide definitions.
  - Wallet, custody, key, seed phrase, transaction, UTXO, confirmation, security, privacy, halving, and issuance boundaries.
  - The distinction between canonical navigation and learning-path order.
  - Planned-link and anchor inactivity, with no destination treated as published from a planned handle.
  - Completeness of all three illustration briefs and their `Status: PLANNED` values.
  - Any technical, implementation, service-behavior, or publication claim that needs renewal immediately before publication.

Human Verification has not been completed. `reviewed_date` and `copy_locked_date` remain `null`.

## 14. Illustration brief

### Illustration 1

- Concept title: Four Learning Regions of Bitcoin Basics
- Educational purpose: Show how Foundations, Using Bitcoin, Security, and Essentials form one connected learning map while preserving the purpose of each region.
- Recommended placement: After the section titled How the four subcategories connect.
- Visual description: Vintage nautical chart divided into four adjoining coastal regions. Foundations forms the chart legend and horizon reference. Using Bitcoin follows a navigable route through wallet and transaction markers. Security includes protected harbors for keys, recovery, and privacy. Essentials contains chart symbols for UTXOs, confirmation depth, issuance, and maintenance. Routes connect the regions without placing one region in command.
- Required labels: Foundations, Using Bitcoin, Security, Essentials, Bitcoin, Wallets and transactions, Keys and recovery, UTXOs and confirmations
- Caption: Bitcoin Basics connects four learning regions that keep core concepts distinct before showing how they work together.
- Alt text: Vintage nautical learning map showing Foundations, Using Bitcoin, Security, and Essentials as four connected Bitcoin Basics regions.
- Image orientation: Landscape
- Mobile crop notes: Stack the four regions in approved order and preserve one visible route between each adjacent region.
- Status: PLANNED

### Illustration 2

- Concept title: Wallet, Keys, Transactions, and Ledger
- Educational purpose: Prevent readers from treating a wallet, key, address, transaction, UTXO, and Bitcoin's public record as the same object.
- Recommended placement: After the section titled A systems map, not a list of definitions.
- Visual description: Vintage technical cutaway presented like a harbor logistics chart. A wallet workbench manages key material and constructs a transaction. A private signing instrument authorizes the transaction without becoming the transaction itself. The transaction moves toward independently validated public ledger records where outputs are created. Bitcoin is never shown as a coin stored inside the wallet.
- Required labels: Wallet, Private key, Public information, Address, Transaction, Signature, UTXO, Validated public record
- Caption: A wallet manages keys and transaction tools, while Bitcoin records validated transactions and their spendable outputs.
- Alt text: Technical chart separating a Bitcoin wallet, private key, address, signature, transaction, UTXO, and validated public record.
- Image orientation: Landscape
- Mobile crop notes: Use a left-to-right sequence on desktop and a top-to-bottom sequence on mobile, keeping every label attached to its own object.
- Status: PLANNED

### Illustration 3

- Concept title: Three Ways Through Bitcoin Basics
- Educational purpose: Explain the difference among complete canonical order, focused subcategory entry, and the curated Start With Bitcoin learning path.
- Recommended placement: After the section titled How to use this hub.
- Visual description: Weathered navigation chart with one departure marker and three clearly labeled routes. The canonical route visits all sixteen numbered guide markers in order. The subcategory route enters one of four named ports. The Start With Bitcoin route follows a curated set of waypoints. A legend states that all routes are editorial intent until published destinations and URLs are confirmed.
- Required labels: Canonical order, Sixteen guides, Foundations, Using Bitcoin, Security, Essentials, Start With Bitcoin, Planned routes only
- Caption: Readers can follow the complete category, enter one focused subcategory, or use the curated Start With Bitcoin route.
- Alt text: Nautical navigation chart showing canonical sixteen-guide order, four subcategory entry points, and the curated Start With Bitcoin path.
- Image orientation: Landscape
- Mobile crop notes: Preserve the three route labels and show the four subcategory ports as a compact vertical list beside the Start With Bitcoin route.
- Status: PLANNED
