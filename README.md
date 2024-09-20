# I. Thành viên nhóm 07:
Nguyễn Hồng Thông Điệp – 21110166
Đoàn Thái Sơn – 21110289

# II. Đề tài: 
Ứng dụng quản lý tài chính.

# III. Đặc tả use case:
o	

UC01. Register
- Brief description: Khách (Guest)  truy cập và tạo tài khoản mới.
- Actor: Guest.
- Pre-conditions: Không. 
- Post-conditions: 
  o	Nếu đăng ký thành công: Người dùng được tạo mới tài khoản, thông tin cá nhân được lưu vào CSDL.
  o	Nếu đăng ký không thành công: Thông báo không tạo được tài khoản, buộc người dùng nhập lại thông tin cho chính xác.
- Flow of events: 
- Basic flow (Thành công): 
  Use case bắt đầu khi khách truy cập vào trang tạo tài khoản.
  1. Khách điền vào các thông tin mà hệ thống yêu cầu và nhấn Register.
  2. Khách tiến hành xác thực OTP.
  3. Hệ thống xác thực thông tin theo quy định.
  4. Hệ thống tạo mới tài khoản và lưu thông tin vào CSDL.
  5. Hệ thống thông báo tạo tài khoản thành công và chuyển đến trang đăng nhập.
- Alternative flow (Thất bại): 
  Nếu người dùng nhập thiếu thông tin, trùng email hoặc mật khẩu không đúng quy định hay nhập sai OTP  khi đó hệ thống sẽ:
  1. Hệ thống mô tả lý do không thể tạo mới tài khoản.
  2. Hệ thống hiển thị lại biểu mẫu cho người dùng chỉnh sửa thông tin đăng ký.
  3. Người dùng nhập lại thông tin được yêu cầu, Basic Flow khi đó sẽ tiếp tục tại bước 1.
- Extension point: Không có
