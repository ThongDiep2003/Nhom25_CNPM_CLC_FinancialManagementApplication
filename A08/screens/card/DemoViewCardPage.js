import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ref, push } from 'firebase/database';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../auths/FirebaseConfig';

const DemoViewCardPage = ({ route, navigation }) => {
  const { bankName, cardNumber, holderName, expiryDate, cvv, color } = route.params;

  const handleConfirm = async () => {
    try {
      const userId = FIREBASE_AUTH.currentUser?.uid;

      if (!userId) {
        Alert.alert('Error', 'User not authenticated.');
        return;
      }

      // Thêm dữ liệu vào Firebase Database
      const cardRef = ref(FIREBASE_DB, `users/${userId}/cards`);
      await push(cardRef, {
        bankName,
        cardNumber,
        holderName,
        expiryDate,
        cvv, // Chỉ nên lưu nếu cần thiết
        color,
      });

      // Hiển thị thông báo thành công
      Alert.alert('Success', 'Card added successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.pop(2), // Quay lại 2 màn hình trước
        },
      ]);
    } catch (error) {
      console.error('Error saving card:', error);
      Alert.alert('Error', 'Failed to save card. Please try again.');
    }
  };

  const handleBack = () => {
    navigation.goBack(); // Quay lại màn hình trước để chỉnh sửa
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Preview Your Card</Text>
      <View style={[styles.card, { backgroundColor: color }]}>
        {/* Card Header */}
        <View style={styles.cardHeader}>
          <Text style={styles.bankName}>{bankName.toUpperCase()}</Text>
          <Icon name="credit-card-chip-outline" size={32} color="#fff" />
        </View>
        {/* Card Number */}
        <Text style={styles.cardNumber}>
          {cardNumber.replace(/(\d{4})/g, '$1 ').trim()}
        </Text>
        {/* Card Details */}
        <View style={styles.cardDetails}>
          <Text style={styles.cardHolder}>{holderName.toUpperCase()}</Text>
          <Text style={styles.cardExpiry}>EXP: {expiryDate}</Text>
        </View>
      </View>
      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    borderRadius: 15,
    padding: 20,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  bankName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardNumber: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 4,
    marginBottom: 15,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  cardHolder: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardExpiry: {
    color: '#fff',
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#6246EA',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DemoViewCardPage;
