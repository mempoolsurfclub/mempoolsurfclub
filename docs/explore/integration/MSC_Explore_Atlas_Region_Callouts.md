# MSC Explore Atlas — Region Callout Navigation

## Scope

This implementation adds the focused Atlas region title treatment requested during visual review without rewriting the approved Atlas geography or focus behavior.

## Interaction

- Selecting either an Atlas region or its bottom navigation control keeps the existing locked zoom behavior.
- In the locked state, the selected category name appears inside the map at 3× the destination-label type scale.
- Western regions place the category title on the right; eastern regions place it on the left.
- The leader terminates just inside the selected region.
- Before display, the title and leader are tested against visible SVG text. Alternate vertical lanes are tried when a destination label would be crossed.
- Hover-only preview does not show the large category callout.

## Region composition

- Mining — right
- Ordinals — right
- Runes — right
- Wallets — left
- Marketplaces — left
- Payments — left
- Exchanges — left
- Network — left

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
