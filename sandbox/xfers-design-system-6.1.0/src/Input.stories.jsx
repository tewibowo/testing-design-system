import React from "react";
import { Input } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/Input",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

export const Variants = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 360 }}>
      <Input label="Default" placeholder="Type here" />
      <Input label="With helper" placeholder="Type here" helperText="Some guidance text." />
      <Input label="Error state" placeholder="Type here" error helperText="This field is required." />
      <Input.Password label="Password" placeholder="Enter password" />
      <Input.Search label="Search" placeholder="Search..." />
    </div>
  ),
};
