import React, { useId } from "react";
import "./Select.css";

/**
 * Native `<select>` styled to match StraitsX inputs.
 * For combobox-style typeahead, build on top of a popover (future work).
 *
 *   <Select label="Currency" options={[{value, label}]} />
 *
 * size: "large" (48px, default) | "small" (40px) — matches Input.
 */
export function Select({
  label,
  helper,
  error,
  options = [],
  placeholder = "Select…",
  size = "large",
  disabled = false,
  id: idProp,
  className = "",
  ...selectProps
}) {
  const id = useId();
  const isError = !!error;
  const wrapCls = [
    "sx-select",
    `sx-select--${size === "small" ? "small" : "large"}`,
    isError && "is-error",
    disabled && "is-disabled",
  ].filter(Boolean).join(" ");
  return (
    <div className={"sx-field " + className}>
      {label && <label htmlFor={idProp || id} className="sx-field__label">{label}</label>}
      <div className={wrapCls}>
        <select id={idProp || id} disabled={disabled} {...selectProps}>
          {placeholder !== false && <option value="" disabled hidden>{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>
          ))}
        </select>
        <span className="material-symbols-rounded sx-select__chevron" aria-hidden="true">expand_more</span>
      </div>
      {(helper || error) && (
        <span className={"sx-field__helper" + (isError ? " is-error" : "")}>{error || helper}</span>
      )}
    </div>
  );
}
