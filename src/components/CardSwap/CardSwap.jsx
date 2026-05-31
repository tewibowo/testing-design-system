import React from "react";
import { Icon } from "../Icon/Icon.jsx";
import { Button } from "../Button/Button.jsx";
import { IconButton } from "../IconButton/IconButton.jsx";
import "./CardSwap.css";

/**
 * Card / Swap — a from/to currency swap panel.
 * Figma: Card / Swap (5431:6671).
 *
 * Each leg (`from` / `to`) is `{ amount, currency, balance, logo? }`.
 * `logo` is an optional ReactNode coin mark; otherwise initials are shown.
 *
 *   <CardSwap
 *     from={{ amount: "20", currency: "XUSD", balance: "1,300 XUSD" }}
 *     to={{ amount: "25.46", currency: "XSGD", balance: "1,000 XSGD" }}
 *     rate="1 XSGD ≈ 0.7233 USDT"
 *   />
 */
export function CardSwap({
  title = "Swap",
  from = {},
  to = {},
  rate = "1 XSGD ≈ 0.7233 USDT",
  highlight,
  footnote = "No fees · Rate refreshes every minute.",
  buttonLabel = "Swap",
  onSwap,
  onReverse,
  className = "",
  ...rest
}) {
  const cls = ["sx-card-swap", className].filter(Boolean).join(" ");
  return (
    <section className={cls} {...rest}>
      <p className="sx-card-swap__title">{title}</p>

      <Leg label="From" leg={from} />

      <div className="sx-card-swap__rate-row">
        <div className="sx-card-swap__rate-col">
          {rate && <span className="sx-card-swap__rate">{rate}</span>}
          {highlight && (
            <span className="sx-card-swap__highlight">
              <Icon name="check_circle" size={18} className="sx-card-swap__highlight-icon" />
              {highlight}
            </span>
          )}
        </div>
        <IconButton variant="outline" size="sm" icon="swap_vert" label="Reverse" onClick={onReverse} />
      </div>

      <Leg label="To" leg={to} />

      <Button variant="primary" size="lg" className="sx-card-swap__btn" onClick={onSwap}>
        {buttonLabel}
      </Button>

      {footnote && <p className="sx-card-swap__footnote">{footnote}</p>}
    </section>
  );
}

function Leg({ label, leg }) {
  return (
    <div className="sx-card-swap__leg">
      <div className="sx-card-swap__leg-labels">
        <span className="sx-card-swap__leg-label">{label}</span>
        {leg.balance && <span className="sx-card-swap__leg-balance">Balance: {leg.balance}</span>}
      </div>
      <div className="sx-card-swap__field">
        <div className="sx-card-swap__field-main">
          <span className="sx-card-swap__amount num">{leg.amount}</span>
          {leg.onMax && (
            <button type="button" className="sx-card-swap__max" onClick={leg.onMax}>Max</button>
          )}
        </div>
        <div className="sx-card-swap__suffix">
          <span className="sx-card-swap__coin" aria-hidden="true">
            {leg.logo || <span className="sx-card-swap__coin-initial">{(leg.currency || "?").charAt(0)}</span>}
          </span>
          <span className="sx-card-swap__currency">{leg.currency}</span>
          <Icon name="expand_more" size={24} className="sx-card-swap__chevron" />
        </div>
      </div>
    </div>
  );
}
