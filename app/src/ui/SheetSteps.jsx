import { AnimatePresence, motion } from "motion/react";
import { DUR, EASE_BRAND } from "@app/motion/presets.js";

/* ────────────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — sheet step change (interfacecraft §Animation)
 *    0ms  user commits a step (tap CTA / back)
 *    0ms  outgoing step fades + slides 24px (against travel direction)
 *  ~40ms  incoming step enters from travel direction (popLayout —
 *         no wait for exit), sheet height re-lays out via `layout`
 *  200ms  settle. One brand ease everywhere, interruptible throughout.
 * ──────────────────────────────────────────────────────────────── */

const TIMING = { step: DUR.base, exit: 0.13 };

/**
 * SheetStepHeader — title row for multi-step sheets: back chevron
 * (only when onBack given), title, and step dots (progress).
 */
export function SheetStepHeader({ title, onBack, step, total }) {
  return (
    <div className="sheetsteps__header">
      <span className="sheetsteps__side">
        {onBack && (
          <button className="sheetsteps__back" aria-label="Back" onClick={onBack}>
            <span className="material-symbols-rounded">chevron_left</span>
          </button>
        )}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={title}
          className="sheetsteps__title"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: TIMING.step, ease: EASE_BRAND }}
        >
          {title}
        </motion.span>
      </AnimatePresence>
      <span className="sheetsteps__side sheetsteps__side--right">
        {total > 1 && (
          <span className="sheetsteps__dots" aria-label={`Step ${step} of ${total}`}>
            {Array.from({ length: total }, (_, i) => (
              <span
                key={i}
                className={`sheetsteps__dot${i < step ? " is-done" : ""}${
                  i === step - 1 ? " is-current" : ""
                }`}
              />
            ))}
          </span>
        )}
      </span>
    </div>
  );
}

/**
 * SheetSteps — animates children when `stepKey` changes. `direction` 1 =
 * forward (enter from right), -1 = back (enter from left). The wrapper is
 * a layout container so the sheet height glides between steps instead of
 * jumping.
 */
export function SheetSteps({ stepKey, direction = 1, children }) {
  return (
    <motion.div layout className="sheetsteps__viewport" transition={{ duration: TIMING.step, ease: EASE_BRAND }}>
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        <motion.div
          key={stepKey}
          className="sheetsteps__step"
          custom={direction}
          initial={{ opacity: 0, x: 24 * direction }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 * direction }}
          transition={{ duration: TIMING.step, ease: EASE_BRAND }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
