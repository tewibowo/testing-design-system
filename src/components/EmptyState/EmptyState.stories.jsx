import React from "react";
import { EmptyState } from "./EmptyState.jsx";

export default {
  title: "Components/Empty State",
  component: EmptyState,
  parameters: { layout: "padded" },
  args: {
    title: "No Transaction Found",
    sub: "You don't have any transactions yet.",
  },
};

export const Default = {};
export const Compact = { args: { compact: true } };
export const TransferGated = {
  args: {
    title: "Verify your account and complete the assessment to transact.",
    sub: "You won't be able to initiate any transactions until verification is completed.",
  },
};
