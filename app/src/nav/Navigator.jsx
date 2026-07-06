import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState
} from "react";
import { AnimatePresence, animate, motion, useMotionValue } from "motion/react";
import { stackScreen, scrim, DUR, EASE_STACK } from "@app/motion/presets.js";

const NavContext = createContext(null);

export function useNav() {
  const nav = useContext(NavContext);
  if (!nav) throw new Error("useNav must be used inside <StackNavigator>");
  return nav;
}

let keySeq = 0;

/**
 * iOS-style stack navigator.
 * - push(name, params) slides a screen in from the right
 * - pop() slides it out; edge-swipe from the left also pops
 * - the screen underneath retreats with parallax + dim
 *
 * `screens` maps name -> component. The root entry stays mounted so
 * tab state survives pushes.
 */
export function StackNavigator({ screens, initial, initialParams = {}, children }) {
  const [stack, setStack] = useState(() => [
    { key: `s${keySeq++}`, name: initial, params: initialParams }
  ]);

  const push = useCallback((name, params = {}) => {
    setStack((s) => [...s, { key: `s${keySeq++}`, name, params }]);
  }, []);

  const pop = useCallback(() => {
    setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  }, []);

  const popToRoot = useCallback(() => {
    setStack((s) => s.slice(0, 1));
  }, []);

  const replace = useCallback((name, params = {}) => {
    setStack((s) => [...s.slice(0, -1), { key: `s${keySeq++}`, name, params }]);
  }, []);

  const reset = useCallback((name, params = {}) => {
    setStack([{ key: `s${keySeq++}`, name, params }]);
  }, []);

  const nav = useMemo(
    () => ({ push, pop, popToRoot, replace, reset }),
    [push, pop, popToRoot, replace, reset]
  );

  return (
    <NavContext.Provider value={nav}>
      <div className="stack-root">
        <AnimatePresence initial={false}>
          {stack.map((entry, i) => {
            const Screen = screens[entry.name];
            if (!Screen) throw new Error(`Unknown screen: ${entry.name}`);
            const isTop = i === stack.length - 1;
            return (
              <StackFrame
                key={entry.key}
                isTop={isTop}
                isRoot={i === 0}
                onSwipeBack={pop}
              >
                <Screen params={entry.params} isTop={isTop} />
              </StackFrame>
            );
          })}
        </AnimatePresence>
      </div>
      {/* Overlays (e.g. SheetHost) render here so they can useNav(). */}
      {children}
    </NavContext.Provider>
  );
}

function StackFrame({ children, isTop, isRoot, onSwipeBack }) {
  // Externally-owned x so the edge swipe can move the frame directly; the
  // enter/covered/exit variants write to this same value, so gesture and
  // animation stay in sync and interrupt each other cleanly.
  const x = useMotionValue(0);
  const dragStartX = useRef(null);

  // Edge-swipe back: only armed when the touch starts near the left edge.
  const onPanStart = (e, info) => {
    const host = e.currentTarget?.getBoundingClientRect?.();
    const originX = info.point.x - (host?.left ?? 0);
    dragStartX.current = originX < 36 ? originX : null;
  };

  const onPan = (_e, info) => {
    if (dragStartX.current == null) return;
    x.set(Math.max(0, info.offset.x));
  };

  const onPanEnd = (_e, info) => {
    if (dragStartX.current == null) return;
    const shouldPop = info.offset.x > 110 || info.velocity.x > 500;
    if (shouldPop) {
      onSwipeBack();
    } else {
      animate(x, 0, { duration: DUR.base, ease: EASE_STACK });
    }
    dragStartX.current = null;
  };

  // Pan tracking is only wired on frames that can actually pop — the root
  // frame hosts the most scrolling, and pointer-tracking JS during native
  // scrolls is wasted work there.
  const panHandlers = isRoot ? {} : { onPanStart, onPan, onPanEnd };

  return (
    <motion.div
      className="stack-frame"
      initial={isRoot ? false : stackScreen.initial}
      animate={isTop ? stackScreen.enter : stackScreen.covered}
      exit={stackScreen.exit}
      {...panHandlers}
      style={{ x, touchAction: "pan-y" }}
    >
      {children}
      <AnimatePresence>
        {!isTop && (
          <motion.div
            className="stack-dim"
            initial={scrim.initial}
            animate={scrim.enter}
            exit={scrim.exit}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
