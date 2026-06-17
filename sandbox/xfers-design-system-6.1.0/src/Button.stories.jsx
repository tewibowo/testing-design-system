import React from "react";
import { Button } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/Button",
  decorators: [withDesignSystem],
  parameters: { layout: "centered" },
};

export const Primary = { render: () => <Button type="primary">Continue</Button> };
export const Secondary = { render: () => <Button type="secondary">Cancel</Button> };
export const Tertiary = { render: () => <Button type="tertiary">Learn more</Button> };
export const Disabled = { render: () => <Button type="primary" isDisabled>Submit</Button> };
export const AllTypes = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <Button type="primary">Primary</Button>
      <Button type="secondary">Secondary</Button>
      <Button type="tertiary">Tertiary</Button>
      <Button type="primary" isDisabled>Disabled</Button>
    </div>
  ),
};
