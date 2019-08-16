import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAA0KrMLcJ4oJdSjkagaqeQFnvCwAowheo",
  authDomain: "color-world-94e8a.firebaseapp.com",
  databaseURL: "https://color-world-94e8a.firebaseio.com",
  projectId: "color-world-94e8a",
  storageBucket: "",
  messagingSenderId: "235012913757",
  appId: "1:235012913757:web:4c2df28e8c553934"
};
firebase.initializeApp(firebaseConfig);

export default firebase;