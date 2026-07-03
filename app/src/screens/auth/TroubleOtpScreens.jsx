// auth/email-otp + auth/sms-otp — the two OTP verifications of the
// trouble-with-authenticator flow (twofa-notifications.md A3/A4). Both share
// one template: heading, "sent to …" line (bold target), empty 6-cell OTP,
// live resend countdown, Cancel/Submit footer. Copy verbatim; any 6-digit
// code passes (the "sent" code is not the TOTP, so nothing to check against).
//
// Both screens sit ON TOP of auth/2fa via nav.replace, so Cancel = pop = A1.
// Email submit replaces to the SMS step; SMS submit shows "Verification
// complete" (SuccessState) and resets into root/tabs — login done.
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@ds/components/Button/Button.jsx";
import { LinkButton } from "@ds/components/LinkButton/LinkButton.jsx";
import { Logo } from "@ds/components/Logo/Logo.jsx";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import { SuccessState } from "@app/ui/SuccessState.jsx";
import { useNav } from "@app/nav/Navigator.jsx";
import { twofa } from "@app/data/db.js";
import { listContainer, listItem, DUR, EASE_BRAND } from "@app/motion/presets.js";
import { OtpInput } from "./OtpInput.jsx";
import { fmtClock, useAuthToast, useCountdown } from "./AuthKit.jsx";
import "./auth.css";

function TroubleOtp({ target, resendToast, onVerified, renderHelpLine }) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("idle");
  const [seconds, restart] = useCountdown(twofa.resendSeconds);
  const [toastEl, showToast] = useAuthToast();
  const nav = useNav();
  const lockRef = useRef(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const submit = () => {
    if (code.length < 6 || lockRef.current) return;
    lockRef.current = true;
    setStatus("success");
    timer.current = setTimeout(onVerified, 500);
  };

  const resend = () => {
    restart();
    setCode("");
    showToast(resendToast);
  };

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
            Enter the code that we sent to <strong>{target}</strong>
          </motion.p>

          <motion.div variants={listItem}>
            <OtpInput value={code} onChange={setCode} status={status} />
          </motion.div>

          <motion.p variants={listItem} className="auth-resend">
            Didn&#39;t receive the code?{" "}
            {seconds > 0 ? (
              <>
                Resend in <span className="auth-clock">{fmtClock(seconds)}</span>
              </>
            ) : (
              <LinkButton size="md" onClick={resend}>
                Resend
              </LinkButton>
            )}
          </motion.p>
        </motion.div>
      </div>

      <div className="cta-bar">
        <div className="auth-footer-row">
          <Button
            variant="secondary"
            size="lg"
            disabled={status === "success"}
            onClick={() => nav.pop()}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="lg"
            disabled={code.length < 6 || status === "success"}
            onClick={submit}
          >
            Submit
          </Button>
        </div>
        {renderHelpLine?.(showToast)}
      </div>
      {toastEl}
    </>
  );
}

/** A3 — OTP sent to the user's email. */
export function EmailOtpScreen() {
  const nav = useNav();
  return (
    <TroubleOtp
      target={twofa.emailOtpTarget}
      resendToast="Verification code re-sent"
      onVerified={() => nav.replace("auth/sms-otp")}
    />
  );
}

/** A4 — OTP sent by SMS to the masked phone number. */
export function SmsOtpScreen() {
  const nav = useNav();
  const [done, setDone] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const finish = () => {
    setDone(true);
    // Verification complete → back into the login flow: land on the app.
    timer.current = setTimeout(() => nav.reset("root/tabs"), 1800);
  };

  return (
    <AnimatePresence mode="wait">
      {done ? (
        <motion.div
          key="done"
          className="auth-success-host"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: DUR.base, ease: EASE_BRAND } }}
        >
          <SuccessState
            title="Verification complete"
            body="Your identity has been verified. Taking you to your account."
          >
            <Button variant="primary" size="lg" onClick={() => nav.reset("root/tabs")}>
              Continue
            </Button>
          </SuccessState>
        </motion.div>
      ) : (
        <motion.div
          key="otp"
          className="auth-fill"
          exit={{ opacity: 0, transition: { duration: 0.13, ease: EASE_BRAND } }}
        >
          <TroubleOtp
            target={twofa.maskedPhone}
            resendToast="Verification code re-sent"
            onVerified={finish}
            renderHelpLine={(showToast) => (
              <p className="auth-help-line">
                <strong>Can&#39;t access Phone Number?</strong>{" "}
                <LinkButton
                  size="md"
                  onClick={() =>
                    showToast("Customer support is not part of this prototype", "info")
                  }
                >
                  Contact customer support
                </LinkButton>
              </p>
            )}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
