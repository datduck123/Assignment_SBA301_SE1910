import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AdminLayout({
  user,
  onLogout,
  currentTab,
  onChangeTab,
  theme,
  onToggleTheme,
  children,
}) {
  return (
    <div className="app-container" data-theme={theme}>
      <Sidebar currentTab={currentTab} onChangeTab={onChangeTab} />
      <div className="main-content">
        <Header
          user={user}
          onLogout={onLogout}
          theme={theme}
          onToggleTheme={onToggleTheme}
        />
        <main className="content-outlet">{children}</main>
      </div>
    </div>
  );
}
