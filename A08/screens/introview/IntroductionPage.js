import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, StatusBar } from "react-native";

const IntroductionPage = ({ navigation }) => {
  
    useEffect(() => {
      // Thiết lập một timer để chuyển đến HomePage sau 10 giây
      const timer = setTimeout(() => {
        navigation.navigate('Home');
      }, 10000);
  
      // Dọn dẹp timer khi component bị unmount
      return () => clearTimeout(timer);
    }, [navigation]);
  
    return (
      <View style={styles.container}>
        <Text>Hi, I'm Diep!</Text>
        <Text>I'm a Java Developer.</Text>
        
        <Image
          source={require('../../assets/cat.png')} // Đường dẫn tới ảnh trong thư mục dự án
          style={styles.image}
        />
  
        <StatusBar style="auto" />
        
        {/* Nút điều hướng đến trang Home */}
        <Text style={styles.linkText} onPress={() => navigation.navigate('Home')}>
          Go to Home Page
        </Text>
      </View>
    );
  
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 160,
    width: 170,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
export default IntroductionPage;