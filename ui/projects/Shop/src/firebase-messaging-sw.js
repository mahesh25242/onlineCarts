importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyAqQlyuKOLiaCchhXmKUi7YJo7qQPwKaXY",
  authDomain: "onlinecart-39321.firebaseapp.com",
  projectId: "onlinecart-39321",
  storageBucket: "onlinecart-39321.appspot.com",
  messagingSenderId: "1091431823095",
  appId: "1:1091431823095:web:92e711268a18ddaa7985f2",
  measurementId: "G-NL8WQFLDE2"
});

const messaging = firebase.messaging();
//console.log(messaging)
