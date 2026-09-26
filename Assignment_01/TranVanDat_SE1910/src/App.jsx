import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './features/auth/LoginPage';
import AdminLayout from './components/layout/AdminLayout';
import DashboardPage from './features/dashboard/DashboardPage';
import CategoryListPage from './features/categories/CategoryListPage';
import NewsListPage from './features/news/NewsListPage';
import UserListPage from './features/users/UserListPage';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/categories" element={<CategoryListPage />} />
        <Route path="/news" element={<NewsListPage />} />
        <Route path="/users" element={<UserListPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
