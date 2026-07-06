import { useState } from "react";
import { TabBar } from "@app/ui/TabBar.jsx";
import { TabPanes } from "@app/ui/TabPanes.jsx";
import { notifications } from "@app/data/db.js";
import { HomeTab } from "@app/screens/home/HomeTab.jsx";
import { HistoryTab } from "@app/screens/history/HistoryTab.jsx";
import { AccountTab } from "@app/screens/account/AccountTab.jsx";

const TABS = [
  { key: "home", label: "Home", icon: "home" },
  { key: "history", label: "History", icon: "receipt_long" },
  { key: "account", label: "Account", icon: "account_circle" }
];

export function RootTabs() {
  const [active, setActive] = useState("home");
  const unread = notifications.items.filter((n) => !n.read).length;
  const tabs = TABS.map((t) => (t.key === "home" ? { ...t, badge: 0 } : t));

  return (
    <>
      <TabPanes
        active={active}
        panes={{
          home: <HomeTab unreadNotifications={unread} />,
          history: <HistoryTab unreadNotifications={unread} />,
          account: <AccountTab unreadNotifications={unread} />
        }}
      />
      <TabBar tabs={tabs} active={active} onChange={setActive} />
    </>
  );
}
