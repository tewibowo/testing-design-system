import React from "react";
import { TransferPanel } from "./TransferPanel.jsx";

export default {
  title: "Composition/TransferPanel",
  component: TransferPanel,
  parameters: { layout: "padded" },
  decorators: [(S) => <div style={{ maxWidth: 720, background: '#F1F2F4', padding: 24 }}><S /></div>],
};

export const Gated = {};

export const TransferOutActive = {
  args: { defaultTab: "out" },
};

export const WithCustomBody = {
  render: () => (
    <TransferPanel>
      <div style={{ padding: "8px 0" }}>
        <p style={{ font: "var(--sx-body-medium)", color: "var(--sx-text-secondary)" }}>
          Custom tab body — pass any node as <code>children</code>.
        </p>
      </div>
    </TransferPanel>
  ),
};
