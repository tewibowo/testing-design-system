import React from "react";
import "./Breadcrumb.css";

/**
 * Trail navigation.
 *   <Breadcrumb items={[{label, href}, ...]} />
 * The last item is always shown as the current page.
 */
export function Breadcrumb({ items = [], separator = "chevron_right", className = "" }) {
  return (
    <nav aria-label="Breadcrumb" className={"sx-breadcrumb " + className}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const cls = "sx-breadcrumb__item" + (isLast ? " is-current" : "");
        return (
          <React.Fragment key={i}>
            {isLast ? (
              <span className={cls} aria-current="page">{item.label}</span>
            ) : item.href ? (
              <a className={cls} href={item.href} onClick={item.onClick}>{item.label}</a>
            ) : (
              <button type="button" className={cls} onClick={item.onClick}>{item.label}</button>
            )}
            {!isLast && (
              <span className="material-symbols-rounded sx-breadcrumb__sep" aria-hidden="true">{separator}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
