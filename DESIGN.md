---
name: Vedic Minimalist Modern — The Astro Code
colors:
  surface: '#faf8f3'
  surface-dim: '#e6e2d6'
  surface-bright: '#ffffff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f2e9'
  surface-container: '#f0ede4'
  surface-container-high: '#eae6da'
  surface-container-highest: '#e2dec9'
  on-surface: '#121a2b'
  on-surface-variant: '#4a5368'
  inverse-surface: '#0b101e'
  inverse-on-surface: '#f4f6fb'
  outline: '#737c91'
  outline-variant: '#e2dec9'
  surface-tint: '#946600'
  primary: '#f5b316'
  primary-bright: '#fdc72d'
  primary-text-safe: '#946600'
  on-primary: '#0f172a'
  primary-container: '#fef4d1'
  on-primary-container: '#182f5e'
  inverse-primary: '#fdc72d'
  secondary: '#254689'
  on-secondary: '#ffffff'
  secondary-container: '#3b63b5'
  on-secondary-container: '#ffffff'
  tertiary: '#c81e24'
  on-tertiary: '#ffffff'
  tertiary-container: '#ef4444'
  on-tertiary-container: '#ffffff'
  auspicious-teal: '#008d7f'
  auspicious-teal-dark: '#00685d'
  error: '#c81e24'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#fef4d1'
  primary-fixed-dim: '#f5b316'
  on-primary-fixed: '#0f172a'
  on-primary-fixed-variant: '#8a5d00'
  secondary-fixed: '#dce5ff'
  secondary-fixed-dim: '#3b63b5'
  on-secondary-fixed: '#0b101e'
  on-secondary-fixed-variant: '#182f5e'
  tertiary-fixed: '#ffdad6'
  tertiary-fixed-dim: '#ffb3ac'
  on-tertiary-fixed: '#410003'
  on-tertiary-fixed-variant: '#930010'
  background: '#faf8f3'
  on-background: '#121a2b'
  surface-variant: '#f0ede4'
  dark-background: '#0b101e'
  dark-surface: '#131b2e'
  dark-surface-muted: '#1a243b'
  dark-on-surface: '#f4f6fb'
  dark-on-surface-variant: '#9da8c2'
typography:
  font-stack-gujarati: "var(--font-noto-sans-gujarati), 'Noto Sans Gujarati', 'Anek Gujarati', 'Gujarati Sangam MN', 'Shruti', sans-serif"
  font-stack-english: "var(--font-geist-sans), 'Geist', system-ui, -apple-system, sans-serif"
  font-stack-mono: "var(--font-geist-mono), 'Geist Mono', monospace"
  headline-xl:
    fontFamily: Noto Sans Gujarati / Geist
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 46px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Noto Sans Gujarati / Geist
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Noto Sans Gujarati / Geist
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Noto Sans Gujarati / Geist
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
  headline-md:
    fontFamily: Noto Sans Gujarati / Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-lg:
    fontFamily: Noto Sans Gujarati / Geist
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  title-md:
    fontFamily: Noto Sans Gujarati / Geist
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Noto Sans Gujarati / Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Noto Sans Gujarati / Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 23px
  body-sm:
    fontFamily: Noto Sans Gujarati / Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 19px
  label-lg:
    fontFamily: Noto Sans Gujarati / Geist
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Noto Sans Gujarati / Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Noto Sans Gujarati / Geist
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.375rem
  DEFAULT: 0.5rem
  md: 0.625rem
  lg: 0.875rem
  xl: 1.125rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes a tranquil, culturally resonant, and intellectually credible medium for **The Astro Code — Unlock Happiness**, covering modern Vedic astrology, daily Panchang, Kundali analysis, and spiritual journalism. It harmonizes the sacred warmth of traditional Vedic yantras with the structured clarity of contemporary editorial design.

The aesthetic fuses modern editorial precision with celestial authority:
- Clean, open, magazine-style layouts with generous breathing room on a warm parchment canvas.
- High-dignity visual anchors derived directly from **The Astro Code** brand mark: **Solar Saffron Gold** (`#f5b316` / `#fdc72d`) for solar illumination and divine wisdom (Surya/Brihaspati), **Cosmic Royal Blue** (`#254689`) for celestial depth, trust, and cosmic order (Shani/Akasha), **Emerald Teal** (`#008d7f`) for auspicious progress (Budha/Shubh), and **Auspicious Vermilion** (`#c81e24`) for critical planetary alerts (Mangal/Rahu Kaal).
- Respectful devotional framing that elevates astrological insights above superstition, presenting astronomical calculations, rituals, and interpretations with contemporary editorial authority.

## Colors

The palette is synchronized directly with `globals.css` and calibrated for WCAG AA/AAA accessibility across both Light and Dark modes:

- **Primary (`#f5b316` Light / `#fdc72d` Dark — `--primary`)**: Solar Saffron Gold. Evokes the dawn sun, sacred yantra geometry, and illumination. Acts as the primary conversion color for main CTA buttons, active tab states, focused filters, and badge fills.
- **Accessible Gold Text (`#946600` — `--color-saffron-text`)**: Deepened Saffron Gold engineered specifically for inline text, subheadings, and iconography over light parchment/white surfaces to pass strict 4.5:1+ WCAG AA contrast requirements.
- **Secondary (`#254689` Light / `#3459a8` Dark — `--secondary`)**: Cosmic Royal Blue. Drawn directly from "THE ASTRO CODE" wordmark. Used for primary brand headers, secondary conversion buttons, trust badges, focus rings, and structural accents.
- **Auspicious Accent (`#008d7f` — `--color-teal`)**: Deep Emerald Teal. Reserved for positive Shubh/Amrit Muhurta indicators, ritual progress rings, and auspicious compatibility scores.
- **Tertiary / Destructive (`#c81e24` Light / `#ef4444` Dark — `--destructive`)**: Deep Auspicious Vermilion. Used sparingly for critical planetary alerts (Rahu Kaal, Mangal Dosha), sacred tithi warnings, and form validation errors.
- **Light Neutral Canvas (`#faf8f3` — `--background`)**: Warm Sacred Parchment base canvas paired with crisp Pure White (`#ffffff` — `--card`) elevated surfaces and deep cosmic ink typography (`#121a2b` — `--foreground`) to prevent eye strain during long horoscope or scripture reading sessions.
- **Dark Celestial Canvas (`#0b101e` — `--background` in `.dark`)**: Celestial Midnight base canvas paired with Astral Navy cards (`#131b2e` — `--card`) and subtle gold-tinted hairline borders (`rgba(253, 199, 45, 0.16)`), creating an immersive night-sky environment for Kundali charts and dark-mode readers.

## Typography

The type system is engineered to effortlessly harmonize dual-script layouts across Gujarati and English without optical baseline jitter or unbalanced visual weight:

- **Gujarati & Bilingual Default (`Noto Sans Gujarati` & `Anek Gujarati`)**: Serves as the primary typographic anchor when rendering Gujarati or mixed-script content, providing unified metrics for complex ligatures, matras, and conjuncts.
- **Explicit English Mode (`Geist` & `Geist Mono`)**: Activated automatically via `html[lang="en"]` or `.font-english` for crisp, modern editorial legibility on English pages and tabular astrological coordinates.
- **Bilingual Equilibrium**: Body line-height is set to `1.65` (`line-height: 1.65` in `globals.css`) to accommodate upper and lower Gujarati vowel marks without clipping.
- **Astrological Data Tables**: Planetary degrees, Nakshatra padas, and Panchang timings use `font-mono` (`Geist Mono`) or `tabular-nums` for strict vertical alignment.

## Layout & Spacing

The layout follows a disciplined fluid column model optimized for single-handed mobile navigation while seamlessly expanding to tablet and desktop reading modes:

- **Mobile Viewports (<640px)**: 4-column fluid layout with `16px` (`1rem`) outer margins, `16px` gutters, and `.pb-safe` bottom padding to respect mobile gesture bars.
- **Tablet Viewports (640px–1024px)**: 8-column layout with `24px` (`1.5rem`) outer margins and `16px` gutters, enabling side-by-side Kundali charts and planetary transit cards.
- **Desktop Viewports (>1024px)**: 12-column max-width container (`1280px`) with `32px` (`2rem`) outer padding, keeping long-form spiritual journalism constrained to an optimal `65ch–75ch` reading measure.
- **Rhythm & Cadence**: All vertical and horizontal spacing adheres to an 8-point spatial scale (`space-xs` = 4px, `space-sm` = 8px, `space-md` = 16px, `space-lg` = 24px, `space-xl` = 32px).

## Elevation & Depth

Surfaces rely on warm-tinted ambient diffusion in light mode and luminous gold-bordered layering in dark mode:

- **Base Ambient Shadow (Light Mode)**: Cards sit above the `#faf8f3` parchment canvas using warm-tinted diffusion: `0 4px 16px -2px rgba(18, 26, 43, 0.06), 0 2px 6px -1px rgba(18, 26, 43, 0.04)` paired with a `1px` border (`#e2dec9`).
- **Interactive Focus / Hover Lift**: Hover or active card selection triggers a golden-tinted elevation: `0 10px 24px -4px rgba(245, 179, 22, 0.16), 0 4px 8px -2px rgba(18, 26, 43, 0.05)`.
- **Celestial Midnight Tiers (Dark Mode)**: On `#0b101e` dark backgrounds, depth is achieved through Astral Navy card surfaces (`#131b2e`) paired with hairline solar-gold inner borders (`rgba(253, 199, 45, 0.16)`) and subtle radial glow utilities (`.animate-pulse-glow`).

## Shapes

The geometric personality uses `--radius: 0.625rem` (`10px`) as the base token in `globals.css`, scaling proportionally across components:

- **Cards & Surface Containers**: `rounded-xl` (`14px`) to `rounded-2xl` (`18px`) for editorial horoscope cards, modal dialogs, and Kundali viewports.
- **Buttons & Input Controls**: `rounded-lg` (`10px`) for primary buttons, text inputs, and select dropdowns; `rounded-full` (`9999px`) reserved for Rashi filter pills, Nakshatra tags, and Japa audio controls.
- **Nested Inner Assets**: Inner thumbnails, zodiac SVG plates, and chart frames step down to `rounded-md` (`8px`) so concentric corners align cleanly.

## Components

### Buttons
- **Primary CTA**: Solid Solar Saffron Gold (`bg-primary` / `#f5b316` in light, `#fdc72d` in dark) with deep cosmic ink typography (`text-primary-foreground` / `#0f172a`), `10px` border-radius (`rounded-lg`), minimum `48px` touch target height, and bold weight.
- **Secondary Brand Action**: Solid Cosmic Royal Blue (`bg-secondary` / `#254689`) with pure white text (`text-secondary-foreground` / `#ffffff`), used for high-trust secondary actions (e.g., "Book Kundali Consultation", "Download PDF Report").
- **Outline / Ghost Action**: `1.5px` border in `#e2dec9` (Light) or `rgba(253, 199, 45, 0.24)` (Dark) with `#121a2b` / `#f4f6fb` text, transitioning to `--accent` (`#fef4d1` Light / `#1e2942` Dark) on hover.

### Category Badges & Chips
- **Editorial Badge**: Soft Saffron tint (`bg-accent` / `#fef4d1`) with Cosmic Deep Blue typography (`text-accent-foreground` / `#182f5e`) in light mode, or `#1e2942` background with `#fdc72d` text in dark mode (`label-sm`, uppercase, `6px` corner radius).
- **Filter Chips**: `#ffffff` surface with `1px` `#e2dec9` border; active state transitions to solid `#254689` (Cosmic Blue) with `#ffffff` text or solid `#f5b316` (Solar Gold) with `#0f172a` text.

### Editorial & Astrological Cards
- **Horoscope / Article Card**: Crisp `#ffffff` surface (Light) or `#131b2e` (Dark), `14px` corner radius (`rounded-xl`), `1px` border (`var(--border)`), housing category badge, `headline-md` title, body summary in `--muted-foreground` (`#4a5368` Light / `#9da8c2` Dark), and a `2px` bottom accent bar in Cosmic Blue (`#254689`) or Solar Gold (`#f5b316`).
- **Kundali & Cosmic Chart Card**: Set on Celestial Midnight (`#0b101e` or `#131b2e`), framed with `1px` golden-amber geometry lines (`rgba(253, 199, 45, 0.35)`) and dual-language planet glyphs.

### Lists & Panchang Data Tables
- Clean rows separated by `var(--border)` hairline dividers.
- **Shubh / Amrit Muhurta Windows**: Highlighted using Emerald Teal badges (`#008d7f` text/icon over `rgba(0, 141, 127, 0.1)` background).
- **Rahu Kaal / Inauspicious Windows**: Highlighted using Auspicious Vermilion badges (`#c81e24` text over `rgba(200, 30, 36, 0.08)` background in Light; `#ef4444` text over `rgba(239, 68, 68, 0.14)` in Dark).

### Input Fields & Controls
- **Form Inputs**: `48px` height, `#ffffff` (Light) or `#131b2e` (Dark) background, `10px` corner radius (`rounded-lg`), `1px` border (`var(--input)`). Active focus applies `ring-2 ring-ring` (`#254689` in Light, `#fdc72d` in Dark).

### Specialized Devotional Components
- **Chant Counter (Japa Bead Controller)**: Circular elevated touch dial with a Solar Gold (`#f5b316`) and Emerald Teal (`#008d7f`) progress arc tracking 108 mantra repetitions.
- **Bilingual Language Switcher**: Persistent minimal segmented toggle (`EN` | `ગુજ`) in the top navigation bar that switches both route locale and typographic utility classes (`.font-english` vs `.font-gujarati`).

## SEO, Accessibility & Core Web Vitals Standards

To maximize Google Search rankings, Lighthouse scores, and user retention across mobile devices:

- **Strict WCAG AA/AAA Contrast**: Never render raw yellow/gold (`#fdc72d` or `#f5b316`) as small text on white or `#faf8f3` backgrounds. Always use `--color-saffron-text` (`#946600`) for gold-themed text on light backgrounds, and reserve `#fdc72d` for text on dark surfaces (`#0b101e` / `#131b2e`) or solid button fills with `#0f172a` dark text.
- **Zero Cumulative Layout Shift (CLS)**: All Kundali SVG charts, zodiac illustrations, and rotating yantra animations (`.animate-spin-slow`, `.animate-spin-reverse`) must have explicit `width`, `height`, or `aspect-ratio` containers, and `html, body` must retain `overflow-x: clip`.
- **Smooth Interaction to Next Paint (INP)**: Decorative celestial animations must stay restricted to compositor-only properties (`transform`, `opacity`, `filter`) and automatically disable when `@media (prefers-reduced-motion: reduce)` is active.
- **Semantic Document Hierarchy**: Every Panchang, Rashi, and Kundali page must use a single `<h1>` (`headline-xl`), logical `<h2>`/`<h3>` sub-sections, and descriptive `alt` attributes on all yantra/zodiac graphics for rich snippet indexing.