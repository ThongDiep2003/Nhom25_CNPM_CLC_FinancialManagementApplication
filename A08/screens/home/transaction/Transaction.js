import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { ref, remove } from 'firebase/database';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../../auths/FirebaseConfig'; // Import FIREBASE_AUTH
import { Chip, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Transaction = ({ route, navigation }) => {
  const { transaction } = route.params;

  const handleDeleteTransaction = async () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const currentUser = FIREBASE_AUTH.currentUser?.uid; // Ensure the user is authenticated
              if (!currentUser) {
                Alert.alert('Error', 'User not authenticated.');
                return;
              }

              const transactionRef = ref(
                FIREBASE_DB,
                `users/${currentUser}/transactions/${transaction.id}`
              );
              await remove(transactionRef);

              Alert.alert('Deleted', 'Transaction has been deleted successfully.');
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting transaction:', error);
              Alert.alert('Error', 'Failed to delete transaction. Please try again.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleEditTransaction = () => {
    navigation.navigate('EditTransaction', { transaction });
  };

  return (
    <View style={styles.container}>
      {/* Header Tabs
      <View style={styles.headerContainer}>
        <Text
          style={[
            styles.header,
            transaction.type === 'Income' ? styles.activeTab : styles.inactiveTab,
          ]}
        >
          Income
        </Text>
        <Text
          style={[
            styles.header,
            transaction.type === 'Expense' ? styles.activeTab : styles.inactiveTab,
          ]}
        >
          Expense
        </Text>
      </View> */}

      {/* Amount Display */}
      <View style={styles.amountContainer}>
        <Text style={styles.amountText}>
          {transaction.amount.toLocaleString()} VND
        </Text>
      </View>

      {/* Date Display */}
      <TouchableOpacity style={styles.datePicker}>
        <Icon name="calendar" size={24} color="#6246EA" />
        <Text style={styles.dateText}>{new Date(transaction.date).toLocaleDateString()}</Text>
      </TouchableOpacity>

      {/* Category Display */}
      {transaction.category && (
        <View style={styles.detailContainer}>
          <Text style={styles.sectionTitle}>Category</Text>
          <View style={styles.categoryContainer}>
            <Icon
              name={transaction.category.icon}
              size={30}
              color="#6246EA"
              style={styles.categoryIcon}
            />
            <Text style={styles.categoryText}>{transaction.category.name}</Text>
          </View>
        </View>
      )}

      {/* Account Display */}
      <View style={styles.detailContainer}>
        <Text style={styles.sectionTitle}>Account</Text>
        <Chip mode="outlined" style={styles.accountChip}>
          {transaction.account}
        </Chip>
      </View>

      {/* Buttons for Edit and Delete */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleEditTransaction}
          style={styles.editButton}
        >
          Edit
        </Button>
        <Button
          mode="contained"
          onPress={handleDeleteTransaction}
          style={styles.deleteButton}
        >
          Delete
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    textAlign: 'center',
  },
  activeTab: {
    color: '#6246EA',
    borderBottomColor: '#6246EA',
  },
  inactiveTab: {
    color: 'gray',
    borderBottomColor: 'transparent',
  },
  amountContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  amountText: {
    fontSize: 32,
    color: '#FF5722',
    fontWeight: 'bold',
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f3f3f3',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#6246EA',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
  },
  categoryIcon: {
    marginRight: 10,
  },
  categoryText: {
    fontSize: 18,
    color: '#6246EA',
    fontWeight: '600',
  },
  accountChip: {
    backgroundColor: '#E0F7FA',
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  editButton: {
    flex: 1,
    marginRight: 10,
    borderRadius: 30,
    backgroundColor: '#6246EA',
  },
  deleteButton: {
    flex: 1,
    marginLeft: 10,
    borderRadius: 30,
    backgroundColor: '#FF5722',
  },
});

export default Transaction;
