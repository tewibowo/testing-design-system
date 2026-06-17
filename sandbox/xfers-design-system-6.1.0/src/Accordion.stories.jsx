import React from "react";
import { Accordion } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/Accordion",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

export const Default = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Accordion
        header="What is StraitsX?"
        body={<div>StraitsX is a payments infrastructure for the digital economy.</div>}
        toggleText="Show"
        onCloseToggleText="Hide"
        defaultOpen
      />
    </div>
  ),
};
