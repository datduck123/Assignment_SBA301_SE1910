import { localStorageService } from '../../services/localStorageService';

const AUTH_KEY = 'tran_van_dat_auth_user';

export const authService = {
  login: (email, password) => {
    // Giả lập xác thực người dùng cục bộ
    if (email === 'admin@fpt.edu.vn' && password === '123456') {
      const user = {
        name: 'Trần Văn Đạt (Admin)',
        email,
        role: 'Admin'
      };
      localStorageService.set(AUTH_KEY, user);
      return { success: true, user };
    }
    return { success: false, message: 'Email hoặc mật khẩu không chính xác (Thử: admin@fpt.edu.vn / 123456)' };
  },

  logout: () => {
    localStorageService.remove(AUTH_KEY);
  },

  getCurrentUser: () => {
    return localStorageService.get(AUTH_KEY, null);
  },

  isAuthenticated: () => {
    return Boolean(localStorageService.get(AUTH_KEY, null));
  }
};
