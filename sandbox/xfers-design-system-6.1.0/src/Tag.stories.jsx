import React from "react";
import { Tag } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/Tag",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

export const AllTypes = {
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
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Tag type="positive" variant="outlined">Outlined</Tag>
      <Tag type="positive" variant="filled">Filled</Tag>
      <Tag type="positive" variant="removable">Removable</Tag>
    </div>
  ),
};
