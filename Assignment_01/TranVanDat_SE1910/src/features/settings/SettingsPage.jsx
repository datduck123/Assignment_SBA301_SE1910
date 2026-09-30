import React from "react";

export default function SettingsPage({ theme, onToggleTheme }) {
  return (
    <div className="page-body">
      <div className="page-header">
        <h2 className="page-title">Application Settings</h2>
      </div>

      <div className="card settings-card">
        <h3 className="settings-section-title">Interface Theme</h3>

        <div className="theme-switch-wrapper">
          <div>
            <strong>Dark Mode Appearance</strong>
            <p className="settings-desc">
              Adjust the system display to reduce eye strain in low-light
              environments.
            </p>
          </div>
          <button
            type="button"
            className={`btn ${theme === "dark" ? "btn-primary" : "btn-secondary"}`}
            onClick={onToggleTheme}
          >
            {theme === "dark" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>

        <hr className="settings-divider" />

        <h3 className="settings-section-title">System Specifications</h3>
        <p className="settings-info-item">
          <strong>Project Code:</strong> TranVanDat_SE1910
        </p>
        <p className="settings-info-item">
          <strong>Architecture:</strong> Layered Clean Code with Dedicated
          Validation & Custom Hook
        </p>
        <p className="settings-info-item">
          <strong>Current Theme:</strong> {theme.toUpperCase()} (Persisted via
          LocalStorage)
        </p>
      </div>
    </div>
  );
}
