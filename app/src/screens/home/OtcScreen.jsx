/* ────────────────────────────────────────────────
 * ANIMATION STORYBOARD — OTC request flow (intro → form → confirm → done)
 *    0ms   screen slides in (stack push, handled by shell)
 *   step   change: outgoing step fades out fast (130ms, popLayout);
 *          incoming step fades in + rises 12px (240ms, brand ease)
 *  submit  "Submit Request" → ~600ms fake processing → SuccessState:
 *          circle pops (320ms) → check draws (360ms, overlapping)
 *          → copy + action stagger in
 * ──────────────────────────────────────────────── */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNav } from "@app/nav/Navigator.jsx";
import { useSheet } from "@app/nav/Sheet.jsx";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import { Money } from "@app/ui/Money.jsx";
import { SuccessState } from "@app/ui/SuccessState.jsx";
import { pressable, DUR, EASE_BRAND } from "@app/motion/presets.js";
import { assets, otc, fmtMoney } from "@app/data/db.js";
import { AssetMark } from "@ds/components/AssetMark/AssetMark.jsx";
import { Button } from "@ds/components/Button/Button.jsx";
import { IconButton } from "@ds/components/IconButton/IconButton.jsx";
import { useHomeToast } from "./useHomeToast.jsx";
import "./home.css";

const ASSET_CAPTIONS = { XSGD: "1:1 to SGD", XUSD: "1:1 to USD" };

const stepVariants = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE_BRAND } },
  exit: { opacity: 0, transition: { duration: 0.13, ease: EASE_BRAND } }
};

const parseAmount = (s) => Number(String(s).replace(/[^0-9]/g, "") || 0);

function AssetPickerSheet({ heading, options, selected, onPick, close }) {
  return (
    <div className="home-otc-sheet">
      <h3 className="home-sheet__title">{heading}</h3>
      {options.map((a) => (
        <motion.button
          key={a.id}
          {...pressable}
          className="home-sheet__option"
          onClick={() => {
            onPick(a.id);
            close();
          }}
        >
          <AssetMark asset={a.id} size={32} />
          <span className="home-sheet__opt-main">
            <span className="home-sheet__opt-label">{a.symbol}</span>
            {ASSET_CAPTIONS[a.id] && (
              <span className="home-sheet__opt-cap">{ASSET_CAPTIONS[a.id]}</span>
            )}
          </span>
          {selected === a.id && (
            <span className="material-symbols-rounded" aria-hidden="true">check</span>
          )}
        </motion.button>
      ))}
    </div>
  );
}

export function OtcScreen() {
  const nav = useNav();
  const { openSheet } = useSheet();
  const [toastNode, showToast] = useHomeToast();

  const [step, setStep] = useState("intro"); // intro | form | confirm | done
  // Form starts in the captured Step-3 state (history-otc.md §7.3): direction
  // "Buy", amount empty, amount asset USDC, counter asset XSGD, Next disabled.
  // (The spec's Step-4 example — Sell 100,000 USDC → USDT — is what the user
  // types to reach the captured confirmation; db.otc.request keeps its
  // fee/processing constants.)
  const [direction, setDirection] = useState("Buy");
  const [amount, setAmount] = useState("");
  const [amountAsset, setAmountAsset] = useState("USDC");
  const [counterAsset, setCounterAsset] = useState("XSGD");
  const [submitting, setSubmitting] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Minimum request amount: USD 100K, or SGD 140K when the requested
  // asset is the SGD stablecoin (otc.minimums, verbatim in the helper).
  const minAmount = amountAsset === "XSGD" ? 140000 : 100000;
  const amountNum = parseAmount(amount);
  const amountValid = amountNum >= minAmount;
  const showMinError = amountNum > 0 && !amountValid;

  const caption = `You are ${direction === "Sell" ? "selling" : "buying"} ${
    amount || "0"
  } ${amountAsset} in exchange for ${counterAsset}`;

  const handleAmountChange = (e) => {
    const digits = e.target.value.replace(/[^0-9]/g, "").slice(0, 12);
    setAmount(digits ? fmtMoney(Number(digits), 0) : "");
  };

  const pickAmountAsset = () =>
    openSheet(({ close }) => (
      <AssetPickerSheet
        heading="Select asset"
        options={assets.filter((a) => a.id !== counterAsset)}
        selected={amountAsset}
        onPick={setAmountAsset}
        close={close}
      />
    ));

  const pickCounterAsset = () =>
    openSheet(({ close }) => (
      <AssetPickerSheet
        heading="With your"
        options={assets.filter((a) => a.id !== amountAsset)}
        selected={counterAsset}
        onPick={setCounterAsset}
        close={close}
      />
    ));

  const copyEmail = () => {
    try {
      navigator.clipboard?.writeText(otc.email);
    } catch {
      /* clipboard unavailable in some webviews — toast still confirms */
    }
    showToast("Copied");
  };

  const submit = () => {
    setSubmitting(true);
    timer.current = setTimeout(() => setStep("done"), 600);
  };

  /* ---- Submitted state ---- */
  if (step === "done") {
    return (
      <div className="home-wrap">
        <SuccessState
          title="OTC request submitted"
          body="Our OTC Trading Desk will respond within 1 business day via Email / WhatsApp / Telegram. You can track this request in Transaction History under the OTC Request tab."
        >
          <Button variant="primary" size="lg" onClick={() => nav.popToRoot()}>
            Back to home
          </Button>
        </SuccessState>
        {toastNode}
      </div>
    );
  }

  /* ---- Step content ---- */
  let content = null;
  let footer = null;

  if (step === "intro") {
    content = (
      <>
        <h1 className="home-otc__title home-otc__title--center">
          Request an OTC Trading Quote
        </h1>
        {/* Spot illustration (web shows two figures beside a dollar coin —
            adapted to a simple brand-tinted glyph for mobile) */}
        <div className="home-otc__illo" aria-hidden="true">
          <div className="home-otc__illo-circle">
            <span className="material-symbols-rounded">handshake</span>
            <span className="home-otc__illo-coin">
              <span className="material-symbols-rounded">attach_money</span>
            </span>
          </div>
        </div>
        <p className="home-otc__lead">{otc.introLead}</p>
        <div className="home-otc__steps">
          {otc.introSteps.map((text, i) => (
            <div className="home-otc__step" key={i}>
              <span className="home-otc__stepnum">{i + 1}</span>
              <p className="home-otc__steptext">{text}</p>
            </div>
          ))}
        </div>
        <div className="home-otc__contact">
          <div className="home-otc__contact-row">
            <span className="home-otc__contact-icon" aria-hidden="true">
              <span className="material-symbols-rounded">mail</span>
            </span>
            <div className="home-otc__contact-main">
              <div className="home-otc__contact-title">Email</div>
              <div className="home-otc__contact-sub">{otc.email}</div>
            </div>
            <IconButton icon="content_copy" size="sm" label="Copy email" onClick={copyEmail} />
          </div>
          <div className="home-otc__contact-row">
            <span className="home-otc__contact-icon" aria-hidden="true">
              <span className="material-symbols-rounded">help</span>
            </span>
            <div className="home-otc__contact-main">
              <div className="home-otc__contact-title">More about OTC</div>
              <div className="home-otc__contact-sub">Learn about StraitsX OTC</div>
            </div>
            <IconButton
              icon="open_in_new"
              size="sm"
              label="Learn about StraitsX OTC"
              onClick={() => showToast("Opens in browser")}
            />
          </div>
        </div>
      </>
    );
    footer = (
      <Button variant="primary" size="lg" onClick={() => setStep("form")}>
        Request Quote
      </Button>
    );
  }

  if (step === "form") {
    content = (
      <>
        <h1 className="home-otc__title">Request an OTC Trading Quote</h1>

        <label className="home-field-label">You would like to</label>
        <div className="home-otc__dirs" role="radiogroup" aria-label="You would like to">
          {[
            { id: "Buy", icon: "arrow_downward" },
            { id: "Sell", icon: "arrow_upward" }
          ].map((d) => (
            <motion.button
              key={d.id}
              {...pressable}
              role="radio"
              aria-checked={direction === d.id}
              className={`home-otc__dir${direction === d.id ? " is-active" : ""}`}
              onClick={() => setDirection(d.id)}
            >
              <span className="material-symbols-rounded" aria-hidden="true">{d.icon}</span>
              {d.id}
            </motion.button>
          ))}
        </div>

        <div className={`home-otc__amount${showMinError ? " is-error" : ""}`} style={{ marginTop: 16 }}>
          <input
            inputMode="numeric"
            placeholder="Enter Amount"
            value={amount}
            onChange={handleAmountChange}
            aria-label="Amount"
          />
          <button type="button" className="home-otc__asset" onClick={pickAmountAsset}>
            <AssetMark asset={amountAsset} size={20} />
            {amountAsset}
            <span className="material-symbols-rounded" aria-hidden="true">expand_more</span>
          </button>
        </div>
        <p className={`home-helper${showMinError ? " is-error" : ""}`}>
          {otc.minimums.helper}{" "}
          <button
            type="button"
            className="home-link"
            onClick={() => showToast("Opens in browser")}
          >
            Learn more
          </button>
        </p>

        <label className="home-field-label">With your</label>
        <motion.button {...pressable} className="home-otc__counter" onClick={pickCounterAsset}>
          <AssetMark asset={counterAsset} size={32} />
          <span className="home-otc__counter-main">
            <span className="home-otc__counter-label">{counterAsset}</span>
            {ASSET_CAPTIONS[counterAsset] && (
              <span className="home-otc__counter-cap">{ASSET_CAPTIONS[counterAsset]}</span>
            )}
          </span>
          <span className="material-symbols-rounded" aria-hidden="true">expand_more</span>
        </motion.button>
      </>
    );
    footer = (
      <div className="home-otc__row2">
        <Button variant="secondary" size="lg" onClick={() => setStep("intro")}>
          Back
        </Button>
        <Button
          variant="primary"
          size="lg"
          disabled={!amountValid}
          onClick={() => setStep("confirm")}
        >
          Next
        </Button>
      </div>
    );
  }

  if (step === "confirm") {
    content = (
      <>
        <h1 className="home-otc__title">Confirmation</h1>
        <div className="home-otc__summary">
          <div className="home-otc__pair">
            <span className="home-otc__pairside">
              <AssetMark asset={amountAsset} size={24} />
              <Money value={amountNum} decimals={0} suffix={` ${amountAsset}`} />
            </span>
            <span
              className="material-symbols-rounded home-otc__pair-arrow"
              aria-hidden="true"
            >
              arrow_forward
            </span>
            <span className="home-otc__pairside">
              <AssetMark asset={counterAsset} size={24} />
              {counterAsset}
            </span>
          </div>
          <p className="home-otc__caption">{caption}</p>
        </div>
        <div className="home-otc__details">
          <div className="home-otc__detail">
            <span className="home-otc__detail-label">Transfer Fee</span>
            <span className="home-otc__detail-value">{otc.request.transferFee}</span>
          </div>
          <div className="home-otc__detail">
            <span className="home-otc__detail-label">Processing Time</span>
            <span className="home-otc__detail-value">{otc.request.processingTime}</span>
          </div>
        </div>
      </>
    );
    footer = (
      <div className="home-otc__row2">
        <Button
          variant="secondary"
          size="lg"
          disabled={submitting}
          onClick={() => setStep("form")}
        >
          Back
        </Button>
        <Button variant="primary" size="lg" disabled={submitting} onClick={submit}>
          {submitting ? "Submitting…" : "Submit Request"}
        </Button>
      </div>
    );
  }

  return (
    <div className="home-wrap">
      <AppHeader title="OTC Desk" back />
      <div className="screen-scroll">
        <div className="screen-pad home-otc__host">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={step}
              className="home-otc__step-pad"
              variants={stepVariants}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              {content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="cta-bar">{footer}</div>
      {toastNode}
    </div>
  );
}
