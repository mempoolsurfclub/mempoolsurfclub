# MSC API v1 — Market Data

## Purpose

MSC API is the Mempool Surf Club-owned normalization layer between upstream providers and public MSC surfaces. Frontend code consumes MSC API snapshots rather than calling Satflow or UniSat directly.

This keeps provider credentials private, gives MSC one stable data contract, and allows upstream providers to change without forcing every page to change with them.

## Phase 1 + Phase 2 scope

Implemented in this phase:

- Homepage `24 HOUR VOLUME — TOP 5` consumer reads MSC API data.
- Satflow is the upstream provider for Ordinals and Runes market data.
- UniSat remains the upstream provider for BRC-20 market data used by the combined homepage ranking.
- MSC API publishes separate Ordinals and Runes datasets for later phases.
- Market snapshots are scheduled every 15 minutes.
- Public homepage output is fail-closed: preview, missing, invalid, or stale data keeps the Top 5 panel hidden.

Not implemented in this phase:

- Tools page market instruments.
- Ordinals hub UI.
- Runes hub UI.
- Trading, wallet connections, signing, bidding, or purchase flows.

## v1 endpoints

Published on the `homepage-market-data` branch under `data/api`:

- `/v1/manifest.json`
- `/v1/market/homepage.json`
- `/v1/market/ordinals.json`
- `/v1/market/runes.json`

A legacy compatibility copy remains at `data/homepage-market.json` during migration.

## Provider ownership

| MSC API dataset | Upstream provider | Purpose |
| --- | --- | --- |
| Ordinals | Satflow | 24-hour Ordinals collection market activity |
| Runes | Satflow | 24-hour Runes market activity |
| BRC-20 contribution | UniSat | 24-hour BRC-20 BTC volume for the combined homepage ranking |
| Homepage Top 5 | MSC API | Combined ranking derived from normalized upstream datasets |

Satflow and UniSat credentials are server-side GitHub Actions secrets. They must never be committed to theme files, JavaScript, JSON snapshots, or documentation.

## Readiness modes

`preview`
: The provider required for that endpoint is not configured. Assets must be empty.

`partial`
: Manifest-only state. Satflow-backed Ordinals and Runes endpoints are live, but the combined homepage endpoint is still preview because UniSat is not ready.

`live`
: The endpoint is backed by validated current upstream data.

## Homepage safety contract

The homepage renderer accepts only a snapshot that:

1. identifies itself as `MSC API` `v1`;
2. has `mode: live`;
3. has a `24h` window;
4. contains five valid ranked assets;
5. uses only `ORDINAL`, `RUNE`, or `BRC-20` types;
6. contains positive BTC volume values; and
7. is no more than 45 minutes old.

If any condition fails, the market panel remains hidden and the rest of the radar continues operating.

## Refresh and publication

The GitHub Actions workflow builds MSC API market snapshots every 15 minutes and publishes them to the `homepage-market-data` branch. Browser consumers poll the published snapshot every five minutes, but the underlying source snapshot changes only when the scheduled workflow publishes a new valid result.

## Current credential dependency

Add the rotated Satflow credential to the repository Actions secrets as:

`SATFLOW_API_KEY`

The existing combined homepage Top 5 also requires:

`UNISAT_API_KEY`

With only Satflow configured, the Ordinals and Runes MSC API endpoints can be live while the homepage combined ranking remains hidden.
