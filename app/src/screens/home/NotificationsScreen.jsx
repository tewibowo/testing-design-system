/* ────────────────────────────────────────────────
 * ANIMATION STORYBOARD — Notification center
 *    0ms   screen slides in (stack push, handled by shell)
 *   40ms   notification rows stagger in, 50ms apart (fade + 12px rise)
 *   tap    filter chip → selection pill morphs to the new chip (layoutId);
 *          outgoing rows pop out (popLayout, fast fade), incoming rows
 *          fade in as remaining rows reflow immediately
 * ──────────────────────────────────────────────── */
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import { listContainer, listItem, pressable, DUR, EASE_BRAND } from "@app/motion/presets.js";
import { notifications } from "@app/data/db.js";
import { EmptyState } from "@ds/components/EmptyState/EmptyState.jsx";
import "./home.css";

// Category glyph treatment (twofa-notifications spec, Flow B):
// System Maintenance → white wrench on a dark filled circle;
// Important → filled warning on a warm surface; Product Update → dark send.
const ICON_CLASS = {
  build: "home-notif__icon--dark",
  warning: "home-notif__icon--warning",
  send: "home-notif__icon--plain"
};

export function NotificationsScreen() {
  const [filter, setFilter] = useState(notifications.categories[0]); // "All"

  const items =
    filter === "All"
      ? notifications.items
      : notifications.items.filter((n) => n.category === filter);

  return (
    <div className="home-wrap home-wrap--white">
      <AppHeader title="Notifications" back />

      {/* Filter chips — horizontal scroll, animated selection pill */}
      <div className="home-chips" role="tablist" aria-label="Notification categories">
        {notifications.categories.map((c) => {
          const active = filter === c;
          return (
            <motion.button
              key={c}
              {...pressable}
              role="tab"
              aria-selected={active}
              className={`home-chip${active ? " is-active" : ""}`}
              onClick={() => setFilter(c)}
            >
              {active && (
                <motion.span
                  layoutId="home-chip-pill"
                  className="home-chip__pill"
                  transition={{ duration: DUR.slow, ease: EASE_BRAND }}
                />
              )}
              <span className="home-chip__label">{c}</span>
            </motion.button>
          );
        })}
      </div>

      <div className="screen-scroll">
        <motion.div
          className="screen-pad home-notifs"
          variants={listContainer}
          initial="initial"
          animate="enter"
        >
          {/* No `initial={false}` here — rows must stagger in on mount;
              popLayout then handles filter swaps. */}
          <AnimatePresence mode="popLayout">
            {items.length > 0 ? (
              items.map((n) => (
                <motion.article
                  key={n.id}
                  layout
                  variants={listItem}
                  exit={{ opacity: 0, transition: { duration: 0.13, ease: EASE_BRAND } }}
                  className="home-notif"
                >
                  <span
                    className={`home-notif__icon ${ICON_CLASS[n.icon] || "home-notif__icon--plain"}`}
                    aria-hidden="true"
                  >
                    <span className="material-symbols-rounded">{n.icon}</span>
                  </span>
                  <div className="home-notif__main">
                    <div className="home-notif__meta">
                      <span className={n.category === "Important" ? "is-critical" : ""}>
                        {n.category}
                      </span>
                      <span>{n.date}</span>
                    </div>
                    <h3 className="home-notif__title">
                      {n.title}
                      {!n.read && <span className="home-notif__dot" aria-label="Unread" />}
                    </h3>
                    <p className="home-notif__body">{n.body}</p>
                  </div>
                </motion.article>
              ))
            ) : (
              <motion.div
                key={`empty-${filter}`}
                className="home-notifs__empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE_BRAND } }}
                exit={{ opacity: 0, transition: { duration: 0.13, ease: EASE_BRAND } }}
              >
                <EmptyState title="No notifications" sub="You're all caught up." />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
