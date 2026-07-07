import { useState } from "react";
import { V2TabBar } from "@app/v2/core/V2TabBar.jsx";
import { TabPanes } from "@app/ui/TabPanes.jsx";
import { MoveSheetContent } from "@app/v2/core/MoveSheet.jsx";
import { useSheet } from "@app/nav/Sheet.jsx";
import { V2HomeTab } from "@app/v2/screens/home/V2HomeTab.jsx";
import { V2ActivityTab } from "@app/v2/screens/activity/V2ActivityTab.jsx";
import { V2AccountTab } from "@app/v2/screens/account/V2AccountTab.jsx";

export function V2RootTabs() {
  const [active, setActive] = useState("home");
  const [moveOpen, setMoveOpen] = useState(false);
  const { openSheet, closeSheet } = useSheet();

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
      <TabPanes
        active={active}
        panes={{
          home: <V2HomeTab />,
          activity: <V2ActivityTab />,
          account: <V2AccountTab />
        }}
      />
      <V2TabBar
        active={active}
        onChange={setActive}
        moveOpen={moveOpen}
        onMove={toggleMove}
      />
    </>
  );
}
