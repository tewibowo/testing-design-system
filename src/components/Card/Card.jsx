import React from "react";
import "./Card.css";

/**
 * Basic surface primitive.
 * surface: "default" | "raised" | "ivy" | "teal"
 */
export function Card({ surface = "default", className = "", title, body, children, ...rest }) {
  const cls = [
    "sx-card",
    surface !== "default" && `sx-card--${surface}`,
    className,
  ].filter(Boolean).join(" ");
  return (
    <section className={cls} {...rest}>
      {title && <h3 className="sx-card__title">{title}</h3>}
      {body && <p className="sx-card__body">{body}</p>}
      {children}
    </section>
  );
}
