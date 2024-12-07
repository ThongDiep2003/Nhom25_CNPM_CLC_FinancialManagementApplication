import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { TextInput as PaperInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../auths/FirebaseConfig';
import { ref, update } from 'firebase/database';

const EditCardPage = ({ route, navigation }) => {
  const { cardId, card } = route.params;
  const userId = FIREBASE_AUTH.currentUser?.uid;

  const [bankName, setBankName] = useState(card.bankName || '');
  const [cardNumber, setCardNumber] = useState(card.cardNumber || '');
  const [holderName, setHolderName] = useState(card.holderName || '');
  const [expiryDate, setExpiryDate] = useState(card.expiryDate || '');
  const [cvv, setCvv] = useState(card.cvv || '');
  const [selectedColor, setSelectedColor] = useState(card.color || '#6246EA');

  const colors = [
    '#6246EA', '#FFADAD', '#FF9A9E', '#FECFEF', '#00C9A7', '#FFC857',
    '#A1C349', '#6A0572', '#0096FF', '#FF4500', '#FFD700', '#3A86FF',
  ];

  const handleCardNumberChange = (text) => {
    const formatted = text
      .replace(/\D/g, '')
      .match(/.{1,4}/g)?.join('-') || '';
    if (formatted.length <= 19) setCardNumber(formatted);
  };

  const handleHolderNameChange = (text) => {
    setHolderName(text.toUpperCase());
  };

  const handleExpiryDateChange = (text) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const input = text.replace(/\D/g, '');

    if (input.length > 6) return;

    const formatted =
      input.length <= 2
        ? input
        : input.slice(0, 2) + '/' + input.slice(2, 6);

    if (formatted.length === 7) {
      const [month, year] = formatted.split('/').map(Number);
      if (
        month < 1 ||
        month > 12 ||
        year < currentYear ||
        year > currentYear + 6 ||
        (year === currentYear && month < currentMonth)
      ) {
        Alert.alert('Error', 'Invalid expiry date.');
        return;
      }
    }
    setExpiryDate(formatted);
  };

  const handleSaveChanges = () => {
    if (!bankName || !cardNumber || !holderName || !expiryDate || !cvv) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (cardNumber.replace(/-/g, '').length !== 16) {
      Alert.alert('Error', 'Card number must be 16 digits.');
      return;
    }

    if (cvv.length !== 3 && cvv.length !== 4) {
      Alert.alert('Error', 'CVV must be 3 or 4 digits.');
      return;
    }

    const updatedCard = {
      bankName,
      cardNumber,
      holderName,
      expiryDate,
      cvv,
      color: selectedColor,
    };

    const cardRef = ref(FIREBASE_DB, `users/${userId}/cards/${cardId}`);
    update(cardRef, updatedCard)
      .then(() => {
        Alert.alert('Success', 'Card updated successfully!');
        navigation.goBack(); // Quay lại trang ManageCards
      })
      .catch((error) => {
        console.error('Error updating card:', error);
        Alert.alert('Error', 'Failed to update card.');
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Edit Card</Text>
      <PaperInput
        label="Bank Name"
        value={bankName}
        onChangeText={setBankName}
        mode="outlined"
        style={styles.input}
        outlineColor="#ccc"
        activeOutlineColor="#6246EA"
      />
      <PaperInput
        label="Card Number (16 digits)"
        value={cardNumber}
        keyboardType="numeric"
        onChangeText={handleCardNumberChange}
        mode="outlined"
        style={styles.input}
        outlineColor="#ccc"
        activeOutlineColor="#6246EA"
      />
      <PaperInput
        label="Card Holder's Name"
        value={holderName}
        onChangeText={handleHolderNameChange}
        mode="outlined"
        style={styles.input}
        outlineColor="#ccc"
        activeOutlineColor="#6246EA"
      />
      <PaperInput
        label="Expiry Date (MM/YYYY)"
        value={expiryDate}
        keyboardType="numeric"
        onChangeText={handleExpiryDateChange}
        mode="outlined"
        style={styles.input}
        outlineColor="#ccc"
        activeOutlineColor="#6246EA"
      />
      <PaperInput
        label="CVV (3-4 digits)"
        value={cvv}
        secureTextEntry
        keyboardType="numeric"
        maxLength={4}
        onChangeText={setCvv}
        mode="outlined"
        style={styles.input}
        outlineColor="#ccc"
        activeOutlineColor="#6246EA"
      />
      <Text style={styles.subHeader}>Select Card Color</Text>
      <View style={styles.colorContainer}>
        {colors.map((color, index) => (
          <View
            key={index}
            style={[
              styles.colorOption,
              { backgroundColor: color },
              selectedColor === color && styles.selectedColor,
            ]}
            onStartShouldSetResponder={() => setSelectedColor(color)}
          />
        ))}
      </View>
      <Button
        mode="contained"
        onPress={handleSaveChanges}
        buttonColor="#6246EA"
        style={styles.saveButton}
        labelStyle={{ fontSize: 16 }}
      >
        Save Changes
      </Button>
    </ScrollView>
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
  input: {
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#6246EA',
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
    borderWidth: 3,
    borderColor: '#fff',
  },
  selectedColor: {
    borderColor: '#000',
  },
  saveButton: {
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
});

export default EditCardPage;
