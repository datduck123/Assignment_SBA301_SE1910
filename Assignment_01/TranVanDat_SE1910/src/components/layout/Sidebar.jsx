import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="admin-sidebar shadow">
      <div className="p-4 border-bottom border-secondary text-center">
        <h5 className="fw-bold mb-0 text-primary">TranVanDat CMS</h5>
        <small className="text-muted">SE1910 - React 19</small>
      </div>

      <nav className="mt-3 flex-grow-1">
        <NavLink to="/dashboard" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>
          <span>📊</span> Dashboard
        </NavLink>
        <NavLink to="/categories" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>
          <span>📁</span> Quản lý Chuyên mục
        </NavLink>
        <NavLink to="/news" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>
          <span>📰</span> Quản lý Tin tức
        </NavLink>
        <NavLink to="/users" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>
          <span>👥</span> Quản lý Người dùng
        </NavLink>
      </nav>

      <div className="p-3 border-top border-secondary text-center text-muted small">
        &copy; 2026 TranVanDat_SE1910
      </div>
    </aside>
  );
}
