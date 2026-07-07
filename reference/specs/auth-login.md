# Auth / Login — Build Spec (Mobile PWA)

Source: `reference/screenshots/Login Email/` (4 PNGs) + `reference/screenshots/Login Google/` (4 PNGs), captured from the production StraitsX web dashboard (Keycloak SSO at `sso.straitsx.com`, realm `xfers-sg`, client `xfers-app`).
This document is the **single source of truth** — the builder will not see the screenshots.

Design system: components in `src/components/`, tokens in `src/styles/tokens.css`.

---

## 0. Flow map (read this first)

The two flows share three of four screens. **Only Step 3 diverges.**

```
                        ┌──────────────────────────────┐
                        │ S1  Login (email + Google)   │   ← shared, pixel-identical in both folders
                        └──────────────┬───────────────┘
              types email, taps        │        taps "Continue with Google"
              "Proceed"                │
                        ┌──────────────▼───────────────┐
                        │ S2  GeeTest slider captcha   │   ← shared, pixel-identical in both folders
                        │     (overlay on S1)          │     (see note below)
                        └──────┬───────────────┬───────┘
                 email path    │               │   Google path
              ┌────────────────▼─┐           ┌─▼──────────────────────┐
              │ S3a Password     │           │ S3b Google "Choose an  │
              │ "Welcome Back!"  │           │ account" (OAuth page)  │
              └────────────────┬─┘           └─┬──────────────────────┘
                 taps "Login"  │               │  taps an account row
                        ┌──────▼───────────────▼───────┐
                        │ S4  Enter Verification Code  │   ← shared, pixel-identical in both folders
                        │     (2FA, 6-digit)           │
                        └──────────────┬───────────────┘
                          taps "Submit"│
                        ┌──────────────▼───────────────┐
                        │ Dashboard home — NOT CAPTURED│
                        └──────────────────────────────┘
```

**Captcha note:** the "Login Google - Step 2.png" file is byte-identical to the email flow's captcha screenshot (email already typed into the field). The capture likely reused the shared screenshot. For the prototype, the sensible interpretation: the GeeTest captcha fires when the user taps **Proceed** (email path). For the Google path you may either (a) skip captcha and go straight from S1 → S3b (recommended — matches real Google OAuth behaviour), or (b) show the same captcha sheet before redirecting. Build it as a reusable overlay either way.

**CRITICAL GAP — post-login landing:** Neither folder contains a screenshot after the 2FA Submit. **The dashboard home (balances, cards, nav) is NOT visible in this capture set.** Do not invent it from this spec. Terminate the prototype flow at a placeholder "logged in" route (e.g. an `EmptyState` saying "Dashboard — spec pending") until a dashboard capture set/spec is supplied.

**Real URLs seen (for realism in the prototype's fake address bar / routing, optional):**
- S1/S2: `sso.straitsx.com/auth/realms/xfers-sg/protocol/openid-connect/auth?client_id=xfers-app&state=cb54cc46-2b1b-4ded-89f5-dd64851e9d5f&redirect...`
- S3a: `sso.straitsx.com/auth/realms/xfers-sg/login-actions/authenticate?execution=d81d8c16-0f25-461c-9711-759d0661f2cb&client_id=xfers-app&tab_id=x...`
- S3b: `accounts.google.com/v3/signin/accountchooser?access_type=offline&client_id=632382084150-q5ufn93ct18sb6tk3gshfsq350hci9sh.apps.googleusercon...`
- S4: `sso.straitsx.com/auth/realms/xfers-sg/login-actions/authenticate?execution=3e64c250-7e85-4785-a829-184de69f30c7&client_id=xfers-app&tab_id=iZS...`

Suggested PWA routes: `/login` → `/login/captcha` (sheet, not a route) → `/login/password` | `/login/google` → `/login/2fa` → `/home` (placeholder).

---

## 1. Screen S1 — Login (email entry + social)

*Files: `Login Email - Step 1.png` and `Login Google - Step 1.png` (identical).*

### Purpose & layout
Entry point for all logins to a **Personal** account. Desktop: a single white card (~550px wide, ~40px inner padding) centered horizontally, near top of viewport, floating over a full-bleed dark-teal night city-skyline photo overlaid with brand green diagonal "slash" logomark shapes. No app nav, no top bar — pure auth canvas. Everything is inside the one card, vertically stacked and center-aligned.

### Elements (top → bottom, copy VERBATIM)
1. **StraitsX logo** — full lockup (green infinity-slash mark + "StraitsX" wordmark in dark teal), centered, ~200px wide. → `Logo` component, `tone="default"`.
2. **Heading (2 lines, centered):** `Login to Your` / `Personal Account` — Red Hat Display Bold, ~28px, dark ivy; the single word **"Personal" is in brand green**, the rest dark. (Title-large style.)
3. **Field label:** `Email Address` — small bold label, left-aligned above input.
4. **Email input** — full card width, empty in capture, **no placeholder text visible**, white bg, 1px grey border, radius ~8px, height ~52px. → `Input` with `label="Email Address"`, `type="email"`.
5. **Primary button:** `Proceed` — full-width, height ~52px, radius ~8px. In this capture it is in the **disabled/inactive state: pale mint green** (email empty) with slightly muted white text. Enabled state (seen under S2) is solid vibrant green. → `Button variant="primary" size="lg" disabled={!emailValid}` (DS renders pill radius — accepted adaptation).
6. **Divider row:** thin grey horizontal rules left + right of centered text `OR` (uppercase, grey, ~14px).
7. **Social button:** `Continue with Google` — full-width white button, 1px grey border, radius ~8px, height ~56px; **multicolor Google "G" logo** icon (~24px) left of the label; label dark, semibold. → `Button variant="secondary" size="lg"` with an inline Google-G SVG as leading icon (no DS Google button exists; embed the standard 4-color G).
8. **Sign-up line (centered):** `New to StraitsX? Sign up` — "New to StraitsX?" in dark text, **`Sign up` is a teal/blue link**. → text + `LinkButton`.
9. **Business-user hint strip** — full-card-width light grey rounded bar (~radius 8px, bg ≈ `--surface-secondary`), with a small **lightbulb line-icon** at left and one line of text: `If you wish to login as a Business user, please click here.` — the word **`here` is a teal/blue link**, sentence ends with a period. → `Alert tone="neutral" icon="lightbulb"` with an inline `LinkButton`, or a `Card` strip; Alert preferred.

### Dummy data
- None yet (input empty).

### Flow logic
- Typing a valid email enables **Proceed**.
- Tap **Proceed** → S2 captcha overlay (then S3a).
- Tap **Continue with Google** → S3b (optionally via S2, see captcha note).
- `Sign up` and `here` (business login) are out of scope — dead links or toast "Not in prototype".

### Mobile adaptation
- **Full-screen page** (not a sheet). Card chrome dissolves: content becomes the page on `--surface`, padding `--space-6` (24px) sides, logo ~140px centered with `--space-7` top spacing. Keep the brand background as a thin decorative header band or drop entirely; do not put a photo behind form fields on mobile.
- Order preserved: logo → heading → email → Proceed → OR → Google → sign-up → business strip. Business strip sits at the natural end of content (not fixed).
- Primary CTA stays **in-flow directly under the input** (mirrors web), not a fixed footer, so the OR/Google block stays visible.
- Input: `type="email"`, `inputmode="email"`, `autocomplete="email"`, `autocapitalize="none"`, `autocorrect="off"`, `enterkeyhint="next"`; Enter triggers Proceed.

### Component map
| Element | DS component |
|---|---|
| Logo | `Logo` |
| Heading | `h1` + `.title-large` (accent span colored `--primary`) |
| Email field | `Input` |
| Proceed | `Button` primary lg (disabled until valid) |
| OR divider | plain styled `div` (no DS divider component) |
| Google button | `Button` secondary lg + inline G SVG |
| Sign up / here | `LinkButton` |
| Business strip | `Alert` tone neutral |

---

## 2. Screen S2 — Slider captcha (GeeTest)

*Files: `Login Email - Step 2.png` and `Login Google - Step 2.png` (identical).*

### Purpose & layout
Bot check after tapping Proceed. A **dark modal panel (~340px wide) centered over the S1 card**; page behind is dimmed by a scrim. The S1 card is still visible behind: the email input now shows the typed email (truncated by the panel to `tewi@faz…`, i.e. `tewi@fazzfinancial.com`) in a greyed/disabled state, and the Proceed button behind is now in its **enabled solid-green state** with a focus outline.

### Elements (copy VERBATIM)
1. **Panel** — dark charcoal (~#2b2b2b), radius ~4px, with a **blue accent bar across the very top edge**.
2. **Title (centered, white):** `Slide to complete the puzzle`
3. **Puzzle image** — photo of an **iceberg in the sea** (~300×200px): a light 3-D **star-shaped puzzle piece** sits at the left edge; a dark **star-shaped cut-out target** sits mid-right. User drags to align.
4. **Slider track** — full panel width, dark rounded track with a **blue circular thumb (~56px) containing a white right-arrow →** at the left end.
5. **Panel footer icons (left, grey line-icons):** close **(×)**, **refresh** (circular arrows), **feedback** (speech-bubble). **Right:** `GEETEST` wordmark with circular-G logo.

### Dummy data
- Email visible behind panel: `tewi@fazzfinancial.com` (truncated to `tewi@faz` at the panel edge).

### Flow logic
- Drag thumb so the star lands in the cut-out → success → auto-advance to S3a (email path).
- **×** closes the captcha back to S1; refresh swaps the puzzle image.
- Prototype: fake it — any drag to ≥90% of track = success after ~400ms; show brief success state, then navigate. No real GeeTest.

### Mobile adaptation
- **`BottomSheet`** (`dismissable`, drag-handle) instead of a floating panel — thumb-friendly drag zone at bottom of screen. Title as sheet title, image full sheet-width, slider beneath, footer icons row below (× can be omitted since sheet has its own close).
- Alternatively keep as centered `Modal`; BottomSheet preferred for reachability.
- Keep the third-party dark styling (it reads as an external widget) OR re-skin with tokens: sheet on `--surface`, track `--surface-secondary`, thumb `--primary`. Either is acceptable; keep the verbatim title.

### Component map
| Element | DS component |
|---|---|
| Container | `BottomSheet` (mobile) / `Modal` (fallback) |
| Slider | custom (no DS slider) — style with tokens |
| Refresh/close icons | `IconButton` |
| GEETEST mark | static text/`img` |

---

## 3. Screen S3a — Password ("Welcome Back!") — EMAIL PATH ONLY

*File: `Login Email - Step 3.png`.*

### Purpose & layout
Second factor of the email flow: password for the recognized email. Same centered white card on the same brand background, but a **shorter card** (no OR/Google/business strip).

### Elements (top → bottom, copy VERBATIM)
1. **StraitsX logo** — as S1.
2. **Heading (centered):** `Welcome Back!` — Red Hat Display Bold ~28px, dark ivy.
3. **Sub-line (centered, regular ~16px, dark):** `tewi@fazzfinancial.com` — the identified account email, plain text (not a link, not editable).
4. **Field label:** `Password`
5. **Password input** — full-width, filled with ~12 masked dots (`••••••••••••`); background is the **pale-blue Chrome autofill tint** in the capture (do not replicate; use normal `--surface` white); **`Show`** text button right-aligned inside the field (toggles visibility; grey text ~14px, separated by the field edge). → `Input type="password" label="Password"` — the DS Input already ships a visibility toggle for `type="password"`.
6. **Link (left-aligned, directly under input):** `Forgot Password?` — teal/blue link. → `LinkButton`.
7. **Primary button:** `Login` — full-width, **solid vibrant green**, dark/black label text in capture, height ~52px. → `Button variant="primary" size="lg"`.
8. **Sign-up line (centered):** `New to StraitsX? Sign up` — as S1.

### Dummy data
- Email: `tewi@fazzfinancial.com`
- Password: masked, 12 dots (use any dummy, e.g. `Passw0rd!234`).

### Flow logic
- Arrive here after captcha success (email path).
- Tap **Login** → S4 (2FA). `Forgot Password?` and `Sign up` are dead links in the prototype.
- No visible "back/change email" affordance in the capture — mobile should add a back arrow in a slim top bar for usability (see below).

### Mobile adaptation
- **Full-screen page.** Add a minimal top-left back chevron (`IconButton` "arrow_back") returning to `/login` — needed on mobile even though web lacks it.
- CTA in-flow under the Forgot link (short form; no need for fixed footer).
- Input: `autocomplete="current-password"`, `enterkeyhint="go"`; Enter submits. Support password-manager autofill (proper `<form>`, email rendered as hidden `username` field so managers pair credentials).
- `Show` toggle comes free with `Input type="password"`.

### Component map
| Element | DS component |
|---|---|
| Logo / heading / email line | `Logo`, `.title-large`, `.body-large` |
| Password field | `Input` type password (built-in Show) |
| Forgot Password? / Sign up | `LinkButton` |
| Login | `Button` primary lg |

---

## 4. Screen S3b — Google "Choose an account" — GOOGLE PATH ONLY

*File: `Login Google - Step 3.png`.*

### Purpose & layout
Native Google OAuth account chooser at `accounts.google.com`, **dark theme**. Full-page Google UI (NOT StraitsX styling): near-black page (~#202124), a wide dark card (~#131314, radius ~28px on real Google) centered, split into **left identity column** and **right account-list column**. Top of card: slim header bar. Page footer outside the card: language + legal links.

### Elements (copy VERBATIM)
1. **Card header bar:** multicolor **Google "G" logo** + text `Sign in with Google` (white, ~14px), thin divider under it.
2. **Left column:** tiny **StraitsX logo** (green mark + wordmark, ~50px wide) above; large light-grey heading `Choose an account` (~40px regular); sub-line `to continue to StraitsX` — **`StraitsX` is a blue link** (#8ab4f8-style Google blue).
3. **Right column — account list**, 4 accounts + 1 action, each row = avatar circle (~32px) + name (white, semibold) + email (grey, smaller), thin divider between rows:
   | Avatar | Name | Email |
   |---|---|---|
   | teal circle, letter `t` | `tewi bowo` | `tewi@fazzfinancial.com` |
   | indigo/purple circle, letter `a` | `astoranian astor` | `astoranian@gmail.com` |
   | grayscale photo avatar | `tewi bowo` | `tewibowo@gmail.com` |
   | orange-red circle, letter `t` | `tewi bowo` | `tewi1990@gmail.com` |
4. **Action row:** person-outline icon + `Use another account` (white, semibold).
5. **Disclosure text (below list, grey):** `Before using this app, you can review StraitsX's Privacy Policy and Terms of Service.` — **`Privacy Policy`** and **`Terms of Service`** are blue links.
6. **Page footer (outside card):** left — language dropdown `English (United States)` with caret; right — links `Help`, `Privacy`, `Terms` (small grey).

### Dummy data
- Accounts exactly as the table above (4 accounts; the StraitsX-linked one is `tewi@fazzfinancial.com`).
- Google OAuth client id (URL): `632382084150-q5ufn93ct18sb6tk3gshfsq350hci9sh.apps.googleusercontent.com`.

### Flow logic
- Reached by tapping **Continue with Google** on S1.
- Tapping the `tewi bowo · tewi@fazzfinancial.com` row → redirect back to StraitsX SSO → S4 (2FA). Other rows/`Use another account`: in the prototype, tapping any row proceeds the same way (or toast "Use tewi@fazzfinancial.com for the demo").
- This is the **only screen where the flows diverge**; email path shows S3a instead.

### Mobile adaptation
- **Full-screen page** mimicking the real mobile Google chooser: single column — header bar, small StraitsX logo, `Choose an account`, `to continue to StraitsX`, then the account list full-width, disclosure text, footer. No bottom sheet — OAuth opens as its own page/tab.
- Keep **dark Google styling** deliberately distinct from the StraitsX DS (it sells the "external OAuth" moment). Do NOT re-skin with brand tokens. Use system font/Roboto-ish stack, Google blue links.
- Rows: min 56px tap height, full-bleed dividers. Custom list markup (no DS Avatar component exists — plain colored circles with initial letters; DS `Menu`/`ListBank` patterns are not a fit).
- StraitsX logo here → `Logo` at small size (~90px) is acceptable inside the otherwise custom page.

### Component map
Custom page. Only `Logo` (small) reused. Everything else bespoke, scoped CSS (e.g. `.google-oauth`).

---

## 5. Screen S4 — Enter Verification Code (2FA)

*Files: `Login Email - Step 4.png` and `Login Google - Step 4.png` (identical). Both flows converge here.*

### Purpose & layout
TOTP second factor after password or Google OAuth. Same centered white card on the brand background; compact card: logo, heading, instruction, 6 digit slots, button, link.

### Elements (top → bottom, copy VERBATIM)
1. **StraitsX logo** — as S1.
2. **Heading (centered):** `Enter Verification Code`
3. **Instruction (centered, 2 lines, ~16px):** `Enter the 6-digit code generated by your Two-factor Authentication (2FA) app.` — the phrase **`Two-factor Authentication (2FA) app`** is bold; sentence ends with a period.
4. **Code input — 6 segmented digit slots**, centered row: each slot is a large digit (~28px, bold, dark) over an **individual underline**; underlines render green/dark for filled slots; a text caret sits in the last slot. Captured digits: `4 1 6 3 7 0`.
5. **Primary button:** `Submit` — full-width solid vibrant green, dark label, ~52px. → `Button variant="primary" size="lg"`.
6. **Link (centered, below button):** `Having trouble with authenticator?` — teal/blue link. → `LinkButton`.

### Dummy data
- 2FA code: `416370`.

### Flow logic
- Email path: after **Login** on S3a. Google path: after picking an account on S3b. Identical screen either way.
- Tap **Submit** (enable only when 6 digits present) → **post-login landing (NOT captured — route to placeholder, see §0)**.
- `Having trouble with authenticator?` — dead link / toast.

### Mobile adaptation
- **Full-screen page** (not `Modal2FA`-as-modal — on mobile this is a step in the auth journey, not an overlay). **Reuse `Modal2FA`'s segmented code-input pattern/CSS** (its defaults already match: instruction string is verbatim identical, `troubleText` default is verbatim `Having trouble with authenticator?`, `length={6}`); render it inline in a page shell rather than the Modal chrome, with heading `Enter Verification Code` and submit label `Submit` (override `Modal2FA`'s default title/verify label if composing it directly).
- Inputs: `inputmode="numeric"`, `pattern="[0-9]*"`, `autocomplete="one-time-code"` (iOS/Android OTP autofill), auto-advance on digit entry, backspace moves back, paste of 6 digits fills all slots. Optional: auto-submit on 6th digit.
- CTA in-flow below the slots; keep the whole form visible above the numeric keyboard (content is short).
- Add top-left back chevron → previous step.

### Component map
| Element | DS component |
|---|---|
| Code slots | `Modal2FA` code-input pattern (inline) |
| Submit | `Button` primary lg |
| Trouble link | `LinkButton` |
| Logo/heading | `Logo`, `.title-large` |

---

## 6. Dummy data — master list (exact values)

| Item | Value |
|---|---|
| Login email (typed, shown on S2 behind captcha + S3a) | `tewi@fazzfinancial.com` |
| Password | masked ••••••••••••  (≈12 chars; any dummy) |
| 2FA code | `416370` |
| Google account 1 (the one that continues) | `tewi bowo` — `tewi@fazzfinancial.com` (teal "t" avatar) |
| Google account 2 | `astoranian astor` — `astoranian@gmail.com` (indigo "a" avatar) |
| Google account 3 | `tewi bowo` — `tewibowo@gmail.com` (photo avatar) |
| Google account 4 | `tewi bowo` — `tewi1990@gmail.com` (orange-red "t" avatar) |
| OAuth `state` param | `cb54cc46-2b1b-4ded-89f5-dd64851e9d5f` |
| Keycloak `execution` (S3a / S4) | `d81d8c16-0f25-461c-9711-759d0661f2cb` / `3e64c250-7e85-4785-a829-184de69f30c7` |
| Google `client_id` | `632382084150-q5ufn93ct18sb6tk3gshfsq350hci9sh.apps.googleusercontent.com` |

Verbatim copy strings (S1–S4): `Login to Your Personal Account` · `Email Address` · `Proceed` · `OR` · `Continue with Google` · `New to StraitsX? Sign up` · `If you wish to login as a Business user, please click here.` · `Slide to complete the puzzle` · `Welcome Back!` · `Password` · `Show` · `Forgot Password?` · `Login` · `Sign in with Google` · `Choose an account` · `to continue to StraitsX` · `Use another account` · `Before using this app, you can review StraitsX's Privacy Policy and Terms of Service.` · `English (United States)` · `Help` · `Privacy` · `Terms` · `Enter Verification Code` · `Enter the 6-digit code generated by your Two-factor Authentication (2FA) app.` · `Submit` · `Having trouble with authenticator?`

---

## 7. Visual notes & tokens

**Auth background (S1, S2, S3a, S4):** full-bleed photo of a night city skyline tinted deep teal (reads ≈ `--brand-secure-teal`/`--brand-stable-deep-ivy` duotone), overlaid with the StraitsX "slash" motif: solid vibrant-green (`#00d37e`) parallelogram slashes plus thin green **outline** slashes, clustered top-left and bottom-right, angled ~65°. Mobile: simplify to a plain `--surface` page, optionally a decorative slash cluster (pure CSS shapes, `--primary` fill / 1.5px `--primary` outline) pinned to a top corner behind content.

**Card:** white `--surface`, radius ≈ `--radius-lg` (12px), soft shadow ≈ `--shadow-2`/`--shadow-3`, inner padding ≈ `--space-7` (40px) desktop → `--space-6` (24px) mobile page padding. Vertical rhythm between blocks ≈ 24–32px.

**Color mapping:**
- Headings/dark text → `--text-primary` (#002b2a). Green accent word "Personal" → `--primary` (#00d37e).
- Links (`Sign up`, `here`, `Forgot Password?`, `Having trouble…`) → `--link` (#187d97). Web capture shows a blue-teal; use the token.
- Primary buttons enabled → `--primary` bg; captured label reads dark (near-black) on green — follow DS Button's own label token. Disabled Proceed → DS disabled state (`--surface-disabled` + `--disabled-on-surface`) rather than the web's pale-mint.
- Input borders `--border` (#d8d8d8); placeholder `--input-placeholder`.
- Business strip bg `--surface-secondary`; body text `--text-primary`, 14px.
- OTP underlines: filled → `--primary` or `--text-primary`; empty → `--border`. Digits `--title-medium`-ish, tabular.
- Captcha panel (if kept dark): #2b2b2b panel, #6b8cfa blue thumb/top bar, white title, grey icons, `GEETEST` grey wordmark.
- Google page: page #202124, card #131314, white 87% text, grey 60% secondary, links #8ab4f8, avatar fills: teal #00796b-ish, indigo #5c6bc0-ish, orange-red #e8710a-ish.

**Type:** headings Red Hat Display Bold (`--title-large` desktop / `--title-mobile-large` 24px on mobile); body/inputs Hanken Grotesk (`--body-large`/`--body-medium`); field labels `--label-medium`. Google page keeps Roboto/system, light weights for "Choose an account".

**Buttons:** web capture shows ~8px-radius rectangles; the DS Button is **pill (`--radius-full`)** — build with DS pills (accepted restyle), full-width `size="lg"`, ~52px tall.

---

## 8. Build checklist (per screen)

1. `/login` — page: `Logo`, title, `Input` email, `Button` Proceed (disabled→enabled), OR divider, `Button` secondary + G icon, `LinkButton` Sign up, `Alert` business strip.
2. Captcha — `BottomSheet` with mocked slider puzzle (drag ≥90% = pass), title `Slide to complete the puzzle`, refresh/close `IconButton`s, GEETEST mark.
3. `/login/password` — back chevron, `Logo`, `Welcome Back!`, email line, `Input` password (Show built in), `LinkButton` Forgot Password?, `Button` Login, sign-up line.
4. `/login/google` — custom dark Google chooser page (header bar, small `Logo`, heading, 4 account rows + Use another account, disclosure, footer). Any row → `/login/2fa`.
5. `/login/2fa` — back chevron, `Logo`, `Enter Verification Code`, instruction (bold phrase), 6-slot code input (`Modal2FA` pattern inline, `autocomplete="one-time-code"`), `Button` Submit, `LinkButton` trouble link.
6. `/home` — placeholder `EmptyState` ("Dashboard — not captured in reference screenshots") until a dashboard spec exists.
