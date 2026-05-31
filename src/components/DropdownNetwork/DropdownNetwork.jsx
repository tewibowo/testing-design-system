import React from "react";
import "./DropdownNetwork.css";

/**
 * Dropdown / Network (Figma 5072:46599) — the open menu body listing selectable
 * network rows. Each row: leading mark (logo ReactNode or initials placeholder),
 * network name, optional secondary line, and an optional status tag (e.g. "New").
 * Reusable as the popover body of a network field, or standalone.
 *
 *   <DropdownNetwork
 *     options={[
 *       { value: "eth", name: "Ethereum", logo: <img .../> },
 *       { value: "sol", name: "Solana", tag: { label: "New", variant: "positive" } },
 *     ]}
 *     value="eth"
 *     onSelect={(value) => ...}
 *   />
 */
export function DropdownNetwork({
  options = [],
  value,
  onSelect,
  className = "",
  ...rest
}) {
  return (
    <ul className={"dropdown-network " + className} role="listbox" {...rest}>
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <li
            key={o.value}
            role="option"
            aria-selected={selected}
            aria-disabled={o.disabled || undefined}
            className={
              "dropdown-network__row" +
              (selected ? " is-selected" : "") +
              (o.disabled ? " is-disabled" : "")
            }
            onClick={() => !o.disabled && onSelect && onSelect(o.value, o)}
          >
            <span className="dropdown-network__mark" aria-hidden="true">
              {o.logo || (
                <span className="dropdown-network__initials">
                  {(o.name || o.value || "?").slice(0, 2).toUpperCase()}
                </span>
              )}
            </span>
            <span className="dropdown-network__text">
              <span className="dropdown-network__name">{o.name ?? o.value}</span>
              {o.secondary && (
                <span className="dropdown-network__secondary">{o.secondary}</span>
              )}
            </span>
            {o.tag && (
              <span
                className={
                  "dropdown-network__tag is-" + (o.tag.variant || "positive")
                }
              >
                {o.tag.label}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
