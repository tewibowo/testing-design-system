import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

/**
 * Centered modal dialog.
 *   <Modal open={open} onClose={() => setOpen(false)} title="Confirm" footer={<Button…/>}>
 *     Body content.
 *   </Modal>
 *
 * `variant`:
 *   "default"      — standard header + body + footer.
 *   "illustration" — centered illustration slot (`illustration`) + centered title/body.
 *   "new-feature"  — top media/screenshot block (`media`) + centered title/body.
 * `size`: "sm" | "md" | "lg" | "xl" | 400 (Figma small) | 600 (Figma medium).
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
  variant = "default",
  illustration,
  media,
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

  const isIllustration = variant === "illustration";
  const isNewFeature = variant === "new-feature";
  const centered = isIllustration || isNewFeature;

  return createPortal(
    <div className="sx-modal-scrim" role="presentation" onClick={handleScrim}>
      <div
        className={[
          "sx-modal",
          `sx-modal--${size}`,
          `sx-modal--v-${variant}`,
          className,
        ].filter(Boolean).join(" ")}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "sx-modal-title" : undefined}
      >
        {/* new-feature: top media/screenshot block spans the modal width */}
        {isNewFeature && media && (
          <div className="sx-modal__media">{media}</div>
        )}

        {centered ? (
          <>
            {/* close affordance floats over centered/media layouts */}
            {!hideClose && (
              <button
                type="button"
                className="sx-modal__close sx-modal__close--float"
                onClick={onClose}
                aria-label="Close"
              >
                <span className="material-symbols-rounded">close</span>
              </button>
            )}
            <div className="sx-modal__centered">
              {isIllustration && illustration && (
                <div className="sx-modal__illustration">{illustration}</div>
              )}
              {title && <div id="sx-modal-title" className="sx-modal__title">{title}</div>}
              {children !== undefined && children !== null && (
                <div className="sx-modal__body">{children}</div>
              )}
              {footer && <div className="sx-modal__foot">{footer}</div>}
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
