/* ────────────────────────────────────────────────────────────────
 * TRANSFER IN — step-by-step bottom sheet (replaces the long
 * TransferInScreen page; design feedback: "all flows of transfer
 * in & out can be a bottom sheet step by step").
 * Copy is verbatim from reference/specs/transfers.md §2–§5 / db.js.
 *
 * STEP MAP
 *   method ──┬─→ bank ──→ awaiting          (dots 2/3 → 3/3)
 *            └─→ chain — "Done" closes      (dots 2/2)
 *
 * ANIMATION STORYBOARD
 *    0ms  sheet springs up (nav chrome), header title fades in
 *   40ms  method rows stagger up, 50ms apart (listContainer)
 *  tap    row presses to 0.97 → step slides 24px (SheetSteps
 *         popLayout: incoming enters while outgoing exits; sheet
 *         height glides via layout). Back reverses the travel.
 *  tap    "I've transferred" → 600ms in-button ring (back hidden —
 *         the commit is the only uninterruptible moment)
 *  next   awaiting step: rocket circle pops (scale .6 → 1),
 *         rocket rises 10px behind its cloud, copy rises staggered
 *  done   "Back to home" closes the sheet (spring down, scrim fades)
 * ──────────────────────────────────────────────────────────────── */
import { useState } from "react";
import { motion } from "motion/react";
import { SheetStepHeader, SheetSteps } from "@app/ui/SheetSteps.jsx";
import { listContainer, listItem, EASE_BRAND } from "@app/motion/presets.js";
import { banks, blockchainAddresses, fees, limits, networks } from "@app/data/db.js";
import { AssetMark } from "@ds/components/AssetMark/AssetMark.jsx";
import { Copybox } from "@ds/components/Copybox/Copybox.jsx";
import { QR } from "@ds/components/QR/QR.jsx";
// .field / .field__label styles used by Copybox's label markup:
import "@ds/components/Input/Input.css";
import {
  CommitButton,
  FlowNote,
  FlowRow,
  InlineLink,
  SHEET_TIMING,
  useCommit,
  useFlowNote
} from "./sheetParts.jsx";
import "./transfers.css";

const TIMING = {
  commit: SHEET_TIMING.commit,
  rocketPop: 0.32,
  rocketRise: 0.32,
  copy: 0.24,
  copyStep: 0.08
};

// Header meta per step. Method shows no dots yet (the path — 2 or 3 steps —
// is only known once a method is chosen); branches show honest totals.
const STEPS = {
  method: { title: "Transfer in", step: 1, total: 1 },
  bank: { title: "Bank transfer", step: 2, total: 3 },
  awaiting: { title: "Almost there", step: 3, total: 3 },
  chain: { title: "Blockchain deposit", step: 2, total: 2 }
};

export function TransferInSheet({ close, asset = "XSGD" }) {
  const [{ step, dir }, setPos] = useState({ step: "method", dir: 1 });
  const { busy, commit } = useCommit(TIMING.commit);
  const { note, notify } = useFlowNote();

  const go = (next) => setPos({ step: next, dir: 1 });
  const backTo = (prev) => setPos({ step: prev, dir: -1 });

  const meta = STEPS[step];
  // Back always works mid-flow — except during the 600ms commit, and on the
  // terminal awaiting step (the transfer is already acknowledged).
  const onBack =
    !busy && (step === "bank" || step === "chain") ? () => backTo("method") : undefined;

  return (
    <div className="transfers-flow">
      <SheetStepHeader title={meta.title} onBack={onBack} step={meta.step} total={meta.total} />
      <SheetSteps stepKey={step} direction={dir}>
        {step === "method" && (
          <MethodStep asset={asset} onBank={() => go("bank")} onChain={() => go("chain")} />
        )}
        {step === "bank" && (
          <BankStep busy={busy} onTransferred={() => commit(() => go("awaiting"))} />
        )}
        {step === "chain" && <ChainStep asset={asset} onDone={close} />}
        {step === "awaiting" && (
          <AwaitingStep
            onSupport={() => notify("Support is available on the web dashboard")}
            onDone={close}
          />
        )}
      </SheetSteps>
      <FlowNote note={note} />
    </div>
  );
}

/** One-liner for call sites: openTransferIn(openSheet, { asset? }). */
export function openTransferIn(openSheet, opts = {}) {
  const asset = (opts.asset ?? "XSGD").toUpperCase();
  openSheet(({ close }) => <TransferInSheet close={close} asset={asset} />);
}

/* ── Step 1 — choose how the money comes in ── */

function MethodStep({ asset, onBank, onChain }) {
  return (
    <motion.div className="transfers-step" variants={listContainer} initial="initial" animate="enter">
      <motion.p variants={listItem} className="transfers-lead">
        How would you like to add funds?
      </motion.p>
      <FlowRow
        icon="account_balance"
        title="Bank transfer (FAST)"
        sub="Free · Instant · SGD converts 1:1 to XSGD"
        onClick={onBank}
      />
      <FlowRow
        icon="account_balance_wallet"
        title="Blockchain deposit"
        sub={`Send ${asset} on Ethereum from any wallet`}
        onClick={onChain}
      />
    </motion.div>
  );
}

/* ── Step 2a — FAST details as copy-rows (spec §4, values verbatim) ── */

function BankStep({ busy, onTransferred }) {
  const d = banks.transferIn; // TEWIBOWO / Xfers Pte Ltd / 3225-6257-7650-1 / FAST
  // "200,000 SGD per txn." (db verbatim) → compact "200,000 SGD/txn" fact.
  const maxFact = limits.bankTransferIn.maximumAmount.replace(" per txn.", "/txn");
  return (
    <motion.div className="transfers-step" variants={listContainer} initial="initial" animate="enter">
      <motion.p variants={listItem} className="transfers-lead">
        Make a <strong>{d.method}</strong> transfer using the details below:
      </motion.p>
      <motion.div variants={listItem}>
        <Copybox label="Recipient Name" value={d.recipientName} buttonVariant="icon" />
      </motion.div>
      <motion.div variants={listItem}>
        <Copybox label="Bank Name" value={d.bankName} buttonVariant="icon" />
      </motion.div>
      <motion.div variants={listItem}>
        <Copybox
          label="Bank Account Number"
          info={banks.vanHelper}
          value={d.accountNumber}
          buttonVariant="icon"
        />
      </motion.div>
      <motion.p variants={listItem} className="transfers-facts">
        {fees.bankTransferIn.fee} · {fees.bankTransferIn.processingTime} · {maxFact}
      </motion.p>
      <motion.div variants={listItem}>
        <CommitButton busy={busy} busyLabel="Confirming…" onClick={onTransferred}>
          I&rsquo;ve transferred
        </CommitButton>
      </motion.div>
    </motion.div>
  );
}

/* ── Step 2b — blockchain deposit: QR + address + fee notes (spec §3) ── */

function ChainStep({ asset, onDone }) {
  const { address, network: networkName } = blockchainAddresses.deposit;
  const network = networks.find((n) => n.name === networkName) ?? networks[0];
  // Fee/limit strings were captured for XSGD only — keep the figures, swap
  // the ticker so per-asset entries (USDT "+" etc.) stay coherent.
  const forAsset = (s) => s.replace("XSGD", asset);
  return (
    <motion.div className="transfers-step" variants={listContainer} initial="initial" animate="enter">
      <div className="transfers-step__scroll">
        <motion.p variants={listItem} className="transfers-instruction">
          Send your{" "}
          <AssetMark asset={asset} size={18} className="transfers-inline-mark" />{" "}
          <strong>{asset}</strong> to the{" "}
          <AssetMark asset={network.assetId} size={18} className="transfers-inline-mark" />{" "}
          <strong>{network.name}</strong> address below:
        </motion.p>
        <motion.div variants={listItem} className="transfers-qr-wrap">
          <QR value={address} size={148} />
        </motion.div>
        <motion.div variants={listItem}>
          <Copybox
            value={address}
            logo={<AssetMark asset={network.assetId} size={20} />}
            buttonVariant="icon"
            truncate
          />
        </motion.div>
        <motion.div variants={listItem} className="transfers-factcard">
          <div className="transfers-fact">
            <span>Processing time</span>
            <span className="transfers-fact__value">{fees.blockchainTransferIn.processingTime}</span>
          </div>
          <div className="transfers-fact">
            <span>Minimum amount</span>
            <span className="transfers-fact__value">
              {forAsset(limits.blockchainTransferIn.minimumAmount)}
            </span>
          </div>
          <div className="transfers-fact">
            <span>Transfer fee</span>
            <span className="transfers-fact__value">
              {forAsset(fees.blockchainTransferIn.fee)}
              <em>{forAsset(fees.blockchainTransferIn.feeNote)}</em>
            </span>
          </div>
        </motion.div>
      </div>
      <motion.div variants={listItem}>
        <CommitButton onClick={onDone}>Done</CommitButton>
      </motion.div>
    </motion.div>
  );
}

/* ── Step 3 — awaiting funds (spec §5, copy verbatim incl. the authentic
 * "2-5 business funds") ── */

function AwaitingStep({ onSupport, onDone }) {
  const rise = (i) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: TIMING.copy, ease: EASE_BRAND, delay: 0.24 + i * TIMING.copyStep }
  });
  return (
    <div className="transfers-step transfers-step--center">
      <motion.div
        className="transfers-rocket"
        aria-hidden="true"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: TIMING.rocketPop, ease: EASE_BRAND }}
      >
        <span className="transfers-rocket__cloud" />
        <motion.span
          className="material-symbols-rounded transfers-rocket__icon"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: TIMING.rocketRise, ease: EASE_BRAND, delay: 0.14 }}
        >
          rocket_launch
        </motion.span>
      </motion.div>
      <motion.h3 className="transfers-await__title" {...rise(0)}>
        We are awaiting your funds
      </motion.h3>
      <motion.p className="transfers-await__text" {...rise(1)}>
        Once arrived, your SGD funds will be converted to XSGD at 1:1 with no fees. Please
        allow up to 2-5 business funds to be reflected in your account. You&rsquo;ll get an
        email once it is credited.
      </motion.p>
      <motion.p className="transfers-await__help" {...rise(2)}>
        Need help? <InlineLink onClick={onSupport}>Contact Support</InlineLink> anytime
      </motion.p>
      <motion.div className="transfers-ctafoot" {...rise(3)}>
        <CommitButton onClick={onDone}>Back to home</CommitButton>
      </motion.div>
    </div>
  );
}
