# Blockchain Addresses — Mobile PWA Build Spec

Source: StraitsX web dashboard screenshots (`reference/screenshots/Add New Blockchain/` steps 1–5, `reference/screenshots/Verify Blockchain/` step 1). This document is the single source of truth for rebuilding these flows as a mobile PWA with the StraitsX design system (`src/components`, tokens in `src/styles/tokens.css`). All copy in quotes is VERBATIM from the screenshots.

Two flows are covered:

- **Flow A — Add New Blockchain** (5 screens): address list → link-method chooser → wallet picker → manual add form → WalletConnect QR.
- **Flow B — Verify Blockchain** (1 screen): whitelist/verification method chooser for an unverified address.

Shared web chrome (do NOT rebuild on mobile as-is; see Mobile Adaptation notes): left sidebar with StraitsX logo + "Personal Account" and nav items **Home, Mint, Transaction History, Support**; breadcrumb "Home / My Account"; page title "My Account"; top-right notification bell + avatar + "TEWIBOWO"; floating dark-teal chat FAB bottom-right; a left profile card showing StraitsX logo, "Email" `tewi@fazzfinancial.com`, "Phone Number" `+62 811173050`, "Status" with green outlined tag "Verified", and note "If you'd like to change your profile information, please contact Customer Support." ("Customer Support." is an underlined link).

---

## Screen A1 — Blockchain Addresses list ("My Addresses")

File: `Add New Blockchain - Step 1.png` — URL `app.straitsx.com/manage_account`.

### Purpose & layout
The account page with the **Blockchain Addresses** tab active. Right content panel contains: tab bar, section header row (heading + Add New button), an informational link line, then a vertical stack of address cards (one per linked wallet/address), and pagination at bottom-right.

### UI elements (top to bottom of the right panel)
1. **Tabs** (horizontal): "Bank Accounts" | "Blockchain Addresses" (ACTIVE — bold, dark underline indicator) | "Security Settings".
2. **Section header row**: heading "My Addresses" (bold, dark ivy); right-aligned outlined pill button "Add New" (secondary/outline variant). Tapping it opens Screen A2.
3. **Info line** with a green circled-i icon: "Learn more about different types of addresses and how to verify an address." — "different types of addresses" and "verify an address." are underlined teal/green links.
4. **Address card 1 (Solana — unverified, manual/non-custodial)**:
   - Leading icon: generic dark wallet glyph inside a light mint circle.
   - Title "Solana" (bold), subtitle "Personal Address (Non-Custodial)" (grey).
   - Right side: green filled pill button "Verify Now" (primary variant) + trash-can IconButton (delete).
   - Sub-section label "Network"; row: Solana network icon (purple/gradient circle) + text "Solana"; far right a grey/disabled rectangular tag reading "Not Verified" (renders on two lines: "Not" / "Verified"; grey background `#f0f0f0`-ish, grey text).
   - Address copy box (grey filled, rounded, monospace-looking text) `DnjNRLdEQxCbSrkz8FpApvrVHGYDFZddMPfP5JjoqPoY` with a copy IconButton (two-squares icon) at the right, outside the grey box.
5. **Address card 2 (MetaMask — verified, wallet-linked)**:
   - Leading icon: MetaMask fox logo.
   - Title "MetaMask" (bold), subtitle "MetaMask - Personal Address (Non-Custodial)" (grey).
   - Right side: "unlink" IconButton (broken-link / link-off icon) — no Verify button, no trash.
   - Sub-section label "Network"; row: stack of 6 overlapping network coin icons (Ethereum, Polygon, Avalanche, Arbitrum, BNB, Base) + text "Ethereum, Polygon, Avalanche C-Chain, Arbitrum, BNB Smart Chain, Base" (wraps to 2 lines); far right a green **outlined** tag "Verified".
   - Address copy box `0xd8129977699358235e7865327b575f736cc72e87` with copy IconButton.
6. **Pagination** bottom-right: left chevron (disabled), page "1" (boxed/active), right chevron (disabled).

### Dummy data
- Solana address: `DnjNRLdEQxCbSrkz8FpApvrVHGYDFZddMPfP5JjoqPoY` — network "Solana" — status "Not Verified".
- EVM address: `0xd8129977699358235e7865327b575f736cc72e87` — networks "Ethereum, Polygon, Avalanche C-Chain, Arbitrum, BNB Smart Chain, Base" — status "Verified" — provider "MetaMask".
- Profile: email `tewi@fazzfinancial.com`, phone `+62 811173050`, account status "Verified", username "TEWIBOWO".
- Pagination: single page "1".

### Flow logic
- "Add New" → opens **Screen A2** (Link Blockchain Address chooser).
- "Verify Now" on the Solana card → opens **Screen B1** (Whitelist Blockchain Address).
- Copy icon → copies address to clipboard (show a Toast, e.g. "Address copied").
- Trash icon → delete unverified address (confirm dialog recommended; not shown in screenshots).
- Unlink icon on MetaMask card → disconnect wallet (confirm dialog recommended; not shown).

### Mobile adaptation
- Full-screen page. Replace sidebar/breadcrumb with `AppTopNav`/`TopBar` titled "Blockchain Addresses" (back arrow to account/home). Skip the profile card or collapse it elsewhere.
- Tabs → `Tabs` (scrollable horizontal) with the three tab labels above; only Blockchain Addresses needs content for the prototype.
- Header row: `PageTitle` or plain heading "My Addresses" + `Button variant="secondary" size="sm"` "Add New" (or a LinkButton at right of the heading).
- Info line → `LinkButton`s inline in a small caption row, or an `Alert tone="info"` slim variant.
- Address cards → `Card` wrapping:
  - `ListBlockchain` for the header row: Solana card → `variant="verify"` with `actionLabel="Verify Now"` (`onAction` opens Flow B); MetaMask card → `variant="verifiedPrivateWallet"` (shows the unlink affordance) with `name="MetaMask"`, `meta="MetaMask - Personal Address (Non-Custodial)"`, `icon={<MetaMask fox/>}`.
  - Network row: label "Network" + `ListSupportedNetwork` with `networks={[...icon nodes]}` (6 icons for the EVM card, 1 for Solana) + `Tag` for status: "Not Verified" → `Tag tone="neutral" appearance="filled" disabled` look; "Verified" → `Tag tone="positive" appearance="outlined"`.
  - Address → `Copybox` (`size="large"`, `action` copy button, single-line, truncate middle if needed on narrow screens).
- Pagination → omit on mobile (short list) or `Pagination` if kept.

### Visual notes
- Primary green `--primary` (#00d37e) for "Verify Now"; dark ivy `--text-primary` (#002b2a) headings; grey `--text-secondary` subtitles; card borders `--border` (#d8d8d8), white `--surface` cards on off-white background.
- "Verified" tag: green outline + green text (`--status-positive` family). "Not Verified": grey block, muted text.
- Network icons are full-color brand coins, 20–24px, overlapping stack with white ring separators.

---

## Screen A2 — "Link Blockchain Address" (method chooser modal)

File: `Add New Blockchain - Step 2.png`.

### Purpose & layout
Centered modal (~400px) over the dimmed list page. Lets the user choose HOW to add an address: connect a wallet vs. manual entry. Title row + divider, two large selectable option cards, footer help link.

### UI elements
1. Modal title "Link Blockchain Address" + X close (top right). Thin divider under the title.
2. **Option card 1 — wallet connect** (light mint/green tinted background, decorative illustration on the right: MetaMask fox in a bubble with green confetti/sparkles):
   - Green filled badge (small, white text): "New"
   - Heading (bold): "Link with your wallet"
   - Body (grey): "Connect your private wallet (e.g Metamask, WalletConnect)"
3. **Option card 2 — manual** (white, thin grey border; wallet illustration on the right in a pale circle):
   - Heading (bold): "Link your address manually"
   - Body (grey): "A manual way to add your own blockchain address."
4. Footer line: "New to Blockchain Addresses? Learn more" — "Learn more" underlined teal link.

### Dummy data
None beyond copy above.

### Flow logic
- Tap card 1 "Link with your wallet" → **Screen A3** (Select a wallet).
- Tap card 2 "Link your address manually" → **Screen A4** (Add Blockchain Address form).
- X → back to Screen A1.

### Mobile adaptation
- `BottomSheet` titled "Link Blockchain Address" (dismissable, close X per BottomSheet default).
- Options → two `SelectionBox` components (`type="radio"`, `indicator="control"` hidden or use card-tap style — simplest: custom-tap cards using `SelectionBox` with `description`) or `Card`s acting as buttons. Include `Badge`/`Tag tone="positive" appearance="filled" size="small"` for "New" on the first card. Illustrations optional; a wallet `Icon` suffices.
- Footer → caption text + `LinkButton` "Learn more".

### Visual notes
- Card 1 background: pale mint (#e9faf2-ish, i.e. `--status-surface-positive` family); Card 2 plain white with `--border` outline. Rounded ~12px corners. "New" badge is `--primary`-green filled, white text.

---

## Screen A3 — "Select a wallet" (provider picker modal)

File: `Add New Blockchain - Step 3.png`.

### Purpose & layout
Same-size centered modal replacing A2. Terms consent line, two provider rows, footer feedback link.

### UI elements
1. Title "Select a wallet" + X close, divider.
2. Consent text: "By connecting a wallet, I agree to StraitsX Terms of Service." — "Terms of Service" underlined teal link (line wraps: "By connecting a wallet, I agree to StraitsX" / "Terms of Service.").
3. **Provider row 1** (outlined card, full-width): MetaMask fox icon (left), bold label "MetaMask", right-aligned grey text "Est. 2 mins".
4. **Provider row 2** (outlined card): WalletConnect blue logo, bold "WalletConnect", right-aligned "Est. 2 mins".
5. Footer: "Don't see your wallet provider? Please inform us for future improvement." — "Don't see your wallet provider?" is bold; "inform us" underlined teal link.

### Dummy data
- Providers: MetaMask ("Est. 2 mins"), WalletConnect ("Est. 2 mins").

### Flow logic
- Tap MetaMask → triggers browser-extension connect on web; on mobile prototype, can short-circuit to a success state or show a stub.
- Tap WalletConnect → **Screen A5** (WalletConnect QR modal, layered over a "Select your chain" step).
- X → back to Screen A1 (web behavior closes the whole flow).

### Mobile adaptation
- `BottomSheet` titled "Select a wallet".
- Provider rows → `ListBank`-style rows or `SelectionBox` with `icon` + right-side meta; simplest faithful build: bordered `Card` rows with icon, `Body-Bold` name, and grey "Est. 2 mins" trailing text.
- Consent + footer → caption text with `LinkButton`s ("Terms of Service", "inform us").

### Visual notes
- Provider cards: white, 1px `--border`, ~8–12px radius, generous 16px padding; icons ~40px. Links in `--link`/teal-green, underlined.

---

## Screen A4 — "Add Blockchain Address" (manual entry form modal)

File: `Add New Blockchain - Step 4.png`. Reached from A2 → "Link your address manually".

### Purpose & layout
Tall centered modal with a scrolling form. Ownership question → address-type question → contextual important-notes → platform/label/network/address fields. NOTE: the screenshot is cut off at the bottom mid-"Blockchain Address" textarea; a submit button (e.g. "Submit"/"Add") is expected below the fold — builder should add a full-width primary "Submit" button pinned at the bottom.

### UI elements (top to bottom)
1. Title "Add Blockchain Address" + X close, divider.
2. Question label (bold): "Are you the owner of this address?"
   - Two radio selection boxes side by side (each a bordered box with a radio control + label): "Yes" (SELECTED — green filled radio dot, box outlined in dark teal) | "No" (unselected, grey border).
3. Question label (bold): "Type of Address"
   - Two radio selection boxes side by side: "Custodial" (SELECTED, teal outline + green radio) | "Private Wallet" (unselected).
4. Helper line (grey): "Learn more about the different types of addresses here." — "here." is a teal underlined link (rendered flush against "addresses" in the screenshot: "addresseshere.").
5. **Important Notes block** (pale mint background, 3px solid green left border):
   - Title (bold): "Important Notes:"
   - Body: "For an instant verification, please check if the registered name in the exchange and your StraitsX account matches. If you have any concerns with the verification process, please contact us." — the phrase "registered name in the exchange and your StraitsX account matches." is bold; "contact us" is a teal underlined link.
   - (This block belongs to the Custodial branch — it references "the exchange".)
6. Field label "Platform Name"; select trigger with placeholder "Select a platform name" + chevron-down. (Options not shown in screenshot — populate with exchange names, e.g. Binance, Coinbase, Crypto.com, OKX, Kraken as reasonable dummies; mark as builder-invented.)
7. Field label "Address Label" (smaller/normal weight); text input placeholder "e.g. My Wallet"; helper text below: "Label your address for your own reference. Nicknames cannot exceed 25 characters." — "25 characters" bold. Enforce maxLength 25.
8. Field label "Network"; select trigger with placeholder "Select a network" + chevron-down. (Options not shown — use the networks seen elsewhere in the product: Ethereum, Polygon, Avalanche C-Chain, Arbitrum, BNB Smart Chain, Base, Solana.)
9. Field label "Blockchain Address"; large multi-line textarea (empty; cut off at screenshot bottom edge).
10. (Below fold, not visible) Submit action — build as full-width `Button variant="primary"` "Submit".

### Dummy data
- Placeholders: "Select a platform name", "e.g. My Wallet", "Select a network".
- Defaults: owner = "Yes", type = "Custodial".

### Flow logic
- "Are you the owner?" = No would typically gate or change flow (not shown; keep both options selectable, no branch needed for prototype).
- "Type of Address" toggles context: Custodial shows Platform Name + Important Notes about exchange name matching; Private Wallet branch (not shown) would hide Platform Name — for the prototype keep the Custodial branch as screenshotted.
- Submit → creates the address as "Not Verified" and returns to Screen A1 with the new card (mirroring the Solana card pattern) and ideally a `Toast` confirmation.

### Mobile adaptation
- Full-screen page (form is too tall for a sheet). `AppTopNav` with title "Add Blockchain Address" + back/close.
- Radio pairs → two `SelectionBox type="radio"` per row (`label` only), 2-column grid; or stacked full-width on very narrow screens.
- Important Notes → `ImportantNotes` component with `title="Important Notes:"` and the body copy (it wraps `Alert`; use the mint/positive tone to match the screenshot's green-tinted panel).
- Platform Name → `Select` (or `FieldBank`-style field with `DropdownBank`-like list of platforms). Do NOT use FieldNetwork here.
- Address Label → `Input` with `helper` prop for the 25-character note.
- Network → `FieldNetwork` (label "Network", placeholder "Select a network") opening `BottomSheetNetwork` on mobile with `DropdownNetwork`-style options: Ethereum, Polygon, Avalanche C-Chain, Arbitrum, BNB Smart Chain, Base, Solana (each with its network icon).
- Blockchain Address → `Textarea` (2–3 rows).
- Submit → sticky bottom `Button variant="primary" size="lg"` full width, "Submit".

### Visual notes
- Selected SelectionBox: 2px dark-teal (`--interactive-active`, #054948) border + green (#00d37e) radio fill; unselected: 1px #d8d8d8.
- ImportantNotes panel: pale mint background (match `--status-surface-positive` #f0f9f4 family) with a saturated green left rule; title and key phrase bold in `--text-primary`.
- Links teal (`--brand-secure-teal`/`--link`), underlined.

---

## Screen A5 — WalletConnect QR ("Connect your wallet")

File: `Add New Blockchain - Step 5.png`. Reached from A3 → WalletConnect.

### Purpose & layout
Two layered dialogs: behind, a StraitsX modal titled "Select your chain" (mostly obscured, X close visible); in front, the third-party WalletConnect modal (its own branded UI) presenting a pairing QR plus desktop-wallet shortcuts.

### UI elements (WalletConnect modal, top to bottom)
1. Blue header bar: WalletConnect logo + wordmark "WalletConnect" (white), circular "?" help button, circular black X close button.
2. Black panel, heading "Connect your wallet" with a copy-to-clipboard icon at the right (copies the pairing URI).
3. Tab row: "Mobile" (blue text + phone icon, ACTIVE) | "Scan with your wallet" (grey text + scan-frame icon).
4. Large square QR code — white modules on black, rounded finder patterns, WalletConnect logo tile at center. Encodes a WalletConnect pairing URI (dummy: `wc:00000000-demo-pairing-uri@2?relay-protocol=irn&symKey=demo`).
5. Section label "Desktop" with monitor icon.
6. Horizontal wallet shortcut row, each an icon tile + caption: "Binance" (black tile, yellow logo), "SafePal" (blue tile), "Fireblocks" (black tile, white triangle), "View All" (tile made of a 2×2 grid of 4 mini wallet icons).
7. Behind everything: StraitsX modal title "Select your chain" + X (indicates a chain-selection step exists between A3 and the QR; contents not captured).

### Dummy data
- Wallet shortcuts: Binance, SafePal, Fireblocks, View All.
- Tabs: Mobile / Scan with your wallet.

### Flow logic
- User scans the QR with a mobile wallet (or picks a desktop wallet) → wallet approves → address gets linked → returns to Screen A1 showing a new verified wallet card (like the MetaMask card).
- X on WalletConnect modal → back to "Select your chain" / A3.

### Mobile adaptation
- On a phone, "scan a QR with this same phone" is awkward — adapt as a full-screen dark sheet (`BottomSheet` full-height) with:
  - Header "WalletConnect" styling optional; keep StraitsX chrome and title "Connect your wallet".
  - `QR` component (`value` = dummy pairing URI, `size≈240`, centered) with `Copybox` (or the QR's copy affordance) for the URI.
  - `Tabs` for "Mobile" / "Scan with your wallet".
  - Wallet shortcut row → horizontally scrolling icon tiles (Binance, SafePal, Fireblocks, View All).
- Precede it with a "Select your chain" `BottomSheetBlockchain` (`title="Select your chain"`, chains: Ethereum, Polygon, Avalanche C-Chain, Arbitrum, BNB Smart Chain, Base — the EVM set from Screen A1) since that step exists behind the QR modal.
- This screen may keep WalletConnect's dark branding: black panel, WalletConnect blue (#3396ff) accents. It intentionally does NOT use StraitsX tokens.

---

## Screen B1 — "Whitelist Blockchain Address" (verification method)

File: `Verify Blockchain - Step 1.png`. Opened via "Verify Now" on the Solana card of Screen A1.

### Purpose & layout
Centered modal: explains ownership verification via deposit ("whitelisting"), warns about the no-tokens case, asks the user to pick one of two verification paths, then a footer primary button. Title + divider, body paragraph, warning alert, two radio option boxes, full-width "Next" button (footer is on a slightly raised white footer band).

### UI elements
1. Title "Whitelist Blockchain Address" + X close, divider.
2. Body paragraph: "In order to whitelist your address Solana, please deposit any amount from the address to your StraitsX account." — "Solana" bold.
3. **Warning alert** (pale yellow background, orange warning-triangle icon top-left, dark amber/brown text): "If you don't have any supported token in your address Solana, you can withdraw tokens from your StraitsX account to the address first before depositing it back to StraitsX." — "Solana" bold.
4. **Radio option box 1** (bordered box, radio left): "I need to transfer tokens from StraitsX out first before depositing it back in"
5. **Radio option box 2**: "I have supported tokens in my address, I will deposit any amount into my StraitsX account to complete the verification"
6. Footer: full-width green pill `primary` button "Next" (enabled-looking in screenshot; recommend disabling until a radio is chosen).

### Dummy data
- Address name/network being verified: "Solana" (the `DnjNRLdEQxCbSrkz8FpApvrVHGYDFZddMPfP5JjoqPoY` address from Screen A1).

### Flow logic
- Verification = proof of ownership by moving funds: user must deposit ANY amount FROM the address TO their StraitsX account; system matches the on-chain sender to the registered address and flips status "Not Verified" → "Verified".
- Option 1 branch (no tokens on the address): next step would be a withdraw-first flow (send tokens from StraitsX to the address, then deposit back). Not captured in screenshots — prototype can show a deposit-instructions stub.
- Option 2 branch (has tokens): next step would show deposit instructions (StraitsX deposit address / QR). Not captured — stub acceptable: a screen with `QR` + `Copybox` of a StraitsX deposit address and an `ImportantNotes` about supported tokens.
- "Next" → proceeds per selected option. X → back to Screen A1 unchanged.
- After a (simulated) successful deposit, Screen A1's Solana card switches: "Verify Now" and trash disappear, tag becomes green-outlined "Verified".

### Mobile adaptation
- `BottomSheet` titled "Whitelist Blockchain Address" with `footer={<Button variant="primary" size="lg" full-width>Next</Button>}`.
- Warning → `Alert tone="warning"` (yellow surface `--status-surface-warning` #fffaea, icon color `--status-warning` #fc9a07).
- Options → two `SelectionBox type="radio"` (full-width, stacked, `label` = full sentence; radio indicator left as in `indicator="control"`), same `name` group.
- Bold inline "Solana" spans inside body/alert text.

### Visual notes
- Warning block: #fffaea-style background, no border, 8px radius, amber triangle icon, brownish text (matches `--status-warning` tokens).
- Radio boxes: 1px #d8d8d8 border, 8px radius, 16px padding; selected state should follow A4 (teal border + green dot).
- "Next": `--primary` #00d37e fill, dark ivy text? — screenshot shows dark text on green? It reads white/dark ivy; use the design system's `--btn-primary` tokens as-is.

---

## Cross-screen notes for the builder

- **Component inventory to use** (all exist in `src/components/`): `AppTopNav`/`TopBar`, `Tabs`, `PageTitle`, `Card`, `ListBlockchain`, `ListSupportedNetwork`, `Tag`, `Copybox`, `IconButton`, `Button`, `LinkButton`, `BottomSheet`, `BottomSheetBlockchain`, `BottomSheetNetwork`, `FieldNetwork`, `DropdownNetwork`, `FieldBlockchain`/`DropdownBlockchain` (if a wallet-select field is preferred over rows), `SelectionBox`, `Radio`, `Input`, `Textarea`, `Select`, `Alert`, `ImportantNotes`, `QR`, `Toast`, `Pagination`, `Modal` (desktop fallback).
- **Modal→mobile mapping summary**: A1 = full-screen page; A2, A3, B1 = bottom sheets; A4 = full-screen form page; A5 = full-height dark sheet preceded by a `BottomSheetBlockchain` chain picker.
- **Status tags**: "Verified" = `Tag tone="positive" appearance="outlined"`; "Not Verified" = neutral grey filled tag.
- **Networks/chains referenced anywhere in the flow**: Ethereum, Polygon, Avalanche C-Chain, Arbitrum, BNB Smart Chain, Base, Solana. Wallet providers: MetaMask, WalletConnect (plus WalletConnect-modal shortcuts Binance, SafePal, Fireblocks).
- **Typography/colors**: Red Hat Display / Hanken Grotesk per tokens; primary green #00d37e, deep ivy #002b2a, secondary text #505454, border #d8d8d8, warning #fc9a07 on #fffaea, positive #257c58 on #f0f9f4, links teal (#054948/#187d97 family), scrim `--overlay`.
- **Screenshot gaps (explicitly flagged)**: A4 is cut off below the "Blockchain Address" textarea (submit button assumed); the "Select your chain" modal behind A5 is 95% obscured (contents inferred); post-"Next" verification-deposit screens of Flow B are not captured (build stubs as described). Platform Name select options were never opened (dummy list is builder-invented).
