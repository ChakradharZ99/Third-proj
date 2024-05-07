const admin = require("firebase-admin");
const serviceAccount = require('./project1-76bb7-firebase-adminsdk-nlkfn-39aefc0333.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://push-notif-task-kmit-default-rtdb.firebaseio.com/"
});

const database = admin.database();
const deviceTokensRef = database.ref("deviceTokens");

// Function to send push notification to a specific device token
const sendPushNotification = (deviceToken, notification) => {
  const message = {
    notification: {
      title: notification.title,
      body: notification.body,
    },
    token: deviceToken,
  };

  // Check if device token exists before sending notification
  if (deviceToken) {
    admin.messaging().send(message)
      .then((response) => {
        console.log('Push notification sent successfully:', response);
      })
      .catch((error) => {
        console.error('Error sending push notification:', error);
      });
  } else {
    console.error('Invalid device token:', deviceToken);
  }
};

const notification = {
  title: "Placement Notification",
  body: "Recruitments have begun.",
};

deviceTokensRef.once("value")
  .then((snapshot) => {
    const deviceTokens = snapshot.val();
    if (deviceTokens) {
      Object.keys(deviceTokens).forEach((token) => {
        sendPushNotification(token, notification);
      });
    } else {
      console.error("No device tokens found in the database");
    }
  })
  .catch((error) => {
    console.error("Error fetching device tokens:", error);
  });
