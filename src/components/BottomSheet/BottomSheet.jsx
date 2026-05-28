import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "./BottomSheet.css";

/**
 * Bottom sheet (mobile-first action sheet).
 *
 *   <BottomSheet open={open} onClose={…} title="Send to">…</BottomSheet>
 */
export function BottomSheet({
  open,
  onClose,
  title,
  children,
  dismissable = true,
  hideClose = false,
  className = "",
}) {
  useEffect(() => {
    if (!open || !dismissable) return undefined;
    const onKey = (e) => { if (e.key === "Escape") onClose && onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, dismissable, onClose]);

  if (!open) return null;
  const handleScrim = (e) => {
    if (!dismissable) return;
    if (e.target === e.currentTarget) onClose && onClose();
  };

  return createPortal(
    <div className="sx-bsheet-scrim" role="presentation" onClick={handleScrim}>
      <div className={"sx-bsheet " + className} role="dialog" aria-modal="true" aria-labelledby={title ? "sx-bsheet-title" : undefined}>
        <div className="sx-bsheet__handle" aria-hidden="true" />
        {(title || !hideClose) && (
          <div className="sx-bsheet__head">
            {title && <div id="sx-bsheet-title" className="sx-bsheet__title">{title}</div>}
            {!hideClose && (
              <button type="button" className="sx-bsheet__close" onClick={onClose} aria-label="Close">
                <span className="material-symbols-rounded">close</span>
              </button>
            )}
          </div>
        )}
        <div className="sx-bsheet__body">{children}</div>
      </div>
    </div>,
    document.body
  );
}
