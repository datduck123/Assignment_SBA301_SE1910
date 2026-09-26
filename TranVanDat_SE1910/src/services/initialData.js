export const initialCategories = [
  { id: "CAT-1", name: "Công nghệ", description: "Tin tức AI, Lập trình và Điện tử", createdAt: "2026-09-01" },
  { id: "CAT-2", name: "Đời sống", description: "Tin tức sức khỏe, văn hóa và phong cách sống", createdAt: "2026-09-02" },
  { id: "CAT-3", name: "Giáo dục", description: "Thông tin tuyển sinh, học bổng và đào tạo", createdAt: "2026-09-03" }
];

export const initialNews = [
  {
    id: "NEWS-1",
    title: "React 19 Chính Thức Trở Thành Tiêu Chuẩn Frontend 2026",
    categoryId: "CAT-1",
    summary: "Những tính năng mới vượt trội về React Actions, Server Components và Hooks tối ưu.",
    content: "React 19 đem lại trải nghiệm lập trình đơn giản hơn bao giờ hết với việc xử lý form tự động và các trình quản lý bất đồng bộ...",
    status: "Published",
    createdAt: "2026-09-20"
  },
  {
    id: "NEWS-2",
    title: "FPT University Khai Giảng Học Kỳ Fall 2026",
    categoryId: "CAT-3",
    summary: "Hàng ngàn sinh viên khối ngành CNTT bước vào học kỳ mới với cơ sở vật chất hiện đại.",
    content: "Không khí khai giảng rộn ràng tại các campus trên toàn quốc với sự tham gia của các chuyên gia công nghệ hàng đầu...",
    status: "Published",
    createdAt: "2026-09-22"
  },
  {
    id: "NEWS-3",
    title: "Thói quen dinh dưỡng cải thiện hiệu suất làm việc cho lập trình viên",
    categoryId: "CAT-2",
    summary: "Các bài tập nhẹ và chế độ ăn giàu omega-3 hỗ trợ tối đa cho não bộ trong kỳ đồ án.",
    content: "Làm việc với màn hình máy tính cường độ cao đòi hỏi các kỹ sư công nghệ phải có kế hoạch sinh hoạt và nghỉ ngơi hợp lý...",
    status: "Draft",
    createdAt: "2026-09-25"
  }
];

export const initialUsers = [
  { id: "USR-1", name: "Trần Văn Đạt", email: "dat.admin@fpt.edu.vn", role: "Admin", status: "Active" },
  { id: "USR-2", name: "Lê Hoàng Phúc", email: "phuc.editor@fpt.edu.vn", role: "Editor", status: "Active" },
  { id: "USR-3", name: "Nguyễn Thị Mai", email: "mai.user@fpt.edu.vn", role: "Viewer", status: "Inactive" }
];
