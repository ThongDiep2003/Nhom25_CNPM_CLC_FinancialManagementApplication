import React, { useState, useRef } from 'react';
import { SafeAreaView, View, Text, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Fastest Payment in the world',
    description: 'Integrate multiple payment methods to help you up the process quickly',
    image: require('../assets/Splash2.png'),
  },
  {
    id: '2',
    title: 'The most Secure Platform for Customer',
    description: 'Built-in Fingerprint, face recognition and more, keeping you completely safe',
    image: require('../assets/Splash3.png'),
  },
  {
    id: '3',
    title: 'Paying for Everything is Easy and Convenient',
    description: 'Built-in Fingerprint, face recognition and more, keeping you completely safe',
    image: require('../assets/Splash4.png'),
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef();

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    } else {
      // Điều hướng đến màn hình tiếp theo
      navigation.replace('LoginScreen');
    }
  };

  const Slide = ({ item }) => {
    return (
      <View style={{ alignItems: 'center', width }}>
        <Image
          source={item.image}
          style={{ height: height * 0.4, width: '100%', resizeMode: 'contain', marginTop: 20 }}
        />
        <View style={{ marginTop: 40 }}>
          <Text style={tw`text-2xl font-bold text-center text-black`}>{item.title}</Text>
          <Text style={tw`text-base text-center text-gray-600 mt-2 px-10`}>{item.description}</Text>
        </View>
      </View>
    );
  };

  const Footer = () => {
    return (
      <View style={{ height: height * 0.25, justifyContent: 'space-between', paddingHorizontal: 20 }}>
        {/* Indicator */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                tw`h-2 w-4 rounded-full bg-purple-600 mx-1`,
                currentSlideIndex == index && tw`w-8`,
              ]}
            />
          ))}
        </View>

        {/* Next button */}
        <TouchableOpacity
          onPress={goNextSlide}
          style={tw`bg-purple-600 p-4 rounded-full w-full justify-center items-center mt-10`}>
          <Text style={tw`text-white text-lg font-bold`}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        pagingEnabled
        data={slides}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Slide item={item} />}
        keyExtractor={(item) => item.id}
      />
      <Footer />
    </SafeAreaView>
  );
};

export default OnboardingScreen;
