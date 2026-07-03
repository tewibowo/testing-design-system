// Shared building blocks for the transfers area — toast layer, select-field
// triggers, sheet scaffolding, legal footer, SG flag mark.
import { useCallback, useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Toast } from "@ds/components/Toast/Toast.jsx";
import {
  listContainer,
  listItem,
  pressable,
  toast as toastPreset
} from "@app/motion/presets.js";
import "./transfers.css";

/* ── Local toast (screen-scoped; app shell has no ToastProvider) ── */

let toastSeq = 0;

export function useTransfersToast() {
  const [note, setNote] = useState(null);
  const showToast = useCallback((title) => setNote({ id: ++toastSeq, title }), []);
  const clearToast = useCallback(() => setNote(null), []);
  return { note, showToast, clearToast };
}

export function ToastLayer({ note, onClear }) {
  useEffect(() => {
    if (!note) return undefined;
    const t = setTimeout(onClear, 2200);
    return () => clearTimeout(t);
  }, [note, onClear]);
  return (
    <div className="transfers-toast-region" aria-live="polite">
      <AnimatePresence>
        {note && (
          <motion.div
            key={note.id}
            className="transfers-toast"
            variants={toastPreset}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <Toast tone="positive" title={note.title} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Copy feedback: fires onCopy when the DS Copybox copy button is tapped ── */

export function CopyCatch({ onCopy, children }) {
  return (
    <div
      onClickCapture={(e) => {
        if (e.target?.closest?.(".copybox__btn")) onCopy();
      }}
    >
      {children}
    </div>
  );
}

/* ── Inline text link (spec: blue underlined inline links) ── */

export function InlineLink({ block = false, onClick, children }) {
  return (
    <button
      type="button"
      className={"transfers-link" + (block ? " transfers-link--block" : "")}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

/* ── Select-style field trigger; picker itself opens as a bottom sheet ── */

export function SelectField({
  label,
  headerAction,
  lead,
  value,
  placeholder,
  disabled = false,
  onOpen
}) {
  return (
    <div className="field">
      {(label || headerAction) && (
        <div className="transfers-field-head">
          <span className="field__label">{label}</span>
          {headerAction}
        </div>
      )}
      <motion.button
        type="button"
        {...(disabled ? {} : pressable)}
        className={"transfers-select" + (disabled ? " is-disabled" : "")}
        disabled={disabled}
        onClick={disabled ? undefined : onOpen}
        aria-haspopup="dialog"
      >
        {lead && (
          <span className="transfers-select__lead" aria-hidden="true">
            {lead}
          </span>
        )}
        <span className={"transfers-select__value" + (value ? "" : " is-placeholder")}>
          {value ?? placeholder}
        </span>
        <span className="material-symbols-rounded transfers-select__chevron" aria-hidden="true">
          expand_more
        </span>
      </motion.button>
    </div>
  );
}

/* ── Bottom-sheet content scaffolding: heading + staggered list ── */

export function SheetList({ title, action, children }) {
  return (
    <div className="transfers-sheet">
      <div className="transfers-sheet__head">
        <h3 className="transfers-sheet__title">{title}</h3>
        {action}
      </div>
      <motion.div
        className="transfers-sheet__list"
        variants={listContainer}
        initial="initial"
        animate="enter"
      >
        {children}
      </motion.div>
    </div>
  );
}

export function NetworkRow({ network, selected, onSelect, mark }) {
  return (
    <motion.button
      type="button"
      variants={listItem}
      {...pressable}
      className={"transfers-netrow" + (selected ? " is-selected" : "")}
      onClick={onSelect}
    >
      {mark}
      <span className="transfers-netrow__name">{network.name}</span>
      {selected && (
        <span className="material-symbols-rounded transfers-netrow__check" aria-hidden="true">
          check
        </span>
      )}
    </motion.button>
  );
}

export function PickRow({ selected, onClick, children }) {
  return (
    <motion.div
      variants={listItem}
      {...pressable}
      className={"transfers-pickrow" + (selected ? " is-selected" : "")}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.(e);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── Round Singapore flag mark (conversion box) ── */

export function SgFlag({ size = 20 }) {
  const clipId = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-label="Singapore"
      className="transfers-sgflag"
    >
      <clipPath id={clipId}>
        <circle cx="12" cy="12" r="12" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect width="24" height="12" fill="#EF3340" />
        <rect y="12" width="24" height="12" fill="#FFFFFF" />
        <circle cx="8" cy="6" r="3.6" fill="#FFFFFF" />
        <circle cx="9.4" cy="6" r="3.1" fill="#EF3340" />
        <circle cx="12.4" cy="3.6" r="0.62" fill="#FFFFFF" />
        <circle cx="10.7" cy="4.9" r="0.62" fill="#FFFFFF" />
        <circle cx="14.1" cy="4.9" r="0.62" fill="#FFFFFF" />
        <circle cx="11.3" cy="6.9" r="0.62" fill="#FFFFFF" />
        <circle cx="13.5" cy="6.9" r="0.62" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

/* ── Legal footer (§0 shared chrome, verbatim 4 lines) ── */

export function LegalFooter({ onLink }) {
  return (
    <div className="transfers-legal">
      <p>XSGD, XUSD and XIDR are issued by StraitsX.</p>
      <p>
        “STRAITSX”, “XSGD” and “XIDR” and all other URLs, logos and trademarks
        related to the StraitsX Services are either trademarks or registered
        trademarks of StraitsX or its licensors.
      </p>
      <p>StraitsX is the trading name of the StraitsX Group of Companies and its affiliated entities.</p>
      <p>
        Important Risk Warnings Regarding Digital Payment Tokens:{" "}
        <InlineLink onClick={onLink}>Learn More</InlineLink>
      </p>
    </div>
  );
}
