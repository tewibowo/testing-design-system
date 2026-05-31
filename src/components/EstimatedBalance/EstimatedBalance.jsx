import React from "react";
import { Icon } from "../Icon/Icon.jsx";
import "./EstimatedBalance.css";

/**
 * Estimated Balance — a label + tooltip-info icon over a large numeric amount
 * with a smaller currency suffix.
 *
 *   <EstimatedBalance amount="2,081.23" currency="SGD" />
 */
export function EstimatedBalance({
  label = "Estimated Balance",
  amount = "2,081.23",
  currency = "SGD",
  showInfo = true,
  className = "",
  ...rest
}) {
  const cls = ["sx-estimated-balance", className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...rest}>
      <div className="sx-estimated-balance__title">
        <span className="sx-estimated-balance__label">{label}</span>
        {showInfo && <Icon name="info" size={18} className="sx-estimated-balance__info" />}
      </div>
      <div className="sx-estimated-balance__amount">
        <span className="sx-estimated-balance__value">{amount}</span>
        {currency && <span className="sx-estimated-balance__currency">{currency}</span>}
      </div>
    </div>
  );
}
