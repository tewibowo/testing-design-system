/* ────────────────────────────────────────────────
 * ANIMATION STORYBOARD — Account tab
 *     0ms   header + profile card already placed (tab crossfade is the shell's)
 *    40ms   active panel's list rows fade + rise, staggered 50ms apart
 *   tab tap  outgoing panel fades (130ms), incoming crossfades up (200ms)
 *   verify/delete  row tag / Verify Now swap via popLayout, exits faster
 * ──────────────────────────────────────────────── */

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNav } from "@app/nav/Navigator.jsx";
import { useSheet } from "@app/nav/Sheet.jsx";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import {
  listContainer,
  listItem,
  pressable,
  tabContent,
  DUR,
  EASE_BRAND
} from "@app/motion/presets.js";
import { user, blockchainAddresses } from "@app/data/db.js";
import { Tabs } from "@ds/components/Tabs/Tabs.jsx";
import { Tag } from "@ds/components/Tag/Tag.jsx";
import { Button } from "@ds/components/Button/Button.jsx";
import { IconButton } from "@ds/components/IconButton/IconButton.jsx";
import { Copybox } from "@ds/components/Copybox/Copybox.jsx";
import { AssetMark } from "@ds/components/AssetMark/AssetMark.jsx";
import { LinkButton } from "@ds/components/LinkButton/LinkButton.jsx";
import { Logo } from "@ds/components/Logo/Logo.jsx";
import { Pagination } from "@ds/components/Pagination/Pagination.jsx";
import { useBanks, removeBank } from "./bankStore.js";
import { ConfirmSheet, StatusTag, ToastStack, useToasts } from "./parts.jsx";
import "./account.css";

const TAB_ITEMS = [
  { id: "banks", label: "Bank Accounts" },
  { id: "addresses", label: "Blockchain Addresses" },
  { id: "security", label: "Security Settings" }
];

const QUICK_EXIT = { opacity: 0, transition: { duration: 0.13, ease: EASE_BRAND } };

export function AccountTab() {
  const nav = useNav();
  const { openSheet } = useSheet();
  const toasts = useToasts();
  const banks = useBanks();
  const [tab, setTab] = useState("banks");

  /* ── sheet + toast actions ─────────────────────────────── */

  const contactSupport = () =>
    toasts.show({
      tone: "info",
      title: "Customer Support",
      message: "Support chat opens in the live app."
    });

  const editBank = (bank) =>
    toasts.show({
      tone: "info",
      title: "Edit bank account",
      message: `Details for ${bank.name} can only be changed by Customer Support.`
    });

  const deleteBank = (bank) =>
    openSheet(({ close }) => (
      <ConfirmSheet
        title="Delete bank account"
        body={`${bank.name} (${bank.account}) will be removed from your linked bank accounts.`}
        confirmLabel="Delete"
        critical
        close={close}
        onConfirm={() => {
          removeBank(bank.id);
          toasts.show({
            title: "Bank account removed",
            message: `${bank.name} is no longer linked.`
          });
        }}
      />
    ));

  const removeAddress = (addr) =>
    openSheet(({ close }) => (
      <ConfirmSheet
        title={addr.status === "Verified" ? `Unlink ${addr.provider}` : "Delete address"}
        body={`${addr.provider} will no longer be linked to your StraitsX account.`}
        confirmLabel={addr.status === "Verified" ? "Unlink" : "Delete"}
        critical
        close={close}
        onConfirm={() =>
          toasts.show({
            tone: "info",
            title: addr.status === "Verified" ? "Address unlinked" : "Address deleted",
            message: "Address removal is mocked in this prototype."
          })
        }
      />
    ));

  const managePassword = () =>
    openSheet(({ close }) => (
      <ConfirmSheet
        title="Manage Password"
        body={`We'll send a password reset link to ${user.email}.`}
        confirmLabel="Send reset link"
        close={close}
        onConfirm={() =>
          toasts.show({
            title: "Reset link sent",
            message: `Check ${user.email} for instructions.`
          })
        }
      />
    ));

  const setUp2fa = () =>
    openSheet(({ close }) => (
      <ConfirmSheet
        title="Set Up 2FA"
        body="Two-factor authentication is already enabled with your authenticator app. Reconfiguring will invalidate your current setup."
        confirmLabel="Reconfigure 2FA"
        close={close}
        onConfirm={() =>
          toasts.show({
            tone: "info",
            title: "2FA setup",
            message: "2FA reconfiguration is mocked in this prototype."
          })
        }
      />
    ));

  const activateKillSwitch = () =>
    openSheet(({ close }) => (
      <ConfirmSheet
        title="Activate Kill Switch"
        body="If you suspect your account has been compromised, you can activate Kill Switch to lock your account."
        confirmLabel="Activate Kill Switch"
        critical
        close={close}
        onConfirm={() =>
          toasts.show({
            tone: "critical",
            title: "Kill Switch activated",
            message: "Account locking is mocked in this prototype."
          })
        }
      />
    ));

  const logOut = () =>
    openSheet(({ close }) => (
      <ConfirmSheet
        title="Log out"
        body="You'll need to sign in again to access your StraitsX account."
        confirmLabel="Log out"
        critical
        close={close}
        onConfirm={() => nav.reset("auth/login")}
      />
    ));

  /* ── render ────────────────────────────────────────────── */

  return (
    <>
      <AppHeader title="My Account" large />
      <div className="screen-scroll">
        <div className="screen-pad account-tab">
          <ProfileCard onSupport={contactSupport} />

          <Tabs
            className="account-tabs"
            variant="secondary"
            fill
            items={TAB_ITEMS}
            activeTab={tab}
            onTabChange={setTab}
          />

          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={tab}
              className="account-panel"
              initial={tabContent.initial}
              animate={tabContent.enter}
              exit={tabContent.exit}
            >
              {tab === "banks" && (
                <BanksPanel
                  banks={banks}
                  onAdd={() => nav.push("account/banks-add")}
                  onVerify={(bank) => nav.push("account/banks-verify", { bank: bank.name })}
                  onEdit={editBank}
                  onDelete={deleteBank}
                />
              )}
              {tab === "addresses" && (
                <AddressesPanel
                  onAdd={() => nav.push("blockchain/add")}
                  onVerify={(addr) => nav.push("blockchain/verify", { id: addr.id })}
                  onRemove={removeAddress}
                  onLink={(label) =>
                    toasts.show({
                      tone: "info",
                      title: label,
                      message: "Help center articles open in the live app."
                    })
                  }
                />
              )}
              {tab === "security" && (
                <SecurityPanel
                  onPassword={managePassword}
                  on2fa={setUp2fa}
                  onKillSwitch={activateKillSwitch}
                  onLogOut={logOut}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <ToastStack items={toasts.items} dismiss={toasts.dismiss} />
    </>
  );
}

/* ── Profile card (spec §1) ──────────────────────────────── */

function ProfileCard({ onSupport }) {
  return (
    <div className="account-card account-profile">
      <Logo size={120} className="account-profile__logo" />
      <div className="account-profile__name">{user.name}</div>
      <div className="account-profile__rows">
        <div className="account-profile__row">
          <span className="account-profile__label">Email</span>
          <span className="account-profile__value">{user.email}</span>
        </div>
        <div className="account-profile__row">
          <span className="account-profile__label">Phone Number</span>
          <span className="account-profile__value">{user.phone}</span>
        </div>
        <div className="account-profile__row">
          <span className="account-profile__label">Status</span>
          <Tag tone="positive" appearance="outlined" size="small">{user.status}</Tag>
        </div>
      </div>
      <div className="account-profile__note">
        <span className="material-symbols-rounded account-info-ic">info</span>
        <span>
          If you'd like to change your profile information, please contact{" "}
          <LinkButton onClick={onSupport}>Customer Support.</LinkButton>
        </span>
      </div>
    </div>
  );
}

/* ── Bank Accounts panel (spec §2) ───────────────────────── */

function BanksPanel({ banks, onAdd, onVerify, onEdit, onDelete }) {
  return (
    <section>
      <div className="account-section-head">
        <h2 className="account-h2">Bank Accounts</h2>
        <Button variant="secondary" size="sm" onClick={onAdd}>Add New</Button>
      </div>
      <motion.div
        className="account-list"
        variants={listContainer}
        initial="initial"
        animate="enter"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {banks.map((bank) => (
            <BankRow
              key={bank.id}
              bank={bank}
              onVerify={() => onVerify(bank)}
              onEdit={() => onEdit(bank)}
              onDelete={() => onDelete(bank)}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function BankRow({ bank, onVerify, onEdit, onDelete }) {
  return (
    <motion.div
      className="account-card account-bank"
      variants={listItem}
      layout
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.16, ease: EASE_BRAND } }}
    >
      <div className="account-bank__top">
        <span className="material-symbols-rounded account-bank__glyph">account_balance</span>
        <div className="account-bank__actions">
          <AnimatePresence mode="popLayout" initial={false}>
            {bank.status === "Unverified" && (
              <motion.span key="verify" style={{ display: "inline-flex" }} exit={QUICK_EXIT}>
                <Button variant="primary" size="sm" onClick={onVerify}>Verify Now</Button>
              </motion.span>
            )}
          </AnimatePresence>
          <IconButton icon="edit" variant="outline" shape="circle" size="sm" label="Edit" onClick={onEdit} />
          <IconButton icon="delete" variant="outline" shape="circle" size="sm" label="Delete" onClick={onDelete} />
        </div>
      </div>
      <div className="account-bank__bottom">
        <div className="account-bank__id">
          <span className="account-bank__name">{bank.name}</span>
          <span className="account-bank__num">{bank.account}</span>
        </div>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={bank.status}
            style={{ display: "inline-flex" }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE_BRAND } }}
            exit={QUICK_EXIT}
          >
            <StatusTag status={bank.status} />
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ── Blockchain Addresses panel (spec §3) ────────────────── */

const ADDRESS_MARKS = { solana: "SOLANA", metamask: "METAMASK" };

function AddressesPanel({ onAdd, onVerify, onRemove, onLink }) {
  return (
    <section>
      <div className="account-section-head">
        <h2 className="account-h2">My Addresses</h2>
        <Button variant="secondary" size="sm" onClick={onAdd}>Add New</Button>
      </div>
      <p className="account-info-line">
        <span className="material-symbols-rounded account-info-ic">info</span>
        <span>
          Learn more about{" "}
          <LinkButton onClick={() => onLink("Types of addresses")}>
            different types of addresses
          </LinkButton>{" "}
          and how to{" "}
          <LinkButton onClick={() => onLink("Verifying an address")}>
            verify an address.
          </LinkButton>
        </span>
      </p>
      <motion.div
        className="account-list"
        variants={listContainer}
        initial="initial"
        animate="enter"
      >
        {blockchainAddresses.linked.map((addr) => (
          <AddressCard
            key={addr.id}
            addr={addr}
            onVerify={() => onVerify(addr)}
            onRemove={() => onRemove(addr)}
          />
        ))}
        <motion.div className="account-pagination" variants={listItem}>
          <Pagination page={1} totalPages={1} />
        </motion.div>
      </motion.div>
    </section>
  );
}

function AddressCard({ addr, onVerify, onRemove }) {
  const verified = addr.status === "Verified";
  return (
    <motion.div className="account-card account-addr" variants={listItem}>
      <div className="account-addr__head">
        <AssetMark asset={ADDRESS_MARKS[addr.id] || addr.provider} size={40} />
        <div className="account-addr__id">
          <span className="account-addr__name">{addr.provider}</span>
          <span className="account-addr__sub">{addr.subtitle}</span>
        </div>
        <div className="account-addr__actions">
          {!verified && (
            <Button variant="primary" size="sm" onClick={onVerify}>Verify Now</Button>
          )}
          <IconButton
            icon={verified ? "link_off" : "delete"}
            variant="outline"
            shape="circle"
            size="sm"
            label={verified ? "Unlink" : "Delete"}
            onClick={onRemove}
          />
        </div>
      </div>
      <span className="account-label">Network</span>
      <div className="account-addr__netrow">
        <span className="account-netcluster">
          {addr.networkAssetIds.map((id) => (
            <AssetMark key={id} asset={id} size={20} />
          ))}
        </span>
        <span className="account-addr__netnames">{addr.networks.join(", ")}</span>
        <StatusTag status={addr.status} />
      </div>
      <Copybox value={addr.address} truncate buttonVariant="icon" size="sm" />
    </motion.div>
  );
}

/* ── Security Settings panel (spec §4) ───────────────────── */

function SecurityPanel({ onPassword, on2fa, onKillSwitch, onLogOut }) {
  return (
    <motion.section
      className="account-list"
      variants={listContainer}
      initial="initial"
      animate="enter"
    >
      <motion.div className="account-card account-security" variants={listItem}>
        <div className="account-security__head">
          <h3 className="account-security__title">Password Settings</h3>
        </div>
        <p className="account-security__body">
          Maintain account security by controlling and updating your password.
        </p>
        <div className="account-security__foot">
          <Button variant="primary" onClick={onPassword}>Manage Password</Button>
        </div>
      </motion.div>

      <motion.div className="account-card account-security" variants={listItem}>
        <div className="account-security__head">
          <h3 className="account-security__title">2FA Settings</h3>
          <Tag tone="positive" appearance="outlined" size="small" icon="check">
            2FA Is Enabled
          </Tag>
        </div>
        <p className="account-security__body">
          Enhance security with Two-Factor Authentication (2FA). Quick, easy, and an
          extra layer of protection for your account.
        </p>
        <div className="account-security__foot">
          <Button variant="primary" onClick={on2fa}>Set Up 2FA</Button>
        </div>
      </motion.div>

      <motion.div className="account-card account-security" variants={listItem}>
        <div className="account-security__head">
          <h3 className="account-security__title">Kill Switch</h3>
        </div>
        <p className="account-security__body">
          If you suspect your account has been compromised, you can activate Kill
          Switch to lock your account.
        </p>
        <div className="account-security__foot">
          <Button variant="primary" className="account-btn--critical" onClick={onKillSwitch}>
            Activate Kill Switch
          </Button>
        </div>
      </motion.div>

      <motion.button
        type="button"
        className="account-logout"
        variants={listItem}
        {...pressable}
        onClick={onLogOut}
      >
        <span className="material-symbols-rounded" aria-hidden="true">logout</span>
        Log out
      </motion.button>
    </motion.section>
  );
}
