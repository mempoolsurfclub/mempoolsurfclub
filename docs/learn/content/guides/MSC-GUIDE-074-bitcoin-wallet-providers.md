---
registry_id: MSC-GUIDE-074
status: COPY_LOCKED
page_role: topic-guide
h1: How Bitcoin Wallet Providers Operate
handle: bitcoin-wallet-providers
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

# How Bitcoin Wallet Providers Operate

## 1. Introductory deck

A Bitcoin wallet provider may develop an application, manufacture a signing device, operate network servers, coordinate several keys, maintain customer accounts, or combine several of these roles. The provider and the wallet are not the same thing, and provider involvement does not automatically mean that the provider controls the bitcoin.

The important boundaries are who can authorize spending, where the wallet obtains transaction information, what must be preserved for recovery, what information the provider can observe, and whether the wallet can continue operating without that provider. Understanding these boundaries helps readers evaluate wallet designs without relying on product labels, feature counts, rankings, or promotional security claims.

## 2. Full article

A wallet provider can build or operate one or more parts of a Bitcoin wallet system. The wallet is the combined state and functions used to derive receiving information, recognize relevant transactions, construct spends, obtain required signatures, and communicate with the Bitcoin network. The provider is the company or project supplying some of those parts.

A useful map is:

`interface → wallet state → transaction construction → signing → network data → broadcast → backup and recovery`

One organization may supply the whole path. Another may publish only an interface, manufacture a signing device, run a wallet server, coordinate several signers, or provide support around software that can continue without it. The important questions are which functions the provider performs, which information it can observe, and which actions it can authorize.

### What a wallet provider is

A wallet provider develops, distributes, or operates wallet software or related services. A wallet is not merely the screen a user sees. The interface presents information and collects instructions, while wallet state can include keys or public-key information, descriptors, watched scripts, transaction history, labels, and the wallet’s current view of spendable outputs.

Wallet responsibilities can be separated. One component may generate keys, another may store them, another may construct transactions, another may sign, and another may obtain network data or broadcast. A software developer, hardware manufacturer, hosted account service, signing coordinator, server operator, and custodian can therefore occupy different roles. Some providers combine several roles; others provide only one.

### Provider responsibility is not Bitcoin authority

Bitcoin consensus determines whether transactions and blocks satisfy the rules enforced by validating nodes. A wallet provider controls different matters: interface design, supported script types, coin selection, fee estimates, server defaults, account policy, update distribution, backup workflows, and customer support.

A provider can display an incomplete balance, construct an unsuitable transaction, recommend a poor fee, or fail to broadcast. Those outcomes do not make an invalid transaction valid. Conversely, a valid transaction may be absent or delayed in an application because the wallet has not discovered it, the provider’s server is unavailable, or an account policy has not recognized it.

Bitcoin Core can operate as a validating node and can include wallet functionality, but its wallet is one implementation. Other wallets can divide the same responsibilities differently.

### How a wallet learns about Bitcoin activity

Bitcoin does not send a ready-made account balance to a wallet. Transactions create outputs, and outputs that remain unspent are UTXOs. A wallet derives a balance by identifying outputs associated with scripts it watches and determining whether those outputs remain available to spend under its wallet model.

That information can come from a user-operated full node, a provider wallet server, a public server, an API or indexer, or a compact-filter workflow. These paths can produce similar-looking screens while carrying different validation, privacy, completeness, and availability assumptions.

A full node validates blocks and transactions against the Bitcoin rules it enforces. A wallet server or indexer organizes blockchain-derived information for efficient lookup. An API is an interface through which a wallet may request that information. These systems are not interchangeable merely because they return balances or transaction histories.

As of July 30, 2026, Sparrow documents connections through a public server, Bitcoin Core, or a private Electrum server, and warns that a public server receives public-key information. Electrum’s documentation on that date describes a client-server design and explains that a server can omit transactions or learn queried addresses, while users seeking stronger privacy or independent data can operate their own server. These are product-specific examples of a general boundary: a server can influence or observe a wallet’s view without holding the private keys needed to spend.

BIP 157 and BIP 158 describe compact-filter workflows in which clients obtain filters and retrieve potentially relevant blocks for local scanning. This can reduce direct disclosure of address queries. It does not by itself turn the client into a full validating node or remove peer-selection, network-privacy, and availability considerations.

### Key generation, storage, construction, signing, and broadcast

Key generation, key storage, transaction construction, signing, and broadcasting are separate jobs. A connected software wallet may perform all of them on one device. A watch-only wallet can monitor activity and construct unsigned transactions while an external signer keeps the private keys elsewhere.

BIP 174’s Partially Signed Bitcoin Transaction format allows transaction information and partial signatures to move among constructors, coordinators, and signers. PSBT is a coordination format, not proof that a particular device or person verified the recipient, amount, fee, or change correctly.

A hardware wallet is most precisely described as a dedicated signing device. It can keep key material separate from a general-purpose computer and may provide an independent display for review. It does not remove the need to protect recovery material, verify transaction details, maintain firmware, assess the companion interface, or account for supply-chain and human risks.

Signing is also different from broadcasting. A validly signed transaction can be passed to a node or service for broadcast, and the broadcaster does not need the private keys. Broadcast does not guarantee relay, mining, or confirmation.

### Custodial, noncustodial, and collaborative arrangements

In a custodial model, the provider or its appointed custodian controls the signing process for the applicable funds. The user submits an instruction through an account, while the provider can authorize, delay, refuse, or condition the resulting spend under its systems and terms. The provider may use multiple internal keys or approval steps, but the user does not independently hold the authority required to move those funds.

In a noncustodial model, the user controls the keys required to authorize spending. That does not make the wallet provider-independent. The application may still depend on provider servers, cloud backups, account login, update infrastructure, or proprietary components. “Noncustodial” is therefore a statement about spending authority, not a complete description of privacy, availability, recovery, or software provenance.

Collaborative arrangements divide signing authority. A two-of-three wallet, for example, requires two signatures from three defined keys. A provider holding one key cannot spend alone, but its participation may still matter for a particular recovery or service path.

As of July 30, 2026, Casa documents both three-key and five-key vault designs. In its stated three-key model, Casa holds one recovery key and says it cannot satisfy the two-signature threshold alone. Unchained describes a model in which clients hold two keys and the provider holds a third. These examples illustrate provider-assisted threshold arrangements. They are provider descriptions, not independent proof of implementation quality, security, future availability, or suitability.

### Account recovery and cryptographic wallet recovery

An account password reset restores access to an account. It does not automatically recreate private keys. Some designs may connect an account process to encrypted key material or provider-controlled custody, but the result depends on the specific architecture.

A seed or recovery phrase serves a different purpose. BIP 39 defines one mnemonic system in which the words and an optional passphrase derive a seed commonly used with hierarchical deterministic wallets. BIP 39 is not universal, and the words alone may not reproduce the wallet a user expects. A passphrase, derivation path, script type, account index, wallet descriptor, or multisignature configuration can change what is recovered.

Output script descriptors describe scripts, keys, and derivation information a wallet watches or uses. BIP 380 explains why private keys alone may not identify the intended wallet structure. Multisignature recovery can also require the threshold, participating extended public keys, master fingerprints, derivation paths, and script type.

Provider continuity belongs in the recovery model. As of July 30, 2026, Casa documents a sovereign-recovery process for supported vaults using independent software and exported public information. Unchained’s documentation on that date explains that its multisignature configuration file, together with the required user-held keys, can reconstruct a wallet outside its service. These are documented recovery claims. This Accuracy Review confirmed the current provider documentation but did not independently execute the recovery procedures or test every supported configuration.

### Software distribution, updates, and provenance

A wallet’s software path can include:

`source repository → license → release tag → build process → packaged artifact → distribution channel → installed software → update`

Each step answers a different question. Open source concerns licensing rights, including access, use, modification, and redistribution. Source that can merely be viewed is not necessarily open source. An open-source client can also rely on a closed server, proprietary firmware, an app store, or provider-operated infrastructure.

A release signature can show that an artifact or manifest was approved by whoever controlled a particular signing key, assuming the key’s identity and handling are established. A checksum can show that a file matches a referenced artifact. Neither proves that the source is safe, the build environment was trustworthy, or the signing process was uncompromised.

A reproducible build asks whether the same defined source, instructions, and environment can produce bit-for-bit identical specified artifacts. As of July 30, 2026, Trezor documents a firmware-reproduction process that accounts for signatures and model-specific headers. Sparrow’s documentation on that date describes release signatures and hashes and separately identifies build and packaging boundaries. These processes can provide evidence about source-to-binary correspondence when independently performed for an exact release. They do not prove that the code, hardware, servers, or operating procedures are free of vulnerabilities.

### Privacy, metadata, and evidence

A provider may be unable to spend bitcoin while still learning substantial wallet information. Depending on the design, it may observe an account identity, IP address, device details, extended public keys, address or script queries, transaction history, broadcast timing, telemetry, crash reports, and support communications.

An extended public key is not a signing secret, but it can reveal or derive broad sets of public wallet information. Running a node or scanning locally can reduce particular third-party disclosures, but it does not erase on-chain relationships, network metadata, device telemetry, or information shared through account and support systems.

Security evidence should be read by scope. Architecture documentation describes intended design. A repository exposes source for inspection. A signed release addresses a signing key and artifact. Reproducibility addresses source-to-artifact correspondence. An audit, penetration test, or recovery exercise covers a defined target and time period. None of these alone proves the absence of vulnerabilities or operational failure.

### Continuity, legal boundaries, and a practical evaluation

Continuity depends on more than whether a company remains in business. A wallet may rely on an application, server, app-store listing, firmware repository, cloud-backup service, account system, update key, or support team. A useful description identifies what must remain available and what information permits independent recovery.

Legal obligations depend on activity, entity, jurisdiction, and facts. In the United States, FinCEN’s 2019 guidance applies a facts-and-circumstances analysis to certain convertible-virtual-currency business models. In the European Union, MiCA establishes duties for defined crypto-asset service providers performing activities within its scope, including custody and administration for clients. Neither source makes every wallet developer a regulated custodian, and regulatory status does not prove technical security. This guide is general education, not legal advice.

A practical evaluation can use seven questions:

1. **Authority:** Who can authorize spending, alone or together?
2. **Network data:** Where do balances, fee estimates, and transaction status come from?
3. **Recovery:** Which keys, phrases, descriptors, files, accounts, and signers are required?
4. **Software provenance:** Which licenses, releases, signatures, hashes, and builds can be checked?
5. **Privacy:** What wallet, device, account, and network data leaves the user’s control?
6. **Continuity:** Can the wallet be reconstructed and spent from if the provider disappears?
7. **Legal and contractual scope:** Which entity, terms, and jurisdiction govern the service?

The goal is not to identify a universally best provider. It is to describe the system accurately enough to understand who controls what, which dependencies remain, and how failure or recovery would work.

## 3. Key Terms

* **Wallet provider:** A company or project that develops, distributes, or operates wallet software, signing devices, network services, account systems, or related wallet support.
* **Bitcoin wallet:** Software, hardware, or a coordinated system that manages information and functions used to receive, identify, and spend bitcoin.
* **Wallet state:** The keys or public-key information, watched scripts, descriptors, transaction records, labels, and other information a wallet uses to represent its activity.
* **Custody:** An arrangement in which a person or organization controls or administers the signing authority required to move another party’s funds.
* **Self-custody:** An arrangement in which the user independently controls the private keys required to authorize spending.
* **Private key:** Secret information used to produce a signature that satisfies an applicable Bitcoin spending condition.
* **Signing device:** A device designed to protect key material and sign transactions, commonly called a hardware wallet.
* **Wallet server:** A network service that supplies wallet applications with transaction, script, UTXO, fee, or broadcast information.
* **Full node:** Software that independently validates blocks and transactions against the Bitcoin rules it enforces.
* **Indexer:** A system that organizes blockchain-derived information for efficient lookup by wallets, explorers, APIs, or other applications.
* **API:** A defined interface through which software requests data or actions from another service.
* **Seed phrase or recovery phrase:** A sequence of words used by a particular wallet design to derive or restore key material.
* **Wallet descriptor:** A structured description of the scripts, keys, derivation information, and related details a wallet watches or uses.
* **PSBT:** A format for carrying unsigned or partially signed Bitcoin transaction data among separate constructors, coordinators, and signers.
* **Multisignature:** A spending arrangement that requires a defined threshold of signatures from a larger set of keys.
* **Collaborative custody:** An arrangement in which a user and one or more other parties hold different keys or signing roles; actual authority depends on the signing threshold and recovery design.
* **Open source:** Software distributed under licensing terms that provide defined rights involving source access, use, modification, and redistribution.
* **Source available:** Software whose source can be viewed under terms that may not provide the rights required by an open-source definition.
* **Signed release:** A software artifact or manifest accompanied by a digital signature associated with a particular signing key.
* **Reproducible build:** A build for which the same defined source, instructions, and environment can produce bit-for-bit identical specified artifacts.
* **Software provenance:** Evidence about where software came from and how a distributed artifact relates to a source, release process, signing key, or build procedure.

## 4. Sources

1. **Wallets** | Bitcoin developer documentation

   * URL: [https://developer.bitcoin.org/devguide/wallets.html](https://developer.bitcoin.org/devguide/wallets.html)
   * Published or updated: Not displayed
   * Accessed: July 30, 2026
   * Supports: The separation of wallet functions among key distribution, transaction construction, signing, and network communication, including watch-only, offline, and hardware-signing arrangements.
   * Limitation: The page is educational Bitcoin documentation and does not describe every current wallet implementation or provider service.

2. **Transactions** | Bitcoin developer documentation

   * URL: [https://developer.bitcoin.org/devguide/transactions.html](https://developer.bitcoin.org/devguide/transactions.html)
   * Published or updated: Not displayed
   * Accessed: July 30, 2026
   * Supports: Transaction inputs, outputs, UTXOs, change, and the wallet work involved in identifying and constructing spends.
   * Limitation: It does not establish any provider’s balance display, server behavior, coin-selection method, or custody model.

3. **Block Chain** | Bitcoin developer documentation

   * URL: [https://developer.bitcoin.org/devguide/block_chain.html](https://developer.bitcoin.org/devguide/block_chain.html)
   * Published or updated: Not displayed
   * Accessed: July 30, 2026
   * Supports: Node validation, transaction inclusion, block chaining, and the distinction between Bitcoin data and wallet representations.
   * Limitation: It does not determine wallet-provider interfaces, server policies, account records, or recovery procedures.

4. **BIP 32: Hierarchical Deterministic Wallets** | Bitcoin Improvement Proposals

   * URL: [https://bips.dev/32/](https://bips.dev/32/)
   * Published or updated: Assigned February 11, 2012; revision history displayed on the page
   * Accessed: July 30, 2026
   * Supports: Hierarchical derivation and the ability to use extended public information without sharing the corresponding private spending authority.
   * Limitation: BIP 32 does not define every backup format, script type, provider recovery process, or privacy practice.

5. **BIP 39: Mnemonic Code for Generating Deterministic Keys** | Bitcoin Improvement Proposals

   * URL: [https://bips.dev/39/](https://bips.dev/39/)
   * Published or updated: Assigned September 10, 2013
   * Accessed: July 30, 2026
   * Supports: One mnemonic system in which words and an optional passphrase derive a seed for deterministic-wallet use.
   * Limitation: BIP 39 is not universal and does not preserve script type, derivation path, wallet descriptor, account index, or multisignature configuration by itself.

6. **BIP 174: Partially Signed Bitcoin Transaction Format** | Bitcoin Improvement Proposals

   * URL: [https://bips.dev/174/](https://bips.dev/174/)
   * Published or updated: Assigned July 12, 2017; revision history displayed on the page
   * Accessed: July 30, 2026
   * Supports: A format for carrying transaction information and partial signatures among separate constructors, coordinators, and signers.
   * Limitation: PSBT support does not prove that a wallet or signer verifies transaction details correctly or that a particular workflow is secure.

7. **BIP 380: Output Script Descriptors General Operation** | Bitcoin Improvement Proposals

   * URL: [https://bips.dev/380/](https://bips.dev/380/)
   * Published or updated: Assigned June 27, 2021; revision history displayed on the page
   * Accessed: July 30, 2026
   * Supports: Descriptors as a language for expressing scripts, keys, derivation paths, and wallet export information.
   * Limitation: Descriptor support varies among applications, and a descriptor does not necessarily contain the private keys, account credentials, or provider procedures required for recovery.

8. **BIP 157: Client Side Block Filtering** | Bitcoin Improvement Proposals

   * URL: [https://bips.dev/157/](https://bips.dev/157/)
   * Published or updated: Assigned May 24, 2017
   * Accessed: July 30, 2026
   * Supports: A light-client protocol in which clients obtain compact-filter information from peers and retrieve potentially relevant blocks.
   * Limitation: It does not make a light client a full validating node or remove every privacy, peer-selection, and availability consideration.

9. **BIP 158: Compact Block Filters for Light Clients** | Bitcoin Improvement Proposals

   * URL: [https://bips.dev/158/](https://bips.dev/158/)
   * Published or updated: Assigned May 24, 2017
   * Accessed: July 30, 2026
   * Supports: The construction and contents of compact block filters used in BIP 157 workflows.
   * Limitation: It does not describe every wallet’s implemented scanning, peer selection, validation, or privacy behavior.

10. **Quick Start Guide** | Sparrow Wallet

    * URL: [https://sparrowwallet.com/docs/quick-start.html](https://sparrowwallet.com/docs/quick-start.html)
    * Published or updated: Not displayed
    * Accessed: July 30, 2026
    * Supports: Sparrow’s documented public-server, Bitcoin Core, and private Electrum-server connection choices and its warning about public-key information shared with public servers.
    * Limitation: Provider documentation establishes Sparrow’s stated behavior only and does not describe every wallet-server architecture.

11. **Download** | Sparrow Wallet

    * URL: [https://sparrowwallet.com/download/](https://sparrowwallet.com/download/)
    * Published or updated: Current release 2.5.3 displayed; page update date not displayed
    * Accessed: July 30, 2026
    * Supports: Sparrow’s documented manifest-signature, signer-key, and release-hash verification process.
    * Limitation: A valid signature and matching hash do not prove that the application is vulnerability-free or that the signing key and release infrastructure were uncompromised.

12. **Frequently Asked Questions** | Electrum documentation

    * URL: [https://electrum.readthedocs.io/en/latest/faq.html](https://electrum.readthedocs.io/en/latest/faq.html)
    * Published or updated: Not displayed
    * Accessed: July 30, 2026
    * Supports: Electrum’s documented client-server architecture, server privacy and omission boundaries, and personal-server option.
    * Limitation: The documentation describes Electrum and does not establish a universal server model or guarantee server accuracy, privacy, or availability.

13. **Electrum Bitcoin Wallet** | Electrum

    * URL: [https://electrum.org/](https://electrum.org/)
    * Published or updated: Electrum 4.8.0 displayed; page update date not displayed
    * Accessed: July 30, 2026
    * Supports: Electrum’s official source and binary distribution, signature-verification material, and reproducibility statements.
    * Limitation: These are project statements and release artifacts; this editorial review did not independently reproduce binaries or validate every signing key.

14. **Reproducible Builds** | Trezor Firmware documentation

    * URL: [https://docs.trezor.io/trezor-firmware/common/reproducible-build.html](https://docs.trezor.io/trezor-firmware/common/reproducible-build.html)
    * Published or updated: Not displayed
    * Accessed: July 30, 2026
    * Supports: Trezor’s documented procedure for building tagged firmware and comparing it with official firmware after accounting for signatures and model-specific headers.
    * Limitation: Provider documentation does not establish that this assignment independently reproduced a firmware release or assessed device hardware, manufacturing, or distribution.

15. **The Open Source Definition** | Open Source Initiative

    * URL: [https://opensource.org/osd](https://opensource.org/osd)
    * Published or updated: Last modified February 16, 2024
    * Accessed: July 30, 2026
    * Supports: The licensing and distribution criteria associated with open-source software and the distinction between source visibility and open-source rights.
    * Limitation: Open-source licensing does not establish software security, build provenance, maintenance quality, or provider continuity.

16. **Definitions: When Is a Build Reproducible?** | Reproducible Builds project

    * URL: [https://reproducible-builds.org/docs/definition/](https://reproducible-builds.org/docs/definition/)
    * Published or updated: Not displayed
    * Accessed: July 30, 2026
    * Supports: The definition of reproducibility using the same source, build environment, instructions, and bit-for-bit identical specified artifacts.
    * Limitation: Reproducibility addresses a source-to-artifact property and does not prove that the source, dependencies, or resulting software are safe.

17. **What Is Multisig?** | Casa

    * URL: [https://support.casa.io/knowledge/what-is-multisig](https://support.casa.io/knowledge/what-is-multisig)
    * Published or updated: May 28, 2026
    * Accessed: July 30, 2026
    * Supports: Casa’s current descriptions of three-key and five-key vault designs, signing thresholds, and the provider-held recovery key in its stated three-key model.
    * Limitation: This is Casa’s description of its service and does not independently prove implementation, operational controls, future availability, or suitability.

18. **Sovereign Recovery: Sending Funds Outside of Casa** | Casa

    * URL: [https://support.casa.io/knowledge/sovereign-recovery-sending-funds-outside-of-casa](https://support.casa.io/knowledge/sovereign-recovery-sending-funds-outside-of-casa)
    * Published or updated: May 14, 2026
    * Accessed: July 30, 2026
    * Supports: Casa’s documented provider-independent recovery process for supported vault configurations.
    * Limitation: This editorial review did not independently execute recovery for each configuration or verify compatibility with every current or future software release.

19. **What Is a Multisig Wallet Configuration File and What Is It For?** | Unchained

    * URL: [https://www.unchained.com/blog/what-is-a-multisig-wallet-configuration-file](https://www.unchained.com/blog/what-is-a-multisig-wallet-configuration-file)
    * Published or updated: First published December 1, 2021; last updated April 17, 2026
    * Accessed: July 30, 2026
    * Supports: Unchained’s stated key arrangement and the role of thresholds, extended public keys, derivation paths, fingerprints, script type, and configuration files in multisignature recovery.
    * Limitation: The page describes Unchained and related workflows and does not independently establish universal compatibility or successful recovery for every wallet.

20. **Application of FinCEN’s Regulations to Certain Business Models Involving Convertible Virtual Currencies** | Financial Crimes Enforcement Network

    * URL: [https://www.fincen.gov/resources/statutes-regulations/guidance/application-fincens-regulations-certain-business-models](https://www.fincen.gov/resources/statutes-regulations/guidance/application-fincens-regulations-certain-business-models)
    * Published or updated: May 9, 2019
    * Accessed: July 30, 2026
    * Supports: The activity- and facts-based application of United States Bank Secrecy Act rules to defined convertible-virtual-currency business models.
    * Limitation: The guidance does not classify every wallet developer, software publisher, provider, or current product and is not legal advice.

21. **Regulation (EU) 2023/1114 on Markets in Crypto-Assets** | European Union

    * URL: [https://eur-lex.europa.eu/eli/reg/2023/1114/oj](https://eur-lex.europa.eu/eli/reg/2023/1114/oj)
    * Published or updated: Published June 9, 2023; consolidated text displayed by EUR-Lex
    * Accessed: July 30, 2026
    * Supports: Defined European Union requirements for crypto-asset service providers performing custody and administration for clients.
    * Limitation: Applicability depends on the service, entity, activity, jurisdiction, transitional provisions, and facts; the regulation does not make every software developer a custodian or prove technical security.

## 5. SEO title

How Bitcoin Wallet Providers Operate

## 6. Meta description

Learn how Bitcoin wallet providers divide key control, signing, network access, recovery, privacy, software updates, and provider dependencies.

## 7. Page excerpt

Bitcoin wallet providers may supply an interface, signing device, network service, recovery process, account, or custody arrangement. This guide maps who can spend, what data may be exposed, what recovery requires, and whether a wallet can continue without its provider.

## 8. Estimated reading time

9 minutes

## 9. Planned internal links

Do not activate planned links until each destination exists as a real published page.

* Previous guide: `MSC-GUIDE-073 | How Bitcoin Exchanges Work`
* Next guide: `MSC-GUIDE-075 | How Bitcoin Marketplaces Work`
* Return destination: `MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem`
* Primary learning path: `MSC-PATH-ECOSYSTEM | Explore the Ecosystem`
* Secondary learning path: `MSC-PATH-SAFE | Use Bitcoin Safely`
* Prerequisite: `MSC-GUIDE-005 | What Is a Bitcoin Wallet?`
* Prerequisite: `MSC-GUIDE-006 | What Is Bitcoin Self-Custody?`
* Recommended branch guide: `MSC-GUIDE-005 | What Is a Bitcoin Wallet?`
* Related guide: `MSC-GUIDE-009 | What Is a Bitcoin Seed Phrase?`
* Related guide: `MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work`
* Related guide: `MSC-GUIDE-011 | How to Keep Bitcoin Secure`
* Related guide: `MSC-GUIDE-012 | How Bitcoin Privacy Works`
* Related guide: `MSC-GUIDE-013 | What Are UTXOs in Bitcoin?`
* Related guide: `MSC-GUIDE-016 | Bitcoin Best Practices for Safe Everyday Use`
* Related guide: `MSC-GUIDE-021 | What Is a Bitcoin Full Node?`
* Related guide: `MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?`
* Related guide: `MSC-GUIDE-042 | How Bitcoin Wallet Integrations Work`
* Related guide: `MSC-GUIDE-072 | What Bitcoin Infrastructure Companies Do`
* Related glossary terms: `Wallet provider`; `Wallet`; `Threat model`; `Custody`
* Future Tools connection: A practical wallet or node evaluation tool, activated only after a real destination exists.

## 10. Accuracy review checklist

* [x] Registry metadata and YAML match the canonical record.
* [x] Approved H1 and handle remain unchanged.
* [x] Article stays within Guide 074 and Surface depth.
* [x] Wallet, wallet provider, custodian, signer, coordinator, server, API, indexer, and node remain distinct.
* [x] User interface and wallet state remain distinct.
* [x] Key generation, key storage, transaction construction, signing, and broadcasting remain separate.
* [x] Bitcoin consensus, Bitcoin Core behavior, wallet implementation, provider policy, and law remain distinct.
* [x] The article does not describe a wallet as storing bitcoin in coin files.
* [x] Custodial, noncustodial, self-custodial, and collaborative arrangements are defined by actual authority.
* [x] No noncustodial label is accepted as proof of provider independence.
* [x] No signing device is presented as eliminating key-management, software, interface, supply-chain, or human risk.
* [x] Seed phrases are not described as provider passwords.
* [x] Account recovery and cryptographic wallet recovery remain distinct.
* [x] Wallet descriptors and multisignature configuration are included where recovery may require them.
* [x] Full nodes, wallet servers, APIs, compact filters, and indexers are described accurately.
* [x] Balance calculation and UTXO discovery are not treated as ready-made consensus outputs.
* [x] Compact filters are not presented as automatically providing full-node validation.
* [x] PSBT is presented as a coordination format rather than a security guarantee.
* [x] Open source, source available, signed releases, hashes, reproducible builds, audits, and security remain distinct.
* [x] Software provenance is not equated with software safety.
* [x] Provider claims are separated from independently established properties.
* [x] Privacy controls are not described as anonymity guarantees.
* [x] Provider continuity and external recovery are addressed.
* [x] Mutable provider statements include dates, attribution, and limitations.
* [x] Legal statements identify jurisdiction and remain activity- and facts-dependent.
* [x] Regulation is not presented as proof of technical security.
* [x] No provider is ranked, recommended, endorsed, or described as universally safe.
* [x] No active internal link, public URL, publication state, or Tools destination is invented.
* [x] Exactly three illustration briefs are complete and remain `PLANNED`.
* [x] Human Verification is complete.
* [x] Full Article word count and reading-time estimate meet the registry range.
* [x] Every provider-specific, release, recovery, privacy, and legal claim was renewed during Accuracy Review.
* [x] Accuracy Review is approved.
* [x] Copy Lock is approved.
* [ ] Publication-time source renewal is complete.

## 11. Human verification

* Reviewer: Mempool Surf Club Accuracy Review
* Review date: July 30, 2026
* Primary evidence reviewed: Current `main`, the canonical master-registry and content-manifest records, the current guide template and editorial workflow, and the copy-locked Guide 073 precedent; Bitcoin developer documentation; BIPs 32, 39, 157, 158, 174, and 380; current Sparrow, Electrum, Trezor, Casa, and Unchained official documentation; the Open Source Initiative; the Reproducible Builds project; FinCEN’s 2019 guidance; and Regulation (EU) 2023/1114.
* Verification method: Reopened each material source directly on July 30, 2026; matched claims to the exact technical role, product configuration, release, jurisdiction, and evidentiary scope; separated protocol rules, implementation behavior, provider statements, and law; and preserved explicit limitations where independent testing was not performed.
* Verification limits: This review did not independently reproduce software builds, validate signing keys, execute provider-independent recovery, audit hardware or server operations, or provide legal advice. Mutable provider, release, recovery, privacy, and legal claims must be renewed at publication.

## 12. Illustration brief

### Illustration 1

* Concept title: The Wallet Provider Responsibility Map
* Educational purpose: Show which functions may belong to the user, wallet interface, wallet state, signing environment, provider infrastructure, and Bitcoin network.
* Recommended placement: After the first explanation of what a wallet provider is.
* Visual description: A vintage nautical technical chart arranged from left to right. A user station connects to a wallet interface and wallet-state layer. Separate branches lead to key generation and storage, transaction construction, a signer, a provider wallet server, a user-operated full node, an API or indexer, transaction broadcast, and the Bitcoin peer-to-peer network. Solid lines show required operational paths; dashed lines show optional provider dependencies. Boundary frames distinguish user authority, provider responsibility, data services, and network consensus validation.
* Required labels: User; wallet interface; wallet state; key generation; key storage; transaction construction; signer; provider wallet server; full node; API or indexer; broadcast; Bitcoin network; consensus validation.
* Caption: A wallet provider may operate several wallet functions, but each function has a different authority and failure boundary.
* Alt text: Diagram separating the user, wallet interface, wallet state, key storage, signing, provider servers, full-node or indexed data, broadcasting, and Bitcoin consensus validation.
* Image orientation: Landscape
* Mobile crop notes: Preserve the complete path from the user to the Bitcoin network. Stack control and data zones vertically if necessary rather than removing labels.
* Status: PLANNED

### Illustration 2

* Concept title: How a Wallet Learns About Bitcoin Activity
* Educational purpose: Explain the different network-data pathways used to discover transactions, calculate balances, estimate fees, and broadcast.
* Recommended placement: In the section on full nodes, wallet servers, APIs, indexers, and compact filters.
* Visual description: A nautical route chart with one wallet at the center and four distinct pathways: a user-operated full node, a provider wallet server, a public server or third-party API and indexer, and a compact-filter route with local scanning. Each pathway includes small callouts for validation, privacy exposure, availability, and derived data. A separate outgoing arrow shows transaction broadcast and makes clear that broadcasting is not signing.
* Required labels: Wallet; full node; provider wallet server; public server; API; indexer; compact filters; local scanning; UTXO discovery; fee estimate; broadcast; metadata exposure; local validation; provider dependency.
* Caption: Wallets can obtain similar-looking information through systems with different validation, privacy, and availability properties.
* Alt text: Wallet connected through separate paths to a full node, provider wallet server, public API or indexer, and compact-filter source, with validation and privacy differences identified.
* Image orientation: Landscape
* Mobile crop notes: Retain the wallet and all four pathways. Allow the pathways to wrap into two rows on narrow screens.
* Status: PLANNED

### Illustration 3

* Concept title: Recovery and Provider-Continuity Boundaries
* Educational purpose: Distinguish seed-based recovery, account recovery, device replacement, collaborative multisignature recovery, and custodial recovery.
* Recommended placement: Near the account-recovery and cryptographic-recovery section.
* Visual description: A vintage field-guide decision map beginning with “Access lost.” Separate routes lead to local wallet recovery, signing-device replacement, collaborative multisignature recovery, provider-account recovery, and custodial withdrawal support. Each route identifies the keys, phrases, descriptors, configuration files, credentials, or approvals required and whether the provider is optional, assisting, required, or controlling.
* Required labels: Access lost; seed or recovery material; wallet descriptor; multisignature configuration; replacement signer; account credentials; provider recovery key; customer support; custodian approval; independent recovery; provider unavailable.
* Caption: Recovery depends on the original custody and wallet design; an account reset and cryptographic recovery are not the same process.
* Alt text: Decision diagram showing different recovery paths for self-custodied, signing-device, collaborative multisignature, provider-account, and custodial wallet arrangements.
* Image orientation: Landscape
* Mobile crop notes: Preserve every recovery branch and the provider-authority labels. Use a vertical decision tree on mobile.
* Status: PLANNED

### Shared visual requirements

* Vintage technical illustration
* Nautical-chart or field-guide influence
* Muted Mempool Surf Club palette
* Approved consistent border system
* Calm, systems-oriented composition
* No provider logos
* No product screenshots
* No shiny coins
* No generic cryptocurrency symbols
* No rankings, badges, shields, or winner imagery
* No decorative data points in the corners
