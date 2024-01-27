import { initializeApp } from 'firebase/app';
import { API_KEY_FIREBASE, APP_ID, MESSAGING_SENDER_ID } from '@env';

// Optionally import the services that you want to use
import { getAuth } from 'firebase/auth';
//import {...} from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: API_KEY_FIREBASE,
  authDomain: 'todo-app-ts-cdb4c.firebaseapp.com',
  databaseURL:
    'https://todo-app-ts-cdb4c-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'todo-app-ts-cdb4c',
  storageBucket: 'todo-app-ts-cdb4c.appspot.com',
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, app, auth };
