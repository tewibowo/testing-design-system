/**
 * db.js — single dummy-data module for the StraitsX mobile PWA prototype.
 *
 * Every concrete value here is transcribed VERBATIM from the build specs in
 * `reference/specs/` (which themselves transcribe the real dashboard
 * screenshots). Values a spec flagged as truncated/cut-off/unknown are
 * reconstructed plausibly and marked with a `// reconstructed` comment.
 * Plain ES module — no React, no side effects.
 *
 * @typedef {Object} GoogleAccount
 * @property {string} name        Display name in the Google account chooser.
 * @property {string} email
 * @property {"teal"|"indigo"|"photo"|"orange-red"} avatar  Avatar treatment seen in the chooser.
 * @property {boolean} isPrimary  True for the account that continues into StraitsX.
 *
 * @typedef {Object} User
 * @property {string} name              All-caps handle shown in the top nav ("TEWIBOWO").
 * @property {string} email             Primary login email.
 * @property {string} phone             Full phone number (profile panel).
 * @property {string} maskedPhone       Masked form used in SMS-OTP copy.
 * @property {string} status            Account verification status tag label.
 * @property {string} accountType       Sidebar subtitle.
 * @property {GoogleAccount[]} googleAccounts  The 4 rows of the Google account chooser.
 * @property {string} signupEmail       Email typed on the sign-up form (flow A1).
 * @property {string} verifiedEmail     Email confirmed in the verification flow (A4/A5).
 *
 * @typedef {Object} AssetBalance
 * @property {string} asset     AssetMark id (XSGD | XUSD | USDT | USDC).
 * @property {string} balance   Display balance, 2dp string.
 * @property {string} fiat      "≈ x.xx SGD" approximation (number part only).
 * @property {number} networkIconCount  Mini network icons shown on the row.
 * @property {string|null} networkOverflow  Overflow chip (e.g. "+5") or null.
 * @property {boolean} isNew    Row carries a tiny "NEW" ribbon on one network icon.
 *
 * @typedef {Object} Balances
 * @property {{amount:number, display:string, currency:string}} estimated
 * @property {AssetBalance[]} assets
 *
 * @typedef {Object} Asset
 * @property {string} id       AssetMark `asset` id (validated against AssetMark.jsx).
 * @property {string} symbol   Ticker.
 * @property {string} name     Row caption / long name.
 * @property {string} color    Brand color hint (AssetMark resolves it itself; here for charts/etc).
 *
 * @typedef {Object} SwapRates
 * @property {string} xsgdToXusd   Rate chip, dashboard default pair.
 * @property {string} usdtToXsgd   Rate chip behind the confirmation modal.
 * @property {string} footnote     Swap card footnote.
 * @property {Object} confirmation The captured confirmation-modal example.
 *
 * @typedef {Object} Bank
 * @property {string} name
 * @property {string} account   Full, unmasked account number.
 * @property {"Verified"|"Unverified"|"Pending"} status
 * @property {string} statusAfterVerify  Status after the verify-flow submit (if captured).
 *
 * @typedef {Object} RecipientBank
 * @property {string} recipientName
 * @property {string} bankName
 * @property {string} accountNumber  Virtual Account Number (VAN), hyphen grouping verbatim.
 * @property {string} method         Transfer rail ("FAST").
 *
 * @typedef {Object} BlockchainAddress
 * @property {string} id         Stable key.
 * @property {string} provider   Card title ("Solana" | "MetaMask").
 * @property {string} subtitle   Grey subtitle under the title.
 * @property {string} address    Full address.
 * @property {"Verified"|"Not Verified"} status
 * @property {string[]} networks Network display names.
 * @property {string[]} networkAssetIds  Matching AssetMark ids for the network icons.
 *
 * @typedef {Object} Network
 * @property {string} name      Display name.
 * @property {string} assetId   AssetMark id for the network mark.
 * @property {string} [processingTime]  e.g. "6 Confirmations" (only Ethereum captured).
 * @property {string} [minimumAmount]
 * @property {string} [transferFee]
 * @property {string} [feeNote]
 *
 * @typedef {Object} Transaction
 * @property {string} id         Full transaction id.
 * @property {string} shortId    Middle-truncated id as rendered in the table.
 * @property {"funding"|"swap"|"otc"} tab  Transaction History tab it belongs to.
 * @property {string} type       Bold type name ("Blockchain Transfer In", "Swap", …).
 * @property {string} description  Qualifier line / details text.
 * @property {string|null} asset  Main asset ticker, if known.
 * @property {number|null} amount Numeric amount, if known.
 * @property {"in"|"out"|null} direction
 * @property {string} status     Status tag label.
 * @property {string|null} network
 * @property {string} date       "D MMM YYYY, HH:mm".
 * @property {Object} [detail]   Detail-page fields (hash, completedDate, totals…).
 *
 * @typedef {Object} NotificationItem
 * @property {string} id
 * @property {"System Maintenance"|"Important"|"Product Update"} category
 * @property {string} icon      Material Symbols name per the spec mapping.
 * @property {string} date      e.g. "22 Jun 2026".
 * @property {string} title     Verbatim (incl. the authentic "Syystem" typo).
 * @property {string} body
 * @property {boolean} read
 *
 * @typedef {Object} Otc
 * @property {{usd:string, sgd:string, helper:string}} minimums
 * @property {{title:string, body:string, cta:string}} banner
 * @property {string} email
 * @property {string} introLead
 * @property {string[]} introSteps
 * @property {Object} request   The captured 100,000 USDC → USDT example.
 *
 * @typedef {Object} Mint
 * @property {{min:string, feeCap:string, max:string}} limits
 * @property {RecipientBank} recipient
 * @property {{network:string, wallet:string, address:string, status:string}} setup
 * @property {{step:number, text:string}[]} steps
 * @property {string} recipientChangeWarning
 * @property {string[]} importantNotes
 *
 * @typedef {Object} TwoFa
 * @property {string} code          Demo TOTP accepted everywhere.
 * @property {string} maskedPhone
 * @property {number} resendSeconds Countdown length for OTP resends.
 * @property {string} emailOtpTarget
 * @property {string} instruction   Verbatim 2FA instruction line.
 * @property {string} troubleText
 */

/* ──────────────────────────────────────────────────────────────
 * USER / IDENTITY
 * (auth-login.md §4/§6, account-banks.md §1, auth-signup.md A1/A4)
 * ────────────────────────────────────────────────────────────── */

/** @type {User} */
export const user = {
  name: "TEWIBOWO",
  email: "tewi@fazzfinancial.com",
  phone: "+62 811173050",
  maskedPhone: "*****050",
  status: "Verified",
  accountType: "Personal Account",
  // Google OAuth "Choose an account" rows, verbatim order (auth-login.md §4).
  googleAccounts: [
    { name: "tewi bowo", email: "tewi@fazzfinancial.com", avatar: "teal", isPrimary: true },
    { name: "astoranian astor", email: "astoranian@gmail.com", avatar: "indigo", isPrimary: false },
    { name: "tewi bowo", email: "tewibowo@gmail.com", avatar: "photo", isPrimary: false },
    { name: "tewi bowo", email: "tewi1990@gmail.com", avatar: "orange-red", isPrimary: false },
  ],
  // Sign-up flow captures used two different addresses (two recording sessions).
  signupEmail: "astoranian@gmail.com",        // typed on the registration form (A1/A2)
  verifiedEmail: "tewibowodesign@gmail.com",  // confirmed in the email-verification flow (A4/A5)
};

/* ──────────────────────────────────────────────────────────────
 * BALANCES
 * (transfers.md §1, mint-swap.md §5, history-otc.md §5)
 * Note: twofa-notifications.md's capture shows 30.59 SGD / same asset
 * rows — a later moment of the same wallet. 30.58 is the canonical value.
 * ────────────────────────────────────────────────────────────── */

/** @type {Balances} */
export const balances = {
  estimated: { amount: 30.58, display: "30.58", currency: "SGD" },
  assets: [
    { asset: "XSGD", balance: "0.00", fiat: "0.00", networkIconCount: 4, networkOverflow: "+5", isNew: true },
    { asset: "XUSD", balance: "0.00", fiat: "0.00", networkIconCount: 3, networkOverflow: null, isNew: true },
    { asset: "USDT", balance: "23.77", fiat: "30.58", networkIconCount: 3, networkOverflow: null, isNew: true },
    { asset: "USDC", balance: "0.00", fiat: "0.00", networkIconCount: 1, networkOverflow: null, isNew: false },
  ],
};

/* ──────────────────────────────────────────────────────────────
 * ASSETS
 * ids match src/components/AssetMark/AssetMark.jsx ASSETS keys.
 * Colors mirror AssetMark's brand hints (XSGD/XUSD resolve to the
 * --brand-xsgd / --brand-xusd tokens; USDT/USDC are fixed brand hexes).
 * ────────────────────────────────────────────────────────────── */

/** @type {Asset[]} */
export const assets = [
  { id: "XSGD", symbol: "XSGD", name: "XSGD", color: "#0e3fc7" }, // var(--brand-xsgd)
  { id: "XUSD", symbol: "XUSD", name: "XUSD", color: "#257c58" }, // var(--brand-xusd)
  { id: "USDT", symbol: "USDT", name: "USDT", color: "#26A17B" },
  { id: "USDC", symbol: "USDC", name: "USDC", color: "#2775CA" },
];

/* ──────────────────────────────────────────────────────────────
 * SWAP RATES
 * (mint-swap.md §5–6, transfers.md §1)
 * ────────────────────────────────────────────────────────────── */

/** @type {SwapRates} */
export const swapRates = {
  xsgdToXusd: "1 XSGD ≈ 0.7717 XUSD", // dashboard default pair rate chip
  usdtToXsgd: "1 USDT ≈ 1.2908 XSGD", // pair behind the confirmation modal
  footnote: "No Fees • Rate refreshes every minute.",
  // Captured confirmation-modal example (mint-swap.md §6), verbatim values.
  confirmation: {
    spend: "10.0 USDT",
    fee: "No fee",
    rate: "1 USDT ≈ 1.2908 XSGD",
    receive: "12.9 XSGD",
    countdown: "00:58",       // ticking down from 01:00
    countdownSeconds: 60,
    fromBalance: "23.77 USDT",
    toBalance: "0.00 XSGD",
  },
};

/* ──────────────────────────────────────────────────────────────
 * BANKS
 * (account-banks.md §2/§6, transfers.md §4, mint-swap.md §4)
 * ────────────────────────────────────────────────────────────── */

export const banks = {
  /** @type {Bank[]} User's linked bank accounts (My Account → Bank Accounts). */
  linked: [
    { name: "Bank Mandiri", account: "1220015006821", status: "Verified", statusAfterVerify: "Verified" },
    // Flips Unverified → Pending after the verify-flow statement upload.
    { name: "CIMB Niaga", account: "707140118140", status: "Unverified", statusAfterVerify: "Pending" },
  ],
  /** @type {RecipientBank} FAST deposit details on Transfer In → Bank Transfer. */
  transferIn: {
    recipientName: "TEWIBOWO",
    bankName: "Xfers Pte Ltd", // capitalisation verbatim on this screen
    accountNumber: "3225-6257-7650-1",
    method: "FAST",
  },
  /** @type {RecipientBank} FAST transfer details on the Mint page (different VAN). */
  mint: {
    recipientName: "TEWIBOWO",
    bankName: "XFERS PTE LTD", // all-caps verbatim on the Mint screen
    accountNumber: "3225-5974-1423-2",
    method: "FAST",
  },
  vanHelper:
    "This is a virtual account number (VAN) assigned specifically to you. Please ensure that the account number input in your ibanking page is accurate.",
};

/* ──────────────────────────────────────────────────────────────
 * BLOCKCHAIN ADDRESSES
 * (account-banks.md §3, blockchain.md A1, transfers.md §3)
 * ────────────────────────────────────────────────────────────── */

export const blockchainAddresses = {
  /** @type {BlockchainAddress[]} Linked addresses (My Account → Blockchain Addresses). */
  linked: [
    {
      id: "solana",
      provider: "Solana",
      subtitle: "Personal Address (Non-Custodial)",
      address: "DnjNRLdEQxCbSrkz8FpApvrVHGYDFZddMPfP5JjoqPoY",
      status: "Not Verified",
      networks: ["Solana"],
      networkAssetIds: ["SOLANA"],
    },
    {
      id: "metamask",
      provider: "MetaMask",
      subtitle: "MetaMask - Personal Address (Non-Custodial)",
      address: "0xd8129977699358235e7865327b575f736cc72e87",
      status: "Verified",
      networks: ["Ethereum", "Polygon", "Avalanche C-Chain", "Arbitrum", "BNB Smart Chain", "Base"],
      networkAssetIds: ["ETHEREUM", "POLYGON", "AVALANCHE", "ARBITRUM", "BNB", "BASE"],
    },
  ],
  // StraitsX deposit address shown on Transfer In → Blockchain (Ethereum).
  deposit: {
    network: "Ethereum",
    address: "0x6a232e04e2cf24f377cb150be1f4877db3c4f438",
  },
};

/* ──────────────────────────────────────────────────────────────
 * NETWORKS
 * (transfers.md §3, blockchain.md cross-notes)
 * Only Ethereum's fee/processing details were captured; other rows
 * expose name + mark only.
 * ────────────────────────────────────────────────────────────── */

/** @type {Network[]} */
export const networks = [
  {
    name: "Ethereum",
    assetId: "ETHEREUM",
    processingTime: "6 Confirmations",
    minimumAmount: "1 XSGD",
    transferFee: "0.5 XSGD",
    feeNote: "Fee for transactions of 10 XSGD or more",
  },
  { name: "Polygon", assetId: "POLYGON" },
  { name: "Avalanche C-Chain", assetId: "AVALANCHE" },
  { name: "Arbitrum", assetId: "ARBITRUM" },
  { name: "BNB Smart Chain", assetId: "BNB" },
  { name: "Base", assetId: "BASE" },
  { name: "Solana", assetId: "SOLANA" },
];

/* ──────────────────────────────────────────────────────────────
 * TRANSACTIONS
 * (history-otc.md §1–§4; every captured row)
 * ────────────────────────────────────────────────────────────── */

/** @type {Transaction[]} */
export const transactions = [
  {
    // Funding row 1 — full detail page captured at /transactions/<id>.
    id: "c40ccea31f61da181c296de5641070a2",
    shortId: "c40...070a2",
    tab: "funding",
    type: "Blockchain Transfer In",
    description: "to StraitsX Account",
    asset: "USDT",
    amount: 13.78,
    direction: "in",
    status: "Completed",
    network: "BNB Smart Chain",
    date: "27 Jun 2026, 11:36",
    detail: {
      hash: "0xf9404a33f840884f71049b21171dca3a",
      // Table renders the hash truncated as "0xf...d22e9" (verbatim capture —
      // the tail doesn't match the detail-page hash; both kept as seen).
      shortHash: "0xf...d22e9",
      createdDate: "27 Jun 2026, 11:36",
      completedDate: "1 Jul 2026, 11:28",
      details: "-",
      totalAmount: "+13.78 USDT",
      fee: "-0.00 USDT",
      netAmount: "+13.78 USDT",
    },
  },
  {
    // Funding row 2 — only the truncated id "207...75deb" was captured.
    id: "207f18ce93a44b06b21d3fca9a675deb", // reconstructed (full id unknown; only "207...75deb" visible)
    shortId: "207...75deb",
    tab: "funding",
    type: "Admin Transfer to",
    description: "Straitsx Account", // lowercase "x" verbatim
    asset: null,   // no amount/asset column on the funding table; not captured
    amount: null,
    direction: "in",
    status: "Completed",
    network: null, // not visible in capture — render "-"
    date: "17 Jun 2026, 16:00",
    detail: {
      hash: null, // table shows "-"
      details: "Dogfooding stage 1 Rewards", // two lines: "Dogfooding stage 1" / "Rewards"
    },
  },
  {
    // Swap tab row — full UUID shown as plain text (not a link).
    id: "16c487e4-c980-413f-ad97-a453e2205fe1",
    shortId: "16c487e4-c980-413f-ad97-a453e2205fe1",
    tab: "swap",
    type: "Swap",
    description: "Swap from XUSD to USDT",
    asset: "XUSD",
    amount: 10.0,
    direction: "out",
    status: "Completed", // reconstructed (Status column cut off; spec suggests Completed)
    network: null,
    date: "27 Jun 2026, 10:46",
    detail: {
      pair: "XUSD/USDT",
      sell: "10.00 XUSD",
      buy: "10.00 USDT",            // reconstructed (column cut off; spec's suggested value)
      price: "1 XUSD ≈ 1.0000 USDT", // reconstructed (column cut off; spec's suggested value)
      fee: "0.00 XUSD",              // reconstructed (column cut off; spec's suggested value)
    },
  },
  {
    // OTC Request tab row — appears only AFTER submitting the OTC request
    // (spec §3.3 [inferred, for prototype continuity]; tab is empty before).
    id: "otc-0001", // reconstructed
    shortId: "otc-0001",
    tab: "otc",
    type: "OTC Request",
    description: "Sell 100,000 USDC for USDT",
    asset: "USDC",
    amount: 100000,
    direction: "out",
    status: "Pending",
    network: null,
    date: "3 Jul 2026, 09:00", // reconstructed
    detail: {
      pair: "USDC/USDT",
      sell: "100,000 USDC",
      buy: "USDT (quote pending)",
      rate: "-",
    },
  },
];

// Empty-state copy for the OTC Request tab (before any request is submitted).
export const transactionsEmptyState = {
  title: "No transactions yet",
  sub: "Your transaction activities will appear here.",
  cta: "Make an OTC Request",
};

/* ──────────────────────────────────────────────────────────────
 * NOTIFICATIONS
 * (twofa-notifications.md Flow B — verbatim incl. the "Syystem" typo)
 * ────────────────────────────────────────────────────────────── */

export const notifications = {
  // Filter chips; "All" is the default selection. The last chip was clipped
  // to "OTC Serv…" at the panel edge.
  categories: [
    "All",
    "Important",
    "System Maintenance",
    "Product Update",
    "OTC Service", // reconstructed (clipped to "OTC Serv…" in capture)
  ],
  /** @type {NotificationItem[]} */
  items: [
    {
      id: "n1",
      category: "System Maintenance",
      icon: "build", // white wrench in a black filled circle
      date: "22 Jun 2026",
      title: "Syystem Maintenance", // typo is authentic — keep verbatim
      body:
        "We will be conducting scheduled maintenance on June 23, 2026 (Tuesday), from 12:00 AM to 1:00 AM SGT. Your StraitsX Dashboard activities might experience disruptions, please plan your transactions outside of the maintenance window. Thank you for your understanding.",
      read: true,
    },
    {
      id: "n2",
      category: "Important",
      icon: "warning", // amber warning triangle; meta label renders red
      date: "24 Sep 2025",
      title: "Beware of Phishing Scams",
      body:
        "Scammers may impersonate StraitsX via social media ads, fake customer service, or investment offers. Never share OTPs, PINs, or login details. Suspect fraud? Report here: https://support.straitsx.com/support/tickets/new",
      read: true,
    },
    {
      id: "n3",
      category: "Product Update",
      icon: "send", // black paper-plane glyph
      date: "5 May 2026",
      title: "Exclusive: AI Swap Rates Now Live",
      body:
        "Get improved pricing on your XSGD swaps today. Exclusively for verified Accredited Investors. Submit here to verify: https://support.straitsx.com/support/tickets/new?ticket_form=accredited_investors_%28ai%29_onboarding",
      read: true,
    },
    {
      id: "n4",
      category: "Product Update",
      icon: "send",
      date: "31 Mar 2026",
      title: "USDC Support on Base Network", // reconstructed (item cut off below fold)
      body:
        "You can now deposit and withdraw USDC on the Base network. Head to Transfer In to try it out.", // reconstructed
      read: true,
    },
  ],
};

/* ──────────────────────────────────────────────────────────────
 * OTC
 * (history-otc.md §5–§8)
 * ────────────────────────────────────────────────────────────── */

/** @type {Otc} */
export const otc = {
  minimums: {
    usd: "USD 100K",
    sgd: "SGD 140K",
    helper: "The minimum request amount for an OTC trade is USD 100K or SGD 140K.",
  },
  banner: {
    title: "StraitsX OTC Desk",
    body: "We offer deep liquidity to institutions and high net-worth individuals. Starting from 100,000 USD.",
    cta: "Request Quote",
  },
  email: "otc@straitsx.com",
  introLead: "Submit a request to the StraitsX OTC Trading Desk.",
  introSteps: [
    "Select the token pairs you wish to buy or sell.",
    "Review and submit your request details.",
    "Our OTC Trading Desk will respond within 1 business day (Mon - Fri, 9:00 AM - 5:30 PM - SGT) via Email / WhatsApp / Telegram at your contact details.",
  ],
  // Captured confirmation example: selling 100,000 USDC for USDT.
  request: {
    direction: "Sell",
    amount: "100,000",
    sellAsset: "USDC",
    buyAsset: "USDT",
    caption: "You are selling 100,000 USDC in exchange for USDT",
    transferFee: "Free",
    processingTime: "~ 1 Business Day",
  },
};

/* ──────────────────────────────────────────────────────────────
 * MINT
 * (mint-swap.md §1–§4)
 * ────────────────────────────────────────────────────────────── */

/** @type {Mint} */
export const mint = {
  limits: {
    min: "10 XSGD",       // minimum transfer amount
    feeCap: "30 XSGD",    // network fee cap
    max: "200,000 XSGD",  // maximum transaction amount (excess refunded)
  },
  recipient: banks.mint, // XFERS PTE LTD · 3225-5974-1423-2 · TEWIBOWO · FAST
  setup: {
    network: "Ethereum",
    wallet: "MetaMask",
    address: "0xd8129977699358235e7865327b575f736cc72e87",
    status: "Verified",
  },
  steps: [
    { step: 1, text: "Login to your banking portal and initiate a FAST Transfer only." },
    { step: 2, text: "Send funds only from the designated bank account in your name." },
    { step: 3, text: "Make a FAST Transfer using the following information" },
  ],
  recipientChangeWarning:
    "We have changed our recipient bank to Xfers Pte Ltd. Please make sure you transfer to the correct bank account.",
  importantNotes: [
    "Minimum transfer amount is 10 XSGD and a network fee capped at 30 XSGD will be charged.",
    "The maximum transaction amount is 200,000 XSGD. Transfers above this will be refunded.",
    "We do not support GIRO / SWIFT Transfers.",
  ],
};

/* ──────────────────────────────────────────────────────────────
 * 2FA
 * (auth-login.md §5, twofa-notifications.md Flow A)
 * ────────────────────────────────────────────────────────────── */

/** @type {TwoFa} */
export const twofa = {
  code: "416370",
  maskedPhone: "*****050",
  resendSeconds: 60, // captures show mid-count "00:57" (email) and "00:54" (SMS)
  emailOtpTarget: "tewi@fazzfinancial.com",
  instruction: "Enter the 6-digit code generated by your Two-factor Authentication (2FA) app.",
  troubleText: "Having trouble with authenticator?",
  securityCheck: {
    title: "Security check",
    body: "We will send you OTP codes for the following verifications to proceed.",
    channels: ["Email", "Phone number"],
  },
};

/* ──────────────────────────────────────────────────────────────
 * LIMITS & FEES
 * (transfers.md §3/§4, mint-swap.md §4/§6)
 * ────────────────────────────────────────────────────────────── */

export const limits = {
  bankTransferIn: {
    maximumAmount: "200,000 SGD per txn.",
    conversion: "Your SGD will be converted 1:1 for XSGD",
  },
  blockchainTransferIn: {
    minimumAmount: "1 XSGD",
  },
  mint: mint.limits,
  otcMinimums: otc.minimums,
};

export const fees = {
  bankTransferIn: { fee: "Free", processingTime: "Instant" },
  blockchainTransferIn: {
    fee: "0.5 XSGD",
    feeNote: "Fee for transactions of 10 XSGD or more",
    processingTime: "6 Confirmations",
  },
  swap: "No fee",
  otc: "Free",
};

/* ──────────────────────────────────────────────────────────────
 * HELPERS
 * ────────────────────────────────────────────────────────────── */

/**
 * Format a number with en-US thousands separators and fixed decimals.
 *   fmtMoney(200000)      → "200,000.00"
 *   fmtMoney(13.78, 2)    → "13.78"
 *   fmtMoney(100000, 0)   → "100,000"
 * @param {number} n
 * @param {number} [decimals=2]
 * @returns {string}
 */
export function fmtMoney(n, decimals = 2) {
  return Number(n).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Middle-truncate a blockchain address the way the dashboard does:
 *   truncAddr("0xd8129977699358235e7865327b575f736cc72e87") → "0xd812…72e87"
 * Works for non-0x addresses too (first 6 + "…" + last 5).
 * @param {string} addr
 * @returns {string}
 */
export function truncAddr(addr) {
  if (!addr || addr.length <= 12) return addr ?? "";
  return addr.slice(0, 6) + "…" + addr.slice(-5);
}
