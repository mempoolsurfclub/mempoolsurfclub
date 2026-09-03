# MSC Explore Atlas — Region Callout Navigation

## Scope

This implementation preserves the approved Atlas geography and focus behavior while replacing the fragile reviewed-callout placement logic with a viewport-safe renderer.

## Interaction

- Hovering/focusing a bottom region control or moving onto a map region keeps the existing preview zoom behavior.
- The large category name renders during the zoom and settles again against the final focused viewBox.
- Preview and locked states use the same placement.
- The category name remains at 3× the destination-label type scale.
- A reviewed title is never hidden merely because its leader cannot be routed.
- Every reviewed title is clamped inside the visible SVG viewport so it cannot be clipped off-screen.
- Leader routing is independent from title placement. It first tries a direct horizontal connection, then searches nearby clean lanes without moving the title.
- The leader must enter the selected region and cannot knowingly cross another visible map-text label. If no clean leader route exists, the leader is suppressed while the title remains visible.
- Returning to the full overview removes the large category callout.

## Final reviewed placements

The latest hover screenshots showed the previous implementation failing in two ways: Network could be clipped outside the viewport, while Exchanges, Marketplaces, and Wallets could disappear entirely when the strict leader collision test rejected their single fixed lane. The corrected renderer keeps all five reviewed titles inside the visible map and decouples title visibility from leader success.

Viewport-safe reviewed anchors:

- **Ordinals** — right side, X `0.80`, Y `0.44`
- **Wallets** — left side, X `0.18`, Y `0.46`
- **Marketplaces** — right side, X `0.94`, Y `0.46`
- **Exchanges** — right side, X `0.94`, Y `0.54`
- **Network** — left side, X `0.08`, Y `0.52`

These values are intentionally inside the visible 0–1 focused-view interval. The renderer also clamps the actual rendered title bounding box to a viewport margin, which protects longer labels such as MARKETPLACES from clipping.

## Leader behavior

The leader remains visually subordinate to the title and region geometry:

1. Try a horizontal line from the title toward the selected region.
2. If that line intersects visible text, search small vertical offsets while leaving the title fixed.
3. When an offset is needed, use a short technical-chart elbow before continuing horizontally into the region.
4. If no collision-free region connection is available, hide only the leader; never hide the title.

## Preserved automatic placement

Mining, Runes, and Payments were not part of the screenshot correction. Their existing automatic focused-composition behavior remains:

- Mining — fallback right
- Runes — fallback right
- Payments — fallback left

## Publication boundary

Only the Wallets category route is enabled because `/pages/explore-wallets` is the only category Page object confirmed created at this stage.

The remaining seven titles render visually but remain non-navigable until their corresponding Shopify Page objects are created and their URL settings are explicitly configured.

## Active files

- `assets/msc-explore-atlas-callouts-v2.js`
- `assets/msc-explore-atlas-callouts.css`
- `sections/msc-explore-atlas-region-callouts.liquid`
- `scripts/explore-atlas/check-region-callouts.mjs`
- `docs/explore/integration/MSC_Explore_Atlas_Region_Callouts.md`

The previous `assets/msc-explore-atlas-callouts.js` asset is retained for history but is no longer loaded by the Atlas callout section.

No Atlas geography, focus perimeter, category routing, Field Journal, Explore registry, or Learn content is changed by this correction.
