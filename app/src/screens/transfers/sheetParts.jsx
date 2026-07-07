/* ────────────────────────────────────────────────────────────────
 * Shared primitives for the transfers bottom-sheet flows.
 *
 * ANIMATION STORYBOARD — commit CTA (CommitButton)
 *    0ms  tap → button scales 0.97 (pressable)
 *   ~0ms  label swaps down/up (popLayout) to "<busyLabel>" with a
 *         spinning ring INSIDE the button — no global spinner
 *  600ms  parent's commit() timer fires → flow advances; label swaps back
 *
 * ANIMATION STORYBOARD — in-sheet success (SheetSuccess)
 *    0ms  green circle pops in (scale .5 → 1)
 *  180ms  check path draws itself (360ms)
 *  300ms  title rises in; body +80ms; actions +160ms (staggered)
 * ──────────────────────────────────────────────────────────────── */
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { listItem, pressable, DUR, EASE_BRAND } from "@app/motion/presets.js";
import { Button } from "@ds/components/Button/Button.jsx";
import "./transfers.css";

// The only place shared timing values live (per-flow storyboards import these).
export const SHEET_TIMING = {
  commit: 600,           // fake-processing window for commit CTAs (BUILDERS.md)
  note: 2200,            // transient acknowledgement chip lifetime
  check: { circle: DUR.modal, draw: 0.36, drawDelay: 0.18, copy: 0.3, copyStep: 0.08 }
};

/* ── useCommit — one busy window per flow; back/CTAs lock during it ── */

export function useCommit(ms = SHEET_TIMING.commit) {
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  const commit = useCallback(
    (after) => {
      if (busyRef.current) return;
      busyRef.current = true;
      setBusy(true);
      timer.current = setTimeout(() => {
        busyRef.current = false;
        setBusy(false);
        after();
      }, ms);
    },
    [ms]
  );
  return { busy, commit };
}

/* ── CommitButton — primary CTA that acknowledges every tap:
 * pressed scale, then (when busy) an in-button progress ring + label. ── */

export function CommitButton({ busy = false, busyLabel = "One moment…", disabled = false, onClick, children }) {
  return (
    <motion.div {...(disabled || busy ? {} : pressable)} className="transfers-ctawrap">
      <Button
        variant="primary"
        size="lg"
        className={"transfers-cta" + (busy ? " is-working" : "")}
        disabled={disabled}
        aria-busy={busy || undefined}
        onClick={busy ? undefined : onClick}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={busy ? "busy" : "idle"}
            className="transfers-cta__label"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: DUR.fast, ease: EASE_BRAND }}
          >
            {busy && <span className="transfers-cta__ring" aria-hidden="true" />}
            {busy ? busyLabel : children}
          </motion.span>
        </AnimatePresence>
      </Button>
    </motion.div>
  );
}

/* ── FlowRow — tappable list row (method / destination steps).
 * Participates in the parent step's 50ms stagger via listItem. ── */

export function FlowRow({ lead, icon, title, sub, subMono = false, trailing, onClick, disabled = false }) {
  return (
    <motion.button
      type="button"
      variants={listItem}
      {...(disabled ? {} : pressable)}
      className="transfers-row"
      disabled={disabled}
      onClick={onClick}
    >
      <span className="transfers-row__lead" aria-hidden="true">
        {lead ?? (
          <span className="transfers-row__badge">
            <span className="material-symbols-rounded">{icon}</span>
          </span>
        )}
      </span>
      <span className="transfers-row__body">
        <span className="transfers-row__title">{title}</span>
        {sub && <span className={"transfers-row__sub" + (subMono ? " is-mono" : "")}>{sub}</span>}
      </span>
      <span className="transfers-row__trail">
        {trailing ?? (
          <span className="material-symbols-rounded transfers-row__chev" aria-hidden="true">
            chevron_right
          </span>
        )}
      </span>
    </motion.button>
  );
}

/* ── Inline text link (blue underlined, per the transfers spec) ── */

export function InlineLink({ onClick, children }) {
  return (
    <button type="button" className="transfers-link" onClick={onClick}>
      {children}
    </button>
  );
}

/* ── Transient acknowledgement chip (floats above the CTA) ── */

let noteSeq = 0;

export function useFlowNote(ms = SHEET_TIMING.note) {
  const [note, setNote] = useState(null);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  const notify = useCallback(
    (text) => {
      setNote({ id: ++noteSeq, text });
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setNote(null), ms);
    },
    [ms]
  );
  return { note, notify };
}

export function FlowNote({ note }) {
  return (
    <div className="transfers-flownote" aria-live="polite">
      <AnimatePresence>
        {note && (
          <motion.span
            key={note.id}
            className="transfers-flownote__chip"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DUR.base, ease: EASE_BRAND }}
          >
            {note.text}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── SheetSuccess — compact in-sheet SuccessState (same visual language:
 * circle pops, check draws, copy rises staggered) ── */

export function SheetSuccess({ title, body, children }) {
  const T = SHEET_TIMING.check;
  const rise = (i) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DUR.slow, ease: EASE_BRAND, delay: T.copy + i * T.copyStep }
  });
  return (
    <div className="transfers-success">
      <motion.div
        className="transfers-success__circle"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: T.circle, ease: EASE_BRAND }}
      >
        <svg viewBox="0 0 52 52" width="40" height="40" fill="none" aria-hidden="true">
          <motion.path
            d="M14 27 L23 36 L38 18"
            stroke="var(--sx-color-deep-ivy, #002b2a)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: T.draw, ease: EASE_BRAND, delay: T.drawDelay }}
          />
        </svg>
      </motion.div>
      <motion.h3 className="transfers-success__title" {...rise(0)}>
        {title}
      </motion.h3>
      {body && (
        <motion.p className="transfers-success__body" {...rise(1)}>
          {body}
        </motion.p>
      )}
      {children && (
        <motion.div className="transfers-success__actions" {...rise(2)}>
          {children}
        </motion.div>
      )}
    </div>
  );
}
