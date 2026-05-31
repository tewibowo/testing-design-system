import React, { useState } from "react";
import { Sidebar, DEFAULT_NAV_ITEMS } from "../components/Sidebar/Sidebar.jsx";
import { TopBar } from "../components/TopBar/TopBar.jsx";
import { PageTitle } from "../components/PageTitle/PageTitle.jsx";
import { Card } from "../components/Card/Card.jsx";
import { Input } from "../components/Input/Input.jsx";
import { Select } from "../components/Select/Select.jsx";
import { Alert } from "../components/Alert/Alert.jsx";
import { Button } from "../components/Button/Button.jsx";
import { Steps } from "../components/Steps/Steps.jsx";
import { Modal } from "../components/Modal/Modal.jsx";
import { ToastProvider, useToast } from "../components/Toast/Toast.jsx";
import "./PersonalAccount.css";

function MintInner() {
  const [step, setStep] = useState(0);
  const [currency, setCurrency] = useState("xsgd");
  const [amount, setAmount] = useState("");
  const [confirm, setConfirm] = useState(false);
  const { show } = useToast();

  const fee = 0;
  const numericAmount = parseFloat(amount.replace(/,/g, "")) || 0;
  const total = numericAmount + fee;

  return (
    <>
      <PageTitle title="Mint stablecoins" subtitle="Convert your bank balance into stablecoins, 1:1 and instant." />
      <div style={{ maxWidth: 520, marginBottom: 24 }}>
        <Steps
          current={step}
          items={[
            { label: "Amount" },
            { label: "Review" },
            { label: "Confirm" },
          ]}
        />
      </div>

      <Card surface="raised" className="ex-pa__col" style={{ maxWidth: 520 }}>
        {step === 0 && (
          <>
            <Select
              label="Currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              options={[
                { value: "xsgd", label: "XSGD — Singapore Dollar" },
                { value: "xidr", label: "XIDR — Indonesian Rupiah" },
                { value: "xusd", label: "XUSD — US Dollar" },
              ]}
            />
            <Input
              label="Amount"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              suffix={currency.toUpperCase()}
            />
            <Alert tone="info">
              StraitsX mints stablecoins 1:1 against your bank balance. No fees. Backed by reserves held with Standard Chartered Bank.
            </Alert>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={() => setStep(1)} disabled={!numericAmount}>Continue</Button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h2 style={{ font: "var(--sx-title-small)", color: "var(--sx-text-primary)", margin: "0 0 12px" }}>Review</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Row label="Currency" value={currency.toUpperCase()} />
              <Row label="Amount" value={numericAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} />
              <Row label="Fee" value={fee.toFixed(2)} />
              <div style={{ height: 1, background: "var(--sx-border)", margin: "8px 0" }} />
              <Row label="You'll receive" value={`${total.toLocaleString(undefined, { minimumFractionDigits: 2 })} ${currency.toUpperCase()}`} strong />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
              <Button variant="secondary" onClick={() => setStep(0)}>Back</Button>
              <Button onClick={() => setConfirm(true)}>Confirm mint</Button>
            </div>
          </>
        )}
      </Card>

      <Modal
        open={confirm}
        onClose={() => setConfirm(false)}
        title="Confirm mint"
        size="sm"
        footer={
          <>
            <Button variant="secondary" size="md" onClick={() => setConfirm(false)}>Cancel</Button>
            <Button
              size="md"
              onClick={() => {
                setConfirm(false);
                setStep(2);
                show({ tone: "positive", title: "Mint complete", message: `${numericAmount.toLocaleString()} ${currency.toUpperCase()} is now in your wallet.` });
              }}
            >
              Mint now
            </Button>
          </>
        }
      >
        You're about to mint <strong>{numericAmount.toLocaleString()} {currency.toUpperCase()}</strong> from your linked bank account. The funds will be deducted immediately.
      </Modal>
    </>
  );
}

function Row({ label, value, strong = false }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span style={{ font: "var(--sx-body-medium)", color: "var(--sx-text-secondary)" }}>{label}</span>
      <span style={{ font: strong ? "700 16px/1.4 var(--sx-font-mono)" : "var(--sx-body-medium)", color: "var(--sx-text-primary)", fontVariantNumeric: "tabular-nums" }}>
        {value}
      </span>
    </div>
  );
}

export function MintFlow() {
  return (
    <ToastProvider>
      <div className="ex-pa" data-screen-label="04 Mint">
        <Sidebar items={DEFAULT_NAV_ITEMS} active="mint" onSelect={() => {}} />
        <main className="ex-pa__main">
          <div className="ex-pa__head">
            <TopBar unread={0} name="John Doe" company="ABC Pte. Ltd." />
          </div>
          <MintInner />
        </main>
      </div>
    </ToastProvider>
  );
}
