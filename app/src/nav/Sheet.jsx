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
 * App-level bottom sheet with spring entrance and drag-to-dismiss.
 * openSheet(renderFn) — renderFn receives { close } and returns content.
 */
export function SheetProvider({ children }) {
  const [current, setCurrent] = useState(null);

  const openSheet = useCallback((render, opts = {}) => {
    setCurrent({ render, opts });
  }, []);

  const closeSheet = useCallback(() => setCurrent(null), []);

  return (
    <SheetContext.Provider value={{ openSheet, closeSheet }}>
      {children}
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
    </SheetContext.Provider>
  );
}
