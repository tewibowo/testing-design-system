import React from "react";
import { BottomSheet } from "../BottomSheet/BottomSheet.jsx";
import "./BottomSheetBank.css";

/**
 * Bank selection bottom sheet — composes the shared BottomSheet shell with a
 * single-select list of banks. Mirrors BottomSheetNetwork but for picking a
 * bank / linked account. Each row: leading bank mark (ReactNode or initial),
 * bank name, and an optional description (account number / status).
 *
 *   <BottomSheetBank
 *     open={open} onClose={…}
 *     title="Select Bank"
 *     banks={[{ id, name, description, mark }]}
 *     selectedId="dbs"
 *     onSelect={(bank) => …}
 *   />
 */
export function BottomSheetBank({
  open,
  onClose,
  title = "Select Bank",
  banks = [],
  selectedId,
  onSelect,
  className = "",
}) {
  return (
    <BottomSheet open={open} onClose={onClose} title={title} className={"sx-bsb " + className}>
      <ul className="sx-bsb__list">
        {banks.map((b) => {
          const selected = b.id === selectedId;
          return (
            <li key={b.id ?? b.name}>
              <button
                type="button"
                className={"sx-bsb__item" + (selected ? " is-selected" : "")}
                onClick={() => onSelect && onSelect(b)}
                aria-pressed={selected}
              >
                <span className="sx-bsb__mark" aria-hidden="true">
                  {b.mark || (b.name ? b.name.slice(0, 1) : "")}
                </span>
                <span className="sx-bsb__text">
                  <span className="sx-bsb__name">{b.name}</span>
                  {b.description && <span className="sx-bsb__desc">{b.description}</span>}
                </span>
                <span className="material-symbols-rounded sx-bsb__check" aria-hidden="true">
                  {selected ? "radio_button_checked" : "radio_button_unchecked"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </BottomSheet>
  );
}
