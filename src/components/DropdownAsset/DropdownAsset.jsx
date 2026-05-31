import React from "react";
import "./DropdownAsset.css";

/**
 * Dropdown / Asset (Figma 5072:46251) — the open menu body listing selectable
 * asset rows. Each row: leading mark (logo ReactNode or initials placeholder),
 * asset name, and optional secondary text / balance. Designed to be dropped in
 * as the popover body of a select-style field, or used standalone.
 *
 *   <DropdownAsset
 *     options={[{ value: "xsgd", name: "XSGD", balance: "1,250.00", logo: <img .../> }]}
 *     value="xsgd"
 *     onSelect={(value) => ...}
 *   />
 */
export function DropdownAsset({
  options = [],
  value,
  onSelect,
  className = "",
  ...rest
}) {
  return (
    <ul className={"sx-dropdown-asset " + className} role="listbox" {...rest}>
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <li
            key={o.value}
            role="option"
            aria-selected={selected}
            aria-disabled={o.disabled || undefined}
            className={
              "sx-dropdown-asset__row" +
              (selected ? " is-selected" : "") +
              (o.disabled ? " is-disabled" : "")
            }
            onClick={() => !o.disabled && onSelect && onSelect(o.value, o)}
          >
            <span className="sx-dropdown-asset__mark" aria-hidden="true">
              {o.logo || (
                <span className="sx-dropdown-asset__initials">
                  {(o.name || o.value || "?").slice(0, 2).toUpperCase()}
                </span>
              )}
            </span>
            <span className="sx-dropdown-asset__text">
              <span className="sx-dropdown-asset__name">{o.name ?? o.value}</span>
              {o.secondary && (
                <span className="sx-dropdown-asset__secondary">{o.secondary}</span>
              )}
            </span>
            {o.balance != null && (
              <span className="sx-dropdown-asset__balance">{o.balance}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
