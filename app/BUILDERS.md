# Screen builder contract — StraitsX mobile PWA

You are building screens for `app/` (Vite + React 19 + `motion`). Follow this
contract exactly; the integrator merges your work without edits.

## Ownership

You own ONE folder: `app/src/screens/<area>/`. Create all your JSX/CSS there.
Do NOT edit any shared file (`screens/index.js`, `App.jsx`, `nav/*`, `ui/*`,
`styles/app.css`, `motion/presets.js`, `data/db.js`). Read anything you like.

## Registration

Export your screens from `app/src/screens/<area>/routes.js`:

```js
import { LoginScreen } from "./LoginScreen.jsx";
export const authRoutes = {
  "auth/login": LoginScreen,
  "auth/2fa": TwoFaScreen
};
```

Screen names are `"<area>/<name>"`. Screen components receive
`{ params, isTop }`. The integrator wires routes into the registry.

## Navigation

```js
import { useNav } from "@app/nav/Navigator.jsx";
const nav = useNav();
nav.push("transfers/amount", { asset: "XSGD" });
nav.pop();            // back (edge-swipe also pops)
nav.popToRoot();      // back to tab root
nav.replace(name, params);
nav.reset(name);      // new stack root (e.g. after login)
```

Pushed screens slide in iOS-style automatically — do NOT animate your screen
root. Animate only content within the screen.

## Bottom sheets

```js
import { useSheet } from "@app/nav/Sheet.jsx";
const { openSheet, closeSheet } = useSheet();
openSheet(({ close }) => <MyPicker onDone={close} />);
```

Sheet chrome (grabber, scrim, spring, drag-to-dismiss) is provided. Give the
content a heading; keep pickers/lists inside.

## Screen skeleton

```jsx
export function MyScreen({ params }) {
  return (
    <>
      <AppHeader title="Transfer In" back />
      <div className="screen-scroll">
        <div className="screen-pad">…content…</div>
      </div>
    </>
  );
}
```

- `AppHeader` (`@app/ui/AppHeader.jsx`): `{ title, back, large, right, transparent }`.
  Tab roots use `large`; pushed screens use `back`.
- Sticky bottom CTA: put it after `.screen-scroll` in a
  `<div className="cta-bar">` — shell styles handle safe-area padding.
- `SuccessState` (`@app/ui/SuccessState.jsx`): `{ title, body, children }` —
  animated check for flow completions.
- `Money` (`@app/ui/Money.jsx`): `{ value, decimals, prefix, suffix }` —
  odometer-animated tabular numerals. Use for ALL money.

## Design system

Import components directly; they self-import their CSS:

```js
import { Button } from "@ds/components/Button/Button.jsx";
```

NEVER guess props — read the component source first (`src/components/<Name>/`).
Prefer DS components over custom; when you must build custom (OTP cells,
captcha slider…), use `--sx-*` tokens from `src/styles/tokens.css`.
Icons: `<span className="material-symbols-rounded">home</span>` (font loaded).

## Motion

Import presets — do not invent curves:

```js
import { listContainer, listItem, pressable, modalCard, DUR, EASE_BRAND } from "@app/motion/presets.js";
```

Rules (from reference/specs/_motion-craft-brief.md):
- lists enter with `listContainer`/`listItem` stagger (50ms)
- every tappable row/button gets `{...pressable}` (motion.button / motion.div)
- money changes via `<Money>`; no spinners — use optimistic transitions
- one hero element per transition; exits faster than enters
- `AnimatePresence mode="popLayout"` for list item swaps
- reduced motion is handled globally by MotionConfig; don't add your own

## Data & flow behavior

All dummy data comes from `@app/data/db.js` — import, never hardcode values
that exist there. Fake processing with ~600ms `setTimeout` then advance
(e.g. to a `SuccessState`). No network calls. Flows must be fully clickable:
every CTA the spec shows must do something (advance, open sheet, or toast).
For toasts use `Toast` from the DS if it fits, else a simple motion div with
the `toast` preset.

## Style

- Plain CSS file(s) in your folder, class prefix `<area>-`.
- Mobile-first: content width is the screen; horizontal padding via
  `.screen-pad` (20px).
- Use `--sx-*` tokens for every color/radius/shadow. Red Hat Display bold for
  titles/labels, Hanken Grotesk for body, Red Hat Mono for numbers/addresses.
- Sentence case everywhere. No emoji.

## Definition of done

- All screens from your spec exist, with verbatim copy from the spec.
- Every interactive element responds (navigates, opens sheet, toasts).
- `node --experimental-vm-modules -e` parse checks aren't needed — but your
  imports must resolve: double-check every path and named export you use.
- Do NOT run `npm run build` or `npm run dev` (the integrator does).
