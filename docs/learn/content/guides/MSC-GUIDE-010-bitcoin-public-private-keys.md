---
registry_id: MSC-GUIDE-010
status: COPY_LOCKED
page_role: topic-guide
h1: How Bitcoin Public and Private Keys Work
handle: bitcoin-public-private-keys
category: Bitcoin Basics
subcategory: Security
depth: Shallow
format: Explainer
primary_path: Use Bitcoin Safely
secondary_paths:
  - Start With Bitcoin
  - Understand the Network
author_display: Mempool Surf Club Editorial
reviewed_date: 2026-07-17
copy_locked_date: 2026-07-17
---

# How Bitcoin Public and Private Keys Work

## 1. Introductory deck

Bitcoin keys are cryptographic data used in spending conditions and signatures. A private key authorizes spending, while a related public key can be shared and verified without revealing the private key. Wallets may manage large trees of keys, and addresses are destination encodings rather than keys themselves.

## 2. Full article

Bitcoin ownership is often described with the phrase "whoever has the private key controls the bitcoin." That is directionally useful, but the actual system is more precise.

Bitcoin transactions create outputs with spending conditions. Keys participate in those conditions. A private key can create a valid digital signature when the applicable script requires one. A public key lets nodes verify that signature.

The keys do not contain bitcoin. They provide cryptographic authority within rules enforced by Bitcoin software.

### Private keys are secret numbers

A Bitcoin private key is secret cryptographic material used to authorize spending.

In common Bitcoin key systems, the private key can be represented as an integer within a defined range. Wallets generate these values using secure randomness or derive them from underlying seed material.

The private key is not a password stored by the Bitcoin network. There is no central account system that checks whether a user typed it correctly. Instead, wallet software uses the private key in a signature algorithm.

Anyone who obtains usable private key material may be able to create valid signatures for the outputs controlled by that key. Losing the key can remove the ability to spend unless another recovery path exists.

### Bitcoin uses the secp256k1 curve

Bitcoin's traditional public-key cryptography uses the secp256k1 elliptic curve defined by the Standards for Efficient Cryptography group.

The system specifies a finite field, a curve equation, a generator point, and an order. A private key is used as a scalar in elliptic-curve point multiplication. The result is a public key point.

This operation is efficient in the forward direction. Given a valid private key, software can derive the corresponding public key.

Reversing the operation is considered computationally infeasible under the security assumptions used by Bitcoin. Given only the public key, an attacker is not expected to recover the private key with practical computing resources.

This is not reversible encryption. The public key is not the private key wrapped in a code that the recipient can decrypt.

### Public keys can be shared, but they are still sensitive

A public key is cryptographic data derived from a private key and used in Bitcoin spending conditions and signatures.

It is designed to be shareable. Revealing a public key does not directly provide the private key under the assumed hardness of the elliptic-curve discrete logarithm problem.

That does not make every form of public key information harmless. A public key can link activity. An extended public key can expose an entire branch of receiving information. In some derivation systems, combining extended public information with a leaked non-hardened child private key can compromise a larger branch.

Public does not mean irrelevant to privacy or wallet architecture.

### A signature authorizes a specific message

A digital signature is created from private key material and a message digest. In Bitcoin, the message commonly commits to selected transaction data according to the signature-hash rules in use.

Nodes verify the signature with the corresponding public key. A valid result shows that the required private key participated in authorizing that signed data.

An ordinary valid signature does not reveal the private key. It also does not prove every broader claim someone might attach to it.

A signature does not by itself establish a person's legal identity, intent, ownership history, location, or exclusive control of a key. Keys can be shared, transferred, compromised, or used by automated systems. Cryptography answers a narrow technical question: did valid private key material authorize this message under the relevant scheme?

### ECDSA and Schnorr are distinct systems

Bitcoin has used the Elliptic Curve Digital Signature Algorithm, or ECDSA, throughout most of its history.

Taproot introduced Schnorr signatures for Taproot key-path spending and Tapscript contexts through BIP 340, BIP 341, and BIP 342.

Both systems operate with secp256k1 keys, but their signature formats and verification rules are distinct. Software must apply the correct rules for the output and script being spent.

Schnorr signatures support properties such as linearity that are useful for advanced constructions. That does not mean every Bitcoin output uses Schnorr or that an ECDSA key is automatically a Taproot spending setup.

### Addresses are not public keys

An address is a destination representation used by wallets to construct a Bitcoin locking script.

Some older output types commit to a hash of a public key. When those outputs are spent, the transaction reveals the public key and a signature.

Other output types represent scripts or commitments. Taproot outputs include a tweaked public key that can represent a key-path spend and commit to possible script paths.

These details show why address, public key, script, and output are related but distinct.

A user generally shares an address or payment request, not a raw private key. The sender's wallet decodes the destination and constructs an output with the corresponding locking condition.

### Different outputs reveal key information differently

A pay-to-public-key output includes a public key directly in the locking script. A pay-to-public-key-hash output initially commits to a hash and reveals the public key when spent.

SegWit versions use witness programs with defined interpretation rules. Taproot uses a version 1 witness program that commits to an output key.

The privacy and security implications depend on the output type and when information becomes visible. It is inaccurate to say that every address is simply a public key or that public keys always remain hidden until spending.

Wallets also need compatible encoding and script support. A structurally valid address does not guarantee that every service can send to it.

### Key encodings are representations, not new authority

Wallet software may display keys in different serialized or encoded forms. A public key may be represented in compressed or uncompressed form, while wallet standards can package key data with network, derivation, or checksum information.

These representations help software exchange and interpret data. They do not create additional bitcoin or a separate layer of ownership. Two encodings can refer to the same underlying elliptic-curve point, while two extended-key strings can carry different derivation scope even when they originate from related material.

This is one reason copying a string without understanding its type is risky. A private-key encoding can authorize spending. An extended public key cannot directly sign, but it may reveal a broad map of wallet activity. An address is a destination encoding used to construct a script, not a general-purpose public-key container.

The format tells compatible software how to read the data. The spending condition determines what authority that data can exercise.

### Public-key exposure depends on the spending condition

Public-key visibility is not a single yes-or-no property across Bitcoin.

Some outputs place a public key directly in the locking script. Others initially commit to a hash or a witness program and reveal additional information when spent. Taproot output keys are visible on-chain, while optional script-path details remain hidden unless that path is used.

This affects both security analysis and privacy analysis. The appearance of a public key does not reveal its private key under Bitcoin's cryptographic assumptions, but it can connect transactions, scripts, or wallet structure. A wallet's choice of output type therefore changes what information is visible and when, without changing the basic rule that private keys must remain secret.

### Wallets usually manage many keys

A wallet may create a new receiving address for each payment and a new change destination for outgoing transactions.

Managing a separate random backup for every key would be difficult. Hierarchical deterministic wallets address this by deriving a tree of keypairs from underlying seed material.

BIP 32 defines extended private and public keys. An extended key includes a key plus a chain code and related metadata.

An extended private key can derive descendant private and public keys. An extended public key can derive descendant public keys for non-hardened branches without providing direct spending authority.

This lets an online system generate receiving information while a separate signer protects private keys. It also creates a privacy boundary that users should understand.

### Extended public information can reveal a wallet map

An extended public key may allow a party to derive many current and future public keys for a wallet branch.

The party may be able to identify incoming payments, change, and spending patterns associated with that branch. This can expose more information than sharing one address.

The exact scope depends on the derivation level and wallet design. An account-level extended public key may reveal one account, while a higher-level key can expose more branches.

Wallets do not all display, export, or use extended keys in the same way. Some use descriptors that combine extended keys with script and derivation information.

Even without spending authority, extended public data deserves careful handling because of its monitoring power.

### Hardened and non-hardened derivation

BIP 32 defines normal, or non-hardened, child derivation and hardened child derivation.

Non-hardened public child keys can be derived from an extended public key. This supports watch-only systems and separate receiving infrastructure.

Hardened derivation requires private parent information. It prevents an extended public key from deriving that child branch.

BIP 32 also documents an important risk: a parent extended public key combined with a corresponding non-hardened descendant private key can expose the parent private key.

At Shallow depth, the key point is that derivation choices affect sharing boundaries. A wallet should follow its documented structure rather than mixing extended keys and child private keys casually.

### Seed phrases and keys are different layers

A seed phrase is a human-readable backup representation used by many wallets to derive keys under a wallet standard.

Under one common flow, BIP 39 mnemonic and passphrase processing creates seed material. BIP 32 then turns seed material into a hierarchical key tree. Other wallet designs may use different standards.

The phrase is not a private key, even though it can recreate many private keys. The seed is not an address. The wallet is not one key.

Separating these layers helps explain why recovery may require derivation paths, script types, descriptors, or multisignature configuration in addition to words.

### Scripts can require more than one key

Bitcoin outputs can use spending conditions more complex than one signature from one key.

A multisignature script can require a threshold of several keys. A script can combine signatures with timelocks or other conditions. Taproot can support a key path and optional script paths.

A wallet coordinating these arrangements must know the complete policy. Possessing one key may provide partial authority while remaining insufficient to spend.

This is another reason the phrase "the private key" can be misleading. The relevant question is which conditions control a specific output and what information satisfies them.

### Device passwords do not replace Bitcoin keys

A wallet password may decrypt a file. A PIN may unlock a signing device. Biometric access may open an application.

These controls govern access to local software or hardware. They do not change the spending condition recorded in the Bitcoin output.

If a device is lost but the wallet recovery information remains complete, the setup may be recoverable. If the underlying key material is lost and no other spending path exists, resetting an interface password will not restore authority.

Likewise, suspecting key exposure is not solved by changing a wallet-app password. Moving bitcoin to newly created outputs controlled by uncompromised keys changes the on-chain authorization. The exact response should follow verified wallet documentation and a carefully verified environment.

### Randomness and implementation quality matter

The mathematical system assumes private keys are generated securely and signatures are produced correctly.

Weak randomness can create predictable keys. Reusing secret signing values in some signature systems can expose private keys. Incorrect verification or serialization can create compatibility or security failures.

Users do not need to implement cryptography themselves to understand the consequence: trusted software and hardware must use established, reviewed libraries and correct standards.

A key can be mathematically valid while being operationally unsafe because it was generated, stored, backed up, or used poorly.

### Keys provide authority, not guarantees

A valid key and signature can satisfy a spending rule. They cannot guarantee that the transaction destination is correct, the wallet interface is honest, the backup is complete, the signer understands the transaction, or the activity remains private.

Cryptographic authorization is one layer of Bitcoin security.

The next guide looks beyond the key itself and asks how wallet software, devices, backups, people, and recovery procedures can be managed as a maintainable security system.

## 3. Key Terms

**Private key:** Secret cryptographic material used to authorize spending.

**Public key:** Cryptographic data derived from a private key and used in Bitcoin spending conditions and signatures.

**Digital signature:** Cryptographic proof that a valid private key authorized a transaction or message.

**Address:** A destination representation used by wallets to construct a Bitcoin locking script.

**Wallet:** Software or hardware that manages keys, constructs transactions, and helps users interact with Bitcoin.

**Schnorr signature:** The signature scheme specified for Taproot key-path and tapscript use in Bitcoin.

**Multisig:** A spending condition requiring a defined threshold of multiple keys to authorize a transaction.

## 4. Sources

### SEC 2: Recommended Elliptic Curve Domain Parameters

- Author or publisher: Standards for Efficient Cryptography Group
- Direct URL: https://www.secg.org/sec2-v2.pdf
- Supports: The secp256k1 field, curve, generator, and order parameters used by Bitcoin key and signature systems.

### BIP 32: Hierarchical Deterministic Wallets

- Author or publisher: Pieter Wuille
- Direct URL: https://bips.dev/32/
- Supports: Hierarchical key trees, extended private and public keys, hardened and non-hardened derivation, public derivation, and extended-key security boundaries.

### BIP 39: Mnemonic Code for Generating Deterministic Keys

- Author or publisher: Marek Palatinus, Pavol Rusnak, Aaron Voisine, and Sean Bowe
- Direct URL: https://bips.dev/39/
- Supports: The relationship between mnemonic words, optional passphrases, seed material, and deterministic wallet derivation.

### Bitcoin Developer Guide: Transactions

- Author or publisher: Bitcoin Project developer documentation
- Direct URL: https://developer.bitcoin.org/devguide/transactions.html
- Supports: Transaction outputs, public-key-hash spending, script conditions, signatures, addresses, inputs, and witness data.

### Bitcoin Developer Reference: Transactions

- Author or publisher: Bitcoin Project developer documentation
- Direct URL: https://developer.bitcoin.org/reference/transactions.html
- Supports: Transaction serialization, script and witness fields, signature-related data, and standard output forms.

### BIP 340: Schnorr Signatures for secp256k1

- Author or publisher: Pieter Wuille, Jonas Nick, and Tim Ruffing
- Direct URL: https://bips.dev/340/
- Supports: Bitcoin's Schnorr signature specification, public-key representation, signing, and verification rules.

### BIP 341: Taproot

- Author or publisher: Pieter Wuille, Jonas Nick, and Anthony Towns
- Direct URL: https://bips.dev/341/
- Supports: Taproot output keys, key-path spending, script commitments, and SegWit version 1 spending rules.

### BIP 342: Validation of Taproot Scripts

- Author or publisher: Pieter Wuille, Jonas Nick, and Anthony Towns
- Direct URL: https://bips.dev/342/
- Supports: Tapscript validation and Schnorr signature use within Taproot script paths.

### BIP 173: Base32 Address Format for Native v0-16 Witness Outputs

- Author or publisher: Pieter Wuille and Greg Maxwell
- Direct URL: https://bips.dev/173/
- Supports: Bech32 address encoding and the distinction between an address representation and the underlying witness program.

### BIP 350: Bech32m Format for v1+ Witness Addresses

- Author or publisher: Pieter Wuille
- Direct URL: https://bips.dev/350/
- Supports: Bech32m encoding for witness version 1 and later address representations.

### BIP 380: Output Script Descriptors General Operation

- Author or publisher: Pieter Wuille and Ava Chow
- Direct URL: https://bips.dev/380/
- Supports: Combining key origins, extended keys, derivation paths, and script expressions into wallet descriptors.

## 5. SEO title

How Bitcoin Public and Private Keys Work

## 6. Meta description

Learn how Bitcoin private keys, public keys, addresses, scripts, signatures, HD wallets, and extended keys relate without treating them as interchangeable.

## 7. Page excerpt

Bitcoin private keys authorize spending, while public keys let nodes verify signatures. This guide explains key derivation, addresses, scripts, signatures, and HD wallet privacy boundaries.

## 8. Estimated reading time

10 to 12 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- MSC-GUIDE-009 | What Is a Bitcoin Seed Phrase?
- MSC-GUIDE-011 | How to Keep Bitcoin Secure
- MSC-GUIDE-001 | What Is Bitcoin?
- MSC-GUIDE-005 | What Is a Bitcoin Wallet?
- MSC-GUIDE-006 | What Is Bitcoin Self-Custody?
- MSC-GUIDE-012 | How Bitcoin Privacy Works
- MSC-GUIDE-057 | How Schnorr Signatures Work in Bitcoin
- MSC-GUIDE-058 | How Digital Signatures Work in Bitcoin
- MSC-GLOSSARY-001 | Bitcoin Glossary
- MSC-HUB-BASICS | Bitcoin Basics
- MSC-PATH-SAFE | Use Bitcoin Safely
- MSC-PATH-START | Start With Bitcoin
- MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] Registry metadata matches the approved registry.
- [x] Private keys, public keys, addresses, scripts, wallets, seed phrases, and signatures remain distinct.
- [x] Public-key derivation is not described as reversible encryption.
- [x] No usable private key, WIF string, extended private key, or recovery phrase appears.
- [x] A valid signature is not presented as proof of legal identity, intent, or ownership history.
- [x] ECDSA and Schnorr are treated as distinct signature systems.
- [x] Taproot's use of Schnorr is limited to the contexts defined by its standards.
- [x] Extended public information is presented as a privacy-sensitive wallet map, not direct spending authority.
- [x] Hardened and non-hardened derivation are explained at the level supported by BIP 32.
- [x] Exact approved glossary definitions are used.
- [x] Planned internal links contain no live URLs.
- [x] No em dash or en dash character appears.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-17
- Notes:
  - Editorial accuracy and secret-material safety review completed.
  - Recheck source URL accessibility immediately before publication.
  - Confirm secp256k1, BIP 32, ECDSA, Schnorr, Taproot key-path, and Tapscript terminology remains current before publication.
  - Keep planned internal links inactive until real destination pages and confirmed URLs exist.

## 12. Illustration brief

### Illustration 1

- Concept title: Key to Public Key to Destination
- Educational purpose: Separate private keys, public keys, addresses, scripts, and outputs without implying that they are interchangeable.
- Recommended placement: After the section titled Addresses are not public keys.
- Visual description: Old technical field-guide flow on Paper. A protected private-key symbol feeds a one-way elliptic-curve transformation into a public-key point. Separate branches show a wallet encoding an address and constructing a locking script. Avoid realistic key strings.
- Required labels: Private key, One-way derivation, Public key, Address encoding, Locking script, Transaction output
- Caption: A wallet derives public information from a private key, then uses address and script rules to construct a spendable output.
- Alt text: Technical flow diagram distinguishing a protected private key, derived public key, address encoding, locking script, and Bitcoin transaction output.
- Image orientation: Landscape
- Mobile crop notes: Stack stages vertically and keep the private-key symbol abstract with no text that resembles key material.
- Status: PLANNED

### Illustration 2

- Concept title: Sign Without Revealing the Key
- Educational purpose: Show that a signature authorizes defined transaction data while the private key remains secret.
- Recommended placement: After the section titled A signature authorizes a specific message.
- Visual description: Infrastructure-manual diagram with transaction data entering a signing device, a signature leaving, and a node verifying the signature against a public key. The private key remains inside a closed boundary.
- Required labels: Transaction data, Private key boundary, Digital signature, Public key, Verification
- Caption: A valid signature can authorize transaction data without placing the private key inside the transaction.
- Alt text: Diagram showing transaction data signed within a protected private-key boundary and verified by a node using a public key.
- Image orientation: Landscape
- Mobile crop notes: Keep the protected boundary central and the signing and verification steps visible on either side.
- Status: PLANNED

### Illustration 3

- Concept title: HD Wallet Sharing Boundaries
- Educational purpose: Explain how a wallet can derive many keys and why extended public information can expose a broad activity map.
- Recommended placement: After the section titled Extended public information can reveal a wallet map.
- Visual description: Navigation-chart tree with a root seed-material marker, hardened account branches, and non-hardened receiving branches. One extended-public-information window reveals a defined branch while spending keys remain separated.
- Required labels: Seed material, Hardened branch, Non-hardened branch, Extended public information, Receiving addresses, Spending keys
- Caption: Hierarchical wallets can separate signing authority from public derivation, but shared extended public information may reveal an entire branch of wallet activity.
- Alt text: Field-guide key tree showing hardened and non-hardened branches, receiving addresses, and the privacy scope of shared extended public information.
- Image orientation: Square
- Mobile crop notes: Use a top-down tree and highlight only one branch as visible to the extended-public-information observer.
- Status: PLANNED
