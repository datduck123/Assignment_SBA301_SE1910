import { storageService } from "../../services/localStorageService";

const AUTH_KEY = "auth_session";

export const authService = {
  login: (username, password) => {
    if (username === "Admin" && password === "Admin") {
      const user = { username: "Admin", role: 1 };
      storageService.set(AUTH_KEY, user);
      return { success: true, data: user };
    }
    return {
      success: false,
      message: "Username or password is incorrect. Hint: Admin / Admin",
    };
  },
  logout: () => {
    storageService.remove(AUTH_KEY);
  },
  getCurrentUser: () => {
    return storageService.get(AUTH_KEY, null);
  },
};
