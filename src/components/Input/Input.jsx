import React, { useId } from "react";
import "./Input.css";

/**
 * Text input with optional label, helper text, error state, and prefix/suffix slots.
 *
 *   <Input label="Amount" suffix="SGD" defaultValue="1,250.00" />
 *   <Input label="Wallet" error="Address checksum doesn't match." />
 */
export function Input({
  label,
  helper,
  error,
  prefix,
  suffix,
  disabled = false,
  id: idProp,
  className = "",
  ...inputProps
}) {
  const autoId = useId();
  const id = idProp || autoId;
  const isError = !!error;
  const wrapCls = [
    "sx-input",
    isError && "is-error",
    disabled && "is-disabled",
  ].filter(Boolean).join(" ");
  return (
    <div className={"sx-field " + className}>
      {label && <label htmlFor={id} className="sx-field__label">{label}</label>}
      <div className={wrapCls}>
        {prefix && <span className="sx-input__prefix">{prefix}</span>}
        <input id={id} disabled={disabled} {...inputProps} />
        {suffix && <span className="sx-input__suffix">{suffix}</span>}
      </div>
      {(helper || error) && (
        <span className={"sx-field__helper" + (isError ? " is-error" : "")}>
          {error || helper}
        </span>
      )}
    </div>
  );
}
