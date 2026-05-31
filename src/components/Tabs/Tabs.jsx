import React, { useState } from "react";
import "./Tabs.css";

/**
 * Tabs — variant: "underline" (default), "pill", or "secondary" (Figma Secondary Tab).
 * `fill` stretches tabs to fill width. `size`: "large" (default) | "small".
 *
 *   <Tabs items={[{id, label, content}]} defaultTab="in" />
 *   <Tabs items={…} variant="secondary" size="small" />
 */
export function Tabs({
  items = [],
  defaultTab,
  activeTab,
  onTabChange,
  variant = "underline",
  size = "large",
  fill = false,
  className = "",
}) {
  const [internal, setInternal] = useState(defaultTab || items[0]?.id);
  const current = activeTab ?? internal;
  const setCurrent = (id) => {
    if (activeTab === undefined) setInternal(id);
    onTabChange && onTabChange(id);
  };
  const activeItem = items.find((i) => i.id === current);
  const cls = [
    "sx-tabs",
    variant === "pill" && "sx-tabs--pill",
    variant === "secondary" && "sx-tabs--secondary",
    size === "small" && "sx-tabs--small",
    fill && "sx-tabs--fill",
    className,
  ].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      <div className="sx-tabs__strip" role="tablist">
        {items.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={current === t.id}
            disabled={t.disabled}
            className={"sx-tabs__tab" + (current === t.id ? " is-active" : "")}
            onClick={() => setCurrent(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {activeItem && activeItem.content !== undefined && (
        <div role="tabpanel" className="sx-tabs__panel">{activeItem.content}</div>
      )}
    </div>
  );
}
