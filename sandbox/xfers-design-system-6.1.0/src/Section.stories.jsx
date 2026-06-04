import React from "react";
import { Section } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/Section",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

export const Default = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Section.Title>Account</Section.Title>
      <Section.Subtitle>Manage your account details</Section.Subtitle>
      <Section.Row><Section.Left>Email</Section.Left><Section.Right>user@example.com</Section.Right></Section.Row>
      <Section.Row><Section.Left>Phone</Section.Left><Section.Right>+65 9123 4567</Section.Right></Section.Row>
    </div>
  ),
};
