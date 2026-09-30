import React, { useState } from "react";
import { authService } from "./features/auth/authService";
import { useAppData } from "./hooks/useAppData";

import LoginPage from "./features/auth/LoginPage";
import AdminLayout from "./components/layout/AdminLayout";
import DashboardPage from "./features/dashboard/DashboardPage";
import CategoryListPage from "./features/categories/CategoryListPage";
import NewsListPage from "./features/news/NewsListPage";
import UserListPage from "./features/users/UserListPage";
import SettingsPage from "./features/settings/SettingsPage";

export default function App() {
  const [currentUser, setCurrentUser] = useState(() =>
    authService.getCurrentUser(),
  );
  const [currentTab, setCurrentTab] = useState("dashboard");

  const {
    theme,
    toggleTheme,
    categories,
    setCategories,
    news,
    setNews,
    users,
    setUsers,
  } = useAppData();

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  if (!currentUser) {
    return (
      <div data-theme={theme}>
        <LoginPage onLoginSuccess={setCurrentUser} />
      </div>
    );
  }

  return (
    <AdminLayout
      user={currentUser}
      onLogout={handleLogout}
      currentTab={currentTab}
      onChangeTab={setCurrentTab}
      theme={theme}
      onToggleTheme={toggleTheme}
    >
      {currentTab === "dashboard" && (
        <DashboardPage categories={categories} news={news} users={users} />
      )}
      {currentTab === "categories" && (
        <CategoryListPage
          categories={categories}
          setCategories={setCategories}
          news={news}
        />
      )}
      {currentTab === "news" && (
        <NewsListPage news={news} setNews={setNews} categories={categories} />
      )}
      {currentTab === "users" && (
        <UserListPage users={users} setUsers={setUsers} />
      )}
      {currentTab === "settings" && (
        <SettingsPage theme={theme} onToggleTheme={toggleTheme} />
      )}
    </AdminLayout>
  );
}
