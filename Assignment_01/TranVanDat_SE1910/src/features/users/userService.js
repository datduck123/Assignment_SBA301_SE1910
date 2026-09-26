import { storageService } from "../../services/localStorageService";
import { INITIAL_USERS } from "../../services/initialData";

const KEY = "sba_users";

export const userService = {
  getAll: () => storageService.get(KEY, INITIAL_USERS),
  saveAll: (list) => storageService.set(KEY, list),
};
