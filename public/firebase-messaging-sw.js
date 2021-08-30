importScripts("https://www.gstatic.com/firebasejs/8.8.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.8.1/firebase-messaging.js");
const firebaseConfig = {
  apiKey: "AIzaSyBKDf4pbwwkS3NBu0DQLpZgzqZas2lmN3I",
  authDomain: "hashkings-c7886.firebaseapp.com",
  projectId: "hashkings-c7886",
  storageBucket: "hashkings-c7886.appspot.com",
  messagingSenderId: "226906687091",
  appId: "1:226906687091:web:df46ea8c10c7c9761ecc06",
  measurementId: "G-43W1J3H9J3",
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification("my notification title");
    });
  return promiseChain;
});
self.addEventListener("notificationclick", function (event) {
  console.log(event);
});
