// OnboardingSteps.jsx — "Welcome to StraitsX!" card with 3-step indicator.
// Illustration-free version: text-only step cards.

function StepConnector({ states }) {
  return (
    <div className="sx-steps">
      {states.map((s, i) => (
        <React.Fragment key={i}>
          <div className={"sx-step-dot is-" + s}>
            {s === "done" ? (
              <span className="material-symbols-rounded">check</span>
            ) : (
              <span className="sx-step-num">{i + 1}</span>
            )}
          </div>
          {i < states.length - 1 && <div className={"sx-step-line is-" + (states[i] === "done" ? "done" : "todo")} />}
        </React.Fragment>
      ))}
    </div>
  );
}

function OnboardingSteps({ stepStates, onTakeAssessment }) {
  const steps = [
    {
      key: "identity",
      title: "Verify Your Identity",
      body: "Complete identity verification for a smooth and secure experience.",
      cta:
        stepStates[0] === "done" ? (
          <span className="sx-tag is-positive">Verified</span>
        ) : null,
    },
    {
      key: "assessment",
      title: "Customer Knowledge Assessment",
      body: "Take this MAS-required quiz to unlock full access to StraitsX.",
      cta: stepStates[1] === "done" ? (
        <span className="sx-tag is-positive">Completed</span>
      ) : (
        <button className="sx-btn sx-btn--primary" onClick={onTakeAssessment}>
          Take Assessment
        </button>
      ),
    },
    {
      key: "phone",
      title: "Verify Your Phone Number",
      body: "Quickly verify your phone number for enhanced account security.",
      cta: <span className="sx-tag is-neutral">Not Verified</span>,
    },
  ];

  return (
    <section className="sx-card sx-onboard">
      <h1 className="sx-title-l sx-onboard__heading">Welcome to StraitsX!</h1>
      <p className="sx-onboard__sub">
        Verify your account and complete a quick assessment to unlock StraitsX.
      </p>
      <StepConnector states={stepStates} />
      <div className="sx-onboard__grid">
        {steps.map((s) => (
          <div key={s.key} className="sx-step">
            <div className="sx-step__text">
              <div className="sx-step__title">{s.title}</div>
              <div className="sx-step__body">{s.body}</div>
            </div>
            <div className="sx-step__cta">{s.cta}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

window.OnboardingSteps = OnboardingSteps;
