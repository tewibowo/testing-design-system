import React, { useState } from "react";
import "./Tooltip.css";

/**
 * Hover/focus tooltip. Wraps a single child element.
 *
 *   <Tooltip label="Maximum transfer amount" side="top">
 *     <IconButton icon="info" />
 *   </Tooltip>
 */
export function Tooltip({ label, side = "top", children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  if (!label) return children;
  return (
    <span
      className="sx-tooltip"
      data-open={open || undefined}
      data-side={side}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      <span role="tooltip" className="sx-tooltip__bubble">{label}</span>
    </span>
  );
}
