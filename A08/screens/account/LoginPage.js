import React, { useState } from 'react';
import { Alert, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { FIREBASE_AUTH } from '../../auths/FirebaseConfig'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerForPushNotificationsAsync, sendNotification } from '../../services/notificationService'; // Import các hàm thông báo
import { getDatabase, ref, get } from 'firebase/database';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [click, setClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;
  
// Login.js
  const handleLogin = async () => {
    setLoading(true);
    try {
        const response = await signInWithEmailAndPassword(auth, username, password);
        const user = response.user;

        // Kiểm tra status của user từ Realtime Database
        const db = getDatabase();
        const userRef = ref(db, `users/${user.uid}`);
        const userSnapshot = await get(userRef);
        const userData = userSnapshot.val();

        if (userData?.status === 'blocked') {
            Alert.alert(
                'Account Blocked',
                `Your account has been blocked.\nReason: ${userData.blockReason || 'No reason provided'}`,
                [{ 
                    text: 'OK', 
                    onPress: async () => {
                        await auth.signOut();
                        await AsyncStorage.multiRemove(['jwtToken', 'userId', 'userEmail']);
                    }
                }]
            );
            return;
        }

        // Lưu thông tin chi tiết hơn
        const token = await user.getIdToken();
        await AsyncStorage.multiSet([
            ['jwtToken', token],
            ['userId', user.uid],
            ['userEmail', user.email],
            ['loginTimestamp', Date.now().toString()],
            ['userStatus', 'active']
        ]);

        const expoPushToken = await registerForPushNotificationsAsync();
        if (expoPushToken) {
            await sendNotification(
                expoPushToken, 
                'Login Successful!', 
                'Welcome back to the app!'
            );
        }

        Alert.alert('Login successful');
        navigation.navigate('Main');

    } catch (error) {
        console.error('Login error:', error);
        let errorMessage = 'Login failed: ';
        
        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage += 'User not found';
                break;
            case 'auth/wrong-password':
                errorMessage += 'Wrong password';
                break;
            case 'auth/invalid-email':
                errorMessage += 'Invalid email format';
                break;
            case 'auth/too-many-requests':
                errorMessage += 'Too many attempts. Please try again later';
                break;
            default:
                errorMessage += error.message;
        }
        
        Alert.alert('Error', errorMessage);
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

// Styles are the same as in your provided code.


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
