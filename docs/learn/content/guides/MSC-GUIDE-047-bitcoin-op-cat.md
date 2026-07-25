---
registry_id: MSC-GUIDE-047
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: What Is OP_CAT?
handle: bitcoin-op-cat
category: Building on Bitcoin
subcategory: Innovation
depth: Deep
format: Technical Analysis
primary_path: Build on Bitcoin
secondary_paths:
  - Understand the Network
author_display: Mempool Surf Club Editorial
reviewed_date: null
copy_locked_date: null
---

# What Is OP_CAT?

## 1. Introductory deck

OP_CAT is a proposed Tapscript opcode that joins two stack values. Learn how its simple byte-concatenation rule differs from the higher-level systems built with it, why current mainnet Tapscript still treats `0x7e` as OP_SUCCESS126, and why BIP 347's Complete status is not deployment.

## 2. Full article

OP_CAT is a proposed Bitcoin Script operation that concatenates two stack elements. If the stack contains `x1` followed by `x2`, OP_CAT produces `x1 || x2`: the bytes of the first value followed by the bytes of the second.

The operation is simple. Its status is not. OP_CAT existed in early Bitcoin software, was disabled in 2010, and is not an active concatenation operation under Bitcoin's current mainnet consensus rules. BIP 347 proposes enabling it only in Tapscript through a soft fork.

As of July 24, 2026, BIP 347 is marked `Complete`, not `Deployed`. Under the current BIP process, Complete means the authors consider the proposal finished and recommend adoption; it does not mean activation criteria have been met or the network enforces the proposal.

### Concatenation is a general building block

Bitcoin Script operates on byte arrays placed on a stack. Many useful constructions require building a larger byte sequence from smaller pieces before hashing or checking it. OP_CAT supplies that primitive.

For example, a script could concatenate two child hashes before hashing the result to verify one level of a Merkle tree. A script could combine fields that form a committed message. More elaborate constructions can use concatenation with signatures and hashes to reason about transaction data or enforce relationships among values.

OP_CAT does not understand Merkle trees, vaults, covenants, signatures, or bridges. It only joins bytes. The higher-level behavior comes from the complete script, transaction structure, signing rules, and application protocol.

This is why a small opcode can have a large design surface. General primitives can be composed in ways that are useful, inefficient, subtle, or unsafe.

### Early Bitcoin had OP_CAT

The original Bitcoin Script implementation included OP_CAT. In August 2010, a commit disabled OP_CAT together with several other opcodes.

The BIP describes a historical concern that repeated duplication and concatenation could grow a stack item rapidly. Early software already had a stack-element limit, but disabling the opcode removed that construction from active script evaluation.

History should not be used as proof that the current proposal is automatically safe or unsafe. Today's Tapscript has different upgrade mechanics and explicit resource limits. BIP 347 specifies a 520-byte maximum resulting element, so a concatenation that would exceed that size fails.

The proposal is therefore a new activation decision with current semantics, not simply a switch that restores every aspect of a 2009 implementation.

### Current legacy and SegWit v0 behavior

In current Bitcoin Core v31.1, OP_CAT remains in the list of disabled opcodes for legacy Script and SegWit version-zero execution. Encountering it causes script failure with `SCRIPT_ERR_DISABLED_OPCODE`.

BIP 347 explicitly preserves that behavior. Its proposed change applies only to Tapscript, the script language used for Taproot script-path spends.

That boundary prevents a successful soft fork from silently changing old script versions. A transaction using OP_CAT in a legacy or P2WSH script would remain invalid under the proposal.

Bitcoin Core source is evidence of one current implementation's enforcement of active rules. The consensus definition also comes from the behavior compatible nodes jointly enforce. A pull request or experimental branch that implements OP_CAT does not change mainnet consensus by itself.

### Current Tapscript treats byte 0x7e as OP_SUCCESS126

Tapscript reserved a set of opcode values called OP_SUCCESSx. Under BIP 342, if a Tapscript contains an executed or parsed OP_SUCCESSx opcode under the defined rules, validation succeeds without continuing ordinary script execution.

The historical OP_CAT byte value is decimal 126, or hexadecimal `0x7e`. In current Tapscript that value is OP_SUCCESS126, not an active concatenation instruction.

BIP 347 proposes redefining OP_SUCCESS126 as OP_CAT. That is a soft-fork pattern because some spends that are valid under the old OP_SUCCESS behavior would become invalid unless they satisfy the new OP_CAT rules. Upgraded nodes would enforce the additional restrictions.

Before activation, developers must not construct a mainnet Tapscript expecting `0x7e` to concatenate data. Its current success behavior is materially different and could make an output spendable under conditions the author did not intend.

### The proposed operation has narrow semantics

Under BIP 347, OP_CAT would:

1. require at least two stack elements;
2. remove the top two elements;
3. concatenate them in stack order;
4. reject a result larger than 520 bytes; and
5. push the result back onto the stack.

The proposal does not increase the 520-byte stack-element limit. It does not activate OP_CAT in non-Tapscript scripts. It does not define a new signature hash, inspect a transaction directly, or create persistent contract state.

The reference implementation and test vectors are part of the BIP's Complete status. Those artifacts support implementability and edge-case review. They do not supply network activation.

### Complete is not Deployed

BIP 3 defines the current BIP workflow. It says that individual BIPs do not define Bitcoin or represent community consensus. A Specification BIP may move to Complete after planned work, a reference implementation, and comprehensive test vectors are available.

A Complete BIP can remain Complete indefinitely. To move to Deployed, evidence of active use is required. For a consensus soft fork, relevant evidence can include activation criteria having been met on the network.

BIP 347's changelog records that it was marked Complete on March 1, 2026. Its header still says Complete as of July 24, 2026. Therefore the accurate description is “a complete soft-fork proposal,” not “an activated Bitcoin opcode.”

Discussion, code review, signet experiments, alternative clients, or miner signaling can all be relevant to evaluation. None should be collapsed into deployment unless the actual activation mechanism and active-chain state support that claim.

### Why developers are interested in OP_CAT

Concatenation can help scripts verify hashed data structures. A Merkle proof, for example, repeatedly combines a current hash with a sibling hash before hashing the pair. Native concatenation can make such verification more direct.

BIP 347 also lists tree signatures, non-equivocation contracts, Lamport-signature constructions, Bitstream, vaults, covenant techniques, and BitVM improvements as possible uses.

These are capability arguments, not deployed applications. Each construction has additional assumptions, transaction formats, limits, and security analysis. A proposal enabling one primitive does not guarantee that every cited use is practical, private, efficient, or safe.

Some examples rely on cryptographic techniques that may be difficult to review. Others can create scripts or witnesses that are large enough to be costly despite remaining within consensus limits. Application-level feasibility should be measured with concrete transactions and adversarial tests.

### OP_CAT and covenants

A covenant restricts how a Bitcoin output may be spent, often by constraining properties of later transactions. OP_CAT is frequently discussed as a path to covenant-like constructions because concatenation can help scripts assemble messages checked by signature or hash operations.

OP_CAT is not itself a covenant opcode. It does not directly expose all fields of the spending transaction. Covenant behavior arises only when OP_CAT is combined with existing signature semantics and a carefully designed script.

This matters for both capability and risk claims. Saying “OP_CAT enables covenants” can hide which covenant pattern, what transaction commitments it relies on, whether key-path spending is disabled, how fees are handled, and whether the construction is usable within resource limits.

Competing covenant proposals may offer more specialized semantics. The tradeoff is not simply more versus less expressiveness. Reviewers compare analyzability, implementation complexity, composability, resource cost, accidental behavior, and interaction with existing Script rules.

### Resource limits still shape applications

The proposed 520-byte result limit prevents unbounded stack-item growth inside one operation. Tapscript also has stack-element count, witness-weight, and signature-operation constraints.

A script can be consensus-valid yet expensive to create or spend. More witness data increases transaction weight and fees. More complicated scripts create more opportunities for implementation mistakes, wallet incompatibility, and poor recovery behavior.

Consensus resource limits are not a performance guarantee. Nodes still parse and execute scripts, wallets still construct witnesses, and users still need transactions to relay and confirm under current policy and fee conditions.

The BIP's safety argument should therefore be considered alongside benchmark results, code review, fuzzing, test vectors, and analysis of realistic applications.

### Experimental implementations do not change mainnet

A Bitcoin Core pull request, fork, signet, or testing environment can implement BIP 347 so developers can build test scripts and measure behavior. Such software is useful evidence.

It remains implementation behavior on that environment. Mainnet users running ordinary current software do not gain OP_CAT semantics because a test branch exists.

Applications should pin the network and rules they expect. A script created for a custom signet can be misleading or unsafe if copied to mainnet. Wallets and explorers also need context-aware disassembly so they do not label current OP_SUCCESS126 behavior as activated OP_CAT.

The same byte can have different meaning across script versions and networks. Tooling must display that context rather than showing only the mnemonic preferred by one experimental implementation.

### Activation would require coordinated rule enforcement

BIP 347 specifies semantics but contains no activation height, signaling threshold, start time, or deployment parameters. Bitcoin Core v31.1 sources reviewed for this guide preserve active OP_SUCCESSx Tapscript behavior and legacy or SegWit v0 disabled-opcode behavior; they do not document a mainnet BIP 347 deployment. Any mainnet deployment would need a concrete soft-fork activation process, implementation releases, ecosystem review, and a point at which upgraded nodes begin enforcing the new rule.

A soft fork is backward-compatible in the limited sense that old nodes can continue accepting blocks that upgraded nodes accept. Old nodes would not enforce the new OP_CAT restrictions and could not independently validate that a Tapscript spend complied with them.

That creates the ordinary soft-fork dependence on sufficient enforcement by the economic network. The risks and decision process are broader than whether the opcode implementation passes unit tests.

No guide should predict activation dates, claim consensus, or describe a proposal as inevitable. Bitcoin has no central body that can approve a BIP into consensus.

### The practical evaluation

When evaluating OP_CAT, begin with the active network rule: current mainnet Tapscript uses OP_SUCCESS126, while legacy and SegWit v0 OP_CAT remain disabled.

Then read the exact BIP version and status. BIP 347 version 1.0.0 is Complete as of the review date, which establishes proposal maturity under the BIP process but not deployment.

Next examine the reference implementation, tests, benchmarks, and specific use case. Verify witness sizes, fees, key paths, recovery paths, and behavior if a transaction is delayed or replaced.

Finally separate the primitive from the product claim. OP_CAT concatenates bytes. A vault, bridge, post-quantum fallback, BitVM optimization, or covenant system must be evaluated as its own protocol.

That disciplined description leaves room for serious interest without presenting a proposed consensus change as a feature users can rely on today.

## 3. Key Terms

- **OP_CAT:** A Script operation that concatenates two stack byte arrays under the semantics proposed by BIP 347.
- **Concatenation:** Joining byte sequence `x1` and byte sequence `x2` to produce `x1 || x2`.
- **Tapscript:** The script language and validation rules for Taproot script-path spends defined by BIP 342.
- **OP_SUCCESSx:** Reserved Tapscript opcodes that currently cause successful validation and provide a path for future soft-fork restrictions.
- **OP_SUCCESS126:** The current Tapscript meaning of byte `0x7e`, which BIP 347 proposes redefining as OP_CAT.
- **Disabled opcode:** An opcode that causes failure in the script versions where it remains disabled.
- **Stack element:** A byte array held on Bitcoin Script's execution stack.
- **520-byte limit:** The maximum stack-element size retained by the BIP 347 proposal.
- **Soft fork:** A consensus-rule change that makes some previously valid blocks or spends invalid under upgraded rules.
- **Complete BIP:** A proposal whose authors have completed planned work and recommend adoption under BIP 3; it is not necessarily deployed.
- **Deployed BIP:** A BIP status requiring evidence of active use or, for a soft fork, applicable network activation evidence.
- **Covenant:** A spending condition that constrains properties of later transactions.
- **Reference implementation:** Code demonstrating the proposed specification; it is not activation by itself.
- **Consensus activation:** The point at which the network's enforced rules include the proposed restriction.

## 4. Sources

1. **BIP 347: OP_CAT in Tapscript** | Ethan Heilman and Armin Sabouri
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0347.mediawiki
   - Supports: The proposed OP_CAT semantics, OP_SUCCESS126 redefinition, 520-byte result limit, Tapscript-only scope, use cases, reference implementation, test vectors, Complete status, and 2026-03-01 changelog.
2. **BIP 3: Updated BIP Process** | Murch
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0003.md
   - Supports: The meaning of BIP ownership, Complete and Deployed statuses, evidence expectations, and the statement that BIPs do not define Bitcoin or represent community consensus.
3. **BIP 342: Validation of Taproot Scripts** | Pieter Wuille, Jonas Nick, and Anthony Towns
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0342.mediawiki
   - Supports: Current Tapscript execution, OP_SUCCESSx behavior, signature operations, and resource limits.
4. **BIP 341: Taproot** | Pieter Wuille, Jonas Nick, and Anthony Towns
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki
   - Supports: Taproot outputs and script-path commitments that provide the context for Tapscript.
5. **BIP 340: Schnorr Signatures for secp256k1** | Pieter Wuille, Jonas Nick, and Tim Ruffing
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki
   - Supports: Schnorr signature rules used by Tapscript and cited OP_CAT constructions.
6. **Bitcoin Core v31.1 Script Interpreter** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/interpreter.cpp
   - Supports: Current implementation behavior that rejects OP_CAT as disabled in legacy and SegWit v0 script evaluation.
7. **Bitcoin Core PR 29247: OP_CAT** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/pull/29247
   - Supports: The referenced experimental implementation and test discussion; a pull request is not mainnet activation.
8. **Satoshi Nakamoto Commit 4bd188c** | Satoshi Nakamoto
   - URL: https://github.com/bitcoin/bitcoin/commit/4bd188c4383d6e614e18f79dc337fbabe8464c82
   - Supports: The August 2010 source change that disabled OP_CAT and other opcodes.
9. **Bitcoin Script Opcode Definitions** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/script/script.h
   - Supports: Current opcode values and names used by Bitcoin Core.
10. **Bitcoin Core Script Tests** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/src/test/data
   - Supports: Current script test-vector context for active Bitcoin Core behavior.
11. **CAT and Schnorr Tricks I** | Andrew Poelstra
   - URL: https://www.wpsoftware.net/andrew/blog/cat-and-schnorr-tricks-i.html
   - Supports: A cited construction showing how concatenation and Schnorr signatures can emulate check-signature-from-stack-like behavior.
12. **CAT and Schnorr Tricks II** | Andrew Poelstra
   - URL: https://www.wpsoftware.net/andrew/blog/cat-and-schnorr-tricks-ii.html
   - Supports: A cited exploration of covenant and vault constructions using CAT and Schnorr techniques.
13. **BitVM2: Bridging Bitcoin to Second Layers** | Robin Linus and coauthors
   - URL: https://bitvm.org/bitvm_bridge.pdf
   - Supports: The BitVM2 design referenced by BIP 347 when discussing possible efficiency and setup improvements.
14. **Bitstream** | Robin Linus
   - URL: https://robinlinus.com/bitstream.pdf
   - Supports: The fair-exchange protocol cited as a possible OP_CAT application; it is a separate protocol requiring independent evaluation.
15. **Bitcoin Covenants** | Malte Möser, Ittay Eyal, and Emin Gün Sirer
   - URL: https://fc16.ifca.ai/bitcoin/papers/MES16.pdf
   - Supports: Covenant and vault background cited by the BIP; it does not establish OP_CAT deployment.
16. **BIP 141: Segregated Witness** | Eric Lombrozo, Johnson Lau, and Pieter Wuille
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki
   - Supports: The SegWit version-zero script and witness context kept separate from Tapscript.
17. **BIP 123: BIP Classification** | Eric Lombrozo
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0123.mediawiki
   - Supports: The layer classifications used to identify BIP 347 as a consensus soft-fork proposal.

## 5. SEO title

What Is OP_CAT? Bitcoin BIP 347 Explained | Mempool Surf Club

## 6. Meta description

Learn what OP_CAT does, how BIP 347 would activate it in Tapscript, and why Complete does not mean deployed.

## 7. Page excerpt

Understand OP_CAT concatenation, current script behavior, BIP 347 status, soft-fork activation, covenants, use cases, and limits.

## 8. Estimated reading time

16 to 19 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-046 | How Discreet Log Contracts Work
- Next: MSC-GUIDE-048 | Emerging Protocols on Bitcoin: How to Evaluate Them
- Prerequisite: MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- Prerequisite: MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work
- Branch: MSC-GUIDE-045 | What Is BitVM?
- Branch: MSC-GUIDE-055 | How Taproot Changed Bitcoin
- Branch: MSC-GUIDE-056 | How SegWit Changed Bitcoin
- Return: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] Registry metadata matches the approved manifest entry.
- [x] Current legacy, SegWit v0, and Tapscript behavior are separated from BIP 347's proposed behavior.
- [x] Byte `0x7e` is identified as current OP_SUCCESS126 in Tapscript, not active mainnet concatenation.
- [x] BIP 347's Complete status is separated from Deployed status and network activation.
- [x] The March 1, 2026 status change and July 24, 2026 review date are stated.
- [x] OP_CAT is described as byte concatenation rather than a native covenant, vault, bridge, or BitVM feature.
- [x] The 520-byte result limit and Tapscript-only scope match the proposal.
- [x] Reference implementations, pull requests, tests, custom networks, and mainnet consensus are not collapsed.
- [x] No activation date, consensus, adoption, security, or inevitability claim is made.
- [x] Planned internal links remain inactive and do not imply publication.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-24
- Notes: Verified the live BIP 347 header as `Complete`, version 1.0.0, with its March 1, 2026 status change; confirmed the proposed Tapscript-only redefinition of OP_SUCCESS126, current BIP 342 OP_SUCCESSx behavior, and Bitcoin Core v31.1 legacy and SegWit v0 disabled-opcode handling. The reviewed primary sources contain no BIP 347 activation parameters or documented mainnet activation, so OP_CAT remains a complete soft-fork proposal rather than an active mainnet opcode.

## 12. Illustration brief

### Illustration 1

- Concept title: One Opcode, Three Contexts
- Educational purpose: Show that byte 0x7e has different status in legacy Script, current Tapscript, and proposed post-soft-fork Tapscript.
- Recommended placement: After the section Current Tapscript treats byte 0x7e as OP_SUCCESS126.
- Visual description: Three-panel vintage navigation chart showing legacy waters marked disabled, current Tapscript waters marked OP_SUCCESS126, and a proposed soft-fork route marked OP_CAT.
- Required labels: Legacy Script, SegWit v0, Disabled OP_CAT, Current Tapscript, OP_SUCCESS126, BIP 347 proposal, Soft-fork activation
- Caption: The byte value is shared, but its active meaning depends on script version and whether the proposed soft fork has deployed.
- Alt text: Three-panel technical chart comparing disabled OP_CAT, current OP_SUCCESS126, and proposed OP_CAT semantics.
- Image orientation: Landscape
- Mobile crop notes: Stack the three contexts vertically with the current state centered.
- Status: PLANNED

### Illustration 2

- Concept title: Concatenation Workbench
- Educational purpose: Explain the exact stack operation without implying higher-level protocol behavior.
- Recommended placement: After the section The proposed operation has narrow semantics.
- Visual description: Vintage technical workbench with two labeled byte strips entering a joining tool and one combined strip leaving, beside a 520-byte gauge.
- Required labels: x1, x2, Stack top, x1 || x2, 520-byte maximum, Failure
- Caption: BIP 347's OP_CAT joins two byte arrays and fails if the resulting stack element exceeds 520 bytes.
- Alt text: Stack-operation diagram showing two byte arrays concatenated into one result under a 520-byte limit.
- Image orientation: Landscape
- Mobile crop notes: Show inputs above the join and the result below.
- Status: PLANNED

### Illustration 3

- Concept title: Proposal-to-Deployment Tide Chart
- Educational purpose: Distinguish BIP status from consensus activation.
- Recommended placement: After the section Complete is not Deployed.
- Visual description: Nautical tide chart with markers for Draft, Complete, implementation testing, activation proposal, network enforcement, and Deployed, with BIP 347 located at Complete.
- Required labels: Draft, Complete, Reference implementation, Test vectors, Activation mechanism, Network enforcement, Deployed
- Caption: Complete means the proposal work is finished under BIP 3; it does not mean Bitcoin enforces OP_CAT.
- Alt text: Nautical status chart showing BIP 347 at Complete before activation and Deployed stages.
- Image orientation: Landscape
- Mobile crop notes: Use a vertical status ladder with the current marker emphasized by position, not color.
- Status: PLANNED
