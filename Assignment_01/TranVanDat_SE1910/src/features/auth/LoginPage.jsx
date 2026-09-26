import React, { useState } from 'react';
import { Card, Button, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/common/InputField';
import { authService } from './authService';
import { validateEmail, validateRequired } from '../../utils/validation';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: 'admin@fpt.edu.vn', password: '123456' });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const emailErr = validateEmail(form.email);
    if (emailErr) newErrors.email = emailErr;

    const passErr = validateRequired(form.password, 'Mật khẩu');
    if (passErr) newErrors.password = passErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const res = authService.login(form.email, form.password);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setLoginError(res.message);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card className="shadow-lg border-0 p-4" style={{ width: '100%', maxWidth: '420px' }}>
        <Card.Body>
          <div className="text-center mb-4">
            <h3 className="fw-bold text-primary">Đăng Nhập Quản Trị</h3>
            <p className="text-secondary small">Dự án React 19 - TranVanDat_SE1910</p>
          </div>

          {loginError && <Alert variant="danger">{loginError}</Alert>}

          <form onSubmit={handleSubmit} noValidate>
            <InputField
              label="Email Quản Trị"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="nhap.email@fpt.edu.vn"
              required
            />
            <InputField
              label="Mật khẩu"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="••••••"
              required
            />

            <Button type="submit" variant="primary" className="w-100 py-2 mt-2 fw-semibold">
              Đăng Nhập Vào Hệ Thống
            </Button>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
}
