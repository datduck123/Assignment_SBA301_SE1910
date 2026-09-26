import React, { useState, useEffect } from "react";
import InputField from "../../components/common/InputField";
import { validateCategory } from "../../utils/validation";

export default function CategoryModal({
  isOpen,
  mode,
  initialData,
  onClose,
  onSave,
}) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState(1);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData && mode === "UPDATE") {
      setName(initialData.name);
      setStatus(initialData.status);
    } else {
      setName("");
      setStatus(1);
    }
    setErrors({});
  }, [initialData, mode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateCategory({ name, status });
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onSave({
      ...(mode === "UPDATE" && { id: initialData.id }),
      name: name.trim(),
      status: Number(status),
    });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h3>{mode === "CREATE" ? "Create Category" : "Edit Category"}</h3>
        <form onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
          <InputField
            label="Category Name"
            type="text"
            placeholder="e.g. Science & Tech"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            required
          />
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
