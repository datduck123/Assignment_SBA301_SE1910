import React from "react";

export default function Header({ user, onLogout }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="brand-logo">FU</div>
        <div className="brand-title">FUNews Portal</div>
      </div>
      <div className="header-right">
        <span className="user-greeting">
          Welcome, <strong className="user-name">{user?.username}</strong> (
          {user?.role === 1 ? "Admin" : "Staff"})
        </span>
        <button className="btn btn-secondary btn-sm" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
