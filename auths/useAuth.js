// useAuth.js
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { getToken } from './authUtils';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigation = useNavigation();
  const auth = getAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      if (token) {
        // Kiểm tra xem token có hợp lệ không
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setIsAuthenticated(true);
            navigation.navigate('Home');
          } else {
            setIsAuthenticated(false);
            navigation.navigate('Login');
          }
        });
      } else {
        setIsAuthenticated(false);
        navigation.navigate('Login');
      }
    };

    checkAuth();
  }, [auth, navigation]);

  return isAuthenticated;
};

export default useAuth;
