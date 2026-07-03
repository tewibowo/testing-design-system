/* ────────────────────────────────────────────────────────────────
 * SWAP — "mintswap/swap" (spec: mint-swap.md §5–§6)
 *
 * ANIMATION STORYBOARD
 *    0ms   screen slides in (stack push)
 *   40ms   swap card + footnote stagger in (listContainer, 50ms apart)
 *  type    To-amount ticks live via <Money> odometer as the rate math runs
 *  flip    HERO: the two coin clusters physically travel between the From
 *          and To selectors (shared layoutId) while the reverse icon spins
 *          180° — one hero element, everything else stays put
 *  preview Confirmation modal scales in (modalCard); "Refreshed in 00:58"
 *          ticks down each second, re-quoting the rate at zero
 *  swap    ~600ms optimistic wait → modal exits fast → SuccessState draws
 *          its check → balances card odometers old → new → popToRoot
 * ──────────────────────────────────────────────────────────────── */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useNav } from "@app/nav/Navigator.jsx";
import { useSheet } from "@app/nav/Sheet.jsx";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import { Money } from "@app/ui/Money.jsx";
import { SuccessState } from "@app/ui/SuccessState.jsx";
import {
  listContainer,
  listItem,
  pressable,
  DUR,
  EASE_BRAND
} from "@app/motion/presets.js";
import { assets, swapRates, fees, fmtMoney } from "@app/data/db.js";
import { AssetMark } from "@ds/components/AssetMark/AssetMark.jsx";
import { Button } from "@ds/components/Button/Button.jsx";
import { IconButton } from "@ds/components/IconButton/IconButton.jsx";
import { baseRate, jitterRate } from "./rates.js";
import { useBalances, applySwap } from "./balances.js";
import { MintswapModal } from "./MintswapModal.jsx";
import { SheetList } from "./parts.jsx";
import "./mintswap.css";

const AMOUNT_RE = /^(\d+\.?\d*|\.\d*)?$/;
// Captured amounts render at one decimal: "10.0 USDT" → "12.9 XSGD" (§6).
const RECEIVE_DECIMALS = 1;

const phaseSwap = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE_BRAND } },
  exit: { opacity: 0, transition: { duration: 0.16, ease: EASE_BRAND } }
};

export function SwapScreen() {
  const nav = useNav();
  const { openSheet } = useSheet();
  const wallet = useBalances();

  // Default pair per the dashboard capture: XSGD → XUSD (§5).
  const [fromId, setFromId] = useState(assets[0].id);
  const [toId, setToId] = useState(assets[1].id);
  const [amountStr, setAmountStr] = useState("");
  const [rate, setRate] = useState(() => baseRate(assets[0].id, assets[1].id));
  const [flips, setFlips] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null); // committed swap → success phase
  const committed = useRef(false);

  const amount = parseFloat(amountStr) || 0;
  const receive = amount * rate;
  const fromBal = wallet[fromId] ?? 0;
  const rateLabel = `1 ${fromId} ≈ ${rate.toFixed(4)} ${toId}`;
  const canPreview = amount > 0 && amount <= fromBal;

  // First quote of a pair is the exact captured rate; while idle on the
  // screen the quote refreshes every minute ("Rate refreshes every minute").
  useEffect(() => {
    setRate(baseRate(fromId, toId));
  }, [fromId, toId]);

  useEffect(() => {
    if (confirmOpen || result) return undefined;
    const t = setInterval(
      () => setRate(jitterRate(baseRate(fromId, toId))),
      60000
    );
    return () => clearInterval(t);
  }, [fromId, toId, confirmOpen, result]);

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

  const confirmSwap = () => {
    if (processing) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setConfirmOpen(false);
      // Credit the quoted (displayed) figure — §6 suggests USDT 23.77 → 13.77
      // and XSGD 0.00 → 12.90 after the captured 10.0 USDT → 12.9 XSGD swap.
      const quoted =
        Math.round(receive * 10 ** RECEIVE_DECIMALS) / 10 ** RECEIVE_DECIMALS;
      setResult({ from: fromId, to: toId, spend: amount, receive: quoted });
    }, 600);
  };

  // Success phase: commit the swap shortly after the check draws so the
  // balances card odometers from the old figures to the new ones.
  useEffect(() => {
    if (!result || committed.current) return undefined;
    const t = setTimeout(() => {
      committed.current = true;
      applySwap(result.from, result.to, result.spend, result.receive);
    }, 600);
    return () => clearTimeout(t);
  }, [result]);

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {!result ? (
          <motion.div
            key="edit"
            className="mintswap-phase"
            variants={phaseSwap}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <AppHeader title="Swap" back />
            <div className="screen-scroll">
              <motion.div
                className="screen-pad mintswap-page"
                variants={listContainer}
                initial="initial"
                animate="enter"
              >
                <motion.section variants={listItem} className="mintswap-card mintswap-swap-card">
                  <LayoutGroup id="mintswap-swap">
                    <SwapLeg
                      label="From"
                      currency={fromId}
                      balance={fromBal}
                      onPick={() => pickAsset("from")}
                    >
                      <input
                        className="mintswap-leg__input"
                        type="text"
                        inputMode="decimal"
                        placeholder="0.00"
                        aria-label={`Amount in ${fromId}`}
                        value={amountStr}
                        onChange={(e) => {
                          if (AMOUNT_RE.test(e.target.value)) setAmountStr(e.target.value);
                        }}
                      />
                      <button
                        type="button"
                        className="mintswap-leg__max"
                        onClick={() => setAmountStr(fromBal > 0 ? String(fromBal) : "")}
                      >
                        Max
                      </button>
                    </SwapLeg>

                    <div className="mintswap-rate-row">
                      <span className="mintswap-rate-chip num">{rateLabel}</span>
                      <motion.span
                        className="mintswap-flip"
                        animate={{ rotate: flips * 180 }}
                        transition={{ duration: DUR.slow, ease: EASE_BRAND }}
                      >
                        <IconButton
                          variant="outline"
                          size="sm"
                          icon="swap_vert"
                          label="Reverse direction"
                          onClick={flip}
                        />
                      </motion.span>
                    </div>

                    <SwapLeg
                      label="To"
                      currency={toId}
                      balance={wallet[toId] ?? 0}
                      onPick={() => pickAsset("to")}
                    >
                      {amount > 0 ? (
                        <Money
                          className="mintswap-leg__num"
                          value={receive}
                          decimals={RECEIVE_DECIMALS}
                        />
                      ) : (
                        <span className="mintswap-leg__num is-zero">0.00</span>
                      )}
                    </SwapLeg>
                  </LayoutGroup>

                  <Button
                    variant="primary"
                    size="lg"
                    className="mintswap-swapbtn"
                    disabled={!canPreview}
                    onClick={() => setConfirmOpen(true)}
                  >
                    {amount > 0 ? "Preview Swap" : "Swap"}
                  </Button>
                  <p className="mintswap-footnote">{swapRates.footnote}</p>
                </motion.section>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            className="mintswap-phase"
            variants={phaseSwap}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <AppHeader title="Swap" />
            <div className="screen-scroll mintswap-success-scroll">
              <SuccessState
                title="Swap successful"
                body={`You swapped ${result.spend.toFixed(RECEIVE_DECIMALS)} ${result.from} for ${result.receive.toFixed(RECEIVE_DECIMALS)} ${result.to}.`}
              >
                <div className="mintswap-balances">
                  <span className="mintswap-balances__title">Updated balances</span>
                  {[result.from, result.to].map((id) => (
                    <div key={id} className="mintswap-balances__row">
                      <AssetMark asset={id} size={28} />
                      <span className="mintswap-balances__sym">{id}</span>
                      <Money
                        className="mintswap-balances__value"
                        value={wallet[id] ?? 0}
                        decimals={2}
                      />
                    </div>
                  ))}
                </div>
                <Button variant="primary" size="lg" onClick={() => nav.popToRoot()}>
                  Back to home
                </Button>
              </SuccessState>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmSwapModal
        open={confirmOpen}
        from={fromId}
        to={toId}
        amount={amount}
        receive={receive}
        rateLabel={rateLabel}
        processing={processing}
        onRequote={() => setRate(jitterRate(baseRate(fromId, toId)))}
        onClose={() => !processing && setConfirmOpen(false)}
        onConfirm={confirmSwap}
      />
    </>
  );
}

/* ── One swap leg: labels row + [amount | asset selector] field ──
 * The coin cluster carries a shared layoutId so a flip sends each cluster
 * travelling to the opposite leg (the transition's hero element). */

function SwapLeg({ label, currency, balance, children, onPick }) {
  return (
    <div className="mintswap-leg">
      <div className="mintswap-leg__labels">
        <span className="mintswap-leg__label">{label}</span>
        <span className="mintswap-leg__balance">
          Balance: <span className="num">{fmtMoney(balance)}</span> {currency}
        </span>
      </div>
      <div className="mintswap-leg__field">
        <div className="mintswap-leg__main">{children}</div>
        <motion.button
          type="button"
          {...pressable}
          className="mintswap-leg__asset"
          onClick={onPick}
          aria-haspopup="dialog"
          aria-label={`Change ${label.toLowerCase()} asset, currently ${currency}`}
        >
          <motion.span
            layoutId={`coin-${currency}`}
            layout="position"
            className="mintswap-leg__coin"
            transition={{ duration: DUR.slow, ease: EASE_BRAND }}
          >
            <AssetMark asset={currency} size={24} />
            <span className="mintswap-leg__sym">{currency}</span>
          </motion.span>
          <span className="material-symbols-rounded mintswap-leg__chevron" aria-hidden="true">
            expand_more
          </span>
        </motion.button>
      </div>
    </div>
  );
}

/* ── Asset picker (bottom sheet) — db assets + live balances ── */

function AssetSheet({ activeId, onSelect }) {
  const wallet = useBalances();
  return (
    <SheetList title="Select Asset:">
      {assets.map((a) => (
        <motion.button
          key={a.id}
          type="button"
          variants={listItem}
          {...pressable}
          className={"mintswap-assetrow" + (a.id === activeId ? " is-selected" : "")}
          onClick={() => onSelect(a.id)}
        >
          <AssetMark asset={a.id} size={32} />
          <span className="mintswap-assetrow__sym">{a.symbol}</span>
          <span className="mintswap-assetrow__bal num">
            {fmtMoney(wallet[a.id] ?? 0)} {a.symbol}
          </span>
          {a.id === activeId && (
            <span className="material-symbols-rounded mintswap-assetrow__check" aria-hidden="true">
              check
            </span>
          )}
        </motion.button>
      ))}
    </SheetList>
  );
}

/* ── Confirmation modal (spec §6, copy verbatim) ──
 * 60s countdown chip; at zero the rate re-quotes and the receive figure
 * odometers to the fresh quote. */

function ConfirmSwapModal({
  open,
  from,
  to,
  amount,
  receive,
  rateLabel,
  processing,
  onRequote,
  onClose,
  onConfirm
}) {
  const [seconds, setSeconds] = useState(swapRates.confirmation.countdownSeconds);
  const requoteRef = useRef(onRequote);
  requoteRef.current = onRequote;

  useEffect(() => {
    if (!open) return undefined;
    setSeconds(swapRates.confirmation.countdownSeconds);
    const t = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          requoteRef.current();
          return swapRates.confirmation.countdownSeconds;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [open]);

  const mmss = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
    seconds % 60
  ).padStart(2, "0")}`;

  return (
    <MintswapModal
      open={open}
      onClose={onClose}
      title="Confirmation"
      footer={
        <>
          <Button variant="secondary" size="lg" disabled={processing} onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="lg" disabled={processing} onClick={onConfirm}>
            Swap Now
          </Button>
        </>
      }
    >
      <p className="mintswap-modal__copy">
        Please confirm if the following information is correct before proceeding.
      </p>
      <div className="mintswap-confirm">
        <div className="mintswap-confirm__row">
          <span className="mintswap-confirm__label">You will spend</span>
          <span className="mintswap-confirm__value">
            <Money value={amount} decimals={RECEIVE_DECIMALS} suffix={` ${from}`} />
          </span>
        </div>
        <div className="mintswap-confirm__row">
          <span className="mintswap-confirm__label">Swap fee</span>
          <span className="mintswap-confirm__value">{fees.swap}</span>
        </div>
        <div className="mintswap-confirm__row">
          <span className="mintswap-confirm__label">Conversion rate</span>
          <span className="mintswap-confirm__value num">{rateLabel}</span>
        </div>
        <div className="mintswap-confirm__subrow">
          <span className="mintswap-refresh">
            Refreshed in <span className="mintswap-refresh__time">{mmss}</span>
          </span>
        </div>
        <div className="mintswap-confirm__row">
          <span className="mintswap-confirm__label">You will be getting</span>
          <span className="mintswap-confirm__value">
            <Money value={receive} decimals={RECEIVE_DECIMALS} suffix={` ${to}`} />
          </span>
        </div>
      </div>
    </MintswapModal>
  );
}
