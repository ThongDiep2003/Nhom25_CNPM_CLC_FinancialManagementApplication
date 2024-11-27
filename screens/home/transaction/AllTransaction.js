import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../../auths/FirebaseConfig';
import { ref, onValue } from 'firebase/database';

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

const AllTransaction = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All'); // Options: 'All', 'Income', 'Expense'

  // Fetch transactions from Firebase
  useEffect(() => {
    const currentUser = FIREBASE_AUTH.currentUser;
    if (currentUser) {
      const transactionsRef = ref(FIREBASE_DB, `users/${currentUser.uid}/transactions`);
      onValue(transactionsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const transactionList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setTransactions(transactionList);
          setFilteredTransactions(transactionList); // Initialize filtered transactions
        }
      });
    }
  }, []);

  // Handle search and filtering
  useEffect(() => {
    let filteredData = transactions;

    // Apply filter type
    if (filterType !== 'All') {
      filteredData = filteredData.filter((item) => item.type === filterType);
    }

    // Apply search query
    if (searchQuery.trim()) {
      filteredData = filteredData.filter(
        (item) =>
          item.category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          new Date(item.date).toLocaleDateString().includes(searchQuery)
      );
    }

    setFilteredTransactions(filteredData);
  }, [searchQuery, filterType, transactions]);

  const navigateToEditTransaction = (transaction) => {
    navigation.navigate('Transaction', { transaction });
  };

  const renderTransaction = ({ item }) => {
    const iconDetails = icons.find((icon) => icon.name === item.category.icon);
    const iconColor = iconDetails ? iconDetails.color : '#6246EA'; // Default color

    return (
      <TouchableOpacity
        style={styles.transactionContainer}
        onPress={() => navigateToEditTransaction(item)}
      >
        <Icon name={item.category.icon} size={30} color={iconColor} style={styles.categoryIcon} />
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionDate}>{new Date(item.date).toLocaleDateString()}</Text>
          <Text style={styles.transactionCategory}>{item.category.name}</Text>
        </View>
        <Text style={styles.transactionAmount}>
          {`${item.type === 'Expense' ? '-' : '+'} ${item.amount} VND`}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>All Transactions</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => setFilterType('All')}>
            <Text style={[styles.filterButton, filterType === 'All' && styles.activeFilter]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilterType('Income')}>
            <Text style={[styles.filterButton, filterType === 'Income' && styles.activeFilter]}>
              Income
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilterType('Expense')}>
            <Text style={[styles.filterButton, filterType === 'Expense' && styles.activeFilter]}>
              Expense
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by category or date..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Icon name="magnify" size={24} color="#333" />
      </View>

      <FlatList
        data={filteredTransactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  filterButton: {
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  activeFilter: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#6200ee',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 100,
  },
  transactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryIcon: {
    marginRight: 16,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDate: {
    fontSize: 12,
    color: '#999',
  },
  transactionCategory: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default AllTransaction;
