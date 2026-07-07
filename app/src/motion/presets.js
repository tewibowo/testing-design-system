// StraitsX motion language — subtle, confident, never bouncy.
// Sources: brand guidelines (README "Motion") + Intercraft brief
// (reference/specs/_motion-craft-brief.md).
//
// Rules encoded here:
// - ONE ease for enters/moves: cubic-bezier(0.2, 0.7, 0.2, 1)
// - duration tokens 120/200/240/320ms; exits run ~2/3 of enter
// - lists stagger 50ms, fade + rise
// - sheets: 320ms up, no bounce; gesture release settles with bounce:0
// - stack push keeps iOS spatial continuity (decel curve) — the one
//   deliberate departure from web fade-only pages, because this is an app

export const EASE_BRAND = [0.2, 0.7, 0.2, 1];
export const EASE_STACK = [0.32, 0.72, 0, 1];

export const DUR = {
  fast: 0.12,
  base: 0.2,
  slow: 0.24,
  modal: 0.32,
  stack: 0.38
};

// iOS-style stack push/pop with parallax retreat + dim underneath.
export const stackScreen = {
  initial: { x: "100%" },
  enter: { x: 0, transition: { duration: DUR.stack, ease: EASE_STACK } },
  exit: { x: "100%", transition: { duration: DUR.stack, ease: EASE_STACK } },
  covered: { x: "-28%", transition: { duration: DUR.stack, ease: EASE_STACK } },
  uncovered: { x: 0, transition: { duration: DUR.stack, ease: EASE_STACK } }
};

export const scrim = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: DUR.modal, ease: EASE_BRAND } },
  exit: { opacity: 0, transition: { duration: DUR.base, ease: EASE_BRAND } }
};

// Bottom sheet — brand curve up, no spring overshoot; exit at ~2/3.
export const sheet = {
  initial: { y: "100%" },
  enter: { y: 0, transition: { duration: DUR.modal, ease: EASE_BRAND } },
  exit: { y: "100%", transition: { duration: 0.22, ease: EASE_BRAND } }
};

// Settle transition for gesture release (drag that didn't dismiss).
export const SETTLE = { type: "spring", bounce: 0, duration: 0.3 };

// Centered modal (confirmations) — scale + fade, one hero move.
export const modalCard = {
  initial: { opacity: 0, scale: 0.96, y: 8 },
  enter: { opacity: 1, scale: 1, y: 0, transition: { duration: DUR.slow, ease: EASE_BRAND } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.16, ease: EASE_BRAND } }
};

// Tab switch — quick content crossfade, whisper of travel.
export const tabContent = {
  initial: { opacity: 0, y: 6 },
  enter: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE_BRAND } },
  exit: { opacity: 0, transition: { duration: 0.13, ease: EASE_BRAND } }
};

// Staggered list entrance (50ms per Intercraft).
export const listContainer = {
  initial: {},
  enter: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } }
};
export const listItem = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE_BRAND } }
};

// Toast — slide down from top, exit up at 2/3.
export const toast = {
  initial: { opacity: 0, y: -16 },
  enter: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE_BRAND } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.13, ease: EASE_BRAND } }
};

export const pressable = {
  whileTap: { scale: 0.97, transition: { duration: DUR.fast, ease: EASE_BRAND } }
};
