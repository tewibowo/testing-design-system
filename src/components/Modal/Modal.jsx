import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

/**
 * Centered modal dialog.
 *   <Modal open={open} onClose={() => setOpen(false)} title="Confirm" footer={<Button…/>}>
 *     Body content.
 *   </Modal>
 *
 * Closes on Escape or scrim click (`dismissable` to disable).
 */
export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
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

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open) return null;

  const handleScrim = (e) => {
    if (!dismissable) return;
    if (e.target === e.currentTarget) onClose && onClose();
  };

  return createPortal(
    <div className="sx-modal-scrim" role="presentation" onClick={handleScrim}>
      <div
        className={["sx-modal", `sx-modal--${size}`, className].filter(Boolean).join(" ")}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "sx-modal-title" : undefined}
      >
        {(title || !hideClose) && (
          <div className="sx-modal__head">
            {title && <div id="sx-modal-title" className="sx-modal__title">{title}</div>}
            {!hideClose && (
              <button type="button" className="sx-modal__close" onClick={onClose} aria-label="Close">
                <span className="material-symbols-rounded">close</span>
              </button>
            )}
          </div>
        )}
        <div className="sx-modal__body">{children}</div>
        {footer && <div className="sx-modal__foot">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}
