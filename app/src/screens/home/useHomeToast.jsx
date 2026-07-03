import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { toast as toastPreset } from "@app/motion/presets.js";
import { Toast } from "@ds/components/Toast/Toast.jsx";
import "./home.css";

/**
 * Local toast for the home area — the app shell mounts no global
 * ToastProvider, so each screen renders its own region (DS `Toast`
 * inside a motion wrapper using the shared `toast` preset).
 *
 * const [toastNode, showToast] = useHomeToast();
 * showToast("Copied");
 * …render {toastNode} inside a relatively-positioned wrapper.
 */
export function useHomeToast() {
  const [current, setCurrent] = useState(null);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const showToast = useCallback((title) => {
    clearTimeout(timer.current);
    setCurrent({ id: Date.now(), title });
    timer.current = setTimeout(() => setCurrent(null), 2400);
  }, []);

  const toastNode = (
    <div className="home-toast-region" aria-live="polite">
      <AnimatePresence>
        {current && (
          <motion.div
            key={current.id}
            initial={toastPreset.initial}
            animate={toastPreset.enter}
            exit={toastPreset.exit}
          >
            <Toast title={current.title} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return [toastNode, showToast];
}
