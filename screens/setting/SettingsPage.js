// screens/SettingsPage.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SettingsPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      
      <Text style={styles.sectionHeader}>General</Text>
      <TouchableOpacity 
        style={styles.item}
        onPress={() => navigation.navigate('Language')} // Navigate to Language screen
      >
        <Text style={styles.itemText}>Language</Text>
        <Text style={styles.itemRight}>English</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.item}
        onPress={() => navigation.navigate('Profile')} // Navigate to ProfilePage
      >
        <Text style={styles.itemText}>My Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.item}
        onPress={() => navigation.navigate('CategoryManagement')} 
      >
        <Text style={styles.itemText}>Manage Category</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.item}
        onPress={() => navigation.navigate('ManageCards')} 
      >
        <Text style={styles.itemText}>Manage Card</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.item}
        onPress={() => navigation.navigate('Forum')} 
      >
        <Text style={styles.itemText}>Q & A</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.item}
        onPress={() => navigation.navigate('ContactUs')} // Navigate to ContactUs
      >
        <Text style={styles.itemText}>Contact Us</Text>
      </TouchableOpacity>

      <Text style={styles.sectionHeader}>Security</Text>
      {/* <TouchableOpacity 
        style={styles.item}
        onPress={() => navigation.navigate('ChangePassword')} // Navigate to ChangePassword
      >
        <Text style={styles.itemText}>Change Password</Text>
      </TouchableOpacity> */}

      <TouchableOpacity 
        style={styles.item}
        onPress={() => navigation.navigate('PrivacyPolicy')} // Navigate to PrivacyPolicy
      >
        <Text style={styles.itemText}>Privacy Policy</Text>
      </TouchableOpacity>
      {/* Logout button */}
      <TouchableOpacity 
        style={styles.item}
        onPress={() => navigation.navigate('LogoutPage')} // Navigate to LogoutPage
      >
        <Text style={styles.itemText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: 'gray',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  itemText: {
    fontSize: 16,
  },
  itemRight: {
    fontSize: 16,
    color: 'gray',
  },
  footerText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 30,
    textAlign: 'center',
  },
});

export default SettingsPage;
