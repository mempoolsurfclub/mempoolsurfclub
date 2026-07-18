---
registry_id: MSC-GUIDE-020
status: COPY_LOCKED
page_role: topic-guide
h1: How Bitcoin's Difficulty Adjustment Works
handle: bitcoin-difficulty-adjustment
category: The Bitcoin Network
subcategory: Mining
depth: Deep
format: Technical Analysis
primary_path: Understand the Network
secondary_paths:
  - Build on Bitcoin
author_display: Mempool Surf Club Editorial
reviewed_date: 2026-07-18
copy_locked_date: 2026-07-18
---

# How Bitcoin's Difficulty Adjustment Works

## 1. Introductory deck

Bitcoin's mainnet difficulty adjustment periodically recalculates the proof-of-work target from prior block timing. The ordinary rule changes the target only at 2,016-block boundaries, limits each adjustment, and aims for a long-run average spacing without scheduling blocks exactly ten minutes apart.

## 2. Full article

Bitcoin miners add or remove hashing capacity for economic and operational reasons. If the proof-of-work requirement never changed, a large increase in aggregate hashing could make blocks arrive much faster, while a large decrease could make them arrive much slower.

Bitcoin addresses that problem with a consensus rule that periodically recalculates the proof-of-work target.

The phrase "difficulty adjusts every two weeks" is useful shorthand, but it is not technically precise. Mainnet adjusts at block-height boundaries. The calculation uses block timestamps, clamps the measured timespan, applies integer arithmetic, encodes the result compactly, and remains subject to the proof-of-work limit.

### Proof of work is checked against a target

A Bitcoin block header contains a compact representation of the target in its `nBits` field.

Nodes decode that field into a full target value and verify the block-header hash. A proof of work is valid when the numeric hash is less than or equal to the target required by consensus.

A lower target leaves fewer possible hash values that qualify, so the work is harder.

A higher target allows more possible hash values to qualify, so the work is easier.

The target is the consensus-sensitive threshold. Mining difficulty is a human-readable relative measure derived from the target. Difficulty is not the direct field serialized in the block header.

This distinction matters because explanations often speak in terms of difficulty while the implementation checks compact target data and full integer targets.

### Target and difficulty move in opposite directions

Difficulty and target are inversely related.

If the target becomes one half as large, qualifying hashes become roughly twice as rare and the relative difficulty becomes roughly twice as high.

If the target becomes twice as large, qualifying hashes become roughly twice as common and the relative difficulty becomes roughly one half as high, unless the proof-of-work limit prevents that target.

Bitcoin software can present a difficulty number for people, but nodes validate `nBits`, decode the target, check its range, and compare the block hash.

The relationship should not be confused with hashrate. Hashrate describes estimated hashing work being applied. Difficulty describes the proof-of-work threshold. They interact through observed block timing, but they are not the same quantity.

### Mainnet parameters define the intended pace

Current Bitcoin Core mainnet consensus parameters use:

- A target spacing of 600 seconds, or ten minutes.
- A target timespan of 1,209,600 seconds, or fourteen days.
- A difficulty-adjustment interval calculated as target timespan divided by target spacing.

Dividing 1,209,600 by 600 produces 2,016 blocks.

The ten-minute value is an average target across many blocks. It is not an appointment for the next block. Proof-of-work discovery is probabilistic, so blocks can arrive seconds apart or after a long gap.

The fourteen-day value is the target timespan used in the formula. The adjustment does not wait for a calendar to announce that exactly fourteen days have passed.

### Mainnet changes target at retarget boundaries

Under the ordinary mainnet rule, blocks between retarget boundaries use the previous block's compact target.

A new target is calculated when the height of the block being validated is a multiple of 2,016.

The first retargeted target applies to the block at height 2,016. The previous block has height 2,015. The next boundaries occur at heights 4,032, 6,048, and later multiples of 2,016.

This is why "every 2,016 blocks" is more precise than "every two weeks." The boundary is determined by height. The timestamps influence the size of the change after the boundary is reached.

Mainnet does not adjust difficulty continuously and does not recalculate a new target after every block.

### The implementation selects the first block in the period

At a retarget boundary, current Bitcoin Core begins from the last block before the new period.

For the first mainnet retarget, that last block is height 2,015.

The implementation subtracts `DifficultyAdjustmentInterval() - 1` from that height to locate the first block used in the timespan calculation. With an interval of 2,016, the subtraction is 2,015, so the selected first block is height 0.

For the next retarget, the last block is height 4,031 and the selected first block is height 2,016.

The actual timespan is calculated from the timestamp of the last block before the boundary minus the timestamp of that selected first block.

### The historical measurement spans 2,015 gaps

A period containing 2,016 block indexes from the first selected block through the last block has 2,015 intervals between adjacent block timestamps.

The mainnet target timespan, however, is based on 2,016 target spacings:

2,016 multiplied by 600 seconds = 1,209,600 seconds.

This creates a historical boundary detail in the implementation. The measured timestamp difference spans 2,015 interblock gaps, while the comparison uses a target timespan corresponding to 2,016 ten-minute spacings.

The code comment describes going back by what the software wants to be fourteen days of blocks. The exact index selection and subtraction preserve the historical Bitcoin behavior.

It is therefore inaccurate to say that the implementation averages all 2,016 timestamps or measures exactly 2,016 ten-minute gaps. It uses the timestamps of two selected boundary blocks and subtracts them.

### Block timestamps are constrained but imperfect

The retarget formula uses block timestamps, but those timestamps are not treated as perfect wall-clock measurements.

Bitcoin consensus and validation rules place constraints on acceptable block time. A new block must be later than the median time of recent prior blocks, and a node also applies a future-time limit relative to its local adjusted view when accepting a block.

Within allowed limits, timestamps can be imperfect. Miners choose timestamp values, clocks can differ, and individual blocks may not reflect the exact moment of discovery.

The retarget does not average every timestamp in the period. It uses the selected first-block timestamp and the last-block timestamp. This makes the result sensitive to those boundary values within the applicable constraints.

Current code also contains network-specific protections and testing-network behavior that should not be generalized to historical mainnet rules without careful review.

### The actual timespan is clamped

Before calculating the new target, Bitcoin Core clamps the measured actual timespan.

If the measured value is less than one quarter of the target timespan, it is replaced with one quarter.

If the measured value is greater than four times the target timespan, it is replaced with four times.

For mainnet's 1,209,600-second target timespan, the clamp range is:

- Minimum: 302,400 seconds.
- Maximum: 4,838,400 seconds.

These limits restrict one retarget to a fourfold change in either direction before compact-target rounding and the proof-of-work limit are considered.

The clamp is applied to the measured timespan before the multiplication and division that produce the candidate target.

### The target formula uses integer arithmetic

After clamping, the ordinary mainnet calculation is conceptually:

new target = old target multiplied by clamped actual timespan, divided by target timespan.

Bitcoin Core performs this with large integers.

If blocks arrived faster than the target pace, the actual timespan is smaller than the target timespan. The multiplier is less than one, so the new target becomes smaller and difficulty rises.

If blocks arrived slower, the actual timespan is larger. The new target becomes larger and difficulty falls.

The resulting target cannot be easier than the mainnet proof-of-work limit. If the calculation would produce a larger target, the limit is used instead.

The order of operations, integer division, and compact encoding matter. A decimal calculator can illustrate the direction of change, but consensus behavior follows the implementation's integer operations and encoding.

### Compact `nBits` introduces rounding

A full 256-bit target is large, so Bitcoin block headers store a compact representation called `nBits`.

The compact format resembles a signed-magnitude coefficient with an exponent. Bitcoin Core decodes it into an arithmetic target and checks for negative, zero, overflowing, or above-limit values.

After the retarget calculation, the new target is encoded back into compact form. That representation cannot preserve every possible full integer exactly, so the conversion can round the effective target.

Validation and difficulty-transition tests account for compact conversion. This is one reason an explanation should not promise that the new difficulty is an exact decimal ratio of timestamps.

For readers, the useful mental model is the inverse relationship. For implementation review, the exact `SetCompact` and `GetCompact` behavior matters.

### A simplified worked example

Consider a fictional network period with simplified values.

Assume:

- Old target: 1,000 units.
- Target timespan: 100 hours.
- Measured actual timespan: 20 hours.
- Proof-of-work limit: 5,000 units.

First apply the clamp.

One quarter of the target timespan is 25 hours. The measured 20 hours is below that minimum, so the clamped actual timespan becomes 25 hours.

Then calculate:

new target = 1,000 multiplied by 25, divided by 100.

The simplified result is 250 units.

The target became one quarter as large, so the relative difficulty became about four times higher.

This example is not an actual Bitcoin target, current difficulty, compact value, or mainnet period. It uses small decimal numbers only to show that the clamp happens before the final calculation.

In real Bitcoin Core behavior, full integer targets, compact encoding, rounding, and the proof-of-work limit are applied.

### A slow-period example

Use the same fictional old target of 1,000 units and target timespan of 100 hours.

Suppose the measured actual timespan is 600 hours.

Four times the target timespan is 400 hours, so the measured value is clamped down to 400.

The simplified calculation becomes:

new target = 1,000 multiplied by 400, divided by 100 = 4,000 units.

The target became four times larger, making the proof of work about four times easier.

If the proof-of-work limit had been 3,000 units instead of 5,000, the result would be capped at 3,000.

Again, actual Bitcoin uses compact targets and integer arithmetic. The example shows direction, clamp order, and limit behavior without claiming to reproduce a current mainnet value.

### The adjustment does not poll global hashrate

Bitcoin nodes do not ask every miner how much hardware is running.

They observe valid blocks, their proof-of-work targets, accumulated work, and elapsed time. Network hashrate can be estimated from that observed history.

If substantial new hashing capacity joins, blocks may arrive faster before the next retarget. The boundary calculation can then lower the target, increasing difficulty.

If substantial capacity leaves, blocks may arrive more slowly. At the next boundary, the calculation can raise the target, lowering difficulty.

The response is delayed under the ordinary mainnet rule because the target stays unchanged between boundaries.

This delay is part of the design. It also means a sudden hashrate change can affect confirmation timing for a period without implying that the network has stopped following its rules.

### Difficulty does not identify mining structure

A higher difficulty indicates that the required target is harder relative to the reference measure.

It does not directly reveal:

- The exact number of mining machines.
- The number of operators.
- The manufacturers or models in use.
- Geographic distribution.
- Energy sources.
- Pool ownership.
- Hardware ownership.
- Current profitability.

Those questions require additional evidence and often remain partly estimated.

The same total hashrate can be produced by different combinations of hardware. Coordinated pool labels can represent equipment owned by many independent parties. Difficulty alone cannot separate those structures.

### Mainnet and testing networks differ

Bitcoin Core defines separate consensus parameters for mainnet, public testing networks, signet, and regtest.

Mainnet does not enable the public-test-network minimum-difficulty exception. Under the ordinary mainnet rule, blocks between retarget boundaries retain the preceding target.

Some testing networks permit special minimum-difficulty blocks after a sufficient timestamp gap or use additional protections. Regtest can disable retargeting for controlled testing. Testnet4 includes BIP 94 behavior that affects which target is used in part of its calculation.

Those rules should not be imported into a mainnet explanation. A statement accurate for one network can be wrong for another.

This guide focuses on mainnet. Testing-network exceptions belong in implementation-specific documentation and should be rechecked as software evolves.

### Nodes enforce the required target

A miner does not choose any target it prefers.

For each candidate block, a validating node calculates the target required by consensus from the previous chain state and network parameters. It checks the header's `nBits` and verifies that the hash satisfies the decoded target.

A miner can search against an easier private threshold, but nodes will reject a block that does not satisfy the required mainnet target.

A pool can assign an easier share target for internal accounting. That does not change the network target. A share meeting only the pool threshold is not a valid Bitcoin block proof.

Proof of work also cannot make an otherwise invalid block valid. Target validation is one part of a larger block-validation process.

### Difficulty adjustment and chainwork are related but distinct

Each valid block contributes proof of work based on its target.

Nodes use accumulated chainwork when comparing valid candidate chains. A block with a harder target represents more work than one with an easier target.

The periodic retarget process determines the target required for new blocks at defined boundaries. Chainwork accumulates from the work represented by the blocks that actually exist.

These concepts interact, but they answer different questions.

Difficulty adjustment asks: what target must the next period's blocks satisfy?

Chainwork asks: how much proof of work is represented by a validated chain history?

A reorganization can change the active chain and its accumulated work without causing a retarget at an arbitrary non-boundary height.

### Difficulty adjustment is not the halving

The halving changes the permitted block subsidy after each 210,000-block interval under current mainnet rules.

The difficulty adjustment changes the proof-of-work target at 2,016-block boundaries under the ordinary mainnet rule.

One mechanism controls new issuance. The other responds to prior block timing.

A halving can affect miner economics, which may influence hashrate and later block timing. The difficulty adjustment can eventually respond to that timing under its own formula. The halving does not directly command a difficulty change.

Likewise, a retarget does not change the subsidy.

### Difficulty does not guarantee schedule or profit

The adjustment aims to keep long-run block production near the target pace as aggregate hashing conditions change.

It does not guarantee that the next block arrives in ten minutes. It does not guarantee that a 2,016-block period lasts exactly fourteen calendar days. It does not guarantee miner profitability or network revenue.

Blocks remain probabilistic. Hashrate can change during a period. Timestamps are constrained but imperfect. Compact encoding introduces rounding. The proof-of-work limit can cap easier adjustments.

The consensus rule supplies a predictable calculation, not a clockwork schedule.

### The durable implementation view

A precise mainnet explanation can be summarized in a sequence:

1. Decode the previous period's compact target.
2. Reach a block height that is a multiple of 2,016.
3. Select the implementation-defined first block and the last block before the boundary.
4. Subtract their timestamps, spanning 2,015 interblock gaps.
5. Clamp the measured timespan to one quarter through four times the target timespan.
6. Multiply the old target by the clamped timespan.
7. Divide by the 1,209,600-second target timespan.
8. Cap the result at the mainnet proof-of-work limit.
9. Encode the result into compact `nBits` form.
10. Require the new boundary block and following period to use the consensus-required target.

Each node can perform these checks independently from validated chain data.

The next guide moves from mining into node operation and explains how a Bitcoin full node validates blocks, transactions, and chain history for itself.

## 3. Key Terms

**Difficulty:** The proof-of-work threshold that determines how hard it is to produce a valid block hash.

**Difficulty adjustment:** Bitcoin's periodic recalculation of mining difficulty based on prior block timing.

**Proof of work:** The computational process miners use to produce block hashes below the network target.

**Hashrate:** An estimate of the total proof-of-work computation being applied to Bitcoin mining.

**Block:** A valid batch of Bitcoin transactions linked to prior chain history through proof of work.

**Consensus:** The shared validation rules independently enforced by Bitcoin nodes.

**Validation:** The process of checking transactions and blocks against applicable rules.

## 4. Sources

### Bitcoin Core Proof-of-Work Implementation

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/pow.cpp
- Supports: Retarget-boundary detection, first-block lookup, actual-timespan subtraction, one-quarter and four-times clamps, target multiplication and division, proof-of-work limit, compact conversion, and hash-to-target validation.

### Bitcoin Core Proof-of-Work Interface

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/pow.h
- Supports: Current proof-of-work calculation and validation interfaces used by Bitcoin Core.

### Bitcoin Core Consensus Parameters

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/consensus/params.h
- Supports: Target spacing, target timespan, difficulty-adjustment interval calculation, proof-of-work limit fields, minimum-difficulty flags, and network-specific retarget controls.

### Bitcoin Core Mainnet and Testing-Network Parameters

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/kernel/chainparams.cpp
- Supports: Mainnet's 600-second spacing, 1,209,600-second target timespan, disabled minimum-difficulty exception, proof-of-work limit, and distinct testnet, signet, and regtest parameters.

### Bitcoin Core Block Header

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/primitives/block.h
- Supports: The `nBits` compact-target field and the other serialized block-header fields.

### Bitcoin Core Arithmetic Target Encoding

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/arith_uint256.cpp
- Supports: `SetCompact` and `GetCompact` conversion between compact `nBits` representation and full arithmetic targets, including sign, exponent, mantissa, overflow, and rounding behavior.

### Bitcoin Core Chainwork Calculation

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/chain.cpp
- Supports: Per-block proof calculation from target and accumulated chainwork as a concept distinct from periodic retargeting.

### Bitcoin Core Proof-of-Work Tests

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/test/pow_tests.cpp
- Supports: Current tests for retarget calculations, allowed adjustment ranges, compact targets, and network-specific proof-of-work behavior.

### Bitcoin Core Validation

- Author or publisher: Bitcoin Core developers
- Direct URL: https://github.com/bitcoin/bitcoin/blob/master/src/validation.cpp
- Supports: Header proof-of-work checking, required-target enforcement, block-time constraints, block validation, and active-chain processing.

### Bitcoin: A Peer-to-Peer Electronic Cash System

- Author or publisher: Satoshi Nakamoto
- Direct URL: https://bitcoin.org/bitcoin.pdf
- Supports: The broad design goal of adjusting proof-of-work difficulty from prior block timing to maintain an average production rate as hardware speed and participation change.

### Bitcoin Developer Guide: Block Chain

- Author or publisher: Bitcoin Project developer documentation
- Direct URL: https://developer.bitcoin.org/devguide/block_chain.html
- Supports: Proof-of-work targets, compact target representation, block headers, cumulative work, timestamps, and general difficulty-adjustment context.

## 5. SEO title

How Bitcoin's Difficulty Adjustment Works: Targets and Retargets

## 6. Meta description

Learn how Bitcoin mainnet recalculates its proof-of-work target every 2,016 blocks using boundary timestamps, clamps, integer arithmetic, compact encoding, and a proof-of-work limit.

## 7. Page excerpt

Bitcoin's difficulty adjustment recalculates the mainnet proof-of-work target at 2,016-block boundaries. This technical guide explains targets, compact nBits, the 2,015-gap timing detail, clamps, rounding, and network differences.

## 8. Estimated reading time

14 to 17 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- MSC-GUIDE-019 | What Is an ASIC Miner?
- MSC-GUIDE-021 | What Is a Bitcoin Full Node?
- MSC-GUIDE-030 | How Bitcoin Reaches Consensus
- MSC-GUIDE-014 | How Bitcoin Confirmations Work
- MSC-GUIDE-015 | What Is the Bitcoin Halving?
- MSC-GUIDE-017 | How Bitcoin Mining Works
- MSC-GUIDE-018 | How Bitcoin Mining Pools Work
- MSC-GUIDE-026 | How Bitcoin Blocks Work
- MSC-GUIDE-028 | What Is Bitcoin Hashrate?
- MSC-GUIDE-029 | How Bitcoin Proof of Work Secures the Network
- MSC-GUIDE-027 | How the Bitcoin Blockchain Works
- MSC-GUIDE-032 | How Bitcoin Network Upgrades Happen
- MSC-GLOSSARY-001 | Bitcoin Glossary
- MSC-HUB-NETWORK | The Bitcoin Network
- MSC-PATH-NETWORK | Understand the Network
- MSC-PATH-BUILD | Build on Bitcoin

## 10. Accuracy review checklist

- [x] Registry metadata and navigation relationships match the approved registry.
- [x] A lower target is harder and a higher target is easier.
- [x] A valid block hash is less than or equal to the applicable target.
- [x] Difficulty is separated from the compact target stored in `nBits`.
- [x] Mainnet target spacing, target timespan, and 2,016-block interval match current consensus parameters.
- [x] Mainnet target changes only at retarget boundaries under the ordinary rule.
- [x] The first retargeted target applies at height 2,016.
- [x] The first-block lookup and 2,015-interblock-gap timestamp detail are explained accurately.
- [x] The calculation does not claim to average every period timestamp.
- [x] The one-quarter and four-times timespan clamps are applied before target calculation.
- [x] Integer multiplication, division, compact encoding, rounding, and the proof-of-work limit are preserved.
- [x] Hashrate is inferred from observed work and time rather than polled globally.
- [x] Mainnet does not inherit public-test-network minimum-difficulty exceptions.
- [x] Testing-network and regtest behavior is labeled separately.
- [x] Difficulty adjustment is separated from halving and block subsidy.
- [x] Chainwork is separated from the periodic retarget process.
- [x] No exact ten-minute block schedule or exact two-week calendar schedule is promised.
- [x] No profitability promise, current-difficulty figure, current-target figure, or price prediction appears.
- [x] Exact approved glossary definitions are used.
- [x] Planned internal links contain no live URLs.
- [x] No em dash or en dash character appears.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-18
- Notes:
  - Verified current Bitcoin mainnet target spacing, target timespan, proof-of-work limit, and disabled minimum-difficulty exception.
  - Verified current Bitcoin Core retarget-boundary detection, first-block lookup, actual-timespan calculation, target arithmetic, proof-of-work limit, and target validation behavior.
  - Verified the first retargeted target applies at height 2,016 and later boundaries occur at multiples of 2,016.
  - Verified the historical calculation spans 2,015 interblock timestamp gaps while comparing against a target timespan based on 2,016 target spacings.
  - Verified the one-quarter and four-times timespan clamps and their order before target multiplication and division.
  - Verified compact-target encoding, integer arithmetic, rounding, and SetCompact or GetCompact wording.
  - Verified mainnet rules remain separate from testnet, testnet4, signet, and regtest behavior.
  - Verified difficulty adjustment remains separate from subsidy halving and accumulated chainwork.
  - Confirmed exact approved glossary-definition synchronization. Target and chainwork remain article-defined concepts rather than newly invented canonical glossary entries.
  - Confirmed source entries contain precise Supports notes. Moving Bitcoin Core master-branch paths remain flagged for publication-time accessibility review.
  - Confirmed planned internal links remain inactive until real destination pages and URLs exist.

## 12. Illustration brief

### Illustration 1

- Concept title: The 2,016-Block Retarget Window
- Educational purpose: Show the boundary rule and the historical difference between 2,016 blocks and 2,015 timestamp gaps.
- Recommended placement: After the section titled The historical measurement spans 2,015 gaps.
- Visual description: Navigation-chart timeline with blocks numbered conceptually from first period block to last period block, followed by the new boundary block. Brackets label 2,016 selected blocks, 2,015 interblock timestamp gaps, and the new target beginning at the boundary.
- Required labels: First selected block, Last block before boundary, 2,016 blocks, 2,015 timestamp gaps, Retarget boundary, New target
- Caption: The implementation subtracts timestamps across 2,015 gaps while comparing the result with a target timespan based on 2,016 ten-minute spacings.
- Alt text: Technical timeline showing 2,016 selected blocks, 2,015 intervals between their timestamps, and a new proof-of-work target beginning at the next boundary block.
- Image orientation: Landscape
- Mobile crop notes: Place the first block, last pre-boundary block, and boundary block in one horizontal center band with both brackets visible.
- Status: PLANNED

### Illustration 2

- Concept title: Target and Difficulty Move Inversely
- Educational purpose: Explain the inverse relationship without anchoring the guide to a current difficulty value.
- Recommended placement: After the section titled Target and difficulty move in opposite directions.
- Visual description: Oceanographic depth chart with a wide easy-target band near the surface and a narrow hard-target band deeper below. A paired scale shows target increasing in one direction and difficulty increasing in the opposite direction.
- Required labels: Higher target, Easier proof of work, Lower target, Harder proof of work, Difficulty increases, Target decreases, Valid hash range
- Caption: Lowering the target narrows the range of qualifying hashes and raises relative difficulty.
- Alt text: Inverse scale showing that a higher target makes proof of work easier while a lower target makes it harder and increases difficulty.
- Image orientation: Square
- Mobile crop notes: Keep both opposing arrows and the valid-hash bands inside the central crop.
- Status: PLANNED

### Illustration 3

- Concept title: Mainnet Retarget Calculation
- Educational purpose: Show the exact calculation sequence, including clamp and compact rounding.
- Recommended placement: After the section titled A slow-period example.
- Visual description: Infrastructure-manual flow from boundary timestamps to measured timespan, one-quarter and four-times clamp, old-target multiplication, target-timespan division, proof-of-work-limit cap, compact encoding, and boundary-block validation. Use fictional simplified numbers in a small side card.
- Required labels: Boundary timestamps, Measured timespan, Clamp, Old target, Multiply, Divide, Proof-of-work limit, Compact nBits, Rounding, Required boundary target
- Caption: Mainnet clamps the measured timespan before integer target arithmetic, applies the proof-of-work limit, and encodes the result into compact form.
- Alt text: Retarget flow diagram showing timestamp subtraction, timespan clamps, old-target multiplication, target-timespan division, proof-of-work-limit cap, compact encoding, and validation.
- Image orientation: Landscape
- Mobile crop notes: Convert the flow into a vertical sequence and keep the clamp stage visually distinct before multiplication.
- Status: PLANNED
