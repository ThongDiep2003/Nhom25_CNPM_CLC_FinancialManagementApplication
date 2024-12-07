import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../../auths/FirebaseConfig';
import { ref, set, onValue } from 'firebase/database';

const AddBudgetPage = () => {
  const navigation = useNavigation();
  const [totalAmount, setTotalAmount] = useState('');
  const [endDate, setEndDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [budgetName, setBudgetName] = useState('');

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

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setBudgetName(category.name); // Set budgetName automatically based on selected category
  };

  const handleSaveBudget = () => {
    if (!budgetName || !totalAmount || !selectedCategory) {
      Alert.alert('Error', 'Please fill all fields and select a category.');
      return;
    }

    const newBudget = {
      name: budgetName,
      amount: parseFloat(totalAmount),
      categoryId: selectedCategory.id,
      categoryName: selectedCategory.name,
      categoryIcon: selectedCategory.icon,
      categoryColor: selectedCategory.color,
      endDate: endDate.toISOString(),
    };

    const budgetRef = ref(FIREBASE_DB, `users/${userId}/budgets/${Date.now()}`);
    set(budgetRef, newBudget)
      .then(() => {
        Alert.alert('Success', 'Budget created successfully.');
        navigation.goBack();
      })
      .catch((error) => {
        console.error('Error saving budget:', error);
        Alert.alert('Error', 'Failed to save budget.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Total Amount</Text>
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
            onPress={() => handleCategorySelect(cat)}
            style={[
              styles.categoryButton,
              cat.id === selectedCategory?.id && styles.selectedCategoryButton,
            ]}
          >
            <Icon name={cat.icon} size={40} color={cat.color || '#000'} />
          </TouchableOpacity>
        ))}
      </View>
      <Button mode="contained" onPress={handleSaveBudget} style={styles.saveButton}>
        Save Budget
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#ffffff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#6246EA' },
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

export default AddBudgetPage;
