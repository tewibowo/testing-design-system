import React from "react";
import { DatePicker } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/DatePicker",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

export const Default = { render: () => <DatePicker label="Date of birth" placeholder="Select date" /> };
