// auth/verified — terminal success of the sign-up flow (auth-signup.md A5).
// Heading verbatim (duplicate body line dropped per spec); green animated
// check via the shared SuccessState. "Back to Application" (verbatim)
// returns to the login screen at the stack root.
import { motion } from "motion/react";
import { Button } from "@ds/components/Button/Button.jsx";
import { Logo } from "@ds/components/Logo/Logo.jsx";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import { SuccessState } from "@app/ui/SuccessState.jsx";
import { useNav } from "@app/nav/Navigator.jsx";
import { listContainer, listItem } from "@app/motion/presets.js";
import "./auth.css";

export function VerifiedScreen() {
  const nav = useNav();

  return (
    <>
      <AppHeader back />
      <div className="screen-scroll">
        <motion.div
          className="screen-pad auth-body auth-success-host"
          variants={listContainer}
          initial="initial"
          animate="enter"
        >
          <motion.div variants={listItem} className="auth-logo">
            <Logo size={140} />
          </motion.div>

          <SuccessState title="Your email address has been verified.">
            <Button variant="primary" size="lg" onClick={() => nav.popToRoot()}>
              Back to Application
            </Button>
          </SuccessState>
        </motion.div>
      </div>
    </>
  );
}
