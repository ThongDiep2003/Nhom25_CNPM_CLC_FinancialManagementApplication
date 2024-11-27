import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'tailwind-react-native-classnames';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../../../../auths/FirebaseConfig';
import { ref, set } from 'firebase/database';

const incomeIcons = [
  { name: 'wallet', color: '#3f51b5', label: 'Wallet' },
  { name: 'gift', color: '#9c27b0', label: 'Gift' },
  { name: 'cash', color: '#ff9800', label: 'Cash' },
  { name: 'chart-line', color: '#ff4081', label: 'Profit' },
  { name: 'bank', color: '#009688', label: 'Banking' },
  { name: 'briefcase', color: '#9c27b0', label: 'Business' },
  { name: 'currency-usd', color: '#4caf50', label: 'Salary' },
  { name: 'gold', color: '#ff9800', label: 'Gold' },
  { name: 'piggy-bank', color: '#ff5722', label: 'Savings' },
  { name: 'currency-eur', color: '#3f51b5', label: 'Euro' },
  { name: 'treasure-chest', color: '#009688', label: 'Treasure' },
];

const expenseIcons = [
  { name: 'home', color: '#673ab7', label: 'Housing' },
  { name: 'truck-fast', color: '#03a9f4', label: 'Move' },
  { name: 'cash', color: '#ff9800', label: 'Bill' },
  { name: 'food', color: '#e91e63', label: 'Food' },
  { name: 'shopping-outline', color: '#4caf50', label: 'Shopping' },
  { name: 'medical-bag', color: '#2196f3', label: 'Medical' },
  { name: 'airplane', color: '#ff5722', label: 'Travel' },
  { name: 'basketball', color: '#795548', label: 'Sports' },
  { name: 'bed', color: '#607d8b', label: 'Furniture' },
  { name: 'bike', color: '#8bc34a', label: 'Bike' },
  { name: 'camera', color: '#9e9e9e', label: 'Camera' },
  { name: 'cat', color: '#ff5722', label: 'Pet' },
  { name: 'coffee', color: '#795548', label: 'Coffee' },
  { name: 'dog', color: '#ff9800', label: 'Dog' },
  { name: 'dumbbell', color: '#9c27b0', label: 'Fitness' },
  { name: 'factory', color: '#00bcd4', label: 'Work' },
  { name: 'flower', color: '#e91e63', label: 'Flower' },
  { name: 'fridge-outline', color: '#3f51b5', label: 'Fridge' },
  { name: 'guitar-electric', color: '#673ab7', label: 'Guitar' },
  { name: 'headphones', color: '#607d8b', label: 'Music' },
];


const CategoryPage = ({ navigation }) => {
  const [categoryName, setCategoryName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [categoryType, setCategoryType] = useState('Expense'); // Default to Expense
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const currentUser = FIREBASE_AUTH.currentUser;
    if (currentUser) {
      setUserId(currentUser.uid);
    }
  }, []);

  const handleAddCategory = () => {
    if (!categoryName || !selectedIcon) {
      alert('Please enter a category name and select an icon.');
      return;
    }

    if (userId) {
      const categoryId = Date.now().toString();
      const userCategoryRef = ref(FIREBASE_DB, `categories/${userId}/${categoryId}`);
      set(userCategoryRef, {
        id: categoryId,
        name: categoryName,
        icon: selectedIcon.name,
        color: selectedIcon.color,
        type: categoryType,
      })
        .then(() => {
          alert(`Category "${categoryName}" added successfully.`);
          setCategoryName('');
          setSelectedIcon(null);
          setCategoryType('Expense');
          navigation.goBack(); // Navigate back
        })
        .catch((error) => {
          console.error('Error adding category:', error);
          alert('Error adding category. Please try again.');
        });
    }
  };

  return (
    <View style={tw`flex-1 bg-white p-5`}>
      <Text style={tw`text-2xl font-bold text-center mb-5`}>Create New Category</Text>

      <TextInput
        style={tw`border rounded-lg p-3 mb-5 bg-gray-100`}
        placeholder="Enter Category Name"
        value={categoryName}
        onChangeText={setCategoryName}
      />

      <View style={tw`flex-row justify-around mb-5`}>
        <TouchableOpacity
          style={[
            styles.typeButton,
            categoryType === 'Income' && styles.selectedTypeButton,
          ]}
          onPress={() => setCategoryType('Income')}
        >
          <Text
            style={[
              styles.typeButtonText,
              categoryType === 'Income' && styles.selectedTypeButtonText,
            ]}
          >
            Income
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.typeButton,
            categoryType === 'Expense' && styles.selectedTypeButton,
          ]}
          onPress={() => setCategoryType('Expense')}
        >
          <Text
            style={[
              styles.typeButtonText,
              categoryType === 'Expense' && styles.selectedTypeButtonText,
            ]}
          >
            Expense
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={tw`text-lg font-bold mb-3`}>Choose an Icon</Text>
      <FlatList
        data={categoryType === 'Income' ? incomeIcons : expenseIcons}
        keyExtractor={(item) => item.name}
        numColumns={5}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.iconButton,
              selectedIcon === item && styles.selectedIcon,
            ]}
            onPress={() => setSelectedIcon(item)}
          >
            <Icon
              name={item.name}
              size={30}
              color={selectedIcon === item ? '#ffffff' : item.color}
            />
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={[
          tw`mt-10 p-4 rounded-full flex-row justify-center items-center`,
          { backgroundColor: '#6246EA' },
        ]}
        onPress={handleAddCategory}
      >
        <Text style={tw`text-white text-lg font-bold`}>Add Category</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#f0f0f0',
  },
  selectedIcon: {
    backgroundColor: '#6200ee',
  },
  typeButton: {
    borderWidth: 1,
    borderColor: '#6200ee',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  selectedTypeButton: {
    backgroundColor: '#6200ee',
  },
  typeButtonText: {
    fontSize: 16,
    color: '#6200ee',
  },
  selectedTypeButtonText: {
    color: '#ffffff',
  },
});

export default CategoryPage;
