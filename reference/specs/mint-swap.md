# Mint Setup / Mint / Swap — Mobile PWA Build Spec

Source of truth for rebuilding three StraitsX web-dashboard flows as a mobile PWA using the
StraitsX design system (`src/components`, tokens in `src/styles/tokens.css`).
Derived from 6 screenshots in `reference/screenshots/{Mint Setup, Mint, Swap}/`.
The builder will NOT see the screenshots — every visible string and value is transcribed here verbatim.

Shared web chrome on every screen (replaced on mobile — see §Mobile adaptation per screen):

- Left sidebar: StraitsX logo + "Personal Account" wordmark; nav items **Home**, **Mint**,
  **Transaction History**, **Support** (each with a leading icon). Active item = mint-green pill
  background with green text (seen on "Mint" in the Mint flow, "Home" in the Swap flow).
- Top-right header: notification bell icon-button, avatar icon, username text "TEWIBOWO".
- Floating circular dark-teal chat bubble (Intercom-style) bottom-right — omit in the PWA or keep as a Support FAB.

---

## 1. Mint Setup — Step 1 (`app.straitsx.com/mint/setup`)

### Purpose & layout
One-time configuration screen: the user picks the blockchain network and a verified blockchain
address that minted XSGD will be sent to. Until this is saved (and 2FA-verified, see Step 2), the
Mint page's instructions are not available. Web layout: breadcrumb + page title above a two-column
body — left = setup form card, right = marketing/explainer aside card.

### UI elements (copy verbatim)
- Breadcrumb: `Home / Mint / Setup` ("Home" and "Mint" are links, "Setup" current). Page title (h1): **"Setup"**.
- **Left card — setup form**
  - Card heading: **"Setup your Mint"**
  - Sub-copy: "Choose your blockchain address to set up your Mint."
  - Horizontal divider.
  - Field label: **"Choose a blockchain network"**
    - Select control (48px, rounded, chevron-down at right) with leading Ethereum glyph icon and value **"Ethereum"**.
  - Field label: **"Choose a blockchain address"**
    - Sub-label (grey, smaller): "Personal Address - Non-Custodial"
    - Selection row (selected state: dark 2px border, filled green radio dot at left):
      - Wallet name: **"MetaMask"**
      - Address (mono): `0xd8129977699358235e7865327b575f736cc72e87`
      - Badge below address: **"Verified"** (green outline tag, mint tint)
      - Trailing: MetaMask fox logo (~36px).
  - Full-width pill outline button: **"+ Link Blockchain Address"** (plus icon + label, secondary/outline style).
  - Divider, then footer row with right-aligned primary button: **"Save"** (vibrant-green pill).
- **Right aside card — "How your Mint works"**
  - Heading: **"How your Mint works"** with a large XSGD coin mark (blue circle, "XSGD" white wordmark) top-right.
  - Body: "Set up your Mint to mint XSGD directly from your bank account to your blockchain address, and streamline your access to digital assets."
  - Link (blue, underlined): **"Learn more about Mint"**
  - Light-mint (pale green) panel containing 3 icon + text items:
    1. Small circular icon (bank ↻ $ cycle). Bold title: **"Mint XSGD directly to your blockchain address"** — body: "Straight from your bank account to your blockchain address in as quickly as 50 mins."
    2. Small circular icon (coin stamped "LOW FEES"). Bold title: **"Mint with low fees"** — body: "Mint XSGD with low fees." Link (blue, underlined): **"Learn more about Mint fee structure"**
    3. Small circular icon (two coins labelled "1 SGD" / "1 XSGD"). Bold title: **"Mint 1:1 from SGD"** — body: "The amount of SGD transferred in will be minted 1:1 to XSGD."

### Dummy data
- Network: `Ethereum`
- Wallet: `MetaMask`, address `0xd8129977699358235e7865327b575f736cc72e87`, status `Verified`
- Username (header): `TEWIBOWO`

### Flow logic
- Tapping **Save** opens the 2-Factor Authentication modal (→ Mint Setup Step 2).
- "+ Link Blockchain Address" would branch to the Add New Blockchain flow (out of scope here).
- Only one address is selectable (radio semantics); Save is the single commit action.

### Mobile adaptation
- Full-screen page (route `/mint/setup`). Stack vertically: PageTitle → form → sticky bottom "Save" button. Move the "How your Mint works" aside below the form as a collapsible Card, or cut it to the 3-item list.
- Component mapping:
  - `PageTitle` + `Breadcrumb` (or just a back-arrow top bar via `TopBar`) for the header.
  - `FieldNetwork` / `DropdownNetwork` for "Choose a blockchain network" (Ethereum option with `AssetMark asset="ETH"`).
  - `SelectionBox` (type="radio", selected, with description) or `FieldBlockchain`/`ListBlockchain` (variant `verifiedPrivateWallet`) for the MetaMask address row; `Tag`/`Badge` for "Verified"; `AssetMark asset="METAMASK"` as the trailing logo.
  - `Button variant="secondary"` full-width for "+ Link Blockchain Address"; `Button variant="primary" size="lg"` full-width for "Save".
  - Aside: `Card` with an `AssetMark asset="XSGD" size={48}`; list items as icon+text rows; `LinkButton` for the two links.

### Visual notes
- Save button: `--primary` (#00d37e) pill, dark text. Selected address row border: dark ivy (`--text-primary`).
- "Verified" badge: mint background, green text/border. Links: `--link` (#187d97), underlined.
- Address rendered in mono (`--font-mono` / `.num` tabular).
- XSGD coin mark is brand blue `--brand-xsgd` (#0e3fc7).

---

## 2. Mint Setup — Step 2 (2FA modal)

### Purpose & layout
Security gate on saving the Mint configuration. Same page as Step 1 dimmed under a scrim; centered modal (~400px).

### UI elements (copy verbatim)
- Modal header: lock icon inside a mint-tint circle + title **"2-Factor Authentication"**; close "×" top-right; divider under header.
- Body copy: "Input the 6-digit code in your Google Authenticator app."
- Field label: **"Authentication Code"**
- Text input, placeholder: **"Enter authentication code"** (single input, not segmented, green focus border).
- Helper: "Can't access Google Authenticator?" followed by link (blue, underlined): **"Contact Customer Support"**
- Footer buttons (right-aligned pair): outline pill **"Cancel"**, primary green pill **"Verify"**.

### Dummy data
- None entered; input empty. Accept any 6-digit code in the prototype (e.g. `000000`).

### Flow logic
- Save (Step 1) → this modal. **Verify** (with 6 digits) completes Mint setup → navigate to `/mint` (Mint Step 1). **Cancel**/"×" dismisses back to Setup.
- This is the gate: the Mint page's transfer instructions only exist after a 2FA-verified setup.

### Mobile adaptation
- Use `Modal2FA` (composes `Modal`); override copy: `instruction="Input the 6-digit code in your Google Authenticator app."`, `troubleText="Can't access Google Authenticator?"` with the trouble link labelled "Contact Customer Support". Modal2FA renders a segmented 6-digit input — acceptable upgrade over the web's single input; keep `cancelLabel="Cancel"`, `verifyLabel="Verify"`.
- On mobile prefer presenting it as a `BottomSheet` if Modal feels cramped; either is fine for the prototype.

### Visual notes
- Lock glyph: green on pale-mint circle. Verify = `Button variant="primary"`; Cancel = outline/secondary.

---

## 3. Mint — Step 1 (`app.straitsx.com/mint`, top of page)

### Purpose & layout
Post-setup Mint dashboard: shows the configured destination blockchain address and bank-transfer
instructions for minting XSGD 1:1 from SGD (mint happens by making a FAST bank transfer — there is
no in-app amount entry). Layout: breadcrumb + title, then a single centered column of cards.
Sidebar "Mint" item is active (mint pill).

### UI elements (copy verbatim)
- Breadcrumb: `Home / Mint`. Page title (h1): **"Mint"**.
- **Header card**
  - XSGD coin mark (blue circle) + card title **"Mint"**; top-right outline pill button **"Edit Settings"**.
  - Info alert (pale blue background, blue ⓘ icon): "You can transfer from any bank account under the same name as the owner of this StraitsX account. We currently only support this **list of Singapore banks**." — "list of Singapore banks" is a blue underlined link.
  - Section label: **"Blockchain Address"**
  - Bordered read-only box: small grey label **"MetaMask"**, below it Ethereum glyph + address (mono) `0xd8129977699358235e7865327b575f736cc72e87`; trailing circular mint icon-button (wallet icon).
- Standalone bold line between cards: **"Follow the bank transfer instructions below to start minting:"**
- **Step card 1**: dark pill badge **"Step 1"** + text "Login to your banking portal and initiate a **FAST Transfer** only." ("FAST Transfer" bold)
- **Step card 2**: dark pill badge **"Step 2"** + text "Send funds only from the designated bank account **in your name.**" ("in your name." bold)

### Dummy data
- Wallet `MetaMask` on Ethereum, address `0xd8129977699358235e7865327b575f736cc72e87`.

### Flow logic
- Reached after Mint Setup completes (or via sidebar "Mint" once configured). "Edit Settings" returns to `/mint/setup`.
- Step 1 → Step 2 of the screenshots is just **scrolling down** the same page (Step 3 card + notes below the fold).

### Mobile adaptation
- Full-screen page (route `/mint`). Single column, scrollable.
- Component mapping:
  - `PageTitle`/`TopBar`; header card = `Card` with `AssetMark asset="XSGD"`, `Button variant="secondary" size="sm"` "Edit Settings".
  - `Alert tone="info"` for the Singapore-banks notice (embed `LinkButton`).
  - Blockchain address box = `Copybox` (`logo` = ETH `AssetMark`, `label`="Blockchain Address", `truncate` on narrow widths) or `CardAttribute`.
  - Steps = `CardSteps` (step number badge + title/content) — one per card, steps 1–3.

### Visual notes
- Step badges: dark deep-ivy pill, white "Step N" text. Cards: white, soft shadow, ~16px radius.
- Address in mono. Active sidebar state = mint tint + green label (maps to a bottom-nav active state on mobile).

---

## 4. Mint — Step 2 (same page, scrolled: Step 3 card + notes)

### Purpose & layout
Continuation of `/mint`: the actual transfer details (recipient bank + personal virtual account
number) and limits/notes. Same single column.

### UI elements (copy verbatim)
- **Step card 3**: dark pill badge **"Step 3"** + text "Make a FAST Transfer using the following information"
  - Warning alert (pale amber background, orange ⚠ icon): "We have changed our recipient bank to **Xfers Pte Ltd.** Please make sure you transfer to the correct bank account." ("Xfers Pte Ltd." bold)
  - Field label **"Recipient Bank"** → read-only grey field: **"XFERS PTE LTD"** (no copy button)
  - Field label **"Recipient Bank Account Number"** → read-only grey field: **"3225-5974-1423-2"** with trailing copy icon-button
    - Helper text below: "This is a virtual account number (VAN) assigned specifically to you. Please ensure that the account number input in your ibanking page is accurate."
  - Field label **"Recipient Name"** → read-only grey field: **"TEWIBOWO"** with trailing copy icon-button
- **Important Notes panel** (pale-mint background, thick green left border), bold title **"Important Notes:"**, numbered list:
  1. "Minimum transfer amount is **10 XSGD** and a network fee capped at **30 XSGD** will be charged."
  2. "The maximum transaction amount is **200,000 XSGD**. Transfers above this will be refunded."
  3. "We do not support GIRO / SWIFT Transfers."
- Footer legal text (small grey):
  - "XSGD, XUSD and XIDR are issued by StraitsX."
  - "“STRAITSX”, “XSGD” and “XIDR” and all other URLs, logos and trademarks related to the StraitsX Services are either trademarks or registered trademarks of StraitsX or its licensors. StraitsX is the trading name of the StraitsX Group of Companies and its affiliated entities." (third line truncated in screenshot)

### Dummy data
- Recipient Bank: `XFERS PTE LTD`
- Recipient Bank Account Number (VAN): `3225-5974-1423-2`
- Recipient Name: `TEWIBOWO`
- Limits: min `10 XSGD`, network fee cap `30 XSGD`, max `200,000 XSGD`

### Flow logic
- Terminal screen of the Mint flow — the user leaves the app to make a FAST bank transfer; minted
  XSGD later appears at the configured address. Copy buttons copy VAN / recipient name.

### Mobile adaptation
- Same `/mint` page, below the fold. Mapping:
  - `CardSteps step={3}` wrapping: `Alert tone="warning"`; `Copybox` ×3 — Recipient Bank with `action={false}` (display-only), Account Number and Recipient Name with `buttonVariant="icon"` and `helper` on the VAN field.
  - Notes = `ImportantNotes` (title "Important Notes:") with an `<ol>`.
- Copy actions should show a `Toast` ("Copied") in the prototype.

### Visual notes
- Read-only fields: light-grey fill (`--brand-modern-light-grey`), no border, dark text; VAN in mono/tabular.
- Warning alert amber tint; Important Notes uses mint tint + `--primary` left rule.

---

## 5. Swap — Step 1 (`app.straitsx.com` home dashboard)

### Purpose & layout
Home dashboard where swapping between held assets happens in a right-rail Swap panel.
Left/main column: Estimated Balance + quick actions + "My Assets" list. Right column: Swap card,
then an OTC promo card. Sidebar "Home" active.

### UI elements (copy verbatim)
- **Estimated Balance block**: label **"Estimated Balance"** + ⓘ info icon; amount **"30.58"** (large) + **"SGD"** (smaller suffix).
- **Quick actions** (top right of content): green filled circle "+" icon labelled **"Transfer In"**; green filled circle "↗" icon labelled **"Transfer Out"**; grey rounded-square icon labelled **"History"**.
- **My Assets card**: title **"My Assets"** + refresh icon-button. Four rows, each with: coin mark, symbol (bold) + subtitle, balance (bold) with "≈ x SGD" fiat line, a cluster of small network icons (some overflow "+5", some carry a tiny "NEW" ribbon), and two trailing circular outline icon-buttons: "+" (deposit/add) and "↗" (send).
  1. **XSGD** (blue coin) / subtitle "XSGD" — balance **0.00** / "≈ 0.00 SGD" — networks cluster with **"+5"** overflow.
  2. **XUSD** (dark-green coin) / subtitle "XUSD" — **0.00** / "≈ 0.00 SGD" — 3 network icons (one "NEW").
  3. **USDT** (teal Tether coin) — **23.77** / "≈ 30.58 SGD" — 3 network icons (one "NEW").
  4. **USDC** (blue "$" coin) — **0.00** / "≈ 0.00 SGD" — 1 network icon.
- **Start your journey section** (below assets): heading **"Start your journey with StraitsX"** with a segmented toggle: **"Buy Stablecoin"** (selected, white) | **"Sell Stablecoin"** (rest of section cut off in screenshot).
- **Swap card** (right column):
  - Title **"Swap"**.
  - Row: label **"From"** (left) / **"Balance: 0.00 XSGD"** (right).
  - From input group: rounded field with leading XSGD coin mark + amount placeholder **"0.00"** + trailing **"Max"** link (green/teal); adjoined asset selector button: XSGD coin mark + **"XSGD"** + chevron-down.
  - Rate row: grey pill chip **"1 XSGD ≈ 0.7717 XUSD"**; trailing circular outline icon-button with vertical swap arrows (reverse direction toggle).
  - Row: label **"To"** / **"Balance: 0.00 XUSD"**.
  - To input group: leading XUSD coin mark + placeholder **"0.00"**; asset selector: XUSD mark + **"XUSD"** + chevron-down.
  - Full-width disabled pill button **"Swap"** (grey fill, grey text — disabled because amount is 0).
  - Footnote (centered, grey): **"No Fees • Rate refreshes every minute."**
- **OTC promo card** (dark green, below Swap): title **"StraitsX OTC Desk"**, body "We offer deep liquidity to institutions and high net-worth individuals." + a further line starting "Starting from 100,000 USD" (cut off at screenshot edge).

### Dummy data
- Estimated Balance: `30.58 SGD`
- Assets: XSGD `0.00` (≈ 0.00 SGD), XUSD `0.00` (≈ 0.00 SGD), USDT `23.77` (≈ 30.58 SGD), USDC `0.00` (≈ 0.00 SGD)
- Default swap pair: From `XSGD` (Balance: 0.00 XSGD) → To `XUSD` (Balance: 0.00 XUSD)
- Rate: `1 XSGD ≈ 0.7717 XUSD`
- OTC threshold: `100,000 USD`
- Assets/currencies that appear anywhere on this screen: **XSGD, XUSD, USDT, USDC, SGD** (fiat approximations), **XUSD/XSGD** in the rate chip. (XIDR appears only in Mint legal text; SGD/USD as fiat references.)

### Flow logic
- User selects From asset via the asset selector (e.g. switches XSGD → USDT), enters an amount (or taps "Max"); the To amount auto-computes from the live rate; "Swap" enables and becomes **"Preview Swap"** state; tapping it opens the Confirmation modal (→ Step 2).
- Reverse icon swaps From/To legs. Rate chip updates per pair; rate re-quotes every minute.

### Mobile adaptation
- Home = full-screen page: `EstimatedBalance` at top; quick actions as an icon-button row; `CardAsset` for "My Assets" (rows with `logo`=`AssetMark`, `networks`, `onAdd`/`onSend`); `OtcBanner` for the OTC card.
- Swap itself: either the "Swap" tab of `TransferPanel` (tabs Transfer In / Transfer Out / Swap) or a dedicated full-screen `/swap` page. Use **`CardSwap`** directly:
  `from={{ amount:"", currency:"XSGD", balance:"0.00 XSGD" }} to={{ currency:"XUSD", balance:"0.00 XUSD" }} rate="1 XSGD ≈ 0.7717 XUSD" footnote="No Fees • Rate refreshes every minute." buttonLabel="Swap"` (disabled until amount > 0; label becomes "Preview Swap" when valid).
- Asset selector tap → `BottomSheet` containing `ModalAssetSelection`-style list or `DropdownAsset` rows (options: XSGD, XUSD, USDT, USDC with `balance` values above; use `AssetMark` logos).
- Amount entry: `Input` with mono styling, `Max` as trailing `LinkButton`.

### Visual notes
- Coin marks: XSGD `--brand-xsgd` #0e3fc7; XUSD `--brand-xusd` #257c58; USDT #26A17B; USDC #2775CA (all in `AssetMark`).
- All numeric values (balances, amounts, rates) use tabular/mono figures (`.num`, `--font-mono` "Red Hat Mono").
- Quick-action circles: `--primary` #00d37e fill with dark glyphs. Disabled Swap button: grey fill/text.
- Rate chip: light-grey pill, small text.

---

## 6. Swap — Step 2 (Confirmation modal)

### Purpose & layout
Pre-execution review of the swap quote. Dashboard dimmed under a scrim; centered modal (~380px).
Behind the modal the Swap card now reads: From **10** USDT (asset selector **USDT**, "Balance: 23.77 USDT"),
rate chip **"1 USDT ≈ 1.2908 XSGD"**, To **12.9** XSGD ("Balance: 0.00 XSGD"), and the CTA is an enabled
dark-green **"Preview Swap"** button.

### UI elements (copy verbatim)
- Modal header: title **"Confirmation"**; close "×"; divider.
- Body copy: "Please confirm if the following information is correct before proceeding."
- Summary rows (label left / value right, values bold):
  - **"You will spend"** — **"10.0 USDT"**
  - **"Swap fee"** — **"No fee"**
  - **"Conversion rate"** — **"1 USDT ≈ 1.2908 XSGD"**
    - Below the rate, right-aligned grey chip: **"Refreshed in 00:58"** (the `00:58` countdown rendered in green/teal mono, ticking down from 01:00)
  - **"You will be getting"** — **"12.9 XSGD"**
- Footer (grey band): outline pill **"Cancel"** + primary green pill **"Swap Now"**.

### Dummy data
- Spend: `10.0 USDT`; fee: `No fee`; rate: `1 USDT ≈ 1.2908 XSGD`; receive: `12.9 XSGD`; countdown: `00:58`.
- Underlying balances: `23.77 USDT` (from), `0.00 XSGD` (to).

### Flow logic
- "Preview Swap" (Step 1) → this modal. **"Swap Now"** executes the swap → success (recommend a success `Toast`/`CardStatus` state and updated balances: USDT 13.77, XSGD 12.90 — success screen not captured in screenshots, prototype may invent a simple confirmation). **Cancel**/"×" returns to the editable Swap card.
- If the 60s countdown reaches 00:00, re-quote the rate (refresh chip and recompute "You will be getting").

### Mobile adaptation
- Present as a `BottomSheet` (preferred on mobile) or `Modal`: title "Confirmation", body = `CardSummary`-style label/value rows, countdown chip via `Tag`/`Badge`, footer = full-width `Button variant="primary"` "Swap Now" above `Button variant="secondary"`/`tertiary` "Cancel" (stacked).
- Countdown: simple `setInterval` from 60s; on 0, refresh the fake rate.

### Visual notes
- Values right-aligned, bold, mono/tabular figures. Countdown numerals in green (`--primary`/teal).
- "Swap Now" = vibrant-green primary pill; "Preview Swap" behind the modal renders dark green (deep-ivy/teal — treat as the primary button's pressed/active styling; on mobile just use `Button variant="primary"`).

---

## Cross-flow notes for the builder

- **Gating**: Mint Setup (network + verified address + 2FA "Verify") must be completed before `/mint`
  shows instructions; in the prototype, keep a `mintConfigured` flag — if false, route Mint nav to `/mint/setup`.
- **Swap availability** is independent of Mint; it operates on wallet balances shown in My Assets.
- **Buttons observed**: primary = "Save", "Verify", "Swap Now", "Swap/Preview Swap"; secondary/outline = "Cancel", "Edit Settings", "+ Link Blockchain Address". Design-system `Button` variants available: `primary`, `secondary`, `tertiary`; sizes `lg` (48px) / `sm` (36px).
- **Typography**: headings Red Hat Display, body Hanken Grotesk, numerals/addresses `--font-mono`
  (Red Hat Mono) or `.num` tabular-nums.
- **Key colors**: primary green #00d37e; deep ivy text #002b2a; secure teal #054948; link blue #187d97;
  XSGD #0e3fc7; XUSD #257c58; XIDR #df1312; USDT #26A17B; USDC #2775CA; light grey fill #f0f0f0.
- **Component inventory to use** (all in `src/components`): AppTopNav/TopBar, Breadcrumb, PageTitle,
  Card, CardSwap, CardAsset, CardSteps, CardSummary, EstimatedBalance, TransferPanel, AssetMark,
  DropdownAsset, ModalAssetSelection, BottomSheet, Modal, Modal2FA, Alert, ImportantNotes, Copybox,
  SelectionBox, FieldNetwork/DropdownNetwork, FieldBlockchain/ListBlockchain, Input, Button,
  IconButton, LinkButton, Tag, Badge, Toast, OtcBanner.
