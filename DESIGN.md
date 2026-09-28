---
version: 1.0
name: UK-Hair-Transplant-design-system
description: A calm, clinical-premium interface for UK Hair Transplant, a London hair transplant agency. Deep navy hero and panel surfaces sit on a soft sand-and-aqua canvas, with muted gold as the single accent for eyebrows, icons and the primary call to action. Display type is a bookish old-style serif; body is a humanist sans. Everything is heavily rounded (pill buttons, 28–40px cards) and layered with soft radial glows, so the site reads as reassuring and discreet rather than salesy. Source of truth is `app/globals.css` — this file documents it; if they disagree, the code wins and this file should be updated.

colors:
  # Core palette (globals.css --palette-*)
  navy: "#083a4f"          # --palette-navy / --ink-900. Brand anchor, theme-color
  gold: "#a58d66"          # --palette-gold / --gold-500
  aqua: "#c0d5d6"          # --palette-aqua / --sage-200
  teal: "#407e8c"          # --palette-teal / --sage-500
  sand: "#e5e1dd"          # --palette-sand / --surface-canvas

  # Ink (text on light surfaces)
  ink-950: "#062f40"       # headings, primary text
  ink-900: "#083a4f"       # labels, strong text
  ink-800: "#225768"
  ink-700: "#4e6e78"       # body copy
  ink-600: "#6f8790"       # meta, captions, progress labels

  # Gold (accent)
  gold-300: "#dfd1ba"      # primary CTA fill; eyebrows and icons on dark
  gold-400: "#baa383"      # primary CTA hover
  gold-500: "#a58d66"      # eyebrows on light surfaces

  # Sage / teal (secondary, interactive states)
  sage-700: "#255563"      # assessment form: progress bar, selected option, radios, file button
  sage-600: "#2f6573"
  sage-500: "#407e8c"      # input focus border and focus ring
  sage-200: "#c0d5d6"

  # Surfaces
  surface-canvas: "#e5e1dd"   # page background under the gradient wash
  surface-paper: "#eef2f0"    # light section panels, input fill
  surface-subtle: "#c0d5d6"   # secondary button on dark hero
  surface-muted: "#d6e2e0"
  surface-white-glass: "rgba(255, 255, 255, 0.72)"  # proof cards, light icon badges

  # Lines
  line-soft: "rgba(8, 58, 79, 0.12)"
  line-strong: "rgba(8, 58, 79, 0.22)"
  line-inverse-soft: "rgba(192, 213, 214, 0.14)"
  line-inverse-strong: "rgba(192, 213, 214, 0.24)"

  # On dark
  on-dark: "#ffffff"
  on-dark-body: "rgba(255, 255, 255, 0.72)"   # text-white/72 (hero lead)
  on-dark-soft: "rgba(255, 255, 255, 0.68)"   # text-white/68 (panel body)
  on-dark-meta: "rgba(255, 255, 255, 0.52)"   # fine print on dark

  selection: "rgba(165, 141, 102, 0.32)"

typography:
  font-display: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Garamond, Georgia, "Times New Roman", serif'
  font-body: '"Avenir Next", "Segoe UI", "Helvetica Neue", Helvetica, Arial, system-ui, sans-serif'

  display-hero:            # homepage h1
    fontFamily: "{typography.font-display}"
    fontSize: 36px → 48px (sm) → 74.4px (lg, text-[4.65rem])
    fontWeight: 400
    lineHeight: 1.02
  display-lg:              # section h2
    fontFamily: "{typography.font-display}"
    fontSize: 30px → 36px (sm)   # text-3xl sm:text-4xl
    fontWeight: 400
  display-md:              # card / legend h3
    fontFamily: "{typography.font-display}"
    fontSize: 24px               # text-2xl
    fontWeight: 400
  stat:                    # price and trust-signal numerals
    fontFamily: "{typography.font-display}"
    fontSize: 37.6px → 60px      # text-[2.35rem]; hero price text-5xl sm:text-6xl
    lineHeight: 1
  eyebrow:
    fontFamily: "{typography.font-body}"
    fontSize: 11–12px            # text-[11px] / text-xs
    textTransform: uppercase
    letterSpacing: 0.28em–0.36em # 0.32em is the default
  lead:
    fontSize: 16px → 18px (sm)
    lineHeight: 32px             # leading-8
  body:
    fontSize: 14px → 16px (sm)   # text-sm sm:text-base
    lineHeight: 28px             # leading-7
  label:
    fontSize: 14px
    fontWeight: 500
  button:
    fontSize: 14px
    fontWeight: 600

rounded:
  pill: 9999px     # buttons, chips, icon badges, progress bars
  hero: 40px       # page hero band
  section: 38px    # section-dark, surface-card, paper sections (34–38px range)
  mega-menu: 30px
  card: 28px       # panels, proof cards, hero side cards
  inner: 22–24px   # tiles inside a section
  control: 18px    # inputs, option tiles

spacing:
  page-gutter: 20px → 32px (lg)          # px-5 lg:px-8
  page-max-width: 90rem                  # max-w-[90rem]
  text-max-width: 48rem–56rem            # max-w-3xl / max-w-4xl
  section-gap: 40px → 64px (lg)          # gap-10 lg:gap-16
  section-padding: 24px → 32px (sm) → 40px (lg)
  card-padding: 20px                     # p-5
  page-bottom: 112px                     # pb-28, clears the mobile sticky CTA

elevation:
  card: "0 22px 56px rgba(6, 47, 64, 0.10)"
  surface-card: "0 24px 60px rgba(6, 47, 64, 0.10)"
  panel-dark: "0 22px 56px rgba(6, 47, 64, 0.16)"
  section-dark: "0 32px 84px rgba(6, 47, 64, 0.20)"
  hero: "0 36px 90px rgba(6, 47, 64, 0.22)"
  mega-menu: "0 32px 90px rgba(3, 26, 37, 0.58)"
  cta-glow: "0 14px 32px rgba(165, 141, 102, 0.18)"

motion:
  default: 200ms (Tailwind `transition` / duration-200)
  progress: 300ms
  reveal: 700ms ease-out   # used once; keep motion rare

components:
  button-primary:
    className: "inline-flex rounded-full bg-[color:var(--gold-300)] px-5 py-3 text-sm font-semibold !text-black transition hover:bg-[color:var(--gold-400)]"
    notes: Near-black text on pale gold. Existing buttons carry `!text-black visited:!text-black`, a leftover from an old global link rule; a plain `text-black` now works.
  button-secondary-on-dark:
    className: "inline-flex rounded-full border border-[rgba(192,213,214,0.28)] bg-[color:var(--surface-subtle)] px-5 py-3 text-sm font-semibold"
  button-text:
    className: "text-sm font-medium text-[color:var(--ink-700)] underline-offset-4 hover:underline"
  chip-on-dark:
    className: "rounded-full border border-[rgba(192,213,214,0.14)] bg-[rgba(192,213,214,0.08)] px-3.5 py-2 text-sm text-white/78"
  icon-badge:
    source: "app/components/SiteIcon.tsx → IconBadge"
    notes: Circular 36px (sm) or 44px (md). Dark tone = gold-300 icon on translucent aqua; light tone = ink-900 icon on white glass.
  icon:
    source: "app/components/SiteIcon.tsx"
    notes: Custom 24×24 line icons, stroke 1.85, round caps and joins, currentColor. Add new icons there — don't import an icon library.
  page-hero:
    className: "page-hero relative overflow-hidden rounded-[40px] border border-[rgba(192,213,214,0.12)] px-6 py-8 sm:px-8 lg:px-10 lg:py-12"
    notes: Navy gradient with a faint 40px aqua grid, gold and teal glows. Photo heroes add a navy overlay at 70–94% so white text stays readable.
  section-dark:
    className: "section-dark rounded-[38px] p-6 text-white sm:p-8"
  panel-dark:
    className: "panel-dark rounded-[28px] p-5 text-white"
  surface-card:
    className: "surface-card rounded-[38px] p-6 sm:p-8 lg:p-10"
    notes: The default light section. Frosted aqua-white with soft glows.
  section-paper:
    className: "rounded-[38px] border border-[color:var(--line-soft)] bg-[color:var(--surface-paper)] p-6 sm:p-8"
  tile-light:
    className: "rounded-[22px] border border-[color:var(--line-soft)] bg-white p-4 text-sm leading-7 text-[color:var(--ink-700)]"
  proof-card:
    source: "app/components/ProofCaseCard.tsx"
    notes: White-glass card, rounded-[28px], before/after images in an aqua-tinted frame, gold eyebrow, serif title. Always paired with `proofDisclaimer`.
  text-input:
    className: "rounded-[18px] border border-[color:var(--line-soft)] bg-[color:var(--surface-paper)] px-4 py-3 text-sm text-[color:var(--ink-950)] outline-none transition focus:border-[color:var(--sage-500)]"
  option-tile:
    notes: Radio/checkbox choice in the assessment form. rounded-[18px], border, focus-within ring in sage-500; selected state gets a darker border and a translucent aqua fill.
  header:
    notes: Sticky, `bg-[color:var(--ink-950)]/90 backdrop-blur-xl`, gold-300 nav icons, gold underline that grows from the left on hover and focus. Collapses to `MobileHeaderNav` below the `xl` breakpoint.
  mobile-sticky-cta:
    source: "app/components/MobileStickyAssessmentCta.tsx"
    notes: Persistent free-assessment CTA on small screens. Pages must leave bottom padding (pb-28) so it never covers content.
---

## Overview

UK Hair Transplant helps people in London and across the UK compare and book hair transplant treatment through partner clinics. The visitor is usually anxious, researching a costly and personal decision, and often comparing London with Turkey. The design has to make them feel **safe, informed and unhurried** before it asks for anything.

That drives three choices:

1. **Navy as the anchor.** Heroes, key panels, the header and the footer are deep navy (`{colors.navy}`), a clinical, trustworthy colour that sets the site apart from the bright, salesy look common in the sector.
2. **Gold as the one accent.** Muted gold marks what matters: the eyebrow above a heading, icons, and the primary "free assessment" button. It suggests premium without shouting.
3. **Soft everything else.** A sand-to-aqua gradient canvas, very rounded cards, gentle shadows and radial glows. Nothing is sharp, loud or crowded.

The code is the source of truth. Tokens live as CSS variables in `app/globals.css`, and the reusable surfaces are the `.page-hero`, `.section-dark`, `.panel-dark` and `.surface-card` classes in the same file. Components use Tailwind v4 with arbitrary values that reference those variables, such as `bg-[color:var(--gold-300)]`.

## Colors

### Brand & Accent
- **Navy `#083a4f`**: the brand. Header, hero, dark sections, the `theme-color` meta tag.
- **Gold-300 `#dfd1ba`**: primary CTA fill, and eyebrows and icons on dark surfaces.
- **Gold-500 `#a58d66`**: eyebrows on light surfaces, where gold-300 would be too pale.
- **Teal `#407e8c` / sage-500**: focus states and interactive feedback. It also tints the background glows.

### Surface
- **Canvas**: `html` carries a fixed gradient (teal glow top left, gold glow top right, aqua glow bottom) over sand `#e5e1dd`. Don't set an opaque background on `body`.
- **Paper `#eef2f0`**: flat light sections and input fills.
- **Surface-card**: the frosted light panel. It's the default container for light content.
- **Dark stack**: `.page-hero` (strongest, with a grid texture) → `.section-dark` → `.panel-dark` → `.panel-dark-muted`. Use them in that order of importance.

### Text
- On light: headings `ink-950`, body `ink-700`, meta `ink-600`.
- On dark: headings white, body `white/68–72`, fine print `white/52`. Don't use pure white for long body copy on navy.

### Semantic
There are no dedicated success, warning or error tokens yet. Form errors currently use existing ink and gold styling. If you add them, define them in `globals.css` first and keep them muted to fit the palette, for example a desaturated red close to `#b4553f` rather than a bright alert red.

## Typography

### Font Family
- **Display**: Iowan Old Style → Palatino → Book Antiqua → Garamond → Georgia. These are system serifs, so nothing is downloaded. Use the `.font-display` class.
- **Body**: Avenir Next → Segoe UI → Helvetica Neue → Arial. This is the Tailwind `font-sans` default.

Both stacks are system fonts, so rendering varies slightly by OS (Iowan and Avenir on Apple devices, Palatino Linotype and Segoe UI on Windows). That is accepted. Don't add web fonts without checking the performance cost.

### Hierarchy
The standard section header is always the same three-part stack:

```
eyebrow   text-xs uppercase tracking-[0.32em] text-[color:var(--gold-500)]   (gold-300 at ~78% on dark)
heading   mt-3 font-display text-3xl sm:text-4xl text-[color:var(--ink-950)]
intro     mt-4 text-sm leading-7 sm:text-base text-[color:var(--ink-700)]   (max-w-3xl)
```

### Principles
- Links take their colour from their own `text-*` class. Don't add an unlayered `a { … }` rule to `globals.css`: in Tailwind v4 it would override every utility colour on links.
- Serif display stays at weight 400. Create emphasis with size, not bold.
- Tracked-out uppercase eyebrows are the brand signature. Use one above every section heading.
- Body copy uses generous line height (`leading-7`, or `leading-8` for leads) with a max width of `3xl` to `4xl`.

## Layout

### Spacing System
- The page container is `mx-auto w-full max-w-[90rem] px-5 lg:px-8`, and sections are separated by `gap-10 lg:gap-16`.
- Sections are self-contained rounded panels floating on the canvas, not full-bleed bands.
- Panel padding steps up with the breakpoint: `p-6 sm:p-8 lg:p-10`.

### Grid & Container
- Asymmetric two-column splits are preferred to equal halves: `lg:grid-cols-[1.2fr_0.8fr]` for the hero and `lg:grid-cols-[0.9fr_1.1fr]` for paired sections.
- Card grids go 1 → 2 (`sm`) → 3 or 4 (`xl`).

### Whitespace Philosophy
Keep it generous. The audience is cautious, and dense layouts read as pressure. When a section feels crowded, cut content or split it rather than tightening the spacing.

## Elevation & Depth

Depth comes from large, soft, navy-tinted shadows (see `elevation`) combined with layered radial gradients inside surfaces. Shadows are always tinted with `rgba(6, 47, 64, …)`, never grey or black. On dark surfaces, cards float using translucent aqua fills (`rgba(192,213,214,0.08)`) with a hairline aqua border.

### Decorative Depth
- Radial glows in teal, gold and aqua sit in the corners of dark surfaces.
- `.page-hero` adds a faint 40px aqua grid.
- The nav hover gets a soft gold glow behind the link.

Keep each of these subtle. If a glow is noticeable on its own, it's too strong.

## Shapes

### Border Radius Scale
See `rounded` in the tokens. Radius steps down as you nest, from 40px for the hero, 38px for sections and 28px for cards to 22px for tiles and 18px for controls, so inner corners always look concentric. Buttons, chips, badges and progress bars are always pills.

### Photography & Illustrations
- **Photography**: real clinic and patient imagery, darkened by a navy overlay whenever text sits on top of it.
- **Before/after images**: only publish cases that pass `isPublishableProofCase` in `app/lib/proof.ts`, and always show `proofDisclaimer` next to them.
- **No stock "smiling model" imagery** and no illustrations. Icons come from `SiteIcon` only.

## Components

The `components:` block in the frontmatter holds canonical class strings. Summary:

### Top Navigation
A sticky navy glass header with the logo (`BrandLogo`: mark, gold-300 "Premium London Hair Transplant" eyebrow and serif wordmark), gold-iconed nav items, and navy mega-menus (`rounded-[30px]`). Below `xl` it collapses to `MobileHeaderNav`.

### Buttons
- **Primary**: gold-300 pill with black semibold text. It's used for the one main action, which is almost always the free assessment.
- **Secondary on dark**: an aqua pill.
- **Tertiary**: a text link with an underline on hover.

Use no more than two buttons side by side.

### Cards & Containers
`surface-card` for light content, `section-dark` and `panel-dark` for dark content, `section-paper` for flat light content, `tile-light` for items inside a section, and `ProofCaseCard` for results.

### Inputs & Forms
Paper-filled inputs with 18px radius and a sage-500 focus border. Labels sit above inputs as `text-sm font-medium text-ink-900`. The assessment form is multi-step, with a pill progress bar and uppercase step label.

### Tags / Badges
Pill chips, translucent on dark. `IconBadge` wraps a `SiteIcon` in a circle.

### CTA / Footer
Every page ends by routing people to the free assessment (`AssessmentSection`) and offers WhatsApp and phone as secondary contact options (`SecondaryContactActions`). On mobile, `MobileStickyAssessmentCta` stays pinned.

## Content & Voice Rules

These are design-adjacent rules that any generated UI must respect:

- **Attribute content to the company.** Bylines read "the UK Hair Transplant team". Never show named clinicians, surgeons or reviewers, and never name partner clinics.
- **UK healthcare advertising rules apply.** No guaranteed results, no "best/cheapest" superlatives, no pressure tactics such as countdown timers or "only 2 slots left", and no before/after images without the disclaimer.
- **Keep price claims tied to the source.** Prices come from `app/lib/pricing.ts`, and any struck-through "was" price must be the real one.
- **Reassure first, sell second.** Credentials (GMC doctors, CQC-registered settings, London location) come before offers.

## Do's and Don'ts

### Do
- Reference tokens through `var(--…)`. Add any new colour to `globals.css` before using it.
- Put an eyebrow, serif heading and intro above every section.
- Keep gold scarce: one primary CTA per view, plus eyebrows and icons.
- Alternate light (`surface-card`, paper) and dark (`section-dark`) sections down the page.
- Nest radii from large to small.
- Leave `pb-28` at the bottom of pages so the mobile sticky CTA never covers content.
- Keep a visible focus state on everything interactive (sage-500 ring or border, gold underline in the nav).

### Don't
- Don't use a colour that isn't defined as a variable in `globals.css`.
- Don't bold the serif, and don't use the serif for body copy.
- Don't use bright or saturated colours, pure black backgrounds, or grey shadows.
- Don't use sharp corners (`rounded-none`, or `rounded-md` on cards).
- Don't add an icon library, emoji icons or illustrations.
- Don't use full-bleed edge-to-edge sections. Sections float as rounded panels inside the 90rem container.
- Don't use heavy motion. Stick to 200ms transitions, and use at most one reveal animation per page.

## Responsive Behavior

### Breakpoints
Tailwind defaults: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px.

| Range | Key changes |
|---|---|
| < 640px | Single column. Hero h1 is 36px. Mobile-only variants appear: 2 trust pillars, 1 proof case, 4 FAQs. The sticky assessment CTA is visible. |
| 640–1023px | Card grids go 2-up. Section padding increases to `p-8`. |
| 1024–1279px | Asymmetric two-column hero and section splits. Hero h1 is 74px. |
| ≥ 1280px | Full desktop nav with mega-menus replaces `MobileHeaderNav`. Card grids go 3–4 up. |

### Touch Targets
Buttons are at least 44px tall (`py-3` plus `text-sm`), and `IconBadge` md is 44px. Option tiles in the assessment form are fully tappable labels.

### Collapsing Strategy
The homepage renders separate mobile and desktop variants (`sm:hidden` / `hidden sm:block`) instead of just reflowing. Mobile gets fewer, shorter items. Follow the same pattern when a section would run long on a phone.

## Iteration Guide

1. Start from an existing surface class or a component in `app/components/` before writing new styling.
2. Copy class strings from the `components:` block rather than inventing near-duplicates.
3. When a value repeats in three or more places, promote it to a CSS variable or class in `globals.css`.
4. Check every new screen at 375px wide, and check it in both light sections and on navy.
5. Update this file whenever `globals.css` changes.

## Known Gaps

- No semantic success, warning or error tokens.
- Many one-off `rgba(...)` values are inlined in components instead of tokenised.
- No dark mode. The site is designed as a single light theme with dark sections.
