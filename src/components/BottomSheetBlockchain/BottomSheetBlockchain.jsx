import React from "react";
import { BottomSheet } from "../BottomSheet/BottomSheet.jsx";
import "./BottomSheetBlockchain.css";

/**
 * Blockchain / wallet selection bottom sheet — composes the shared BottomSheet
 * shell with a single-select list of blockchains or wallets. Mirrors
 * BottomSheetNetwork but for picking a chain / connected wallet. Each row:
 * leading chain mark (ReactNode or initial), name, and an optional description
 * (address / status).
 *
 *   <BottomSheetBlockchain
 *     open={open} onClose={…}
 *     title="Select Blockchain"
 *     chains={[{ id, name, description, mark }]}
 *     selectedId="ethereum"
 *     onSelect={(chain) => …}
 *   />
 */
export function BottomSheetBlockchain({
  open,
  onClose,
  title = "Select Blockchain",
  chains = [],
  selectedId,
  onSelect,
  className = "",
}) {
  return (
    <BottomSheet open={open} onClose={onClose} title={title} className={"sx-bsc " + className}>
      <ul className="sx-bsc__list">
        {chains.map((c) => {
          const selected = c.id === selectedId;
          return (
            <li key={c.id ?? c.name}>
              <button
                type="button"
                className={"sx-bsc__item" + (selected ? " is-selected" : "")}
                onClick={() => onSelect && onSelect(c)}
                aria-pressed={selected}
              >
                <span className="sx-bsc__mark" aria-hidden="true">
                  {c.mark || (c.name ? c.name.slice(0, 1) : "")}
                </span>
                <span className="sx-bsc__text">
                  <span className="sx-bsc__name">{c.name}</span>
                  {c.description && <span className="sx-bsc__desc">{c.description}</span>}
                </span>
                <span className="material-symbols-rounded sx-bsc__check" aria-hidden="true">
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
