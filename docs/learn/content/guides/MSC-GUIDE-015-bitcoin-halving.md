---
registry_id: MSC-GUIDE-015
status: COPY_LOCKED
page_role: topic-guide
h1: What Is the Bitcoin Halving?
handle: bitcoin-halving
category: Bitcoin Basics
subcategory: Essentials
depth: Surface
format: Explainer
primary_path: Understand the Network
secondary_paths:
  - Start With Bitcoin
author_display: Mempool Surf Club Editorial
reviewed_date: 2026-07-17
copy_locked_date: 2026-07-17
---

# What Is the Bitcoin Halving?

## 1. Introductory deck

The Bitcoin halving is a scheduled reduction in the block subsidy permitted by the consensus rules. It happens at defined block-height intervals, reduces the rate of new bitcoin issuance, and does not guarantee a particular price, miner response, or calendar date.

## 2. Full article

Bitcoin issues new units through a rule tied to block production. The amount does not change because a company announces a policy, a central bank meets, or market demand rises.

Under the current consensus rules, the permitted block subsidy declines at scheduled block-height intervals. That event is called the halving.

### The halving changes the block subsidy

The block subsidy is new bitcoin created under the issuance schedule and paid through a block's coinbase transaction.

A valid block begins with a special coinbase transaction. Unlike ordinary transactions, its first input does not spend a previous UTXO. The transaction can create outputs that pay the miner or other destinations selected by the miner, subject to the amount permitted by the rules.

The halving reduces the maximum subsidy permitted at the relevant height. It does not directly alter ordinary transaction outputs, wallet balances, or previously issued bitcoin.

Bitcoin's issuance rules are enforced through consensus. New bitcoin enters circulation through the block subsidy, which began at 50 BTC per block and is reduced by half every 210,000 blocks. Under the current rules, total issuance remains below the commonly cited limit of 21 million BTC. Scarcity here describes an issuance constraint, not a promise about market price, future demand, or purchasing power.

### Subsidy and transaction fees are different

A miner's possible block revenue can include two components:

1. The block subsidy, which creates new bitcoin under the issuance schedule.
2. Transaction fees, which come from the difference between the inputs and outputs of transactions included in the block.

The sum is often called the block reward. The halving applies to the subsidy component, not to transaction fees.

This distinction matters because total miner revenue from a block does not necessarily fall by exactly half at the halving. Fees vary from block to block. The market value of the revenue, mining costs, and operational efficiency also vary.

A block with a lower subsidy can still contain high fees. A block with a higher subsidy can contain low fees. The protocol determines the maximum permitted subsidy, while users and miners interact through the market for block space.

### The original subsidy was 50 BTC

Bitcoin's original block subsidy was 50 BTC per block.

The subsidy calculation divides that amount by a power of two based on how many 210,000-block intervals have passed. The first interval permitted 50 BTC, the next permitted 25 BTC, and later intervals continued the same integer-halving process.

Bitcoin Core performs the calculation in satoshis, the smallest standard unit. Because the calculation uses integer units, repeated halving eventually produces zero rather than an infinitely divisible stream.

The schedule does not reissue lost bitcoin. Units that become inaccessible remain part of historical issuance even if no one can spend them.

### The schedule follows block height

The halving is triggered by block height, not a fixed calendar date.

Block height identifies a block's position in the chain, beginning from the genesis block. Under the current mainnet parameters, the subsidy interval is 210,000 blocks.

People can estimate a calendar date by combining the remaining block count with an assumed average block interval. The estimate can move because blocks do not arrive every ten minutes on a schedule.

Several blocks can arrive quickly, or a longer gap can occur. Block timestamps do not directly trigger the subsidy change. The validation rule uses height.

For durable educational content, the height rule matters more than a countdown clock.

### Nodes enforce the permitted amount

Miners construct coinbase transactions, but they do not decide unilaterally how much new bitcoin is valid.

When a node validates a block, it checks the value created by the coinbase transaction against the permitted subsidy plus the fees available from the block's ordinary transactions.

A block that claims more than the allowed amount is invalid under those consensus rules. A miner cannot make the excess valid by finding more proof of work or persuading other miners to build on it. Nodes enforcing the rules reject it.

Miners can choose to claim less than the maximum. The rule is a ceiling, not a requirement to collect every permitted satoshi.

The coinbase transaction can also contain data and can divide its outputs among more than one destination. Those details do not change the issuance ceiling. During validation, the relevant monetary question is whether the total value claimed by the coinbase remains within the subsidy and fee allowance for that block.

The subsidy is not stored as a standing balance waiting for a miner. It is value that a valid coinbase transaction is permitted to create at a particular height. If a miner does not claim the full amount, the unclaimed portion is not added to a later block.

### The total issuance remains below the commonly cited limit

The phrase "21 million bitcoin" is a useful shorthand for the issuance limit, but several related ideas should remain separate.

Issued supply refers to bitcoin created through valid coinbase transactions over history.

Circulating supply is a market or accounting term that may apply different assumptions about accessibility and availability.

Spendable supply excludes units that cannot currently be spent, but determining permanent loss is often uncertain.

The issuance limit describes what the subsidy schedule permits under the current rules. It does not mean exactly 21 million BTC already exist, are circulating, or remain accessible.

Because subsidy amounts are halved using integer satoshi units, the cumulative total remains below the commonly cited 21 million BTC figure under the current rules.

### The halving reduces new issuance

The halving lowers the rate at which new bitcoin can enter circulation through the subsidy.

It does not remove bitcoin from existing outputs. It does not cut wallet balances in half. It does not split existing units or require users to exchange them.

The event changes the permitted subsidy for future blocks after the threshold height. Ownership records and UTXOs remain governed by their existing spending conditions.

This is why the halving is best understood as an issuance event, not a redistribution event.

The schedule is also independent of whether a particular unit has moved recently. Bitcoin that remains in an old output is not renewed, reduced, or marked differently at a halving. The active UTXO set changes only when valid transactions spend outputs and create new ones.

This separation keeps issuance accounting distinct from ownership and transaction activity. The subsidy controls how much new value a block may create. Transactions determine how already issued value is reassigned among new outputs.

### The halving does not guarantee price appreciation

The issuance rate is one input into a market with many participants, expectations, constraints, and external conditions.

A lower subsidy does not guarantee that demand will rise, that price will appreciate, or that purchasing power will be preserved. Market participants may anticipate the event long before it occurs. Other economic forces can dominate.

Historical price charts cannot turn a protocol schedule into a future promise.

A technically accurate description can say that the flow of newly issued bitcoin declines. It should not convert that fact into an investment forecast.

### Miner economics can adjust in several ways

A lower subsidy changes one part of miner revenue.

Miner outcomes can also depend on:

- The market value of bitcoin.
- Transaction-fee demand.
- Energy and operating costs.
- Hardware efficiency.
- Access to capital and infrastructure.
- Competition from other miners.
- Changes in network hashrate.
- The difficulty adjustment.

Some miners may reduce activity if revenue no longer covers their costs. Others may operate more efficient equipment, use different energy arrangements, or continue under different business assumptions.

The protocol does not guarantee miner profitability or a specific hashrate response after a halving.

### Difficulty adjustment is a separate process

The halving schedule and the difficulty adjustment use different rules and serve different purposes.

The subsidy changes every 210,000 blocks under current mainnet parameters.

Mining difficulty is recalculated at a different interval based on prior block timing. Its purpose is to adjust the proof-of-work target as hashrate changes so block production tends toward the long-run target.

The halving does not directly change difficulty. A change in miner participation can affect block timing, and the later difficulty adjustment can respond under its own rules.

Combining the two processes into one event hides the difference between issuance and block-production regulation.

### Fees may become more important, but are not guaranteed

As the subsidy declines, transaction fees can represent a larger share of miner revenue.

That does not guarantee a particular fee level or fee market. Fees depend on demand for block space, transaction construction, user preferences, available capacity, and miner selection.

Future security-budget discussions often consider the relationship among subsidy, fees, hashrate, and incentives. Those are important research and policy questions, but the issuance schedule alone does not answer them.

The distinction also matters when discussing security spending. The protocol does not promise that one revenue component will replace another on a particular schedule. A lower subsidy can increase the relative importance of fees without guaranteeing that total miner revenue, hashrate, or the cost of attacking the network follows one path.

Researchers and network participants can debate future incentive conditions while agreeing on the narrower mechanical rule: the valid subsidy at a height is determined by consensus, and fees arise separately from the transactions selected for the block.

The durable claim is narrower: the subsidy declines under the current rules, while transaction fees remain a separate potential source of miner revenue.

### The schedule eventually reaches zero

Bitcoin Core's subsidy calculation limits the number of effective halving shifts and returns zero once the scheduled halvings exhaust the integer subsidy.

At that point, no new bitcoin would be created through the block subsidy under the current rules. Miners could still collect transaction fees from valid transactions included in their blocks.

This outcome is far in the future and depends on the rules remaining in force. It does not require a final bitcoin to be minted as one whole unit. The calculation operates in satoshis and ends when further integer halving produces no subsidy.

### The halving is a rule, not a ceremony

Media coverage often treats the halving as a market countdown. The protocol sees a block height.

When the relevant height arrives, validating nodes apply the subsidy calculation for that block. No central operator starts the event. Miners do not vote it into effect by producing a majority signal. Wallet users do not need to update balances or claim replacement units.

The important educational questions are:

- What amount is permitted?
- At which height does the interval change?
- Which nodes enforce the rule?
- How are subsidy and fees separated?
- What claims do not follow from the schedule?

Those questions keep the focus on Bitcoin's issuance system rather than market mythology.

The next guide turns from protocol mechanics to the practical habits that help people use Bitcoin safely over time.

## 3. Key Terms

**Halving:** The scheduled reduction in Bitcoin's block subsidy after each 210,000-block interval.

**Block subsidy:** New bitcoin created under the issuance schedule and paid through a block's coinbase transaction.

**Transaction fee:** The input value not reassigned to transaction outputs and available to the block's miner.

**Miner:** An operator that constructs candidate blocks and performs proof of work.

**Mining:** The proof-of-work process that orders valid transactions into blocks and competes to extend the Bitcoin chain.

**Difficulty adjustment:** Bitcoin's periodic recalculation of mining difficulty based on prior block timing.

**Hashrate:** An estimate of the total proof-of-work computation being applied to Bitcoin mining.

**Consensus:** The shared validation rules independently enforced by Bitcoin nodes.

**Satoshi:** The smallest standard unit of bitcoin, equal to one hundred millionth of one bitcoin.

## 4. Sources

### Bitcoin Core Mainnet Consensus Parameters

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/kernel/chainparams.cpp
- Supports: The mainnet subsidy-halving interval of 210,000 blocks and the separation of mainnet parameters from other Bitcoin testing networks.

### Bitcoin Core Subsidy and Block Validation

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/validation.cpp
- Supports: The initial 50 BTC subsidy, integer halving calculation, use of block height and the configured interval, zero subsidy after the effective halving range is exhausted, and validation of coinbase value against the permitted subsidy plus transaction fees.

### Bitcoin Developer Guide: Block Chain

- Author or publisher: Bitcoin Project developer documentation
- Direct URL: https://developer.bitcoin.org/devguide/block_chain.html
- Supports: Coinbase transactions, block height, mining rewards, subsidy maturity context, block timing, and the role of proof of work.

### Bitcoin Developer Guide: Mining

- Author or publisher: Bitcoin Project developer documentation
- Direct URL: https://developer.bitcoin.org/devguide/mining.html
- Supports: Candidate-block construction, coinbase transactions, transaction fees, mining work, and block submission.

### Bitcoin: A Peer-to-Peer Electronic Cash System

- Author or publisher: Satoshi Nakamoto
- Direct URL: https://bitcoin.org/bitcoin.pdf
- Supports: The incentive model combining newly issued units and transaction fees, proof of work, and the difficulty adjustment's role in targeting a stable average block rate.

### Bitcoin Core Proof-of-Work Calculation

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/pow.cpp
- Supports: The difficulty adjustment calculation, target-timespan logic, and its separation from the block-subsidy schedule.

### Bitcoin Core Consensus Parameters

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/consensus/params.h
- Supports: Consensus parameter fields for subsidy-halving and proof-of-work adjustment intervals.

### BIP 42: A Finite Monetary Supply for Bitcoin

- Author or publisher: Pieter Wuille
- Direct URL: https://bips.dev/42/
- Supports: The subsidy-shift correction, finite subsidy behavior, and the historical implementation issue that could otherwise have restarted issuance.

## 5. SEO title

What Is the Bitcoin Halving? Subsidy, Height, and Issuance

## 6. Meta description

Learn how Bitcoin's halving reduces the block subsidy by height, how nodes enforce issuance, why fees are separate, and what the event does not guarantee.

## 7. Page excerpt

The Bitcoin halving is a block-height rule that reduces the permitted subsidy every 210,000 blocks. This guide separates issuance, fees, miner revenue, difficulty, and market claims.

## 8. Estimated reading time

9 to 11 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- MSC-GUIDE-014 | How Bitcoin Confirmations Work
- MSC-GUIDE-016 | Bitcoin Best Practices for Safe Everyday Use
- MSC-GUIDE-020 | How Bitcoin's Difficulty Adjustment Works
- MSC-GUIDE-017 | How Bitcoin Mining Works
- MSC-GUIDE-018 | How Bitcoin Mining Pools Work
- MSC-GUIDE-026 | How Bitcoin Blocks Work
- MSC-GUIDE-028 | What Is Bitcoin Hashrate?
- MSC-GUIDE-029 | How Bitcoin Proof of Work Secures the Network
- MSC-GLOSSARY-001 | Bitcoin Glossary
- MSC-HUB-BASICS | Bitcoin Basics
- MSC-PATH-NETWORK | Understand the Network
- MSC-PATH-START | Start With Bitcoin

## 10. Accuracy review checklist

- [x] Registry metadata matches the approved registry.
- [x] The approved issuance wording appears exactly.
- [x] The halving is described as a subsidy reduction rather than a guaranteed reduction in total miner revenue.
- [x] The original subsidy and 210,000-block mainnet interval are supported by current Bitcoin Core sources.
- [x] The schedule is based on block height rather than a fixed calendar date or timestamp.
- [x] Nodes independently enforce the permitted coinbase amount.
- [x] The total issuance language remains below the commonly cited 21 million BTC limit.
- [x] Issued, circulating, spendable, and accessible supply are not treated as identical.
- [x] No current subsidy, current height, or estimated next-halving date is included.
- [x] No price prediction, appreciation promise, profitability promise, or hashrate guarantee appears.
- [x] Difficulty adjustment is separated from subsidy halving.
- [x] Bitcoin Core amount.h is not used as proof of the issuance schedule.
- [x] Exact approved glossary definitions are used.
- [x] Planned internal links contain no live URLs.
- [x] No em dash or en dash character appears.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-17
- Notes:
  - Editorial accuracy review completed.
  - Recheck source URL accessibility immediately before publication.
  - Confirm Bitcoin Core subsidy implementation, mainnet 210,000-block interval, total-issuance wording, and difficulty-adjustment terminology remains current before publication.
  - Keep planned internal links inactive until real destination pages and confirmed URLs exist.

## 12. Illustration brief

### Illustration 1

- Concept title: Block-Subsidy Staircase
- Educational purpose: Show the subsidy reducing at 210,000-block intervals without suggesting a market-price relationship.
- Recommended placement: After the section titled The original subsidy was 50 BTC.
- Visual description: Old infrastructure-manual staircase on Paper. Each horizontal step represents a 210,000-block interval and each vertical drop represents an integer subsidy halving. Use abstract height markers and avoid current-date countdowns.
- Required labels: Block height, 210,000-block interval, Block subsidy, Integer halving, Eventually zero
- Caption: Under the current rules, the permitted subsidy steps down at block-height intervals until integer halving reaches zero.
- Alt text: Technical staircase diagram showing Bitcoin's block subsidy decreasing at successive 210,000-block height intervals and eventually reaching zero.
- Image orientation: Landscape
- Mobile crop notes: Use four representative steps and an ellipsis before the zero-subsidy endpoint.
- Status: PLANNED

### Illustration 2

- Concept title: Two Parts of Possible Miner Revenue
- Educational purpose: Separate block subsidy from transaction fees and explain why total block revenue does not necessarily halve exactly.
- Recommended placement: After the section titled Subsidy and transaction fees are different.
- Visual description: Calm field-guide balance with a candidate block at the center. One input channel is labeled permitted subsidy and the other transaction fees. The two feed a possible miner-revenue total without displaying fiat value or price.
- Required labels: Block subsidy, Transaction fees, Coinbase transaction, Possible miner revenue, Separate components
- Caption: The halving reduces the subsidy component, while transaction fees remain a separate and variable part of possible block revenue.
- Alt text: Editorial diagram showing block subsidy and transaction fees as separate components feeding possible miner revenue through the coinbase transaction.
- Image orientation: Square
- Mobile crop notes: Stack the two revenue components above the combined block-revenue box.
- Status: PLANNED

### Illustration 3

- Concept title: Height Rule and Calendar Estimate
- Educational purpose: Contrast the consensus block-height threshold with a variable calendar estimate.
- Recommended placement: After the section titled The schedule follows block height.
- Visual description: Navigation chart split into two lanes. The left lane shows fixed block-height checkpoints. The right lane shows a flexible calendar ribbon that shifts as block intervals vary. A note states that timestamps and countdowns do not trigger the rule.
- Required labels: Consensus height, Calendar estimate, Variable block intervals, Not timestamp-triggered, Validation rule
- Caption: The subsidy change occurs at a defined block height, while any calendar date is only an estimate.
- Alt text: Split navigation-chart diagram comparing fixed Bitcoin block-height thresholds with a shifting estimated calendar timeline.
- Image orientation: Landscape
- Mobile crop notes: Stack the fixed-height lane above the estimated-calendar lane and keep the contrast label centered.
- Status: PLANNED
