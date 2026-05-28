import React, { useState } from "react";
import { Modal } from "./Modal.jsx";
import { Button } from "../Button/Button.jsx";

export default {
  title: "Components/Modal",
  component: Modal,
  parameters: { layout: "centered" },
};

function Demo({ size = "md", title = "Confirm transfer" }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        size={size}
        onClose={() => setOpen(false)}
        title={title}
        footer={
          <>
            <Button variant="secondary" size="md" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" size="md" onClick={() => setOpen(false)}>Confirm</Button>
          </>
        }
      >
        You are about to send <strong>1,250 XSGD</strong> to <strong>John Doe</strong>. This action cannot be undone.
      </Modal>
    </>
  );
}

export const Default = { render: () => <Demo /> };
export const Small = { render: () => <Demo size="sm" title="Discard draft?" /> };
export const Large = { render: () => <Demo size="lg" title="Customer Knowledge Assessment" /> };
