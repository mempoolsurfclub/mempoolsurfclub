---
registry_id: MSC-GUIDE-037
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: What Are Bitcoin Ordinals?
handle: bitcoin-ordinals
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

# What Are Bitcoin Ordinals?

## 1. Introductory deck

Ordinals are an application-level convention that assigns numbers to satoshis and interprets how those numbered sats move through Bitcoin transactions. Learn how ordinal theory, indexers, transaction ordering, inscriptions, rarity labels, wallet coin control, reorganizations, and custody boundaries fit together without treating ordinal identities as Bitcoin consensus state.

## 2. Full article

Bitcoin's consensus rules recognize satoshis as units of value inside transaction outputs. They do not assign each satoshi a permanent serial number. Ordinal theory adds that identity layer outside Bitcoin consensus by defining a numbering scheme for sats and a method for following those numbered sats as outputs are spent and new outputs are created.

That distinction is the foundation of Ordinals. A Bitcoin node can validate the same transaction whether or not the operator runs Ord software. An Ord indexer can then read the validated blockchain and apply ordinal theory to it. The indexer produces an additional interpretation: which ordinal numbers are currently located in which unspent transaction outputs, or UTXOs.

Ordinals are therefore not a new Bitcoin consensus feature, a separate chain, or a native token ledger. They are an application-level convention built from public Bitcoin transaction history.

### Satoshis under consensus and ordinal identities

A satoshi is one hundred-millionth of a bitcoin. Bitcoin consensus tracks amounts assigned to UTXOs and checks whether later transactions spend those outputs according to the applicable scripts and monetary rules. Consensus does not require nodes to remember which particular sat from one input became which sat in one output.

Ordinal theory makes that additional distinction. It assigns ordinal number zero to the first sat produced under the theory's ordering model, then continues numbering later sats according to the order in which they are mined. The ordinal number is not written into the sat, attached by a Bitcoin opcode, or recorded in Bitcoin Core's UTXO set. It is calculated by compatible software from chain history.

Two observers using the same ordinal rules and the same accepted Bitcoin chain should calculate the same locations. An observer that does not apply those rules sees only ordinary Bitcoin transactions and amounts. An observer using different indexer rules, software versions, or chain tips may produce a different application-level view.

This is why an ordinal number should not be described as a property enforced by every Bitcoin node. It is an identity assigned by ordinal theory.

### The numbering model begins with mining order

Ordinal theory numbers sats in the order in which they enter circulation through coinbase transactions. Each ordinal number can also be represented in several notations, such as an integer, a block-height-and-offset pair, or a name generated from the number.

Those representations do not create separate assets. They are alternate labels for the same interpreted sat position. A sat remains spendable as part of a Bitcoin UTXO under ordinary Bitcoin rules.

The numbering model also has to account for transaction fees. Inputs can contain more value than ordinary outputs. The difference is the transaction fee, which becomes available to the miner through the block's coinbase transaction under Bitcoin's rules. Ordinal theory places sats that flow to fees into an interpreted ordering and assigns them through the coinbase output according to its transfer algorithm.

The exact ordinal location therefore depends on a complete ordered history, not merely the current value of a UTXO. An indexer must process blocks and transactions in order to reconstruct the application state.

### First-in-first-out transfer tracking

Bitcoin transactions consume whole UTXOs and create new outputs. They do not select individual sats by serial number. Ordinal theory bridges that gap with a first-in-first-out, or FIFO, interpretation.

Imagine concatenating the sats from all transaction inputs in input order. Then imagine filling the transaction's outputs, also in output order, from the beginning of that input sequence. The first sat from the first input is assigned to the first available position in the first output. Assignment continues until that output's value is filled, then continues into the next output.

Any remaining input value that is not assigned to an ordinary output is interpreted as the fee. Under ordinal theory, those sats later enter the block's coinbase ordering.

Input and output order therefore matter. Reordering identical-value inputs can change which ordinal numbers the indexer assigns to each output. Reordering outputs can move a tracked sat to a different recipient or into change. Changing a fee can shift the boundary between sats assigned to outputs and sats assigned to the fee.

Bitcoin consensus validates amounts, signatures, scripts, and spending authority. It does not validate that a wallet's chosen ordering preserves the ordinal identity a user intended to transfer.

### Ord software supplies the index

The maintained `ord` project includes an indexer, wallet commands, and an explorer. Its indexer connects to a Bitcoin node, reads the accepted chain, and derives ordinal locations and related application data.

That index is separate from Bitcoin Core's chainstate. Bitcoin Core supplies block and transaction data and validates Bitcoin rules. `ord` applies its own model on top. Other software can implement compatible behavior, but compatibility must be tested rather than assumed.

An Ord-aware service generally needs enough historical data to build or restore its index. Software releases can also change database schemas or application behavior. The Ord documentation notes that reindexing may be required after certain major releases or database corruption. A reindex reconstructs the application database from available Bitcoin history; it does not change Bitcoin consensus state.

Users who depend on an explorer or hosted API depend on that service's chain tip, index version, configuration, uptime, and interpretation. Running a Bitcoin node alone does not provide ordinal balances or identities.

### Reorganizations change the accepted history

A Bitcoin reorganization occurs when a node switches to a different valid chain with more accumulated proof of work. Transactions in disconnected blocks may return to a mempool, disappear, or later confirm in a different order. New blocks may contain different transactions.

Because ordinal state is derived from ordered chain history, an indexer must roll back interpretations from disconnected blocks and apply the replacement branch. An ordinal location, inscription number, transfer history, or displayed owner can change while confirmations are unsettled.

A transaction can also be replaced before confirmation under applicable wallet and mempool conditions. An indexer that displays unconfirmed ordinal movement is presenting a provisional interpretation, not final Bitcoin settlement.

More confirmations reduce ordinary reorganization risk but do not create a separate ordinal guarantee. The index remains dependent on the accepted Bitcoin chain and the indexer's correct handling of it.

### Rarity is an ordinal-theory convention

Ordinal theory groups certain sats into rarity categories based on positions associated with recurring Bitcoin events. The handbook uses terms such as common, uncommon, rare, epic, legendary, and mythic.

For example, the first sat of a block is categorized differently from most sats under that convention. Other categories refer to the first sat around difficulty-adjustment periods, subsidy eras, or larger cycle boundaries.

These labels are not Bitcoin consensus classes. Bitcoin nodes do not enforce a different script, fee rule, or monetary value for a sat because an indexer calls it rare. The label does not prove demand, legal scarcity, authenticity, collectibility, or market value. It is a classification inside ordinal theory.

A user can track an ordinal without attaching content to it. Rare-sat collecting is one example: the sat's interpreted number or category may be the point of interest even when no inscription exists.

### Ordinals and inscriptions are related but different

Ordinal theory is the numbering and transfer-tracking model. An inscription is data discovered by Ord-compatible software in a particular Bitcoin transaction witness structure. The two concepts are connected because the Ord protocol assigns an inscription to an interpreted sat and then follows that sat through later transactions.

They are not synonyms.

An ordinal can exist without an inscription. Under the theory, every sat has an ordinal number whether or not anyone has attached content. An inscription can use ordinal tracking for assignment and transfer, but the inscription envelope, content fields, identifier, and rendering rules are separate application mechanics.

Guide 040 explains the commit-and-reveal transaction structure, witness envelope, content fields, identifiers, rendering, and malformed-envelope behavior in detail. For this guide, the important point is that an inscription does not create ordinal theory, and ordinal theory is broader than inscriptions.

A Rune or BRC-20 operation is different again. Runes use runestone messages interpreted by Rune-aware software. BRC-20 uses JSON inscriptions and indexer rules to derive fungible balances. Neither balance system becomes part of Bitcoin Core's native ledger merely because its data appears in Bitcoin transactions.

### Coin control is part of safe handling

A standard Bitcoin wallet usually selects UTXOs to satisfy an amount and fee target. Unless it is Ord-aware, it may not know that a particular UTXO contains an inscription, a sat assigned a sought-after ordinal number, or a sat reserved for another application.

Spending that UTXO can move the tracked sat into an unintended output. Depending on input order, output values, output order, and fee size, the sat may go to the recipient, return as change, or be assigned to the fee under ordinal theory.

This is a wallet construction risk, not a Bitcoin validation failure. The transaction can be fully valid and confirmed while producing an unintended Ord interpretation.

Ord-aware wallets use sat control, sat selection, postage conventions, and explicit output construction to reduce this risk. The Ord handbook warns that unsupported wallets may receive an ordinal safely as long as the containing UTXO remains unspent, but later ordinary spending can accidentally move it.

Users should separate ordinary spending funds from UTXOs that require application-aware handling. They should also verify the exact transaction before signing, including every input, every output, values, ordering, change, and fee.

### Fees affect more than cost

Bitcoin transaction fees pay for block space and are determined by transaction weight and fee rate, not by an ordinal's claimed importance. Ordinal-aware transfers may need additional inputs or outputs to isolate a target sat and preserve an intended destination, increasing transaction size.

A poorly constructed fee can also consume the tracked sat under ordinal theory. Wallet software must place enough value around the sat to create valid outputs while avoiding dust or policy problems under the current Bitcoin implementation and network conditions.

Relay policy, wallet policy, and miner selection are not identical to consensus. A transaction may be consensus-valid yet fail a node's current mempool or relay policy. Conversely, confirmation proves that the Bitcoin transaction satisfied the validating nodes' consensus rules; it does not prove that every ordinal wallet or indexer interprets the application state identically.

Fee estimation is uncertain. A low-fee transaction may remain unconfirmed or be replaced. A high fee does not certify provenance or transfer intent.

### Custody follows Bitcoin keys and UTXO control

Control of an ordinal-bearing UTXO ultimately depends on control of the Bitcoin keys or spending conditions for that output. A self-custodial user can sign the UTXO's Bitcoin spend. A custodian or marketplace may instead control the keys and maintain an internal account or promise to process withdrawals.

Ordinal software adds interpretation, but it does not override Bitcoin spending authority. An explorer's owner label does not create key control. A marketplace account does not by itself prove that a specific UTXO is segregated for the user.

Transfers also depend on recipient compatibility. Sending a tracked sat to a valid Bitcoin address can be valid at the Bitcoin layer even when the recipient wallet cannot display or safely re-spend it. The recipient may later spend the containing UTXO through ordinary coin selection.

Before transfer, parties need to agree on the intended asset, destination, indexer rules, confirmation threshold, and handling software. They should not infer legal ownership or contractual rights from an address or ordinal label alone.

### Provenance depends on interpretable history

Ordinal provenance usually means reconstructing a chain of inscriptions, parent relationships, prior transfers, or creator associations from Bitcoin data and Ord conventions. The chain can provide verifiable transaction references, but the meaning assigned to those references remains application-level.

A signature can prove control of a key for a defined message. A transaction can prove that an output was spent. An inscription parent field can establish a relationship recognized by compatible Ord software when its construction rules are satisfied. None of those facts alone proves authorship, trademark rights, copyright ownership, authenticity of an off-chain person, or permission to reuse content.

Indexer compatibility matters. Historical inscription numbering rules, software bugs, cursed or vindicated inscription treatment, parent validation, and later protocol fields can affect what an application displays. Services should document their version and rebuild process, especially after protocol changes.

A name, ordinal number, inscription number, image, or collection label can be copied into another inscription or interface. Users must verify identifiers and transaction history rather than relying on appearance.

### Permanence and accessibility are separate claims

Bitcoin block inclusion can make transaction and witness data part of the accepted blockchain history. That is a meaningful data-availability property, but it is not the same as universal access or permanent rendering.

A pruned Bitcoin node may validate old blocks and later delete their block files. An ordinary wallet may not index witness content. An explorer may filter, moderate, fail to support a media type, change rendering rules, or go offline. Browser support can change. Recursive or delegated content can introduce additional dependencies on other inscriptions and application behavior.

Reorganizations can remove recent data from the accepted chain. Future software may parse a field differently or cease serving a format. Users also need an index or transaction retrieval path to find the relevant bytes.

Accordingly, it is more precise to say that confirmed inscription data can be included in Bitcoin's chain history under ordinary Bitcoin rules. Universal hosting, discoverability, interpretation, rendering, legality, and uninterrupted availability are not guaranteed.

### Why Ordinals are not automatically NFTs

“NFT” is a broad ecosystem label associated with many different contract, registry, custody, and rights models. Ordinal theory does not create a smart-contract token for every sat. It assigns application-level numbers and follows sats through Bitcoin transactions.

Some inscriptions are used as unique digital collectibles and may be described by their communities as NFTs. Others are text, software, documents, media, protocol messages, parent records, or arbitrary data. A rare sat can be tracked without any inscription. A BRC-20 inscription may represent a fungible indexer operation rather than a unique collectible.

The label can obscure more than it explains. A careful description should identify the actual mechanism: a numbered sat under ordinal theory, an inscription envelope interpreted by Ord software, a Rune balance derived from a runestone, or a BRC-20 balance derived by an indexer.

None of those labels proves ownership rights, authenticity, scarcity, redeemability, interoperability, liquidity, or value.

### The working model

Ordinals add an application index to Bitcoin history. The index numbers sats by mining order and tracks them through transactions using input and output ordering. Bitcoin nodes validate the underlying blocks and spends. Ord-compatible software derives the ordinal identities, locations, rarity categories, and related application data.

That model creates useful precision. A confirmed Bitcoin transaction can be valid even when a wallet accidentally moved a tracked sat. Two services can agree on Bitcoin consensus while disagreeing because of index versions or application rules. An ordinal can exist without an inscription, and an inscription can carry data without becoming a native Bitcoin token.

The practical responsibilities are therefore divided. Bitcoin supplies ordered, validated transaction history. Indexers supply ordinal interpretation. Wallets must construct transactions that preserve the intended interpretation. Users must verify custody, identifiers, compatibility, provenance claims, and access assumptions without treating any of them as guarantees.

## 3. Key Terms

- **Satoshi:** One hundred-millionth of a bitcoin and the smallest unit represented in ordinary Bitcoin amounts.
- **Ordinal theory:** An application-level numbering and transfer-tracking convention for satoshis.
- **Ordinal number:** The number assigned to a sat under ordinal theory, not a serial number enforced by Bitcoin consensus.
- **Ord indexer:** Software that reads Bitcoin history and derives ordinal locations and related application state.
- **UTXO:** An unspent Bitcoin transaction output that can contain one or more sats.
- **Sat control:** Wallet construction that deliberately places a tracked sat into a chosen output.
- **FIFO:** The first-in-first-out interpretation used by ordinal theory to map ordered input sats into ordered outputs.
- **Rarity:** An ordinal-theory classification based on a sat's interpreted position in recurring Bitcoin events.
- **Inscription:** Data identified by Ord-compatible software in a defined Bitcoin witness envelope and assigned through Ord rules.
- **Coin control:** Explicit selection and handling of UTXOs rather than automatic wallet selection.
- **Reorganization:** A switch to a different accepted Bitcoin chain that requires derived index state to be rolled back and reapplied.
- **Provenance:** Interpreted transaction and relationship history used to support an origin or lineage claim.
- **Bitcoin consensus:** The rules nodes apply to validate Bitcoin blocks, transactions, scripts, proof of work, and UTXO spends.

## 4. Sources

1. **Ordinal Theory Handbook: Introduction** | Ord project contributors
   - URL: https://docs.ordinals.com/
   - Supports: The maintained project's definition of ordinal theory as an identity and tracking convention for satoshis and its relationship to inscriptions.
2. **Ordinal Theory Handbook: Overview** | Ord project contributors
   - URL: https://docs.ordinals.com/overview.html
   - Supports: Numbering by mining order, FIFO transfer tracking, notation systems, rarity terminology, and the components of the Ord project.
3. **Ordinal Theory Handbook: FAQ** | Ord project contributors
   - URL: https://docs.ordinals.com/faq.html
   - Supports: The input-to-output FIFO algorithm and practical explanation of how sats are assigned through transactions.
4. **Ordinals BIP Draft** | Ord project contributors
   - URL: https://github.com/ordinals/ord/blob/master/bip.mediawiki
   - Supports: The formal ordinal numbering and transfer model, including transaction fees and coinbase assignment.
5. **Ord Repository** | Ord project contributors
   - URL: https://github.com/ordinals/ord
   - Supports: Current maintained reference software for indexing ordinal state, wallet operations, inscriptions, and Rune interpretation.
6. **Ord Releases** | Ord project contributors
   - URL: https://github.com/ordinals/ord/releases
   - Supports: Current software release history and the need to date implementation-specific behavior; latest release reviewed was 0.27.1 as of 2026-07-22.
7. **Ordinal Theory Handbook: Collecting** | Ord project contributors
   - URL: https://docs.ordinals.com/guides/collecting.html
   - Supports: Sat-control requirements, unsupported-wallet risks, accidental transfers, and spending an ordinal-bearing UTXO to fees.
8. **Ordinal Theory Handbook: Wallet** | Ord project contributors
   - URL: https://docs.ordinals.com/guides/wallet.html
   - Supports: The separation between Bitcoin Core node and wallet functions and Ord-aware inscription and sat-control operations.
9. **Ordinal Theory Handbook: Reindexing** | Ord project contributors
   - URL: https://docs.ordinals.com/guides/reindexing.html
   - Supports: Ord index database reconstruction after schema-changing releases or corruption.
10. **Ordinal Theory Handbook: Inscriptions** | Ord project contributors
    - URL: https://docs.ordinals.com/inscriptions.html
    - Supports: The distinction between ordinal tracking and inscription data, inscription assignment, and historical numbering behavior.
11. **Bitcoin Improvement Proposal 141: Segregated Witness** | Eric Lombrozo, Johnson Lau, and Pieter Wuille
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki
    - Supports: Bitcoin witness structure, transaction weight, and the consensus context used by inscription transactions.
12. **Bitcoin Core v31.0 Source Tree** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/tree/v31.0/src
    - Supports: One current implementation's validation, UTXO, transaction, mempool, relay, wallet, and pruning behavior; this is implementation evidence, not a definition of all Bitcoin protocol behavior.
13. **Bitcoin Core v31.0 Release Notes** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/master/doc/release-notes/release-notes-31.0.md
    - Supports: The Bitcoin Core implementation version used to date current implementation and policy references in this guide.

## 5. SEO title

What Are Bitcoin Ordinals? | Mempool Surf Club

## 6. Meta description

Learn how ordinal theory numbers and tracks sats, why indexers and coin control matter, and where Bitcoin consensus ends.

## 7. Page excerpt

Understand Ordinals as an application-level sat numbering system, including FIFO tracking, indexers, rarity labels, inscriptions, reorganizations, custody, and wallet risks.

## 8. Estimated reading time

16 to 19 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-036 | Bitcoin Sidechains Explained
- Next: MSC-GUIDE-038 | How the Runes Protocol Works
- Prerequisite: MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
- Prerequisite: MSC-GUIDE-014 | How Bitcoin Confirmations Work
- Branch: MSC-GUIDE-040 | What Is a Bitcoin Inscription?
- Branch: MSC-GUIDE-044 | How Bitcoin Indexers Work
- Return: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] Registry metadata matches the approved registry.
- [x] Bitcoin consensus validation is separated from Ord indexer interpretation.
- [x] Ordinal-theory rules are separated from Ord software, wallet, explorer, and database behavior.
- [x] Historical numbering behavior is separated from current maintained implementation behavior.
- [x] Ordinals, ordinal numbers, inscriptions, Runes, and BRC-20 balances are not collapsed into one concept.
- [x] No price, investment, market, adoption, or value claims are included.
- [x] No permanence, ownership, scarcity, authenticity, interoperability, custody, or availability guarantee is made.
- [x] No proposed, experimental, or implementation-specific behavior is presented as universally deployed.
- [x] Sources are mapped only to the claims they support.
- [x] Planned internal links remain inactive and do not imply publication.

## 11. Human verification

- Reviewer:
- Review date:
- Notes: Pending. Verify the FIFO fee and coinbase assignment explanation against the current Ord code and BIP draft; confirm current rarity terminology, reorganization handling, reindex requirements, sat-control guidance, and historical inscription-numbering references; and confirm that every permanence, custody, provenance, and indexer-compatibility boundary remains implementation-neutral.

## 12. Illustration brief

### Illustration 1

- Concept title: The Two-Layer Sat Navigation Chart
- Educational purpose: Separate ordinary Bitcoin UTXO validation from the ordinal numbers derived by an external indexer.
- Recommended placement: After the section Satoshis under consensus and ordinal identities.
- Visual description: Vintage nautical chart with a lower layer of Bitcoin transaction outputs and an upper transparent tracing layer that assigns numbered routes to individual sats.
- Required labels: Bitcoin consensus, UTXO amounts, Ord indexer, Ordinal number, Derived location, Not consensus state
- Caption: Bitcoin validates amounts and spends; Ord-compatible software derives individual sat identities from the same history.
- Alt text: Two-layer technical chart showing Bitcoin UTXOs below and an Ord indexer tracing numbered satoshis above.
- Image orientation: Landscape
- Mobile crop notes: Stack the Bitcoin layer, indexer lens, and derived ordinal layer vertically.
- Status: PLANNED

### Illustration 2

- Concept title: FIFO Transaction Harbor
- Educational purpose: Show how ordered inputs fill ordered outputs and how a tracked sat can move into change or fees.
- Recommended placement: After the section First-in-first-out transfer tracking.
- Visual description: Cartographic harbor diagram with three input channels feeding numbered sat markers into two output docks and a fee channel, all in explicit order.
- Required labels: Input 0, Input 1, Output 0, Output 1, Change, Fee, Tracked sat, FIFO order
- Caption: Ordinal theory maps ordered input sats into ordered output positions, with unassigned value interpreted as fees.
- Alt text: Nautical flow diagram showing ordered Bitcoin inputs filling ordered outputs and a fee path under the FIFO ordinal model.
- Image orientation: Landscape
- Mobile crop notes: Use one vertical flow from inputs through an ordering gate into recipient, change, and fee destinations.
- Status: PLANNED

### Illustration 3

- Concept title: Coin-Control Hazard Map
- Educational purpose: Explain why an ordinary wallet can create a valid Bitcoin transaction that unintentionally moves an inscription or tracked sat.
- Recommended placement: After the section Coin control is part of safe handling.
- Visual description: Vintage systems map comparing an automatic wallet route with an Ord-aware route around marked UTXOs, change outputs, and fee shoals.
- Required labels: Automatic selection, Ord-aware selection, Protected UTXO, Recipient, Change, Fee, Accidental movement
- Caption: Bitcoin validity does not guarantee that wallet construction preserved the user's intended ordinal location.
- Alt text: Technical hazard map comparing automatic coin selection with Ord-aware coin control around protected UTXOs and fee outputs.
- Image orientation: Landscape
- Mobile crop notes: Present the unsafe and controlled routes as two vertically stacked panels.
- Status: PLANNED
