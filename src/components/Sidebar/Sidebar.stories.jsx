import React, { useState } from "react";
import { Sidebar, DEFAULT_NAV_ITEMS } from "./Sidebar.jsx";

export default {
  title: "Compositions/Sidebar",
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

const COMPANIES = [
  { id: "abc", name: "ABC Pte. Ltd", type: "Business Account", selected: true },
  { id: "xyz", name: "XYZ Pte. Ltd", type: "Business Account" },
];

export const BusinessWithCompanyDropdown = {
  render: () => {
    const [active, setActive] = useState("mint");
    const [sub, setSub] = useState("mint-buy");
    return (
      <Frame>
        <Sidebar
          account="business"
          company={{ name: "ABC Pte. Ltd", type: "Company" }}
          companies={COMPANIES}
          onSwitchCompany={(id) => console.log("switch", id)}
          onCompanyAction={(id) => console.log("action", id)}
          items={DEFAULT_NAV_ITEMS}
          active={active}
          activeSubItem={sub}
          onSelect={(id) => (id.startsWith("mint-") ? setSub(id) : setActive(id))}
        />
        <div style={{ padding: 32, color: "var(--sx-text-secondary)" }}>
          Business — click the company profile to open the dropdown
        </div>
      </Frame>
    );
  },
};

// Dropdown forced open so it's visible in static Chromatic snapshots.
export const CompanyDropdownOpen = {
  render: () => (
    <Frame>
      <Sidebar
        account="business"
        company={{ name: "ABC Pte. Ltd", type: "Company" }}
        companies={COMPANIES}
        defaultMenuOpen
        active="home"
      />
      <div style={{ padding: 32, color: "var(--sx-text-secondary)" }}>
        Company-profile dropdown (open)
      </div>
    </Frame>
  ),
};

// Nav item shown in its hovered state (static for Chromatic).
export const NavHover = {
  render: () => (
    <Frame>
      <Sidebar account="personal" items={DEFAULT_NAV_ITEMS} active="home" hoveredItem="history" />
      <div style={{ padding: 32, color: "var(--sx-text-secondary)" }}>Nav item hover state</div>
    </Frame>
  ),
};

// MAS regulatory badge hidden.
export const NoMasBadge = {
  render: () => (
    <Frame>
      <Sidebar account="personal" items={DEFAULT_NAV_ITEMS} active="home" masBadge={false} />
      <div style={{ padding: 32, color: "var(--sx-text-secondary)" }}>No MAS badge</div>
    </Frame>
  ),
};

export const Sandbox = {
  render: () => (
    <Frame>
      <Sidebar account="sandbox" company={{ name: "ABC Pte. Ltd", type: "Sandbox" }} onCompanyClick={() => {}} active="home" />
      <div style={{ padding: 32, color: "var(--sx-text-secondary)" }}>Sandbox environment</div>
    </Frame>
  ),
};
