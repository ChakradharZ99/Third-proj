const admin = require("firebase-admin");
const serviceAccount = require('./project1-76bb7-firebase-adminsdk-nlkfn-39aefc0333.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const registrationToken = "e-xhUiiEIYwFyRmGRQ48Wp:APA91bF8rq7dAMvtvcNmukRQdIFcYFVDr-kJmD7meny1KtwvniE9mIzR-o-pYaLHupqsNUbIovReOp8I4gfflrwiaovUHTd-GFHSzSbkh8E1hjAip8jnUork0kM1PSHeTIgfWlm-ybHH"; // Replace with the token you want to test

const message = {
  notification: {
    title: "Test Notification",
    body: "This is a test notification",
  },
  token: registrationToken,
};

admin
  .messaging()
  .send(message)
  .then((response) => {
    console.log("Successfully sent test notification:", response);
  })
  .catch((error) => {
    console.error("Error sending test notification:", error);
  });
