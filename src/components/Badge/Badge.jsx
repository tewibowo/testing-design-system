import React from "react";
import "./Badge.css";

/**
 * Numeric / dot badge. Wrap any child to overlay a badge on the top-right corner.
 *
 *   <Badge>3</Badge>                  // standalone
 *   <Badge tone="critical" dot />     // dot variant
 *   <Badge.Wrap badge={<Badge>3</Badge>}><IconButton ... /></Badge.Wrap>
 */
export function Badge({ tone = "brand", size = "md", dot = false, max = 99, children, className = "", ...rest }) {
  const cls = [
    "sx-badge",
    `sx-badge--${size}`,
    tone !== "brand" && `sx-badge--${tone}`,
    dot && "sx-badge--dot",
    className,
  ].filter(Boolean).join(" ");
  const content = dot
    ? null
    : typeof children === "number" && children > max
      ? `${max}+`
      : children;
  return <span className={cls} {...rest}>{content}</span>;
}

Badge.Wrap = function BadgeWrap({ badge, children }) {
  return (
    <span className="sx-badge-wrap">
      {children}
      {badge}
    </span>
  );
};
