// Shared bits for the auth area: local toast layer, countdown hook,
// Google "G" mark, OR divider, decorative brand slashes.
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Toast } from "@ds/components/Toast/Toast.jsx";
import { toast as toastPreset } from "@app/motion/presets.js";
import "./auth.css";

/**
 * Screen-local toast (there is no app-level ToastProvider).
 * Returns [element, show] — render `element` as a sibling of `.screen-scroll`,
 * call `show("Message")` or `show("Message", "info")`.
 */
export function useAuthToast() {
  const [item, setItem] = useState(null);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const show = useCallback((title, tone = "positive") => {
    clearTimeout(timer.current);
    setItem({ id: Date.now(), title, tone });
    timer.current = setTimeout(() => setItem(null), 2600);
  }, []);

  const element = (
    <div className="auth-toast-region" aria-live="polite">
      <AnimatePresence mode="popLayout">
        {item && (
          <motion.div
            key={item.id}
            className="auth-toast"
            initial={toastPreset.initial}
            animate={toastPreset.enter}
            exit={toastPreset.exit}
          >
            <Toast tone={item.tone} title={item.title} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return [element, show];
}

/** Ticking countdown. Returns [secondsLeft, restart]. */
export function useCountdown(seconds) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    if (left <= 0) return undefined;
    const t = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);
  const restart = useCallback(() => setLeft(seconds), [seconds]);
  return [left, restart];
}

/** mm:ss — 57 → "00:57". */
export function fmtClock(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/** Standard 4-color Google "G". */
export function GoogleG({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

/** "OR" divider between primary and social actions. */
export function OrDivider() {
  return (
    <div className="auth-or" role="separator">
      OR
    </div>
  );
}

/** Decorative brand slash cluster (top-right corner, behind content). */
export function AuthDecor() {
  return (
    <svg
      className="auth-decor"
      viewBox="0 0 160 120"
      width="160"
      height="120"
      aria-hidden="true"
    >
      <g transform="skewX(-24)">
        <rect x="118" y="6" width="36" height="12" rx="2" fill="var(--primary)" opacity="0.9" />
        <rect
          x="146"
          y="30"
          width="48"
          height="12"
          rx="2"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1.5"
          opacity="0.65"
        />
        <rect x="106" y="54" width="28" height="12" rx="2" fill="var(--primary)" opacity="0.3" />
      </g>
    </svg>
  );
}
