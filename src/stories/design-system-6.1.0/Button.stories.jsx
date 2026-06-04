import React from "react";
import { Button } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "Design System 6.1.0/Button",
  component: Button,
  decorators: [withDesignSystem],
  parameters: { layout: "centered" },
  argTypes: {
    type: { control: "inline-radio", options: ["primary", "secondary", "tertiary"] },
    isDisabled: { control: "boolean" },
    isFullWidth: { control: "boolean" },
    children: { control: "text" },
  },
  args: { children: "Continue", type: "primary", isDisabled: false, isFullWidth: false },
};

export const Primary = { args: { type: "primary" } };
export const Secondary = { args: { type: "secondary", children: "Cancel" } };
export const Tertiary = { args: { type: "tertiary", children: "Learn more" } };
export const Disabled = { args: { type: "primary", isDisabled: true } };

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
