// Shared account-area bits: confirm-sheet body, status tag mapping and a
// local toast stack (the app shell has no ToastProvider, so each screen
// hosts its own — DS <Toast> visuals + the app `toast` motion preset).

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@ds/components/Button/Button.jsx";
import { Tag } from "@ds/components/Tag/Tag.jsx";
import { Toast } from "@ds/components/Toast/Toast.jsx";
import { toast as toastPreset } from "@app/motion/presets.js";
import "./account.css";

/**
 * Small confirmation body for useSheet(): heading + body + stacked actions.
 * `critical` restyles the confirm button via the account-btn--critical
 * override (the DS Button has no critical variant).
 */
export function ConfirmSheet({
  title,
  body,
  confirmLabel,
  cancelLabel = "Cancel",
  critical = false,
  onConfirm,
  close
}) {
  return (
    <div className="account-confirm">
      <h3 className="account-confirm__title">{title}</h3>
      {body && <p className="account-confirm__body">{body}</p>}
      <div className="account-confirm__actions">
        <Button
          variant="primary"
          className={critical ? "account-btn--critical" : ""}
          onClick={() => {
            close();
            onConfirm && onConfirm();
          }}
        >
          {confirmLabel}
        </Button>
        <Button variant="secondary" onClick={close}>
          {cancelLabel}
        </Button>
      </div>
    </div>
  );
}

/** Status-tag matrix from the spec (§7) — one mapping used everywhere. */
export function StatusTag({ status }) {
  if (status === "Verified") {
    return <Tag tone="positive" appearance="outlined" size="small">Verified</Tag>;
  }
  if (status === "Pending") {
    return <Tag tone="warning" appearance="outlined" size="small" icon="schedule">Pending</Tag>;
  }
  if (status === "Not Verified") {
    return <Tag tone="neutral" appearance="outlined" size="small">Not Verified</Tag>;
  }
  return <Tag tone="neutral" appearance="outlined" size="small">Unverified</Tag>;
}

/* ── Local toasts ─────────────────────────────────────────────── */

let toastSeq = 0;

export function useToasts() {
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
    (toast) => {
      const id = ++toastSeq;
      setItems((prev) => [...prev.slice(-2), { id, ...toast }]);
      timers.current[id] = setTimeout(() => dismiss(id), 3200);
    },
    [dismiss]
  );

  return { items, show, dismiss };
}

export function ToastStack({ items, dismiss }) {
  return (
    <div className="account-toasts" aria-live="polite">
      <AnimatePresence>
        {items.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={toastPreset.initial}
            animate={toastPreset.enter}
            exit={toastPreset.exit}
          >
            <Toast tone={t.tone || "positive"} title={t.title} onDismiss={() => dismiss(t.id)}>
              {t.message}
            </Toast>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
