import React, { useState } from "react";
import SearchBar from "../../components/common/SearchBar";
import NewsModal from "./NewsModal";
import ConfirmModal from "../../components/common/ConfirmModal";

export default function NewsListPage({ news, setNews, categories }) {
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

  const getCategoryName = (catId) => {
    const found = categories.find((c) => c.id === catId);
    return found ? found.name : "Unknown";
  };

  const filteredNews = news.filter(
    (n) =>
      n.title.toLowerCase().includes(keyword.trim().toLowerCase()) ||
      n.content.toLowerCase().includes(keyword.trim().toLowerCase()),
  );

  const handleSave = (item) => {
    if (modalConfig.mode === "CREATE") {
      setNews((prev) => [item, ...prev]);
    } else {
      setNews((prev) => prev.map((n) => (n.id === item.id ? item : n)));
    }
  };

  const handleConfirmDelete = () => {
    setNews((prev) => prev.filter((n) => n.id !== deleteConfig.item.id));
    setDeleteConfig({ isOpen: false, item: null });
  };

  return (
    <div className="page-body">
      <div className="page-header">
        <h2 className="page-title">News Articles Management</h2>
        <button
          className="btn btn-primary"
          onClick={() =>
            setModalConfig({ isOpen: true, mode: "CREATE", data: null })
          }
        >
          + Create Article
        </button>
      </div>

      <div className="card">
        <SearchBar
          keyword={keyword}
          onSearchChange={setKeyword}
          placeholder="Search by title or content..."
        />

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th style={{ width: "60px" }}>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Status</th>
                <th style={{ width: "160px", textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNews.length > 0 ? (
                filteredNews.map((n) => (
                  <tr key={n.id}>
                    <td>{n.id}</td>
                    <td>
                      <strong>{n.title}</strong>
                    </td>
                    <td>
                      <span className="badge badge-admin">
                        {getCategoryName(n.categoryId)}
                      </span>
                    </td>
                    <td>{n.createdBy}</td>
                    <td>
                      <span
                        className={`badge ${n.status === 1 ? "badge-active" : "badge-inactive"}`}
                      >
                        {n.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() =>
                          setModalConfig({
                            isOpen: true,
                            mode: "UPDATE",
                            data: n,
                          })
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          setDeleteConfig({ isOpen: true, item: n })
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="table-empty">
                    No articles found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <NewsModal
        isOpen={modalConfig.isOpen}
        mode={modalConfig.mode}
        initialData={modalConfig.data}
        categories={categories}
        onClose={() =>
          setModalConfig({ isOpen: false, mode: "CREATE", data: null })
        }
        onSave={handleSave}
      />

      <ConfirmModal
        isOpen={deleteConfig.isOpen}
        title="Delete News Article"
        message={`Are you sure you want to permanently remove article "${deleteConfig.item?.title}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfig({ isOpen: false, item: null })}
      />
    </div>
  );
}
