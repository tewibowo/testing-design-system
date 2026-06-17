import React, { useState } from "react";
import { Sidebar, DEFAULT_NAV_ITEMS } from "../components/Sidebar/Sidebar.jsx";
import { TopBar } from "../components/TopBar/TopBar.jsx";
import { OnboardingSteps } from "../components/OnboardingSteps/OnboardingSteps.jsx";
import { TransferPanel } from "../components/TransferPanel/TransferPanel.jsx";
import { OtcBanner } from "../components/OtcBanner/OtcBanner.jsx";
import { EmptyState } from "../components/EmptyState/EmptyState.jsx";
import { Card } from "../components/Card/Card.jsx";
import "./PersonalAccount.css";

/**
 * Full Personal Account dashboard, composed from package components.
 * Demonstrates how the building blocks fit together in a real screen.
 */
export function PersonalAccount() {
  const [active, setActive] = useState("home");
  const [stepStates, setStepStates] = useState(["done", "active", "todo"]);

  return (
    <div className="ex-pa" data-screen-label="01 Home">
      <Sidebar items={DEFAULT_NAV_ITEMS} active={active} onSelect={setActive} />
      <main className="ex-pa__main">
        <div className="ex-pa__head">
          <TopBar unread={2} name="John Doe" company="ABC Pte. Ltd." />
        </div>

        <div className="ex-pa__col">
          <OnboardingSteps
            stepStates={stepStates}
            onTakeAssessment={() => setStepStates(["done", "done", "active"])}
          />

          <div className="ex-pa__grid">
            <TransferPanel />
            <div className="ex-pa__col">
              <OtcBanner />
              <Card shadow={1} title="Notification">
                <EmptyState
                  compact
                  title="No Transaction Found"
                  sub="You don't have any transactions yet."
                />
              </Card>
            </div>
          </div>

          <div className="ex-pa__footnote">
            XSGD and XIDR are issued by StraitsX.
            <br />
            "STRAITSX", "XSGD" and "XIDR" and all other URLs, logos and trademarks related to the StraitsX
            Services are either trademarks or registered trademarks of StraitsX or its licensors.
            <br />
            StraitsX is the trading name of the StraitsX Group of Companies and its affiliated entities.
            <br />
            Important Risk Warnings Regarding Digital Payment Tokens: <a href="#">Learn More</a>
          </div>
        </div>
      </main>
    </div>
  );
}
