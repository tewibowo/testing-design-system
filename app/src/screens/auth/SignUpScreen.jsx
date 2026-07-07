// auth/signup — "Create Personal Account" registration form
// (auth-signup.md A1/A2). Copy verbatim; email prefilled from db
// (user.signupEmail, as captured). The password checklist renders inline
// under the field, ticks live, and collapses once all five rules pass.
// CTA → captcha sheet → email-verification notice (A3).
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@ds/components/Button/Button.jsx";
import { Input } from "@ds/components/Input/Input.jsx";
import { LinkButton } from "@ds/components/LinkButton/LinkButton.jsx";
import { Alert } from "@ds/components/Alert/Alert.jsx";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import { useNav } from "@app/nav/Navigator.jsx";
import { useSheet } from "@app/nav/Sheet.jsx";
import { user } from "@app/data/db.js";
import { listContainer, listItem, DUR, EASE_BRAND } from "@app/motion/presets.js";
import { CaptchaSheet } from "./CaptchaSheet.jsx";
import { GoogleChooserSheet } from "./GoogleChooserSheet.jsx";
import { GoogleG, OrDivider, useAuthToast } from "./AuthKit.jsx";
import "./auth.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password requirements — labels verbatim from auth-signup.md A1 §6.
const RULES = [
  { label: "Contain 8-16 characters", test: (p) => p.length >= 8 && p.length <= 16 },
  { label: "Contain at least 1 uppercase letter (A-Z)", test: (p) => /[A-Z]/.test(p) },
  { label: "Contain at least 1 lowercase letter (a-z)", test: (p) => /[a-z]/.test(p) },
  { label: "Contain at least 1 number (0-9)", test: (p) => /[0-9]/.test(p) },
  {
    label: "Contain at least 1 special character (#$%^&*)",
    test: (p) => /[^A-Za-z0-9]/.test(p)
  }
];

function RuleIcon() {
  return (
    <svg className="auth-rule__icon" viewBox="0 0 18 18" aria-hidden="true">
      <circle cx="9" cy="9" r="9" />
      <path d="M5 9.5 8 12.5 13 6.5" />
    </svg>
  );
}

export function SignUpScreen() {
  const nav = useNav();
  const { openSheet } = useSheet();
  const [toastEl, showToast] = useAuthToast();
  const [email, setEmail] = useState(user.signupEmail);
  const [password, setPassword] = useState("");

  const results = RULES.map((rule) => rule.test(password));
  const allPass = results.every(Boolean);
  const emailValid = EMAIL_RE.test(email);
  // Open while typing; collapse once every rule is satisfied (A1 mobile note).
  const checklistOpen = password.length > 0 && !allPass;

  const create = () => {
    if (!emailValid || !allPass) return;
    openSheet(({ close }) => (
      <CaptchaSheet
        close={close}
        onSuccess={() => {
          close();
          nav.push("auth/verify-email");
        }}
      />
    ));
  };

  const continueWithGoogle = () => {
    openSheet(({ close }) => (
      <GoogleChooserSheet
        onPick={() => {
          close();
          nav.push("auth/2fa", { via: "google" });
        }}
      />
    ));
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
          <motion.h1 variants={listItem} className="auth-title">
            Create Personal Account
          </motion.h1>

          <motion.form
            variants={listItem}
            className="auth-form"
            onSubmit={(e) => {
              e.preventDefault();
              create();
            }}
          >
            <Input
              label="Email address"
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              autoCorrect="off"
              enterKeyHint="next"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              autoComplete="new-password"
              enterKeyHint="done"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <AnimatePresence initial={false}>
              {checklistOpen && (
                <motion.div
                  className="auth-rules-wrap"
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
                  <div className="auth-rules">
                    {RULES.map((rule, i) => (
                      <div key={rule.label} className="auth-rule" data-ok={results[i]}>
                        <RuleIcon />
                        {rule.label}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="auth-tnc">
              By creating an account with StraitsX, I have read and agree to be bound by the{" "}
              <LinkButton
                size="md"
                onClick={() => showToast("Terms and Conditions are not part of this prototype", "info")}
              >
                Terms and Conditions
              </LinkButton>{" "}
              and the{" "}
              <LinkButton
                size="md"
                onClick={() => showToast("The Privacy Policy is not part of this prototype", "info")}
              >
                Privacy Policy
              </LinkButton>
              .
            </p>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="auth-wide"
              disabled={!emailValid || !allPass}
            >
              Create Personal Account
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
              onClick={continueWithGoogle}
            >
              <GoogleG size={20} />
              Continue with Google
            </Button>
          </motion.div>

          <motion.p variants={listItem} className="auth-switch">
            Already have a StraitsX account?{" "}
            <LinkButton size="md" onClick={() => nav.pop()}>
              Login
            </LinkButton>
          </motion.p>

          <motion.div variants={listItem} className="auth-hint">
            <Alert tone="neutral" icon="lightbulb">
              Are you looking to sign-up for a StraitsX Business Account instead? Please contact
              our{" "}
              <LinkButton
                size="md"
                onClick={() => showToast("Business sales contact is not part of this prototype", "info")}
              >
                sales here
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
