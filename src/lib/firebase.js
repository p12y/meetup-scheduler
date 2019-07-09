import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_ENV_API_KEY,
  authDomain: process.env.REACT_ENV_AUTH_DOMAIN,
  databaseURL: process.env.REACT_ENV_DATABASE_URL,
  projectId: process.env.REACT_ENV_PROJECT_ID,
  storageBucket: process.env.REACT_ENV_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_ENV_MESSAGING_SENDER_ID,
  appId: process.env.REACT_ENV_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
