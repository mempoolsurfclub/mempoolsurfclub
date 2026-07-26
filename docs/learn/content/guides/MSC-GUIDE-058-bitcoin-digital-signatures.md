---
registry_id: MSC-GUIDE-058
status: COPY_LOCKED
page_role: topic-guide
h1: How Digital Signatures Work in Bitcoin
handle: bitcoin-digital-signatures
category: Bitcoin Development
subcategory: Cryptography
depth: Deep
format: Technical Explainer
primary_path: Build on Bitcoin
secondary_paths:
  - Understand the Network
author_display: Mempool Surf Club Editorial
reviewed_date: 2026-07-26
copy_locked_date: 2026-07-26
---

# How Digital Signatures Work in Bitcoin

## 1. Introductory deck

Bitcoin digital signatures authorize specific spending conditions by proving knowledge of a required private key without revealing it. What is signed depends on the transaction’s script context and signature-hash mode: legacy ECDSA, SegWit version 0 ECDSA, and Taproot Schnorr signatures commit to different serialized messages. A valid signature proves authorization under a public key and message—not personal identity, encryption, or permanent control of a key.

## 2. Full article

A Bitcoin transaction spends existing outputs by satisfying the conditions attached to them. Many common conditions require one or more digital signatures. The signer constructs a signature from a private key and a precisely defined message. Nodes reconstruct that message from the transaction context and verify the signature with the corresponding public key.

The phrase “sign the transaction” is convenient but incomplete. Bitcoin does not normally turn a transaction into a human-readable sentence and sign that sentence. Each input is checked in a script context, and its signature commits to selected transaction and previous-output data according to a signature-hash algorithm and flag.

This guide was researched on July 25, 2026 against deployed BIPs 66, 141, 143, 340, 341, and 342; the PSBT and generic message-signing specifications; and Bitcoin Core 31.1 at tag `v31.1`, commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`. Wallet and signing-device behavior must still be checked against exact products and releases.

### Private keys, public keys, and authorization

A private key is a secret scalar used by a signature algorithm. Its corresponding public key is a curve point derived on secp256k1. The public key can be shared and used for verification. An address is a separate application-level encoding that usually maps to a script template or witness program; it is not the public key itself.

When a script check succeeds, it establishes that the provided signature is valid for a particular message and public key under the active rules. In a normal payment context, this is evidence that someone with access to the required private key authorized the spend.

It does not establish a legal name, device identity, employment role, or exclusive possession of the key. Keys can be copied, shared, compromised, held jointly, or used by an agent. A signature also does not prove that the signer retained control at every later time.

### Signing is not encryption

Encryption aims to hide readable content from parties without a decryption key. Digital signing aims to make unauthorized message alteration detectable and to demonstrate authorization under a signing key.

Bitcoin transactions are generally public once propagated or confirmed. Their signatures do not encrypt amounts, destinations, scripts, or transaction structure. Signature algorithms use hash functions internally and operate on transaction digests, but hashing is not encryption either.

### Two deployed signature schemes

Bitcoin uses two principal signature schemes in currently deployed spending contexts:

- **ECDSA over secp256k1** is used by legacy, P2SH, P2WPKH, and P2WSH signature checks.
- **BIP 340 Schnorr over secp256k1** is used for Taproot key-path signatures and 32-byte public-key checks in tapscript.

Both use secp256k1 public and private key material, but their encodings, equations, malleability properties, nonce procedures, and script contexts differ.

ECDSA signatures in Bitcoin are usually strict-DER-encoded pairs of integers followed by a one-byte sighash value. Their encoded length varies. BIP 340 signatures are fixed 64-byte `r || s` values; Taproot may append an optional sighash byte in the witness.

Schnorr is not universally “better” for every system. It has a simpler linear equation, fixed encoding, and support for efficient higher-level constructions. ECDSA has extensive historical deployment and remains valid in older output types. Real choices also depend on script type, wallet support, hardware support, interoperability, and migration constraints.

### What the signature message contains

A transaction signature is checked against a digest derived from transaction data. The exact data depends on:

- the input being signed;
- the output type and script execution context;
- the signature-hash algorithm;
- the selected sighash flag;
- previous-output data required by that algorithm;
- Taproot-specific data such as an annex or tapleaf when present.

This message is different from a transaction identifier. A `txid` is the double SHA-256 of a transaction serialization without witness data. A signature hash is a purpose-built digest whose serialization and included fields depend on signing rules. They may both be 32-byte values, but they are not interchangeable.

### Signature-hash flags

Bitcoin’s signature-hash flags let the signer choose which transaction components the signature commits to. The names are historical; their exact effect depends on the signature version.

`SIGHASH_ALL` generally commits to all outputs. It is the common ECDSA mode and prevents changing destinations or output amounts without invalidating the signature.

`SIGHASH_NONE` commits to no outputs. The signer authorizes the selected input-side context while allowing outputs to be changed under the algorithm’s remaining rules.

`SIGHASH_SINGLE` generally commits to the output with the same index as the signed input. The out-of-range boundary differs by signature version. Legacy signature hashing returns the historical 256-bit value one when no corresponding output exists. BIP 143 SegWit version 0 does not take that legacy early-return path; it constructs the BIP 143 message with a zero `hashOutputs` value. BIP 341 instead makes Taproot `SIGHASH_SINGLE` invalid when no corresponding output exists.

`SIGHASH_ANYONECANPAY` modifies the input commitment. It can be combined with `ALL`, `NONE`, or `SINGLE` to commit only to the current input rather than the normal set of inputs.

`SIGHASH_DEFAULT` is Taproot-only value `0x00`. It has the output behavior of `SIGHASH_ALL` and is implied when the optional sighash byte is omitted from a 64-byte Taproot signature.

Undefined sighash values also have version-specific treatment. BIP 341 permits only `0x00`, `0x01`, `0x02`, `0x03`, `0x81`, `0x82`, and `0x83`; any other Taproot hash type fails validation, and an explicit appended `0x00` is invalid. For legacy and SegWit version 0 ECDSA, Bitcoin Core’s `SCRIPT_VERIFY_STRICTENC` standardness rule rejects undefined hash-type bytes, but that flag is explicitly not intended as a consensus rule. Without that policy flag, consensus signature hashing masks the historical mode bits and includes the complete hash-type value in the digest. Software must reproduce the applicable behavior rather than assuming every unknown ECDSA byte is consensus-invalid.

These modes are protocol tools, not automatically safe wallet choices. A signer and user interface must understand whether a mode permits another party to add inputs, replace outputs, reorder pairs, or otherwise complete a collaborative transaction.

### Legacy signature hashing

For pre-SegWit script contexts, Bitcoin’s original signature-hash algorithm constructs a modified serialization based on the selected input and sighash type, appends the sighash type as a four-byte value, and applies double SHA-256.

The algorithm substitutes a `scriptCode` for the input being checked while blanking or modifying other input scripts. `SIGHASH_NONE`, `SIGHASH_SINGLE`, and `ANYONECANPAY` alter which inputs, sequences, and outputs are serialized.

Legacy signature hashing does not commit to the amount of the previous output being spent. A fully validating node can obtain that amount from its UTXO view, but an offline signer that receives only an unsigned legacy transaction cannot calculate the fee from that transaction alone. It may need the full previous transaction or other trusted context.

The historical legacy `SIGHASH_SINGLE` out-of-range behavior returns the 256-bit value one instead of a digest of a normal transaction serialization. This is deployed behavior and must be reproduced by compatible implementations; it should not be generalized to SegWit version 0 or Taproot.

### BIP 143 and SegWit version 0

BIP 143 defines the signature-hash algorithm for ECDSA checks in version 0 witness programs, including P2WPKH and P2WSH. It applies double SHA-256 to a serialization containing:

- transaction version;
- hash of input outpoints when applicable;
- hash of input sequences when applicable;
- the current input’s outpoint;
- the current input’s `scriptCode`;
- the amount of the previous output being spent;
- the current input’s sequence;
- hash of outputs according to the sighash mode;
- transaction locktime;
- sighash type.

The important amount boundary is explicit: BIP 143 commits to the amount of the output spent by the signed input. If an offline signer is given a false amount, the resulting signature will not verify against the real previous output. That protects the signature from authorizing a different amount, but the device still needs enough reliable information and interface logic to understand destinations, scripts, change, and fees.

For out-of-range `SIGHASH_SINGLE`, Bitcoin Core 31.1’s witness-v0 path leaves `hashOutputs` as zero and continues constructing the BIP 143 digest. It does not return the legacy constant-one hash.

Bitcoin Core 31.1 precomputes reusable double-SHA-256 values for BIP 143. This is an implementation optimization, not a different message or validity rule.

### BIP 341 and Taproot signature hashing

Taproot uses the BIP 341 `TapSighash` construction with BIP 340 Schnorr verification. It differs from legacy and BIP 143 in both serialization and hashing.

When `ANYONECANPAY` is not set, the message can commit to all input outpoints, amounts, spent `scriptPubKey` values, and sequences. It commits to outputs according to the selected mode. It also commits to the current input index, or to the current input’s complete previous-output data when `ANYONECANPAY` is set. An annex, when present, is committed through its hash.

BIP 341’s component subhashes use single SHA-256 and the final message uses the `TapSighash` tagged hash. This is not evidence that single SHA-256 is “weaker” in that context; the construction is designed so SHA-256 length extension is not a relevant threat to the public signature message.

For Taproot key-path spends, a 64-byte signature implies `SIGHASH_DEFAULT`. A 65-byte signature appends an explicit nonzero defined sighash byte. Appending `0x00` is invalid, preventing a redundant encoding of the default mode.

### Tapscript message extensions

BIP 342 extends the BIP 341 message for script-path signature checks. It adds:

- the tapleaf hash, which commits to the revealed leaf version and script;
- a key-version byte;
- the opcode position of the last executed `OP_CODESEPARATOR`, or `0xffffffff` if none was executed.

This means a tapscript signature is bound to the committed script leaf and relevant execution position. It is not simply a signature over the transaction’s `txid`, nor is it interchangeable with a key-path signature.

### Strict DER encoding

BIP 66 made strict DER encoding a consensus rule for ECDSA signatures passed to Bitcoin’s ECDSA signature opcodes. The DER portion encodes positive `R` and `S` integers with minimal lengths inside a sequence. Bitcoin appends a separate one-byte sighash value outside the DER structure.

Including that byte, a nonempty ECDSA signature passed to the relevant checks is between 9 and 73 bytes under the strict encoding rules. The empty vector remains a deliberately invalid signature representation used by script constructions.

Strict encoding matters because consensus cannot safely depend on different versions of a general-purpose parser accepting different byte strings. BIP 66 narrowed accepted encodings to deterministic rules that all validating implementations must reproduce.

### Low-S normalization and ECDSA malleability

For ECDSA, if `(r, s)` is a valid signature, `(r, n - s)` is also valid for the same key and message. This creates a signature-level malleability form unless one representative is required.

Bitcoin Core’s signing code creates low-S signatures. In Bitcoin Core 31.1, `SCRIPT_VERIFY_LOW_S` is included in `STANDARD_SCRIPT_VERIFY_FLAGS` but not `MANDATORY_SCRIPT_VERIFY_FLAGS`. The latter constant is a validation and denial-of-service classification and explicitly does not itself define all consensus flags; Bitcoin Core derives actual block consensus flags through `GetBlockScriptFlags()`. Low-S remains an additional standard relay and mining policy rule rather than a deployed consensus requirement for ECDSA checks.

SegWit’s witness commitment removes third-party witness changes from the legacy `txid`, but changing witness data can still change the `wtxid`.

This boundary should be stated carefully:

- BIP 66 strict DER is deployed consensus for applicable ECDSA checks.
- Low-S is enforced by Bitcoin Core’s default standardness policy for unconfirmed transactions.
- A wallet generally normalizes signatures it creates.
- SegWit changes which identifier is affected by witness-only malleation.
- Application protocols may face other forms of transaction mutability unrelated to the signature equation.

BIP 340 Schnorr signatures avoid ECDSA’s `s` versus `n - s` ambiguity through exact point and parity rules. That does not make every Taproot transaction immutable: sighash choices, annex handling, script witnesses, collaborative construction, and protocol-level replacement remain separate.

### NULLFAIL and contextual failure behavior

`NULLFAIL` requires failed ECDSA signatures to be empty rather than arbitrary nonempty byte strings. In Bitcoin Core 31.1, `SCRIPT_VERIFY_NULLFAIL` is included in standard policy but not in `MANDATORY_SCRIPT_VERIFY_FLAGS`. As with low-S, this is a policy/validation classification, not a statement that the `MANDATORY` constant alone defines every consensus flag.

Tapscript has separate consensus behavior. A nonempty signature for a known 32-byte public key that fails BIP 340 verification terminates script execution with failure. An empty signature is handled as a deliberately invalid result that can support `OP_CHECKSIGADD` threshold patterns.

Using the word “NULLFAIL” for all these cases can obscure which rule and script version applies.

### Nonces and private-key compromise

ECDSA and Schnorr both require a per-signature nonce. The nonce must not be reused in a way that lets an observer solve for the private key. Bias, predictability, repeated state, fault injection, or cross-protocol reuse can also be dangerous.

Bitcoin signing software commonly derives ECDSA nonces deterministically following RFC 6979-style procedures. BIP 340 defines its own tagged deterministic derivation with optional auxiliary randomness. These are not interchangeable algorithms.

A deterministic algorithm reduces dependence on fresh entropy for each signature, but it does not fix a compromised device, unsafe key reuse across schemes, malicious firmware, or multiparty nonce-state errors. MuSig2 and other multiparty protocols have separate nonce requirements.

### Nodes verify; wallets and devices construct

A validating node does not need the private key. It receives a transaction, reconstructs the required signature message, evaluates the script, parses the public key and signature, and applies the relevant cryptographic verification.

Wallets and signing devices perform a different job. They select or receive inputs, identify scripts and derivation paths, compute the correct signature message, decide whether policy and user intent allow signing, generate the nonce, construct the signature, and place it into the appropriate `scriptSig` or witness.

These roles can be implemented by the same software package, but they should not be conceptually merged. Consensus validation tells a node whether a signature satisfies the protocol. It does not tell a user whether the transaction was wise, whether the fee was expected, or whether a recipient display was trustworthy.

### Offline signing and PSBT

Offline signing separates transaction construction from private-key use. An online coordinator prepares data, an offline signer reviews and signs it, and another system finalizes and broadcasts the transaction.

BIP 174 defines the Partially Signed Bitcoin Transaction format as structured key-value maps that carry an unsigned transaction, previous-output data, scripts, derivation information, sighash requirements, and partial signatures. BIP 371 adds fields for Taproot.

PSBT is a transport and coordination format. It does not itself guarantee:

- that all previous-output data is correct;
- that a change output belongs to the intended wallet;
- that derivation paths are authorized;
- that proprietary fields are safe;
- that the fee or destination display is accurate;
- that the signer supports the requested script and sighash mode;
- that all participants interpret the packet identically.

BIP 32 derivation data can help a signer locate keys, but metadata supplied by a coordinator is not self-authenticating. A robust signer verifies every field it can derive, refuses unsupported or ambiguous cases, and shows the user enough information to detect unintended authorization.

### Hardware-wallet boundaries

A hardware wallet can reduce exposure by keeping keys and nonce operations inside a dedicated device. It does not eliminate all signing risk.

The device still depends on secure key generation, firmware, supply-chain controls, parser correctness, screen and button integrity, transaction-policy logic, backups, and communication with the host. A small display may omit script details or make output verification difficult. Some devices support only selected script types, PSBT fields, sighash flags, or multiparty protocols.

Claims about “hardware wallet support” should identify the exact model, firmware, wallet coordinator, output type, derivation scheme, and signing flow tested.

### Transaction signatures and message signing

Wallet “sign message” features are not ordinary transaction authorization. Historical message-signing conventions often use recoverable ECDSA signatures tied to limited address types and a separate message prefix.

BIP 322 specifies a generic message-signing format built around virtual transactions and Bitcoin Script. It supports broader script types and explicitly notes that a message signature cannot prove permanent key control, prove that a person sent a historical transaction, or guarantee that the signer would authorize a real spend.

Applications must specify which message-signing convention they accept. A valid transaction signature should never be reinterpreted as an application message signature, and vice versa. Domain separation and interface labeling matter.

### Verification and identity over time

A valid signature is evidence about one key-message relationship at one point in a protocol. It does not prove:

- who generated the key;
- whether only one person controlled it;
- whether the key was compromised before or after signing;
- whether the signer understood the message;
- whether an off-chain statement remains current;
- whether the key still controls an unspent output.

For ownership or identity workflows, applications need explicit challenge freshness, domain separation, replay protection, key-to-identity evidence, revocation or update rules, and a clear statement of what the proof does and does not establish.

### A practical signature boundary map

Before evaluating a claim, classify the layer:

- **Mathematical scheme:** ECDSA or BIP 340 equations and assumptions.
- **Encoding rule:** DER, x-only keys, 64-byte signatures, or appended sighash bytes.
- **Signature message:** legacy, BIP 143, BIP 341, or BIP 342 serialization.
- **Consensus rule:** what makes a block spend valid.
- **Policy:** what Bitcoin Core 31.1 relays or mines by default.
- **Wallet behavior:** what a signer constructs or refuses.
- **Device behavior:** what a hardware signer parses, displays, and signs.
- **Coordination format:** PSBT or another exchange format.
- **Message convention:** transaction authorization versus off-chain message proof.

“Bitcoin signatures do this” is rarely precise enough without naming the layer.

## 3. Key Terms

- **Digital signature:** Cryptographic proof that a signature is valid for a message and public key under a defined scheme.
- **Private key:** Secret scalar used to create signatures.
- **Public key:** Curve point used to verify signatures; distinct from an address.
- **ECDSA:** Elliptic Curve Digital Signature Algorithm used by legacy and SegWit version 0 signature checks.
- **BIP 340 Schnorr:** Fixed-format Schnorr scheme used by Taproot.
- **Signature hash:** Digest constructed from transaction context for a signature check.
- **Sighash flag:** Mode selecting which transaction components a signature commits to.
- **SIGHASH_DEFAULT:** Taproot-only default mode, value `0x00`, with output behavior equivalent to `SIGHASH_ALL`.
- **Strict DER:** Consensus encoding rules for applicable ECDSA signatures under BIP 66.
- **Low-S:** Canonical ECDSA choice that uses the lower of two mathematically valid `S` representatives.
- **NULLFAIL:** Policy rule requiring failed ECDSA signatures to be empty in contexts where the flag applies; tapscript has separate consensus behavior.
- **scriptCode:** Script serialization included in legacy or BIP 143 signature-message construction.
- **PSBT:** Structured format for coordinating unsigned and partially signed Bitcoin transactions.
- **Offline signer:** Signer that receives transaction data without directly connecting to the Bitcoin network.
- **Message signing:** Separate convention for signing off-chain messages, not ordinary transaction authorization.

## 4. Sources

1. **BIP 66 — Strict DER Signatures** | Pieter Wuille
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki
   - Supports: Consensus strict-DER encoding, ECDSA opcode scope, DER layout, sighash-byte boundary, and empty-signature exception.
2. **BIP 141 — Segregated Witness** | Eric Lombrozo, Johnson Lau, Pieter Wuille
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki
   - Supports: Witness programs, P2WPKH and P2WSH signature contexts, txid/wtxid separation, and witness commitments.
3. **BIP 143 — Transaction Signature Verification for Version 0 Witness Program** | Johnson Lau, Pieter Wuille
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0143.mediawiki
   - Supports: SegWit version 0 ECDSA signature messages, amount commitment, sighash modes, zero-hash boundary for out-of-range SIGHASH_SINGLE, and reusable component hashes.
4. **BIP 340 — Schnorr Signatures for secp256k1** | Pieter Wuille, Jonas Nick, Tim Ruffing
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki
   - Supports: BIP 340 encoding, nonce, verification, non-malleability, and domain-separation properties.
5. **BIP 341 — Taproot: SegWit Version 1 Spending Rules** | Pieter Wuille, Jonas Nick, Anthony Towns
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki
   - Supports: TapSighash construction, defined and undefined hash types, input and output commitments, SIGHASH_DEFAULT, annex commitment, and 64-/65-byte signatures.
6. **BIP 342 — Validation of Taproot Scripts** | Pieter Wuille, Jonas Nick, Anthony Towns
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0342.mediawiki
   - Supports: Tapscript message extensions, BIP 340 checks, OP_CHECKSIGADD, and empty versus nonempty signature behavior.
7. **BIP 174 — Partially Signed Bitcoin Transaction Format** | Andrew Chow
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0174.mediawiki
   - Supports: Offline-signing transport, UTXO data, scripts, sighash requirements, derivation data, and partial signatures.
8. **BIP 371 — Taproot Fields for PSBT** | Andrew Chow
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0371.mediawiki
   - Supports: Taproot-specific PSBT key-path and script-path signing data.
9. **BIP 322 — Generic Signed Message Format** | Karl-Johan Alm, Oliver Gugger
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0322.mediawiki
   - Supports: Transaction-like off-chain message proofs and their control, freshness, and identity limitations.
10. **BIP 32 — Hierarchical Deterministic Wallets** | Pieter Wuille
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki
    - Supports: Key-derivation paths and public/private child-key context used by wallets and PSBT metadata.
11. **RFC 6979 — Deterministic Usage of DSA and ECDSA** | Thomas Pornin
    - URL: https://www.rfc-editor.org/rfc/rfc6979
    - Supports: Deterministic ECDSA nonce-generation construction and boundaries.
12. **SEC 1, Version 2.0** | Standards for Efficient Cryptography Group
    - URL: https://www.secg.org/sec1-v2.pdf
    - Supports: Elliptic-curve key and ECDSA operation standards.
13. **SEC 2, Version 2.0** | Standards for Efficient Cryptography Group
    - URL: https://www.secg.org/sec2-v2.pdf
    - Supports: secp256k1 parameters.
14. **Bitcoin Core 31.1 Tag Commit** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/commit/9be056a8a72b624dae9623b2f7bded92c2a21c91
    - Supports: Exact implementation version reviewed July 25, 2026.
15. **Bitcoin Core 31.1 Script Interpreter Interface** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/interpreter.h
    - Supports: Sighash constants, signature versions, strict-DER, low-S, NULLFAIL, and BIP 143/BIP 341 precomputed-data boundaries.
16. **Bitcoin Core 31.1 Script Interpreter** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/interpreter.cpp
    - Supports: Legacy, BIP 143, and Taproot signature-message construction; legacy and witness-v0 SIGHASH_SINGLE boundaries; undefined ECDSA and Taproot hash-type behavior; and ECDSA/Schnorr verification.
17. **Bitcoin Core 31.1 Standardness Policy** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/policy/policy.h
    - Supports: MANDATORY and STANDARD script-flag classifications and the policy status of STRICTENC, low-S, and NULLFAIL.
18. **Bitcoin Core 31.1 Consensus Flag Selection** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/validation.cpp
    - Supports: GetBlockScriptFlags consensus selection and the boundary from policy constants.
19. **Bitcoin Core 31.1 Public-Key Implementation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/pubkey.cpp
    - Supports: ECDSA verification, low-S normalization, public-key parsing, and Schnorr verification interfaces.
20. **Bitcoin Core 31.1 Private-Key Implementation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/key.cpp
    - Supports: ECDSA and Schnorr signature construction and nonce interfaces.
21. **Bitcoin Core 31.1 PSBT Documentation** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/psbt.md
    - Supports: Bitcoin Core’s release-specific PSBT workflow and role boundaries.
22. **Bitcoin Core 31.1 Signing Provider Interface** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/sign.h
    - Supports: Signature production, provider, and transaction-signing interfaces.
23. **Bitcoin Core 31.1 Script Tests** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/test/script_tests.cpp
    - Supports: Legacy, SegWit, Taproot, encoding, sighash, consensus, and policy test cases.
24. **Bitcoin Core 31.1 BIP 341 Wallet Test Vectors** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/test/data/bip341_wallet_vectors.json
    - Supports: Taproot output and signature-hash wallet construction vectors.
25. **Bitcoin Core 31.1 Transaction Signing Functional Test** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/test/functional/rpc_signrawtransaction.py
    - Supports: End-to-end transaction signing, sighash selection, and error cases.
26. **Bitcoin Core 31.1 PSBT Functional Test** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/test/functional/rpc_psbt.py
    - Supports: PSBT creation, update, signing, combination, finalization, and error behavior.

## 5. SEO title

How Digital Signatures Work in Bitcoin | Mempool Surf Club

## 6. Meta description

Learn what Bitcoin signatures authorize, how ECDSA and Schnorr differ, and how legacy, SegWit, Taproot, sighash flags, PSBT, and hardware signers fit together.

## 7. Page excerpt

Bitcoin signatures authorize transaction inputs—not identities or encrypted messages. Trace what legacy, SegWit, and Taproot sign, verify, and leave to wallets.

## 8. Estimated reading time

19 to 22 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-057 | How Schnorr Signatures Work in Bitcoin
- Next: MSC-GUIDE-059 | How Hash Functions Work in Bitcoin
- Prerequisite: MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- Prerequisite: MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work
- Prerequisite: MSC-GUIDE-054 | How Bitcoin Script Works
- Prerequisite: MSC-GUIDE-056 | How SegWit Changed Bitcoin
- Branch: MSC-GUIDE-055 | How Taproot Changed Bitcoin
- Branch: MSC-GUIDE-057 | How Schnorr Signatures Work in Bitcoin
- Return: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] Private keys, public keys, addresses, authorization, personal identity, and long-term control are kept distinct.
- [x] Signing and hashing are not described as encryption.
- [x] ECDSA and BIP 340 Schnorr contexts and encodings are separated without presenting either as universally superior.
- [x] SIGHASH_ALL, NONE, SINGLE, ANYONECANPAY, Taproot DEFAULT, and undefined hash-type boundaries are explained by signature version.
- [x] Legacy, BIP 143, BIP 341, and BIP 342 signature-message constructions remain distinct.
- [x] Legacy constant-one and SegWit-v0 zero-hash SIGHASH_SINGLE behavior are not conflated.
- [x] Signature hashes are not confused with transaction identifiers.
- [x] Strict DER consensus, Bitcoin Core low-S policy, NULLFAIL policy, and tapscript consensus failure behavior are separately classified.
- [x] Amount commitments are distinguished across legacy, SegWit version 0, and Taproot signing.
- [x] Offline signing, PSBT, hardware wallets, and message signing are described without guarantees they do not provide.
- [x] Nodes’ verification role is separated from wallets’ and devices’ signature-construction role.
- [x] Current Bitcoin Core implementation and policy claims are pinned to 31.1 and dated July 25, 2026.
- [x] Planned internal links remain inactive and do not imply publication.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-26
- Primary evidence reviewed: BIPs 32, 66, 141, 143, 174, 322, 340, 341, 342, and 371; RFC 6979; Bitcoin Core `v31.1` commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`; `src/script/interpreter.h`, `src/script/interpreter.cpp`, `src/policy/policy.h`, `src/validation.cpp`, `src/pubkey.cpp`, `src/key.cpp`, `src/script/sign.h`, and `doc/psbt.md`; `src/test/script_tests.cpp`, `src/test/data/bip341_wallet_vectors.json`, `test/functional/rpc_signrawtransaction.py`, and `test/functional/rpc_psbt.py`.
- Material corrections made: Separated the legacy constant-one SIGHASH_SINGLE result from SegWit version 0’s zero `hashOutputs` message and Taproot’s validation failure; added undefined ECDSA and Taproot hash-type behavior; clarified that `MANDATORY_SCRIPT_VERIFY_FLAGS` is not itself the source of all consensus flags and that low-S, NULLFAIL, and STRICTENC are standardness boundaries in Bitcoin Core 31.1; retained strict-DER consensus and tapscript’s separate failed-signature behavior; and strengthened PSBT/BIP 32 metadata and signer-display limits.
- Remaining sensitivities: Consensus behavior depends on the active signature version and script flags; relay and mining policy can change independently; wallet construction, PSBT interpretation, derivation checks, hardware displays, message-signing conventions, and firmware support remain product- and release-specific.
- Renewal requirement: Future BIP revisions, Bitcoin Core releases, policy changes, wallet or signing-device updates, or new message-signing conventions require renewed verification. Human Verification does not authorize copy-lock.

## 12. Illustration brief

### Illustration 1

- Concept title: Four Signature Message Channels
- Educational purpose: Compare what legacy, SegWit version 0, Taproot key path, and tapscript commit to.
- Recommended placement: After Tapscript message extensions.
- Visual description: Vintage signal-routing panel with four parallel channels feeding separate digest gauges; each channel highlights transaction fields, previous-output amount, spent script, annex, or tapleaf as applicable.
- Required labels: Legacy, BIP 143, BIP 341, BIP 342, Inputs, Outputs, Amount, scriptCode, Spent scriptPubKey, Annex, Tapleaf
- Caption: Bitcoin signature messages depend on the spending context; they are not all hashes of the same transaction serialization.
- Alt text: Comparison chart showing fields committed by legacy, SegWit version 0, Taproot key-path, and tapscript signatures.
- Image orientation: Landscape
- Mobile crop notes: Stack the four channels vertically with aligned field columns.
- Status: PLANNED

### Illustration 2

- Concept title: Sighash Authorization Switchboard
- Educational purpose: Show how ALL, NONE, SINGLE, ANYONECANPAY, and DEFAULT change transaction commitments.
- Recommended placement: After Signature-hash flags.
- Visual description: Nautical electrical switchboard with input and output circuits; ALL powers every output, NONE disconnects outputs, SINGLE powers the matching output, ANYONECANPAY isolates one input, and DEFAULT routes through the Taproot whole-transaction setting.
- Required labels: SIGHASH_ALL, SIGHASH_NONE, SIGHASH_SINGLE, ANYONECANPAY, SIGHASH_DEFAULT, Current input, Other inputs, Matching output, All outputs
- Caption: Sighash flags select commitments; wallets must explain the authority each mode leaves open.
- Alt text: Switchboard diagram showing which transaction inputs and outputs different Bitcoin sighash flags commit to.
- Image orientation: Landscape
- Mobile crop notes: Use one input row and one output row with five large switch positions.
- Status: PLANNED

### Illustration 3

- Concept title: The Signing Boundary Workbench
- Educational purpose: Separate coordinator, PSBT, signing device, user display, node verification, and broadcast roles.
- Recommended placement: After Hardware-wallet boundaries.
- Visual description: Vintage shipyard workbench where an online coordinator assembles a PSBT crate, a hardware device checks and signs it behind a secure hatch, and a validating node independently verifies the finalized transaction.
- Required labels: Coordinator, PSBT, Previous-output data, User review, Hardware signer, Private key, Finalizer, Node verification, Broadcast
- Caption: A signing device protects a key only within a larger data, interface, and verification workflow.
- Alt text: Workflow diagram separating PSBT coordination, hardware signing, user review, finalization, and node verification.
- Image orientation: Landscape
- Mobile crop notes: Keep the secure signer as the central boundary between coordinator and finalizer.
- Status: PLANNED
