import firebase from "firebase";
//https://medium.com/javascript-in-plain-english/react-native-firebase-email-authenticaton-in-an-expo-project-2e413e9a4890
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBu1iOLpdYY7uklSpIG5EDzUpwsQ88Xx4Y",
  authDomain: "myapp-483c6.firebaseapp.com",
  databaseURL: "https://myapp-483c6-default-rtdb.firebaseio.com",
  projectId: "myapp-483c6",
  storageBucket: "myapp-483c6.appspot.com",
  messagingSenderId: "1069141597334",
  appId: "1:1069141597334:web:4b1579fffaaa461b6e36b7",
};

/*if (!firebase.apps.length) {
  // Initialize Firebase
  let Firebase = firebase.initializeApp(firebaseConfig);
} else {
  let Firebase = firebase.app(); // if already initialized, use that one
}*/
let Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
