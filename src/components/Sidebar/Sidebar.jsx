import React, { useState } from "react";
import { Logomark } from "../Logomark/Logomark.jsx";
import { CompanyProfileMenu } from "../CompanyProfileMenu/CompanyProfileMenu.jsx";
import "./Sidebar.css";

export const DEFAULT_NAV_ITEMS = [
  { id: "home", icon: "home", label: "Home" },
  {
    id: "mint", icon: "account_balance_wallet", label: "Mint", tag: "New",
    subItems: [
      { id: "mint-buy", label: "Buy" },
      { id: "mint-sell", label: "Sell" },
    ],
  },
  { id: "history", icon: "receipt_long", label: "Transaction History" },
  { id: "statement", icon: "description", label: "Account Statement" },
  { id: "devtools", icon: "developer_mode", label: "Developer Tools" },
  { id: "team", icon: "badge", label: "Team" },
  { id: "settings", icon: "tune", label: "Settings" },
  { id: "support", icon: "support_agent", label: "Support" },
];

const ACCOUNT_LABEL = {
  personal: "Personal Account",
  business: "Business Account",
  sandbox: "Sandbox",
};

/**
 * Left navigation (Figma "Sidebar - Base"). Account-type variants, optional
 * company-profile dropdown, expandable nav items with sub-items, "New" tags,
 * and the MAS regulatory badge.
 *
 *   <Sidebar
 *     account="business"
 *     company={{ name: "ABC Pte. Ltd", type: "Company" }}
 *     onCompanyClick={() => ...}
 *     items={DEFAULT_NAV_ITEMS}
 *     active="home"
 *     activeSubItem="mint-buy"
 *     onSelect={(id) => ...}
 *   />
 */
export function Sidebar({
  account = "personal",
  company,
  onCompanyClick,
  companies,
  companyActions,
  onSwitchCompany,
  onCompanyAction,
  defaultMenuOpen = false,
  items = DEFAULT_NAV_ITEMS,
  active,
  activeSubItem,
  hoveredItem, // id of a nav item to render in its hovered state (stories/Chromatic)
  onSelect,
  brandName = "StraitsX",
  masBadge = true,
}) {
  const hasMenu = !!(companies || companyActions);
  const [menuOpen, setMenuOpen] = useState(defaultMenuOpen);
  const [expanded, setExpanded] = useState(() => {
    const init = {};
    items.forEach((i) => {
      if (i.subItems && (i.id === active || i.subItems.some((s) => s.id === activeSubItem))) init[i.id] = true;
    });
    return init;
  });
  const toggle = (id) => setExpanded((e) => ({ ...e, [id]: !e[id] }));

  return (
    <aside className="sidebar">
      <div className="sidebar__top">
        <div className="sidebar__brand">
          <Logomark size={36} />
          <div>
            <div className="sidebar__brand-name">{brandName}</div>
            <div className="sidebar__brand-sub">{ACCOUNT_LABEL[account] || ACCOUNT_LABEL.personal}</div>
          </div>
        </div>

        {company && (
          <div className="sidebar__company-wrap">
            <button
              type="button"
              className={"sidebar__company" + (menuOpen ? " is-open" : "")}
              onClick={() => { if (hasMenu) setMenuOpen((o) => !o); else if (onCompanyClick) onCompanyClick(); }}
              aria-haspopup={hasMenu || onCompanyClick ? "menu" : undefined}
              aria-expanded={hasMenu ? menuOpen : undefined}
            >
              <span className="sidebar__company-text">
                <span className="sidebar__company-name">{company.name}</span>
                <span className="sidebar__company-type">{company.type}</span>
              </span>
              {(hasMenu || onCompanyClick) && (
                <span className={"material-symbols-rounded sidebar__company-chevron" + (menuOpen ? " is-open" : "")} aria-hidden="true">expand_more</span>
              )}
            </button>
            {hasMenu && menuOpen && (
              <div className="sidebar__company-menu">
                <CompanyProfileMenu
                  switchCompany={!!companies}
                  companies={companies || []}
                  actions={companyActions || undefined}
                  onSwitch={(id) => { setMenuOpen(false); onSwitchCompany && onSwitchCompany(id); }}
                  onAction={(id) => { setMenuOpen(false); onCompanyAction && onCompanyAction(id); }}
                />
              </div>
            )}
          </div>
        )}

        <nav className="sidebar__nav" aria-label="Main">
          {items.map((item) => {
            const hasSub = item.subItems && item.subItems.length > 0;
            const isOpen = !!expanded[item.id];
            const isActive = active === item.id && !(hasSub && item.subItems.some((s) => s.id === activeSubItem));
            return (
              <div key={item.id} className="sidebar__group">
                <button
                  type="button"
                  className={"nav-item" + (isActive ? " is-active" : "") + (hoveredItem === item.id ? " is-hovered" : "")}
                  aria-expanded={hasSub ? isOpen : undefined}
                  onClick={() => { if (hasSub) toggle(item.id); else if (onSelect) onSelect(item.id); }}
                >
                  <span className="material-symbols-rounded" aria-hidden="true">{item.icon}</span>
                  <span className="nav-item__label">{item.label}</span>
                  {item.tag && <span className="nav-item__tag">{item.tag}</span>}
                  {hasSub && (
                    <span className={"material-symbols-rounded nav-item__chevron" + (isOpen ? " is-open" : "")} aria-hidden="true">
                      keyboard_arrow_down
                    </span>
                  )}
                </button>
                {hasSub && isOpen && (
                  <div className="sidebar__subnav">
                    {item.subItems.map((sub) => (
                      <button
                        key={sub.id}
                        type="button"
                        className={"subitem" + (activeSubItem === sub.id ? " is-active" : "")}
                        onClick={() => onSelect && onSelect(sub.id)}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {masBadge && (
        <div className="sidebar__mas">
          <span className="material-symbols-rounded" aria-hidden="true">verified_user</span>
          <span className="sidebar__mas-text">Licensed &amp; Regulated by Monetary Authority of Singapore</span>
        </div>
      )}
    </aside>
  );
}
