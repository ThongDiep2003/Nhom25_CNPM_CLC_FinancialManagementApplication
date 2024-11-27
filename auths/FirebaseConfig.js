import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, ref, set, get } from 'firebase/database';
import { encode } from 'base-64'; // Thư viện mã hóa base-64 để mã hóa email

// Firebase configuration object
const FirebaseConfig = {
  apiKey: "AIzaSyB3jwuCchb8v8vCnYAV1H_MBpOSB9cv9jw",
  authDomain: "flowup-a1ead.firebaseapp.com",
  databaseURL: "https://flowup-a1ead-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "flowup-a1ead",
  storageBucket: "flowup-a1ead.appspot.com",
  messagingSenderId: "327504117742",
  appId: "1:327504117742:web:69ef5dadd6213d0b1258ff",
  measurementId: "G-VPKPQVMVVT"
};

// Initialize Firebase app
export const FIREBASE_APP = initializeApp(FirebaseConfig);

// Initialize Firebase Authentication with AsyncStorage for persistence
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Realtime Database
export const FIREBASE_DB = getDatabase(FIREBASE_APP);

// Mã hóa email để sử dụng trong đường dẫn
const encodeEmail = (email) => {
  return email.replace(/\./g, ','); // Thay thế dấu chấm bằng dấu phẩy
};

// Function to store OTP in Realtime Database
export const storeOTP = async (email, otp) => {
  try {
    const encodedEmail = encodeEmail(email);
    const otpRef = ref(FIREBASE_DB, 'otp/' + encodedEmail);
    await set(otpRef, { otp: otp, timestamp: Date.now() }); // Store OTP and timestamp
    console.log('OTP stored successfully');
  } catch (error) {
    console.error('Error storing OTP in database:', error);
    throw new Error('Failed to store OTP. Please try again.');
  }
};

// Function to verify OTP from Realtime Database
export const verifyOTP = async (email, otp) => {
  try {
    const encodedEmail = encodeEmail(email);
    const otpRef = ref(FIREBASE_DB, 'otp/' + encodedEmail);
    const snapshot = await get(otpRef);
    if (snapshot.exists()) {
      const storedOTP = snapshot.val();
      const currentTime = Date.now();
      // Check if OTP is correct and not expired (e.g., 10 minutes validity)
      if (storedOTP.otp === otp && (currentTime - storedOTP.timestamp) < 600000) {
        return true;
      } else {
        throw new Error('OTP is invalid or expired');
      }
    } else {
      throw new Error('No OTP found for this email');
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw new Error('Failed to verify OTP. Please try again.');
  }
};

// Function to store user profile in Realtime Database (including avatar)
export const storeUserProfile = async (userId, name, email, birthdate, avatar) => {
  try {
    const userRef = ref(FIREBASE_DB, 'users/' + userId);
    await set(userRef, {
      name: name,
      email: email,
      birthdate: birthdate,
      avatar: avatar || 'default_avatar_url', // Thêm trường avatar vào profile, nếu không có thì lưu ảnh mặc định
    });
    console.log('User profile stored successfully');
  } catch (error) {
    console.error('Error storing user profile in database:', error);
    throw new Error('Failed to store user profile. Please try again.');
  }
};

// Function to get user profile from Realtime Database (including avatar)
export const getUserProfile = async (userId) => {
  try {
    const userRef = ref(FIREBASE_DB, 'users/' + userId);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val(); // Trả về đối tượng có cả thông tin avatar
    } else {
      throw new Error('No profile data found');
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw new Error('Failed to fetch user profile. Please try again.');
  }
};

