import React from "react";
import { CardSwap } from "./CardSwap.jsx";

export default {
  title: "Components/Card/Swap",
  component: CardSwap,
  parameters: { layout: "centered" },
};

export const Default = {
  args: {
    from: { amount: "20", currency: "XUSD", balance: "1,300 XUSD", onMax: () => {} },
    to: { amount: "25.46", currency: "XSGD", balance: "1,000 XSGD" },
    rate: "1 XSGD ≈ 0.7233 USDT",
    onSwap: () => {},
    onReverse: () => {},
  },
};

export const BestRateSecured = {
  args: {
    from: { amount: "100", currency: "XUSD", balance: "1,300 XUSD", onMax: () => {} },
    to: { amount: "127.30", currency: "XSGD", balance: "1,000 XSGD" },
    rate: "1 XSGD ≈ 0.7233 USDT",
    highlight: "Best rates secured",
    onSwap: () => {},
    onReverse: () => {},
  },
};
