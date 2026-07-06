import { createContext, useCallback, useContext, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { sheet, scrim } from "@app/motion/presets.js";

const SheetContext = createContext(null);

export function useSheet() {
  const ctx = useContext(SheetContext);
  if (!ctx) throw new Error("useSheet must be used inside <SheetProvider>");
  return ctx;
}

/**
 * Sheet state/context provider. Wrap the app with this, and mount
 * <SheetHost /> INSIDE the StackNavigator (as its child) so sheet content
 * can use useNav() — the host renders under the navigator's context.
 *
 * openSheet(renderFn, opts) — renderFn receives { close }.
 * opts.onDismiss fires on ANY close path (scrim tap, drag, closeSheet).
 */
export function SheetProvider({ children }) {
  const [current, setCurrent] = useState(null);

  const openSheet = useCallback((render, opts = {}) => {
    setCurrent({ render, opts });
  }, []);

  const closeSheet = useCallback(() => {
    setCurrent((cur) => {
      if (cur?.opts?.onDismiss) queueMicrotask(cur.opts.onDismiss);
      return null;
    });
  }, []);

  return (
    <SheetContext.Provider value={{ openSheet, closeSheet, current }}>
      {children}
    </SheetContext.Provider>
  );
}

/** Overlay renderer — mount once, inside the navigator. */
export function SheetHost() {
  const { current, closeSheet } = useSheet();
  return (
    <AnimatePresence>
      {current && (
        <>
          <motion.div
            key="sheet-scrim"
            className="sheet-scrim"
            initial={scrim.initial}
            animate={scrim.enter}
            exit={scrim.exit}
            onClick={closeSheet}
          />
          <motion.div
            key="sheet-panel"
            className="sheet-panel"
            initial={sheet.initial}
            animate={sheet.enter}
            exit={sheet.exit}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_e, info) => {
              if (info.offset.y > 120 || info.velocity.y > 600) closeSheet();
            }}
          >
            <div className="sheet-grabber" />
            {current.render({ close: closeSheet })}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
