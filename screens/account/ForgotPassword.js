import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'; // Import chức năng reset password từ Firebase
import { FIREBASE_AUTH } from '../../auths/FirebaseConfig';  // Import Firebase từ file cấu hình của bạn

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Hàm gửi email reset password
  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    setLoading(true);
    try {
      // Sử dụng Firebase để gửi email reset password
      const auth = FIREBASE_AUTH;
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Success', 'A password reset link has been sent to your email.');
      navigation.goBack(); // Quay lại màn hình trước đó
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to send reset link: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Forgot password</Text>
        <TextInput
          style={styles.input}
          placeholder="Type your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text style={styles.description}>
          We will send you an email with a link to reset your password account.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleResetPassword} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Send'}</Text>
        </TouchableOpacity>
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
    padding: 16,
  },
  innerContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  description: {
    fontSize: 14,
    color: '#7e7e7e',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    height: 50,
    backgroundColor: '#6246EA',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgotPassword;
