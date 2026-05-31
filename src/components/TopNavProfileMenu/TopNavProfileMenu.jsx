import React from "react";
import "./TopNavProfileMenu.css";

/**
 * TopNavProfileMenu — Figma "Top Navigation / Dropdown" profile menu.
 *
 * The profile dropdown anchored by AppTopNav's profile/avatar trigger
 * (wire via `onProfileClick`). Distinct from CompanyProfileMenu (which is
 * the Sidebar company switcher). Shares the Menu/CompanyProfileMenu visual
 * pattern: surface, Shadow/lv-2, rows with icon + label, dividers.
 *
 * `variant`:
 *   "personal"      — header (name/email) + timezone row + Account settings + Log out.
 *   "biz" | "sandbox" — header (account name/role) + Switch account + Settings + Log out.
 *
 *   <TopNavProfileMenu
 *     variant="personal"
 *     user={{ name: "John Doe", email: "john@acme.com", timezone: "GMT+8 Singapore" }}
 *     onAction={(id) => ...}
 *   />
 */
export function TopNavProfileMenu({
  variant = "personal",
  user = {},
  onAction,
  onSwitch,
  className = "",
}) {
  const isPersonal = variant === "personal";
  const fire = (id) => () => onAction && onAction(id);

  const primary = isPersonal
    ? (user.name || "")
    : (user.company || user.name || "");
  const secondary = isPersonal
    ? (user.email || "")
    : (user.role || user.name || "");

  return (
    <div
      className={"sx-topnav-menu " + className}
      data-variant={variant}
      role="menu"
    >
      {(primary || secondary) && (
        <div className="sx-topnav-menu__header">
          {primary && <span className="sx-topnav-menu__name">{primary}</span>}
          {secondary && <span className="sx-topnav-menu__sub">{secondary}</span>}
        </div>
      )}

      {isPersonal ? (
        <>
          <div className="sx-topnav-menu__divider" role="separator" />
          {user.timezone && (
            <div className="sx-topnav-menu__row sx-topnav-menu__row--static">
              <span className="material-symbols-rounded" aria-hidden="true">schedule</span>
              <span className="sx-topnav-menu__label">{user.timezone}</span>
            </div>
          )}
          <button type="button" role="menuitem" className="sx-topnav-menu__row" onClick={fire("account-settings")}>
            <span className="material-symbols-rounded" aria-hidden="true">settings</span>
            <span className="sx-topnav-menu__label">Account settings</span>
          </button>
          <div className="sx-topnav-menu__divider" role="separator" />
          <button type="button" role="menuitem" className="sx-topnav-menu__row sx-topnav-menu__row--critical" onClick={fire("logout")}>
            <span className="material-symbols-rounded" aria-hidden="true">logout</span>
            <span className="sx-topnav-menu__label">Log out</span>
          </button>
        </>
      ) : (
        <>
          <div className="sx-topnav-menu__divider" role="separator" />
          <button type="button" role="menuitem" className="sx-topnav-menu__row" onClick={() => (onSwitch ? onSwitch() : onAction && onAction("switch-account"))}>
            <span className="material-symbols-rounded" aria-hidden="true">swap_horiz</span>
            <span className="sx-topnav-menu__label">Switch account</span>
          </button>
          <button type="button" role="menuitem" className="sx-topnav-menu__row" onClick={fire("settings")}>
            <span className="material-symbols-rounded" aria-hidden="true">settings</span>
            <span className="sx-topnav-menu__label">Settings</span>
          </button>
          <div className="sx-topnav-menu__divider" role="separator" />
          <button type="button" role="menuitem" className="sx-topnav-menu__row sx-topnav-menu__row--critical" onClick={fire("logout")}>
            <span className="material-symbols-rounded" aria-hidden="true">logout</span>
            <span className="sx-topnav-menu__label">Log out</span>
          </button>
        </>
      )}
    </div>
  );
}
