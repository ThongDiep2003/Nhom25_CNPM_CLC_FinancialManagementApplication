import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../../auths/FirebaseConfig';
import { ref, update, onValue } from 'firebase/database';

const AddAmountPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { goalId, goalData } = route.params;

  const [amount, setAmount] = useState('');
  const [currentProgress, setCurrentProgress] = useState(goalData.progress || 0);

  const userId = FIREBASE_AUTH.currentUser?.uid;

  // Xử lý cập nhật số tiền
  const handleAddAmount = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount.');
      return;
    }

    const newProgress = currentProgress + parseFloat(amount);

    if (userId) {
      try {
        const goalRef = ref(FIREBASE_DB, `users/${userId}/goals/${goalId}`);
        await update(goalRef, { progress: newProgress });

        Alert.alert('Success', 'Amount added successfully.');
        navigation.goBack(); // Quay lại trang trước
      } catch (error) {
        console.error('Error updating goal progress:', error);
        Alert.alert('Error', 'Failed to update progress.');
      }
    } else {
      Alert.alert('Error', 'User not authenticated.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name={goalData.categoryIcon || 'target'} size={50} color={goalData.categoryColor || '#6200ee'} />
        <Text style={styles.goalTitle}>{goalData.name}</Text>
        <Text style={styles.goalProgress}>
          Saved: {(goalData.progress || 0).toLocaleString()} / {goalData.targetAmount.toLocaleString()} VND
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Enter Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Button mode="contained" onPress={handleAddAmount} buttonColor="#6200ee" style={styles.addButton}>
        Add Amount
      </Button>
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
    alignItems: 'center',
    marginBottom: 30,
  },
  goalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  goalProgress: {
    fontSize: 16,
    color: 'gray',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    fontSize: 16,
  },
  addButton: {
    padding: 10,
    borderRadius: 10,
  },
});

export default AddAmountPage;
