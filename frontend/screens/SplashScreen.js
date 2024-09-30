import React, { useEffect } from 'react';
import { SafeAreaView, Image, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Onboarding'); // Điều hướng sang OnboardingScreen sau 2 giây
    }, 2000);
  }, [navigation]);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1 justify-center items-center`}>
        <Image 
          source={require('../assets/Splash1.png')} 
          style={tw`w-32 h-32`} // Điều chỉnh kích thước logo
          resizeMode="contain" // Giữ tỉ lệ logo
        />
      </View>
    </SafeAreaView>
  );
}

export default SplashScreen;
