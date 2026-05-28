import React, { useId } from "react";
import "../Input/Input.css";

/**
 * Date input — uses the native browser date picker (Calendar UI),
 * styled to match StraitsX inputs. For non-modern browsers, falls back to text.
 */
export function DateInput({
  label,
  helper,
  error,
  disabled = false,
  id: idProp,
  className = "",
  ...inputProps
}) {
  const id = useId();
  const isError = !!error;
  const wrapCls = [
    "sx-input",
    isError && "is-error",
    disabled && "is-disabled",
  ].filter(Boolean).join(" ");
  return (
    <div className={"sx-field " + className}>
      {label && <label htmlFor={idProp || id} className="sx-field__label">{label}</label>}
      <div className={wrapCls}>
        <input id={idProp || id} type="date" disabled={disabled} {...inputProps} />
        <span className="material-symbols-rounded" style={{ color: "var(--sx-fg-3)", pointerEvents: "none" }} aria-hidden="true">calendar_today</span>
      </div>
      {(helper || error) && (
        <span className={"sx-field__helper" + (isError ? " is-error" : "")}>{error || helper}</span>
      )}
    </div>
  );
}
