---
name: straitsx-design
description: Use this skill to generate well-branded interfaces and assets for StraitsX, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping. StraitsX is a Singapore-based payments-infrastructure and stablecoin issuer (XSGD, XUSD, XIDR) with a regulated, security-first brand voice.
user-invocable: true
---

# StraitsX design

Read the README.md file within this skill, and explore the other available files.

Key entry points:
- `README.md` — full brand context: voice, visual foundations, iconography, caveats.
- `colors_and_type.css` — copy this into any HTML you write and import it; it sets `--sx-*` design tokens, registers the brand `@font-face` rules, and defines the full type scale.
- `fonts/` — Hanken Grotesk + Red Hat Display variable TTFs. Copy these alongside the CSS for offline-correct rendering. (Red Hat Mono comes from Google Fonts.)
- `assets/` — official StraitsX logomark SVGs.
- `preview/` — small specimen cards for every token group. Read these to see tokens used in context.
- `ui_kits/personal-account/` — full dashboard recreation (Sidebar / TopBar / OnboardingSteps / TransferPanel / OtcBanner / EmptyState). Lift components from here when building dashboard-flavoured surfaces.

## When working

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out of this skill and create static HTML files for the user to view. Always link `colors_and_type.css` and use the `--sx-*` tokens. Pull the logomark from `assets/logomark-full.svg` (vibrant green) or `assets/logo-icon-stroke.svg` (24×24 monochrome, paints with `color`).

If working on production code, copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions (audience, surface, light/dark, marketing-vs-product register), and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick brand reminders

- **Voice:** plain, confident, security-first. Sentence case. "You" in product, "we" in marketing. No emoji. Numerics in Red Hat Mono with tabular figures.
- **Type pairing:** Red Hat Display Bold for headings / labels / buttons; Hanken Grotesk for body & paragraph-style headlines; Red Hat Mono for numerals.
- **Colour priority:** Vibrant Green (`#00D37E`) for highlights / primary actions; Secure Teal (`#054948`) and Stable Deep Ivy (`#002B2A`) do the structural and text work. Light surfaces dominate product UI; dark Secure Teal is reserved for marketing surfaces and promo cards (e.g. OTC Desk).
- **Components:** pill buttons (radius 999), 8-px cards, 12-px inputs, 3-tier shadow system. Material Symbols Rounded for icons. Status uses positive / critical / warning / information / neutral with matching soft fill + border tones.
- **Don't:** invent new colours, use gradients in product UI, use emoji, mix in legacy Source Sans Pro / IBM Plex (they appear in archived Figma frames but are deprecated).
