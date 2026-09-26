import { localStorageService } from '../../services/localStorageService';
import { initialCategories } from '../../services/initialData';

const STORAGE_KEY = 'tran_van_dat_categories';

export const categoryService = {
  getAll: () => {
    return localStorageService.get(STORAGE_KEY, initialCategories);
  },

  create: (item) => {
    const list = categoryService.getAll();
    const newItem = {
      ...item,
      id: `CAT-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    const updated = [newItem, ...list];
    localStorageService.set(STORAGE_KEY, updated);
    return newItem;
  },

  update: (id, item) => {
    const list = categoryService.getAll();
    const updated = list.map((c) => (c.id === id ? { ...c, ...item } : c));
    localStorageService.set(STORAGE_KEY, updated);
  },

  delete: (id) => {
    const list = categoryService.getAll();
    const updated = list.filter((c) => c.id !== id);
    localStorageService.set(STORAGE_KEY, updated);
  }
};
