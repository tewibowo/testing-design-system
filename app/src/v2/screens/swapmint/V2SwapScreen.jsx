/* ────────────────────────────────────────────────────────────────
 * V2 SWAP — "v2/swap" (brief §2.2; motion §4.1/.2/.5/.6/.7)
 *
 * Keypad-first swap push: two stacked signed amount cards, seam swap
 * button, live-rate line, preset chips, shared keypad.
 *
 * ANIMATION STORYBOARD
 *    0ms   screen slides in (stack push)
 *   40ms   rate line → cards → chips → CTA → keypad stagger (50ms)
 *  type    keypad key flashes + pay amount ticks 1→1.02→1 (DUR.fast);
 *          receive amount re-ticks live via <Money> odometer
 *  flip    seam button rotates 180° (DUR.slow) while both asset chips
 *          travel to the opposite card via shared layoutId
 *  0:00    mint dot pulses opacity 1→0.3→1 (DUR.modal); countdown digits
 *          swap with a 4px fade-rise (DUR.base); rate re-quotes
 *  review  bottom sheet: pay/receive/rate/fee rows; "Swap now" commits by
 *          press-and-hold — mint fill wipes 600ms linear, release-early
 *          reverts with SETTLE
 *  done    sheet closes → full-screen SuccessState on ivy → updated
 *          balances odometer old → new → popToRoot
 * ──────────────────────────────────────────────────────────────── */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useNav } from "@app/nav/Navigator.jsx";
import { useSheet } from "@app/nav/Sheet.jsx";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import { Money } from "@app/ui/Money.jsx";
import { SuccessState } from "@app/ui/SuccessState.jsx";
import { Keypad, applyKey } from "@app/v2/core/Keypad.jsx";
import {
  listContainer,
  listItem,
  pressable,
  DUR,
  EASE_BRAND
} from "@app/motion/presets.js";
import { assets, swapRates, fees, fmtMoney } from "@app/data/db.js";
import { AssetMark } from "@ds/components/AssetMark/AssetMark.jsx";
import { baseRate, jitterRate } from "@app/screens/mintswap/rates.js";
import { useBalances, applySwap } from "@app/screens/mintswap/balances.js";
import { HoldPill } from "./parts.jsx";
import "./v2swapmint-shared.css";
import "./v2swapmint-swap.css";

const MAX_LEN = 10; // keeps the 32px mono amount inside the card
const PRESETS = [
  { label: "25", factor: 0.25 },
  { label: "50", factor: 0.5 },
  { label: "Max", factor: 1 }
];

const phase = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE_BRAND } },
  exit: { opacity: 0, transition: { duration: 0.16, ease: EASE_BRAND } }
};

export function V2SwapScreen() {
  const nav = useNav();
  const { openSheet } = useSheet();
  const wallet = useBalances();

  // Default pair per the dashboard capture: XSGD → XUSD.
  const [fromId, setFromId] = useState(assets[0].id);
  const [toId, setToId] = useState(assets[1].id);
  const [amountStr, setAmountStr] = useState("");
  const [rate, setRate] = useState(() => baseRate(assets[0].id, assets[1].id));
  const [seconds, setSeconds] = useState(swapRates.confirmation.countdownSeconds);
  const [quoteId, setQuoteId] = useState(0); // bumps per re-quote → dot pulse
  const [flips, setFlips] = useState(0);
  const [tick, setTick] = useState(0); // bumps per keypad key → amount tick
  const [result, setResult] = useState(null); // committed swap → success phase
  const committed = useRef(false);

  const amount = parseFloat(amountStr) || 0;
  const receive = amount * rate;
  const fromBal = wallet[fromId] ?? 0;
  const receiveSgd = receive * baseRate(toId, "XSGD"); // SGD converts 1:1 to XSGD
  const rateLabel = `1 ${fromId} ≈ ${rate.toFixed(4)} ${toId}`;
  const overdrawn = amount > fromBal;
  const canReview = amount > 0 && !overdrawn;
  const mmss = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

  // Fresh exact quote whenever the pair changes (first quote = captured rate).
  useEffect(() => {
    setRate(baseRate(fromId, toId));
    setSeconds(swapRates.confirmation.countdownSeconds);
    setQuoteId((q) => q + 1);
  }, [fromId, toId]);

  // Live countdown ("Refreshes in 0:58"); paused once the swap committed.
  useEffect(() => {
    if (result) return undefined;
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [result]);

  // At 0:00 re-quote (±0.15% wobble) and restart the minute (§2.2.2, §4.6).
  useEffect(() => {
    if (seconds > 0) return;
    setRate(jitterRate(baseRate(fromId, toId)));
    setSeconds(swapRates.confirmation.countdownSeconds);
    setQuoteId((q) => q + 1);
  }, [seconds, fromId, toId]);

  const flip = () => {
    setFlips((f) => f + 1);
    setFromId(toId);
    setToId(fromId);
  };

  const chooseAsset = (leg, id) => {
    if (leg === "from") {
      if (id === toId) flip();
      else setFromId(id);
    } else if (id === fromId) flip();
    else setToId(id);
  };

  const pickAsset = (leg) => {
    const activeId = leg === "from" ? fromId : toId;
    openSheet(({ close }) => (
      <AssetSheet
        activeId={activeId}
        onSelect={(id) => {
          chooseAsset(leg, id);
          close();
        }}
      />
    ));
  };

  const onKey = (k) => {
    setAmountStr((s) => {
      const next = applyKey(s, k, 2);
      return next.length > MAX_LEN ? s : next;
    });
    setTick((t) => t + 1);
  };

  const preset = (factor) => {
    setAmountStr(
      fromBal > 0 ? (Math.floor(fromBal * factor * 100) / 100).toFixed(2) : "0"
    );
    setTick((t) => t + 1);
  };

  // Review sheet — the quote is frozen at open (§2.2.8).
  const openReview = () => {
    const quote = {
      from: fromId,
      to: toId,
      spend: amount,
      receive: Math.round(receive * 100) / 100,
      rateLabel
    };
    openSheet(({ close }) => (
      <ReviewSheet
        quote={quote}
        onCommit={() => {
          close();
          setResult(quote);
        }}
      />
    ));
  };

  // Success phase: commit shortly after the check draws so the balance
  // figures odometer from the old values to the new ones.
  useEffect(() => {
    if (!result || committed.current) return undefined;
    const t = setTimeout(() => {
      committed.current = true;
      applySwap(result.from, result.to, result.spend, result.receive);
    }, 600);
    return () => clearTimeout(t);
  }, [result]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {!result ? (
        <motion.div
          key="edit"
          className="v2swapmint-phase"
          variants={phase}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <AppHeader title="Swap" back large />
          <motion.div
            className="v2swapmint-editor"
            variants={listContainer}
            initial="initial"
            animate="enter"
          >
            {/* Live rate line: pulsing mint dot + mono countdown (§2.2.2) */}
            <motion.div variants={listItem} className="screen-pad v2swapmint-rate">
              <span className="v2swapmint-rate__live">
                <motion.span
                  key={quoteId}
                  className="v2swapmint-rate__dot"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: DUR.modal, ease: EASE_BRAND }}
                  aria-hidden="true"
                />
                <span className="v2swapmint-rate__pair money">{rateLabel}</span>
              </span>
              <span className="v2swapmint-rate__count money">
                Refreshes in{" "}
                <span className="v2swapmint-rate__mmss">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={mmss}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: DUR.base, ease: EASE_BRAND }}
                    >
                      {mmss}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>
            </motion.div>

            {/* Two teal amount cards + ivy seam button (§2.2.3–4) */}
            <motion.div variants={listItem} className="screen-pad">
              <div className="v2swapmint-cards">
                <LayoutGroup id="v2swapmint">
                  <AmountCard
                    leg="pay"
                    assetId={fromId}
                    onPick={() => pickAsset("from")}
                    subline={
                      <>
                        Balance <span className="money">{fmtMoney(fromBal)}</span>
                      </>
                    }
                    sublineCritical={overdrawn}
                  >
                    <motion.span
                      key={tick}
                      className="v2swapmint-amount__tick"
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: DUR.fast, ease: EASE_BRAND }}
                    >
                      <span className="v2swapmint-amount__sign">−</span>
                      {amountStr ? (
                        amountStr
                      ) : (
                        <span className="is-zero">0</span>
                      )}
                    </motion.span>
                  </AmountCard>

                  <motion.button
                    type="button"
                    className="v2swapmint-seam"
                    {...pressable}
                    onClick={flip}
                    aria-label="Reverse swap direction"
                  >
                    <motion.span
                      className="material-symbols-rounded"
                      animate={{ rotate: flips * 180 }}
                      transition={{ duration: DUR.slow, ease: EASE_BRAND }}
                      aria-hidden="true"
                    >
                      swap_vert
                    </motion.span>
                  </motion.button>

                  <AmountCard
                    leg="receive"
                    assetId={toId}
                    onPick={() => pickAsset("to")}
                    subline={
                      <>
                        ≈ <span className="money">{fmtMoney(receiveSgd)}</span> SGD
                      </>
                    }
                  >
                    <span
                      className={
                        "v2swapmint-amount__receive" + (amount > 0 ? "" : " is-zero")
                      }
                    >
                      +<Money value={receive} decimals={2} />
                    </span>
                  </AmountCard>
                </LayoutGroup>
              </div>
            </motion.div>

            <div className="v2swapmint-flex" />

            {/* 25 / 50 / Max preset chips (§2.2.5) */}
            <motion.div variants={listItem} className="v2-presets">
              {PRESETS.map((p) => (
                <motion.button
                  key={p.label}
                  type="button"
                  className="v2-chip"
                  {...pressable}
                  onClick={() => preset(p.factor)}
                >
                  {p.label}
                </motion.button>
              ))}
            </motion.div>

            {/* CTA above keypad (§2.2.7) */}
            <motion.div variants={listItem} className="screen-pad v2swapmint-ctarow">
              <motion.button
                type="button"
                className="v2swapmint-cta"
                disabled={!canReview}
                {...pressable}
                onClick={openReview}
              >
                Review swap
              </motion.button>
            </motion.div>

            <motion.div variants={listItem}>
              <Keypad onKey={onKey} />
            </motion.div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="success"
          className="v2swapmint-phase v2swapmint-success"
          variants={phase}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <AppHeader title="Swap" />
          <div className="screen-scroll v2swapmint-success__scroll">
            <SuccessState
              title="Swap successful"
              body={`You swapped ${fmtMoney(result.spend)} ${result.from} for ${fmtMoney(result.receive)} ${result.to}.`}
            >
              <div className="v2-card v2swapmint-balances">
                <span className="v2swapmint-balances__title">Updated balances</span>
                {[result.from, result.to].map((id) => (
                  <div key={id} className="v2swapmint-balances__row">
                    <AssetMark asset={id} size={28} />
                    <span className="v2swapmint-balances__sym">{id}</span>
                    <Money
                      className="v2swapmint-balances__value"
                      value={wallet[id] ?? 0}
                      decimals={2}
                    />
                  </div>
                ))}
              </div>
              <motion.button
                type="button"
                className="v2swapmint-cta"
                {...pressable}
                onClick={() => nav.popToRoot()}
              >
                Done
              </motion.button>
            </SuccessState>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── One amount card: asset chip left, signed amount right, subline ──
 * The chip's coin cluster carries a shared layoutId so a flip sends each
 * cluster travelling to the opposite card (§4.5 — the transition's hero). */

function AmountCard({ leg, assetId, onPick, subline, sublineCritical = false, children }) {
  return (
    <div className={`v2-card v2swapmint-card v2swapmint-card--${leg}`}>
      <div className="v2swapmint-card__top">
        <motion.button
          type="button"
          className="v2swapmint-assetchip"
          {...pressable}
          onClick={onPick}
          aria-haspopup="dialog"
          aria-label={`Change ${leg} asset, currently ${assetId}`}
        >
          <motion.span
            layoutId={`v2swapmint-coin-${assetId}`}
            layout="position"
            className="v2swapmint-assetchip__coin"
            transition={{ duration: DUR.slow, ease: EASE_BRAND }}
          >
            <AssetMark asset={assetId} size={24} />
            <span className="v2swapmint-assetchip__sym">{assetId}</span>
          </motion.span>
          <span
            className="material-symbols-rounded v2swapmint-assetchip__chev"
            aria-hidden="true"
          >
            expand_more
          </span>
        </motion.button>
        <div className="v2swapmint-amount money">{children}</div>
      </div>
      <div className={"v2swapmint-card__sub" + (sublineCritical ? " is-critical" : "")}>
        {subline}
      </div>
    </div>
  );
}

/* ── Asset picker sheet — db assets with live balances ── */

function AssetSheet({ activeId, onSelect }) {
  const wallet = useBalances();
  return (
    <div className="v2swapmint-sheet">
      <h3 className="v2swapmint-sheet__title">Select asset</h3>
      <motion.div variants={listContainer} initial="initial" animate="enter">
        {assets.map((a) => (
          <motion.button
            key={a.id}
            type="button"
            variants={listItem}
            {...pressable}
            className={"v2swapmint-pickrow" + (a.id === activeId ? " is-active" : "")}
            onClick={() => onSelect(a.id)}
          >
            <AssetMark asset={a.id} size={32} />
            <span className="v2swapmint-pickrow__sym">{a.symbol}</span>
            <span className="v2swapmint-pickrow__bal money">
              {fmtMoney(wallet[a.id] ?? 0)}
            </span>
            {a.id === activeId && (
              <span
                className="material-symbols-rounded v2swapmint-pickrow__check"
                aria-hidden="true"
              >
                check_circle
              </span>
            )}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Review sheet (§2.2.8): summary rows + press-and-hold commit (§4.7) ── */

function ReviewSheet({ quote, onCommit }) {
  const rows = [
    {
      label: "Pay",
      value: `−${fmtMoney(quote.spend)} ${quote.from}`
    },
    {
      label: "Receive",
      value: `+${fmtMoney(quote.receive)} ${quote.to}`,
      mint: true
    },
    { label: "Rate", value: quote.rateLabel },
    { label: "Fee", value: fees.swap }
  ];

  return (
    <div className="v2swapmint-review">
      <h3 className="v2swapmint-sheet__title">Review swap</h3>
      <motion.div variants={listContainer} initial="initial" animate="enter">
        {rows.map((r) => (
          <motion.div key={r.label} variants={listItem} className="v2swapmint-review__row">
            <span className="v2swapmint-review__label">{r.label}</span>
            <span className={"v2swapmint-review__value money" + (r.mint ? " is-mint" : "")}>
              {r.value}
            </span>
          </motion.div>
        ))}
        <motion.div variants={listItem} className="v2swapmint-review__cta">
          <HoldPill onCommit={onCommit}>Swap now</HoldPill>
          <p className="v2swapmint-review__hint">Press and hold to confirm</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
