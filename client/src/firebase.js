// firebase.js

import firebase from "firebase/compat/app"; // Import firebase from compat/app
import "firebase/compat/messaging"; // Import messaging from compat/messaging
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyADGLHDoCypt80s5ctczHHzbHOXyGbYfAU",
  authDomain: "push-notif-task-kmit.firebaseapp.com",
  databaseURL: "https://push-notif-task-kmit-default-rtdb.firebaseio.com",
  projectId: "push-notif-task-kmit",
  storageBucket: "push-notif-task-kmit.appspot.com",
  messagingSenderId: "298918848836",
  appId: "1:298918848836:web:2c33449a1218cc4eb18f11",
  measurementId: "G-XHF4TM9VEJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const messaging = firebase.messaging();
export const database = firebase.database();