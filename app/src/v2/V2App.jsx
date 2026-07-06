import { MotionConfig } from "motion/react";
import { StackNavigator } from "@app/nav/Navigator.jsx";
import { SheetProvider, SheetHost } from "@app/nav/Sheet.jsx";
import { InstallGate } from "@app/ui/InstallGate.jsx";
import { v2screens, V2_INITIAL_SCREEN } from "@app/v2/screens/index.js";

export default function V2App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="device v2">
        <SheetProvider>
          <StackNavigator screens={v2screens} initial={V2_INITIAL_SCREEN}>
            <SheetHost />
          </StackNavigator>
        </SheetProvider>
        <InstallGate storageKey="stx-install-gate-v2" appName="StraitsX v2" />
      </div>
    </MotionConfig>
  );
}
