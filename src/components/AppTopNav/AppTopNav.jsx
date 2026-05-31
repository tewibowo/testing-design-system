import React from "react";
import { Badge } from "../Badge/Badge.jsx";
import { Tag } from "../Tag/Tag.jsx";
import { IconButton } from "../IconButton/IconButton.jsx";
import { Logomark } from "../Logomark/Logomark.jsx";
import "./AppTopNav.css";

/**
 * AppTopNav — dashboard app-shell top bar (Figma "Top Navigation", 1998:71939).
 *
 * Renders the platform/account variants of the dashboard top bar:
 *   platform: "desktop" | "mobile"
 *   account:  "personal" | "business" | "sandbox"
 *
 * Desktop layout: StraitsX logo (left) · optional center nav links ·
 *   right cluster = notifications bell (optional count Badge) + account/profile
 *   area (avatar/initials + name + chevron). The profile area triggers
 *   onProfileClick and is meant to anchor a CompanyProfileMenu dropdown.
 *   Sandbox shows a "Sandbox" Tag indicator; Business shows the company name,
 *   Personal shows the user's name.
 *
 * Mobile layout: compact bar = hamburger (onMenuClick) + centered logo +
 *   profile avatar.
 *
 *   <AppTopNav
 *     account="business"
 *     platform="desktop"
 *     links={[{ id: "home", label: "Home", href: "#", active: true }]}
 *     user={{ name: "John Doe", company: "ABC Pte. Ltd.", initials: "JD" }}
 *     notifications={3}
 *     onProfileClick={() => ...}
 *     onMenuClick={() => ...}
 *   />
 */
export function AppTopNav({
  account = "personal",
  platform = "desktop",
  logo,
  links,
  user = {},
  notifications = 0,
  onMenuClick,
  onProfileClick,
  children,
}) {
  const isMobile = platform === "mobile";
  const isSandbox = account === "sandbox";
  const isBusiness = account === "business";

  // Personal → user name; Business/Sandbox → company name (fall back to name).
  const primaryLabel = isBusiness || isSandbox
    ? (user.company || user.name || "")
    : (user.name || "");
  const initials =
    user.initials ||
    (user.name || "")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0])
      .join("")
      .toUpperCase();

  const avatar = (
    <span className="sx-app-topnav__avatar" aria-hidden="true">
      {user.avatar ? (
        <img className="sx-app-topnav__avatar-img" src={user.avatar} alt="" />
      ) : initials ? (
        <span className="sx-app-topnav__initials">{initials}</span>
      ) : (
        <span className="material-symbols-rounded">person</span>
      )}
    </span>
  );

  const brand = logo || <Logomark size={32} />;

  if (isMobile) {
    return (
      <header className="sx-app-topnav sx-app-topnav--mobile" data-account={account}>
        <IconButton
          icon="menu"
          variant="ghost"
          label="Open menu"
          onClick={onMenuClick}
          className="sx-app-topnav__menu"
        />
        <span className="sx-app-topnav__logo sx-app-topnav__logo--center">{brand}</span>
        <button
          type="button"
          className="sx-app-topnav__profile sx-app-topnav__profile--compact"
          onClick={onProfileClick}
          aria-label={primaryLabel ? `Account: ${primaryLabel}` : "Account"}
          aria-haspopup="menu"
        >
          {avatar}
        </button>
      </header>
    );
  }

  return (
    <header className="sx-app-topnav sx-app-topnav--desktop" data-account={account}>
      <div className="sx-app-topnav__left">
        <span className="sx-app-topnav__logo">{brand}</span>
        {isSandbox && (
          <Tag tone="warning" shape="pill" size="small" className="sx-app-topnav__sandbox">
            Sandbox
          </Tag>
        )}
      </div>

      {Array.isArray(links) && links.length > 0 && (
        <nav className="sx-app-topnav__nav" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.id || link.label}
              href={link.href || "#"}
              className={
                "sx-app-topnav__link" + (link.active ? " is-active" : "")
              }
              aria-current={link.active ? "page" : undefined}
              onClick={link.onClick}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}

      <div className="sx-app-topnav__right">
        {children}

        <Badge.Wrap
          badge={
            notifications > 0 ? (
              <Badge tone="critical" size="sm">
                {notifications}
              </Badge>
            ) : null
          }
        >
          <IconButton
            icon="notifications"
            variant="ghost"
            label="Notifications"
          />
        </Badge.Wrap>

        <button
          type="button"
          className="sx-app-topnav__profile"
          onClick={onProfileClick}
          aria-haspopup="menu"
        >
          {avatar}
          {primaryLabel && (
            <span className="sx-app-topnav__profile-text">
              <span className="sx-app-topnav__profile-name">{primaryLabel}</span>
              {(isBusiness || isSandbox) && user.name && (
                <span className="sx-app-topnav__profile-sub">{user.name}</span>
              )}
            </span>
          )}
          <span
            className="material-symbols-rounded sx-app-topnav__chevron"
            aria-hidden="true"
          >
            expand_more
          </span>
        </button>
      </div>
    </header>
  );
}
