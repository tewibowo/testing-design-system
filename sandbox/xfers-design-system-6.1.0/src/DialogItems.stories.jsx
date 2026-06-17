import React from "react";
import { DialogItems } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/DialogItems",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

export const Default = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <DialogItems items={[
        { label: "Amount", value: "S$ 100.00" },
        { label: "Fee", value: "S$ 0.50" },
        { label: "Reference", value: "INV-00123", variant: "large" },
      ]} />
    </div>
  ),
};
