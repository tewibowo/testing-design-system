/* ────────────────────────────────────────────────
 * ANIMATION STORYBOARD — captcha success
 *    0ms  thumb dragged past 92% of the track → lock:
 *         thumb + fill snap to the end (150ms, brand ease)
 *    0ms  star piece glides the last few px into the cut-out
 *         (piece position is mapped from thumb x, so it lands
 *         as the snap completes — overlapping, not sequential)
 *  150ms  panel flips to verified: track/thumb turn green,
 *         arrow crossfades to a check
 *  620ms  onSuccess() — caller closes the sheet and advances
 * ──────────────────────────────────────────────── */
import { useLayoutEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform
} from "motion/react";
import { IconButton } from "@ds/components/IconButton/IconButton.jsx";
import { EASE_BRAND, SETTLE, DUR } from "@app/motion/presets.js";
import "./auth.css";

const TIMING = { snap: 0.15, done: 620 };
const THUMB = 48; // px, matches .auth-captcha__thumb
const PIECE_START = 30; // scene viewBox units
const STAR =
  "M0,-16 L4,-5.5 L15.2,-4.9 L6.5,2.1 L9.4,12.9 L0,6.8 L-9.4,12.9 L-6.5,2.1 L-15.2,-4.9 L-4,-5.5 Z";

/**
 * Mock GeeTest slider captcha, rendered inside the app bottom sheet.
 *   openSheet(({ close }) => <CaptchaSheet close={close} onSuccess={…} />)
 * Dragging the thumb to the end of the track succeeds; the star piece
 * tracks the thumb into its cut-out. Refresh reshuffles the target.
 */
export function CaptchaSheet({ close, onSuccess }) {
  const trackRef = useRef(null);
  const doneRef = useRef(false);
  const [maxDrag, setMaxDrag] = useState(240);
  const [done, setDone] = useState(false);
  const [seed, setSeed] = useState(0.68);
  const [note, setNote] = useState(null);
  const x = useMotionValue(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setMaxDrag(Math.max(120, trackRef.current.clientWidth - THUMB));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const targetX = 160 + seed * 120; // cut-out centre, viewBox units (scene 320 wide)
  const pieceX = useTransform(x, (v) => {
    const p = Math.min(1, Math.max(0, v / maxDrag));
    return PIECE_START + p * (targetX - PIECE_START);
  });
  const fillWidth = useTransform(x, (v) => v + THUMB);

  const showNote = (text) => {
    setNote({ id: Date.now(), text });
  };

  const lock = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setDone(true);
    animate(x, maxDrag, { duration: TIMING.snap, ease: EASE_BRAND });
    setTimeout(() => onSuccess(), TIMING.done);
  };

  const onDrag = () => {
    if (!doneRef.current && x.get() >= maxDrag * 0.92) lock();
  };

  const onDragEnd = () => {
    if (doneRef.current) return;
    if (x.get() >= maxDrag * 0.92) {
      lock();
    } else {
      animate(x, 0, SETTLE); // failed attempt slides back
    }
  };

  const refresh = () => {
    if (doneRef.current) return;
    setSeed(0.3 + Math.random() * 0.7);
    animate(x, 0, SETTLE);
    showNote("New puzzle loaded");
  };

  return (
    <div className="auth-captcha" data-done={done}>
      <div className="auth-captcha__accent" />
      <h3 className="auth-captcha__title">Slide to complete the puzzle</h3>

      {/* Puzzle scene — iceberg photo stand-in with a star cut-out. */}
      <svg className="auth-captcha__scene" viewBox="0 0 320 180" aria-hidden="true">
        <defs>
          <linearGradient id="auth-captcha-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0e2a3f" />
            <stop offset="100%" stopColor="#1d4a66" />
          </linearGradient>
        </defs>
        <rect width="320" height="180" fill="url(#auth-captcha-sky)" />
        <rect y="118" width="320" height="62" fill="#0b2233" />
        {/* Iceberg */}
        <polygon points="88,118 128,44 158,86 186,60 224,118" fill="#cfe3ee" />
        <polygon points="128,44 158,86 142,118 108,118" fill="#a9c8da" />
        <polygon points="96,124 216,124 200,152 112,152" fill="#16354a" opacity="0.7" />
        {/* Star cut-out (target) */}
        <path
          d={STAR}
          transform={`translate(${targetX}, 78)`}
          fill="rgba(2, 10, 18, 0.6)"
          stroke={done ? "var(--primary)" : "rgba(255, 255, 255, 0.4)"}
          strokeWidth="1.5"
        />
        {/* Star piece — x is mapped from the slider thumb */}
        <motion.g style={{ x: pieceX }}>
          <path
            d={STAR}
            transform="translate(0, 78)"
            fill="#e6eef5"
            stroke={done ? "var(--primary)" : "#ffffff"}
            strokeWidth="1.5"
            opacity="0.95"
          />
        </motion.g>
      </svg>

      {/* Slider track */}
      <div ref={trackRef} className="auth-captcha__track">
        <motion.div className="auth-captcha__fill" style={{ width: fillWidth }} />
        <span className="auth-captcha__track-label">Slide right to fit the piece</span>
        <motion.div
          className="auth-captcha__thumb"
          drag={done ? false : "x"}
          dragConstraints={{ left: 0, right: maxDrag }}
          dragElastic={0.02}
          dragMomentum={false}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
          style={{ x }}
          aria-label="Captcha slider"
        >
          <span className="material-symbols-rounded">
            {done ? "check" : "arrow_forward"}
          </span>
        </motion.div>
      </div>

      <div className="auth-captcha__foot">
        <IconButton icon="close" size="sm" label="Close captcha" onClick={close} />
        <IconButton icon="refresh" size="sm" label="New puzzle" onClick={refresh} />
        <IconButton
          icon="chat_bubble"
          size="sm"
          label="Feedback"
          onClick={() => showNote("Thanks for your feedback")}
        />
        <AnimatePresence mode="popLayout">
          {note && (
            <motion.span
              key={note.id}
              className="auth-captcha__note"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE_BRAND } }}
              exit={{ opacity: 0, transition: { duration: 0.13, ease: EASE_BRAND } }}
            >
              {note.text}
            </motion.span>
          )}
        </AnimatePresence>
        <span className="auth-captcha__brand">GEETEST</span>
      </div>
    </div>
  );
}
