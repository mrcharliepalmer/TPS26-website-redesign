# BUILD-LOG.md — Detailed Per-Page Decisions

This file captures detailed build decisions for each completed page.
Consult it when building a new page that needs a similar pattern.

---

## Homepage (index.html)

### Colour Rhythm
1. Hero — dark video overlay (100vh)
2. Stats — purple bg (white count-up numbers, rgba white labels)
3. Back for Our Fifth Year — transparent on canvas (55/45 asymmetric split)
4. Photo Break — full-bleed edge-to-edge image (visual pause)
5. Where the Industry Comes Together — transparent on canvas (white cards with photos)
6. Programme — purple (all corners rounded, isolated block)
7. Pull Quote — transparent on canvas (purple text, large speech mark)
8. Speakers — purple (all corners rounded, isolated block)
9. Photo Break 2 — full-bleed edge-to-edge image (visual pause)
10. Testimonials — transparent on canvas (3-col quote grid, purple accents)
11. Pricing — purple (all corners rounded, isolated block)
12. Partners — transparent on canvas (logo stack image)
13. Newsletter — charcoal (rounded top corners, flows into footer)
14. Footer — charcoal

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
- **Quote grid**: 3-col blockquote grid replaces single rotating
  carousel. More content visible at once.
- **Programme stages**: Horizontal scroll with scroll-snap (was
  infinite marquee). Shows ~4 cards on desktop with right-edge
  fade hinting at more. Clone JS removed. Header left-aligned
  (.section-header--left).
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

**Pricing Cards**
- 4-card structure with expanded feature lists (5-6 items)
- Flex columns with features flex: 1 — pushes buttons to same baseline
- Solid purple bg, rounded top corners, white split cards
- #book hrefs are placeholders — swap for real Lup booking URL

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
- New classes: .passes-hero, .passes-pricing, .passes-compare,
  .passes-spotlight, .passes-info, .passes-faq, .passes-cta
- price-card now flex column globally (affects homepage too)

**Reusable Patterns**
- Compact 60vh photo hero works well for all inner pages
- FAQ accordion (.passes-faq) — abstract to .faq-accordion for faq.html
- Glass-card info grid (.passes-info__card) — reusable on purple bgs

---

## Programme Page (programme.html)

### Colour Rhythm
1. Hero — dark photo overlay
2. Intro — transparent on canvas (asymmetric 55/45 split)
3. Full-bleed Photo Break 1 — edge-to-edge image
4. Stages — transparent on canvas (left-aligned, purple cards with photos)
5. Content Themes — purple (all corners rounded, static 3-col grid, isolated block 1)
6. Full-bleed Photo Break 2 — edge-to-edge image
7. Features & Spaces — transparent on canvas (alternating photo/card rows)
8. Full-bleed Photo Break 3 — edge-to-edge image
9. By Night — purple (all corners rounded, isolated block 2, photo feature cards)
10. Full-bleed Photo Break 4 — edge-to-edge image
11. CTA Strip — transparent on canvas
12. Newsletter — charcoal (rounded top corners)
13. Footer — charcoal

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
- 2026 line-up not yet announced — page leads with stages and
  features, not individual sessions or speakers
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

**The Stages**
- Canvas bg, left-aligned header with purple accent bar
- 2-col grid of purple stage cards (overrides .card white bg)
- Each card: 16:9 event photo at top, cyan stage number, white
  title, translucent-white description, cyan tags on translucent bg
- Purple box-shadow (rgba purple). Hover zoom on photos.

**Content Themes**
- Purple bg, fully rounded (all corners) — isolated block
- Static 3-col grid of glass-style cards (1-col mobile, 2-col tablet,
  3-col desktop). Each card: bold white h3 + translucent-white description.
- 9 themes: AI, Multi-Platform, Revenue, Community, Global, Streaming,
  True Crime, Branded Content, Podcasting as Social Media.
- Replaces dual-direction marquee — cleaner, more scannable, less dated.

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

**CTA Strip**
- Canvas bg, centred. Headline: "Don't Miss Out" — urgency/FOMO driven.

**CSS Architecture**
- Prefix: .prog-*
- New classes: .prog-intro__grid, .prog-intro__text, .prog-intro__image,
  .prog-themes, .prog-themes__grid, .prog-theme,
  .prog-features__row, .prog-features__row--reverse, .prog-features__photo,
  .prog-features__cards, .prog-feature-card__label, .stage-card__photo,
  .night-feature, .night-feature__image, .night-feature__badge,
  .night-feature__body, .night-feature__label, .prog-night__featured
- Modified: .prog-stages (transparent bg), .stage-card (purple bg,
  white/cyan text), .prog-themes (static grid, replaces marquee),
  .prog-features (transparent bg, row layout), .prog-night (purple bg,
  photo feature cards + compact supporting cards)
- Removed: .prog-stats (stat band), .prog-topics (dual marquee),
  .pullquote on programme page, .photo-strip on programme page,
  .night-card--featured, .night-card__badge, .night-card__icon,
  @keyframes topics-scroll-left/right

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
