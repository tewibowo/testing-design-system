import React, { useId, useState } from "react";
import "../Input/Input.css";
import "./Textarea.css";

/**
 * Multi-line text input with optional character counter.
 */
export function Textarea({
  label,
  helper,
  error,
  maxLength,
  showCount = false,
  value,
  defaultValue = "",
  disabled = false,
  id: idProp,
  onChange,
  className = "",
  rows = 4,
  state, // "hovered" | "focused" — visual-state hook for stories/Chromatic
  ...rest
}) {
  const id = useId();
  const isError = !!error;
  const [internal, setInternal] = useState(defaultValue);
  const v = value ?? internal;
  const handleChange = (e) => {
    if (value === undefined) setInternal(e.target.value);
    onChange && onChange(e);
  };
  const wrapCls = [
    "sx-textarea-wrap",
    state === "hovered" && "is-hovered",
    state === "focused" && "is-focused",
    isError && "is-error",
    disabled && "is-disabled",
  ].filter(Boolean).join(" ");
  return (
    <div className={"sx-field " + className}>
      {label && <label htmlFor={idProp || id} className="sx-field__label">{label}</label>}
      <div className={wrapCls}>
        <textarea
          id={idProp || id}
          rows={rows}
          value={v}
          onChange={handleChange}
          disabled={disabled}
          maxLength={maxLength}
          {...rest}
        />
        {(showCount || maxLength) && (
          <span className="sx-textarea-wrap__count">
            {String(v).length}{maxLength ? `/${maxLength}` : ""}
          </span>
        )}
      </div>
      {(helper || error) && (
        <span className={"sx-field__helper" + (isError ? " is-error" : "")}>{error || helper}</span>
      )}
    </div>
  );
}
