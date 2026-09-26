# TranVanDat_SE1910 - React 19 CMS Project

Dự án mẫu Quản Trị Nội Dung (CMS) xây dựng theo mô hình **Feature-based Architecture**, chuẩn công nghệ React 19, React Router và Bootstrap.

## 1. Cấu trúc thư mục chi tiết
```text
TranVanDat_SE1910/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── .gitignore                      # Chặn node_modules, dist, .env, .vscode, .idea...
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── assets/
│   │   └── styles.css
│   ├── utils/
│   │   └── validation.js           # Tập trung toàn bộ validation rules
│   ├── services/
│   │   ├── localStorageService.js
│   │   └── initialData.js
│   ├── components/
│   │   ├── common/
│   │   │   ├── ConfirmModal.jsx
│   │   │   ├── InputField.jsx
│   │   │   └── SearchBar.jsx
│   │   └── layout/
│   │       ├── Header.jsx
│   │       ├── Sidebar.jsx
│   │       └── AdminLayout.jsx
│   └── features/
│       ├── auth/
│       │   ├── LoginPage.jsx
│       │   └── authService.js
│       ├── dashboard/
│       │   └── DashboardPage.jsx
│       ├── categories/
│       │   ├── CategoryListPage.jsx
│       │   ├── CategoryModal.jsx
│       │   └── categoryService.js
│       ├── news/
│       │   ├── NewsListPage.jsx
│       │   ├── NewsModal.jsx
│       │   └── newsService.js
│       └── users/
│           ├── UserListPage.jsx
│           ├── UserModal.jsx
│           └── userService.js
```

## 2. Hướng dẫn cài đặt và khởi chạy
```bash
# 1. Cài đặt các gói dependencies (React 19, React Router, Bootstrap)
npm install

# 2. Khởi động server phát triển (Vite)
npm run dev

# 3. Build kiểm tra môi trường production
npm run build
npm run preview
```

## 3. Tài khoản đăng nhập mẫu
- **Email**: `admin@fpt.edu.vn`
- **Mật khẩu**: `123456`
