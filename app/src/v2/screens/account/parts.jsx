// Shared v2 account-area bits: dark-theme status tags, confirm-sheet body,
// copy helper and a local toast stack. Toasts portal into the .device frame
// so they overlay open bottom sheets (sheet panel z-index 41 < toast 60).

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { toast as toastPreset } from "@app/motion/presets.js";
import "./v2account-sheets.css";

// Neither value is captured in reference/specs — both reconstructed
// (§2.7 asks for an Account ID copy row and a read-only version row).
export const ACCOUNT_ID = "SX-7719-2054-3"; // reconstructed
export const APP_VERSION = "2.0.0"; // reconstructed

/** Best-effort clipboard write; the toast is the real feedback in the demo. */
export function copyText(text) {
  try {
    navigator.clipboard?.writeText(text);
  } catch {
    /* clipboard unavailable in some embeds — demo continues via toast */
  }
}

/**
 * Pill tag on dark ivy (§2.7: mint text on rgba(121,255,202,0.12)).
 * The DS Tag resolves to light-theme status surfaces, so v2 re-implements
 * the visual with the brief's exact recipe. tone: mint | neutral | warning.
 */
export function V2Tag({ tone = "mint", icon, children }) {
  return (
    <span className={`v2account-tag${tone !== "mint" ? ` v2account-tag--${tone}` : ""}`}>
      {icon && <span className="material-symbols-rounded" aria-hidden="true">{icon}</span>}
      {children}
    </span>
  );
}

/** Status → tag mapping shared by bank / address sheets (labels verbatim from db). */
export function V2StatusTag({ status }) {
  if (status === "Verified") return <V2Tag tone="mint" icon="check_circle">Verified</V2Tag>;
  if (status === "Pending") return <V2Tag tone="warning" icon="schedule">Pending</V2Tag>;
  return <V2Tag tone="neutral">{status}</V2Tag>;
}

/**
 * Confirmation body for useSheet(): title + body + stacked pills.
 * `critical` renders the confirm pill in the dark-tinted critical color
 * (v2 rule: never the DS Button's light-theme variants).
 */
export function V2ConfirmSheet({
  title,
  body,
  confirmLabel,
  cancelLabel = "Cancel",
  critical = false,
  onConfirm,
  close
}) {
  return (
    <div className="v2account-confirm">
      <h3 className="v2account-confirm__title">{title}</h3>
      {body && <p className="v2account-confirm__body">{body}</p>}
      <div className="v2account-confirm__actions">
        <button
          type="button"
          className={`v2account-pill${critical ? " v2account-pill--critical" : ""}`}
          onClick={() => {
            close();
            onConfirm && onConfirm();
          }}
        >
          {confirmLabel}
        </button>
        <button type="button" className="v2account-pill v2account-pill--ghost" onClick={close}>
          {cancelLabel}
        </button>
      </div>
    </div>
  );
}

/* ── Local toasts (motion `toast` preset, auto-dismiss 2s per §4.8) ── */

let toastSeq = 0;

export function useV2Toasts() {
  const [items, setItems] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  }, []);

  const show = useCallback(
    (message, tone = "mint") => {
      const id = ++toastSeq;
      setItems((prev) => [...prev.slice(-2), { id, message, tone }]);
      timers.current[id] = setTimeout(() => dismiss(id), 2000);
    },
    [dismiss]
  );

  useEffect(() => {
    const all = timers.current;
    return () => Object.values(all).forEach(clearTimeout);
  }, []);

  return { items, show, dismiss };
}

export function V2ToastStack({ items, dismiss }) {
  const [host, setHost] = useState(null);
  useEffect(() => {
    setHost(document.querySelector(".device") ?? null);
  }, []);

  const stack = (
    <div className="v2account-toasts" aria-live="polite">
      <AnimatePresence>
        {items.map((t) => (
          <motion.div
            key={t.id}
            layout
            className="v2account-toast"
            initial={toastPreset.initial}
            animate={toastPreset.enter}
            exit={toastPreset.exit}
            onClick={() => dismiss(t.id)}
          >
            <span
              className={`material-symbols-rounded${t.tone === "info" ? " is-info" : ""}`}
              aria-hidden="true"
            >
              {t.tone === "info" ? "info" : "check_circle"}
            </span>
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  return host ? createPortal(stack, host) : stack;
}
