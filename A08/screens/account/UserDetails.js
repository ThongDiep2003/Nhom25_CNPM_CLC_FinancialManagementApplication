import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../auths/FirebaseConfig'; // Kết nối với Firestore

// Hàm thêm người dùng vào Firestore
export const addUser = async (user) => {
  try {
    const userDoc = doc(db, 'users', user.email); // Mỗi người dùng có một tài liệu dựa trên email
    await setDoc(userDoc, {
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      password: user.password,
      avatar: user.avatar || null, // Thêm avatar nếu có, nếu không để null
    });
    console.log('User added successfully');
  } catch (error) {
    console.error('Error adding user: ', error);
  }
};

// Hàm lấy thông tin người dùng từ Firestore
export const getUser = async (email) => {
  try {
    const userDoc = doc(db, 'users', email);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      console.log('User data:', docSnap.data());
      return docSnap.data(); // Trả về tất cả dữ liệu bao gồm avatar
    } else {
      console.log('No such user found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user: ', error);
  }
};

// Hàm cập nhật thông tin người dùng trong Firestore
export const updateUser = async (email, updatedData) => {
  try {
    const userDoc = doc(db, 'users', email);
    await updateDoc(userDoc, updatedData); // Cập nhật dữ liệu, bao gồm avatar nếu có
    console.log('User updated successfully');
  } catch (error) {
    console.error('Error updating user: ', error);
  }
};
