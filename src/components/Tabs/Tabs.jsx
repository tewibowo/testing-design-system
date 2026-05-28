import React, { useState } from "react";
import "./Tabs.css";

/**
 * Tabs — variant: "underline" (default) or "pill". variant: "fill" stretches tabs to fill width.
 *
 *   <Tabs items={[{id, label, content}]} defaultTab="in" />
 */
export function Tabs({
  items = [],
  defaultTab,
  activeTab,
  onTabChange,
  variant = "underline",
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
