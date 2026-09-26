/**
 * Tập trung toàn bộ validation rules cho dự án
 */

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !email.trim()) return "Email không được để trống";
  if (!re.test(email.trim())) return "Định dạng email không hợp lệ";
  return "";
};

export const validateRequired = (value, fieldName = "Trường này") => {
  if (value === undefined || value === null || !String(value).trim()) {
    return `${fieldName} không được để trống`;
  }
  return "";
};

export const validateMinLength = (value, min, fieldName = "Trường này") => {
  if (!value || value.length < min) {
    return `${fieldName} phải có tối thiểu ${min} ký tự`;
  }
  return "";
};

export const validateCategoryForm = (form) => {
  const errors = {};
  const nameError = validateRequired(form.name, "Tên chuyên mục");
  if (nameError) errors.name = nameError;

  const descError = validateRequired(form.description, "Mô tả chuyên mục");
  if (descError) errors.description = descError;

  return errors;
};

export const validateNewsForm = (form) => {
  const errors = {};
  const titleError = validateRequired(form.title, "Tiêu đề tin");
  if (titleError) errors.title = titleError;

  const catError = validateRequired(form.categoryId, "Chuyên mục");
  if (catError) errors.categoryId = catError;

  const contentError = validateMinLength(form.content, 20, "Nội dung");
  if (contentError) errors.content = contentError;

  return errors;
};

export const validateUserForm = (form, isEdit = false) => {
  const errors = {};
  const nameError = validateRequired(form.name, "Họ và tên");
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(form.email);
  if (emailError) errors.email = emailError;

  if (!isEdit) {
    const passError = validateMinLength(form.password, 6, "Mật khẩu");
    if (passError) errors.password = passError;
  }

  const roleError = validateRequired(form.role, "Vai trò");
  if (roleError) errors.role = roleError;

  return errors;
};
