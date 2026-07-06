// Date-range filter sheet (brief §2.5.4 — Acorns radio-list pattern):
// radio rows, selected row hairlined in mint with a trailing check,
// single green "Apply" pill. Applied range shows as a removable chip
// in the Activity chips row (Plazo pattern).
import { useState } from "react";
import { motion } from "motion/react";
import { listContainer, listItem, pressable } from "@app/motion/presets.js";
import { DATE_RANGES } from "./shared.jsx";
import "./v2activity-sheets.css";

export function V2ActivityFilterSheet({ initial, onApply, close }) {
  const [sel, setSel] = useState(initial);

  const apply = () => {
    onApply(sel);
    close();
  };

  return (
    <motion.div
      className="v2activity-filter"
      variants={listContainer}
      initial="initial"
      animate="enter"
      role="radiogroup"
      aria-label="Filter by date"
    >
      <motion.div className="v2activity-filter__title" variants={listItem}>
        Filter by date
      </motion.div>
      {DATE_RANGES.map((r) => (
        <motion.button
          key={r.id}
          type="button"
          variants={listItem}
          {...pressable}
          className={"v2activity-filter__row" + (sel === r.id ? " is-selected" : "")}
          role="radio"
          aria-checked={sel === r.id}
          onClick={() => setSel(r.id)}
        >
          <span>{r.label}</span>
          {sel === r.id && (
            <span className="material-symbols-rounded" aria-hidden="true">
              check
            </span>
          )}
        </motion.button>
      ))}
      <motion.button
        type="button"
        variants={listItem}
        {...pressable}
        className="v2activity-apply"
        onClick={apply}
      >
        Apply
      </motion.button>
    </motion.div>
  );
}
