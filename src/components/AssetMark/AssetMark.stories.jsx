import React from "react";
import { AssetMark } from "./AssetMark.jsx";

export default {
  title: "Atoms/Asset Mark",
  component: AssetMark,
  parameters: { layout: "padded" },
};

const row = { display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" };

export const Stablecoins = {
  render: () => (
    <div style={row}>
      {["XSGD", "XIDR", "XUSD", "USDC", "USDT"].map((a) => <AssetMark key={a} asset={a} />)}
    </div>
  ),
};

export const Networks = {
  render: () => (
    <div style={row}>
      {["ETH", "POLYGON", "ARBITRUM", "BASE", "SOLANA", "TRON"].map((a) => <AssetMark key={a} asset={a} />)}
    </div>
  ),
};

export const MoreCoinsAndWallets = {
  render: () => (
    <div style={row}>
      {["BNB", "XRP", "HBAR", "AVAX", "MATIC", "METAMASK", "WALLETCONNECT"].map((a) => (
        <AssetMark key={a} asset={a} />
      ))}
    </div>
  ),
};

export const WhiteTone = {
  render: () => (
    <div
      style={{
        ...row,
        background: "var(--sx-text-primary)",
        color: "var(--sx-text-inverse)",
        padding: 16,
        borderRadius: 12,
      }}
    >
      {["XSGD", "ETH", "BNB", "AVAX", "METAMASK"].map((a) => (
        <AssetMark key={a} asset={a} tone="white" />
      ))}
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div style={row}>
      {[16, 24, 32, 40, 56].map((s) => <AssetMark key={s} asset="XSGD" size={s} />)}
    </div>
  ),
};

export const CustomAndFallback = {
  render: () => (
    <div style={row}>
      <AssetMark label="DBS" color="var(--sx-brand-secure-teal)" />
      <AssetMark label="UOB" color="var(--sx-brand-credible-blue)" />
      <AssetMark asset="UNKNOWN" />
    </div>
  ),
};
