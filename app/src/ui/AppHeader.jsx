import { motion } from "motion/react";
import { useNav } from "@app/nav/Navigator.jsx";
import { pressable } from "@app/motion/presets.js";

/**
 * Mobile top bar. Variants:
 * - back + centered title (pushed screens)
 * - large title + right actions (tab roots)
 */
export function AppHeader({ title, back = false, large = false, right = null, transparent = false }) {
  const nav = useNav();
  return (
    <div className={`app-header${large ? " app-header--large" : ""}${transparent ? " app-header--transparent" : ""}`}>
      <div className="app-header__row">
        <div className="app-header__side">
          {back && (
            <motion.button
              {...pressable}
              className="app-header__back"
              aria-label="Back"
              onClick={() => nav.pop()}
            >
              <span className="material-symbols-rounded">arrow_back_ios_new</span>
            </motion.button>
          )}
        </div>
        {!large && <div className="app-header__title">{title}</div>}
        <div className="app-header__side app-header__side--right">{right}</div>
      </div>
      {large && <h1 className="app-header__large-title">{title}</h1>}
    </div>
  );
}
