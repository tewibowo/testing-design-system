import React from "react";
import "./Alert.css";

const ICONS = {
  positive: "check_circle",
  critical: "error",
  warning: "warning",
  info: "info",
  neutral: "info",
};

/**
 * Inline alert banner — positive / critical / warning / info / neutral.
 * Optional title, body, action slot, and dismiss button.
 *
 * @param {"bottom"|"right"} [actionPlacement="bottom"] Where the `actions`
 *   slot renders: "bottom" (below body) or "right" (right-aligned inline).
 */
export function Alert({
  tone = "info",
  title,
  children,
  icon,
  onDismiss,
  actions,
  actionPlacement = "bottom",
  className = "",
  ...rest
}) {
  const cls = [
    "sx-alert",
    `sx-alert--${tone}`,
    `sx-alert--actions-${actionPlacement}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const symbol = icon ?? ICONS[tone] ?? "info";
  return (
    <div role="alert" className={cls} {...rest}>
      {symbol && (
        <span className="material-symbols-rounded sx-alert__icon" aria-hidden="true">
          {symbol}
        </span>
      )}
      <div className="sx-alert__body">
        {title && <div className="sx-alert__title">{title}</div>}
        {children && <div className="sx-alert__text">{children}</div>}
        {actions && actionPlacement === "bottom" && (
          <div className="sx-alert__actions">{actions}</div>
        )}
      </div>
      {actions && actionPlacement === "right" && (
        <div className="sx-alert__actions sx-alert__actions--right">{actions}</div>
      )}
      {onDismiss && (
        <button type="button" className="sx-alert__close" onClick={onDismiss} aria-label="Dismiss">
          <span className="material-symbols-rounded">close</span>
        </button>
      )}
    </div>
  );
}
