import React from "react";
import { ErrorPage } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/ErrorPage",
  decorators: [withDesignSystem],
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => (
    <div style={{ height: 480 }}>
      <ErrorPage title="Something went wrong" subtitle="Error 500" content="Please try again later." />
    </div>
  ),
};
