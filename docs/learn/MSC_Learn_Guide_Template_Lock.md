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

Guides 002–004 established the first controlled rollout. Guides 005–008 extended the same locked implementation through the `Using Bitcoin` subcategory. Guides 009–012 extended it through the `Security` subcategory. Guides 013–016 completed the 16-guide Bitcoin Basics category through `Essentials`. Guides 017–032 extend the same locked system through all four `The Bitcoin Network` subcategories — `Mining`, `Nodes`, `Network`, and `Consensus` — without changing the visual contract. Guides 033–048 extend that same locked system through the complete `Building on Bitcoin` category without changing the visual contract.

The Bitcoin Basics hub cards for Guides 001–016, The Bitcoin Network hub cards for Guides 017–032, and Building on Bitcoin hub cards for Guides 033–048 are active in preview. The visible sequence is wired continuously through all three categories:

`001 → 002 → 003 → 004 → 005 → 006 → 007 → 008 → 009 → 010 → 011 → 012 → 013 → 014 → 015 → 016 → 017 → 018 → 019 → 020 → 021 → 022 → 023 → 024 → 025 → 026 → 027 → 028 → 029 → 030 → 031 → 032 → 033 → 034 → 035 → 036 → 037 → 038 → 039 → 040 → 041 → 042 → 043 → 044 → 045 → 046 → 047 → 048`

Guide 016 continues into Guide 017 on `The Bitcoin Network`. Guide 032 now continues into Guide 033 on `Building on Bitcoin`. Guide 048 previews Guide 049 — **What Is Bitcoin Core?** — but does not activate it until the next category rollout exists.

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
- Guide 017: `?view=msc-learn-guide-017`
- Guide 018: `?view=msc-learn-guide-018`
- Guide 019: `?view=msc-learn-guide-019`
- Guide 020: `?view=msc-learn-guide-020`
- Guide 021: `?view=msc-learn-guide-021`
- Guide 022: `?view=msc-learn-guide-022`
- Guide 023: `?view=msc-learn-guide-023`
- Guide 024: `?view=msc-learn-guide-024`
- Guide 025: `?view=msc-learn-guide-025`
- Guide 026: `?view=msc-learn-guide-026`
- Guide 027: `?view=msc-learn-guide-027`
- Guide 028: `?view=msc-learn-guide-028`
- Guide 029: `?view=msc-learn-guide-029`
- Guide 030: `?view=msc-learn-guide-030`
- Guide 031: `?view=msc-learn-guide-031`
- Guide 032: `?view=msc-learn-guide-032`
- Guide 033: `?view=msc-learn-guide-033`
- Guide 034: `?view=msc-learn-guide-034`
- Guide 035: `?view=msc-learn-guide-035`
- Guide 036: `?view=msc-learn-guide-036`
- Guide 037: `?view=msc-learn-guide-037`
- Guide 038: `?view=msc-learn-guide-038`
- Guide 039: `?view=msc-learn-guide-039`
- Guide 040: `?view=msc-learn-guide-040`
- Guide 041: `?view=msc-learn-guide-041`
- Guide 042: `?view=msc-learn-guide-042`
- Guide 043: `?view=msc-learn-guide-043`
- Guide 044: `?view=msc-learn-guide-044`
- Guide 045: `?view=msc-learn-guide-045`
- Guide 046: `?view=msc-learn-guide-046`
- Guide 047: `?view=msc-learn-guide-047`
- Guide 048: `?view=msc-learn-guide-048`

These views are QA routes, not canonical guide URLs.

## Publication boundary

Guides 001–048 remain preview-bound runtimes until real Shopify publication records and canonical URLs exist. This template lock and rollout do not create Shopify Page objects, publish canonical guide URLs, or activate planned editorial links inside guide content.
