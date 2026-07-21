---
registry_id: MSC-GUIDE-036
status: EDITORIAL_REVIEW
page_role: topic-guide
h1: Bitcoin Sidechains Explained
handle: bitcoin-sidechains
category: Building on Bitcoin
subcategory: Layer 2
depth: Deep
format: Comparison
primary_path: Build on Bitcoin
secondary_paths:
  - Understand the Network
author_display: Mempool Surf Club Editorial
reviewed_date: null
copy_locked_date: null
---

# Bitcoin Sidechains Explained

## 1. Introductory deck

A sidechain is a separate blockchain with its own blocks, validation rules, nodes, and consensus or block-production system. A peg can connect its economy to Bitcoin, but Bitcoin nodes do not automatically validate the sidechain or authorize every withdrawal. Compare federated, merged-mined, and proposed drivechain models by separating chain security from peg security.

## 2. Full article

A sidechain is a separate blockchain with its own validation rules, consensus or block-production system, transaction history, and nodes. It can be connected economically to Bitcoin through a peg or bridge, but it is not part of Bitcoin's own validated chainstate.

That definition creates the most important boundary in this guide. A Bitcoin full node validates Bitcoin blocks, Bitcoin transactions, and Bitcoin's UTXO set. It does not automatically validate Liquid blocks, Rootstock contracts, or another sidechain's state. A sidechain full node performs that separate validation under the sidechain's rules.

The connection between the systems is usually economic rather than a single object moving between two ledgers. Bitcoin is locked or controlled under a Bitcoin-side mechanism. A corresponding representation is issued, unlocked, or recognized on the sidechain. Returning to Bitcoin requires the sidechain representation to be removed or locked and a Bitcoin transaction to release funds from the peg.

### Why sidechains are created

Sidechains let developers choose rules and functionality that Bitcoin does not provide in the same form. A sidechain can use different block intervals, transaction formats, privacy features, asset systems, smart-contract execution, fee rules, or governance processes.

This separation can allow experimentation without changing Bitcoin consensus. It also isolates sidechain activity from Bitcoin's block space and chainstate. The cost is that the sidechain introduces another network to operate, another rule set to validate, and another security model to understand.

A sidechain may use bitcoin as its economic unit or recognize a one-to-one denominated representation. That does not make its security identical to Bitcoin. Denomination, backing, consensus, withdrawal control, and operational availability are separate questions.

### Independent blocks and nodes

A sidechain has its own genesis state, blocks, transaction ordering, and active chain or finality rules. Its block producers may be a federation, merged miners, proof-of-stake validators, or another mechanism. Its nodes check the rules chosen by that system.

A public user may be able to run a sidechain full node and verify that sidechain's blocks and supply rules. This is valuable, but it does not necessarily grant the user unilateral authority over bitcoin held by the peg. Self-validation of a sidechain and control of the Bitcoin-side funds can be separate security boundaries.

Running only a Bitcoin node does not validate sidechain state. Running only a sidechain node does not replace independent Bitcoin validation. A user who wants to verify both systems may need both node stacks and a clear understanding of how peg evidence crosses between them.

### Consensus, reorganization, and finality differ by chain

Bitcoin uses proof of work and accumulated chainwork among valid candidates. A sidechain can use different block timing and finality rules.

Faster blocks do not automatically provide stronger finality. A one-minute block signed by a federation and a thirty-second merged-mined block represent different security conditions from a Bitcoin block. A system may limit reorganizations by signer policy, use probabilistic proof-of-work settlement, or define checkpoints and long peg delays.

When comparing finality, ask what event is considered settled, who can reverse it, what evidence nodes verify, and what happens during network partitions or deep reorganizations. Sidechain transaction settlement and peg settlement may require different waiting periods.

### A two-way peg is two coordinated accounting processes

A two-way peg is a mechanism for entering and leaving a sidechain while maintaining a defined relationship between locked bitcoin and the sidechain representation.

A peg-in normally begins with a Bitcoin transaction that locks bitcoin under the peg's control. After the required Bitcoin confirmation period, the sidechain recognizes or creates the corresponding representation for the user.

A peg-out works in reverse. The user creates a sidechain transaction that destroys, locks, or otherwise retires the representation and requests a Bitcoin destination. The peg mechanism then authorizes a Bitcoin transaction spending from the locked pool.

The same UTXO does not travel between chains. The Bitcoin UTXO remains governed by Bitcoin scripts and signatures. The sidechain maintains its own state. The peg coordinates changes across the two systems.

This means withdrawal security depends on who or what can authorize the Bitcoin spend. A federation may hold threshold keys. A hardware-assisted federation may sign only after observing sidechain consensus. A proposed drivechain would give miners a voting role over withdrawal bundles. Each model creates different liveness, censorship, and compromise assumptions.

### Fees, capacity, and functionality are local properties

Sidechains can increase transaction capacity by processing activity outside Bitcoin's blocks. Users pay sidechain fees under the sidechain's rules, while peg-ins and peg-outs also consume Bitcoin block space and fees.

Capacity is not free. Sidechain nodes store and validate sidechain data. Block producers need infrastructure. Bridges need monitoring, signing, liquidity, and recovery procedures. High demand can still raise fees or create congestion under the sidechain's own limits.

Features such as Confidential Transactions, issued assets, or EVM-compatible contracts are sidechain capabilities. They do not alter Bitcoin consensus. On Liquid, Confidential Transactions hide output amounts and asset types, but the transaction graph, input and output counts, and fee remain visible. Counterparties and anyone given the relevant blinding keys can learn protected details. Confidentiality is not complete anonymity.

### Federated sidechain model: Liquid and Elements

Liquid is a deployed federated sidechain built with Elements. It uses a Strong Federation rather than proof of work to produce and sign Liquid blocks. Public users can run Elements-based Liquid nodes and validate Liquid transactions, blocks, and the relationship between issued L-BTC and bitcoin held by the peg.

As documented on July 19, 2026, Liquid had 15 functionary operators and required an 11-of-15 quorum to sign blocks. The same functionary hardware supports two distinct roles. Block signers validate and sign Liquid blocks. Watchmen manage the Bitcoin peg and participate in threshold authorization for Bitcoin transactions.

Those roles should not be collapsed. Validating a Liquid block establishes sidechain state under Liquid's rules. Releasing bitcoin requires a Bitcoin transaction authorized under the federation's peg controls.

#### Liquid block production and finality

Functionaries take turns proposing blocks on an approximately one-minute schedule. A block needs the required signer quorum. The signer hardware tracks prior signed heights and parents to constrain deep reorganizations. Liquid documentation treats two confirmations as final under the functioning federation model.

This is deterministic signer finality, not Bitcoin proof of work. If too many functionaries are unavailable, block production can stop. If a quorum signs invalid sidechain data, correctly functioning public Liquid nodes should reject it under their validation rules, but liveness still depends on enough authorized signers producing acceptable blocks.

#### Liquid peg-ins and peg-outs

A Liquid peg-in sends bitcoin to a federation-controlled address derived for the user's claim. The wallet must retain the associated claim script and later provide the Bitcoin transaction and Merkle proof, although supported wallet software can automate that process. Current Liquid documentation requires 102 Bitcoin confirmations before the L-BTC claim is accepted. The long delay protects the pooled peg from a deep Bitcoin reorganization.

Peg-outs retire L-BTC and ask the watchmen to release bitcoin. The peg currently uses an 11-of-15 Bitcoin multisignature arrangement and Peg-out Authorization Keys, or PAKs. Direct public peg-out access is restricted. Federation members or authorized participants can perform direct peg-outs, while general users usually rely on a member or service. Current documentation estimates the watchman processing phase at 11 to 35 minutes, depending on network conditions; Bitcoin confirmation follows under Bitcoin's own timing. A member, exchange, or swap service can add separate custody, liquidity, fee, and availability assumptions.

One-to-one backing can be audited by a Liquid node, but it does not guarantee immediate redemption. Redemption still depends on authorization rules, functionary availability, transaction construction, Bitcoin fees, and Bitcoin confirmation.

Liquid also includes an emergency recovery design using a timelock and a separate set of three emergency keys after extended federation nonfunctionality. Recovery is not an automatic user withdrawal path; it still depends on those keys and an operational process. The mechanism reduces lockup risk but adds separate key, governance, and execution assumptions.

#### Federated security boundaries

A federation can provide predictable blocks and a threshold rather than one custodian. It also concentrates special authority in a known set of operators and hardware.

The main risks include quorum unavailability, coordinated censorship, threshold-key compromise, software flaws, HSM failures, membership changes, and emergency recovery failures. Public node validation can detect invalid Liquid state, but it does not let every user independently sign a Bitcoin peg-out.

A federated peg is therefore more structured than a single-company account, but it still contains member, threshold-key, hardware, and governance assumptions that Bitcoin itself does not have.

### Merged-mined sidechain with a separate peg: Rootstock

Rootstock is a separate blockchain with EVM-compatible smart contracts and a bitcoin-denominated native asset called rBTC. Rootstock blocks are merge-mined with Bitcoin, while the PowPeg controls movement between BTC and rBTC.

These are related but separate security boundaries. Merged mining helps order and secure Rootstock blocks. The PowPeg authorizes release of bitcoin from the Bitcoin-side pool.

#### Merged mining reuses work without merging validation rules

Rootstock and Bitcoin both use double SHA-256 proof of work. Mining pools can place a commitment to a Rootstock candidate in a Bitcoin coinbase transaction. A hash can satisfy Rootstock's target even when it does not satisfy Bitcoin's higher target, or it can satisfy both.

Bitcoin nodes treat the Rootstock commitment as data in a valid Bitcoin transaction. They do not validate the Rootstock block, execute its contracts, or enforce its state transition rules. Rootstock nodes verify Rootstock blocks and the merged-mining proofs under Rootstock consensus.

Rootstock's documentation reported participation exceeding 85 percent of Bitcoin hashpower when accessed on July 19, 2026. That figure is time-sensitive and project-reported. It describes observed mining participation, not independent proof that the PowPeg has the same security as Bitcoin or that Bitcoin nodes validate Rootstock.

Any user can run the RSKj node software to validate Rootstock. Mining pools need Rootstock-aware pool or delegated merged-mining infrastructure to obtain Rootstock work and submit proofs, but Bitcoin nodes require no changes and individual miners do not necessarily run Rootstock nodes. This is operational delegation, not BIP 301 blind merged mining. Rootstock retains its own block timing, difficulty, transaction rules, contracts, and chain-selection behavior.

#### rBTC and the PowPeg

In a peg-in, bitcoin is sent to the PowPeg address. The Rootstock Bridge, a precompiled contract in Rootstock consensus, tracks relevant Bitcoin evidence and recognizes rBTC after the required process. Current Rootstock documentation updated June 22, 2026 states that peg-ins require 100 Bitcoin blocks. The current native peg-in minimum is 0.005 BTC.

For a peg-out, the Bridge accepts the request, waits for Rootstock confirmation conditions, builds the Bitcoin transaction, and coordinates signing. The same documentation states that peg-outs require 4,000 Rootstock blocks, described as approximately 200 Bitcoin blocks under its timing assumptions. Current documentation lists a 0.004 rBTC minimum, and the Bridge can reject and refund requests when estimated Bitcoin fees leave an uneconomic output.

Pegnatories operate PowPeg nodes and PowHSM devices. The hardware protects one key in the multisignature set and is designed to sign only when a requested peg-out is backed by sufficient cumulative Rootstock proof of work. The Bridge selects transaction inputs and outputs under Rootstock consensus rules. PowPeg membership and the Bitcoin signing threshold are active Bridge state rather than permanent protocol constants. They can change through federation updates, so current values must be read from the live Bridge rather than inferred from a genesis key list or an older documentation count.

This arrangement limits direct human discretion, but it does not eliminate operational assumptions. Peg-outs require enough PowHSMs and PowPeg infrastructure to remain online, follow the expected chain, and sign. Hardware, firmware, node software, attestation, membership changes, and deep-chain assumptions all matter.

#### Chain security is not peg security

An attacker attempting to rewrite Rootstock state faces the merged-mining security model. An attacker attempting to release locked BTC faces the Bridge, PowHSM, threshold-signature, confirmation-delay, and operational controls of the PowPeg.

High merged-mining participation can make long Rootstock reorganizations expensive. It does not give ordinary Rootstock full nodes the Bitcoin multisignature keys. It also does not make a peg-out unilateral for each rBTC holder.

Likewise, a correct PowPeg balance does not prove that every Rootstock smart contract is safe. EVM functionality expands what can run on the sidechain and creates its own application and execution risks.

### Proposed drivechain model: BIP 300 and BIP 301

Drivechains are proposals, not deployed Bitcoin mainnet functionality. BIP 300 and BIP 301 are both listed as Draft specifications in the official BIPs repository as of July 19, 2026. They propose Bitcoin consensus changes and are not listed among the BIPs implemented by Bitcoin Core.

#### BIP 300 hashrate escrows

BIP 300 proposes hashrate escrows that hold sidechain funds in designated Bitcoin UTXOs. Sidechain users would form withdrawal bundles. Under the current Draft specification, a bundle starts with 26,300 blocks remaining, succeeds after reaching at least 13,150 net ACKs, and is removed when its lifetime expires or it can no longer reach that threshold. These are proposed consensus rules, not deployed Bitcoin behavior.

The design moves withdrawal authorization away from a fixed federation and toward miner signaling. It deliberately uses long, visible withdrawal periods. Its security depends on assumptions about miner incentives, user monitoring, censorship, and whether miners approve only valid sidechain withdrawals.

A BIP document is a specification proposal. Its publication does not show activation, broad agreement, or safe deployment. BIP 300 would require new consensus behavior before ordinary Bitcoin nodes could enforce its escrow messages and withdrawal rules.

#### BIP 301 blind merged mining

BIP 301 proposes blind merged mining. Sidechain users assemble candidate sidechain blocks and bid through Bitcoin transactions for a miner to include one chosen sidechain block commitment in the Bitcoin coinbase.

The Bitcoin miner can collect the bid without running the sidechain node. The sidechain users remain responsible for constructing and validating sidechain blocks. This separates block assembly from hash commitment.

BIP 301 does not make Bitcoin nodes validate the sidechain's contracts or complete history. It defines a proposed Bitcoin-layer bidding and commitment mechanism. It is designed to work with BIP 300, but block production and withdrawal authorization remain distinct concepts.

#### Drivechain disagreement is part of the model

Supporters argue that miner-governed escrows can enable many sidechains without fixed federations. Critics focus on miner custody incentives, withdrawal theft or censorship, complexity added to Bitcoin consensus, and changes to miner and user responsibilities.

Those disagreements are not resolved merely because BIPs have assigned numbers. A responsible comparison labels BIP 300 and BIP 301 as Draft proposals and separates reference implementations or test networks from Bitcoin mainnet deployment.

### Sidechains compared with Lightning and Ark

Lightning is a network of bilateral Bitcoin payment channels. Channel participants update enforceable Bitcoin settlement states, and routed payments use directional channel liquidity. Channel opening and closing use Bitcoin transactions and fees, and a participant can enforce a valid channel close on Bitcoin without asking a sidechain peg authority. Lightning does not create an independent global blockchain with its own block producers.

Ark uses operator-coordinated VTXOs and shared Bitcoin batch outputs. Its users depend on batch timing, operator service, expiry management, and the transaction data needed for unilateral exits. Ark does not create independent sidechain blocks or a separate peg whose key holders authorize withdrawals, so it is not a sidechain in the same sense as Liquid or Rootstock.

A sidechain creates its own chain history and node validation environment. It may offer broader execution or asset features, but users accept separate consensus and peg assumptions. These systems can all be called Layer 2 in broad conversation because they move activity away from ordinary Bitcoin transactions, but the label does not describe one shared security model.

The useful question is not simply whether a system is Layer 2. It is which rules Bitcoin validates, which rules another network validates, who orders state, who controls withdrawals, what data users must retain, and what happens when cooperation or infrastructure fails.

### A practical comparison framework

Before relying on a sidechain, separate these questions:

1. **Sidechain validation:** Can users run a full node, and what rules does it enforce?
2. **Block production:** Who proposes and finalizes blocks, and what can halt production?
3. **Peg custody and authorization:** Which scripts, keys, hardware, contracts, or miner votes release bitcoin?
4. **Liveness:** What threshold or infrastructure must remain available for deposits, transactions, and withdrawals?
5. **Censorship:** Who can delay or refuse blocks or peg-outs?
6. **Reorganization risk:** Which chain can reorganize, and how do deep reorganizations affect the peg?
7. **Recovery:** Are there emergency keys, timelocks, migration procedures, or no recovery path?
8. **Verification:** Does a user validate both Bitcoin and the sidechain, or rely on hosted services?
9. **Functionality:** Which privacy, asset, or contract features are provided, and what new risks accompany them?
10. **Deployment status:** Is the mechanism deployed, experimental, proposed, or absent from Bitcoin Core?

Sidechains can expand design space, but they do not erase tradeoffs. The security description must name the specific sidechain consensus model and the specific peg model. Claims that a sidechain simply inherits Bitcoin security hide the parts users most need to understand.

## 3. Key Terms

- **Sidechain:** A separate blockchain with its own validation rules and history that may be economically connected to Bitcoin through a peg.
- **Two-way peg:** A mechanism coordinating entry to and exit from a sidechain while maintaining a defined relationship between locked bitcoin and a sidechain representation.
- **Peg-in:** The process that locks bitcoin under a peg and makes a corresponding sidechain representation available.
- **Peg-out:** The process that retires a sidechain representation and requests release of bitcoin from the peg.
- **Pegged bitcoin representation:** Sidechain state denominated in bitcoin and backed or linked through a peg, but governed by the sidechain and peg rules rather than being the same Bitcoin UTXO.
- **Sidechain node:** Software that validates sidechain blocks and transactions under the sidechain's rules.
- **Sidechain consensus:** The rules and process that determine valid sidechain state and block history.
- **Federation:** A defined group of participants with special block-production, peg, or governance responsibilities.
- **Functionary:** Liquid-specific hardware and operator infrastructure that signs blocks and participates in securing the peg.
- **Watchman:** The Liquid functionary role that validates and signs authorized Bitcoin peg transactions.
- **Threshold signature:** An authorization rule requiring a defined subset of key holders or signing devices.
- **Merged mining:** Reuse of proof-of-work attempts to commit to and potentially produce blocks for more than one blockchain.
- **PowPeg:** Rootstock's Bitcoin peg using the Bridge contract, PowPeg nodes, PowHSM devices, and threshold Bitcoin signing.
- **Pegnatory:** A Rootstock-specific participant operating PowPeg infrastructure and a protected signing key.
- **Blind merged mining:** The BIP 301 proposal in which Bitcoin miners can commit to a sidechain block selected by sidechain users without validating that sidechain.
- **Hashrate escrow:** The BIP 300 proposal for Bitcoin UTXOs whose sidechain withdrawals are authorized through extended miner signaling.
- **Drivechain:** A proposed sidechain arrangement using miner-governed withdrawal escrows, commonly referring to BIP 300 with BIP 301.
- **Censorship resistance:** The ability of valid activity to be processed despite attempts by particular participants to block it.
- **Liveness:** The ability of a system to continue making progress when required participants and infrastructure are available.

## 4. Sources

1. **Enabling Blockchain Innovations with Pegged Sidechains** | Adam Back, Matt Corallo, Luke Dashjr, Mark Friedenbach, Gregory Maxwell, Andrew Miller, Andrew Poelstra, Jorge Timon, and Pieter Wuille
   - URL: https://blockstream.com/sidechains.pdf
   - Supports: Original pegged-sidechain model, separation of mainchain and sidechain validation, two-way peg concepts, and independent sidechain experimentation.
2. **Elements Sidechain: Federated Two-Way Peg** | Elements Project
   - URL: https://elementsproject.org/elements-code-tutorial/sidechain
   - Supports: Elements as a separate sidechain, mainchain unawareness of sidechain state, federated peg configuration, and watchman-controlled peg-outs.
3. **How Liquid Works** | Liquid Network documentation
   - URL: https://docs.liquid.net/docs/how-liquid-works
   - Supports: Current 15-functionary and 11-of-15 configuration, one-minute signed blocks, Elements Core node validation, 102-confirmation peg-ins, and Confidential Transaction visibility boundaries including the public transaction graph, input and output counts, and fee.
4. **Technical Overview** | Liquid Network documentation
   - URL: https://docs.liquid.net/docs/technical-overview
   - Supports: Strong Federation roles, round-robin block proposals, two-confirmation signer-finality model, quorum liveness and chain-freeze conditions, 11-to-35-minute peg-out processing range, PAK restrictions, public full-node validation, direct peg-out restrictions, and three-key timelocked emergency recovery.
5. **Peg-in and Peg-out** | Liquid Network documentation
   - URL: https://docs.liquid.net/docs/advanced-pegin-pegout
   - Supports: Peg-in address and claim-script generation, Bitcoin transaction and Merkle-proof claim data, 102-confirmation peg-ins, L-BTC creation and retirement, PAK restrictions, indirect public peg-outs, timing variability, and operational peg risks.
6. **Liquid Network Federation** | Liquid Federation
   - URL: https://liquid.net/federation
   - Supports: Current 15 functionary operators, 11-of-15 block quorum, public validation, and separation between functionary and governance roles.
7. **How Does Liquid Bitcoin Work?** | Blockstream Help Center
   - URL: https://help.blockstream.com/liquid-network/faqs/how-does-liquid-bitcoin-lbtc-work
   - Supports: 11-of-15 Bitcoin multisignature custody, one-to-one L-BTC backing, proof-of-reserves validation, and member-controlled direct peg-outs.
8. **Confidential Transactions** | Liquid Network documentation
   - URL: https://docs.liquid.net/docs/liquid-features-and-benefits
   - Supports: Confidential amounts and asset types as functionality while retaining node validation of supply constraints.
9. **Building the Most Secure, Permissionless and Uncensorable Bitcoin Peg** | Rootstock Developers Portal
   - URL: https://dev.rootstock.io/concepts/powpeg/
   - Supports: Project-reported merged-mining participation above 85 percent; Bridge, PowPeg-node, and PowHSM roles; 100-Bitcoin-block peg-ins; 4,000-Rootstock-block peg-outs described as approximately 200 Bitcoin blocks; and current 0.005 BTC peg-in and 0.004 rBTC peg-out minimums.
10. **PowPeg Details Runtime Library** | Rootstock contributors
    - URL: https://github.com/rsksmart/powpeg-details
    - Supports: Bridge methods used to query the active PowPeg federation size, signing threshold, address, pegnatory public keys, redeem script, and federation creation block from a live Rootstock node.
11. **What Is Merged Mining?** | Rootstock Developers Portal
    - URL: https://dev.rootstock.io/concepts/merged-mining/
    - Supports: Reuse of double-SHA-256 mining work, separate Bitcoin and Rootstock difficulty outcomes, and Rootstock proof submission.
12. **Merged Mining Implementation Guide** | Rootstock Developers Portal
    - URL: https://dev.rootstock.io/node-operators/merged-mining/getting-started/
    - Supports: Rootstock commitment placement in Bitcoin coinbase transactions, Rootstock's separate 30-second work cycle, pool or plugin interaction with Rootstock nodes, merged-mining proof submission, and the absence of required Bitcoin-node changes.
13. **RSKj Node Installation** | Rootstock Developers Portal
    - URL: https://dev.rootstock.io/node-operators/setup/installation/
    - Supports: Public installation and operation of Rootstock full-node software on mainnet.
14. **rsk-powhsm Repository** | Rootstock
    - URL: https://github.com/rsksmart/rsk-powhsm
    - Supports: PowHSM key protection, SPV-mode Rootstock verification, cumulative-work signing requirements, supported hardware platforms, and current maintained implementation.
15. **BIP 300: Hashrate Escrows (Consensus layer)** | Paul Sztorc and CryptAxe
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0300.mediawiki
    - Supports: Draft status, proposed consensus soft fork, escrow slots, miner-signaled withdrawal bundles, long withdrawal voting, and proposed deployment model.
16. **BIP 301: Blind Merged Mining (Consensus layer)** | Paul Sztorc and CryptAxe
    - URL: https://github.com/bitcoin/bips/blob/master/bip-0301.mediawiki
    - Supports: Draft status, proposed consensus soft fork, sidechain-user block construction, miner commitment and bidding, and distinction between blind mining and sidechain validation.
17. **BIPs Implemented in Bitcoin Core** | Bitcoin Core contributors
    - URL: https://github.com/bitcoin/bitcoin/blob/master/doc/bips.md
    - Supports: The maintained list of BIPs implemented by Bitcoin Core and the absence of BIP 300 and BIP 301 from that implementation list.
18. **Elements Repository** | Elements Project
    - URL: https://github.com/ElementsProject/elements
    - Supports: Open-source Elements node software, independent chain validation, signed-block configuration, Confidential Transactions, issued assets, and federated peg primitives.

## 5. SEO title

Bitcoin Sidechains Explained: Liquid, Rootstock, and Drivechains

## 6. Meta description

Compare Bitcoin sidechain security models, including Liquid's federation, Rootstock's merged mining and PowPeg, and proposed BIP 300 and 301 drivechains.

## 7. Page excerpt

Sidechains use separate blockchains and validation rules while connecting economically to Bitcoin through a peg. This guide compares who validates each chain, who authorizes withdrawals, and how federated, merged-mined, and proposed drivechain models differ.

## 8. Estimated reading time

15 minutes

## 9. Planned internal links

- Previous: MSC-GUIDE-035 | How RGB Works on Bitcoin
- Next: MSC-GUIDE-037 | What Are Bitcoin Ordinals?
- Prerequisite: MSC-GUIDE-021 | What Is a Bitcoin Full Node?
- Prerequisite: MSC-GUIDE-030 | How Bitcoin Reaches Consensus
- Branch: MSC-GUIDE-030 | How Bitcoin Reaches Consensus
- Return: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Secondary path: MSC-PATH-NETWORK | Understand the Network
- Related: MSC-GUIDE-033 | How the Lightning Network Works
- Related: MSC-GUIDE-034 | What Is Ark on Bitcoin?

## 10. Accuracy review checklist

- [x] Defines a sidechain as an independent blockchain rather than Bitcoin chainstate.
- [x] Separates sidechain full-node validation from Bitcoin full-node validation.
- [x] Separates sidechain consensus security from Bitcoin peg security.
- [x] Explains that a pegged representation is not the same UTXO moving between chains.
- [x] Compares Liquid's deployed federated model using current 15-functionary and 11-of-15 parameters.
- [x] Distinguishes Liquid block signing from watchman peg control and public validation from direct peg-out authority.
- [x] Compares Rootstock merged mining separately from the PowPeg, Bridge contract, pegnatories, and PowHSM controls.
- [x] Dates the Rootstock hashpower statement and labels it project-reported.
- [x] Labels BIP 300 and BIP 301 as Draft proposals requiring Bitcoin consensus changes.
- [x] Does not imply Bitcoin Core implements drivechains.
- [x] Separates sidechains from Lightning channels, Ark VTXOs, and the broad Layer 2 label.
- [x] Avoids guarantees involving redemption, security, privacy, fees, availability, censorship resistance, or finality.
- [x] Keeps external URLs inside Sources and planned internal links inactive.

## 11. Human verification

- Reviewer:
- Review date:
- Notes:
  - Pending verification of current Liquid functionary count, block-signing and Bitcoin peg thresholds, 102-confirmation peg-in configuration, claim-data requirements, PAK restrictions, peg-out processing ranges, and emergency-key recovery conditions against live official documentation.
  - Pending live Bridge verification of the active Rootstock PowPeg federation size, Bitcoin signing threshold, federation address and creation block, plus current 100-block peg-in, 4,000-Rootstock-block peg-out, minimum amounts, merged-mining participation, PowHSM firmware, and pegnatory state. Reconcile the official documentation conflict between approximately 200 and 100 Bitcoin blocks for the 4,000-block peg-out delay.
  - Pending confirmation that BIP 300 and BIP 301 remain Draft, absent from Bitcoin Core's maintained implementation list, and not deployed on Bitcoin mainnet; distinguish any reference implementation, fork, signet, or test network from Bitcoin Core.

## 12. Illustration brief

### Illustration 1

- Concept title: Two Chains, Two Rulebooks
- Educational purpose: Show that Bitcoin and a sidechain maintain separate blocks, nodes, validation rules, and chainstate even when economically connected.
- Recommended placement: After the section Independent blocks and nodes.
- Visual description: Vintage nautical chart with two parallel shipping lanes. The upper lane is Bitcoin with Bitcoin blocks and Bitcoin full nodes. The lower lane is a sidechain with its own blocks, producers, and full nodes. A narrow peg checkpoint connects the shores, but no block or UTXO crosses directly between ledgers.
- Required labels: Bitcoin chain, Bitcoin blocks, Bitcoin full node, Bitcoin chainstate, Sidechain, Sidechain blocks, Sidechain full node, Sidechain rules, Block producers, Peg checkpoint, Separate validation
- Caption: A sidechain maintains an independent ledger and validation system; the peg connects value without making sidechain state part of Bitcoin chainstate.
- Alt text: Technical nautical map showing separate Bitcoin and sidechain block lanes with distinct full nodes and one peg connection.
- Image orientation: Landscape
- Mobile crop notes: Stack Bitcoin above the sidechain and keep the peg checkpoint centered between the two validation lanes.
- Status: PLANNED

### Illustration 2

- Concept title: Peg-In and Peg-Out Authorization Map
- Educational purpose: Explain locked BTC, sidechain representation, retirement of that representation, and the separate authorization needed to release bitcoin.
- Recommended placement: After the section A two-way peg is two coordinated accounting processes.
- Visual description: Vintage customs-port diagram. On the Bitcoin shore, a Bitcoin UTXO enters a locked peg vault. On the sidechain shore, an equal-denomination representation is issued to the user. The return route burns or locks the sidechain representation, passes through a withdrawal-authorization station, and creates a new Bitcoin transaction from the vault.
- Required labels: Bitcoin UTXO, Locked BTC, Peg vault, Peg-in evidence, Sidechain representation, Sidechain ledger, Peg-out request, Representation retired, Withdrawal authorization, New Bitcoin transaction, Bitcoin destination
- Caption: The peg coordinates two ledgers; it does not carry one UTXO physically from Bitcoin into the sidechain and back.
- Alt text: Port-style systems diagram showing Bitcoin locked in a peg, a sidechain representation issued, and a separately authorized Bitcoin withdrawal.
- Image orientation: Landscape
- Mobile crop notes: Use a vertical flow from locked BTC to sidechain representation and back through withdrawal authorization.
- Status: PLANNED

### Illustration 3

- Concept title: Three Sidechain Security Models
- Educational purpose: Compare the distinct block-production and peg-control boundaries in Liquid, Rootstock, and proposed drivechains.
- Recommended placement: After the proposed drivechain model section.
- Visual description: Three-column vintage systems map. Liquid shows an 11-of-15 functionary quorum with separate block-signer and watchman lanes. Rootstock shows Bitcoin miners feeding merged-mining work to Rootstock blocks while a separate Bridge and PowPeg lane controls Bitcoin withdrawals. Drivechain shows Draft BIP 300 hashrate escrow voting and BIP 301 blind merged-mining bids, with a prominent proposed-not-deployed marker.
- Required labels: Liquid federation, 11 of 15, Block signers, Watchmen, Rootstock merged mining, Rootstock nodes, Bridge contract, PowPeg, PowHSM, BIP 300, Hashrate escrow, BIP 301, Blind merged mining, Draft proposal, Separate peg security
- Caption: Federation signatures, merged mining plus a hardware-assisted peg, and proposed miner-governed escrows place trust and liveness in different components.
- Alt text: Three-column technical comparison of Liquid federation security, Rootstock merged mining and PowPeg, and proposed BIP 300 and 301 drivechains.
- Image orientation: Landscape
- Mobile crop notes: Stack the three models vertically and preserve separate block-production and withdrawal-control rows in each model.
- Status: PLANNED
