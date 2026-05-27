import React from "react";
import { Card } from "./Card.jsx";
import { Button } from "../Button/Button.jsx";
import { Tag } from "../Tag/Tag.jsx";

export default {
  title: "Components/Card",
  component: Card,
  parameters: { layout: "padded" },
  argTypes: {
    surface: { control: "inline-radio", options: ["default", "raised", "ivy", "teal"] },
    title: { control: "text" },
    body: { control: "text" },
  },
  args: {
    surface: "default",
    title: "Verify Your Identity",
    body: "Complete identity verification for a smooth and secure experience.",
  },
};

export const Default = { decorators: [(S) => <div style={{maxWidth: 360}}><S /></div>] };
export const Raised = { args: { surface: "raised" }, decorators: [(S) => <div style={{maxWidth: 360, background: '#F1F2F4', padding: 24}}><S /></div>] };
export const Ivy = { args: { surface: "ivy", title: "Payments Infrastructure", body: "We enable fast and safe access to digital assets markets." }, decorators: [(S) => <div style={{maxWidth: 420}}><S /></div>] };
export const Teal = { args: { surface: "teal", title: "StraitsX OTC Desk", body: "We offer deep liquidity to institutions and high net-worth individuals." }, decorators: [(S) => <div style={{maxWidth: 420}}><S /></div>] };

export const WithChildren = {
  args: { title: "Verify Your Identity", body: "Complete identity verification for a smooth and secure experience." },
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <Card {...args}>
        <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
          <Tag tone="positive">Verified</Tag>
          <Button size="sm" variant="tertiary">Edit</Button>
        </div>
      </Card>
    </div>
  ),
};
