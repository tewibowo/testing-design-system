import React from "react";
import { Toast, ToastProvider, useToast } from "./Toast.jsx";
import { Button } from "../Button/Button.jsx";

export default {
  title: "Components/Toast",
  component: Toast,
  parameters: { layout: "centered" },
};

export const Static = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 420 }}>
      <Toast tone="positive" title="Transfer confirmed" onDismiss={() => {}}>1,250 XSGD sent to John Doe.</Toast>
      <Toast tone="critical" title="Transfer failed" onDismiss={() => {}}>Insufficient balance.</Toast>
      <Toast tone="warning" title="Network slow" onDismiss={() => {}}>Confirmations may take longer than usual.</Toast>
      <Toast tone="info" title="New feature" onDismiss={() => {}}>Earn is now available on your account.</Toast>
    </div>
  ),
};

function Trigger() {
  const { show } = useToast();
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Button size="sm" onClick={() => show({ tone: "positive", title: "Saved", message: "Your settings have been updated." })}>Show success</Button>
      <Button size="sm" variant="secondary" onClick={() => show({ tone: "critical", title: "Transfer failed", message: "Insufficient balance." })}>Show error</Button>
    </div>
  );
}

export const WithProvider = {
  render: () => (
    <ToastProvider>
      <Trigger />
    </ToastProvider>
  ),
};
