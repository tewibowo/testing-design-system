import { MotionConfig } from "motion/react";
import { StackNavigator } from "@app/nav/Navigator.jsx";
import { SheetProvider } from "@app/nav/Sheet.jsx";
import { v2screens, V2_INITIAL_SCREEN } from "@app/v2/screens/index.js";

export default function V2App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="device v2">
        <SheetProvider>
          <StackNavigator screens={v2screens} initial={V2_INITIAL_SCREEN} />
        </SheetProvider>
      </div>
    </MotionConfig>
  );
}
