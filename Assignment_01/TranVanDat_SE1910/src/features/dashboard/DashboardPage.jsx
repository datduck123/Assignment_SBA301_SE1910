import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { categoryService } from '../categories/categoryService';
import { newsService } from '../news/newsService';
import { userService } from '../users/userService';

export default function DashboardPage() {
  const totalCategories = categoryService.getAll().length;
  const totalNews = newsService.getAll().length;
  const totalUsers = userService.getAll().length;

  return (
    <div>
      <h3 className="fw-bold mb-4">Tổng Quan Hệ Thống</h3>

      <Row className="g-4 mb-4">
        <Col md={4}>
          <div className="stat-card border-primary border-start border-4">
            <div className="text-secondary small fw-semibold text-uppercase">Chuyên Mục</div>
            <h2 className="fw-bold text-dark mt-2 mb-0">{totalCategories}</h2>
          </div>
        </Col>
        <Col md={4}>
          <div className="stat-card border-success border-start border-4">
            <div className="text-secondary small fw-semibold text-uppercase">Tin Tức / Bài Viết</div>
            <h2 className="fw-bold text-dark mt-2 mb-0">{totalNews}</h2>
          </div>
        </Col>
        <Col md={4}>
          <div className="stat-card border-warning border-start border-4">
            <div className="text-secondary small fw-semibold text-uppercase">Tài Khoản Quản Trị</div>
            <h2 className="fw-bold text-dark mt-2 mb-0">{totalUsers}</h2>
          </div>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm p-4 bg-white">
        <h5 className="fw-bold mb-3">Chào mừng bạn đến với hệ thống quản trị!</h5>
        <p className="text-secondary mb-0">
          Dự án được xây dựng hoàn toàn trên nền tảng <strong>React 19</strong>, <strong>React Router 7</strong>, <strong>React-Bootstrap</strong> và mô hình <strong>Feature-based Architecture</strong>. Dữ liệu được quản lý qua service và đồng bộ với <code>localStorage</code>.
        </p>
      </Card>
    </div>
  );
}
