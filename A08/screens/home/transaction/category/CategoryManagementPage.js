import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../../../auths/FirebaseConfig';
import { ref, onValue, remove } from 'firebase/database';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const CategoryManagementPage = () => {
  const [categories, setCategories] = useState([]);
  const userId = FIREBASE_AUTH.currentUser?.uid;
  const navigation = useNavigation();

  useEffect(() => {
    if (!userId) {
      Alert.alert('Error', 'User not authenticated.');
      return;
    }

    // Lấy danh sách các danh mục của người dùng từ Firebase
    const fetchUserCategories = () => {
      const userCategoriesRef = ref(FIREBASE_DB, `categories/${userId}`);
      onValue(userCategoriesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const categoryList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setCategories(categoryList);
        } else {
          setCategories([]);
        }
      });
    };

    fetchUserCategories();
  }, [userId]);

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Category')}>
            <Icon name="plus" size={28} color="#1E1E2D" />
          </TouchableOpacity>
        ),
      });
    }, [navigation])
  );

  // Hàm xóa danh mục
  const handleDeleteCategory = async (categoryId) => {
    Alert.alert('Confirm', 'Are you sure you want to delete this category?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const categoryRef = ref(FIREBASE_DB, `categories/${userId}/${categoryId}`);
            await remove(categoryRef);
            Alert.alert('Success', 'Category deleted successfully.');
          } catch (error) {
            console.error('Error deleting category:', error);
            Alert.alert('Error', 'Failed to delete category.');
          }
        },
      },
    ]);
  };

  // Hiển thị từng danh mục
  const renderCategoryItem = ({ item }) => (
    <View style={styles.categoryItem}>
      <Icon name={item.icon} size={30} color={item.color} style={styles.categoryIcon} />
      <Text style={styles.categoryName}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleDeleteCategory(item.id)} style={styles.deleteButton}>
        <Icon name="delete" size={24} color="#ff5252" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No categories available.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryIcon: { marginRight: 10 },
  categoryName: { flex: 1, fontSize: 18 },
  deleteButton: { marginLeft: 10 },
  emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#888' },
});

export default CategoryManagementPage;
