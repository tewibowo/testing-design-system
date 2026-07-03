# StraitsX Mobile PWA — Build Spec: Transaction History & OTC Request

Source: 8 screenshots of the StraitsX web dashboard (`app.straitsx.com`), Personal Account for user **TEWIBOWO**.
- `reference/screenshots/Transaction History/` — Steps 1–4
- `reference/screenshots/OTC/` — Steps 1–4

This document is the single source of truth for the prototype. The builder will not see the screenshots. All copy in quotes is VERBATIM from the screens. Anything not visible in a screenshot is explicitly marked **[inferred]** or **[cut off]**.

Design system: components in `/home/user/testing-design-system/src/components`, tokens in `/home/user/testing-design-system/src/styles/tokens.css`.

---

## 0. Global chrome (shared by all screens)

### Web (as captured)
- **Left sidebar**: StraitsX logo (green infinity mark) + wordmark "StraitsX", caption "Personal Account". Nav items top-to-bottom, each with a leading line icon:
  - "Home"
  - "Mint"
  - "Transaction History"
  - "Support"
  - Active item gets a light-green rounded highlight (mint surface) with green text (e.g. "Transaction History" active on all TH screens; "Home" active on OTC Step 1).
- **Top-right bar**: bell (notifications) icon button, avatar icon, username "TEWIBOWO" (all-caps, dark text).
- **Chat FAB**: dark-teal circular floating button with a chat bubble icon, bottom-right of every screen.
- **Legal footer** (every page, small grey text):
  - "XSGD, XUSD and XIDR are issued by StraitsX."
  - "“STRAITSX”, “XSGD” and “XIDR” and all other URLs, logos and trademarks related to the StraitsX Services are either trademarks or registered trademarks of StraitsX or its licensors."
  - "StraitsX is the trading name of the StraitsX Group of Companies and its affiliated entities."
  - "Important Risk Warnings Regarding Digital Payment Tokens: Learn More" — "Learn More" is a link (Credible Blue `--link`).

### Mobile adaptation (global)
- Replace sidebar with **AppTopNav** (or **TopBar** + **TopNavigation**) plus a bottom tab bar or hamburger **Menu**: Home / Mint / Transaction History / Support. Show **Logomark** (not full Logo) in the top bar; bell as **IconButton**; avatar + "TEWIBOWO" collapses into **TopNavProfileMenu**.
- Legal footer text stays at the bottom of scrollable pages (small `--text-secondary` type).
- Chat FAB may be dropped or kept as a small FAB above the bottom nav.

---

## 1. Transaction History — Step 1: Funding tab (list)

URL: `app.straitsx.com/transactions`

### 1.1 Purpose & layout
Default landing tab of Transaction History. Lists funding transactions (transfers in/out, admin transfers) in a table. Layout top-to-bottom:
1. Breadcrumb: "Home" (link) " / " "Transaction History" (current).
2. H1: "Transaction History".
3. White card containing: tab bar → toolbar row (segmented sub-filter left; search + Filter & Sort + Export CSV right) → data table → pagination row.

### 1.2 UI elements (verbatim copy)
- **Tabs** (underline style): "Funding" (active, dark bold with green underline), "Swap", "OTC Request".
- **Sub-filter segmented control** (grey pill container, only on Funding tab):
  - "All Funding" — selected segment (white raised chip).
  - "Action Needed  0" — unselected; trailing count badge showing `0`.
- **Search input**: leading magnifier icon, placeholder "Search by Transaction ID". Rounded field, white bg, grey border.
- **"Filter & Sort"** — tertiary/ghost button with sliders (filter) icon, dark text. The panel it opens was **not captured** — see §9 for the inferred filter sheet.
- **"Export CSV"** — tertiary/ghost button with download icon, dark text.
- **Table columns** (left→right): "Transaction ID" | "Created Date" | "Transaction Hash" | "Transaction Type" | "Details" | "N…" **[cut off — "Network"]** | "Status". The table scrolls horizontally on web; Status is pinned/visible at right. Header row has light grey background, bold dark labels.
- **Row cells**:
  - Transaction ID: truncated hash as underlined teal link + trailing copy IconButton.
  - Transaction Hash: truncated hash as underlined link + copy IconButton, or "-" when absent.
  - Transaction Type: two lines — bold type name, regular-weight qualifier below (e.g. bold "Blockchain Transfer In" / "to StraitsX Account").
  - Status: outlined green Tag "Completed".
- **Pagination** (right-aligned below table): `‹` chevron IconButton (disabled), page box "1" (active, outlined), `›` chevron IconButton (disabled), page-size Select "10 / page" with chevron.

### 1.3 Dummy data — Funding rows (2 rows)
| Transaction ID | Created Date | Transaction Hash | Transaction Type | Details | Network | Status |
|---|---|---|---|---|---|---|
| "c40...070a2" (full: `c40ccea31f61da181c296de5641070a2`, see Step 4) | "27 Jun 2026, 11:36" | "0xf...d22e9" (full: `0xf9404a33f840884f71049b21171dca3a`, see Step 4) | "**Blockchain Transfer In**" / "to StraitsX Account" | "-" | "BN…" **[cut off — "BNB Smart Chain"** per Step 4 detail**]** | Tag "Completed" (positive) |
| "207...75deb" | "17 Jun 2026, 16:00" | "-" | "**Admin Transfer** to" / "Straitsx Account" (note lowercase "x" — verbatim) | "Dogfooding stage 1" / "Rewards" | **[not visible — use "-"]** | Tag "Completed" (positive) |

- Sub-filter counts: All Funding = 2 rows shown; "Action Needed 0".
- Pagination state: page 1 of 1, "10 / page".

### 1.4 Flow logic
- Tap "Swap" tab → Step 2. Tap "OTC Request" tab → Step 3.
- Tap a row's Transaction ID link (`c40...070a2`) → Step 4 detail page at `/transactions/c40ccea31f61da181c296de5641070a2`. On mobile the whole card is tappable.
- Copy icons copy the full ID/hash to clipboard (show **Toast** "Copied" **[inferred]**).
- "Action Needed" segment filters to rows needing action (empty in dummy data → **EmptyState**).
- Search filters rows by Transaction ID substring.
- "Export CSV" triggers a file download (prototype: no-op or Toast).

### 1.5 Mobile adaptation
- **PageTitle** with **Breadcrumb** (or just title + back affordance).
- **Tabs** component (`items=[{id:'funding',label:'Funding'},{id:'swap',label:'Swap'},{id:'otc',label:'OTC Request'}]`), `fill` on mobile, horizontally scrollable if tight.
- Toolbar: search **Input** full-width; "Filter & Sort" and "Export CSV" as **IconButton**s or a compact row beneath; the segmented sub-filter ("All Funding" / "Action Needed 0") as **Tabs** `variant="pill"` or two **Tag**/chips.
- **Table → card list**: replace the wide table with a vertical list of cards (one per transaction). Each card: line 1 — bold Transaction Type ("Blockchain Transfer In") + Status **Tag** right-aligned; line 2 — qualifier ("to StraitsX Account"); line 3 — truncated ID with **Copybox**/copy IconButton; line 4 — date "27 Jun 2026, 11:36" (secondary) + Details text if present. Reuse **TransactionHistoryTable** (`type="funding"`) only if a table view is kept for wide viewports; the DS funding column set (ID, Date, Amount, Network, Wallet, Status) differs from this screen's columns, so pass custom columns via **Table** or restyle as cards.
- **Pagination** component under the list (`page=1 totalPages=1`), page-size select optional on mobile (drop "10 / page" or put in the filter sheet).

### 1.6 Visual notes
- Status Tag: outline style — green border/text on pale green bg → **Tag** `tone="positive"` (`--status-positive` #257c58 on `--status-surface-positive` #f0f9f4).
- Row height ~68px (two-line cells), generous padding; light grey header band; hairline row dividers (`--border` #d8d8d8 at low emphasis).
- IDs/hashes truncated head…tail ("c40...070a2"), monospace-friendly; links underlined, teal/blue.
- Dates formatted "D MMM YYYY, HH:mm" (24h).

---

## 2. Transaction History — Step 2: Swap tab

URL: `app.straitsx.com/transactions`

### 2.1 Purpose & layout
Lists swap transactions. Same card/shell as Step 1 but: no segmented sub-filter; instead a small bold section label "Transaction History" sits left of the toolbar row. Search / "Filter & Sort" / "Export CSV" identical.

### 2.2 UI elements (verbatim)
- Tabs: "Funding", "Swap" (active), "OTC Request".
- Section label: "Transaction History".
- Search placeholder: "Search by Transaction ID".
- Buttons: "Filter & Sort", "Export CSV".
- **Table columns** (left→right, visible): "Transaction ID" | "Created Date" | "Details" | "Pair" | "Sell" — table is horizontally cut; remaining columns **[cut off — per DS `TransactionHistoryTable type="swap"`: "Buy", "Price", "Fee", "Status"]**.
- Pagination: `‹` (disabled) "1" `›` (disabled), "10 / page".

### 2.3 Dummy data — Swap rows (1 row)
| Transaction ID | Created Date | Details | Pair | Sell | Buy | Price | Fee | Status |
|---|---|---|---|---|---|---|---|---|
| "16c487e4-c980-413f-ad97-a453e2205fe1" (full UUID shown, plain text, no copy icon) | "27 Jun 2026, 10:46" | "**Swap** from XUSD to USDT" ("Swap" bold) | "XUSD/USDT" | "**10.00 XUSD**" (bold) | **[cut off — suggest "10.00 USDT"]** | **[cut off — suggest "1 XUSD ≈ 1.0000 USDT"]** | **[cut off — suggest "0.00 XUSD"]** | **[cut off — suggest Tag "Completed" positive]** |

### 2.4 Flow logic
- Reached from Step 1 by tapping the "Swap" tab. Tabs persist URL `/transactions`.
- Row click: no detail navigation observed for swap rows (ID rendered as plain text, not a link) — keep rows non-clickable, or open a read-only bottom sheet **[inferred]**.

### 2.5 Mobile adaptation
- Same shell as §1.5. Card per swap: line 1 — "Swap from XUSD to USDT" + Status Tag; line 2 — pair chip "XUSD/USDT"; line 3 — "Sell 10.00 XUSD" / "Buy 10.00 USDT" as a two-column **CardAttribute**-style pair; line 4 — date + full UUID (wrap or truncate with copy).
- DS mapping: **TransactionHistoryTable** `type="swap"` for ≥md viewports; card list + **Tag** + **Pagination** on mobile.

### 2.6 Visual notes
- "Sell" amount bold dark; amounts formatted with 2 decimals + space + asset code ("10.00 XUSD").
- Single-line rows here (~52px) — denser than Funding rows.

---

## 3. Transaction History — Step 3: OTC Request tab (empty state)

URL: `app.straitsx.com/transactions`

### 3.1 Purpose & layout
Lists OTC requests; currently empty. Shell identical to Step 2 (section label "Transaction History", search, "Filter & Sort", "Export CSV" — Export CSV rendered **greyed out/disabled** because there is no data). Table header renders even when empty, with an empty-state block in the body.

### 3.2 UI elements (verbatim)
- Tabs: "Funding", "Swap", "OTC Request" (active).
- Section label: "Transaction History".
- Search placeholder: "Search by Transaction ID".
- Buttons: "Filter & Sort" (enabled), "Export CSV" (disabled/grey).
- **Table columns**: "Created Date" | "Transaction ID" | "Pair" | "Amount to Sell" | "Amount to Buy" | "Rate". (Note: Status column not visible; likely further right **[cut off]**.)
- **Empty state** (centered in table body):
  - Illustration: open cardboard box, green lid, with orange circular "!" badge.
  - Title (bold): "No transactions yet"
  - Sub: "Your transaction activities will appear here."
  - Primary button (green pill): "Make an OTC Request".
- No pagination row shown while empty.

### 3.3 Dummy data
- Zero rows. Reuse the empty-state copy above verbatim.
- After a submitted OTC request (see §8), you may append a row: Created Date "3 Jul 2026, 09:00" · ID `otc-0001` · Pair "USDC/USDT" · Amount to Sell "100,000 USDC" · Amount to Buy "USDT (quote pending)" · Rate "-" · Tag "Pending" (warning) **[inferred, for prototype continuity]**.

### 3.4 Flow logic
- Reached by tapping "OTC Request" tab.
- "Make an OTC Request" button → opens the OTC modal flow (OTC Steps 2–4, §6–§8). This is the bridge between the two flows.

### 3.5 Mobile adaptation
- **EmptyState** component (`title="No transactions yet"`, `sub="Your transaction activities will appear here."`) — note DS EmptyState has no illustration/action slots, so compose: illustration img + `EmptyState` + **Button** `variant="primary"` "Make an OTC Request" stacked in the list body.
- Skip rendering the empty table header on mobile; show tabs → toolbar → EmptyState card.
- OTC list rows (if populated): **TransactionHistoryTable** `type="otc"` on wide; cards on mobile (Pair + amounts + rate + Tag).

### 3.6 Visual notes
- Disabled "Export CSV" is grey text + grey icon.
- Empty-state title dark bold ~16px; sub grey ~14px; button uses `--primary` Vibrant Green #00d37e with dark text.

---

## 4. Transaction History — Step 4: Transaction detail page

URL: `app.straitsx.com/transactions/c40ccea31f61da181c296de5641070a2`

### 4.1 Purpose & layout
Full detail of one funding transaction (row 1 from Step 1). Layout:
1. Breadcrumb: "Home" / "Transactions" (both links) / "ID c40ccea31f61da181c296de5641070a2".
2. H1: "ID c40ccea31f61da181c296de5641070a2".
3. Back link: left chevron icon + "Back to Transactions" (bold, underlined).
4. Two cards side by side: left ~2/3 "Transaction Details", right ~1/3 "Amount Details".
5. Help line below the left card.

### 4.2 UI elements & every field (verbatim)
**Card "Transaction Details"** (title + hairline divider, then a 2-column label/value grid):
| Label | Value |
|---|---|
| "Transaction Hash" | "0xf9404a33f840884f71049b21171dca3a" — underlined link (block explorer) |
| "Network" | "BNB Smart Chain" |
| "Status" | Tag "Completed" (positive, outlined) |
| "Transaction Type" | "Blockchain Transfer In" |
| "Created Date" + info ⓘ icon | "27 Jun 2026, 11:36" |
| "Completed Date" + info ⓘ icon | "1 Jul 2026, 11:28" |
| "Details" | "-" |

**Card "Amount Details"** (right):
| Label | Value |
|---|---|
| "Total Amount" | "+13.78 USDT" (bold) |
| "Fee" | "-0.00 USDT" |
| — divider — | |
| "Net Amount" | "+13.78 USDT" (bold) |

**Help line** (below cards, with lightbulb icon): "Need help? Learn more about how payment transaction processing works" — "Learn more" is a link.

### 4.3 Dummy data
Exactly the values in the two tables above; this record corresponds to Funding row 1 (`c40...070a2`).

### 4.4 Flow logic
- Opened by tapping the Transaction ID link in the Funding table (Step 1).
- "Back to Transactions" and breadcrumb "Transactions" → return to `/transactions` (Funding tab state preserved).
- Transaction Hash link → external block explorer (prototype: no-op).

### 4.5 Mobile adaptation
- Option A (preferred): **push screen** with back arrow in top bar titled "Transaction Details"; ID shown truncated ("ID c40...070a2") with **Copybox** for the full value. Option B: **BottomSheet** (`title="Transaction Details"`) over the list for quick glance.
- **CardAttribute** maps 1:1 (`title="Transaction Details"`, `status={{label:'Completed',tone:'positive'}}`, `attributes=[{label,value},...]`, copy actions on hash). Second **CardAttribute** or **CardSummary** for "Amount Details" (Total/Fee/divider/Net).
- Stack the two cards vertically: Amount Details first on mobile (the number users look for), then Transaction Details **[inferred ordering]**.
- Info ⓘ icons → **Tooltip** on web, tap-to-**Toast**/coachmark on mobile.

### 4.6 Visual notes
- Long hash H1 must not overflow on mobile — truncate middle.
- "+13.78 USDT" positive amounts keep dark text (not green) with explicit "+" sign; fee shown as "-0.00 USDT".
- Label grey ~13px above dark 15px value; rows spaced ~28px; cards white, 1px `--border`, ~12px radius.

---

## 5. OTC — Step 1: Dashboard (entry point)

URL: `app.straitsx.com` (Home)

### 5.1 Purpose & layout
Personal dashboard where the OTC banner lives. Regions: balance header row (left: balance; right: 3 quick actions) → left column ("My Assets" card, "Start your journey with StraitsX" card) → right column ("Swap" card, OTC Desk banner).

### 5.2 UI elements (verbatim)
- **Balance header**: "Estimated Balance" + ⓘ icon; value "30.58" (large bold) "SGD" (smaller).
- **Quick actions** (icon above label): "Transfer In" (green filled circle, plus icon), "Transfer Out" (green filled circle, up-right arrow icon), "History" (light grey rounded-square, picture icon).
- **Card "My Assets"** with refresh (circular-arrow) icon beside title. Asset rows (coin logo | bold ticker + grey caption | bold balance + grey "≈ x.xx SGD" | mini network icons | round "+" button | round "↗" button):
  1. XSGD (blue coin) — caption "XSGD" — "0.00" — "≈ 0.00 SGD" — network icon cluster + "+5" overflow chip (one icon has "NEW" ribbon)
  2. XUSD (green coin) — caption "XUSD" — "0.00" — "≈ 0.00 SGD" — 3 network icons (one "NEW")
  3. USDT (teal Tether logo) — "23.77" — "≈ 30.58 SGD" — network icons (one "NEW")
  4. USDC (blue $ logo) — "0.00" — "≈ 0.00 SGD" — 1 purple network icon
- **Card "Start your journey with StraitsX"** with segmented control: "Buy Stablecoin" (selected white chip) | "Sell Stablecoin". (Checklist content below the fold; visible on OTC Steps 3–4 background: "Verify your identity." ✓; "Transfer from your bank and receive XSGD or XUSD instantly at 1:1. Learn how" ›; "Whitelist your blockchain address. Learn how" ✓; "Set up 2FA. Learn how" ✓; "Transfer out stablecoin to the whitelisted blockchain address. Learn how" ›.)
- **Card "Swap"** (right column):
  - "From" label; right-aligned "Balance: 0.00 XSGD"
  - Amount input: XSGD coin icon, placeholder/value "0.00", "Max" link inside field; attached asset Select "XSGD ▾"
  - Rate chip: "1 XSGD ≈ 0.7717 XUSD"; circular swap-direction IconButton at right
  - "To" label; right-aligned "Balance: 0.00 XUSD"
  - Amount input "0.00" with asset Select "XUSD ▾"
  - Button "Swap" — full width, disabled (grey) when empty
  - Caption: "No Fees • Rate refreshes every minute."
  - (In OTC Steps 2–4 background the From field contains "12.9" XSGD and the button reads "Preview Swap", enabled dark-green — i.e. label switches "Swap" → "Preview Swap" when a valid amount is entered.)
- **OTC Desk banner** (dark Secure Teal card, bottom right; green diagonal-stripe decoration):
  - Title: "StraitsX OTC Desk"
  - Body: "We offer deep liquidity to institutions and high net-worth individuals. Starting from **100,000 USD**." ("100,000 USD" bold)
  - CTA link (Vibrant Green text + arrow →): "Request Quote"

### 5.3 Dummy data
- Estimated Balance: `30.58 SGD`.
- Assets: XSGD 0.00 (≈0.00 SGD), XUSD 0.00 (≈0.00 SGD), USDT 23.77 (≈30.58 SGD), USDC 0.00 (≈0.00 SGD).
- Swap defaults: From XSGD balance 0.00; To XUSD balance 0.00; rate "1 XSGD ≈ 0.7717 XUSD"; entered example "12.9" XSGD.
- OTC banner copy as above; minimum "100,000 USD".

### 5.4 Flow logic
- Tap "Request Quote" on the OTC banner → OTC Step 2 intro modal. (Same modal also opens from "Make an OTC Request" on TH Step 3.)
- Quick action "History" → Transaction History screen.
- Swap card: entering amount > 0 enables and relabels button to "Preview Swap".

### 5.5 Mobile adaptation
- Single column order: EstimatedBalance header → quick actions row → My Assets → Swap card → **OtcBanner** → journey checklist.
- DS mapping: **EstimatedBalance**; **CardAsset**/**ListAsset** rows with **AssetMark** logos and **Badge** for "NEW"/"+5"; **CardSwap**/**TransferPanel** + **DropdownAsset** + **InlineCrossAsset** for the Swap card; **OtcBanner** (`title="StraitsX OTC Desk"`, `amount="100,000 USD"`, `ctaLabel="Request Quote"`) — its default body text matches this copy; **CardChecklist**/**CardSteps** for the journey card; **Tabs** pill variant for "Buy Stablecoin"/"Sell Stablecoin".

### 5.6 Visual notes
- Banner: bg `--brand-secure-teal` #054948, decorative strokes/CTA in `--brand-vibrant-green` #00d37e, white text.
- Balances bold dark; "≈ … SGD" grey caption; two-decimal formatting throughout; thousands separator with comma ("100,000 USD").

---

## 6. OTC — Step 2: "Request an OTC Trading Quote" intro modal

### 6.1 Purpose & layout
Centered modal (web) explaining the OTC process before the form. Header with title + close "✕"; scrollable body; sticky footer CTA.

### 6.2 UI elements (verbatim)
- Title: "Request an OTC Trading Quote" (divider below header).
- Illustration: two green-clothed figures beside a large dollar-coin (spot illustration, centered).
- Lead (bold): "Submit a request to the StraitsX OTC Trading Desk."
- **Numbered steps panel** (light grey rounded panel; dark numbered circles 1/2/3):
  1. "Select the token pairs you wish to buy or sell."
  2. "Review and submit your request details."
  3. "Our OTC Trading Desk will respond within **1 business day** (Mon - Fri, 9:00 AM - 5:30 PM - SGT) via **Email / WhatsApp / Telegram** at your contact details." (bold as marked)
- **Contact card** (white, bordered, two rows with leading icon and trailing action IconButton):
  - Row 1: envelope icon — "Email" (bold) / "otc@straitsx.com" — copy icon button.
  - Row 2: circled-? icon — "More about OTC" (bold) / "Learn about StraitsX OTC" — external-link icon button.
- Footer: full-width primary green pill button "Request Quote".
- Close "✕" top-right.

### 6.3 Dummy data
- Email: `otc@straitsx.com`. All copy above verbatim.

### 6.4 Flow logic
- Opened from OTC banner "Request Quote" (dashboard) or "Make an OTC Request" (TH Step 3).
- "Request Quote" footer button → Step 3 form. "✕" closes the modal, returning to the underlying page.
- Copy button copies the email (**Toast** "Copied" [inferred]); external-link opens OTC info page (no-op in prototype).

### 6.5 Mobile adaptation
- **BottomSheet** (`title="Request an OTC Trading Quote"`, footer = **Button** primary "Request Quote", dismissable) — full-height sheet. Alternatively **Modal** `size="small"` with `illustration` prop on ≥md.
- Steps panel: **Steps**/**CardSteps** vertical variant or simple numbered list; contact card rows via **SelectionBox**-like rows or custom list + **IconButton** (icons: `mail`, `help`, `content_copy`, `open_in_new`).

### 6.6 Visual notes
- Step number circles: dark Deep Ivy bg, white numerals. Panel bg light grey (#f7f7f7-ish, use `--brand-modern-light-grey`).
- CTA pill uses `--primary` #00d37e with dark (Deep Ivy) label; fully rounded.

---

## 7. OTC — Step 3: Request form (modal step 2)

### 7.1 Purpose & layout
Same modal, now the trade-intent form. Header identical; body has direction toggle → amount row → helper → counter-asset select; footer has Back/Next.

### 7.2 UI elements (verbatim)
- Title: "Request an OTC Trading Quote", "✕" close.
- Field label: "You would like to"
- **Direction toggle** — two selectable outlined buttons:
  - "Buy" with ↓ (down-arrow) icon — selected state: dark border, bold.
  - "Sell" with ↑ (up-arrow) icon — unselected: grey border.
- **Amount row** (input + attached asset select, one visual group):
  - Input placeholder: "Enter Amount"
  - Asset select: USDC coin icon + "USDC" + chevron ▾ (options **[inferred]**: USDC, USDT, XSGD, XUSD).
- Helper text below: "The minimum request amount for an OTC trade is USD 100K or SGD 140K. Learn more" — "Learn more" is a link.
- Field label: "With your"
- **Counter-asset select** (large bordered row, full width): XSGD coin icon | "XSGD" (bold) with sub-caption "1:1 to SGD" | chevron ▾. (Options **[inferred]**: XSGD "1:1 to SGD", XUSD "1:1 to USD", USDT, USDC.)
- Footer: "Back" (outlined pill, dark text) | "Next" (pill, disabled grey until form valid).

### 7.3 Dummy data / example state
- As captured: direction "Buy" selected; amount empty ("Enter Amount"); amount asset USDC; counter asset XSGD ("1:1 to SGD"); "Next" disabled.
- To reach Step 4's confirmation, prototype state must be: direction **Sell**, amount **100,000**, asset **USDC**, counter asset **USDT**.
- Validation: amount required; minimum USD 100K / SGD 140K.

### 7.4 Flow logic
- Reached from Step 2 via "Request Quote".
- "Back" → Step 2 intro. "✕" → close modal.
- Selecting Buy/Sell toggles direction; entering a valid amount (≥ min) enables "Next".
- "Next" → Step 4 Confirmation.

### 7.5 Mobile adaptation
- Same **BottomSheet**; footer = two buttons (Back outlined `variant="secondary"`, Next `variant="primary"` disabled state).
- Direction toggle → two **SelectionBox** (`type="radio"`, `indicator="none"`, icons `arrow_downward`/`arrow_upward`) or **Tabs** pill.
- Amount row → **Input** with `suffix` = **DropdownAsset** (or trailing asset **Select**); helper via Input's `helper` prop.
- Counter-asset select → **DropdownAsset**/**FieldBank**-style large field with **AssetMark** icon, bold label + caption, opening a **BottomSheetBlockchain/ListAsset** picker on mobile.

### 7.6 Visual notes
- Selected toggle: 2px Deep Ivy border, white bg; unselected 1px `--border`.
- Helper text grey 13px, link Credible Blue; "USD 100K or SGD 140K" plain (not bold).
- Disabled "Next": grey bg `--brand-modern-light-grey`, grey text.

---

## 8. OTC — Step 4: Confirmation modal

### 8.1 Purpose & layout
Final review of the OTC request. Header "Confirmation" + "✕"; summary panel; two fee/time rows; footer Back / Submit Request.

### 8.2 UI elements (verbatim)
- Title: "Confirmation".
- **Summary panel** (light grey rounded):
  - Center line: USDC coin icon "100,000 USDC" (bold) → (arrow icon) USDT coin icon "USDT" (bold).
  - Caption below: "You are selling 100,000 USDC in exchange for USDT"
- **Detail rows** (label left, value right-aligned bold):
  - "Transfer Fee" — "Free"
  - "Processing Time" — "~ 1 Business Day"
- Footer: "Back" (outlined pill) | "Submit Request" (primary green pill).

### 8.3 Dummy data
- Sell 100,000 USDC → buy USDT (no quoted buy-amount at this stage — quote comes later from the desk). Transfer Fee "Free"; Processing Time "~ 1 Business Day".

### 8.4 Flow logic
- Reached from Step 3 "Next".
- "Back" → Step 3 (state retained). "✕" → close.
- "Submit Request" → submits; screenshots end here. Prototype: close modal + success **Toast** "OTC request submitted" and add the Pending row from §3.3 to the OTC Request tab **[inferred]**.

### 8.5 Mobile adaptation
- Same **BottomSheet**; summary panel via **CardSummary** or a custom grey panel with two **AssetMark**s + `arrow_forward` **Icon**; rows via **CardAttribute** `attributes=[{label:'Transfer Fee',value:'Free'},{label:'Processing Time',value:'~ 1 Business Day'}]`.
- Footer buttons: **Button** secondary "Back" + primary "Submit Request", full-width split 50/50.

### 8.6 Visual notes
- Amounts bold Deep Ivy; grey panel same tone as Step 2's steps panel; comma thousands ("100,000").

---

## 9. Filter & Sort sheet — NOT captured, build as follows [inferred]

No screenshot opens "Filter & Sort". Compose a **BottomSheet** titled "Filter & Sort" with:
- "Date Range" — **DateInput** `range` (start/end).
- "Transaction Type" — **MultiSelect**; Funding options: Blockchain Transfer In, Blockchain Transfer Out, Bank Transfer In, Bank Transfer Out, Admin Transfer.
- "Asset" — **MultiSelect**: XSGD, XUSD, USDT, USDC, XIDR.
- "Status" — **MultiSelect**: Completed, Pending, Processing, Cancelled, Failed (tones per §10).
- "Sort by" — **Select**: Newest first (default), Oldest first, Amount high→low, Amount low→high.
- Footer: "Reset" (secondary) | "Apply" (primary).
Mark this UI as inferred in any demo notes; everything else in this spec is observed.

---

## 10. Consolidated reference

### 10.1 Status tags (Tag component)
| Label | tone | Text/border token | Surface token |
|---|---|---|---|
| "Completed" (only status observed) | `positive` | `--status-positive` #257c58 | `--status-surface-positive` #f0f9f4 |
| "Pending" [for inferred rows] | `warning` | `--status-warning` #fc9a07 | `--status-surface-warning` #fffaea |
| "Processing" | `info` | `--status-information` #0c45e1 | `--status-surface-information` #eef6ff |
| "Cancelled"/"Failed" | `critical` | `--status-critical` #df1312 | `--status-surface-critical` #fff1f1 |
Outlined (default) Tag style matches the screenshots. `TransactionHistoryTable` auto-maps these labels to tones.

### 10.2 Number & date formats
- Amounts: 2 decimals, comma thousands, trailing asset code: "10.00 XUSD", "23.77", "100,000 USDC", "+13.78 USDT", "-0.00 USDT".
- Rates: "1 XSGD ≈ 0.7717 XUSD", "1:1 to SGD".
- Dates: "27 Jun 2026, 11:36" (D MMM YYYY, HH:mm 24h).
- IDs: middle-truncated "c40...070a2" / "0xf...d22e9" in tables; full in detail/H1.

### 10.3 Component map (all exist in `src/components`)
Tabs, Tag, Table, TransactionHistoryTable, Pagination, Input (search), Select, MultiSelect, DateInput, Button, LinkButton, IconButton, Breadcrumb, PageTitle, EmptyState, BottomSheet, Modal, CardAttribute, CardSummary, Copybox, Toast, Tooltip, OtcBanner, EstimatedBalance, CardAsset/ListAsset, AssetMark, Badge, CardSwap/TransferPanel, DropdownAsset, InlineCrossAsset, SelectionBox, Steps/CardSteps, CardChecklist, Icon, StatusIcon, AppTopNav/TopBar/TopNavigation, Menu, Logomark.

### 10.4 Screen/flow graph
```
Dashboard (OTC-1) ──Request Quote──▶ OTC Intro (OTC-2) ──Request Quote──▶ Form (OTC-3) ──Next──▶ Confirmation (OTC-4) ──Submit Request──▶ [toast + OTC tab row]
Dashboard ──History──▶ TH Funding (TH-1) ⇄ tabs ⇄ TH Swap (TH-2) ⇄ TH OTC Request (TH-3) ──Make an OTC Request──▶ OTC-2
TH-1 ──tap Transaction ID──▶ Detail (TH-4) ──Back to Transactions──▶ TH-1
```
