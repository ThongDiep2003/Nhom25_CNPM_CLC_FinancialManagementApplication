import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import SplashScreen2 from './SplashScreen2';

const SplashScreen1 = ({ navigation }) => {

    const handleNext = () => {
        // Chuyển tới trang tiếp theo khi nhấn nút
        navigation.replace('NextPage'); // Đổi 'NextPage' thành trang đích của bạn
      };
    
      return (
        <View style={tw`flex-1 justify-center items-center bg-white p-6`}>
          {/* Hình ảnh minh họa */}
          <Image 
            source={require('../../assets/splash1.png')} // Đảm bảo bạn có hình ảnh đúng đường dẫn
            style={tw`w-64 h-64 mb-8`} // Chỉnh kích thước hình ảnh theo yêu cầu
            resizeMode="contain"
          />
    
          {/* Nội dung chính */}
          <View style={tw`items-center mb-8`}>
            <Text style={tw`text-black text-2xl font-bold mb-2 text-center`}>
              Fastest Payment in the world
            </Text>
            <Text style={tw`text-gray-500 text-center`}>
              Integrate multiple payment methods to help you up the process quickly
            </Text>
          </View>
    
          {/* Nút điều hướng */}
          <TouchableOpacity 
            style={[tw`bg-purple-600 px-6 py-3 rounded-full`, {
                position: 'absolute',
                bottom: 100,  // Khoảng cách từ đáy màn hình
                left: 50,
                right: 50,
                backgroundColor: "#6246EA",
              }]}
            onPress={() => navigation.navigate('SplashScreen2')} 
          >
            <Text style={tw`text-white text-center text-lg`}>Next</Text>
          </TouchableOpacity>
        </View>
      );
    };

export default SplashScreen1;
