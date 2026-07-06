import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { V2TabBar } from "@app/v2/core/V2TabBar.jsx";
import { MoveSheetContent } from "@app/v2/core/MoveSheet.jsx";
import { useSheet } from "@app/nav/Sheet.jsx";
import { tabContent } from "@app/motion/presets.js";
import { V2HomeTab } from "@app/v2/screens/home/V2HomeTab.jsx";
import { V2ActivityTab } from "@app/v2/screens/activity/V2ActivityTab.jsx";
import { V2AccountTab } from "@app/v2/screens/account/V2AccountTab.jsx";

const TAB_SCREENS = {
  home: V2HomeTab,
  activity: V2ActivityTab,
  account: V2AccountTab
};

export function V2RootTabs() {
  const [active, setActive] = useState("home");
  const [moveOpen, setMoveOpen] = useState(false);
  const { openSheet, closeSheet } = useSheet();
  const Active = TAB_SCREENS[active];

  const toggleMove = () => {
    if (moveOpen) {
      closeSheet();
      setMoveOpen(false);
      return;
    }
    setMoveOpen(true);
    openSheet(({ close }) => <MoveSheetContent close={close} />, {
      onDismiss: () => setMoveOpen(false)
    });
  };

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
            <Active />
          </motion.div>
        </AnimatePresence>
      </div>
      <V2TabBar
        active={active}
        onChange={setActive}
        moveOpen={moveOpen}
        onMove={toggleMove}
      />
    </>
  );
}
