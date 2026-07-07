# Spec: My Account / Bank Accounts / Verify Bank Account — Mobile PWA rebuild

Source: 9 screenshots of the StraitsX web dashboard (`app.straitsx.com/manage_account`) in
`reference/screenshots/{My Account, Add New Bank Accounts, Verify Bank Accounts}/`.
Target: mobile PWA prototype rebuilt with the StraitsX design system
(components: `src/components/*`, tokens: `src/styles/tokens.css`).
This document is the single source of truth — the builder will not see the screenshots.

> NOTE ON OVERLAP: "My Account — Step 1" and "Add New Bank Accounts — Step 1" are the
> **identical** screenshot (Bank Accounts tab). Both flows and the verify flow all live on the
> same `/manage_account` page; the add/verify flows are modals stacked on top of it.

---

## 0. Shared page chrome (desktop original — appears in every screenshot)

- **Left sidebar** (white, full height): StraitsX logo (green infinity mark + wordmark) with
  subtitle "Personal Account" beneath it. Nav items (icon + label, dark ivy text):
  - "Home" (house icon)
  - "Mint" (card icon)
  - "Transaction History" (document/list icon)
  - "Support" (headset icon)
- **Top-right header**: notification bell icon in light-grey circle, avatar (person icon in
  grey circle), username "TEWIBOWO" (all-caps, bold).
- **Breadcrumb**: "Home / My Account" — "Home" is an underlined link, "My Account" is current.
- **Page title (H1)**: "My Account" (dark ivy, bold, ~28px).
- **Left profile panel** (white card, fixed on every tab): see §1.
- **Footer legal text** (small grey, bottom of page):
  - "XSGD, XUSD and XIDR are issued by StraitsX."
  - "“STRAITSX”, “XSGD” and “XIDR” and all other URLs, logos and trademarks related to the StraitsX Services are either trademarks or registered trademarks of StraitsX or its licensors."
  - "StraitsX is the trading name of the StraitsX Group of Companies and its affiliated entities."
  - "Important Risk Warnings Regarding Digital Payment Tokens: Learn More" ("Learn More" = blue/green underlined link)
- **Floating chat button**: dark-teal circular FAB with chat-bubble icon, bottom-right corner.

**Mobile adaptation of chrome**
- Replace sidebar + header with `AppTopNav` (`platform="mobile"`, `account="personal"`,
  `user={{ name: "TEWIBOWO" }}`, `notifications` bell). Hamburger menu holds Home / Mint /
  Transaction History / Support.
- `PageTitle` with `breadcrumb={<Breadcrumb items={[Home, My Account]} />}` — on mobile the
  breadcrumb can collapse to a back arrow + "My Account".
- Profile panel, tab content stack vertically (single column). Footer legal text optional on
  mobile; keep chat FAB out of the prototype.

---

## 1. Profile panel (left card — identical on all My Account tabs)

**Purpose**: read-only summary of the account holder's profile.

**Elements (top → bottom, exact copy)**
1. StraitsX logo (green mark + "StraitsX" wordmark), centered — placeholder for a profile
   photo/company logo.
2. Field label "Email" (bold) → value `tewi@fazzfinancial.com`
3. Field label "Phone Number" (bold) → value `+62 811173050`
4. Field label "Status" (bold) → Tag "Verified" (green outline, green text, white bg, rounded)
5. Thin divider line.
6. Info row: small green filled info icon (ⓘ) + text:
   "If you'd like to change your profile information, please contact Customer Support."
   — "Customer Support." is an underlined blue link.

**Mobile mapping**
- `CardAttribute` with `title` omitted or "Profile", `attributes=[{label:"Email", value:"tewi@fazzfinancial.com"}, {label:"Phone Number", value:"+62 811173050"}]` and `status={ label: "Verified", tone: "positive" }`, plus a footer note row.
- Or a plain `Card` + `Tag tone="positive" appearance="outlined"` for "Verified" and
  `LinkButton` for "Customer Support.".
- Logo: `Logo` component.

---

## 2. My Account — Step 1: Bank Accounts tab

*(same screen as Add New Bank Accounts — Step 1)*

**Purpose & layout**: default tab of My Account. Right panel shows a tab bar, a section
header with an action button, and a 2-column grid of bank-account cards.

**Tabs** (underline style; active = dark-green text + dark-green underline; inactive = grey):
- "Bank Accounts" (ACTIVE)
- "Blockchain Addresses"
- "Security Settings"

**Section header**
- H2 "Bank Accounts" (bold, dark ivy)
- Right-aligned button: "Add New" — white pill, thin dark outline (secondary/outlined, ~36px).

**Bank account card 1 (verified)** — white card, 1px light-grey border, rounded ~8px:
- Top row: dark bank glyph (classical bank/columns icon, ~24px) top-left; top-right two
  circular outlined icon buttons: pencil (edit) and trash (delete).
- Bottom row: bank name "Bank Mandiri" (bold) with account number "1220015006821" beneath
  (regular, dark). Right-aligned Tag: "Verified" — green text, green 1px outline, white bg.

**Bank account card 2 (unverified)** — same card shell:
- Top row: bank glyph left; right side, in order: green pill primary button "Verify Now"
  (white text on vibrant green, ~36px), pencil icon button, trash icon button.
- Bottom row: "CIMB Niaga" (bold) / account number "707140118140". Right-aligned Tag:
  "Unverified" — grey text, grey outline, very light grey bg (neutral).

**Dummy data**
| Bank | Account number | Status tag | Actions |
|---|---|---|---|
| Bank Mandiri | 1220015006821 | Verified (green) | edit, delete |
| CIMB Niaga | 707140118140 | Unverified (neutral grey) | Verify Now, edit, delete |

Account numbers are displayed **in full, unmasked**.

**Flow logic**
- Tap "Add New" → Add Bank Account modal (flow §5).
- Tap "Verify Now" on CIMB Niaga → Verify Bank Account modal (flow §6).
- Tabs switch panel content in place (no navigation).

**Mobile adaptation**
- Full-screen page. `Tabs` (`variant="default"`, `fill`) with the 3 items; consider horizontal
  scroll for tab labels.
- Bank cards become stacked `ListBank` rows, one per bank, full width:
  - `ListBank name="Bank Mandiri" account="1220015006821" variant="verified"`
  - `ListBank name="CIMB Niaga" account="707140118140" variant="unverified" actionLabel="Verify Now" onAction={openVerify}`
  - `logo` prop: bank glyph via `Icon name="account_balance"` (no real bank logos in the
    screenshots — a generic dark bank icon is used for both).
  - Edit/delete: `IconButton icon="edit"` / `IconButton icon="delete"` (`variant="ghost"`,
    `shape="circle"`) — if `ListBank` doesn't slot them, wrap in a `Card` row.
- Status tags: `Tag tone="positive" appearance="outlined"` (Verified),
  `Tag tone="neutral" appearance="outlined"` (Unverified).
- "Add New": `Button variant="secondary" size="sm"` in the section header (or a full-width
  primary button under the list on mobile).

**Visual notes**
- Active tab underline + text: dark green/ivy (`--interactive-active` / `--text-primary`).
- "Verify Now" / primary buttons: vibrant green `--primary` (#00d37e) with dark text in the
  DS (screenshot shows white text; use DS token behavior).
- Card borders: `--border` (#d8d8d8); page background `--background` (#f6f7f9); cards `--surface`.

---

## 3. My Account — Step 2: Blockchain Addresses tab

**Purpose & layout**: lists linked blockchain addresses as full-width cards with verify
state, network list and copyable address.

**Header area**
- Tabs: "Bank Accounts" | "Blockchain Addresses" (ACTIVE) | "Security Settings"
- H2 "My Addresses" + right-aligned "Add New" outlined pill button.
- Info line: green info icon ⓘ + "Learn more about different types of addresses and how to
  verify an address." — "different types of addresses" and "verify an address." are
  underlined green/blue links.

**Address card 1 — Solana (not verified)**
- Header row: round dark Solana wallet logo (~40px circle), title "Solana" (bold),
  subtitle "Personal Address (Non-Custodial)" (grey). Right side: green pill primary button
  "Verify Now" + circular outlined trash icon button.
- Label "Network" (bold), then row: small round Solana network logo (purple gradient) +
  text "Solana". Right-aligned tag: "Not Verified" — grey text on light-grey filled
  rectangle (neutral, filled/surface appearance, 2 lines "Not / Verified" when narrow).
- Address box (full-width, light-grey fill, rounded): value
  `DnjNRLdEQxCbSrkz8FpApvrVHGYDFZddMPfP5JjoqPoY` + copy icon button (square outlined) at right.

**Address card 2 — MetaMask (verified)**
- Header row: MetaMask fox logo, title "MetaMask" (bold), subtitle
  "MetaMask - Personal Address (Non-Custodial)". Right side: circular outlined icon button
  with "unlink" (link-off) icon.
- Label "Network", then a cluster of 6 overlapping network logos (Ethereum, Polygon,
  Avalanche, Arbitrum, BNB, Base) + text
  "Ethereum, Polygon, Avalanche C-Chain, Arbitrum, BNB Smart Chain, Base".
  Right-aligned Tag: "Verified" (green outline).
- Address box: `0xd8129977699358235e7865327b575f736cc72e87` + copy icon button.

**Pagination** (bottom-right): left chevron (disabled), page "1" in a bordered box, right
chevron.

**Dummy data**
- Solana address: `DnjNRLdEQxCbSrkz8FpApvrVHGYDFZddMPfP5JjoqPoY` — status Not Verified.
- MetaMask address: `0xd8129977699358235e7865327b575f736cc72e87` — status Verified;
  networks: Ethereum, Polygon, Avalanche C-Chain, Arbitrum, BNB Smart Chain, Base.

**Flow logic**: "Add New" would start an add-address flow (not captured). "Verify Now" would
start address verification (not captured). Not required for the bank flows; include as static.

**Mobile adaptation**
- Stacked full-width cards. Map each card to `Card` containing:
  - header: logo + title/subtitle + `Button variant="primary" size="sm"` ("Verify Now") or
    `IconButton icon="link_off"`.
  - network row: `ListBlockchain`/`ListSupportedNetwork` patterns or plain row + `Tag`
    ("Not Verified" → `tone="neutral"`; "Verified" → `tone="positive" appearance="outlined"`).
  - address: `Copybox value="DnjNRLd…" truncate buttonVariant="icon"` (truncation needed on
    mobile widths).
- `Pagination` component at list end.

---

## 4. My Account — Step 3: Security Settings tab

**Purpose & layout**: three stacked settings cards, each = title row / divider /
description / divider / action button.

**Tabs**: "Bank Accounts" | "Blockchain Addresses" | "Security Settings" (ACTIVE)

**Card 1 — Password Settings**
- Title: "Password Settings"
- Body: "Maintain account security by controlling and updating your password."
- Button: "Manage Password" — green filled pill (primary).

**Card 2 — 2FA Settings**
- Title row: "2FA Settings" left; right-aligned green outlined tag with check icon:
  "✓ 2FA Is Enabled" (exact label: "2FA Is Enabled").
- Body: "Enhance security with Two-Factor Authentication (2FA). Quick, easy, and an extra
  layer of protection for your account."
- Button: "Set Up 2FA" — green filled pill (primary).

**Card 3 — Kill Switch**
- Title: "Kill Switch"
- Body: "If you suspect your account has been compromised, you can activate Kill Switch to
  lock your account."
- Button: "Activate Kill Switch" — **red filled pill** (critical/destructive; white text,
  red #df1312-ish background).

**Flow logic**: buttons open flows not captured (password modal, 2FA setup = `Modal2FA`
exists in DS, kill-switch confirm). Render as static actions in the prototype.

**Mobile adaptation**
- Stacked `Card`s (or `CardAttribute` with `actions`). Buttons full-width
  `Button variant="primary"`; Kill Switch needs a critical button — **the DS `Button` has
  only `primary | secondary | tertiary` variants**, so add a className that overrides
  background to `var(--status-critical)` and color `var(--text-inverse)`.
- "2FA Is Enabled" → `Tag tone="positive" appearance="outlined" icon="check"`.

---

## 5. Add New Bank Accounts flow

### Step 1 — Entry point
Identical to §2 (Bank Accounts tab). Trigger: "Add New" button, top-right of the
"Bank Accounts" section header.

### Step 2 — Currency selection modal
**Layout**: small centered modal (~400px) over a dark scrim; page dimmed behind.

**Elements**
- Modal title: "Add Bank Account" (dark green, bold, left-aligned) + X close icon (top-right).
- Thin divider under the header.
- Select field (full width, outlined, rounded, chevron-down at right) with current value:
  "Singapore Dollar (SGD)". No visible label. (Other options not shown in screenshots —
  StraitsX supports SGD/IDR/USD; prototype may stub
  `["Singapore Dollar (SGD)", "Indonesian Rupiah (IDR)", "US Dollar (USD)"]`, only SGD is
  confirmed by the screenshot.)
- Footer strip (light-grey background band): two equal pill buttons side by side:
  - "Close" — white bg, thin dark outline (secondary)
  - "Next" — vibrant-green filled (primary), enabled (a value is pre-selected).

**Flow logic**: "Next" → Step 3 form (fields depend on selected currency; captured form is
the SGD/international variant). "Close" or X → dismiss back to Bank Accounts tab.

### Step 3 — Bank account information form
**Layout**: same modal grown taller (scrollable content), same title bar.

**Elements (top → bottom, exact copy)**
1. Modal title "Add Bank Account" + X.
2. Section heading: "Bank Account Information" (bold).
3. Warning alert (light-yellow bg, 1px orange/yellow border, rounded, dismissible via small
   orange × on the right):
   "You can only deposit or withdraw funds to an account that is in **your own legal name**."
   ("your own legal name" bold.)
4. Field "Account Holder Name" — **disabled/read-only** input, light-grey fill, value
   `TEWIBOWO`.
5. Field "Bank Name" — empty input, placeholder "Enter bank name".
   Inline error below (red text): "Bank Name is required"
6. Field "SWIFT/BIC Code" — placeholder "Enter SWIFT/BIC Code".
   Error: "Swift Code is required"
7. Field "IBAN / Account Number" + small info ⓘ icon after the label — placeholder
   "Enter account number". Error: "Account Number is required"
8. Field "Routing Code (Optional)" + info ⓘ — placeholder "Enter Routing Code". No error.
9. Field "Intermediary SWIFT/BIC Code (Optional)" + info ⓘ — placeholder
   "Enter Intermediary SWIFT/BIC Code". No error.
10. Field "Payment Reason (Optional)" + info ⓘ — placeholder "Enter payment reason".
11. (Cut off below the viewport: footer with "Close" + submit button — assume same footer
    pattern as Step 2: "Close" secondary + "Submit"/"Next" primary.)

The three red errors are shown simultaneously → validation fires on submit attempt while
required fields are empty. Error text color: red (`--status-critical`). Inputs do not show
red borders in the screenshot (text-only errors below fields).

**Dummy data**: Account Holder Name = `TEWIBOWO` (locked). Currency = Singapore Dollar (SGD).

**Flow logic**
- Currency chosen in Step 2 determines the Step 3 field set (captured: SGD variant with
  SWIFT/IBAN/Routing fields).
- Submit with empty required fields → inline "… is required" errors.
- Successful submit → returns to Bank Accounts tab with the new bank appended as an
  "Unverified" card (that is how CIMB Niaga in §2 came to exist).

**Mobile adaptation**
- Step 2 → `BottomSheet` titled "Add Bank Account" containing a `Select` (or
  `SelectionBox type="radio"` list of currencies) + footer `Button variant="secondary"`
  "Close" / `Button variant="primary"` "Next". Alternatively `Modal size="small"`.
- Step 3 → **full-screen page** (form is too tall for a sheet) or full-height `BottomSheet`:
  - `Alert tone="warning" onDismiss` for the legal-name notice.
  - `Input` per field: `label`, `placeholder`, `error` props as listed above;
    Account Holder Name → `Input disabled value="TEWIBOWO"`.
  - Info icons: `Tooltip` around `Icon name="info" size={16}` in the label, or `helper` text.
  - If the prototype instead offers a picker of known banks, use `FieldBank`
    (label "Bank Name", `placeholder="Select Account"`, `options`, `addAction`) +
    `BottomSheetBank title="Select Bank"` with `banks=[{name:"Bank Mandiri"},{name:"CIMB Niaga"},…]`
    and `DropdownBank` on wider screens — but the captured web form uses a free-text input.
  - Footer: sticky bottom bar, "Close" (secondary) + "Submit" (primary).

---

## 6. Verify Bank Accounts flow

### Step 1 — Method choice modal
Trigger: "Verify Now" pill on the CIMB Niaga card (Bank Accounts tab).

**Elements**
- Centered modal, title "Verify Bank Account" + X, divider.
- Intro copy: "To verify your bank account, you can **make a transfer in** from the same
  account added or **upload your bank statement**." (bold parts: "make a transfer in",
  "upload your bank statement.")
- Two selectable option rows (full-width, 1px grey border, rounded ~8px, radio circle at
  left, ~12px gap between rows):
  1. "Transfer In"
  2. "Upload bank statement"
- Footer strip: "Close" (secondary outlined) + "Next" (**disabled**: grey text on pale-grey
  fill — nothing selected yet).

**Flow logic**: selecting an option enables "Next". Choosing "Upload bank statement" → Step 2.
("Transfer In" branch not captured.)

### Step 2 — Upload bank statement
**Elements (exact copy, top → bottom)**
- Title "Verify Bank Account" + X, divider.
- "To verify your bank account, you need to **upload your bank statement**"
- "Ensure that your statement has:" followed by a hyphen list (bold keywords):
  - "- **Name**"
  - "- **Address**"
  - "- **Bank Account Number**"
  - "- **Bank Logo**"
  - "- **Date of Issuance** (within 3 months from date of submission)"
  - "- **Header and Footer** of the statement."
- "Don't have a bank statement? Check out FAQ." — "Check out FAQ" underlined link.
- Highlight note (pale-yellow filled box, rounded, no icon):
  "Do note that cropping or editing of the document is not allowed."
- Paragraph: "You need to upload your bank statement even if you submitted a statement as
  your Proof of Address. Identity verification and bank account verification are two
  different processes."
- Label: "Upload"
- Upload dropzone: large area with **dashed grey border**, light bg; centered green
  inbox/tray icon (~48px), below it a bordered button "Upload" with an upload-arrow icon,
  then two helper lines:
  - "Drag & Drop JPEG, PNG, JPG, or PDF"
  - "Max file size: **5 MB**"
- Footer cut off at bottom of screenshot (grey strip with a disabled full-width button —
  assume "Submit" that enables once a file is attached).

**Flow logic**: attach file → submit → Step 3 success modal.

### Step 3 — Success confirmation
**Elements**
- Small centered modal: title "Successfully Submitted" + X, divider.
- Body: "Your bank statement has been uploaded successfully. It'll take approximately
  **1 business day** to review your submitted document." ("1 business day" bold.)
- Footer: single **full-width** "Close" button (white, outlined pill, secondary).

**Background state change (visible behind the modal)**: the CIMB Niaga card's tag changed
from "Unverified" (grey) to **"Pending"** — orange/amber text, orange outline, with a small
info/clock glyph after the word; the "Verify Now" button is **gone** (only pencil + trash
icon buttons remain). Bank Mandiri card unchanged ("Verified").

**Flow logic summary (connects back to My Account)**
- Bank Accounts tab → "Verify Now" (on any `variant="unverified"` bank) → method modal →
  upload → success → tab re-renders that bank with status "Pending"; after review (out of
  scope) it would become "Verified".

**Mobile adaptation**
- Step 1 → `BottomSheet` titled "Verify Bank Account"; options as two
  `SelectionBox type="radio" indicator="control"` items (`label="Transfer In"`,
  `label="Upload bank statement"`); footer buttons "Close" (secondary) / "Next" (primary,
  `disabled` until selection).
- Step 2 → full-height `BottomSheet` or full-screen page:
  - body copy as static rich text; "Check out FAQ" → `LinkButton`.
  - note box → `Alert tone="warning"` (icon-less to match) or a `--status-surface-warning`
    styled div.
  - dropzone → `Upload label="Upload" hint="Drag & Drop JPEG, PNG, JPG, or PDF — Max file size: 5 MB" accept=".jpeg,.jpg,.png,.pdf"`.
  - footer sticky "Submit" (primary, disabled until file present).
- Step 3 → `Modal size="small"` or `BottomSheet` with `StatusIcon variant="success"` +
  title "Successfully Submitted" + body copy + full-width "Close"
  (`Button variant="secondary"`).
- Pending state → `Tag tone="warning" appearance="outlined" icon="schedule"` (or `info`);
  `ListBank` row for CIMB Niaga switches `variant` and drops its action button.

---

## 7. Status-tag matrix (use everywhere)

| Visible label | Where | DS mapping | Colors |
|---|---|---|---|
| Verified | profile status, Bank Mandiri, MetaMask | `Tag tone="positive" appearance="outlined"` | green text/border `--status-positive`, white bg |
| Unverified | CIMB Niaga (before verify) | `Tag tone="neutral" appearance="outlined"` | grey text/border, light bg |
| Pending | CIMB Niaga (after submit) | `Tag tone="warning" appearance="outlined"` + trailing icon | amber `--status-warning` |
| Not Verified | Solana address | `Tag tone="neutral"` (filled-surface look) | grey on `--surface-secondary` |
| 2FA Is Enabled | Security tab | `Tag tone="positive" appearance="outlined" icon="check"` | green |

## 8. Button matrix

| Label | Style seen | DS mapping |
|---|---|---|
| Add New | white pill, dark outline, small | `Button variant="secondary" size="sm"` |
| Verify Now | green filled pill, small | `Button variant="primary" size="sm"` |
| Close | white pill, dark outline | `Button variant="secondary"` |
| Next | green filled (disabled = grey) | `Button variant="primary"` (+`disabled`) |
| Manage Password / Set Up 2FA | green filled | `Button variant="primary"` |
| Activate Kill Switch | red filled | `Button` + critical override (`--status-critical` bg, white text) — no built-in variant |
| Upload (in dropzone) | white, grey outline, upload icon | built into `Upload` component |
| edit / delete / copy / unlink | circular outlined icon buttons | `IconButton variant="ghost" shape="circle"` with `edit`, `delete`, `content_copy`, `link_off` |

## 9. Visual notes / tokens

- Primary green: `--primary` (#00d37e). Dark ivy text/logo: `--text-primary` (#002b2a).
- Links: blue-teal underlined → `--link` (#187d97).
- Errors: `--status-critical` (#df1312); warning alert bg `--status-surface-warning`
  (#fffaea) with `--status-warning` (#fc9a07) border.
- Page bg `--background` (#f6f7f9); cards/modals `--surface` (#fff); borders `--border`
  (#d8d8d8); modal scrim `--overlay`.
- Modal footers sit on a light-grey band (`--surface-secondary`); buttons are fully rounded
  pills; cards/inputs radius ~8px.
- Bank "logos": generic dark bank-columns glyph for both banks (`Icon name="account_balance"`);
  real logos only for wallets/networks (Solana, MetaMask, Ethereum, Polygon, Avalanche,
  Arbitrum, BNB, Base) on the Blockchain tab.
- Typography: Red Hat Display for titles, Hanken Grotesk for body (per tokens.css).
