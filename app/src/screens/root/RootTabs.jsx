import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TabBar } from "@app/ui/TabBar.jsx";
import { tabContent } from "@app/motion/presets.js";
import { notifications } from "@app/data/db.js";
import { HomeTab } from "@app/screens/home/HomeTab.jsx";
import { HistoryTab } from "@app/screens/history/HistoryTab.jsx";
import { AccountTab } from "@app/screens/account/AccountTab.jsx";

const TABS = [
  { key: "home", label: "Home", icon: "home" },
  { key: "history", label: "History", icon: "receipt_long" },
  { key: "account", label: "Account", icon: "account_circle" }
];

const TAB_SCREENS = {
  home: HomeTab,
  history: HistoryTab,
  account: AccountTab
};

export function RootTabs() {
  const [active, setActive] = useState("home");
  const unread = notifications.items.filter((n) => !n.read).length;
  const tabs = TABS.map((t) => (t.key === "home" ? { ...t, badge: 0 } : t));
  const Active = TAB_SCREENS[active];

  return (
    <>
      <div className="tab-host">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={active}
            className="tab-pane"
            initial={tabContent.initial}
            animate={tabContent.enter}
            exit={tabContent.exit}
          >
            <Active unreadNotifications={unread} />
          </motion.div>
        </AnimatePresence>
      </div>
      <TabBar tabs={tabs} active={active} onChange={setActive} />
    </>
  );
}
