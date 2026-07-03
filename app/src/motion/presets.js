// StraitsX motion language — subtle, confident, never bouncy.
// Durations/easings from the brand guidelines (README "Motion"):
// 120ms hover/press, 200ms small elements, 320ms modals,
// ease cubic-bezier(0.2, 0.7, 0.2, 1). Stack transitions use an
// iOS-style decelerate curve for spatial continuity.

export const EASE_BRAND = [0.2, 0.7, 0.2, 1];
export const EASE_STACK = [0.32, 0.72, 0, 1];

export const DUR = {
  fast: 0.12,
  base: 0.2,
  modal: 0.32,
  stack: 0.4
};

// iOS-style stack push/pop. The incoming screen slides over the
// outgoing one, which retreats with parallax and dims.
export const stackScreen = {
  initial: { x: "100%" },
  enter: {
    x: 0,
    transition: { duration: DUR.stack, ease: EASE_STACK }
  },
  exit: {
    x: "100%",
    transition: { duration: DUR.stack, ease: EASE_STACK }
  },
  // applied to a screen when another screen stacks on top of it
  covered: {
    x: "-28%",
    transition: { duration: DUR.stack, ease: EASE_STACK }
  },
  uncovered: {
    x: 0,
    transition: { duration: DUR.stack, ease: EASE_STACK }
  }
};

export const scrim = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: DUR.modal, ease: EASE_BRAND } },
  exit: { opacity: 0, transition: { duration: DUR.base, ease: EASE_BRAND } }
};

// Bottom sheet — critically damped spring: settles fast, no overshoot.
export const SPRING_SHEET = { type: "spring", stiffness: 480, damping: 44, mass: 1 };

export const sheet = {
  initial: { y: "100%" },
  enter: { y: 0, transition: SPRING_SHEET },
  exit: { y: "100%", transition: { duration: 0.26, ease: EASE_STACK } }
};

// Tab switch — content crossfade with a whisper of vertical travel.
export const tabContent = {
  initial: { opacity: 0, y: 6 },
  enter: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE_BRAND } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.12, ease: EASE_BRAND } }
};

// Staggered list entrance for dashboards/lists.
export const listContainer = {
  enter: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } }
};
export const listItem = {
  initial: { opacity: 0, y: 14 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.32, ease: EASE_BRAND } }
};

export const pressable = {
  whileTap: { scale: 0.97, transition: { duration: DUR.fast, ease: EASE_BRAND } }
};
