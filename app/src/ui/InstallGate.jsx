import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { DUR, EASE_BRAND, listContainer, listItem } from "@app/motion/presets.js";
import logomarkSvg from "@ds/assets/logomark-full.svg?raw";

/* ────────────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — install gate
 *    0ms  ivy surface is there on first paint (no flash of app)
 *  60ms   logomark scales 0.9 → 1, fades in
 * 180ms   title + lead rise in
 * 260ms+  instruction rows stagger (50ms each)
 * last    "Continue in browser" fades in — deliberately latest so the
 *         install path reads as the primary action
 * exit    whole gate slides down 24px + fades (240ms), app beneath
 * ──────────────────────────────────────────────────────────────── */

const isStandalone = () =>
  typeof window !== "undefined" &&
  (window.matchMedia?.("(display-mode: standalone)").matches ||
    window.navigator.standalone === true);

const isMobile = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(pointer: coarse)").matches &&
  Math.min(window.innerWidth, window.innerHeight) < 500;

const isIos = () =>
  typeof navigator !== "undefined" && /iPhone|iPad|iPod/i.test(navigator.userAgent);

const IOS_STEPS = [
  { icon: "ios_share", text: "Tap the share button in Safari's toolbar" },
  { icon: "add_box", text: "Scroll down and choose “Add to Home Screen”" },
  { icon: "check", text: "Tap Add — then open StraitsX from your home screen" }
];

const ANDROID_STEPS = [
  { icon: "more_vert", text: "Open the browser menu (top right)" },
  { icon: "add_box", text: "Choose “Add to Home screen” or “Install app”" },
  { icon: "check", text: "Confirm — then open StraitsX from your home screen" }
];

/**
 * Overlay for mobile browsers: shows how to install the prototype as a
 * home-screen app. Hidden when already running standalone or on desktop.
 * "Continue in browser" suppresses it for the current browser session only
 * (sessionStorage) — a fresh visit shows the guide again, since installing
 * is the primary path for anyone the link is shared with.
 */
export function InstallGate({ storageKey = "stx-install-gate", appName = "StraitsX" }) {
  const [visible, setVisible] = useState(
    () => isMobile() && !isStandalone() && !sessionStorage.getItem(storageKey)
  );
  const steps = useMemo(() => (isIos() ? IOS_STEPS : ANDROID_STEPS), []);

  const dismiss = () => {
    sessionStorage.setItem(storageKey, "1");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="installgate"
          initial={false}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: DUR.slow, ease: EASE_BRAND }}
        >
          <motion.span
            aria-hidden="true"
            className="installgate__logo"
            dangerouslySetInnerHTML={{ __html: logomarkSvg }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: DUR.modal, ease: EASE_BRAND, delay: 0.06 }}
          />
          <motion.h1
            className="installgate__title"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.slow, ease: EASE_BRAND, delay: 0.18 }}
          >
            Try {appName} as an app
          </motion.h1>
          <motion.p
            className="installgate__lead"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.slow, ease: EASE_BRAND, delay: 0.22 }}
          >
            Add this prototype to your home screen — it opens full-screen and
            works offline, just like a real app.
          </motion.p>
          <motion.ol
            className="installgate__steps"
            variants={listContainer}
            initial="initial"
            animate="enter"
            transition={{ delayChildren: 0.26, staggerChildren: 0.05 }}
          >
            {steps.map((s, i) => (
              <motion.li key={s.text} className="installgate__step" variants={listItem}>
                <span className="installgate__step-num">{i + 1}</span>
                <span className="material-symbols-rounded installgate__step-icon">
                  {s.icon}
                </span>
                <span className="installgate__step-text">{s.text}</span>
              </motion.li>
            ))}
          </motion.ol>
          <motion.button
            className="installgate__continue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DUR.slow, ease: EASE_BRAND, delay: 0.5 }}
            onClick={dismiss}
          >
            Continue in browser
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
