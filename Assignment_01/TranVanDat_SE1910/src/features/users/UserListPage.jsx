import React, { useState } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { userService } from './userService';
import UserModal from './UserModal';
import ConfirmModal from '../../components/common/ConfirmModal';
import SearchBar from '../../components/common/SearchBar';

export default function UserListPage() {
  const [users, setUsers] = useState(userService.getAll());
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const handleOpenAdd = () => {
    setEditingUser(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingUser(item);
    setModalOpen(true);
  };

  const handleSave = (form) => {
    if (editingUser) {
      userService.update(editingUser.id, form);
    } else {
      userService.create(form);
    }
    setUsers(userService.getAll());
    setModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      userService.delete(deleteId);
      setUsers(userService.getAll());
      setDeleteId(null);
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.trim().toLowerCase()) ||
      u.email.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Quản Lý Người Dùng</h3>
          <p className="text-secondary small mb-0">Danh sách tài khoản quản trị và biên tập viên</p>
        </div>
        <Button variant="primary" onClick={handleOpenAdd}>
          + Thêm Tài Khoản
        </Button>
      </div>

      <div className="table-card p-3 mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <SearchBar value={search} onChange={setSearch} placeholder="Tìm kiếm theo tên hoặc email..." />
          <Badge bg="primary" className="p-2">
            Tổng cộng: {filtered.length} tài khoản
          </Badge>
        </div>

        <Table responsive hover className="align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Họ và Tên</th>
              <th>Email</th>
              <th>Vai Trò</th>
              <th>Trạng Thái</th>
              <th className="text-end">Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-muted">
                  Không tìm thấy tài khoản nào
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id}>
                  <td className="fw-semibold text-secondary">{item.id}</td>
                  <td className="fw-bold text-dark">{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <Badge bg={item.role === 'Admin' ? 'danger' : item.role === 'Editor' ? 'primary' : 'secondary'}>
                      {item.role}
                    </Badge>
                  </td>
                  <td>
                    <Badge bg={item.status === 'Active' ? 'success' : 'secondary'}>
                      {item.status}
                    </Badge>
                  </td>
                  <td className="text-end">
                    <Button variant="outline-warning" size="sm" className="me-2" onClick={() => handleOpenEdit(item)}>
                      Sửa
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => setDeleteId(item.id)}>
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      <UserModal
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        onSave={handleSave}
        editingUser={editingUser}
      />

      <ConfirmModal
        show={Boolean(deleteId)}
        onHide={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Xóa Người Dùng"
        message="Bạn có chắc chắn muốn xóa tài khoản này khỏi hệ thống không?"
      />
    </div>
  );
}
