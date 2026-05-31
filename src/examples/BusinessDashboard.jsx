import React, { useState } from "react";
import { Sidebar, DEFAULT_NAV_ITEMS } from "../components/Sidebar/Sidebar.jsx";
import { TopBar } from "../components/TopBar/TopBar.jsx";
import { EstimatedBalance } from "../components/EstimatedBalance/EstimatedBalance.jsx";
import { IconButton } from "../components/IconButton/IconButton.jsx";
import { AssetMark } from "../components/AssetMark/AssetMark.jsx";
import { CardSwap } from "../components/CardSwap/CardSwap.jsx";
import { OtcBanner } from "../components/OtcBanner/OtcBanner.jsx";
import { Alert } from "../components/Alert/Alert.jsx";
import { LinkButton } from "../components/LinkButton/LinkButton.jsx";
import "./BusinessDashboard.css";

const STABLECOIN_ASSETS = [
  {
    symbol: "XSGD",
    subtitle: "1:1 to SGD",
    balance: "1,123,456,789.00",
    fiat: "~2,032 SGD",
    networks: ["SOLANA", "AVALANCHE", "POLYGON", "ETHEREUM"],
    extra: "+3",
  },
  {
    symbol: "XUSD",
    subtitle: "1:1 to USD",
    balance: "1,123,456,789.00",
    fiat: "~2,032 SGD",
    networks: ["BINANCE", "ETHEREUM"],
  },
  {
    symbol: "USDC",
    balance: "1,123,456,789.00",
    fiat: "~2,032 SGD",
    networks: ["POLYGON", "ETHEREUM"],
  },
  {
    symbol: "USDT",
    balance: "1,123,456,789.00",
    fiat: "~2,032 SGD",
    networks: ["TRON", "BINANCE", "ETHEREUM"],
  },
];

const CASH_ASSETS = [
  {
    symbol: "SGD",
    subtitle: "Singapore Dollar",
    balance: "84,500.00",
    fiat: "~84,500 SGD",
    networks: [],
  },
  {
    symbol: "USD",
    subtitle: "US Dollar",
    balance: "12,300.00",
    fiat: "~16,612 SGD",
    networks: [],
  },
];

const TRANSACTIONS = [
  {
    icon: "arrow_outward",
    title: "Blockchain Transfer Out",
    sub: " to Coinhako",
    amount: "3,211 XSGD",
    status: "Completed",
    date: "28 Jul 2021, 14.01",
  },
  {
    icon: "add",
    title: "Bank Transfer In",
    amount: "3,211 XSGD",
    status: "Completed",
    date: "28 Jul 2021, 14.01",
  },
  {
    icon: "swap_vert",
    title: "Swap from",
    sub: " -100,000 XUSD",
    amount: "+1,294,45.83 USDC",
    status: "Completed",
    date: "28 Jul 2021, 14.01",
    positive: true,
  },
];

function ActionBtn({ icon, label, variant = "filled" }) {
  return (
    <div className="ex-bd__action">
      <IconButton icon={icon} variant={variant} label={label} />
      <span className="ex-bd__action-label">{label}</span>
    </div>
  );
}

function AssetRow({ asset }) {
  return (
    <li className="ex-bd__asset-row">
      <div className="ex-bd__asset-coin">
        <AssetMark asset={asset.symbol} size={40} />
        <div className="ex-bd__coin-text">
          <span className="ex-bd__coin-symbol">{asset.symbol}</span>
          {asset.subtitle && <span className="ex-bd__coin-sub">{asset.subtitle}</span>}
        </div>
      </div>

      <div className="ex-bd__asset-balance">
        <span className="ex-bd__balance-amount">{asset.balance}</span>
        {asset.fiat && <span className="ex-bd__balance-fiat">{asset.fiat}</span>}
      </div>

      <div className="ex-bd__asset-networks">
        {asset.networks.slice(0, 4).map((n) => (
          <AssetMark key={n} asset={n} size={20} className="ex-bd__network-mark" />
        ))}
        {asset.extra && <span className="ex-bd__network-extra">{asset.extra}</span>}
      </div>

      <div className="ex-bd__asset-actions">
        <IconButton variant="outline" size="sm" icon="add" label={`Add ${asset.symbol}`} />
        <IconButton variant="outline" size="sm" icon="arrow_outward" label={`Send ${asset.symbol}`} />
      </div>
    </li>
  );
}

export function BusinessDashboard() {
  const [active, setActive] = useState("home");
  const [assetTab, setAssetTab] = useState("stable");
  const [showBanner, setShowBanner] = useState(true);

  const assets = assetTab === "stable" ? STABLECOIN_ASSETS : CASH_ASSETS;

  return (
    <div className="ex-bd">
      <Sidebar
        account="business"
        company={{ name: "Acme Pte. Ltd.", type: "Company" }}
        items={DEFAULT_NAV_ITEMS}
        active={active}
        onSelect={setActive}
      />

      <main className="ex-bd__main">
        <div className="ex-bd__head">
          <TopBar unread={3} name="Sarah Chen" company="Acme Pte. Ltd." />
        </div>

        <div className="ex-bd__hero">
          <EstimatedBalance label="My Estimated Balance" amount="2,081.23" currency="SGD" />
          <div className="ex-bd__actions">
            <ActionBtn icon="add" label="Transfer In" variant="filled" />
            <ActionBtn icon="arrow_outward" label="Transfer Out" variant="filled" />
            <ActionBtn icon="receipt_long" label="Transaction History" variant="outline" />
          </div>
        </div>

        <div className="ex-bd__grid">
          <div className="ex-bd__col">
            {/* Asset card */}
            <section className="ex-bd__asset-card">
              <div className="ex-bd__asset-header">
                <div className="ex-bd__asset-title">
                  <span>My Assets</span>
                  <button type="button" className="ex-bd__icon-btn" aria-label="Refresh">
                    <span className="material-symbols-rounded">refresh</span>
                  </button>
                </div>
                <div className="ex-bd__tab-group">
                  <button
                    type="button"
                    className={`ex-bd__tab ${assetTab === "cash" ? "ex-bd__tab--active" : ""}`}
                    onClick={() => setAssetTab("cash")}
                  >
                    Cash Wallet
                  </button>
                  <button
                    type="button"
                    className={`ex-bd__tab ${assetTab === "stable" ? "ex-bd__tab--active" : ""}`}
                    onClick={() => setAssetTab("stable")}
                  >
                    Stablecoin Wallet
                  </button>
                </div>
              </div>

              {showBanner && assetTab === "stable" && (
                <Alert tone="positive" onDismiss={() => setShowBanner(false)}>
                  XSGD and XUSD are StraitsX-issued stablecoins regulated by MAS. They are backed 1:1
                  by SGD and USD respectively
                </Alert>
              )}

              <ul className="ex-bd__asset-list">
                {assets.map((a) => (
                  <AssetRow key={a.symbol} asset={a} />
                ))}
              </ul>
            </section>

            {/* Latest transactions */}
            <section className="ex-bd__txn-card">
              <div className="ex-bd__txn-header">
                <span className="ex-bd__txn-title">Latest Transactions</span>
                <button type="button" className="ex-bd__icon-btn" aria-label="Refresh">
                  <span className="material-symbols-rounded">refresh</span>
                </button>
              </div>

              <ul className="ex-bd__txn-list">
                {TRANSACTIONS.map((t, i) => (
                  <li key={i} className="ex-bd__txn-row">
                    <span className="ex-bd__txn-icon">
                      <span className="material-symbols-rounded">{t.icon}</span>
                    </span>
                    <div className="ex-bd__txn-info">
                      <span className="ex-bd__txn-desc">
                        <strong>{t.title}</strong>{t.sub}
                      </span>
                      <span className={["ex-bd__txn-amount", t.positive && "ex-bd__txn-amount--positive"].filter(Boolean).join(" ")}>
                        {t.amount}
                      </span>
                    </div>
                    <div className="ex-bd__txn-meta">
                      <span className="ex-bd__txn-status">{t.status}</span>
                      <span className="ex-bd__txn-date">{t.date}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="ex-bd__txn-footer">
                <LinkButton>View All</LinkButton>
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="ex-bd__col">
            <CardSwap
              from={{ amount: "20", currency: "XUSD", balance: "1,300 XUSD" }}
              to={{ amount: "25.46", currency: "XSGD", balance: "1,000 XSGD" }}
              rate="1 XSGD ≈ 0.7233 USDT"
            />
            <OtcBanner />
          </div>
        </div>

        <p className="ex-bd__footnote">
          XSGD, XUSD and XIDR are issued by StraitsX. "STRAITSX", "XSGD", "XIDR" and all other
          URLs, logos, and trademarks related to the StraitsX Services are either trademarks or
          registered trademarks of StraitsX or its licensors. StraitsX is the trading name of the
          StraitsX Group of Companies and its affiliated entities.{" "}
          <a href="#">Important Risk Warnings Regarding Digital Payment Tokens: Learn More</a>
        </p>
      </main>
    </div>
  );
}
