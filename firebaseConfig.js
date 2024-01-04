import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
//import {...} from 'firebase/database';
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyATiEong4vc6XJlNfgBcQoVMCrAw03qgB0',
  authDomain: 'todo-app-ts-cdb4c.firebaseapp.com',
  databaseURL: 'https://todo-app-ts-cdb4c-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'todo-app-ts-cdb4c',
  storageBucket: 'todo-app-ts-cdb4c.appspot.com',
  messagingSenderId: '718521132071',
  appId: '1:718521132071:web:b101a9398d35f58d4d5a02',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export { db, app, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, collection, addDoc, getDocs, query, orderBy };
