import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FIREBASE_DB, FIREBASE_AUTH, getUserProfile } from '../../auths/FirebaseConfig';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import { ref, onValue } from 'firebase/database';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PieChart } from 'react-native-gifted-charts';
import { SectionList } from 'react-native';

const iconList = [
  { name: 'car', color: '#f44336' },
  { name: 'food', color: '#e91e63' },
  { name: 'gift', color: '#9c27b0' },
  { name: 'home', color: '#673ab7' },
  { name: 'wallet', color: '#3f51b5' },
  { name: 'medical-bag', color: '#2196f3' },
  { name: 'truck-fast', color: '#03a9f4' },
  { name: 'gamepad-variant', color: '#00bcd4' },
  { name: 'bank', color: '#009688' },
  { name: 'shopping-outline', color: '#4caf50' },
  { name: 'cash', color: '#ff9800' },
  { name: 'airplane', color: '#ff5722' },
  { name: 'basketball', color: '#795548' },
  { name: 'bed', color: '#607d8b' },
  { name: 'bike', color: '#8bc34a' },
  { name: 'book-open-page-variant', color: '#ffc107' },
  { name: 'camera', color: '#9e9e9e' },
  { name: 'cat', color: '#ff5722' },
  { name: 'chair-rolling', color: '#3f51b5' },
  { name: 'chart-line', color: '#ff4081' },
  { name: 'cellphone', color: '#4caf50' },
  { name: 'city', color: '#673ab7' },
  { name: 'coffee', color: '#795548' },
  { name: 'dog', color: '#ff9800' },
  { name: 'dumbbell', color: '#9c27b0' },
  { name: 'emoticon-happy-outline', color: '#2196f3' },
  { name: 'factory', color: '#00bcd4' },
  { name: 'file-document', color: '#8bc34a' },
  { name: 'flower', color: '#e91e63' },
  { name: 'fridge-outline', color: '#3f51b5' },
  { name: 'guitar-electric', color: '#673ab7' },
  { name: 'headphones', color: '#607d8b' },
  { name: 'hospital-building', color: '#ff4081' },
  { name: 'human-male-female', color: '#03a9f4' },
  { name: 'key-variant', color: '#795548' },
  { name: 'laptop', color: '#ff9800' },
  { name: 'leaf', color: '#4caf50' },
];

const HomePage = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [displayType, setDisplayType] = useState('Expense');
  const [focusedSection, setFocusedSection] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const currentUser = FIREBASE_AUTH.currentUser?.email;
    if (!currentUser) return;

    const forumRef = ref(FIREBASE_DB, 'forum');
    const unsubscribe = onValue(forumRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        let count = 0;
        Object.values(data).forEach(question => {
          if (question.email === currentUser && question.replies) {
            Object.values(question.replies).forEach(reply => {
              if (!reply.read && reply.email !== currentUser) {
                count++;
              }
            });
          }
        });
        setUnreadCount(count);
      }
    });

    return () => unsubscribe();
  }, []);

  const NotificationBell = () => (
    <TouchableOpacity 
      style={[tw`ml-4 flex-row items-center bg-gray-100 px-3 py-2 rounded-full`]}
      onPress={() => navigation.navigate('Forum')}
    >
      <View style={tw`flex-row items-center`}>
        <View style={tw`relative`}>
          <Icon name="chat-outline" size={30} color="#000" />
          {unreadCount > 0 && (
            <View style={[
              tw`absolute -right-3 -top-2 bg-red-500 rounded-full w-6 h-6 justify-center items-center`,
              { minWidth: 24 }
            ]}>
              <Text style={tw`text-white text-xs font-bold`}>
                {unreadCount > 99 ? '99+' : unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const fetchUserData = async () => {
    try {
      const currentUser = FIREBASE_AUTH.currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
        const userProfile = await getUserProfile(userId);
  
        setUserName(userProfile.name);
        if (userProfile.avatarUrl) {
          const storage = getStorage();
          const avatarRef = storageRef(storage, userProfile.avatarUrl);
          const avatarUrl = await getDownloadURL(avatarRef);
          setUserAvatar(avatarUrl);
        } else {
          setUserAvatar('https://via.placeholder.com/60');
        }
  
        const transactionsRef = ref(FIREBASE_DB, `users/${userId}/transactions`);
        onValue(transactionsRef, (snapshot) => {
          const data = snapshot.val();
          
          // Kiểm tra nếu không có dữ liệu
          if (!data) {
            setTransactions([]);
            setTotalIncome(0);
            setTotalExpense(0);
            setExpenseCategories([]);
            setIncomeCategories([]);
            return;
          }
  
          // Chuyển đổi dữ liệu thành mảng và thêm id
          const fetchedTransactions = Object.entries(data).map(([id, transaction]) => ({
            id,
            ...transaction
          })).reverse();
  
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth();
          const currentYear = currentDate.getFullYear();
  
          const filteredTransactions = fetchedTransactions.filter((transaction) => {
            const transactionDate = new Date(transaction.date);
            return (
              transactionDate.getMonth() === currentMonth &&
              transactionDate.getFullYear() === currentYear
            );
          });
  
          setTransactions(filteredTransactions.slice(0, 20));
  
          let income = 0;
          let expense = 0;
          const expenseData = {};
          const incomeData = {};
  
          filteredTransactions.forEach((transaction) => {
            if (transaction.type === 'Income') {
              income += parseFloat(transaction.amount);
              if (incomeData[transaction.category.id]) {
                incomeData[transaction.category.id].amount += parseFloat(transaction.amount);
              } else {
                const categoryIcon = iconList.find(icon => icon.name === transaction.category.icon);
                const color = categoryIcon ? categoryIcon.color : '#6246EA';
                incomeData[transaction.category.id] = {
                  amount: parseFloat(transaction.amount),
                  color: color,
                  name: transaction.category.name,
                };
              }
            } else if (transaction.type === 'Expense') {
              expense += parseFloat(transaction.amount);
              if (expenseData[transaction.category.id]) {
                expenseData[transaction.category.id].amount += parseFloat(transaction.amount);
              } else {
                const categoryIcon = iconList.find(icon => icon.name === transaction.category.icon);
                const color = categoryIcon ? categoryIcon.color : '#6246EA';
                expenseData[transaction.category.id] = {
                  amount: parseFloat(transaction.amount),
                  color: color,
                  name: transaction.category.name,
                };
              }
            }
          });
  
          setTotalIncome(income);
          setTotalExpense(expense);
          setExpenseCategories(Object.values(expenseData));
          setIncomeCategories(Object.values(incomeData));
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const categories = displayType === 'Expense' ? expenseCategories : incomeCategories;
    if (categories.length > 0) {
      const maxIndex = categories.reduce(
        (maxIdx, item, idx) => (item.amount > categories[maxIdx].amount ? idx : maxIdx),
        0
      );
      setFocusedSection(maxIndex);
    }
  }, [expenseCategories, incomeCategories, displayType]);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  const handleExpensePress = () => {
    setDisplayType('Expense');
    setFocusedSection(null);
  };

  const handleIncomePress = () => {
    setDisplayType('Income');
    setFocusedSection(null);
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const categories = displayType === 'Expense' ? expenseCategories : incomeCategories;
  const pieData = categories && categories.length > 0
    ? categories.map((item, index) => ({
        value: Math.abs(item.amount),
        color: item.color,
        gradientCenterColor: item.color,
        text: `${Math.round((item.amount / (displayType === 'Expense' ? totalExpense : totalIncome)) * 100)}%`,
        focused: focusedSection === index,
        onPress: () => setFocusedSection(index),
      }))
    : [];

  const filteredTransactions = transactions.filter((transaction) => transaction.type === displayType);

  return (
    <SafeAreaView style={[tw`flex-1 bg-white`, { paddingTop: Platform.OS === 'ios' ? 35 : StatusBar.currentHeight - 10 }]}>
      <SectionList
        sections={[
          {
            title: 'Recent Transactions',
            data: filteredTransactions
          }
        ]}
        keyExtractor={(item, index) => index.toString()}
        stickySectionHeadersEnabled={true}
        renderSectionHeader={({ section: { title } }) => (
          <View style={[tw`flex-row justify-between bg-white p-3 mx-4`]}>
            <Text style={tw`text-lg font-bold`}>{title}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AllTransaction')}>
              <Text style={tw`text-sm text-blue-500`}>See All</Text>
            </TouchableOpacity>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={tw`flex-row justify-between bg-gray-100 p-3 rounded-lg mb-2 mx-6`}>
            <View style={tw`flex-row items-center`}>
              <Icon name={item.category.icon} size={24} color={iconList.find(icon => icon.name === item.category.icon)?.color || '#000'} />
              <Text style={tw`ml-2`}>{item.category.name}</Text>
            </View>
            <Text style={tw`${item.type === 'Expense' ? 'text-red-600' : 'text-green-600'} font-bold`}>
              {item.type === 'Expense' ? '-' : '+'} {item.amount.toLocaleString()} VND
            </Text>
          </View>
        )}
        ListHeaderComponent={
          <View>
            {/* Header top section: User info and notification */}
            <View style={[tw`p-5 flex-row justify-between items-center rounded-b-lg`]}>
              <View style={tw`flex-row items-center`}>
                <Image
                  source={userAvatar ? { uri: userAvatar } : require('../../assets/avatar.png')}
                  style={tw`w-12 h-12 rounded-full`}
                />
                <View style={tw`ml-3`}>
                  <Text style={tw`text-base text-gray-500`}>Welcome,</Text>
                  <Text style={tw`text-lg font-bold`}>{userName}</Text>
                </View>
              </View>
              <NotificationBell />
            </View>

            {/* Expense / Income summary */}
            <View style={tw`flex-row justify-around mt-5`}>
              <TouchableOpacity onPress={handleExpensePress} style={[tw`p-5 rounded-lg`, { backgroundColor: displayType === 'Expense' ? '#ffebee' : '#f5f5f5', width: 175 }]}>
                <Text style={tw`text-sm text-black`}>Expense</Text>
                <Text style={tw`text-base font-bold text-red-600`}>- {totalExpense.toLocaleString()} VND</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleIncomePress} style={[tw`p-5 rounded-lg`, { backgroundColor: displayType === 'Income' ? '#e8f5e9' : '#f5f5f5', width: 175 }]}>
                <Text style={tw`text-sm text-black`}>Income</Text>
                <Text style={tw`text-base font-bold text-green-600`}>+ {totalIncome.toLocaleString()} VND</Text>
              </TouchableOpacity>
            </View>

            {/* Pie Chart */}
            <View style={[tw`mt-0 mb-0 p-3 rounded-lg justify-center items-center`]}>
              <Text style={tw`text-lg font-bold text-center mb-3`}>{displayType} Distribution</Text>
              {pieData.length > 0 ? (
                <PieChart
                  data={pieData}
                  donut
                  showGradient
                  sectionAutoFocus
                  focusOnPress={true}
                  radius={100}
                  innerRadius={70}
                  innerCircleColor="#ffffff"
                  centerLabelComponent={() => {
                    if (focusedSection !== null && focusedSection < categories.length) {
                      const focusedData = categories[focusedSection];
                      return (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontSize: 22, color: 'black', fontWeight: 'bold' }}>
                            {Math.round((focusedData.amount / (displayType === 'Expense' ? totalExpense : totalIncome)) * 100)}%
                          </Text>
                          <Text style={{ fontSize: 14, color: 'black' }}>{focusedData.name}</Text>
                        </View>
                      );
                    }
                    return null;
                  }}
                />
              ) : (
                <Text>No data available</Text>
              )}
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default HomePage;
