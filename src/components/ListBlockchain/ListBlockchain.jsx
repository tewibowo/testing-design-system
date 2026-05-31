import React from "react";
import "./ListBlockchain.css";
import { Tag } from "../Tag/Tag.jsx";

/**
 * Blockchain wallet list row. Figma: List / Blockchain (5693:10299).
 *
 * Leading chain/wallet icon, a primary name + secondary address line, an
 * optional tertiary line (e.g. "Last Used"), and a trailing action/status:
 *   - "verifiedPrivateWallet" → name + address + meta line
 *   - "verifiedCustodial"     → name + address
 *   - "pending"               → "Pending" tag
 *   - "verify"                → "Verify" link
 *
 * `icon` is any ReactNode (round 24px chain logo) — pass initials as fallback.
 * Do NOT pass remote Figma asset URLs.
 */
export function ListBlockchain({
  name = "Wallet",
  address,
  meta,
  icon,
  variant = "verifiedPrivateWallet",
  onAction,
  actionLabel = "Verify",
  className = "",
  ...rest
}) {
  const isPending = variant === "pending";
  const isVerify = variant === "verify";
  const cls = ["sx-list-blockchain", `sx-list-blockchain--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls} {...rest}>
      <div className="sx-list-blockchain__main">
        {icon != null && <span className="sx-list-blockchain__icon">{icon}</span>}
        <div className="sx-list-blockchain__text">
          <span className="sx-list-blockchain__name">{name}</span>
          {address && <span className="sx-list-blockchain__sub">{address}</span>}
          {meta && <span className="sx-list-blockchain__sub">{meta}</span>}
        </div>
      </div>

      {isPending && (
        <Tag tone="warning" className="sx-list-blockchain__tag">
          Pending
        </Tag>
      )}

      {isVerify && (
        <button
          type="button"
          className="sx-list-blockchain__link"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
