// Shared helpers for the Transaction History area (screens/history/*).
// Status tone map + filter model per reference/specs/history-otc.md §9–§10.
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Toast } from "@ds/components/Toast/Toast.jsx";
import { Money } from "@app/ui/Money.jsx";
import { toast as toastPreset } from "@app/motion/presets.js";

/** Spec §10.1 — status label → Tag tone. */
export const STATUS_TONES = {
  Completed: "positive",
  Pending: "warning",
  Processing: "info",
  Cancelled: "critical",
  Failed: "critical"
};

/** Spec §9 — status options in the Filter & Sort sheet. */
export const FILTER_STATUSES = ["Completed", "Pending", "Processing", "Cancelled", "Failed"];

/** Spec §9 — funding transaction-type options. Matched by prefix so the
 * captured "Admin Transfer to" row answers to "Admin Transfer". */
export const FILTER_TYPES = [
  "Blockchain Transfer In",
  "Blockchain Transfer Out",
  "Bank Transfer In",
  "Bank Transfer Out",
  "Admin Transfer"
];

/** Spec §9 — asset options. */
export const FILTER_ASSETS = ["XSGD", "XUSD", "USDT", "USDC", "XIDR"];

/** Spec §9 — sort options ("Newest first" is the default). */
export const SORT_OPTIONS = [
  { id: "newest", label: "Newest first" },
  { id: "oldest", label: "Oldest first" },
  { id: "amount-desc", label: "Amount high→low" },
  { id: "amount-asc", label: "Amount low→high" }
];

export const EMPTY_FILTERS = {
  start: "",
  end: "",
  types: [],
  assets: [],
  statuses: [],
  sort: "newest"
};

export function isFiltering(f) {
  return Boolean(
    f.start ||
      f.end ||
      f.types.length ||
      f.assets.length ||
      f.statuses.length ||
      f.sort !== "newest"
  );
}

const MONTHS = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
};

/** Parse the spec date format "27 Jun 2026, 11:36" into a Date. */
export function parseTxDate(str) {
  const m = /^(\d{1,2}) ([A-Za-z]{3}) (\d{4}), (\d{2}):(\d{2})$/.exec(str || "");
  if (!m || MONTHS[m[2]] === undefined) return null;
  return new Date(Number(m[3]), MONTHS[m[2]], Number(m[1]), Number(m[4]), Number(m[5]));
}

/** Apply the Filter & Sort sheet's filters (type/asset/status/date + sort). */
export function applyFilters(rows, f) {
  const filtered = rows.filter((tx) => {
    if (f.types.length && !f.types.some((t) => tx.type.startsWith(t))) return false;
    if (f.assets.length && (!tx.asset || !f.assets.includes(tx.asset))) return false;
    if (f.statuses.length && !f.statuses.includes(tx.status)) return false;
    const d = parseTxDate(tx.date);
    if (f.start && d && d < new Date(`${f.start}T00:00:00`)) return false;
    if (f.end && d && d > new Date(`${f.end}T23:59:59`)) return false;
    return true;
  });
  const time = (tx) => parseTxDate(tx.date)?.getTime() ?? 0;
  switch (f.sort) {
    case "oldest":
      return filtered.slice().sort((a, b) => time(a) - time(b));
    case "amount-desc":
      return filtered.slice().sort((a, b) => (b.amount ?? -Infinity) - (a.amount ?? -Infinity));
    case "amount-asc":
      return filtered.slice().sort((a, b) => (a.amount ?? Infinity) - (b.amount ?? Infinity));
    default:
      return filtered.slice().sort((a, b) => time(b) - time(a)); // newest first
  }
}

/** Copy to clipboard — prototype-tolerant (never throws). */
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    /* clipboard unavailable in this context — prototype no-op */
  }
}

/**
 * Parse a spec amount string like "+13.78 USDT" / "100,000 USDC" into
 * { sign, value, decimals, asset }. Returns null for non-amount strings
 * ("USDT (quote pending)", "1 XUSD ≈ 1.0000 USDT", "-").
 */
export function moneyParts(str) {
  const m = /^([+-]?)([\d,]+(?:\.(\d+))?) ([A-Z]{2,6})$/.exec(str || "");
  if (!m) return null;
  return {
    sign: m[1],
    value: Number(m[2].replace(/,/g, "")),
    decimals: m[3] ? m[3].length : 0,
    asset: m[4]
  };
}

/**
 * Render a spec amount string through <Money> (odometer, mono, tabular)
 * when it parses as an amount; otherwise render it as plain mono text.
 */
export function MoneyText({ str, animateOnMount = false, className = "" }) {
  const parts = moneyParts(str);
  if (!parts) return <span className={`money ${className}`}>{str}</span>;
  return (
    <Money
      value={parts.value}
      decimals={parts.decimals}
      prefix={parts.sign}
      suffix={` ${parts.asset}`}
      animateOnMount={animateOnMount}
      className={className}
    />
  );
}

let toastSeq = 0;

/**
 * Screen-local toast (the app shell has no ToastProvider): DS <Toast>
 * chrome animated with the shared `toast` preset from the top edge.
 * Returns [toastNode, showToast(title, tone?)].
 */
export function useHistoryToast() {
  const [item, setItem] = useState(null);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const showToast = useCallback((title, tone = "positive") => {
    setItem({ title, tone, key: ++toastSeq });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setItem(null), 2400);
  }, []);

  const toastNode = (
    <div className="history-toast-region" aria-live="polite">
      <AnimatePresence>
        {item && (
          <motion.div
            key={item.key}
            initial={toastPreset.initial}
            animate={toastPreset.enter}
            exit={toastPreset.exit}
          >
            <Toast tone={item.tone} title={item.title} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return [toastNode, showToast];
}
