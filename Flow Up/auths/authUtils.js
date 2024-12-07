// authUtils.js
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Đăng nhập và lưu token
export const loginUser = async (email, password) => {
  const auth = getAuth();
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const user = response.user;
    const token = await user.getIdToken();

    // Lưu token vào AsyncStorage
    await AsyncStorage.setItem('jwtToken', token);
    return { success: true };
  } catch (error) {
    console.error('Login failed:', error);
    return { success: false, message: error.message };
  }
};

// Đăng xuất và xóa token
export const logoutUser = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    await AsyncStorage.removeItem('jwtToken');
    return { success: true };
  } catch (error) {
    console.error('Logout failed:', error);
    return { success: false, message: error.message };
  }
};

// Kiểm tra token có tồn tại và hợp lệ không
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    return token;
  } catch (error) {
    console.error('Failed to get token:', error);
    return null;
  }
};
