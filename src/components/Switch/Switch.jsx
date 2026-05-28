import React, { useId } from "react";
import "../Checkbox/Checkbox.css";
import "./Switch.css";

export function Switch({
  label,
  sub,
  checked,
  defaultChecked,
  disabled = false,
  onChange,
  id: idProp,
  className = "",
  ...inputProps
}) {
  const id = useId();
  const cls = ["sx-control", disabled && "is-disabled", className].filter(Boolean).join(" ");
  return (
    <label htmlFor={idProp || id} className={cls}>
      <input
        type="checkbox"
        role="switch"
        id={idProp || id}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={onChange}
        {...inputProps}
      />
      <span className="sx-switch__track" aria-hidden="true">
        <span className="sx-switch__thumb" />
      </span>
      {label && (
        <span className="sx-control__label">
          {label}
          {sub && <span className="sx-control__sub">{sub}</span>}
        </span>
      )}
    </label>
  );
}
