import React from "react";
import "./Tag.css";

/**
 * Status / category tag.
 *
 * tone:       positive | critical | warning | info | neutral | brand
 * shape:      "default" (8-px radius) | "pill" (fully rounded)
 * size:       "large" (default) | "small"            — Figma large/small
 * appearance: "outlined" (default) | "filled"        — Figma Filled/Outlined
 *               outlined = surface bg + colored border/text (current look)
 *               filled   = solid status bg + on-container text
 * icon:       ReactNode | material-symbol name — leading icon before the label
 *                (Figma "Small Tag - Small/XS Icon")
 * removable:  bool + onRemove → trailing close (×) affordance (Figma "Removable Tag")
 * clickable:  bool + onClick + selected → Figma "Clickable Tag"
 *               (selected = filled highlight)
 * disabled:   bool — applies to removable / clickable affordances
 *
 * Backwards compatible: a plain <Tag tone shape> still renders a static span.
 */
export function Tag({
  tone = "neutral",
  shape = "default",
  size = "large",
  appearance = "outlined",
  icon,
  removable = false,
  onRemove,
  clickable = false,
  selected = false,
  disabled = false,
  onClick,
  className = "",
  children,
  ...rest
}) {
  // selected clickable tags render as filled highlight regardless of appearance
  const effectiveAppearance = clickable && selected ? "filled" : appearance;

  const cls = [
    "tag",
    `tag--${tone}`,
    `tag--${size}`,
    `tag--${effectiveAppearance}`,
    shape === "pill" && "tag--pill",
    clickable && "tag--clickable",
    selected && "is-selected",
    disabled && "is-disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleRemove = (e) => {
    e.stopPropagation();
    if (disabled) return;
    onRemove && onRemove(e);
  };

  // Leading icon: a string is treated as a Material Symbol name, any other
  // ReactNode is rendered as-is.
  const leadingIcon =
    icon == null ? null : typeof icon === "string" ? (
      <span className="material-symbols-rounded tag__icon" aria-hidden="true">{icon}</span>
    ) : (
      <span className="tag__icon" aria-hidden="true">{icon}</span>
    );

  const closeBtn = removable ? (
    <button
      type="button"
      className="tag__remove"
      aria-label="Remove"
      onClick={handleRemove}
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" fill="none">
        <path d="M3 3 L9 9 M9 3 L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  ) : null;

  // Clickable tags render as a button for proper semantics.
  if (clickable) {
    return (
      <button
        type="button"
        className={cls}
        aria-pressed={selected}
        disabled={disabled}
        onClick={disabled ? undefined : onClick}
        {...rest}
      >
        {leadingIcon}
        <span className="tag__label">{children}</span>
        {closeBtn}
      </button>
    );
  }

  return (
    <span className={cls} {...rest}>
      {leadingIcon}
      <span className="tag__label">{children}</span>
      {closeBtn}
    </span>
  );
}
