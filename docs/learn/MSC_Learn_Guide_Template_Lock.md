# MSC Learn Guide Template Lock

Status: LOCKED

Reference implementation: `MSC-GUIDE-001` — **What Is Bitcoin?**

Lock date: 2026-09-01

## Purpose

This document freezes the approved Mempool Surf Club topic-guide reading experience before additional Learn guides are activated. Guide 001 is the visual and structural reference. Future topic guides must inherit the shared template rather than receive independent page redesigns.

## Shared implementation

- Shopify template: `templates/page.msc-learn-guide.json`
- Shared section: `sections/msc-learn-guide.liquid`
- Shared topic-guide stylesheet: `assets/msc-learn-guide-template.css`
- Shared Next Guide component: `snippets/msc-learn-guide-transition.liquid`
- Existing structured Guide 001 runtime: `snippets/msc-learn-guide-001-runtime.liquid`
- Template drift validation: `scripts/validate-msc-learn-guide-template.mjs`

The historical `assets/msc-learn-guide.css` file records the earlier Guide-001-only pilot styling but is no longer loaded by the shared guide section. Do not use it as the rollout stylesheet.

## Locked visual contract

The following Guide 001 decisions are the shared topic-guide template:

- Deep teal MSC reading surface with muted sand/cream hierarchy and the established subtle grid texture.
- Wide glass hero with the current padding, border, radius, shadow, deck width, metadata pills, and typography.
- No generic hero decorations. A future MSC logo watermark remains deferred until the exact approved asset is supplied.
- Article column remains centered and becomes `100rem` wide on tablet/desktop; mobile remains full-width inside the page container.
- `STARTING POINT` opens the article.
- Article subsections retain automatic two-digit numbering, sand headings, divider rhythm, paragraph scale, and current line height.
- Key Terms retains the three-column desktop grid and single-column mobile treatment.
- Sources retains the current two-column desktop record layout and single-column mobile treatment.
- The legacy completion/navigation sentinel remains visually hidden at the true bottom of the runtime so progress is not completed prematurely.

## Locked Next Guide transition

The visible Next Guide transition:

- appears immediately above Key Terms;
- uses the approved hub transition visual language;
- includes `NEXT GUIDE · ###`, the next guide title, and a short source-derived teaser;
- includes category progress, completed count, remaining count, and the grouped progress strip;
- uses the Guide 001 title spacing (`.4rem`) and eyebrow size (`1.6rem`);
- keeps the approved desktop left/right proportions;
- remains inactive until the destination exists;
- becomes a whole-card link when active;
- changes only the outer card border/stroke on hover or keyboard focus;
- must not introduce linked-title styling, underlines, a `Read guide` CTA, title color changes, background changes, lifts, or unrelated animation.

Guide 080 terminal behavior remains intentionally undecided and must be resolved before the final guide is activated.

## Rollout rule

Content changes by guide. The template does not.

When Guides 002–080 are activated, preserve this shared structure and styling. Add only the guide-specific runtime binding, copy-locked content, next-guide data, progress data, and eventual confirmed destination URL. Do not fork the stylesheet or add per-guide inline CSS to solve ordinary title or content-length differences.

The first rollout QA batch is Guides 002–004. It must test long titles, article length variation, responsive behavior, Key Terms, Sources, and transition content against Guide 001 without redesigning the template.

## Publication boundary

Guide 001 remains a preview-bound runtime until real Shopify publication records and canonical URLs exist. This template lock does not create Shopify Page objects, activate unpublished links, or establish canonical production URLs.
