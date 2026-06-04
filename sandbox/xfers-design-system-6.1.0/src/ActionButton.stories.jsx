import React from "react";
import { ActionButton, Add } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/ActionButton",
  decorators: [withDesignSystem],
  parameters: { layout: "centered" },
};

export const Default = { render: () => <ActionButton icon={<Add />} /> };
export const Disabled = { render: () => <ActionButton icon={<Add />} disabled /> };
