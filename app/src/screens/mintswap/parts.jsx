// Shared building blocks for the mintswap area — inline links, copy-toast
// wrapper, select trigger, sheet scaffolding, bold-marker helper, legal text.
import { motion } from "motion/react";
import { listContainer, pressable } from "@app/motion/presets.js";
// Base `.field` / `.field__label` / `.field__helper` styles (relied on by the
// DS Copybox markup) live in the DS Input stylesheet — load it here so the
// mintswap area doesn't depend on another area importing <Input>.
import "@ds/components/Input/Input.css";
import "./mintswap.css";

/* ── Inline text link (spec: blue underlined inline links) ── */

export function InlineLink({ block = false, onClick, children }) {
  return (
    <button
      type="button"
      className={"mintswap-link" + (block ? " mintswap-link--block" : "")}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

/* ── Copy feedback: fires onCopy when a DS Copybox copy button is tapped ── */

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

/* ── Select-style field trigger; the picker itself opens as a bottom sheet ── */

export function SelectTrigger({ label, sublabel, lead, value, onOpen }) {
  return (
    <div className="field">
      {label && <span className="field__label">{label}</span>}
      {sublabel && <span className="mintswap-sublabel">{sublabel}</span>}
      <motion.button
        type="button"
        {...pressable}
        className="mintswap-select"
        onClick={onOpen}
        aria-haspopup="dialog"
      >
        {lead && (
          <span className="mintswap-select__lead" aria-hidden="true">
            {lead}
          </span>
        )}
        <span className="mintswap-select__value">{value}</span>
        <span className="material-symbols-rounded mintswap-select__chevron" aria-hidden="true">
          expand_more
        </span>
      </motion.button>
    </div>
  );
}

/* ── Bottom-sheet content scaffolding: heading + staggered list ── */

export function SheetList({ title, children }) {
  return (
    <div className="mintswap-sheet">
      <h3 className="mintswap-sheet__title">{title}</h3>
      <motion.div
        className="mintswap-sheet__list"
        variants={listContainer}
        initial="initial"
        animate="enter"
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ── Bold-marker helper: wraps verbatim db copy's emphasised fragments ──
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

/* ── Footer legal text (mint-swap.md §4, verbatim) ── */

export function LegalFooter() {
  return (
    <div className="mintswap-legal">
      <p>XSGD, XUSD and XIDR are issued by StraitsX.</p>
      <p>
        &ldquo;STRAITSX&rdquo;, &ldquo;XSGD&rdquo; and &ldquo;XIDR&rdquo; and all
        other URLs, logos and trademarks related to the StraitsX Services are
        either trademarks or registered trademarks of StraitsX or its licensors.
        StraitsX is the trading name of the StraitsX Group of Companies and its
        affiliated entities.
      </p>
    </div>
  );
}
