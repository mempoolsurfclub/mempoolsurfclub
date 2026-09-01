# MSC Learn Guide Template Lock

Status: LOCKED

Reference implementation: `MSC-GUIDE-001` — **What Is Bitcoin?**

Lock date: 2026-09-01

## Purpose

This document freezes the approved Mempool Surf Club topic-guide reading experience. Guide 001 is the visual and structural reference. Every additional topic guide must inherit the shared template rather than receive an independent page redesign.

## Shared implementation

- Shopify template: `templates/page.msc-learn-guide.json`
- Shared section: `sections/msc-learn-guide.liquid`
- Shared topic-guide stylesheet: `assets/msc-learn-guide-template.css`
- Shared Next Guide component: `snippets/msc-learn-guide-transition.liquid`
- Structured Guide 001 runtime: `snippets/msc-learn-guide-001-runtime.liquid`
- Controlled guide rollout materializer: `scripts/generate-msc-learn-guide-rollout.mjs`
- Template drift validation: `scripts/validate-msc-learn-guide-template.mjs`
- Rollout validation: `scripts/validate-msc-learn-guide-rollout.mjs`

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

Guides 002–004 established the first controlled rollout. Guides 005–008 extended the same locked implementation through the `Using Bitcoin` subcategory. Guides 009–012 extended it through the `Security` subcategory. Guides 013–016 extend the same system through `Essentials` and complete the 16-guide Bitcoin Basics category without changing the visual contract.

The Bitcoin Basics hub cards for Guides 001–016 are active in preview. The visible sequence is wired:

`001 → 002 → 003 → 004 → 005 → 006 → 007 → 008 → 009 → 010 → 011 → 012 → 013 → 014 → 015 → 016`

Guide 016 previews Guide 017 — **How Bitcoin Mining Works** — but does not activate it. Guide 017 belongs to the next category rollout, `The Bitcoin Network`.

Current preview views:

- Guide 001: `?view=msc-learn-guide`
- Guide 002: `?view=msc-learn-guide-002`
- Guide 003: `?view=msc-learn-guide-003`
- Guide 004: `?view=msc-learn-guide-004`
- Guide 005: `?view=msc-learn-guide-005`
- Guide 006: `?view=msc-learn-guide-006`
- Guide 007: `?view=msc-learn-guide-007`
- Guide 008: `?view=msc-learn-guide-008`
- Guide 009: `?view=msc-learn-guide-009`
- Guide 010: `?view=msc-learn-guide-010`
- Guide 011: `?view=msc-learn-guide-011`
- Guide 012: `?view=msc-learn-guide-012`
- Guide 013: `?view=msc-learn-guide-013`
- Guide 014: `?view=msc-learn-guide-014`
- Guide 015: `?view=msc-learn-guide-015`
- Guide 016: `?view=msc-learn-guide-016`

These views are QA routes, not canonical guide URLs.

## Publication boundary

Guides 001–016 remain preview-bound runtimes until real Shopify publication records and canonical URLs exist. This template lock and rollout do not create Shopify Page objects, publish canonical guide URLs, or activate planned editorial links inside guide content.
