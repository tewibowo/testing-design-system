import { motion } from "motion/react";
import { DUR, EASE_BRAND } from "@app/motion/presets.js";

/* Same feel as motion/presets tabContent (fade + whisper of rise), but
   driven by variant switches on panes that STAY MOUNTED. */
const paneVariants = {
  active: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE_BRAND }
  },
  inactive: {
    opacity: 0,
    y: 6,
    transition: { duration: 0.13, ease: EASE_BRAND }
  }
};

/**
 * Tab panes that keep every tab mounted across switches. Unmount/remount
 * (the old AnimatePresence approach) re-rendered the whole tab tree in the
 * middle of the crossfade — a main-thread hit that stuttered the very
 * animation it triggered — and threw away scroll position and screen state.
 * Panes stack absolutely; the active one rises in over the outgoing one.
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
