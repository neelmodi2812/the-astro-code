---
name: Vedic Minimalist Modern
colors:
  surface: '#f6fafd'
  surface-dim: '#d6dbdd'
  surface-bright: '#f6fafd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f4f7'
  surface-container: '#eaeef1'
  surface-container-high: '#e5e9ec'
  surface-container-highest: '#dfe3e6'
  on-surface: '#171c1f'
  on-surface-variant: '#3d4947'
  inverse-surface: '#2c3134'
  inverse-on-surface: '#edf1f4'
  outline: '#6d7a77'
  outline-variant: '#bcc9c6'
  surface-tint: '#765a00'
  primary: '#765a00'
  on-primary: '#ffffff'
  primary-container: '#fdc72d'
  on-primary-container: '#6f5400'
  inverse-primary: '#f4bf23'
  secondary: '#00685d'
  on-secondary: '#ffffff'
  secondary-container: '#008376'
  on-secondary-container: '#f4fffb'
  tertiary: '#b7131d'
  on-tertiary: '#ffffff'
  tertiary-container: '#db3232'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdf96'
  primary-fixed-dim: '#f4bf23'
  on-primary-fixed: '#251a00'
  on-primary-fixed-variant: '#5a4400'
  secondary-fixed: '#8bf5e4'
  secondary-fixed-dim: '#6ed8c8'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005048'
  tertiary-fixed: '#ffdad6'
  tertiary-fixed-dim: '#ffb3ac'
  on-tertiary-fixed: '#410003'
  on-tertiary-fixed-variant: '#930010'
  background: '#f6fafd'
  on-background: '#171c1f'
  surface-variant: '#dfe3e6'
typography:
  headline-xl:
    fontFamily: Noto Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 46px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Noto Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Noto Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-lg-mobile:
    fontFamily: Noto Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
  headline-md:
    fontFamily: Noto Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-lg:
    fontFamily: Noto Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  title-md:
    fontFamily: Noto Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Noto Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Noto Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Noto Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Noto Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
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

This design system establishes a tranquil, culturally resonant, and intellectually credible medium for modern Hindu astrology, daily Panchang, and spiritual journalism. It balances the sacred warmth of traditional Vedic rituals with the structured clarity of premium editorial design.

The aesthetic fuses modern editorial journalism with spiritual reverence:
- Clean, open, magazine-style layouts with generous breathing room.
- High-dignity visual anchors using sacred colorways—golden saffron for solar energy and illumination (Surya/Jupiter), emerald teal for balance and cosmic intellect (Budha/Mercury), and deliberate touches of vermilion sindoor red for auspicious significance (Mangal).
- Respectful devotional framing that elevates astrological insights above superstition, presenting data, rituals, and interpretations with contemporary editorial authority.

## Colors

The palette draws directly from sacred temple iconography and celestial symbolism, calibrated for contemporary mobile displays:

- **Primary (`#F6C125`)**: Golden Saffron. Evokes the dawn sun, marigold offerings, and sacred knowledge. Acts as the core interactive color for primary action buttons, focused tab states, active devotional filters, and editorial badge fills.
- **Secondary (`#008D7F`)**: Deep Emerald Teal. Represents intellect, balance, and inner calm. Applied as high-value accents, active star ratings, ritual progress rings, festive banners, and subtle border highlights.
- **Tertiary (`#DD3333`)**: Deep Auspicious Vermilion. Used sparingly for critical planetary alerts (Rahu Kaal, doshas), sacred tithi indicators, breaking spiritual news, and high-priority ritual reminders.
- **Neutral Canvas (`#EEF2F5`)**: Cool soft sky-grey base canvas that relieves eye strain during extended scripture and horoscope reading.
- **Mystic Surface (`#141414`)**: Cosmic Charcoal. Reserved exclusively for celestial chart viewports, mystic night-mode modules, splash moments, and immersive Panchang headers.
- **Surface Elevation (`#FFFFFF`)**: Pure White. Foundation for editorial cards, reading sheets, and interactive dialogs.

## Typography

The type system is engineered to effortlessly harmonize dual-script layouts across Gujarati and English without optical baseline jitter or unbalanced visual weight. 

`Noto Sans` (with matched `Noto Sans Gujarati` weights) serves as the primary typographic anchor, providing unified metrics for complex ligatures, matras, and conjuncts:

- **Bilingual Equilibrium:** Line-heights for body text are calibrated generously (`1.55` to `1.625`) to accommodate Gujarati vowel marks and subscript matras without clipping or visual collision.
- **Editorial Headings:** Bold, grounded headline weights impart the gravitas of a revered broadsheet publication.
- **Astrological Data Tables:** Panchang numbers, Nakshatra degrees, and Muhurta timings maintain strict tabular clarity for immediate scanning.

## Layout & Spacing

The layout follows a disciplined fluid column model optimized for single-handed mobile navigation while seamlessly expanding to tablet reading modes:

- **Mobile Viewports (<600px):** 4-column fluid layout with `16px` (`1rem`) outer margins and `16px` gutters. Provides edge-to-edge breathing room while keeping horizontal scroll lanes (e.g., daily planetary transits) clean and discoverable.
- **Tablet / Large Mobile (>600px):** 8-column layout with `24px` margins and `16px` gutters, allowing side-by-side reading cards and astrological chart panes.
- **Rhythm & Cadence:** All vertical padding adheres to an 8-point spatial increment (`space-xs` = 4px, `space-sm` = 8px, `space-md` = 16px, `space-lg` = 24px, `space-xl` = 32px), creating disciplined alignment between editorial photography, daily horoscopes, and prayer trackers.

## Elevation & Depth

This design system uses soft, multi-layered ambient shadows combined with subtle border strokes to maintain tactile clarity over light surfaces:

- **Base Ambient Shadow:** Surfaces sit above the `#EEF2F5` background using warm-tinted diffusion: `0 4px 16px -2px rgba(18, 38, 48, 0.06), 0 2px 6px -1px rgba(18, 38, 48, 0.04)`. This creates a crisp, float-card feel without dark, dirty grey perimeters.
- **Interactive Focus / Lift:** Hover or active selection triggers an elevated state: `0 10px 24px -4px rgba(246, 193, 37, 0.12), 0 4px 8px -2px rgba(0, 0, 0, 0.04)`.
- **Mystic Charcoal Tiers:** For dark cosmic containers (`#141414`), depth is achieved through translucent layered surfaces (`rgba(255, 255, 255, 0.05)`) paired with hairline inner borders (`rgba(0, 141, 127, 0.2)` or `rgba(255, 255, 255, 0.08)`) instead of drop shadows.

## Shapes

The geometric personality features soft, hospitable contours that feel friendly, welcoming, and contemporary:

- **Cards & Surface Containers:** Standardized at `16px` border-radius (`rounded-lg`) to evoke polished editorial cards.
- **Buttons & Interactive Tags:** Configured with `8px` (`rounded`) for functional controls, with full pill-capsules reserved for devotional filter chips and audio chant controllers.
- **Nested Inner Assets:** Inner images, horoscope glyph plates, and thumbnail frames mirror the outer card radius proportionately at `8px` to `12px`.

## Components

### Buttons
- **Primary:** Solid Saffron Gold (`#F6C125`) fill with dark `#141414` typography (for contrast), `8px` border-radius, minimum 48px touch target height. Subtle emerald teal indicator dot on right side for auspicious tasks.
- **Secondary / Action:** Outlined in `#008D7F` (1.5px border) over transparent or white background with `#008D7F` text.
- **Sacred Accent:** Solid Emerald Teal (`#008D7F`) button with pure white text, used exclusively for secondary conversion paths (e.g., "Book Kundali Consultation", "Start Puja").

### Category Badges & Chips
- **Category Badge:** Solid Saffron (`#F6C125`) surface with crisp `#141414` uppercase label typography (`label-sm`), `4px` corner radius, and `4px 8px` internal padding.
- **Filter Chips:** Light background (`#FFFFFF`) with 1px border (`#DCE3E8`), transitions to `#F6C125` background with `#141414` text when selected.

### Editorial & Astrological Cards
- **Horoscope / Article Card:** Crisp `#FFFFFF` surface, `16px` corner radius, ambient soft shadow. Houses editorial category badge at top left, headline in `headline-md`, concise body summary, and a subtle teal bottom-border accent line (`2px` emerald accent) on high-significance cards.
- **Kundali & Cosmic Chart Card:** Embedded within `#141414` charcoal background, framed with subtle teal grid lines (`#008D7F` at 30% opacity) and clear dual-language planet labels.

### Lists & Panchang Data Tables
- Clean white rows divided by `#EEF2F5` hairline dividers. Muhurta time blocks highlight auspicious windows (Shubh, Amrit) using soft saffron indicators and inauspicious windows (Rahu Kaal) using soft vermilion tints (`#DD3333` text over `rgba(221, 51, 51, 0.08)` background).

### Input Fields & Controls
- **Form Inputs:** 48px height, `#FFFFFF` background, `8px` corner radius, bordered by `#CFD8DC`. Active focus switches border to `#F6C125` with a soft 3px outer glow (`rgba(246, 193, 37, 0.15)`).
- **Checkboxes & Radios:** Saffron fill with dark glyph checkmark when active; subtle emerald teal accent halo when focused.

### Specialized Devotional Components
- **Chant Counter (Japa Bead Controller):** Circular elevated touch dial with emerald teal progress arc tracking mantra repetitions.
- **Bilingual Language Switcher:** Persistent minimal segmented toggle (EN | ગુજ) positioned unobtrusively in top header navigation bar.