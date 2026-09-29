import React from "react";

export default function Header({ user, onLogout, theme, onToggleTheme }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="brand-logo">FU</div>
        <div className="brand-title">FUNews Management</div>
      </div>
      <div className="header-right">
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={onToggleTheme}
          title="Toggle Light or Dark Mode"
        >
          {theme === "dark" ? "Dark" : "Light"}
        </button>
        <span className="user-greeting">
          Welcome, <strong className="user-name">{user?.username}</strong>
        </span>
        <button className="btn btn-secondary btn-sm" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
