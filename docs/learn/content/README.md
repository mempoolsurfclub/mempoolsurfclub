# MSC Learn editorial content workspace

This directory is the non-runtime editorial workspace for MSC Learn destination copy. It does not replace the approved registry, generated Liquid data, JSON templates, the Learn homepage, Explore, Shopify pages, or any runtime theme files.

## Permanent destination files

Each Learn destination gets one permanent content file listed in `content-manifest.json`. Do not create duplicate drafts for the same `registry_id`; update the existing destination file through review instead.

## Status progression

Use this editorial status flow:

1. `PLANNED` — destination exists in the manifest but copy is not approved.
2. `DRAFTING` — a copywriter is actively drafting the destination.
3. `EDITORIAL_REVIEW` — editorial is reviewing structure, accuracy, sources, and internal-link intent.
4. `ACCURACY_REVIEW` — human verification is complete or underway.
5. `COPY_LOCKED` — approved copy is locked and ready for implementation planning.
6. `IMPLEMENTED` — Codex has implemented approved locked copy in the appropriate runtime location after approval.

`MSC-GUIDE-001` starts as `COPY_LOCKED`. Every other destination starts as `PLANNED`.

## Four-guide subcategory batches

Topic guides should move through drafting and review in four-guide subcategory batches matching the approved registry order. Keep each batch aligned with its category hub and do not skip prerequisite context without editorial approval.

## Draft pull request workflow

Open draft pull requests for editorial package changes. A draft PR may update files in this workspace only. Do not include generated Learn data, Liquid files, JSON templates, Shopify page records, the Learn homepage, Explore, or runtime theme changes in editorial drafting PRs.

## Copywriter responsibilities

Copywriters draft article copy, decks, key terms, source notes, SEO fields, excerpts, reading-time estimates, planned internal links, and illustration briefs inside the assigned destination file. Copywriters must preserve registry metadata and avoid activating planned links before real pages exist.

## Editorial review responsibilities

Editorial reviewers verify that drafts match the approved registry, maintain the assigned reader intent, include adequate sourcing, follow the status progression, and keep planned links inactive until real destination pages exist.

## Codex implementation responsibilities

Codex may create workspace structure, templates, manifests, and implementation PRs from approved locked copy. Codex must not rewrite article copy, invent missing article copy, activate planned links before real pages exist, create Shopify pages, or publish Learn destinations during editorial drafting.

## No article rewriting by Codex

Codex must preserve approved locked copy exactly. If copy is missing, stale, or contradictory, Codex should flag the issue instead of rewriting it.

## No Shopify publishing during drafting

Editorial drafting in this directory must not create, publish, or modify Shopify pages. Runtime publishing is a separate approval step after copy is locked.
