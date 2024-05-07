

//firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyCRJRnfsfs6hiojmqNlwYiCQivAKljA9T4",
  authDomain: "push-3e2ca.firebaseapp.com",
  databaseURL: "https://push-3e2ca-default-rtdb.firebaseio.com",
  projectId: "push-3e2ca",
  storageBucket: "push-3e2ca.appspot.com",
  messagingSenderId: "521583277243",
  appId: "1:521583277243:web:59887e0d9fb37ea6f5e59e",
  measurementId: "G-9M5E35T33N"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  try {
    const { notification } = payload;
    if (!notification || !notification.title || !notification.body) {
      throw new Error("Invalid notification payload.");
    }

    const notificationTitle = notification.title;
    const notificationOptions = {
      body: notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  } catch (error) {
    console.error("Error displaying notification:", error);
  }
});
