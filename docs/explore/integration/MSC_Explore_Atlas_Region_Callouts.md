# MSC Explore Atlas — Region Callout Navigation

## Scope

This implementation adds the focused Atlas region title treatment requested during visual review without rewriting the approved Atlas geography or focus behavior.

## Interaction

- Hovering/focusing a bottom region control or moving onto a map region keeps the existing preview zoom behavior.
- The large category name now begins rendering during the zoom animation instead of waiting until the 420 ms camera move has finished.
- The callout is positioned once during the zoom and then settled again against the final focused viewBox so preview and locked states use the same reviewed composition.
- Clicking the region or bottom control still locks the zoom, and the same category callout remains visible in the locked state.
- The category name remains at 3× the destination-label type scale.
- The leader runs horizontally from the category title toward the selected region and terminates just inside the region hit geometry.
- Before display, the title and leader are tested against visible SVG text. A lane is rejected if it would cross another destination or chart label.
- Returning to the full overview removes the large category callout.

## Screenshot-reviewed title placement

The live screenshots showed that locking only a title side and vertical lane was not enough: reviewed titles could still sit too far toward the generic viewport edge. Five regions therefore use explicit focused-view **X and Y anchors**.

- **Ordinals** — right-side anchor pulled inward and slightly upward from the previous detached placement.
- **Wallets** — left-side anchor moved upward so the title aligns with the Wallets territory rather than the lower ocean area.
- **Marketplaces** — right-side anchor kept slightly above center and pulled inward toward the region.
- **Exchanges** — right-side anchor kept slightly above center and pulled inward toward the region.
- **Network** — left-side anchor moved upward so the title aligns with the broad central Network territory.

Collision handling may still make a vertical adjustment when required to preserve the strict no-text-crossing rule, but it no longer changes the reviewed side or horizontal anchor for these five regions. Reviewed callouts may use a shorter restrained leader when the explicit title anchor is already close to the region.

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
