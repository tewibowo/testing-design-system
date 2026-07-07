// 6-cell OTP input, underline style per twofa-notifications spec.
// Auto-advance, backspace-back, full-code paste — logic mirrors the DS
// Modal2FA segmented input (verified against Modal2FA.jsx); the underline
// styling is this flow's custom skin (no dedicated DS OTP component).
import { useEffect, useRef } from "react";
import "./auth.css";

/**
 * @param {string}  value     controlled code string
 * @param {func}    onChange  (nextCode: string) => void
 * @param {number}  length    cell count (default 6)
 * @param {"idle"|"error"|"success"} status  visual state
 * @param {number}  shakeKey  bump to replay the error shake
 */
export function OtpInput({
  value = "",
  onChange,
  length = 6,
  status = "idle",
  shakeKey = 0,
  autoFocus = true,
  disabled = false,
  label = "Verification code"
}) {
  const inputs = useRef([]);

  // Focus the first empty cell on mount; refocus cell 0 when cleared.
  useEffect(() => {
    if (!autoFocus || disabled) return;
    inputs.current[Math.min(value.length, length - 1)]?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFocus, value === ""]);

  const setDigit = (idx, digit) => {
    const next = value.split("");
    next[idx] = digit;
    onChange?.(next.join("").slice(0, length));
  };

  const handleChange = (idx) => (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (!raw) {
      setDigit(idx, "");
      return;
    }
    // Paste of a full (or partial) code.
    if (raw.length > 1) {
      const joined = (value.slice(0, idx) + raw).slice(0, length);
      onChange?.(joined);
      inputs.current[Math.min(idx + raw.length, length - 1)]?.focus({ preventScroll: true });
      return;
    }
    setDigit(idx, raw);
    if (idx < length - 1) inputs.current[idx + 1]?.focus({ preventScroll: true });
  };

  const handleKeyDown = (idx) => (e) => {
    if (e.key === "Backspace" && !value[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus({ preventScroll: true });
    }
  };

  return (
    <div
      key={shakeKey}
      className="auth-otp"
      data-status={status}
      role="group"
      aria-label={label}
    >
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputs.current[i] = el)}
          className="auth-otp__cell"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={length}
          disabled={disabled}
          aria-label={`Digit ${i + 1}`}
          value={value[i] ?? ""}
          data-filled={Boolean(value[i])}
          onChange={handleChange(i)}
          onKeyDown={handleKeyDown(i)}
        />
      ))}
    </div>
  );
}
