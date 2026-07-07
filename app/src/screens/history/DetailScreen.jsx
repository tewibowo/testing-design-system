/* ────────────────────────────────────────────────
 * ANIMATION STORYBOARD — Transaction detail (history/detail)
 *     0ms   screen slides in iOS-style (shell-owned — root not animated)
 *    40ms   content cards stagger in 50ms apart (fade + 12px rise)
 *  ~40ms    hero: "Total Amount" odometer counts up to +13.78 (600ms)
 * ──────────────────────────────────────────────── */
import { motion } from "motion/react";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import { transactions, truncAddr } from "@app/data/db.js";
import { listContainer, listItem, pressable } from "@app/motion/presets.js";
import { Tag } from "@ds/components/Tag/Tag.jsx";
import { Copybox } from "@ds/components/Copybox/Copybox.jsx";
import { EmptyState } from "@ds/components/EmptyState/EmptyState.jsx";
import { STATUS_TONES, MoneyText, copyText, useHistoryToast } from "./shared.jsx";
import "./history.css";

/**
 * Transaction detail — canonical route "history/detail", params { txId }.
 * Spec §4 captured the funding record c40…070a2 in full; swap/OTC rows get
 * the same treatment built from their captured table columns (§2.3 / §3.3).
 */
export function TransactionDetailScreen({ params }) {
  const tx = transactions.find((t) => t.id === params?.txId);
  const [toastNode, showToast] = useHistoryToast();

  if (!tx) {
    return (
      <>
        <AppHeader title="Transaction Details" back />
        <div className="screen-scroll">
          <div className="screen-pad">
            <div className="history-detail-missing">
              <EmptyState
                title="Transaction not found"
                sub="This transaction is no longer available."
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  const d = tx.detail ?? {};
  const tone = STATUS_TONES[tx.status] ?? "neutral";
  // Row 2's type reads "Admin Transfer to" / "Straitsx Account" across two
  // lines in the table — joined here so the detail row reads as one phrase.
  const typeValue = tx.type.endsWith(" to") ? `${tx.type} ${tx.description}` : tx.type;

  const copyHash = () => {
    copyText(d.hash);
    showToast("Copied");
  };
  const infoToast = () => showToast("Times are shown in Singapore time (SGT).", "info");
  const linkToast = () => showToast("Not available in this prototype", "info");

  const cardTitle =
    tx.tab === "swap" ? "Swap Details" : tx.tab === "otc" ? "Request Details" : "Transaction Details";

  return (
    <>
      <AppHeader title="Transaction Details" back />
      <div className="screen-scroll">
        <motion.div
          className="screen-pad history-detail"
          variants={listContainer}
          initial="initial"
          animate="enter"
        >
          <motion.div variants={listItem}>
            <Copybox
              label="Transaction ID"
              value={tx.id}
              truncate
              buttonVariant="icon"
            />
          </motion.div>

          {/* Amount Details first on mobile — the number users look for (§4.5) */}
          {d.totalAmount && (
            <motion.section className="history-dcard" variants={listItem}>
              <h3 className="history-dcard__title">Amount Details</h3>
              <div className="history-dcard__divider" />
              <SummaryRow label="Total Amount" strong>
                <MoneyText str={d.totalAmount} animateOnMount />
              </SummaryRow>
              <SummaryRow label="Fee">
                <MoneyText str={d.fee} />
              </SummaryRow>
              <div className="history-dcard__divider" />
              <SummaryRow label="Net Amount" strong>
                <MoneyText str={d.netAmount} />
              </SummaryRow>
            </motion.section>
          )}

          <motion.section className="history-dcard" variants={listItem}>
            <header className="history-dcard__head">
              <h3 className="history-dcard__title">{cardTitle}</h3>
              <Tag tone={tone}>{tx.status}</Tag>
            </header>
            <div className="history-dcard__divider" />

            {tx.tab === "funding" && (
              <div className="history-attrs">
                <AttrField label="Transaction Hash">
                  {d.hash ? (
                    <span className="history-hashrow">
                      <motion.button
                        {...pressable}
                        type="button"
                        className="history-hashlink"
                        title={d.hash}
                        onClick={linkToast}
                      >
                        {truncAddr(d.hash)}
                      </motion.button>
                      <button
                        type="button"
                        className="history-copy"
                        aria-label="Copy transaction hash"
                        onClick={copyHash}
                      >
                        <span className="material-symbols-rounded">content_copy</span>
                      </button>
                    </span>
                  ) : (
                    "-"
                  )}
                </AttrField>
                <AttrField label="Network">{tx.network ?? "-"}</AttrField>
                <AttrField label="Transaction Type">{typeValue}</AttrField>
                <AttrField label="Created Date" info onInfo={infoToast}>
                  {d.createdDate ?? tx.date}
                </AttrField>
                <AttrField label="Completed Date" info onInfo={infoToast}>
                  {d.completedDate ?? "-"}
                </AttrField>
                <AttrField label="Details">{d.details ?? "-"}</AttrField>
              </div>
            )}

            {tx.tab === "swap" && (
              <div className="history-attrs">
                <AttrField label="Details">{tx.description}</AttrField>
                <AttrField label="Pair">{d.pair}</AttrField>
                <AttrField label="Sell">
                  <MoneyText str={d.sell} />
                </AttrField>
                <AttrField label="Buy">
                  <MoneyText str={d.buy} />
                </AttrField>
                <AttrField label="Price">
                  <MoneyText str={d.price} />
                </AttrField>
                <AttrField label="Fee">
                  <MoneyText str={d.fee} />
                </AttrField>
                <AttrField label="Created Date">{tx.date}</AttrField>
              </div>
            )}

            {tx.tab === "otc" && (
              <div className="history-attrs">
                <AttrField label="Pair">{d.pair}</AttrField>
                <AttrField label="Amount to Sell">
                  <MoneyText str={d.sell} />
                </AttrField>
                <AttrField label="Amount to Buy">
                  <MoneyText str={d.buy} />
                </AttrField>
                <AttrField label="Rate">{d.rate ?? "-"}</AttrField>
                <AttrField label="Created Date">{tx.date}</AttrField>
              </div>
            )}
          </motion.section>

          {/* Help line below the cards (§4.2), verbatim */}
          <motion.p className="history-helpline" variants={listItem}>
            <span className="material-symbols-rounded" aria-hidden="true">
              lightbulb
            </span>
            <span>
              Need help?{" "}
              <button type="button" className="history-link" onClick={linkToast}>
                Learn more
              </button>{" "}
              about how payment transaction processing works
            </span>
          </motion.p>
        </motion.div>
      </div>

      {toastNode}
    </>
  );
}

/* ── Label-above-value attribute row (§4.6) ─────────────────────── */

function AttrField({ label, info = false, onInfo, children }) {
  return (
    <div className="history-attr">
      <span className="history-attr__label">
        {label}
        {info && (
          <motion.button
            {...pressable}
            type="button"
            className="history-info"
            aria-label={`About ${label.toLowerCase()}`}
            onClick={onInfo}
          >
            <span className="material-symbols-rounded">info</span>
          </motion.button>
        )}
      </span>
      <span className="history-attr__value">{children}</span>
    </div>
  );
}

/* ── Label-left / value-right summary row (Amount Details) ──────── */

function SummaryRow({ label, strong = false, children }) {
  return (
    <div className={"history-drow" + (strong ? " history-drow--strong" : "")}>
      <span className="history-drow__label">{label}</span>
      <span className="history-drow__value">{children}</span>
    </div>
  );
}
