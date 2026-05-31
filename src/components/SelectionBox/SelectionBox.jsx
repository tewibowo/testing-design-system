import React, { useId } from "react";
import "./SelectionBox.css";

/**
 * SelectionBox — Figma "Selection - Radio" / "Selection - Check".
 *
 * A bordered, tappable ROW with a left indicator, a primary label, an optional
 * sub/description line, and an optional leading icon. The whole row is the hit
 * target; selecting it highlights the border + background.
 *
 * Props:
 *   type        "radio" | "check"        — single- vs multi-select semantics
 *   selected    bool                     — controlled selected state
 *   disabled    bool
 *   label       node                     — primary label (required for a11y)
 *   description node                     — optional secondary line
 *   icon        ReactNode                — optional leading content icon
 *   indicator   "control" | "icon"       — Figma `.radioType` Radio vs Icon
 *                                          "control" renders radio dot / checkbox,
 *                                          "icon" renders a check glyph on select
 *   name        string                   — radio group name (type="radio")
 *   value       string
 *   onChange    (next: bool, e) => void
 */
export function SelectionBox({
  type = "radio",
  selected = false,
  disabled = false,
  label,
  description,
  icon,
  indicator = "control",
  name,
  value,
  onChange,
  id: idProp,
  className = "",
  ...rest
}) {
  const autoId = useId();
  const id = idProp || autoId;

  const cls = [
    "sx-selbox",
    `sx-selbox--${type}`,
    `sx-selbox--indicator-${indicator}`,
    selected && "is-selected",
    disabled && "is-disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleChange = (e) => {
    if (disabled) return;
    // radios select (true); checks toggle.
    const next = type === "check" ? !selected : true;
    onChange && onChange(next, e);
  };

  const renderIndicator = () => {
    if (indicator === "icon") {
      return (
        <span className="sx-selbox__indicator sx-selbox__indicator--icon" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
            <path
              d="M3 8.5 L6.5 12 L13 4.5"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      );
    }
    if (type === "check") {
      return (
        <span className="sx-selbox__indicator sx-selbox__box sx-selbox__box--check" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
            <path
              d="M3 8.5 L6.5 12 L13 4.5"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      );
    }
    return <span className="sx-selbox__indicator sx-selbox__box sx-selbox__box--radio" aria-hidden="true" />;
  };

  return (
    <label htmlFor={id} className={cls} {...rest}>
      <input
        type={type === "check" ? "checkbox" : "radio"}
        id={id}
        name={name}
        value={value}
        checked={selected}
        disabled={disabled}
        onChange={handleChange}
        className="sx-selbox__input"
      />
      {renderIndicator()}
      {icon && <span className="sx-selbox__icon" aria-hidden="true">{icon}</span>}
      <span className="sx-selbox__content">
        {label && <span className="sx-selbox__label">{label}</span>}
        {description && <span className="sx-selbox__desc">{description}</span>}
      </span>
    </label>
  );
}
