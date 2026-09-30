import React, { useState, useEffect } from "react";
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

  const [categories, setCategories] = useState(() => categoryService.getAll());
  const [news, setNews] = useState(() => newsService.getAll());
  const [users, setUsers] = useState(() => userService.getAll());

  useEffect(() => {
    categoryService.saveAll(categories);
  }, [categories]);

  useEffect(() => {
    newsService.saveAll(news);
  }, [news]);

  useEffect(() => {
    userService.saveAll(users);
  }, [users]);

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginPage onLoginSuccess={setCurrentUser} />;
  }

  return (
    <AdminLayout
      user={currentUser}
      onLogout={handleLogout}
      currentTab={currentTab}
      onChangeTab={setCurrentTab}
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
          <div className="card">
            <p>
              <strong>Project Code:</strong> TranVanDat_SE1910
            </p>
            <p style={{ marginTop: "8px" }}>
              <strong>Architecture:</strong> Layered Clean Code with Dedicated
              Validation
            </p>
            <p style={{ marginTop: "8px" }}>
              <strong>Storage Strategy:</strong> LocalStorage Hydrated
              Persistence
            </p>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
