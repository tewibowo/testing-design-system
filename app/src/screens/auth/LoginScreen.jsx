// auth/login — app entry. Login spec S1 + the "reset email sent"
// positive-alert state from auth-signup spec B2 (params.resetSent or the
// Forgot Password? action). Copy verbatim from reference/specs/auth-login.md.
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@ds/components/Button/Button.jsx";
import { Input } from "@ds/components/Input/Input.jsx";
import { LinkButton } from "@ds/components/LinkButton/LinkButton.jsx";
import { Alert } from "@ds/components/Alert/Alert.jsx";
import { Logo } from "@ds/components/Logo/Logo.jsx";
import { useNav } from "@app/nav/Navigator.jsx";
import { useSheet } from "@app/nav/Sheet.jsx";
import { listContainer, listItem, DUR, EASE_BRAND } from "@app/motion/presets.js";
import { CaptchaSheet } from "./CaptchaSheet.jsx";
import { AuthDecor, GoogleG, OrDivider, useAuthToast } from "./AuthKit.jsx";
import "./auth.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginScreen({ params = {} }) {
  const nav = useNav();
  const { openSheet } = useSheet();
  const [toastEl, showToast] = useAuthToast();
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(Boolean(params.resetSent));
  const [sendingReset, setSendingReset] = useState(false);
  const timer = useRef(null);
  const emailValid = EMAIL_RE.test(email);

  useEffect(() => () => clearTimeout(timer.current), []);

  const proceed = () => {
    if (!emailValid) return;
    openSheet(({ close }) => (
      <CaptchaSheet
        close={close}
        onSuccess={() => {
          close();
          nav.push("auth/password", { email });
        }}
      />
    ));
  };

  const forgotPassword = () => {
    if (sendingReset) return;
    if (resetSent) {
      showToast("Reset email re-sent");
      return;
    }
    setSendingReset(true);
    timer.current = setTimeout(() => {
      setSendingReset(false);
      setResetSent(true);
    }, 600);
  };

  return (
    <>
      <div className="screen-scroll">
        <motion.div
          className="screen-pad auth-body auth-body--root"
          variants={listContainer}
          initial="initial"
          animate="enter"
        >
          <AuthDecor />

          <motion.div variants={listItem} className="auth-logo">
            <Logo size={140} />
          </motion.div>

          <motion.h1 variants={listItem} className="auth-title">
            Login to Your
            <br />
            <span className="auth-title__accent">Personal</span> Account
          </motion.h1>

          <motion.form
            variants={listItem}
            className="auth-form"
            onSubmit={(e) => {
              e.preventDefault();
              proceed();
            }}
          >
            <Input
              label="Email Address"
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              autoCorrect="off"
              enterKeyHint="next"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="auth-inline-link">
              <LinkButton size="md" onClick={forgotPassword} disabled={sendingReset}>
                Forgot Password?
              </LinkButton>
            </div>
            <AnimatePresence initial={false}>
              {resetSent && (
                <motion.div
                  className="auth-alert-slot"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                    transition: { duration: DUR.slow, ease: EASE_BRAND }
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: { duration: 0.16, ease: EASE_BRAND }
                  }}
                >
                  <Alert tone="positive">
                    You should receive an email shortly with further instructions.
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="auth-wide"
              disabled={!emailValid}
            >
              Proceed
            </Button>
          </motion.form>

          <motion.div variants={listItem}>
            <OrDivider />
          </motion.div>

          <motion.div variants={listItem}>
            <Button
              variant="secondary"
              size="lg"
              className="auth-wide auth-google-cta"
              onClick={() => nav.push("auth/google")}
            >
              <GoogleG size={20} />
              Continue with Google
            </Button>
          </motion.div>

          <motion.p variants={listItem} className="auth-switch">
            New to StraitsX?{" "}
            <LinkButton size="md" onClick={() => nav.push("auth/signup")}>
              Sign up
            </LinkButton>
          </motion.p>

          <motion.div variants={listItem} className="auth-hint">
            <Alert tone="neutral" icon="lightbulb">
              If you wish to login as a Business user, please click{" "}
              <LinkButton
                size="md"
                onClick={() => showToast("Business login is not part of this prototype", "info")}
              >
                here
              </LinkButton>
              .
            </Alert>
          </motion.div>
        </motion.div>
      </div>
      {toastEl}
    </>
  );
}
