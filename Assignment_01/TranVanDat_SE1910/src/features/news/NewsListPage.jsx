import React, { useState } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { newsService } from './newsService';
import { categoryService } from '../categories/categoryService';
import NewsModal from './NewsModal';
import ConfirmModal from '../../components/common/ConfirmModal';
import SearchBar from '../../components/common/SearchBar';

export default function NewsListPage() {
  const [news, setNews] = useState(newsService.getAll());
  const categories = categoryService.getAll();
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const getCategoryName = (catId) => {
    const cat = categories.find((c) => c.id === catId);
    return cat ? cat.name : 'Chưa phân loại';
  };

  const handleOpenAdd = () => {
    setEditingNews(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingNews(item);
    setModalOpen(true);
  };

  const handleSave = (form) => {
    if (editingNews) {
      newsService.update(editingNews.id, form);
    } else {
      newsService.create(form);
    }
    setNews(newsService.getAll());
    setModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      newsService.delete(deleteId);
      setNews(newsService.getAll());
      setDeleteId(null);
    }
  };

  const filtered = news.filter((n) =>
    n.title.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Quản Lý Tin Tức</h3>
          <p className="text-secondary small mb-0">Quản lý bài viết và xuất bản nội dung</p>
        </div>
        <Button variant="primary" onClick={handleOpenAdd}>
          + Viết Bài Mới
        </Button>
      </div>

      <div className="table-card p-3 mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <SearchBar value={search} onChange={setSearch} placeholder="Tìm kiếm tiêu đề tin..." />
          <Badge bg="success" className="p-2">
            Tổng cộng: {filtered.length} bài viết
          </Badge>
        </div>

        <Table responsive hover className="align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Tiêu Đề</th>
              <th>Chuyên Mục</th>
              <th>Trạng Thái</th>
              <th>Ngày Tạo</th>
              <th className="text-end">Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-muted">
                  Không tìm thấy bài viết nào
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id}>
                  <td className="fw-semibold text-secondary">{item.id}</td>
                  <td className="fw-bold text-dark">{item.title}</td>
                  <td>
                    <Badge bg="secondary">{getCategoryName(item.categoryId)}</Badge>
                  </td>
                  <td>
                    <Badge bg={item.status === 'Published' ? 'success' : 'warning'} text={item.status === 'Published' ? 'white' : 'dark'}>
                      {item.status}
                    </Badge>
                  </td>
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

      <NewsModal
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        onSave={handleSave}
        editingNews={editingNews}
      />

      <ConfirmModal
        show={Boolean(deleteId)}
        onHide={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Xóa Bài Viết"
        message="Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa tin này không?"
      />
    </div>
  );
}
