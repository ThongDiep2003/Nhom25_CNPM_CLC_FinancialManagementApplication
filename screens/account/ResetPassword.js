import React, { useState } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, View } from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const auth = getAuth();

const ResetPassword = ({ route, navigation }) => {
  // Nhận email từ tham số điều hướng
  const { email } = route.params;
  const [loading, setLoading] = useState(false);

  const handleSendResetEmail = async () => {
    setLoading(true);
    try {
      // Gửi email reset mật khẩu
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Success', 'Password reset email sent!');
      // Điều hướng đến màn hình LoginPage
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to send password reset email: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Button
          title={loading ? 'Sending...' : 'Send Password Reset Email'}
          onPress={handleSendResetEmail}
          disabled={loading}
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
  },
  innerContainer: {
    width: '80%',
  },
});

export default ResetPassword;
