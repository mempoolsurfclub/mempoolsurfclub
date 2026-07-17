---
registry_id: MSC-GUIDE-011
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: How to Keep Bitcoin Secure
handle: bitcoin-security
category: Bitcoin Basics
subcategory: Security
depth: Surface
format: Guide
primary_path: Use Bitcoin Safely
secondary_paths:
  - Start With Bitcoin
author_display: Mempool Surf Club Editorial
reviewed_date: null
copy_locked_date: null
---

# How to Keep Bitcoin Secure

## 1. Introductory deck

Bitcoin security is not one device, backup material, or checklist. It is a maintainable plan for reducing unauthorized spending, permanent loss, privacy exposure, and operational failure across keys, software, devices, backups, services, locations, and people.

## 2. Full article

Bitcoin security begins by asking what can go wrong.

A wallet can be stolen. A backup can be destroyed. A service can freeze withdrawals. A user can approve the wrong destination. A trusted person can become unavailable. Software can be fake or outdated. A recovery plan can work in theory and fail when needed.

These are different risks. A setup that handles one well may handle another poorly.

The practical goal is not to eliminate all risk. It is to understand where control and failure live, reduce avoidable exposure, and maintain a recovery path that fits the user and the value being protected.

### Begin with a threat model

A threat model is a structured description of what needs protection, who or what could cause harm, and which failures matter most.

For Bitcoin, useful questions include:

- Is the main concern remote theft, physical theft, accidental loss, service failure, coercion, privacy leakage, or inability to recover?
- Who needs access now, and who may need access later?
- Which devices, people, services, and locations are trusted?
- How much complexity can the participants maintain?
- How quickly must funds be available?
- What happens if one component disappears?

The answers vary. A small spending wallet, a business treasury, and a long-term family recovery plan should not be assumed to need the same arrangement.

A threat model should also include ordinary mistakes. Forgotten passphrases, damaged backups, misunderstood multisignature policies, and incorrect transactions can be more likely than a dramatic technical attack.

### Protect against theft and loss

Bitcoin security has at least two opposing failure modes.

Unauthorized spending happens when someone gains enough authority to create a valid transaction.

Permanent loss happens when the legitimate user can no longer satisfy the spending condition or reconstruct the wallet.

Adding secrecy may reduce theft risk while increasing recovery risk. Adding copies may reduce loss risk while increasing exposure. Adding signers may reduce dependence on one key while increasing coordination and recovery complexity.

A balanced plan treats theft and loss as separate problems rather than assuming that more protection in one direction improves everything.

### Custodial and self-custodial risks differ

In a custodial arrangement, a service controls the keys or withdrawal authority. The user depends on the service's security, solvency, policy, legal environment, identity controls, and availability.

In Self-Custody, the user or a user-defined group controls the keys needed to spend. This can reduce dependence on a custodian, but it moves backup, transaction verification, device, and recovery responsibilities into the user's arrangement.

Neither model removes trust. Custody moves trust toward an institution. Self-Custody distributes trust across software, devices, backups, people, and procedures chosen by the user.

The important security question is not which label sounds stronger. It is where failure can occur and how recovery works.

### Separate the security layers

A Bitcoin setup can include several distinct layers:

1. Wallet software that tracks activity and constructs transactions.
2. A signing environment that protects private keys and produces signatures.
3. Backups that preserve recovery information.
4. A recovery procedure that explains how to rebuild the setup.
5. Network data used to identify balances and transactions.
6. Physical locations that protect devices and records.
7. People who hold knowledge, authority, or access.
8. Inheritance or continuity instructions.

Strength in one layer does not automatically secure the others.

A secure signing device does not create a complete backup. A durable backup does not prevent a substituted address. A private node does not verify that the human approved the intended transaction. A multisignature policy does not guarantee that the participants can recover it.

### Devices reduce some risks, not all risks

A hardware signing device is designed to keep private keys in a more restricted environment and sign without exposing those keys directly to a connected computer.

This can reduce risks from malware on the general-purpose device. It does not eliminate all risk.

The user still depends on the device's firmware, display, manufacturing and delivery process, backup method, transaction parsing, supported scripts, recovery procedure, and their own review.

A compromised computer may show one destination while asking the signing device to authorize another. The device can help only if the user checks reliable information on the trusted display and understands what is being approved.

The right lesson is not that hardware is useless or perfect. It is that each component has a defined security role.

### Software origin and verification matter

Wallet and node software should come from the expected project source.

Attackers can distribute fake applications, modified downloads, search advertisements, copied websites, and malicious update notices. A familiar logo is not proof that a file is authentic.

Open-source projects may publish checksums, digital signatures, reproducible build information, or platform-specific verification steps. The available method varies by project and user capability.

Verification should follow the project's current official documentation. Users should not invent a verification process they do not understand or assume that an app-store listing eliminates all supply-chain risk.

Updating can fix known vulnerabilities, but updates can also change behavior or compatibility. A maintainable process includes knowing where release information comes from and how recovery works if an update fails.

### Passwords, PINs, phrases, and keys have different jobs

A device PIN may restrict access to a signing device. A wallet password may encrypt a local file. A seed phrase may recreate wallet key material. An optional passphrase may change the derived wallet. A private key may authorize spending.

These controls should not be treated as interchangeable.

Changing a password does not change the keys controlling an existing output. Losing a PIN may affect device access but not necessarily recovery. Revealing a seed phrase can expose far more than one application session.

Security improves when users know which control protects which layer.

### Review receiving information

Receiving bitcoin can also involve security decisions.

A wallet may display an address on a computer, phone, or separate signing device. Malware can replace clipboard contents or alter a QR code. A merchant system can show the wrong invoice. A user can select the wrong network or payment path.

Important receiving information should be verified through the methods supported by the wallet arrangement. A separate trusted display can reduce dependence on a compromised computer, but it does not help if the wrong address was imported into the wallet configuration.

Address reuse also affects privacy, which can become a security concern when balances or relationships are exposed.

### Review before authorizing a spend

Before signing, a user should be able to identify:

- The destination.
- The amount.
- The fee.
- The network and payment path.
- Any change output.
- The effect of the transaction on wallet structure or privacy.

Not every wallet displays every detail clearly. A signer may show only a summary. A complex transaction may include multiple inputs and outputs.

The user should understand what the trusted signing environment can verify and which details still come from the coordinator or connected device.

A valid signature proves cryptographic authorization. It does not prove that the user saw accurate information or intended the economic result.

### Common scams target recovery and support

Fake support agents often ask for recovery phrases, private keys, remote access, screen sharing, or immediate movement of funds.

Phishing sites may imitate wallet downloads or account portals. Fake updates may install malware. Malicious QR codes and clipboard replacement can substitute destinations. Recovery scams may claim that a phrase must be "validated" online.

Recovery material should not be shared because someone claims to be support. Legitimate troubleshooting should begin with verified documentation and known project channels.

Urgency is a common pressure tactic. Pausing to verify the source is a security action, not a delay.

### Backups need both availability and secrecy

A backup should survive the failures included in the threat model. It also needs protection from unauthorized access.

Redundancy can help if one copy is destroyed or unavailable. Each additional copy, location, or person can also create a new exposure path.

The useful design depends on the amount at risk, the expected time horizon, local hazards, privacy needs, and who must recover the wallet.

No one medium, number of copies, or storage location is universally correct. A backup plan should be specific enough that the intended user can follow it and limited enough that unnecessary parties do not gain access.

### Recovery procedures deserve their own test

Possessing backup material is not the same as knowing how to recover.

Recovery may depend on a passphrase, derivation path, script type, descriptor, wallet file, account index, multisignature configuration, or other signers.

A controlled recovery test can reveal missing information and unclear steps. It can also create new exposure if secret material is entered into untrusted software, copied to a connected device, or observed by another person.

Testing should use verified wallet documentation and an environment appropriate to the threat model. The test should confirm the setup rather than merely checking that words pass a checksum.

### Single-signature, multisignature, and collaborative arrangements

A single-signature arrangement requires one authorized signature for each applicable spending path. It can be easier to understand and recover, while concentrating authority and recovery risk.

A multisignature arrangement requires a defined threshold of multiple keys. It can distribute authority across devices, people, or locations. It also requires coordination information, compatible software, and a recovery plan for unavailable signers.

A collaborative arrangement may involve a service that helps coordinate transactions or holds one key in a user-defined policy. This can provide support or recovery options while adding service, privacy, availability, and policy dependencies.

Complexity is not automatically security. A setup is only useful if the participants can operate, maintain, and recover it.

### Privacy and physical security are separate plans

A technically strong wallet can still expose sensitive information through public posts, service records, reused addresses, home-network data, or poor physical handling.

Privacy planning asks who can connect identity, balances, transactions, locations, and relationships.

Physical security asks who can access devices, backups, or people.

These plans overlap but should not be collapsed into one checklist. A backup location that is physically durable may be privacy-sensitive. A hidden device may be difficult for an heir to recover.

### Inheritance and continuity require clarity

Long-term security includes the possibility that the primary user cannot participate.

An inheritance or continuity plan may need to explain where information is located, which people are involved, what conditions apply, and how to distinguish legitimate recovery from a scam.

Giving one person complete access too early may create theft risk. Giving nobody enough information may create permanent loss.

The plan should match the custody arrangement and be understandable to the people expected to use it. It should also be maintained when software, devices, relationships, or locations change.

### Suspected compromise requires careful verification

A suspected compromise can involve a leaked phrase, exposed key, malicious device, fake wallet, substituted destination, or service-account problem.

The correct response depends on what is actually compromised. A wallet password change does not repair exposed Bitcoin keys. Moving funds through an unverified interface can make the problem worse.

At a high level, the user should pause, identify the affected layer, consult current verified documentation for the exact wallet, and use a carefully verified recovery or signing environment.

This guide does not provide an emergency transaction procedure because the safe steps depend on the setup and the nature of the compromise.

### Maintainability is a security feature

A plan that works only while one expert remembers every detail is fragile.

Security arrangements should be reviewed when the value at risk changes, software becomes unsupported, a device fails, a signer moves, or an inheritance plan changes.

Clear records, verified documentation, and a realistic level of complexity help keep the system recoverable.

The strongest setup is not the one with the most parts. It is the one that addresses the relevant threats and can still be understood and operated over time.

The next guide looks at privacy as another form of information security, with its own layers and tradeoffs.

## 3. Key Terms

**Self-Custody:** Direct control of the keys needed to spend bitcoin.

**Custody:** Control over the keys or authorization needed to move bitcoin.

**Wallet:** Software or hardware that manages keys, constructs transactions, and helps users interact with Bitcoin.

**Private key:** Secret cryptographic material used to authorize spending.

**Seed phrase:** A human-readable backup representation used by many wallets to derive keys under a wallet standard.

**Multisig:** A spending condition requiring a defined threshold of multiple keys to authorize a transaction.

**Cold storage:** A custody setup intended to keep signing keys away from internet-connected systems.

**Hot wallet:** A wallet whose signing environment is connected to an online device or service.

## 4. Sources

### Bitcoin Developer Guide: Wallets

- Author or publisher: Bitcoin Project developer documentation
- Direct URL: https://developer.bitcoin.org/devguide/wallets.html
- Supports: Wallet key management, deterministic backups, encrypted wallet files, and separation between wallet functions and Bitcoin outputs.

### BIP 39: Mnemonic Code for Generating Deterministic Keys

- Author or publisher: Marek Palatinus, Pavol Rusnak, Aaron Voisine, and Sean Bowe
- Direct URL: https://bips.dev/39/
- Supports: Mnemonic backups, optional passphrases, checksum behavior, and the limits of assuming universal BIP 39 compatibility.

### BIP 32: Hierarchical Deterministic Wallets

- Author or publisher: Pieter Wuille
- Direct URL: https://bips.dev/32/
- Supports: Hierarchical key derivation, extended keys, watch-only derivation, hardened branches, and recovery structure.

### BIP 129: Bitcoin Secure Multisig Setup

- Author or publisher: Hugo Nguyen, Peter Gray, Marko Bencun, Aaron Chen, and Rodolfo Novak
- Direct URL: https://bips.dev/129/
- Supports: Multisignature setup records, participant verification, wallet policy, and coordination information needed for reliable recovery.

### BIP 174: Partially Signed Bitcoin Transaction Format

- Author or publisher: Andrew Chow
- Direct URL: https://bips.dev/174/
- Supports: Separating transaction creation, updating, signing, and finalization across devices and participants.

### BIP 380: Output Script Descriptors General Operation

- Author or publisher: Pieter Wuille and Ava Chow
- Direct URL: https://bips.dev/380/
- Supports: Describing wallet scripts, keys, origins, and derivation paths for coordination and recovery.

### Bitcoin Core: Managing Wallets

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/doc/managing-wallets.md
- Supports: Bitcoin Core wallet creation, loading, backups, descriptor wallets, and wallet-management behavior.

### Bitcoin Core Binary Verification

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/contrib/verify-binaries/README.md
- Supports: Project-supported methods for checking downloaded Bitcoin Core release artifacts and signatures.

### Bitcoin Core Downloads

- Author or publisher: Bitcoin Core project
- Direct URL: https://bitcoincore.org/en/download/
- Supports: The official Bitcoin Core release channel, published checksums, signatures, and current release-verification references.

### BIP 21: URI Scheme

- Author or publisher: Nils Schneider and Matt Corallo
- Direct URL: https://bips.dev/21/
- Supports: Structured Bitcoin payment requests and the need to verify network, amount, and destination information.

## 5. SEO title

How to Keep Bitcoin Secure: A Risk-Based Guide

## 6. Meta description

Build a maintainable Bitcoin security plan around theft, loss, devices, software, backups, recovery, privacy, and custody tradeoffs without relying on one universal setup.

## 7. Page excerpt

Bitcoin security is a system of keys, devices, software, backups, people, and recovery procedures. This guide explains how to evaluate risks without prescribing one product or setup.

## 8. Estimated reading time

10 to 12 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work
- MSC-GUIDE-012 | How Bitcoin Privacy Works
- MSC-GUIDE-006 | What Is Bitcoin Self-Custody?
- MSC-GUIDE-009 | What Is a Bitcoin Seed Phrase?
- MSC-GUIDE-005 | What Is a Bitcoin Wallet?
- MSC-GUIDE-007 | How to Send and Receive Bitcoin
- MSC-GUIDE-016 | Bitcoin Best Practices for Safe Everyday Use
- MSC-GLOSSARY-001 | Bitcoin Glossary
- MSC-HUB-BASICS | Bitcoin Basics
- MSC-PATH-SAFE | Use Bitcoin Safely
- MSC-PATH-START | Start With Bitcoin

## 10. Accuracy review checklist

- [x] Registry metadata matches the approved registry.
- [x] Security begins with a threat model rather than one universal checklist.
- [x] Unauthorized spending and permanent loss are treated as separate risks.
- [x] Custodial and self-custodial risks are located in different systems rather than ranked universally.
- [x] Hardware signing devices are presented as one security layer, not a guarantee.
- [x] Passwords, PINs, seed phrases, passphrases, and private keys remain distinct.
- [x] No commercial device, wallet, backup material, copy count, storage location, threshold, or confirmation count is prescribed.
- [x] Multisignature and collaborative arrangements include operational and recovery tradeoffs.
- [x] Suspected-compromise language remains high level and does not provide a panic-driven fund-moving procedure.
- [x] Exact approved glossary definitions are used.
- [x] Planned internal links contain no live URLs.
- [x] No em dash or en dash character appears.

## 11. Human verification

- Confirm all source URLs immediately before copy lock.
- Confirm current Bitcoin Core release-verification instructions and file paths.
- Confirm hardware-signing terminology remains product-neutral and does not imply complete isolation or transaction verification.
- Confirm BIP 129, BIP 174, and descriptor terminology remains current.
- Confirm the suspected-compromise section stays high level and appropriate for varied wallet arrangements.
- Confirm no security recommendation becomes a universal prescription through illustration wording or captions.
- Confirm exact glossary-definition synchronization.
- Confirm planned internal links remain inactive until real destination pages and confirmed URLs exist.

## 12. Illustration brief

### Illustration 1

- Concept title: Threat Model Map
- Educational purpose: Separate theft, loss, privacy, and availability risks before choosing controls.
- Recommended placement: After the section titled Begin with a threat model.
- Visual description: Calm oceanographic survey map divided into four zones with simple markers for unauthorized spending, permanent loss, information exposure, and unavailable access. A central wallet arrangement connects to each zone.
- Required labels: Theft, Loss, Privacy, Availability, People, Devices, Services
- Caption: A security plan begins by identifying which failures matter and where they can occur.
- Alt text: Editorial risk map connecting a Bitcoin wallet arrangement to theft, permanent loss, privacy exposure, and availability risks.
- Image orientation: Landscape
- Mobile crop notes: Arrange the four risk zones in a vertical stack around the central wallet marker.
- Status: PLANNED

### Illustration 2

- Concept title: Security Is Layered
- Educational purpose: Show why a strong device, backup, or multisignature policy does not secure every other layer.
- Recommended placement: After the section titled Separate the security layers.
- Visual description: Infrastructure-manual cutaway with separate layers for software source, coordinator, signing device, transaction review, backup, recovery, physical location, and people. Lines show dependencies without merging the layers into one shield.
- Required labels: Software, Signing, Transaction review, Backup, Recovery, Physical security, People
- Caption: Bitcoin security depends on several layers that must work together without being treated as interchangeable.
- Alt text: Layered technical diagram separating wallet software, signing, transaction review, backup, recovery, physical security, and people.
- Image orientation: Square
- Mobile crop notes: Keep all layers in a top-to-bottom stack with short labels on the left.
- Status: PLANNED

### Illustration 3

- Concept title: Verification Checkpoints
- Educational purpose: Show the points where users can verify software origin, receiving information, transaction details, and recovery documentation.
- Recommended placement: After the section titled Review before authorizing a spend.
- Visual description: Navigation-chart route with four checkpoints from software acquisition to wallet setup, receiving verification, and transaction authorization. Include a separate maintenance loop for updates and recovery tests.
- Required labels: Official source, File verification, Receiving check, Signing check, Recovery review, Maintenance
- Caption: Security improves when verification happens at several points instead of depending on one trusted screen.
- Alt text: Navigation-style diagram showing verification checkpoints for software origin, wallet setup, receiving information, transaction signing, and recovery maintenance.
- Image orientation: Landscape
- Mobile crop notes: Use a single vertical route with the maintenance loop attached near the final checkpoint.
- Status: PLANNED
