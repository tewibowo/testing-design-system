import React from "react";
import { Banner } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/Banner",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

export const Types = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {["primary", "success", "warning", "error", "notification"].map((t) => (
        <Banner key={t} type={t} withIcon>{t} banner message</Banner>
      ))}
    </div>
  ),
};
