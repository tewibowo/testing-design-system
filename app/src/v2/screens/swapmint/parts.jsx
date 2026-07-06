// Shared v2 swapmint building blocks — toast layer (§4.8: toast preset,
// auto-dismiss ~2s, ivy text on mint bg per brief §2.3), press-and-hold
// commit pill (§4.7), clipboard helper and the bold-marker helper for
// verbatim db copy. Area-local: shared core files stay untouched.
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { toast as toastPreset, SETTLE } from "@app/motion/presets.js";
import "./v2swapmint-shared.css";

/* ── Toasts ── */

export function useV2Toasts(duration = 2000) {
  const [items, setItems] = useState([]);
  const seq = useRef(0);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const show = useCallback(
    (title) => {
      const id = ++seq.current;
      setItems((prev) => [...prev.slice(-2), { id, title }]);
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

export function V2ToastLayer({ items }) {
  return (
    <div className="v2swapmint-toasts" aria-live="polite">
      <AnimatePresence mode="popLayout">
        {items.map((t) => (
          <motion.div
            key={t.id}
            layout
            className="v2swapmint-toast"
            initial={toastPreset.initial}
            animate={toastPreset.enter}
            exit={toastPreset.exit}
          >
            {t.title}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ── Clipboard (best effort; the toast is the feedback either way) ── */

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    /* clipboard unavailable in this context */
  }
}

/* ── Press-and-hold commit pill (§4.7) ──
 * Mint fill wipes left→right over 600ms linear while held; releasing early
 * reverts the fill with SETTLE (bounce 0). Keyboard activation commits
 * directly (holding isn't a keyboard gesture). */

const HOLD_MS = 600;

export function HoldPill({ children, onCommit }) {
  const [held, setHeld] = useState(false);
  const [committed, setCommitted] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const commit = () => {
    setCommitted(true);
    onCommit();
  };

  const down = () => {
    if (committed) return;
    setHeld(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(commit, HOLD_MS);
  };

  const up = () => {
    if (committed) return;
    clearTimeout(timer.current);
    setHeld(false);
  };

  return (
    <button
      type="button"
      className="v2swapmint-hold"
      onPointerDown={down}
      onPointerUp={up}
      onPointerLeave={up}
      onPointerCancel={up}
      onContextMenu={(e) => e.preventDefault()}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !committed) {
          e.preventDefault();
          commit();
        }
      }}
    >
      <motion.span
        className="v2swapmint-hold__fill"
        initial={false}
        animate={{ scaleX: held || committed ? 1 : 0 }}
        transition={
          held || committed ? { duration: HOLD_MS / 1000, ease: "linear" } : SETTLE
        }
        aria-hidden="true"
      />
      <span className="v2swapmint-hold__label">{children}</span>
    </button>
  );
}

/* ── Bold-marker helper: wraps emphasised fragments of verbatim db copy ──
 * em("… initiate a FAST Transfer only.", ["FAST Transfer"])
 *   → ["… initiate a ", <strong>FAST Transfer</strong>, " only."] */

export function em(text, markers = []) {
  let parts = [text];
  markers.forEach((marker, mi) => {
    parts = parts.flatMap((part, pi) => {
      if (typeof part !== "string") return [part];
      const out = [];
      let rest = part;
      let hit;
      let n = 0;
      while ((hit = rest.indexOf(marker)) !== -1) {
        if (hit > 0) out.push(rest.slice(0, hit));
        out.push(<strong key={`em-${mi}-${pi}-${n++}`}>{marker}</strong>);
        rest = rest.slice(hit + marker.length);
      }
      if (rest) out.push(rest);
      return out;
    });
  });
  return parts;
}
