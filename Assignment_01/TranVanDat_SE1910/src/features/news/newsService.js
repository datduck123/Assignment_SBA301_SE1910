import { storageService } from "../../services/localStorageService";
import { INITIAL_NEWS } from "../../services/initialData";

const KEY = "sba_news";

export const newsService = {
  getAll: () => storageService.get(KEY, INITIAL_NEWS),
  saveAll: (list) => storageService.set(KEY, list),
};
