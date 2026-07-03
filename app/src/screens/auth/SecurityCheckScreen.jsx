// auth/security-check — "Security check" consent step of the trouble-with-
// authenticator flow (twofa-notifications.md A2). Copy verbatim from db.
// Continue REPLACES this screen with the email OTP step so Cancel on any
// later step pops straight back to the 2FA screen (A1), per the spec's
// step map.
import { motion } from "motion/react";
import { Button } from "@ds/components/Button/Button.jsx";
import { Logo } from "@ds/components/Logo/Logo.jsx";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import { useNav } from "@app/nav/Navigator.jsx";
import { twofa } from "@app/data/db.js";
import { listContainer, listItem } from "@app/motion/presets.js";
import "./auth.css";

export function SecurityCheckScreen() {
  const nav = useNav();
  const { title, body, channels } = twofa.securityCheck;

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
            {title}
          </motion.h1>

          <motion.p variants={listItem} className="auth-sub">
            {body}
          </motion.p>

          <motion.div variants={listItem} className="auth-check-list">
            {channels.map((channel) => (
              <div key={channel} className="auth-check-row">
                <span className="material-symbols-rounded" aria-hidden="true">
                  check
                </span>
                {channel}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="cta-bar">
        <div className="auth-footer-row">
          <Button variant="secondary" size="lg" onClick={() => nav.pop()}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={() => nav.replace("auth/email-otp")}
          >
            Continue
          </Button>
        </div>
      </div>
    </>
  );
}
