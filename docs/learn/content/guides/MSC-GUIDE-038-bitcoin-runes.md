---
registry_id: MSC-GUIDE-038
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: How the Runes Protocol Works
handle: bitcoin-runes
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

# How the Runes Protocol Works

## 1. Introductory deck

Runes is an indexer-interpreted protocol for etching, minting, assigning, transferring, and burning fungible units through Bitcoin transactions. Learn how runestones, Rune IDs, mint terms, edicts, UTXO-associated balances, cenotaphs, reorganizations, wallet construction, and Bitcoin validation interact without treating Rune balances as native Bitcoin consensus state.

## 2. Full article

Runes is an application protocol implemented by the maintained `ord` project for creating and moving fungible units with messages embedded in Bitcoin transactions. Its messages are called runestones. A Rune-aware indexer reads the accepted Bitcoin chain, decodes those messages, and derives etchings, mints, allocations, balances, and burns.

Bitcoin nodes do not maintain that Rune ledger. They validate the underlying Bitcoin transaction: its inputs, outputs, scripts, amounts, witness data, proof-of-work context, and UTXO spends. A transaction can be valid under Bitcoin consensus while its runestone is malformed, ignored, or interpreted as a cenotaph under the Runes protocol.

The current Ordinal Theory Handbook makes an unusually important maturity statement: the `ord` code is the normative specification. Its prose Runes documentation is a guide to that code, not an independent specification. Current behavior must therefore be dated to a maintained software version and checked against implementation changes. This guide reviewed Ord release 0.27.1 as of 2026-07-22.

### Purpose and current status

Runes provides a compact application convention for fungible units associated with Bitcoin UTXOs. It supports four broad operations: etching a Rune, minting units when an etching permits it, assigning units among transaction outputs, and burning units under defined conditions.

The protocol activated at Bitcoin block 840,000. According to the maintained Ord documentation, runestones in earlier blocks are ignored. This is a Runes activation boundary enforced by Rune-aware software, not a new Bitcoin consensus activation. Bitcoin nodes accepted valid transactions before and after that height without evaluating Rune balances.

Runes does not add a smart-contract virtual machine to Bitcoin. It does not require Bitcoin Core to parse Rune names or prevent an over-mint. It uses ordinary Bitcoin outputs and an `OP_RETURN` data output as inputs to an external state machine.

Because `ord` is the normative implementation, alternative indexers must reproduce its behavior to claim compatibility. A service that changes decoding, activation, flaw handling, or state transitions can disagree even while following the same Bitcoin chain.

### Runestones carry protocol messages

A runestone is encoded in a transaction output whose script begins with `OP_RETURN`, then `OP_13`, followed by zero or more data pushes. Compatible software concatenates the pushed bytes, decodes a sequence of 128-bit integers, and interprets fields and edicts.

A transaction may contain at most one runestone under the current protocol. The runestone can etch a new Rune, request a mint of an existing Rune, and allocate available Rune units from the transaction's inputs and permitted creation operations to its outputs.

The `OP_RETURN` output is provably unspendable under ordinary Bitcoin script behavior. Bitcoin nodes may recognize the transaction as a data-carrier transaction under implementation policy, but they do not know that the payload is a runestone. Relay and mining policy can change independently from consensus validity and independently across implementations.

The marker and integer encoding reduce the amount of application data compared with a human-readable JSON inscription. Compactness does not make the message part of Bitcoin's native monetary ledger. It remains an interpretation performed by Rune-aware software.

### Etching creates a Rune definition

An etching introduces a Rune and its parameters. The transaction containing the valid etching determines the Rune's identifier and can define its name, divisibility, symbol, premine, and open-mint terms.

Etching does not prove that the creator is trustworthy or has legal rights to a name. A successfully parsed name does not certify authenticity, uniqueness outside the Runes namespace, redeemability, or value. It establishes an indexer-recognized definition under the current protocol.

An etching can include a premine. A premine creates a defined number of units as part of the etching operation. Those units must still be allocated through the transaction's edicts or default assignment behavior. “Premine” describes protocol issuance timing; it is not a statement about distribution quality or legitimacy.

The transaction must also satisfy ordinary Bitcoin fees, output construction, and wallet requirements. A valid Bitcoin confirmation does not prove the etching was valid under the current Rune parser.

### Rune identifiers and names are different

Every Rune is identified by a Rune ID consisting of the block height and transaction index of its etching, written as `BLOCK:TX`. The identifier anchors the application object to an ordered location in Bitcoin history.

The Rune ID is usually the precise protocol reference. A displayed name is an application-facing label subject to the protocol's naming, reservation, and unlock rules. Spacers can affect how a name is displayed without changing the underlying encoded Rune value.

If an etching omits the `Rune` field, the current protocol assigns a reserved name derived from the etching's Rune ID. A non-reserved name must be unlocked at the etching block and must have a valid prior commitment. The commitment is a data push of the Rune name encoded as a little-endian integer with trailing zero bytes removed, revealed in an input witness tapscript whose spent output has at least six confirmations. Without that commitment, the etching is ignored. Name lengths unlock on the protocol's 17,500-block schedule, so availability depends on the etching height.

A name therefore should not be treated as an independent proof of identity. Interfaces should verify the Rune ID, the accepted chain, and the same indexer rules used by the counterparty. A look-alike symbol, spaced rendering, or copied name in unrelated content can mislead users.

A reorganization that removes the etching transaction can remove the Rune from the indexer's accepted state. If the transaction confirms later in another block or position, its Rune ID can change because the ID depends on block and transaction index.

### Divisibility and symbols affect display

Divisibility specifies how many decimal places an interface may use when displaying Rune units. The protocol accounts in indivisible base units; divisibility determines presentation.

For example, a divisibility of two allows a base-unit amount of 12,345 to be displayed as 123.45. The decimal point does not create fractional base units. Wallets and APIs must agree on the Rune's divisibility and avoid floating-point assumptions that can alter amounts.

A symbol is an optional display character associated with the Rune. It can help an interface present amounts, but it is not a Bitcoin ticker, ownership mark, or security feature. Software may omit, replace, or fail to render it.

Display fields should never substitute for the Rune ID and exact integer amount. A user-facing decimal string can be rounded or formatted incorrectly even when the underlying indexed state is correct.

### Open mint terms

An etching may define terms that permit later transactions to mint units. Current protocol fields can constrain the amount created by each mint and the number of mints, and can limit minting to a range of block heights or offsets relative to the etching block.

These are application rules enforced by Rune indexers. Bitcoin miners do not reject a transaction because it attempts to mint outside a Rune's terms. Bitcoin nodes do not count successful Rune mints.

A valid mint request references the Rune ID. The indexer checks the etching, the current block, applicable caps and timing, and the current protocol's flaw rules. If the request is valid, the minted units become available for allocation in that transaction.

Mint terms do not guarantee that a user can get a transaction confirmed before a window closes. Mempool acceptance, fee competition, miner selection, transaction replacement, and reorganizations can all affect whether a mint lands at a qualifying height and order.

### Minting is a state transition, not a Bitcoin issuance

Rune minting creates units in the Runes application state. It does not create bitcoin and does not change Bitcoin's block subsidy, UTXO value, or consensus monetary rules.

The Bitcoin transaction pays normal fees in bitcoin and may move ordinary bitcoin alongside the runestone. The Rune-aware indexer derives a separate result from that transaction.

This distinction matters when an interface shows both BTC amounts and Rune amounts. The BTC outputs are consensus amounts. The Rune balances are application allocations associated with those outputs. Spending authority for the output is enforced by Bitcoin script; the meaning and quantity of its Rune balance are derived by indexers.

A mint can be valid under one indexed protocol version and unsupported under another if implementations have diverged. Services need a documented compatibility target rather than assuming that any parser labeled “Runes” is interchangeable.

### Balances are associated with UTXOs

Under Runes, balances are associated with Bitcoin transaction outputs rather than maintained as native address-account balances. A Rune-aware indexer records which unspent outputs hold units of each Rune.

When a transaction spends those outputs, the indexed Rune balances from all inputs become available to that transaction's runestone. The protocol then assigns them among eligible outputs. Bitcoin consensus only sees that the UTXOs were spent; it does not verify the derived Rune amounts.

Wallets often aggregate UTXO state into an address or account display. That is a convenience view. It can hide which specific UTXOs carry which Rune balances and whether selecting one as a fee input will require a valid allocation.

A wallet that is unaware of Runes can spend a Rune-bearing UTXO in a completely valid Bitcoin transaction. Under the Runes protocol, the absence of a valid allocation can cause units to be assigned by default or burned, depending on the transaction structure and current rules.

### Edicts assign units to outputs

Edicts are runestone instructions that allocate amounts of a Rune to transaction outputs. An edict identifies a Rune, an amount, and an output index.

The indexer begins with Rune balances from spent inputs plus any valid premine or mint in the transaction. It then processes the edicts according to the current protocol and assigns units to eligible outputs.

Output indexes are Bitcoin transaction positions. Construction errors can therefore send Rune units to an unintended Bitcoin output even when every signature and amount is valid. Wallets must coordinate ordinary BTC outputs, change, data output placement, and Rune edicts.

Current rules also define special allocation behavior when an edict uses the transaction's output count as its output number. This can distribute units across eligible non-`OP_RETURN` outputs according to the implementation's algorithm. Because this is a detailed implementation rule, software should verify it against the current `ord` code rather than relying on a simplified interface description.

An edict does not give the output more bitcoin. It attaches indexed Rune units to that output in the application state.

### Change handling and the pointer

Not every available Rune unit must be explicitly allocated by an edict. Remaining unallocated units are assigned to a default output.

A runestone may include a pointer specifying the default output index. If no valid pointer is present, current behavior assigns remaining units to the first non-`OP_RETURN` output. This is commonly treated as Rune change.

The default is a protocol convention, not wallet intent. A wallet that reorders outputs, inserts another output first, or miscalculates the pointer can direct Rune change elsewhere. Transaction preview must identify the output indexes after final construction, not before later fee or change adjustments.

There is no Bitcoin-level error if the default output is not what the user expected. Bitcoin validates the output and its spending condition. The Rune indexer applies the pointer and allocation rule.

### Burning conditions

Burning removes Rune units from the spendable application state. Units allocated to an `OP_RETURN` output are burned because that output is unspendable. Other protocol flaws can also burn units.

A burn does not destroy bitcoin unless the Bitcoin transaction itself assigns bitcoin to an unspendable output. Rune units and satoshi values are separate dimensions. An `OP_RETURN` output commonly has zero satoshis while the indexer records Rune units as burned.

Wallet interfaces should distinguish deliberate burns from accidental loss caused by unsupported transaction construction. A confirmed transaction cannot generally be reversed merely because the sender misunderstood the Rune outcome.

An indexer must also reverse burns from disconnected blocks during a reorganization and apply the result from the new accepted branch.

### Cenotaph behavior

A cenotaph is the Runes interpretation of a flawed runestone under the current protocol. Flaws can arise from malformed encoding, invalid fields, bad edicts, or other conditions defined by `ord`.

Under the maintained prose guide, a cenotaph burns the Rune balances of the transaction's inputs. If it contains an etching, the etched Rune's supply is set to zero and it cannot be minted. If it contains a mint, that mint counts against the mint cap but the minted units are burned.

These consequences are application state transitions. Bitcoin nodes do not reject the transaction because the runestone became a cenotaph. They may confirm it as an ordinary valid Bitcoin transaction.

Cenotaph behavior is a high-risk area for compatibility. The exact list of flaws and parser treatment can change or reveal implementation edge cases. Integrators should test vectors against the current `ord` release and should not implement from this summary alone.

### Bitcoin validity and Rune validity

A useful review sequence has two separate questions.

First: Is the transaction valid under Bitcoin consensus? Nodes check that inputs exist and are unspent, signatures and scripts pass, amounts do not exceed inputs, and the containing block satisfies the consensus rules.

Second: What does the current Runes implementation derive from it? The indexer locates the runestone, decodes the payload, identifies fields and edicts, checks etching or mint rules, allocates balances, and applies burn or cenotaph behavior.

The answers can be “valid Bitcoin transaction” and “invalid Rune operation.” Confirmation is evidence for the first answer, not automatically the second.

Bitcoin Core mempool acceptance adds a third layer: implementation policy. A transaction can be consensus-valid but not accepted or relayed by a particular node's current policy. A miner may use different policy and include it. Neither policy result decides the Runes interpretation.

### Indexers and reorganizations

A Rune indexer must process Bitcoin blocks in order and maintain enough undo or reconstruction data to handle reorganizations. When blocks are disconnected, their etchings, mints, transfers, burns, and balances must be removed. Replacement blocks are then applied in their new order.

Unconfirmed state is more fragile. Competing transactions can spend the same UTXO, and fee replacement or package behavior can change what ultimately confirms. A wallet should not treat a displayed unconfirmed Rune receipt as settled merely because an indexer has seen it.

Alternative indexers can diverge because of software versions, parsing bugs, activation handling, integer decoding, flaw classification, or chain-tip differences. The Ord documentation explicitly warns that `ord` is normative for Runes. Compatibility claims should therefore include the exact implementation and version tested.

A user can independently validate Bitcoin with a full node yet still rely on a Rune indexer for application state. Running the indexer reduces reliance on a hosted service but does not eliminate the need to trust that the software matches the intended protocol.

### Wallet compatibility, fees, and UTXO management

A Rune-compatible wallet must know which UTXOs hold Rune balances, construct a valid runestone, preserve intended output indexes, allocate all relevant units, create correct BTC change, and pay an adequate Bitcoin fee.

An ordinary Bitcoin wallet may select a Rune-bearing UTXO without understanding the consequences. It may omit the runestone or move outputs during fee adjustment. The Bitcoin transaction can confirm while Rune units are assigned unexpectedly or burned.

Fees are paid in bitcoin. The runestone adds transaction data and can increase weight, while isolating UTXOs or creating recipient and change outputs can add more weight. Fee rate affects confirmation probability, not Rune legitimacy.

Wallet and hardware-signing displays may not decode runestones. A device can accurately show BTC inputs and outputs while remaining blind to the Rune operation. Users need a trusted pre-signing interpretation and should verify the finalized transaction after any fee bump or output change.

Custodial services add another boundary. An internal Rune balance may be a provider database entry rather than a user-controlled UTXO. Withdrawal availability, indexing, and supported Runes depend on the provider.

### Runes compared with BRC-20

Runes and BRC-20 both derive fungible application state from Bitcoin transactions, but they use different message and balance models.

Runes uses compact runestones in `OP_RETURN` outputs, Rune IDs, edicts, and UTXO-associated balances. BRC-20 began as an experimental JSON inscription convention with deploy, mint, and transfer operations interpreted by indexers. BRC-20 transfers include a separate transfer-inscription workflow.

Neither is a native Bitcoin token ledger. Bitcoin nodes do not enforce the balances of either protocol. A wallet or indexer supporting one does not automatically support the other.

The protocols also have different activation, parsing, issuance, invalid-operation, and transfer rules. A name or ticker displayed in both systems does not connect them. Moving units across them would require an application arrangement outside their base rules.

### The working model

A Rune is an application object defined by a valid etching. A runestone can etch, mint, and allocate Rune units. Rune IDs refer to an etching's block and transaction position. Divisibility and symbols affect display. Terms govern open mints. Edicts assign input, premine, and minted balances to outputs. A pointer or default output receives unallocated change. Burns and cenotaphs remove units under current rules.

Bitcoin provides the ordered transaction history, UTXO spending authority, confirmation, and proof-of-work settlement. `ord` provides the normative Rune interpretation. Wallets construct transactions that must satisfy both ordinary Bitcoin requirements and intended Rune outcomes. Indexers maintain the derived state and reverse it during reorganizations.

Keeping those layers separate avoids the central error: a Rune balance can be anchored to and transferred through valid Bitcoin transactions without being a balance maintained or enforced by Bitcoin Core.

## 3. Key Terms

- **Rune:** A fungible application unit defined by an etching and interpreted under the current Runes implementation.
- **Runestone:** A Runes protocol message encoded in an `OP_RETURN OP_13` transaction output.
- **Etching:** The operation that defines a Rune and its parameters.
- **Rune ID:** The etching's block height and transaction index, written `BLOCK:TX`.
- **Divisibility:** The number of decimal places used to display an integer Rune amount.
- **Premine:** Rune units created in the etching transaction before later open mints.
- **Mint terms:** Optional conditions governing later creation of Rune units.
- **Edict:** An instruction allocating an amount of a Rune to a transaction output.
- **Pointer:** The output index used for remaining unallocated Rune units.
- **Cenotaph:** A flawed runestone whose current application consequences include defined burns and failed issuance behavior.
- **Burn:** Removal of Rune units from spendable indexed state.
- **UTXO-associated balance:** Rune state assigned by an indexer to a specific unspent Bitcoin output.
- **Indexer:** Software that derives Rune operations and balances from ordered Bitcoin history.
- **Bitcoin policy:** Implementation rules for transaction creation, mempool acceptance, relay, or mining that are distinct from consensus.

## 4. Sources

1. **Ordinal Theory Handbook: Runes** | Ord project contributors
   - URL: https://docs.ordinals.com/runes.html
   - Supports: Runestones, `OP_RETURN OP_13` encoding, Rune IDs, etching, minting, edicts, UTXO-associated balances, and high-level transfer behavior.
2. **Ordinal Theory Handbook: Runes Specification Guide** | Ord project contributors
   - URL: https://docs.ordinals.com/runes/specification.html
   - Supports: The statement that `ord` code is normative, activation at block 840,000, reserved-name allocation, the name-unlock schedule, non-reserved-name commitment requirements, integer decoding, fields, terms, pointers, edicts, burns, and cenotaph behavior.
3. **Ord Repository** | Ord project contributors
   - URL: https://github.com/ordinals/ord
   - Supports: The normative maintained implementation of Runes parsing, indexing, state transitions, wallet construction, and reorganization handling.
4. **Ord Releases** | Ord project contributors
   - URL: https://github.com/ordinals/ord/releases
   - Supports: Current implementation versioning and maturity; latest release reviewed was 0.27.1 as of 2026-07-22.
5. **Bitcoin Improvement Proposal 141: Segregated Witness** | Eric Lombrozo, Johnson Lau, and Pieter Wuille
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki
   - Supports: Transaction witness and weight rules relevant to Bitcoin transaction construction and fees.
6. **Bitcoin Improvement Proposal 341: Taproot** | Pieter Wuille, Jonas Nick, and Anthony Towns
   - URL: https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki
   - Supports: Taproot's Bitcoin consensus context and the separation between Bitcoin script validation and application-level protocol interpretation.
7. **Bitcoin Core v31.0 Source Tree** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/tree/v31.0/src
   - Supports: One current implementation's transaction, script, UTXO, mempool, relay, wallet, and block-validation behavior; this is implementation evidence, not a definition of Runes.
8. **Bitcoin Core v31.0 Release Notes** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/master/doc/release-notes/release-notes-31.0.md
   - Supports: The current Bitcoin Core version used to date implementation and policy references.
9. **Bitcoin Core Policy Source: Data Carrier and Relay Options** | Bitcoin Core contributors
   - URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/init.cpp
   - Supports: Current Bitcoin Core data-carrier, relay, mining, fee, and pruning configuration as implementation policy rather than Bitcoin consensus.
10. **Ord Test Vectors and Source Tests** | Ord project contributors
    - URL: https://github.com/ordinals/ord/tree/master/tests
    - Supports: Implementation-specific transaction behavior and the need to validate detailed Runes integrations against current code and tests.

## 5. SEO title

How the Runes Protocol Works | Mempool Surf Club

## 6. Meta description

Learn how runestones, etching, mints, edicts, UTXO balances, burns, cenotaphs, and Rune indexers work.

## 7. Page excerpt

Follow a Rune from etching and mint terms through UTXO-associated balances, output assignments, change, burns, reorganizations, and wallet handling.

## 8. Estimated reading time

17 to 20 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Previous: MSC-GUIDE-037 | What Are Bitcoin Ordinals?
- Next: MSC-GUIDE-039 | What Is BRC-20 on Bitcoin?
- Prerequisite: MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- Prerequisite: MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
- Prerequisite: MSC-GUIDE-014 | How Bitcoin Confirmations Work
- Compare: MSC-GUIDE-039 | What Is BRC-20 on Bitcoin?
- Branch: MSC-GUIDE-044 | How Bitcoin Indexers Work
- Return: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network

## 10. Accuracy review checklist

- [x] Registry metadata matches the approved registry.
- [x] Bitcoin consensus validity is separated from Rune-operation validity and indexed balances.
- [x] Runes protocol behavior is separated from Bitcoin Core policy and wallet implementation behavior.
- [x] The block 840,000 activation boundary and current `ord`-normative status are dated and scoped.
- [x] Historical activation, current deployed behavior, and possible future implementation changes are not collapsed.
- [x] Runes, BRC-20, inscriptions, ordinary bitcoin amounts, and smart contracts are distinguished.
- [x] No price, investment, market, popularity, adoption, liquidity, or value claims are included.
- [x] No permanence, ownership, scarcity, redeemability, compatibility, custody, or availability guarantee is made.
- [x] No proposal, experiment, alternative implementation, or detailed parser behavior is presented as universally deployed.
- [x] Sources are mapped only to the claims they support.
- [x] Planned internal links remain inactive and do not imply publication.

## 11. Human verification

- Reviewer:
- Review date:
- Notes: Pending. Verify activation at block 840,000; reserved-name allocation, the 17,500-block name-unlock schedule, and the six-confirmation non-reserved-name commitment rule; and all runestone field, edict, pointer, default-change, burn, and cenotaph descriptions directly against the current `ord` 0.27.1 code and test vectors. Confirm mint-term behavior and test that the Bitcoin consensus, Bitcoin Core policy, wallet, indexer, and reorganization boundaries remain precise.

## 12. Illustration brief

### Illustration 1

- Concept title: Runestone Message Cross-Section
- Educational purpose: Show where a runestone sits inside an ordinary Bitcoin transaction and where Bitcoin validation stops.
- Recommended placement: After the section Runestones carry protocol messages.
- Visual description: Vintage ship-plan cross-section of a Bitcoin transaction with inputs, spendable outputs, and one marked `OP_RETURN OP_13` data compartment decoded by an external Rune indexer.
- Required labels: Bitcoin transaction, Inputs, Outputs, OP_RETURN, OP_13, Runestone payload, Bitcoin validation, Rune indexer
- Caption: Bitcoin validates the transaction; Rune-aware software separately decodes the runestone payload.
- Alt text: Technical cross-section of a Bitcoin transaction containing an OP_RETURN OP_13 runestone interpreted by an external Rune indexer.
- Image orientation: Landscape
- Mobile crop notes: Stack transaction structure above the indexer-decoding layer.
- Status: PLANNED

### Illustration 2

- Concept title: Etching and Mint Terms Chart
- Educational purpose: Explain Rune identity, display fields, premine, and the conditions under which later mints are accepted.
- Recommended placement: After the section Open mint terms.
- Visual description: Nautical registry chart centered on one etching record, with branches for Rune ID, name, divisibility, symbol, premine, amount, cap, and height window.
- Required labels: Etching, Rune ID, Name, Divisibility, Symbol, Premine, Mint amount, Mint cap, Height range
- Caption: An etching defines the Rune and any terms that current indexers apply to later mint requests.
- Alt text: Vintage registry diagram showing a Rune etching and its identifier, display fields, premine, and open-mint constraints.
- Image orientation: Landscape
- Mobile crop notes: Place the etching at top and stack identity, display, issuance, and timing fields below.
- Status: PLANNED

### Illustration 3

- Concept title: Edict Allocation and Cenotaph Hazard Map
- Educational purpose: Trace input Rune balances through edicts, change, burns, and flawed-runestone outcomes.
- Recommended placement: After the section Cenotaph behavior.
- Visual description: Cartographic flow map with Rune-bearing input UTXOs entering an allocation station, then branching to recipient outputs, pointer change, OP_RETURN burn, and a cenotaph wreck zone.
- Required labels: Input balances, Edict, Recipient output, Pointer, Change output, Burn, Cenotaph, Bitcoin-valid transaction
- Caption: Rune allocations are derived from output instructions, while flaws can burn application balances without invalidating the Bitcoin transaction.
- Alt text: Systems map showing Rune input balances allocated to outputs or burned through OP_RETURN and cenotaph paths.
- Image orientation: Landscape
- Mobile crop notes: Use one vertical flow with safe allocations above and burn outcomes below.
- Status: PLANNED
