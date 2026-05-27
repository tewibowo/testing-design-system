import React from "react";
import { Tag } from "./Tag.jsx";

export default {
  title: "Components/Tag",
  component: Tag,
  parameters: { layout: "centered" },
  argTypes: {
    tone: { control: "inline-radio", options: ["positive", "critical", "warning", "info", "neutral", "brand"] },
    shape: { control: "inline-radio", options: ["default", "pill"] },
    children: { control: "text" },
  },
  args: { tone: "positive", shape: "default", children: "Verified" },
};

export const Positive = { args: { tone: "positive", children: "Verified" } };
export const Critical = { args: { tone: "critical", children: "Failed" } };
export const Warning = { args: { tone: "warning", children: "Pending" } };
export const Info = { args: { tone: "info", children: "Information" } };
export const Neutral = { args: { tone: "neutral", children: "Not Verified" } };
export const Brand = { args: { tone: "brand", children: "New", shape: "pill" } };

export const AllTones = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Tag tone="positive">Verified</Tag>
      <Tag tone="critical">Failed</Tag>
      <Tag tone="warning">Pending</Tag>
      <Tag tone="info">Information</Tag>
      <Tag tone="neutral">Not Verified</Tag>
      <Tag tone="brand" shape="pill">New</Tag>
    </div>
  ),
};

export const PillFilters = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Tag tone="positive" shape="pill">● Active</Tag>
      <Tag tone="warning" shape="pill">● Pending review</Tag>
      <Tag tone="neutral" shape="pill">● Draft</Tag>
    </div>
  ),
};
