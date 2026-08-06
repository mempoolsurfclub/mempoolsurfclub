# Homepage market data methodology

The homepage `24 HOUR VOLUME` ranking uses CoinGecko's official Keyless Public API.

## Scope

- BRC-20 assets: CoinGecko `brc-20` category, ordered by 24-hour trading volume.
- Runes assets: CoinGecko `runes` category, ordered by 24-hour trading volume.
- Ordinals collections: CoinGecko Bitcoin Ordinals NFT coverage (`asset_platform_id: ordinals`), ordered by 24-hour USD volume and then read in native BTC volume.
- Values are normalized to integer satoshis before the three asset classes are ranked together.
- The public widget shows the five highest-volume tracked assets from the resulting snapshot.

This is an aggregated market-volume metric across CoinGecko-tracked markets. It is not a claim that every trade on every venue worldwide is indexed, and it is not a Bitcoin consensus or protocol metric.

## Reliability

The GitHub workflow builds one shared snapshot rather than calling the market-data API separately for every website visitor. Requests are deliberately paced and use retry/backoff behavior. A failed refresh must not fabricate values; the frontend marks retained data as delayed or reports the volume feed unavailable.

## Attribution

Data provided by CoinGecko: https://www.coingecko.com/en/api
