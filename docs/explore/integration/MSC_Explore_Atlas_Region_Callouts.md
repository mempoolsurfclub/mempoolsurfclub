# MSC Explore Atlas — Region Callout Navigation

## Scope

This implementation adds the focused Atlas region title treatment requested during visual review without rewriting the approved Atlas geography or focus behavior.

## Interaction

- Hovering/focusing a bottom region control or moving onto a map region keeps the existing preview zoom behavior.
- The large category name begins rendering during the zoom animation instead of waiting until the 420 ms camera move has finished.
- The callout is positioned during the zoom and settled again against the final focused viewBox so preview and locked states use the same composition.
- Clicking the region or bottom control still locks the zoom, and the same category callout remains visible in the locked state.
- The category name remains at 3× the destination-label type scale.
- The leader runs horizontally from the category title toward the selected region and terminates just inside the region hit geometry.
- Before display, the title and leader are tested against visible SVG text. The marked lane is rejected rather than rerouted if it would cross another destination or chart label.
- Returning to the full overview removes the large category callout.

## Final screenshot-pinned title placement

The user supplied a final marked screenshot set for Network, Exchanges, Marketplaces, Wallets, and Ordinals. Those marks are now the placement source of truth. The five reviewed regions use explicit focused-view **X and Y anchors** and are no longer allowed to drift vertically through the generic candidate search.

- **Network** — title moved down and far left into the marked open-water box; leader exits the right side of the word and runs into the Network region.
- **Exchanges** — title moved farther right and slightly down into the marked box; leader approaches from the left and enters the Exchanges region.
- **Marketplaces** — title moved farther right and lower into the marked box; leader approaches from the left and enters the Marketplace region.
- **Wallets** — title moved down and slightly inward into the marked left-side box; leader exits the right side and enters the Wallets region.
- **Ordinals** — title remains on the right at the marked vertical level; the horizontal leader occupies the marked lane to the left of the title and enters the Ordinals region.

The explicit reviewed anchors are:

- Ordinals: side `right`, X `0.82`, Y `0.44`
- Wallets: side `left`, X `0.13`, Y `0.51`
- Marketplaces: side `right`, X `1.08`, Y `0.50`
- Exchanges: side `right`, X `1.03`, Y `0.58`
- Network: side `left`, X `-0.08`, Y `0.57`

Values outside the 0–1 horizontal viewBox interval intentionally use the available horizontal SVG viewport margin created by `preserveAspectRatio="xMidYMid meet"`; this matches the marked open-water placements rather than forcing titles back toward the generic focused-map edge.

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
