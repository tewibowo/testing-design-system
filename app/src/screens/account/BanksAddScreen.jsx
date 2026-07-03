/* ────────────────────────────────────────────────
 * ANIMATION STORYBOARD — Add Bank Account (account/banks-add)
 *  sheet    "Add New" opens the currency sheet (shell spring); options
 *           stagger up 50ms apart; Next closes it and pushes this screen
 *     0ms   screen slides in (shell) at the form step (currency chosen);
 *           pushed WITHOUT a currency param it starts at an inline
 *           currency step instead (canonical cross-area entry)
 *   Next    currency step fades out fast (130ms), form crossfades in (200ms)
 *  submit(empty)  fields container shakes ±8px (320ms), error text fades up
 *  submit(valid)  600ms fake processing → success: check draws, copy rises
 *   Done    pop back — the new Unverified row staggers into the tab list
 * ──────────────────────────────────────────────── */

import { useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "motion/react";
import { useNav } from "@app/nav/Navigator.jsx";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import { SuccessState } from "@app/ui/SuccessState.jsx";
import { listContainer, listItem, tabContent, EASE_BRAND } from "@app/motion/presets.js";
import { user } from "@app/data/db.js";
import { Button } from "@ds/components/Button/Button.jsx";
import { Input } from "@ds/components/Input/Input.jsx";
import { Alert } from "@ds/components/Alert/Alert.jsx";
import { SelectionBox } from "@ds/components/SelectionBox/SelectionBox.jsx";
import { addBank } from "./bankStore.js";
import "./account.css";

const CURRENCIES = [
  "Singapore Dollar (SGD)",
  "Indonesian Rupiah (IDR)",
  "US Dollar (USD)"
];

const REQUIRED = [
  ["bankName", "Bank Name is required"],
  ["swift", "Swift Code is required"],
  ["accountNumber", "Account Number is required"]
];

function validate(values) {
  const errors = {};
  for (const [key, message] of REQUIRED) {
    if (!values[key] || !values[key].trim()) errors[key] = message;
  }
  return errors;
}

function LabelWithInfo({ text, info }) {
  return (
    <span className="account-flabel">
      {text}
      <span
        className="material-symbols-rounded account-flabel__info"
        title={info}
        aria-label={info}
      >
        info
      </span>
    </span>
  );
}

/**
 * Currency-selection bottom sheet (spec §5 step 2 — "Add Bank Account"
 * modal). Opened from the Bank Accounts tab's "Add New" button; Next
 * closes the sheet and hands the chosen currency to the add-bank screen.
 * SGD is pre-selected, so Next is enabled from the start (per spec).
 */
export function AddBankCurrencySheet({ close, onNext }) {
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  return (
    <div className="account-sheet">
      <h3 className="account-sheet__title">Add Bank Account</h3>
      <motion.div
        className="account-list"
        variants={listContainer}
        initial="initial"
        animate="enter"
      >
        {CURRENCIES.map((c) => (
          <motion.div key={c} variants={listItem}>
            <SelectionBox
              type="radio"
              name="account-sheet-currency"
              label={c}
              selected={currency === c}
              onChange={() => setCurrency(c)}
            />
          </motion.div>
        ))}
      </motion.div>
      <div className="account-cta-row account-sheet__actions">
        <Button variant="secondary" onClick={close}>Close</Button>
        <Button
          variant="primary"
          onClick={() => {
            close();
            onNext(currency);
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export function BanksAddScreen({ params = {} }) {
  const nav = useNav();
  // Pushed with a currency (from the tab's currency sheet) → straight to the
  // form; pushed bare (canonical cross-area route) → inline currency step.
  const [step, setStep] = useState(params.currency ? "form" : "currency"); // currency | form | success
  const [currency, setCurrency] = useState(params.currency || CURRENCIES[0]);
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [values, setValues] = useState({
    bankName: "",
    swift: "",
    accountNumber: "",
    routing: "",
    intermediary: "",
    reason: ""
  });
  const [errors, setErrors] = useState({});
  const [attempted, setAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [addedName, setAddedName] = useState("");
  const shake = useAnimationControls();

  const setField = (key) => (e) => {
    const next = { ...values, [key]: e.target.value };
    setValues(next);
    if (attempted) setErrors(validate(next));
  };

  const submit = () => {
    const errs = validate(values);
    setAttempted(true);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      shake.start({
        x: [0, -8, 8, -5, 5, 0],
        transition: { duration: 0.32, ease: EASE_BRAND }
      });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const name = values.bankName.trim();
      addBank({ name, account: values.accountNumber.trim() });
      setAddedName(name);
      setSubmitting(false);
      setStep("success");
    }, 600);
  };

  return (
    <>
      <AppHeader title="Add Bank Account" back />
      <div className="screen-scroll">
        <div className="screen-pad account-flow">
          <AnimatePresence mode="popLayout" initial={false}>
            {step === "currency" && (
              <motion.div
                key="currency"
                initial={tabContent.initial}
                animate={tabContent.enter}
                exit={tabContent.exit}
              >
                <p className="account-flow__lead">
                  Select the currency of the bank account you want to add.
                </p>
                <motion.div
                  className="account-list"
                  variants={listContainer}
                  initial="initial"
                  animate="enter"
                >
                  {CURRENCIES.map((c) => (
                    <motion.div key={c} variants={listItem}>
                      <SelectionBox
                        type="radio"
                        name="account-currency"
                        label={c}
                        selected={currency === c}
                        onChange={() => setCurrency(c)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {step === "form" && (
              <motion.div
                key="form"
                initial={tabContent.initial}
                animate={tabContent.enter}
                exit={tabContent.exit}
              >
                <h2 className="account-h2 account-flow__heading">
                  Bank Account Information
                </h2>
                <AnimatePresence initial={false}>
                  {!alertDismissed && (
                    <motion.div
                      exit={{ opacity: 0, height: 0, transition: { duration: 0.2, ease: EASE_BRAND } }}
                    >
                      <Alert
                        tone="warning"
                        onDismiss={() => setAlertDismissed(true)}
                        className="account-form__alert"
                      >
                        You can only deposit or withdraw funds to an account that is
                        in <strong>your own legal name</strong>.
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.div className="account-form" animate={shake}>
                  <Input label="Account Holder Name" value={user.name} disabled readOnly />
                  <Input
                    label="Bank Name"
                    placeholder="Enter bank name"
                    value={values.bankName}
                    onChange={setField("bankName")}
                    error={errors.bankName}
                  />
                  <Input
                    label="SWIFT/BIC Code"
                    placeholder="Enter SWIFT/BIC Code"
                    value={values.swift}
                    onChange={setField("swift")}
                    error={errors.swift}
                  />
                  <Input
                    label={
                      <LabelWithInfo
                        text="IBAN / Account Number"
                        info="Your IBAN or local bank account number."
                      />
                    }
                    placeholder="Enter account number"
                    value={values.accountNumber}
                    onChange={setField("accountNumber")}
                    error={errors.accountNumber}
                  />
                  <Input
                    label={
                      <LabelWithInfo
                        text="Routing Code (Optional)"
                        info="Your bank's routing or branch code, if applicable."
                      />
                    }
                    placeholder="Enter Routing Code"
                    value={values.routing}
                    onChange={setField("routing")}
                  />
                  <Input
                    label={
                      <LabelWithInfo
                        text="Intermediary SWIFT/BIC Code (Optional)"
                        info="SWIFT/BIC of the intermediary bank, if your bank uses one."
                      />
                    }
                    placeholder="Enter Intermediary SWIFT/BIC Code"
                    value={values.intermediary}
                    onChange={setField("intermediary")}
                  />
                  <Input
                    label={
                      <LabelWithInfo
                        text="Payment Reason (Optional)"
                        info="Shared with the receiving bank alongside your transfers."
                      />
                    }
                    placeholder="Enter payment reason"
                    value={values.reason}
                    onChange={setField("reason")}
                  />
                </motion.div>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                className="account-step-success"
                initial={tabContent.initial}
                animate={tabContent.enter}
                exit={tabContent.exit}
              >
                <SuccessState
                  title="Bank Account Added"
                  body={`${addedName} has been added to your bank accounts as unverified. Verify it to start transacting.`}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="cta-bar">
        {step === "currency" && (
          <div className="account-cta-row">
            <Button variant="secondary" onClick={() => nav.pop()}>Close</Button>
            <Button variant="primary" onClick={() => setStep("form")}>Next</Button>
          </div>
        )}
        {step === "form" && (
          <div className="account-cta-row">
            <Button variant="secondary" disabled={submitting} onClick={() => nav.pop()}>
              Close
            </Button>
            <Button variant="primary" disabled={submitting} onClick={submit}>
              {submitting ? "Submitting…" : "Submit"}
            </Button>
          </div>
        )}
        {step === "success" && (
          <Button variant="primary" onClick={() => nav.pop()}>Done</Button>
        )}
      </div>
    </>
  );
}
