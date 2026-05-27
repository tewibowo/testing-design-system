import React from "react";
import "./TopBar.css";

/**
 * Dashboard top bar — notifications bell + user identity block.
 */
export function TopBar({
  unread = 0,
  name = "John Doe",
  company = "ABC Pte. Ltd.",
  onNotificationsClick,
  onUserClick,
}) {
  return (
    <div className="sx-topbar">
      <button
        type="button"
        className="sx-icon-button"
        aria-label="Notifications"
        onClick={onNotificationsClick}
      >
        <span className="material-symbols-rounded" aria-hidden="true">notifications</span>
        {unread > 0 && <span className="sx-icon-button__badge">{unread}</span>}
      </button>
      <button
        type="button"
        className="sx-topbar__user"
        onClick={onUserClick}
        style={{ background: "transparent", border: 0, cursor: "pointer", padding: 0 }}
      >
        <span className="material-symbols-rounded sx-topbar__avatar" aria-hidden="true">person</span>
        <div className="sx-topbar__user-text" style={{ textAlign: "left" }}>
          <div className="sx-topbar__user-name">{name}</div>
          <div className="sx-topbar__user-sub">{company}</div>
        </div>
      </button>
    </div>
  );
}
