import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const SplashScreen2 = ({ navigation }) => {
  return (
    <View style={tw`flex-1 justify-center items-center bg-white px-4`}>
      <Image
        source={require('../../assets/splash2.png')} // Đảm bảo bạn có hình ảnh đúng đường dẫn
        style={tw`w-full h-64 mb-6`} // Tùy chỉnh kích thước và vị trí hình ảnh
        resizeMode="contain"
      />
      <Text style={tw`text-center text-xl font-bold mb-4`}>
        The most Secure Platform for Customer
      </Text>
      <Text style={tw`text-center text-gray-500 mb-10`}>
        Built-in Fingerprint, face recognition and more, keeping you completely safe
      </Text>
      <TouchableOpacity 
            style={[tw`bg-purple-600 px-6 py-3 rounded-full`, {
                position: 'absolute',
                bottom: 100,  // Khoảng cách từ đáy màn hình
                left: 50,
                right: 50,
                backgroundColor: "#6246EA",
              }]}
            onPress={() => navigation.navigate('SplashScreen3')} 
          >
            <Text style={tw`text-white text-center text-lg`}>Next</Text>
          </TouchableOpacity>
    </View>
  );
};

export default SplashScreen2;
