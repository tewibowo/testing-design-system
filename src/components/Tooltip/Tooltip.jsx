import React, { useState } from "react";
import { Tag } from "../Tag/Tag.jsx";
import "./Tooltip.css";

/**
 * Hover/focus tooltip. Wraps a single child element.
 *
 * Simple label form (backward-compatible):
 *   <Tooltip label="Maximum transfer amount" side="top">
 *     <IconButton icon="info" />
 *   </Tooltip>
 *
 * Rich form — bold title, ReactNode body, optional status tag, action links:
 *   <Tooltip
 *     side="top"
 *     title="Supported chains"
 *     tag={{ label: "Beta", tone: "info" }}
 *     content={<p>This token is available on multiple networks.</p>}
 *     links={[{ label: "Learn more", onClick: () => {} }]}
 *   >
 *     <IconButton icon="info" />
 *   </Tooltip>
 *
 * @param {string} [label]        Shorthand plain-text body.
 * @param {string} [title]        Bold heading.
 * @param {React.ReactNode} [content] Body content (ReactNode); falls back to `children` of the bubble if provided. `label` is used when neither given.
 * @param {{label:string,tone?:string,shape?:string}} [tag] Optional status tag rendered next to the title.
 * @param {Array<{label:string,onClick?:Function,href?:string}>} [links] Inline action links rendered at the bottom.
 * @param {"top"|"bottom"|"left"|"right"} [side="top"]
 */
export function Tooltip({
  label,
  title,
  content,
  tag,
  links,
  side = "top",
  children,
  defaultOpen = false,
}) {
  const [open, setOpen] = useState(defaultOpen);

  const body = content ?? label;
  const hasLinks = Array.isArray(links) && links.length > 0;
  const isRich = Boolean(title || tag || hasLinks || content);

  // Nothing to show — render the trigger untouched (backward-compatible).
  if (!body && !title && !tag && !hasLinks) return children;

  return (
    <span
      className="tooltip"
      data-open={open || undefined}
      data-side={side}
      data-rich={isRich || undefined}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      <span role="tooltip" className="tooltip__bubble">
        {(title || tag) && (
          <span className="tooltip__header">
            {title && <span className="tooltip__title">{title}</span>}
            {tag && (
              <Tag tone={tag.tone || "neutral"} shape={tag.shape || "default"}>
                {tag.label}
              </Tag>
            )}
          </span>
        )}
        {body && <span className="tooltip__content">{body}</span>}
        {hasLinks && (
          <span className="tooltip__links">
            {links.map((link, i) => (
              <button
                key={i}
                type="button"
                className="tooltip__link"
                onClick={link.onClick}
              >
                {link.label}
              </button>
            ))}
          </span>
        )}
      </span>
    </span>
  );
}
