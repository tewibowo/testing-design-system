# StraitsX Transfers — Mobile PWA Build Spec (Transfer In & Transfer Out)

Source of truth for rebuilding the StraitsX web dashboard's **Transfer In** (deposit
into StraitsX) and **Transfer Out** (withdraw out of StraitsX) flows as a mobile PWA
using the StraitsX design system.

- Screenshots analyzed: `reference/screenshots/Transfer In/` (Steps 1–5) and
  `reference/screenshots/Transfer Out/` (Steps 1–4). The builder does NOT need the
  screenshots — everything visible is transcribed here.
- Design system: components in `/home/user/testing-design-system/src/components/`,
  tokens in `/home/user/testing-design-system/src/styles/tokens.css`.
- Web origin: `app.straitsx.com` (dashboard), `app.straitsx.com/transfer_in`,
  `app.straitsx.com/transfer_out`.

---

## 0. Shared chrome (appears on every web screen — adapt once)

Desktop web chrome that must be re-mapped for mobile:

| Web element | Content (verbatim) | Mobile adaptation |
|---|---|---|
| Left sidebar | StraitsX logo + "Personal Account"; nav: **Home** (active — light-green pill `--sidebar-active` #d7efe2, green text/icon), **Mint**, **Transaction History**, **Support** (icons: house, card, document-list, headset) | Bottom tab bar or hamburger via `Sidebar`/`Menu`; for the prototype a simple `AppTopNav`/`TopBar` + back button is enough |
| Top-right header | Bell icon button (grey circle), avatar icon button (grey circle), username "TEWIBOWO" (all-caps, small) | `TopBar` with `IconButton`s; username can collapse into avatar |
| Back link (transfer pages) | "← Return to Home" — blue link (`--link` #187d97 family; renders as a standard blue text link with left arrow) | `TopBar`/`AppTopNav` back chevron; or `LinkButton` with leading `arrow_back` icon |
| Legal footer (transfer pages) | Verbatim, 4 lines: "XSGD, XUSD and XIDR are issued by StraitsX." / "“STRAITSX”, “XSGD” and “XIDR” and all other URLs, logos and trademarks related to the StraitsX Services are either trademarks or registered trademarks of StraitsX or its licensors." / "StraitsX is the trading name of the StraitsX Group of Companies and its affiliated entities." / "Important Risk Warnings Regarding Digital Payment Tokens: [Learn More]" (Learn More = link) | Small `--body-small` grey text block at page bottom |
| Chat FAB | Dark-teal circular floating button, chat-bubble icon, bottom-right (Intercom-style) | Optional; skip or keep as fixed `IconButton` |

Page background is `--background` #f6f7f9; content cards are white `--surface`
rounded ~`--radius-lg` (12px), subtle `--shadow-1`.

**Numbered step cards** (both transfer pages): each section is a white card headed by
a filled dark circle (deep ivy #002b2a) with a white numeral (1/2/3) + bold title.
Maps 1:1 to `CardSteps` (`step`, `title`, `helperText`, `children`). Unstarted
sections render as an empty card with just the number + title (collapsed).

**Method selector** (both pages, card 1 "Select Transfer Method"): two pill-ish
rectangular chips side by side:
- "Blockchain Transfer" with a wallet/card icon
- "Bank Transfer" with a bank (columned building) icon
Unselected: white bg, 1px `--border` #d8d8d8, radius ~8px. Selected: 2px dark
deep-ivy border, same white bg, text `--text-primary`. Exactly one selectable.
Map to two `SelectionBox` components (`indicator="control"` hidden → use
`indicator` style without radio dot, i.e. icon+label box; `type="radio"`,
`selected`, `icon`, `label`). NOTE: **no PayNow / QR-payment method exists** in
these screenshots — the only methods are Blockchain Transfer and Bank Transfer.

---

## 1. Transfer In — Step 1: Dashboard (entry point)

File: `Transfer In - Step 1.png` (identical image to `Transfer Out - Step 1.png`).

### Purpose & layout
Personal-account dashboard (`app.straitsx.com`). Entry point for both flows. Two
columns: left = balance header + "My Assets" card + "Start your journey" card;
right = Swap card + OTC Desk banner. Quick-action buttons top-right of content.

### UI elements & verbatim copy
- **Balance header**: label "Estimated Balance" + info ⓘ icon; amount **"30.58"**
  (large bold) + **"SGD"** (smaller, baseline-aligned).
- **Quick actions** (right of balance): three vertically-labeled circular buttons:
  - Green filled circle, white **+** icon, label "Transfer In"
  - Green filled circle, white **↗** (arrow-up-right) icon, label "Transfer Out"
  - White square-ish icon button (photo/history glyph), label "History"
- **My Assets card**: title "My Assets" + refresh ↻ icon button. Four asset rows,
  each: asset mark (40px circle), ticker (bold) + name (grey), balance (bold, green-tinted
  dark) + "≈ x.xx SGD" (grey), a cluster of small overlapping network mini-icons
  (some rows with a tiny "NEW" ribbon; XSGD row shows overflow counter "+5"),
  then two round-outline icon buttons: **+** (deposit) and **↗** (send).
  | Row | Ticker/name | Balance | ≈ SGD | Networks visual |
  |---|---|---|---|---|
  | 1 | XSGD / XSGD (blue mark) | 0.00 | ≈ 0.00 SGD | 4 mini icons + "+5", NEW tag |
  | 2 | XUSD / XUSD (green mark) | 0.00 | ≈ 0.00 SGD | 3 mini icons, NEW tag |
  | 3 | USDT (teal Tether mark) | 23.77 | ≈ 30.58 SGD | 3 mini icons, NEW tag |
  | 4 | USDC (blue circle-$ mark) | 0.00 | ≈ 0.00 SGD | 1 purple mini icon |
- **Start your journey card** (partially cut at viewport bottom): title "Start your
  journey with StraitsX"; segmented toggle: "Buy Stablecoin" (active, white chip) /
  "Sell Stablecoin".
- **Swap card** (right column): title "Swap". "From" + right-aligned "Balance: 0.00 XSGD".
  Amount input (blue focus border): XSGD mark, placeholder "0.00", link "Max";
  attached asset select "XSGD ▾" with mark. Rate chip (grey pill):
  "1 XSGD ≈ 0.7717 XUSD"; circular swap-direction icon button on the right.
  "To" + "Balance: 0.00 XUSD"; input placeholder "0.00" + "XUSD ▾" select.
  Full-width disabled button "Swap" (grey pill). Footnote:
  "No Fees • Rate refreshes every minute."
- **OTC banner** (dark green card): "StraitsX OTC Desk" / "We offer deep liquidity
  to institutions and high net-worth individuals." / (third line clipped by viewport,
  begins "Starting from 100,000 USD…").

### Dummy data
30.58 SGD (estimated balance); XSGD 0.00 / ≈0.00 SGD; XUSD 0.00 / ≈0.00 SGD;
USDT 23.77 / ≈30.58 SGD; USDC 0.00 / ≈0.00 SGD; rate 1 XSGD ≈ 0.7717 XUSD;
swap balances "0.00 XSGD" and "0.00 XUSD"; username TEWIBOWO.

### Flow logic
- Tap **Transfer In** quick action → navigate to Transfer In page (Step 2), asset
  context defaults to XSGD (also reachable per-asset via each row's **+** button).
- Tap **Transfer Out** quick action (or a row's **↗**) → Transfer Out page.

### Mobile adaptation
Full-screen home page. Stack vertically: `EstimatedBalance`
(label/amount/currency/showInfo — exactly matches "Estimated Balance ⓘ 30.58 SGD"),
quick-action row (3 `IconButton`s or circular `Button`s with captions), "My Assets"
as `Card` containing `ListAsset` rows (or `CardAsset`) with `AssetMark`
(`asset="XSGD"` etc. — brand colors built in: XSGD #0e3fc7, XUSD #257c58) and
`Badge`/`Tag` for "NEW". Swap panel can be a `TransferPanel` tab ("Swap") or omitted
from the prototype. OTC banner → `OtcBanner`. History → `TransactionHistoryTable`
elsewhere.

### Visual notes
Primary action green = `--primary` #00d37e. Balance figure in `--title/display`
scale, deep ivy #002b2a. Grey secondary text `--text-secondary` #505454. Numbers:
always 2 decimals for balances, comma thousands separators, "≈" prefix for fiat
approximations, 4 decimals for FX rate.

---

## 2. Transfer In — Step 2: Method selection (empty state)

File: `Transfer In - Step 2.png`. URL `app.straitsx.com/transfer_in`.

### Purpose & layout
Landing screen of the deposit flow. Single content column (~66%) + (right column
empty until a method is chosen). Regions top→bottom: back link, page title,
step-card 1, step-card 2 (collapsed), legal footer.

### UI elements & verbatim copy
- Back link: "← Return to Home"
- Page title: "Transfer In - ⦿ XSGD" (inline XSGD asset mark before ticker; title
  bold `--title-medium`+)
- Card ① "Select Transfer Method": chips "Blockchain Transfer" (wallet icon) and
  "Bank Transfer" (bank icon) — **neither selected**.
- Card ② "Make Your Transfer": header only, body empty (collapsed).
- Legal footer (see §0).

### Dummy data
None beyond chrome (TEWIBOWO).

### Flow logic
Selecting a method chip expands the flow: "Blockchain Transfer" → Step 3 screen;
"Bank Transfer" → Step 4 screen. Both selections also summon the right-hand
"Transfer Details" summary card.

### Mobile adaptation
Full-screen page (not a sheet — it is a primary flow). `AppTopNav` back +
`PageTitle` "Transfer In" with `AssetMark asset="XSGD" size={24}` inline.
Two `CardSteps` (step 1 and 2); method chips as a 2-col grid of `SelectionBox`es
(icon + label, no visible radio). Collapsed step 2 = `CardSteps` with no children.

### Visual notes
Step number badge: 24px filled circle #002b2a, white 14px numeral. Chips 48px tall,
icon 20px left of label, label `--label-large`-ish.

---

## 3. Transfer In — Step 3: Blockchain Transfer (deposit address)

File: `Transfer In - Step 3.png`.

### Purpose & layout
Deposit XSGD via blockchain: show the user a network picker, a deposit address +
QR, and fee/limit details. Two columns: left = step cards; right = "Transfer
Details" summary card with Important Notes + CTA.

### UI elements & verbatim copy
**Card ① Select Transfer Method** — "Blockchain Transfer" chip **selected** (dark
2px border). Below, inside the same card:
- Field label "Network"
- Select (full-width, white, chevron ▾): Ethereum — grey ETH diamond glyph + text
  "Ethereum".

**Card ② Make Your Transfer**
- Instruction line: "Send your ⦿ **XSGD** ⓘ to the ⟠ **Ethereum** address below:"
  (XSGD mark inline + bold "XSGD" + info icon; ETH glyph inline + bold "Ethereum")
- **QR code** ~140px, black-on-white, ETH glyph embedded at center.
- **Address copybox** (full-width, grey `--surface-secondary` field, radius 8):
  leading ETH glyph + value `0x6a232e04e2cf24f377cb150be1f4877db3c4f438`;
  right-attached white segment (bordered) with copy icon (overlapping squares).

**Right column — "Transfer Details" card** (white, radius 12):
| Label | Value (right-aligned) |
|---|---|
| Network | ⟠ **Ethereum** (bold, with glyph) |
| Processing Time | 6 Confirmations |
| Minimum Amount | ⓘ 1 XSGD (info icon precedes value) |
| Transfer Fee | 0.5 XSGD |
| (sub-note under Transfer Fee, right-aligned, grey, 2 lines) | "Fee for transactions of 10 XSGD or more" |

- **Important Notes box** (light green bg #f0f9f4, 3px dark-green left border):
  Title (bold): "Important Notes:" Body: "To avoid delays or loss of funds, ensure
  your personal/non-custodial address is whitelisted and only send XSGD on the
  correct network." Link (blue, own line): "Whitelist my address"
- **Primary CTA**: full-width green pill button "I've Transferred" (bg #00d37e,
  white label).

### Dummy data
Network Ethereum; address `0x6a232e04e2cf24f377cb150be1f4877db3c4f438`; processing
time "6 Confirmations"; minimum amount "1 XSGD"; transfer fee "0.5 XSGD" (applies
to transactions of 10 XSGD or more).

### Flow logic
- Changing "Network" select would swap address/fees (only Ethereum captured).
- User sends funds from an external wallet, then taps "I've Transferred" →
  success/awaiting modal (same pattern as Step 5; captured for the bank branch).
- This is a terminal info screen — no amount entry on Transfer In blockchain.

### Mobile adaptation
Same full-screen page as §2 with content expanded. Mapping:
- Network select → `FieldNetwork` (label "Network", options `[{Ethereum}]`) opening
  `BottomSheetNetwork` on mobile; option rows via `ListSupportedNetwork` /
  `DropdownNetwork` content.
- QR → `QR` (`value` = address, `size` ≈ 160–200).
- Address → `Copybox` (`value`, `logo`/`icon` = ETH glyph, `action` copy,
  `truncate` on narrow screens, fire `Toast` "Copied" on tap).
- Transfer Details → `CardSummary` with
  `items=[{label:"Network", value:"Ethereum"},{label:"Processing Time", value:"6 Confirmations"},{label:"Minimum Amount", value:"1 XSGD", info:true},{label:"Transfer Fee", value:"0.5 XSGD"}]`,
  `note={title:"Important Notes:", body:…}` (renders `ImportantNotes`/`Alert`
  tone positive), `button={label:"I've Transferred"}`. On mobile place the
  summary card BELOW the step cards (single column) with the CTA sticky at bottom.

### Visual notes
Fee sub-note is `--body-small` grey and right-aligned under its row. Info icons are
16px outline ⓘ. Address rendered in one line (mono-ish appearance; use
`--font-mono` or tabular figures + `truncate`).

---

## 4. Transfer In — Step 4: Bank Transfer (FAST deposit details)

File: `Transfer In - Step 4.png`.

### Purpose & layout
Deposit SGD via Singapore FAST bank transfer to a personal virtual account; SGD is
converted 1:1 into XSGD. Two columns as before.

### UI elements & verbatim copy
**Card ①** — "Bank Transfer" chip **selected**. (No extra fields inside card 1 for
bank mode — no network select.)

**Card ② Make Your Transfer**
- Intro line: "Make a **FAST** transfer using the details below:" (FAST bold)
- Three labeled read-only copy rows (grey field + white copy-icon segment):
  1. Label "Recipient Name" → value "TEWIBOWO"
  2. Label "Bank Name" → value "Xfers Pte Ltd"
  3. Label "Bank Account Number ⓘ" (info icon after label) → value
     "3225-6257-7650-1"

**Right column — "Transfer Details" card**
- **Conversion box** (grey rounded inset at top of card):
  [🇸🇬 round flag] "SGD" → (arrow) [⦿ XSGD mark] "XSGD", caption below:
  "Your SGD will be converted 1:1 for XSGD"
- Rows:
  | Label | Value |
  |---|---|
  | Maximum amount | **200,000 SGD per txn.** (bold) |
  | Transfer fee | Free |
  | Processing time | Instant |
- **Important Notes box** (green): "Important Notes:" / "We currently support only
  [selected Singapore banks] and do not accept GIRO or SWIFT transfers."
  ("selected Singapore banks" = blue underlined link)
- **Primary CTA**: green pill "I've Transferred".

### Dummy data
Recipient name TEWIBOWO; bank name "Xfers Pte Ltd"; virtual account number
"3225-6257-7650-1"; max 200,000 SGD per txn.; fee Free; processing Instant;
conversion SGD→XSGD 1:1.

### Flow logic
- User copies details, makes a FAST transfer from their own banking app, then taps
  "I've Transferred" → Step 5 modal ("We are awaiting your funds").
- Difference vs blockchain branch: no QR/address/network; fee Free vs 0.5 XSGD;
  instant vs 6 confirmations; has max-per-txn instead of minimum.

### Mobile adaptation
- The three detail rows → three `Copybox`es with `label` prop ("Recipient Name",
  "Bank Name", "Bank Account Number" + `info`), each with copy `action` → `Toast`.
- Conversion box + rows + note + CTA → `CardSummary` with
  `conversion={{from:{label:"SGD", logo:SGflag}, to:{label:"XSGD", logo:XSGDmark}, note:"Your SGD will be converted 1:1 for XSGD"}}`,
  `items=[{label:"Maximum amount", value:"200,000 SGD per txn."},{label:"Transfer fee", value:"Free"},{label:"Processing time", value:"Instant"}]`,
  `note={title:"Important Notes:", …}`, `button={label:"I've Transferred"}`.
  (This exact shape is documented in `CardSummary.jsx`'s JSDoc.)
- Keep as full-screen page; CTA may be sticky bottom.

### Visual notes
"Maximum amount" value is the only bold row value. The SGD side of the conversion
box uses a round Singapore-flag mark; XSGD side uses the blue XSGD `AssetMark`.
Account number keeps its hyphen grouping 4-4-4-1 exactly: `3225-6257-7650-1`.

---

## 5. Transfer In — Step 5: Success / awaiting-funds modal

File: `Transfer In - Step 5.png`.

### Purpose & layout
Confirmation dialog after "I've Transferred" (bank branch shown). Centered modal
(~400px) over full-page scrim (dark translucent, `--overlay`); backdrop shows the
Step 4 page dimmed.

### UI elements & verbatim copy
- **Illustration**: mint-green rocket lifting off above a grey smoke cloud with
  small dots (celebration/launch motif), centered at top.
- **Title** (bold, centered): "We are awaiting your funds"
- **Body** (centered, grey): "Once arrived, your SGD funds will be converted to
  XSGD at 1:1 with no fees. Please allow up to 2-5 business funds to be reflected
  in your account. You'll get an email once it is credited."
  (sic — the live product copy literally reads "2-5 business funds"; reproduce
  verbatim or intentionally fix to "business days" — flag to design.)
- **Help line**: "Need help? [Contact Support] anytime" (Contact Support = blue link)
- **Footer** (light-grey band, full width of modal): green pill button
  "Back to home"

### Dummy data
None new.

### Flow logic
- Appears on tapping "I've Transferred" (either branch; copy above is the bank/SGD
  variant). "Back to home" → dashboard (Step 1). Dismiss = same.
- This is a pending/awaiting state, not a completed-transaction state.

### Mobile adaptation
Use `Modal` (`size="small"`, `illustration` = rocket asset, `title`, body children,
`footer` = `Button variant="primary"` "Back to home") — Modal already supports the
illustration + grey footer band pattern. On small screens a `BottomSheet` with the
same content is acceptable; prefer `Modal` for parity. Alternative for a full-page
variant: `CardStatus`/`StatusIcon`, but the screenshot is clearly a dialog.

### Visual notes
Scrim ≈ rgba(5,21,19,.7). Modal radius 12–16px, heavy shadow (`--shadow-3`).
Button is full-width inside footer. Behind the scrim the right-column CTA appears
dark green — that is just the dimmed #00d37e, not a separate state.

---

## 6. Transfer Out — Step 1: Dashboard (entry point)

File: `Transfer Out - Step 1.png` — **pixel-identical to Transfer In Step 1** (§1).
Entry action differs: tap the "Transfer Out" circular green ↗ quick action (or an
asset row's ↗ button). Everything else in §1 applies unchanged.

---

## 7. Transfer Out — Step 2: Method selection (empty state)

File: `Transfer Out - Step 2.png`. URL `app.straitsx.com/transfer_out`.

### Purpose & layout
Landing screen of the withdrawal flow. Same skeleton as §2 but **three** step
cards.

### UI elements & verbatim copy
- Back link "← Return to Home"
- Page title: "Transfer Out - ⦿ XSGD" (XSGD mark inline)
- Card ① "Select Transfer Method": chips "Blockchain Transfer" / "Bank Transfer",
  neither selected.
- Card ② "Select Destination" — collapsed (header only).
- Card ③ "Set Withdrawal Amount" — collapsed (header only).
- Legal footer (§0).

### Flow logic
Choosing "Blockchain Transfer" → §8 screen; "Bank Transfer" → §9 screen.
Key structural difference vs Transfer In: an extra numbered step ("Select
Destination") and an amount-entry step, because the user is sending funds out.

### Mobile adaptation
Full-screen page; three `CardSteps` (1–3), method chips as `SelectionBox` pair.
Same title treatment (`PageTitle` + inline `AssetMark`).

---

## 8. Transfer Out — Step 3: Blockchain withdrawal (wallet + network + amount)

File: `Transfer Out - Step 3.png`.

### Purpose & layout
Withdraw XSGD to an external blockchain wallet. Left column: three step cards all
expanded. Right column: "Transfer Details" summary + "Proceed Transfer" CTA.
(Page scrolled slightly; back link at very top.)

### UI elements & verbatim copy
**Card ①** — "Blockchain Transfer" selected.

**Card ② Select Destination**
- Row header: field label "Blockchain Wallet" (left) + blue link "Add Wallet"
  (right-aligned).
- Wallet select (white, chevron ▾, two-line): MetaMask fox logo; line 1 bold
  "MetaMask"; line 2 grey address `0xd8129977699358235e7865327b575f736cc72e87`.
- Field label "Network" + select: ⟠ "Ethereum" (chevron ▾).

**Card ③ Set Withdrawal Amount**
- Amount input row (white bordered): leading XSGD mark + entered value "100";
  right inside input: link "Max"; attached right segment: XSGD mark + "XSGD"
  (fixed asset suffix, non-editable, divider between).
- Helper under input (small grey): "Balance: 0.00"

**Right column — "Transfer Details" card**
| Label | Value |
|---|---|
| Network | ⟠ **Ethereum** (bold) |
| Processing Time | 6 Confirmations |
| Transfer Amount | 0.00 XSGD |
| Network Fees ⓘ (info icon after label) | 0.00 XSGD |
| — divider — | |
| Net Amount | 0.00 XSGD |
- CTA below card: full-width pill "Proceed Transfer" — **disabled** state (grey
  `--surface-disabled` bg, muted text) because balance is 0.00 (< entered 100).

### Dummy data
Wallet "MetaMask" `0xd8129977699358235e7865327b575f736cc72e87`; network Ethereum;
entered amount 100 XSGD; balance 0.00; summary values all 0.00 XSGD (Transfer
Amount, Network Fees, Net Amount) — summary reflects a not-yet-valid amount;
processing 6 Confirmations.

### Flow logic
- "Add Wallet" opens a wallet-registration flow (not captured).
- Wallet + Network + valid amount (≤ balance) → summary populates and
  "Proceed Transfer" enables → (subsequent confirm/2FA screens not captured; on
  mobile a `Modal2FA` step is the natural continuation).
- "Max" fills the input with the full available balance.
- Differences vs Transfer In blockchain: user provides destination + amount, sees
  Network Fees & Net Amount math, CTA is "Proceed Transfer" (in-app execution)
  instead of "I've Transferred" (external acknowledgment); no QR/deposit address.

### Mobile adaptation
- Wallet picker → `FieldBlockchain` (`label="Blockchain Wallet"`,
  `addAction={label:"Add Wallet"}`, option rows with logo+name+address) opening
  `BottomSheetBlockchain` (list via `ListBlockchain`/`DropdownBlockchain`).
- Network picker → `FieldNetwork` + `BottomSheetNetwork`.
- Amount → `Input` with leading `AssetMark asset="XSGD" size={20}`, trailing
  `LinkButton` "Max" and fixed suffix "XSGD"; helper text "Balance: 0.00"
  (error tone when amount > balance).
- Summary → `CardSummary`:
  `items=[{label:"Network", value:"Ethereum"},{label:"Processing Time", value:"6 Confirmations"},{label:"Transfer Amount", value:"0.00 XSGD"},{label:"Network Fees", value:"0.00 XSGD", info:true}]`,
  `netAmount={label:"Net Amount", value:"0.00 XSGD"}` (netAmount renders after a
  divider), `button={label:"Proceed Transfer", disabled}`.
- Single column on mobile: cards 1→2→3 then summary; CTA sticky bottom.

### Visual notes
Two-line wallet select: name `--body-bold-medium`, address `--body-small` grey,
truncate middle on mobile (`0xd812…72e87`). Divider above "Net Amount" row is a
1px `--border` line. Disabled CTA: #f2f4f5 bg, #9d9e9f text.

---

## 9. Transfer Out — Step 4: Bank withdrawal (destination empty state)

File: `Transfer Out - Step 4.png`.

### Purpose & layout
Withdraw XSGD to a linked bank account (as SGD). Captured in its **pristine
state** — no account linked/selected yet. Left column only; **no Transfer Details
card is shown yet** (summary appears only after destination/amount progress).

### UI elements & verbatim copy
**Card ①** — "Bank Transfer" selected.

**Card ② Select Destination**
- Row header: label "Bank Account" (left) + blue link "Add Account" (right).
- Account select: white, chevron ▾, grey placeholder "Select Account".
- Label "Network" + select: **disabled** appearance (light-grey `--surface-disabled`
  bg), grey placeholder "Select Network", chevron ▾. (Network is gated on choosing
  an account first.)

**Card ③ Set Withdrawal Amount** — collapsed (header only).

Legal footer first line visible: "XSGD, XUSD and XIDR are issued by StraitsX."

### Dummy data
None (placeholders only). For the prototype, seed one linked account so the flow
can complete, e.g. a `ListBank` entry: name "TEWIBOWO", bank "DBS Bank Ltd",
account "123-456789-0", variant "verified" (invented seed — mark as such in UI
copy or keep placeholder state).

### Flow logic
- "Add Account" opens bank-account linking (not captured; on mobile use
  `BottomSheetBank` with `ListBank` rows + add form / `Upload` for proof).
- Selecting an account enables the Network select; then card ③ expands with the
  same amount input as §8; then a Transfer Details summary (SGD conversion + fees)
  appears with "Proceed Transfer".
- Differences vs blockchain branch (§8): destination = bank account not wallet;
  Network initially disabled; no wallet address anywhere.

### Mobile adaptation
- Account picker → `FieldBank` (`label="Bank Account"`,
  `placeholder="Select Account"`, `addAction={label:"Add Account"}`) opening
  `BottomSheetBank`; rows are `ListBank` (name/account/logo/variant
  verified|unverified|rejected).
- Network → `FieldNetwork` with `disabled` until account chosen.
- Card ③ → same amount input pattern as §8.
- Completion: reuse `CardSummary` + `Modal`/`Modal2FA` + success `Modal` per §5.

### Visual notes
Disabled select bg #f2f4f5 vs enabled white; placeholders #b6b6b6
(`--input-placeholder`). "Add Account"/"Add Wallet" links use the blue link color,
`--label-medium` weight.

---

## 10. Cross-cutting build notes

**Flow diagrams**
- Transfer In: Dashboard → (Transfer In) → Method select → [Blockchain: network →
  QR + address → "I've Transferred"] or [Bank: copy FAST details →
  "I've Transferred"] → "We are awaiting your funds" modal → Back to home.
- Transfer Out: Dashboard → (Transfer Out) → Method select → Select Destination
  (wallet+network | account+network) → Set Withdrawal Amount → "Proceed Transfer"
  (enabled when valid) → [confirm/2FA + success — NOT captured; extrapolate with
  `Modal2FA` + success `Modal`].

**Component inventory used** (all verified to exist in `src/components/`):
`AppTopNav`/`TopBar`, `PageTitle`, `AssetMark`, `CardSteps`, `SelectionBox`,
`FieldNetwork` + `BottomSheetNetwork` + `ListSupportedNetwork`,
`FieldBlockchain` + `BottomSheetBlockchain` + `ListBlockchain`,
`FieldBank` + `BottomSheetBank` + `ListBank`, `QR`, `Copybox`, `CardSummary`,
`ImportantNotes` (wraps `Alert`), `Button`, `LinkButton`, `IconButton`, `Input`,
`Toast`, `Modal` (+ `Modal2FA`), `BottomSheet`, `EstimatedBalance`, `ListAsset`/
`CardAsset`, `TransferPanel` (Transfer In/Out/Swap tabs — optional home entry),
`OtcBanner`, `Steps`/`BadgeSteps` (optional mobile progress header), `CardStatus`/
`StatusIcon` (optional full-page success variant), `Tag`/`Badge` ("NEW").

**Buttons — exact labels & variants**
| Label | Variant | Where |
|---|---|---|
| "I've Transferred" | primary (green pill, enabled) | TI blockchain & bank summary |
| "Proceed Transfer" | primary, disabled until valid | TO summary |
| "Back to home" | primary, modal footer | success modal |
| "Swap" | primary, disabled | dashboard swap card |
| "Max" | text link inside input | swap + withdrawal amount |
| "Add Wallet" / "Add Account" | text link (field header) | TO destination |
| "Whitelist my address", "selected Singapore banks", "Contact Support", "Learn More", "Return to Home" | inline text links | various |
| "Blockchain Transfer" / "Bank Transfer" | selection chips (not buttons) | method step |
| "Buy Stablecoin" / "Sell Stablecoin" | segmented toggle | dashboard |

**Tokens / visual system**: primary #00d37e; text #002b2a / #505454; link #187d97;
borders #d8d8d8; page bg #f6f7f9; positive-surface note #f0f9f4 with #257c58
accents; XSGD mark #0e3fc7, XUSD #257c58; radii 8 (inputs) / 12 (cards) / full
(buttons); type = Red Hat Display (titles/labels) + Hanken Grotesk (body).
Number formatting: 2-dp balances, comma thousands ("200,000"), "≈" fiat approx,
verbatim strings for fees ("Free"), times ("Instant", "6 Confirmations"), and
account/address formats ("3225-6257-7650-1", full 0x-hex addresses).
