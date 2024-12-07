import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { getUserProfile } from '../../auths/FirebaseConfig'; 
import { getAuth } from 'firebase/auth';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';

function ProfilePage() {
  const navigation = useNavigation();
  const [userProfile, setUserProfile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  const fetchProfile = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);

        // Fetch avatar from Firebase Storage if exists
        if (profile.avatarUrl) {
          const storage = getStorage();
          const avatarRef = storageRef(storage, profile.avatarUrl);
          const url = await getDownloadURL(avatarRef);
          setAvatarUrl(url);
        }
      } else {
        throw new Error('User not logged in');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Refresh profile data when the screen is focused
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchProfile();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {userProfile ? (
        <>
          {/* Show avatar or default image */}
          <Image
            source={avatarUrl ? { uri: avatarUrl } : require('../../assets/avatar.png')}
            style={styles.avatar}
          />

          {/* Display user profile information */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.input}>{userProfile.name || ''}</Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.input}>{userProfile.email || ''}</Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Mobile</Text>
              <Text style={styles.input}>{userProfile.mobile || ''}</Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Date of Birth</Text>
              <Text style={styles.input}>{userProfile.birthdate || ''}</Text>
            </View>
          </View>

          {/* Edit button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Edit')}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.textStyle}>No profile data available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 30,
    marginBottom: 10,
  },
  form: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  input: {
    height: 50,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 25,
    fontSize: 16,
    color: '#1F2937',
    textAlignVertical: 'center', // Align text vertically in the middle
  },
  button: {
    height: 50,
    backgroundColor: '#6246EA',
    justifyContent: 'center',
    borderRadius: 25,
    marginTop: 30,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  textStyle: {
    fontSize: 18,
    color: '#6B7280',
    marginTop: 20,
  },
});

export default ProfilePage;
