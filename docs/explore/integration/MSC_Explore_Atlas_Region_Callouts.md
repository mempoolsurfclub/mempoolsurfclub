# MSC Explore Atlas — Region Callout Navigation

## Scope

This implementation adds the focused Atlas region title treatment requested during visual review without rewriting the approved Atlas geography or focus behavior.

## Interaction

- Hovering/focusing a bottom region control or moving onto a map region keeps the existing preview zoom behavior.
- As soon as a region is the active zoomed view, its large category name appears; a click is not required first.
- Clicking the region or bottom control still locks the zoom, and the same category callout remains visible in the locked state.
- The category name remains at 3× the destination-label type scale.
- The leader runs horizontally from the category title toward the selected region and terminates just inside the region hit geometry.
- Before display, the title and leader are tested against visible SVG text. A lane is rejected if it would cross another destination or chart label.
- Returning to the full overview removes the large category callout.

## Screenshot-reviewed title placement

The latest live screenshots showed five titles drifting away from their intended chart composition. Those five placements are now explicit instead of being allowed to change sides or start from a generic region-center bias:

- **Ordinals** — right side, vertically centered in the focused view.
- **Wallets** — left side, vertically centered in the focused view.
- **Marketplaces** — right side, slightly above center to keep the leader clear of the marketplace labels.
- **Exchanges** — right side, slightly above center to align with the open water beside the region.
- **Network** — left side, just below center to align with the broad central Network territory.

These are treated as reviewed visual placements. Collision handling can make a small vertical adjustment if necessary, but it no longer lets these five titles migrate to the opposite side or drift far from the reviewed lane.

## Preserved automatic placement

Mining, Runes, and Payments were not part of this correction. Their existing automatic focused-composition behavior remains unchanged:

- Mining — reviewed fallback right.
- Runes — reviewed fallback right.
- Payments — reviewed fallback left.

## Publication boundary

Only the Wallets category route is enabled because `/pages/explore-wallets` is the only category Page object confirmed created at this stage.

The remaining seven callouts render visually but remain non-navigable until their corresponding Shopify Page objects are created and their URL settings are explicitly configured. This prevents dead Atlas links.

## Files

- `assets/msc-explore-atlas-callouts.js`
- `scripts/explore-atlas/check-region-callouts.mjs`
- `docs/explore/integration/MSC_Explore_Atlas_Region_Callouts.md`

No Atlas geography, focus-perimeter, template routing, Field Journal, Explore registry, or Learn files are changed by this correction.
