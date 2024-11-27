import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Button, TextInput as PaperInput } from 'react-native-paper';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../auths/FirebaseConfig';
import { ref, push } from 'firebase/database';

const AddCardPage = ({ navigation }) => {
  const [bankName, setBankName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [holderName, setHolderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [selectedColor, setSelectedColor] = useState('#6246EA'); // Default color
  const userId = FIREBASE_AUTH.currentUser?.uid;

  const colors = [
    '#6246EA', '#FFADAD', '#FF9A9E', '#FECFEF', '#00C9A7', '#FFC857',
    '#A1C349', '#6A0572', '#0096FF', '#FF4500', '#FFD700', '#3A86FF',
  ];

  const handleCardNumberChange = (text) => {
    // Format card number with dashes (####-####-####-####)
    const formatted = text
      .replace(/\D/g, '') // Remove non-numeric characters
      .match(/.{1,4}/g)?.join('-') || ''; // Add dashes every 4 digits
    if (formatted.length <= 19) setCardNumber(formatted);
  };

  const handleHolderNameChange = (text) => {
    // Convert input to uppercase
    setHolderName(text.toUpperCase());
  };

  const handleExpiryDateChange = (text) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const input = text.replace(/\D/g, ''); // Remove non-numeric characters

    // Validate format MM/YYYY
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

  const handleAddCard = () => {
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

    // Chuyển hướng đến DemoViewCardPage để xem trước thẻ
    navigation.navigate('DemoViewCard', {
      bankName,
      cardNumber,
      holderName,
      expiryDate,
      cvv,
      color: selectedColor, });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add New Card</Text>
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
        onPress={handleAddCard}
        buttonColor="#6246EA"
        style={styles.addButton}
        labelStyle={{ fontSize: 16 }}
      >
        Add Card
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#6246EA',
  },
  input: {
    marginBottom: 20,
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
  addButton: {
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
});

export default AddCardPage;
