// auth/2fa — "Enter Verification Code" TOTP gate; both login paths converge
// here (auth-login.md §5, twofa-notifications.md A1). Copy verbatim.
//
// Prototype behavior: the demo authenticator "pushes" the code — after a
// beat the cells type themselves with db.twofa.code (or tap the cells to
// fill immediately). Submit with the right code resets to root/tabs; a
// wrong code shakes, clears, and refocuses.
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Button } from "@ds/components/Button/Button.jsx";
import { LinkButton } from "@ds/components/LinkButton/LinkButton.jsx";
import { Logo } from "@ds/components/Logo/Logo.jsx";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import { useNav } from "@app/nav/Navigator.jsx";
import { twofa } from "@app/data/db.js";
import { listContainer, listItem } from "@app/motion/presets.js";
import { OtpInput } from "./OtpInput.jsx";
import "./auth.css";

const AUTOFILL_DELAY = 1400; // ms before the demo code starts typing itself
const TYPE_STEP = 90; // ms per autofilled digit

const BOLD_PHRASE = "Two-factor Authentication (2FA) app";

export function TwoFaScreen() {
  const nav = useNav();
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("idle");
  const [shakeKey, setShakeKey] = useState(0);
  const codeRef = useRef("");
  const lockRef = useRef(false); // success in flight
  const filledRef = useRef(false); // autofill already ran
  const timers = useRef([]);

  codeRef.current = code;

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  useEffect(() => {
    later(() => autofill(), AUTOFILL_DELAY);
    return () => timers.current.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const autofill = () => {
    // Skip if the user already typed, or it ran once.
    if (filledRef.current || lockRef.current || codeRef.current.length > 0) return;
    filledRef.current = true;
    twofa.code.split("").forEach((digit, i) => {
      later(() => {
        setCode((c) => (c.length === i ? c + digit : c));
      }, i * TYPE_STEP);
    });
  };

  const fillNow = () => {
    if (lockRef.current || codeRef.current.length > 0) return;
    filledRef.current = true;
    twofa.code.split("").forEach((digit, i) => {
      later(() => setCode((c) => (c.length === i ? c + digit : c)), i * 40);
    });
  };

  const submit = () => {
    if (code.length < 6 || lockRef.current || status === "error") return;
    if (code === twofa.code) {
      lockRef.current = true;
      setStatus("success");
      later(() => nav.reset("root/tabs"), 550);
    } else {
      setStatus("error");
      setShakeKey((k) => k + 1);
      later(() => {
        setCode("");
        setStatus("idle");
      }, 750);
    }
  };

  const [before, after] = twofa.instruction.split(BOLD_PHRASE);

  return (
    <>
      <AppHeader back />
      <div className="screen-scroll">
        <motion.div
          className="screen-pad auth-body"
          variants={listContainer}
          initial="initial"
          animate="enter"
        >
          <motion.div variants={listItem} className="auth-logo">
            <Logo size={140} />
          </motion.div>

          <motion.h1 variants={listItem} className="auth-title">
            Enter Verification Code
          </motion.h1>

          <motion.p variants={listItem} className="auth-sub">
            {before}
            <strong>{BOLD_PHRASE}</strong>
            {after}
          </motion.p>

          <motion.div variants={listItem} onClick={fillNow}>
            <OtpInput
              value={code}
              onChange={(next) => {
                filledRef.current = true; // user took over — cancel the beat
                if (status !== "error") setCode(next);
              }}
              status={status}
              shakeKey={shakeKey}
            />
          </motion.div>

          {status === "error" ? (
            <p className="auth-otp-error">Invalid verification code. Please try again.</p>
          ) : (
            <motion.p variants={listItem} className="auth-otp-hint">
              Demo authenticator code <code>{twofa.code}</code> fills in by itself — or tap the
              cells.
            </motion.p>
          )}

          <motion.div variants={listItem}>
            <Button
              variant="primary"
              size="lg"
              className="auth-wide"
              disabled={code.length < 6 || status === "success"}
              onClick={submit}
            >
              Submit
            </Button>
          </motion.div>

          <motion.p variants={listItem} className="auth-help-line">
            <LinkButton size="md" onClick={() => nav.push("auth/security-check")}>
              {twofa.troubleText}
            </LinkButton>
          </motion.p>
        </motion.div>
      </div>
    </>
  );
}
