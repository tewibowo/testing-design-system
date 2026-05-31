import React from "react";
import { BottomSheet } from "../BottomSheet/BottomSheet.jsx";
import "./BottomSheetNetwork.css";

/**
 * Network selection bottom sheet — composes the shared BottomSheet shell with a
 * single-select list of blockchain networks. Used to pick the network for a
 * given asset (XSGD / XUSD / USDC / USDT).
 *
 *   <BottomSheetNetwork
 *     open={open} onClose={…}
 *     title="Select Network"
 *     networks={[{ id, name, description, mark }]}
 *     selectedId="ethereum"
 *     onSelect={(network) => …}
 *   />
 */
export function BottomSheetNetwork({
  open,
  onClose,
  title = "Select Network",
  networks = [],
  selectedId,
  onSelect,
  className = "",
}) {
  return (
    <BottomSheet open={open} onClose={onClose} title={title} className={"sx-bsn " + className}>
      <ul className="sx-bsn__list">
        {networks.map((n) => {
          const selected = n.id === selectedId;
          return (
            <li key={n.id ?? n.name}>
              <button
                type="button"
                className={"sx-bsn__item" + (selected ? " is-selected" : "")}
                onClick={() => onSelect && onSelect(n)}
                aria-pressed={selected}
              >
                <span className="sx-bsn__mark" aria-hidden="true">
                  {n.mark || (n.name ? n.name.slice(0, 1) : "")}
                </span>
                <span className="sx-bsn__text">
                  <span className="sx-bsn__name">{n.name}</span>
                  {n.description && <span className="sx-bsn__desc">{n.description}</span>}
                </span>
                <span className="material-symbols-rounded sx-bsn__check" aria-hidden="true">
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
