import { motion } from "motion/react";
import { pressable } from "@app/motion/presets.js";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "back"];

/**
 * Borderless in-app keypad (brief §2.2.6): 4×3 grid, Red Hat Display
 * SemiBold digits, press = overlay flash + pressable scale. Money flows
 * never show a text field — the amount is state driven by this keypad.
 *
 * onKey receives "0"-"9", "." or "back".
 * `decimal={false}` hides the dot (passcode use).
 */
export function Keypad({ onKey, decimal = true }) {
  return (
    <div className="v2-keypad">
      {KEYS.map((k) => {
        if (k === "." && !decimal) return <span key={k} aria-hidden="true" />;
        return (
          <motion.button
            key={k}
            {...pressable}
            className="v2-keypad__key"
            onClick={() => onKey(k)}
            aria-label={k === "back" ? "Delete" : k}
          >
            {k === "back" ? (
              <span className="material-symbols-rounded">backspace</span>
            ) : (
              k
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

/**
 * Amount edit helper: applies a keypad key to an amount string.
 * Keeps at most `decimals` fraction digits; strips leading zeros.
 */
export function applyKey(amount, key, decimals = 2) {
  if (key === "back") return amount.slice(0, -1);
  if (key === ".") {
    if (!amount) return "0.";
    return amount.includes(".") ? amount : amount + ".";
  }
  const next = amount === "0" ? key : amount + key;
  const [, frac] = next.split(".");
  if (frac && frac.length > decimals) return amount;
  return next;
}
