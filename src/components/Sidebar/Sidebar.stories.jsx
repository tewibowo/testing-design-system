import React, { useState } from "react";
import { Sidebar, DEFAULT_NAV_ITEMS } from "./Sidebar.jsx";

export default {
  title: "Composition/Sidebar",
  component: Sidebar,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => {
    const [active, setActive] = useState("home");
    return (
      <div style={{ display: "grid", gridTemplateColumns: "268px 1fr", height: 720, background: "#F1F2F4" }}>
        <Sidebar items={DEFAULT_NAV_ITEMS} active={active} onSelect={setActive} />
        <div style={{ padding: 32, color: "#505454" }}>
          Selected: <code style={{ fontFamily: "var(--sx-font-mono)" }}>{active}</code>
        </div>
      </div>
    );
  },
};
