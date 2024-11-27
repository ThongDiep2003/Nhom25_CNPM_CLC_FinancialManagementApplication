import React, { useState } from 'react';
import { Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View, Alert, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../auths/FirebaseConfig';
import { ref, set } from 'firebase/database';
import { generateOTP, sendOTPEmail } from '../../services/OTP';

const RegisterPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const otp = generateOTP();
      await sendOTPEmail(email, otp);
      await set(ref(FIREBASE_DB, 'otp/' + encodeEmail(email)), { otp: otp, timestamp: Date.now() });
      navigation.navigate('EnterOTP2', { email, password });

    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Registration failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const encodeEmail = (email) => {
    return email.replace(/\./g, ',');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to us,</Text>
      <Text style={styles.subText}>Hello there, create New account</Text>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.image}
      />
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          autoCorrect={false}
          autoCapitalize='none'
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize='none'
        />
        <TextInput
          style={styles.input}
          placeholder='Confirm Password'
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoCorrect={false}
          autoCapitalize='none'
        />
      </View>

      <View style={styles.termsContainer}>
        <TouchableOpacity style={styles.checkbox}>
          <Text>✓</Text>
        </TouchableOpacity>
        <View style={styles.termsTextContainer}>
          <Text style={styles.termsText}>By creating an account you agree to our</Text>
          <Text style={styles.link} onPress={() => navigation.navigate('PrivacyPolicy')}>
            Term and Conditions
          </Text>
        </View>
      </View>

      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={handleRegister} disabled={loading}>
          <Text style={styles.buttonText}>Sign up</Text>
        </Pressable>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Have an account?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 50,
    backgroundColor: '#fff',
  },
  image: {
    height: 165,
    width: 213,
    left: 40,
    right: 50,
    marginVertical: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: "#6246EA",
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: '#6e6d7a',
    textAlign: 'center',
    marginBottom: -20,
  },
  inputView: {
    marginVertical: 10,
  },
  input: {
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  termsTextContainer: {
    flexDirection: 'column',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#6246EA",
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  termsText: {
    color: '#6e6d7a',
  },
  link: {
    color: "#6246EA",
    textDecorationLine: 'underline',
  },
  buttonView: {
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#6246EA",
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginText: {
    color: "#6246EA",
    textAlign: 'center',
    marginTop: 20,
  },
});

export default RegisterPage;
