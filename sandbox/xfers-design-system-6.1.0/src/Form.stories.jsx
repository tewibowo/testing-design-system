import React from "react";
import { Form, Input, Button } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/Form",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

export const Default = {
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <Form layout="vertical">
        <Form.Item label="Email" name="email">
          <Input placeholder="you@example.com" />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Button type="primary">Sign in</Button>
      </Form>
    </div>
  ),
};
