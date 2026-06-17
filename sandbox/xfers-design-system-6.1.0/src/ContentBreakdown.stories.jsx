import React from "react";
import { ContentBreakdown } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/ContentBreakdown",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

export const Default = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <ContentBreakdown title="Order summary">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Total</span><span>S$ 100.00</span>
        </div>
      </ContentBreakdown>
    </div>
  ),
};
