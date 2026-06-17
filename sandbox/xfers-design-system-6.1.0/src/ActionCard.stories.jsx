import React from "react";
import { ActionCard, Button } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/ActionCard",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

export const Default = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <ActionCard title="Verify your identity" footer={<Button type="primary">Start</Button>}>
        Complete KYC to unlock higher limits.
      </ActionCard>
    </div>
  ),
};
