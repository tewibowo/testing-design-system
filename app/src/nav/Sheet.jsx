import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion, useDragControls } from "motion/react";
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

/**
 * Tracks the on-screen keyboard: iOS overlays it on the layout viewport,
 * so a bottom-anchored sheet would hide behind it. Returns the overlap in
 * px so the sheet can lift above the keyboard.
 */
function useKeyboardInset() {
  const [inset, setInset] = useState(0);
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return undefined;
    const update = () =>
      setInset(Math.max(0, window.innerHeight - vv.height - vv.offsetTop));
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    update();
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, []);
  return inset;
}

/** Overlay renderer — mount once, inside the navigator. */
export function SheetHost() {
  const { current, closeSheet } = useSheet();
  const kbInset = useKeyboardInset();
  // Dismissal drag starts from the handle strip only. Putting drag="y" on
  // the panel itself made the panel the gesture target for every touch, and
  // the touch-action framer applies for that kills native scrolling — tall
  // sheet content then scrolled through JS-blocked jitter instead of the
  // compositor.
  const dragControls = useDragControls();
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
            style={{ maxHeight: kbInset ? "96%" : undefined }}
            initial={sheet.initial}
            animate={sheet.enter}
            exit={sheet.exit}
            drag="y"
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_e, info) => {
              if (info.offset.y > 120 || info.velocity.y > 600) closeSheet();
            }}
          >
            <div
              className="sheet-handle"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="sheet-grabber" />
            </div>
            <div
              className="sheet-body"
              style={{
                // Keyboard handling: keep the panel anchored to the screen
                // bottom (surface runs behind the keyboard) and raise only
                // the CONTENT via bottom padding — lifting the panel itself
                // exposed the scrim beneath it.
                paddingBottom: kbInset ? `calc(16px + ${kbInset}px)` : undefined,
                transition:
                  "padding-bottom 200ms cubic-bezier(0.2, 0.7, 0.2, 1)"
              }}
            >
              {current.render({ close: closeSheet })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
