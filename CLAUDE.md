# CLAUDE.md — The Podcast Show London 2026 Website

## The Brief
Rebuild the TPS website. Start by fetching and analysing the current
official site at thepodcastshowlondon.com. That is your core reference.

## The Single Most Important Idea
The Podcast Show London is the global festival for the business of
podcasting. Not a summit. Not a conference. A festival.

That one word — festival — should inform every design and copy decision.
The energy, the vibrancy, the FOMO, the celebration of an industry.
It should feel like something you can't afford to miss.

## Two Conversion Goals (in priority order)
1. Book a pass
2. Enquire about partnership or exhibiting

Every page, every section, every element should serve one of these
two goals or be cut.

## Three Audiences
- Creators: learning, monetisation, community with 2,400+ peers
- Brands & Media: advertising opportunities, meeting agencies
- Platform & Tech: showcasing innovation, accessing decision-makers

## Tone of Voice
Professional informal. Write like a knowledgeable friend, not a
corporate brochure. Confident and direct — no hedging, no filler
phrases. Warm but not gushing. Never colloquial or slangy.
Contractions are fine. Exclamation marks are not. The goal is to make
the reader feel like they're getting a straight answer from someone
who knows the industry inside out.

## Design Direction
- Cannot feel like a complete departure from the current brand
- Must feel cleaner, bolder, and more immediately navigable
- Photography-led with bold typographic statements
- Generous white space — less is more
- No clutter, no visual noise
- Boardmasters (boardmasters.com) as tonal reference — for feeling,
  not layout

## Visual Identity (settled decisions)
- Two-colour identity: canvas (#f7f5f2) + purple (#551fef) + charcoal (#333333)
- Photography and big typography carry the vibrancy
- Wave-dot textures and gradient backgrounds retired from all pages
- Space Grotesk headings + Inter body
- 3-4 background treatments per page max
- Border-radius on section transitions between different bg colours
- See STYLE-GUIDE.md for full design system

## Phase Status
1. Analysis & architecture — COMPLETE (see ARCHITECTURE.md)
2. Homepage — COMPLETE (index.html + styles.css)
3. Homepage dynamic layout pass — COMPLETE (Phase 3 refinement)
4. Inner pages — IN PROGRESS

### Page Build Status

| Page       | File             | Status      | BUILD-LOG | Notes                                    |
|------------|------------------|-------------|-----------|------------------------------------------|
| Homepage   | index.html       | COMPLETE    | Yes       | Phase 3 dynamic layout pass done         |
| Passes     | passes.html      | COMPLETE    | Yes       | Redesigned pricing cards with tiered hierarchy |
| Programme  | programme.html   | COMPLETE    | Yes       | 2025 Highlights + Coming Soon CTA         |
| About      | about.html       | COMPLETE    | Yes       | First page with dynamic layout techniques |
| Partners   | partners.html    | COMPLETE    | No        | Needs BUILD-LOG entry                     |
| Visit      | visit.html       | COMPLETE    | No        | Needs BUILD-LOG entry                     |
| Speakers   | speakers.html    | NOT STARTED | —         |                                           |
| Creators   | creators.html    | NOT STARTED | —         | Audience sub-page                         |
| Brands     | brands.html      | NOT STARTED | —         | Audience sub-page                         |
| FAQ        | faq.html         | NOT STARTED | —         | Reuse accordion pattern from passes page  |
| Blog       | blog.html        | NOT STARTED | —         | Editorial hub, 3-4 seed articles          |
| Contact    | contact.html     | NOT STARTED | —         |                                           |

## Key Build Decisions

These override ARCHITECTURE.md and STYLE-GUIDE.md where they conflict.
For detailed per-page decisions, see BUILD-LOG.md.

### Copy & Naming
- Hero headline uses title case, not uppercase (.hero__title overrides
  the base h1 text-transform: uppercase)
- Venue: "BDC" in short-form, "Business Design Centre" in footer/structured data

### Urgency Bar
- Persistent fixed bar above the nav on every page
- Purple bg, white text, centred copy: "95% of exhibition space for
  2026 is now sold. Enquire Now →" linking to partners.html
- Dismissible (×) — preference stored in `sessionStorage` so it
  doesn't reappear mid-session
- Inline `<script>` in `<head>` adds `.urgency-dismissed` to `<html>`
  before paint to prevent flash on dismissed pages
- `--urgency-bar-h` CSS custom property set by JS — offsets the
  fixed header `top` via `body:has()` selector
- CSS class: `.urgency-bar`, JS in main.js

### Navigation
- Official TPS logo PNGs (in /TPS Logos/), not text wordmark
- White logo on transparent header, purple logo on scroll
- Logo height: 32px mobile, 38px desktop

### Homepage Hero
- 20s aftermovie edit (not full version)
- Two CTAs: "Book Your Pass" (btn--gradient) + "Partner With Us" (btn--ghost-light)

### Homepage Layout (Phase 3 + tweaks)
- 12 sections with 3 isolated purple blocks, 2 full-bleed photo breaks
- Prefix: .home-* for homepage-specific components
- Stats band: purple bg, white numbers, rgba white labels
- Stats count-up targets: `.home-stats__number[data-target]`
- Programme stages: horizontal scroll with snap + right-edge fade
  (was infinite marquee — clone JS removed)
- Pull quote between programme & speakers removed — they flow directly
- Speakers: 10× round circular avatars in 5-col grid (was 6× rectangular
  3:4 portraits). Same visual language as about page advisory panel.
- Testimonials are static
- Section order: Hero → Stats → What is TPS → Photo Break → Audience →
  Programme → Speakers → Testimonials → Photo Break 2 → Partners →
  Pricing → Newsletter
- See BUILD-LOG.md for full colour rhythm and section-by-section decisions

### Assets in Use
- Video: /Video/ (20s edit for hero)
- Logos: /TPS Logos/ (white and purple PNGs)
- Photos: /Photos/ (Audience, Exhibitors, Famous faces)
- Partner logos: Logo Stack _ Version 2_29th Jan.png (root)
- /BoldBishops Backgrounds/ — exist but no longer referenced

### Global CSS Fixes
- `html { scrollbar-gutter: stable }` — prevents hero centering
  offset caused by scrollbar appearing/disappearing
- `p { max-width: 68ch; margin-inline: auto }` — centres the
  constrained paragraph block within centred parents

### Pricing Card System (passes page)
- Charcoal card family with tiered hierarchy via accent colours + shadow
- Order: Platinum → Gold 2-Day → Gold 1-Day → Silver
- Asymmetric grid: `1.3fr 1fr 1fr 0.8fr` (passes page only)
- Platinum: gradient charcoal bg, cyan accents, gradient badge, heavy shadow
- Gold 2-Day: flat charcoal, orange accents (border/badge/name/ticks),
  "Most Popular" badge
- Gold 1-Day: flat charcoal, orange accents at 60% opacity, no badge
- Silver: translucent, 50% opacity, dashed border, struck-through price,
  no CTA button — "Sold Out" label styled as muted ghost button
- All cards share equal height (stretch), matching top padding, feature
  divider lines, and badge sizing
- Homepage cards unchanged — uses `:not()` fallback + `--featured` variant
- Modifier classes: `--platinum`, `--popular`, `--gold`, `--soldout`

### Button Styles
- `.btn--gradient`: coral→pink→purple. ::before pseudo-element hover.
- `.btn--ghost-light`: transparent with translucent white border.

### CSS Variables
- `--colour-canvas: #f7f5f2`

### Accent Colour Rules (per background type)
- On charcoal → cyan (or orange for Gold pass tiers, yellow for evening/night sections)
- On purple → cyan
- On canvas/white → purple

## Shared Design System

All inner pages must use these shared components from styles.css —
do not create page-specific duplicates.

- **.page-hero** — 60vh, photo bg, dark overlay (homepage keeps .hero)
- **.section-header** — Centred title + subtitle. Variants: --light
  (white on dark), --dark (dark on light), --left (left-aligned)
- **.glass-card** — Translucent card for dark/vibrant backgrounds
- **.card** — White card for vibrant backgrounds
- **.cta-strip__inner** — Centred CTA block (add .text-white on dark bgs)
- **.tag / .tag-pill / .badge** — Label sizing system
- Focus: cyan on dark/vibrant, purple on light backgrounds

### Dynamic Layout Techniques (used on Homepage + About)
Avoid formulaic centred-section layouts. Use 2-3 of these per page
to break the rhythm and keep things feeling like a festival:

- **Asymmetric splits** — e.g. 55/45 grid with text one side, pull
  quote or image the other. Not always 50/50. (Homepage "What is TPS",
  About "Our Story")
- **Full-bleed photo breaks** — edge-to-edge image, no overlay, no
  text, no container. A visual pause between content sections.
  (Homepage ×2, About ×1)
- **Pull quotes** — oversized purple text on canvas background with
  large translucent speech mark. Breathing room between purple blocks.
  (About page story section — removed from homepage)
- **Round avatar grids** — circular profile images in 5-col grid.
  Compact speaker/people showcase. (Homepage speakers: 10× round,
  About advisory panel: 10× round)
- **Static portrait grids** — rectangular card grid (3:4 ratio) as
  alternative to marquee/carousel. Different rhythm from animated
  components. (Available for use on inner pages)
- **Quote grids** — 3-col blockquote grid with border-left accents.
  More content visible than a single rotating carousel. (Homepage
  testimonials, About press)
- **Left-aligned sections** — not every section header needs to be
  centred. Left-align headers with purple accent bar above h2.
- **Bold stat bands** — large clamped font-size numbers on coloured
  backgrounds. Grid layout, not flex (flex causes overlap).
- **Staggered cards** — offset cards vertically with margin-top on
  alternating items. (About founders only — avoid on equal-weight
  items like audience cards)

### Colour Rhythm Principle
Avoid consecutive purple sections. Each purple block should be
isolated (all corners rounded) with canvas or full-bleed photo
breathing room between them. Three purple blocks per page max.
Social proof sections (testimonials/press + partners) should sit on
canvas before conversion sections (pricing) for funnel logic.
Homepage order: testimonials → photo break → partners → pricing.

### When Building a New Page
1. Copy urgency bar + nav/header/footer from any existing inner page
2. Include the inline sessionStorage script in `<head>` after styles.css
3. Add `class="active"` to the matching nav link
3. Use `.page-hero` for the hero
4. Use `.section-header` (correct variant) for every section title
5. Use `.glass-card` or `.card` — don't create new card types
6. Use `.cta-strip__inner` for CTA sections
7. Follow accent colour rules above
8. Both CTAs (book + partner) in nav and hero of every page
9. Prefix page-specific styles (e.g. .passes-*, .prog-*, .about-*)
10. FAQ accordion uses native `<details>`/`<summary>` elements
11. Vary layout rhythm — use at least 2 dynamic techniques per page
12. Alternate section alignments (left, centre, split, full-bleed)

## Technical Rules
- Work in this project folder only:
  `/Users/mrcharliepalmer/Documents/Work/Red Slash Studio/The Podcast Show/podcast-show-redesign-v2`
- No branches, no worktrees
- Single HTML file per page, shared styles.css
- No JavaScript frameworks — vanilla JS only
- Fully responsive — mobile first
- Every page needs: page title, meta description, OG tags, JSON-LD

## Before Touching Any Code
1. Read this file completely
2. Read ARCHITECTURE.md for page structure and content inventory
3. Read STYLE-GUIDE.md for the visual design system
4. Read BUILD-LOG.md for detailed per-page decisions
5. Check what's already built before writing anything new

## AI Discoverability
- Every page needs a clear, descriptive meta description
- JSON-LD structured data for the event
- Dedicated FAQ page with real questions people ask about TPS
- Blog/editorial hub planned (even 3-4 seed articles)
- Copy that answers questions, not just describes features
