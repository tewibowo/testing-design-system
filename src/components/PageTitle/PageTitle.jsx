import React from "react";
import "./PageTitle.css";

/**
 * Page heading row — optional breadcrumb above, title + subtitle, and right-aligned actions.
 *
 *   <PageTitle title="Transaction History" subtitle="…" breadcrumb={<Breadcrumb …/>} actions={<Button…/>} />
 */
export function PageTitle({ title, subtitle, breadcrumb, actions, className = "" }) {
  return (
    <div className={"sx-page-title " + className}>
      <div className="sx-page-title__head">
        {breadcrumb}
        <h1 className="sx-page-title__h1">{title}</h1>
        {subtitle && <p className="sx-page-title__sub">{subtitle}</p>}
      </div>
      {actions && <div className="sx-page-title__actions">{actions}</div>}
    </div>
  );
}
