import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import InputField from '../../components/common/InputField';
import { validateUserForm } from '../../utils/validation';

export default function UserModal({ show, onHide, onSave, editingUser }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Editor',
    status: 'Active'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingUser) {
      setForm({
        name: editingUser.name,
        email: editingUser.email,
        password: '',
        role: editingUser.role || 'Editor',
        status: editingUser.status || 'Active'
      });
    } else {
      setForm({
        name: '',
        email: '',
        password: '',
        role: 'Editor',
        status: 'Active'
      });
    }
    setErrors({});
  }, [editingUser, show]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateUserForm(form, Boolean(editingUser));
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
          {editingUser ? 'Chỉnh Sửa Tài Khoản' : 'Thêm Người Dùng Mới'}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} noValidate>
        <Modal.Body>
          <InputField
            label="Họ và Tên"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Nguyễn Văn A"
            required
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="email@example.com"
            required
          />

          {!editingUser && (
            <InputField
              label="Mật Khẩu Khởi Tạo"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="Tối thiểu 6 ký tự"
              required
            />
          )}

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Vai Trò</Form.Label>
                <Form.Select name="role" value={form.role} onChange={handleChange}>
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Trạng Thái</Form.Label>
                <Form.Select name="status" value={form.status} onChange={handleChange}>
                  <option value="Active">Hoạt động (Active)</option>
                  <option value="Inactive">Khóa (Inactive)</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Hủy
          </Button>
          <Button variant="primary" type="submit">
            {editingUser ? 'Lưu Thay Đổi' : 'Thêm Người Dùng'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
