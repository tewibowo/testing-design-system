import React, { useState } from "react";
import { Sidebar, DEFAULT_NAV_ITEMS } from "../components/Sidebar/Sidebar.jsx";
import { TopBar } from "../components/TopBar/TopBar.jsx";
import { PageTitle } from "../components/PageTitle/PageTitle.jsx";
import { Tabs } from "../components/Tabs/Tabs.jsx";
import { Card } from "../components/Card/Card.jsx";
import { Switch } from "../components/Switch/Switch.jsx";
import { Select } from "../components/Select/Select.jsx";
import { Copybox } from "../components/Copybox/Copybox.jsx";
import { Button } from "../components/Button/Button.jsx";
import { Modal } from "../components/Modal/Modal.jsx";
import { Alert } from "../components/Alert/Alert.jsx";
import { Input } from "../components/Input/Input.jsx";
import "./PersonalAccount.css";

function Row({ title, sub, children }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, padding: "16px 0", borderBottom: "1px solid var(--sx-line-soft)" }}>
      <div style={{ maxWidth: 480 }}>
        <div style={{ font: "700 14px/1.4 var(--sx-font-display)", color: "var(--sx-deep-ivy)" }}>{title}</div>
        {sub && <div style={{ font: "var(--sx-body-s)", color: "var(--sx-fg-3)", marginTop: 2 }}>{sub}</div>}
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
}

export function Settings() {
  const [tab, setTab] = useState("profile");
  const [showDelete, setShowDelete] = useState(false);

  const tabContent = {
    profile: (
      <Card surface="raised">
        <h2 style={{ font: "var(--sx-title-s)", color: "var(--sx-deep-ivy)", margin: "0 0 8px" }}>Profile</h2>
        <p style={{ font: "var(--sx-body-m)", color: "var(--sx-fg-2)", margin: 0 }}>How you appear across StraitsX.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 20 }}>
          <Input label="Full name" defaultValue="John Doe" />
          <Input label="Display name" defaultValue="John" />
          <Input label="Email" defaultValue="john@straitsx.com" />
          <Input label="Phone" defaultValue="+65 9123 4567" />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 24 }}>
          <Button variant="tertiary">Reset</Button>
          <Button>Save changes</Button>
        </div>
      </Card>
    ),
    security: (
      <Card surface="raised">
        <h2 style={{ font: "var(--sx-title-s)", color: "var(--sx-deep-ivy)", margin: "0 0 8px" }}>Security</h2>
        <Alert tone="warning" title="Two-factor authentication is recommended">
          Add an extra layer of protection to your account.
        </Alert>
        <div style={{ marginTop: 16 }}>
          <Row title="Two-factor authentication" sub="Required for transactions over S$10,000.">
            <Switch defaultChecked />
          </Row>
          <Row title="Login alerts" sub="Email me when a new device signs in.">
            <Switch defaultChecked />
          </Row>
          <Row title="Withdraw whitelist" sub="Only send funds to pre-approved addresses.">
            <Switch />
          </Row>
        </div>
        <div style={{ marginTop: 24, display: "flex", gap: 8 }}>
          <Button variant="secondary">Change password</Button>
          <Button variant="tertiary" onClick={() => setShowDelete(true)}>Delete account</Button>
        </div>
        <Modal
          open={showDelete}
          onClose={() => setShowDelete(false)}
          title="Delete your StraitsX account?"
          size="sm"
          footer={
            <>
              <Button variant="secondary" size="md" onClick={() => setShowDelete(false)}>Cancel</Button>
              <Button variant="primary" size="md" onClick={() => setShowDelete(false)} style={{ background: "var(--sx-critical)", color: "#fff" }}>I understand, delete</Button>
            </>
          }
        >
          This will permanently close your account and withdraw all remaining balances back to your linked bank. This action cannot be undone.
        </Modal>
      </Card>
    ),
    notifications: (
      <Card surface="raised">
        <h2 style={{ font: "var(--sx-title-s)", color: "var(--sx-deep-ivy)", margin: "0 0 8px" }}>Notifications</h2>
        <Row title="Transaction confirmations" sub="Inbound and outbound transfers."><Switch defaultChecked /></Row>
        <Row title="Pending approvals" sub="Transfers awaiting your review."><Switch defaultChecked /></Row>
        <Row title="Product updates" sub="New features and announcements."><Switch /></Row>
        <Row title="Marketing emails" sub="Tips, offers, and educational content."><Switch /></Row>
      </Card>
    ),
    developers: (
      <Card surface="raised">
        <h2 style={{ font: "var(--sx-title-s)", color: "var(--sx-deep-ivy)", margin: "0 0 8px" }}>Developers</h2>
        <p style={{ font: "var(--sx-body-m)", color: "var(--sx-fg-2)", margin: "0 0 16px" }}>API access for programmatic transfers and reporting.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Copybox label="Publishable key" value="sx_pub_a92f7e8c4d3b1f6a0e2d9c4b7f5a3e1d" />
          <Copybox label="Secret key (rotated 2 days ago)" value="sx_live_5f4d7a2e9b3c1f8d0a6e2b5c8d4e7f1a" />
          <Select label="Webhook events" defaultValue="all" options={[
            { value: "all", label: "All events" },
            { value: "transfers", label: "Transfers only" },
            { value: "auth", label: "Auth events only" },
          ]} />
        </div>
      </Card>
    ),
  };

  return (
    <div className="ex-pa" data-screen-label="03 Settings">
      <Sidebar items={DEFAULT_NAV_ITEMS} active="settings" onSelect={() => {}} />
      <main className="ex-pa__main">
        <div className="ex-pa__head">
          <TopBar unread={0} name="John Doe" company="ABC Pte. Ltd." />
        </div>
        <PageTitle title="Settings" subtitle="Manage your account, security, and integrations." />
        <Tabs
          variant="pill"
          activeTab={tab}
          onTabChange={setTab}
          items={[
            { id: "profile", label: "Profile" },
            { id: "security", label: "Security" },
            { id: "notifications", label: "Notifications" },
            { id: "developers", label: "Developers" },
          ]}
        />
        <div style={{ marginTop: 16 }}>{tabContent[tab]}</div>
      </main>
    </div>
  );
}
