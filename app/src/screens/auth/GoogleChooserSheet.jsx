// Google "Choose an account" — sheet-only step on the Google login path.
// Deliberately Google-styled (dark, Roboto-ish), NOT StraitsX DS: it sells
// the "external OAuth" moment (auth-login.md §4). Copy verbatim from spec.
//   openSheet(({ close }) => <GoogleChooserSheet close={close} onPick={…} />)
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "@ds/components/Logo/Logo.jsx";
import { user } from "@app/data/db.js";
import { listContainer, listItem, pressable, DUR, EASE_BRAND } from "@app/motion/presets.js";
import { GoogleG } from "./AuthKit.jsx";
import "./auth.css";

const AVATAR_CLASS = {
  teal: "is-teal",
  indigo: "is-indigo",
  photo: "is-photo",
  "orange-red": "is-orange"
};

export function GoogleChooserSheet({ onPick }) {
  const [note, setNote] = useState(null);
  const showNote = (text) => setNote({ id: Date.now(), text });

  return (
    <div className="auth-google">
      <div className="auth-google__bar">
        <GoogleG size={18} />
        <span className="auth-google__bar-label">Sign in with Google</span>
      </div>

      <motion.div
        className="auth-google__main"
        variants={listContainer}
        initial="initial"
        animate="enter"
      >
        <motion.div variants={listItem}>
          <Logo size={90} tone="white" />
        </motion.div>
        <motion.h2 variants={listItem} className="auth-google__heading">
          Choose an account
        </motion.h2>
        <motion.p variants={listItem} className="auth-google__sub">
          to continue to{" "}
          <button
            type="button"
            className="auth-google__link"
            onClick={() => showNote("StraitsX opens after you choose an account")}
          >
            StraitsX
          </button>
        </motion.p>

        <ul className="auth-google__list">
          {user.googleAccounts.map((account) => (
            <motion.li key={account.email} variants={listItem}>
              <motion.button
                {...pressable}
                type="button"
                className="auth-google__row"
                onClick={() => onPick(account)}
              >
                <span className={`auth-google__avatar ${AVATAR_CLASS[account.avatar] ?? "is-plain"}`}>
                  {account.avatar === "photo" ? (
                    <span className="material-symbols-rounded">person</span>
                  ) : (
                    account.name.charAt(0)
                  )}
                </span>
                <span className="auth-google__id">
                  <span className="auth-google__name">{account.name}</span>
                  <span className="auth-google__email">{account.email}</span>
                </span>
              </motion.button>
            </motion.li>
          ))}
          <motion.li variants={listItem}>
            <motion.button
              {...pressable}
              type="button"
              className="auth-google__row"
              onClick={() => showNote(`Use ${user.email} for the demo`)}
            >
              <span className="auth-google__avatar is-plain">
                <span className="material-symbols-rounded">person_outline</span>
              </span>
              <span className="auth-google__id">
                <span className="auth-google__name">Use another account</span>
              </span>
            </motion.button>
          </motion.li>
        </ul>

        <motion.p variants={listItem} className="auth-google__disclosure">
          Before using this app, you can review StraitsX&#39;s{" "}
          <button
            type="button"
            className="auth-google__link"
            onClick={() => showNote("Policy pages are not part of this prototype")}
          >
            Privacy Policy
          </button>{" "}
          and{" "}
          <button
            type="button"
            className="auth-google__link"
            onClick={() => showNote("Policy pages are not part of this prototype")}
          >
            Terms of Service
          </button>
          .
        </motion.p>

        <div className="auth-google__note-slot" aria-live="polite">
          <AnimatePresence mode="popLayout">
            {note && (
              <motion.span
                key={note.id}
                className="auth-google__note"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE_BRAND } }}
                exit={{ opacity: 0, transition: { duration: 0.13, ease: EASE_BRAND } }}
              >
                {note.text}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="auth-google__footer">
        <button
          type="button"
          className="auth-google__foot-btn"
          onClick={() => showNote("Language selection is not part of this prototype")}
        >
          English (United States)
          <span className="material-symbols-rounded">expand_more</span>
        </button>
        <div className="auth-google__foot-links">
          {["Help", "Privacy", "Terms"].map((label) => (
            <button
              key={label}
              type="button"
              className="auth-google__foot-btn"
              onClick={() => showNote(`${label} is not part of this prototype`)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
