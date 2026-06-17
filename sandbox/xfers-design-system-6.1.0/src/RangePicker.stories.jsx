import React from "react";
import { RangePicker } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/RangePicker",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

export const Default = { render: () => <RangePicker /> };
