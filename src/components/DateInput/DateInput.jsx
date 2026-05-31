import React, { useId } from "react";
import "../Input/Input.css";

/**
 * Date input — uses the native browser date picker (Calendar UI),
 * styled to match StraitsX inputs. For non-modern browsers, falls back to text.
 *
 * Size axis: "large" (48px, default) | "small" (36px) — matches Input.
 *
 * Date-range mode (`range`): renders start–end date fields sharing one
 * calendar adornment. Control via `startValue`/`endValue`/`onRangeChange`.
 *
 *   <DateInput label="Date of birth" />
 *   <DateInput label="Period" range onRangeChange={({ start, end }) => …} />
 */
export function DateInput({
  label,
  helper,
  error,
  size = "large",
  range = false,
  startValue,
  endValue,
  onRangeChange,
  disabled = false,
  id: idProp,
  className = "",
  ...inputProps
}) {
  const id = useId();
  const isError = !!error;
  const sizeCls = `input--${size === "small" ? "small" : "large"}`;
  const wrapCls = [
    "input",
    sizeCls,
    isError && "is-error",
    disabled && "is-disabled",
    range && "input--range",
  ].filter(Boolean).join(" ");

  const handleRange = (key) => (e) => {
    if (!onRangeChange) return;
    const next = { start: startValue, end: endValue, [key]: e.target.value };
    onRangeChange(next);
  };

  return (
    <div className={"field " + className}>
      {label && <label htmlFor={range ? undefined : idProp || id} className="field__label">{label}</label>}
      <div className={wrapCls}>
        {range ? (
          <>
            <input
              type="date"
              disabled={disabled}
              value={startValue}
              onChange={onRangeChange ? handleRange("start") : undefined}
              aria-label="Start date"
              {...inputProps}
            />
            <span className="input__range-sep" aria-hidden="true">–</span>
            <input
              type="date"
              disabled={disabled}
              value={endValue}
              onChange={onRangeChange ? handleRange("end") : undefined}
              aria-label="End date"
            />
            <span className="material-symbols-rounded" style={{ color: "var(--text-secondary)", pointerEvents: "none" }} aria-hidden="true">date_range</span>
          </>
        ) : (
          <>
            <input id={idProp || id} type="date" disabled={disabled} {...inputProps} />
            <span className="material-symbols-rounded" style={{ color: "var(--text-secondary)", pointerEvents: "none" }} aria-hidden="true">calendar_today</span>
          </>
        )}
      </div>
      {(helper || error) && (
        <span className={"field__helper" + (isError ? " is-error" : "")}>{error || helper}</span>
      )}
    </div>
  );
}
