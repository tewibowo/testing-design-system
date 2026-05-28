import React, { useId, useState } from "react";
import "./Input.css";

/**
 * Text input with optional label, helper, error, prefix/suffix slots,
 * password visibility toggle (when type="password"), search adornment
 * (when type="search"), and an inline trailing button.
 *
 *   <Input label="Email" placeholder="hello@straitsx.com" />
 *   <Input label="Amount" suffix="SGD" defaultValue="1,250.00" />
 *   <Input type="password" label="Password" />
 *   <Input type="search" placeholder="Search transactions" />
 *   <Input label="Promo code" trailingButton={{ label: "Apply", onClick: ... }} />
 */
export function Input({
  label,
  helper,
  error,
  prefix,
  suffix,
  type = "text",
  disabled = false,
  id: idProp,
  className = "",
  value,
  defaultValue,
  onChange,
  trailingButton, // { label, onClick, disabled? }
  ...inputProps
}) {
  const autoId = useId();
  const id = idProp || autoId;
  const isError = !!error;
  const isPassword = type === "password";
  const isSearch = type === "search";

  const [reveal, setReveal] = useState(false);
  const [internal, setInternal] = useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internal;
  const handleChange = (e) => {
    if (!isControlled) setInternal(e.target.value);
    onChange && onChange(e);
  };

  const wrapCls = [
    "sx-input",
    isError && "is-error",
    disabled && "is-disabled",
    trailingButton && "sx-input--with-button",
    className,
  ].filter(Boolean).join(" ");

  const effectiveType = isPassword ? (reveal ? "text" : "password") : type;

  const handleClear = () => {
    if (isControlled) {
      onChange && onChange({ target: { value: "" } });
    } else {
      setInternal("");
    }
  };

  return (
    <div className="sx-field">
      {label && <label htmlFor={id} className="sx-field__label">{label}</label>}
      <div className={wrapCls}>
        {isSearch && (
          <span className="material-symbols-rounded sx-input__lead" aria-hidden="true">search</span>
        )}
        {prefix && !isSearch && <span className="sx-input__prefix">{prefix}</span>}
        <input
          id={id}
          type={effectiveType}
          disabled={disabled}
          value={currentValue}
          onChange={handleChange}
          {...inputProps}
        />
        {isSearch && currentValue && !disabled && (
          <button
            type="button"
            className="sx-input__icon-btn"
            onClick={handleClear}
            aria-label="Clear"
          >
            <span className="material-symbols-rounded">close</span>
          </button>
        )}
        {isPassword && !disabled && (
          <button
            type="button"
            className="sx-input__icon-btn"
            onClick={() => setReveal((r) => !r)}
            aria-label={reveal ? "Hide password" : "Show password"}
          >
            <span className="material-symbols-rounded">{reveal ? "visibility_off" : "visibility"}</span>
          </button>
        )}
        {suffix && !isSearch && !isPassword && <span className="sx-input__suffix">{suffix}</span>}
        {trailingButton && (
          <button
            type="button"
            className="sx-input__trailing-btn"
            onClick={trailingButton.onClick}
            disabled={disabled || trailingButton.disabled}
          >
            {trailingButton.label}
          </button>
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
