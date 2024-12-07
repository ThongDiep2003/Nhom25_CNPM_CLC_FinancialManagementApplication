import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const SplashScreen3 = ({ navigation }) => {
  return (
    <View style={tw`flex-1 justify-center items-center bg-white px-4`}>
      {/* Image */}
      <Image
        source={require('../../assets/splash3.png')} // Make sure to use the correct path for your image
        style={tw`w-48 h-48 mb-6`} // Adjusted size based on the design
        resizeMode="contain"
      />
      
      {/* Title Text */}
      <Text style={tw`text-center text-xl font-bold mb-2`}>
        Paying for Everything is Easy and Convenient
      </Text>

      {/* Description Text */}
      <Text style={tw`text-center text-gray-500 mb-8`}>
        Built-in Fingerprint, face recognition and more, keeping you completely safe
      </Text>

      {/* Next Button */}
      <TouchableOpacity 
            style={[tw`bg-purple-600 px-6 py-3 rounded-full`, {
                position: 'absolute',
                bottom: 100,  // Khoảng cách từ đáy màn hình
                left: 50,
                right: 50,
                backgroundColor: "#6246EA",
              }]}
            onPress={() => navigation.navigate('Login')} 
          >
            <Text style={tw`text-white text-center text-lg`}>Next</Text>
          </TouchableOpacity>
    </View>
  );
};

export default SplashScreen3;