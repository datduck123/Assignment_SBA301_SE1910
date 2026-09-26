import { localStorageService } from '../../services/localStorageService';
import { initialNews } from '../../services/initialData';

const STORAGE_KEY = 'tran_van_dat_news';

export const newsService = {
  getAll: () => {
    return localStorageService.get(STORAGE_KEY, initialNews);
  },

  create: (item) => {
    const list = newsService.getAll();
    const newItem = {
      ...item,
      id: `NEWS-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    const updated = [newItem, ...list];
    localStorageService.set(STORAGE_KEY, updated);
    return newItem;
  },

  update: (id, item) => {
    const list = newsService.getAll();
    const updated = list.map((n) => (n.id === id ? { ...n, ...item } : n));
    localStorageService.set(STORAGE_KEY, updated);
  },

  delete: (id) => {
    const list = newsService.getAll();
    const updated = list.filter((n) => n.id !== id);
    localStorageService.set(STORAGE_KEY, updated);
  }
};
