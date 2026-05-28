import React, { useEffect, useRef, useState } from "react";
import "./Menu.css";

/**
 * Popover menu. Pass the trigger as `trigger` (rendered with `{ onClick, ref }`)
 * and the items as children of `<Menu>`.
 *
 *   <Menu trigger={({ onClick }) => <IconButton icon="more_vert" onClick={onClick} />}>
 *     <Menu.Item icon="download" onSelect={…}>Download</Menu.Item>
 *     <Menu.Divider />
 *     <Menu.Item icon="delete" tone="critical">Delete</Menu.Item>
 *   </Menu>
 */
export function Menu({ trigger, align = "left", placement = "bottom", children, className = "" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onClickAway = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onClickAway);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickAway);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const triggerNode = trigger
    ? trigger({ onClick: () => setOpen((o) => !o), open })
    : null;

  return (
    <div className={"sx-menu " + className} ref={ref}>
      {triggerNode}
      {open && (
        <div
          role="menu"
          className={[
            "sx-menu__list",
            align === "right" && "sx-menu__list--right",
            placement === "top" ? "sx-menu__list--top" : "sx-menu__list--bottom",
          ].filter(Boolean).join(" ")}
        >
          {React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return child;
            // pass a close callback to items so they auto-close on select
            if (child.type === MenuItem) {
              return React.cloneElement(child, { __close: () => setOpen(false) });
            }
            return child;
          })}
        </div>
      )}
    </div>
  );
}

function MenuItem({ icon, tone = "default", disabled = false, onSelect, children, __close }) {
  const cls = [
    "sx-menu__item",
    tone === "critical" && "sx-menu__item--critical",
  ].filter(Boolean).join(" ");
  return (
    <button
      type="button"
      role="menuitem"
      className={cls}
      disabled={disabled}
      onClick={() => {
        if (disabled) return;
        onSelect && onSelect();
        __close && __close();
      }}
    >
      {icon && <span className="material-symbols-rounded">{icon}</span>}
      {children}
    </button>
  );
}

function MenuDivider() {
  return <div className="sx-menu__divider" />;
}

function MenuLabel({ children }) {
  return <div className="sx-menu__label">{children}</div>;
}

Menu.Item = MenuItem;
Menu.Divider = MenuDivider;
Menu.Label = MenuLabel;
