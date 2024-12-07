import React, { useState } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, TextInput, Text, View } from 'react-native';
import { verifyOTP } from '../../auths/FirebaseConfig'; // Import hàm verifyOTP từ FirebaseConfig

const EnterOTP = ({ route, navigation }) => {
  const { email } = route.params; // Nhận email từ tham số điều hướng
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyOTP = async () => {
    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP');
      return;
    }

    setLoading(true);
    try {
      // Xác thực mã OTP
      const isValid = await verifyOTP(email, otp);
      if (isValid) {
        Alert.alert('Success', 'OTP is valid. You can now reset your password.');
        // Điều hướng đến màn hình reset password với email
        navigation.navigate('ResetPassword', { email });
      } else {
        Alert.alert('Error', 'Invalid or expired OTP');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to verify OTP: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Enter OTP</Text>
        <Text style={styles.description}>
          Enter the OTP sent to your email address to proceed with resetting your password.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
          maxLength={6} // OTP thường có 6 ký tự
        />
        <Button
          title={loading ? 'Verifying...' : 'Verify OTP'}
          onPress={handleVerifyOTP}
          disabled={loading}
          color="#2596be" // Thay đổi màu nút
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16, // Thêm padding cho container
  },
  innerContainer: {
    width: '100%',
    maxWidth: 400, // Giới hạn chiều rộng
    padding: 20, // Thêm padding cho innerContainer
    backgroundColor: 'white', // Thay đổi màu nền để làm nổi bật nội dung
    borderRadius: 10, // Bo góc cho container
    shadowColor: '#000', // Thêm bóng đổ cho container
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Thêm hiệu ứng nổi bật
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555', // Thay đổi màu chữ mô tả
  },
  input: {
    height: 45,
    borderColor: '#2596be',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default EnterOTP;