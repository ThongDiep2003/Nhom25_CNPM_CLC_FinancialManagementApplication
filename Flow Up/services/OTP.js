import axios from 'axios';
import { storeOTP } from '../auths/FirebaseConfig'; // Import hàm storeOTP từ FirebaseConfig

const mailjetApiKey = '73c36171f78ee2bb969a01f80e96ba9a'; // Thay bằng API Key của bạn
const mailjetSecretKey = '2382d9a1761ec6a01743a14c5532d361'; // Thay bằng Secret Key của bạn

// Hàm sinh mã OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Mã OTP 6 số
};

// Hàm gửi OTP qua email sử dụng Mailjet
export const sendOTPEmail = async (email, otp) => {
  const data = {
    Messages: [
      {
        From: {
          Email: "thongdiep2003@gmail.com", // Email người gửi
          Name: "Radahn", // Tên người gửi
        },
        To: [
          {
            Email: email, // Email người nhận
          },
        ],
        Subject: "Your OTP is:",
        TextPart: `${otp}`,
      },
    ],
  };
  const authHeader = 'Basic ' + btoa(`${mailjetApiKey}:${mailjetSecretKey}`);

  try {
    // Lưu OTP vào Firebase Realtime Database
    await storeOTP(email, otp);

    // Gửi email OTP qua Mailjet
    const response = await axios.post('https://api.mailjet.com/v3.1/send', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
    });
    console.log('Email sent successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending OTP via Mailjet:', error.response ? error.response.data : error.message);
    // Nếu gửi email thất bại, có thể cần phải xóa OTP đã lưu trong Firebase
    try {
      const encodedEmail = encodeEmail(email); // Mã hóa email
      const otpRef = ref(FIREBASE_DB, 'otp/' + encodedEmail);
      await set(otpRef, null); // Xóa OTP khỏi Firebase
    } catch (dbError) {
      console.error('Error removing OTP from database:', dbError);
    }
    throw new Error('Failed to send OTP. Please try again.');
  }
};
const handleSendOTP = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    setLoading(true);
    try {
      const otp = generateOTP(); // Tạo mã OTP
      // Gửi mã OTP qua email
      await sendOTPEmail(email, otp);
      // Lưu mã OTP vào Realtime Database hoặc bất kỳ nơi nào bạn muốn để xác thực sau
      Alert.alert('Success', 'OTP has been sent to your email.');
      navigation.navigate('EnterOTP', { email }); // Điều hướng đến màn hình nhập OTP
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to send OTP: ' + error.message);
    } finally {
      setLoading(false);
    }
  };