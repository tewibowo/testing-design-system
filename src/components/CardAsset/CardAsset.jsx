import React from "react";
import { Icon } from "../Icon/Icon.jsx";
import { IconButton } from "../IconButton/IconButton.jsx";
import "./CardAsset.css";

/**
 * Card / Asset — a wallet panel listing held assets (stablecoins / coins).
 * Figma: Card / Asset (5515:9785).
 *
 * Each row shows: coin logo + symbol/subtitle, balance + fiat approximation,
 * the networks the asset is available on, and add / send action buttons.
 *
 * Coin logos are passed as ReactNode via each asset's `logo` prop. When absent
 * a placeholder circle with the symbol's initials is rendered. Network marks
 * are likewise `logo` ReactNodes (or initials).
 *
 *   <CardAsset
 *     title="My Assets"
 *     assets={[
 *       { symbol: "XSGD", subtitle: "1:1 to SGD", balance: "1,123,456.00",
 *         fiat: "~2,032 SGD", networks: [{ name: "Ethereum" }, { name: "Polygon" }] },
 *     ]}
 *   />
 */
export function CardAsset({
  title = "My Assets",
  assets = [],
  banner,
  onRefresh,
  onAdd,
  onSend,
  className = "",
  ...rest
}) {
  const cls = ["sx-card-asset", className].filter(Boolean).join(" ");
  return (
    <section className={cls} {...rest}>
      <header className="sx-card-asset__header">
        <div className="sx-card-asset__title">
          <span>{title}</span>
          {onRefresh && (
            <button type="button" className="sx-card-asset__refresh" onClick={onRefresh} aria-label="Refresh">
              <Icon name="refresh" size={20} />
            </button>
          )}
        </div>
      </header>

      {banner && (
        <div className="sx-card-asset__banner" role="status">
          <Icon name="info" size={24} className="sx-card-asset__banner-icon" />
          <p className="sx-card-asset__banner-text">{banner}</p>
        </div>
      )}

      <ul className="sx-card-asset__list">
        {assets.map((a, i) => (
          <li key={a.symbol || i} className="sx-card-asset__row">
            <div className="sx-card-asset__coin">
              <Coin logo={a.logo} symbol={a.symbol} />
              <div className="sx-card-asset__currency">
                <span className="sx-card-asset__symbol">{a.symbol}</span>
                {a.subtitle && <span className="sx-card-asset__subtitle">{a.subtitle}</span>}
              </div>
            </div>

            <div className="sx-card-asset__balance">
              <span className="sx-card-asset__amount num">{a.balance}</span>
              {a.fiat && <span className="sx-card-asset__fiat">{a.fiat}</span>}
            </div>

            {a.networks && a.networks.length > 0 && (
              <div className="sx-card-asset__networks">
                {a.networks.slice(0, 4).map((n, j) => (
                  <Network key={n.name || j} logo={n.logo} name={n.name} />
                ))}
                {a.networks.length > 4 && (
                  <span className="sx-card-asset__networks-more">+{a.networks.length - 4}</span>
                )}
              </div>
            )}

            <div className="sx-card-asset__actions">
              <IconButton variant="outline" size="sm" icon="add" label="Add" onClick={onAdd ? () => onAdd(a) : undefined} />
              <IconButton variant="outline" size="sm" icon="arrow_outward" label="Send" onClick={onSend ? () => onSend(a) : undefined} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Coin({ logo, symbol }) {
  if (logo) return <span className="sx-card-asset__coin-logo">{logo}</span>;
  return (
    <span className="sx-card-asset__coin-logo sx-card-asset__coin-logo--placeholder" aria-hidden="true">
      {(symbol || "?").slice(0, 2)}
    </span>
  );
}

function Network({ logo, name }) {
  return (
    <span className="sx-card-asset__network" title={name}>
      {logo || <span className="sx-card-asset__network-initial" aria-hidden="true">{(name || "?").charAt(0)}</span>}
    </span>
  );
}
