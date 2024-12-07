// NotificationHandler.js
import * as Notifications from 'expo-notifications';
import { FIREBASE_DB, FIREBASE_AUTH } from '../auths/FirebaseConfig';
import { ref, onValue, update } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

class NotificationHandler {
  constructor() {
    this.currentUser = null;
    this.notificationListener = null;
    this.responseListener = null;
    this.lastNotificationTime = {};
  }

  // Khởi tạo notification handler
  async initialize() {
    try {
      // Kiểm tra quyền thông báo
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        throw new Error('Permission not granted for notifications');
      }

      // Cấu hình notification handler
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });

      // Lưu user hiện tại
      this.currentUser = FIREBASE_AUTH.currentUser?.email;

      // Khởi tạo listeners
      this.setupListeners();
      
      return true;
    } catch (error) {
      console.error('Notification initialization error:', error);
      return false;
    }
  }

  // Thiết lập các listeners
  setupListeners() {
    // Lắng nghe thông báo khi app đang chạy
    this.notificationListener = Notifications.addNotificationReceivedListener(
      this.handleNotification
    );

    // Lắng nghe phản hồi khi người dùng tap vào thông báo
    this.responseListener = Notifications.addNotificationResponseReceivedListener(
      this.handleNotificationResponse
    );

    // Lắng nghe các câu trả lời mới
    this.listenToNewReplies();
  }

  // Xử lý khi nhận được thông báo
  handleNotification = async (notification) => {
    try {
      const count = await Notifications.getBadgeCountAsync();
      await Notifications.setBadgeCountAsync(count + 1);
    } catch (error) {
      console.error('Error handling notification:', error);
    }
  };

  // Xử lý khi người dùng tương tác với thông báo
  handleNotificationResponse = async (response) => {
    try {
      const data = response.notification.request.content.data;
      await Notifications.setBadgeCountAsync(0);
      
      // Lưu trạng thái đã đọc
      if (data.questionId && data.replyId) {
        const replyRef = ref(
          FIREBASE_DB, 
          `forum/${data.questionId}/replies/${data.replyId}`
        );
        await update(replyRef, { read: true });
      }
    } catch (error) {
      console.error('Error handling notification response:', error);
    }
  };

  // Lắng nghe câu trả lời mới
  listenToNewReplies() {
    if (!this.currentUser) return;

    const forumRef = ref(FIREBASE_DB, 'forum');
    onValue(forumRef, async (snapshot) => {
      const forumData = snapshot.val();
      if (!forumData) return;

      Object.entries(forumData).forEach(([questionId, questionData]) => {
        if (questionData.email === this.currentUser && questionData.replies) {
          this.checkNewReplies(questionId, questionData);
        }
      });
    });
  }

  // Kiểm tra và xử lý câu trả lời mới
  async checkNewReplies(questionId, questionData) {
    const replies = questionData.replies;
    if (!replies) return;

    Object.entries(replies).forEach(async ([replyId, replyData]) => {
      // Bỏ qua nếu người trả lời là chính mình
      if (replyData.email === this.currentUser) {
        return;
      }

      const notificationKey = `${questionId}-${replyId}`;
      
      // Kiểm tra xem đã gửi thông báo chưa
      const hasNotified = await this.checkIfNotified(notificationKey);
      if (!hasNotified && !replyData.read) {
        await this.sendNotification(questionData.question, replyData, {
          questionId,
          replyId,
        });
        await this.markAsNotified(notificationKey);
      }
    });

  }

  // Kiểm tra xem đã gửi thông báo chưa
  async checkIfNotified(key) {
    try {
      return await AsyncStorage.getItem(`notification-${key}`) !== null;
    } catch (error) {
      console.error('Error checking notification status:', error);
      return false;
    }
  }

  // Đánh dấu đã gửi thông báo
  async markAsNotified(key) {
    try {
      await AsyncStorage.setItem(`notification-${key}`, 'true');
    } catch (error) {
      console.error('Error marking notification as sent:', error);
    }
  }

  // Gửi thông báo
  async sendNotification(question, replyData, metadata) {
    try {
      // Kiểm tra xem người trả lời có phải là chính mình không
      if (replyData.email === this.currentUser) {
        return;
      }

      const now = Date.now();
      const lastTime = this.lastNotificationTime[metadata.questionId] || 0;
      const THROTTLE_TIME = 5000; // 5 seconds

      // Kiểm tra thời gian giữa các thông báo
      if (now - lastTime < THROTTLE_TIME) {
        return;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Có câu trả lời mới',
          body: `${replyData.email} đã trả lời câu hỏi của bạn: "${question.substring(0, 50)}..."`,
          data: {
            ...metadata,
            question,
            reply: replyData,
          },
          sound: true,
        },
        trigger: null, // Gửi ngay lập tức
      });

      this.lastNotificationTime[metadata.questionId] = now;
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }

  // Lắng nghe câu trả lời mới
  listenToNewReplies() {
    if (!this.currentUser) return;

    const forumRef = ref(FIREBASE_DB, 'forum');
    onValue(forumRef, async (snapshot) => {
      const forumData = snapshot.val();
      if (!forumData) return;

      Object.entries(forumData).forEach(([questionId, questionData]) => {
        // Chỉ xử lý câu hỏi của người dùng hiện tại
        if (questionData.email === this.currentUser) {
          // Kiểm tra xem có replies mới không và người trả lời không phải là chính mình
          if (questionData.replies) {
            const hasNewRepliesFromOthers = Object.values(questionData.replies).some(
              reply => reply.email !== this.currentUser && !reply.read
            );
            if (hasNewRepliesFromOthers) {
              this.checkNewReplies(questionId, questionData);
            }
          }
        }
      });
    });
  }

    // Xử lý khi nhận được thông báo
    handleNotification = async (notification) => {
        try {
          const data = notification.request.content.data;
          // Chỉ tăng badge count nếu người trả lời không phải là chính mình
          if (data.reply && data.reply.email !== this.currentUser) {
            const count = await Notifications.getBadgeCountAsync();
            await Notifications.setBadgeCountAsync(count + 1);
          }
        } catch (error) {
          console.error('Error handling notification:', error);
        }
      };

      
  // Dọn dẹp listeners
  cleanup() {
    if (this.notificationListener) {
      this.notificationListener.remove();
    }
    if (this.responseListener) {
      this.responseListener.remove();
    }
  }
}

export default NotificationHandler;