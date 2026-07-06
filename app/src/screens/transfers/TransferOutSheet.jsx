/* ────────────────────────────────────────────────────────────────
 * TRANSFER OUT — step-by-step bottom sheet (replaces the long
 * TransferOutScreen page; design feedback: "all flows of transfer
 * in & out can be a bottom sheet step by step"). Per the same
 * feedback the amount step lets the user pick WHICH stablecoin to
 * withdraw via an inline asset chip (swap-page picker language).
 * Data verbatim from db.js (banks, wallets, balances, fees).
 *
 * STEP MAP   destination → amount → review → success   (dots 1…4/4)
 *
 * ANIMATION STORYBOARD
 *    0ms  sheet springs up; destination rows stagger 50ms apart
 *  tap    row presses 0.97 → step slides 24px left (SheetSteps
 *         popLayout, sheet height glides). Back reverses travel.
 *  chip   asset list expands (height 0 → auto, 200ms), rows stagger,
 *         chevron rotates 180°; picking an asset collapses it and
 *         the balance line odometers to the new figure (<Money>)
 *  type   figures render tabular; on overdraw the amount shakes
 *         x ±8px (420ms), balance line turns critical + helper text
 *         explains the fix, CTA disables
 *  tap    "Review transfer" → 600ms in-button ring → review rows
 *         stagger in (back stays live outside the commit window)
 *  tap    "Confirm transfer" → 600ms "Sending…" ring → success:
 *         circle pops, check draws (360ms @ 180ms), copy rises
 *  done   "Done" closes the sheet
 * ──────────────────────────────────────────────────────────────── */
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "motion/react";
import { useNav } from "@app/nav/Navigator.jsx";
import { Money } from "@app/ui/Money.jsx";
import { SheetStepHeader, SheetSteps } from "@app/ui/SheetSteps.jsx";
import { listContainer, listItem, pressable, DUR, EASE_BRAND } from "@app/motion/presets.js";
import { balances, banks, blockchainAddresses, fees, fmtMoney, networks, truncAddr } from "@app/data/db.js";
import { AssetMark } from "@ds/components/AssetMark/AssetMark.jsx";
import { CommitButton, FlowRow, SHEET_TIMING, SheetSuccess, useCommit } from "./sheetParts.jsx";
import "./transfers.css";

const TIMING = {
  commit: SHEET_TIMING.commit,
  assetList: DUR.base,
  shake: 0.42
};

const STEPS = {
  dest: { title: "Transfer out", step: 1 },
  amount: { title: "Enter amount", step: 2 },
  review: { title: "Review", step: 3 },
  success: { title: "On its way", step: 4 }
};
const TOTAL = 4;
const BACK_OF = { amount: "dest", review: "amount" };

const balanceOf = (asset) =>
  parseFloat(balances.assets.find((a) => a.asset === asset)?.balance) || 0;

export function TransferOutSheet({ close, asset: initialAsset = "XSGD" }) {
  const nav = useNav();
  const [{ step, dir }, setPos] = useState({ step: "dest", dir: 1 });
  const [dest, setDest] = useState(null);
  const [asset, setAsset] = useState(
    balances.assets.some((a) => a.asset === initialAsset) ? initialAsset : "XSGD"
  );
  const [amountStr, setAmountStr] = useState("");
  const { busy, commit } = useCommit(TIMING.commit);

  const go = (next) => setPos({ step: next, dir: 1 });
  const backTo = (prev) => setPos({ step: prev, dir: -1 });

  const meta = STEPS[step];
  // Back always works mid-flow — except during the 600ms commit and once
  // the transfer is submitted (success step).
  const onBack = !busy && BACK_OF[step] ? () => backTo(BACK_OF[step]) : undefined;

  const amountNum = parseFloat(amountStr) || 0;

  // Unverified destinations continue in their verify flows (full screens) —
  // close the sheet first so the pushed screen isn't hidden behind it.
  const verifyVia = (route) => {
    close();
    nav.push(route);
  };

  return (
    <div className="transfers-flow">
      <SheetStepHeader title={meta.title} onBack={onBack} step={meta.step} total={TOTAL} />
      <SheetSteps stepKey={step} direction={dir}>
        {step === "dest" && (
          <DestStep
            onBank={(b) => {
              setDest({ kind: "bank", name: b.name, sub: b.account });
              go("amount");
            }}
            onWallet={(w) => {
              setDest({
                kind: "wallet",
                name: w.provider,
                sub: truncAddr(w.address),
                network: networks.find((n) => n.name === w.networks[0]) ?? networks[0]
              });
              go("amount");
            }}
            onVerifyBank={() => verifyVia("account/banks-verify")}
            onVerifyWallet={() => verifyVia("blockchain/verify")}
          />
        )}
        {step === "amount" && (
          <AmountStep
            asset={asset}
            onAsset={setAsset}
            amountStr={amountStr}
            onAmount={setAmountStr}
            busy={busy}
            onReview={() => commit(() => go("review"))}
          />
        )}
        {step === "review" && (
          <ReviewStep
            dest={dest}
            asset={asset}
            amount={amountNum}
            busy={busy}
            onConfirm={() => commit(() => go("success"))}
          />
        )}
        {step === "success" && (
          <SuccessStep dest={dest} asset={asset} amount={amountNum} onDone={close} />
        )}
      </SheetSteps>
    </div>
  );
}

/** One-liner for call sites: openTransferOut(openSheet, { asset? }). */
export function openTransferOut(openSheet, opts = {}) {
  const asset = (opts.asset ?? "XSGD").toUpperCase();
  openSheet(({ close }) => <TransferOutSheet close={close} asset={asset} />);
}

/* ── Step 1 — saved destinations (db banks + wallets, order verbatim) ── */

function DestStep({ onBank, onWallet, onVerifyBank, onVerifyWallet }) {
  return (
    <motion.div className="transfers-step" variants={listContainer} initial="initial" animate="enter">
      <motion.p variants={listItem} className="transfers-lead">
        Where should we send your funds?
      </motion.p>
      <motion.span variants={listItem} className="transfers-overline">
        Bank accounts
      </motion.span>
      {banks.linked.map((b) => {
        const verified = b.status === "Verified";
        return (
          <FlowRow
            key={b.account}
            icon="account_balance"
            title={b.name}
            sub={b.account}
            subMono
            trailing={verified ? undefined : <span className="transfers-verify">Verify</span>}
            onClick={() => (verified ? onBank(b) : onVerifyBank())}
          />
        );
      })}
      <motion.span variants={listItem} className="transfers-overline">
        Blockchain wallets
      </motion.span>
      {blockchainAddresses.linked.map((w) => {
        const verified = w.status === "Verified";
        return (
          <FlowRow
            key={w.id}
            lead={<AssetMark asset={w.provider} size={40} />}
            title={w.provider}
            sub={truncAddr(w.address)}
            subMono
            trailing={verified ? undefined : <span className="transfers-verify">Verify</span>}
            onClick={() => (verified ? onWallet(w) : onVerifyWallet())}
          />
        );
      })}
    </motion.div>
  );
}

/* ── Step 2 — pick the stablecoin + amount ── */

function AmountStep({ asset, onAsset, amountStr, onAmount, busy, onReview }) {
  const [open, setOpen] = useState(false);
  const shake = useAnimationControls();

  const balance = balanceOf(asset);
  const amountNum = parseFloat(amountStr) || 0;
  const over = amountNum > balance;
  const valid = amountNum > 0 && !over;

  // Overdraw acknowledgement: shake once each time the amount tips over.
  useEffect(() => {
    if (over) {
      shake.start({
        x: [0, -8, 8, -5, 5, 0],
        transition: { duration: TIMING.shake, ease: "easeOut" }
      });
    }
  }, [over, shake]);

  const sanitize = (e) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    const [head, ...rest] = raw.split(".");
    onAmount(rest.length > 0 ? head + "." + rest.join("").slice(0, 2) : raw);
  };

  return (
    <motion.div className="transfers-step" variants={listContainer} initial="initial" animate="enter">
      {/* Asset chip — swap-page picker language: mark + ticker + chevron */}
      <motion.div variants={listItem} className="transfers-assetpick">
        <motion.button
          type="button"
          {...pressable}
          className="transfers-assetchip"
          aria-expanded={open}
          aria-label={`Change asset, currently ${asset}`}
          disabled={busy}
          onClick={() => setOpen((o) => !o)}
        >
          <AssetMark asset={asset} size={20} />
          <span className="transfers-assetchip__sym">{asset}</span>
          <motion.span
            className="material-symbols-rounded transfers-assetchip__chev"
            aria-hidden="true"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: TIMING.assetList, ease: EASE_BRAND }}
          >
            expand_more
          </motion.span>
        </motion.button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              className="transfers-assetlist"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: TIMING.assetList, ease: EASE_BRAND }}
            >
              <motion.div
                className="transfers-assetlist__inner"
                variants={listContainer}
                initial="initial"
                animate="enter"
              >
                {balances.assets.map((a) => (
                  <motion.button
                    key={a.asset}
                    type="button"
                    variants={listItem}
                    {...pressable}
                    className={"transfers-assetrow" + (a.asset === asset ? " is-selected" : "")}
                    onClick={() => {
                      onAsset(a.asset);
                      setOpen(false);
                    }}
                  >
                    <AssetMark asset={a.asset} size={28} />
                    <span className="transfers-assetrow__sym">{a.asset}</span>
                    <span className="transfers-assetrow__bal">
                      {fmtMoney(parseFloat(a.balance) || 0)} {a.asset}
                    </span>
                    {a.asset === asset && (
                      <span
                        className="material-symbols-rounded transfers-assetrow__check"
                        aria-hidden="true"
                      >
                        check
                      </span>
                    )}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Big tabular amount */}
      <motion.div variants={listItem}>
        <motion.div className="transfers-bigamount" animate={shake}>
          <input
            className={"transfers-bigamount__input" + (amountStr.length > 9 ? " is-long" : "")}
            inputMode="decimal"
            placeholder="0.00"
            value={amountStr}
            disabled={busy}
            onChange={sanitize}
            aria-label={`Withdrawal amount in ${asset}`}
            aria-invalid={over || undefined}
          />
          <span className="transfers-bigamount__rule" aria-hidden="true" />
        </motion.div>
      </motion.div>

      {/* Balance + Max */}
      <motion.div variants={listItem} className={"transfers-balline" + (over ? " is-over" : "")}>
        <span>
          Balance: <Money value={balance} suffix={` ${asset}`} />
        </span>
        <motion.button
          type="button"
          {...pressable}
          className="transfers-maxchip"
          disabled={busy}
          onClick={() => onAmount(balance.toFixed(2))}
        >
          Max
        </motion.button>
      </motion.div>
      <AnimatePresence>
        {over && (
          <motion.p
            className="transfers-overnote"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: DUR.base, ease: EASE_BRAND }}
          >
            That&rsquo;s more than you have — you can send up to {fmtMoney(balance)} {asset}.
          </motion.p>
        )}
      </AnimatePresence>

      <motion.div variants={listItem}>
        <CommitButton busy={busy} busyLabel="Preparing…" disabled={!valid} onClick={onReview}>
          Review transfer
        </CommitButton>
      </motion.div>
    </motion.div>
  );
}

/* ── Step 3 — review (recipient / asset / amount / fee / net) ── */

function ReviewStep({ dest, asset, amount, busy, onConfirm }) {
  const isBank = dest.kind === "bank";
  // Only 0.00 network fees were captured for Transfer Out; bank fee "Free".
  const netSuffix = isBank && asset === "XSGD" ? " SGD" : ` ${asset}`;
  return (
    <motion.div className="transfers-step" variants={listContainer} initial="initial" animate="enter">
      <div className="transfers-factcard">
        <motion.div variants={listItem} className="transfers-fact">
          <span>To</span>
          <span className="transfers-fact__value">
            <strong>{dest.name}</strong>
            <em>{dest.sub}</em>
          </span>
        </motion.div>
        {!isBank && (
          <>
            <motion.div variants={listItem} className="transfers-fact">
              <span>Network</span>
              <span className="transfers-fact__net">
                <AssetMark asset={dest.network.assetId} size={18} />
                <strong>{dest.network.name}</strong>
              </span>
            </motion.div>
            <motion.div variants={listItem} className="transfers-fact">
              <span>Processing time</span>
              <span className="transfers-fact__value">
                {dest.network.processingTime ?? fees.blockchainTransferIn.processingTime}
              </span>
            </motion.div>
          </>
        )}
        <motion.div variants={listItem} className="transfers-fact">
          <span>Asset</span>
          <span className="transfers-fact__net">
            <AssetMark asset={asset} size={18} />
            <strong>{asset}</strong>
          </span>
        </motion.div>
        <motion.div variants={listItem} className="transfers-fact">
          <span>Amount</span>
          <span className="transfers-fact__value">
            <Money value={amount} suffix={` ${asset}`} />
          </span>
        </motion.div>
        <motion.div variants={listItem} className="transfers-fact">
          <span>{isBank ? "Transfer fee" : "Network fee"}</span>
          <span className="transfers-fact__value">
            {isBank ? fees.bankTransferIn.fee : <Money value={0} suffix={` ${asset}`} />}
          </span>
        </motion.div>
        <motion.div variants={listItem} className="transfers-factcard__divider" />
        <motion.div variants={listItem} className="transfers-fact transfers-fact--net">
          <span>You&rsquo;ll receive</span>
          <span className="transfers-fact__value">
            <Money value={amount} suffix={netSuffix} />
          </span>
        </motion.div>
      </div>
      {isBank && asset === "XSGD" && (
        <motion.p variants={listItem} className="transfers-facts">
          Your XSGD will be converted 1:1 for SGD
        </motion.p>
      )}
      <motion.div variants={listItem}>
        <CommitButton busy={busy} busyLabel="Sending…" onClick={onConfirm}>
          Confirm transfer
        </CommitButton>
      </motion.div>
    </motion.div>
  );
}

/* ── Step 4 — success (copy verbatim from the previous flow) ── */

function SuccessStep({ dest, asset, amount, onDone }) {
  return (
    <SheetSuccess
      title="Transfer submitted"
      body={
        <>
          Your withdrawal of <Money value={amount} suffix={` ${asset}`} animateOnMount /> to{" "}
          {dest.name} is being processed. You&rsquo;ll get an email once it is completed.
        </>
      }
    >
      <CommitButton onClick={onDone}>Done</CommitButton>
    </SheetSuccess>
  );
}
