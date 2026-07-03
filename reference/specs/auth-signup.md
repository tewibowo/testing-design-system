# Auth Spec — Sign Up & Forgot Password (Mobile PWA rebuild)

Source: desktop web screenshots in
`/home/user/testing-design-system/reference/screenshots/Sign Up/` (5 steps) and
`/home/user/testing-design-system/reference/screenshots/Forget Password/` (2 steps).
This document is the **single source of truth** for the prototype — the builder will not
see the screenshots. All copy below is VERBATIM from the screens unless marked
*(suggested)*.

Design system: components in `src/components/`, tokens in `src/styles/tokens.css`.
All tokens referenced as `--token-name` exist in that file.

---

## 0. Shared visual language (applies to every screen)

**Brand backdrop (Steps 3–5 of Sign Up, both Forgot Password screens).**
Full-viewport night-time city skyline photograph tinted with a heavy dark-teal
overlay (reads as `--brand-stable-deep-ivy` #002b2a / `--brand-secure-teal` #054948
over the photo). Decorative StraitsX logomark "swoosh" shapes are scattered on top:
some as **solid vibrant-green fills** (`--brand-vibrant-green` #00d37e) in the top-left
and bottom-right corners, others as **thin green outlines** (1px stroke, same green)
arranged diagonally. The composition is dark, moody, fintech-premium.

**Centered auth card.** On top of the backdrop sits a single white card
(`--surface` #ffffff), radius ≈ 8–12px (`--radius-md`/`--radius-lg`), soft shadow
(`--shadow-2`), generous internal padding (≈ 40px, `--space-7`). Content inside the
card is center-aligned. Card width ≈ 540px on desktop.

**Logo.** Full StraitsX lockup centered at the top of the card: green infinity-style
logomark + "StraitsX" wordmark in dark teal. Map to `Logo` component (wordmark
lockup); `Logomark` is the mark alone.

**Typography seen.** Headings: bold, dark teal (#002b2a), Red Hat Display-like →
use `--title-medium` / `--title-mobile-large`. Body: regular grey-teal → `--body-medium`
/ `--body-large`, `--text-primary` / `--text-secondary`. Field labels on the Sign Up
form are ALL-CAPS small bold ("EMAIL ADDRESS", "PASSWORD"); on the login screen they
are title-case ("Email Address") — the DS `Input` label style should be used
consistently in the rebuild (recommend the DS default, not all-caps).

**Links.** All inline links render in blue (Keycloak default blue, ≈ #1a73e8). In the
rebuild map every link to `--link` (#187d97, credible blue) via `LinkButton` or an
anchor with link styling.

**Buttons observed.**
- Primary CTA: solid vibrant green fill, dark-teal/black label, rectangular with small
  radius. → rebuild as `Button variant="primary"` (DS renders pill-shaped; adopt the
  pill — this is the intended design-system translation, not a pixel copy).
- Google button: white fill, 1px light-grey border, Google "G" logo left of bold dark
  label. → `Button variant="secondary"` with the G icon inline (16–20px SVG/img).
- Text links ("Login", "Sign up", "Click here", "Having trouble with authenticator?")
  → `LinkButton`.

**Alerts observed.**
- Warning (pale yellow #fffaea ≈ `--status-surface-warning`, amber ⚠ triangle icon).
  → `Alert tone="warning"`.
- Positive (pale green #f0f9f4 ≈ `--status-surface-positive`, green circled check).
  → `Alert tone="positive"`.
- Neutral hint panel (light grey `--surface-secondary` #f6f7f9, rounded, lightbulb 💡
  outline icon). → `Alert tone="neutral" icon="lightbulb"`.

---

# FLOW A — SIGN UP (5 steps)

## A1. Sign Up — Step 1: "Create Personal Account" (registration form, password rules open)

URL: `sso.straitsx.com/auth/realms/xfers-sg/login-actions/registration?client_id=xfers-app&tab_id=xNrLPxLRlCo`

### Purpose & layout
Registration form for a personal account. Desktop is a **split screen**:
- **Left ~58%: marketing hero panel.** Dark city-skyline photo with green logomark
  shapes (as in §0). Right-aligned text block vertically centered:
  - Heading (large, bold, vibrant green, 2 lines): **"The future of money is here"**
  - Sub-copy (white, regular): **"Buy and sell XSGD and XUSD, manage payments, view
    transactions, and connect to digital asset platforms with your account."**
- **Right ~42%: white form panel**, left-aligned content, vertically centered.

### Every UI element (top → bottom, right panel)
1. Heading: **"Create Personal Account"** — bold, dark teal (`--title-medium`).
2. Field label: **"EMAIL ADDRESS"** (all-caps, small bold).
3. Text input — filled with value `astoranian@gmail.com`. White fill, 1px grey border
   (`--border`), radius ≈ 4–8px, left-aligned value. → `Input label="Email address"
   type="email"`.
4. Field label: **"PASSWORD"** (all-caps, small bold).
5. Password input — masked value shown as ~13 dots; right-aligned inline text toggle
   **"Show"** inside the field. → `Input type="password"` (DS has the built-in reveal
   toggle).
6. **Password requirements checklist** — a white dropdown panel attached below the
   password field (border + shadow; in this capture it overlaps/hides the content
   beneath). Five rows, each: green check icon ✓ + body text:
   - **"Contain 8-16 characters"**
   - **"Contain at least 1 uppercase letter (A-Z)"**
   - **"Contain at least 1 lowercase letter (a-z)"**
   - **"Contain at least 1 number (0-9)"**
   - **"Contain at least 1 special character (#$%^&*)"**
   All five show green (satisfied) in this capture. Unsatisfied state (not captured):
   render grey/neutral icon + `--text-secondary` text; satisfied: `--status-positive`.
7. Button: **"Continue with Google"** — white, grey outline, Google G logo + bold
   label, full width. → `Button variant="secondary"`.
8. Centered helper row: **"Already have a StraitsX account? Login"** — "Login" is a
   blue link. → text + `LinkButton`.
9. Neutral hint panel (grey rounded box, lightbulb icon):
   **"Are you looking to sign-up for a StraitsX Business Account instead? Please
   contact our sales here."** — "sales here" is a blue link.
   → `Alert tone="neutral" icon="lightbulb"` with inline `LinkButton`.

Elements hidden by the open checklist in this capture but present on the page (see A2):
T&C agreement line, primary CTA **"Create Personal Account"**, **"OR"** divider.

### Dummy data
- Email value: `astoranian@gmail.com`
- Password: masked (≈13 characters), all 5 rules satisfied. *(suggested prototype
  value: `Straits#2026x` — satisfies every rule)*

### Flow logic
- Typing in the password field opens the requirements checklist; rules tick live.
- Valid email + valid password + agreeing to terms → **"Create Personal Account"**
  CTA (see A2) becomes actionable.
- Pressing the CTA opens the captcha (Step 2).
- Branches: "Continue with Google" → Google OAuth (exits this flow, skips password);
  "Login" → login screen (Flow B / B2 layout); "sales here" → business-sales contact
  (external).

### Mobile adaptation
- Drop the split screen. Use a **full-screen page**. Option A (recommended): compact
  brand header — dark-teal strip or plain white header with `Logo` — then the form.
  The hero copy ("The future of money is here" + sub-copy) can become a one-time
  onboarding/splash screen before this page, or be dropped.
- Order: PageTitle-style heading "Create Personal Account" (`--title-mobile-large`),
  email `Input`, password `Input`, requirements checklist, T&C line, primary CTA,
  "OR" divider, Google `Button variant="secondary"`, "Already have… Login" row,
  neutral hint `Alert`.
- Render the password checklist **inline** (static block under the field, not a
  floating dropdown) so it never covers the CTA; collapse it once all rules pass.
- Primary CTA: keep **in the content flow** below the T&C line (form is short), or
  pin to a bottom safe-area bar; full-width `Button variant="primary" size="lg"`.
- Keyboard: `type="email"` + `autocomplete="email"` / `inputmode="email"`; password
  field `autocomplete="new-password"`. Ensure the checklist scrolls into view above
  the keyboard.
- Components: `Input`, `Button`, `LinkButton`, `Alert`, `Icon` (check marks),
  `Logo`. Checklist can be composed from `Icon` + body text (no dedicated DS
  component; do NOT invent one — simple list markup with tokens).

### Visual notes
- Hero heading green = `--brand-vibrant-green`; hero body white.
- Form headings dark teal #002b2a; labels ~12px bold; inputs ~48px tall.
- Checklist check color = `--status-positive`-adjacent green (#00b86d-ish).
- Vertical rhythm ≈ 16–24px between blocks (`--space-4`–`--space-6`).

---

## A2. Sign Up — Step 2: Captcha "Slide to complete the puzzle"

Same URL as Step 1.

### Purpose & layout
Bot-prevention challenge (GeeTest) triggered on submit. The registration form stays
visible on the right — now with checklist closed, revealing the full form — and a
**dark captcha modal** floats over the left hero panel (desktop position; it is a
modal, position is incidental).

### Every UI element
Right panel (full form now visible, top → bottom):
1. Heading: **"Create Personal Account"**
2. **"EMAIL ADDRESS"** + input with `astoranian@gmail.com`
3. **"PASSWORD"** + masked input with **"Show"** toggle
4. Terms line (plain body text, no checkbox visible):
   **"By creating an account with StraitsX, I have read and agree to be bound by the
   Terms and Conditions and the Privacy Policy."**
   — "Terms and Conditions" and "Privacy Policy" are blue links.
5. Primary CTA: **"Create Personal Account"** — full-width, solid vibrant green,
   dark label; in this capture it has a focus ring (double border). →
   `Button variant="primary" size="lg"`.
6. Divider: **"OR"** centered between two thin horizontal rules.
7. **"Continue with Google"** secondary button.
8. **"Already have a StraitsX account? Login"** (link).
9. Neutral hint panel: **"Are you looking to sign-up for a StraitsX Business Account
   instead? Please contact our sales here."**

Captcha modal (dark charcoal card, thin blue accent line across the very top,
radius ≈ 8px):
1. Title (white, centered): **"Slide to complete the puzzle"**
2. Puzzle image (≈ 320×200): cartoon illustration — row of flat-style avatar
   characters (purple/red/teal clothing) with a large magnifying glass magnifying a
   red robot face; a jigsaw-piece notch is cut out at the top-left of the image.
3. Slider track: dark rounded bar; **blue circular thumb with white → (right arrow)**
   at the left end.
4. Footer icon row (left): ⊗ close, ↻ refresh, 💬 feedback — all grey outline icons.
5. Footer right: **"GEETEST"** logotype (grey).

### Dummy data
- Same email `astoranian@gmail.com`; masked password.
- Captcha vendor string: `GEETEST`.

### Flow logic
- Step 1 → Step 2: user presses **"Create Personal Account"**.
- User drags the slider to fit the puzzle piece → success submits registration →
  Step 3 (email verification notice). Failure reshuffles the image.
- ⊗ closes the captcha (back to form); ↻ loads a new puzzle.

### Mobile adaptation
- Present the captcha as a **BottomSheet** (`BottomSheet` with `title="Slide to
  complete the puzzle"`, `dismissable`) or centered `Modal`; BottomSheet feels more
  native. Puzzle image full-width inside the sheet; slider beneath with a ≥48px
  thumb for touch.
- For the prototype, fake it: any drag to ≥95% = success → auto-advance. Show the
  refresh/close icons as `IconButton`s.
- Keep the form beneath untouched; dim with the sheet scrim (`--overlay`).
- Components: `BottomSheet`, `IconButton`, `Button`. The slider itself is custom
  (no DS slider) — style thumb with `--brand-credible-blue` or swap to
  green-on-`--surface-secondary` to match brand.

### Visual notes
- Modal is dark (#2b2b33-ish) with white text — an intentional third-party look; a
  brand-aligned rebuild may restyle to white card + dark text.
- Blue accent ≈ #4a90e2 (GeeTest default), thumb same blue.
- Illustration style: flat cartoon, purple-heavy palette — third-party asset;
  replace with any placeholder image + jigsaw notch overlay in the prototype.

---

## A3. Sign Up — Step 3: "Email verification" (check your inbox)

URL: `sso.straitsx.com/auth/realms/xfers-sg/login-actions/required-action?execution=VERIFY_EMAIL&client_id=xfers-app&tab_id=xNrLPxLRlCo`

### Purpose & layout
Post-registration interstitial telling the user to verify email. Full-screen brand
backdrop (§0) + centered white card. All card content centered.

### Every UI element (top → bottom)
1. `Logo` — StraitsX lockup, centered.
2. Heading: **"Email verification"** — bold dark teal.
3. Warning alert (full card width, pale yellow, ⚠ amber triangle icon, left-aligned
   icon + text): **"You need to verify your email address to activate your account."**
   → `Alert tone="warning"`.
4. Body paragraph (centered): **"An email with instructions to verify your email
   address has been sent to you."**
5. Second paragraph (centered, two lines):
   **"Haven't received a verification code in your email?"**
   **"Click here to re-send the email."** — "Click here" is a blue link, rest plain.
   → `LinkButton` inline.

No buttons. No inputs.

### Dummy data
- None visible on-screen (account being verified is the one registered in A1/A2).

### Flow logic
- Arrives automatically after captcha success (A2 → A3).
- **"Click here"** re-sends the verification email (show a `Toast tone="positive"`
  "Verification email re-sent" in the prototype — *(suggested)*).
- The user leaves the app, opens the email, and taps the verification link → A4.
- This screen typically polls/refreshes; in the prototype add a *(suggested)*
  "I've verified — continue" primary `Button` to simulate the email click and jump
  to A4/A5.

### Mobile adaptation
- **Full-screen page** (not a sheet): keep the dark brand backdrop with the white
  card, or go edge-to-edge white with `Logo` top-center — recommend the latter for
  a native feel; keep backdrop only on this "waiting" screen family if you want the
  brand moment.
- Consider an illustration/`StatusIcon variant="needApproval"` (hourglass) in place
  of the heavy card.
- Primary action ("open mail app" *(suggested)*) or the simulated "Continue" pinned
  at bottom; "Click here to re-send" as a `LinkButton` beneath it.
- Components: `Logo`, `Alert tone="warning"`, `LinkButton`, `Toast` (for resend),
  optionally `StatusIcon`.

### Visual notes
- Warning surface #fffaea = `--status-surface-warning`; icon `--status-warning`.
- Card ≈ 550px wide, ≈ 40px padding; heading ≈ 24px bold; body 15–16px
  `--text-primary`.

---

## A4. Sign Up — Step 4: "Confirm validity of e-mail address" (from email link)

URL: `sso.straitsx.com/auth/realms/xfers-sg/login-actions/action-token?key=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6...` (JWT action token)

Context visible in browser chrome: user came from Gmail (tabs "Inbox — tewibowo@gmail.com",
"Verify Your Email - tewibowo…"), macOS, Thu 2 Jul 12:49.

### Purpose & layout
Landing page of the email verification link; asks the user to confirm the address.
Full-screen brand backdrop + centered white card. Content centered except the
proceed link (left-aligned).

### Every UI element (top → bottom)
1. `Logo` — StraitsX lockup, centered.
2. Heading (bold, dark, 2 lines, centered):
   **"Confirm validity of e-mail address tewibowodesign@gmail.com."**
3. Body (centered, smaller, repeats the heading):
   **"Confirm validity of e-mail address tewibowodesign@gmail.com."**
4. Link (left-aligned, blue, guillemet prefix): **"» Click here to proceed"**
   → restyle as full-width `Button variant="primary"` labeled "Confirm email"
   *(suggested)* or keep as `LinkButton`.

No inputs, no other buttons.

### Dummy data
- Email being verified: `tewibowodesign@gmail.com`
  (note: differs from A1's `astoranian@gmail.com` — the captures come from two
  recording sessions; the prototype should use ONE email throughout — recommend
  `tewibowodesign@gmail.com` for A3–A5 consistency or unify all on one address).
- Action-token key prefix visible: `eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIi...`

### Flow logic
- User taps verification link in email → this screen.
- **"» Click here to proceed"** → A5 (verified confirmation).

### Mobile adaptation
- **Full-screen page.** Center the `Logo`, heading, and email; make the email itself
  visually distinct (bold or a `Tag`/`Copybox`-style chip *(suggested)*).
- Replace the bare link with a bottom-pinned full-width primary `Button`
  ("Confirm email address" *(suggested — keep verbatim "Click here to proceed" if
  strict copy fidelity is required)*).
- No keyboard concerns.
- Components: `Logo`, `Button` (or `LinkButton`), optional `Card` if keeping the
  card-on-backdrop look.

### Visual notes
- Identical card/backdrop treatment as A3.
- The duplicated heading/body copy is a Keycloak template quirk — in the rebuild
  keep the heading, drop the duplicate body line, *(suggested)*.

---

## A5. Sign Up — Step 5: "Your email address has been verified."

Same `action-token` URL family as A4. Time in browser chrome: 12:50.

### Purpose & layout
Terminal success screen of the sign-up flow. Full-screen brand backdrop + centered
white card (slightly shorter card than A4).

### Every UI element (top → bottom)
1. `Logo` — StraitsX lockup, centered.
2. Heading (bold, centered): **"Your email address has been verified."**
3. Body (centered, repeats): **"Your email address has been verified."**
4. Link (left-aligned, blue, guillemet prefix): **"« Back to Application"**

### Dummy data
- None beyond the verified account context (tewibowodesign@gmail.com from A4).

### Flow logic
- A4 → A5 on clicking "» Click here to proceed".
- **"« Back to Application"** returns to the app (login/dashboard) — end of flow;
  in the prototype route to the login screen (B2 layout without the alert) or
  straight into the app shell/onboarding (`OnboardingSteps` welcome card is the
  natural next screen after first login).

### Mobile adaptation
- **Full-screen success page**: `StatusIcon variant="success"` (green circle +
  check, size 64) above the heading for a native "done" moment *(suggested)*;
  heading verbatim; drop the duplicate body line.
- Bottom-pinned full-width primary `Button` labeled "Back to Application" (verbatim)
  → routes onward. Optionally fire `Toast tone="positive"` "Email verified" on the
  next screen.
- Components: `StatusIcon`, `Logo`, `Button`, `Toast`.

### Visual notes
- Same card/backdrop as A3/A4. Success is communicated only by copy in the
  original — the rebuild should add the green `StatusIcon` for scannability.

---

# FLOW B — FORGOT PASSWORD (2 steps, as captured)

> **Interpretation note (important for the builder):** the two captures are
> non-contiguous states of Keycloak's reset-credentials flow. Step 1 shows a 2FA
> code challenge; Step 2 shows the login screen in its "reset email sent"
> confirmation state. The entry point (tapping "Forgot password" on the login form
> and typing the email) was not captured. Recommended prototype sequence:
> Login → "Forgot password?" → enter email → **B2 (email-sent confirmation)** →
> (user taps email link) → **B1 (2FA verification)** → new-password form
> *(uncaptured — compose from A1's password field + checklist)* → success.

## B1. Forgot Password — Step 1: "Enter Verification Code" (2FA)

URL: `sso.straitsx.com/auth/realms/xfers-sg/login-actions/authenticate?execution=3e64c250-7e85-4785-a829-184de69f30c7&client_id=xfers-app&tab_id=iZS…`

### Purpose & layout
Identity check via authenticator app before the password can be reset (also the
standard login 2FA screen). Full-screen brand backdrop + centered white card;
everything centered.

### Every UI element (top → bottom)
1. `Logo` — StraitsX lockup, centered.
2. Heading (bold): **"Enter Verification Code"**
3. Sub-copy (2 lines, regular with bold segment):
   **"Enter the 6-digit code generated by your Two-factor Authentication (2FA)
   app."** — "Two-factor Authentication (2FA) app" is bold.
4. **OTP input: 6 single-digit cells** — underline style (no box borders): large
   dark digit centered above a green underline per cell (~40px wide each,
   ~16px gaps). Filled digits in this capture: **4 1 6 3 7 0**, text caret visible
   after the last digit.
5. Primary CTA (full card width): **"Submit"** — solid vibrant green, dark label,
   radius ≈ 8px. → `Button variant="primary" size="lg"`.
6. Link (centered, blue): **"Having trouble with authenticator?"** → `LinkButton`.

### Dummy data
- OTP code: `416370`

### Flow logic
- Entering the 6th digit enables/auto-focuses Submit (auto-submit on 6th digit is a
  good mobile behavior *(suggested)*).
- **"Submit"** with valid code → next step of the reset flow (in the recommended
  prototype order: the new-password form; in a login context: the dashboard).
- Wrong code → inline error state (not captured): red underlines + `Alert
  tone="critical"` or field error *(suggested, use `--status-critical`)*.
- **"Having trouble with authenticator?"** → recovery/help branch (support page or
  fallback method; in the prototype link to a stub sheet).

### Mobile adaptation
- **Full-screen page.** Logo small at top, heading + sub-copy, OTP cells, Submit
  pinned above the keyboard.
- OTP cells: 6 custom cells composed with DS tokens (no dedicated DS OTP
  component — build one input per digit or a single hidden input with 6 rendered
  cells). Cell underline `--primary` when focused/filled, `--border` when empty.
- Keyboard: `inputmode="numeric"`, `autocomplete="one-time-code"` (iOS suggests
  SMS/authenticator codes), auto-advance focus per digit, backspace moves back.
- Submit: full-width `Button variant="primary"`, disabled until 6 digits present.
- Components: `Logo`, `Button`, `LinkButton`; `Modal2FA` exists in the DS
  (`src/components/Modal2FA/`) — check it first: for an in-app 2FA prompt reuse
  `Modal2FA`; for this full-page auth flow, page layout + its inner OTP styling.

### Visual notes
- Digits ≈ 28px bold dark teal; underlines vibrant green (#00d37e).
- "Submit" button is bright green with near-black text — highest-contrast CTA in
  the whole set.
- Card padding tighter than A3–A5 (~32px).

## B2. Forgot Password — Step 2: Login screen with "reset email sent" confirmation

URL: `sso.straitsx.com/auth/realms/xfers-sg/login-actions/authenticate?execution=0e418b78-1489-4304-9ee9-190b54d5869c&client_id=xfers-app&tab_id=…`

### Purpose & layout
The login page shown immediately after requesting a password reset: a success alert
confirms the email was sent. Full-screen brand backdrop + centered white card;
content centered, form left-aligned.

### Every UI element (top → bottom)
1. `Logo` — StraitsX lockup, centered.
2. Heading (bold, 2 lines, centered): **"Login to Your Personal Account"** —
   the word **"Personal"** is vibrant green; "Login to Your" and "Account" dark teal.
3. Field label: **"Email Address"** (title-case, bold, left-aligned).
4. Text input — **empty** (no placeholder visible). → `Input label="Email Address"
   type="email"`.
5. Positive alert (full width, pale green, green circled-check icon):
   **"You should receive an email shortly with further instructions."**
   → `Alert tone="positive"`.
6. Button: **"Proceed"** — full width, **pale/washed green fill with white text** =
   disabled state of the primary button (email field is empty).
   → `Button variant="primary" size="lg" disabled`.
7. Divider: **"OR"** centered between thin rules.
8. Button: **"Continue with Google"** — white, grey outline, G logo, bold label.
   → `Button variant="secondary"`.
9. Centered row: **"New to StraitsX? Sign up"** — "Sign up" blue link.
10. Neutral hint panel (grey, lightbulb icon):
    **"If you wish to login as a Business user, please click here."** — "here" is a
    blue link. → `Alert tone="neutral" icon="lightbulb"`.

Not captured but required for the full flow *(suggested)*: the login form's password
field + "Forgot password?" link (this screen state hides them until an email is
entered / Keycloak reset flow re-collects credentials via "Proceed").

### Dummy data
- None filled; the alert copy is the only dynamic content. Reset was requested for
  the flow's account (use `tewibowodesign@gmail.com` in the prototype).

### Flow logic
- Arrives after submitting the forgot-password email form (uncaptured step).
- Typing an email enables **"Proceed"** → continues login (password entry → B1-style
  2FA if enabled).
- Meanwhile the reset email arrives; its link leads to the reset continuation
  (B1 2FA → new password form).
- Branches: "Continue with Google" → OAuth login; "Sign up" → Flow A Step 1;
  "here" (business) → business login.

### Mobile adaptation
- **Full-screen page** = the app's main Login screen with a conditional
  `Alert tone="positive"` slot above the CTA (or surface the confirmation as a
  `Toast tone="positive"` on return to Login — Alert matches the capture, Toast
  feels more native; pick Alert for fidelity).
- Two-tone heading: keep "Personal" in `--primary` — style with a `<span>`.
- CTA "Proceed": full-width primary `Button`, disabled until the email validates;
  sits in-flow under the alert (not bottom-pinned, so the OR/Google block stays
  visible).
- Keyboard: `type="email"`, `autocomplete="email"`.
- Components: `Logo`, `Input`, `Alert` (positive + neutral), `Button` (primary
  disabled + secondary), `LinkButton`, divider is simple markup.

### Visual notes
- Positive alert surface = `--status-surface-positive` (#f0f9f4); icon
  `--status-positive`.
- Disabled primary: the capture shows a washed green (#7fe0b4-ish) with white
  text — in the DS use the `Button` disabled state as-is.
- The "OR" divider: 1px rules `--border`, label `--text-secondary`, 12–14px.
- Card ≈ 540px, padding ≈ 40px; identical hint-panel styling to A1.

---

# Cross-flow build notes

1. **One backdrop layout component**: brand backdrop + centered Card is shared by
   A3, A4, A5, B1, B2 — build it once (`AuthShell` *(suggested name)*). A1/A2's
   split-hero collapses into the same shell on mobile.
2. **Copy fidelity**: all bold-quoted strings above are verbatim prototype copy,
   including quirks ("sign-up", "e-mail", duplicated confirm lines, "8-16").
3. **Email identity**: unify on `tewibowodesign@gmail.com` (used in A4/A5) or
   `astoranian@gmail.com` (A1) — do not mix as the captures do.
4. **Component inventory used**: Logo, Logomark, Input, Button, LinkButton, Alert,
   Toast, BottomSheet, Modal/Modal2FA, Card, StatusIcon, IconButton, Icon,
   Tag/Copybox (optional), OnboardingSteps (post-signup landing), EmptyState (n/a),
   PageTitle (optional headings). OTP cells and the slider-captcha are the only
   custom builds.
5. **Route map** *(suggested)*: `/signup` (A1) → captcha sheet (A2) → `/verify-email`
   (A3) → `/verify-email/confirm` (A4) → `/verify-email/done` (A5) → `/login`.
   `/login` → "Forgot password?" → `/forgot` (email form, uncaptured) → `/login?reset=sent`
   (B2) → `/reset/2fa` (B1) → `/reset/new-password` (compose from A1 password
   block) → `/login`.
