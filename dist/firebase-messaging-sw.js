// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyDlfYPrXQb-Jq0CS9B8BGaS4vrqHl60j2A",
  authDomain: "bses-1fed7.firebaseapp.com",
  projectId: "bses-1fed7",
  storageBucket: "bses-1fed7.appspot.com",
  messagingSenderId: "320498537701",
  appId: "1:320498537701:web:4392b2ff333e1a6b81700c",
  measurementId: "G-DFGQ5G1GLT"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});