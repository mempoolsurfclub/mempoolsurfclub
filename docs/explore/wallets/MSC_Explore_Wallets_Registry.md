# MSC Explore — Wallets Research Registry

**Status:** COMMAND CENTER REVIEW  
**Last verified:** 2026-08-15  
**Primary Explore category:** WALLETS  
**Canonical records:** 40

> The JSON manifest plus its `records/` shards are the canonical machine-readable source. This Markdown file is the human-readable registry companion. Nothing here publishes or changes the live Explore implementation.

## Final topic architecture

### Software Wallets

Bitcoin wallet software whose canonical role is direct key management, transaction construction, node integration, or privacy-oriented on-chain use.

- Full-node / reference wallet
- Desktop power-user wallet
- Mobile self-custody wallet
- Privacy-focused wallet
- Legacy security wallet

### Bitcoin Asset Wallets

Wallet applications whose distinctive Bitcoin role includes Ordinals, Runes, BRC-20, Stacks-connected assets, or Liquid-based assets beyond ordinary BTC transaction management.

- Bitcoin-native asset application wallet
- Bitcoin + Liquid wallet

### Lightning & Payment Wallets

Wallets and wallet ecosystems whose canonical role is frequent Bitcoin payments, Lightning, or application-to-wallet payment connectivity.

- Self-managed Lightning wallet
- Unified on-chain / Lightning wallet
- Wallet connectivity / embedded payments
- Hybrid custody payment wallet

### Multisig & Collaborative Custody

Wallet systems centered on multi-key policy, assisted recovery, inheritance, or collaborative custody while preserving a user-controlled spending path.

- Multisig coordinator
- Collaborative custody service
- Assisted multisig vault

### Hardware & Signing Devices

Dedicated hardware or DIY signing systems that protect or use Bitcoin private keys and sign transactions; these devices do not store bitcoin itself.

- Commercial hardware signer family
- DIY / stateless air-gapped signer
- Integrated multisig hardware system

## Complete canonical inventory

### Software Wallets

- **Bitcoin Core wallet** — `ACTIVE` — `bitcoin-core-wallet` — Full-node / reference wallet — The wallet built into Bitcoin Core, pairing local key management and transaction creation with a validating Bitcoin node.
- **Electrum** — `ACTIVE` — `electrum` — Desktop power-user wallet — A long-running open-source Bitcoin wallet using the Electrum server protocol, with advanced multisig, hardware-wallet and Lightning capabilities.
- **Sparrow Wallet** — `ACTIVE` — `sparrow-wallet` — Desktop power-user wallet — A desktop Bitcoin wallet for detailed UTXO control, descriptors, multisig and hardware-signing workflows.
- **Specter Desktop** — `ACTIVE` — `specter-desktop` — Desktop power-user wallet — An open-source desktop Bitcoin wallet and coordinator built around Bitcoin Core, multisig, PSBTs and hardware signers.
- **BlueWallet** — `ACTIVE` — `bluewallet` — Mobile self-custody wallet — A widely used open-source Bitcoin wallet emphasizing simple mobile self-custody while retaining multisig, PSBT, coin-control and advanced transaction tools.
- **Blockstream App** — `ACTIVE` — `blockstream-app` — Mobile self-custody wallet — Blockstream's open-source self-custody app for Bitcoin and Liquid, evolved from Blockstream Green and integrating the Jade hardware-wallet family.
- **Bitcoin Wallet for Android** — `UNCERTAIN` — `bitcoin-wallet-android` — Mobile self-custody wallet — Andreas Schildbach's long-running standalone Android Bitcoin wallet, historically notable for direct peer-to-peer operation without a centralized wallet backend.
- **Wasabi Wallet** — `ACTIVE` — `wasabi-wallet` — Privacy-focused wallet — An open-source desktop Bitcoin wallet focused on network privacy, coin control and WabiSabi CoinJoin coordination.
- **Ginger Wallet** — `ACTIVE` — `ginger-wallet` — Privacy-focused wallet — An actively maintained Bitcoin-only privacy wallet forked from Wasabi after the 2024 shutdown of zkSNACKs' default CoinJoin coordinator.
- **Samourai Wallet** — `INACTIVE` — `samourai-wallet` — Privacy-focused wallet — A historically important Android Bitcoin privacy wallet whose operated services shut down after U.S. authorities seized infrastructure and arrested its founders in April 2024.
- **Mycelium** — `ACTIVE` — `mycelium` — Mobile self-custody wallet — A long-running self-custody mobile wallet whose Android client remains actively maintained and supports advanced Bitcoin transaction and hardware-wallet workflows.
- **Proton Wallet** — `ACTIVE` — `proton-wallet` — Mobile self-custody wallet — Proton's open-source self-custody Bitcoin wallet, integrating encrypted wallet metadata and a Bitcoin-via-Email addressing experience with standard seed-based recovery.
- **Armory** — `HISTORICAL` — `armory` — Legacy security wallet — A pioneering desktop Bitcoin wallet known for early cold-storage and multisig-oriented security workflows, now primarily a legacy project.

### Bitcoin Asset Wallets

- **Xverse** — `ACTIVE` — `xverse` — Bitcoin-native asset application wallet — A self-custody Bitcoin wallet spanning BTC, Ordinals, Runes, BRC-20 and Stacks-connected assets across browser and mobile clients.
- **UniSat Wallet** — `ACTIVE` — `unisat-wallet` — Bitcoin-native asset application wallet — An open-source non-custodial Bitcoin wallet focused on BTC and Bitcoin-native asset protocols including Ordinals, BRC-20 and Runes.
- **Leather** — `ACTIVE` — `leather` — Bitcoin-native asset application wallet — A self-custody Bitcoin and Stacks wallet, evolved from Hiro Wallet, with current browser and mobile clients and safeguards for Bitcoin collectibles.
- **AQUA** — `ACTIVE` — `aqua-wallet` — Bitcoin + Liquid wallet — JAN3's mobile self-custody wallet combining on-chain Bitcoin and Liquid-based payment rails, including Lightning interoperability through swaps.
- **Magic Eden Wallet** — `INACTIVE` — `magic-eden-wallet` — Bitcoin-native asset application wallet — Magic Eden's former multi-chain wallet, historically relevant to Bitcoin Ordinals and Runes but discontinued in 2026.

### Lightning & Payment Wallets

- **Phoenix** — `ACTIVE` — `phoenix-wallet` — Self-managed Lightning wallet — ACINQ's self-custody mobile Lightning wallet that automates channel and liquidity management while keeping user-controlled keys.
- **ZEUS** — `ACTIVE` — `zeus-wallet` — Wallet connectivity / embedded payments — An open-source mobile Bitcoin and Lightning wallet that can connect to remote nodes or run an embedded Lightning node, with a 2026 graduated onboarding model.
- **Breez** — `ACTIVE` — `breez` — Wallet connectivity / embedded payments — A Bitcoin payment ecosystem that evolved from a self-custodial Lightning wallet into a major SDK platform for embedding non-custodial Lightning, Liquid and Spark-based payments.
- **Blixt Wallet** — `ACTIVE` — `blixt-wallet` — Self-managed Lightning wallet — An open-source mobile wallet that runs a full non-custodial LND node on the user's device and exposes direct Lightning channel control.
- **Muun** — `ACTIVE` — `muun` — Unified on-chain / Lightning wallet — A self-custodial mobile wallet presenting on-chain and Lightning payments through one balance, backed by a 2-of-2 key architecture and an Emergency Kit.
- **Alby** — `ACTIVE` — `alby` — Wallet connectivity / embedded payments — An open-source Lightning wallet ecosystem centered on Alby Hub, Nostr Wallet Connect, browser integration and the Alby Go mobile interface.
- **Wallet of Satoshi** — `ACTIVE` — `wallet-of-satoshi` — Hybrid custody payment wallet — A mobile Lightning wallet that now supports both custodial and self-custodial modes depending on region and user configuration.
- **Blink** — `ACTIVE` — `blink` — Hybrid custody payment wallet — A Bitcoin payment wallet that added a Spark-based non-custodial mode in 2026 while continuing or winding down custodial service depending on region.
- **Bull Bitcoin Wallet** — `ACTIVE` — `bull-bitcoin-wallet` — Unified on-chain / Lightning wallet — Bull Bitcoin's open-source Bitcoin-only self-custody mobile wallet combining on-chain BTC, Liquid and swap-based Lightning payments with PayJoin and hardware-wallet ambitions.

### Multisig & Collaborative Custody

- **Nunchuk** — `ACTIVE` — `nunchuk` — Multisig coordinator — A Bitcoin-focused multisig wallet and coordination platform with hardware-key support, assisted recovery and inheritance tooling.
- **Bitcoin Keeper** — `ACTIVE` — `bitcoin-keeper` — Multisig coordinator — A Bitcoin-focused multisig wallet emphasizing user-controlled keys, Miniscript-based recovery/inheritance policies and community-led open-source development.
- **Unchained** — `ACTIVE` — `unchained` — Collaborative custody service — A Bitcoin financial-services company whose core vault product uses collaborative multisig so clients retain a unilateral spending path while Unchained holds a backup key.
- **Casa** — `ACTIVE` — `casa` — Assisted multisig vault — An assisted self-custody platform using multi-key vaults, hardware keys and a Casa-held recovery key that cannot spend client funds by itself.

### Hardware & Signing Devices

- **Ledger** — `ACTIVE` — `ledger` — Commercial hardware signer family — A major multi-chain hardware-signer family whose devices secure Bitcoin private keys in Secure Elements and sign transactions through Ledger's companion software or compatible third-party wallets.
- **Trezor** — `ACTIVE` — `trezor` — Commercial hardware signer family — SatoshiLabs' pioneering hardware-wallet family, combining open-source firmware/design with on-device signing and current Secure Element-equipped models.
- **COLDCARD** — `ACTIVE` — `coldcard` — Commercial hardware signer family — Coinkite's Bitcoin-only hardware signer family built around air-gapped PSBT workflows, dual Secure Elements and deep advanced-wallet interoperability.
- **Foundation Passport** — `ACTIVE` — `foundation-passport` — Commercial hardware signer family — Foundation's fully open-source Bitcoin-only hardware signer family, with Passport Core using QR/microSD communication and no data-capable USB or wireless link.
- **BitBox** — `ACTIVE` — `bitbox` — Commercial hardware signer family — Shift Crypto's Swiss hardware-signer family, including Bitcoin-only editions and the current BitBox02 Nova with open-source firmware and a dual-chip Secure Element design.
- **Blockstream Jade** — `ACTIVE` — `blockstream-jade` — Commercial hardware signer family — Blockstream's fully open-source hardware-signer family for Bitcoin and Liquid, now centered on Jade Core and Jade Plus.
- **SeedSigner** — `ACTIVE` — `seedsigner` — DIY / stateless air-gapped signer — An open-source DIY Bitcoin signer that uses commodity Raspberry Pi hardware, QR codes and a stateless operating model to support single-signature and multisig transactions.
- **Krux** — `ACTIVE` — `krux` — DIY / stateless air-gapped signer — Open-source Bitcoin signing-device firmware for inexpensive camera-equipped hardware, emphasizing air-gapped QR workflows, descriptors, multisig and Miniscript.
- **Bitkey** — `ACTIVE` — `bitkey` — Integrated multisig hardware system — Block's seedless 2-of-3 self-custody Bitcoin system combining a mobile app, dedicated hardware key and a Block-managed server key.

## Record schema

Every canonical record uses the approved 24-field entity contract: Registry ID; canonical name; recommended slug; primary Explore category; Wallets topic/subtopic; entity/project type; lifecycle status; source confidence; concise description; deeper researched summary; creators/founders; launch/history; ecosystem significance; technical/cultural characteristics; related entities; related Explore categories; supporting tags; official website; official sources; corroborating sources; last verified date; verification basis; and research notes/uncertainties.

Lifecycle status, source confidence, source provenance and unresolved research are intentionally separate. Exact controlled values and field rules live in the manifest's `record_schema_contract`.

## Lifecycle summary

- **ACTIVE:** 36
- **HISTORICAL:** 1
- **INACTIVE:** 2
- **UNCERTAIN:** 1

## Topic summary

- **Software Wallets:** 13
- **Bitcoin Asset Wallets:** 5
- **Lightning & Payment Wallets:** 9
- **Multisig & Collaborative Custody:** 4
- **Hardware & Signing Devices:** 9

## Source-confidence summary

- **HIGH:** 38
- **MEDIUM:** 2
- **LOW:** 0

## Xverse seed disposition

Xverse is included as a full WALLETS canonical profile, not merely an Ordinals relationship. Its record covers ordinary BTC self-custody, Ordinals, Runes, BRC-20, platform availability, hardware-wallet integrations and cross-category relationships.

## Important custody and status corrections

- Wallet of Satoshi and Blink are modeled as **hybrid custody** products because current custody depends on user mode and/or region.
- ZEUS is not given one blanket custody label across every balance/path: embedded/remote Lightning-node use and Cashu ecash onboarding have different trust assumptions.
- Unchained, Casa, Nunchuk assisted plans and Bitcoin Keeper are described by actual signing quorum rather than treating a minority service/recovery key as automatic custody.
- Hardware wallets/signers are described as securing private keys and signing transactions; they do **not** store bitcoin itself.
- Samourai Wallet and Magic Eden Wallet are `INACTIVE` even though source code, documentation or old local installations may still exist.
- Bitcoin Wallet for Android is `UNCERTAIN`, not `ACTIVE`, because current availability alone did not prove meaningful 2026 maintenance.
- Armory is `HISTORICAL` after no current release/activity sufficient for ACTIVE status was verified.
- Leather's direct Runes management ended April 16, 2026; its RUNES relationship is retained historically/cross-category, not as a current feature claim.
- Mycelium remains `ACTIVE` based on Android maintenance, while its iOS source repository was archived in May 2026.

## Product-family consolidation decisions

- Blockstream Green and GreenAddress history are consolidated into Blockstream App.
- Ledger device models are consolidated into one Ledger family profile.
- Trezor device models are consolidated into one Trezor family profile.
- COLDCARD Mk-series and Q are consolidated into one COLDCARD family profile.
- Foundation Passport generations/current Passport Core are consolidated into one Foundation Passport profile.
- BitBox01/BitBox02/BitBox02 Nova lineage is consolidated into one BitBox profile.
- Blockstream Jade Classic/Jade Plus/Jade Core are consolidated into one Blockstream Jade profile.
- Breez consumer-wallet lineage and current Breez SDK platform are consolidated into one Breez ecosystem profile.
- Alby Extension, Alby Hub and Alby Go are consolidated into one Alby ecosystem profile.
- Bitkey app, hardware device and server-key recovery service are one integrated Bitkey wallet system.
- Nunchuk plan/service variants remain one Nunchuk profile; Casa and Unchained plan variants likewise remain one entity each.
- Magic Eden Wallet remains separate from the Magic Eden marketplace entity because it was a distinct wallet product, but cross-category duplication is prohibited.

## Deliberate exclusions

| Candidate | Decision | Reason |
| --- | --- | --- |
| ND Wallet / ND Labs | EXCLUDE | Current first-party material positions ND Wallet as white-label multi-chain wallet infrastructure for businesses, supporting Bitcoin among many networks. It is not a sufficiently Bitcoin-specific canonical wallet entity for the initial MSC Wallets canon. |
| OKX Wallet | EXCLUDE | OKX Wallet is a broad multi-chain wallet tied to the OKX ecosystem. Bitcoin/Ordinals support is real, but Bitcoin is not central enough to justify a WALLETS canonical profile; OKX itself belongs more naturally under EXCHANGES if canonized. |
| LNDg | EXCLUDE | LNDg is an LND analytics/automation and node-management interface rather than an independent wallet/key-custody entity. Canonical home, if needed, is NETWORK tooling. |
| Ride The Lightning (RTL) | EXCLUDE | RTL can send/receive through the attached Lightning node, but its canonical identity is a web node/channel-management interface that requires an existing node. It belongs under NETWORK tooling rather than as a duplicate wallet. |
| Bitcoin Safe | EXCLUDE_FOR_NOW | Active and technically credible Bitcoin-only desktop wallet with hardware-wallet, single-sig/multisig and PSBT support, but it is a newer entrant whose current role overlaps Sparrow/Specter/Bitcoin Keeper. Monitor for greater ecosystem significance rather than pad the initial canon. |
| Cove | EXCLUDE_FOR_NOW | Promising current Bitcoin-only iPhone wallet with BDK, PSBT, hardware-wallet, QR/NFC and UTXO-management support, but still a newer entrant. Monitor for adoption and cross-platform maturity before adding to the canonical registry. |
| Keystone | EXCLUDE | Keystone supports Bitcoin-only firmware, PSBT/multisig and strong Bitcoin wallet integrations, but its canonical commercial identity remains a very broad multi-chain hardware-wallet family. The initial Bitcoin canon already covers the most historically/technically distinctive signer architectures; retain Keystone as a relationship where integrations matter. |
| Bitcoin Knots wallet | EXCLUDE | Wallet functionality is part of the Bitcoin Knots node implementation rather than a separate canonical wallet product; if MSC profiles Bitcoin Knots, NETWORK is the more natural canonical category. |

## Records requiring qualified public copy

| Entity | Publication caution |
| --- | --- |
| Bitcoin Wallet for Android | Lifecycle is UNCERTAIN; current downloadability exists but meaningful 2026 maintainer/release activity was not verified. |
| Blockstream App | Lightning claims require implementation-specific wording; current flows include swap-based interoperability while native Lightning work has been evolving. |
| Wasabi Wallet | Do not imply zkSNACKs still runs the default CoinJoin coordinator after June 2024. |
| Ginger Wallet | Privacy/CoinJoin copy must avoid promising anonymity and should distinguish its coordinator/operator from Wasabi. |
| Samourai Wallet | INACTIVE. Legal history and software/service status require dated, neutral wording; code availability is not active service availability. |
| Mycelium | Android is clearly active; iOS source repository was archived in May 2026, so platform claims must be qualified. |
| Leather | Direct Runes support ended April 16, 2026; do not publish current Runes-management claims. |
| Magic Eden Wallet | INACTIVE/deprecated. Do not present as currently supported even if an old local installation can still expose migration/export functions. |
| ZEUS | Cashu onboarding and embedded/remote Lightning-node paths have different custody/trust models. |
| Breez | Trust/custody assumptions vary across Spark, Liquid and other SDK deployments; no single backend description covers every integration. |
| Wallet of Satoshi | Custodial and self-custodial modes coexist; jurisdiction and user mode must be specified. |
| Blink | Custodial and Spark-based non-custodial modes coexist; regional hosted-service wind-downs are time-sensitive. |
| Nunchuk | Taproot/MuSig2 multisig has been described as beta/experimental; reverify before unqualified public feature claims. |
| Foundation Passport | Do not publish Miniscript support from stale roadmap text without fresh verification. |

## Source and verification note

First-party product documentation, official GitHub/release material and primary legal/protocol records were preferred. App stores, Bitcoin.org and similar directories are supporting evidence only and never establish ACTIVE status by themselves. Temporary prices, ratings, downloads, user counts and promotional claims are not canonical registry facts.

## Publication state

**Research registry only. No Wallets category page, public wallet profile, Atlas connection, Shopify change, production route or other live Explore change has been made.**
