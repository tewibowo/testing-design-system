import React from "react";
import { IconButton } from "./IconButton.jsx";

export default {
  title: "Components/IconButton",
  component: IconButton,
  parameters: { layout: "centered" },
  argTypes: {
    icon: { control: "text" },
    variant: { control: "inline-radio", options: ["ghost", "outline", "filled"] },
    shape: { control: "inline-radio", options: ["circle", "square"] },
    size: { control: "inline-radio", options: ["lg", "md", "sm"] },
    disabled: { control: "boolean" },
  },
  args: { icon: "notifications", label: "Notifications" },
};

export const Ghost = { args: { variant: "ghost" } };
export const Outline = { args: { variant: "outline" } };
export const Filled = { args: { variant: "filled" } };

export const AllSizes = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <IconButton icon="search" variant="outline" size="lg" label="Search lg" />
      <IconButton icon="search" variant="outline" size="md" label="Search md" />
      <IconButton icon="search" variant="outline" size="sm" label="Search sm" />
    </div>
  ),
};

export const Showcase = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <IconButton icon="close" variant="ghost" label="Close" />
      <IconButton icon="more_vert" variant="ghost" label="More" />
      <IconButton icon="notifications" variant="outline" label="Notifications" />
      <IconButton icon="settings" variant="outline" shape="square" label="Settings" />
      <IconButton icon="arrow_forward" variant="filled" label="Next" />
      <IconButton icon="check" variant="filled" shape="square" label="Confirm" />
    </div>
  ),
};
