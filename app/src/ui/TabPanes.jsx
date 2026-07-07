import { motion } from "motion/react";
import { DUR, EASE_BRAND } from "@app/motion/presets.js";

/* Plain fast crossfade — native iOS doesn't animate tab switches at all,
   and translating the pane (a scroll container's ancestor) made iOS drop
   the first swipe after a switch. Inactive panes end visibility:hidden so
   they can't interfere with hit-testing; unlike display:none this keeps
   their scroll positions. */
const paneVariants = {
  active: {
    opacity: 1,
    visibility: "visible",
    transition: { duration: DUR.fast, ease: EASE_BRAND }
  },
  inactive: {
    opacity: 0,
    transition: { duration: 0.1, ease: EASE_BRAND },
    transitionEnd: { visibility: "hidden" }
  }
};

/**
 * Tab panes that keep every tab mounted across switches. Unmount/remount
 * (the old AnimatePresence approach) re-rendered the whole tab tree in the
 * middle of the crossfade — a main-thread hit that stuttered the very
 * animation it triggered — and threw away scroll position and screen state.
 * Panes stack absolutely; the active one crossfades in over the outgoing.
 *
 * `panes` maps key -> rendered element, e.g. { home: <HomeTab /> }.
 */
export function TabPanes({ panes, active }) {
  return (
    <div className="tab-host">
      {Object.entries(panes).map(([key, element]) => {
        const isActive = key === active;
        return (
          <motion.div
            key={key}
            className="tab-pane"
            initial={false}
            animate={isActive ? "active" : "inactive"}
            variants={paneVariants}
            aria-hidden={!isActive}
            style={{
              pointerEvents: isActive ? "auto" : "none",
              zIndex: isActive ? 1 : 0
            }}
          >
            {element}
          </motion.div>
        );
      })}
    </div>
  );
}
