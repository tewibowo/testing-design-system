// In-frame centered modal for the mintswap flows. The DS Modal portals to
// document.body (escapes the phone frame on desktop) and has no motion
// presets, so this small shell replaces it: scrim + card on the brand
// modalCard preset, positioned inside the current stack frame.
import { AnimatePresence, motion } from "motion/react";
import { modalCard, scrim } from "@app/motion/presets.js";
import "./mintswap.css";

export function MintswapModal({
  open,
  onClose,
  title,
  icon = null,
  children,
  footer = null,
  headDivider = true
}) {
  return (
    <AnimatePresence>
      {open && (
        <div className="mintswap-modal-host" role="dialog" aria-modal="true" aria-label={title}>
          <motion.div
            className="mintswap-modal-scrim"
            initial={scrim.initial}
            animate={scrim.enter}
            exit={scrim.exit}
            onClick={onClose}
          />
          <motion.div
            className="mintswap-modal-card"
            initial={modalCard.initial}
            animate={modalCard.enter}
            exit={modalCard.exit}
          >
            <div className={"mintswap-modal__head" + (headDivider ? " has-divider" : "")}>
              {icon}
              <h3 className="mintswap-modal__title">{title}</h3>
              <button
                type="button"
                className="mintswap-modal__close"
                aria-label="Close"
                onClick={onClose}
              >
                <span className="material-symbols-rounded">close</span>
              </button>
            </div>
            <div className="mintswap-modal__body">{children}</div>
            {footer && <div className="mintswap-modal__foot">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
