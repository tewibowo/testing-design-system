import React from "react";
import "./AssetMark.css";

/* Brand constants for third-party assets/networks (official brand colors —
 * these are brand identities, not themeable design tokens). StraitsX
 * stablecoins resolve to the design-system brand tokens. */
const ASSETS = {
  XSGD: { glyph: "S$", var: "--sx-brand-xsgd" },
  XIDR: { glyph: "Rp", var: "--sx-brand-xidr" },
  XUSD: { glyph: "$",  var: "--sx-brand-xusd" },
  SGD:  { glyph: "S$", var: "--sx-brand-xsgd" },
  IDR:  { glyph: "Rp", var: "--sx-brand-xidr" },
  USD:  { glyph: "$",  var: "--sx-brand-xusd" },
  USDC: { glyph: "C",  color: "#2775CA" },
  USDT: { glyph: "T",  color: "#26A17B" },
  ETH:  { glyph: "Ξ",  color: "#627EEA" },
  ETHEREUM: { glyph: "Ξ", color: "#627EEA" },
  POLYGON: { glyph: "P", color: "#6C00F6" },
  ARBITRUM: { glyph: "A", color: "#28A0F0" },
  BASE: { glyph: "B", color: "#0052FF" },
  SOLANA: { glyph: "◎", color: "#14F195" },
  TRON: { glyph: "T", color: "#EB0029" },
  BNB: { glyph: "B", color: "#F3BA2F" },
  BINANCE: { glyph: "B", color: "#F3BA2F" },
  XRP: { glyph: "✕", color: "#23292F" },
  RIPPLE: { glyph: "✕", color: "#23292F" },
  HBAR: { glyph: "ℏ", color: "#222222" },
  HEDERA: { glyph: "ℏ", color: "#222222" },
  AVAX: { glyph: "A", color: "#E84142" },
  AVALANCHE: { glyph: "A", color: "#E84142" },
  MATIC: { glyph: "M", color: "#6C00F6" },
  METAMASK: { glyph: "M", color: "#E2761B" },
  WALLETCONNECT: { glyph: "W", color: "#3B99FC" },
};

/**
 * Circular brand mark for a coin / fiat / network.
 * Pass a known `asset` code for an automatic branded mark, or override with
 * `label` + `color`. For a real vendor SVG logo, pass it as `children`.
 *
 *   <AssetMark asset="XSGD" />
 *   <AssetMark asset="USDC" size={24} />
 *   <AssetMark label="DBS" color="var(--sx-brand-secure-teal)" />
 *   <AssetMark asset="ETH" tone="white" />   // mono mark for on-dark surfaces
 *   <AssetMark><img src={dbsLogo} alt="" /></AssetMark>
 *
 * `tone="white"` renders a transparent-background, currentColor mark — ideal on
 * dark surfaces; inherits the parent text color so brand colors are dropped.
 */
export function AssetMark({ asset, label, color, size = 40, tone = "brand", className = "", children }) {
  const def = asset ? ASSETS[asset.toUpperCase()] : undefined;
  const glyph = label ?? def?.glyph ?? (asset ? asset.slice(0, 2).toUpperCase() : "?");
  const isWhite = tone === "white";
  const bg = color ?? (def?.var ? `var(${def.var})` : def?.color) ?? "var(--sx-surface-secondary)";
  const hasBrand = !!(color || def);
  const style = {
    width: size,
    height: size,
    background: isWhite ? "transparent" : bg,
    color: isWhite
      ? "currentColor"
      : hasBrand
        ? "var(--sx-text-inverse)"
        : "var(--sx-text-secondary)",
    fontSize: Math.round(size * 0.4),
  };
  const cls = "sx-asset-mark" + (isWhite ? " sx-asset-mark--white" : "") + (className ? " " + className : "");
  return (
    <span className={cls} style={style} aria-label={asset || label} role="img">
      {children ?? glyph}
    </span>
  );
}
