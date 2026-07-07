# StraitsX v2 — Mobbin pattern brief

Research brief for the v2 mobile prototype. v1 (`/app`) mirrors the web dashboard;
v2 keeps the identical brand (tokens in `src/styles/tokens.css`, rules in `README.md`)
but adopts a different layout/component/composition language drawn from best-in-class
iOS fintech patterns researched on Mobbin (2026-07-06, iOS, standard mode).
Every referenced screen is cited as a link to its Mobbin page. Non-negotiables carried
over from brand: sentence case, no emoji, Material Symbols Rounded, pill buttons,
Red Hat Display / Hanken Grotesk / Red Hat Mono, flat backgrounds (no gradients,
no glass blur), motion = brand ease only, no bounce.

---

## §1 Overall v2 concept

**Go dark. "Ivy" theme.** The brand book already sanctions it: marketing surfaces are
Secure Teal `#054948` or Stable Deep Ivy `#002B2A` with the logomark as a 10% alpha
pattern (README "Backgrounds", guidelines p.14). v1 took the *product* palette
(white on `#F6F7F9`); v2 takes the *marketing* palette and productises it. The
strongest home references seen — [Revolut's funded home](https://mobbin.com/screens/dad40228-042e-4bff-abf4-6c8cee4d9bcb)
and [Revolut Business's sell screen](https://mobbin.com/screens/c5bbe618-924a-4df6-bc6d-c5097c967bee) —
get their premium feel from exactly this move: a saturated dark hero, near-black
content cards, white numerals, one accent colour. StraitsX owns a better version of
that recipe than Revolut does: ivy ground, teal cards, vibrant green `#00D37E` as the
single accent. Where Revolut uses gradients, StraitsX stays flat + 10% logomark
pattern — that flatness *is* the differentiation.

**Navigation architecture:**

- **Docked tab bar, not floating pill.** Every best-in-class fintech observed docks it:
  [Revolut](https://mobbin.com/screens/dad40228-042e-4bff-abf4-6c8cee4d9bcb) (5 tabs,
  labels), [Base](https://mobbin.com/screens/176591f1-31ac-41f1-bb16-5743be8e24e8)
  (5 icons, no labels), [Stake](https://mobbin.com/screens/dba80894-1dac-487f-a742-6e332a5c0e61)
  (5 tabs, labels). A floating pill would be novelty without evidence.
- **4 slots: Home · Activity · Move · Account.** "Move" is not a tab — it is a raised
  vibrant-green disc (Revolut's "Move" quick action promoted to the bar, like Base
  puts Trade in the bar) that opens a bottom sheet listing Deposit / Withdraw / Swap /
  Mint. v1 buried these as home-screen circles; v2 makes money movement reachable
  from every tab in one tap.
- **Sheet-first for quick tasks, keypad-first for money.** Receive QR
  ([Chime](https://mobbin.com/screens/f23b14c3-7a63-449b-a3ae-e781518b3f38)), filters
  ([Acorns](https://mobbin.com/screens/91d06a2b-33c3-451a-bfe9-c8a90ac33dbe)), account
  ([Slopes](https://mobbin.com/screens/507d3de7-35a0-4e86-9bdb-7da14d11c06a)) all live
  in sheets. Every amount-entry flow (swap, send, mint) is keypad-first: a custom
  in-app keypad on screen from frame one, amount as the hero — seen in
  [Base send](https://mobbin.com/screens/7c2b104b-ae86-48d3-b5f7-1fbaff5c69e8),
  [Revolut Business](https://mobbin.com/screens/c5bbe618-924a-4df6-bc6d-c5097c967bee),
  [Acorns](https://mobbin.com/screens/9ed1b29d-116c-4fac-a97c-5ab484a0fc2b). v1 used
  form fields inside cards; v2 never shows a text-field for an amount.

**Dark "ivy" token mapping (v2 semantic overrides — all anchored to existing tokens):**

| v2 role | Value | Source |
| --- | --- | --- |
| App background | `#002B2A` (`--brand-stable-deep-ivy`) | brand primitive |
| Hero / auth backdrop pattern | logomark at 10% alpha, `#00D37E` strokes | README, guidelines p.14 |
| Card surface | `#054948` (`--brand-secure-teal`) | brand primitive |
| Raised / pressed surface | `rgba(255,255,255,0.06)` / `0.10` overlay on ivy | derived (flat overlay, no blur) |
| Hairline | `rgba(255,255,255,0.12)` | derived |
| Text primary | `#FFFFFF` (`--text-inverse`) | semantic |
| Text secondary | `rgba(255,255,255,0.64)` | derived |
| Primary action | pill, `#00D37E` bg, `#002B2A` text | unchanged from v1 |
| Positive delta / success | `#79FFCA` (`--brand-seamless-mint`) | brand secondary (dark-legible) |
| Critical on dark | `color-mix(in srgb, var(--status-critical) 60%, white)` | derived tint, recipe not new hex |
| Warning on dark | `#FC9A07` (`--status-warning`, passes on ivy) | semantic |
| Big numerals | Red Hat Mono, tabular, weight 500 | README "numbers are facts" |
| Titles / labels / keypad keys | Red Hat Display Bold / SemiBold | unchanged |
| Body | Hanken Grotesk | unchanged |

Scrim stays `--overlay` `rgba(5,21,19,0.70)`. Radii: cards `--radius-lg` 12,
sheets 20 top corners (one deliberate step past the token scale for the sheet shell,
matching iOS-native sheets), pills `--radius-full`. Shadows are nearly invisible on
ivy — hierarchy comes from the teal-vs-ivy value step and hairlines instead.

---

## §2 Per-area pattern specs

### 2.1 Home

**References.** [Revolut home, funded](https://mobbin.com/screens/dad40228-042e-4bff-abf4-6c8cee4d9bcb) ·
[Revolut home, empty state](https://mobbin.com/screens/ce5b749f-117f-46ed-b573-35e9360056c3) ·
[Revolut home, send-money variant](https://mobbin.com/screens/c6ff440a-c7e0-4cae-b524-d2e50b746c68) ·
[Base home](https://mobbin.com/screens/176591f1-31ac-41f1-bb16-5743be8e24e8)

**Observations.** Revolut: centred stack — tiny context label ("Personal · USD"),
giant balance with the cents rendered smaller than the units, an "Accounts" pill chip
directly beneath, then a row of four circular quick actions with 12px labels below the
circles. Content below the hero sits in near-black rounded cards; the latest
transaction gets its own single-row card before any product cards. Disabled actions
simply drop to ~40% opacity (empty state). Base: opposite pole — left-aligned title
row with avatar, huge left-aligned balance, four grey squircle *tiles* (icon above
label), then segmented text tabs (Coins / Collectibles / Activity) over an asset list
whose rows carry a network-badged coin icon, holdings subline, right-aligned fiat
value and a green % delta. Premium in both comes from: one huge numeral, tiny
everything else, and generous dead space above the fold.

**Build spec (v2).**
1. Backdrop: ivy `#002B2A`; top ~300px carries the 10% logomark pattern; content
   below scrolls over plain ivy.
2. Header row (56px): avatar circle 32px left (opens Account sheet), `qr_code`
   icon button and `notifications` icon button right, white at 64% until pressed.
   No wordmark logo on home (v1 had one) — the balance is the brand moment.
3. Balance hero, centred: label-small "Total balance · SGD" in white 64%
   (Red Hat Display Bold 12); below it the amount in Red Hat Mono 500, 56px,
   tabular — units white, decimals at 56% size and white 64% (Revolut treatment);
   below that a pill chip `--radius-full`, `rgba(255,255,255,0.10)` bg, label-medium
   white: "3 assets ▾" — opens asset breakdown sheet.
4. Quick-action row, centred, 4 circles 56px, `rgba(255,255,255,0.10)` bg, white
   Material icon 24, label-small white 64% beneath: Deposit `add` ·
   Withdraw `arrow_outward` · Swap `swap_vert` · Mint `toll`. (Same verbs as v1,
   completely different clothes.)
5. "Latest activity" single-row card: teal `#054948`, radius 12, one transaction row
   (see 2.5 anatomy) + "View all" text link in mint — Revolut's latest-transaction
   card verbatim.
6. Asset section: eyebrow label-small white 64% "Assets"; rows *directly on ivy*
   (no card, Base-style), 64px tall: AssetMark 40px with network mini-badge
   bottom-right; name body-bold-medium white + holdings body-small white 64%;
   right column fiat value (Red Hat Mono tabular white) + delta body-small in mint
   `#79FFCA` (or critical tint). Hairline `rgba(255,255,255,0.12)` between rows.
7. OTC banner becomes a quiet teal card with gold `#B59B58` left icon —
   demoted below assets.

### 2.2 Swap / trade

**References.** [Revolut Business sell](https://mobbin.com/screens/c5bbe618-924a-4df6-bc6d-c5097c967bee) ·
[Base trade](https://mobbin.com/screens/3e66f10b-af94-4b98-b8af-34afc588c9b4) ·
[Airwallex convert](https://mobbin.com/screens/cd5ad82f-210a-47c4-92ec-11b9ef87b98d) ·
[Stake convert](https://mobbin.com/screens/7283e298-53d6-4906-a45b-c03e74f6c913)

**Observations.** The winning anatomy is identical across all four: two stacked
amount cards (pay on top, receive below), a circular swap-direction button riding the
seam between them, the live rate displayed as a single quiet line, a full-width pill
CTA, and a keypad occupying the bottom ~40%. Revolut Business (dark) shows signed
amounts (−$0 / +S$0) with currency chips on the left of each card and balance
sublines; disabled CTA is a grey pill, no border. Airwallex puts the rate *on the
seam* between cards with a refresh timestamp and a green liveness dot. Base adds
25% / 50% / Max chips directly above the keypad. Stake proves how little chrome is
needed: amount, availability line, black pill, keypad.

**Build spec (v2).** Full screen push from the Move sheet.
1. Title row: back chevron; title-mobile-large white "Swap".
2. Rate line under title: body-small white 64%: "1 XSGD ≈ 0.7395 XUSD" with a 6px
   mint dot that pulses (opacity only) each refresh; countdown "Refreshes in 0:58"
   in Red Hat Mono 12.
3. Two teal cards radius 12, 8px apart. Each: left = asset chip (AssetMark 24 +
   ticker label-large white + `expand_more`, tap opens picker sheet); right = amount
   in Red Hat Mono 32 tabular, signed Revolut-style: pay shows "−", receive shows
   "+" in mint. Sublines body-small white 64%: "Balance 1,000.00" / "≈ 739.50 SGD".
4. Seam button: 40px circle, ivy bg, 2px ivy ring so it punches through both cards,
   `swap_vert` icon white; tap swaps pair (icon rotates 180°).
5. Chips row above keypad: 25 / 50 / Max — pills, `rgba(255,255,255,0.10)` bg,
   label-medium white (Base pattern).
6. Keypad: 4×3 borderless grid, digits Red Hat Display SemiBold 28 white, `.` and
   backspace glyph; key press = `--surface-pressed`-equivalent overlay flash +
   `pressable` scale.
7. CTA above keypad: full-width pill "Review swap" — enabled: green/ivy text;
   disabled: `rgba(255,255,255,0.10)` bg, white 40% text.
8. Review = bottom sheet (not v1's centred modal): pay/receive summary rows, rate
   row, fee row (Red Hat Mono values), "Swap now" pill; sheet returns a full-screen
   SuccessState on ivy.

### 2.3 Deposit / receive

**References.** [Base receive](https://mobbin.com/screens/f59bdad5-e979-49fa-9222-a94c161a4144) ·
[Stake add-funds bank details](https://mobbin.com/screens/92317cf5-1280-4cf1-8811-d839cea61db7) ·
[Chime QR sheet](https://mobbin.com/screens/f23b14c3-7a63-449b-a3ae-e781518b3f38) ·
[Satispay my code](https://mobbin.com/screens/dc2e9bc2-8b0c-4d0d-a798-fcd79e7710cf)

**Observations.** Base receive: segmented Scan/Receive pill at top; oversized QR on a
white card with the user's avatar embedded at centre; ENS name large with truncated
address in grey beneath; Copy and Share as two labelled icon buttons; a row of
supported-network mini icons; a floating toast pill confirms "Address copied to
clipboard". Chime presents its QR as a sheet over the dimmed root, QR modules tinted
brand dark-green, primary Share pill + secondary copy pill. Stake's bank-transfer
variant is the fiat model: field rows (Account name / BSB / Account number) each with
a trailing copy icon, an info callout, then two icon-led trust notes ("first-time
deposits may be held…", "transfers must be from accounts in your own name") — that
compliance-forward tone is exactly StraitsX's voice.

**Build spec (v2).** "Deposit" in the Move sheet opens a *method sheet*:
two rows — "Bank transfer (FAST)" `account_balance` and "Blockchain deposit"
`qr_code` — each with a body-small description, chevron.
- **Blockchain branch** (push): network segmented pills at top (Ethereum / Polygon /
  …, `rgba(255,255,255,0.10)` inactive, white text; active = mint text + mint
  hairline). QR card: white `#FFFFFF` card radius 12 centred, QR modules in ivy
  `#002B2A`, StraitsX logomark 40px embedded centre (Base/Chime treatment).
  Below: address in Red Hat Mono 14 white, middle-truncated; two 48px pill buttons
  side by side — "Copy address" (primary green) and "Share" (secondary: transparent,
  1.5px white 24% border, white text). Copy fires the toast preset: pill toast
  "Address copied", ivy text on mint bg.
- **Bank branch** (push): Stake anatomy on teal cards — rows "Payee name /
  Bank / Account number / Reference" as label-small white 64% over
  Red Hat Mono 16 white, trailing `content_copy` icon button per row; below,
  an information callout (teal card, `info` icon in `--status-warning` gold tone)
  and two trust notes with `verified_user` / `schedule` icons, body-small white 64%.

### 2.4 Withdraw / send

**References.** [Base send](https://mobbin.com/screens/7c2b104b-ae86-48d3-b5f7-1fbaff5c69e8) ·
[Chime pay](https://mobbin.com/screens/45a3637a-13e8-48bb-8489-8f0a7ba96239) ·
[Acorns one-time contribution](https://mobbin.com/screens/9ed1b29d-116c-4fac-a97c-5ab484a0fc2b) ·
[Satispay send](https://mobbin.com/screens/380db90c-2b07-4021-9ce4-ac9fdecf10af)

**Observations.** All four make the amount the entire screen: Base centres a giant
"$0" with preset chips ($10/$25/Max) directly beneath, a single asset/destination row
card, borderless keypad, and closes with a "Slide to Send" slider instead of a button.
Chime shows a blinking caret in the giant numeral and a balance chip
("Chime $5.00 ▾") under the amount; its disabled Next pill is a tint of the brand
colour. Acorns renders the typed amount *in brand green* and puts source/destination
as two dropdown chips. Satispay pins the recipient in the header ("TO name" +
avatar) so the amount screen stays clean.

**Build spec (v2).** Two-step keypad-first flow (recipient → amount), Satispay order.
1. **Recipient screen** (push): search input row (teal card, `search` icon), then
   "Saved" eyebrow + rows: 40px monogram circle (teal bg, mint initials,
   Red Hat Display Bold), name body-bold-medium white, bank/address subline
   body-small white 64% in Red Hat Mono for account tails ("DBS ····1234"),
   chevron. "Add new" row with `add` circle first.
2. **Amount screen** (push): recipient pinned in header as a chip (monogram 24 +
   name label-medium). Amount centred at ~45% height: Red Hat Mono 300, 64px,
   white, currency prefix at 50% size white 64%; 2px mint caret blinks
   (Chime treatment). Under it a balance chip pill: "XSGD 1,000.00 available ▾"
   (`rgba(255,255,255,0.10)`, body-small) — tap switches asset. Preset chips
   25 / 50 / Max above keypad. Overdraw state: amount turns critical tint and
   shakes ±4px once (120ms, brand ease — a nudge, not a bounce).
3. CTA: full-width green pill "Review". Review is a *push*, not a modal:
   summary rows (To / Amount / Fee / Arrival) — labels body-medium white 64%,
   values Red Hat Mono white right-aligned; total row separated by hairline;
   "Withdraw now" pill + body-small compliance note beneath. Success reuses
   SuccessState full-screen on ivy with mint check.

### 2.5 Transaction history

**References.** [Satispay transactions](https://mobbin.com/screens/628135d0-f810-4d1e-a42a-a284baecbd1d) ·
[Plazo historial](https://mobbin.com/screens/6a4858d0-05b7-4d22-972b-c8d3ee63bb55) ·
[foodpanda activities](https://mobbin.com/screens/28fee3ea-cf93-47a5-8eaa-5ea289a82822) ·
[Acorns date filter sheet](https://mobbin.com/screens/91d06a2b-33c3-451a-bfe9-c8a90ac33dbe)

**Observations.** Satispay leads with a search field + horizontally scrolling icon
chips (Expenses / Contacts / Bank transfers) and rows carrying signed, colour-coded
amounts (+ green, − near-black) with timestamps. Plazo groups by day with plain
section headers ("Hoy"), rows inside rounded cards, and shows the active date filter
as a *removable tinted chip* above the list. foodpanda keeps one "All" chip active in
solid dark. Acorns handles date ranges in a radio-list bottom sheet with a single
Save pill, and segments History / Pending / Scheduled.

**Build spec (v2).** Activity tab.
1. Header: title-mobile-large "Activity"; trailing `search` icon button that expands
   into an inline search row (teal card) pushing chips down.
2. Chips row (horizontal scroll): All · Deposits · Withdrawals · Swaps · Mint —
   pills; inactive `rgba(255,255,255,0.10)` white text; active solid mint `#79FFCA`
   with ivy text. An applied date range appears as an extra removable chip with `close`
   (Plazo pattern).
3. List grouped by day: sticky day header label-small white 64% ("Today",
   "3 Mar 2026"); rows 64px directly on ivy with hairlines: 40px icon circle (teal
   bg, white Material icon: `add` deposit, `arrow_outward` withdrawal, `swap_vert`
   swap, `toll` mint); title body-bold-medium white + subline body-small white 64%
   (counterparty / network); right: signed amount Red Hat Mono tabular —
   credits "+" in mint, debits "−" in plain white (Satispay signing), status subline
   for pending in `--status-warning`.
4. Filter sheet (from a `tune` chip): radio rows for date range, selected row
   hairlined in mint with trailing `check`, single "Apply" green pill (Acorns).
5. Detail: bottom sheet, not a push — amount hero in Red Hat Mono 32 centred,
   status Tag, then summary rows as in 2.4; "View on explorer" secondary pill for
   blockchain items.

### 2.6 Login / onboarding

**References.** [ANZ Plus access PIN](https://mobbin.com/screens/80900f36-51cb-43f7-9415-67d2e1a5d308) ·
[Zocdoc passcode](https://mobbin.com/screens/1b32d540-b7ad-49f5-89a1-727503a9817e) ·
[Plazo create passcode](https://mobbin.com/screens/bdb71296-7456-44c9-82c9-1d0c146a1344) ·
[Mercari passcode](https://mobbin.com/screens/9708d3cc-43d3-44b7-9f92-5eb1cf4926ba)

**Observations.** ANZ Plus is the premium bank pattern: brand mark alone in the top
third, then a light panel rises with "Enter Your Access PIN", a row of small dots, soft
circular keys, and "Forgot PIN" tucked bottom-left. Plazo fills its dots in brand lime
and mounts a fraud-warning callout above the keypad — security-first voice. Zocdoc/
Mercari show the minimal version: centred title, 4–6 dots, borderless or outlined
keys, one text escape action. Nobody shows a password field on returning entry.

**Build spec (v2).** Returning-user unlock replaces v1's email+password-first.
1. Backdrop: full ivy with 10% logomark pattern; StraitsX logomark 48px in vibrant
   green centred in the top third (ANZ composition).
2. "Enter your passcode" title-mobile-medium white; 6 dots 12px, hollow
   `rgba(255,255,255,0.24)` ring → filled `#00D37E` as digits land; wrong code:
   dots flash critical tint and the row shakes ±4px once.
3. Keypad: borderless 4×3, digits Red Hat Display SemiBold 28 white; bottom-left
   key = `fingerprint` glyph (biometric), bottom-right = backspace.
4. Footer links: "Use password instead" / "Forgot passcode" — body-small white
   64%, no underline until press.
5. First-run onboarding: 3 flat ivy panes (no illustration carousel — one logomark
   pattern pane, one value line each in headline-small white, e.g. "Payments
   infrastructure for digital assets"), page dots in white 24%/mint, green
   "Get started" pill + secondary "Log in" pill. Email/password + OTP screens reuse
   v1 componentry re-skinned dark; passcode-create step adds Plazo's warning
   callout as a teal card with `shield` icon.

### 2.7 Account / settings

**References.** [Cosmos settings](https://mobbin.com/screens/38a34ccd-2af6-450e-8fe8-1557994ad8c1) ·
[Slopes account sheet](https://mobbin.com/screens/507d3de7-35a0-4e86-9bdb-7da14d11c06a) ·
[Mindvalley account](https://mobbin.com/screens/e0d830be-1785-4eb0-a25d-9d5ea0709270) ·
[Lyft profile](https://mobbin.com/screens/85c5aaf4-a6fa-4f49-b450-41016b3d9b71)

**Observations.** The modern anatomy is: profile card first (avatar + name + edit
affordance), then *eyebrow-labelled groups* of rows inside rounded cards — leading
line icon, label, trailing value text + chevron (Cosmos: "System", "English").
Slopes shows status inline as a green "Active" tag on the premium row and presents
the whole area as a sheet. Mindvalley mixes row types in one card: toggle rows, a
copyable ID row, a read-only version row. Lyft adds two-line rows with body-small
descriptions under bold section headings.

**Build spec (v2).** Account tab.
1. Profile header card: teal, radius 12 — monogram avatar 56px (mint initials on
   ivy circle), name title-mobile-medium white, email body-small white 64%,
   verification Tag ("Verified" — mint text on `rgba(121,255,202,0.12)`); chevron
   pushes profile detail.
2. Groups with eyebrow labels (label-small white 64%, 24px top spacing):
   "Payments" — Bank accounts, Blockchain addresses (trailing count value white
   64%); "Security" — Passcode, Biometrics (toggle row: track
   `rgba(255,255,255,0.16)` → `#00D37E`), Two-factor authentication (value
   "On"); "About" — Support, Legal, App version (read-only, value in Red Hat
   Mono, Mindvalley pattern). Rows 52px inside teal cards radius 12, leading
   Material icon 24 white 64%, hairline separators inset to text.
3. Account ID row with trailing `content_copy` → toast "Account ID copied".
4. "Log out" as a standalone full-width row card, critical tint text, no icon.

### 2.8 Navigation chrome

**References.** [Revolut docked bar](https://mobbin.com/screens/dad40228-042e-4bff-abf4-6c8cee4d9bcb) ·
[Base icon-only bar](https://mobbin.com/screens/176591f1-31ac-41f1-bb16-5743be8e24e8) ·
[Stake labelled bar](https://mobbin.com/screens/dba80894-1dac-487f-a742-6e332a5c0e61) ·
[Chime sheet-over-root](https://mobbin.com/screens/f23b14c3-7a63-449b-a3ae-e781518b3f38)

**Observations.** All references dock the bar flush to the bottom edge; dark apps
render it as a slightly darker band than content with a top hairline. Base drops
labels entirely and marks the active tab with the brand colour alone. Chime and
Slopes route quick tasks through sheets that dim the root rather than pushing —
push is reserved for multi-step flows.

**Build spec (v2).**
1. Bar: docked, 64px + safe-area, bg `#022220` (ivy darkened one step — derived:
   `color-mix(in srgb, var(--brand-stable-deep-ivy) 85%, black)`), top hairline
   `rgba(255,255,255,0.08)`. No blur (brand: no frosted glass).
2. Slots: `home` · `receipt_long` · Move disc · `account_circle`. Icons 26px,
   inactive white 40%; active = vibrant green fill-1 icon + 4px mint dot 6px below
   (layoutId-animated between slots). **No labels** (Base) — v1 keeps labels, so
   this is a visible differentiator; icons carry `aria-label`.
3. Move disc: 48px circle, `#00D37E`, ivy `swap_vert` icon, raised 12px above the
   bar line; opens the Move sheet (Deposit / Withdraw / Swap / Mint rows, each
   icon circle + label + body-small description). Disc rotates 45° → `close` while
   sheet is open.
4. Sheets: radius 20 top, teal `#054948`, 36×4 grabber `rgba(255,255,255,0.24)`,
   scrim `--overlay`. Used for: Move menu, receive QR, asset pickers, filters,
   transaction detail, swap review.
5. Pushes (stack): swap, send recipient/amount/review, deposit branches, settings
   detail — `stackScreen` preset with parallax retreat, unchanged.

---

## §3 Differentiation table — v1 vs v2

| Screen | v1 (dashboard-mirror) | v2 (ivy, Mobbin-informed) |
| --- | --- | --- |
| Theme | Light `#F6F7F9` bg, white cards, shadows | Dark ivy `#002B2A` bg, teal `#054948` cards, hairlines instead of shadows |
| Home header | StraitsX logo + bell icon | Avatar + QR + bell icon buttons; no logo, balance is the hero |
| Home balance | "Estimated balance" card component, left-aligned | Centred 56px Red Hat Mono hero on pattern backdrop, small-cents, assets chip beneath |
| Home actions | 4 labelled circles below balance (home only) | 4 translucent circles + global Move disc in tab bar |
| Home assets | White card containing asset rows | Card-less rows directly on ivy, network-badged marks, mint deltas |
| Swap | Form card, typed text input, from/to selectors | Keypad-first: stacked ± amount cards, seam swap button, live-rate line, preset chips |
| Swap confirm | Centred modal with countdown | Bottom sheet review → full-screen success |
| Deposit | Step cards (method chips → instructions → summary) | Method sheet → QR card with embedded logomark / mono copy-rows for bank |
| Withdraw | Form fields + summary card | Recipient list → giant caret amount + balance chip + keypad → review push |
| History | Tabs component + search input + filter sheet, rows in card | Chips row (mint active), sticky day groups, signed mono amounts, detail as sheet |
| Login | Email + password inputs, Google button, captcha sheet | Passcode dots + biometric keypad on logomark-pattern ivy; password demoted to fallback link |
| Account | Profile card + Tabs panels | Profile header card + eyebrow-grouped icon rows, inline toggles/tags, log-out row |
| Tab bar | 3 tabs, labels, sliding pill highlight | 4 slots, icon-only, mint dot indicator, raised green Move disc |
| Quick-task surface | Mostly pushes | Sheet-first (Move, QR, pickers, filters, detail); pushes only for multi-step |

---

## §4 Motion notes

All cues below map to existing presets in `app/src/motion/presets.js` — one brand
ease `EASE_BRAND [0.2, 0.7, 0.2, 1]`, durations 120/200/240/320, exits at ~2/3,
`SETTLE` spring with `bounce: 0`. Reference apps use springy iOS physics
(Base's slide-to-send, Revolut's carousel); v2 deliberately re-times every borrowed
pattern onto the brand curve — no bounce anywhere.

1. **Keypad key press** (Base, Revolut Business): overlay flash
   `rgba(255,255,255,0.10)` + `pressable` (scale 0.97, `DUR.fast`). On each digit,
   the amount hero scales 1.0 → 1.02 → 1.0 over `DUR.fast` with `EASE_BRAND` —
   a tick, not a pop.
2. **Amount / balance count-up** (Revolut hero, swap receive field): reuse the
   existing `Money` odometer; receive amount re-ticks live per keystroke as in v1
   swap.
3. **Balance hero on tab return**: no re-count; only `tabContent` crossfade.
   Count-up runs once per session (first mount), matching v1 home.
4. **Move disc**: rotates 0 → 45° (`DUR.base`, `EASE_BRAND`) into `close` as the
   Move sheet rises with `sheet` (320ms up, exit 220ms). Sheet rows stagger with
   `listContainer`/`listItem` (50ms).
5. **Swap seam button**: 180° rotation `DUR.slow`; the two asset chips travel
   between cards via shared `layoutId` (keep v1's flip hero — it already matches
   the reference behaviour).
6. **Rate refresh** (Airwallex green dot): dot opacity 1 → 0.3 → 1 over `DUR.modal`;
   countdown digits swap via 4px fade-rise, `DUR.base`. No pulsing scale.
7. **Slide-to-send** (Base): replace the springy slider with press-and-hold on the
   review pill — a mint fill wipes left-to-right 600ms linear; release before full
   reverts with `SETTLE` (bounce 0). Preserves the deliberate-commit feel without
   gesture physics.
8. **Copy toast** (Base "Address copied"): existing `toast` preset, slide down from
   top; auto-dismiss 2s.
9. **Error shake** (amount overdraw, wrong passcode): single ±4px x-shake, 120ms
   total, `EASE_BRAND` — one correction, not an oscillation.
10. **Passcode dots**: each dot fills with a 1.0 → 1.15 → 1.0 scale tick `DUR.fast`;
    success = dots sequentially tint mint (50ms stagger) before `stackScreen` push.
11. **Tab dot indicator**: `layoutId` travel between slots, `DUR.slow` +
    `EASE_BRAND` (replaces v1's label pill slide).
12. **List entrances everywhere** (history day groups, asset rows, settings groups):
    `listContainer`/`listItem` 50ms stagger, fade + 12px rise — unchanged from v1;
    it already matches the reference feel.
13. **Sheets vs pushes**: sheets use `sheet` + `scrim`; multi-step flows keep
    `stackScreen` parallax. Transaction detail sheet drag-release settles with
    `SETTLE`.
14. **Pull-to-refresh** (home): logomark stroke SVG draws (pathLength 0 → 1,
    `DUR.modal`) then rotates while refreshing — replaces a generic spinner, uses
    the existing vibrant-green spinner convention.
