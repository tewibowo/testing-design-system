import { motion } from "motion/react";
import { DUR, EASE_BRAND, pressable } from "@app/motion/presets.js";

const SLOTS_LEFT = [
  { key: "home", icon: "home", label: "Home" },
  { key: "activity", icon: "receipt_long", label: "Activity" }
];
const SLOTS_RIGHT = [{ key: "account", icon: "account_circle", label: "Account" }];

/**
 * v2 docked tab bar (brief §2.8): icon-only slots, mint layoutId dot under
 * the active tab, raised vibrant-green Move disc that rotates 45° into a
 * close glyph while the Move sheet is open.
 */
export function V2TabBar({ active, onChange, moveOpen, onMove }) {
  const slot = (t) => {
    const isActive = t.key === active;
    return (
      <button
        key={t.key}
        className={`v2-tabbar__item${isActive ? " is-active" : ""}`}
        onClick={() => onChange(t.key)}
        aria-label={t.label}
        aria-current={isActive ? "page" : undefined}
      >
        <span
          className="material-symbols-rounded"
          style={{ fontVariationSettings: `'FILL' ${isActive ? 1 : 0}` }}
        >
          {t.icon}
        </span>
        {isActive && (
          <motion.span
            layoutId="v2-tab-dot"
            className="v2-tabbar__dot"
            transition={{ duration: DUR.slow, ease: EASE_BRAND }}
          />
        )}
      </button>
    );
  };

  return (
    <nav className="v2-tabbar">
      {SLOTS_LEFT.map(slot)}
      <button className="v2-tabbar__move" onClick={onMove} aria-label="Move money" aria-expanded={moveOpen}>
        <motion.span
          className="v2-tabbar__move-disc"
          {...pressable}
          animate={{ rotate: moveOpen ? 45 : 0 }}
          transition={{ duration: DUR.base, ease: EASE_BRAND }}
        >
          <span className="material-symbols-rounded">{moveOpen ? "add" : "swap_vert"}</span>
        </motion.span>
      </button>
      {SLOTS_RIGHT.map(slot)}
    </nav>
  );
}
