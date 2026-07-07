// Tiny v2-styled toast (brief §4.8: slide down from top, auto-dismiss ~2s).
// The DS Toast is light-theme; on ivy we render our own teal hairline pill.
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { toast as toastPreset } from "@app/motion/presets.js";

let seq = 0;

export function useV2HomeToast() {
  const [item, setItem] = useState(null);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const showToast = useCallback((title) => {
    setItem({ title, key: ++seq });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setItem(null), 2000);
  }, []);

  const toastNode = (
    <div className="v2home-toast-region" aria-live="polite">
      <AnimatePresence>
        {item && (
          <motion.div
            key={item.key}
            className="v2home-toast"
            initial={toastPreset.initial}
            animate={toastPreset.enter}
            exit={toastPreset.exit}
          >
            <span className="material-symbols-rounded" aria-hidden="true">
              check_circle
            </span>
            {item.title}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return [toastNode, showToast];
}
