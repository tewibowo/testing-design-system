import React, { useState } from "react";
import { Tag } from "./Tag.jsx";

export default {
  title: "Components/Tag",
  component: Tag,
  parameters: { layout: "centered" },
  argTypes: {
    tone: { control: "inline-radio", options: ["positive", "critical", "warning", "info", "neutral", "brand"] },
    shape: { control: "inline-radio", options: ["default", "pill"] },
    size: { control: "inline-radio", options: ["large", "small"] },
    appearance: { control: "inline-radio", options: ["outlined", "filled"] },
    removable: { control: "boolean" },
    clickable: { control: "boolean" },
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: { tone: "positive", shape: "default", size: "large", appearance: "outlined", children: "Verified" },
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

/* ── New Figma variants ── */

export const Outlined = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Tag appearance="outlined" tone="positive">Verified</Tag>
      <Tag appearance="outlined" tone="critical">Failed</Tag>
      <Tag appearance="outlined" tone="warning">Pending</Tag>
      <Tag appearance="outlined" tone="info">Information</Tag>
      <Tag appearance="outlined" tone="neutral">Draft</Tag>
      <Tag appearance="outlined" tone="brand">New</Tag>
    </div>
  ),
};

export const Filled = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Tag appearance="filled" tone="positive">Verified</Tag>
      <Tag appearance="filled" tone="critical">Failed</Tag>
      <Tag appearance="filled" tone="warning">Pending</Tag>
      <Tag appearance="filled" tone="info">Information</Tag>
      <Tag appearance="filled" tone="neutral">Draft</Tag>
      <Tag appearance="filled" tone="brand">New</Tag>
    </div>
  ),
};

export const Sizes = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
      <Tag size="large" tone="info">Large</Tag>
      <Tag size="small" tone="info">Small</Tag>
      <Tag size="large" appearance="filled" tone="positive">Large filled</Tag>
      <Tag size="small" appearance="filled" tone="positive">Small filled</Tag>
    </div>
  ),
};

export const Removable = {
  parameters: { layout: "padded" },
  render: () => {
    const [tags, setTags] = useState(["Singapore", "Indonesia", "Vietnam"]);
    return (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        {tags.map((t) => (
          <Tag key={t} tone="neutral" shape="pill" removable onRemove={() => setTags((prev) => prev.filter((x) => x !== t))}>
            {t}
          </Tag>
        ))}
        <Tag tone="neutral" shape="pill" removable disabled>Locked</Tag>
        {tags.length === 0 && <span style={{ color: "var(--sx-text-secondary)" }}>All removed</span>}
      </div>
    );
  },
};

export const Clickable = {
  parameters: { layout: "padded" },
  render: () => {
    const opts = ["All", "Deposits", "Withdrawals", "Swaps"];
    const [active, setActive] = useState("All");
    return (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        {opts.map((o) => (
          <Tag
            key={o}
            tone="brand"
            shape="pill"
            clickable
            selected={active === o}
            onClick={() => setActive(o)}
          >
            {o}
          </Tag>
        ))}
        <Tag tone="brand" shape="pill" clickable disabled>Disabled</Tag>
      </div>
    );
  },
};

export const ClickableSelectedStates = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
      <Tag tone="info" shape="pill" clickable>Enabled</Tag>
      <Tag tone="info" shape="pill" clickable selected>Selected</Tag>
      <Tag tone="info" shape="pill" clickable disabled>Disabled</Tag>
    </div>
  ),
};
