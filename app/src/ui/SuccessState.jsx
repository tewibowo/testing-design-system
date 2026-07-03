import { motion } from "motion/react";
import { EASE_BRAND } from "@app/motion/presets.js";

/**
 * Animated success screen body: circle pops in, check draws itself,
 * then copy rises in. Storyboarded with overlapping steps.
 */
export function SuccessState({ title, body, children, tone = "positive" }) {
  const ring = tone === "positive" ? "var(--sx-color-vibrant-green, #00D37E)" : "var(--sx-color-warning, #F79410)";
  return (
    <div className="success-state">
      <motion.div
        className="success-state__circle"
        style={{ background: ring }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.32, ease: EASE_BRAND }}
      >
        <svg viewBox="0 0 52 52" width="56" height="56" fill="none" aria-hidden>
          <motion.path
            d="M14 27 L23 36 L38 18"
            stroke="var(--sx-color-deep-ivy, #002B2A)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.36, ease: EASE_BRAND, delay: 0.18 }}
          />
        </svg>
      </motion.div>
      <motion.h2
        className="success-state__title"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, ease: EASE_BRAND, delay: 0.3 }}
      >
        {title}
      </motion.h2>
      {body && (
        <motion.p
          className="success-state__body"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: EASE_BRAND, delay: 0.38 }}
        >
          {body}
        </motion.p>
      )}
      {children && (
        <motion.div
          className="success-state__actions"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: EASE_BRAND, delay: 0.46 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
