// screens/ChangePasswordPage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChangePasswordPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Change Password Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default ChangePasswordPage;
