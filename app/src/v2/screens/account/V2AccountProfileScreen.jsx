// Profile detail push (§2.7.1: profile card chevron pushes profile detail).
// Hero monogram + verification tag, then a teal attribute card with the
// user's identity fields from db and the copyable Account ID row.

import { motion } from "motion/react";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import { listContainer, listItem, pressable } from "@app/motion/presets.js";
import { user } from "@app/data/db.js";
import {
  ACCOUNT_ID,
  V2Tag,
  copyText,
  useV2Toasts,
  V2ToastStack
} from "./parts.jsx";
import "./v2account-tab.css";

export function V2AccountProfileScreen() {
  const toasts = useV2Toasts();

  const monogram = user.name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  const copyAccountId = () => {
    copyText(ACCOUNT_ID);
    toasts.show("Account ID copied");
  };

  return (
    <>
      <AppHeader
        title="Profile"
        back
        right={
          <motion.button
            type="button"
            {...pressable}
            className="v2account-iconbtn"
            aria-label="Edit profile"
            onClick={() => toasts.show("Profile editing is a demo action", "info")}
          >
            <span className="material-symbols-rounded" aria-hidden="true">edit</span>
          </motion.button>
        }
      />
      <div className="screen-scroll">
        <motion.div
          className="screen-pad v2account-body"
          variants={listContainer}
          initial="initial"
          animate="enter"
        >
          <motion.div variants={listItem} className="v2account-hero">
            <span className="v2account-hero__avatar" aria-hidden="true">{monogram}</span>
            <div className="v2account-hero__name">{user.name}</div>
            <div className="v2account-hero__type">{user.accountType}</div>
            <V2Tag tone="mint">{user.status}</V2Tag>
          </motion.div>

          <motion.div variants={listItem} className="v2account-group v2-card">
            <div className="v2account-attr">
              <span className="v2account-attr__label">Email</span>
              <span className="v2account-attr__value">{user.email}</span>
            </div>
            <div className="v2account-attr">
              <span className="v2account-attr__label">Phone</span>
              <span className="v2account-attr__value v2account-attr__value--mono">
                {user.phone}
              </span>
            </div>
            <div className="v2account-attr">
              <span className="v2account-attr__label">Account type</span>
              <span className="v2account-attr__value">{user.accountType}</span>
            </div>
            <div className="v2account-attr">
              <span className="v2account-attr__label">Account ID</span>
              <span className="v2account-attr__value v2account-attr__value--mono">
                {ACCOUNT_ID}
                <button
                  type="button"
                  className="v2account-copybtn"
                  aria-label="Copy account ID"
                  onClick={copyAccountId}
                >
                  <span className="material-symbols-rounded">content_copy</span>
                </button>
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <V2ToastStack items={toasts.items} dismiss={toasts.dismiss} />
    </>
  );
}
