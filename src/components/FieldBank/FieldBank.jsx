import React, { useId, useRef, useState, useEffect } from "react";
import "./FieldBank.css";

/**
 * Field / Bank (Figma 5324:4923) — a labelled, card-style bank-account picker.
 * Header row shows the label ("Bank Account") plus an optional trailing
 * "Add Account" link. The control card opens a popover listing bank accounts
 * (logo + holder name + masked account number + optional SWIFT / status).
 * Single-select. Controlled (value) or uncontrolled (defaultValue).
 *
 *   <FieldBank
 *     label="Bank Account"
 *     options={[
 *       { value: "dbs", name: "John Doe", account: "DBS - 0053105977213",
 *         swift: "UOVBSGSG", logo: <DbsLogo /> },
 *       { value: "uob", name: "John Doe", account: "DBS - 0053105977203",
 *         status: { label: "Rejected", variant: "critical" },
 *         action: { label: "Resubmit", onClick }, disabled: true },
 *     ]}
 *     addAction={{ label: "Add Account", onClick }}
 *     onChange={(value) => ...}
 *   />
 *
 * States: enabled, opened, filled/unfilled, error, disabled.
 */
export function FieldBank({
  label = "Bank Account",
  placeholder = "Select Account",
  helper,
  error,
  options = [],
  value,
  defaultValue,
  onChange,
  addAction, // { label, onClick }
  disabled = false,
  id: idProp,
  className = "",
}) {
  const autoId = useId();
  const id = idProp || autoId;
  const isError = !!error;
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const selected = isControlled ? value : internal;
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const selectedOption = options.find((o) => o.value === selected);

  const commit = (val, opt) => {
    if (opt && opt.disabled) return;
    if (!isControlled) setInternal(val);
    onChange && onChange(val, opt);
    setOpen(false);
  };

  const renderMark = (o) => (
    <span className="sx-fieldbank__mark" aria-hidden="true">
      {o.logo || (
        <span className="sx-fieldbank__initials">
          {(o.name || o.value || "?").slice(0, 2).toUpperCase()}
        </span>
      )}
    </span>
  );

  const wrapCls = [
    "sx-fieldbank",
    open && "is-open",
    isError && "is-error",
    disabled && "is-disabled",
  ].filter(Boolean).join(" ");

  return (
    <div className={"sx-field " + className} ref={rootRef}>
      <div className="sx-fieldbank__header">
        {label && (
          <span className="sx-field__label" id={`${id}-label`}>{label}</span>
        )}
        {addAction && (
          <button
            type="button"
            className="sx-fieldbank__link"
            onClick={addAction.onClick}
          >
            {addAction.label}
          </button>
        )}
      </div>

      <div className={wrapCls}>
        <button
          type="button"
          className="sx-fieldbank__control"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={label ? `${id}-label` : undefined}
          onClick={() => setOpen((o) => !o)}
        >
          {selectedOption ? (
            <>
              {renderMark(selectedOption)}
              <span className="sx-fieldbank__text">
                <span className="sx-fieldbank__name">
                  {selectedOption.name ?? selectedOption.value}
                </span>
                {selectedOption.account && (
                  <span className="sx-fieldbank__secondary">{selectedOption.account}</span>
                )}
                {selectedOption.swift && (
                  <span className="sx-fieldbank__secondary">{selectedOption.swift}</span>
                )}
              </span>
            </>
          ) : (
            <span className="sx-fieldbank__placeholder">{placeholder}</span>
          )}
          <span
            className="material-symbols-rounded sx-fieldbank__chevron"
            aria-hidden="true"
          >
            expand_more
          </span>
        </button>

        {open && !disabled && (
          <ul className="sx-fieldbank__menu" role="listbox">
            {options.map((o) => {
              const on = o.value === selected;
              return (
                <li
                  key={o.value}
                  role="option"
                  aria-selected={on}
                  aria-disabled={o.disabled || undefined}
                  className={
                    "sx-fieldbank__option" +
                    (on ? " is-selected" : "") +
                    (o.disabled ? " is-disabled" : "")
                  }
                  onClick={() => commit(o.value, o)}
                >
                  {renderMark(o)}
                  <span className="sx-fieldbank__text">
                    <span className="sx-fieldbank__name">{o.name ?? o.value}</span>
                    {o.account && (
                      <span className="sx-fieldbank__secondary">{o.account}</span>
                    )}
                    {o.swift && (
                      <span className="sx-fieldbank__secondary">{o.swift}</span>
                    )}
                    {o.status && (
                      <span className="sx-fieldbank__tags">
                        <span
                          className={"sx-fieldbank__tag is-" + (o.status.variant || "critical")}
                        >
                          {o.status.label}
                        </span>
                      </span>
                    )}
                  </span>
                  {o.action && (
                    <span
                      className="sx-fieldbank__link"
                      role="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        o.action.onClick && o.action.onClick();
                      }}
                    >
                      {o.action.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {(helper || error) && (
        <span className={"sx-field__helper" + (isError ? " is-error" : "")}>
          {error || helper}
        </span>
      )}
    </div>
  );
}
