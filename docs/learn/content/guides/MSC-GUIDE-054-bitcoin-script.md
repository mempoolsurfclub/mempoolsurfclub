---
registry_id: MSC-GUIDE-054
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: How Bitcoin Script Works
handle: bitcoin-script
category: Bitcoin Development
subcategory: Protocols
depth: Deep
format: Technical Explainer
primary_path: Build on Bitcoin
secondary_paths:
  - Understand the Network
author_display: Mempool Surf Club Editorial
reviewed_date: null
copy_locked_date: null
---

# How Bitcoin Script Works

## 1. Introductory deck

Bitcoin Script is a constrained validation language used to decide whether a transaction input may spend a particular output. It evaluates data, signatures, hashes, timelocks, and logical conditions under context-specific consensus rules. It is not a general application runtime, and its behavior cannot be inferred from one opcode table or one source function alone.

## 2. Full article

A Bitcoin transaction does not send coins to an account. It creates transaction outputs containing values and spending conditions. A later input identifies an unspent output and supplies data intended to satisfy those conditions. Bitcoin Script is part of the rule system nodes use to determine whether that spend is valid.

The word “script” can suggest a general programming environment. Bitcoin Script is narrower. It has no persistent application state, no network access, no filesystem, and no open-ended loop construct. It runs during transaction validation with tightly limited data and operations. Its purpose is to evaluate authorization and spending conditions, not to host arbitrary applications.

This guide was reviewed July 25, 2026 against Bitcoin Core 31.1, tag `v31.1`, commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`, relevant deployed BIPs, and tagged source, unit vectors, functional tests, and fuzz targets. Exact behavior depends on the script context, active consensus rules, verification flags, policy, and software version.

### Outputs lock; inputs attempt to unlock

Every transaction output contains a value and a `scriptPubKey`. The `scriptPubKey` commits to or directly expresses the conditions under which the output may be spent.

A spending input references the prior output. Depending on the output type, the input can provide a `scriptSig`, witness data, or both. Validation combines the prior output’s condition with the supplied spending data under rules selected by the output form and active script version.

“Unlocking script” is common shorthand, but it can hide important structure. In SegWit and Taproot, the witness may contain signatures, public keys, scripts, control data, or stack arguments that are interpreted differently. The input does not alter the prior output; it presents evidence that the fixed condition is satisfied.

### Stack execution

Bitcoin Script is stack based. Data pushes place byte arrays on a main stack. Opcodes consume items, transform or compare them, and push results. Some opcodes can move items to and from a separate alternate stack, but the alternate stack is local to one script evaluation and is cleared between separately evaluated scripts.

Execution is deterministic for the transaction, spent output, script, flags, and chain context supplied to the interpreter. Conditional opcodes can skip branches, but there are no unbounded loops. A script succeeds only if it avoids a failure condition and ends with the required truth result for its context.

Byte arrays can be interpreted as booleans, numbers, hashes, public keys, signatures, or opaque data. Those interpretations have encoding rules. The empty vector and “negative zero” evaluate false. Non-minimal numbers, oversized elements, malformed signatures, or unexpected stack shapes can matter differently under consensus and policy.

### Legacy script evaluation

In the base or legacy context, a node evaluates the input’s `scriptSig` and the spent output’s `scriptPubKey` sequentially on the same main stack. For pay-to-script-hash, or P2SH, BIP 16 adds another stage: a push-only `scriptSig` supplies a redeem script whose hash must match the `scriptPubKey`, and that redeem script is then evaluated using the restored stack.

Legacy signatures use the original signature-hash behavior. Historical rules and bug compatibility are part of consensus. A developer cannot replace them with a cleaner interpretation without changing which historical or future transactions validate.

Legacy does not mean “anything before SegWit is the same.” Bare scripts, P2PKH, P2SH, timelocks, and multisignature patterns have distinct structures, and relay policy may reject forms that consensus would still allow in a block.

### SegWit version 0 evaluation

BIP 141 introduced witness programs. A native witness output places a version and program directly in the `scriptPubKey`. A nested construction places a witness program inside a BIP 16 redeem script.

For P2WPKH, the witness must supply exactly a signature and public key corresponding to a 20-byte program. For P2WSH, the final witness element is a witness script whose SHA256 hash must match the 32-byte program; earlier witness elements become its initial stack.

SegWit version 0 uses the BIP 143 signature digest and consensus rules specific to witness execution. Witness data is serialized separately from the legacy transaction identifier, but upgraded nodes still validate it. Native witness spends require an empty `scriptSig`; nested witness spends require exactly one push of the witness-program redeem script.

### Taproot key path and tapscript

A pay-to-Taproot output is a native SegWit version 1 output with a 32-byte program. BIP 341 defines key-path and script-path spending. P2SH-wrapped version 1 outputs are not Taproot spends.

A key-path spend validates a Schnorr signature against the output key. It does not execute a tapscript.

A script-path spend reveals a tapscript, control block, and Merkle path that prove the script was committed into the output key. BIP 342 defines the tapscript language and its signature-opcode behavior. Bitcoin Core represents key-path and tapscript validation as distinct signature versions.

Tapscript adds `OP_CHECKSIGADD`, disables `OP_CHECKMULTISIG` and `OP_CHECKMULTISIGVERIFY` when they execute, and reserves designated `OP_SUCCESSx` values for future soft-fork upgrades. During tapscript validation, the interpreter scans for `OP_SUCCESSx` before ordinary parsing and resource checks; finding one makes the script succeed at consensus, while standard policy discourages spending such paths before they are assigned meaning.

### Scripts, witnesses, and committed data

Several names describe different objects:

- **`scriptPubKey`:** the spending condition stored in an output.
- **`scriptSig`:** input field used by legacy and P2SH constructions.
- **Redeem script:** script revealed to satisfy a P2SH hash commitment.
- **Witness:** segregated per-input stack data introduced by SegWit.
- **Witness script:** final witness element whose hash satisfies a P2WSH program.
- **Tapscript:** script revealed in a Taproot script-path spend.
- **Control block:** Taproot data proving the leaf’s commitment and reconstructing the output key.

The same byte sequence can be invalid, ignored, discouraged, or interpreted differently depending on where it appears. Naming the container and script version is necessary before describing behavior.

### Signature checks and signature hashes

Signature opcodes do not merely ask whether a signature matches a key. They validate a signature over a context-specific digest of transaction data.

Legacy, SegWit version 0, and Taproot use different signature-message rules. Sighash modes can select which inputs and outputs are committed. `SIGHASH_ALL`, `NONE`, `SINGLE`, `ANYONECANPAY`, and Taproot’s `SIGHASH_DEFAULT` have precise version-specific semantics.

`OP_CODESEPARATOR` also differs by context. In legacy and witness-v0 execution, signature checking uses script code beginning after the most recently executed separator. Legacy hashing additionally removes matching signatures and omits remaining `OP_CODESEPARATOR` opcodes from the serialized script code; BIP 143 does not perform the legacy signature deletion and retains later separators. Tapscript instead commits to the entire tapleaf hash plus the opcode position of the last executed separator through the BIP 342 signature-message extension.

A valid cryptographic signature can still fail script validation because the public key encoding, signature encoding, sighash byte, stack position, or transaction context is wrong. Conversely, a script can fail before a signature operation runs.

Multisignature is also construction-specific. Legacy and SegWit v0 can use `OP_CHECKMULTISIG`, whose historical bug consumes one extra stack item. BIP 147’s active `NULLDUMMY` consensus rule requires that item to be empty. Tapscript disables the old multisignature opcodes and uses combinations such as `OP_CHECKSIG` and `OP_CHECKSIGADD`. Off-chain threshold or key-aggregation protocols are separate systems that may produce one on-chain signature.

### Hashes, timelocks, and logical conditions

Hash opcodes let scripts compare a revealed preimage with a committed digest. They support constructions such as hashlocks, but the security of a construction depends on preimage entropy, disclosure, transaction structure, and surrounding conditions.

`OP_CHECKLOCKTIMEVERIFY` applies an absolute block-height or timestamp constraint through `nLockTime` and requires the spending input not to be final. `OP_CHECKSEQUENCEVERIFY` applies a relative block or time constraint through the input sequence field and requires transaction version 2 or later. Neither opcode creates a scheduler that broadcasts a transaction automatically.

Conditional and comparison opcodes allow multiple spending branches. A script can express “signature A now, or signature B after a delay,” but wallet coordination, key storage, fee management, and recovery remain outside Script itself.

### Consensus rules versus standardness policy

Consensus rules determine whether a block is valid. Standardness and relay policy determine whether a node will accept an unconfirmed transaction into its mempool or relay it under local policy.

Bitcoin Core exposes verification flags used in different contexts. Some flags correspond to active consensus rules; others enforce standardness or discourage use of upgrade mechanisms before their meaning is known. The source comments explicitly warn that some encoding or upgrade-discouragement flags are not intended as mandatory block-validation rules.

A transaction can therefore be consensus-valid but nonstandard. It may be rejected from a node’s mempool yet accepted if included in a valid block. Policy is still operationally important: relying on nonstandard behavior can make broadcast and confirmation difficult.

### Disabled, reserved, and upgrade opcodes

Some opcode byte values are globally disabled in base and witness-v0 script. Bitcoin Core rejects those bytes during decoding even when they appear in a conditional branch that would not execute. Their names can remain in the opcode enumeration for historical reasons; presence in `script.h` does not mean they are usable.

That behavior is distinct from opcodes that fail only when executed. For example, tapscript’s `OP_CHECKMULTISIG` and `OP_CHECKMULTISIGVERIFY` fail when reached but are ignored in an unexecuted branch. Reserved and invalid opcodes have their own context-specific behavior.

Some NOP opcodes were repurposed through soft forks, including the opcodes now used for absolute and relative timelocks. Policy can discourage remaining upgradeable NOPs so users do not rely on behavior that a future soft fork may narrow.

Tapscript uses a different upgrade mechanism. `OP_SUCCESSx` values intentionally succeed today at consensus, allowing a future soft fork to assign stricter meaning. Unknown tapleaf versions, unknown tapscript public-key types, and unknown witness versions are separate upgrade boundaries with separate policy flags. They must not be conflated with one another.

### Resource and execution limits

Bitcoin validation limits resource use to reduce denial-of-service risk and keep validation bounded. In base and witness-v0 script, Bitcoin Core 31.1 enforces a 10,000-byte script limit, a 520-byte pushed-element limit, no more than 201 non-push operations per script, and no more than 1,000 combined main-stack and alternate-stack elements. P2WSH separately limits its revealed witness script to 10,000 bytes.

Tapscript deliberately does not use the 10,000-byte script limit or the 201 non-push-opcode limit; script size is instead bounded indirectly by transaction and block weight. If no `OP_SUCCESSx` is present, the 520-byte element limit remains, and the 1,000-item stack-plus-altstack limit also applies to the initial stack.

Tapscript signature opcodes use a per-input validation budget rather than the legacy block sigop accounting. The budget begins at 50 plus the serialized byte size of that input’s full witness, including its compact-size prefix. Each executed `OP_CHECKSIG`, `OP_CHECKSIGVERIFY`, or `OP_CHECKSIGADD` with a non-empty signature consumes 50 units; crossing below zero fails the script.

These numbers should not be copied as one universal “Script limit” table. A correct statement identifies the script version, whether the rule is consensus or policy, and the exact software or BIP source.

### Common failure conditions

A spend can fail because:

- the committed script or key does not match the revealed data;
- stack underflow or overflow occurs;
- an opcode is disabled, reserved, or invalid for the script version;
- a signature, public key, number, or sighash type is malformed;
- a hash comparison or signature check returns false;
- a timelock condition is not satisfied;
- a branch is unbalanced or ends incorrectly;
- an element, script, control block, stack, or signature budget exceeds its applicable limit;
- the final stack result does not meet the context’s success rule;
- witness or P2SH structure is malformed;
- an active consensus rule rejects the execution.

Bitcoin Core records script-error categories, but a user-facing RPC or wallet may present a higher-level message. Interface wording should not be mistaken for the complete consensus reason.

### Why one interpreter function is not the protocol

Bitcoin Core’s `EvalScript` is central, but Script behavior also depends on transaction serialization, spent-output lookup, signature hashing, verification flags, deployment state, chain context, consensus limits, witness-program recognition, Taproot commitment checks, and calling validation code.

Tests are equally important. Unit tests, JSON test vectors, functional tests, and fuzz targets exercise historical and edge behavior that prose can miss. Tests provide evidence for covered cases; they do not prove absence of defects.

When comparing implementations, pin an exact release or commit and reproduce the same vectors. A difference can be a policy choice, interface difference, test harness issue, or consensus bug. The category must be established before calling it a protocol disagreement.

### Safe boundaries for “programmability”

Bitcoin Script can compose signatures, hashes, timelocks, and logical branches into useful spending policies. It supports payment channels, recovery paths, escrows, atomic-swap components, and other protocols.

That does not make it equivalent to a general-purpose smart-contract virtual machine. Most application state and coordination live in transactions, wallets, communication protocols, and off-chain systems. Script evaluates a spend under bounded rules; it does not run continuously or maintain an autonomous application.

A precise description is: Bitcoin Script is a constrained, versioned validation language for transaction spending conditions.

## 3. Key Terms

- **Bitcoin Script:** Bitcoin’s constrained language for evaluating transaction spending conditions.
- **`scriptPubKey`:** The locking condition stored in a transaction output.
- **`scriptSig`:** Input field supplying data for legacy and P2SH spends.
- **Witness:** Segregated input data used by SegWit and Taproot spends.
- **Redeem script:** Script revealed to satisfy a P2SH commitment.
- **Witness script:** Script revealed to satisfy a P2WSH commitment.
- **Tapscript:** Script language used in Taproot script-path leaves.
- **Control block:** Taproot proof data connecting a revealed leaf to the output key.
- **Stack:** Last-in, first-out collection of byte arrays used during execution.
- **Opcode:** A byte value interpreted as a Script operation.
- **Signature hash:** Transaction digest signed and verified under a particular script version and sighash mode.
- **Standardness:** Local policy for mempool admission and relay.
- **Consensus rule:** A rule determining block or transaction validity within a block.
- **Verification flag:** Software flag enabling a particular script check in a validation context.
- **OP_SUCCESSx:** Tapscript opcode values reserved to enable future soft-fork upgrades.
- **Timelock:** A spending condition tied to block height, time, or relative age.

## 4. Sources

1. **Bitcoin Core 31.1 Script Interpreter** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/interpreter.cpp
   - Supports: Stack execution, disabled-opcode parsing, signature checks, OP_CODESEPARATOR handling, witness validation, tapscript execution, and failure paths.
2. **Bitcoin Core 31.1 Interpreter Interface** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/interpreter.h
   - Supports: Verification flags, signature versions, BIP 143 and BIP 341 precomputation, Taproot execution data, and consensus-versus-policy comments.
3. **Bitcoin Core 31.1 Script Definitions** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/script.h
   - Supports: Opcode enumeration, element, operation, script, stack, annex, and tapscript validation-budget constants.
4. **Bitcoin Core 31.1 Script Errors** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/script_error.h
   - Supports: Script failure categories used by the implementation.
5. **Bitcoin Core 31.1 Standard Script Policy** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/solver.cpp
   - Supports: Recognition of standard output forms and script templates.
6. **Bitcoin Core 31.1 Policy Definitions** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/policy/policy.h
   - Supports: Standardness, transaction weight, sigop, witness, and relay-policy boundaries.
7. **Bitcoin Core 31.1 Script Unit Tests** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/test/script_tests.cpp
   - Supports: Unit-test coverage for script execution, flags, edge cases, signature behavior, and script-error classifications.
8. **Bitcoin Core 31.1 Script Test Vectors** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/test/data/script_tests.json
   - Supports: Valid and invalid script examples across flags and historical behavior.
9. **Bitcoin Core 31.1 Script Fuzz Target** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/test/fuzz/script.cpp
   - Supports: Fuzz testing of script parsing and execution boundaries.
10. **BIP 16 — Pay to Script Hash** | Gavin Andresen
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki
    - Supports: P2SH redeem-script commitment and evaluation.
11. **BIP 65 — OP_CHECKLOCKTIMEVERIFY** | Peter Todd
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0065.mediawiki
    - Supports: Absolute locktime opcode semantics.
12. **BIP 112 — OP_CHECKSEQUENCEVERIFY** | BtcDrak, Mark Friedenbach, Eric Lombrozo
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0112.mediawiki
    - Supports: Relative locktime opcode semantics.
13. **BIP 141 — Segregated Witness** | Eric Lombrozo, Johnson Lau, Pieter Wuille
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki
    - Supports: Witness programs, P2WPKH, P2WSH, script-versioning, and witness consensus rules.
14. **BIP 143 — Transaction Signature Verification for Version 0 Witness Program** | Johnson Lau, Pieter Wuille
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0143.mediawiki
    - Supports: SegWit v0 signature digest, scriptCode, OP_CODESEPARATOR, and committed data.
15. **BIP 340 — Schnorr Signatures for secp256k1** | Pieter Wuille, Jonas Nick, Tim Ruffing
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki
    - Supports: Signature scheme used by Taproot.
16. **BIP 341 — Taproot: SegWit Version 1 Spending Rules** | Pieter Wuille, Jonas Nick, Anthony Towns
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki
    - Supports: P2TR, key path, script path, control blocks, sighash, annex, and commitment rules.
17. **BIP 342 — Validation of Taproot Scripts** | Pieter Wuille, Jonas Nick, Anthony Towns
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0342.mediawiki
    - Supports: Tapscript opcodes, OP_SUCCESSx ordering, OP_CODESEPARATOR commitments, signature budget, contextual limits, disabled multisig opcodes, and upgrade behavior.
18. **BIP 147 — Dealing with Dummy Stack Element Malleability** | Johnson Lau
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0147.mediawiki
    - Supports: The historical CHECKMULTISIG extra element and deployed NULLDUMMY consensus rule.
19. **Bitcoin Core 31.1 BIP Support Document** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/doc/bips.md
    - Supports: Release-specific implementation and activation references for script-related BIPs.
20. **Bitcoin Core 31.1 Tag Commit** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/commit/9be056a8a72b624dae9623b2f7bded92c2a21c91
    - Supports: Exact source and test version reviewed.

## 5. SEO title

How Bitcoin Script Works | Mempool Surf Club

## 6. Meta description

Learn how Bitcoin Script validates spending conditions across legacy, SegWit, and Taproot, including signatures, timelocks, policy, and limits.

## 7. Page excerpt

Explore Bitcoin’s constrained validation language, from locking scripts and witnesses to tapscript, signature hashes, policy, and execution limits.

## 8. Estimated reading time

18 to 21 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-053 | How Bitcoin Improvement Proposals Work
- Next: MSC-GUIDE-055 | How Taproot Changed Bitcoin
- Prerequisite: MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- Prerequisite: MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work
- Prerequisite: MSC-GUIDE-051 | How to Read the Bitcoin Source Code
- Branch: MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?
- Branch: MSC-GUIDE-047 | What Is OP_CAT?
- Branch: MSC-GUIDE-056 | How SegWit Changed Bitcoin
- Return: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] Bitcoin Script is described as a validation language rather than a general application runtime.
- [x] `scriptPubKey`, `scriptSig`, witness, redeem script, witness script, tapscript, and control block are separated.
- [x] Legacy, P2SH, SegWit v0, Taproot key path, and tapscript contexts are distinguished.
- [x] Main-stack, alternate-stack, conditional, boolean, numeric, signature, timelock, and failure behavior is contextually bounded.
- [x] Legacy, BIP 143, and tapscript OP_CODESEPARATOR and signature-message behavior are separated.
- [x] Consensus rules, verification flags, standardness, mempool policy, and interface messages are not conflated.
- [x] Globally disabled opcodes, executed-only failures, upgradeable NOPs, OP_SUCCESSx, unknown witness versions, and future tapleaf versions are distinguished.
- [x] Resource limits are stated separately for base, witness v0, and tapscript.
- [x] The article does not call Script Turing-complete or equivalent to a general-purpose smart-contract virtual machine.
- [x] Source and test claims are pinned to Bitcoin Core 31.1 and dated July 25, 2026.
- [x] Planned internal links remain inactive and do not imply publication.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-25
- Evidence reviewed: Bitcoin Core `v31.1`, commit `9be056a8a72b624dae9623b2f7bded92c2a21c91`; tagged `src/script/interpreter.cpp`, `interpreter.h`, `script.h`, `script_error.h`, `solver.cpp`, `policy.h`, `src/test/script_tests.cpp`, JSON script vectors, and `src/test/fuzz/script.cpp`; release-specific `doc/bips.md`; and deployed BIPs 16, 65, 112, 141, 143, 147, 340, 341, and 342.
- Material corrections: Corrected disabled-opcode behavior in unexecuted base and witness-v0 branches; separated tapscript’s executed-only disabled multisig behavior; added exact legacy, BIP 143, and BIP 342 OP_CODESEPARATOR boundaries; restored NULLDUMMY’s consensus status; corrected tapscript script-size, opcode-count, stack, element, and signature-budget rules; clarified native versus P2SH-wrapped witness-version behavior; and tightened CLTV and CSV prerequisites.
- Remaining uncertainty: Policy flags, standard transaction forms, wallet construction, and interface errors remain implementation- and version-sensitive. Future witness versions, tapleaf versions, public-key types, and OP_SUCCESSx meanings are intentionally undefined until separately specified and deployed.

## 12. Illustration brief

### Illustration 1

- Concept title: The Spending Condition Workbench
- Educational purpose: Show how an output condition and input data meet during validation.
- Recommended placement: After Outputs lock; inputs attempt to unlock.
- Visual description: Vintage technical workbench with a locked output plate labeled `scriptPubKey` and separate tools labeled `scriptSig`, Witness, Redeem script, Witness script, and Control block.
- Required labels: Output, Input, scriptPubKey, scriptSig, Witness, Redeem script, Witness script, Control block
- Caption: Different output types select different containers and validation paths.
- Alt text: Technical diagram showing Bitcoin output conditions combined with input script and witness data.
- Image orientation: Landscape
- Mobile crop notes: Use three grouped columns: output, supplied data, validation.
- Status: PLANNED

### Illustration 2

- Concept title: Three Script Currents
- Educational purpose: Compare legacy, SegWit v0, and Taproot validation contexts.
- Recommended placement: After Taproot key path and tapscript.
- Visual description: Nautical channel chart splitting into Base, Witness v0, Taproot key path, and Tapscript currents, each with its own signature hash and execution markers.
- Required labels: Base, P2SH, Witness v0, Taproot key path, Tapscript, Signature version
- Caption: The same transaction language is interpreted through versioned validation contexts.
- Alt text: Channel diagram comparing legacy, SegWit, Taproot key-path, and tapscript validation.
- Image orientation: Landscape
- Mobile crop notes: Stack the four currents vertically with aligned inputs and outcomes.
- Status: PLANNED

### Illustration 3

- Concept title: Consensus and Policy Buoys
- Educational purpose: Separate block validity from mempool and relay acceptance.
- Recommended placement: After Consensus rules versus standardness policy.
- Visual description: Two buoy lines around the same transaction: an inner consensus channel and an outer local-policy channel, with one transaction rejected from the mempool but valid inside a mined block.
- Required labels: Consensus, Standardness, Mempool, Relay, Valid block, Local policy
- Caption: A nonstandard transaction can be refused before confirmation without being forbidden by consensus.
- Alt text: Diagram separating Bitcoin consensus validation from local mempool and relay policy.
- Image orientation: Landscape
- Mobile crop notes: Keep the transaction centered between two clearly labeled boundaries.
- Status: PLANNED
