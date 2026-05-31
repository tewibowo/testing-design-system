import React from "react";
import { Logomark } from "../Logomark/Logomark.jsx";
import "./TopNavigation.css";

/**
 * Marketing-site top navigation. Logo + horizontal links + right-aligned actions.
 *
 *   <TopNavigation
 *     links={[{label, href, active?}]}
 *     actions={<><Button variant="tertiary">Sign in</Button><Button>Open account</Button></>}
 *   />
 */
export function TopNavigation({
  brand = "StraitsX",
  links = [],
  actions,
  activeHref,
  appearance = "light",
  className = "",
}) {
  const cls = ["topnav", appearance === "dark" && "topnav--dark", className].filter(Boolean).join(" ");
  return (
    <nav className={cls} aria-label="Primary">
      <a href="/" className="topnav__brand">
        <Logomark size={28} fill={appearance === "dark" ? "#00D37E" : undefined} />
        <span>{brand}</span>
      </a>
      <div className="topnav__links">
        {links.map((l) => {
          const isActive = l.active ?? (activeHref && l.href === activeHref);
          const cls = "topnav__link" + (isActive ? " is-active" : "");
          return l.href ? (
            <a key={l.label} className={cls} href={l.href}>
              {l.label}
              {l.children && <span className="material-symbols-rounded">expand_more</span>}
            </a>
          ) : (
            <button key={l.label} type="button" className={cls} onClick={l.onClick}>
              {l.label}
              {l.children && <span className="material-symbols-rounded">expand_more</span>}
            </button>
          );
        })}
      </div>
      {actions && <div className="topnav__actions">{actions}</div>}
    </nav>
  );
}
