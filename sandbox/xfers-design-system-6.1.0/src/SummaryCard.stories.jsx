import React from "react";
import { SummaryCard } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/SummaryCard",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

export const Default = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <SummaryCard label="Available balance" amount="S$ 12,345.67" />
      <SummaryCard type="dark" label="Pending" amount="S$ 234.00" isInverted />
    </div>
  ),
};
