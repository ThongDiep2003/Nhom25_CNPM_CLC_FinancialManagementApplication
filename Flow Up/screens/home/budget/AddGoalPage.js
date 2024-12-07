import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import { Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../../auths/FirebaseConfig';
import { ref, set, onValue } from 'firebase/database';

const AddGoalPage = () => {
  const navigation = useNavigation();
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [endDate, setEndDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
    setGoalName(category.name); // Tự động đặt tên mục tiêu theo danh mục
  };

  const handleSaveGoal = () => {
    if (!goalName || !targetAmount || !selectedCategory) {
      Alert.alert('Error', 'Please fill in all fields and select a category.');
      return;
    }

    if (isNaN(targetAmount)) {
      Alert.alert('Error', 'Target Amount must be a valid number.');
      return;
    }

    if (userId) {
      const newGoal = {
        name: goalName,
        targetAmount: parseFloat(targetAmount),
        endDate: endDate.toISOString(),
        progress: 0,
        categoryId: selectedCategory.id,
        categoryName: selectedCategory.name,
        categoryIcon: selectedCategory.icon,
        categoryColor: selectedCategory.color,
        createdAt: new Date().toISOString(),
      };

      const goalRef = ref(FIREBASE_DB, `users/${userId}/goals/${Date.now()}`);
      set(goalRef, newGoal)
        .then(() => {
          Alert.alert('Success', 'Goal added successfully.');
          navigation.goBack();
        })
        .catch((error) => {
          console.error('Error saving goal:', error);
          Alert.alert('Error', 'Failed to save goal.');
        });
    } else {
      Alert.alert('Error', 'User is not authenticated.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Goal</Text>

      <Text style={styles.sectionTitle}>Goal Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Goal Name"
        value={goalName}
        onChangeText={setGoalName}
      />

      <Text style={styles.sectionTitle}>Target Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Target Amount"
        keyboardType="numeric"
        value={targetAmount}
        onChangeText={setTargetAmount}
      />

      <Text style={styles.sectionTitle}>End Date</Text>
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

      <Button mode="contained" onPress={handleSaveGoal} style={styles.saveButton}>
        Save Goal
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#ffffff' },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#6246EA',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6246EA',
  },
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

export default AddGoalPage;
