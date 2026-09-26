import React from 'react';

export default function Sidebar({ currentTab, onChangeTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'categories', label: 'Categories' },
    { id: 'news', label: 'News Articles' },
    { id: 'users', label: 'User Accounts' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <aside className="app-sidebar">
      <div className="sidebar-title">ADMIN CONTROL</div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-btn ${currentTab === item.id ? 'active' : ''}`}
            onClick={() => onChangeTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}