import React from "react";
import { Badge } from "./Badge.jsx";
import { IconButton } from "../IconButton/IconButton.jsx";

export default {
  title: "Components/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  argTypes: {
    tone: { control: "inline-radio", options: ["brand", "critical", "warning", "info", "neutral"] },
    size: { control: "inline-radio", options: ["lg", "md", "sm"] },
    dot: { control: "boolean" },
    children: { control: "number" },
  },
  args: { tone: "brand", size: "md", children: 3 },
};

export const Numeric = {};
export const Dot = { args: { dot: true, tone: "critical" } };
export const OverflowMax = { args: { children: 248, max: 99 } };

export const OnIconButton = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
      <Badge.Wrap badge={<Badge>2</Badge>}>
        <IconButton icon="notifications" variant="outline" label="Notifications" />
      </Badge.Wrap>
      <Badge.Wrap badge={<Badge tone="critical">12</Badge>}>
        <IconButton icon="mail" variant="outline" label="Mail" />
      </Badge.Wrap>
      <Badge.Wrap badge={<Badge dot tone="critical" />}>
        <IconButton icon="chat" variant="outline" label="Chat" />
      </Badge.Wrap>
    </div>
  ),
};
