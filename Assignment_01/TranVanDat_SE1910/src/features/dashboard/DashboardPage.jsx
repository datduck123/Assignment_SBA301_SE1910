import React from "react";

export default function DashboardPage({ categories, news, users }) {
  const metrics = [
    { title: "Total Categories", count: categories.length, color: "#3b82f6" },
    { title: "Total News Articles", count: news.length, color: "#10b981" },
    { title: "Registered Users", count: users.length, color: "#f59e0b" },
  ];

  return (
    <div className="page-body">
      <div className="page-header">
        <h2 className="page-title">Executive Dashboard</h2>
      </div>
      <div className="dashboard-grid">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className="card dashboard-card"
            style={{ borderLeftColor: m.color }}
          >
            <div className="dashboard-card-title">{m.title}</div>
            <div className="dashboard-card-value">{m.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
