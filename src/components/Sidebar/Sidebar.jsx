import React from "react";
import { Logomark } from "../Logomark/Logomark.jsx";
import "./Sidebar.css";

export const DEFAULT_NAV_ITEMS = [
  { id: "get-started", icon: "flag", label: "Get Started" },
  { id: "home", icon: "home", label: "Home" },
  { id: "earn", icon: "savings", label: "Earn", tag: "New" },
  { id: "mint", icon: "account_balance_wallet", label: "Mint", tag: "New" },
  { id: "history", icon: "receipt_long", label: "Transaction History" },
  { id: "statement", icon: "description", label: "Account Statement" },
  { id: "devtools", icon: "developer_mode", label: "Developer Tools" },
  { id: "team", icon: "badge", label: "Team" },
  { id: "users", icon: "group", label: "Users" },
  { id: "settings", icon: "tune", label: "Settings" },
  { id: "faq", icon: "help", label: "FAQ" },
  { id: "support", icon: "support_agent", label: "Support" },
];

/**
 * Left navigation for the StraitsX Personal Account dashboard.
 *   items: [{ id, icon (Material Symbol name), label, tag? }]
 */
export function Sidebar({
  items = DEFAULT_NAV_ITEMS,
  active,
  onSelect,
  brandName = "StraitsX",
  brandSub = "Personal Account",
}) {
  return (
    <aside className="sx-sidebar">
      <div className="sx-sidebar__brand">
        <Logomark size={42} />
        <div>
          <div className="sx-sidebar__brand-name">{brandName}</div>
          <div className="sx-sidebar__brand-sub">{brandSub}</div>
        </div>
      </div>
      <nav className="sx-sidebar__nav" aria-label="Main">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={"sx-nav-item" + (active === item.id ? " is-active" : "")}
            onClick={() => onSelect && onSelect(item.id)}
          >
            <span className="material-symbols-rounded" aria-hidden="true">{item.icon}</span>
            <span className="sx-nav-item__label">{item.label}</span>
            {item.tag && <span className="sx-nav-item__tag">{item.tag}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
}
