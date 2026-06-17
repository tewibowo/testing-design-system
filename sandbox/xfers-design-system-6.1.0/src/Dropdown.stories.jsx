import React from "react";
import { Dropdown, Button } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/Dropdown",
  decorators: [withDesignSystem],
  parameters: { layout: "centered" },
};

export const Default = {
  render: () => (
    <Dropdown menu={{ items: [
      { key: "1", label: "Profile" },
      { key: "2", label: "Settings" },
      { key: "3", label: "Sign out" },
    ] }}>
      <Button type="secondary">Open menu</Button>
    </Dropdown>
  ),
};
