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
  * Nếu đăng ký thành công: Người dùng được tạo mới tài khoản, thông tin cá nhân được lưu vào cơ sở dữ liệu.
  * Nếu đăng ký không thành công: Thông báo không tạo được tài khoản, buộc người dùng nhập lại thông tin cho chính xác.
- Flow of events: 
- Basic flow (Thành công):
    
     Use case bắt đầu khi khách truy cập vào trang Register.
  
 1. Khách điền vào các thông tin mà hệ thống yêu cầu và nhấn "Register".
 2. Khách tiến hành xác thực OTP.
 3. Hệ thống xác thực thông tin theo quy định.
 4. Hệ thống tạo mới tài khoản và lưu thông tin vào cơ sở dữ liệu.
 5. Hệ thống thông báo tạo tài khoản thành công và chuyển đến trang Login.

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

 1. Người dùng nhập tài khoản và mật khẩu vào các ô input và bấm "Login".
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

 1. Người dùng bấm vào nút "Logout" ở trang Setting.
 2. Hệ thống thực hiện đăng xuất cho người dùng.
 3. Chuyển qua trang đăng nhập.

- Alternative flow (Thất bại):
- Extension point:

## UC04. Quên mật khẩu.
- Brief description: Giúp người dùng đặt lại mật khẩu qua email khi người dùng quên mật khẩu.
- Actor: User.
- Pre-conditions: Actors đã có tài khoản trong hệ thống.
- Post-conditions: Tài khoản của người dùng được cập nhật mật khẩu mới.
- Flow of events: 
- Basic flow (Thành công):

 1. Người dùng chọn "Forgot Password" ở trang Login.
 2. Hệ thống hiển thị trang ForgotPassword .
 3. Người dùng nhập email của mình và chọn nút “Reset Password”.
 4. Hệ thống kiểm tra email và gửi mail đặt lại mật khẩu đến email của người dùng.
 5. Người dùng mở mail đặt lại mật khẩu và chọn nút đặt lại mật khẩu.
 6. Người dùng được chuyển đến trang đặt lại mật khẩu.
 7. Người dùng nhập mật khẩu mới và chọn “Reset”.
 8. Đặt lại mật khẩu thành công, người dùng được chuyển về trang Login.

- Alternative flow (Thất bại):
    
    Đặt lại mật khẩu thất bại.

 1. Hệ thống kiểm tra email thất bại.
 2. Hệ thống hiện thông báo lỗi.
 3. Người dùng nhập lại email.

    Use Case quay lại bước 3 của Basic flow.
- Extension point:

## UC05. Đổi mật khẩu.
- Brief description: Giúp người dùng đặt lại mật khẩu qua email khi người dùng quên mật khẩu.
- Actor: User.
- Pre-conditions: Actors đã có tài khoản trong hệ thống và đã đăng nhập thành công vào hệ thống.
- Post-conditions: Tài khoản của người dùng được cập nhật mật khẩu mới.
- Flow of events: 
- Basic flow (Thành công):

 1. Người dùng chọn "Change Password" ở trang Setting.
 2. Hệ thống hiển thị trang ChangePassword .
 3. Người dùng nhập mật khẩu hiện tại và mật khẩu mới, sau đó bấm "Confirm".
 4. Hệ thống kiểm tra mật khẩu hiện tại của người dùng, nếu đúng thì sẽ đặt lại mật khẩu.
 5. Đặt lại mật khẩu thành công, người dùng được chuyển về trang Login.

- Alternative flow (Thất bại):
  
    Đổi mật khẩu thất bại.

 1. Hệ thống kiểm tra thấy mật khẩu hiện tại không trùng khớp.
 2. Hệ thống hiện thông báo lỗi
 3. Người dùng nhập lại mật khẩu.

    Use Case quay lại bước 3 của Basic flow
- Extension point:

## UC06. Xác nhận OTP.
- Brief description: Người dùng xác thực thông tin đăng ký, thay đổi mật khẩu bằng cách nhập mã OTP được gửi tới (qua email).
- Actor: Người dùng (User) hoặc Guest 
- Pre-conditions: 
- Post-conditions: Người dùng hoàn tất quá trình xác thực và được truy cập hệ thống hoặc được thay đổi mật khẩu.
- Flow of events: 
- Basic flow (Thành công):

 1. Người dùng thực hiện một hành động yêu cầu xác thực (đăng ký hoặc thay đổi mật khẩu).
 2. Hệ thống gửi mã OTP đến người dùng qua phương thức xác thực (email).
 3. Người dùng nhập mã OTP nhận được vào ứng dụng/hệ thống.
 4. Hệ thống xác nhận mã OTP.
 5. Nếu mã OTP đúng, hệ thống cho phép người dùng hoàn tất quy trình xác thực hoặc giao dịch.


- Alternative flow (Thất bại):
  
Nếu mã OTP không hợp lệ hoặc hết hạn:
 1. Hệ thống thông báo mã OTP không hợp lệ hoặc đã hết hạn.
 2. Hệ thống cho phép người dùng yêu cầu mã OTP mới hoặc nhập lại mã.
 1. Nếu người dùng không nhận được mã OTP:
 2. Người dùng chọn tùy chọn "Resend".
Hệ thống gửi mã OTP mới. 
- Extension point:

## UC07. Chọn ngôn ngữ.
- Brief description: Người dùng thay đổi ngôn ngữ giao diện của ứng dụng.
- Actor: User.
- Pre-conditions: Actors đã đăng nhập vào hệ thống.
- Post-conditions: Ngôn ngữ của giao diện được thay đổi theo lựa chọn của người dùng.
- Flow of events: 
- Basic flow (Thành công):

 1. Người dùng truy cập phần "Settings" và chọn mục "Language".
 2. Người dùng chọn ngôn ngữ mong muốn từ danh sách các ngôn ngữ có sẵn.
 3. Hệ thống cập nhật giao diện theo ngôn ngữ được chọn.

- Alternative flow (Thất bại):
  
    Nếu ngôn ngữ không khả dụng hoặc có lỗi xảy ra khi thay đổi ngôn ngữ, hệ thống thông báo lỗi và yêu cầu người dùng thử lại.
- Extension point:  

## UC08. Chỉnh sửa thông tin cá nhân.
- Brief description: Người dùng có chỉnh sửa thông tin cá nhân của mình.
- Actor: User.
- Pre-conditions: Actors đã đăng nhập thành công.
- Post-conditions: Thông tin người dùng đã được chỉnh sửa và cập nhật.
- Flow of events: 
- Basic flow (Thành công):

 1. Người dùng bấm vào Setting, chọn Profile và nhấn vào "Edit".
 2. Người dùng nhập thông tin mới và bấm "Confirm".
 3. Hệ thống cập nhật và hiển thị thông tin mới.

- Alternative flow (Thất bại):
  
    Hệ thống không thể lưu thông tin và báo lỗi khi người dùng nhập thông tin sai định dạng.
- Extension point:

## UC09. Thêm thẻ.
- Brief description: Người dùng có thể thêm một thẻ mới vào hệ thống để sử dụng cho các giao dịch thanh toán và quản lý tài khoản tài chính của họ.
- Actor: Người dùng
- Pre-conditions: Người dùng đã đăng nhập vào hệ thống.
- Post-conditions: Thông tin thẻ mới sẽ được lưu vào hệ thống và người dùng có thể sử dụng thẻ này cho các giao dịch tiếp theo.
- Flow of events: 
- Basic flow (Thành công):

 1. Người dùng truy cập vào trang "Thêm thẻ" thông qua mục quản lý thẻ.
 2. Người dùng điền các thông tin yêu cầu, bao gồm số thẻ, tên chủ thẻ, ngày hết hạn, CVV.
 3. Hệ thống kiểm tra tính hợp lệ của thông tin.
 4. Nếu thông tin hợp lệ, hệ thống lưu thẻ mới vào cơ sở dữ liệu.
 5. Người dùng nhận thông báo xác nhận rằng thẻ đã được thêm thành công.

- Alternative flow (Thất bại):

 1. Nếu thông tin không hợp lệ (sai số thẻ, CVV không chính xác, ngày hết hạn không đúng,...), hệ thống sẽ hiển thị thông báo lỗi.
 2. Người dùng cần sửa lại các thông tin và thực hiện lại bước xác nhận.

    
- Extension point:

## UC10. Xóa thẻ.
- Brief description: Người dùng có thể xóa thẻ đã thêm khỏi hệ thống nếu không còn nhu cầu sử dụng hoặc muốn quản lý các thẻ tài chính một cách dễ dàng hơn.
- Actor: Người dùng
- Pre-conditions: Người dùng đã đăng nhập vào hệ thống.
- Post-conditions: Thẻ sẽ được gỡ khỏi tài khoản của người dùng trong hệ thống và không thể sử dụng cho các giao dịch tiếp theo.
- Flow of events: 
- Basic flow (Thành công):

 1. Người dùng truy cập vào trang quản lý thẻ từ mục cài đặt hoặc thông qua giao diện quản lý tài khoản.
 2. Người dùng chọn thẻ muốn xóa và nhấn nút "Xóa thẻ".
 3. Hệ thống yêu cầu người dùng xác nhận hành động xóa thẻ.
 4. Người dùng xác nhận xóa.
 5. Người dùng nhận được thông báo rằng thẻ đã được xóa thành công.

- Alternative flow (Thất bại):

 1. Nếu thẻ không thể xóa do có các giao dịch đang xử lý hoặc thẻ là thẻ chính cho các giao dịch hiện tại, hệ thống sẽ hiển thị thông báo lỗi.
 2. Người dùng có thể chọn một thẻ khác hoặc thực hiện các bước xử lý để đảm bảo thẻ được phép xóa (ví dụ: đổi thẻ mặc định).

    
- Extension point:

## UC11. Tạo giao dịch mới.
- Brief description: Giúp người dùng thêm thông tin giao dịch mới.
- Actor: User.
- Pre-conditions: Actors đã có tài khoản trong hệ thống và đã đăng nhập thành công vào hệ thống.
- Post-conditions: Hệ thống hiển thị giao dịch vừa thêm của người dùng.
- Flow of events: 
- Basic flow (Thành công):

 1. Người dùng chọn "Add Transaction".
 2. Người dùng điền và chọn các thông tin giao dịch, sau đó bấm "Add".
 3. Hệ thống xác nhật và cập nhật vào dữ liệu của người dùng.
 4. Hệ thống thông báo thêm giao dịch thành công.

- Alternative flow (Thất bại):
  
    Thêm giao dịch thất bại khi người dùng điền thông tin giao dịch sai định dạng.

 1. Hệ thống kiểm tra thông tin giao dịch mới.
 2. Hệ thống thông báo thông tin giao dịch không hợp lệ và yêu cầu người dùng điền lại.

    Use case quay lại bước 2 Basic flow.
- Extension point:

## UC12. Chi tiết giao dịch.
- Brief description: Người dùng có thể chọn một giao dịch từ danh sách giao dịch và xem chi tiết của giao dịch đó, bao gồm số tiền, tài khoản, danh mục, ngày giờ, và ghi chú liên quan. 
- Actor: Người dùng (User)
- Pre-conditions:
  1. Người dùng đã đăng nhập vào hệ thống.
  2. Giao dịch đã được lưu trữ trước đó trong hệ thống.
- Post-conditions: Người dùng có thể xem thông tin chi tiết của giao dịch đã chọn.

- Flow of events: 
- Basic flow (Thành công):

 1. Người dùng vào mục "See all" từ giao diện chính.
 2. Hệ thống hiển thị danh sách các giao dịch.
 3. Người dùng chọn một giao dịch từ danh sách.
 4. Hệ thống hiển thị màn hình chi tiết giao dịch, bao gồm số tiền, ngày giờ, tài khoản, danh mục, và các ghi chú liên quan.

- Alternative flow (Thất bại): Hệ thống báo không tìm thấy giao dịch
- Extension point:  

## UC13. Chỉnh sửa giao dịch.
- Brief description: Người dùng chỉnh sửa thông tin của một giao dịch đã tồn tại trong danh sách giao dịch.
- Actor: User.
- Pre-conditions: Actors đã có các giao dịch được ghi nhận.
- Post-conditions: Thông tin giao dịch được cập nhật trong cơ sở dữ liệu.
- Flow of events: 
- Basic flow (Thành công):

 1. Người dùng truy cập phần "Transactions List" và chọn một giao dịch cụ thể.
 2. Hệ thống sẽ dẫn người dùng vào trang Detail Transaction có chứa nút Edit.
 3. Người dùng, nhấn nút Edit để chuyển sang trang thay đổi thông tin giao dịch (ví dụ: số tiền, ghi chú, loại giao dịch) rồi nhấn nút Confirm.
 4. Hệ thống xác thực và cập nhật thông tin giao dịch trong cơ sở dữ liệu.
<br><br>
- Alternative flow (Thất bại):
  
    Nếu thông tin không hợp lệ, hệ thống thông báo lỗi và yêu cầu người dùng nhập lại thông tin chính xác.
- Extension point:  

## UC14. Xóa giao dịch.
- Brief description: Người dùng xóa một giao dịch đã tồn tại khỏi danh sách giao dịch của mình.
- Actor: User.
- Pre-conditions: Actors đã có các giao dịch trong hệ thống.
- Post-conditions: Giao dịch được xóa khỏi cơ sở dữ liệu và không còn xuất hiện trong danh sách giao dịch.
- Flow of events: 
- Basic flow (Thành công):

 1. Người dùng truy cập phần "Transactions List" và chọn một giao dịch.
 2. Hệ thống sẽ hiển thị trang Detail Transaction, trong đó có chứa nút Delete Transaction.
 3. Người dùng nhấn nút Delete, hệ thống sẽ hiện thông báo để xác thực yêu cầu của người dùng.
 4. Người dùng nhấn nút Confirm để xác thực yêu cầu.
 5. Hệ thống xóa giao dịch khỏi cơ sở dữ liệu và cập nhật danh sách giao dịch.

- Alternative flow (Thất bại):
  
    Nếu có lỗi xảy ra khi xóa giao dịch, hệ thống thông báo lỗi và yêu cầu người dùng thử lại.
- Extension point:

## UC15. Thống kê giao dịch.
- Brief description: Giúp người dùng thống kê thu nhập và chi tiêu theo từng thời điểm.
- Actor: User.
- Pre-conditions: Actors đã có tài khoản trong hệ thống và đã đăng nhập thành công vào hệ thống.
- Post-conditions: Hệ thống hiển thị thống kê của người dùng.
- Flow of events: 
- Basic flow (Thành công):

 1. Người dùng chọn "Statistic".
 2. Hệ thống truy cập dữ liệu người dùng, thống kê thu nhập và chi tiêu của người dùng và hiển thị ra trang thống kê.

- Alternative flow (Thất bại):

 1. Hệ thống kiểm tra thấy thông tin thu nhập và chi tiêu của người dùng không tồn tại.
 2. Hệ thống thông báo người dùng không có thông tin thu nhập và chi tiêu.

    
- Extension point:

## UC16. Tìm kiếm giao dịch.
- Brief description: Người dùng có thể thực hiện tìm kiếm Transaction.
- Actor: User.
- Pre-conditions: Actors đã có các giao dịch.
- Post-conditions: Tìm được các giao dịch.
- Flow of events: 
- Basic flow (Thành công):

 1. Người dùng bấm vào nút tìm kiếm trong phần Transaction.
 2. Người dùng nhập thông tin tìm kiếm
 3. Hệ thống hiển thị kết quả tìm kiếm.

- Alternative flow (Thất bại):
  
    Hệ thống không tìm thấy Transaction khi người dùng nhập sai thông tin tìm kiếm hoặc Transaction không tồn tại.
- Extension point:

## UC17. Lọc giao dịch.
- Brief description: Người dùng có thể thực hiện lọc tìm Transaction.
- Actor: User.
- Pre-conditions: Actors đã có các giao dịch.
- Post-conditions: Tìm được các giao dịch.
- Flow of events: 
- Basic flow (Thành công):

 1. Người dùng bấm vào nút lọc trong phần Transaction.
 2. Người dùng chọn tiêu chí lọc.
 3. Hệ thống hiển thị kết quả lọc.

- Alternative flow (Thất bại):
  
    Hệ thống không tìm thấy Transaction khi Transaction không tồn tại.
- Extension point:

## UC18. Tạo ngân sách mới.
- Brief description: Người dùng tạo ra những hạn mức chi thu (hay cho gọi là ngân sách) cho những danh mục mình mong muốn trong phần Budget.
- Actor: Người dùng
- Pre-conditions: Người dùng đã có tài khoản trong hệ thống
- Post-conditions: Hệ thống sẽ lưu trữ ngân sách trong cơ sở dữ liệu và hiển thị trong danh sách ngân sách của người dùng.
- Flow of events: 
- Basic flow (Thành công):

 1. Người dùng truy cập vào mục "Ngân sách" từ trang chính hoặc mục cài đặt.
 2. Người dùng nhấn vào tùy chọn "Tạo ngân sách mới".
 3. Hệ thống hiển thị biểu mẫu yêu cầu người dùng nhập thông tin ngân sách, bao gồm: Danh mục và Số tiền
 4. Người dùng điền đầy đủ thông tin và nhấn "Xác nhận".
 5. Hệ thống kiểm tra tính hợp lệ của thông tin và lưu ngân sách vào cơ sở dữ liệu.
 6. Hệ thống thông báo rằng ngân sách đã được tạo thành công và hiển thị ngân sách vừa tạo trong danh sách ngân sách của người dùng.
- Alternative flow (Thất bại):

  1. Nếu người dùng nhập thiếu thông tin hoặc nhập thông tin không hợp lệ, hệ thống sẽ hiển thị thông báo lỗi.
  2. Người dùng sẽ được yêu cầu sửa đổi thông tin và thực hiện lại các bước từ bước 3.
- Extension point:

## UC19. Xem chi tiết ngân sách.
- Brief description: Người dùng có thể xem thông tin chi tiết của một ngân sách đã tạo trước đó, bao gồm tổng số tiền ngân sách, chi tiêu hiện tại và các giao dịch đã được liên kết với ngân sách. Thông tin này giúp người dùng theo dõi tình hình tài chính của mình trong thời gian thực.
- Actor: Người dùng
- Pre-conditions: Người dùng đã đăng nhập vào hệ thống.
- Post-conditions: Hệ thống hiển thị thông tin chi tiết ngân sách, bao gồm giới hạn ngân sách, chi tiêu hiện tại và các giao dịch đã xảy ra.
- Flow of events: 
- Basic flow (Thành công):

 1. Người dùng truy cập vào mục "Ngân sách" từ trang chính hoặc từ menu quản lý.
 2. Hệ thống hiển thị danh sách các ngân sách mà người dùng đã tạo.
 3. Người dùng nhấn vào một ngân sách để xem chi tiết.
 4. Hệ thống hiển thị thông tin chi tiết của ngân sách bao gồm:
     - Tổng số tiền ngân sách.
     - Số tiền đã chi tiêu (được cập nhật theo các giao dịch thực tế).
     - Số tiền còn lại hoặc vượt quá giới hạn.
     - Danh sách các giao dịch đã được liên kết với ngân sách.

- Alternative flow (Thất bại):
  1. Nếu không có giao dịch nào liên quan đến ngân sách, hệ thống sẽ hiển thị thông báo rằng chưa có giao dịch.
  2. Người dùng có thể nhấn vào tùy chọn "Thêm giao dịch" hoặc "Chỉnh sửa ngân sách" nếu cần.
- Extension point:

## UC20. Chỉnh sửa ngân sách.
- Brief description: Người dùng có thể chỉnh sửa các thông tin liên quan đến ngân sách mà họ đã tạo trước đó, bao gồm việc điều chỉnh tổng số tiền ngân sách, thay đổi danh mục.
- Actor: Người dùng
- Pre-conditions:
  1. Người dùng đã đăng nhập vào hệ thống.
  2. Người dùng đã có ít nhất một ngân sách được tạo trước đó.
- Post-conditions: Hệ thống lưu lại các thay đổi và cập nhật thông tin ngân sách mới nhất.
- Flow of events: 
- Basic flow (Thành công):

 1. Người dùng truy cập vào mục "Ngân sách" và chọn một ngân sách cụ thể từ danh sách.
 2. Hệ thống hiển thị chi tiết của ngân sách.
 3. Người dùng nhấn vào nút "Chỉnh sửa".
 4. Hệ thống hiển thị giao diện chỉnh sửa ngân sách với các trường thông tin có thể thay đổi:
 5. Tổng số tiền ngân sách (người dùng có thể tăng/giảm số tiền).
 6. Danh mục chi tiêu/thu nhập áp dụng cho ngân sách.
 7. Người dùng thực hiện các thay đổi và nhấn "Xác nhận" để lưu lại thông tin.
 8. Hệ thống kiểm tra tính hợp lệ của thông tin đầu vào.
 9. Nếu mọi thông tin hợp lệ, hệ thống sẽ cập nhật ngân sách với các thay đổi mới.
 10. Người dùng được thông báo chỉnh sửa ngân sách thành công và quay lại màn hình chi tiết ngân sách.
- Alternative flow (Thất bại):
  1. Nếu người dùng nhập sai dữ liệu (ví dụ số tiền không hợp lệ hoặc thời gian không đúng), hệ thống sẽ hiển thị thông báo lỗi và yêu cầu người dùng sửa lại.
  2. Người dùng có thể hủy bỏ quá trình chỉnh sửa và quay lại màn hình chi tiết mà không lưu bất kỳ thay đổi nào.

- Extension point:

## UC21. Xóa ngân sách.
- Brief description: Người dùng có thể xóa một ngân sách mà họ đã tạo trước đó. Việc xóa ngân sách sẽ loại bỏ hoàn toàn các thông tin liên quan đến ngân sách đó nhưng không ảnh hưởng đến lịch sử giao dịch đã ghi nhận.
- Actor: Người dùng
- Pre-conditions: Người dùng đã đăng nhập vào hệ thống.
- Người dùng đã có ít nhất một ngân sách được tạo trước đó.
- Post-conditions: Hệ thống xóa toàn bộ thông tin liên quan đến ngân sách, không còn hiển thị trong danh sách ngân sách của người dùng.
- Flow of events: 
- Basic flow (Thành công):

 1. Người dùng truy cập vào mục "Ngân sách" và chọn ngân sách mà họ muốn xóa từ danh sách.
 2. Hệ thống hiển thị chi tiết của ngân sách.
 3. Người dùng nhấn vào nút "Xóa" ngân sách.
 4. Hệ thống hiển thị một thông báo xác nhận, yêu cầu người dùng xác nhận họ thực sự muốn xóa ngân sách này.
 5. Người dùng xác nhận xóa ngân sách.
 6. Hệ thống kiểm tra và xóa ngân sách khỏi cơ sở dữ liệu, cùng với tất cả thông tin liên quan.
 7. Người dùng nhận được thông báo ngân sách đã xóa thành công và quay trở lại danh sách ngân sách, nơi ngân sách vừa xóa không còn hiển thị.
- Alternative flow (Thất bại):
  1. Nếu người dùng nhấn "Hủy" tại bước xác nhận, quá trình xóa sẽ bị hủy bỏ và người dùng quay lại màn hình chi tiết ngân sách mà không có bất kỳ thay đổi nào.
  2. Nếu hệ thống gặp sự cố trong quá trình xóa (ví dụ lỗi kết nối hoặc cơ sở dữ liệu), người dùng nhận được thông báo lỗi và có thể thử lại sau.
- Extension point:

## UC22. Tạo mục tiêu mới.
- Brief description: Người dùng tạo các mục tiêu tài mới chính trong phần Budget.
- Actor: User.
- Pre-conditions: Actors đã đăng nhập thành công vào hệ thống.
- Post-conditions: Mục tiêu được tạo thành công và hiển thị.
- Flow of events: 
- Basic flow (Thành công):

 1. Người dùng truy cập mục tiêu tài chính trong phần Budget.
 2. Hệ thống hiển thị các mục tiêu tài chính theo từng danh mục, như ăn uống, mua sắm, giải trí và các biểu đồ thống kê xu hướng chi tiêu của người dùng.
 3. Người dùng Bấm "Add new".
 4. Người dùng nhập và chọn thông tin của mục tiêu, sau đó bấm "Add".
 5. Hệ thống thông báo thêm thành công và hiển thị mục tiêu tài chính vừa tạo.

- Alternative flow (Thất bại):
  
    Nếu người dùng nhập các ký tự lạ, định dạng sai thì sẽ không tạo được mục tiêu mới.

 1. Hệ thống sẽ thông báo thông tin mục tiêu không phù hợp.
 2. Người dùng nhập lại thông tin mới.

    Use case quay trở lại bước 4.
- Extension point:

## UC23. Chi tiết mục tiêu.
- Brief description: Brief description 
Người dùng có thể xem thông tin chi tiết của từng mục tiêu tài chính đã đặt ra. Điều này bao gồm các thông tin như tên mục tiêu, số tiền cần đạt, số tiền đã tiết kiệm được và tỷ lệ hoàn thành.
- Actor: Người dùng
- Pre-conditions:
  1. Người dùng đã đăng nhập vào hệ thống.
  2. Người dùng đã thiết lập ít nhất một mục tiêu ngân sách.
- Post-conditions: Hệ thống hiển thị chi tiết mục tiêu mà người dùng yêu cầu, bao gồm các thông tin về tiến độ đạt được và những dữ liệu liên quan khác.
- Flow of events: 
- Basic flow (Thành công):

 1. Người dùng truy cập vào phần "Mục tiêu ngân sách" trong ứng dụng.
 2. Hệ thống hiển thị danh sách các mục tiêu mà người dùng đã thiết lập.
 3. Người dùng nhấp chọn một mục tiêu cụ thể từ danh sách để xem chi tiết.
 4. Hệ thống hiển thị thông tin chi tiết về mục tiêu, bao gồm:
     - Tên mục tiêu.
     - Số tiền cần đạt.
     - Số tiền đã tiết kiệm được cho mục tiêu.
- Alternative flow (Thất bại): Nếu không có mục tiêu nào được thiết lập, hệ thống sẽ hiển thị thông báo "Bạn chưa có mục tiêu nào được tạo".
  
- Extension point:

## UC24. Sửa mục tiêu tài chính.
- Brief description: Người dùng sửa các mục tiêu tài chính trong phần Budget.
- Actor: User.
- Pre-conditions: Actors đã có các mục tiêu tài chính.
- Post-conditions: Cập nhật thành công mục tiêu tài chính.
- Flow of events: 
- Basic flow (Thành công):

 1. Người dùng truy cập mục tiêu tài chính trong phần Budget.
 2. Hệ thống hiển thị các mục tiêu tài chính theo từng danh mục, như ăn uống, mua sắm, giải trí và các biểu đồ thống kê xu hướng chi tiêu của người dùng.
 3. Người dùng bấm vào mục tiêu cần sửa đổi.
 4. Người dùng nhập và chọn thông tin của mục tiêu, sau đó bấm "Change".
 5. Hệ thống thông báo sửa thành công, cập nhật và hiển thị mục tiêu tài chính vừa sửa đổi.

- Alternative flow (Thất bại):
  
    Nếu không có giao mục tiêu tài chính, hệ thống hiển thị thông báo không có mục tiêu nào,   nếu người dùng nhập các ký tự lạ, định dạng sai thì sẽ không tạo được mục tiêu mới.

 1. Hệ thống sẽ thông báo thông tin mục tiêu không phù hợp.
 2. Người dùng nhập lại thông tin mới

     Use case quay trở lại bước 4.
- Extension point:

## UC25. Xóa mục tiêu tài chính.
- Brief description: Người dùng sửa các mục tiêu tài chính trong phần Budget.
- Actor: User.
- Pre-conditions: Actors đã có các mục tiêu tài chính.
- Post-conditions: Cập nhật thành công mục tiêu tài chính.
- Flow of events: 
- Basic flow (Thành công):

 1. Người dùng truy cập mục tiêu tài chính trong phần Budget.
 2. Hệ thống hiển thị các mục tiêu tài chính theo từng danh mục, như ăn uống, mua sắm, giải trí và các biểu đồ thống kê xu hướng chi tiêu của người dùng.
 3. Người dùng bấm vào mục tiêu cần xóa.
 4. Người dùng chọn "Delete".
 5. Hệ thống thông báo xóa thành công và cập nhật.

- Alternative flow (Thất bại):
  
    Nếu không có giao mục tiêu tài chính, hệ thống hiển thị thông báo không có mục tiêu nào.
- Extension point:


# IV. Hình ảnh các giao diện: 

## 0. Onboarding.

![image](https://github.com/user-attachments/assets/12ed823f-1cfb-4568-b7f7-66180bfe6f28)
![image](https://github.com/user-attachments/assets/96965649-4d52-4475-8591-855356fc87e6)

![image](https://github.com/user-attachments/assets/3fb8033f-3b81-481f-96a9-05558d7ff4a4)
![image](https://github.com/user-attachments/assets/0642df1d-8867-4589-8a44-d905968b7892)



## 1. Login.


![image](https://github.com/user-attachments/assets/d8fa102d-ad56-44d5-9911-bd70a7923ab0)


## 2. Register.


![image](https://github.com/user-attachments/assets/d52a0f88-3379-4ee1-8311-87f9813a1672)
![image](https://github.com/user-attachments/assets/8949b4c5-8023-4895-bf19-eda8059c0b72)



## 4. Forgot Password.


![image](https://github.com/user-attachments/assets/ee7980f6-5e8b-40df-8ca2-75d2b918cbe1)

![image](https://github.com/user-attachments/assets/da73a956-90ec-4bcb-9f09-df89f3f14321)


![image](https://github.com/user-attachments/assets/a9f3de47-de6b-4977-81cb-a8749bc2f33a)
![image](https://github.com/user-attachments/assets/563a3135-e3aa-449b-8925-4a932343b783)


![image](https://github.com/user-attachments/assets/f1de1d75-65c4-47ca-9214-cc801c3511ae)
![image](https://github.com/user-attachments/assets/6d87c37c-2c8d-48e0-9402-933c3c61a6f6)

## 5. Home.

![image](https://github.com/user-attachments/assets/f1e6614d-1ed4-4f38-9418-6755b1ad5ca6)


## 6. Transaction.

![image](https://github.com/user-attachments/assets/e1caff41-b493-4bcb-8a95-d7793379cde0)
![image](https://github.com/user-attachments/assets/7ca641e8-17f3-4f66-a2a1-cd12879ed797)


## 7. Edit Transaction.

![image](https://github.com/user-attachments/assets/5fe543de-e303-4e2f-9fb1-5af1030591be)


## 8. Search Transaction.

![image](https://github.com/user-attachments/assets/6d425f16-77eb-4e16-a719-a7560e766dd4)


## 9. Statistic.

![image](https://github.com/user-attachments/assets/17b6f138-9285-44dc-89e7-596dc7c5341f)


## 10. Add Transaction.

![image](https://github.com/user-attachments/assets/911f3afc-66ef-475a-8ed2-dead4bb54f13)
![image](https://github.com/user-attachments/assets/a8dd63c8-6a73-427f-bf53-ce41b52be005)
![image](https://github.com/user-attachments/assets/a7a4cf84-2ea9-4f46-a751-cdf53b84a8b3)
![image](https://github.com/user-attachments/assets/ef618c27-8b24-4194-82a7-53807de4bb1d)


## 11. Transaction Budget.

![image](https://github.com/user-attachments/assets/1a9a3e94-a780-4645-8df3-7beb7ea1824b)

## 12. Personal Budget.

![image](https://github.com/user-attachments/assets/56d4f238-f50a-4387-8279-fd38cd3a68da)



## 13. Goal.

![image](https://github.com/user-attachments/assets/5748aea8-b130-4256-a065-3009674f61c3)


## 14. Setting.

![image](https://github.com/user-attachments/assets/91dd3138-df7a-446d-ab99-9d3aaa419792)


## 15. Profile.

![Profile](https://github.com/user-attachments/assets/d6a0895e-8aa3-4a7a-a551-dc3ad0426efe)

## 16. Edit Profile.

![image](https://github.com/user-attachments/assets/a88ca2d0-a272-40c9-91f9-17f2725ba24b)


## 17. Add New Card.

![image](https://github.com/user-attachments/assets/6e546395-c55e-492d-9f4c-9078e0d9811b)

![image](https://github.com/user-attachments/assets/0b03ebab-f893-438b-a3ff-67e8963f21ef)

![image](https://github.com/user-attachments/assets/93035104-4a68-4b77-b4bf-557ef5e1b007)



## 18. Change Langue.

![image](https://github.com/user-attachments/assets/73d2b379-890d-4b69-8ce9-3a726e4ed144)



## 19. Change Password.

![image](https://github.com/user-attachments/assets/7f2e62e6-8fa4-4092-92fe-a0ae8a3cb9f6)


## 20. Term & Condition.

![image](https://github.com/user-attachments/assets/c71818e4-92cd-4871-9492-814db0c1133e)









