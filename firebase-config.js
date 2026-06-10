const firebaseConfig = {
  apiKey: "AIzaSyDDOcUSo9SzM6rSKUO29Thw7Qke3I6SK9g",
  authDomain: "rizzgame-hub.firebaseapp.com",
  databaseURL: "https://rizzgame-hub-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rizzgame-hub",
  storageBucket: "rizzgame-hub.firebasestorage.app",
  messagingSenderId: "1056785964458",
  appId: "1:1056785964458:web:a22b151c45f8a21b965fd3"
};

firebase.initializeApp(firebaseConfig);

window.database = firebase.database();