# MSC API v1 — Market Data

## Purpose

MSC API is the Mempool Surf Club-owned normalization layer between upstream market providers and public MSC surfaces. Frontend code consumes MSC API snapshots rather than calling Satflow directly.

This keeps provider credentials private, gives MSC one stable data contract, and allows upstream providers to change without forcing every page to change with them.

## Phase 1 + Phase 2 scope

Implemented in this phase:

- Homepage `24 HOUR VOLUME — TOP 5` reads the MSC API Ordinals and Runes feeds and ranks them together by BTC volume.
- Satflow is the upstream provider for both Ordinals and Runes market data.
- MSC API publishes separate Ordinals and Runes datasets for later phases.
- Market snapshots are scheduled every 15 minutes.
- Public homepage output is fail-closed: preview, missing, invalid, or stale data keeps the Top 5 panel hidden.

Not implemented in this phase:

- Tools page market instruments.
- Ordinals hub UI.
- Runes hub UI.
- BRC-20 expansion.
- Trading, wallet connections, signing, bidding, or purchase flows.

## v1 endpoints

Published on the `homepage-market-data` branch under `data/api`:

- `/v1/manifest.json`
- `/v1/market/homepage.json`
- `/v1/market/ordinals.json`
- `/v1/market/runes.json`

The homepage currently consumes the separate Ordinals and Runes endpoints so Satflow alone can power the live ranking.

## Provider ownership

| MSC API dataset | Upstream provider | Purpose |
| --- | --- | --- |
| Ordinals | Satflow | 24-hour Ordinals collection market activity |
| Runes | Satflow | 24-hour Runes market activity |
| Homepage Top 5 | MSC API | Top five Ordinals + Runes assets ranked by normalized BTC volume |

The Satflow credential is a server-side GitHub Actions secret. It must never be committed to theme files, browser JavaScript, JSON snapshots, or documentation.

## Readiness modes

`preview`
: Satflow is not configured. Assets are empty.

`partial`
: Reserved compatibility state while the older combined homepage snapshot remains in the pipeline.

`live`
: The endpoint is backed by validated current Satflow data.

## Homepage safety contract

The homepage renderer requires both the Ordinals and Runes MSC API snapshots to:

1. identify themselves as `MSC API` `v1`;
2. have `mode: live`;
3. have a `24h` window;
4. contain only the expected protocol type;
5. contain positive BTC volume values; and
6. be no more than 45 minutes old.

The two feeds are combined, sorted by BTC volume, and the top five are rendered. If five valid assets cannot be produced, the market panel remains hidden and the rest of the radar continues operating.

## Refresh and publication

The GitHub Actions workflow builds MSC API market snapshots every 15 minutes and publishes them to the `homepage-market-data` branch. Browser consumers poll the published snapshots every five minutes.

## Credential dependency

The only credential required to activate the homepage Ordinals + Runes Top 5 is the Satflow key stored as the repository Actions secret:

`SATFLOW_API_KEY`

BRC-20 can be added later as a separate expansion without blocking the Satflow launch.
