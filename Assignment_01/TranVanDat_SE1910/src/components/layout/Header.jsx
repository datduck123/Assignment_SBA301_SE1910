import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../features/auth/authService';

export default function Header() {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <Navbar bg="white" className="border-bottom py-3 px-4 shadow-sm">
      <Container fluid className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-bold text-dark">Hệ Thống Quản Trị Nội Dung (CMS)</h5>
        <div className="d-flex align-items-center gap-3">
          <span className="text-secondary small">
            Xin chào, <strong className="text-dark">{user?.name || "Quản trị viên"}</strong>
          </span>
          <Button variant="outline-danger" size="sm" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}
