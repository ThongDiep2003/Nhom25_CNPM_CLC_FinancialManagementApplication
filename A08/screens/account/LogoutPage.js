import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_AUTH } from '../../auths/FirebaseConfig'; // Ensure the correct Firebase path
import { CommonActions } from '@react-navigation/native';

const LogoutPage = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      // Sign out from Firebase
      await signOut(FIREBASE_AUTH);
      // Remove the token from AsyncStorage
      await AsyncStorage.removeItem('jwtToken');

      // Reset the navigation stack and navigate to the Login screen
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Logout failed', 'An error occurred while logging out.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        
        <Text style={styles.description}>Are you sure you want to log out?</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  innerContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    height: 50,
    backgroundColor: '#6246EA',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LogoutPage;
