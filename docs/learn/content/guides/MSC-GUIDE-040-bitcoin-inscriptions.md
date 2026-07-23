---
registry_id: MSC-GUIDE-040
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: What Is a Bitcoin Inscription?
handle: bitcoin-inscriptions
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

# What Is a Bitcoin Inscription?

## 1. Introductory deck

A Bitcoin inscription is data discovered by Ord-compatible software inside a defined Taproot script-path witness envelope. Learn how commit and reveal transactions, content fields, identifiers, provenance, rendering, fees, policy, pruning, reorganizations, UTXO control, and security boundaries work without treating every inscription as a native token or guaranteed permanent object.

## 2. Full article

A Bitcoin inscription is content that Ord-compatible software identifies inside a defined envelope in a Bitcoin transaction's Taproot script-path witness. The content can include text, an image, audio, video, HTML, structured metadata, or another byte sequence.

Bitcoin nodes do not have an “inscription” consensus object. They validate the transaction, witness, Taproot commitment, Tapscript execution, UTXO spend, and containing block. Ord software examines the witness and applies additional envelope, field, identifier, numbering, and assignment rules.

That layered definition avoids two common mistakes. An inscription is not the same thing as ordinal theory, which numbers and tracks sats. It is also not automatically a Rune, BRC-20 balance, smart contract, legal title, or non-fungible token.

### Inscriptions and ordinal theory are different

Ordinal theory assigns application-level numbers to sats and follows them through transaction inputs and outputs. An inscription is data found through Ord's envelope rules and assigned to a sat according to the current implementation.

Every sat has an ordinal number under ordinal theory whether or not it has inscription content. An inscription uses Ord's sat-assignment model, but its content, fields, ID, number, parent relationships, and rendering are separate application concepts.

Guide 037 explains the complete numbering and FIFO transfer model. Here, the practical consequence is that an inscription moves when the sat to which it is assigned moves under Ord interpretation. Bitcoin consensus sees the UTXO spend and output amounts, not the inscription identity.

A valid Bitcoin transaction can therefore move an inscription to an unintended output if the wallet does not preserve the expected sat position.

### Inscriptions are not Rune or BRC-20 balances

Runes uses `OP_RETURN` runestones to derive fungible UTXO-associated balances. BRC-20 uses certain JSON inscriptions as operations for another indexed balance system.

A BRC-20 inscription can exist while its operation is invalid under a BRC-20 indexer. A Rune normally uses a runestone rather than an inscription envelope. The categories can interact, but their parsers, state rules, identifiers, and transfer models are not interchangeable.

### SegWit and Taproot provide the transaction context

Segregated Witness, specified in BIP 141, introduced transaction witness data and a weight calculation that discounts witness bytes relative to non-witness bytes. Taproot, specified in BIP 341, added version-one witness outputs with key-path and script-path spending. BIP 342 defines validation of Tapscript leaves.

Inscriptions use a Taproot script-path spend. The reveal transaction's witness includes the tapscript containing the Ord envelope. The script is committed to by an earlier Taproot output.

These Bitcoin features make the transaction structure possible. They do not define inscription content types, IDs, numbers, parent fields, or rendering. Those are Ord application rules.

The witness is still part of the validated Bitcoin transaction. Nodes verify that the Taproot script path matches the committed output and that execution succeeds under consensus. They do not interpret a pushed MIME type as a media instruction.

### The Ord envelope

The current Ord envelope is placed inside a non-executed conditional branch. The recognizable pattern begins with `OP_FALSE OP_IF`, followed by the protocol marker `ord`, then fields encoded as data pushes, an optional empty push marking the start of the body, the body pushes, and `OP_ENDIF`.

Because the branch condition is false, the envelope's pushed content is not executed as active script operations. It is data embedded in a valid Tapscript.

Ord-compatible software scans eligible transaction input witnesses for envelopes matching its parser rules. It then decodes tag-value fields and body data.

An envelope can be malformed from Ord's perspective while the surrounding Tapscript and Bitcoin transaction remain valid. Unknown tags, duplicate fields, incomplete field pairs, unexpected opcodes, or other conditions can affect whether the inscription is recognized, cursed, unbound, or assigned according to current application behavior.

The exact parser is implementation-specific. Integrators should use the maintained Ord code and tests rather than relying only on a diagram.

### Content type and body

An inscription can include a content-type field that identifies the body as a MIME type, such as `text/plain` or an image format. After the fields, an empty data push marks the beginning of the optional body. The body is one or more data pushes concatenated by the parser.

The content type is a claim supplied by the inscriber. An application still needs to decide whether it supports, trusts, or renders that type. The bytes may be malformed, misleading, encrypted, compressed, or dangerous.

The Ord content model is web-like: servers can return the body with its declared content type, and HTML inscriptions can reference compatible inscription resources under supported recursion rules. This flexibility creates rendering and security responsibilities.

An explorer that supports one media type may not support another. A browser may decode a format differently from a dedicated application. Content-type recognition is not a Bitcoin consensus result.

### Commit and reveal transactions

Creating an inscription normally uses two transactions. The commit transaction creates a Taproot output that commits to a script containing the planned envelope. The reveal transaction spends that output through its script path, exposing the tapscript and control block in witness data so Ord-compatible software can find and assign the inscription.

The commit output must fund a valid reveal and its fee. The reveal must place the inscribed sat in the intended output rather than in change, another recipient, or fees.

A commitment is not a confirmed inscription. The reveal must enter the accepted chain. Replacement, fee adjustment, or recovery of a stranded commit must preserve the intended script and assignment. The structure can limit simple front-running of the content, but transaction graph, timing, funding, or leaked construction data can still reveal information.

### Inscription identifiers and numbers

An inscription ID combines the reveal transaction ID with the envelope's index, commonly written as the transaction ID followed by `i` and the index. It is an Ord identifier tied to specific transaction data.

Inscription numbers are sequential indexer labels based on confirmation and envelope order. Historical edge cases produced negative “cursed” numbers. The Ord documentation places the jubilee at block 824,544; later cursed forms are “vindicated” with positive numbers while historical numbering remains.

IDs and numbers are different. Neither proves identity, legal ownership, authenticity, or value. A reorganization can remove a reveal or change its ordering, while preconfirmation replacement can change the transaction ID. Interfaces should verify the full ID, accepted chain, and indexer version.

### Parent-child and provenance relationships

Current Ord inscriptions can include a parent field. Under maintained rules, establishing a parent relationship requires the parent inscription to be spent in the child-creation transaction and encoded correctly. This creates a transaction-verifiable relationship recognized by compatible indexers.

Parent-child links can support collections, editions, updates, or provenance structures. They are stronger than merely writing another inscription's ID into arbitrary text because the construction references and spends the parent under the protocol's rules.

The relationship still has limits. It proves a defined on-chain action involving the parent UTXO, not the off-chain identity of a human creator. It does not grant copyright, trademark rights, authenticity of a brand, or permission to reproduce content.

Other fields, including delegates, metadata, properties, or metaprotocol identifiers, may add application relationships. Support can vary by software version. A provenance statement should identify which field, transaction, and indexer rule establishes it.

### Rendering is an application decision

An explorer or wallet retrieves the bytes, interprets the content type, and applies display rules. Ord's recommendations for preview shape, size, and image scaling are application conventions, not consensus.

Applications may refuse a type, display raw bytes, impose limits, use placeholders, or require interaction. Recursive or delegated content can require other indexed resources. Renderers can lack codecs, apply moderation, or change security policies, so the same inscription may appear differently across services.

Accessibility also remains an application responsibility. The inscription format does not supply alternative text, captions, or transcripts automatically.

### Unsupported and dangerous content

Inscriptions can contain malformed media, offensive or illegal material, deceptive interfaces, tracking attempts, or exploit payloads. The Ord handbook warns that user-generated content may be unlawful or dangerous.

An operator can moderate what its own explorer serves without removing the transaction from Bitcoin history or controlling other services. Wallets and explorers should treat content, MIME types, metadata, filenames, and downloads as untrusted; apply resource limits; and avoid automatic execution. A transaction reference can verify bytes without making them safe.

### HTML, script, and media security boundaries

Ord-style explorers use sandboxed iframes and Content Security Policy for HTML and SVG. Those are renderer defenses, not Bitcoin properties. A service without equivalent isolation can expose users to scripts, navigation, forms, popups, or origin-access risks.

Recursive HTML can reference other inscriptions through supported endpoints, so a renderer must define permitted URLs, scripts, media types, headers, and resource limits. Media decoders can also have vulnerabilities. A recognized MIME type does not prove that the body is valid or safe, and users should not grant wallet permissions or install software because an inscription asks them to.

### Fees and witness data

Creators pay bitcoin fees for commit and reveal transactions. Because the reveal witness can contain the body, larger inscriptions add transaction weight and generally cost more at the same fee rate. SegWit discounts witness bytes relative to non-witness bytes, but blocks still have a total weight limit.

The commit must fund a valid reveal. The reveal needs suitable outputs, an adequate fee, and correct sat assignment. Fee estimates are uncertain, and replacement or child-fee techniques can alter IDs or Ord interpretation if constructed incorrectly. A high fee certifies none of the content, provenance, permanence, or value claims.

### Consensus, standardness, relay, and mining

Bitcoin consensus decides whether a transaction is valid in a block. Standardness and relay policy are implementation choices that decide what a node normally accepts into its mempool or forwards to peers. Miners choose transactions for their blocks and may apply their own policies.

An inscription transaction can be consensus-valid yet rejected by a particular node's mempool policy. Another miner can include it directly if it is valid under consensus. Confirmation resolves the Bitcoin inclusion question, not every Ord parsing question.

Bitcoin Core policy changes over time. Data-carrier settings, minimum relay fees, package rules, and other mempool conditions are current implementation behavior, not immutable protocol rules. An inscription guide should not elevate one Bitcoin Core default into a universal Bitcoin limit.

The Ord envelope lives in a Taproot witness script path rather than an `OP_RETURN` output. Runes uses an `OP_RETURN` runestone. These mechanisms should not be confused.

### Pruned nodes and indexed access

A pruned Bitcoin node validates historical blocks and later deletes old block files. It can enforce consensus without retaining every old witness byte for serving. Bitcoin Core v31.1 pruning is incompatible with its full transaction index.

An Ord explorer needs access to relevant blocks plus its own envelope and content index. Even an archival node does not automatically provide inscription pages. A hosted explorer adds uptime, moderation, version, and trust dependencies.

“On-chain” describes inclusion in Bitcoin block data; it does not mean every full node stores, indexes, renders, or serves the content forever.

### Reorganizations and duplicate or malformed envelopes

An Ord indexer must handle Bitcoin reorganizations. When a reveal block is disconnected, the inscription and any later indexed transfers in that branch must be rolled back. Replacement blocks are then processed in order.

A transaction can contain multiple envelopes. Their indexes contribute to inscription IDs and numbering. Duplicate-looking bodies remain separate envelopes or transactions with different identifiers.

Malformed envelopes may be ignored or classified according to current Ord rules. Historical “cursed” categories arose from envelope forms that were recognized later or behaved unexpectedly. Current software preserves compatibility with historical numbering while supporting newer fields.

This is another reason to date implementation behavior. A simplified parser can disagree with `ord` on envelope boundaries, field interpretation, duplicate tags, unrecognized even or odd tags, pointer assignment, parent validity, or unbound inscriptions.

Bitcoin nodes do not resolve those disagreements because the surrounding transaction may be valid either way.

### Wallet, indexer, and transfer compatibility

An inscription moves when a transaction spends its UTXO and places the assigned sat in the intended output under Ord rules. A wallet therefore needs sat control and accurate fees; unsupported coin selection can send the sat to change or fees.

Any valid Bitcoin address can receive the output, but the recipient wallet may not detect or protect the inscription. Parties should verify the full ID, destination, finalized transaction, confirmations, and compatible indexer.

A custodian may control the UTXO while showing an internal account entry. Explorer ownership labels do not prove legal title, and transferring the sat does not automatically transfer copyright, trademark, contractual, or access rights.

### Inclusion does not guarantee every surrounding claim

A confirmed reveal can establish that bytes appeared in a valid transaction in the accepted Bitcoin chain. It does not ensure that every node retains them, every indexer recognizes them, every explorer serves them, or every browser renders them.

It also does not prove authorship, publication rights, legal ownership, uniqueness, discoverability, redeemability, interoperability, scarcity, liquidity, or value. A transaction reference, signature, or parent relationship supports only the specific technical fact it establishes; legal and commercial rights require separate evidence.

### Why not every inscription is an NFT

Some collectible inscriptions are commonly called NFTs, but the label is not a technical definition for all inscription content. An inscription can be text, software, a protocol message, metadata, a parent link, a duplicate file, a BRC-20 operation, or arbitrary bytes.

The Bitcoin transaction does not create a standardized legal ownership contract for the content. A precise description identifies the Ord-recognized envelope, its fields and body, the assigned sat, and the UTXO controlling that sat.

### The working model

An inscription begins with a Taproot commitment and is revealed in a script-path witness. Bitcoin nodes validate that transaction and script. Ord-compatible software scans the witness for an envelope, parses fields and body content, assigns an ID and number, and attaches the result to a sat under ordinal theory.

Indexers maintain that derived state across transfers and reorganizations. Wallets must control UTXOs and sat positions. Explorers retrieve and render untrusted content under their own security and moderation policies. Pruned nodes can validate history without retaining every old block byte.

The content can be included in Bitcoin history without becoming a native Bitcoin object, a guaranteed permanent website, a legal ownership record, or a universally supported NFT. That boundary is not a weakness in the explanation. It is the accurate description of where Bitcoin consensus ends and Ord-compatible application behavior begins.

## 3. Key Terms

- **Inscription:** Content identified by Ord-compatible software in a defined Taproot script-path witness envelope.
- **Envelope:** The `OP_FALSE OP_IF ... OP_ENDIF` data structure containing the Ord marker, fields, and optional body.
- **Commit transaction:** A transaction creating the Taproot output that commits to the planned reveal script.
- **Reveal transaction:** The transaction spending the commit output and exposing the inscription tapscript in its witness.
- **Content type:** A MIME-type field that tells applications how the body is intended to be interpreted.
- **Body:** The concatenated data pushes after the envelope's empty delimiter.
- **Inscription ID:** A transaction-specific identifier using the reveal transaction ID and envelope index.
- **Inscription number:** A sequential indexer-assigned label with historical compatibility rules.
- **Parent:** An Ord-recognized relationship established through a correctly constructed child inscription transaction.
- **Rendering:** Application behavior that retrieves and displays inscription content.
- **Tapscript:** The script language validated for Taproot script-path spends under BIP 342.
- **Standardness:** Node implementation policy for ordinary mempool acceptance and relay, distinct from consensus.
- **Pruned node:** A fully validating node that deletes older block files after validation to reduce storage.
- **Sat control:** Transaction construction that places the inscription's assigned sat into the intended output.

## 4. Sources

1. **Ordinal Theory Handbook: Inscriptions** | Ord project contributors
   - URL: https://docs.ordinals.com/inscriptions.html
   - Supports: Envelope structure, fields, body delimiter, content model, IDs, numbering, sandboxing, assignment, and historical cursed and vindicated behavior.
2. **Ordinal Theory Handbook: Provenance** | Ord project contributors
   - URL: https://docs.ordinals.com/inscriptions/provenance.html
   - Supports: Parent-child construction and the requirement to involve the parent inscription in the child transaction.
3. **Ordinal Theory Handbook: Rendering** | Ord project contributors
   - URL: https://docs.ordinals.com/inscriptions/rendering.html
   - Supports: Current Ord explorer rendering recommendations, aspect ratio, size, media handling, and application-specific display behavior.
4. **Ordinal Theory Handbook: Security** | Ord project contributors
   - URL: https://docs.ordinals.com/security.html
   - Supports: The project's warning that inscription content is user-generated and may be unlawful or dangerous.
5. **Ordinal Theory Handbook: Moderation** | Ord project contributors
   - URL: https://docs.ordinals.com/guides/moderation.html
   - Supports: Instance-level content moderation and the distinction between refusing to serve a preview and changing Bitcoin history.
6. **Ordinal Theory Handbook: Collecting** | Ord project contributors
   - URL: https://docs.ordinals.com/guides/collecting.html
   - Supports: Sat-control, unsupported-wallet, UTXO-selection, transfer, and fee-spending risks.
7. **Ord Repository** | Ord project contributors
   - URL: https://github.com/ordinals/ord
   - Supports: Current maintained envelope parser, indexing, assignment, wallet, transfer, content-serving, and reorganization implementation.
8. **Ord Releases** | Ord project contributors
   - URL: https://github.com/ordinals/ord/releases
   - Supports: Current implementation versioning and maturity; latest release reviewed was 0.27.1 as of 2026-07-22.
9. **Bitcoin Improvement Proposal 141: Segregated Witness** | Eric Lombrozo, Johnson Lau, and Pieter Wuille
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki
   - Supports: Witness serialization, transaction identifiers, block commitments, and transaction-weight rules.
10. **Bitcoin Improvement Proposal 341: Taproot** | Pieter Wuille, Jonas Nick, and Anthony Towns
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki
    - Supports: Taproot output and script-path commitment rules used by commit and reveal transactions.
11. **Bitcoin Improvement Proposal 342: Validation of Taproot Scripts** | Pieter Wuille, Jonas Nick, and Anthony Towns
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0342.mediawiki
    - Supports: Tapscript validation and the Bitcoin consensus context for the reveal script.
12. **Bitcoin Core v31.1 Source Tree** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/tree/v31.1/src
    - Supports: One current implementation's transaction, script, witness, mempool, relay, wallet, block-storage, transaction-index, and pruning behavior; this is not an Ord specification.
13. **Bitcoin Core v31.1 Node Configuration Source** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/v31.1/src/init.cpp
    - Supports: Current pruning, transaction-index, data-carrier, relay, and fee-policy configuration as implementation behavior separate from consensus.
14. **Bitcoin Core v31.1 Release Notes** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/master/doc/release-notes/release-notes-31.1.md
    - Supports: Bitcoin Core 31.1 as the current implementation release used to date current policy and node-behavior references.

## 5. SEO title

What Is a Bitcoin Inscription? | Mempool Surf Club

## 6. Meta description

Learn how Bitcoin inscriptions use Taproot witness envelopes, commit and reveal transactions, indexers, and UTXO control.

## 7. Page excerpt

Understand inscription envelopes, content fields, commit and reveal transactions, identifiers, rendering, fees, pruning, security, and transfer boundaries.

## 8. Estimated reading time

15 to 18 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-039 | What Is BRC-20 on Bitcoin?
- Next: MSC-GUIDE-041 | Bitcoin Developer Tools: A Practical Overview
- Prerequisite: MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- Prerequisite: MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
- Prerequisite: MSC-GUIDE-014 | How Bitcoin Confirmations Work
- Branch: MSC-GUIDE-037 | What Are Bitcoin Ordinals?
- Branch: MSC-GUIDE-044 | How Bitcoin Indexers Work
- Branch: MSC-GUIDE-055 | How Taproot Changed Bitcoin
- Branch: MSC-GUIDE-056 | How SegWit Changed Bitcoin
- Return: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] Registry metadata matches the approved registry.
- [x] Bitcoin consensus validation is separated from Ord envelope, identifier, numbering, assignment, and rendering interpretation.
- [x] SegWit and Taproot consensus rules are separated from current Ord and Bitcoin Core implementation behavior.
- [x] Historical cursed and vindicated numbering is separated from current envelope support.
- [x] Inscriptions, ordinal theory, Runes, BRC-20 balances, smart contracts, and NFTs are distinguished.
- [x] Consensus, standardness, mempool relay, miner selection, pruning, indexing, and rendering are not collapsed.
- [x] No price, investment, market, popularity, adoption, liquidity, or value claims are included.
- [x] No permanence, ownership, scarcity, authenticity, compatibility, custody, rendering, hosting, discoverability, or availability guarantee is made.
- [x] No proposal, experiment, or implementation-specific field is presented as universally deployed.
- [x] Sources are mapped only to the claims they support.
- [x] Planned internal links remain inactive and do not imply publication.

## 11. Human verification

- Reviewer:
- Review date:
- Notes: Pending. Verify the exact current envelope parser, field tags, body handling, inscription ID and numbering rules, jubilee height, parent validation, malformed and duplicate-envelope treatment, and assignment behavior against `ord` 0.27.1 code and tests; confirm Bitcoin Core v31.1 pruning, txindex, standardness, and relay boundaries; and security-review every rendering statement for untrusted HTML, SVG, script, media, recursion, and MIME handling.

## 12. Illustration brief

### Illustration 1

- Concept title: Commit and Reveal Cutaway
- Educational purpose: Show how the commit output hides a script commitment and the reveal witness exposes the inscription envelope.
- Recommended placement: After the section Commit and reveal transactions.
- Visual description: Vintage technical ship cutaway with a sealed Taproot commit compartment in the first transaction and an opened script-path witness compartment in the second.
- Required labels: Commit transaction, Taproot output, Script commitment, Reveal transaction, Witness, Tapscript, Ord envelope, Inscribed sat
- Caption: The commit transaction locks to a Taproot script, and the reveal spends it while exposing the inscription envelope in witness data.
- Alt text: Two-transaction technical cutaway showing a Taproot commit output and a reveal witness containing an Ord inscription envelope.
- Image orientation: Landscape
- Mobile crop notes: Stack commit above reveal with one connecting spend arrow.
- Status: PLANNED

### Illustration 2

- Concept title: Inscription Envelope Field Chart
- Educational purpose: Explain the Ord marker, tag-value fields, empty body delimiter, and content body without implying Bitcoin executes the content.
- Recommended placement: After the section Content type and body.
- Visual description: Nautical signal-code diagram of `OP_FALSE OP_IF`, the `ord` marker, field pairs, the empty delimiter, body pushes, and `OP_ENDIF`, with a separate Bitcoin validation boundary.
- Required labels: OP_FALSE, OP_IF, ord, Field tag, Field value, Empty delimiter, Body, OP_ENDIF, Non-executed branch
- Caption: Ord-compatible software parses tagged data inside a non-executed Tapscript branch.
- Alt text: Technical envelope diagram showing the Ord marker, fields, body delimiter, body data, and non-executed conditional branch.
- Image orientation: Landscape
- Mobile crop notes: Present the script elements as a vertical signal sequence.
- Status: PLANNED

### Illustration 3

- Concept title: On-Chain Data Access Lighthouse
- Educational purpose: Separate block inclusion from indexing, archival storage, rendering, moderation, and user access.
- Recommended placement: After the section Pruned nodes and indexed access.
- Visual description: Cartographic lighthouse map with Bitcoin block history at sea, an archival node, a pruned node, an Ord indexer, an explorer renderer, and several client devices receiving different levels of access.
- Required labels: Bitcoin block data, Archival node, Pruned node, Ord index, Explorer, Renderer, Moderation, Unsupported format, User access
- Caption: Inclusion in Bitcoin history does not require every node or application to retain, index, render, or serve inscription content.
- Alt text: Nautical systems map showing inscription data moving from Bitcoin blocks through archival or pruned nodes, an indexer, and application renderers.
- Image orientation: Landscape
- Mobile crop notes: Use a top-to-bottom path from block history through storage, index, renderer, and user access.
- Status: PLANNED
