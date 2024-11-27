import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../../auths/FirebaseConfig';
import { ref, onValue } from 'firebase/database';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import GoalPage from './GoalPage'; // Import GoalPage từ file khác

const BudgetPage = () => {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [daysLeft, setDaysLeft] = useState(0);
  const [activeTab, setActiveTab] = useState('Budget'); // State cho tab
  const userId = FIREBASE_AUTH.currentUser?.uid;
  const navigation = useNavigation();

  // Tính số ngày còn lại của tháng
  useEffect(() => {
    const endOfMonth = moment().endOf('month');
    setDaysLeft(endOfMonth.diff(moment(), 'days'));
  }, []);

  // Fetch data từ Firebase
  useEffect(() => {
    if (userId) {
      // Fetch budgets
      const budgetsRef = ref(FIREBASE_DB, `users/${userId}/budgets`);
      onValue(budgetsRef, (snapshot) => {
        const budgetData = snapshot.val();
        if (budgetData) {
          const budgetsList = Object.entries(budgetData).map(([id, data]) => ({
            id,
            ...data,
          }));
          setBudgets(budgetsList);
        } else {
          setBudgets([]);
        }
      });

      // Fetch transactions
      const transactionsRef = ref(FIREBASE_DB, `users/${userId}/transactions`);
      onValue(transactionsRef, (snapshot) => {
        const transactionData = snapshot.val();
        if (transactionData) {
          const transactionsList = Object.entries(transactionData).map(([id, data]) => ({
            id,
            ...data,
          }));
          setTransactions(transactionsList);
        } else {
          setTransactions([]);
        }
      });
    }
  }, [userId]);

  // Tính toán chi tiêu cho mỗi ngân sách
  const getUpdatedBudgets = () => {
    return budgets.map((budget) => {
      const relatedTransactions = transactions.filter(
        (transaction) => transaction.category?.id === budget.categoryId
      );
      const totalExpense = relatedTransactions.reduce((sum, t) => sum + t.amount, 0);
      const remaining = budget.amount - totalExpense;

      return {
        ...budget,
        expense: totalExpense,
        remaining,
      };
    });
  };

  const updatedBudgets = getUpdatedBudgets();

  const BudgetBar = ({ spent, total }) => {
    const percentageSpent = total > 0 ? (total - spent) / total : 0;

    return (
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            { flex: percentageSpent, backgroundColor: '#4CAF50' },
          ]}
        />
        <View
          style={[
            styles.progressBar,
            { flex: 1 - percentageSpent, backgroundColor: '#f5f5f5' },
          ]}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      {/* Tab Header */}
      <View style={styles.tabHeader}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Budget' && styles.activeTabButton]}
          onPress={() => setActiveTab('Budget')}>
          <Text style={[styles.tabText, activeTab === 'Budget' && styles.activeTabText]}>
            Budget
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Goal' && styles.activeTabButton]}
          onPress={() => setActiveTab('Goal')}>
          <Text style={[styles.tabText, activeTab === 'Goal' && styles.activeTabText]}>
            Goal
          </Text>
        </TouchableOpacity>
      </View>

      {/* Nội dung tab */}
      {activeTab === 'Budget' ? (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: 100 }}
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="automatic">
          {/* Ngày tháng và nút Add */}
          <View style={styles.dateAddContainer}>
            <View>
              <Text style={styles.dateText}>Tháng {moment().format('MMMM YYYY')}</Text>
              <Text style={styles.daysLeftText}>Còn {daysLeft} ngày nữa hết tháng</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddBudget')}
              style={styles.addButton}>
              <Icon name="plus" size={20} color="#fff" />
              <Text style={styles.addButtonText}>Add Budget</Text>
            </TouchableOpacity>
          </View>

          {/* Danh sách ngân sách */}
          {updatedBudgets.length === 0 ? (
            <View style={styles.noBudgetsContainer}>
              <Text style={styles.noBudgetsText}>You have no budgets yet.</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('AddBudget')}
                style={styles.addBudgetButton}>
                <Text style={styles.addBudgetButtonText}>Create a Budget</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text style={styles.sectionTitle}>Budgets</Text>
              <View style={styles.categoryList}>
                {updatedBudgets.map((budget) => (
                  <TouchableOpacity
                    key={budget.id}
                    style={styles.budgetCard}
                    onPress={() =>
                      navigation.navigate('EditBudget', {
                        budgetId: budget.id,
                        budgetData: budget,
                      })
                    }>
                    <View style={styles.budgetHeader}>
                      <Icon
                        name={budget.categoryIcon || 'wallet'}
                        size={30}
                        color={budget.categoryColor || '#4CAF50'}
                      />
                      <Text style={styles.budgetTitle}>{budget.name}</Text>
                    </View>
                    <BudgetBar spent={budget.expense || 0} total={budget.amount || 0} />
                    <Text style={styles.budgetAmount}>
                      Còn lại {(budget.remaining || 0).toLocaleString()} VND
                    </Text>
                    <Text style={styles.budgetSpent}>
                      Chi {(budget.expense || 0).toLocaleString()} /{' '}
                      {(budget.amount || 0).toLocaleString()} VND
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
        </ScrollView>
      ) : (
        <GoalPage />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  tabHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
  },
  activeTabButton: {
    borderBottomWidth: 3,
    borderBottomColor: '#6200ee',
  },
  tabText: {
    fontSize: 16,
    color: 'gray',
  },
  activeTabText: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    paddingTop: 16,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 20,
    color: 'gray',
  },
  dateAddContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  daysLeftText: {
    fontSize: 14,
    color: 'gray',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
    color: '#333',
  },
  categoryList: {
    padding: 20,
  },
  budgetCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  budgetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  budgetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  budgetAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 10,
  },
  budgetSpent: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  progressBarContainer: {
    flexDirection: 'row',
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  progressBar: {
    height: 10,
  },
  noBudgetsContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  noBudgetsText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  addBudgetButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  addBudgetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BudgetPage;
