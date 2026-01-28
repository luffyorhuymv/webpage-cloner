

## Kế Hoạch Clone Website Cơ Điện Trường Phát

Website thương mại điện tử bán thiết bị điện với đầy đủ tính năng mua bán và quản trị.

---

### 🎨 **1. Giao Diện Trang Chủ**

- **Header cố định**:
  - Top bar: Địa chỉ công ty, hotline, mạng xã hội
  - Logo + tên công ty "CƠ ĐIỆN TRƯỜNG PHÁT"
  - Menu điều hướng: Cửa hàng, Nguồn dự phòng, Tủ điện hạ thế, Phụ kiện tủ điện, Tin tức, Liên hệ
  - Nút tư vấn Zalo + giỏ hàng

- **Hero section**: Banner slideshow với số liệu thống kê (khách hàng tin dùng, sản phẩm, dự án)

- **Giới thiệu công ty**: Về công ty với hình ảnh và nút xem thêm

- **Danh mục sản phẩm chính**: 4 card (Phụ kiện tủ điện, Nguồn dự phòng, Tủ điện hạ thế, Sản phẩm khác)

- **Sản phẩm nổi bật**: Tab chuyển đổi theo danh mục + grid sản phẩm

- **Tại sao chọn chúng tôi**: 5 điểm mạnh (Tiết kiệm chi phí, Công nghệ cao, Đối tác, Chính hãng, Đội ngũ)

- **Tin tức & Sự kiện**: Carousel hình ảnh/bài viết

- **Footer**: Thông tin liên hệ, menu nhanh, form đăng ký

---

### 🛒 **2. Trang Cửa Hàng & Sản Phẩm**

- **Trang danh sách sản phẩm**:
  - Sidebar lọc theo danh mục
  - Sắp xếp theo giá, mới nhất, bán chạy
  - Phân trang
  - Grid hiển thị sản phẩm với giá, tên, ảnh

- **Trang chi tiết sản phẩm**:
  - Gallery ảnh với zoom
  - Thông tin chi tiết, mô tả, thông số kỹ thuật
  - Nút thêm vào giỏ hàng
  - Sản phẩm liên quan

---

### 🛍️ **3. Giỏ Hàng & Thanh Toán**

- **Giỏ hàng**:
  - Danh sách sản phẩm đã thêm
  - Tăng/giảm số lượng, xóa sản phẩm
  - Tổng tiền tự động tính

- **Thanh toán**:
  - Form nhập thông tin giao hàng
  - Chọn phương thức thanh toán (COD, chuyển khoản)
  - Xác nhận đơn hàng

---

### 👤 **4. Đăng Nhập / Đăng Ký**

- **Trang đăng ký**: Email, mật khẩu, tên, số điện thoại
- **Trang đăng nhập**: Email + mật khẩu
- **Quên mật khẩu**: Gửi email reset password
- **Trang tài khoản cá nhân**: Xem/sửa thông tin, lịch sử đơn hàng

---

### 📝 **5. Các Trang Nội Dung**

- **Trang giới thiệu**: Lịch sử, tầm nhìn, đội ngũ
- **Trang liên hệ**: Form liên hệ + bản đồ Google Maps
- **Trang tin tức**: Danh sách bài viết
- **Chi tiết tin tức**: Nội dung bài viết

---

### 🔐 **6. Trang Admin (Quản Trị)**

- **Dashboard**: Thống kê tổng quan (đơn hàng, doanh thu, sản phẩm, khách hàng)

- **Quản lý sản phẩm**: Thêm/sửa/xóa sản phẩm, upload ảnh, phân danh mục

- **Quản lý danh mục**: Tạo/sửa/xóa danh mục sản phẩm

- **Quản lý đơn hàng**: Xem danh sách, cập nhật trạng thái (Chờ xác nhận, Đang giao, Hoàn thành)

- **Quản lý khách hàng**: Xem thông tin khách hàng đã đăng ký

- **Quản lý tin tức**: Thêm/sửa/xóa bài viết

---

### 🎯 **7. Tính Năng Bổ Sung**

- **Responsive**: Tương thích mobile/tablet
- **Tìm kiếm**: Tìm sản phẩm nhanh
- **Thông báo**: Toast thông báo khi thêm giỏ hàng, đặt hàng thành công
- **Nút Zalo chat**: Hỗ trợ khách hàng nhanh

---

### 🗄️ **8. Backend (Lovable Cloud)**

Cần kích hoạt Lovable Cloud để có database lưu trữ:
- Bảng **products**: Sản phẩm
- Bảng **categories**: Danh mục
- Bảng **orders**: Đơn hàng
- Bảng **order_items**: Chi tiết đơn hàng
- Bảng **profiles**: Thông tin khách hàng
- Bảng **user_roles**: Phân quyền admin/user
- Bảng **posts**: Bài viết tin tức
- **Storage bucket**: Lưu trữ ảnh sản phẩm

---

### ⚠️ **Lưu Ý Quan Trọng**

Đây là dự án lớn, tôi khuyên bạn nên **chia nhỏ thành từng giai đoạn**:

1. **Giai đoạn 1**: Giao diện trang chủ + danh sách sản phẩm (frontend với dữ liệu mẫu)
2. **Giai đoạn 2**: Kết nối database + trang admin quản lý sản phẩm
3. **Giai đoạn 3**: Đăng nhập/đăng ký + giỏ hàng + đặt hàng
4. **Giai đoạn 4**: Quản lý đơn hàng + tin tức + hoàn thiện

Bạn có muốn bắt đầu với giai đoạn 1 (xây dựng giao diện trước) không?

