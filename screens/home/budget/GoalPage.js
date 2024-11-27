import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../../auths/FirebaseConfig';
import { ref, onValue, remove } from 'firebase/database';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const GoalPage = () => {
  const [goals, setGoals] = useState([]);
  const userId = FIREBASE_AUTH.currentUser?.uid;
  const navigation = useNavigation();

  // Fetch data từ Firebase
  useEffect(() => {
    if (userId) {
      const goalsRef = ref(FIREBASE_DB, `users/${userId}/goals`);
      onValue(goalsRef, (snapshot) => {
        const goalData = snapshot.val();
        if (goalData) {
          const goalsList = Object.entries(goalData).map(([id, data]) => ({
            id,
            ...data,
          }));
          setGoals(goalsList);
        } else {
          setGoals([]);
        }
      });
    }
  }, [userId]);

  // Tính toán cập nhật mục tiêu
  const getUpdatedGoals = () => {
    return goals.map((goal) => {
      const endDate = moment(goal.endDate);
      const today = moment();
      const daysLeft = endDate.diff(today, 'days');

      return {
        ...goal,
        daysLeft: daysLeft >= 0 ? daysLeft : 0,
      };
    });
  };

  const handleDeleteGoal = async (goalId) => {
    Alert.alert(
      'Delete Goal',
      'Are you sure you want to delete this goal?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const goalRef = ref(FIREBASE_DB, `users/${userId}/goals/${goalId}`);
              await remove(goalRef);
              Alert.alert('Success', 'Goal deleted successfully.');
            } catch (error) {
              console.error('Error deleting goal:', error);
              Alert.alert('Error', 'Failed to delete goal.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const updatedGoals = getUpdatedGoals();

  const GoalBar = ({ current, total }) => {
    const progress = total > 0 ? current / total : 0;

    return (
      <View style={styles.progressBarContainer}>
        <View
          style={[styles.progressBar, { flex: progress, backgroundColor: '#4CAF50' }]}
        />
        <View
          style={[styles.progressBar, { flex: 1 - progress, backgroundColor: '#f5f5f5' }]}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 100 }}
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Goals</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddGoal')}
            style={styles.addButton}>
            <Icon name="plus" size={20} color="#fff" />
            <Text style={styles.addButtonText}>Add Goal</Text>
          </TouchableOpacity>
        </View>

        {updatedGoals.length === 0 ? (
          <View style={styles.noGoalsContainer}>
            <Text style={styles.noGoalsText}>You have no goals yet.</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddGoal')}
              style={styles.addGoalButton}>
              <Text style={styles.addGoalButtonText}>Create a Goal</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.goalList}>
            {updatedGoals.map((goal) => (
              <View key={goal.id} style={styles.goalCard}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('AddAmount', { goalId: goal.id, goalData: goal })
                  }
                  style={styles.goalContent}>
                  <View style={styles.goalHeader}>
                    <Icon
                      name={goal.categoryIcon || 'target'}
                      size={30}
                      color={goal.categoryColor || '#6200ee'}
                    />
                    <Text style={styles.goalTitle}>{goal.name}</Text>
                  </View>
                  <GoalBar current={goal.progress || 0} total={goal.targetAmount || 0} />
                  <Text style={styles.goalAmount}>
                    Saved {(goal.progress || 0).toLocaleString()} / {(goal.targetAmount || 0).toLocaleString()} VND
                  </Text>
                  <Text style={styles.goalDaysLeft}>
                    {goal.daysLeft > 0
                      ? `${goal.daysLeft} days left until the deadline`
                      : 'Goal expired'}
                  </Text>
                </TouchableOpacity>
                <View style={styles.goalActions}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('EditGoal', { goalId: goal.id, goalData: goal })
                    }
                    style={styles.actionButton}>
                    <Icon name="pencil" size={20} color="#6200ee" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDeleteGoal(goal.id)}
                    style={styles.actionButton}>
                    <Icon name="delete" size={20} color="#ff5252" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
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
  scrollView: {
    flex: 1,
    paddingTop: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
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
  noGoalsContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  noGoalsText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  addGoalButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  addGoalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  goalList: {
    padding: 20,
  },
  goalCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    position: 'relative',
  },
  goalContent: {
    flex: 1,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  goalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 10,
  },
  goalDaysLeft: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  goalActions: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  actionButton: {
    marginHorizontal: 5,
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
});

export default GoalPage;
