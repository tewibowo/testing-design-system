// auth/verify-confirm — landing page of the verification link inside the
// email (auth-signup.md A4). Heading verbatim (duplicate body line dropped
// per spec); the email renders as a distinct chip. CTA keeps the verbatim
// link copy "Click here to proceed" restyled as the primary button.
import { motion } from "motion/react";
import { Button } from "@ds/components/Button/Button.jsx";
import { Logo } from "@ds/components/Logo/Logo.jsx";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import { useNav } from "@app/nav/Navigator.jsx";
import { user } from "@app/data/db.js";
import { listContainer, listItem } from "@app/motion/presets.js";
import "./auth.css";

export function VerifyConfirmScreen() {
  const nav = useNav();

  return (
    <>
      <AppHeader back />
      <div className="screen-scroll">
        <motion.div
          className="screen-pad auth-body auth-body--center"
          variants={listContainer}
          initial="initial"
          animate="enter"
        >
          <motion.div variants={listItem} className="auth-logo">
            <Logo size={140} />
          </motion.div>

          <motion.h1 variants={listItem} className="auth-title">
            Confirm validity of e-mail address{" "}
            <span className="auth-email-chip">{user.verifiedEmail}</span>.
          </motion.h1>
        </motion.div>
      </div>

      <div className="cta-bar">
        <Button variant="primary" size="lg" onClick={() => nav.push("auth/verified")}>
          Click here to proceed
        </Button>
      </div>
    </>
  );
}
