import React from "react";
import { Card } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/Card",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

export const Default = {
  render: () => (
    <Card title="Account balance" style={{ maxWidth: 360 }}>
      <div>S$ 1,234.56</div>
    </Card>
  ),
};
export const Dark = {
  render: () => (
    <Card type="dark" title="Dark card" style={{ maxWidth: 360 }}>
      <div>Inverted surface</div>
    </Card>
  ),
};
