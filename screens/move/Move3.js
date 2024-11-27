import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For the checkmark icon

const Move2 = ({ navigation }) => {

  return (
    <View style={styles.container}>
      {/* Checkmark Icon */}
      <View style={styles.iconContainer}>
        <Ionicons name="checkmark-circle" size={120} color="#34C759" />
      </View>

      {/* Success Message */}
      <Text style={styles.congratsText}>Congrats!</Text>
      <Text style={styles.messageText}>Your Profile has been updated</Text>

      {/* Confirm Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')} >
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
  },
  iconContainer: {
    marginBottom: 30,
  },
  congratsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6246EA',
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    color: '#7E7E7E',
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#6246EA',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Move2;
