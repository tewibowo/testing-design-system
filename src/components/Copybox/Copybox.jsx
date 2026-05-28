import React, { useState } from "react";
import "./Copybox.css";

/**
 * Read-only field with an inline "Copy" button. Used for wallet addresses,
 * API keys, transaction references.
 */
export function Copybox({ value = "", multiline = false, label, className = "", ...rest }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };
  const cls = [
    "sx-copybox",
    multiline && "sx-copybox--multiline",
    copied && "is-copied",
    className,
  ].filter(Boolean).join(" ");
  return (
    <div className="sx-field" {...rest}>
      {label && <label className="sx-field__label">{label}</label>}
      <div className={cls}>
        <span className="sx-copybox__value">{value}</span>
        <button type="button" className="sx-copybox__btn" onClick={copy} aria-label="Copy">
          <span className="material-symbols-rounded">{copied ? "check" : "content_copy"}</span>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
