export const storageService = {
  get: (key, defaultValue) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (err) {
      console.error(`Error reading key "${key}" from localStorage:`, err);
      return defaultValue;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Error writing key "${key}" to localStorage:`, err);
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error(`Error removing key "${key}" from localStorage:`, err);
    }
  },
};
