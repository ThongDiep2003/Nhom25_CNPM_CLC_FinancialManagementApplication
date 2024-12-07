// navigation/TabNavigator.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Import các trang
import HomePage from '../screens/home/HomePage';
import AddTransaction from '../screens/home/transaction/AddTransactionPage'; 
import StatisticPage from '../screens/home/StatisticPage'; 
import BudgetPage from '../screens/home/budget/BudgetPage'; 
import SettingsPage from '../screens/setting/SettingsPage'; // Import Settings Page

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={styles.customButtonContainer}
    onPress={onPress}
  >
    <View style={styles.customButton}>
      {children}
    </View>
  </TouchableOpacity>
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Statistics') {
            iconName = 'stats-chart';
          } else if (route.name === 'Budget') {
            iconName = 'wallet';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }

          return (
            <View style={{ alignItems: 'center' }}>
              {focused && <View style={styles.activeTabIndicator} />}
              <Icon name={iconName} size={size} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: '#6246EA', // Màu khi được chọn
        tabBarInactiveTintColor: '#808080', // Màu khi không được chọn
        headerShown: false, // Ẩn header
        tabBarStyle: styles.tabBar, // Tùy chỉnh thanh tab
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Statistics" component={StatisticPage} />
      
      {/* Nút thêm giao dịch ở giữa */}
      <Tab.Screen
        name="AddTransaction"
        component={AddTransaction}
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton {...props}>
              <Icon name="add" size={30} color="white" />
            </CustomTabBarButton>
          ),
        }}
      />

      <Tab.Screen name="Budget" component={BudgetPage} />
      <Tab.Screen name="Settings" component={SettingsPage} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 60,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#f4f5f9',
    borderTopWidth: 0,
    paddingBottom: 5,
    paddingTop: 5,
  },
  customButtonContainer: {
    top: -10, // Đưa nút nổi lên trên
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6246EA', // Màu nút AddTransaction
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  activeTabIndicator: {
    width: 30,
    height: 3,
    backgroundColor: '#6246EA',
    marginBottom: 5,
    borderRadius: 1.5,
  },
});

export default TabNavigator;
