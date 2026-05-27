import React from "react";
import "./Button.css";

/**
 * StraitsX Button — pill-shaped, three variants × three sizes.
 *
 * Usage: <Button variant="primary" size="lg">Take Assessment</Button>
 */
export function Button({
  variant = "primary",
  size = "lg",
  disabled = false,
  type = "button",
  className = "",
  children,
  ...rest
}) {
  const cls = [
    "sx-btn",
    `sx-btn--${variant}`,
    `sx-btn--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button type={type} className={cls} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
