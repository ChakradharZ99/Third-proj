import React, { useState, useEffect } from 'react';
import { messaging, database } from './firebase';

const PushNotifications = () => {
  const [permission, setPermission] = useState(null);
  const [notifications, setNotifications] = useState([]);

const checkNotificationPermission = () => {
  if (!("Notification" in window)) {
    console.log("Notifications not supported in this browser");
    return;
  }

  if (Notification.permission === "granted") {
    console.log("Notification permission granted");
  } else if (Notification.permission === "denied") {
    console.log("Notification permission denied");
  } else {
    console.log("Notification permission not yet requested");
  }
};

// Call the function to check permission status
checkNotificationPermission();


  useEffect(() => {
    const handlePermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        setPermission(permission);
        if (permission === 'granted') {
          const token = await messaging.getToken();
          console.log("Device token:", token);
          storeDeviceToken(token);
        }
      } catch (error) {
        console.error('Error requesting permission:', error);
      }
    };

    const handleNotification = (payload) => {
      // Add the received notification to the state
      setNotifications(prevNotifications => [...prevNotifications, payload.notification]);
    };

    messaging.onMessage(handleNotification);

    handlePermission();

    // No cleanup needed in this case

  }, []);

  const storeDeviceToken = async (deviceToken) => {
    try {
      await database.ref(`deviceTokens/${deviceToken}`).set(true);
    } catch (error) {
      console.error('Error storing device token:', error);
    }
  };

  return (
    <div>
      {permission === 'granted' ? (
        <div>
          <p>Listening for push notifications...</p>
          {/* Render the list of notifications */}
          {notifications.map((notification, index) => (
            <div key={index}>
              <p>{notification.title}</p>
              <p>{notification.body}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Requesting permission to send push notifications...</p>
      )}
    </div>
  );
};

export default PushNotifications;
