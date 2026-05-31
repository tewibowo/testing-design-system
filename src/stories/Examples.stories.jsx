import React from "react";
import { PersonalAccount } from "../examples/PersonalAccount.jsx";
import { BusinessDashboard } from "../examples/BusinessDashboard.jsx";
import { TransactionHistory } from "../examples/TransactionHistory.jsx";
import { Settings } from "../examples/Settings.jsx";
import { MintFlow } from "../examples/MintFlow.jsx";
import { SignIn } from "../examples/SignIn.jsx";
import { MarketingHero } from "../examples/MarketingHero.jsx";

export default {
  title: "Examples",
  parameters: { layout: "fullscreen", chromatic: { viewports: [1440] } },
};

export const PersonalAccountDashboard = { render: () => <PersonalAccount /> };
export const BusinessDashboardScreen = { render: () => <BusinessDashboard /> };
export const TransactionHistoryScreen = { render: () => <TransactionHistory /> };
export const SettingsScreen = { render: () => <Settings /> };
export const MintFlowScreen = { render: () => <MintFlow /> };
export const SignInScreen = { render: () => <SignIn /> };
export const MarketingHeroScreen = {
  parameters: { backgrounds: { default: "ivy" }, chromatic: { viewports: [1440] } },
  render: () => <MarketingHero />,
};
