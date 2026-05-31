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

function MenuItem({
  icon,
  tone = "default",
  disabled = false,
  onSelect,
  children,
  secondary,
  trailing,
  selectable,
  selected = false,
  __close,
}) {
  const isSingle = selectable === "single";
  const isMultiple = selectable === "multiple";
  const cls = [
    "sx-menu__item",
    tone === "critical" && "sx-menu__item--critical",
    selectable && "sx-menu__item--selectable",
    selected && "is-selected",
  ].filter(Boolean).join(" ");
  // role + aria reflect the selection affordance
  const role = isSingle
    ? "menuitemradio"
    : isMultiple
    ? "menuitemcheckbox"
    : "menuitem";
  return (
    <button
      type="button"
      role={role}
      className={cls}
      disabled={disabled}
      aria-checked={selectable ? selected : undefined}
      onClick={() => {
        if (disabled) return;
        onSelect && onSelect();
        // multi-select keeps the menu open for further toggling
        if (!isMultiple) __close && __close();
      }}
    >
      {isMultiple && (
        <span className="sx-menu__check sx-menu__check--box" aria-hidden="true">
          {selected && <span className="material-symbols-rounded">check</span>}
        </span>
      )}
      {icon && <span className="sx-menu__icon material-symbols-rounded">{icon}</span>}
      <span className="sx-menu__item-text">
        <span className="sx-menu__item-label">{children}</span>
        {secondary && <span className="sx-menu__item-secondary">{secondary}</span>}
      </span>
      {trailing && <span className="sx-menu__item-trailing">{trailing}</span>}
      {isSingle && (
        <span className="sx-menu__check sx-menu__check--tick" aria-hidden="true">
          {selected && <span className="material-symbols-rounded">check</span>}
        </span>
      )}
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
