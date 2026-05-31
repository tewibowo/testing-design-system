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
};

/**
 * Circular brand mark for a coin / fiat / network.
 * Pass a known `asset` code for an automatic branded mark, or override with
 * `label` + `color`. For a real vendor SVG logo, pass it as `children`.
 *
 *   <AssetMark asset="XSGD" />
 *   <AssetMark asset="USDC" size={24} />
 *   <AssetMark label="DBS" color="var(--sx-brand-secure-teal)" />
 *   <AssetMark><img src={dbsLogo} alt="" /></AssetMark>
 */
export function AssetMark({ asset, label, color, size = 40, className = "", children }) {
  const def = asset ? ASSETS[asset.toUpperCase()] : undefined;
  const glyph = label ?? def?.glyph ?? (asset ? asset.slice(0, 2).toUpperCase() : "?");
  const bg = color ?? (def?.var ? `var(${def.var})` : def?.color) ?? "var(--sx-surface-secondary)";
  const hasBrand = !!(color || def);
  const style = {
    width: size,
    height: size,
    background: bg,
    color: hasBrand ? "var(--sx-text-inverse)" : "var(--sx-text-secondary)",
    fontSize: Math.round(size * 0.4),
  };
  return (
    <span className={"sx-asset-mark " + className} style={style} aria-label={asset || label} role="img">
      {children ?? glyph}
    </span>
  );
}
