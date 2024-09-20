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
  * Basic flow (Thành công):
    
     Use case bắt đầu khi khách truy cập vào trang Register.
<br><br>
  1. Khách điền vào các thông tin mà hệ thống yêu cầu và nhấn "Register".
  2. Khách tiến hành xác thực OTP.
  3. Hệ thống xác thực thông tin theo quy định.
  4. Hệ thống tạo mới tài khoản và lưu thông tin vào cơ sở dữ liệu.
  5. Hệ thống thông báo tạo tài khoản thành công và chuyển đến trang Login.
<br><br>
  * Alternative flow (Thất bại):
    
    Nếu người dùng nhập thiếu thông tin, trùng email, mật khẩu không đúng quy định hay nhập sai OTP  khi đó hệ thống sẽ:
<br><br>
  1. Hệ thống mô tả lý do không thể tạo mới tài khoản.
  2. Hệ thống hiển thị lại biểu mẫu cho người dùng chỉnh sửa thông tin đăng ký.
  3. Người dùng nhập lại thông tin được yêu cầu, Basic Flow khi đó sẽ tiếp tục tại bước 1.
<br><br>
- Extension point:

## UC02. Đăng nhập.
- Brief description: Người dùng đăng nhập vào hệ thống.
- Actor: User.
- Pre-conditions: Actors đã có tài khoản trong hệ thống. 
- Post-conditions: 
  * Sau khi đăng nhập: người dùng được xác thực và vào trang được chỉ định tùy theo từng chức vụ.
  * Đăng nhập thất bại: thông báo lỗi đăng nhập và yêu cầu đăng nhập lại.
- Flow of events: 
  * Basic flow (Thành công):
    
    Use case được kích hoạt khi người dùng cần đăng nhập vào hệ thống hoặc xác thực danh tính để sử dụng các chức năng của hệ thống:
<br><br>
  1. Người dùng nhập tài khoản và mật khẩu vào các ô input và bấm "Login".
  2. Hệ thống kiểm tra input và xác thực.
  3. Hệ thống thông báo xác thực thành công.
<br><br>
  * Alternative flow (Thất bại):
    
    Khi xác thực thất bại hoặc xảy ra lỗi: hệ thống thông báo lỗi sai.
- Extension point:

## UC03. Đăng xuất.
- Brief description: Đăng xuất tài khoản người dùng khỏi hệ thống.
- Actor: User.
- Pre-conditions: Actors đã đăng nhập thành công vào hệ thống.
- Post-conditions: Tài khoản được đăng xuất thành công ra khỏi hệ thống.
- Flow of events: 
  * Basic flow (Thành công):
  <br><br>
  1. Người dùng bấm vào nút "Logout" ở trang Setting.
  2. Hệ thống thực hiện đăng xuất cho người dùng.
  3. Chuyển qua trang đăng nhập.
<br><br>
  * Alternative flow (Thất bại):
- Extension point:

## UC04. Quên mật khẩu.
- Brief description: Giúp người dùng đặt lại mật khẩu qua email khi người dùng quên mật khẩu.
- Actor: User.
- Pre-conditions: Actors đã có tài khoản trong hệ thống.
- Post-conditions: Tài khoản của người dùng được cập nhật mật khẩu mới.
- Flow of events: 
  * Basic flow (Thành công):
  <br><br>
  1. Người dùng chọn "Forgot Password" ở trang Login.
  2. Hệ thống hiển thị trang ForgotPassword .
  3. Người dùng nhập email của mình và chọn nút “Reset Password”.
  4. Hệ thống kiểm tra email và gửi mail đặt lại mật khẩu đến email của người dùng.
  5. Người dùng mở mail đặt lại mật khẩu và chọn nút đặt lại mật khẩu.
  6. Người dùng được chuyển đến trang đặt lại mật khẩu.
  7. Người dùng nhập mật khẩu mới và chọn “Reset”.
  8. Đặt lại mật khẩu thành công, người dùng được chuyển về trang Login.
<br><br>
  * Alternative flow (Thất bại):
    
    Đặt lại mật khẩu thất bại.
<br><br>
  1. Hệ thống kiểm tra email thất bại.
  2. Hệ thống hiện thông báo lỗi.
  3. Người dùng nhập lại email.
<br><br>
    Use Case quay lại bước 3 của Basic flow.
- Extension point:

## UC05. Đổi mật khẩu.
- Brief description: Giúp người dùng đặt lại mật khẩu qua email khi người dùng quên mật khẩu.
- Actor: User.
- Pre-conditions: Actors đã có tài khoản trong hệ thống và đã đăng nhập thành công vào hệ thống.
- Post-conditions: Tài khoản của người dùng được cập nhật mật khẩu mới.
- Flow of events: 
  * Basic flow (Thành công):
  <br><br>
  1. Người dùng chọn "Change Password" ở trang Setting.
  2. Hệ thống hiển thị trang ChangePassword .
  3. Người dùng nhập mật khẩu hiện tại và mật khẩu mới, sau đó bấm "Comfirm".
  4. Hệ thống kiểm tra mật khẩu hiện tại của người dùng, nếu đúng thì sẽ đặt lại mật khẩu.
  5. Đặt lại mật khẩu thành công, người dùng được chuyển về trang Login.
<br><br>
  * Alternative flow (Thất bại):
  
    Đổi mật khẩu thất bại.
<br><br>
  1. Hệ thống kiểm tra thấy mật khẩu hiện tại không trùng khớp.
  2. Hệ thống hiện thông báo lỗi
  3. Người dùng nhập lại mật khẩu.
<br><br>
    Use Case quay lại bước 3 của Basic flow
- Extension point:

## UC06. Thống kê.
- Brief description: Giúp người dùng thống kê thu nhập và chi tiêu theo từng thời điểm.
- Actor: User.
- Pre-conditions: Actors đã có tài khoản trong hệ thống và đã đăng nhập thành công vào hệ thống.
- Post-conditions: Hệ thống hiển thị thống kê của người dùng.
- Flow of events: 
  * Basic flow (Thành công):
  <br><br>
  1. Người dùng chọn "Statistic".
  2. Hệ thống truy cập dữ liệu người dùng, thống kê thu nhập và chi tiêu của người dùng và hiển thị ra trang thống kê.
<br><br>
  * Alternative flow (Thất bại):
  <br><br>
  1. Hệ thống kiểm tra thấy thông tin thu nhập và chi tiêu của người dùng không tồn tại.
  2. Hệ thống thông báo người dùng không có thông tin thu nhập và chi tiêu.
<br><br>
    
- Extension point:

## UC07. Thêm giao dịch mới.
- Brief description: Giúp người dùng thêm thông tin giao dịch mới.
- Actor: User.
- Pre-conditions: Actors đã có tài khoản trong hệ thống và đã đăng nhập thành công vào hệ thống.
- Post-conditions: Hệ thống hiển thị giao dịch vừa thêm của người dùng.
- Flow of events: 
  * Basic flow (Thành công):
  <br><br>
  1. Người dùng chọn "Add Transaction".
  2. Người dùng điền và chọn các thông tin giao dịch, sau đó bấm "Add".
  3. Hệ thống xác nhật và cập nhật vào dữ liệu của người dùng.
  4. Hệ thống thông báo thêm giao dịch thành công.
<br><br>
  * Alternative flow (Thất bại):
  
    Thêm giao dịch thất bại khi người dùng điền thông tin giao dịch sai định dạng.
<br><br>
  1. Hệ thống kiểm tra thông tin giao dịch mới.
  2. Hệ thống thông báo thông tin giao dịch không hợp lệ và yêu cầu người dùng điền lại.
<br><br>
    Use case quay lại bước 2 Basic flow.
- Extension point:

## UC08. Xóa giao dịch.
- Brief description: Người dùng xóa một giao dịch đã tồn tại khỏi danh sách giao dịch của mình.
- Actor: User.
- Pre-conditions: Actors đã có các giao dịch trong hệ thống.
- Post-conditions: Giao dịch được xóa khỏi cơ sở dữ liệu và không còn xuất hiện trong danh sách giao dịch.
- Flow of events: 
  * Basic flow (Thành công):
  <br><br>
  1. Người dùng truy cập phần "Transactions List" và chọn một giao dịch.
  2. Hệ thống sẽ hiển thị trang Detail Transaction, trong đó có chứa nút Delete Transaction.
  3. Người dùng nhấn nút Delete, hệ thống sẽ hiện thông báo để xác thực yêu cầu của người dùng.
  4. Người dùng nhấn nút Confirm để xác thực yêu cầu.
  5. Hệ thống xóa giao dịch khỏi cơ sở dữ liệu và cập nhật danh sách giao dịch.
<br><br>
  * Alternative flow (Thất bại):
  
    Nếu có lỗi xảy ra khi xóa giao dịch, hệ thống thông báo lỗi và yêu cầu người dùng thử lại.
- Extension point:

## UC09. Chỉnh sửa giao dịch.
- Brief description: Người dùng chỉnh sửa thông tin của một giao dịch đã tồn tại trong danh sách giao dịch.
- Actor: User.
- Pre-conditions: Actors đã có các giao dịch được ghi nhận.
- Post-conditions: Thông tin giao dịch được cập nhật trong cơ sở dữ liệu.
- Flow of events: 
  * Basic flow (Thành công):
  <br><br>
  1. Người dùng truy cập phần "Transactions List" và chọn một giao dịch cụ thể.
  2. Hệ thống sẽ dẫn người dùng vào trang Detail Transaction có chứa nút Edit.
  3. Người dùng, nhấn nút Edit để chuyển sang trang thay đổi thông tin giao dịch (ví dụ: số tiền, ghi chú, loại giao dịch) rồi nhấn nút Confirm.
  4. Hệ thống xác thực và cập nhật thông tin giao dịch trong cơ sở dữ liệu.
<br><br>
  * Alternative flow (Thất bại):
  
    Nếu thông tin không hợp lệ, hệ thống thông báo lỗi và yêu cầu người dùng nhập lại thông tin chính xác.
- Extension point:  

## UC10. Chọn ngôn ngữ.
- Brief description: Người dùng thay đổi ngôn ngữ giao diện của ứng dụng.
- Actor: User.
- Pre-conditions: Actors đã đăng nhập vào hệ thống.
- Post-conditions: Ngôn ngữ của giao diện được thay đổi theo lựa chọn của người dùng.
- Flow of events: 
  * Basic flow (Thành công):
  <br><br>
  1. Người dùng truy cập phần "Settings" và chọn mục "Language".
  2. Người dùng chọn ngôn ngữ mong muốn từ danh sách các ngôn ngữ có sẵn.
  3. Hệ thống cập nhật giao diện theo ngôn ngữ được chọn.
<br><br>
  * Alternative flow (Thất bại):
  
    Nếu ngôn ngữ không khả dụng hoặc có lỗi xảy ra khi thay đổi ngôn ngữ, hệ thống thông báo lỗi và yêu cầu người dùng thử lại.
- Extension point:  

## UC11. Xem chi tiết chi tiêu.
- Brief description: Hiển thị chi tiết các khoản chi tiêu của người dùng trong Budget.
- Actor: User.
- Pre-conditions: Actors đã thực hiện các giao dịch chi tiêu.
- Post-conditions: Các khoản chi tiêu được hiển thị.
- Flow of events: 
  * Basic flow (Thành công):
  <br><br>
  1. Người dùng truy cập danh sách chi tiêu trong phần Budget.
  2. Hệ thống hiển thị các khoản chi tiêu theo từng danh mục, như ăn uống, mua sắm, giải trí và các biểu đồ thống kê xu hướng chi tiêu của người dùng.
<br><br>
  * Alternative flow (Thất bại):
  
    Nếu không có giao dịch chi tiêu, hệ thống hiển thị thông báo không có chi tiêu nào.
- Extension point:

  ## UC12. Tạo mục tiêu tài chính.
- Brief description: Người dùng tạo các mục tiêu tài mới chính trong phần Budget.
- Actor: User.
- Pre-conditions: Actors đã đăng nhập thành công vào hệ thống.
- Post-conditions: Mục tiêu được tạo thành công và hiển thị.
- Flow of events: 
  * Basic flow (Thành công):
  <br><br>
  1. Người dùng truy cập mục tiêu tài chính trong phần Budget.
  2. Hệ thống hiển thị các mục tiêu tài chính theo từng danh mục, như ăn uống, mua sắm, giải trí và các biểu đồ thống kê xu hướng chi tiêu của người dùng.
  3. Người dùng Bấm "Add new".
  4. Người dùng nhập và chọn thông tin của mục tiêu, sau đó bấm "Add".
  5. Hệ thống thông báo thêm thành công và hiển thị mục tiêu tài chính vừa tạo.
<br><br>
  * Alternative flow (Thất bại):
  
    Nếu người dùng nhập các ký tự lạ, định dạng sai thì sẽ không tạo được mục tiêu mới.
<br><br>
  1. Hệ thống sẽ thông báo thông tin mục tiêu không phù hợp.
  2. Người dùng nhập lại thông tin mới.
    <br><br>
    Use case quay trở lại bước 4.
- Extension point:

   ## UC13. Sửa mục tiêu tài chính.
- Brief description: Người dùng sửa các mục tiêu tài chính trong phần Budget.
- Actor: User.
- Pre-conditions: Actors đã có các mục tiêu tài chính.
- Post-conditions: Cập nhật thành công mục tiêu tài chính.
- Flow of events: 
  * Basic flow (Thành công):
  <br><br>
  1. Người dùng truy cập mục tiêu tài chính trong phần Budget.
  2. Hệ thống hiển thị các mục tiêu tài chính theo từng danh mục, như ăn uống, mua sắm, giải trí và các biểu đồ thống kê xu hướng chi tiêu của người dùng.
  3. Người dùng bấm vào mục tiêu cần sửa đổi.
  4. Người dùng nhập và chọn thông tin của mục tiêu, sau đó bấm "Change".
  5. Hệ thống thông báo sửa thành công, cập nhật và hiển thị mục tiêu tài chính vừa sửa đổi.
<br><br>
  * Alternative flow (Thất bại):
  
    Nếu không có giao mục tiêu tài chính, hệ thống hiển thị thông báo không có mục tiêu nào,   nếu người dùng nhập các ký tự lạ, định dạng sai thì sẽ không tạo được mục tiêu mới.
<br><br>
  1. Hệ thống sẽ thông báo thông tin mục tiêu không phù hợp.
  2. Người dùng nhập lại thông tin mới
   <br><br>
     Use case quay trở lại bước 4.
- Extension point:

   ## UC14. Xóa mục tiêu tài chính.
- Brief description: Người dùng sửa các mục tiêu tài chính trong phần Budget.
- Actor: User.
- Pre-conditions: Actors đã có các mục tiêu tài chính.
- Post-conditions: Cập nhật thành công mục tiêu tài chính.
- Flow of events: 
  * Basic flow (Thành công):
  <br><br>
  1. Người dùng truy cập mục tiêu tài chính trong phần Budget.
  2. Hệ thống hiển thị các mục tiêu tài chính theo từng danh mục, như ăn uống, mua sắm, giải trí và các biểu đồ thống kê xu hướng chi tiêu của người dùng.
  3. Người dùng bấm vào mục tiêu cần xóa.
  4. Người dùng chọn "Delete".
  5. Hệ thống thông báo xóa thành công và cập nhật.
<br><br>
  * Alternative flow (Thất bại):
  
    Nếu không có giao mục tiêu tài chính, hệ thống hiển thị thông báo không có mục tiêu nào.
- Extension point:

   ## UC15. Tìm kiếm.
- Brief description: Người dùng có thể thực hiện tìm kiếm Transaction.
- Actor: User.
- Pre-conditions: Actors đã có các giao dịch.
- Post-conditions: Tìm được các giao dịch.
- Flow of events: 
  * Basic flow (Thành công):
  <br><br>
  1. Người dùng bấm vào nút tìm kiếm trong phần Transaction.
  2. Người dùng nhập thông tin tìm kiếm
  3. Hệ thống hiển thị kết quả tìm kiếm.
<br><br>
  * Alternative flow (Thất bại):
  
    Hệ thống không tìm thấy Transaction khi người dùng nhập sai thông tin tìm kiếm hoặc Transaction không tồn tại.
- Extension point:

## UC16. Lọc.
- Brief description: Người dùng có thể thực hiện lọc tìm Transaction.
- Actor: User.
- Pre-conditions: Actors đã có các giao dịch.
- Post-conditions: Tìm được các giao dịch.
- Flow of events: 
  * Basic flow (Thành công):
  <br><br>
  1. Người dùng bấm vào nút lọc trong phần Transaction.
  2. Người dùng chọn tiêu chí lọc.
  3. Hệ thống hiển thị kết quả lọc.
<br><br>
  * Alternative flow (Thất bại):
  
    Hệ thống không tìm thấy Transaction khi Transaction không tồn tại.
- Extension point:

## UC17. Chỉnh sửa thông tin cá nhân.
- Brief description: Người dùng có chỉnh sửa thông tin cá nhân của mình.
- Actor: User.
- Pre-conditions: Actors đã đăng nhập thành công.
- Post-conditions: Thông tin người dùng đã được chỉnh sửa và cập nhật.
- Flow of events: 
  * Basic flow (Thành công):
  <br><br>
  1. Người dùng bấm vào Setting, chọn Profile và nhấn vào "Edit".
  2. Người dùng nhập thông tin mới và bấm "Confim".
  3. Hệ thống cập nhật và hiển thị thông tin mới.
<br><br>
  * Alternative flow (Thất bại):
  
    Hệ thống không thể lưu thông tin và báo lỗi khi người dùng nhập thông tin sai định dạng.
- Extension point:

# IV. Hình ảnh các giao diện: 

## 0. Onboarding.

![image](https://github.com/user-attachments/assets/a9196689-6907-4f52-a01d-2dbc08b2d4e1)
![image](https://github.com/user-attachments/assets/f5faaa8d-f7ab-472d-a83f-e3b5fa972724)

![image](https://github.com/user-attachments/assets/af7d6bc8-c2ab-4508-926f-3ba478989432)
![image](https://github.com/user-attachments/assets/684dd605-1a29-48c3-b08b-df07b192b2e5)


## 1. Login.

![image](https://github.com/user-attachments/assets/9906c24c-9a2b-4c13-94a2-e7759893caa8)

## 2. Register.

![image](https://github.com/user-attachments/assets/c6a52463-93ad-4124-8feb-8f69dcc73326)
![image](https://github.com/user-attachments/assets/102e7382-1bae-4c19-8a9c-2a2072cfa185)

![image](https://github.com/user-attachments/assets/de6ba370-5424-4754-80fd-a2d1de5e2093)


## 3. Forgot Password.

![image](https://github.com/user-attachments/assets/086996f7-d512-4832-9bdf-cf238a46e10a)
![image](https://github.com/user-attachments/assets/ef1dbb71-ef88-432a-861f-6b329cb1f3b6)

![image](https://github.com/user-attachments/assets/c88eca53-79e4-43a2-92aa-15735e01a12b)
![image](https://github.com/user-attachments/assets/8e249e27-2c05-482c-a5bc-a25d5f08cd77)

## 4. Change Password.

![image](https://github.com/user-attachments/assets/1b738fdb-996e-4521-bcae-ec41e5126ba3)
![image](https://github.com/user-attachments/assets/b2034e09-df16-4281-9f65-c9e95d0de755)

## 5. Home.

![image](https://github.com/user-attachments/assets/61ab93b4-3725-468a-9551-9858804dd8a2)

## 6. Transaction.

![image](https://github.com/user-attachments/assets/995b7fe6-0a61-4517-9e8a-b9aabf4e62fb)
![image](https://github.com/user-attachments/assets/dd5080d4-4294-438a-babd-e8e9b745be37)

## 7. Edit Transaction.

![image](https://github.com/user-attachments/assets/92df5a50-5b66-424f-bf5c-4cd68ae05977)

## 8. Search Transaction.

![image](https://github.com/user-attachments/assets/33e38640-e7a5-456a-bc89-d39236e6e4f5)

## 9. Statistic.

![image](https://github.com/user-attachments/assets/3eff8f03-6c76-4636-988e-86b1aea5383a)

## 10. Add Transaction.

![image](https://github.com/user-attachments/assets/52ed2af6-8b39-4fd5-b5f5-763d1ffc1612)
![image](https://github.com/user-attachments/assets/6f3cf0a1-0873-4742-a3a8-64b18eda6923)

![image](https://github.com/user-attachments/assets/a186c546-3aab-49c5-a9d3-689b770fd85c)
![image](https://github.com/user-attachments/assets/d79bfcf9-271d-442a-86b2-6ff45aab8d97)

## 11. Transaction Budget.

![image](https://github.com/user-attachments/assets/496dfe7a-aa01-40a8-85e7-99de238f2be5)
![image](https://github.com/user-attachments/assets/b1dcf108-a508-49e6-b69d-80f31e5eaf2f)



## 12. Personal Budget.

![image](https://github.com/user-attachments/assets/2fc2dba1-e646-4dd2-b974-96cc25f17f34)


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










