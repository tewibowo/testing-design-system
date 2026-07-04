import React from "react";
import { BusinessDashboard } from "../examples/BusinessDashboard.jsx";
import { TransactionHistory } from "../examples/TransactionHistory.jsx";
import { SignIn } from "../examples/SignIn.jsx";
import { MarketingHero } from "../examples/MarketingHero.jsx";

export default {
  title: "Examples",
  parameters: { layout: "fullscreen", chromatic: { viewports: [1440] } },
};

export const BusinessDashboardScreen = { render: () => <BusinessDashboard /> };
export const TransactionHistoryScreen = { render: () => <TransactionHistory /> };
export const SignInScreen = { render: () => <SignIn /> };
export const MarketingHeroScreen = {
  parameters: { backgrounds: { default: "ivy" }, chromatic: { viewports: [1440] } },
  render: () => <MarketingHero />,
};
