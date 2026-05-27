import React from "react";
import "./Tag.css";

/**
 * Status / category tag.
 * tone: positive | critical | warning | info | neutral | brand
 * shape: "default" (8-px radius) | "pill" (fully rounded)
 */
export function Tag({ tone = "neutral", shape = "default", className = "", children, ...rest }) {
  const cls = [
    "sx-tag",
    `sx-tag--${tone}`,
    shape === "pill" && "sx-tag--pill",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={cls} {...rest}>
      {children}
    </span>
  );
}
