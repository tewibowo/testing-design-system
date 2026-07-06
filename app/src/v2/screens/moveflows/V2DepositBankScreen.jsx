// v2/deposit/bank — FAST copy-rows branch of Deposit (brief §2.3, Stake
// anatomy): label-over-mono rows with trailing copy buttons, gold info
// callout (VAN helper), two compliance trust notes.
import { motion } from "motion/react";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import { banks, limits, mint } from "@app/data/db.js";
import { listContainer, listItem, pressable } from "@app/motion/presets.js";
import { MoveToastLayer, copyText, useMoveToast } from "./shared.jsx";
import "./v2moveflows-deposit.css";

// FAST deposit details — db.banks.transferIn (VAN + recipient, verbatim).
// No reference value was captured for FAST-to-VAN transfers; the VAN itself
// identifies the account, so the row reads "Not required".
const ROWS = [
  { label: "Payee name", value: banks.transferIn.recipientName },
  { label: "Bank", value: banks.transferIn.bankName },
  { label: "Account number", value: banks.transferIn.accountNumber },
  { label: "Reference", value: "Not required" }
];

const NOTES = [
  {
    icon: "verified_user",
    // db.mint.steps[1] verbatim — the compliance line StraitsX already uses.
    text: mint.steps[1].text
  },
  {
    icon: "schedule",
    // Composed from db.fees.bankTransferIn.processingTime ("Instant") and
    // db.limits.bankTransferIn.conversion (verbatim sentence).
    text: `FAST transfers are credited instantly. ${limits.bankTransferIn.conversion}.`
  }
];

export function V2DepositBankScreen() {
  const { note, showToast, clearToast } = useMoveToast();

  const onCopy = (row) => {
    copyText(row.value);
    showToast(`${row.label} copied`);
  };

  return (
    <>
      <AppHeader title="Bank transfer" back />
      <div className="screen-scroll">
        <motion.div
          className="screen-pad"
          variants={listContainer}
          initial="initial"
          animate="enter"
        >
          <motion.p variants={listItem} className="v2mf-lead">
            Make a <strong>{banks.transferIn.method}</strong> transfer using the
            details below:
          </motion.p>

          <motion.div variants={listItem} className="v2-card v2mf-copyrows">
            {ROWS.map((row) => (
              <div key={row.label} className="v2mf-copyrow">
                <div>
                  <div className="v2mf-copyrow__label">{row.label}</div>
                  <div className="v2mf-copyrow__value">{row.value}</div>
                </div>
                <motion.button
                  {...pressable}
                  className="v2mf-copybtn"
                  aria-label={`Copy ${row.label.toLowerCase()}`}
                  onClick={() => onCopy(row)}
                >
                  <span className="material-symbols-rounded" aria-hidden="true">
                    content_copy
                  </span>
                </motion.button>
              </div>
            ))}
          </motion.div>

          <motion.div variants={listItem} className="v2-card v2mf-callout">
            <span className="material-symbols-rounded" aria-hidden="true">info</span>
            <p>{banks.vanHelper}</p>
          </motion.div>

          <motion.div variants={listItem} className="v2mf-notes">
            {NOTES.map((n) => (
              <div key={n.icon} className="v2mf-note">
                <span className="material-symbols-rounded" aria-hidden="true">
                  {n.icon}
                </span>
                <p>{n.text}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      <MoveToastLayer note={note} onClear={clearToast} />
    </>
  );
}
