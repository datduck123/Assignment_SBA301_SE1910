import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import InputField from '../../components/common/InputField';
import { validateNewsForm } from '../../utils/validation';
import { categoryService } from '../categories/categoryService';

export default function NewsModal({ show, onHide, onSave, editingNews }) {
  const categories = categoryService.getAll();
  const [form, setForm] = useState({
    title: '',
    categoryId: '',
    summary: '',
    content: '',
    status: 'Published'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingNews) {
      setForm({
        title: editingNews.title,
        categoryId: editingNews.categoryId,
        summary: editingNews.summary || '',
        content: editingNews.content,
        status: editingNews.status || 'Published'
      });
    } else {
      setForm({
        title: '',
        categoryId: categories[0]?.id || '',
        summary: '',
        content: '',
        status: 'Published'
      });
    }
    setErrors({});
  }, [editingNews, show]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateNewsForm(form);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSave(form);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">
          {editingNews ? 'Chỉnh Sửa Tin Tức' : 'Đăng Tin Tức Mới'}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} noValidate>
        <Modal.Body>
          <InputField
            label="Tiêu Đề Tin Tức"
            name="title"
            value={form.title}
            onChange={handleChange}
            error={errors.title}
            placeholder="Nhập tiêu đề..."
            required
          />

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">
                  Chuyên Mục <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleChange}
                  isInvalid={Boolean(errors.categoryId)}
                >
                  <option value="">-- Chọn chuyên mục --</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Form.Select>
                {errors.categoryId && (
                  <Form.Control.Feedback type="invalid">{errors.categoryId}</Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Trạng Thái</Form.Label>
                <Form.Select name="status" value={form.status} onChange={handleChange}>
                  <option value="Published">Đã Xuất Bản (Published)</option>
                  <option value="Draft">Bản Nháp (Draft)</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <InputField
            label="Tóm Tắt Ngắn"
            name="summary"
            value={form.summary}
            onChange={handleChange}
            placeholder="Tóm tắt nội dung bài viết..."
          />

          <InputField
            as="textarea"
            rows={5}
            label="Nội Dung Chi Tiết"
            name="content"
            value={form.content}
            onChange={handleChange}
            error={errors.content}
            placeholder="Nội dung bài viết đầy đủ (tối thiểu 20 ký tự)..."
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Hủy
          </Button>
          <Button variant="primary" type="submit">
            {editingNews ? 'Lưu Thay Đổi' : 'Đăng Bài'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
