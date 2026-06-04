import React from "react";
import { Alert } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/Alert",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

export const AllTypes = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Alert type="success" title="Success" message="Your changes were saved." showIcon />
      <Alert type="info" title="Information" message="Here is some helpful context." showIcon />
      <Alert type="warning" title="Warning" message="Please double-check your details." showIcon />
      <Alert type="error" title="Error" message="Something went wrong." showIcon />
    </div>
  ),
};
