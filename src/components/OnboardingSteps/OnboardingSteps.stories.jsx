import React, { useState } from "react";
import { OnboardingSteps } from "./OnboardingSteps.jsx";

export default {
  title: "Composition/OnboardingSteps",
  component: OnboardingSteps,
  parameters: { layout: "padded" },
};

export const Initial = {
  args: { stepStates: ["active", "todo", "todo"] },
};

export const IdentityVerified = {
  args: { stepStates: ["done", "active", "todo"] },
};

export const TwoStepsDone = {
  args: { stepStates: ["done", "done", "active"] },
};

export const AllDone = {
  args: { stepStates: ["done", "done", "done"] },
};

export const Interactive = {
  render: () => {
    const [stepStates, setStepStates] = useState(["done", "active", "todo"]);
    return (
      <OnboardingSteps
        stepStates={stepStates}
        onTakeAssessment={() => setStepStates(["done", "done", "active"])}
      />
    );
  },
};
