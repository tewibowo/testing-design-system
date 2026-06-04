import React from "react";
import { Tag } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Tag",
  component: Tag,
  decorators: [withDesignSystem],
  parameters: { layout: "centered" },
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["positive", "critical", "warning", "info", "neutral", "disabled"],
    },
    variant: { control: "inline-radio", options: ["outlined", "filled", "removable"] },
    size: { control: "inline-radio", options: ["sm", "lg"] },
    showIcon: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    type: "positive",
    variant: "outlined",
    size: "lg",
    showIcon: true,
    children: "Active",
  },
};

export const Default = {};

export const AllTypes = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Tag type="positive">Positive</Tag>
      <Tag type="critical">Critical</Tag>
      <Tag type="warning">Warning</Tag>
      <Tag type="info">Info</Tag>
      <Tag type="neutral">Neutral</Tag>
    </div>
  ),
};

export const Variants = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Tag type="positive" variant="outlined">Outlined</Tag>
      <Tag type="positive" variant="filled">Filled</Tag>
      <Tag type="positive" variant="removable">Removable</Tag>
    </div>
  ),
};
