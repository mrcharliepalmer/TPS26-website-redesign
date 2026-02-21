# Style Guide — The Podcast Show London 2026

This document defines the visual language for the rebuild.
Every design decision should be checked against this file.

---

## Core Principle

This is a festival. The design should feel vibrant, confident, and
celebratory — but with restraint. The entire site uses a **two-colour
identity**: warm canvas (#f7f5f2) + purple (#551fef) + charcoal
(#333333). Photography and bold typography carry the energy, not
background textures or gradients.

Think Boardmasters: high-confidence, photography-led, but only 3-4
distinct background treatments across each page. Fewer backgrounds,
more impact. This applies to every page, not just the homepage.

Wave-dot textures and gradient background images are retired from
the active design system. Solid colours only.

---

## Typography

### Fonts
- **Headings:** Space Grotesk (Google Fonts) — Bold (700) and Medium (500)
- **Body:** Inter (Google Fonts) — Regular (400), Medium (500), Semi-bold (600)

### Scale (mobile-first, rem-based)

| Element | Mobile | Desktop | Weight | Transform |
|---|---|---|---|---|
| Hero headline | 2.75rem (44px) | 5rem (80px) | 700 | None (title case) |
| Section headline | 2.25rem (36px) | 3.25rem (52px) | 700 | None |
| Sub-headline | 1.25rem (20px) | 1.5rem (24px) | 500 | None |
| Body | 1rem (16px) | 1.125rem (18px) | 400 | None |
| Small / caption | 0.875rem (14px) | 0.875rem (14px) | 400 | None |
| Nav links | 0.875rem (14px) | 0.9375rem (15px) | 500 | Uppercase |
| CTA buttons | 1rem (16px) | 1rem (16px) | 600 | Uppercase |
| Stat numbers | 3.5rem (56px) | 5rem (80px) | 700 | None |
| Testimonial quote | 2.25rem (36px) | 3.5rem (56px) | 700 | None |
| Testimonial source | 1rem (16px) | 1.1rem (17.6px) | 700 | Uppercase |
| Price (card) | 3rem (48px) | 3rem (48px) | 700 | None |

### Line heights
- Headings: 1.1
- Body: 1.6
- Buttons / Nav: 1

### Letter spacing
- Hero h1: -0.01em (tight)
- Section h2: -0.02em (tight)
- Uppercase nav/buttons: 0.05em
- Body: 0 (default)

---

## Colour System

### The palette
| Name | Hex | CSS Variable | Role |
|---|---|---|---|
| Canvas | #f7f5f2 | --colour-canvas | Body/page background |
| Charcoal | #333333 | --colour-charcoal | Dark sections, footer |
| Deep Purple | #551fef | --colour-purple | Primary brand, key sections |
| Medium Purple | #505cec | --colour-purple-mid | Gradient partner |
| Cyan | #47c9d6 | --colour-cyan | Accent on dark/purple bgs |
| Light Cyan | #aae0e5 | --colour-cyan-light | Soft accent |
| Yellow | #f1d864 | --colour-yellow | Warm accent (Reds gradient) |
| Orange | #ffbb00 | --colour-orange | Urgency, featured badges |
| Coral | #ef5959 | --colour-coral | CTA gradient, alerts |
| Hot Pink | #ea539b | --colour-pink-hot | CTA gradient |
| Pink | #ef81b3 | --colour-pink | Soft warm accent |
| Light Grey | #ededed | --colour-grey-light | Borders, dividers |
| White | #ffffff | --colour-white | Cards, text on dark |

### How colour is used

**Two-colour identity — site-wide.** Every page uses only canvas +
purple + charcoal as section backgrounds. Photography, white cards,
and bold purple typography provide all the visual energy.

**Homepage background rhythm:**
1. Hero — dark video overlay
2. Stats — transparent on canvas
3. What is TPS — transparent on canvas
4. Audience cards — transparent on canvas
5. Programme — purple (rounded top corners)
6. Speakers — purple (rounded bottom corners)
7. Testimonials — transparent on canvas
8. Partners — transparent on canvas
9. Pricing — purple (rounded corners)
10. Newsletter — charcoal (rounded top corners)
11. Footer — charcoal

**Passes page background rhythm:**
1. Hero — dark photo overlay
2. Pricing cards — purple (rounded top corners)
3. Comparison table — purple (continuous with pricing)
4. Platinum spotlight — transparent on canvas
5. Good To Know + FAQ — purple (all corners rounded)
6. Final CTA — charcoal (rounded top corners)
7. Newsletter — charcoal (continuous)
8. Footer — charcoal

**Programme page background rhythm:**
1. Hero — dark photo overlay
2. Intro — transparent on canvas
3. Stages — purple (rounded top corners)
4. Trending Topics — purple (continuous)
5. Features & Spaces — purple (rounded bottom corners)
6. Photo strip — transparent on canvas
7. By Night — charcoal (rounded top corners)
8. CTA Strip — transparent on canvas
9. Newsletter — charcoal (rounded top corners)
10. Footer — charcoal

**Rules:**
- Never use more than 2 accent colours in the same section
- White text on dark/vibrant backgrounds; charcoal text on light
- Purple and charcoal sections use border-radius: var(--radius-md)
  on corners for softer transitions between canvas and colour
- Continuous colour zones (e.g. pricing + comparison, stages +
  topics + features) share one background with rounded corners
  only at the start and end of the zone
- Ensure WCAG AA contrast ratio (4.5:1 body text, 3:1 large text)

### Colour pairings that work
| Background | Text | Accent |
|---|---|---|
| Canvas (#f7f5f2) | Charcoal | Purple |
| Deep Purple | White | Cyan |
| Charcoal | White | Cyan or Yellow |
| White (cards) | Charcoal | Purple |

---

## Hero

### Video hero (primary approach)
- Full-viewport background video, muted, autoplay, looping
- Short clip (15-20 seconds) from the aftermovie or event footage
- Aftermovie reference: https://www.youtube.com/watch?v=VlG1tRZDmDg
- Dark overlay (rgba(0,0,0,0.4)) for text legibility
- If MP4 not available: photo fallback with a "Play aftermovie" button
  that opens the YouTube video in a lightbox/modal

### Hero content
- Event logo or wordmark (white)
- "20–21 May 2026 · London" — date and location (cyan tag)
- Headline: "The Global Festival for the Business of Podcasting"
- Subtitle + meta line ("BDC, Islington" — no duplicate "London")
- Two CTAs: "Book Your Pass" (gradient: coral→pink→purple) +
  "Partner With Us" (ghost-light: translucent white border)

### Photo fallback
- Full-bleed crowd/energy shot from the photography assets
- Same overlay and content treatment as video

---

## Buttons & CTAs

### Primary button (.btn--primary)
- Background: --colour-purple
- Text: white, uppercase, 600 weight, 0.05em letter-spacing
- Padding: 16px 32px
- Border-radius: 8px
- Hover: lighten background, subtle lift (translateY(-2px) + shadow)

### Gradient button (.btn--gradient)
- Background: linear-gradient(135deg, coral → pink-hot → purple)
- Has ::before pseudo-element with shifted gradient for hover
- Used as the primary hero CTA — most visually prominent button
- Hover: ::before fades in (opacity 0→1) with reversed gradient

### Ghost buttons
- **.btn--ghost**: white border on dark backgrounds
- **.btn--ghost-dark**: purple border on light backgrounds
- **.btn--ghost-light**: translucent white border (rgba 0.5),
  used for secondary hero CTA. Hover fills border to solid white.

### Urgency / pricing CTA (.btn--urgency)
- Background: --colour-orange
- Text: --colour-charcoal
- Used for featured pricing card CTA

### Coral button (.btn--coral)
- Background: --colour-coral
- Text: white
- Used on inner pages for secondary conversion CTAs

### Button sizing
- Default: 16px 32px padding
- Small (nav, inline): 10px 20px padding
- Large (hero): 18px 40px padding

---

## Cards

Used for: audience segments, pass tiers, programme features, speakers.

### Standard card (.card)
- Background: white
- Border-radius: 12px
- Box-shadow: 0 4px 24px rgba(0,0,0,0.1)
- Padding: 24px
- Hover: lift (translateY(-4px), shadow increase)

### Audience card (.audience-card)
- White card on canvas background
- Each card has a photo (aspect-ratio: 16/9) at the top
- Stats row with border-top divider
- Ghost-dark CTA button at bottom

### Price card (.price-card)
- Split card on purple background — white top, glass bottom
- **Top half** (.price-card__top): white background, tier name,
  price, note. 4px top accent bar (purple 30% opacity; orange
  solid on featured)
- **Bottom half** (.price-card__body): glass treatment
  (rgba white 0.08 bg, white 0.12 top border). Features list
  with cyan checkmarks, white text, and CTA button.
- Tier name: small (0.85rem), uppercase, grey label
- Price: 3rem, bold purple, tight letter-spacing (-0.02em)
- Generous top padding (--space-lg)
- Featured card: orange border + orange accent bar + badge

### Glass card (.glass-card)
- Translucent (rgba white 0.08 bg, white 0.12 border)
- For content on dark/vibrant backgrounds
- Cyan accent label (.glass-card__label)
- Programme cards on homepage use this pattern with photos

### Speaker card
- Circular image crop (180px diameter desktop, 120px mobile)
- Name below, role/company in smaller text
- No card background — just image + text on the section background
- White text on purple background (speakers--vibrant)
- Homepage: displayed in a horizontal auto-scrolling marquee
  (bleeds off-screen, pauses on hover, JS-duplicated for loop)

### Programme card (.programme-card)
- Glass-card style on purple background
- Photo at top (aspect-ratio: 16/9), body below
- Stage number in cyan, heading in white, description in translucent
- Homepage: 8 stage cards in a horizontal auto-scrolling marquee
  (300px wide, full-bleed outside .container, pauses on hover)

---

## Spacing System

Based on 8px grid.

| Token | Value | Use |
|---|---|---|
| --space-xs | 8px | Tight gaps, icon margins |
| --space-sm | 16px | Form field gaps, small margins |
| --space-md | 24px | Card padding, paragraph gaps |
| --space-lg | 48px | Section padding (mobile) |
| --space-xl | 80px | Section padding (desktop) |
| --space-2xl | 120px | Hero padding, major section breaks (desktop) |

### Section rhythm
- Mobile: 48px top/bottom padding per section
- Desktop: 80–120px top/bottom padding per section
- Content max-width: 1200px, centred with auto margins
- Content padding (sides): 20px mobile, 40px tablet, 0 desktop (within max-width)

---

## Wave-Dot Textures & Gradients (Retired)

The wave-dot textures and gradient background images are **no longer
used** on any page. The entire site uses solid background colours
only (canvas, purple, charcoal).

The PNG assets remain in `/BoldBishops Backgrounds/` for reference
but are not referenced by any CSS. Do not reintroduce them.

---

## Photography

Photography is a primary carrier of energy across the site. With
the two-colour background system, photos embedded in cards and
sections provide the vibrancy that background textures used to.
The photo-strip component uses a canvas background.

### Treatment
- Embedded in cards (audience cards, programme stage cards,
  feature cards) — not as standalone strips or grids
- Full-bleed for hero and About section split layout
- Rounded corners (12px) when used in cards
- Subtle hover zoom on interactive images (scale 1.05, overflow hidden)

### Overlay on photos
- Dark: rgba(0,0,0,0.45) — hero and inner page heroes
- Inner page hero: rgba(0,0,0,0.5) — slightly stronger

### Aspect ratios
- Hero: full-viewport
- Card photos: 16:9 (audience cards, programme cards)
- About section: 4:3
- Speaker photos: 1:1 (circular crop)
- Platinum spotlight: 3:2

---

## Navigation

### Desktop
- Fixed/sticky top bar
- White background with subtle bottom border or shadow on scroll
- Logo left, nav items centre, CTA button right
- Nav items: uppercase, 15px, 500 weight, charcoal text
- Active state: purple underline (2px, offset 8px below)
- CTA: purple button, always visible

### Mobile
- Logo left, hamburger right
- Full-screen overlay menu on open
- Purple or charcoal background, white text
- Large tap targets (48px minimum height)
- CTA button prominent at top of mobile menu

---

## Footer

- Background: --colour-charcoal
- Text: white (headings), rgba(255,255,255,0.7) (body/links)
- Grid: 4 columns desktop, stacked mobile
- Columns: Navigation, Event Info, Contact, Social + Newsletter
- Social icons: white, hover to brand colour
- Bottom bar: copyright, privacy, terms

---

## Responsive Breakpoints

| Name | Value | Target |
|---|---|---|
| Mobile | < 768px | Phones |
| Tablet | 768px – 1024px | Tablets, small laptops |
| Desktop | > 1024px | Laptops, desktops |
| Wide | > 1400px | Large screens |

### Mobile-first approach
- Base styles are mobile
- Use min-width media queries to layer up
- Touch targets minimum 44px
- No hover-dependent interactions on mobile

---

## Animation & Motion

### Principles
- Subtle, purposeful, fast
- No animation for animation's sake
- Enhance user feedback, not decorate

### Allowed animations
- Button hover: translateY(-2px) + shadow, 0.2s ease
- Card hover: translateY(-4px to -6px) + shadow increase, 0.3s ease
- Scroll reveal: fade-up (opacity 0→1, translateY(20px→0)), 0.6s ease
- Nav scroll: background/shadow transition, 0.25s ease
- Mobile menu: slide-in from right, 0.3s ease
- Stats count-up: IntersectionObserver, ease-out cubic, 1.8s duration
- Testimonial carousel: auto-rotate every 5s, dot navigation
- Gradient button hover: ::before opacity transition, 0.3s ease
- Scroll-hint chevron: gentle bounce (translateY 0→6px), 2s infinite
- Programme marquee: auto-scroll left, 40s linear infinite, pause on hover
- Speakers marquee: auto-scroll left, 25s linear infinite, pause on hover

### Not allowed
- Parallax scrolling
- Bouncing or pulsing elements (except scroll hint)
- Anything that triggers motion sickness (prefers-reduced-motion:
  disables marquee animations, falls back to horizontal scroll)

---

## Accessibility

- WCAG AA minimum across all colour pairings
- Focus states: 2px purple outline, 4px offset
- Skip-to-content link
- Alt text on all images
- Semantic HTML (header, nav, main, section, footer)
- prefers-reduced-motion: disable scroll animations, transitions
- prefers-color-scheme: not required (the site is its own brand)

---

## File & Asset Conventions

- CSS: styles.css (shared across all pages)
- Images: /images/ folder (optimised, WebP where possible with fallbacks)
- Fonts: loaded via Google Fonts CDN (Space Grotesk + Inter)
- No CSS frameworks (no Bootstrap, Tailwind, etc.)
- CSS custom properties for all colours, spacing, typography
- BEM-like class naming: .section-hero, .section-hero__title, .section-hero__cta
