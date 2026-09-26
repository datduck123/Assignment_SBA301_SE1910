import React, { useState, useEffect } from "react";
import InputField from "../../components/common/InputField";
import { validateNews } from "../../utils/validation";

export default function NewsModal({
  isOpen,
  mode,
  initialData,
  categories,
  onClose,
  onSave,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState(1);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData && mode === "UPDATE") {
      setTitle(initialData.title);
      setContent(initialData.content);
      setCategoryId(initialData.categoryId);
      setStatus(initialData.status);
    } else {
      setTitle("");
      setContent("");
      setCategoryId(categories[0]?.id || "");
      setStatus(1);
    }
    setErrors({});
  }, [initialData, mode, isOpen, categories]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateNews({ title, content, categoryId });
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onSave({
      ...(mode === "UPDATE"
        ? { id: initialData.id, createdBy: initialData.createdBy }
        : { id: Date.now(), createdBy: "Admin" }),
      title: title.trim(),
      content: content.trim(),
      categoryId: Number(categoryId),
      status: Number(status),
    });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h3>{mode === "CREATE" ? "Add New Article" : "Edit Article"}</h3>
        <form onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
          <InputField
            label="Article Title"
            type="text"
            placeholder="Headline of the article"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={errors.title}
            required
          />
          <div className="form-group">
            <label className="form-label">
              Category <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <select
              className="form-control"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <div className="error-text">{errors.categoryId}</div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">
              Content Body <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <textarea
              rows="4"
              className="form-control"
              placeholder="Write article summary or body..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {errors.content && (
              <div className="error-text">{errors.content}</div>
            )}
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
