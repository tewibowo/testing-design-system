import React from "react";
import "./Card.css";

/**
 * Basic surface primitive.
 * surface: "default" | "raised" | "ivy" | "teal"
 */
export function Card({ surface = "default", className = "", title, body, children, ...rest }) {
  const cls = [
    "card",
    surface !== "default" && `card--${surface}`,
    className,
  ].filter(Boolean).join(" ");
  return (
    <section className={cls} {...rest}>
      {title && <h3 className="card__title">{title}</h3>}
      {body && <p className="card__body">{body}</p>}
      {children}
    </section>
  );
}
