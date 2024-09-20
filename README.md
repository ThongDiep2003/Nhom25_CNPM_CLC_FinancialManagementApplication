# I. Thành viên nhóm 07:
Nguyễn Hồng Thông Điệp – 21110166

Đoàn Thái Sơn – 21110289

# II. Đề tài: 
Ứng dụng quản lý tài chính.

# III. Đặc tả use case:


## UC01. Đăng ký.
- Brief description: Khách (Guest)  truy cập và tạo tài khoản mới.
- Actor: Guest.
- Pre-conditions: Không. 
- Post-conditions: 
  * Nếu đăng ký thành công: Người dùng được tạo mới tài khoản, thông tin cá nhân được lưu vào CSDL.
  * Nếu đăng ký không thành công: Thông báo không tạo được tài khoản, buộc người dùng nhập lại thông tin cho chính xác.
- Flow of events: 
- Basic flow (Thành công): 
  Use case bắt đầu khi khách truy cập vào trang tạo tài khoản.
  1. Khách điền vào các thông tin mà hệ thống yêu cầu và nhấn Register.
  2. Khách tiến hành xác thực OTP.
  3. Hệ thống xác thực thông tin theo quy định.
  4. Hệ thống tạo mới tài khoản và lưu thông tin vào CSDL.
  5. Hệ thống thông báo tạo tài khoản thành công và chuyển đến trang đăng nhập.
- Alternative flow (Thất bại): 
  Nếu người dùng nhập thiếu thông tin, trùng email, mật khẩu không đúng quy định hay nhập sai OTP  khi đó hệ thống sẽ:
  1. Hệ thống mô tả lý do không thể tạo mới tài khoản.
  2. Hệ thống hiển thị lại biểu mẫu cho người dùng chỉnh sửa thông tin đăng ký.
  3. Người dùng nhập lại thông tin được yêu cầu, Basic Flow khi đó sẽ tiếp tục tại bước 1.
- Extension point:

## UC02. Đăng nhập.
- Brief description: Người dùng đăng nhập vào hệ thống.
- Actor: User.
- Pre-conditions: Actors đã có tài khoản trong hệ thống. 
- Post-conditions: 
  * Sau khi đăng nhập: người dùng được xác thực và vào trang được chỉ định tùy theo từng chức vụ.
  * Đăng nhập thất bại: thông báo lỗi đăng nhập và yêu cầu đăng nhập lại.
- Flow of events: 
- Basic flow (Thành công): 
  Use case được kích hoạt khi người dùng cần đăng nhập vào hệ thống hoặc xác thực danh tính để sử dụng các chức năng của hệ thống:
  1. Người dùng nhập tài khoản và mật khẩu vào các ô input.
  2. Hệ thống kiểm tra input và xác thực.
  3. Hệ thống thông báo xác thực thành công.
- Alternative flow (Thất bại): 
  Khi xác thực thất bại hoặc xảy ra lỗi: hệ thống thông báo lỗi sai.
- Extension point:

## UC03. Đăng xuất.
- Brief description: Đăng xuất tài khoản người dùng khỏi hệ thống.
- Actor: User.
- Pre-conditions: Actors đã đăng nhập thành công vào hệ thống.
- Post-conditions: Tài khoản được đăng xuất thành công ra khỏi hệ thống.
- Flow of events: 
- Basic flow (Thành công): 
  1. Người dùng bấm vào Đăng xuất.
  2. Chuyển qua trang đăng nhập.
- Alternative flow (Thất bại):
- Extension point:

## UC04. Quên mật khẩu.
- Brief description: Giúp người dùng đặt lại mật khẩu qua email khi người dùng quên mật khẩu.
- Actor: User.
- Pre-conditions: Actors đã có tài khoản trong hệ thống.
- Post-conditions: Tài khoản của người dùng được cập nhật mật khẩu mới.
- Flow of events: 
- Basic flow (Thành công): 
  1. Người dùng chọn quên mật khẩu ở trang đăng nhập
  2. Hệ thống hiển thị trang quên mật khẩu 
  3. Người dùng nhập email của mình và chọn nút “Lấy lại mật khẩu”
  4. Hệ thống kiểm tra email và gửi mail đặt lại mật khẩu đến email của người dùng
  5. Người dùng mở mail đặt lại mật khẩu và chọn nút đặt lại mật khẩu
  6. Người dùng được chuyển đến trang đặt lại mật khẩu
  7. Người dùng nhập mật khẩu mới và chọn “Đặt lại mật khẩu”
  8. Đặt lại mật khẩu thành công, người dùng được chuyển về trang đăng nhập
- Alternative flow (Thất bại):
  1. Hệ thống kiểm tra email thất bại
  2. Hệ thống hiện thông báo lỗi
  3. Người dùng nhập lại email
  Use Case quay lại bước 3 của Basic flow
- Extension point:

## UC05. Đổi mật khẩu.
- Brief description: Giúp người dùng đặt lại mật khẩu qua email khi người dùng quên mật khẩu.
- Actor: User.
- Pre-conditions: Actors đã có tài khoản trong hệ thống và đã đăng nhập thành công vào hệ thống.
- Post-conditions: Tài khoản của người dùng được cập nhật mật khẩu mới.
- Flow of events: 
- Basic flow (Thành công): 
  1. Người dùng chọn đổi mật khẩu ở trang cài đặt.
  2. Hệ thống hiển thị trang đổi mật khẩu .
  3. Người dùng nhập mật khẩu hiện tại và mật khẩu mới, sau đó bấm xác nhận.
  4. Hệ thống kiểm tra mật khẩu hiện tại của người dùng, nếu đúng thì sẽ đặt lại mật khẩu.
  5. Đặt lại mật khẩu thành công, người dùng được chuyển về trang đăng nhập.
- Alternative flow (Thất bại):
  1. Hệ thống kiểm tra thấy mật khẩu hiện tại không trùng khớp.
  2. Hệ thống hiện thông báo lỗi
  3. Người dùng nhập lại mật khẩu.
  Use Case quay lại bước 3 của Basic flow
- Extension point:
