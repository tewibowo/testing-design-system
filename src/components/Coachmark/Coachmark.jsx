import React, { useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "../Button/Button.jsx";
import "./Coachmark.css";

/**
 * Onboarding coachmark. Highlights a target element with a cut-out scrim
 * and shows a popover with title + body + step navigation.
 *
 *   const [open, setOpen] = useState(true);
 *   const ref = useRef();
 *   <button ref={ref}>Help</button>
 *   <Coachmark
 *     target={ref}
 *     open={open}
 *     onDismiss={() => setOpen(false)}
 *     title="Try the Earn feature"
 *     body="…"
 *   />
 */
export function Coachmark({
  target,
  open = true,
  onDismiss,
  onNext,
  onPrev,
  title,
  body,
  step,        // e.g. 2
  totalSteps,  // e.g. 4
  nextLabel = "Next",
  doneLabel = "Got it",
  prevLabel = "Back",
  placement = "bottom",
  className = "",
}) {
  const [rect, setRect] = useState(null);

  useLayoutEffect(() => {
    if (!open) return undefined;
    const el = target?.current;
    if (!el) return undefined;
    const measure = () => setRect(el.getBoundingClientRect());
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [open, target]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === "Escape") onDismiss && onDismiss(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onDismiss]);

  if (!open || !rect) return null;

  const pad = 6;
  const spotStyle = {
    top: rect.top - pad,
    left: rect.left - pad,
    width: rect.width + pad * 2,
    height: rect.height + pad * 2,
  };

  const pop = { top: 0, left: 0 };
  if (placement === "bottom") {
    pop.top = rect.bottom + 12;
    pop.left = Math.max(8, Math.min(rect.left, window.innerWidth - 296));
  } else if (placement === "top") {
    pop.top = rect.top - 12 - 140;
    pop.left = Math.max(8, Math.min(rect.left, window.innerWidth - 296));
  } else if (placement === "right") {
    pop.top = rect.top;
    pop.left = rect.right + 12;
  } else if (placement === "left") {
    pop.top = rect.top;
    pop.left = rect.left - 12 - 280;
  }
  const isLast = totalSteps != null && step != null && step >= totalSteps;

  return createPortal(
    <>
      <div className="sx-coachmark-scrim" onClick={onDismiss} />
      <div className="sx-coachmark-spot" style={spotStyle} aria-hidden="true" />
      <div className={"sx-coachmark " + className} style={pop} role="dialog" aria-live="polite">
        {title && <div className="sx-coachmark__title">{title}</div>}
        {body && <div className="sx-coachmark__body">{body}</div>}
        <div className="sx-coachmark__foot">
          <span className="sx-coachmark__count">
            {step != null && totalSteps != null ? `${step} of ${totalSteps}` : ""}
          </span>
          <div className="sx-coachmark__actions">
            {onPrev && step > 1 && <Button variant="tertiary" size="sm" onClick={onPrev}>{prevLabel}</Button>}
            <Button variant="primary" size="sm" onClick={isLast ? onDismiss : onNext || onDismiss}>
              {isLast ? doneLabel : nextLabel}
            </Button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
