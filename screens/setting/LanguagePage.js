import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For the back icon and checkmark

const LanguagePage = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [searchText, setSearchText] = useState('');

  const languages = [
    { name: 'English', flag: '🇺🇸' }, // Flag for demo purposes; you can replace this with an image URL if needed
    // Add more languages here
  ];

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.name);
  };

  const renderLanguageItem = ({ item }) => (
    <TouchableOpacity style={styles.languageItem} onPress={() => handleLanguageSelect(item)}>
      <View style={styles.languageInfo}>
        <Text style={styles.flag}>{item.flag}</Text>
        <Text style={styles.languageText}>{item.name}</Text>
      </View>
      {selectedLanguage === item.name && (
        <Ionicons name="checkmark-circle" size={24} color="#6246EA" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header with back icon */}
     

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#B0B0B0" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Language"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Language list */}
      <FlatList
        data={languages.filter(lang =>
          lang.name.toLowerCase().includes(searchText.toLowerCase())
        )}
        keyExtractor={(item) => item.name}
        renderItem={renderLanguageItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: 30,
    marginRight: 10,
  },
  languageText: {
    fontSize: 16,
  },
});

export default LanguagePage;
