import React from "react";
import * as DS from "@xfers/design-system";
import { LOGO_NAMES } from "./_galleryData.js";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Logos/Gallery",
  decorators: [withDesignSystem],
  parameters: { layout: "fullscreen" },
};

const tile = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
  padding: 12,
  border: "1px solid #E8E8E8",
  borderRadius: 8,
  minHeight: 104,
};
const logoBox = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 96,
  height: 40,
  overflow: "hidden",
};
const label = { fontSize: 10, color: "#505454", textAlign: "center", wordBreak: "break-word" };

export const AllLogos = {
  render: () => (
    <div style={{ padding: 16 }}>
      <p style={{ fontSize: 13, color: "#505454", marginBottom: 16 }}>
        {LOGO_NAMES.length} logos exported by @xfers/design-system@6.1.0
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8 }}>
        {LOGO_NAMES.map((name) => {
          const Logo = DS[name];
          return (
            <div key={name} style={tile}>
              <span style={logoBox}>{Logo ? <Logo /> : <span style={{ color: "#E22726" }}>?</span>}</span>
              <span style={label}>{name}</span>
            </div>
          );
        })}
      </div>
    </div>
  ),
};
