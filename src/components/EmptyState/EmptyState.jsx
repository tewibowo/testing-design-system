import React from "react";
import "./EmptyState.css";

/**
 * Text-only empty state — title + sub.
 * Set `compact` for tighter padding (use inside small cards).
 */
export function EmptyState({ title, sub, compact = false, className = "" }) {
  const cls = ["sx-empty", compact && "is-compact", className].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      {title && <div className="sx-empty__title">{title}</div>}
      {sub && <div className="sx-empty__sub">{sub}</div>}
    </div>
  );
}
