import React, { useState } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { categoryService } from './categoryService';
import CategoryModal from './CategoryModal';
import ConfirmModal from '../../components/common/ConfirmModal';
import SearchBar from '../../components/common/SearchBar';

export default function CategoryListPage() {
  const [categories, setCategories] = useState(categoryService.getAll());
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingCategory(item);
    setModalOpen(true);
  };

  const handleSave = (form) => {
    if (editingCategory) {
      categoryService.update(editingCategory.id, form);
    } else {
      categoryService.create(form);
    }
    setCategories(categoryService.getAll());
    setModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      categoryService.delete(deleteId);
      setCategories(categoryService.getAll());
      setDeleteId(null);
    }
  };

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Quản Lý Chuyên Mục</h3>
          <p className="text-secondary small mb-0">Danh sách các danh mục tin tức trên hệ thống</p>
        </div>
        <Button variant="primary" onClick={handleOpenAdd}>
          + Thêm Chuyên Mục
        </Button>
      </div>

      <div className="table-card p-3 mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <SearchBar value={search} onChange={setSearch} placeholder="Tìm kiếm chuyên mục..." />
          <Badge bg="info" className="p-2">
            Tổng cộng: {filtered.length} chuyên mục
          </Badge>
        </div>

        <Table responsive hover className="align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Tên Chuyên Mục</th>
              <th>Mô Tả</th>
              <th>Ngày Tạo</th>
              <th className="text-end">Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-muted">
                  Không tìm thấy chuyên mục nào phù hợp
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id}>
                  <td className="fw-semibold text-secondary">{item.id}</td>
                  <td className="fw-bold text-dark">{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.createdAt}</td>
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

      <CategoryModal
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        onSave={handleSave}
        editingCategory={editingCategory}
      />

      <ConfirmModal
        show={Boolean(deleteId)}
        onHide={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Xóa Chuyên Mục"
        message="Hành động này sẽ xóa chuyên mục được chọn. Bạn có chắc chắn không?"
      />
    </div>
  );
}
