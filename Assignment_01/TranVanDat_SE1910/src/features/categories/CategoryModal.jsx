import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import InputField from '../../components/common/InputField';
import { validateCategoryForm } from '../../utils/validation';

export default function CategoryModal({ show, onHide, onSave, editingCategory }) {
  const [form, setForm] = useState({ name: '', description: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingCategory) {
      setForm({ name: editingCategory.name, description: editingCategory.description });
    } else {
      setForm({ name: '', description: '' });
    }
    setErrors({});
  }, [editingCategory, show]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateCategoryForm(form);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSave(form);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">
          {editingCategory ? 'Chỉnh Sửa Chuyên Mục' : 'Thêm Mới Chuyên Mục'}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} noValidate>
        <Modal.Body>
          <InputField
            label="Tên Chuyên Mục"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Ví dụ: Công nghệ, Đời sống..."
            required
          />
          <InputField
            as="textarea"
            rows={3}
            label="Mô Tả"
            name="description"
            value={form.description}
            onChange={handleChange}
            error={errors.description}
            placeholder="Mô tả thông tin chuyên mục..."
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Hủy
          </Button>
          <Button variant="primary" type="submit">
            {editingCategory ? 'Lưu Thay Đổi' : 'Tạo Mới'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
