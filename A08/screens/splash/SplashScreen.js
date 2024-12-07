import React, { useEffect } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import tw from 'tailwind-react-native-classnames'; // Import tailwind-react-native-classnames

const SplashScreen1 = ({ navigation }) => {

  useEffect(() => {
    // Tự động chuyển sang trang tiếp theo sau 3 giây
    const timer = setTimeout(() => {
      navigation.replace('SplashScreen1'); // Hoặc trang mà bạn muốn chuyển đến
    }, 3000);

    return () => clearTimeout(timer); // Dọn dẹp timer
  }, [navigation]);

  return (
    <View style={tw`flex-1 justify-center items-center bg-white`}>
      <StatusBar hidden={true} />
      <Image 
        source={require('../../assets/logo2.png')} // Đảm bảo logo của bạn đúng đường dẫn
        style={tw`w-24 h-24`}
      />
      <Text style={tw`text-black text-2xl font-bold mt-4`}>
        FLOW UP
      </Text>
    </View>
  );
};

export default SplashScreen1;
