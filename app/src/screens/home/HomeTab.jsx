/* ────────────────────────────────────────────────
 * ANIMATION STORYBOARD — Home dashboard entrance
 *    0ms   screen mounts (tab root, no push transition)
 *   40ms   sections begin staggering in (50ms apart):
 *          balance → quick actions → assets card → OTC banner → legal
 *    ↳     balance figure counts up 0 → total (Money odometer, 600ms)
 *    ↳     asset rows stagger 50ms inside the card as it enters
 *  later   changing the display currency odometers the total + every
 *          ≈-conversion to the new denomination
 * ──────────────────────────────────────────────── */
import { useState } from "react";
import { motion } from "motion/react";
import { useNav } from "@app/nav/Navigator.jsx";
import { useSheet } from "@app/nav/Sheet.jsx";
import { Money } from "@app/ui/Money.jsx";
import { listContainer, listItem, pressable } from "@app/motion/presets.js";
import { balances, notifications, otc, fiatCurrencies, assetDecimals, fmtMoney } from "@app/data/db.js";
import { useBalances } from "@app/data/walletStore.js";
import { useDisplayCurrency, setDisplayCurrency } from "@app/data/currencyStore.js";
import { valueInSgd } from "@app/screens/mintswap/rates.js";
import { openTransferIn } from "@app/screens/transfers/TransferInSheet.jsx";
import { openTransferOut } from "@app/screens/transfers/TransferOutSheet.jsx";
import { armKeyboard } from "@app/ui/keyboardRelay.js";
import { Logo } from "@ds/components/Logo/Logo.jsx";
import { AssetMark } from "@ds/components/AssetMark/AssetMark.jsx";
import { EstimatedBalance } from "@ds/components/EstimatedBalance/EstimatedBalance.jsx";
import { OtcBanner } from "@ds/components/OtcBanner/OtcBanner.jsx";
import { IconButton } from "@ds/components/IconButton/IconButton.jsx";
import { useHomeToast } from "./useHomeToast.jsx";
import "./home.css";

// Transfer In/Out open as step-by-step bottom sheets (design feedback);
// Swap and Mint remain pushed screens.
const QUICK_ACTIONS = [
  { id: "transfer-in", label: "Transfer In", icon: "add", sheet: openTransferIn },
  { id: "transfer-out", label: "Transfer Out", icon: "arrow_outward", sheet: openTransferOut },
  { id: "swap", label: "Swap", icon: "swap_vert", route: "mintswap/swap" },
  { id: "mint", label: "Mint", icon: "toll", route: "mintswap/mint" }
];

// Mini network-mark order for the asset rows. db only records how many
// mini icons each row shows (`networkIconCount`) — the concrete marks are
// drawn from the supported-network order; USDC's single icon is the purple
// Polygon mark per the dashboard capture.
const NETWORK_ORDER = ["ETHEREUM", "POLYGON", "AVALANCHE", "ARBITRUM", "BNB", "BASE", "SOLANA"];
const rowNetworks = (row) =>
  row.asset === "USDC" ? ["POLYGON"] : NETWORK_ORDER.slice(0, row.networkIconCount);

// My Assets card tabs (design feedback: replaces the refresh button).
const ASSET_TABS = [
  { id: "stable", label: "Stablecoins" },
  { id: "fiat", label: "Fiat" }
];

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

/* ── Display-currency picker (bottom sheet) ── */

function CurrencySheet({ activeCode, onSelect }) {
  return (
    <motion.div
      className="home-cursheet"
      variants={listContainer}
      initial="initial"
      animate="enter"
    >
      <motion.h3 variants={listItem} className="home-cursheet__title">
        Show balances in
      </motion.h3>
      {fiatCurrencies.map((c) => (
        <motion.button
          key={c.code}
          type="button"
          variants={listItem}
          {...pressable}
          className={"home-currow" + (c.code === activeCode ? " is-selected" : "")}
          onClick={() => onSelect(c.code)}
        >
          <AssetMark asset={c.code} size={32} label={c.code === "EUR" ? "€" : c.code === "JPY" ? "¥" : undefined} />
          <span className="home-currow__id">
            <span className="home-currow__code">{c.code}</span>
            <span className="home-currow__name">{c.name}</span>
          </span>
          {c.code === activeCode && (
            <span className="material-symbols-rounded home-currow__check" aria-hidden="true">
              check
            </span>
          )}
        </motion.button>
      ))}
    </motion.div>
  );
}

export function HomeTab({ unreadNotifications = unreadFromDb }) {
  const nav = useNav();
  const { openSheet } = useSheet();
  const [assetTab, setAssetTab] = useState("stable");
  const [toastNode, showToast] = useHomeToast();
  const wallet = useBalances();
  const currency = useDisplayCurrency();

  // Everything is valued live: SGD value per unit (rates.js) × holdings,
  // then denominated in the selected display currency.
  const inDisplay = (assetId, amount) =>
    amount * valueInSgd(assetId) * currency.perSgd;
  const total = Object.entries(wallet).reduce(
    (sum, [id, amount]) => sum + inDisplay(id, amount),
    0
  );

  const pickCurrency = () =>
    openSheet(({ close }) => (
      <CurrencySheet
        activeCode={currency.code}
        onSelect={(code) => {
          setDisplayCurrency(code);
          close();
        }}
      />
    ));

  const rowActions = (assetId) => (
    <div className="home-asset__actions">
      <IconButton
        variant="outline"
        size="sm"
        icon="add"
        label={`Transfer in ${assetId}`}
        onClick={() => openTransferIn(openSheet, { asset: assetId })}
      />
      <IconButton
        variant="outline"
        size="sm"
        icon="arrow_outward"
        label={`Transfer out ${assetId}`}
        onClick={() => openTransferOut(openSheet, { asset: assetId })}
      />
    </div>
  );

  const approx = (assetId) =>
    `≈ ${fmtMoney(inDisplay(assetId, wallet[assetId] ?? 0), currency.decimals)} ${currency.code}`;

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
          {/* Estimated balance — odometer counts up on load and re-runs on
              currency change; the currency suffix is the picker trigger. */}
          <motion.section variants={listItem} className="home-balance">
            <EstimatedBalance
              amount={
                <Money value={total} decimals={currency.decimals} animateOnMount />
              }
              currency={
                <button
                  type="button"
                  className="home-currency"
                  aria-label={`Change display currency, currently ${currency.code}`}
                  onClick={pickCurrency}
                >
                  {currency.code}
                  <span className="material-symbols-rounded" aria-hidden="true">
                    expand_more
                  </span>
                </button>
              }
            />
          </motion.section>

          {/* Quick actions */}
          <motion.section variants={listItem} className="home-actions">
            {QUICK_ACTIONS.map((a) => (
              <motion.button
                key={a.id}
                {...pressable}
                className="home-action"
                onClick={() => {
                  // Arm inside the tap so iOS raises the keyboard for the
                  // amount field on the incoming swap screen.
                  if (a.id === "swap") armKeyboard("decimal");
                  if (a.sheet) a.sheet(openSheet);
                  else nav.push(a.route);
                }}
              >
                <span className="home-action__circle">
                  <span className="material-symbols-rounded">{a.icon}</span>
                </span>
                <span className="home-action__label">{a.label}</span>
              </motion.button>
            ))}
          </motion.section>

          {/* My Assets — Stablecoins | Fiat */}
          <motion.section variants={listItem} className="home-card home-assets">
            <div className="home-card__head">
              <span className="home-card__title">My Assets</span>
              <div className="home-seg" role="tablist" aria-label="Asset class">
                {ASSET_TABS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={assetTab === t.id}
                    className={"home-seg__btn" + (assetTab === t.id ? " is-active" : "")}
                    onClick={() => setAssetTab(t.id)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {assetTab === "stable" ? (
              <motion.ul
                key="stable"
                className="home-assets__list"
                variants={listContainer}
                initial="initial"
                animate="enter"
              >
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
                        value={wallet[row.asset] ?? 0}
                        decimals={2}
                      />
                      <span className="home-asset__fiat">{approx(row.asset)}</span>
                    </div>
                    {rowActions(row.asset)}
                  </motion.li>
                ))}
              </motion.ul>
            ) : (
              <motion.ul
                key="fiat"
                className="home-assets__list"
                variants={listContainer}
                initial="initial"
                animate="enter"
              >
                {balances.fiat.map((row) => (
                  <motion.li key={row.asset} variants={listItem} className="home-asset">
                    <AssetMark asset={row.asset} size={40} />
                    <div className="home-asset__id">
                      <span className="home-asset__symbol">{row.asset}</span>
                      <span className="home-asset__name">{row.name}</span>
                    </div>
                    <div className="home-asset__bal">
                      <Money
                        className="home-asset__amount"
                        value={wallet[row.asset] ?? 0}
                        decimals={assetDecimals(row.asset)}
                      />
                      <span className="home-asset__fiat">{approx(row.asset)}</span>
                    </div>
                    {rowActions(row.asset)}
                  </motion.li>
                ))}
              </motion.ul>
            )}
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
