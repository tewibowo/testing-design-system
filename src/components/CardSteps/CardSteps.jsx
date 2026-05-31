import React from "react";
import "./CardSteps.css";

/**
 * Card / Steps — a single numbered step inside a card: a counter badge, the
 * step title, and a content region (indented under the title).
 * Figma: Card / Steps (5864:7460).
 *
 *   <CardSteps step={1} title="Select Transfer Method">
 *     <CardSteps.Options
 *       options={[{ id: "blockchain", label: "Blockchain Transfer" }]}
 *       selected="blockchain"
 *       onSelect={...}
 *     />
 *   </CardSteps>
 */
export function CardSteps({ step = 1, title, helperText, children, className = "", ...rest }) {
  const cls = ["card-steps", className].filter(Boolean).join(" ");
  return (
    <section className={cls} {...rest}>
      <div className="card-steps__head">
        <span className="card-steps__counter num">{step}</span>
        <p className="card-steps__title">{title}</p>
      </div>
      {(children || helperText) && (
        <div className="card-steps__content">
          {children}
          {helperText && <p className="card-steps__helper">{helperText}</p>}
        </div>
      )}
    </section>
  );
}

/**
 * Selection-box options row used inside a CardSteps content slot.
 * `options` is `[{ id, label, icon? }]`.
 */
CardSteps.Options = function CardStepsOptions({ options = [], selected, onSelect }) {
  return (
    <div className="card-steps__options" role="radiogroup">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          role="radio"
          aria-checked={opt.id === selected}
          className={"card-steps__option" + (opt.id === selected ? " is-selected" : "")}
          onClick={onSelect ? () => onSelect(opt.id) : undefined}
        >
          {opt.icon && <span className="material-symbols-rounded card-steps__option-icon">{opt.icon}</span>}
          <span className="card-steps__option-label">{opt.label}</span>
        </button>
      ))}
    </div>
  );
};
