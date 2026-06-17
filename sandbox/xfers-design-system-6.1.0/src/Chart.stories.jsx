import React from "react";
import { Chart } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/Chart",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

export const Default = {
  render: () => (
    <Chart
      xValues={["Jan", "Feb", "Mar", "Apr", "May"]}
      yValues={[12, 19, 8, 22, 17]}
      dataPrefix="S$"
      straitsXStyle
      height={240}
    />
  ),
};
