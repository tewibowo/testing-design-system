import React from "react";
import { Timeline } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/Timeline",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

export const Default = {
  render: () => (
    <Timeline>
      <Timeline.Item>Order placed</Timeline.Item>
      <Timeline.Item>Payment received</Timeline.Item>
      <Timeline.Item>Shipped</Timeline.Item>
      <Timeline.Item>Delivered</Timeline.Item>
    </Timeline>
  ),
};
