# MSC Explore Atlas — Fixed Region Navigation Card

## Objective

Provide a simple category-page navigation affordance after a user deliberately selects an Atlas region, without placing navigation labels or leader lines inside the SVG geography.

## Interaction

- The overview and hover-preview states do not show the card.
- Clicking either a map region or its bottom region control uses the existing Atlas lock behavior.
- When the Atlas state becomes `locked`, one fixed card appears in the lower-left corner of the map viewport.
- The card does not move with the SVG viewBox and does not use any region-coordinate calculations.
- Unlocking the region or returning to the overview hides the card.
- The same fixed position is used for all eight categories.

## Card content

Each card contains a category title and concise subtitle:

- Ordinals — Explore Ordinals and inscriptions
- Runes — Explore the Runes ecosystem
- Wallets — Explore wallets and signing tools
- Marketplaces — Explore Bitcoin-native marketplaces
- Mining — Explore Bitcoin mining
- Payments — Explore Bitcoin payments
- Exchanges — Explore Bitcoin exchanges
- Network — Explore Bitcoin network infrastructure

The entire card becomes a link when the corresponding clean Shopify Page route has been created and configured.

## Current publication boundary

Only Wallets is enabled because `/pages/explore-wallets` is the only confirmed category Page object at this stage.

The other seven cards still appear when their regions are locked, but remain non-navigable until their Page objects exist. This avoids dead links while preserving the final interaction pattern.

## Visual treatment

The card is an HTML overlay inside the Atlas viewport, styled as part of the existing MSC widget system:

- fixed lower-left placement
- dark teal translucent background
- muted sand border
- cream title typography
- sand subtitle and arrow treatment
- restrained hover/focus treatment
- responsive lower-left placement on mobile

There are no leader lines, SVG title overlays, path routing, `getBBox()` placement, or geography-specific coordinates.

## Scope

Files introduced or updated for this feature are limited to the region-card UI, its template mount, validation, workflow coverage, and this integration note. Atlas geography, zoom calculations, focus perimeters, destination labels, Field Journal, Explore registries, Wallets category implementation, and Learn remain unchanged.
