import React from "react";
import "./DropdownBank.css";

/**
 * Dropdown / Bank — the open menu body listing selectable bank rows. Mirrors
 * DropdownAsset but for bank selection. Each row: leading bank logo/mark (logo
 * ReactNode or initials placeholder), bank name, optional account number /
 * secondary line, and an optional status tag (e.g. "Verified"). Reusable as the
 * popover body of a bank field, or standalone.
 *
 *   <DropdownBank
 *     options={[
 *       { value: "dbs", name: "DBS Bank", account: "•••• 1234", logo: <img .../> },
 *       { value: "uob", name: "UOB", tag: { label: "Verified", variant: "positive" } },
 *     ]}
 *     value="dbs"
 *     onSelect={(value) => ...}
 *   />
 */
export function DropdownBank({
  options = [],
  value,
  onSelect,
  className = "",
  ...rest
}) {
  return (
    <ul className={"sx-dropdown-bank " + className} role="listbox" {...rest}>
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <li
            key={o.value}
            role="option"
            aria-selected={selected}
            aria-disabled={o.disabled || undefined}
            className={
              "sx-dropdown-bank__row" +
              (selected ? " is-selected" : "") +
              (o.disabled ? " is-disabled" : "")
            }
            onClick={() => !o.disabled && onSelect && onSelect(o.value, o)}
          >
            <span className="sx-dropdown-bank__mark" aria-hidden="true">
              {o.logo || (
                <span className="sx-dropdown-bank__initials">
                  {(o.name || o.value || "?").slice(0, 2).toUpperCase()}
                </span>
              )}
            </span>
            <span className="sx-dropdown-bank__text">
              <span className="sx-dropdown-bank__name">{o.name ?? o.value}</span>
              {(o.account || o.secondary) && (
                <span className="sx-dropdown-bank__secondary">
                  {o.account ?? o.secondary}
                </span>
              )}
            </span>
            {o.tag && (
              <span
                className={
                  "sx-dropdown-bank__tag is-" + (o.tag.variant || "positive")
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
