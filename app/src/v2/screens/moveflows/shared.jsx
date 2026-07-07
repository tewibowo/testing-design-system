// Shared moveflows bits — mint pill toast (§2.3 / §4.8: ivy text on mint bg,
// slide down from top, auto-dismiss 2s) and a clipboard helper.
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { toast as toastPreset } from "@app/motion/presets.js";
import "./v2moveflows-shared.css";

let toastSeq = 0;

export function useMoveToast() {
  const [note, setNote] = useState(null);
  const showToast = useCallback((title) => setNote({ id: ++toastSeq, title }), []);
  const clearToast = useCallback(() => setNote(null), []);
  return { note, showToast, clearToast };
}

export function MoveToastLayer({ note, onClear }) {
  useEffect(() => {
    if (!note) return undefined;
    const t = setTimeout(onClear, 2000);
    return () => clearTimeout(t);
  }, [note, onClear]);
  return (
    <div className="v2mf-toast-region" aria-live="polite">
      <AnimatePresence>
        {note && (
          <motion.div
            key={note.id}
            className="v2mf-toast"
            variants={toastPreset}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            {note.title}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Best-effort clipboard write; the toast is the prototype's real feedback. */
export function copyText(value) {
  try {
    navigator.clipboard?.writeText(value);
  } catch {
    /* prototype — toast still fires */
  }
}
