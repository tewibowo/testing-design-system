import React from "react";
import { Coachmark } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/Coachmark",
  decorators: [withDesignSystem],
  parameters: { layout: "centered" },
};

export const Default = {
  render: () => (
    <Coachmark
      index={0}
      size={3}
      step={{ title: "New feature", content: "This panel shows your latest activity." }}
      tooltipProps={{ role: "tooltip" }}
      skipProps={{ role: "button", onClick: () => {} }}
      primaryProps={{ role: "button", onClick: () => {} }}
      backProps={{ role: "button", onClick: () => {} }}
    />
  ),
};
