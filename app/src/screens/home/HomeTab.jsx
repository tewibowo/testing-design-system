/* ────────────────────────────────────────────────
 * ANIMATION STORYBOARD — Home dashboard entrance
 *    0ms   screen mounts (tab root, no push transition)
 *   40ms   sections begin staggering in (50ms apart):
 *          balance → quick actions → assets card → OTC banner → legal
 *    ↳     balance figure counts up 0 → 30.58 (Money odometer, 600ms)
 *    ↳     asset rows stagger 50ms inside the card as it enters
 * ──────────────────────────────────────────────── */
import { useState } from "react";
import { motion } from "motion/react";
import { useNav } from "@app/nav/Navigator.jsx";
import { Money } from "@app/ui/Money.jsx";
import { listContainer, listItem, pressable, EASE_BRAND } from "@app/motion/presets.js";
import { balances, notifications, otc } from "@app/data/db.js";
import { Logo } from "@ds/components/Logo/Logo.jsx";
import { AssetMark } from "@ds/components/AssetMark/AssetMark.jsx";
import { EstimatedBalance } from "@ds/components/EstimatedBalance/EstimatedBalance.jsx";
import { OtcBanner } from "@ds/components/OtcBanner/OtcBanner.jsx";
import { IconButton } from "@ds/components/IconButton/IconButton.jsx";
import { useHomeToast } from "./useHomeToast.jsx";
import "./home.css";

const QUICK_ACTIONS = [
  { label: "Transfer In", icon: "add", route: "transfers/in" },
  { label: "Transfer Out", icon: "arrow_outward", route: "transfers/out" },
  { label: "Swap", icon: "swap_vert", route: "mintswap/swap" },
  { label: "Mint", icon: "toll", route: "mintswap/mint" }
];

// Mini network-mark order for the asset rows. db only records how many
// mini icons each row shows (`networkIconCount`) — the concrete marks are
// drawn from the supported-network order; USDC's single icon is the purple
// Polygon mark per the dashboard capture.
const NETWORK_ORDER = ["ETHEREUM", "POLYGON", "AVALANCHE", "ARBITRUM", "BNB", "BASE", "SOLANA"];
const rowNetworks = (row) =>
  row.asset === "USDC" ? ["POLYGON"] : NETWORK_ORDER.slice(0, row.networkIconCount);

// OTC banner body — verbatim from db, with the amount emphasised the way
// the dashboard renders it ("100,000 USD" bold, tabular).
function bannerBody() {
  const marker = "100,000 USD";
  const i = otc.banner.body.indexOf(marker);
  if (i === -1) return otc.banner.body;
  return (
    <>
      {otc.banner.body.slice(0, i)}
      <strong className="num">{marker}</strong>
      {otc.banner.body.slice(i + marker.length)}
    </>
  );
}

// Default unread badge count derives from db (RootTabs passes the same
// db-derived value as a prop). The captured panel shows every item read
// (spec: "screenshot shows no badge, so default 0/none is also acceptable"),
// so the badge stays hidden until db marks items unread.
const unreadFromDb = notifications.items.filter((n) => !n.read).length;

export function HomeTab({ unreadNotifications = unreadFromDb }) {
  const nav = useNav();
  const [spin, setSpin] = useState(0);
  const [toastNode, showToast] = useHomeToast();

  return (
    <div className="home-wrap">
      <header className="home-top">
        <Logo size={128} />
        <motion.button
          {...pressable}
          className="home-bell"
          aria-label={
            unreadNotifications > 0
              ? `Notifications, ${unreadNotifications} unread`
              : "Notifications"
          }
          onClick={() => nav.push("home/notifications")}
        >
          <span className="material-symbols-rounded">notifications</span>
          {unreadNotifications > 0 && (
            <span className="home-bell__badge">{unreadNotifications}</span>
          )}
        </motion.button>
      </header>

      <div className="screen-scroll">
        <motion.div
          className="screen-pad home-sections"
          variants={listContainer}
          initial="initial"
          animate="enter"
        >
          {/* Estimated balance — Money odometer counts up on first load */}
          <motion.section variants={listItem} className="home-balance">
            <EstimatedBalance
              amount={
                <Money
                  value={balances.estimated.amount}
                  decimals={2}
                  animateOnMount
                />
              }
              currency={balances.estimated.currency}
            />
          </motion.section>

          {/* Quick actions */}
          <motion.section variants={listItem} className="home-actions">
            {QUICK_ACTIONS.map((a) => (
              <motion.button
                key={a.route}
                {...pressable}
                className="home-action"
                onClick={() => nav.push(a.route)}
              >
                <span className="home-action__circle">
                  <span className="material-symbols-rounded">{a.icon}</span>
                </span>
                <span className="home-action__label">{a.label}</span>
              </motion.button>
            ))}
          </motion.section>

          {/* My Assets */}
          <motion.section variants={listItem} className="home-card home-assets">
            <div className="home-card__head">
              <span className="home-card__title">My Assets</span>
              <motion.button
                className="home-refresh"
                aria-label="Refresh"
                onClick={() => setSpin((s) => s + 360)}
                animate={{ rotate: spin }}
                transition={{ duration: 0.5, ease: EASE_BRAND }}
              >
                <span className="material-symbols-rounded">refresh</span>
              </motion.button>
            </div>
            <motion.ul className="home-assets__list" variants={listContainer}>
              {balances.assets.map((row) => (
                <motion.li key={row.asset} variants={listItem} className="home-asset">
                  <AssetMark asset={row.asset} size={40} />
                  <div className="home-asset__id">
                    <span className="home-asset__symbol">{row.asset}</span>
                    <span className="home-asset__nets">
                      {rowNetworks(row).map((n) => (
                        <span className="home-asset__net" key={n}>
                          <AssetMark asset={n} size={16} />
                        </span>
                      ))}
                      {row.networkOverflow && (
                        <span className="home-asset__more">{row.networkOverflow}</span>
                      )}
                      {row.isNew && <span className="home-asset__new">NEW</span>}
                    </span>
                  </div>
                  <div className="home-asset__bal">
                    <Money
                      className="home-asset__amount"
                      value={Number(row.balance)}
                      decimals={2}
                    />
                    <span className="home-asset__fiat">≈ {row.fiat} SGD</span>
                  </div>
                  <div className="home-asset__actions">
                    <IconButton
                      variant="outline"
                      size="sm"
                      icon="add"
                      label={`Transfer in ${row.asset}`}
                      onClick={() => nav.push("transfers/in", { asset: row.asset })}
                    />
                    <IconButton
                      variant="outline"
                      size="sm"
                      icon="arrow_outward"
                      label={`Transfer out ${row.asset}`}
                      onClick={() => nav.push("transfers/out", { asset: row.asset })}
                    />
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.section>

          {/* OTC Desk banner */}
          <motion.section variants={listItem} className="home-otcbanner">
            <OtcBanner
              title={otc.banner.title}
              body={bannerBody()}
              ctaLabel={otc.banner.cta}
              onCtaClick={() => nav.push("home/otc")}
            />
          </motion.section>

          {/* Legal footer (verbatim, transfers spec §0) */}
          <motion.footer variants={listItem} className="home-legal">
            <p>XSGD, XUSD and XIDR are issued by StraitsX.</p>
            <p>
              “STRAITSX”, “XSGD” and “XIDR” and all other URLs, logos and
              trademarks related to the StraitsX Services are either trademarks
              or registered trademarks of StraitsX or its licensors.
            </p>
            <p>
              StraitsX is the trading name of the StraitsX Group of Companies
              and its affiliated entities.
            </p>
            <p>
              Important Risk Warnings Regarding Digital Payment Tokens:{" "}
              <button
                type="button"
                className="home-link"
                onClick={() => showToast("Opens in browser")}
              >
                Learn More
              </button>
            </p>
          </motion.footer>
        </motion.div>
      </div>

      {toastNode}
    </div>
  );
}
