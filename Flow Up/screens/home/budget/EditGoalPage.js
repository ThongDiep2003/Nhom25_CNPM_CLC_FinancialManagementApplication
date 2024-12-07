import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../../auths/FirebaseConfig';
import { ref, update, onValue, remove } from 'firebase/database';
import moment from 'moment';

const EditGoalPage = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { goalId, goalData = {} } = route.params || {};
  
    const [goalName, setGoalName] = useState(goalData.name || '');
    const [amount, setAmount] = useState(String(goalData.targetAmount || 0));
    const [endDate, setEndDate] = useState(new Date(goalData.endDate || new Date()));
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(goalData.categoryId || null);
    const [dateError, setDateError] = useState('');
  
    const userId = FIREBASE_AUTH.currentUser?.uid;
  
    useEffect(() => {
      if (userId) {
        const categoryRef = ref(FIREBASE_DB, `categories/${userId}`);
        onValue(categoryRef, (snapshot) => {
          const data = snapshot.val();
          const categoryList = data
            ? Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
              }))
            : [];
          setCategories(categoryList);
        });
      }
    }, [userId]);

    // Xử lý thay đổi ngày
    const handleDateChange = (event, selectedDate) => {
      setShowDatePicker(false);
      if (selectedDate) {
        const currentDate = new Date();
        // Đặt giờ, phút, giây về 0 để so sánh ngày
        currentDate.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);

        if (selectedDate < currentDate) {
          setDateError('Expire date must be in the future');
          return;
        }

        // Kiểm tra ngày hết hạn có hợp lệ không
        const daysDiff = moment(selectedDate).diff(moment(), 'days');
        if (daysDiff < 1) {
          setDateError('Expire date must be at least 1 day from now');
          return;
        }

        setEndDate(selectedDate);
        setDateError('');
      }
    };
  
    const handleUpdateGoal = () => {
      if (!goalName.trim()) {
        Alert.alert('Lỗi', 'Vui lòng nhập tên mục tiêu');
        return;
      }

      if (!amount || parseFloat(amount) <= 0) {
        Alert.alert('Lỗi', 'Vui lòng nhập số tiền hợp lệ');
        return;
      }

      if (!selectedCategory) {
        Alert.alert('Lỗi', 'Vui lòng chọn danh mục');
        return;
      }

      if (dateError) {
        Alert.alert('Lỗi', dateError);
        return;
      }

      // Kiểm tra nếu số tiền đã tiết kiệm lớn hơn số tiền mục tiêu mới
      if (goalData.progress && parseFloat(amount) < goalData.progress) {
        Alert.alert(
          'Cảnh báo',
          'Số tiền mục tiêu mới nhỏ hơn số tiền đã tiết kiệm. Bạn có chắc chắn muốn cập nhật không?',
          [
            {
              text: 'Hủy',
              style: 'cancel'
            },
            {
              text: 'Đồng ý',
              onPress: () => updateGoal()
            }
          ]
        );
      } else {
        updateGoal();
      }
    };

    const updateGoal = () => {
      const updatedGoal = {
        name: goalName.trim(),
        targetAmount: parseFloat(amount),
        categoryId: selectedCategory,
        categoryName: categories.find((cat) => cat.id === selectedCategory)?.name || '',
        categoryIcon: categories.find((cat) => cat.id === selectedCategory)?.icon || '',
        categoryColor: categories.find((cat) => cat.id === selectedCategory)?.color || '',
        endDate: endDate.toISOString(),
        progress: goalData.progress || 0, // Giữ nguyên tiến độ hiện tại
      };
  
      const goalRef = ref(FIREBASE_DB, `users/${userId}/goals/${goalId}`);
      update(goalRef, updatedGoal)
        .then(() => {
          Alert.alert('Thành công', 'Cập nhật mục tiêu thành công');
          navigation.goBack();
        })
        .catch((error) => {
          console.error('Lỗi cập nhật mục tiêu:', error);
          Alert.alert('Lỗi', 'Không thể cập nhật mục tiêu');
        });
    };
  
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên mục tiêu"
          value={goalName}
          onChangeText={setGoalName}
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập số tiền mục tiêu"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        
        <Text style={styles.label}>Expired day:</Text>
        <TouchableOpacity 
          onPress={() => setShowDatePicker(true)} 
          style={[
            styles.datePicker,
            dateError ? styles.datePickerError : null
          ]}
        >
          <Text style={styles.dateText}>{moment(endDate).format('DD/MM/YYYY')}</Text>
        </TouchableOpacity>
        {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}

        {showDatePicker && (
          <DateTimePicker 
            value={endDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
        )}

        <Text style={styles.sectionTitle}>Select Category</Text>
        <View style={styles.categoryContainer}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => setSelectedCategory(cat.id)}
              style={[
                styles.categoryButton,
                cat.id === selectedCategory && styles.selectedCategoryButton,
              ]}
            >
              <Icon name={cat.icon} size={40} color={cat.color || '#000'} />
            </TouchableOpacity>
          ))}
        </View>
        <Button 
          mode="contained" 
          onPress={handleUpdateGoal} 
          style={styles.saveButton}
        >
          Update Goal
        </Button>
      </View>
    );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#ffffff' 
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  datePicker: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  datePickerError: {
    borderColor: '#ff0000',
  },
  errorText: {
    color: '#ff0000',
    fontSize: 12,
    marginBottom: 15,
  },
  dateText: { 
    fontSize: 16, 
    color: '#333' 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    color: '#6246EA' 
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  categoryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    elevation: 2,
  },
  selectedCategoryButton: { 
    borderColor: '#6246EA', 
    borderWidth: 2 
  },
  saveButton: {
    height: 50,
    backgroundColor: '#6246EA',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 10,
  },
});

export default EditGoalPage;