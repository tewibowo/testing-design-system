import React, { useState } from "react";
import { Modal2FA } from "./Modal2FA.jsx";
import { Button } from "../Button/Button.jsx";

export default {
  title: "Components/Modal/2FA",
  component: Modal2FA,
  parameters: { layout: "centered" },
};

const Illustration = () => (
  <span className="material-symbols-rounded" style={{ fontSize: 96, color: "var(--sx-primary)" }}>
    phonelink_lock
  </span>
);

function Demo(props) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open 2FA</Button>
      <Modal2FA
        open={open}
        onClose={() => setOpen(false)}
        value={code}
        onChange={setCode}
        onVerify={() => setOpen(false)}
        illustration={<Illustration />}
        {...props}
      />
    </>
  );
}

export const Default = { render: () => <Demo /> };

export const Open = {
  render: () => {
    function Wrapper() {
      const [code, setCode] = useState("123");
      return (
        <Modal2FA
          open
          onClose={() => {}}
          value={code}
          onChange={setCode}
          onVerify={() => {}}
          illustration={<Illustration />}
        />
      );
    }
    return <Wrapper />;
  },
};
