import React from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  const handleApprove = () => {
    navigation.goBack(); // Quay lại trang trước đó
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.header}>Chính Sách và Bảo Mật</Text>
        <Text style={styles.sectionHeader}>1. Thu thập thông tin</Text>
        <Text style={styles.paragraph}>
          Ứng dụng có thể thu thập các loại thông tin sau đây:
          {"\n"}- Thông tin cá nhân: Họ tên, email, số điện thoại, ...
          {"\n"}- Thông tin tài chính: Thu nhập, chi tiêu, mục tiêu tài chính, và các
          dữ liệu khác mà người dùng nhập vào ứng dụng.
          {"\n"}- Thông tin thiết bị: Loại thiết bị, hệ điều hành, địa chỉ IP, và dữ liệu
          nhật ký hệ thống để cải thiện trải nghiệm người dùng.
          Chúng tôi chỉ thu thập thông tin mà người dùng cung cấp trực tiếp hoặc
          đồng ý thông qua các tính năng của ứng dụng.
        </Text>
        <Text style={styles.sectionHeader}>2. Mục đích sử dụng thông tin</Text>
        <Text style={styles.paragraph}>
          Thông tin của bạn sẽ được sử dụng cho các mục đích sau:
          {"\n"}- Quản lý và hiển thị các thông tin tài chính cá nhân.
          {"\n"}- Cải thiện tính năng ứng dụng và cung cấp dịch vụ tốt hơn.
          {"\n"}- Gửi thông báo, cập nhật hoặc hỗ trợ khách hàng khi cần thiết.
          {"\n"}- Đảm bảo tính bảo mật và ngăn chặn các hành vi gian lận.
        </Text>
        <Text style={styles.sectionHeader}>3. Chia sẻ thông tin</Text>
        <Text style={styles.paragraph}>
          Chúng tôi cam kết không bán, cho thuê hoặc chia sẻ thông tin cá nhân của
          người dùng với bên thứ ba, ngoại trừ:
          {"\n"}- Khi có sự đồng ý của người dùng.
          {"\n"}- Khi tuân thủ theo quy định của pháp luật hoặc yêu cầu từ cơ quan có
          thẩm quyền.
          {"\n"}- Khi cần thiết để bảo vệ quyền lợi hợp pháp của ứng dụng và người dùng.
        </Text>
        <Text style={styles.sectionHeader}>4. Bảo vệ dữ liệu</Text>
        <Text style={styles.paragraph}>
          Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức để bảo vệ dữ liệu
          của người dùng:
          {"\n"}- Mã hóa dữ liệu: Tất cả dữ liệu nhạy cảm được mã hóa khi lưu trữ và
          truyền tải.
          {"\n"}- Xác thực và quyền truy cập: Chỉ có các tài khoản được ủy quyền mới có
          thể truy cập thông tin.
          {"\n"}- Sao lưu: Dữ liệu được sao lưu định kỳ để đảm bảo khôi phục trong trường
          hợp khẩn cấp.
          {"\n"}- Bảo mật máy chủ: Máy chủ ứng dụng được bảo vệ bằng tường lửa và các biện
          pháp bảo mật nâng cao.
        </Text>
        <Text style={styles.sectionHeader}>5. Quyền của người dùng</Text>
        <Text style={styles.paragraph}>
          Người dùng có các quyền sau đây:
          {"\n"}- Truy cập và cập nhật thông tin cá nhân của mình.
          {"\n"}- Yêu cầu xóa dữ liệu khi không còn sử dụng ứng dụng.
          {"\n"}- Rút lại sự đồng ý đối với các hoạt động xử lý thông tin.
          Người dùng có thể liên hệ với đội ngũ phát triển qua email để thực hiện các yêu cầu trên.
        </Text>
        <Text style={styles.sectionHeader}>6. Cập nhật chính sách</Text>
        <Text style={styles.paragraph}>
          Chúng tôi có thể cập nhật chính sách bảo mật này để phù hợp với thay đổi
          về pháp luật hoặc tính năng của ứng dụng. Người dùng sẽ được thông báo
          về các thay đổi qua ứng dụng hoặc email (nếu có cung cấp).
        </Text>
        <Text style={styles.sectionHeader}>7. Liên hệ</Text>
        <Text style={styles.paragraph}>
          Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này, vui lòng liên
          hệ với chúng tôi qua:
          {"\n"}- Email: thongdiep2003@gmail.com
          {"\n"}- Điện thoại: (+84) 039-296-3132
          Cảm ơn bạn đã tin tưởng sử dụng ứng dụng quản lý tài chính của chúng tôi.
          Chúng tôi cam kết bảo vệ dữ liệu và cung cấp trải nghiệm an toàn cho bạn.
          {"\n"}{"\n"}
        </Text>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.approveButton} onPress={handleApprove}>
          <Text style={styles.approveText}>Approve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#555',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 10,
  },
  footer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  approveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  approveText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PrivacyPolicyScreen;
