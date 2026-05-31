import React, { useId, useRef, useState, useEffect } from "react";
import "./MultiSelect.css";

/**
 * Multi-select dropdown (Figma: "Dropdown - Multiple Select").
 * Selected options render as removable chips; a popover lists options with
 * a check indicator. Controlled (value) or uncontrolled (defaultValue).
 *
 *   <MultiSelect
 *     label="Networks"
 *     options={[{ value: "eth", label: "Ethereum" }, ...]}
 *     defaultValue={["eth"]}
 *     onChange={(vals) => ...}
 *   />
 */
export function MultiSelect({
  label,
  helper,
  error,
  options = [],
  placeholder = "Select…",
  disabled = false,
  value,
  defaultValue = [],
  onChange,
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

  const commit = (next) => {
    if (!isControlled) setInternal(next);
    onChange && onChange(next);
  };
  const toggle = (val) =>
    commit(selected.includes(val) ? selected.filter((v) => v !== val) : [...selected, val]);
  const remove = (val) => commit(selected.filter((v) => v !== val));

  const labelFor = (val) => options.find((o) => o.value === val)?.label ?? val;

  const wrapCls = [
    "sx-multiselect",
    open && "is-open",
    isError && "is-error",
    disabled && "is-disabled",
  ].filter(Boolean).join(" ");

  return (
    <div className={"sx-field " + className} ref={rootRef}>
      {label && <span className="sx-field__label" id={`${id}-label`}>{label}</span>}
      <div className={wrapCls}>
        <button
          type="button"
          className="sx-multiselect__control"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={label ? `${id}-label` : undefined}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sx-multiselect__values">
            {selected.length === 0 ? (
              <span className="sx-multiselect__placeholder">{placeholder}</span>
            ) : (
              selected.map((val) => (
                <span className="sx-multiselect__chip" key={val}>
                  {labelFor(val)}
                  <span
                    className="material-symbols-rounded sx-multiselect__chip-x"
                    role="button"
                    aria-label={`Remove ${labelFor(val)}`}
                    onClick={(e) => { e.stopPropagation(); if (!disabled) remove(val); }}
                  >
                    close
                  </span>
                </span>
              ))
            )}
          </span>
          <span className="material-symbols-rounded sx-multiselect__chevron" aria-hidden="true">
            expand_more
          </span>
        </button>

        {open && !disabled && (
          <ul className="sx-multiselect__menu" role="listbox" aria-multiselectable="true">
            {options.map((o) => {
              const on = selected.includes(o.value);
              return (
                <li
                  key={o.value}
                  role="option"
                  aria-selected={on}
                  className={"sx-multiselect__option" + (on ? " is-selected" : "")}
                  aria-disabled={o.disabled || undefined}
                  onClick={() => !o.disabled && toggle(o.value)}
                >
                  <span className="sx-multiselect__check material-symbols-rounded" aria-hidden="true">
                    {on ? "check_box" : "check_box_outline_blank"}
                  </span>
                  {o.label}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {(helper || error) && (
        <span className={"sx-field__helper" + (isError ? " is-error" : "")}>{error || helper}</span>
      )}
    </div>
  );
}
