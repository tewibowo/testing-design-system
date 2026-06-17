import React from "react";
import { Select } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/Select",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

export const Default = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Select label="Country" placeholder="Select a country" options={[
        { value: "sg", label: "Singapore" },
        { value: "id", label: "Indonesia" },
        { value: "my", label: "Malaysia" },
      ]} />
    </div>
  ),
};
export const Multiple = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Select mode="multiple" label="Assets" placeholder="Select assets" options={[
        { value: "xsgd", label: "XSGD" },
        { value: "usdc", label: "USDC" },
        { value: "usdt", label: "USDT" },
      ]} />
    </div>
  ),
};
