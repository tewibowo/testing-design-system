/* ────────────────────────────────────────────────
 * ANIMATION STORYBOARD — v2 Account tab (brief §2.7, §4.12)
 *     0ms   header placed (tab crossfade belongs to the shell)
 *    40ms   profile card + groups + log-out fade/rise, staggered 50ms
 *   row tap  pressable tick (scale 0.97, DUR.fast); sheets rise via shared host
 *   copy     toast slides from the top, auto-dismiss 2s (§4.8)
 * ──────────────────────────────────────────────── */

import { useState } from "react";
import { motion } from "motion/react";
import { useNav } from "@app/nav/Navigator.jsx";
import { useSheet } from "@app/nav/Sheet.jsx";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import { listContainer, listItem, pressable } from "@app/motion/presets.js";
import { user, banks, blockchainAddresses } from "@app/data/db.js";
import { Switch } from "@ds/components/Switch/Switch.jsx";
import {
  ACCOUNT_ID,
  APP_VERSION,
  V2Tag,
  V2ConfirmSheet,
  copyText,
  useV2Toasts,
  V2ToastStack
} from "./parts.jsx";
import {
  BankAccountsSheet,
  AddressesSheet,
  TwoFaSheet,
  SupportSheet,
  LegalSheet
} from "./sheets.jsx";
import "./v2account-tab.css";

// Module-level so the demo toggle survives tab switches (tab panes remount).
let biometricsOn = true;

/** Settings row: leading icon disc, label, trailing value/control, chevron. */
function Row({ icon, iconClass = "", label, labelClass = "", trailing = null, chevron = false, onPress }) {
  const inner = (
    <>
      <span className={`v2account-row__icon${iconClass ? ` ${iconClass}` : ""}`}>
        <span className="material-symbols-rounded" aria-hidden="true">{icon}</span>
      </span>
      <span className={`v2account-row__label${labelClass ? ` ${labelClass}` : ""}`}>{label}</span>
      {trailing}
      {chevron && (
        <span className="material-symbols-rounded v2account-row__chev" aria-hidden="true">
          chevron_right
        </span>
      )}
    </>
  );
  if (!onPress) return <div className="v2account-row v2account-row--static">{inner}</div>;
  return (
    <motion.button type="button" {...pressable} className="v2account-row" onClick={onPress}>
      {inner}
    </motion.button>
  );
}

export function V2AccountTab() {
  const nav = useNav();
  const { openSheet } = useSheet();
  const toasts = useV2Toasts();
  const [biometrics, setBiometrics] = useState(biometricsOn);

  const monogram = user.name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  const toggleBiometrics = (e) => {
    biometricsOn = e.target.checked;
    setBiometrics(biometricsOn);
  };

  const copyAccountId = () => {
    copyText(ACCOUNT_ID);
    toasts.show("Account ID copied");
  };

  const openBanks = () =>
    openSheet(() => <BankAccountsSheet onCopy={(msg) => toasts.show(msg)} />);

  const openAddresses = () =>
    openSheet(() => <AddressesSheet onCopy={(msg) => toasts.show(msg)} />);

  const openTwoFa = () => openSheet(() => <TwoFaSheet />);

  const openSupport = () =>
    openSheet(() => (
      <SupportSheet onLink={() => toasts.show("Opens in browser in the real app", "info")} />
    ));

  const openLegal = () =>
    openSheet(() => (
      <LegalSheet onLink={() => toasts.show("Opens in browser in the real app", "info")} />
    ));

  // Copy verbatim from the v1 security-settings capture (account-banks.md §4).
  const openKillSwitch = () =>
    openSheet(({ close }) => (
      <V2ConfirmSheet
        title="Activate Kill Switch"
        body="If you suspect your account has been compromised, you can activate Kill Switch to lock your account."
        confirmLabel="Activate Kill Switch"
        critical
        close={close}
        onConfirm={() => toasts.show("Kill switch is a demo action", "info")}
      />
    ));

  const openLogout = () =>
    openSheet(({ close }) => (
      <V2ConfirmSheet
        title="Log out"
        body="You can unlock the app again with your passcode."
        confirmLabel="Log out"
        critical
        close={close}
        onConfirm={() => nav.reset("v2/lock")}
      />
    ));

  return (
    <>
      <AppHeader title="Account" large />
      <div className="screen-scroll">
        <motion.div
          className="screen-pad v2account-body"
          variants={listContainer}
          initial="initial"
          animate="enter"
        >
          {/* Profile header card (§2.7.1) — chevron pushes profile detail */}
          <motion.button
            type="button"
            variants={listItem}
            {...pressable}
            className="v2account-profile"
            onClick={() => nav.push("v2/account/profile")}
          >
            <span className="v2account-profile__avatar" aria-hidden="true">{monogram}</span>
            <span className="v2account-profile__id">
              <span className="v2account-profile__name">{user.name}</span>
              <span className="v2account-profile__email">{user.email}</span>
              <V2Tag tone="mint">{user.status}</V2Tag>
            </span>
            <span className="material-symbols-rounded v2account-profile__chev" aria-hidden="true">
              chevron_right
            </span>
          </motion.button>

          {/* Payments (§2.7.2) */}
          <motion.section variants={listItem}>
            <div className="v2account-eyebrow">Payments</div>
            <div className="v2account-group v2-card">
              <Row
                icon="account_balance"
                label="Bank accounts"
                trailing={<span className="v2account-row__value">{banks.linked.length}</span>}
                chevron
                onPress={openBanks}
              />
              <Row
                icon="wallet"
                label="Blockchain addresses"
                trailing={
                  <span className="v2account-row__value">{blockchainAddresses.linked.length}</span>
                }
                chevron
                onPress={openAddresses}
              />
            </div>
          </motion.section>

          {/* Security (§2.7.2 + kill switch from the v1 security capture) */}
          <motion.section variants={listItem}>
            <div className="v2account-eyebrow">Security</div>
            <div className="v2account-group v2-card">
              <Row
                icon="lock"
                label="Passcode"
                chevron
                onPress={() => toasts.show("Passcode change is a demo action", "info")}
              />
              <Row
                icon="fingerprint"
                label="Biometrics"
                trailing={
                  <Switch checked={biometrics} onChange={toggleBiometrics} aria-label="Biometrics" />
                }
              />
              <Row
                icon="verified_user"
                label="Two-factor authentication"
                trailing={
                  <span className="v2account-row__value v2account-row__value--mint">
                    <span className="material-symbols-rounded" aria-hidden="true">check_circle</span>
                    On
                  </span>
                }
                onPress={openTwoFa}
              />
              <Row
                icon="warning"
                iconClass="v2account-row__icon--critical"
                label="Kill switch"
                labelClass="v2account-row__label--critical"
                chevron
                onPress={openKillSwitch}
              />
            </div>
          </motion.section>

          {/* About (§2.7.2–3, Mindvalley mixed-row pattern) */}
          <motion.section variants={listItem}>
            <div className="v2account-eyebrow">About</div>
            <div className="v2account-group v2-card">
              <Row icon="help" label="Support" chevron onPress={openSupport} />
              <Row icon="description" label="Legal" chevron onPress={openLegal} />
              <Row
                icon="badge"
                label="Account ID"
                trailing={
                  <>
                    <span className="v2account-row__value v2account-row__value--mono">
                      {ACCOUNT_ID}
                    </span>
                    <span
                      className="material-symbols-rounded v2account-row__copy"
                      aria-hidden="true"
                    >
                      content_copy
                    </span>
                  </>
                }
                onPress={copyAccountId}
              />
              <Row
                icon="info"
                label="App version"
                trailing={
                  <span className="v2account-row__value v2account-row__value--mono">
                    {APP_VERSION}
                  </span>
                }
              />
            </div>
          </motion.section>

          {/* Log out (§2.7.4) — standalone card, critical tint, no icon */}
          <motion.button
            type="button"
            variants={listItem}
            {...pressable}
            className="v2account-logout"
            onClick={openLogout}
          >
            Log out
          </motion.button>
        </motion.div>
      </div>
      <V2ToastStack items={toasts.items} dismiss={toasts.dismiss} />
    </>
  );
}
