import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { EASE_BRAND } from "@app/motion/presets.js";

/**
 * Money — tabular mono numerals; animates value changes as an
 * odometer-style count (Intercraft: "money animates as odometer ticks").
 * Renders formatted with thousands separators and fixed decimals.
 */
export function Money({ value, decimals = 2, prefix = "", suffix = "", className = "", animateOnMount = false }) {
  const mv = useMotionValue(animateOnMount ? 0 : value);
  const text = useTransform(mv, (v) =>
    `${prefix}${Number(v).toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    })}${suffix}`
  );
  const first = useRef(true);

  useEffect(() => {
    if (first.current && !animateOnMount) {
      first.current = false;
      mv.set(value);
      return undefined;
    }
    first.current = false;
    const controls = animate(mv, value, { duration: 0.6, ease: EASE_BRAND });
    return () => controls.stop();
  }, [value, animateOnMount, mv]);

  return <motion.span className={`money ${className}`}>{text}</motion.span>;
}
