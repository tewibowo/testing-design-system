import React from "react";
import { EmptyData } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/EmptyData",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

export const Default = { render: () => <EmptyData title="No transactions yet" subtitle="Your activity will appear here." /> };
