import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Cấu hình cách xử lý thông báo
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true, // Hiển thị thông báo
        shouldPlaySound: true, // Phát âm thanh
        shouldSetBadge: false, // Không cập nhật badge
    }),
});

// Lắng nghe thông báo khi ứng dụng đang mở hoặc phản hồi thông báo
export const configureNotifications = () => {
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
        console.log('Notification received:', notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
        console.log('Notification response:', response);
    });

    return () => {
        Notifications.removeNotificationSubscription(notificationListener);
        Notifications.removeNotificationSubscription(responseListener);
    };
};

export const registerForPushNotificationsAsync = async () => {
    let token;
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        console.error('Push notification permission denied.');
        return null;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Expo Push Token:', token);
    return token;
};


// Lấy token từ AsyncStorage
export const getSavedPushToken = async () => {
    try {
        const token = await AsyncStorage.getItem('expoPushToken');
        return token;
    } catch (error) {
        console.error('Failed to get saved push token:', error);
        return null;
    }
};

export const sendNotification = async (expoPushToken, title, body) => {
    try {
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: title,
            body: body,
        };

        const response = await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });

        const result = await response.json();
        console.log('Notification response:', result);
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};
