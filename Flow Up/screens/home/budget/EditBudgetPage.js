import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../../auths/FirebaseConfig';
import { ref, update, onValue, remove } from 'firebase/database';

const EditBudgetPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { budgetId, budgetData } = route.params;

  const [budgetName, setBudgetName] = useState(budgetData.name || '');
  const [totalAmount, setTotalAmount] = useState(String(budgetData.amount) || '');
  const [endDate, setEndDate] = useState(new Date(budgetData.endDate) || new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(budgetData.categoryId || null);

  const userId = FIREBASE_AUTH.currentUser?.uid;

  useEffect(() => {
    if (userId) {
      const categoryRef = ref(FIREBASE_DB, `categories/${userId}`);
      onValue(categoryRef, (snapshot) => {
        const data = snapshot.val();
        const categoryList = data
          ? Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
            }))
          : [];
        setCategories(categoryList);
      });
    }
  }, [userId]);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowDatePicker(false);
    setEndDate(currentDate);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    const selectedCategoryName = categories.find((cat) => cat.id === categoryId)?.name || '';
    setBudgetName(selectedCategoryName);
  };

  const handleUpdateBudget = () => {
    if (!budgetName || !totalAmount || !selectedCategory) {
      Alert.alert('Error', 'Please fill all fields and select a category.');
      return;
    }

    const updatedBudget = {
      name: budgetName,
      amount: parseFloat(totalAmount),
      categoryId: selectedCategory,
      categoryName: categories.find((cat) => cat.id === selectedCategory)?.name || '',
      categoryIcon: categories.find((cat) => cat.id === selectedCategory)?.icon || '',
      categoryColor: categories.find((cat) => cat.id === selectedCategory)?.color || '',
      endDate: endDate.toISOString(),
    };

    const budgetRef = ref(FIREBASE_DB, `users/${userId}/budgets/${budgetId}`);
    update(budgetRef, updatedBudget)
      .then(() => {
        Alert.alert('Success', 'Budget updated successfully.');
        navigation.goBack();
      })
      .catch((error) => {
        console.error('Error updating budget:', error);
        Alert.alert('Error', 'Failed to update budget.');
      });
  };

  const handleDeleteBudget = () => {
    Alert.alert(
      'Delete Budget',
      'Are you sure you want to delete this budget?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const budgetRef = ref(FIREBASE_DB, `users/${userId}/budgets/${budgetId}`);
            remove(budgetRef)
              .then(() => {
                Alert.alert('Success', 'Budget deleted successfully.');
                navigation.goBack();
              })
              .catch((error) => {
                console.error('Error deleting budget:', error);
                Alert.alert('Error', 'Failed to delete budget.');
              });
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Add the trash icon to the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleDeleteBudget} style={styles.headerRightIcon}>
          <Icon name="trash-can-outline" size={25} color="#f44336" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleDeleteBudget]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Budget Name"
        value={budgetName}
        onChangeText={setBudgetName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Total Amount"
        keyboardType="numeric"
        value={totalAmount}
        onChangeText={setTotalAmount}
      />
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
        <Text style={styles.dateText}>{endDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker value={endDate} mode="date" display="default" onChange={onDateChange} />
      )}
      <Text style={styles.sectionTitle}>Select Category</Text>
      <View style={styles.categoryContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            onPress={() => handleCategorySelect(cat.id)}
            style={[
              styles.categoryButton,
              cat.id === selectedCategory && styles.selectedCategoryButton,
            ]}
          >
            <Icon name={cat.icon} size={40} color={cat.color || '#000'} />
          </TouchableOpacity>
        ))}
      </View>
      <Button mode="contained" onPress={handleUpdateBudget} style={styles.saveButton}>
        Update Budget
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#ffffff' },
  headerRightIcon: {
    paddingRight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  datePicker: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  dateText: { fontSize: 16, color: '#333' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#6246EA' },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  categoryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    elevation: 2,
  },
  selectedCategoryButton: { borderColor: '#6246EA', borderWidth: 2 },
  saveButton: {
    height: 50,
    backgroundColor: '#6246EA',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 10,
  },
});

export default EditBudgetPage;
