import React, { useState } from "react";
import SearchBar from "../../components/common/SearchBar";
import UserModal from "./UserModal";
import ConfirmModal from "../../components/common/ConfirmModal";

export default function UserListPage({ users, setUsers }) {
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

  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(keyword.trim().toLowerCase()),
  );

  const handleSave = (item) => {
    if (modalConfig.mode === "CREATE") {
      setUsers((prev) => [item, ...prev]);
    } else {
      setUsers((prev) => prev.map((u) => (u.id === item.id ? item : u)));
    }
  };

  const handleConfirmDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== deleteConfig.item.id));
    setDeleteConfig({ isOpen: false, item: null });
  };

  return (
    <div className="page-body">
      <div className="page-header">
        <h2 className="page-title">User Accounts Management</h2>
        <button
          className="btn btn-primary"
          onClick={() =>
            setModalConfig({ isOpen: true, mode: "CREATE", data: null })
          }
        >
          + Add Account
        </button>
      </div>

      <div className="card">
        <SearchBar
          keyword={keyword}
          onSearchChange={setKeyword}
          placeholder="Search by username..."
        />

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th style={{ width: "80px" }}>ID</th>
                <th>Username</th>
                <th>System Role</th>
                <th>Status</th>
                <th style={{ width: "160px", textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>
                      <strong>{u.username}</strong>
                    </td>
                    <td>
                      <span
                        className={`badge ${u.role === 1 ? "badge-admin" : "badge-staff"}`}
                      >
                        {u.role === 1 ? "Admin" : "Staff"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${u.status === 1 ? "badge-active" : "badge-inactive"}`}
                      >
                        {u.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() =>
                          setModalConfig({
                            isOpen: true,
                            mode: "UPDATE",
                            data: u,
                          })
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          setDeleteConfig({ isOpen: true, item: u })
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="table-empty">
                    No accounts found matching keyword.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <UserModal
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
        title="Delete User Account"
        message={`Are you sure you want to delete user account "${deleteConfig.item?.username}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfig({ isOpen: false, item: null })}
      />
    </div>
  );
}
