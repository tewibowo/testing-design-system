import React from "react";
import { Alert } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Alert",
  component: Alert,
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
  argTypes: {
    type: { control: "inline-radio", options: ["success", "info", "warning", "error"] },
    title: { control: "text" },
    message: { control: "text" },
    showIcon: { control: "boolean" },
    closable: { control: "boolean" },
  },
  args: {
    type: "info",
    title: "Heads up",
    message: "This is an informational alert from the design system.",
    showIcon: true,
    closable: false,
  },
};

export const Info = {};
export const Success = { args: { type: "success", title: "Success", message: "Your changes were saved." } };
export const Warning = { args: { type: "warning", title: "Warning", message: "Please double-check your details." } };
export const Error = { args: { type: "error", title: "Error", message: "Something went wrong." } };

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
