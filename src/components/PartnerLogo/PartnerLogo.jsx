import React from "react";

/**
 * Partner logo registry. Add a partner by extending `LOGOS` with an SVG
 * component (paint with `currentColor` so the `color` prop tints it).
 *
 *   <PartnerLogo name="standard-chartered" />
 *   <PartnerLogo name="ethereum" size={48} />
 *
 * For unknown names, falls back to a monochrome wordmark pill so layouts
 * don't break while you wait for licensed assets.
 *
 * To add a real logo:
 *   1. Drop the SVG file in `src/assets/partners/<slug>.svg`
 *   2. Add an entry to LOGOS:
 *      "standard-chartered": ({ size }) => (
 *        <img src={new URL("../../assets/partners/standard-chartered.svg", import.meta.url)} height={size} alt="" />
 *      )
 */
const LOGOS = {
  // Placeholder — replace each with the actual licensed SVG.
};

const KNOWN_BANKS = ["cimb", "standard-chartered", "hana-bank", "permata", "bca", "bsi", "bss", "cimb-niaga"];
const KNOWN_CHAINS = ["ethereum", "arbitrum", "polygon", "metamask"];
const KNOWN_PARTNERS = ["coinstore", "qcp-capital", "dextf", "bsi"];

function prettify(slug) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function PartnerLogo({ name, size = 32, monochrome = true, className = "", style }) {
  const Custom = LOGOS[name];
  if (Custom) return <Custom size={size} monochrome={monochrome} />;

  // Fallback monochrome wordmark pill
  const bg = monochrome ? "transparent" : "var(--sx-bg-subtle)";
  const fg = monochrome ? "var(--sx-fg-1)" : "var(--sx-deep-ivy)";
  return (
    <span
      className={"sx-partner-logo " + className}
      title={prettify(name)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: size,
        padding: `0 ${Math.max(8, size / 3)}px`,
        background: bg,
        border: `1px solid var(--sx-line)`,
        borderRadius: 4,
        font: `700 ${Math.max(10, size / 2.7)}px/1 var(--sx-font-display)`,
        color: fg,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {prettify(name)}
    </span>
  );
}

PartnerLogo.banks = KNOWN_BANKS;
PartnerLogo.chains = KNOWN_CHAINS;
PartnerLogo.partners = KNOWN_PARTNERS;
