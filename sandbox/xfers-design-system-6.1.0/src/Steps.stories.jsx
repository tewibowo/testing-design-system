import React from "react";
import { Steps } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/Steps",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

export const Default = { render: () => <Steps current={1} steps={["Details", "Verification", "Confirm", "Done"]} /> };
