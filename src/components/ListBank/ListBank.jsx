import React from "react";
import "./ListBank.css";
import { Tag } from "../Tag/Tag.jsx";

/**
 * Bank account list row. Figma: List / Bank (5323:3843).
 *
 * Renders a leading bank logo, a primary name + secondary account line, an
 * optional SWIFT line, and a trailing action/status depending on `variant`:
 *   - "unverified" → "Verify" link
 *   - "rejected"   → "Rejected" tag + "Resubmit" link
 *   - "verified"   → SWIFT code shown (when `swift` provided)
 *
 * `logo` is any ReactNode (svg/img) — pass initials as a fallback. Do NOT
 * pass remote Figma asset URLs.
 */
export function ListBank({
  name = "John Doe",
  account,
  swift,
  logo,
  variant = "unverified",
  onAction,
  actionLabel,
  className = "",
  ...rest
}) {
  const isVerified = variant === "verified";
  const isRejected = variant === "rejected";
  const cls = ["list-bank", `list-bank--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  const label = actionLabel || (isRejected ? "Resubmit" : "Verify");

  return (
    <div className={cls} {...rest}>
      <div className="list-bank__main">
        {logo != null && <span className="list-bank__logo">{logo}</span>}
        <div className="list-bank__text">
          <span className="list-bank__name">{name}</span>
          {account && <span className="list-bank__sub">{account}</span>}
          {isVerified && swift && (
            <span className="list-bank__sub">{swift}</span>
          )}
          {isRejected && (
            <Tag tone="critical" shape="default" className="list-bank__tag">
              Rejected
            </Tag>
          )}
        </div>
      </div>
      {!isVerified && (
        <button type="button" className="list-bank__link" onClick={onAction}>
          {label}
        </button>
      )}
    </div>
  );
}
