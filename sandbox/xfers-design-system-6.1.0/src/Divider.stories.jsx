import React from "react";
import { Divider } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/Divider",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

export const Spacings = {
  render: () => (
    <div>
      {["xs", "sm", "md", "lg", "xl"].map((s) => (
        <div key={s}>
          <div>Above ({s})</div>
          <Divider spacing={s} />
          <div>Below</div>
        </div>
      ))}
    </div>
  ),
};
