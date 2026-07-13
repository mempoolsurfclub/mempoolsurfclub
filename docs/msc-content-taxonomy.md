# MSC Content Taxonomy

This is the source of truth for Mempool Surf Club editorial publishing tasks. The Explore page uses one selected Shopify blog plus article tags to route published content automatically. Learn content is separate and does not use this editorial taxonomy.

## Primary editorial categories

Every editorial article should usually have exactly one primary category tag. Use exact Shopify article tags; do not rely on partial matches.

1. **Interviews** — direct conversations with artists, founders, builders, miners, content creators, and other ecosystem participants.
2. **Highlights** — focused coverage of businesses, projects, collections, launches, products, protocols, and notable work.
3. **Weekly Recaps** — Friday coverage of weekly volume, new releases, important updates, and major ecosystem developments.
4. **Community** — coverage of content creators, YouTube videos, podcasts, collectors, educators, and other people contributing valuable work to the ecosystem.
5. **Breaking News** — time-sensitive developments that should appear immediately in front-facing feeds but stop being treated as breaking after 48 hours by default.

If an article accidentally has multiple primary tags, Explore uses this deterministic visible-label precedence: Breaking News, Weekly Recaps, Interviews, Highlights, Community. This precedence does not change chronological sorting.

## Secondary subject and routing tags

Secondary tags provide subject context and can route one article into multiple relevant site areas. An article may carry several secondary tags. Secondary tags are not additional primary categories, and the list can be extended without rewriting the main article-feed system.

Initial canonical secondary tags:

- Ordinals
- Runes
- Artist
- Founder
- Builder
- Miner
- Mining
- Content Creator
- Company
- Project
- Collection
- Protocol
- Marketplace
- Wallet
- Developer
- Collector
- Podcast
- YouTube

Use singular canonical routing tags such as Artist, Founder, Company, Project, and Miner. Do not mix inconsistent variants such as Artist and Artists for the same routing purpose.

## Explore routing rules

- All automatic Explore feeds read from the single blog selected in the Explore section theme settings.
- All automatic feeds use `article.published_at` descending, so the newest qualifying article appears first.
- Stories accepts articles with one official primary category tag.
- People Behind the Current accepts articles that have one official primary category tag and at least one configured Culture Index routing tag.
- Weekly Recaps accepts articles with the Weekly Recaps primary tag.
- Weekly Recaps may also appear in Stories when their publication date places them there.
- Breaking News appears in front-facing Explore feeds only while its age from `article.published_at` is less than or equal to the configured window. The default is 48 hours; exactly at the cutoff remains visible, and it is excluded once the age exceeds the window.
- Expired Breaking News remains published, searchable, available by direct URL, included in the selected blog, and included in its permanent Shopify tag archive.
- Non-Breaking categories do not expire.

## Publishing workflow

1. Publish one Shopify blog article in the selected editorial blog.
2. Add exactly one primary category tag.
3. Add any relevant secondary subject/routing tags.
4. The article routes automatically into every qualifying Explore section.
5. No manual theme-card creation or rearranging is required.

## Examples

- Artist interview: Interviews, Artist, Ordinals.
- YouTube creator feature: Community, Content Creator, YouTube, Runes.
- Mining-company coverage: Highlights, Company, Mining.
- Urgent protocol development: Breaking News, Protocol, Ordinals.
- Friday ecosystem report: Weekly Recaps, Ordinals, Runes, Mining.
- Highlights project coverage: Highlights, Project, Ordinals.
