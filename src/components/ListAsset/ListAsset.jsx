import React from "react";
import "./ListAsset.css";
import { ListSupportedNetwork } from "../ListSupportedNetwork/ListSupportedNetwork.jsx";

/**
 * Asset list row for fiat & stablecoin balances. Figma: List / Asset (5554:8405).
 *
 * Layout: leading coin/flag icon, symbol + subtitle, a trailing balance block,
 * optional supported-network avatars (stablecoin) and trailing action buttons.
 *
 * `icon` is any ReactNode (round 40px coin/flag) — pass initials as fallback.
 * Do NOT pass remote Figma asset URLs — supply rendered icon nodes.
 *
 *   platform: "desktop" | "mobile"
 *   variant:  "stablecoin" | "fiat"
 */
export function ListAsset({
  symbol = "XSGD",
  subtitle = "1:1 to SGD",
  balance = "0.00",
  balanceSub,
  icon,
  variant = "stablecoin",
  platform = "desktop",
  networks,
  networkOverflow = 0,
  networkIsNew = false,
  actions,
  onAdd,
  onSend,
  showAction = true,
  className = "",
  ...rest
}) {
  const isMobile = platform === "mobile";
  const cls = [
    "sx-list-asset",
    `sx-list-asset--${platform}`,
    `sx-list-asset--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const hasNetworks =
    variant === "stablecoin" &&
    ((networks && networks.length > 0) || networkOverflow > 0 || networkIsNew);

  return (
    <div className={cls} {...rest}>
      <div className="sx-list-asset__lead">
        {icon != null && <span className="sx-list-asset__icon">{icon}</span>}
        <div className="sx-list-asset__currency">
          <span className="sx-list-asset__symbol">{symbol}</span>
          {subtitle && <span className="sx-list-asset__subtitle">{subtitle}</span>}
        </div>
      </div>

      <div className="sx-list-asset__balance">
        <span className="sx-list-asset__balance-value numeric">{balance}</span>
        {balanceSub && (
          <span className="sx-list-asset__balance-sub">{balanceSub}</span>
        )}
      </div>

      {hasNetworks && (
        <ListSupportedNetwork
          className="sx-list-asset__networks"
          networks={networks || []}
          overflow={networkOverflow}
          isNew={networkIsNew}
        />
      )}

      {showAction && !isMobile && (
        <div className="sx-list-asset__actions">
          {actions != null ? (
            actions
          ) : (
            <>
              <button
                type="button"
                className="sx-list-asset__icon-btn"
                aria-label="Add"
                onClick={onAdd}
              >
                <span className="material-symbols-rounded">add</span>
              </button>
              <button
                type="button"
                className="sx-list-asset__icon-btn"
                aria-label="Send"
                onClick={onSend}
              >
                <span className="material-symbols-rounded">arrow_outward</span>
              </button>
            </>
          )}
        </div>
      )}

      {isMobile && (
        <span className="sx-list-asset__chevron material-symbols-rounded" aria-hidden="true">
          arrow_forward_ios
        </span>
      )}
    </div>
  );
}
