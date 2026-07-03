// 2-Factor Authentication gate on saving the Mint configuration
// (mint-swap.md §2). Built on the in-frame MintswapModal shell; the
// segmented 6-digit input mirrors the DS Modal2FA behaviour (auto-advance,
// backspace-back, full-code paste) — the spec's sanctioned mobile upgrade
// over the web's single input. Any 6-digit code verifies; a demo-code chip
// autofills db.twofa.code digit by digit.
import { useEffect, useRef, useState } from "react";
import { Button } from "@ds/components/Button/Button.jsx";
import { twofa } from "@app/data/db.js";
import { MintswapModal } from "./MintswapModal.jsx";
import { InlineLink } from "./parts.jsx";
import "./mintswap.css";

const LENGTH = 6;

export function TwoFaModal({ open, onClose, onVerified, onSupport }) {
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const inputs = useRef([]);
  const timers = useRef([]);

  // Fresh state each time the gate opens.
  useEffect(() => {
    if (open) {
      setCode("");
      setVerifying(false);
    }
  }, [open]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    []
  );

  const setDigit = (idx, digit) => {
    const next = code.split("");
    next[idx] = digit;
    setCode(next.join("").slice(0, LENGTH));
  };

  const handleChange = (idx) => (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (!raw) {
      setDigit(idx, "");
      return;
    }
    if (raw.length > 1) {
      // Full-code paste.
      const joined = (code.slice(0, idx) + raw).slice(0, LENGTH);
      setCode(joined);
      inputs.current[Math.min(idx + raw.length, LENGTH - 1)]?.focus();
      return;
    }
    setDigit(idx, raw);
    if (idx < LENGTH - 1) inputs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (idx) => (e) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  };

  // Demo-code autofill (db.twofa.code) — digits land one by one.
  const autofill = () => {
    if (verifying) return;
    twofa.code.split("").forEach((_d, i) => {
      timers.current.push(
        setTimeout(() => setCode(twofa.code.slice(0, i + 1)), i * 60)
      );
    });
  };

  const verify = () => {
    if (verifying || code.length < LENGTH) return;
    setVerifying(true);
    // Fake processing, then hand back to the flow (~600ms per contract).
    timers.current.push(
      setTimeout(() => {
        setVerifying(false);
        onVerified();
      }, 600)
    );
  };

  return (
    <MintswapModal
      open={open}
      onClose={onClose}
      title="2-Factor Authentication"
      icon={
        <span className="mintswap-2fa__lock" aria-hidden="true">
          <span className="material-symbols-rounded">lock</span>
        </span>
      }
      footer={
        <>
          <Button variant="secondary" size="lg" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="lg"
            disabled={code.length < LENGTH || verifying}
            onClick={verify}
          >
            Verify
          </Button>
        </>
      }
    >
      <p className="mintswap-modal__copy">
        Input the 6-digit code in your Google Authenticator app.
      </p>
      <div className="field">
        <span className="field__label">Authentication Code</span>
        <div className="mintswap-2fa__code" role="group" aria-label="Authentication code">
          {Array.from({ length: LENGTH }).map((_, i) => (
            <input
              key={i}
              ref={(el) => (inputs.current[i] = el)}
              className="mintswap-2fa__digit"
              type="text"
              inputMode="numeric"
              autoComplete={i === 0 ? "one-time-code" : "off"}
              maxLength={1}
              aria-label={`Digit ${i + 1}`}
              value={code[i] ?? ""}
              onChange={handleChange(i)}
              onKeyDown={handleKeyDown(i)}
            />
          ))}
        </div>
      </div>
      <button type="button" className="mintswap-2fa__autofill" onClick={autofill}>
        <span className="material-symbols-rounded" aria-hidden="true">bolt</span>
        Use demo code
      </button>
      <p className="mintswap-2fa__trouble">
        Can&rsquo;t access Google Authenticator?{" "}
        <InlineLink onClick={onSupport}>Contact Customer Support</InlineLink>
      </p>
    </MintswapModal>
  );
}
