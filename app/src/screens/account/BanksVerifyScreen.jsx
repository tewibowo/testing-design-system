/* ────────────────────────────────────────────────
 * ANIMATION STORYBOARD — Verify Bank Account (account/banks-verify)
 *     0ms   screen slides in (shell); method options stagger up 50ms apart
 *   select  option border/fill highlights (DS), Next enables
 *   Next    method step fades out fast (130ms), upload copy crossfades in
 *   pick    mock statement file appears in the DS Upload list instantly
 *  Submit   600ms fake processing → bank flips to Pending in the store,
 *           success check draws (200ms) → copy rises, staggered
 *   Close   pop back — the CIMB Niaga tag crossfades Unverified → Pending
 * ──────────────────────────────────────────────── */

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNav } from "@app/nav/Navigator.jsx";
import { useSheet } from "@app/nav/Sheet.jsx";
import { openTransferIn } from "@app/screens/transfers/TransferInSheet.jsx";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import { SuccessState } from "@app/ui/SuccessState.jsx";
import { listContainer, listItem, tabContent } from "@app/motion/presets.js";
import { banks as dbBanks } from "@app/data/db.js";
import { Button } from "@ds/components/Button/Button.jsx";
import { SelectionBox } from "@ds/components/SelectionBox/SelectionBox.jsx";
import { Upload } from "@ds/components/Upload/Upload.jsx";
import { LinkButton } from "@ds/components/LinkButton/LinkButton.jsx";
import { firstUnverified, setBankStatus } from "./bankStore.js";
import { ToastStack, useToasts } from "./parts.jsx";
import "./account.css";

const METHODS = [
  { id: "transfer", label: "Transfer In" },
  { id: "upload", label: "Upload bank statement" }
];

// Mock statement file — the DS Upload renders plain {name, size} objects fine.
const MOCK_FILE = {
  name: "bank-statement.pdf",
  size: 1_800_000,
  type: "application/pdf"
};

export function BanksVerifyScreen({ params = {} }) {
  const nav = useNav();
  const { openSheet } = useSheet();
  const toasts = useToasts();
  const [step, setStep] = useState("method"); // method | upload | success
  const [method, setMethod] = useState(null);
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // Which bank is being verified: explicit param, else the first Unverified
  // row, else the db's captured unverified bank (CIMB Niaga).
  const bankName =
    params.bank ||
    firstUnverified()?.name ||
    dbBanks.linked.find((b) => b.status === "Unverified")?.name;

  const next = () => {
    if (!method) return;
    if (method === "transfer") {
      // Verify-by-transfer-in continues in the transfer-in bottom sheet.
      openTransferIn(openSheet);
      return;
    }
    setStep("upload");
  };

  // Mock the file picker: any tap on the dropzone attaches the mock statement
  // instead of opening the OS picker.
  const interceptPick = (e) => {
    if (e.target.closest && e.target.closest(".upload__drop")) {
      e.preventDefault();
      e.stopPropagation();
      setFiles([MOCK_FILE]);
    }
  };

  const submit = () => {
    if (files.length === 0 || submitting) return;
    setSubmitting(true);
    setTimeout(() => {
      setBankStatus(bankName, "Pending");
      setSubmitting(false);
      setStep("success");
    }, 600);
  };

  const openFaq = () =>
    toasts.show({
      tone: "info",
      title: "FAQ",
      message: "The FAQ opens in the live app."
    });

  return (
    <>
      <AppHeader title="Verify Bank Account" back />
      <div className="screen-scroll">
        <div className="screen-pad account-flow">
          <AnimatePresence mode="popLayout" initial={false}>
            {step === "method" && (
              <motion.div
                key="method"
                initial={tabContent.initial}
                animate={tabContent.enter}
                exit={tabContent.exit}
              >
                <p className="account-flow__lead">
                  To verify your bank account, you can{" "}
                  <strong>make a transfer in</strong> from the same account added or{" "}
                  <strong>upload your bank statement</strong>.
                </p>
                <motion.div
                  className="account-list"
                  variants={listContainer}
                  initial="initial"
                  animate="enter"
                >
                  {METHODS.map((m) => (
                    <motion.div key={m.id} variants={listItem}>
                      <SelectionBox
                        type="radio"
                        name="account-verify-method"
                        indicator="control"
                        label={m.label}
                        selected={method === m.id}
                        onChange={() => setMethod(m.id)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {step === "upload" && (
              <motion.div
                key="upload"
                className="account-verify"
                initial={tabContent.initial}
                animate={tabContent.enter}
                exit={tabContent.exit}
              >
                <p className="account-flow__lead">
                  To verify your bank account, you need to{" "}
                  <strong>upload your bank statement</strong>
                </p>
                <p className="account-verify__ensure">Ensure that your statement has:</p>
                <ul className="account-verify__list">
                  <li>- <strong>Name</strong></li>
                  <li>- <strong>Address</strong></li>
                  <li>- <strong>Bank Account Number</strong></li>
                  <li>- <strong>Bank Logo</strong></li>
                  <li>- <strong>Date of Issuance</strong> (within 3 months from date of submission)</li>
                  <li>- <strong>Header and Footer</strong> of the statement.</li>
                </ul>
                <p className="account-verify__faq">
                  Don't have a bank statement?{" "}
                  <LinkButton onClick={openFaq}>Check out FAQ</LinkButton>.
                </p>
                <div className="account-note">
                  Do note that cropping or editing of the document is not allowed.
                </div>
                <p className="account-verify__poa">
                  You need to upload your bank statement even if you submitted a
                  statement as your Proof of Address. Identity verification and bank
                  account verification are two different processes.
                </p>
                <div className="account-upload" onClickCapture={interceptPick}>
                  <Upload
                    label="Upload"
                    accept=".jpeg,.jpg,.png,.pdf"
                    hint={
                      <>
                        Drag &amp; Drop JPEG, PNG, JPG, or PDF
                        <br />
                        Max file size: <strong>5 MB</strong>
                      </>
                    }
                    files={files}
                    onChange={setFiles}
                  />
                </div>
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
                  title="Successfully Submitted"
                  body={
                    <>
                      Your bank statement has been uploaded successfully. It'll take
                      approximately <strong>1 business day</strong> to review your
                      submitted document.
                    </>
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="cta-bar">
        {step === "method" && (
          <div className="account-cta-row">
            <Button variant="secondary" onClick={() => nav.pop()}>Close</Button>
            <Button variant="primary" disabled={!method} onClick={next}>Next</Button>
          </div>
        )}
        {step === "upload" && (
          <Button
            variant="primary"
            disabled={files.length === 0 || submitting}
            onClick={submit}
          >
            {submitting ? "Submitting…" : "Submit"}
          </Button>
        )}
        {step === "success" && (
          <Button variant="secondary" onClick={() => nav.pop()}>Close</Button>
        )}
      </div>

      <ToastStack items={toasts.items} dismiss={toasts.dismiss} />
    </>
  );
}
