// Shared bits for the blockchain address flows: local toast, clipboard
// helper, mono address chip (truncAddr + copy), sheet chrome and pickers.
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useTime, useTransform } from "motion/react";
import { listContainer, listItem, pressable, toast } from "@app/motion/presets.js";
import { truncAddr } from "@app/data/db.js";
import { AssetMark } from "@ds/components/AssetMark/AssetMark.jsx";
import "./blockchain.css";

/* ---- Clipboard --------------------------------------------------------- */

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    } catch {
      return false;
    }
  }
}

/* ---- Local toast (screens render theirs at the root; sheet content uses
 * variant="sheet" so the toast stays visible above the scrim) ------------- */

let toastSeq = 0;

export function useFlowToast(variant) {
  const [item, setItem] = useState(null);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const showToast = useCallback((text, icon = "check_circle") => {
    setItem({ id: ++toastSeq, text, icon });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setItem(null), 2200);
  }, []);

  const toastEl = (
    <div
      className={
        "blockchain-toast-region" +
        (variant === "sheet" ? " blockchain-toast-region--sheet" : "")
      }
      aria-live="polite"
    >
      <AnimatePresence mode="popLayout">
        {item && (
          <motion.div
            key={item.id}
            className="blockchain-toast"
            initial={toast.initial}
            animate={toast.enter}
            exit={toast.exit}
          >
            <span className="material-symbols-rounded" aria-hidden="true">
              {item.icon}
            </span>
            {item.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return { toastEl, showToast };
}

/* ---- Mono address chip: Red Hat Mono, truncAddr, tap-to-copy ------------ */

export function AddrChip({ address, mark, label, inline = false, onCopied, className = "" }) {
  return (
    <motion.button
      {...pressable}
      type="button"
      className={
        "blockchain-addr-chip" +
        (inline ? " blockchain-addr-chip--inline" : "") +
        (className ? " " + className : "")
      }
      onClick={async () => {
        await copyText(address);
        onCopied && onCopied();
      }}
    >
      {mark}
      <span className="blockchain-addr-chip__text">
        {label && <span className="blockchain-addr-chip__label">{label}</span>}
        <span className="blockchain-addr-chip__addr">{truncAddr(address)}</span>
      </span>
      <span className="material-symbols-rounded blockchain-addr-chip__copy" aria-hidden="true">
        content_copy
      </span>
    </motion.button>
  );
}

/* ---- Sheet chrome ------------------------------------------------------- */

export function SheetHeader({ title, onClose }) {
  return (
    <div className="blockchain-sheet__head">
      <h3 className="blockchain-sheet__title">{title}</h3>
      <motion.button
        {...pressable}
        type="button"
        className="blockchain-sheet__close"
        onClick={onClose}
        aria-label="Close"
      >
        <span className="material-symbols-rounded" aria-hidden="true">close</span>
      </motion.button>
    </div>
  );
}

/* ---- Generic single-select picker (chains, platforms) -------------------
 * options: [{ key, name, mark }] — tap selects and reports immediately. */

export function PickerSheet({ title, options, selectedKey, onSelect, close }) {
  return (
    <div className="blockchain-sheet">
      <SheetHeader title={title} onClose={close} />
      <motion.ul
        className="blockchain-picker"
        variants={listContainer}
        initial="initial"
        animate="enter"
      >
        {options.map((o) => {
          const selected = o.key === selectedKey;
          return (
            <motion.li key={o.key} variants={listItem}>
              <motion.button
                {...pressable}
                type="button"
                className={"blockchain-picker__row" + (selected ? " is-selected" : "")}
                aria-pressed={selected}
                onClick={() => onSelect(o)}
              >
                {o.mark}
                <span className="blockchain-picker__name">{o.name}</span>
                <span
                  className="material-symbols-rounded blockchain-picker__radio"
                  aria-hidden="true"
                >
                  {selected ? "radio_button_checked" : "radio_button_unchecked"}
                </span>
              </motion.button>
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
}

/** Map db network rows → PickerSheet options with AssetMark marks. */
export function networkOptions(list) {
  return list.map((n) => ({
    key: n.name,
    name: n.name,
    mark: <AssetMark asset={n.assetId} size={32} />,
    network: n
  }));
}

/* ---- Breathing dots: sine-wave loop with phase offsets (no keyframe
 * ping-pong, per the motion brief) ---------------------------------------- */

function Dot({ time, phase }) {
  const opacity = useTransform(
    time,
    (t) => 0.3 + 0.5 * (0.5 + 0.5 * Math.sin(t / 170 + phase))
  );
  return <motion.span className="blockchain-dot" style={{ opacity }} />;
}

export function PulseDots() {
  const time = useTime();
  return (
    <span className="blockchain-dots" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <Dot key={i} time={time} phase={i * 1.05} />
      ))}
    </span>
  );
}
