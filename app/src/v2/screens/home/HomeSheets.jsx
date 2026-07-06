// Sheet contents for the v2 Home tab (brief §2.1 — sheet-first surfaces).
// Every sheet renders inside the shared SheetProvider panel (teal on v2,
// grabber + drag handled by the host); content receives { close }.
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { AssetMark } from "@ds/components/AssetMark/AssetMark.jsx";
import { listContainer, listItem, pressable } from "@app/motion/presets.js";
import {
  user,
  balances,
  notifications,
  otc,
  blockchainAddresses,
  truncAddr
} from "@app/data/db.js";
import "./v2home-sheets.css";

function copyText(text) {
  try {
    navigator.clipboard?.writeText(text);
  } catch {
    /* prototype — clipboard may be unavailable */
  }
}

/* Copy affordance with an inline confirmation (icon morphs to a mint check
   for ~1.6s). Kept inline instead of a toast so it stays visible above the
   sheet scrim. */
function CopyButton({ text, label }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  const onCopy = () => {
    copyText(text);
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  };
  return (
    <motion.button
      {...pressable}
      className={"v2home-copy" + (copied ? " is-copied" : "")}
      aria-label={label}
      onClick={onCopy}
    >
      <span className="material-symbols-rounded">
        {copied ? "check_circle" : "content_copy"}
      </span>
    </motion.button>
  );
}

/* ---- Avatar → small account summary (Slopes account-sheet pattern) ------ */

export function AccountSummarySheet() {
  return (
    <div className="v2home-sheet">
      <div className="v2home-account">
        <span className="v2home-account__avatar" aria-hidden="true">
          {user.name.slice(0, 1)}
        </span>
        <div className="v2home-account__name">{user.name}</div>
        <div className="v2home-account__email">{user.email}</div>
        <div className="v2home-account__meta">
          <span className="v2home-tag">{user.status}</span>
          <span className="v2home-account__type">{user.accountType}</span>
        </div>
      </div>
    </div>
  );
}

/* ---- QR icon button → deposit QR info, pointing to Move → Deposit ------- */

export function QrInfoSheet({ close, nav }) {
  const dep = blockchainAddresses.deposit;
  return (
    <div className="v2home-sheet">
      <div className="v2home-sheet__title">Receive crypto</div>
      <p className="v2home-sheet__body">
        Your deposit QR code and full instructions live in Move → Deposit.
      </p>
      <div className="v2home-addr">
        <span className="v2home-addr__icon" aria-hidden="true">
          <span className="material-symbols-rounded">qr_code</span>
        </span>
        <span className="v2home-addr__text">
          <span className="v2home-addr__net">{dep.network}</span>
          <span className="v2home-addr__mono">{truncAddr(dep.address)}</span>
        </span>
        <CopyButton text={dep.address} label="Copy deposit address" />
      </div>
      <motion.button
        {...pressable}
        className="v2home-pill"
        onClick={() => {
          close();
          nav.push("v2/deposit/blockchain");
        }}
      >
        Open blockchain deposit
      </motion.button>
    </div>
  );
}

/* ---- Notifications sheet (4 verbatim items from db, unread dots) --------- */

export function NotificationsSheet() {
  return (
    <motion.div
      className="v2home-sheet"
      variants={listContainer}
      initial="initial"
      animate="enter"
    >
      <div className="v2home-sheet__title">Notifications</div>
      {notifications.items.map((n) => (
        <motion.div key={n.id} variants={listItem} className="v2home-notif">
          <span
            className={
              "v2home-notif__icon" +
              (n.icon === "warning" ? " is-warning" : "")
            }
            aria-hidden="true"
          >
            <span className="material-symbols-rounded">{n.icon}</span>
          </span>
          <div className="v2home-notif__main">
            <div className="v2home-notif__meta">
              <span
                className={
                  "v2home-notif__cat" +
                  (n.category === "Important" ? " is-important" : "")
                }
              >
                {n.category}
              </span>
              <span className="v2home-notif__date">{n.date}</span>
            </div>
            <div className="v2home-notif__title">
              {n.title}
              {!n.read && (
                <span className="v2home-notif__dot" aria-label="Unread" />
              )}
            </div>
            <div className="v2home-notif__body">{n.body}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ---- "3 assets ▾" chip → asset breakdown ---------------------------------- */

export function AssetBreakdownSheet() {
  return (
    <motion.div
      className="v2home-sheet"
      variants={listContainer}
      initial="initial"
      animate="enter"
    >
      <div className="v2home-sheet__title">Assets</div>
      <div className="v2home-sheet__sub">
        Total balance{" "}
        <span className="money">
          {balances.estimated.display} {balances.estimated.currency}
        </span>
      </div>
      {balances.assets.map((row) => (
        <motion.div key={row.asset} variants={listItem} className="v2home-breakdown">
          <AssetMark asset={row.asset} size={32} />
          <span className="v2home-breakdown__name">{row.asset}</span>
          <span className="v2home-breakdown__vals">
            <span className="money v2home-breakdown__bal">{row.balance}</span>
            <span className="money v2home-breakdown__fiat">
              ≈ {row.fiat} SGD
            </span>
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ---- Deposit circle → method chooser (same rows as the Move sheet, §2.3) -- */

const DEPOSIT_METHODS = [
  {
    icon: "account_balance",
    label: "Bank transfer (FAST)",
    desc: "Free · Instant · Up to 200,000 SGD per transaction",
    route: "v2/deposit/bank"
  },
  {
    icon: "qr_code",
    label: "Blockchain deposit",
    desc: "Receive stablecoins to your StraitsX address",
    route: "v2/deposit/blockchain"
  }
];

export function DepositMethodSheet({ close, nav }) {
  return (
    <motion.div variants={listContainer} initial="initial" animate="enter">
      <div className="v2-move__title">Deposit</div>
      {DEPOSIT_METHODS.map((row) => (
        <motion.button
          key={row.label}
          variants={listItem}
          {...pressable}
          className="v2-move__row"
          onClick={() => {
            close();
            nav.push(row.route);
          }}
        >
          <span className="v2-move__icon">
            <span className="material-symbols-rounded">{row.icon}</span>
          </span>
          <span>
            <div className="v2-move__label">{row.label}</div>
            <div className="v2-move__desc">{row.desc}</div>
          </span>
          <span className="material-symbols-rounded v2-move__chev">
            chevron_right
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
}

/* ---- OTC banner → desk contact sheet -------------------------------------- */

export function OtcDeskSheet({ close, onToast }) {
  return (
    <div className="v2home-sheet">
      <div className="v2home-sheet__title">{otc.banner.title}</div>
      <p className="v2home-sheet__body">{otc.banner.body}</p>
      <p className="v2home-sheet__body">{otc.minimums.helper}</p>
      <p className="v2home-sheet__body v2home-sheet__body--dim">
        {otc.introLead}
      </p>
      <div className="v2home-addr">
        <span className="v2home-addr__icon" aria-hidden="true">
          <span className="material-symbols-rounded">mail</span>
        </span>
        <span className="v2home-addr__text">
          <span className="v2home-addr__net">OTC desk</span>
          <span className="v2home-addr__mono">{otc.email}</span>
        </span>
        <CopyButton text={otc.email} label="Copy OTC email address" />
      </div>
      <motion.button
        {...pressable}
        className="v2home-pill"
        onClick={() => {
          close();
          onToast("OTC desk lives in v1 for this concept");
        }}
      >
        {otc.banner.cta}
      </motion.button>
    </div>
  );
}
