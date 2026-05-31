import React from "react";
import { Icon } from "../Icon/Icon.jsx";
import { Tag } from "../Tag/Tag.jsx";
import { Button } from "../Button/Button.jsx";
import "./CardAttribute.css";

/**
 * Card / Attribute — a transaction detail card laying out label/value
 * attributes in a responsive two-column grid, with an optional status tag and
 * action footer.
 * Figma: Card / Attribute (5830:7089).
 *
 * `attributes` is `[{ label, value, info?, copyable?, link?, columns? }]`.
 * Set `columns: 2` (or `full`) for an attribute that spans the full width.
 *
 *   <CardAttribute
 *     title="Transaction Details"
 *     status={{ label: "Completed", tone: "positive" }}
 *     attributes={[{ label: "Transaction ID", value: "a3502840…", copyable: true, columns: 2 }]}
 *     actions={{ onReject, onApprove }}
 *   />
 */
export function CardAttribute({
  title = "Transaction Details",
  status,
  attributes = [],
  actions,
  onCopy,
  className = "",
  ...rest
}) {
  const cls = ["sx-card-attribute", className].filter(Boolean).join(" ");
  return (
    <section className={cls} {...rest}>
      <header className="sx-card-attribute__head">
        <h3 className="sx-card-attribute__title">{title}</h3>
        {status && <Tag tone={status.tone || "positive"}>{status.label}</Tag>}
      </header>

      <div className="sx-card-attribute__divider" />

      <dl className="sx-card-attribute__grid">
        {attributes.map((attr, i) => (
          <div
            key={attr.label || i}
            className={"sx-card-attribute__item" + (attr.columns === 2 || attr.columns === "full" ? " is-full" : "")}
          >
            <dt className="sx-card-attribute__label">
              {attr.label}
              {attr.info && <Icon name="info" size={20} className="sx-card-attribute__info" />}
            </dt>
            <dd className="sx-card-attribute__value-row">
              {attr.link ? (
                <a className="sx-card-attribute__link" href={attr.link} target="_blank" rel="noreferrer">
                  {attr.value}
                </a>
              ) : (
                <span className="sx-card-attribute__value">{attr.value}</span>
              )}
              {attr.copyable && (
                <button
                  type="button"
                  className="sx-card-attribute__copy"
                  aria-label="Copy"
                  onClick={onCopy ? () => onCopy(attr) : undefined}
                >
                  <Icon name="content_copy" size={20} />
                </button>
              )}
            </dd>
          </div>
        ))}
      </dl>

      {actions && (
        <>
          <div className="sx-card-attribute__divider" />
          <div className="sx-card-attribute__actions">
            <Button variant="secondary" size="sm" onClick={actions.onReject}>
              {actions.rejectLabel || "Reject"}
            </Button>
            <Button variant="primary" size="sm" onClick={actions.onApprove}>
              {actions.approveLabel || "Approve"}
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
