import React from "react";
import { DeprecatedModal, Button } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

const DeprecatedModalDemo = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>Open deprecated modal</Button>
      <DeprecatedModal
        open={open}
        onClose={() => setOpen(false)}
        icon={false}
        title="Deprecated modal"
        footer={<Button type="primary" onClick={() => setOpen(false)}>Close</Button>}
      >
        Prefer the Modal + ModalProvider API instead.
      </DeprecatedModal>
    </>
  );
};

export default {
  title: "@xfers Design System 6.1.0/Components/DeprecatedModal",
  decorators: [withDesignSystem],
  parameters: { layout: "centered" },
};

export const Default = { render: () => <DeprecatedModalDemo /> };
