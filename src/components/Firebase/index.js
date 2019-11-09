import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAV8f2cgVd1LzQtBRVNCzcsQGPw9eyW1Bo",
  authDomain: "color-world-a8c15.firebaseapp.com",
  databaseURL: "https://color-world-a8c15.firebaseio.com",
  projectId: "color-world-a8c15",
  storageBucket: "color-world-a8c15.appspot.com",
  messagingSenderId: "630484036040",
  appId: "1:630484036040:web:7e923eb3875d70377f78fd"
};
firebase.initializeApp(firebaseConfig);

export default firebase;