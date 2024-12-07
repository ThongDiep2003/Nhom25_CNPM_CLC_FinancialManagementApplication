const functions = require("firebase-functions");
const fetch = require("node-fetch");

// Hàm gửi thông báo
exports.sendPushNotification = functions.https.onCall(async (data, context) => {
  try {
    const {expoPushToken, title, body} = data;

    if (!expoPushToken || !title || !body) {
      throw new functions.https.HttpsError(
          "invalid-argument",
          "Missing required fields: expoPushToken, title, or body",
      );
    }

    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: expoPushToken,
        sound: "default",
        title: title,
        body: body,
      }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error("Expo Push Error:", result.errors);
      throw new functions.https.HttpsError("internal", "Failed");
    }

    console.log("Notification sent successfully:", result);
    return {success: true, result};
  } catch (error) {
    console.error("Error sending notification:", error);
    throw new functions.https.HttpsError("unknown", error.message);
  }
});
