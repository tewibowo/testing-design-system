# V2 builder contract — StraitsX "ivy" edition

Addendum to `app/BUILDERS.md` (nav/sheet/motion/data rules unchanged).
Design source of truth: `reference/specs/v2-mobbin-brief.md` — read §1 fully,
then YOUR area's §2 section, §3 row(s), and §4 motion notes.

## Ownership & registration

You own `app/src/v2/screens/<area>/`. Do NOT touch shared files
(`src/v2/core/*`, `src/v2/styles/v2-theme.css`, `src/nav/*`, `src/motion/*`,
`src/data/db.js`, v1 code). Export routes from your folder's `routes.js` as
`export const v2<Area>Routes = { "v2/<area>/<name>": Screen }`.

### Canonical v2 routes (fixed names)

| Route | Owner | Notes |
| --- | --- | --- |
| `v2/lock` | auth | initial screen: passcode + biometric (§2.6) |
| `v2/root` | integrator | tab UI; `nav.reset("v2/root")` after unlock |
| `v2/swap` | swapmint | keypad-first swap push (§2.2) |
| `v2/mint` | swapmint | mint (ivy re-skin of v1 content) |
| `v2/withdraw` | moveflows | recipient → amount → review (§2.4) |
| `v2/deposit/bank` | moveflows | FAST copy-rows branch (§2.3) |
| `v2/deposit/blockchain` | moveflows | QR branch (§2.3) |

Tab roots (named component exports, not routes): `V2HomeTab` from
`screens/home/V2HomeTab.jsx`, `V2ActivityTab` from
`screens/activity/V2ActivityTab.jsx`, `V2AccountTab` from
`screens/account/V2AccountTab.jsx`. Tab roots render inside the shared
V2RootTabs host — no tab bar of your own; content fills `.tab-pane`.

## Shared v2 core (already built — use, don't rebuild)

- Theme vars on `.device.v2` (see `src/v2/styles/v2-theme.css`): `--v2-bg`,
  `--v2-surface` (teal card), `--v2-chip`, `--v2-pressed`, `--v2-line`,
  `--v2-text`, `--v2-text-dim`, `--v2-text-faint`, `--v2-accent`, `--v2-mint`,
  `--v2-gold`, `--v2-critical`, `--v2-warning`. Utility classes: `.v2-card`,
  `.v2-chip` (+ `.is-active`), `.v2-presets`.
- `PatternBg` (`@app/v2/core/PatternBg.jsx`) — logomark 10% backdrop; place as
  first child of a relatively-positioned hero region.
- `Keypad` + `applyKey` (`@app/v2/core/Keypad.jsx`) — ALL amount entry.
  Amounts are NEVER text inputs in v2. Passcode uses `decimal={false}`.
- Move sheet + tab bar are wired by the integrator; your screens are pushed
  with the routes above.
- `Money`, `SuccessState`, `AppHeader` from v1 `@app/ui/*` still apply.
  SuccessState on ivy: it already uses brand green — verify contrast, don't
  restyle globally.

## v2 style rules (from the brief — binding)

- Dark ivy ground `var(--v2-bg)`; cards are teal `var(--v2-surface)` radius 12;
  hierarchy via hairlines `var(--v2-line)`, never shadows; NO gradients, NO
  blur/frosted glass.
- Numerals: Red Hat Mono 500 tabular everywhere (`.money` class or font
  shorthand); big amounts 32–56px; small-cents treatment on heroes (decimals
  at ~56% size, `--v2-text-dim`).
- Positive deltas/success accents: mint `var(--v2-mint)`. Critical:
  `var(--v2-critical)` (tinted for dark). Primary CTA pill unchanged: green bg,
  ivy text; disabled = `var(--v2-chip)` bg + `--v2-text-faint)` text (do NOT
  use the DS Button's light-theme disabled greys — style pills with `.v2-*`
  classes in your own CSS).
- Sheet-first: pickers/filters/detail/review = `useSheet`; pushes only for
  multi-step flows.
- Motion: presets only; §4 of the brief maps every cue (keypad tick ≤ DUR.fast,
  error shake ±4px 120ms, layoutId travels, stagger 50ms). No bounce.
- Sentence case, no emoji, verbatim dummy data from `@app/data/db.js`.
- CSS: own file(s), prefix `v2<area>-` (e.g. `v2home-`).

## Definition of done

Everything in your §2 section exists and is clickable end-to-end with db
data; fake async = ~600ms; every import resolves (verify DS/core APIs by
reading the source); no shared files touched; no npm build/dev runs.
