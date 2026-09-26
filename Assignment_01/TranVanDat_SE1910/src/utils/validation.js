export const validateAuth = (username, password) => {
  const errors = {};
  if (!username || !username.trim()) {
    errors.username = "Username is required";
  }
  if (!password || !password.trim()) {
    errors.password = "Password is required";
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateCategory = (data) => {
  const errors = {};
  if (!data.name || !data.name.trim()) {
    errors.name = "Category name is required";
  } else if (data.name.trim().length < 2) {
    errors.name = "Category name must be at least 2 characters";
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateNews = (data) => {
  const errors = {};
  if (!data.title || !data.title.trim()) {
    errors.title = "Article title is required";
  } else if (data.title.trim().length < 5) {
    errors.title = "Title must be at least 5 characters";
  }

  if (!data.categoryId) {
    errors.categoryId = "Please select a category";
  }

  if (!data.content || !data.content.trim()) {
    errors.content = "Article content is required";
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateUser = (data) => {
  const errors = {};
  if (!data.username || !data.username.trim()) {
    errors.username = "Username is required";
  } else if (data.username.trim().length < 3) {
    errors.username = "Username must be at least 3 characters";
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
