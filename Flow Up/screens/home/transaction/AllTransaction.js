import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../../auths/FirebaseConfig';
import { ref, onValue, remove } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';

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

  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState([]);

  const currentUser = FIREBASE_AUTH.currentUser;
  
  useEffect(() => {
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
        } else {
          setTransactions([]);
          setFilteredTransactions([]);
        }
      });
    }
  }, [currentUser]);

  useEffect(() => {
    let filteredData = transactions;

    // Filter by type
    if (filterType !== 'All') {
      filteredData = filteredData.filter((item) => item.type === filterType);
    }

    // Search query
    if (searchQuery.trim()) {
      filteredData = filteredData.filter(
        (item) =>
          item.category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          new Date(item.date).toLocaleDateString().includes(searchQuery)
      );
    }

    setFilteredTransactions(filteredData);
  }, [searchQuery, filterType, transactions]);

  const handleLongPressTransaction = (transactionId) => {
    setIsSelectionMode(true);
    setSelectedTransactions([transactionId]);
  };

  const handlePressTransaction = (transaction) => {
    if (isSelectionMode) {
      toggleSelectTransaction(transaction.id);
    } else {
      navigation.navigate('Transaction', { transaction: transaction });
    }
  };

  const toggleSelectTransaction = (transactionId) => {
    if (selectedTransactions.includes(transactionId)) {
      setSelectedTransactions(selectedTransactions.filter((id) => id !== transactionId));
    } else {
      setSelectedTransactions([...selectedTransactions, transactionId]);
    }
  };

  const confirmDeleteSelectedTransactions = () => {
    if (selectedTransactions.length === 0) return;
    Alert.alert(
      'Delete Transactions',
      'Are you sure you want to delete the selected transactions?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteSelectedTransactionsWithAlert(),
        },
      ],
      { cancelable: true }
    );
  };

  const deleteSelectedTransactionsWithAlert = async () => {
    try {
      await deleteSelectedTransactions();
      Alert.alert('Success', 'Selected transactions deleted successfully.');
    } catch (error) {
      console.error('Error deleting transactions:', error);
      Alert.alert('Error', 'Failed to delete selected transactions.');
    } finally {
      setIsSelectionMode(false);
      setSelectedTransactions([]);
    }
  };

  const deleteSelectedTransactions = async () => {
    if (currentUser && selectedTransactions.length > 0) {
      for (const id of selectedTransactions) {
        await remove(ref(FIREBASE_DB, `users/${currentUser.uid}/transactions/${id}`));
      }
    }
  };

  // Render mỗi giao dịch
  const renderTransaction = ({ item }) => {
    const iconDetails = icons.find((icon) => icon.name === item.category.icon);
    const iconColor = iconDetails ? iconDetails.color : '#6246EA'; // Default color

    const isSelected = selectedTransactions.includes(item.id);

    return (
      <TouchableOpacity
        style={styles.transactionContainer}
        onLongPress={() => handleLongPressTransaction(item.id)}
        onPress={() => handlePressTransaction(item)}
      >
        {isSelectionMode && (
          <Icon
            name={isSelected ? 'checkbox-marked' : 'checkbox-blank-outline'}
            size={24}
            color="#6200ee"
            style={styles.checkboxIcon}
          />
        )}
        <Icon
          name={item.category.icon}
          size={30}
          color={iconColor}
          style={styles.categoryIcon}
        />
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

  // Cập nhật header để hiển thị icon thùng rác khi isSelectionMode = true
  useLayoutEffect(() => {
    if (isSelectionMode) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={confirmDeleteSelectedTransactions} style={styles.headerRightIcon}>
            <Icon name="trash-can-outline" size={25} color="#f44336" />
          </TouchableOpacity>
        ),
      });
    } else {
      navigation.setOptions({
        headerRight: () => null,
      });
    }
  }, [navigation, isSelectionMode, selectedTransactions]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => setFilterType('All')}>
            <Text style={[styles.filterButton, filterType === 'All' && styles.activeFilter]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilterType('Income')}>
            <Text style={[styles.filterButton, filterType === 'Income' && styles.activeFilter]}>Income</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilterType('Expense')}>
            <Text style={[styles.filterButton, filterType === 'Expense' && styles.activeFilter]}>Expense</Text>
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
  headerIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  filterButton: {
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 40,
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
  checkboxIcon: {
    marginRight: 10,
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
  headerRightIcon: {
    marginRight: 15,
  },
});

export default AllTransaction;
