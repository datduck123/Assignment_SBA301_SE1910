import React, { useState } from "react";
import SearchBar from "../../components/common/SearchBar";
import CategoryModal from "./CategoryModal";
import ConfirmModal from "../../components/common/ConfirmModal";

export default function CategoryListPage({ categories, setCategories, news }) {
  const [keyword, setKeyword] = useState("");
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    mode: "CREATE",
    data: null,
  });
  const [deleteConfig, setDeleteConfig] = useState({
    isOpen: false,
    item: null,
  });

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(keyword.trim().toLowerCase()),
  );

  const handleSave = (item) => {
    if (modalConfig.mode === "CREATE") {
      const nextId =
        categories.length > 0
          ? Math.max(...categories.map((c) => Number(c.id) || 0)) + 1
          : 1;
      setCategories((prev) => [{ ...item, id: nextId }, ...prev]);
    } else {
      setCategories((prev) => prev.map((c) => (c.id === item.id ? item : c)));
    }
  };

  const handleConfirmDelete = () => {
    const targetId = deleteConfig.item.id;
    const isConstraintViolated = news.some((n) => n.categoryId === targetId);
    if (isConstraintViolated) {
      alert(
        "Cannot delete: This category is associated with existing news articles!",
      );
      setDeleteConfig({ isOpen: false, item: null });
      return;
    }
    setCategories((prev) => prev.filter((c) => c.id !== targetId));
    setDeleteConfig({ isOpen: false, item: null });
  };

  return (
    <div className="page-body">
      <div className="page-header">
        <h2 className="page-title">Category Management</h2>
        <button
          className="btn btn-primary"
          onClick={() =>
            setModalConfig({ isOpen: true, mode: "CREATE", data: null })
          }
        >
          + Add Category
        </button>
      </div>

      <div className="card">
        <SearchBar
          keyword={keyword}
          onSearchChange={setKeyword}
          placeholder="Search categories by name..."
        />

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th style={{ width: "80px" }}>ID</th>
                <th>Category Name</th>
                <th>Status</th>
                <th style={{ width: "160px", textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>
                      <strong>{c.name}</strong>
                    </td>
                    <td>
                      <span
                        className={`badge ${c.status === 1 ? "badge-active" : "badge-inactive"}`}
                      >
                        {c.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() =>
                          setModalConfig({
                            isOpen: true,
                            mode: "UPDATE",
                            data: c,
                          })
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          setDeleteConfig({ isOpen: true, item: c })
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="table-empty">
                    No matching categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CategoryModal
        isOpen={modalConfig.isOpen}
        mode={modalConfig.mode}
        initialData={modalConfig.data}
        onClose={() =>
          setModalConfig({ isOpen: false, mode: "CREATE", data: null })
        }
        onSave={handleSave}
      />

      <ConfirmModal
        isOpen={deleteConfig.isOpen}
        title="Delete Category"
        message={`Are you sure you want to permanently delete category "${deleteConfig.item?.name}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfig({ isOpen: false, item: null })}
      />
    </div>
  );
}
