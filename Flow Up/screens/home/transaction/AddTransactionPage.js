import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Button, Chip } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../../auths/FirebaseConfig';
import { ref, onValue, push } from 'firebase/database';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AddTransaction = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [account, setAccount] = useState('Cash'); // Default account
  const [accountList, setAccountList] = useState([]); // List of accounts
  const [userCategories, setUserCategories] = useState([]);
  const [defaultCategories, setDefaultCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [type, setType] = useState('Expense'); // Default to Expense
  const userId = FIREBASE_AUTH.currentUser?.uid;

  // Fetch categories and accounts
  useEffect(() => {
    // Fetch default categories
    const defaultCategoriesRef = ref(FIREBASE_DB, 'categories/default');
    onValue(defaultCategoriesRef, (snapshot) => {
      const data = snapshot.val();
      const categories = data
        ? Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }))
        : [];
      setDefaultCategories(categories);
    });

    // Fetch user categories
    if (userId) {
      const userCategoriesRef = ref(FIREBASE_DB, `categories/${userId}`);
      onValue(userCategoriesRef, (snapshot) => {
        const data = snapshot.val();
        const categories = data
          ? Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
            }))
          : [];
        setUserCategories(categories);

        // Fetch user's cards
        const cardsRef = ref(FIREBASE_DB, `users/${userId}/cards`);
        onValue(cardsRef, (snapshot) => {
          const data = snapshot.val();
          const cardList = data
            ? Object.keys(data).map((key) => ({
                id: key,
                name: data[key].bankName || 'Unnamed Card',
                color: data[key].color || '#D3D3D3', // Default color if not specified
              }))
            : [];
          setAccountList([{ id: 'Cash', name: 'Cash', color: '#57b35a' }, ...cardList]); // Add "Cash" with default color
        });
      });
    }
  }, [userId]);

  const getFilteredCategories = () => {
    const filteredDefaultCategories = defaultCategories.filter((cat) => cat.type === type);
    const filteredUserCategories = userCategories.filter((cat) => cat.type === type);
    return [...filteredDefaultCategories, ...filteredUserCategories];
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleAccountSelect = (selectedAccount) => {
    setAccount(selectedAccount);
  };

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleSaveTransaction = async () => {
    if (!amount || !category) {
      Alert.alert('Error', 'Please enter an amount and select a category.');
      return;
    }

    if (userId) {
      const newTransaction = {
        amount: parseFloat(amount),
        date: date.toISOString(),
        account,
        category: { id: category.id, icon: category.icon, name: category.name },
        type,
      };

      try {
        const userTransactionsRef = ref(FIREBASE_DB, `users/${userId}/transactions`);
        await push(userTransactionsRef, newTransaction);

        Alert.alert('Success', 'Transaction added successfully.');
        navigation.goBack();
      } catch (error) {
        console.error('Error saving transaction:', error);
        Alert.alert('Error', 'Failed to save transaction.');
      }
    } else {
      Alert.alert('Error', 'User not authenticated.');
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.headerContainer}>
        <Text
          style={[styles.header, type === 'Income' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setType('Income')}
        >
          New Income
        </Text>
        <Text
          style={[styles.header, type === 'Expense' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setType('Expense')}
        >
          New Expense
        </Text>
      </View>

      {/* Amount Input */}
      <View style={styles.amountContainer}>
        <TextInput
          style={styles.amountInput}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <Text style={styles.currency}>VND</Text>
      </View>

      {/* Date Picker */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
        <Icon name="calendar" size={24} color="#6246EA" />
        <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker value={date} mode="date" display="default" onChange={onDateChange} />
      )}

      {/* Category Selection */}
      <Text style={styles.sectionTitle}>Select Category</Text>
      <View style={styles.categoryContainer}>
        {getFilteredCategories().map((cat) => (
          <TouchableOpacity
            key={cat.id}
            onPress={() => handleCategorySelect(cat)}
            style={[styles.categoryButton, cat.id === category?.id && styles.selectedCategoryButton]}
          >
            <Icon
              name={cat.icon}
              size={30}
              color={cat.id === category?.id ? '#6246EA' : cat.color}
              style={styles.categoryIcon}
            />
            <Text style={[styles.categoryText, cat.id === category?.id && styles.selectedCategoryText]}>
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Navigate to CategoryPage */}
      <TouchableOpacity
        style={styles.navigateCategory}
        onPress={() => navigation.navigate('Category')}
      >
        <Text style={styles.navigateCategoryText}>Select more categories</Text>
      </TouchableOpacity>

      {/* Account Selection */}
      <Text style={styles.sectionTitle}>Select Account</Text>
      <View style={styles.accountContainer}>
        {accountList.map((acc) => (
          <Chip
            key={acc.id}
            mode="outlined"
            selected={account === acc.name}
            onPress={() => handleAccountSelect(acc.name)}
            style={[
              styles.accountChip,
              { backgroundColor: acc.color || '#D3D3D3' },
              account === acc.name && styles.selectedAccountChip,
            ]}
            textStyle={account === acc.name ? styles.selectedAccountText : null}
          >
            {acc.name}
          </Chip>
        ))}
      </View>

      {/* Save Button */}
      <Button mode="contained" onPress={handleSaveTransaction} buttonColor="#6246EA" style={styles.saveButton}>
        Save Transaction
      </Button>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  contentContainer: { padding: 20, paddingBottom: 100 },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  header: { fontSize: 18, fontWeight: 'bold', paddingVertical: 10, borderBottomWidth: 2 },
  activeTab: { color: '#6246EA', borderBottomColor: '#6246EA' },
  inactiveTab: { color: 'gray', borderBottomColor: 'transparent' },
  amountContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 30 },
  amountInput: { fontSize: 24, borderBottomWidth: 2, borderColor: '#6246EA', width: '70%', textAlign: 'center', marginRight: 10 },
  currency: { fontSize: 18, color: '#6246EA' },
  datePicker: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 10, backgroundColor: '#e0f7fa', marginBottom: 20 },
  dateText: { fontSize: 18, marginLeft: 10, color: '#6246EA' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10, color: '#333' },
  categoryContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginBottom: 20 },
  categoryButton: { alignItems: 'center', marginBottom: 15, padding: 10, borderRadius: 10, backgroundColor: '#fafafa', width: '23%' },
  selectedCategoryButton: { backgroundColor: '#D1C8FF' },
  categoryIcon: { marginBottom: 3 },
  categoryText: { fontSize: 11, color: '#6246EA' },
  selectedCategoryText: { fontWeight: 'bold' },
  navigateCategory: { marginTop: 10, alignItems: 'center' },
  navigateCategoryText: { color: '#6246EA', borderBottomColor: '#6246EA', fontWeight: 'bold', fontSize: 16 },
  accountContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginBottom: 30 },
  accountChip: { margin: 5, borderWidth: 1, borderColor: '#ccc' },
  selectedAccountChip: { borderWidth: 2, borderColor: '#6246EA' },
  selectedAccountText: { fontWeight: 'bold', color: '#ffffff' },
  saveButton: { marginTop: 20, padding: 10, borderRadius: 5 },
});

export default AddTransaction;
