import React from "react";
import { Timer, P1 } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/Timer",
  decorators: [withDesignSystem],
  parameters: { layout: "centered" },
};

export const Default = {
  render: () => (
    <Timer initialSeconds={90} blinkActivationSeconds={10}>
      {(isBlink, remaining) => {
        const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
        const ss = String(remaining % 60).padStart(2, "0");
        return <P1 style={{ color: isBlink ? "#E22726" : undefined }}>{mm + ":" + ss}</P1>;
      }}
    </Timer>
  ),
};
