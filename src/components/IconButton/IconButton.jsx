import React from "react";
import "./IconButton.css";

/**
 * Icon-only button.
 *   variant: "ghost" | "outline" | "filled"
 *   shape:   "circle" | "square"
 *   size:    "lg" | "md" | "sm"
 *   icon: Material Symbol name (e.g. "close", "arrow_forward")
 */
export function IconButton({
  icon,
  variant = "ghost",
  shape = "circle",
  size = "md",
  label,
  disabled = false,
  className = "",
  type = "button",
  ...rest
}) {
  const cls = [
    "sx-icon-btn",
    `sx-icon-btn--${variant}`,
    `sx-icon-btn--${shape}`,
    `sx-icon-btn--${size}`,
    className,
  ].filter(Boolean).join(" ");
  return (
    <button type={type} className={cls} disabled={disabled} aria-label={label} {...rest}>
      <span className="material-symbols-rounded" aria-hidden="true">{icon}</span>
    </button>
  );
}
