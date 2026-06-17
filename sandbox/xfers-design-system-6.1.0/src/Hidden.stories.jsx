import React from "react";
import { Hidden, Banner, P1 } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/Hidden",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

export const Default = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Hidden only="sm"><Banner type="primary">Visible on large screens (hidden on sm)</Banner></Hidden>
      <Hidden only="lg"><Banner type="success">Visible on small screens (hidden on lg)</Banner></Hidden>
      <P1>Resize the viewport to see each block toggle.</P1>
    </div>
  ),
};
