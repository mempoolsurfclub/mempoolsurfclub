---
registry_id: MSC-PATH-SAFE
status: COPY_LOCKED
page_role: learning-path
h1: Use Bitcoin Safely
handle: use-bitcoin-safely
category: Not applicable. This is a cross-category learning route.
subcategory: Multiple canonical subcategories. The path does not own topic pages.
production_batch: "Phase 1.08: path skeleton; Finalize the core path after Phase 5 and complete provider branches after Phase 20."
author_display: Mempool Surf Club Editorial
reviewed_date: 2026-07-31
copy_locked_date: 2026-07-31
---

# Use Bitcoin Safely

## 1. Introductory deck

Build a threat-model-first path through wallets, custody, recovery, keys, security, privacy, transactions, fees, confirmations, everyday practices, and wallet-provider evaluation. The route does not promise safety or prescribe one setup. It teaches readers to locate authority, dependencies, evidence, and failure boundaries before moving bitcoin.

## 2. Full destination copy

Using bitcoin safely is not one product choice, one backup object, or one checklist. A wallet can be well designed while the recovery plan is incomplete. A signing device can protect keys while a user approves the wrong destination. Self-custody can reduce dependence on a custodian while increasing the consequences of lost or exposed recovery information. A service can offer convenient recovery while adding account, policy, privacy, availability, and legal dependencies.

This path organizes those risks into an eleven-step learning sequence. It begins by locating the wallet and custody model, then moves through recovery and signing authority, security and privacy, transaction practice, settlement, ongoing maintenance, and provider evaluation.

The route is educational. It does not guarantee financial, operational, legal, or technical safety. It does not rank wallets or providers. Each reader still needs a threat model appropriate to the amount, time horizon, participants, skills, recovery needs, and consequences of failure.

### Stage 1: Locate the wallet and custody boundary

The first step asks what a Bitcoin wallet actually does. A wallet manages keys or public wallet information, constructs transactions, watches for relevant outputs, and presents a usable view of activity. It does not store bitcoin as coin files. It may depend on a signer, node, wallet server, indexer, coordinator, account system, or several of those components.

That systems map is necessary before choosing a custody model. A familiar interface does not reveal who can authorize spending, where balance and fee data come from, or what must survive for recovery.

The second step asks who controls the keys or authorization required to move bitcoin. In a custodial account, a service controls the applicable spending authority and records what it owes or permits the customer to withdraw. In self-custody, the user or a user-defined arrangement controls the required keys.

Neither arrangement is automatically safe. Custody moves risk toward a service, its policies, solvency, operations, legal environment, and withdrawal process. Self-custody moves more responsibility toward devices, backups, software, signers, procedures, and continuity. The useful question is where authority and failure sit, not which label sounds strongest.

### Stage 2: Protect recovery and signing authority

The seed-phrase step introduces one common wallet backup representation without treating it as universal. BIP 39 defines one mnemonic system, but wallets can use other standards and recovery methods. Even a valid phrase may be insufficient when the intended wallet also depends on a passphrase, derivation path, script type, account index, descriptor, multisignature policy, or other signer information.

Recovery material is not an ordinary login credential. It should not be entered into websites, search engines, support chats, screenshots, cloud documents, or unverified applications. A checksum can show that words fit a mnemonic format. It does not prove ownership, funds, identity, or complete recovery.

The key step then separates private keys, public keys, addresses, scripts, and signatures. Private keys can authorize spending under applicable conditions. Public keys and signatures let nodes verify authorization without receiving the secret. Addresses are destination encodings used by wallets to construct scripts. Wallets can manage many keys, and a multisignature output can require several signers.

The security step turns those components into a maintainable plan. It begins with a threat model covering unauthorized spending, permanent loss, device failure, service failure, privacy exposure, coercion, user error, and unavailable participants. It separates software origin, signing, backups, recovery testing, physical security, inheritance, and support scams instead of treating one device or phrase as the whole system.

Complexity is not automatically security. A setup is useful only when the intended participants can understand, operate, maintain, and recover it.

### Stage 3: Understand privacy as information flow

Bitcoin does not place a legal name in every transaction, but its blockchain is public. Inputs, outputs, amounts, scripts, timing, and later spending can support links among activity. Services, merchants, wallet servers, devices, network peers, invoices, and public posts can connect those records to identities or relationships.

The privacy step maps several layers: on-chain structure, wallet behavior, network communication, service records, payment communication, and device data. A fresh address reduces one obvious reuse pattern but does not create anonymity. Running a node can reduce some third-party wallet-query exposure but does not hide public transaction relationships. Tor can reduce some source-IP exposure but does not remove service records or on-chain links.

Privacy claims should name the observer, the information available, the technique used, and what remains visible. No address type, node, route, wallet setting, collaborative transaction, or payment network guarantees anonymity.

### Stage 4: Transact carefully and assess settlement

The sending and receiving step applies the earlier model. Before authorizing an on-chain payment, the reader should identify the intended network and payment path, review the destination, amount, fee information, and change, and understand which details the wallet or signing environment can verify.

A QR code reduces typing. It does not prove that the destination is correct. A valid signature proves cryptographic authorization of transaction data. It does not prove that the recipient, invoice, or commercial agreement is correct.

The transaction and fee step explains what the wallet is building. A transaction spends complete UTXOs and creates new outputs. Input value not assigned to outputs becomes the transaction fee. Fee rate reflects payment for transaction weight or virtual size, not a percentage of the payment amount.

Fee estimates are forecasts. Node mempools differ, demand changes, miners use their own selection systems, and replacement or fee-bumping methods depend on transaction structure, wallet support, node policy, and miner behavior. No estimate reserves a place in a future block.

The confirmation step separates detection, relay, mempool acceptance, block inclusion, and depth. Confirmation one begins when a valid transaction appears in a block on the wallet or node's active chain view. Additional blocks usually reduce practical reorganization risk, but they do not create absolute finality.

There is no universal confirmation count for every payment. Acceptance depends on value, counterparty, reversibility, replacement or conflict risk, delivery consequences, and the cost of responding to a reorganization. Confirmations also do not prove identity, delivery, legality, or contractual performance.

### Stage 5: Maintain habits and evaluate providers

Bitcoin Best Practices for Safe Everyday Use gathers the route into repeatable habits: obtain software through the expected source, know what each security control protects, preserve recovery information for the exact arrangement, verify the network and payment path, review transactions before signing, understand fees and confirmations, manage UTXO and privacy tradeoffs, test recovery carefully, and plan for continuity.

A practice remains useful only if it can be maintained. Wallets, software, devices, services, participants, locations, and threat assumptions can change. Security review therefore continues after setup day.

The final wallet-provider step applies the whole path to an outside organization or project. A provider may supply an interface, signing device, server, coordinator, recovery process, account, or custody arrangement. The provider and wallet are not the same thing, and provider involvement does not automatically mean provider custody.

Evaluate the provider through seven boundaries:

1. Who can authorize spending, alone or together?
2. Where do balances, fees, and transaction status come from?
3. Which keys, phrases, descriptors, files, accounts, devices, and signers are required for recovery?
4. What evidence connects installed software to its source and release process?
5. Which wallet, device, account, and network information can the provider observe?
6. Can the wallet continue or be recovered if the provider disappears?
7. Which entity, terms, and jurisdiction govern the service?

Terms such as noncustodial, hardware wallet, open source, collaborative custody, or secure do not answer every question. Product features, provider roles, supported regions, account policies, recovery processes, software releases, and legal classifications can change and require renewal immediately before publication.

### Branching and completion

Readers missing Bitcoin foundations should branch to `MSC-PATH-START | Start With Bitcoin`. Readers who need deeper UTXO, mempool, fee, node, mining, confirmation, and consensus mechanics should branch to `MSC-PATH-NETWORK | Understand the Network`. Wallet and node Tools connections remain planned until those products exist and are separately approved.

Completion means the reader can identify the custody model, protect recovery material, separate keys from addresses and passwords, describe a threat model, map privacy leaks, review an on-chain payment, distinguish fee estimation from confirmation, choose an acceptance policy, and evaluate provider dependencies.

Completion does not certify a wallet, provider, person, or setup as safe. The planned return destination is `MSC-LRN-HOME | Learn`, where readers can choose another path or category. Every step card, branch, return action, and URL remains inactive editorial planning until implementation and publication are separately authorized.

## 3. Destination structure or sequence

### Stage 1: Locate the wallet and custody boundary

Steps 1 and 2 define wallet functions, spending authority, custody models, dependencies, and operational responsibility.

### Stage 2: Protect recovery and signing authority

Steps 3 through 5 cover seed phrases, key and signature roles, threat models, device and software boundaries, backup, recovery, and continuity.

### Stage 3: Understand privacy as information flow

Step 6 maps on-chain, wallet, network, service, payment, and device privacy without promising anonymity.

### Stage 4: Transact carefully and assess settlement

Steps 7 through 9 cover destination review, transaction construction, fees, relay, block inclusion, confirmation depth, and risk-based acceptance.

### Stage 5: Maintain habits and evaluate providers

Steps 10 and 11 convert the route into maintainable practices and a provider-evaluation framework.

Path order is educational sequencing. It does not replace any destination's permanent canonical navigation.

## 4. Card or step copy

### Step 1: MSC-GUIDE-005 | What Is a Bitcoin Wallet?

- Step number: 1
- Registry ID: MSC-GUIDE-005
- Approved H1: What Is a Bitcoin Wallet?
- Why this step appears here: Begin by locating the interface, keys, wallet state, network data, transaction construction, signing, and recovery roles.
- Understand before continuing: A wallet manages keys and transaction activity; it does not store bitcoin as coin files or reveal the complete custody model through its interface alone.
- Depth: Surface
- Estimated reading time: 9 to 10 minutes
- Planned status: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Step 2: MSC-GUIDE-006 | What Is Bitcoin Self-Custody?

- Step number: 2
- Registry ID: MSC-GUIDE-006
- Approved H1: What Is Bitcoin Self-Custody?
- Why this step appears here: Identify who controls spending authority and where counterparty, operational, recovery, and continuity risks sit.
- Understand before continuing: Self-custody reduces some custodian dependence while creating direct responsibility; it is not automatically safer or appropriate for every person.
- Depth: Surface
- Estimated reading time: 10 to 11 minutes
- Planned status: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Step 3: MSC-GUIDE-009 | What Is a Bitcoin Seed Phrase?

- Step number: 3
- Registry ID: MSC-GUIDE-009
- Approved H1: What Is a Bitcoin Seed Phrase?
- Why this step appears here: Introduce common recovery material only after custody responsibility and failure boundaries are clear.
- Understand before continuing: A phrase may recreate powerful key material under a wallet standard, but complete recovery can require additional configuration and participants.
- Depth: Surface
- Estimated reading time: 9 to 11 minutes
- Planned status: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Step 4: MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work

- Step number: 4
- Registry ID: MSC-GUIDE-010
- Approved H1: How Bitcoin Public and Private Keys Work
- Why this step appears here: Explain authorization, verification, address encoding, derivation, and multi-key spending before operational security.
- Understand before continuing: Private keys authorize spending under applicable conditions, while addresses, public keys, signatures, scripts, and seed material are related but distinct.
- Depth: Shallow
- Estimated reading time: 10 to 12 minutes
- Planned status: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Step 5: MSC-GUIDE-011 | How to Keep Bitcoin Secure

- Step number: 5
- Registry ID: MSC-GUIDE-011
- Approved H1: How to Keep Bitcoin Secure
- Why this step appears here: Turn wallet, custody, recovery, and key concepts into a threat-model-based security system.
- Understand before continuing: Security must address theft, loss, software, devices, backups, recovery, privacy, physical access, people, and maintainability as separate layers.
- Depth: Surface
- Estimated reading time: 10 to 12 minutes
- Planned status: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Step 6: MSC-GUIDE-012 | How Bitcoin Privacy Works

- Step number: 6
- Registry ID: MSC-GUIDE-012
- Approved H1: How Bitcoin Privacy Works
- Why this step appears here: Add information-flow analysis before the reader creates public transaction records.
- Understand before continuing: Bitcoin is pseudonymous, not automatically anonymous, and privacy depends on on-chain, wallet, network, service, payment, device, and later-spending behavior.
- Depth: Shallow
- Estimated reading time: 11 to 13 minutes
- Planned status: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Step 7: MSC-GUIDE-007 | How to Send and Receive Bitcoin

- Step number: 7
- Registry ID: MSC-GUIDE-007
- Approved H1: How to Send and Receive Bitcoin
- Why this step appears here: Apply wallet, key, security, and privacy concepts to an on-chain payment workflow.
- Understand before continuing: A QR code, wallet display, signature, broadcast result, or transaction identifier does not by itself prove the intended destination or confirmation.
- Depth: Surface
- Estimated reading time: 10 to 11 minutes
- Planned status: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Step 8: MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work

- Step number: 8
- Registry ID: MSC-GUIDE-008
- Approved H1: How Bitcoin Transactions and Fees Work
- Why this step appears here: Show what the wallet constructs and why UTXO selection, change, weight, fee rate, policy, and fee management affect a payment.
- Understand before continuing: Fees compete for block space, mempools are node-local, and an estimate or fee-bump method cannot guarantee confirmation timing.
- Depth: Shallow
- Estimated reading time: 11 to 13 minutes
- Planned status: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Step 9: MSC-GUIDE-014 | How Bitcoin Confirmations Work

- Step number: 9
- Registry ID: MSC-GUIDE-014
- Approved H1: How Bitcoin Confirmations Work
- Why this step appears here: Separate wallet detection and mempool status from selected-chain inclusion and increasing settlement depth.
- Understand before continuing: Confirmation begins with valid block inclusion, additional depth reduces practical reorganization risk, and no universal count guarantees finality.
- Depth: Surface
- Estimated reading time: 9 to 11 minutes
- Planned status: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Step 10: MSC-GUIDE-016 | Bitcoin Best Practices for Safe Everyday Use

- Step number: 10
- Registry ID: MSC-GUIDE-016
- Approved H1: Bitcoin Best Practices for Safe Everyday Use
- Why this step appears here: Convert the prior concepts into maintainable software, recovery, transaction, privacy, support, and continuity habits.
- Understand before continuing: A best practice reduces avoidable risk only when it fits the actual tool, user, custody model, and threat model.
- Depth: Surface
- Estimated reading time: 11 to 13 minutes
- Planned status: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

### Step 11: MSC-GUIDE-074 | How Bitcoin Wallet Providers Operate

- Step number: 11
- Registry ID: MSC-GUIDE-074
- Approved H1: How Bitcoin Wallet Providers Operate
- Why this step appears here: Finish by applying the path's authority, recovery, privacy, provenance, continuity, and legal-boundary questions to a provider.
- Understand before continuing: A provider may supply one or several wallet functions, and labels such as noncustodial or open source do not fully describe spending authority, data exposure, recovery, or exit.
- Depth: Surface
- Estimated reading time: 9 minutes
- Planned status: COPY_LOCKED editorial source, not yet a confirmed published URL
- URL: None. Keep inactive until publication and URL confirmation.

## 5. Key Terms

- **Wallet:** Software or hardware that manages keys, constructs transactions, and helps users interact with Bitcoin.
- **Custody:** Control over the keys or authorization needed to move bitcoin.
- **Self-Custody:** Direct control of the keys needed to spend bitcoin.
- **Threat model:** A defined view of the assets, adversaries, capabilities, failure modes, and assumptions relevant to a security decision.
- **Seed phrase:** A human-readable backup representation used by many wallets to derive keys under a wallet standard.
- **Private key:** Secret cryptographic material used to authorize spending.
- **Public key:** Cryptographic data derived from a private key and used in Bitcoin spending conditions and signatures.
- **Digital signature:** Cryptographic proof that a valid private key authorized a transaction or message.
- **Address:** A destination representation used by wallets to construct a Bitcoin locking script.
- **Multisig:** A spending condition requiring a defined threshold of multiple keys to authorize a transaction.
- **Bitcoin security:** The practices and system properties used to protect keys, funds, software, devices, and network validation.
- **Bitcoin privacy:** The degree to which transaction activity, ownership relationships, and user identity can remain difficult to observe or connect.
- **Transaction:** A data structure that spends existing UTXOs and creates new outputs.
- **UTXO:** An unspent transaction output that can be used as an input in a later transaction.
- **Fee rate:** The amount paid per unit of transaction weight or virtual size to compete for block space.
- **Mempool:** A node's local collection of valid unconfirmed transactions eligible for relay or block inclusion.
- **Confirmation:** The inclusion of a transaction in a block, followed by additional blocks that increase settlement depth.
- **Best practice:** A generally recommended method that reduces avoidable risk while remaining appropriate to the user, tool, and threat model.
- **Wallet provider:** A company or project that develops, distributes, or operates wallet software, signing devices, network services, account systems, or related wallet support.
- **Wallet server:** A network service that supplies wallet applications with transaction, script, UTXO, fee, or broadcast information.
- **PSBT:** A format for carrying unsigned or partially signed Bitcoin transaction data among separate constructors, coordinators, and signers.
- **Software provenance:** Evidence about where software came from and how a distributed artifact relates to a source, release process, signing key, or build procedure.

## 6. Sources

1. **MSC Learn Master Registry**
   Author or publisher: Mempool Surf Club Editorial
   Repository path: `docs/learn/MSC_Learn_Master_Registry.json`
   Supports: The approved eleven-step sequence, path purpose, branches, destination identities, and final provider step.

2. **MSC Learn content manifest**
   Author or publisher: Mempool Surf Club Editorial
   Repository path: `docs/learn/content/content-manifest.json`
   Supports: The unique path status and the copy-locked status of all eleven source guides.

3. **Wallet and custody source packages**
   Author or publisher: Mempool Surf Club Editorial
   Repository paths: `docs/learn/content/guides/MSC-GUIDE-005-what-is-a-bitcoin-wallet.md`; `docs/learn/content/guides/MSC-GUIDE-006-bitcoin-self-custody.md`
   Supports: Wallet-system boundaries, spending authority, custody models, operational responsibility, recovery dependencies, and threat-model framing.

4. **Recovery, keys, security, and privacy source packages**
   Author or publisher: Mempool Surf Club Editorial
   Repository paths: `docs/learn/content/guides/MSC-GUIDE-009-bitcoin-seed-phrase.md`; `docs/learn/content/guides/MSC-GUIDE-010-bitcoin-public-private-keys.md`; `docs/learn/content/guides/MSC-GUIDE-011-bitcoin-security.md`; `docs/learn/content/guides/MSC-GUIDE-012-bitcoin-privacy.md`
   Supports: Mnemonic limits, derivation and signing authority, layered security, recovery, privacy information flows, and non-guarantee language.

5. **Transaction, fee, confirmation, and everyday-practice source packages**
   Author or publisher: Mempool Surf Club Editorial
   Repository paths: `docs/learn/content/guides/MSC-GUIDE-007-send-and-receive-bitcoin.md`; `docs/learn/content/guides/MSC-GUIDE-008-bitcoin-transactions-and-fees.md`; `docs/learn/content/guides/MSC-GUIDE-014-bitcoin-confirmations.md`; `docs/learn/content/guides/MSC-GUIDE-016-bitcoin-best-practices.md`
   Supports: Payment review, UTXO and fee mechanics, relay and mempool boundaries, confirmation depth, risk-based acceptance, and maintainable operating habits.

6. **Wallet-provider source package**
   Author or publisher: Mempool Surf Club Editorial
   Repository path: `docs/learn/content/guides/MSC-GUIDE-074-bitcoin-wallet-providers.md`
   Supports: Provider roles, custody and signing boundaries, wallet servers, software provenance, privacy, continuity, legal scope, and publication-time renewal requirements.

7. **Approved glossary data**
   Author or publisher: Mempool Surf Club Editorial
   Repository path: `snippets/msc-learn-glossary-data.liquid`
   Supports: Canonical glossary language used across the path.

## 7. SEO title

Use Bitcoin Safely: Wallet, Recovery, Privacy, and Provider Path

## 8. Meta description

Follow a threat-model-first Bitcoin path through wallets, custody, recovery, keys, privacy, transactions, confirmations, safe habits, and provider evaluation.

## 9. Page excerpt

Learn to locate custody and provider boundaries, protect recovery material, review transactions, understand privacy and confirmation limits, and maintain safer Bitcoin habits.

## 10. Estimated reading time

8 minutes for path orientation, excluding linked destinations

## 11. Planned internal links

Do not activate planned links until each destination exists as a real published page with a confirmed URL.

- MSC-GUIDE-005 | What Is a Bitcoin Wallet?
- MSC-GUIDE-006 | What Is Bitcoin Self-Custody?
- MSC-GUIDE-009 | What Is a Bitcoin Seed Phrase?
- MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work
- MSC-GUIDE-011 | How to Keep Bitcoin Secure
- MSC-GUIDE-012 | How Bitcoin Privacy Works
- MSC-GUIDE-007 | How to Send and Receive Bitcoin
- MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- MSC-GUIDE-014 | How Bitcoin Confirmations Work
- MSC-GUIDE-016 | Bitcoin Best Practices for Safe Everyday Use
- MSC-GUIDE-074 | How Bitcoin Wallet Providers Operate
- MSC-PATH-START | Start With Bitcoin
- MSC-PATH-NETWORK | Understand the Network
- MSC-HUB-BASICS | Bitcoin Basics
- MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem
- MSC-LRN-HOME | Learn
- MSC-GLOSSARY-001 | Bitcoin Glossary
- Relevant wallet and node Tools pages after those products exist and are separately approved

## 12. Accuracy review checklist

- [x] Registry metadata matches the approved master-registry record.
- [x] The path contains exactly eleven steps in the approved sequence.
- [x] The path is organized into five educational stages without changing canonical destination order.
- [x] Every step uses its copy-locked source guide's approved ID, H1, depth, and reading-time metadata.
- [x] Wallet, custody, self-custody, recovery, keys, addresses, signatures, and passwords remain distinct.
- [x] Self-custody is not presented as automatically safer or universally appropriate.
- [x] No realistic recovery phrase or instruction to expose secret material appears.
- [x] Security begins with a threat model and separates theft, loss, software, device, backup, privacy, physical, continuity, and human risks.
- [x] Bitcoin is not described as automatically anonymous, and no privacy technique is presented as a guarantee.
- [x] QR codes, signatures, transaction identifiers, broadcasts, mempool states, and wallet notifications are not treated as confirmation or proof of human intent.
- [x] Fees, fee rates, node-local mempools, miner selection, replacement, and confirmation remain separate.
- [x] No universal confirmation count or transaction-acceptance rule is prescribed.
- [x] Wallet-provider labels do not substitute for authority, recovery, privacy, provenance, continuity, and legal-scope analysis.
- [x] Provider features, roles, supported regions, policies, releases, and legal classifications require publication-time renewal.
- [x] Branches and return actions remain optional, inactive, and non-duplicative.
- [x] Every planned URL remains inactive and unassigned.
- [x] Exactly three complete illustration briefs are included, each with `Status: PLANNED`.
- [x] Human Verification was completed by Mempool Surf Club Editorial on 2026-07-31.
- [x] Independent editorial and accuracy review verified all eleven cards, source-guide alignment, sequence, stage transitions, branches, completion state, return destination, renewal requirements, inactive links, and illustration completeness before copy lock.
- [x] No em dash or en dash character appears.

## 13. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-31
- Notes:
  - Human Verification is complete.
  - Independent editorial and accuracy review was completed against the live registry and manifest and all eleven copy-locked source guides.
  - The review verified the exact eleven-guide sequence, five-stage progression, source-guide metadata, unique card rationale, custody and authority boundaries, threat-model framing, privacy limits, transaction and confirmation boundaries, provider evaluation, branching, completion state, return destination, renewal requirements, inactive links, and three complete planned illustration briefs.
  - Required corrections: None.
  - Editorial decision: `USE BITCOIN SAFELY PATH EDITORIAL REVIEW: ACCEPTED`.
  - Copy Lock record: `COPY_LOCKED` on 2026-07-31.
  - Provider features, supported regions, custody arrangements, recovery processes, software releases, terms, legal scope, and other mutable claims require renewal immediately before publication.

## 14. Illustration brief

### Illustration 1

- Concept title: The Safe Use Passage Chart
- Educational purpose: Show the five-stage route from wallet and custody boundaries through recovery, privacy, transactions, maintenance, and provider evaluation without presenting a safety guarantee.
- Recommended placement: After the section titled Stage 5: Maintain habits and evaluate providers.
- Visual description: Vintage nautical passage chart with eleven numbered waypoints grouped into five sea regions. The route begins at Wallet and Custody, passes through Recovery and Signing Authority, Privacy, Transactions and Settlement, and ends at Habits and Provider Evaluation. A side legend shows optional branches to Start With Bitcoin and Understand the Network. Use muted cartographic color, technical labels, approved MSC borders, and no unrelated corner data points.
- Required labels: Wallet and Custody, Recovery and Signing Authority, Privacy, Transactions and Settlement, Habits and Provider Evaluation, Steps 1-11, Start With Bitcoin, Understand the Network
- Caption: The route moves from locating spending authority into recovery, privacy, transaction review, settlement, maintainable habits, and provider evaluation.
- Alt text: Vintage nautical route chart with eleven numbered waypoints grouped into five stages from wallet basics to provider evaluation.
- Image orientation: Landscape
- Mobile crop notes: Preserve all five stage labels and the continuous route; place the optional branches in a compact lower legend.
- Status: PLANNED

### Illustration 2

- Concept title: Threat Model and Recovery Tide Table
- Educational purpose: Separate unauthorized spending, permanent loss, privacy exposure, service failure, device failure, and unavailable participants while showing the recovery information each setup may require.
- Recommended placement: After the section titled Stage 2: Protect recovery and signing authority.
- Visual description: Technical nautical tide table with risk rows on the left and recovery components across the top. Cells show where devices, seed material, passphrases, descriptors, multisignature policy, other signers, software, and instructions affect a recovery path. A clear note states that more complexity is not automatically safer. Use calm engineering-cartography styling, muted colors, approved borders, and no product logos.
- Required labels: Unauthorized spending, Permanent loss, Privacy exposure, Service failure, Device failure, Unavailable participant, Seed material, Passphrase, Descriptor, Multisignature policy, Other signers, Software, Instructions
- Caption: A custody plan must address several different failure modes and preserve the information needed for the exact recovery arrangement.
- Alt text: Nautical tide table mapping six Bitcoin failure modes against devices, recovery material, wallet configuration, signers, software, and instructions.
- Image orientation: Landscape
- Mobile crop notes: Keep the six risk rows legible and stack recovery components into two compact header bands.
- Status: PLANNED

### Illustration 3

- Concept title: Wallet Provider Dependency and Exit Map
- Educational purpose: Help readers evaluate which provider functions can authorize spending, observe activity, interrupt service, or affect recovery and exit.
- Recommended placement: After the section titled Branching and completion.
- Visual description: Vintage technical harbor map with separate stations for Interface, Wallet State, Transaction Construction, Signer, Network Data, Broadcast, Account, Backup, and Recovery. Lines connect each station to three gauges labeled Spending Authority, Observed Data, and Provider Dependence. An exit channel shows which keys, descriptors, files, devices, and signers may permit independent continuation. Use muted nautical colors, approved MSC border family, technical linework, and no ranking symbols.
- Required labels: Interface, Wallet State, Transaction Construction, Signer, Network Data, Broadcast, Account, Backup, Recovery, Spending Authority, Observed Data, Provider Dependence, Exit information
- Caption: Provider evaluation begins by locating authority, information exposure, service dependencies, and the materials required to continue or recover without the provider.
- Alt text: Technical harbor map showing wallet-provider functions connected to spending authority, observed data, provider dependence, and an independent exit channel.
- Image orientation: Landscape
- Mobile crop notes: Keep the three gauges and exit channel visible; stack the nine provider-function stations in a readable vertical sequence.
- Status: PLANNED
