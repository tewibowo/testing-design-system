/* ────────────────────────────────────────────────
 * ANIMATION STORYBOARD — transaction detail sheet (brief §2.5.5, §4.13)
 *     0ms   sheet rises 320ms (host-owned; drag-release settles with
 *           SETTLE, bounce 0 — also host-owned)
 *    40ms   sections stagger 50ms apart (fade + 12px rise)
 *   ~40ms   amount hero odometer counts up (600ms, Money)
 *   copy    pill toast slides down from the sheet top, dismisses at 2s
 * ──────────────────────────────────────────────── */
import { motion } from "motion/react";
import { Money } from "@app/ui/Money.jsx";
import { truncAddr } from "@app/data/db.js";
import { listContainer, listItem, pressable } from "@app/motion/presets.js";
import {
  isPendingStatus,
  isFailedStatus,
  amountDecimals,
  copyText,
  useV2Toast
} from "./shared.jsx";
import "./v2activity-sheets.css";

/**
 * Bottom-sheet transaction detail — NOT a push (§2.5.5). Every captured db
 * field for the transaction renders here; blockchain items get a secondary
 * "View on explorer" pill. No cross-version links.
 */
export function V2ActivityDetailSheet({ tx }) {
  const [toastNode, showToast] = useV2Toast();
  const d = tx.detail ?? {};
  const failed = isFailedStatus(tx.status);
  const pending = isPendingStatus(tx.status);
  const credit = tx.direction === "in";

  const heroTone = failed ? " is-failed" : credit ? " is-credit" : "";
  const statusTone = failed ? "is-failed" : pending ? "is-pending" : "is-positive";
  const statusIcon = failed ? "close" : pending ? "schedule" : "check_circle";

  const copy = (text, label) => {
    copyText(text);
    showToast(label);
  };

  return (
    <motion.div
      className="v2activity-detail"
      variants={listContainer}
      initial="initial"
      animate="enter"
    >
      {toastNode}

      <motion.div className="v2activity-detail__head" variants={listItem}>
        <span className="v2activity-detail__type">{tx.type}</span>
        {tx.description && (
          <span className="v2activity-detail__desc">{tx.description}</span>
        )}
      </motion.div>

      {tx.amount != null && tx.asset && (
        <motion.div
          className={"v2activity-detail__hero" + heroTone}
          variants={listItem}
        >
          <Money
            value={tx.amount}
            decimals={amountDecimals(tx.amount)}
            prefix={credit ? "+" : "−"}
            suffix={` ${tx.asset}`}
            animateOnMount
          />
        </motion.div>
      )}

      <motion.div className="v2activity-detail__statusrow" variants={listItem}>
        <span className={`v2activity-status ${statusTone}`}>
          <span className="material-symbols-rounded" aria-hidden="true">
            {statusIcon}
          </span>
          {tx.status}
        </span>
      </motion.div>

      <motion.div className="v2activity-detail__rows" variants={listItem}>
        <DetailRow label="Transaction ID">
          <span title={tx.id}>{truncAddr(tx.id)}</span>
          <CopyButton
            label="Copy transaction ID"
            onCopy={() => copy(tx.id, "Transaction ID copied")}
          />
        </DetailRow>

        {d.hash && (
          <DetailRow label="Hash">
            <span title={d.hash}>{truncAddr(d.hash)}</span>
            <CopyButton
              label="Copy transaction hash"
              onCopy={() => copy(d.hash, "Hash copied")}
            />
          </DetailRow>
        )}

        {tx.tab === "funding" && <DetailRow label="Network">{tx.network ?? "-"}</DetailRow>}

        {tx.tab === "swap" && (
          <>
            <DetailRow label="Pair">{d.pair}</DetailRow>
            <DetailRow label="Sell">{d.sell}</DetailRow>
            <DetailRow label="Buy">{d.buy}</DetailRow>
            <DetailRow label="Price">{d.price}</DetailRow>
            <DetailRow label="Fee">{d.fee}</DetailRow>
          </>
        )}

        {tx.tab === "otc" && (
          <>
            <DetailRow label="Pair">{d.pair}</DetailRow>
            <DetailRow label="Sell">{d.sell}</DetailRow>
            <DetailRow label="Buy">{d.buy}</DetailRow>
            <DetailRow label="Rate">{d.rate ?? "-"}</DetailRow>
          </>
        )}

        <DetailRow label="Created">{d.createdDate ?? tx.date}</DetailRow>
        {d.completedDate && <DetailRow label="Completed">{d.completedDate}</DetailRow>}
        {d.details && d.details !== "-" && (
          <DetailRow label="Details">{d.details}</DetailRow>
        )}
      </motion.div>

      {d.totalAmount && (
        <motion.div className="v2activity-detail__breakdown" variants={listItem}>
          <div className="v2activity-drow">
            <span className="v2activity-drow__label">Total amount</span>
            <span className="v2activity-drow__value">{d.totalAmount}</span>
          </div>
          <div className="v2activity-drow">
            <span className="v2activity-drow__label">Fee</span>
            <span className="v2activity-drow__value">{d.fee}</span>
          </div>
          <div className="v2activity-drow v2activity-drow--net">
            <span className="v2activity-drow__label">Net amount</span>
            <span className="v2activity-drow__value">{d.netAmount}</span>
          </div>
        </motion.div>
      )}

      {d.hash && (
        <motion.button
          type="button"
          variants={listItem}
          {...pressable}
          className="v2activity-detail__explorer"
          onClick={() => showToast("Not available in this prototype")}
        >
          <span className="material-symbols-rounded" aria-hidden="true">
            open_in_new
          </span>
          View on explorer
        </motion.button>
      )}
    </motion.div>
  );
}

/* ── Label-left / mono-value-right summary row (as in §2.4 review) ── */

function DetailRow({ label, children }) {
  return (
    <div className="v2activity-drow">
      <span className="v2activity-drow__label">{label}</span>
      <span className="v2activity-drow__value">{children}</span>
    </div>
  );
}

function CopyButton({ label, onCopy }) {
  return (
    <button
      type="button"
      className="v2activity-copy"
      aria-label={label}
      onClick={onCopy}
    >
      <span className="material-symbols-rounded">content_copy</span>
    </button>
  );
}
