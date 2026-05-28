import React from "react";
import "./LinkButton.css";

/**
 * Inline text link styled as a button. Optional trailing icon.
 *
 *   <LinkButton trailingIcon="arrow_forward" onClick={...}>Learn more</LinkButton>
 *   <LinkButton as="a" href="/docs">Read the docs</LinkButton>
 */
export function LinkButton({
  as: Tag = "button",
  size = "md",
  onDark = false,
  trailingIcon,
  leadingIcon,
  disabled = false,
  className = "",
  children,
  ...rest
}) {
  const cls = [
    "sx-link-btn",
    `sx-link-btn--${size}`,
    onDark && "sx-link-btn--onDark",
    className,
  ].filter(Boolean).join(" ");
  const props = Tag === "button" ? { type: "button", disabled } : {};
  return (
    <Tag className={cls} {...props} {...rest}>
      {leadingIcon && <span className="material-symbols-rounded">{leadingIcon}</span>}
      {children}
      {trailingIcon && <span className="material-symbols-rounded">{trailingIcon}</span>}
    </Tag>
  );
}
