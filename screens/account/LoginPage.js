import React, { useState } from 'react';
import { Alert, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { FIREBASE_AUTH } from '../../auths/FirebaseConfig'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [click, setClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;
  
  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, username, password);
      const user = response.user;
  
      // Get JWT token from Firebase
      const token = await user.getIdToken();
  
      // Store the token in AsyncStorage for later use
      await AsyncStorage.setItem('jwtToken', token);
  
      Alert.alert('Login successful');
      // Navigate to the main screen (Main)
      navigation.navigate('Main');
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Login failed: User not found');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Login failed: Wrong password');
      } else {
        Alert.alert('Login failed: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Hello there, sign in to continue</Text>
      <Image
        source={require('../../assets/login.png')}
        style={styles.image}
      />
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder='Username'
          value={username}
          onChangeText={setUsername}
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
      </View>
      <View style={styles.rememberView}>
        <View style={styles.switch}>
          <Switch
            value={click}
            onValueChange={setClick}
            trackColor={{ true: 'green', false: 'gray' }}
          />
          {/* <Text style={styles.rememberText}>Remember Me</Text> */}
        </View>
        <View>
          <Pressable onPress={() => navigation.navigate('ForgotPassword')}> 
            <Text style={styles.forgetText}>Forgot your password?</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={handleLogin} disabled={loading}>
          <Text style={styles.buttonText}>Sign in</Text>
        </Pressable>
      </View>
      
      <Text style={styles.footerText}>
        Don't have an account?{' '}
        <Text style={styles.register} onPress={() => navigation.navigate('Register')}>
          Sign Up
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 40,
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  image: {
    height: 165,
    width: 213,
    marginVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#6246EA",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#999999",
    marginBottom: 20,
  },
  inputView: {
    gap: 15,
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 10,
  },
  input: {
    height: 50,
    paddingHorizontal: 15,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
  },
  rememberView: {
    width: "100%",
    paddingHorizontal: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 25,
  },
  switch: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  rememberText: {
    fontSize: 13,
    color: "#333333",
  },
  forgetText: {
    fontSize: 13,
    color: "#6246EA",
  },
  
  button: {
    backgroundColor: "#6246EA",
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonView: {
    width: "100%",
    paddingHorizontal: 50,
    marginBottom: 20,
  },
  footerText: {
    textAlign: "center",
    color: "#333333",
  },
  register: {
    color: "#6246EA",
    fontSize: 14,
    fontWeight: "bold",
  },
});
