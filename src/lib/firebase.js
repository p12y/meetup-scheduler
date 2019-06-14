import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyANO4lHhlA6MleD4h_ZjnwREjVhWCERbG8",
  authDomain: "meetup-scheduler-bc0d4.firebaseapp.com",
  databaseURL: "https://meetup-scheduler-bc0d4.firebaseio.com",
  projectId: "meetup-scheduler-bc0d4",
  storageBucket: "",
  messagingSenderId: "312975602523",
  appId: "1:312975602523:web:60e95da7119a47f8"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;