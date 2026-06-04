import React from "react";
import { Modal, Button } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/Modal",
  decorators: [withDesignSystem],
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: 24, background: "#F1F2F4" }}>
      <Modal
        onClose={() => {}}
        title="Confirm transfer"
        footer={(
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <Button type="secondary">Cancel</Button>
            <Button type="primary">Confirm</Button>
          </div>
        )}
      >
        You are about to transfer S$ 100.00 to John Doe.
      </Modal>
    </div>
  ),
};
