import React, { useState, useEffect } from "react";
import { storageService } from "./services/localStorageService";
import { authService } from "./features/auth/authService";
import { categoryService } from "./features/categories/categoryService";
import { newsService } from "./features/news/newsService";
import { userService } from "./features/users/userService";

import LoginPage from "./features/auth/LoginPage";
import AdminLayout from "./components/layout/AdminLayout";
import DashboardPage from "./features/dashboard/DashboardPage";
import CategoryListPage from "./features/categories/CategoryListPage";
import NewsListPage from "./features/news/NewsListPage";
import UserListPage from "./features/users/UserListPage";

export default function App() {
  const [currentUser, setCurrentUser] = useState(() =>
    authService.getCurrentUser(),
  );
  const [currentTab, setCurrentTab] = useState("dashboard");

  const [theme, setTheme] = useState(() =>
    storageService.get("app_theme", "light"),
  );

  const [categories, setCategories] = useState(() => categoryService.getAll());
  const [news, setNews] = useState(() => newsService.getAll());
  const [users, setUsers] = useState(() => userService.getAll());

  useEffect(() => {
    storageService.set("app_theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    categoryService.saveAll(categories);
  }, [categories]);

  useEffect(() => {
    newsService.saveAll(news);
  }, [news]);

  useEffect(() => {
    userService.saveAll(users);
  }, [users]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

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
        <div className="page-body">
          <div className="page-header">
            <h2 className="page-title">Application Settings</h2>
          </div>
          <div className="card" style={{ maxWidth: "640px" }}>
            <h3 style={{ marginBottom: "16px" }}>Interface Theme</h3>
            <div className="theme-switch-wrapper">
              <div>
                <strong>Dark Mode Appearance</strong>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--text-muted)",
                    marginTop: "4px",
                  }}
                >
                  Adjust the system display to reduce eye strain in low-light
                  environments.
                </p>
              </div>
              <button
                type="button"
                className={`btn ${theme === "dark" ? "btn-primary" : "btn-secondary"}`}
                onClick={toggleTheme}
              >
                {theme === "dark" ? "Dark Mode" : "Light Mode"}
              </button>
            </div>

            <hr
              style={{ margin: "24px 0", borderColor: "var(--border-color)" }}
            />

            <h3 style={{ marginBottom: "12px" }}>System Specifications</h3>
            <p>
              <strong>Project Code:</strong> TranVanDat_SE1910
            </p>
            <p style={{ marginTop: "8px" }}>
              <strong>Architecture:</strong> Layered Clean Code with Dedicated
              Validation & Service Pattern
            </p>
            <p style={{ marginTop: "8px" }}>
              <strong>Current Theme:</strong> {theme.toUpperCase()} (Persisted
              via LocalStorage)
            </p>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
