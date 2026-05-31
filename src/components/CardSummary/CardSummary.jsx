import React from "react";
import { Icon } from "../Icon/Icon.jsx";
import { Button } from "../Button/Button.jsx";
import "./CardSummary.css";

/**
 * Card / Summary — a transfer details / summary card.
 * Figma: Card / Summary (5744:7591).
 *
 * `conversion` renders the from→to currency box: `{ from, to, note }`, where
 * each side is `{ label, logo? }`. `items` is `[{ label, value, info? }]`.
 *
 *   <CardSummary
 *     title="Transfer Details"
 *     conversion={{ from: { label: "SGD" }, to: { label: "XSGD" }, note: "Your SGD will be converted 1:1 to XSGD" }}
 *     items={[{ label: "Processing Time", value: "Instant" }]}
 *     netAmount={{ label: "Net Amount", value: "495 SGD" }}
 *     note={{ title: "Important Notes:", body: "We currently support only selected Singapore banks." }}
 *     button={{ label: "I've Transferred", onClick }}
 *   />
 */
export function CardSummary({
  title = "Transfer Details",
  conversion,
  items = [],
  netAmount,
  note,
  button,
  className = "",
  ...rest
}) {
  const cls = ["card-summary", className].filter(Boolean).join(" ");
  return (
    <section className={cls} {...rest}>
      <p className="card-summary__title">{title}</p>

      {conversion && (
        <div className="card-summary__conversion">
          <div className="card-summary__conversion-row">
            <CurrencyChip side={conversion.from} />
            <Icon name="arrow_forward" size={18} className="card-summary__arrow" />
            <CurrencyChip side={conversion.to} />
          </div>
          {conversion.note && <p className="card-summary__conversion-note">{conversion.note}</p>}
        </div>
      )}

      {items.length > 0 && (
        <dl className="card-summary__items">
          {items.map((item, i) => (
            <div key={item.label || i} className="card-summary__item">
              <dt className="card-summary__item-label">{item.label}</dt>
              <dd className="card-summary__item-value">
                {item.info && <Icon name="info" size={18} className="card-summary__info" />}
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {netAmount && (
        <div className="card-summary__net-wrap">
          <div className="card-summary__divider" />
          <div className="card-summary__net">
            <span className="card-summary__net-label">{netAmount.label}</span>
            <span className="card-summary__net-value">{netAmount.value}</span>
          </div>
        </div>
      )}

      {note && (
        <div className="card-summary__note">
          <span className="card-summary__note-bar" aria-hidden="true" />
          <div className="card-summary__note-content">
            {note.title && <p className="card-summary__note-title">{note.title}</p>}
            {note.body && <p className="card-summary__note-body">{note.body}</p>}
          </div>
        </div>
      )}

      {button && (
        <Button variant="primary" size="lg" className="card-summary__btn" onClick={button.onClick}>
          {button.label}
        </Button>
      )}
    </section>
  );
}

function CurrencyChip({ side }) {
  if (!side) return null;
  return (
    <span className="card-summary__chip">
      <span className="card-summary__chip-logo" aria-hidden="true">
        {side.logo || <span className="card-summary__chip-initial">{(side.label || "?").charAt(0)}</span>}
      </span>
      <span className="card-summary__chip-label">{side.label}</span>
    </span>
  );
}
