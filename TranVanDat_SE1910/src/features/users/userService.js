import { localStorageService } from '../../services/localStorageService';
import { initialUsers } from '../../services/initialData';

const STORAGE_KEY = 'tran_van_dat_users';

export const userService = {
  getAll: () => {
    return localStorageService.get(STORAGE_KEY, initialUsers);
  },

  create: (item) => {
    const list = userService.getAll();
    const newItem = {
      ...item,
      id: `USR-${Date.now()}`
    };
    const updated = [newItem, ...list];
    localStorageService.set(STORAGE_KEY, updated);
    return newItem;
  },

  update: (id, item) => {
    const list = userService.getAll();
    const updated = list.map((u) => (u.id === id ? { ...u, ...item } : u));
    localStorageService.set(STORAGE_KEY, updated);
  },

  delete: (id) => {
    const list = userService.getAll();
    const updated = list.filter((u) => u.id !== id);
    localStorageService.set(STORAGE_KEY, updated);
  }
};
