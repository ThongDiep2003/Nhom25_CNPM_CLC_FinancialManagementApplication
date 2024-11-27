import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../auths/FirebaseConfig';
import { ref, onValue } from 'firebase/database';
import { LineChart } from 'react-native-gifted-charts';
import CalendarPicker from 'react-native-calendar-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';

const screenWidth = Dimensions.get('window').width;

const StatisticPage = ({ navigation }) => {
  const [dailyTransactionData, setDailyTransactionData] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [dateLabels, setDateLabels] = useState([]);

  const fetchTransactionData = (monthKey) => {
    const currentUser = FIREBASE_AUTH.currentUser;
    if (currentUser) {
      const transactionsRef = ref(
        FIREBASE_DB,
        `users/${currentUser.uid}/transactions`,
      );
      onValue(transactionsRef, (snapshot) => {
        const data = snapshot.val();
        if (!data) return;

        const dailyData = {};

        Object.values(data).forEach((transaction) => {
          const dateObj = new Date(transaction.date);
          const dateKey = dateObj.toISOString().split('T')[0];
          const transactionMonthKey = moment(transaction.date).format('YYYY-MM');

          if (transactionMonthKey === monthKey) {
            if (!dailyData[dateKey]) {
              dailyData[dateKey] = [];
            }
            dailyData[dateKey].push(transaction);
          }
        });

        const dailyTransactionAmountLineData = Object.keys(dailyData)
          .sort()
          .map((dateKey) => {
            const transactions = dailyData[dateKey];
            let incoming = 0;
            let outgoing = 0;

            transactions.forEach((transaction) => {
              const amount = parseFloat(transaction.amount);
              if (transaction.type === 'Expense') {
                outgoing += amount;
              } else {
                incoming += amount;
              }
            });

            return {
              day: dateKey,
              incoming,
              outgoing,
            };
          });

        setDailyTransactionData((prevData) => ({
          ...prevData,
          [monthKey]: dailyTransactionAmountLineData,
        }));
      });
    }
  };

  const updateDateLabels = (month) => {
    const firstDate = month.clone().startOf('month');
    const lastDate = month.clone().endOf('month');
    const labels = [];
    const todayKey = moment().format('YYYY-MM-DD');

    for (let date = firstDate; date.isBefore(lastDate) || date.isSame(lastDate); date.add(1, 'day')) {
      const dateKey = date.format('YYYY-MM-DD');
      const label = date.format('MMM D');
      if (date.date() % 5 === 0 || dateKey === todayKey) {
        labels.push({ dateKey, label });
      }
    }

    setDateLabels(labels);
  };

  useEffect(() => {
    const monthKey = moment(selectedDate).format('YYYY-MM');
    if (!dailyTransactionData[monthKey]) {
      fetchTransactionData(monthKey);
    }
    updateDateLabels(moment(selectedDate));
  }, [selectedDate]);

  const onDateChange = (date) => {
    setSelectedDate(date);
    const dateKey = date.toISOString().split('T')[0];
    const filteredData = dailyTransactionData[moment(date).format('YYYY-MM')]?.find((d) => d.day === dateKey);
    if (filteredData) {
      setFilteredTransactions(filteredData);
    } else {
      setFilteredTransactions([]);
    }
  };

  const onMonthChange = (month) => {
    const monthMoment = moment(month);
    const monthKey = monthMoment.format('YYYY-MM');
    setSelectedDate(monthMoment.toDate());
    if (!dailyTransactionData[monthKey]) {
      fetchTransactionData(monthKey);
    }
    updateDateLabels(monthMoment);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

      <ScrollView
        style={styles.contentScroll}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <CalendarPicker
          onDateChange={onDateChange}
          onMonthChange={onMonthChange}
          selectedDayColor="#4caf50"
          todayBackgroundColor="#ffffff"
          textStyle={{
            color: '#000',
          }}
          selectedStartDate={selectedDate}
        />

        {selectedDate && filteredTransactions && (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>
              Tổng quan ngày {moment(selectedDate).format('YYYY-MM-DD')}
            </Text>
            <View style={styles.summaryRow}>
              <Text style={styles.incomeText}>
                Thu nhập: {filteredTransactions.incoming?.toLocaleString()} VND
              </Text>
              <Text style={styles.expenseText}>
                Chi tiêu: {filteredTransactions.outgoing?.toLocaleString()} VND
              </Text>
            </View>
            <Text style={styles.totalText}>
              Tổng:{' '}
              {(
                (filteredTransactions.incoming || 0) - (filteredTransactions.outgoing || 0)
              ).toLocaleString()}{' '}
              VND
            </Text>
          </View>
        )}

        {/* Thu nhập Area Chart */}
        {dailyTransactionData[moment(selectedDate).format('YYYY-MM')] && (
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Thu nhập</Text>
            <LineChart
              data={dailyTransactionData[moment(selectedDate).format('YYYY-MM')].map((d) => ({
                value: d.incoming,
                label: moment(d.day).format('D'),
              }))}
              thickness={2}
              color="#4caf50"
              noOfSections={5}
              areaChart
              yAxisTextStyle={{ color: '#000', fontSize: 10 }}
              xAxisTextStyle={{ color: '#000', fontSize: 10 }}
              xAxisLabelRotation={45} // Xoay nhãn trục X 45 độ
              startFillColor="#4caf5033"
              endFillColor="#4caf5000"
              startOpacity={0.3}
              endOpacity={0.1}
              height={220}
              width={screenWidth - 32}
            />
          </View>
        )}

        {/* Chi tiêu Area Chart */}
        {dailyTransactionData[moment(selectedDate).format('YYYY-MM')] && (
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Chi tiêu</Text>
            <LineChart
              data={dailyTransactionData[moment(selectedDate).format('YYYY-MM')].map((d) => ({
                value: d.outgoing,
                label: moment(d.day).format('D'),
              }))}
              thickness={2}
              color="#f44336"
              noOfSections={5}
              areaChart
              yAxisTextStyle={{ color: '#000', fontSize: 10 }}
              xAxisTextStyle={{ color: '#000', fontSize: 10 }}
              xAxisLabelRotation={45} // Xoay nhãn trục X 45 độ
              startFillColor="#f4433633"
              endFillColor="#f4433600"
              startOpacity={0.3}
              endOpacity={0.1}
              height={220}
              width={screenWidth - 32}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentScroll: {
    padding: 16,
  },
  chartContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  summaryContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  incomeText: {
    color: '#4caf50',
    fontSize: 13,
    fontWeight: 'bold',
  },
  expenseText: {
    color: '#f44336',
    fontSize: 13,
    fontWeight: 'bold',
  },
  totalText: {
    color: '#333',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default StatisticPage;
