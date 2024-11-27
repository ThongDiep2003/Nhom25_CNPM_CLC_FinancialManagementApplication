import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';
import { verifyOTP } from '../../auths/FirebaseConfig'; // Import OTP verification function
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth'; // Import deleteUser to remove account
import { FIREBASE_AUTH, FIREBASE_DB } from '../../auths/FirebaseConfig'; // Import Firebase config
import { ref, set } from 'firebase/database'; // Import function to store data in Firebase Realtime Database

const EnterOTP2 = ({ route, navigation }) => {
  const { email, password } = route.params; // Get email and password from the previous screen
  const [otp, setOtp] = useState(''); // State to hold the OTP input
  const [loading, setLoading] = useState(false); // State for showing loading during the process

  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      const isVerified = await verifyOTP(email, otp); // Verify the OTP

      if (isVerified) {
        // If OTP is correct, create the user and store user info
        const auth = FIREBASE_AUTH;
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const userId = response.user.uid;
        const timestamp = Date.now();

        // Store user information in Realtime Database
        await set(ref(FIREBASE_DB, 'users/' + userId), {
          email: email,
          timestamp: timestamp,
        });

        setTimeout(() => {
          navigation.navigate('Move2');
        }, 3000);
      } else {
        // If OTP is incorrect, delete the user and navigate back to registration
        const auth = FIREBASE_AUTH;
        const user = auth.currentUser;

        if (user) {
          await deleteUser(user); // Delete the account
        }

        Alert.alert('Invalid OTP', 'The OTP you entered is incorrect. Please retry to register again.');
        navigation.navigate('Register'); // Navigate back to registration screen
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
          We have sent an OTP to your email address. Please enter it to complete the registration.
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

export default EnterOTP2;
