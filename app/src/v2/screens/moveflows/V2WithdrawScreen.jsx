// v2/withdraw — keypad-first withdraw flow (brief §2.4, Satispay order):
// recipient list → giant-caret amount + balance chip + keypad → review push
// → SuccessState. All three steps live on the one canonical route; the
// amount and review steps are real stack pushes of "v2/withdraw" with a
// `step` param, so edge-swipe back and parallax come for free.
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "motion/react";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import { SuccessState } from "@app/ui/SuccessState.jsx";
import { useNav } from "@app/nav/Navigator.jsx";
import { Keypad, applyKey } from "@app/v2/core/Keypad.jsx";
import {
  balances,
  banks,
  blockchainAddresses,
  fees,
  fmtMoney,
  truncAddr
} from "@app/data/db.js";
import { DUR, EASE_BRAND, listContainer, listItem, pressable } from "@app/motion/presets.js";
import { MoveToastLayer, useMoveToast } from "./shared.jsx";
import "./v2moveflows-withdraw.css";

/* Saved recipients — assembled from db (banks.linked / blockchainAddresses).
   Fees and arrival reuse db.fees rails (the only rails captured). */
const savedBank = banks.linked[0]; // Bank Mandiri · Verified
const savedWallet = blockchainAddresses.linked.find((a) => a.id === "metamask");

const RECIPIENTS = [
  {
    id: "bank-mandiri",
    icon: "account_balance",
    name: savedBank.name,
    subLabel: "Bank account",
    subMono: `····${savedBank.account.slice(-4)}`,
    fee: fees.bankTransferIn.fee, // "Free"
    feeNum: 0,
    arrival: fees.bankTransferIn.processingTime // "Instant"
  },
  {
    id: "metamask",
    icon: "account_balance_wallet",
    name: savedWallet.provider,
    subLabel: savedWallet.networks[0], // "Ethereum"
    subMono: truncAddr(savedWallet.address),
    fee: fees.blockchainTransferIn.fee, // "0.5 XSGD"
    feeNum: parseFloat(fees.blockchainTransferIn.fee),
    arrival: fees.blockchainTransferIn.processingTime // "6 Confirmations"
  }
];

// The one funded asset in db — USDT 23.77.
const funded = balances.assets.find((a) => a.asset === "USDT");
const BALANCE = parseFloat(funded.balance);

export function V2WithdrawScreen({ params }) {
  if (params.step === "amount") return <AmountStep recipientId={params.recipientId} />;
  if (params.step === "review") {
    return <ReviewStep recipientId={params.recipientId} amount={params.amount} />;
  }
  return <RecipientStep />;
}

/* ── Step 1: recipient (§2.4.1) ─────────────────────────────────────────── */

function RecipientStep() {
  const nav = useNav();
  const { note, showToast, clearToast } = useMoveToast();
  const [query, setQuery] = useState("");

  const matches = RECIPIENTS.filter((r) =>
    r.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <>
      <AppHeader title="Withdraw" back />
      <div className="screen-scroll">
        <motion.div
          className="screen-pad"
          variants={listContainer}
          initial="initial"
          animate="enter"
        >
          <motion.div variants={listItem} className="v2-card v2mf-search">
            <span className="material-symbols-rounded" aria-hidden="true">search</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search recipients"
              aria-label="Search recipients"
            />
          </motion.div>

          <motion.div variants={listItem} className="v2-card v2mf-recips">
            <motion.button
              {...pressable}
              className="v2mf-recip"
              onClick={() => showToast("Available on the web dashboard")}
            >
              <span className="v2mf-recip__icon">
                <span className="material-symbols-rounded" aria-hidden="true">add</span>
              </span>
              <span>
                <div className="v2mf-recip__name">Add new</div>
                <div className="v2mf-recip__sub">Bank account or wallet address</div>
              </span>
              <span className="material-symbols-rounded v2mf-recip__chev" aria-hidden="true">
                chevron_right
              </span>
            </motion.button>
          </motion.div>

          <motion.div variants={listItem} className="v2mf-eyebrow">Saved</motion.div>
          <motion.div variants={listItem} className="v2-card v2mf-recips">
            {matches.map((r) => (
              <motion.button
                key={r.id}
                {...pressable}
                className="v2mf-recip"
                onClick={() => nav.push("v2/withdraw", { step: "amount", recipientId: r.id })}
              >
                <span className="v2mf-recip__icon">
                  <span className="material-symbols-rounded" aria-hidden="true">{r.icon}</span>
                </span>
                <span>
                  <div className="v2mf-recip__name">{r.name}</div>
                  <div className="v2mf-recip__sub">
                    {r.subLabel} · <span className="money">{r.subMono}</span>
                  </div>
                </span>
                <span className="material-symbols-rounded v2mf-recip__chev" aria-hidden="true">
                  chevron_right
                </span>
              </motion.button>
            ))}
            {matches.length === 0 && (
              <div className="v2mf-empty">No recipients found</div>
            )}
          </motion.div>
        </motion.div>
      </div>
      <MoveToastLayer note={note} onClear={clearToast} />
    </>
  );
}

/* ── Step 2: amount (§2.4.2 — giant caret amount, balance chip, keypad) ── */

function AmountStep({ recipientId }) {
  const nav = useNav();
  const recipient = RECIPIENTS.find((r) => r.id === recipientId) ?? RECIPIENTS[0];
  const [amount, setAmount] = useState("");
  const heroCtrl = useAnimationControls();

  const value = parseFloat(amount || "0");
  const over = value > BALANCE;
  const canReview = value > 0 && !over;

  const setPreset = (fraction) => {
    // Floor to cents so presets never overdraw.
    const next = (Math.floor(BALANCE * fraction * 100) / 100).toFixed(2);
    setAmount(next);
    heroCtrl.start({
      scale: [1, 1.02, 1],
      transition: { duration: DUR.fast, ease: EASE_BRAND }
    });
  };

  const onKey = (k) => {
    const next = applyKey(amount, k);
    if (next === amount) return;
    setAmount(next);
    if (parseFloat(next || "0") > BALANCE) {
      // §4.9 — one ±4px correction, 120ms, brand ease. Not an oscillation.
      heroCtrl.start({
        x: [0, -4, 4, 0],
        transition: { duration: 0.12, ease: EASE_BRAND }
      });
    } else if (k !== "back") {
      // §4.1 — keypad tick: 1.0 → 1.02 → 1.0, a tick, not a pop.
      heroCtrl.start({
        scale: [1, 1.02, 1],
        transition: { duration: DUR.fast, ease: EASE_BRAND }
      });
    }
  };

  const headerChip = (
    <span className="v2mf-hdrchip">
      <span className="v2mf-hdrchip__icon">
        <span className="material-symbols-rounded" aria-hidden="true">{recipient.icon}</span>
      </span>
      {recipient.name}
    </span>
  );

  return (
    <>
      <AppHeader title={headerChip} back />
      <div className="v2mf-amtwrap">
        <div className="v2mf-hero">
          <motion.div
            animate={heroCtrl}
            className={"v2mf-amt" + (over ? " is-over" : "")}
          >
            <span className="v2mf-amt__ccy">{funded.asset}</span>
            <span className="v2mf-amt__digits money">{amount || "0"}</span>
            <span className="v2mf-caret" aria-hidden="true" />
          </motion.div>
          <motion.button
            {...pressable}
            className="v2-chip v2mf-balchip"
            onClick={() => setPreset(1)}
          >
            Balance <span className="money">{funded.balance}</span> {funded.asset}
            <span className="v2mf-balchip__sep">·</span>
            <span className="v2mf-balchip__max">Max</span>
          </motion.button>
        </div>

        <div className="v2-presets">
          <motion.button {...pressable} className="v2-chip" onClick={() => setPreset(0.25)}>
            25%
          </motion.button>
          <motion.button {...pressable} className="v2-chip" onClick={() => setPreset(0.5)}>
            50%
          </motion.button>
          <motion.button {...pressable} className="v2-chip" onClick={() => setPreset(1)}>
            Max
          </motion.button>
        </div>

        <div className="v2mf-ctapad">
          <motion.button
            {...pressable}
            className="v2mf-pill v2mf-pill--primary"
            disabled={!canReview}
            onClick={() =>
              nav.push("v2/withdraw", {
                step: "review",
                recipientId: recipient.id,
                amount: value.toFixed(2)
              })
            }
          >
            Review
          </motion.button>
        </div>

        <Keypad onKey={onKey} />
      </div>
    </>
  );
}

/* ── Step 3: review push → success (§2.4.3) ─────────────────────────────── */

function ReviewStep({ recipientId, amount }) {
  const nav = useNav();
  const recipient = RECIPIENTS.find((r) => r.id === recipientId) ?? RECIPIENTS[0];
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const amtNum = parseFloat(amount);
  const net = Math.max(amtNum - recipient.feeNum, 0);

  const rows = useMemo(
    () => [
      { label: "To", value: recipient.name },
      { label: "Amount", value: `${fmtMoney(amtNum)} ${funded.asset}` },
      { label: "Fee", value: recipient.fee },
      { label: "Arrival", value: recipient.arrival }
    ],
    [recipient, amtNum]
  );

  const submit = () => {
    setBusy(true);
    setTimeout(() => setDone(true), 600); // fake async, then success
  };

  return (
    <>
      {!done && <AppHeader title="Review" back />}
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key="review"
            className="v2mf-reviewwrap"
            exit={{ opacity: 0, transition: { duration: 0.13, ease: EASE_BRAND } }}
          >
            <div className="screen-scroll">
              <motion.div
                className="screen-pad"
                variants={listContainer}
                initial="initial"
                animate="enter"
              >
                <motion.div variants={listItem} className="v2-card v2mf-sum">
                  {rows.map((row) => (
                    <div key={row.label} className="v2mf-sumrow">
                      <span className="v2mf-sumrow__label">{row.label}</span>
                      <span className="v2mf-sumrow__value">{row.value}</span>
                    </div>
                  ))}
                  <div className="v2mf-sumrow v2mf-sumrow--total">
                    <span className="v2mf-sumrow__label">Net amount</span>
                    <span className="v2mf-sumrow__value">
                      {fmtMoney(net)} {funded.asset}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            <div className="cta-bar">
              <motion.button
                {...pressable}
                className="v2mf-pill v2mf-pill--primary"
                disabled={busy}
                onClick={submit}
              >
                Withdraw now
              </motion.button>
              <p className="v2mf-compliance">
                Withdrawals can only be made to bank accounts and wallet
                addresses in your own name.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="done"
            className="v2mf-success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: DUR.base, ease: EASE_BRAND } }}
          >
            <SuccessState
              title="Withdrawal submitted"
              body={`${fmtMoney(amtNum)} ${funded.asset} is on its way to ${recipient.name}.`}
            >
              <motion.button
                {...pressable}
                className="v2mf-pill v2mf-pill--primary"
                onClick={() => nav.popToRoot()}
              >
                Done
              </motion.button>
            </SuccessState>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
