import React from "react";
import { Input } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "Design System 6.1.0/Input",
  component: Input,
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    required: { control: "boolean" },
    optional: { control: "boolean" },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Full name",
    placeholder: "Enter your name",
    helperText: "As shown on your ID.",
    required: true,
    error: false,
    disabled: false,
  },
};

export const Default = {};
export const Error = { args: { error: true, helperText: "This field is required." } };
export const Disabled = { args: { disabled: true } };

export const Variants = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 360 }}>
      <Input label="Default" placeholder="Type here" />
      <Input label="With helper" placeholder="Type here" helperText="Some guidance text." />
      <Input label="Error state" placeholder="Type here" error helperText="This field is required." />
      <Input.Password label="Password" placeholder="Enter password" />
      <Input.Search label="Search" placeholder="Search…" />
    </div>
  ),
};
