import React from "react";
import { StatusIcon } from "../StatusIcon/StatusIcon.jsx";
import { Icon } from "../Icon/Icon.jsx";
import { LinkButton } from "../LinkButton/LinkButton.jsx";
import "./CardStatus.css";

/**
 * Card / Status — a transaction status summary card.
 * Figma: Card / Status (5744:7257).
 *
 * Renders a status icon + title, a description, optional detail sections, and
 * a totals row. Each `sections` entry is `{ title, items: [{ label, value, info? }] }`.
 *
 *   <CardStatus
 *     status="needApproval"
 *     title="Bank Transfer Awaiting Approval"
 *     description="Your transfer is submitted and awaiting approval."
 *     sections={[{ title: "Recipient Details", items: [{ label: "Recipient Name", value: "Hendra Kwik" }] }]}
 *     total={{ label: "Net Amount", value: "40 XSGD" }}
 *     footerLink={{ text: "View Transaction Details" }}
 *   />
 */
export function CardStatus({
  status = "success",
  statusIcon,
  title,
  description,
  sections = [],
  total,
  footerLink,
  className = "",
  ...rest
}) {
  const cls = ["sx-card-status", className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...rest}>
      <section className="sx-card-status__card">
        <header className="sx-card-status__head">
          <StatusIcon variant={status} icon={statusIcon} size={36} />
          {title && <h3 className="sx-card-status__title">{title}</h3>}
        </header>

        {description && <p className="sx-card-status__desc">{description}</p>}

        {sections.map((section, i) => (
          <div key={section.title || i} className="sx-card-status__section">
            {section.title && <p className="sx-card-status__section-title">{section.title}</p>}
            <dl className="sx-card-status__items">
              {section.items.map((item, j) => (
                <div key={item.label || j} className="sx-card-status__item">
                  <dt className="sx-card-status__item-label">
                    {item.label}
                    {item.info && <Icon name="info" size={16} className="sx-card-status__info" />}
                  </dt>
                  <dd className="sx-card-status__item-value">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}

        {total && (
          <div className="sx-card-status__total-wrap">
            <div className="sx-card-status__divider" />
            <div className="sx-card-status__total">
              <span className="sx-card-status__total-label">{total.label}</span>
              <span className="sx-card-status__total-value">{total.value}</span>
            </div>
          </div>
        )}
      </section>

      {footerLink && (
        <LinkButton trailingIcon="arrow_forward" onClick={footerLink.onClick}>
          {footerLink.text}
        </LinkButton>
      )}
    </div>
  );
}
