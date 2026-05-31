import React from "react";
import "./InlineCrossAsset.css";

/**
 * Inline conversion box showing a "from → to" asset pair with a caption.
 * Figma: Inline Box / Cross Asset (5700:9286).
 *
 * Pass `fromIcon` / `toIcon` as ReactNodes (round 20px coin/flag icons) —
 * use initials placeholders as fallback. Do NOT pass remote Figma asset URLs.
 */
export function InlineCrossAsset({
  from = "XUSD",
  to = "USD",
  fromIcon,
  toIcon,
  caption = "Your XUSD will be converted 1:1 to USD",
  className = "",
  ...rest
}) {
  const cls = ["sx-inline-cross-asset", className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...rest}>
      <div className="sx-inline-cross-asset__row">
        <span className="sx-inline-cross-asset__asset">
          {fromIcon != null && (
            <span className="sx-inline-cross-asset__icon">{fromIcon}</span>
          )}
          <span className="sx-inline-cross-asset__symbol">{from}</span>
        </span>
        <span
          className="sx-inline-cross-asset__arrow material-symbols-rounded"
          aria-hidden="true"
        >
          arrow_forward
        </span>
        <span className="sx-inline-cross-asset__asset">
          {toIcon != null && (
            <span className="sx-inline-cross-asset__icon">{toIcon}</span>
          )}
          <span className="sx-inline-cross-asset__symbol">{to}</span>
        </span>
      </div>
      {caption && <p className="sx-inline-cross-asset__caption">{caption}</p>}
    </div>
  );
}
