import React from "react";
import { Tooltip } from "./Tooltip.jsx";
import { IconButton } from "../IconButton/IconButton.jsx";
import { Button } from "../Button/Button.jsx";

export default {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
};

export const Default = {
  render: () => (
    <Tooltip label="Maximum transfer amount is S$10,000/day until full verification.">
      <IconButton icon="info" variant="outline" label="Info" />
    </Tooltip>
  ),
};

export const AllSides = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, padding: 40, justifyItems: "center" }}>
      <Tooltip side="top" label="Top tooltip"><Button>Top</Button></Tooltip>
      <Tooltip side="bottom" label="Bottom tooltip"><Button>Bottom</Button></Tooltip>
      <Tooltip side="left" label="Left tooltip"><Button>Left</Button></Tooltip>
      <Tooltip side="right" label="Right tooltip"><Button>Right</Button></Tooltip>
    </div>
  ),
};

export const AlwaysOpen = {
  args: { label: "This is always shown", defaultOpen: true },
  render: (args) => (
    <Tooltip {...args}>
      <IconButton icon="help" variant="outline" label="Help" />
    </Tooltip>
  ),
};

export const WithTitle = {
  render: () => (
    <Tooltip
      defaultOpen
      side="top"
      title="Transfer limit"
      content="Maximum transfer amount is S$10,000/day until full verification is complete."
    >
      <IconButton icon="info" variant="outline" label="Info" />
    </Tooltip>
  ),
};

export const WithTag = {
  render: () => (
    <Tooltip
      defaultOpen
      side="top"
      title="Multi-chain support"
      tag={{ label: "Beta", tone: "info" }}
      content="This token is available across multiple networks."
    >
      <IconButton icon="info" variant="outline" label="Info" />
    </Tooltip>
  ),
};

export const WithActions = {
  render: () => (
    <Tooltip
      defaultOpen
      side="bottom"
      title="Verification required"
      content="Verify your identity to raise your daily transfer limit."
      links={[
        { label: "Verify now", onClick: () => {} },
        { label: "Learn more", onClick: () => {} },
      ]}
    >
      <IconButton icon="info" variant="outline" label="Info" />
    </Tooltip>
  ),
};
