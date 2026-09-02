# MSC Explore — Payments Research Registry

**Status:** COMMAND CENTER REVIEW  
**Last verified:** 2026-08-15  
**Primary Explore category:** PAYMENTS  
**Canonical records:** 27

> The JSON manifest plus seven `records/` shards are the canonical machine-readable source. This Markdown file is the human-readable review companion. Nothing here publishes or changes the live Explore implementation.

## Final topic architecture

### Merchant Acceptance & Processing

Merchant-facing systems whose primary role is accepting, invoicing, processing or settling Bitcoin payments in commerce, including self-hosted software, hosted processors, point-of-sale products and contactless acceptance.

- Self-hosted merchant processing
- Hosted Bitcoin payment processor
- Point-of-sale / merchant acceptance
- Merchant payment orchestration
- Legacy merchant processor
- Contactless / NFC payment system

### Payment Infrastructure & APIs

Infrastructure that exposes payment execution, Lightning operations, account layers, enterprise orchestration or cross-layer connectivity to applications rather than serving primarily as a consumer wallet or merchant checkout.

- Payment API / settlement infrastructure
- Lightning payment infrastructure
- Enterprise payment orchestration
- Lightning accounts / application platform
- Cross-layer swap infrastructure

### Cross-Border & Access

Bitcoin-native or Bitcoin-connected systems where the defining payment role is cross-border movement, regional settlement or access in constrained connectivity environments.

- Cross-border payment infrastructure
- Regional Lightning payment network
- Low-connectivity payment access

### Commerce & Spend

Durable commerce bridges whose core product makes Bitcoin spendable across merchants or services that do not necessarily accept Bitcoin natively.

- Bitcoin commerce bridge

### Payment Standards & Addressing

Payment-specific interoperability, addressing, discovery and privacy standards that meaningfully shape how Bitcoin payment instructions are created, resolved or constructed.

- Payment URI / multi-rail instructions
- On-chain privacy-enhancing payment protocol
- Reusable on-chain payment addressing
- Human-readable Lightning payment addressing
- Human-readable payment discovery
- Historical payment protocol

### Alternative Bitcoin-backed Payment Systems

Payment systems backed by bitcoin but using additional issuance or trust structures distinct from Bitcoin base-layer ownership and Lightning channel balances.

- Chaumian ecash

## Complete canonical inventory

| ID | Entity | Topic | Subtopic | Status | Confidence |
|---|---|---|---|---|---|
| MSC-EXP-PAY-001 | BTCPay Server | Merchant Acceptance & Processing | Self-hosted merchant processing | ACTIVE | HIGH |
| MSC-EXP-PAY-002 | OpenNode | Merchant Acceptance & Processing | Hosted Bitcoin payment processor | ACTIVE | HIGH |
| MSC-EXP-PAY-003 | Strike | Payment Infrastructure & APIs | Payment API / settlement infrastructure | ACTIVE | HIGH |
| MSC-EXP-PAY-004 | Square Bitcoin Payments | Merchant Acceptance & Processing | Point-of-sale / merchant acceptance | ACTIVE | HIGH |
| MSC-EXP-PAY-005 | BitPay | Merchant Acceptance & Processing | Hosted Bitcoin payment processor | ACTIVE | HIGH |
| MSC-EXP-PAY-006 | Swiss Bitcoin Pay | Merchant Acceptance & Processing | Point-of-sale / merchant acceptance | ACTIVE | HIGH |
| MSC-EXP-PAY-007 | Zaprite | Merchant Acceptance & Processing | Merchant payment orchestration | ACTIVE | HIGH |
| MSC-EXP-PAY-008 | IBEX Pay | Merchant Acceptance & Processing | Point-of-sale / merchant acceptance | ACTIVE | MEDIUM |
| MSC-EXP-PAY-009 | Speed | Merchant Acceptance & Processing | Hosted Bitcoin payment processor | ACTIVE | HIGH |
| MSC-EXP-PAY-010 | Coinbase Commerce | Merchant Acceptance & Processing | Legacy merchant processor | INACTIVE | HIGH |
| MSC-EXP-PAY-011 | CoinGate | Merchant Acceptance & Processing | Hosted Bitcoin payment processor | ACTIVE | HIGH |
| MSC-EXP-PAY-012 | Bolt Card | Merchant Acceptance & Processing | Contactless / NFC payment system | ACTIVE | HIGH |
| MSC-EXP-PAY-013 | Voltage | Payment Infrastructure & APIs | Lightning payment infrastructure | ACTIVE | HIGH |
| MSC-EXP-PAY-014 | Lightspark | Payment Infrastructure & APIs | Enterprise payment orchestration | ACTIVE | HIGH |
| MSC-EXP-PAY-015 | LNbits | Payment Infrastructure & APIs | Lightning accounts / application platform | ACTIVE | HIGH |
| MSC-EXP-PAY-016 | Boltz | Payment Infrastructure & APIs | Cross-layer swap infrastructure | ACTIVE | HIGH |
| MSC-EXP-PAY-017 | Bitnob | Cross-Border & Access | Cross-border payment infrastructure | ACTIVE | HIGH |
| MSC-EXP-PAY-018 | Pouch.ph | Cross-Border & Access | Regional Lightning payment network | ACTIVE | MEDIUM |
| MSC-EXP-PAY-019 | Machankura | Cross-Border & Access | Low-connectivity payment access | ACTIVE | HIGH |
| MSC-EXP-PAY-020 | Bitrefill | Commerce & Spend | Bitcoin commerce bridge | ACTIVE | HIGH |
| MSC-EXP-PAY-021 | Bitcoin URI Scheme (BIP 321 / BIP 21 lineage) | Payment Standards & Addressing | Payment URI / multi-rail instructions | ACTIVE | HIGH |
| MSC-EXP-PAY-022 | Payjoin | Payment Standards & Addressing | On-chain privacy-enhancing payment protocol | ACTIVE | HIGH |
| MSC-EXP-PAY-023 | Silent Payments (BIP 352) | Payment Standards & Addressing | Reusable on-chain payment addressing | ACTIVE | HIGH |
| MSC-EXP-PAY-024 | LNURL & Lightning Address | Payment Standards & Addressing | Human-readable Lightning payment addressing | ACTIVE | HIGH |
| MSC-EXP-PAY-025 | BIP 353 DNS Payment Instructions | Payment Standards & Addressing | Human-readable payment discovery | ACTIVE | HIGH |
| MSC-EXP-PAY-026 | BIP70 Payment Protocol | Payment Standards & Addressing | Historical payment protocol | HISTORICAL | HIGH |
| MSC-EXP-PAY-027 | Cashu | Alternative Bitcoin-backed Payment Systems | Chaumian ecash | ACTIVE | HIGH |

## Count summary

- Total records: **27**
- Lifecycle: ACTIVE 25; HISTORICAL 1; INACTIVE 1; UNCERTAIN 0.
- Source confidence: HIGH 25; MEDIUM 2; LOW 0.
- Topics: Alternative Bitcoin-backed Payment Systems 1; Commerce & Spend 1; Cross-Border & Access 3; Merchant Acceptance & Processing 11; Payment Infrastructure & APIs 5; Payment Standards & Addressing 6.

## Boundary and consolidation decisions

- PAYMENTS is limited to commerce, merchant acceptance, settlement, remittance and payment connectivity. It is not a directory of wallets or merchants.
- Breez/Breez SDK, Blink, Alby, Wallet of Satoshi, Phoenix and ZEUS remain canonical under WALLETS and are relationships only.
- LND, Core Lightning, LDK, Greenlight, Lightning Network concepts, BOLT11 and BOLT12 remain NETWORK relationships rather than PAYMENTS duplicates.
- Fedimint belongs more naturally under NETWORK and Fedi under WALLETS; Cashu is the single PAYMENTS ecash profile because payment issuance/redemption and mint custody are its defining architecture.
- Coinos is excluded because its current canonical identity is principally a wallet/client despite POS capability.
- Coinbase Commerce is retained as an INACTIVE historical/current-transition merchant product; Coinbase Business is not treated as the same entity because the successor has materially different custody and asset positioning.
- BTCPay Server POS/payment requests/plugins, Strike consumer/business/API roles, Square POS/invoices, Speed Merchant/API/Wallet, Voltage product lineage, Lightspark Connect/Grid, LNbits extensions, Bolt Card implementation modes, BIP321/BIP21, Payjoin BIP78/BIP77 lineage and LNURL/Lightning Address are each consolidated to one canonical profile.

## Custody and settlement distinctions

- **Self-hosted merchant control:** BTCPay Server can process directly to merchant-controlled infrastructure; third-party hosting/backends can add trust.
- **Hosted processor/account custody:** OpenNode, BitPay, CoinGate and Strike use hosted accounts or processor-mediated settlement in their normal flows.
- **Hosted UX with merchant wallet settlement:** Swiss Bitcoin Pay can deliver BTC to a merchant-controlled wallet while fiat conversion introduces additional processor dependencies.
- **Orchestration without touching funds:** Zaprite coordinates payment destinations and workflows but the connected destination determines final custody.
- **Mode-dependent infrastructure:** Voltage, Lightspark, LNbits, Speed, Bitnob and Bolt Card have deployment/product-specific trust models; no single platform-wide custody label is safe.
- **Explicit custodial access:** Machankura describes itself as fully custodial.
- **Ecash mint custody:** Cashu users hold bearer ecash tokens while the mint custodies the backing bitcoin; the tokens are not on-chain BTC.

## Standards / Lightning publication cautions

- Lightning is a Bitcoin-anchored payment-channel network, not an independent blockchain; liquidity and routing constraints remain material.
- BOLT specification status and implementation support are separate; no BOLT12 universal-support claim is approved here.
- LNURL is an optional LUD application-protocol suite, not a core BOLT. Lightning Address is a naming/discovery convention, not custody or transport by itself.
- BIP 321 supersedes BIP 21, but wallet support for newer parameters remains implementation-specific.
- Payjoin BIP78 is deployed; BIP77/Payjoin v2 remains draft as of 2026-08-15.
- BIP352 Silent Payments and BIP353 DNS Payment Instructions may be complete/current standards without being universally supported by wallets.
- BIP70 is HISTORICAL and removed from Bitcoin Core; do not project old BIP70 behavior onto current processors.

## Records requiring qualified public copy

- **Coinbase Commerce** — Retirement notice ends Commerce after 2026-03-31; legacy status telemetry conflicts. Keep INACTIVE and explain.
- **Voltage** — Self-serve infrastructure deprovisions 2026-08-31 while enterprise Payments remains active; reverify after cutoff.
- **IBEX Pay** — Reverify current jurisdictions, fiat settlement, thresholds and custody before public copy.
- **Pouch.ph** — Current operation verified; detailed custody, settlement and corridor/regulatory claims need stronger first-party support.
- **Speed** — Speed Wallet is custodial; do not generalize that label to every merchant deployment.
- **Lightspark** — Connect/Grid/self-custody flows differ; avoid one platform-wide custody claim.
- **Square Bitcoin Payments** — Eligibility, limits, pricing and geography are time-sensitive.
- **Bolt Card** — CoinCorner and self-hosted modes have different custody; CoinCorner UK restrictions are implementation-specific.
- **Payjoin** — BIP78 deployed; BIP77/v2 remains draft.
- **Cashu** — Mint custody is fundamental; ecash tokens are not on-chain BTC.

## Deliberate exclusions / relationship-only candidates

- **Breez / Breez SDK** — `RELATIONSHIP_ONLY` — canonical home: WALLETS. Already consolidated in approved WALLETS registry; no duplicate PAYMENTS profile.
- **Blink / Alby / Wallet of Satoshi / Phoenix / ZEUS** — `RELATIONSHIP_ONLY` — canonical home: WALLETS. Primarily wallet ecosystems and already canonical or naturally canonical in WALLETS.
- **LND / Core Lightning / LDK / Greenlight / BOLT11 / BOLT12** — `RELATIONSHIP_ONLY` — canonical home: NETWORK. Lightning implementations/specifications are NETWORK, not duplicate PAYMENTS entities.
- **Nostr Wallet Connect / WebLN** — `RELATIONSHIP_ONLY` — canonical home: NETWORK_OR_WALLETS. Wallet/application connectivity mechanisms, not payment custody or merchant processors.
- **Fedimint / Fedi** — `RELATIONSHIP_ONLY` — canonical home: NETWORK_OR_WALLETS. Fedimint is a broader federated protocol; Fedi is an app/wallet. Cashu is the PAYMENTS ecash profile.
- **Coinos** — `EXCLUDE` — canonical home: WALLETS_CANDIDATE. Current canonical identity is principally Bitcoin/Lightning/Nostr wallet/client despite POS capability.
- **River Lightning Services** — `EXCLUDE_FOR_NOW` — canonical home: NETWORK_OR_EXCHANGES_RELATIONSHIP. Distinct current standalone RLS lifecycle not strongly verified from current first-party product surfaces.
- **ND Pay / ND Labs** — `EXCLUDE`. No current Bitcoin-specific ND Pay canonical product verified.
- **Coinbase Business** — `EXCLUDE` — canonical home: EXCHANGES_OR_FUTURE_INFRASTRUCTURE. Coinbase describes the Commerce successor as stablecoin-first and custodial; do not inherit Commerce's Bitcoin identity.
- **Fold / Bitcoin Beach / ordinary gift-card merchants** — `EXCLUDE`. Would add consumer/community/merchant-directory padding rather than distinct payment architecture.
- **Yellow Card** — `EXCLUDE` — canonical home: EXCHANGES. Current broader exchange/stablecoin identity is not Bitcoin-central enough for duplicate PAYMENTS canonization.

## Approval recommendation

The registry is structurally complete and validation-ready for Command Center approval as the PAYMENTS research canon. Approval should not be interpreted as approval of public copy for the flagged records above; those claims must be reverified at publication time where custody, jurisdiction, pricing, deployment or product transitions are time-sensitive.

**Publication state:** COMMAND CENTER REVIEW ONLY. No merge, public page, Shopify/Atlas/runtime integration, Learn/Home/Tools change, or production action is authorized by this registry.
