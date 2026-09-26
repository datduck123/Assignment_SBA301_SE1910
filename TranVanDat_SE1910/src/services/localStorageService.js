export const localStorageService = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error(`Lỗi khi đọc key "${key}" từ localStorage`, e);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Lỗi khi lưu key "${key}" vào localStorage`, e);
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(`Lỗi khi xóa key "${key}" khỏi localStorage`, e);
    }
  },

  clear: () => {
    localStorage.clear();
  }
};
