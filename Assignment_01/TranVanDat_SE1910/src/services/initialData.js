export const INITIAL_CATEGORIES = [
  { id: 1, name: "Technology", status: 1 },
  { id: 2, name: "Education", status: 1 },
  { id: 3, name: "Campus Life", status: 0 },
];

export const INITIAL_NEWS = [
  {
    id: 1,
    title: "React 19 Official Release Notes",
    content: "Overview of new compiler enhancements and Actions architecture.",
    categoryId: 1,
    createdBy: "Admin",
    status: 1,
  },
  {
    id: 2,
    title: "University Sports Festival 2026",
    content:
      "Competition schedule announced for campus football and chess leagues.",
    categoryId: 3,
    createdBy: "Admin",
    status: 1,
  },
];

export const INITIAL_USERS = [
  { id: 1, username: "admin", role: 1, status: 1 },
  { id: 2, username: "editor_staff", role: 2, status: 1 },
  { id: 3, username: "intern_writer", role: 2, status: 0 },
];
