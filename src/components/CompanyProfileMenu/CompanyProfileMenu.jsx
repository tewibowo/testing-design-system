import React from "react";
import "./CompanyProfileMenu.css";

const DEFAULT_ACTIONS = [
  { id: "company-settings", icon: "business", label: "Company Settings" },
  { id: "teams", icon: "group", label: "Teams" },
  { id: "billing", icon: "receipt_long", label: "Billing" },
  { id: "statements", icon: "description", label: "Statements" },
];

/**
 * Company-profile dropdown menu (Figma "Dropdown Menu - Company Profile").
 * Pairs with Sidebar's company-profile trigger. Optional switch-company
 * section (with selected highlight + check) followed by action items.
 *
 *   <CompanyProfileMenu
 *     switchCompany
 *     companies={[
 *       { id: "abc", name: "ABC Pte. Ltd", type: "Business Account", selected: true },
 *       { id: "xyz", name: "XYZ Pte. Ltd", type: "Business Account" },
 *     ]}
 *     onSwitch={(id) => ...}
 *     onAction={(id) => ...}
 *   />
 */
export function CompanyProfileMenu({
  switchCompany = false,
  companies = [],
  onSwitch,
  actions = DEFAULT_ACTIONS,
  onAction,
  className = "",
}) {
  return (
    <div className={"sx-company-menu " + className} role="menu">
      {switchCompany && companies.length > 0 && (
        <>
          <div className="sx-company-menu__header">Switch Company</div>
          {companies.map((c) => (
            <button
              key={c.id}
              type="button"
              role="menuitemradio"
              aria-checked={!!c.selected}
              className={"sx-company-menu__company" + (c.selected ? " is-selected" : "")}
              onClick={() => onSwitch && onSwitch(c.id)}
            >
              <span className="sx-company-menu__company-text">
                <span className="sx-company-menu__company-name">{c.name}</span>
                <span className="sx-company-menu__company-type">{c.type}</span>
              </span>
              {c.selected && (
                <span className="material-symbols-rounded sx-company-menu__check" aria-hidden="true">check</span>
              )}
            </button>
          ))}
          <div className="sx-company-menu__divider" role="separator" />
        </>
      )}

      {actions.map((a) => (
        <button
          key={a.id}
          type="button"
          role="menuitem"
          className="sx-company-menu__action"
          onClick={() => onAction && onAction(a.id)}
        >
          <span className="material-symbols-rounded" aria-hidden="true">{a.icon}</span>
          <span className="sx-company-menu__action-label">{a.label}</span>
        </button>
      ))}
    </div>
  );
}
