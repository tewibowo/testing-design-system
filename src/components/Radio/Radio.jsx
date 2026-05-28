import React, { useId } from "react";
import "../Checkbox/Checkbox.css";
import "./Radio.css";

export function Radio({
  label,
  sub,
  checked,
  defaultChecked,
  disabled = false,
  error = false,
  onChange,
  name,
  value,
  id: idProp,
  className = "",
  ...inputProps
}) {
  const id = useId();
  const cls = [
    "sx-control",
    disabled && "is-disabled",
    error && "is-error",
    className,
  ].filter(Boolean).join(" ");
  return (
    <label htmlFor={idProp || id} className={cls}>
      <input
        type="radio"
        id={idProp || id}
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={onChange}
        {...inputProps}
      />
      <span className="sx-radio__box" aria-hidden="true" />
      {label && (
        <span className="sx-control__label">
          {label}
          {sub && <span className="sx-control__sub">{sub}</span>}
        </span>
      )}
    </label>
  );
}

/** Convenience wrapper that renders a vertical RadioGroup with shared `name`. */
export function RadioGroup({ name, value, onChange, options = [], legend, className = "" }) {
  return (
    <fieldset style={{ border: 0, padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }} className={className}>
      {legend && <legend style={{ font: "var(--sx-label-m)", color: "var(--sx-fg-1)", padding: 0, marginBottom: 4 }}>{legend}</legend>}
      {options.map((o) => (
        <Radio
          key={o.value}
          name={name}
          value={o.value}
          label={o.label}
          sub={o.sub}
          checked={value === o.value}
          onChange={() => onChange && onChange(o.value)}
        />
      ))}
    </fieldset>
  );
}
