import { storageService } from "../../services/localStorageService";
import { INITIAL_CATEGORIES } from "../../services/initialData";

const KEY = "sba_categories";

export const categoryService = {
  getAll: () => storageService.get(KEY, INITIAL_CATEGORIES),
  saveAll: (list) => storageService.set(KEY, list),
};
