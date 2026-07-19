---
registry_id: MSC-GUIDE-028
status: COPY_LOCKED
page_role: topic-guide
h1: What Is Bitcoin Hashrate?
handle: bitcoin-hashrate
category: The Bitcoin Network
subcategory: Network
depth: Shallow
format: Explainer
primary_path: Understand the Network
secondary_paths:
  - Explore the Ecosystem
author_display: Mempool Surf Club Editorial
reviewed_date: 2026-07-18
copy_locked_date: 2026-07-18
---

# What Is Bitcoin Hashrate?

## 1. Introductory deck

Bitcoin hashrate is an estimate of how much proof-of-work computation is being applied to mining. Individual machines and pools can measure or estimate their own performance, but total network hashrate is not directly observable. It is inferred from accumulated chainwork and the time blocks took to arrive, so the result depends on the measurement window and natural block-time variance.

## 2. Full article

Hashrate describes how quickly proof-of-work hash attempts are being performed.

For a mining device, that rate can be measured or estimated from the machine's work. For a pool, it can be estimated from submitted shares. For the Bitcoin network, it is inferred from the blocks that were actually found.

Those are related measurements, but they are not identical.

### A hash is one proof-of-work attempt

Bitcoin miners repeatedly hash block headers or equivalent header variants.

Each hash produces a fixed-size result. The result is compared with the current network target. A valid block header hash must be at or below that target.

One hash per second is written as 1 H/s. Mining equipment operates at much larger scales:

- 1 kilohash per second is 10^3 H/s.
- 1 megahash per second is 10^6 H/s.
- 1 gigahash per second is 10^9 H/s.
- 1 terahash per second is 10^12 H/s.
- 1 petahash per second is 10^15 H/s.
- 1 exahash per second is 10^18 H/s.

The units count attempts per second. They do not measure the monetary value of those attempts, the amount of energy used, or the number of separate miners.

### Hashrate is a rate, not a stock of work

Hashrate describes activity over time.

Accumulated proof of work, or chainwork, describes the work represented by a chain of accepted blocks. A miner can have a high hashrate for one minute without producing a block. Another miner can find a block quickly with less hashrate because each attempt is probabilistic.

Expected outcomes become more stable over large numbers of attempts, but individual results remain random.

This distinction matters when people compare:

- A machine's advertised hashrate.
- A pool's effective hashrate.
- The estimated network hashrate.
- The accumulated work of a blockchain branch.

They answer different questions.

### Device hashrate can be measured in several ways

An ASIC miner may report a local hashrate calculated from its internal work.

A pool can estimate that device's effective hashrate from the difficulty and frequency of accepted shares. A wall-level operator can compare hash output with electrical power, cooling, downtime, and rejected work.

These figures can differ.

A machine's nameplate rating is a product specification under stated conditions. The controller's displayed rate may use a short rolling window. A pool estimate depends on share luck and the pool's accounting window. Effective delivered hashrate can be reduced by downtime, thermal throttling, network delay, rejected shares, configuration errors, or unstable power.

No one number fully describes a mining system unless its measurement method and time period are stated.

### Pool hashrate is usually estimated from shares

Mining pools assign participants a share target that is easier than the Bitcoin network target.

When a participant submits accepted shares, the pool has evidence that statistically significant hashing work was performed. The pool can estimate hashrate from the difficulty of those shares and how frequently they arrived.

A share is not a partial Bitcoin block. Most accepted shares do not satisfy the network target and are never broadcast as blocks.

Share-based hashrate is noisy over short windows. A miner can submit more or fewer shares than expected for a period without its physical hash rate changing. Longer windows generally smooth that variance but react more slowly to real changes.

Pools may display current, average, reported, and effective rates using different formulas. Those labels are service-specific, not Bitcoin consensus terms.

### Network hashrate cannot be counted directly

Bitcoin has no message in which every miner reports its machines or hash attempts to full nodes.

Failed hashes leave no on-chain record. Private miners do not need to identify themselves. Pools can publish estimates, but their reports do not cover every participant and are not required by consensus.

What the blockchain reveals is:

- Which valid blocks were found.
- The targets those blocks had to satisfy.
- Their chain positions.
- Header timestamps.
- The accumulated chainwork represented by the selected history.

Network hashrate is inferred from those observations.

It should therefore be called an estimate rather than an exact live count.

### Bitcoin Core estimates from chainwork over time

Bitcoin Core's `getnetworkhashps` RPC estimates hashes per second over a chosen block window.

The implementation selects a current or historical block, moves backward by the requested number of blocks, measures the accumulated chainwork difference, and divides it by the observed time difference across the window.

By default, the RPC uses a recent block window. An operator can request another positive window or use the blocks since the most recent difficulty adjustment.

This chainwork-based method has useful properties. It accounts for the actual proof-of-work targets represented by the blocks rather than assuming every compared block has the same difficulty.

The result still depends on the selected blocks and their timestamps. It is not a sensor reading from all mining machines.

### Difficulty gives an expected-work shortcut

Difficulty is a human-readable comparison between the current target and Bitcoin's reference difficulty target.

At difficulty 1, the expected number of hashes required to find a valid block is approximately 2^32. At difficulty D, the common approximation for expected hashes per block is:

D x 2^32

If blocks were arriving exactly at the ten-minute target spacing, an approximate network hashrate could be written as:

D x 2^32 / 600 seconds

This is an expectation, not a measurement of the latest instant.

For a real observation window, analysts use actual accumulated work and elapsed block time. When difficulty changes inside the window, a chainwork calculation avoids treating all blocks as if they represented one target.

### Block discovery is a random process

A constant hashrate does not produce blocks on a fixed schedule.

Each valid header attempt has a small independent chance of satisfying the target. The number of blocks found during a short period can be higher or lower than expected.

That statistical variance causes short-window network estimates to jump even when no physical miners were added or removed.

A longer window usually reduces noise, but it also delays recognition of rapid real changes. There is no perfect window for every purpose.

Analysts should report:

- The method used.
- The start and end blocks.
- The observation time.
- Whether difficulty changed.
- The timestamp convention.
- The software or data source.
- Any smoothing applied.

Two estimates can both be correctly calculated and still differ.

### Header timestamps have limits as measurement data

Bitcoin Core's network-hashrate RPC uses block timestamps within its selected window.

Block timestamps are miner-supplied values constrained by consensus, not trusted measurements from a synchronized laboratory clock. Their order can be irregular, and the implementation uses the minimum and maximum timestamps in the window to reduce some ordering problems.

External analysts may instead use observed arrival times from their own infrastructure. Those times introduce a different boundary because they depend on network position and relay delay.

Neither method directly observes failed hashes.

Precise claims should identify which time source was used.

### Difficulty adjustment reacts to block timing, not reported hashrate

Bitcoin adjusts mining difficulty after each 2,016-block interval under mainnet rules.

The calculation compares the measured timespan with the target timespan and adjusts the target within defined limits. It does not query miners, pools, energy meters, or hashrate dashboards.

If more hashrate joins while difficulty is unchanged, blocks tend to arrive faster on average. If hashrate leaves, blocks tend to arrive more slowly. The next adjustment responds to the block timing that occurred.

Hashrate and difficulty are therefore connected through observed block production, but they are not the same variable.

Difficulty can remain fixed while estimated hashrate changes. Hashrate estimates can also fluctuate from block luck even when physical capacity is stable.

### More hashrate changes attack economics, not consensus rules

Hashrate matters to Bitcoin security because proof-of-work competition determines the cost and probability of replacing valid chain history.

An attacker seeking to outpace the selected chain needs access to substantial hashing capacity, energy, hardware, coordination, and time. More honest hashrate can increase the resources required to produce a competing branch at a given rate.

That does not mean hashrate defines valid transactions.

Even overwhelming hash power cannot make a block acceptable to a full node if the block violates the consensus rules that node enforces. Hash power cannot create a valid signature for someone else's key or spend nonexistent outputs.

A dominant miner or coordinated group can create serious risks within the valid rule set. Depending on capability and duration, it may censor selected transactions, reorganize recent blocks, attempt double spends, or delay confirmation.

"Fifty-one percent controls Bitcoin" is therefore too broad. Majority hash power can influence ordering and inclusion of valid activity. It does not automatically control node software, private keys, or every consensus rule.

### Distribution and control matter alongside the total

A total network estimate does not reveal who can coordinate the work.

Mining hardware ownership, pool template control, pool account participation, firmware control, geographic concentration, energy dependence, and communication infrastructure are separate layers.

A large pool's displayed share does not necessarily mean the pool owns all connected machines. It can still indicate meaningful template or payout coordination.

A security analysis should ask:

- Who owns the hardware?
- Who chooses block templates?
- Who can redirect machines?
- How quickly can participants switch pools?
- Which firmware and network services are trusted?
- Where are energy and hosting dependencies concentrated?
- How much capacity is idle or could be activated?
- How long could an attacker sustain competing work?

Hashrate is one input to that threat model, not the whole answer.

### Hashrate does not reveal energy use by itself

Hashes are computational attempts. Energy use depends on how efficiently hardware produces them and on the supporting system.

To estimate electrical demand, an analyst needs assumptions about:

- Joules per terahash.
- The mix and operating state of machines.
- Power-supply losses.
- Cooling and ventilation.
- Networking and site overhead.
- Curtailment and downtime.
- Measurement boundaries.

The same hashrate can be produced with different electrical loads.

Network hashrate multiplied by one device's efficiency is not a precise global energy measurement. It is a scenario based on an assumed hardware mix.

Energy source, emissions, cost, and grid impact require additional data beyond power draw.

### Hashrate does not equal miner revenue or profitability

Mining revenue depends on blocks found, subsidy, transaction fees, payout arrangements, and bitcoin-denominated outcomes.

Profitability also depends on energy price, hardware cost, financing, cooling, labor, hosting, taxes, downtime, curtailment, maintenance, and the market value used for accounting.

A rising network hashrate can increase competition for the same expected block rewards before difficulty adjusts. It can also reflect newer hardware, lower-cost energy, temporary deployments, or changes in market conditions.

Hashrate alone does not tell a reader whether mining is profitable or whether bitcoin's price will rise.

### Estimates should be dated and scoped

A responsible hashrate figure includes a date, observation window, units, chain, and method.

For example, a statement can say that a particular Bitcoin Core node estimated mainnet hashes per second over the previous 120 blocks at a specified tip. That is more useful than presenting an unlabeled dashboard number as exact.

Historical charts should also disclose methodology changes. A provider that changes its smoothing window can create an apparent jump without a corresponding physical event.

Avoid false precision. A long decimal string does not turn a probabilistic estimate into a direct count.

### Hashrate connects mining, difficulty, and chainwork

The useful mental model is:

- Miners perform hash attempts.
- Hashrate measures or estimates attempts per second.
- The network target determines how difficult a valid result is.
- Valid blocks add provable work to a chain.
- Block timing provides evidence used to estimate network hashrate.
- Difficulty adjustment responds periodically to prior timing.
- Nodes select among valid candidate chains by accumulated work.

Hashrate is important because it describes the pace of proof-of-work competition. It remains an estimate at the network level and should always be interpreted with its window, method, and threat-model limits.

## 3. Key Terms

- **Hashrate:** An estimate of the total proof-of-work computation being applied to Bitcoin mining.
- **Mining:** The proof-of-work process that orders valid transactions into blocks and competes to extend the Bitcoin chain.
- **Threat model:** A defined view of the assets, adversaries, capabilities, failure modes, and assumptions relevant to a security decision.
- **Difficulty:** The proof-of-work threshold that determines how hard it is to produce a valid block hash.
- **Proof of work:** The computational process miners use to produce block hashes below the network target.
- **Miner:** An operator that constructs candidate blocks and performs proof of work.
- **Blockchain:** The ordered history of valid Bitcoin blocks selected by accumulated proof of work.

## 4. Sources

1. **Bitcoin Core network-hashrate RPC implementation**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/rpc/mining.cpp  
   Supports: `getnetworkhashps`, the selected block window, chainwork difference, timestamp range, default window, and hashes-per-second estimate.

2. **Bitcoin Core chainwork implementation**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/chain.cpp  
   Supports: Per-block proof calculation from the target, accumulated chainwork, and work-based chain comparison.

3. **Bitcoin Core chain index definitions**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/chain.h  
   Supports: Stored chainwork, block height, header timestamps, ancestor navigation, and active-chain data used by the estimate.

4. **Bitcoin Core proof-of-work implementation**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/pow.cpp  
   Supports: Target decoding, proof-of-work validation, difficulty adjustment mechanics, and the target-work relationship.

5. **Bitcoin Core mainnet consensus parameters**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://github.com/bitcoin/bitcoin/blob/v31.0/src/kernel/chainparams.cpp  
   Supports: Mainnet target spacing, target timespan, proof-of-work limit, and difficulty-adjustment interval.

6. **Bitcoin Core getnetworkhashps RPC documentation**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://bitcoincore.org/en/doc/31.0.0/rpc/mining/getnetworkhashps/  
   Supports: The RPC's estimated-network-hashes-per-second result, default block window, historical height option, and since-adjustment mode.

7. **Bitcoin Core getdifficulty RPC documentation**  
   Author or publisher: Bitcoin Core contributors  
   URL: https://bitcoincore.org/en/doc/31.0.0/rpc/blockchain/getdifficulty/  
   Supports: The node-reported proof-of-work difficulty relative to the minimum reference difficulty.

8. **Bitcoin white paper**  
   Author or publisher: Satoshi Nakamoto  
   URL: https://bitcoin.org/bitcoin.pdf  
   Supports: Repeated proof-of-work hashing, probabilistic block discovery, accumulated-work chain ordering, and attacker catch-up probability.

9. **Stratum V2 Mining Protocol specification**  
   Author or publisher: Stratum V2 contributors  
   URL: https://github.com/stratum-mining/sv2-spec/blob/main/03-Protocol-Overview.md  
   Supports: Mining jobs, share submissions, share targets, pool coordination, and the distinction between pool shares and Bitcoin-valid blocks.

## 5. SEO title

Bitcoin Hashrate Explained: Measurement, Estimates, and Security

## 6. Meta description

Learn what Bitcoin hashrate measures, how network hashrate is estimated from chainwork and block time, and why the result is not an exact live count.

## 7. Page excerpt

Hashrate describes proof-of-work attempts per second. Learn how machines, pools, and nodes estimate it, why short windows are noisy, and what it does and does not say about security.

## 8. Estimated reading time

11 minutes

## 9. Planned internal links

Do not activate planned links until the destination exists as a real published page.

- Parent hub: MSC-HUB-NETWORK | The Bitcoin Network
- Primary path: MSC-PATH-NETWORK | Understand the Network
- Secondary path: MSC-PATH-ECOSYSTEM | Explore the Ecosystem
- Prerequisite: MSC-GUIDE-017 | How Bitcoin Mining Works
- Previous guide: MSC-GUIDE-027 | How the Bitcoin Blockchain Works
- Next guide: MSC-GUIDE-029 | How Bitcoin Proof of Work Secures the Network
- Branch guide: MSC-GUIDE-017 | How Bitcoin Mining Works
- Recommended continuation: MSC-GUIDE-020 | How Bitcoin's Difficulty Adjustment Works

## 10. Accuracy review checklist

- [x] Registry metadata matches the approved registry.
- [x] Network hashrate is described as an estimate rather than a directly observed count.
- [x] Device, pool, and network hashrate measurements are separated.
- [x] Pool shares are not described as partial blocks.
- [x] Bitcoin Core's chainwork-over-time estimation method is described accurately.
- [x] The difficulty-times-2^32 formula is labeled as expected work and an approximation.
- [x] Short-window statistical variance and timestamp limitations are explicit.
- [x] Difficulty adjustment is not described as directly measuring reported hardware.
- [x] Hashrate does not override node-enforced consensus rules.
- [x] Majority-hashpower risks are not reduced to control of private keys or consensus validity.
- [x] Pool coordination, hardware ownership, and total network hashrate remain distinct.
- [x] Hashrate is not converted directly into exact energy, revenue, profitability, or price claims.
- [x] Exact approved glossary definitions are used.
- [x] Planned internal links contain no live URLs.
- [x] No em dash or en dash character appears.

## 11. Human verification

- Reviewer: Mempool Surf Club Editorial
- Review date: 2026-07-18
- Notes:
  - Verified Bitcoin Core v31.0 `getnetworkhashps` uses accumulated chainwork divided by an observed timestamp range over the selected block window.
  - Verified network hashrate is not described as a direct count of failed hashes, machines, miners, or energy use.
  - Verified the difficulty and expected-work shortcut is qualified as an approximation rather than the RPC's complete calculation.
  - Verified device-reported, pool share-derived, and blockchain-derived estimates remain distinct.
  - Verified block-time randomness, window choice, difficulty changes, and timestamp sources remain explicit.
  - Verified majority-hashpower discussion is limited to valid-history ordering, censorship, reorganization, and double-spend risks rather than rule-breaking authority.
  - Verified pool coordination and hardware ownership are not conflated.
  - Confirmed exact approved glossary-definition synchronization.
  - Confirmed source entries contain precise Supports notes. Moving Bitcoin Core and Stratum specification paths remain flagged for publication-time accessibility review.
  - Confirmed planned internal links remain inactive until real destination pages and URLs exist.

## 12. Illustration brief

### Illustration 1

- Concept title: Three Ways to Read Hashrate
- Educational purpose: Separate machine measurement, pool estimation, and network estimation.
- Recommended placement: After the section titled Pool hashrate is usually estimated from shares.
- Visual description: Old scientific instrument panel with three gauges. Device gauge reads Local work, pool gauge reads Accepted shares over time, and network gauge reads Chainwork over block time. Each has a different observation window.
- Required labels: Device hashrate, Pool effective hashrate, Network hashrate estimate, Local work, Accepted shares, Chainwork, Time window
- Caption: Device, pool, and network hashrate figures use different evidence and should not be treated as identical measurements.
- Alt text: Technical panel comparing Bitcoin device hashrate from local work, pool hashrate from accepted shares, and network hashrate from chainwork over time.
- Image orientation: Landscape
- Mobile crop notes: Stack the three gauges vertically and keep the evidence label directly beneath each gauge.
- Status: PLANNED

### Illustration 2

- Concept title: Why Short Hashrate Windows Are Noisy
- Educational purpose: Show random block discovery around a constant underlying rate.
- Recommended placement: After the section titled Block discovery is a random process.
- Visual description: Ocean-wave chart with a steady dashed baseline labeled Constant underlying hashrate. Short-window block observations rise and fall sharply around it. A longer smoothing window follows the baseline more closely but lags a later real change.
- Required labels: Constant underlying hashrate, Random block arrivals, Short window, Long window, Noise, Lag
- Caption: Random block timing makes short-window hashrate estimates volatile, while longer windows trade responsiveness for stability.
- Alt text: Statistical chart showing noisy short-window Bitcoin hashrate estimates around a stable underlying rate and a smoother but slower long-window estimate.
- Image orientation: Landscape
- Mobile crop notes: Use one centered baseline with two clearly labeled observation lines and no dense axis text.
- Status: PLANNED

### Illustration 3

- Concept title: Hashrate Is One Layer of the Threat Model
- Educational purpose: Prevent total hashrate from being treated as a complete security score.
- Recommended placement: After the section titled Distribution and control matter alongside the total.
- Visual description: Infrastructure map with total network hashrate at center. Separate surrounding stations show Hardware ownership, Template control, Pool coordination, Energy access, Network connectivity, Attack duration, and Node validation. Lines connect them without merging the roles.
- Required labels: Total hashrate, Hardware ownership, Template control, Pool coordination, Energy access, Connectivity, Attack duration, Node validation
- Caption: Security analysis requires more than a total hashrate estimate because control, duration, infrastructure, and node rules also matter.
- Alt text: Bitcoin mining threat-model diagram placing total hashrate among separate factors for hardware ownership, template control, pools, energy, connectivity, duration, and node validation.
- Image orientation: Square
- Mobile crop notes: Keep total hashrate at center with seven short outer labels arranged as an even ring.
- Status: PLANNED
