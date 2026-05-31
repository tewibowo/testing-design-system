import React from "react";
import { OtcBanner } from "./OtcBanner.jsx";

export default {
  title: "Compositions/OTC Banner",
  component: OtcBanner,
  parameters: { layout: "padded" },
  decorators: [(S) => <div style={{ maxWidth: 420 }}><S /></div>],
};

export const Default = {};

export const CustomAmount = {
  args: { amount: "1,000,000 USD" },
};

export const CustomTitle = {
  args: {
    title: "Institutional Liquidity",
    ctaLabel: "Talk to sales",
  },
};
