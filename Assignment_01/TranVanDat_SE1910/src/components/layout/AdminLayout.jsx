import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AdminLayout({
  user,
  onLogout,
  currentTab,
  onChangeTab,
  children,
}) {
  return (
    <div className="app-container">
      <Sidebar currentTab={currentTab} onChangeTab={onChangeTab} />
      <div className="main-content">
        <Header user={user} onLogout={onLogout} />
        <main className="content-outlet">{children}</main>
      </div>
    </div>
  );
}
