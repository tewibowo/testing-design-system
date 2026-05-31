import React from "react";
import "./ErrorResponse.css";

/**
 * Full-page error template — 404 / 500 / "Access denied" / "KYC rejected".
 * Currently text-only; revisit once the brand illustration set is supplied.
 *
 *   <ErrorResponse code="404" title="Page not found" body="…" actions={<Button>Go home</Button>} />
 */
export function ErrorResponse({ code, title, body, actions, className = "" }) {
  return (
    <section className={"error " + className} role="alert">
      {code && <div className="error__code">{code}</div>}
      {title && <div className="error__title">{title}</div>}
      {body && <div className="error__body">{body}</div>}
      {actions && <div className="error__actions">{actions}</div>}
    </section>
  );
}
