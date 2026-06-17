import React from "react";
import { Spin } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/Spin",
  decorators: [withDesignSystem],
  parameters: { layout: "centered" },
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
      <Spin size="small" /><Spin size="default" /><Spin size="large" />
    </div>
  ),
};
