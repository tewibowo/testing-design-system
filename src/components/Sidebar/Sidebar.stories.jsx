import React, { useState } from "react";
import { Sidebar, DEFAULT_NAV_ITEMS } from "./Sidebar.jsx";

export default {
  title: "Composition/Sidebar",
  component: Sidebar,
  parameters: { layout: "fullscreen" },
};

function Frame({ children }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", height: 720, background: "var(--sx-background)" }}>
      {children}
    </div>
  );
}

export const Personal = {
  render: () => {
    const [active, setActive] = useState("home");
    const [sub, setSub] = useState(null);
    return (
      <Frame>
        <Sidebar
          account="personal"
          items={DEFAULT_NAV_ITEMS}
          active={active}
          activeSubItem={sub}
          onSelect={(id) => (id.startsWith("mint-") ? setSub(id) : setActive(id))}
        />
        <div style={{ padding: 32, color: "var(--sx-text-secondary)" }}>Personal account</div>
      </Frame>
    );
  },
};

export const BusinessWithCompanyDropdown = {
  render: () => {
    const [active, setActive] = useState("mint");
    const [sub, setSub] = useState("mint-buy");
    return (
      <Frame>
        <Sidebar
          account="business"
          company={{ name: "ABC Pte. Ltd", type: "Company" }}
          onCompanyClick={() => alert("Open company switcher")}
          items={DEFAULT_NAV_ITEMS}
          active={active}
          activeSubItem={sub}
          onSelect={(id) => (id.startsWith("mint-") ? setSub(id) : setActive(id))}
        />
        <div style={{ padding: 32, color: "var(--sx-text-secondary)" }}>
          Business — company profile dropdown + expanded sub-items
        </div>
      </Frame>
    );
  },
};

export const Sandbox = {
  render: () => (
    <Frame>
      <Sidebar account="sandbox" company={{ name: "ABC Pte. Ltd", type: "Sandbox" }} onCompanyClick={() => {}} active="home" />
      <div style={{ padding: 32, color: "var(--sx-text-secondary)" }}>Sandbox environment</div>
    </Frame>
  ),
};
