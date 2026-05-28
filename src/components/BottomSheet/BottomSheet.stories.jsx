import React, { useState } from "react";
import { BottomSheet } from "./BottomSheet.jsx";
import { Button } from "../Button/Button.jsx";

export default {
  title: "Components/BottomSheet",
  component: BottomSheet,
  parameters: { layout: "centered" },
};

function Demo({ title = "Send to" }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open bottom sheet</Button>
      <BottomSheet open={open} onClose={() => setOpen(false)} title={title}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ font: "var(--sx-body-m)", color: "var(--sx-fg-2)", margin: 0 }}>
            Choose how you'd like to send funds.
          </p>
          <Button>Bank transfer</Button>
          <Button variant="secondary">Stablecoin wallet</Button>
          <Button variant="tertiary">QR code</Button>
        </div>
      </BottomSheet>
    </>
  );
}

export const Default = { render: () => <Demo /> };
