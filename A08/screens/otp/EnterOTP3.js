import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';
import { verifyOTP } from '../../auths/FirebaseConfig'; // Import hàm xác thực OTP
import { createUserWithEmailAndPassword, deleteUser, getAuth } from 'firebase/auth'; // Import hàm deleteUser để xóa tài khoản
import { FIREBASE_DB } from '../../auths/FirebaseConfig'; // Import Firebase Realtime Database config
import { ref, set, update } from 'firebase/database'; // Import hàm để thêm dữ liệu vào Firebase Realtime Database

const EnterOTP3 = ({ route, navigation }) => {
  const { name, birthdate, email, mobile, avatarUrl, otp: sentOtp } = route.params; // Destructure avatarUrl
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      // Verify OTP
      const isVerified = await verifyOTP(email, otp);
  
      if (isVerified && otp === sentOtp) {
        const auth = getAuth();
        const user = auth.currentUser;
  
        if (user) {
          // If OTP is valid, update the user's profile in Realtime Database
          const userId = user.uid;
          await update(ref(FIREBASE_DB, 'users/' + userId), {
            name: name,
            birthdate: birthdate,
            email: email,
            mobile: mobile, // Update mobile number
            avatarUrl: avatarUrl, // Update avatar URL
          });
  
          // Wait for 3 seconds before navigating to profile screen
          setTimeout(() => {
            navigation.navigate('Move3');
          }, 3000);
        } else {
          Alert.alert('User not authenticated');
        }
      } else {
        Alert.alert('Invalid OTP', 'The OTP you entered is incorrect.');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      Alert.alert('Verification failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Enter OTP</Text>
        <Text style={styles.description}>
          Please enter the OTP sent to your email address to verify your account.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          value={otp}
          onChangeText={setOtp}
          autoCapitalize="none"
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleVerifyOTP}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Verifying...' : 'Verify OTP'}</Text>
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
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#e1e1e1',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    height: 50,
    backgroundColor: '#6246EA',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EnterOTP3;
