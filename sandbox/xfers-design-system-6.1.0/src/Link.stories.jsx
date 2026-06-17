import React from "react";
import { Link } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/Link",
  decorators: [withDesignSystem],
  parameters: { layout: "centered" },
};

export const Variants = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <Link href="#" textContent="Default link" />
      <Link href="#" isUnderlined textContent="Underlined" />
      <Link href="#" size="sm" textContent="Small" />
    </div>
  ),
};
