# BUILD-LOG.md — Detailed Per-Page Decisions

This file captures detailed build decisions for each completed page.
Consult it when building a new page that needs a similar pattern.

---

## Global Components

### Urgency Bar

Present on every page. Fixed bar above the nav promoting exhibition
space scarcity — serves conversion goal #2 (partnership enquiries).

**Implementation**
- HTML: `<div class="urgency-bar" id="urgency-bar" role="status">`
  placed between skip-link and `<header>` on every page
- Copy: "95% of exhibition space for 2026 is now sold. Enquire Now →"
  with link to partners.html
- Dismissible × button (`.urgency-bar__close`)
- Inline `<script>` in `<head>` (after styles.css) checks
  `sessionStorage('urgency-dismissed')` and adds `.urgency-dismissed`
  to `<html>` before paint — prevents flash on returning pages
- main.js: measures bar height → sets `--urgency-bar-h` CSS custom
  property → header `top` offset via `body:has()` selector.
  On dismiss: sets `sessionStorage`, hides bar, resets offset.

**Styling**
- Purple bg (`--colour-purple`), white text, z-index 101
- Header pushed down via `html:not(.urgency-dismissed)
  body:has(.urgency-bar:not(.is-hidden)) .site-header { top: var(--urgency-bar-h) }`
- Mobile: 13px text, extra right padding for × button
- Desktop (768px+): 14px text, centred padding

**New page checklist item**: copy the urgency bar `<div>` and the
inline `<head>` script from any existing page.

---

## Homepage (index.html)

### Colour Rhythm
1. Hero — dark video overlay (100vh)
2. Stats — purple bg (white count-up numbers, rgba white labels)
3. Back for Our Fifth Year — transparent on canvas (55/45 asymmetric split, tighter BDC frontage photo)
4. Photo Break — full-bleed edge-to-edge image (visual pause)
5. Pricing — purple (all corners rounded, isolated block)
6. Where the Industry Comes Together — transparent on canvas (white cards with photos)
7. Programme (stages only) — purple (top corners rounded, bottom flat → flows into sessions)
8. A Taste of What to Expect — purple (no top radius, bottom corners rounded — glass session cards, canonical stage tag colours)
9. New for 2026 — transparent on canvas (split layout: big headline left, 4 charcoal cards with photos right)
10. Speakers — purple (all corners rounded, isolated block, centred header)
11. TPS After Hours — charcoal (hero-style party photo with overlay, centred title + body)
12. Testimonials — transparent on canvas (3-col quote grid, purple accents)
13. Photo Break 2 — full-bleed edge-to-edge image (visual pause)
14. Partners — transparent on canvas (logo stack image)
15. Newsletter — charcoal (rounded top corners, flows into footer)
16. Footer — charcoal

### Homepage Redesign (Phase 3 — dynamic layout pass)

**Design Philosophy**
- Two-colour identity: canvas + purple. Photography, typography,
  and cards provide all the visual energy.
- Boardmasters-style restraint: 3-4 background treatments max.
- Dynamic layout techniques (from About page) applied to homepage:
  full-bleed photo breaks, asymmetric splits, pull quotes, static
  grids. Every section feels different.
- Three isolated purple blocks (Programme, Speakers, Pricing) with
  canvas breathing room between them. Avoids "purple fatigue".
- Conversion funnel: social proof (testimonials) immediately before
  pricing for maximum impact.

**Structural Changes (vs Phase 2)**
- **Stats**: Purple bg with white count-up numbers and rgba(255,255,255,0.75)
  labels. `clamp(2.5rem, 10vw, 3.5rem)` mobile / `clamp(3.5rem, 5vw, 5rem)`
  desktop. `min-height: 1em` prevents label jiggle during count-up.
  Count-up animation via IntersectionObserver (ease-out cubic, 1.8s).
- **Back for Our Fifth Year** (was "What is TPS"): 55fr/45fr asymmetric
  CSS Grid split. Text left, photo right. More visual tension.
- **Photo Break**: New. Full-bleed edge-to-edge image between
  "What is TPS" and Audience Cards. 45vh (min 280px, max 500px),
  object-fit: cover. No overlay, no text — a visual pause.
- **Audience cards**: Photos replaced SVG icons. Each card has real
  event photo (aspect-ratio: 16/9). Cards on canvas, not gradient.
  No stagger offset — equal visual weight for all 3 audiences.
- **Programme**: Now an isolated rounded block (all corners) instead
  of rounded-top-only continuous purple. Glass-card marquee style.
- **Pull Quote**: New. Canvas bg, oversized purple quote text with
  large speech mark (opacity 0.25). Between Programme and Speakers.
  Provides canvas breathing room between purple blocks.
- **Speakers**: Replaced horizontal marquee with static 6-column
  portrait grid. Rectangular cards (3:4 aspect ratio), not circular
  marquee. Isolated rounded purple block (all corners).
  Responsive: 2-col mobile → 3-col tablet → 6-col desktop.
- **Photo Break 2**: New. Second full-bleed image between Speakers
  and Testimonials. Same treatment as Photo Break 1.
- **Testimonials**: Replaced single rotating carousel with 3-column
  quote grid (About page "What the Industry Says" style). Canvas bg
  with charcoal text, purple border-left accents, purple cites.
  Now positioned before Pricing (social proof → conversion).
- **Pricing**: Now isolated purple block (all corners rounded).
  Moved after Testimonials for better conversion flow.
- **Partners**: On canvas (transparent). Split header —
  heading left, CTA right (desktop). Stacks on mobile.
- **Newsletter**: Charcoal with rounded top corners → footer.

**Layout Dynamism**
- **Full-bleed photo breaks** (×2): edge-to-edge images as visual
  pauses. Break up content-heavy sections.
- **55/45 asymmetric split**: "What is TPS" section. More dynamic
  than equal 50/50 grid.
- **Pull quote**: Oversized purple text on canvas. Provides both
  visual interest and a content breather.
- **Static speaker grid**: 6-col rectangular portrait grid replaces
  animated marquee. Different visual rhythm from programme marquee.
  Speakers section now uses centred header (was left-aligned).
- **TPS After Hours** (was "By Night"): hero-style treatment with
  full-bleed party photo, dark gradient overlay, centred yellow title,
  larger body copy, ghost-light CTA. Replaced previous 4-card grid
  with compact cards. `.home-night--hero` modifier on charcoal base.
- **Quote grid**: 3-col blockquote grid replaces single rotating
  carousel. More content visible at once.
- **Programme stages**: Horizontal scroll with scroll-snap (was
  infinite marquee). Shows ~4 cards on desktop with right-edge
  fade hinting at more. Clone JS removed. Header left-aligned
  (.section-header--left). Track padding container-aligned:
  20px mobile, 40px tablet, `max(40px, (100vw-1200px)/2)` desktop.
  Right padding ensures stages 7/8 are fully scrollable.
- **Partners**: Split header — heading/subtitle left, CTA right.

**Button Styles**
- `.btn--gradient`: coral→pink→purple. ::before pseudo-element hover.
- `.btn--ghost-light`: transparent with translucent white border.

**CSS Variables**
- `--colour-canvas: #f7f5f2`

**JavaScript**
- Count-up stats: IntersectionObserver on `.home-stats__number[data-target]`
- Programme marquee clone JS removed (now CSS scroll-snap)
- Testimonial carousel removed — replaced by static quote grid

**CSS Architecture (homepage-specific)**
- Prefix: .home-* for new homepage components
- New classes: .home-stats, .home-stats__grid, .home-stats__item,
  .home-stats__number, .home-stats__label, .home-photo-break,
  .home-pullquote, .home-pullquote__inner, .home-pullquote__quote,
  .home-speakers__grid, .home-speaker, .home-speaker__image,
  .home-speaker__name, .home-speaker__role, .home-press,
  .home-press__grid, .home-press__quote

**Global CSS fixes (affects all pages)**
- `html { scrollbar-gutter: stable }` — prevents hero centering
  offset caused by scrollbar appearing/disappearing
- `p { max-width: 68ch; margin-inline: auto }` — the max-width was
  causing paragraphs to sit left-aligned in centred parents. Adding
  margin-inline: auto centres the constrained block.

### Programme Section Restructure (Session Teaser Pass)

The old single Programme section (stages + features + CTA) was split
into three distinct sections with different background treatments:

**1. Programme (stages only)**
- Purple bg, retains horizontal scroll-snap stage cards (8 stages)
- Top corners rounded, bottom corners flat — flows seamlessly into
  the session teaser below
- CSS: `.programme:has(+ .home-sessions)` removes bottom border-radius

**2. A Taste of What to Expect (session teaser)**
- Purple bg, glass cards with event photos, theme pill filters
- Top corners flat (flows from programme), bottom corners rounded
- Reduced top padding (one-third of section-padding) — same bg as
  programme, no need for full gap
- Section class: `.home-sessions`
- Headline: "A Taste of What to Expect", subhead: "Our 2026 programme
  will be announced soon. Click a theme below to explore highlights
  from last year."
- Left-aligned header (`.section-header--light.section-header--left`)

**Theme pill filters**
- `.home-sessions__pill` — translucent border on purple bg
- Active state: white fill, purple text
- Themes: All, Growth, Monetisation, Tech, Storytelling, Business,
  Strategy, Landscape, Networking

**Glass session cards**
- 3 cards at a time, 3-col grid desktop / 1-col mobile
- Glass style: `rgba(255,255,255,0.08)` bg, translucent border
- Full-bleed photo at top (180px height, object-fit: cover)
- Stage tags use canonical programme colours (`.tps-sessions__tag--*`)
  matching Browse All Sessions on programme.html — generic white
  override removed
- Title (white), speaker (cyan), description (rgba white)
- No padding on card — image bleeds to edges; text has own padding

**Curated session picks**
```javascript
const CURATED = {
  all:           [3, 34, 12],   // Amanpour & Maitlis, Grow Your Audience, Podcasting in Advertising
  growth:        [34, 87, 5],
  monetisation:  [35, 12, 93],
  tech:          [4, 85, 86],
  storytelling:  [3, 25, 37],
  operations:    [116, 52, 36],
  strategy:      [1, 81, 88],
  landscape:     [88, 122, 15],
  networking:    [39, 29, 161]
};
```

**Photo system**
- Pool of 18 event photos from /Photos/ directory
- Fisher-Yates shuffle on init and on each theme change
- `nextPhoto()` cycles through shuffled pool, reshuffles when exhausted
- Each card gets a different photo on every render

**Crossfade animation**
- Exit: `.is-leaving` — opacity 0, translateY -8px, 120ms ease-out
- Enter: `.is-entering` — opacity 1, translateY 0, 60ms ease stagger
  (each card has `transitionDelay = i * 60ms`)
- Grid min-height set to prevent layout shift during transition

**Browse link**
- Cyan text link: "160+ sessions across 8 stages in 2025 — browse
  them all →"
- Links to programme.html#browse-sessions (full session wall)
- Centred, light font weight, reveal animation

**Data loading**
- Priority: `window.__TPS_SESSIONS__` (from data/sessions.js) →
  fetch('data/sessions.json') → XHR fallback → hardcoded 3-session
  fallback
- Inline `<script>` at bottom of index.html (not in main.js)

**3. New for 2026 (split layout)**
- Canvas bg, separate section from programme
- Section class: `.programme.programme--new2026`
- Split layout (`.new2026__layout`): big headline left + 4 cards right
- Left column (`.new2026__headline`): large h2 with purple accent bar,
  subline "Four brand-new additions to this year's festival.",
  ghost CTA → programme.html. Sticky on desktop (top: 120px).
- Right column (`.new2026__cards`): 2×2 grid on tablet+, 1-col mobile
- 4 charcoal feature cards with photos:
  1. The Creator Mix — party photo
  2. The International Stage, powered by Podimo — international panel
  3. TPS Connects — exhibitor/brand meetings
  4. The Creator First Stage, in association with Arcade — creator panel
- Each card: photo at top, "New for 2026" label, title, description

**CSS Architecture (session teaser)**
- New classes: `.home-sessions`, `.home-sessions__filters`,
  `.home-sessions__pill`, `.home-sessions__grid`,
  `.home-sessions__card-image`, `.home-sessions__browse`
- Card overrides scoped to `.home-sessions .tps-sessions__card`
  (glass style, white text, cyan speakers)
- Stage tags: generic white override REMOVED — tags now inherit
  canonical colours from `.tps-sessions__tag--*` (purple for Origin,
  cyan for Creator, coral for Brand Works, etc.)
- Programme variant: `.programme--new2026` (canvas bg, no radius)
- New for 2026 layout: `.new2026__layout` (grid, 1fr/1.6fr desktop),
  `.new2026__headline` (sticky), `.new2026__cards` (2-col grid tablet+)
- Border-radius flow fix: `.programme:has(+ .home-sessions)` for
  seamless purple-to-purple transition
- Cascade fix: `.section-header.section-header--left` with doubled
  specificity to override later `.section-header` base styles

---

## Passes Page (passes.html)

### Colour Rhythm
1. Hero — dark photo overlay
2. Pricing cards — purple (rounded top corners)
3. Comparison table — purple (continuous with pricing)
4. Platinum spotlight — transparent on canvas
5. Good To Know + FAQ — purple (all corners rounded)
6. Final CTA — charcoal (rounded top corners)
7. Newsletter — charcoal (continuous)
8. Footer — charcoal

### Decisions

**Hero**
- Compact 60vh, photo bg + dark overlay (not video)
- Headline: "10,000+ People. Two Days. Don't Miss Out." — FOMO-first
- Countdown timer (reuses homepage JS pattern)
- Two CTAs: "Book Your Pass" (purple, scrolls to #passes) +
  "Partner With Us" (coral, links to partners.html)
- Nav CTA links to #passes (anchor scroll) to avoid self-link reload

**Pricing Cards (redesigned — product showcase)**
- 4-card structure reordered: Platinum → Gold 2-Day → Gold 1-Day → Silver
- Asymmetric grid on desktop: `1.3fr 1fr 1fr 0.8fr` — Platinum widest,
  Silver narrowest. `align-items: stretch` keeps heights equal.
- All active cards share a charcoal background family. Hierarchy created
  through accent colours, shadow weight, and surface treatment — not
  different background colours.
- Flex columns with features flex: 1 — pushes buttons to same baseline
- All cards use matching `padding-top: calc(--space-lg + --space-md)`
  so tier names, prices, and notes align horizontally across the row
- Feature lists have subtle divider lines (`border-bottom`) on all tiers
- Badges share identical sizing from `.price-card__badge` base rule —
  only colour differs per variant
- #book hrefs are placeholders — swap for real Lup booking URL

**Platinum** (`.price-card--platinum`)
- Gradient charcoal background (`170deg, #3a3a3a → --colour-charcoal → #2a2a2a`)
- Heavy shadow (16→24px hover) + inset top-edge glow
- Cyan accent system: name label, checkmarks, badge gradient (cyan→purple)
- Feature list divider lines between items
- "Reloaded for 2026" gradient badge
- CTA: `btn--gradient` (coral→pink→purple)

**Gold 2-Day** (`.price-card--popular`)
- Flat charcoal background
- Orange/gold accent system: 4px left border, "Most Popular" badge,
  name label, checkmarks — all `--colour-orange`
- Medium shadow (8→16px hover)
- CTA: `btn--urgency` (orange)

**Gold 1-Day** (`.price-card--gold`)
- Flat charcoal background (same as Gold 2-Day)
- Orange accent system shared with Gold 2-Day: name label in
  `--colour-orange`, checkmarks in orange at 60% opacity (slightly
  quieter than 2-Day)
- Lighter shadow (4→8px hover)
- CTA: `btn--urgency` (orange, matching Gold 2-Day)

**Silver — Sold Out** (`.price-card--soldout`)
- Translucent background, dashed border, 50% opacity, `pointer-events: none`
- Price struck through with `<s>` tag
- No CTA button — replaced with "Sold Out" label styled to match
  button sizing/placement (same font-size, padding, width, border-radius)
  but in muted grey with subtle border. Blends into the retired card
  rather than drawing attention.
- Communicates scarcity without competing for clicks

**Comparison Table**
- Full feature-by-feature table, 4 tiers
- Checkmarks (✓) purple, dashes (—) grey
- First column sticky for mobile horizontal scroll
- White table with purple header row on purple bg

**Platinum Spotlight**
- Canvas bg — breathing room after purple commerce block
- Two-column: perks left, event photo right
- Perks: fast-track entry, Leaders in Podcasting Breakfast at
  The Fox on The Green, Official Party at The Standard Hotel,
  premium seating, exclusive networking

**Practical Info + FAQ**
- Isolated purple block (all corners rounded)
- 3-column glass-card grid: Instalment Plans, Group Bookings,
  Evening Events
- FAQ accordion: native <details>/<summary>, 6 questions
- Cyan accent for links and +/− toggle

**Final CTA Strip**
- Charcoal bg, rounded top corners → newsletter → footer
- Both CTAs: purple Book + coral Partner

**CSS Architecture**
- Prefix: .passes-*
- Section classes: .passes-pricing, .passes-compare, .passes-spotlight,
  .passes-info, .passes-faq, .passes-cta
- Card modifier classes: .price-card--platinum, .price-card--popular,
  .price-card--gold, .price-card--soldout
- Homepage backward compat: unmodified cards use `:not([class*="price-card--"])`
  fallback styles; `--featured` variant preserved for homepage Gold 2-Day
- Asymmetric grid scoped to `.passes-pricing .pricing__grid` — homepage
  grid keeps `repeat(4, 1fr)`

**Reusable Patterns**
- Compact 60vh photo hero works well for all inner pages
- FAQ accordion (.passes-faq) — abstract to .faq-accordion for faq.html
- Glass-card info grid (.passes-info__card) — reusable on purple bgs
- Price card accent system pattern (modifier class → accent colour for
  name, checkmarks, badge, border) — reusable if new tiers are added

---

## Programme Page (programme.html)

### Colour Rhythm
1. Hero — dark photo overlay
2. Intro — transparent on canvas (asymmetric 55/45 split)
3. Full-bleed Photo Break 1 — edge-to-edge image
4. Featured Sessions — transparent on canvas (filterable white session cards, was "2025 Highlights")
5. Browse All 2025 Sessions — transparent on canvas (full 164-session wall, masonry grid)
6. Content Themes for 2026 — purple (all corners rounded, static 3-col grid, isolated block 1)
7. Full-bleed Photo Break 2 — edge-to-edge image
8. Features & Spaces — transparent on canvas (alternating photo/card rows)
9. Full-bleed Photo Break 3 — edge-to-edge image
10. By Night — purple (all corners rounded, isolated block 2, photo feature cards)
11. Full-bleed Photo Break 4 — edge-to-edge image
12. Coming Soon CTA — transparent on canvas
13. Newsletter — charcoal (rounded top corners)
14. Footer — charcoal

### Programme Redesign (Visual Dynamics Pass)

**Design Philosophy**
- Original version had 3 purple sections running back-to-back with no
  breathing room (Stages, Topics, Features as one continuous block).
  Every section was centred header + card grid — no dynamic variety.
  Only 5 photo instances on the entire page.
- Redesign injects dynamic layout techniques, isolates purple blocks,
  and increases photo instances from 5 to ~20. Page now feels like
  a festival, not a conference agenda.
- Stat band removed — the intro already conveys the numbers and
  the hero headline leads with the stats. Redundant purple block.

**Dynamic Layout Techniques Used**
- **Asymmetric split** (Intro): 55/45 grid, text+stats left, event
  photo right. Purple accent bar above h2.
- **Full-bleed photo breaks** (×3): edge-to-edge images as visual
  pauses. 45vh, no text, no overlay. Photos: stage energy, Louis
  Theroux, festival atmosphere.
- **Left-aligned sections** (Stages, Features, By Night): purple/cyan
  accent bars above h2. Not every section centred.
- **Purple stage cards with photos**: each of 8 stage cards is purple
  with a 16:9 event photo at the top, white/cyan text, subtle hover
  zoom. Creates a vibrant, visual stage grid.
- **Static content themes grid** (Content Themes): 3-col grid of
  glass-style cards on purple. Each card has a bold heading + short
  descriptor. Clean, scannable, no animation.
- **Photo-led night events** (By Night): two featured events (Creator
  Mix, Official Party) get full photo cards with image, label, and
  description. Three supporting events sit below as compact glass cards.
- **Alternating photo/card rows** (Features): 3 rows, each with a
  large photo on one side and 2 stacked white cards on the other.
  Rows alternate photo position (left, right, left).

**Decisions**

**Context**
- 2026 line-up not yet announced — page uses 2025 session highlights
  to set expectations, with a "Coming Soon" CTA for the 2026 programme
- Combines "By Day" and "By Night" into one programme page

**Hero**
- Compact 60vh, photo bg + dark overlay
- Headline: "8 Stages. 170+ Sessions. Two Unforgettable Nights."
- No countdown timer — passes page owns urgency
- Hero photo: Luke Dyson speakers-on-stage shot

**Intro / What to Expect**
- Canvas bg, 55/45 asymmetric grid split on desktop, stacks on mobile
- Left: h2 with purple accent bar, copy, inline stats row (3 stats)
- Right: event photo (Audience crowd shot, 4:3 ratio, rounded)

**Featured Sessions** (was "2025 Highlights")
- Retitled from "2025 Highlights" to "Featured Sessions"
- Canvas bg, left-aligned header with purple accent bar
- Framed as "A taste of what to expect" — 2025 sessions setting the
  bar for 2026
- 18 session cards across 4 stages: Origin Theatre (5), Creator Stage
  (5), Brand Works (4), Industry (4)
- Filterable by stage via pill-style buttons: All Stages, Origin Theatre,
  Creator Stage, Brand Works, Industry
- Active filter: purple fill; inactive: purple outline with hover tint
- Each card: white .card base, purple stage pill label, bold title,
  purple speaker names, charcoal description. Hover lift + shadow.
- Responsive grid: 1-col mobile, 2-col tablet, 3-col desktop
- Filter JS: vanilla, inline at bottom of page. Toggles display on
  cards by data-stage attribute. Re-adds .visible class for filtered-in
  cards to ensure reveal animation isn't broken.

**Browse All 2025 Sessions** (full session wall — new)
- Inserted between Featured Sessions and Content Themes
- Canvas bg, left-aligned header with purple accent bar
- Section id: `#browse-sessions` (anchor target from homepage teaser)
- Loads all 164 sessions from data/sessions.js
  (`window.__TPS_SESSIONS__`) with fetch fallback to data/sessions.json
- Two filter rows:
  - Stage pills (10): All Stages, Origin Theatre, Creator Stage,
    Brand Works, Industry, Talking Podcasts 1, Talking Podcasts 2,
    Live Stage, Creator Podcast Studio, Advice Lab
  - Theme pills (8): All Themes, Growth, Monetisation, Tech,
    Storytelling, Business, Strategy, Landscape, Networking
- Filters combine (AND logic): stage + theme must both match
- Session count display: "Showing X of 164 sessions" (updates on filter)
- Masonry layout: `column-count` CSS (1-col mobile, 2-col tablet,
  3-col desktop). `break-inside: avoid` on cards.
- Cards: same `.tps-sessions__card` as homepage but on white/canvas bg
  (default styling, no glass override). Stage tag, title, speaker, desc.
- Pagination: PAGE_SIZE=12, "Show more" button appends next batch
- Animation: cards enter with fade-up (opacity 0 → 1, translateY 20px → 0)
  with 30ms stagger per card
- Inline `<script>` at bottom of programme.html (separate from the
  existing highlights filter script)

**Content Themes for 2026**
- Purple bg, fully rounded (all corners) — isolated block
- Static 3-col grid of glass-style cards (1-col mobile, 2-col tablet,
  3-col desktop). Each card: bold white h3 + translucent-white description.
- 9 themes: AI, Multi-Platform, Revenue, Community, Global, Streaming,
  True Crime, Branded Content, Podcasting as Social Media.

**Features & Spaces**
- Canvas bg, left-aligned header with purple accent bar
- 3 alternating rows: photo + 2 stacked white .card per row
- Row 1 (photo left): exhibition floor + Creator Village & TPS Connects
- Row 2 (photo right): networking + International Gallery & Exhibition
- Row 3 (photo left): reception + Hub Bar & PodHouse Receptions
- Labels: .prog-feature-card__label (purple on canvas)

**By Night**
- Purple bg, all corners rounded — integrated with the page rhythm
- Left-aligned header with cyan accent bar (on purple → cyan)
- Two featured night events (Creator Mix, Official Party) with photo
  cards: image at top, yellow label (Day 1/Day 2 Evening), white title,
  translucent description. Hover zoom on photos. 2-col grid on tablet+.
- Three supporting events (Pre-Show Party, Live Podcasts, Executive
  Dinners) as compact glass cards below. 3-col on desktop.
- SVG icons removed — photography carries the visual energy instead.

**Coming Soon CTA** (replaced "Don't Miss Out")
- Canvas bg, centred. Headline: "2026 Programme Coming Soon"
- Copy encourages subscribing for updates or booking a pass early
- Both CTAs: purple Book + coral Partner

**CSS Architecture**
- Prefix: .prog-*
- New classes (highlights pass): .prog-highlights, .prog-highlights__filters,
  .prog-highlights__filter, .prog-highlights__grid, .prog-highlight,
  .prog-highlight__stage, .prog-highlight__title, .prog-highlight__speakers,
  .prog-highlight__desc
- Session wall classes (shared with homepage): .tps-sessions,
  .tps-sessions__filters, .tps-sessions__pill, .tps-sessions__grid,
  .tps-sessions__card, .tps-sessions__tag, .tps-sessions__card-title,
  .tps-sessions__card-speaker, .tps-sessions__card-desc,
  .tps-sessions__count, .tps-sessions__more
- Retained: .prog-intro__grid, .prog-intro__text, .prog-intro__image,
  .prog-themes, .prog-themes__grid, .prog-theme,
  .prog-features__row, .prog-features__row--reverse, .prog-features__photo,
  .prog-features__cards, .prog-feature-card__label,
  .night-feature, .night-feature__image, .night-feature__badge,
  .night-feature__body, .night-feature__label, .prog-night__featured
- Dead CSS removed: .prog-stages, .stage-card* (~102 lines),
  .pullquote* (~39 lines), .photo-strip* (~30 lines),
  .prog-topics/:prog-stages focus rules (2 lines). Total ~192 lines.
- Focus: purple on .prog-highlights (light bg)

---

## About Page (about.html)

### Design Philosophy
First page to break the formulaic centred-section pattern. Uses
dynamic layout techniques to feel more like a festival and less like
a template. Every section uses a different layout approach — asymmetric
splits, bold stat bands, full-bleed photo breaks, staggered cards,
and left-aligned quote grids.

### Colour Rhythm
1. Hero — dark photo overlay
2. Our Story — transparent on canvas (asymmetric split)
3. Giant Stats — purple (rounded top corners)
4. Full-bleed Photo — purple bg behind edge-to-edge image
5. Advisory Panel — transparent on canvas (avatar grid)
6. The Founders — transparent on canvas (staggered cards)
7. Press & Recognition — purple (all corners rounded)
8. CTA Strip — charcoal (rounded top corners)
9. Newsletter — charcoal (continuous)
10. Footer — charcoal

### Decisions

**Hero**
- Compact 60vh, photo bg + dark overlay
- Headline: "The Global Festival for the Business of Podcasting"
- Subtitle positions TPS as founded 2022, 10,000+ attendees, global
- Two CTAs: "Book Your Pass" (purple) + "Partner With Us" (coral)
- Hero photo: audience crowd shot

**Our Story (asymmetric split + pull quote)**
- 55/45 CSS Grid split on desktop, stacks on mobile
- Left: 3 paragraphs — origin, growth, what it is today
- Right: oversized pull quote in Space Grotesk, purple, with
  border-left accent. Sticky on desktop (top: 120px)
- Quote: "Two days where the entire industry is in one building.
  You can't afford to miss it." — emotional/FOMO tone
- Left-aligned h2 with purple accent bar above

**Giant Stats**
- Purple bg, rounded top corners
- 4 stats: 10,000+ / 53 / 450+ / 120+
- CSS Grid: 2-col mobile, 4-col desktop (not flex — flex caused overlap)
- Font-size: clamp(3rem, 14vw, 4.5rem) mobile → clamp(5rem, 7vw, 8rem) desktop
- White numbers, cyan labels
- Still bold and impactful but no longer overlapping

**Full-bleed Photo Break**
- Edge-to-edge image, no container, no overlay, no text
- 45vh height (min 280px, max 500px), object-fit: cover
- Purple bg behind image for seamless transition from stats
- Acts as a visual pause between content sections

**Advisory Panel (elevated)**
- Comes BEFORE the founders — more prominent position
- Left-aligned header: "Guided by the Best in the Business"
- 10 panel members in a grid: 2-col mobile, 3-col tablet, 5-col desktop
- Circular purple placeholder avatars with initials (swap for
  real headshots when available)
- Name + company below each avatar

**The Founders (compact, staggered)**
- Sits below advisory panel, titled "The Founders"
- Two cards side-by-side on desktop, second offset 80px down
- Large rectangular photos (4:3, rounded corners), not circular
- Name, role (purple uppercase), bio paragraph
- Jason Carter (Festival Director) + Tim Etchells (Director)
- Subtle hover zoom on photos (scale 1.03)

**Press & Recognition**
- Purple bg, all corners rounded (isolated block)
- Left-aligned header with cyan accent bar
- 3 quotes in a grid (1-col mobile, 3-col desktop)
- Each quote: cyan border-left, white text, cyan cite
- NOT the centred carousel pattern from homepage

**CTA Strip**
- Charcoal bg, rounded top corners → newsletter → footer
- Headline: "Join 10,000+ Professionals in London This May"
- Both CTAs: purple Book + coral Partner

**CSS Architecture**
- Prefix: .about-*
- New classes: .about-story, .about-story__grid, .about-story__text,
  .about-story__quote, .about-stats, .about-stats__inner,
  .about-stats__item, .about-stats__number, .about-photo-break,
  .about-team, .about-team__card, .about-team__card--offset,
  .about-panel, .about-panel__grid, .about-panel__card,
  .about-panel__avatar, .about-press, .about-press__quote, .about-cta

**Dynamic Layout Patterns (reusable)**
- Asymmetric split grid (55fr/45fr) — reuse on partners, brands pages
- Full-bleed photo break — reuse as visual pause on any page
- Staggered card offset (margin-top: 80px) — reuse for team/speaker pairs
- Left-aligned sections with purple accent bar — use broadly
- Placeholder avatar circles with initials — reuse for speakers page

---

## Partners Page (partners.html)

### Colour Rhythm
1. Hero — dark photo overlay
2. Why Partner — transparent on canvas (55/45 asymmetric split)
3. Who You'll Reach — charcoal (all corners rounded, audience breakdown)
4. Partnership Tiers — purple (all corners rounded, isolated block)
5. Ways to Get Involved — transparent on canvas (scroll carousel)
6. Full-bleed Photo Break — edge-to-edge image
7. 2026 Partners — transparent on canvas (logo stack)
8. What Partners Say — transparent on canvas (featured quote carousel)
9. Full-bleed Photo Break 2 — edge-to-edge image
10. Enquiry Form — purple (all corners rounded, isolated block)
11. Newsletter — charcoal (rounded top corners)
12. Footer — charcoal

### Decisions

**Hero**
- Compact 60vh, photo bg + dark overlay (exhibitor floor shot)
- Headline: "Put Your Brand at the Heart of Podcasting"
- Two CTAs: "Enquire Now" (purple, scrolls to #enquire) +
  "Book Your Pass" (coral, links to passes.html)

**Why Partner (asymmetric split)**
- Canvas bg, 55/45 CSS Grid split on desktop, stacks on mobile
- Left: value proposition copy (2 paragraphs), no inline stats —
  removed because the "Who You'll Reach" section below provides
  more detailed, segmented audience data
- Right: exhibition floor photo (4:3 ratio, rounded)
- Left-aligned h2 with purple accent bar above

**Who You'll Reach (audience breakdown)**
- Charcoal bg, all corners rounded — isolated block
- Centred section-header (--light variant, white text)
- 3-column grid: Podcast Creators (2,391), Brand Advertisers (1,042),
  Platforms & Tech (100+ exhibiting)
- Cyan stat numbers (clamp font-size), "in 2025" label, white h3,
  translucent-white description per column
- Each column explains what that audience is actively looking for
- Responsive: 1-col mobile → 3-col tablet+

**Partnership Tiers (purple, glass cards)**
- Purple bg, all corners rounded — isolated block
- 4 glass-card grid: Headline Partner, Official Partner, Show
  Partner, Exhibitor. Cyan labels, white text.
- CTA: "Request the Partnership Deck" ghost button → #enquire
- Responsive: 1-col mobile → 2-col tablet → 4-col desktop

**Ways to Get Involved (scroll carousel)**
- Canvas bg, left-aligned header with purple accent bar
- Split header: heading/subtitle left, prev/next arrow buttons right
  (desktop). Stacks on mobile.
- Horizontal scroll-snap carousel (same pattern as homepage programme
  stages). Full-bleed outside .container.
- 7 activation cards, each with: photo at top (16:10 aspect ratio,
  hover zoom), title, description, "Best for:" label with purple
  text and top border divider
- Cards: 300px mobile / 340px desktop, scroll-snap-align: start
- Arrow buttons: 44px circles, purple border, hover fill. Prev
  disabled at scroll start, next disabled at scroll end. JS in main.js.
- Photos mapped to real event photography: Stand (Canon), Stage
  (Origin iHeart), PodHouse (Set), Advice Lab, Meeting Tables,
  Spiritland, Networking
- CTA: "Discuss Your Options" purple button → #enquire

**2026 Partners (logo stack)**
- Canvas bg, centred section-header
- Full-width logo stack image (same asset as homepage)

**What Partners Say (featured quote carousel)**
- Canvas bg, centred layout
- Single featured quote at a time — large Space Grotesk type
  (clamp 1.5rem → 2.25rem), centred, max-width 800px
- Giant translucent quotation mark (opacity 0.08, clamp 8rem → 14rem)
  positioned behind the quote as visual anchoring
- 6 quotes with full attribution (name in purple uppercase cite,
  role/company below in grey):
  1. Kym Treasure, Founder & CEO, Audacia
  2. Jez Nelson, Global Head of Podcasts, Sony Music Entertainment
  3. Craig Strachan, CEO, Novel
  4. Fatima Zaidi, Founder & CEO, Quill & CoHost
  5. Adam Bowie, Business Development Manager, BBC World Service
  6. Sean Howard, Founder, Flight Path
- Controls: prev/next arrow buttons + 6 dot indicators
- Fade-up transition animation on slide change (0.4s ease)
- JS in main.js: goTo() function, wrapping navigation, dot click
- Replaced previous 3-quote static grid (then 6-quote grid) —
  single quote at a time = more impact, less wall-of-text

**Enquiry Form (purple, isolated block)**
- Purple bg, all corners rounded — unchanged from initial build
- 45/55 grid: contact info left (Alex Booth block), form right
- Cyan accent on h2 bar, form focus states, links

**Removed: "Attending Instead" CTA strip**
- Was charcoal bg with "Book Your Pass" + "View Programme" CTAs
- Redundant — pass booking CTA already in nav and hero
- Newsletter now flows directly from enquiry form with natural
  charcoal rounded-top corners

**CSS Architecture**
- Prefix: .partner-*
- New classes (enrichment pass): .partner-audience, .partner-audience__grid,
  .partner-audience__col, .partner-audience__number, .partner-audience__label,
  .partner-activations__header, .partner-activations__header-text,
  .partner-activations__nav, .partner-activations__arrow,
  .partner-activations__track, .partner-activations__card,
  .partner-activations__img, .partner-activations__body,
  .partner-activations__for, .partner-activations__cta,
  .partner-quotes__carousel, .partner-quotes__mark,
  .partner-quotes__slide, .partner-quotes__controls,
  .partner-quotes__arrow, .partner-quotes__dots, .partner-quotes__dot
- Retained: .partner-why, .partner-why__grid, .partner-why__text,
  .partner-why__image, .partner-tiers, .partner-tiers__grid,
  .partner-logos, .partner-enquiry (all form styles unchanged),
  .partner-cta (CSS retained but section removed from HTML)
- Removed: .partner-why__stats (inline stats removed from HTML),
  old .partner-quotes__header (replaced by carousel)
- Focus: cyan on charcoal/purple sections (.partner-audience added
  to focus-visible rule group)

**JavaScript (main.js additions)**
- Partner activations scroll arrows: getScrollAmount() calculates
  card width + gap, updateArrowState() enables/disables prev/next
  based on scroll position. Listens to scroll + resize events.
- Partner quotes carousel: goTo(index) manages slide visibility,
  dot active state, aria-selected, and fade-in animation retrigger.
  Wrapping navigation (last→first, first→last). Dot click handlers.

**Reusable Patterns**
- Scroll-snap carousel with arrow controls — reuse for speakers,
  blog cards, or any horizontal browsable content
- Featured quote carousel with dots — reuse for press quotes on
  about page or standalone testimonial sections
- Audience breakdown grid (charcoal + cyan stats) — reuse for
  audience sub-pages (creators.html, brands.html)
