/* ────────────────────────────────────────────────
 * ANIMATION STORYBOARD — v2 Home (ivy) entrance
 *    0ms   tab pane crossfades in (tabContent, host-owned)
 *   40ms   hero blocks + sections stagger 50ms: header → balance →
 *          assets chip → quick actions → latest activity → assets → OTC
 *    ↳     balance hero counts up 0 → 30.58 ONCE per session (module flag;
 *          §4.3 — tab returns get only the crossfade, no re-count)
 *    ↳     asset rows stagger 50ms as card-less rows on ivy
 * ──────────────────────────────────────────────── */
import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useNav } from "@app/nav/Navigator.jsx";
import { useSheet } from "@app/nav/Sheet.jsx";
import { PatternBg } from "@app/v2/core/PatternBg.jsx";
import { AssetMark } from "@ds/components/AssetMark/AssetMark.jsx";
import {
  listContainer,
  listItem,
  pressable,
  EASE_BRAND
} from "@app/motion/presets.js";
import { user, balances, transactions, otc, fmtMoney } from "@app/data/db.js";
import {
  AccountSummarySheet,
  QrInfoSheet,
  NotificationsSheet,
  AssetBreakdownSheet,
  DepositMethodSheet,
  OtcDeskSheet
} from "./HomeSheets.jsx";
import { useV2HomeToast } from "./V2HomeToast.jsx";
import "./v2home-tab.css";

/* §4.3 — the balance count-up runs once per session. Tab switches remount
   this component (AnimatePresence in the host), so the flag lives at module
   level, exactly like a session guard. */
let hasCountedUp = false;

const QUICK_ACTIONS = [
  { label: "Deposit", icon: "add", sheet: "deposit" },
  { label: "Withdraw", icon: "arrow_outward", route: "v2/withdraw" },
  { label: "Swap", icon: "swap_vert", route: "v2/swap" },
  { label: "Mint", icon: "toll", route: "v2/mint" }
];

/* §2.5 row anatomy — icon by movement kind. */
function txIcon(tx) {
  if (tx.type === "Swap") return "swap_vert";
  if (tx.type.includes("Mint")) return "toll";
  return tx.direction === "out" ? "arrow_outward" : "add";
}

const MONTHS = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
};
function parseTxDate(str) {
  const m = /^(\d{1,2}) ([A-Za-z]{3}) (\d{4}), (\d{2}):(\d{2})$/.exec(str || "");
  if (!m || MONTHS[m[2]] === undefined) return new Date(0);
  return new Date(+m[3], MONTHS[m[2]], +m[1], +m[4], +m[5]);
}

/* Most recent movement. The OTC row only exists after an OTC request is
   submitted (db note), so it stays out of the home card. */
const latestTx = transactions
  .filter((t) => t.tab !== "otc" && t.amount != null)
  .reduce((a, b) => (parseTxDate(b.date) > parseTxDate(a.date) ? b : a));

/* Per-asset recent movement, derived from db.transactions (db carries no
   standalone delta figures). Zero-movement rows show no delta. */
function deltaFor(assetId) {
  return transactions
    .filter((t) => t.tab !== "otc" && t.asset === assetId && t.amount != null)
    .reduce((s, t) => s + (t.direction === "out" ? -t.amount : t.amount), 0);
}

/* Mini network badge on the 40px mark — Ethereum leads the supported-network
   order; USDC's single captured network is Polygon (dashboard capture). */
const badgeFor = (assetId) => (assetId === "USDC" ? "POLYGON" : "ETHEREUM");

/* Balance hero — Red Hat Mono 56px with small-cents (Revolut treatment):
   units white, decimals ~56% size in --v2-text-dim. Counts 0 → value with
   the brand ease on first mount of the session. */
function BalanceHero({ value, countUp }) {
  const mv = useMotionValue(countUp ? 0 : value);
  const fmt = (v) =>
    Number(v).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  const units = useTransform(mv, (v) => fmt(v).split(".")[0]);
  const cents = useTransform(mv, (v) => "." + fmt(v).split(".")[1]);

  useEffect(() => {
    if (!countUp) {
      mv.set(value);
      return undefined;
    }
    const controls = animate(mv, value, { duration: 0.6, ease: EASE_BRAND });
    return () => controls.stop();
  }, [value, countUp, mv]);

  return (
    <div className="v2home-hero__amount money">
      <motion.span>{units}</motion.span>
      <motion.span className="v2home-hero__cents">{cents}</motion.span>
    </div>
  );
}

export function V2HomeTab() {
  const nav = useNav();
  const { openSheet } = useSheet();
  const [toastNode, showToast] = useV2HomeToast();
  // Latch the session flag before paint so a same-render remount can't
  // double-count; the captured initial value drives this mount's animation.
  const [countUp] = useState(() => {
    const first = !hasCountedUp;
    hasCountedUp = true;
    return first;
  });

  const onAction = (a) => {
    if (a.sheet === "deposit") {
      openSheet(({ close }) => <DepositMethodSheet close={close} nav={nav} />);
      return;
    }
    nav.push(a.route);
  };

  return (
    <div className="v2home">
      {toastNode}
      <div className="screen-scroll v2home-scroll">
        {/* Hero region — logomark pattern over the top ~300px (§2.1.1) */}
        <div className="v2home-hero">
          <PatternBg />
          <motion.div variants={listContainer} initial="initial" animate="enter">
            {/* Header row 56px — avatar · qr · bell (§2.1.2, no wordmark) */}
            <motion.header variants={listItem} className="v2home-top">
              <motion.button
                {...pressable}
                className="v2home-avatar"
                aria-label="Account summary"
                onClick={() => openSheet(() => <AccountSummarySheet />)}
              >
                {user.name.slice(0, 1)}
              </motion.button>
              <span className="v2home-top__spacer" />
              <motion.button
                {...pressable}
                className="v2home-iconbtn"
                aria-label="Deposit QR"
                onClick={() =>
                  openSheet(({ close }) => <QrInfoSheet close={close} nav={nav} />)
                }
              >
                <span className="material-symbols-rounded">qr_code</span>
              </motion.button>
              <motion.button
                {...pressable}
                className="v2home-iconbtn"
                aria-label="Notifications"
                onClick={() => openSheet(() => <NotificationsSheet />)}
              >
                <span className="material-symbols-rounded">notifications</span>
              </motion.button>
            </motion.header>

            {/* Balance hero, centred (§2.1.3) */}
            <motion.div variants={listItem} className="v2home-balance">
              <div className="v2home-balance__label">
                Total balance · {balances.estimated.currency}
              </div>
              <BalanceHero value={balances.estimated.amount} countUp={countUp} />
              <motion.button
                {...pressable}
                className="v2-chip v2home-assets-chip"
                onClick={() => openSheet(() => <AssetBreakdownSheet />)}
              >
                3 assets
                <span className="material-symbols-rounded" aria-hidden="true">
                  expand_more
                </span>
              </motion.button>
            </motion.div>

            {/* Quick actions — 4 translucent circles (§2.1.4) */}
            <motion.div variants={listItem} className="v2home-actions">
              {QUICK_ACTIONS.map((a) => (
                <motion.button
                  key={a.label}
                  {...pressable}
                  className="v2home-action"
                  onClick={() => onAction(a)}
                >
                  <span className="v2home-action__circle">
                    <span className="material-symbols-rounded">{a.icon}</span>
                  </span>
                  <span className="v2home-action__label">{a.label}</span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Content over plain ivy */}
        <motion.div
          className="screen-pad v2home-sections"
          variants={listContainer}
          initial="initial"
          animate="enter"
        >
          {/* Latest activity — single-row teal card (§2.1.5) */}
          <motion.section variants={listItem}>
            <div className="v2home-eyebrow">
              Latest activity
              <button
                className="v2home-viewall"
                onClick={() => showToast("Open the Activity tab")}
              >
                View all
              </button>
            </div>
            <div className="v2-card v2home-latest">
              <span className="v2home-latest__icon" aria-hidden="true">
                <span className="material-symbols-rounded">{txIcon(latestTx)}</span>
              </span>
              <span className="v2home-latest__text">
                <span className="v2home-latest__type">{latestTx.type}</span>
                <span className="v2home-latest__desc">{latestTx.description}</span>
              </span>
              <span
                className={
                  "money v2home-latest__amt" +
                  (latestTx.direction === "in" ? " is-credit" : "")
                }
              >
                {latestTx.direction === "in" ? "+" : "−"}
                {fmtMoney(latestTx.amount)} {latestTx.asset}
              </span>
            </div>
          </motion.section>

          {/* Assets — card-less rows on ivy (§2.1.6) */}
          <motion.section variants={listItem}>
            <div className="v2home-eyebrow">Assets</div>
            <motion.div variants={listContainer} initial="initial" animate="enter">
              {balances.assets.map((row) => {
                const delta = deltaFor(row.asset);
                return (
                  <motion.div
                    key={row.asset}
                    variants={listItem}
                    className="v2home-asset"
                  >
                    <span className="v2home-asset__mark">
                      <AssetMark asset={row.asset} size={40} />
                      <span className="v2home-asset__badge">
                        <AssetMark asset={badgeFor(row.asset)} size={16} />
                      </span>
                    </span>
                    <span className="v2home-asset__text">
                      <span className="v2home-asset__name">{row.asset}</span>
                      <span className="money v2home-asset__holdings">
                        {row.balance} {row.asset}
                      </span>
                    </span>
                    <span className="v2home-asset__right">
                      <span className="money v2home-asset__fiat">{row.fiat}</span>
                      {delta !== 0 && (
                        <span
                          className={
                            "money v2home-asset__delta" +
                            (delta < 0 ? " is-down" : "")
                          }
                        >
                          {delta > 0 ? "+" : "−"}
                          {fmtMoney(Math.abs(delta))}
                        </span>
                      )}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.section>

          {/* OTC banner — demoted quiet teal card (§2.1.7) */}
          <motion.section variants={listItem}>
            <motion.button
              {...pressable}
              className="v2-card v2home-otc"
              onClick={() =>
                openSheet(({ close }) => (
                  <OtcDeskSheet close={close} onToast={showToast} />
                ))
              }
            >
              <span className="v2home-otc__icon" aria-hidden="true">
                <span className="material-symbols-rounded">handshake</span>
              </span>
              <span className="v2home-otc__text">
                <span className="v2home-otc__title">{otc.banner.title}</span>
                <span className="v2home-otc__body">{otc.banner.body}</span>
              </span>
              <span
                className="material-symbols-rounded v2home-otc__chev"
                aria-hidden="true"
              >
                chevron_right
              </span>
            </motion.button>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}
