import React from "react";
import { DropdownAsset } from "./DropdownAsset.jsx";

export default {
  title: "Components/DropdownAsset",
  component: DropdownAsset,
  parameters: { layout: "padded" },
  decorators: [(S) => <div style={{ maxWidth: 260 }}><S /></div>],
};

const mark = (label, bg) => (
  <span
    style={{
      width: 24, height: 24, borderRadius: 999, background: bg, color: "#fff",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      font: "var(--sx-label-small)",
    }}
  >
    {label}
  </span>
);

const assets = [
  { value: "xsgd", name: "XSGD", logo: mark("S", "var(--sx-brand-xsgd)") },
  { value: "xusd", name: "XUSD", logo: mark("U", "var(--sx-brand-xusd)") },
  { value: "usdc", name: "USDC", logo: mark("C", "var(--sx-status-information)") },
  { value: "usdt", name: "USDT", logo: mark("T", "var(--sx-status-positive)") },
];

export const Default = { args: { options: assets, value: "xsgd" } };

export const WithBalances = {
  args: {
    value: "xsgd",
    options: assets.map((a, i) => ({
      ...a,
      balance: ["1,250.00", "980.50", "12,300.00", "0.00"][i],
    })),
  },
};

export const WithSecondary = {
  args: {
    value: "usdc",
    options: [
      { value: "xsgd", name: "XSGD", secondary: "StraitsX Singapore Dollar", logo: mark("S", "var(--sx-brand-xsgd)") },
      { value: "usdc", name: "USDC", secondary: "USD Coin", logo: mark("C", "var(--sx-status-information)") },
    ],
  },
};

export const InitialsFallback = {
  args: { value: "xsgd", options: assets.map(({ logo, ...a }) => a) },
};
