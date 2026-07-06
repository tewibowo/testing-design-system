// Shared helpers for the v2 Activity area (screens/activity/*).
// Kind mapping + date parsing per reference/specs/v2-mobbin-brief.md §2.5;
// toast per §4.8 (slide down from top, auto-dismiss 2s).
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { toast as toastPreset } from "@app/motion/presets.js";

const MONTHS = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
};

/** Parse the db date format "27 Jun 2026, 11:36" into a Date. */
export function parseTxDate(str) {
  const m = /^(\d{1,2}) ([A-Za-z]{3}) (\d{4}), (\d{2}):(\d{2})$/.exec(str || "");
  if (!m || MONTHS[m[2]] === undefined) return null;
  return new Date(Number(m[3]), MONTHS[m[2]], Number(m[1]), Number(m[4]), Number(m[5]));
}

/** Day-group label: "Today" / "Yesterday" / the verbatim date part. */
export function dayLabel(dateStr) {
  const day = (dateStr || "").split(",")[0];
  const d = parseTxDate(dateStr);
  if (!d) return day;
  const start = (x) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const diff = Math.round((start(new Date()) - start(d)) / 864e5);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  return day;
}

/** Classify a db transaction for the §2.5 chips + row icon circles. */
export function txKind(tx) {
  if (tx.tab === "swap") return "swap";
  if (tx.tab === "otc") return "otc";
  if (/mint/i.test(tx.type)) return "mint";
  return tx.direction === "out" ? "withdrawal" : "deposit";
}

/** Brief §2.5.3 icon mapping (otc falls back to the receipt glyph). */
export const KIND_ICONS = {
  deposit: "add",
  withdrawal: "arrow_outward",
  swap: "swap_vert",
  mint: "toll",
  otc: "receipt_long"
};

export const isPendingStatus = (s) => s === "Pending" || s === "Processing";
export const isFailedStatus = (s) => s === "Failed" || s === "Cancelled";

/** Big round figures (100,000 USDC) render without cents, like the tables. */
export function amountDecimals(n) {
  return Number.isInteger(n) && Math.abs(n) >= 1000 ? 0 : 2;
}

/** Date-range options for the filter sheet (Acorns radio-list pattern). */
export const DATE_RANGES = [
  { id: "all", label: "All time", days: null },
  { id: "7d", label: "Last 7 days", days: 7 },
  { id: "30d", label: "Last 30 days", days: 30 },
  { id: "90d", label: "Last 90 days", days: 90 }
];

/** Copy to clipboard — prototype-tolerant (never throws). */
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    /* clipboard unavailable in this context — prototype no-op */
  }
}

let toastSeq = 0;

/**
 * Sheet-local pill toast (ivy text on mint, §2.3 recipe): sticky at the top
 * of the scrolling sheet panel, animated with the shared `toast` preset.
 * Returns [toastNode, showToast(title)].
 */
export function useV2Toast() {
  const [item, setItem] = useState(null);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const showToast = useCallback((title) => {
    setItem({ title, key: ++toastSeq });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setItem(null), 2000);
  }, []);

  const toastNode = (
    <div className="v2activity-toastwrap" aria-live="polite">
      <AnimatePresence>
        {item && (
          <motion.div
            key={item.key}
            className="v2activity-toast"
            initial={toastPreset.initial}
            animate={toastPreset.enter}
            exit={toastPreset.exit}
          >
            {item.title}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return [toastNode, showToast];
}
