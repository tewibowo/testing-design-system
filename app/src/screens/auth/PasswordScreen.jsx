// auth/password — "Welcome Back!" password step of the email login path
// (auth-login.md §3, S3a). Copy verbatim. Prefilled dummy password so the
// field shows the captured masked-dots state and the flow stays one-tap.
import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@ds/components/Button/Button.jsx";
import { Input } from "@ds/components/Input/Input.jsx";
import { LinkButton } from "@ds/components/LinkButton/LinkButton.jsx";
import { Logo } from "@ds/components/Logo/Logo.jsx";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import { useNav } from "@app/nav/Navigator.jsx";
import { user } from "@app/data/db.js";
import { listContainer, listItem } from "@app/motion/presets.js";
import { armKeyboard } from "@app/ui/keyboardRelay.js";
import "./auth.css";

export function PasswordScreen({ params = {} }) {
  const nav = useNav();
  const email = params.email || user.email;
  const [password, setPassword] = useState("Passw0rd!234");

  const login = () => {
    if (!password) return;
    // Arm inside the tap so iOS keeps the keyboard up for the OTP cells.
    armKeyboard("numeric");
    nav.push("auth/2fa", { via: "password" });
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
            Welcome Back!
          </motion.h1>

          <motion.p variants={listItem} className="auth-sub">
            {email}
          </motion.p>

          <motion.form
            variants={listItem}
            className="auth-form"
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
          >
            {/* Hidden username field so password managers pair credentials. */}
            <input
              type="email"
              name="username"
              autoComplete="username"
              value={email}
              readOnly
              hidden
            />
            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              enterKeyHint="go"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="auth-inline-link">
              <LinkButton
                size="md"
                onClick={() => nav.reset("auth/login", { resetSent: true })}
              >
                Forgot Password?
              </LinkButton>
            </div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="auth-wide"
              disabled={!password}
            >
              Login
            </Button>
          </motion.form>

          <motion.p variants={listItem} className="auth-switch">
            New to StraitsX?{" "}
            <LinkButton size="md" onClick={() => nav.push("auth/signup")}>
              Sign up
            </LinkButton>
          </motion.p>
        </motion.div>
      </div>
    </>
  );
}
