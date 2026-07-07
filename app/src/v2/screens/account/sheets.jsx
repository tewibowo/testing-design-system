// Detail sheets for the v2 Account tab (§2.7 + Slopes sheet-first pattern):
// bank accounts, blockchain addresses, 2FA status, support and legal links.
// Each renders inside the shared SheetProvider panel (teal, 20px top radius).

import { motion } from "motion/react";
import { AssetMark } from "@ds/components/AssetMark/AssetMark.jsx";
import { listContainer, listItem, pressable } from "@app/motion/presets.js";
import { banks, blockchainAddresses, truncAddr } from "@app/data/db.js";
import { V2StatusTag, copyText } from "./parts.jsx";
import "./v2account-sheets.css";

/** Linked bank accounts — name, status tag, copyable account number. */
export function BankAccountsSheet({ onCopy }) {
  return (
    <motion.div variants={listContainer} initial="initial" animate="enter">
      <div className="v2account-sheet__title">Bank accounts</div>
      <p className="v2account-sheet__sub">Linked accounts for deposits and withdrawals.</p>
      {banks.linked.map((bank) => (
        <motion.div key={bank.account} variants={listItem} className="v2account-item">
          <div className="v2account-item__head">
            <span className="v2account-item__name">{bank.name}</span>
            <V2StatusTag status={bank.status} />
          </div>
          <div className="v2account-copyrow">
            <span className="v2account-copyrow__value">{bank.account}</span>
            <button
              type="button"
              className="v2account-copybtn"
              aria-label="Copy account number"
              onClick={() => {
                copyText(bank.account);
                onCopy("Account number copied");
              }}
            >
              <span className="material-symbols-rounded">content_copy</span>
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/** Linked blockchain addresses — truncated mono address, networks, status. */
export function AddressesSheet({ onCopy }) {
  return (
    <motion.div variants={listContainer} initial="initial" animate="enter">
      <div className="v2account-sheet__title">Blockchain addresses</div>
      <p className="v2account-sheet__sub">Verified addresses can withdraw directly on-chain.</p>
      {blockchainAddresses.linked.map((addr) => (
        <motion.div key={addr.id} variants={listItem} className="v2account-item">
          <div className="v2account-item__head">
            <span className="v2account-item__name">{addr.provider}</span>
            <V2StatusTag status={addr.status} />
          </div>
          <div className="v2account-item__sub">{addr.subtitle}</div>
          <div className="v2account-copyrow">
            <span className="v2account-copyrow__value">{truncAddr(addr.address)}</span>
            <button
              type="button"
              className="v2account-copybtn"
              aria-label="Copy address"
              onClick={() => {
                copyText(addr.address);
                onCopy("Address copied");
              }}
            >
              <span className="material-symbols-rounded">content_copy</span>
            </button>
          </div>
          <div className="v2account-networks">
            <span className="v2account-networks__marks">
              {addr.networkAssetIds.slice(0, 4).map((id) => (
                <AssetMark key={id} asset={id} size={18} />
              ))}
            </span>
            <span className="v2account-networks__count">
              {addr.networks.length} {addr.networks.length === 1 ? "network" : "networks"}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/** 2FA status sheet — body copy verbatim from the v1 security spec. */
export function TwoFaSheet() {
  return (
    <div>
      <div className="v2account-sheet__title">Two-factor authentication</div>
      <div className="v2account-2fa">
        <span className="material-symbols-rounded" aria-hidden="true">check_circle</span>
        2FA is enabled
      </div>
      <p className="v2account-sheet__sub">
        Enhance security with Two-Factor Authentication (2FA). Quick, easy, and an
        extra layer of protection for your account.
      </p>
    </div>
  );
}

function LinkRow({ icon, label, onPress }) {
  return (
    <motion.button type="button" variants={listItem} {...pressable} className="v2account-linkrow" onClick={onPress}>
      <span className="v2account-linkrow__icon">
        <span className="material-symbols-rounded" aria-hidden="true">{icon}</span>
      </span>
      <span className="v2account-linkrow__label">{label}</span>
      <span className="material-symbols-rounded v2account-linkrow__chev" aria-hidden="true">
        chevron_right
      </span>
    </motion.button>
  );
}

/** Support links — stubs; each row toasts (links live outside the demo). */
export function SupportSheet({ onLink }) {
  return (
    <motion.div variants={listContainer} initial="initial" animate="enter">
      <div className="v2account-sheet__title">Support</div>
      <p className="v2account-sheet__sub">Get help with your StraitsX account.</p>
      <LinkRow icon="help" label="Help centre" onPress={onLink} />
      <LinkRow icon="description" label="Submit a request" onPress={onLink} />
    </motion.div>
  );
}

/** Legal documents — stubs; each row toasts. */
export function LegalSheet({ onLink }) {
  return (
    <motion.div variants={listContainer} initial="initial" animate="enter">
      <div className="v2account-sheet__title">Legal</div>
      <p className="v2account-sheet__sub">Policies that govern your use of StraitsX.</p>
      <LinkRow icon="description" label="Terms of service" onPress={onLink} />
      <LinkRow icon="lock" label="Privacy policy" onPress={onLink} />
    </motion.div>
  );
}
