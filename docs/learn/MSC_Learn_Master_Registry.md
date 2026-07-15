# Mempool Surf Club Learn Content Registry and Production Map

Status: PLANNED

The JSON registry is the machine-readable canonical source of truth. This Markdown file is its human-readable companion. The validation file confirms structural checks. Recommended slugs are planning handles and do not prove that a page exists.

## PART 1: EXECUTIVE SUMMARY

### Total destinations

- 1 Learn homepage
- 5 category hubs
- 5 learning path pages
- 80 canonical topic guides
- 1 featured learning route
- 1 glossary index
- 93 total planned destinations

### Architecture summary

Every topic retains one canonical topic-guide page. Category hubs organize the 80 guides into five permanent subject areas and four anchored subcategory sections per hub. Learning paths are cross-category routes through existing destinations and never own duplicate article pages. The featured transaction route connects transaction concepts across canonical guides. The glossary uses concise preferred terms and maps each entry to a canonical destination.

### Navigation philosophy

Permanent previous and next navigation follows the approved 1 through 80 canonical sequence. Category return navigation points to the topic parent hub, and subcategory breadcrumbs point to stable anchors inside that hub. Learning path progression remains separate from canonical navigation. Only PUBLISHED destinations with confirmed URLs may become active public links.

### Category and learning path distinction

Categories describe what a guide is about. Every topic guide keeps one canonical category and subcategory. Learning paths describe why and in what order a reader should learn. Path records therefore use no canonical Learn category and instead list every relevant category hub under Category relationships.

### Recommended production sequence

Preserve the existing phased sequence. Build reusable architecture first, then draft and approve one four-guide subcategory batch at a time. Publish approved guides individually. Finalize each hub and path only when enough PUBLISHED destinations exist to create a complete public experience without dead links, empty cards, placeholder URLs, or a large Coming Soon library.

### Registry-wide implementation rules

#### Learn homepage design lock

- The existing live Learn homepage is already designed.
- Its approved hero copy is locked as: LEARN HOW BITCOIN MOVES.
- The registry provides content architecture and routing relationships.
- Implementation must not replace the approved Learn homepage hero, rotating signal, Knowledge Depth Chart, visual styling, or existing section hierarchy.

#### Public visibility rule

- Only records with status PUBLISHED may appear as active, clickable public guide cards.
- PLANNED and DRAFT topic guides remain hidden from public guide grids and learning-path navigation.
- Do not display dead links.
- Do not display empty article cards.
- Do not display placeholder URLs.
- Do not expose a large Coming Soon library.
- Category hubs and learning paths may be built as reusable architecture, but unpublished destinations remain internal registry records.
- As each guide is published, its confirmed URL is returned to the registry and the corresponding card and navigation relationship may become active.

#### Provisional public copy rule

**Planning fields:**
- Suggested card description
- Suggested card action label
- Reader search intent
- Primary search phrase
- Related search phrases
- Potential related editorials
- Future content opportunities

**Rule:**
These fields are planning recommendations until the individual content package is approved. The copywriter must refine them into unique, polished public copy when each destination is drafted. Codex must not automatically publish generic planning language as final website copy.

#### Source of truth rule

- The JSON registry is the machine-readable canonical source of truth.
- The Markdown registry is the human-readable companion.
- The validation text confirms structural checks.
- All three files must remain synchronized after a registry update.
- A future confirmed publication URL supersedes the planned slug reference for linking purposes.
- Recommended slugs are planning handles, not proof that a page exists.

### Taxonomy concerns

- The approved five categories, twenty subcategories, five learning paths, 80 canonical guides, featured route, and glossary remain unchanged.
- Learning paths are cross-category routes and must never be treated as canonical owners of article content.
- Layer 2 systems have different trust, custody, validation, operator, and settlement assumptions. Guide drafts must state those differences accurately.
- Maturity-sensitive protocols require current research when their individual content packages are drafted.
- Suggested card copy, search language, related editorials, and future opportunities remain provisional planning fields until copy approval.

### Planning decisions for maturity-sensitive topics

- Ark: Deep Technical Analysis
- RGB: Deep Technical Analysis
- BitVM: Trench Technical Analysis
- DLCs: Deep Technical Analysis
- OP_CAT: Trench Technical Analysis
- Emerging Protocols: Deep Comparison

These classifications describe prerequisite knowledge and research burden, not endorsement or dismissal.

## PART 2: MASTER DESTINATION INDEX

| Registry ID | Page role | Display title | Category | Subcategory | Primary path | Depth | Format | Production order | Status |
|---|---|---|---|---|---|---|---|---|---|
| MSC-LRN-HOME | page-role:learn-home | Learn | All five Learn categories | Not applicable | All five learning paths | Surface | Learning Index | Phase 1.01: Master Learn architecture; refresh after every category launch | PLANNED |
| MSC-HUB-BASICS | page-role:category-hub | Bitcoin Basics | Bitcoin Basics | All four approved subcategories | Start With Bitcoin | Surface | Learning Index | Phase 1.02: hub skeleton; finalize after Phase 5 | PLANNED |
| MSC-HUB-NETWORK | page-role:category-hub | The Bitcoin Network | The Bitcoin Network | All four approved subcategories | Understand the Network | Surface | Learning Index | Phase 1.03: hub skeleton; finalize after Phase 9 | PLANNED |
| MSC-HUB-BUILDING | page-role:category-hub | Building on Bitcoin | Building on Bitcoin | All four approved subcategories | Build on Bitcoin | Surface | Learning Index | Phase 1.04: hub skeleton; finalize after Phase 13 | PLANNED |
| MSC-HUB-DEVELOPMENT | page-role:category-hub | Bitcoin Development | Bitcoin Development | All four approved subcategories | Build on Bitcoin | Surface | Learning Index | Phase 1.05: hub skeleton; finalize after Phase 17 | PLANNED |
| MSC-HUB-ECOSYSTEM | page-role:category-hub | Bitcoin Ecosystem | Bitcoin Ecosystem | All four approved subcategories | Explore the Ecosystem | Surface | Learning Index | Phase 1.06: hub skeleton; finalize after Phase 21 | PLANNED |
| MSC-PATH-START | page-role:learning-path | Start With Bitcoin | Not applicable. This is a cross-category learning route. | Multiple canonical subcategories. The path does not own topic pages. | Start With Bitcoin | Surface to Shallow, sequenced by prerequisite knowledge | Learning Path | Phase 1.07: path skeleton; Finalize after Phase 5, then refresh route links after Phase 9. | PLANNED |
| MSC-PATH-SAFE | page-role:learning-path | Use Bitcoin Safely | Not applicable. This is a cross-category learning route. | Multiple canonical subcategories. The path does not own topic pages. | Use Bitcoin Safely | Surface to Shallow, sequenced by prerequisite knowledge | Learning Path | Phase 1.08: path skeleton; Finalize the core path after Phase 5 and complete provider branches after Phase 20. | PLANNED |
| MSC-PATH-NETWORK | page-role:learning-path | Understand the Network | Not applicable. This is a cross-category learning route. | Multiple canonical subcategories. The path does not own topic pages. | Understand the Network | Surface to Deep, sequenced by prerequisite knowledge | Learning Path | Phase 1.09: path skeleton; Finalize after Phase 9, then add cryptography branches after Phase 16. | PLANNED |
| MSC-PATH-BUILD | page-role:learning-path | Build on Bitcoin | Not applicable. This is a cross-category learning route. | Multiple canonical subcategories. The path does not own topic pages. | Build on Bitcoin | Shallow to Trench, sequenced by prerequisite knowledge | Learning Path | Phase 1.10: path skeleton; Finalize after Phase 17. | PLANNED |
| MSC-PATH-ECOSYSTEM | page-role:learning-path | Explore the Ecosystem | Not applicable. This is a cross-category learning route. | Multiple canonical subcategories. The path does not own topic pages. | Explore the Ecosystem | Surface to Shallow, sequenced by prerequisite knowledge | Learning Path | Phase 1.11: path skeleton; Finalize after Phase 21. | PLANNED |
| MSC-ROUTE-001 | page-role:featured-route | How a Bitcoin Transaction Moves | The Bitcoin Network | Network | Understand the Network | Shallow | Walkthrough | Phase 1.12: route architecture; write after Phase 9 and finalize before network path launch | PLANNED |
| MSC-GLOSSARY-001 | page-role:glossary-index | Bitcoin Glossary | All five Learn categories | Not applicable | Start With Bitcoin | Surface | Glossary | Phase 1.13: glossary schema; populate with each approved guide and finalize after Phase 21 | PLANNED |
| MSC-GUIDE-001 | page-role:topic-guide | What Is Bitcoin? | Bitcoin Basics | Foundations | Start With Bitcoin | Surface | Explainer | Phase 2.01: Bitcoin Basics / Foundations | PLANNED |
| MSC-GUIDE-002 | page-role:topic-guide | Why Bitcoin? | Bitcoin Basics | Foundations | Start With Bitcoin | Surface | Explainer | Phase 2.02: Bitcoin Basics / Foundations | PLANNED |
| MSC-GUIDE-003 | page-role:topic-guide | Bitcoin History | Bitcoin Basics | Foundations | Start With Bitcoin | Surface | History | Phase 2.03: Bitcoin Basics / Foundations | PLANNED |
| MSC-GUIDE-004 | page-role:topic-guide | Satoshi Nakamoto | Bitcoin Basics | Foundations | Start With Bitcoin | Surface | History | Phase 2.04: Bitcoin Basics / Foundations | PLANNED |
| MSC-GUIDE-005 | page-role:topic-guide | Wallets | Bitcoin Basics | Using Bitcoin | Start With Bitcoin | Surface | Explainer | Phase 3.01: Bitcoin Basics / Using Bitcoin | PLANNED |
| MSC-GUIDE-006 | page-role:topic-guide | Self-Custody | Bitcoin Basics | Using Bitcoin | Use Bitcoin Safely | Surface | Guide | Phase 3.02: Bitcoin Basics / Using Bitcoin | PLANNED |
| MSC-GUIDE-007 | page-role:topic-guide | Sending and Receiving | Bitcoin Basics | Using Bitcoin | Start With Bitcoin | Surface | Walkthrough | Phase 3.03: Bitcoin Basics / Using Bitcoin | PLANNED |
| MSC-GUIDE-008 | page-role:topic-guide | Transactions and Fees | Bitcoin Basics | Using Bitcoin | Understand the Network | Shallow | Explainer | Phase 3.04: Bitcoin Basics / Using Bitcoin | PLANNED |
| MSC-GUIDE-009 | page-role:topic-guide | Seed Phrases | Bitcoin Basics | Security | Use Bitcoin Safely | Surface | Explainer | Phase 4.01: Bitcoin Basics / Security | PLANNED |
| MSC-GUIDE-010 | page-role:topic-guide | Public and Private Keys | Bitcoin Basics | Security | Use Bitcoin Safely | Shallow | Explainer | Phase 4.02: Bitcoin Basics / Security | PLANNED |
| MSC-GUIDE-011 | page-role:topic-guide | Bitcoin Security | Bitcoin Basics | Security | Use Bitcoin Safely | Surface | Guide | Phase 4.03: Bitcoin Basics / Security | PLANNED |
| MSC-GUIDE-012 | page-role:topic-guide | Bitcoin Privacy | Bitcoin Basics | Security | Use Bitcoin Safely | Shallow | Guide | Phase 4.04: Bitcoin Basics / Security | PLANNED |
| MSC-GUIDE-013 | page-role:topic-guide | UTXOs | Bitcoin Basics | Essentials | Understand the Network | Shallow | Explainer | Phase 5.01: Bitcoin Basics / Essentials | PLANNED |
| MSC-GUIDE-014 | page-role:topic-guide | Confirmations | Bitcoin Basics | Essentials | Understand the Network | Surface | Explainer | Phase 5.02: Bitcoin Basics / Essentials | PLANNED |
| MSC-GUIDE-015 | page-role:topic-guide | Halving | Bitcoin Basics | Essentials | Understand the Network | Surface | Explainer | Phase 5.03: Bitcoin Basics / Essentials | PLANNED |
| MSC-GUIDE-016 | page-role:topic-guide | Best Practices | Bitcoin Basics | Essentials | Use Bitcoin Safely | Surface | Guide | Phase 5.04: Bitcoin Basics / Essentials | PLANNED |
| MSC-GUIDE-017 | page-role:topic-guide | Mining | The Bitcoin Network | Mining | Understand the Network | Shallow | Explainer | Phase 6.01: The Bitcoin Network / Mining | PLANNED |
| MSC-GUIDE-018 | page-role:topic-guide | Mining Pools | The Bitcoin Network | Mining | Understand the Network | Shallow | Explainer | Phase 6.02: The Bitcoin Network / Mining | PLANNED |
| MSC-GUIDE-019 | page-role:topic-guide | ASIC Miners | The Bitcoin Network | Mining | Understand the Network | Shallow | Explainer | Phase 6.03: The Bitcoin Network / Mining | PLANNED |
| MSC-GUIDE-020 | page-role:topic-guide | Difficulty Adjustment | The Bitcoin Network | Mining | Understand the Network | Deep | Technical Analysis | Phase 6.04: The Bitcoin Network / Mining | PLANNED |
| MSC-GUIDE-021 | page-role:topic-guide | Full Nodes | The Bitcoin Network | Nodes | Understand the Network | Shallow | Explainer | Phase 7.01: The Bitcoin Network / Nodes | PLANNED |
| MSC-GUIDE-022 | page-role:topic-guide | Pruned Nodes | The Bitcoin Network | Nodes | Understand the Network | Shallow | Comparison | Phase 7.02: The Bitcoin Network / Nodes | PLANNED |
| MSC-GUIDE-023 | page-role:topic-guide | Running a Node | The Bitcoin Network | Nodes | Understand the Network | Shallow | Walkthrough | Phase 7.03: The Bitcoin Network / Nodes | PLANNED |
| MSC-GUIDE-024 | page-role:topic-guide | Node Software | The Bitcoin Network | Nodes | Understand the Network | Deep | Comparison | Phase 7.04: The Bitcoin Network / Nodes | PLANNED |
| MSC-GUIDE-025 | page-role:topic-guide | Mempool | The Bitcoin Network | Network | Understand the Network | Shallow | Explainer | Phase 8.01: The Bitcoin Network / Network | PLANNED |
| MSC-GUIDE-026 | page-role:topic-guide | Blocks | The Bitcoin Network | Network | Understand the Network | Shallow | Explainer | Phase 8.02: The Bitcoin Network / Network | PLANNED |
| MSC-GUIDE-027 | page-role:topic-guide | Blockchain | The Bitcoin Network | Network | Understand the Network | Shallow | Explainer | Phase 8.03: The Bitcoin Network / Network | PLANNED |
| MSC-GUIDE-028 | page-role:topic-guide | Hashrate | The Bitcoin Network | Network | Understand the Network | Shallow | Explainer | Phase 8.04: The Bitcoin Network / Network | PLANNED |
| MSC-GUIDE-029 | page-role:topic-guide | Proof of Work | The Bitcoin Network | Consensus | Understand the Network | Shallow | Explainer | Phase 9.01: The Bitcoin Network / Consensus | PLANNED |
| MSC-GUIDE-030 | page-role:topic-guide | Consensus | The Bitcoin Network | Consensus | Understand the Network | Deep | Technical Analysis | Phase 9.02: The Bitcoin Network / Consensus | PLANNED |
| MSC-GUIDE-031 | page-role:topic-guide | Soft Forks | The Bitcoin Network | Consensus | Understand the Network | Deep | Explainer | Phase 9.03: The Bitcoin Network / Consensus | PLANNED |
| MSC-GUIDE-032 | page-role:topic-guide | Network Upgrades | The Bitcoin Network | Consensus | Understand the Network | Deep | History | Phase 9.04: The Bitcoin Network / Consensus | PLANNED |
| MSC-GUIDE-033 | page-role:topic-guide | Lightning Network | Building on Bitcoin | Layer 2 | Build on Bitcoin | Shallow | Explainer | Phase 10.01: Building on Bitcoin / Layer 2 | PLANNED |
| MSC-GUIDE-034 | page-role:topic-guide | Ark | Building on Bitcoin | Layer 2 | Build on Bitcoin | Deep | Technical Analysis | Phase 10.02: Building on Bitcoin / Layer 2 | PLANNED |
| MSC-GUIDE-035 | page-role:topic-guide | RGB | Building on Bitcoin | Layer 2 | Build on Bitcoin | Deep | Technical Analysis | Phase 10.03: Building on Bitcoin / Layer 2 | PLANNED |
| MSC-GUIDE-036 | page-role:topic-guide | Sidechains | Building on Bitcoin | Layer 2 | Build on Bitcoin | Deep | Comparison | Phase 10.04: Building on Bitcoin / Layer 2 | PLANNED |
| MSC-GUIDE-037 | page-role:topic-guide | Ordinals | Building on Bitcoin | Digital Assets | Build on Bitcoin | Shallow | Explainer | Phase 11.01: Building on Bitcoin / Digital Assets | PLANNED |
| MSC-GUIDE-038 | page-role:topic-guide | Runes | Building on Bitcoin | Digital Assets | Build on Bitcoin | Deep | Technical Analysis | Phase 11.02: Building on Bitcoin / Digital Assets | PLANNED |
| MSC-GUIDE-039 | page-role:topic-guide | BRC-20 | Building on Bitcoin | Digital Assets | Build on Bitcoin | Deep | Technical Analysis | Phase 11.03: Building on Bitcoin / Digital Assets | PLANNED |
| MSC-GUIDE-040 | page-role:topic-guide | Inscriptions | Building on Bitcoin | Digital Assets | Build on Bitcoin | Shallow | Explainer | Phase 11.04: Building on Bitcoin / Digital Assets | PLANNED |
| MSC-GUIDE-041 | page-role:topic-guide | Developer Tools | Building on Bitcoin | Development | Build on Bitcoin | Shallow | Reference | Phase 12.01: Building on Bitcoin / Development | PLANNED |
| MSC-GUIDE-042 | page-role:topic-guide | Wallet Integrations | Building on Bitcoin | Development | Build on Bitcoin | Deep | Guide | Phase 12.02: Building on Bitcoin / Development | PLANNED |
| MSC-GUIDE-043 | page-role:topic-guide | APIs | Building on Bitcoin | Development | Build on Bitcoin | Shallow | Reference | Phase 12.03: Building on Bitcoin / Development | PLANNED |
| MSC-GUIDE-044 | page-role:topic-guide | Indexers | Building on Bitcoin | Development | Build on Bitcoin | Deep | Technical Analysis | Phase 12.04: Building on Bitcoin / Development | PLANNED |
| MSC-GUIDE-045 | page-role:topic-guide | BitVM | Building on Bitcoin | Innovation | Build on Bitcoin | Trench | Technical Analysis | Phase 13.01: Building on Bitcoin / Innovation | PLANNED |
| MSC-GUIDE-046 | page-role:topic-guide | DLCs | Building on Bitcoin | Innovation | Build on Bitcoin | Deep | Technical Analysis | Phase 13.02: Building on Bitcoin / Innovation | PLANNED |
| MSC-GUIDE-047 | page-role:topic-guide | OP_CAT | Building on Bitcoin | Innovation | Build on Bitcoin | Trench | Technical Analysis | Phase 13.03: Building on Bitcoin / Innovation | PLANNED |
| MSC-GUIDE-048 | page-role:topic-guide | Emerging Protocols | Building on Bitcoin | Innovation | Build on Bitcoin | Deep | Comparison | Phase 13.04: Building on Bitcoin / Innovation | PLANNED |
| MSC-GUIDE-049 | page-role:topic-guide | Bitcoin Core | Bitcoin Development | Bitcoin Core | Build on Bitcoin | Shallow | Explainer | Phase 14.01: Bitcoin Development / Bitcoin Core | PLANNED |
| MSC-GUIDE-050 | page-role:topic-guide | Bitcoin Knots | Bitcoin Development | Bitcoin Core | Build on Bitcoin | Shallow | Comparison | Phase 14.02: Bitcoin Development / Bitcoin Core | PLANNED |
| MSC-GUIDE-051 | page-role:topic-guide | Source Code | Bitcoin Development | Bitcoin Core | Build on Bitcoin | Deep | Guide | Phase 14.03: Bitcoin Development / Bitcoin Core | PLANNED |
| MSC-GUIDE-052 | page-role:topic-guide | Releases | Bitcoin Development | Bitcoin Core | Build on Bitcoin | Deep | Reference | Phase 14.04: Bitcoin Development / Bitcoin Core | PLANNED |
| MSC-GUIDE-053 | page-role:topic-guide | BIPs | Bitcoin Development | Protocols | Build on Bitcoin | Shallow | Explainer | Phase 15.01: Bitcoin Development / Protocols | PLANNED |
| MSC-GUIDE-054 | page-role:topic-guide | Script | Bitcoin Development | Protocols | Build on Bitcoin | Deep | Technical Analysis | Phase 15.02: Bitcoin Development / Protocols | PLANNED |
| MSC-GUIDE-055 | page-role:topic-guide | Taproot | Bitcoin Development | Protocols | Build on Bitcoin | Deep | Explainer | Phase 15.03: Bitcoin Development / Protocols | PLANNED |
| MSC-GUIDE-056 | page-role:topic-guide | SegWit | Bitcoin Development | Protocols | Build on Bitcoin | Deep | History | Phase 15.04: Bitcoin Development / Protocols | PLANNED |
| MSC-GUIDE-057 | page-role:topic-guide | Schnorr Signatures | Bitcoin Development | Cryptography | Build on Bitcoin | Deep | Technical Analysis | Phase 16.01: Bitcoin Development / Cryptography | PLANNED |
| MSC-GUIDE-058 | page-role:topic-guide | Digital Signatures | Bitcoin Development | Cryptography | Understand the Network | Shallow | Explainer | Phase 16.02: Bitcoin Development / Cryptography | PLANNED |
| MSC-GUIDE-059 | page-role:topic-guide | Hash Functions | Bitcoin Development | Cryptography | Understand the Network | Shallow | Explainer | Phase 16.03: Bitcoin Development / Cryptography | PLANNED |
| MSC-GUIDE-060 | page-role:topic-guide | Merkle Trees | Bitcoin Development | Cryptography | Understand the Network | Shallow | Explainer | Phase 16.04: Bitcoin Development / Cryptography | PLANNED |
| MSC-GUIDE-061 | page-role:topic-guide | RPC | Bitcoin Development | Infrastructure | Build on Bitcoin | Deep | Reference | Phase 17.01: Bitcoin Development / Infrastructure | PLANNED |
| MSC-GUIDE-062 | page-role:topic-guide | Development Environment | Bitcoin Development | Infrastructure | Build on Bitcoin | Deep | Walkthrough | Phase 17.02: Bitcoin Development / Infrastructure | PLANNED |
| MSC-GUIDE-063 | page-role:topic-guide | Testing | Bitcoin Development | Infrastructure | Build on Bitcoin | Deep | Guide | Phase 17.03: Bitcoin Development / Infrastructure | PLANNED |
| MSC-GUIDE-064 | page-role:topic-guide | Running Infrastructure | Bitcoin Development | Infrastructure | Build on Bitcoin | Deep | Guide | Phase 17.04: Bitcoin Development / Infrastructure | PLANNED |
| MSC-GUIDE-065 | page-role:topic-guide | Builders | Bitcoin Ecosystem | People | Explore the Ecosystem | Surface | Ecosystem Overview | Phase 18.01: Bitcoin Ecosystem / People | PLANNED |
| MSC-GUIDE-066 | page-role:topic-guide | Developers | Bitcoin Ecosystem | People | Explore the Ecosystem | Surface | Ecosystem Overview | Phase 18.02: Bitcoin Ecosystem / People | PLANNED |
| MSC-GUIDE-067 | page-role:topic-guide | Artists | Bitcoin Ecosystem | People | Explore the Ecosystem | Surface | Ecosystem Overview | Phase 18.03: Bitcoin Ecosystem / People | PLANNED |
| MSC-GUIDE-068 | page-role:topic-guide | Industry Leaders | Bitcoin Ecosystem | People | Explore the Ecosystem | Shallow | Ecosystem Overview | Phase 18.04: Bitcoin Ecosystem / People | PLANNED |
| MSC-GUIDE-069 | page-role:topic-guide | Public Companies | Bitcoin Ecosystem | Companies | Explore the Ecosystem | Shallow | Ecosystem Overview | Phase 19.01: Bitcoin Ecosystem / Companies | PLANNED |
| MSC-GUIDE-070 | page-role:topic-guide | Startups | Bitcoin Ecosystem | Companies | Explore the Ecosystem | Shallow | Ecosystem Overview | Phase 19.02: Bitcoin Ecosystem / Companies | PLANNED |
| MSC-GUIDE-071 | page-role:topic-guide | Mining Companies | Bitcoin Ecosystem | Companies | Explore the Ecosystem | Shallow | Ecosystem Overview | Phase 19.03: Bitcoin Ecosystem / Companies | PLANNED |
| MSC-GUIDE-072 | page-role:topic-guide | Infrastructure Companies | Bitcoin Ecosystem | Companies | Explore the Ecosystem | Shallow | Ecosystem Overview | Phase 19.04: Bitcoin Ecosystem / Companies | PLANNED |
| MSC-GUIDE-073 | page-role:topic-guide | Exchanges | Bitcoin Ecosystem | Markets | Explore the Ecosystem | Surface | Guide | Phase 20.01: Bitcoin Ecosystem / Markets | PLANNED |
| MSC-GUIDE-074 | page-role:topic-guide | Wallet Providers | Bitcoin Ecosystem | Markets | Explore the Ecosystem | Surface | Guide | Phase 20.02: Bitcoin Ecosystem / Markets | PLANNED |
| MSC-GUIDE-075 | page-role:topic-guide | Marketplaces | Bitcoin Ecosystem | Markets | Explore the Ecosystem | Surface | Ecosystem Overview | Phase 20.03: Bitcoin Ecosystem / Markets | PLANNED |
| MSC-GUIDE-076 | page-role:topic-guide | Service Providers | Bitcoin Ecosystem | Markets | Explore the Ecosystem | Surface | Ecosystem Overview | Phase 20.04: Bitcoin Ecosystem / Markets | PLANNED |
| MSC-GUIDE-077 | page-role:topic-guide | Conferences | Bitcoin Ecosystem | Community | Explore the Ecosystem | Surface | Ecosystem Overview | Phase 21.01: Bitcoin Ecosystem / Community | PLANNED |
| MSC-GUIDE-078 | page-role:topic-guide | Communities | Bitcoin Ecosystem | Community | Explore the Ecosystem | Surface | Ecosystem Overview | Phase 21.02: Bitcoin Ecosystem / Community | PLANNED |
| MSC-GUIDE-079 | page-role:topic-guide | Historical Milestones | Bitcoin Ecosystem | Community | Explore the Ecosystem | Surface | History | Phase 21.03: Bitcoin Ecosystem / Community | PLANNED |
| MSC-GUIDE-080 | page-role:topic-guide | Open-Source Projects | Bitcoin Ecosystem | Community | Explore the Ecosystem | Shallow | Ecosystem Overview | Phase 21.04: Bitcoin Ecosystem / Community | PLANNED |

## PART 3: CATEGORY HUB RECORDS

### MSC-HUB-BASICS: Bitcoin Basics

**Registry ID:**
MSC-HUB-BASICS

**Page role:**
page-role:category-hub

**Display label:**
Bitcoin Basics

**Final recommended H1:**
Bitcoin Basics

**Recommended slug:**
learn-bitcoin-basics

**Status:**
PLANNED

**Production order:**
Phase 1.02: hub skeleton; finalize after Phase 5

**Parent destination:**
MSC-LRN-HOME | Learn

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Basics

**Learn subcategory:**
All four approved subcategories

**Subcategory anchor:**
#foundations; #using-bitcoin; #security; #essentials

**Primary learning path:**
Start With Bitcoin

**Secondary learning paths:**
- Use Bitcoin Safely
- Understand the Network

**Depth level:**
Surface

**Content format:**
Learning Index

**Target reader:**
New Bitcoin readers and users who want a durable foundation before moving into network or development topics.

**Reader search intent:**
Navigational and educational: browse the complete Bitcoin Basics guide collection and choose a learning order.

**Primary search phrase:**
bitcoin basics

**Related search phrases:**
- learn bitcoin basics
- bitcoin basics guides
- bitcoin basics topics

**Supporting subject tags:**
- bitcoin-basics
- education
- learning-index

**Prerequisite guides:**
- None. The hub provides its own orientation.

**Previous guide:**
None. This is the first category.

**Next guide:**
MSC-HUB-NETWORK | The Bitcoin Network

**Recommended branch guide:**
MSC-PATH-START | Start With Bitcoin

**Return destination:**
MSC-LRN-HOME | Learn

**Recommended learning path continuation:**
Begin with MSC-GUIDE-001 | What Is Bitcoin?, then follow the 16-guide canonical category order.

**Related category hub:**
MSC-HUB-NETWORK | The Bitcoin Network

**Related glossary terms:**
- Bitcoin
- Bitcoin's purpose
- Bitcoin history
- Satoshi Nakamoto
- Wallet
- Self-Custody

**Potential related editorials:**
- Published Explore pieces tagged to Bitcoin Basics subjects
- Interviews and Highlights that demonstrate category concepts in practice

**Suggested card description:**
A calm starting point for Bitcoin fundamentals, ownership, transactions, security, and the concepts readers will meet throughout the rest of the library.

**Suggested card action label:**
Explore the category

**Suggested article length:**
1,200 to 1,800 words plus 16 guide cards

**Suggested reading time range:**
6 to 9 minutes, excluding guide cards

**Required research notes:**
Audit all 16 guide records, active editorial links, and Tools connections before finalizing the hub.

**Special accuracy concerns:**
Only PUBLISHED guides with confirmed URLs may appear as active public cards. PLANNED and DRAFT destinations remain internal registry records and hidden from public guide grids. Do not display empty cards, placeholder links, disabled article cards, or Coming Soon guide grids.

**Internal link opportunities:**
- Sixteen topic guides: MSC-GUIDE-001, MSC-GUIDE-002, MSC-GUIDE-003, MSC-GUIDE-004, MSC-GUIDE-005, MSC-GUIDE-006, MSC-GUIDE-007, MSC-GUIDE-008, MSC-GUIDE-009, MSC-GUIDE-010, MSC-GUIDE-011, MSC-GUIDE-012, MSC-GUIDE-013, MSC-GUIDE-014, MSC-GUIDE-015, MSC-GUIDE-016
- Learning paths: Start With Bitcoin, Use Bitcoin Safely, Understand the Network
- Relevant Explore editorials when active
- Relevant Tools pages when active
- Glossary index

**Future content opportunities:**
- Recently updated guides section driven by real publication data
- Category-specific editor's picks based on reader needs

**Proposed Codex tags:**
- type:learn
- page-role:category-hub
- learn-category:bitcoin-basics
- path:start-with-bitcoin
- path:use-bitcoin-safely
- path:understand-the-network
- format:learning-index

**Hub purpose:**
Give readers the concepts and practical habits needed to understand, hold, and use bitcoin with confidence.

**Subcategory sections:**
| display | anchor | guide_ids |
|---|---|---|
| Foundations | #foundations | ['MSC-GUIDE-001', 'MSC-GUIDE-002', 'MSC-GUIDE-003', 'MSC-GUIDE-004'] |
| Using Bitcoin | #using-bitcoin | ['MSC-GUIDE-005', 'MSC-GUIDE-006', 'MSC-GUIDE-007', 'MSC-GUIDE-008'] |
| Security | #security | ['MSC-GUIDE-009', 'MSC-GUIDE-010', 'MSC-GUIDE-011', 'MSC-GUIDE-012'] |
| Essentials | #essentials | ['MSC-GUIDE-013', 'MSC-GUIDE-014', 'MSC-GUIDE-015', 'MSC-GUIDE-016'] |

**Canonical guide sequence:**
- MSC-GUIDE-001 | What Is Bitcoin?
- MSC-GUIDE-002 | Why Does Bitcoin Matter?
- MSC-GUIDE-003 | A History of Bitcoin
- MSC-GUIDE-004 | Who Was Satoshi Nakamoto?
- MSC-GUIDE-005 | What Is a Bitcoin Wallet?
- MSC-GUIDE-006 | What Is Bitcoin Self-Custody?
- MSC-GUIDE-007 | How to Send and Receive Bitcoin
- MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- MSC-GUIDE-009 | What Is a Bitcoin Seed Phrase?
- MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work
- MSC-GUIDE-011 | How to Keep Bitcoin Secure
- MSC-GUIDE-012 | How Bitcoin Privacy Works
- MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
- MSC-GUIDE-014 | How Bitcoin Confirmations Work
- MSC-GUIDE-015 | What Is the Bitcoin Halving?
- MSC-GUIDE-016 | Bitcoin Best Practices for Safe Everyday Use

**Previous category:**
None. This is the first category.

**Next category:**
MSC-HUB-NETWORK | The Bitcoin Network

**Finalize timing:**
After all 16 category guides have approved copy in Phase 5; activate links only as each page publishes.

### MSC-HUB-NETWORK: The Bitcoin Network

**Registry ID:**
MSC-HUB-NETWORK

**Page role:**
page-role:category-hub

**Display label:**
The Bitcoin Network

**Final recommended H1:**
The Bitcoin Network

**Recommended slug:**
learn-bitcoin-network

**Status:**
PLANNED

**Production order:**
Phase 1.03: hub skeleton; finalize after Phase 9

**Parent destination:**
MSC-LRN-HOME | Learn

**Parent category:**
Learn

**Primary Learn category:**
The Bitcoin Network

**Learn subcategory:**
All four approved subcategories

**Subcategory anchor:**
#mining; #nodes; #network; #consensus

**Primary learning path:**
Understand the Network

**Secondary learning paths:**
- Build on Bitcoin

**Depth level:**
Surface

**Content format:**
Learning Index

**Target reader:**
Readers who know basic Bitcoin terms and want to understand the machinery beneath everyday use.

**Reader search intent:**
Navigational and educational: browse the complete The Bitcoin Network guide collection and choose a learning order.

**Primary search phrase:**
the bitcoin network

**Related search phrases:**
- learn the bitcoin network
- the bitcoin network guides
- the bitcoin network topics

**Supporting subject tags:**
- bitcoin-network
- education
- learning-index

**Prerequisite guides:**
- None. The hub provides its own orientation.

**Previous guide:**
MSC-HUB-BASICS | Bitcoin Basics

**Next guide:**
MSC-HUB-BUILDING | Building on Bitcoin

**Recommended branch guide:**
MSC-PATH-NETWORK | Understand the Network

**Return destination:**
MSC-LRN-HOME | Learn

**Recommended learning path continuation:**
Begin with MSC-GUIDE-017 | How Bitcoin Mining Works, then follow the 16-guide canonical category order.

**Related category hub:**
MSC-HUB-BUILDING | Building on Bitcoin

**Related glossary terms:**
- Mining
- Mining pool
- ASIC miner
- Difficulty adjustment
- Full node
- Pruned node

**Potential related editorials:**
- Published Explore pieces tagged to The Bitcoin Network subjects
- Interviews and Highlights that demonstrate category concepts in practice

**Suggested card description:**
A guided view of the systems that validate transactions, produce blocks, coordinate consensus, and keep Bitcoin resistant to unilateral control.

**Suggested card action label:**
Explore the category

**Suggested article length:**
1,200 to 1,800 words plus 16 guide cards

**Suggested reading time range:**
6 to 9 minutes, excluding guide cards

**Required research notes:**
Audit all 16 guide records, active editorial links, and Tools connections before finalizing the hub.

**Special accuracy concerns:**
Only PUBLISHED guides with confirmed URLs may appear as active public cards. PLANNED and DRAFT destinations remain internal registry records and hidden from public guide grids. Do not display empty cards, placeholder links, disabled article cards, or Coming Soon guide grids.

**Internal link opportunities:**
- Sixteen topic guides: MSC-GUIDE-017, MSC-GUIDE-018, MSC-GUIDE-019, MSC-GUIDE-020, MSC-GUIDE-021, MSC-GUIDE-022, MSC-GUIDE-023, MSC-GUIDE-024, MSC-GUIDE-025, MSC-GUIDE-026, MSC-GUIDE-027, MSC-GUIDE-028, MSC-GUIDE-029, MSC-GUIDE-030, MSC-GUIDE-031, MSC-GUIDE-032
- Learning paths: Understand the Network, Build on Bitcoin
- Relevant Explore editorials when active
- Relevant Tools pages when active
- Glossary index

**Future content opportunities:**
- Recently updated guides section driven by real publication data
- Category-specific editor's picks based on reader needs

**Proposed Codex tags:**
- type:learn
- page-role:category-hub
- learn-category:bitcoin-network
- path:understand-the-network
- path:build-on-bitcoin
- format:learning-index

**Hub purpose:**
Explain how transactions, nodes, miners, blocks, and consensus keep Bitcoin operating.

**Subcategory sections:**
| display | anchor | guide_ids |
|---|---|---|
| Mining | #mining | ['MSC-GUIDE-017', 'MSC-GUIDE-018', 'MSC-GUIDE-019', 'MSC-GUIDE-020'] |
| Nodes | #nodes | ['MSC-GUIDE-021', 'MSC-GUIDE-022', 'MSC-GUIDE-023', 'MSC-GUIDE-024'] |
| Network | #network | ['MSC-GUIDE-025', 'MSC-GUIDE-026', 'MSC-GUIDE-027', 'MSC-GUIDE-028'] |
| Consensus | #consensus | ['MSC-GUIDE-029', 'MSC-GUIDE-030', 'MSC-GUIDE-031', 'MSC-GUIDE-032'] |

**Canonical guide sequence:**
- MSC-GUIDE-017 | How Bitcoin Mining Works
- MSC-GUIDE-018 | How Bitcoin Mining Pools Work
- MSC-GUIDE-019 | What Is an ASIC Miner?
- MSC-GUIDE-020 | How Bitcoin's Difficulty Adjustment Works
- MSC-GUIDE-021 | What Is a Bitcoin Full Node?
- MSC-GUIDE-022 | What Is a Pruned Bitcoin Node?
- MSC-GUIDE-023 | How to Run a Bitcoin Node
- MSC-GUIDE-024 | Bitcoin Node Software Explained
- MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?
- MSC-GUIDE-026 | How Bitcoin Blocks Work
- MSC-GUIDE-027 | How the Bitcoin Blockchain Works
- MSC-GUIDE-028 | What Is Bitcoin Hashrate?
- MSC-GUIDE-029 | How Bitcoin Proof of Work Secures the Network
- MSC-GUIDE-030 | How Bitcoin Reaches Consensus
- MSC-GUIDE-031 | How Bitcoin Soft Forks Work
- MSC-GUIDE-032 | How Bitcoin Network Upgrades Happen

**Previous category:**
MSC-HUB-BASICS | Bitcoin Basics

**Next category:**
MSC-HUB-BUILDING | Building on Bitcoin

**Finalize timing:**
After all 16 category guides have approved copy in Phase 9; activate links only as each page publishes.

### MSC-HUB-BUILDING: Building on Bitcoin

**Registry ID:**
MSC-HUB-BUILDING

**Page role:**
page-role:category-hub

**Display label:**
Building on Bitcoin

**Final recommended H1:**
Building on Bitcoin

**Recommended slug:**
learn-building-on-bitcoin

**Status:**
PLANNED

**Production order:**
Phase 1.04: hub skeleton; finalize after Phase 13

**Parent destination:**
MSC-LRN-HOME | Learn

**Parent category:**
Learn

**Primary Learn category:**
Building on Bitcoin

**Learn subcategory:**
All four approved subcategories

**Subcategory anchor:**
#layer-2; #digital-assets; #development; #innovation

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Understand the Network
- Explore the Ecosystem

**Depth level:**
Surface

**Content format:**
Learning Index

**Target reader:**
Informed users, builders, and technically curious readers evaluating Bitcoin application layers and experiments.

**Reader search intent:**
Navigational and educational: browse the complete Building on Bitcoin guide collection and choose a learning order.

**Primary search phrase:**
building on bitcoin

**Related search phrases:**
- learn building on bitcoin
- building on bitcoin guides
- building on bitcoin topics

**Supporting subject tags:**
- building-on-bitcoin
- education
- learning-index

**Prerequisite guides:**
- None. The hub provides its own orientation.

**Previous guide:**
MSC-HUB-NETWORK | The Bitcoin Network

**Next guide:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Recommended branch guide:**
MSC-PATH-BUILD | Build on Bitcoin

**Return destination:**
MSC-LRN-HOME | Learn

**Recommended learning path continuation:**
Begin with MSC-GUIDE-033 | How the Lightning Network Works, then follow the 16-guide canonical category order.

**Related category hub:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Related glossary terms:**
- Lightning Network
- Ark
- RGB
- Sidechain
- Ordinals
- Runes

**Potential related editorials:**
- Published Explore pieces tagged to Building on Bitcoin subjects
- Interviews and Highlights that demonstrate category concepts in practice

**Suggested card description:**
A technically grounded map of payments, asset protocols, developer infrastructure, and emerging experiments without treating novelty as proof of value.

**Suggested card action label:**
Explore the category

**Suggested article length:**
1,200 to 1,800 words plus 16 guide cards

**Suggested reading time range:**
6 to 9 minutes, excluding guide cards

**Required research notes:**
Audit all 16 guide records, active editorial links, and Tools connections before finalizing the hub.

**Special accuracy concerns:**
Only PUBLISHED guides with confirmed URLs may appear as active public cards. PLANNED and DRAFT destinations remain internal registry records and hidden from public guide grids. Do not display empty cards, placeholder links, disabled article cards, or Coming Soon guide grids.

**Internal link opportunities:**
- Sixteen topic guides: MSC-GUIDE-033, MSC-GUIDE-034, MSC-GUIDE-035, MSC-GUIDE-036, MSC-GUIDE-037, MSC-GUIDE-038, MSC-GUIDE-039, MSC-GUIDE-040, MSC-GUIDE-041, MSC-GUIDE-042, MSC-GUIDE-043, MSC-GUIDE-044, MSC-GUIDE-045, MSC-GUIDE-046, MSC-GUIDE-047, MSC-GUIDE-048
- Learning paths: Build on Bitcoin, Understand the Network, Explore the Ecosystem
- Relevant Explore editorials when active
- Relevant Tools pages when active
- Glossary index

**Future content opportunities:**
- Recently updated guides section driven by real publication data
- Category-specific editor's picks based on reader needs

**Proposed Codex tags:**
- type:learn
- page-role:category-hub
- learn-category:building-on-bitcoin
- path:build-on-bitcoin
- path:understand-the-network
- path:explore-the-ecosystem
- format:learning-index

**Hub purpose:**
Help readers evaluate protocols, applications, assets, and scaling systems built on or around Bitcoin.

**Subcategory sections:**
| display | anchor | guide_ids |
|---|---|---|
| Layer 2 | #layer-2 | ['MSC-GUIDE-033', 'MSC-GUIDE-034', 'MSC-GUIDE-035', 'MSC-GUIDE-036'] |
| Digital Assets | #digital-assets | ['MSC-GUIDE-037', 'MSC-GUIDE-038', 'MSC-GUIDE-039', 'MSC-GUIDE-040'] |
| Development | #development | ['MSC-GUIDE-041', 'MSC-GUIDE-042', 'MSC-GUIDE-043', 'MSC-GUIDE-044'] |
| Innovation | #innovation | ['MSC-GUIDE-045', 'MSC-GUIDE-046', 'MSC-GUIDE-047', 'MSC-GUIDE-048'] |

**Canonical guide sequence:**
- MSC-GUIDE-033 | How the Lightning Network Works
- MSC-GUIDE-034 | What Is Ark on Bitcoin?
- MSC-GUIDE-035 | How RGB Works on Bitcoin
- MSC-GUIDE-036 | Bitcoin Sidechains Explained
- MSC-GUIDE-037 | What Are Bitcoin Ordinals?
- MSC-GUIDE-038 | How the Runes Protocol Works
- MSC-GUIDE-039 | What Is BRC-20 on Bitcoin?
- MSC-GUIDE-040 | What Is a Bitcoin Inscription?
- MSC-GUIDE-041 | Bitcoin Developer Tools: A Practical Overview
- MSC-GUIDE-042 | How Bitcoin Wallet Integrations Work
- MSC-GUIDE-043 | Bitcoin APIs Explained
- MSC-GUIDE-044 | How Bitcoin Indexers Work
- MSC-GUIDE-045 | What Is BitVM?
- MSC-GUIDE-046 | How Discreet Log Contracts Work
- MSC-GUIDE-047 | What Is OP_CAT?
- MSC-GUIDE-048 | Emerging Protocols on Bitcoin: How to Evaluate Them

**Previous category:**
MSC-HUB-NETWORK | The Bitcoin Network

**Next category:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Finalize timing:**
After all 16 category guides have approved copy in Phase 13; activate links only as each page publishes.

### MSC-HUB-DEVELOPMENT: Bitcoin Development

**Registry ID:**
MSC-HUB-DEVELOPMENT

**Page role:**
page-role:category-hub

**Display label:**
Bitcoin Development

**Final recommended H1:**
Bitcoin Development

**Recommended slug:**
learn-bitcoin-development

**Status:**
PLANNED

**Production order:**
Phase 1.05: hub skeleton; finalize after Phase 17

**Parent destination:**
MSC-LRN-HOME | Learn

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Development

**Learn subcategory:**
All four approved subcategories

**Subcategory anchor:**
#bitcoin-core; #protocols; #cryptography; #infrastructure

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Understand the Network

**Depth level:**
Surface

**Content format:**
Learning Index

**Target reader:**
Developers, operators, and technically serious readers who want to understand how Bitcoin software is designed and maintained.

**Reader search intent:**
Navigational and educational: browse the complete Bitcoin Development guide collection and choose a learning order.

**Primary search phrase:**
bitcoin development

**Related search phrases:**
- learn bitcoin development
- bitcoin development guides
- bitcoin development topics

**Supporting subject tags:**
- bitcoin-development
- education
- learning-index

**Prerequisite guides:**
- None. The hub provides its own orientation.

**Previous guide:**
MSC-HUB-BUILDING | Building on Bitcoin

**Next guide:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Recommended branch guide:**
MSC-PATH-BUILD | Build on Bitcoin

**Return destination:**
MSC-LRN-HOME | Learn

**Recommended learning path continuation:**
Begin with MSC-GUIDE-049 | What Is Bitcoin Core?, then follow the 16-guide canonical category order.

**Related category hub:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Related glossary terms:**
- Bitcoin Core
- Bitcoin Knots
- Source code
- Software release
- BIP
- Bitcoin Script

**Potential related editorials:**
- Published Explore pieces tagged to Bitcoin Development subjects
- Interviews and Highlights that demonstrate category concepts in practice

**Suggested card description:**
A practical and technical route through Bitcoin Core, protocol proposals, cryptographic building blocks, development workflows, and reliable infrastructure.

**Suggested card action label:**
Explore the category

**Suggested article length:**
1,200 to 1,800 words plus 16 guide cards

**Suggested reading time range:**
6 to 9 minutes, excluding guide cards

**Required research notes:**
Audit all 16 guide records, active editorial links, and Tools connections before finalizing the hub.

**Special accuracy concerns:**
Only PUBLISHED guides with confirmed URLs may appear as active public cards. PLANNED and DRAFT destinations remain internal registry records and hidden from public guide grids. Do not display empty cards, placeholder links, disabled article cards, or Coming Soon guide grids.

**Internal link opportunities:**
- Sixteen topic guides: MSC-GUIDE-049, MSC-GUIDE-050, MSC-GUIDE-051, MSC-GUIDE-052, MSC-GUIDE-053, MSC-GUIDE-054, MSC-GUIDE-055, MSC-GUIDE-056, MSC-GUIDE-057, MSC-GUIDE-058, MSC-GUIDE-059, MSC-GUIDE-060, MSC-GUIDE-061, MSC-GUIDE-062, MSC-GUIDE-063, MSC-GUIDE-064
- Learning paths: Build on Bitcoin, Understand the Network
- Relevant Explore editorials when active
- Relevant Tools pages when active
- Glossary index

**Future content opportunities:**
- Recently updated guides section driven by real publication data
- Category-specific editor's picks based on reader needs

**Proposed Codex tags:**
- type:learn
- page-role:category-hub
- learn-category:bitcoin-development
- path:build-on-bitcoin
- path:understand-the-network
- format:learning-index

**Hub purpose:**
Explain Bitcoin software, protocol development, cryptography, testing, and infrastructure at several depths.

**Subcategory sections:**
| display | anchor | guide_ids |
|---|---|---|
| Bitcoin Core | #bitcoin-core | ['MSC-GUIDE-049', 'MSC-GUIDE-050', 'MSC-GUIDE-051', 'MSC-GUIDE-052'] |
| Protocols | #protocols | ['MSC-GUIDE-053', 'MSC-GUIDE-054', 'MSC-GUIDE-055', 'MSC-GUIDE-056'] |
| Cryptography | #cryptography | ['MSC-GUIDE-057', 'MSC-GUIDE-058', 'MSC-GUIDE-059', 'MSC-GUIDE-060'] |
| Infrastructure | #infrastructure | ['MSC-GUIDE-061', 'MSC-GUIDE-062', 'MSC-GUIDE-063', 'MSC-GUIDE-064'] |

**Canonical guide sequence:**
- MSC-GUIDE-049 | What Is Bitcoin Core?
- MSC-GUIDE-050 | What Is Bitcoin Knots?
- MSC-GUIDE-051 | How to Read the Bitcoin Source Code
- MSC-GUIDE-052 | How Bitcoin Core Releases Work
- MSC-GUIDE-053 | How Bitcoin Improvement Proposals Work
- MSC-GUIDE-054 | How Bitcoin Script Works
- MSC-GUIDE-055 | How Taproot Changed Bitcoin
- MSC-GUIDE-056 | How SegWit Changed Bitcoin
- MSC-GUIDE-057 | How Schnorr Signatures Work in Bitcoin
- MSC-GUIDE-058 | How Digital Signatures Work in Bitcoin
- MSC-GUIDE-059 | How Hash Functions Work in Bitcoin
- MSC-GUIDE-060 | How Merkle Trees Work in Bitcoin
- MSC-GUIDE-061 | How Bitcoin RPC Works
- MSC-GUIDE-062 | How to Set Up a Bitcoin Development Environment
- MSC-GUIDE-063 | How Bitcoin Software Is Tested
- MSC-GUIDE-064 | How to Run Reliable Bitcoin Infrastructure

**Previous category:**
MSC-HUB-BUILDING | Building on Bitcoin

**Next category:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Finalize timing:**
After all 16 category guides have approved copy in Phase 17; activate links only as each page publishes.

### MSC-HUB-ECOSYSTEM: Bitcoin Ecosystem

**Registry ID:**
MSC-HUB-ECOSYSTEM

**Page role:**
page-role:category-hub

**Display label:**
Bitcoin Ecosystem

**Final recommended H1:**
Bitcoin Ecosystem

**Recommended slug:**
learn-bitcoin-ecosystem

**Status:**
PLANNED

**Production order:**
Phase 1.06: hub skeleton; finalize after Phase 21

**Parent destination:**
MSC-LRN-HOME | Learn

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Ecosystem

**Learn subcategory:**
All four approved subcategories

**Subcategory anchor:**
#people; #companies; #markets; #community

**Primary learning path:**
Explore the Ecosystem

**Secondary learning paths:**
- Start With Bitcoin
- Build on Bitcoin

**Depth level:**
Surface

**Content format:**
Learning Index

**Target reader:**
Readers who want to understand Bitcoin as an industry, culture, open-source movement, and adoption network.

**Reader search intent:**
Navigational and educational: browse the complete Bitcoin Ecosystem guide collection and choose a learning order.

**Primary search phrase:**
bitcoin ecosystem

**Related search phrases:**
- learn bitcoin ecosystem
- bitcoin ecosystem guides
- bitcoin ecosystem topics

**Supporting subject tags:**
- bitcoin-ecosystem
- education
- learning-index

**Prerequisite guides:**
- None. The hub provides its own orientation.

**Previous guide:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Next guide:**
None. This is the final category.

**Recommended branch guide:**
MSC-PATH-ECOSYSTEM | Explore the Ecosystem

**Return destination:**
MSC-LRN-HOME | Learn

**Recommended learning path continuation:**
Begin with MSC-GUIDE-065 | Who Builds on Bitcoin?, then follow the 16-guide canonical category order.

**Related category hub:**
MSC-HUB-BASICS | Bitcoin Basics

**Related glossary terms:**
- Builder
- Developer
- Artist
- Industry leader
- Public company
- Startup

**Potential related editorials:**
- Published Explore pieces tagged to Bitcoin Ecosystem subjects
- Interviews and Highlights that demonstrate category concepts in practice

**Suggested card description:**
An editorially disciplined guide to the incentives, institutions, people, and cultural forces surrounding Bitcoin.

**Suggested card action label:**
Explore the category

**Suggested article length:**
1,200 to 1,800 words plus 16 guide cards

**Suggested reading time range:**
6 to 9 minutes, excluding guide cards

**Required research notes:**
Audit all 16 guide records, active editorial links, and Tools connections before finalizing the hub.

**Special accuracy concerns:**
Only PUBLISHED guides with confirmed URLs may appear as active public cards. PLANNED and DRAFT destinations remain internal registry records and hidden from public guide grids. Do not display empty cards, placeholder links, disabled article cards, or Coming Soon guide grids.

**Internal link opportunities:**
- Sixteen topic guides: MSC-GUIDE-065, MSC-GUIDE-066, MSC-GUIDE-067, MSC-GUIDE-068, MSC-GUIDE-069, MSC-GUIDE-070, MSC-GUIDE-071, MSC-GUIDE-072, MSC-GUIDE-073, MSC-GUIDE-074, MSC-GUIDE-075, MSC-GUIDE-076, MSC-GUIDE-077, MSC-GUIDE-078, MSC-GUIDE-079, MSC-GUIDE-080
- Learning paths: Explore the Ecosystem, Start With Bitcoin, Build on Bitcoin
- Relevant Explore editorials when active
- Relevant Tools pages when active
- Glossary index

**Future content opportunities:**
- Recently updated guides section driven by real publication data
- Category-specific editor's picks based on reader needs

**Proposed Codex tags:**
- type:learn
- page-role:category-hub
- learn-category:bitcoin-ecosystem
- path:explore-the-ecosystem
- path:start-with-bitcoin
- path:build-on-bitcoin
- format:learning-index

**Hub purpose:**
Explain the people, organizations, markets, and communities that shape Bitcoin without becoming a promotional directory.

**Subcategory sections:**
| display | anchor | guide_ids |
|---|---|---|
| People | #people | ['MSC-GUIDE-065', 'MSC-GUIDE-066', 'MSC-GUIDE-067', 'MSC-GUIDE-068'] |
| Companies | #companies | ['MSC-GUIDE-069', 'MSC-GUIDE-070', 'MSC-GUIDE-071', 'MSC-GUIDE-072'] |
| Markets | #markets | ['MSC-GUIDE-073', 'MSC-GUIDE-074', 'MSC-GUIDE-075', 'MSC-GUIDE-076'] |
| Community | #community | ['MSC-GUIDE-077', 'MSC-GUIDE-078', 'MSC-GUIDE-079', 'MSC-GUIDE-080'] |

**Canonical guide sequence:**
- MSC-GUIDE-065 | Who Builds on Bitcoin?
- MSC-GUIDE-066 | What Bitcoin Developers Do
- MSC-GUIDE-067 | Bitcoin Artists and the Culture They Shape
- MSC-GUIDE-068 | How Bitcoin Industry Leaders Shape the Ecosystem
- MSC-GUIDE-069 | How Public Companies Participate in Bitcoin
- MSC-GUIDE-070 | How Bitcoin Startups Build and Compete
- MSC-GUIDE-071 | How Bitcoin Mining Companies Operate
- MSC-GUIDE-072 | What Bitcoin Infrastructure Companies Do
- MSC-GUIDE-073 | How Bitcoin Exchanges Work
- MSC-GUIDE-074 | How Bitcoin Wallet Providers Operate
- MSC-GUIDE-075 | How Bitcoin Marketplaces Work
- MSC-GUIDE-076 | What Bitcoin Service Providers Do
- MSC-GUIDE-077 | Why Bitcoin Conferences Matter
- MSC-GUIDE-078 | How Bitcoin Communities Form and Grow
- MSC-GUIDE-079 | Major Milestones in Bitcoin History
- MSC-GUIDE-080 | How Bitcoin Open-Source Projects Work

**Previous category:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Next category:**
None. This is the final category.

**Finalize timing:**
After all 16 category guides have approved copy in Phase 21; activate links only as each page publishes.

## PART 4: LEARNING PATH RECORDS

### MSC-PATH-START: Start With Bitcoin

**Registry ID:**
MSC-PATH-START

**Page role:**
page-role:learning-path

**Display label:**
Start With Bitcoin

**Final recommended H1:**
Start With Bitcoin

**Recommended slug:**
start-with-bitcoin

**Status:**
PLANNED

**Production order:**
Phase 1.07: path skeleton; Finalize after Phase 5, then refresh route links after Phase 9.

**Parent destination:**
MSC-LRN-HOME | Learn

**Parent category:**
Learn

**Primary Learn category:**
Not applicable. This is a cross-category learning route.

**Category relationships:**
- MSC-HUB-BASICS | Bitcoin Basics
- MSC-HUB-NETWORK | The Bitcoin Network

**Learn subcategory:**
Multiple canonical subcategories. The path does not own topic pages.

**Subcategory anchor:**
Not applicable

**Primary learning path:**
Start With Bitcoin

**Secondary learning paths:**
- Path can branch to the other four learning paths without duplicating guides.

**Depth level:**
Surface to Shallow, sequenced by prerequisite knowledge

**Content format:**
Learning Path

**Target reader:**
Readers with little or no prior Bitcoin knowledge.

**Reader search intent:**
Navigational and educational: follow a curated sequence for start with bitcoin.

**Primary search phrase:**
start with bitcoin

**Related search phrases:**
- start with bitcoin guide
- bitcoin learning path start with bitcoin
- bitcoin course path

**Supporting subject tags:**
- education
- learning-path
- start-with-bitcoin

**Prerequisite guides:**
- None. The path introduction directs readers to the correct entry point.

**Previous guide:**
MSC-LRN-HOME | Learn

**Next guide:**
MSC-GUIDE-001 | What Is Bitcoin?

**Recommended branch guide:**
Use Bitcoin Safely after the wallet introduction

**Return destination:**
MSC-LRN-HOME | Learn

**Recommended learning path continuation:**
Follow the recommended sequence from MSC-GUIDE-001 | What Is Bitcoin? to MSC-ROUTE-001 | How a Bitcoin Transaction Moves.

**Related category hub:**
MSC-HUB-BASICS | Bitcoin Basics; MSC-HUB-NETWORK | The Bitcoin Network

**Related glossary terms:**
- Bitcoin
- Wallet
- Transaction
- Node
- Consensus
- Open-Source

**Potential related editorials:**
- Selected editorials that demonstrate path concepts in current events
- Interviews that show the practical work behind the path

**Suggested card description:**
Build a clear first mental model of Bitcoin, then move from understanding to safe basic use.

**Suggested card action label:**
Start with Bitcoin

**Suggested article length:**
1,000 to 1,600 words plus route cards

**Suggested reading time range:**
5 to 8 minutes, excluding linked guides

**Required research notes:**
Confirm every public path step has status PUBLISHED and a confirmed URL before activation. Keep PLANNED and DRAFT steps internal and hidden. Recheck prerequisites whenever a guide changes depth.

**Special accuracy concerns:**
This is a cross-category route. It does not own duplicate article pages. Every active card must point to one published canonical topic guide, featured route, or other confirmed destination.

**Internal link opportunities:**
- All guides in the recommended sequence
- Primary category hubs
- Branching learning paths
- Featured route when relevant
- Glossary index
- Explore and Tools pages when active

**Future content opportunities:**
- Optional short route variants based on time available
- Progress tracking that stores state without duplicating content

**Proposed Codex tags:**
- type:learn
- page-role:learning-path
- path:start-with-bitcoin
- format:learning-path

**Purpose:**
Build a clear first mental model of Bitcoin, then move from understanding to safe basic use.

**Recommended sequence:**
- MSC-GUIDE-001 | What Is Bitcoin?
- MSC-GUIDE-002 | Why Does Bitcoin Matter?
- MSC-GUIDE-003 | A History of Bitcoin
- MSC-GUIDE-004 | Who Was Satoshi Nakamoto?
- MSC-GUIDE-005 | What Is a Bitcoin Wallet?
- MSC-GUIDE-006 | What Is Bitcoin Self-Custody?
- MSC-GUIDE-009 | What Is a Bitcoin Seed Phrase?
- MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work
- MSC-GUIDE-007 | How to Send and Receive Bitcoin
- MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- MSC-GUIDE-014 | How Bitcoin Confirmations Work
- MSC-GUIDE-016 | Bitcoin Best Practices for Safe Everyday Use
- MSC-ROUTE-001 | How a Bitcoin Transaction Moves

**Entry guide:**
MSC-GUIDE-001 | What Is Bitcoin?

**Final guide:**
MSC-ROUTE-001 | How a Bitcoin Transaction Moves

**Branching opportunities:**
- Use Bitcoin Safely after the wallet introduction
- Understand the Network after transactions and fees
- Explore the Ecosystem after Bitcoin history

**Suggested path introduction:**
Start with the purpose and history of Bitcoin, then learn the ownership and transaction concepts needed to use it without rushing past the basics.

**Suggested path action label:**
Start with Bitcoin

**Finalize timing:**
Finalize after Phase 5, then refresh route links after Phase 9.

### MSC-PATH-SAFE: Use Bitcoin Safely

**Registry ID:**
MSC-PATH-SAFE

**Page role:**
page-role:learning-path

**Display label:**
Use Bitcoin Safely

**Final recommended H1:**
Use Bitcoin Safely

**Recommended slug:**
use-bitcoin-safely

**Status:**
PLANNED

**Production order:**
Phase 1.08: path skeleton; Finalize the core path after Phase 5 and complete provider branches after Phase 20.

**Parent destination:**
MSC-LRN-HOME | Learn

**Parent category:**
Learn

**Primary Learn category:**
Not applicable. This is a cross-category learning route.

**Category relationships:**
- MSC-HUB-BASICS | Bitcoin Basics
- MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Learn subcategory:**
Multiple canonical subcategories. The path does not own topic pages.

**Subcategory anchor:**
Not applicable

**Primary learning path:**
Use Bitcoin Safely

**Secondary learning paths:**
- Path can branch to the other four learning paths without duplicating guides.

**Depth level:**
Surface to Shallow, sequenced by prerequisite knowledge

**Content format:**
Learning Path

**Target reader:**
New and intermediate users preparing to hold or move bitcoin.

**Reader search intent:**
Navigational and educational: follow a curated sequence for use bitcoin safely.

**Primary search phrase:**
use bitcoin safely

**Related search phrases:**
- use bitcoin safely guide
- bitcoin learning path use bitcoin safely
- bitcoin course path

**Supporting subject tags:**
- education
- learning-path
- use-bitcoin-safely

**Prerequisite guides:**
- None. The path introduction directs readers to the correct entry point.

**Previous guide:**
MSC-LRN-HOME | Learn

**Next guide:**
MSC-GUIDE-005 | What Is a Bitcoin Wallet?

**Recommended branch guide:**
Start With Bitcoin for missing fundamentals

**Return destination:**
MSC-LRN-HOME | Learn

**Recommended learning path continuation:**
Follow the recommended sequence from MSC-GUIDE-005 | What Is a Bitcoin Wallet? to MSC-GUIDE-074 | How Bitcoin Wallet Providers Operate.

**Related category hub:**
MSC-HUB-BASICS | Bitcoin Basics; MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Related glossary terms:**
- Bitcoin
- Wallet
- Transaction
- Node
- Consensus
- Open-Source

**Potential related editorials:**
- Selected editorials that demonstrate path concepts in current events
- Interviews that show the practical work behind the path

**Suggested card description:**
Help readers choose custody tools, protect recovery material, transact carefully, and understand privacy limits.

**Suggested card action label:**
Build safer habits

**Suggested article length:**
1,000 to 1,600 words plus route cards

**Suggested reading time range:**
5 to 8 minutes, excluding linked guides

**Required research notes:**
Confirm every public path step has status PUBLISHED and a confirmed URL before activation. Keep PLANNED and DRAFT steps internal and hidden. Recheck prerequisites whenever a guide changes depth.

**Special accuracy concerns:**
This is a cross-category route. It does not own duplicate article pages. Every active card must point to one published canonical topic guide, featured route, or other confirmed destination.

**Internal link opportunities:**
- All guides in the recommended sequence
- Primary category hubs
- Branching learning paths
- Featured route when relevant
- Glossary index
- Explore and Tools pages when active

**Future content opportunities:**
- Optional short route variants based on time available
- Progress tracking that stores state without duplicating content

**Proposed Codex tags:**
- type:learn
- page-role:learning-path
- path:use-bitcoin-safely
- format:learning-path

**Purpose:**
Help readers choose custody tools, protect recovery material, transact carefully, and understand privacy limits.

**Recommended sequence:**
- MSC-GUIDE-005 | What Is a Bitcoin Wallet?
- MSC-GUIDE-006 | What Is Bitcoin Self-Custody?
- MSC-GUIDE-009 | What Is a Bitcoin Seed Phrase?
- MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work
- MSC-GUIDE-011 | How to Keep Bitcoin Secure
- MSC-GUIDE-012 | How Bitcoin Privacy Works
- MSC-GUIDE-007 | How to Send and Receive Bitcoin
- MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- MSC-GUIDE-014 | How Bitcoin Confirmations Work
- MSC-GUIDE-016 | Bitcoin Best Practices for Safe Everyday Use
- MSC-GUIDE-074 | How Bitcoin Wallet Providers Operate

**Entry guide:**
MSC-GUIDE-005 | What Is a Bitcoin Wallet?

**Final guide:**
MSC-GUIDE-074 | How Bitcoin Wallet Providers Operate

**Branching opportunities:**
- Start With Bitcoin for missing fundamentals
- Understand the Network for UTXOs, fees, and confirmations
- Tools pages for wallet and node resources after those tools exist

**Suggested path introduction:**
Move from wallet basics into custody, recovery, transaction safety, privacy, and provider evaluation with a threat-model-first approach.

**Suggested path action label:**
Build safer habits

**Finalize timing:**
Finalize the core path after Phase 5 and complete provider branches after Phase 20.

### MSC-PATH-NETWORK: Understand the Network

**Registry ID:**
MSC-PATH-NETWORK

**Page role:**
page-role:learning-path

**Display label:**
Understand the Network

**Final recommended H1:**
Understand the Network

**Recommended slug:**
understand-the-network

**Status:**
PLANNED

**Production order:**
Phase 1.09: path skeleton; Finalize after Phase 9, then add cryptography branches after Phase 16.

**Parent destination:**
MSC-LRN-HOME | Learn

**Parent category:**
Learn

**Primary Learn category:**
Not applicable. This is a cross-category learning route.

**Category relationships:**
- MSC-HUB-BASICS | Bitcoin Basics
- MSC-HUB-NETWORK | The Bitcoin Network
- MSC-HUB-DEVELOPMENT | Bitcoin Development

**Learn subcategory:**
Multiple canonical subcategories. The path does not own topic pages.

**Subcategory anchor:**
Not applicable

**Primary learning path:**
Understand the Network

**Secondary learning paths:**
- Path can branch to the other four learning paths without duplicating guides.

**Depth level:**
Surface to Deep, sequenced by prerequisite knowledge

**Content format:**
Learning Path

**Target reader:**
Readers who know basic Bitcoin terms and want a systems-level understanding.

**Reader search intent:**
Navigational and educational: follow a curated sequence for understand the network.

**Primary search phrase:**
understand the network

**Related search phrases:**
- understand the network guide
- bitcoin learning path understand the network
- bitcoin course path

**Supporting subject tags:**
- education
- learning-path
- understand-the-network

**Prerequisite guides:**
- None. The path introduction directs readers to the correct entry point.

**Previous guide:**
MSC-LRN-HOME | Learn

**Next guide:**
MSC-GUIDE-013 | What Are UTXOs in Bitcoin?

**Recommended branch guide:**
Build on Bitcoin after Script, consensus, and node software

**Return destination:**
MSC-LRN-HOME | Learn

**Recommended learning path continuation:**
Follow the recommended sequence from MSC-GUIDE-013 | What Are UTXOs in Bitcoin? to MSC-GUIDE-060 | How Merkle Trees Work in Bitcoin.

**Related category hub:**
MSC-HUB-BASICS | Bitcoin Basics; MSC-HUB-NETWORK | The Bitcoin Network; MSC-HUB-DEVELOPMENT | Bitcoin Development

**Related glossary terms:**
- Bitcoin
- Wallet
- Transaction
- Node
- Consensus
- Open-Source

**Potential related editorials:**
- Selected editorials that demonstrate path concepts in current events
- Interviews that show the practical work behind the path

**Suggested card description:**
Show how transaction data moves through wallets, nodes, mempools, miners, blocks, and consensus.

**Suggested card action label:**
Understand the network

**Suggested article length:**
1,000 to 1,600 words plus route cards

**Suggested reading time range:**
5 to 8 minutes, excluding linked guides

**Required research notes:**
Confirm every public path step has status PUBLISHED and a confirmed URL before activation. Keep PLANNED and DRAFT steps internal and hidden. Recheck prerequisites whenever a guide changes depth.

**Special accuracy concerns:**
This is a cross-category route. It does not own duplicate article pages. Every active card must point to one published canonical topic guide, featured route, or other confirmed destination.

**Internal link opportunities:**
- All guides in the recommended sequence
- Primary category hubs
- Branching learning paths
- Featured route when relevant
- Glossary index
- Explore and Tools pages when active

**Future content opportunities:**
- Optional short route variants based on time available
- Progress tracking that stores state without duplicating content

**Proposed Codex tags:**
- type:learn
- page-role:learning-path
- path:understand-the-network
- format:learning-path

**Purpose:**
Show how transaction data moves through wallets, nodes, mempools, miners, blocks, and consensus.

**Recommended sequence:**
- MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
- MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- MSC-ROUTE-001 | How a Bitcoin Transaction Moves
- MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?
- MSC-GUIDE-026 | How Bitcoin Blocks Work
- MSC-GUIDE-014 | How Bitcoin Confirmations Work
- MSC-GUIDE-027 | How the Bitcoin Blockchain Works
- MSC-GUIDE-021 | What Is a Bitcoin Full Node?
- MSC-GUIDE-022 | What Is a Pruned Bitcoin Node?
- MSC-GUIDE-023 | How to Run a Bitcoin Node
- MSC-GUIDE-024 | Bitcoin Node Software Explained
- MSC-GUIDE-029 | How Bitcoin Proof of Work Secures the Network
- MSC-GUIDE-017 | How Bitcoin Mining Works
- MSC-GUIDE-018 | How Bitcoin Mining Pools Work
- MSC-GUIDE-019 | What Is an ASIC Miner?
- MSC-GUIDE-028 | What Is Bitcoin Hashrate?
- MSC-GUIDE-020 | How Bitcoin's Difficulty Adjustment Works
- MSC-GUIDE-030 | How Bitcoin Reaches Consensus
- MSC-GUIDE-031 | How Bitcoin Soft Forks Work
- MSC-GUIDE-032 | How Bitcoin Network Upgrades Happen
- MSC-GUIDE-015 | What Is the Bitcoin Halving?
- MSC-GUIDE-058 | How Digital Signatures Work in Bitcoin
- MSC-GUIDE-059 | How Hash Functions Work in Bitcoin
- MSC-GUIDE-060 | How Merkle Trees Work in Bitcoin

**Entry guide:**
MSC-GUIDE-013 | What Are UTXOs in Bitcoin?

**Final guide:**
MSC-GUIDE-060 | How Merkle Trees Work in Bitcoin

**Branching opportunities:**
- Build on Bitcoin after Script, consensus, and node software
- Use Bitcoin Safely after fees, confirmations, and node privacy
- Explore the Ecosystem after mining and hashrate

**Suggested path introduction:**
Follow a transaction from spendable outputs through validation and settlement, then widen the view to mining, consensus, upgrades, and core cryptographic structures.

**Suggested path action label:**
Understand the network

**Finalize timing:**
Finalize after Phase 9, then add cryptography branches after Phase 16.

### MSC-PATH-BUILD: Build on Bitcoin

**Registry ID:**
MSC-PATH-BUILD

**Page role:**
page-role:learning-path

**Display label:**
Build on Bitcoin

**Final recommended H1:**
Build on Bitcoin

**Recommended slug:**
build-on-bitcoin

**Status:**
PLANNED

**Production order:**
Phase 1.10: path skeleton; Finalize after Phase 17.

**Parent destination:**
MSC-LRN-HOME | Learn

**Parent category:**
Learn

**Primary Learn category:**
Not applicable. This is a cross-category learning route.

**Category relationships:**
- MSC-HUB-DEVELOPMENT | Bitcoin Development
- MSC-HUB-BUILDING | Building on Bitcoin

**Learn subcategory:**
Multiple canonical subcategories. The path does not own topic pages.

**Subcategory anchor:**
Not applicable

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Path can branch to the other four learning paths without duplicating guides.

**Depth level:**
Shallow to Trench, sequenced by prerequisite knowledge

**Content format:**
Learning Path

**Target reader:**
Developers, technical operators, product teams, and informed readers evaluating Bitcoin applications.

**Reader search intent:**
Navigational and educational: follow a curated sequence for build on bitcoin.

**Primary search phrase:**
build on bitcoin

**Related search phrases:**
- build on bitcoin guide
- bitcoin learning path build on bitcoin
- bitcoin course path

**Supporting subject tags:**
- education
- learning-path
- build-on-bitcoin

**Prerequisite guides:**
- None. The path introduction directs readers to the correct entry point.

**Previous guide:**
MSC-LRN-HOME | Learn

**Next guide:**
MSC-GUIDE-049 | What Is Bitcoin Core?

**Recommended branch guide:**
Understand the Network for consensus and validation foundations

**Return destination:**
MSC-LRN-HOME | Learn

**Recommended learning path continuation:**
Follow the recommended sequence from MSC-GUIDE-049 | What Is Bitcoin Core? to MSC-GUIDE-064 | How to Run Reliable Bitcoin Infrastructure.

**Related category hub:**
MSC-HUB-DEVELOPMENT | Bitcoin Development; MSC-HUB-BUILDING | Building on Bitcoin

**Related glossary terms:**
- Bitcoin
- Wallet
- Transaction
- Node
- Consensus
- Open-Source

**Potential related editorials:**
- Selected editorials that demonstrate path concepts in current events
- Interviews that show the practical work behind the path

**Suggested card description:**
Give builders and technically curious readers a rigorous route through software, APIs, Script, scaling systems, asset protocols, and emerging proposals.

**Suggested card action label:**
Follow the builder path

**Suggested article length:**
1,000 to 1,600 words plus route cards

**Suggested reading time range:**
5 to 8 minutes, excluding linked guides

**Required research notes:**
Confirm every public path step has status PUBLISHED and a confirmed URL before activation. Keep PLANNED and DRAFT steps internal and hidden. Recheck prerequisites whenever a guide changes depth.

**Special accuracy concerns:**
This is a cross-category route. It does not own duplicate article pages. Every active card must point to one published canonical topic guide, featured route, or other confirmed destination.

**Internal link opportunities:**
- All guides in the recommended sequence
- Primary category hubs
- Branching learning paths
- Featured route when relevant
- Glossary index
- Explore and Tools pages when active

**Future content opportunities:**
- Optional short route variants based on time available
- Progress tracking that stores state without duplicating content

**Proposed Codex tags:**
- type:learn
- page-role:learning-path
- path:build-on-bitcoin
- format:learning-path

**Purpose:**
Give builders and technically curious readers a rigorous route through software, APIs, Script, scaling systems, asset protocols, and emerging proposals.

**Recommended sequence:**
- MSC-GUIDE-049 | What Is Bitcoin Core?
- MSC-GUIDE-041 | Bitcoin Developer Tools: A Practical Overview
- MSC-GUIDE-062 | How to Set Up a Bitcoin Development Environment
- MSC-GUIDE-061 | How Bitcoin RPC Works
- MSC-GUIDE-043 | Bitcoin APIs Explained
- MSC-GUIDE-042 | How Bitcoin Wallet Integrations Work
- MSC-GUIDE-044 | How Bitcoin Indexers Work
- MSC-GUIDE-051 | How to Read the Bitcoin Source Code
- MSC-GUIDE-063 | How Bitcoin Software Is Tested
- MSC-GUIDE-052 | How Bitcoin Core Releases Work
- MSC-GUIDE-053 | How Bitcoin Improvement Proposals Work
- MSC-GUIDE-054 | How Bitcoin Script Works
- MSC-GUIDE-056 | How SegWit Changed Bitcoin
- MSC-GUIDE-055 | How Taproot Changed Bitcoin
- MSC-GUIDE-057 | How Schnorr Signatures Work in Bitcoin
- MSC-GUIDE-033 | How the Lightning Network Works
- MSC-GUIDE-036 | Bitcoin Sidechains Explained
- MSC-GUIDE-034 | What Is Ark on Bitcoin?
- MSC-GUIDE-035 | How RGB Works on Bitcoin
- MSC-GUIDE-037 | What Are Bitcoin Ordinals?
- MSC-GUIDE-040 | What Is a Bitcoin Inscription?
- MSC-GUIDE-038 | How the Runes Protocol Works
- MSC-GUIDE-039 | What Is BRC-20 on Bitcoin?
- MSC-GUIDE-046 | How Discreet Log Contracts Work
- MSC-GUIDE-045 | What Is BitVM?
- MSC-GUIDE-047 | What Is OP_CAT?
- MSC-GUIDE-048 | Emerging Protocols on Bitcoin: How to Evaluate Them
- MSC-GUIDE-050 | What Is Bitcoin Knots?
- MSC-GUIDE-064 | How to Run Reliable Bitcoin Infrastructure

**Entry guide:**
MSC-GUIDE-049 | What Is Bitcoin Core?

**Final guide:**
MSC-GUIDE-064 | How to Run Reliable Bitcoin Infrastructure

**Branching opportunities:**
- Understand the Network for consensus and validation foundations
- Use Bitcoin Safely for wallet security and key management
- Explore the Ecosystem for builders, companies, and open-source projects

**Suggested path introduction:**
Begin with the software and development environment, then move through interfaces, protocol building blocks, application layers, and proposals that require closer technical judgment.

**Suggested path action label:**
Follow the builder path

**Finalize timing:**
Finalize after Phase 17.

### MSC-PATH-ECOSYSTEM: Explore the Ecosystem

**Registry ID:**
MSC-PATH-ECOSYSTEM

**Page role:**
page-role:learning-path

**Display label:**
Explore the Ecosystem

**Final recommended H1:**
Explore the Ecosystem

**Recommended slug:**
explore-the-ecosystem

**Status:**
PLANNED

**Production order:**
Phase 1.11: path skeleton; Finalize after Phase 21.

**Parent destination:**
MSC-LRN-HOME | Learn

**Parent category:**
Learn

**Primary Learn category:**
Not applicable. This is a cross-category learning route.

**Category relationships:**
- MSC-HUB-BASICS | Bitcoin Basics
- MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Learn subcategory:**
Multiple canonical subcategories. The path does not own topic pages.

**Subcategory anchor:**
Not applicable

**Primary learning path:**
Explore the Ecosystem

**Secondary learning paths:**
- Path can branch to the other four learning paths without duplicating guides.

**Depth level:**
Surface to Shallow, sequenced by prerequisite knowledge

**Content format:**
Learning Path

**Target reader:**
Readers who want to understand Bitcoin beyond protocol mechanics without relying on promotional directories.

**Reader search intent:**
Navigational and educational: follow a curated sequence for explore the ecosystem.

**Primary search phrase:**
explore the ecosystem

**Related search phrases:**
- explore the ecosystem guide
- bitcoin learning path explore the ecosystem
- bitcoin course path

**Supporting subject tags:**
- education
- learning-path
- explore-the-ecosystem

**Prerequisite guides:**
- None. The path introduction directs readers to the correct entry point.

**Previous guide:**
MSC-LRN-HOME | Learn

**Next guide:**
MSC-GUIDE-003 | A History of Bitcoin

**Recommended branch guide:**
Start With Bitcoin for foundational context

**Return destination:**
MSC-LRN-HOME | Learn

**Recommended learning path continuation:**
Follow the recommended sequence from MSC-GUIDE-003 | A History of Bitcoin to MSC-GUIDE-080 | How Bitcoin Open-Source Projects Work.

**Related category hub:**
MSC-HUB-BASICS | Bitcoin Basics; MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Related glossary terms:**
- Bitcoin
- Wallet
- Transaction
- Node
- Consensus
- Open-Source

**Potential related editorials:**
- Selected editorials that demonstrate path concepts in current events
- Interviews that show the practical work behind the path

**Suggested card description:**
Explain the people, organizations, markets, projects, and communities that influence Bitcoin adoption and culture.

**Suggested card action label:**
Explore the ecosystem

**Suggested article length:**
1,000 to 1,600 words plus route cards

**Suggested reading time range:**
5 to 8 minutes, excluding linked guides

**Required research notes:**
Confirm every public path step has status PUBLISHED and a confirmed URL before activation. Keep PLANNED and DRAFT steps internal and hidden. Recheck prerequisites whenever a guide changes depth.

**Special accuracy concerns:**
This is a cross-category route. It does not own duplicate article pages. Every active card must point to one published canonical topic guide, featured route, or other confirmed destination.

**Internal link opportunities:**
- All guides in the recommended sequence
- Primary category hubs
- Branching learning paths
- Featured route when relevant
- Glossary index
- Explore and Tools pages when active

**Future content opportunities:**
- Optional short route variants based on time available
- Progress tracking that stores state without duplicating content

**Proposed Codex tags:**
- type:learn
- page-role:learning-path
- path:explore-the-ecosystem
- format:learning-path

**Purpose:**
Explain the people, organizations, markets, projects, and communities that influence Bitcoin adoption and culture.

**Recommended sequence:**
- MSC-GUIDE-003 | A History of Bitcoin
- MSC-GUIDE-004 | Who Was Satoshi Nakamoto?
- MSC-GUIDE-079 | Major Milestones in Bitcoin History
- MSC-GUIDE-065 | Who Builds on Bitcoin?
- MSC-GUIDE-066 | What Bitcoin Developers Do
- MSC-GUIDE-067 | Bitcoin Artists and the Culture They Shape
- MSC-GUIDE-068 | How Bitcoin Industry Leaders Shape the Ecosystem
- MSC-GUIDE-069 | How Public Companies Participate in Bitcoin
- MSC-GUIDE-070 | How Bitcoin Startups Build and Compete
- MSC-GUIDE-071 | How Bitcoin Mining Companies Operate
- MSC-GUIDE-072 | What Bitcoin Infrastructure Companies Do
- MSC-GUIDE-073 | How Bitcoin Exchanges Work
- MSC-GUIDE-074 | How Bitcoin Wallet Providers Operate
- MSC-GUIDE-075 | How Bitcoin Marketplaces Work
- MSC-GUIDE-076 | What Bitcoin Service Providers Do
- MSC-GUIDE-077 | Why Bitcoin Conferences Matter
- MSC-GUIDE-078 | How Bitcoin Communities Form and Grow
- MSC-GUIDE-080 | How Bitcoin Open-Source Projects Work

**Entry guide:**
MSC-GUIDE-003 | A History of Bitcoin

**Final guide:**
MSC-GUIDE-080 | How Bitcoin Open-Source Projects Work

**Branching opportunities:**
- Start With Bitcoin for foundational context
- Build on Bitcoin for technical projects
- Understand the Network for mining and infrastructure mechanics

**Suggested path introduction:**
Use history as context, then examine the people, institutions, markets, and communities that shape Bitcoin through their incentives and contributions.

**Suggested path action label:**
Explore the ecosystem

**Finalize timing:**
Finalize after Phase 21.

## PART 5: TOPIC GUIDE RECORDS

### Bitcoin Basics

#### Foundations

##### MSC-GUIDE-001: What Is Bitcoin?

**Registry ID:**
MSC-GUIDE-001

**Page role:**
page-role:topic-guide

**Display label:**
What Is Bitcoin?

**Final recommended H1:**
What Is Bitcoin?

**Recommended slug:**
what-is-bitcoin

**Status:**
PLANNED

**Production order:**
Phase 2.01: Bitcoin Basics / Foundations

**Parent destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Basics

**Learn subcategory:**
Foundations

**Subcategory anchor:**
#foundations on planned hub slug learn-bitcoin-basics

**Primary learning path:**
Start With Bitcoin

**Secondary learning paths:**
- Explore the Ecosystem

**Depth level:**
Surface

**Content format:**
Explainer

**Target reader:**
A general reader with no required prior Bitcoin knowledge.

**Reader search intent:**
Informational: understand what is bitcoin, how it works, and why it matters to Bitcoin.

**Primary search phrase:**
what is bitcoin

**Related search phrases:**
- what is bitcoin explained
- bitcoin money

**Supporting subject tags:**
- bitcoin
- money
- network

**Prerequisite guides:**
- None. This guide can be entered directly.

**Previous guide:**
None. This is the first canonical topic guide.

**Next guide:**
MSC-GUIDE-002 | Why Does Bitcoin Matter?

**Recommended branch guide:**
MSC-GUIDE-002 | Why Does Bitcoin Matter?

**Return destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Recommended learning path continuation:**
MSC-GUIDE-002 | Why Does Bitcoin Matter?

**Related category hub:**
MSC-HUB-BASICS | Bitcoin Basics

**Related glossary terms:**
- Bitcoin
- Scarcity
- Bitcoin network

**Potential related editorials:**
- Interview with an educator or wallet builder about teaching Bitcoin
- Community story showing where readers misunderstand Bitcoin

**Suggested card description:**
Bitcoin: core mechanics, practical relevance, and connections to the wider Bitcoin system.

**Suggested card action label:**
Read the explainer

**Suggested article length:**
1,400 to 2,000 words

**Suggested reading time range:**
7 to 10 minutes

**Required research notes:**
Use the Bitcoin white paper, Bitcoin Core documentation, established BIPs, and primary historical records. Keep examples current and wallet-neutral.

**Special accuracy concerns:**
Keep the distinction between Bitcoin the network and bitcoin the asset. Avoid investment claims and universal advice.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BASICS | Bitcoin Basics
- Primary path: MSC-PATH-START | Start With Bitcoin
- Branch guide: MSC-GUIDE-002 | Why Does Bitcoin Matter?

**Future content opportunities:**
- Frequently asked questions companion for Bitcoin
- Deeper technical or historical companion focused on one major tradeoff involving Bitcoin

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-basics
- learn-category:bitcoin-basics
- learn-subcategory:foundations
- path:start-with-bitcoin
- path:explore-the-ecosystem
- level:surface
- format:explainer
- subject:bitcoin
- subject:money
- subject:network

##### MSC-GUIDE-002: Why Does Bitcoin Matter?

**Registry ID:**
MSC-GUIDE-002

**Page role:**
page-role:topic-guide

**Display label:**
Why Bitcoin?

**Final recommended H1:**
Why Does Bitcoin Matter?

**Recommended slug:**
why-bitcoin

**Status:**
PLANNED

**Production order:**
Phase 2.02: Bitcoin Basics / Foundations

**Parent destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Basics

**Learn subcategory:**
Foundations

**Subcategory anchor:**
#foundations on planned hub slug learn-bitcoin-basics

**Primary learning path:**
Start With Bitcoin

**Secondary learning paths:**
- Explore the Ecosystem

**Depth level:**
Surface

**Content format:**
Explainer

**Target reader:**
A general reader with no required prior Bitcoin knowledge.

**Reader search intent:**
Informational: understand why bitcoin, how it works, and why it matters to Bitcoin.

**Primary search phrase:**
why bitcoin

**Related search phrases:**
- why bitcoin explained
- bitcoin money

**Supporting subject tags:**
- bitcoin
- money
- scarcity

**Prerequisite guides:**
- MSC-GUIDE-001 | What Is Bitcoin?

**Previous guide:**
MSC-GUIDE-001 | What Is Bitcoin?

**Next guide:**
MSC-GUIDE-003 | A History of Bitcoin

**Recommended branch guide:**
MSC-GUIDE-003 | A History of Bitcoin

**Return destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Recommended learning path continuation:**
MSC-GUIDE-003 | A History of Bitcoin

**Related category hub:**
MSC-HUB-BASICS | Bitcoin Basics

**Related glossary terms:**
- Bitcoin's purpose
- Bitcoin
- Scarcity

**Potential related editorials:**
- Interview with an educator or wallet builder about teaching Why Bitcoin matters
- Community story showing where readers misunderstand Why Bitcoin matters

**Suggested card description:**
Why Bitcoin matters: core mechanics, practical relevance, and connections to the wider Bitcoin system.

**Suggested card action label:**
Read the explainer

**Suggested article length:**
1,400 to 2,000 words

**Suggested reading time range:**
7 to 10 minutes

**Required research notes:**
Use the Bitcoin white paper, Bitcoin Core documentation, established BIPs, and primary historical records. Keep examples current and wallet-neutral.

**Special accuracy concerns:**
Keep the distinction between Bitcoin the network and bitcoin the asset. Avoid investment claims and universal advice.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BASICS | Bitcoin Basics
- Primary path: MSC-PATH-START | Start With Bitcoin
- Prerequisite guides: MSC-GUIDE-001 | What Is Bitcoin?
- Branch guide: MSC-GUIDE-003 | A History of Bitcoin

**Future content opportunities:**
- Frequently asked questions companion for Why Bitcoin matters
- Deeper technical or historical companion focused on one major tradeoff involving Why Bitcoin matters

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-basics
- learn-category:bitcoin-basics
- learn-subcategory:foundations
- path:start-with-bitcoin
- path:explore-the-ecosystem
- level:surface
- format:explainer
- subject:bitcoin
- subject:money
- subject:scarcity

##### MSC-GUIDE-003: A History of Bitcoin

**Registry ID:**
MSC-GUIDE-003

**Page role:**
page-role:topic-guide

**Display label:**
Bitcoin History

**Final recommended H1:**
A History of Bitcoin

**Recommended slug:**
bitcoin-history

**Status:**
PLANNED

**Production order:**
Phase 2.03: Bitcoin Basics / Foundations

**Parent destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Basics

**Learn subcategory:**
Foundations

**Subcategory anchor:**
#foundations on planned hub slug learn-bitcoin-basics

**Primary learning path:**
Start With Bitcoin

**Secondary learning paths:**
- Explore the Ecosystem

**Depth level:**
Surface

**Content format:**
History

**Target reader:**
A general reader with no required prior Bitcoin knowledge.

**Reader search intent:**
Informational: understand the timeline, context, and significance of bitcoin history.

**Primary search phrase:**
bitcoin history

**Related search phrases:**
- bitcoin history explained

**Supporting subject tags:**
- bitcoin
- history
- open-source

**Prerequisite guides:**
- MSC-GUIDE-001 | What Is Bitcoin?

**Previous guide:**
MSC-GUIDE-002 | Why Does Bitcoin Matter?

**Next guide:**
MSC-GUIDE-004 | Who Was Satoshi Nakamoto?

**Recommended branch guide:**
MSC-GUIDE-004 | Who Was Satoshi Nakamoto?

**Return destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Recommended learning path continuation:**
MSC-GUIDE-004 | Who Was Satoshi Nakamoto?

**Related category hub:**
MSC-HUB-BASICS | Bitcoin Basics

**Related glossary terms:**
- Bitcoin history
- Bitcoin
- Open-Source

**Potential related editorials:**
- Interview with an educator or wallet builder about teaching Bitcoin History
- Community story showing where readers misunderstand Bitcoin History

**Suggested card description:**
Bitcoin History: history, turning points, and lasting significance within Bitcoin.

**Suggested card action label:**
Explore the history

**Suggested article length:**
1,400 to 2,000 words

**Suggested reading time range:**
7 to 10 minutes

**Required research notes:**
Use the Bitcoin white paper, Bitcoin Core documentation, established BIPs, and primary historical records. Keep examples current and wallet-neutral.

**Special accuracy concerns:**
Keep the distinction between Bitcoin the network and bitcoin the asset. Avoid investment claims and universal advice.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BASICS | Bitcoin Basics
- Primary path: MSC-PATH-START | Start With Bitcoin
- Prerequisite guides: MSC-GUIDE-001 | What Is Bitcoin?
- Branch guide: MSC-GUIDE-004 | Who Was Satoshi Nakamoto?

**Future content opportunities:**
- Frequently asked questions companion for Bitcoin History
- Deeper technical or historical companion focused on one major tradeoff involving Bitcoin History

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-basics
- learn-category:bitcoin-basics
- learn-subcategory:foundations
- path:start-with-bitcoin
- path:explore-the-ecosystem
- level:surface
- format:history
- subject:bitcoin
- subject:history
- subject:open-source

##### MSC-GUIDE-004: Who Was Satoshi Nakamoto?

**Registry ID:**
MSC-GUIDE-004

**Page role:**
page-role:topic-guide

**Display label:**
Satoshi Nakamoto

**Final recommended H1:**
Who Was Satoshi Nakamoto?

**Recommended slug:**
satoshi-nakamoto

**Status:**
PLANNED

**Production order:**
Phase 2.04: Bitcoin Basics / Foundations

**Parent destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Basics

**Learn subcategory:**
Foundations

**Subcategory anchor:**
#foundations on planned hub slug learn-bitcoin-basics

**Primary learning path:**
Start With Bitcoin

**Secondary learning paths:**
- Explore the Ecosystem

**Depth level:**
Surface

**Content format:**
History

**Target reader:**
A general reader with no required prior Bitcoin knowledge.

**Reader search intent:**
Informational: understand the timeline, context, and significance of satoshi nakamoto.

**Primary search phrase:**
satoshi nakamoto

**Related search phrases:**
- satoshi nakamoto explained
- satoshi nakamoto bitcoin
- bitcoin history

**Supporting subject tags:**
- bitcoin
- history
- satoshi-nakamoto

**Prerequisite guides:**
- MSC-GUIDE-003 | A History of Bitcoin

**Previous guide:**
MSC-GUIDE-003 | A History of Bitcoin

**Next guide:**
MSC-GUIDE-005 | What Is a Bitcoin Wallet?

**Recommended branch guide:**
MSC-GUIDE-079 | Major Milestones in Bitcoin History

**Return destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Recommended learning path continuation:**
MSC-GUIDE-005 | What Is a Bitcoin Wallet?

**Related category hub:**
MSC-HUB-BASICS | Bitcoin Basics

**Related glossary terms:**
- Satoshi Nakamoto
- Bitcoin
- Bitcoin history

**Potential related editorials:**
- Interview with an educator or wallet builder about teaching Satoshi Nakamoto
- Community story showing where readers misunderstand Satoshi Nakamoto

**Suggested card description:**
Satoshi Nakamoto: history, turning points, and lasting significance within Bitcoin.

**Suggested card action label:**
Explore the history

**Suggested article length:**
1,400 to 2,000 words

**Suggested reading time range:**
7 to 10 minutes

**Required research notes:**
Use primary historical archives, early emails, the white paper, and contemporaneous software records. Separate documented facts from later interpretation.

**Special accuracy concerns:**
Do not speculate about Satoshi's identity or present unverified candidates as fact.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BASICS | Bitcoin Basics
- Primary path: MSC-PATH-START | Start With Bitcoin
- Prerequisite guides: MSC-GUIDE-003 | A History of Bitcoin
- Branch guide: MSC-GUIDE-079 | Major Milestones in Bitcoin History

**Future content opportunities:**
- Frequently asked questions companion for Satoshi Nakamoto
- Deeper technical or historical companion focused on one major tradeoff involving Satoshi Nakamoto

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-basics
- learn-category:bitcoin-basics
- learn-subcategory:foundations
- path:start-with-bitcoin
- path:explore-the-ecosystem
- level:surface
- format:history
- subject:bitcoin
- subject:history
- subject:satoshi-nakamoto

#### Using Bitcoin

##### MSC-GUIDE-005: What Is a Bitcoin Wallet?

**Registry ID:**
MSC-GUIDE-005

**Page role:**
page-role:topic-guide

**Display label:**
Wallets

**Final recommended H1:**
What Is a Bitcoin Wallet?

**Recommended slug:**
what-is-a-bitcoin-wallet

**Status:**
PLANNED

**Production order:**
Phase 3.01: Bitcoin Basics / Using Bitcoin

**Parent destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Basics

**Learn subcategory:**
Using Bitcoin

**Subcategory anchor:**
#using-bitcoin on planned hub slug learn-bitcoin-basics

**Primary learning path:**
Start With Bitcoin

**Secondary learning paths:**
- Use Bitcoin Safely

**Depth level:**
Surface

**Content format:**
Explainer

**Target reader:**
A general reader with no required prior Bitcoin knowledge.

**Reader search intent:**
Informational: understand what is a bitcoin wallet, how it works, and why it matters to Bitcoin.

**Primary search phrase:**
what is a bitcoin wallet

**Related search phrases:**
- wallets explained
- wallets bitcoin
- bitcoin self custody

**Supporting subject tags:**
- wallets
- self-custody
- keys

**Prerequisite guides:**
- MSC-GUIDE-001 | What Is Bitcoin?

**Previous guide:**
MSC-GUIDE-004 | Who Was Satoshi Nakamoto?

**Next guide:**
MSC-GUIDE-006 | What Is Bitcoin Self-Custody?

**Recommended branch guide:**
MSC-GUIDE-006 | What Is Bitcoin Self-Custody?

**Return destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Recommended learning path continuation:**
MSC-GUIDE-006 | What Is Bitcoin Self-Custody?

**Related category hub:**
MSC-HUB-BASICS | Bitcoin Basics

**Related glossary terms:**
- Wallet
- Self-Custody
- Private key

**Potential related editorials:**
- Interview with an educator or wallet builder about teaching Wallets
- Community story showing where readers misunderstand Wallets

**Suggested card description:**
Wallets: core mechanics, practical relevance, and connections to the wider Bitcoin system.

**Suggested card action label:**
Read the explainer

**Suggested article length:**
1,400 to 2,000 words

**Suggested reading time range:**
7 to 10 minutes

**Required research notes:**
Use the Bitcoin white paper, Bitcoin Core documentation, established BIPs, and primary historical records. Keep examples current and wallet-neutral.

**Special accuracy concerns:**
Keep the distinction between Bitcoin the network and bitcoin the asset. Avoid investment claims and universal advice.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BASICS | Bitcoin Basics
- Primary path: MSC-PATH-START | Start With Bitcoin
- Prerequisite guides: MSC-GUIDE-001 | What Is Bitcoin?
- Branch guide: MSC-GUIDE-006 | What Is Bitcoin Self-Custody?
- Future Tools connection: a practical tool page related to what is a bitcoin wallet, activated only after that destination exists

**Future content opportunities:**
- Frequently asked questions companion for Wallets
- Deeper technical or historical companion focused on one major tradeoff involving Wallets

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-basics
- learn-category:bitcoin-basics
- learn-subcategory:using-bitcoin
- path:start-with-bitcoin
- path:use-bitcoin-safely
- level:surface
- format:explainer
- subject:wallets
- subject:self-custody
- subject:keys

##### MSC-GUIDE-006: What Is Bitcoin Self-Custody?

**Registry ID:**
MSC-GUIDE-006

**Page role:**
page-role:topic-guide

**Display label:**
Self-Custody

**Final recommended H1:**
What Is Bitcoin Self-Custody?

**Recommended slug:**
bitcoin-self-custody

**Status:**
PLANNED

**Production order:**
Phase 3.02: Bitcoin Basics / Using Bitcoin

**Parent destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Basics

**Learn subcategory:**
Using Bitcoin

**Subcategory anchor:**
#using-bitcoin on planned hub slug learn-bitcoin-basics

**Primary learning path:**
Use Bitcoin Safely

**Secondary learning paths:**
- Start With Bitcoin

**Depth level:**
Surface

**Content format:**
Guide

**Target reader:**
A general reader with no required prior Bitcoin knowledge.

**Reader search intent:**
Practical informational: understand bitcoin self custody and apply sound decisions without relying on promotional claims.

**Primary search phrase:**
bitcoin self custody

**Related search phrases:**
- self-custody explained
- self-custody bitcoin
- bitcoin self custody
- bitcoin wallets

**Supporting subject tags:**
- self-custody
- wallets
- security

**Prerequisite guides:**
- MSC-GUIDE-005 | What Is a Bitcoin Wallet?

**Previous guide:**
MSC-GUIDE-005 | What Is a Bitcoin Wallet?

**Next guide:**
MSC-GUIDE-007 | How to Send and Receive Bitcoin

**Recommended branch guide:**
MSC-GUIDE-009 | What Is a Bitcoin Seed Phrase?

**Return destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Recommended learning path continuation:**
MSC-GUIDE-009 | What Is a Bitcoin Seed Phrase?

**Related category hub:**
MSC-HUB-BASICS | Bitcoin Basics

**Related glossary terms:**
- Self-Custody
- Wallet
- Threat model

**Potential related editorials:**
- Interview with an educator or wallet builder about teaching Self-Custody
- Community story showing where readers misunderstand Self-Custody

**Suggested card description:**
Self-Custody: practical guidance, sound decision criteria, and clearly stated limits.

**Suggested card action label:**
Read the guide

**Suggested article length:**
1,400 to 2,000 words

**Suggested reading time range:**
7 to 10 minutes

**Required research notes:**
Use the Bitcoin white paper, Bitcoin Core documentation, established BIPs, and primary historical records. Keep examples current and wallet-neutral.

**Special accuracy concerns:**
Do not imply self-custody is automatically safer. Explain operational responsibility and failure modes.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BASICS | Bitcoin Basics
- Primary path: MSC-PATH-SAFE | Use Bitcoin Safely
- Prerequisite guides: MSC-GUIDE-005 | What Is a Bitcoin Wallet?
- Branch guide: MSC-GUIDE-009 | What Is a Bitcoin Seed Phrase?
- Future Tools connection: a practical tool page related to bitcoin self custody, activated only after that destination exists

**Future content opportunities:**
- Frequently asked questions companion for Self-Custody
- Deeper technical or historical companion focused on one major tradeoff involving Self-Custody

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-basics
- learn-category:bitcoin-basics
- learn-subcategory:using-bitcoin
- path:use-bitcoin-safely
- path:start-with-bitcoin
- level:surface
- format:guide
- subject:self-custody
- subject:wallets
- subject:security

##### MSC-GUIDE-007: How to Send and Receive Bitcoin

**Registry ID:**
MSC-GUIDE-007

**Page role:**
page-role:topic-guide

**Display label:**
Sending and Receiving

**Final recommended H1:**
How to Send and Receive Bitcoin

**Recommended slug:**
send-and-receive-bitcoin

**Status:**
PLANNED

**Production order:**
Phase 3.03: Bitcoin Basics / Using Bitcoin

**Parent destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Basics

**Learn subcategory:**
Using Bitcoin

**Subcategory anchor:**
#using-bitcoin on planned hub slug learn-bitcoin-basics

**Primary learning path:**
Start With Bitcoin

**Secondary learning paths:**
- Use Bitcoin Safely

**Depth level:**
Surface

**Content format:**
Walkthrough

**Target reader:**
A general reader with no required prior Bitcoin knowledge.

**Reader search intent:**
Practical: follow the steps involved in send and receive bitcoin and understand the decisions and risks.

**Primary search phrase:**
send and receive bitcoin

**Related search phrases:**
- sending and receiving explained
- sending and receiving bitcoin
- how to send and receive bitcoin
- bitcoin transactions

**Supporting subject tags:**
- transactions
- wallets
- payments

**Prerequisite guides:**
- MSC-GUIDE-005 | What Is a Bitcoin Wallet?
- MSC-GUIDE-006 | What Is Bitcoin Self-Custody?

**Previous guide:**
MSC-GUIDE-006 | What Is Bitcoin Self-Custody?

**Next guide:**
MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work

**Recommended branch guide:**
MSC-ROUTE-001 | How a Bitcoin Transaction Moves

**Return destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Recommended learning path continuation:**
MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work

**Related category hub:**
MSC-HUB-BASICS | Bitcoin Basics

**Related glossary terms:**
- Address
- Transaction
- Wallet
- Payment

**Potential related editorials:**
- Interview with an educator or wallet builder about teaching Sending and Receiving
- Community story showing where readers misunderstand Sending and Receiving

**Suggested card description:**
Sending and Receiving: a practical sequence with the decisions, checks, and risks that matter.

**Suggested card action label:**
Follow the walkthrough

**Suggested article length:**
1,400 to 2,000 words

**Suggested reading time range:**
7 to 10 minutes

**Required research notes:**
Use the Bitcoin white paper, Bitcoin Core documentation, established BIPs, and primary historical records. Keep examples current and wallet-neutral.

**Special accuracy concerns:**
Do not publish address or fee instructions that depend on one wallet interface. Keep the workflow wallet-neutral.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BASICS | Bitcoin Basics
- Primary path: MSC-PATH-START | Start With Bitcoin
- Prerequisite guides: MSC-GUIDE-005 | What Is a Bitcoin Wallet?; MSC-GUIDE-006 | What Is Bitcoin Self-Custody?
- Branch guide: MSC-ROUTE-001 | How a Bitcoin Transaction Moves
- Featured route: MSC-ROUTE-001 | How a Bitcoin Transaction Moves

**Future content opportunities:**
- Frequently asked questions companion for Sending and Receiving
- Deeper technical or historical companion focused on one major tradeoff involving Sending and Receiving

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-basics
- learn-category:bitcoin-basics
- learn-subcategory:using-bitcoin
- path:start-with-bitcoin
- path:use-bitcoin-safely
- level:surface
- format:walkthrough
- subject:transactions
- subject:wallets
- subject:payments

##### MSC-GUIDE-008: How Bitcoin Transactions and Fees Work

**Registry ID:**
MSC-GUIDE-008

**Page role:**
page-role:topic-guide

**Display label:**
Transactions and Fees

**Final recommended H1:**
How Bitcoin Transactions and Fees Work

**Recommended slug:**
bitcoin-transactions-and-fees

**Status:**
PLANNED

**Production order:**
Phase 3.04: Bitcoin Basics / Using Bitcoin

**Parent destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Basics

**Learn subcategory:**
Using Bitcoin

**Subcategory anchor:**
#using-bitcoin on planned hub slug learn-bitcoin-basics

**Primary learning path:**
Understand the Network

**Secondary learning paths:**
- Start With Bitcoin
- Use Bitcoin Safely

**Depth level:**
Shallow

**Content format:**
Explainer

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Informational: understand bitcoin transactions and fees, how it works, and why it matters to Bitcoin.

**Primary search phrase:**
bitcoin transactions and fees

**Related search phrases:**
- transactions and fees explained
- transactions and fees bitcoin
- how bitcoin transactions and fees work

**Supporting subject tags:**
- transactions
- fees
- mempool
- utxos

**Prerequisite guides:**
- MSC-GUIDE-007 | How to Send and Receive Bitcoin

**Previous guide:**
MSC-GUIDE-007 | How to Send and Receive Bitcoin

**Next guide:**
MSC-GUIDE-009 | What Is a Bitcoin Seed Phrase?

**Recommended branch guide:**
MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?

**Return destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Recommended learning path continuation:**
MSC-ROUTE-001 | How a Bitcoin Transaction Moves

**Related category hub:**
MSC-HUB-BASICS | Bitcoin Basics

**Related glossary terms:**
- Transaction
- Fee rate
- Mempool
- UTXO

**Potential related editorials:**
- Interview with an educator or wallet builder about teaching Transactions and Fees
- Community story showing where readers misunderstand Transactions and Fees

**Suggested card description:**
Transactions and Fees: core mechanics, practical relevance, and connections to the wider Bitcoin system.

**Suggested card action label:**
Read the explainer

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use the Bitcoin white paper, Bitcoin Core documentation, established BIPs, and primary historical records. Keep examples current and wallet-neutral.

**Special accuracy concerns:**
Distinguish transaction fees from exchange or service fees. Explain fee-rate estimation without promising confirmation times.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BASICS | Bitcoin Basics
- Primary path: MSC-PATH-NETWORK | Understand the Network
- Prerequisite guides: MSC-GUIDE-007 | How to Send and Receive Bitcoin
- Branch guide: MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?
- Featured route: MSC-ROUTE-001 | How a Bitcoin Transaction Moves

**Future content opportunities:**
- Frequently asked questions companion for Transactions and Fees
- Deeper technical or historical companion focused on one major tradeoff involving Transactions and Fees

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-basics
- learn-category:bitcoin-basics
- learn-subcategory:using-bitcoin
- path:understand-the-network
- path:start-with-bitcoin
- path:use-bitcoin-safely
- level:shallow
- format:explainer
- subject:transactions
- subject:fees
- subject:mempool
- subject:utxos

#### Security

##### MSC-GUIDE-009: What Is a Bitcoin Seed Phrase?

**Registry ID:**
MSC-GUIDE-009

**Page role:**
page-role:topic-guide

**Display label:**
Seed Phrases

**Final recommended H1:**
What Is a Bitcoin Seed Phrase?

**Recommended slug:**
bitcoin-seed-phrase

**Status:**
PLANNED

**Production order:**
Phase 4.01: Bitcoin Basics / Security

**Parent destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Basics

**Learn subcategory:**
Security

**Subcategory anchor:**
#security on planned hub slug learn-bitcoin-basics

**Primary learning path:**
Use Bitcoin Safely

**Secondary learning paths:**
- Start With Bitcoin

**Depth level:**
Surface

**Content format:**
Explainer

**Target reader:**
A general reader with no required prior Bitcoin knowledge.

**Reader search intent:**
Informational: understand bitcoin seed phrase, how it works, and why it matters to Bitcoin.

**Primary search phrase:**
bitcoin seed phrase

**Related search phrases:**
- seed phrases explained
- seed phrases bitcoin
- bitcoin wallets

**Supporting subject tags:**
- seed-phrases
- wallets
- security

**Prerequisite guides:**
- MSC-GUIDE-005 | What Is a Bitcoin Wallet?
- MSC-GUIDE-006 | What Is Bitcoin Self-Custody?

**Previous guide:**
MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work

**Next guide:**
MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work

**Recommended branch guide:**
MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work

**Return destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Recommended learning path continuation:**
MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work

**Related category hub:**
MSC-HUB-BASICS | Bitcoin Basics

**Related glossary terms:**
- Seed phrase
- Wallet
- Threat model

**Potential related editorials:**
- Interview with an educator or wallet builder about teaching Seed Phrases
- Community story showing where readers misunderstand Seed Phrases

**Suggested card description:**
Seed Phrases: core mechanics, practical relevance, and connections to the wider Bitcoin system.

**Suggested card action label:**
Read the explainer

**Suggested article length:**
1,400 to 2,000 words

**Suggested reading time range:**
7 to 10 minutes

**Required research notes:**
Use BIP 39 carefully, note that mnemonic backup systems are wallet standards rather than Bitcoin consensus, and compare current wallet documentation.

**Special accuracy concerns:**
Do not call every recovery phrase a BIP 39 seed phrase. Explain passphrases and derivation standards carefully.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BASICS | Bitcoin Basics
- Primary path: MSC-PATH-SAFE | Use Bitcoin Safely
- Prerequisite guides: MSC-GUIDE-005 | What Is a Bitcoin Wallet?; MSC-GUIDE-006 | What Is Bitcoin Self-Custody?
- Branch guide: MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work

**Future content opportunities:**
- Frequently asked questions companion for Seed Phrases
- Deeper technical or historical companion focused on one major tradeoff involving Seed Phrases

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-basics
- learn-category:bitcoin-basics
- learn-subcategory:security
- path:use-bitcoin-safely
- path:start-with-bitcoin
- level:surface
- format:explainer
- subject:seed-phrases
- subject:wallets
- subject:security

##### MSC-GUIDE-010: How Bitcoin Public and Private Keys Work

**Registry ID:**
MSC-GUIDE-010

**Page role:**
page-role:topic-guide

**Display label:**
Public and Private Keys

**Final recommended H1:**
How Bitcoin Public and Private Keys Work

**Recommended slug:**
bitcoin-public-private-keys

**Status:**
PLANNED

**Production order:**
Phase 4.02: Bitcoin Basics / Security

**Parent destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Basics

**Learn subcategory:**
Security

**Subcategory anchor:**
#security on planned hub slug learn-bitcoin-basics

**Primary learning path:**
Use Bitcoin Safely

**Secondary learning paths:**
- Start With Bitcoin
- Understand the Network

**Depth level:**
Shallow

**Content format:**
Explainer

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Informational: understand bitcoin public private keys, how it works, and why it matters to Bitcoin.

**Primary search phrase:**
bitcoin public private keys

**Related search phrases:**
- public and private keys explained
- public and private keys bitcoin
- how bitcoin public and private keys work
- bitcoin cryptography

**Supporting subject tags:**
- keys
- cryptography
- wallets

**Prerequisite guides:**
- MSC-GUIDE-001 | What Is Bitcoin?

**Previous guide:**
MSC-GUIDE-009 | What Is a Bitcoin Seed Phrase?

**Next guide:**
MSC-GUIDE-011 | How to Keep Bitcoin Secure

**Recommended branch guide:**
MSC-GUIDE-011 | How to Keep Bitcoin Secure

**Return destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Recommended learning path continuation:**
MSC-GUIDE-011 | How to Keep Bitcoin Secure

**Related category hub:**
MSC-HUB-BASICS | Bitcoin Basics

**Related glossary terms:**
- Public key
- Private key
- Cryptography
- Wallet

**Potential related editorials:**
- Interview with an educator or wallet builder about teaching Public and Private Keys
- Community story showing where readers misunderstand Public and Private Keys

**Suggested card description:**
Public and Private Keys: core mechanics, practical relevance, and connections to the wider Bitcoin system.

**Suggested card action label:**
Read the explainer

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use the Bitcoin white paper, Bitcoin Core documentation, established BIPs, and primary historical records. Keep examples current and wallet-neutral.

**Special accuracy concerns:**
Do not equate addresses with public keys or seed phrases with private keys.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BASICS | Bitcoin Basics
- Primary path: MSC-PATH-SAFE | Use Bitcoin Safely
- Prerequisite guides: MSC-GUIDE-001 | What Is Bitcoin?
- Branch guide: MSC-GUIDE-011 | How to Keep Bitcoin Secure

**Future content opportunities:**
- Frequently asked questions companion for Public and Private Keys
- Deeper technical or historical companion focused on one major tradeoff involving Public and Private Keys

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-basics
- learn-category:bitcoin-basics
- learn-subcategory:security
- path:use-bitcoin-safely
- path:start-with-bitcoin
- path:understand-the-network
- level:shallow
- format:explainer
- subject:keys
- subject:cryptography
- subject:wallets

##### MSC-GUIDE-011: How to Keep Bitcoin Secure

**Registry ID:**
MSC-GUIDE-011

**Page role:**
page-role:topic-guide

**Display label:**
Bitcoin Security

**Final recommended H1:**
How to Keep Bitcoin Secure

**Recommended slug:**
bitcoin-security

**Status:**
PLANNED

**Production order:**
Phase 4.03: Bitcoin Basics / Security

**Parent destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Basics

**Learn subcategory:**
Security

**Subcategory anchor:**
#security on planned hub slug learn-bitcoin-basics

**Primary learning path:**
Use Bitcoin Safely

**Secondary learning paths:**
- Start With Bitcoin

**Depth level:**
Surface

**Content format:**
Guide

**Target reader:**
A general reader with no required prior Bitcoin knowledge.

**Reader search intent:**
Practical informational: understand bitcoin security and apply sound decisions without relying on promotional claims.

**Primary search phrase:**
bitcoin security

**Related search phrases:**
- bitcoin security explained
- how to keep bitcoin secure
- bitcoin self custody

**Supporting subject tags:**
- security
- self-custody
- wallets

**Prerequisite guides:**
- MSC-GUIDE-006 | What Is Bitcoin Self-Custody?
- MSC-GUIDE-009 | What Is a Bitcoin Seed Phrase?
- MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work

**Previous guide:**
MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work

**Next guide:**
MSC-GUIDE-012 | How Bitcoin Privacy Works

**Recommended branch guide:**
MSC-GUIDE-012 | How Bitcoin Privacy Works

**Return destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Recommended learning path continuation:**
MSC-GUIDE-012 | How Bitcoin Privacy Works

**Related category hub:**
MSC-HUB-BASICS | Bitcoin Basics

**Related glossary terms:**
- Bitcoin security
- Threat model
- Self-Custody
- Wallet

**Potential related editorials:**
- Interview with an educator or wallet builder about teaching Bitcoin Security
- Community story showing where readers misunderstand Bitcoin Security

**Suggested card description:**
Bitcoin Security: practical guidance, sound decision criteria, and clearly stated limits.

**Suggested card action label:**
Read the guide

**Suggested article length:**
1,400 to 2,000 words

**Suggested reading time range:**
7 to 10 minutes

**Required research notes:**
Use the Bitcoin white paper, Bitcoin Core documentation, established BIPs, and primary historical records. Keep examples current and wallet-neutral.

**Special accuracy concerns:**
Avoid universal security prescriptions. Separate threat models, custody models, backups, and recovery.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BASICS | Bitcoin Basics
- Primary path: MSC-PATH-SAFE | Use Bitcoin Safely
- Prerequisite guides: MSC-GUIDE-006 | What Is Bitcoin Self-Custody?; MSC-GUIDE-009 | What Is a Bitcoin Seed Phrase?; MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work
- Branch guide: MSC-GUIDE-012 | How Bitcoin Privacy Works

**Future content opportunities:**
- Frequently asked questions companion for Bitcoin Security
- Deeper technical or historical companion focused on one major tradeoff involving Bitcoin Security

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-basics
- learn-category:bitcoin-basics
- learn-subcategory:security
- path:use-bitcoin-safely
- path:start-with-bitcoin
- level:surface
- format:guide
- subject:security
- subject:self-custody
- subject:wallets

##### MSC-GUIDE-012: How Bitcoin Privacy Works

**Registry ID:**
MSC-GUIDE-012

**Page role:**
page-role:topic-guide

**Display label:**
Bitcoin Privacy

**Final recommended H1:**
How Bitcoin Privacy Works

**Recommended slug:**
bitcoin-privacy

**Status:**
PLANNED

**Production order:**
Phase 4.04: Bitcoin Basics / Security

**Parent destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Basics

**Learn subcategory:**
Security

**Subcategory anchor:**
#security on planned hub slug learn-bitcoin-basics

**Primary learning path:**
Use Bitcoin Safely

**Secondary learning paths:**
- Start With Bitcoin

**Depth level:**
Shallow

**Content format:**
Guide

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Practical informational: understand bitcoin privacy and apply sound decisions without relying on promotional claims.

**Primary search phrase:**
bitcoin privacy

**Related search phrases:**
- bitcoin privacy explained
- how bitcoin privacy works
- bitcoin transactions

**Supporting subject tags:**
- privacy
- transactions
- wallets

**Prerequisite guides:**
- MSC-GUIDE-005 | What Is a Bitcoin Wallet?
- MSC-GUIDE-006 | What Is Bitcoin Self-Custody?

**Previous guide:**
MSC-GUIDE-011 | How to Keep Bitcoin Secure

**Next guide:**
MSC-GUIDE-013 | What Are UTXOs in Bitcoin?

**Recommended branch guide:**
MSC-GUIDE-016 | Bitcoin Best Practices for Safe Everyday Use

**Return destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Recommended learning path continuation:**
MSC-GUIDE-007 | How to Send and Receive Bitcoin

**Related category hub:**
MSC-HUB-BASICS | Bitcoin Basics

**Related glossary terms:**
- Bitcoin privacy
- Transaction
- Wallet

**Potential related editorials:**
- Interview with an educator or wallet builder about teaching Bitcoin Privacy
- Community story showing where readers misunderstand Bitcoin Privacy

**Suggested card description:**
Bitcoin Privacy: practical guidance, sound decision criteria, and clearly stated limits.

**Suggested card action label:**
Read the guide

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use current wallet and chain-analysis research. Explain practical privacy limits without giving absolute guarantees.

**Special accuracy concerns:**
Do not promise anonymity. Explain address reuse, wallet behavior, network privacy, and chain analysis separately.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BASICS | Bitcoin Basics
- Primary path: MSC-PATH-SAFE | Use Bitcoin Safely
- Prerequisite guides: MSC-GUIDE-005 | What Is a Bitcoin Wallet?; MSC-GUIDE-006 | What Is Bitcoin Self-Custody?
- Branch guide: MSC-GUIDE-016 | Bitcoin Best Practices for Safe Everyday Use

**Future content opportunities:**
- Frequently asked questions companion for Bitcoin Privacy
- Deeper technical or historical companion focused on one major tradeoff involving Bitcoin Privacy

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-basics
- learn-category:bitcoin-basics
- learn-subcategory:security
- path:use-bitcoin-safely
- path:start-with-bitcoin
- level:shallow
- format:guide
- subject:privacy
- subject:transactions
- subject:wallets

#### Essentials

##### MSC-GUIDE-013: What Are UTXOs in Bitcoin?

**Registry ID:**
MSC-GUIDE-013

**Page role:**
page-role:topic-guide

**Display label:**
UTXOs

**Final recommended H1:**
What Are UTXOs in Bitcoin?

**Recommended slug:**
bitcoin-utxos

**Status:**
PLANNED

**Production order:**
Phase 5.01: Bitcoin Basics / Essentials

**Parent destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Basics

**Learn subcategory:**
Essentials

**Subcategory anchor:**
#essentials on planned hub slug learn-bitcoin-basics

**Primary learning path:**
Understand the Network

**Secondary learning paths:**
- Start With Bitcoin

**Depth level:**
Shallow

**Content format:**
Explainer

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Informational: understand bitcoin utxos, how it works, and why it matters to Bitcoin.

**Primary search phrase:**
bitcoin utxos

**Related search phrases:**
- utxos explained
- utxos bitcoin
- bitcoin transactions

**Supporting subject tags:**
- utxos
- transactions
- wallets

**Prerequisite guides:**
- MSC-GUIDE-001 | What Is Bitcoin?
- MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work

**Previous guide:**
MSC-GUIDE-012 | How Bitcoin Privacy Works

**Next guide:**
MSC-GUIDE-014 | How Bitcoin Confirmations Work

**Recommended branch guide:**
MSC-ROUTE-001 | How a Bitcoin Transaction Moves

**Return destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Recommended learning path continuation:**
MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work

**Related category hub:**
MSC-HUB-BASICS | Bitcoin Basics

**Related glossary terms:**
- UTXO
- Transaction
- Wallet

**Potential related editorials:**
- Interview with an educator or wallet builder about teaching UTXOs
- Community story showing where readers misunderstand UTXOs

**Suggested card description:**
UTXOs: core mechanics, practical relevance, and connections to the wider Bitcoin system.

**Suggested card action label:**
Read the explainer

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use the Bitcoin white paper, Bitcoin Core documentation, established BIPs, and primary historical records. Keep examples current and wallet-neutral.

**Special accuracy concerns:**
Do not describe UTXOs as coins stored inside addresses. Explain them as spendable transaction outputs.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BASICS | Bitcoin Basics
- Primary path: MSC-PATH-NETWORK | Understand the Network
- Prerequisite guides: MSC-GUIDE-001 | What Is Bitcoin?; MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- Branch guide: MSC-ROUTE-001 | How a Bitcoin Transaction Moves
- Featured route: MSC-ROUTE-001 | How a Bitcoin Transaction Moves

**Future content opportunities:**
- Frequently asked questions companion for UTXOs
- Deeper technical or historical companion focused on one major tradeoff involving UTXOs

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-basics
- learn-category:bitcoin-basics
- learn-subcategory:essentials
- path:understand-the-network
- path:start-with-bitcoin
- level:shallow
- format:explainer
- subject:utxos
- subject:transactions
- subject:wallets

##### MSC-GUIDE-014: How Bitcoin Confirmations Work

**Registry ID:**
MSC-GUIDE-014

**Page role:**
page-role:topic-guide

**Display label:**
Confirmations

**Final recommended H1:**
How Bitcoin Confirmations Work

**Recommended slug:**
bitcoin-confirmations

**Status:**
PLANNED

**Production order:**
Phase 5.02: Bitcoin Basics / Essentials

**Parent destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Basics

**Learn subcategory:**
Essentials

**Subcategory anchor:**
#essentials on planned hub slug learn-bitcoin-basics

**Primary learning path:**
Understand the Network

**Secondary learning paths:**
- Start With Bitcoin
- Use Bitcoin Safely

**Depth level:**
Surface

**Content format:**
Explainer

**Target reader:**
A general reader with no required prior Bitcoin knowledge.

**Reader search intent:**
Informational: understand bitcoin confirmations, how it works, and why it matters to Bitcoin.

**Primary search phrase:**
bitcoin confirmations

**Related search phrases:**
- confirmations explained
- confirmations bitcoin
- how bitcoin confirmations work
- bitcoin blocks

**Supporting subject tags:**
- confirmations
- blocks
- transactions

**Prerequisite guides:**
- MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work

**Previous guide:**
MSC-GUIDE-013 | What Are UTXOs in Bitcoin?

**Next guide:**
MSC-GUIDE-015 | What Is the Bitcoin Halving?

**Recommended branch guide:**
MSC-GUIDE-026 | How Bitcoin Blocks Work

**Return destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Recommended learning path continuation:**
MSC-GUIDE-027 | How the Bitcoin Blockchain Works

**Related category hub:**
MSC-HUB-BASICS | Bitcoin Basics

**Related glossary terms:**
- Confirmation
- Block
- Transaction

**Potential related editorials:**
- Interview with an educator or wallet builder about teaching Confirmations
- Community story showing where readers misunderstand Confirmations

**Suggested card description:**
Confirmations: core mechanics, practical relevance, and connections to the wider Bitcoin system.

**Suggested card action label:**
Read the explainer

**Suggested article length:**
1,400 to 2,000 words

**Suggested reading time range:**
7 to 10 minutes

**Required research notes:**
Use the Bitcoin white paper, Bitcoin Core documentation, established BIPs, and primary historical records. Keep examples current and wallet-neutral.

**Special accuracy concerns:**
Do not promise finality after a fixed confirmation count. Explain risk-based settlement depth.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BASICS | Bitcoin Basics
- Primary path: MSC-PATH-NETWORK | Understand the Network
- Prerequisite guides: MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- Branch guide: MSC-GUIDE-026 | How Bitcoin Blocks Work
- Featured route: MSC-ROUTE-001 | How a Bitcoin Transaction Moves

**Future content opportunities:**
- Frequently asked questions companion for Confirmations
- Deeper technical or historical companion focused on one major tradeoff involving Confirmations

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-basics
- learn-category:bitcoin-basics
- learn-subcategory:essentials
- path:understand-the-network
- path:start-with-bitcoin
- path:use-bitcoin-safely
- level:surface
- format:explainer
- subject:confirmations
- subject:blocks
- subject:transactions

##### MSC-GUIDE-015: What Is the Bitcoin Halving?

**Registry ID:**
MSC-GUIDE-015

**Page role:**
page-role:topic-guide

**Display label:**
Halving

**Final recommended H1:**
What Is the Bitcoin Halving?

**Recommended slug:**
bitcoin-halving

**Status:**
PLANNED

**Production order:**
Phase 5.03: Bitcoin Basics / Essentials

**Parent destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Basics

**Learn subcategory:**
Essentials

**Subcategory anchor:**
#essentials on planned hub slug learn-bitcoin-basics

**Primary learning path:**
Understand the Network

**Secondary learning paths:**
- Start With Bitcoin

**Depth level:**
Surface

**Content format:**
Explainer

**Target reader:**
A general reader with no required prior Bitcoin knowledge.

**Reader search intent:**
Informational: understand bitcoin halving, how it works, and why it matters to Bitcoin.

**Primary search phrase:**
bitcoin halving

**Related search phrases:**
- halving explained
- halving bitcoin
- bitcoin mining

**Supporting subject tags:**
- halving
- mining
- supply

**Prerequisite guides:**
- MSC-GUIDE-001 | What Is Bitcoin?

**Previous guide:**
MSC-GUIDE-014 | How Bitcoin Confirmations Work

**Next guide:**
MSC-GUIDE-016 | Bitcoin Best Practices for Safe Everyday Use

**Recommended branch guide:**
MSC-GUIDE-020 | How Bitcoin's Difficulty Adjustment Works

**Return destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Recommended learning path continuation:**
MSC-GUIDE-058 | How Digital Signatures Work in Bitcoin

**Related category hub:**
MSC-HUB-BASICS | Bitcoin Basics

**Related glossary terms:**
- Halving
- Mining
- Block subsidy

**Potential related editorials:**
- Interview with an educator or wallet builder about teaching Halving
- Community story showing where readers misunderstand Halving

**Suggested card description:**
Halving: core mechanics, practical relevance, and connections to the wider Bitcoin system.

**Suggested card action label:**
Read the explainer

**Suggested article length:**
1,400 to 2,000 words

**Suggested reading time range:**
7 to 10 minutes

**Required research notes:**
Use Bitcoin consensus rules and historical block subsidy data. Verify the next scheduled halving context at article draft time.

**Special accuracy concerns:**
Avoid deterministic price claims tied to halvings. Separate issuance mechanics from market interpretation.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BASICS | Bitcoin Basics
- Primary path: MSC-PATH-NETWORK | Understand the Network
- Prerequisite guides: MSC-GUIDE-001 | What Is Bitcoin?
- Branch guide: MSC-GUIDE-020 | How Bitcoin's Difficulty Adjustment Works

**Future content opportunities:**
- Frequently asked questions companion for Halving
- Deeper technical or historical companion focused on one major tradeoff involving Halving

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-basics
- learn-category:bitcoin-basics
- learn-subcategory:essentials
- path:understand-the-network
- path:start-with-bitcoin
- level:surface
- format:explainer
- subject:halving
- subject:mining
- subject:supply

##### MSC-GUIDE-016: Bitcoin Best Practices for Safe Everyday Use

**Registry ID:**
MSC-GUIDE-016

**Page role:**
page-role:topic-guide

**Display label:**
Best Practices

**Final recommended H1:**
Bitcoin Best Practices for Safe Everyday Use

**Recommended slug:**
bitcoin-best-practices

**Status:**
PLANNED

**Production order:**
Phase 5.04: Bitcoin Basics / Essentials

**Parent destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Basics

**Learn subcategory:**
Essentials

**Subcategory anchor:**
#essentials on planned hub slug learn-bitcoin-basics

**Primary learning path:**
Use Bitcoin Safely

**Secondary learning paths:**
- Start With Bitcoin

**Depth level:**
Surface

**Content format:**
Guide

**Target reader:**
A general reader with no required prior Bitcoin knowledge.

**Reader search intent:**
Practical informational: understand bitcoin best practices and apply sound decisions without relying on promotional claims.

**Primary search phrase:**
bitcoin best practices

**Related search phrases:**
- best practices explained
- best practices bitcoin
- bitcoin security
- bitcoin privacy

**Supporting subject tags:**
- security
- privacy
- self-custody
- transactions

**Prerequisite guides:**
- MSC-GUIDE-005 | What Is a Bitcoin Wallet?
- MSC-GUIDE-006 | What Is Bitcoin Self-Custody?
- MSC-GUIDE-007 | How to Send and Receive Bitcoin

**Previous guide:**
MSC-GUIDE-015 | What Is the Bitcoin Halving?

**Next guide:**
MSC-GUIDE-017 | How Bitcoin Mining Works

**Recommended branch guide:**
MSC-GUIDE-012 | How Bitcoin Privacy Works

**Return destination:**
MSC-HUB-BASICS | Bitcoin Basics

**Recommended learning path continuation:**
MSC-GUIDE-074 | How Bitcoin Wallet Providers Operate

**Related category hub:**
MSC-HUB-BASICS | Bitcoin Basics

**Related glossary terms:**
- Best practice
- Threat model
- Bitcoin privacy
- Self-Custody
- Transaction

**Potential related editorials:**
- Interview with an educator or wallet builder about teaching Best Practices
- Community story showing where readers misunderstand Best Practices

**Suggested card description:**
Best Practices: practical guidance, sound decision criteria, and clearly stated limits.

**Suggested card action label:**
Read the guide

**Suggested article length:**
1,400 to 2,000 words

**Suggested reading time range:**
7 to 10 minutes

**Required research notes:**
Use the Bitcoin white paper, Bitcoin Core documentation, established BIPs, and primary historical records. Keep examples current and wallet-neutral.

**Special accuracy concerns:**
Keep the distinction between Bitcoin the network and bitcoin the asset. Avoid investment claims and universal advice.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BASICS | Bitcoin Basics
- Primary path: MSC-PATH-SAFE | Use Bitcoin Safely
- Prerequisite guides: MSC-GUIDE-005 | What Is a Bitcoin Wallet?; MSC-GUIDE-006 | What Is Bitcoin Self-Custody?; MSC-GUIDE-007 | How to Send and Receive Bitcoin
- Branch guide: MSC-GUIDE-012 | How Bitcoin Privacy Works

**Future content opportunities:**
- Frequently asked questions companion for Best Practices
- Deeper technical or historical companion focused on one major tradeoff involving Best Practices

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-basics
- learn-category:bitcoin-basics
- learn-subcategory:essentials
- path:use-bitcoin-safely
- path:start-with-bitcoin
- level:surface
- format:guide
- subject:security
- subject:privacy
- subject:self-custody
- subject:transactions

### The Bitcoin Network

#### Mining

##### MSC-GUIDE-017: How Bitcoin Mining Works

**Registry ID:**
MSC-GUIDE-017

**Page role:**
page-role:topic-guide

**Display label:**
Mining

**Final recommended H1:**
How Bitcoin Mining Works

**Recommended slug:**
how-bitcoin-mining-works

**Status:**
PLANNED

**Production order:**
Phase 6.01: The Bitcoin Network / Mining

**Parent destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Parent category:**
Learn

**Primary Learn category:**
The Bitcoin Network

**Learn subcategory:**
Mining

**Subcategory anchor:**
#mining on planned hub slug learn-bitcoin-network

**Primary learning path:**
Understand the Network

**Secondary learning paths:**
- Explore the Ecosystem
- Build on Bitcoin

**Depth level:**
Shallow

**Content format:**
Explainer

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Informational: understand how bitcoin mining works, how it works, and why it matters to Bitcoin.

**Primary search phrase:**
how bitcoin mining works

**Related search phrases:**
- mining explained
- mining bitcoin
- how bitcoin mining works
- bitcoin proof of work

**Supporting subject tags:**
- mining
- proof-of-work
- blocks

**Prerequisite guides:**
- MSC-GUIDE-001 | What Is Bitcoin?
- MSC-GUIDE-029 | How Bitcoin Proof of Work Secures the Network

**Previous guide:**
MSC-GUIDE-016 | Bitcoin Best Practices for Safe Everyday Use

**Next guide:**
MSC-GUIDE-018 | How Bitcoin Mining Pools Work

**Recommended branch guide:**
MSC-GUIDE-020 | How Bitcoin's Difficulty Adjustment Works

**Return destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Recommended learning path continuation:**
MSC-GUIDE-018 | How Bitcoin Mining Pools Work

**Related category hub:**
MSC-HUB-NETWORK | The Bitcoin Network

**Related glossary terms:**
- Mining
- Proof of work
- Block

**Potential related editorials:**
- Technical highlight tied to a current change or debate involving Mining
- Developer or operator interview showing Mining in practice

**Suggested card description:**
Mining: core mechanics, practical relevance, and connections to the wider Bitcoin system.

**Suggested card action label:**
Read the explainer

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use Bitcoin Core documentation and source, relevant BIPs, Bitcoin Optech technical references, and dated network data when examples require it.

**Special accuracy concerns:**
Separate transaction selection, proof of work, block construction, and consensus validation.

**Internal link opportunities:**
- Parent hub: MSC-HUB-NETWORK | The Bitcoin Network
- Primary path: MSC-PATH-NETWORK | Understand the Network
- Prerequisite guides: MSC-GUIDE-001 | What Is Bitcoin?; MSC-GUIDE-029 | How Bitcoin Proof of Work Secures the Network
- Branch guide: MSC-GUIDE-020 | How Bitcoin's Difficulty Adjustment Works

**Future content opportunities:**
- Frequently asked questions companion for Mining
- Deeper technical or historical companion focused on one major tradeoff involving Mining

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-network
- learn-category:bitcoin-network
- learn-subcategory:mining
- path:understand-the-network
- path:explore-the-ecosystem
- path:build-on-bitcoin
- level:shallow
- format:explainer
- subject:mining
- subject:proof-of-work
- subject:blocks

##### MSC-GUIDE-018: How Bitcoin Mining Pools Work

**Registry ID:**
MSC-GUIDE-018

**Page role:**
page-role:topic-guide

**Display label:**
Mining Pools

**Final recommended H1:**
How Bitcoin Mining Pools Work

**Recommended slug:**
bitcoin-mining-pools

**Status:**
PLANNED

**Production order:**
Phase 6.02: The Bitcoin Network / Mining

**Parent destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Parent category:**
Learn

**Primary Learn category:**
The Bitcoin Network

**Learn subcategory:**
Mining

**Subcategory anchor:**
#mining on planned hub slug learn-bitcoin-network

**Primary learning path:**
Understand the Network

**Secondary learning paths:**
- Explore the Ecosystem

**Depth level:**
Shallow

**Content format:**
Explainer

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Informational: understand bitcoin mining pools, how it works, and why it matters to Bitcoin.

**Primary search phrase:**
bitcoin mining pools

**Related search phrases:**
- mining pools explained
- mining pools bitcoin
- how bitcoin mining pools work

**Supporting subject tags:**
- mining
- mining-pools
- hashrate

**Prerequisite guides:**
- MSC-GUIDE-017 | How Bitcoin Mining Works

**Previous guide:**
MSC-GUIDE-017 | How Bitcoin Mining Works

**Next guide:**
MSC-GUIDE-019 | What Is an ASIC Miner?

**Recommended branch guide:**
MSC-GUIDE-019 | What Is an ASIC Miner?

**Return destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Recommended learning path continuation:**
MSC-GUIDE-019 | What Is an ASIC Miner?

**Related category hub:**
MSC-HUB-NETWORK | The Bitcoin Network

**Related glossary terms:**
- Mining pool
- Mining
- Hashrate

**Potential related editorials:**
- Technical highlight tied to a current change or debate involving Mining Pools
- Developer or operator interview showing Mining Pools in practice

**Suggested card description:**
Mining Pools: core mechanics, practical relevance, and connections to the wider Bitcoin system.

**Suggested card action label:**
Read the explainer

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use current pool protocols, payout models, and concentration data. Date all market-share examples.

**Special accuracy concerns:**
Do not confuse pool hashrate with ownership of mining hardware or unilateral control of consensus.

**Internal link opportunities:**
- Parent hub: MSC-HUB-NETWORK | The Bitcoin Network
- Primary path: MSC-PATH-NETWORK | Understand the Network
- Prerequisite guides: MSC-GUIDE-017 | How Bitcoin Mining Works
- Branch guide: MSC-GUIDE-019 | What Is an ASIC Miner?

**Future content opportunities:**
- Frequently asked questions companion for Mining Pools
- Deeper technical or historical companion focused on one major tradeoff involving Mining Pools

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-network
- learn-category:bitcoin-network
- learn-subcategory:mining
- path:understand-the-network
- path:explore-the-ecosystem
- level:shallow
- format:explainer
- subject:mining
- subject:mining-pools
- subject:hashrate

##### MSC-GUIDE-019: What Is an ASIC Miner?

**Registry ID:**
MSC-GUIDE-019

**Page role:**
page-role:topic-guide

**Display label:**
ASIC Miners

**Final recommended H1:**
What Is an ASIC Miner?

**Recommended slug:**
bitcoin-asic-miners

**Status:**
PLANNED

**Production order:**
Phase 6.03: The Bitcoin Network / Mining

**Parent destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Parent category:**
Learn

**Primary Learn category:**
The Bitcoin Network

**Learn subcategory:**
Mining

**Subcategory anchor:**
#mining on planned hub slug learn-bitcoin-network

**Primary learning path:**
Understand the Network

**Secondary learning paths:**
- Explore the Ecosystem

**Depth level:**
Shallow

**Content format:**
Explainer

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Informational: understand bitcoin asic miners, how it works, and why it matters to Bitcoin.

**Primary search phrase:**
bitcoin asic miners

**Related search phrases:**
- asic miners explained
- asic miners bitcoin
- bitcoin mining

**Supporting subject tags:**
- mining
- asic
- hashrate

**Prerequisite guides:**
- MSC-GUIDE-017 | How Bitcoin Mining Works

**Previous guide:**
MSC-GUIDE-018 | How Bitcoin Mining Pools Work

**Next guide:**
MSC-GUIDE-020 | How Bitcoin's Difficulty Adjustment Works

**Recommended branch guide:**
MSC-GUIDE-028 | What Is Bitcoin Hashrate?

**Return destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Recommended learning path continuation:**
MSC-GUIDE-028 | What Is Bitcoin Hashrate?

**Related category hub:**
MSC-HUB-NETWORK | The Bitcoin Network

**Related glossary terms:**
- ASIC miner
- Mining
- Hashrate

**Potential related editorials:**
- Technical highlight tied to a current change or debate involving ASIC Miners
- Developer or operator interview showing ASIC Miners in practice

**Suggested card description:**
ASIC Miners: core mechanics, practical relevance, and connections to the wider Bitcoin system.

**Suggested card action label:**
Read the explainer

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use Bitcoin Core documentation and source, relevant BIPs, Bitcoin Optech technical references, and dated network data when examples require it.

**Special accuracy concerns:**
Distinguish consensus rules, node policy, miner behavior, estimates, and social coordination.

**Internal link opportunities:**
- Parent hub: MSC-HUB-NETWORK | The Bitcoin Network
- Primary path: MSC-PATH-NETWORK | Understand the Network
- Prerequisite guides: MSC-GUIDE-017 | How Bitcoin Mining Works
- Branch guide: MSC-GUIDE-028 | What Is Bitcoin Hashrate?

**Future content opportunities:**
- Frequently asked questions companion for ASIC Miners
- Deeper technical or historical companion focused on one major tradeoff involving ASIC Miners

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-network
- learn-category:bitcoin-network
- learn-subcategory:mining
- path:understand-the-network
- path:explore-the-ecosystem
- level:shallow
- format:explainer
- subject:mining
- subject:asic
- subject:hashrate

##### MSC-GUIDE-020: How Bitcoin's Difficulty Adjustment Works

**Registry ID:**
MSC-GUIDE-020

**Page role:**
page-role:topic-guide

**Display label:**
Difficulty Adjustment

**Final recommended H1:**
How Bitcoin's Difficulty Adjustment Works

**Recommended slug:**
bitcoin-difficulty-adjustment

**Status:**
PLANNED

**Production order:**
Phase 6.04: The Bitcoin Network / Mining

**Parent destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Parent category:**
Learn

**Primary Learn category:**
The Bitcoin Network

**Learn subcategory:**
Mining

**Subcategory anchor:**
#mining on planned hub slug learn-bitcoin-network

**Primary learning path:**
Understand the Network

**Secondary learning paths:**
- Build on Bitcoin

**Depth level:**
Deep

**Content format:**
Technical Analysis

**Target reader:**
An informed reader who wants meaningful technical, economic, or operational detail.

**Reader search intent:**
Advanced informational: understand the design, tradeoffs, maturity, and risks of bitcoin difficulty adjustment.

**Primary search phrase:**
bitcoin difficulty adjustment

**Related search phrases:**
- difficulty adjustment explained
- difficulty adjustment bitcoin
- how bitcoin's difficulty adjustment works
- bitcoin mining

**Supporting subject tags:**
- difficulty
- mining
- hashrate
- consensus

**Prerequisite guides:**
- MSC-GUIDE-017 | How Bitcoin Mining Works
- MSC-GUIDE-028 | What Is Bitcoin Hashrate?

**Previous guide:**
MSC-GUIDE-019 | What Is an ASIC Miner?

**Next guide:**
MSC-GUIDE-021 | What Is a Bitcoin Full Node?

**Recommended branch guide:**
MSC-GUIDE-030 | How Bitcoin Reaches Consensus

**Return destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Recommended learning path continuation:**
MSC-GUIDE-030 | How Bitcoin Reaches Consensus

**Related category hub:**
MSC-HUB-NETWORK | The Bitcoin Network

**Related glossary terms:**
- Difficulty adjustment
- Mining
- Hashrate
- Consensus

**Potential related editorials:**
- Technical highlight tied to a current change or debate involving Difficulty Adjustment
- Developer or operator interview showing Difficulty Adjustment in practice

**Suggested card description:**
Difficulty Adjustment: design, tradeoffs, maturity, risks, and open questions.

**Suggested card action label:**
Read the analysis

**Suggested article length:**
2,200 to 3,200 words

**Suggested reading time range:**
12 to 18 minutes

**Required research notes:**
Use Bitcoin Core consensus logic, historical retarget examples, and current technical references.

**Special accuracy concerns:**
Be exact about the 2,016-block retarget interval, target timespan, and edge cases at publication.

**Internal link opportunities:**
- Parent hub: MSC-HUB-NETWORK | The Bitcoin Network
- Primary path: MSC-PATH-NETWORK | Understand the Network
- Prerequisite guides: MSC-GUIDE-017 | How Bitcoin Mining Works; MSC-GUIDE-028 | What Is Bitcoin Hashrate?
- Branch guide: MSC-GUIDE-030 | How Bitcoin Reaches Consensus

**Future content opportunities:**
- Frequently asked questions companion for Difficulty Adjustment
- Surface-level companion explainer for readers not ready for the full technical treatment

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-network
- learn-category:bitcoin-network
- learn-subcategory:mining
- path:understand-the-network
- path:build-on-bitcoin
- level:deep
- format:technical-analysis
- subject:difficulty
- subject:mining
- subject:hashrate
- subject:consensus

#### Nodes

##### MSC-GUIDE-021: What Is a Bitcoin Full Node?

**Registry ID:**
MSC-GUIDE-021

**Page role:**
page-role:topic-guide

**Display label:**
Full Nodes

**Final recommended H1:**
What Is a Bitcoin Full Node?

**Recommended slug:**
bitcoin-full-node

**Status:**
PLANNED

**Production order:**
Phase 7.01: The Bitcoin Network / Nodes

**Parent destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Parent category:**
Learn

**Primary Learn category:**
The Bitcoin Network

**Learn subcategory:**
Nodes

**Subcategory anchor:**
#nodes on planned hub slug learn-bitcoin-network

**Primary learning path:**
Understand the Network

**Secondary learning paths:**
- Use Bitcoin Safely
- Build on Bitcoin

**Depth level:**
Shallow

**Content format:**
Explainer

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Informational: understand bitcoin full node, how it works, and why it matters to Bitcoin.

**Primary search phrase:**
bitcoin full node

**Related search phrases:**
- full nodes explained
- full nodes bitcoin
- bitcoin validation

**Supporting subject tags:**
- nodes
- validation
- consensus

**Prerequisite guides:**
- MSC-GUIDE-001 | What Is Bitcoin?

**Previous guide:**
MSC-GUIDE-020 | How Bitcoin's Difficulty Adjustment Works

**Next guide:**
MSC-GUIDE-022 | What Is a Pruned Bitcoin Node?

**Recommended branch guide:**
MSC-GUIDE-023 | How to Run a Bitcoin Node

**Return destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Recommended learning path continuation:**
MSC-GUIDE-022 | What Is a Pruned Bitcoin Node?

**Related category hub:**
MSC-HUB-NETWORK | The Bitcoin Network

**Related glossary terms:**
- Full node
- Node
- Validation
- Consensus

**Potential related editorials:**
- Technical highlight tied to a current change or debate involving Full Nodes
- Developer or operator interview showing Full Nodes in practice

**Suggested card description:**
Full Nodes: core mechanics, practical relevance, and connections to the wider Bitcoin system.

**Suggested card action label:**
Read the explainer

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use Bitcoin Core documentation and source, relevant BIPs, Bitcoin Optech technical references, and dated network data when examples require it.

**Special accuracy concerns:**
Do not claim a node creates consensus by itself. Explain independent validation and network coordination.

**Internal link opportunities:**
- Parent hub: MSC-HUB-NETWORK | The Bitcoin Network
- Primary path: MSC-PATH-NETWORK | Understand the Network
- Prerequisite guides: MSC-GUIDE-001 | What Is Bitcoin?
- Branch guide: MSC-GUIDE-023 | How to Run a Bitcoin Node

**Future content opportunities:**
- Frequently asked questions companion for Full Nodes
- Deeper technical or historical companion focused on one major tradeoff involving Full Nodes

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-network
- learn-category:bitcoin-network
- learn-subcategory:nodes
- path:understand-the-network
- path:use-bitcoin-safely
- path:build-on-bitcoin
- level:shallow
- format:explainer
- subject:nodes
- subject:validation
- subject:consensus

##### MSC-GUIDE-022: What Is a Pruned Bitcoin Node?

**Registry ID:**
MSC-GUIDE-022

**Page role:**
page-role:topic-guide

**Display label:**
Pruned Nodes

**Final recommended H1:**
What Is a Pruned Bitcoin Node?

**Recommended slug:**
pruned-bitcoin-node

**Status:**
PLANNED

**Production order:**
Phase 7.02: The Bitcoin Network / Nodes

**Parent destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Parent category:**
Learn

**Primary Learn category:**
The Bitcoin Network

**Learn subcategory:**
Nodes

**Subcategory anchor:**
#nodes on planned hub slug learn-bitcoin-network

**Primary learning path:**
Understand the Network

**Secondary learning paths:**
- Build on Bitcoin

**Depth level:**
Shallow

**Content format:**
Comparison

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Comparative: understand the main models, tradeoffs, and selection criteria for pruned bitcoin node.

**Primary search phrase:**
pruned bitcoin node

**Related search phrases:**
- pruned nodes explained
- pruned nodes bitcoin
- bitcoin storage

**Supporting subject tags:**
- nodes
- storage
- validation

**Prerequisite guides:**
- MSC-GUIDE-021 | What Is a Bitcoin Full Node?

**Previous guide:**
MSC-GUIDE-021 | What Is a Bitcoin Full Node?

**Next guide:**
MSC-GUIDE-023 | How to Run a Bitcoin Node

**Recommended branch guide:**
MSC-GUIDE-024 | Bitcoin Node Software Explained

**Return destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Recommended learning path continuation:**
MSC-GUIDE-023 | How to Run a Bitcoin Node

**Related category hub:**
MSC-HUB-NETWORK | The Bitcoin Network

**Related glossary terms:**
- Pruned node
- Node
- Pruning
- Validation

**Potential related editorials:**
- Technical highlight tied to a current change or debate involving Pruned Nodes
- Developer or operator interview showing Pruned Nodes in practice

**Suggested card description:**
Pruned Nodes: main models, tradeoffs, use cases, and selection criteria.

**Suggested card action label:**
Compare the options

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use Bitcoin Core documentation and source, relevant BIPs, Bitcoin Optech technical references, and dated network data when examples require it.

**Special accuracy concerns:**
Explain what pruning removes and what validation guarantees remain.

**Internal link opportunities:**
- Parent hub: MSC-HUB-NETWORK | The Bitcoin Network
- Primary path: MSC-PATH-NETWORK | Understand the Network
- Prerequisite guides: MSC-GUIDE-021 | What Is a Bitcoin Full Node?
- Branch guide: MSC-GUIDE-024 | Bitcoin Node Software Explained

**Future content opportunities:**
- Frequently asked questions companion for Pruned Nodes
- Deeper technical or historical companion focused on one major tradeoff involving Pruned Nodes

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-network
- learn-category:bitcoin-network
- learn-subcategory:nodes
- path:understand-the-network
- path:build-on-bitcoin
- level:shallow
- format:comparison
- subject:nodes
- subject:storage
- subject:validation

##### MSC-GUIDE-023: How to Run a Bitcoin Node

**Registry ID:**
MSC-GUIDE-023

**Page role:**
page-role:topic-guide

**Display label:**
Running a Node

**Final recommended H1:**
How to Run a Bitcoin Node

**Recommended slug:**
run-a-bitcoin-node

**Status:**
PLANNED

**Production order:**
Phase 7.03: The Bitcoin Network / Nodes

**Parent destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Parent category:**
Learn

**Primary Learn category:**
The Bitcoin Network

**Learn subcategory:**
Nodes

**Subcategory anchor:**
#nodes on planned hub slug learn-bitcoin-network

**Primary learning path:**
Understand the Network

**Secondary learning paths:**
- Use Bitcoin Safely
- Build on Bitcoin

**Depth level:**
Shallow

**Content format:**
Walkthrough

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Practical: follow the steps involved in run a bitcoin node and understand the decisions and risks.

**Primary search phrase:**
run a bitcoin node

**Related search phrases:**
- running a node explained
- running a node bitcoin
- how to run a bitcoin node
- bitcoin nodes

**Supporting subject tags:**
- nodes
- bitcoin-core
- privacy

**Prerequisite guides:**
- MSC-GUIDE-021 | What Is a Bitcoin Full Node?

**Previous guide:**
MSC-GUIDE-022 | What Is a Pruned Bitcoin Node?

**Next guide:**
MSC-GUIDE-024 | Bitcoin Node Software Explained

**Recommended branch guide:**
MSC-GUIDE-024 | Bitcoin Node Software Explained

**Return destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Recommended learning path continuation:**
MSC-GUIDE-024 | Bitcoin Node Software Explained

**Related category hub:**
MSC-HUB-NETWORK | The Bitcoin Network

**Related glossary terms:**
- Node
- Bitcoin Core
- Bitcoin privacy

**Potential related editorials:**
- Technical highlight tied to a current change or debate involving Running a Node
- Developer or operator interview showing Running a Node in practice

**Suggested card description:**
Running a Node: a practical sequence with the decisions, checks, and risks that matter.

**Suggested card action label:**
Follow the walkthrough

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use current Bitcoin Core documentation and operating system guidance. Keep commands version-aware.

**Special accuracy concerns:**
Do not imply that opening inbound ports is mandatory. Address bandwidth, storage, privacy, and update tradeoffs.

**Internal link opportunities:**
- Parent hub: MSC-HUB-NETWORK | The Bitcoin Network
- Primary path: MSC-PATH-NETWORK | Understand the Network
- Prerequisite guides: MSC-GUIDE-021 | What Is a Bitcoin Full Node?
- Branch guide: MSC-GUIDE-024 | Bitcoin Node Software Explained
- Future Tools connection: a practical tool page related to run a bitcoin node, activated only after that destination exists

**Future content opportunities:**
- Frequently asked questions companion for Running a Node
- Deeper technical or historical companion focused on one major tradeoff involving Running a Node

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-network
- learn-category:bitcoin-network
- learn-subcategory:nodes
- path:understand-the-network
- path:use-bitcoin-safely
- path:build-on-bitcoin
- level:shallow
- format:walkthrough
- subject:nodes
- subject:bitcoin-core
- subject:privacy

##### MSC-GUIDE-024: Bitcoin Node Software Explained

**Registry ID:**
MSC-GUIDE-024

**Page role:**
page-role:topic-guide

**Display label:**
Node Software

**Final recommended H1:**
Bitcoin Node Software Explained

**Recommended slug:**
bitcoin-node-software

**Status:**
PLANNED

**Production order:**
Phase 7.04: The Bitcoin Network / Nodes

**Parent destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Parent category:**
Learn

**Primary Learn category:**
The Bitcoin Network

**Learn subcategory:**
Nodes

**Subcategory anchor:**
#nodes on planned hub slug learn-bitcoin-network

**Primary learning path:**
Understand the Network

**Secondary learning paths:**
- Build on Bitcoin

**Depth level:**
Deep

**Content format:**
Comparison

**Target reader:**
An informed reader who wants meaningful technical, economic, or operational detail.

**Reader search intent:**
Comparative: understand the main models, tradeoffs, and selection criteria for bitcoin node software.

**Primary search phrase:**
bitcoin node software

**Related search phrases:**
- node software explained
- node software bitcoin
- bitcoin nodes
- bitcoin bitcoin core

**Supporting subject tags:**
- nodes
- bitcoin-core
- bitcoin-knots
- software

**Prerequisite guides:**
- MSC-GUIDE-021 | What Is a Bitcoin Full Node?

**Previous guide:**
MSC-GUIDE-023 | How to Run a Bitcoin Node

**Next guide:**
MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?

**Recommended branch guide:**
MSC-GUIDE-049 | What Is Bitcoin Core?

**Return destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Recommended learning path continuation:**
MSC-GUIDE-029 | How Bitcoin Proof of Work Secures the Network

**Related category hub:**
MSC-HUB-NETWORK | The Bitcoin Network

**Related glossary terms:**
- Node software
- Node
- Bitcoin Core
- Bitcoin Knots

**Potential related editorials:**
- Technical highlight tied to a current change or debate involving Node Software
- Developer or operator interview showing Node Software in practice

**Suggested card description:**
Node Software: main models, tradeoffs, use cases, and selection criteria.

**Suggested card action label:**
Compare the options

**Suggested article length:**
2,200 to 3,200 words

**Suggested reading time range:**
12 to 18 minutes

**Required research notes:**
Compare maintained node implementations using official documentation, release notes, and source repositories.

**Special accuracy concerns:**
Avoid factional framing. Compare software based on documented behavior, maintenance, policy, and compatibility.

**Internal link opportunities:**
- Parent hub: MSC-HUB-NETWORK | The Bitcoin Network
- Primary path: MSC-PATH-NETWORK | Understand the Network
- Prerequisite guides: MSC-GUIDE-021 | What Is a Bitcoin Full Node?
- Branch guide: MSC-GUIDE-049 | What Is Bitcoin Core?

**Future content opportunities:**
- Frequently asked questions companion for Node Software
- Surface-level companion explainer for readers not ready for the full technical treatment

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-network
- learn-category:bitcoin-network
- learn-subcategory:nodes
- path:understand-the-network
- path:build-on-bitcoin
- level:deep
- format:comparison
- subject:nodes
- subject:bitcoin-core
- subject:bitcoin-knots
- subject:software

#### Network

##### MSC-GUIDE-025: What Happens Inside the Bitcoin Mempool?

**Registry ID:**
MSC-GUIDE-025

**Page role:**
page-role:topic-guide

**Display label:**
Mempool

**Final recommended H1:**
What Happens Inside the Bitcoin Mempool?

**Recommended slug:**
bitcoin-mempool

**Status:**
PLANNED

**Production order:**
Phase 8.01: The Bitcoin Network / Network

**Parent destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Parent category:**
Learn

**Primary Learn category:**
The Bitcoin Network

**Learn subcategory:**
Network

**Subcategory anchor:**
#network on planned hub slug learn-bitcoin-network

**Primary learning path:**
Understand the Network

**Secondary learning paths:**
- Start With Bitcoin
- Build on Bitcoin

**Depth level:**
Shallow

**Content format:**
Explainer

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Informational: understand bitcoin mempool, how it works, and why it matters to Bitcoin.

**Primary search phrase:**
bitcoin mempool

**Related search phrases:**
- mempool explained
- mempool bitcoin
- bitcoin transactions

**Supporting subject tags:**
- mempool
- transactions
- fees
- nodes

**Prerequisite guides:**
- MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- MSC-GUIDE-013 | What Are UTXOs in Bitcoin?

**Previous guide:**
MSC-GUIDE-024 | Bitcoin Node Software Explained

**Next guide:**
MSC-GUIDE-026 | How Bitcoin Blocks Work

**Recommended branch guide:**
MSC-ROUTE-001 | How a Bitcoin Transaction Moves

**Return destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Recommended learning path continuation:**
MSC-GUIDE-026 | How Bitcoin Blocks Work

**Related category hub:**
MSC-HUB-NETWORK | The Bitcoin Network

**Related glossary terms:**
- Mempool
- Transaction
- Fee rate
- Node

**Potential related editorials:**
- Technical highlight tied to a current change or debate involving Mempool
- Developer or operator interview showing Mempool in practice

**Suggested card description:**
Mempool: core mechanics, practical relevance, and connections to the wider Bitcoin system.

**Suggested card action label:**
Read the explainer

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use Bitcoin Core documentation and source, relevant BIPs, Bitcoin Optech technical references, and dated network data when examples require it.

**Special accuracy concerns:**
Explain that nodes maintain their own mempools and that contents can differ.

**Internal link opportunities:**
- Parent hub: MSC-HUB-NETWORK | The Bitcoin Network
- Primary path: MSC-PATH-NETWORK | Understand the Network
- Prerequisite guides: MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work; MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
- Branch guide: MSC-ROUTE-001 | How a Bitcoin Transaction Moves
- Featured route: MSC-ROUTE-001 | How a Bitcoin Transaction Moves

**Future content opportunities:**
- Frequently asked questions companion for Mempool
- Deeper technical or historical companion focused on one major tradeoff involving Mempool

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-network
- learn-category:bitcoin-network
- learn-subcategory:network
- path:understand-the-network
- path:start-with-bitcoin
- path:build-on-bitcoin
- level:shallow
- format:explainer
- subject:mempool
- subject:transactions
- subject:fees
- subject:nodes

##### MSC-GUIDE-026: How Bitcoin Blocks Work

**Registry ID:**
MSC-GUIDE-026

**Page role:**
page-role:topic-guide

**Display label:**
Blocks

**Final recommended H1:**
How Bitcoin Blocks Work

**Recommended slug:**
bitcoin-blocks

**Status:**
PLANNED

**Production order:**
Phase 8.02: The Bitcoin Network / Network

**Parent destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Parent category:**
Learn

**Primary Learn category:**
The Bitcoin Network

**Learn subcategory:**
Network

**Subcategory anchor:**
#network on planned hub slug learn-bitcoin-network

**Primary learning path:**
Understand the Network

**Secondary learning paths:**
- Start With Bitcoin

**Depth level:**
Shallow

**Content format:**
Explainer

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Informational: understand bitcoin blocks, how it works, and why it matters to Bitcoin.

**Primary search phrase:**
bitcoin blocks

**Related search phrases:**
- blocks explained
- blocks bitcoin
- how bitcoin blocks work
- bitcoin transactions

**Supporting subject tags:**
- blocks
- transactions
- mining

**Prerequisite guides:**
- MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?

**Previous guide:**
MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?

**Next guide:**
MSC-GUIDE-027 | How the Bitcoin Blockchain Works

**Recommended branch guide:**
MSC-GUIDE-060 | How Merkle Trees Work in Bitcoin

**Return destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Recommended learning path continuation:**
MSC-GUIDE-014 | How Bitcoin Confirmations Work

**Related category hub:**
MSC-HUB-NETWORK | The Bitcoin Network

**Related glossary terms:**
- Block
- Transaction
- Mining

**Potential related editorials:**
- Technical highlight tied to a current change or debate involving Blocks
- Developer or operator interview showing Blocks in practice

**Suggested card description:**
Blocks: core mechanics, practical relevance, and connections to the wider Bitcoin system.

**Suggested card action label:**
Read the explainer

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use Bitcoin Core documentation and source, relevant BIPs, Bitcoin Optech technical references, and dated network data when examples require it.

**Special accuracy concerns:**
Separate block templates, candidate blocks, valid blocks, and chain selection.

**Internal link opportunities:**
- Parent hub: MSC-HUB-NETWORK | The Bitcoin Network
- Primary path: MSC-PATH-NETWORK | Understand the Network
- Prerequisite guides: MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?
- Branch guide: MSC-GUIDE-060 | How Merkle Trees Work in Bitcoin
- Featured route: MSC-ROUTE-001 | How a Bitcoin Transaction Moves

**Future content opportunities:**
- Frequently asked questions companion for Blocks
- Deeper technical or historical companion focused on one major tradeoff involving Blocks

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-network
- learn-category:bitcoin-network
- learn-subcategory:network
- path:understand-the-network
- path:start-with-bitcoin
- level:shallow
- format:explainer
- subject:blocks
- subject:transactions
- subject:mining

##### MSC-GUIDE-027: How the Bitcoin Blockchain Works

**Registry ID:**
MSC-GUIDE-027

**Page role:**
page-role:topic-guide

**Display label:**
Blockchain

**Final recommended H1:**
How the Bitcoin Blockchain Works

**Recommended slug:**
bitcoin-blockchain

**Status:**
PLANNED

**Production order:**
Phase 8.03: The Bitcoin Network / Network

**Parent destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Parent category:**
Learn

**Primary Learn category:**
The Bitcoin Network

**Learn subcategory:**
Network

**Subcategory anchor:**
#network on planned hub slug learn-bitcoin-network

**Primary learning path:**
Understand the Network

**Secondary learning paths:**
- Start With Bitcoin

**Depth level:**
Shallow

**Content format:**
Explainer

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Informational: understand bitcoin blockchain, how it works, and why it matters to Bitcoin.

**Primary search phrase:**
bitcoin blockchain

**Related search phrases:**
- blockchain explained
- blockchain bitcoin
- how the bitcoin blockchain works
- bitcoin blocks

**Supporting subject tags:**
- blockchain
- blocks
- nodes

**Prerequisite guides:**
- MSC-GUIDE-026 | How Bitcoin Blocks Work

**Previous guide:**
MSC-GUIDE-026 | How Bitcoin Blocks Work

**Next guide:**
MSC-GUIDE-028 | What Is Bitcoin Hashrate?

**Recommended branch guide:**
MSC-GUIDE-030 | How Bitcoin Reaches Consensus

**Return destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Recommended learning path continuation:**
MSC-GUIDE-021 | What Is a Bitcoin Full Node?

**Related category hub:**
MSC-HUB-NETWORK | The Bitcoin Network

**Related glossary terms:**
- Blockchain
- Block
- Node

**Potential related editorials:**
- Technical highlight tied to a current change or debate involving Blockchain
- Developer or operator interview showing Blockchain in practice

**Suggested card description:**
Blockchain: core mechanics, practical relevance, and connections to the wider Bitcoin system.

**Suggested card action label:**
Read the explainer

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use Bitcoin Core documentation and source, relevant BIPs, Bitcoin Optech technical references, and dated network data when examples require it.

**Special accuracy concerns:**
Avoid saying transactions are immutable immediately. Explain reorganizations and cumulative work.

**Internal link opportunities:**
- Parent hub: MSC-HUB-NETWORK | The Bitcoin Network
- Primary path: MSC-PATH-NETWORK | Understand the Network
- Prerequisite guides: MSC-GUIDE-026 | How Bitcoin Blocks Work
- Branch guide: MSC-GUIDE-030 | How Bitcoin Reaches Consensus

**Future content opportunities:**
- Frequently asked questions companion for Blockchain
- Deeper technical or historical companion focused on one major tradeoff involving Blockchain

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-network
- learn-category:bitcoin-network
- learn-subcategory:network
- path:understand-the-network
- path:start-with-bitcoin
- level:shallow
- format:explainer
- subject:blockchain
- subject:blocks
- subject:nodes

##### MSC-GUIDE-028: What Is Bitcoin Hashrate?

**Registry ID:**
MSC-GUIDE-028

**Page role:**
page-role:topic-guide

**Display label:**
Hashrate

**Final recommended H1:**
What Is Bitcoin Hashrate?

**Recommended slug:**
bitcoin-hashrate

**Status:**
PLANNED

**Production order:**
Phase 8.04: The Bitcoin Network / Network

**Parent destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Parent category:**
Learn

**Primary Learn category:**
The Bitcoin Network

**Learn subcategory:**
Network

**Subcategory anchor:**
#network on planned hub slug learn-bitcoin-network

**Primary learning path:**
Understand the Network

**Secondary learning paths:**
- Explore the Ecosystem

**Depth level:**
Shallow

**Content format:**
Explainer

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Informational: understand bitcoin hashrate, how it works, and why it matters to Bitcoin.

**Primary search phrase:**
bitcoin hashrate

**Related search phrases:**
- hashrate explained
- hashrate bitcoin
- bitcoin mining

**Supporting subject tags:**
- hashrate
- mining
- security

**Prerequisite guides:**
- MSC-GUIDE-017 | How Bitcoin Mining Works

**Previous guide:**
MSC-GUIDE-027 | How the Bitcoin Blockchain Works

**Next guide:**
MSC-GUIDE-029 | How Bitcoin Proof of Work Secures the Network

**Recommended branch guide:**
MSC-GUIDE-017 | How Bitcoin Mining Works

**Return destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Recommended learning path continuation:**
MSC-GUIDE-020 | How Bitcoin's Difficulty Adjustment Works

**Related category hub:**
MSC-HUB-NETWORK | The Bitcoin Network

**Related glossary terms:**
- Hashrate
- Mining
- Threat model

**Potential related editorials:**
- Technical highlight tied to a current change or debate involving Hashrate
- Developer or operator interview showing Hashrate in practice

**Suggested card description:**
Hashrate: core mechanics, practical relevance, and connections to the wider Bitcoin system.

**Suggested card action label:**
Read the explainer

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use dated hashrate estimates and explain estimation limits rather than presenting a single figure as exact.

**Special accuracy concerns:**
Hashrate is estimated from block production and difficulty. It is not directly observed as a perfect real-time count.

**Internal link opportunities:**
- Parent hub: MSC-HUB-NETWORK | The Bitcoin Network
- Primary path: MSC-PATH-NETWORK | Understand the Network
- Prerequisite guides: MSC-GUIDE-017 | How Bitcoin Mining Works
- Branch guide: MSC-GUIDE-017 | How Bitcoin Mining Works

**Future content opportunities:**
- Frequently asked questions companion for Hashrate
- Deeper technical or historical companion focused on one major tradeoff involving Hashrate

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-network
- learn-category:bitcoin-network
- learn-subcategory:network
- path:understand-the-network
- path:explore-the-ecosystem
- level:shallow
- format:explainer
- subject:hashrate
- subject:mining
- subject:security

#### Consensus

##### MSC-GUIDE-029: How Bitcoin Proof of Work Secures the Network

**Registry ID:**
MSC-GUIDE-029

**Page role:**
page-role:topic-guide

**Display label:**
Proof of Work

**Final recommended H1:**
How Bitcoin Proof of Work Secures the Network

**Recommended slug:**
bitcoin-proof-of-work

**Status:**
PLANNED

**Production order:**
Phase 9.01: The Bitcoin Network / Consensus

**Parent destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Parent category:**
Learn

**Primary Learn category:**
The Bitcoin Network

**Learn subcategory:**
Consensus

**Subcategory anchor:**
#consensus on planned hub slug learn-bitcoin-network

**Primary learning path:**
Understand the Network

**Secondary learning paths:**
- Start With Bitcoin

**Depth level:**
Shallow

**Content format:**
Explainer

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Informational: understand bitcoin proof of work, how it works, and why it matters to Bitcoin.

**Primary search phrase:**
bitcoin proof of work

**Related search phrases:**
- proof of work explained
- proof of work bitcoin
- how bitcoin proof of work secures the network
- bitcoin mining

**Supporting subject tags:**
- proof-of-work
- mining
- security

**Prerequisite guides:**
- MSC-GUIDE-001 | What Is Bitcoin?

**Previous guide:**
MSC-GUIDE-028 | What Is Bitcoin Hashrate?

**Next guide:**
MSC-GUIDE-030 | How Bitcoin Reaches Consensus

**Recommended branch guide:**
MSC-GUIDE-017 | How Bitcoin Mining Works

**Return destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Recommended learning path continuation:**
MSC-GUIDE-017 | How Bitcoin Mining Works

**Related category hub:**
MSC-HUB-NETWORK | The Bitcoin Network

**Related glossary terms:**
- Proof of work
- Mining
- Threat model

**Potential related editorials:**
- Technical highlight tied to a current change or debate involving Proof of Work
- Developer or operator interview showing Proof of Work in practice

**Suggested card description:**
Proof of Work: core mechanics, practical relevance, and connections to the wider Bitcoin system.

**Suggested card action label:**
Read the explainer

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use Bitcoin Core documentation and source, relevant BIPs, Bitcoin Optech technical references, and dated network data when examples require it.

**Special accuracy concerns:**
Avoid energy-as-security slogans without explaining cost, verification, and attack constraints.

**Internal link opportunities:**
- Parent hub: MSC-HUB-NETWORK | The Bitcoin Network
- Primary path: MSC-PATH-NETWORK | Understand the Network
- Prerequisite guides: MSC-GUIDE-001 | What Is Bitcoin?
- Branch guide: MSC-GUIDE-017 | How Bitcoin Mining Works

**Future content opportunities:**
- Frequently asked questions companion for Proof of Work
- Deeper technical or historical companion focused on one major tradeoff involving Proof of Work

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-network
- learn-category:bitcoin-network
- learn-subcategory:consensus
- path:understand-the-network
- path:start-with-bitcoin
- level:shallow
- format:explainer
- subject:proof-of-work
- subject:mining
- subject:security

##### MSC-GUIDE-030: How Bitcoin Reaches Consensus

**Registry ID:**
MSC-GUIDE-030

**Page role:**
page-role:topic-guide

**Display label:**
Consensus

**Final recommended H1:**
How Bitcoin Reaches Consensus

**Recommended slug:**
bitcoin-consensus

**Status:**
PLANNED

**Production order:**
Phase 9.02: The Bitcoin Network / Consensus

**Parent destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Parent category:**
Learn

**Primary Learn category:**
The Bitcoin Network

**Learn subcategory:**
Consensus

**Subcategory anchor:**
#consensus on planned hub slug learn-bitcoin-network

**Primary learning path:**
Understand the Network

**Secondary learning paths:**
- Build on Bitcoin

**Depth level:**
Deep

**Content format:**
Technical Analysis

**Target reader:**
An informed reader who wants meaningful technical, economic, or operational detail.

**Reader search intent:**
Advanced informational: understand the design, tradeoffs, maturity, and risks of bitcoin consensus.

**Primary search phrase:**
bitcoin consensus

**Related search phrases:**
- consensus explained
- consensus bitcoin
- how bitcoin reaches consensus
- bitcoin nodes

**Supporting subject tags:**
- consensus
- nodes
- validation
- protocol

**Prerequisite guides:**
- MSC-GUIDE-021 | What Is a Bitcoin Full Node?
- MSC-GUIDE-029 | How Bitcoin Proof of Work Secures the Network

**Previous guide:**
MSC-GUIDE-029 | How Bitcoin Proof of Work Secures the Network

**Next guide:**
MSC-GUIDE-031 | How Bitcoin Soft Forks Work

**Recommended branch guide:**
MSC-GUIDE-031 | How Bitcoin Soft Forks Work

**Return destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Recommended learning path continuation:**
MSC-GUIDE-031 | How Bitcoin Soft Forks Work

**Related category hub:**
MSC-HUB-NETWORK | The Bitcoin Network

**Related glossary terms:**
- Consensus
- Node
- Validation
- Protocol

**Potential related editorials:**
- Technical highlight tied to a current change or debate involving Consensus
- Developer or operator interview showing Consensus in practice

**Suggested card description:**
Consensus: design, tradeoffs, maturity, risks, and open questions.

**Suggested card action label:**
Read the analysis

**Suggested article length:**
2,200 to 3,200 words

**Suggested reading time range:**
12 to 18 minutes

**Required research notes:**
Use Bitcoin Core validation rules, BIPs, and developer references. Distinguish consensus rules from policy and social coordination.

**Special accuracy concerns:**
Distinguish consensus rules, policy rules, implementation behavior, and human coordination.

**Internal link opportunities:**
- Parent hub: MSC-HUB-NETWORK | The Bitcoin Network
- Primary path: MSC-PATH-NETWORK | Understand the Network
- Prerequisite guides: MSC-GUIDE-021 | What Is a Bitcoin Full Node?; MSC-GUIDE-029 | How Bitcoin Proof of Work Secures the Network
- Branch guide: MSC-GUIDE-031 | How Bitcoin Soft Forks Work

**Future content opportunities:**
- Frequently asked questions companion for Consensus
- Surface-level companion explainer for readers not ready for the full technical treatment

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-network
- learn-category:bitcoin-network
- learn-subcategory:consensus
- path:understand-the-network
- path:build-on-bitcoin
- level:deep
- format:technical-analysis
- subject:consensus
- subject:nodes
- subject:validation
- subject:protocol

##### MSC-GUIDE-031: How Bitcoin Soft Forks Work

**Registry ID:**
MSC-GUIDE-031

**Page role:**
page-role:topic-guide

**Display label:**
Soft Forks

**Final recommended H1:**
How Bitcoin Soft Forks Work

**Recommended slug:**
bitcoin-soft-forks

**Status:**
PLANNED

**Production order:**
Phase 9.03: The Bitcoin Network / Consensus

**Parent destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Parent category:**
Learn

**Primary Learn category:**
The Bitcoin Network

**Learn subcategory:**
Consensus

**Subcategory anchor:**
#consensus on planned hub slug learn-bitcoin-network

**Primary learning path:**
Understand the Network

**Secondary learning paths:**
- Build on Bitcoin

**Depth level:**
Deep

**Content format:**
Explainer

**Target reader:**
An informed reader who wants meaningful technical, economic, or operational detail.

**Reader search intent:**
Informational: understand bitcoin soft forks, how it works, and why it matters to Bitcoin.

**Primary search phrase:**
bitcoin soft forks

**Related search phrases:**
- soft forks explained
- soft forks bitcoin
- how bitcoin soft forks work
- bitcoin consensus

**Supporting subject tags:**
- soft-forks
- consensus
- bips

**Prerequisite guides:**
- MSC-GUIDE-030 | How Bitcoin Reaches Consensus

**Previous guide:**
MSC-GUIDE-030 | How Bitcoin Reaches Consensus

**Next guide:**
MSC-GUIDE-032 | How Bitcoin Network Upgrades Happen

**Recommended branch guide:**
MSC-GUIDE-032 | How Bitcoin Network Upgrades Happen

**Return destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Recommended learning path continuation:**
MSC-GUIDE-032 | How Bitcoin Network Upgrades Happen

**Related category hub:**
MSC-HUB-NETWORK | The Bitcoin Network

**Related glossary terms:**
- Soft fork
- Consensus
- BIP

**Potential related editorials:**
- Technical highlight tied to a current change or debate involving Soft Forks
- Developer or operator interview showing Soft Forks in practice

**Suggested card description:**
Soft Forks: core mechanics, practical relevance, and connections to the wider Bitcoin system.

**Suggested card action label:**
Read the explainer

**Suggested article length:**
2,200 to 3,200 words

**Suggested reading time range:**
12 to 18 minutes

**Required research notes:**
Use relevant BIPs and activation histories. Distinguish proposal, implementation, signaling, activation, and enforcement.

**Special accuracy concerns:**
Do not portray soft forks as automatically safe or backward compatible in every operational sense.

**Internal link opportunities:**
- Parent hub: MSC-HUB-NETWORK | The Bitcoin Network
- Primary path: MSC-PATH-NETWORK | Understand the Network
- Prerequisite guides: MSC-GUIDE-030 | How Bitcoin Reaches Consensus
- Branch guide: MSC-GUIDE-032 | How Bitcoin Network Upgrades Happen

**Future content opportunities:**
- Frequently asked questions companion for Soft Forks
- Surface-level companion explainer for readers not ready for the full technical treatment

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-network
- learn-category:bitcoin-network
- learn-subcategory:consensus
- path:understand-the-network
- path:build-on-bitcoin
- level:deep
- format:explainer
- subject:soft-forks
- subject:consensus
- subject:bips

##### MSC-GUIDE-032: How Bitcoin Network Upgrades Happen

**Registry ID:**
MSC-GUIDE-032

**Page role:**
page-role:topic-guide

**Display label:**
Network Upgrades

**Final recommended H1:**
How Bitcoin Network Upgrades Happen

**Recommended slug:**
bitcoin-network-upgrades

**Status:**
PLANNED

**Production order:**
Phase 9.04: The Bitcoin Network / Consensus

**Parent destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Parent category:**
Learn

**Primary Learn category:**
The Bitcoin Network

**Learn subcategory:**
Consensus

**Subcategory anchor:**
#consensus on planned hub slug learn-bitcoin-network

**Primary learning path:**
Understand the Network

**Secondary learning paths:**
- Build on Bitcoin

**Depth level:**
Deep

**Content format:**
History

**Target reader:**
An informed reader who wants meaningful technical, economic, or operational detail.

**Reader search intent:**
Informational: understand the timeline, context, and significance of bitcoin network upgrades.

**Primary search phrase:**
bitcoin network upgrades

**Related search phrases:**
- network upgrades explained
- network upgrades bitcoin
- how bitcoin network upgrades happen
- bitcoin consensus

**Supporting subject tags:**
- network-upgrades
- consensus
- bips
- bitcoin-core

**Prerequisite guides:**
- MSC-GUIDE-031 | How Bitcoin Soft Forks Work
- MSC-GUIDE-053 | How Bitcoin Improvement Proposals Work

**Previous guide:**
MSC-GUIDE-031 | How Bitcoin Soft Forks Work

**Next guide:**
MSC-GUIDE-033 | How the Lightning Network Works

**Recommended branch guide:**
MSC-GUIDE-053 | How Bitcoin Improvement Proposals Work

**Return destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Recommended learning path continuation:**
MSC-GUIDE-015 | What Is the Bitcoin Halving?

**Related category hub:**
MSC-HUB-NETWORK | The Bitcoin Network

**Related glossary terms:**
- Network upgrade
- Consensus
- BIP
- Bitcoin Core

**Potential related editorials:**
- Technical highlight tied to a current change or debate involving Network Upgrades
- Developer or operator interview showing Network Upgrades in practice

**Suggested card description:**
Network Upgrades: history, turning points, and lasting significance within Bitcoin.

**Suggested card action label:**
Explore the history

**Suggested article length:**
2,200 to 3,200 words

**Suggested reading time range:**
12 to 18 minutes

**Required research notes:**
Use historical activation records, BIPs, mailing-list discussions, and release notes. Avoid reducing upgrades to miner voting.

**Special accuracy concerns:**
Avoid saying miners alone approve upgrades. Explain users, nodes, developers, businesses, and activation mechanisms.

**Internal link opportunities:**
- Parent hub: MSC-HUB-NETWORK | The Bitcoin Network
- Primary path: MSC-PATH-NETWORK | Understand the Network
- Prerequisite guides: MSC-GUIDE-031 | How Bitcoin Soft Forks Work; MSC-GUIDE-053 | How Bitcoin Improvement Proposals Work
- Branch guide: MSC-GUIDE-053 | How Bitcoin Improvement Proposals Work

**Future content opportunities:**
- Frequently asked questions companion for Network Upgrades
- Surface-level companion explainer for readers not ready for the full technical treatment

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-network
- learn-category:bitcoin-network
- learn-subcategory:consensus
- path:understand-the-network
- path:build-on-bitcoin
- level:deep
- format:history
- subject:network-upgrades
- subject:consensus
- subject:bips
- subject:bitcoin-core

### Building on Bitcoin

#### Layer 2

##### MSC-GUIDE-033: How the Lightning Network Works

**Registry ID:**
MSC-GUIDE-033

**Page role:**
page-role:topic-guide

**Display label:**
Lightning Network

**Final recommended H1:**
How the Lightning Network Works

**Recommended slug:**
lightning-network

**Status:**
PLANNED

**Production order:**
Phase 10.01: Building on Bitcoin / Layer 2

**Parent destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Parent category:**
Learn

**Primary Learn category:**
Building on Bitcoin

**Learn subcategory:**
Layer 2

**Subcategory anchor:**
#layer-2 on planned hub slug learn-building-on-bitcoin

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Understand the Network

**Depth level:**
Shallow

**Content format:**
Explainer

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Informational: understand lightning network, how it works, and why it matters to Bitcoin.

**Primary search phrase:**
lightning network

**Related search phrases:**
- lightning network explained
- lightning network bitcoin
- how the lightning network works
- bitcoin payments

**Supporting subject tags:**
- lightning
- payments
- layer-2

**Prerequisite guides:**
- MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- MSC-GUIDE-014 | How Bitcoin Confirmations Work

**Previous guide:**
MSC-GUIDE-032 | How Bitcoin Network Upgrades Happen

**Next guide:**
MSC-GUIDE-034 | What Is Ark on Bitcoin?

**Recommended branch guide:**
MSC-GUIDE-042 | How Bitcoin Wallet Integrations Work

**Return destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Recommended learning path continuation:**
MSC-GUIDE-036 | Bitcoin Sidechains Explained

**Related category hub:**
MSC-HUB-BUILDING | Building on Bitcoin

**Related glossary terms:**
- Lightning Network
- Payment
- Layer 2

**Potential related editorials:**
- Project highlight examining a real implementation related to Lightning Network
- Builder interview focused on the tradeoffs behind Lightning Network

**Suggested card description:**
Lightning Network: core mechanics, practical relevance, and connections to the wider Bitcoin system.

**Suggested card action label:**
Read the explainer

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use official specifications, source repositories, reference implementations, and independent technical review. Verify current maturity at article draft time.

**Special accuracy concerns:**
Distinguish channel balances, routing, liquidity, custody, and on-chain settlement. Do not promise instant or free payments.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite guides: MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work; MSC-GUIDE-014 | How Bitcoin Confirmations Work
- Branch guide: MSC-GUIDE-042 | How Bitcoin Wallet Integrations Work

**Future content opportunities:**
- Frequently asked questions companion for Lightning Network
- Deeper technical or historical companion focused on one major tradeoff involving Lightning Network

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:building-on-bitcoin
- learn-category:building-on-bitcoin
- learn-subcategory:layer-2
- path:build-on-bitcoin
- path:understand-the-network
- level:shallow
- format:explainer
- subject:lightning
- subject:payments
- subject:layer-2

##### MSC-GUIDE-034: What Is Ark on Bitcoin?

**Registry ID:**
MSC-GUIDE-034

**Page role:**
page-role:topic-guide

**Display label:**
Ark

**Final recommended H1:**
What Is Ark on Bitcoin?

**Recommended slug:**
ark-bitcoin

**Status:**
PLANNED

**Production order:**
Phase 10.02: Building on Bitcoin / Layer 2

**Parent destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Parent category:**
Learn

**Primary Learn category:**
Building on Bitcoin

**Learn subcategory:**
Layer 2

**Subcategory anchor:**
#layer-2 on planned hub slug learn-building-on-bitcoin

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Understand the Network

**Depth level:**
Deep

**Content format:**
Technical Analysis

**Target reader:**
An informed reader who wants meaningful technical, economic, or operational detail.

**Reader search intent:**
Advanced informational: understand the design, tradeoffs, maturity, and risks of ark bitcoin.

**Primary search phrase:**
ark bitcoin

**Related search phrases:**
- ark explained
- ark bitcoin
- bitcoin layer 2

**Supporting subject tags:**
- ark
- layer-2
- payments
- utxos

**Prerequisite guides:**
- MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
- MSC-GUIDE-033 | How the Lightning Network Works

**Previous guide:**
MSC-GUIDE-033 | How the Lightning Network Works

**Next guide:**
MSC-GUIDE-035 | How RGB Works on Bitcoin

**Recommended branch guide:**
MSC-GUIDE-033 | How the Lightning Network Works

**Return destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Recommended learning path continuation:**
MSC-GUIDE-035 | How RGB Works on Bitcoin

**Related category hub:**
MSC-HUB-BUILDING | Building on Bitcoin

**Related glossary terms:**
- Ark
- Layer 2
- Payment
- UTXO

**Potential related editorials:**
- Project highlight examining a real implementation related to Ark
- Builder interview focused on the tradeoffs behind Ark

**Suggested card description:**
Ark: design, tradeoffs, maturity, risks, and open questions.

**Suggested card action label:**
Read the analysis

**Suggested article length:**
2,200 to 3,200 words

**Suggested reading time range:**
12 to 18 minutes

**Required research notes:**
Verify Ark's current specification, implementation status, operator model, exit model, liquidity assumptions, and security research at draft time.

**Special accuracy concerns:**
Do not label Ark fully trustless without explaining operator liveness, liquidity, expiry, unilateral exit, and implementation assumptions.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite guides: MSC-GUIDE-013 | What Are UTXOs in Bitcoin?; MSC-GUIDE-033 | How the Lightning Network Works
- Branch guide: MSC-GUIDE-033 | How the Lightning Network Works

**Future content opportunities:**
- Frequently asked questions companion for Ark
- Surface-level companion explainer for readers not ready for the full technical treatment

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:building-on-bitcoin
- learn-category:building-on-bitcoin
- learn-subcategory:layer-2
- path:build-on-bitcoin
- path:understand-the-network
- level:deep
- format:technical-analysis
- subject:ark
- subject:layer-2
- subject:payments
- subject:utxos

##### MSC-GUIDE-035: How RGB Works on Bitcoin

**Registry ID:**
MSC-GUIDE-035

**Page role:**
page-role:topic-guide

**Display label:**
RGB

**Final recommended H1:**
How RGB Works on Bitcoin

**Recommended slug:**
rgb-bitcoin

**Status:**
PLANNED

**Production order:**
Phase 10.03: Building on Bitcoin / Layer 2

**Parent destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Parent category:**
Learn

**Primary Learn category:**
Building on Bitcoin

**Learn subcategory:**
Layer 2

**Subcategory anchor:**
#layer-2 on planned hub slug learn-building-on-bitcoin

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Understand the Network

**Depth level:**
Deep

**Content format:**
Technical Analysis

**Target reader:**
An informed reader who wants meaningful technical, economic, or operational detail.

**Reader search intent:**
Advanced informational: understand the design, tradeoffs, maturity, and risks of rgb bitcoin.

**Primary search phrase:**
rgb bitcoin

**Related search phrases:**
- rgb explained
- rgb bitcoin
- how rgb works on bitcoin
- bitcoin client side validation

**Supporting subject tags:**
- rgb
- client-side-validation
- assets
- lightning

**Prerequisite guides:**
- MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
- MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work

**Previous guide:**
MSC-GUIDE-034 | What Is Ark on Bitcoin?

**Next guide:**
MSC-GUIDE-036 | Bitcoin Sidechains Explained

**Recommended branch guide:**
MSC-GUIDE-042 | How Bitcoin Wallet Integrations Work

**Return destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Recommended learning path continuation:**
MSC-GUIDE-037 | What Are Bitcoin Ordinals?

**Related category hub:**
MSC-HUB-BUILDING | Building on Bitcoin

**Related glossary terms:**
- RGB
- Client-side validation
- Digital asset
- Lightning Network

**Potential related editorials:**
- Project highlight examining a real implementation related to RGB
- Builder interview focused on the tradeoffs behind RGB

**Suggested card description:**
RGB: design, tradeoffs, maturity, risks, and open questions.

**Suggested card action label:**
Read the analysis

**Suggested article length:**
2,200 to 3,200 words

**Suggested reading time range:**
12 to 18 minutes

**Required research notes:**
Verify the current RGB specification, client-side validation model, wallet support, implementation maturity, and Lightning integration claims at draft time.

**Special accuracy concerns:**
Do not treat client-side validation as automatic privacy or usability. Explain data availability and state transfer requirements.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite guides: MSC-GUIDE-013 | What Are UTXOs in Bitcoin?; MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work
- Branch guide: MSC-GUIDE-042 | How Bitcoin Wallet Integrations Work

**Future content opportunities:**
- Frequently asked questions companion for RGB
- Surface-level companion explainer for readers not ready for the full technical treatment

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:building-on-bitcoin
- learn-category:building-on-bitcoin
- learn-subcategory:layer-2
- path:build-on-bitcoin
- path:understand-the-network
- level:deep
- format:technical-analysis
- subject:rgb
- subject:client-side-validation
- subject:assets
- subject:lightning

##### MSC-GUIDE-036: Bitcoin Sidechains Explained

**Registry ID:**
MSC-GUIDE-036

**Page role:**
page-role:topic-guide

**Display label:**
Sidechains

**Final recommended H1:**
Bitcoin Sidechains Explained

**Recommended slug:**
bitcoin-sidechains

**Status:**
PLANNED

**Production order:**
Phase 10.04: Building on Bitcoin / Layer 2

**Parent destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Parent category:**
Learn

**Primary Learn category:**
Building on Bitcoin

**Learn subcategory:**
Layer 2

**Subcategory anchor:**
#layer-2 on planned hub slug learn-building-on-bitcoin

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Understand the Network

**Depth level:**
Deep

**Content format:**
Comparison

**Target reader:**
An informed reader who wants meaningful technical, economic, or operational detail.

**Reader search intent:**
Comparative: understand the main models, tradeoffs, and selection criteria for bitcoin sidechains.

**Primary search phrase:**
bitcoin sidechains

**Related search phrases:**
- sidechains explained
- sidechains bitcoin
- bitcoin federation

**Supporting subject tags:**
- sidechains
- federation
- scaling
- consensus

**Prerequisite guides:**
- MSC-GUIDE-021 | What Is a Bitcoin Full Node?
- MSC-GUIDE-030 | How Bitcoin Reaches Consensus

**Previous guide:**
MSC-GUIDE-035 | How RGB Works on Bitcoin

**Next guide:**
MSC-GUIDE-037 | What Are Bitcoin Ordinals?

**Recommended branch guide:**
MSC-GUIDE-030 | How Bitcoin Reaches Consensus

**Return destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Recommended learning path continuation:**
MSC-GUIDE-034 | What Is Ark on Bitcoin?

**Related category hub:**
MSC-HUB-BUILDING | Building on Bitcoin

**Related glossary terms:**
- Sidechain
- Federation
- Scaling
- Consensus

**Potential related editorials:**
- Project highlight examining a real implementation related to Sidechains
- Builder interview focused on the tradeoffs behind Sidechains

**Suggested card description:**
Sidechains: main models, tradeoffs, use cases, and selection criteria.

**Suggested card action label:**
Compare the options

**Suggested article length:**
2,200 to 3,200 words

**Suggested reading time range:**
12 to 18 minutes

**Required research notes:**
Compare specific sidechain security models, federation designs, peg assumptions, and withdrawal mechanisms. Avoid treating all sidechains as equivalent.

**Special accuracy concerns:**
Do not use Layer 2 and sidechain as interchangeable labels without defining the security model.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite guides: MSC-GUIDE-021 | What Is a Bitcoin Full Node?; MSC-GUIDE-030 | How Bitcoin Reaches Consensus
- Branch guide: MSC-GUIDE-030 | How Bitcoin Reaches Consensus

**Future content opportunities:**
- Frequently asked questions companion for Sidechains
- Surface-level companion explainer for readers not ready for the full technical treatment

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:building-on-bitcoin
- learn-category:building-on-bitcoin
- learn-subcategory:layer-2
- path:build-on-bitcoin
- path:understand-the-network
- level:deep
- format:comparison
- subject:sidechains
- subject:federation
- subject:scaling
- subject:consensus

#### Digital Assets

##### MSC-GUIDE-037: What Are Bitcoin Ordinals?

**Registry ID:**
MSC-GUIDE-037

**Page role:**
page-role:topic-guide

**Display label:**
Ordinals

**Final recommended H1:**
What Are Bitcoin Ordinals?

**Recommended slug:**
bitcoin-ordinals

**Status:**
PLANNED

**Production order:**
Phase 11.01: Building on Bitcoin / Digital Assets

**Parent destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Parent category:**
Learn

**Primary Learn category:**
Building on Bitcoin

**Learn subcategory:**
Digital Assets

**Subcategory anchor:**
#digital-assets on planned hub slug learn-building-on-bitcoin

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Explore the Ecosystem

**Depth level:**
Shallow

**Content format:**
Explainer

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Informational: understand bitcoin ordinals, how it works, and why it matters to Bitcoin.

**Primary search phrase:**
bitcoin ordinals

**Related search phrases:**
- ordinals explained
- ordinals bitcoin
- bitcoin inscriptions

**Supporting subject tags:**
- ordinals
- inscriptions
- collecting

**Prerequisite guides:**
- MSC-GUIDE-013 | What Are UTXOs in Bitcoin?

**Previous guide:**
MSC-GUIDE-036 | Bitcoin Sidechains Explained

**Next guide:**
MSC-GUIDE-038 | How the Runes Protocol Works

**Recommended branch guide:**
MSC-GUIDE-040 | What Is a Bitcoin Inscription?

**Return destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Recommended learning path continuation:**
MSC-GUIDE-040 | What Is a Bitcoin Inscription?

**Related category hub:**
MSC-HUB-BUILDING | Building on Bitcoin

**Related glossary terms:**
- Ordinals
- Inscription
- Collecting

**Potential related editorials:**
- Project highlight examining a real implementation related to Ordinals
- Builder interview focused on the tradeoffs behind Ordinals

**Suggested card description:**
Ordinals: core mechanics, practical relevance, and connections to the wider Bitcoin system.

**Suggested card action label:**
Read the explainer

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use the ord reference implementation and handbook. Separate ordinal theory, the ord software, and surrounding market culture.

**Special accuracy concerns:**
Separate protocol mechanics from collectible value claims and cultural interpretation.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite guides: MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
- Branch guide: MSC-GUIDE-040 | What Is a Bitcoin Inscription?

**Future content opportunities:**
- Frequently asked questions companion for Ordinals
- Deeper technical or historical companion focused on one major tradeoff involving Ordinals

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:building-on-bitcoin
- learn-category:building-on-bitcoin
- learn-subcategory:digital-assets
- path:build-on-bitcoin
- path:explore-the-ecosystem
- level:shallow
- format:explainer
- subject:ordinals
- subject:inscriptions
- subject:collecting

##### MSC-GUIDE-038: How the Runes Protocol Works

**Registry ID:**
MSC-GUIDE-038

**Page role:**
page-role:topic-guide

**Display label:**
Runes

**Final recommended H1:**
How the Runes Protocol Works

**Recommended slug:**
bitcoin-runes

**Status:**
PLANNED

**Production order:**
Phase 11.02: Building on Bitcoin / Digital Assets

**Parent destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Parent category:**
Learn

**Primary Learn category:**
Building on Bitcoin

**Learn subcategory:**
Digital Assets

**Subcategory anchor:**
#digital-assets on planned hub slug learn-building-on-bitcoin

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Explore the Ecosystem

**Depth level:**
Deep

**Content format:**
Technical Analysis

**Target reader:**
An informed reader who wants meaningful technical, economic, or operational detail.

**Reader search intent:**
Advanced informational: understand the design, tradeoffs, maturity, and risks of bitcoin runes.

**Primary search phrase:**
bitcoin runes

**Related search phrases:**
- runes explained
- runes bitcoin
- how the runes protocol works
- bitcoin tokens

**Supporting subject tags:**
- runes
- tokens
- utxos
- indexers

**Prerequisite guides:**
- MSC-GUIDE-037 | What Are Bitcoin Ordinals?
- MSC-GUIDE-040 | What Is a Bitcoin Inscription?

**Previous guide:**
MSC-GUIDE-037 | What Are Bitcoin Ordinals?

**Next guide:**
MSC-GUIDE-039 | What Is BRC-20 on Bitcoin?

**Recommended branch guide:**
MSC-GUIDE-044 | How Bitcoin Indexers Work

**Return destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Recommended learning path continuation:**
MSC-GUIDE-039 | What Is BRC-20 on Bitcoin?

**Related category hub:**
MSC-HUB-BUILDING | Building on Bitcoin

**Related glossary terms:**
- Runes
- Token protocol
- UTXO
- Indexer

**Potential related editorials:**
- Project highlight examining a real implementation related to Runes
- Builder interview focused on the tradeoffs behind Runes

**Suggested card description:**
Runes: design, tradeoffs, maturity, risks, and open questions.

**Suggested card action label:**
Read the analysis

**Suggested article length:**
2,200 to 3,200 words

**Suggested reading time range:**
12 to 18 minutes

**Required research notes:**
Use the current Runes specification and reference implementation. Verify indexing behavior and ecosystem support at draft time.

**Special accuracy concerns:**
Avoid token investment framing. Explain protocol rules, indexer dependencies, and UTXO effects.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite guides: MSC-GUIDE-037 | What Are Bitcoin Ordinals?; MSC-GUIDE-040 | What Is a Bitcoin Inscription?
- Branch guide: MSC-GUIDE-044 | How Bitcoin Indexers Work

**Future content opportunities:**
- Frequently asked questions companion for Runes
- Surface-level companion explainer for readers not ready for the full technical treatment

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:building-on-bitcoin
- learn-category:building-on-bitcoin
- learn-subcategory:digital-assets
- path:build-on-bitcoin
- path:explore-the-ecosystem
- level:deep
- format:technical-analysis
- subject:runes
- subject:tokens
- subject:utxos
- subject:indexers

##### MSC-GUIDE-039: What Is BRC-20 on Bitcoin?

**Registry ID:**
MSC-GUIDE-039

**Page role:**
page-role:topic-guide

**Display label:**
BRC-20

**Final recommended H1:**
What Is BRC-20 on Bitcoin?

**Recommended slug:**
brc-20-bitcoin

**Status:**
PLANNED

**Production order:**
Phase 11.03: Building on Bitcoin / Digital Assets

**Parent destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Parent category:**
Learn

**Primary Learn category:**
Building on Bitcoin

**Learn subcategory:**
Digital Assets

**Subcategory anchor:**
#digital-assets on planned hub slug learn-building-on-bitcoin

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Explore the Ecosystem

**Depth level:**
Deep

**Content format:**
Technical Analysis

**Target reader:**
An informed reader who wants meaningful technical, economic, or operational detail.

**Reader search intent:**
Advanced informational: understand the design, tradeoffs, maturity, and risks of brc 20 bitcoin.

**Primary search phrase:**
brc 20 bitcoin

**Related search phrases:**
- brc-20 explained
- brc-20 bitcoin
- bitcoin brc 20
- bitcoin inscriptions

**Supporting subject tags:**
- brc-20
- inscriptions
- tokens
- indexers

**Prerequisite guides:**
- MSC-GUIDE-037 | What Are Bitcoin Ordinals?
- MSC-GUIDE-040 | What Is a Bitcoin Inscription?

**Previous guide:**
MSC-GUIDE-038 | How the Runes Protocol Works

**Next guide:**
MSC-GUIDE-040 | What Is a Bitcoin Inscription?

**Recommended branch guide:**
MSC-GUIDE-044 | How Bitcoin Indexers Work

**Return destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Recommended learning path continuation:**
MSC-GUIDE-046 | How Discreet Log Contracts Work

**Related category hub:**
MSC-HUB-BUILDING | Building on Bitcoin

**Related glossary terms:**
- BRC-20
- Inscription
- Token protocol
- Indexer

**Potential related editorials:**
- Project highlight examining a real implementation related to BRC-20
- Builder interview focused on the tradeoffs behind BRC-20

**Suggested card description:**
BRC-20: design, tradeoffs, maturity, risks, and open questions.

**Suggested card action label:**
Read the analysis

**Suggested article length:**
2,200 to 3,200 words

**Suggested reading time range:**
12 to 18 minutes

**Required research notes:**
Use the original BRC-20 experiment documentation plus current indexer rules. Explain that off-chain indexers determine balances under shared conventions.

**Special accuracy concerns:**
State clearly that BRC-20 is an experimental convention, not a Bitcoin consensus standard.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite guides: MSC-GUIDE-037 | What Are Bitcoin Ordinals?; MSC-GUIDE-040 | What Is a Bitcoin Inscription?
- Branch guide: MSC-GUIDE-044 | How Bitcoin Indexers Work

**Future content opportunities:**
- Frequently asked questions companion for BRC-20
- Surface-level companion explainer for readers not ready for the full technical treatment

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:building-on-bitcoin
- learn-category:building-on-bitcoin
- learn-subcategory:digital-assets
- path:build-on-bitcoin
- path:explore-the-ecosystem
- level:deep
- format:technical-analysis
- subject:brc-20
- subject:inscriptions
- subject:tokens
- subject:indexers

##### MSC-GUIDE-040: What Is a Bitcoin Inscription?

**Registry ID:**
MSC-GUIDE-040

**Page role:**
page-role:topic-guide

**Display label:**
Inscriptions

**Final recommended H1:**
What Is a Bitcoin Inscription?

**Recommended slug:**
bitcoin-inscriptions

**Status:**
PLANNED

**Production order:**
Phase 11.04: Building on Bitcoin / Digital Assets

**Parent destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Parent category:**
Learn

**Primary Learn category:**
Building on Bitcoin

**Learn subcategory:**
Digital Assets

**Subcategory anchor:**
#digital-assets on planned hub slug learn-building-on-bitcoin

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Explore the Ecosystem

**Depth level:**
Shallow

**Content format:**
Explainer

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Informational: understand bitcoin inscriptions, how it works, and why it matters to Bitcoin.

**Primary search phrase:**
bitcoin inscriptions

**Related search phrases:**
- inscriptions explained
- inscriptions bitcoin
- bitcoin ordinals

**Supporting subject tags:**
- inscriptions
- ordinals
- witness

**Prerequisite guides:**
- MSC-GUIDE-037 | What Are Bitcoin Ordinals?

**Previous guide:**
MSC-GUIDE-039 | What Is BRC-20 on Bitcoin?

**Next guide:**
MSC-GUIDE-041 | Bitcoin Developer Tools: A Practical Overview

**Recommended branch guide:**
MSC-GUIDE-037 | What Are Bitcoin Ordinals?

**Return destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Recommended learning path continuation:**
MSC-GUIDE-038 | How the Runes Protocol Works

**Related category hub:**
MSC-HUB-BUILDING | Building on Bitcoin

**Related glossary terms:**
- Inscription
- Ordinals
- Witness

**Potential related editorials:**
- Project highlight examining a real implementation related to Inscriptions
- Builder interview focused on the tradeoffs behind Inscriptions

**Suggested card description:**
Inscriptions: core mechanics, practical relevance, and connections to the wider Bitcoin system.

**Suggested card action label:**
Read the explainer

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use the ord handbook and reference implementation. Distinguish inscriptions from generic NFT language and from Ordinals as a numbering theory.

**Special accuracy concerns:**
Do not claim inscription ownership works exactly like conventional NFTs. Explain sat tracking and wallet/indexer assumptions.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite guides: MSC-GUIDE-037 | What Are Bitcoin Ordinals?
- Branch guide: MSC-GUIDE-037 | What Are Bitcoin Ordinals?

**Future content opportunities:**
- Frequently asked questions companion for Inscriptions
- Deeper technical or historical companion focused on one major tradeoff involving Inscriptions

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:building-on-bitcoin
- learn-category:building-on-bitcoin
- learn-subcategory:digital-assets
- path:build-on-bitcoin
- path:explore-the-ecosystem
- level:shallow
- format:explainer
- subject:inscriptions
- subject:ordinals
- subject:witness

#### Development

##### MSC-GUIDE-041: Bitcoin Developer Tools: A Practical Overview

**Registry ID:**
MSC-GUIDE-041

**Page role:**
page-role:topic-guide

**Display label:**
Developer Tools

**Final recommended H1:**
Bitcoin Developer Tools: A Practical Overview

**Recommended slug:**
bitcoin-developer-tools

**Status:**
PLANNED

**Production order:**
Phase 12.01: Building on Bitcoin / Development

**Parent destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Parent category:**
Learn

**Primary Learn category:**
Building on Bitcoin

**Learn subcategory:**
Development

**Subcategory anchor:**
#development on planned hub slug learn-building-on-bitcoin

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Explore the Ecosystem

**Depth level:**
Shallow

**Content format:**
Reference

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Reference: find a structured overview of the tools, concepts, and interfaces behind bitcoin developer tools.

**Primary search phrase:**
bitcoin developer tools

**Related search phrases:**
- developer tools explained
- developer tools bitcoin
- bitcoin development

**Supporting subject tags:**
- development
- tools
- open-source

**Prerequisite guides:**
- MSC-GUIDE-001 | What Is Bitcoin?

**Previous guide:**
MSC-GUIDE-040 | What Is a Bitcoin Inscription?

**Next guide:**
MSC-GUIDE-042 | How Bitcoin Wallet Integrations Work

**Recommended branch guide:**
MSC-GUIDE-062 | How to Set Up a Bitcoin Development Environment

**Return destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Recommended learning path continuation:**
MSC-GUIDE-062 | How to Set Up a Bitcoin Development Environment

**Related category hub:**
MSC-HUB-BUILDING | Building on Bitcoin

**Related glossary terms:**
- Developer tool
- Open-Source development
- Open-Source

**Potential related editorials:**
- Project highlight examining a real implementation related to Developer Tools
- Builder interview focused on the tradeoffs behind Developer Tools

**Suggested card description:**
Developer Tools: a structured reference for the tools, concepts, and interfaces involved.

**Suggested card action label:**
Open the reference

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use official specifications, source repositories, reference implementations, and independent technical review. Verify current maturity at article draft time.

**Special accuracy concerns:**
Keep tool listings curated by function and maintenance status, not sponsorship or popularity.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite guides: MSC-GUIDE-001 | What Is Bitcoin?
- Branch guide: MSC-GUIDE-062 | How to Set Up a Bitcoin Development Environment
- Future Tools connection: a practical tool page related to bitcoin developer tools, activated only after that destination exists

**Future content opportunities:**
- Frequently asked questions companion for Developer Tools
- Deeper technical or historical companion focused on one major tradeoff involving Developer Tools

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:building-on-bitcoin
- learn-category:building-on-bitcoin
- learn-subcategory:development
- path:build-on-bitcoin
- path:explore-the-ecosystem
- level:shallow
- format:reference
- subject:development
- subject:tools
- subject:open-source

##### MSC-GUIDE-042: How Bitcoin Wallet Integrations Work

**Registry ID:**
MSC-GUIDE-042

**Page role:**
page-role:topic-guide

**Display label:**
Wallet Integrations

**Final recommended H1:**
How Bitcoin Wallet Integrations Work

**Recommended slug:**
bitcoin-wallet-integrations

**Status:**
PLANNED

**Production order:**
Phase 12.02: Building on Bitcoin / Development

**Parent destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Parent category:**
Learn

**Primary Learn category:**
Building on Bitcoin

**Learn subcategory:**
Development

**Subcategory anchor:**
#development on planned hub slug learn-building-on-bitcoin

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Use Bitcoin Safely

**Depth level:**
Deep

**Content format:**
Guide

**Target reader:**
An informed reader who wants meaningful technical, economic, or operational detail.

**Reader search intent:**
Practical informational: understand bitcoin wallet integrations and apply sound decisions without relying on promotional claims.

**Primary search phrase:**
bitcoin wallet integrations

**Related search phrases:**
- wallet integrations explained
- wallet integrations bitcoin
- how bitcoin wallet integrations work
- bitcoin wallets

**Supporting subject tags:**
- wallets
- apis
- development
- security

**Prerequisite guides:**
- MSC-GUIDE-005 | What Is a Bitcoin Wallet?
- MSC-GUIDE-043 | Bitcoin APIs Explained

**Previous guide:**
MSC-GUIDE-041 | Bitcoin Developer Tools: A Practical Overview

**Next guide:**
MSC-GUIDE-043 | Bitcoin APIs Explained

**Recommended branch guide:**
MSC-GUIDE-043 | Bitcoin APIs Explained

**Return destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Recommended learning path continuation:**
MSC-GUIDE-044 | How Bitcoin Indexers Work

**Related category hub:**
MSC-HUB-BUILDING | Building on Bitcoin

**Related glossary terms:**
- Wallet integration
- Wallet
- API
- Open-Source development
- Threat model

**Potential related editorials:**
- Project highlight examining a real implementation related to Wallet Integrations
- Builder interview focused on the tradeoffs behind Wallet Integrations

**Suggested card description:**
Wallet Integrations: practical guidance, sound decision criteria, and clearly stated limits.

**Suggested card action label:**
Read the guide

**Suggested article length:**
2,200 to 3,200 words

**Suggested reading time range:**
12 to 18 minutes

**Required research notes:**
Use current wallet SDKs and protocol documentation. Include key-management, address, fee, privacy, and signing boundaries.

**Special accuracy concerns:**
Do not normalize exporting private keys or seed phrases to third-party services.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite guides: MSC-GUIDE-005 | What Is a Bitcoin Wallet?; MSC-GUIDE-043 | Bitcoin APIs Explained
- Branch guide: MSC-GUIDE-043 | Bitcoin APIs Explained

**Future content opportunities:**
- Frequently asked questions companion for Wallet Integrations
- Surface-level companion explainer for readers not ready for the full technical treatment

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:building-on-bitcoin
- learn-category:building-on-bitcoin
- learn-subcategory:development
- path:build-on-bitcoin
- path:use-bitcoin-safely
- level:deep
- format:guide
- subject:wallets
- subject:apis
- subject:development
- subject:security

##### MSC-GUIDE-043: Bitcoin APIs Explained

**Registry ID:**
MSC-GUIDE-043

**Page role:**
page-role:topic-guide

**Display label:**
APIs

**Final recommended H1:**
Bitcoin APIs Explained

**Recommended slug:**
bitcoin-apis

**Status:**
PLANNED

**Production order:**
Phase 12.03: Building on Bitcoin / Development

**Parent destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Parent category:**
Learn

**Primary Learn category:**
Building on Bitcoin

**Learn subcategory:**
Development

**Subcategory anchor:**
#development on planned hub slug learn-building-on-bitcoin

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Explore the Ecosystem

**Depth level:**
Shallow

**Content format:**
Reference

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Reference: find a structured overview of the tools, concepts, and interfaces behind bitcoin apis.

**Primary search phrase:**
bitcoin apis

**Related search phrases:**
- apis explained
- apis bitcoin
- bitcoin development

**Supporting subject tags:**
- apis
- development
- infrastructure

**Prerequisite guides:**
- MSC-GUIDE-041 | Bitcoin Developer Tools: A Practical Overview

**Previous guide:**
MSC-GUIDE-042 | How Bitcoin Wallet Integrations Work

**Next guide:**
MSC-GUIDE-044 | How Bitcoin Indexers Work

**Recommended branch guide:**
MSC-GUIDE-061 | How Bitcoin RPC Works

**Return destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Recommended learning path continuation:**
MSC-GUIDE-042 | How Bitcoin Wallet Integrations Work

**Related category hub:**
MSC-HUB-BUILDING | Building on Bitcoin

**Related glossary terms:**
- API
- Open-Source development
- Infrastructure

**Potential related editorials:**
- Project highlight examining a real implementation related to APIs
- Builder interview focused on the tradeoffs behind APIs

**Suggested card description:**
APIs: a structured reference for the tools, concepts, and interfaces involved.

**Suggested card action label:**
Open the reference

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use official specifications, source repositories, reference implementations, and independent technical review. Verify current maturity at article draft time.

**Special accuracy concerns:**
Distinguish local node APIs, hosted APIs, wallet APIs, and indexing APIs.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite guides: MSC-GUIDE-041 | Bitcoin Developer Tools: A Practical Overview
- Branch guide: MSC-GUIDE-061 | How Bitcoin RPC Works
- Future Tools connection: a practical tool page related to bitcoin apis, activated only after that destination exists

**Future content opportunities:**
- Frequently asked questions companion for APIs
- Deeper technical or historical companion focused on one major tradeoff involving APIs

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:building-on-bitcoin
- learn-category:building-on-bitcoin
- learn-subcategory:development
- path:build-on-bitcoin
- path:explore-the-ecosystem
- level:shallow
- format:reference
- subject:apis
- subject:development
- subject:infrastructure

##### MSC-GUIDE-044: How Bitcoin Indexers Work

**Registry ID:**
MSC-GUIDE-044

**Page role:**
page-role:topic-guide

**Display label:**
Indexers

**Final recommended H1:**
How Bitcoin Indexers Work

**Recommended slug:**
bitcoin-indexers

**Status:**
PLANNED

**Production order:**
Phase 12.04: Building on Bitcoin / Development

**Parent destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Parent category:**
Learn

**Primary Learn category:**
Building on Bitcoin

**Learn subcategory:**
Development

**Subcategory anchor:**
#development on planned hub slug learn-building-on-bitcoin

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Understand the Network

**Depth level:**
Deep

**Content format:**
Technical Analysis

**Target reader:**
An informed reader who wants meaningful technical, economic, or operational detail.

**Reader search intent:**
Advanced informational: understand the design, tradeoffs, maturity, and risks of bitcoin indexers.

**Primary search phrase:**
bitcoin indexers

**Related search phrases:**
- indexers explained
- indexers bitcoin
- how bitcoin indexers work
- bitcoin data

**Supporting subject tags:**
- indexers
- data
- ordinals
- runes

**Prerequisite guides:**
- MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
- MSC-GUIDE-043 | Bitcoin APIs Explained

**Previous guide:**
MSC-GUIDE-043 | Bitcoin APIs Explained

**Next guide:**
MSC-GUIDE-045 | What Is BitVM?

**Recommended branch guide:**
MSC-GUIDE-038 | How the Runes Protocol Works

**Return destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Recommended learning path continuation:**
MSC-GUIDE-051 | How to Read the Bitcoin Source Code

**Related category hub:**
MSC-HUB-BUILDING | Building on Bitcoin

**Related glossary terms:**
- Indexer
- Indexed data
- Ordinals
- Runes

**Potential related editorials:**
- Project highlight examining a real implementation related to Indexers
- Builder interview focused on the tradeoffs behind Indexers

**Suggested card description:**
Indexers: design, tradeoffs, maturity, risks, and open questions.

**Suggested card action label:**
Read the analysis

**Suggested article length:**
2,200 to 3,200 words

**Suggested reading time range:**
12 to 18 minutes

**Required research notes:**
Compare indexer architectures and reorganization handling. Explain which data is consensus-derived and which is protocol interpretation.

**Special accuracy concerns:**
Explain reorg handling, canonicalization, and disagreement risk between indexers.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite guides: MSC-GUIDE-013 | What Are UTXOs in Bitcoin?; MSC-GUIDE-043 | Bitcoin APIs Explained
- Branch guide: MSC-GUIDE-038 | How the Runes Protocol Works

**Future content opportunities:**
- Frequently asked questions companion for Indexers
- Surface-level companion explainer for readers not ready for the full technical treatment

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:building-on-bitcoin
- learn-category:building-on-bitcoin
- learn-subcategory:development
- path:build-on-bitcoin
- path:understand-the-network
- level:deep
- format:technical-analysis
- subject:indexers
- subject:data
- subject:ordinals
- subject:runes

#### Innovation

##### MSC-GUIDE-045: What Is BitVM?

**Registry ID:**
MSC-GUIDE-045

**Page role:**
page-role:topic-guide

**Display label:**
BitVM

**Final recommended H1:**
What Is BitVM?

**Recommended slug:**
bitvm-bitcoin

**Status:**
PLANNED

**Production order:**
Phase 13.01: Building on Bitcoin / Innovation

**Parent destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Parent category:**
Learn

**Primary Learn category:**
Building on Bitcoin

**Learn subcategory:**
Innovation

**Subcategory anchor:**
#innovation on planned hub slug learn-building-on-bitcoin

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Understand the Network

**Depth level:**
Trench

**Content format:**
Technical Analysis

**Target reader:**
An advanced technical reader prepared for protocol, cryptography, or infrastructure detail.

**Reader search intent:**
Advanced informational: understand the design, tradeoffs, maturity, and risks of bitvm bitcoin.

**Primary search phrase:**
bitvm bitcoin

**Related search phrases:**
- bitvm explained
- bitvm bitcoin
- bitcoin verification

**Supporting subject tags:**
- bitvm
- verification
- bridges
- script

**Prerequisite guides:**
- MSC-GUIDE-054 | How Bitcoin Script Works
- MSC-GUIDE-055 | How Taproot Changed Bitcoin
- MSC-GUIDE-057 | How Schnorr Signatures Work in Bitcoin

**Previous guide:**
MSC-GUIDE-044 | How Bitcoin Indexers Work

**Next guide:**
MSC-GUIDE-046 | How Discreet Log Contracts Work

**Recommended branch guide:**
MSC-GUIDE-047 | What Is OP_CAT?

**Return destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Recommended learning path continuation:**
MSC-GUIDE-047 | What Is OP_CAT?

**Related category hub:**
MSC-HUB-BUILDING | Building on Bitcoin

**Related glossary terms:**
- BitVM
- Verification game
- Bridge
- Bitcoin Script

**Potential related editorials:**
- Project highlight examining a real implementation related to BitVM
- Builder interview focused on the tradeoffs behind BitVM

**Suggested card description:**
BitVM: design, tradeoffs, maturity, risks, and open questions.

**Suggested card action label:**
Read the analysis

**Suggested article length:**
2,800 to 3,800 words

**Suggested reading time range:**
16 to 22 minutes

**Required research notes:**
Use the current BitVM papers, repositories, bridge specifications, and security analysis. Verify assumptions, participant models, and implementation maturity.

**Special accuracy concerns:**
Do not imply arbitrary computation executes directly on-chain. Explain verification games and trust assumptions precisely.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite guides: MSC-GUIDE-054 | How Bitcoin Script Works; MSC-GUIDE-055 | How Taproot Changed Bitcoin; MSC-GUIDE-057 | How Schnorr Signatures Work in Bitcoin
- Branch guide: MSC-GUIDE-047 | What Is OP_CAT?

**Future content opportunities:**
- Frequently asked questions companion for BitVM
- Surface-level companion explainer for readers not ready for the full technical treatment

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:building-on-bitcoin
- learn-category:building-on-bitcoin
- learn-subcategory:innovation
- path:build-on-bitcoin
- path:understand-the-network
- level:trench
- format:technical-analysis
- subject:bitvm
- subject:verification
- subject:bridges
- subject:script

##### MSC-GUIDE-046: How Discreet Log Contracts Work

**Registry ID:**
MSC-GUIDE-046

**Page role:**
page-role:topic-guide

**Display label:**
DLCs

**Final recommended H1:**
How Discreet Log Contracts Work

**Recommended slug:**
bitcoin-discreet-log-contracts

**Status:**
PLANNED

**Production order:**
Phase 13.02: Building on Bitcoin / Innovation

**Parent destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Parent category:**
Learn

**Primary Learn category:**
Building on Bitcoin

**Learn subcategory:**
Innovation

**Subcategory anchor:**
#innovation on planned hub slug learn-building-on-bitcoin

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Understand the Network

**Depth level:**
Deep

**Content format:**
Technical Analysis

**Target reader:**
An informed reader who wants meaningful technical, economic, or operational detail.

**Reader search intent:**
Advanced informational: understand the design, tradeoffs, maturity, and risks of bitcoin discreet log contracts.

**Primary search phrase:**
bitcoin discreet log contracts

**Related search phrases:**
- dlcs explained
- dlcs bitcoin
- how discreet log contracts work
- bitcoin oracles

**Supporting subject tags:**
- dlcs
- oracles
- contracts
- signatures

**Prerequisite guides:**
- MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work
- MSC-GUIDE-058 | How Digital Signatures Work in Bitcoin

**Previous guide:**
MSC-GUIDE-045 | What Is BitVM?

**Next guide:**
MSC-GUIDE-047 | What Is OP_CAT?

**Recommended branch guide:**
MSC-GUIDE-058 | How Digital Signatures Work in Bitcoin

**Return destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Recommended learning path continuation:**
MSC-GUIDE-045 | What Is BitVM?

**Related category hub:**
MSC-HUB-BUILDING | Building on Bitcoin

**Related glossary terms:**
- DLC
- Oracle
- Bitcoin contract
- Digital signature

**Potential related editorials:**
- Project highlight examining a real implementation related to DLCs
- Builder interview focused on the tradeoffs behind DLCs

**Suggested card description:**
DLCs: design, tradeoffs, maturity, risks, and open questions.

**Suggested card action label:**
Read the analysis

**Suggested article length:**
2,200 to 3,200 words

**Suggested reading time range:**
12 to 18 minutes

**Required research notes:**
Use the DLC specification, original paper, current implementations, and oracle design references. Verify the current specification status.

**Special accuracy concerns:**
Explain oracle dependence, counterparty coordination, contract execution transactions, and privacy limits.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite guides: MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work; MSC-GUIDE-058 | How Digital Signatures Work in Bitcoin
- Branch guide: MSC-GUIDE-058 | How Digital Signatures Work in Bitcoin

**Future content opportunities:**
- Frequently asked questions companion for DLCs
- Surface-level companion explainer for readers not ready for the full technical treatment

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:building-on-bitcoin
- learn-category:building-on-bitcoin
- learn-subcategory:innovation
- path:build-on-bitcoin
- path:understand-the-network
- level:deep
- format:technical-analysis
- subject:dlcs
- subject:oracles
- subject:contracts
- subject:signatures

##### MSC-GUIDE-047: What Is OP_CAT?

**Registry ID:**
MSC-GUIDE-047

**Page role:**
page-role:topic-guide

**Display label:**
OP_CAT

**Final recommended H1:**
What Is OP_CAT?

**Recommended slug:**
bitcoin-op-cat

**Status:**
PLANNED

**Production order:**
Phase 13.03: Building on Bitcoin / Innovation

**Parent destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Parent category:**
Learn

**Primary Learn category:**
Building on Bitcoin

**Learn subcategory:**
Innovation

**Subcategory anchor:**
#innovation on planned hub slug learn-building-on-bitcoin

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Understand the Network

**Depth level:**
Trench

**Content format:**
Technical Analysis

**Target reader:**
An advanced technical reader prepared for protocol, cryptography, or infrastructure detail.

**Reader search intent:**
Advanced informational: understand the design, tradeoffs, maturity, and risks of bitcoin op cat.

**Primary search phrase:**
bitcoin op cat

**Related search phrases:**
- op_cat explained
- op_cat bitcoin
- bitcoin op cat
- bitcoin script

**Supporting subject tags:**
- op-cat
- script
- soft-forks
- covenants

**Prerequisite guides:**
- MSC-GUIDE-054 | How Bitcoin Script Works
- MSC-GUIDE-055 | How Taproot Changed Bitcoin

**Previous guide:**
MSC-GUIDE-046 | How Discreet Log Contracts Work

**Next guide:**
MSC-GUIDE-048 | Emerging Protocols on Bitcoin: How to Evaluate Them

**Recommended branch guide:**
MSC-GUIDE-054 | How Bitcoin Script Works

**Return destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Recommended learning path continuation:**
MSC-GUIDE-048 | Emerging Protocols on Bitcoin: How to Evaluate Them

**Related category hub:**
MSC-HUB-BUILDING | Building on Bitcoin

**Related glossary terms:**
- OP_CAT
- Bitcoin Script
- Soft fork
- Covenant

**Potential related editorials:**
- Project highlight examining a real implementation related to OP_CAT
- Builder interview focused on the tradeoffs behind OP_CAT

**Suggested card description:**
OP_CAT: design, tradeoffs, maturity, risks, and open questions.

**Suggested card action label:**
Read the analysis

**Suggested article length:**
2,800 to 3,800 words

**Suggested reading time range:**
16 to 22 minutes

**Required research notes:**
Use BIP 347 and current technical discussion. State proposal status accurately and separate possible use cases from deployed capability.

**Special accuracy concerns:**
Do not describe OP_CAT as active Bitcoin functionality. Verify BIP and deployment status at publication.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite guides: MSC-GUIDE-054 | How Bitcoin Script Works; MSC-GUIDE-055 | How Taproot Changed Bitcoin
- Branch guide: MSC-GUIDE-054 | How Bitcoin Script Works

**Future content opportunities:**
- Frequently asked questions companion for OP_CAT
- Surface-level companion explainer for readers not ready for the full technical treatment

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:building-on-bitcoin
- learn-category:building-on-bitcoin
- learn-subcategory:innovation
- path:build-on-bitcoin
- path:understand-the-network
- level:trench
- format:technical-analysis
- subject:op-cat
- subject:script
- subject:soft-forks
- subject:covenants

##### MSC-GUIDE-048: Emerging Protocols on Bitcoin: How to Evaluate Them

**Registry ID:**
MSC-GUIDE-048

**Page role:**
page-role:topic-guide

**Display label:**
Emerging Protocols

**Final recommended H1:**
Emerging Protocols on Bitcoin: How to Evaluate Them

**Recommended slug:**
emerging-bitcoin-protocols

**Status:**
PLANNED

**Production order:**
Phase 13.04: Building on Bitcoin / Innovation

**Parent destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Parent category:**
Learn

**Primary Learn category:**
Building on Bitcoin

**Learn subcategory:**
Innovation

**Subcategory anchor:**
#innovation on planned hub slug learn-building-on-bitcoin

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Explore the Ecosystem
- Understand the Network

**Depth level:**
Deep

**Content format:**
Comparison

**Target reader:**
An informed reader who wants meaningful technical, economic, or operational detail.

**Reader search intent:**
Comparative: understand the main models, tradeoffs, and selection criteria for emerging bitcoin protocols.

**Primary search phrase:**
emerging bitcoin protocols

**Related search phrases:**
- emerging protocols explained
- emerging protocols bitcoin
- bitcoin experimentation

**Supporting subject tags:**
- protocol
- experimentation
- scaling
- security

**Prerequisite guides:**
- MSC-GUIDE-031 | How Bitcoin Soft Forks Work
- MSC-GUIDE-053 | How Bitcoin Improvement Proposals Work

**Previous guide:**
MSC-GUIDE-047 | What Is OP_CAT?

**Next guide:**
MSC-GUIDE-049 | What Is Bitcoin Core?

**Recommended branch guide:**
MSC-GUIDE-053 | How Bitcoin Improvement Proposals Work

**Return destination:**
MSC-HUB-BUILDING | Building on Bitcoin

**Recommended learning path continuation:**
MSC-GUIDE-050 | What Is Bitcoin Knots?

**Related category hub:**
MSC-HUB-BUILDING | Building on Bitcoin

**Related glossary terms:**
- Emerging protocol
- Protocol
- Protocol experiment
- Scaling
- Threat model

**Potential related editorials:**
- Project highlight examining a real implementation related to Emerging Protocols
- Builder interview focused on the tradeoffs behind Emerging Protocols

**Suggested card description:**
Emerging Protocols: main models, tradeoffs, use cases, and selection criteria.

**Suggested card action label:**
Compare the options

**Suggested article length:**
2,200 to 3,200 words

**Suggested reading time range:**
12 to 18 minutes

**Required research notes:**
Use current proposals, repositories, technical reviews, and implementation evidence. Apply the same evaluation framework to supporters and critics.

**Special accuracy concerns:**
Do not group proposals only by marketing label. Compare security model, required consensus changes, maturity, and user cost.

**Internal link opportunities:**
- Parent hub: MSC-HUB-BUILDING | Building on Bitcoin
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite guides: MSC-GUIDE-031 | How Bitcoin Soft Forks Work; MSC-GUIDE-053 | How Bitcoin Improvement Proposals Work
- Branch guide: MSC-GUIDE-053 | How Bitcoin Improvement Proposals Work

**Future content opportunities:**
- Frequently asked questions companion for Emerging Protocols
- Surface-level companion explainer for readers not ready for the full technical treatment

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:building-on-bitcoin
- learn-category:building-on-bitcoin
- learn-subcategory:innovation
- path:build-on-bitcoin
- path:explore-the-ecosystem
- path:understand-the-network
- level:deep
- format:comparison
- subject:protocol
- subject:experimentation
- subject:scaling
- subject:security

### Bitcoin Development

#### Bitcoin Core

##### MSC-GUIDE-049: What Is Bitcoin Core?

**Registry ID:**
MSC-GUIDE-049

**Page role:**
page-role:topic-guide

**Display label:**
Bitcoin Core

**Final recommended H1:**
What Is Bitcoin Core?

**Recommended slug:**
bitcoin-core

**Status:**
PLANNED

**Production order:**
Phase 14.01: Bitcoin Development / Bitcoin Core

**Parent destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Development

**Learn subcategory:**
Bitcoin Core

**Subcategory anchor:**
#bitcoin-core on planned hub slug learn-bitcoin-development

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Understand the Network

**Depth level:**
Shallow

**Content format:**
Explainer

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Informational: understand bitcoin core, how it works, and why it matters to Bitcoin.

**Primary search phrase:**
bitcoin core

**Related search phrases:**
- bitcoin core explained
- bitcoin nodes

**Supporting subject tags:**
- bitcoin-core
- nodes
- development

**Prerequisite guides:**
- MSC-GUIDE-021 | What Is a Bitcoin Full Node?
- MSC-GUIDE-023 | How to Run a Bitcoin Node

**Previous guide:**
MSC-GUIDE-048 | Emerging Protocols on Bitcoin: How to Evaluate Them

**Next guide:**
MSC-GUIDE-050 | What Is Bitcoin Knots?

**Recommended branch guide:**
MSC-GUIDE-052 | How Bitcoin Core Releases Work

**Return destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Recommended learning path continuation:**
MSC-GUIDE-041 | Bitcoin Developer Tools: A Practical Overview

**Related category hub:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Related glossary terms:**
- Bitcoin Core
- Node
- Open-Source development

**Potential related editorials:**
- Developer interview or release highlight connected to Bitcoin Core
- Technical debate recap that uses this guide as foundational context

**Suggested card description:**
Bitcoin Core: core mechanics, practical relevance, and connections to the wider Bitcoin system.

**Suggested card action label:**
Read the explainer

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use the current Bitcoin Core documentation, source repository, contributor process, and release information.

**Special accuracy concerns:**
Do not equate Bitcoin Core with the Bitcoin network or with a formal governing body.

**Internal link opportunities:**
- Parent hub: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite guides: MSC-GUIDE-021 | What Is a Bitcoin Full Node?; MSC-GUIDE-023 | How to Run a Bitcoin Node
- Branch guide: MSC-GUIDE-052 | How Bitcoin Core Releases Work

**Future content opportunities:**
- Frequently asked questions companion for Bitcoin Core
- Deeper technical or historical companion focused on one major tradeoff involving Bitcoin Core

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-development
- learn-category:bitcoin-development
- learn-subcategory:bitcoin-core
- path:build-on-bitcoin
- path:understand-the-network
- level:shallow
- format:explainer
- subject:bitcoin-core
- subject:nodes
- subject:development

##### MSC-GUIDE-050: What Is Bitcoin Knots?

**Registry ID:**
MSC-GUIDE-050

**Page role:**
page-role:topic-guide

**Display label:**
Bitcoin Knots

**Final recommended H1:**
What Is Bitcoin Knots?

**Recommended slug:**
bitcoin-knots

**Status:**
PLANNED

**Production order:**
Phase 14.02: Bitcoin Development / Bitcoin Core

**Parent destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Development

**Learn subcategory:**
Bitcoin Core

**Subcategory anchor:**
#bitcoin-core on planned hub slug learn-bitcoin-development

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Understand the Network

**Depth level:**
Shallow

**Content format:**
Comparison

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Comparative: understand the main models, tradeoffs, and selection criteria for bitcoin knots.

**Primary search phrase:**
bitcoin knots

**Related search phrases:**
- bitcoin knots explained
- bitcoin bitcoin core

**Supporting subject tags:**
- bitcoin-knots
- bitcoin-core
- nodes
- policy

**Prerequisite guides:**
- MSC-GUIDE-049 | What Is Bitcoin Core?

**Previous guide:**
MSC-GUIDE-049 | What Is Bitcoin Core?

**Next guide:**
MSC-GUIDE-051 | How to Read the Bitcoin Source Code

**Recommended branch guide:**
MSC-GUIDE-049 | What Is Bitcoin Core?

**Return destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Recommended learning path continuation:**
MSC-GUIDE-064 | How to Run Reliable Bitcoin Infrastructure

**Related category hub:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Related glossary terms:**
- Bitcoin Knots
- Bitcoin Core
- Node
- Policy

**Potential related editorials:**
- Developer interview or release highlight connected to Bitcoin Knots
- Technical debate recap that uses this guide as foundational context

**Suggested card description:**
Bitcoin Knots: main models, tradeoffs, use cases, and selection criteria.

**Suggested card action label:**
Compare the options

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use current Bitcoin Knots and Bitcoin Core documentation and releases. Distinguish consensus compatibility from policy and feature differences.

**Special accuracy concerns:**
Avoid presenting policy differences as different consensus systems unless evidence supports that claim.

**Internal link opportunities:**
- Parent hub: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite guides: MSC-GUIDE-049 | What Is Bitcoin Core?
- Branch guide: MSC-GUIDE-049 | What Is Bitcoin Core?

**Future content opportunities:**
- Frequently asked questions companion for Bitcoin Knots
- Deeper technical or historical companion focused on one major tradeoff involving Bitcoin Knots

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-development
- learn-category:bitcoin-development
- learn-subcategory:bitcoin-core
- path:build-on-bitcoin
- path:understand-the-network
- level:shallow
- format:comparison
- subject:bitcoin-knots
- subject:bitcoin-core
- subject:nodes
- subject:policy

##### MSC-GUIDE-051: How to Read the Bitcoin Source Code

**Registry ID:**
MSC-GUIDE-051

**Page role:**
page-role:topic-guide

**Display label:**
Source Code

**Final recommended H1:**
How to Read the Bitcoin Source Code

**Recommended slug:**
bitcoin-source-code

**Status:**
PLANNED

**Production order:**
Phase 14.03: Bitcoin Development / Bitcoin Core

**Parent destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Development

**Learn subcategory:**
Bitcoin Core

**Subcategory anchor:**
#bitcoin-core on planned hub slug learn-bitcoin-development

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Understand the Network

**Depth level:**
Deep

**Content format:**
Guide

**Target reader:**
An informed reader who wants meaningful technical, economic, or operational detail.

**Reader search intent:**
Practical informational: understand bitcoin source code and apply sound decisions without relying on promotional claims.

**Primary search phrase:**
bitcoin source code

**Related search phrases:**
- source code explained
- source code bitcoin
- how to read the bitcoin source code
- bitcoin bitcoin core

**Supporting subject tags:**
- source-code
- bitcoin-core
- development

**Prerequisite guides:**
- MSC-GUIDE-049 | What Is Bitcoin Core?
- MSC-GUIDE-062 | How to Set Up a Bitcoin Development Environment

**Previous guide:**
MSC-GUIDE-050 | What Is Bitcoin Knots?

**Next guide:**
MSC-GUIDE-052 | How Bitcoin Core Releases Work

**Recommended branch guide:**
MSC-GUIDE-063 | How Bitcoin Software Is Tested

**Return destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Recommended learning path continuation:**
MSC-GUIDE-063 | How Bitcoin Software Is Tested

**Related category hub:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Related glossary terms:**
- Source code
- Bitcoin Core
- Open-Source development

**Potential related editorials:**
- Developer interview or release highlight connected to Source Code
- Technical debate recap that uses this guide as foundational context

**Suggested card description:**
Source Code: practical guidance, sound decision criteria, and clearly stated limits.

**Suggested card action label:**
Read the guide

**Suggested article length:**
2,200 to 3,200 words

**Suggested reading time range:**
12 to 18 minutes

**Required research notes:**
Use the current repository layout and developer documentation. Keep file paths and build references version-aware.

**Special accuracy concerns:**
Do not turn a repository tour into implied code-review competence. Explain the limits of beginner inspection.

**Internal link opportunities:**
- Parent hub: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite guides: MSC-GUIDE-049 | What Is Bitcoin Core?; MSC-GUIDE-062 | How to Set Up a Bitcoin Development Environment
- Branch guide: MSC-GUIDE-063 | How Bitcoin Software Is Tested

**Future content opportunities:**
- Frequently asked questions companion for Source Code
- Surface-level companion explainer for readers not ready for the full technical treatment

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-development
- learn-category:bitcoin-development
- learn-subcategory:bitcoin-core
- path:build-on-bitcoin
- path:understand-the-network
- level:deep
- format:guide
- subject:source-code
- subject:bitcoin-core
- subject:development

##### MSC-GUIDE-052: How Bitcoin Core Releases Work

**Registry ID:**
MSC-GUIDE-052

**Page role:**
page-role:topic-guide

**Display label:**
Releases

**Final recommended H1:**
How Bitcoin Core Releases Work

**Recommended slug:**
bitcoin-core-releases

**Status:**
PLANNED

**Production order:**
Phase 14.04: Bitcoin Development / Bitcoin Core

**Parent destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Development

**Learn subcategory:**
Bitcoin Core

**Subcategory anchor:**
#bitcoin-core on planned hub slug learn-bitcoin-development

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Explore the Ecosystem

**Depth level:**
Deep

**Content format:**
Reference

**Target reader:**
An informed reader who wants meaningful technical, economic, or operational detail.

**Reader search intent:**
Reference: find a structured overview of the tools, concepts, and interfaces behind bitcoin core releases.

**Primary search phrase:**
bitcoin core releases

**Related search phrases:**
- releases explained
- releases bitcoin
- how bitcoin core releases work

**Supporting subject tags:**
- bitcoin-core
- releases
- testing
- development

**Prerequisite guides:**
- MSC-GUIDE-049 | What Is Bitcoin Core?

**Previous guide:**
MSC-GUIDE-051 | How to Read the Bitcoin Source Code

**Next guide:**
MSC-GUIDE-053 | How Bitcoin Improvement Proposals Work

**Recommended branch guide:**
MSC-GUIDE-053 | How Bitcoin Improvement Proposals Work

**Return destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Recommended learning path continuation:**
MSC-GUIDE-053 | How Bitcoin Improvement Proposals Work

**Related category hub:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Related glossary terms:**
- Software release
- Bitcoin Core
- Testing
- Open-Source development

**Potential related editorials:**
- Developer interview or release highlight connected to Releases
- Technical debate recap that uses this guide as foundational context

**Suggested card description:**
Releases: a structured reference for the tools, concepts, and interfaces involved.

**Suggested card action label:**
Open the reference

**Suggested article length:**
2,200 to 3,200 words

**Suggested reading time range:**
12 to 18 minutes

**Required research notes:**
Use current release-process documentation, signed binaries guidance, release candidates, and reproducible-build references.

**Special accuracy concerns:**
Verify release names, signing procedures, and current branch policy before publication.

**Internal link opportunities:**
- Parent hub: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite guides: MSC-GUIDE-049 | What Is Bitcoin Core?
- Branch guide: MSC-GUIDE-053 | How Bitcoin Improvement Proposals Work

**Future content opportunities:**
- Frequently asked questions companion for Releases
- Surface-level companion explainer for readers not ready for the full technical treatment

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-development
- learn-category:bitcoin-development
- learn-subcategory:bitcoin-core
- path:build-on-bitcoin
- path:explore-the-ecosystem
- level:deep
- format:reference
- subject:bitcoin-core
- subject:releases
- subject:testing
- subject:development

#### Protocols

##### MSC-GUIDE-053: How Bitcoin Improvement Proposals Work

**Registry ID:**
MSC-GUIDE-053

**Page role:**
page-role:topic-guide

**Display label:**
BIPs

**Final recommended H1:**
How Bitcoin Improvement Proposals Work

**Recommended slug:**
bitcoin-improvement-proposals

**Status:**
PLANNED

**Production order:**
Phase 15.01: Bitcoin Development / Protocols

**Parent destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Development

**Learn subcategory:**
Protocols

**Subcategory anchor:**
#protocols on planned hub slug learn-bitcoin-development

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Understand the Network

**Depth level:**
Shallow

**Content format:**
Explainer

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Informational: understand bitcoin improvement proposals, how it works, and why it matters to Bitcoin.

**Primary search phrase:**
bitcoin improvement proposals

**Related search phrases:**
- bips explained
- bips bitcoin
- how bitcoin improvement proposals work
- bitcoin protocol

**Supporting subject tags:**
- bips
- protocol
- development
- consensus

**Prerequisite guides:**
- MSC-GUIDE-030 | How Bitcoin Reaches Consensus
- MSC-GUIDE-031 | How Bitcoin Soft Forks Work

**Previous guide:**
MSC-GUIDE-052 | How Bitcoin Core Releases Work

**Next guide:**
MSC-GUIDE-054 | How Bitcoin Script Works

**Recommended branch guide:**
MSC-GUIDE-031 | How Bitcoin Soft Forks Work

**Return destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Recommended learning path continuation:**
MSC-GUIDE-054 | How Bitcoin Script Works

**Related category hub:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Related glossary terms:**
- BIP
- Protocol
- Open-Source development
- Consensus

**Potential related editorials:**
- Developer interview or release highlight connected to BIPs
- Technical debate recap that uses this guide as foundational context

**Suggested card description:**
BIPs: core mechanics, practical relevance, and connections to the wider Bitcoin system.

**Suggested card action label:**
Read the explainer

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use the current BIPs repository and BIP process. Distinguish a BIP number from acceptance, activation, or deployment.

**Special accuracy concerns:**
A BIP is not automatically approved, implemented, activated, or endorsed.

**Internal link opportunities:**
- Parent hub: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite guides: MSC-GUIDE-030 | How Bitcoin Reaches Consensus; MSC-GUIDE-031 | How Bitcoin Soft Forks Work
- Branch guide: MSC-GUIDE-031 | How Bitcoin Soft Forks Work

**Future content opportunities:**
- Frequently asked questions companion for BIPs
- Deeper technical or historical companion focused on one major tradeoff involving BIPs

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-development
- learn-category:bitcoin-development
- learn-subcategory:protocols
- path:build-on-bitcoin
- path:understand-the-network
- level:shallow
- format:explainer
- subject:bips
- subject:protocol
- subject:development
- subject:consensus

##### MSC-GUIDE-054: How Bitcoin Script Works

**Registry ID:**
MSC-GUIDE-054

**Page role:**
page-role:topic-guide

**Display label:**
Script

**Final recommended H1:**
How Bitcoin Script Works

**Recommended slug:**
bitcoin-script

**Status:**
PLANNED

**Production order:**
Phase 15.02: Bitcoin Development / Protocols

**Parent destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Development

**Learn subcategory:**
Protocols

**Subcategory anchor:**
#protocols on planned hub slug learn-bitcoin-development

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Understand the Network

**Depth level:**
Deep

**Content format:**
Technical Analysis

**Target reader:**
An informed reader who wants meaningful technical, economic, or operational detail.

**Reader search intent:**
Advanced informational: understand the design, tradeoffs, maturity, and risks of bitcoin script.

**Primary search phrase:**
bitcoin script

**Related search phrases:**
- script explained
- script bitcoin
- how bitcoin script works
- bitcoin transactions

**Supporting subject tags:**
- script
- transactions
- contracts

**Prerequisite guides:**
- MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work
- MSC-GUIDE-013 | What Are UTXOs in Bitcoin?

**Previous guide:**
MSC-GUIDE-053 | How Bitcoin Improvement Proposals Work

**Next guide:**
MSC-GUIDE-055 | How Taproot Changed Bitcoin

**Recommended branch guide:**
MSC-GUIDE-055 | How Taproot Changed Bitcoin

**Return destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Recommended learning path continuation:**
MSC-GUIDE-056 | How SegWit Changed Bitcoin

**Related category hub:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Related glossary terms:**
- Bitcoin Script
- Transaction
- Bitcoin contract

**Potential related editorials:**
- Developer interview or release highlight connected to Script
- Technical debate recap that uses this guide as foundational context

**Suggested card description:**
Script: design, tradeoffs, maturity, risks, and open questions.

**Suggested card action label:**
Read the analysis

**Suggested article length:**
2,200 to 3,200 words

**Suggested reading time range:**
12 to 18 minutes

**Required research notes:**
Use current Script documentation and consensus code. Keep examples simple enough to audit and avoid implying general-purpose execution.

**Special accuracy concerns:**
Bitcoin Script is intentionally constrained. Avoid Ethereum-style smart-contract analogies that obscure the execution model.

**Internal link opportunities:**
- Parent hub: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite guides: MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work; MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
- Branch guide: MSC-GUIDE-055 | How Taproot Changed Bitcoin

**Future content opportunities:**
- Frequently asked questions companion for Script
- Surface-level companion explainer for readers not ready for the full technical treatment

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-development
- learn-category:bitcoin-development
- learn-subcategory:protocols
- path:build-on-bitcoin
- path:understand-the-network
- level:deep
- format:technical-analysis
- subject:script
- subject:transactions
- subject:contracts

##### MSC-GUIDE-055: How Taproot Changed Bitcoin

**Registry ID:**
MSC-GUIDE-055

**Page role:**
page-role:topic-guide

**Display label:**
Taproot

**Final recommended H1:**
How Taproot Changed Bitcoin

**Recommended slug:**
bitcoin-taproot

**Status:**
PLANNED

**Production order:**
Phase 15.03: Bitcoin Development / Protocols

**Parent destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Development

**Learn subcategory:**
Protocols

**Subcategory anchor:**
#protocols on planned hub slug learn-bitcoin-development

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Understand the Network

**Depth level:**
Deep

**Content format:**
Explainer

**Target reader:**
An informed reader who wants meaningful technical, economic, or operational detail.

**Reader search intent:**
Informational: understand bitcoin taproot, how it works, and why it matters to Bitcoin.

**Primary search phrase:**
bitcoin taproot

**Related search phrases:**
- taproot explained
- taproot bitcoin
- how taproot changed bitcoin
- bitcoin script

**Supporting subject tags:**
- taproot
- script
- privacy
- schnorr

**Prerequisite guides:**
- MSC-GUIDE-054 | How Bitcoin Script Works
- MSC-GUIDE-056 | How SegWit Changed Bitcoin

**Previous guide:**
MSC-GUIDE-054 | How Bitcoin Script Works

**Next guide:**
MSC-GUIDE-056 | How SegWit Changed Bitcoin

**Recommended branch guide:**
MSC-GUIDE-057 | How Schnorr Signatures Work in Bitcoin

**Return destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Recommended learning path continuation:**
MSC-GUIDE-057 | How Schnorr Signatures Work in Bitcoin

**Related category hub:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Related glossary terms:**
- Taproot
- Bitcoin Script
- Bitcoin privacy
- Schnorr signature

**Potential related editorials:**
- Developer interview or release highlight connected to Taproot
- Technical debate recap that uses this guide as foundational context

**Suggested card description:**
Taproot: core mechanics, practical relevance, and connections to the wider Bitcoin system.

**Suggested card action label:**
Read the explainer

**Suggested article length:**
2,200 to 3,200 words

**Suggested reading time range:**
12 to 18 minutes

**Required research notes:**
Use BIPs 340, 341, and 342 plus activation history and current wallet support.

**Special accuracy concerns:**
Separate Schnorr signatures, Taproot outputs, Tapscript, privacy benefits, and actual wallet usage.

**Internal link opportunities:**
- Parent hub: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite guides: MSC-GUIDE-054 | How Bitcoin Script Works; MSC-GUIDE-056 | How SegWit Changed Bitcoin
- Branch guide: MSC-GUIDE-057 | How Schnorr Signatures Work in Bitcoin

**Future content opportunities:**
- Frequently asked questions companion for Taproot
- Surface-level companion explainer for readers not ready for the full technical treatment

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-development
- learn-category:bitcoin-development
- learn-subcategory:protocols
- path:build-on-bitcoin
- path:understand-the-network
- level:deep
- format:explainer
- subject:taproot
- subject:script
- subject:privacy
- subject:schnorr

##### MSC-GUIDE-056: How SegWit Changed Bitcoin

**Registry ID:**
MSC-GUIDE-056

**Page role:**
page-role:topic-guide

**Display label:**
SegWit

**Final recommended H1:**
How SegWit Changed Bitcoin

**Recommended slug:**
bitcoin-segwit

**Status:**
PLANNED

**Production order:**
Phase 15.04: Bitcoin Development / Protocols

**Parent destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Development

**Learn subcategory:**
Protocols

**Subcategory anchor:**
#protocols on planned hub slug learn-bitcoin-development

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Understand the Network

**Depth level:**
Deep

**Content format:**
History

**Target reader:**
An informed reader who wants meaningful technical, economic, or operational detail.

**Reader search intent:**
Informational: understand the timeline, context, and significance of bitcoin segwit.

**Primary search phrase:**
bitcoin segwit

**Related search phrases:**
- segwit explained
- segwit bitcoin
- how segwit changed bitcoin
- bitcoin transactions

**Supporting subject tags:**
- segwit
- transactions
- scaling
- soft-forks

**Prerequisite guides:**
- MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work

**Previous guide:**
MSC-GUIDE-055 | How Taproot Changed Bitcoin

**Next guide:**
MSC-GUIDE-057 | How Schnorr Signatures Work in Bitcoin

**Recommended branch guide:**
MSC-GUIDE-055 | How Taproot Changed Bitcoin

**Return destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Recommended learning path continuation:**
MSC-GUIDE-055 | How Taproot Changed Bitcoin

**Related category hub:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Related glossary terms:**
- SegWit
- Transaction
- Scaling
- Soft fork

**Potential related editorials:**
- Developer interview or release highlight connected to SegWit
- Technical debate recap that uses this guide as foundational context

**Suggested card description:**
SegWit: history, turning points, and lasting significance within Bitcoin.

**Suggested card action label:**
Explore the history

**Suggested article length:**
2,200 to 3,200 words

**Suggested reading time range:**
12 to 18 minutes

**Required research notes:**
Use BIPs 141, 143, and related activation history. Explain transaction malleability, weight, and compatibility accurately.

**Special accuracy concerns:**
Avoid saying SegWit simply increased block size. Explain weight and compatibility.

**Internal link opportunities:**
- Parent hub: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite guides: MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work; MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work
- Branch guide: MSC-GUIDE-055 | How Taproot Changed Bitcoin

**Future content opportunities:**
- Frequently asked questions companion for SegWit
- Surface-level companion explainer for readers not ready for the full technical treatment

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-development
- learn-category:bitcoin-development
- learn-subcategory:protocols
- path:build-on-bitcoin
- path:understand-the-network
- level:deep
- format:history
- subject:segwit
- subject:transactions
- subject:scaling
- subject:soft-forks

#### Cryptography

##### MSC-GUIDE-057: How Schnorr Signatures Work in Bitcoin

**Registry ID:**
MSC-GUIDE-057

**Page role:**
page-role:topic-guide

**Display label:**
Schnorr Signatures

**Final recommended H1:**
How Schnorr Signatures Work in Bitcoin

**Recommended slug:**
bitcoin-schnorr-signatures

**Status:**
PLANNED

**Production order:**
Phase 16.01: Bitcoin Development / Cryptography

**Parent destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Development

**Learn subcategory:**
Cryptography

**Subcategory anchor:**
#cryptography on planned hub slug learn-bitcoin-development

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Understand the Network

**Depth level:**
Deep

**Content format:**
Technical Analysis

**Target reader:**
An informed reader who wants meaningful technical, economic, or operational detail.

**Reader search intent:**
Advanced informational: understand the design, tradeoffs, maturity, and risks of bitcoin schnorr signatures.

**Primary search phrase:**
bitcoin schnorr signatures

**Related search phrases:**
- schnorr signatures explained
- schnorr signatures bitcoin
- how schnorr signatures work in bitcoin

**Supporting subject tags:**
- schnorr
- signatures
- taproot
- cryptography

**Prerequisite guides:**
- MSC-GUIDE-055 | How Taproot Changed Bitcoin
- MSC-GUIDE-058 | How Digital Signatures Work in Bitcoin

**Previous guide:**
MSC-GUIDE-056 | How SegWit Changed Bitcoin

**Next guide:**
MSC-GUIDE-058 | How Digital Signatures Work in Bitcoin

**Recommended branch guide:**
MSC-GUIDE-058 | How Digital Signatures Work in Bitcoin

**Return destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Recommended learning path continuation:**
MSC-GUIDE-033 | How the Lightning Network Works

**Related category hub:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Related glossary terms:**
- Schnorr signature
- Digital signature
- Taproot
- Cryptography

**Potential related editorials:**
- Developer interview or release highlight connected to Schnorr Signatures
- Technical debate recap that uses this guide as foundational context

**Suggested card description:**
Schnorr Signatures: design, tradeoffs, maturity, risks, and open questions.

**Suggested card action label:**
Read the analysis

**Suggested article length:**
2,200 to 3,200 words

**Suggested reading time range:**
12 to 18 minutes

**Required research notes:**
Use BIP 340 and cryptographic references. Explain aggregation claims carefully and distinguish Schnorr properties from higher-level protocols.

**Special accuracy concerns:**
Do not claim native cross-input signature aggregation unless the specific protocol and deployment support it.

**Internal link opportunities:**
- Parent hub: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite guides: MSC-GUIDE-055 | How Taproot Changed Bitcoin; MSC-GUIDE-058 | How Digital Signatures Work in Bitcoin
- Branch guide: MSC-GUIDE-058 | How Digital Signatures Work in Bitcoin

**Future content opportunities:**
- Frequently asked questions companion for Schnorr Signatures
- Surface-level companion explainer for readers not ready for the full technical treatment

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-development
- learn-category:bitcoin-development
- learn-subcategory:cryptography
- path:build-on-bitcoin
- path:understand-the-network
- level:deep
- format:technical-analysis
- subject:schnorr
- subject:signatures
- subject:taproot
- subject:cryptography

##### MSC-GUIDE-058: How Digital Signatures Work in Bitcoin

**Registry ID:**
MSC-GUIDE-058

**Page role:**
page-role:topic-guide

**Display label:**
Digital Signatures

**Final recommended H1:**
How Digital Signatures Work in Bitcoin

**Recommended slug:**
bitcoin-digital-signatures

**Status:**
PLANNED

**Production order:**
Phase 16.02: Bitcoin Development / Cryptography

**Parent destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Development

**Learn subcategory:**
Cryptography

**Subcategory anchor:**
#cryptography on planned hub slug learn-bitcoin-development

**Primary learning path:**
Understand the Network

**Secondary learning paths:**
- Use Bitcoin Safely
- Build on Bitcoin

**Depth level:**
Shallow

**Content format:**
Explainer

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Informational: understand bitcoin digital signatures, how it works, and why it matters to Bitcoin.

**Primary search phrase:**
bitcoin digital signatures

**Related search phrases:**
- digital signatures explained
- digital signatures bitcoin
- how digital signatures work in bitcoin
- bitcoin keys

**Supporting subject tags:**
- signatures
- keys
- cryptography

**Prerequisite guides:**
- MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work

**Previous guide:**
MSC-GUIDE-057 | How Schnorr Signatures Work in Bitcoin

**Next guide:**
MSC-GUIDE-059 | How Hash Functions Work in Bitcoin

**Recommended branch guide:**
MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work

**Return destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Recommended learning path continuation:**
MSC-GUIDE-059 | How Hash Functions Work in Bitcoin

**Related category hub:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Related glossary terms:**
- Digital signature
- Private key
- Cryptography

**Potential related editorials:**
- Developer interview or release highlight connected to Digital Signatures
- Technical debate recap that uses this guide as foundational context

**Suggested card description:**
Digital Signatures: core mechanics, practical relevance, and connections to the wider Bitcoin system.

**Suggested card action label:**
Read the explainer

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use the Bitcoin Core repository and documentation, the BIPs repository, primary cryptographic specifications, and current developer tooling.

**Special accuracy concerns:**
Keep the explanation conceptually accurate without exposing readers to unsafe key-handling examples.

**Internal link opportunities:**
- Parent hub: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-NETWORK | Understand the Network
- Prerequisite guides: MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work
- Branch guide: MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work

**Future content opportunities:**
- Frequently asked questions companion for Digital Signatures
- Deeper technical or historical companion focused on one major tradeoff involving Digital Signatures

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-development
- learn-category:bitcoin-development
- learn-subcategory:cryptography
- path:understand-the-network
- path:use-bitcoin-safely
- path:build-on-bitcoin
- level:shallow
- format:explainer
- subject:signatures
- subject:keys
- subject:cryptography

##### MSC-GUIDE-059: How Hash Functions Work in Bitcoin

**Registry ID:**
MSC-GUIDE-059

**Page role:**
page-role:topic-guide

**Display label:**
Hash Functions

**Final recommended H1:**
How Hash Functions Work in Bitcoin

**Recommended slug:**
bitcoin-hash-functions

**Status:**
PLANNED

**Production order:**
Phase 16.03: Bitcoin Development / Cryptography

**Parent destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Development

**Learn subcategory:**
Cryptography

**Subcategory anchor:**
#cryptography on planned hub slug learn-bitcoin-development

**Primary learning path:**
Understand the Network

**Secondary learning paths:**
- Build on Bitcoin

**Depth level:**
Shallow

**Content format:**
Explainer

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Informational: understand bitcoin hash functions, how it works, and why it matters to Bitcoin.

**Primary search phrase:**
bitcoin hash functions

**Related search phrases:**
- hash functions explained
- hash functions bitcoin
- how hash functions work in bitcoin
- bitcoin proof of work

**Supporting subject tags:**
- hash-functions
- proof-of-work
- cryptography

**Prerequisite guides:**
- MSC-GUIDE-001 | What Is Bitcoin?

**Previous guide:**
MSC-GUIDE-058 | How Digital Signatures Work in Bitcoin

**Next guide:**
MSC-GUIDE-060 | How Merkle Trees Work in Bitcoin

**Recommended branch guide:**
MSC-GUIDE-029 | How Bitcoin Proof of Work Secures the Network

**Return destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Recommended learning path continuation:**
MSC-GUIDE-060 | How Merkle Trees Work in Bitcoin

**Related category hub:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Related glossary terms:**
- Hash function
- Proof of work
- Cryptography

**Potential related editorials:**
- Developer interview or release highlight connected to Hash Functions
- Technical debate recap that uses this guide as foundational context

**Suggested card description:**
Hash Functions: core mechanics, practical relevance, and connections to the wider Bitcoin system.

**Suggested card action label:**
Read the explainer

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use the Bitcoin Core repository and documentation, the BIPs repository, primary cryptographic specifications, and current developer tooling.

**Special accuracy concerns:**
Distinguish preimage resistance, collision resistance, and proof-of-work use.

**Internal link opportunities:**
- Parent hub: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-NETWORK | Understand the Network
- Prerequisite guides: MSC-GUIDE-001 | What Is Bitcoin?
- Branch guide: MSC-GUIDE-029 | How Bitcoin Proof of Work Secures the Network

**Future content opportunities:**
- Frequently asked questions companion for Hash Functions
- Deeper technical or historical companion focused on one major tradeoff involving Hash Functions

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-development
- learn-category:bitcoin-development
- learn-subcategory:cryptography
- path:understand-the-network
- path:build-on-bitcoin
- level:shallow
- format:explainer
- subject:hash-functions
- subject:proof-of-work
- subject:cryptography

##### MSC-GUIDE-060: How Merkle Trees Work in Bitcoin

**Registry ID:**
MSC-GUIDE-060

**Page role:**
page-role:topic-guide

**Display label:**
Merkle Trees

**Final recommended H1:**
How Merkle Trees Work in Bitcoin

**Recommended slug:**
bitcoin-merkle-trees

**Status:**
PLANNED

**Production order:**
Phase 16.04: Bitcoin Development / Cryptography

**Parent destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Development

**Learn subcategory:**
Cryptography

**Subcategory anchor:**
#cryptography on planned hub slug learn-bitcoin-development

**Primary learning path:**
Understand the Network

**Secondary learning paths:**
- Build on Bitcoin

**Depth level:**
Shallow

**Content format:**
Explainer

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Informational: understand bitcoin merkle trees, how it works, and why it matters to Bitcoin.

**Primary search phrase:**
bitcoin merkle trees

**Related search phrases:**
- merkle trees explained
- merkle trees bitcoin
- how merkle trees work in bitcoin
- bitcoin blocks

**Supporting subject tags:**
- merkle-trees
- blocks
- hash-functions

**Prerequisite guides:**
- MSC-GUIDE-059 | How Hash Functions Work in Bitcoin
- MSC-GUIDE-026 | How Bitcoin Blocks Work

**Previous guide:**
MSC-GUIDE-059 | How Hash Functions Work in Bitcoin

**Next guide:**
MSC-GUIDE-061 | How Bitcoin RPC Works

**Recommended branch guide:**
MSC-GUIDE-026 | How Bitcoin Blocks Work

**Return destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Recommended learning path continuation:**
Complete Understand the Network and return to the Learn homepage.

**Related category hub:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Related glossary terms:**
- Merkle tree
- Block
- Hash function

**Potential related editorials:**
- Developer interview or release highlight connected to Merkle Trees
- Technical debate recap that uses this guide as foundational context

**Suggested card description:**
Merkle Trees: core mechanics, practical relevance, and connections to the wider Bitcoin system.

**Suggested card action label:**
Read the explainer

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use the Bitcoin Core repository and documentation, the BIPs repository, primary cryptographic specifications, and current developer tooling.

**Special accuracy concerns:**
Explain Merkle roots and inclusion proofs without implying they prove transaction validity by themselves.

**Internal link opportunities:**
- Parent hub: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-NETWORK | Understand the Network
- Prerequisite guides: MSC-GUIDE-059 | How Hash Functions Work in Bitcoin; MSC-GUIDE-026 | How Bitcoin Blocks Work
- Branch guide: MSC-GUIDE-026 | How Bitcoin Blocks Work

**Future content opportunities:**
- Frequently asked questions companion for Merkle Trees
- Deeper technical or historical companion focused on one major tradeoff involving Merkle Trees

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-development
- learn-category:bitcoin-development
- learn-subcategory:cryptography
- path:understand-the-network
- path:build-on-bitcoin
- level:shallow
- format:explainer
- subject:merkle-trees
- subject:blocks
- subject:hash-functions

#### Infrastructure

##### MSC-GUIDE-061: How Bitcoin RPC Works

**Registry ID:**
MSC-GUIDE-061

**Page role:**
page-role:topic-guide

**Display label:**
RPC

**Final recommended H1:**
How Bitcoin RPC Works

**Recommended slug:**
bitcoin-rpc

**Status:**
PLANNED

**Production order:**
Phase 17.01: Bitcoin Development / Infrastructure

**Parent destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Development

**Learn subcategory:**
Infrastructure

**Subcategory anchor:**
#infrastructure on planned hub slug learn-bitcoin-development

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Understand the Network

**Depth level:**
Deep

**Content format:**
Reference

**Target reader:**
An informed reader who wants meaningful technical, economic, or operational detail.

**Reader search intent:**
Reference: find a structured overview of the tools, concepts, and interfaces behind bitcoin rpc.

**Primary search phrase:**
bitcoin rpc

**Related search phrases:**
- rpc explained
- rpc bitcoin
- how bitcoin rpc works
- bitcoin bitcoin core

**Supporting subject tags:**
- rpc
- bitcoin-core
- apis
- infrastructure

**Prerequisite guides:**
- MSC-GUIDE-049 | What Is Bitcoin Core?
- MSC-GUIDE-043 | Bitcoin APIs Explained

**Previous guide:**
MSC-GUIDE-060 | How Merkle Trees Work in Bitcoin

**Next guide:**
MSC-GUIDE-062 | How to Set Up a Bitcoin Development Environment

**Recommended branch guide:**
MSC-GUIDE-062 | How to Set Up a Bitcoin Development Environment

**Return destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Recommended learning path continuation:**
MSC-GUIDE-043 | Bitcoin APIs Explained

**Related category hub:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Related glossary terms:**
- RPC
- Bitcoin Core
- API
- Infrastructure

**Potential related editorials:**
- Developer interview or release highlight connected to RPC
- Technical debate recap that uses this guide as foundational context

**Suggested card description:**
RPC: a structured reference for the tools, concepts, and interfaces involved.

**Suggested card action label:**
Open the reference

**Suggested article length:**
2,200 to 3,200 words

**Suggested reading time range:**
12 to 18 minutes

**Required research notes:**
Use current Bitcoin Core RPC documentation. Mark methods, arguments, and examples by release where necessary.

**Special accuracy concerns:**
RPC access can control sensitive node or wallet functions. Include authentication and network-exposure warnings.

**Internal link opportunities:**
- Parent hub: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite guides: MSC-GUIDE-049 | What Is Bitcoin Core?; MSC-GUIDE-043 | Bitcoin APIs Explained
- Branch guide: MSC-GUIDE-062 | How to Set Up a Bitcoin Development Environment
- Future Tools connection: a practical tool page related to bitcoin rpc, activated only after that destination exists

**Future content opportunities:**
- Frequently asked questions companion for RPC
- Surface-level companion explainer for readers not ready for the full technical treatment

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-development
- learn-category:bitcoin-development
- learn-subcategory:infrastructure
- path:build-on-bitcoin
- path:understand-the-network
- level:deep
- format:reference
- subject:rpc
- subject:bitcoin-core
- subject:apis
- subject:infrastructure

##### MSC-GUIDE-062: How to Set Up a Bitcoin Development Environment

**Registry ID:**
MSC-GUIDE-062

**Page role:**
page-role:topic-guide

**Display label:**
Development Environment

**Final recommended H1:**
How to Set Up a Bitcoin Development Environment

**Recommended slug:**
bitcoin-development-environment

**Status:**
PLANNED

**Production order:**
Phase 17.02: Bitcoin Development / Infrastructure

**Parent destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Development

**Learn subcategory:**
Infrastructure

**Subcategory anchor:**
#infrastructure on planned hub slug learn-bitcoin-development

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Explore the Ecosystem

**Depth level:**
Deep

**Content format:**
Walkthrough

**Target reader:**
An informed reader who wants meaningful technical, economic, or operational detail.

**Reader search intent:**
Practical: follow the steps involved in bitcoin development environment and understand the decisions and risks.

**Primary search phrase:**
bitcoin development environment

**Related search phrases:**
- development environment explained
- development environment bitcoin
- how to set up a bitcoin development environment
- bitcoin testing

**Supporting subject tags:**
- development
- testing
- bitcoin-core
- tools

**Prerequisite guides:**
- MSC-GUIDE-041 | Bitcoin Developer Tools: A Practical Overview

**Previous guide:**
MSC-GUIDE-061 | How Bitcoin RPC Works

**Next guide:**
MSC-GUIDE-063 | How Bitcoin Software Is Tested

**Recommended branch guide:**
MSC-GUIDE-063 | How Bitcoin Software Is Tested

**Return destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Recommended learning path continuation:**
MSC-GUIDE-061 | How Bitcoin RPC Works

**Related category hub:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Related glossary terms:**
- Development environment
- Open-Source development
- Testing
- Bitcoin Core
- Developer tool

**Potential related editorials:**
- Developer interview or release highlight connected to Development Environment
- Technical debate recap that uses this guide as foundational context

**Suggested card description:**
Development Environment: a practical sequence with the decisions, checks, and risks that matter.

**Suggested card action label:**
Follow the walkthrough

**Suggested article length:**
2,200 to 3,200 words

**Suggested reading time range:**
12 to 18 minutes

**Required research notes:**
Use current build documentation, supported compilers, regtest, signet, and test tooling. Keep setup commands version-aware.

**Special accuracy concerns:**
Do not publish setup commands without version checks and platform notes.

**Internal link opportunities:**
- Parent hub: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite guides: MSC-GUIDE-041 | Bitcoin Developer Tools: A Practical Overview
- Branch guide: MSC-GUIDE-063 | How Bitcoin Software Is Tested

**Future content opportunities:**
- Frequently asked questions companion for Development Environment
- Surface-level companion explainer for readers not ready for the full technical treatment

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-development
- learn-category:bitcoin-development
- learn-subcategory:infrastructure
- path:build-on-bitcoin
- path:explore-the-ecosystem
- level:deep
- format:walkthrough
- subject:development
- subject:testing
- subject:bitcoin-core
- subject:tools

##### MSC-GUIDE-063: How Bitcoin Software Is Tested

**Registry ID:**
MSC-GUIDE-063

**Page role:**
page-role:topic-guide

**Display label:**
Testing

**Final recommended H1:**
How Bitcoin Software Is Tested

**Recommended slug:**
bitcoin-software-testing

**Status:**
PLANNED

**Production order:**
Phase 17.03: Bitcoin Development / Infrastructure

**Parent destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Development

**Learn subcategory:**
Infrastructure

**Subcategory anchor:**
#infrastructure on planned hub slug learn-bitcoin-development

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Understand the Network

**Depth level:**
Deep

**Content format:**
Guide

**Target reader:**
An informed reader who wants meaningful technical, economic, or operational detail.

**Reader search intent:**
Practical informational: understand bitcoin software testing and apply sound decisions without relying on promotional claims.

**Primary search phrase:**
bitcoin software testing

**Related search phrases:**
- testing explained
- testing bitcoin
- how bitcoin software is tested
- bitcoin bitcoin core

**Supporting subject tags:**
- testing
- bitcoin-core
- security
- development

**Prerequisite guides:**
- MSC-GUIDE-051 | How to Read the Bitcoin Source Code
- MSC-GUIDE-062 | How to Set Up a Bitcoin Development Environment

**Previous guide:**
MSC-GUIDE-062 | How to Set Up a Bitcoin Development Environment

**Next guide:**
MSC-GUIDE-064 | How to Run Reliable Bitcoin Infrastructure

**Recommended branch guide:**
MSC-GUIDE-064 | How to Run Reliable Bitcoin Infrastructure

**Return destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Recommended learning path continuation:**
MSC-GUIDE-052 | How Bitcoin Core Releases Work

**Related category hub:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Related glossary terms:**
- Testing
- Bitcoin Core
- Threat model
- Open-Source development

**Potential related editorials:**
- Developer interview or release highlight connected to Testing
- Technical debate recap that uses this guide as foundational context

**Suggested card description:**
Testing: practical guidance, sound decision criteria, and clearly stated limits.

**Suggested card action label:**
Read the guide

**Suggested article length:**
2,200 to 3,200 words

**Suggested reading time range:**
12 to 18 minutes

**Required research notes:**
Use Bitcoin Core testing documentation, functional tests, fuzzing, review practices, and reproducible-build processes.

**Special accuracy concerns:**
Avoid implying tests prove absence of bugs. Explain review, fuzzing, functional testing, and limitations.

**Internal link opportunities:**
- Parent hub: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite guides: MSC-GUIDE-051 | How to Read the Bitcoin Source Code; MSC-GUIDE-062 | How to Set Up a Bitcoin Development Environment
- Branch guide: MSC-GUIDE-064 | How to Run Reliable Bitcoin Infrastructure

**Future content opportunities:**
- Frequently asked questions companion for Testing
- Surface-level companion explainer for readers not ready for the full technical treatment

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-development
- learn-category:bitcoin-development
- learn-subcategory:infrastructure
- path:build-on-bitcoin
- path:understand-the-network
- level:deep
- format:guide
- subject:testing
- subject:bitcoin-core
- subject:security
- subject:development

##### MSC-GUIDE-064: How to Run Reliable Bitcoin Infrastructure

**Registry ID:**
MSC-GUIDE-064

**Page role:**
page-role:topic-guide

**Display label:**
Running Infrastructure

**Final recommended H1:**
How to Run Reliable Bitcoin Infrastructure

**Recommended slug:**
bitcoin-infrastructure

**Status:**
PLANNED

**Production order:**
Phase 17.04: Bitcoin Development / Infrastructure

**Parent destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Development

**Learn subcategory:**
Infrastructure

**Subcategory anchor:**
#infrastructure on planned hub slug learn-bitcoin-development

**Primary learning path:**
Build on Bitcoin

**Secondary learning paths:**
- Use Bitcoin Safely

**Depth level:**
Deep

**Content format:**
Guide

**Target reader:**
An informed reader who wants meaningful technical, economic, or operational detail.

**Reader search intent:**
Practical informational: understand bitcoin infrastructure and apply sound decisions without relying on promotional claims.

**Primary search phrase:**
bitcoin infrastructure

**Related search phrases:**
- running infrastructure explained
- running infrastructure bitcoin
- how to run reliable bitcoin infrastructure
- bitcoin nodes

**Supporting subject tags:**
- infrastructure
- nodes
- security
- operations

**Prerequisite guides:**
- MSC-GUIDE-023 | How to Run a Bitcoin Node
- MSC-GUIDE-061 | How Bitcoin RPC Works
- MSC-GUIDE-063 | How Bitcoin Software Is Tested

**Previous guide:**
MSC-GUIDE-063 | How Bitcoin Software Is Tested

**Next guide:**
MSC-GUIDE-065 | Who Builds on Bitcoin?

**Recommended branch guide:**
MSC-GUIDE-023 | How to Run a Bitcoin Node

**Return destination:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Recommended learning path continuation:**
Complete Build on Bitcoin and return to the Learn homepage.

**Related category hub:**
MSC-HUB-DEVELOPMENT | Bitcoin Development

**Related glossary terms:**
- Infrastructure
- Node
- Threat model
- Operations

**Potential related editorials:**
- Developer interview or release highlight connected to Running Infrastructure
- Technical debate recap that uses this guide as foundational context

**Suggested card description:**
Running Infrastructure: practical guidance, sound decision criteria, and clearly stated limits.

**Suggested card action label:**
Read the guide

**Suggested article length:**
2,200 to 3,200 words

**Suggested reading time range:**
12 to 18 minutes

**Required research notes:**
Use current operational guidance for nodes, indexes, backups, monitoring, networking, and key separation. Avoid one-size-fits-all security claims.

**Special accuracy concerns:**
Separate public node services, private nodes, wallets, indexes, and production payment infrastructure.

**Internal link opportunities:**
- Parent hub: MSC-HUB-DEVELOPMENT | Bitcoin Development
- Primary path: MSC-PATH-BUILD | Build on Bitcoin
- Prerequisite guides: MSC-GUIDE-023 | How to Run a Bitcoin Node; MSC-GUIDE-061 | How Bitcoin RPC Works; MSC-GUIDE-063 | How Bitcoin Software Is Tested
- Branch guide: MSC-GUIDE-023 | How to Run a Bitcoin Node

**Future content opportunities:**
- Frequently asked questions companion for Running Infrastructure
- Surface-level companion explainer for readers not ready for the full technical treatment

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-development
- learn-category:bitcoin-development
- learn-subcategory:infrastructure
- path:build-on-bitcoin
- path:use-bitcoin-safely
- level:deep
- format:guide
- subject:infrastructure
- subject:nodes
- subject:security
- subject:operations

### Bitcoin Ecosystem

#### People

##### MSC-GUIDE-065: Who Builds on Bitcoin?

**Registry ID:**
MSC-GUIDE-065

**Page role:**
page-role:topic-guide

**Display label:**
Builders

**Final recommended H1:**
Who Builds on Bitcoin?

**Recommended slug:**
bitcoin-builders

**Status:**
PLANNED

**Production order:**
Phase 18.01: Bitcoin Ecosystem / People

**Parent destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Ecosystem

**Learn subcategory:**
People

**Subcategory anchor:**
#people on planned hub slug learn-bitcoin-ecosystem

**Primary learning path:**
Explore the Ecosystem

**Secondary learning paths:**
- Start With Bitcoin
- Build on Bitcoin

**Depth level:**
Surface

**Content format:**
Ecosystem Overview

**Target reader:**
A general reader with no required prior Bitcoin knowledge.

**Reader search intent:**
Informational and evaluative: understand how bitcoin builders fits into Bitcoin and how to assess incentives, claims, and risks.

**Primary search phrase:**
bitcoin builders

**Related search phrases:**
- builders explained
- builders bitcoin
- bitcoin development

**Supporting subject tags:**
- builders
- development
- ecosystem

**Prerequisite guides:**
- MSC-GUIDE-001 | What Is Bitcoin?

**Previous guide:**
MSC-GUIDE-064 | How to Run Reliable Bitcoin Infrastructure

**Next guide:**
MSC-GUIDE-066 | What Bitcoin Developers Do

**Recommended branch guide:**
MSC-GUIDE-066 | What Bitcoin Developers Do

**Return destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Recommended learning path continuation:**
MSC-GUIDE-066 | What Bitcoin Developers Do

**Related category hub:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Related glossary terms:**
- Builder
- Open-Source development
- Bitcoin ecosystem

**Potential related editorials:**
- Interview or community profile connected to Builders
- Weekly recap item that links a current event back to this guide

**Suggested card description:**
Builders: role, incentives, risks, history, and relationship to Bitcoin.

**Suggested card action label:**
Explore the overview

**Suggested article length:**
1,400 to 2,000 words

**Suggested reading time range:**
7 to 10 minutes

**Required research notes:**
Use primary company or project materials, regulatory filings when applicable, direct interviews, and reputable independent reporting. Date all changing examples.

**Special accuracy concerns:**
Avoid defining builders by status or funding. Focus on contribution and user value.

**Internal link opportunities:**
- Parent hub: MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem
- Primary path: MSC-PATH-ECOSYSTEM | Explore the Ecosystem
- Prerequisite guides: MSC-GUIDE-001 | What Is Bitcoin?
- Branch guide: MSC-GUIDE-066 | What Bitcoin Developers Do

**Future content opportunities:**
- Frequently asked questions companion for Builders
- Deeper technical or historical companion focused on one major tradeoff involving Builders

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-ecosystem
- learn-category:bitcoin-ecosystem
- learn-subcategory:people
- path:explore-the-ecosystem
- path:start-with-bitcoin
- path:build-on-bitcoin
- level:surface
- format:ecosystem-overview
- subject:builders
- subject:development
- subject:ecosystem

##### MSC-GUIDE-066: What Bitcoin Developers Do

**Registry ID:**
MSC-GUIDE-066

**Page role:**
page-role:topic-guide

**Display label:**
Developers

**Final recommended H1:**
What Bitcoin Developers Do

**Recommended slug:**
bitcoin-developers

**Status:**
PLANNED

**Production order:**
Phase 18.02: Bitcoin Ecosystem / People

**Parent destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Ecosystem

**Learn subcategory:**
People

**Subcategory anchor:**
#people on planned hub slug learn-bitcoin-ecosystem

**Primary learning path:**
Explore the Ecosystem

**Secondary learning paths:**
- Build on Bitcoin

**Depth level:**
Surface

**Content format:**
Ecosystem Overview

**Target reader:**
A general reader with no required prior Bitcoin knowledge.

**Reader search intent:**
Informational and evaluative: understand how bitcoin developers fits into Bitcoin and how to assess incentives, claims, and risks.

**Primary search phrase:**
bitcoin developers

**Related search phrases:**
- developers explained
- developers bitcoin
- bitcoin open source

**Supporting subject tags:**
- developers
- open-source
- bitcoin-core

**Prerequisite guides:**
- MSC-GUIDE-065 | Who Builds on Bitcoin?

**Previous guide:**
MSC-GUIDE-065 | Who Builds on Bitcoin?

**Next guide:**
MSC-GUIDE-067 | Bitcoin Artists and the Culture They Shape

**Recommended branch guide:**
MSC-GUIDE-080 | How Bitcoin Open-Source Projects Work

**Return destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Recommended learning path continuation:**
MSC-GUIDE-067 | Bitcoin Artists and the Culture They Shape

**Related category hub:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Related glossary terms:**
- Developer
- Open-Source
- Bitcoin Core

**Potential related editorials:**
- Interview or community profile connected to Developers
- Weekly recap item that links a current event back to this guide

**Suggested card description:**
Developers: role, incentives, risks, history, and relationship to Bitcoin.

**Suggested card action label:**
Explore the overview

**Suggested article length:**
1,400 to 2,000 words

**Suggested reading time range:**
7 to 10 minutes

**Required research notes:**
Use primary company or project materials, regulatory filings when applicable, direct interviews, and reputable independent reporting. Date all changing examples.

**Special accuracy concerns:**
Avoid calling every software contributor a Bitcoin Core developer. Distinguish projects and roles.

**Internal link opportunities:**
- Parent hub: MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem
- Primary path: MSC-PATH-ECOSYSTEM | Explore the Ecosystem
- Prerequisite guides: MSC-GUIDE-065 | Who Builds on Bitcoin?
- Branch guide: MSC-GUIDE-080 | How Bitcoin Open-Source Projects Work

**Future content opportunities:**
- Frequently asked questions companion for Developers
- Deeper technical or historical companion focused on one major tradeoff involving Developers

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-ecosystem
- learn-category:bitcoin-ecosystem
- learn-subcategory:people
- path:explore-the-ecosystem
- path:build-on-bitcoin
- level:surface
- format:ecosystem-overview
- subject:developers
- subject:open-source
- subject:bitcoin-core

##### MSC-GUIDE-067: Bitcoin Artists and the Culture They Shape

**Registry ID:**
MSC-GUIDE-067

**Page role:**
page-role:topic-guide

**Display label:**
Artists

**Final recommended H1:**
Bitcoin Artists and the Culture They Shape

**Recommended slug:**
bitcoin-artists

**Status:**
PLANNED

**Production order:**
Phase 18.03: Bitcoin Ecosystem / People

**Parent destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Ecosystem

**Learn subcategory:**
People

**Subcategory anchor:**
#people on planned hub slug learn-bitcoin-ecosystem

**Primary learning path:**
Explore the Ecosystem

**Secondary learning paths:**
- Build on Bitcoin

**Depth level:**
Surface

**Content format:**
Ecosystem Overview

**Target reader:**
A general reader with no required prior Bitcoin knowledge.

**Reader search intent:**
Informational and evaluative: understand how bitcoin artists fits into Bitcoin and how to assess incentives, claims, and risks.

**Primary search phrase:**
bitcoin artists

**Related search phrases:**
- artists explained
- artists bitcoin
- bitcoin culture

**Supporting subject tags:**
- art
- culture
- ordinals

**Prerequisite guides:**
- MSC-GUIDE-003 | A History of Bitcoin

**Previous guide:**
MSC-GUIDE-066 | What Bitcoin Developers Do

**Next guide:**
MSC-GUIDE-068 | How Bitcoin Industry Leaders Shape the Ecosystem

**Recommended branch guide:**
MSC-GUIDE-037 | What Are Bitcoin Ordinals?

**Return destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Recommended learning path continuation:**
MSC-GUIDE-068 | How Bitcoin Industry Leaders Shape the Ecosystem

**Related category hub:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Related glossary terms:**
- Artist
- Bitcoin art
- Bitcoin culture
- Ordinals

**Potential related editorials:**
- Interview or community profile connected to Artists
- Weekly recap item that links a current event back to this guide

**Suggested card description:**
Artists: role, incentives, risks, history, and relationship to Bitcoin.

**Suggested card action label:**
Explore the overview

**Suggested article length:**
1,400 to 2,000 words

**Suggested reading time range:**
7 to 10 minutes

**Required research notes:**
Use primary company or project materials, regulatory filings when applicable, direct interviews, and reputable independent reporting. Date all changing examples.

**Special accuracy concerns:**
Do not reduce Bitcoin art to market prices or Ordinals. Include pre-Ordinals and non-tokenized work.

**Internal link opportunities:**
- Parent hub: MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem
- Primary path: MSC-PATH-ECOSYSTEM | Explore the Ecosystem
- Prerequisite guides: MSC-GUIDE-003 | A History of Bitcoin
- Branch guide: MSC-GUIDE-037 | What Are Bitcoin Ordinals?

**Future content opportunities:**
- Frequently asked questions companion for Artists
- Deeper technical or historical companion focused on one major tradeoff involving Artists

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-ecosystem
- learn-category:bitcoin-ecosystem
- learn-subcategory:people
- path:explore-the-ecosystem
- path:build-on-bitcoin
- level:surface
- format:ecosystem-overview
- subject:art
- subject:culture
- subject:ordinals

##### MSC-GUIDE-068: How Bitcoin Industry Leaders Shape the Ecosystem

**Registry ID:**
MSC-GUIDE-068

**Page role:**
page-role:topic-guide

**Display label:**
Industry Leaders

**Final recommended H1:**
How Bitcoin Industry Leaders Shape the Ecosystem

**Recommended slug:**
bitcoin-industry-leaders

**Status:**
PLANNED

**Production order:**
Phase 18.04: Bitcoin Ecosystem / People

**Parent destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Ecosystem

**Learn subcategory:**
People

**Subcategory anchor:**
#people on planned hub slug learn-bitcoin-ecosystem

**Primary learning path:**
Explore the Ecosystem

**Secondary learning paths:**
- Start With Bitcoin

**Depth level:**
Shallow

**Content format:**
Ecosystem Overview

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Informational and evaluative: understand how bitcoin industry leaders fits into Bitcoin and how to assess incentives, claims, and risks.

**Primary search phrase:**
bitcoin industry leaders

**Related search phrases:**
- industry leaders explained
- industry leaders bitcoin
- how bitcoin industry leaders shape the ecosystem
- bitcoin leadership

**Supporting subject tags:**
- leadership
- companies
- ecosystem

**Prerequisite guides:**
- MSC-GUIDE-065 | Who Builds on Bitcoin?

**Previous guide:**
MSC-GUIDE-067 | Bitcoin Artists and the Culture They Shape

**Next guide:**
MSC-GUIDE-069 | How Public Companies Participate in Bitcoin

**Recommended branch guide:**
MSC-GUIDE-069 | How Public Companies Participate in Bitcoin

**Return destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Recommended learning path continuation:**
MSC-GUIDE-069 | How Public Companies Participate in Bitcoin

**Related category hub:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Related glossary terms:**
- Industry leader
- Bitcoin company
- Bitcoin ecosystem

**Potential related editorials:**
- Interview or community profile connected to Industry Leaders
- Weekly recap item that links a current event back to this guide

**Suggested card description:**
Industry Leaders: role, incentives, risks, history, and relationship to Bitcoin.

**Suggested card action label:**
Explore the overview

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Define transparent inclusion criteria. Use documented roles and contributions, not fame, social reach, or personal approval.

**Special accuracy concerns:**
Avoid personality rankings and unsupported claims of influence.

**Internal link opportunities:**
- Parent hub: MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem
- Primary path: MSC-PATH-ECOSYSTEM | Explore the Ecosystem
- Prerequisite guides: MSC-GUIDE-065 | Who Builds on Bitcoin?
- Branch guide: MSC-GUIDE-069 | How Public Companies Participate in Bitcoin

**Future content opportunities:**
- Frequently asked questions companion for Industry Leaders
- Deeper technical or historical companion focused on one major tradeoff involving Industry Leaders

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-ecosystem
- learn-category:bitcoin-ecosystem
- learn-subcategory:people
- path:explore-the-ecosystem
- path:start-with-bitcoin
- level:shallow
- format:ecosystem-overview
- subject:leadership
- subject:companies
- subject:ecosystem

#### Companies

##### MSC-GUIDE-069: How Public Companies Participate in Bitcoin

**Registry ID:**
MSC-GUIDE-069

**Page role:**
page-role:topic-guide

**Display label:**
Public Companies

**Final recommended H1:**
How Public Companies Participate in Bitcoin

**Recommended slug:**
bitcoin-public-companies

**Status:**
PLANNED

**Production order:**
Phase 19.01: Bitcoin Ecosystem / Companies

**Parent destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Ecosystem

**Learn subcategory:**
Companies

**Subcategory anchor:**
#companies on planned hub slug learn-bitcoin-ecosystem

**Primary learning path:**
Explore the Ecosystem

**Secondary learning paths:**
- Start With Bitcoin

**Depth level:**
Shallow

**Content format:**
Ecosystem Overview

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Informational and evaluative: understand how bitcoin public companies fits into Bitcoin and how to assess incentives, claims, and risks.

**Primary search phrase:**
bitcoin public companies

**Related search phrases:**
- public companies explained
- public companies bitcoin
- how public companies participate in bitcoin
- bitcoin adoption

**Supporting subject tags:**
- public-companies
- adoption
- markets

**Prerequisite guides:**
- MSC-GUIDE-001 | What Is Bitcoin?

**Previous guide:**
MSC-GUIDE-068 | How Bitcoin Industry Leaders Shape the Ecosystem

**Next guide:**
MSC-GUIDE-070 | How Bitcoin Startups Build and Compete

**Recommended branch guide:**
MSC-GUIDE-071 | How Bitcoin Mining Companies Operate

**Return destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Recommended learning path continuation:**
MSC-GUIDE-070 | How Bitcoin Startups Build and Compete

**Related category hub:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Related glossary terms:**
- Public company
- Adoption
- Market structure

**Potential related editorials:**
- Interview or community profile connected to Public Companies
- Weekly recap item that links a current event back to this guide

**Suggested card description:**
Public Companies: role, incentives, risks, history, and relationship to Bitcoin.

**Suggested card action label:**
Explore the overview

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use current regulatory filings, treasury disclosures, accounting treatment, and dated market information. Do not treat holdings as endorsement.

**Special accuracy concerns:**
Date holdings and disclosures. Separate treasury strategy, operating business, and market narrative.

**Internal link opportunities:**
- Parent hub: MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem
- Primary path: MSC-PATH-ECOSYSTEM | Explore the Ecosystem
- Prerequisite guides: MSC-GUIDE-001 | What Is Bitcoin?
- Branch guide: MSC-GUIDE-071 | How Bitcoin Mining Companies Operate

**Future content opportunities:**
- Frequently asked questions companion for Public Companies
- Deeper technical or historical companion focused on one major tradeoff involving Public Companies

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-ecosystem
- learn-category:bitcoin-ecosystem
- learn-subcategory:companies
- path:explore-the-ecosystem
- path:start-with-bitcoin
- level:shallow
- format:ecosystem-overview
- subject:public-companies
- subject:adoption
- subject:markets

##### MSC-GUIDE-070: How Bitcoin Startups Build and Compete

**Registry ID:**
MSC-GUIDE-070

**Page role:**
page-role:topic-guide

**Display label:**
Startups

**Final recommended H1:**
How Bitcoin Startups Build and Compete

**Recommended slug:**
bitcoin-startups

**Status:**
PLANNED

**Production order:**
Phase 19.02: Bitcoin Ecosystem / Companies

**Parent destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Ecosystem

**Learn subcategory:**
Companies

**Subcategory anchor:**
#companies on planned hub slug learn-bitcoin-ecosystem

**Primary learning path:**
Explore the Ecosystem

**Secondary learning paths:**
- Build on Bitcoin

**Depth level:**
Shallow

**Content format:**
Ecosystem Overview

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Informational and evaluative: understand how bitcoin startups fits into Bitcoin and how to assess incentives, claims, and risks.

**Primary search phrase:**
bitcoin startups

**Related search phrases:**
- startups explained
- startups bitcoin
- how bitcoin startups build and compete
- bitcoin builders

**Supporting subject tags:**
- startups
- builders
- adoption

**Prerequisite guides:**
- MSC-GUIDE-065 | Who Builds on Bitcoin?

**Previous guide:**
MSC-GUIDE-069 | How Public Companies Participate in Bitcoin

**Next guide:**
MSC-GUIDE-071 | How Bitcoin Mining Companies Operate

**Recommended branch guide:**
MSC-GUIDE-065 | Who Builds on Bitcoin?

**Return destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Recommended learning path continuation:**
MSC-GUIDE-071 | How Bitcoin Mining Companies Operate

**Related category hub:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Related glossary terms:**
- Startup
- Builder
- Adoption

**Potential related editorials:**
- Interview or community profile connected to Startups
- Weekly recap item that links a current event back to this guide

**Suggested card description:**
Startups: role, incentives, risks, history, and relationship to Bitcoin.

**Suggested card action label:**
Explore the overview

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use primary company or project materials, regulatory filings when applicable, direct interviews, and reputable independent reporting. Date all changing examples.

**Special accuracy concerns:**
Avoid promotional startup lists. Evaluate business model, Bitcoin dependency, custody, and incentives.

**Internal link opportunities:**
- Parent hub: MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem
- Primary path: MSC-PATH-ECOSYSTEM | Explore the Ecosystem
- Prerequisite guides: MSC-GUIDE-065 | Who Builds on Bitcoin?
- Branch guide: MSC-GUIDE-065 | Who Builds on Bitcoin?

**Future content opportunities:**
- Frequently asked questions companion for Startups
- Deeper technical or historical companion focused on one major tradeoff involving Startups

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-ecosystem
- learn-category:bitcoin-ecosystem
- learn-subcategory:companies
- path:explore-the-ecosystem
- path:build-on-bitcoin
- level:shallow
- format:ecosystem-overview
- subject:startups
- subject:builders
- subject:adoption

##### MSC-GUIDE-071: How Bitcoin Mining Companies Operate

**Registry ID:**
MSC-GUIDE-071

**Page role:**
page-role:topic-guide

**Display label:**
Mining Companies

**Final recommended H1:**
How Bitcoin Mining Companies Operate

**Recommended slug:**
bitcoin-mining-companies

**Status:**
PLANNED

**Production order:**
Phase 19.03: Bitcoin Ecosystem / Companies

**Parent destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Ecosystem

**Learn subcategory:**
Companies

**Subcategory anchor:**
#companies on planned hub slug learn-bitcoin-ecosystem

**Primary learning path:**
Explore the Ecosystem

**Secondary learning paths:**
- Understand the Network

**Depth level:**
Shallow

**Content format:**
Ecosystem Overview

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Informational and evaluative: understand how bitcoin mining companies fits into Bitcoin and how to assess incentives, claims, and risks.

**Primary search phrase:**
bitcoin mining companies

**Related search phrases:**
- mining companies explained
- mining companies bitcoin
- how bitcoin mining companies operate

**Supporting subject tags:**
- mining-companies
- mining
- energy
- markets

**Prerequisite guides:**
- MSC-GUIDE-017 | How Bitcoin Mining Works
- MSC-GUIDE-069 | How Public Companies Participate in Bitcoin

**Previous guide:**
MSC-GUIDE-070 | How Bitcoin Startups Build and Compete

**Next guide:**
MSC-GUIDE-072 | What Bitcoin Infrastructure Companies Do

**Recommended branch guide:**
MSC-GUIDE-017 | How Bitcoin Mining Works

**Return destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Recommended learning path continuation:**
MSC-GUIDE-072 | What Bitcoin Infrastructure Companies Do

**Related category hub:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Related glossary terms:**
- Mining company
- Mining
- Energy use
- Market structure

**Potential related editorials:**
- Interview or community profile connected to Mining Companies
- Weekly recap item that links a current event back to this guide

**Suggested card description:**
Mining Companies: role, incentives, risks, history, and relationship to Bitcoin.

**Suggested card action label:**
Explore the overview

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use current public filings, operational reports, pool relationships, energy data, and jurisdictional context. Date every metric.

**Special accuracy concerns:**
Separate industrial mining operations from pools and hardware manufacturers.

**Internal link opportunities:**
- Parent hub: MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem
- Primary path: MSC-PATH-ECOSYSTEM | Explore the Ecosystem
- Prerequisite guides: MSC-GUIDE-017 | How Bitcoin Mining Works; MSC-GUIDE-069 | How Public Companies Participate in Bitcoin
- Branch guide: MSC-GUIDE-017 | How Bitcoin Mining Works

**Future content opportunities:**
- Frequently asked questions companion for Mining Companies
- Deeper technical or historical companion focused on one major tradeoff involving Mining Companies

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-ecosystem
- learn-category:bitcoin-ecosystem
- learn-subcategory:companies
- path:explore-the-ecosystem
- path:understand-the-network
- level:shallow
- format:ecosystem-overview
- subject:mining-companies
- subject:mining
- subject:energy
- subject:markets

##### MSC-GUIDE-072: What Bitcoin Infrastructure Companies Do

**Registry ID:**
MSC-GUIDE-072

**Page role:**
page-role:topic-guide

**Display label:**
Infrastructure Companies

**Final recommended H1:**
What Bitcoin Infrastructure Companies Do

**Recommended slug:**
bitcoin-infrastructure-companies

**Status:**
PLANNED

**Production order:**
Phase 19.04: Bitcoin Ecosystem / Companies

**Parent destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Ecosystem

**Learn subcategory:**
Companies

**Subcategory anchor:**
#companies on planned hub slug learn-bitcoin-ecosystem

**Primary learning path:**
Explore the Ecosystem

**Secondary learning paths:**
- Build on Bitcoin

**Depth level:**
Shallow

**Content format:**
Ecosystem Overview

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Informational and evaluative: understand how bitcoin infrastructure companies fits into Bitcoin and how to assess incentives, claims, and risks.

**Primary search phrase:**
bitcoin infrastructure companies

**Related search phrases:**
- infrastructure companies explained
- infrastructure companies bitcoin

**Supporting subject tags:**
- infrastructure
- companies
- nodes
- payments

**Prerequisite guides:**
- MSC-GUIDE-064 | How to Run Reliable Bitcoin Infrastructure
- MSC-GUIDE-065 | Who Builds on Bitcoin?

**Previous guide:**
MSC-GUIDE-071 | How Bitcoin Mining Companies Operate

**Next guide:**
MSC-GUIDE-073 | How Bitcoin Exchanges Work

**Recommended branch guide:**
MSC-GUIDE-064 | How to Run Reliable Bitcoin Infrastructure

**Return destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Recommended learning path continuation:**
MSC-GUIDE-073 | How Bitcoin Exchanges Work

**Related category hub:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Related glossary terms:**
- Infrastructure company
- Infrastructure
- Bitcoin company
- Node
- Payment

**Potential related editorials:**
- Interview or community profile connected to Infrastructure Companies
- Weekly recap item that links a current event back to this guide

**Suggested card description:**
Infrastructure Companies: role, incentives, risks, history, and relationship to Bitcoin.

**Suggested card action label:**
Explore the overview

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use primary company or project materials, regulatory filings when applicable, direct interviews, and reputable independent reporting. Date all changing examples.

**Special accuracy concerns:**
Define infrastructure by function. Avoid treating every Bitcoin-adjacent company as core infrastructure.

**Internal link opportunities:**
- Parent hub: MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem
- Primary path: MSC-PATH-ECOSYSTEM | Explore the Ecosystem
- Prerequisite guides: MSC-GUIDE-064 | How to Run Reliable Bitcoin Infrastructure; MSC-GUIDE-065 | Who Builds on Bitcoin?
- Branch guide: MSC-GUIDE-064 | How to Run Reliable Bitcoin Infrastructure

**Future content opportunities:**
- Frequently asked questions companion for Infrastructure Companies
- Deeper technical or historical companion focused on one major tradeoff involving Infrastructure Companies

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-ecosystem
- learn-category:bitcoin-ecosystem
- learn-subcategory:companies
- path:explore-the-ecosystem
- path:build-on-bitcoin
- level:shallow
- format:ecosystem-overview
- subject:infrastructure
- subject:companies
- subject:nodes
- subject:payments

#### Markets

##### MSC-GUIDE-073: How Bitcoin Exchanges Work

**Registry ID:**
MSC-GUIDE-073

**Page role:**
page-role:topic-guide

**Display label:**
Exchanges

**Final recommended H1:**
How Bitcoin Exchanges Work

**Recommended slug:**
bitcoin-exchanges

**Status:**
PLANNED

**Production order:**
Phase 20.01: Bitcoin Ecosystem / Markets

**Parent destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Ecosystem

**Learn subcategory:**
Markets

**Subcategory anchor:**
#markets on planned hub slug learn-bitcoin-ecosystem

**Primary learning path:**
Explore the Ecosystem

**Secondary learning paths:**
- Use Bitcoin Safely

**Depth level:**
Surface

**Content format:**
Guide

**Target reader:**
A general reader with no required prior Bitcoin knowledge.

**Reader search intent:**
Practical informational: understand bitcoin exchanges and apply sound decisions without relying on promotional claims.

**Primary search phrase:**
bitcoin exchanges

**Related search phrases:**
- exchanges explained
- exchanges bitcoin
- how bitcoin exchanges work
- bitcoin markets

**Supporting subject tags:**
- exchanges
- markets
- custody
- regulation

**Prerequisite guides:**
- MSC-GUIDE-005 | What Is a Bitcoin Wallet?
- MSC-GUIDE-006 | What Is Bitcoin Self-Custody?

**Previous guide:**
MSC-GUIDE-072 | What Bitcoin Infrastructure Companies Do

**Next guide:**
MSC-GUIDE-074 | How Bitcoin Wallet Providers Operate

**Recommended branch guide:**
MSC-GUIDE-006 | What Is Bitcoin Self-Custody?

**Return destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Recommended learning path continuation:**
MSC-GUIDE-074 | How Bitcoin Wallet Providers Operate

**Related category hub:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Related glossary terms:**
- Exchange
- Market structure
- Custody
- Regulation

**Potential related editorials:**
- Interview or community profile connected to Exchanges
- Weekly recap item that links a current event back to this guide

**Suggested card description:**
Exchanges: practical guidance, sound decision criteria, and clearly stated limits.

**Suggested card action label:**
Read the guide

**Suggested article length:**
1,400 to 2,000 words

**Suggested reading time range:**
7 to 10 minutes

**Required research notes:**
Use current market-structure, custody, reserve, legal, and regulatory sources. Do not recommend a platform without a separate review standard.

**Special accuracy concerns:**
Do not imply exchange custody is equivalent to self-custody. Address jurisdiction and counterparty risk.

**Internal link opportunities:**
- Parent hub: MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem
- Primary path: MSC-PATH-ECOSYSTEM | Explore the Ecosystem
- Prerequisite guides: MSC-GUIDE-005 | What Is a Bitcoin Wallet?; MSC-GUIDE-006 | What Is Bitcoin Self-Custody?
- Branch guide: MSC-GUIDE-006 | What Is Bitcoin Self-Custody?
- Future Tools connection: a practical tool page related to bitcoin exchanges, activated only after that destination exists

**Future content opportunities:**
- Frequently asked questions companion for Exchanges
- Deeper technical or historical companion focused on one major tradeoff involving Exchanges

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-ecosystem
- learn-category:bitcoin-ecosystem
- learn-subcategory:markets
- path:explore-the-ecosystem
- path:use-bitcoin-safely
- level:surface
- format:guide
- subject:exchanges
- subject:markets
- subject:custody
- subject:regulation

##### MSC-GUIDE-074: How Bitcoin Wallet Providers Operate

**Registry ID:**
MSC-GUIDE-074

**Page role:**
page-role:topic-guide

**Display label:**
Wallet Providers

**Final recommended H1:**
How Bitcoin Wallet Providers Operate

**Recommended slug:**
bitcoin-wallet-providers

**Status:**
PLANNED

**Production order:**
Phase 20.02: Bitcoin Ecosystem / Markets

**Parent destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Ecosystem

**Learn subcategory:**
Markets

**Subcategory anchor:**
#markets on planned hub slug learn-bitcoin-ecosystem

**Primary learning path:**
Explore the Ecosystem

**Secondary learning paths:**
- Use Bitcoin Safely

**Depth level:**
Surface

**Content format:**
Guide

**Target reader:**
A general reader with no required prior Bitcoin knowledge.

**Reader search intent:**
Practical informational: understand bitcoin wallet providers and apply sound decisions without relying on promotional claims.

**Primary search phrase:**
bitcoin wallet providers

**Related search phrases:**
- wallet providers explained
- wallet providers bitcoin
- how bitcoin wallet providers operate
- bitcoin wallets

**Supporting subject tags:**
- wallet-providers
- wallets
- security
- custody

**Prerequisite guides:**
- MSC-GUIDE-005 | What Is a Bitcoin Wallet?
- MSC-GUIDE-006 | What Is Bitcoin Self-Custody?

**Previous guide:**
MSC-GUIDE-073 | How Bitcoin Exchanges Work

**Next guide:**
MSC-GUIDE-075 | How Bitcoin Marketplaces Work

**Recommended branch guide:**
MSC-GUIDE-005 | What Is a Bitcoin Wallet?

**Return destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Recommended learning path continuation:**
MSC-GUIDE-075 | How Bitcoin Marketplaces Work

**Related category hub:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Related glossary terms:**
- Wallet provider
- Wallet
- Threat model
- Custody

**Potential related editorials:**
- Interview or community profile connected to Wallet Providers
- Weekly recap item that links a current event back to this guide

**Suggested card description:**
Wallet Providers: practical guidance, sound decision criteria, and clearly stated limits.

**Suggested card action label:**
Read the guide

**Suggested article length:**
1,400 to 2,000 words

**Suggested reading time range:**
7 to 10 minutes

**Required research notes:**
Use current product documentation, custody models, security architecture, and open-source status. Separate provider claims from verified properties.

**Special accuracy concerns:**
Do not rank providers without a documented review method. Clarify custodial, noncustodial, open-source, and hardware distinctions.

**Internal link opportunities:**
- Parent hub: MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem
- Primary path: MSC-PATH-ECOSYSTEM | Explore the Ecosystem
- Prerequisite guides: MSC-GUIDE-005 | What Is a Bitcoin Wallet?; MSC-GUIDE-006 | What Is Bitcoin Self-Custody?
- Branch guide: MSC-GUIDE-005 | What Is a Bitcoin Wallet?
- Future Tools connection: a practical tool page related to bitcoin wallet providers, activated only after that destination exists

**Future content opportunities:**
- Frequently asked questions companion for Wallet Providers
- Deeper technical or historical companion focused on one major tradeoff involving Wallet Providers

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-ecosystem
- learn-category:bitcoin-ecosystem
- learn-subcategory:markets
- path:explore-the-ecosystem
- path:use-bitcoin-safely
- level:surface
- format:guide
- subject:wallet-providers
- subject:wallets
- subject:security
- subject:custody

##### MSC-GUIDE-075: How Bitcoin Marketplaces Work

**Registry ID:**
MSC-GUIDE-075

**Page role:**
page-role:topic-guide

**Display label:**
Marketplaces

**Final recommended H1:**
How Bitcoin Marketplaces Work

**Recommended slug:**
bitcoin-marketplaces

**Status:**
PLANNED

**Production order:**
Phase 20.03: Bitcoin Ecosystem / Markets

**Parent destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Ecosystem

**Learn subcategory:**
Markets

**Subcategory anchor:**
#markets on planned hub slug learn-bitcoin-ecosystem

**Primary learning path:**
Explore the Ecosystem

**Secondary learning paths:**
- Build on Bitcoin

**Depth level:**
Surface

**Content format:**
Ecosystem Overview

**Target reader:**
A general reader with no required prior Bitcoin knowledge.

**Reader search intent:**
Informational and evaluative: understand how bitcoin marketplaces fits into Bitcoin and how to assess incentives, claims, and risks.

**Primary search phrase:**
bitcoin marketplaces

**Related search phrases:**
- marketplaces explained
- marketplaces bitcoin
- how bitcoin marketplaces work
- bitcoin collecting

**Supporting subject tags:**
- marketplaces
- collecting
- payments

**Prerequisite guides:**
- MSC-GUIDE-001 | What Is Bitcoin?

**Previous guide:**
MSC-GUIDE-074 | How Bitcoin Wallet Providers Operate

**Next guide:**
MSC-GUIDE-076 | What Bitcoin Service Providers Do

**Recommended branch guide:**
MSC-GUIDE-037 | What Are Bitcoin Ordinals?

**Return destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Recommended learning path continuation:**
MSC-GUIDE-076 | What Bitcoin Service Providers Do

**Related category hub:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Related glossary terms:**
- Marketplace
- Collecting
- Payment

**Potential related editorials:**
- Interview or community profile connected to Marketplaces
- Weekly recap item that links a current event back to this guide

**Suggested card description:**
Marketplaces: role, incentives, risks, history, and relationship to Bitcoin.

**Suggested card action label:**
Explore the overview

**Suggested article length:**
1,400 to 2,000 words

**Suggested reading time range:**
7 to 10 minutes

**Required research notes:**
Define marketplace types before using examples. Evaluate custody, settlement, indexing, fees, and counterparty risk.

**Special accuracy concerns:**
Avoid value claims about collectibles or tokens. Focus on market structure and settlement.

**Internal link opportunities:**
- Parent hub: MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem
- Primary path: MSC-PATH-ECOSYSTEM | Explore the Ecosystem
- Prerequisite guides: MSC-GUIDE-001 | What Is Bitcoin?
- Branch guide: MSC-GUIDE-037 | What Are Bitcoin Ordinals?

**Future content opportunities:**
- Frequently asked questions companion for Marketplaces
- Deeper technical or historical companion focused on one major tradeoff involving Marketplaces

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-ecosystem
- learn-category:bitcoin-ecosystem
- learn-subcategory:markets
- path:explore-the-ecosystem
- path:build-on-bitcoin
- level:surface
- format:ecosystem-overview
- subject:marketplaces
- subject:collecting
- subject:payments

##### MSC-GUIDE-076: What Bitcoin Service Providers Do

**Registry ID:**
MSC-GUIDE-076

**Page role:**
page-role:topic-guide

**Display label:**
Service Providers

**Final recommended H1:**
What Bitcoin Service Providers Do

**Recommended slug:**
bitcoin-service-providers

**Status:**
PLANNED

**Production order:**
Phase 20.04: Bitcoin Ecosystem / Markets

**Parent destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Ecosystem

**Learn subcategory:**
Markets

**Subcategory anchor:**
#markets on planned hub slug learn-bitcoin-ecosystem

**Primary learning path:**
Explore the Ecosystem

**Secondary learning paths:**
- Start With Bitcoin

**Depth level:**
Surface

**Content format:**
Ecosystem Overview

**Target reader:**
A general reader with no required prior Bitcoin knowledge.

**Reader search intent:**
Informational and evaluative: understand how bitcoin service providers fits into Bitcoin and how to assess incentives, claims, and risks.

**Primary search phrase:**
bitcoin service providers

**Related search phrases:**
- service providers explained
- service providers bitcoin
- bitcoin services
- bitcoin payments

**Supporting subject tags:**
- services
- payments
- adoption

**Prerequisite guides:**
- MSC-GUIDE-001 | What Is Bitcoin?

**Previous guide:**
MSC-GUIDE-075 | How Bitcoin Marketplaces Work

**Next guide:**
MSC-GUIDE-077 | Why Bitcoin Conferences Matter

**Recommended branch guide:**
MSC-GUIDE-073 | How Bitcoin Exchanges Work

**Return destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Recommended learning path continuation:**
MSC-GUIDE-077 | Why Bitcoin Conferences Matter

**Related category hub:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Related glossary terms:**
- Service provider
- Payment
- Adoption

**Potential related editorials:**
- Interview or community profile connected to Service Providers
- Weekly recap item that links a current event back to this guide

**Suggested card description:**
Service Providers: role, incentives, risks, history, and relationship to Bitcoin.

**Suggested card action label:**
Explore the overview

**Suggested article length:**
1,400 to 2,000 words

**Suggested reading time range:**
7 to 10 minutes

**Required research notes:**
Use primary company or project materials, regulatory filings when applicable, direct interviews, and reputable independent reporting. Date all changing examples.

**Special accuracy concerns:**
Avoid a generic vendor directory. Explain service categories, incentives, and evaluation questions.

**Internal link opportunities:**
- Parent hub: MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem
- Primary path: MSC-PATH-ECOSYSTEM | Explore the Ecosystem
- Prerequisite guides: MSC-GUIDE-001 | What Is Bitcoin?
- Branch guide: MSC-GUIDE-073 | How Bitcoin Exchanges Work

**Future content opportunities:**
- Frequently asked questions companion for Service Providers
- Deeper technical or historical companion focused on one major tradeoff involving Service Providers

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-ecosystem
- learn-category:bitcoin-ecosystem
- learn-subcategory:markets
- path:explore-the-ecosystem
- path:start-with-bitcoin
- level:surface
- format:ecosystem-overview
- subject:services
- subject:payments
- subject:adoption

#### Community

##### MSC-GUIDE-077: Why Bitcoin Conferences Matter

**Registry ID:**
MSC-GUIDE-077

**Page role:**
page-role:topic-guide

**Display label:**
Conferences

**Final recommended H1:**
Why Bitcoin Conferences Matter

**Recommended slug:**
bitcoin-conferences

**Status:**
PLANNED

**Production order:**
Phase 21.01: Bitcoin Ecosystem / Community

**Parent destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Ecosystem

**Learn subcategory:**
Community

**Subcategory anchor:**
#community on planned hub slug learn-bitcoin-ecosystem

**Primary learning path:**
Explore the Ecosystem

**Secondary learning paths:**
- Start With Bitcoin

**Depth level:**
Surface

**Content format:**
Ecosystem Overview

**Target reader:**
A general reader with no required prior Bitcoin knowledge.

**Reader search intent:**
Informational and evaluative: understand how bitcoin conferences fits into Bitcoin and how to assess incentives, claims, and risks.

**Primary search phrase:**
bitcoin conferences

**Related search phrases:**
- conferences explained
- conferences bitcoin
- bitcoin community

**Supporting subject tags:**
- conferences
- community
- culture

**Prerequisite guides:**
- MSC-GUIDE-003 | A History of Bitcoin

**Previous guide:**
MSC-GUIDE-076 | What Bitcoin Service Providers Do

**Next guide:**
MSC-GUIDE-078 | How Bitcoin Communities Form and Grow

**Recommended branch guide:**
MSC-GUIDE-078 | How Bitcoin Communities Form and Grow

**Return destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Recommended learning path continuation:**
MSC-GUIDE-078 | How Bitcoin Communities Form and Grow

**Related category hub:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Related glossary terms:**
- Conference
- Community
- Bitcoin culture

**Potential related editorials:**
- Interview or community profile connected to Conferences
- Weekly recap item that links a current event back to this guide

**Suggested card description:**
Conferences: role, incentives, risks, history, and relationship to Bitcoin.

**Suggested card action label:**
Explore the overview

**Suggested article length:**
1,400 to 2,000 words

**Suggested reading time range:**
7 to 10 minutes

**Required research notes:**
Use official event records and independent reporting. Avoid ranking conferences by size or prestige without transparent data.

**Special accuracy concerns:**
Avoid attendance claims or event rankings without dated sources.

**Internal link opportunities:**
- Parent hub: MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem
- Primary path: MSC-PATH-ECOSYSTEM | Explore the Ecosystem
- Prerequisite guides: MSC-GUIDE-003 | A History of Bitcoin
- Branch guide: MSC-GUIDE-078 | How Bitcoin Communities Form and Grow

**Future content opportunities:**
- Frequently asked questions companion for Conferences
- Deeper technical or historical companion focused on one major tradeoff involving Conferences

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-ecosystem
- learn-category:bitcoin-ecosystem
- learn-subcategory:community
- path:explore-the-ecosystem
- path:start-with-bitcoin
- level:surface
- format:ecosystem-overview
- subject:conferences
- subject:community
- subject:culture

##### MSC-GUIDE-078: How Bitcoin Communities Form and Grow

**Registry ID:**
MSC-GUIDE-078

**Page role:**
page-role:topic-guide

**Display label:**
Communities

**Final recommended H1:**
How Bitcoin Communities Form and Grow

**Recommended slug:**
bitcoin-communities

**Status:**
PLANNED

**Production order:**
Phase 21.02: Bitcoin Ecosystem / Community

**Parent destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Ecosystem

**Learn subcategory:**
Community

**Subcategory anchor:**
#community on planned hub slug learn-bitcoin-ecosystem

**Primary learning path:**
Explore the Ecosystem

**Secondary learning paths:**
- Start With Bitcoin

**Depth level:**
Surface

**Content format:**
Ecosystem Overview

**Target reader:**
A general reader with no required prior Bitcoin knowledge.

**Reader search intent:**
Informational and evaluative: understand how bitcoin communities fits into Bitcoin and how to assess incentives, claims, and risks.

**Primary search phrase:**
bitcoin communities

**Related search phrases:**
- communities explained
- communities bitcoin
- how bitcoin communities form and grow
- bitcoin community

**Supporting subject tags:**
- community
- education
- adoption

**Prerequisite guides:**
- MSC-GUIDE-001 | What Is Bitcoin?

**Previous guide:**
MSC-GUIDE-077 | Why Bitcoin Conferences Matter

**Next guide:**
MSC-GUIDE-079 | Major Milestones in Bitcoin History

**Recommended branch guide:**
MSC-GUIDE-065 | Who Builds on Bitcoin?

**Return destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Recommended learning path continuation:**
MSC-GUIDE-080 | How Bitcoin Open-Source Projects Work

**Related category hub:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Related glossary terms:**
- Community
- Education
- Adoption

**Potential related editorials:**
- Interview or community profile connected to Communities
- Weekly recap item that links a current event back to this guide

**Suggested card description:**
Communities: role, incentives, risks, history, and relationship to Bitcoin.

**Suggested card action label:**
Explore the overview

**Suggested article length:**
1,400 to 2,000 words

**Suggested reading time range:**
7 to 10 minutes

**Required research notes:**
Use primary company or project materials, regulatory filings when applicable, direct interviews, and reputable independent reporting. Date all changing examples.

**Special accuracy concerns:**
Do not romanticize community consensus. Include governance tensions, local context, and capture risks.

**Internal link opportunities:**
- Parent hub: MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem
- Primary path: MSC-PATH-ECOSYSTEM | Explore the Ecosystem
- Prerequisite guides: MSC-GUIDE-001 | What Is Bitcoin?
- Branch guide: MSC-GUIDE-065 | Who Builds on Bitcoin?

**Future content opportunities:**
- Frequently asked questions companion for Communities
- Deeper technical or historical companion focused on one major tradeoff involving Communities

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-ecosystem
- learn-category:bitcoin-ecosystem
- learn-subcategory:community
- path:explore-the-ecosystem
- path:start-with-bitcoin
- level:surface
- format:ecosystem-overview
- subject:community
- subject:education
- subject:adoption

##### MSC-GUIDE-079: Major Milestones in Bitcoin History

**Registry ID:**
MSC-GUIDE-079

**Page role:**
page-role:topic-guide

**Display label:**
Historical Milestones

**Final recommended H1:**
Major Milestones in Bitcoin History

**Recommended slug:**
bitcoin-historical-milestones

**Status:**
PLANNED

**Production order:**
Phase 21.03: Bitcoin Ecosystem / Community

**Parent destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Ecosystem

**Learn subcategory:**
Community

**Subcategory anchor:**
#community on planned hub slug learn-bitcoin-ecosystem

**Primary learning path:**
Explore the Ecosystem

**Secondary learning paths:**
- Start With Bitcoin

**Depth level:**
Surface

**Content format:**
History

**Target reader:**
A general reader with no required prior Bitcoin knowledge.

**Reader search intent:**
Informational: understand the timeline, context, and significance of bitcoin historical milestones.

**Primary search phrase:**
bitcoin historical milestones

**Related search phrases:**
- historical milestones explained
- historical milestones bitcoin
- bitcoin history

**Supporting subject tags:**
- history
- milestones
- adoption

**Prerequisite guides:**
- MSC-GUIDE-003 | A History of Bitcoin

**Previous guide:**
MSC-GUIDE-078 | How Bitcoin Communities Form and Grow

**Next guide:**
MSC-GUIDE-080 | How Bitcoin Open-Source Projects Work

**Recommended branch guide:**
MSC-GUIDE-003 | A History of Bitcoin

**Return destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Recommended learning path continuation:**
MSC-GUIDE-065 | Who Builds on Bitcoin?

**Related category hub:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Related glossary terms:**
- Historical milestone
- Bitcoin history
- Adoption

**Potential related editorials:**
- Interview or community profile connected to Historical Milestones
- Weekly recap item that links a current event back to this guide

**Suggested card description:**
Historical Milestones: history, turning points, and lasting significance within Bitcoin.

**Suggested card action label:**
Explore the history

**Suggested article length:**
1,400 to 2,000 words

**Suggested reading time range:**
7 to 10 minutes

**Required research notes:**
Use primary historical records where possible. Explain why each milestone matters and flag disputed interpretations.

**Special accuracy concerns:**
Do not compress disputed events into a single heroic narrative.

**Internal link opportunities:**
- Parent hub: MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem
- Primary path: MSC-PATH-ECOSYSTEM | Explore the Ecosystem
- Prerequisite guides: MSC-GUIDE-003 | A History of Bitcoin
- Branch guide: MSC-GUIDE-003 | A History of Bitcoin

**Future content opportunities:**
- Frequently asked questions companion for Historical Milestones
- Deeper technical or historical companion focused on one major tradeoff involving Historical Milestones

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-ecosystem
- learn-category:bitcoin-ecosystem
- learn-subcategory:community
- path:explore-the-ecosystem
- path:start-with-bitcoin
- level:surface
- format:history
- subject:history
- subject:milestones
- subject:adoption

##### MSC-GUIDE-080: How Bitcoin Open-Source Projects Work

**Registry ID:**
MSC-GUIDE-080

**Page role:**
page-role:topic-guide

**Display label:**
Open-Source Projects

**Final recommended H1:**
How Bitcoin Open-Source Projects Work

**Recommended slug:**
bitcoin-open-source-projects

**Status:**
PLANNED

**Production order:**
Phase 21.04: Bitcoin Ecosystem / Community

**Parent destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Parent category:**
Learn

**Primary Learn category:**
Bitcoin Ecosystem

**Learn subcategory:**
Community

**Subcategory anchor:**
#community on planned hub slug learn-bitcoin-ecosystem

**Primary learning path:**
Explore the Ecosystem

**Secondary learning paths:**
- Build on Bitcoin

**Depth level:**
Shallow

**Content format:**
Ecosystem Overview

**Target reader:**
A reader who knows basic Bitcoin terms and wants a working explanation.

**Reader search intent:**
Informational and evaluative: understand how bitcoin open source projects fits into Bitcoin and how to assess incentives, claims, and risks.

**Primary search phrase:**
bitcoin open source projects

**Related search phrases:**
- open-source projects explained
- open-source projects bitcoin
- how bitcoin open-source projects work
- bitcoin open source

**Supporting subject tags:**
- open-source
- projects
- development

**Prerequisite guides:**
- MSC-GUIDE-065 | Who Builds on Bitcoin?
- MSC-GUIDE-066 | What Bitcoin Developers Do

**Previous guide:**
MSC-GUIDE-079 | Major Milestones in Bitcoin History

**Next guide:**
None. This is the final canonical topic guide.

**Recommended branch guide:**
MSC-GUIDE-066 | What Bitcoin Developers Do

**Return destination:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Recommended learning path continuation:**
Complete Explore the Ecosystem and return to the Learn homepage.

**Related category hub:**
MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

**Related glossary terms:**
- Open-Source project
- Open-Source
- Open-Source development

**Potential related editorials:**
- Interview or community profile connected to Open-Source Projects
- Weekly recap item that links a current event back to this guide

**Suggested card description:**
Open-Source Projects: role, incentives, risks, history, and relationship to Bitcoin.

**Suggested card action label:**
Explore the overview

**Suggested article length:**
1,700 to 2,400 words

**Suggested reading time range:**
9 to 13 minutes

**Required research notes:**
Use repository histories, governance documents, contribution guides, and maintainer statements. Avoid implying that all open-source projects share one governance model.

**Special accuracy concerns:**
Open-source visibility does not guarantee security, decentralization, or active maintenance.

**Internal link opportunities:**
- Parent hub: MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem
- Primary path: MSC-PATH-ECOSYSTEM | Explore the Ecosystem
- Prerequisite guides: MSC-GUIDE-065 | Who Builds on Bitcoin?; MSC-GUIDE-066 | What Bitcoin Developers Do
- Branch guide: MSC-GUIDE-066 | What Bitcoin Developers Do

**Future content opportunities:**
- Frequently asked questions companion for Open-Source Projects
- Deeper technical or historical companion focused on one major tradeoff involving Open-Source Projects

**Proposed Codex tags:**
- type:learn
- page-role:topic-guide
- parent-hub:bitcoin-ecosystem
- learn-category:bitcoin-ecosystem
- learn-subcategory:community
- path:explore-the-ecosystem
- path:build-on-bitcoin
- level:shallow
- format:ecosystem-overview
- subject:open-source
- subject:projects
- subject:development

## PART 6: FEATURED ROUTE RECORD

### MSC-ROUTE-001: How a Bitcoin Transaction Moves

**Registry ID:**
MSC-ROUTE-001

**Page role:**
page-role:featured-route

**Display label:**
How a Bitcoin Transaction Moves

**Final recommended H1:**
How a Bitcoin Transaction Moves

**Recommended slug:**
how-a-bitcoin-transaction-moves

**Status:**
PLANNED

**Production order:**
Phase 1.12: route architecture; write after Phase 9 and finalize before network path launch

**Parent destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Parent category:**
Learn

**Primary Learn category:**
The Bitcoin Network

**Learn subcategory:**
Network

**Subcategory anchor:**
#network on planned hub slug learn-bitcoin-network

**Primary learning path:**
Understand the Network

**Secondary learning paths:**
- Start With Bitcoin
- Use Bitcoin Safely

**Depth level:**
Shallow

**Content format:**
Walkthrough

**Target reader:**
A reader who understands wallets and basic transactions but wants one connected view from UTXO selection through settlement depth.

**Reader search intent:**
Practical informational: follow the complete lifecycle of a Bitcoin transaction from construction to confirmation.

**Primary search phrase:**
how a bitcoin transaction works

**Related search phrases:**
- bitcoin transaction lifecycle
- how bitcoin transactions move
- bitcoin transaction confirmation process
- utxo to confirmation

**Supporting subject tags:**
- transactions
- utxos
- fees
- mempool
- mining
- confirmations

**Prerequisite guides:**
- MSC-GUIDE-007 | How to Send and Receive Bitcoin
- MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- MSC-GUIDE-013 | What Are UTXOs in Bitcoin?

**Previous guide:**
MSC-GUIDE-013 | What Are UTXOs in Bitcoin?

**Next guide:**
MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?

**Recommended branch guide:**
MSC-GUIDE-021 | What Is a Bitcoin Full Node?

**Return destination:**
MSC-HUB-NETWORK | The Bitcoin Network

**Recommended learning path continuation:**
MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?

**Related category hub:**
MSC-HUB-NETWORK | The Bitcoin Network

**Related glossary terms:**
- Input
- Output
- Change output
- UTXO
- Fee rate
- Digital signature
- Mempool
- Confirmation

**Potential related editorials:**
- Breaking News or Weekly Recap explaining a period of fee pressure through the transaction lifecycle
- Wallet or node developer interview about transaction construction and relay

**Suggested card description:**
A connected route through transaction creation, signing, relay, mempool admission, mining, block inclusion, and settlement depth.

**Suggested card action label:**
Follow the transaction

**Suggested article length:**
2,200 to 3,200 words

**Suggested reading time range:**
12 to 18 minutes

**Required research notes:**
Use current Bitcoin Core transaction, mempool, relay, and validation documentation; relevant BIPs; and wallet-neutral examples. Verify policy details at draft time.

**Special accuracy concerns:**
Node mempools can differ. Fee selection does not guarantee timing. Confirmation depth is risk-based, and signing details vary by script type and wallet.

**Internal link opportunities:**
- MSC-GUIDE-007 | How to Send and Receive Bitcoin
- MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
- MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?
- MSC-GUIDE-026 | How Bitcoin Blocks Work
- MSC-GUIDE-014 | How Bitcoin Confirmations Work
- Future fee estimator and transaction explorer Tools pages after publication

**Future content opportunities:**
- Interactive transaction lifecycle diagram
- Advanced companion on transaction policy, replacement, package relay, and reorganization risk

**Proposed Codex tags:**
- type:learn
- page-role:featured-route
- parent-hub:bitcoin-network
- learn-category:bitcoin-network
- learn-subcategory:network
- path:understand-the-network
- path:start-with-bitcoin
- path:use-bitcoin-safely
- level:shallow
- format:walkthrough
- subject:transactions
- subject:utxos
- subject:fees
- subject:mempool
- subject:mining
- subject:confirmations

**Route steps:**
- Creating a transaction
- Selecting UTXOs
- Setting outputs
- Creating change
- Choosing a fee
- Signing
- Broadcasting
- Node validation
- Entering mempools
- Miner selection
- Block inclusion
- Confirmation
- Additional settlement depth

**Branching destinations:**
- Wallet and key security
- Mempool and fee mechanics
- Nodes and validation
- Mining and block construction
- Confirmations and reorganization risk

## PART 7: GLOSSARY INDEX RECORD

### MSC-GLOSSARY-001: Bitcoin Glossary

**Registry ID:**
MSC-GLOSSARY-001

**Page role:**
page-role:glossary-index

**Display label:**
Bitcoin Glossary

**Final recommended H1:**
Bitcoin Glossary

**Recommended slug:**
bitcoin-glossary

**Status:**
PLANNED

**Production order:**
Phase 1.13: glossary schema; populate with each approved guide and finalize after Phase 21

**Parent destination:**
MSC-LRN-HOME | Learn

**Parent category:**
Learn

**Primary Learn category:**
All five Learn categories

**Learn subcategory:**
Not applicable

**Subcategory anchor:**
Alphabetical letter anchors such as #a, #b, #c, maintained only when terms exist

**Primary learning path:**
Start With Bitcoin

**Secondary learning paths:**
- Use Bitcoin Safely
- Understand the Network
- Build on Bitcoin
- Explore the Ecosystem

**Depth level:**
Surface

**Content format:**
Glossary

**Target reader:**
Any reader who needs a concise definition before opening the canonical long-form guide.

**Reader search intent:**
Reference: find a concise Bitcoin definition and continue to the complete canonical guide.

**Primary search phrase:**
bitcoin glossary

**Related search phrases:**
- bitcoin terms explained
- bitcoin definitions
- bitcoin vocabulary
- bitcoin terminology

**Supporting subject tags:**
- bitcoin
- glossary
- education
- reference

**Prerequisite guides:**
- None

**Previous guide:**
MSC-ROUTE-001 | How a Bitcoin Transaction Moves

**Next guide:**
MSC-LRN-HOME | Learn

**Recommended branch guide:**
MSC-GUIDE-001 | What Is Bitcoin?

**Return destination:**
MSC-LRN-HOME | Learn

**Recommended learning path continuation:**
Open the canonical guide linked from the selected term, then continue its primary learning path.

**Related category hub:**
All five category hubs

**Related glossary terms:**
- Glossary

**Potential related editorials:**
- Editorials can link to glossary anchors for quick definitions when a full guide would interrupt reading flow
- Glossary terms can surface related interviews and Highlights only after canonical guide links

**Suggested card description:**
Concise Bitcoin definitions that point readers to canonical long-form guides without creating duplicate glossary articles.

**Suggested card action label:**
Open the glossary

**Suggested article length:**
Initial 141-term index with definitions of roughly 20 to 45 words each; expand by editorial need

**Suggested reading time range:**
Reference use rather than linear reading

**Required research notes:**
Review each definition against the canonical guide's approved terminology. Date and verify terms whose status can change, especially proposals and experimental protocols.

**Special accuracy concerns:**
A glossary definition must not overstate protocol status, imply endorsement, or become a separate long-form article. One canonical guide remains authoritative.

**Internal link opportunities:**
- Canonical guide for every term when one exists
- Category hubs
- Learning paths
- Featured route
- Explore articles needing concise definitions

**Future content opportunities:**
- Search and alphabetical filtering
- Related-term clusters
- Glossary term suggestions generated from real site search data and editorial usage

**Proposed Codex tags:**
- type:learn
- page-role:glossary-index
- format:glossary

**Initial glossary term map:**
| term | concise definition | canonical guide |
|---|---|---|
| Address | A destination representation used by wallets to construct a Bitcoin locking script. | MSC-GUIDE-007 \| How to Send and Receive Bitcoin |
| Adoption | The process by which people, businesses, institutions, or communities begin holding or using bitcoin for practical purposes. | MSC-HUB-ECOSYSTEM \| Bitcoin Ecosystem |
| API | An interface that lets software request data or actions from another service or application. | MSC-GUIDE-043 \| Bitcoin APIs Explained |
| Ark | An off-chain Bitcoin protocol that organizes shared UTXO structures and operator-coordinated transactions. | MSC-GUIDE-034 \| What Is Ark on Bitcoin? |
| Artist | A creator whose work, medium, distribution, or collecting model has a meaningful relationship with Bitcoin. | MSC-GUIDE-067 \| Bitcoin Artists and the Culture They Shape |
| ASIC miner | Specialized hardware designed to perform Bitcoin proof-of-work hashing efficiently. | MSC-GUIDE-019 \| What Is an ASIC Miner? |
| Best practice | A generally recommended method that reduces avoidable risk while remaining appropriate to the user, tool, and threat model. | MSC-GUIDE-016 \| Bitcoin Best Practices for Safe Everyday Use |
| BIP | A Bitcoin Improvement Proposal that documents a proposed standard, process, or protocol change. | MSC-GUIDE-053 \| How Bitcoin Improvement Proposals Work |
| Bitcoin | An open monetary network and asset governed by independently verified consensus rules. | MSC-GUIDE-001 \| What Is Bitcoin? |
| Bitcoin art | Creative work that uses Bitcoin as subject matter, infrastructure, medium, provenance layer, or cultural context. | MSC-GUIDE-067 \| Bitcoin Artists and the Culture They Shape |
| Bitcoin company | A business whose products, services, treasury activity, or operations depend materially on Bitcoin. | MSC-HUB-ECOSYSTEM \| Bitcoin Ecosystem |
| Bitcoin contract | A spending arrangement enforced through Bitcoin transaction structure, signatures, timelocks, hashes, and Script conditions. | MSC-GUIDE-054 \| How Bitcoin Script Works |
| Bitcoin Core | The most widely used open-source Bitcoin node and wallet software implementation. | MSC-GUIDE-049 \| What Is Bitcoin Core? |
| Bitcoin culture | The shared ideas, practices, debates, art, communities, and norms that develop around Bitcoin. | MSC-GUIDE-078 \| How Bitcoin Communities Form and Grow |
| Bitcoin ecosystem | The people, projects, companies, markets, communities, and infrastructure that build on or operate around Bitcoin. | MSC-HUB-ECOSYSTEM \| Bitcoin Ecosystem |
| Bitcoin history | The documented development of Bitcoin from its prehistory and launch through later technical, economic, and cultural milestones. | MSC-GUIDE-003 \| A History of Bitcoin |
| Bitcoin Knots | A maintained Bitcoin node software implementation with policy and feature differences from Bitcoin Core. | MSC-GUIDE-050 \| What Is Bitcoin Knots? |
| Bitcoin network | The peer-to-peer system of nodes, miners, transactions, and consensus rules that operates Bitcoin. | MSC-HUB-NETWORK \| The Bitcoin Network |
| Bitcoin privacy | The degree to which transaction activity, ownership relationships, and user identity can remain difficult to observe or connect. | MSC-GUIDE-012 \| How Bitcoin Privacy Works |
| Bitcoin Script | Bitcoin's stack-based scripting system for defining and satisfying transaction spending conditions. | MSC-GUIDE-054 \| How Bitcoin Script Works |
| Bitcoin security | The practices and system properties used to protect keys, funds, software, devices, and network validation. | MSC-GUIDE-011 \| How to Keep Bitcoin Secure |
| Bitcoin's purpose | The monetary and technical goals Bitcoin is designed to serve, including scarce digital ownership without a central issuer. | MSC-GUIDE-002 \| Why Does Bitcoin Matter? |
| BitVM | A family of designs for verifying complex off-chain computation through Bitcoin-based challenge mechanisms. | MSC-GUIDE-045 \| What Is BitVM? |
| Block | A valid batch of Bitcoin transactions linked to prior chain history through proof of work. | MSC-GUIDE-026 \| How Bitcoin Blocks Work |
| Block subsidy | New bitcoin created under the issuance schedule and paid through a block's coinbase transaction. | MSC-GUIDE-015 \| What Is the Bitcoin Halving? |
| Blockchain | The ordered history of valid Bitcoin blocks selected by accumulated proof of work. | MSC-GUIDE-027 \| How the Bitcoin Blockchain Works |
| BRC-20 | An experimental fungible-token convention interpreted from inscription data by off-chain indexers. | MSC-GUIDE-039 \| What Is BRC-20 on Bitcoin? |
| Bridge | A mechanism that transfers, locks, represents, or verifies value or state between separate systems under defined trust assumptions. | MSC-GUIDE-036 \| Bitcoin Sidechains Explained |
| Builder | A person or team creating products, infrastructure, media, communities, or services that contribute to the Bitcoin ecosystem. | MSC-GUIDE-065 \| Who Builds on Bitcoin? |
| Change output | A transaction output that returns unspent input value to a wallet-controlled destination. | MSC-ROUTE-001 \| How a Bitcoin Transaction Moves |
| Client-side validation | A model in which users verify relevant state locally rather than relying on global on-chain execution. | MSC-GUIDE-035 \| How RGB Works on Bitcoin |
| Coin control | Wallet functionality that lets a user choose which UTXOs fund a transaction. | MSC-GUIDE-013 \| What Are UTXOs in Bitcoin? |
| Cold storage | A custody setup intended to keep signing keys away from internet-connected systems. | MSC-GUIDE-011 \| How to Keep Bitcoin Secure |
| Collecting | The practice of acquiring, organizing, preserving, and evaluating objects or digital artifacts for cultural, historical, or personal value. | MSC-GUIDE-075 \| How Bitcoin Marketplaces Work |
| Community | A group connected by shared Bitcoin interests, practices, geography, projects, or educational goals. | MSC-GUIDE-078 \| How Bitcoin Communities Form and Grow |
| Conference | An organized gathering for Bitcoin education, technical discussion, business, culture, networking, or community activity. | MSC-GUIDE-077 \| Why Bitcoin Conferences Matter |
| Confirmation | The inclusion of a transaction in a block, followed by additional blocks that increase settlement depth. | MSC-GUIDE-014 \| How Bitcoin Confirmations Work |
| Consensus | The shared validation rules independently enforced by Bitcoin nodes. | MSC-GUIDE-030 \| How Bitcoin Reaches Consensus |
| Covenant | A proposed or implemented spending condition that restricts how bitcoin can be spent in the future. | MSC-GUIDE-047 \| What Is OP_CAT? |
| Cryptography | The mathematical methods used to protect information, prove authorization, and support integrity in Bitcoin. | MSC-GUIDE-058 \| How Digital Signatures Work in Bitcoin |
| Custody | Control over the keys or authorization needed to move bitcoin. | MSC-GUIDE-006 \| What Is Bitcoin Self-Custody? |
| Developer | A contributor who designs, writes, reviews, tests, or maintains software used within the Bitcoin ecosystem. | MSC-GUIDE-066 \| What Bitcoin Developers Do |
| Developer tool | Software, documentation, library, interface, or workflow that helps developers build, test, inspect, or operate Bitcoin applications. | MSC-GUIDE-041 \| Bitcoin Developer Tools: A Practical Overview |
| Development environment | A configured set of software, dependencies, networks, and tools used to write and test Bitcoin-related code. | MSC-GUIDE-062 \| How to Set Up a Bitcoin Development Environment |
| Difficulty | The proof-of-work threshold that determines how hard it is to produce a valid block hash. | MSC-GUIDE-020 \| How Bitcoin's Difficulty Adjustment Works |
| Difficulty adjustment | Bitcoin's periodic recalculation of mining difficulty based on prior block timing. | MSC-GUIDE-020 \| How Bitcoin's Difficulty Adjustment Works |
| Digital asset | A digitally represented item, claim, or unit whose ownership or state is tracked through software and defined rules. | MSC-GUIDE-037 \| What Are Bitcoin Ordinals? |
| Digital signature | Cryptographic proof that a valid private key authorized a transaction or message. | MSC-GUIDE-058 \| How Digital Signatures Work in Bitcoin |
| DLC | A Discreet Log Contract that makes a Bitcoin payout depend on an oracle-attested outcome. | MSC-GUIDE-046 \| How Discreet Log Contracts Work |
| Education | The process of building accurate Bitcoin knowledge through explanation, practice, documentation, discussion, and critical evaluation. | MSC-GUIDE-078 \| How Bitcoin Communities Form and Grow |
| Emerging protocol | A developing Bitcoin-related protocol whose design, implementation, adoption, or security assumptions are still evolving. | MSC-GUIDE-048 \| Emerging Protocols on Bitcoin: How to Evaluate Them |
| Energy use | The amount and source of energy consumed by Bitcoin mining and its supporting operations. | MSC-GUIDE-017 \| How Bitcoin Mining Works |
| Exchange | A service or venue that matches buyers and sellers and may custody assets or funds. | MSC-GUIDE-073 \| How Bitcoin Exchanges Work |
| Federation | A defined group entrusted with specific operational or custody functions in some Bitcoin-adjacent systems. | MSC-GUIDE-036 \| Bitcoin Sidechains Explained |
| Fee rate | The amount paid per unit of transaction weight or virtual size to compete for block space. | MSC-GUIDE-008 \| How Bitcoin Transactions and Fees Work |
| Full node | Software that independently verifies Bitcoin blocks and transactions against consensus rules. | MSC-GUIDE-021 \| What Is a Bitcoin Full Node? |
| Glossary | An index of concise preferred definitions that links readers to canonical long-form MSC Learn destinations. | MSC-GLOSSARY-001 \| Bitcoin Glossary |
| Halving | The scheduled reduction in Bitcoin's block subsidy after each 210,000-block interval. | MSC-GUIDE-015 \| What Is the Bitcoin Halving? |
| Hard fork | A consensus rule change that can make previously invalid blocks valid and requires broad compatibility planning. | MSC-GUIDE-032 \| How Bitcoin Network Upgrades Happen |
| Hash function | A deterministic function that maps data to a fixed-size output with security properties used throughout Bitcoin. | MSC-GUIDE-059 \| How Hash Functions Work in Bitcoin |
| Hashrate | An estimate of the total proof-of-work computation being applied to Bitcoin mining. | MSC-GUIDE-028 \| What Is Bitcoin Hashrate? |
| Historical milestone | An event or development that materially changed Bitcoin's technology, adoption, markets, institutions, or culture. | MSC-GUIDE-079 \| Major Milestones in Bitcoin History |
| Hot wallet | A wallet whose signing environment is connected to an online device or service. | MSC-GUIDE-005 \| What Is a Bitcoin Wallet? |
| Indexed data | Structured data derived from scanning and organizing Bitcoin transactions, blocks, inscriptions, or protocol-specific state. | MSC-GUIDE-044 \| How Bitcoin Indexers Work |
| Indexer | Software that organizes Bitcoin-derived data into queryable views not provided directly by consensus validation. | MSC-GUIDE-044 \| How Bitcoin Indexers Work |
| Industry leader | A person with notable influence or responsibility in a Bitcoin company, project, institution, or technical community. | MSC-GUIDE-068 \| How Bitcoin Industry Leaders Shape the Ecosystem |
| Infrastructure | The software, hardware, services, and operational systems that allow Bitcoin applications and organizations to function reliably. | MSC-GUIDE-064 \| How to Run Reliable Bitcoin Infrastructure |
| Infrastructure company | A company that provides software, hardware, data, connectivity, custody, payments, or operational systems used by Bitcoin participants. | MSC-GUIDE-072 \| What Bitcoin Infrastructure Companies Do |
| Input | A transaction field that spends a previous UTXO and supplies unlocking data. | MSC-ROUTE-001 \| How a Bitcoin Transaction Moves |
| Inscription | Data associated with an ordinal sat through the ord protocol and interpreted by supporting software. | MSC-GUIDE-040 \| What Is a Bitcoin Inscription? |
| Layer 2 | A system built above Bitcoin that changes transaction flow or settlement while relying on Bitcoin in a defined way. | MSC-GUIDE-033 \| How the Lightning Network Works |
| Lightning Network | A payment-channel network that routes off-chain Bitcoin payments and settles channels on-chain. | MSC-GUIDE-033 \| How the Lightning Network Works |
| Market structure | The participants, venues, rules, custody arrangements, liquidity, and incentives that shape how bitcoin is traded and accessed. | MSC-GUIDE-073 \| How Bitcoin Exchanges Work |
| Marketplace | A venue or service that helps participants discover, list, buy, sell, or transfer goods or digital assets. | MSC-GUIDE-075 \| How Bitcoin Marketplaces Work |
| Mempool | A node's local collection of valid unconfirmed transactions eligible for relay or block inclusion. | MSC-GUIDE-025 \| What Happens Inside the Bitcoin Mempool? |
| Merkle root | A compact commitment to the transaction set inside a Bitcoin block. | MSC-GUIDE-060 \| How Merkle Trees Work in Bitcoin |
| Merkle tree | A hash tree used to commit to and prove inclusion of block transactions. | MSC-GUIDE-060 \| How Merkle Trees Work in Bitcoin |
| Miner | An operator that constructs candidate blocks and performs proof of work. | MSC-GUIDE-017 \| How Bitcoin Mining Works |
| Mining | The proof-of-work process that orders valid transactions into blocks and competes to extend the Bitcoin chain. | MSC-GUIDE-017 \| How Bitcoin Mining Works |
| Mining company | A business that operates mining hardware, energy infrastructure, pools, hosting, financing, or related services. | MSC-GUIDE-071 \| How Bitcoin Mining Companies Operate |
| Mining pool | A coordination system that combines miners' work and distributes rewards under a payout method. | MSC-GUIDE-018 \| How Bitcoin Mining Pools Work |
| Multisig | A spending condition requiring a defined threshold of multiple keys to authorize a transaction. | MSC-GUIDE-011 \| How to Keep Bitcoin Secure |
| Network upgrade | A coordinated change to Bitcoin software or rules that may affect policy, interoperability, features, or consensus behavior. | MSC-GUIDE-032 \| How Bitcoin Network Upgrades Happen |
| Node | Bitcoin software that communicates with peers and may validate, relay, store, or serve network data. | MSC-GUIDE-021 \| What Is a Bitcoin Full Node? |
| Node software | Software that connects to Bitcoin peers and may validate, relay, store, or serve network data according to its configuration. | MSC-GUIDE-024 \| Bitcoin Node Software Explained |
| OP_CAT | A proposed tapscript opcode that would concatenate stack elements if activated through consensus change. | MSC-GUIDE-047 \| What Is OP_CAT? |
| Open-Source | A development model in which source code is available under a license that permits inspection, use, modification, and redistribution. | MSC-GUIDE-080 \| How Bitcoin Open-Source Projects Work |
| Open-Source development | The public process of proposing, reviewing, testing, maintaining, and distributing software whose source code can be inspected and modified. | MSC-GUIDE-080 \| How Bitcoin Open-Source Projects Work |
| Open-Source project | A software project developed under an open-source license with publicly inspectable code and defined contribution practices. | MSC-GUIDE-080 \| How Bitcoin Open-Source Projects Work |
| Operations | The recurring technical and organizational work required to keep Bitcoin infrastructure secure, available, monitored, and maintained. | MSC-GUIDE-064 \| How to Run Reliable Bitcoin Infrastructure |
| Oracle | A source that attests to external information used by contracts such as DLCs. | MSC-GUIDE-046 \| How Discreet Log Contracts Work |
| Ordinals | A numbering and tracking convention for individual satoshis, commonly used with inscriptions. | MSC-GUIDE-037 \| What Are Bitcoin Ordinals? |
| Output | A transaction field that assigns value to a new locking condition. | MSC-ROUTE-001 \| How a Bitcoin Transaction Moves |
| Payment | A transfer of value from a payer to a recipient using an agreed settlement method. | MSC-GUIDE-007 \| How to Send and Receive Bitcoin |
| Payment channel | An off-chain relationship that lets parties update balances before final settlement on Bitcoin. | MSC-GUIDE-033 \| How the Lightning Network Works |
| Policy | Local software rules that influence transaction relay, mempool acceptance, or default behavior without changing consensus validity. | MSC-GUIDE-024 \| Bitcoin Node Software Explained |
| Private key | Secret cryptographic material used to authorize spending. | MSC-GUIDE-010 \| How Bitcoin Public and Private Keys Work |
| Proof of work | The computational process miners use to produce block hashes below the network target. | MSC-GUIDE-029 \| How Bitcoin Proof of Work Secures the Network |
| Protocol | A defined set of rules and message formats that allows independent participants or software systems to interact consistently. | MSC-GUIDE-030 \| How Bitcoin Reaches Consensus |
| Protocol experiment | A proposed or developing protocol design used to test new functionality, tradeoffs, or coordination models around Bitcoin. | MSC-GUIDE-048 \| Emerging Protocols on Bitcoin: How to Evaluate Them |
| Pruned node | A fully validating node configured to discard older block data after verification. | MSC-GUIDE-022 \| What Is a Pruned Bitcoin Node? |
| Pruning | A node storage mode that removes older block data after validation while retaining the information needed to continue validating the chain. | MSC-GUIDE-022 \| What Is a Pruned Bitcoin Node? |
| Public company | A company whose ownership shares trade on a public market and whose disclosures are subject to applicable reporting rules. | MSC-GUIDE-069 \| How Public Companies Participate in Bitcoin |
| Public key | Cryptographic data derived from a private key and used in Bitcoin spending conditions and signatures. | MSC-GUIDE-010 \| How Bitcoin Public and Private Keys Work |
| Regtest | A private local Bitcoin network mode used for fast controlled development and testing. | MSC-GUIDE-062 \| How to Set Up a Bitcoin Development Environment |
| Regulation | Government rules and enforcement frameworks that affect Bitcoin businesses, markets, users, reporting, custody, or payments. | MSC-GUIDE-073 \| How Bitcoin Exchanges Work |
| Reorganization | A change in the selected chain tip when a competing valid chain accumulates more proof of work. | MSC-GUIDE-027 \| How the Bitcoin Blockchain Works |
| RGB | A client-side validated smart-contract and asset system anchored to Bitcoin transactions. | MSC-GUIDE-035 \| How RGB Works on Bitcoin |
| RPC | A command and data interface used to control or query Bitcoin software such as Bitcoin Core. | MSC-GUIDE-061 \| How Bitcoin RPC Works |
| Runes | A Bitcoin token protocol that encodes state transitions in transactions and relies on compatible indexers. | MSC-GUIDE-038 \| How the Runes Protocol Works |
| Satoshi | The smallest standard unit of bitcoin, equal to one hundred millionth of one bitcoin. | MSC-GUIDE-001 \| What Is Bitcoin? |
| Satoshi Nakamoto | The pseudonymous creator or group that published Bitcoin and released its first software. | MSC-GUIDE-004 \| Who Was Satoshi Nakamoto? |
| Scaling | Efforts to increase transaction capacity, efficiency, or functionality while managing security, decentralization, and trust tradeoffs. | MSC-GUIDE-036 \| Bitcoin Sidechains Explained |
| Scarcity | A condition in which the available supply of something is limited relative to possible demand. | MSC-GUIDE-002 \| Why Does Bitcoin Matter? |
| Schnorr signature | The signature scheme specified for Taproot key-path and tapscript use in Bitcoin. | MSC-GUIDE-057 \| How Schnorr Signatures Work in Bitcoin |
| Seed phrase | A human-readable backup representation used by many wallets to derive keys under a wallet standard. | MSC-GUIDE-009 \| What Is a Bitcoin Seed Phrase? |
| SegWit | A protocol upgrade that separated witness data, addressed transaction malleability, and introduced block weight. | MSC-GUIDE-056 \| How SegWit Changed Bitcoin |
| Self-Custody | Direct control of the keys needed to spend bitcoin. | MSC-GUIDE-006 \| What Is Bitcoin Self-Custody? |
| Service provider | A business or organization that supplies a specialized Bitcoin-related service to users, companies, or other infrastructure operators. | MSC-GUIDE-076 \| What Bitcoin Service Providers Do |
| Sidechain | A separate blockchain connected to bitcoin through a defined peg and security model. | MSC-GUIDE-036 \| Bitcoin Sidechains Explained |
| Signet | A controlled public Bitcoin test network whose blocks are authorized by a signing challenge. | MSC-GUIDE-062 \| How to Set Up a Bitcoin Development Environment |
| Soft fork | A consensus change that makes previously valid behavior invalid under new rules. | MSC-GUIDE-031 \| How Bitcoin Soft Forks Work |
| Software release | A versioned distribution of software accompanied by code changes, review, testing, documentation, and release information. | MSC-GUIDE-052 \| How Bitcoin Core Releases Work |
| Source code | Human-readable instructions and definitions used to build software. | MSC-GUIDE-051 \| How to Read the Bitcoin Source Code |
| Standardness | Node policy rules used for transaction relay and mining defaults that are separate from consensus validity. | MSC-GUIDE-024 \| Bitcoin Node Software Explained |
| Startup | A developing company designed to test and grow a new product, service, or business model under significant uncertainty. | MSC-GUIDE-070 \| How Bitcoin Startups Build and Compete |
| Taproot | A Bitcoin upgrade combining Schnorr signatures, Taproot outputs, and Tapscript capabilities. | MSC-GUIDE-055 \| How Taproot Changed Bitcoin |
| Testing | The structured process of checking software behavior, correctness, compatibility, security assumptions, and failure conditions. | MSC-GUIDE-063 \| How Bitcoin Software Is Tested |
| Testnet | A public testing network that uses valueless test coins and distinct consensus parameters. | MSC-GUIDE-062 \| How to Set Up a Bitcoin Development Environment |
| Threat model | A defined view of the assets, adversaries, capabilities, failure modes, and assumptions relevant to a security decision. | MSC-GUIDE-011 \| How to Keep Bitcoin Secure |
| Token protocol | A set of rules for creating, transferring, and interpreting token-like state using Bitcoin transactions and compatible software. | MSC-GUIDE-038 \| How the Runes Protocol Works |
| Transaction | A data structure that spends existing UTXOs and creates new outputs. | MSC-GUIDE-008 \| How Bitcoin Transactions and Fees Work |
| Transaction relay | The peer-to-peer propagation of transactions between nodes under local policy rules. | MSC-GUIDE-025 \| What Happens Inside the Bitcoin Mempool? |
| UTXO | An unspent transaction output that can be used as an input in a later transaction. | MSC-GUIDE-013 \| What Are UTXOs in Bitcoin? |
| Validation | The process of checking transactions and blocks against applicable rules. | MSC-GUIDE-021 \| What Is a Bitcoin Full Node? |
| Verification game | An interactive dispute process designed to narrow a contested computation and identify an invalid step. | MSC-GUIDE-045 \| What Is BitVM? |
| VTXO | A virtual transaction output used in Ark-style off-chain constructions. | MSC-GUIDE-034 \| What Is Ark on Bitcoin? |
| Wallet | Software or hardware that manages keys, constructs transactions, and helps users interact with Bitcoin. | MSC-GUIDE-005 \| What Is a Bitcoin Wallet? |
| Wallet integration | The technical work required for a wallet to support a network feature, protocol, service, transaction type, or external interface. | MSC-GUIDE-042 \| How Bitcoin Wallet Integrations Work |
| Wallet provider | A company or project that develops, distributes, or operates wallet software or related wallet services. | MSC-GUIDE-074 \| How Bitcoin Wallet Providers Operate |
| Witness | Transaction data used to satisfy a spending condition under SegWit rules. | MSC-GUIDE-056 \| How SegWit Changed Bitcoin |

**Glossary expansion rules:**
- Add a term when it appears across multiple guides or editorials and a concise definition materially helps readers.
- Link to an existing canonical guide whenever one exists.
- Do not create a separate 1,000-word glossary article.
- Use one preferred term and record common aliases inside the definition.
- Verify proposal status and software terminology at every substantive update.
- Create a new topic guide only when reader demand and subject depth justify a canonical long-form destination.
- Every Related glossary terms value must match one preferred term in the initial glossary term map.
- Use Self-Custody as the preferred reader-facing capitalization.
- Use Open-Source as the preferred glossary label, and use open-source as the adjective in prose.

**Definition recommendation:**
Use 20 to 45 words, define one concept, avoid circular language, state important limits, and link the term to its canonical guide.

## PART 8: NAVIGATION MAP

### Category order

1. MSC-HUB-BASICS | Bitcoin Basics
2. MSC-HUB-NETWORK | The Bitcoin Network
3. MSC-HUB-BUILDING | Building on Bitcoin
4. MSC-HUB-DEVELOPMENT | Bitcoin Development
5. MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

### Subcategory anchors

#### Bitcoin Basics

- Foundations: planned handle `learn-bitcoin-basics#foundations`
- Using Bitcoin: planned handle `learn-bitcoin-basics#using-bitcoin`
- Security: planned handle `learn-bitcoin-basics#security`
- Essentials: planned handle `learn-bitcoin-basics#essentials`

#### The Bitcoin Network

- Mining: planned handle `learn-bitcoin-network#mining`
- Nodes: planned handle `learn-bitcoin-network#nodes`
- Network: planned handle `learn-bitcoin-network#network`
- Consensus: planned handle `learn-bitcoin-network#consensus`

#### Building on Bitcoin

- Layer 2: planned handle `learn-building-on-bitcoin#layer-2`
- Digital Assets: planned handle `learn-building-on-bitcoin#digital-assets`
- Development: planned handle `learn-building-on-bitcoin#development`
- Innovation: planned handle `learn-building-on-bitcoin#innovation`

#### Bitcoin Development

- Bitcoin Core: planned handle `learn-bitcoin-development#bitcoin-core`
- Protocols: planned handle `learn-bitcoin-development#protocols`
- Cryptography: planned handle `learn-bitcoin-development#cryptography`
- Infrastructure: planned handle `learn-bitcoin-development#infrastructure`

#### Bitcoin Ecosystem

- People: planned handle `learn-bitcoin-ecosystem#people`
- Companies: planned handle `learn-bitcoin-ecosystem#companies`
- Markets: planned handle `learn-bitcoin-ecosystem#markets`
- Community: planned handle `learn-bitcoin-ecosystem#community`

### Canonical previous and next guide order

- MSC-GUIDE-001 | What Is Bitcoin? | Previous: None | Next: MSC-GUIDE-002 | Why Does Bitcoin Matter?
- MSC-GUIDE-002 | Why Does Bitcoin Matter? | Previous: MSC-GUIDE-001 | What Is Bitcoin? | Next: MSC-GUIDE-003 | A History of Bitcoin
- MSC-GUIDE-003 | A History of Bitcoin | Previous: MSC-GUIDE-002 | Why Does Bitcoin Matter? | Next: MSC-GUIDE-004 | Who Was Satoshi Nakamoto?
- MSC-GUIDE-004 | Who Was Satoshi Nakamoto? | Previous: MSC-GUIDE-003 | A History of Bitcoin | Next: MSC-GUIDE-005 | What Is a Bitcoin Wallet?
- MSC-GUIDE-005 | What Is a Bitcoin Wallet? | Previous: MSC-GUIDE-004 | Who Was Satoshi Nakamoto? | Next: MSC-GUIDE-006 | What Is Bitcoin Self-Custody?
- MSC-GUIDE-006 | What Is Bitcoin Self-Custody? | Previous: MSC-GUIDE-005 | What Is a Bitcoin Wallet? | Next: MSC-GUIDE-007 | How to Send and Receive Bitcoin
- MSC-GUIDE-007 | How to Send and Receive Bitcoin | Previous: MSC-GUIDE-006 | What Is Bitcoin Self-Custody? | Next: MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
- MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work | Previous: MSC-GUIDE-007 | How to Send and Receive Bitcoin | Next: MSC-GUIDE-009 | What Is a Bitcoin Seed Phrase?
- MSC-GUIDE-009 | What Is a Bitcoin Seed Phrase? | Previous: MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work | Next: MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work
- MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work | Previous: MSC-GUIDE-009 | What Is a Bitcoin Seed Phrase? | Next: MSC-GUIDE-011 | How to Keep Bitcoin Secure
- MSC-GUIDE-011 | How to Keep Bitcoin Secure | Previous: MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work | Next: MSC-GUIDE-012 | How Bitcoin Privacy Works
- MSC-GUIDE-012 | How Bitcoin Privacy Works | Previous: MSC-GUIDE-011 | How to Keep Bitcoin Secure | Next: MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
- MSC-GUIDE-013 | What Are UTXOs in Bitcoin? | Previous: MSC-GUIDE-012 | How Bitcoin Privacy Works | Next: MSC-GUIDE-014 | How Bitcoin Confirmations Work
- MSC-GUIDE-014 | How Bitcoin Confirmations Work | Previous: MSC-GUIDE-013 | What Are UTXOs in Bitcoin? | Next: MSC-GUIDE-015 | What Is the Bitcoin Halving?
- MSC-GUIDE-015 | What Is the Bitcoin Halving? | Previous: MSC-GUIDE-014 | How Bitcoin Confirmations Work | Next: MSC-GUIDE-016 | Bitcoin Best Practices for Safe Everyday Use
- MSC-GUIDE-016 | Bitcoin Best Practices for Safe Everyday Use | Previous: MSC-GUIDE-015 | What Is the Bitcoin Halving? | Next: MSC-GUIDE-017 | How Bitcoin Mining Works
- MSC-GUIDE-017 | How Bitcoin Mining Works | Previous: MSC-GUIDE-016 | Bitcoin Best Practices for Safe Everyday Use | Next: MSC-GUIDE-018 | How Bitcoin Mining Pools Work
- MSC-GUIDE-018 | How Bitcoin Mining Pools Work | Previous: MSC-GUIDE-017 | How Bitcoin Mining Works | Next: MSC-GUIDE-019 | What Is an ASIC Miner?
- MSC-GUIDE-019 | What Is an ASIC Miner? | Previous: MSC-GUIDE-018 | How Bitcoin Mining Pools Work | Next: MSC-GUIDE-020 | How Bitcoin's Difficulty Adjustment Works
- MSC-GUIDE-020 | How Bitcoin's Difficulty Adjustment Works | Previous: MSC-GUIDE-019 | What Is an ASIC Miner? | Next: MSC-GUIDE-021 | What Is a Bitcoin Full Node?
- MSC-GUIDE-021 | What Is a Bitcoin Full Node? | Previous: MSC-GUIDE-020 | How Bitcoin's Difficulty Adjustment Works | Next: MSC-GUIDE-022 | What Is a Pruned Bitcoin Node?
- MSC-GUIDE-022 | What Is a Pruned Bitcoin Node? | Previous: MSC-GUIDE-021 | What Is a Bitcoin Full Node? | Next: MSC-GUIDE-023 | How to Run a Bitcoin Node
- MSC-GUIDE-023 | How to Run a Bitcoin Node | Previous: MSC-GUIDE-022 | What Is a Pruned Bitcoin Node? | Next: MSC-GUIDE-024 | Bitcoin Node Software Explained
- MSC-GUIDE-024 | Bitcoin Node Software Explained | Previous: MSC-GUIDE-023 | How to Run a Bitcoin Node | Next: MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?
- MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool? | Previous: MSC-GUIDE-024 | Bitcoin Node Software Explained | Next: MSC-GUIDE-026 | How Bitcoin Blocks Work
- MSC-GUIDE-026 | How Bitcoin Blocks Work | Previous: MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool? | Next: MSC-GUIDE-027 | How the Bitcoin Blockchain Works
- MSC-GUIDE-027 | How the Bitcoin Blockchain Works | Previous: MSC-GUIDE-026 | How Bitcoin Blocks Work | Next: MSC-GUIDE-028 | What Is Bitcoin Hashrate?
- MSC-GUIDE-028 | What Is Bitcoin Hashrate? | Previous: MSC-GUIDE-027 | How the Bitcoin Blockchain Works | Next: MSC-GUIDE-029 | How Bitcoin Proof of Work Secures the Network
- MSC-GUIDE-029 | How Bitcoin Proof of Work Secures the Network | Previous: MSC-GUIDE-028 | What Is Bitcoin Hashrate? | Next: MSC-GUIDE-030 | How Bitcoin Reaches Consensus
- MSC-GUIDE-030 | How Bitcoin Reaches Consensus | Previous: MSC-GUIDE-029 | How Bitcoin Proof of Work Secures the Network | Next: MSC-GUIDE-031 | How Bitcoin Soft Forks Work
- MSC-GUIDE-031 | How Bitcoin Soft Forks Work | Previous: MSC-GUIDE-030 | How Bitcoin Reaches Consensus | Next: MSC-GUIDE-032 | How Bitcoin Network Upgrades Happen
- MSC-GUIDE-032 | How Bitcoin Network Upgrades Happen | Previous: MSC-GUIDE-031 | How Bitcoin Soft Forks Work | Next: MSC-GUIDE-033 | How the Lightning Network Works
- MSC-GUIDE-033 | How the Lightning Network Works | Previous: MSC-GUIDE-032 | How Bitcoin Network Upgrades Happen | Next: MSC-GUIDE-034 | What Is Ark on Bitcoin?
- MSC-GUIDE-034 | What Is Ark on Bitcoin? | Previous: MSC-GUIDE-033 | How the Lightning Network Works | Next: MSC-GUIDE-035 | How RGB Works on Bitcoin
- MSC-GUIDE-035 | How RGB Works on Bitcoin | Previous: MSC-GUIDE-034 | What Is Ark on Bitcoin? | Next: MSC-GUIDE-036 | Bitcoin Sidechains Explained
- MSC-GUIDE-036 | Bitcoin Sidechains Explained | Previous: MSC-GUIDE-035 | How RGB Works on Bitcoin | Next: MSC-GUIDE-037 | What Are Bitcoin Ordinals?
- MSC-GUIDE-037 | What Are Bitcoin Ordinals? | Previous: MSC-GUIDE-036 | Bitcoin Sidechains Explained | Next: MSC-GUIDE-038 | How the Runes Protocol Works
- MSC-GUIDE-038 | How the Runes Protocol Works | Previous: MSC-GUIDE-037 | What Are Bitcoin Ordinals? | Next: MSC-GUIDE-039 | What Is BRC-20 on Bitcoin?
- MSC-GUIDE-039 | What Is BRC-20 on Bitcoin? | Previous: MSC-GUIDE-038 | How the Runes Protocol Works | Next: MSC-GUIDE-040 | What Is a Bitcoin Inscription?
- MSC-GUIDE-040 | What Is a Bitcoin Inscription? | Previous: MSC-GUIDE-039 | What Is BRC-20 on Bitcoin? | Next: MSC-GUIDE-041 | Bitcoin Developer Tools: A Practical Overview
- MSC-GUIDE-041 | Bitcoin Developer Tools: A Practical Overview | Previous: MSC-GUIDE-040 | What Is a Bitcoin Inscription? | Next: MSC-GUIDE-042 | How Bitcoin Wallet Integrations Work
- MSC-GUIDE-042 | How Bitcoin Wallet Integrations Work | Previous: MSC-GUIDE-041 | Bitcoin Developer Tools: A Practical Overview | Next: MSC-GUIDE-043 | Bitcoin APIs Explained
- MSC-GUIDE-043 | Bitcoin APIs Explained | Previous: MSC-GUIDE-042 | How Bitcoin Wallet Integrations Work | Next: MSC-GUIDE-044 | How Bitcoin Indexers Work
- MSC-GUIDE-044 | How Bitcoin Indexers Work | Previous: MSC-GUIDE-043 | Bitcoin APIs Explained | Next: MSC-GUIDE-045 | What Is BitVM?
- MSC-GUIDE-045 | What Is BitVM? | Previous: MSC-GUIDE-044 | How Bitcoin Indexers Work | Next: MSC-GUIDE-046 | How Discreet Log Contracts Work
- MSC-GUIDE-046 | How Discreet Log Contracts Work | Previous: MSC-GUIDE-045 | What Is BitVM? | Next: MSC-GUIDE-047 | What Is OP_CAT?
- MSC-GUIDE-047 | What Is OP_CAT? | Previous: MSC-GUIDE-046 | How Discreet Log Contracts Work | Next: MSC-GUIDE-048 | Emerging Protocols on Bitcoin: How to Evaluate Them
- MSC-GUIDE-048 | Emerging Protocols on Bitcoin: How to Evaluate Them | Previous: MSC-GUIDE-047 | What Is OP_CAT? | Next: MSC-GUIDE-049 | What Is Bitcoin Core?
- MSC-GUIDE-049 | What Is Bitcoin Core? | Previous: MSC-GUIDE-048 | Emerging Protocols on Bitcoin: How to Evaluate Them | Next: MSC-GUIDE-050 | What Is Bitcoin Knots?
- MSC-GUIDE-050 | What Is Bitcoin Knots? | Previous: MSC-GUIDE-049 | What Is Bitcoin Core? | Next: MSC-GUIDE-051 | How to Read the Bitcoin Source Code
- MSC-GUIDE-051 | How to Read the Bitcoin Source Code | Previous: MSC-GUIDE-050 | What Is Bitcoin Knots? | Next: MSC-GUIDE-052 | How Bitcoin Core Releases Work
- MSC-GUIDE-052 | How Bitcoin Core Releases Work | Previous: MSC-GUIDE-051 | How to Read the Bitcoin Source Code | Next: MSC-GUIDE-053 | How Bitcoin Improvement Proposals Work
- MSC-GUIDE-053 | How Bitcoin Improvement Proposals Work | Previous: MSC-GUIDE-052 | How Bitcoin Core Releases Work | Next: MSC-GUIDE-054 | How Bitcoin Script Works
- MSC-GUIDE-054 | How Bitcoin Script Works | Previous: MSC-GUIDE-053 | How Bitcoin Improvement Proposals Work | Next: MSC-GUIDE-055 | How Taproot Changed Bitcoin
- MSC-GUIDE-055 | How Taproot Changed Bitcoin | Previous: MSC-GUIDE-054 | How Bitcoin Script Works | Next: MSC-GUIDE-056 | How SegWit Changed Bitcoin
- MSC-GUIDE-056 | How SegWit Changed Bitcoin | Previous: MSC-GUIDE-055 | How Taproot Changed Bitcoin | Next: MSC-GUIDE-057 | How Schnorr Signatures Work in Bitcoin
- MSC-GUIDE-057 | How Schnorr Signatures Work in Bitcoin | Previous: MSC-GUIDE-056 | How SegWit Changed Bitcoin | Next: MSC-GUIDE-058 | How Digital Signatures Work in Bitcoin
- MSC-GUIDE-058 | How Digital Signatures Work in Bitcoin | Previous: MSC-GUIDE-057 | How Schnorr Signatures Work in Bitcoin | Next: MSC-GUIDE-059 | How Hash Functions Work in Bitcoin
- MSC-GUIDE-059 | How Hash Functions Work in Bitcoin | Previous: MSC-GUIDE-058 | How Digital Signatures Work in Bitcoin | Next: MSC-GUIDE-060 | How Merkle Trees Work in Bitcoin
- MSC-GUIDE-060 | How Merkle Trees Work in Bitcoin | Previous: MSC-GUIDE-059 | How Hash Functions Work in Bitcoin | Next: MSC-GUIDE-061 | How Bitcoin RPC Works
- MSC-GUIDE-061 | How Bitcoin RPC Works | Previous: MSC-GUIDE-060 | How Merkle Trees Work in Bitcoin | Next: MSC-GUIDE-062 | How to Set Up a Bitcoin Development Environment
- MSC-GUIDE-062 | How to Set Up a Bitcoin Development Environment | Previous: MSC-GUIDE-061 | How Bitcoin RPC Works | Next: MSC-GUIDE-063 | How Bitcoin Software Is Tested
- MSC-GUIDE-063 | How Bitcoin Software Is Tested | Previous: MSC-GUIDE-062 | How to Set Up a Bitcoin Development Environment | Next: MSC-GUIDE-064 | How to Run Reliable Bitcoin Infrastructure
- MSC-GUIDE-064 | How to Run Reliable Bitcoin Infrastructure | Previous: MSC-GUIDE-063 | How Bitcoin Software Is Tested | Next: MSC-GUIDE-065 | Who Builds on Bitcoin?
- MSC-GUIDE-065 | Who Builds on Bitcoin? | Previous: MSC-GUIDE-064 | How to Run Reliable Bitcoin Infrastructure | Next: MSC-GUIDE-066 | What Bitcoin Developers Do
- MSC-GUIDE-066 | What Bitcoin Developers Do | Previous: MSC-GUIDE-065 | Who Builds on Bitcoin? | Next: MSC-GUIDE-067 | Bitcoin Artists and the Culture They Shape
- MSC-GUIDE-067 | Bitcoin Artists and the Culture They Shape | Previous: MSC-GUIDE-066 | What Bitcoin Developers Do | Next: MSC-GUIDE-068 | How Bitcoin Industry Leaders Shape the Ecosystem
- MSC-GUIDE-068 | How Bitcoin Industry Leaders Shape the Ecosystem | Previous: MSC-GUIDE-067 | Bitcoin Artists and the Culture They Shape | Next: MSC-GUIDE-069 | How Public Companies Participate in Bitcoin
- MSC-GUIDE-069 | How Public Companies Participate in Bitcoin | Previous: MSC-GUIDE-068 | How Bitcoin Industry Leaders Shape the Ecosystem | Next: MSC-GUIDE-070 | How Bitcoin Startups Build and Compete
- MSC-GUIDE-070 | How Bitcoin Startups Build and Compete | Previous: MSC-GUIDE-069 | How Public Companies Participate in Bitcoin | Next: MSC-GUIDE-071 | How Bitcoin Mining Companies Operate
- MSC-GUIDE-071 | How Bitcoin Mining Companies Operate | Previous: MSC-GUIDE-070 | How Bitcoin Startups Build and Compete | Next: MSC-GUIDE-072 | What Bitcoin Infrastructure Companies Do
- MSC-GUIDE-072 | What Bitcoin Infrastructure Companies Do | Previous: MSC-GUIDE-071 | How Bitcoin Mining Companies Operate | Next: MSC-GUIDE-073 | How Bitcoin Exchanges Work
- MSC-GUIDE-073 | How Bitcoin Exchanges Work | Previous: MSC-GUIDE-072 | What Bitcoin Infrastructure Companies Do | Next: MSC-GUIDE-074 | How Bitcoin Wallet Providers Operate
- MSC-GUIDE-074 | How Bitcoin Wallet Providers Operate | Previous: MSC-GUIDE-073 | How Bitcoin Exchanges Work | Next: MSC-GUIDE-075 | How Bitcoin Marketplaces Work
- MSC-GUIDE-075 | How Bitcoin Marketplaces Work | Previous: MSC-GUIDE-074 | How Bitcoin Wallet Providers Operate | Next: MSC-GUIDE-076 | What Bitcoin Service Providers Do
- MSC-GUIDE-076 | What Bitcoin Service Providers Do | Previous: MSC-GUIDE-075 | How Bitcoin Marketplaces Work | Next: MSC-GUIDE-077 | Why Bitcoin Conferences Matter
- MSC-GUIDE-077 | Why Bitcoin Conferences Matter | Previous: MSC-GUIDE-076 | What Bitcoin Service Providers Do | Next: MSC-GUIDE-078 | How Bitcoin Communities Form and Grow
- MSC-GUIDE-078 | How Bitcoin Communities Form and Grow | Previous: MSC-GUIDE-077 | Why Bitcoin Conferences Matter | Next: MSC-GUIDE-079 | Major Milestones in Bitcoin History
- MSC-GUIDE-079 | Major Milestones in Bitcoin History | Previous: MSC-GUIDE-078 | How Bitcoin Communities Form and Grow | Next: MSC-GUIDE-080 | How Bitcoin Open-Source Projects Work
- MSC-GUIDE-080 | How Bitcoin Open-Source Projects Work | Previous: MSC-GUIDE-079 | Major Milestones in Bitcoin History | Next: None

### Learning path sequences

#### Start With Bitcoin

Category relationships:
- MSC-HUB-BASICS | Bitcoin Basics
- MSC-HUB-NETWORK | The Bitcoin Network

1. MSC-GUIDE-001 | What Is Bitcoin?
2. MSC-GUIDE-002 | Why Does Bitcoin Matter?
3. MSC-GUIDE-003 | A History of Bitcoin
4. MSC-GUIDE-004 | Who Was Satoshi Nakamoto?
5. MSC-GUIDE-005 | What Is a Bitcoin Wallet?
6. MSC-GUIDE-006 | What Is Bitcoin Self-Custody?
7. MSC-GUIDE-009 | What Is a Bitcoin Seed Phrase?
8. MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work
9. MSC-GUIDE-007 | How to Send and Receive Bitcoin
10. MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
11. MSC-GUIDE-014 | How Bitcoin Confirmations Work
12. MSC-GUIDE-016 | Bitcoin Best Practices for Safe Everyday Use
13. MSC-ROUTE-001 | How a Bitcoin Transaction Moves

#### Use Bitcoin Safely

Category relationships:
- MSC-HUB-BASICS | Bitcoin Basics
- MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

1. MSC-GUIDE-005 | What Is a Bitcoin Wallet?
2. MSC-GUIDE-006 | What Is Bitcoin Self-Custody?
3. MSC-GUIDE-009 | What Is a Bitcoin Seed Phrase?
4. MSC-GUIDE-010 | How Bitcoin Public and Private Keys Work
5. MSC-GUIDE-011 | How to Keep Bitcoin Secure
6. MSC-GUIDE-012 | How Bitcoin Privacy Works
7. MSC-GUIDE-007 | How to Send and Receive Bitcoin
8. MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
9. MSC-GUIDE-014 | How Bitcoin Confirmations Work
10. MSC-GUIDE-016 | Bitcoin Best Practices for Safe Everyday Use
11. MSC-GUIDE-074 | How Bitcoin Wallet Providers Operate

#### Understand the Network

Category relationships:
- MSC-HUB-BASICS | Bitcoin Basics
- MSC-HUB-NETWORK | The Bitcoin Network
- MSC-HUB-DEVELOPMENT | Bitcoin Development

1. MSC-GUIDE-013 | What Are UTXOs in Bitcoin?
2. MSC-GUIDE-008 | How Bitcoin Transactions and Fees Work
3. MSC-ROUTE-001 | How a Bitcoin Transaction Moves
4. MSC-GUIDE-025 | What Happens Inside the Bitcoin Mempool?
5. MSC-GUIDE-026 | How Bitcoin Blocks Work
6. MSC-GUIDE-014 | How Bitcoin Confirmations Work
7. MSC-GUIDE-027 | How the Bitcoin Blockchain Works
8. MSC-GUIDE-021 | What Is a Bitcoin Full Node?
9. MSC-GUIDE-022 | What Is a Pruned Bitcoin Node?
10. MSC-GUIDE-023 | How to Run a Bitcoin Node
11. MSC-GUIDE-024 | Bitcoin Node Software Explained
12. MSC-GUIDE-029 | How Bitcoin Proof of Work Secures the Network
13. MSC-GUIDE-017 | How Bitcoin Mining Works
14. MSC-GUIDE-018 | How Bitcoin Mining Pools Work
15. MSC-GUIDE-019 | What Is an ASIC Miner?
16. MSC-GUIDE-028 | What Is Bitcoin Hashrate?
17. MSC-GUIDE-020 | How Bitcoin's Difficulty Adjustment Works
18. MSC-GUIDE-030 | How Bitcoin Reaches Consensus
19. MSC-GUIDE-031 | How Bitcoin Soft Forks Work
20. MSC-GUIDE-032 | How Bitcoin Network Upgrades Happen
21. MSC-GUIDE-015 | What Is the Bitcoin Halving?
22. MSC-GUIDE-058 | How Digital Signatures Work in Bitcoin
23. MSC-GUIDE-059 | How Hash Functions Work in Bitcoin
24. MSC-GUIDE-060 | How Merkle Trees Work in Bitcoin

#### Build on Bitcoin

Category relationships:
- MSC-HUB-DEVELOPMENT | Bitcoin Development
- MSC-HUB-BUILDING | Building on Bitcoin

1. MSC-GUIDE-049 | What Is Bitcoin Core?
2. MSC-GUIDE-041 | Bitcoin Developer Tools: A Practical Overview
3. MSC-GUIDE-062 | How to Set Up a Bitcoin Development Environment
4. MSC-GUIDE-061 | How Bitcoin RPC Works
5. MSC-GUIDE-043 | Bitcoin APIs Explained
6. MSC-GUIDE-042 | How Bitcoin Wallet Integrations Work
7. MSC-GUIDE-044 | How Bitcoin Indexers Work
8. MSC-GUIDE-051 | How to Read the Bitcoin Source Code
9. MSC-GUIDE-063 | How Bitcoin Software Is Tested
10. MSC-GUIDE-052 | How Bitcoin Core Releases Work
11. MSC-GUIDE-053 | How Bitcoin Improvement Proposals Work
12. MSC-GUIDE-054 | How Bitcoin Script Works
13. MSC-GUIDE-056 | How SegWit Changed Bitcoin
14. MSC-GUIDE-055 | How Taproot Changed Bitcoin
15. MSC-GUIDE-057 | How Schnorr Signatures Work in Bitcoin
16. MSC-GUIDE-033 | How the Lightning Network Works
17. MSC-GUIDE-036 | Bitcoin Sidechains Explained
18. MSC-GUIDE-034 | What Is Ark on Bitcoin?
19. MSC-GUIDE-035 | How RGB Works on Bitcoin
20. MSC-GUIDE-037 | What Are Bitcoin Ordinals?
21. MSC-GUIDE-040 | What Is a Bitcoin Inscription?
22. MSC-GUIDE-038 | How the Runes Protocol Works
23. MSC-GUIDE-039 | What Is BRC-20 on Bitcoin?
24. MSC-GUIDE-046 | How Discreet Log Contracts Work
25. MSC-GUIDE-045 | What Is BitVM?
26. MSC-GUIDE-047 | What Is OP_CAT?
27. MSC-GUIDE-048 | Emerging Protocols on Bitcoin: How to Evaluate Them
28. MSC-GUIDE-050 | What Is Bitcoin Knots?
29. MSC-GUIDE-064 | How to Run Reliable Bitcoin Infrastructure

#### Explore the Ecosystem

Category relationships:
- MSC-HUB-BASICS | Bitcoin Basics
- MSC-HUB-ECOSYSTEM | Bitcoin Ecosystem

1. MSC-GUIDE-003 | A History of Bitcoin
2. MSC-GUIDE-004 | Who Was Satoshi Nakamoto?
3. MSC-GUIDE-079 | Major Milestones in Bitcoin History
4. MSC-GUIDE-065 | Who Builds on Bitcoin?
5. MSC-GUIDE-066 | What Bitcoin Developers Do
6. MSC-GUIDE-067 | Bitcoin Artists and the Culture They Shape
7. MSC-GUIDE-068 | How Bitcoin Industry Leaders Shape the Ecosystem
8. MSC-GUIDE-069 | How Public Companies Participate in Bitcoin
9. MSC-GUIDE-070 | How Bitcoin Startups Build and Compete
10. MSC-GUIDE-071 | How Bitcoin Mining Companies Operate
11. MSC-GUIDE-072 | What Bitcoin Infrastructure Companies Do
12. MSC-GUIDE-073 | How Bitcoin Exchanges Work
13. MSC-GUIDE-074 | How Bitcoin Wallet Providers Operate
14. MSC-GUIDE-075 | How Bitcoin Marketplaces Work
15. MSC-GUIDE-076 | What Bitcoin Service Providers Do
16. MSC-GUIDE-077 | Why Bitcoin Conferences Matter
17. MSC-GUIDE-078 | How Bitcoin Communities Form and Grow
18. MSC-GUIDE-080 | How Bitcoin Open-Source Projects Work

### Featured route steps

1. Creating a transaction
2. Selecting UTXOs
3. Setting outputs
4. Creating change
5. Choosing a fee
6. Signing
7. Broadcasting
8. Node validation
9. Entering mempools
10. Miner selection
11. Block inclusion
12. Confirmation
13. Additional settlement depth

### Branching logic

- Permanent guide navigation follows canonical category order.
- Learning path continuation follows the selected path sequence and may cross categories.
- Recommended branch guides provide one related route without changing the canonical home of either guide.
- The featured transaction route may connect to topic guides but does not replace them.
- Public branches activate only after both source and destination are PUBLISHED with confirmed URLs.

### Return destinations

- Topic guides return to their parent category hub.
- Subcategory breadcrumbs return to stable anchors inside category hubs.
- Learning paths return to the Learn homepage.
- The featured route returns to The Bitcoin Network hub.
- The glossary returns to the Learn homepage.

### Public navigation activation

- Only records with status PUBLISHED may appear as active, clickable public guide cards.
- PLANNED and DRAFT topic guides remain hidden from public guide grids and learning-path navigation.
- Do not display dead links.
- Do not display empty article cards.
- Do not display placeholder URLs.
- Do not expose a large Coming Soon library.
- Category hubs and learning paths may be built as reusable architecture, but unpublished destinations remain internal registry records.
- As each guide is published, its confirmed URL is returned to the registry and the corresponding card and navigation relationship may become active.

## PART 9: CODEX TAXONOMY MAP

This section defines proposed technical taxonomy only. It is not a Codex implementation prompt.

### Page role tags

- `page-role:learn-home`
- `page-role:category-hub`
- `page-role:learning-path`
- `page-role:topic-guide`
- `page-role:featured-route`
- `page-role:glossary-index`

### Category tags

- Bitcoin Basics: `learn-category:bitcoin-basics`
- The Bitcoin Network: `learn-category:bitcoin-network`
- Building on Bitcoin: `learn-category:building-on-bitcoin`
- Bitcoin Development: `learn-category:bitcoin-development`
- Bitcoin Ecosystem: `learn-category:bitcoin-ecosystem`

### Subcategory tags

#### Bitcoin Basics

- Foundations: `learn-subcategory:foundations`
- Using Bitcoin: `learn-subcategory:using-bitcoin`
- Security: `learn-subcategory:security`
- Essentials: `learn-subcategory:essentials`

#### The Bitcoin Network

- Mining: `learn-subcategory:mining`
- Nodes: `learn-subcategory:nodes`
- Network: `learn-subcategory:network`
- Consensus: `learn-subcategory:consensus`

#### Building on Bitcoin

- Layer 2: `learn-subcategory:layer-2`
- Digital Assets: `learn-subcategory:digital-assets`
- Development: `learn-subcategory:development`
- Innovation: `learn-subcategory:innovation`

#### Bitcoin Development

- Bitcoin Core: `learn-subcategory:bitcoin-core`
- Protocols: `learn-subcategory:protocols`
- Cryptography: `learn-subcategory:cryptography`
- Infrastructure: `learn-subcategory:infrastructure`

#### Bitcoin Ecosystem

- People: `learn-subcategory:people`
- Companies: `learn-subcategory:companies`
- Markets: `learn-subcategory:markets`
- Community: `learn-subcategory:community`

### Path tags

- Start With Bitcoin: `path:start-with-bitcoin`
- Use Bitcoin Safely: `path:use-bitcoin-safely`
- Understand the Network: `path:understand-the-network`
- Build on Bitcoin: `path:build-on-bitcoin`
- Explore the Ecosystem: `path:explore-the-ecosystem`

### Depth tags

- Surface: `level:surface`
- Shallow: `level:shallow`
- Deep: `level:deep`
- Trench: `level:trench`

### Format tags

- Comparison: `format:comparison`
- Ecosystem Overview: `format:ecosystem-overview`
- Explainer: `format:explainer`
- Glossary: `format:glossary`
- Guide: `format:guide`
- History: `format:history`
- Learning Index: `format:learning-index`
- Learning Path: `format:learning-path`
- Reference: `format:reference`
- Technical Analysis: `format:technical-analysis`
- Walkthrough: `format:walkthrough`

### Subject tag recommendations

Use no more than six supporting subject tags for most topic guides. Preserve the proposed tag sets in individual records, normalize values to lowercase URL-safe forms, and do not create public links from tags unless the destination is active.

## PART 10: PRODUCTION ROADMAP

### Phase 1: Master Learn architecture

**Actions:** Create registry, reusable page schemas, publication visibility gates, taxonomy validation, and tracking fields.

**Publishing gate:** No topic pages publish from this phase. Architecture is approved first.

### Phase 2: Bitcoin Basics / Foundations

**Actions:** Draft, review, and approve guides 1 through 4.

**Publishing gate:** Publish approved pages individually. Keep unpublished hub cards hidden until each status is PUBLISHED and its URL is confirmed.

### Phase 3: Bitcoin Basics / Using Bitcoin

**Actions:** Draft, review, and approve guides 5 through 8.

**Publishing gate:** Activate safe links among approved Basics guides.

### Phase 4: Bitcoin Basics / Security

**Actions:** Draft, review, and approve guides 9 through 12.

**Publishing gate:** Activate custody and security branches only after destination URLs are confirmed.

### Phase 5: Bitcoin Basics / Essentials

**Actions:** Draft, review, and approve guides 13 through 16. Finalize Bitcoin Basics hub and Start With Bitcoin path. Finalize the core of Use Bitcoin Safely.

**Publishing gate:** Launch the Bitcoin Basics hub with published guide cards only. Keep unpublished guides internal and hidden. Launch path steps only after their status is PUBLISHED and their URLs are confirmed.

### Phase 6: The Bitcoin Network / Mining

**Actions:** Draft, review, and approve guides 17 through 20.

**Publishing gate:** Activate mining branches and dated research-review reminders.

### Phase 7: The Bitcoin Network / Nodes

**Actions:** Draft, review, and approve guides 21 through 24.

**Publishing gate:** Connect future node Tools only after those tools exist.

### Phase 8: The Bitcoin Network / Network

**Actions:** Draft, review, and approve guides 25 through 28.

**Publishing gate:** Prepare the featured transaction route using approved transaction, UTXO, mempool, and block terminology.

### Phase 9: The Bitcoin Network / Consensus

**Actions:** Draft, review, and approve guides 29 through 32. Write and approve the featured transaction route. Finalize The Bitcoin Network hub and Understand the Network path.

**Publishing gate:** Launch the hub, path, and featured route after all active links and policy terminology validate.

### Phase 10: Building on Bitcoin / Layer 2

**Actions:** Draft, review, and approve guides 33 through 36.

**Publishing gate:** Recheck protocol maturity immediately before each draft and publication.

### Phase 11: Building on Bitcoin / Digital Assets

**Actions:** Draft, review, and approve guides 37 through 40.

**Publishing gate:** Validate indexer, inscription, and protocol terminology across all four guides.

### Phase 12: Building on Bitcoin / Development

**Actions:** Draft, review, and approve guides 41 through 44.

**Publishing gate:** Connect to future Tools pages only after stable destinations exist.

### Phase 13: Building on Bitcoin / Innovation

**Actions:** Draft, review, and approve guides 45 through 48. Finalize Building on Bitcoin hub.

**Publishing gate:** Recheck BitVM, DLC, OP_CAT, and emerging protocol status before approval and again before publication.

### Phase 14: Bitcoin Development / Bitcoin Core

**Actions:** Draft, review, and approve guides 49 through 52.

**Publishing gate:** Version-check software, repository, and release-process details.

### Phase 15: Bitcoin Development / Protocols

**Actions:** Draft, review, and approve guides 53 through 56.

**Publishing gate:** Validate BIP numbers, proposal status, activation history, and terminology.

### Phase 16: Bitcoin Development / Cryptography

**Actions:** Draft, review, and approve guides 57 through 60.

**Publishing gate:** Require technical review for mathematical claims and examples.

### Phase 17: Bitcoin Development / Infrastructure

**Actions:** Draft, review, and approve guides 61 through 64. Finalize Bitcoin Development hub and Build on Bitcoin path.

**Publishing gate:** Validate commands, versions, security warnings, and responsive code treatment before publication.

### Phase 18: Bitcoin Ecosystem / People

**Actions:** Draft, review, and approve guides 65 through 68.

**Publishing gate:** Use transparent inclusion criteria and avoid personality rankings.

### Phase 19: Bitcoin Ecosystem / Companies

**Actions:** Draft, review, and approve guides 69 through 72.

**Publishing gate:** Date filings and examples. Avoid promotional listings.

### Phase 20: Bitcoin Ecosystem / Markets

**Actions:** Draft, review, and approve guides 73 through 76. Complete the Use Bitcoin Safely provider branch.

**Publishing gate:** Apply custody, counterparty, and regulatory review where relevant.

### Phase 21: Bitcoin Ecosystem / Community

**Actions:** Draft, review, and approve guides 77 through 80. Finalize Bitcoin Ecosystem hub, Explore the Ecosystem path, and glossary index.

**Publishing gate:** Launch the final hub and path after all canonical URLs are confirmed. Publish the glossary with canonical mappings.

### Phase 22: Final integration and registry audit

**Actions:** Return every confirmed URL to the registry, activate valid internal links, add backlinks from older content, and run the 93-destination audit.

**Publishing gate:** All statuses remain accurate. No planned URL is treated as active without confirmation.

### Registry return and link activation workflow

1. Draft and approve the individual content package.
2. Publish the canonical destination through the approved implementation workflow.
3. Return the confirmed publication URL to the JSON registry.
4. Change status only when publication is confirmed.
5. Regenerate the synchronized Markdown and validation files.
6. Activate public cards, path steps, previous and next links, and backlinks only when their destinations are PUBLISHED.
7. Keep planned slugs as internal planning handles until a confirmed URL supersedes them.

Canonical content SHA-256: `c5ca644d9f4f4fda3a887cfb1106b1d6472f190509cb7865c627b34ff6dde531`

**FINAL MSC LEARN REGISTRY LOCKED FOR CODEX ARCHITECTURE**
