import React from "react";
import {
  BLUE_COLORS,
  GREEN_COLORS,
  RED_COLORS,
  YELLOW_COLORS,
  NEUTRAL_COLORS,
  MAIN_COLORS,
  ICON_COLORS,
  TEXT_COLORS,
  BACKGROUND_COLORS,
} from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Theme/Colors",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

const Swatches = ({ title, colors }) => (
  <div style={{ marginBottom: 24 }}>
    <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{title}</h3>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      {Object.entries(colors).map(([k, v]) => (
        <div key={k} style={{ width: 120 }}>
          <div style={{ height: 56, borderRadius: 8, background: v, border: "1px solid #E8E8E8" }} />
          <div style={{ fontSize: 12, marginTop: 4 }}>{k}</div>
          <div style={{ fontSize: 11, color: "#959595" }}>{String(v)}</div>
        </div>
      ))}
    </div>
  </div>
);

export const Palette = {
  render: () => (
    <div>
      <Swatches title="Blue" colors={BLUE_COLORS} />
      <Swatches title="Green" colors={GREEN_COLORS} />
      <Swatches title="Red" colors={RED_COLORS} />
      <Swatches title="Yellow" colors={YELLOW_COLORS} />
      <Swatches title="Neutral" colors={NEUTRAL_COLORS} />
      <Swatches title="Main" colors={MAIN_COLORS} />
      <Swatches title="Icon" colors={ICON_COLORS} />
      <Swatches title="Text" colors={TEXT_COLORS} />
      <Swatches title="Background" colors={BACKGROUND_COLORS} />
    </div>
  ),
};
