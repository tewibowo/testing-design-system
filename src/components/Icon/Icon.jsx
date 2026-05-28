import React from "react";
import "./Icon.css";

/**
 * Typed wrapper around Material Symbols Rounded.
 * Lets product code call `<Icon name="home" />` instead of repeating the
 * raw `<span className="material-symbols-rounded">home</span>` everywhere —
 * and gives us a single seam to swap in a bundled icon set later without a
 * codebase-wide refactor.
 *
 *   <Icon name="home" />
 *   <Icon name="account_circle" size={32} filled />
 *   <Icon name="arrow_forward" color="var(--sx-vibrant-green)" />
 */
export function Icon({
  name,
  size = 24,
  filled = false,
  color,
  className = "",
  style,
  ...rest
}) {
  const cls = ["sx-icon", filled && "sx-icon--filled", className].filter(Boolean).join(" ");
  return (
    <span
      className={cls}
      aria-hidden="true"
      style={{ fontSize: size, color, ...style }}
      {...rest}
    >
      {name}
    </span>
  );
}
