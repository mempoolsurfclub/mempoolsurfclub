# MSC Explore Atlas — Region Callout Navigation

## Scope

This implementation adds the focused Atlas region title treatment requested during visual review without rewriting the approved Atlas geography or focus behavior.

## Interaction

- Hovering/focusing a bottom region control or moving onto a map region keeps the existing preview zoom behavior.
- As soon as a region is the active zoomed view, its large category name appears; a click is not required first.
- Clicking the region or bottom control still locks the zoom, and the same category callout remains visible in the locked state.
- The category name remains at 3× the destination-label type scale.
- The leader runs horizontally from the end of the category name and terminates just inside the selected region.
- Before display, the title and leader are tested against visible SVG text. Alternate vertical lanes are tried when a destination or chart label would be crossed.
- Returning to the full overview removes the large category callout.

## Region alignment

Callout placement is checked against the actual focused composition rather than using one fixed side for every view:

- if the selected region occupies the right side of the focused view, the category title is placed on the left;
- if the selected region occupies the left side, the category title is placed on the right;
- centered regions use a reviewed per-region fallback side;
- the preferred vertical lane starts from the selected region's actual focused center, then moves only when needed to avoid map text;
- the leader is kept horizontal so the title and selected territory read as one aligned chart annotation.

Reviewed fallback composition remains explicit for all eight regions: Mining right, Ordinals right, Runes right, Wallets left, Marketplaces left, Payments left, Exchanges left, and Network left. These are fallbacks only; actual focused geography can select the opposite side where the current zoom composition requires it.

## Publication boundary

Only the Wallets category route is enabled because `/pages/explore-wallets` is the only category Page object confirmed created at this stage.

The remaining seven callouts render visually but remain non-navigable until their corresponding Shopify Page objects are created and their URL settings are explicitly configured. This prevents dead Atlas links.

## Files

- `assets/msc-explore-atlas-callouts.js`
- `assets/msc-explore-atlas-callouts.css`
- `sections/msc-explore-atlas-region-callouts.liquid`
- `templates/page.explore.json`
- `scripts/explore-atlas/check-region-callouts.mjs`
- `.github/workflows/explore-validation.yml`

No Atlas geography, focus-perimeter, Field Journal, Explore registry, or Learn files are changed by this implementation.
