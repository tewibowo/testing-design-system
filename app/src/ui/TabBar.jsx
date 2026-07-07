import { motion } from "motion/react";
import { DUR, EASE_BRAND } from "@app/motion/presets.js";

/**
 * Bottom tab bar. tabs: [{ key, label, icon, badge? }]
 */
export function TabBar({ tabs, active, onChange }) {
  return (
    <nav className="tabbar">
      {tabs.map((t) => {
        const isActive = t.key === active;
        return (
          <button
            key={t.key}
            className={`tabbar__item${isActive ? " is-active" : ""}`}
            onClick={() => onChange(t.key)}
            aria-current={isActive ? "page" : undefined}
          >
            {/* Glass lens covers the WHOLE tab (icon + label) and slides
                between items via the shared layoutId. */}
            {isActive && (
              <motion.span
                layoutId="tab-pill"
                className="tabbar__pill"
                transition={{ duration: DUR.slow, ease: EASE_BRAND }}
              />
            )}
            <span className="tabbar__icon-wrap">
              <span
                className="material-symbols-rounded tabbar__icon"
                style={{ fontVariationSettings: `'FILL' ${isActive ? 1 : 0}, 'wght' ${isActive ? 500 : 400}` }}
              >
                {t.icon}
              </span>
              {t.badge ? <span className="tabbar__badge">{t.badge}</span> : null}
            </span>
            <span className="tabbar__label">{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
