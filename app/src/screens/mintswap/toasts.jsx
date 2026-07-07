// Local toast layer for the mintswap screens. The DS ToastProvider is not
// mounted in the app shell, so each screen hosts its own lightweight layer
// (DS Toast visual + the shared `toast` motion preset).
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Toast } from "@ds/components/Toast/Toast.jsx";
import { toast as toastPreset } from "@app/motion/presets.js";
import "./mintswap.css";

export function useToasts(duration = 2200) {
  const [items, setItems] = useState([]);
  const seq = useRef(0);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const show = useCallback(
    (title, tone = "positive") => {
      const id = ++seq.current;
      setItems((prev) => [...prev.slice(-2), { id, title, tone }]);
      timers.current.push(
        setTimeout(() => {
          setItems((prev) => prev.filter((t) => t.id !== id));
        }, duration)
      );
    },
    [duration]
  );

  return { items, show };
}

export function ToastLayer({ items }) {
  return (
    <div className="mintswap-toasts" aria-live="polite">
      <AnimatePresence mode="popLayout">
        {items.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={toastPreset.initial}
            animate={toastPreset.enter}
            exit={toastPreset.exit}
          >
            <Toast tone={t.tone} title={t.title} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
