import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../auths/FirebaseConfig';
import { ref, onValue, remove } from 'firebase/database';

const ManageCardsPage = ({ navigation }) => {
  const [cards, setCards] = useState([]);
  const userId = FIREBASE_AUTH.currentUser?.uid;

  useEffect(() => {
    if (userId) {
      const cardsRef = ref(FIREBASE_DB, `users/${userId}/cards`);
      onValue(cardsRef, (snapshot) => {
        const data = snapshot.val();
        const cardList = data
          ? Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
            }))
          : [];
        setCards(cardList);
      });
    }
  }, [userId]);

  const handleDeleteCard = (cardId) => {
    Alert.alert(
      'Delete Card',
      'Are you sure you want to delete this card?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const cardRef = ref(FIREBASE_DB, `users/${userId}/cards/${cardId}`);
            remove(cardRef)
              .then(() => {
                Alert.alert('Success', 'Card deleted successfully!');
              })
              .catch((error) => {
                console.error('Error deleting card:', error);
                Alert.alert('Error', 'Failed to delete card.');
              });
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Cards</Text>
      <ScrollView>
        {cards.map((card) => (
          <View
            key={card.id}
            style={[
              styles.card,
              { backgroundColor: card.color || '#1A1F71' }, // Apply card color
            ]}
          >
            {/* Card Logo Section */}
            <View style={styles.cardHeader}>
              <Text style={styles.bankName}>{card.bankName.toUpperCase()}</Text>
              <Icon name="credit-card-chip-outline" size={32} color="#fff" />
            </View>
            {/* Card Number */}
            <Text style={styles.cardNumber}>
              {card.cardNumber.replace(/(\d{4})/g, '$1 ').trim()}
            </Text>
            {/* Card Details */}
            <View style={styles.cardDetails}>
              <Text style={styles.cardHolder}>{card.holderName.toUpperCase()}</Text>
              <Text style={styles.cardExpiry}>EXP: {card.expiryDate}</Text>
            </View>
            {/* Action Buttons */}
            <View style={styles.cardFooter}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.navigate('EditCard', { cardId: card.id, card })}
              >
                <Icon name="pencil" size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteCard(card.id)}
              >
                <Icon name="delete" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddCard')}
      >
        <Text style={styles.addButtonText}>Add Card +</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
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
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  editButton: {
    marginRight: 15,
  },
  deleteButton: {},
  addButton: {
    backgroundColor: '#6246EA',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ManageCardsPage;
