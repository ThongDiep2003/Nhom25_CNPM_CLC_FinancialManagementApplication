import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FIREBASE_DB, FIREBASE_AUTH, getUserProfile } from '../../auths/FirebaseConfig';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import { ref, onValue } from 'firebase/database';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PieChart } from 'react-native-gifted-charts';

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
          if (data) {
            const fetchedTransactions = Object.values(data).reverse();
            setTransactions(fetchedTransactions.slice(0, 20));

            let income = 0;
            let expense = 0;
            const expenseData = {};
            const incomeData = {};

            fetchedTransactions.forEach((transaction) => {
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
          }
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
      setFocusedSection(maxIndex); // Focus vào phần có giá trị lớn nhất
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

  const pieData = (displayType === 'Expense' ? expenseCategories : incomeCategories).map((item, index) => ({
    value: Math.abs(item.amount),
    color: item.color,
    gradientCenterColor: item.color,
    text: `${Math.round((item.amount / (displayType === 'Expense' ? totalExpense : totalIncome)) * 100)}%`,
    focused: focusedSection === index,
    onPress: () => setFocusedSection(index),
  }));

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={[tw`p-5 flex-row justify-between items-center rounded-b-lg`]}>
        <View style={tw`flex-row items-center`}>
          <Image
            source={userAvatar ? { uri: userAvatar } : require('../../assets/avatar.png')}
            style={tw`w-12 h-12 rounded-full`}
          />
          <View style={tw`ml-3`}>
            <Text style={tw`text-base text-gray-500`}>Welcome back,</Text>
            <Text style={tw`text-lg font-bold`}>{userName}</Text>
          </View>
        </View>
      </View>

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

      <View style={[tw`mt-0 mb-0 p-3 rounded-lg justify-center items-center`]}>
        <Text style={tw`text-lg font-bold text-center mb-3`}>{displayType} Distribution</Text>
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
            if (focusedSection !== null) {
              const focusedData = (displayType === 'Expense' ? expenseCategories : incomeCategories)[focusedSection];
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
      </View>

      <View style={tw`flex-1 p-6`}>
        <View style={tw`flex-row justify-between mb-3`}>
          <Text style={tw`text-lg font-bold`}>Recent Transactions</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AllTransaction')}>
            <Text style={tw`text-sm text-blue-500`}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={transactions.filter((transaction) => transaction.type === displayType)}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Transaction', { transaction: item })}
              style={tw`flex-row justify-between bg-gray-100 p-3 rounded-lg mb-2`}
            >
              <View style={tw`flex-row items-center`}>
                <Icon name={item.category.icon} size={24} color={iconList.find(icon => icon.name === item.category.icon)?.color || '#000'} />
                <Text style={tw`ml-2`}>{item.category.name}</Text>
              </View>
              <Text style={tw`${item.type === 'Expense' ? 'text-red-600' : 'text-green-600'} font-bold`}>
                {item.type === 'Expense' ? '-' : '+'} {item.amount.toLocaleString()} VND
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
