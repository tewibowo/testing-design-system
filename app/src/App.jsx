import { MotionConfig } from "motion/react";
import { StackNavigator } from "@app/nav/Navigator.jsx";
import { SheetProvider, SheetHost } from "@app/nav/Sheet.jsx";
import { screens, INITIAL_SCREEN } from "@app/screens/index.js";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="device">
        <SheetProvider>
          <StackNavigator screens={screens} initial={INITIAL_SCREEN}>
            <SheetHost />
          </StackNavigator>
        </SheetProvider>
      </div>
    </MotionConfig>
  );
}
