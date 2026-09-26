import React, { useState, useEffect } from "react";
import InputField from "../../components/common/InputField";
import { validateUser } from "../../utils/validation";

export default function UserModal({
  isOpen,
  mode,
  initialData,
  onClose,
  onSave,
}) {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState(2);
  const [status, setStatus] = useState(1);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData && mode === "UPDATE") {
      setUsername(initialData.username);
      setRole(initialData.role);
      setStatus(initialData.status);
    } else {
      setUsername("");
      setRole(2);
      setStatus(1);
    }
    setErrors({});
  }, [initialData, mode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateUser({ username, role, status });
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onSave({
      ...(mode === "UPDATE" ? { id: initialData.id } : { id: Date.now() }),
      username: username.trim(),
      role: Number(role),
      status: Number(status),
    });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h3>{mode === "CREATE" ? "Add User Account" : "Edit User Account"}</h3>
        <form onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
          <InputField
            label="Username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={errors.username}
            required
          />
          <div className="form-group">
            <label className="form-label">Role</label>
            <select
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value={1}>Admin (1)</option>
              <option value={2}>Staff (2)</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
