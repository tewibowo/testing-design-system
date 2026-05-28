import React from "react";
import { LinkButton } from "./LinkButton.jsx";

export default {
  title: "Components/LinkButton",
  component: LinkButton,
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "inline-radio", options: ["lg", "md", "sm"] },
    onDark: { control: "boolean" },
    leadingIcon: { control: "text" },
    trailingIcon: { control: "text" },
    children: { control: "text" },
  },
  args: { children: "Learn more", trailingIcon: "arrow_forward" },
};

export const Default = {};
export const WithLeadingIcon = { args: { leadingIcon: "download", trailingIcon: undefined, children: "Download statement" } };
export const OnDarkSurface = {
  args: { onDark: true, children: "Request Quote" },
  decorators: [(S) => <div style={{ background: "#054948", padding: 24, borderRadius: 12 }}><S /></div>],
};
export const AllSizes = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <LinkButton size="lg" trailingIcon="arrow_forward">Large</LinkButton>
      <LinkButton size="md" trailingIcon="arrow_forward">Medium</LinkButton>
      <LinkButton size="sm" trailingIcon="arrow_forward">Small</LinkButton>
    </div>
  ),
};
