import React from "react";
import { Logomark } from "./Logomark.jsx";

export default {
  title: "Brand/Logomark",
  component: Logomark,
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: { type: "range", min: 16, max: 240, step: 4 } },
    fill: { control: { type: "color" } },
  },
};

export const Default = { args: { size: 96, fill: "#00D37E" } };
export const OnDarkSurface = {
  args: { size: 96, fill: "#00D37E" },
  decorators: [
    (Story) => (
      <div
        style={{
          background: "#002B2A",
          padding: 48,
          borderRadius: 12,
          display: "inline-block",
        }}
      >
        <Story />
      </div>
    ),
  ],
};
export const Monochrome = { args: { size: 96, fill: "#002B2A" } };
