// auth/verify-email — "Email verification" notice after registration
// (auth-signup.md A3). Copy verbatim. The bottom CTA simulates tapping the
// link inside the email (spec-suggested affordance — the real screen just
// waits) and lands on the email-link landing page (A4).
import { motion } from "motion/react";
import { Button } from "@ds/components/Button/Button.jsx";
import { LinkButton } from "@ds/components/LinkButton/LinkButton.jsx";
import { Alert } from "@ds/components/Alert/Alert.jsx";
import { Logo } from "@ds/components/Logo/Logo.jsx";
import { StatusIcon } from "@ds/components/StatusIcon/StatusIcon.jsx";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import { useNav } from "@app/nav/Navigator.jsx";
import { listContainer, listItem } from "@app/motion/presets.js";
import { useAuthToast } from "./AuthKit.jsx";
import "./auth.css";

export function VerifyEmailScreen() {
  const nav = useNav();
  const [toastEl, showToast] = useAuthToast();

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

          <motion.div variants={listItem} className="auth-status">
            <StatusIcon variant="needApproval" size={64} />
          </motion.div>

          <motion.h1 variants={listItem} className="auth-title">
            Email verification
          </motion.h1>

          <motion.div variants={listItem}>
            <Alert tone="warning">
              You need to verify your email address to activate your account.
            </Alert>
          </motion.div>

          <motion.p variants={listItem} className="auth-sub">
            An email with instructions to verify your email address has been sent to you.
          </motion.p>

          <motion.p variants={listItem} className="auth-sub auth-sub--secondary">
            Haven&#39;t received a verification code in your email?
            <br />
            <LinkButton size="md" onClick={() => showToast("Verification email re-sent")}>
              Click here
            </LinkButton>{" "}
            to re-send the email.
          </motion.p>
        </motion.div>
      </div>

      <div className="cta-bar">
        {/* Simulates the user opening the email and tapping the link (→ A4). */}
        <Button variant="primary" size="lg" onClick={() => nav.push("auth/verify-confirm")}>
          Open the verification email
        </Button>
      </div>
      {toastEl}
    </>
  );
}
