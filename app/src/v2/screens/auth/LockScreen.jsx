import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimate } from "motion/react";
import { useNav } from "@app/nav/Navigator.jsx";
import { useSheet } from "@app/nav/Sheet.jsx";
import { Keypad } from "@app/v2/core/Keypad.jsx";
import { PatternBg } from "@app/v2/core/PatternBg.jsx";
import { user, twofa } from "@app/data/db.js";
import {
  DUR,
  EASE_BRAND,
  listContainer,
  listItem,
  pressable
} from "@app/motion/presets.js";
import logomarkUrl from "@ds/assets/logomark-full.svg";
import "./v2auth-lock.css";

const CODE_LENGTH = 6;
// §4.10: success = dots sequentially tint mint, 50ms stagger; leave a beat
// after the last dot before the stack resets to the tab UI.
const SUCCESS_STAGGER_MS = 50;
const SUCCESS_HOLD_MS = CODE_LENGTH * SUCCESS_STAGGER_MS + 250;

/**
 * v2/lock — returning-user unlock (brief §2.6, ANZ Plus composition).
 * Full-ivy passcode screen: logomark pattern backdrop, small vibrant-green
 * logomark in the top third, greeting + "Enter your passcode", 6 dots that
 * tick-fill (§4.10), shared borderless keypad with a biometric key in the
 * empty bottom-left cell. Any 6 digits unlock (prototype); the demo hint
 * surfaces db.twofa.code, and "Use demo code" autofills with a 50ms stagger.
 *
 * phase: "idle" (accepting digits) → "filling" (autofill/biometric in
 * flight) → "verify" (600ms fake async) → "success" (mint tint → reset).
 */
export function LockScreen() {
  const nav = useNav();
  const { openSheet } = useSheet();
  const [code, setCode] = useState("");
  const [phase, setPhase] = useState("idle");
  const [scanning, setScanning] = useState(false);
  const [dotsScope, animateDots] = useAnimate();

  // Every pending timer lands here so unmount cleans them all up.
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  const markStyle = useMemo(
    () => ({
      WebkitMaskImage: `url(${logomarkUrl})`,
      maskImage: `url(${logomarkUrl})`
    }),
    []
  );

  // §4.9 error shake, reused as the "input is locked" nudge: single ±4px
  // x-shake, 120ms total, brand ease — one correction, not an oscillation.
  const nudge = () => {
    if (dotsScope.current) {
      animateDots(
        dotsScope.current,
        { x: [0, -4, 4, 0] },
        { duration: DUR.fast, ease: EASE_BRAND }
      );
    }
  };

  const handleKey = (key) => {
    if (phase !== "idle") {
      nudge();
      return;
    }
    if (key === "back") {
      setCode((c) => c.slice(0, -1));
      return;
    }
    if (key === ".") return; // decimal is hidden; belt and braces
    setCode((c) => (c.length >= CODE_LENGTH ? c : c + key));
  };

  // "Use demo code": autofill the db passcode, one dot per 50ms.
  const fillDemo = (lead = 120) => {
    if (phase !== "idle") {
      nudge();
      return;
    }
    setPhase("filling");
    setCode("");
    twofa.code
      .split("")
      .forEach((digit, i) =>
        later(() => setCode((c) => c + digit), lead + i * SUCCESS_STAGGER_MS)
      );
  };

  // Biometric key: brief simulated scan (ring tints accent), then the same
  // staggered fill as the demo link.
  const bioUnlock = () => {
    if (phase !== "idle") {
      nudge();
      return;
    }
    setScanning(true);
    later(() => setScanning(false), 700);
    fillDemo(420);
  };

  // Wrong length does nothing — verification only arms at 6 digits. Any
  // 6 digits unlock in the prototype; ~600ms fake async, then success.
  useEffect(() => {
    if (code.length !== CODE_LENGTH) return;
    setPhase("verify");
    later(() => setPhase("success"), 600);
  }, [code]);

  useEffect(() => {
    if (phase !== "success") return;
    later(() => nav.reset("v2/root"), SUCCESS_HOLD_MS);
  }, [phase, nav]);

  const openEmailSheet = () =>
    openSheet(({ close }) => <EmailFallbackSheet close={close} />);

  return (
    <div className="v2auth-lock">
      <PatternBg />

      <motion.div
        className="v2auth-lock__hero"
        variants={listContainer}
        initial="initial"
        animate="enter"
      >
        <motion.div
          className="v2auth-lock__mark"
          style={markStyle}
          variants={listItem}
          aria-hidden="true"
        />
        <motion.p className="v2auth-lock__hello" variants={listItem}>
          Welcome back, {user.name}
        </motion.p>
        <motion.h1 className="v2auth-lock__title" variants={listItem}>
          Enter your passcode
        </motion.h1>

        <motion.div
          className="v2auth-lock__dots"
          variants={listItem}
          ref={dotsScope}
          role="status"
          aria-label={`${code.length} of ${CODE_LENGTH} digits entered`}
        >
          {Array.from({ length: CODE_LENGTH }, (_, i) => {
            const filled = i < code.length;
            return (
              <motion.span
                key={i}
                className={
                  "v2auth-lock__dot" +
                  (filled ? " is-filled" : "") +
                  (phase === "success" ? " is-success" : "")
                }
                style={{ "--i": i }}
                // §4.10: each dot fills with a 1.0 → 1.15 → 1.0 scale tick.
                animate={filled ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                transition={{ duration: DUR.fast, ease: EASE_BRAND }}
              />
            );
          })}
        </motion.div>

        <motion.div className="v2auth-lock__demo" variants={listItem}>
          <p className="v2auth-lock__hint">
            Demo passcode <span className="v2auth-lock__code">{twofa.code}</span> —
            any 6 digits unlock
          </p>
          <motion.button
            {...pressable}
            className="v2auth-lock__demo-link"
            onClick={() => fillDemo()}
          >
            Use demo code
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className="v2auth-lock__foot"
        initial={{ opacity: 0, y: 12 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: DUR.slow, ease: EASE_BRAND, delay: 0.2 }
        }}
      >
        <motion.button
          {...pressable}
          className="v2auth-lock__email"
          onClick={openEmailSheet}
        >
          Login with email instead
        </motion.button>

        <div className="v2auth-lock__pad">
          <Keypad onKey={handleKey} decimal={false} />
          {/* Sits in the keypad's empty bottom-left cell (decimal={false}
              leaves the "." slot blank): grid pads 4px/8px, 2px gaps,
              56px rows — see v2-theme.css .v2-keypad. */}
          <motion.button
            {...pressable}
            className="v2auth-lock__bio"
            onClick={bioUnlock}
            aria-label="Unlock with biometrics"
          >
            <span
              className={
                "v2auth-lock__bio-ring" + (scanning ? " is-scanning" : "")
              }
            >
              <span className="material-symbols-rounded">person</span>
            </span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Sheet-only fallback (not a route, mirroring v1's CaptchaSheet convention):
 * email login lives in the v1 prototype; this demo unlocks with a passcode.
 */
function EmailFallbackSheet({ close }) {
  return (
    <div className="v2auth-sheet">
      <h2 className="v2auth-sheet__title">Login with email</h2>
      <p className="v2auth-sheet__body">
        This is the v2 concept demo, so it opens with a passcode. Email and
        password login lives in the v1 prototype — everything here works with
        the passcode above.
      </p>
      <motion.button
        {...pressable}
        className="v2auth-sheet__cta"
        onClick={close}
      >
        Back to passcode
      </motion.button>
    </div>
  );
}
