import React from "react";
import { BadgeIcon, Bell } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/BadgeIcon",
  decorators: [withDesignSystem],
  parameters: { layout: "centered" },
};

export const Types = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      {["default", "primary", "success", "warning", "error"].map((t) => (
        <BadgeIcon key={t} type={t} icon={<Bell />} />
      ))}
    </div>
  ),
};
