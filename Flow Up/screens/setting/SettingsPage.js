// screens/SettingsPage.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../auths/FirebaseConfig';
import { ref, onValue } from 'firebase/database';

const SettingsPage = ({ navigation }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const currentUser = FIREBASE_AUTH.currentUser?.email;

  useEffect(() => {
    if (!currentUser) return;

    const forumRef = ref(FIREBASE_DB, 'forum');
    const unsubscribe = onValue(forumRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        let count = 0;
        Object.values(data).forEach(question => {
          if (question.email === currentUser && question.replies) {
            Object.values(question.replies).forEach(reply => {
              if (!reply.read && reply.email !== currentUser) {
                count++;
              }
            });
          }
        });
        setUnreadCount(count);
      }
    });

    return () => unsubscribe();
  }, [currentUser]);

  const NotificationBadge = ({ count }) => {
    if (count === 0) return null;
    return (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {count > 99 ? '99+' : count}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>General</Text>
      <TouchableOpacity 
        style={styles.item}
        onPress={() => navigation.navigate('Language')}
      >
        <Text style={styles.itemText}>Language</Text>
        <Text style={styles.itemRight}>English</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.item}
        onPress={() => navigation.navigate('Profile')}
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
        onPress={() => navigation.navigate('ContactUs')}
      >
        <Text style={styles.itemText}>Contact Us</Text>
      </TouchableOpacity>

      <Text style={styles.sectionHeader}>Security</Text>

      <TouchableOpacity 
        style={styles.item}
        onPress={() => navigation.navigate('PrivacyPolicy')}
      >
        <Text style={styles.itemText}>Privacy Policy</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.item}
        onPress={() => navigation.navigate('LogoutPage')}
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
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#FF0000',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 30,
    textAlign: 'center',
  },
});

export default SettingsPage;