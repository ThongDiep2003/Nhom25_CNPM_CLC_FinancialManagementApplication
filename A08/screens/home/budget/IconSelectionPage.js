import React from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const icons = [
  { name: 'car', color: '#f44336' },
  { name: 'food', color: '#e91e63' },
  { name: 'home', color: '#673ab7' },
  { name: 'medical-bag', color: '#2196f3' },
  { name: 'truck-fast', color: '#03a9f4' },
  { name: 'shopping-outline', color: '#4caf50' },
  { name: 'airplane', color: '#ff5722' },
  { name: 'basketball', color: '#795548' },
  { name: 'bed', color: '#607d8b' },
  { name: 'bike', color: '#8bc34a' },
  { name: 'camera', color: '#9e9e9e' },
  { name: 'cat', color: '#ff5722' },
  { name: 'coffee', color: '#795548' },
  { name: 'dog', color: '#ff9800' },
  { name: 'dumbbell', color: '#9c27b0' },
  { name: 'factory', color: '#00bcd4' },
  { name: 'flower', color: '#e91e63' },
  { name: 'fridge-outline', color: '#3f51b5' },
  { name: 'guitar-electric', color: '#673ab7' },
  { name: 'headphones', color: '#607d8b' },
  { name: 'hospital-building', color: '#ff4081' },
  { name: 'human-male-female', color: '#03a9f4' },
  { name: 'key-variant', color: '#795548' },
  { name: 'gift', color: '#9c27b0' },
  { name: 'wallet', color: '#3f51b5' },
  { name: 'bank', color: '#009688' },
  { name: 'cash', color: '#ff9800' },
  { name: 'chart-line', color: '#ff4081' },
  { name: 'file-document', color: '#8bc34a' },
  { name: 'emoticon-happy-outline', color: '#2196f3' },
  { name: 'laptop', color: '#ff9800' },
  { name: 'leaf', color: '#4caf50' },
];

const IconSelectionPage = ({ navigation, route }) => {
  const { onIconSelected } = route.params;

  const handleIconSelect = (icon) => {
    if (onIconSelected) {
      onIconSelected(icon); // Pass back the selected icon (name and color)
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={icons}
        keyExtractor={(item) => item.name}
        numColumns={4}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => handleIconSelect(item)}
          >
            <Icon name={item.name} size={40} color={item.color} />
            <Text style={styles.iconName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  iconWrapper: {
    alignItems: 'center',
    margin: 10,
    flex: 1,
  },
  iconName: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default IconSelectionPage;
