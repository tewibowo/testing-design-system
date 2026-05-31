import React, { useState } from "react";
import "./Copybox.css";

/**
 * Read-only field with an inline "Copy" button. Used for wallet addresses,
 * API keys, transaction references.
 *
 * Props:
 *   value, multiline          — original behaviour (copied state preserved)
 *   action      (default true)  — false = display-only (no copy button)
 *   error                       — critical border + helper message
 *   buttonVariant "icon"|"text" — icon-only vs icon+label copy button
 *   logo / icon  (ReactNode)    — leading mark (e.g. blockchain/bank)
 *   label, helper               — field label / helper slots
 *   info                        — tooltip text shown via an (i) affordance
 *   truncate     (default false)— middle-truncate long single-line value (start…end)
 */
export function Copybox({
  value = "",
  multiline = false,
  label,
  helper,
  info,
  error,
  action = true,
  buttonVariant = "text",
  logo,
  icon,
  truncate = false,
  className = "",
  ...rest
}) {
  const [copied, setCopied] = useState(false);
  const isError = !!error;
  const lead = logo || icon;
  const iconOnly = buttonVariant === "icon";

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
    isError && "is-error",
    copied && "is-copied",
    className,
  ].filter(Boolean).join(" ");

  // Middle-truncation for long single-line values (start…end).
  const doTruncate = truncate && !multiline && typeof value === "string" && value.length > 20;
  const renderValue = () => {
    if (!doTruncate) return value;
    const head = value.slice(0, 10);
    const tail = value.slice(-8);
    return (
      <>
        <span className="sx-copybox__trunc-start">{head}</span>
        <span className="sx-copybox__trunc-ellipsis">…</span>
        <span className="sx-copybox__trunc-end">{tail}</span>
      </>
    );
  };

  return (
    <div className="sx-field" {...rest}>
      {(label || info) && (
        <span className="sx-field__label sx-copybox__label">
          {label}
          {info && (
            <span className="sx-copybox__info" tabIndex={0} aria-label={info} title={info}>
              <span className="material-symbols-rounded">info</span>
            </span>
          )}
        </span>
      )}
      <div className={cls}>
        {lead && <span className="sx-copybox__lead" aria-hidden="true">{lead}</span>}
        <span className="sx-copybox__value" title={doTruncate ? value : undefined}>
          {renderValue()}
        </span>
        {action && (
          <button
            type="button"
            className={"sx-copybox__btn" + (iconOnly ? " sx-copybox__btn--icon" : "")}
            onClick={copy}
            aria-label={copied ? "Copied" : "Copy"}
          >
            <span className="material-symbols-rounded">{copied ? "check" : "content_copy"}</span>
            {!iconOnly && (copied ? "Copied" : "Copy")}
          </button>
        )}
      </div>
      {(helper || error) && (
        <span className={"sx-field__helper" + (isError ? " is-error" : "")}>{error || helper}</span>
      )}
    </div>
  );
}
