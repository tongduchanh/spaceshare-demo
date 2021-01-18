module.exports = function generateServiceWorkerJs() {
  return `importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js");

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "${process.env.REACT_APP_API_KEY}",
    authDomain: "${process.env.REACT_APP_AUTH_DOMAIN}",
    databaseURL: "${process.env.REACT_APP_DATA_BASE_URL}",
    projectId: "${process.env.REACT_APP_PROJECT_ID}",
    storageBucket: "${process.env.REACT_APP_STORAGE_BUCKET}",
    messagingSenderId: "${process.env.REACT_APP_MESSAGING_SENDER_ID}",
    appId: "${process.env.REACT_APP_APP_ID}",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);`
}
