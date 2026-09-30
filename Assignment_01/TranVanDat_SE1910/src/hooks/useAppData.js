import { useState, useEffect } from "react";
import { storageService } from "../services/localStorageService";
import { categoryService } from "../features/categories/categoryService";
import { newsService } from "../features/news/newsService";
import { userService } from "../features/users/userService";

export function useAppData() {
  const [theme, setTheme] = useState(() =>
    storageService.get("app_theme", "light"),
  );

  const [categories, setCategories] = useState(() => categoryService.getAll());
  const [news, setNews] = useState(() => newsService.getAll());
  const [users, setUsers] = useState(() => userService.getAll());

  useEffect(() => {
    storageService.set("app_theme", theme);
  }, [theme]);

  useEffect(() => {
    categoryService.saveAll(categories);
  }, [categories]);

  useEffect(() => {
    newsService.saveAll(news);
  }, [news]);

  useEffect(() => {
    userService.saveAll(users);
  }, [users]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return {
    theme,
    toggleTheme,
    categories,
    setCategories,
    news,
    setNews,
    users,
    setUsers,
  };
}
