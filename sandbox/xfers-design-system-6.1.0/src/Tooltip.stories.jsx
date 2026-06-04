import React from "react";
import { Tooltip, Button } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/Tooltip",
  decorators: [withDesignSystem],
  parameters: { layout: "centered" },
};

export const Default = {
  render: () => (
    <Tooltip content="Helpful hint about this action" placement="top">
      <Button type="secondary">Hover me</Button>
    </Tooltip>
  ),
};
