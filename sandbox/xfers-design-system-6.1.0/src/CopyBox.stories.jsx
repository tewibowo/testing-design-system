import React from "react";
import { CopyBox } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/CopyBox",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

export const Default = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <CopyBox labelText="Wallet address" value="0xA1B2C3D4E5F6A7B8C9D0" allowCopy showCopyIcon />
    </div>
  ),
};
