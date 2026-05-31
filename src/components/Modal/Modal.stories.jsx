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

export const Illustration = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open illustration modal</Button>
        <Modal
          open={open}
          size={400}
          variant="illustration"
          onClose={() => setOpen(false)}
          title="You're all set!"
          illustration={
            <span className="material-symbols-rounded" style={{ fontSize: 64, color: "var(--sx-primary)" }}>
              verified
            </span>
          }
          footer={<Button variant="primary" size="md" onClick={() => setOpen(false)}>Got it</Button>}
        >
          Your account has been verified. You can now transact across all supported stablecoins.
        </Modal>
      </>
    );
  },
};

export const NewFeature = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open new-feature modal</Button>
        <Modal
          open={open}
          size={600}
          variant="new-feature"
          onClose={() => setOpen(false)}
          title="Introducing instant swaps"
          media={
            <div
              style={{
                height: 220,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--sx-text-secondary)",
                font: "var(--sx-label-large)",
              }}
            >
              Screenshot / media
            </div>
          }
          footer={
            <>
              <Button variant="secondary" size="md" onClick={() => setOpen(false)}>Maybe later</Button>
              <Button variant="primary" size="md" onClick={() => setOpen(false)}>Try it now</Button>
            </>
          }
        >
          Swap between stablecoins instantly with zero spread for the first 30 days.
        </Modal>
      </>
    );
  },
};
